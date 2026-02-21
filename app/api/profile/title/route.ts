import { NextResponse } from "next/server";
import { getServerUser } from "@/lib/auth/supabase-server";
import { getAdminUserIds } from "@/lib/auth/admin-policy";
import {
  loadUserTitleRuleMap,
  resolveUserTitle,
  type DbErrorLike,
  type UserTitleRule,
} from "@/lib/auth/user-title-policy";
import { isSupabaseConfigured } from "@/lib/submit/reviewer-supabase";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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

function isSkippableSeqLookupError(error: DbErrorLike | null | undefined): boolean {
  if (!error) {
    return false;
  }

  const code = error.code ?? null;
  if (code && ["42P01", "42703", "PGRST204", "PGRST205"].includes(code)) {
    return true;
  }

  const message = `${error.message ?? ""} ${error.details ?? ""}`.toLowerCase();
  return (
    (message.includes("relation") && message.includes("does not exist")) ||
    (message.includes("table") && message.includes("not found")) ||
    (message.includes("column") && message.includes("does not exist"))
  );
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

async function loadTitleRuleForUser(
  userId: string
): Promise<UserTitleRule | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const { createClient } = await import("@supabase/supabase-js");
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const titleRuleMap = await loadUserTitleRuleMap([userId], async (ids) => {
    const withIcon = await sb
      .from("user_titles")
      .select("user_id, custom_title, title_color, title_icon_path, is_owner, title_enabled, updated_at, updated_by")
      .in("user_id", ids);

    if (!withIcon.error) {
      return {
        data: Array.isArray(withIcon.data) ? (withIcon.data as unknown[]) : null,
        error: null,
      };
    }

    if (!isMissingTitleIconColumnError(withIcon.error as DbErrorLike | null)) {
      return {
        data: null,
        error: (withIcon.error as DbErrorLike | null) ?? null,
      };
    }

    const fallback = await sb
      .from("user_titles")
      .select("user_id, custom_title, title_color, is_owner, title_enabled, updated_at, updated_by")
      .in("user_id", ids);

    return {
      data: Array.isArray(fallback.data) ? (fallback.data as unknown[]) : null,
      error: (fallback.error as DbErrorLike | null) ?? null,
    };
  });

  return titleRuleMap.get(userId) ?? null;
}

async function loadSeqIdForUser(userId: string): Promise<number | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const { createClient } = await import("@supabase/supabase-js");
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data, error } = await sb
    .from("user_seq_ids")
    .select("seq_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    if (isSkippableSeqLookupError(error as DbErrorLike)) {
      return null;
    }
    return null;
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return null;
  }

  const record = data as Record<string, unknown>;
  return asPositiveInt(record.seq_id);
}

export async function GET() {
  const user = await getServerUser();
  if (!user) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 }
    );
  }

  const metadata =
    user.user_metadata && typeof user.user_metadata === "object"
      ? (user.user_metadata as Record<string, unknown>)
      : {};

  const fallbackCustomTitle =
    asString(metadata.user_title) ?? asString(metadata.title);

  let seqId = asPositiveInt(metadata.seq_id);
  if (UUID_RE.test(user.id)) {
    const dbSeqId = await loadSeqIdForUser(user.id);
    // Always prefer DB value over stale metadata seq_id
    seqId = dbSeqId ?? null;
  }

  let rule: UserTitleRule | null = null;
  try {
    rule = await loadTitleRuleForUser(user.id);
  } catch {
    rule = null;
  }

  const resolvedTitle = resolveUserTitle({
    userId: user.id,
    seqId,
    adminUserIds: new Set(getAdminUserIds()),
    rule,
    fallbackCustomTitle,
  });
  const resolvedTitleColor =
    resolvedTitle && rule?.titleColor ? rule.titleColor : null;
  const resolvedTitleIconPath =
    resolvedTitle && rule?.titleIconPath ? rule.titleIconPath : null;

  return NextResponse.json({
    success: true,
    title: resolvedTitle,
    titleColor: resolvedTitleColor,
    titleIconPath: resolvedTitleIconPath,
    seqId: seqId ?? null,
  });
}
