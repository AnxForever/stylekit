import { NextResponse } from "next/server";
import { z } from "zod";
import { recordAdminAuditEvent } from "@/lib/admin/audit-log";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import {
  isUserTitlesSchemaMissing,
  normalizeCustomTitleInput,
  normalizeTitleColorInput,
  normalizeTitleIconPathInput,
  USER_TITLE_ICON_PATH_MAX_LENGTH,
  USER_TITLE_MAX_LENGTH,
} from "@/lib/auth/user-title-policy";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const paramsSchema = z.object({
  userId: z.string().uuid(),
});

const bodySchema = z
  .object({
    customTitle: z.union([z.string(), z.null()]).optional(),
    titleColor: z.union([z.string(), z.null()]).optional(),
    titleIconPath: z.union([z.string(), z.null()]).optional(),
    isOwner: z.boolean().optional(),
    titleEnabled: z.boolean().optional(),
  })
  .refine(
    (value) =>
      value.customTitle !== undefined ||
      value.titleColor !== undefined ||
      value.titleIconPath !== undefined ||
      value.isOwner !== undefined ||
      value.titleEnabled !== undefined,
    { message: "Provide at least one field to update." }
  );

interface DbErrorLike {
  code?: string | null;
  message?: string | null;
  details?: string | null;
}

interface TitleRuleResponse {
  userId: string;
  customTitle: string | null;
  titleColor: string | null;
  titleIconPath: string | null;
  isOwner: boolean;
  titleEnabled: boolean;
  updatedAt: string | null;
  updatedBy: string | null;
}

function isMissingTitleIconColumnError(
  error: DbErrorLike | null | undefined
): boolean {
  if (!error) {
    return false;
  }

  const code = error.code ?? null;
  if (code !== "42703" && code !== "PGRST204") {
    return false;
  }

  const message = `${error.message ?? ""} ${error.details ?? ""}`.toLowerCase();
  return message.includes("title_icon_path");
}

export async function PUT(
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

  const rawParams = await context.params;
  const parsedParams = paramsSchema.safeParse(rawParams);
  if (!parsedParams.success) {
    return NextResponse.json(
      { error: "Invalid user id." },
      { status: 400 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const parsedBody = bodySchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json(
      { error: "Invalid body.", details: parsedBody.error.flatten() },
      { status: 400 }
    );
  }

  const sb = getSupabaseAdmin();
  if (!sb) {
    return NextResponse.json(
      { error: "Database not configured." },
      { status: 503 }
    );
  }

  const { userId } = parsedParams.data;
  const payload: Record<string, unknown> = {
    user_id: userId,
    updated_at: new Date().toISOString(),
    updated_by: access.actor?.id ?? "unknown",
  };
  let normalizedTitleColorForAudit: string | null | undefined;
  let normalizedTitleIconPathForAudit: string | null | undefined;

  if (parsedBody.data.customTitle !== undefined) {
    const normalized = normalizeCustomTitleInput(parsedBody.data.customTitle);
    if (!normalized.ok) {
      return NextResponse.json(
        {
          error:
            normalized.error ??
            `customTitle must be at most ${USER_TITLE_MAX_LENGTH} characters.`,
        },
        { status: 400 }
      );
    }
    payload.custom_title = normalized.value;
  }

  if (parsedBody.data.titleColor !== undefined) {
    const normalized = normalizeTitleColorInput(parsedBody.data.titleColor);
    if (!normalized.ok) {
      return NextResponse.json(
        {
          error:
            normalized.error ??
            "titleColor must be a valid hex color like #ff5a7a.",
        },
        { status: 400 }
      );
    }
    payload.title_color = normalized.value;
    normalizedTitleColorForAudit = normalized.value;
  }

  if (parsedBody.data.titleIconPath !== undefined) {
    const normalized = normalizeTitleIconPathInput(parsedBody.data.titleIconPath);
    if (!normalized.ok) {
      return NextResponse.json(
        {
          error:
            normalized.error ??
            `titleIconPath must be at most ${USER_TITLE_ICON_PATH_MAX_LENGTH} characters.`,
        },
        { status: 400 }
      );
    }
    payload.title_icon_path = normalized.value;
    normalizedTitleIconPathForAudit = normalized.value;
  }

  if (parsedBody.data.isOwner !== undefined) {
    payload.is_owner = parsedBody.data.isOwner;
  }

  if (parsedBody.data.titleEnabled !== undefined) {
    payload.title_enabled = parsedBody.data.titleEnabled;
  }

  const selectWithIcon =
    "user_id, custom_title, title_color, title_icon_path, is_owner, title_enabled, updated_at, updated_by";
  const selectWithoutIcon =
    "user_id, custom_title, title_color, is_owner, title_enabled, updated_at, updated_by";

  const primaryResult = await sb
    .from("user_titles")
    .upsert(payload, { onConflict: "user_id" })
    .select(selectWithIcon)
    .single();

  let data = primaryResult.data;
  let error = primaryResult.error;

  if (error && isMissingTitleIconColumnError(error as DbErrorLike)) {
    const fallbackPayload = { ...payload };
    delete fallbackPayload.title_icon_path;
    const fallbackResult = await sb
      .from("user_titles")
      .upsert(fallbackPayload, { onConflict: "user_id" })
      .select(selectWithoutIcon)
      .single();
    data = fallbackResult.data;
    error = fallbackResult.error;
  }

  if (error) {
    const dbError = error as DbErrorLike;
    if (isMissingTitleIconColumnError(dbError)) {
      return NextResponse.json(
        {
          error:
            "Title icon column is not ready. Apply Supabase migration 012.",
        },
        { status: 503 }
      );
    }

    if (isUserTitlesSchemaMissing(dbError)) {
      return NextResponse.json(
        {
          error:
            "Title table is not ready. Apply Supabase migrations 006, 009, and 012.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  await recordAdminAuditEvent(request, {
    action: "user.title.update",
    targetType: "user",
    targetId: userId,
    actor: access.actor,
    metadata: {
      customTitle: parsedBody.data.customTitle ?? null,
      titleColor: normalizedTitleColorForAudit,
      titleIconPath: normalizedTitleIconPathForAudit,
      isOwner: parsedBody.data.isOwner,
      titleEnabled: parsedBody.data.titleEnabled,
    },
  });

  return NextResponse.json({
    success: true,
    rule: toRuleResponse(data, userId),
  });
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

  const rawParams = await context.params;
  const parsedParams = paramsSchema.safeParse(rawParams);
  if (!parsedParams.success) {
    return NextResponse.json(
      { error: "Invalid user id." },
      { status: 400 }
    );
  }

  const sb = getSupabaseAdmin();
  if (!sb) {
    return NextResponse.json(
      { error: "Database not configured." },
      { status: 503 }
    );
  }

  const { userId } = parsedParams.data;
  const { error, count } = await sb
    .from("user_titles")
    .delete({ count: "exact" })
    .eq("user_id", userId);

  if (error) {
    const dbError = error as DbErrorLike;
    if (isUserTitlesSchemaMissing(dbError)) {
      return NextResponse.json(
        {
          error:
            "Title table is not ready. Apply Supabase migrations 006 and 009.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  await recordAdminAuditEvent(request, {
    action: "user.title.clear",
    targetType: "user",
    targetId: userId,
    actor: access.actor,
    metadata: {
      deleted: count ?? 0,
    },
  });

  return NextResponse.json({
    success: true,
    deleted: count ?? 0,
  });
}

function toRuleResponse(data: unknown, userId: string): TitleRuleResponse {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return {
      userId,
      customTitle: null,
      titleColor: null,
      titleIconPath: null,
      isOwner: false,
      titleEnabled: true,
      updatedAt: null,
      updatedBy: null,
    };
  }

  const row = data as Record<string, unknown>;
  return {
    userId: toStringOrNull(row.user_id) ?? userId,
    customTitle: toStringOrNull(row.custom_title),
    titleColor: toTitleColorOrNull(row.title_color),
    titleIconPath: toTitleIconPathOrNull(row.title_icon_path),
    isOwner: toBooleanOrDefault(row.is_owner, false),
    titleEnabled: toBooleanOrDefault(row.title_enabled, true),
    updatedAt: toStringOrNull(row.updated_at),
    updatedBy: toStringOrNull(row.updated_by),
  };
}

function toStringOrNull(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function toBooleanOrDefault(value: unknown, fallback: boolean): boolean {
  if (typeof value === "boolean") {
    return value;
  }
  return fallback;
}

function toTitleColorOrNull(value: unknown): string | null {
  const normalized = normalizeTitleColorInput(value);
  if (!normalized.ok) {
    return null;
  }
  return normalized.value;
}

function toTitleIconPathOrNull(value: unknown): string | null {
  const normalized = normalizeTitleIconPathInput(value);
  if (!normalized.ok) {
    return null;
  }
  return normalized.value;
}
