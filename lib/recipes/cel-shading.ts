// Cel Shading Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const celShadingRecipes = createStyleRecipes("cel-shading", "Cel Shading", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Cartoon-style button with bold outlines, bright fills and comic book energy",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-bold",
        "rounded-xl",
        "border-3 border-[#1a1a2e]",
        "transition-all duration-150",
      ],
    },
    parameters: [
      sizeParam({ sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-base", lg: "px-8 py-4 text-lg" }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#e63946] text-white",
        "shadow-[3px_3px_0px_0px_#1a1a2e]",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-[#4ea8de] text-white",
        "shadow-[3px_3px_0px_0px_#1a1a2e]",
      ]),
      outline: variant("outline", "Outline", "轮廓", [
        "bg-[#fafaf5] text-[#1a1a2e]",
        "shadow-[3px_3px_0px_0px_#1a1a2e]",
      ]),
    },
    slots: buttonSlots("Action!"),
    states: {
      hover: [
        "hover:shadow-[5px_5px_0px_0px_#1a1a2e]",
        "hover:translate-x-[-2px] hover:translate-y-[-2px]",
      ],
      active: ["active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#1a1a2e]"],
      disabled: ["opacity-50 cursor-not-allowed grayscale"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Cartoon panel card with thick outlines, flat colors and cel-shaded depth",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#fafaf5]",
        "border-3 border-[#1a1a2e]",
        "rounded-xl",
        "overflow-hidden",
        "transition-all duration-150",
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
        "shadow-[4px_4px_0px_0px_#1a1a2e]",
      ]),
      red: variant("red", "Red", "红色", [
        "bg-[#e63946]/10",
        "shadow-[4px_4px_0px_0px_#e63946]",
      ]),
      blue: variant("blue", "Blue", "蓝色", [
        "bg-[#4ea8de]/10",
        "shadow-[4px_4px_0px_0px_#4ea8de]",
      ]),
    },
    slots: cardSlots("Episode Title", "The story continues here..."),
    states: {
      hover: [
        "hover:shadow-[6px_6px_0px_0px_#1a1a2e]",
        "hover:translate-x-[-2px] hover:translate-y-[-2px]",
      ],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Cartoon-outlined input with bold border, bright focus and cel-shaded style",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-[#fafaf5]",
        "border-3 border-[#1a1a2e]",
        "rounded-xl",
        "text-[#1a1a2e]",
        "font-medium",
        "placeholder:text-[#1a1a2e]/40",
        "focus:outline-none",
        "transition-all duration-150",
      ],
    },
    parameters: [
      sizeParam({ sm: "px-3 py-2 text-sm", md: "px-4 py-2.5 text-base", lg: "px-5 py-3.5 text-lg" }),
    ],
    variants: {
      default: variant("default", "Default", "默认", [
        "shadow-[2px_2px_0px_0px_#1a1a2e]",
      ]),
      red: variant("red", "Red", "红色", [
        "border-[#e63946]",
        "shadow-[2px_2px_0px_0px_#e63946]",
      ]),
    },
    slots: inputSlots("Type something..."),
    states: {
      focus: [
        "focus:shadow-[3px_3px_0px_0px_#4ea8de]",
        "focus:border-[#4ea8de]",
      ],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
