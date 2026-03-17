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
}

// ── UTM helpers (inline to avoid circular deps) ─────────────

const UTM_STORAGE_KEY = "stylekit_utm";

function getStoredUtmParams(): Record<string, string> | null {
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return null;
  }
}
