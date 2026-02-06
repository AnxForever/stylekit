// Y2K Component Recipes
import type { StyleRecipes } from "./types";

export const y2kRecipes: StyleRecipes = {
  styleSlug: "y2k",
  styleName: "Y2K",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Futuristic Y2K button with metallic sheen and rounded-full shape",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-bold",
          "rounded-full",
          "border border-white/50",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "px-6 py-2.5 md:px-8 md:py-4 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-8 py-4 md:px-10 md:py-5 text-base md:text-lg" },
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
            "bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 text-white",
            "shadow-[0_4px_20px_rgba(255,105,180,0.4)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-gradient-to-b from-gray-200 via-white to-gray-300 text-gray-700",
            "shadow-[0_4px_15px_rgba(0,0,0,0.1),inset_0_2px_3px_rgba(255,255,255,0.8)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-pink-400",
            "border-2 border-pink-400",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:scale-105",
          "hover:shadow-[0_6px_30px_rgba(255,105,180,0.6)]",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Translucent Y2K card with bubble-like glass and pastel gradients",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-gradient-to-br from-white/60 to-pink-100/40",
          "backdrop-blur-md",
          "rounded-3xl",
          "border border-white/60",
          "shadow-[0_8px_32px_rgba(0,0,0,0.1)]",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "p-5 md:p-8" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-8 md:p-10" },
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
        metallic: {
          id: "metallic",
          label: "Metallic",
          labelZh: "金属",
          classes: [
            "bg-gradient-to-br from-gray-200/60 via-white/80 to-gray-300/60",
          ],
        },
        rainbow: {
          id: "rainbow",
          label: "Rainbow",
          labelZh: "彩虹",
          classes: [
            "bg-gradient-to-br from-pink-200/40 via-purple-200/40 to-cyan-200/40",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_12px_40px_rgba(255,105,180,0.2)]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Y2K-style rounded input with metallic gradient and pink focus",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-gradient-to-b from-white to-gray-100",
          "rounded-full",
          "border border-gray-200",
          "text-gray-700",
          "placeholder:text-gray-400",
          "shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]",
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
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: ["bg-gradient-to-b from-pink-50 to-pink-100 border-pink-200"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-pink-300",
          "focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.05),0_0_0_3px_rgba(255,105,180,0.2)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
  },
};
