import { describe, expect, it } from "vitest";
import { getTemplateByType } from "@/lib/generator";
import { generateNextjsFiles } from "@/lib/generator/renderers/nextjs-renderer";
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

describe("generateNextjsFiles", () => {
  it("creates next.js app router project artifacts", () => {
    const style = styles.find((item) => item.styleType === "visual");
    expect(style).toBeTruthy();
    if (!style) {
      return;
    }

    const config: GeneratorConfig = {
      styleSlug: style.slug,
      templateType: "landing",
      outputFormat: "nextjs",
      sections: buildSections("landing"),
      globalContent: {
        siteName: "Next Demo",
        siteDescription: "Next demo description",
      },
    };

    const files = generateNextjsFiles(config, {
      type: "builtin",
      style,
    });

    const fileNames = files.map((file) => file.name);
    expect(fileNames).toContain("app/page.tsx");
    expect(fileNames).toContain("app/(marketing)/page.tsx");
    expect(fileNames).toContain("app/layout.tsx");
    expect(fileNames).toContain("app/globals.css");
    expect(fileNames).toContain("next.config.ts");
    expect(fileNames).toContain("next-env.d.ts");
    expect(fileNames).toContain("stylekit.config.json");
    expect(fileNames).toContain("CONTENT_MAP.md");
    expect(fileNames).toContain("GENERATOR_BRIEF.md");
    expect(fileNames).toContain("README.md");

    expect(fileNames).not.toContain("src/App.tsx");
    expect(fileNames).not.toContain("src/main.tsx");
    expect(fileNames).not.toContain("vite.config.ts");
  });

  it("uses dashboard route group for dashboard templates", () => {
    const style = styles.find((item) => item.styleType === "visual");
    expect(style).toBeTruthy();
    if (!style) {
      return;
    }

    const config: GeneratorConfig = {
      styleSlug: style.slug,
      templateType: "dashboard",
      outputFormat: "nextjs",
      sections: buildSections("dashboard"),
      globalContent: {
        siteName: "Dashboard Demo",
        siteDescription: "Dashboard demo description",
      },
    };

    const files = generateNextjsFiles(config, {
      type: "builtin",
      style,
    });
    const fileNames = files.map((file) => file.name);

    expect(fileNames).toContain("app/(dashboard)/page.tsx");
  });
});
