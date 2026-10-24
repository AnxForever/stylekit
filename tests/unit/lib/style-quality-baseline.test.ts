import { describe, expect, it } from "vitest";

import { scoreStyle } from "@/lib/accessibility";
import { styles } from "@/lib/styles/registry";
import { getStyleQuality } from "@/lib/styles/quality";
import { hasLintableRules } from "@/lib/styles/style-linter";

/**
 * Frozen quality baseline for the whole style library.
 *
 * Re-measured 2026-10-24 across 149 styles, after quantized-line-field joined
 * the library (it scores 56). It exists because the submission quality
 * gates were designed against these numbers: a11y scores were rejected as a
 * hard gate precisely because 78 of our own curated styles score under 60
 * (apple-style 56, material-design 57, soft-ui 46). Low contrast is the design
 * language of neumorphism and soft-ui, not a defect.
 *
 * The distribution itself did not move when the library grew to 149: min/p25/
 * p50/p75/max are unchanged, and the sub-60 count rose by one (quantized-line-
 * field scores 56). The gate thresholds stay valid.
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
    expect(styles.length).toBe(149);
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
    expect(scores.filter((value) => value < 60).length).toBe(78);
  });

  it("has complete component code for every style", () => {
    // This one IS a hard gate for submissions: our own library meets it 149/149.
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
