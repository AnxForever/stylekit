/**
 * Server-side Supabase client with cookie-based auth session.
 *
 * Uses @supabase/ssr for proper Next.js App Router integration.
 * Must be called per-request (reads cookies from headers).
 * Returns null when env vars are missing.
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function getAuthServerClient(): Promise<SupabaseClient | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // setAll can throw in Server Components (read-only context).
          // This is expected — the middleware will handle the refresh.
        }
      },
    },
  });
}

/**
 * Get the current authenticated user on the server side.
 * Returns null if not authenticated or Supabase is not configured.
 */
export async function getServerUser() {
  const client = await getAuthServerClient();
  if (!client) return null;

  const {
    data: { user },
  } = await client.auth.getUser();
  return user;
}
