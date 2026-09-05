/**
 * Prefill a submission by extracting a live site's design.
 *
 * The headless browser cannot run on this host, so this route is a guarded
 * proxy to the extraction service: it authenticates the caller, rate-limits,
 * re-checks the URL for SSRF (defence in depth — never trust that the
 * downstream did it), then forwards to the service and returns the manifest for
 * the submit form to prefill. The service is the authority on extraction; this
 * route is the authority on who may ask and how often.
 */

import { NextResponse } from "next/server";

import { getServerUser } from "@/lib/auth/supabase-server";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { assertSafeUrl } from "@/lib/security/ssrf";

/** Extraction is expensive (a real browser); keep the per-caller budget tight. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 15;
const MAX_BODY_BYTES = 4 * 1024;
const FORWARD_TIMEOUT_MS = 90_000;

export async function POST(request: Request) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { success: false, error: originCheck.error },
      { status: originCheck.status ?? 403 },
    );
  }

  const user = await getServerUser();
  if (!user) {
    return NextResponse.json(
      { success: false, error: "Sign in to extract a style." },
      { status: 401 },
    );
  }

  const rateLimit = checkRateLimit({
    namespace: "api:submit-extract",
    key: getRequestClientKey(request),
    limit: MAX_REQUESTS,
    windowMs: WINDOW_MS,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: "Extraction limit reached. Try again later." },
      { status: 429, headers: createRateLimitHeaders(rateLimit) },
    );
  }

  const SERVICE_URL = process.env.EXTRACT_SERVICE_URL;
  const SERVICE_TOKEN = process.env.EXTRACT_TOKEN;
  if (!SERVICE_URL || !SERVICE_TOKEN) {
    return NextResponse.json(
      { success: false, error: "URL extraction is not configured." },
      { status: 503 },
    );
  }

  const body = await parseJsonBodyWithLimit<{ url?: unknown; options?: unknown }>(request, {
    maxBytes: MAX_BODY_BYTES,
    tooLargeMessage: "Request too large.",
    invalidJsonMessage: "Could not parse the request.",
  });
  if (!body.ok) {
    return NextResponse.json({ success: false, error: body.error }, { status: body.status });
  }

  const url = body.data?.url;
  if (typeof url !== "string" || !url) {
    return NextResponse.json(
      { success: false, error: "A URL is required." },
      { status: 400 },
    );
  }

  // Defence in depth: reject internal/metadata targets here too, before we
  // ever hand the URL to a browser-driving service.
  const safe = await assertSafeUrl(url);
  if (!safe.ok) {
    return NextResponse.json(
      { success: false, error: "That URL can't be extracted (must be a public http(s) site)." },
      { status: 400 },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FORWARD_TIMEOUT_MS);
  try {
    const response = await fetch(SERVICE_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${SERVICE_TOKEN}`,
      },
      body: JSON.stringify({ url: safe.url, options: body.data?.options }),
      signal: controller.signal,
    });

    const payload = await response.json().catch(() => null);
    if (!response.ok || !payload) {
      // 503 (busy/low-memory) is transient; surface it as retryable.
      const status = response.status === 503 ? 503 : 502;
      return NextResponse.json(
        {
          success: false,
          error:
            response.status === 503
              ? "The extractor is busy. Try again in a moment."
              : "Extraction failed. Fill the form in by hand, or try another URL.",
        },
        { status },
      );
    }

    return NextResponse.json({
      success: true,
      manifest: payload.manifest,
      needsReview: payload.needsReview ?? [],
    });
  } catch (error) {
    const aborted = error instanceof Error && error.name === "AbortError";
    return NextResponse.json(
      {
        success: false,
        error: aborted
          ? "Extraction timed out. Try a simpler page or fill the form in by hand."
          : "Could not reach the extraction service.",
      },
      { status: aborted ? 504 : 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
