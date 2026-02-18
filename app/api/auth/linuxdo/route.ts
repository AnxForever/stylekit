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

export async function GET(request: NextRequest) {
  const { origin, searchParams } = new URL(request.url);
  const next = parseNextPath(searchParams.get("next"));
  const redirectUri = `${origin}/api/auth/linuxdo/callback?next=${encodeURIComponent(next)}`;

  try {
    const authUrl = buildAuthorizationUrl(redirectUri);
    return NextResponse.redirect(authUrl);
  } catch {
    // Missing env vars — redirect home silently
    return NextResponse.redirect(`${origin}/`);
  }
}
