/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it, vi } from "vitest";
import JSZip from "jszip";
import { buildShowcasePackage } from "@/lib/export/showcase-package";

describe("buildShowcasePackage", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("bundles same-origin styles and images while keeping external resources explicit", async () => {
    window.console.error = () => {};
    const mockFetch = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/style.css")) {
        return new Response(".hero{background:url('/font.woff2')}", {
          headers: { "content-type": "text/css" },
        });
      }
      return new Response(new Uint8Array([1, 2, 3]), {
        headers: { "content-type": "image/png" },
      });
    });
    vi.stubGlobal("fetch", mockFetch);
    window.fetch = mockFetch as typeof window.fetch;

    const result = await buildShowcasePackage(
      [
        "<html><head><link rel=\"stylesheet\" href=\"/style.css\"></head>",
        '<body><section class="hero">Showcase</section>',
        '<img src="/image.png"><img src="https://cdn.example.com/remote.png">',
        "<script>window.bad = true;</script></body></html>",
      ].join(""),
      "https://www.stylekit.top",
    );

    const zip = await JSZip.loadAsync(await result.blob.arrayBuffer());
    const index = await zip.file("index.html")?.async("string");
    const css = await zip.file("assets/000-style.css")?.async("string");

    expect(index).toContain('href="assets/000-style.css"');
    expect(index).toContain('src="assets/002-image.png"');
    expect(index).toContain("https://cdn.example.com/remote.png");
    expect(index).not.toContain("window.bad");
    expect(css).toContain('url("001-font.woff2")');
    expect(result.bundledAssetCount).toBe(3);
    expect(result.externalAssetCount).toBe(1);
  });
});
