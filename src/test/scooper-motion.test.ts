import { describe, expect, it } from 'vitest';
import {
  BOWL_RIDE,
  FAR,
  HOVER_Y,
  PLACE_TOTAL,
  PRESS_SQUASH,
  REST_SQUASH,
  TAKE_TOTAL,
  SIDE_ALPHA,
  SIDE_PULL_X,
  SIDE_TOTAL,
  T_ENTER,
  T_PRESS,
  T_SIDE_APPROACH,
  placePose,
  releasePath,
  takePose,
  takeSidePose,
  type ScooperPose,
} from '@/features/lab/scene/scooperMotion';

const STEP = 0.005;

function sample(fn: (t: number) => ScooperPose, total: number): ScooperPose[] {
  const out: ScooperPose[] = [];
  for (let t = 0; t <= total + 1e-9; t += STEP) out.push(fn(Math.min(t, total)));
  return out;
}

function maxJump(poses: ScooperPose[]): number {
  let worst = 0;
  for (let i = 1; i < poses.length; i += 1) {
    const a = poses[i - 1]!;
    const b = poses[i]!;
    worst = Math.max(
      worst,
      Math.hypot(b.ballX - a.ballX, b.ballY - a.ballY),
      Math.hypot(b.bowlX - a.bowlX, b.bowlY - a.bowlY),
      Math.abs(b.alpha - a.alpha) * 2
    );
  }
  return worst;
}

describe('Scooper motion — placing a ball', () => {
  const poses = sample(placePose, PLACE_TOTAL);

  it('starts far away, carrying the ball, and ends with the bowl far from the stack', () => {
    const first = poses[0]!;
    const last = poses[poses.length - 1]!;
    expect(first.ballX).toBeCloseTo(FAR.x, 5);
    expect(first.ballY).toBeCloseTo(FAR.y, 5);
    expect(first.bowlY - first.ballY).toBeCloseTo(BOWL_RIDE, 5);
    expect(Math.hypot(last.bowlX, last.bowlY)).toBeGreaterThan(4);
    expect(last.ballX).toBe(0);
    expect(last.ballY).toBe(0);
  });

  it('never teleports: no frame-to-frame jump larger than a fraction of a scoop', () => {
    expect(maxJump(poses)).toBeLessThan(0.1);
  });

  it('hovers over the stack, then presses the ball down onto it', () => {
    const hover = placePose(T_ENTER);
    expect(hover.ballX).toBeCloseTo(0, 5);
    expect(hover.ballY).toBeCloseTo(HOVER_Y, 5);

    const touch = placePose(T_ENTER + T_PRESS);
    expect(touch.ballY).toBeCloseTo(0, 5);
    expect(touch.pressed).toBe(true);
  });

  it('only ever compresses the ball (a stiff gelato slumps, it does not stretch or bounce)', () => {
    for (const pose of poses) {
      expect(pose.squashTarget).toBeLessThanOrEqual(REST_SQUASH + 1e-9);
      expect(pose.squashTarget).toBeGreaterThanOrEqual(PRESS_SQUASH - 1e-9);
    }
    // ...and the ball never rises back up off the stack after touching it.
    const afterTouch = poses.filter((_, i) => i * STEP >= T_ENTER + T_PRESS);
    expect(afterTouch.every((p) => p.ballY === 0 && p.ballX === 0)).toBe(true);
  });

  it('lifts the bowl straight up before swinging it sideways, so it never cuts through the ball', () => {
    for (let p = 0; p <= 1; p += 0.01) {
      const { dx, dy } = releasePath(p);
      if (dx > 0.2) expect(dy).toBeGreaterThan(1.2);
    }
  });

  it('only reports the ball as released once the bowl has cleared it', () => {
    for (const pose of poses) {
      if (pose.released) expect(pose.bowlY - pose.ballY).toBeGreaterThan(1);
    }
  });
});

describe('Scooper motion — taking a ball away', () => {
  const poses = sample(takePose, TAKE_TOTAL);

  it('arrives empty from far away and leaves carrying the ball out of frame', () => {
    const first = poses[0]!;
    const last = poses[poses.length - 1]!;
    expect(Math.hypot(first.bowlX, first.bowlY)).toBeGreaterThan(4);
    expect(first.ballX).toBe(0);
    expect(first.ballY).toBe(0);
    expect(last.ballX).toBeCloseTo(FAR.x, 5);
    expect(last.ballY).toBeCloseTo(FAR.y, 5);
  });

  it('never teleports', () => {
    expect(maxJump(poses)).toBeLessThan(0.1);
  });

  it('covers the ball with the bowl before lifting it', () => {
    const covered = poses.find((p) => p.ballY > 0.01)!;
    expect(covered.bowlX).toBeCloseTo(covered.ballX, 3);
    expect(covered.bowlY - covered.ballY).toBeCloseTo(BOWL_RIDE, 2);
  });
});

describe('Scooper motion — pulling out a ball that has another on top', () => {
  const poses = sample(takeSidePose, SIDE_TOTAL);

  it('never rises above the ball (it cannot pass through the balls resting on it)', () => {
    for (const pose of poses) {
      expect(pose.ballY).toBe(0);
      expect(pose.bowlY).toBeLessThanOrEqual(0.9 + 1e-9);
    }
  });

  it('comes in sideways, engulfs the ball and drags it out of the stack to the side', () => {
    const first = poses[0]!;
    const engulf = takeSidePose(T_SIDE_APPROACH);
    const last = poses[poses.length - 1]!;
    expect(first.bowlX).toBeCloseTo(FAR.x, 5);
    expect(first.ballX).toBe(0);
    expect(engulf.bowlX).toBeCloseTo(engulf.ballX, 5);
    expect(last.ballX).toBeCloseTo(SIDE_PULL_X, 5);
    expect(poses.every((p) => p.alpha === SIDE_ALPHA)).toBe(true);
  });

  it('never teleports', () => {
    expect(maxJump(poses)).toBeLessThan(0.1);
  });
});
