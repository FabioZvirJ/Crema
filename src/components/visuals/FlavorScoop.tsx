import { useId } from 'react';
import type { BotanicalMotif, FlavorItem } from '@/domain/types';

/** Fallback tones for a flavor that has no photo yet. */
const MOTIF_TONES: Readonly<Record<BotanicalMotif, readonly [string, string]>> = Object.freeze({
  pistachio: ['#c9d29a', '#8e9a5b'],
  cacao: ['#7a4a37', '#3d2016'],
  berries: ['#c25673', '#7e1f3d'],
  lemon: ['#f6e7a1', '#d9b948'],
  caramel: ['#d9a062', '#a2682f'],
  amarena: ['#a8374c', '#5c1226'],
});

function seedFrom(id: string): number {
  let h = 7;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 997;
  return h;
}

/**
 * A round, slightly lumpy scoop outline, a little different for every flavor:
 * a soft circle with small "lip" bumps along the bottom, smoothed into curves.
 */
function ballPath(seed: number): string {
  const n = 32;
  const cx = 50;
  const cy = 50;
  const p1 = (seed % 17) * 0.37;
  const p2 = (seed % 23) * 0.29;
  const p3 = (seed % 29) * 0.21;
  const pts: Array<[number, number]> = [];
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI * 2;
    const below = Math.max(0, Math.sin(t));
    const wobble =
      1 +
      0.018 * Math.sin(2 * t + p1) +
      0.012 * Math.sin(3 * t + p2) +
      below * below * 0.035 * Math.abs(Math.sin(8 * t + p3));
    pts.push([cx + Math.cos(t) * 42 * wobble, cy + Math.sin(t) * (40 - below * 3) * wobble]);
  }
  // Closed Catmull-Rom spline -> cubic Béziers.
  const at = (i: number) => pts[((i % n) + n) % n] as [number, number];
  const f = (v: number) => v.toFixed(2);
  let d = `M${f(at(0)[0])} ${f(at(0)[1])}`;
  for (let i = 0; i < n; i++) {
    const [x0, y0] = at(i - 1);
    const [x1, y1] = at(i);
    const [x2, y2] = at(i + 1);
    const [x3, y3] = at(i + 2);
    d += `C${f(x1 + (x2 - x0) / 6)} ${f(y1 + (y2 - y0) / 6)} ${f(x2 - (x3 - x1) / 6)} ${f(y2 - (y3 - y1) / 6)} ${f(x2)} ${f(y2)}`;
  }
  return `${d}Z`;
}

interface FlavorScoopProps {
  readonly flavor: FlavorItem;
  readonly className?: string;
}

/**
 * A whole scoop for the flavor card. Uses the transparent cut-out photo when
 * there is one; otherwise the flavor's photo is cut to a round scoop with a soft
 * edge, a light from the top-left and a shadow underneath so it reads as a ball.
 */
export function FlavorScoop({ flavor, className }: FlavorScoopProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  if (flavor.scoopImage) {
    return (
      <img
        src={flavor.scoopImage}
        alt={flavor.name}
        className={`${className ?? ''} is-cutout`}
        loading="lazy"
        decoding="async"
      />
    );
  }

  const id = (name: string) => `${name}-${uid}`;
  const shape = ballPath(seedFrom(flavor.id));
  const [light, dark] = flavor.placeholderTone ?? MOTIF_TONES[flavor.motif];

  return (
    <svg viewBox="0 0 100 100" role="img" aria-label={flavor.name} className={className}>
      <defs>
        <filter id={id('feather')} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation={0.7} />
        </filter>
        <mask id={id('cut')} maskContentUnits="userSpaceOnUse">
          <path d={shape} fill="#fff" filter={`url(#${id('feather')})`} />
        </mask>
        <radialGradient id={id('fill')} cx="38%" cy="32%" r="70%">
          <stop offset="0" stopColor={light} />
          <stop offset="1" stopColor={dark} />
        </radialGradient>
        {/* Top-left light */}
        <radialGradient id={id('light')} cx="34%" cy="24%" r="46%">
          <stop offset="0" stopColor="#fff" stopOpacity={0.38} />
          <stop offset="0.55" stopColor="#fff" stopOpacity={0.08} />
          <stop offset="1" stopColor="#fff" stopOpacity={0} />
        </radialGradient>
        {/* Shade toward the bottom-right edge, for volume */}
        <radialGradient id={id('shade')} cx="40%" cy="34%" r="74%">
          <stop offset="0.55" stopColor="#2a120a" stopOpacity={0} />
          <stop offset="0.85" stopColor="#2a120a" stopOpacity={0.22} />
          <stop offset="1" stopColor="#2a120a" stopOpacity={0.5} />
        </radialGradient>
      </defs>

      <g mask={`url(#${id('cut')})`}>
        {flavor.image ? (
          <image
            href={flavor.image}
            x={-8}
            y={-8}
            width={116}
            height={116}
            preserveAspectRatio="xMidYMid slice"
          />
        ) : (
          <rect width={100} height={100} fill={`url(#${id('fill')})`} />
        )}
        <rect width={100} height={100} fill={`url(#${id('shade')})`} />
        <rect width={100} height={100} fill={`url(#${id('light')})`} />
        <ellipse cx={30} cy={22} rx={7} ry={3.2} transform="rotate(-30 30 22)" fill="#fff" opacity={0.28} />
      </g>
    </svg>
  );
}
