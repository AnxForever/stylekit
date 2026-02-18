// Marble Luxury Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const marbleLuxuryRecipes = createStyleRecipes("marble-luxury", "Marble Luxury", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Elegant button with gold accents, thin borders, and premium serif typography",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-serif",
        "font-medium",
        "tracking-wide",
        "rounded-sm",
        "border",
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
        "bg-[#1a1a1a] text-[#f8f6f3]",
        "border-[#c9a96e]",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-transparent text-[#1a1a1a]",
        "border-[#c9a96e]",
      ]),
      gold: variant("gold", "Gold", "金色", [
        "bg-[#c9a96e] text-[#1a1a1a]",
        "border-[#c9a96e]",
      ]),
    },
    slots: buttonSlots("Explore"),
    states: {
      hover: [
        "hover:bg-[#c9a96e] hover:text-[#1a1a1a]",
        "hover:shadow-md",
      ],
      active: ["active:scale-[0.98]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Premium card with warm marble background, thin gold border, and refined spacing",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#f8f6f3]",
        "border border-[#c9a96e]/30",
        "rounded-sm",
        "text-[#1a1a1a]",
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
      elevated: variant("elevated", "Elevated", "浮起", [
        "shadow-lg",
        "border-[#c9a96e]/50",
      ]),
    },
    slots: cardSlots(),
    states: {
      hover: [
        "hover:shadow-lg",
        "hover:border-[#c9a96e]/60",
      ],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Refined input with thin gold underline, serif font, and warm marble background",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-[#f8f6f3]",
        "border border-[#c9a96e]/30",
        "rounded-sm",
        "font-serif",
        "text-[#1a1a1a]",
        "placeholder:text-[#1a1a1a]/40",
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
      underline: variant("underline", "Underline", "下划线", [
        "border-0 border-b border-[#c9a96e]/50",
        "rounded-none",
        "bg-transparent",
      ]),
    },
    slots: inputSlots("Enter text..."),
    states: {
      focus: [
        "focus:border-[#c9a96e]",
        "focus:shadow-[0_1px_0_#c9a96e]",
      ],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
