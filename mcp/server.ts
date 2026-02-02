#!/usr/bin/env node

/**
 * StyleKit MCP Server
 *
 * Model Context Protocol server that exposes StyleKit's knowledge base
 * as tools for AI assistants.
 *
 * Tools:
 * - search_knowledge: Search across all design knowledge domains
 * - get_design_recommendation: Get comprehensive design recommendation for a product type
 * - get_style: Get a specific design style with tokens and recipes
 * - list_styles: List all available styles
 * - list_stacks: List available tech stacks
 * - get_stack_guidelines: Get coding guidelines for a specific stack
 *
 * Usage:
 *   npx tsx mcp/server.ts
 *
 * Configure in Claude Desktop / Cursor:
 *   {
 *     "mcpServers": {
 *       "stylekit": {
 *         "command": "npx",
 *         "args": ["tsx", "<path>/mcp/server.ts"]
 *       }
 *     }
 *   }
 */

import {
  searchKnowledge,
  getDesignRecommendation,
  getDomains,
  getDomainDescription,
  getStackIds,
  getStack,
  getCriticalGuidelines,
  searchStackGuidelines,
  getSmartRecommendation,
  compareStyles,
  suggestStyleByConstraints,
} from "../lib/knowledge";
import type { SearchDomain, StackId, RecommendationContext } from "../lib/knowledge";
import { getStyleBySlug, styles } from "../lib/styles";
import { getStyleTokens } from "../lib/styles/tokens-registry";
import { getStyleRecipes } from "../lib/recipes";
import { mapStyleToSlug } from "../lib/styles/style-mapping";
import { lintCode, getFixSuggestions, formatLintResult } from "../lib/linter/style-linter";
import { getStyleLintRules, getStylesWithLintRules } from "../lib/styles/lint-rules";

// ---- Minimal MCP stdio transport (no SDK dependency) ----

interface JsonRpcRequest {
  jsonrpc: "2.0";
  id?: number | string;
  method: string;
  params?: Record<string, unknown>;
}

interface JsonRpcResponse {
  jsonrpc: "2.0";
  id: number | string | null;
  result?: unknown;
  error?: { code: number; message: string; data?: unknown };
}

function send(msg: JsonRpcResponse) {
  const json = JSON.stringify(msg);
  process.stdout.write(`Content-Length: ${Buffer.byteLength(json)}\r\n\r\n${json}`);
}

function ok(id: number | string | null, result: unknown): void {
  send({ jsonrpc: "2.0", id, result });
}

function err(id: number | string | null, code: number, message: string): void {
  send({ jsonrpc: "2.0", id, error: { code, message } });
}

// ---- Tool definitions ----

const TOOLS = [
  {
    name: "search_knowledge",
    description:
      "Search StyleKit's design knowledge base across domains: product types, colors, typography, landing patterns, charts, icons, UX guidelines, web guidelines, React guidelines, reasoning rules, and tech stacks.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Search query (e.g. 'SaaS dashboard', 'dark color palette', 'form validation UX')",
        },
        domain: {
          type: "string",
          enum: [
            "product", "color", "typography", "landing", "chart",
            "icon", "ux", "web", "react", "reasoning", "stack",
          ],
          description: "Specific domain to search. Auto-detected if omitted.",
        },
        limit: {
          type: "number",
          description: "Max results (default: 5)",
          default: 5,
        },
      },
      required: ["query"],
    },
  },
  {
    name: "get_design_recommendation",
    description:
      "Generate a comprehensive design recommendation for a product type. Returns style, colors, typography, landing pattern, charts, icons, and UX guidelines.",
    inputSchema: {
      type: "object",
      properties: {
        productQuery: {
          type: "string",
          description: "Product type or description (e.g. 'SaaS dashboard', 'e-commerce store', 'personal blog')",
        },
        stackId: {
          type: "string",
          description: "Optional tech stack ID for stack-specific guidelines (e.g. 'nextjs', 'react-vite')",
        },
        maxGuidelines: {
          type: "number",
          description: "Max guidelines per domain (default: 5)",
          default: 5,
        },
      },
      required: ["productQuery"],
    },
  },
  {
    name: "get_style",
    description:
      "Get a specific design style with tokens, recipes, rules, and code examples. Available styles: neo-brutalist, neo-brutalist-soft, neo-brutalist-playful, neumorphism, glassmorphism, editorial, bento-grid.",
    inputSchema: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          description: "Style slug (e.g. 'neo-brutalist', 'glassmorphism')",
        },
      },
      required: ["slug"],
    },
  },
  {
    name: "list_styles",
    description: "List all available design styles with their descriptions and keywords.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "list_knowledge_domains",
    description: "List all available knowledge domains with descriptions.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "get_stack_guidelines",
    description:
      "Get coding guidelines for a specific tech stack. Can filter to critical-only or search within a stack.",
    inputSchema: {
      type: "object",
      properties: {
        stackId: {
          type: "string",
          description: "Stack ID (e.g. 'nextjs', 'react-vite', 'tailwindcss')",
        },
        query: {
          type: "string",
          description: "Optional search query to filter guidelines",
        },
        criticalOnly: {
          type: "boolean",
          description: "If true, only return critical-severity guidelines",
          default: false,
        },
        limit: {
          type: "number",
          description: "Max results (default: 10)",
          default: 10,
        },
      },
      required: ["stackId"],
    },
  },
  {
    name: "generate_design_system",
    description:
      "Generate a complete design system package for a product type. Combines style recommendations, tokens, colors, typography, components, and guidelines into a ready-to-use package.",
    inputSchema: {
      type: "object",
      properties: {
        productType: {
          type: "string",
          description: "Product type (e.g. 'SaaS dashboard', 'e-commerce store', 'portfolio')",
        },
        stylePreference: {
          type: "string",
          description: "Preferred style slug or 'auto' for automatic selection",
          default: "auto",
        },
        colorScheme: {
          type: "string",
          enum: ["light", "dark", "auto"],
          description: "Color scheme preference",
          default: "auto",
        },
        stackId: {
          type: "string",
          description: "Tech stack ID for stack-specific guidelines (optional)",
        },
      },
      required: ["productType"],
    },
  },
  {
    name: "lint_code",
    description:
      "Check if code follows a specific design style's guidelines. Returns errors for forbidden classes and warnings for missing required classes.",
    inputSchema: {
      type: "object",
      properties: {
        code: {
          type: "string",
          description: "The code to lint (JSX/TSX with Tailwind classes)",
        },
        style: {
          type: "string",
          description: "Style slug to check against (e.g. 'neo-brutalist', 'glassmorphism')",
        },
        format: {
          type: "string",
          enum: ["json", "text"],
          description: "Output format (default: json)",
          default: "json",
        },
      },
      required: ["code", "style"],
    },
  },
  {
    name: "get_lint_rules",
    description:
      "Get the lint rules for a specific style. Shows forbidden classes, required classes, and recommendations.",
    inputSchema: {
      type: "object",
      properties: {
        style: {
          type: "string",
          description: "Style slug (e.g. 'neo-brutalist', 'glassmorphism')",
        },
      },
      required: ["style"],
    },
  },
  {
    name: "list_lintable_styles",
    description: "List all styles that have lint rules available.",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
  {
    name: "smart_recommend",
    description:
      "Get intelligent design recommendations with scoring, explanations, and context-aware adjustments. More advanced than get_design_recommendation.",
    inputSchema: {
      type: "object",
      properties: {
        productQuery: {
          type: "string",
          description: "Product type or description (e.g. 'SaaS dashboard', 'e-commerce store')",
        },
        context: {
          type: "object",
          description: "Optional context for personalized recommendations",
          properties: {
            targetAudience: {
              type: "string",
              enum: ["consumer", "enterprise", "developer", "creative"],
              description: "Primary target audience",
            },
            ageGroup: {
              type: "string",
              enum: ["young", "adult", "senior", "all"],
              description: "Target age group",
            },
            primaryDevice: {
              type: "string",
              enum: ["desktop", "mobile", "tablet", "all"],
              description: "Primary device for the product",
            },
            brandMood: {
              type: "string",
              enum: ["playful", "professional", "luxury", "minimal", "bold"],
              description: "Desired brand mood",
            },
            darkModePreferred: {
              type: "boolean",
              description: "Prefer dark mode colors",
            },
            accessibilityPriority: {
              type: "boolean",
              description: "Prioritize accessibility (high contrast, etc.)",
            },
            performancePriority: {
              type: "boolean",
              description: "Prioritize performance (lightweight styles)",
            },
          },
        },
      },
      required: ["productQuery"],
    },
  },
  {
    name: "compare_styles",
    description:
      "Compare two design styles for a specific product type. Returns detailed comparison with scores and winner.",
    inputSchema: {
      type: "object",
      properties: {
        productQuery: {
          type: "string",
          description: "Product type or description",
        },
        style1: {
          type: "string",
          description: "First style slug to compare (e.g. 'neo-brutalist')",
        },
        style2: {
          type: "string",
          description: "Second style slug to compare (e.g. 'glassmorphism')",
        },
        context: {
          type: "object",
          description: "Optional context for comparison",
        },
      },
      required: ["productQuery", "style1", "style2"],
    },
  },
  {
    name: "suggest_style_by_constraints",
    description:
      "Get style suggestions based on specific constraints and priorities. Useful when you have specific requirements.",
    inputSchema: {
      type: "object",
      properties: {
        mustHave: {
          type: "array",
          items: { type: "string" },
          description:
            "Features the style must have (e.g. 'high-contrast', 'rounded-corners', 'minimal', 'bold', 'elegant')",
        },
        mustNotHave: {
          type: "array",
          items: { type: "string" },
          description:
            "Features to avoid (e.g. 'no-animations', 'no-blur', 'no-shadows')",
        },
        priorities: {
          type: "array",
          items: {
            type: "string",
            enum: ["performance", "accessibility", "visual-impact", "professionalism"],
          },
          description: "Priority order for style selection",
        },
      },
    },
  },
];

// ---- Tool handlers ----

function handleTool(name: string, args: Record<string, unknown>): unknown {
  switch (name) {
    case "search_knowledge": {
      const query = args.query as string;
      const domain = args.domain as SearchDomain | undefined;
      const limit = (args.limit as number) || 5;
      return searchKnowledge(query, domain, limit);
    }

    case "get_design_recommendation": {
      const productQuery = args.productQuery as string;
      const stackId = args.stackId as StackId | undefined;
      const maxGuidelines = (args.maxGuidelines as number) || 5;
      return getDesignRecommendation(productQuery, { stackId, maxGuidelines });
    }

    case "get_style": {
      const slug = args.slug as string;
      const style = getStyleBySlug(slug);
      if (!style) return { error: `Style not found: ${slug}` };
      const tokens = getStyleTokens(slug);
      const recipes = getStyleRecipes(slug);
      return {
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
      };
    }

    case "list_styles": {
      return styles.map((s) => ({
        slug: s.slug,
        name: s.nameEn,
        description: s.description,
        keywords: s.keywords,
        styleType: s.styleType,
      }));
    }

    case "list_knowledge_domains": {
      return getDomains().map((d: SearchDomain) => ({
        id: d,
        description: getDomainDescription(d),
      }));
    }

    case "get_stack_guidelines": {
      const stackId = args.stackId as StackId;
      const query = args.query as string | undefined;
      const criticalOnly = args.criticalOnly as boolean;
      const limit = (args.limit as number) || 10;

      const stack = getStack(stackId);
      if (!stack) return { error: `Stack not found: ${stackId}` };

      if (criticalOnly) {
        return {
          stackId,
          name: stack.name,
          guidelines: getCriticalGuidelines(stackId),
        };
      }

      if (query) {
        return {
          stackId,
          name: stack.name,
          guidelines: searchStackGuidelines(stackId, query, limit),
        };
      }

      return {
        id: stack.id,
        name: stack.name,
        category: stack.category,
        description: stack.description,
        guidelines: stack.guidelines,
      };
    }

    case "generate_design_system": {
      const productType = args.productType as string;
      const stylePreference = (args.stylePreference as string) || "auto";
      const colorScheme = (args.colorScheme as string) || "auto";
      const stackId = args.stackId as StackId | undefined;

      // Get design recommendation
      const recommendation = getDesignRecommendation(productType, {
        stackId,
        maxGuidelines: 10,
      });

      // Determine style
      let selectedStyle: string;
      if (stylePreference === "auto") {
        selectedStyle = mapStyleToSlug(recommendation.style.primary, colorScheme);
      } else {
        selectedStyle = stylePreference;
      }

      // Get style details
      const style = getStyleBySlug(selectedStyle);
      if (!style) return { error: `Style not found: ${selectedStyle}` };

      const tokens = getStyleTokens(selectedStyle);
      const recipes = getStyleRecipes(selectedStyle);

      return {
        meta: {
          generatedFor: productType,
          styleSlug: selectedStyle,
          styleName: style.nameEn,
          colorScheme,
        },
        style: {
          name: style.nameEn,
          philosophy: style.philosophy,
          doList: style.doList,
          dontList: style.dontList,
          aiRules: style.aiRules,
        },
        tokens,
        colors: {
          style: style.colors,
          recommendation: recommendation.colors,
        },
        typography: recommendation.typography,
        components: style.components,
        recipes: recipes ? Object.keys(recipes.recipes) : [],
        guidelines: {
          ux: recommendation.uxGuidelines,
          stack: recommendation.stackGuidelines,
        },
        icons: recommendation.icons,
      };
    }

    case "lint_code": {
      const code = args.code as string;
      const style = args.style as string;
      const format = (args.format as string) || "json";

      const result = lintCode(code, style);
      const fixes = getFixSuggestions(result);

      if (format === "text") {
        return formatLintResult(result) + "\n\nFixes:\n" + fixes.map(f => `  - ${f}`).join("\n");
      }

      return {
        ...result,
        fixes,
      };
    }

    case "get_lint_rules": {
      const style = args.style as string;
      const rules = getStyleLintRules(style);

      if (!rules) {
        return { error: `No lint rules found for style: ${style}` };
      }

      return {
        style: rules.slug,
        name: rules.name,
        forbidden: {
          classes: rules.forbidden.classes,
          patterns: rules.forbidden.patterns.map(p => p.source),
          reasons: rules.forbidden.reasons,
        },
        required: rules.required,
        recommended: rules.recommended,
        colors: rules.colors,
        typography: rules.typography,
      };
    }

    case "list_lintable_styles": {
      return {
        styles: getStylesWithLintRules(),
        count: getStylesWithLintRules().length,
      };
    }

    case "smart_recommend": {
      const productQuery = args.productQuery as string;
      const context = (args.context as RecommendationContext) || {};
      return getSmartRecommendation(productQuery, context);
    }

    case "compare_styles": {
      const productQuery = args.productQuery as string;
      const style1 = args.style1 as string;
      const style2 = args.style2 as string;
      const context = (args.context as RecommendationContext) || {};
      return compareStyles(productQuery, style1, style2, context);
    }

    case "suggest_style_by_constraints": {
      const mustHave = (args.mustHave as string[]) || [];
      const mustNotHave = (args.mustNotHave as string[]) || [];
      const priorities = (args.priorities as ("performance" | "accessibility" | "visual-impact" | "professionalism")[]) || [];
      return suggestStyleByConstraints({ mustHave, mustNotHave, priorities });
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// ---- Message processing ----

function handleMessage(msg: JsonRpcRequest) {
  const { id, method, params } = msg;

  switch (method) {
    case "initialize":
      ok(id!, {
        protocolVersion: "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: {
          name: "stylekit",
          version: "1.0.0",
        },
      });
      break;

    case "notifications/initialized":
      // No response needed
      break;

    case "tools/list":
      ok(id!, { tools: TOOLS });
      break;

    case "tools/call": {
      const toolName = (params as { name: string }).name;
      const toolArgs = ((params as { arguments?: Record<string, unknown> }).arguments) || {};
      try {
        const result = handleTool(toolName, toolArgs);
        ok(id!, {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        });
      } catch (e) {
        ok(id!, {
          content: [
            {
              type: "text",
              text: `Error: ${(e as Error).message}`,
            },
          ],
          isError: true,
        });
      }
      break;
    }

    default:
      if (id) {
        err(id, -32601, `Method not found: ${method}`);
      }
  }
}

// ---- stdio transport ----

let buffer = "";

process.stdin.setEncoding("utf-8");
process.stdin.on("data", (chunk: string) => {
  buffer += chunk;

  while (true) {
    const headerEnd = buffer.indexOf("\r\n\r\n");
    if (headerEnd === -1) break;

    const header = buffer.slice(0, headerEnd);
    const match = header.match(/Content-Length:\s*(\d+)/i);
    if (!match) {
      buffer = buffer.slice(headerEnd + 4);
      continue;
    }

    const contentLength = parseInt(match[1], 10);
    const bodyStart = headerEnd + 4;

    if (buffer.length < bodyStart + contentLength) break;

    const body = buffer.slice(bodyStart, bodyStart + contentLength);
    buffer = buffer.slice(bodyStart + contentLength);

    try {
      const msg = JSON.parse(body) as JsonRpcRequest;
      handleMessage(msg);
    } catch {
      // Ignore parse errors
    }
  }
});

process.stderr.write("StyleKit MCP Server running on stdio\n");
