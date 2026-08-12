/**
 * Linux DO OAuth callback handler.
 *
 * Receives the authorization code from Linux DO, exchanges it for
 * user info, then creates or updates a Supabase user and signs them in.
 */

import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { exchangeCodeForToken, getLinuxDoUser } from "@/lib/auth/linuxdo";
import {
  LINUXDO_CALLBACK_PATH,
  LINUXDO_NEXT_COOKIE,
  LINUXDO_STATE_COOKIE,
} from "@/app/api/auth/linuxdo/route";
import { getOrAssignSeqId } from "@/lib/auth/seq-id";
import { sanitizeNextPath } from "@/lib/auth/next-path";

function parseNextPath(value: string | null): string {
  return sanitizeNextPath(value, "/");
}

function decodeNextPath(value: string | null): string {
  if (!value) return "/";
  try {
    return parseNextPath(decodeURIComponent(value));
  } catch {
    return "/";
  }
}

function clearOAuthCookies(response: NextResponse): NextResponse {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 0,
    path: LINUXDO_CALLBACK_PATH,
  };
  response.cookies.set(LINUXDO_STATE_COOKIE, "", options);
  response.cookies.set(LINUXDO_NEXT_COOKIE, "", options);
  return response;
}

function buildLoginErrorUrl(origin: string, next: string): string {
  const loginUrl = new URL("/login", origin);
  loginUrl.searchParams.set("auth_error", "linuxdo");
  if (next !== "/") loginUrl.searchParams.set("next", next);
  return loginUrl.toString();
}

function parseMetadata(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  return value as Record<string, unknown>;
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
      // Fall through to request origin when env is malformed.
    }
  }

  return requestOrigin;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = getPublicOrigin(request);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const expectedState = request.cookies.get(LINUXDO_STATE_COOKIE)?.value ?? null;
  const next = decodeNextPath(
    request.cookies.get(LINUXDO_NEXT_COOKIE)?.value ?? null,
  );
  const redirectUrl = `${origin}${next}`;

  if (!code) {
    if (searchParams.get("error")) {
      return clearOAuthCookies(
        NextResponse.redirect(buildLoginErrorUrl(origin, next)),
      );
    }
    return clearOAuthCookies(NextResponse.redirect(redirectUrl));
  }

  // Reject any callback we did not initiate: without this an attacker can
  // hand a victim's browser their own authorization code and silently sign
  // the victim into the attacker's account.
  if (!state || !expectedState || state !== expectedState) {
    return clearOAuthCookies(
      NextResponse.redirect(buildLoginErrorUrl(origin, next)),
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey || !serviceRoleKey) {
    return clearOAuthCookies(NextResponse.redirect(redirectUrl));
  }

  try {
    // 1. Exchange code for access token
    const tokenData = await exchangeCodeForToken(
      code,
      `${origin}${LINUXDO_CALLBACK_PATH}`,
    );

    // 2. Get Linux DO user info
    const ldUser = await getLinuxDoUser(tokenData.access_token);

    // 3. Create or update Supabase user via admin API.
    //    Try create first; if the email already exists, update instead.
    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Deterministic email for LinuxDo users
    const email = `linuxdo_${ldUser.id}@connect.linux.do`;

    // Linux DO (Discourse) returns avatar_url as a template with {size}
    // placeholder (e.g. "/user_avatar/linux.do/username/{size}/12345_2.png").
    // Replace the placeholder and normalize to an absolute URL.
    let avatarUrl = ldUser.avatar_url ?? "";
    if (avatarUrl.includes("{size}")) {
      avatarUrl = avatarUrl.replace("{size}", "288");
    }
    if (avatarUrl && !avatarUrl.startsWith("http")) {
      avatarUrl = `https://linux.do${avatarUrl}`;
    }

    const userMetadata = {
      user_name: ldUser.username,
      full_name: ldUser.name || ldUser.username,
      avatar_url: avatarUrl,
      provider: "linuxdo",
      linuxdo_id: ldUser.id,
      linuxdo_trust_level: ldUser.trust_level,
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
      // User likely already exists — find and update metadata
      const { data: listData } = await adminClient.auth.admin.listUsers({
        page: 1,
        perPage: 1000,
      });

      const existing = listData?.users?.find((u) => u.email === email);
      if (existing) {
        supabaseUserId = existing.id;
        mergedMetadata = {
          ...parseMetadata(existing.user_metadata),
          ...userMetadata,
        };
        await adminClient.auth.admin.updateUserById(existing.id, {
          user_metadata: mergedMetadata,
        });
      } else {
        throw new Error(createError.message);
      }
    }

    // Assign a stable sequential ID (1, 2, 3…) and persist to metadata
    if (supabaseUserId && mergedMetadata.seq_id === undefined) {
      try {
        const seqId = await getOrAssignSeqId(supabaseUserId);
        mergedMetadata = { ...mergedMetadata, seq_id: seqId };
        await adminClient.auth.admin.updateUserById(supabaseUserId, {
          user_metadata: mergedMetadata,
        });
      } catch {
        // Non-blocking: login can continue even if seq assignment fails.
      }
    }

    // 4. Generate a magic link to sign in as this user
    const { data: linkData, error: linkError } =
      await adminClient.auth.admin.generateLink({
        type: "magiclink",
        email,
      });

    if (linkError || !linkData.properties?.hashed_token) {
      throw new Error(
        linkError?.message ?? "Failed to generate sign-in link",
      );
    }

    // 5. Use the hashed token to verify OTP and set session cookies
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
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[LinuxDo OAuth] Callback error:", message);
    return clearOAuthCookies(
      NextResponse.redirect(buildLoginErrorUrl(origin, next)),
    );
  }
}
