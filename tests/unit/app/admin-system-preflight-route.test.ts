import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseAdmin: vi.fn(),
}));

import { GET } from "@/app/api/admin/system/preflight/route";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const mockedCheckAdminApiAccess = vi.mocked(checkAdminApiAccess);
const mockedGetSupabaseAdmin = vi.mocked(getSupabaseAdmin);

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllEnvs();
});

describe("GET /api/admin/system/preflight", () => {
  it("rejects unauthorised requests before inspecting tables", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: false,
      status: 403,
      error: "Forbidden",
    });

    const response = await GET(new Request("https://stylekit.top/api/admin/system/preflight"));

    expect(response.status).toBe(403);
    expect(mockedGetSupabaseAdmin).not.toHaveBeenCalled();
    await expect(response.json()).resolves.toEqual({ error: "Forbidden" });
  });

  it("reports optional product validation tables as warning without writing", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service-role-test");
    vi.stubEnv("ADMIN_SESSION_SECRET", "session-secret-test");
    vi.stubEnv("ADMIN_PASSWORD_SHA256", "a".repeat(64));
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
      actor: { type: "password-session", id: "admin-password-session" },
    });

    const select = vi.fn((tableName: string) =>
      Promise.resolve({
        error: tableName.startsWith("product_validation_")
          ? { code: "42P01", message: "relation does not exist" }
          : null,
      }),
    );
    const from = vi.fn((tableName: string) => ({ select: () => select(tableName) }));
    const rpc = vi.fn().mockResolvedValue({
      data: { implementationIntentVersion: 2 },
      error: null,
    });
    mockedGetSupabaseAdmin.mockReturnValue({ from, rpc } as never);

    const response = await GET(new Request("https://stylekit.top/api/admin/system/preflight"));
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.overall).toBe("warning");
    expect(payload.checks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "产品验证数据",
          status: "warning",
          severity: "recommended",
        }),
        expect.objectContaining({
          id: "公告与赞助",
          status: "ready",
          severity: "required",
        }),
        expect.objectContaining({
          id: "analytics-signal",
          status: "ready",
          severity: "recommended",
        }),
      ]),
    );
    expect(select).toHaveBeenCalledTimes(11);
    expect(from).toHaveBeenCalledTimes(11);
    expect(rpc).toHaveBeenCalledTimes(1);
  });
});
