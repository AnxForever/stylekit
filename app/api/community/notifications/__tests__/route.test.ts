import { beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ user: vi.fn(), client: vi.fn(), list: vi.fn(), read: vi.fn(), origin: vi.fn(), rate: vi.fn() }));
vi.mock("@/lib/auth/supabase-server", () => ({ getServerUser: mocks.user }));
vi.mock("@/lib/supabase/server", () => ({ getSupabaseAdmin: mocks.client }));
vi.mock("@/lib/community/notifications", async (original) => ({ ...await original<typeof import("@/lib/community/notifications")>(), listCommunityNotifications: mocks.list, markCommunityNotificationsRead: mocks.read }));
vi.mock("@/lib/security/request-origin", () => ({ verifyTrustedOrigin: mocks.origin }));
vi.mock("@/lib/security/rate-limit", () => ({ checkRateLimit: mocks.rate, createRateLimitHeaders: () => ({}), getRequestClientKey: () => "ip:test" }));
import { GET, PATCH } from "@/app/api/community/notifications/route";

const recipient = "11111111-1111-4111-8111-111111111111";
const id = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
function patch(data: unknown) { return new Request("https://www.stylekit.top/api/community/notifications", { method: "PATCH", body: JSON.stringify(data), headers: { "Content-Type": "application/json" } }); }
beforeEach(() => {
  vi.clearAllMocks();
  mocks.user.mockResolvedValue({ id: recipient }); mocks.client.mockReturnValue({});
  mocks.list.mockResolvedValue({ items: [], unreadCount: 0, nextCursor: null });
  mocks.read.mockResolvedValue(undefined); mocks.origin.mockReturnValue({ ok: true }); mocks.rate.mockReturnValue({ allowed: true });
});

describe("notification authorization and failure contract", () => {
  it("rejects anonymous reads and writes before querying storage", async () => {
    mocks.user.mockResolvedValue(null);
    expect((await GET(new Request("https://www.stylekit.top/api/community/notifications"))).status).toBe(401);
    expect((await PATCH(patch({ ids: [id] }))).status).toBe(401);
    expect(mocks.client).not.toHaveBeenCalled();
  });
  it("ignores client-provided account scope and never caches private data", async () => {
    const response = await GET(new Request("https://www.stylekit.top/api/community/notifications?scope=someone-else"));
    expect(mocks.list).toHaveBeenCalledWith({}, recipient, { limit: 20, cursor: null });
    expect(response.headers.get("cache-control")).toBe("private, no-store");
    expect(response.headers.get("vary")).toBe("Cookie");
  });
  it("rejects invalid pagination and arbitrary recipient mutation fields", async () => {
    expect((await GET(new Request("https://www.stylekit.top/api/community/notifications?limit=9999"))).status).toBe(400);
    expect((await GET(new Request("https://www.stylekit.top/api/community/notifications?cursor=bad"))).status).toBe(400);
    expect((await PATCH(patch({ ids: [id], recipientId: "someone-else" }))).status).toBe(400);
    expect(mocks.read).not.toHaveBeenCalled();
  });
  it("marks only selected IDs for the actual user and deduplicates them", async () => {
    expect((await PATCH(patch({ ids: [id, id] }))).status).toBe(200);
    expect(mocks.read).toHaveBeenCalledWith({}, recipient, [id]);
  });
  it("rejects cross-origin writes, rate limiting, and oversized batches", async () => {
    mocks.origin.mockReturnValueOnce({ ok: false, status: 403, error: "Denied" });
    expect((await PATCH(patch({ ids: [id] }))).status).toBe(403);
    mocks.rate.mockReturnValueOnce({ allowed: false });
    expect((await PATCH(patch({ ids: [id] }))).status).toBe(429);
    expect((await PATCH(patch({ ids: Array(51).fill(id) }))).status).toBe(400);
  });
  it("returns 503 rather than a false empty-success inbox on storage failures", async () => {
    mocks.list.mockRejectedValue(new Error("private server details"));
    const response = await GET(new Request("https://www.stylekit.top/api/community/notifications"));
    expect(response.status).toBe(503);
    expect(await response.text()).not.toContain("private server details");
    mocks.client.mockReturnValue(null);
    expect((await PATCH(patch({ ids: [id] }))).status).toBe(503);
  });
});
