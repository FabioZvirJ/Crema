import type { CSSProperties } from 'react';
import { getFlavorLook } from './scene/flavorLook';

interface MiniScoopProps {
  readonly flavorId: string;
  readonly size: 'sm' | 'lg';
}

/**
 * Flat-shaded CSS scoop that shares the exact palette of the 3D scene. Used on the reagent
 * cards and in the no-WebGL fallback so every scoop on the page speaks the same visual language.
 */
export function MiniScoop({ flavorId, size }: MiniScoopProps) {
  const look = getFlavorLook(flavorId);
  const bitA = look.bits?.[0]?.color ?? look.dark;
  const bitB = look.bits?.[1]?.color ?? look.light;
  const style = {
    '--scoop-base': look.base,
    '--scoop-light': look.light,
    '--scoop-dark': look.dark,
    '--scoop-bit-a': bitA,
    '--scoop-bit-b': bitB,
  } as CSSProperties;

  return (
    <span className={`mini-scoop mini-scoop-${size}`} style={style} aria-hidden="true">
      <span className="mini-scoop-skirt" />
      <span className="mini-scoop-dome">
        <i className="mini-scoop-bit mini-scoop-bit-1" />
        <i className="mini-scoop-bit mini-scoop-bit-2" />
        <i className="mini-scoop-bit mini-scoop-bit-3" />
        <i className="mini-scoop-bit mini-scoop-bit-4" />
        <i className="mini-scoop-bit mini-scoop-bit-5" />
      </span>
    </span>
  );
}
