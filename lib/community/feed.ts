import { createClient } from "@supabase/supabase-js";
import { getStyleMetaBySlug } from "@/lib/styles/meta";
import {
  isSupabaseConfigured,
} from "@/lib/submit/reviewer-supabase";
import { listSubmissions } from "@/lib/submit/reviewer";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type CommunityProvider = "github" | "linuxdo" | "unknown";

export interface CommunityAuthor {
  handle: string;
  avatarUrl: string | null;
  provider: CommunityProvider;
  userId: string | null;
}

export interface CommunityFeedItem {
  id: string;
  slug: string;
  status: "approved";
  submittedAt: string;
  reviewedAt: string | null;
  title: string;
  titleEn: string | null;
  description: string | null;
  cover: string | null;
  author: CommunityAuthor;
}

export interface CommunityFeedResult {
  items: CommunityFeedItem[];
  total: number;
}

export interface CommunityFeedQuery {
  limit?: number;
  offset?: number;
  slug?: string;
}

interface SupabaseSubmissionRow {
  id: string;
  slug: string;
  status: "pending" | "approved" | "rejected";
  submitted_at: string;
  reviewed_at: string | null;
  author_name: string | null;
  user_id: string | null;
  form_data: unknown;
}

interface FileSubmissionRow {
  id: string;
  slug: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  reviewedAt?: string;
  authorName?: string;
  userId?: string;
  formData: Record<string, unknown>;
}

interface AuthorMeta {
  handle: string | null;
  avatarUrl: string | null;
  provider: CommunityProvider;
}

export interface CommunityStyleAttribution {
  submissionId: string;
  submittedAt: string;
  author: CommunityAuthor;
}

function parseLimit(value: number | undefined): number {
  if (value === undefined || !Number.isFinite(value)) return 12;
  return Math.max(1, Math.min(Math.floor(value), 48));
}

function parseOffset(value: number | undefined): number {
  if (value === undefined || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.floor(value));
}

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

function asString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function asProvider(value: unknown): CommunityProvider {
  if (value === "github" || value === "linuxdo") return value;
  return "unknown";
}

function parseAuthorMeta(formData: Record<string, unknown>): AuthorMeta {
  const meta = asRecord(formData.__author);
  return {
    handle: asString(meta.handle) ?? asString(formData.authorName),
    avatarUrl: asString(meta.avatarUrl),
    provider: asProvider(meta.provider),
  };
}

function normalizeHandle(value: string | null): string {
  if (!value) return "anonymous";
  return value.replace(/^@+/, "");
}

function mapItemFromSupabase(row: SupabaseSubmissionRow): CommunityFeedItem {
  const formData = asRecord(row.form_data);
  const authorMeta = parseAuthorMeta(formData);
  const styleMeta = getStyleMetaBySlug(row.slug);

  return {
    id: row.id,
    slug: row.slug,
    status: "approved",
    submittedAt: row.submitted_at,
    reviewedAt: row.reviewed_at,
    title:
      asString(formData.name) ??
      asString(formData.nameEn) ??
      styleMeta?.name ??
      row.slug,
    titleEn:
      asString(formData.nameEn) ??
      styleMeta?.nameEn ??
      null,
    description:
      asString(formData.description) ??
      styleMeta?.description ??
      null,
    cover:
      asString(formData.cover) ??
      styleMeta?.cover ??
      `/styles/${row.slug}/opengraph-image`,
    author: {
      handle: normalizeHandle(authorMeta.handle ?? asString(row.author_name)),
      avatarUrl: authorMeta.avatarUrl,
      provider: authorMeta.provider,
      userId: row.user_id,
    },
  };
}

function mapItemFromFile(row: FileSubmissionRow): CommunityFeedItem {
  const formData = asRecord(row.formData);
  const authorMeta = parseAuthorMeta(formData);
  const styleMeta = getStyleMetaBySlug(row.slug);

  return {
    id: row.id,
    slug: row.slug,
    status: "approved",
    submittedAt: row.submittedAt,
    reviewedAt: row.reviewedAt ?? null,
    title:
      asString(formData.name) ??
      asString(formData.nameEn) ??
      styleMeta?.name ??
      row.slug,
    titleEn:
      asString(formData.nameEn) ??
      styleMeta?.nameEn ??
      null,
    description:
      asString(formData.description) ??
      styleMeta?.description ??
      null,
    cover:
      asString(formData.cover) ??
      styleMeta?.cover ??
      `/styles/${row.slug}/opengraph-image`,
    author: {
      handle: normalizeHandle(authorMeta.handle ?? row.authorName ?? null),
      avatarUrl: authorMeta.avatarUrl,
      provider: authorMeta.provider,
      userId: row.userId ?? null,
    },
  };
}

async function listFromSupabase(
  query: Required<Pick<CommunityFeedQuery, "limit" | "offset">> &
    Pick<CommunityFeedQuery, "slug">
): Promise<CommunityFeedResult> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return { items: [], total: 0 };
  }

  const client = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  let listQuery = client
    .from("submissions")
    .select(
      "id, slug, status, submitted_at, reviewed_at, author_name, user_id, form_data",
      { count: "exact" }
    )
    .eq("status", "approved")
    .order("reviewed_at", { ascending: false, nullsFirst: false })
    .order("submitted_at", { ascending: false })
    .range(query.offset, query.offset + query.limit - 1);

  if (query.slug) {
    listQuery = listQuery.eq("slug", query.slug);
  }

  const { data, count, error } = await listQuery;
  if (error) {
    throw new Error(error.message);
  }

  const rows = (data ?? []) as SupabaseSubmissionRow[];
  return {
    items: rows.map(mapItemFromSupabase),
    total: count ?? 0,
  };
}

async function listFromFiles(
  query: Required<Pick<CommunityFeedQuery, "limit" | "offset">> &
    Pick<CommunityFeedQuery, "slug">
): Promise<CommunityFeedResult> {
  const all = await listSubmissions("approved");
  const filtered = query.slug
    ? all.filter((item) => item.slug === query.slug)
    : all;
  const items = filtered
    .slice(query.offset, query.offset + query.limit)
    .map((item) => mapItemFromFile(item as FileSubmissionRow));

  return {
    items,
    total: filtered.length,
  };
}

export async function listCommunityFeed(
  query: CommunityFeedQuery = {}
): Promise<CommunityFeedResult> {
  const normalizedSlug =
    typeof query.slug === "string" && SLUG_RE.test(query.slug)
      ? query.slug
      : undefined;
  const normalized = {
    limit: parseLimit(query.limit),
    offset: parseOffset(query.offset),
    slug: normalizedSlug,
  };

  if (isSupabaseConfigured()) {
    try {
      return await listFromSupabase(normalized);
    } catch {
      return listFromFiles(normalized);
    }
  }

  return listFromFiles(normalized);
}

export async function getStyleCommunityAttribution(
  slug: string
): Promise<CommunityStyleAttribution | null> {
  if (!SLUG_RE.test(slug)) return null;
  const { items } = await listCommunityFeed({
    slug,
    limit: 1,
    offset: 0,
  });
  const mapped = items[0];
  if (!mapped) return null;

  return {
    submissionId: mapped.id,
    submittedAt: mapped.submittedAt,
    author: mapped.author,
  };
}
