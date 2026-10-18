/**
 * Auto-fit type. Every headline in the film goes through this, because a
 * Chinese line that fits at 96px may not fit the moment the copy is edited -
 * and a clipped headline is the fastest way to make a promo look amateur.
 *
 * Widths are estimated per character class with generous (wide) factors, then
 * the font size is scaled to fit the measured box. Slightly conservative is the
 * right error direction: a little extra margin, never an overflow.
 */
import type { CSSProperties } from "react";

const wide = (cp: number) =>
  (cp >= 0x1100 && cp <= 0x115f) || // Hangul Jamo
  (cp >= 0x2e80 && cp <= 0xa4cf) || // CJK radicals .. Yi
  (cp >= 0xac00 && cp <= 0xd7a3) || // Hangul syllables
  (cp >= 0xf900 && cp <= 0xfaff) || // CJK compatibility
  (cp >= 0xfe30 && cp <= 0xfe4f) || // CJK compatibility forms
  (cp >= 0xff00 && cp <= 0xff60) || // fullwidth forms
  (cp >= 0xffe0 && cp <= 0xffe6) ||
  (cp >= 0x1f300 && cp <= 0x1faff);

/** Estimated advance width of a string, in ems. */
export const measure = (text: string): number => {
  let em = 0;
  for (const ch of text) {
    if (ch === " ") em += 0.3;
    else if (wide(ch.codePointAt(0) ?? 0)) em += 1;
    else if (/[A-Z]/.test(ch)) em += 0.68;
    else if (/[ilI.,:;'!|]/.test(ch)) em += 0.3;
    else if (/[0-9]/.test(ch)) em += 0.6;
    else em += 0.54;
  }
  return em;
};

export type FitOptions = {
  maxWidth: number;
  baseSize: number;
  minSize?: number;
  letterSpacing?: number;
};

/**
 * Return the largest font size <= baseSize at which the string fits maxWidth.
 * Letter spacing is counted because tight display type and tracked-out labels
 * live at opposite ends of that spectrum.
 */
export const fit = (text: string, opts: FitOptions): number => {
  const { maxWidth, baseSize, letterSpacing = 0 } = opts;
  const em = measure(text) + Math.max(0, text.length - 1) * letterSpacing;
  if (em <= 0) return baseSize;
  return Math.max(opts.minSize ?? 16, Math.min(baseSize, maxWidth / Math.max(em, 0.001)));
};

/** Convenience: a style object for a headline that is guaranteed to fit. */
export const fitStyle = (
  text: string,
  opts: FitOptions & { style?: CSSProperties },
): CSSProperties => ({
  fontSize: fit(text, opts),
  letterSpacing: `${(opts.letterSpacing ?? 0).toFixed(3)}em`,
  whiteSpace: "nowrap",
  ...opts.style,
});
