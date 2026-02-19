// Film Noir Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const filmNoirRecipes = createStyleRecipes("film-noir", "Film Noir", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Dramatic high-contrast button with serif accents",
    skeleton: {
      element: "button",
      baseClasses: ["font-serif", "tracking-wide", "rounded-none", "transition-all duration-200"],
    },
    parameters: [
      sizeParam({ sm: "px-4 py-1.5 text-sm", md: "px-6 py-2.5 text-base", lg: "px-8 py-3.5 text-lg" }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", ["bg-neutral-100 text-neutral-950"]),
      danger: variant("danger", "Danger", "警告", ["bg-[#c41e3a] text-white"]),
    },
    slots: buttonSlots("Enter"),
    states: {
      hover: ["hover:bg-neutral-200"],
      active: ["active:scale-[0.98]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Dark dramatic card with stark contrast",
    skeleton: {
      element: "div",
      baseClasses: ["bg-neutral-900", "border border-neutral-700", "rounded-none", "overflow-hidden"],
    },
    parameters: [{
      id: "padding", label: "Padding", labelZh: "内边距", type: "select",
      options: [
        { value: "sm", label: "Small", labelZh: "小", classes: "p-4" },
        { value: "md", label: "Medium", labelZh: "中", classes: "p-6" },
        { value: "lg", label: "Large", labelZh: "大", classes: "p-8" },
      ],
      default: "md",
    }],
    variants: { default: variant("default", "Default", "默认", []) },
    slots: cardSlots("Film Noir", "Shadows and intrigue"),
    states: { hover: ["hover:border-neutral-500"] },
  },
  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Dark input with high-contrast focus state",
    skeleton: {
      element: "input",
      baseClasses: ["w-full", "bg-[#0a0a0a]", "border border-neutral-700", "text-neutral-100", "placeholder:text-neutral-500", "focus:outline-none", "font-serif", "rounded-none", "transition-all duration-200"],
    },
    parameters: [sizeParam({ sm: "px-3 py-2 text-sm", md: "px-4 py-2.5 text-base", lg: "px-5 py-3 text-lg" })],
    variants: { default: variant("default", "Default", "默认", []) },
    slots: inputSlots("Search..."),
    states: {
      focus: ["focus:border-neutral-400"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
