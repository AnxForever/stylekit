/**
 * Browser/client-side Supabase client (uses anon key).
 *
 * Lazy-initialised: returns null when env vars are missing so the app
 * can build and run without Supabase configured.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _client: any = null;
let _initialised = false;

export function getSupabaseClient() {
  if (_initialised) return _client;
  _initialised = true;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createClient } = require("@supabase/supabase-js");
  _client = createClient(url, key);
  return _client;
}
