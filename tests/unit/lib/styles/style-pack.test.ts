import { getStylePack, getStylePacks, STYLE_PACK_SCHEMA_VERSION } from "@/lib/styles";

describe("StylePack", () => {
  it("projects canonical glassmorphism data into a machine-readable pack", () => {
    const pack = getStylePack("glassmorphism");

    expect(pack).toMatchObject({
      schemaVersion: STYLE_PACK_SCHEMA_VERSION,
      slug: "glassmorphism",
      recipes: { available: true },
    });
    expect(pack?.components.button.hasCode).toBe(true);
    expect(pack?.tokens).not.toBeNull();
    expect(pack?.readiness).toMatchObject({ styleSlug: "glassmorphism" });
  });

  it("omits unknown styles and preserves requested order", () => {
    expect(getStylePack("not-a-style")).toBeNull();
    expect(getStylePacks(["editorial", "not-a-style", "glassmorphism"]).map((pack) => pack.slug)).toEqual([
      "editorial",
      "glassmorphism",
    ]);
  });
});
