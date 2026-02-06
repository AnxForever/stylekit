// Swiss Poster Component Recipes
import type { StyleRecipes } from "./types";

export const swissPosterRecipes: StyleRecipes = {
  styleSlug: "swiss-poster",
  styleName: "Swiss Poster",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Bold typographic button with sharp edges and color block aesthetic",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-sans",
          "font-black",
          "uppercase",
          "tracking-widest",
          "rounded-none",
          "transition-all duration-100 ease-out",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-4 py-2 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-2.5 md:px-8 md:py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-8 py-3 md:px-10 md:py-4 text-base md:text-lg" },
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
            "bg-[#000000] text-[#ffffff]",
            "border-2 border-[#000000]",
          ],
        },
        red: {
          id: "red",
          label: "Red",
          labelZh: "红色",
          classes: [
            "bg-[#ff0000] text-[#ffffff]",
            "border-2 border-[#ff0000]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#000000]",
            "border-2 border-[#000000]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "ENTER", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-[#ff0000] hover:text-[#ffffff]",
          "hover:border-[#ff0000]",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Grid-aligned card with bold borders and typographic hierarchy",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#ffffff]",
          "rounded-none",
          "border-2 border-[#000000]",
          "transition-all duration-100 ease-out",
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
            { value: "lg", label: "Large", labelZh: "大", classes: "p-8 md:p-12" },
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
        red: {
          id: "red",
          label: "Red Block",
          labelZh: "红色",
          classes: [
            "bg-[#ff0000] text-[#ffffff]",
            "border-[#ff0000]",
          ],
        },
        blue: {
          id: "blue",
          label: "Blue Block",
          labelZh: "蓝色",
          classes: [
            "bg-[#0057b8] text-[#ffffff]",
            "border-[#0057b8]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "HELVETICA", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Grid-aligned content", type: "children" },
      ],
      states: {
        hover: [
          "hover:border-[#ff0000]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Clean input with bold border-bottom and sans-serif typography",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-none",
          "border-0 border-b-2 border-[#000000]",
          "bg-transparent",
          "text-[#000000]",
          "placeholder:text-[#000000]/30",
          "font-sans font-bold",
          "focus:outline-none",
          "transition-all duration-100 ease-out",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-1 py-1.5 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-1 py-2 md:py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-1 py-3 md:py-4 text-base md:text-lg" },
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
        red: {
          id: "red",
          label: "Red",
          labelZh: "红色",
          classes: [
            "border-[#ff0000]",
            "placeholder:text-[#ff0000]/30",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "TYPE HERE", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#ff0000]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
  },
};
