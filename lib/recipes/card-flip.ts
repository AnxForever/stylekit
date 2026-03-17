import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const cardFlipRecipes = createStyleRecipes("card-flip", "Card Flip", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Luxurious gold button with shimmer hover effect",
    skeleton: {
      element: "button",
      baseClasses: ["font-sans", "font-medium", "tracking-wide", "border", "rounded-xl", "transition-all duration-300"],
    },
    parameters: [
      sizeParam({ sm: "px-4 py-2 text-xs", md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-base" }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", ["bg-[#d4a574] text-[#0a0e27] border-[#d4a574]", "shadow-[0_4px_16px_rgba(212,165,116,0.2)]"]),
      secondary: variant("secondary", "Secondary", "次要", ["bg-transparent text-[#d4a574] border-[#d4a574]/40"]),
    },
    slots: buttonSlots("Confirm"),
    states: {
      hover: ["hover:shadow-[0_8px_32px_rgba(212,165,116,0.3)]"],
      active: ["active:scale-[0.97]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Dark card with gold border and 3D flip potential",
    skeleton: {
      element: "div",
      baseClasses: ["bg-[#1a1f3a]", "border border-[#d4a574]/30", "rounded-xl", "overflow-hidden"],
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
    slots: cardSlots("Card Flip", "3D interactive card with flip animation"),
    states: { hover: ["hover:border-[#d4a574]/60 hover:shadow-[0_8px_32px_rgba(212,165,116,0.15)]"] },
  },
  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Dark input with gold focus border",
    skeleton: {
      element: "input",
      baseClasses: ["w-full", "bg-[#0a0e27]", "border border-[#d4a574]/30", "text-white", "placeholder:text-white/30", "focus:outline-none", "font-sans", "rounded-xl", "transition-all duration-300"],
    },
    parameters: [sizeParam({ sm: "px-3 py-2 text-xs", md: "px-4 py-3 text-sm", lg: "px-5 py-4 text-base" })],
    variants: { default: variant("default", "Default", "默认", []) },
    slots: inputSlots("Enter card number..."),
    states: {
      focus: ["focus:border-[#d4a574] focus:shadow-[0_0_0_3px_rgba(212,165,116,0.2)]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
