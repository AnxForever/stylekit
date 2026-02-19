// Indian Festive Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const indianFestiveRecipes = createStyleRecipes("indian-festive", "Indian Festive", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Vibrant festive button with decorative borders and warm celebratory colors",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-semibold",
        "rounded-lg",
        "border-2",
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
        "bg-[#e63946] text-white",
        "border-[#ff9f1c]",
        "shadow-md shadow-[#e63946]/30",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-[#fff8e7] text-[#e63946]",
        "border-[#e63946]/40",
      ]),
      accent: variant("accent", "Accent", "强调", [
        "bg-[#7b2d8e] text-white",
        "border-[#ff9f1c]",
        "shadow-md shadow-[#7b2d8e]/30",
      ]),
    },
    slots: buttonSlots("Click"),
    states: {
      hover: [
        "hover:shadow-lg hover:shadow-[#e63946]/40",
        "hover:scale-105",
        "hover:brightness-110",
      ],
      active: ["active:scale-95"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Festive card with warm background, decorative gold-toned borders, and celebratory energy",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#fff8e7]",
        "rounded-xl",
        "border-2 border-[#ff9f1c]/50",
        "shadow-md",
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
      royal: variant("royal", "Royal", "皇家", [
        "border-[#7b2d8e]/60",
        "bg-gradient-to-br from-[#fff8e7] to-[#7b2d8e]/10",
      ]),
      marigold: variant("marigold", "Marigold", "万寿菊", [
        "border-[#ff9f1c]",
        "bg-gradient-to-br from-[#fff8e7] to-[#ff9f1c]/15",
      ]),
    },
    slots: cardSlots(),
    states: {
      hover: [
        "hover:shadow-lg",
        "hover:border-[#ff9f1c]",
      ],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Festive input with warm borders and vibrant accent focus states",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "rounded-lg",
        "border-2 border-[#ff9f1c]/30",
        "bg-[#fff8e7]",
        "text-[#e63946]",
        "placeholder:text-[#e63946]/40",
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
      royal: variant("royal", "Royal", "皇家", [
        "border-[#7b2d8e]/40",
        "placeholder:text-[#7b2d8e]/40",
      ]),
    },
    slots: inputSlots(),
    states: {
      focus: [
        "focus:border-[#e63946]/60",
        "focus:shadow-[0_0_12px_rgba(230,57,70,0.25)]",
      ],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
