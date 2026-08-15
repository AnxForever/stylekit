/**
 * Client-side Event Tracking
 *
 * Type-safe wrapper around Vercel Analytics track() for custom event tracking.
 * SSR-safe: no-ops on the server.
 */

import { track } from "@vercel/analytics";
import { getUtmParams } from "@/lib/analytics/utm";
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

const isVercel = typeof process !== "undefined" && Boolean(process.env.NEXT_PUBLIC_VERCEL);

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

function isClient(): boolean {
  return typeof window !== "undefined";
}

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
  if (!isClient()) return;

  const utm = getUtmParams();
  const merged = utm
    ? { ...properties, ...utm }
    : properties;

  if (isVercel) {
    track(name, merged as Record<string, string | number | boolean | null>);
  }
  // Umami manages UTM at the session level itself, so forward the raw
  // properties without the merged UTM fields.
  trackWithUmami(name, properties);
  queueInternalAnalyticsEvent(name, merged);
}

export function trackPageView(payload: PageViewPayload): void {
  if (!isClient()) return;
  const utm = getUtmParams();
  queueInternalAnalyticsEvent("page_view", utm ? { ...payload, ...utm } : payload);
}

// ── UTM helpers (inline to avoid circular deps) ─────────────

const SESSION_STORAGE_KEY = "stylekit_session_id";
const INTERNAL_ANALYTICS_ENDPOINT = "/api/analytics";

function queueInternalAnalyticsEvent(
  name: ClientEventName | "page_view",
  properties:
    | PageViewPayload
    | Record<string, string | number | boolean | null>
): void {
  if (process.env.NODE_ENV === "test") {
    return;
  }

  try {
    const payload = {
      eventType: name,
      eventData: properties,
      sessionId: getOrCreateSessionId(),
    };
    const body = JSON.stringify(payload);

    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(INTERNAL_ANALYTICS_ENDPOINT, blob);
      return;
    }

    void fetch(INTERNAL_ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    });
  } catch {
    // Analytics failures must remain non-blocking.
  }
}

function getOrCreateSessionId(): string | null {
  try {
    const existing = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (existing) return existing;

    const next =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `sess_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    sessionStorage.setItem(SESSION_STORAGE_KEY, next);
    return next;
  } catch {
    return null;
  }
}
