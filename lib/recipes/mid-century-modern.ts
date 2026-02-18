// Mid-Century Modern Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const midCenturyModernRecipes = createStyleRecipes("mid-century-modern", "Mid-Century Modern", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Clean geometric button with retro mid-century feel and subtle shadow",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-sans",
        "font-semibold",
        "tracking-wide",
        "uppercase",
        "rounded-sm",
        "shadow-sm",
        "transition-all duration-200",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-7 py-3.5 text-base",
      }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#e8572a] text-white",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-[#f5f0e1] text-[#e8572a] border-2 border-[#e8572a]",
      ]),
      teal: variant("teal", "Teal", "青色", [
        "bg-[#2a6e5e] text-white",
      ]),
    },
    slots: buttonSlots("Click"),
    states: {
      hover: ["hover:shadow-md hover:translate-y-[-1px]"],
      active: ["active:shadow-none active:translate-y-0"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Clean card with geometric accent and retro cream background",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#f5f0e1]",
        "rounded-sm",
        "shadow-sm",
        "border-l-4 border-l-[#e8572a]",
        "transition-shadow duration-200",
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
      tealAccent: variant("tealAccent", "Teal Accent", "青色强调", [
        "border-l-[#2a6e5e]",
      ]),
    },
    slots: cardSlots(),
    states: {
      hover: ["hover:shadow-md"],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Clean geometric input with retro mid-century styling",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-[#f5f0e1]",
        "border-b-2 border-b-[#2a6e5e]",
        "border-t-0 border-l-0 border-r-0",
        "rounded-none",
        "text-[#1a1a1a]",
        "placeholder:text-[#2a6e5e]/40",
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
      fullWidthParam,
    ],
    variants: {
      default: variant("default", "Default", "默认", []),
    },
    slots: inputSlots(),
    states: {
      focus: ["focus:border-b-[#e8572a]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
