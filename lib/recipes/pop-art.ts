// Pop Art Component Recipes
import type { StyleRecipes } from "./types";

export const popArtRecipes: StyleRecipes = {
  styleSlug: "pop-art",
  styleName: "Pop Art",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Bold comic-book button with thick black border, flat color fill and hard offset shadow",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-black",
          "uppercase",
          "tracking-wider",
          "border-4 border-black",
          "rounded-lg",
          "transition-all duration-150",
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
            "bg-[#ffdd00] text-black",
            "shadow-[4px_4px_0_#000]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#ff69b4] text-white",
            "shadow-[4px_4px_0_#000]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-white text-black",
            "shadow-[4px_4px_0_#000]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "POW!", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[6px_6px_0_#000]",
          "hover:-translate-x-0.5 hover:-translate-y-0.5",
        ],
        active: [
          "active:shadow-[2px_2px_0_#000]",
          "active:translate-x-0.5 active:translate-y-0.5",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Comic-style card with thick border, hard shadow, and optional Ben-Day dot background",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "border-4 border-black",
          "rounded-lg",
          "transition-all duration-150",
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
          trueClasses: "hover:-translate-x-1 hover:-translate-y-1 cursor-pointer",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "shadow-[6px_6px_0_#000]",
          ],
        },
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: [
            "bg-[#ff69b4]",
            "text-white",
            "shadow-[6px_6px_0_#000]",
          ],
        },
        blue: {
          id: "blue",
          label: "Blue",
          labelZh: "蓝色",
          classes: [
            "bg-[#00bfff]",
            "text-white",
            "shadow-[6px_6px_0_#000]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[8px_8px_0_#000]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Bold input with thick black border and colored focus shadow",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-white",
          "border-4 border-black",
          "rounded-lg",
          "font-bold",
          "text-black",
          "placeholder:text-gray-400",
          "focus:outline-none",
          "transition-all duration-150",
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
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: [
            "focus:border-[#ff69b4]",
            "focus:shadow-[4px_4px_0_#ff69b4]",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#ff69b4]",
          "focus:shadow-[4px_4px_0_#ff69b4]",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-gray-100"],
      },
    },
  },
};
