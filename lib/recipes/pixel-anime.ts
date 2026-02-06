// Pixel Anime Component Recipes
import type { StyleRecipes } from "./types";

export const pixelAnimeRecipes: StyleRecipes = {
  styleSlug: "pixel-anime",
  styleName: "Pixel Anime",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Pixel-art anime button with stepped borders and retro game feel",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-mono",
          "font-bold",
          "uppercase",
          "tracking-wider",
          "border-2 border-[#1a1040]",
          "transition-all duration-150 ease-linear",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-1.5 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-6 py-3 md:px-8 md:py-4 text-sm md:text-base" },
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
            "bg-[#4a90d9] text-white",
            "shadow-[4px_4px_0px_#1a1040]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#ff6b6b] text-white",
            "shadow-[4px_4px_0px_#1a1040]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#ffd93d]",
            "border-2 border-[#ffd93d]",
            "shadow-[3px_3px_0px_#1a1040]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "START", type: "text" },
      ],
      states: {
        hover: [
          "hover:translate-x-[2px] hover:translate-y-[2px]",
          "hover:shadow-[2px_2px_0px_#1a1040]",
        ],
        active: ["active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Pixel-art game panel with stepped border and retro palette",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#2d1b69]",
          "border-2 border-[#1a1040]",
          "shadow-[4px_4px_0px_#1a1040]",
          "transition-all duration-150 ease-linear",
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
            { value: "lg", label: "Large", labelZh: "大", classes: "p-5 md:p-8" },
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
            "border-[#ffd93d]",
          ],
        },
        red: {
          id: "red",
          label: "Red",
          labelZh: "红色",
          classes: [
            "border-[#ff6b6b]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "QUEST LOG", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Adventure awaits!", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[6px_6px_0px_#1a1040]",
          "hover:border-[#ffd93d]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Pixel-art game input with stepped border and mono font",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-[#1a1040]",
          "border-2 border-[#4a90d9]",
          "text-[#e0e0ff]",
          "placeholder:text-[#e0e0ff]/40",
          "font-mono",
          "focus:outline-none",
          "transition-all duration-150 ease-linear",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-2 py-1.5 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-4 py-3 md:px-5 md:py-4 text-sm md:text-base" },
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
          label: "Gold",
          labelZh: "金色",
          classes: [
            "border-[#ffd93d]",
            "placeholder:text-[#ffd93d]/40",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Enter name...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#ffd93d]",
          "focus:shadow-[2px_2px_0px_#4a90d9]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
  },
};
