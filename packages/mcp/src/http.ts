/**
 * Stateless Streamable HTTP transport for stylekit-mcp.
 *
 * The npm package's default transport is stdio, which requires Node and a local
 * install on every client. This module serves the same tools over HTTP for
 * clients that cannot spawn a process (web chat connectors, shared team
 * endpoints), and for operators who want the catalogue to stay current without
 * waiting for a package release.
 *
 * Every request gets its own McpServer + transport with no session state. The
 * tools are read-only, so there is nothing to resume, and stateless mode keeps
 * one slow client from holding a server object open. Responses are JSON rather
 * than SSE so a proxy does not have to buffer an event stream.
 */

import { timingSafeEqual } from "node:crypto";
import { once } from "node:events";
import { createServer, type IncomingMessage, type Server, type ServerResponse } from "node:http";
import type { AddressInfo } from "node:net";

import { createMcpHandler } from "@modelcontextprotocol/server";
import { toNodeHandler, type NodeMcpRequestHandler } from "@modelcontextprotocol/node";
import type { RemoteOptions } from "stylekit-core/discovery";

import { createStyleKitServer, isToolset, type Toolset } from "./server.js";

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PATH = "/mcp";
const DEFAULT_MAX_BODY_BYTES = 1_000_000;
const DEFAULT_RATE_LIMIT_PER_MINUTE = 120;
const RATE_WINDOW_MS = 60_000;
const CORS_METHODS = "POST, OPTIONS";
const CORS_HEADERS =
  "Content-Type, Authorization, Mcp-Session-Id, Mcp-Protocol-Version, Last-Event-ID";
const CORS_EXPOSE = "Mcp-Session-Id, Mcp-Protocol-Version";

export interface HttpServerOptions {
  readonly version: string;
  readonly host?: string;
  readonly port?: number;
  readonly path?: string;
  /** Bearer token required for MCP requests. Health checks stay public. */
  readonly token?: string;
  /** Override the live catalogue origin, e.g. http://127.0.0.1:13000. */
  readonly baseUrl?: string;
  readonly maxBodyBytes?: number;
  /** Requests per minute per client IP. 0 disables the limiter. */
  readonly rateLimitPerMinute?: number;
  /** Read the client IP from X-Forwarded-For (set only behind a proxy). */
  readonly trustProxy?: boolean;
  /** Host header allowlist. Loopback binds default to loopback names only. */
  readonly allowedHosts?: readonly string[];
  /** Origin allowlist for browser clients. Unset means allow all. */
  readonly allowedOrigins?: readonly string[];
}

export interface RunningHttpServer {
  readonly port: number;
  close(): Promise<void>;
}

interface RateBucket {
  count: number;
  resetAt: number;
}

function isLoopbackHost(value: string): boolean {
  const host = value.trim().toLowerCase();
  return host === "localhost" || host === "127.0.0.1" || host === "::1" || host === "[::1]";
}

function hostnameOf(value: string | undefined): string | null {
  if (!value) return null;
  const host = value.trim().toLowerCase();
  if (host.startsWith("[")) {
    const end = host.indexOf("]");
    return end > 0 ? host.slice(1, end) : null;
  }
  return host.split(":")[0] ?? null;
}

function hostAllowed(hostHeader: string | undefined, allowed: readonly string[]): boolean {
  const hostname = hostnameOf(hostHeader);
  return hostname !== null && allowed.some((entry) => hostnameOf(entry) === hostname);
}

function originAllowed(
  origin: string,
  allowed: readonly string[] | undefined,
  localOnly: boolean,
): boolean {
  if (allowed) return allowed.includes("*") || allowed.includes(origin);
  if (!localOnly) return true;
  try {
    return isLoopbackHost(new URL(origin).hostname);
  } catch {
    return false;
  }
}

type BodyResult =
  | { readonly ok: true; readonly value: unknown }
  | { readonly ok: false; readonly status: number; readonly error: string };

function sendJson(
  res: ServerResponse,
  status: number,
  body: unknown,
  extraHeaders: Record<string, string> = {},
): void {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(payload),
    "cache-control": "no-store",
    ...extraHeaders,
  });
  res.end(payload);
}

function normalizePath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed.length === 0 ? "/" : trimmed;
}

function toolsetForPath(pathname: string, base: string): Toolset | null {
  if (pathname === base) return "all";
  const prefix = base === "/" ? "/" : `${base}/`;
  if (!pathname.startsWith(prefix)) return null;
  const candidate = pathname.slice(prefix.length);
  return isToolset(candidate) ? candidate : null;
}

async function readJsonBody(req: IncomingMessage, limit: number): Promise<BodyResult> {
  const chunks: Buffer[] = [];
  let size = 0;
  let tooLarge = false;
  try {
    for await (const chunk of req) {
      const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      size += buffer.length;
      if (size > limit) {
        // Keep draining so the client receives a real 413 instead of a reset
        // connection; nginx's client_max_body_size cuts off the pathological
        // case before it reaches this process.
        tooLarge = true;
        continue;
      }
      chunks.push(buffer);
    }
  } catch {
    return { ok: false, status: 400, error: "Could not read the request body." };
  }
  if (tooLarge) return { ok: false, status: 413, error: `Request body exceeds ${limit} bytes.` };
  if (chunks.length === 0) return { ok: false, status: 400, error: "Request body is required." };
  try {
    return { ok: true, value: JSON.parse(Buffer.concat(chunks).toString("utf8")) };
  } catch {
    return { ok: false, status: 400, error: "Request body must be valid JSON." };
  }
}

/**
 * Serves the StyleKit tools at one HTTP path. Exported separately from the CLI
 * entry so tests can start it on port 0 without spawning a process.
 */
export async function startHttpServer(options: HttpServerOptions): Promise<RunningHttpServer> {
  const host = options.host ?? DEFAULT_HOST;
  const path = normalizePath(options.path ?? DEFAULT_PATH);
  const maxBodyBytes = options.maxBodyBytes ?? DEFAULT_MAX_BODY_BYTES;
  const rateLimit = options.rateLimitPerMinute ?? DEFAULT_RATE_LIMIT_PER_MINUTE;
  const trustProxy = options.trustProxy ?? false;
  const remoteOptions: RemoteOptions = options.baseUrl ? { baseUrl: options.baseUrl } : {};
  const buckets = new Map<string, RateBucket>();
  const handlers = new Map<Toolset, { close(): Promise<void>; node: NodeMcpRequestHandler }>();
  for (const toolset of ["all", "core", "assets", "design"] as const) {
    const handler = createMcpHandler(
      () => createStyleKitServer(options.version, remoteOptions, toolset),
      {
        legacy: "stateless",
        maxRequestBodySize: maxBodyBytes,
        onerror: (error) => console.error("StyleKit MCP handler error:", error),
      },
    );
    handlers.set(toolset, {
      close: () => handler.close(),
      node: toNodeHandler(handler, {
        onerror: (error) => console.error("StyleKit MCP node adapter error:", error),
      }),
    });
  }

  function rateLimited(ip: string): boolean {
    if (rateLimit <= 0) return false;
    const now = Date.now();
    const bucket = buckets.get(ip);
    if (!bucket || bucket.resetAt <= now) {
      // Lazy sweep keeps the map bounded without a timer holding the process open.
      if (buckets.size > 10_000) {
        for (const [key, value] of buckets) {
          if (value.resetAt <= now) buckets.delete(key);
        }
      }
      buckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
      return false;
    }
    bucket.count += 1;
    return bucket.count > rateLimit;
  }

  async function handleMcp(req: IncomingMessage, res: ServerResponse, toolset: Toolset): Promise<void> {
    if (options.token) {
      const header = req.headers.authorization;
      const prefix = "Bearer ";
      const supplied = header?.startsWith(prefix) ? header.slice(prefix.length) : "";
      const expected = options.token;
      const matches =
        supplied.length > 0 &&
        Buffer.byteLength(supplied) === Buffer.byteLength(expected) &&
        timingSafeEqual(Buffer.from(supplied), Buffer.from(expected));
      if (!matches) {
        sendJson(res, 401, { error: "Unauthorized" }, { "www-authenticate": "Bearer" });
        return;
      }
    }

    const realIp = req.headers["x-real-ip"];
    const realIpValue = Array.isArray(realIp) ? realIp[0] : realIp;
    const forwarded = req.headers["x-forwarded-for"];
    const forwardedValue = Array.isArray(forwarded) ? forwarded[0] : forwarded;
    // With one trusted proxy, the last XFF entry is the one nginx appended.
    // Taking the first entry would let a client rotate a spoofed value and
    // bypass the per-IP limit.
    const forwardedIp = forwardedValue?.split(",").map((part) => part.trim()).filter(Boolean).at(-1);
    const ip = trustProxy
      ? realIpValue?.trim() || forwardedIp || req.socket.remoteAddress || "unknown"
      : req.socket.remoteAddress ?? "unknown";
    if (rateLimited(ip)) {
      sendJson(res, 429, { error: "Too many requests" }, { "retry-after": "60" });
      return;
    }

    let parsedBody: unknown;
    if (req.method === "POST") {
      const body = await readJsonBody(req, maxBodyBytes);
      if (!body.ok) {
        if (!res.headersSent && !res.destroyed) sendJson(res, body.status, { error: body.error });
        return;
      }
      parsedBody = body.value;
    }

    const entry = handlers.get(toolset);
    if (!entry) {
      if (!res.headersSent && !res.destroyed) sendJson(res, 500, { error: "Unknown toolset" });
      return;
    }
    try {
      await entry.node(req, res, parsedBody);
    } catch (error) {
      if (!res.headersSent && !res.destroyed) {
        sendJson(res, 500, { error: error instanceof Error ? error.message : String(error) });
      }
    }
  }

  const server: Server = createServer((req, res) => {
    res.setHeader("access-control-allow-origin", "*");
    res.setHeader("access-control-allow-methods", CORS_METHODS);
    res.setHeader("access-control-allow-headers", CORS_HEADERS);
    res.setHeader("access-control-expose-headers", CORS_EXPOSE);
    res.setHeader("access-control-max-age", "86400");

    const allowedHosts =
      options.allowedHosts ??
      (isLoopbackHost(host) ? ["localhost", "127.0.0.1", "[::1]"] : undefined);
    if (allowedHosts && !hostAllowed(req.headers.host, allowedHosts)) {
      sendJson(res, 403, { error: "Host not allowed" });
      return;
    }
    const origin = req.headers.origin;
    if (origin && !originAllowed(origin, options.allowedOrigins, isLoopbackHost(host) && !options.allowedHosts)) {
      sendJson(res, 403, { error: "Origin not allowed" });
      return;
    }

    const pathname = normalizePath(new URL(req.url ?? "/", "http://localhost").pathname);

    if (pathname === "/healthz") {
      sendJson(res, 200, { ok: true, server: "stylekit-mcp", version: options.version });
      return;
    }

    const toolset = toolsetForPath(pathname, path);
    if (toolset === null) {
      sendJson(res, 404, { error: `Not found. MCP endpoints are ${path} and ${path}/<toolset>.` });
      return;
    }

    if (req.method === "OPTIONS") {
      res.writeHead(204, {
        "access-control-max-age": "86400",
        "access-control-allow-methods": CORS_METHODS,
        "access-control-allow-headers": CORS_HEADERS,
      });
      res.end();
      return;
    }

    // No server-initiated messages and no sessions in stateless mode, so a GET
    // SSE stream or DELETE termination would only hold a connection open. The
    // spec allows 405 here; clients that need streaming can use stdio.
    if (req.method !== "POST") {
      sendJson(res, 405, { error: "Use POST for MCP requests." }, { allow: "POST, OPTIONS" });
      return;
    }

    void handleMcp(req, res, toolset).catch((error: unknown) => {
      if (!res.headersSent && !res.destroyed) {
        sendJson(res, 500, { error: error instanceof Error ? error.message : String(error) });
      }
    });
  });

  const listening = once(server, "listening");
  server.listen(options.port ?? 0, host);
  await listening;

  const address = server.address() as AddressInfo;
  return {
    port: address.port,
    async close(): Promise<void> {
      const closed = once(server, "close");
      server.close();
      server.closeAllConnections?.();
      await Promise.all([...handlers.values()].map((entry) => entry.close().catch(() => undefined)));
      await closed;
    },
  };
}
