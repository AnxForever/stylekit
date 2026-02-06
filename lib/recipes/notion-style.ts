// Notion Style Component Recipes
import type { StyleRecipes } from "./types";

export const notionStyleRecipes: StyleRecipes = {
  styleSlug: "notion-style",
  styleName: "Notion Style",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Minimal Notion-style button with no border, subtle hover state and clean typography",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-medium",
          "text-sm",
          "rounded-md",
          "transition-colors duration-150",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-2 py-1 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-3 py-1.5 text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-4 py-2 text-base" },
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
            "bg-[#2383e2] text-white",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-transparent text-gray-700",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-gray-700",
            "border border-gray-300",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-gray-100",
        ],
        active: ["active:bg-gray-200"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Simple Notion-style card with divider lines and minimal shadow",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "rounded-lg",
          "divide-y divide-gray-100",
          "transition-shadow duration-200",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "p-4 md:p-5" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-5 md:p-6" },
          ],
          default: "md",
        },
        {
          id: "interactive",
          label: "Interactive",
          labelZh: "可交互",
          type: "boolean",
          default: false,
          trueClasses: "cursor-pointer",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "shadow-sm",
            "border border-gray-200",
          ],
        },
        flat: {
          id: "flat",
          label: "Flat",
          labelZh: "扁平",
          classes: [
            "border border-gray-200",
          ],
        },
        elevated: {
          id: "elevated",
          label: "Elevated",
          labelZh: "悬浮",
          classes: [
            "shadow-md",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-md",
          "hover:border-gray-300",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Borderless Notion-style input with bottom underline on focus and clean typography",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-transparent",
          "border-0 border-b border-transparent",
          "rounded-none",
          "text-gray-900",
          "placeholder:text-gray-400",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "py-1 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "py-1.5 md:py-2 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "py-2 md:py-3 text-base md:text-lg" },
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
        bordered: {
          id: "bordered",
          label: "Bordered",
          labelZh: "边框",
          classes: ["border border-gray-200 rounded-md px-3"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type something...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-b-[#2383e2]",
          "focus:border-b-2",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
  },
};
