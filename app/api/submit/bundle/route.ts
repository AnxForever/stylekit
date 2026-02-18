import { NextResponse } from "next/server";
import JSZip from "jszip";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { validateStyleSubmissionManifest } from "@/lib/submit/manifest-validator";
import {
  buildSubmissionBundleFiles,
  createSubmissionBundleFilename,
} from "@/lib/submit/submission-bundle";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 30;
const MAX_BODY_BYTES = 512 * 1024;

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
    namespace: "api:submit:bundle",
    key: getRequestClientKey(request),
    limit: RATE_LIMIT_MAX_REQUESTS,
    windowMs: RATE_LIMIT_WINDOW_MS,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many bundle requests. Please try again later.",
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

  try {
    const files = buildSubmissionBundleFiles(validation.data);
    const zip = new JSZip();
    for (const file of files) {
      zip.file(file.name, file.content);
    }
    const archive = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });
    const filename = createSubmissionBundleFilename(validation.data.formData.slug);

    return new NextResponse(archive, {
      status: 200,
      headers: {
        "content-type": "application/zip",
        "content-disposition": `attachment; filename="${filename}"`,
        "cache-control": "no-store",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `Failed to build submission bundle: ${(error as Error).message}`,
      },
      { status: 500 }
    );
  }
}
