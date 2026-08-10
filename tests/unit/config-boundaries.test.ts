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

    expect(source).toContain('source: "/sw.js"');
    expect(source).toContain(
      'value: "no-cache, no-store, must-revalidate"',
    );
    expect(source).not.toContain(
      'source: "/(.*)\\\\.(js|css|woff2?|ttf|ico|svg)"',
    );
    expect(source).toContain(
      'source: "/(.*)\\\\.(png|jpg|jpeg|gif|webp|avif|svg|ico)"',
    );
  });

  it("excludes every workspace package build from linting", async () => {
    const source = await read("eslint.config.mjs");

    expect(source).toContain('"packages/**/dist/**"');
    expect(source).not.toContain('"packages/core/dist/**"');
  });
});
