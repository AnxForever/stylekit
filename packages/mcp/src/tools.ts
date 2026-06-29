/** Registers all StyleKit MCP tools on a server instance. */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

import {
  searchStyles,
  getStyleDetail,
  getTokens,
  getComponentRecipe,
  knownSlug,
  shadcnInstallCommand,
  type StyleCategory,
} from "./data.js";
import { toolResult, errorResult } from "./format.js";

const READ_ONLY = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const;

const CATEGORIES = ["modern", "retro", "minimal", "expressive"] as const;

function unknownSlug(slug: string) {
  return errorResult(
    `Unknown style "${slug}". Use stylekit_search_styles to find a valid slug (e.g. "glassmorphism", "neo-brutalist").`,
  );
}

export function registerStyleKitTools(server: McpServer): void {
  // 1) Search
  server.registerTool(
    "stylekit_search_styles",
    {
      title: "Search StyleKit styles",
      description: `Search StyleKit's 120+ design styles by keyword and/or category.

Args:
  - query (string, optional): matches slug, name, description, tags, keywords (case-insensitive).
  - category ('modern'|'retro'|'minimal'|'expressive', optional): restrict to one category.
  - limit (number 1-50, default 15): max results.

Returns JSON: { total, count, results: [{ slug, name, nameEn, category, tags, description }] }.

Examples:
  - "find a glassy frosted style" -> query: "glass"
  - "show me retro styles" -> category: "retro"
  - For full tokens of one style, use stylekit_get_style_tokens instead.`,
      inputSchema: {
        query: z.string().max(100).optional().describe("Keyword to match"),
        category: z
          .enum(CATEGORIES)
          .optional()
          .describe("Style category filter"),
        limit: z
          .number()
          .int()
          .min(1)
          .max(50)
          .default(15)
          .describe("Max results"),
      },
      annotations: READ_ONLY,
    },
    async ({ query, category, limit }) => {
      const { total, results } = searchStyles({
        query,
        category: category as StyleCategory | undefined,
        limit,
      });
      if (results.length === 0) {
        return errorResult(
          `No styles match${query ? ` "${query}"` : ""}${category ? ` in category "${category}"` : ""}. Try a broader query or drop the category filter.`,
        );
      }
      const lines = [
        `# StyleKit styles${query ? ` matching "${query}"` : ""}`,
        `Found ${total} (showing ${results.length}).`,
        "",
        ...results.map(
          (r) =>
            `- **${r.nameEn}** (\`${r.slug}\`) — ${r.category} · ${r.tags.join(", ")}\n  ${r.description}`,
        ),
      ];
      return toolResult(lines.join("\n"), { total, count: results.length, results });
    },
  );

  // 2) Style detail
  server.registerTool(
    "stylekit_get_style",
    {
      title: "Get StyleKit style detail",
      description: `Get one style's full profile: philosophy, palette, do/don't rules, and what's available (tokens, recipes, shadcn install).

Args:
  - slug (string): style identifier, e.g. "glassmorphism", "neo-brutalist".

Returns JSON: { slug, name, nameEn, category, tags, description, philosophy, colors, doList, dontList, keywords, hasTokens, hasRecipes, recipeIds, shadcnInstall, url }.

Examples:
  - "how should I use neo-brutalist?" -> slug: "neo-brutalist"
  - Returns an error with a hint if the slug is unknown.`,
      inputSchema: {
        slug: z.string().min(1).describe("Style slug, e.g. 'glassmorphism'"),
      },
      annotations: READ_ONLY,
    },
    async ({ slug }) => {
      const detail = getStyleDetail(slug);
      if (!detail) return unknownSlug(slug);
      const lines = [
        `# ${detail.nameEn} (${detail.name}) — \`${detail.slug}\``,
        `Category: ${detail.category} · Tags: ${detail.tags.join(", ")}`,
        "",
        detail.philosophy,
        "",
        `**Palette**: primary ${detail.colors.primary}, secondary ${detail.colors.secondary}, accents ${detail.colors.accent.join(", ")}`,
        "",
        "**Do**:",
        ...detail.doList.map((d) => `- ${d}`),
        "",
        "**Don't**:",
        ...detail.dontList.map((d) => `- ${d}`),
        "",
        `Tokens: ${detail.hasTokens ? "yes" : "no"} · Recipes: ${detail.recipeIds.join(", ") || "none"}`,
        `Install theme: \`${detail.shadcnInstall}\``,
      ];
      return toolResult(lines.join("\n"), detail);
    },
  );

  // 3) Design tokens
  server.registerTool(
    "stylekit_get_style_tokens",
    {
      title: "Get StyleKit style design tokens",
      description: `Get a style's design tokens (Tailwind class mappings): border, shadow, typography, spacing, semantic colors, and forbidden/required classes. Use these to generate style-consistent components.

Args:
  - slug (string): style identifier.

Returns JSON: the full StyleTokens object.

Examples:
  - "give me the spacing and border tokens for bento-grid" -> slug: "bento-grid"
  - Returns an error if the style has no tokens registered.`,
      inputSchema: {
        slug: z.string().min(1).describe("Style slug"),
      },
      annotations: READ_ONLY,
    },
    async ({ slug }) => {
      if (!knownSlug(slug)) return unknownSlug(slug);
      const tokens = getTokens(slug);
      if (!tokens) {
        return errorResult(
          `Style "${slug}" exists but has no registered design tokens. Use stylekit_get_style for its palette and rules instead.`,
        );
      }
      return toolResult(
        `# Design tokens for \`${slug}\`\n\n\`\`\`json\n${JSON.stringify(tokens, null, 2)}\n\`\`\``,
        tokens as unknown as object,
      );
    },
  );

  // 4) Component recipe
  server.registerTool(
    "stylekit_get_component_recipe",
    {
      title: "Get StyleKit component recipe",
      description: `Render a ready-to-use component for a style: the full Tailwind className and JSX code. Components are usually "button", "card", "input" (check recipeIds via stylekit_get_style).

Args:
  - slug (string): style identifier.
  - component (string): recipe id, e.g. "button", "card", "input".

Returns JSON: { slug, component, className, code }.

Examples:
  - "give me a glassmorphism button" -> slug: "glassmorphism", component: "button"
  - Returns an error listing available recipes if the component isn't found.`,
      inputSchema: {
        slug: z.string().min(1).describe("Style slug"),
        component: z
          .string()
          .min(1)
          .describe("Recipe id: button, card, input, ..."),
      },
      annotations: READ_ONLY,
    },
    async ({ slug, component }) => {
      const detail = getStyleDetail(slug);
      if (!detail) return unknownSlug(slug);
      const recipe = getComponentRecipe(slug, component);
      if (!recipe) {
        const available = detail.recipeIds.length
          ? detail.recipeIds.join(", ")
          : "none";
        return errorResult(
          `No "${component}" recipe for "${slug}". Available recipes: ${available}.`,
        );
      }
      const lines = [
        `# ${component} — \`${slug}\``,
        "",
        "**className**:",
        "```",
        recipe.className,
        "```",
        "",
        "**code**:",
        "```tsx",
        recipe.code,
        "```",
      ];
      return toolResult(lines.join("\n"), recipe);
    },
  );

  // 5) shadcn install command
  server.registerTool(
    "stylekit_get_shadcn_install",
    {
      title: "Get StyleKit shadcn install command",
      description: `Get the one-line shadcn CLI command that installs a style's color theme (light + dark) into a shadcn project.

Args:
  - slug (string): style identifier.

Returns JSON: { slug, command, registryUrl, prerequisite }.

Examples:
  - "how do I install the synthwave theme?" -> slug: "synthwave"
  - The target project must have a tsconfig.json or the shadcn CLI errors out.`,
      inputSchema: {
        slug: z.string().min(1).describe("Style slug"),
      },
      annotations: READ_ONLY,
    },
    async ({ slug }) => {
      if (!knownSlug(slug)) return unknownSlug(slug);
      const command = shadcnInstallCommand(slug);
      const structured = {
        slug,
        command,
        registryUrl: `https://stylekit.top/r/${slug}.json`,
        prerequisite: "The target project must contain a tsconfig.json.",
      };
      const text = [
        `Install the **${slug}** theme into your shadcn project:`,
        "",
        "```bash",
        command,
        "```",
        "",
        "Injects light + dark cssVars into your globals.css (Tailwind v4 compatible).",
        "Prerequisite: the project must contain a tsconfig.json.",
      ].join("\n");
      return toolResult(text, structured);
    },
  );
}
