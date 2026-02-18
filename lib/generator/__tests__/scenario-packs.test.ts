import { describe, expect, it } from "vitest";
import { getTemplateByType } from "@/lib/generator";
import {
  applyScenarioPackToSections,
  getScenarioPackById,
  getScenarioPacksByTemplate,
} from "@/lib/generator/scenario-packs";
import type { SectionConfig, TemplateType } from "@/lib/generator/types";

function buildSections(templateType: TemplateType): SectionConfig[] {
  const template = getTemplateByType(templateType);
  if (!template) {
    throw new Error(`Template not found: ${templateType}`);
  }

  return template.sections.map((section) => ({
    id: section.id,
    name: section.name,
    nameEn: section.nameEn,
    description: section.description,
    enabled: section.defaultEnabled,
    content: Object.fromEntries(section.fields.map((field) => [field.id, field.defaultValue])),
  }));
}

describe("scenario packs", () => {
  it("provides presets for each built-in template", () => {
    const templates: TemplateType[] = ["landing", "portfolio", "blog", "dashboard"];
    for (const templateType of templates) {
      const packs = getScenarioPacksByTemplate(templateType);
      expect(packs.length).toBeGreaterThan(0);
    }
  });

  it("resolves packs by id", () => {
    const pack = getScenarioPackById("saas-revenue-dashboard");
    expect(pack).toBeTruthy();
    expect(pack?.templateType).toBe("dashboard");
  });

  it("applies section content overrides from pack", () => {
    const pack = getScenarioPackById("saas-revenue-dashboard");
    expect(pack).toBeTruthy();
    if (!pack) {
      return;
    }

    const sections = buildSections("dashboard");
    const patched = applyScenarioPackToSections(sections, pack);
    const sidebar = patched.find((section) => section.id === "sidebar");

    expect(sidebar).toBeTruthy();
    expect(sidebar?.content.appName).toBe("Revenue Control");
  });

  it("exposes localized copy for chinese scenario packs", () => {
    const pack = getScenarioPackById("education-enrollment-landing-zh");
    expect(pack).toBeTruthy();
    expect(pack?.nameZh).toBeTruthy();
    expect(pack?.descriptionZh).toBeTruthy();
  });
});
