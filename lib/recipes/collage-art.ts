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
      description:
        "Paper cutout button with random rotation transform, hard offset shadow, thick border, and mixed-font uppercase text for zine aesthetic",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-bold",
          "uppercase",
          "tracking-wider",
          "rounded-sm",
          "border-2 border-[#2d2d2d]",
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
            {
              value: "sm",
              label: "Small",
              labelZh: "小",
              classes: "px-4 py-1.5 text-sm",
            },
            {
              value: "md",
              label: "Medium",
              labelZh: "中",
              classes: "px-5 py-2.5 md:px-7 md:py-3 text-sm md:text-base",
            },
            {
              value: "lg",
              label: "Large",
              labelZh: "大",
              classes: "px-7 py-3 md:px-9 md:py-4 text-base md:text-lg",
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
        {
          id: "rotation",
          label: "Rotation",
          labelZh: "旋转",
          type: "select",
          options: [
            {
              value: "none",
              label: "None",
              labelZh: "无",
              classes: "",
            },
            {
              value: "ccw",
              label: "Counter-clockwise",
              labelZh: "逆时针",
              classes: "rotate-[-0.7deg]",
            },
            {
              value: "cw",
              label: "Clockwise",
              labelZh: "顺时针",
              classes: "rotate-[0.5deg]",
            },
          ],
          default: "ccw",
        },
      ],
      variants: {
        primary: {
          id: "primary",
          label: "Red Cut",
          labelZh: "红色剪切",
          classes: [
            "bg-[#e74c3c] text-white",
            "shadow-[4px_4px_0px_#2d2d2d]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Blue Cut",
          labelZh: "蓝色剪切",
          classes: [
            "bg-[#3498db] text-white",
            "shadow-[4px_4px_0px_#2d2d2d]",
          ],
        },
        yellow: {
          id: "yellow",
          label: "Yellow Cut",
          labelZh: "黄色剪切",
          classes: [
            "bg-[#f39c12] text-[#2d2d2d]",
            "shadow-[4px_4px_0px_#9b59b6]",
          ],
        },
        outline: {
          id: "outline",
          label: "Dashed",
          labelZh: "虚线",
          classes: [
            "bg-[#f5f0e8] text-[#2d2d2d]",
            "border-dashed",
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
          default: "Cut & Paste",
          type: "text",
        },
      ],
      states: {
        hover: [
          "hover:rotate-0",
          "hover:translate-x-[1px] hover:translate-y-[1px]",
          "hover:shadow-[2px_2px_0px_#2d2d2d]",
        ],
        active: [
          "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description:
        "Layered paper cutout card with random rotation, colored hard offset shadow, washi tape decoration pseudo-element, and torn-edge clip-path option",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#f5f0e8]",
          "rounded-none",
          "border-2 border-[#2d2d2d]",
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
            {
              value: "sm",
              label: "Small",
              labelZh: "小",
              classes: "p-4 md:p-5",
            },
            {
              value: "md",
              label: "Medium",
              labelZh: "中",
              classes: "p-5 md:p-8",
            },
            {
              value: "lg",
              label: "Large",
              labelZh: "大",
              classes: "p-6 md:p-10",
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
        {
          id: "rotation",
          label: "Rotation",
          labelZh: "旋转",
          type: "select",
          options: [
            {
              value: "none",
              label: "None",
              labelZh: "无",
              classes: "",
            },
            {
              value: "slight-cw",
              label: "Slight CW",
              labelZh: "微顺时针",
              classes: "rotate-[0.5deg]",
            },
            {
              value: "slight-ccw",
              label: "Slight CCW",
              labelZh: "微逆时针",
              classes: "rotate-[-1deg]",
            },
            {
              value: "medium-cw",
              label: "Medium CW",
              labelZh: "顺时针",
              classes: "rotate-[1.5deg]",
            },
          ],
          default: "slight-cw",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: ["shadow-[5px_5px_0px_#2d2d2d]"],
        },
        red: {
          id: "red",
          label: "Red",
          labelZh: "红色",
          classes: [
            "border-[#e74c3c]",
            "shadow-[5px_5px_0px_#e74c3c]",
          ],
        },
        blue: {
          id: "blue",
          label: "Blue",
          labelZh: "蓝色",
          classes: [
            "border-[#3498db]",
            "shadow-[5px_5px_0px_#3498db]",
          ],
        },
        yellow: {
          id: "yellow",
          label: "Yellow",
          labelZh: "黄色",
          classes: [
            "border-[#f39c12]",
            "shadow-[5px_5px_0px_#f39c12]",
          ],
        },
        purple: {
          id: "purple",
          label: "Purple",
          labelZh: "紫色",
          classes: [
            "border-[#9b59b6]",
            "shadow-[5px_5px_0px_#9b59b6]",
          ],
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
          "hover:-translate-y-1",
          "hover:shadow-[7px_7px_0px_#2d2d2d]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description:
        "Newspaper cutout input with sharp corners, thick border, mixed-font labels across serif/sans/mono, and hard shadow focus state",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "rounded-none",
          "border-2 border-[#2d2d2d]",
          "bg-[#f5f0e8]",
          "text-[#2d2d2d]",
          "placeholder:text-[#2d2d2d]/30",
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
            {
              value: "sm",
              label: "Small",
              labelZh: "小",
              classes: "px-3 py-2 text-sm",
            },
            {
              value: "md",
              label: "Medium",
              labelZh: "中",
              classes: "px-4 py-2.5 md:px-5 md:py-3 text-sm md:text-base",
            },
            {
              value: "lg",
              label: "Large",
              labelZh: "大",
              classes: "px-5 py-3 md:px-6 md:py-4 text-base md:text-lg",
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
          classes: ["font-serif"],
        },
        sans: {
          id: "sans",
          label: "Sans",
          labelZh: "无衬线",
          classes: ["font-sans"],
        },
        mono: {
          id: "mono",
          label: "Mono",
          labelZh: "等宽",
          classes: ["font-mono text-sm"],
        },
        dashed: {
          id: "dashed",
          label: "Dashed",
          labelZh: "虚线",
          classes: [
            "font-mono text-sm",
            "border-dashed",
            "border-[#2d2d2d]/60",
          ],
        },
      },
      slots: [
        {
          id: "placeholder",
          label: "Placeholder",
          labelZh: "占位符",
          required: false,
          default: "TYPE HERE...",
          type: "text",
        },
      ],
      states: {
        focus: [
          "focus:border-[#e74c3c]",
          "focus:shadow-[3px_3px_0px_#2d2d2d]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
  },
};
