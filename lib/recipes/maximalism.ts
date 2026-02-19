// Maximalism Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const maximalismRecipes = createStyleRecipes("maximalism", "Maximalism", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Over-the-top bold button with gradients, big shadows, and explosive color combinations",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-extrabold",
        "uppercase",
        "tracking-widest",
        "rounded-xl",
        "border-3",
        "transition-all duration-300 ease-in-out",
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
        "bg-gradient-to-r from-[#d4145a] to-[#8338ec]",
        "text-white",
        "border-[#ffbe0b]",
        "shadow-xl shadow-[#d4145a]/40",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-gradient-to-r from-[#3a86ff] to-[#8338ec]",
        "text-white",
        "border-[#ffbe0b]",
        "shadow-xl shadow-[#3a86ff]/40",
      ]),
      neon: variant("neon", "Neon", "霓虹", [
        "bg-[#1a0a2e] text-[#ffbe0b]",
        "border-[#ffbe0b]",
        "shadow-xl shadow-[#ffbe0b]/30",
      ]),
    },
    slots: buttonSlots("Click"),
    states: {
      hover: [
        "hover:shadow-2xl",
        "hover:scale-110",
        "hover:brightness-125",
        "hover:-rotate-1",
      ],
      active: ["active:scale-95 active:rotate-0"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Maximalist card with bold gradients, heavy borders, and dramatic shadow effects",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#1a0a2e]",
        "rounded-2xl",
        "border-4 border-[#ffbe0b]",
        "shadow-2xl shadow-[#d4145a]/30",
        "transition-all duration-300 ease-in-out",
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
      gradient: variant("gradient", "Gradient", "渐变", [
        "bg-gradient-to-br from-[#1a0a2e] via-[#d4145a]/20 to-[#3a86ff]/20",
        "border-[#8338ec]",
      ]),
      gold: variant("gold", "Gold", "金色", [
        "border-[#ffbe0b]",
        "bg-gradient-to-br from-[#1a0a2e] to-[#ffbe0b]/15",
      ]),
    },
    slots: cardSlots(),
    states: {
      hover: [
        "hover:shadow-[0_0_40px_rgba(212,20,90,0.4)]",
        "hover:border-[#d4145a]",
        "hover:-translate-y-1",
      ],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Bold maximalist input with thick borders, neon focus glow, and dramatic styling",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "rounded-xl",
        "border-3 border-[#ffbe0b]/40",
        "bg-[#1a0a2e]",
        "text-[#ffbe0b]",
        "placeholder:text-[#8338ec]/50",
        "font-bold",
        "tracking-wider",
        "focus:outline-none",
        "transition-all duration-300 ease-in-out",
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
      neon: variant("neon", "Neon", "霓虹", [
        "border-[#3a86ff]/50",
        "text-[#3a86ff]",
        "placeholder:text-[#3a86ff]/30",
      ]),
    },
    slots: inputSlots(),
    states: {
      focus: [
        "focus:border-[#ffbe0b]",
        "focus:shadow-[0_0_20px_rgba(255,190,11,0.35)]",
      ],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
