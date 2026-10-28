import { describe, expect, it } from "vitest";
import {
  getComponentUsageGuidance,
  normalizeUsageGuideComponentId,
} from "../usage-guidance";

describe("component usage guidance", () => {
  it("provides bilingual decision guidance for every supported component kind", () => {
    for (const componentId of [
      "button",
      "card",
      "input",
      "nav",
      "hero",
      "footer",
      "others",
    ]) {
      const result = getComponentUsageGuidance(componentId);

      expect(result.componentId).toBe(componentId);
      for (const section of [
        result.title,
        result.whenToUse,
        result.whenNotToUse,
        result.semanticsAndInteraction,
        result.exampleScope,
        result.motion,
      ]) {
        expect(section.zh.trim()).not.toBe("");
        expect(section.en.trim()).not.toBe("");
      }
    }
  });

  it("normalizes common aliases and uses the general guide for unknown ids", () => {
    expect(normalizeUsageGuideComponentId(" Navigation ")).toBe("nav");
    expect(normalizeUsageGuideComponentId("field")).toBe("input");
    expect(normalizeUsageGuideComponentId("pricing-table")).toBe("others");
    expect(getComponentUsageGuidance("unknown").componentId).toBe("others");
  });
});
