import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { Locale } from "@/lib/i18n/translations";
import type {
  AgentCodePrompt,
  AgentDecisionTraceItem,
  AgentMessage,
  AgentMessageRole,
  AgentPlannerResult,
  AgentPromptSnapshot,
  AgentSessionDetail,
  AgentSessionStatus,
  AgentSessionSummary,
  AgentToolTrace,
} from "./types";

function createIsoTimestamp(): string {
  return new Date().toISOString();
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asLocale(value: unknown): Locale {
  return value === "zh" ? "zh" : "en";
}

function asSessionStatus(value: unknown): AgentSessionStatus {
  if (
    value === "needs_input" ||
    value === "plan_ready" ||
    value === "plan_refined"
  ) {
    return value;
  }

  return "active";
}

function asToolTrace(value: unknown): AgentToolTrace[] {
  return Array.isArray(value) ? (value as AgentToolTrace[]) : [];
}

function asCodePrompt(value: unknown): AgentCodePrompt | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const record = value as Record<string, unknown>;
  if (typeof record.prompt !== "string" || typeof record.styleSlug !== "string") {
    return null;
  }

  return value as AgentCodePrompt;
}

function asPlannerResult(value: unknown): AgentPlannerResult | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as AgentPlannerResult;
}

function asPromptSnapshot(value: unknown): AgentPromptSnapshot | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as AgentPromptSnapshot;
}

function asDecisionTrace(value: unknown): AgentDecisionTraceItem[] {
  return Array.isArray(value) ? (value as AgentDecisionTraceItem[]) : [];
}

function toSessionSummary(row: Record<string, unknown>): AgentSessionSummary {
  return {
    id: asString(row.id),
    locale: asLocale(row.locale),
    title: asString(row.title),
    status: asSessionStatus(row.status),
    createdAt: asString(row.created_at),
    updatedAt: asString(row.updated_at),
    lastMessageAt: asString(row.last_message_at),
  };
}

function toMessage(row: Record<string, unknown>): AgentMessage {
  return {
    id: asString(row.id),
    role: (asString(row.role) as AgentMessageRole) || "assistant",
    content: asString(row.content),
    createdAt: asString(row.created_at),
    planner: asPlannerResult(row.planner_json),
    codePrompt: asCodePrompt(row.plan_card_json),
    toolTrace: asToolTrace(row.tool_payload_json),
    promptSnapshot: asPromptSnapshot(row.prompt_snapshot_json),
    decisionTrace: asDecisionTrace(row.decision_trace_json),
  };
}

function buildSessionTitle(input: string): string {
  const normalized = input.replace(/\s+/g, " ").trim();
  if (!normalized) {
    return "New conversation";
  }

  return normalized.length > 72 ? `${normalized.slice(0, 69)}...` : normalized;
}

const DEV_STORAGE =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_DEV_MOCK_USER === "true";

type AgentDevStorage = {
  sessions: Map<string, Record<string, unknown>>;
  messages: Map<string, Record<string, unknown>[]>;
};

declare global {
  var __STYLEKIT_AGENT_DEV_STORAGE__: AgentDevStorage | undefined;
}

function getDevStorage(): AgentDevStorage {
  if (!globalThis.__STYLEKIT_AGENT_DEV_STORAGE__) {
    globalThis.__STYLEKIT_AGENT_DEV_STORAGE__ = {
      sessions: new Map<string, Record<string, unknown>>(),
      messages: new Map<string, Record<string, unknown>[]>(),
    };
  }

  return globalThis.__STYLEKIT_AGENT_DEV_STORAGE__;
}

export function isAgentStorageConfigured(): boolean {
  if (DEV_STORAGE) return true;
  return getSupabaseAdmin() !== null;
}

export async function listAgentSessionsForUser(
  userId: string
): Promise<AgentSessionSummary[]> {
  if (DEV_STORAGE) {
    const storage = getDevStorage();
    return Array.from(storage.sessions.values())
      .filter((row) => row.user_id === userId)
      .sort((a, b) => String(b.last_message_at).localeCompare(String(a.last_message_at)))
      .map((row) => toSessionSummary(row));
  }

  const sb = getSupabaseAdmin();
  if (!sb) {
    throw new Error("Agent storage is not configured");
  }

  const { data, error } = await sb
    .from("agent_sessions")
    .select("id, locale, title, status, created_at, updated_at, last_message_at")
    .eq("user_id", userId)
    .order("last_message_at", { ascending: false })
    .limit(50);

  if (error) {
    throw new Error(`Failed to load sessions: ${error.message}`);
  }

  return (data ?? []).map((row: Record<string, unknown>) => toSessionSummary(row));
}

export async function getAgentSessionDetail(
  userId: string,
  sessionId: string
): Promise<AgentSessionDetail | null> {
  if (DEV_STORAGE) {
    const storage = getDevStorage();
    const session = storage.sessions.get(sessionId);
    if (!session || session.user_id !== userId) return null;
    const messages = (storage.messages.get(sessionId) ?? []).map((row) => toMessage(row));
    return { ...toSessionSummary(session), messages };
  }

  const sb = getSupabaseAdmin();
  if (!sb) {
    throw new Error("Agent storage is not configured");
  }

  const { data: session, error: sessionError } = await sb
    .from("agent_sessions")
    .select("id, locale, title, status, created_at, updated_at, last_message_at")
    .eq("id", sessionId)
    .eq("user_id", userId)
    .maybeSingle();

  if (sessionError) {
    throw new Error(`Failed to load session: ${sessionError.message}`);
  }

  if (!session) {
    return null;
  }

  const { data: messages, error: messagesError } = await sb
    .from("agent_messages")
    .select(
      "id, role, content, planner_json, plan_card_json, tool_payload_json, recommendations_json, prompt_snapshot_json, decision_trace_json, created_at"
    )
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });

  if (messagesError) {
    throw new Error(`Failed to load session messages: ${messagesError.message}`);
  }

  return {
    ...toSessionSummary(session as Record<string, unknown>),
    messages: (messages ?? []).map((row: Record<string, unknown>) => toMessage(row)),
  };
}

export async function createAgentSessionForUser({
  userId,
  locale,
  titleSeed,
}: {
  userId: string;
  locale: Locale;
  titleSeed: string;
}): Promise<AgentSessionSummary> {
  if (DEV_STORAGE) {
    const storage = getDevStorage();
    const now = createIsoTimestamp();
    const row: Record<string, unknown> = {
      id: crypto.randomUUID(),
      user_id: userId,
      locale,
      title: buildSessionTitle(titleSeed),
      status: "needs_input",
      created_at: now,
      updated_at: now,
      last_message_at: now,
    };
    storage.sessions.set(row.id as string, row);
    storage.messages.set(row.id as string, []);
    return toSessionSummary(row);
  }

  const sb = getSupabaseAdmin();
  if (!sb) {
    throw new Error("Agent storage is not configured");
  }

  const now = createIsoTimestamp();
  const payload = {
    id: crypto.randomUUID(),
    user_id: userId,
    locale,
    title: buildSessionTitle(titleSeed),
    status: "needs_input",
    created_at: now,
    updated_at: now,
    last_message_at: now,
  };

  const { data, error } = await sb
    .from("agent_sessions")
    .insert(payload)
    .select("id, locale, title, status, created_at, updated_at, last_message_at")
    .single();

  if (error) {
    throw new Error(`Failed to create session: ${error.message}`);
  }

  return toSessionSummary(data as Record<string, unknown>);
}

export async function appendAgentMessage({
  sessionId,
  role,
  content,
  planner = null,
  codePrompt = null,
  toolTrace = [],
  promptSnapshot = null,
  decisionTrace = [],
  sessionStatus,
}: {
  sessionId: string;
  role: AgentMessageRole;
  content: string;
  planner?: AgentPlannerResult | null;
  codePrompt?: AgentCodePrompt | null;
  toolTrace?: AgentToolTrace[];
  promptSnapshot?: AgentPromptSnapshot | null;
  decisionTrace?: AgentDecisionTraceItem[];
  sessionStatus?: AgentSessionStatus;
}): Promise<AgentMessage> {
  if (DEV_STORAGE) {
    const storage = getDevStorage();
    const now = createIsoTimestamp();
    const row: Record<string, unknown> = {
      id: crypto.randomUUID(),
      session_id: sessionId,
      role,
      content,
      planner_json: planner,
      plan_card_json: codePrompt,
      tool_payload_json: toolTrace,
      prompt_snapshot_json: promptSnapshot,
      decision_trace_json: decisionTrace,
      created_at: now,
    };
    const msgs = storage.messages.get(sessionId) ?? [];
    msgs.push(row);
    storage.messages.set(sessionId, msgs);
    const session = storage.sessions.get(sessionId);
    if (session) {
      session.updated_at = now;
      session.last_message_at = now;
      if (sessionStatus) session.status = sessionStatus;
    }
    return toMessage(row);
  }

  const sb = getSupabaseAdmin();
  if (!sb) {
    throw new Error("Agent storage is not configured");
  }

  const now = createIsoTimestamp();
  const payload = {
    id: crypto.randomUUID(),
    session_id: sessionId,
    role,
    content,
    planner_json: planner,
    plan_card_json: codePrompt,
    tool_payload_json: toolTrace,
    prompt_snapshot_json: promptSnapshot,
    decision_trace_json: decisionTrace,
    created_at: now,
  };

  const { data, error } = await sb
    .from("agent_messages")
    .insert(payload)
    .select(
      "id, role, content, planner_json, plan_card_json, tool_payload_json, recommendations_json, prompt_snapshot_json, decision_trace_json, created_at"
    )
    .single();

  if (error) {
    throw new Error(`Failed to save message: ${error.message}`);
  }

  const sessionUpdate: Record<string, string> = {
    updated_at: now,
    last_message_at: now,
  };
  if (sessionStatus) {
    sessionUpdate.status = sessionStatus;
  }

  await sb.from("agent_sessions").update(sessionUpdate).eq("id", sessionId);

  return toMessage(data as Record<string, unknown>);
}
