// Ukiyo-e Digital Component Recipes
import type { StyleRecipes } from "./types";

export const ukiyoEDigitalRecipes: StyleRecipes = {
  styleSlug: "ukiyo-e-digital",
  styleName: "Ukiyo-e Digital",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Japanese woodblock print inspired button with strong outlines and flat color fills",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-bold",
          "tracking-wider",
          "rounded-sm",
          "border-2",
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
            "bg-[#d4553a] text-[#f5f0e1]",
            "border-[#1a3055]",
            "shadow-[3px_3px_0px_#1a3055]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#1a3055] text-[#f5f0e1]",
            "border-[#c9a227]",
            "shadow-[3px_3px_0px_#c9a227]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#1a3055]",
            "border-[#1a3055]",
            "shadow-[3px_3px_0px_#1a3055]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[4px_4px_0px_#1a3055]",
          "hover:-translate-y-0.5",
        ],
        active: ["active:shadow-[1px_1px_0px_#1a3055] active:translate-y-0.5"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Woodblock print style card with strong outlines and flat color areas",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#f5f0e1]",
          "rounded-sm",
          "border-2 border-[#1a3055]",
          "shadow-[4px_4px_0px_#1a3055]",
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
        vermilion: {
          id: "vermilion",
          label: "Vermilion",
          labelZh: "朱红",
          classes: [
            "border-[#d4553a]",
            "shadow-[4px_4px_0px_#d4553a]",
          ],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金叶",
          classes: [
            "border-[#c9a227]",
            "shadow-[4px_4px_0px_#c9a227]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[6px_6px_0px_#1a3055]",
          "hover:border-[#d4553a]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Woodblock print inspired input with strong outlines on rice paper background",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-sm",
          "border-2 border-[#1a3055]/60",
          "bg-[#f5f0e1]",
          "text-[#1a3055]",
          "placeholder:text-[#1a3055]/40",
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
        vermilion: {
          id: "vermilion",
          label: "Vermilion",
          labelZh: "朱红",
          classes: [
            "border-[#d4553a]/60",
            "text-[#d4553a]",
            "placeholder:text-[#d4553a]/40",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#d4553a]",
          "focus:shadow-[2px_2px_0px_#d4553a]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
  },
};
