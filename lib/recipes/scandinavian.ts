// Scandinavian Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const scandinavianRecipes = createStyleRecipes("scandinavian", "Scandinavian", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Clean, warm button with natural tones, rounded corners and hygge comfort",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-sans",
        "font-medium",
        "rounded-lg",
        "transition-all duration-200",
      ],
    },
    parameters: [
      sizeParam({ sm: "px-4 py-2 text-sm", md: "px-6 py-2.5 text-base", lg: "px-8 py-3.5 text-lg" }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#5a7a6b] text-white",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-[#f5f0eb] text-[#3d3d3d] border border-[#d4ccc4]",
      ]),
      outline: variant("outline", "Outline", "轮廓", [
        "bg-transparent text-[#5a7a6b] border border-[#5a7a6b]",
      ]),
    },
    slots: buttonSlots("Continue"),
    states: {
      hover: [
        "hover:opacity-90",
        "hover:shadow-sm",
      ],
      active: ["active:scale-[0.98]"],
      disabled: ["opacity-40 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Warm beige card with soft borders, natural tones and minimalist hygge feel",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#f5f0eb]",
        "border border-[#e0d8cf]",
        "rounded-lg",
        "overflow-hidden",
        "transition-all duration-200",
      ],
    },
    parameters: [
      {
        id: "padding",
        label: "Padding",
        labelZh: "内边距",
        type: "select",
        options: [
          { value: "sm", label: "Small", labelZh: "小", classes: "p-4" },
          { value: "md", label: "Medium", labelZh: "中", classes: "p-6" },
          { value: "lg", label: "Large", labelZh: "大", classes: "p-8" },
        ],
        default: "md",
      },
    ],
    variants: {
      default: variant("default", "Default", "默认", [
        "shadow-sm",
      ]),
      white: variant("white", "White", "白色", [
        "bg-white",
        "border-[#e8e2da]",
      ]),
      sage: variant("sage", "Sage", "鼠尾草", [
        "bg-[#5a7a6b]/5",
        "border-[#5a7a6b]/20",
      ]),
    },
    slots: cardSlots("Simple Living", "Less is more, warmth is everything"),
    states: {
      hover: [
        "hover:shadow-md",
        "hover:border-[#d4ccc4]",
      ],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Clean input with warm background, soft border and natural feel",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-white",
        "border border-[#d4ccc4]",
        "rounded-lg",
        "text-[#3d3d3d]",
        "placeholder:text-[#a09888]",
        "focus:outline-none",
        "transition-all duration-200",
      ],
    },
    parameters: [
      sizeParam({ sm: "px-3 py-2 text-sm", md: "px-4 py-2.5 text-base", lg: "px-5 py-3.5 text-lg" }),
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
      beige: variant("beige", "Beige", "米色", [
        "bg-[#f5f0eb]",
        "border-[#e0d8cf]",
      ]),
    },
    slots: inputSlots("Search..."),
    states: {
      focus: [
        "focus:border-[#5a7a6b]",
        "focus:ring-1 focus:ring-[#5a7a6b]/20",
      ],
      disabled: ["opacity-40 cursor-not-allowed bg-[#f5f0eb]"],
    },
  },
});
