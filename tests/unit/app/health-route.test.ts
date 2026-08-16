import { describe, expect, it } from "vitest";

import { GET, HEAD } from "@/app/api/health/route";

describe("GET /api/health", () => {
  it("returns lightweight runtime health without external dependencies", async () => {
    const response = GET();

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store, max-age=0");

    const payload = await response.json();
    expect(payload).toEqual({
      status: "ok",
      service: "stylekit",
    });
    // Public surface only: runtime details (node version, memory, uptime) are
    // stripped to avoid reconnaissance surface (see app/api/health/route.ts).
    expect(payload).not.toHaveProperty("timestamp");
    expect(payload).not.toHaveProperty("uptime");
    expect(payload).not.toHaveProperty("nodeVersion");
    expect(payload).not.toHaveProperty("memory");
  });
});

describe("HEAD /api/health", () => {
  it("returns a no-content success response", () => {
    const response = HEAD();

    expect(response.status).toBe(204);
    expect(response.headers.get("cache-control")).toBe("no-store, max-age=0");
  });
});
