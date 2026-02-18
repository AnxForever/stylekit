import { NextResponse } from "next/server";
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
const RATE_LIMIT_MAX_REQUESTS = 60;

const FALLBACK_REPORT_SCHEMA = z.object({
  reason: z.enum([
    "network-error",
    "invalid-payload",
    "unexpected-status",
    "not-modified-without-cache",
  ]),
  httpStatus: z.number().int().min(100).max(599).optional(),
});

const FALLBACK_REASON_META = {
  "network-error": {
    code: "DISCOVERY_CLIENT_FALLBACK_NETWORK",
    status: 503,
  },
  "invalid-payload": {
    code: "DISCOVERY_CLIENT_FALLBACK_INVALID_PAYLOAD",
    status: 422,
  },
  "unexpected-status": {
    code: "DISCOVERY_CLIENT_FALLBACK_UNEXPECTED_STATUS",
    status: 502,
  },
  "not-modified-without-cache": {
    code: "DISCOVERY_CLIENT_FALLBACK_NOT_MODIFIED_WITHOUT_CACHE",
    status: 412,
  },
} as const;

function errorResponse(status: number, code: string, message: string, headers?: HeadersInit) {
  return NextResponse.json(
    { code, error: message },
    headers ? { status, headers } : { status }
  );
}

export async function POST(request: Request) {
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

  const respondAccepted = (code: string) => {
    const status = 202;
    recordGeneratorApiEvent({
      endpoint: "generate-style",
      outcome: "error",
      status,
      code,
      durationMs: Date.now() - startedAt,
      clientHash,
    });
    return NextResponse.json(
      { ok: true, code },
      { status, headers: attachTelemetryHeaders(status, code) }
    );
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
    namespace: "api:generate-style:fallback-report",
    key: clientKey,
    limit: RATE_LIMIT_MAX_REQUESTS,
    windowMs: RATE_LIMIT_WINDOW_MS,
  });
  if (!rateLimit.allowed) {
    return respondError(
      429,
      "RATE_LIMITED",
      "Too many fallback reports. Please try again later.",
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

    const parsed = FALLBACK_REPORT_SCHEMA.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return respondError(
        400,
        "INVALID_REQUEST",
        firstIssue?.message ?? "Invalid request body."
      );
    }

    const { reason, httpStatus } = parsed.data;
    const meta = FALLBACK_REASON_META[reason];
    const reportCode = meta.code;

    if (reason === "unexpected-status" && typeof httpStatus === "number") {
      recordGeneratorApiEvent({
        endpoint: "generate-style",
        outcome: "error",
        status: httpStatus,
        code: `${reportCode}_${httpStatus}`,
        durationMs: Date.now() - startedAt,
        clientHash,
      });
      return NextResponse.json(
        { ok: true, code: `${reportCode}_${httpStatus}` },
        {
          status: 202,
          headers: attachTelemetryHeaders(202, `${reportCode}_${httpStatus}`),
        }
      );
    }

    return respondAccepted(reportCode);
  } catch (error) {
    return respondError(
      500,
      "FALLBACK_REPORT_FAILED",
      `Failed to record fallback report: ${(error as Error).message}`
    );
  }
}
