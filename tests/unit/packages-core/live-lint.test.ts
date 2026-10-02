import { describe, expect, it } from "vitest";

import { getImplementationBrief } from "@/lib/implementation-brief";
import { rulesFromBrief } from "@/packages/core/src/discovery/live-lint";
import { styles } from "@/lib/styles";
import { lintCodeWithRules, lintStyleCode } from "@/lib/styles/style-linter";
import type { ImplementationBrief } from "@/lib/implementation-brief";

const parityCases = [
  {
    code: '<div className="rounded-xl shadow-lg bg-gradient-to-r border-gray-300 text-black" />',
    options: {},
  },
  {
    code: '<button className="rounded-none border-2 border-black shadow-none transition-all duration-200" />',
    options: { checkRequired: ["button" as const] },
  },
  {
    code: '<div className={cx("rounded-xl", active && "shadow-lg")} />',
    options: { strict: true, checkRequired: ["card" as const] },
  },
];

describe("portable implementation-brief lint rules", () => {
  it("round-trips every bundled style through the JSON contract without changing lint reports", () => {
    expect(styles.length).toBeGreaterThanOrEqual(148);

    for (const style of styles) {
      const brief = getImplementationBrief(style.slug);
      expect(brief, style.slug).not.toBeNull();
      const rules = rulesFromBrief(brief!);
      expect(rules, style.slug).not.toBeNull();

      for (const testCase of parityCases) {
        const actual = lintCodeWithRules(rules!, testCase.code, {
          ...testCase.options,
          slug: style.slug,
        });
        const expected = lintStyleCode(style.slug, testCase.code, testCase.options);
        expect(actual, `${style.slug}: ${testCase.code}`).toEqual(expected);
      }
    }
  });

  it("marks malformed serialized regex rules as unsupported and inconclusive", () => {
    const brief = JSON.parse(JSON.stringify(getImplementationBrief("neo-brutalist"))) as ImplementationBrief;
    const contract = brief.lintRules as unknown as {
      forbiddenPatterns: Array<Record<string, unknown>>;
    };
    contract.forbiddenPatterns.push({
      pattern: "[",
      flags: "",
      source: "tokens",
      reasons: {},
    });

    const rules = rulesFromBrief(brief);
    expect(rules?.unsupportedRules).toContain("[");
    const report = lintCodeWithRules(rules!, '<div className="p-4" />', { slug: brief.slug });
    expect(report.status).toBe("inconclusive");
    expect(report.warnings).toContain("Some forbidden patterns could not be compiled.");
  });
});
