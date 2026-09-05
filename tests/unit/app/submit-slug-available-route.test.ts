import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/submission", () => ({
  isSlugTakenBySlug: vi.fn(),
}));

vi.mock("@/lib/styles/registry", () => ({
  getStyleBySlug: vi.fn(),
}));

vi.mock("@/lib/security/rate-limit", () => ({
  checkRateLimit: vi.fn(() => ({ allowed: true })),
  createRateLimitHeaders: vi.fn(() => ({})),
  getRequestClientKey: vi.fn(() => "test-key"),
}));

import { GET } from "@/app/api/submit/slug-available/route";
import { isSlugTakenBySlug } from "@/lib/submission";
import { getStyleBySlug } from "@/lib/styles/registry";
import { checkRateLimit } from "@/lib/security/rate-limit";

const mockedTaken = vi.mocked(isSlugTakenBySlug);
const mockedCurated = vi.mocked(getStyleBySlug);
const mockedRate = vi.mocked(checkRateLimit);

function request(slug: string): Request {
  return new Request(
    `https://stylekit.top/api/submit/slug-available?slug=${encodeURIComponent(slug)}`,
  );
}

afterEach(() => {
  vi.clearAllMocks();
  mockedRate.mockReturnValue({ allowed: true } as never);
});

describe("GET /api/submit/slug-available", () => {
  it("reports an available slug", async () => {
    mockedCurated.mockReturnValue(undefined as never);
    mockedTaken.mockResolvedValue(false);

    const res = await GET(request("nordic-minimal"));
    const body = await res.json();

    expect(body).toMatchObject({ available: true, reason: "available", slug: "nordic-minimal" });
  });

  it("rejects a slug that is already a curated style without hitting the database", async () => {
    mockedCurated.mockReturnValue({ slug: "glassmorphism" } as never);

    const res = await GET(request("glassmorphism"));
    const body = await res.json();

    expect(body).toMatchObject({ available: false, reason: "curated" });
    expect(mockedTaken).not.toHaveBeenCalled();
  });

  it("reports a slug already claimed by a submission in flight", async () => {
    mockedCurated.mockReturnValue(undefined as never);
    mockedTaken.mockResolvedValue(true);

    const res = await GET(request("neon-washi"));
    const body = await res.json();

    expect(body).toMatchObject({ available: false, reason: "pending" });
  });

  it("flags a malformed slug as invalid before any lookup", async () => {
    const res = await GET(request("Not A Slug"));
    const body = await res.json();

    expect(body).toMatchObject({ available: false, reason: "invalid" });
    expect(mockedCurated).not.toHaveBeenCalled();
    expect(mockedTaken).not.toHaveBeenCalled();
  });

  it("normalizes case before checking", async () => {
    mockedCurated.mockReturnValue(undefined as never);
    mockedTaken.mockResolvedValue(false);

    const res = await GET(request("Neon-Washi"));
    const body = await res.json();

    expect(body.slug).toBe("neon-washi");
    expect(getStyleBySlug).toHaveBeenCalledWith("neon-washi");
  });

  it("returns 429 when rate limited", async () => {
    mockedRate.mockReturnValue({ allowed: false } as never);

    const res = await GET(request("anything"));

    expect(res.status).toBe(429);
  });
});
