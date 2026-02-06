// Skeuomorphism Component Recipes
import type { StyleRecipes } from "./types";

export const skeuomorphismRecipes: StyleRecipes = {
  styleSlug: "skeuomorphism",
  styleName: "Skeuomorphism",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Realistic 3D button with gradient surface, inset shadows and tactile depth",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-bold",
          "rounded-lg",
          "border border-[#a89880]",
          "shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)]",
          "transition-all duration-200 ease-out",
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
            "bg-gradient-to-b from-[#b8a88a] to-[#8b7355] text-white",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-gradient-to-b from-[#e8dfd1] to-[#d4c4a8] text-[#3a2f22]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-gradient-to-b from-white to-[#f5efe6] text-[#3a2f22]",
            "border-[#c9b896]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:-translate-y-px",
          "hover:shadow-[0_6px_12px_rgba(0,0,0,0.2),0_4px_6px_rgba(0,0,0,0.18)]",
        ],
        active: [
          "active:translate-y-px",
          "active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Textured surface card with gradient background and realistic depth shadows",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-gradient-to-b from-[#e8dfd1] to-[#d4c4a8]",
          "rounded-lg",
          "border border-[#a89880]",
          "shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)]",
          "transition-all duration-200 ease-out",
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
          trueClasses: "hover:-translate-y-px cursor-pointer",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
        raised: {
          id: "raised",
          label: "Raised",
          labelZh: "凸起",
          classes: [
            "shadow-[0_10px_20px_rgba(0,0,0,0.19),0_6px_6px_rgba(0,0,0,0.23)]",
          ],
        },
        inset: {
          id: "inset",
          label: "Inset",
          labelZh: "凹入",
          classes: [
            "shadow-[inset_0_2px_6px_rgba(0,0,0,0.15)]",
            "bg-gradient-to-b from-[#d4c4a8] to-[#e8dfd1]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_14px_28px_rgba(0,0,0,0.25),0_10px_10px_rgba(0,0,0,0.22)]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Realistic inset input field with textured background and depth effect",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-lg",
          "border border-[#a89880]",
          "bg-[#f5efe6]",
          "shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]",
          "font-sans",
          "text-[#3a2f22]",
          "placeholder:text-[#8b7355]",
          "focus:outline-none",
          "transition-all duration-200 ease-out",
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
        embossed: {
          id: "embossed",
          label: "Embossed",
          labelZh: "浮雕",
          classes: [
            "shadow-[inset_0_1px_3px_rgba(0,0,0,0.15),0_1px_0px_rgba(255,255,255,0.5)]",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:shadow-[0_3px_6px_rgba(0,0,0,0.16),0_3px_6px_rgba(0,0,0,0.23)]",
          "focus:border-[#8b7355]",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-[#e8dfd1]"],
      },
    },
  },
};
