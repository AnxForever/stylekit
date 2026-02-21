export const SITE_OWNER_TITLE_TOKEN = "__site_owner__";
export const EARLY_USER_TITLE_TOKEN = "__early_user__";
export const EMPEROR_TITLE_TOKEN = "__qin_shi_huang__";
export const EARLY_USER_SEQ_THRESHOLD = 100;
export const USER_TITLE_MAX_LENGTH = 24;
export const USER_TITLE_COLOR_PATTERN = /^#[0-9a-f]{6}$/i;
export const USER_TITLE_ICON_PATH_MAX_LENGTH = 2048;
export const USER_TITLE_ICON_PATH_PATTERN =
  /^[MmLlHhVvCcSsQqTtAaZz0-9eE+.,\-\s]+$/;
const EMPEROR_SEQ_IDS = new Set([1, 2]);

const MISSING_TABLE_CODES = new Set(["42P01", "42703", "PGRST204", "PGRST205"]);

export interface DbErrorLike {
  code?: string | null;
  message?: string | null;
  details?: string | null;
}

export interface UserTitleRule {
  userId: string;
  customTitle: string | null;
  titleColor: string | null;
  titleIconPath: string | null;
  isOwner: boolean;
  titleEnabled: boolean;
  updatedAt: string | null;
  updatedBy: string | null;
}

export interface ResolveUserTitleInput {
  userId: string;
  seqId: number | null;
  adminUserIds: Set<string>;
  rule: UserTitleRule | null;
  fallbackCustomTitle?: string | null;
}

function asString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function asBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    if (value === "true") return true;
    if (value === "false") return false;
  }
  return null;
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

function readDbErrorMessage(error: DbErrorLike | null | undefined): string {
  return `${error?.message ?? ""} ${error?.details ?? ""}`.toLowerCase();
}

function parseRuleRow(row: unknown): UserTitleRule | null {
  if (!row || typeof row !== "object" || Array.isArray(row)) {
    return null;
  }

  const record = row as Record<string, unknown>;
  const userId = asString(record.user_id);
  if (!userId) {
    return null;
  }

  return {
    userId,
    customTitle: asString(record.custom_title),
    titleColor: normalizeTitleColorValue(record.title_color),
    titleIconPath: normalizeTitleIconPathValue(record.title_icon_path),
    isOwner: asBoolean(record.is_owner) ?? false,
    titleEnabled: asBoolean(record.title_enabled) ?? true,
    updatedAt: asString(record.updated_at),
    updatedBy: asString(record.updated_by),
  };
}

function normalizeTitleColorValue(value: unknown): string | null {
  const raw = asString(value);
  if (!raw) {
    return null;
  }

  if (!USER_TITLE_COLOR_PATTERN.test(raw)) {
    return null;
  }

  return raw.toLowerCase();
}

function normalizeTitleIconPathValue(value: unknown): string | null {
  const raw = asString(value);
  if (!raw) {
    return null;
  }

  if (raw.length > USER_TITLE_ICON_PATH_MAX_LENGTH) {
    return null;
  }

  if (!USER_TITLE_ICON_PATH_PATTERN.test(raw)) {
    return null;
  }

  return raw;
}

export function normalizeCustomTitleInput(value: unknown): {
  ok: boolean;
  value: string | null;
  error?: string;
} {
  if (value == null) {
    return { ok: true, value: null };
  }

  if (typeof value !== "string") {
    return {
      ok: false,
      value: null,
      error: "customTitle must be a string or null.",
    };
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return { ok: true, value: null };
  }

  if (trimmed.length > USER_TITLE_MAX_LENGTH) {
    return {
      ok: false,
      value: null,
      error: `customTitle must be at most ${USER_TITLE_MAX_LENGTH} characters.`,
    };
  }

  return { ok: true, value: trimmed };
}

export function normalizeTitleColorInput(value: unknown): {
  ok: boolean;
  value: string | null;
  error?: string;
} {
  if (value == null) {
    return { ok: true, value: null };
  }

  if (typeof value !== "string") {
    return {
      ok: false,
      value: null,
      error: "titleColor must be a string or null.",
    };
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return { ok: true, value: null };
  }

  if (!USER_TITLE_COLOR_PATTERN.test(trimmed)) {
    return {
      ok: false,
      value: null,
      error: "titleColor must be a valid hex color like #ff5a7a.",
    };
  }

  return { ok: true, value: trimmed.toLowerCase() };
}

export function normalizeTitleIconPathInput(value: unknown): {
  ok: boolean;
  value: string | null;
  error?: string;
} {
  if (value == null) {
    return { ok: true, value: null };
  }

  if (typeof value !== "string") {
    return {
      ok: false,
      value: null,
      error: "titleIconPath must be a string or null.",
    };
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return { ok: true, value: null };
  }

  if (trimmed.length > USER_TITLE_ICON_PATH_MAX_LENGTH) {
    return {
      ok: false,
      value: null,
      error: `titleIconPath must be at most ${USER_TITLE_ICON_PATH_MAX_LENGTH} characters.`,
    };
  }

  if (!USER_TITLE_ICON_PATH_PATTERN.test(trimmed)) {
    return {
      ok: false,
      value: null,
      error:
        "titleIconPath contains invalid characters. Use SVG path data only.",
    };
  }

  return { ok: true, value: trimmed };
}

export function isUserTitlesSchemaMissing(
  error: DbErrorLike | null | undefined
): boolean {
  if (!error) {
    return false;
  }

  const code = error.code ?? null;
  if (code && MISSING_TABLE_CODES.has(code)) {
    return true;
  }

  const message = readDbErrorMessage(error);
  return (
    (message.includes("relation") && message.includes("does not exist")) ||
    (message.includes("table") && message.includes("not found")) ||
    (message.includes("column") && message.includes("does not exist"))
  );
}

export function buildUserTitleRuleMap(rows: unknown[] | null | undefined): Map<string, UserTitleRule> {
  const map = new Map<string, UserTitleRule>();
  if (!Array.isArray(rows)) {
    return map;
  }

  for (const row of rows) {
    const parsed = parseRuleRow(row);
    if (!parsed) {
      continue;
    }
    map.set(parsed.userId, parsed);
  }

  return map;
}

export async function loadUserTitleRuleMap(
  userIds: string[],
  lookup: (ids: string[]) => Promise<{ data: unknown[] | null; error: DbErrorLike | null }>
): Promise<Map<string, UserTitleRule>> {
  if (userIds.length === 0) {
    return new Map();
  }

  try {
    const { data, error } = await lookup(userIds);
    if (error) {
      if (isUserTitlesSchemaMissing(error)) {
        return new Map();
      }
      throw new Error(readDbErrorMessage(error));
    }
    return buildUserTitleRuleMap(data);
  } catch {
    return new Map();
  }
}

function resolveManualTitle(
  rule: UserTitleRule | null,
  fallbackCustomTitle: string | null
): string | null {
  if (rule) {
    if (!rule.titleEnabled) {
      return null;
    }
    if (rule.customTitle) {
      return rule.customTitle;
    }
  }

  const fallback = asString(fallbackCustomTitle);
  if (fallback) {
    return fallback;
  }

  return null;
}

export function resolveUserTitle(input: ResolveUserTitleInput): string | null {
  const manualTitle = resolveManualTitle(input.rule, input.fallbackCustomTitle ?? null);
  if (manualTitle) {
    return manualTitle;
  }

  if (input.rule && !input.rule.titleEnabled) {
    return null;
  }

  const seqId = asPositiveInt(input.seqId);
  if (seqId != null && EMPEROR_SEQ_IDS.has(seqId)) {
    return EMPEROR_TITLE_TOKEN;
  }

  if (input.rule?.isOwner || input.adminUserIds.has(input.userId)) {
    return SITE_OWNER_TITLE_TOKEN;
  }

  if (seqId != null && seqId <= EARLY_USER_SEQ_THRESHOLD) {
    return EARLY_USER_TITLE_TOKEN;
  }

  return null;
}

export function isEarlyUser(seqId: number | null): boolean {
  const value = asPositiveInt(seqId);
  return value != null && value <= EARLY_USER_SEQ_THRESHOLD;
}
