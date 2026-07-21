import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/security/request-origin", () => ({ verifyTrustedOrigin: vi.fn(() => ({ ok: true })) }));
vi.mock("@/lib/security/rate-limit", () => ({
  checkRateLimit: vi.fn(() => ({ allowed: true, limit: 4, remaining: 3, resetAt: Date.now() + 1000 })),
  createRateLimitHeaders: vi.fn(() => ({})),
  getRequestClientKey: vi.fn(() => "test-client"),
}));
vi.mock("@/lib/supabase/server", () => ({ getSupabaseAdmin: vi.fn() }));
vi.mock("@/lib/product-validation/server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/product-validation/server")>();
  return { ...actual, resolveValidationRequestContext: vi.fn(), withdrawValidationParticipant: vi.fn() };
});

import { POST } from "@/app/api/product-validation/withdraw/route";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { resolveValidationRequestContext, withdrawValidationParticipant } from "@/lib/product-validation/server";

const mockedSupabase = vi.mocked(getSupabaseAdmin);
const mockedContext = vi.mocked(resolveValidationRequestContext);
const mockedWithdraw = vi.mocked(withdrawValidationParticipant);

beforeEach(() => {
  vi.clearAllMocks();
  mockedSupabase.mockReturnValue({ rpc: vi.fn() } as never);
  mockedContext.mockResolvedValue({
    experiment: { experimentId: "cc-saas-pack-price-2026-01" },
    identity: { identityKey: `anon:${"a".repeat(43)}` },
  } as never);
  mockedWithdraw.mockResolvedValue(true);
});

function request(body: unknown) {
  return new Request("https://stylekit.top/api/product-validation/withdraw", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://stylekit.top",
      "x-stylekit-validation-request": "withdraw-v1",
    },
    body: JSON.stringify(body),
  }) as never;
}

describe("product validation withdrawal", () => {
  it("requires explicit deletion confirmation", async () => {
    const response = await POST(request({ confirmDeletion: false }));
    expect(response.status).toBe(400);
    expect(mockedWithdraw).not.toHaveBeenCalled();
  });

  it("withdraws only the server-resolved device identity", async () => {
    const response = await POST(request({ confirmDeletion: true }));
    expect(response.status).toBe(200);
    expect(mockedWithdraw).toHaveBeenCalledWith(expect.anything(), {
      experimentId: "cc-saas-pack-price-2026-01",
      identityKey: `anon:${"a".repeat(43)}`,
    });
    expect(response.headers.get("set-cookie")).toContain("stylekit_pack_validation=");
  });
});
