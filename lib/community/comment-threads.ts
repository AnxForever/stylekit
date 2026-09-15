import type { SupabaseClient } from "@supabase/supabase-js";

export interface ReplyContext {
  id: string;
  author_name: string;
  content: string;
}

interface ReplyReference {
  reply_to_id?: string | null;
  is_reply?: boolean;
}

const MODERN_FIELDS = "id, content, author_name, avatar_url, user_id, session_id, created_at";
const LEGACY_FIELDS = "id, content, author_name, session_id, created_at";

export function isReplySchemaMissing(error: { code?: string; message?: string; details?: string } | null): boolean {
  return Boolean(error && ["42703", "PGRST204"].includes(error.code ?? "") &&
    /reply_to_id|is_reply/.test(`${error.message ?? ""} ${error.details ?? ""}`));
}

export async function readCommentRows(
  sb: SupabaseClient,
  slug: string,
  options: { limit: number; offset: number; commentId?: string; legacy?: boolean }
) {
  const fields = options.legacy ? LEGACY_FIELDS : MODERN_FIELDS;
  const execute = (columns: string) => {
    let query = sb.from("style_comments").select(columns, { count: "exact" }).eq("style_slug", slug);
    if (options.commentId) query = query.eq("id", options.commentId);
    return query.order("created_at", { ascending: false }).order("id", { ascending: false })
      .range(options.offset, options.offset + options.limit - 1);
  };
  const result = await execute(`${fields}, reply_to_id, is_reply`);
  if (!isReplySchemaMissing(result.error)) return { ...result, repliesEnabled: !result.error };
  // An old database may still serve comments, but must never pretend replies
  // work. Only missing reply columns permit this compatibility fallback.
  return { ...await execute(fields), repliesEnabled: false };
}

export async function attachReplyContexts<T extends ReplyReference>(sb: SupabaseClient, slug: string, comments: T[]) {
  const ids = [...new Set(comments.flatMap((comment) => comment.reply_to_id ? [comment.reply_to_id] : []))];
  if (ids.length === 0) return comments.map((comment) => ({ ...comment, reply_to: null }));
  const { data, error } = await sb.from("style_comments").select("id, author_name, content")
    .eq("style_slug", slug).in("id", ids);
  if (error) throw new Error("Reply context is unavailable");
  const parents = new Map<string, ReplyContext>();
  for (const row of data ?? []) {
    if (typeof row.id === "string" && typeof row.content === "string" && typeof row.author_name === "string") {
      parents.set(row.id, { id: row.id, content: row.content, author_name: row.author_name });
    }
  }
  return comments.map((comment) => ({
    ...comment,
    reply_to: comment.reply_to_id ? parents.get(comment.reply_to_id) ?? null : null,
  }));
}
