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
import { isAdminUserId } from "@/lib/auth/admin-policy";
import {
  addLocaleToPathname,
  DEFAULT_LOCALE,
  detectPreferredLocale,
  getLocaleFromPathname,
  isLocale,
  LOCALE_COOKIE_NAME,
  shouldBypassLocale,
  stripLocaleFromPathname,
} from "@/lib/i18n/routing";

function shouldUseLocalizedFilesystemRoute(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname.startsWith("/styles") ||
    pathname === "/ui-prompts" ||
    pathname === "/landing-page-prompts" ||
    pathname === "/dashboard-prompts" ||
    pathname === "/tailwind-ui-prompts" ||
    pathname === "/dark-mode-ui-prompts" ||
    pathname.startsWith("/prompts") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/animations")
  );
}

export async function proxy(request: NextRequest) {
  const incomingPath = request.nextUrl.pathname;
  const localeInPath = getLocaleFromPathname(incomingPath);
  const strippedPath = localeInPath
    ? stripLocaleFromPathname(incomingPath)
    : incomingPath;
  const effectivePath = strippedPath;

  if (localeInPath && shouldBypassLocale(strippedPath)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = strippedPath;
    return NextResponse.redirect(redirectUrl);
  }

  if (!localeInPath && !shouldBypassLocale(incomingPath)) {
    const preferredLocaleCookie = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
    const preferredLocale = isLocale(preferredLocaleCookie)
      ? preferredLocaleCookie
      : detectPreferredLocale(request.headers.get("accept-language"));
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = addLocaleToPathname(incomingPath, preferredLocale || DEFAULT_LOCALE);
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set(LOCALE_COOKIE_NAME, preferredLocale || DEFAULT_LOCALE, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  // Block /api-test in production
  if (
    process.env.NODE_ENV === "production" &&
    effectivePath.startsWith("/api-test")
  ) {
    return new NextResponse("Not Found", { status: 404 });
  }

  const requestHeaders = new Headers(request.headers);
  if (localeInPath) {
    requestHeaders.set("x-stylekit-locale", localeInPath);
    requestHeaders.set("x-stylekit-visible-path", incomingPath);
  } else {
    requestHeaders.set("x-stylekit-locale", DEFAULT_LOCALE);
    requestHeaders.set("x-stylekit-visible-path", incomingPath);
  }

  const buildResponse = () => {
    if (localeInPath) {
      if (shouldUseLocalizedFilesystemRoute(strippedPath)) {
        return NextResponse.next({
          request: { headers: requestHeaders },
        });
      }

      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = strippedPath;
      return NextResponse.rewrite(rewriteUrl, {
        request: { headers: requestHeaders },
      });
    }

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase is not configured, skip auth entirely
  if (!url || !key) {
    if (
      process.env.NODE_ENV === "production" &&
      effectivePath.startsWith("/admin")
    ) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/";
      return NextResponse.redirect(redirectUrl);
    }

    const response = buildResponse();
    if (localeInPath) {
      response.cookies.set(LOCALE_COOKIE_NAME, localeInPath, {
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365,
      });
    }
    return response;
  }

  let supabaseResponse = buildResponse();

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        supabaseResponse = buildResponse();
        for (const { name, value, options } of cookiesToSet) {
          supabaseResponse.cookies.set(name, value, options);
        }
      },
    },
  });

  // Check if user has an auth cookie — skip network call for anonymous visitors
  const hasAuthCookie = request.cookies
    .getAll()
    .some((c) => c.name.startsWith("sb-") && c.name.endsWith("-auth-token"));

  if (hasAuthCookie) {
    // getUser() validates & refreshes the session server-side, keeping cookies alive.
    // Only called when an auth cookie exists, so anonymous visitors pay zero cost.
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Protect /admin routes
    if (effectivePath.startsWith("/admin")) {
      if (!user) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/";
        return NextResponse.redirect(redirectUrl);
      }

      if (!isAdminUserId(user.id)) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/";
        return NextResponse.redirect(redirectUrl);
      }
    }
  } else if (effectivePath.startsWith("/admin")) {
    // No auth cookie + admin route = redirect immediately
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/";
    return NextResponse.redirect(redirectUrl);
  }

  if (localeInPath) {
    supabaseResponse.cookies.set(LOCALE_COOKIE_NAME, localeInPath, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
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
