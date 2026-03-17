// Retro Radio Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const retroRadioRecipes = createStyleRecipes("retro-radio", "Retro Radio", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Vintage brass button with warm glow",
    skeleton: {
      element: "button",
      baseClasses: ["font-serif", "tracking-wide", "border-2", "rounded-lg", "transition-all duration-300"],
    },
    parameters: [
      sizeParam({ sm: "px-4 py-1.5 text-xs", md: "px-6 py-2.5 text-sm", lg: "px-8 py-3 text-base" }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", ["bg-[#d4a017] text-[#3d2b1f] border-[#d4a017]", "shadow-[0_2px_12px_rgba(212,160,23,0.4)]"]),
      secondary: variant("secondary", "Secondary", "次要", ["bg-[#3d2b1f] text-[#f5e6d3] border-[#d4a017]/40"]),
    },
    slots: buttonSlots("TUNE IN"),
    states: {
      hover: ["hover:shadow-[0_4px_20px_rgba(212,160,23,0.5)]"],
      active: ["active:scale-[0.97]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Wood-textured panel with brass trim",
    skeleton: {
      element: "div",
      baseClasses: ["bg-[#3d2b1f]", "border-2 border-[#d4a017]/30", "rounded-lg", "overflow-hidden"],
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
    slots: cardSlots("RADIO", "Warm analog sound"),
    states: { hover: ["hover:border-[#d4a017]/60"] },
  },
  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Vintage dial-inspired input with brass focus ring",
    skeleton: {
      element: "input",
      baseClasses: ["w-full", "bg-[#2a1f15]", "border-2 border-[#d4a017]/30", "text-[#f5e6d3]", "placeholder:text-[#f5e6d3]/40", "focus:outline-none", "font-sans", "rounded-lg", "transition-all duration-300"],
    },
    parameters: [sizeParam({ sm: "px-3 py-1.5 text-xs", md: "px-4 py-2.5 text-sm", lg: "px-5 py-3 text-base" })],
    variants: { default: variant("default", "Default", "默认", []) },
    slots: inputSlots("Search frequencies..."),
    states: {
      focus: ["focus:border-[#d4a017] focus:shadow-[0_0_12px_rgba(212,160,23,0.3)]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
