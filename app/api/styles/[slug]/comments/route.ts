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

const commentSchema = z.object({
  content: z.string().min(1).max(280),
  authorName: z.string().min(1).max(50).default("Anonymous"),
  sessionId: z.string().min(1).max(128).optional(),
});

const slugSchema = z.string().regex(SLUG_RE);

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

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { success: false, error: "Comments require database configuration" },
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

    // Detect authenticated user
    const user = await getServerUser();
    const userId = user?.id ?? null;
    const userMeta = user?.user_metadata;
    const authorName = userId
      ? (userMeta?.user_name ?? userMeta?.full_name ?? "User")
      : parsed.data.authorName;
    const avatarUrl = userId ? (userMeta?.avatar_url ?? null) : null;
    const sessionId = userId ? null : (parsed.data.sessionId ?? null);

    // Anonymous comments require sessionId
    if (!userId && !sessionId) {
      return NextResponse.json(
        { success: false, error: "sessionId is required for anonymous comments" },
        { status: 400 }
      );
    }

    // Rate limit: max 5 comments per identity per style per day
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    let countQuery = sb
      .from("style_comments")
      .select("*", { count: "exact", head: true })
      .eq("style_slug", slugParsed.data)
      .gte("created_at", oneDayAgo);

    if (userId) {
      countQuery = countQuery.eq("user_id", userId);
    } else {
      countQuery = countQuery.eq("session_id", sessionId!);
    }

    const { count } = await countQuery;

    if ((count ?? 0) >= 5) {
      return NextResponse.json(
        { success: false, error: "Comment limit reached. Try again later." },
        { status: 429 }
      );
    }

    const { data, error } = await sb
      .from("style_comments")
      .insert({
        style_slug: slugParsed.data,
        content: parsed.data.content,
        author_name: authorName,
        session_id: sessionId,
        user_id: userId,
        avatar_url: avatarUrl,
        ip_address: ip,
      })
      .select("id, content, author_name, avatar_url, user_id, created_at")
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: "Failed to save comment" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, comment: data });
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

  const { data, count } = await sb
    .from("style_comments")
    .select("id, content, author_name, avatar_url, user_id, created_at", { count: "exact" })
    .eq("style_slug", slugParsed.data)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  return NextResponse.json({
    comments: data ?? [],
    total: count ?? 0,
  });
}
