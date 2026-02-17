/**
 * Next.js 16 proxy (replaces middleware).
 *
 * 1. Blocks /api-test in production.
 * 2. Refreshes Supabase auth session on every request (keeps cookies fresh).
 * 3. Protects /admin/* routes — redirects unauthenticated users to home.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Admin user IDs whitelist.
 * Set via ADMIN_USER_IDS env var (comma-separated Supabase user UUIDs).
 */
function getAdminIds(): string[] {
  const raw = process.env.ADMIN_USER_IDS ?? "";
  return raw
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
}

export async function proxy(request: NextRequest) {
  // Block /api-test in production
  if (
    process.env.NODE_ENV === "production" &&
    request.nextUrl.pathname.startsWith("/api-test")
  ) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase is not configured, skip auth entirely
  if (!url || !key) {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        supabaseResponse = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          supabaseResponse.cookies.set(name, value, options);
        }
      },
    },
  });

  // Only call getUser() (network roundtrip to Supabase) for admin routes.
  // For all other routes, just refresh the session from cookies (local, fast).
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/";
      return NextResponse.redirect(redirectUrl);
    }

    const adminIds = getAdminIds();
    if (adminIds.length > 0 && !adminIds.includes(user.id)) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/";
      return NextResponse.redirect(redirectUrl);
    }
  } else {
    // Lightweight session refresh — reads/writes cookies only, no network call
    await supabase.auth.getSession();
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets (images, fonts, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)$).*)",
  ],
};
