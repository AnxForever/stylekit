// Cyber Anime Component Recipes
import type { StyleRecipes } from "./types";

export const cyberAnimeRecipes: StyleRecipes = {
  styleSlug: "cyber-anime",
  styleName: "Cyber Anime",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Sci-fi holographic button with neon glow and sharp edges",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-sans",
          "font-bold",
          "uppercase",
          "tracking-widest",
          "border",
          "border-[#06d6a0]/50",
          "transition-all duration-300 ease-out",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-2.5 md:px-6 md:py-3 text-xs md:text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-7 py-3 md:px-8 md:py-4 text-sm md:text-base" },
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
            "bg-[#7c3aed] text-white",
            "shadow-[0_0_15px_rgba(124,58,237,0.5)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-transparent text-[#06d6a0]",
            "border-[#06d6a0]",
            "shadow-[0_0_10px_rgba(6,214,160,0.3)]",
          ],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: [
            "bg-[#ff006e] text-white",
            "border-[#ff006e]",
            "shadow-[0_0_15px_rgba(255,0,110,0.5)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "EXECUTE", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_25px_rgba(124,58,237,0.7)]",
          "hover:border-[#06d6a0]",
        ],
        active: ["active:scale-95"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Holographic data panel with neon borders and dark backdrop",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#0f0f1a]/90",
          "border border-[#7c3aed]/30",
          "backdrop-blur-sm",
          "transition-all duration-300 ease-out",
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
          classes: [],
        },
        glow: {
          id: "glow",
          label: "Glow",
          labelZh: "发光",
          classes: [
            "shadow-[0_0_20px_rgba(124,58,237,0.3)]",
          ],
        },
        neon: {
          id: "neon",
          label: "Neon",
          labelZh: "霓虹",
          classes: [
            "border-[#06d6a0]/50",
            "shadow-[0_0_15px_rgba(6,214,160,0.2)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "DATA PANEL", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "System status nominal", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]",
          "hover:border-[#7c3aed]/60",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Sci-fi terminal input with neon focus glow",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-[#0f0f1a]/80",
          "border border-[#7c3aed]/30",
          "text-[#e0e0ff]",
          "placeholder:text-[#e0e0ff]/30",
          "font-mono",
          "focus:outline-none",
          "transition-all duration-300 ease-out",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2.5 md:px-4 md:py-3 text-xs md:text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-5 py-3 md:px-5 md:py-4 text-sm md:text-base" },
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
        cyan: {
          id: "cyan",
          label: "Cyan",
          labelZh: "青色",
          classes: [
            "border-[#06d6a0]/40",
            "placeholder:text-[#06d6a0]/30",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Enter command...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#06d6a0]",
          "focus:shadow-[0_0_15px_rgba(6,214,160,0.3)]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
  },
};
