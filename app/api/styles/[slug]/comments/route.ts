import { NextResponse } from "next/server";
import { z } from "zod";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const COMMENTS_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const COMMENTS_RATE_LIMIT_MAX_REQUESTS = 40;

const commentSchema = z.object({
  content: z.string().min(1).max(280),
  authorName: z.string().min(1).max(50).default("Anonymous"),
  sessionId: z.string().min(1).max(128),
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

    const body = await request.json();
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

    // Rate limit: max 5 comments per session per style per day
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { count } = await sb
      .from("style_comments")
      .select("*", { count: "exact", head: true })
      .eq("style_slug", slugParsed.data)
      .eq("session_id", parsed.data.sessionId)
      .gte("created_at", oneDayAgo);

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
        author_name: parsed.data.authorName,
        session_id: parsed.data.sessionId,
        ip_address: ip,
      })
      .select("id, content, author_name, created_at")
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
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20", 10), 50);
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);

  const { createClient } = await import("@supabase/supabase-js");
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data, count } = await sb
    .from("style_comments")
    .select("id, content, author_name, created_at", { count: "exact" })
    .eq("style_slug", slugParsed.data)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  return NextResponse.json({
    comments: data ?? [],
    total: count ?? 0,
  });
}
