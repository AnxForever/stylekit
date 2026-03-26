/**
 * Client-side Event Tracking
 *
 * Type-safe wrapper around Vercel Analytics track() for custom event tracking.
 * SSR-safe: no-ops on the server.
 */

import { track } from "@vercel/analytics";

// ── Event Definitions ───────────────────────────────────────

type StyleViewProps = { slug: string; source: string };
type StyleExportProps = { slug: string; format: string };
type CodeCopyProps = { slug: string; language: string };
type AnimationViewProps = { slug: string; source: string };
type TemplateViewProps = { slug: string; source: string };
type NewsletterSubscribeProps = { source: string };
type CtaClickProps = { label: string; location: string };
type SearchProps = { query: string; results_count: number };
type GithubClickProps = { location: string };

interface EventMap {
  style_view: StyleViewProps;
  style_export: StyleExportProps;
  code_copy: CodeCopyProps;
  animation_view: AnimationViewProps;
  template_view: TemplateViewProps;
  newsletter_subscribe: NewsletterSubscribeProps;
  cta_click: CtaClickProps;
  search: SearchProps;
  github_click: GithubClickProps;
}

export type EventName = keyof EventMap;
export type EventProperties<T extends EventName> = EventMap[T];

export interface PageViewPayload {
  path: string;
  hostname: string;
  referrer: string | null;
  referrerDomain: string | null;
  referrerType: "direct" | "search" | "social" | "external" | "internal";
}

// ── Tracker ─────────────────────────────────────────────────

function isClient(): boolean {
  return typeof window !== "undefined";
}

/**
 * Track a custom event with type-safe properties.
 * No-ops on the server. Attaches UTM params from sessionStorage if present.
 */
export function trackEvent<T extends EventName>(
  name: T,
  properties: EventProperties<T>
): void {
  if (!isClient()) return;

  const utm = getStoredUtmParams();
  const merged = utm
    ? { ...properties, ...utm }
    : properties;

  track(name, merged as Record<string, string | number | boolean | null>);
  queueInternalAnalyticsEvent(name, merged);
}

export function trackPageView(payload: PageViewPayload): void {
  if (!isClient()) return;

  queueInternalAnalyticsEvent("page_view", payload);
}

// ── UTM helpers (inline to avoid circular deps) ─────────────

const UTM_STORAGE_KEY = "stylekit_utm";
const SESSION_STORAGE_KEY = "stylekit_session_id";
const INTERNAL_ANALYTICS_ENDPOINT = "/api/analytics";

function getStoredUtmParams(): Record<string, string> | null {
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return null;
  }
}

function queueInternalAnalyticsEvent(
  name: EventName | "page_view",
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
      styleSlug: readStyleSlug(
        name,
        properties as EventProperties<EventName> & Record<string, string>
      ),
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
function readStyleSlug(
  name: EventName | "page_view",
  properties: Record<string, unknown>
): string | null {
  if (name === "style_view" || name === "style_export" || name === "code_copy") {
    const slug = (properties as { slug?: string }).slug;
    return typeof slug === "string" && slug.trim().length > 0 ? slug : null;
  }

  return null;
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
