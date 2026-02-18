/**
 * Supabase-backed Submission Reviewer
 *
 * Drop-in replacement for the file-based reviewer when Supabase is configured.
 * Falls back to file-based storage when NEXT_PUBLIC_SUPABASE_URL is not set.
 */

import type { SubmissionRecord } from "./reviewer";
import { createClient } from "@supabase/supabase-js";

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

  const { data, error } = await sb
    .from("submissions")
    .insert({
      slug,
      form_data: enrichedFormData,
      status: "pending",
      ip_address: ipAddress,
      user_id: userId ?? null,
      author_name: authorName ?? null,
    })
    .select("id, slug")
    .single();

  if (error) throw new Error(`Insert failed: ${error.message}`);
  return { id: data.id, slug: data.slug };
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
  };
}
