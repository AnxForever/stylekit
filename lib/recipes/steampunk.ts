// Steampunk Component Recipes
import type { StyleRecipes } from "./types";

export const steampunkRecipes: StyleRecipes = {
  styleSlug: "steampunk",
  styleName: "Steampunk",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Victorian brass button with metallic gradients, warm glow and ornate styling",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-serif",
          "font-bold",
          "uppercase",
          "tracking-wider",
          "rounded",
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
            "bg-gradient-to-b from-[#b5a642] to-[#8a7d32] text-[#2a1f15]",
            "border border-[#d4c85c]",
            "shadow-[0_0_12px_rgba(181,166,66,0.3),inset_0_1px_0_rgba(255,255,255,0.2)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-transparent text-[#b87333]",
            "border-2 border-[#b87333]",
            "shadow-[0_0_10px_rgba(184,115,51,0.2)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-gradient-to-b from-[#5a5a5a] to-[#3a3a3a] text-[#f5f0e1]",
            "border border-[#6a6a6a]",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.3)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Engage", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_20px_rgba(181,166,66,0.5)]",
          "hover:scale-105",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Dark panel with copper border, corner rivets and Victorian industrial aesthetic",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#2a1f15]",
          "border-2 border-[#b87333]/40",
          "rounded",
          "transition-all duration-300",
          "relative overflow-hidden",
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
            "shadow-[0_0_15px_rgba(184,115,51,0.15)]",
          ],
        },
        brass: {
          id: "brass",
          label: "Brass",
          labelZh: "黄铜",
          classes: [
            "border-[#b5a642]/40",
            "shadow-[0_0_15px_rgba(181,166,66,0.2)]",
          ],
        },
        iron: {
          id: "iron",
          label: "Iron",
          labelZh: "铸铁",
          classes: [
            "bg-[#1a1a1a]",
            "border-[#4a4a4a]/50",
            "shadow-[0_2px_8px_rgba(0,0,0,0.4)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_25px_rgba(184,115,51,0.3)]",
          "hover:border-[#b87333]/60",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Victorian-styled input with copper border and warm brass focus glow",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-[#2a1f15]",
          "border-2 border-[#b87333]/30",
          "rounded",
          "font-serif",
          "text-[#f5f0e1]",
          "placeholder:text-[#b87333]/30",
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
        brass: {
          id: "brass",
          label: "Brass",
          labelZh: "黄铜",
          classes: [
            "border-[#b5a642]/30",
            "text-[#d4c85c]",
            "placeholder:text-[#b5a642]/30",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Enter cipher key...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#b5a642]",
          "focus:shadow-[0_0_12px_rgba(181,166,66,0.25)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-[#1a1510]"],
      },
    },
  },
};
