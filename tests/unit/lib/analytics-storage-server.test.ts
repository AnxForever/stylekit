import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { getSupabaseAdmin, insert, from } = vi.hoisted(() => ({
  getSupabaseAdmin: vi.fn(),
  insert: vi.fn(),
  from: vi.fn(),
}));

vi.mock("server-only", () => ({}));
vi.mock("@/lib/supabase/server", () => ({ getSupabaseAdmin }));

import {
  AnalyticsStorageError,
  callAnalyticsBackend,
  getAnalyticsStorageScope,
  isAnalyticsBackendConfigured,
  storeAnalyticsEvent,
} from "@/lib/analytics/storage-server";

const token = "test-only-analytics-token-not-for-production";
const event = {
  event_id: "123e4567-e89b-42d3-a456-426614174001",
  visitor_id: "123e4567-e89b-42d3-a456-426614174002",
  session_id: "123e4567-e89b-42d3-a456-426614174003",
  event_type: "style_view",
  event_data: { slug: "neo-brutalist", measurementVersion: 2, environment: "production" },
  style_slug: "neo-brutalist",
  created_at: "2026-11-14T10:00:00.000Z",
};
const legacyEvent = {
  event_type: "style_view",
  event_data: { slug: "neo-brutalist", source: "page" },
  style_slug: "neo-brutalist",
  session_id: null,
};

function configure(url = "https://analytics.example.test/private/v2") {
  vi.stubEnv("ANALYTICS_BACKEND_URL", url);
  vi.stubEnv("ANALYTICS_BACKEND_TOKEN", token);
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("ANALYTICS_BACKEND_URL", "");
  vi.stubEnv("ANALYTICS_BACKEND_TOKEN", "");
  from.mockReturnValue({ insert });
  getSupabaseAdmin.mockReturnValue({ from });
  insert.mockResolvedValue({ error: null });
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({ success: true, duplicate: false })));
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("analytics backend selection", () => {
  it("uses the existing Supabase store only when both service settings are absent", async () => {
    expect(isAnalyticsBackendConfigured()).toBe(false);
    expect(getAnalyticsStorageScope()).toBe("supabase");
    expect(await storeAnalyticsEvent(event)).toEqual({ duplicate: false });
    expect(from).toHaveBeenCalledWith("analytics_events");
    expect(insert).toHaveBeenCalledWith(event);
    expect(fetch).not.toHaveBeenCalled();
  });

  it.each(["ANALYTICS_BACKEND_URL", "ANALYTICS_BACKEND_TOKEN"])(
    "fails closed when only %s is set instead of silently writing to Supabase",
    async (key) => {
      vi.stubEnv(key, key === "ANALYTICS_BACKEND_URL" ? "https://analytics.example.test" : token);
      expect(isAnalyticsBackendConfigured()).toBe(true);
      await expect(storeAnalyticsEvent(event)).rejects.toMatchObject({ status: 503 });
      expect(getSupabaseAdmin).not.toHaveBeenCalled();
      expect(fetch).not.toHaveBeenCalled();
    },
  );

  it("keeps legacy envelopes in their existing store after the v2 switch", async () => {
    configure();
    expect(getAnalyticsStorageScope()).toBe("self-hosted");
    expect(await storeAnalyticsEvent(legacyEvent)).toEqual({ duplicate: false });
    expect(insert).toHaveBeenCalledWith(legacyEvent);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("accepts a service-deduplicated replay without a second write to Supabase", async () => {
    configure();
    vi.mocked(fetch).mockResolvedValue(Response.json({ success: true, duplicate: true }));
    expect(await storeAnalyticsEvent(event)).toEqual({ duplicate: true });
    expect(getSupabaseAdmin).not.toHaveBeenCalled();
  });

  it("retains Supabase UUID replay handling for installations without the service", async () => {
    insert.mockResolvedValue({ error: { code: "23505" } });
    expect(await storeAnalyticsEvent(event)).toEqual({ duplicate: true });
    await expect(storeAnalyticsEvent(legacyEvent)).rejects.toBeInstanceOf(AnalyticsStorageError);
  });

  it("does not acknowledge unconfigured Supabase as a successful write", async () => {
    getSupabaseAdmin.mockReturnValue(null);
    await expect(storeAnalyticsEvent(legacyEvent)).rejects.toMatchObject({ status: 503 });
  });
});

describe("server-only analytics transport", () => {
  it("preserves the configured path prefix and sends the exact event over an authenticated POST", async () => {
    configure();
    expect(await storeAnalyticsEvent(event)).toEqual({ duplicate: false });
    expect(fetch).toHaveBeenCalledWith(
      expect.any(URL),
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(event),
        redirect: "error",
        cache: "no-store",
      }),
    );
    expect(String(vi.mocked(fetch).mock.calls[0][0])).toBe("https://analytics.example.test/private/v2/events");
    expect(getSupabaseAdmin).not.toHaveBeenCalled();
  });

  it.each(["http://127.0.0.1:8792", "http://localhost:8792"])(
    "allows a loopback test service at %s",
    async (url) => {
      configure(url);
      await expect(callAnalyticsBackend("events", event)).resolves.toMatchObject({ success: true });
    },
  );

  it.each([
    "http://analytics.example.test",
    "https://user@analytics.example.test",
    "https://analytics.example.test?token=secret",
    "https://analytics.example.test#fragment",
  ])("rejects an unsafe endpoint %s before sending credentials", async (url) => {
    configure(url);
    await expect(callAnalyticsBackend("events", event)).rejects.toMatchObject({ status: 503 });
    expect(fetch).not.toHaveBeenCalled();
  });

  it.each([
    ["events", 4000],
    ["insights", 12000],
    ["prompt-copies", 12000],
  ] as const)("bounds %s requests to %i ms", async (endpoint, timeout) => {
    configure();
    const timeoutSpy = vi.spyOn(AbortSignal, "timeout");
    await callAnalyticsBackend(endpoint, { start: "2026-11-01T00:00:00Z", end: "2026-11-08T00:00:00Z" });
    expect(timeoutSpy).toHaveBeenCalledWith(timeout);
    expect(vi.mocked(fetch).mock.calls[0][1]?.signal).toBeInstanceOf(AbortSignal);
  });

  it("does not hide a service outage by falling back to the legacy database", async () => {
    configure();
    vi.mocked(fetch).mockRejectedValue(new Error(`connection failed with ${token}`));
    const error = await storeAnalyticsEvent(event).catch((failure: unknown) => failure);
    expect(error).toBeInstanceOf(AnalyticsStorageError);
    expect(error).toMatchObject({ status: 503 });
    expect((error as Error).message).not.toContain(token);
    expect(getSupabaseAdmin).not.toHaveBeenCalled();
  });

  it("does not expose service response bodies or treat HTTP failures as successful inserts", async () => {
    configure();
    vi.mocked(fetch).mockResolvedValue(new Response(`private database error: ${token}`, { status: 503 }));
    const error = await storeAnalyticsEvent(event).catch((failure: unknown) => failure);
    expect(error).toBeInstanceOf(AnalyticsStorageError);
    expect((error as Error).message).not.toContain(token);
    expect((error as Error).message).not.toContain("private database");
    expect(getSupabaseAdmin).not.toHaveBeenCalled();
  });

  it("rejects malformed JSON and incomplete write acknowledgements", async () => {
    configure();
    vi.mocked(fetch).mockResolvedValueOnce(new Response("<html>not JSON</html>", { status: 200 }));
    await expect(callAnalyticsBackend("insights", {})).rejects.toMatchObject({ status: 502 });
    vi.mocked(fetch).mockResolvedValueOnce(Response.json({ success: true }));
    await expect(storeAnalyticsEvent(event)).rejects.toMatchObject({ status: 502 });
    expect(getSupabaseAdmin).not.toHaveBeenCalled();
  });
});
