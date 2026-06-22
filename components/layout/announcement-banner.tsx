"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { changelog } from "@/lib/changelog";
import { useI18n } from "@/lib/i18n/context";
import {
  CHANGELOG_SEEN_STORAGE_KEY,
  isChangelogPath,
  markLatestChangelogSeen,
} from "@/lib/changelog/read-state";

export function AnnouncementBanner() {
  const { t, locale } = useI18n();
  const pathname = usePathname();
  const latest = changelog[0];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!latest) return;
    if (isChangelogPath(pathname)) {
      markLatestChangelogSeen();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- route-derived notification state
      setVisible(false);
      return;
    }

    try {
      const dismissed = localStorage.getItem(CHANGELOG_SEEN_STORAGE_KEY);
      if (dismissed !== latest.version) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, [latest, pathname]);

  const dismiss = useCallback(() => {
    setVisible(false);
    markLatestChangelogSeen();
  }, []);

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
        onClick={dismiss}
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
