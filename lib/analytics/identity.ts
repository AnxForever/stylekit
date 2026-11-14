export const ANALYTICS_VISITOR_KEY = ["stylekit", "visitor", "id", "v2"].join("_");
export const ANALYTICS_SESSION_KEY = ["stylekit", "session", "v2"].join("_");
export const ANALYTICS_SESSION_TIMEOUT_MS = 30 * 60 * 1000;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export interface AnalyticsIdentity {
  visitorId: string | null;
  sessionId: string | null;
}

export function createAnalyticsEventId(): string {
  return crypto.randomUUID();
}

/** Unload telemetry cannot wait for a Web Lock. Reuse an established identity. */
export function getStoredAnalyticsIdentity(now = Date.now()): AnalyticsIdentity {
  try {
    const visitorId = window.localStorage.getItem(ANALYTICS_VISITOR_KEY);
    const session = JSON.parse(window.localStorage.getItem(ANALYTICS_SESSION_KEY) ?? "{}");
    return {
      visitorId: visitorId && UUID.test(visitorId) ? visitorId : null,
      sessionId: typeof session?.id === "string" && UUID.test(session.id)
        && typeof session.lastActive === "number"
        && session.lastActive <= now && now - session.lastActive < ANALYTICS_SESSION_TIMEOUT_MS
        ? session.id : null,
    };
  } catch {
    return { visitorId: null, sessionId: null };
  }
}

function readIdentity(now: number): AnalyticsIdentity {
  try {
    const storage = window.localStorage;
    const existing = storage.getItem(ANALYTICS_VISITOR_KEY);
    const visitorId = existing && UUID.test(existing) ? existing : crypto.randomUUID();
    if (visitorId !== existing) storage.setItem(ANALYTICS_VISITOR_KEY, visitorId);

    let session: { id?: unknown; lastActive?: unknown } = {};
    try {
      session = JSON.parse(storage.getItem(ANALYTICS_SESSION_KEY) ?? "{}") ?? {};
    } catch {
      // A malformed session is rotated; the stable browser ID is retained.
    }
    const validSession = typeof session.id === "string" && UUID.test(session.id)
      && typeof session.lastActive === "number" && session.lastActive <= now
      && now - session.lastActive < ANALYTICS_SESSION_TIMEOUT_MS;
    const sessionId = validSession ? session.id as string : crypto.randomUUID();
    storage.setItem(ANALYTICS_SESSION_KEY, JSON.stringify({ id: sessionId, lastActive: now }));
    return { visitorId, sessionId };
  } catch {
    return { visitorId: null, sessionId: null };
  }
}

/** Serialize simultaneous first visits across tabs where Web Locks is available. */
export async function getAnalyticsIdentity(now?: number): Promise<AnalyticsIdentity> {
  try {
    if (navigator.locks?.request) {
      return await navigator.locks.request("stylekit-analytics-identity-v2", () => readIdentity(now ?? Date.now()));
    }
    return readIdentity(now ?? Date.now());
  } catch {
    return { visitorId: null, sessionId: null };
  }
}
