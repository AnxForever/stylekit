// Memphis Component Recipes
import type { StyleRecipes } from "./types";

export const memphisRecipes: StyleRecipes = {
  styleSlug: "memphis",
  styleName: "Memphis",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Bold Memphis button with thick border, hard shadow, and bright colors",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-black",
          "uppercase",
          "border-4 border-black",
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
            "bg-yellow-400 text-black",
            "shadow-[6px_6px_0px_#000]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#ff6b6b] text-white",
            "shadow-[6px_6px_0px_#000]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-white text-black",
            "shadow-[6px_6px_0px_#48dbfb]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[3px_3px_0px_#000]",
          "hover:translate-x-[3px] hover:translate-y-[3px]",
        ],
        active: ["active:shadow-none active:translate-x-[6px] active:translate-y-[6px]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Colorful Memphis card with thick border and hard offset shadow",
      skeleton: {
        element: "div",
        baseClasses: [
          "border-4 border-black",
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
            "bg-pink-300",
            "shadow-[8px_8px_0px_#000]",
          ],
        },
        yellow: {
          id: "yellow",
          label: "Yellow",
          labelZh: "黄色",
          classes: [
            "bg-yellow-300",
            "shadow-[8px_8px_0px_#000]",
          ],
        },
        cyan: {
          id: "cyan",
          label: "Cyan",
          labelZh: "青色",
          classes: [
            "bg-[#48dbfb]",
            "shadow-[8px_8px_0px_#000]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[10px_10px_0px_#000]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Memphis-style input with thick border and colored offset shadow",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-white",
          "border-4 border-black",
          "text-black",
          "font-bold",
          "placeholder:text-gray-400",
          "focus:outline-none",
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
          classes: [
            "shadow-[4px_4px_0px_#48dbfb]",
          ],
        },
        red: {
          id: "red",
          label: "Red Shadow",
          labelZh: "红色阴影",
          classes: [
            "shadow-[4px_4px_0px_#ff6b6b]",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:shadow-[4px_4px_0px_#ff6b6b]",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-gray-100"],
      },
    },
  },
};
