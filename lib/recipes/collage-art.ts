// Collage Art Component Recipes
import type { StyleRecipes } from "./types";

export const collageArtRecipes: StyleRecipes = {
  styleSlug: "collage-art",
  styleName: "Collage Art",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Paper cutout-style button with torn edges and mixed-media feel",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-bold",
          "uppercase",
          "tracking-wider",
          "rounded-sm",
          "transition-all duration-200 ease-in-out",
          "rotate-[-0.5deg]",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-2.5 md:px-7 md:py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-7 py-3 md:px-9 md:py-4 text-base md:text-lg" },
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
            "bg-[#e74c3c] text-white",
            "shadow-[4px_4px_0px_#2d2d2d]",
            "border-2 border-[#2d2d2d]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#3498db] text-white",
            "shadow-[4px_4px_0px_#2d2d2d]",
            "border-2 border-[#2d2d2d]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-[#f5f0e8] text-[#2d2d2d]",
            "border-2 border-[#2d2d2d] border-dashed",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Cut & Paste", type: "text" },
      ],
      states: {
        hover: [
          "hover:rotate-0",
          "hover:translate-x-[1px] hover:translate-y-[1px]",
          "hover:shadow-[2px_2px_0px_#2d2d2d]",
        ],
        active: ["active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Layered paper cutout card with mixed materials and slight rotation",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#f5f0e8]",
          "rounded-none",
          "border-2 border-[#2d2d2d]",
          "shadow-[5px_5px_0px_#2d2d2d]",
          "transition-all duration-200 ease-in-out",
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
          trueClasses: "hover:rotate-0 cursor-pointer",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "rotate-[0.5deg]",
          ],
        },
        red: {
          id: "red",
          label: "Red",
          labelZh: "红色",
          classes: [
            "rotate-[-1deg]",
            "border-[#e74c3c]",
            "shadow-[5px_5px_0px_#e74c3c]",
          ],
        },
        blue: {
          id: "blue",
          label: "Blue",
          labelZh: "蓝色",
          classes: [
            "rotate-[1deg]",
            "border-[#3498db]",
            "shadow-[5px_5px_0px_#3498db]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[7px_7px_0px_#2d2d2d]",
          "hover:-translate-y-1",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Newspaper cutout-style input with mixed typography and paper texture",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-none",
          "border-2 border-[#2d2d2d]",
          "bg-[#f5f0e8]",
          "text-[#2d2d2d]",
          "placeholder:text-[#2d2d2d]/40",
          "focus:outline-none",
          "transition-all duration-200 ease-in-out",
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
        dashed: {
          id: "dashed",
          label: "Dashed",
          labelZh: "虚线",
          classes: [
            "border-dashed",
            "border-[#2d2d2d]/60",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#e74c3c]",
          "focus:shadow-[3px_3px_0px_#2d2d2d]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
  },
};
