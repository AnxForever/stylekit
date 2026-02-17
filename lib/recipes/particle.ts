// Particle style component recipes
import { createStyleRecipes } from "./factory";

export const particleRecipes = createStyleRecipes("particle", "Particle", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Tech button with neon outline and subtle glow",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-mono uppercase tracking-widest",
        "border transition-all duration-200",
        "focus:outline-none",
      ],
    },
    parameters: [
      {
        id: "size",
        label: "Size",
        labelZh: "尺寸",
        type: "select",
        options: [
          { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-1.5 text-[11px]" },
          { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2 text-xs" },
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
        trueClasses: "w-full justify-center",
      },
    ],
    variants: {
      primary: {
        id: "primary",
        label: "Primary",
        labelZh: "主要",
        classes: [
          "text-cyan-300 border-cyan-400/60 bg-cyan-500/10",
          "shadow-[0_0_12px_rgba(34,211,238,0.22)]",
        ],
      },
      ghost: {
        id: "ghost",
        label: "Ghost",
        labelZh: "幽灵",
        classes: ["text-cyan-200 border-cyan-500/30 bg-transparent"],
      },
    },
    slots: [
      { id: "label", label: "Label", labelZh: "文本", required: true, default: "Engage", type: "text" },
      { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
    ],
    states: {
      hover: ["hover:border-cyan-300 hover:bg-cyan-400/15 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"],
      active: ["active:scale-[0.98]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Dark data card layered above particle background",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#0b1222]/90 border border-cyan-500/25",
        "rounded-lg p-5",
        "shadow-[0_0_20px_rgba(34,211,238,0.08)]",
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
          { value: "md", label: "Medium", labelZh: "中", classes: "p-5" },
          { value: "lg", label: "Large", labelZh: "大", classes: "p-6" },
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
      elevated: {
        id: "elevated",
        label: "Elevated",
        labelZh: "强调",
        classes: ["border-cyan-400/40 shadow-[0_0_24px_rgba(34,211,238,0.16)]"],
      },
    },
    slots: [
      { id: "title", label: "Title", labelZh: "标题", required: false, default: "Particle Node", type: "text" },
      { id: "children", label: "Content", labelZh: "内容", required: true, default: "Network connection stable", type: "children" },
    ],
    states: {
      hover: ["hover:border-cyan-400/45 hover:shadow-[0_0_24px_rgba(34,211,238,0.18)]"],
    },
  },
  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Dark command input with cyan focus state",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full bg-[#020617]/90 border border-cyan-500/35",
        "text-cyan-100 placeholder:text-cyan-400/45",
        "rounded-md focus:outline-none transition-all duration-200",
      ],
    },
    parameters: [
      {
        id: "size",
        label: "Size",
        labelZh: "尺寸",
        type: "select",
        options: [
          { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-2 text-xs" },
          { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2.5 text-sm" },
          { value: "lg", label: "Large", labelZh: "大", classes: "px-5 py-3 text-base" },
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
      { id: "placeholder", label: "Placeholder", labelZh: "占位文本", required: false, default: "Search node...", type: "text" },
    ],
    states: {
      focus: ["focus:border-cyan-300 focus:shadow-[0_0_12px_rgba(34,211,238,0.25)]"],
      disabled: ["opacity-50 cursor-not-allowed"],
    },
  },
});
