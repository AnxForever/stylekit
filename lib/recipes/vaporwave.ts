// Vaporwave Component Recipes
import type { StyleRecipes } from "./types";

export const vaporwaveRecipes: StyleRecipes = {
  styleSlug: "vaporwave",
  styleName: "Vaporwave",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Neon gradient button with glow effect and retro-futuristic aesthetics",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-bold",
          "rounded-lg",
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
            "bg-gradient-to-r from-[#ff71ce] to-[#01cdfe] text-white",
            "shadow-[0_0_20px_rgba(255,113,206,0.5)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-gradient-to-r from-[#01cdfe] to-[#05ffa1] text-black",
            "shadow-[0_0_20px_rgba(1,205,254,0.5)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#ff71ce]",
            "border-2 border-[#ff71ce]",
            "shadow-[0_0_10px_rgba(255,113,206,0.3)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_30px_rgba(255,113,206,0.7)]",
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
      description: "Semi-transparent gradient card with glowing border and backdrop blur",
      skeleton: {
        element: "div",
        baseClasses: [
          "backdrop-blur-md",
          "rounded-xl",
          "border border-[#ff71ce]/30",
          "transition-all duration-300",
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
            "bg-gradient-to-br from-[#ff71ce]/10 to-[#01cdfe]/10",
            "shadow-[0_0_15px_rgba(255,113,206,0.2)]",
          ],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: [
            "bg-gradient-to-br from-[#01cdfe]/20 to-[#05ffa1]/20",
            "border-[#05ffa1]/30",
            "shadow-[0_0_15px_rgba(5,255,161,0.2)]",
          ],
        },
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: [
            "bg-gradient-to-br from-[#2d1b69]/60 to-[#11001c]/60",
            "shadow-[0_0_15px_rgba(255,113,206,0.15)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_25px_rgba(255,113,206,0.4)]",
          "hover:border-[#ff71ce]/50",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Neon-glow input with translucent background and glowing focus",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-white/5",
          "backdrop-blur-sm",
          "rounded-lg",
          "border border-[#ff71ce]/30",
          "text-white",
          "placeholder:text-white/40",
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
        filled: {
          id: "filled",
          label: "Filled",
          labelZh: "填充",
          classes: ["bg-[#2d1b69]/40"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#ff71ce]",
          "focus:shadow-[0_0_15px_rgba(255,113,206,0.4)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
  },
};
