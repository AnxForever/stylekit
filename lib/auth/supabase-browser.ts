/**
 * Browser-side Supabase client with cookie-based auth session.
 *
 * Uses @supabase/ssr for proper Next.js integration.
 * Returns null when env vars are missing (graceful degradation).
 */

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;
let _initialised = false;

export function getAuthClient(): SupabaseClient | null {
  if (_initialised) return _client;
  _initialised = true;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  _client = createBrowserClient(url, key);
  return _client;
}
