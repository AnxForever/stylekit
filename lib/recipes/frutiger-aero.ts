// Frutiger Aero Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const frutigerAeroRecipes = createStyleRecipes("frutiger-aero", "Frutiger Aero", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Glossy Aero button with gradient and blur",
    skeleton: {
      element: "button",
      baseClasses: ["font-sans", "font-medium", "rounded-2xl", "backdrop-blur-sm", "transition-all duration-200"],
    },
    parameters: [
      sizeParam({ sm: "px-4 py-1.5 text-sm", md: "px-6 py-2.5 text-base", lg: "px-8 py-3.5 text-lg" }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", ["bg-gradient-to-b from-white/90 to-white/60 text-sky-700 shadow-md"]),
      sky: variant("sky", "Sky", "天空", ["bg-gradient-to-b from-sky-400 to-sky-500 text-white shadow-md"]),
    },
    slots: buttonSlots("Click"),
    states: {
      hover: ["hover:shadow-lg hover:brightness-105"],
      active: ["active:scale-[0.98]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Frosted glass card with sky gradient backdrop",
    skeleton: {
      element: "div",
      baseClasses: ["bg-white/30", "backdrop-blur-xl", "border border-white/40", "rounded-2xl", "shadow-lg", "overflow-hidden"],
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
    slots: cardSlots("Aero Card", "Glossy and fresh"),
    states: { hover: ["hover:shadow-xl"] },
  },
  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Frosted glass input with soft focus",
    skeleton: {
      element: "input",
      baseClasses: ["w-full", "bg-white/50", "backdrop-blur-md", "border border-white/40", "text-sky-900", "placeholder:text-sky-600/50", "focus:outline-none", "rounded-xl", "transition-all duration-200"],
    },
    parameters: [sizeParam({ sm: "px-3 py-2 text-sm", md: "px-4 py-2.5 text-base", lg: "px-5 py-3 text-lg" })],
    variants: { default: variant("default", "Default", "默认", []) },
    slots: inputSlots("Search..."),
    states: {
      focus: ["focus:border-sky-300 focus:bg-white/70"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
