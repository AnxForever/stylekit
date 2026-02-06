// Art Deco Component Recipes
import type { StyleRecipes } from "./types";

export const artDecoRecipes: StyleRecipes = {
  styleSlug: "art-deco",
  styleName: "Art Deco",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Elegant Art Deco button with gold accents, serif font, and wide tracking",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-serif",
          "font-semibold",
          "uppercase",
          "tracking-[0.3em]",
          "border border-[#D4AF37]",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-5 py-2 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-8 py-3 md:px-10 md:py-4 text-xs md:text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-10 py-4 md:px-12 md:py-5 text-sm md:text-base" },
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
            "bg-transparent text-[#D4AF37]",
            "border-2 border-[#D4AF37]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#D4AF37] text-gray-900",
            "shadow-[0_0_20px_rgba(212,175,55,0.3)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#D4AF37]/70",
            "border border-[#D4AF37]/50",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-[#D4AF37] hover:text-gray-900",
          "hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]",
        ],
        active: ["active:bg-[#c9a227]"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Dark elegant card with gold border accents and serif typography",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-gray-900",
          "border border-[#D4AF37]/50",
          "relative",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "p-4 md:p-6" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-6 md:p-8" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-8 md:p-12" },
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
          classes: [],
        },
        gold: {
          id: "gold",
          label: "Gold Border",
          labelZh: "金色边框",
          classes: [
            "border-2 border-[#D4AF37]",
          ],
        },
        gradient: {
          id: "gradient",
          label: "Gradient",
          labelZh: "渐变",
          classes: [
            "bg-gradient-to-b from-gray-900 to-gray-800",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:border-[#D4AF37]",
          "hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Dark Art Deco input with gold border and serif placeholder",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-gray-900",
          "border border-[#D4AF37]/50",
          "text-[#f5f5dc]",
          "font-serif",
          "tracking-wider",
          "placeholder:text-[#D4AF37]/40",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-4 py-2 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-3 md:px-6 md:py-4 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-6 py-4 md:px-7 md:py-5 text-base md:text-lg" },
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
        gold: {
          id: "gold",
          label: "Gold Border",
          labelZh: "金色边框",
          classes: ["border-[#D4AF37]"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#D4AF37]",
          "focus:shadow-[0_0_15px_rgba(212,175,55,0.2)]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
  },
};
