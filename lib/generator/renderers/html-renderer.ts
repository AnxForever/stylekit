/**
 * HTML Renderer - Generates complete HTML files from templates
 */

import type { GeneratorConfig, GeneratedFile, SectionConfig, StyleInput } from "../types";
import {
  generateBaseCss,
  getStyleSpecificCss,
  generateCssVariablesFromStyle,
  generateCssVariablesFromCustomStyle,
} from "../style-injector";
import {
  generateHeroHtml,
  generateFeaturesHtml,
  generateCtaHtml,
  generateFooterHtml,
  generateLandingCss,
} from "../templates/landing";
import {
  generatePortfolioHeroHtml,
  generatePortfolioProjectsHtml,
  generatePortfolioAboutHtml,
  generatePortfolioContactHtml,
  generatePortfolioCss,
} from "../templates/portfolio";
import {
  generateBlogHeroHtml,
  generateBlogPostsHtml,
  generateBlogSidebarHtml,
  generateBlogFooterHtml,
  generateBlogCss,
} from "../templates/blog";
import {
  generateDashboardSidebarHtml,
  generateDashboardKpiHtml,
  generateDashboardChartsHtml,
  generateDashboardTableHtml,
  generateDashboardFooterHtml,
  generateDashboardCss,
} from "../templates/dashboard";

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
 * Generate blog page HTML
 */
function generateBlogHtml(
  config: GeneratorConfig,
  styleInput: StyleInput
): string {
  const { sections, globalContent } = config;

  // Generate section HTML
  let heroHtml = "";
  let postsHtml = "";
  let sidebarHtml = "";
  let footerHtml = "";

  if (isSectionEnabled(sections, "hero")) {
    heroHtml = generateBlogHeroHtml(getSectionContent(sections, "hero"));
  }

  if (isSectionEnabled(sections, "posts")) {
    postsHtml = generateBlogPostsHtml(getSectionContent(sections, "posts"));
  }

  if (isSectionEnabled(sections, "sidebar")) {
    sidebarHtml = generateBlogSidebarHtml(getSectionContent(sections, "sidebar"));
  }

  if (isSectionEnabled(sections, "footer")) {
    footerHtml = generateBlogFooterHtml(getSectionContent(sections, "footer"));
  }

  // Build blog layout with main + sidebar
  const blogLayoutHtml = (postsHtml || sidebarHtml)
    ? `\n  <div class="blog-layout">\n${postsHtml}${sidebarHtml}  </div>\n`
    : "";

  const sectionsHtml = `${heroHtml}${blogLayoutHtml}${footerHtml}`;

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
  const blogCss = generateBlogCss();

  const fullCss = `${cssVariables}\n\n${baseCss}\n\n${blogCss}\n\n${styleCss}`;

  // Generate full HTML
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${globalContent.siteName || "My Blog"}</title>
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
 * Generate dashboard page HTML
 */
function generateDashboardHtml(
  config: GeneratorConfig,
  styleInput: StyleInput
): string {
  const { sections, globalContent } = config;

  let sidebarHtml = "";
  let kpiHtml = "";
  let chartsHtml = "";
  let tableHtml = "";
  let footerHtml = "";

  if (isSectionEnabled(sections, "sidebar")) {
    sidebarHtml = generateDashboardSidebarHtml(getSectionContent(sections, "sidebar"));
  }
  if (isSectionEnabled(sections, "kpi")) {
    kpiHtml = generateDashboardKpiHtml(getSectionContent(sections, "kpi"));
  }
  if (isSectionEnabled(sections, "charts")) {
    chartsHtml = generateDashboardChartsHtml(getSectionContent(sections, "charts"));
  }
  if (isSectionEnabled(sections, "table")) {
    tableHtml = generateDashboardTableHtml(getSectionContent(sections, "table"));
  }
  if (isSectionEnabled(sections, "footer")) {
    footerHtml = generateDashboardFooterHtml(getSectionContent(sections, "footer"));
  }

  // Build dashboard layout: sidebar + main content flex layout
  const mainContent = `${kpiHtml}${chartsHtml}${tableHtml}`;
  const dashboardLayoutHtml = `
  <div class="dashboard-layout">
${sidebarHtml}    <div class="dashboard-main">
      <div class="dashboard-content">
${mainContent}      </div>
${footerHtml}    </div>
  </div>`;

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
  const dashboardCss = generateDashboardCss();
  const fullCss = `${cssVariables}\n\n${baseCss}\n\n${dashboardCss}\n\n${styleCss}`;

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${globalContent.siteName || "Dashboard"}</title>
  <meta name="description" content="${globalContent.siteDescription || ""}">
  <style>
${fullCss}
  </style>
</head>
<body>
${dashboardLayoutHtml}
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
  } else if (config.templateType === "blog") {
    html = generateBlogHtml(config, styleInput);
  } else if (config.templateType === "dashboard") {
    html = generateDashboardHtml(config, styleInput);
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
  if (config.templateType === "blog") {
    return generateBlogHtml(config, styleInput);
  }

  if (config.templateType === "dashboard") {
    return generateDashboardHtml(config, styleInput);
  }

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
- **Template**: ${config.templateType === "landing" ? "Landing Page" : config.templateType === "portfolio" ? "Portfolio" : config.templateType === "blog" ? "Blog" : config.templateType === "dashboard" ? "Dashboard" : config.templateType}
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
