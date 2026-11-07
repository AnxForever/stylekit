#!/usr/bin/env node
/**
 * StyleKit MCP server.
 *
 * Exposes StyleKit's design styles and public assets to MCP clients such as
 * Claude Desktop, Cursor, and Windsurf over stdio by default, or over stateless
 * Streamable HTTP with --http for clients that cannot spawn a process. Style
 * discovery prefers the live catalogue (cached for five minutes) and uses the
 * bundled package data only as an explicitly reported fallback when the live
 * source is unavailable.
 */

import { createRequire } from "node:module";
import { parseArgs } from "node:util";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { startHttpServer } from "./http.js";
import { registerStyleKitTools } from "./tools.js";

const { version } = createRequire(import.meta.url)("../package.json") as {
  version: string;
};

function numberFromEnv(name: string): number | undefined {
  const raw = process.env[name];
  if (raw === undefined || raw.trim() === "") return undefined;
  const value = Number(raw);
  return Number.isFinite(value) ? value : undefined;
}

function listFromEnv(name: string): string[] | undefined {
  const raw = process.env[name]?.trim();
  if (!raw) return undefined;
  return raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

async function serveStdio(): Promise<void> {
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

async function main(): Promise<void> {
  const { values } = parseArgs({
    allowPositionals: false,
    options: {
      http: { type: "boolean", default: false },
      host: { type: "string" },
      port: { type: "string" },
    },
  });

  if (!values.http) {
    await serveStdio();
    return;
  }

  const running = await startHttpServer({
    version,
    host: values.host ?? process.env.MCP_HTTP_HOST,
    port: values.port !== undefined ? Number(values.port) : numberFromEnv("MCP_HTTP_PORT"),
    path: process.env.MCP_HTTP_PATH,
    token: process.env.MCP_HTTP_TOKEN || undefined,
    baseUrl: process.env.STYLEKIT_MCP_BASE_URL || undefined,
    maxBodyBytes: numberFromEnv("MCP_MAX_BODY_BYTES"),
    rateLimitPerMinute: numberFromEnv("MCP_RATE_LIMIT"),
    trustProxy: /^(1|true|yes)$/i.test(process.env.MCP_TRUST_PROXY ?? ""),
    allowedHosts: listFromEnv("MCP_ALLOWED_HOSTS"),
    allowedOrigins: listFromEnv("MCP_ALLOWED_ORIGINS"),
  });
  const url = `http://${values.host ?? process.env.MCP_HTTP_HOST ?? "127.0.0.1"}:${running.port}${running.path}`;
  console.error(`StyleKit MCP server listening on ${url} (${version})`);

  for (const signal of ["SIGINT", "SIGTERM"] as const) {
    process.once(signal, () => {
      void running.close().finally(() => process.exit(0));
    });
  }
}

main().catch((error) => {
  console.error("StyleKit MCP server failed to start:", error);
  process.exit(1);
});
