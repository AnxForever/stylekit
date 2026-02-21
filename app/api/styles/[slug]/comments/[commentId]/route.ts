import { NextResponse } from "next/server";
import { z } from "zod";
import { getServerUser } from "@/lib/auth/supabase-server";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const LEGACY_USER_SESSION_PREFIX = "user:";
const MAX_BODY_BYTES = 8 * 1024;

const slugSchema = z.string().regex(SLUG_RE);
const commentIdSchema = z.string().uuid();
const updateSchema = z.object({
  content: z.string().min(1).max(280),
});

interface DbErrorLike {
  code?: string | null;
  message?: string | null;
  details?: string | null;
}

interface CommentOwnerRow {
  id: string;
  user_id: string | null;
  session_id: string | null;
}

interface SupabaseLike {
  from: (tableName: string) => {
    select: (columns: string) => {
      eq: (column: string, value: string) => {
        eq: (column: string, value: string) => {
          maybeSingle: () => Promise<{ data: unknown; error: DbErrorLike | null }>;
        };
      };
    };
    update: (payload: Record<string, unknown>) => {
      eq: (column: string, value: string) => {
        eq: (column: string, value: string) => Promise<{ error: DbErrorLike | null }>;
      };
    };
    delete: () => {
      eq: (column: string, value: string) => {
        eq: (column: string, value: string) => Promise<{ error: DbErrorLike | null }>;
      };
    };
  };
}

function readDbErrorMessage(error: DbErrorLike | null | undefined): string {
  return `${error?.message ?? ""} ${error?.details ?? ""}`.toLowerCase();
}

function isMissingUserIdColumnError(error: DbErrorLike | null | undefined): boolean {
  const code = error?.code ?? null;
  if (code !== "42703" && code !== "PGRST204") {
    return false;
  }

  return readDbErrorMessage(error).includes("user_id");
}

function asString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeOwnerRow(row: unknown): CommentOwnerRow | null {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return null;
  }

  const record = row as Record<string, unknown>;
  const id = asString(record.id);
  if (!id) {
    return null;
  }

  return {
    id,
    user_id: asString(record.user_id),
    session_id: asString(record.session_id),
  };
}

function canMutateComment(row: CommentOwnerRow, userId: string): boolean {
  if (row.user_id) {
    return row.user_id === userId;
  }

  if (!row.session_id) {
    return false;
  }

  return (
    row.session_id === userId ||
    row.session_id === `${LEGACY_USER_SESSION_PREFIX}${userId}`
  );
}

async function loadCommentOwner(
  sb: SupabaseLike,
  slug: string,
  commentId: string
): Promise<{ row: CommentOwnerRow | null; error: DbErrorLike | null }> {
  const modernResult = await sb
    .from("style_comments")
    .select("id, user_id, session_id")
    .eq("style_slug", slug)
    .eq("id", commentId)
    .maybeSingle();

  if (!modernResult.error) {
    return {
      row: normalizeOwnerRow(modernResult.data),
      error: null,
    };
  }

  const modernError = modernResult.error as DbErrorLike;
  if (!isMissingUserIdColumnError(modernError)) {
    return { row: null, error: modernError };
  }

  const legacyResult = await sb
    .from("style_comments")
    .select("id, session_id")
    .eq("style_slug", slug)
    .eq("id", commentId)
    .maybeSingle();

  if (legacyResult.error) {
    return {
      row: null,
      error: legacyResult.error as DbErrorLike,
    };
  }

  return {
    row: normalizeOwnerRow(legacyResult.data),
    error: null,
  };
}

function parseParams(raw: { slug: string; commentId: string }):
  | { ok: true; slug: string; commentId: string }
  | { ok: false; response: NextResponse } {
  const slugParsed = slugSchema.safeParse(raw.slug);
  if (!slugParsed.success) {
    return {
      ok: false,
      response: NextResponse.json(
        { success: false, error: "Invalid style slug" },
        { status: 400 }
      ),
    };
  }

  const commentIdParsed = commentIdSchema.safeParse(raw.commentId);
  if (!commentIdParsed.success) {
    return {
      ok: false,
      response: NextResponse.json(
        { success: false, error: "Invalid comment id" },
        { status: 400 }
      ),
    };
  }

  return {
    ok: true,
    slug: slugParsed.data,
    commentId: commentIdParsed.data,
  };
}

async function createServiceClient() {
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  ) as unknown as SupabaseLike;
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ slug: string; commentId: string }> }
) {
  const parsedParams = parseParams(await context.params);
  if (!parsedParams.ok) {
    return parsedParams.response;
  }

  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { success: false, error: originCheck.error },
      { status: originCheck.status ?? 403 }
    );
  }

  const user = await getServerUser();
  if (!user) {
    return NextResponse.json(
      { success: false, error: "Sign in to edit comment" },
      { status: 401 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { success: false, error: "Comments require database configuration" },
      { status: 503 }
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

  const bodyParsed = updateSchema.safeParse(bodyResult.data);
  if (!bodyParsed.success) {
    return NextResponse.json(
      { success: false, error: "Invalid comment. Max 280 characters." },
      { status: 400 }
    );
  }

  const sb = await createServiceClient();

  const ownerResult = await loadCommentOwner(sb, parsedParams.slug, parsedParams.commentId);
  if (ownerResult.error) {
    return NextResponse.json(
      { success: false, error: "Failed to load comment" },
      { status: 500 }
    );
  }

  if (!ownerResult.row) {
    return NextResponse.json(
      { success: false, error: "Comment not found" },
      { status: 404 }
    );
  }

  if (!canMutateComment(ownerResult.row, user.id)) {
    return NextResponse.json(
      { success: false, error: "You can only edit your own comments" },
      { status: 403 }
    );
  }

  const { error } = await sb
    .from("style_comments")
    .update({ content: bodyParsed.data.content.trim() })
    .eq("style_slug", parsedParams.slug)
    .eq("id", parsedParams.commentId);

  if (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update comment" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ slug: string; commentId: string }> }
) {
  const parsedParams = parseParams(await context.params);
  if (!parsedParams.ok) {
    return parsedParams.response;
  }

  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { success: false, error: originCheck.error },
      { status: originCheck.status ?? 403 }
    );
  }

  const user = await getServerUser();
  if (!user) {
    return NextResponse.json(
      { success: false, error: "Sign in to delete comment" },
      { status: 401 }
    );
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { success: false, error: "Comments require database configuration" },
      { status: 503 }
    );
  }

  const sb = await createServiceClient();

  const ownerResult = await loadCommentOwner(sb, parsedParams.slug, parsedParams.commentId);
  if (ownerResult.error) {
    return NextResponse.json(
      { success: false, error: "Failed to load comment" },
      { status: 500 }
    );
  }

  if (!ownerResult.row) {
    return NextResponse.json(
      { success: false, error: "Comment not found" },
      { status: 404 }
    );
  }

  if (!canMutateComment(ownerResult.row, user.id)) {
    return NextResponse.json(
      { success: false, error: "You can only delete your own comments" },
      { status: 403 }
    );
  }

  const { error } = await sb
    .from("style_comments")
    .delete()
    .eq("style_slug", parsedParams.slug)
    .eq("id", parsedParams.commentId);

  if (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete comment" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
