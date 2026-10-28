import { afterEach, describe, expect, it, vi } from "vitest";

// `server-only` is a compile-time boundary supplied by Next.js; Vitest resolves
// it to a module that throws, so stub it exactly as the other server modules do.
vi.mock("server-only", () => ({}));

import { fetchUmamiActive } from "@/lib/analytics/umami-api";

const config = {
  username: "publisher",
  password: "secret",
  websiteId: "site-id",
  baseUrl: "https://umami.test/api",
};

function json(body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("fetchUmamiActive", () => {
  it("logs in and reads the active visitor count", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/auth/login")) return json({ token: "token" });
      if (url.endsWith("/websites/site-id/active")) return json({ visitors: 7 });
      throw new Error(`Unexpected request: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchUmamiActive(config)).resolves.toBe(7);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(String(fetchMock.mock.calls[1]?.[0])).toContain(
      "/websites/site-id/active"
    );
  });

  it("rejects an unexpected active payload", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/auth/login")) return json({ token: "token" });
      if (url.endsWith("/websites/site-id/active")) return json({ active: 7 });
      throw new Error(`Unexpected request: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchUmamiActive(config)).rejects.toThrow();
  });
});
