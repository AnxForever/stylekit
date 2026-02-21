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
const MIN_MEANINGFUL_AI_RULES = 3;
const MIN_COMPONENT_SNIPPET_LENGTH = 24;
const REQUIRED_COMPONENT_FIELDS = ["buttonCode", "cardCode", "inputCode"] as const;
const EXTENDED_COMPONENT_FIELDS = ["navCode", "heroCode", "footerCode"] as const;
const MIN_EXTENDED_COMPONENTS_FOR_MANIFEST = 2;

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

function hasMeaningfulComponentSnippet(value: unknown): boolean {
  return typeof value === "string" && value.trim().length >= MIN_COMPONENT_SNIPPET_LENGTH;
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
  const meaningfulAiRules = validation.data.formData.aiRules.filter(
    (value) => value.trim().length > 0
  ).length;
  if (meaningfulAiRules < MIN_MEANINGFUL_AI_RULES) {
    warnings.push(
      `aiRules has ${meaningfulAiRules} non-empty entries; recommend at least ${MIN_MEANINGFUL_AI_RULES}.`
    );
  }

  const missingCoreComponents = REQUIRED_COMPONENT_FIELDS.filter(
    (field) => !hasMeaningfulComponentSnippet(validation.data.formData[field])
  );
  if (missingCoreComponents.length > 0) {
    warnings.push(
      `Missing core component snippets (${MIN_COMPONENT_SNIPPET_LENGTH}+ chars): ${missingCoreComponents.join(", ")}.`
    );
  }

  const providedExtendedComponents = EXTENDED_COMPONENT_FIELDS.filter((field) =>
    hasMeaningfulComponentSnippet(validation.data.formData[field])
  );
  if (providedExtendedComponents.length < MIN_EXTENDED_COMPONENTS_FOR_MANIFEST) {
    warnings.push(
      `Recommend at least ${MIN_EXTENDED_COMPONENTS_FOR_MANIFEST} extended components from navCode/heroCode/footerCode for stronger preview coverage.`
    );
  }

  return NextResponse.json({
    success: true,
    ok: true,
    summary,
    warnings,
  });
}
