import { describe, it, expect } from "vitest";
import { stylesMeta } from "@/lib/styles/meta-registry";
import {
  getScenarioAssignments,
  getStyleScenarios,
  STYLE_SCENARIOS,
} from "@/lib/styles/scenarios";

describe("scenario assignments", () => {
  const assignments = getScenarioAssignments();

  it("every registered style has an explicit scenario assignment", () => {
    const missing = stylesMeta
      .map((style) => style.slug)
      .filter((slug) => !(slug in assignments));
    expect(
      missing,
      `Unclassified styles (add them to SCENARIO_ASSIGNMENTS in lib/styles/scenarios.ts): ${missing.join(", ")}`
    ).toEqual([]);
  });

  it("every assignment references a registered style", () => {
    const registered = new Set(stylesMeta.map((style) => style.slug));
    const orphaned = Object.keys(assignments).filter(
      (slug) => !registered.has(slug)
    );
    expect(
      orphaned,
      `Assignments for unregistered styles: ${orphaned.join(", ")}`
    ).toEqual([]);
  });

  it("assigns between 1 and 3 valid, unique scenarios per style", () => {
    for (const [slug, scenarios] of Object.entries(assignments)) {
      expect(scenarios.length, `${slug} scenario count`).toBeGreaterThanOrEqual(1);
      expect(scenarios.length, `${slug} scenario count`).toBeLessThanOrEqual(3);
      expect(new Set(scenarios).size, `${slug} has duplicate scenarios`).toBe(
        scenarios.length
      );
      for (const scenario of scenarios) {
        expect(STYLE_SCENARIOS, `${slug} -> ${scenario}`).toContain(scenario);
      }
    }
  });

  it("getStyleScenarios respects the limit and assignment order", () => {
    const style = stylesMeta.find((s) => s.slug === "neo-brutalist")!;
    expect(getStyleScenarios(style)).toEqual(assignments["neo-brutalist"]);
    expect(getStyleScenarios(style, 2)).toEqual(
      assignments["neo-brutalist"].slice(0, 2)
    );
  });

  it("every scenario has at least one style", () => {
    const used = new Set(Object.values(assignments).flat());
    for (const scenario of STYLE_SCENARIOS) {
      expect(used, `scenario "${scenario}" has no styles`).toContain(scenario);
    }
  });
});
