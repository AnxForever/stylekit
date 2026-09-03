/**
 * Post-publication moderation for community styles.
 *
 * Pre-publication gates (lib/submission/gates) decide whether work may go live.
 * This module handles what comes after: reports from readers, and the takedown
 * that answers a valid one. Both run through the service role, so the API
 * routes above them own authentication and rate limiting.
 */

import { getSupabaseAdmin } from "@/lib/supabase/server";

export const REPORT_REASONS = [
  "plagiarism",
  "broken",
  "inappropriate",
  "mislabeled",
  "other",
] as const;

export type ReportReason = (typeof REPORT_REASONS)[number];
export type ReportStatus = "open" | "reviewed" | "dismissed";

/** Free-text detail is capped so a report cannot be used as a storage channel. */
export const MAX_REPORT_DETAIL_LENGTH = 500;

export interface CommunityReport {
  id: string;
  submissionId: string;
  submissionSlug?: string;
  reporterId: string | null;
  reason: ReportReason;
  detail: string | null;
  status: ReportStatus;
  createdAt: string;
  reviewedAt: string | null;
  reviewNote: string | null;
}

interface ReportRow {
  id: string;
  submission_id: string;
  reporter_id: string | null;
  reason: string;
  detail: string | null;
  status: string;
  created_at: string;
  reviewed_at: string | null;
  review_note: string | null;
  submissions?: { slug?: string } | { slug?: string }[] | null;
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * reporter_id is a real uuid foreign key, so anything that is not a uuid has to
 * degrade to an anonymous report rather than abort the insert. The dev mock
 * user ("dev-mock-user-00000000") is the case that surfaced this, but any
 * non-uuid identity would otherwise take the whole report path down with it.
 */
function asUuidOrNull(value: string | null | undefined): string | null {
  return value && UUID_RE.test(value) ? value : null;
}

export function isReportReason(value: unknown): value is ReportReason {
  return (
    typeof value === "string" && REPORT_REASONS.includes(value as ReportReason)
  );
}

function toReport(row: ReportRow): CommunityReport {
  const joined = Array.isArray(row.submissions)
    ? row.submissions[0]
    : row.submissions;

  return {
    id: row.id,
    submissionId: row.submission_id,
    ...(joined?.slug ? { submissionSlug: joined.slug } : {}),
    reporterId: row.reporter_id,
    reason: row.reason as ReportReason,
    detail: row.detail,
    status: row.status as ReportStatus,
    createdAt: row.created_at,
    reviewedAt: row.reviewed_at,
    reviewNote: row.review_note,
  };
}

/**
 * File a report against a community style.
 *
 * Resolves the slug to a submission id here rather than trusting a client-sent
 * id, so a report can only ever attach to a style that actually exists.
 */
export async function createCommunityReport(input: {
  slug: string;
  reason: ReportReason;
  detail?: string | null;
  reporterId?: string | null;
}): Promise<{ ok: true; id: string } | { ok: false; reason: "not-found" | "failed" }> {
  const sb = getSupabaseAdmin();
  if (!sb) return { ok: false, reason: "failed" };

  const { data: submission } = await sb
    .from("submissions")
    .select("id")
    .eq("slug", input.slug.trim().toLowerCase())
    .eq("status", "approved")
    .limit(1)
    .maybeSingle();

  if (!submission?.id) {
    return { ok: false, reason: "not-found" };
  }

  const detail = input.detail?.trim().slice(0, MAX_REPORT_DETAIL_LENGTH) || null;
  const { data, error } = await sb
    .from("community_reports")
    .insert({
      submission_id: submission.id,
      reporter_id: asUuidOrNull(input.reporterId),
      reason: input.reason,
      detail,
    })
    .select("id")
    .single();

  if (error || !data) return { ok: false, reason: "failed" };
  return { ok: true, id: data.id };
}

export async function listCommunityReports(
  status: ReportStatus | "all" = "open"
): Promise<CommunityReport[]> {
  const sb = getSupabaseAdmin();
  if (!sb) return [];

  let query = sb
    .from("community_reports")
    .select("*, submissions(slug)")
    .order("created_at", { ascending: true });

  if (status !== "all") {
    query = query.eq("status", status);
  }

  const { data, error } = await query;
  if (error || !data) return [];
  return (data as ReportRow[]).map(toReport);
}

/** Resolve a report without changing what readers see. */
export async function resolveCommunityReport(
  id: string,
  status: Exclude<ReportStatus, "open">,
  note?: string | null
): Promise<CommunityReport | null> {
  const sb = getSupabaseAdmin();
  if (!sb) return null;

  const { data, error } = await sb
    .from("community_reports")
    .update({
      status,
      reviewed_at: new Date().toISOString(),
      review_note: note?.trim() || null,
    })
    .eq("id", id)
    .select("*, submissions(slug)")
    .single();

  if (error || !data) return null;
  return toReport(data as ReportRow);
}

/**
 * Hide or restore a community style.
 *
 * Hiding keeps the row — the review trail and the contributor's own history
 * stay intact — and only removes it from the public catalog. Restoring returns
 * it to the community catalog rather than to 'promoted', so a takedown always
 * costs a style its curated placement.
 */
export async function setSubmissionVisibility(
  submissionId: string,
  visibility: "community" | "hidden"
): Promise<{ id: string; slug: string; visibility: string } | null> {
  const sb = getSupabaseAdmin();
  if (!sb) return null;

  const { data, error } = await sb
    .from("submissions")
    .update({
      visibility,
      ...(visibility === "hidden" ? { promoted_at: null } : {}),
    })
    .eq("id", submissionId)
    .select("id, slug, visibility")
    .single();

  if (error || !data) return null;
  return data as { id: string; slug: string; visibility: string };
}
