import type { Metadata } from "next";
import type { Locale } from "./translations";
import {
  getBaseUrl,
  getLocaleHtmlLang,
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

  if (metadata.openGraph) {
    result.openGraph = {
      ...metadata.openGraph,
      url: canonical,
    };
  }

  return result;
}
