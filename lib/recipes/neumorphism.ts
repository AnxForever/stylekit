// Neumorphism Component Recipes
import type { StyleRecipes } from "./types";

export const neumorphismRecipes: StyleRecipes = {
  styleSlug: "neumorphism",
  styleName: "Neumorphism",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Soft-raised button with dual-shadow neumorphic effect",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-semibold",
          "bg-[#e0e5ec]",
          "text-gray-700",
          "rounded-xl",
          "border-none",
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
            "shadow-[5px_5px_10px_#b8bec7,-5px_-5px_10px_#ffffff]",
          ],
        },
        pressed: {
          id: "pressed",
          label: "Pressed",
          labelZh: "按下",
          classes: [
            "shadow-[inset_5px_5px_10px_#b8bec7,inset_-5px_-5px_10px_#ffffff]",
          ],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: [
            "bg-[#6d5dfc] text-white",
            "shadow-[5px_5px_10px_#b8bec7,-5px_-5px_10px_#ffffff]",
          ],
        },
        flat: {
          id: "flat",
          label: "Flat",
          labelZh: "扁平",
          classes: [],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[3px_3px_6px_#b8bec7,-3px_-3px_6px_#ffffff]",
        ],
        active: [
          "active:shadow-[inset_5px_5px_10px_#b8bec7,inset_-5px_-5px_10px_#ffffff]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Soft-raised card with neumorphic dual-shadow",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#e0e5ec]",
          "rounded-2xl",
          "border-none",
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
          trueClasses: "cursor-pointer",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "shadow-[8px_8px_16px_#b8bec7,-8px_-8px_16px_#ffffff]",
          ],
        },
        inset: {
          id: "inset",
          label: "Inset",
          labelZh: "内凹",
          classes: [
            "shadow-[inset_8px_8px_16px_#b8bec7,inset_-8px_-8px_16px_#ffffff]",
          ],
        },
        flat: {
          id: "flat",
          label: "Flat",
          labelZh: "扁平",
          classes: [],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[10px_10px_20px_#b8bec7,-10px_-10px_20px_#ffffff]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Sunken input field with inset neumorphic shadow",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-[#e0e5ec]",
          "rounded-xl",
          "border-none",
          "text-gray-700",
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
          classes: [
            "shadow-[inset_5px_5px_10px_#b8bec7,inset_-5px_-5px_10px_#ffffff]",
          ],
        },
        raised: {
          id: "raised",
          label: "Raised",
          labelZh: "凸起",
          classes: [
            "shadow-[5px_5px_10px_#b8bec7,-5px_-5px_10px_#ffffff]",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:shadow-[inset_3px_3px_6px_#b8bec7,inset_-3px_-3px_6px_#ffffff]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    heading: {
      id: "heading",
      name: "Heading",
      nameZh: "标题",
      description: "Neumorphic heading with soft text styling",
      skeleton: {
        element: "div",
        baseClasses: [
          "font-bold",
          "tracking-tight",
          "leading-tight",
          "text-gray-700",
        ],
      },
      parameters: [
        {
          id: "level",
          label: "Level",
          labelZh: "层级",
          type: "select",
          options: [
            { value: "hero", label: "Hero", labelZh: "主标题", classes: "text-4xl md:text-6xl lg:text-8xl" },
            { value: "h1", label: "H1", labelZh: "一级", classes: "text-3xl md:text-5xl" },
            { value: "h2", label: "H2", labelZh: "二级", classes: "text-2xl md:text-4xl" },
            { value: "h3", label: "H3", labelZh: "三级", classes: "text-xl md:text-2xl" },
          ],
          default: "h1",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: ["text-gray-700"],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: ["text-[#6d5dfc]"],
        },
        muted: {
          id: "muted",
          label: "Muted",
          labelZh: "柔和",
          classes: ["text-gray-400"],
        },
      },
      slots: [
        { id: "text", label: "Text", labelZh: "文字", required: true, default: "Soft Heading", type: "text" },
      ],
    },

    badge: {
      id: "badge",
      name: "Badge",
      nameZh: "徽章",
      description: "Small neumorphic label with soft shadow",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-block",
          "font-semibold",
          "text-xs md:text-sm",
          "bg-[#e0e5ec]",
          "text-gray-700",
          "rounded-lg",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-2 py-0.5" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-3 py-1" },
          ],
          default: "sm",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: ["shadow-[3px_3px_6px_#b8bec7,-3px_-3px_6px_#ffffff]"],
        },
        inset: {
          id: "inset",
          label: "Inset",
          labelZh: "内凹",
          classes: ["shadow-[inset_3px_3px_6px_#b8bec7,inset_-3px_-3px_6px_#ffffff]"],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: [
            "bg-[#6d5dfc] text-white",
            "shadow-[3px_3px_6px_#b8bec7,-3px_-3px_6px_#ffffff]",
          ],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "NEW", type: "text" },
      ],
    },

    nav: {
      id: "nav",
      name: "Navigation",
      nameZh: "导航栏",
      description: "Neumorphic navigation bar with soft shadow",
      skeleton: {
        element: "nav",
        baseClasses: [
          "bg-[#e0e5ec]",
          "px-4 md:px-8",
          "py-3 md:py-4",
        ],
      },
      parameters: [
        {
          id: "sticky",
          label: "Sticky",
          labelZh: "固定",
          type: "boolean",
          default: false,
          trueClasses: "sticky top-0 z-50",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "shadow-[0_4px_8px_#b8bec7,0_-2px_4px_#ffffff]",
          ],
        },
        flat: {
          id: "flat",
          label: "Flat",
          labelZh: "扁平",
          classes: [],
        },
      },
      slots: [
        { id: "logo", label: "Logo", labelZh: "Logo", required: true, default: "BRAND", type: "text" },
        { id: "children", label: "Links", labelZh: "链接", required: false, type: "children" },
      ],
    },
  },
};
