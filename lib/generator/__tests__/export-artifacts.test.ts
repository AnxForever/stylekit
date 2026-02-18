import { describe, expect, it } from "vitest";
import { getTemplateByType } from "@/lib/generator";
import { generateGeneratorSupportFiles } from "@/lib/generator/export-artifacts";
import { styles } from "@/lib/styles";
import type { GeneratorConfig, SectionConfig, TemplateType } from "@/lib/generator/types";

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

describe("generateGeneratorSupportFiles", () => {
  it("returns manifest json and helper markdown artifacts", () => {
    const visualStyle = styles.find((style) => style.styleType === "visual");
    expect(visualStyle).toBeTruthy();
    if (!visualStyle) {
      return;
    }

    const config: GeneratorConfig = {
      styleSlug: visualStyle.slug,
      templateType: "landing",
      outputFormat: "html",
      sections: buildSections("landing"),
      globalContent: {
        siteName: "Demo Site",
        siteDescription: "Demo Description",
      },
    };

    const files = generateGeneratorSupportFiles(config, {
      type: "builtin",
      style: visualStyle,
    });

    expect(files.map((file) => file.name)).toEqual([
      "stylekit.config.json",
      "CONTENT_MAP.md",
      "GENERATOR_BRIEF.md",
    ]);

    const manifest = files.find((file) => file.name === "stylekit.config.json");
    expect(manifest).toBeTruthy();
    if (!manifest) {
      return;
    }

    const payload = JSON.parse(manifest.content) as {
      generator: { templateType: string; outputFormat: string };
      style: { type: string; id: string };
      sections: Array<{ id: string }>;
    };

    expect(payload.generator.templateType).toBe("landing");
    expect(payload.generator.outputFormat).toBe("html");
    expect(payload.style.type).toBe("builtin");
    expect(payload.style.id).toBe(visualStyle.slug);
    expect(payload.sections.length).toBeGreaterThan(0);

    const contentMap = files.find((file) => file.name === "CONTENT_MAP.md");
    expect(contentMap?.content).toContain("## hero");

    const brief = files.find((file) => file.name === "GENERATOR_BRIEF.md");
    expect(brief?.content).toContain("## Snapshot");
    expect(brief?.content).toContain("## Section Focus");
  });
});
