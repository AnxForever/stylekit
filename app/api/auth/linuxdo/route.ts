/**
 * Initiate Linux DO OAuth flow.
 *
 * Redirects the user to the Linux DO authorization page.
 * Supports an optional `next` query param for post-login redirect.
 */

import { NextResponse, type NextRequest } from "next/server";
import { buildAuthorizationUrl } from "@/lib/auth/linuxdo";

export async function GET(request: NextRequest) {
  const { origin } = new URL(request.url);
  const next = request.nextUrl.searchParams.get("next") ?? "/";
  const redirectUri = `${origin}/api/auth/linuxdo/callback?next=${encodeURIComponent(next)}`;

  try {
    const authUrl = buildAuthorizationUrl(redirectUri);
    return NextResponse.redirect(authUrl);
  } catch {
    // Missing env vars — redirect home silently
    return NextResponse.redirect(`${origin}/`);
  }
}
