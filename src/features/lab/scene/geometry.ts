import * as THREE from 'three';
import { smoothstep } from './math';

/* ------------------------------------------------------------------ */
/* Shared layout constants (world units, 1 ≈ one scoop radius)         */
/* ------------------------------------------------------------------ */

export const CONE_H = 3.2;
export const CONE_R = 0.95;
const CUP_H = 1.75;
const CAPSULE_H = 1.95;

/** Height of the vessel mouth, where scoop #0 sits. */
export const VESSEL_TOP = {
  'casquinha-artesanal': CONE_H,
  'casquinha-premium': CONE_H,
  'copinho-lab': CUP_H,
  'pote-termico': CAPSULE_H,
} as const;

/**
 * Distance between the origins of two stacked scoops. Tight on purpose: a ball pressed onto
 * another sinks into it instead of balancing on top.
 */
export const STACK_STEP = 1.2;
/** How far the collar of a scoop can droop to hug the ball under it. */
export const DRAPE_MAX = 0.26;
/** Scoop origin sits this far above the mouth so the ruffled skirt hugs the rim. */
const SCOOP_REST = 0.3;

export function scoopRestY(vesselTop: number, index: number): number {
  return vesselTop + SCOOP_REST + index * STACK_STEP;
}

/* ------------------------------------------------------------------ */
/* Math helpers                                                        */
/* ------------------------------------------------------------------ */

/** Resample a polyline to `count` points evenly spaced by arc length. */
function resampleProfile(points: ReadonlyArray<THREE.Vector2>, count: number): THREE.Vector2[] {
  const lengths: number[] = [0];
  for (let i = 1; i < points.length; i += 1) {
    lengths.push(lengths[i - 1]! + points[i]!.distanceTo(points[i - 1]!));
  }
  const total = lengths[lengths.length - 1]!;
  const out: THREE.Vector2[] = [];
  let seg = 1;
  for (let k = 0; k < count; k += 1) {
    const target = (k / (count - 1)) * total;
    while (seg < points.length - 1 && lengths[seg]! < target) seg += 1;
    const a = points[seg - 1]!;
    const b = points[seg]!;
    const span = lengths[seg]! - lengths[seg - 1]!;
    const t = span === 0 ? 0 : (target - lengths[seg - 1]!) / span;
    out.push(new THREE.Vector2(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t));
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Seam-safe grid (revolved shells with duplicated seam vertices)      */
/* ------------------------------------------------------------------ */

interface Grid {
  readonly geometry: THREE.BufferGeometry;
  readonly thetaSegs: number;
  readonly rows: number;
}

function createGrid(thetaSegs: number, rows: number): Grid {
  const ring = thetaSegs + 1;
  const vertexCount = (rows + 1) * ring;
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertexCount * 3), 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(vertexCount * 3), 3));

  const uv = new Float32Array(vertexCount * 2);
  for (let j = 0; j <= rows; j += 1) {
    for (let i = 0; i <= thetaSegs; i += 1) {
      const idx = j * ring + i;
      uv[idx * 2] = i / thetaSegs;
      uv[idx * 2 + 1] = 1 - j / rows;
    }
  }
  geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2));

  const indices: number[] = [];
  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < thetaSegs; i += 1) {
      const a = j * ring + i;
      const b = a + 1;
      const c = (j + 1) * ring + i;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }
  geometry.setIndex(indices);
  return { geometry, thetaSegs, rows };
}

type GridFn = (theta: number, t: number, row: number) => readonly [number, number, number];

function fillGrid(
  grid: Grid,
  fn: GridFn,
  poles: 'none' | 'top' | 'both' = 'none',
  recomputeBounds = true
): void {
  const { geometry, thetaSegs, rows } = grid;
  const ring = thetaSegs + 1;
  const pos = geometry.getAttribute('position') as THREE.BufferAttribute;

  for (let j = 0; j <= rows; j += 1) {
    for (let i = 0; i <= thetaSegs; i += 1) {
      const theta = (i / thetaSegs) * Math.PI * 2;
      const [x, y, z] = fn(theta, j / rows, j);
      pos.setXYZ(j * ring + i, x, y, z);
    }
  }
  pos.needsUpdate = true;
  geometry.computeVertexNormals();

  const nor = geometry.getAttribute('normal') as THREE.BufferAttribute;
  // Weld the duplicated seam so lighting has no visible line.
  for (let j = 0; j <= rows; j += 1) {
    const first = j * ring;
    const last = first + thetaSegs;
    const nx = nor.getX(first) + nor.getX(last);
    const ny = nor.getY(first) + nor.getY(last);
    const nz = nor.getZ(first) + nor.getZ(last);
    const len = Math.hypot(nx, ny, nz) || 1;
    nor.setXYZ(first, nx / len, ny / len, nz / len);
    nor.setXYZ(last, nx / len, ny / len, nz / len);
  }
  if (poles !== 'none') {
    for (let i = 0; i <= thetaSegs; i += 1) nor.setXYZ(i, 0, 1, 0);
  }
  if (poles === 'both') {
    for (let i = 0; i <= thetaSegs; i += 1) nor.setXYZ(rows * ring + i, 0, -1, 0);
  }
  nor.needsUpdate = true;
  if (recomputeBounds) {
    geometry.computeBoundingSphere();
  }
}

/* ------------------------------------------------------------------ */
/* Scoop                                                               */
/* ------------------------------------------------------------------ */

const SCOOP_CONTROL: ReadonlyArray<readonly [number, number]> = [
  [0, 0.95],
  [0.3, 0.92],
  [0.62, 0.78],
  [0.86, 0.52],
  [0.98, 0.2],
  [1.0, -0.02],
  [1.06, -0.14],
  [1.15, -0.22],
  [1.14, -0.32],
  [1.0, -0.4],
  [0.7, -0.43],
  [0.3, -0.43],
  [0, -0.43],
];

/**
 * How a scoop's underside and collar settle over the ball below it (this scoop's own frame,
 * where the lower ball's centre is `STACK_STEP` below). The collar droops until it hugs the
 * lower dome, the way pressed gelato flows over what it sits on.
 */
function drapeOffset(r: number, y: number, theta: number, s: number): { dy: number; dr: number } {
  const w = smoothstep(0.1, -0.14, y) * smoothstep(0.5, 1.0, r);
  if (w <= 0) return { dy: 0, dr: 0 };
  const rr = Math.min(r, 0.985);
  const lowerSurface = -STACK_STEP + 0.95 * Math.sqrt(1 - rr * rr);
  const hanging = y - (lowerSurface + 0.06);
  const drop = Math.min(DRAPE_MAX, Math.max(0, hanging));
  // never perfectly even all the way round
  const uneven = 0.75 + 0.25 * Math.sin(5 * theta + s * 2);
  return { dy: -drop * w * uneven, dr: 0.05 * w };
}

/**
 * A hand-scooped ball: slightly squashed dome, scooper ridges and the ruffled "skirt"
 * ring that real gelato gets where the spade lifts off.
 *
 * The geometry carries one morph target, "drape": the shape the collar takes when the ball is
 * pressed onto another ball. Its influence (0…1) is animated by the scene.
 */
export function buildScoopGeometry(seed: number): THREE.BufferGeometry {
  const thetaSegs = 80;
  const rows = 40;
  const curve = new THREE.SplineCurve(SCOOP_CONTROL.map(([r, y]) => new THREE.Vector2(r, y)));
  const profile = curve.getSpacedPoints(rows);
  const s = (seed % 1000) / 160;

  const vertex =
    (draped: boolean): GridFn =>
    (theta, _t, row) => {
      const p = profile[row]!;
      let r = row === 0 || row === rows ? 0 : Math.max(0, p.x);
      let y = p.y;

      const skirt = smoothstep(-0.02, -0.2, y) * smoothstep(0.7, 1.1, r);
      // The collar the spade leaves behind: wavy, a little ragged, never a clean ring.
      const ruffle =
        (0.07 * Math.sin(11 * theta + s) +
          0.045 * Math.sin(17 * theta + 2 * s + 1) +
          0.028 * Math.sin(29 * theta + 3 * s) +
          0.012 * Math.sin(43 * theta + 5 * s)) *
        skirt;
      r *= 1 + ruffle;
      y += 0.045 * Math.sin(9 * theta + s * 1.7) * skirt;

      if (draped) {
        const d = drapeOffset(r, y, theta, s);
        y += d.dy;
        r *= 1 + d.dr;
      }

      // Long curved ridges that follow the motion of the scoop across the dome.
      const dome = smoothstep(-0.05, 0.3, y);
      const swirl = 1.3 * Math.sin(2 * theta + s);
      const d =
        (0.026 * Math.sin(4 * theta + 7 * y + swirl) +
          0.014 * Math.sin(9 * theta - 14 * y + 2 * s) +
          0.01 * Math.sin(2 * theta + s * 3)) *
        dome;
      r *= 1 + d;
      y *= 1 + d * 0.6;

      return [r * Math.sin(theta), y, r * Math.cos(theta)];
    };

  const grid = createGrid(thetaSegs, rows);
  const position = grid.geometry.getAttribute('position') as THREE.BufferAttribute;
  const normal = grid.geometry.getAttribute('normal') as THREE.BufferAttribute;

  fillGrid(grid, vertex(false), 'both');
  const basePos = Float32Array.from(position.array);
  const baseNor = Float32Array.from(normal.array);

  fillGrid(grid, vertex(true), 'both');
  const drapePos = Float32Array.from(position.array);
  const drapeNor = Float32Array.from(normal.array);

  // back to the plain scoop; the draped shape lives on as a (relative) morph target
  (position.array as Float32Array).set(basePos);
  (normal.array as Float32Array).set(baseNor);
  position.needsUpdate = true;
  normal.needsUpdate = true;

  const deltaPos = new Float32Array(basePos.length);
  const deltaNor = new Float32Array(baseNor.length);
  for (let i = 0; i < basePos.length; i += 1) {
    deltaPos[i] = drapePos[i]! - basePos[i]!;
    deltaNor[i] = drapeNor[i]! - baseNor[i]!;
  }
  const morphPos = new THREE.BufferAttribute(deltaPos, 3);
  const morphNor = new THREE.BufferAttribute(deltaNor, 3);
  morphPos.name = 'drape';
  morphNor.name = 'drape';
  grid.geometry.morphAttributes.position = [morphPos];
  grid.geometry.morphAttributes.normal = [morphNor];
  grid.geometry.morphTargetsRelative = true;
  grid.geometry.computeBoundingSphere();
  return grid.geometry;
}

/* ------------------------------------------------------------------ */
/* Sauce cap (gianduia / amarena) that drips over the top scoop        */
/* ------------------------------------------------------------------ */

function capEdge(theta: number, seed: number): number {
  const wave = (f: number, p: number, pow: number) => Math.pow(0.5 + 0.5 * Math.sin(f * theta + p + seed), pow);
  return (
    0.82 +
    0.46 * wave(4, 0.3, 3) +
    0.26 * wave(7, 1.7, 4) +
    0.05 * Math.sin(11 * theta + seed)
  );
}

interface SauceCap {
  readonly geometry: THREE.BufferGeometry;
  /** Re-shape the cap so the sauce has flowed `grow` (0…1) of the way down. */
  setGrow(grow: number): void;
}

export function buildSauceCap(seed: number): SauceCap {
  const grid = createGrid(64, 20);
  const s = (seed % 100) / 17;
  let lastGrow = -1;
  const apply = (grow: number) => {
    if (lastGrow >= 0 && Math.abs(grow - lastGrow) < 0.008 && grow < 1) {
      return;
    }
    lastGrow = grow;
    fillGrid(
      grid,
      (theta, t) => {
        const phiMax = capEdge(theta, s) * grow;
        const phi = phiMax * t;
        // Bead along the leading edge, thin film near the pole.
        const th =
          0.034 +
          0.03 * smoothstep(0.62, 0.92, t) -
          0.056 * smoothstep(0.93, 1.0, t);
        const R = 1 + Math.max(0.004, th);
        return [R * Math.sin(phi) * Math.sin(theta), 0.95 * R * Math.cos(phi), R * Math.sin(phi) * Math.cos(theta)];
      },
      'top',
      false
    );
  };
  apply(0.01);
  grid.geometry.computeBoundingSphere();
  return { geometry: grid.geometry, setGrow: apply };
}

/* ------------------------------------------------------------------ */
/* Vessels                                                             */
/* ------------------------------------------------------------------ */

export function buildConeGeometry(): THREE.LatheGeometry {
  const profile = resampleProfile(
    [new THREE.Vector2(0, 0), new THREE.Vector2(0.045, 0.03), new THREE.Vector2(CONE_R, CONE_H)],
    32
  );
  return new THREE.LatheGeometry(profile, 64);
}

function coneRadiusAt(y: number): number {
  return 0.045 + ((CONE_R - 0.045) * (y - 0.03)) / (CONE_H - 0.03);
}

/** Chocolate dip covering the top of the cone with a dripping lower edge. */
export function buildConeDipGeometry(): THREE.BufferGeometry {
  const grid = createGrid(96, 26);
  const top = CONE_H + 0.03;
  fillGrid(grid, (theta, t) => {
    const wave = (f: number, p: number, pow: number) => Math.pow(0.5 + 0.5 * Math.sin(f * theta + p), pow);
    const edgeY =
      CONE_H * 0.7 -
      0.62 * wave(3, 0.7, 3) -
      0.3 * wave(5, 2.1, 4) -
      0.06 * Math.sin(9 * theta);
    const y = top - (top - edgeY) * t;
    const th =
      0.02 + 0.03 * smoothstep(0.65, 0.93, t) - 0.045 * smoothstep(0.93, 1.0, t);
    const r = coneRadiusAt(y) + Math.max(0.004, th);
    return [r * Math.sin(theta), y, r * Math.cos(theta)];
  });
  return grid.geometry;
}

/** Surface point on the chocolate dip, for scattering pistachio granella. */
export function coneDipPoint(theta: number, t: number): THREE.Vector3 {
  const y = CONE_H - t * CONE_H * 0.26;
  const r = coneRadiusAt(y) + 0.04;
  return new THREE.Vector3(r * Math.sin(theta), y, r * Math.cos(theta));
}

export function buildCupGeometry(): THREE.LatheGeometry {
  const profile = resampleProfile(
    [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.72, 0),
      new THREE.Vector2(0.76, 0.05),
      new THREE.Vector2(1.08, CUP_H - 0.05),
      new THREE.Vector2(1.12, CUP_H),
      new THREE.Vector2(1.1, CUP_H + 0.06),
    ],
    44
  );
  return new THREE.LatheGeometry(profile, 64);
}

export function buildCapsuleGeometry(): THREE.LatheGeometry {
  const profile = resampleProfile(
    [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.92, 0),
      new THREE.Vector2(0.98, 0.06),
      new THREE.Vector2(1.14, CAPSULE_H - 0.12),
      new THREE.Vector2(1.2, CAPSULE_H - 0.06),
      new THREE.Vector2(1.2, CAPSULE_H),
      new THREE.Vector2(1.14, CAPSULE_H + 0.04),
    ],
    44
  );
  return new THREE.LatheGeometry(profile, 64);
}
