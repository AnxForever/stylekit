// Dopamine Design Component Recipes
import { createStyleRecipes } from "./factory";

export const dopamineDesignRecipes = createStyleRecipes("dopamine-design", "Dopamine Design", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Pill-shaped button with high-saturation gradient and colored shadow",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-bold",
        "rounded-full",
        "transition-all duration-300",
        "hover:scale-105 hover:-translate-y-0.5",
        "active:scale-95",
      ],
    },
    parameters: [
      {
        id: "size",
        label: "Size",
        labelZh: "尺寸",
        type: "select",
        options: [
          { value: "sm", label: "Small", labelZh: "小", classes: "px-5 py-2 text-sm" },
          { value: "md", label: "Medium", labelZh: "中", classes: "px-8 py-3 text-base" },
          { value: "lg", label: "Large", labelZh: "大", classes: "px-10 py-4 text-lg" },
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
          "bg-[#ff006e] text-white",
          "shadow-[0_8px_30px_rgba(255,0,110,0.4)]",
          "hover:shadow-[0_12px_40px_rgba(255,0,110,0.6)]",
        ],
      },
      gradient: {
        id: "gradient",
        label: "Gradient",
        labelZh: "渐变",
        classes: [
          "bg-gradient-to-r from-[#ff006e] to-[#8338ec] text-white",
          "shadow-[0_8px_30px_rgba(131,56,236,0.4)]",
          "hover:shadow-[0_12px_40px_rgba(131,56,236,0.6)]",
        ],
      },
      blue: {
        id: "blue",
        label: "Blue",
        labelZh: "蓝色",
        classes: [
          "bg-[#3a86ff] text-white",
          "shadow-[0_8px_30px_rgba(58,134,255,0.4)]",
          "hover:shadow-[0_12px_40px_rgba(58,134,255,0.6)]",
        ],
      },
      outline: {
        id: "outline",
        label: "Outline",
        labelZh: "轮廓",
        classes: [
          "bg-transparent text-[#8338ec]",
          "border-2 border-[#8338ec]/30",
          "hover:bg-[#8338ec]/10",
        ],
      },
    },
    slots: [
      { id: "label", label: "Label", labelZh: "文字", required: true, default: "Let's Go!", type: "text" },
    ],
    states: {
      hover: ["hover:scale-105", "hover:shadow-[0_12px_40px_rgba(255,0,110,0.6)]"],
      active: ["active:scale-95"],
      disabled: ["opacity-40 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Rounded card with colorful shadow and playful hover animation",
    skeleton: {
      element: "div",
      baseClasses: [
        "rounded-3xl",
        "transition-all duration-300",
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
          { value: "md", label: "Medium", labelZh: "中", classes: "p-6 md:p-8" },
          { value: "lg", label: "Large", labelZh: "大", classes: "p-8 md:p-10" },
        ],
        default: "md",
      },
      {
        id: "interactive",
        label: "Interactive",
        labelZh: "可交互",
        type: "boolean",
        default: true,
        trueClasses: "cursor-pointer hover:-translate-y-1",
      },
    ],
    variants: {
      white: {
        id: "white",
        label: "White",
        labelZh: "白色",
        classes: [
          "bg-white border-2 border-[#ff006e]/20",
          "shadow-[0_8px_30px_rgba(255,0,110,0.15)]",
          "hover:shadow-[0_12px_40px_rgba(131,56,236,0.25)]",
        ],
      },
      gradient: {
        id: "gradient",
        label: "Gradient",
        labelZh: "渐变",
        classes: [
          "bg-gradient-to-br from-[#8338ec] to-[#3a86ff] text-white",
          "shadow-[0_16px_50px_rgba(131,56,236,0.35)]",
          "hover:shadow-[0_20px_60px_rgba(131,56,236,0.5)]",
        ],
      },
      pink: {
        id: "pink",
        label: "Pink",
        labelZh: "粉色",
        classes: [
          "bg-gradient-to-br from-[#ff006e] to-[#fb5607] text-white",
          "shadow-[0_16px_50px_rgba(255,0,110,0.35)]",
        ],
      },
    },
    slots: [
      { id: "title", label: "Title", labelZh: "标题", required: false, default: "Dopamine Card", type: "text" },
      { id: "children", label: "Content", labelZh: "内容", required: true, default: "Colors that spark joy!", type: "children" },
    ],
    states: {
      hover: ["hover:-translate-y-1", "hover:shadow-[0_12px_40px_rgba(131,56,236,0.25)]"],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Rounded input with colorful focus ring and playful placeholder",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "rounded-2xl",
        "border-2 border-[#8338ec]/20",
        "bg-white",
        "text-[#1a1a2e] font-medium",
        "placeholder:text-[#8338ec]/40",
        "focus:outline-none",
        "transition-all duration-300",
      ],
    },
    parameters: [
      {
        id: "size",
        label: "Size",
        labelZh: "尺寸",
        type: "select",
        options: [
          { value: "sm", label: "Small", labelZh: "小", classes: "px-4 py-2.5 text-sm" },
          { value: "md", label: "Medium", labelZh: "中", classes: "px-6 py-3.5 text-base" },
          { value: "lg", label: "Large", labelZh: "大", classes: "px-8 py-4 text-lg" },
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
      pink: {
        id: "pink",
        label: "Pink Focus",
        labelZh: "粉色聚焦",
        classes: [
          "border-[#ff006e]/20",
          "placeholder:text-[#ff006e]/40",
        ],
      },
    },
    slots: [
      { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type something fun...", type: "text" },
    ],
    states: {
      focus: [
        "focus:border-[#ff006e]",
        "focus:shadow-[0_0_0_4px_rgba(255,0,110,0.15)]",
      ],
      disabled: ["opacity-40 cursor-not-allowed"],
    },
  },
});
