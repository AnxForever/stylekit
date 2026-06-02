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

### Path A: Reference URL -> Extract -> Generate

1. Paste a public reference URL in [Create Style](/create-style)
2. Normalize the extracted style draft in the product workflow
3. Generate project output in [Generator](/generate)

### Path B: Preset Style -> Template -> Generate

1. Browse presets in [Styles](/styles)
2. Select template and output format in [Generator](/generate)
3. Edit content with live preview and download ZIP

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
