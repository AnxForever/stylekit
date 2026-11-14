/**
 * Client-side Event Tracking
 *
 * Type-safe wrapper for self-hosted and internal analytics.
 * SSR-safe: no-ops on the server.
 */

import { getUtmParams } from "@/lib/analytics/utm";
import { canCollectClientAnalytics } from "@/lib/analytics/collection-policy";
import { createAnalyticsEventId, getAnalyticsIdentity, getStoredAnalyticsIdentity } from "@/lib/analytics/identity";
import type {
  ClientEventName,
  EventProperties,
  PageViewPayload,
} from "@/lib/analytics/event-contract";

export {
  ANALYTICS_EVENT_NAMES,
  AUTHORITATIVE_EVENT_NAMES,
  CLIENT_EVENT_NAMES,
} from "@/lib/analytics/event-contract";
export type {
  AnalyticsEventName,
  AuthoritativeEventName,
  ClientEventName,
  EventName,
  EventProperties,
  PageViewPayload,
} from "@/lib/analytics/event-contract";

declare global {
  interface Window {
    /** Umami tracker global, injected by the self-hosted script.js. */
    umami?: {
      track: (
        nameOrPayload: string | Record<string, unknown>,
        data?: Record<string, unknown>
      ) => void;
    };
  }
}

// ── Tracker ─────────────────────────────────────────────────

/**
 * Forward an event to the self-hosted Umami instance.
 * The tracker script loads lazily; events fired before it arrives are dropped
 * by design — analytics failures must never block the page.
 */
function trackWithUmami(
  name: string,
  data: Record<string, string | number | boolean | null>
): void {
  try {
    window.umami?.track(name, data as Record<string, unknown>);
  } catch {
    // Analytics failures must remain non-blocking.
  }
}

/**
 * Track a custom event with type-safe properties.
 * No-ops on the server. Attaches UTM params from sessionStorage if present.
 */
export function trackEvent<T extends ClientEventName>(
  name: T,
  properties: EventProperties<T>
): void {
  if (!canCollectClientAnalytics()) return;

  const utm = getUtmParams();
  const merged = utm
    ? { ...properties, ...utm }
    : properties;

  // Umami manages UTM at the session level itself, so forward the raw
  // properties without the merged UTM fields.
  trackWithUmami(name, properties);
  void queueInternalAnalyticsEvent(name, merged);
}

export function trackPageView(payload: PageViewPayload): void {
  if (!canCollectClientAnalytics()) return;
  const utm = getUtmParams();
  void queueInternalAnalyticsEvent("page_view", utm ? { ...payload, ...utm } : payload);
}

// ── UTM helpers (inline to avoid circular deps) ─────────────

const INTERNAL_ANALYTICS_ENDPOINT = "/api/analytics";

async function queueInternalAnalyticsEvent(
  name: ClientEventName | "page_view",
  properties:
    | PageViewPayload
    | Record<string, string | number | boolean | null>
): Promise<void> {
  try {
    const occurredAt = new Date().toISOString();
    const eventId = createAnalyticsEventId();
    const identity = document.visibilityState === "hidden"
      ? getStoredAnalyticsIdentity()
      : await getAnalyticsIdentity();
    const payload = {
      eventType: name,
      eventData: properties,
      eventId,
      occurredAt,
      ...identity,
    };
    const body = JSON.stringify(payload);

    if (document.visibilityState === "hidden" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(INTERNAL_ANALYTICS_ENDPOINT, blob)) return;
    }

    // Reuse the exact event ID for one transient retry, including an unknown
    // outcome where the server committed before the connection failed.
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const response = await fetch(INTERNAL_ANALYTICS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
          keepalive: true,
        });
        if (response.ok || response.status < 500) return;
      } catch {
        // A transient failure must not block the product interaction.
      }
      if (attempt === 0) {
        await new Promise((resolve) => window.setTimeout(resolve, 500));
        if (!canCollectClientAnalytics()) return;
      }
    }
  } catch {
    // Analytics failures must remain non-blocking.
  }
}
