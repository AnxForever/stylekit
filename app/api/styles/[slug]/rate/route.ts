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

const rateSchema = z.object({
  rating: z.number().int().min(1).max(5),
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

    // Check if user already rated this style
    const { data: existing } = await sb
      .from("style_ratings")
      .select("id")
      .eq("style_slug", slugParsed.data)
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing) {
      // Update existing rating
      const { error } = await sb
        .from("style_ratings")
        .update({ rating: parsed.data.rating, ip_address: ip })
        .eq("id", existing.id);

      if (error) {
        return NextResponse.json(
          { success: false, error: "Failed to update rating" },
          { status: 500 }
        );
      }
    } else {
      // Insert new rating
      const { error } = await sb
        .from("style_ratings")
        .insert({
          style_slug: slugParsed.data,
          rating: parsed.data.rating,
          session_id: null,
          user_id: user.id,
          ip_address: ip,
        });

      if (error) {
        return NextResponse.json(
          { success: false, error: "Failed to save rating" },
          { status: 500 }
        );
      }
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
