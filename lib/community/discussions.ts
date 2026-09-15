import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getAllStylesMeta, type StyleMeta } from "@/lib/styles/meta";

const DISCUSSION_SCAN_LIMIT = 60;
const DISCUSSION_DISPLAY_LIMIT = 6;

export interface CommunityDiscussion {
  id: string;
  style: Pick<StyleMeta, "slug" | "name" | "nameEn">;
  href: string;
  authorName: string;
  content: string;
  createdAt: string;
  /** Counts within the bounded recent-activity window queried below. */
  messageCount: number;
  authorCount: number;
}

export interface CommunityDiscussionsResult {
  status: "ready" | "unavailable";
  items: CommunityDiscussion[];
}

/** Only fields already visible on the public style discussion are selected. */
interface PublicCommentRow {
  id: string;
  style_slug: string;
  content: string;
  author_name: string;
  created_at: string;
}

function isPublicCommentRow(value: unknown): value is PublicCommentRow {
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.id === "string" &&
    typeof row.style_slug === "string" &&
    typeof row.content === "string" &&
    row.content.trim().length > 0 &&
    typeof row.author_name === "string" &&
    typeof row.created_at === "string" &&
    Number.isFinite(Date.parse(row.created_at))
  );
}

/**
 * Recent public comments grouped by style. Counts describe this bounded activity
 * window; they are not presented as lifetime totals.
 * No cross-request cache: a moderation change must not leave a cached excerpt.
 */
export async function getRecentDiscussions(
  communityStyles: StyleMeta[] | Promise<StyleMeta[]>
): Promise<CommunityDiscussionsResult> {
  const unavailable: CommunityDiscussionsResult = { status: "unavailable", items: [] };

  try {
    const sb: SupabaseClient | null = getSupabaseAdmin();
    if (!sb) return unavailable;

    // Start the bounded activity read before the community catalog resolves.
    // Rows are filtered against the final public style map below, so comments
    // for hidden or unknown styles can never enter the rendered result.
    const commentsQuery = sb
      .from("style_comments")
      .select("id, style_slug, content, author_name, created_at")
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .limit(DISCUSSION_SCAN_LIMIT);

    const [resolvedCommunityStyles, { data, error }] = await Promise.all([
      communityStyles,
      commentsQuery,
    ]);

    const publicStyles = new Map(
      resolvedCommunityStyles.map((style) => [
        style.slug,
        { style, basePath: "/community" },
      ])
    );
    for (const style of getAllStylesMeta()) {
      publicStyles.set(style.slug, { style, basePath: "/styles" });
    }

    if (error) return unavailable;

    const grouped = new Map<
      string,
      { item: CommunityDiscussion; authorNames: Set<string> }
    >();
    for (const row of (data ?? []) as unknown[]) {
      if (!isPublicCommentRow(row)) continue;
      const entry = publicStyles.get(row.style_slug);
      if (!entry) continue;

      const existing = grouped.get(row.style_slug);
      const authorName = row.author_name.trim().slice(0, 80);
      if (existing) {
        existing.item.messageCount += 1;
        if (authorName) existing.authorNames.add(authorName);
        existing.item.authorCount = existing.authorNames.size;
        continue;
      }

      const authorNames = new Set(authorName ? [authorName] : []);
      grouped.set(row.style_slug, {
        item: {
          id: row.id,
          style: {
            slug: entry.style.slug,
            name: entry.style.name,
            nameEn: entry.style.nameEn,
          },
          href: `${entry.basePath}/${entry.style.slug}?comment=${encodeURIComponent(row.id)}#comment-${encodeURIComponent(row.id)}`,
          authorName,
          content: row.content.trim().slice(0, 280),
          createdAt: row.created_at,
          messageCount: 1,
          authorCount: authorNames.size,
        },
        authorNames,
      });
    }

    const items = [...grouped.values()]
      .slice(0, DISCUSSION_DISPLAY_LIMIT)
      .map((group) => group.item);

    return { status: "ready", items };
  } catch {
    return unavailable;
  }
}
