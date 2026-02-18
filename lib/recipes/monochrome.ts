// Monochrome Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const monochromeRecipes = createStyleRecipes("monochrome", "Monochrome", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Pure black-and-white button with sharp edges",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-sans",
        "font-medium",
        "tracking-wide",
        "rounded-none",
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
        "bg-[#111111] text-[#fafafa] border border-[#111111]",
      ]),
      outline: variant("outline", "Outline", "轮廓", [
        "bg-transparent text-[#111111] border border-[#111111]",
      ]),
    },
    slots: buttonSlots("Click"),
    states: {
      hover: ["hover:bg-[#333333]"],
      active: ["active:scale-[0.98]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Minimal card with clean borders and no rounded corners",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#fafafa]",
        "border border-[#e5e5e5]",
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
    slots: cardSlots("Monochrome", "Pure black and white"),
    states: {
      hover: ["hover:shadow-sm"],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Sharp-edged input with clean border",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-[#fafafa]",
        "border border-[#e5e5e5]",
        "text-[#111111]",
        "placeholder:text-[#666666]/50",
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
      focus: ["focus:border-[#111111]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
