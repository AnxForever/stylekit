// Watercolor Art Component Recipes
import type { StyleRecipes } from "./types";

export const watercolorArtRecipes: StyleRecipes = {
  styleSlug: "watercolor-art",
  styleName: "Watercolor Art",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description:
        "Pigment-fill button with radial gradient simulating watercolor pooling, soft blur shadows, and organic rounded corners",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-serif",
          "font-medium",
          "tracking-wide",
          "rounded-2xl",
          "transition-all duration-500 ease-in-out",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            {
              value: "sm",
              label: "Small",
              labelZh: "小",
              classes: "px-5 py-2 text-sm",
            },
            {
              value: "md",
              label: "Medium",
              labelZh: "中",
              classes: "px-6 py-3 md:px-8 md:py-3.5 text-sm md:text-base",
            },
            {
              value: "lg",
              label: "Large",
              labelZh: "大",
              classes: "px-8 py-4 md:px-10 md:py-4.5 text-base md:text-lg",
            },
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
            "bg-[#d4a0a0] text-[#5a3e3e]",
            "shadow-[0_4px_20px_rgba(212,160,160,0.25),inset_0_1px_0_rgba(255,255,255,0.15)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#7bb8d4]/70 text-[#2a4a5a]",
            "shadow-[0_4px_20px_rgba(123,184,212,0.20)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#d4a0a0]",
            "border border-[#d4a0a0]/25",
          ],
        },
        sage: {
          id: "sage",
          label: "Sage",
          labelZh: "鼠尾草",
          classes: [
            "bg-[#8cc5a8]/70 text-[#2a4a3a]",
            "shadow-[0_4px_20px_rgba(140,197,168,0.20)]",
          ],
        },
      },
      slots: [
        {
          id: "icon",
          label: "Icon",
          labelZh: "图标",
          required: false,
          type: "icon",
        },
        {
          id: "label",
          label: "Label",
          labelZh: "文字",
          required: true,
          default: "Paint",
          type: "text",
        },
      ],
      states: {
        hover: [
          "hover:scale-[1.02]",
          "hover:shadow-[0_6px_28px_rgba(212,160,160,0.30)]",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-35 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description:
        "Paper-textured card with organic rounded corners, watercolor wash hover effect, and bleeding-edge shadows",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#faf6f0]/80",
          "rounded-3xl",
          "border border-[#d4a0a0]/15",
          "shadow-[0_2px_20px_rgba(212,160,160,0.10)]",
          "transition-all duration-500 ease-in-out",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            {
              value: "sm",
              label: "Small",
              labelZh: "小",
              classes: "p-5 md:p-6",
            },
            {
              value: "md",
              label: "Medium",
              labelZh: "中",
              classes: "p-6 md:p-8",
            },
            {
              value: "lg",
              label: "Large",
              labelZh: "大",
              classes: "p-8 md:p-10",
            },
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
          classes: [],
        },
        rose: {
          id: "rose",
          label: "Rose",
          labelZh: "玫瑰",
          classes: ["border-[#d4a0a0]/20"],
        },
        cerulean: {
          id: "cerulean",
          label: "Cerulean",
          labelZh: "天蓝",
          classes: ["border-[#7bb8d4]/20"],
        },
        sage: {
          id: "sage",
          label: "Sage",
          labelZh: "鼠尾草",
          classes: ["border-[#8cc5a8]/20"],
        },
      },
      slots: [
        {
          id: "title",
          label: "Title",
          labelZh: "标题",
          required: false,
          default: "Card Title",
          type: "text",
        },
        {
          id: "children",
          label: "Content",
          labelZh: "内容",
          required: true,
          default: "Card content goes here",
          type: "children",
        },
      ],
      states: {
        hover: [
          "hover:shadow-[0_8px_32px_rgba(212,160,160,0.18)]",
          "hover:border-[#d4a0a0]/25",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description:
        "Delicate watercolor-style input with paper texture, organic corners, and soft watercolor wash focus state",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-2xl",
          "border border-[#d4a0a0]/20",
          "bg-[#faf6f0]",
          "text-[#5a3e3e]",
          "placeholder:text-[#d4a0a0]/35",
          "font-serif",
          "focus:outline-none",
          "transition-all duration-500 ease-in-out",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            {
              value: "sm",
              label: "Small",
              labelZh: "小",
              classes: "px-4 py-2.5 text-sm",
            },
            {
              value: "md",
              label: "Medium",
              labelZh: "中",
              classes: "px-5 py-3 md:py-3.5 text-sm md:text-base",
            },
            {
              value: "lg",
              label: "Large",
              labelZh: "大",
              classes: "px-6 py-4 text-base md:text-lg",
            },
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
        cerulean: {
          id: "cerulean",
          label: "Cerulean",
          labelZh: "天蓝",
          classes: [
            "border-[#7bb8d4]/20",
            "placeholder:text-[#7bb8d4]/35",
          ],
        },
        sage: {
          id: "sage",
          label: "Sage",
          labelZh: "鼠尾草",
          classes: [
            "border-[#8cc5a8]/20",
            "placeholder:text-[#8cc5a8]/35",
          ],
        },
      },
      slots: [
        {
          id: "placeholder",
          label: "Placeholder",
          labelZh: "占位符",
          required: false,
          default: "Type softly...",
          type: "text",
        },
      ],
      states: {
        focus: [
          "focus:border-[#d4a0a0]/35",
          "focus:shadow-[0_0_0_3px_rgba(212,160,160,0.10)]",
        ],
        disabled: ["opacity-35 cursor-not-allowed"],
      },
    },
  },
};
