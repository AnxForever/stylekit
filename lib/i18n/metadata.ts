import type { Metadata } from "next";
import type { Locale } from "./translations";
import {
  getBaseUrl,
  getLocaleHtmlLang,
  localizeHref,
  LOCALES,
} from "./routing";

export function getLocaleAlternates(pathname: string): Record<string, string> {
  const baseUrl = getBaseUrl();

  return Object.fromEntries(
    LOCALES.map((locale) => [
      getLocaleHtmlLang(locale),
      `${baseUrl}${localizeHref(pathname, locale)}`,
    ])
  );
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
