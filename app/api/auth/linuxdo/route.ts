/**
 * Initiate Linux DO OAuth flow.
 *
 * Redirects the user to the Linux DO authorization page.
 * Supports an optional `next` query param for post-login redirect.
 */

import { randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { buildAuthorizationUrl } from "@/lib/auth/linuxdo";
import { sanitizeNextPath } from "@/lib/auth/next-path";
import {
  LINUXDO_CALLBACK_PATH,
  LINUXDO_NEXT_COOKIE,
  LINUXDO_STATE_COOKIE,
} from "@/lib/auth/linuxdo-cookies";

function parseNextPath(value: string | null): string {
  return sanitizeNextPath(value, "/");
}

function stateCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 10 * 60,
    path: LINUXDO_CALLBACK_PATH,
  };
}

function buildLoginErrorUrl(origin: string, next: string): string {
  const loginUrl = new URL("/login", origin);
  loginUrl.searchParams.set("auth_error", "linuxdo");
  if (next !== "/") loginUrl.searchParams.set("next", next);
  return loginUrl.toString();
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
  const next = parseNextPath(searchParams.get("next"));
  const redirectUri = `${origin}${LINUXDO_CALLBACK_PATH}`;
  const state = randomBytes(32).toString("hex");

  try {
    const authUrl = new URL(buildAuthorizationUrl(redirectUri));
    authUrl.searchParams.set("state", state);
    const response = NextResponse.redirect(authUrl);
    const options = stateCookieOptions();
    response.cookies.set(LINUXDO_STATE_COOKIE, state, options);
    response.cookies.set(LINUXDO_NEXT_COOKIE, encodeURIComponent(next), options);
    return response;
  } catch {
    // Missing env vars — redirect home silently
    return NextResponse.redirect(buildLoginErrorUrl(origin, next));
  }
}
