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

// Search-engine and AI crawlers verify ownership and index against the exact
// URL they request — they do not follow the 307 locale negotiation the way a
// browser does. Baidu's site-verification fetch of `/` in particular fails
// outright on a 307 ("未知原因:307"). Treat them like social crawlers at the
// root: serve the default-locale content (with its meta tags) in place instead
// of redirecting, while humans keep the language-negotiated 307 below.
const SEARCH_CRAWLER_RE =
  /Baiduspider|bingbot|BingPreview|Googlebot|Google-InspectionTool|DuckDuckBot|YandexBot|Sogou|360Spider|Bytespider|GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-Web|Claude-SearchBot|PerplexityBot|Perplexity-User|CCBot|Applebot-Extended|meta-externalagent/i;

function isSocialCrawler(userAgent: string): boolean {
  return SOCIAL_CRAWLER_RE.test(userAgent);
}

function isContentCrawler(userAgent: string): boolean {
  return SOCIAL_CRAWLER_RE.test(userAgent) || SEARCH_CRAWLER_RE.test(userAgent);
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

function isPrefetchRequest(request: NextRequest): boolean {
  return (
    request.headers.has("next-router-prefetch") ||
    request.headers.get("purpose") === "prefetch"
  );
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
  const prefetchRequest = isPrefetchRequest(request);
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

  if (
    !localeInPath &&
    !shouldBypassLocale(incomingPath) &&
    effectivePath.startsWith("/colors")
  ) {
    // Unprefixed /colors/* has no language-negotiated value for crawlers:
    // Googlebot (no cookie, no Accept-Language) saw both /en/ and /zh/ as
    // 307 targets on different crawls and keeps the unprefixed URL indexed
    // as a locale selector, splitting impressions between /colors/x and
    // /en/colors/x. Answer language-less requests with a deterministic
    // permanent redirect; humans with a language preference keep the 307
    // negotiation below.
    const ua = request.headers.get("user-agent") || "";
    const hasLanguagePreference =
      isLocale(localeCookieValue) ||
      Boolean(request.headers.get("accept-language"));
    if (!isSocialCrawler(ua) && !hasLanguagePreference) {
      const permanentUrl = request.nextUrl.clone();
      permanentUrl.pathname = addLocaleToPathname(incomingPath, DEFAULT_LOCALE);
      return NextResponse.redirect(permanentUrl, 308);
    }
  }

  if (!localeInPath && !shouldBypassLocale(incomingPath)) {
    // Social AND search/AI crawlers should get content directly without the
    // locale redirect. They index/verify against the requested URL and do not
    // follow the 307 the way a browser does — Baidu's `/` verification fetch
    // fails on it outright. Serve default-locale content with its meta tags in
    // place; humans fall through to the language-negotiated 307 below.
    const ua = request.headers.get("user-agent") || "";
    if (isContentCrawler(ua)) {
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
    if (localeInPath && !prefetchRequest) {
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
    if (localeInPath && !prefetchRequest) {
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
    if (localeInPath && !prefetchRequest) {
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
    if (localeInPath && !prefetchRequest) {
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

  if (localeInPath && !prefetchRequest) {
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
