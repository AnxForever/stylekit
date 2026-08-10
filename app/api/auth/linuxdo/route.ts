/**
 * Initiate Linux DO OAuth flow.
 *
 * Redirects the user to the Linux DO authorization page.
 * Supports an optional `next` query param for post-login redirect.
 */

import { NextResponse, type NextRequest } from "next/server";
import { buildAuthorizationUrl } from "@/lib/auth/linuxdo";

function parseNextPath(value: string | null): string {
  if (!value || !value.startsWith("/")) return "/";
  return value;
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
  const redirectUri = `${origin}/api/auth/linuxdo/callback`;

  try {
    const authUrl = new URL(buildAuthorizationUrl(redirectUri));
    authUrl.searchParams.set("state", next);
    return NextResponse.redirect(authUrl);
  } catch {
    // Missing env vars — redirect home silently
    return NextResponse.redirect(buildLoginErrorUrl(origin, next));
  }
}
