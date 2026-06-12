import { describe, expect, it } from "vitest";

import { GET, HEAD } from "@/app/api/health/route";

describe("GET /api/health", () => {
  it("returns lightweight runtime health without external dependencies", async () => {
    const response = GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store, max-age=0");

    const payload = await response.json();
    expect(payload).toEqual(
      expect.objectContaining({
        status: "ok",
        service: "stylekit",
        timestamp: expect.any(String),
        uptime: expect.any(Number),
        nodeVersion: process.version,
        memory: expect.objectContaining({
          rss: expect.any(Number),
          heapTotal: expect.any(Number),
          heapUsed: expect.any(Number),
        }),
      })
    );
    expect(Number.isNaN(Date.parse(payload.timestamp))).toBe(false);
  });
});

describe("HEAD /api/health", () => {
  it("returns a no-content success response", () => {
    const response = HEAD();

    expect(response.status).toBe(204);
    expect(response.headers.get("cache-control")).toBe("no-store, max-age=0");
  });
});
