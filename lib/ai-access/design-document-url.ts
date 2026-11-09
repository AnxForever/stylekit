export type DesignDocumentLocale = "en" | "zh";

/** Shared URL builder for the one public Markdown document for a style slug. */
export function getCanonicalDesignDocumentUrl(
  baseUrl: string,
  slug: string,
  locale: DesignDocumentLocale = "en",
): string {
  return new URL(
    `/api/design/${encodeURIComponent(slug)}/design.md?locale=${locale}`,
    baseUrl,
  ).toString();
}
