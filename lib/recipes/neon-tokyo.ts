// Neon Tokyo Component Recipes
// Cyberpunk neon aesthetic with dark backgrounds, glowing text, and sharp edges
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const neonTokyoRecipes = createStyleRecipes("neon-tokyo", "Neon Tokyo", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Cyberpunk neon button with hot pink glow and sharp edges",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-mono",
        "font-bold",
        "uppercase",
        "tracking-widest",
        "rounded-none",
        "border-2",
        "transition-all duration-200",
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
        "bg-[#ff1493] text-[#0a0a1a]",
        "border-[#ff1493]",
        "shadow-[0_0_20px_rgba(255,20,147,0.5)]",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-transparent text-[#00f0ff]",
        "border-[#00f0ff]",
        "shadow-[0_0_15px_rgba(0,240,255,0.3)]",
      ]),
      orange: variant("orange", "Orange", "橙色", [
        "bg-transparent text-[#ff6b00]",
        "border-[#ff6b00]",
        "shadow-[0_0_15px_rgba(255,107,0,0.3)]",
      ]),
    },
    slots: buttonSlots("Execute"),
    states: {
      hover: [
        "hover:shadow-[0_0_35px_rgba(255,20,147,0.7)]",
        "hover:scale-105",
        "hover:tracking-[0.2em]",
      ],
      active: ["active:scale-[0.96]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Dark cyberpunk panel with neon border accents and sharp corners",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#0a0a1a]",
        "border border-[#ff1493]/30",
        "rounded-none",
        "font-mono",
        "text-[#00f0ff]/90",
        "transition-all duration-200",
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
          { value: "md", label: "Medium", labelZh: "中", classes: "p-5" },
          { value: "lg", label: "Large", labelZh: "大", classes: "p-8" },
        ],
        default: "md",
      },
    ],
    variants: {
      default: variant("default", "Default", "默认", [
        "shadow-[0_0_15px_rgba(255,20,147,0.2)]",
      ]),
      cyan: variant("cyan", "Cyan", "青色", [
        "border-[#00f0ff]/30",
        "shadow-[0_0_15px_rgba(0,240,255,0.2)]",
      ]),
    },
    slots: cardSlots(),
    states: {
      hover: [
        "hover:shadow-[0_0_30px_rgba(255,20,147,0.4)]",
        "hover:border-[#ff1493]/60",
      ],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Dark neon input with glowing cyan focus and monospace font",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-[#0a0a1a]",
        "border-2 border-[#ff1493]/30",
        "rounded-none",
        "font-mono",
        "text-[#00f0ff]",
        "placeholder:text-[#ff1493]/30",
        "focus:outline-none",
        "transition-all duration-200",
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
      orange: variant("orange", "Orange", "橙色", [
        "border-[#ff6b00]/30",
        "text-[#ff6b00]",
        "placeholder:text-[#ff6b00]/30",
      ]),
    },
    slots: inputSlots(),
    states: {
      focus: [
        "focus:border-[#00f0ff]",
        "focus:shadow-[0_0_15px_rgba(0,240,255,0.4)]",
      ],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
