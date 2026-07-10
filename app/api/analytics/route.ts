import {
  getUsageStats,
  getTopStyles,
  getPopularCombinations,
  trackStyleUsage,
  trackStyleCombination,
} from "@/lib/analytics";
import { NextResponse } from "next/server";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { z } from "zod";
import { getStyleBySlug } from "@/lib/styles";
import { resolveStyleBySlug } from "@/lib/styles/community-runtime";
import {
  parseClientAnalyticsPayload,
  readEventStyleSlug,
  type ParsedClientAnalyticsPayload,
} from "@/lib/analytics/client-event-schema";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";

const ANALYTICS_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const ANALYTICS_RATE_LIMIT_MAX_REQUESTS = 300;
const MAX_ANALYTICS_BODY_BYTES = 16 * 1024;
const legacyAnalyticsSchema = z
  .object({
    slug: z.string().trim().min(1).max(96),
    source: z.enum(["page", "api"]),
    slugB: z.string().trim().min(1).max(96).optional(),
  })
  .strict();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const topParam = searchParams.get("top");
  if (topParam) {
    const limit = Math.min(Math.max(parseInt(topParam, 10) || 10, 1), 50);
    return NextResponse.json({
      top: getTopStyles(limit),
    });
  }

  const combinationsParam = searchParams.get("combinations");
  if (combinationsParam === "true") {
    return NextResponse.json({
      combinations: getPopularCombinations(10),
    });
  }

  return NextResponse.json(getUsageStats());
}

export async function POST(request: Request) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { success: false, error: originCheck.error },
      { status: originCheck.status ?? 403 }
    );
  }

  const rateLimit = checkRateLimit({
    namespace: "analytics",
    key: getRequestClientKey(request),
    limit: ANALYTICS_RATE_LIMIT_MAX_REQUESTS,
    windowMs: ANALYTICS_RATE_LIMIT_WINDOW_MS,
  });
  const rateLimitHeaders = createRateLimitHeaders(rateLimit);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many analytics requests" },
      { status: 429, headers: rateLimitHeaders },
    );
  }

  try {
    const parsedBody = await parseJsonBodyWithLimit<unknown>(request, {
      maxBytes: MAX_ANALYTICS_BODY_BYTES,
      tooLargeMessage: "Analytics payload too large",
      invalidJsonMessage: "Invalid analytics payload",
    });
    if (!parsedBody.ok) {
      return NextResponse.json(
        { success: false, error: parsedBody.error },
        { status: parsedBody.status, headers: rateLimitHeaders },
      );
    }

    const body = parsedBody.data;
    const internalPayload = parseClientAnalyticsPayload(body);
    if (internalPayload.success) {
      const result = await recordInternalAnalyticsEvent(request, internalPayload.data);
      if (!result.ok) {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: result.status, headers: rateLimitHeaders },
        );
      }
      return NextResponse.json({ success: true }, { headers: rateLimitHeaders });
    }

    if (hasEventType(body)) {
      return NextResponse.json(
        { success: false, error: "Invalid analytics event" },
        { status: 400, headers: rateLimitHeaders },
      );
    }

    const legacyPayload = legacyAnalyticsSchema.safeParse(body);
    if (!legacyPayload.success) {
      return NextResponse.json(
        { success: false, error: "Invalid analytics payload" },
        { status: 400, headers: rateLimitHeaders },
      );
    }

    const { slug, source, slugB } = legacyPayload.data;
    if (!getStyleBySlug(slug) || (slugB && !getStyleBySlug(slugB))) {
      return NextResponse.json(
        { success: false, error: "Unknown style slug" },
        { status: 400, headers: rateLimitHeaders },
      );
    }

    trackStyleUsage(slug, source);
    if (slugB && typeof slugB === "string") {
      trackStyleCombination(slug, slugB);
    }

    return NextResponse.json({ success: true }, { headers: rateLimitHeaders });
  } catch {
    return NextResponse.json(
      { success: false, error: "Analytics service unavailable" },
      { status: 503, headers: rateLimitHeaders },
    );
  }
}

async function recordInternalAnalyticsEvent(
  request: Request,
  payload: ParsedClientAnalyticsPayload,
): Promise<
  | { ok: true }
  | { ok: false; status: 400 | 500 | 503; error: string }
> {
  const styleSlug = readEventStyleSlug(payload.eventType, payload.eventData);
  const resolvedStyle = styleSlug ? await resolveStyleBySlug(styleSlug) : null;
  if (styleSlug && !resolvedStyle) {
    return { ok: false, status: 400, error: "Unknown style slug" };
  }

  const deviceType = readDeviceType(request.headers.get("user-agent"));
  const eventData = {
    ...payload.eventData,
    browser: readBrowser(request.headers.get("user-agent")),
    os: readOs(request.headers.get("user-agent")),
    deviceType,
    country: readCountry(request),
    environment: readEnvironment(),
  };

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { ok: false, status: 503, error: "Analytics storage not configured" };
  }

  const { error } = await supabase.from("analytics_events").insert({
    event_type: payload.eventType,
    event_data: eventData,
    style_slug: styleSlug,
    session_id: payload.sessionId,
  });
  if (error) {
    return { ok: false, status: 500, error: "Failed to store analytics event" };
  }

  if (styleSlug && resolvedStyle) {
    const source = inferLegacySource(payload.eventType);
    if (source) {
      trackStyleUsage(styleSlug, source);
    }
  }

  return { ok: true };
}

function inferLegacySource(eventType: string): "page" | "api" | null {
  if (eventType === "style_view") return "page";
  return null;
}

function hasEventType(value: unknown): value is { eventType: unknown } {
  return Boolean(value && typeof value === "object" && "eventType" in value);
}

function readCountry(request: Request): string | null {
  const country = (
    request.headers.get("cf-ipcountry")?.trim() ||
    request.headers.get("x-vercel-ip-country")?.trim() ||
    request.headers.get("cloudfront-viewer-country")?.trim() ||
    null
  );
  if (!country) return null;
  const normalized = country.toUpperCase();
  return /^[A-Z]{2}$/.test(normalized) ? normalized : null;
}

function readEnvironment(): "production" | "preview" | "development" | "test" {
  if (process.env.NODE_ENV === "test") return "test";
  if (process.env.VERCEL_ENV === "preview") return "preview";
  if (process.env.NODE_ENV === "development") return "development";
  return "production";
}

function readBrowser(userAgent: string | null): string {
  const ua = (userAgent ?? "").toLowerCase();
  if (ua.includes("edg/")) return "Edge";
  if (ua.includes("opr/") || ua.includes("opera")) return "Opera";
  if (ua.includes("chrome/") && !ua.includes("edg/")) return "Chrome";
  if (ua.includes("safari/") && !ua.includes("chrome/")) return "Safari";
  if (ua.includes("firefox/")) return "Firefox";
  if (ua.includes("msie") || ua.includes("trident/")) return "Internet Explorer";
  return "Unknown";
}

function readOs(userAgent: string | null): string {
  const ua = (userAgent ?? "").toLowerCase();
  if (ua.includes("windows")) return "Windows";
  if (ua.includes("iphone") || ua.includes("ipad") || ua.includes("ios")) return "iOS";
  if (ua.includes("android")) return "Android";
  if (ua.includes("mac os")) return "macOS";
  if (ua.includes("linux")) return "Linux";
  return "Unknown";
}

function readDeviceType(userAgent: string | null): "mobile" | "tablet" | "desktop" | "bot" {
  const ua = (userAgent ?? "").toLowerCase();
  if (/(bot|crawler|spider|preview|curl|wget)/.test(ua)) return "bot";
  if (ua.includes("ipad") || ua.includes("tablet")) return "tablet";
  if (ua.includes("mobi") || ua.includes("iphone") || ua.includes("android")) return "mobile";
  return "desktop";
}
