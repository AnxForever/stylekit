import type { Metadata } from "next";
import type { Locale } from "./translations";
import type { RequestLocaleContext } from "./request";
import {
  getBaseUrl,
  getLocaleHtmlLang,
  getOpenGraphLocale,
  localizeHref,
  DEFAULT_LOCALE,
  LOCALES,
} from "./routing";

export function getLocaleAlternates(pathname: string): Record<string, string> {
  const baseUrl = getBaseUrl();

  const localized = LOCALES.map(
    (locale) =>
      [
        getLocaleHtmlLang(locale),
        `${baseUrl}${localizeHref(pathname, locale)}`,
      ] as const
  );

  // x-default points search engines at the canonical fallback (default locale)
  // when no language match is found. Required for correct international indexing.
  return Object.fromEntries([
    ...localized,
    ["x-default", `${baseUrl}${localizeHref(pathname, DEFAULT_LOCALE)}`],
  ]);
}

export function localizeMetadata(
  metadata: Metadata,
  locale: Locale,
  pathname: string
): Metadata {
  const canonical = `${getBaseUrl()}${localizeHref(pathname, locale)}`;

  const result: Metadata = {
    ...metadata,
    alternates: {
      ...(metadata.alternates ?? {}),
      canonical,
      languages: getLocaleAlternates(pathname),
    },
  };

  result.openGraph = {
    ...(metadata.openGraph ?? {}),
    url: canonical,
    locale: getOpenGraphLocale(locale),
    alternateLocale: LOCALES.filter((entry) => entry !== locale).map((entry) =>
      getOpenGraphLocale(entry)
    ),
  };

  return result;
}

/**
 * Use for content that is currently published in English only. Locale-prefixed
 * aliases may remain reachable, but must not claim translated equivalence.
 */
export function canonicalizeEnglishMetadata(
  metadata: Metadata,
  pathname: string
): Metadata {
  const canonical = `${getBaseUrl()}${localizeHref(pathname, DEFAULT_LOCALE)}`;

  return {
    ...metadata,
    alternates: {
      canonical,
    },
    openGraph: {
      ...(metadata.openGraph ?? {}),
      url: canonical,
      locale: getOpenGraphLocale(DEFAULT_LOCALE),
      alternateLocale: [],
    },
  };
}

export function applyRequestMetadata(
  metadata: Metadata,
  context: RequestLocaleContext
): Metadata {
  return {
    ...metadata,
    alternates: {
      ...(metadata.alternates ?? {}),
      canonical: context.canonicalUrl,
      ...(Object.keys(context.languageAlternates).length
        ? { languages: context.languageAlternates }
        : {}),
    },
    openGraph: {
      ...(metadata.openGraph ?? {}),
      url: context.canonicalUrl,
      locale: context.openGraphLocale,
      alternateLocale: context.locale === "zh" ? ["en_US"] : ["zh_CN"],
    },
  };
}
