import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(async () => ({
    allowed: true,
    actor: { type: "dev-bypass", id: "test" },
  })),
}));

vi.mock("@/lib/supabase/server", () => ({
  getSupabaseAdmin: vi.fn(() => null),
}));

import { POST } from "@/app/api/admin/knowledge/ingest/route";

describe("POST /api/admin/knowledge/ingest", () => {
  it("returns a safe dry-run when Supabase is not configured", async () => {
    const response = await POST(new Request("http://localhost/api/admin/knowledge/ingest", {
      method: "POST",
      body: JSON.stringify({}),
      headers: { "content-type": "application/json" },
    }));

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload.mode).toBe("dry-run");
    expect(payload.storage).toBe("unconfigured");
    expect(payload.plan.total).toBe(10);
    expect(payload.plan.counts["create-pending"]).toBe(10);
  });

  it("refuses a commit when Supabase is not configured", async () => {
    const response = await POST(new Request("http://localhost/api/admin/knowledge/ingest", {
      method: "POST",
      body: JSON.stringify({ commit: true }),
      headers: { "content-type": "application/json" },
    }));

    expect(response.status).toBe(503);
  });
});
