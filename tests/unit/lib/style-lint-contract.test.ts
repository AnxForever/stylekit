import { describe, expect, it } from "vitest";
import fixture from "../../fixtures/style-lint-contract.json";
import { getImplementationBrief } from "@/lib/implementation-brief";
import { lintCodeWithRules, lintStyleCode, type StyleLintComponent } from "@/lib/styles/style-linter";
import { styles } from "@/lib/styles";
import { getComponentRecipe } from "@/lib/discovery";
import { rulesFromBrief } from "@/packages/core/src/discovery/live-lint";

describe("shared static lint contract", () => {
  for (const [slug, spec] of Object.entries(fixture.specs)) {
    it(`keeps exported rules for ${slug} in sync with the Python fixture`, () => {
      expect(getImplementationBrief(slug)!.lintRules).toEqual(spec.lintRules);
    });
  }
  for (const sample of fixture.cases) {
    it(sample.name, () => {
      const component = "component" in sample ? sample.component as StyleLintComponent : undefined;
      const report = lintStyleCode(sample.slug, sample.code, {
        checkRequired: component ? [component] : [],
        strict: "strict" in sample ? sample.strict : false,
      });
      expect(report.status).toBe(sample.status);
      expect(report.ok).toBe(sample.status === "pass");
    });
  }
  it("serializes and rehydrates state-scoped v2 exceptions without widening the base rule", () => {
    const brief = getImplementationBrief("synthwave")!;
    const contract = brief.lintRules as Record<string, unknown>;
    expect(contract.schemaVersion).toBe("stylekit-lint-v2");
    expect(contract.forbiddenExceptions).toHaveLength(2);

    const rules = rulesFromBrief(brief);
    expect(rules).not.toBeNull();
    const active = lintCodeWithRules(rules!, '<button className="active:bg-white active:text-black" />', { slug: "synthwave" });
    expect(active.status).toBe("pass");
    const base = lintCodeWithRules(rules!, '<button className="bg-white text-black" />', { slug: "synthwave" });
    expect(base.status).toBe("fail");

    const malformedBrief = {
      ...brief,
      lintRules: {
        ...contract,
        forbiddenExceptions: [{ className: "bg-white", reason: "empty scope", variants: { all: [] } }],
      },
    } as unknown as Parameters<typeof rulesFromBrief>[0];
    expect(rulesFromBrief(malformedBrief)).toBeNull();
  });

  it("does not let a hover-only class satisfy a default requirement", () => {
    const report = lintStyleCode("neo-brutalist", '<button className="hover:border-2" />', { checkRequired: ["button"], strict: true });
    expect(report.missingRequired[0].missing).toContain("border-2");
  });

  it("ships no forbidden utilities in default button/card/input recipes", () => {
    const violations: string[] = [];
    for (const style of styles) {
      for (const component of ["button", "card", "input"]) {
        const recipe = getComponentRecipe(style.slug, component);
        expect(recipe, `${style.slug}/${component}`).not.toBeNull();
        const report = lintStyleCode(style.slug, recipe!.code);
        for (const violation of report.violations) violations.push(`${style.slug}/${component}: ${violation.className}`);
      }
    }
    expect(violations).toEqual([]);
  });
});
