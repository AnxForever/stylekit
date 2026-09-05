/**
 * Report whether a style slug is free, so the submission form can tell a
 * contributor before they finish filling it in — not only after the dry run.
 *
 * GET with `?slug=`. No auth: the answer only reveals whether a public slug is
 * already a curated style or has a submission in flight, which the catalog and
 * the dry-run gate already expose. Rate limited to keep it from being used to
 * enumerate the submission table.
 */

import { NextResponse } from "next/server";

import { isSlugTakenBySlug } from "@/lib/submission";
import { getStyleBySlug } from "@/lib/styles/registry";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SLUG_MAX_LENGTH = 80;

const LOOKUP_WINDOW_MS = 10 * 60 * 1000;
const LOOKUP_MAX_REQUESTS = 120;

type Reason = "available" | "curated" | "pending" | "invalid";

export async function GET(request: Request) {
  const rateLimit = checkRateLimit({
    namespace: "api:submit-slug",
    key: getRequestClientKey(request),
    limit: LOOKUP_MAX_REQUESTS,
    windowMs: LOOKUP_WINDOW_MS,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many lookups. Try again shortly." },
      { status: 429, headers: createRateLimitHeaders(rateLimit) },
    );
  }

  const raw = new URL(request.url).searchParams.get("slug") ?? "";
  const slug = raw.trim().toLowerCase();

  if (!slug || slug.length > SLUG_MAX_LENGTH || !SLUG_RE.test(slug)) {
    return NextResponse.json({
      success: true,
      slug,
      available: false,
      reason: "invalid" satisfies Reason,
    });
  }

  if (getStyleBySlug(slug)) {
    return NextResponse.json({
      success: true,
      slug,
      available: false,
      reason: "curated" satisfies Reason,
    });
  }

  // A lookup failure resolves to "not taken" so a database hiccup never blocks
  // the form; the submit-time gate is the authority and re-checks on write.
  const taken = await isSlugTakenBySlug(slug);

  return NextResponse.json({
    success: true,
    slug,
    available: !taken,
    reason: (taken ? "pending" : "available") satisfies Reason,
  });
}
