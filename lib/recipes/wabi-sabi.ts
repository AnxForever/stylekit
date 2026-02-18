// Wabi Sabi Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const wabiSabiRecipes = createStyleRecipes("wabi-sabi", "Wabi Sabi", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Imperfect, organic button with muted earth tones and subtle asymmetry",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-serif",
        "font-normal",
        "tracking-wide",
        "rounded-[12px_8px_14px_6px]",
        "transition-all duration-300",
      ],
    },
    parameters: [
      sizeParam({ sm: "px-4 py-2 text-sm", md: "px-6 py-2.5 text-base", lg: "px-8 py-3.5 text-lg" }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#8a9a7b] text-white",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-[#f7f3ec] text-[#3a3a3a] border border-[#d6cfc5]",
      ]),
      earth: variant("earth", "Earth", "大地", [
        "bg-[#b8a99a] text-white",
      ]),
    },
    slots: buttonSlots("Accept"),
    states: {
      hover: [
        "hover:opacity-85",
        "hover:shadow-sm",
      ],
      active: ["active:scale-[0.98]"],
      disabled: ["opacity-30 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Organic card with imperfect edges, warm parchment tone and handmade feel",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#f7f3ec]",
        "border border-[#e0d8cf]",
        "rounded-[16px_12px_18px_10px]",
        "overflow-hidden",
        "transition-all duration-300",
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
          { value: "lg", label: "Large", labelZh: "大", classes: "p-10" },
        ],
        default: "md",
      },
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
      aged: variant("aged", "Aged", "陈旧", [
        "bg-[#efe8dd]",
        "border-[#d1c7b8]",
      ]),
      moss: variant("moss", "Moss", "苔藓", [
        "bg-[#8a9a7b]/5",
        "border-[#8a9a7b]/20",
      ]),
    },
    slots: cardSlots("Quiet Moment", "Beauty in imperfection"),
    states: {
      hover: [
        "hover:shadow-sm",
      ],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Subtle input with organic feel, muted tones and imperfect warmth",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-[#f7f3ec]",
        "border border-[#d6cfc5]",
        "rounded-[10px_8px_12px_6px]",
        "font-serif",
        "text-[#3a3a3a]",
        "placeholder:text-[#b0a696]",
        "focus:outline-none",
        "transition-all duration-300",
      ],
    },
    parameters: [
      sizeParam({ sm: "px-3 py-2 text-sm", md: "px-4 py-2.5 text-base", lg: "px-5 py-3.5 text-lg" }),
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
      earth: variant("earth", "Earth", "大地", [
        "bg-[#efe8dd]",
        "border-[#c9bfb0]",
      ]),
    },
    slots: inputSlots("Write gently..."),
    states: {
      focus: [
        "focus:border-[#8a9a7b]",
        "focus:ring-1 focus:ring-[#8a9a7b]/15",
      ],
      disabled: ["opacity-30 cursor-not-allowed"],
    },
  },
});
