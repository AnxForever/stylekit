// Hero Fullscreen Component Recipes
import type { StyleRecipes } from "./types";

export const heroFullscreenRecipes: StyleRecipes = {
  styleSlug: "hero-fullscreen",
  styleName: "Hero Fullscreen",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Large dramatic button for fullscreen hero call-to-action",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-semibold",
          "rounded-full",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-5 py-2.5 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-6 py-3 md:px-8 md:py-4 text-sm md:text-lg" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-8 py-4 md:px-12 md:py-5 text-lg md:text-xl" },
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
            "border border-white/40",
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
          "hover:shadow-lg",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Glassmorphic overlay card for fullscreen hero feature sections",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white/10",
          "backdrop-blur-sm",
          "rounded-2xl",
          "border border-white/20",
          "text-white",
          "transition-all duration-200",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "p-4 md:p-6" },
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
        solid: {
          id: "solid",
          label: "Solid",
          labelZh: "实底",
          classes: [
            "bg-white text-zinc-900",
            "border-white/0",
            "shadow-xl",
          ],
        },
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: [
            "bg-black/40",
            "border-white/10",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:bg-white/15",
          "hover:border-white/30",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Glassmorphic input for hero section email capture forms",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-white/10",
          "backdrop-blur-sm",
          "border border-white/30",
          "rounded-full",
          "text-white",
          "placeholder:text-white/60",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-4 py-2 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-3 md:px-6 md:py-4 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-6 py-4 md:px-8 md:py-5 text-base md:text-lg" },
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
          classes: ["bg-white text-zinc-900 placeholder:text-zinc-400 border-white/0"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Enter your email", type: "text" },
      ],
      states: {
        focus: [
          "focus:ring-2 focus:ring-white/50",
          "focus:border-white/60",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
  },
};
