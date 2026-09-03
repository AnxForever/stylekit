/**
 * Supabase-backed Submission Reviewer
 *
 * Drop-in replacement for the file-based reviewer when Supabase is configured.
 * Falls back to file-based storage when NEXT_PUBLIC_SUPABASE_URL is not set.
 */

import type { SubmissionRecord } from "./reviewer";
import { createClient } from "@supabase/supabase-js";

interface DbErrorLike {
  code?: string | null;
  message?: string | null;
  details?: string | null;
}

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export async function listSubmissionsSupabase(
  filter?: "pending" | "approved" | "rejected"
): Promise<SubmissionRecord[]> {
  const sb = getSupabaseAdmin();
  if (!sb) return [];

  let query = sb
    .from("submissions")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (filter) {
    query = query.eq("status", filter);
  }

  const { data, error } = await query;
  if (error) throw new Error(`Supabase query failed: ${error.message}`);

  return (data ?? []).map(toSubmissionRecord);
}

export async function getSubmissionSupabase(
  id: string
): Promise<SubmissionRecord | null> {
  const sb = getSupabaseAdmin();
  if (!sb) return null;

  const { data, error } = await sb
    .from("submissions")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return toSubmissionRecord(data);
}

export async function getLatestApprovedSubmissionBySlugSupabase(
  slug: string
): Promise<SubmissionRecord | null> {
  const sb = getSupabaseAdmin();
  if (!sb) return null;

  const { data, error } = await sb
    .from("submissions")
    .select("*")
    .eq("slug", slug.trim().toLowerCase())
    .eq("status", "approved")
    .order("reviewed_at", { ascending: false, nullsFirst: false })
    .order("submitted_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return null;
  return toSubmissionRecord(data);
}

export async function hasActiveSubmissionSlugSupabase(
  slug: string
): Promise<boolean> {
  const sb = getSupabaseAdmin();
  if (!sb) return false;

  const normalizedSlug = slug.trim().toLowerCase();
  if (!normalizedSlug) return false;

  const { count, error } = await sb
    .from("submissions")
    .select("id", { head: true, count: "exact" })
    .eq("slug", normalizedSlug)
    .in("status", ["pending", "approved"]);

  if (error) {
    throw new Error(`Supabase query failed: ${error.message}`);
  }

  return (count ?? 0) > 0;
}

export async function createSubmissionSupabase(
  slug: string,
  formData: Record<string, unknown>,
  tokens: Record<string, unknown>,
  designStyle: Record<string, unknown>,
  ipAddress?: string | null,
  userId?: string | null,
  authorName?: string | null,
  authorAvatarUrl?: string | null,
  authorProvider?: string | null
): Promise<{ id: string; slug: string }> {
  const sb = getSupabaseAdmin();
  if (!sb) throw new Error("Supabase not configured");

  const authorMeta = {
    handle: authorName ?? null,
    avatarUrl: authorAvatarUrl ?? null,
    provider: authorProvider ?? null,
  };
  const hasAuthorMeta = Object.values(authorMeta).some((value) => value !== null);
  const enrichedFormData = hasAuthorMeta
    ? { ...formData, __author: authorMeta, tokens, designStyle }
    : { ...formData, tokens, designStyle };

  const basePayload = {
    slug,
    form_data: enrichedFormData,
    status: "pending" as const,
    ip_address: ipAddress,
  };

  const modernPayload = {
    ...basePayload,
    user_id: userId ?? null,
    author_name: authorName ?? null,
  };

  let insertResult = await sb
    .from("submissions")
    .insert(modernPayload)
    .select("id, slug")
    .single();

  const retryPayload = buildSubmissionRetryPayload(
    insertResult.error as DbErrorLike | null,
    basePayload,
    userId ?? null,
    authorName ?? null
  );

  if (retryPayload) {
    insertResult = await sb
      .from("submissions")
      .insert(retryPayload)
      .select("id, slug")
      .single();
  }

  if (insertResult.error) {
    throw buildDbInsertError(insertResult.error as DbErrorLike);
  }

  const data = insertResult.data;
  return { id: data.id, slug: data.slug };
}

function readDbErrorMessage(error: DbErrorLike | null | undefined): string {
  return `${error?.message ?? ""} ${error?.details ?? ""}`.toLowerCase();
}

function isMissingColumnError(
  error: DbErrorLike | null | undefined,
  column: string
): boolean {
  const code = error?.code ?? null;
  if (code !== "42703" && code !== "PGRST204") {
    return false;
  }
  return readDbErrorMessage(error).includes(column.toLowerCase());
}

function shouldRetryLegacySubmissionInsert(error: DbErrorLike | null | undefined): boolean {
  return isMissingColumnError(error, "user_id") || isMissingColumnError(error, "author_name");
}

function buildSubmissionRetryPayload(
  error: DbErrorLike | null | undefined,
  basePayload: {
    slug: string;
    form_data: Record<string, unknown>;
    status: "pending";
    ip_address?: string | null;
  },
  userId: string | null,
  authorName: string | null
): Record<string, unknown> | null {
  if (!shouldRetryLegacySubmissionInsert(error)) {
    return null;
  }

  const missingUserId = isMissingColumnError(error, "user_id");
  const missingAuthorName = isMissingColumnError(error, "author_name");

  if (missingUserId && missingAuthorName) {
    return basePayload;
  }

  if (missingAuthorName) {
    return {
      ...basePayload,
      user_id: userId,
    };
  }

  if (missingUserId) {
    return {
      ...basePayload,
      author_name: authorName,
    };
  }

  return basePayload;
}

function buildDbInsertError(error: DbErrorLike): Error & DbErrorLike {
  const wrapped = new Error(
    `Insert failed: ${error.message ?? "Supabase insert returned an unknown error"}`
  ) as Error & DbErrorLike;
  wrapped.code = error.code ?? null;
  wrapped.details = error.details ?? null;
  return wrapped;
}

export async function approveSubmissionSupabase(
  id: string,
  note?: string
): Promise<SubmissionRecord | null> {
  const sb = getSupabaseAdmin();
  if (!sb) return null;

  const { data, error } = await sb
    .from("submissions")
    .update({
      status: "approved",
      review_note: note || null,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) return null;
  return toSubmissionRecord(data);
}

/**
 * Promote an approved submission into the curated catalog.
 *
 * Promotion is a database flag, not a code generation step: the style already
 * renders from its submission record through community-runtime, so marking it
 * promoted is all that is needed to move it into the curated surface. The
 * heavier `register` flow (which writes static registry files and needs a
 * deploy) stays available for batch-hardening the best styles later.
 *
 * Returns null when the row is missing or is not approved yet — promoting an
 * unreviewed submission would put unvetted work into the curated catalog.
 */
export async function promoteSubmissionSupabase(
  id: string
): Promise<SubmissionRecord | null> {
  const sb = getSupabaseAdmin();
  if (!sb) return null;

  const { data, error } = await sb
    .from("submissions")
    .update({
      visibility: "promoted",
      promoted_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("status", "approved")
    .select("*")
    .single();

  if (error || !data) return null;
  return toSubmissionRecord(data);
}

export async function rejectSubmissionSupabase(
  id: string,
  note?: string
): Promise<SubmissionRecord | null> {
  const sb = getSupabaseAdmin();
  if (!sb) return null;

  const { data, error } = await sb
    .from("submissions")
    .update({
      status: "rejected",
      review_note: note || null,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) return null;
  return toSubmissionRecord(data);
}

export async function deleteSubmissionSupabase(id: string): Promise<boolean> {
  const sb = getSupabaseAdmin();
  if (!sb) return false;

  const { error, count } = await sb
    .from("submissions")
    .delete({ count: "exact" })
    .eq("id", id);

  if (error) return false;
  return (count ?? 0) > 0;
}

export async function updateSubmissionFormDataSupabase(
  id: string,
  formData: Record<string, unknown>
): Promise<SubmissionRecord | null> {
  const sb = getSupabaseAdmin();
  if (!sb) return null;

  const { data, error } = await sb
    .from("submissions")
    .update({ form_data: formData })
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) return null;
  return toSubmissionRecord(data);
}

// Map DB row to application record
interface DbRow {
  id: string;
  slug: string;
  form_data: Record<string, unknown>;
  status: string;
  review_note: string | null;
  submitted_at: string;
  reviewed_at: string | null;
  user_id: string | null;
  author_name: string | null;
  visibility?: string | null;
  promoted_at?: string | null;
}

function toSubmissionRecord(row: DbRow): SubmissionRecord {
  const formData = row.form_data || {};
  return {
    id: row.id,
    slug: row.slug,
    submittedAt: row.submitted_at,
    status: row.status as SubmissionRecord["status"],
    reviewedAt: row.reviewed_at ?? undefined,
    reviewNote: row.review_note ?? undefined,
    userId: row.user_id ?? undefined,
    authorName: row.author_name ?? undefined,
    formData,
    tokens: (formData.tokens as Record<string, unknown>) ?? {},
    designStyle: (formData.designStyle as Record<string, unknown>) ?? {},
    // Columns arrived in migration 035; a database that predates it simply
    // reports no placement rather than breaking the read path.
    ...(row.visibility
      ? { visibility: row.visibility as SubmissionRecord["visibility"] }
      : {}),
    ...(row.promoted_at ? { promotedAt: row.promoted_at } : {}),
  };
}
