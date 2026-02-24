import { describe, it, expect } from "vitest";
import { styles } from "@/lib/styles";
import { detectStyleRuleConflicts } from "@/lib/styles/rule-normalizer";

describe("style rule normalization", () => {
  it("keeps do/dont lists free of hard utility conflicts", () => {
    const conflicts = styles
      .map((style) => ({ slug: style.slug, report: detectStyleRuleConflicts(style) }))
      .filter((entry) => entry.report.doDont.length > 0)
      .map((entry) => `${entry.slug}: ${entry.report.doDont.join(", ")}`);

    expect(conflicts).toEqual([]);
  });

  it("keeps aiRules aligned with do/dont utility constraints", () => {
    const conflicts = styles
      .map((style) => ({ slug: style.slug, report: detectStyleRuleConflicts(style) }))
      .filter((entry) => entry.report.aiRules.length > 0)
      .map((entry) => `${entry.slug}: ${entry.report.aiRules.join(", ")}`);

    expect(conflicts).toEqual([]);
  });
});

