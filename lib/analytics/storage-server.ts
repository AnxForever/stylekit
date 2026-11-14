import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase/server";

export class AnalyticsStorageError extends Error {
  constructor(
    message: string,
    readonly code: string,
    readonly status: 502 | 503 = 503,
  ) {
    super(message);
    this.name = "AnalyticsStorageError";
  }
}

export interface AnalyticsEventRecord {
  event_type: string;
  event_data: Record<string, unknown>;
  style_slug: string | null;
  session_id: string | null;
  event_id?: string;
  visitor_id?: string | null;
  created_at?: string;
}

/** A partial configuration must fail closed instead of writing to another store. */
export function isAnalyticsBackendConfigured(): boolean {
  return Boolean(process.env.ANALYTICS_BACKEND_URL?.trim() || process.env.ANALYTICS_BACKEND_TOKEN?.trim());
}

export function getAnalyticsStorageScope(): "self-hosted" | "supabase" {
  return isAnalyticsBackendConfigured() ? "self-hosted" : "supabase";
}

function backendConfiguration(): { url: URL; token: string } {
  const endpoint = process.env.ANALYTICS_BACKEND_URL?.trim();
  const token = process.env.ANALYTICS_BACKEND_TOKEN?.trim();
  if (!endpoint || !token || /[\r\n]/.test(token)) {
    throw new AnalyticsStorageError("Analytics backend is not configured correctly.", "ANALYTICS_BACKEND_CONFIGURATION");
  }

  let url: URL;
  try {
    url = new URL(endpoint);
  } catch {
    throw new AnalyticsStorageError("Analytics backend is not configured correctly.", "ANALYTICS_BACKEND_CONFIGURATION");
  }
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if ((url.protocol !== "https:" && !(url.protocol === "http:" && local))
    || /^https?:\/\/[^/]*@/.test(url.href) || url.search || url.hash) {
    throw new AnalyticsStorageError("Analytics backend is not configured correctly.", "ANALYTICS_BACKEND_CONFIGURATION");
  }
  if (!url.pathname.endsWith("/")) url.pathname += "/";
  return { url, token };
}

/** Only the fixed, authenticated service operations are exposed to callers. */
export async function callAnalyticsBackend(
  operation: "events" | "insights" | "prompt-copies",
  payload: unknown,
): Promise<unknown> {
  const { url, token } = backendConfiguration();
  let response: Response;
  try {
    response = await fetch(new URL(operation, url), {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(operation === "events" ? 4_000 : 12_000),
    });
  } catch {
    throw new AnalyticsStorageError("Analytics backend is temporarily unavailable.", "ANALYTICS_BACKEND_UNAVAILABLE");
  }
  if (!response.ok) {
    // Provider responses can contain internal paths or credentials. Do not
    // forward their body, status detail or exception message to the browser.
    throw new AnalyticsStorageError("Analytics backend is temporarily unavailable.", "ANALYTICS_BACKEND_UNAVAILABLE");
  }
  try {
    return await response.json();
  } catch {
    throw new AnalyticsStorageError("Analytics backend returned an invalid payload.", "ANALYTICS_INVALID_PAYLOAD", 502);
  }
}

/** Version 2 has one authoritative destination; legacy requests stay compatible. */
export async function storeAnalyticsEvent(record: AnalyticsEventRecord): Promise<{ duplicate: boolean }> {
  if (record.event_id && isAnalyticsBackendConfigured()) {
    const result = await callAnalyticsBackend("events", record);
    if (!result || typeof result !== "object" || !("success" in result) || result.success !== true
      || !("duplicate" in result) || typeof result.duplicate !== "boolean") {
      throw new AnalyticsStorageError("Analytics backend returned an invalid payload.", "ANALYTICS_INVALID_PAYLOAD", 502);
    }
    return { duplicate: result.duplicate };
  }

  const client = getSupabaseAdmin();
  if (!client) {
    throw new AnalyticsStorageError("Analytics storage not configured", "ANALYTICS_UNAVAILABLE");
  }
  const { error } = await client.from("analytics_events").insert(record);
  if (error) {
    if (record.event_id && error.code === "23505") return { duplicate: true };
    throw new AnalyticsStorageError("Failed to store analytics event", "ANALYTICS_WRITE_FAILED");
  }
  return { duplicate: false };
}
