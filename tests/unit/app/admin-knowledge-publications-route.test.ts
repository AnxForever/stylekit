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

import { GET, POST } from "@/app/api/admin/knowledge/publications/route";

describe("admin knowledge publication controls", () => {
  it("blocks publication until the Git manifest passes its approval gate", async () => {
    const response = await POST(new Request("http://localhost/api/admin/knowledge/publications", {
      method: "POST",
      body: JSON.stringify({ resourceId: "radix-primitives", action: "publish" }),
      headers: { "content-type": "application/json" },
    }));

    expect(response.status).toBe(422);
    const payload = await response.json();
    expect(payload.requiresManifestSync).toBe(true);
    expect(payload.blockers).toContain("Git manifest reviewStatus must be approved");
  });

  it("requires notes for deprecation and revocation", async () => {
    const response = await POST(new Request("http://localhost/api/admin/knowledge/publications", {
      method: "POST",
      body: JSON.stringify({ resourceId: "radix-primitives", action: "revoke" }),
      headers: { "content-type": "application/json" },
    }));

    expect(response.status).toBe(400);
  });

  it("fails closed when the publication store is not configured", async () => {
    const response = await GET(new Request("http://localhost/api/admin/knowledge/publications"));
    expect(response.status).toBe(503);
  });
});
