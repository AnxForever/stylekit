// Visual Novel Component Recipes
import type { StyleRecipes } from "./types";

export const visualNovelRecipes: StyleRecipes = {
  styleSlug: "visual-novel",
  styleName: "Visual Novel",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Visual novel choice button with soft borders and hover highlight",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-sans",
          "font-medium",
          "rounded-lg",
          "border border-[#4a5568]/20",
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
            "bg-[#6366f1] text-white",
            "shadow-sm",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-white/80 text-[#4a5568]",
            "border-[#4a5568]/20",
            "backdrop-blur-sm",
          ],
        },
        choice: {
          id: "choice",
          label: "Choice",
          labelZh: "选项",
          classes: [
            "bg-white/60 text-[#4a5568]",
            "border-[#6366f1]/30",
            "backdrop-blur-sm",
            "text-left",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Continue", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-[#6366f1]/10",
          "hover:border-[#6366f1]/50",
          "hover:shadow-md",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Semi-transparent dialog panel with frosted glass effect",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white/70",
          "rounded-lg",
          "border border-[#4a5568]/10",
          "backdrop-blur-md",
          "shadow-sm",
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
        dialog: {
          id: "dialog",
          label: "Dialog",
          labelZh: "对话",
          classes: [
            "bg-[#1a202c]/80 text-white",
            "border-[#6366f1]/20",
          ],
        },
        narrator: {
          id: "narrator",
          label: "Narrator",
          labelZh: "旁白",
          classes: [
            "bg-white/90",
            "border-[#ec4899]/20",
            "italic",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Chapter 1", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "The story continues...", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-md",
          "hover:border-[#6366f1]/30",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Clean input with soft focus glow for character name entry",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-lg",
          "border border-[#4a5568]/20",
          "bg-white/70",
          "text-[#4a5568]",
          "placeholder:text-[#4a5568]/40",
          "font-sans",
          "backdrop-blur-sm",
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
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "暗色",
          classes: [
            "bg-[#1a202c]/60 text-white",
            "border-[#6366f1]/20",
            "placeholder:text-white/30",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Enter your name...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#6366f1]/50",
          "focus:shadow-[0_0_12px_#6366f120]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
  },
};
