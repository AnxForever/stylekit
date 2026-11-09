import { createHash } from "node:crypto";

export type SiteAnnouncementRevisionLocale = "zh-CN" | "en";

export interface SiteAnnouncementRevisionInput {
  locale: SiteAnnouncementRevisionLocale;
  enabled: boolean;
  title: string;
  body: string;
  cta_label: string | null;
  cta_href: string | null;
  starts_at: string | null;
  ends_at: string | null;
}

export function getSiteAnnouncementRevisionId(
  announcement: SiteAnnouncementRevisionInput,
): string {
  const revision = {
    locale: announcement.locale,
    enabled: announcement.enabled,
    title: announcement.title.replace(/\s+/g, " ").trim(),
    body: announcement.body.replace(/\s+/g, " ").trim(),
    ctaLabel: announcement.cta_label?.replace(/\s+/g, " ").trim() || null,
    ctaHref: announcement.cta_href?.trim() || null,
    startsAt: normalizeAnnouncementDate(announcement.starts_at),
    endsAt: normalizeAnnouncementDate(announcement.ends_at),
  };
  const digest = createHash("sha256").update(JSON.stringify(revision)).digest("hex");
  return `site-announcement:${announcement.locale}:${digest}`;
}

function normalizeAnnouncementDate(value: string | null): string | null {
  if (!value) return null;
  const milliseconds = Date.parse(value);
  return Number.isFinite(milliseconds)
    ? new Date(milliseconds).toISOString()
    : value;
}
