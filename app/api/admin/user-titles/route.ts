import { NextResponse } from "next/server";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import {
  isUserTitlesSchemaMissing,
  normalizeTitleColorInput,
  normalizeTitleIconPathInput,
} from "@/lib/auth/user-title-policy";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

interface DbErrorLike {
  code?: string | null;
  message?: string | null;
  details?: string | null;
}

interface TitleRuleItem {
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

export async function GET(request: Request) {
  const access = await checkAdminApiAccess(request);
  if (!access.allowed) {
    return NextResponse.json(
      { error: access.error },
      { status: access.status ?? 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const limitParam = Number.parseInt(searchParams.get("limit") ?? "20", 10);
  const offsetParam = Number.parseInt(searchParams.get("offset") ?? "0", 10);
  const search = searchParams.get("search")?.trim() ?? "";

  const limit = Number.isFinite(limitParam)
    ? Math.min(Math.max(limitParam, 1), 100)
    : 20;
  const offset = Number.isFinite(offsetParam) ? Math.max(offsetParam, 0) : 0;

  const sb = getSupabaseAdmin();
  if (!sb) {
    return NextResponse.json({ items: [], total: 0, limit, offset });
  }

  const buildQuery = (withIcon: boolean) => {
    let query = sb.from("user_titles").select(
      withIcon
        ? "user_id, custom_title, title_color, title_icon_path, is_owner, title_enabled, updated_at, updated_by"
        : "user_id, custom_title, title_color, is_owner, title_enabled, updated_at, updated_by",
      {
        count: "exact",
      }
    );

    if (search) {
      if (UUID_RE.test(search)) {
        query = query.eq("user_id", search);
      } else {
        query = query.ilike("custom_title", `%${search}%`);
      }
    }

    return query
      .order("updated_at", { ascending: false })
      .range(offset, offset + limit - 1);
  };

  let result = await buildQuery(true);
  if (result.error && isMissingTitleIconColumnError(result.error as DbErrorLike)) {
    result = await buildQuery(false);
  }

  const { data, count, error } = result;

  if (error) {
    const dbError = error as DbErrorLike;
    if (isUserTitlesSchemaMissing(dbError)) {
      return NextResponse.json({ items: [], total: 0, limit, offset });
    }

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  const rows = Array.isArray(data) ? data : [];
  const items: TitleRuleItem[] = rows
    .map((row) => {
      if (!row || typeof row !== "object") {
        return null;
      }
      const record = row as Record<string, unknown>;
      const userId = toStringOrNull(record.user_id);
      if (!userId) {
        return null;
      }
      return {
        userId,
        customTitle: toStringOrNull(record.custom_title),
        titleColor: toTitleColorOrNull(record.title_color),
        titleIconPath: toTitleIconPathOrNull(record.title_icon_path),
        isOwner: toBooleanOrDefault(record.is_owner, false),
        titleEnabled: toBooleanOrDefault(record.title_enabled, true),
        updatedAt: toStringOrNull(record.updated_at),
        updatedBy: toStringOrNull(record.updated_by),
      };
    })
    .filter((item): item is TitleRuleItem => item !== null);

  return NextResponse.json({
    items,
    total: count ?? 0,
    limit,
    offset,
  });
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
