import { describe, expect, it } from "vitest";
import fixture from "../../fixtures/style-lint-contract.json";
import { getImplementationBrief } from "@/lib/implementation-brief";
import { lintStyleCode, type StyleLintComponent } from "@/lib/styles/style-linter";
import { styles } from "@/lib/styles";
import { getComponentRecipe } from "@/lib/discovery";

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
