import { describe, expect, it } from "vitest";
import baseline from "@/tests/fixtures/prompt-delivery-baseline.json";
import {
  compareDelivery,
  measureDelivery,
  type PromptDelivery,
} from "@/tools/scripts/check-prompt-regression";

/**
 * The prompt someone copies is assembled from the authored rules, the generated
 * token spec, the normalizer that rewrites rules at load, and the builder that
 * joins them. Each of those has already silently removed content from all 146
 * styles at once: the normalizer deleted a code block it mistook for a heading,
 * and the builder discarded the authored rules whenever a token spec existed.
 *
 * Growth is fine. Shrinking, losing the token dictionary, or leaving a code
 * fence open is a regression, and re-recording the baseline should be a
 * deliberate act with a reason.
 */
describe("prompt delivery baseline", () => {
  it("never delivers less than it used to", () => {
    const findings = compareDelivery(
      baseline as Record<string, PromptDelivery>,
      measureDelivery()
    );

    expect(findings.map((finding) => `${finding.slug}: ${finding.message}`)).toEqual(
      []
    );
  });

  it("covers every style in the catalog", () => {
    const current = measureDelivery();
    const missing = Object.keys(current).filter(
      (slug) => !(slug in (baseline as Record<string, unknown>))
    );

    // A new style with no baseline entry is unprotected, so record it.
    expect(missing).toEqual([]);
  });
});
