import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("service worker request policy", () => {
  it("never intercepts pages, Next.js assets, or third-party requests", async () => {
    const source = await readFile(new URL("../../public/sw.js", import.meta.url), "utf8");

    expect(source).not.toContain('addEventListener("fetch"');
    expect(source).not.toContain("cache.put");
    expect(source).not.toContain("fetch(request)");
  });

  it("clears every legacy StyleKit cache during activation", async () => {
    const source = await readFile(new URL("../../public/sw.js", import.meta.url), "utf8");

    expect(source).toContain('key.startsWith("stylekit-")');
    expect(source).toContain("caches.delete(key)");
    expect(source).toContain("self.clients.claim()");
  });
});
