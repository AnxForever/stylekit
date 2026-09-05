import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = path.resolve(__dirname, "../..");

async function read(relativePath: string) {
  return readFile(path.join(ROOT, relativePath), "utf8");
}

describe("configuration boundaries", () => {
  it("revalidates the service worker without making fixed public assets immutable", async () => {
    const source = await read("next.config.ts");
    const nginxSource = await read("ops/nginx/stylekit-performance-locations.conf");

    expect(source).toContain('source: "/sw.js"');
    expect(source).toContain(
      'value: "no-cache, no-store, must-revalidate"',
    );
    expect(source).not.toContain(
      'source: "/(.*)\\\\.(js|css|woff2?|ttf|ico|svg)"',
    );
    // Hashed build assets are safe to cache in Next. Public media gets a
    // narrow app-origin fallback, while the Nginx include remains preferred:
    // its `try_files` can distinguish a real file from a missing asset.
    expect(source).toContain('source: "/_next/static/:path*"');
    expect(source).toContain('source: "/_next/image"');
    expect(source).toContain(
      "/:assetRoot(styles|templates|images|brand|readme|video|launch|experiments|submission)/:assetPath*\\\\.:assetExt(",
    );
    expect(source).toContain(
      '"public, max-age=86400, s-maxage=2592000, stale-while-revalidate=604800"',
    );
    expect(source).toContain('{ key: "Timing-Allow-Origin", value: "*" }');
    expect(source).not.toContain('source: "/(.*)\\\\.(png|jpg|jpeg|gif|webp|avif|svg|ico)"');
    expect(nginxSource).toContain("location ^~ /_next/static/");
    expect(nginxSource).toContain("try_files $uri =404;");
    expect(nginxSource).toContain(
      "^/(?:styles|templates|images|brand|readme|video|launch|experiments|submission)/",
    );
    expect(nginxSource).toContain("gzip_proxied any;");
    expect(nginxSource).toContain('add_header Timing-Allow-Origin "*";');
  });

  it("warms an external asset origin without affecting same-origin builds", async () => {
    const source = await read("app/layout.tsx");

    expect(source).toContain("process.env.NEXT_PUBLIC_ASSET_PREFIX");
    expect(source).toContain('rel="dns-prefetch"');
    expect(source).toContain('rel="preconnect"');
    expect(source).toContain('crossOrigin="anonymous"');
  });

  it("excludes every workspace package build from linting", async () => {
    const source = await read("eslint.config.mjs");

    expect(source).toContain('"packages/**/dist/**"');
    expect(source).not.toContain('"packages/core/dist/**"');
  });
});
