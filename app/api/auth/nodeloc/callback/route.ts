/**
 * NodeLoc OAuth callback handler.
 *
 * Exchanges the authorization code, maps the NodeLoc identity to a stable
 * Supabase user, and establishes the normal Supabase cookie session.
 */

import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import {
  exchangeCodeForToken,
  getNodeLocUser,
} from "@/lib/auth/nodeloc";
import {
  NODELOC_CALLBACK_PATH,
  NODELOC_NEXT_COOKIE,
  NODELOC_STATE_COOKIE,
} from "@/lib/auth/nodeloc-cookies";
import { getOrAssignSeqId } from "@/lib/auth/seq-id";

function parseNextPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/styles";
  }
  return value;
}

function decodeNextPath(value: string | null): string {
  if (!value) return "/styles";
  try {
    return parseNextPath(decodeURIComponent(value));
  } catch {
    return "/styles";
  }
}

function getPublicOrigin(request: NextRequest): string {
  const requestOrigin = new URL(request.url).origin;
  if (
    process.env.NODE_ENV === "development" ||
    requestOrigin.startsWith("http://localhost:") ||
    requestOrigin.startsWith("http://127.0.0.1:")
  ) {
    return requestOrigin;
  }

  const configured = process.env.NEXT_PUBLIC_BASE_URL?.trim();
  if (configured) {
    try {
      return new URL(configured).origin;
    } catch {
      // Fall through to the request origin when the env value is malformed.
    }
  }

  return requestOrigin;
}

function buildLoginErrorUrl(origin: string, next: string): URL {
  const loginUrl = new URL("/login", origin);
  loginUrl.searchParams.set("auth_error", "nodeloc");
  loginUrl.searchParams.set("next", next);
  return loginUrl;
}

function clearOAuthCookies(response: NextResponse): NextResponse {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 0,
    path: NODELOC_CALLBACK_PATH,
  };
  response.cookies.set(NODELOC_STATE_COOKIE, "", options);
  response.cookies.set(NODELOC_NEXT_COOKIE, "", options);
  return response;
}

function parseMetadata(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  return value as Record<string, unknown>;
}

function normalizeAvatarUrl(value: string | null | undefined): string {
  if (!value) return "";
  try {
    const url = new URL(value, "https://www.nodeloc.com");
    return url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = getPublicOrigin(request);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const expectedState = request.cookies.get(NODELOC_STATE_COOKIE)?.value ?? null;
  const next = decodeNextPath(request.cookies.get(NODELOC_NEXT_COOKIE)?.value ?? null);
  const redirectUrl = `${origin}${next}`;

  if (!code || !state || !expectedState || state !== expectedState) {
    return clearOAuthCookies(
      NextResponse.redirect(buildLoginErrorUrl(origin, next)),
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
    return clearOAuthCookies(
      NextResponse.redirect(buildLoginErrorUrl(origin, next)),
    );
  }

  try {
    const tokenData = await exchangeCodeForToken(
      code,
      `${origin}${NODELOC_CALLBACK_PATH}`,
    );
    const nodeLocUser = await getNodeLocUser(tokenData.access_token);
    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // NodeLoc email requires an approved `email` scope. Use a deterministic
    // provider-owned address so login also works before that approval.
    const email = `nodeloc_${nodeLocUser.id}@oauth.nodeloc.com`;
    const userMetadata = {
      user_name: nodeLocUser.username,
      full_name: nodeLocUser.name || nodeLocUser.username,
      avatar_url: normalizeAvatarUrl(nodeLocUser.avatar_url),
      provider: "nodeloc",
      nodeloc_id: nodeLocUser.id,
      nodeloc_trust_level: nodeLocUser.trust_level ?? null,
      nodeloc_email: nodeLocUser.email ?? null,
    };

    const { data: createData, error: createError } =
      await adminClient.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: userMetadata,
      });

    let supabaseUserId = createData?.user?.id;
    let mergedMetadata: Record<string, unknown> = { ...userMetadata };

    if (createError) {
      const { data: listData } = await adminClient.auth.admin.listUsers({
        page: 1,
        perPage: 1000,
      });
      const existing = listData?.users?.find((user) => user.email === email);
      if (!existing) {
        throw new Error(createError.message);
      }

      supabaseUserId = existing.id;
      mergedMetadata = {
        ...parseMetadata(existing.user_metadata),
        ...userMetadata,
      };
      await adminClient.auth.admin.updateUserById(existing.id, {
        user_metadata: mergedMetadata,
      });
    }

    if (supabaseUserId && mergedMetadata.seq_id === undefined) {
      try {
        const seqId = await getOrAssignSeqId(supabaseUserId);
        mergedMetadata = { ...mergedMetadata, seq_id: seqId };
        await adminClient.auth.admin.updateUserById(supabaseUserId, {
          user_metadata: mergedMetadata,
        });
      } catch {
        // A missing sequence table must not prevent OAuth login.
      }
    }

    const { data: linkData, error: linkError } =
      await adminClient.auth.admin.generateLink({
        type: "magiclink",
        email,
      });
    if (linkError || !linkData.properties?.hashed_token) {
      throw new Error(linkError?.message ?? "Failed to generate sign-in link");
    }

    const cookieStore = await cookies();
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
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

    const { error: verifyError } = await supabase.auth.verifyOtp({
      type: "magiclink",
      token_hash: linkData.properties.hashed_token,
    });
    if (verifyError) {
      throw new Error(`OTP verification failed: ${verifyError.message}`);
    }

    return clearOAuthCookies(NextResponse.redirect(redirectUrl));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[NodeLoc OAuth] Callback error:", message);
    return clearOAuthCookies(
      NextResponse.redirect(buildLoginErrorUrl(origin, next)),
    );
  }
}
