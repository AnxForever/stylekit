export type SiteAnnouncementWriteLocale = "zh-CN" | "en";

export interface SiteAnnouncementWriteInput {
  locale: SiteAnnouncementWriteLocale;
  enabled: boolean;
  title: string;
  body: string;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  startsAt?: string | null;
  endsAt?: string | null;
}

export interface SiteAnnouncementWriteRow {
  locale: SiteAnnouncementWriteLocale;
  enabled: boolean;
  title: string;
  body: string;
  cta_label: string | null;
  cta_href: string | null;
  starts_at: string | null;
  ends_at: string | null;
  updated_at: string | null;
}

export const SITE_ANNOUNCEMENT_SELECT_FIELDS =
  "locale, enabled, title, body, cta_label, cta_href, starts_at, ends_at, updated_at";

export function toAnnouncementWriteRow(
  input: SiteAnnouncementWriteInput,
  updatedAt: string,
): Omit<SiteAnnouncementWriteRow, "updated_at"> & { updated_at: string } {
  return {
    locale: input.locale,
    enabled: input.enabled,
    title: input.title,
    body: input.body,
    cta_label: input.ctaLabel || null,
    cta_href: input.ctaHref || null,
    starts_at: input.startsAt || null,
    ends_at: input.endsAt || null,
    updated_at: updatedAt,
  };
}

export function hasSameAnnouncementContent(
  row: SiteAnnouncementWriteRow,
  input: SiteAnnouncementWriteInput,
): boolean {
  return (
    row.locale === input.locale &&
    row.enabled === input.enabled &&
    row.title === input.title &&
    row.body === input.body &&
    row.cta_label === (input.ctaLabel || null) &&
    row.cta_href === (input.ctaHref || null) &&
    normalizeDate(row.starts_at) === normalizeDate(input.startsAt || null) &&
    normalizeDate(row.ends_at) === normalizeDate(input.endsAt || null)
  );
}

export function getNextAnnouncementUpdatedAt(previous: string | null): string {
  const now = Date.now();
  const previousTime = previous ? Date.parse(previous) : Number.NaN;
  return new Date(
    Number.isFinite(previousTime) ? Math.max(now, previousTime + 1) : now,
  ).toISOString();
}

function normalizeDate(value: string | null): string | null {
  if (!value) return null;
  const milliseconds = Date.parse(value);
  return Number.isFinite(milliseconds)
    ? new Date(milliseconds).toISOString()
    : value;
}
