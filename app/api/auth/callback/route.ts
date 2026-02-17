/**
 * OAuth callback handler.
 *
 * After GitHub OAuth completes, Supabase redirects here with a `code` param.
 * We exchange it for a session, assign a sequential user ID if missing,
 * and redirect to the original page (or home).
 */

import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { getOrAssignSeqId } from "@/lib/auth/seq-id";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (!code) {
    return NextResponse.redirect(`${origin}${next}`);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.redirect(`${origin}${next}`);
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value, options } of cookiesToSet) {
          cookieStore.set(name, value, options);
        }
      },
    },
  });

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}${next}`);
  }

  // Assign sequential ID if the user does not have one yet
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceRoleKey) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user && user.user_metadata?.seq_id === undefined) {
      const seqId = await getOrAssignSeqId(user.id);
      const adminClient = createClient(url, serviceRoleKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
      await adminClient.auth.admin.updateUserById(user.id, {
        user_metadata: { seq_id: seqId },
      });
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
