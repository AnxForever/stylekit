import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  LOCALE_COOKIE_NAME,
  addLocaleToPathname,
  detectPreferredLocale,
  getLocaleFromPathname,
  isLocale,
  shouldBypassLocale,
} from "@/lib/i18n/routing";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldBypassLocale(pathname)) return NextResponse.next();
  if (getLocaleFromPathname(pathname)) return NextResponse.next();

  const cookieLocale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  const targetLocale = isLocale(cookieLocale)
    ? cookieLocale
    : detectPreferredLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = addLocaleToPathname(pathname, targetLocale);
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
