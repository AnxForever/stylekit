import { headers } from "next/headers";
import type { Locale } from "./translations";
import {
  DEFAULT_LOCALE,
  getAlternateLocalePath,
  getBaseUrl,
  getLocaleFromPathname,
  getLocaleHtmlLang,
  getLocalizedPathname,
  getOpenGraphLocale,
  isLocale,
  LOCALES,
  shouldBypassLocale,
  stripLocaleFromPathname,
} from "./routing";

export interface RequestLocaleContext {
  locale: Locale;
  localePath: string;
  contentPath: string;
  canonicalUrl: string;
  languageAlternates: Record<string, string>;
  htmlLang: string;
  openGraphLocale: string;
  baseUrl: string;
}

export async function getRequestLocaleContext(): Promise<RequestLocaleContext> {
  const headerStore = await headers();
  const visiblePathHeader = headerStore.get("x-stylekit-visible-path");
  const localeHeader = headerStore.get("x-stylekit-locale");
  const baseUrl = getBaseUrl();

  const visiblePath = visiblePathHeader || "/";
  const isBypassedPath = shouldBypassLocale(visiblePath);
  const locale =
    (isLocale(localeHeader) ? localeHeader : getLocaleFromPathname(visiblePath)) ||
    DEFAULT_LOCALE;
  const contentPath = getLocaleFromPathname(visiblePath)
    ? stripLocaleFromPathname(visiblePath)
    : visiblePath;
  const localePath = isBypassedPath
    ? contentPath
    : getLocalizedPathname(contentPath, locale);

  return {
    locale,
    localePath,
    contentPath,
    canonicalUrl: `${baseUrl}${localePath}`,
    languageAlternates: isBypassedPath
      ? {}
      : Object.fromEntries(
          LOCALES.map((entry) => [
            getLocaleHtmlLang(entry),
            `${baseUrl}${getAlternateLocalePath(contentPath, entry)}`,
          ])
        ),
    htmlLang: getLocaleHtmlLang(locale),
    openGraphLocale: getOpenGraphLocale(locale),
    baseUrl,
  };
}
