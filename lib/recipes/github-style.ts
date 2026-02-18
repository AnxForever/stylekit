// GitHub Style Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const githubStyleRecipes = createStyleRecipes("github-style", "GitHub Style", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Clean professional button with subtle borders, system fonts, and GitHub-like styling",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-medium",
        "leading-5",
        "rounded-md",
        "border",
        "transition-all duration-150",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-3 py-1 text-xs",
        md: "px-4 py-1.5 text-sm",
        lg: "px-5 py-2 text-base",
      }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#1f883d] text-white",
        "border-[#1f883d]",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-[#f6f8fa] text-[#24292f]",
        "border-[#d0d7de]",
      ]),
      danger: variant("danger", "Danger", "危险", [
        "bg-[#cf222e] text-white",
        "border-[#cf222e]",
      ]),
      outline: variant("outline", "Outline", "轮廓", [
        "bg-transparent text-[#0969da]",
        "border-[#d0d7de]",
      ]),
    },
    slots: buttonSlots("Submit"),
    states: {
      hover: [
        "hover:brightness-95",
        "hover:shadow-[0_1px_0_rgba(27,31,36,0.04)]",
      ],
      active: ["active:shadow-inner"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Clean card with subtle border, white background, and minimal shadow like GitHub panels",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-white",
        "border border-[#d0d7de]",
        "rounded-md",
        "text-[#24292f]",
        "transition-all duration-150",
      ],
    },
    parameters: [
      {
        id: "padding",
        label: "Padding",
        labelZh: "内边距",
        type: "select" as const,
        options: [
          { value: "sm", label: "Small", labelZh: "小", classes: "p-3" },
          { value: "md", label: "Medium", labelZh: "中", classes: "p-4" },
          { value: "lg", label: "Large", labelZh: "大", classes: "p-6" },
        ],
        default: "md",
      },
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
      muted: variant("muted", "Muted", "柔和", [
        "bg-[#f6f8fa]",
      ]),
    },
    slots: cardSlots(),
    states: {
      hover: [
        "hover:border-[#0969da]/40",
      ],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Clean input with subtle border, white background, and blue focus ring like GitHub forms",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-[#f6f8fa]",
        "border border-[#d0d7de]",
        "rounded-md",
        "text-[#24292f]",
        "text-sm",
        "placeholder:text-[#6e7781]",
        "focus:outline-none",
        "transition-all duration-150",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      }),
      fullWidthParam,
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
      contrast: variant("contrast", "Contrast", "高对比", [
        "bg-white",
        "border-[#24292f]/20",
      ]),
    },
    slots: inputSlots("Search or jump to..."),
    states: {
      focus: [
        "focus:bg-white",
        "focus:border-[#0969da]",
        "focus:shadow-[0_0_0_3px_rgba(9,105,218,0.3)]",
      ],
      disabled: ["opacity-50 cursor-not-allowed bg-[#f6f8fa]"],
    },
  },
});
