// Neo Brutalist Soft Component Recipes
import type { StyleRecipes } from "./types";

export const neoBrutalistSoftRecipes: StyleRecipes = {
  styleSlug: "neo-brutalist-soft",
  styleName: "Neo Brutalist Soft",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Softer brutalist button with lighter shadows, pastel colors and reduced contrast",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-bold",
          "border-2 border-gray-800",
          "rounded-none",
          "transition-all duration-200",
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
            "bg-pink-400 text-white",
            "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-gray-50 text-gray-800",
            "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-gray-800",
            "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-none",
          "hover:translate-x-[2px] hover:translate-y-[2px]",
        ],
        active: ["active:translate-x-[4px] active:translate-y-[4px]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Soft brutalist card with light gray shadows and pastel hover accents",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "border-2 border-gray-800",
          "rounded-none",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "p-3 md:p-4" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-4 md:p-6" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-6 md:p-8" },
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
            "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.15)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.15)]",
          ],
        },
        pink: {
          id: "pink",
          label: "Pink Accent",
          labelZh: "粉色强调",
          classes: [
            "shadow-[4px_4px_0px_0px_rgba(244,114,182,0.4)] md:shadow-[6px_6px_0px_0px_rgba(244,114,182,0.4)]",
          ],
        },
        sky: {
          id: "sky",
          label: "Sky Accent",
          labelZh: "天蓝强调",
          classes: [
            "shadow-[4px_4px_0px_0px_rgba(56,189,248,0.4)] md:shadow-[6px_6px_0px_0px_rgba(56,189,248,0.4)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[6px_6px_0px_0px_rgba(244,114,182,0.4)]",
          "md:hover:shadow-[8px_8px_0px_0px_rgba(244,114,182,0.4)]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Soft brutalist input with gray borders and pastel focus glow",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "border-2 border-gray-800",
          "rounded-none",
          "bg-gray-50",
          "font-mono",
          "text-gray-800",
          "placeholder:text-gray-400",
          "focus:outline-none",
          "transition-shadow duration-200",
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
        tinted: {
          id: "tinted",
          label: "Tinted",
          labelZh: "着色",
          classes: ["bg-pink-50"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:shadow-[4px_4px_0px_0px_rgba(56,189,248,0.3)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-gray-100"],
      },
    },
  },
};
