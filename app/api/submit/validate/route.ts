import { NextResponse } from "next/server";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import {
  getManifestSummary,
  validateStyleSubmissionManifest,
} from "@/lib/submit/manifest-validator";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 60;
const MAX_BODY_BYTES = 256 * 1024;

function pickManifestCandidate(payload: unknown): unknown {
  if (
    payload &&
    typeof payload === "object" &&
    !Array.isArray(payload) &&
    "manifest" in payload
  ) {
    return (payload as { manifest: unknown }).manifest;
  }
  return payload;
}

export async function POST(request: Request) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { success: false, error: originCheck.error },
      { status: originCheck.status ?? 403 }
    );
  }

  const rateLimit = checkRateLimit({
    namespace: "api:submit:validate",
    key: getRequestClientKey(request),
    limit: RATE_LIMIT_MAX_REQUESTS,
    windowMs: RATE_LIMIT_WINDOW_MS,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many validation requests. Please try again later.",
      },
      { status: 429, headers: createRateLimitHeaders(rateLimit) }
    );
  }

  const bodyResult = await parseJsonBodyWithLimit<unknown>(request, {
    maxBytes: MAX_BODY_BYTES,
    tooLargeMessage: "Manifest payload is too large.",
    invalidJsonMessage: "Invalid JSON body",
  });
  if (!bodyResult.ok) {
    return NextResponse.json(
      { success: false, error: bodyResult.error },
      { status: bodyResult.status }
    );
  }

  const manifestCandidate = pickManifestCandidate(bodyResult.data);
  const validation = validateStyleSubmissionManifest(manifestCandidate);
  if (!validation.ok) {
    return NextResponse.json(
      {
        success: false,
        error: "Manifest validation failed.",
        issues: validation.issues,
      },
      { status: 400 }
    );
  }

  const summary = getManifestSummary(validation.data);
  const warnings: string[] = [];
  if (!validation.data.assets.coverSvg.includes("<svg")) {
    warnings.push("coverSvg does not appear to contain an <svg> root element.");
  }
  if (validation.data.formData.aiRules.filter((value) => value.trim()).length === 0) {
    warnings.push("aiRules is empty. Add style guidance for better generation quality.");
  }

  return NextResponse.json({
    success: true,
    ok: true,
    summary,
    warnings,
  });
}
