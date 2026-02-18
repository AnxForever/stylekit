import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { getSupabaseAdmin } from "@/lib/supabase/server";

interface UserInfo {
  userId: string;
  authorName: string;
  avatarUrl: string | null;
  commentCount: number;
  ratingCount: number;
  favoriteCount: number;
  submissionCount: number;
  lastActive: string;
}

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const limit = Math.max(
    1,
    Math.min(100, Number.parseInt(searchParams.get("limit") ?? "20", 10) || 20)
  );
  const offset = Math.max(
    0,
    Number.parseInt(searchParams.get("offset") ?? "0", 10) || 0
  );
  const search = searchParams.get("search")?.trim().toLowerCase() || "";

  const sb = getSupabaseAdmin();
  if (!sb) {
    return NextResponse.json({ users: [], total: 0, limit, offset });
  }

  const usersMap = new Map<string, UserInfo>();

  function ensureUser(userId: string, authorName?: string, avatarUrl?: string | null): UserInfo {
    let user = usersMap.get(userId);
    if (!user) {
      user = {
        userId,
        authorName: authorName || "",
        avatarUrl: avatarUrl ?? null,
        commentCount: 0,
        ratingCount: 0,
        favoriteCount: 0,
        submissionCount: 0,
        lastActive: "",
      };
      usersMap.set(userId, user);
    }
    if (authorName && !user.authorName) {
      user.authorName = authorName;
    }
    if (avatarUrl && !user.avatarUrl) {
      user.avatarUrl = avatarUrl;
    }
    return user;
  }

  function updateLastActive(user: UserInfo, createdAt: string | null) {
    if (!createdAt) return;
    if (!user.lastActive || createdAt > user.lastActive) {
      user.lastActive = createdAt;
    }
  }

  const [commentsRes, ratingsRes, favoritesRes, submissionsRes] =
    await Promise.all([
      sb
        .from("style_comments")
        .select("user_id, author_name, avatar_url, created_at"),
      sb.from("style_ratings").select("user_id, created_at"),
      sb.from("style_favorites").select("user_id, created_at"),
      sb
        .from("style_submissions")
        .select("user_id, created_at")
        .then(
          (res: { data: unknown[] | null; error: unknown }) => res,
          () => ({ data: null, error: null })
        ),
    ]);

  if (commentsRes.data) {
    for (const row of commentsRes.data) {
      if (!row.user_id) continue;
      const user = ensureUser(row.user_id, row.author_name, row.avatar_url);
      user.commentCount++;
      updateLastActive(user, row.created_at);
    }
  }

  if (ratingsRes.data) {
    for (const row of ratingsRes.data) {
      if (!row.user_id) continue;
      const user = ensureUser(row.user_id);
      user.ratingCount++;
      updateLastActive(user, row.created_at);
    }
  }

  if (favoritesRes.data) {
    for (const row of favoritesRes.data) {
      if (!row.user_id) continue;
      const user = ensureUser(row.user_id);
      user.favoriteCount++;
      updateLastActive(user, row.created_at);
    }
  }

  if (submissionsRes.data) {
    for (const row of submissionsRes.data) {
      if (!row.user_id) continue;
      const user = ensureUser(row.user_id);
      user.submissionCount++;
      updateLastActive(user, row.created_at);
    }
  }

  let users = Array.from(usersMap.values());

  if (search) {
    users = users.filter(
      (u) =>
        u.authorName.toLowerCase().includes(search) ||
        u.userId.toLowerCase().includes(search)
    );
  }

  users.sort((a, b) => {
    if (!a.lastActive && !b.lastActive) return 0;
    if (!a.lastActive) return 1;
    if (!b.lastActive) return -1;
    return b.lastActive.localeCompare(a.lastActive);
  });

  const total = users.length;
  const paged = users.slice(offset, offset + limit);

  return NextResponse.json({ users: paged, total, limit, offset });
}
