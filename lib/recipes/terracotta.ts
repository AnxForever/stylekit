// Terracotta Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const terracottaRecipes = createStyleRecipes("terracotta", "Terracotta", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Warm earthy button with rounded corners and soft shadows",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-sans",
        "font-medium",
        "rounded-xl",
        "shadow-md",
        "transition-all duration-200",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-base",
        lg: "px-7 py-3.5 text-lg",
      }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#b5654a] text-white",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-[#faf5ef] text-[#b5654a] border border-[#b5654a]",
      ]),
      accent: variant("accent", "Accent", "强调", [
        "bg-[#d4a373] text-white",
      ]),
    },
    slots: buttonSlots("Click"),
    states: {
      hover: ["hover:shadow-lg hover:brightness-105"],
      active: ["active:shadow-sm active:brightness-95"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Warm card with rounded corners and soft earthy shadow",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#faf5ef]",
        "rounded-2xl",
        "shadow-md",
        "border border-[#d4a373]/30",
        "transition-shadow duration-200",
      ],
    },
    parameters: [
      {
        id: "padding",
        label: "Padding",
        labelZh: "内边距",
        type: "select",
        options: [
          { value: "sm", label: "Small", labelZh: "小", classes: "p-3" },
          { value: "md", label: "Medium", labelZh: "中", classes: "p-5" },
          { value: "lg", label: "Large", labelZh: "大", classes: "p-8" },
        ],
        default: "md",
      },
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
      bordered: variant("bordered", "Bordered", "边框", [
        "border-2 border-[#b5654a]/40",
      ]),
    },
    slots: cardSlots(),
    states: {
      hover: ["hover:shadow-lg"],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Warm earthy input with rounded corners and subtle border",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-[#faf5ef]",
        "border border-[#d4a373]/50",
        "rounded-xl",
        "text-[#5a3425]",
        "placeholder:text-[#b5654a]/40",
        "focus:outline-none",
        "transition-all duration-200",
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
    },
    slots: inputSlots(),
    states: {
      focus: ["focus:border-[#b5654a] focus:ring-2 focus:ring-[#b5654a]/20"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
