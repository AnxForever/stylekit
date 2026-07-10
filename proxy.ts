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
  ADMIN_SESSION_COOKIE_NAME,
  verifyAdminSessionCookieValue,
} from "@/lib/auth/admin-session";
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

const SOCIAL_CRAWLER_RE =
  /Twitterbot|facebookexternalhit|LinkedInBot|Slackbot|Discordbot|WhatsApp|TelegramBot|Pinterestbot|Applebot/i;

const LOCALIZED_REWRITE_EXACT = new Set([
  "/docs",
  "/guides",
  "/html-in-canvas",
  "/login",
  "/preview",
  "/privacy",
  "/profile",
  "/terms",
]);

const LOCALIZED_REWRITE_PREFIXES = [
  "/guides/",
  "/templates/",
];

function isSocialCrawler(userAgent: string): boolean {
  return SOCIAL_CRAWLER_RE.test(userAgent);
}

function shouldUseLocalizedFilesystemRoute(pathname: string): boolean {
  return (
    pathname === "/" ||
    pathname === "/changelog" ||
    pathname === "/contact" ||
    pathname === "/about" ||
    pathname === "/backgrounds" ||
    pathname === "/color-theory" ||
    pathname === "/component-patterns" ||
    pathname === "/components" ||
    pathname === "/design-principles" ||
    pathname === "/gradients" ||
    pathname === "/guide" ||
    pathname === "/learn" ||
    pathname.startsWith("/recipes") ||
    pathname === "/shadows" ||
    pathname === "/spacing" ||
    pathname === "/templates" ||
    pathname === "/type-scale" ||
    pathname === "/typography" ||
    pathname === "/visual-hierarchy" ||
    pathname.startsWith("/styles") ||
    pathname === "/colors" ||
    pathname.startsWith("/collections") ||
    pathname === "/ui-prompts" ||
    pathname === "/landing-page-prompts" ||
    pathname === "/dashboard-prompts" ||
    pathname === "/tailwind-ui-prompts" ||
    pathname === "/dark-mode-ui-prompts" ||
    pathname === "/developers" ||
    pathname === "/mouse-interactions" ||
    pathname.startsWith("/prompts") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/animations")
  );
}

function shouldRewriteLocalizedPath(pathname: string): boolean {
  return (
    LOCALIZED_REWRITE_EXACT.has(pathname) ||
    LOCALIZED_REWRITE_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  );
}

function isAdminRoute(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
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

      if (!shouldRewriteLocalizedPath(strippedPath)) {
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

  const isAdminRequest = isAdminRoute(effectivePath);
  const adminSessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  const hasAdminPasswordSession =
    await verifyAdminSessionCookieValue(adminSessionCookie);

  if (effectivePath === "/admin-login" && hasAdminPasswordSession) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin/analytics";
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
    if (isAdminRequest) {
      if (!user) {
        return buildAdminLoginRedirect(request);
      }

      if (!isAdminUserId(user.id)) {
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
