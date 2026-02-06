// Pixel Art Component Recipes
import type { StyleRecipes } from "./types";

export const pixelArtRecipes: StyleRecipes = {
  styleSlug: "pixel-art",
  styleName: "Pixel Art",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Retro pixel-style button with hard edges and 8-bit aesthetics",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-mono",
          "font-bold",
          "border-2 border-black",
          "rounded-none",
          "uppercase",
          "tracking-wider",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-1.5 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2 md:px-6 md:py-3 text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-6 py-3 md:px-8 md:py-4 text-base" },
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
            "bg-[#306230] text-[#8bac0f]",
            "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#0f380f] text-[#9bbc0f]",
            "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-black",
            "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "START", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-none",
          "hover:translate-x-[4px] hover:translate-y-[4px]",
        ],
        active: ["active:translate-x-[4px] active:translate-y-[4px]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Pixel grid card with retro game-style borders",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#e0d8b0]",
          "border-4 border-black",
          "rounded-none",
          "font-mono",
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
          trueClasses: "cursor-pointer",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
          ],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: [
            "bg-[#9bbc0f]",
            "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
          ],
        },
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: [
            "bg-[#0f380f] text-[#9bbc0f]",
            "shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-none",
          "hover:translate-x-[6px] hover:translate-y-[6px]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Pixel-style input with sharp corners and mono font",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "border-2 border-black",
          "rounded-none",
          "bg-[#e0d8b0]",
          "font-mono",
          "text-black",
          "placeholder:text-black/40",
          "focus:outline-none",
          "transition-shadow duration-150",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "px-3 py-2 md:px-4 md:py-3 text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-4 py-3 md:px-5 md:py-4 text-base" },
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
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: ["bg-[#0f380f] text-[#9bbc0f] placeholder:text-[#9bbc0f]/40 border-[#306230]"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Enter text...", type: "text" },
      ],
      states: {
        focus: [
          "focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-gray-200"],
      },
    },
  },
};
