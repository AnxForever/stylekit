// Linear Style Component Recipes
import { createStyleRecipes } from "./factory";

export const linearStyleRecipes = createStyleRecipes("linear-style", "Linear Style", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Linear-style gradient button with restrained hover opacity",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-medium",
        "text-sm",
        "rounded-lg",
        "transition-opacity duration-150",
      ],
    },
    parameters: [
      {
        id: "size",
        label: "Size",
        labelZh: "尺寸",
        type: "select",
        options: [
          { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-1.5 text-xs" },
          { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2 text-sm" },
          { value: "lg", label: "Large", labelZh: "大", classes: "px-5 py-2.5 text-sm" },
        ],
        default: "md",
      },
      {
        id: "fullWidth",
        label: "Full Width",
        labelZh: "全宽",
        type: "boolean",
        default: false,
        trueClasses: "w-full",
      },
    ],
    variants: {
      primary: {
        id: "primary",
        label: "Primary",
        labelZh: "主要",
        classes: [
          "bg-gradient-to-r from-[#5e6ad2] to-[#8b5cf6]",
          "text-white",
        ],
      },
      secondary: {
        id: "secondary",
        label: "Secondary",
        labelZh: "次要",
        classes: [
          "bg-white/[0.03]",
          "text-white",
          "border border-white/10",
        ],
      },
      ghost: {
        id: "ghost",
        label: "Ghost",
        labelZh: "幽灵",
        classes: [
          "bg-transparent",
          "text-zinc-400",
        ],
      },
    },
    slots: [
      { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
      { id: "label", label: "Label", labelZh: "文字", required: true, default: "Create Issue", type: "text" },
    ],
    states: {
      hover: ["hover:opacity-90"],
      active: ["active:opacity-80"],
      disabled: ["opacity-40 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Linear-style dark card with subtle border and surface background",
    skeleton: {
      element: "div",
      baseClasses: [
        "rounded-lg",
        "border border-white/10",
        "bg-white/[0.03]",
        "transition-colors duration-150",
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
          { value: "lg", label: "Large", labelZh: "大", classes: "p-6" },
        ],
        default: "md",
      },
      {
        id: "interactive",
        label: "Interactive",
        labelZh: "可交互",
        type: "boolean",
        default: true,
        trueClasses: "cursor-pointer",
      },
    ],
    variants: {
      default: {
        id: "default",
        label: "Default",
        labelZh: "默认",
        classes: [],
      },
      elevated: {
        id: "elevated",
        label: "Elevated",
        labelZh: "浮起",
        classes: [
          "bg-white/[0.05]",
        ],
      },
    },
    slots: [
      { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
      { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here.", type: "children" },
    ],
    states: {
      hover: ["hover:bg-white/[0.06]"],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Linear-style dark input with subtle border and focus accent",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "rounded-lg",
        "border border-white/10",
        "bg-white/[0.03]",
        "text-white text-sm",
        "placeholder:text-zinc-600",
        "focus:outline-none",
        "transition-all duration-150",
      ],
    },
    parameters: [
      {
        id: "size",
        label: "Size",
        labelZh: "尺寸",
        type: "select",
        options: [
          { value: "sm", label: "Small", labelZh: "小", classes: "px-2.5 py-1.5 text-xs" },
          { value: "md", label: "Medium", labelZh: "中", classes: "px-3 py-2 text-sm" },
          { value: "lg", label: "Large", labelZh: "大", classes: "px-4 py-2.5 text-sm" },
        ],
        default: "md",
      },
    ],
    variants: {
      default: {
        id: "default",
        label: "Default",
        labelZh: "默认",
        classes: [],
      },
    },
    slots: [
      { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Enter a title...", type: "text" },
    ],
    states: {
      focus: [
        "focus:border-[#5e6ad2]/50",
        "focus:bg-white/[0.05]",
      ],
      disabled: ["opacity-40 cursor-not-allowed"],
    },
  },
});
