import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { isIP } from "node:net";
import path from "path";
import { wizardFormSchema } from "@/lib/submit/validator";
import { convertToStyleTokens, convertToDesignStyle } from "@/lib/submit/converter";
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
const DB_NOT_READY_CODES = new Set(["42P01", "42703", "42883", "PGRST204", "PGRST205"]);

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

    const parsed = wizardFormSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
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

    const tokens = convertToStyleTokens(data);
    const designStyle = convertToDesignStyle(data);
    const authorName = user.user_metadata?.user_name ?? user.user_metadata?.full_name ?? "user";
    const authorAvatarUrl = user.user_metadata?.avatar_url ?? null;
    const authorProvider =
      user.user_metadata?.provider ?? user.app_metadata?.provider ?? "github";
    const formDataWithAuthor = {
      ...data,
      __author: {
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
