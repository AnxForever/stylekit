// Dark Academia Component Recipes
import type { StyleRecipes } from "./types";

export const darkAcademiaRecipes: StyleRecipes = {
  styleSlug: "dark-academia",
  styleName: "Dark Academia",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Scholarly button with serif typography, muted earth tones and warm academic aesthetic",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-serif",
          "tracking-wide",
          "rounded",
          "border",
          "transition-all duration-300 ease-in-out",
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
            "bg-[#3d2b1f] text-[#f5f0e1]",
            "border-[#8b7355]/60",
            "shadow-sm",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#2d4a3e] text-[#f5f0e1]",
            "border-[#2d4a3e]/60",
            "shadow-sm",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#3d2b1f]",
            "border-[#3d2b1f]/40",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-md",
          "hover:border-[#8b7355]",
        ],
        active: ["active:scale-95"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Warm scholarly card with parchment tones and subtle borders",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#f5f0e1]",
          "rounded",
          "border border-[#8b7355]/30",
          "shadow-sm",
          "transition-all duration-300 ease-in-out",
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
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: [
            "bg-[#3d2b1f] text-[#f5f0e1]",
            "border-[#8b7355]/40",
          ],
        },
        green: {
          id: "green",
          label: "Green",
          labelZh: "墨绿",
          classes: [
            "bg-[#2d4a3e] text-[#f5f0e1]",
            "border-[#2d4a3e]/40",
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
          "hover:border-[#8b7355]/50",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Warm scholarly input with parchment background and muted border",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded",
          "border border-[#8b7355]/30",
          "bg-[#f5f0e1]/80",
          "text-[#3d2b1f]",
          "placeholder:text-[#8b7355]/50",
          "font-serif",
          "focus:outline-none",
          "transition-all duration-300 ease-in-out",
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
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: [
            "bg-[#3d2b1f]/20",
            "border-[#3d2b1f]/30",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#8b7355]",
          "focus:shadow-[0_0_8px_rgba(139,115,85,0.2)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
  },
};
