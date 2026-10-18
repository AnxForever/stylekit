/**
 * Act timings as durations, derived from the master cue sheet.
 *
 * Acts that contain internal shots must split their frames exactly. Every shot
 * length in this film is expressed through the helpers below so an act can never
 * be a different length from the one the cue sheet promises - a mismatch shows
 * up as black frames, and black frames in a promo read as a mistake.
 */
import { act, bar, ACTS } from "./timeline2";

/** Total frames in an act. */
export const actLen = (id: string) => {
  const a = act(id);
  return bar(a.endBar) - bar(a.startBar);
};

/** Total bars in an act. */
export const actBars = (id: string) => {
  const a = act(id);
  return a.endBar - a.startBar;
};

/**
 * Split an act into n shots at the given bar boundaries, relative to the act
 * start. Returns exact frame lengths that sum to the act length.
 */
export const splitBars = (id: string, cuts: number[]) => {
  const start = act(id).startBar;
  const end = act(id).endBar;
  const points = [start, ...cuts.map((c) => start + c), end];
  const out = [];
  for (let i = 0; i < points.length - 1; i++) {
    out.push(bar(points[i + 1]) - bar(points[i]));
  }
  return out;
};

export const ALL_ACTS = ACTS;
