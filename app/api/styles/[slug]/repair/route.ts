import { NextResponse } from "next/server";
import { z } from "zod";

import { resolveStyleDelivery } from "@/lib/style-delivery";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { repairCodeWithRules } from "@/lib/styles/style-repair";
import { mergeRulesFromTokens } from "@/lib/styles/style-linter";

const MAX_BODY_BYTES = 128 * 1024;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 60;

const repairRequestSchema = z.object({
  /** JSX/TSX, HTML, or a bare class list. */
  code: z.string().min(1).max(MAX_BODY_BYTES),
});

/**
 * Repairs pasted code against a style's rules and returns the fixed source.
 *
 * Stateless on purpose: nothing is stored, so the endpoint can be called from
 * the site, from a coding agent, or by hand with curl. `unfixed` keeps the
 * promise honest — a caller can see what the rules flagged but no rewrite
 * could resolve.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json({ error: originCheck.error }, { status: originCheck.status ?? 403 });
  }

  const rateLimit = checkRateLimit({
    namespace: "api:styles-repair",
    key: getRequestClientKey(request),
    limit: RATE_LIMIT_MAX_REQUESTS,
    windowMs: RATE_LIMIT_WINDOW_MS,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many repair requests. Please try again later." },
      { status: 429, headers: createRateLimitHeaders(rateLimit) },
    );
  }

  const { slug } = await params;
  const delivery = await resolveStyleDelivery(slug);
  if (!delivery) return NextResponse.json({ error: "Style not found" }, { status: 404 });

  const body = await parseJsonBodyWithLimit<unknown>(request, {
    maxBytes: MAX_BODY_BYTES,
    tooLargeMessage: "Code payload is too large.",
    invalidJsonMessage: "Invalid JSON body.",
  });
  if (!body.ok) return NextResponse.json({ error: body.error }, { status: body.status });

  const parsed = repairRequestSchema.safeParse(body.data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "A non-empty `code` string is required.", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  // Same two inputs the published brief merges: the style's own tokens, plus
  // the curated rules when the style is one of the registry's own. Community
  // styles have no curated rules, so they are checked against their tokens only.
  const rules = mergeRulesFromTokens(
    delivery.capabilities.tokens ?? undefined,
    delivery.source === "community" ? undefined : slug,
  );
  const result = repairCodeWithRules(slug, parsed.data.code, rules);

  return NextResponse.json(
    {
      slug: result.slug,
      code: result.code,
      edits: result.edits,
      unfixed: result.unfixed,
      before: result.before,
      report: result.report,
    },
    { headers: createRateLimitHeaders(rateLimit) },
  );
}
