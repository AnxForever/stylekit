// Soft UI Component Recipes
import type { StyleRecipes } from "./types";

export const softUIRecipes: StyleRecipes = {
  styleSlug: "soft-ui",
  styleName: "Soft UI",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Soft button with colored shadow, rounded corners, and hover lift",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-medium",
          "border-0",
          "rounded-2xl",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-4 py-1.5 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base" },
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
            "bg-indigo-500 text-white",
            "shadow-lg shadow-indigo-500/30",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-white text-gray-700",
            "shadow-lg shadow-gray-200/50",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-indigo-50 text-indigo-500",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-xl hover:shadow-indigo-500/40",
          "hover:-translate-y-0.5",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Soft card with large shadow, no border, and rounded corners",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "border-0",
          "rounded-3xl",
          "shadow-xl shadow-gray-200/50",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "p-4 md:p-5" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-5 md:p-8" },
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
          trueClasses: "hover:-translate-y-1 cursor-pointer",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
        soft: {
          id: "soft",
          label: "Soft Background",
          labelZh: "柔和背景",
          classes: [
            "bg-slate-50",
          ],
        },
        tinted: {
          id: "tinted",
          label: "Tinted",
          labelZh: "着色",
          classes: [
            "bg-indigo-50",
            "shadow-xl shadow-indigo-100/50",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-2xl hover:shadow-gray-200/60",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Soft input with no border, subtle background, and focus ring",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-gray-50",
          "border-0",
          "rounded-2xl",
          "text-gray-800",
          "placeholder:text-gray-400",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3.5 py-2 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2.5 md:px-5 md:py-3.5 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-5 py-3.5 md:px-6 md:py-4 text-base md:text-lg" },
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
        white: {
          id: "white",
          label: "White",
          labelZh: "白色",
          classes: ["bg-white shadow-sm"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:ring-2 focus:ring-indigo-500/50",
          "focus:bg-white",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
  },
};
