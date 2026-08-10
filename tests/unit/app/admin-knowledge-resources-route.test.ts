import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(async () => ({ allowed: true, actor: { type: "dev-bypass", id: "test" } })),
}));

import { GET } from "@/app/api/admin/knowledge/resources/route";

describe("GET /api/admin/knowledge/resources", () => {
  it("returns candidate resources with approval blockers", async () => {
    const response = await GET(new Request("http://localhost/api/admin/knowledge/resources"));
    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload.schemaVersion).toBe("knowledge-admin-resources-v1");
    expect(payload.source).toBe("git-manifests");
    expect(payload.counts.total).toBe(10);
    expect(payload.resources[0].approval.blockers.length).toBeGreaterThan(0);
  });
});
