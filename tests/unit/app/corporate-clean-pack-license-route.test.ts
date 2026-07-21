import { describe, expect, it } from "vitest";
import { GET } from "@/app/packs/corporate-clean-saas/license/route";

describe("Corporate Clean SaaS license artifact route", () => {
  it("serves the exact draft license without pretending final sale authorization", async () => {
    const response = await GET();
    const body = await response.text();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/markdown");
    expect(response.headers.get("x-robots-tag")).toMatch(/noindex.*nofollow/i);
    expect(body).toContain("StyleKit Pro License v1");
    expect(body).toMatch(/draft|草案|最终法律与商业审核|final legal and commercial review/i);
  });
});
