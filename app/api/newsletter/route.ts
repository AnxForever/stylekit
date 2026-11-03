import { NextResponse } from "next/server";
import { emailSchema } from "@/lib/newsletter";
import { sendNewsletterWelcome } from "@/lib/newsletter/mail";
import type { NewsletterLocale } from "@/lib/newsletter/token";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";

/**
 * Error codes are part of the response contract so the footer can show
 * localized copy instead of the English server string.
 */
export type NewsletterErrorCode =
  | "invalid-email"
  | "rate-limited"
  | "not-configured"
  | "failed";

export type NewsletterSubscribeCode = "subscribed" | "already-subscribed";

function parseLocale(value: unknown): NewsletterLocale {
  return value === "en" ? "en" : "zh";
}

export async function POST(request: Request) {
  try {
    const rateLimit = checkRateLimit({
      namespace: "newsletter",
      key: getRequestClientKey(request),
      limit: 3,
      windowMs: 60 * 60 * 1000,
    });
    const headers = createRateLimitHeaders(rateLimit);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, code: "rate-limited" satisfies NewsletterErrorCode, error: "Too many requests. Try again later." },
        { status: 429, headers }
      );
    }

    const body = await request.json().catch(() => null);
    const parsed = emailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, code: "invalid-email" satisfies NewsletterErrorCode, error: "Invalid email address" },
        { status: 400, headers }
      );
    }

    const locale = parseLocale((body as { locale?: unknown })?.locale);
    const { email } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();
    const supabase = getSupabaseAdmin();

    if (!supabase) {
      return NextResponse.json(
        { success: false, code: "not-configured" satisfies NewsletterErrorCode, error: "Newsletter service not configured" },
        { status: 503, headers }
      );
    }

    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("email", normalizedEmail)
      .maybeSingle();

    // Re-subscribing is idempotent: report it as a neutral state instead of a
    // red error, and never send a second welcome mail to an address that is
    // already on the list.
    if (existing) {
      return NextResponse.json(
        { success: true, code: "already-subscribed" satisfies NewsletterSubscribeCode },
        { headers }
      );
    }

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: normalizedEmail, subscribed_at: new Date().toISOString() });

    if (error) {
      return NextResponse.json(
        { success: false, code: "failed" satisfies NewsletterErrorCode, error: "Failed to subscribe" },
        { status: 500, headers }
      );
    }

    // Guard the mail path separately: the address is stored either way, but
    // repeated requests for the same mailbox must not turn the endpoint into a
    // way to flood someone's inbox.
    const mailLimit = checkRateLimit({
      namespace: "newsletter-welcome",
      key: normalizedEmail,
      limit: 2,
      windowMs: 60 * 60 * 1000,
    });
    const emailed = mailLimit.allowed
      ? await sendNewsletterWelcome(normalizedEmail, locale)
      : false;

    return NextResponse.json(
      {
        success: true,
        code: "subscribed" satisfies NewsletterSubscribeCode,
        emailSent: emailed,
      },
      { headers }
    );
  } catch {
    return NextResponse.json(
      { success: false, code: "failed" satisfies NewsletterErrorCode, error: "Internal server error" },
      { status: 500 }
    );
  }
}
