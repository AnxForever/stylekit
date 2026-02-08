// Solarpunk Component Recipes
import type { StyleRecipes } from "./types";

export const solarpunkRecipes: StyleRecipes = {
  styleSlug: "solarpunk",
  styleName: "Solarpunk",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Organic button with warm gradients, large rounded corners and nature-inspired styling",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-medium",
          "rounded-2xl",
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
            "bg-gradient-to-r from-green-400 to-emerald-500 text-white",
            "shadow-lg shadow-green-300/40",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-900",
            "shadow-lg shadow-amber-300/40",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-green-600",
            "border-2 border-green-400",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-xl hover:shadow-green-300/50",
          "hover:scale-105",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Organic card with warm background, plant-themed decorations and soft shadows",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white/80",
          "backdrop-blur-sm",
          "border border-green-200",
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
          trueClasses: "hover:-translate-y-1 cursor-pointer",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "shadow-lg shadow-green-100/50",
          ],
        },
        golden: {
          id: "golden",
          label: "Golden",
          labelZh: "金色",
          classes: [
            "border-amber-200",
            "shadow-lg shadow-amber-100/50",
          ],
        },
        sky: {
          id: "sky",
          label: "Sky",
          labelZh: "天空",
          classes: [
            "border-sky-200",
            "shadow-lg shadow-sky-100/50",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-xl hover:shadow-green-200/40",
          "hover:border-green-300",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Organic input with warm background, green focus glow and nature-inspired styling",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-white/80",
          "backdrop-blur-sm",
          "border border-green-200",
          "rounded-2xl",
          "text-gray-800",
          "placeholder:text-green-300",
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
        golden: {
          id: "golden",
          label: "Golden",
          labelZh: "金色",
          classes: [
            "border-amber-200",
            "text-amber-800",
            "placeholder:text-amber-300",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-green-400",
          "focus:shadow-lg focus:shadow-green-200/40",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-gray-100"],
      },
    },
  },
};
