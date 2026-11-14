import { describe, expect, it } from 'vitest';
import type * as THREE from 'three';
import { DRAPE_MAX, STACK_STEP, buildScoopGeometry } from '@/features/lab/scene/geometry';

describe('Scoop geometry — draping over the ball below', () => {
  const geometry = buildScoopGeometry(11);
  const position = geometry.getAttribute('position') as THREE.BufferAttribute;
  const delta = geometry.morphAttributes.position![0] as THREE.BufferAttribute;

  it('ships a single relative "drape" morph target with matching normals', () => {
    expect(geometry.morphAttributes.position).toHaveLength(1);
    expect(geometry.morphAttributes.normal).toHaveLength(1);
    expect(geometry.morphTargetsRelative).toBe(true);
    expect(delta.count).toBe(position.count);
  });

  it('only ever moves the collar downward, never further than DRAPE_MAX', () => {
    let deepest = 0;
    for (let i = 0; i < delta.count; i += 1) {
      const dy = delta.getY(i);
      expect(dy).toBeLessThanOrEqual(1e-6);
      deepest = Math.min(deepest, dy);
    }
    expect(deepest).toBeLessThan(-DRAPE_MAX * 0.5); // it really does drape
    expect(deepest).toBeGreaterThanOrEqual(-DRAPE_MAX - 1e-6);
  });

  it('leaves the dome alone, so toppings sitting on it never float or sink', () => {
    for (let i = 0; i < position.count; i += 1) {
      if (position.getY(i) > 0.1) {
        expect(Math.abs(delta.getX(i))).toBeLessThan(1e-6);
        expect(Math.abs(delta.getY(i))).toBeLessThan(1e-6);
        expect(Math.abs(delta.getZ(i))).toBeLessThan(1e-6);
      }
    }
  });

  it('keeps every vertex finite in both the plain and the draped shape', () => {
    for (let i = 0; i < position.count; i += 1) {
      for (const axis of [0, 1, 2] as const) {
        const base = axis === 0 ? position.getX(i) : axis === 1 ? position.getY(i) : position.getZ(i);
        const d = axis === 0 ? delta.getX(i) : axis === 1 ? delta.getY(i) : delta.getZ(i);
        expect(Number.isFinite(base + d)).toBe(true);
      }
    }
  });

  it('stacks scoops tightly enough that a ball sinks into the one below', () => {
    // dome height 0.95: the lower ball's top must poke above the upper ball's underside (-0.43)
    expect(-STACK_STEP + 0.95).toBeGreaterThan(-0.43);
  });
});
