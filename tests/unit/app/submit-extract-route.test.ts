import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/supabase-server", () => ({ getServerUser: vi.fn() }));
vi.mock("@/lib/security/request-origin", () => ({
  verifyTrustedOrigin: vi.fn(() => ({ ok: true })),
}));
vi.mock("@/lib/security/rate-limit", () => ({
  checkRateLimit: vi.fn(() => ({ allowed: true })),
  createRateLimitHeaders: vi.fn(() => ({})),
  getRequestClientKey: vi.fn(() => "test-key"),
}));

import { POST } from "@/app/api/submit/extract/route";
import { getServerUser } from "@/lib/auth/supabase-server";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { checkRateLimit } from "@/lib/security/rate-limit";

const mockUser = vi.mocked(getServerUser);
const mockOrigin = vi.mocked(verifyTrustedOrigin);
const mockRate = vi.mocked(checkRateLimit);

function req(body: unknown): Request {
  return new Request("https://stylekit.top/api/submit/extract", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://stylekit.top" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  mockOrigin.mockReturnValue({ ok: true } as never);
  mockRate.mockReturnValue({ allowed: true } as never);
  mockUser.mockResolvedValue({ id: "u1" } as never);
  vi.stubEnv("EXTRACT_SERVICE_URL", "https://svc.internal/extract");
  vi.stubEnv("EXTRACT_TOKEN", "secret");
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("POST /api/submit/extract", () => {
  it("rejects a bad origin", async () => {
    mockOrigin.mockReturnValue({ ok: false, status: 403, error: "bad" } as never);
    expect((await POST(req({ url: "https://x.com" }))).status).toBe(403);
  });

  it("requires sign-in", async () => {
    mockUser.mockResolvedValue(null as never);
    expect((await POST(req({ url: "https://x.com" }))).status).toBe(401);
  });

  it("rate-limits", async () => {
    mockRate.mockReturnValue({ allowed: false } as never);
    expect((await POST(req({ url: "https://x.com" }))).status).toBe(429);
  });

  it("returns 503 when the service is not configured", async () => {
    vi.stubEnv("EXTRACT_SERVICE_URL", "");
    expect((await POST(req({ url: "https://x.com" }))).status).toBe(503);
  });

  it("requires a url", async () => {
    expect((await POST(req({}))).status).toBe(400);
  });

  it("rejects an SSRF target before forwarding", async () => {
    const res = await POST(req({ url: "http://169.254.169.254/latest/meta-data/" }));
    expect(res.status).toBe(400);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("forwards a public URL and returns the manifest", async () => {
    const manifest = { formData: { name: "Aurora" } };
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ manifest, needsReview: ["name"] }), { status: 200 }),
    );
    const res = await POST(req({ url: "http://8.8.8.8/" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({ success: true, manifest, needsReview: ["name"] });
    // Forwarded with the bearer token.
    const [, init] = vi.mocked(fetch).mock.calls[0];
    expect((init?.headers as Record<string, string>).authorization).toBe("Bearer secret");
  });

  it("surfaces a busy service as retryable 503", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ error: "busy" }), { status: 503 }),
    );
    expect((await POST(req({ url: "http://8.8.8.8/" }))).status).toBe(503);
  });

  it("maps an unreachable service to 502", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("ECONNREFUSED"));
    expect((await POST(req({ url: "http://8.8.8.8/" }))).status).toBe(502);
  });
});
