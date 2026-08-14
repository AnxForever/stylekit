import JSZip from "jszip";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildStandaloneShowcaseZip,
  StandaloneShowcaseError,
} from "@/lib/export/standalone-showcase";

const origin = "https://www.stylekit.top";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("buildStandaloneShowcaseZip", () => {
  it("inlines local and approved external visual resources", async () => {
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith("/style.css")) {
        return new Response(
          ".hero { background-image: url('/texture.png'); } @font-face { src: url('/font.woff2'); }",
          { headers: { "content-type": "text/css" } },
        );
      }
      if (url.endsWith("/texture.png")) {
        return new Response(new Uint8Array([1, 2, 3]), {
          headers: { "content-type": "image/png" },
        });
      }
      if (url.endsWith("/font.woff2")) {
        return new Response(new Uint8Array([4, 5, 6]), {
          headers: { "content-type": "font/woff2" },
        });
      }
      if (url.includes("picsum.photos")) {
        return new Response(new Uint8Array([7, 8, 9]), {
          headers: { "content-type": "image/jpeg" },
        });
      }
      throw new Error(`Unexpected resource: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    const archive = await buildStandaloneShowcaseZip(
      `<!doctype html><html><head><link rel="stylesheet" href="/style.css"><script>alert('remove')</script></head>
      <body><div class="hero" style="background-image:url('/texture.png')"></div>
      <img src="https://picsum.photos/320/200"><div style="opacity:0;transform:translateY(16px)">Content</div></body></html>`,
      { origin },
    );
    const zip = await JSZip.loadAsync(archive);
    const html = await zip.file("index.html")?.async("string");
    const readme = await zip.file("README.md")?.async("string");

    expect(html).toBeDefined();
    expect(html).not.toContain("<script");
    expect(html).toContain("data:image/png;base64,AQID");
    expect(html).toContain("data:image/jpeg;base64,BwgJ");
    expect(html).toContain("data:font/woff2;base64,BAUG");
    expect(html).toContain("data-stylekit-showcase-download");
    expect(html).not.toContain("picsum.photos");
    expect(readme).toContain("self-contained offline export");
    expect(fetchMock).toHaveBeenCalledTimes(4);
  });

  it("rejects visual resources from unknown external hosts", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(new Uint8Array([1]), { status: 200 })),
    );

    await expect(
      buildStandaloneShowcaseZip(
        '<html><body><img src="https://untrusted.example/image.png"></body></html>',
        { origin },
      ),
    ).rejects.toThrow(StandaloneShowcaseError);
  });
});
