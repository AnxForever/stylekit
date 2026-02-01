"use client";

import { useI18n } from "@/lib/i18n/context";
import { Locale } from "@/lib/i18n/translations";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  const languages: { code: Locale; label: string }[] = [
    { code: "zh", label: "中" },
    { code: "en", label: "EN" },
  ];

  return (
    <div className="flex items-center border border-border rounded-md overflow-hidden text-xs">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLocale(lang.code)}
          className={`px-2 py-1 transition-colors ${
            locale === lang.code
              ? "bg-foreground text-background"
              : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
