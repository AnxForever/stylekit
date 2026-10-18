/**
 * Motion primitives. Everything here is a pure function of the frame number, so
 * a given frame always renders identically no matter where rendering restarts.
 * No CSS transitions, no requestAnimationFrame, no state.
 */
import { interpolate, Easing } from "remotion";
import { EASE, ENTER, EXIT, STAGGER, type EaseName } from "../theme";
import { FPS } from "../timeline2";

type Range = [number, number];

/** Seconds to frames, the only unit scenes should think in. */
export const sec = (s: number) => Math.round(s * FPS);

/**
 * Map a frame to 0..1 progress using an easing curve, clamped at both ends.
 * The canonical helper - if a scene needs something else it should compose
 * this rather than open-code interpolate().
 */
export const progress = (
  frame: number,
  from: number,
  durationInFrames: number,
  ease: EaseName = "out",
) => {
  const t = interpolate(frame, [from, from + Math.max(1, durationInFrames)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return EASE[ease](t);
};

/**
 * Entrance -> hold -> optional exit, returned as opacity + 0..1 emphasis.
 * Entrance is fast and decelerating; exit is faster still. A hold of at least
 * one second is required for any text the viewer must actually read.
 */
export const life = (
  frame: number,
  inAt: number,
  outAt: number,
  opts: { enter?: number; exit?: number } = {},
) => {
  const enter = opts.enter ?? sec(ENTER);
  const exit = opts.exit ?? sec(EXIT);
  const enterP = progress(frame, inAt, enter, "out");
  const exitP = progress(frame, outAt, exit, "in");
  return { enter: enterP, exit: exitP, opacity: enterP * (1 - exitP) };
};

/** Staggered index helper: the nth item of a group arrives STAGGER later. */
export const stagger = (index: number, step = STAGGER) => index * sec(step);

/** Blur that resolves on entrance - the "focus pull" used all over the film. */
export const focusBlur = (p: number, max = 14) => (1 - p) * max;

/**
 * Camera zoom over time. Values are multipliers on the frame content, so
 * 1.12 over 4s is the "slow push" and 1.6 over 0.4s is the "punch".
 */
export const zoomAt = (
  frame: number,
  from: number,
  durationInFrames: number,
  [a, b]: Range,
  ease: EaseName = "inOut",
) => interpolate(frame, [from, from + durationInFrames], [a, b], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: Easing.bezier(0.42, 0, 0.58, 1),
}) || progress(frame, from, durationInFrames, ease) * (b - a) + a;

/**
 * Deterministic pseudo-random. Seeded by index so layouts are stable across
 * renders - Math.random() would make every render a different film.
 */
export const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Centred sine wobble, handy for handheld shake and drift. */
export const shake = (frame: number, amp = 1, freq = 0.35) =>
  Math.sin(frame * freq) * amp + Math.sin(frame * freq * 2.7 + 1.3) * amp * 0.4;

/**
 * Count-up that never overshoots and stops exactly on the target, so the
 * number is legible the instant the count finishes.
 */
export const countUp = (frame: number, from: number, dur: number, target: number) => {
  const p = progress(frame, from, dur, "out");
  return Math.round(target * p);
};
