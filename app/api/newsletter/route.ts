import { NextResponse } from "next/server";
import { emailSchema } from "@/lib/newsletter";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";

export async function POST(request: Request) {
  try {
    const rateLimit = checkRateLimit({
      namespace: "newsletter",
      key: getRequestClientKey(request),
      limit: 3,
      windowMs: 60 * 60 * 1000,
    });

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Try again later." },
        {
          status: 429,
          headers: createRateLimitHeaders(rateLimit),
        }
      );
    }

    const body = await request.json();
    const parsed = emailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        {
          status: 400,
          headers: createRateLimitHeaders(rateLimit),
        }
      );
    }

    const { email } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();
    const supabase = getSupabaseAdmin();

    if (!supabase) {
      return NextResponse.json(
        { success: false, error: "Newsletter service not configured" },
        {
          status: 503,
          headers: createRateLimitHeaders(rateLimit),
        }
      );
    }

    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Already subscribed" },
        {
          status: 409,
          headers: createRateLimitHeaders(rateLimit),
        }
      );
    }

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: normalizedEmail, subscribed_at: new Date().toISOString() });

    if (error) {
      return NextResponse.json(
        { success: false, error: "Failed to subscribe" },
        {
          status: 500,
          headers: createRateLimitHeaders(rateLimit),
        }
      );
    }

    return NextResponse.json(
      { success: true, message: "Subscribed" },
      {
        headers: createRateLimitHeaders(rateLimit),
      }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
