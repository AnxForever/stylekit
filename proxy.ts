/**
 * Next.js 16 proxy (replaces middleware).
 *
 * 1. Blocks /api-test in production.
 * 2. Refreshes Supabase auth sessions when a session cookie is present.
 * 3. Protects /admin/* routes — redirects unauthenticated users to home.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { isAdminUserId } from "@/lib/auth/admin-policy";
import {
  ADMIN_SESSION_COOKIE_NAME,
  verifyAdminSessionCookieValue,
} from "@/lib/auth/admin-session";
import {
  addLocaleToPathname,
  DEFAULT_LOCALE,
  detectPreferredLocale,
  getLocaleFromPathname,
  shouldRewriteLocalizedPath,
  shouldUseLocalizedFilesystemRoute,
  isLocale,
  LOCALE_COOKIE_NAME,
  shouldBypassLocale,
  stripLocaleFromPathname,
} from "@/lib/i18n/routing";

const SOCIAL_CRAWLER_RE =
  /Twitterbot|facebookexternalhit|LinkedInBot|Slackbot|Discordbot|WhatsApp|TelegramBot|Pinterestbot|Applebot/i;

function isSocialCrawler(userAgent: string): boolean {
  return SOCIAL_CRAWLER_RE.test(userAgent);
}

function isAdminRoute(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function shouldRefreshAuthSession(pathname: string): boolean {
  // Analytics is intentionally anonymous and can be called many times during
  // a single page view. Refreshing a stale auth cookie for every analytics
  // event creates a server-IP refresh storm and can exhaust Supabase Auth's
  // per-IP token bucket, which then blocks real login callbacks.
  return pathname !== "/api/analytics";
}

function isSupabaseAuthCookie(name: string): boolean {
  // @supabase/ssr appends .0, .1, ... when a session is split across cookies.
  return name.startsWith("sb-") && /-auth-token(?:\.\d+)?$/.test(name);
}

function buildAdminLoginRedirect(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = "/admin-login";
  redirectUrl.search = "";
  const currentPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  if (currentPath.startsWith("/admin")) {
    redirectUrl.searchParams.set("next", currentPath);
  }
  return NextResponse.redirect(redirectUrl);
}

export async function proxy(request: NextRequest) {
  const incomingPath = request.nextUrl.pathname;
  const localeInPath = getLocaleFromPathname(incomingPath);
  const strippedPath = localeInPath
    ? stripLocaleFromPathname(incomingPath)
    : incomingPath;
  const effectivePath = strippedPath;
  const localeCookieValue = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  const requestLocale =
    localeInPath ?? (isLocale(localeCookieValue) ? localeCookieValue : DEFAULT_LOCALE);

  if (localeInPath && shouldBypassLocale(strippedPath)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = strippedPath;
    return NextResponse.redirect(redirectUrl);
  }

  if (!localeInPath && !shouldBypassLocale(incomingPath)) {
    // Social crawlers should get content directly without locale redirect.
    // They don't handle 307 well and need meta tags from the first response.
    const ua = request.headers.get("user-agent") || "";
    if (isSocialCrawler(ua)) {
      const localizedVisiblePath = addLocaleToPathname(incomingPath, DEFAULT_LOCALE);
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-stylekit-locale", DEFAULT_LOCALE);
      requestHeaders.set("x-stylekit-visible-path", localizedVisiblePath);

      if (shouldUseLocalizedFilesystemRoute(incomingPath)) {
        const rewriteUrl = request.nextUrl.clone();
        rewriteUrl.pathname = localizedVisiblePath;
        return NextResponse.rewrite(rewriteUrl, {
          request: { headers: requestHeaders },
        });
      }

      return NextResponse.next({
        request: { headers: requestHeaders },
      });
    }

    const preferredLocale = isLocale(localeCookieValue)
      ? localeCookieValue
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
    requestHeaders.set("x-stylekit-locale", requestLocale);
    requestHeaders.set("x-stylekit-visible-path", incomingPath);
  }

  const finalizeResponse = (response: NextResponse) => {
    if (effectivePath === "/api/workspace" || effectivePath.startsWith("/api/workspace/")) {
      response.headers.set("Cache-Control", "private, no-store");
      response.headers.set("Pragma", "no-cache");
    }
    return response;
  };

  const buildResponse = () => {
    if (localeInPath) {
      if (shouldUseLocalizedFilesystemRoute(strippedPath)) {
        return finalizeResponse(NextResponse.next({
          request: { headers: requestHeaders },
        }));
      }

      if (!shouldRewriteLocalizedPath(strippedPath)) {
        return finalizeResponse(NextResponse.next({
          request: { headers: requestHeaders },
        }));
      }

      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = strippedPath;
      return finalizeResponse(NextResponse.rewrite(rewriteUrl, {
        request: { headers: requestHeaders },
      }));
    }

    return finalizeResponse(NextResponse.next({
      request: { headers: requestHeaders },
    }));
  };

  const isAdminRequest = isAdminRoute(effectivePath);
  const adminSessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  const hasAdminPasswordSession =
    await verifyAdminSessionCookieValue(adminSessionCookie);

  if (effectivePath === "/admin-login" && hasAdminPasswordSession) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin/operations";
    redirectUrl.search = "";
    return NextResponse.redirect(redirectUrl);
  }

  if (isAdminRequest && hasAdminPasswordSession) {
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

  const hasAdminDevBypass =
    process.env.NODE_ENV !== "production" &&
    process.env.ADMIN_DEV_BYPASS === "true";
  if (isAdminRequest && hasAdminDevBypass) {
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

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase is not configured, skip auth entirely
  if (!url || !key) {
    if (
      process.env.NODE_ENV === "production" &&
      isAdminRequest
    ) {
      return buildAdminLoginRedirect(request);
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

  if (!isAdminRequest && !shouldRefreshAuthSession(effectivePath)) {
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
    .some((cookie) => isSupabaseAuthCookie(cookie.name));

  if (hasAuthCookie) {
    // getClaims() refreshes expired sessions but validates current ES256 JWTs
    // locally using the project's cached JWKS. Unlike getUser(), it does not
    // make an Auth API request on every page/API request.
    const { data, error } = await supabase.auth.getClaims();
    const userId = !error && typeof data?.claims.sub === "string"
      ? data.claims.sub
      : null;

    // Protect /admin routes
    if (isAdminRequest) {
      if (!userId) {
        return buildAdminLoginRedirect(request);
      }

      if (!isAdminUserId(userId)) {
        return buildAdminLoginRedirect(request);
      }
    }
  } else if (isAdminRequest) {
    // No auth cookie + admin route = redirect immediately
    return buildAdminLoginRedirect(request);
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
