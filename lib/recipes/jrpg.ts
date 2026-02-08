// JRPG Component Recipes
import type { StyleRecipes } from "./types";

export const jrpgRecipes: StyleRecipes = {
  styleSlug: "jrpg",
  styleName: "JRPG",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "RPG menu button with beveled borders, gradient background and inset shadow depth",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-bold",
          "tracking-wide",
          "rounded-md",
          "border-2",
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
            "bg-gradient-to-b from-blue-700 to-blue-900 text-[#f0f9ff]",
            "border-blue-500",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_2px_4px_rgba(0,0,0,0.5)]",
          ],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "bg-gradient-to-b from-yellow-500 to-yellow-700 text-slate-900",
            "border-yellow-400",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.5)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-slate-900/80 text-blue-300",
            "border-blue-400/60",
            "shadow-[0_2px_4px_rgba(0,0,0,0.3)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Attack", type: "text" },
      ],
      states: {
        hover: [
          "hover:brightness-110",
          "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_4px_8px_rgba(0,0,0,0.4)]",
        ],
        active: ["active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "RPG menu panel with double borders, corner ornaments and gradient background",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-gradient-to-b from-slate-800 to-slate-900",
          "border-2 border-blue-700",
          "rounded-md",
          "ring-1 ring-blue-400/20",
          "transition-all duration-200",
          "relative",
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
          default: false,
          trueClasses: "hover:border-blue-500 cursor-pointer",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)]",
          ],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "border-[#fbbf24]/60",
            "ring-[#fbbf24]/20",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)]",
          ],
        },
        status: {
          id: "status",
          label: "Status Panel",
          labelZh: "状态面板",
          classes: [
            "bg-gradient-to-b from-slate-900 to-[#0f172a]",
            "border-blue-800",
            "shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_4px_12px_rgba(0,0,0,0.6)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Status", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Panel content", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_6px_16px_rgba(0,0,0,0.5)]",
          "hover:border-blue-600",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "RPG menu input with beveled inset shadow and blue border styling",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-slate-900",
          "border-2 border-blue-700",
          "rounded-md",
          "text-[#f0f9ff]",
          "placeholder:text-blue-300/30",
          "focus:outline-none",
          "shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]",
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
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "border-[#fbbf24]/40",
            "text-[#fbbf24]",
            "placeholder:text-[#fbbf24]/30",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Enter command...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-blue-400",
          "focus:ring-1 focus:ring-blue-400/30",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-slate-950"],
      },
    },
  },
};
