const DEFAULT_MAX_BYTES = 64 * 1024;

export interface JsonBodyParseOptions {
  maxBytes?: number;
  tooLargeMessage?: string;
  invalidJsonMessage?: string;
}

export type JsonBodyParseResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: 400 | 413; error: string };

export async function parseJsonBodyWithLimit<T = unknown>(
  request: Request,
  options: JsonBodyParseOptions = {}
): Promise<JsonBodyParseResult<T>> {
  const maxBytes = normalizeMaxBytes(options.maxBytes);
  const tooLargeMessage = options.tooLargeMessage ?? "Request body too large.";
  const invalidJsonMessage = options.invalidJsonMessage ?? "Invalid JSON body.";

  const contentLength = parseContentLength(request.headers.get("content-length"));
  if (contentLength != null && contentLength > maxBytes) {
    return { ok: false, status: 413, error: tooLargeMessage };
  }

  let raw = "";
  try {
    raw = await request.text();
  } catch {
    return { ok: false, status: 400, error: invalidJsonMessage };
  }

  if (new TextEncoder().encode(raw).length > maxBytes) {
    return { ok: false, status: 413, error: tooLargeMessage };
  }

  if (!raw.trim()) {
    return { ok: false, status: 400, error: invalidJsonMessage };
  }

  try {
    return { ok: true, data: JSON.parse(raw) as T };
  } catch {
    return { ok: false, status: 400, error: invalidJsonMessage };
  }
}

function normalizeMaxBytes(value: number | undefined): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return DEFAULT_MAX_BYTES;
  }
  return Math.floor(value);
}

function parseContentLength(value: string | null): number | null {
  if (!value) return null;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 0) return null;
  return parsed;
}
