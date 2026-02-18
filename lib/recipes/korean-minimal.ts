// Korean Minimal Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const koreanMinimalRecipes = createStyleRecipes("korean-minimal", "Korean Minimal", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Clean minimal button with soft tones, subtle borders, and generous spacing",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-light",
        "tracking-wide",
        "rounded-full",
        "border",
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
        "bg-[#3d4a5c] text-[#faf9f7]",
        "border-[#3d4a5c]",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-transparent text-[#3d4a5c]",
        "border-[#3d4a5c]/20",
      ]),
      soft: variant("soft", "Soft", "柔和", [
        "bg-[#d4a5a5]/20 text-[#3d4a5c]",
        "border-[#d4a5a5]/30",
      ]),
    },
    slots: buttonSlots("Click"),
    states: {
      hover: [
        "hover:shadow-sm",
        "hover:opacity-80",
      ],
      active: ["active:scale-[0.98]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Clean minimal card with generous whitespace, soft background, and light borders",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#faf9f7]",
        "rounded-2xl",
        "border border-[#3d4a5c]/10",
        "shadow-sm",
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
      blush: variant("blush", "Blush", "腮红", [
        "border-[#d4a5a5]/20",
        "bg-gradient-to-br from-[#faf9f7] to-[#d4a5a5]/5",
      ]),
    },
    slots: cardSlots(),
    states: {
      hover: [
        "hover:shadow-md",
        "hover:border-[#3d4a5c]/20",
      ],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Subtle minimal input with thin borders and soft placeholder text",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "rounded-xl",
        "border border-[#3d4a5c]/15",
        "bg-[#faf9f7]",
        "text-[#3d4a5c]",
        "placeholder:text-[#3d4a5c]/30",
        "font-light",
        "tracking-wide",
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
      blush: variant("blush", "Blush", "腮红", [
        "border-[#d4a5a5]/25",
        "placeholder:text-[#d4a5a5]/40",
      ]),
    },
    slots: inputSlots(),
    states: {
      focus: [
        "focus:border-[#3d4a5c]/30",
        "focus:shadow-[0_0_8px_rgba(61,74,92,0.08)]",
      ],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
