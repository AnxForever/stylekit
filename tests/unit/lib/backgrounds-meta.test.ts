import { describe, expect, it } from "vitest";
import { backgrounds } from "@/lib/backgrounds";
import { backgroundsMeta } from "@/lib/backgrounds/meta";

describe("background metadata index", () => {
  it("stays in lockstep with the full background registry", () => {
    expect(backgroundsMeta.map((background) => background.id)).toEqual(
      backgrounds.map((background) => background.id),
    );

    for (const background of backgrounds) {
      const meta = backgroundsMeta.find((candidate) => candidate.id === background.id);
      expect(meta).toMatchObject({
        id: background.id,
        name: background.name,
        nameZh: background.nameZh,
        category: background.category,
      });
    }
  });

  it("does not pull copy-ready SVG payloads into the metadata index", () => {
    const serialized = JSON.stringify(backgroundsMeta);
    expect(serialized).not.toContain("data:image/svg+xml");
    expect(serialized.length).toBeLessThan(10_000);
  });
});
