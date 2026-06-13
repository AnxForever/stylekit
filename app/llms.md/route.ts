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
      `- [${style.nameEn}](/styles/${style.slug}): ${style.description} (Tokens: ${tokens ? "Yes" : "No"}, Recipes: ${recipes ? "Yes" : "No"})`
    );
  }

  sections.push(`

## Core Workflows

### Path A: Style -> Rules -> Code

1. Browse preset styles in [Styles](/styles)
2. Copy the target style tokens, component recipes, and AI rules
3. Use those constraints in your editor or AI coding workflow

### Path B: Template -> Prompt -> Build

1. Choose a page structure from [Templates](/templates)
2. Copy a prompt from [UI Prompts](/ui-prompts) or a focused prompt page
3. Combine the template structure with the selected style rules

## Documentation

- [Full Documentation](/llms-full.txt): Complete reference with all tokens, recipes, and code examples
`);

  const content = sections.join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
