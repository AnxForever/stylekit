import { en } from "./translations-en";
import { zh } from "./translations-zh";

export type Locale = "zh" | "en";

export const translations = {
  zh,
  en,
} as const;

export type TranslationKey = keyof typeof translations.zh;

type MissingTranslationKeysInEn = Exclude<
  keyof typeof translations.zh,
  keyof typeof translations.en
>;
type MissingTranslationKeysInZh = Exclude<
  keyof typeof translations.en,
  keyof typeof translations.zh
>;
type TranslationKeyParity = [MissingTranslationKeysInEn, MissingTranslationKeysInZh] extends [
  never,
  never,
]
  ? true
  : false;
type Assert<T extends true> = T;

// Compile-time guard: zh/en translation key sets must remain identical.
export type TranslationKeyParityCheck = Assert<TranslationKeyParity>;
