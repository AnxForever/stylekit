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

  it("skips entity-encoded data URIs in style attributes without fetching", async () => {
    const fetchMock = vi.fn(async () => {
      throw new Error("no fetch expected");
    });
    vi.stubGlobal("fetch", fetchMock);

    // Real-world sample: mixed encoding with entity quotes and raw
    // parentheses inside the data URI (an SVG filter's url(#n) reference).
    const svgValue =
      "url(&quot;data:image/svg+xml,%3Csvg xmlns=&#x27;http://www.w3.org/2000/svg&#x27;%3E%3Cfilter id=&#x27;n&#x27;%3E%3C/filter%3E%3Crect filter=&#x27;url(%23n)&#x27;/%3E%3C/svg%3E&quot;)";
    const archive = await buildStandaloneShowcaseZip(
      `<html><body><div style="background-image:${svgValue};opacity:0.5">x</div></body></html>`,
      { origin },
    );
    const zip = await JSZip.loadAsync(archive);
    const html = await zip.file("index.html")?.async("string");

    expect(fetchMock).not.toHaveBeenCalled();
    expect(html).toContain("data:image/svg+xml");
    expect(html).toContain("opacity:0.5");
  });

  it("decodes entity-encoded ampersands before fetching media URLs", async () => {
    const requested: string[] = [];
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      requested.push(String(input));
      return new Response(new Uint8Array([1, 2, 3]), {
        headers: { "content-type": "image/jpeg" },
      });
    });
    vi.stubGlobal("fetch", fetchMock);

    await buildStandaloneShowcaseZip(
      '<html><body><img src="https://images.unsplash.com/photo-1?w=320&amp;q=80"></body></html>',
      { origin },
    );

    expect(requested).toContain("https://images.unsplash.com/photo-1?w=320&q=80");
  });

  it("prunes font-face slices whose unicode-range the page never uses", async () => {
    const requested: string[] = [];
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      requested.push(url);
      if (url.endsWith("/fonts.css")) {
        return new Response(
          [
            "@font-face{font-family:A;src:url(/latin.woff2);unicode-range:U+0000-00FF}",
            "@font-face{font-family:A;src:url(/cjk.woff2);unicode-range:U+4E00-9FFF}",
            "@font-face{font-family:A;src:url(/wild.woff2);unicode-range:U+FB??}",
            "@font-face{font-family:B;src:url(/norange.woff2)}",
            ".hero{font-family:A,B}",
          ].join(""),
          { headers: { "content-type": "text/css" } },
        );
      }
      return new Response(new Uint8Array([1, 2, 3]), {
        headers: { "content-type": "font/woff2" },
      });
    });
    vi.stubGlobal("fetch", fetchMock);

    const archive = await buildStandaloneShowcaseZip(
      '<html><head><link rel="stylesheet" href="/fonts.css"></head><body><p class="hero">Hello</p></body></html>',
      { origin },
    );
    const zip = await JSZip.loadAsync(archive);
    const html = await zip.file("index.html")?.async("string");

    expect(requested.some((url) => url.endsWith("/latin.woff2"))).toBe(true);
    expect(requested.some((url) => url.endsWith("/norange.woff2"))).toBe(true);
    expect(requested.some((url) => url.endsWith("/cjk.woff2"))).toBe(false);
    expect(requested.some((url) => url.endsWith("/wild.woff2"))).toBe(false);
    expect(html).not.toContain("U+4E00-9FFF");
  });

  it("keeps CJK font-face slices when the page contains matching glyphs", async () => {
    const requested: string[] = [];
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      requested.push(url);
      if (url.endsWith("/fonts.css")) {
        return new Response(
          "@font-face{font-family:A;src:url(/cjk.woff2);unicode-range:U+4E00-9FFF}",
          { headers: { "content-type": "text/css" } },
        );
      }
      return new Response(new Uint8Array([1, 2, 3]), {
        headers: { "content-type": "font/woff2" },
      });
    });
    vi.stubGlobal("fetch", fetchMock);

    await buildStandaloneShowcaseZip(
      '<html><head><link rel="stylesheet" href="/fonts.css"></head><body><p>风格</p></body></html>',
      { origin },
    );

    expect(requested.some((url) => url.endsWith("/cjk.woff2"))).toBe(true);
  });

  it("downloads same-origin resources via the internal base URL", async () => {
    const requested: string[] = [];
    const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      requested.push(url);
      if (url.endsWith("/style.css")) {
        return new Response(".hero { color: #fff; }", {
          headers: { "content-type": "text/css" },
        });
      }
      if (url.endsWith("/texture.png")) {
        return new Response(new Uint8Array([1, 2, 3]), {
          headers: { "content-type": "image/png" },
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
      `<html><head><link rel="stylesheet" href="/style.css"></head>
      <body><img src="${origin}/texture.png"><img src="https://picsum.photos/320/200"></body></html>`,
      { origin, internalBaseUrl: "http://127.0.0.1:13000" },
    );
    const zip = await JSZip.loadAsync(archive);
    const html = await zip.file("index.html")?.async("string");

    expect(html).toContain("data:image/png;base64,AQID");
    expect(requested).toContain("http://127.0.0.1:13000/style.css");
    expect(requested).toContain("http://127.0.0.1:13000/texture.png");
    expect(requested).toContain("https://picsum.photos/320/200");
    expect(requested.every((url) => !url.startsWith(origin))).toBe(true);
  });
});
