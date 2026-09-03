import { NextResponse } from "next/server";

import {
  MAX_REPORT_DETAIL_LENGTH,
  createCommunityReport,
  isReportReason,
} from "@/lib/community/moderation";
import { getServerUser } from "@/lib/auth/supabase-server";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";

/**
 * Report a community style.
 *
 * Open to signed-out visitors on purpose: someone who recognises their own work
 * in a submission should be able to say so without making an account first. The
 * rate limit is what bounds abuse, and a report only ever queues a human
 * review — it never changes what readers see on its own.
 */
const REPORT_WINDOW_MS = 60 * 60 * 1000;
const REPORT_MAX_REQUESTS = 10;
const MAX_BODY_BYTES = 4 * 1024;

export async function POST(request: Request) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { success: false, error: originCheck.error },
      { status: originCheck.status ?? 403 },
    );
  }

  const rateLimit = checkRateLimit({
    namespace: "api:community-report",
    key: getRequestClientKey(request),
    limit: REPORT_MAX_REQUESTS,
    windowMs: REPORT_WINDOW_MS,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many reports. Try again later." },
      { status: 429, headers: createRateLimitHeaders(rateLimit) },
    );
  }

  const body = await parseJsonBodyWithLimit<{
    slug?: unknown;
    reason?: unknown;
    detail?: unknown;
  }>(request, {
    maxBytes: MAX_BODY_BYTES,
    tooLargeMessage: "Report is too long.",
    invalidJsonMessage: "Could not parse the report.",
  });
  if (!body.ok) {
    return NextResponse.json({ success: false, error: body.error }, { status: body.status });
  }

  const slug = typeof body.data?.slug === "string" ? body.data.slug.trim() : "";
  if (!slug) {
    return NextResponse.json(
      { success: false, error: "A style slug is required." },
      { status: 400 },
    );
  }

  if (!isReportReason(body.data?.reason)) {
    return NextResponse.json(
      { success: false, error: "Choose a valid reason." },
      { status: 400 },
    );
  }

  const detail =
    typeof body.data?.detail === "string"
      ? body.data.detail.slice(0, MAX_REPORT_DETAIL_LENGTH)
      : null;

  // Attributing a report when we can helps triage; it is never required.
  const user = await getServerUser().catch(() => null);

  const result = await createCommunityReport({
    slug,
    reason: body.data.reason,
    detail,
    reporterId: user?.id ?? null,
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        success: false,
        error:
          result.reason === "not-found"
            ? "That community style does not exist."
            : "Could not file the report.",
      },
      { status: result.reason === "not-found" ? 404 : 500 },
    );
  }

  return NextResponse.json(
    { success: true },
    { headers: createRateLimitHeaders(rateLimit) },
  );
}
