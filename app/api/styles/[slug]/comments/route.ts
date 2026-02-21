import { NextResponse } from "next/server";
import { z } from "zod";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";
import { getServerUser } from "@/lib/auth/supabase-server";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const COMMENTS_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const COMMENTS_RATE_LIMIT_MAX_REQUESTS = 40;
const MAX_BODY_BYTES = 8 * 1024;
const LEGACY_USER_SESSION_PREFIX = "user:";

const commentSchema = z.object({
  content: z.string().min(1).max(280),
});

const slugSchema = z.string().regex(SLUG_RE);
const DB_NOT_READY_CODES = new Set(["42P01", "42703", "42883", "PGRST204", "PGRST205"]);

interface DbErrorLike {
  code?: string | null;
  message?: string | null;
  details?: string | null;
}

function readDbErrorMessage(error: DbErrorLike | null | undefined): string {
  return `${error?.message ?? ""} ${error?.details ?? ""}`.toLowerCase();
}

function buildLegacyUserSessionId(userId: string): string {
  return `${LEGACY_USER_SESSION_PREFIX}${userId}`;
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

function shouldTryLegacyIdentity(
  error: DbErrorLike | null | undefined,
  requiredColumns: string[]
): boolean {
  if (!error) return false;

  const hasNoStructuredDetails = !error.code && !error.message && !error.details;
  if (hasNoStructuredDetails) {
    return true;
  }

  return requiredColumns.some((column) => isMissingColumnError(error, column));
}

function classifyDbError(error: DbErrorLike | null | undefined): {
  status: number;
  code: string;
  message: string;
} {
  const dbCode = error?.code ?? null;
  const combinedMessage = readDbErrorMessage(error);
  const hasSessionNullViolation =
    dbCode === "23502" && combinedMessage.includes("session_id");

  if (hasSessionNullViolation) {
    return {
      status: 503,
      code: "DB_SCHEMA_MISMATCH",
      message:
        "Comments schema is outdated. Apply Supabase migration 005 (session_id nullable).",
    };
  }

  if (dbCode && DB_NOT_READY_CODES.has(dbCode)) {
    return {
      status: 503,
      code: "DB_NOT_READY",
      message: "Comments database schema is not ready. Run Supabase migrations 002-005.",
    };
  }

  return {
    status: 500,
    code: "DB_WRITE_FAILED",
    message: "Failed to save comment.",
  };
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const slugParsed = slugSchema.safeParse(slug);
    if (!slugParsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid style slug" },
        { status: 400 }
      );
    }

    const originCheck = verifyTrustedOrigin(request);
    if (!originCheck.ok) {
      return NextResponse.json(
        { success: false, error: originCheck.error },
        { status: originCheck.status ?? 403 }
      );
    }

    const rateLimit = checkRateLimit({
      namespace: "api:style-comments",
      key: getRequestClientKey(request),
      limit: COMMENTS_RATE_LIMIT_MAX_REQUESTS,
      windowMs: COMMENTS_RATE_LIMIT_WINDOW_MS,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many comment requests. Please try again later." },
        { status: 429, headers: createRateLimitHeaders(rateLimit) }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { success: false, error: "Comments require database configuration" },
        { status: 503 }
      );
    }

    const user = await getServerUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Sign in to comment" },
        { status: 401 }
      );
    }

    const bodyResult = await parseJsonBodyWithLimit(request, {
      maxBytes: MAX_BODY_BYTES,
      tooLargeMessage: "Comment payload is too large.",
      invalidJsonMessage: "Invalid request",
    });
    if (!bodyResult.ok) {
      return NextResponse.json(
        { success: false, error: bodyResult.error },
        { status: bodyResult.status }
      );
    }

    const body = bodyResult.data;
    const parsed = commentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid comment. Max 280 characters." },
        { status: 400 }
      );
    }

    const { createClient } = await import("@supabase/supabase-js");
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? null;

    const authorName =
      user.user_metadata?.user_name ??
      user.user_metadata?.full_name ??
      "User";
    const avatarUrl = user.user_metadata?.avatar_url ?? null;
    const legacySessionId = buildLegacyUserSessionId(user.id);
    let useLegacyIdentity = false;

    // Rate limit: max 5 comments per identity per style per day
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const userScopedCount = await sb
      .from("style_comments")
      .select("*", { count: "exact", head: true })
      .eq("style_slug", slugParsed.data)
      .eq("user_id", user.id)
      .gte("created_at", oneDayAgo);
    let commentCount = userScopedCount.count ?? 0;
    if (userScopedCount.error) {
      const userCountError = userScopedCount.error as DbErrorLike;
      if (shouldTryLegacyIdentity(userCountError, ["user_id"])) {
        const legacyScopedCount = await sb
          .from("style_comments")
          .select("*", { count: "exact", head: true })
          .eq("style_slug", slugParsed.data)
          .in("session_id", [legacySessionId, user.id])
          .gte("created_at", oneDayAgo);
        if (legacyScopedCount.error) {
          const classified = classifyDbError(legacyScopedCount.error as DbErrorLike);
          return NextResponse.json(
            { success: false, code: classified.code, error: classified.message },
            { status: classified.status }
          );
        }
        useLegacyIdentity = true;
        commentCount = legacyScopedCount.count ?? 0;
      } else {
        const classified = classifyDbError(userCountError);
        return NextResponse.json(
          { success: false, code: classified.code, error: classified.message },
          { status: classified.status }
        );
      }
    }

    if (commentCount >= 5) {
      return NextResponse.json(
        { success: false, error: "Comment limit reached. Try again later." },
        { status: 429 }
      );
    }

    const modernInsertResult = await sb
      .from("style_comments")
      .insert({
        style_slug: slugParsed.data,
        content: parsed.data.content,
        author_name: authorName,
        session_id: null,
        user_id: user.id,
        avatar_url: avatarUrl,
        ip_address: ip,
      })
      .select("id, content, author_name, avatar_url, user_id, created_at")
      .single();
    if (!modernInsertResult.error) {
      return NextResponse.json({ success: true, comment: modernInsertResult.data });
    }

    const modernInsertError = modernInsertResult.error as DbErrorLike;
    if (!useLegacyIdentity && !shouldTryLegacyIdentity(modernInsertError, ["user_id", "avatar_url"])) {
      const classified = classifyDbError(modernInsertError);
      return NextResponse.json(
        { success: false, code: classified.code, error: classified.message },
        { status: classified.status }
      );
    }

    const legacyInsertResult = await sb
      .from("style_comments")
      .insert({
        style_slug: slugParsed.data,
        content: parsed.data.content,
        author_name: authorName,
        session_id: legacySessionId,
        ip_address: ip,
      })
      .select("id, content, author_name, created_at")
      .single();

    if (legacyInsertResult.error) {
      const classified = classifyDbError(legacyInsertResult.error as DbErrorLike);
      return NextResponse.json(
        { success: false, code: classified.code, error: classified.message },
        { status: classified.status }
      );
    }

    return NextResponse.json({
      success: true,
      comment: {
        ...legacyInsertResult.data,
        avatar_url: null,
        user_id: null,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const slugParsed = slugSchema.safeParse(slug);
  if (!slugParsed.success) {
    return NextResponse.json(
      { comments: [], total: 0, error: "Invalid style slug" },
      { status: 400 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ comments: [], total: 0 });
  }

  const { searchParams } = new URL(request.url);
  const limitParam = Number.parseInt(searchParams.get("limit") ?? "20", 10);
  const offsetParam = Number.parseInt(searchParams.get("offset") ?? "0", 10);
  const limit = Number.isFinite(limitParam)
    ? Math.min(Math.max(limitParam, 1), 50)
    : 20;
  const offset = Number.isFinite(offsetParam) ? Math.max(offsetParam, 0) : 0;

  const { createClient } = await import("@supabase/supabase-js");
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const modernListResult = await sb
    .from("style_comments")
    .select("id, content, author_name, avatar_url, user_id, created_at", { count: "exact" })
    .eq("style_slug", slugParsed.data)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);
  if (!modernListResult.error) {
    return NextResponse.json({
      comments: modernListResult.data ?? [],
      total: modernListResult.count ?? 0,
    });
  }

  const listError = modernListResult.error as DbErrorLike;
  if (!shouldTryLegacyIdentity(listError, ["user_id", "avatar_url"])) {
    const classified = classifyDbError(listError);
    return NextResponse.json(
      {
        comments: [],
        total: 0,
        code: classified.code,
        error: classified.message,
      },
      { status: classified.status }
    );
  }

  const legacyListResult = await sb
    .from("style_comments")
    .select("id, content, author_name, created_at", { count: "exact" })
    .eq("style_slug", slugParsed.data)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);
  if (legacyListResult.error) {
    const classified = classifyDbError(legacyListResult.error as DbErrorLike);
    return NextResponse.json(
      {
        comments: [],
        total: 0,
        code: classified.code,
        error: classified.message,
      },
      { status: classified.status }
    );
  }

  const comments = (legacyListResult.data ?? []).map((item) => ({
    ...item,
    avatar_url: null,
    user_id: null,
  }));

  return NextResponse.json({
    comments,
    total: legacyListResult.count ?? 0,
  });
}
