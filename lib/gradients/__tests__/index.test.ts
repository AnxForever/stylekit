import { gradients, getGradientCategories } from "@/lib/gradients";

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
