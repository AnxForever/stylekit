"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import type { SiteAnnouncement } from "@/lib/site-announcements";

export interface AnnouncementBannerCopy {
  en: SiteAnnouncement | null;
  zh: SiteAnnouncement | null;
}

/**
 * Both locales are passed so statically rendered pages can select the right
 * announcement from the payload instead of relying on request headers.
 */
export function AnnouncementBanner({
  announcements,
}: {
  announcements?: AnnouncementBannerCopy;
}) {
  const { t, locale } = useI18n();
  const pathname = usePathname();
  // Render the banner in the initial HTML so it occupies its final 40px before
  // first paint. A head bootstrap hides previously dismissed announcements
  // before the body is painted, avoiding the full-page layout shift caused by
  // inserting the banner after hydration.
  const [visible, setVisible] = useState(true);
  const announcement = announcements
    ? locale === "zh"
      ? announcements.zh
      : announcements.en
    : null;
  const isIsolatedSurface =
    pathname.includes("/admin") ||
    pathname.startsWith("/validation/") ||
    pathname.startsWith("/workspace");
  const isAnnouncementRoute =
    announcement !== null &&
    (pathname === announcement.ctaHref || pathname?.endsWith("/changelog"));

  useEffect(() => {
    if (!announcement) return;
    if (isAnnouncementRoute) return;

    try {
      const dismissed = localStorage.getItem(getDismissKey(announcement.id));
      document.documentElement.dataset.siteAnnouncementDismissed =
        dismissed === "1" ? "true" : "false";
    } catch {
      document.documentElement.dataset.siteAnnouncementDismissed = "false";
    }
  }, [announcement, isAnnouncementRoute]);

  const dismiss = useCallback(() => {
    setVisible(false);
    document.documentElement.dataset.siteAnnouncementDismissed = "true";
    if (!announcement) return;
    try {
      localStorage.setItem(getDismissKey(announcement.id), "1");
    } catch {
      // localStorage may be unavailable in private or restricted contexts.
    }
  }, [announcement]);

  if (!announcement || !visible || isIsolatedSurface || isAnnouncementRoute) return null;
  const ctaLabel = announcement.ctaLabel || (locale === "zh" ? "查看详情" : "View details");

  return (
    <div
      role="banner"
      data-site-announcement
      className="sticky top-0 z-50 flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium bg-foreground text-background"
    >
      <span className="hidden sm:inline text-xs tracking-widest uppercase opacity-60">
        {t("changelog.badge")}
      </span>
      <span className="truncate max-w-md">
        {announcement.title}
      </span>
      {announcement.body ? (
        <span
          className="hidden max-w-xl truncate text-xs font-normal opacity-70 md:inline"
          title={announcement.body}
        >
          {announcement.body}
        </span>
      ) : null}
      <Link
        href={announcement.ctaHref || `/${locale}/changelog`}
        prefetch={false}
        onClick={dismiss}
        className="shrink-0 underline underline-offset-2 opacity-80 hover:opacity-100 transition-opacity"
      >
        {ctaLabel}
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

function getDismissKey(id: string): string {
  return `sk-site-announcement-dismissed:${id}`;
}
