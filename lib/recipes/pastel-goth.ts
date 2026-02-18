// Pastel Goth Component Recipes
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const pastelGothRecipes = createStyleRecipes("pastel-goth", "Pastel Goth", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Dark gothic button with pastel accents, bold contrast, and moody atmosphere",
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
        "bg-[#2d1b3d] text-[#d4a5e3]",
        "border-[#d4a5e3]/50",
        "shadow-md shadow-[#d4a5e3]/20",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-[#1a1225] text-[#7ec8c8]",
        "border-[#7ec8c8]/40",
      ]),
      pastel: variant("pastel", "Pastel", "粉彩", [
        "bg-[#d4a5e3]/20 text-[#d4a5e3]",
        "border-[#d4a5e3]/30",
      ]),
    },
    slots: buttonSlots("Click"),
    states: {
      hover: [
        "hover:shadow-lg hover:shadow-[#d4a5e3]/30",
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
    description: "Dark moody card with pastel-goth accents and ethereal shadow effects",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#1a1225]",
        "rounded-xl",
        "border border-[#d4a5e3]/20",
        "shadow-lg shadow-[#2d1b3d]/50",
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
      lavender: variant("lavender", "Lavender", "薰衣草", [
        "border-[#d4a5e3]/30",
        "bg-gradient-to-br from-[#1a1225] to-[#d4a5e3]/10",
      ]),
      teal: variant("teal", "Teal", "青色", [
        "border-[#7ec8c8]/30",
        "bg-gradient-to-br from-[#1a1225] to-[#7ec8c8]/10",
      ]),
    },
    slots: cardSlots(),
    states: {
      hover: [
        "hover:shadow-xl hover:shadow-[#d4a5e3]/20",
        "hover:border-[#d4a5e3]/40",
      ],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Dark input with pastel glow focus states and gothic styling",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "rounded-lg",
        "border border-[#d4a5e3]/20",
        "bg-[#1a1225]",
        "text-[#d4a5e3]",
        "placeholder:text-[#d4a5e3]/30",
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
      teal: variant("teal", "Teal", "青色", [
        "border-[#7ec8c8]/25",
        "text-[#7ec8c8]",
        "placeholder:text-[#7ec8c8]/30",
      ]),
    },
    slots: inputSlots(),
    states: {
      focus: [
        "focus:border-[#d4a5e3]/50",
        "focus:shadow-[0_0_12px_rgba(212,165,227,0.2)]",
      ],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
