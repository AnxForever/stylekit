"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Locale, translations, TranslationKey } from "./translations";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("zh");
  const [mounted, setMounted] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  // Required pattern for SSR hydration with localStorage
  useEffect(() => {
    setMounted(true);
    // Load saved locale from localStorage
    const savedLocale = localStorage.getItem("stylekit-locale") as Locale | null;
    if (savedLocale && (savedLocale === "zh" || savedLocale === "en")) {
      setLocaleState(savedLocale);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("stylekit-locale", newLocale);
  };

  const t = (key: TranslationKey): string => {
    return translations[locale][key] || key;
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <I18nContext.Provider value={{ locale: "zh", setLocale, t }}>
        {children}
      </I18nContext.Provider>
    );
  }

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
