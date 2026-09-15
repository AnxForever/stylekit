import { beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ user: vi.fn(), client: vi.fn(), publicStyle: vi.fn(), origin: vi.fn(), configured: vi.fn() }));
vi.mock("@/lib/auth/supabase-server", () => ({ getServerUser: mocks.user }));
vi.mock("@/lib/submit/reviewer-supabase", () => ({ isSupabaseConfigured: mocks.configured }));
vi.mock("@supabase/supabase-js", () => ({ createClient: mocks.client }));
vi.mock("@/lib/community/public-style", () => ({ getPublicDiscussionStyle: mocks.publicStyle }));
vi.mock("@/lib/security/request-origin", () => ({ verifyTrustedOrigin: mocks.origin }));
vi.mock("@/lib/security/rate-limit", () => ({ checkRateLimit: () => ({ allowed: true }), getRequestClientKey: () => "test", createRateLimitHeaders: () => ({}) }));
vi.mock("@/lib/auth/admin-policy", () => ({ getAdminUserIds: () => [] }));
import { GET, POST } from "@/app/api/styles/[slug]/comments/route";

const parentId = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const actorId = "11111111-1111-4111-8111-111111111111";
const params = { params: Promise.resolve({ slug: "dark-mode" }) };
function request(body: unknown) { return new Request("https://www.stylekit.top/api/styles/dark-mode/comments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }); }
function store({ parent = true, error = null as { code: string; message?: string } | null } = {}) {
  const query = {
    select: vi.fn().mockReturnThis(), eq: vi.fn().mockReturnThis(),
    in: vi.fn().mockResolvedValue({ data: [], error: null }), gte: vi.fn().mockResolvedValue({ count: 0, error: null }),
    maybeSingle: vi.fn().mockResolvedValue({ data: parent ? { id: parentId } : null, error: null }),
    insert: vi.fn().mockReturnThis(), single: vi.fn().mockResolvedValue({ data: error ? null : { id: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb", content: "A reply", author_name: "Member", user_id: actorId, created_at: "2026-09-15T01:00:00Z", reply_to_id: parentId, is_reply: true }, error }),
  };
  mocks.client.mockReturnValue({ from: vi.fn().mockReturnValue(query) });
  return query;
}
beforeEach(() => {
  vi.clearAllMocks(); mocks.configured.mockReturnValue(true); mocks.origin.mockReturnValue({ ok: true });
  mocks.user.mockResolvedValue({ id: actorId, user_metadata: { user_name: "Member" } });
  mocks.publicStyle.mockResolvedValue({ slug: "dark-mode", href: "/styles/dark-mode" });
});

describe("reply publication boundary", () => {
  it("publishes a validated same-style parent reference using the authenticated actor", async () => {
    const db = store();
    const response = await POST(request({ content: " A reply ", replyToId: parentId, recipientId: "attacker" }), params);
    expect(response.status).toBe(200);
    expect(db.eq).toHaveBeenCalledWith("style_slug", "dark-mode");
    expect(db.eq).toHaveBeenCalledWith("id", parentId);
    expect(db.insert).toHaveBeenCalledWith(expect.objectContaining({ content: "A reply", reply_to_id: parentId, user_id: actorId }));
    expect(db.insert.mock.calls[0][0]).not.toHaveProperty("recipientId");
    expect((await response.json()).comment).toMatchObject({ reply_to_id: parentId, is_reply: true });
  });
  it("does not accept cross-style or missing targets", async () => {
    const db = store({ parent: false });
    expect((await POST(request({ content: "A reply", replyToId: parentId }), params)).status).toBe(404);
    expect(db.insert).not.toHaveBeenCalled();
  });
  it("never downgrades a failed reply into a plain legacy comment", async () => {
    const db = store({ error: { code: "42703", message: "column reply_to_id does not exist" } });
    const response = await POST(request({ content: "A reply", replyToId: parentId }), params);
    expect(response.status).toBe(503);
    expect((await response.json()).code).toBe("COMMUNITY_UPGRADE_REQUIRED");
    expect(db.insert).toHaveBeenCalledOnce();
  });
  it("handles a parent deleted between validation and insertion without a duplicate write", async () => {
    const db = store({ error: { code: "23503" } });
    expect((await POST(request({ content: "A reply", replyToId: parentId }), params)).status).toBe(409);
    expect(db.insert).toHaveBeenCalledOnce();
  });
  it("rejects hidden-style reads and writes, including during a visibility outage", async () => {
    const db = store(); mocks.publicStyle.mockResolvedValue(null);
    expect((await GET(new Request("https://www.stylekit.top/api/styles/dark-mode/comments"), params)).status).toBe(404);
    expect((await POST(request({ content: "A reply", replyToId: parentId }), params)).status).toBe(404);
    expect(db.insert).not.toHaveBeenCalled();
    mocks.publicStyle.mockRejectedValue(new Error("unavailable"));
    expect((await GET(new Request("https://www.stylekit.top/api/styles/dark-mode/comments"), params)).status).toBe(503);
  });
  it("rejects anonymous replies and invalid parent identifiers", async () => {
    store(); mocks.user.mockResolvedValueOnce(null);
    expect((await POST(request({ content: "A reply", replyToId: parentId }), params)).status).toBe(401);
    expect((await POST(request({ content: "A reply", replyToId: "bad" }), params)).status).toBe(400);
  });
});
