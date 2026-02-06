// Editorial Component Recipes
import type { StyleRecipes } from "./types";

export const editorialRecipes: StyleRecipes = {
  styleSlug: "editorial",
  styleName: "Editorial",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Refined button with serif influence, tracking-wide uppercase text",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-medium",
          "tracking-wide",
          "uppercase",
          "text-sm",
          "transition-all duration-300",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-1.5 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-2.5 md:px-6 md:py-3 text-xs md:text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-6 py-3 md:px-8 md:py-4 text-sm md:text-base" },
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
            "bg-[#0a0a0a] text-white",
            "border-b-2 border-[#0a0a0a]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-transparent text-[#0a0a0a]",
            "border border-[#0a0a0a]",
          ],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: [
            "bg-[#e63946] text-white",
            "border-b-2 border-[#e63946]",
          ],
        },
        ghost: {
          id: "ghost",
          label: "Ghost",
          labelZh: "幽灵",
          classes: [
            "bg-transparent text-[#0a0a0a]",
            "border-b-2 border-transparent",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Read More", type: "text" },
      ],
      states: {
        hover: [
          "hover:opacity-80",
          "hover:border-b-2 hover:border-[#0a0a0a]",
        ],
        active: ["active:opacity-70"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Clean editorial card with bottom border and generous whitespace",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "border-b border-gray-200",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "p-4 md:p-5" },
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
          default: false,
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
        featured: {
          id: "featured",
          label: "Featured",
          labelZh: "精选",
          classes: ["border-b-2 border-[#0a0a0a]"],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: ["border-b-2 border-[#e63946]"],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Article Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:border-b-2 hover:border-[#0a0a0a]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Minimal editorial input with bottom border only",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "border-b-2 border-gray-300",
          "bg-transparent",
          "rounded-none",
          "focus:outline-none",
          "transition-all duration-300",
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
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: ["border-[#0a0a0a] text-[#0a0a0a]"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Enter text...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#0a0a0a]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    heading: {
      id: "heading",
      name: "Heading",
      nameZh: "标题",
      description: "Elegant editorial heading with serif-inspired weight",
      skeleton: {
        element: "div",
        baseClasses: [
          "font-bold",
          "tracking-tight",
          "leading-tight",
          "text-[#0a0a0a]",
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
          classes: ["text-[#0a0a0a]"],
        },
        muted: {
          id: "muted",
          label: "Muted",
          labelZh: "柔和",
          classes: ["text-gray-500"],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: ["text-[#e63946]"],
        },
      },
      slots: [
        { id: "text", label: "Text", labelZh: "文字", required: true, default: "Editorial Heading", type: "text" },
      ],
    },

    badge: {
      id: "badge",
      name: "Badge",
      nameZh: "徽章",
      description: "Minimal editorial label with uppercase tracking",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-block",
          "font-medium",
          "text-xs",
          "uppercase",
          "tracking-widest",
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
          classes: ["text-[#0a0a0a] border-b border-[#0a0a0a]"],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: ["text-[#e63946] border-b border-[#e63946]"],
        },
        muted: {
          id: "muted",
          label: "Muted",
          labelZh: "柔和",
          classes: ["text-gray-400"],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "FEATURE", type: "text" },
      ],
    },

    nav: {
      id: "nav",
      name: "Navigation",
      nameZh: "导航栏",
      description: "Clean editorial navigation with bottom rule",
      skeleton: {
        element: "nav",
        baseClasses: [
          "bg-white",
          "border-b border-gray-200",
          "px-4 md:px-8",
          "py-4 md:py-6",
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
          classes: [],
        },
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: ["bg-[#0a0a0a] text-white border-gray-800"],
        },
      },
      slots: [
        { id: "logo", label: "Logo", labelZh: "Logo", required: true, default: "EDITORIAL", type: "text" },
        { id: "children", label: "Links", labelZh: "链接", required: false, type: "children" },
      ],
    },
  },
};
