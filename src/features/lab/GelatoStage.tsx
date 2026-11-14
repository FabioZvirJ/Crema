import { useEffect, useMemo, useRef, useState } from 'react';
import { Rotate3d, Trash2 } from 'lucide-react';
import type { CatalystId, VesselId } from './LabPage';
import { FlatVessel } from './FlatVessel';
import { MiniScoop } from './MiniScoop';
import type { GelatoScene, LayoutPoint } from './scene/GelatoScene';

interface StageLayer {
  readonly id: string;
  readonly name: string;
  readonly symbol: string;
}

interface GelatoStageProps {
  readonly vesselId: VesselId;
  readonly catalystId: CatalystId;
  readonly layers: ReadonlyArray<StageLayer>;
  readonly onRemoveLayer: (index: number) => void;
}

type StageMode = 'loading' | 'ready' | 'flat';

function supportsWebGL(): boolean {
  if (typeof window === 'undefined' || typeof window.WebGLRenderingContext === 'undefined') {
    return false;
  }
  try {
    const probe = document.createElement('canvas');
    return Boolean(probe.getContext('webgl2') || probe.getContext('webgl'));
  } catch {
    return false;
  }
}

function samePoints(a: ReadonlyArray<LayoutPoint>, b: ReadonlyArray<LayoutPoint>): boolean {
  return (
    a.length === b.length &&
    a.every((p, i) => Math.abs(p.x - b[i]!.x) < 0.05 && Math.abs(p.y - b[i]!.y) < 0.05)
  );
}

/**
 * The Lab chamber. Renders the gelato as a real-time 3D scene (three.js, loaded on demand)
 * and falls back to a flat illustration where WebGL is unavailable.
 */
export function GelatoStage({ vesselId, catalystId, layers, onRemoveLayer }: GelatoStageProps) {
  const [webglAvailable] = useState(supportsWebGL);
  const [mode, setMode] = useState<StageMode>(webglAvailable ? 'loading' : 'flat');
  const [points, setPoints] = useState<ReadonlyArray<LayoutPoint>>([]);
  const [hintDismissed, setHintDismissed] = useState(false);
  const [sinking, setSinking] = useState(false);

  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<GelatoScene | null>(null);

  const layersKey = layers.map((l) => l.id).join('|');
  const sceneState = useMemo(
    () => ({
      vesselId,
      catalystId,
      scoops: layersKey ? layersKey.split('|').map((id) => ({ id })) : [],
    }),
    [vesselId, catalystId, layersKey]
  );
  const latestState = useRef(sceneState);
  latestState.current = sceneState;

  // A callout should appear when its ball is set down (the scooper takes ~2 s to get there on the
  // first build, ~1 s when a single ball is added later).
  const initialIds = useRef<Set<string> | null>(null);
  if (initialIds.current === null) initialIds.current = new Set(layers.map((l) => l.id));
  useEffect(() => {
    const present = new Set(layersKey ? layersKey.split('|') : []);
    for (const id of [...(initialIds.current ?? [])]) if (!present.has(id)) initialIds.current?.delete(id);
  }, [layersKey]);

  // When a ball is lifted out, the callouts above wait for the stack to sink before gliding down.
  const previousCount = useRef(layers.length);
  const sinkTimer = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (layers.length < previousCount.current) {
      setSinking(true);
      window.clearTimeout(sinkTimer.current);
      sinkTimer.current = window.setTimeout(() => setSinking(false), 2600);
    }
    previousCount.current = layers.length;
  }, [layers.length]);
  useEffect(() => () => window.clearTimeout(sinkTimer.current), []);

  // Boot the 3D scene once (lazy chunk) and tear it down on unmount.
  useEffect(() => {
    if (!webglAvailable) return;
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    let cancelled = false;
    let scene: GelatoScene | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let visibilityObserver: IntersectionObserver | null = null;

    import('./scene/GelatoScene')
      .then(({ GelatoScene: Scene }) => {
        if (cancelled) return;
        try {
          scene = new Scene(canvas, {
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            onLayout: (next) => setPoints((prev) => (samePoints(prev, next) ? prev : next)),
            onContextLost: () => setMode('flat'),
          });
        } catch {
          setMode('flat');
          return;
        }
        sceneRef.current = scene;

        resizeObserver = new ResizeObserver((entries) => {
          const rect = entries[0]?.contentRect;
          if (rect) scene?.resize(rect.width, rect.height);
        });
        resizeObserver.observe(host);
        const rect = host.getBoundingClientRect();
        scene.resize(rect.width, rect.height);

        scene.setState(latestState.current);
        scene.start();
        setMode('ready');

        if (typeof IntersectionObserver !== 'undefined') {
          visibilityObserver = new IntersectionObserver(
            (entries) => scene?.setVisible(entries.some((e) => e.isIntersecting)),
            { threshold: 0 }
          );
          visibilityObserver.observe(host);
        }
      })
      .catch(() => {
        if (!cancelled) setMode('flat');
      });

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      scene?.dispose();
      sceneRef.current = null;
    };
  }, [webglAvailable]);

  // Push every selection change to the scene (it diffs and animates the assembly).
  useEffect(() => {
    sceneRef.current?.setState(sceneState);
  }, [sceneState]);

  const stageLayers = layers.map((layer, index) => ({ layer, index }));

  if (mode === 'flat') {
    return (
      <div className="lab-stage lab-stage-flat">
        <div className="lab-chamber-stack">
          <div className="lab-chamber-scoops">
            {[...stageLayers].reverse().map(({ layer, index }) => (
              <div key={layer.id} className="lab-scoop-layer">
                <MiniScoop flavorId={layer.id} size="lg" />
                <div className="lab-scoop-callout">
                  <span className="lab-scoop-callout-code">
                    [{layer.symbol}] C0{index + 1}
                  </span>
                  <span className="lab-scoop-callout-name">{layer.name}</span>
                  {layers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onRemoveLayer(index)}
                      className="lab-scoop-remove-btn"
                      aria-label={`Remover camada ${layer.name}`}
                    >
                      <Trash2 size={11} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <FlatVessel vesselId={vesselId} />
        </div>
      </div>
    );
  }

  return (
    <div ref={hostRef} className={`lab-stage lab-stage-3d is-${mode}`}>
      <canvas
        ref={canvasRef}
        className="lab-stage-canvas"
        aria-hidden="true"
        onPointerDown={() => setHintDismissed(true)}
      />

      {mode === 'loading' && (
        <div className="lab-stage-loader" aria-hidden="true">
          <span className="lab-stage-loader-ring" />
          <span>montando a bancada…</span>
        </div>
      )}

      {mode === 'ready' && (
        <>
          <ul
            className={`lab-stage-callouts ${sinking ? 'is-sinking' : ''}`}
            aria-label="Camadas da fórmula"
          >
            {stageLayers.map(({ layer, index }) => {
              const point = points[index];
              if (!point) return null;
              return (
                <li
                  key={layer.id}
                  className="lab-stage-callout"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    maxWidth: `${Math.max(20, 99 - point.x)}%`,
                    animationDelay: `${initialIds.current?.has(layer.id) ? 2.1 + index * 1.4 : 1.2}s`,
                  }}
                >
                  <span className="lab-scoop-callout-code">
                    [{layer.symbol}] C0{index + 1}
                  </span>
                  <span className="lab-scoop-callout-name">{layer.name}</span>
                  {layers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onRemoveLayer(index)}
                      className="lab-scoop-remove-btn"
                      aria-label={`Remover camada ${layer.name}`}
                    >
                      <Trash2 size={11} />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>

          <p className={`lab-stage-hint ${hintDismissed ? 'is-hidden' : ''}`} aria-hidden="true">
            <Rotate3d size={13} />
            <span>arraste para girar</span>
          </p>
        </>
      )}
    </div>
  );
}
