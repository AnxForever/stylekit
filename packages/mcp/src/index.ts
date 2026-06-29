#!/usr/bin/env node
/**
 * StyleKit MCP server.
 *
 * Exposes StyleKit's 120+ design styles — search, full profiles, design tokens,
 * component recipes, and shadcn install commands — to MCP clients such as
 * Claude Desktop, Cursor, and Windsurf, over stdio. Data is served offline from
 * the bundled @stylekit/core package.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { registerStyleKitTools } from "./tools.js";

async function main(): Promise<void> {
  const server = new McpServer({
    name: "stylekit-mcp-server",
    version: "0.1.0",
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
