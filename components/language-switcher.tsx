"use client";

import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import { Locale } from "@/lib/i18n/translations";
import { localizeHref } from "@/lib/i18n/routing";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  const languages: { code: Locale; label: string }[] = [
    { code: "zh", label: "中" },
    { code: "en", label: "EN" },
  ];

  return (
    <div className="flex items-center border border-border rounded-md overflow-hidden text-xs">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => {
            setLocale(lang.code);
            const currentPath = typeof window === "undefined"
              ? pathname || "/"
              : `${window.location.pathname}${window.location.search}${window.location.hash}`;
            router.push(localizeHref(currentPath, lang.code));
          }}
          className={`w-9 py-1 text-center transition-colors ${
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
