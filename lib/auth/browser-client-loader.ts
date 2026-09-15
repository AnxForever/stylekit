/**
 * Lazy browser auth client loader.
 *
 * Supabase's browser SDK is relatively large and is not needed to render
 * anonymous catalog pages. Keep the import behind a promise so the SDK is
 * emitted as an async chunk instead of joining the root layout bundle.
 */

import type { SupabaseClient } from "@supabase/supabase-js";

type BrowserAuthModule = typeof import("./supabase-browser");

let browserAuthModulePromise: Promise<BrowserAuthModule> | undefined;

const SUPABASE_AUTH_COOKIE_RE =
  /(?:^|;\s*)sb-[^=;]+-auth-token(?:\.\d+)?=/;

export function isBrowserAuthConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/**
 * Supabase SSR persists browser sessions in one or more readable cookies.
 * Anonymous visitors have no such cookie, so loading the 200KB+ auth SDK on
 * every public page cannot reveal a session and only delays useful work.
 */
export function hasBrowserAuthSessionHint(): boolean {
  return typeof document !== "undefined" &&
    SUPABASE_AUTH_COOKIE_RE.test(document.cookie);
}

export function loadAuthClient(): Promise<SupabaseClient | null> {
  if (typeof window === "undefined" || !isBrowserAuthConfigured()) {
    return Promise.resolve(null);
  }

  // Cache the module, not the returned client. The browser module owns the
  // singleton and keeping that distinction makes test mocks deterministic.
  browserAuthModulePromise ??= import("./supabase-browser");
  return browserAuthModulePromise
    .then(({ getAuthClient }) => getAuthClient())
    .catch(() => null);
}
