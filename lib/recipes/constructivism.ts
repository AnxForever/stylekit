// Constructivism Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const constructivismRecipes = createStyleRecipes("constructivism", "Constructivism", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Bold angular button with propaganda poster aesthetic",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-sans",
        "font-black",
        "uppercase",
        "tracking-widest",
        "rounded-none",
        "skew-x-[-2deg]",
        "border-3 border-[#1a1a1a]",
        "transition-all duration-150",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-8 py-4 text-base",
      }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#cc0000] text-[#f2e8d5]",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-[#1a1a1a] text-[#f2e8d5]",
      ]),
      outline: variant("outline", "Outline", "轮廓", [
        "bg-[#f2e8d5] text-[#cc0000]",
      ]),
    },
    slots: buttonSlots("ACT"),
    states: {
      hover: ["hover:skew-x-0 hover:scale-105"],
      active: ["active:scale-95"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Angular card with bold red/black constructivist framing",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#f2e8d5]",
        "border-4 border-[#1a1a1a]",
        "rounded-none",
        "relative",
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
      redBar: variant("redBar", "Red Bar", "红色条", [
        "border-t-8 border-t-[#cc0000]",
      ]),
    },
    slots: cardSlots(),
    states: {},
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Angular input with bold constructivist border styling",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-[#f2e8d5]",
        "border-3 border-[#1a1a1a]",
        "rounded-none",
        "font-sans",
        "font-bold",
        "text-[#1a1a1a]",
        "placeholder:text-[#1a1a1a]/30",
        "focus:outline-none",
        "transition-all duration-150",
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
    },
    slots: inputSlots(),
    states: {
      focus: ["focus:border-[#cc0000]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
