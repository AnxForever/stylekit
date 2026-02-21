import { NextResponse } from "next/server";
import { z } from "zod";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";
import { getServerUser } from "@/lib/auth/supabase-server";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { getAdminUserIds } from "@/lib/auth/admin-policy";
import {
  loadUserTitleRuleMap,
  resolveUserTitle,
  type UserTitleRule,
} from "@/lib/auth/user-title-policy";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const COMMENTS_RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const COMMENTS_RATE_LIMIT_MAX_REQUESTS = 40;
const MAX_BODY_BYTES = 8 * 1024;
const LEGACY_USER_SESSION_PREFIX = "user:";
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const commentSchema = z.object({
  content: z.string().min(1).max(280),
});

const slugSchema = z.string().regex(SLUG_RE);
const DB_NOT_READY_CODES = new Set(["42P01", "42703", "42883", "PGRST204", "PGRST205"]);

type AuthorProvider = "github" | "linuxdo" | "unknown";

interface DbErrorLike {
  code?: string | null;
  message?: string | null;
  details?: string | null;
}

interface AuthorIdentity {
  userId: string;
  displayName: string | null;
  avatarUrl: string | null;
  provider: AuthorProvider;
  seqId: number | null;
  profileTitle: string | null;
}

interface CommentOutput {
  id: string;
  content: string;
  author_name: string;
  avatar_url: string | null;
  user_id: string | null;
  created_at: string;
  author_provider: AuthorProvider;
  author_seq_id: number | null;
  author_title: string | null;
  author_title_color: string | null;
}

interface AuthLookupResult {
  data?: {
    user?: unknown;
  } | null;
  error?: DbErrorLike | null;
}

type GetUserByIdFn = (userId: string) => Promise<AuthLookupResult>;

type TableRow = Record<string, unknown>;

interface SeqLookupResult {
  data: unknown[] | null;
  error: DbErrorLike | null;
}

type SeqLookupFn = (userIds: string[]) => Promise<SeqLookupResult>;

function isTableRow(value: unknown): value is TableRow {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  return value as Record<string, unknown>;
}

function asString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function asPositiveInt(value: unknown): number | null {
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

function normalizeProvider(value: unknown): AuthorProvider {
  if (value === "github" || value === "linuxdo") {
    return value;
  }
  return "unknown";
}

function readDbErrorMessage(error: DbErrorLike | null | undefined): string {
  return `${error?.message ?? ""} ${error?.details ?? ""}`.toLowerCase();
}

function buildLegacyUserSessionId(userId: string): string {
  return `${LEGACY_USER_SESSION_PREFIX}${userId}`;
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

function shouldTryLegacyIdentity(
  error: DbErrorLike | null | undefined,
  requiredColumns: string[]
): boolean {
  if (!error) return false;

  const hasNoStructuredDetails = !error.code && !error.message && !error.details;
  if (hasNoStructuredDetails) {
    return true;
  }

  return requiredColumns.some((column) => isMissingColumnError(error, column));
}

function classifyDbError(error: DbErrorLike | null | undefined): {
  status: number;
  code: string;
  message: string;
} {
  const dbCode = error?.code ?? null;
  const combinedMessage = readDbErrorMessage(error);
  const hasSessionNullViolation =
    dbCode === "23502" && combinedMessage.includes("session_id");

  if (hasSessionNullViolation) {
    return {
      status: 503,
      code: "DB_SCHEMA_MISMATCH",
      message:
        "Comments schema is outdated. Apply Supabase migration 005 (session_id nullable).",
    };
  }

  if (dbCode && DB_NOT_READY_CODES.has(dbCode)) {
    return {
      status: 503,
      code: "DB_NOT_READY",
      message: "Comments database schema is not ready. Run Supabase migrations 002-005.",
    };
  }

  return {
    status: 500,
    code: "DB_WRITE_FAILED",
    message: "Failed to save comment.",
  };
}

function parseLegacySessionUserId(sessionId: string | null): string | null {
  if (!sessionId) {
    return null;
  }

  const trimmed = sessionId.trim();
  if (!trimmed) {
    return null;
  }

  const candidate = trimmed.startsWith(LEGACY_USER_SESSION_PREFIX)
    ? trimmed.slice(LEGACY_USER_SESSION_PREFIX.length)
    : trimmed;

  return UUID_RE.test(candidate) ? candidate : null;
}

function resolveRowUserId(row: TableRow): string | null {
  const fromUserIdColumn = asString(row.user_id);
  if (fromUserIdColumn) {
    return fromUserIdColumn;
  }

  const fromSession = parseLegacySessionUserId(asString(row.session_id));
  if (fromSession) {
    return fromSession;
  }

  return null;
}

function defaultAuthorName(userId: string | null): string {
  if (userId && UUID_RE.test(userId)) {
    return `User ${userId.slice(0, 8)}`;
  }
  return "User";
}

function buildIdentityFromAuthData(
  userId: string,
  userMetadataRaw: unknown,
  appMetadataRaw: unknown
): AuthorIdentity {
  const userMetadata = asRecord(userMetadataRaw);
  const appMetadata = asRecord(appMetadataRaw);

  return {
    userId,
    displayName:
      asString(userMetadata.user_name) ??
      asString(userMetadata.full_name) ??
      asString(userMetadata.name),
    avatarUrl: asString(userMetadata.avatar_url),
    provider: normalizeProvider(userMetadata.provider ?? appMetadata.provider),
    seqId: asPositiveInt(userMetadata.seq_id),
    profileTitle: asString(userMetadata.user_title) ?? asString(userMetadata.title),
  };
}

function baseIdentity(userId: string): AuthorIdentity {
  return {
    userId,
    displayName: null,
    avatarUrl: null,
    provider: "unknown",
    seqId: null,
    profileTitle: null,
  };
}

async function lookupSeqIdMap(
  userIds: string[],
  lookup: SeqLookupFn
): Promise<Map<string, number>> {
  const result = new Map<string, number>();
  if (userIds.length === 0) {
    return result;
  }

  try {
    const { data, error } = await lookup(userIds);
    if (error || !Array.isArray(data)) {
      return result;
    }

    for (const row of data) {
      if (!isTableRow(row)) {
        continue;
      }
      const userId = asString(row.user_id);
      const seqId = asPositiveInt(row.seq_id);
      if (!userId || seqId == null) {
        continue;
      }
      result.set(userId, seqId);
    }
  } catch {
    return result;
  }

  return result;
}

async function loadAuthorIdentities(
  userIds: string[],
  getUserById: GetUserByIdFn | undefined,
  lookupSeqIds: SeqLookupFn
): Promise<Map<string, AuthorIdentity>> {
  const map = new Map<string, AuthorIdentity>();
  if (userIds.length === 0) {
    return map;
  }

  await Promise.all(
    userIds.map(async (userId) => {
      let identity = baseIdentity(userId);

      if (getUserById && UUID_RE.test(userId)) {
        try {
          const authResult = await getUserById(userId);
          const rawUser = authResult.data?.user;

          if (isTableRow(rawUser)) {
            identity = buildIdentityFromAuthData(
              userId,
              rawUser.user_metadata,
              rawUser.app_metadata
            );
          }
        } catch {
          // Ignore auth lookup failures so comments can still load.
        }
      }

      map.set(userId, identity);
    })
  );

  const seqLookupUserIds = Array.from(
    new Set(
      Array.from(map.keys()).filter((userId) => UUID_RE.test(userId))
    )
  );

  if (seqLookupUserIds.length > 0) {
    const seqIdMap = await lookupSeqIdMap(seqLookupUserIds, lookupSeqIds);

    for (const userId of seqLookupUserIds) {
      const current = map.get(userId);
      if (!current) {
        continue;
      }

      const dbSeqId = seqIdMap.get(userId);
      // Always prefer DB value; if user has no row in user_seq_ids,
      // clear stale metadata seq_id that may hold pre-renumber values.
      map.set(userId, { ...current, seqId: dbSeqId ?? null });
    }
  }

  return map;
}

function toCommentOutput(
  rawRow: unknown,
  identity: AuthorIdentity | null,
  fallbackUserId: string | null = null,
  options?: {
    adminUserIds: Set<string>;
    titleRuleMap: Map<string, UserTitleRule>;
  }
): CommentOutput {
  const row = isTableRow(rawRow) ? rawRow : {};
  const resolvedUserId = resolveRowUserId(row) ?? fallbackUserId;
  const resolvedRule =
    resolvedUserId && options
      ? options.titleRuleMap.get(resolvedUserId) ?? null
      : null;
  const resolvedTitle =
    resolvedUserId && options
      ? resolveUserTitle({
          userId: resolvedUserId,
          seqId: identity?.seqId ?? null,
          adminUserIds: options.adminUserIds,
          rule: resolvedRule,
          fallbackCustomTitle: identity?.profileTitle ?? null,
        })
      : null;
  const resolvedTitleColor =
    resolvedTitle && resolvedRule?.titleColor ? resolvedRule.titleColor : null;

  return {
    id: asString(row.id) ?? "",
    content: asString(row.content) ?? "",
    author_name:
      asString(row.author_name) ??
      identity?.displayName ??
      defaultAuthorName(resolvedUserId),
    avatar_url: asString(row.avatar_url) ?? identity?.avatarUrl ?? null,
    user_id: resolvedUserId,
    created_at: asString(row.created_at) ?? new Date(0).toISOString(),
    author_provider: identity?.provider ?? "unknown",
    author_seq_id: identity?.seqId ?? null,
    author_title: resolvedTitle,
    author_title_color: resolvedTitleColor,
  };
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const slugParsed = slugSchema.safeParse(slug);
    if (!slugParsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid style slug" },
        { status: 400 }
      );
    }

    const originCheck = verifyTrustedOrigin(request);
    if (!originCheck.ok) {
      return NextResponse.json(
        { success: false, error: originCheck.error },
        { status: originCheck.status ?? 403 }
      );
    }

    const rateLimit = checkRateLimit({
      namespace: "api:style-comments",
      key: getRequestClientKey(request),
      limit: COMMENTS_RATE_LIMIT_MAX_REQUESTS,
      windowMs: COMMENTS_RATE_LIMIT_WINDOW_MS,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { success: false, error: "Too many comment requests. Please try again later." },
        { status: 429, headers: createRateLimitHeaders(rateLimit) }
      );
    }

    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { success: false, error: "Comments require database configuration" },
        { status: 503 }
      );
    }

    const user = await getServerUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Sign in to comment" },
        { status: 401 }
      );
    }

    const bodyResult = await parseJsonBodyWithLimit(request, {
      maxBytes: MAX_BODY_BYTES,
      tooLargeMessage: "Comment payload is too large.",
      invalidJsonMessage: "Invalid request",
    });
    if (!bodyResult.ok) {
      return NextResponse.json(
        { success: false, error: bodyResult.error },
        { status: bodyResult.status }
      );
    }

    const body = bodyResult.data;
    const parsed = commentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Invalid comment. Max 280 characters." },
        { status: 400 }
      );
    }

    const { createClient } = await import("@supabase/supabase-js");
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const adminUserIds = new Set(getAdminUserIds());
    let identity = buildIdentityFromAuthData(
      user.id,
      user.user_metadata,
      user.app_metadata
    );

    if (UUID_RE.test(user.id)) {
      const seqMap = await lookupSeqIdMap([user.id], async (userIds) => {
        const { data, error } = await sb
          .from("user_seq_ids")
          .select("user_id, seq_id")
          .in("user_id", userIds);

        return {
          data: Array.isArray(data) ? (data as unknown[]) : null,
          error: (error as DbErrorLike | null) ?? null,
        };
      });
      const seqId = seqMap.get(user.id);
      if (seqId != null) {
        identity = { ...identity, seqId };
      }
    }

    const titleRuleMap = await loadUserTitleRuleMap(
      UUID_RE.test(user.id) ? [user.id] : [],
      async (userIds) => {
        const { data, error } = await sb
          .from("user_titles")
          .select("user_id, custom_title, title_color, is_owner, title_enabled, updated_at, updated_by")
          .in("user_id", userIds);

        return {
          data: Array.isArray(data) ? (data as unknown[]) : null,
          error: (error as DbErrorLike | null) ?? null,
        };
      }
    );

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? null;

    const authorName = identity.displayName ?? "User";
    const avatarUrl = identity.avatarUrl;
    const legacySessionId = buildLegacyUserSessionId(user.id);
    let useLegacyIdentity = false;

    // Rate limit: max 5 comments per identity per style per day
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const userScopedCount = await sb
      .from("style_comments")
      .select("*", { count: "exact", head: true })
      .eq("style_slug", slugParsed.data)
      .eq("user_id", user.id)
      .gte("created_at", oneDayAgo);
    let commentCount = userScopedCount.count ?? 0;
    if (userScopedCount.error) {
      const userCountError = userScopedCount.error as DbErrorLike;
      if (shouldTryLegacyIdentity(userCountError, ["user_id"])) {
        const legacyScopedCount = await sb
          .from("style_comments")
          .select("*", { count: "exact", head: true })
          .eq("style_slug", slugParsed.data)
          .in("session_id", [legacySessionId, user.id])
          .gte("created_at", oneDayAgo);
        if (legacyScopedCount.error) {
          const classified = classifyDbError(legacyScopedCount.error as DbErrorLike);
          return NextResponse.json(
            { success: false, code: classified.code, error: classified.message },
            { status: classified.status }
          );
        }
        useLegacyIdentity = true;
        commentCount = legacyScopedCount.count ?? 0;
      } else {
        const classified = classifyDbError(userCountError);
        return NextResponse.json(
          { success: false, code: classified.code, error: classified.message },
          { status: classified.status }
        );
      }
    }

    if (commentCount >= 5) {
      return NextResponse.json(
        { success: false, error: "Comment limit reached. Try again later." },
        { status: 429 }
      );
    }

    const modernInsertResult = await sb
      .from("style_comments")
      .insert({
        style_slug: slugParsed.data,
        content: parsed.data.content,
        author_name: authorName,
        session_id: null,
        user_id: user.id,
        avatar_url: avatarUrl,
        ip_address: ip,
      })
      .select("id, content, author_name, avatar_url, user_id, session_id, created_at")
      .single();
    if (!modernInsertResult.error) {
      return NextResponse.json({
        success: true,
        comment: toCommentOutput(modernInsertResult.data, identity, user.id, {
          adminUserIds,
          titleRuleMap,
        }),
      });
    }

    const modernInsertError = modernInsertResult.error as DbErrorLike;
    if (!useLegacyIdentity && !shouldTryLegacyIdentity(modernInsertError, ["user_id", "avatar_url"])) {
      const classified = classifyDbError(modernInsertError);
      return NextResponse.json(
        { success: false, code: classified.code, error: classified.message },
        { status: classified.status }
      );
    }

    const legacyInsertResult = await sb
      .from("style_comments")
      .insert({
        style_slug: slugParsed.data,
        content: parsed.data.content,
        author_name: authorName,
        session_id: legacySessionId,
        ip_address: ip,
      })
      .select("id, content, author_name, session_id, created_at")
      .single();

    if (legacyInsertResult.error) {
      const classified = classifyDbError(legacyInsertResult.error as DbErrorLike);
      return NextResponse.json(
        { success: false, code: classified.code, error: classified.message },
        { status: classified.status }
      );
    }

    return NextResponse.json({
      success: true,
      comment: toCommentOutput(legacyInsertResult.data, identity, user.id, {
        adminUserIds,
        titleRuleMap,
      }),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const slugParsed = slugSchema.safeParse(slug);
  if (!slugParsed.success) {
    return NextResponse.json(
      { comments: [], total: 0, error: "Invalid style slug" },
      { status: 400 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ comments: [], total: 0 });
  }

  const { searchParams } = new URL(request.url);
  const limitParam = Number.parseInt(searchParams.get("limit") ?? "20", 10);
  const offsetParam = Number.parseInt(searchParams.get("offset") ?? "0", 10);
  const limit = Number.isFinite(limitParam)
    ? Math.min(Math.max(limitParam, 1), 50)
    : 20;
  const offset = Number.isFinite(offsetParam) ? Math.max(offsetParam, 0) : 0;

  const { createClient } = await import("@supabase/supabase-js");
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const adminUserIds = new Set(getAdminUserIds());
  const authAdmin = sb.auth?.admin;
  const getUserById: GetUserByIdFn | undefined =
    authAdmin && typeof authAdmin.getUserById === "function"
      ? (userId: string) => authAdmin.getUserById(userId)
      : undefined;

  const lookupSeqIds: SeqLookupFn = async (userIds) => {
    const { data, error } = await sb
      .from("user_seq_ids")
      .select("user_id, seq_id")
      .in("user_id", userIds);

    return {
      data: Array.isArray(data) ? (data as unknown[]) : null,
      error: (error as DbErrorLike | null) ?? null,
    };
  };

  const modernListResult = await sb
    .from("style_comments")
    .select("id, content, author_name, avatar_url, user_id, session_id, created_at", { count: "exact" })
    .eq("style_slug", slugParsed.data)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);
  if (!modernListResult.error) {
    const rows = Array.isArray(modernListResult.data)
      ? (modernListResult.data as unknown[])
      : [];

    const userIds = Array.from(
      new Set(
        rows
          .filter(isTableRow)
          .map((row) => resolveRowUserId(row))
          .filter((userId): userId is string => Boolean(userId))
      )
    );

    const identityMap = await loadAuthorIdentities(
      userIds,
      getUserById,
      lookupSeqIds
    );

    const titleRuleMap = await loadUserTitleRuleMap(
      userIds.filter((userId) => UUID_RE.test(userId)),
      async (ids) => {
        const { data, error } = await sb
          .from("user_titles")
          .select("user_id, custom_title, title_color, is_owner, title_enabled, updated_at, updated_by")
          .in("user_id", ids);

        return {
          data: Array.isArray(data) ? (data as unknown[]) : null,
          error: (error as DbErrorLike | null) ?? null,
        };
      }
    );

    const comments = rows.map((row) => {
      const tableRow = isTableRow(row) ? row : {};
      const userId = resolveRowUserId(tableRow);
      const identity = userId ? identityMap.get(userId) ?? null : null;
      return toCommentOutput(tableRow, identity, userId, {
        adminUserIds,
        titleRuleMap,
      });
    });

    return NextResponse.json({
      comments,
      total: modernListResult.count ?? 0,
    });
  }

  const listError = modernListResult.error as DbErrorLike;
  if (!shouldTryLegacyIdentity(listError, ["user_id", "avatar_url"])) {
    const classified = classifyDbError(listError);
    return NextResponse.json(
      {
        comments: [],
        total: 0,
        code: classified.code,
        error: classified.message,
      },
      { status: classified.status }
    );
  }

  const legacyListResult = await sb
    .from("style_comments")
    .select("id, content, author_name, session_id, created_at", { count: "exact" })
    .eq("style_slug", slugParsed.data)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);
  if (legacyListResult.error) {
    const classified = classifyDbError(legacyListResult.error as DbErrorLike);
    return NextResponse.json(
      {
        comments: [],
        total: 0,
        code: classified.code,
        error: classified.message,
      },
      { status: classified.status }
    );
  }

  const legacyRows = Array.isArray(legacyListResult.data)
    ? (legacyListResult.data as unknown[])
    : [];

  const legacyUserIds = Array.from(
    new Set(
      legacyRows
        .filter(isTableRow)
        .map((row) => resolveRowUserId(row))
        .filter((userId): userId is string => Boolean(userId))
    )
  );

  const legacyIdentityMap = await loadAuthorIdentities(
    legacyUserIds,
    getUserById,
    lookupSeqIds
  );

  const legacyTitleRuleMap = await loadUserTitleRuleMap(
    legacyUserIds.filter((userId) => UUID_RE.test(userId)),
    async (ids) => {
      const { data, error } = await sb
        .from("user_titles")
        .select("user_id, custom_title, title_color, is_owner, title_enabled, updated_at, updated_by")
        .in("user_id", ids);

      return {
        data: Array.isArray(data) ? (data as unknown[]) : null,
        error: (error as DbErrorLike | null) ?? null,
      };
    }
  );

  const comments = legacyRows.map((row) => {
    const tableRow = isTableRow(row) ? row : {};
    const userId = resolveRowUserId(tableRow);
    const identity = userId ? legacyIdentityMap.get(userId) ?? null : null;
    return toCommentOutput(tableRow, identity, userId, {
      adminUserIds,
      titleRuleMap: legacyTitleRuleMap,
    });
  });

  return NextResponse.json({
    comments,
    total: legacyListResult.count ?? 0,
  });
}
