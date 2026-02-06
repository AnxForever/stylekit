// Watercolor Style Component Recipes
import type { StyleRecipes } from "./types";

export const watercolorStyleRecipes: StyleRecipes = {
  styleSlug: "watercolor-style",
  styleName: "Watercolor Style",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Soft pastel button with gentle shadows, rounded edges and organic feel",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-light",
          "rounded-2xl",
          "shadow-[0_4px_20px_rgba(74,111,165,0.12)]",
          "transition-all duration-400 ease-out",
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
            "bg-[#4a6fa5]/80 text-white",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#faf8f5] text-[#4a6fa5]",
            "border border-[#4a6fa5]/30",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#4a6fa5]",
            "border border-[#4a6fa5]/20",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:scale-[1.02]",
          "hover:shadow-[0_8px_30px_rgba(74,111,165,0.2)]",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Soft watercolor card with pastel tones, gentle borders and diffused shadows",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#faf8f5]",
          "rounded-2xl md:rounded-3xl",
          "border border-[#4a6fa5]/20",
          "shadow-[0_4px_20px_rgba(74,111,165,0.12)]",
          "transition-all duration-400 ease-out",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "p-3 md:p-5" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-5 md:p-8" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-6 md:p-10" },
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
        rose: {
          id: "rose",
          label: "Rose Wash",
          labelZh: "玫瑰水彩",
          classes: [
            "bg-[#b4788c]/10",
            "border-[#b4788c]/20",
            "shadow-[0_4px_20px_rgba(180,120,140,0.15)]",
          ],
        },
        sage: {
          id: "sage",
          label: "Sage Wash",
          labelZh: "鼠尾草水彩",
          classes: [
            "bg-[#78a082]/10",
            "border-[#78a082]/20",
            "shadow-[0_4px_20px_rgba(120,160,130,0.15)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_8px_30px_rgba(74,111,165,0.2)]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Delicate watercolor input with soft borders and translucent background",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-2xl",
          "border border-[#4a6fa5]/20",
          "bg-white/60",
          "font-light",
          "text-[#3a3a3a]",
          "placeholder:text-[#8a8a8a]",
          "focus:outline-none",
          "transition-all duration-400 ease-out",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2 md:px-5 md:py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-5 py-3 md:px-6 md:py-4 text-base md:text-lg" },
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
        tinted: {
          id: "tinted",
          label: "Tinted",
          labelZh: "着色",
          classes: ["bg-[#4a6fa5]/5"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#4a6fa5]/40",
          "focus:shadow-[0_4px_20px_rgba(74,111,165,0.15)]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
  },
};
