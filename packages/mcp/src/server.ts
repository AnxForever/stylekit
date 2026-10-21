/**
 * Shared MCP server construction.
 *
 * Both transports expose the same tools and the same initialize metadata, so
 * clients see one server rather than two implementations that can drift.
 */

import { McpServer } from "@modelcontextprotocol/server";
import type { RemoteOptions } from "stylekit-core/discovery";

import { registerStyleKitTools } from "./tools.js";

const ALL_TOOLS = [
  "stylekit_search_styles",
  "stylekit_list_assets",
  "stylekit_get_asset",
  "stylekit_get_style",
  "stylekit_get_style_tokens",
  "stylekit_get_component_recipe",
  "stylekit_get_shadcn_install",
  "stylekit_lint_code",
  "stylekit_repair_code",
  "stylekit_get_implementation_brief",
] as const;

export const TOOLSETS = {
  all: ALL_TOOLS,
  // The generation loop: discover, load the contract, verify, repair.
  core: [
    "stylekit_search_styles",
    "stylekit_get_implementation_brief",
    "stylekit_lint_code",
    "stylekit_repair_code",
  ],
  // Templates and reference implementations.
  assets: ["stylekit_list_assets", "stylekit_get_asset"],
  // Style research without the asset catalogue or lint loop.
  design: [
    "stylekit_search_styles",
    "stylekit_get_style",
    "stylekit_get_style_tokens",
    "stylekit_get_component_recipe",
    "stylekit_get_shadcn_install",
    "stylekit_get_implementation_brief",
  ],
} as const;

export type Toolset = keyof typeof TOOLSETS;

export function isToolset(value: string): value is Toolset {
  return Object.prototype.hasOwnProperty.call(TOOLSETS, value);
}

export const SERVER_INFO = {
  name: "stylekit-mcp-server",
  title: "StyleKit",
  description:
    "Design styles, tokens, recipes, public assets, lint and repair for AI-generated UI.",
  websiteUrl: "https://www.stylekit.top",
} as const;

/**
 * Sent in the initialize response. Clients load this once per connection, so it
 * is the cheapest place to steer the generation → lint → repair workflow.
 */
export const SERVER_INSTRUCTIONS = [
  "StyleKit provides design specifications for AI-generated UI.",
  "Choose a style with stylekit_search_styles, then call stylekit_get_implementation_brief before generating or editing UI.",
  "After generating, run stylekit_lint_code; if it fails, call stylekit_repair_code and review any unfixed items.",
  "Use the asset tools for templates and reference code. All tools are read-only.",
  "Live data may fall back to a bundled snapshot; check origin and fallbackReason when it matters.",
].join(" ");

export function createStyleKitServer(
  version: string,
  remoteOptions: RemoteOptions = {},
  toolset: Toolset = "all",
): McpServer {
  const server = new McpServer(
    { ...SERVER_INFO, version },
    {
      instructions: SERVER_INSTRUCTIONS,
      capabilities: { tools: { listChanged: false } },
      cacheHints: {
        "tools/list": { ttlMs: 300_000, cacheScope: "public" },
        "server/discover": { ttlMs: 300_000, cacheScope: "public" },
      },
    },
  );
  const enabled = new Set<string>(TOOLSETS[toolset]);
  // registerStyleKitTools registers the full surface; filter at registration
  // time so a toolset never advertises a tool it cannot call.
  const filtered = new Proxy(server, {
    get(target, property, receiver) {
      if (property === "registerTool") {
        return (name: string, config: unknown, handler: unknown): void => {
          if (!enabled.has(name)) return;
          (target.registerTool as unknown as (
            name: string,
            config: unknown,
            handler: unknown,
          ) => unknown)(name, config, handler);
        };
      }
      return Reflect.get(target, property, receiver);
    },
  });
  registerStyleKitTools(filtered, remoteOptions);
  return server;
}
