"use client";

import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import { Locale, translations, TranslationKey } from "./translations";
import {
  getLocaleFromPathname,
  LOCALE_COOKIE_NAME,
} from "./routing";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

const DEFAULT_LOCALE: Locale = "en";
const LOCALE_STORAGE_KEY = "stylekit-locale";

function persistLocale(locale: Locale) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Ignore localStorage access issues.
  }

  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

export function I18nProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: Locale;
}) {
  const pathname = usePathname();
  const [preferredLocale, setPreferredLocale] = useState<Locale>(initialLocale);
  const pathnameLocale = pathname ? getLocaleFromPathname(pathname) : null;
  const locale = pathnameLocale ?? preferredLocale ?? DEFAULT_LOCALE;

  useEffect(() => {
    persistLocale(locale);
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setPreferredLocale(newLocale);
    persistLocale(newLocale);
  };

  const t = (key: TranslationKey): string => {
    return translations[locale][key] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

export function useTranslation() {
  const { t } = useI18n();
  return t;
}
