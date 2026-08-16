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
  registryUrl,
  lintStyleCode,
  hasLintableRules,
  type StyleCategory,
  type StyleLintComponent,
} from "./data.js";
import { toolResult, errorResult } from "./format.js";

const READ_ONLY = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: false,
} as const;

const CATEGORIES = ["modern", "retro", "minimal", "expressive"] as const;

// Shared output shapes (so clients get typed structuredContent).
const SUMMARY_SHAPE = {
  slug: z.string(),
  name: z.string(),
  nameEn: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  description: z.string(),
} as const;

const DETAIL_SHAPE = {
  ...SUMMARY_SHAPE,
  philosophy: z.string(),
  colors: z.object({
    primary: z.string(),
    secondary: z.string(),
    accent: z.array(z.string()),
  }),
  doList: z.array(z.string()),
  dontList: z.array(z.string()),
  keywords: z.array(z.string()),
  hasTokens: z.boolean(),
  hasRecipes: z.boolean(),
  recipeIds: z.array(z.string()),
  shadcnInstall: z.string(),
  url: z.string(),
  quality: z.object({
    tier: z.enum(["curated", "baseline"]),
    capabilities: z.object({
      tokens: z.enum(["complete", "partial", "fallback", "missing"]),
      recipes: z.enum(["complete", "partial", "fallback", "missing"]),
      componentCode: z.enum(["complete", "partial", "fallback", "missing"]),
      variants: z.enum(["complete", "partial", "fallback", "missing"]),
      readiness: z.enum(["curated", "fallback"]),
      darkMode: z.enum(["complete", "partial", "fallback", "missing"]),
      accessibility: z.enum(["scored", "unavailable"]),
    }),
    accessibilityScore: z.number().nullable(),
    flags: z.array(z.string()),
  }),
} as const;

const STYLE_TOKENS_SHAPE = z.object({
  border: z.object({
    width: z.string(),
    color: z.string(),
    radius: z.string(),
    style: z.string().optional(),
  }),
  shadow: z.object({
    sm: z.string(),
    md: z.string(),
    lg: z.string(),
    none: z.string(),
    hover: z.string(),
    focus: z.string(),
    colored: z.record(z.string(), z.string()).optional(),
  }),
  interaction: z.object({
    hoverScale: z.string().optional(),
    hoverTranslate: z.string().optional(),
    hoverOpacity: z.string().optional(),
    transition: z.string(),
    active: z.string().optional(),
  }),
  typography: z.object({
    heading: z.string(),
    subtitle: z.string().optional(),
    body: z.string(),
    mono: z.string().optional(),
    sizes: z.object({
      hero: z.string(),
      h1: z.string(),
      h2: z.string(),
      h3: z.string(),
      body: z.string(),
      small: z.string(),
    }),
    neonStroke: z.record(z.string(), z.unknown()).optional(),
  }),
  spacing: z.object({
    section: z.string(),
    container: z.string(),
    card: z.string(),
    gap: z.object({ sm: z.string(), md: z.string(), lg: z.string() }),
  }),
  colors: z.object({
    background: z.object({
      primary: z.string(),
      secondary: z.string(),
      accent: z.array(z.string()),
    }),
    text: z.object({
      primary: z.string(),
      secondary: z.string(),
      muted: z.string(),
    }),
    button: z.object({
      primary: z.string(),
      secondary: z.string(),
      danger: z.string().optional(),
    }),
  }),
  forbidden: z.object({
    classes: z.array(z.string()),
    patterns: z.array(z.string()),
    reasons: z.record(z.string(), z.string()),
  }),
  required: z.object({
    button: z.array(z.string()),
    card: z.array(z.string()),
    input: z.array(z.string()),
  }),
});

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
      description: `Search StyleKit's 146 design styles by keyword and/or category, with pagination.

Args:
  - query (string, optional): matches slug, name, description, tags, keywords (case-insensitive).
  - category ('modern'|'retro'|'minimal'|'expressive', optional): restrict to one category.
  - limit (number 1-50, default 15): page size.
  - offset (number >=0, default 0): results to skip (for paging).

Returns JSON: { total, count, offset, has_more, results: [{ slug, name, nameEn, category, tags, description }] }.

Examples:
  - "find a glassy frosted style" -> query: "glass"
  - "next page of retro styles" -> category: "retro", offset: 15
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
          .describe("Page size"),
        offset: z
          .number()
          .int()
          .min(0)
          .default(0)
          .describe("Results to skip for pagination"),
      },
      outputSchema: {
        total: z.number(),
        count: z.number(),
        offset: z.number(),
        has_more: z.boolean(),
        results: z.array(z.object(SUMMARY_SHAPE)),
      },
      annotations: READ_ONLY,
    },
    async ({ query, category, limit, offset }) => {
      const { total, results: all } = searchStyles({
        query,
        category: category as StyleCategory | undefined,
      });
      const page = all.slice(offset, offset + limit);
      if (page.length === 0) {
        return errorResult(
          `No styles match${query ? ` "${query}"` : ""}${category ? ` in category "${category}"` : ""}${offset ? ` at offset ${offset}` : ""}. Try a broader query, drop the category filter, or lower the offset.`,
        );
      }
      const hasMore = offset + page.length < total;
      const lines = [
        `# StyleKit styles${query ? ` matching "${query}"` : ""}`,
        `Found ${total} (showing ${page.length}${offset ? ` from offset ${offset}` : ""}).`,
        "",
        ...page.map(
          (r) =>
            `- **${r.nameEn}** (\`${r.slug}\`) — ${r.category} · ${r.tags.join(", ")}\n  ${r.description}`,
        ),
        ...(hasMore ? ["", `…more available — call again with offset: ${offset + page.length}.`] : []),
      ];
      return toolResult(lines.join("\n"), {
        total,
        count: page.length,
        offset,
        has_more: hasMore,
        results: page,
      });
    },
  );

  // 2) Style detail
  server.registerTool(
    "stylekit_get_style",
    {
      title: "Get StyleKit style detail",
      description: `Get one style's full profile: philosophy, palette, do/don't rules, keywords, and what's available (tokens, recipes, shadcn install).

Args:
  - slug (string): style identifier, e.g. "glassmorphism", "neo-brutalist".

Returns JSON: { slug, name, nameEn, category, tags, description, philosophy, colors, doList, dontList, keywords, hasTokens, hasRecipes, recipeIds, shadcnInstall, url, quality }.

Examples:
  - "how should I use neo-brutalist?" -> slug: "neo-brutalist"
  - Returns an error with a hint if the slug is unknown.`,
      inputSchema: {
        slug: z.string().min(1).describe("Style slug, e.g. 'glassmorphism'"),
      },
      outputSchema: DETAIL_SHAPE,
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

Returns JSON: the full StyleTokens object (structuredContent).

Examples:
  - "give me the spacing and border tokens for bento-grid" -> slug: "bento-grid"
  - Returns an error if the style has no tokens registered.`,
      inputSchema: {
        slug: z.string().min(1).describe("Style slug"),
      },
      outputSchema: STYLE_TOKENS_SHAPE,
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
        tokens as unknown as Record<string, unknown>,
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
      outputSchema: {
        slug: z.string(),
        component: z.string(),
        className: z.string(),
        code: z.string(),
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
      outputSchema: {
        slug: z.string(),
        command: z.string(),
        registryUrl: z.string(),
        prerequisite: z.string(),
      },
      annotations: READ_ONLY,
    },
    async ({ slug }) => {
      if (!knownSlug(slug)) return unknownSlug(slug);
      const structured = {
        slug,
        command: shadcnInstallCommand(slug),
        registryUrl: registryUrl(slug),
        prerequisite: "The target project must contain a tsconfig.json.",
      };
      const text = [
        `Install the **${slug}** theme into your shadcn project:`,
        "",
        "```bash",
        structured.command,
        "```",
        "",
        "Injects light + dark cssVars into your globals.css (Tailwind v4 compatible).",
        "Prerequisite: the project must contain a tsconfig.json.",
      ].join("\n");
      return toolResult(text, structured);
    },
  );

  // 6) Lint generated code against the style
  server.registerTool(
    "stylekit_lint_code",
    {
      title: "Lint code against a StyleKit style",
      description: `Check whether code actually follows a style's rules. Use this AFTER generating or editing UI code to verify it matches the style, instead of assuming it does.

Reports forbidden classes with the reason they are banned and a concrete replacement. Understands JSX/HTML class attributes, cn()/clsx() calls, and template literals; variant prefixes (dark:, md:, hover:) are resolved before matching.

Args:
  - slug (string): style identifier, e.g. "glassmorphism".
  - code (string): the source to check. JSX/TSX, HTML, or a bare class string.
  - checkRequired (array of 'button'|'card'|'input', optional): also report required classes the code is missing. Only pass components the code is supposed to contain.

Returns JSON: { slug, ok, violations: [{ className, baseClassName, line, severity, source, rule, reason, fix }], missingRequired, checkedClasses, ruleSources }.

Examples:
  - "does this button match neo-brutalist?" -> slug: "neo-brutalist", code: "<button className=...>", checkRequired: ["button"]
  - ok: true means no violations were found; it does not assert the design is good.`,
      inputSchema: {
        slug: z.string().min(1).describe("Style slug, e.g. 'glassmorphism'"),
        code: z
          .string()
          .min(1)
          .max(100_000)
          .describe("Source code or class string to lint"),
        checkRequired: z
          .array(z.enum(["button", "card", "input"]))
          .optional()
          .describe("Components to also check for missing required classes"),
      },
      outputSchema: {
        slug: z.string(),
        ok: z.boolean(),
        violations: z.array(
          z.object({
            className: z.string(),
            baseClassName: z.string(),
            line: z.number(),
            severity: z.string(),
            source: z.string(),
            rule: z.string(),
            reason: z.string(),
            fix: z.string().optional(),
          }),
        ),
        missingRequired: z.array(
          z.object({
            component: z.string(),
            missing: z.array(z.string()),
            source: z.string(),
          }),
        ),
        checkedClasses: z.number(),
        ruleSources: z.array(z.string()),
      },
      annotations: READ_ONLY,
    },
    async ({ slug, code, checkRequired }) => {
      if (!knownSlug(slug)) return unknownSlug(slug);
      if (!hasLintableRules(slug)) {
        return errorResult(
          `Style "${slug}" has no lint rules registered, so its code cannot be verified. Use stylekit_get_style_tokens for its constraints instead.`,
        );
      }

      const report = lintStyleCode(slug, code, {
        checkRequired: checkRequired as StyleLintComponent[] | undefined,
      });

      if (report.checkedClasses === 0) {
        return errorResult(
          `No classes found in the provided code for "${slug}". Pass JSX/HTML containing className/class attributes, or a bare space-separated class string.`,
        );
      }

      const lines = [`# Lint report — \`${slug}\``];

      if (report.ok) {
        lines.push(
          "",
          `No violations across ${report.checkedClasses} classes checked.`,
        );
      } else {
        lines.push(
          "",
          `${report.violations.length} violation(s) across ${report.checkedClasses} classes checked.`,
          "",
        );
        for (const v of report.violations) {
          lines.push(`- **${v.className}** (line ${v.line}) — ${v.reason}`);
          if (v.fix) lines.push(`  Fix: ${v.fix}`);
        }
      }

      for (const missing of report.missingRequired) {
        lines.push(
          "",
          `**Missing required ${missing.component} classes**: ${missing.missing.join(", ")}`,
        );
      }

      return toolResult(lines.join("\n"), report);
    },
  );
}
