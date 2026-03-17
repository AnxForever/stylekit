// macOS Vibrancy Component Recipes
import { createStyleRecipes } from "./factory";

export const macosVibrancyRecipes = createStyleRecipes("macos-vibrancy", "macOS Vibrancy", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Restrained dark button with subtle hover",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-medium",
        "rounded-lg",
        "transition-colors duration-200",
        "text-sm",
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
          { value: "lg", label: "Large", labelZh: "大", classes: "px-6 py-2.5 text-sm" },
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
        classes: ["bg-[#3a3a3c] text-white/90 hover:bg-[#48484a]"],
      },
      accent: {
        id: "accent",
        label: "Accent",
        labelZh: "强调",
        classes: ["bg-[#0a84ff] text-white hover:bg-[#0a84ff]/85"],
      },
      outline: {
        id: "outline",
        label: "Outline",
        labelZh: "描边",
        classes: ["bg-transparent text-white/70 border border-white/12 hover:bg-white/5 hover:text-white/90"],
      },
    },
    slots: [
      { id: "label", label: "Label", labelZh: "文字", type: "text", default: "Save Changes", required: true },
    ],
    states: {
      hover: ["hover:bg-[#48484a]"],
      active: ["active:opacity-80"],
      disabled: ["opacity-40 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Dark panel with 1px border",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#2c2c2e]",
        "border border-white/8",
        "rounded-xl",
        "transition-colors duration-200",
      ],
    },
    parameters: [
      {
        id: "padding",
        label: "Padding",
        labelZh: "内边距",
        type: "select",
        options: [
          { value: "sm", label: "Small", labelZh: "小", classes: "p-4" },
          { value: "md", label: "Medium", labelZh: "中", classes: "p-6" },
          { value: "lg", label: "Large", labelZh: "大", classes: "p-8" },
        ],
        default: "md",
      },
    ],
    variants: {
      default: {
        id: "default",
        label: "Default",
        labelZh: "默认",
        classes: ["hover:border-white/12"],
      },
      surface: {
        id: "surface",
        label: "Surface",
        labelZh: "表面",
        classes: ["bg-[#3a3a3c] hover:border-white/15"],
      },
    },
    slots: [
      { id: "title", label: "Title", labelZh: "标题", type: "text", default: "Panel Title", required: false },
      { id: "children", label: "Content", labelZh: "内容", type: "children", default: "Content on dark surface.", required: true },
    ],
    states: {
      hover: ["hover:border-white/12"],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Dark inset input with subtle focus",
    skeleton: {
      element: "input",
      baseClasses: [
        "bg-[#1c1c1e]",
        "border border-white/10",
        "rounded-lg",
        "text-white/90 placeholder-white/30",
        "text-sm",
        "transition-colors duration-200",
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
          { value: "md", label: "Medium", labelZh: "中", classes: "px-3 py-2 text-sm" },
          { value: "lg", label: "Large", labelZh: "大", classes: "px-4 py-2.5 text-sm" },
        ],
        default: "md",
      },
      {
        id: "fullWidth",
        label: "Full Width",
        labelZh: "全宽",
        type: "boolean",
        default: true,
        trueClasses: "w-full",
      },
    ],
    variants: {
      default: {
        id: "default",
        label: "Default",
        labelZh: "默认",
        classes: ["focus:outline-none focus:border-white/25"],
      },
    },
    slots: [
      { id: "placeholder", label: "Placeholder", labelZh: "占位符", type: "text", default: "Search...", required: false },
    ],
    states: {
      focus: ["focus:outline-none focus:border-white/25"],
      disabled: ["opacity-40 cursor-not-allowed"],
    },
  },
});
