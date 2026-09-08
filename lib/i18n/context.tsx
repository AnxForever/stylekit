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

function readPersistedLocale(): Locale | null {
  if (typeof window === "undefined") return null;

  let storedLocale: Locale | null = null;
  try {
    const rawLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
    storedLocale = rawLocale === "en" || rawLocale === "zh" ? rawLocale : null;
  } catch {
    // Ignore localStorage access issues.
  }

  // localStorage is written by the client at the same time as the cookie and
  // is not changed by server-side route prefetches. Prefer it when available
  // so a static page cannot overwrite the user's locale before hydration.
  if (storedLocale) {
    return storedLocale;
  }

  const cookiePrefix = `${LOCALE_COOKIE_NAME}=`;
  const cookieLocale = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(cookiePrefix))
    ?.slice(cookiePrefix.length);
  if (cookieLocale === "en" || cookieLocale === "zh") {
    return cookieLocale;
  }

  return null;
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
    if (!pathnameLocale) {
      const persistedLocale = readPersistedLocale();
      if (persistedLocale) {
        if (persistedLocale !== preferredLocale) {
          const timeoutId = window.setTimeout(() => {
            setPreferredLocale(persistedLocale);
          }, 0);
          return () => window.clearTimeout(timeoutId);
        }
      }
    }

    persistLocale(locale);
    return undefined;
  }, [locale, pathnameLocale, preferredLocale]);

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
