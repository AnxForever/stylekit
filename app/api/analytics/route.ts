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
  readEventTemplateReference,
  type ParsedClientAnalyticsPayload,
  type TemplateEventReference,
} from "@/lib/analytics/client-event-schema";
import {
  isExternalTemplateId,
  isShowcaseTemplateSlug,
} from "@/lib/templates/identity";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { shouldExcludeAnalyticsRequest } from "@/lib/analytics/collection-policy";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";

const ANALYTICS_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const ANALYTICS_RATE_LIMIT_MAX_REQUESTS = 300;
const MAX_ANALYTICS_BODY_BYTES = 16 * 1024;
const ANALYTICS_GET_CACHE_CONTROL =
  "public, max-age=15, s-maxage=30, stale-while-revalidate=120";
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
    return NextResponse.json(
      { top: getTopStyles(limit) },
      { headers: { "Cache-Control": ANALYTICS_GET_CACHE_CONTROL } },
    );
  }

  const combinationsParam = searchParams.get("combinations");
  if (combinationsParam === "true") {
    return NextResponse.json(
      { combinations: getPopularCombinations(10) },
      { headers: { "Cache-Control": ANALYTICS_GET_CACHE_CONTROL } },
    );
  }

  return NextResponse.json(getUsageStats(), {
    headers: { "Cache-Control": ANALYTICS_GET_CACHE_CONTROL },
  });
}

export async function POST(request: Request) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { success: false, error: originCheck.error },
      { status: originCheck.status ?? 403 }
    );
  }

  if (shouldExcludeAnalyticsRequest(request)) {
    return NextResponse.json({ success: true, excluded: true });
  }

  let rateLimitHeaders: Record<string, string> = {};
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
    // Passive exposures cannot spend the allowance needed by deliberate actions.
    // Parse first, with a strict body-size cap, to select the appropriate budget.
    const passive = internalPayload.success && [
      "catalog_impression", "style_engagement", "pack_offer_view", "pack_price_view",
    ].includes(internalPayload.data.eventType);
    const clientKey = getRequestClientKey(request);
    const visitorId = internalPayload.success ? internalPayload.data.visitorId : null;
    // Missing proxy configuration must not put the entire site into a 300-event
    // bucket. Unknown traffic still has a finite site-wide abuse ceiling.
    const sharedLimit = clientKey === "ip:unknown"
      ? (passive ? 120_000 : 60_000)
      : (passive ? 12_000 : 6_000);
    let rateLimit = checkRateLimit({
      namespace: visitorId
        ? (passive ? "analytics-passive-abuse" : "analytics-abuse")
        : (passive ? "analytics-passive" : "analytics"),
      key: clientKey,
      limit: sharedLimit,
      windowMs: ANALYTICS_RATE_LIMIT_WINDOW_MS,
    });
    if (rateLimit.allowed && visitorId) {
      // Check the shared ceiling first, so rotating visitor IDs cannot allocate
      // unbounded buckets after the abuse budget has already been exhausted.
      rateLimit = checkRateLimit({
        namespace: passive ? "analytics-passive" : "analytics",
        key: `visitor:${visitorId}`,
        limit: passive ? 1200 : ANALYTICS_RATE_LIMIT_MAX_REQUESTS,
        windowMs: ANALYTICS_RATE_LIMIT_WINDOW_MS,
      });
    }
    rateLimitHeaders = createRateLimitHeaders(rateLimit);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many analytics requests" },
        { status: 429, headers: rateLimitHeaders },
      );
    }

    if (internalPayload.success) {
      if (shouldExcludeAnalyticsRequest(request, internalPayload.data.eventData)) {
        return NextResponse.json({ success: true, excluded: true }, { headers: rateLimitHeaders });
      }

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

  const templateReference = readEventTemplateReference(
    payload.eventType,
    payload.eventData,
  );
  if (templateReference && !isKnownTemplateReference(templateReference)) {
    return { ok: false, status: 400, error: "Unknown template slug" };
  }

  const deviceType = readDeviceType(request.headers.get("user-agent"));
  const receivedAt = Date.now();
  const occurredAt = payload.occurredAt ? Date.parse(payload.occurredAt) : Number.NaN;
  const acceptedClientTime = Number.isFinite(occurredAt)
    && occurredAt >= receivedAt - 5 * 60 * 1000
    && occurredAt <= receivedAt + 60 * 1000;
  const eventData = {
    ...payload.eventData,
    browser: readBrowser(request.headers.get("user-agent")),
    os: readOs(request.headers.get("user-agent")),
    deviceType,
    country: readCountry(request),
    environment: readEnvironment(),
    ...(payload.eventId ? {
      measurementVersion: 2,
      timestampSource: acceptedClientTime ? "client" : "server",
    } : {}),
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
    ...(payload.eventId ? {
      visitor_id: payload.visitorId,
      event_id: payload.eventId,
      created_at: new Date(acceptedClientTime ? occurredAt : receivedAt).toISOString(),
    } : {}),
  });
  if (error) {
    // The database's unique event_id index arbitrates concurrent retries. The
    // public legacy counters are only touched after a genuinely new insert.
    if (payload.eventId && error.code === "23505") return { ok: true };
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

function isKnownTemplateReference(reference: TemplateEventReference): boolean {
  return reference.kind === "external"
    ? isExternalTemplateId(reference.slug)
    : isShowcaseTemplateSlug(reference.slug);
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
    request.headers.get("cloudfront-viewer-country")?.trim() ||
    null
  );
  if (!country) return null;
  const normalized = country.toUpperCase();
  return /^[A-Z]{2}$/.test(normalized) ? normalized : null;
}

function readEnvironment(): "production" | "preview" | "development" | "test" {
  if (process.env.NODE_ENV === "test") return "test";
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
