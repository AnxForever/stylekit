// Blueprint Component Recipes
// Technical drawing aesthetic with blue background, white lines, grid feel, and monospace
import {
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const blueprintRecipes = createStyleRecipes("blueprint", "Blueprint", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Technical blueprint button with white outlines on blue background",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-mono",
        "font-medium",
        "uppercase",
        "tracking-wider",
        "rounded-none",
        "border",
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
        "bg-[#1e3a5f] text-white",
        "border-white/80",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.2)]",
      ]),
      secondary: variant("secondary", "Secondary", "次要", [
        "bg-transparent text-white",
        "border-white/40",
        "border-dashed",
      ]),
      accent: variant("accent", "Accent", "强调", [
        "bg-[#4a90d9] text-white",
        "border-[#4a90d9]",
        "shadow-[0_0_8px_rgba(74,144,217,0.3)]",
      ]),
    },
    slots: buttonSlots("Execute"),
    states: {
      hover: [
        "hover:border-white",
        "hover:shadow-[0_0_12px_rgba(255,255,255,0.2)]",
      ],
      active: ["active:scale-[0.97]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Blueprint panel with grid-like border and technical drawing aesthetic",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#1e3a5f]/90",
        "border border-white/30",
        "rounded-none",
        "font-mono",
        "text-white/90",
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
        "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]",
      ]),
      dashed: variant("dashed", "Dashed", "虚线", [
        "border-dashed border-white/40",
      ]),
    },
    slots: cardSlots(),
    states: {
      hover: [
        "hover:border-white/60",
        "hover:shadow-[0_0_15px_rgba(74,144,217,0.2)]",
      ],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Blueprint-style input with white border and monospace font on blue",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-[#1e3a5f]/60",
        "border border-white/40",
        "rounded-none",
        "font-mono",
        "text-white",
        "placeholder:text-[#4a90d9]/60",
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
    },
    slots: inputSlots(),
    states: {
      focus: [
        "focus:border-white/80",
        "focus:shadow-[0_0_10px_rgba(74,144,217,0.3)]",
      ],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
