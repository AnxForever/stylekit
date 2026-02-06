// Full Page Scroll Component Recipes
import type { StyleRecipes } from "./types";

export const fullPageScrollRecipes: StyleRecipes = {
  styleSlug: "full-page-scroll",
  styleName: "Full Page Scroll",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Bold full-viewport button with large sizing for immersive scroll sections",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-semibold",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-5 py-2.5 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-6 py-3 md:px-8 md:py-4 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-8 py-4 md:px-12 md:py-5 text-base md:text-lg" },
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
            "bg-white text-black",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-transparent text-white",
            "border-2 border-white",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-white/80",
            "border border-white/30",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Get Started", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-white/90",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Full-viewport section card with centered content and gradient backgrounds",
      skeleton: {
        element: "section",
        baseClasses: [
          "min-h-screen",
          "snap-start",
          "flex items-center justify-center",
          "text-white",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "p-4 md:p-8" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-6 md:p-12" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-8 md:p-16" },
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
            "bg-gradient-to-br from-indigo-600 to-purple-700",
          ],
        },
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: [
            "bg-black",
          ],
        },
        vibrant: {
          id: "vibrant",
          label: "Vibrant",
          labelZh: "鲜艳",
          classes: [
            "bg-gradient-to-br from-cyan-600 to-blue-600",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:brightness-110",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Transparent underline input for full-page scroll contact sections",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-transparent",
          "border-b border-white/30",
          "text-white",
          "placeholder:text-white/50",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-0 py-2 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-0 py-3 md:py-4 text-base md:text-lg" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-0 py-4 md:py-5 text-lg md:text-xl" },
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
        solid: {
          id: "solid",
          label: "Solid",
          labelZh: "实底",
          classes: ["bg-white/10 backdrop-blur-sm rounded-lg border-0 px-4"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Your Name", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-white",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
  },
};
