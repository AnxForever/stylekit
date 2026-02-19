// Islamic Geometric Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const islamicGeometricRecipes = createStyleRecipes("islamic-geometric", "Islamic Geometric", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Elegant button with gold accents and geometric border styling",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-serif",
        "font-medium",
        "tracking-wide",
        "rounded-lg",
        "border-2 border-[#c9a74e]",
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
        "bg-[#1a3a5c] text-[#f5ecd7]",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-[#f5ecd7] text-[#1a3a5c]",
      ]),
      gold: variant("gold", "Gold", "金色", [
        "bg-[#c9a74e] text-[#1a3a5c] border-[#1a3a5c]",
      ]),
    },
    slots: buttonSlots("Click"),
    states: {
      hover: ["hover:shadow-md hover:shadow-[#c9a74e]/30"],
      active: ["active:shadow-sm"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Elegant card with gold border accents and warm parchment background",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#f5ecd7]",
        "rounded-lg",
        "border-2 border-[#c9a74e]",
        "shadow-sm",
        "font-serif",
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
      ornate: variant("ornate", "Ornate", "华丽", [
        "border-4 border-double border-[#c9a74e] shadow-md shadow-[#c9a74e]/20",
      ]),
    },
    slots: cardSlots(),
    states: {
      hover: ["hover:shadow-md hover:shadow-[#c9a74e]/20"],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Elegant input with gold accent border and parchment background",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-[#f5ecd7]",
        "border-2 border-[#c9a74e]/50",
        "rounded-lg",
        "font-serif",
        "text-[#1a3a5c]",
        "placeholder:text-[#1a3a5c]/30",
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
      focus: ["focus:border-[#c9a74e] focus:ring-2 focus:ring-[#c9a74e]/20"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
