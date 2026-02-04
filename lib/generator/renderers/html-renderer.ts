/**
 * HTML Renderer - Generates complete HTML files from templates
 */

import type { DesignStyle } from "@/lib/styles";
import type { GeneratorConfig, GeneratedFile, SectionConfig, StyleInput } from "../types";
import {
  generateBaseCss,
  getStyleSpecificCss,
  generateCssVariablesFromStyle,
  generateCssVariablesFromCustomStyle,
} from "../style-injector";
import {
  landingTemplate,
  generateHeroHtml,
  generateFeaturesHtml,
  generateCtaHtml,
  generateFooterHtml,
  generateLandingCss,
} from "../templates/landing";
import {
  portfolioTemplate,
  generatePortfolioHeroHtml,
  generatePortfolioProjectsHtml,
  generatePortfolioAboutHtml,
  generatePortfolioContactHtml,
  generatePortfolioCss,
} from "../templates/portfolio";

/**
 * Get section content by ID
 */
function getSectionContent(sections: SectionConfig[], sectionId: string): Record<string, string> {
  const section = sections.find((s) => s.id === sectionId);
  return section?.content || {};
}

/**
 * Check if section is enabled
 */
function isSectionEnabled(sections: SectionConfig[], sectionId: string): boolean {
  const section = sections.find((s) => s.id === sectionId);
  return section?.enabled ?? true;
}

/**
 * Generate landing page HTML
 */
function generateLandingHtml(
  config: GeneratorConfig,
  styleInput: StyleInput
): string {
  const { sections, globalContent } = config;

  // Generate section HTML
  let sectionsHtml = "";

  if (isSectionEnabled(sections, "hero")) {
    sectionsHtml += generateHeroHtml(getSectionContent(sections, "hero"));
  }

  if (isSectionEnabled(sections, "features")) {
    sectionsHtml += generateFeaturesHtml(getSectionContent(sections, "features"));
  }

  if (isSectionEnabled(sections, "cta")) {
    sectionsHtml += generateCtaHtml(getSectionContent(sections, "cta"));
  }

  if (isSectionEnabled(sections, "footer")) {
    sectionsHtml += generateFooterHtml(getSectionContent(sections, "footer"));
  }

  // Generate CSS based on style type
  let cssVariables: string;
  let styleCss = "";

  if (styleInput.type === "builtin") {
    cssVariables = generateCssVariablesFromStyle(styleInput.style);
    styleCss = getStyleSpecificCss(styleInput.style);
  } else {
    cssVariables = generateCssVariablesFromCustomStyle(styleInput.style.definition);
    // Custom styles don't have special overrides
  }

  const baseCss = generateBaseCss();
  const landingCss = generateLandingCss();

  const fullCss = `${cssVariables}\n\n${baseCss}\n\n${landingCss}\n\n${styleCss}`;

  // Generate full HTML
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${globalContent.siteName || "My Website"}</title>
  <meta name="description" content="${globalContent.siteDescription || ""}">
  <style>
${fullCss}
  </style>
</head>
<body>
${sectionsHtml}
</body>
</html>`;
}

/**
 * Generate portfolio page HTML
 */
function generatePortfolioHtml(
  config: GeneratorConfig,
  styleInput: StyleInput
): string {
  const { sections, globalContent } = config;

  // Generate section HTML
  let sectionsHtml = "";

  if (isSectionEnabled(sections, "hero")) {
    sectionsHtml += generatePortfolioHeroHtml(getSectionContent(sections, "hero"));
  }

  if (isSectionEnabled(sections, "projects")) {
    sectionsHtml += generatePortfolioProjectsHtml(getSectionContent(sections, "projects"));
  }

  if (isSectionEnabled(sections, "about")) {
    sectionsHtml += generatePortfolioAboutHtml(getSectionContent(sections, "about"));
  }

  if (isSectionEnabled(sections, "contact")) {
    sectionsHtml += generatePortfolioContactHtml(getSectionContent(sections, "contact"));
  }

  // Generate CSS based on style type
  let cssVariables: string;
  let styleCss = "";

  if (styleInput.type === "builtin") {
    cssVariables = generateCssVariablesFromStyle(styleInput.style);
    styleCss = getStyleSpecificCss(styleInput.style);
  } else {
    cssVariables = generateCssVariablesFromCustomStyle(styleInput.style.definition);
  }

  const baseCss = generateBaseCss();
  const portfolioCss = generatePortfolioCss();

  const fullCss = `${cssVariables}\n\n${baseCss}\n\n${portfolioCss}\n\n${styleCss}`;

  // Generate full HTML
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${globalContent.siteName || "My Portfolio"}</title>
  <meta name="description" content="${globalContent.siteDescription || ""}">
  <style>
${fullCss}
  </style>
</head>
<body>
${sectionsHtml}
</body>
</html>`;
}

/**
 * Generate all files for HTML output
 */
export function generateHtmlFiles(
  config: GeneratorConfig,
  styleInput: StyleInput
): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  // Generate based on template type
  let html = "";
  if (config.templateType === "landing") {
    html = generateLandingHtml(config, styleInput);
  } else if (config.templateType === "portfolio") {
    html = generatePortfolioHtml(config, styleInput);
  }

  if (html) {
    files.push({
      name: "index.html",
      content: html,
      type: "html",
    });

    // Generate README
    files.push({
      name: "README.md",
      content: generateReadme(config, styleInput),
      type: "md",
    });
  }

  return files;
}

/**
 * Generate preview HTML (for iframe)
 */
export function generatePreviewHtml(
  config: GeneratorConfig,
  styleInput: StyleInput
): string {
  if (config.templateType === "landing") {
    return generateLandingHtml(config, styleInput);
  }

  if (config.templateType === "portfolio") {
    return generatePortfolioHtml(config, styleInput);
  }

  return "<p>Preview not available</p>";
}

/**
 * Generate README file
 */
function generateReadme(config: GeneratorConfig, styleInput: StyleInput): string {
  const siteName = config.globalContent.siteName || "My Website";

  // Get style name based on type
  const styleName = styleInput.type === "builtin"
    ? `${styleInput.style.name} (${styleInput.style.nameEn})`
    : `${styleInput.style.name} (${styleInput.style.nameEn})`;

  const primaryColor = styleInput.type === "builtin"
    ? styleInput.style.colors.primary
    : styleInput.style.definition.colors.primary;

  return `# ${siteName}

Generated with [StyleKit](https://stylekit.dev) using the **${styleName}** style.

## Getting Started

1. Open \`index.html\` in your browser
2. Edit the HTML to customize your content
3. Deploy to any static hosting (Vercel, Netlify, GitHub Pages, etc.)

## Style Information

- **Style**: ${styleName}
- **Template**: ${config.templateType === "landing" ? "Landing Page" : config.templateType === "portfolio" ? "Portfolio" : config.templateType}
- **Output Format**: HTML

## Customization

### Colors

Edit the CSS variables in the \`<style>\` section of \`index.html\`:

\`\`\`css
:root {
  --color-primary: ${primaryColor};
  /* ... */
}
\`\`\`

### Content

Edit the HTML directly to change text, images, and links.

## License

This template is free to use for personal and commercial projects.

---

Made with StyleKit
`;
}
