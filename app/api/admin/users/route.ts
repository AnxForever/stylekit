import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { getAdminUserIds } from "@/lib/auth/admin-policy";
import {
  buildUserTitleRuleMap,
  isEarlyUser,
  resolveUserTitle,
  type UserTitleRule,
} from "@/lib/auth/user-title-policy";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const LEGACY_USER_SESSION_PREFIX = "user:";
const FAVORITES_TABLE_CANDIDATES = ["user_favorites", "style_favorites"] as const;
const SUBMISSIONS_TABLE_CANDIDATES = ["submissions", "style_submissions"] as const;
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

interface UserInfo {
  userId: string;
  authorName: string;
  avatarUrl: string | null;
  commentCount: number;
  ratingCount: number;
  favoriteCount: number;
  submissionCount: number;
  lastActive: string;
  seqId: number | null;
  profileTitle: string | null;
  customTitle: string | null;
  titleColor: string | null;
  titleIconPath: string | null;
  isOwner: boolean;
  titleEnabled: boolean;
  isEarlyUser: boolean;
  resolvedTitle: string | null;
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

interface DbErrorLike {
  code?: string | null;
  message?: string | null;
  details?: string | null;
}

interface SupabaseSelectResult {
  data: unknown[] | null;
  error: DbErrorLike | null;
}

interface SupabaseLike {
  from: (tableName: string) => {
    select: (columns: string) => Promise<SupabaseSelectResult>;
  };
  auth?: {
    admin?: {
      listUsers?: (params: {
        page: number;
        perPage: number;
      }) => Promise<{
        data?: { users?: unknown[] } | null;
        error?: DbErrorLike | null;
      }>;
    };
  };
}

interface AuthUserLite {
  id: string;
  email: string | null;
  createdAt: string | null;
  lastSignInAt: string | null;
  userMetadata: Record<string, unknown> | null;
}

type TableRow = Record<string, unknown>;

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
  const admin = sb as SupabaseLike;

  const usersMap = new Map<string, UserInfo>();
  const userEmailMap = new Map<string, string>();
  const adminUserIds = new Set(getAdminUserIds());

  function ensureUser(
    userId: string,
    options?: {
      authorName?: string;
      avatarUrl?: string | null;
      seqId?: number | null;
      profileTitle?: string | null;
    }
  ): UserInfo {
    let user = usersMap.get(userId);
    if (!user) {
      user = {
        userId,
        authorName: options?.authorName || "",
        avatarUrl: options?.avatarUrl ?? null,
        commentCount: 0,
        ratingCount: 0,
        favoriteCount: 0,
        submissionCount: 0,
        lastActive: "",
        seqId: options?.seqId ?? null,
        profileTitle: options?.profileTitle ?? null,
        customTitle: null,
        titleColor: null,
        titleIconPath: null,
        isOwner: false,
        titleEnabled: true,
        isEarlyUser: false,
        resolvedTitle: null,
      };
      usersMap.set(userId, user);
    }

    if (options?.authorName && !user.authorName) {
      user.authorName = options.authorName;
    }
    if (options?.avatarUrl && !user.avatarUrl) {
      user.avatarUrl = options.avatarUrl;
    }
    if (user.seqId == null && options?.seqId != null) {
      user.seqId = options.seqId;
    }
    if (!user.profileTitle && options?.profileTitle) {
      user.profileTitle = options.profileTitle;
    }

    return user;
  }

  function updateLastActive(user: UserInfo, createdAt: string | null) {
    if (!createdAt) return;
    if (!user.lastActive || createdAt > user.lastActive) {
      user.lastActive = createdAt;
    }
  }

  let seqIdMap = new Map<string, number>();
  let titleRuleMap = new Map<string, UserTitleRule>();

  try {
    const authUsers = await readAllAuthUsers(admin);
    for (const authUser of authUsers) {
      const authorName = resolveAuthorName(authUser);
      const avatarUrl = resolveAvatarUrl(authUser.userMetadata);
      const seqId = resolveMetadataSeqId(authUser.userMetadata);
      const profileTitle = resolveMetadataProfileTitle(authUser.userMetadata);
      const user = ensureUser(authUser.id, {
        authorName,
        avatarUrl,
        seqId,
        profileTitle,
      });
      if (authUser.email) {
        userEmailMap.set(authUser.id, authUser.email.toLowerCase());
      }
      updateLastActive(user, authUser.lastSignInAt ?? authUser.createdAt);
    }

    const commentsRows = await readTableRows(admin, "style_comments");
    if (commentsRows) {
      for (const row of commentsRows) {
        const userId = resolveRowUserId(row);
        if (!userId) continue;
        const user = ensureUser(userId, {
          authorName: getStringField(row, "author_name") ?? undefined,
          avatarUrl: getStringField(row, "avatar_url"),
        });
        user.commentCount++;
        updateLastActive(user, resolveRowTimestamp(row));
      }
    }

    const ratingsRows = await readTableRows(admin, "style_ratings");
    if (ratingsRows) {
      for (const row of ratingsRows) {
        const userId = resolveRowUserId(row);
        if (!userId) continue;
        const user = ensureUser(userId);
        user.ratingCount++;
        updateLastActive(user, resolveRowTimestamp(row));
      }
    }

    const seenFavoriteKeys = new Set<string>();
    for (const tableName of FAVORITES_TABLE_CANDIDATES) {
      const favoriteRows = await readTableRows(admin, tableName);
      if (!favoriteRows) continue;

      for (const row of favoriteRows) {
        const userId = resolveRowUserId(row);
        if (!userId) continue;

        const styleSlug = getStringField(row, "style_slug");
        if (styleSlug) {
          const dedupeKey = `${userId}::${styleSlug}`;
          if (seenFavoriteKeys.has(dedupeKey)) {
            updateLastActive(ensureUser(userId), resolveRowTimestamp(row));
            continue;
          }
          seenFavoriteKeys.add(dedupeKey);
        }

        const user = ensureUser(userId);
        user.favoriteCount++;
        updateLastActive(user, resolveRowTimestamp(row));
      }
    }

    for (const tableName of SUBMISSIONS_TABLE_CANDIDATES) {
      const submissionRows = await readTableRows(admin, tableName);
      if (!submissionRows) continue;

      for (const row of submissionRows) {
        const userId = resolveRowUserId(row);
        if (!userId) continue;

        const user = ensureUser(userId, {
          authorName: getStringField(row, "author_name") ?? undefined,
        });
        user.submissionCount++;
        updateLastActive(user, resolveRowTimestamp(row));
      }
    }

    const userSeqRows = await readTableRows(admin, "user_seq_ids");
    seqIdMap = buildSeqIdMap(userSeqRows);
    titleRuleMap = buildUserTitleRuleMap(await readTableRows(admin, "user_titles"));
  } catch {
    return NextResponse.json(
      { error: "Failed to load users." },
      { status: 500 }
    );
  }

  let users = Array.from(usersMap.values());

  for (const user of users) {
    // Always prefer user_seq_ids table (dense, renumbered) over stale
    // metadata values that may still hold pre-renumber IDs (e.g. 51).
    user.seqId = seqIdMap.get(user.userId) ?? user.seqId ?? null;

    const rule = titleRuleMap.get(user.userId) ?? null;
    user.customTitle = rule?.customTitle ?? null;
    user.titleColor = rule?.titleColor ?? null;
    user.titleIconPath = rule?.titleIconPath ?? null;
    user.isOwner = rule?.isOwner ?? false;
    user.titleEnabled = rule?.titleEnabled ?? true;
    user.isEarlyUser = isEarlyUser(user.seqId);
    user.resolvedTitle = resolveUserTitle({
      userId: user.userId,
      seqId: user.seqId,
      adminUserIds,
      rule,
      fallbackCustomTitle: user.profileTitle,
    });

    if (user.authorName) {
      continue;
    }

    const email = userEmailMap.get(user.userId);
    if (email && email.includes("@")) {
      const localPart = email.split("@")[0]?.trim();
      if (localPart) {
        user.authorName = localPart;
        continue;
      }
    }

    if (UUID_RE.test(user.userId)) {
      user.authorName = `User ${user.userId.slice(0, 8)}`;
    } else {
      user.authorName = "User";
    }
  }

  if (search) {
    users = users.filter(
      (u) =>
        u.authorName.toLowerCase().includes(search) ||
        u.userId.toLowerCase().includes(search) ||
        (u.resolvedTitle ?? "").toLowerCase().includes(search) ||
        (userEmailMap.get(u.userId) ?? "").includes(search)
    );
  }

  users.sort((a, b) => {
    if (!a.lastActive && !b.lastActive) return 0;
    if (!a.lastActive) return 1;
    if (!b.lastActive) return -1;
    return b.lastActive.localeCompare(a.lastActive);
  });

  const total = users.length;
  const paged = users.slice(offset, offset + limit).map(toUserPayload);

  return NextResponse.json({ users: paged, total, limit, offset });
}

async function readAllAuthUsers(admin: SupabaseLike): Promise<AuthUserLite[]> {
  const authAdmin = admin.auth?.admin;
  if (!authAdmin?.listUsers) {
    return [];
  }

  const perPage = 1000;
  const maxPages = 20;
  const users: AuthUserLite[] = [];

  for (let page = 1; page <= maxPages; page++) {
    let result:
      | {
          data?: { users?: unknown[] } | null;
          error?: DbErrorLike | null;
        }
      | null = null;

    try {
      result = await authAdmin.listUsers({ page, perPage });
    } catch {
      break;
    }

    const { data, error } = result ?? {};
    if (error) {
      break;
    }

    const pageUsers = Array.isArray(data?.users) ? data.users : [];
    for (const rawUser of pageUsers) {
      const normalized = normalizeAuthUser(rawUser);
      if (normalized) {
        users.push(normalized);
      }
    }

    if (pageUsers.length < perPage) {
      break;
    }
  }

  return users;
}

function normalizeAuthUser(rawUser: unknown): AuthUserLite | null {
  if (!rawUser || typeof rawUser !== "object") {
    return null;
  }

  const userId = getStringField(rawUser as TableRow, "id");
  if (!userId) {
    return null;
  }

  const userMetadataRaw = (rawUser as TableRow).user_metadata;
  const userMetadata =
    userMetadataRaw && typeof userMetadataRaw === "object"
      ? (userMetadataRaw as Record<string, unknown>)
      : null;

  return {
    id: userId,
    email: getStringField(rawUser as TableRow, "email"),
    createdAt: getStringField(rawUser as TableRow, "created_at"),
    lastSignInAt: getStringField(rawUser as TableRow, "last_sign_in_at"),
    userMetadata,
  };
}

function resolveAuthorName(user: AuthUserLite): string {
  const metadata = user.userMetadata;
  const candidates = [
    readMetadataString(metadata, "full_name"),
    readMetadataString(metadata, "name"),
    readMetadataString(metadata, "preferred_username"),
    readMetadataString(metadata, "user_name"),
  ];

  for (const candidate of candidates) {
    if (candidate) return candidate;
  }

  if (user.email && user.email.includes("@")) {
    const localPart = user.email.split("@")[0]?.trim();
    if (localPart) return localPart;
  }

  return "User";
}

function resolveAvatarUrl(metadata: Record<string, unknown> | null): string | null {
  return (
    readMetadataString(metadata, "avatar_url") ??
    readMetadataString(metadata, "picture")
  );
}

function resolveMetadataSeqId(metadata: Record<string, unknown> | null): number | null {
  if (!metadata) {
    return null;
  }

  return normalizePositiveInt(metadata.seq_id);
}

function resolveMetadataProfileTitle(metadata: Record<string, unknown> | null): string | null {
  return readMetadataString(metadata, "user_title") ?? readMetadataString(metadata, "title");
}

function readMetadataString(
  metadata: Record<string, unknown> | null,
  key: string
): string | null {
  if (!metadata) return null;
  const value = metadata[key];
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

async function readTableRows(
  admin: SupabaseLike,
  tableName: string
): Promise<TableRow[] | null> {
  const { data, error } = await admin.from(tableName).select("*");
  if (error) {
    if (isSkippableSchemaError(error)) {
      return null;
    }
    throw new Error(readDbErrorMessage(error));
  }
  const rows = Array.isArray(data) ? data : [];
  return rows.filter((row): row is TableRow => !!row && typeof row === "object");
}

function buildSeqIdMap(rows: TableRow[] | null): Map<string, number> {
  const map = new Map<string, number>();
  if (!rows) {
    return map;
  }

  for (const row of rows) {
    const userId = getStringField(row, "user_id");
    const seqId = normalizePositiveInt(row.seq_id);
    if (!userId || !UUID_RE.test(userId) || seqId == null) {
      continue;
    }
    map.set(userId, seqId);
  }

  return map;
}


function toUserPayload(user: UserInfo): UserPayload {
  return {
    userId: user.userId,
    authorName: user.authorName,
    avatarUrl: user.avatarUrl,
    commentCount: user.commentCount,
    ratingCount: user.ratingCount,
    favoriteCount: user.favoriteCount,
    submissionCount: user.submissionCount,
    lastActive: user.lastActive,
    seqId: user.seqId,
    customTitle: user.customTitle,
    titleColor: user.titleColor,
    titleIconPath: user.titleIconPath,
    isOwner: user.isOwner,
    titleEnabled: user.titleEnabled,
    isEarlyUser: user.isEarlyUser,
    resolvedTitle: user.resolvedTitle,
  };
}

function resolveRowUserId(row: TableRow): string | null {
  const directUserId = getStringField(row, "user_id");
  if (directUserId && UUID_RE.test(directUserId)) {
    return directUserId;
  }

  const sessionId = getStringField(row, "session_id");
  if (!sessionId) {
    return null;
  }

  return extractUserIdFromSession(sessionId);
}

function extractUserIdFromSession(sessionId: string): string | null {
  if (sessionId.startsWith(LEGACY_USER_SESSION_PREFIX)) {
    const userId = sessionId.slice(LEGACY_USER_SESSION_PREFIX.length).trim();
    if (UUID_RE.test(userId)) {
      return userId;
    }
    return null;
  }

  if (UUID_RE.test(sessionId)) {
    return sessionId;
  }

  return null;
}

function resolveRowTimestamp(row: TableRow): string | null {
  return getStringField(row, "created_at") ?? getStringField(row, "submitted_at");
}

function getStringField(row: TableRow, key: string): string | null {
  const value = row[key];
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizePositiveInt(value: unknown): number | null {
  if (typeof value === "number" && Number.isInteger(value) && value > 0) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    if (Number.isInteger(parsed) && parsed > 0) {
      return parsed;
    }
  }

  return null;
}

function isSkippableSchemaError(error: DbErrorLike): boolean {
  const code = error.code ?? null;
  if (
    code === "42P01" ||
    code === "PGRST205" ||
    code === "PGRST204" ||
    code === "42703"
  ) {
    return true;
  }

  const message = readDbErrorMessage(error);
  return (
    (message.includes("relation") && message.includes("does not exist")) ||
    (message.includes("table") && message.includes("not found")) ||
    (message.includes("column") && message.includes("does not exist"))
  );
}

function readDbErrorMessage(error: DbErrorLike | null | undefined): string {
  return `${error?.message ?? ""} ${error?.details ?? ""}`.toLowerCase();
}
