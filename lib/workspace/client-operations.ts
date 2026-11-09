export type WorkspaceRequestOutcome = "rejected" | "unknown";

export class WorkspaceRequestError extends Error {
  readonly outcome: WorkspaceRequestOutcome;
  readonly code?: string;
  readonly status?: number;

  constructor(message: string, options: { outcome: WorkspaceRequestOutcome; code?: string; status?: number }) {
    super(message);
    this.name = "WorkspaceRequestError";
    this.outcome = options.outcome;
    this.code = options.code;
    this.status = options.status;
  }
}

export async function readWorkspaceResponse<T extends Record<string, unknown>>(
  response: Response,
  fallback: string,
  mutation = false,
): Promise<T> {
  let body: unknown;
  try {
    body = await response.json();
  } catch {
    throw new WorkspaceRequestError(fallback + "，服务器返回了无法读取的响应。", {
      outcome: mutation && (response.ok || response.status >= 500) ? "unknown" : "rejected",
      status: response.status,
      code: "INVALID_RESPONSE",
    });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new WorkspaceRequestError(fallback + "，服务器返回了无效的响应格式。", {
      outcome: mutation && (response.ok || response.status >= 500) ? "unknown" : "rejected",
      status: response.status,
      code: "INVALID_RESPONSE",
    });
  }

  const payload = body as Record<string, unknown>;
  if (!response.ok || payload.success !== true) {
    const message = typeof payload.error === "string" && payload.error.trim()
      ? payload.error
      : fallback + "。";
    throw new WorkspaceRequestError(message, {
      outcome: mutation && response.status >= 500 ? "unknown" : "rejected",
      status: response.status,
      code: typeof payload.code === "string" ? payload.code : undefined,
    });
  }

  return payload as T;
}

export function workspaceTransportError(error: unknown, fallback: string, mutation = false): WorkspaceRequestError {
  if (error instanceof WorkspaceRequestError) return error;
  const message = mutation
    ? fallback + "，请求结果尚未确认。请刷新项目状态，再决定是否重试。"
    : fallback + "，请检查网络后重试。";
  return new WorkspaceRequestError(message, { outcome: mutation ? "unknown" : "rejected", code: "NETWORK_ERROR" });
}

export type WorkspaceWriteKind = "save" | "generate" | "restore" | "export";

export interface WorkspaceWriteToken {
  id: number;
  projectId: string;
  kind: WorkspaceWriteKind;
}

export interface WorkspaceWriteGate {
  nextId: number;
  active: Map<string, WorkspaceWriteToken>;
}

export function createWorkspaceWriteGate(): WorkspaceWriteGate {
  return { nextId: 0, active: new Map() };
}

/** Prevent overlapping writes for one project without blocking a newly selected project. */
export function beginWorkspaceWrite(gate: WorkspaceWriteGate, projectId: string, kind: WorkspaceWriteKind): WorkspaceWriteToken | null {
  if (gate.active.has(projectId)) return null;
  const token = { id: ++gate.nextId, projectId, kind };
  gate.active.set(projectId, token);
  return token;
}

export function finishWorkspaceWrite(gate: WorkspaceWriteGate, token: WorkspaceWriteToken): boolean {
  if (gate.active.get(token.projectId)?.id !== token.id) return false;
  gate.active.delete(token.projectId);
  return true;
}

export function ownsWorkspaceWrite(gate: WorkspaceWriteGate, token: WorkspaceWriteToken, currentProjectId: string): boolean {
  return gate.active.get(token.projectId)?.id === token.id &&
    currentProjectId === token.projectId;
}
