import type { Locale } from "./translations";
import { getSiteBaseUrl } from "@/lib/site-url";

export const LOCALES: Locale[] = ["en", "zh"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE_NAME = "stylekit-locale";

export type LocaleRouteMode = "filesystem" | "rewrite";
export type LocaleSitemapLocales = "all" | "en" | "none";

export interface LocaleRouteRule {
  readonly id: string;
  readonly mode: LocaleRouteMode;
  readonly sitemapLocales: LocaleSitemapLocales;
  readonly exact: readonly string[];
  readonly prefixes: readonly string[];
}

/**
 * The single source of truth for locale-prefixed public routes.
 *
 * `filesystem` routes resolve under `app/[locale]` while `rewrite` routes
 * resolve to an English-only or shared root implementation. `sitemapLocales`
 * describes which language variants are indexable; it is intentionally
 * separate from reachability because some shared pages are English-only.
 */
export const LOCALE_ROUTE_POLICY = [
  {
    id: "localized-pages",
    mode: "filesystem",
    sitemapLocales: "all",
    exact: [
      "/",
      "/about",
      "/backgrounds",
      "/changelog",
      "/color-theory",
      "/colors",
      "/component-patterns",
      "/components",
      "/contact",
      "/dark-mode-ui-prompts",
      "/dashboard-prompts",
      "/design-principles",
      "/developers",
      "/gradients",
      "/guide",
      "/landing-page-prompts",
      "/learn",
      "/liquid-glass",
      "/launch",
      "/mouse-interactions",
      "/shadows",
      "/spacing",
      "/tailwind-ui-prompts",
      "/templates",
      "/type-scale",
      "/typography",
      "/ui-prompts",
      "/visual-hierarchy",
    ],
    prefixes: ["/animations", "/collections", "/prompts", "/recipes", "/styles"],
  },
  {
    id: "english-blog",
    mode: "filesystem",
    sitemapLocales: "en",
    exact: [],
    prefixes: ["/blog"],
  },
  {
    id: "localized-template-details",
    mode: "rewrite",
    sitemapLocales: "all",
    exact: [],
    prefixes: ["/templates"],
  },
  {
    id: "english-guides",
    mode: "rewrite",
    sitemapLocales: "en",
    exact: ["/guides"],
    prefixes: ["/guides"],
  },
  {
    id: "english-color-details",
    mode: "rewrite",
    sitemapLocales: "en",
    exact: [],
    prefixes: ["/colors"],
  },
  {
    id: "english-indexable-aliases",
    mode: "rewrite",
    sitemapLocales: "en",
    exact: ["/privacy", "/terms", "/refunds", "/support"],
    prefixes: [],
  },
  {
    id: "shared-noindex-aliases",
    mode: "rewrite",
    sitemapLocales: "none",
    exact: [
      "/docs",
      "/html-in-canvas",
      "/kit",
      "/kit/shared",
      "/login",
      "/preview",
      "/profile",
    ],
    prefixes: [],
  },
] as const satisfies readonly LocaleRouteRule[];

const FILE_EXTENSION_RE = /\.[^/]+$/;
const NON_LOCALIZED_PREFIXES = [
  "/api",
  "/admin",
  "/experiments",
  "/validation",
  "/workspace",
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

export type LocaleRouteStrategy = LocaleRouteMode | "bypass" | "unmatched";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "zh";
}

export function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  if (pathname === "/") return pathname;

  return pathname.endsWith("/") ? pathname.slice(0, -1) || "/" : pathname;
}

function matchesRouteRule(pathname: string, rule: LocaleRouteRule): boolean {
  const normalized = normalizePathname(pathname);
  if (rule.exact.includes(normalized)) return true;

  return rule.prefixes.some((prefix) => {
    const normalizedPrefix = normalizePathname(prefix);
    return (
      normalized === normalizedPrefix ||
      normalized.startsWith(`${normalizedPrefix}/`)
    );
  });
}

export function getLocaleRouteRule(pathname: string): LocaleRouteRule | null {
  return LOCALE_ROUTE_POLICY.find((rule) => matchesRouteRule(pathname, rule)) ?? null;
}

export function getLocaleRouteStrategy(pathname: string): LocaleRouteStrategy {
  if (shouldBypassLocale(pathname)) return "bypass";
  return getLocaleRouteRule(pathname)?.mode ?? "unmatched";
}

export function getIndexableLocalesForPath(pathname: string): readonly Locale[] {
  if (shouldBypassLocale(pathname)) return [];

  const rule = getLocaleRouteRule(pathname);
  if (!rule || rule.sitemapLocales === "none") return [];
  return rule.sitemapLocales === "all" ? LOCALES : [DEFAULT_LOCALE];
}

export function shouldUseLocalizedFilesystemRoute(pathname: string): boolean {
  return getLocaleRouteStrategy(pathname) === "filesystem";
}

export function shouldRewriteLocalizedPath(pathname: string): boolean {
  return getLocaleRouteStrategy(pathname) === "rewrite";
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
  // Curated Showcase pages have dedicated per-style implementations. Routing
  // them through /[locale]/styles/[slug]/showcase replaces that approved page
  // with the generic dynamic fallback.
  if (/^\/styles\/[^/]+\/showcase$/.test(normalized)) return true;
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
