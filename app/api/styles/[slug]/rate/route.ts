import { NextResponse } from "next/server";
import { z } from "zod";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RATING_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATING_RATE_LIMIT_MAX_REQUESTS = 80;

const rateSchema = z.object({
  rating: z.number().int().min(1).max(5),
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

    const body = await request.json();
    const parsed = rateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid rating. Must be 1-5 with sessionId." },
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

    // Upsert: one rating per session per style
    const { error } = await sb
      .from("style_ratings")
      .upsert(
        {
          style_slug: slugParsed.data,
          rating: parsed.data.rating,
          session_id: parsed.data.sessionId,
          ip_address: ip,
        },
        { onConflict: "style_slug,session_id" }
      );

    if (error) {
      return NextResponse.json(
        { success: false, error: "Failed to save rating" },
        { status: 500 }
      );
    }

    // Return updated average
    const { data: summary } = await sb
      .from("style_rating_summary")
      .select("*")
      .eq("style_slug", slugParsed.data)
      .single();

    return NextResponse.json({
      success: true,
      averageRating: summary?.average_rating ?? parsed.data.rating,
      totalRatings: summary?.total_ratings ?? 1,
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
    return NextResponse.json({ averageRating: 0, totalRatings: 0 });
  }

  const { createClient } = await import("@supabase/supabase-js");
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data } = await sb
    .from("style_rating_summary")
    .select("*")
    .eq("style_slug", slugParsed.data)
    .single();

  return NextResponse.json({
    averageRating: data?.average_rating ?? 0,
    totalRatings: data?.total_ratings ?? 0,
  });
}
