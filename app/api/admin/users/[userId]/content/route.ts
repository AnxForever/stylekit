import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { recordAdminAuditEvent } from "@/lib/admin/audit-log";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { z } from "zod";

const LEGACY_USER_SESSION_PREFIX = "user:";

const bodySchema = z.object({
  types: z.array(z.enum(["comments", "ratings"])).min(1),
});

interface DbErrorLike {
  code?: string | null;
  message?: string | null;
  details?: string | null;
}

interface DeleteResult {
  count: number | null;
  error: DbErrorLike | null;
}

interface SupabaseDeleteLike {
  from: (tableName: string) => {
    delete: (options?: { count?: "exact" }) => {
      eq: (column: string, value: string) => Promise<DeleteResult>;
      in: (column: string, values: string[]) => Promise<DeleteResult>;
    };
  };
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ userId: string }> }
) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const { userId } = await context.params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid body.", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { types } = parsed.data;

  const sb = getSupabaseAdmin();
  if (!sb) {
    return NextResponse.json(
      { error: "Database not configured." },
      { status: 503 }
    );
  }
  const admin = sb as SupabaseDeleteLike;

  const deletedCounts: Record<string, number> = {};

  for (const type of types) {
    if (type === "comments") {
      try {
        deletedCounts.comments = await deleteRowsByUserIdOrLegacySession(
          admin,
          "style_comments",
          userId
        );
      } catch {
        return NextResponse.json(
          { error: "Failed to delete comments." },
          { status: 500 }
        );
      }
    }
    if (type === "ratings") {
      try {
        deletedCounts.ratings = await deleteRowsByUserIdOrLegacySession(
          admin,
          "style_ratings",
          userId
        );
      } catch {
        return NextResponse.json(
          { error: "Failed to delete ratings." },
          { status: 500 }
        );
      }
    }
  }

  await recordAdminAuditEvent(request, {
    action: "user.content.delete",
    targetType: "user",
    targetId: userId,
    actor: access.actor,
    metadata: { types, deletedCounts },
  });

  return NextResponse.json({ deleted: true, types, deletedCounts });
}

async function deleteRowsByUserIdOrLegacySession(
  admin: SupabaseDeleteLike,
  tableName: string,
  userId: string
): Promise<number> {
  let deletedCount = 0;

  const directDelete = await admin
    .from(tableName)
    .delete({ count: "exact" })
    .eq("user_id", userId);

  if (!directDelete.error) {
    deletedCount += directDelete.count ?? 0;
  } else if (
    !isMissingUserIdColumnError(directDelete.error) &&
    !isSkippableSchemaError(directDelete.error)
  ) {
    throw new Error(readDbErrorMessage(directDelete.error));
  }

  const legacyDelete = await admin
    .from(tableName)
    .delete({ count: "exact" })
    .in("session_id", [buildLegacyUserSessionId(userId), userId]);

  if (!legacyDelete.error) {
    deletedCount += legacyDelete.count ?? 0;
    return deletedCount;
  }

  if (isSkippableSchemaError(legacyDelete.error)) {
    return deletedCount;
  }

  throw new Error(readDbErrorMessage(legacyDelete.error));
}

function buildLegacyUserSessionId(userId: string): string {
  return `${LEGACY_USER_SESSION_PREFIX}${userId}`;
}

function isMissingUserIdColumnError(error: DbErrorLike | null | undefined): boolean {
  const code = error?.code ?? null;
  if (code !== "42703" && code !== "PGRST204") {
    return false;
  }
  return readDbErrorMessage(error).includes("user_id");
}

function isSkippableSchemaError(error: DbErrorLike | null | undefined): boolean {
  if (!error) {
    return false;
  }

  const code = error.code ?? null;
  if (
    code === "42P01" ||
    code === "PGRST205" ||
    code === "PGRST204" ||
    code === "42703" ||
    code === "23502"
  ) {
    return true;
  }

  const message = readDbErrorMessage(error);
  return (
    (message.includes("relation") && message.includes("does not exist")) ||
    (message.includes("table") && message.includes("not found")) ||
    (message.includes("column") && message.includes("does not exist")) ||
    (message.includes("null value") && message.includes("session_id"))
  );
}

function readDbErrorMessage(error: DbErrorLike | null | undefined): string {
  return `${error?.message ?? ""} ${error?.details ?? ""}`.toLowerCase();
}
