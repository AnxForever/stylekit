import { describe, it, expect } from "vitest";
import {
  sizeParam,
  fullWidthParam,
  paddingParam,
  interactiveParam,
  visibleParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  childrenSlot,
  labelSlot,
  iconSlot,
  defaultVariant,
  variant,
  createStyleRecipes,
} from "../factory";

describe("recipe factory", () => {
  describe("createStyleRecipes", () => {
    it("creates a StyleRecipes object with slug, name, and recipes", () => {
      const result = createStyleRecipes("test-style", "Test Style", {
        button: {
          id: "button",
          name: "Button",
          nameZh: "按钮",
          description: "Test button",
          skeleton: { element: "button", baseClasses: ["px-4"] },
          parameters: [sizeParam({ sm: "text-sm", md: "text-base", lg: "text-lg" })],
          variants: { primary: variant("primary", "Primary", "主要", ["bg-black"]) },
          slots: buttonSlots(),
          states: {},
        },
      });

      expect(result.styleSlug).toBe("test-style");
      expect(result.styleName).toBe("Test Style");
      expect(result.recipes.button).toBeDefined();
      expect(result.recipes.button.id).toBe("button");
    });
  });

  describe("sizeParam", () => {
    it("creates a select parameter with sm/md/lg options", () => {
      const param = sizeParam({ sm: "px-2", md: "px-4", lg: "px-6" });
      expect(param.id).toBe("size");
      expect(param.type).toBe("select");
      expect(param.default).toBe("md");
      expect(param.options).toHaveLength(3);
      expect(param.options![0].classes).toBe("px-2");
      expect(param.options![1].classes).toBe("px-4");
      expect(param.options![2].classes).toBe("px-6");
    });
  });

  describe("paddingParam", () => {
    it("creates a select parameter with sm/md/lg padding options", () => {
      const param = paddingParam({ sm: "p-2", md: "p-4", lg: "p-8" });
      expect(param.id).toBe("padding");
      expect(param.type).toBe("select");
      expect(param.options).toHaveLength(3);
    });
  });

  describe("fullWidthParam", () => {
    it("is a boolean parameter with trueClasses w-full", () => {
      expect(fullWidthParam.id).toBe("fullWidth");
      expect(fullWidthParam.type).toBe("boolean");
      expect(fullWidthParam.default).toBe(false);
      expect(fullWidthParam.trueClasses).toBe("w-full");
    });
  });

  describe("interactiveParam", () => {
    it("creates a boolean parameter with custom trueClasses", () => {
      const param = interactiveParam("hover:-translate-y-1 cursor-pointer");
      expect(param.id).toBe("interactive");
      expect(param.type).toBe("boolean");
      expect(param.default).toBe(true);
      expect(param.trueClasses).toBe("hover:-translate-y-1 cursor-pointer");
    });

    it("accepts custom default value", () => {
      const param = interactiveParam("cursor-pointer", false);
      expect(param.default).toBe(false);
    });
  });

  describe("visibleParam", () => {
    it("is a boolean parameter with opacity classes", () => {
      expect(visibleParam.id).toBe("visible");
      expect(visibleParam.trueClasses).toBe("opacity-100");
      expect(visibleParam.falseClasses).toBe("opacity-0");
    });
  });

  describe("slot presets", () => {
    it("buttonSlots returns icon + label slots", () => {
      const slots = buttonSlots("GO");
      expect(slots).toHaveLength(2);
      expect(slots[0].id).toBe("icon");
      expect(slots[1].id).toBe("label");
      expect(slots[1].required).toBe(true);
      expect(slots[1].default).toBe("GO");
    });

    it("cardSlots returns title + children slots", () => {
      const slots = cardSlots("My Title", "My Content");
      expect(slots).toHaveLength(2);
      expect(slots[0].id).toBe("title");
      expect(slots[0].default).toBe("My Title");
      expect(slots[1].id).toBe("children");
      expect(slots[1].required).toBe(true);
      expect(slots[1].default).toBe("My Content");
    });

    it("inputSlots returns placeholder slot", () => {
      const slots = inputSlots("Enter...");
      expect(slots).toHaveLength(1);
      expect(slots[0].id).toBe("placeholder");
      expect(slots[0].default).toBe("Enter...");
    });

    it("childrenSlot returns single children slot", () => {
      const slots = childrenSlot();
      expect(slots).toHaveLength(1);
      expect(slots[0].id).toBe("children");
      expect(slots[0].required).toBe(true);
    });

    it("childrenSlot accepts optional=false", () => {
      const slots = childrenSlot(false);
      expect(slots[0].required).toBe(false);
    });

    it("labelSlot returns single label slot", () => {
      const slots = labelSlot("OK");
      expect(slots).toHaveLength(1);
      expect(slots[0].id).toBe("label");
      expect(slots[0].default).toBe("OK");
    });

    it("iconSlot returns single icon slot", () => {
      const slots = iconSlot();
      expect(slots).toHaveLength(1);
      expect(slots[0].id).toBe("icon");
      expect(slots[0].type).toBe("icon");
    });
  });

  describe("variant helpers", () => {
    it("defaultVariant has id=default and empty classes", () => {
      expect(defaultVariant.id).toBe("default");
      expect(defaultVariant.classes).toEqual([]);
    });

    it("variant() creates a RecipeVariant", () => {
      const v = variant("blood", "Blood", "血色", ["bg-red-900"]);
      expect(v.id).toBe("blood");
      expect(v.label).toBe("Blood");
      expect(v.labelZh).toBe("血色");
      expect(v.classes).toEqual(["bg-red-900"]);
    });
  });
});
