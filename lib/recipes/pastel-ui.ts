// Pastel App UI Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const pastelUiRecipes = createStyleRecipes("pastel-ui", "Pastel App UI", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Pastel App UI style button",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-medium",
        "rounded-lg",
        "border border-[#66508f]",
        "transition-all duration-200",
      ],
    },
    parameters: [
      sizeParam({ sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5 text-base", lg: "px-7 py-3.5 text-lg" }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#66508f] text-white",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-[#fff8f0] text-[#66508f]",
      ]),
      outline: variant("outline", "Outline", "轮廓", [
        "bg-transparent text-[#66508f]",
      ]),
    },
    slots: buttonSlots("Click"),
    states: {
      hover: ["hover:opacity-90"],
      active: ["active:scale-[0.97]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Pastel App UI style card",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#fff8f0]",
        "border border-[#66508f]/20",
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
          { value: "sm", label: "Small", labelZh: "小", classes: "p-3" },
          { value: "md", label: "Medium", labelZh: "中", classes: "p-5" },
          { value: "lg", label: "Large", labelZh: "大", classes: "p-8" },
        ],
        default: "md",
      },
    ],
    variants: {
      default: variant("default", "Default", "默认", [
        "shadow-md",
      ]),
      outlined: variant("outlined", "Outlined", "描边", [
        "border-[#66508f]/40",
      ]),
    },
    slots: cardSlots("Card Title", "Card content goes here."),
    states: {
      hover: ["hover:shadow-lg"],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Pastel App UI style input",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-[#fff8f0]",
        "border border-[#66508f]/30",
        "rounded-lg",
        "text-[#66508f]",
        "font-normal",
        "placeholder:text-[#66508f]/40",
        "focus:outline-none",
        "transition-all duration-200",
      ],
    },
    parameters: [
      sizeParam({ sm: "px-3 py-2 text-sm", md: "px-4 py-2.5 text-base", lg: "px-5 py-3.5 text-lg" }),
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
    },
    slots: inputSlots("Type here..."),
    states: {
      focus: ["focus:border-[#66508f]", "focus:ring-1 focus:ring-[#66508f]/30"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
