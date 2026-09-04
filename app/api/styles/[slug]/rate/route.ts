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
const RATING_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATING_RATE_LIMIT_MAX_REQUESTS = 80;
const MAX_BODY_BYTES = 4 * 1024;
const LEGACY_USER_SESSION_PREFIX = "user:";

const rateSchema = z.object({
  rating: z.number().int().min(1).max(5),
});

const slugSchema = z.string().regex(SLUG_RE);
const DB_NOT_READY_CODES = new Set(["42P01", "42703", "42883", "PGRST204", "PGRST205"]);

interface DbErrorLike {
  code?: string | null;
  message?: string | null;
  details?: string | null;
}

interface UserRatingRow {
  rating?: number | null;
  created_at?: string | null;
}

interface UserRatingQueryResult {
  data: unknown[] | null;
  error: DbErrorLike | null;
}

interface UserRatingQueryBuilder {
  eq: (column: string, value: string) => UserRatingQueryBuilder;
  in: (column: string, values: string[]) => UserRatingQueryBuilder;
  order: (
    column: string,
    options: { ascending: boolean }
  ) => UserRatingQueryBuilder;
  limit: (count: number) => Promise<UserRatingQueryResult>;
}

interface UserRatingClient {
  from: (tableName: string) => {
    select: (columns: string) => UserRatingQueryBuilder;
  };
}

function readDbErrorMessage(error: DbErrorLike | null | undefined): string {
  return `${error?.message ?? ""} ${error?.details ?? ""}`.toLowerCase();
}

function buildLegacyUserSessionId(userId: string): string {
  return `${LEGACY_USER_SESSION_PREFIX}${userId}`;
}

function isMissingUserIdColumnError(error: DbErrorLike | null | undefined): boolean {
  const code = error?.code ?? null;
  if (code !== "42703" && code !== "PGRST204") {
    return false;
  }
  return readDbErrorMessage(error).includes("user_id");
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
        "Ratings schema is outdated. Apply Supabase migration 005 (session_id nullable).",
    };
  }

  if (dbCode && DB_NOT_READY_CODES.has(dbCode)) {
    return {
      status: 503,
      code: "DB_NOT_READY",
      message: "Ratings database schema is not ready. Run Supabase migrations 002-005.",
    };
  }

  return {
    status: 500,
    code: "DB_WRITE_FAILED",
    message: "Failed to save rating.",
  };
}

function normalizeRatingValue(value: unknown): number | null {
  if (typeof value !== "number") {
    return null;
  }
  if (!Number.isInteger(value) || value < 1 || value > 5) {
    return null;
  }
  return value;
}

function selectLatestUserRating(
  modern: UserRatingRow | null | undefined,
  legacy: UserRatingRow | null | undefined
): number | null {
  const modernRating = normalizeRatingValue(modern?.rating);
  const legacyRating = normalizeRatingValue(legacy?.rating);
  if (modernRating == null && legacyRating == null) {
    return null;
  }
  if (modernRating != null && legacyRating == null) {
    return modernRating;
  }
  if (modernRating == null && legacyRating != null) {
    return legacyRating;
  }

  const modernAt = typeof modern?.created_at === "string" ? modern.created_at : "";
  const legacyAt = typeof legacy?.created_at === "string" ? legacy.created_at : "";
  return modernAt >= legacyAt ? modernRating : legacyRating;
}

async function loadUserRatingForStyle(
  sb: UserRatingClient,
  slug: string,
  userId: string
): Promise<number | null> {
  const modernLookup = await sb
    .from("style_ratings")
    .select("rating, created_at")
    .eq("style_slug", slug)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1);

  if (modernLookup.error && !isMissingUserIdColumnError(modernLookup.error as DbErrorLike)) {
    return null;
  }

  const legacyLookup = await sb
    .from("style_ratings")
    .select("rating, created_at")
    .eq("style_slug", slug)
    .in("session_id", [buildLegacyUserSessionId(userId), userId])
    .order("created_at", { ascending: false })
    .limit(1);

  if (legacyLookup.error && modernLookup.error) {
    return null;
  }

  const modernRow =
    Array.isArray(modernLookup.data) && modernLookup.data.length > 0
      ? (modernLookup.data[0] as UserRatingRow)
      : null;
  const legacyRow =
    Array.isArray(legacyLookup.data) && legacyLookup.data.length > 0
      ? (legacyLookup.data[0] as UserRatingRow)
      : null;

  return selectLatestUserRating(modernRow, legacyRow);
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

    // Ratings require authentication
    const user = await getServerUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Sign in to rate styles" },
        { status: 401 }
      );
    }

    const rateLimit = checkRateLimit({
      namespace: "api:style-ratings",
      key: getRequestClientKey(request),
      limit: RATING_RATE_LIMIT_MAX_REQUESTS,
      windowMs: RATING_RATE_LIMIT_WINDOW_MS,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many rating requests. Please try again later." },
        { status: 429, headers: createRateLimitHeaders(rateLimit) }
      );
    }

    const bodyResult = await parseJsonBodyWithLimit(request, {
      maxBytes: MAX_BODY_BYTES,
      tooLargeMessage: "Rating payload is too large.",
      invalidJsonMessage: "Invalid request",
    });
    if (!bodyResult.ok) {
      return NextResponse.json(
        { success: false, error: bodyResult.error },
        { status: bodyResult.status }
      );
    }

    const body = bodyResult.data;
    const parsed = rateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid rating. Must be 1-5." },
        { status: 400 }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { success: false, error: "Ratings require database configuration" },
        { status: 503 }
      );
    }

    const { createClient } = await import("@supabase/supabase-js");
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? null;
    const legacySessionId = buildLegacyUserSessionId(user.id);
    let useLegacySessionIdentity = false;

    const lookupByUserId = await sb
      .from("style_ratings")
      .select("id")
      .eq("style_slug", slugParsed.data)
      .eq("user_id", user.id)
      .maybeSingle();
    let existing = lookupByUserId.data;
    if (lookupByUserId.error) {
      const lookupError = lookupByUserId.error as DbErrorLike;
      if (isMissingUserIdColumnError(lookupError)) {
        useLegacySessionIdentity = true;
        const legacyLookup = await sb
          .from("style_ratings")
          .select("id")
          .eq("style_slug", slugParsed.data)
          .in("session_id", [legacySessionId, user.id])
          .maybeSingle();
        if (legacyLookup.error) {
          const classified = classifyDbError(legacyLookup.error as DbErrorLike);
          return NextResponse.json(
            { success: false, code: classified.code, error: classified.message },
            { status: classified.status }
          );
        }
        existing = legacyLookup.data;
      } else {
        const classified = classifyDbError(lookupError);
        return NextResponse.json(
          { success: false, code: classified.code, error: classified.message },
          { status: classified.status }
        );
      }
    }

    if (existing) {
      // Update existing rating
      const { error } = await sb
        .from("style_ratings")
        .update({ rating: parsed.data.rating, ip_address: ip })
        .eq("id", existing.id);

      if (error) {
        const classified = classifyDbError(error as DbErrorLike);
        return NextResponse.json(
          { success: false, code: classified.code, error: classified.message },
          { status: classified.status }
        );
      }
    } else {
      // Insert new rating
      // One row shape for both identities. Branching the object literal made
      // the two arms structurally different, and newer supabase-js typings
      // reject the resulting union at the insert call.
      const insertResult = await sb.from("style_ratings").insert({
        style_slug: slugParsed.data,
        rating: parsed.data.rating,
        session_id: useLegacySessionIdentity ? legacySessionId : null,
        user_id: useLegacySessionIdentity ? null : user.id,
        ip_address: ip,
      });
      const { error } = insertResult;

      if (error) {
        const classified = classifyDbError(error as DbErrorLike);
        return NextResponse.json(
          { success: false, code: classified.code, error: classified.message },
          { status: classified.status }
        );
      }
    }

    // Return updated average
    const { data: summary, error: summaryError } = await sb
      .from("style_rating_summary")
      .select("*")
      .eq("style_slug", slugParsed.data)
      .maybeSingle();
    if (summaryError) {
      const classified = classifyDbError(summaryError as DbErrorLike);
      return NextResponse.json(
        {
          success: false,
          code: classified.code,
          error: classified.message,
        },
        { status: classified.status }
      );
    }

    return NextResponse.json({
      success: true,
      averageRating: summary?.average_rating ?? parsed.data.rating,
      totalRatings: summary?.total_ratings ?? 1,
      userRating: parsed.data.rating,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const slugParsed = slugSchema.safeParse(slug);
  if (!slugParsed.success) {
    return NextResponse.json(
      { averageRating: 0, totalRatings: 0, error: "Invalid style slug" },
      { status: 400 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ averageRating: 0, totalRatings: 0, userRating: null });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data, error } = await sb
    .from("style_rating_summary")
    .select("*")
    .eq("style_slug", slugParsed.data)
    .maybeSingle();
  if (error) {
    const classified = classifyDbError(error as DbErrorLike);
    return NextResponse.json(
      {
        averageRating: 0,
        totalRatings: 0,
        userRating: null,
        code: classified.code,
        error: classified.message,
      },
      { status: classified.status }
    );
  }

  let userRating: number | null = null;
  try {
    const user = await getServerUser();
    if (user?.id) {
      userRating = await loadUserRatingForStyle(
        sb as unknown as UserRatingClient,
        slugParsed.data,
        user.id
      );
    }
  } catch {
    userRating = null;
  }

  return NextResponse.json({
    averageRating: data?.average_rating ?? 0,
    totalRatings: data?.total_ratings ?? 0,
    userRating,
  });
}
