// Art Nouveau Component Recipes
import type { StyleRecipes } from "./types";

export const artNouveauRecipes: StyleRecipes = {
  styleSlug: "art-nouveau",
  styleName: "Art Nouveau",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Organic curved button with flowing vine-like borders and Art Nouveau poster aesthetic",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-serif",
          "tracking-wide",
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
            "bg-[#2d5016] text-[#f5f0e1]",
            "border-2 border-[#c9a227]",
            "shadow-md",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#f5f0e1] text-[#2d5016]",
            "border-2 border-[#2d5016]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#c9a227]",
            "border-2 border-[#c9a227]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-[#c9a227] hover:text-[#2d5016]",
          "hover:shadow-lg",
        ],
        active: ["active:scale-95"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Elegant card with organic vine borders and Mucha-inspired decorative elements",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#f5f0e1]",
          "rounded-2xl",
          "border-2 border-[#c9a227]/60",
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
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "border-[#c9a227]",
            "shadow-[0_4px_20px_rgba(201,162,39,0.2)]",
          ],
        },
        vine: {
          id: "vine",
          label: "Vine",
          labelZh: "藤蔓",
          classes: [
            "border-[#2d5016]",
            "shadow-[0_4px_20px_rgba(45,80,22,0.15)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_8px_30px_rgba(201,162,39,0.3)]",
          "hover:border-[#c9a227]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Elegant input with organic Art Nouveau styling and golden accents",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-full",
          "border-2 border-[#c9a227]/40",
          "bg-[#f5f0e1]",
          "text-[#2d5016]",
          "placeholder:text-[#8b6db5]/50",
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
        wisteria: {
          id: "wisteria",
          label: "Wisteria",
          labelZh: "紫藤",
          classes: [
            "border-[#8b6db5]/40",
            "text-[#8b6db5]",
            "placeholder:text-[#8b6db5]/40",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#c9a227]",
          "focus:shadow-[0_0_12px_rgba(201,162,39,0.3)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
  },
};
