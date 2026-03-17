"use client";

import { useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";

const LANG_MAP: Record<string, string> = {
  en: "en",
  zh: "zh-CN",
};

export function HtmlLangUpdater() {
  const { locale } = useI18n();

  useEffect(() => {
    const lang = LANG_MAP[locale] || "en";
    document.documentElement.lang = lang;
  }, [locale]);

  return null;
}
