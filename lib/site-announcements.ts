import "server-only";

import { changelog } from "@/lib/changelog";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export type SiteAnnouncementLocale = "zh-CN" | "en";

export interface SiteAnnouncement {
  id: string;
  locale: SiteAnnouncementLocale;
  enabled: boolean;
  title: string;
  body: string;
  ctaLabel: string | null;
  ctaHref: string | null;
  startsAt: string | null;
  endsAt: string | null;
  updatedAt: string | null;
}

interface SiteAnnouncementRow {
  locale: SiteAnnouncementLocale;
  enabled: boolean;
  title: string;
  body: string;
  cta_label: string | null;
  cta_href: string | null;
  starts_at: string | null;
  ends_at: string | null;
  updated_at: string | null;
}

export async function getSiteAnnouncement(
  locale: SiteAnnouncementLocale,
): Promise<SiteAnnouncement | null> {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { data, error } = await supabase
      .from("site_announcements")
      .select("locale, enabled, title, body, cta_label, cta_href, starts_at, ends_at, updated_at")
      .eq("locale", locale)
      .maybeSingle();

    if (!error && data) {
      const row = data as SiteAnnouncementRow;
      const announcement = toSiteAnnouncement(row);
      return isCurrentlyActive(announcement) ? announcement : null;
    }
  }

  return getChangelogFallback(locale);
}

export function toSiteAnnouncement(row: SiteAnnouncementRow): SiteAnnouncement {
  return {
    id: `site-announcement:${row.locale}`,
    locale: row.locale,
    enabled: row.enabled,
    title: row.title,
    body: row.body,
    ctaLabel: row.cta_label,
    ctaHref: row.cta_href,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    updatedAt: row.updated_at,
  };
}

export function isCurrentlyActive(
  announcement: Pick<SiteAnnouncement, "enabled" | "startsAt" | "endsAt">,
  now = Date.now(),
): boolean {
  if (!announcement.enabled) return false;
  const startsAt = announcement.startsAt ? Date.parse(announcement.startsAt) : null;
  const endsAt = announcement.endsAt ? Date.parse(announcement.endsAt) : null;
  if (startsAt != null && Number.isFinite(startsAt) && startsAt > now) return false;
  if (endsAt != null && Number.isFinite(endsAt) && endsAt <= now) return false;
  return true;
}

function getChangelogFallback(locale: SiteAnnouncementLocale): SiteAnnouncement | null {
  const latest = changelog[0];
  if (!latest) return null;

  const isChinese = locale === "zh-CN";
  return {
    id: `changelog:${latest.version}:${locale}`,
    locale,
    enabled: true,
    title: `v${latest.version} — ${isChinese && latest.titleZh ? latest.titleZh : latest.title}`,
    body: isChinese
      ? latest.changes.map((change) => change.descriptionZh ?? change.description).join("；")
      : latest.changes.map((change) => change.description).join("; "),
    ctaLabel: isChinese ? "查看详情" : "View details",
    ctaHref: `/${isChinese ? "zh" : "en"}/changelog`,
    startsAt: null,
    endsAt: null,
    updatedAt: null,
  };
}
