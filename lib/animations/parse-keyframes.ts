/**
 * Keyframe parsing utilities for the animation playground.
 *
 * Extracts @keyframes blocks from CSS snippet strings at runtime,
 * eliminating the need for a hardcoded keyframe map.
 */

const KEYFRAME_NAME_RE = /@keyframes\s+([\w-]+)\s*\{/;

/**
 * Extract the first @keyframes name from a CSS string.
 *
 * @example
 * extractKeyframeName("@keyframes fade-in-up { ... }") // "fade-in-up"
 */
export function extractKeyframeName(css: string): string | null {
  const match = css.match(KEYFRAME_NAME_RE);
  return match ? match[1] : null;
}

/**
 * Extract the full first @keyframes block (including the @keyframes wrapper)
 * from a CSS string.
 *
 * @example
 * extractKeyframesBlock("...@keyframes fade-in-up { from { ... } to { ... } }...")
 * // "@keyframes fade-in-up { from { ... } to { ... } }"
 */
export function extractKeyframesBlock(css: string): string | null {
  // Match the entire @keyframes rule including nested braces.
  // Strategy: find "@keyframes <name> {" then count braces to find the closing one.
  const startMatch = css.match(/@keyframes\s+[\w-]+\s*\{/);
  if (!startMatch || startMatch.index === undefined) return null;

  const startIdx = startMatch.index;
  let depth = 0;
  let endIdx = startIdx;

  for (let i = startIdx; i < css.length; i++) {
    if (css[i] === "{") depth++;
    if (css[i] === "}") {
      depth--;
      if (depth === 0) {
        endIdx = i + 1;
        break;
      }
    }
  }

  if (depth !== 0) return null;
  return css.slice(startIdx, endIdx);
}

/**
 * Build a CSS animation shorthand string.
 */
export function buildAnimationCSS(
  name: string,
  duration: number,
  easing: string,
  delay: number,
  isContinuous: boolean,
): string {
  const fill = isContinuous ? "infinite" : "both";
  return `${name} ${duration}ms ${easing} ${delay}ms ${fill}`;
}
