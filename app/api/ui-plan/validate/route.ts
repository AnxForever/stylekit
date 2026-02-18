import { validateUIPlan } from "@/lib/schema/validator";
import { NextResponse } from "next/server";
import type { UIPlan } from "@/lib/schema/ui-plan";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 120;
const MAX_BODY_BYTES = 256 * 1024;

export async function POST(request: Request) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { error: originCheck.error },
      { status: originCheck.status ?? 403 }
    );
  }

  const rateLimit = checkRateLimit({
    namespace: "api:ui-plan-validate",
    key: getRequestClientKey(request),
    limit: RATE_LIMIT_MAX_REQUESTS,
    windowMs: RATE_LIMIT_WINDOW_MS,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many validation requests. Please try again later." },
      { status: 429, headers: createRateLimitHeaders(rateLimit) }
    );
  }

  try {
    const bodyResult = await parseJsonBodyWithLimit<UIPlan>(request, {
      maxBytes: MAX_BODY_BYTES,
      tooLargeMessage: "Validation payload is too large.",
      invalidJsonMessage: "Invalid JSON format",
    });
    if (!bodyResult.ok) {
      return NextResponse.json(
        { error: bodyResult.error },
        { status: bodyResult.status }
      );
    }

    const plan = bodyResult.data;
    const validation = validateUIPlan(plan);

    return NextResponse.json({
      valid: validation.valid,
      errors: validation.errors,
      warnings: validation.warnings,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON format" },
      { status: 400 }
    );
  }
}
