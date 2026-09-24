/**
 * Reduced-motion safety classification for animations.
 *
 * CSS `@media (prefers-reduced-motion: reduce)` should disable or dampen any
 * motion that could trigger vestibular disorders — large位移、持续旋转、闪烁、
 * 视差绑定的运动。 Pure opacity fades and draw-on effects are generally safe.
 *
 * Coverage strategy: rather than hand-annotate all 58 animations, we derive a
 * conservative default from the slug. Animations whose slugs match a
 * high-motion pattern are classified `false` (needs a reduced-motion wrapper);
 * everything else defaults to `true`. Curators can override per-animation by
 * setting `accessibilityNotes` explicitly in the data file — future work.
 *
 * This is an inferred value, not a hand-audited one — surfaced to the UI as
 * such so users know to verify against their own sensitivity needs.
 */

// Slug substrings that signal large / sustained / disorienting motion.
// Matched as substring (case-insensitive) against the animation slug.
const UNSAFE_PATTERNS = [
  // large displacement
  "bounce", "shake", "elastic", "magnetic", "marquee", "parallax",
  "slide", "drag", "distortion", "repulsion", "scramble", "morph",
  // rotation / 3D
  "rotate", "spin", "tilt", "flip", "turn", "peel",
  // high-intensity / flashing / bursting
  "glitch", "confetti", "burst", "flash", "pulse-ring", "gradient-flow",
  "shimmer", "trail", "aura",
  // scroll-bound large motion
  "scroll-page", "scroll-peel", "page-turn",
] as const;

/**
 * Returns `true` if the animation is considered safe under
 * `prefers-reduced-motion: reduce` (pure opacity / draw / static), `false` if
 * it should be wrapped or disabled. Derived from slug — see file header.
 */
export function getReducedMotionSafe(slug: string): boolean {
  const s = slug.toLowerCase();
  return !UNSAFE_PATTERNS.some((p) => s.includes(p));
}

/** Human-readable label for the derived safety value, bilingual. */
export function reducedMotionLabel(safe: boolean, locale: "zh" | "en"): string {
  if (locale === "zh") {
    return safe ? "reduced-motion 安全" : "需 reduced-motion 包裹";
  }
  return safe ? "reduced-motion safe" : "needs reduced-motion wrap";
}
