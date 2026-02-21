import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
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
      const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? null;
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
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
