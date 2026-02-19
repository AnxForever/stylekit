// Victorian Botanical Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const victorianBotanicalRecipes = createStyleRecipes("victorian-botanical", "Victorian Botanical", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Vintage botanical button with ornate borders, serif font, and earthy green tones",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-serif",
        "font-medium",
        "tracking-wide",
        "rounded-sm",
        "border-2",
        "transition-all duration-300",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-4 py-1.5 text-sm",
        md: "px-6 py-2.5 text-base",
        lg: "px-8 py-3.5 text-lg",
      }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#2d4a2d] text-[#faf5ef]",
        "border-[#2d4a2d]",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-transparent text-[#2d4a2d]",
        "border-[#2d4a2d]",
      ]),
      gold: variant("gold", "Gold", "金色", [
        "bg-[#8b6914] text-[#faf5ef]",
        "border-[#8b6914]",
      ]),
    },
    slots: buttonSlots("Discover"),
    states: {
      hover: [
        "hover:bg-[#8b6914] hover:text-[#faf5ef]",
        "hover:border-[#8b6914]",
      ],
      active: ["active:scale-[0.98]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Vintage card with parchment background, ornate double borders, and botanical styling",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#faf5ef]",
        "border-2 border-[#2d4a2d]/40",
        "rounded-sm",
        "text-[#2d4a2d]",
        "font-serif",
        "transition-all duration-300",
      ],
    },
    parameters: [
      {
        id: "padding",
        label: "Padding",
        labelZh: "内边距",
        type: "select" as const,
        options: [
          { value: "sm", label: "Small", labelZh: "小", classes: "p-4" },
          { value: "md", label: "Medium", labelZh: "中", classes: "p-6" },
          { value: "lg", label: "Large", labelZh: "大", classes: "p-10" },
        ],
        default: "md",
      },
    ],
    variants: {
      default: variant("default", "Default", "默认", [
        "shadow-sm",
      ]),
      ornate: variant("ornate", "Ornate", "华丽", [
        "border-double border-4 border-[#8b6914]/50",
        "shadow-md",
      ]),
    },
    slots: cardSlots(),
    states: {
      hover: [
        "hover:shadow-md",
        "hover:border-[#8b6914]/60",
      ],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Parchment-style input with botanical green border and vintage serif placeholder",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-[#faf5ef]",
        "border-2 border-[#2d4a2d]/30",
        "rounded-sm",
        "font-serif",
        "text-[#2d4a2d]",
        "placeholder:text-[#2d4a2d]/40 placeholder:italic",
        "focus:outline-none",
        "transition-all duration-300",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2.5 text-base",
        lg: "px-5 py-3.5 text-lg",
      }),
      fullWidthParam,
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
      ornate: variant("ornate", "Ornate", "华丽", [
        "border-double border-4 border-[#8b6914]/40",
      ]),
    },
    slots: inputSlots("Enter your text..."),
    states: {
      focus: [
        "focus:border-[#8b6914]",
        "focus:shadow-[0_0_0_1px_#8b6914]",
      ],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
