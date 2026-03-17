import { NextResponse } from "next/server";
import { emailSchema } from "@/lib/newsletter";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 3;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now >= entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = emailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    const { email } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();
    const supabase = getSupabaseAdmin();

    if (!supabase) {
      return NextResponse.json(
        { success: false, error: "Newsletter service not configured" },
        { status: 503 }
      );
    }

    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("email", normalizedEmail)
      .single();

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Already subscribed" },
        { status: 409 }
      );
    }

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: normalizedEmail, subscribed_at: new Date().toISOString() });

    if (error) {
      return NextResponse.json(
        { success: false, error: "Failed to subscribe" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, message: "Subscribed" });
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
