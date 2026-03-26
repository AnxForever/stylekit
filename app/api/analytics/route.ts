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

interface LegacyAnalyticsPayload {
  slug?: string;
  source?: string;
  slugB?: string;
}

interface InternalAnalyticsPayload {
  eventType?: string;
  styleSlug?: string | null;
  eventData?: Record<string, unknown>;
  sessionId?: string | null;
}

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

  try {
    const body = (await request.json()) as LegacyAnalyticsPayload & InternalAnalyticsPayload;

    if (typeof body.eventType === "string" && body.eventType.trim().length > 0) {
      await recordInternalAnalyticsEvent(request, body);
      return NextResponse.json({ success: true });
    }

    const { slug, source, slugB } = body;
    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing slug" },
        { status: 400 }
      );
    }

    if (source === "page" || source === "api" || source === "mcp") {
      trackStyleUsage(slug, source);
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid source" },
        { status: 400 }
      );
    }

    if (slugB && typeof slugB === "string") {
      trackStyleCombination(slug, slugB);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}

async function recordInternalAnalyticsEvent(
  request: Request,
  payload: InternalAnalyticsPayload
): Promise<void> {
  const eventType = payload.eventType?.trim();
  if (!eventType) {
    throw new Error("Missing event type");
  }

  const styleSlug =
    typeof payload.styleSlug === "string" && payload.styleSlug.trim().length > 0
      ? payload.styleSlug.trim().toLowerCase()
      : null;
  const eventData =
    payload.eventData && typeof payload.eventData === "object"
      ? {
          ...payload.eventData,
          browser: readBrowser(request.headers.get("user-agent")),
          os: readOs(request.headers.get("user-agent")),
          deviceType: readDeviceType(request.headers.get("user-agent")),
          country: readCountry(request),
        }
      : {};
  const sessionId =
    typeof payload.sessionId === "string" && payload.sessionId.trim().length > 0
      ? payload.sessionId.trim()
      : null;

  const supabase = getSupabaseAdmin();
  if (supabase) {
    await supabase.from("analytics_events").insert({
      event_type: eventType,
      event_data: eventData,
      style_slug: styleSlug,
      session_id: sessionId,
      ip_address: getClientIp(request),
      user_agent: request.headers.get("user-agent"),
    });
  }

  if (styleSlug) {
    const source = inferLegacySource(eventType);
    if (source) {
      trackStyleUsage(styleSlug, source);
    }
  }
}

function inferLegacySource(eventType: string): "page" | "api" | "mcp" | null {
  if (eventType === "style_view") return "page";
  return null;
}

function getClientIp(request: Request): string | null {
  return (
    request.headers.get("cf-connecting-ip")?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    null
  );
}

function readCountry(request: Request): string | null {
  return (
    request.headers.get("cf-ipcountry")?.trim() ||
    request.headers.get("x-vercel-ip-country")?.trim() ||
    request.headers.get("cloudfront-viewer-country")?.trim() ||
    null
  );
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
