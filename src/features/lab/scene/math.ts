export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/** Hermite smoothstep. Pass the edges reversed (edge0 > edge1) for a falling ramp. */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}
