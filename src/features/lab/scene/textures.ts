import * as THREE from 'three';
import type { FlavorLook } from './flavorLook';

/** Small deterministic PRNG so every scoop/waffle looks the same on each visit. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashString(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function createCanvas(width: number, height: number) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D canvas context unavailable');
  return { canvas, ctx };
}

function toColorTexture(canvas: HTMLCanvasElement, repeatU = false): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  if (repeatU) texture.wrapS = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}

function toDataTexture(canvas: HTMLCanvasElement, repeatU = false): THREE.CanvasTexture {
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  if (repeatU) texture.wrapS = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}

/* ------------------------------------------------------------------ */
/* Waffle (casquinha + biscoito)                                       */
/* ------------------------------------------------------------------ */

interface WaffleTextures {
  readonly map: THREE.CanvasTexture;
  readonly bump: THREE.CanvasTexture;
}

/**
 * Diamond waffle lattice. Horizontal period is exactly one diamond so the texture tiles
 * seamlessly around the cone; rows converge naturally toward the tip.
 */
export function createWaffleTextures(cols = 12, rows = 7): WaffleTextures {
  const W = 512;
  const H = 512;
  const dx = W / cols;
  const dy = H / rows;
  const rand = mulberry32(7421);

  const color = createCanvas(W, H);
  const bump = createCanvas(W, H);

  // --- colour map
  color.ctx.fillStyle = '#d9a55e';
  color.ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 360; i += 1) {
    const x = rand() * W;
    const y = rand() * H;
    const r = 4 + rand() * 23;
    color.ctx.fillStyle = rand() > 0.5 ? 'rgba(150,92,36,0.06)' : 'rgba(246,208,140,0.07)';
    color.ctx.beginPath();
    color.ctx.arc(x, y, r, 0, Math.PI * 2);
    color.ctx.fill();
  }

  // --- bump map: plateau grey, grooves dark
  bump.ctx.fillStyle = '#b4b4b4';
  bump.ctx.fillRect(0, 0, W, H);

  const drawLattice = (ctx: CanvasRenderingContext2D, width: number, style: string) => {
    ctx.strokeStyle = style;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    for (let m = -rows - 1; m <= cols + 1; m += 1) {
      ctx.moveTo(m * dx, 0);
      ctx.lineTo(m * dx + rows * dx, H);
      ctx.moveTo(m * dx, 0);
      ctx.lineTo(m * dx - rows * dx, H);
    }
    ctx.stroke();
  };

  // puffy cell centres (lighter), found at lattice crossings midpoints
  for (let j = -1; j <= rows; j += 1) {
    for (let i = -1; i <= cols; i += 1) {
      const cx = i * dx + (j % 2 === 0 ? dx / 2 : dx);
      const cy = j * dy + dy / 2;
      const g = color.ctx.createRadialGradient(cx, cy, 1, cx, cy, dx * 0.5);
      g.addColorStop(0, 'rgba(255,226,160,0.32)');
      g.addColorStop(1, 'rgba(255,226,160,0)');
      color.ctx.fillStyle = g;
      color.ctx.fillRect(cx - dx, cy - dx, dx * 2, dx * 2);

      const gb = bump.ctx.createRadialGradient(cx, cy, 1, cx, cy, dx * 0.5);
      gb.addColorStop(0, 'rgba(255,255,255,0.45)');
      gb.addColorStop(1, 'rgba(255,255,255,0)');
      bump.ctx.fillStyle = gb;
      bump.ctx.fillRect(cx - dx, cy - dx, dx * 2, dx * 2);
    }
  }

  drawLattice(color.ctx, 6, 'rgba(120,70,24,0.35)');
  drawLattice(color.ctx, 2.5, '#8a5724');
  drawLattice(bump.ctx, 8, 'rgba(0,0,0,0.28)');
  drawLattice(bump.ctx, 3.5, '#262626');

  // toasted specks
  for (let i = 0; i < 420; i += 1) {
    color.ctx.fillStyle = rand() > 0.6 ? 'rgba(110,64,22,0.22)' : 'rgba(255,230,170,0.2)';
    color.ctx.fillRect(rand() * W, rand() * H, 1 + rand() * 1.4, 1 + rand() * 1.4);
  }

  return {
    map: toColorTexture(color.canvas, true),
    bump: toDataTexture(bump.canvas, true),
  };
}

/* ------------------------------------------------------------------ */
/* Gelato                                                              */
/* ------------------------------------------------------------------ */

/** Integer hash → [0,1). */
function hash2(x: number, y: number, seed: number): number {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ seed;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/** Value noise that wraps horizontally every `periodX` cells, so it tiles around a scoop. */
function tileNoise(x: number, y: number, periodX: number, seed: number): number {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const ix0 = ((x0 % periodX) + periodX) % periodX;
  const ix1 = (ix0 + 1) % periodX;
  const a = hash2(ix0, y0, seed);
  const b = hash2(ix1, y0, seed);
  const c = hash2(ix0, y0 + 1, seed);
  const d = hash2(ix1, y0 + 1, seed);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
}

export interface GelatoSurface {
  readonly normal: THREE.CanvasTexture;
  readonly roughness: THREE.CanvasTexture;
}

/**
 * Micro-surface shared by every scoop: long spade streaks, soft grain, tiny ice crystals and
 * the occasional air pit. Baked into a normal map plus a roughness map so the highlight breaks
 * up the way a real, slightly moist gelato surface does (instead of a smooth plastic sheen).
 */
export function createGelatoSurface(): GelatoSurface {
  const W = 256;
  const H = 128;
  const heights = new Float32Array(W * H);

  for (let j = 0; j < H; j += 1) {
    for (let i = 0; i < W; i += 1) {
      const u = i / W;
      const v = j / H;
      const streak = tileNoise(u * 3, v * 26, 3, 11);
      const medium = tileNoise(u * 28, v * 28, 28, 23);
      const fine = tileNoise(u * 120, v * 120, 120, 37);
      const pits = Math.max(0, tileNoise(u * 64, v * 64, 64, 53) - 0.8) * 5;
      heights[j * W + i] = streak * 0.55 + medium * 0.25 + fine * 0.14 - pits * 0.35;
    }
  }

  const normal = createCanvas(W, H);
  const rough = createCanvas(W, H);
  const normalData = normal.ctx.createImageData(W, H);
  const roughData = rough.ctx.createImageData(W, H);
  const strength = 3.4;

  for (let j = 0; j < H; j += 1) {
    for (let i = 0; i < W; i += 1) {
      const left = heights[j * W + ((i - 1 + W) % W)]!;
      const right = heights[j * W + ((i + 1) % W)]!;
      const up = heights[Math.max(0, j - 1) * W + i]!;
      const down = heights[Math.min(H - 1, j + 1) * W + i]!;
      // canvas y grows downward, texture v grows upward → flip the green channel.
      let nx = -(right - left) * strength;
      let ny = (down - up) * strength;
      const nz = 1;
      const len = Math.hypot(nx, ny, nz);
      nx /= len;
      ny /= len;
      const o = (j * W + i) * 4;
      normalData.data[o] = (nx * 0.5 + 0.5) * 255;
      normalData.data[o + 1] = (ny * 0.5 + 0.5) * 255;
      normalData.data[o + 2] = (nz / len * 0.5 + 0.5) * 255;
      normalData.data[o + 3] = 255;

      // Crests are polished by the spade (shinier), troughs stay matte.
      const h = heights[j * W + i]!;
      const r = Math.min(0.92, Math.max(0.5, 0.86 - (h - 0.35) * 0.55));
      const gray = r * 255;
      roughData.data[o] = gray;
      roughData.data[o + 1] = gray;
      roughData.data[o + 2] = gray;
      roughData.data[o + 3] = 255;
    }
  }
  normal.ctx.putImageData(normalData, 0, 0);
  rough.ctx.putImageData(roughData, 0, 0);

  return {
    normal: toDataTexture(normal.canvas, true),
    roughness: toDataTexture(rough.canvas, true),
  };
}

/** Per-flavour colour map: base tone, scooper streaks, swirl ribbon and inclusions. */
export function createScoopTexture(look: FlavorLook, seed: number): THREE.CanvasTexture {
  const W = 256;
  const H = 128;
  const { canvas, ctx } = createCanvas(W, H);
  const rand = mulberry32(seed);

  ctx.fillStyle = look.base;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(255,246,228,0.08)';
  ctx.fillRect(0, 0, W, H);

  // scooper streaks (drawn 3× so they wrap around the seam)
  for (let i = 0; i < 30; i += 1) {
    const y = H * (0.06 + rand() * 0.7);
    const amp = 2 + rand() * 6;
    const phase = rand() * Math.PI * 2;
    const periods = 1 + Math.floor(rand() * 2);
    ctx.strokeStyle = rand() > 0.5 ? look.light : look.dark;
    ctx.globalAlpha = 0.16 + rand() * 0.2;
    ctx.lineWidth = 2.5 + rand() * 7;
    ctx.lineCap = 'round';
    for (const ox of [-W, 0, W]) {
      ctx.beginPath();
      for (let x = 0; x <= W; x += 8) {
        const yy = y + Math.sin((x / W) * Math.PI * 2 * periods + phase) * amp;
        if (x === 0) ctx.moveTo(x + ox, yy);
        else ctx.lineTo(x + ox, yy);
      }
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;

  if (look.swirl) {
    ctx.strokeStyle = look.swirl;
    ctx.lineCap = 'round';
    for (let k = 0; k < 3; k += 1) {
      const y = H * (0.2 + k * 0.2) + rand() * 5;
      ctx.globalAlpha = 0.7;
      ctx.lineWidth = 4.5 + rand() * 4.5;
      const phase = rand() * Math.PI * 2;
      for (const ox of [-W, 0, W]) {
        ctx.beginPath();
        for (let x = 0; x <= W; x += 6) {
          const yy = y + Math.sin((x / W) * Math.PI * 4 + phase) * 8;
          if (x === 0) ctx.moveTo(x + ox, yy);
          else ctx.lineTo(x + ox, yy);
        }
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }

  for (const bit of look.bits ?? []) {
    ctx.fillStyle = bit.color;
    for (let i = 0; i < bit.count; i += 1) {
      const x = rand() * W;
      const y = H * (0.12 + Math.pow(rand(), 0.8) * 0.62);
      const size = (bit.size[0] + rand() * (bit.size[1] - bit.size[0])) * 0.5;
      const rot = rand() * Math.PI;
      for (const ox of [-W, 0, W]) {
        ctx.save();
        ctx.translate(x + ox, y);
        ctx.rotate(rot);
        ctx.beginPath();
        if (bit.shape === 'dot') {
          ctx.ellipse(0, 0, size * 1.25, size * 0.8, 0, 0, Math.PI * 2);
        } else {
          const n = 5;
          for (let p = 0; p < n; p += 1) {
            const a = (p / n) * Math.PI * 2;
            const rr = size * (0.7 + rand() * 0.55);
            const px = Math.cos(a) * rr * 1.35;
            const py = Math.sin(a) * rr;
            if (p === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
        }
        ctx.fill();
        ctx.restore();
      }
    }
  }

  return toColorTexture(canvas, true);
}

/* ------------------------------------------------------------------ */
/* Vessels                                                             */
/* ------------------------------------------------------------------ */

/**
 * "Copinho de Ensaio" wrap: cream paper, terracotta band, CL monogram and graduated ticks.
 * The texture is centred (offset 0.5) so the monogram faces the camera at yaw 0.
 */
export function createCupTexture(): THREE.CanvasTexture {
  const W = 512;
  const H = 256;
  const { canvas, ctx } = createCanvas(W, H);
  ctx.fillStyle = '#f8efe2';
  ctx.fillRect(0, 0, W, H);

  // paper grain
  const rand = mulberry32(55);
  for (let i = 0; i < 450; i += 1) {
    ctx.fillStyle = `rgba(150,110,80,${0.03 + rand() * 0.04})`;
    ctx.fillRect(rand() * W, rand() * H, 1 + rand(), 1 + rand());
  }

  // base (bottom) + rim (top) stay cream; wall spans roughly v 0.27 → 0.93.
  const wallTop = H * (1 - 0.93);
  const wallBottom = H * (1 - 0.27);
  const bandTop = wallTop + (wallBottom - wallTop) * 0.2;
  const bandH = (wallBottom - wallTop) * 0.2;
  ctx.fillStyle = '#b0553f';
  ctx.fillRect(0, bandTop, W, bandH);
  ctx.fillStyle = 'rgba(255,255,255,0.18)';
  ctx.fillRect(0, bandTop + bandH * 0.42, W, 1.5);

  // monogram badge at centre of texture
  const cx = W / 2;
  const cy = (wallTop + wallBottom) / 2 + bandH * 0.9;
  ctx.fillStyle = '#fbf6ee';
  ctx.beginPath();
  ctx.arc(cx, cy, 41, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#b0553f';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, 35, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#5c0a1e';
  ctx.font = '600 35px "Cormorant Garamond", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CL', cx, cy + 2);

  // graduated ticks to the right of the badge
  ctx.strokeStyle = '#8a6d56';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 4; i += 1) {
    const y = cy - 33 + i * 22;
    const len = i % 2 === 0 ? 23 : 14;
    ctx.beginPath();
    ctx.moveTo(cx + 75, y);
    ctx.lineTo(cx + 75 + len, y);
    ctx.stroke();
  }

  const texture = toColorTexture(canvas, true);
  texture.offset.x = 0.5;
  return texture;
}

/** "Cápsula Térmica" wrap: burgundy body with a cream label band. */
export function createCapsuleTexture(): THREE.CanvasTexture {
  const W = 512;
  const H = 256;
  const { canvas, ctx } = createCanvas(W, H);
  ctx.fillStyle = '#5c0a1e';
  ctx.fillRect(0, 0, W, H);

  const rand = mulberry32(88);
  for (let i = 0; i < 350; i += 1) {
    ctx.fillStyle = `rgba(255,255,255,${0.012 + rand() * 0.02})`;
    ctx.fillRect(rand() * W, rand() * H, 1 + rand() * 1.5, 1 + rand() * 1.5);
  }

  const wallTop = H * (1 - 0.94);
  const wallBottom = H * (1 - 0.22);
  const labelTop = wallTop + (wallBottom - wallTop) * 0.24;
  const labelBottom = wallTop + (wallBottom - wallTop) * 0.8;
  ctx.fillStyle = '#f4ede4';
  // Narrow enough to stay readable on the curved wall (≈ 40% of the circumference).
  ctx.fillRect(W / 2 - 102, labelTop, 204, labelBottom - labelTop);
  ctx.strokeStyle = '#b0553f';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(W / 2 - 97, labelTop + 5.5, 194, labelBottom - labelTop - 11);

  const mid = (labelTop + labelBottom) / 2;
  ctx.fillStyle = '#5c0a1e';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '600 32px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('crema lab', W / 2, mid - 8);
  ctx.fillStyle = '#b0553f';
  ctx.font = '700 8.5px system-ui, sans-serif';
  ctx.fillText('CÁPSULA TÉRMICA · -14°C', W / 2, mid + 19);

  const texture = toColorTexture(canvas, true);
  texture.offset.x = 0.5;
  return texture;
}

/* ------------------------------------------------------------------ */
/* Floor                                                               */
/* ------------------------------------------------------------------ */

/** Soft contact shadow blob. */
export function createShadowTexture(): THREE.CanvasTexture {
  const S = 256;
  const { canvas, ctx } = createCanvas(S, S);
  const g = ctx.createRadialGradient(S / 2, S / 2, 6, S / 2, S / 2, S / 2);
  g.addColorStop(0, 'rgba(58,26,16,0.42)');
  g.addColorStop(0.55, 'rgba(58,26,16,0.16)');
  g.addColorStop(1, 'rgba(58,26,16,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, S, S);
  return toColorTexture(canvas);
}

/** Lab turntable: concentric rings + degree ticks, so rotation is visible on the floor. */
export function createTurntableTexture(): THREE.CanvasTexture {
  const S = 256;
  const { canvas, ctx } = createCanvas(S, S);
  const c = S / 2;
  ctx.translate(c, c);
  ctx.strokeStyle = '#8c5a44';

  ctx.globalAlpha = 0.55;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(0, 0, c * 0.9, 0, Math.PI * 2);
  ctx.stroke();

  ctx.globalAlpha = 0.32;
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 4.5]);
  ctx.beginPath();
  ctx.arc(0, 0, c * 0.7, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.globalAlpha = 0.28;
  ctx.beginPath();
  ctx.arc(0, 0, c * 0.5, 0, Math.PI * 2);
  ctx.stroke();

  ctx.globalAlpha = 0.55;
  ctx.lineWidth = 1;
  for (let i = 0; i < 72; i += 1) {
    const a = (i / 72) * Math.PI * 2;
    const long = i % 6 === 0;
    const r0 = c * 0.9;
    const r1 = c * (long ? 0.965 : 0.935);
    ctx.beginPath();
    ctx.moveTo(Math.cos(a) * r0, Math.sin(a) * r0);
    ctx.lineTo(Math.cos(a) * r1, Math.sin(a) * r1);
    ctx.stroke();
  }
  return toColorTexture(canvas);
}
