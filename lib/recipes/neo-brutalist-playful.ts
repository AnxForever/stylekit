// Neo Brutalist Playful Component Recipes
import type { StyleRecipes } from "./types";

export const neoBrutalistPlayfulRecipes: StyleRecipes = {
  styleSlug: "neo-brutalist-playful",
  styleName: "Neo Brutalist Playful",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Colorful brutalist button with thick borders, bright colors and fun hover effects",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-black",
          "border-4 border-black",
          "rounded-none",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-1.5 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2 md:px-6 md:py-3 text-base md:text-lg" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-6 py-3 md:px-8 md:py-4 text-lg md:text-xl" },
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
            "bg-[#ff6b6b] text-white",
            "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
            "rotate-[-1deg]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#4ecdc4] text-black",
            "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
            "rotate-[1deg]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-[#ffe66d] text-black",
            "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-none",
          "hover:translate-x-[3px] hover:translate-y-[3px]",
          "hover:scale-105",
        ],
        active: ["active:translate-x-[6px] active:translate-y-[6px]"],
        disabled: ["opacity-50 cursor-not-allowed rotate-0"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Playful card with colorful shadows, slight rotation and vibrant hover effects",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "border-4 border-black",
          "rounded-none",
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
          trueClasses: "hover:-translate-y-2 hover:scale-[1.02] cursor-pointer",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "shadow-[8px_8px_0px_0px_rgba(78,205,196,1)]",
            "rotate-[1deg]",
          ],
        },
        coral: {
          id: "coral",
          label: "Coral",
          labelZh: "珊瑚",
          classes: [
            "shadow-[8px_8px_0px_0px_rgba(255,107,107,1)]",
            "rotate-[-1deg]",
          ],
        },
        sunny: {
          id: "sunny",
          label: "Sunny",
          labelZh: "阳光",
          classes: [
            "bg-[#ffe66d]",
            "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
            "rotate-[2deg]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[12px_12px_0px_0px_rgba(255,107,107,1)]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Playful input with colorful background, thick borders and vibrant focus state",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "border-4 border-black",
          "rounded-none",
          "bg-[#ffe66d]",
          "font-mono",
          "text-black",
          "placeholder:text-gray-600",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "px-3 py-2 md:px-4 md:py-3 text-base md:text-lg" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-4 py-3 md:px-6 md:py-4 text-lg md:text-xl" },
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
        mint: {
          id: "mint",
          label: "Mint",
          labelZh: "薄荷",
          classes: [
            "bg-[#95e1d3]",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:shadow-[6px_6px_0px_0px_rgba(78,205,196,1)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-gray-200"],
      },
    },
  },
};
