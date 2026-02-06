// Apple Style Component Recipes
import type { StyleRecipes } from "./types";

export const appleStyleRecipes: StyleRecipes = {
  styleSlug: "apple-style",
  styleName: "Apple Style",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Clean pill-shaped button with Apple-inspired minimal design",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-medium",
          "tracking-tight",
          "rounded-full",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-4 py-1.5 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-2 md:px-6 md:py-2.5 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-6 py-3 md:px-8 md:py-3.5 text-base md:text-lg" },
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
            "bg-[#0071e3] text-white",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#f5f5f7] text-[#1d1d1f]",
          ],
        },
        link: {
          id: "link",
          label: "Link",
          labelZh: "链接",
          classes: [
            "bg-transparent text-[#0071e3]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-[#0071e3]",
            "border border-[#0071e3]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Learn More", type: "text" },
      ],
      states: {
        hover: [
          "hover:opacity-85",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Minimal Apple-style card with subtle shadow and rounded corners",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "rounded-2xl",
          "shadow-sm",
          "border border-gray-100",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "p-5 md:p-8" },
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
          trueClasses: "hover:-translate-y-0.5 cursor-pointer",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
        elevated: {
          id: "elevated",
          label: "Elevated",
          labelZh: "悬浮",
          classes: [
            "shadow-md border-transparent",
          ],
        },
        flat: {
          id: "flat",
          label: "Flat",
          labelZh: "扁平",
          classes: [
            "bg-[#f5f5f7] shadow-none border-transparent",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-md",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Apple-style input with subtle background and rounded corners",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-[#f5f5f7]",
          "rounded-xl",
          "border-none",
          "text-[#1d1d1f]",
          "placeholder:text-gray-400",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "px-3.5 py-2.5 md:px-4 md:py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-4 py-3 md:px-5 md:py-3.5 text-base md:text-lg" },
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
        outlined: {
          id: "outlined",
          label: "Outlined",
          labelZh: "描边",
          classes: [
            "bg-white border border-gray-200",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Search...", type: "text" },
      ],
      states: {
        focus: [
          "focus:ring-2 focus:ring-[#0071e3]/30",
          "focus:bg-white",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    heading: {
      id: "heading",
      name: "Heading",
      nameZh: "标题",
      description: "Apple-style heading with tight tracking and bold weight",
      skeleton: {
        element: "div",
        baseClasses: [
          "font-bold",
          "tracking-tight",
          "leading-tight",
          "text-[#1d1d1f]",
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
          classes: ["text-[#1d1d1f]"],
        },
        muted: {
          id: "muted",
          label: "Muted",
          labelZh: "柔和",
          classes: ["text-[#86868b]"],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: ["text-[#0071e3]"],
        },
      },
      slots: [
        { id: "text", label: "Text", labelZh: "文字", required: true, default: "Clean Heading", type: "text" },
      ],
    },

    badge: {
      id: "badge",
      name: "Badge",
      nameZh: "徽章",
      description: "Minimal Apple-style pill badge",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-block",
          "font-medium",
          "text-xs md:text-sm",
          "rounded-full",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-2.5 py-0.5" },
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
          classes: ["bg-[#f5f5f7] text-[#1d1d1f]"],
        },
        blue: {
          id: "blue",
          label: "Blue",
          labelZh: "蓝色",
          classes: ["bg-[#0071e3]/10 text-[#0071e3]"],
        },
        green: {
          id: "green",
          label: "Green",
          labelZh: "绿色",
          classes: ["bg-[#34c759]/10 text-[#248a3d]"],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "New", type: "text" },
      ],
    },

    nav: {
      id: "nav",
      name: "Navigation",
      nameZh: "导航栏",
      description: "Apple-style clean navigation bar",
      skeleton: {
        element: "nav",
        baseClasses: [
          "bg-white/80",
          "backdrop-blur-lg",
          "border-b border-gray-200/50",
          "px-4 md:px-8",
          "py-2.5 md:py-3",
        ],
      },
      parameters: [
        {
          id: "sticky",
          label: "Sticky",
          labelZh: "固定",
          type: "boolean",
          default: true,
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
          classes: ["bg-[#1d1d1f]/80 text-white border-gray-700/50"],
        },
      },
      slots: [
        { id: "logo", label: "Logo", labelZh: "Logo", required: true, default: "Apple", type: "text" },
        { id: "children", label: "Links", labelZh: "链接", required: false, type: "children" },
      ],
    },
  },
};
