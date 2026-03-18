import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/styles/route";

describe("GET /api/styles", () => {
  it("returns style catalog", async () => {
    const response = await GET();
    expect(response.status).toBe(200);

    const body = (await response.json()) as {
      total: number;
      styles: Array<{ slug: string }>;
    };

    expect(body.total).toBeGreaterThan(0);
    expect(body.styles[0]?.slug).toBeTruthy();
  });
});
