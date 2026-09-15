import { styles } from "@/lib/styles";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { getStyleRecipes } from "@/lib/recipes";
import { localizedString } from "@/lib/styles/locale-content";
import { getSiteBaseUrl } from "@/lib/site-url";
import { listPromotedCommunityStyles } from "@/lib/styles/community-runtime";

export const dynamic = "force-dynamic";

const BASE_URL = getSiteBaseUrl();

/**
 * /llms.md - Markdown variant of llms.txt
 *
 * Per the llms.txt specification (https://llmstxt.org/),
 * providing .md variants allows LLMs to parse content more effectively.
 */
export async function GET() {
  const sections: string[] = [];

  sections.push(`# StyleKit

> Open-source visual style library for AI-generated web interfaces with ${styles.length} curated styles and machine-readable constraints.

StyleKit provides structured design systems that AI can use to generate consistent, high-quality user interfaces.

## Community

- [Style discussions and contributions](${BASE_URL}/en/community): Public feedback on existing styles and reviewed creator submissions. Comments are user feedback, not official guidance.
- [中文风格社区](${BASE_URL}/zh/community): 参与风格讨论、浏览社区投稿。

## Prompt References

- [Dashboard UI prompts](${BASE_URL}/en/dashboard-prompts): Eight copy-ready examples plus an implementation checklist, method, limits, and source-backed accessibility checks.
- [中文仪表盘 UI 提示词](${BASE_URL}/zh/dashboard-prompts): 八条可复制示例、实现检查清单、方法说明与来源。

## Available Styles

`);

  for (const style of styles) {
    const tokens = getStyleTokens(style.slug);
    const recipes = getStyleRecipes(style.slug);
    sections.push(
      `- [${style.nameEn}](${BASE_URL}/en/styles/${style.slug}): ${localizedString("en", style.description, style.descriptionEn)} ([Markdown](${BASE_URL}/api/styles/${style.slug}/md); Tokens: ${tokens ? "Yes" : "No"}; Recipes: ${recipes ? "Yes" : "No"})`
    );
  }

  const promotedCommunityStyles = await listPromotedCommunityStyles();
  sections.push(`

## Promoted Community Styles

These approved community contributions were selected for the curated catalog. Each page includes the human-readable reference and the read-only Markdown style endpoint.

`);

  for (const style of promotedCommunityStyles) {
    sections.push(
      `- [${style.nameEn || style.name}](${BASE_URL}/en/community/${style.slug}): ${style.descriptionEn || style.description} ([Markdown](${BASE_URL}/api/styles/${style.slug}/md); Category: ${style.category}; Tags: ${style.tags.join(", ")})\n`
    );
  }

  sections.push(`
## Core Workflows

### Path A: Style -> Rules -> Code

1. Browse preset styles in [Styles](${BASE_URL}/en/styles)
2. Copy the target style tokens, component recipes, and AI rules
3. Use those constraints in your editor or AI coding workflow

### Path B: Template -> Prompt -> Build

1. Choose a page structure from [Templates](${BASE_URL}/en/templates)
2. Copy a prompt from [UI Prompts](${BASE_URL}/en/ui-prompts) or a focused prompt page
3. Combine the template structure with the selected style rules

## Documentation

- [Generated catalog reference](${BASE_URL}/llms-full.txt): Larger machine-readable catalog export
- [GitHub repository](https://github.com/AnxForever/stylekit)
`);

  const content = sections.join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Language": "en",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
