import type { Locale } from "./translations";
import { getSiteBaseUrl } from "@/lib/site-url";

export const LOCALES: Locale[] = ["en", "zh"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE_NAME = "stylekit-locale";

const FILE_EXTENSION_RE = /\.[^/]+$/;
const NON_LOCALIZED_PREFIXES = [
  "/api",
  "/admin",
  "/_next",
  "/api-test",
];
const NON_LOCALIZED_EXACT = new Set([
  "/admin-login",
  "/favicon.ico",
  "/manifest.json",
  "/robots.txt",
  "/sitemap.xml",
  "/llms.md",
  "/llms-full.txt",
  "/opengraph-image",
]);

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "zh";
}

export function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  if (pathname === "/") return pathname;

  return pathname.endsWith("/") ? pathname.slice(0, -1) || "/" : pathname;
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const normalized = normalizePathname(pathname);
  const firstSegment = normalized.split("/")[1];
  return isLocale(firstSegment) ? firstSegment : null;
}

export function stripLocaleFromPathname(pathname: string): string {
  const normalized = normalizePathname(pathname);
  const locale = getLocaleFromPathname(normalized);
  if (!locale) return normalized;

  const stripped = normalized.slice(locale.length + 1);
  return stripped ? stripped : "/";
}

export function addLocaleToPathname(pathname: string, locale: Locale): string {
  const normalized = normalizePathname(pathname);
  const stripped = stripLocaleFromPathname(normalized);

  return stripped === "/" ? `/${locale}` : `/${locale}${stripped}`;
}

export function getLocalizedPathname(pathname: string, locale: Locale): string {
  return addLocaleToPathname(pathname, locale);
}

export function getAlternateLocalePath(pathname: string, locale: Locale): string {
  return addLocaleToPathname(pathname, locale);
}

export function localizeHref(href: string, locale: Locale): string {
  if (
    !href ||
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("#")
  ) {
    return href;
  }

  const hashIndex = href.indexOf("#");
  const queryIndex = href.indexOf("?");
  const splitIndex = [hashIndex, queryIndex]
    .filter((index) => index >= 0)
    .sort((left, right) => left - right)[0] ?? href.length;

  const pathname = href.slice(0, splitIndex) || "/";
  const suffix = href.slice(splitIndex);

  return `${addLocaleToPathname(pathname, locale)}${suffix}`;
}

export function shouldBypassLocale(pathname: string): boolean {
  const normalized = normalizePathname(pathname);

  if (NON_LOCALIZED_EXACT.has(normalized)) return true;
  if (normalized.startsWith("/feed/")) return true;
  if (FILE_EXTENSION_RE.test(normalized)) return true;
  // Next.js generated image routes (opengraph-image, twitter-image, icon, etc.)
  if (/\/(opengraph-image|twitter-image|icon)\b/.test(normalized)) return true;

  return NON_LOCALIZED_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}

export function detectPreferredLocale(
  acceptLanguageHeader: string | null | undefined
): Locale {
  if (!acceptLanguageHeader) return DEFAULT_LOCALE;

  const normalized = acceptLanguageHeader.toLowerCase();
  if (normalized.includes("zh")) return "zh";

  return DEFAULT_LOCALE;
}

export function getBaseUrl(): string {
  return getSiteBaseUrl();
}

export function getLocaleHtmlLang(locale: Locale): string {
  return locale === "zh" ? "zh-CN" : "en";
}

export function getOpenGraphLocale(locale: Locale): string {
  return locale === "zh" ? "zh_CN" : "en_US";
}
