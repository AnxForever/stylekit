// Japanese Fresh Component Recipes
import type { StyleRecipes } from "./types";

export const japaneseFreshRecipes: StyleRecipes = {
  styleSlug: "japanese-fresh",
  styleName: "Japanese Fresh",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Soft, light-weight button with gentle colors and delicate styling",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-sans",
          "font-light",
          "tracking-wide",
          "rounded-lg",
          "border border-[#b8d4e3]/50",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-4 py-1.5 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-2 md:px-6 md:py-2.5 text-xs md:text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-7 py-3 md:px-8 md:py-3.5 text-sm md:text-base" },
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
            "bg-[#64b5f6] text-white",
            "shadow-sm",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-white text-[#5a8fa8]",
            "border-[#b8d4e3]",
            "shadow-sm",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#64b5f6]",
            "border-[#64b5f6]/40",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-md",
          "hover:brightness-105",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Light, airy card with soft shadows and gentle borders",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "rounded-xl",
          "border border-[#e8e8e4]",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "p-4 md:p-5" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-5 md:p-7" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-6 md:p-9" },
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
        mint: {
          id: "mint",
          label: "Mint",
          labelZh: "薄荷",
          classes: [
            "border-[#98d8c8]/40",
            "bg-[#98d8c8]/5",
          ],
        },
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: [
            "border-[#ffb7c5]/40",
            "bg-[#ffb7c5]/5",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Gentle and simple", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-md",
          "hover:border-[#b8d4e3]/60",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Clean, minimal input with soft focus and light colors",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-lg",
          "border border-[#e8e8e4]",
          "bg-white",
          "text-[#4a5568]",
          "placeholder:text-[#a0aec0]/60",
          "font-sans font-light",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-1.5 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2 md:px-4 md:py-2.5 text-xs md:text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-5 py-3 md:px-5 md:py-3.5 text-sm md:text-base" },
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
        mint: {
          id: "mint",
          label: "Mint",
          labelZh: "薄荷",
          classes: [
            "border-[#98d8c8]/50",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Please enter...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#64b5f6]",
          "focus:shadow-[0_0_0_3px_rgba(100,181,246,0.1)]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
  },
};
