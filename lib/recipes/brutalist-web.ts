// Brutalist Web Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const brutalistWebRecipes = createStyleRecipes("brutalist-web", "Brutalist Web", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Raw HTML-style button with no rounded corners and monospace type",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-mono",
        "font-bold",
        "uppercase",
        "border-2 border-[#000000]",
        "rounded-none",
        "transition-none",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-2 py-1 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
      }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#000000] text-[#ffffff]",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-[#ffffff] text-[#000000]",
      ]),
      link: variant("link", "Link", "链接", [
        "bg-transparent text-[#0000ff] underline border-0",
      ]),
    },
    slots: buttonSlots("Click"),
    states: {
      hover: ["hover:bg-[#0000ff] hover:text-[#ffffff]"],
      active: ["active:invert"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Raw unstyled card with hard borders and no shadows",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#ffffff]",
        "border-2 border-[#000000]",
        "rounded-none",
        "font-mono",
      ],
    },
    parameters: [
      {
        id: "padding",
        label: "Padding",
        labelZh: "内边距",
        type: "select",
        options: [
          { value: "sm", label: "Small", labelZh: "小", classes: "p-2" },
          { value: "md", label: "Medium", labelZh: "中", classes: "p-4" },
          { value: "lg", label: "Large", labelZh: "大", classes: "p-8" },
        ],
        default: "md",
      },
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
      dashed: variant("dashed", "Dashed", "虚线", [
        "border-dashed",
      ]),
    },
    slots: cardSlots(),
    states: {},
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Raw HTML input with monospace font and hard border",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-[#ffffff]",
        "border-2 border-[#000000]",
        "rounded-none",
        "font-mono",
        "text-[#000000]",
        "placeholder:text-gray-500",
        "focus:outline-none",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-3 text-base",
      }),
      fullWidthParam,
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
    },
    slots: inputSlots(),
    states: {
      focus: ["focus:border-[#0000ff]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
