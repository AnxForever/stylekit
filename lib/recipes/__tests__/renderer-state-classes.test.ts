import { describe, expect, it } from "vitest";
import type { ComponentRecipe } from "../types";
import { renderRecipe } from "../renderer";

const recipe: ComponentRecipe = {
  id: "button",
  name: "Button",
  nameZh: "按钮",
  description: "Renderer state behavior fixture",
  skeleton: { element: "button", baseClasses: ["inline-flex"] },
  parameters: [],
  variants: {
    primary: {
      id: "primary",
      label: "Primary",
      labelZh: "主要",
      classes: ["bg-blue-600"],
    },
  },
  slots: [],
  states: {
    hover: [
      "hover:bg-blue-700 md:hover:-translate-y-1",
      "-translate-y-1 group-hover:shadow-lg peer-focus:ring-4 group-hover/card:scale-105 peer-focus/field:ring-2",
    ],
    focus: ["focus-visible:ring-2 lg:focus-visible:ring-blue-500"],
    disabled: ["disabled:cursor-not-allowed opacity-50 cursor-not-allowed"],
  },
};

const params = { variant: "primary", params: {}, slots: {} };
const interactiveParameter = {
  id: "interactive",
  label: "Interactive",
  labelZh: "可交互",
  type: "boolean" as const,
  default: false,
  trueClasses: "cursor-pointer",
};

describe("renderRecipe interaction state classes", () => {
  it("includes self-gated state utilities by default and leaves simulations opt-in", () => {
    const result = renderRecipe(recipe, params);
    const classes = result.className.split(/\s+/);

    expect(result.code).toContain("hover:bg-blue-700");
    expect(result.code).toContain("md:hover:-translate-y-1");
    expect(result.code).toContain("focus-visible:ring-2");
    expect(result.code).toContain("lg:focus-visible:ring-blue-500");
    expect(result.code).toContain("disabled:cursor-not-allowed");
    expect(classes).toContain("group-hover:shadow-lg");
    expect(classes).toContain("peer-focus:ring-4");
    expect(classes).toContain("group-hover/card:scale-105");
    expect(classes).toContain("peer-focus/field:ring-2");
    expect(classes).not.toContain("opacity-50");
    expect(classes).not.toContain("cursor-not-allowed");
    expect(classes).not.toContain("-translate-y-1");
  });

  it("keeps explicit state simulation classes and avoids duplicate utilities", () => {
    const result = renderRecipe(recipe, { ...params, state: "hover" });
    const classes = result.className.split(/\s+/);

    expect(classes).toContain("-translate-y-1");
    expect(classes).toContain("group-hover:shadow-lg");
    expect(classes).toContain("peer-focus:ring-4");
    expect(classes.filter((className) => className === "group-hover:shadow-lg")).toHaveLength(1);
    expect(classes.filter((className) => className === "peer-focus:ring-4")).toHaveLength(1);
    expect(classes.filter((className) => className === "hover:bg-blue-700")).toHaveLength(1);
    expect(classes.filter((className) => className === "md:hover:-translate-y-1")).toHaveLength(1);
  });

  it("keeps unprefixed disabled simulation classes opt-in", () => {
    const result = renderRecipe(recipe, { ...params, state: "disabled" });
    const classes = result.className.split(/\s+/);

    expect(classes).toContain("opacity-50");
    expect(classes).toContain("cursor-not-allowed");
    expect(classes.filter((className) => className === "cursor-not-allowed")).toHaveLength(1);
  });

  it("respects a false interactive toggle by default while allowing explicit hover simulation", () => {
    const nonInteractiveRecipe: ComponentRecipe = {
      ...recipe,
      parameters: [interactiveParameter],
    };

    const defaultResult = renderRecipe(nonInteractiveRecipe, params);
    expect(defaultResult.className).not.toContain("hover:bg-blue-700");
    expect(defaultResult.className).not.toContain("group-hover:shadow-lg");
    expect(defaultResult.className).toContain("focus-visible:ring-2");

    const explicitHover = renderRecipe(nonInteractiveRecipe, { ...params, state: "hover" });
    expect(explicitHover.className).toContain("hover:bg-blue-700");
    expect(explicitHover.className).toContain("-translate-y-1");
  });

  it("ignores an interactive override when the recipe does not declare that toggle", () => {
    const result = renderRecipe(recipe, { ...params, params: { interactive: false } });

    expect(result.className).toContain("hover:bg-blue-700");
  });
});
