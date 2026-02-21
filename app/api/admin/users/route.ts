import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
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

  try {
    const authUsers = await readAllAuthUsers(admin);
    for (const authUser of authUsers) {
      const authorName = resolveAuthorName(authUser);
      const avatarUrl = resolveAvatarUrl(authUser.userMetadata);
      const user = ensureUser(authUser.id, authorName, avatarUrl);
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
        const user = ensureUser(
          userId,
          getStringField(row, "author_name") ?? undefined,
          getStringField(row, "avatar_url")
        );
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

        const user = ensureUser(
          userId,
          getStringField(row, "author_name") ?? undefined
        );
        user.submissionCount++;
        updateLastActive(user, resolveRowTimestamp(row));
      }
    }
  } catch {
    return NextResponse.json(
      { error: "Failed to load users." },
      { status: 500 }
    );
  }

  let users = Array.from(usersMap.values());

  if (search) {
    users = users.filter(
      (u) =>
        u.authorName.toLowerCase().includes(search) ||
        u.userId.toLowerCase().includes(search) ||
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
  const paged = users.slice(offset, offset + limit);

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

function resolveRowUserId(row: TableRow): string | null {
  const directUserId = getStringField(row, "user_id");
  if (directUserId) {
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
    return userId.length > 0 ? userId : null;
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
