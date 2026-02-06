// Card Stack Component Recipes
import type { StyleRecipes } from "./types";

export const cardStackRecipes: StyleRecipes = {
  styleSlug: "card-stack",
  styleName: "Card Stack",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Rounded navigation button for card stack interaction controls",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-medium",
          "rounded-full",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-4 py-1.5 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base" },
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
            "bg-zinc-900 text-white",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-white text-zinc-900",
            "shadow-lg",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-white/10 text-white",
            "border border-white/20",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-zinc-800",
          "hover:shadow-xl",
        ],
        active: ["active:scale-[0.97]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Stackable card with rounded corners and layered shadow for depth effect",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "rounded-2xl",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "p-4 md:p-6" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-6 md:p-8" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-8 md:p-10" },
          ],
          default: "md",
        },
        {
          id: "interactive",
          label: "Interactive",
          labelZh: "可交互",
          type: "boolean",
          default: true,
          trueClasses: "hover:scale-[1.02] cursor-pointer",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "shadow-xl",
          ],
        },
        stacked: {
          id: "stacked",
          label: "Stacked",
          labelZh: "堆叠",
          classes: [
            "shadow-2xl",
          ],
        },
        ghost: {
          id: "ghost",
          label: "Ghost",
          labelZh: "透明",
          classes: [
            "bg-white/80 backdrop-blur-sm",
            "shadow-lg",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-2xl",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Rounded input with backdrop blur for card stack overlays",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-white/80",
          "backdrop-blur-sm",
          "border border-zinc-200",
          "rounded-xl",
          "text-zinc-900",
          "placeholder:text-zinc-400",
          "focus:outline-none",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-2.5 md:px-5 md:py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-5 py-3 md:px-6 md:py-4 text-base md:text-lg" },
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
        solid: {
          id: "solid",
          label: "Solid",
          labelZh: "实底",
          classes: ["bg-white backdrop-blur-none"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Search cards...", type: "text" },
      ],
      states: {
        focus: [
          "focus:ring-2 focus:ring-purple-500/30",
          "focus:border-purple-400",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
  },
};
