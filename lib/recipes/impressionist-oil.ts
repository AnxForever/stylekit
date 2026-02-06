// Impressionist Oil Component Recipes
import type { StyleRecipes } from "./types";

export const impressionistOilRecipes: StyleRecipes = {
  styleSlug: "impressionist-oil",
  styleName: "Impressionist Oil",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Bold brushstroke-inspired button with impasto texture and warm tones",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-serif",
          "font-bold",
          "tracking-wide",
          "rounded-lg",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-4 py-2 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-2.5 md:px-7 md:py-3.5 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-7 py-3.5 md:px-9 md:py-4.5 text-base md:text-lg" },
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
            "bg-[#e8a87c] text-[#2c3e50]",
            "shadow-[0_3px_0_#c0392b,0_4px_12px_rgba(232,168,124,0.3)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#2c3e50] text-[#f5f0e1]",
            "shadow-[0_3px_0_#1abc9c,0_4px_12px_rgba(44,62,80,0.3)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#e8a87c]",
            "border-2 border-[#e8a87c]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Canvas", type: "text" },
      ],
      states: {
        hover: [
          "hover:brightness-110",
          "hover:shadow-[0_4px_0_#c0392b,0_6px_16px_rgba(232,168,124,0.4)]",
        ],
        active: ["active:translate-y-[2px] active:shadow-[0_1px_0_#c0392b]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Canvas-textured card with impressionist color layering and warm shadows",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#f5f0e1]",
          "rounded-lg",
          "border border-[#e8a87c]/30",
          "shadow-[0_2px_8px_rgba(44,62,80,0.1),0_0_0_1px_rgba(232,168,124,0.1)]",
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
        warm: {
          id: "warm",
          label: "Warm",
          labelZh: "暖调",
          classes: [
            "bg-[#e8a87c]/10",
            "border-[#c0392b]/20",
          ],
        },
        cool: {
          id: "cool",
          label: "Cool",
          labelZh: "冷调",
          classes: [
            "bg-[#2c3e50]/5",
            "border-[#1abc9c]/20",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_6px_20px_rgba(44,62,80,0.15),0_0_0_1px_rgba(232,168,124,0.2)]",
          "hover:border-[#e8a87c]/40",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Canvas-textured input with warm tones and artistic serif typography",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-lg",
          "border-2 border-[#e8a87c]/30",
          "bg-[#f5f0e1]",
          "text-[#2c3e50]",
          "placeholder:text-[#2c3e50]/40",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-2 text-sm" },
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
        warm: {
          id: "warm",
          label: "Warm",
          labelZh: "暖调",
          classes: [
            "border-[#e8a87c]/50",
            "placeholder:text-[#e8a87c]/40",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#e8a87c]",
          "focus:shadow-[0_0_0_3px_rgba(232,168,124,0.15)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
  },
};
