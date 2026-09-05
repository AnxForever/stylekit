/**
 * Extraction service HTTP entry.
 *
 * One job, guarded three ways for a memory-constrained shared host:
 *   - bearer token, so only the main site can call it;
 *   - a single in-flight slot, so two headless Chromes never run at once;
 *   - a free-memory floor, so it declines rather than triggering the OOM
 *     killer against the neighbours (umami, postgres) on the same box.
 *
 * POST /extract { url, options? } -> { manifest, needsReview }
 * GET  /health                    -> { status, busy, freeMemMb }
 */

import { createServer } from "node:http";
import os from "node:os";
import { timingSafeEqual } from "node:crypto";

import { assertSafeUrl } from "./ssrf";
import { extractManifest } from "./extract";

const TOKEN = process.env.EXTRACT_TOKEN ?? "";
const PORT = Number(process.env.PORT ?? 8790);
const MIN_FREE_MB = Number(process.env.EXTRACT_MIN_FREE_MB ?? 400);
const MAX_BODY_BYTES = 8 * 1024;

let inFlight = false;

function send(res: import("node:http").ServerResponse, status: number, body: unknown): void {
  const json = JSON.stringify(body);
  res.writeHead(status, { "content-type": "application/json", "content-length": Buffer.byteLength(json) });
  res.end(json);
}

function tokenValid(header: string | undefined): boolean {
  if (!TOKEN) return false; // no token configured => deny everything
  const provided = (header ?? "").replace(/^Bearer\s+/i, "");
  const a = Buffer.from(provided);
  const b = Buffer.from(TOKEN);
  return a.length === b.length && timingSafeEqual(a, b);
}

function readBody(req: import("node:http").IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => {
      size += c.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error("body-too-large"));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function freeMemMb(): number {
  return Math.round(os.freemem() / (1024 * 1024));
}

const server = createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/health") {
    send(res, 200, { status: "ok", busy: inFlight, freeMemMb: freeMemMb() });
    return;
  }

  if (req.method !== "POST" || (req.url ?? "").split("?")[0] !== "/extract") {
    send(res, 404, { error: "not-found" });
    return;
  }

  if (!tokenValid(req.headers.authorization)) {
    send(res, 401, { error: "unauthorized" });
    return;
  }

  if (inFlight) {
    send(res, 503, { error: "busy", retryAfterMs: 5000 });
    return;
  }
  if (freeMemMb() < MIN_FREE_MB) {
    // Refuse rather than risk the OOM killer against co-located services.
    send(res, 503, { error: "low-memory", freeMemMb: freeMemMb(), retryAfterMs: 15000 });
    return;
  }

  let payload: { url?: unknown; options?: unknown };
  try {
    payload = JSON.parse(await readBody(req)) as typeof payload;
  } catch (error) {
    send(res, 400, { error: (error as Error).message === "body-too-large" ? "body-too-large" : "invalid-json" });
    return;
  }

  if (typeof payload.url !== "string" || !payload.url) {
    send(res, 400, { error: "url-required" });
    return;
  }

  const safe = await assertSafeUrl(payload.url);
  if (!safe.ok) {
    send(res, 400, { error: "url-rejected", reason: safe.reason });
    return;
  }

  inFlight = true;
  try {
    const result = await extractManifest({
      url: safe.url,
      hostname: safe.hostname,
      addresses: safe.addresses,
      options: (payload.options as Record<string, unknown> | undefined) ?? undefined,
    });
    send(res, 200, result);
  } catch (error) {
    const message = String((error as Error)?.message ?? error);
    const timedOut = message.startsWith("timeout:");
    send(res, timedOut ? 504 : 502, { error: timedOut ? "extract-timeout" : "extract-failed", detail: message });
  } finally {
    inFlight = false;
  }
});

server.requestTimeout = 90_000;
server.headersTimeout = 10_000;

server.listen(PORT, () => {
  if (!TOKEN) {
    process.stderr.write("[style-extract] WARNING: EXTRACT_TOKEN unset — all requests will be denied.\n");
  }
  process.stdout.write(`[style-extract] listening on :${PORT} (min free ${MIN_FREE_MB}MB)\n`);
});
