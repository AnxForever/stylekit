"use client";

import { Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import { Locale } from "@/lib/i18n/translations";
import { localizeHref } from "@/lib/i18n/routing";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  const target: Locale = locale === "zh" ? "en" : "zh";
  const label = locale === "zh" ? "Switch to English" : "切换到中文";

  return (
    <button
      onClick={() => {
        setLocale(target);
        const currentPath = typeof window === "undefined"
          ? pathname || "/"
          : `${window.location.pathname}${window.location.search}${window.location.hash}`;
        // scroll: false — swapping locale keeps the reader's place on the page.
        router.push(localizeHref(currentPath, target), { scroll: false });
      }}
      aria-label={label}
      title={label}
      className="p-2 text-muted hover:text-foreground transition-colors"
    >
      <Languages size={18} strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
}
