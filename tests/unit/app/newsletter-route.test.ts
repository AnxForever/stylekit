import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseAdmin: vi.fn(),
}));

vi.mock("@/lib/newsletter/mail", () => ({
  sendNewsletterWelcome: vi.fn(),
}));

vi.mock("@/lib/security/rate-limit", () => ({
  checkRateLimit: vi.fn(),
  createRateLimitHeaders: vi.fn(() => ({ "x-ratelimit-remaining": "2" })),
  getRequestClientKey: vi.fn(() => "test-client"),
}));

import { POST } from "@/app/api/newsletter/route";
import { sendNewsletterWelcome } from "@/lib/newsletter/mail";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const mockedGetSupabaseAdmin = vi.mocked(getSupabaseAdmin);
const mockedSendWelcome = vi.mocked(sendNewsletterWelcome);
const mockedCheckRateLimit = vi.mocked(checkRateLimit);

const ALLOWED = {
  allowed: true,
  limit: 3,
  remaining: 2,
  resetAt: Date.now() + 60_000,
  retryAfterSec: 60,
};

function allowAllRateLimits() {
  mockedCheckRateLimit.mockReturnValue(ALLOWED);
}

function createSupabaseMock(options: { existing?: boolean } = {}) {
  const insert = vi.fn().mockResolvedValue({ error: null });
  const maybeSingle = vi
    .fn()
    .mockResolvedValue({ data: options.existing ? { email: "reader@example.com" } : null, error: null });
  const select = vi.fn(() => ({ eq: vi.fn(() => ({ maybeSingle })) }));
  const from = vi.fn(() => ({ select, insert }));
  return { client: { from }, insert, maybeSingle };
}

function post(body: unknown) {
  return POST(
    new Request("https://stylekit.top/api/newsletter", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }),
  );
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/newsletter", () => {
  it("stores a new address and sends the welcome mail", async () => {
    allowAllRateLimits();
    const supabase = createSupabaseMock();
    mockedGetSupabaseAdmin.mockReturnValue(supabase.client as never);
    mockedSendWelcome.mockResolvedValue(true);

    const response = await post({ email: "Reader@Example.com", locale: "en" });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toMatchObject({ success: true, code: "subscribed", emailSent: true });
    expect(supabase.insert).toHaveBeenCalledWith({
      email: "reader@example.com",
      subscribed_at: expect.any(String),
    });
    expect(mockedSendWelcome).toHaveBeenCalledWith("reader@example.com", "en");
  });

  it("reports an existing address as a neutral state without re-sending mail", async () => {
    allowAllRateLimits();
    const supabase = createSupabaseMock({ existing: true });
    mockedGetSupabaseAdmin.mockReturnValue(supabase.client as never);

    const response = await post({ email: "reader@example.com" });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toMatchObject({ success: true, code: "already-subscribed" });
    expect(supabase.insert).not.toHaveBeenCalled();
    expect(mockedSendWelcome).not.toHaveBeenCalled();
  });

  it("still records the address when the welcome mail is rate limited", async () => {
    mockedCheckRateLimit.mockImplementation((options) =>
      options.namespace === "newsletter-welcome"
        ? { ...ALLOWED, allowed: false }
        : ALLOWED,
    );
    const supabase = createSupabaseMock();
    mockedGetSupabaseAdmin.mockReturnValue(supabase.client as never);

    const response = await post({ email: "reader@example.com" });
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toMatchObject({ code: "subscribed", emailSent: false });
    expect(supabase.insert).toHaveBeenCalled();
    expect(mockedSendWelcome).not.toHaveBeenCalled();
  });

  it("rejects an invalid address before touching the database", async () => {
    allowAllRateLimits();

    const response = await post({ email: "not-an-email" });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toMatchObject({ success: false, code: "invalid-email" });
    expect(mockedGetSupabaseAdmin).not.toHaveBeenCalled();
  });

  it("rejects malformed request bodies as invalid addresses", async () => {
    allowAllRateLimits();
    const response = await POST(
      new Request("https://stylekit.top/api/newsletter", {
        method: "POST",
        body: "{",
      }),
    );
    expect(response.status).toBe(400);
  });

  it("returns a rate-limit code the footer can localize", async () => {
    mockedCheckRateLimit.mockReturnValue({ ...ALLOWED, allowed: false });

    const response = await post({ email: "reader@example.com" });
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data).toMatchObject({ success: false, code: "rate-limited" });
  });

  it("reports a missing Supabase configuration instead of pretending to subscribe", async () => {
    allowAllRateLimits();
    mockedGetSupabaseAdmin.mockReturnValue(null);

    const response = await post({ email: "reader@example.com" });
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data).toMatchObject({ success: false, code: "not-configured" });
  });

  it("surfaces insert failures", async () => {
    allowAllRateLimits();
    const supabase = createSupabaseMock();
    supabase.insert.mockResolvedValue({ error: { message: "boom" } } as never);
    mockedGetSupabaseAdmin.mockReturnValue(supabase.client as never);

    const response = await post({ email: "reader@example.com" });
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toMatchObject({ success: false, code: "failed" });
    expect(mockedSendWelcome).not.toHaveBeenCalled();
  });
});
