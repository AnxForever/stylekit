/**
 * Locale-aware content helpers for DesignStyle fields.
 *
 * When locale is "en" and an English variant exists, return it.
 * Otherwise fall back to the Chinese (default) value.
 */

export function localizedString(
  locale: "zh" | "en",
  zh: string,
  en?: string | null
): string {
  if (locale === "en" && en) {
    return en;
  }
  return zh;
}

export function localizedList(
  locale: "zh" | "en",
  zh: string[],
  en?: string[] | null
): string[] {
  if (locale === "en" && en && en.length > 0) {
    return en;
  }
  return zh;
}
