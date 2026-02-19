// Holographic Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const holographicRecipes = createStyleRecipes("holographic", "Holographic", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Iridescent button with gradient glow",
    skeleton: {
      element: "button",
      baseClasses: ["font-sans", "font-medium", "rounded-xl", "transition-all duration-200"],
    },
    parameters: [
      sizeParam({ sm: "px-4 py-1.5 text-sm", md: "px-6 py-2.5 text-base", lg: "px-8 py-3.5 text-lg" }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", ["bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white", "shadow-[0_0_20px_rgba(168,85,247,0.3)]"]),
      ghost: variant("ghost", "Ghost", "幽灵", ["bg-transparent text-white border border-purple-500/40"]),
    },
    slots: buttonSlots("Click"),
    states: {
      hover: ["hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"],
      active: ["active:scale-[0.98]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Dark card with iridescent border glow",
    skeleton: {
      element: "div",
      baseClasses: ["bg-[#1a0b2e]", "border border-purple-500/25", "rounded-xl", "overflow-hidden"],
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
    slots: cardSlots("Holographic", "Iridescent light"),
    states: { hover: ["hover:border-purple-400/40"] },
  },
  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Dark input with holographic focus effect",
    skeleton: {
      element: "input",
      baseClasses: ["w-full", "bg-[#0a0a1f]", "border border-purple-500/30", "text-white", "placeholder:text-white/40", "focus:outline-none", "rounded-lg", "transition-all duration-200"],
    },
    parameters: [sizeParam({ sm: "px-3 py-2 text-sm", md: "px-4 py-2.5 text-base", lg: "px-5 py-3 text-lg" })],
    variants: { default: variant("default", "Default", "默认", []) },
    slots: inputSlots("Search..."),
    states: {
      focus: ["focus:border-purple-400 focus:shadow-[0_0_12px_rgba(168,85,247,0.2)]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
