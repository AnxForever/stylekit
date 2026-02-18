import { describe, expect, it } from "vitest";
import type { GeneratorConfig } from "@/lib/generator/types";
import { landingTemplate } from "@/lib/generator/templates/landing";
import {
  evaluateGeneratedFiles,
  sanitizeGeneratorConfig,
  validateGeneratorConfig,
} from "@/lib/generator/quality";

function createConfig(overrides: Partial<GeneratorConfig> = {}): GeneratorConfig {
  return {
    styleSlug: "apple-style",
    templateType: "landing",
    outputFormat: "html",
    sections: [
      {
        id: "hero",
        name: "Hero",
        nameEn: "Hero",
        description: "",
        enabled: true,
        content: {
          headline: "Build better products",
          subheadline: "Ship faster with confidence.",
        },
      },
    ],
    globalContent: {
      siteName: "My Website",
      siteDescription: "Welcome to my website",
    },
    ...overrides,
  };
}

describe("generator quality pipeline", () => {
  it("sanitizes unsafe tokens from generator config", () => {
    const config = createConfig({
      globalContent: {
        siteName: "<script>alert(1)</script> Brand `${x}`",
        siteDescription: "javascript:alert(1)",
      },
      sections: [
        {
          id: "hero",
          name: "Hero",
          nameEn: "Hero",
          description: "",
          enabled: true,
          content: {
            headline: "Hello ${danger}",
            subheadline: "Look at <b>this</b>",
          },
        },
      ],
    });

    const sanitized = sanitizeGeneratorConfig(config, landingTemplate);
    expect(sanitized.globalContent.siteName).not.toContain("<script>");
    expect(sanitized.globalContent.siteName).not.toContain("`");
    expect(sanitized.sections[0]?.content.headline).not.toContain("${");
    expect(sanitized.sections[0]?.content.subheadline).not.toContain("<");
  });

  it("fails validation when site name is missing or sections are disabled", () => {
    const config = createConfig({
      globalContent: {
        siteName: "   ",
        siteDescription: "desc",
      },
      sections: [
        {
          id: "hero",
          name: "Hero",
          nameEn: "Hero",
          description: "",
          enabled: false,
          content: {},
        },
      ],
    });

    const validation = validateGeneratorConfig(config, landingTemplate);
    const codes = validation.errors.map((issue) => issue.code);
    expect(codes).toContain("SITE_NAME_REQUIRED");
    expect(codes).toContain("NO_SECTION_ENABLED");
  });

  it("reports output quality errors and placeholder warnings", () => {
    const config = createConfig({ outputFormat: "html" });
    const report = evaluateGeneratedFiles(config, [
      {
        name: "README.md",
        content: "TODO: replace Your Company and example.com",
        type: "md",
      },
    ]);

    expect(report.errors).toContain("Missing required output file: index.html");
    expect(report.warnings.some((warning) => warning.includes("TODO marker"))).toBe(
      true
    );
  });
});
