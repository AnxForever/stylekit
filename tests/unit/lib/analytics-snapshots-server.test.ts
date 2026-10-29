import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  checkAdminApiAccessMock,
  createClientMock,
  getSupabaseAdminMock,
  rpcMock,
  readPersistentMock,
  writePersistentMock,
} = vi.hoisted(() => ({
  checkAdminApiAccessMock: vi.fn(),
  createClientMock: vi.fn(),
  getSupabaseAdminMock: vi.fn(),
  rpcMock: vi.fn(),
  readPersistentMock: vi.fn(),
  writePersistentMock: vi.fn(),
}));

vi.mock("server-only", () => ({}));
vi.mock("@/lib/auth/admin-api", () => ({ checkAdminApiAccess: checkAdminApiAccessMock }));
vi.mock("@/lib/supabase/server", () => ({ getSupabaseAdmin: getSupabaseAdminMock }));
vi.mock("@supabase/supabase-js", () => ({ createClient: createClientMock }));
vi.mock("@/lib/admin/analytics-persistent-snapshot", () => ({
  readPersistentAnalyticsSnapshot: readPersistentMock,
  writePersistentAnalyticsSnapshot: writePersistentMock,
}));

import {
  getContentSnapshot,
  getPromptCopySnapshot,
} from "@/lib/admin/analytics-snapshots-server";
import { getAnalyticsOverviewSnapshot, getAnalyticsOverviewSnapshotResult } from "@/lib/admin/analytics-overview-server";
import { GET as getContentApi } from "@/app/api/admin/analytics/content/route";
import { GET as getOverviewApi } from "@/app/api/admin/analytics/overview/route";

const contentPayload = (generatedAt: string) => ({
  implementationIntentVersion: 2,
  summary: {
    comments: 0,
    ratings: 0,
    favorites: 0,
    submissionsTotal: 0,
    submissionsPending: 0,
    submissionsApproved: 0,
    submissionsRejected: 0,
  },
  behavior: {
    exposure: 0,
    exploration: 0,
    implementation_intent: 0,
    commercial_intent: 0,
    verified_outcomes: 0,
  },
  topStyles: [],
  series: [],
  generatedAt,
});

const promptCopyPayload = {
  totalCopies: 1,
  styles: [{
    slug: "neo-brutalist",
    copies: 1,
    sessions: 1,
    hard: 1,
    soft: 0,
    designSpec: 0,
    creativeBrief: 0,
    examples: 0,
    recipes: 0,
    projectBrief: 0,
  }],
  generatedAt: "2026-10-29T00:00:00.000Z",
};

const overviewPayload = (generatedAt: string) => ({
  range: { start: "start", end: "end", timezone: "Asia/Shanghai" },
  current: { pageViews: 2, visitors: 1, visits: 1, engagedVisits: 1, bouncedVisits: 0, bounceRate: 0, viewsPerVisit: 2 },
  previous: { pageViews: 1, visitors: 1, visits: 1, bounceRate: 0, viewsPerVisit: 1 },
  series: [],
  quality: { status: "complete", anonymousPageViews: 0, countryCoveragePct: 50, generatedAt },
});

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((resolvePromise) => {
    resolve = resolvePromise;
  });
  return { promise, resolve };
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://analytics.test.invalid");
  vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "test-service-key");
  vi.stubEnv("UMAMI_INSIGHTS_URL", "");
  vi.stubEnv("NEXT_PUBLIC_UMAMI_INSIGHTS_URL", "");
  checkAdminApiAccessMock.mockResolvedValue({ allowed: true });
  getSupabaseAdminMock.mockReturnValue({ rpc: rpcMock });
  createClientMock.mockReturnValue({ rpc: rpcMock });
  readPersistentMock.mockResolvedValue(null);
  writePersistentMock.mockResolvedValue(undefined);
});

describe("analytics SSR snapshots", () => {
  it("does not wait for a durable snapshot write before returning fresh RPC data", async () => {
    const pendingWrite = deferred<void>();
    rpcMock.mockResolvedValue({ data: contentPayload("2026-10-29T00:00:00.000Z"), error: null });
    writePersistentMock.mockReturnValue(pendingWrite.promise);

    await expect(getContentSnapshot("90d")).resolves.toMatchObject({
      generatedAt: "2026-10-29T00:00:00.000Z",
    });
    expect(writePersistentMock).toHaveBeenCalledTimes(1);
  });

  it("retries the RPC after using a persistent fallback instead of caching that fallback as fresh", async () => {
    const stale = contentPayload("2026-10-20T00:00:00.000Z");
    readPersistentMock.mockResolvedValue(stale);
    rpcMock.mockResolvedValue({ data: null, error: { code: "XX000" } });

    await expect(getContentSnapshot("24h")).resolves.toMatchObject({
      generatedAt: "2026-10-20T00:00:00.000Z",
    });
    await expect(getContentSnapshot("24h")).resolves.toMatchObject({
      generatedAt: "2026-10-20T00:00:00.000Z",
    });

    expect(rpcMock).toHaveBeenCalledTimes(2);
    expect(writePersistentMock).not.toHaveBeenCalled();
  });

  it("does not display a malformed persistent fallback", async () => {
    readPersistentMock.mockResolvedValue({ generatedAt: "old" });
    rpcMock.mockResolvedValue({ data: null, error: { code: "XX000" } });

    await expect(getContentSnapshot("24h")).resolves.toBeNull();
  });

  it("refreshes older snapshots with the live payload when the RPC is available", async () => {
    readPersistentMock.mockResolvedValue(contentPayload("2026-10-20T00:00:00.000Z"));
    rpcMock.mockResolvedValue({ data: contentPayload("2026-10-29T00:00:00.000Z"), error: null });

    await expect(getContentSnapshot("7d")).resolves.toMatchObject({
      generatedAt: "2026-10-29T00:00:00.000Z",
    });
    expect(rpcMock).toHaveBeenCalledTimes(1);
    expect(readPersistentMock).not.toHaveBeenCalled();
    expect(writePersistentMock).toHaveBeenCalledTimes(1);
  });

  it("shares same-key SSR RPC work and does not use historical prompt-copy fallbacks", async () => {
    const gate = deferred<{ data: typeof promptCopyPayload; error: null }>();
    rpcMock.mockReturnValue(gate.promise);

    const first = getPromptCopySnapshot("30d");
    const second = getPromptCopySnapshot("30d");
    await Promise.resolve();
    await Promise.resolve();
    expect(rpcMock).toHaveBeenCalledTimes(1);
    gate.resolve({ data: promptCopyPayload, error: null });
    await expect(Promise.all([first, second])).resolves.toEqual([
      promptCopyPayload,
      promptCopyPayload,
    ]);
    expect(readPersistentMock).not.toHaveBeenCalled();
    expect(writePersistentMock).not.toHaveBeenCalled();

    rpcMock.mockResolvedValue({ data: null, error: { code: "PGRST202" } });
    await expect(getPromptCopySnapshot("24h")).resolves.toBeNull();
    expect(readPersistentMock).not.toHaveBeenCalled();
  });

  it("shares an SSR-first RPC with the matching authenticated API request", async () => {
    const gate = deferred<{ data: ReturnType<typeof contentPayload>; error: null }>();
    rpcMock.mockReturnValue(gate.promise);

    const ssr = getContentSnapshot("30d");
    await Promise.resolve();
    await Promise.resolve();
    const api = getContentApi(new Request("https://stylekit.top/api/admin/analytics/content?range=30d"));
    await Promise.resolve();
    await Promise.resolve();

    expect(rpcMock).toHaveBeenCalledTimes(1);
    gate.resolve({ data: contentPayload("2026-10-29T00:00:00.000Z"), error: null });
    const [snapshot, response] = await Promise.all([ssr, api]);

    expect(snapshot?.generatedAt).toBe("2026-10-29T00:00:00.000Z");
    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(await response.json()).toMatchObject({ generatedAt: "2026-10-29T00:00:00.000Z" });
  });

  it("shares an API-first RPC with the matching SSR request", async () => {
    const gate = deferred<{ data: ReturnType<typeof contentPayload>; error: null }>();
    rpcMock.mockReturnValue(gate.promise);

    const api = getContentApi(new Request("https://stylekit.top/api/admin/analytics/content?range=24h"));
    await Promise.resolve();
    await Promise.resolve();
    const ssr = getContentSnapshot("24h");
    await Promise.resolve();
    await Promise.resolve();

    expect(rpcMock).toHaveBeenCalledTimes(1);
    gate.resolve({ data: contentPayload("2026-10-29T00:00:00.000Z"), error: null });
    const [response, snapshot] = await Promise.all([api, ssr]);

    expect(response.status).toBe(200);
    expect(snapshot?.generatedAt).toBe("2026-10-29T00:00:00.000Z");
    expect(rpcMock).toHaveBeenCalledTimes(1);
  });

  it("uses one Umami result for both SSR and the overview API", async () => {
    vi.stubEnv("UMAMI_INSIGHTS_URL", "https://umami.example.test/overview");
    const umamiGate = deferred<Response>();
    const fetchMock = vi.fn(() => umamiGate.promise);
    vi.stubGlobal("fetch", fetchMock);

    const ssr = getAnalyticsOverviewSnapshot("30d");
    await Promise.resolve();
    const api = getOverviewApi(new Request("https://stylekit.top/api/admin/analytics/overview?range=30d"));
    await Promise.resolve();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    umamiGate.resolve(new Response(JSON.stringify({ overview: { "30d": overviewPayload("2026-10-29T00:00:00.000Z") } }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }));
    const [snapshot, response] = await Promise.all([ssr, api]);
    const body = await response.json();

    expect(snapshot?.quality.generatedAt).toBe("2026-10-29T00:00:00.000Z");
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(body).toEqual(snapshot);
    expect(rpcMock).not.toHaveBeenCalled();
  });

  it("marks a preserved persistent overview as stale and retries live sources next time", async () => {
    const stale = overviewPayload("2026-10-20T00:00:00.000Z");
    readPersistentMock.mockResolvedValue(stale);
    rpcMock.mockResolvedValue({ data: null, error: { code: "XX000" } });

    const result = await getAnalyticsOverviewSnapshotResult("24h");
    expect(result).toEqual({ data: stale, source: "persistent_fallback" });
    const response = await getOverviewApi(new Request("https://stylekit.top/api/admin/analytics/overview?range=24h"));

    expect(response.status).toBe(200);
    expect(response.headers.get("X-StyleKit-Analytics-Cache")).toBe("STALE");
    expect((await response.json()).quality.generatedAt).toBe("2026-10-20T00:00:00.000Z");
    expect(rpcMock).toHaveBeenCalledTimes(2);
  });
});
