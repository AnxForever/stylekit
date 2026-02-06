// Watercolor Art Component Recipes
import type { StyleRecipes } from "./types";

export const watercolorArtRecipes: StyleRecipes = {
  styleSlug: "watercolor-art",
  styleName: "Watercolor Art",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Soft watercolor-washed button with gentle edges and transparent feel",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-serif",
          "font-medium",
          "tracking-wide",
          "rounded-xl",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-2.5 md:px-7 md:py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-7 py-3.5 md:px-9 md:py-4 text-base md:text-lg" },
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
            "bg-[#d4a0a0]/70 text-[#4a3535]",
            "shadow-[0_2px_12px_rgba(212,160,160,0.3)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#87ceeb]/50 text-[#2a4a5a]",
            "shadow-[0_2px_12px_rgba(135,206,235,0.3)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#d4a0a0]",
            "border border-[#d4a0a0]/40",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Paint", type: "text" },
      ],
      states: {
        hover: [
          "hover:opacity-90",
          "hover:shadow-[0_4px_16px_rgba(212,160,160,0.4)]",
        ],
        active: ["active:opacity-80"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Watercolor-washed card with soft edges and paper texture feel",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#faf8f5]",
          "rounded-2xl",
          "border border-[#d4a0a0]/20",
          "shadow-[0_2px_16px_rgba(212,160,160,0.15)]",
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
        blush: {
          id: "blush",
          label: "Blush",
          labelZh: "腮红",
          classes: [
            "bg-[#d4a0a0]/10",
          ],
        },
        sky: {
          id: "sky",
          label: "Sky",
          labelZh: "天蓝",
          classes: [
            "bg-[#87ceeb]/10",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_6px_24px_rgba(212,160,160,0.25)]",
          "hover:border-[#d4a0a0]/30",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Soft watercolor-style input with delicate borders and elegant typography",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-xl",
          "border border-[#d4a0a0]/30",
          "bg-[#faf8f5]",
          "text-[#4a3535]",
          "placeholder:text-[#d4a0a0]/50",
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
        blush: {
          id: "blush",
          label: "Blush",
          labelZh: "腮红",
          classes: [
            "border-[#d4a0a0]/40",
            "placeholder:text-[#d4a0a0]/40",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#d4a0a0]/60",
          "focus:shadow-[0_0_12px_rgba(212,160,160,0.2)]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
  },
};
