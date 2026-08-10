import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/analytics", () => ({
  getUsageStats: vi.fn(),
  getTopStyles: vi.fn(),
  getPopularCombinations: vi.fn(),
  trackStyleUsage: vi.fn(),
  trackStyleCombination: vi.fn(),
}));

vi.mock("@/lib/security/request-origin", () => ({
  verifyTrustedOrigin: vi.fn(),
}));

vi.mock("@/lib/security/rate-limit", () => ({
  checkRateLimit: vi.fn(),
  createRateLimitHeaders: vi.fn(),
  getRequestClientKey: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseAdmin: vi.fn(),
}));

vi.mock("@/lib/styles", () => ({
  getStyleBySlug: vi.fn(),
}));

vi.mock("@/lib/styles/community-runtime", () => ({
  resolveStyleBySlug: vi.fn(),
}));

import { POST } from "@/app/api/analytics/route";
import { trackStyleCombination, trackStyleUsage } from "@/lib/analytics";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getStyleBySlug } from "@/lib/styles";
import { resolveStyleBySlug } from "@/lib/styles/community-runtime";

const mockedVerifyTrustedOrigin = vi.mocked(verifyTrustedOrigin);
const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const mockedCreateRateLimitHeaders = vi.mocked(createRateLimitHeaders);
const mockedGetRequestClientKey = vi.mocked(getRequestClientKey);
const mockedGetSupabaseAdmin = vi.mocked(getSupabaseAdmin);
const mockedGetStyleBySlug = vi.mocked(getStyleBySlug);
const mockedResolveStyleBySlug = vi.mocked(resolveStyleBySlug);
const mockedTrackStyleUsage = vi.mocked(trackStyleUsage);
const mockedTrackStyleCombination = vi.mocked(trackStyleCombination);

function request(body: unknown, headers: HeadersInit = {}) {
  return new Request("https://stylekit.top/api/analytics", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://stylekit.top", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
  mockedGetRequestClientKey.mockReturnValue("client-key");
  mockedCheckRateLimit.mockReturnValue({
    allowed: true,
    limit: 300,
    remaining: 299,
    resetAt: Date.now() + 60_000,
    retryAfterSec: 60,
  });
  mockedCreateRateLimitHeaders.mockReturnValue({ "x-ratelimit-remaining": "299" });
  mockedGetStyleBySlug.mockImplementation((slug) =>
    slug === "corporate-clean" || slug === "neo-brutalist"
      ? ({ slug } as never)
      : undefined,
  );
  mockedResolveStyleBySlug.mockImplementation(async (slug) =>
    slug === "corporate-clean" || slug === "neo-brutalist"
      ? ({ source: "static", style: { slug }, tokens: null } as never)
      : null,
  );
});

describe("analytics route", () => {
  it("stores a valid client event with a server-derived slug and no raw IP or user agent", async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    mockedGetSupabaseAdmin.mockReturnValue({
      from: vi.fn().mockReturnValue({ insert }),
    } as never);

    const response = await POST(
      request(
        {
          eventType: "showcase_open",
          eventData: { slug: "corporate-clean", source: "hero" },
          sessionId: "123e4567-e89b-42d3-a456-426614174000",
        },
        {
          "user-agent": "Mozilla/5.0 Chrome/126.0",
          "x-forwarded-for": "203.0.113.8",
        },
      ),
    );

    expect(response.status).toBe(200);
    expect(insert).toHaveBeenCalledWith({
      event_type: "showcase_open",
      event_data: {
        slug: "corporate-clean",
        source: "hero",
        browser: "Chrome",
        os: "Unknown",
        deviceType: "desktop",
        country: null,
        environment: "test",
      },
      style_slug: "corporate-clean",
      session_id: "123e4567-e89b-42d3-a456-426614174000",
    });
    expect(JSON.stringify(insert.mock.calls)).not.toContain("203.0.113.8");
    expect(JSON.stringify(insert.mock.calls)).not.toContain("Mozilla/5.0");
  });

  it("stores project brief generation with aggregate metadata only", async () => {
    const insert = vi.fn().mockResolvedValue({ error: null });
    mockedGetSupabaseAdmin.mockReturnValue({
      from: vi.fn().mockReturnValue({ insert }),
    } as never);

    const response = await POST(
      request({
        eventType: "project_brief_generated",
        eventData: {
          slug: "neo-brutalist",
          locale: "zh",
          project_type: "app",
          stack_count: 2,
          required_item_count: 3,
          state_count: 4,
          optional_field_count: 5,
          completion_tier: "complete",
          source: "style_detail",
        },
        sessionId: null,
      }),
    );

    expect(response.status).toBe(200);
    expect(insert).toHaveBeenCalledWith(
      expect.objectContaining({
        event_type: "project_brief_generated",
        style_slug: "neo-brutalist",
        event_data: expect.objectContaining({
          slug: "neo-brutalist",
          project_type: "app",
          required_item_count: 3,
        }),
      }),
    );
    expect(JSON.stringify(insert.mock.calls)).not.toContain("audience");
    expect(JSON.stringify(insert.mock.calls)).not.toContain("primaryGoal");
  });

  it("rejects raw project brief text before storage", async () => {
    const insert = vi.fn();
    mockedGetSupabaseAdmin.mockReturnValue({
      from: vi.fn().mockReturnValue({ insert }),
    } as never);

    const response = await POST(
      request({
        eventType: "project_brief_copy",
        eventData: {
          slug: "neo-brutalist",
          locale: "en",
          project_type: "dashboard",
          stack_count: 0,
          required_item_count: 0,
          state_count: 0,
          optional_field_count: 0,
          completion_tier: "core",
          source: "style_detail",
          generated_markdown: "private implementation brief",
        },
        sessionId: null,
      }),
    );

    expect(response.status).toBe(400);
    expect(insert).not.toHaveBeenCalled();
  });

  it.each([
    "pack_purchase_intent",
    "pack_checkout_start",
    "pack_purchase",
    "pack_refund",
    "pack_install_success",
    "admin_submission_approve",
  ])("rejects public writes for authoritative or unknown event %s", async (eventType) => {
    const insert = vi.fn();
    mockedGetSupabaseAdmin.mockReturnValue({
      from: vi.fn().mockReturnValue({ insert }),
    } as never);

    const response = await POST(
      request({ eventType, eventData: {}, sessionId: null }),
    );

    expect(response.status).toBe(400);
    expect(insert).not.toHaveBeenCalled();
  });

  it("rate limits before parsing or storing the request", async () => {
    mockedCheckRateLimit.mockReturnValue({
      allowed: false,
      limit: 300,
      remaining: 0,
      resetAt: Date.now() + 60_000,
      retryAfterSec: 60,
    });
    const insert = vi.fn();
    mockedGetSupabaseAdmin.mockReturnValue({
      from: vi.fn().mockReturnValue({ insert }),
    } as never);

    const response = await POST(request("{invalid"));

    expect(response.status).toBe(429);
    expect(insert).not.toHaveBeenCalled();
  });

  it("rejects oversized request bodies", async () => {
    const response = await POST(request(JSON.stringify({ value: "a".repeat(17 * 1024) })));
    expect(response.status).toBe(413);
  });

  it.each(["__proto__", "constructor", "not-in-catalog"])(
    "rejects unsafe or unknown legacy slug %s",
    async (slug) => {
      const response = await POST(request({ slug, source: "page" }));
      expect(response.status).toBe(400);
      expect(mockedTrackStyleUsage).not.toHaveBeenCalled();
    },
  );

  it("rejects a well-formed but nonexistent style in client event data", async () => {
    const insert = vi.fn();
    mockedGetSupabaseAdmin.mockReturnValue({
      from: vi.fn().mockReturnValue({ insert }),
    } as never);

    const response = await POST(
      request({
        eventType: "catalog_impression",
        eventData: {
          slug: "not-in-catalog",
          rank: 1,
          surface: "styles_catalog",
          page: 1,
          sort: "recommended",
          collection_slug: null,
          filter_count: 0,
          query_present: false,
        },
        sessionId: null,
      }),
    );

    expect(response.status).toBe(400);
    expect(insert).not.toHaveBeenCalled();
  });

  it("accepts catalog-backed legacy usage and combinations", async () => {
    const response = await POST(
      request({ slug: "corporate-clean", slugB: "neo-brutalist", source: "api" }),
    );

    expect(response.status).toBe(200);
    expect(mockedTrackStyleUsage).toHaveBeenCalledWith("corporate-clean", "api");
    expect(mockedTrackStyleCombination).toHaveBeenCalledWith(
      "corporate-clean",
      "neo-brutalist",
    );
  });

  it("does not report success when storage is missing or rejects the write", async () => {
    mockedGetSupabaseAdmin.mockReturnValue(null);
    const missing = await POST(
      request({
        eventType: "github_click",
        eventData: { location: "header" },
        sessionId: null,
      }),
    );
    expect(missing.status).toBe(503);

    mockedGetSupabaseAdmin.mockReturnValue({
      from: vi.fn().mockReturnValue({
        insert: vi.fn().mockResolvedValue({ error: { code: "DB_WRITE_FAILED" } }),
      }),
    } as never);
    const failed = await POST(
      request({
        eventType: "github_click",
        eventData: { location: "header" },
        sessionId: null,
      }),
    );
    expect(failed.status).toBe(500);
  });
});
