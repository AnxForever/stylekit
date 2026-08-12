/**
 * Initiate the NodeLoc OAuth flow.
 */

import { randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { buildAuthorizationUrl } from "@/lib/auth/nodeloc";
import {
  NODELOC_CALLBACK_PATH,
  NODELOC_NEXT_COOKIE,
  NODELOC_STATE_COOKIE,
} from "@/lib/auth/nodeloc-cookies";

function parseNextPath(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/styles";
  }
  return value;
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

function stateCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 10 * 60,
    path: NODELOC_CALLBACK_PATH,
  };
}

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const origin = getPublicOrigin(request);
  const next = parseNextPath(searchParams.get("next"));
  const redirectUri = `${origin}${NODELOC_CALLBACK_PATH}`;
  const state = randomBytes(32).toString("hex");

  try {
    const authorizationUrl = buildAuthorizationUrl(redirectUri, state);
    const response = NextResponse.redirect(authorizationUrl);
    const options = stateCookieOptions();
    response.cookies.set(NODELOC_STATE_COOKIE, state, options);
    response.cookies.set(NODELOC_NEXT_COOKIE, encodeURIComponent(next), options);
    return response;
  } catch {
    const loginUrl = new URL("/login", origin);
    loginUrl.searchParams.set("auth_error", "nodeloc");
    loginUrl.searchParams.set("next", next);
    return NextResponse.redirect(loginUrl);
  }
}
