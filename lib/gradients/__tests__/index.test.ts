import { gradients, getGradientCategories, toTailwindBackgroundImage } from "@/lib/gradients";

describe("gradient categories", () => {
  it("returns all expected categories with bilingual labels", () => {
    const categories = getGradientCategories();
    const categorySet = new Set(categories.map((item) => item.category));

    expect(categorySet).toEqual(
      new Set(["warm", "cool", "vibrant", "pastel", "dark", "sunset", "nature", "neon"])
    );

    for (const item of categories) {
      expect(item.count).toBeGreaterThan(0);
      expect(item.labelZh).toBeTruthy();
      expect(item.labelEn).toBeTruthy();
    }
  });

  it("keeps stable English labels for key categories", () => {
    const categories = getGradientCategories();
    const warm = categories.find((item) => item.category === "warm");
    const cool = categories.find((item) => item.category === "cool");

    expect(warm?.labelEn).toBe("Warm");
    expect(cool?.labelEn).toBe("Cool");
  });
});

describe("gradient rendering types", () => {
  it("keeps linear as the backwards-compatible default", () => {
    const classic = gradients.find((gradient) => gradient.id === "sunrise-warmth");
    expect(classic?.type).toBeUndefined();
    expect(classic?.css.startsWith("linear-gradient(")).toBe(true);
  });

  it("ships usable radial, conic and mesh presets", () => {
    for (const type of ["radial", "conic", "mesh"] as const) {
      const matches = gradients.filter((gradient) => gradient.type === type);
      expect(matches.length, `${type} presets`).toBeGreaterThan(0);
      for (const gradient of matches) {
        expect(gradient.css).toContain(`${type === "mesh" ? "radial" : type}-gradient`);
        expect(gradient.tailwind).toContain("bg-[");
      }
    }
  });
});

describe("Tailwind gradient export", () => {
  it("preserves the exact live angle and color stops for a 25 degree gradient", () => {
    expect(
      toTailwindBackgroundImage("linear-gradient(25deg, #ff0000 0%, #0000ff 100%)"),
    ).toBe("bg-[linear-gradient(25deg,_#ff0000_0%,_#0000ff_100%)]");
  });

  it("preserves the default preset angle and stops", () => {
    const preset = gradients.find((gradient) => gradient.id === "sunrise-warmth");
    expect(preset).toBeDefined();
    expect(toTailwindBackgroundImage(preset!.css)).toBe(
      "bg-[linear-gradient(135deg,_#ffffc4_0%,_#ff6164_50%,_#b00012_100%)]",
    );
  });
});
