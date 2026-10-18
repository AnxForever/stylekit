/**
 * Client-side Event Tracking
 *
 * Type-safe wrapper for the self-hosted Umami instance and internal analytics.
 * SSR-safe: no-ops on the server.
 */

import { getUtmParams } from "@/lib/analytics/utm";
import { UMAMI_TRACKING_HOSTS } from "@/lib/analytics/umami-constants";
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
    /** Umami tracker global, injected by the script.js loaded in the document. */
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

function isAnalyticsDisabled(): boolean {
  return process.env.NEXT_PUBLIC_ANALYTICS_DISABLED === "true";
}

/**
 * Events fired before the Umami script finishes loading are otherwise lost.
 * Next renders the script with `afterInteractive`, so this window is short;
 * anything still unsent after the timeout is dropped rather than replayed much
 * later against a stale page context.
 */
const UMAMI_QUEUE_TIMEOUT_MS = 5000;
const UMAMI_POLL_INTERVAL_MS = 100;

/**
 * Mirrors the tracker's `data-domains` so event dispatch can skip hosts the
 * script itself refuses to record. The tracker returns silently in that case —
 * it never throws and never defines `window.umami` — so without this check a
 * preview host or localhost would queue events for the full timeout waiting for
 * a global that is never coming.
 */
function isTrackableHost(): boolean {
  try {
    return (UMAMI_TRACKING_HOSTS as readonly string[]).includes(
      window.location.hostname
    );
  } catch {
    return false;
  }
}

const pendingUmamiEvents: Array<{
  name: string;
  data: Record<string, string | number | boolean | null>;
  queuedAt: number;
}> = [];
let umamiFlushScheduled = false;

/**
 * Forward an event to the self-hosted Umami tracker global.
 * Returns false when the tracker is not available yet, or when the current host
 * is outside `data-domains` (the real tracker would silently drop the send but
 * a stale global from a previous navigation could still be present).
 */
function tryTrackWithUmami(
  name: string,
  data: Record<string, string | number | boolean | null>
): boolean {
  if (!isTrackableHost()) return false;
  if (!window.umami?.track) return false;
  try {
    window.umami.track(name, data as Record<string, unknown>);
    return true;
  } catch {
    // Analytics failures must remain non-blocking.
    return false;
  }
}

function scheduleUmamiFlush(): void {
  if (umamiFlushScheduled) return;

  // On a host outside `data-domains` the tracker will never expose itself, so
  // drop the queue immediately instead of polling a global that never arrives.
  if (!isTrackableHost()) {
    pendingUmamiEvents.length = 0;
    return;
  }
  umamiFlushScheduled = true;

  const flush = () => {
    const age = Date.now();
    for (let index = pendingUmamiEvents.length - 1; index >= 0; index -= 1) {
      const event = pendingUmamiEvents[index];
      const tracked = tryTrackWithUmami(event.name, event.data);
      if (tracked || age - event.queuedAt >= UMAMI_QUEUE_TIMEOUT_MS) {
        pendingUmamiEvents.splice(index, 1);
      }
    }

    if (pendingUmamiEvents.length > 0) {
      setTimeout(flush, UMAMI_POLL_INTERVAL_MS);
      return;
    }
    umamiFlushScheduled = false;
  };

  setTimeout(flush, UMAMI_POLL_INTERVAL_MS);
}

/**
 * Track a custom event with type-safe properties.
 * No-ops on the server. Attaches UTM params from sessionStorage if present.
 */
export function trackEvent<T extends ClientEventName>(
  name: T,
  properties: EventProperties<T>
): void {
  if (!isClient() || isAnalyticsDisabled()) return;

  const utm = getUtmParams();
  const merged = utm
    ? { ...properties, ...utm }
    : properties;

  // Umami manages UTM at the session level itself, so forward the raw
  // properties without the merged UTM fields.
  if (!tryTrackWithUmami(name, properties)) {
    pendingUmamiEvents.push({ name, data: properties, queuedAt: Date.now() });
    scheduleUmamiFlush();
  }
  queueInternalAnalyticsEvent(name, merged);
}

export function trackPageView(payload: PageViewPayload): void {
  if (!isClient() || isAnalyticsDisabled()) return;
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
