/**
 * Server-side Supabase admin client (uses service role key, bypasses RLS).
 *
 * Lazy-initialised: returns null when env vars are missing so the app
 * can build and run without Supabase configured.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _admin: any = null;
let _initialised = false;

export function getSupabaseAdmin() {
  if (_initialised) return _admin;
  _initialised = true;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createClient } = require("@supabase/supabase-js");
  _admin = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return _admin;
}
