// Cottagecore Component Recipes
import type { StyleRecipes } from "./types";

export const cottagecoreRecipes: StyleRecipes = {
  styleSlug: "cottagecore",
  styleName: "Cottagecore",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Warm countryside button with soft serif text, rounded edges, and earthy tones",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-serif",
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
            "bg-[#5a8f5a] text-white",
            "shadow-md",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#f5d75f]/20 text-[#8b7355]",
            "border border-[#8b7355]/40",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#5a8f5a]",
            "border-2 border-[#5a8f5a]/50",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-lg",
          "hover:scale-105",
        ],
        active: ["active:scale-95"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Warm cottagecore card with linen-like background and floral border accents",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#faf6f0]",
          "rounded-2xl",
          "border border-[#d4a0a0]/40",
          "shadow-md",
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
        floral: {
          id: "floral",
          label: "Floral",
          labelZh: "花朵",
          classes: [
            "border-[#d4a0a0]/60",
            "bg-gradient-to-br from-[#faf6f0] to-[#f5d75f]/10",
          ],
        },
        earthy: {
          id: "earthy",
          label: "Earthy",
          labelZh: "大地",
          classes: [
            "border-[#8b7355]/40",
            "bg-gradient-to-br from-[#faf6f0] to-[#8b7355]/10",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-lg",
          "hover:border-[#d4a0a0]/60",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Warm cottagecore input with soft borders and earthy placeholder tones",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-xl",
          "border border-[#8b7355]/30",
          "bg-[#faf6f0]",
          "text-[#8b7355]",
          "placeholder:text-[#8b7355]/40",
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
        floral: {
          id: "floral",
          label: "Floral",
          labelZh: "花朵",
          classes: [
            "border-[#d4a0a0]/40",
            "placeholder:text-[#d4a0a0]/50",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#5a8f5a]/60",
          "focus:shadow-[0_0_12px_rgba(90,143,90,0.2)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
  },
};
