import { describe, expect, it } from "vitest";
import { getShowcaseTypographyProfile } from "@/lib/typography/showcase-profiles";

describe("showcase typography profiles", () => {
  it("assigns visibly different font directions to unlike styles", () => {
    const fashion = getShowcaseTypographyProfile(
      "/styles/luxury-retail/showcase"
    );
    const cyber = getShowcaseTypographyProfile(
      "/styles/cyberpunk-neon/showcase"
    );
    const playful = getShowcaseTypographyProfile(
      "/styles/ghibli-style/showcase"
    );

    expect(fashion?.id).toBe("catalog");
    expect(fashion?.pairing.heading.family).toBe("Gloock");
    expect(cyber?.id).toBe("signal");
    expect(cyber?.pairing.heading.family).toBe("Unbounded");
    expect(playful?.id).toBe("playful");
    expect(playful?.pairing.heading.family).toBe("Dela Gothic One");
  });

  it("does not load a showcase font profile on ordinary public pages", () => {
    expect(getShowcaseTypographyProfile("/styles")).toBeNull();
    expect(getShowcaseTypographyProfile("/styles/editorial")).toBeNull();
    expect(getShowcaseTypographyProfile("/typography")).toBeNull();
  });

  it("recognizes localized showcase paths", () => {
    expect(
      getShowcaseTypographyProfile("/zh/styles/neo-brutalist/showcase")
    ).toBeNull();
  });

  it("leaves the original neo-brutalist typography untouched", () => {
    const profile = getShowcaseTypographyProfile(
      "/styles/neo-brutalist/showcase"
    );

    expect(profile).toBeNull();
  });
});
