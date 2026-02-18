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

function createSupportFiles() {
  return [
    { name: "README.md", content: "# Generated Site", type: "md" as const },
    { name: "stylekit.config.json", content: "{}", type: "json" as const },
    { name: "CONTENT_MAP.md", content: "# Content Map", type: "md" as const },
    { name: "GENERATOR_BRIEF.md", content: "# Brief", type: "md" as const },
  ];
}

function createHtmlOutput(indexHtml: string) {
  return [
    { name: "index.html", content: indexHtml, type: "html" as const },
    ...createSupportFiles(),
  ];
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

  it("blocks unresolved placeholder tokens in generated files", () => {
    const config = createConfig({ outputFormat: "html" });
    const report = evaluateGeneratedFiles(
      config,
      createHtmlOutput(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>{{ hero_title }}</h1>
</body>
</html>`)
    );

    expect(
      report.errors.some((error) =>
        error.includes("contains blocking placeholder: unresolved template token")
      )
    ).toBe(true);
  });

  it("flags mobile and accessibility issues in html output", () => {
    const config = createConfig({ outputFormat: "html" });
    const report = evaluateGeneratedFiles(
      config,
      createHtmlOutput(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
</head>
<body>
  <h1>Hello</h1>
  <img src="/hero.png">
</body>
</html>`)
    );

    expect(report.errors).toContain(
      "index.html is missing a viewport meta tag for mobile rendering."
    );
    expect(report.warnings).toContain(
      "index.html includes <img> tags without alt text."
    );
  });

  it("warns when responsive breakpoints are missing in react output", () => {
    const config = createConfig({ outputFormat: "react" });
    const report = evaluateGeneratedFiles(config, [
      {
        name: "index.html",
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
        type: "html",
      },
      { name: "package.json", content: "{}", type: "json" },
      {
        name: "src/App.tsx",
        content: "export default function App() { return <main><h1>Demo</h1></main>; }",
        type: "js",
      },
      ...createSupportFiles(),
    ]);

    expect(report.warnings).toContain(
      "No responsive breakpoints detected in output. Add mobile/tablet adaptations."
    );
  });
});
