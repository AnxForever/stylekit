// Pixel Anime Component Recipes
import type { StyleRecipes } from "./types";

export const pixelAnimeRecipes: StyleRecipes = {
  styleSlug: "pixel-anime",
  styleName: "Pixel Anime",
  recipes: {
    button: {
      id: "button",
      name: "RPG Menu Button",
      nameZh: "RPG菜单按钮",
      description:
        "Classic JRPG menu button with corner block decorations, pixel-perfect 2px borders, hard offset shadow, and step-based hover translation",
      skeleton: {
        element: "button",
        baseClasses: [
          "relative",
          "font-mono",
          "font-bold",
          "uppercase",
          "tracking-wider",
          "border-2 border-[#1a1040]",
          "shadow-[4px_4px_0px_#1a1040]",
          "transition-all duration-150 ease-linear",
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
              classes: "px-3 py-1.5 text-xs",
            },
            {
              value: "md",
              label: "Medium",
              labelZh: "中",
              classes: "px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm",
            },
            {
              value: "lg",
              label: "Large",
              labelZh: "大",
              classes: "px-6 py-3 md:px-8 md:py-4 text-sm md:text-base",
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
          id: "cornerBlocks",
          label: "Corner Blocks",
          labelZh: "角块装饰",
          type: "boolean",
          default: false,
          trueClasses: "pa-corner-blocks",
        },
      ],
      variants: {
        primary: {
          id: "primary",
          label: "Primary",
          labelZh: "主要",
          classes: ["bg-[#4a90d9] text-white"],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: ["bg-[#ff6b6b] text-white"],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "bg-transparent text-[#ffd93d]",
            "border-2 border-[#ffd93d]",
            "shadow-[3px_3px_0px_#1a1040]",
          ],
        },
        green: {
          id: "green",
          label: "Green",
          labelZh: "绿色",
          classes: ["bg-[#50c878] text-white"],
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
          default: "ATTACK",
          type: "text",
        },
      ],
      states: {
        hover: [
          "hover:translate-x-[2px] hover:translate-y-[2px]",
          "hover:shadow-[2px_2px_0px_#1a1040]",
        ],
        active: [
          "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "RPG Dialogue Box",
      nameZh: "RPG对话框",
      description:
        "Classic JRPG dialogue window with pixel frame border, inner double-border effect, and four corner block decorations at 8x8px. Referencing Final Fantasy and Dragon Quest menu systems",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-[#1a1040]",
          "border-2 border-[#4a90d9]",
          "shadow-[4px_4px_0px_#1a1040]",
          "transition-all duration-150 ease-linear",
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
              classes: "p-3 md:p-4",
            },
            {
              value: "md",
              label: "Medium",
              labelZh: "中",
              classes: "p-4 md:p-6",
            },
            {
              value: "lg",
              label: "Large",
              labelZh: "大",
              classes: "p-5 md:p-8",
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
          trueClasses: "hover:-translate-y-1 cursor-pointer",
        },
        {
          id: "cornerBlocks",
          label: "Corner Blocks",
          labelZh: "角块装饰",
          type: "boolean",
          default: true,
          trueClasses: "pa-dialog-frame",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: ["border-[#4a90d9]"],
        },
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: ["border-[#ffd93d]"],
        },
        red: {
          id: "red",
          label: "Red",
          labelZh: "红色",
          classes: ["border-[#ff6b6b]"],
        },
        green: {
          id: "green",
          label: "Green",
          labelZh: "绿色",
          classes: ["border-[#50c878]"],
        },
      },
      slots: [
        {
          id: "title",
          label: "Title",
          labelZh: "标题",
          required: false,
          default: "QUEST LOG",
          type: "text",
        },
        {
          id: "children",
          label: "Content",
          labelZh: "内容",
          required: true,
          default: "Adventure awaits!",
          type: "children",
        },
      ],
      states: {
        hover: [
          "hover:shadow-[6px_6px_0px_#1a1040]",
          "hover:border-[#ffd93d]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Pixel Input",
      nameZh: "像素输入框",
      description:
        "Pixel-art game input with 2px stepped border, monospace font, pixel-aligned focus shadow, and blinking gold caret",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-[#1a1040]",
          "border-2 border-[#4a90d9]",
          "text-[#e0e0ff]",
          "placeholder:text-[#e0e0ff]/40",
          "placeholder:uppercase",
          "font-mono",
          "caret-[#ffd93d]",
          "focus:outline-none",
          "transition-all duration-150 ease-linear",
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
              classes: "px-2 py-1.5 text-xs",
            },
            {
              value: "md",
              label: "Medium",
              labelZh: "中",
              classes: "px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm",
            },
            {
              value: "lg",
              label: "Large",
              labelZh: "大",
              classes: "px-4 py-3 md:px-5 md:py-4 text-sm md:text-base",
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
        gold: {
          id: "gold",
          label: "Gold",
          labelZh: "金色",
          classes: [
            "border-[#ffd93d]",
            "placeholder:text-[#ffd93d]/40",
          ],
        },
        red: {
          id: "red",
          label: "Red",
          labelZh: "红色",
          classes: [
            "border-[#ff6b6b]",
            "placeholder:text-[#ff6b6b]/40",
          ],
        },
      },
      slots: [
        {
          id: "placeholder",
          label: "Placeholder",
          labelZh: "占位符",
          required: false,
          default: "ENTER NAME...",
          type: "text",
        },
      ],
      states: {
        focus: [
          "focus:border-[#ffd93d]",
          "focus:shadow-[2px_2px_0px_#4a90d9]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
  },
};
