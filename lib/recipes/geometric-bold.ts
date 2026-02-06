// Geometric Bold Component Recipes
import type { StyleRecipes } from "./types";

export const geometricBoldRecipes: StyleRecipes = {
  styleSlug: "geometric-bold",
  styleName: "Geometric Bold",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Bold button with thick borders, sharp corners, and high contrast",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-bold",
          "uppercase",
          "tracking-widest",
          "border-4 border-black",
          "rounded-none",
          "transition-colors duration-200",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "px-6 py-3 md:px-8 md:py-4 text-sm md:text-base" },
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
            "bg-black text-white",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-white text-black",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-black",
            "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-red-500 hover:text-white hover:border-red-500",
        ],
        active: ["active:bg-blue-600 active:border-blue-600 active:text-white"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Bold card with thick border, sharp corners, and offset shadow",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "border-4 border-black",
          "rounded-none",
          "relative",
          "transition-all duration-200",
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
          classes: [
            "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
          ],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: [
            "shadow-[4px_4px_0px_0px_rgba(255,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(255,0,0,1)]",
          ],
        },
        inverted: {
          id: "inverted",
          label: "Inverted",
          labelZh: "反色",
          classes: [
            "bg-black text-white border-white",
            "shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] md:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[6px_6px_0px_0px_rgba(0,0,255,1)]",
          "md:hover:shadow-[10px_10px_0px_0px_rgba(0,0,255,1)]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Bold input with thick border, sharp corners, and color focus",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-white",
          "border-4 border-black",
          "rounded-none",
          "text-black",
          "font-medium",
          "placeholder:text-gray-400",
          "focus:outline-none",
          "transition-colors duration-200",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "px-3.5 py-3 md:px-4 md:py-4 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-4 py-4 md:px-5 md:py-5 text-base md:text-lg" },
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
        offset: {
          id: "offset",
          label: "Offset Shadow",
          labelZh: "偏移阴影",
          classes: [
            "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "TYPE HERE...", type: "text" },
      ],
      states: {
        focus: [
          "focus:bg-yellow-300",
          "focus:border-black",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-gray-100"],
      },
    },
  },
};
