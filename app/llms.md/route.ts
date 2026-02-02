import { NextResponse } from "next/server";
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

## API Endpoints

- [All Styles](/api/styles): List all available design styles
- [Archetypes](/api/archetypes): Layout patterns (landing, dashboard, blog)
- [UI Plan Schema](/api/ui-plan/schema): JSON Schema for UI Plan validation

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
