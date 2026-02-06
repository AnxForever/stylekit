// Japanese Fresh Component Recipes
import type { StyleRecipes } from "./types";

export const japaneseFreshRecipes: StyleRecipes = {
  styleSlug: "japanese-fresh",
  styleName: "Japanese Fresh",
  recipes: {
    button: {
      id: "button",
      name: "Whisper Button",
      nameZh: "低语按钮",
      description:
        "Hairline border button with generous padding, barely-visible hover state, and slow meditative transition. Embodies Ma restraint -- the button exists through whitespace, not weight",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-sans",
          "font-light",
          "tracking-wide",
          "rounded-lg",
          "bg-transparent",
          "border border-[#d4d4cf]/40",
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
              classes: "px-6 py-2 text-xs",
            },
            {
              value: "md",
              label: "Medium",
              labelZh: "中",
              classes: "px-8 py-2.5 md:px-10 md:py-3 text-xs md:text-sm",
            },
            {
              value: "lg",
              label: "Large",
              labelZh: "大",
              classes: "px-10 py-3 md:px-12 md:py-3.5 text-sm md:text-base",
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
            "bg-[#64b5f6]/90 text-white",
            "border-[#64b5f6]/30",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-transparent text-[#7a8a9e]",
            "border-[#d4d4cf]/40",
          ],
        },
        mint: {
          id: "mint",
          label: "Mint",
          labelZh: "薄荷",
          classes: [
            "bg-transparent text-[#98d8c8]",
            "border-[#98d8c8]/30",
          ],
        },
        whisper: {
          id: "whisper",
          label: "Whisper",
          labelZh: "低语",
          classes: [
            "bg-transparent text-[#b0b8c4]",
            "border-[#d4d4cf]/20",
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
          default: "Explore",
          type: "text",
        },
      ],
      states: {
        hover: [
          "hover:border-[#64b5f6]/40",
          "hover:text-[#64b5f6]",
        ],
        active: ["active:scale-[0.99]"],
        disabled: ["opacity-30 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Breath Card",
      nameZh: "呼吸卡片",
      description:
        "Card with 0.5px warm gray hairline border, massive inner whitespace (p-10+), no shadows, and optional botanical SVG accent. Elements float in whitespace by their own presence",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "rounded-xl",
          "border border-[#d4d4cf]/30",
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
              classes: "p-6 md:p-8",
            },
            {
              value: "md",
              label: "Medium",
              labelZh: "中",
              classes: "p-8 md:p-10",
            },
            {
              value: "lg",
              label: "Large",
              labelZh: "大",
              classes: "p-10 md:p-12",
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
        mint: {
          id: "mint",
          label: "Mint",
          labelZh: "薄荷",
          classes: [
            "border-[#98d8c8]/25",
          ],
        },
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: [
            "border-[#ffb7c5]/25",
          ],
        },
        sky: {
          id: "sky",
          label: "Sky",
          labelZh: "天蓝",
          classes: [
            "border-[#64b5f6]/20",
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
          default: "Gentle and simple, like morning light through paper screens",
          type: "children",
        },
      ],
      states: {
        hover: [
          "hover:border-[#d4d4cf]/50",
        ],
      },
    },

    input: {
      id: "input",
      name: "Bottom-line Input",
      nameZh: "底线输入框",
      description:
        "Input with bottom border only, floating label style, transparent background, and ultra-subtle focus state. No surrounding frame -- the underline alone defines the field",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "pb-2 pt-0",
          "bg-transparent",
          "border-0 border-b border-[#d4d4cf]",
          "rounded-none",
          "text-[#4a5568]",
          "placeholder:text-[#b0b8c4]/60",
          "font-sans font-light",
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
              classes: "text-xs pb-1.5",
            },
            {
              value: "md",
              label: "Medium",
              labelZh: "中",
              classes: "text-xs md:text-sm pb-2",
            },
            {
              value: "lg",
              label: "Large",
              labelZh: "大",
              classes: "text-sm md:text-base pb-2.5",
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
        mint: {
          id: "mint",
          label: "Mint",
          labelZh: "薄荷",
          classes: [
            "border-b-[#98d8c8]/60",
          ],
        },
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: [
            "border-b-[#ffb7c5]/60",
          ],
        },
      },
      slots: [
        {
          id: "placeholder",
          label: "Placeholder",
          labelZh: "占位符",
          required: false,
          default: " ",
          type: "text",
        },
      ],
      states: {
        focus: [
          "focus:border-b-[#64b5f6]",
        ],
        disabled: ["opacity-30 cursor-not-allowed"],
      },
    },
  },
};
