#!/usr/bin/env node
/**
 * StyleKit MCP server.
 *
 * Exposes StyleKit's design styles and public assets to MCP clients such as
 * Claude Desktop, Cursor, and Windsurf over stdio. Style discovery prefers the
 * live catalogue (cached for five minutes) and uses the bundled package data
 * only as an explicitly reported fallback when the live source is unavailable.
 */

import { createRequire } from "node:module";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { registerStyleKitTools } from "./tools.js";

const { version } = createRequire(import.meta.url)("../package.json") as {
  version: string;
};

async function main(): Promise<void> {
  const server = new McpServer({
    name: "stylekit-mcp-server",
    version,
  });

  registerStyleKitTools(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);
  // stdout is reserved for the protocol; logs go to stderr.
  console.error("StyleKit MCP server running via stdio");
}

main().catch((error) => {
  console.error("StyleKit MCP server failed to start:", error);
  process.exit(1);
});
