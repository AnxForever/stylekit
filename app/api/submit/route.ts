/**
 * Accept a style submission.
 *
 * Requires a signed-in account and a manifest that clears every blocking gate.
 * The gates run here too, not just in `/api/submit/validate`: a client could
 * skip the dry run entirely, so acceptance has to be decided server-side at the
 * moment of the write.
 */

import { NextResponse } from "next/server";

import {
  MAX_MANIFEST_BYTES,
  blockingFailures,
  deriveDesignStyle,
  deriveStyleTokens,
  isSlugTaken,
  runGates,
} from "@/lib/submission";
import { getServerUser } from "@/lib/auth/supabase-server";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import {
  createSubmissionSupabase,
  isSupabaseConfigured,
} from "@/lib/submit/reviewer-supabase";
import { validateStyleSubmissionManifest } from "@/lib/submit/manifest-validator";

/** Deliberately tight: a real contributor submits a handful of styles, not dozens. */
const SUBMIT_WINDOW_MS = 60 * 60 * 1000;
const SUBMIT_MAX_REQUESTS = 10;

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
      { success: false, error: "Sign in to submit a style." },
      { status: 401 },
    );
  }

  const rateLimit = checkRateLimit({
    namespace: "api:submit",
    key: getRequestClientKey(request),
    limit: SUBMIT_MAX_REQUESTS,
    windowMs: SUBMIT_WINDOW_MS,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: "Submission limit reached. Try again later." },
      { status: 429, headers: createRateLimitHeaders(rateLimit) },
    );
  }

  const body = await parseJsonBodyWithLimit<{
    manifest?: unknown;
    acceptedTerms?: unknown;
  }>(request, {
    maxBytes: MAX_MANIFEST_BYTES,
    tooLargeMessage: "Manifest is too large. Trim component code or the cover SVG.",
    invalidJsonMessage: "Could not parse the manifest as JSON.",
  });
  if (!body.ok) {
    return NextResponse.json({ success: false, error: body.error }, { status: body.status });
  }

  if (body.data?.acceptedTerms !== true) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Confirm the work is yours to share and that you accept the contribution terms.",
      },
      { status: 400 },
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { success: false, error: "Submissions require database configuration." },
      { status: 503 },
    );
  }

  const manifest = body.data?.manifest;

  let report;
  try {
    report = await runGates("style", manifest, { slugTaken: await isSlugTaken(manifest) });
  } catch {
    return NextResponse.json(
      { success: false, error: "Could not validate the manifest." },
      { status: 500 },
    );
  }

  if (!report.accepted) {
    return NextResponse.json(
      {
        success: false,
        error: "The manifest did not pass every required check.",
        report,
        failures: blockingFailures(report),
      },
      { status: 422 },
    );
  }

  // The gate report proves the schema parsed, so this cannot fail.
  const parsed = validateStyleSubmissionManifest(manifest);
  if (!parsed.ok) {
    return NextResponse.json(
      { success: false, error: "Could not validate the manifest." },
      { status: 500 },
    );
  }

  const form = parsed.data.formData;
  const metadata = user.user_metadata ?? {};
  const authorName =
    (metadata.user_name as string | undefined) ??
    (metadata.full_name as string | undefined) ??
    "contributor";

  try {
    const created = await createSubmissionSupabase(
      form.slug,
      {
        ...form,
        __assets: { coverSvg: parsed.data.assets.coverSvg },
        __source: parsed.data.source,
        __selfCheck: parsed.data.selfCheck,
        __gateReport: report,
      },
      deriveStyleTokens(form) as unknown as Record<string, unknown>,
      deriveDesignStyle(form, parsed.data.assets.coverSvg) as unknown as Record<
        string,
        unknown
      >,
      request.headers.get("x-forwarded-for")?.split(",")[0] ?? null,
      user.id,
      authorName,
      (metadata.avatar_url as string | undefined) ?? null,
      (metadata.provider as string | undefined) ??
        (user.app_metadata?.provider as string | undefined) ??
        null,
    );

    return NextResponse.json({
      success: true,
      submission: { id: created.id, slug: created.slug },
      report,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Could not save the submission." },
      { status: 500 },
    );
  }
}
