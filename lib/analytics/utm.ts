/**
 * UTM Parameter Tracking
 *
 * Captures UTM parameters from the URL on page load and stores them
 * in sessionStorage for the duration of the visit.
 */

"use client";

import { useEffect, useMemo } from "react";

// ── Constants ───────────────────────────────────────────────

const UTM_STORAGE_KEY = "stylekit_utm";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

// ── Core Functions ──────────────────────────────────────────

/**
 * Parse UTM parameters from a URL search string.
 */
export function parseUtmParams(search: string): UtmParams | null {
  const params = new URLSearchParams(search);
  const utm: UtmParams = {};
  let found = false;

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      utm[key] = value;
      found = true;
    }
  }

  return found ? utm : null;
}

/**
 * Store UTM params in sessionStorage. Only writes if params are present.
 */
export function storeUtmParams(params: UtmParams): void {
  try {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params));
  } catch {
    // sessionStorage unavailable (SSR, private browsing quota)
  }
}

/**
 * Retrieve stored UTM params from sessionStorage.
 */
export function getUtmParams(): UtmParams | null {
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UtmParams;
  } catch {
    return null;
  }
}

/**
 * Capture UTM params from the current URL and persist to sessionStorage.
 * Only captures on first visit with UTM params; does not overwrite existing.
 */
export function captureUtmParams(): void {
  if (typeof window === "undefined") return;

  const existing = getUtmParams();
  if (existing) return;

  const parsed = parseUtmParams(window.location.search);
  if (parsed) {
    storeUtmParams(parsed);
  }
}

// ── React Hook ──────────────────────────────────────────────

/**
 * Hook that captures UTM params on mount and returns the current values.
 */
export function useUtmParams(): UtmParams | null {
  useEffect(() => {
    captureUtmParams();
  }, []);

  return useMemo(() => {
    if (typeof window === "undefined") return null;
    return getUtmParams();
  }, []);
}
