import type { Locale } from "./translations";

export type LocaleCopy<T> = Record<Locale, T>;

export type LocalizedOption = {
  labelZh: string;
  labelEn: string;
};

export type LocalizedOptionWithDescription = LocalizedOption & {
  descriptionZh: string;
  descriptionEn: string;
};

export function pickLocale<TMap extends Record<Locale, unknown>>(
  locale: Locale,
  copy: TMap
): TMap[Locale] {
  return copy[locale];
}

export function pickOptionLabel(locale: Locale, option: LocalizedOption): string {
  return locale === "zh" ? option.labelZh : option.labelEn;
}

export function pickOptionDescription(
  locale: Locale,
  option: LocalizedOptionWithDescription
): string {
  return locale === "zh" ? option.descriptionZh : option.descriptionEn;
}

export function formatLocaleDateTime(
  value: string,
  locale: Locale,
  fallback = "unknown time"
): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return date.toLocaleString(locale === "zh" ? "zh-CN" : "en-US", { hour12: false });
}
