#!/usr/bin/env node

/**
 * StyleKit MCP Server
 *
 * Model Context Protocol server that exposes StyleKit capabilities
 * as a compact toolset for AI assistants.
 *
 * Core Tools:
 * - search_knowledge
 * - smart_recommend
 * - get_style
 * - list_styles
 * - lint_code
 * - get_stack_guidelines
 */

import {
  searchKnowledge,
  getStack,
  getCriticalGuidelines,
  searchStackGuidelines,
  getSmartRecommendation,
} from "../lib/knowledge";
import type { SearchDomain, StackId, RecommendationContext } from "../lib/knowledge";
import { getStyleBySlug, styles } from "../lib/styles";
import { getStyleTokens } from "../lib/styles/tokens-registry";
import { getStyleRecipes } from "../lib/recipes";
import { lintCode, getFixSuggestions, formatLintResult } from "../lib/linter";

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
      "Search StyleKit's design knowledge base across domains such as product, color, typography, UX, web, React, reasoning, and stack.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Search query (e.g. 'SaaS dashboard', 'dark color palette', 'form validation UX')",
        },
        domain: {
          type: "string",
          enum: [
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
    name: "smart_recommend",
    description:
      "Get intelligent design recommendations with scoring, explanations, and context-aware adjustments.",
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
    name: "get_style",
    description:
      "Get a specific design style with tokens, recipes, rules, and code examples.",
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

    case "smart_recommend": {
      const productQuery = args.productQuery as string;
      const context = (args.context as RecommendationContext) || {};
      return getSmartRecommendation(productQuery, context);
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

    case "lint_code": {
      const code = args.code as string;
      const style = args.style as string;
      const format = (args.format as string) || "json";

      const result = lintCode(style, code);
      const fixes = getFixSuggestions(result);

      if (format === "text") {
        return formatLintResult(result) + "\n\nFixes:\n" + fixes.map((f) => `  - ${f}`).join("\n");
      }

      return {
        ...result,
        fixes,
      };
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