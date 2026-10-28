import "server-only";
import { createHash } from "node:crypto";

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

const ANNOUNCEMENT_CACHE_TTL_MS = 60 * 1000;

interface AnnouncementCacheEntry {
  expiresAt: number;
  value: Promise<SiteAnnouncement | null>;
}

// There are only two locale keys. A tiny process-local TTL cache avoids one
// Supabase round trip on every page render while keeping scheduled changes
// fresh. Concurrent requests share the same in-flight promise as well.
const announcementCache = new Map<
  SiteAnnouncementLocale,
  AnnouncementCacheEntry
>();

export async function getSiteAnnouncement(
  locale: SiteAnnouncementLocale,
): Promise<SiteAnnouncement | null> {
  const now = Date.now();
  const cached = announcementCache.get(locale);
  if (cached && cached.expiresAt > now) {
    return cached.value;
  }

  const value = loadSiteAnnouncement(locale);
  const entry = { expiresAt: now + ANNOUNCEMENT_CACHE_TTL_MS, value };
  announcementCache.set(locale, entry);

  // Do not retain a rejected promise. The next request should be allowed to
  // retry the database instead of failing for the full TTL.
  void value.catch(() => {
    if (announcementCache.get(locale) === entry) {
      announcementCache.delete(locale);
    }
  });

  return value;
}

export function clearSiteAnnouncementCache(
  locale?: SiteAnnouncementLocale,
): void {
  if (locale) {
    announcementCache.delete(locale);
    return;
  }
  announcementCache.clear();
}

async function loadSiteAnnouncement(
  locale: SiteAnnouncementLocale,
): Promise<SiteAnnouncement | null> {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("site_announcements")
        .select("locale, enabled, title, body, cta_label, cta_href, starts_at, ends_at, updated_at")
        .eq("locale", locale)
        .maybeSingle();

      if (!error && data) {
        const row = data as SiteAnnouncementRow;
        const releaseTime = Date.parse(changelog[0]?.announcement?.publishedAt ?? "");
        const configuredTime = Date.parse(row.updated_at ?? "");
        // Static pages must contain the new release notice at build time;
        // do not invalidate the site's entire route cache to publish a notice.
        // A later admin campaign still takes precedence over the bundled one.
        if (Number.isFinite(releaseTime) && (!Number.isFinite(configuredTime) || configuredTime < releaseTime)) {
          return getChangelogFallback(locale);
        }
        const announcement = toSiteAnnouncement(row);
        return isCurrentlyActive(announcement) ? announcement : null;
      }
    } catch {
      // A transient content-database outage must not take down every public
      // page. The bundled changelog remains a truthful fallback.
    }
  }

  return getChangelogFallback(locale);
}

export function toSiteAnnouncement(row: SiteAnnouncementRow): SiteAnnouncement {
  const release = getChangelogFallback(row.locale);
  const matchesRelease = release && row.enabled && !row.starts_at && !row.ends_at
    && row.title === release.title && row.body === release.body
    && row.cta_label === release.ctaLabel && row.cta_href === release.ctaHref;
  return {
    id: matchesRelease ? release.id : `site-announcement:${row.locale}:${row.updated_at ?? createHash("sha256").update(JSON.stringify(row)).digest("hex").slice(0, 16)}`,
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
    body: latest.announcement
      ? isChinese ? latest.announcement.bodyZh ?? latest.announcement.body : latest.announcement.body
      : isChinese
      ? latest.changes.map((change) => change.descriptionZh ?? change.description).join("；")
      : latest.changes.map((change) => change.description).join("; "),
    ctaLabel: latest.announcement
      ? isChinese ? latest.announcement.labelZh ?? latest.announcement.label : latest.announcement.label
      : isChinese ? "查看详情" : "View details",
    ctaHref: `/${isChinese ? "zh" : "en"}${latest.announcement?.href ?? "/changelog"}`,
    startsAt: null,
    endsAt: null,
    updatedAt: null,
  };
}
