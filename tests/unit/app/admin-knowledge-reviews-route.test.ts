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

import { POST } from "@/app/api/admin/knowledge/reviews/route";

describe("POST /api/admin/knowledge/reviews", () => {
  it("blocks approval while the candidate still has review blockers", async () => {
    const response = await POST(new Request("http://localhost/api/admin/knowledge/reviews", {
      method: "POST",
      body: JSON.stringify({ resourceId: "shadcn-ui", decision: "approve" }),
      headers: { "content-type": "application/json" },
    }));

    expect(response.status).toBe(422);
    const payload = await response.json();
    expect(payload.blockers).toEqual(expect.arrayContaining(["secret scan has not passed"]));
  });
});
