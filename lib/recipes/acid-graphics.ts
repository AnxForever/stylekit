// Acid Graphics Component Recipes
import type { StyleRecipes } from "./types";

export const acidGraphicsRecipes: StyleRecipes = {
  styleSlug: "acid-graphics",
  styleName: "Acid Graphics",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "High-saturation fluorescent button with distorted feel and hard shadows",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-mono",
          "font-bold",
          "uppercase",
          "tracking-widest",
          "rounded-none",
          "transition-all duration-150 ease-out",
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
            "bg-[#39ff14] text-[#0a0a0a]",
            "border-2 border-[#39ff14]",
            "shadow-[4px_4px_0px_#a020f0]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#a020f0] text-[#39ff14]",
            "border-2 border-[#a020f0]",
            "shadow-[4px_4px_0px_#e6ff00]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#39ff14]",
            "border-2 border-[#39ff14]",
            "shadow-[3px_3px_0px_#ff6ec7]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "ACTIVATE", type: "text" },
      ],
      states: {
        hover: [
          "hover:translate-x-[2px] hover:translate-y-[2px]",
          "hover:shadow-[2px_2px_0px_#a020f0]",
          "hover:brightness-110",
        ],
        active: ["active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"],
        disabled: ["opacity-40 cursor-not-allowed grayscale"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Dark card with fluorescent borders, hard offset shadows, and distorted aesthetic",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#0a0a0a]",
          "rounded-none",
          "border-2 border-[#39ff14]",
          "shadow-[5px_5px_0px_#a020f0]",
          "transition-all duration-150 ease-out",
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
        purple: {
          id: "purple",
          label: "Purple",
          labelZh: "紫色",
          classes: [
            "border-[#a020f0]",
            "shadow-[5px_5px_0px_#39ff14]",
          ],
        },
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: [
            "border-[#ff6ec7]",
            "shadow-[5px_5px_0px_#e6ff00]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "ACID_ZONE", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Distorted reality interface", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[8px_8px_0px_#a020f0]",
          "hover:border-[#e6ff00]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Dark input with fluorescent accents and mono typography",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-none",
          "border-2 border-[#39ff14]/60",
          "bg-[#0a0a0a]",
          "text-[#39ff14]",
          "placeholder:text-[#39ff14]/30",
          "font-mono",
          "focus:outline-none",
          "transition-all duration-150 ease-out",
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
        purple: {
          id: "purple",
          label: "Purple",
          labelZh: "紫色",
          classes: [
            "border-[#a020f0]/60",
            "text-[#a020f0]",
            "placeholder:text-[#a020f0]/30",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "ENTER_DATA...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#39ff14]",
          "focus:shadow-[3px_3px_0px_#a020f0]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
  },
};
