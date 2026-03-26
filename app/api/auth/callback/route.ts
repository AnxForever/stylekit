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

function parseNextPath(value: string | null): string {
  if (!value || !value.startsWith("/")) return "/";
  return value;
}

function parseMetadata(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  return value as Record<string, unknown>;
}

function getPublicOrigin(request: NextRequest): string {
  const configured = process.env.NEXT_PUBLIC_BASE_URL?.trim();
  if (configured) {
    try {
      return new URL(configured).origin;
    } catch {
      // Fall through to request origin when env is malformed.
    }
  }

  return new URL(request.url).origin;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = getPublicOrigin(request);
  const code = searchParams.get("code");
  const next = parseNextPath(searchParams.get("next"));
  const redirectUrl = `${origin}${next}`;

  if (!code) {
    return NextResponse.redirect(redirectUrl);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.redirect(redirectUrl);
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
    return NextResponse.redirect(redirectUrl);
  }

  // Assign sequential ID if the user does not have one yet
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (serviceRoleKey) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user && user.user_metadata?.seq_id === undefined) {
        const seqId = await getOrAssignSeqId(user.id);
        const adminClient = createClient(url, serviceRoleKey, {
          auth: { autoRefreshToken: false, persistSession: false },
        });
        await adminClient.auth.admin.updateUserById(user.id, {
          user_metadata: {
            ...parseMetadata(user.user_metadata),
            seq_id: seqId,
          },
        });
      }
    } catch {
      // Non-blocking: auth session is already created.
    }
  }

  return NextResponse.redirect(redirectUrl);
}
