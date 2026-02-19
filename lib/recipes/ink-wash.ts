// Ink Wash Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const inkWashRecipes = createStyleRecipes("ink-wash", "Ink Wash", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Calligraphic button with ink-black tones and wide tracking",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-sans",
        "font-light",
        "tracking-[0.2em]",
        "rounded-none",
        "transition-all duration-200",
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
        "bg-[#2c2c2c] text-[#f8f5f0] border border-[#2c2c2c]",
      ]),
      ghost: variant("ghost", "Ghost", "幽灵", [
        "bg-transparent text-[#2c2c2c] border-b border-[#2c2c2c]/30",
      ]),
    },
    slots: buttonSlots("Click"),
    states: {
      hover: ["hover:bg-[#1a1a1a]"],
      active: ["active:scale-[0.98]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Parchment card with ink wash border accents",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#f8f5f0]",
        "border border-[#c4b9a8]/30",
        "rounded-none",
        "overflow-hidden",
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
      default: variant("default", "Default", "默认", []),
    },
    slots: cardSlots("Ink Wash", "Fluid calligraphic strokes"),
    states: {
      hover: ["hover:shadow-sm"],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Understated input with bottom ink-stroke border",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-transparent",
        "border-b border-[#2c2c2c]/30",
        "text-[#2c2c2c]",
        "placeholder:text-[#a89279]/50",
        "focus:outline-none",
        "rounded-none",
        "transition-all duration-200",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2.5 text-base",
        lg: "px-5 py-3.5 text-lg",
      }),
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
    },
    slots: inputSlots("Type here..."),
    states: {
      focus: ["focus:border-[#2c2c2c]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
