#!/usr/bin/env node

/**
 * StyleKit MCP Server
 *
 * Model Context Protocol server built on the official SDK.
 * Exposes StyleKit capabilities as tools, resources, and prompts
 * for AI assistants.
 *
 * Tools (9):
 * - search_knowledge
 * - smart_recommend
 * - get_style
 * - list_styles
 * - lint_code
 * - get_stack_guidelines
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
const require = createRequire(path.resolve(__dirname, "../package.json"));

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

// ---- Server setup ----

const server = new McpServer({
  name: "stylekit",
  version: "1.0.0",
});

// ============================================================================
// Tools - 6 existing + 3 new
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

// -- compose_styles (NEW) --
server.tool(
  "compose_styles",
  "Compose a visual style with an optional layout archetype. Returns combined tokens, recipes, and rules.",
  {
    visualStyle: z.string().describe("Visual style slug (e.g. 'glassmorphism', 'neo-brutalist')"),
    layoutStyle: z
      .string()
      .optional()
      .describe("Layout archetype ID (e.g. 'landing-hero-centered', 'dashboard-sidebar')"),
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

// -- generate_context_file (NEW) --
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

// -- analyze_project_style (NEW - powered by lib/analyzer) --
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
