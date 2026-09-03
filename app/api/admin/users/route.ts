import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { getAdminUserIds } from "@/lib/auth/admin-policy";
import {
  isEarlyUser,
  resolveUserTitle,
  type UserTitleRule,
} from "@/lib/auth/user-title-policy";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// One row per user, already aggregated by the admin_users_overview RPC
// (migration 036). The RPC reads auth.users directly and joins the per-user
// comment/rating/favorite/submission counts + seq id + title in a single
// round trip, replacing the previous auth.admin.listUsers (~1.1-1.4s REST
// call) plus six full-table reads. Search, sort, paging and title resolution
// stay here so the response contract is unchanged.
interface OverviewRow {
  user_id: string;
  email: string | null;
  author_name: string | null;
  avatar_url: string | null;
  comment_count: number;
  rating_count: number;
  favorite_count: number;
  submission_count: number;
  last_active: string | null;
  seq_id: number | null;
  custom_title: string | null;
  title_color: string | null;
  title_icon_path: string | null;
  is_owner: boolean;
  title_enabled: boolean;
  profile_title: string | null;
}

interface UserPayload {
  userId: string;
  authorName: string;
  avatarUrl: string | null;
  commentCount: number;
  ratingCount: number;
  favoriteCount: number;
  submissionCount: number;
  lastActive: string;
  seqId: number | null;
  customTitle: string | null;
  titleColor: string | null;
  titleIconPath: string | null;
  isOwner: boolean;
  titleEnabled: boolean;
  isEarlyUser: boolean;
  resolvedTitle: string | null;
}

// Internal shape: payload plus the lowercased email used only for search.
// The email never leaves the server (stripped before the JSON response).
interface EnrichedUser extends UserPayload {
  emailLower: string;
}

interface SupabaseRpcLike {
  rpc: (
    name: string,
    params?: Record<string, unknown>
  ) => Promise<{ data: unknown; error: { message?: string | null } | null }>;
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

  const { data, error } = await (sb as unknown as SupabaseRpcLike).rpc(
    "admin_users_overview"
  );
  if (error) {
    return NextResponse.json(
      { error: "Failed to load users." },
      { status: 500 }
    );
  }

  const rows: OverviewRow[] = Array.isArray(data)
    ? (data as OverviewRow[])
    : [];
  const adminUserIds = new Set(getAdminUserIds());

  let users = rows.map((row) => enrichRow(row, adminUserIds));

  if (search) {
    users = users.filter(
      (u) =>
        u.authorName.toLowerCase().includes(search) ||
        u.userId.toLowerCase().includes(search) ||
        (u.resolvedTitle ?? "").toLowerCase().includes(search) ||
        u.emailLower.includes(search)
    );
  }

  users.sort((a, b) => {
    if (!a.lastActive && !b.lastActive) return 0;
    if (!a.lastActive) return 1;
    if (!b.lastActive) return -1;
    return b.lastActive.localeCompare(a.lastActive);
  });

  const total = users.length;
  const paged = users.slice(offset, offset + limit).map(toPayload);

  return NextResponse.json({ users: paged, total, limit, offset });
}

function enrichRow(
  row: OverviewRow,
  adminUserIds: Set<string>
): EnrichedUser {
  const emailLower = row.email?.toLowerCase() ?? "";
  const authorName = resolveAuthorName(row, emailLower);

  // The RPC always returns concrete title fields (is_owner/title_enabled fall
  // back to false/true when the user has no user_titles row), so a synthesized
  // rule is equivalent to the previous "no rule" case for resolveUserTitle.
  const rule: UserTitleRule = {
    userId: row.user_id,
    customTitle: row.custom_title,
    titleColor: row.title_color,
    titleIconPath: row.title_icon_path,
    isOwner: row.is_owner,
    titleEnabled: row.title_enabled,
    updatedAt: null,
    updatedBy: null,
  };

  const resolvedTitle = resolveUserTitle({
    userId: row.user_id,
    seqId: row.seq_id,
    adminUserIds,
    rule,
    fallbackCustomTitle: row.profile_title,
  });

  return {
    userId: row.user_id,
    authorName,
    avatarUrl: row.avatar_url,
    commentCount: row.comment_count,
    ratingCount: row.rating_count,
    favoriteCount: row.favorite_count,
    submissionCount: row.submission_count,
    lastActive: row.last_active ?? "",
    seqId: row.seq_id,
    customTitle: row.custom_title,
    titleColor: row.title_color,
    titleIconPath: row.title_icon_path,
    isOwner: row.is_owner,
    titleEnabled: row.title_enabled,
    isEarlyUser: isEarlyUser(row.seq_id),
    resolvedTitle,
    emailLower,
  };
}

function resolveAuthorName(row: OverviewRow, emailLower: string): string {
  const fromRpc = row.author_name?.trim();
  if (fromRpc) {
    return fromRpc;
  }

  if (emailLower.includes("@")) {
    const localPart = emailLower.split("@")[0]?.trim();
    if (localPart) {
      return localPart;
    }
  }

  if (UUID_RE.test(row.user_id)) {
    return `User ${row.user_id.slice(0, 8)}`;
  }
  return "User";
}

function toPayload(user: EnrichedUser): UserPayload {
  const { emailLower: _emailLower, ...payload } = user;
  void _emailLower;
  return payload;
}
