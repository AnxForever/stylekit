import type { StylePreviewLocale } from "./types";

/**
 * Picks the sample copy a cover preview should render.
 *
 * Previews illustrate a visual style, so their text is decorative rather than
 * product copy. Generic captions still need to follow the surrounding page
 * language; culture-specific specimens (Japanese, Chinese, Korean samples in
 * their own styles) are passed the same string for both locales on purpose.
 */
export function previewCopy(
  locale: StylePreviewLocale | undefined,
  zh: string,
  en: string,
): string {
  return locale === "zh" ? zh : en;
}
