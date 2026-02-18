"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

export function TemplateBackButton() {
  const { t } = useI18n();

  return (
    <div className="fixed top-3 right-4 z-[9999]">
      <Link
        href="/templates"
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-black/90 text-white text-sm font-medium rounded-lg shadow-lg backdrop-blur-sm hover:bg-black transition-colors dark:bg-white/90 dark:text-black dark:hover:bg-white"
      >
        <ArrowLeft className="w-4 h-4" />
        {t("templates.backToList")}
      </Link>
    </div>
  );
}
