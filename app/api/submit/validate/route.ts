/**
 * Dry-run the submission gates without writing anything.
 *
 * The submit form calls this on every paste so a contributor sees exactly which
 * gates block them before they spend a login on it. No auth required: the reply
 * only judges content the caller already holds.
 */

import { NextResponse } from "next/server";

import { MAX_MANIFEST_BYTES, isSlugTaken, runGates } from "@/lib/submission";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";

const VALIDATE_WINDOW_MS = 10 * 60 * 1000;
const VALIDATE_MAX_REQUESTS = 60;

export async function POST(request: Request) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { success: false, error: originCheck.error },
      { status: originCheck.status ?? 403 },
    );
  }

  const rateLimit = checkRateLimit({
    namespace: "api:submit-validate",
    key: getRequestClientKey(request),
    limit: VALIDATE_MAX_REQUESTS,
    windowMs: VALIDATE_WINDOW_MS,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many validation requests. Try again shortly." },
      { status: 429, headers: createRateLimitHeaders(rateLimit) },
    );
  }

  const body = await parseJsonBodyWithLimit<{ manifest?: unknown }>(request, {
    maxBytes: MAX_MANIFEST_BYTES,
    tooLargeMessage: "Manifest is too large. Trim component code or the cover SVG.",
    invalidJsonMessage: "Could not parse the manifest as JSON.",
  });
  if (!body.ok) {
    return NextResponse.json({ success: false, error: body.error }, { status: body.status });
  }

  // Accept both `{ manifest: {...} }` and a bare manifest, because a contributor
  // pasting straight from an assistant has the bare form in hand.
  const manifest = body.data?.manifest ?? body.data;

  try {
    const report = await runGates("style", manifest, {
      slugTaken: await isSlugTaken(manifest),
    });
    return NextResponse.json({ success: true, report });
  } catch {
    return NextResponse.json(
      { success: false, error: "Could not validate the manifest." },
      { status: 500 },
    );
  }
}
