import { NextResponse } from "next/server";
import { z } from "zod";

import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";

/**
 * Streaming proxy for the Mercury 3 diffusion demo.
 *
 * The upstream `diffusing` mode emits *snapshots*: every `chat.completion.chunk`
 * carries the full text as currently denoised, not a delta. We forward those
 * snapshots as NDJSON lines so the client can reconcile character by character
 * without parsing SSE framing itself.
 *
 * The API key stays here. The browser only ever sees the trace.
 */

const MAX_BODY_BYTES = 4 * 1024;
const UPSTREAM_TIMEOUT_MS = 45_000;
const MAX_FRAMES = 400;
const MAX_TEXT_CHARS = 12_000;

const requestSchema = z
  .object({
    prompt: z.string().trim().min(1).max(400),
  })
  .strict();

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type UpstreamFrame =
  | { kind: "text"; text: string }
  | { kind: "done"; finishReason: string | null };

/** Parse one upstream SSE line into the frames we care about. */
function readFrame(raw: string): UpstreamFrame | null {
  if (!raw.startsWith("data: ")) return null;
  const payload = raw.slice(6).trim();
  if (!payload || payload === "[DONE]") return null;

  let parsed: {
    choices?: Array<{
      delta?: { content?: string | null } | null;
      finish_reason?: string | null;
    }>;
  };
  try {
    parsed = JSON.parse(payload);
  } catch {
    return null;
  }

  const choice = parsed.choices?.[0];
  if (!choice) return null;

  const content = choice.delta?.content;
  if (typeof content === "string" && content.length > 0) {
    return { kind: "text", text: content };
  }
  if (choice.finish_reason) {
    return { kind: "done", finishReason: choice.finish_reason };
  }
  return null;
}

export async function POST(request: Request) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { error: originCheck.error },
      { status: originCheck.status ?? 403 }
    );
  }

  // A public demo cannot share one bucket: `getRequestClientKey` returns
  // "ip:unknown" whenever TRUSTED_CLIENT_IP_HEADER is unset, which would let one
  // visitor exhaust the quota for everyone. Prefer the proxy header, then a
  // per-browser id, so a single visitor can retry without locking out the rest.
  const forwarded =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "";
  const cookieVisitor =
    request.headers
      .get("cookie")
      ?.match(/(?:^|;\s*)sk_lab_vid=([\w-]{8,64})/)?.[1] ?? "";
  const visitor = cookieVisitor || crypto.randomUUID();
  const sharedKey = getRequestClientKey(request);
  const clientKey =
    sharedKey !== "ip:unknown"
      ? sharedKey
      : forwarded
        ? `ip:${forwarded}`
        : `vid:${visitor}`;

  const rateLimit = checkRateLimit({
    namespace: "api:experiments-diffusion",
    key: clientKey,
    limit: 40,
    windowMs: 10 * 60 * 1000,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many demos in a row. Try again in a few minutes." },
      { status: 429, headers: createRateLimitHeaders(rateLimit) }
    );
  }

  const body = await parseJsonBodyWithLimit<unknown>(request, {
    maxBytes: MAX_BODY_BYTES,
    tooLargeMessage: "Prompt is too large.",
    invalidJsonMessage: "Invalid JSON body.",
  });
  if (!body.ok) {
    return NextResponse.json({ error: body.error }, { status: body.status });
  }

  const parsed = requestSchema.safeParse(body.data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "prompt must be a string of 1–400 characters." },
      { status: 400 }
    );
  }

  const keys = [process.env.INCEPTION_API_KEY, process.env.INCEPTION_API_KEY_2]
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value));
  if (keys.length === 0) {
    return NextResponse.json(
      { error: "INCEPTION_API_KEY is not configured." },
      { status: 503 }
    );
  }

  const baseUrl = (
    process.env.INCEPTION_BASE_URL?.trim() || "https://api.inceptionlabs.ai/v1"
  ).replace(/\/+$/, "");
  const prompt = parsed.data.prompt;
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const abort = new AbortController();
      const timer = setTimeout(() => abort.abort(), UPSTREAM_TIMEOUT_MS);
      const push = (payload: unknown) => {
        controller.enqueue(encoder.encode(`${JSON.stringify(payload)}\n`));
      };

      try {
        let sent = 0;
        let lastText = "";
        let finishReason: string | null = null;
        let sawText = false;

        // The diffusing endpoint occasionally answers with a single frame whose
        // finish_reason is "length" and whose content is empty. One retry, on a
        // different key, turns that into a usable trace.
        for (let attempt = 0; attempt < 2; attempt += 1) {
          const upstream = await fetch(`${baseUrl}/chat/completions`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${keys[attempt % keys.length]}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: process.env.INCEPTION_MODEL?.trim() || "mercury-3",
              reasoning_effort: "instant",
              max_completion_tokens: 2_400,
              stream: true,
              diffusing: true,
              realtime: true,
              messages: [
                {
                  role: "system",
                  content:
                    "Write plain continuous prose. No headings, no bullet lists, no markdown emphasis. Stay within roughly 150 words.",
                },
                { role: "user", content: prompt },
              ],
            }),
            signal: abort.signal,
          });

          if (!upstream.ok || !upstream.body) {
            if (attempt === 1) {
              throw new Error(`Upstream answered ${upstream.status}.`);
            }
            continue;
          }

          const reader = upstream.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const raw of lines) {
              const frame = readFrame(raw.trim());
              if (!frame) continue;

              if (frame.kind === "done") {
                finishReason = frame.finishReason;
                continue;
              }
              if (frame.text === lastText) continue;
              if (sent >= MAX_FRAMES) continue;
              if (frame.text.length > MAX_TEXT_CHARS) continue;

              lastText = frame.text;
              sawText = true;
              push({ i: sent, text: frame.text });
              sent += 1;
            }
          }

          if (sawText) break;
        }

        push(
          sawText
            ? { done: true, frames: sent, finishReason }
            : { error: "The model returned no denoising frames." }
        );
      } catch (error) {
        const message = abort.signal.aborted
          ? "The model took too long to answer."
          : error instanceof Error
            ? error.message
            : "Diffusion request failed.";
        push({ error: message });
      } finally {
        clearTimeout(timer);
        controller.close();
      }
    },
  });

  const headers: Record<string, string> = {
    "Content-Type": "application/x-ndjson; charset=utf-8",
    "Cache-Control": "no-store, no-transform",
    "X-Accel-Buffering": "no",
    ...createRateLimitHeaders(rateLimit),
  };
  if (!cookieVisitor) {
    headers["Set-Cookie"] =
      `sk_lab_vid=${visitor}; Path=/; Max-Age=86400; SameSite=Lax`;
  }

  return new Response(stream, { headers });
}
