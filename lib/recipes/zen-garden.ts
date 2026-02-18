// Zen Garden Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const zenGardenRecipes = createStyleRecipes("zen-garden", "Zen Garden", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Peaceful button with muted green tones and subtle borders",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-sans",
        "tracking-wide",
        "rounded-sm",
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
        "bg-[#4a5548] text-[#f5f3ee] border border-[#4a5548]",
      ]),
      ghost: variant("ghost", "Ghost", "幽灵", [
        "bg-transparent text-[#4a5548] border border-[#c4bba8]",
      ]),
    },
    slots: buttonSlots("Click"),
    states: {
      hover: ["hover:bg-[#3a4438]"],
      active: ["active:scale-[0.98]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Calm card with warm stone-like borders",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#f5f3ee]",
        "border border-[#c4bba8]/40",
        "rounded-sm",
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
          { value: "sm", label: "Small", labelZh: "小", classes: "p-3" },
          { value: "md", label: "Medium", labelZh: "中", classes: "p-5" },
          { value: "lg", label: "Large", labelZh: "大", classes: "p-7" },
        ],
        default: "md",
      },
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
    },
    slots: cardSlots("Zen Garden", "A peaceful stone arrangement"),
    states: {
      hover: ["hover:shadow-md"],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Minimalist input with bottom border and natural tones",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-transparent",
        "border-b border-[#c4bba8]",
        "text-[#4a5548]",
        "placeholder:text-[#7a7062]/50",
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
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
    },
    slots: inputSlots("Enter text..."),
    states: {
      focus: ["focus:border-[#4a5548]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
