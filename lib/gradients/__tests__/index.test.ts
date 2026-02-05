import { getGradientCategories } from "@/lib/gradients";

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

