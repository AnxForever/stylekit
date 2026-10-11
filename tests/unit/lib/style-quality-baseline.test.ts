import { describe, expect, it } from "vitest";

import { scoreStyle } from "@/lib/accessibility";
import { styles } from "@/lib/styles/registry";
import { getStyleQuality } from "@/lib/styles/quality";
import { hasLintableRules } from "@/lib/styles/style-linter";

/**
 * Frozen quality baseline for the whole style library.
 *
 * The initial full measurement was taken 2026-09-04 across 148 styles, after
 * kinetic-constructivism and broadcast-glitch joined the library. At that
 * baseline, 77 curated styles scored under 60 (apple-style 56, material-design
 * 57, soft-ui 46). This is why accessibility remains a soft signal rather
 * than a hard submission gate: low contrast can be part of a style's design.
 *
 * When the library grew from 146 to 148 styles, min/p25/p50/p75/max stayed
 * byte-identical and the sub-60 count rose by exactly one: kinetic-constructivism
 * scores 58, while broadcast-glitch scores 60 and clears the line.
 *
 * Updated 2026-10-11 after the Editorial token correction: using the same scorer
 * with the previous Editorial style and tokens gives 59; the corrected source
 * scores 65. The sub-60 count is therefore 76. The 60 threshold and the other
 * measured distribution landmarks are unchanged.
 *
 * If a refactor moves these numbers, the gate thresholds derived from them are
 * no longer valid and must be re-derived rather than nudged back.
 */
describe("style library quality baseline", () => {
  const scores = styles
    .map((style) => scoreStyle(style.slug)?.overall)
    .filter((value): value is number => typeof value === "number")
    .sort((a, b) => a - b);

  const percentile = (p: number) => scores[Math.floor((scores.length - 1) * p)];

  it("covers every registered style", () => {
    expect(styles.length).toBe(148);
    expect(scores.length).toBe(styles.length);
  });

  it("holds the measured a11y distribution", () => {
    expect(scores[0]).toBe(27);
    expect(percentile(0.25)).toBe(51);
    expect(percentile(0.5)).toBe(59);
    expect(percentile(0.75)).toBe(69);
    expect(scores[scores.length - 1]).toBe(97);
  });

  it("keeps the count of curated styles that would fail an a11y >= 60 gate", () => {
    // The reason a11y is a soft signal, not a hard gate.
    expect(scores.filter((value) => value < 60).length).toBe(76);
  });

  it("keeps the corrected Editorial score at or above the soft threshold", () => {
    expect(scoreStyle("editorial")?.overall).toBeGreaterThanOrEqual(60);
  });

  it("has complete component code for every style", () => {
    // This one IS a hard gate for submissions: our own library meets it 148/148.
    const complete = styles.filter(
      (style) => getStyleQuality(style).capabilities.componentCode === "complete",
    );
    expect(complete.length).toBe(styles.length);
  });

  it("has lintable rules for every style", () => {
    // Every style ships tokens, so token-derived rules always exist. Submissions
    // must supply tokens for the same reason: without them nothing can be linted.
    expect(styles.every((style) => hasLintableRules(style.slug))).toBe(true);
  });
});
