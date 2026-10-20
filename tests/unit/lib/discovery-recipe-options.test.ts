import { describe, expect, it } from "vitest";
import {
  getComponentRecipe,
  renderRecipeDefinition,
  RecipeRenderInputError,
  type RecipeRenderInputErrorCode,
} from "@/lib/discovery";
import type { ComponentRecipe } from "@/lib/recipes";

function expectRecipeInputError(run: () => unknown, code: RecipeRenderInputErrorCode): void {
  let thrown: unknown;
  try {
    run();
  } catch (error) {
    thrown = error;
  }
  expect(thrown).toBeInstanceOf(RecipeRenderInputError);
  expect(thrown).toMatchObject({ name: "RecipeRenderInputError", code });
}

describe("component recipe render options", () => {
  it("preserves the default result and renders selected variants, params, and slots", () => {
    const defaultResult = getComponentRecipe("broadcast-glitch", "button");
    expect(getComponentRecipe("broadcast-glitch", "button", {})).toEqual(defaultResult);

    const custom = getComponentRecipe("broadcast-glitch", "button", {
      variant: "cyan",
      params: { size: "lg", fullWidth: true },
      slots: { label: "Transmit", icon: "Radio" },
    });

    expect(custom?.className).toContain("bg-[#00E5D8]");
    expect(custom?.className).toContain("px-9 py-4 text-base");
    expect(custom?.className).toContain("w-full");
    expect(custom?.code).toContain("Transmit");
    expect(custom?.code).toContain("<Radio");
  });

  it("reports unknown variants, parameters, slots, and invalid values explicitly", () => {
    expectRecipeInputError(
      () => getComponentRecipe("broadcast-glitch", "button", { variant: "ultraviolet" }),
      "unknown_variant",
    );
    expectRecipeInputError(
      () => getComponentRecipe("broadcast-glitch", "button", { params: { width: "full" } }),
      "unknown_parameter",
    );
    expectRecipeInputError(
      () => getComponentRecipe("broadcast-glitch", "button", { params: { size: "xl" } }),
      "invalid_parameter",
    );
    expectRecipeInputError(
      () => getComponentRecipe("broadcast-glitch", "button", { params: { fullWidth: "true" as unknown as boolean } }),
      "invalid_parameter",
    );
    expectRecipeInputError(
      () => getComponentRecipe("broadcast-glitch", "button", { slots: { title: "Hello" } }),
      "unknown_slot",
    );
    expectRecipeInputError(
      () => getComponentRecipe("broadcast-glitch", "button", { slots: { label: 12 as unknown as string } }),
      "invalid_slot_value",
    );
    expectRecipeInputError(
      () => getComponentRecipe("broadcast-glitch", "button", { slots: { icon: "<Icon />" } }),
      "invalid_slot_value",
    );
    expect(() => getComponentRecipe("broadcast-glitch", "button", { slots: { icon: "<Icon />" } }))
      .toThrow(/JSX component\/member name/);
    expectRecipeInputError(
      () => getComponentRecipe("broadcast-glitch", "button", { params: null as unknown as Record<string, string> }),
      "invalid_options",
    );

    expect(getComponentRecipe("broadcast-glitch", "button", { slots: { icon: "Icons.ArrowRight" } })?.code)
      .toContain("<Icons.ArrowRight className");
    expect(getComponentRecipe("broadcast-glitch", "button", { slots: { icon: "" } })?.code)
      .not.toContain("className=\"w-4 h-4\"");
  });

  it("preserves recipe values whose IDs are named __proto__", () => {
    const recipe: ComponentRecipe = {
      id: "prototype-key-test",
      name: "Prototype key test",
      nameZh: "原型键测试",
      description: "",
      skeleton: { element: "button", baseClasses: ["inline-flex"] },
      parameters: [{
        id: "__proto__",
        label: "Size",
        labelZh: "尺寸",
        type: "select",
        options: [
          { value: "sm", label: "Small", labelZh: "小", classes: "px-2" },
          { value: "lg", label: "Large", labelZh: "大", classes: "px-8" },
        ],
        default: "sm",
      }],
      variants: { default: { id: "default", label: "Default", labelZh: "默认", classes: [] } },
      slots: [{ id: "__proto__", label: "Content", labelZh: "内容", required: true, type: "children" }],
    };
    const result = renderRecipeDefinition("test", "prototype-key-test", recipe, {
      params: JSON.parse('{"__proto__":"lg"}') as Record<string, string>,
      slots: JSON.parse('{"__proto__":"Safe slot value"}') as Record<string, string>,
    });

    expect(result.className).toContain("px-8");
    expect(result.code).toContain("Safe slot value");
    expect(result.code).not.toContain("[object Object]");
  });

  it("rejects select parameters without options instead of silently ignoring their values", () => {
    const recipe: ComponentRecipe = {
      id: "malformed-select",
      name: "Malformed select",
      nameZh: "无效选择项",
      description: "",
      skeleton: { element: "button", baseClasses: ["inline-flex"] },
      parameters: [{
        id: "size",
        label: "Size",
        labelZh: "尺寸",
        type: "select",
        default: "md",
      }],
      variants: { default: { id: "default", label: "Default", labelZh: "默认", classes: [] } },
      slots: [],
    };

    expectRecipeInputError(
      () => renderRecipeDefinition("test", "malformed-select", recipe, { params: { size: "lg" } }),
      "invalid_recipe_definition",
    );

    const validOptions = [{ value: "sm", label: "Small", labelZh: "小", classes: "px-2" }];
    const mismatchedDefaultType: ComponentRecipe = {
      ...recipe,
      parameters: [{ ...recipe.parameters[0], options: validOptions, default: true }],
    };
    expectRecipeInputError(
      () => renderRecipeDefinition("test", "malformed-select", mismatchedDefaultType),
      "invalid_recipe_definition",
    );

    const defaultOutsideEnum: ComponentRecipe = {
      ...recipe,
      parameters: [{ ...recipe.parameters[0], options: validOptions, default: "xl" }],
    };
    expectRecipeInputError(
      () => renderRecipeDefinition("test", "malformed-select", defaultOutsideEnum),
      "invalid_recipe_definition",
    );
  });
});
