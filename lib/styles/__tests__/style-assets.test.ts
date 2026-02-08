import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { stylesMeta } from "@/lib/styles/meta";
import { styleComponents } from "@/lib/style-components";

describe("style assets", () => {
  it("every stylesMeta cover exists under public/", () => {
    const missing: string[] = [];

    for (const style of stylesMeta) {
      const cover = style.cover;
      if (typeof cover !== "string" || !cover.startsWith("/")) continue;

      const coverPath = path.join(process.cwd(), "public", cover.slice(1));
      if (!existsSync(coverPath)) missing.push(cover);
    }

    expect(missing).toEqual([]);
  });

  it("every style has a coverPreview renderer (prevents UI gaps)", () => {
    const missing = stylesMeta
      .filter((style) => !styleComponents[style.slug]?.coverPreview)
      .map((style) => style.slug);

    expect(missing).toEqual([]);
  });
});

