import { describe, expect, it } from "vitest";

import { GET as getResource } from "@/app/api/knowledge/resources/[id]/route";
import { GET as listResources } from "@/app/api/knowledge/resources/route";

describe("knowledge resource APIs", () => {
  it("keeps pending candidates out of the public list", async () => {
    const response = await listResources(new Request("http://localhost/api/knowledge/resources?q=component"));

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store, max-age=0");
    await expect(response.json()).resolves.toEqual({
      schemaVersion: "knowledge-search-v1",
      total: 0,
      resources: [],
    });
  });

  it("does not expose an unpublished candidate through the detail endpoint", async () => {
    const response = await getResource(new Request("http://localhost/api/knowledge/resources/shadcn-ui"), {
      params: Promise.resolve({ id: "shadcn-ui" }),
    });

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: "Knowledge resource not found" });
  });
});
