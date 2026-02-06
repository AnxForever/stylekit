// Shoujo Manga Component Recipes
import type { StyleRecipes } from "./types";

export const shoujoMangaRecipes: StyleRecipes = {
  styleSlug: "shoujo-manga",
  styleName: "Shoujo Manga",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Soft rounded button with pink tones and sparkle hover effect",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-sans",
          "font-medium",
          "rounded-full",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-4 py-1.5 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-2 md:px-7 md:py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-7 py-3 md:px-9 md:py-4 text-base md:text-lg" },
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
            "bg-[#ffb7c5] text-white",
            "shadow-[0_4px_15px_#ffb7c560]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#c4b5fd] text-white",
            "shadow-[0_4px_15px_#c4b5fd60]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#ffb7c5]",
            "border-2 border-[#ffb7c5]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click", type: "text" },
      ],
      states: {
        hover: [
          "hover:scale-105",
          "hover:shadow-[0_6px_20px_#ffb7c580]",
        ],
        active: ["active:scale-95"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Soft rounded card with pink border accents and gentle shadow",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#fff5f7]",
          "rounded-2xl",
          "border border-[#ffb7c5]/30",
          "shadow-[0_4px_20px_#ffb7c520]",
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
        lavender: {
          id: "lavender",
          label: "Lavender",
          labelZh: "薰衣草",
          classes: [
            "border-[#c4b5fd]/40",
            "shadow-[0_4px_20px_#c4b5fd20]",
          ],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "border-[#fde68a]/50",
            "shadow-[0_4px_20px_#fde68a30]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Sakura Card", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "A gentle breeze carries cherry blossoms...", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_8px_30px_#ffb7c540]",
          "hover:border-[#ffb7c5]/50",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Soft rounded input with pink focus ring and gentle styling",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-full",
          "border border-[#ffb7c5]/30",
          "bg-white",
          "text-[#4a5568]",
          "placeholder:text-[#ffb7c5]/50",
          "font-sans",
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
        lavender: {
          id: "lavender",
          label: "Lavender",
          labelZh: "薰衣草",
          classes: [
            "border-[#c4b5fd]/40",
            "placeholder:text-[#c4b5fd]/50",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Your name...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#ffb7c5]",
          "focus:shadow-[0_0_12px_#ffb7c540]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
  },
};
