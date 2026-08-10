import { describe, expect, it } from "vitest";

import { GET } from "@/app/api/knowledge/generator-context/route";

describe("GET /api/knowledge/generator-context", () => {
  it("fails closed when no generator-approved resources are published", async () => {
    const response = await GET(new Request("http://localhost/api/knowledge/generator-context?q=dashboard"));
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      schemaVersion: "knowledge-generator-context-v1",
      query: "dashboard",
      references: [],
    });
  });
});
