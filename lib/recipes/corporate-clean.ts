// Corporate Clean Component Recipes
import type { StyleRecipes } from "./types";

export const corporateCleanRecipes: StyleRecipes = {
  styleSlug: "corporate-clean",
  styleName: "Corporate Clean",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Professional button with blue primary and clean shadow",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-medium",
          "rounded-lg",
          "shadow-sm",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-5 py-2.5 md:px-6 md:py-3 text-base md:text-lg" },
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
            "bg-blue-600 text-white",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-white text-gray-700",
            "border border-gray-300",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-blue-600",
            "shadow-none",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-blue-700",
          "hover:shadow-md",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Professional card with subtle border and shadow",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "rounded-xl",
          "shadow-sm",
          "border border-gray-200",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "p-4 md:p-5" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-5 md:p-6" },
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
          trueClasses: "hover:-translate-y-0.5 cursor-pointer",
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
          labelZh: "悬浮",
          classes: [
            "shadow-md border-transparent",
          ],
        },
        bordered: {
          id: "bordered",
          label: "Bordered",
          labelZh: "边框",
          classes: [
            "shadow-none border-gray-300",
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
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Professional input with border and blue focus ring",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-white",
          "rounded-lg",
          "border border-gray-300",
          "text-gray-900",
          "placeholder:text-gray-400",
          "focus:outline-none",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-2.5 py-1.5 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-3 py-2 md:px-4 md:py-2.5 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-4 py-2.5 md:px-5 md:py-3 text-base md:text-lg" },
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
        filled: {
          id: "filled",
          label: "Filled",
          labelZh: "填充",
          classes: ["bg-slate-50 border-slate-200"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:ring-2 focus:ring-blue-500",
          "focus:border-blue-500",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-gray-50"],
      },
    },
  },
};
