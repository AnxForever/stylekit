// Generative Art Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const generativeArtRecipes = createStyleRecipes("generative-art", "Generative Art", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Algorithmic button with violet accent",
    skeleton: {
      element: "button",
      baseClasses: ["font-mono", "tracking-wide", "rounded-md", "transition-all duration-200"],
    },
    parameters: [
      sizeParam({ sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5 text-base", lg: "px-7 py-3.5 text-lg" }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", ["bg-violet-600 text-white"]),
      ghost: variant("ghost", "Ghost", "幽灵", ["bg-transparent text-violet-400 border border-violet-500/40"]),
    },
    slots: buttonSlots("Generate"),
    states: {
      hover: ["hover:bg-violet-500"],
      active: ["active:scale-[0.98]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Dark canvas card for algorithmic output",
    skeleton: {
      element: "div",
      baseClasses: ["bg-neutral-900", "border border-neutral-800", "rounded-lg", "overflow-hidden"],
    },
    parameters: [{
      id: "padding", label: "Padding", labelZh: "内边距", type: "select",
      options: [
        { value: "sm", label: "Small", labelZh: "小", classes: "p-3" },
        { value: "md", label: "Medium", labelZh: "中", classes: "p-5" },
        { value: "lg", label: "Large", labelZh: "大", classes: "p-7" },
      ],
      default: "md",
    }],
    variants: { default: variant("default", "Default", "默认", []) },
    slots: cardSlots("Generative", "Algorithmic patterns"),
    states: { hover: ["hover:border-violet-500/30"] },
  },
  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Dark monospace input for parameters",
    skeleton: {
      element: "input",
      baseClasses: ["w-full", "bg-[#0a0a0a]", "border border-neutral-800", "text-white", "placeholder:text-neutral-500", "focus:outline-none", "font-mono", "rounded-md", "transition-all duration-200"],
    },
    parameters: [sizeParam({ sm: "px-3 py-2 text-sm", md: "px-4 py-2.5 text-base", lg: "px-5 py-3 text-lg" })],
    variants: { default: variant("default", "Default", "默认", []) },
    slots: inputSlots("seed: 42"),
    states: {
      focus: ["focus:border-violet-500"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
