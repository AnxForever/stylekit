"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { changelog } from "@/lib/changelog";
import { useI18n } from "@/lib/i18n/context";

const STORAGE_KEY = "sk-announcement-dismissed";

export function AnnouncementBanner() {
  const { t, locale } = useI18n();
  const latest = changelog[0];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!latest) return;
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading localStorage on mount
      if (dismissed !== latest.version) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, [latest]);

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, latest?.version ?? "");
    } catch {
      // ignore
    }
  }, [latest]);

  if (!latest || !visible) return null;

  const title = locale === "zh" && latest.titleZh ? latest.titleZh : latest.title;

  return (
    <div
      role="banner"
      className="sticky top-0 z-50 flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium bg-foreground text-background"
    >
      <span className="hidden sm:inline text-xs tracking-widest uppercase opacity-60">
        {t("changelog.badge")}
      </span>
      <span className="truncate max-w-md">
        v{latest.version} — {title}
      </span>
      <Link
        href={`/${locale}/changelog`}
        className="shrink-0 underline underline-offset-2 opacity-80 hover:opacity-100 transition-opacity"
      >
        {locale === "zh" ? "详情" : "Details"}
      </Link>
      <button
        type="button"
        onClick={dismiss}
        className="shrink-0 ml-2 opacity-60 hover:opacity-100 transition-opacity"
        aria-label={locale === "zh" ? "关闭公告" : "Dismiss announcement"}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M1 1l12 12M13 1L1 13" />
        </svg>
      </button>
    </div>
  );
}
