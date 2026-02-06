// Neon Samurai Component Recipes
import type { StyleRecipes } from "./types";

export const neonSamuraiRecipes: StyleRecipes = {
  styleSlug: "neon-samurai",
  styleName: "Neon Samurai",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Sharp-edged button with katana slash corner marks and dual-color neon glow",
      skeleton: {
        element: "button",
        baseClasses: [
          "relative",
          "font-sans",
          "font-bold",
          "uppercase",
          "tracking-widest",
          "border border-[#dc2626]/60",
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
        {
          id: "slashCorners",
          label: "Slash Corner Marks",
          labelZh: "斜切角标",
          type: "boolean",
          default: true,
          trueClasses: "before:content-[''] before:absolute before:top-0 before:right-0 before:w-3 before:h-3 before:border-t before:border-r before:border-[#a020f0] after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-3 after:h-3 after:border-b after:border-l after:border-[#a020f0]",
        },
      ],
      variants: {
        primary: {
          id: "primary",
          label: "Primary",
          labelZh: "主要",
          classes: [
            "bg-[#dc2626] text-white",
            "shadow-[0_0_15px_rgba(220,38,38,0.5)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#080818] text-[#dc2626]",
            "border-[#dc2626]",
            "shadow-[0_0_10px_rgba(220,38,38,0.3)]",
          ],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: [
            "bg-[#a020f0] text-white",
            "border-[#a020f0]/60",
            "shadow-[0_0_15px_rgba(160,32,240,0.5)]",
          ],
        },
        dualGlow: {
          id: "dualGlow",
          label: "Dual Glow",
          labelZh: "双色辉光",
          classes: [
            "bg-[#080818] text-[#a020f0]",
            "border-[#a020f0]/50",
            "shadow-[0_0_15px_rgba(56,189,248,0.4)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Strike", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]",
          "hover:border-[#dc2626]",
        ],
        active: ["active:scale-95 active:shadow-[0_0_8px_rgba(220,38,38,0.4)]"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Armor-plate styled card with angular clip-path and neon edge glow",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#080818]",
          "border border-[#dc2626]/30",
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
        {
          id: "armorClip",
          label: "Armor Plate Clip",
          labelZh: "甲板裁切",
          type: "boolean",
          default: false,
          trueClasses: "[clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,16px_100%,0_calc(100%-16px))]",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
        neonRed: {
          id: "neonRed",
          label: "Neon Red",
          labelZh: "霓虹红",
          classes: [
            "shadow-[0_0_15px_rgba(220,38,38,0.3)]",
          ],
        },
        neonPurple: {
          id: "neonPurple",
          label: "Neon Purple",
          labelZh: "霓虹紫",
          classes: [
            "border-[#a020f0]/30",
            "shadow-[0_0_15px_rgba(160,32,240,0.3)]",
          ],
        },
        dualGlow: {
          id: "dualGlow",
          label: "Dual Glow",
          labelZh: "双色辉光",
          classes: [
            "border-[#a020f0]/30",
            "shadow-[0_0_15px_rgba(56,189,248,0.25)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]",
          "hover:border-[#dc2626]/60",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Brush-stroke underline input with dual-color neon glow focus",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "border-b-2 border-[#dc2626]/30",
          "bg-transparent",
          "text-white",
          "placeholder:text-white/25",
          "font-sans",
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
        neon: {
          id: "neon",
          label: "Neon",
          labelZh: "霓虹",
          classes: [
            "border-[#dc2626]/40",
          ],
        },
        purple: {
          id: "purple",
          label: "Purple",
          labelZh: "紫色",
          classes: [
            "border-[#a020f0]/30",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Enter command...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#dc2626]",
          "focus:shadow-[0_2px_15px_rgba(56,189,248,0.4)]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
  },
};
