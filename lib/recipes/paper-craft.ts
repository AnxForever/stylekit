// Paper Craft Component Recipes
// Paper texture feel with soft shadows, warm tones, and rounded edges
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const paperCraftRecipes = createStyleRecipes("paper-craft", "Paper Craft", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Warm paper-textured button with soft shadows and rounded corners",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-sans",
        "font-semibold",
        "rounded-xl",
        "border-2 border-dashed",
        "transition-all duration-200",
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
        "bg-[#e85d75] text-white",
        "border-[#d14a62]",
        "shadow-[3px_3px_0_rgba(0,0,0,0.1)]",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-[#fdf6ee] text-[#e85d75]",
        "border-[#e85d75]/40",
        "shadow-[3px_3px_0_rgba(0,0,0,0.08)]",
      ]),
      teal: variant("teal", "Teal", "青绿", [
        "bg-[#5cb8a5] text-white",
        "border-[#4aa593]",
        "shadow-[3px_3px_0_rgba(0,0,0,0.1)]",
      ]),
    },
    slots: buttonSlots("Press"),
    states: {
      hover: [
        "hover:shadow-[4px_4px_0_rgba(0,0,0,0.15)]",
        "hover:-translate-y-0.5",
      ],
      active: [
        "active:shadow-[1px_1px_0_rgba(0,0,0,0.1)]",
        "active:translate-y-0.5",
      ],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Paper-like card with warm background, dashed border, and soft shadow",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#fdf6ee]",
        "border-2 border-dashed border-[#e85d75]/30",
        "rounded-xl",
        "text-[#4a3728]",
        "transition-all duration-200",
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
        "shadow-[4px_4px_0_rgba(0,0,0,0.08)]",
      ]),
      yellow: variant("yellow", "Yellow", "黄色", [
        "border-[#f5c040]/50",
        "shadow-[4px_4px_0_rgba(245,192,64,0.15)]",
      ]),
    },
    slots: cardSlots(),
    states: {
      hover: [
        "hover:shadow-[6px_6px_0_rgba(0,0,0,0.12)]",
        "hover:-translate-y-0.5",
      ],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Paper-textured input with warm tones and dashed border",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-white/80",
        "border-2 border-dashed border-[#e85d75]/30",
        "rounded-xl",
        "text-[#4a3728]",
        "placeholder:text-[#5cb8a5]/50",
        "focus:outline-none",
        "transition-all duration-200",
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
    },
    slots: inputSlots(),
    states: {
      focus: [
        "focus:border-[#5cb8a5]/60",
        "focus:shadow-[3px_3px_0_rgba(92,184,165,0.15)]",
      ],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
