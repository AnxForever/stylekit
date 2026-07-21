import { describe, expect, it } from "vitest";
import { GET } from "@/app/admin/visual-lab/corporate-clean-saas/registry.json/route";

describe("GET internal Corporate Clean pack registry", () => {
  it("returns a no-store deterministic multi-file registry item", async () => {
    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(response.headers.get("X-Robots-Tag")).toContain("noindex");
    expect(body.name).toBe("corporate-clean-saas");
    expect(body.type).toBe("registry:block");
    expect(body.files.length).toBeGreaterThan(10);
  });
});
