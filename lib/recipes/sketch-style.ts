// Sketch Style Component Recipes
import type { StyleRecipes } from "./types";

export const sketchStyleRecipes: StyleRecipes = {
  styleSlug: "sketch-style",
  styleName: "Sketch Style",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Hand-drawn feel button with dashed borders, pencil tones and subtle shadows",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-semibold",
          "border-2 border-dashed border-[#2c2c2c]",
          "rounded-sm",
          "transition-opacity duration-200",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-1.5 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2 md:px-6 md:py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-6 py-3 md:px-8 md:py-4 text-base md:text-lg" },
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
            "bg-[#2c2c2c] text-[#f5f0e8]",
            "shadow-[2px_2px_0px_rgba(44,44,44,0.3)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-transparent text-[#2c2c2c]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-[#f5f0e8] text-[#2c2c2c]",
            "shadow-[1px_1px_0px_rgba(44,44,44,0.3)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
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
      description: "Paper-like card with dashed borders and pencil-drawn aesthetic",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#f5f0e8]",
          "border-2 border-dashed border-[#2c2c2c]",
          "rounded-sm",
          "shadow-[2px_2px_0px_rgba(44,44,44,0.3)]",
          "transition-opacity duration-200",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "p-3 md:p-4" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-4 md:p-6" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-6 md:p-8" },
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
        torn: {
          id: "torn",
          label: "Torn Edge",
          labelZh: "撕纸效果",
          classes: [
            "bg-[#e8e2d8]",
            "shadow-[3px_3px_0px_rgba(44,44,44,0.3)]",
          ],
        },
        notebook: {
          id: "notebook",
          label: "Notebook",
          labelZh: "笔记本",
          classes: [
            "bg-white",
            "border-l-4 border-l-[#c85050]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[2px_2px_0px_rgba(44,44,44,0.5)]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Pencil-sketch input with dashed border and warm paper background",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "border-2 border-dashed border-[#2c2c2c]",
          "rounded-sm",
          "bg-[#faf5ed]",
          "font-sans",
          "text-[#2c2c2c]",
          "placeholder:text-[#8a8a8a]",
          "focus:outline-none",
          "transition-all duration-200",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-2 py-1.5 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-3 py-2 md:px-4 md:py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-4 py-3 md:px-5 md:py-4 text-base md:text-lg" },
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
        underline: {
          id: "underline",
          label: "Underline",
          labelZh: "下划线",
          classes: [
            "border-0 border-b-2 border-dashed border-b-[#2c2c2c]",
            "rounded-none",
            "bg-transparent",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:shadow-[2px_2px_0px_rgba(44,44,44,0.4)]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
  },
};
