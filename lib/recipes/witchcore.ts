// Witchcore Component Recipes
// Dark mystical aesthetic with gold accents, purple tones, and gothic elegance
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const witchcoreRecipes = createStyleRecipes("witchcore", "Witchcore", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Mystical button with gold accents and deep purple tones",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-serif",
        "font-semibold",
        "tracking-wide",
        "rounded-sm",
        "border",
        "transition-all duration-300",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5",
        lg: "px-7 py-3.5 text-lg",
      }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#4a1942] text-[#c9a74e]",
        "border-[#c9a74e]/50",
        "shadow-[0_0_12px_rgba(201,167,78,0.3)]",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-[#0d0b14] text-[#7b68ae]",
        "border-[#7b68ae]/40",
        "shadow-[0_0_10px_rgba(123,104,174,0.2)]",
      ]),
      outline: variant("outline", "Outline", "轮廓", [
        "bg-transparent text-[#c9a74e]",
        "border-[#c9a74e]/60",
      ]),
    },
    slots: buttonSlots("Enchant"),
    states: {
      hover: [
        "hover:shadow-[0_0_24px_rgba(201,167,78,0.5)]",
        "hover:scale-105",
        "hover:border-[#c9a74e]",
      ],
      active: ["active:scale-[0.97]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Dark gothic card with mystical border glow and elegant serif typography",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#0d0b14]",
        "border border-[#4a1942]/60",
        "rounded-sm",
        "font-serif",
        "text-[#c9a74e]/90",
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
          { value: "sm", label: "Small", labelZh: "小", classes: "p-3" },
          { value: "md", label: "Medium", labelZh: "中", classes: "p-5" },
          { value: "lg", label: "Large", labelZh: "大", classes: "p-8" },
        ],
        default: "md",
      },
    ],
    variants: {
      default: variant("default", "Default", "默认", [
        "shadow-[0_0_15px_rgba(74,25,66,0.4)]",
      ]),
      golden: variant("golden", "Golden", "金色", [
        "border-[#c9a74e]/40",
        "shadow-[0_0_15px_rgba(201,167,78,0.2)]",
      ]),
    },
    slots: cardSlots(),
    states: {
      hover: [
        "hover:shadow-[0_0_25px_rgba(74,25,66,0.6)]",
        "hover:border-[#4a1942]",
      ],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Dark mystical input with gold focus glow and serif font",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-[#0d0b14]",
        "border border-[#4a1942]/50",
        "rounded-sm",
        "font-serif",
        "text-[#c9a74e]/90",
        "placeholder:text-[#7b68ae]/40",
        "focus:outline-none",
        "transition-all duration-300",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2.5",
        lg: "px-5 py-3.5 text-lg",
      }),
      fullWidthParam,
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
      golden: variant("golden", "Golden", "金色", [
        "border-[#c9a74e]/30",
        "text-[#c9a74e]",
        "placeholder:text-[#c9a74e]/30",
      ]),
    },
    slots: inputSlots(),
    states: {
      focus: [
        "focus:border-[#c9a74e]/70",
        "focus:shadow-[0_0_12px_rgba(201,167,78,0.3)]",
      ],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
