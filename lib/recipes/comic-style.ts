// Comic Style Component Recipes
import type { StyleRecipes } from "./types";

export const comicStyleRecipes: StyleRecipes = {
  styleSlug: "comic-style",
  styleName: "Comic Style",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Bold comic button with thick black outlines, bright colors and action effects",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-black",
          "uppercase",
          "tracking-wide",
          "border-4 border-[#1a1a1a]",
          "rounded-lg",
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
            "bg-[#ef4444] text-white",
            "shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] md:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#3b82f6] text-white",
            "shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] md:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-[#fffef0] text-[#1a1a1a]",
            "shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] md:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]",
          "hover:translate-x-[2px] hover:translate-y-[2px]",
        ],
        active: ["active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"],
        disabled: ["opacity-60 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Comic panel card with thick black borders, offset shadow and bright background",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#fffef0]",
          "border-4 border-[#1a1a1a]",
          "rounded-lg",
          "transition-all duration-150",
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
          classes: [
            "shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] md:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)]",
          ],
        },
        action: {
          id: "action",
          label: "Action",
          labelZh: "动作",
          classes: [
            "shadow-[4px_4px_0px_0px_rgba(239,68,68,1)] md:shadow-[6px_6px_0px_0px_rgba(239,68,68,1)]",
          ],
        },
        highlight: {
          id: "highlight",
          label: "Highlight",
          labelZh: "高亮",
          classes: [
            "bg-[#facc15]",
            "shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] md:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]",
          "hover:translate-x-[2px] hover:translate-y-[2px]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Comic-style input with thick borders and bold typography",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "border-4 border-[#1a1a1a]",
          "rounded-lg",
          "bg-[#fffef0]",
          "font-bold",
          "text-[#1a1a1a]",
          "placeholder:text-[#4a4a4a]",
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
        colored: {
          id: "colored",
          label: "Colored",
          labelZh: "彩色",
          classes: ["bg-[#facc15]/20"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]",
        ],
        disabled: ["opacity-60 cursor-not-allowed bg-gray-200"],
      },
    },
  },
};
