import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseAdmin: vi.fn(),
}));

vi.mock("@/lib/security/rate-limit", () => ({
  checkRateLimit: vi.fn(),
  createRateLimitHeaders: vi.fn(() => ({})),
  getRequestClientKey: vi.fn(() => "test-client"),
}));

import { GET, POST } from "@/app/api/newsletter/unsubscribe/route";
import { createUnsubscribeToken } from "@/lib/newsletter/token";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const mockedGetSupabaseAdmin = vi.mocked(getSupabaseAdmin);
const mockedCheckRateLimit = vi.mocked(checkRateLimit);

const SECRET = "test-newsletter-secret";

function createSupabaseMock(deleteError: { message: string } | null = null) {
  const eq = vi.fn().mockResolvedValue({ error: deleteError });
  const del = vi.fn(() => ({ eq }));
  const from = vi.fn(() => ({ delete: del }));
  return { client: { from }, del, eq };
}

function request(token: string, method: "GET" | "POST" = "GET") {
  return new Request(
    `https://stylekit.top/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`,
    { method },
  );
}

beforeEach(() => {
  vi.stubEnv("NEWSLETTER_SECRET", SECRET);
  vi.stubEnv("ADMIN_SESSION_SECRET", "");
  vi.stubEnv("EMAIL_OTP_SECRET", "");
  mockedCheckRateLimit.mockReturnValue({
    allowed: true,
    limit: 30,
    remaining: 29,
    resetAt: Date.now() + 60_000,
    retryAfterSec: 60,
  });
});

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllEnvs();
});

describe("GET /api/newsletter/unsubscribe", () => {
  it("asks for confirmation instead of deleting on the link fetch", async () => {
    const supabase = createSupabaseMock();
    mockedGetSupabaseAdmin.mockReturnValue(supabase.client as never);
    const token = createUnsubscribeToken("reader@example.com", "zh", SECRET)!;

    const response = await GET(request(token));
    const html = await response.text();

    expect(response.status).toBe(200);
    expect(html).toContain("确认退订");
    expect(html).toContain("r****@example.com");
    expect(html).toContain('method="post"');
    expect(html).toContain(encodeURIComponent(token));
    expect(supabase.del).not.toHaveBeenCalled();
    expect(response.headers.get("x-robots-tag")).toContain("noindex");
  });

  it("uses the locale carried by the token", async () => {
    const token = createUnsubscribeToken("reader@example.com", "en", SECRET)!;
    const html = await (await GET(request(token))).text();
    expect(html).toContain("Confirm unsubscribe");
  });

  it("rejects a forged token", async () => {
    const response = await GET(request("v1.forged.signature"));
    expect(response.status).toBe(400);
  });
});

describe("POST /api/newsletter/unsubscribe", () => {
  it("deletes the stored address and confirms it", async () => {
    const supabase = createSupabaseMock();
    mockedGetSupabaseAdmin.mockReturnValue(supabase.client as never);
    const token = createUnsubscribeToken("reader@example.com", "zh", SECRET)!;

    const response = await POST(request(token, "POST"));
    const html = await response.text();

    expect(response.status).toBe(200);
    expect(html).toContain("已取消订阅");
    expect(supabase.eq).toHaveBeenCalledWith("email", "reader@example.com");
  });

  it("rejects a forged token without deleting anything", async () => {
    const supabase = createSupabaseMock();
    mockedGetSupabaseAdmin.mockReturnValue(supabase.client as never);

    const response = await POST(request("v1.forged.signature", "POST"));
    expect(response.status).toBe(400);
    expect(supabase.del).not.toHaveBeenCalled();
  });

  it("reports a storage failure instead of claiming success", async () => {
    const supabase = createSupabaseMock({ message: "boom" });
    mockedGetSupabaseAdmin.mockReturnValue(supabase.client as never);
    const token = createUnsubscribeToken("reader@example.com", "zh", SECRET)!;

    const response = await POST(request(token, "POST"));
    expect(response.status).toBe(500);
  });

  it("reports a missing Supabase configuration", async () => {
    mockedGetSupabaseAdmin.mockReturnValue(null);
    const token = createUnsubscribeToken("reader@example.com", "zh", SECRET)!;

    const response = await POST(request(token, "POST"));
    expect(response.status).toBe(503);
  });

  it("rate limits repeated confirmation posts", async () => {
    mockedCheckRateLimit.mockReturnValue({
      allowed: false,
      limit: 30,
      remaining: 0,
      resetAt: Date.now() + 60_000,
      retryAfterSec: 60,
    });
    const token = createUnsubscribeToken("reader@example.com", "zh", SECRET)!;

    const response = await POST(request(token, "POST"));
    expect(response.status).toBe(429);
    expect(mockedGetSupabaseAdmin).not.toHaveBeenCalled();
  });
});
