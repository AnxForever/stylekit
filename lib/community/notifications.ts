import type { SupabaseClient } from "@supabase/supabase-js";
import { getPublicDiscussionStyles } from "@/lib/community/public-style";

export interface CommunityNotification {
  id: string;
  createdAt: string;
  readAt: string | null;
  actorName: string;
  content: string;
  styleName: string;
  styleNameEn: string;
  href: string;
}

export interface CommunityNotificationPage {
  items: CommunityNotification[];
  unreadCount: number;
  nextCursor: string | null;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?:Z|[+-]\d{2}:\d{2})$/;

export function parseNotificationCursor(cursor: string | null): { createdAt: string; id: string } | null {
  if (!cursor) return null;
  if (cursor.length > 256) throw new Error("Invalid notification cursor");
  try {
    const value: unknown = JSON.parse(Buffer.from(cursor, "base64url").toString());
    if (value && typeof value === "object") {
      const { createdAt, id } = value as Record<string, unknown>;
      if (typeof createdAt === "string" && ISO_DATE.test(createdAt) && Number.isFinite(Date.parse(createdAt)) && typeof id === "string" && UUID.test(id)) {
        return { createdAt, id };
      }
    }
  } catch { /* Report the same error for every malformed cursor. */ }
  throw new Error("Invalid notification cursor");
}

export function notificationCursor(createdAt: string, id: string) {
  return Buffer.from(JSON.stringify({ createdAt, id })).toString("base64url");
}

export class CommunityNotificationStoreError extends Error {
  constructor(public readonly upgradeRequired: boolean) {
    super(upgradeRequired ? "Community notifications require the pending upgrade." : "Community notifications are temporarily unavailable.");
  }
}

function checkStoreError(error: { code?: string } | null) {
  if (error) throw new CommunityNotificationStoreError(["42P01", "42703", "PGRST204", "PGRST205"].includes(error.code ?? ""));
}

export async function listCommunityNotifications(
  sb: SupabaseClient,
  recipientId: string,
  options: { limit: number; cursor: ReturnType<typeof parseNotificationCursor> }
): Promise<CommunityNotificationPage> {
  const styles = await getPublicDiscussionStyles();
  if (styles.size === 0) return { items: [], unreadCount: 0, nextCursor: null };
  const slugs = [...styles.keys()];
  const unread = sb.from("community_notifications").select("id", { count: "exact", head: true })
    .eq("recipient_id", recipientId).in("style_slug", slugs).is("read_at", null);
  let query = sb.from("community_notifications")
    .select("id, created_at, read_at, style_slug, comment_id, comment:style_comments!community_notifications_comment_id_fkey(id, content, author_name)")
    .eq("recipient_id", recipientId).in("style_slug", slugs)
    .order("created_at", { ascending: false }).order("id", { ascending: false });
  if (options.cursor) {
    const { createdAt, id } = options.cursor;
    // Both values are strictly validated before interpolating PostgREST syntax.
    query = query.or(`created_at.lt.${createdAt},and(created_at.eq.${createdAt},id.lt.${id})`);
  }
  const [rows, count] = await Promise.all([query.limit(options.limit + 1), unread]);
  checkStoreError(rows.error);
  checkStoreError(count.error);
  const records = rows.data ?? [];
  const page = records.slice(0, options.limit);
  const items: CommunityNotification[] = [];
  for (const row of page) {
    const style = styles.get(row.style_slug);
    const comment = (Array.isArray(row.comment) ? row.comment[0] : row.comment) as { id?: unknown; content?: unknown; author_name?: unknown } | null;
    if (!style || !comment || typeof comment.id !== "string" || !UUID.test(comment.id) || typeof comment.content !== "string") continue;
    items.push({
      id: row.id,
      createdAt: row.created_at,
      readAt: row.read_at,
      actorName: typeof comment.author_name === "string" ? comment.author_name : "",
      content: comment.content,
      styleName: style.name,
      styleNameEn: style.nameEn,
      href: `${style.href}?comment=${comment.id}#comment-${comment.id}`,
    });
  }
  const last = page.at(-1);
  return {
    items,
    unreadCount: count.count ?? 0,
    nextCursor: records.length > options.limit && last ? notificationCursor(last.created_at, last.id) : null,
  };
}

export async function markCommunityNotificationsRead(sb: SupabaseClient, recipientId: string, ids: string[]) {
  // Never accept a recipient from the request, and never mass-mark future rows.
  // An idempotent mark preserves the timestamp from the first acknowledgement.
  const { error } = await sb.from("community_notifications").update({ read_at: new Date().toISOString() })
    .eq("recipient_id", recipientId).in("id", ids).is("read_at", null);
  checkStoreError(error);
}
