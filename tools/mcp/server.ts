#!/usr/bin/env node

/**
 * StyleKit MCP Server
 *
 * Model Context Protocol server built on the official SDK.
 * Exposes StyleKit capabilities as tools, resources, and prompts
 * for AI assistants.
 *
 * Core tools (11):
 * - search_knowledge
 * - smart_recommend
 * - get_style
 * - list_styles
 * - lint_code
 * - get_stack_guidelines
 * - submit_style
 * - search_templates
 * - search_component_patterns
 * - search_prompts
 * - get_full_recommendation
 *
 * Experimental tools (disabled by default):
 * - compose_styles
 * - generate_context_file
 * - analyze_project_style
 *
 * Resources:
 * - style://{slug} for each registered style
 * - stylekit://styles - full catalog of all styles
 * - stylekit://knowledge/{topic} - knowledge domain resources
 *
 * Prompts:
 * - generate-with-style
 * - style-review
 * - style-migration
 * - recommend-style
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

// Use createRequire for local modules that depend on @/ path aliases
// (these fail under ESM resolution that the SDK forces)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(path.resolve(__dirname, "../../package.json"));

const knowledge = require("./lib/knowledge");
const {
  searchKnowledge,
  getStack,
  getCriticalGuidelines,
  searchStackGuidelines,
  getSmartRecommendation,
} = knowledge;
type SearchDomain = string;
type StackId = string;
type RecommendationContext = Record<string, unknown>;

const { getStyleBySlug, styles } = require("./lib/styles");
const { getStyleTokens } = require("./lib/styles/tokens-registry");
const { getStyleRecipes } = require("./lib/recipes");
const { trackStyleUsage } = require("./lib/analytics");
const { getArchetype } = require("./lib/archetypes");
const { lintCode, getFixSuggestions, formatLintResult } = require("./lib/linter");
const { scoreStyle } = require("./lib/accessibility");
const { getCurrentVersion, getChangelog } = require("./lib/versioning");
const { templateCatalog } = require("./lib/templates/catalog");
const { componentPatterns } = require("./lib/component-patterns");
const { promptTopics } = require("./lib/prompts/topics");
const { getDesignRecommendation } = knowledge;

// ---- Server setup ----

const server = new McpServer({
  name: "stylekit",
  version: "1.0.0",
});

const EXPERIMENTAL_TOOLS_ENABLED =
  process.env.STYLEKIT_ENABLE_EXPERIMENTAL_TOOLS === "1";

// ============================================================================
// Tools
// ============================================================================

// -- search_knowledge --
server.tool(
  "search_knowledge",
  "Search StyleKit's design knowledge base across domains such as product, color, typography, UX, web, React, reasoning, and stack.",
  {
    query: z.string().describe(
      "Search query (e.g. 'SaaS dashboard', 'dark color palette', 'form validation UX')"
    ),
    domain: z
      .enum([
        "product",
        "color",
        "typography",
        "landing",
        "chart",
        "icon",
        "ux",
        "web",
        "react",
        "reasoning",
        "stack",
      ])
      .optional()
      .describe("Specific domain to search. Auto-detected if omitted."),
    limit: z.number().optional().default(5).describe("Max results (default: 5)"),
  },
  async ({ query, domain, limit }) => {
    const result = searchKnowledge(query, domain as SearchDomain | undefined, limit);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }
);

// -- smart_recommend --
server.tool(
  "smart_recommend",
  "Get intelligent design recommendations with scoring, explanations, and context-aware adjustments.",
  {
    productQuery: z.string().describe(
      "Product type or description (e.g. 'SaaS dashboard', 'e-commerce store')"
    ),
    context: z
      .object({
        targetAudience: z
          .enum(["consumer", "enterprise", "developer", "creative"])
          .optional()
          .describe("Primary target audience"),
        ageGroup: z
          .enum(["young", "adult", "senior", "all"])
          .optional()
          .describe("Target age group"),
        primaryDevice: z
          .enum(["desktop", "mobile", "tablet", "all"])
          .optional()
          .describe("Primary device for the product"),
        brandMood: z
          .enum(["playful", "professional", "luxury", "minimal", "bold"])
          .optional()
          .describe("Desired brand mood"),
        darkModePreferred: z.boolean().optional().describe("Prefer dark mode colors"),
        accessibilityPriority: z
          .boolean()
          .optional()
          .describe("Prioritize accessibility (high contrast, etc.)"),
        performancePriority: z
          .boolean()
          .optional()
          .describe("Prioritize performance (lightweight styles)"),
      })
      .optional()
      .describe("Optional context for personalized recommendations"),
  },
  async ({ productQuery, context }) => {
    const result = getSmartRecommendation(
      productQuery,
      (context as RecommendationContext) || {}
    );
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }
);

// -- get_style --
server.tool(
  "get_style",
  "Get a specific design style with tokens, recipes, rules, and code examples.",
  {
    slug: z.string().describe("Style slug (e.g. 'neo-brutalist', 'glassmorphism')"),
  },
  async ({ slug }) => {
    trackStyleUsage(slug, "mcp");
    const style = getStyleBySlug(slug);
    if (!style) {
      return {
        content: [{ type: "text", text: JSON.stringify({ error: `Style not found: ${slug}` }) }],
        isError: true,
      };
    }
    const tokens = getStyleTokens(slug);
    const recipes = getStyleRecipes(slug);
    const result = {
      style: {
        slug: style.slug,
        name: style.nameEn,
        description: style.description,
        philosophy: style.philosophy,
        keywords: style.keywords,
        doList: style.doList,
        dontList: style.dontList,
        aiRules: style.aiRules,
        colors: style.colors,
        components: style.components,
        globalCss: style.globalCss,
        examplePrompts: style.examplePrompts,
      },
      tokens,
      recipes,
      accessibility: scoreStyle(slug),
      version: getCurrentVersion(slug),
      changelog: getChangelog(slug),
    };
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }
);

// -- list_styles --
server.tool(
  "list_styles",
  "List all available design styles with their descriptions and keywords.",
  {},
  async () => {
    const result = styles.map((s: { slug: string; nameEn: string; description: string; keywords: string[]; styleType: string }) => ({
      slug: s.slug,
      name: s.nameEn,
      description: s.description,
      keywords: s.keywords,
      styleType: s.styleType,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }
);

// -- lint_code --
server.tool(
  "lint_code",
  "Check if code follows a specific design style's guidelines. Returns errors for forbidden classes and warnings for missing required classes.",
  {
    code: z.string().describe("The code to lint (JSX/TSX with Tailwind classes)"),
    style: z.string().describe("Style slug to check against (e.g. 'neo-brutalist', 'glassmorphism')"),
    format: z
      .enum(["json", "text"])
      .optional()
      .default("json")
      .describe("Output format (default: json)"),
  },
  async ({ code, style, format }) => {
    if (!getStyleBySlug(style)) {
      return {
        content: [{ type: "text", text: JSON.stringify({ error: `Style not found: ${style}` }) }],
        isError: true,
      };
    }

    const result = lintCode(style, code);
    const fixes = getFixSuggestions(result);

    if (format === "text") {
      const text =
        formatLintResult(result) + "\n\nFixes:\n" + fixes.map((f: string) => `  - ${f}`).join("\n");
      return { content: [{ type: "text", text }] };
    }

    return {
      content: [{ type: "text", text: JSON.stringify({ ...result, fixes }, null, 2) }],
    };
  }
);

// -- get_stack_guidelines --
server.tool(
  "get_stack_guidelines",
  "Get coding guidelines for a specific tech stack. Can filter to critical-only or search within a stack.",
  {
    stackId: z.string().describe("Stack ID (e.g. 'nextjs', 'react-vite', 'tailwindcss')"),
    query: z.string().optional().describe("Optional search query to filter guidelines"),
    criticalOnly: z
      .boolean()
      .optional()
      .default(false)
      .describe("If true, only return critical-severity guidelines"),
    limit: z.number().optional().default(10).describe("Max results (default: 10)"),
  },
  async ({ stackId, query, criticalOnly, limit }) => {
    const stack = getStack(stackId as StackId);
    if (!stack) {
      return {
        content: [
          { type: "text", text: JSON.stringify({ error: `Stack not found: ${stackId}` }) },
        ],
        isError: true,
      };
    }

    let result: unknown;

    if (criticalOnly) {
      result = {
        stackId,
        name: stack.name,
        guidelines: getCriticalGuidelines(stackId as StackId),
      };
    } else if (query) {
      result = {
        stackId,
        name: stack.name,
        guidelines: searchStackGuidelines(stackId as StackId, query, limit),
      };
    } else {
      result = {
        id: stack.id,
        name: stack.name,
        category: stack.category,
        description: stack.description,
        guidelines: stack.guidelines,
      };
    }

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }
);

// -- submit_style --
server.tool(
  "submit_style",
  "Validate and prepare a style submission from manifest JSON. Use dryRun=true (default) to only validate, or dryRun=false to validate and confirm submission readiness.",
  {
    manifest: z.string().describe("Full manifest JSON string following style-submission-manifest.schema.json"),
    dryRun: z.boolean().optional().default(true).describe("If true, only validate without submitting (default: true)"),
  },
  async ({ manifest, dryRun }) => {
    const { validateManifestDetailed, validateStyleSubmissionManifest } = require("../../lib/submit/manifest-validator");

    let parsed: unknown;
    try {
      parsed = JSON.parse(manifest);
    } catch {
      return {
        content: [{ type: "text", text: JSON.stringify({ error: "Invalid JSON input" }) }],
        isError: true,
      };
    }

    const detailed = validateManifestDetailed(parsed);
    const full = validateStyleSubmissionManifest(parsed);

    const fieldChecks = detailed.fields.map((f: { field: string; ok: boolean; detail: string }) => ({
      field: f.field,
      status: f.ok ? "OK" : "!!",
      detail: f.detail,
    }));

    const report: Record<string, unknown> = {
      valid: detailed.ok,
      fieldChecks,
      issues: detailed.issues,
    };

    if (detailed.ok && !dryRun) {
      const { getManifestSummary } = require("../../lib/submit/manifest-validator");
      report.summary = getManifestSummary(full.data);
      report.status = "ready_for_submission";
      report.message = "Manifest is valid and ready for submission. Create a GitHub issue to complete the process.";
    } else if (detailed.ok && dryRun) {
      report.message = "Manifest is valid. Set dryRun=false to confirm submission readiness.";
    } else {
      report.message = `Manifest has ${detailed.issues.length} validation issue(s). Fix them and try again.`;
    }

    return {
      content: [{ type: "text", text: JSON.stringify(report, null, 2) }],
    };
  }
);

// -- search_templates --
server.tool(
  "search_templates",
  "Search the template catalog by type, style, or keywords. Returns matching templates with descriptions, style associations, and code paths.",
  {
    query: z.string().optional().describe("Search query (e.g. 'dashboard', 'portfolio', 'glassmorphism')"),
    type: z
      .enum([
        "landing", "dashboard", "blog", "portfolio", "saas",
        "ecommerce", "admin", "auth", "docs", "social",
        "messaging", "media", "lifestyle", "education",
      ])
      .optional()
      .describe("Filter by template type"),
    styleSlug: z.string().optional().describe("Filter by style slug (e.g. 'glassmorphism')"),
    limit: z.number().optional().default(10).describe("Max results (default: 10)"),
  },
  async ({ query, type, styleSlug, limit }) => {
    let results = [...templateCatalog];

    if (type) {
      results = results.filter((t: { type: string }) => t.type === type);
    }

    if (styleSlug) {
      results = results.filter((t: { styleSlug: string }) => t.styleSlug === styleSlug);
    }

    if (query) {
      const queryLower = query.toLowerCase();
      const queryTerms = queryLower.split(/\s+/).filter((t: string) => t.length > 1);
      results = results
        .map((t: { id: string; type: string; styleSlug: string; name: { zh: string; en: string }; description: { zh: string; en: string } }) => {
          const text = `${t.id} ${t.type} ${t.styleSlug} ${t.name.en} ${t.name.zh} ${t.description.en} ${t.description.zh}`.toLowerCase();
          const score = queryTerms.reduce((s: number, term: string) => s + (text.includes(term) ? 1 : 0), 0);
          return { template: t, score };
        })
        .filter((item: { score: number }) => item.score > 0)
        .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
        .map((item: { template: unknown }) => item.template);
    }

    const output = results.slice(0, limit).map((t: { id: string; type: string; styleSlug: string; name: { zh: string; en: string }; description: { zh: string; en: string }; href: string; codePath: string }) => ({
      id: t.id,
      type: t.type,
      styleSlug: t.styleSlug,
      name: t.name.en,
      nameZh: t.name.zh,
      description: t.description.en,
      descriptionZh: t.description.zh,
      href: t.href,
      codePath: t.codePath,
    }));

    return {
      content: [{ type: "text", text: JSON.stringify({ count: output.length, templates: output }, null, 2) }],
    };
  }
);

// -- search_component_patterns --
server.tool(
  "search_component_patterns",
  "Search reusable UI component patterns by family, category, tags, or keywords. Each pattern includes a style association and usage context.",
  {
    query: z.string().optional().describe("Search query (e.g. 'sidebar', 'tabs', 'accordion')"),
    family: z
      .enum(["breadcrumb", "accordion", "tabs", "pagination", "sidebar-nav"])
      .optional()
      .describe("Filter by component family"),
    category: z
      .enum(["navigation", "disclosure"])
      .optional()
      .describe("Filter by component category"),
    limit: z.number().optional().default(10).describe("Max results (default: 10)"),
  },
  async ({ query, family, category, limit }) => {
    let results = [...componentPatterns];

    if (family) {
      results = results.filter((p: { family: string }) => p.family === family);
    }

    if (category) {
      results = results.filter((p: { category: string }) => p.category === category);
    }

    if (query) {
      const queryLower = query.toLowerCase();
      const queryTerms = queryLower.split(/\s+/).filter((t: string) => t.length > 1);
      results = results
        .map((p: { id: string; name: string; nameZh: string; summary: string; summaryZh: string; tags: string[]; tagsZh: string[]; useCase: string; useCaseZh: string; family: string; category: string; sourceStyleSlug: string }) => {
          const text = `${p.id} ${p.name} ${p.nameZh} ${p.summary} ${p.summaryZh} ${p.tags.join(" ")} ${p.tagsZh.join(" ")} ${p.useCase} ${p.useCaseZh} ${p.family} ${p.category} ${p.sourceStyleSlug}`.toLowerCase();
          const score = queryTerms.reduce((s: number, term: string) => s + (text.includes(term) ? 1 : 0), 0);
          return { pattern: p, score };
        })
        .filter((item: { score: number }) => item.score > 0)
        .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
        .map((item: { pattern: unknown }) => item.pattern);
    }

    const output = results.slice(0, limit).map((p: { id: string; family: string; category: string; name: string; nameZh: string; summary: string; summaryZh: string; useCase: string; useCaseZh: string; tags: string[]; sourceStyleSlug: string; sourceHref: string }) => ({
      id: p.id,
      family: p.family,
      category: p.category,
      name: p.name,
      nameZh: p.nameZh,
      summary: p.summary,
      summaryZh: p.summaryZh,
      useCase: p.useCase,
      useCaseZh: p.useCaseZh,
      tags: p.tags,
      sourceStyleSlug: p.sourceStyleSlug,
      sourceHref: p.sourceHref,
    }));

    return {
      content: [{ type: "text", text: JSON.stringify({ count: output.length, patterns: output }, null, 2) }],
    };
  }
);

// -- search_prompts --
server.tool(
  "search_prompts",
  "Search curated AI prompt topics and example prompts for building frontend pages. Each topic includes prompts optimized for different AI tools (ChatGPT, Cursor, Claude, v0).",
  {
    query: z.string().optional().describe("Search query (e.g. 'dashboard', 'pricing page', 'hero section')"),
    tool: z
      .enum(["v0", "cursor", "claude", "general"])
      .optional()
      .describe("Filter prompts by target AI tool"),
    limit: z.number().optional().default(5).describe("Max topic results (default: 5)"),
  },
  async ({ query, tool, limit }) => {
    let topics = [...promptTopics];

    if (query) {
      const queryLower = query.toLowerCase();
      const queryTerms = queryLower.split(/\s+/).filter((t: string) => t.length > 1);
      topics = topics
        .map((t: { slug: string; titleEn: string; titleZh: string; descriptionEn: string; descriptionZh: string; keywords: string[]; introEn: string }) => {
          const text = `${t.slug} ${t.titleEn} ${t.titleZh} ${t.descriptionEn} ${t.descriptionZh} ${t.keywords.join(" ")} ${t.introEn}`.toLowerCase();
          const score = queryTerms.reduce((s: number, term: string) => s + (text.includes(term) ? 1 : 0), 0);
          return { topic: t, score };
        })
        .filter((item: { score: number }) => item.score > 0)
        .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
        .map((item: { topic: unknown }) => item.topic);
    }

    const output = topics.slice(0, limit).map((t: { slug: string; titleEn: string; titleZh: string; descriptionEn: string; descriptionZh: string; keywords: string[]; relatedStyleSlugs: string[]; introEn: string; prompts: Array<{ titleEn: string; titleZh: string; tool: string; prompt: string }>; useCases: Array<{ titleEn: string; descriptionEn: string }> }) => {
      const prompts = tool
        ? t.prompts.filter((p: { tool: string }) => p.tool === tool)
        : t.prompts;

      return {
        slug: t.slug,
        title: t.titleEn,
        titleZh: t.titleZh,
        description: t.descriptionEn,
        descriptionZh: t.descriptionZh,
        keywords: t.keywords,
        relatedStyleSlugs: t.relatedStyleSlugs,
        intro: t.introEn,
        prompts: prompts.map((p: { titleEn: string; tool: string; prompt: string }) => ({
          title: p.titleEn,
          tool: p.tool,
          prompt: p.prompt,
        })),
        useCases: t.useCases.slice(0, 3).map((u: { titleEn: string; descriptionEn: string }) => ({
          title: u.titleEn,
          description: u.descriptionEn,
        })),
      };
    });

    return {
      content: [{ type: "text", text: JSON.stringify({ count: output.length, topics: output }, null, 2) }],
    };
  }
);

// -- get_full_recommendation --
server.tool(
  "get_full_recommendation",
  "Get a comprehensive design recommendation for a product query. Returns an all-in-one recommendation including style, colors, typography, landing pattern, charts, icons, UX guidelines, and optional stack guidelines.",
  {
    productQuery: z.string().describe(
      "Product type or description (e.g. 'SaaS dashboard', 'fintech mobile app', 'portfolio website')"
    ),
    stackId: z
      .string()
      .optional()
      .describe("Optional tech stack ID for stack-specific guidelines (e.g. 'nextjs', 'react', 'vue')"),
    maxGuidelines: z.number().optional().default(5).describe("Max UX/stack guidelines per category (default: 5)"),
  },
  async ({ productQuery, stackId, maxGuidelines }) => {
    const result = getDesignRecommendation(productQuery, {
      stackId: stackId as StackId | undefined,
      maxGuidelines,
    });

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }
);

if (EXPERIMENTAL_TOOLS_ENABLED) {
  // -- compose_styles (experimental) --
  server.tool(
    "compose_styles",
    "Compose a visual style with an optional layout archetype. Returns combined tokens, recipes, and rules.",
    {
      visualStyle: z.string().describe("Visual style slug (e.g. 'glassmorphism', 'neo-brutalist')"),
      layoutStyle: z
        .string()
        .optional()
        .describe("Layout archetype ID (e.g. 'landing-hero-centered', 'dashboard-sidebar-left')"),
    },
    async ({ visualStyle, layoutStyle }) => {
      trackStyleUsage(visualStyle, "mcp");
      const style = getStyleBySlug(visualStyle);
      if (!style) {
        return {
          content: [
            { type: "text", text: JSON.stringify({ error: `Style not found: ${visualStyle}` }) },
          ],
          isError: true,
        };
      }

      const tokens = getStyleTokens(visualStyle);
      const recipes = getStyleRecipes(visualStyle);

      const composed: Record<string, unknown> = {
        visualStyle: {
          slug: style.slug,
          name: style.nameEn,
          doList: style.doList,
          dontList: style.dontList,
          aiRules: style.aiRules,
          colors: style.colors,
          globalCss: style.globalCss,
        },
        tokens,
        recipes,
      };

      if (layoutStyle) {
        const archetype = getArchetype(layoutStyle);
        if (archetype) {
          composed.layout = {
            id: archetype.id,
            name: archetype.name,
            description: archetype.description,
            sections: archetype.sections,
            responsive: archetype.responsive,
          };
        } else {
          composed.layoutError = `Archetype not found: ${layoutStyle}`;
        }
      }

      return {
        content: [{ type: "text", text: JSON.stringify(composed, null, 2) }],
      };
    }
  );

  // -- generate_context_file (experimental) --
  // Uses the shared ide-configs module for comprehensive output
  const { generateIdeConfig } = require("./lib/export/ide-configs");

  server.tool(
    "generate_context_file",
    "Generate an IDE context/rules file for a specific style. Supports .cursorrules, Claude rules, Windsurf rules, and generic formats.",
    {
      slug: z.string().describe("Style slug (e.g. 'neo-brutalist', 'glassmorphism')"),
      format: z
        .enum(["cursorrules", "claude-rules", "windsurf-rules", "generic"])
        .describe("Output format: 'cursorrules', 'claude-rules', 'windsurf-rules', or 'generic'"),
    },
    async ({ slug, format }: { slug: string; format: string }) => {
      const content = generateIdeConfig(slug, format);
      if (!content) {
        return {
          content: [{ type: "text", text: JSON.stringify({ error: `Style not found: ${slug}` }) }],
          isError: true,
        };
      }

      return {
        content: [{ type: "text", text: content }],
      };
    }
  );

  // -- analyze_project_style (experimental) --
  const { analyzeProjectStyle } = require("./lib/analyzer");

  server.tool(
    "analyze_project_style",
    "Analyze sample component code to detect which StyleKit style it most closely matches. Returns top 5 matching styles with confidence scores, pattern detection, and explanations.",
    {
      code: z.string().describe("Sample component code (JSX/TSX with Tailwind classes)"),
      packageJson: z
        .string()
        .optional()
        .describe("Optional package.json content for additional context"),
    },
    async ({ code, packageJson }: { code: string; packageJson?: string }) => {
      const result = analyzeProjectStyle({
        code,
        packageJson: packageJson || undefined,
      });

      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
} else {
  process.stderr.write(
    "StyleKit MCP: experimental tools disabled (set STYLEKIT_ENABLE_EXPERIMENTAL_TOOLS=1 to enable).\n"
  );
}

// ============================================================================
// Resources - each style as a browsable resource
// ============================================================================

for (const style of styles) {
  server.resource(
    `style-${style.slug}`,
    `style://${style.slug}`,
    { title: style.nameEn, description: style.description, mimeType: "application/json" },
    async (uri) => {
      const tokens = getStyleTokens(style.slug);
      const recipes = getStyleRecipes(style.slug);
      const data = {
        slug: style.slug,
        name: style.nameEn,
        description: style.description,
        styleType: style.styleType,
        keywords: style.keywords,
        colors: style.colors,
        philosophy: style.philosophy,
        doList: style.doList,
        dontList: style.dontList,
        aiRules: style.aiRules,
        tokens,
        recipes,
      };
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "application/json",
            text: JSON.stringify(data, null, 2),
          },
        ],
      };
    }
  );
}

// -- stylekit://styles - full catalog of all available styles --
server.resource(
  "all-styles",
  "stylekit://styles",
  {
    title: "All StyleKit Styles",
    description: "Complete catalog of all available design styles with slug, name, description, styleType, and keywords.",
    mimeType: "application/json",
  },
  async (uri) => {
    const catalog = styles.map(
      (s: { slug: string; nameEn: string; description: string; styleType: string; keywords: string[] }) => ({
        slug: s.slug,
        name: s.nameEn,
        description: s.description,
        styleType: s.styleType,
        keywords: s.keywords,
      })
    );
    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify(catalog, null, 2),
        },
      ],
    };
  }
);

// -- stylekit://knowledge/{topic} - knowledge domain resources --
const knowledgeDomains: Record<string, string> = {
  product: "Product type recommendations (SaaS, E-commerce, etc.)",
  color: "Color palettes by product type",
  typography: "Font pairing recommendations",
  landing: "Landing page conversion patterns",
  chart: "Chart and visualization recommendations",
  icon: "Icon recommendations (Lucide React)",
  ux: "Cross-cutting UX best practices",
  web: "Web interface guidelines",
  react: "React performance guidelines",
  reasoning: "Product type design decision rules",
  stack: "Stack-specific coding guidelines",
};

for (const [topic, description] of Object.entries(knowledgeDomains)) {
  server.resource(
    `knowledge-${topic}`,
    `stylekit://knowledge/${topic}`,
    {
      title: `Knowledge: ${topic}`,
      description,
      mimeType: "application/json",
    },
    async (uri) => {
      const result = searchKnowledge("*", topic as SearchDomain, 50);
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "application/json",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );
}

// ============================================================================
// Prompts - preset prompt templates
// ============================================================================

// -- generate-with-style --
server.prompt(
  "generate-with-style",
  "Generate a component or page section using a specific StyleKit design style.",
  {
    style: z.string().describe("Style slug (e.g. 'glassmorphism', 'neo-brutalist')"),
    component: z
      .string()
      .describe("What to generate (e.g. 'hero section', 'pricing card', 'login form')"),
    framework: z
      .enum(["react", "nextjs", "html"])
      .optional()
      .default("react")
      .describe("Target framework (default: react)"),
  },
  async ({ style: styleSlug, component, framework }) => {
    const style = getStyleBySlug(styleSlug);
    const tokens = style ? getStyleTokens(styleSlug) : null;

    const styleInfo = style
      ? `Style: ${style.nameEn} (${styleSlug})
Philosophy: ${style.philosophy.split("\n\n")[0]}
Do: ${style.doList.slice(0, 5).join("; ")}
Don't: ${style.dontList.slice(0, 5).join("; ")}
AI Rules: ${style.aiRules}
Colors: primary=${style.colors.primary}, secondary=${style.colors.secondary}
${tokens ? `Border radius: ${tokens.border.radius}, Shadow: ${tokens.shadow.md}` : ""}`
      : `Style slug "${styleSlug}" not found. Use a valid slug from list_styles.`;

    return {
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Generate a ${component} component using the ${styleSlug} design style.

${styleInfo}

Requirements:
- Framework: ${framework}
- Use Tailwind CSS classes that match the style tokens
- Follow all Do/Don't rules strictly
- Include responsive design (mobile-first)
- Use TypeScript if React/Next.js`,
          },
        },
      ],
    };
  }
);

// -- style-review --
server.prompt(
  "style-review",
  "Review code for consistency with a specific StyleKit design style.",
  {
    style: z.string().describe("Style slug to review against"),
    code: z.string().describe("The code to review"),
  },
  async ({ style: styleSlug, code }) => {
    const style = getStyleBySlug(styleSlug);

    const styleContext = style
      ? `Style: ${style.nameEn}
Do: ${style.doList.join("; ")}
Don't: ${style.dontList.join("; ")}
AI Rules: ${style.aiRules}`
      : `Style "${styleSlug}" not found.`;

    return {
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Review the following code for consistency with the "${styleSlug}" design style.

${styleContext}

Code to review:
\`\`\`
${code}
\`\`\`

Please check:
1. Are Tailwind classes consistent with the style's design tokens?
2. Are any forbidden patterns used?
3. Are required patterns present for the component types?
4. Does the visual hierarchy match the style's philosophy?
5. Provide specific fix suggestions for any violations.`,
          },
        },
      ],
    };
  }
);

// -- style-migration --
server.prompt(
  "style-migration",
  "Migrate code from one StyleKit design style to another.",
  {
    fromStyle: z.string().describe("Source style slug"),
    toStyle: z.string().describe("Target style slug"),
    code: z.string().describe("The code to migrate"),
  },
  async ({ fromStyle, toStyle, code }) => {
    const from = getStyleBySlug(fromStyle);
    const to = getStyleBySlug(toStyle);
    const fromTokens = from ? getStyleTokens(fromStyle) : null;
    const toTokens = to ? getStyleTokens(toStyle) : null;

    return {
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Migrate the following code from "${fromStyle}" style to "${toStyle}" style.

Source style (${fromStyle}):
${from ? `- Philosophy: ${from.philosophy.split("\n\n")[0]}` : "Not found"}
${fromTokens ? `- Border radius: ${fromTokens.border.radius}, Shadow: ${fromTokens.shadow.md}` : ""}

Target style (${toStyle}):
${to ? `- Philosophy: ${to.philosophy.split("\n\n")[0]}` : "Not found"}
${to ? `- Do: ${to.doList.slice(0, 5).join("; ")}` : ""}
${to ? `- Don't: ${to.dontList.slice(0, 5).join("; ")}` : ""}
${toTokens ? `- Border radius: ${toTokens.border.radius}, Shadow: ${toTokens.shadow.md}` : ""}
${to ? `- AI Rules: ${to.aiRules}` : ""}

Code to migrate:
\`\`\`
${code}
\`\`\`

Instructions:
1. Replace all Tailwind classes that are specific to the source style
2. Apply the target style's design tokens (border radius, shadows, colors)
3. Ensure the result follows all target style Do/Don't rules
4. Maintain the same functionality and structure
5. Add comments for significant visual changes`,
          },
        },
      ],
    };
  }
);

// -- recommend-style --
server.prompt(
  "recommend-style",
  "Recommend StyleKit design styles based on a project description. Returns top 3 styles with reasoning.",
  {
    projectDescription: z
      .string()
      .describe("Description of the project (e.g. 'A fintech dashboard for enterprise users')"),
    targetAudience: z
      .enum(["consumer", "enterprise", "developer", "creative"])
      .optional()
      .describe("Primary target audience"),
    primaryDevice: z
      .enum(["desktop", "mobile", "tablet", "all"])
      .optional()
      .describe("Primary device for the product"),
  },
  async ({ projectDescription, targetAudience, primaryDevice }) => {
    const allStyles = styles.map(
      (s: { slug: string; nameEn: string; description: string; styleType: string; keywords: string[] }) => ({
        slug: s.slug,
        name: s.nameEn,
        description: s.description,
        styleType: s.styleType,
        keywords: s.keywords,
      })
    );

    const contextParts: string[] = [];
    if (targetAudience) {
      contextParts.push(`Target audience: ${targetAudience}`);
    }
    if (primaryDevice) {
      contextParts.push(`Primary device: ${primaryDevice}`);
    }
    const contextStr = contextParts.length > 0 ? `\n${contextParts.join("\n")}` : "";

    return {
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `Analyze the following project description and recommend the top 3 most suitable design styles from the StyleKit catalog.

Project description: ${projectDescription}${contextStr}

Available styles:
${JSON.stringify(allStyles, null, 2)}

Instructions:
1. Analyze the project's domain, audience, and goals
2. Match against each style's description, keywords, and styleType
3. Return exactly 3 recommendations, ranked by suitability
4. For each recommendation provide:
   - Style slug and name
   - Suitability score (1-10)
   - Reasoning: why this style fits the project
   - Considerations: any caveats or adjustments needed
5. After the 3 recommendations, provide a brief summary of which style you recommend most and why`,
          },
        },
      ],
    };
  }
);

// ============================================================================
// Start server
// ============================================================================

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  process.stderr.write("StyleKit MCP Server running on stdio\n");
}

main().catch((error) => {
  process.stderr.write(`Failed to start server: ${error}\n`);
  process.exit(1);
});
