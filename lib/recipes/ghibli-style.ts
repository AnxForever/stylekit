// Ghibli Style Component Recipes
import type { StyleRecipes } from "./types";

export const ghibliStyleRecipes: StyleRecipes = {
  styleSlug: "ghibli-style",
  styleName: "Ghibli Style",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Soft rounded button with warm tones and gentle shadow inspired by Studio Ghibli",
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
            "bg-[#8B7355] text-white",
            "shadow-[0_4px_12px_rgba(139,115,85,0.3)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#B8860B] text-white",
            "shadow-[0_4px_12px_rgba(184,134,11,0.3)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#8B7355]",
            "border-2 border-[#8B7355]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_6px_20px_rgba(139,115,85,0.4)]",
          "hover:brightness-110",
        ],
        active: ["active:scale-[0.97]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Hand-drawn feel card with extra-rounded corners, soft shadow and warm background",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#faf5eb]",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "p-4 md:p-5" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-5 md:p-7" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-7 md:p-10" },
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
            "shadow-[0_4px_20px_rgba(139,115,85,0.15)]",
          ],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: [
            "bg-[#f0e6d3]",
            "shadow-[0_4px_20px_rgba(184,134,11,0.15)]",
          ],
        },
        bordered: {
          id: "bordered",
          label: "Bordered",
          labelZh: "边框",
          classes: [
            "border-2 border-[#8B7355]/30",
            "shadow-[0_4px_20px_rgba(139,115,85,0.1)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_8px_30px_rgba(139,115,85,0.25)]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Rounded input with natural warm colors and soft focus glow",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-xl",
          "border-2 border-[#8B7355]/30",
          "bg-[#faf5eb]",
          "text-[#5a4a3a]",
          "placeholder:text-[#8B7355]/40",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-1.5 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2.5 md:px-5 md:py-3 text-sm md:text-base" },
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
        filled: {
          id: "filled",
          label: "Filled",
          labelZh: "填充",
          classes: ["bg-[#f0e6d3]"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#8B7355]",
          "focus:shadow-[0_0_12px_rgba(139,115,85,0.2)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-gray-100"],
      },
    },
  },
};
