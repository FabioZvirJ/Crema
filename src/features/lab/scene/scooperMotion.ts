/**
 * Choreography of the ice-cream scoop (the metal tool) placing a ball on the stack, or taking
 * one away. Pure functions of time, no three.js, so the path can be unit-tested.
 *
 * Coordinates are relative to the ball's resting position, for a tool entering from the right
 * (x > 0). The scene mirrors them for tools that enter from the left.
 *
 * Why a tool instead of dropping balls: real gelato is stiff and sticky. It is never dropped
 * and never bounces, it is carried in a scoop, pressed onto the stack and the scoop peels away.
 */

import { clamp01, smoothstep } from './math';

export const REST_SQUASH = -0.03;
export const PRESS_SQUASH = -0.1;
/** The bowl rides this far above the ball centre while carrying it. */
export const BOWL_RIDE = 0.02;
/** Height of the ball above its resting spot just before it touches the stack. */
export const HOVER_Y = 0.9;
/** Where the tool comes from / leaves to, relative to the resting spot. */
export const FAR = { x: 3.5, y: 3.9 } as const;

export const T_ENTER = 0.75;
export const T_PRESS = 0.34;
const T_RELEASE = 0.95;
export const PLACE_TOTAL = T_ENTER + T_PRESS + T_RELEASE;

const T_APPROACH = 0.9;
const T_LIFT = 0.32;
const T_CARRY = 0.75;
export const TAKE_TOTAL = T_APPROACH + T_LIFT + T_CARRY;

export interface ScooperPose {
  readonly ballX: number;
  readonly ballY: number;
  readonly bowlX: number;
  readonly bowlY: number;
  /** Bowl tilt in radians (negative = opening turns toward the ball). */
  readonly alpha: number;
  readonly squashTarget: number;
  /** The ball is pressed against the stack. */
  readonly pressed: boolean;
  /** The bowl has cleared the ball: nothing covers it any more. */
  readonly released: boolean;
}

export const easeInCubic = (t: number) => t * t * t;
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Bowl position relative to the ball while it peels away (p = 0 → on the ball, p = 1 → far
 * away). It lifts straight up first so the bowl never cuts through the ball, then swings out.
 */
export function releasePath(p: number): { dx: number; dy: number; alpha: number } {
  const lift = easeInOutCubic(clamp01(p / 0.45));
  const away = clamp01((p - 0.38) / 0.62);
  return {
    dx: FAR.x * easeInOutCubic(away),
    dy: BOWL_RIDE + 1.25 * lift + (FAR.y - 1.25 - BOWL_RIDE) * easeInCubic(away),
    alpha: -0.15 * lift - 0.85 * easeInOutCubic(away),
  };
}

/** Ball + bowl travelling together from far away (q = 0) to hovering over the stack (q = 1). */
function carryPath(q: number): { x: number; y: number; alpha: number } {
  return {
    x: FAR.x * (1 - easeOutCubic(q)),
    y: HOVER_Y + (FAR.y - HOVER_Y) * (1 - easeInOutCubic(q)),
    alpha: -0.7 * (1 - easeInOutCubic(q)),
  };
}

export function placePose(t: number): ScooperPose {
  if (t < T_ENTER) {
    const c = carryPath(clamp01(t / T_ENTER));
    return {
      ballX: c.x,
      ballY: c.y,
      bowlX: c.x,
      bowlY: c.y + BOWL_RIDE,
      alpha: c.alpha,
      squashTarget: REST_SQUASH,
      pressed: false,
      released: false,
    };
  }

  if (t < T_ENTER + T_PRESS) {
    const q = clamp01((t - T_ENTER) / T_PRESS);
    const y = HOVER_Y * (1 - easeInOutCubic(q));
    return {
      ballX: 0,
      ballY: y,
      bowlX: 0,
      bowlY: y + BOWL_RIDE,
      alpha: 0,
      squashTarget: REST_SQUASH + (PRESS_SQUASH - REST_SQUASH) * smoothstep(0.55, 1, q),
      pressed: q > 0.85,
      released: false,
    };
  }

  const p = clamp01((t - T_ENTER - T_PRESS) / T_RELEASE);
  const r = releasePath(p);
  return {
    ballX: 0,
    ballY: 0,
    bowlX: r.dx,
    bowlY: r.dy,
    alpha: r.alpha,
    // the ball stays pressed while the bowl is still on it, then slumps back a little
    squashTarget: REST_SQUASH + (PRESS_SQUASH - REST_SQUASH) * (1 - smoothstep(0.05, 0.4, p)),
    pressed: true,
    released: p > 0.45,
  };
}

export function takePose(t: number): ScooperPose {
  if (t < T_APPROACH) {
    const r = releasePath(1 - clamp01(t / T_APPROACH));
    return {
      ballX: 0,
      ballY: 0,
      bowlX: r.dx,
      bowlY: r.dy,
      alpha: r.alpha,
      squashTarget: REST_SQUASH,
      pressed: false,
      released: false,
    };
  }

  if (t < T_APPROACH + T_LIFT) {
    const q = clamp01((t - T_APPROACH) / T_LIFT);
    const y = HOVER_Y * easeInOutCubic(q);
    return {
      ballX: 0,
      ballY: y,
      bowlX: 0,
      bowlY: y + BOWL_RIDE,
      alpha: 0,
      squashTarget: REST_SQUASH,
      pressed: false,
      released: false,
    };
  }

  const c = carryPath(1 - clamp01((t - T_APPROACH - T_LIFT) / T_CARRY));
  return {
    ballX: c.x,
    ballY: c.y,
    bowlX: c.x,
    bowlY: c.y + BOWL_RIDE,
    alpha: c.alpha,
    squashTarget: REST_SQUASH,
    pressed: false,
    released: false,
  };
}

/* ------------------------------------------------------------------ */
/* Taking a ball that has another one on top of it                     */
/* ------------------------------------------------------------------ */

/** You cannot lift a ball out from under another one: the tool comes in sideways and pulls it out. */
export const T_SIDE_APPROACH = 0.7;
const T_SIDE_PULL = 0.85;
export const SIDE_TOTAL = T_SIDE_APPROACH + T_SIDE_PULL;
/** Bowl opening faces the ball horizontally (negative = toward the ball for a tool on the right). */
export const SIDE_ALPHA = -1.5;
/** How far the ball is dragged out sideways (beyond the edge of the canvas). */
export const SIDE_PULL_X = 4.2;

export function takeSidePose(t: number): ScooperPose {
  if (t < T_SIDE_APPROACH) {
    const e = easeInOutCubic(clamp01(t / T_SIDE_APPROACH));
    return {
      ballX: 0,
      ballY: 0,
      bowlX: FAR.x * (1 - e),
      bowlY: 0.1 + 0.8 * (1 - e),
      alpha: SIDE_ALPHA,
      squashTarget: REST_SQUASH,
      pressed: false,
      released: false,
    };
  }

  const e = easeInOutCubic(clamp01((t - T_SIDE_APPROACH) / T_SIDE_PULL));
  const x = SIDE_PULL_X * e;
  return {
    ballX: x,
    ballY: 0,
    bowlX: x,
    bowlY: 0.1,
    alpha: SIDE_ALPHA,
    squashTarget: REST_SQUASH,
    pressed: false,
    released: false,
  };
}
