import { styles } from "@/lib/styles";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { getStyleRecipes } from "@/lib/recipes";

/**
 * /llms.md - Markdown variant of llms.txt
 *
 * Per the llms.txt specification (https://llmstxt.org/),
 * providing .md variants allows LLMs to parse content more effectively.
 */
export async function GET() {
  const sections: string[] = [];

  sections.push(`# StyleKit

> AI-friendly design system library with machine-readable constraints, tokens, and component recipes for AI-assisted UI generation.

StyleKit provides structured design systems that AI can use to generate consistent, high-quality user interfaces.

## Available Styles

`);

  for (const style of styles) {
    const tokens = getStyleTokens(style.slug);
    const recipes = getStyleRecipes(style.slug);
    sections.push(
      `- [${style.nameEn}](/api/styles/${style.slug}): ${style.description} (Tokens: ${tokens ? "Yes" : "No"}, Recipes: ${recipes ? "Yes" : "No"})`
    );
  }

  sections.push(`

## Core Workflows

### Path A: Reference URL -> Extract -> Generate

1. Extract style evidence from a public URL: [POST /api/style-extract](/api/style-extract)
2. Normalize/import extracted draft in [Create Style](/create-style)
3. Generate project output in [Generator](/generate)

### Path B: Preset Style -> Template -> Generate

1. Browse presets in [Styles](/styles)
2. Select template and output format in [Generator](/generate)
3. Edit content with live preview and download ZIP

## API Endpoints

- [All Styles](/api/styles): List all available design styles
- [Style Details](/api/styles/[slug]): Full style metadata and examples
- [Style Tokens](/api/styles/[slug]/tokens): Machine-readable design tokens
- [Style Recipes](/api/styles/[slug]/recipes): Component recipe templates
- [Style Extractor](/api/style-extract): Extract style draft from public websites

## MCP Core Tools

- search_knowledge: Search design knowledge domains
- smart_recommend: Context-aware recommendation with scoring
- get_style: Get one style pack (rules + tokens + recipes)
- list_styles: List all styles
- lint_code: Lint code against style constraints
- get_stack_guidelines: Get stack-specific implementation guidance

## Documentation

- [Full Documentation](/llms-full.txt): Complete reference with all tokens, recipes, and code examples

## Optional

- [Figma MCP Integration Guide](/docs/figma-mcp-integration.md): Import design tokens from Figma via MCP
- [StyleKit Skill Pack](/api/styles/neo-brutalist/skill-pack): SKILL.md format for AI tools
`);

  const content = sections.join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
