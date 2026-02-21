import { NextRequest, NextResponse } from "next/server";
import {
  generateStyleCandidatesFromDescription,
  getAvailableStyleSlugs,
  getMoodKeywords,
} from "@/lib/ai-generator";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import {
  hashGeneratorClientKey,
  recordGeneratorApiEvent,
} from "@/lib/generator/api-events";
import { z } from "zod";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 30;
const DISCOVERY_CACHE_CONTROL = "public, max-age=300, stale-while-revalidate=3600";
const GENERATE_STYLE_SCHEMA = z.object({
  description: z.string().trim().min(1, "Description is required.").max(500, "Description must be 500 characters or less"),
  baseStyle: z.string().trim().min(1).optional(),
  variationCount: z.coerce.number().int().min(1).max(4).optional(),
  creativity: z.coerce.number().min(0).max(1).optional(),
  seed: z.coerce.number().int().min(0).optional(),
});

function errorResponse(status: number, code: string, message: string, headers?: HeadersInit) {
  return NextResponse.json(
    { code, error: message },
    headers ? { status, headers } : { status }
  );
}

function computeWeakEtag(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return `W/"${input.length.toString(16)}-${hash.toString(16)}"`;
}

function normalizeEtagToken(value: string): string {
  return value.trim().replace(/^W\//i, "");
}

function matchesIfNoneMatch(ifNoneMatch: string | null, etag: string): boolean {
  if (!ifNoneMatch) return false;
  if (ifNoneMatch.trim() === "*") return true;
  const normalizedEtag = normalizeEtagToken(etag);
  return ifNoneMatch
    .split(",")
    .map((token) => normalizeEtagToken(token))
    .includes(normalizedEtag);
}

function computeCatalogVersion(availableStyles: string[], moodKeywords: string[]): string {
  let hash = 2166136261;
  const payload = JSON.stringify({
    availableStyles: [...availableStyles].sort(),
    moodKeywords: [...moodKeywords].sort(),
  });

  for (let i = 0; i < payload.length; i += 1) {
    hash ^= payload.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(16).padStart(8, "0");
}

function buildDiscoveryPayload() {
  const availableStyles = getAvailableStyleSlugs();
  const moodKeywords = getMoodKeywords();

  return {
    catalogVersion: computeCatalogVersion(availableStyles, moodKeywords),
    availableStyles,
    moodKeywords,
  };
}

/**
 * POST /api/generate-style
 * Generate a custom style from natural language description
 *
 * Body: { description: string, baseStyle?: string, variationCount?: number, creativity?: number, seed?: number }
 */
export async function POST(request: NextRequest) {
  const startedAt = Date.now();
  const clientKey = getRequestClientKey(request);
  const clientHash = hashGeneratorClientKey(clientKey);

  const attachTelemetryHeaders = (
    status: number,
    code?: string,
    headers?: HeadersInit
  ): Headers => {
    const merged = new Headers(headers);
    merged.set("x-stylekit-duration-ms", String(Date.now() - startedAt));
    merged.set("x-stylekit-status", String(status));
    if (code) {
      merged.set("x-stylekit-error-code", code);
    }
    return merged;
  };

  const respondError = (
    status: number,
    code: string,
    message: string,
    headers?: HeadersInit
  ) => {
    recordGeneratorApiEvent({
      endpoint: "generate-style",
      outcome: "error",
      status,
      code,
      durationMs: Date.now() - startedAt,
      clientHash,
    });
    return errorResponse(
      status,
      code,
      message,
      attachTelemetryHeaders(status, code, headers)
    );
  };

  const respondSuccess = (payload: unknown) => {
    const status = 200;
    recordGeneratorApiEvent({
      endpoint: "generate-style",
      outcome: "success",
      status,
      durationMs: Date.now() - startedAt,
      clientHash,
    });
    return NextResponse.json(payload, {
      headers: attachTelemetryHeaders(status),
    });
  };

  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return respondError(
      originCheck.status ?? 403,
      "ORIGIN_NOT_ALLOWED",
      originCheck.error ?? "Cross-origin request denied."
    );
  }

  const rateLimit = checkRateLimit({
    namespace: "api:generate-style",
    key: clientKey,
    limit: RATE_LIMIT_MAX_REQUESTS,
    windowMs: RATE_LIMIT_WINDOW_MS,
  });
  if (!rateLimit.allowed) {
    return respondError(
      429,
      "RATE_LIMITED",
      "Too many style generation requests. Please try again later.",
      createRateLimitHeaders(rateLimit)
    );
  }

  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return respondError(400, "INVALID_JSON", "Invalid JSON request body.");
    }

    const parsed = GENERATE_STYLE_SCHEMA.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return respondError(
        400,
        "INVALID_REQUEST",
        firstIssue?.message ?? "Invalid request body."
      );
    }

    const { description, baseStyle, variationCount, creativity, seed } = parsed.data;

    const generated = generateStyleCandidatesFromDescription({
      description,
      baseStyle,
      variationCount,
      creativity,
      seed,
    });
    return respondSuccess({
      ...generated.result,
      candidates: generated.candidates,
      meta: generated.meta,
    });
  } catch (error) {
    return respondError(
      500,
      "GENERATION_FAILED",
      `Failed to generate style: ${(error as Error).message}`
    );
  }
}

/**
 * GET /api/generate-style
 * Get available base styles and mood keywords
 */
export async function GET(request: NextRequest) {
  const startedAt = Date.now();
  const clientKey = getRequestClientKey(request);
  const clientHash = hashGeneratorClientKey(clientKey);

  const telemetryHeaders = (
    status: number,
    catalogSource: "network" | "not-modified" | "error",
    headers?: HeadersInit
  ): Headers => {
    const merged = new Headers(headers);
    merged.set("x-stylekit-duration-ms", String(Date.now() - startedAt));
    merged.set("x-stylekit-status", String(status));
    merged.set("x-stylekit-catalog-source", catalogSource);
    return merged;
  };

  try {
    const payload = buildDiscoveryPayload();
    const etag = computeWeakEtag(JSON.stringify(payload));
    const ifNoneMatch = request.headers.get("if-none-match");

    if (matchesIfNoneMatch(ifNoneMatch, etag)) {
      recordGeneratorApiEvent({
        endpoint: "generate-style",
        outcome: "success",
        status: 304,
        code: "DISCOVERY_NOT_MODIFIED",
        durationMs: Date.now() - startedAt,
        clientHash,
      });
      return new NextResponse(null, {
        status: 304,
        headers: telemetryHeaders(304, "not-modified", {
          ETag: etag,
          "Cache-Control": DISCOVERY_CACHE_CONTROL,
        }),
      });
    }

    recordGeneratorApiEvent({
      endpoint: "generate-style",
      outcome: "success",
      status: 200,
      code: "DISCOVERY_REFRESH",
      durationMs: Date.now() - startedAt,
      clientHash,
    });
    return NextResponse.json(payload, {
      headers: telemetryHeaders(200, "network", {
        ETag: etag,
        "Cache-Control": DISCOVERY_CACHE_CONTROL,
      }),
    });
  } catch (error) {
    const status = 500;
    const code = "DISCOVERY_FAILED";

    recordGeneratorApiEvent({
      endpoint: "generate-style",
      outcome: "error",
      status,
      code,
      durationMs: Date.now() - startedAt,
      clientHash,
    });

    return errorResponse(
      status,
      code,
      `Failed to load style discovery metadata: ${(error as Error).message}`,
      telemetryHeaders(status, "error")
    );
  }
}
