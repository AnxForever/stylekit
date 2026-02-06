// Hand-Drawn Doodle Component Recipes
import type { StyleRecipes } from "./types";

export const handDrawnDoodleRecipes: StyleRecipes = {
  styleSlug: "hand-drawn-doodle",
  styleName: "Hand-Drawn Doodle",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Hand-drawn button with dashed border, marker-color shadow, and slight tilt on hover",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-sans",
          "font-semibold",
          "tracking-wide",
          "rounded-sm",
          "border-2 border-dashed",
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
          label: "Ink",
          labelZh: "墨色",
          classes: [
            "bg-[#2c2c2c] text-[#fffef5]",
            "border-[#2c2c2c]",
            "shadow-[3px_3px_0px_#ff6b6b]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Red Marker",
          labelZh: "红色标记",
          classes: [
            "bg-[#ff6b6b] text-[#fffef5]",
            "border-[#2c2c2c]",
            "shadow-[3px_3px_0px_#4ecdc4]",
          ],
        },
        teal: {
          id: "teal",
          label: "Teal Marker",
          labelZh: "蓝绿标记",
          classes: [
            "bg-[#4ecdc4] text-[#fffef5]",
            "border-[#2c2c2c]",
            "shadow-[3px_3px_0px_#ffd93d]",
          ],
        },
        outline: {
          id: "outline",
          label: "Sketch",
          labelZh: "素描",
          classes: [
            "bg-transparent text-[#2c2c2c]",
            "border-[#2c2c2c]",
            "shadow-[2px_2px_0px_#ffd93d]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Doodle!", type: "text" },
      ],
      states: {
        hover: [
          "hover:translate-x-[1px] hover:translate-y-[1px]",
          "hover:shadow-[2px_2px_0px_#ff6b6b]",
          "hover:rotate-[-0.5deg]",
        ],
        active: ["active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Notebook-paper card with dashed border, marker shadow, and pushpin/tape decorations",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#fffef5]",
          "rounded-sm",
          "border-2 border-dashed border-[#2c2c2c]",
          "shadow-[4px_4px_0px_#4ecdc4]",
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
          trueClasses: "hover:-translate-y-1 cursor-pointer",
        },
        {
          id: "tilted",
          label: "Tilted",
          labelZh: "倾斜",
          type: "boolean",
          default: false,
          trueClasses: "rotate-[1deg]",
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
          label: "Red Marker",
          labelZh: "红色标记",
          classes: [
            "shadow-[4px_4px_0px_#ff6b6b]",
          ],
        },
        yellow: {
          id: "yellow",
          label: "Yellow Marker",
          labelZh: "黄色标记",
          classes: [
            "shadow-[4px_4px_0px_#ffd93d]",
          ],
        },
        teal: {
          id: "teal",
          label: "Teal Marker",
          labelZh: "蓝绿标记",
          classes: [
            "shadow-[4px_4px_0px_#4ecdc4]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Sketch Note", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Scribbled with love and creativity", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[6px_6px_0px_#4ecdc4]",
          "hover:rotate-[0.5deg]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Notebook-style input with dashed border on paper background",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-sm",
          "border-2 border-dashed border-[#2c2c2c]",
          "bg-[#fffef5]",
          "text-[#2c2c2c]",
          "placeholder:text-[#2c2c2c]/30",
          "font-sans",
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
        teal: {
          id: "teal",
          label: "Teal",
          labelZh: "蓝绿",
          classes: [
            "border-[#4ecdc4]",
            "placeholder:text-[#4ecdc4]/30",
          ],
        },
        red: {
          id: "red",
          label: "Red",
          labelZh: "红色",
          classes: [
            "border-[#ff6b6b]",
            "placeholder:text-[#ff6b6b]/30",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Scribble here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#ff6b6b]",
          "focus:shadow-[2px_2px_0px_#ffd93d]",
          "focus:rotate-[-0.3deg]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
  },
};
