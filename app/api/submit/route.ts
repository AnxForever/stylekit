import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { isIP } from "node:net";
import path from "path";
import {
  wizardFormSchema,
  type ValidatedWizardFormData,
} from "@/lib/submit/validator";
import { convertToStyleTokens, convertToDesignStyle } from "@/lib/submit/converter";
import { validateStyleSubmissionManifest } from "@/lib/submit/manifest-validator";
import { getStyleBySlug } from "@/lib/styles";
import { hasActiveSubmissionSlug } from "@/lib/submit/reviewer";
import {
  isSupabaseConfigured,
  createSubmissionSupabase,
  hasActiveSubmissionSlugSupabase,
} from "@/lib/submit/reviewer-supabase";
import { getServerUser } from "@/lib/auth/supabase-server";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";

const SUBMISSIONS_DIR = path.join(process.cwd(), "data", "submissions");
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 15;
const MAX_BODY_BYTES = 128 * 1024;
const MIN_MEANINGFUL_AI_RULES = 3;
const MIN_COMPONENT_SNIPPET_LENGTH = 24;
const REQUIRED_COMPONENT_FIELDS = ["buttonCode", "cardCode", "inputCode"] as const;
const EXTENDED_COMPONENT_FIELDS = ["navCode", "heroCode", "footerCode"] as const;
const MIN_EXTENDED_COMPONENTS_FOR_MANIFEST = 2;
const DB_NOT_READY_CODES = new Set(["42P01", "42703", "42883", "PGRST204", "PGRST205"]);

type SubmissionPayloadSource = "wizard" | "manifest";

interface ParsedSubmitPayload {
  source: SubmissionPayloadSource;
  data: ValidatedWizardFormData;
  coverSvg: string | null;
}

interface DbErrorLike {
  code?: string | null;
  message?: string | null;
  details?: string | null;
}

function readDbErrorMessage(error: DbErrorLike | null | undefined): string {
  return `${error?.message ?? ""} ${error?.details ?? ""}`.toLowerCase();
}

function isMissingColumnError(
  error: DbErrorLike | null | undefined,
  column: string
): boolean {
  const code = error?.code ?? null;
  if (code !== "42703" && code !== "PGRST204") {
    return false;
  }
  return readDbErrorMessage(error).includes(column.toLowerCase());
}

function normalizeIpAddress(raw: string | null | undefined): string | null {
  if (!raw) return null;

  const first = raw.split(",")[0]?.trim();
  if (!first) return null;

  let candidate = first.replace(/^"(.+)"$/, "$1").trim();
  if (!candidate) return null;

  if (candidate.startsWith("[") && candidate.includes("]")) {
    const end = candidate.indexOf("]");
    const ipv6 = candidate.slice(1, end).trim();
    if (isIP(ipv6)) {
      return ipv6;
    }
    return null;
  }

  const ipv4WithPort = candidate.match(/^(\d{1,3}(?:\.\d{1,3}){3}):\d+$/);
  if (ipv4WithPort) {
    candidate = ipv4WithPort[1];
  }

  return isIP(candidate) ? candidate : null;
}

function getClientIpAddress(request: Request): string | null {
  return (
    normalizeIpAddress(request.headers.get("cf-connecting-ip")) ||
    normalizeIpAddress(request.headers.get("x-real-ip")) ||
    normalizeIpAddress(request.headers.get("x-forwarded-for")) ||
    null
  );
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  return value as Record<string, unknown>;
}

function asTrimmedString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function hasMeaningfulComponentSnippet(value: string | undefined): boolean {
  return Boolean(value && value.trim().length >= MIN_COMPONENT_SNIPPET_LENGTH);
}

function countMeaningfulList(values: string[]): number {
  return values.filter((value) => value.trim().length > 0).length;
}

function pickManifestCandidate(payload: unknown): unknown {
  const record = asRecord(payload);
  if (record && "manifest" in record) {
    return record.manifest;
  }
  return payload;
}

function isManifestPayload(payload: unknown): boolean {
  const root = asRecord(payload);
  if (!root) {
    return false;
  }

  if ("manifest" in root) {
    return true;
  }

  return "schemaVersion" in root && "formData" in root && "assets" in root;
}

function parseSubmitPayload(body: unknown):
  | { ok: true; value: ParsedSubmitPayload }
  | { ok: false; error: string; details: unknown } {
  if (isManifestPayload(body)) {
    const candidate = pickManifestCandidate(body);
    const parsedManifest = validateStyleSubmissionManifest(candidate);
    if (!parsedManifest.ok) {
      return {
        ok: false,
        error: "Manifest validation failed",
        details: parsedManifest.issues,
      };
    }

    return {
      ok: true,
      value: {
        source: "manifest",
        data: parsedManifest.data.formData,
        coverSvg: asTrimmedString(parsedManifest.data.assets.coverSvg),
      },
    };
  }

  const parsedWizard = wizardFormSchema.safeParse(body);
  if (!parsedWizard.success) {
    return {
      ok: false,
      error: "Validation failed",
      details: parsedWizard.error.flatten().fieldErrors,
    };
  }

  return {
    ok: true,
    value: {
      source: "wizard",
      data: parsedWizard.data,
      coverSvg: null,
    },
  };
}

function validateSubmissionQuality(
  data: ValidatedWizardFormData,
  source: SubmissionPayloadSource
): Record<string, string[]> | null {
  const issues: Record<string, string[]> = {};
  const aiRules = Array.isArray(data.aiRules) ? data.aiRules : [];

  const meaningfulAiRules = countMeaningfulList(aiRules);
  if (meaningfulAiRules < MIN_MEANINGFUL_AI_RULES) {
    issues.aiRules = [
      `Provide at least ${MIN_MEANINGFUL_AI_RULES} non-empty AI rules for consistent generation quality.`,
    ];
  }

  const missingRequiredComponents = REQUIRED_COMPONENT_FIELDS.filter(
    (field) => !hasMeaningfulComponentSnippet(data[field])
  );
  if (missingRequiredComponents.length > 0) {
    issues.components = [
      `Missing core component snippets: ${missingRequiredComponents.join(", ")}.`,
    ];
  }

  if (source === "manifest") {
    const providedExtended = EXTENDED_COMPONENT_FIELDS.filter((field) =>
      hasMeaningfulComponentSnippet(data[field])
    );
    if (providedExtended.length < MIN_EXTENDED_COMPONENTS_FOR_MANIFEST) {
      issues.componentCoverage = [
        `Manifest submissions must include at least ${MIN_EXTENDED_COMPONENTS_FOR_MANIFEST} of navCode, heroCode, footerCode.`,
      ];
    }
  }

  return Object.keys(issues).length > 0 ? issues : null;
}

function classifySubmissionError(error: unknown): {
  status: number;
  code: string;
  message: string;
} {
  const dbError = (error && typeof error === "object" ? error : {}) as DbErrorLike;
  const dbCode = dbError.code ?? null;

  if (isMissingColumnError(dbError, "user_id") || isMissingColumnError(dbError, "author_name")) {
    return {
      status: 503,
      code: "DB_SCHEMA_MISMATCH",
      message: "Submissions schema is outdated. Apply Supabase migration 003 (user binding).",
    };
  }

  if (dbCode && DB_NOT_READY_CODES.has(dbCode)) {
    return {
      status: 503,
      code: "DB_NOT_READY",
      message: "Submissions database schema is not ready. Run Supabase migrations 001-005.",
    };
  }

  return {
    status: 500,
    code: "SUBMISSION_WRITE_FAILED",
    message: "Failed to submit style.",
  };
}

export async function POST(request: Request) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      {
        success: false,
        error: originCheck.error,
      },
      { status: originCheck.status ?? 403 }
    );
  }

  const rateLimit = checkRateLimit({
    namespace: "api:submit",
    key: getRequestClientKey(request),
    limit: RATE_LIMIT_MAX_REQUESTS,
    windowMs: RATE_LIMIT_WINDOW_MS,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: "Too many submissions from this client. Please try again later.",
      },
      { status: 429, headers: createRateLimitHeaders(rateLimit) }
    );
  }

  try {
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Sign in to submit styles" },
        { status: 401 }
      );
    }

    const bodyResult = await parseJsonBodyWithLimit(request, {
      maxBytes: MAX_BODY_BYTES,
      tooLargeMessage: "Submission payload is too large.",
      invalidJsonMessage: "Invalid JSON body",
    });
    if (!bodyResult.ok) {
      return NextResponse.json(
        { success: false, error: bodyResult.error },
        { status: bodyResult.status }
      );
    }

    const body = bodyResult.data;

    const parsed = parseSubmitPayload(body);
    if (!parsed.ok) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error,
          details: parsed.details,
        },
        { status: 400 }
      );
    }

    const { data, source, coverSvg } = parsed.value;
    const normalizedSlug = data.slug.trim().toLowerCase();
    if (getStyleBySlug(normalizedSlug)) {
      return NextResponse.json(
        { success: false, error: "This slug is already used by a built-in style." },
        { status: 409 }
      );
    }

    const useSupabase = isSupabaseConfigured();
    const hasConflict = useSupabase
      ? await hasActiveSubmissionSlugSupabase(normalizedSlug)
      : await hasActiveSubmissionSlug(normalizedSlug);
    if (hasConflict) {
      return NextResponse.json(
        { success: false, error: "This slug is already pending review or approved." },
        { status: 409 }
      );
    }

    const qualityIssues = validateSubmissionQuality(data, source);
    if (qualityIssues) {
      return NextResponse.json(
        {
          success: false,
          error: "Submission quality validation failed",
          details: qualityIssues,
        },
        { status: 400 }
      );
    }

    const tokens = convertToStyleTokens(data);
    const designStyle = convertToDesignStyle(data);
    const authorName = user.user_metadata?.user_name ?? user.user_metadata?.full_name ?? "user";
    const authorAvatarUrl = user.user_metadata?.avatar_url ?? null;
    const authorProvider =
      user.user_metadata?.provider ?? user.app_metadata?.provider ?? "github";
    const formDataWithAuthor = {
      ...data,
      ...(coverSvg
        ? {
            __assets: {
              coverSvg,
            },
          }
        : {}),
      __author: {
        userId: user.id,
        handle: authorName,
        avatarUrl: authorAvatarUrl,
        provider: authorProvider,
      },
    };

    // Use Supabase when configured, otherwise fall back to file system
    if (useSupabase) {
      const ip = getClientIpAddress(request);
      const result = await createSubmissionSupabase(
        normalizedSlug,
        formDataWithAuthor as unknown as Record<string, unknown>,
        tokens as unknown as Record<string, unknown>,
        designStyle as unknown as Record<string, unknown>,
        ip,
        user.id,
        authorName,
        authorAvatarUrl,
        authorProvider
      );
      return NextResponse.json({
        success: true,
        id: result.id,
        slug: result.slug,
      });
    }

    // File-based fallback
    const timestamp = Date.now();
    const id = `${timestamp}-${normalizedSlug}`;

    const submission = {
      id,
      slug: normalizedSlug,
      submittedAt: new Date(timestamp).toISOString(),
      status: "pending" as const,
      userId: user.id,
      authorName,
      formData: formDataWithAuthor,
      tokens,
      designStyle,
    };

    if (!existsSync(SUBMISSIONS_DIR)) {
      await mkdir(SUBMISSIONS_DIR, { recursive: true });
    }

    const filePath = path.join(SUBMISSIONS_DIR, `${id}.json`);
    await writeFile(filePath, JSON.stringify(submission, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      id,
      slug: normalizedSlug,
    });
  } catch (error) {
    const classified = classifySubmissionError(error);
    return NextResponse.json(
      {
        success: false,
        code: classified.code,
        error: classified.message,
      },
      { status: classified.status }
    );
  }
}
