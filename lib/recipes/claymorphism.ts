// Claymorphism Component Recipes
import type { StyleRecipes } from "./types";

export const claymorphismRecipes: StyleRecipes = {
  styleSlug: "claymorphism",
  styleName: "Claymorphism",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Candy-colored 3D clay button with inset highlight and outer shadow",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-semibold",
          "rounded-2xl",
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
            "bg-[#f8b4d9] text-gray-800",
            "shadow-[0_8px_16px_rgba(0,0,0,0.1),inset_0_-4px_8px_rgba(0,0,0,0.1)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#a7f3d0] text-gray-800",
            "shadow-[0_8px_16px_rgba(0,0,0,0.1),inset_0_-4px_8px_rgba(0,0,0,0.1)]",
          ],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: [
            "bg-[#c4b5fd] text-gray-800",
            "shadow-[0_8px_16px_rgba(0,0,0,0.1),inset_0_-4px_8px_rgba(0,0,0,0.1)]",
          ],
        },
        warm: {
          id: "warm",
          label: "Warm",
          labelZh: "暖色",
          classes: [
            "bg-[#fcd34d] text-gray-800",
            "shadow-[0_8px_16px_rgba(0,0,0,0.1),inset_0_-4px_8px_rgba(0,0,0,0.1)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_12px_20px_rgba(0,0,0,0.15),inset_0_-4px_8px_rgba(0,0,0,0.1)]",
          "hover:-translate-y-0.5",
        ],
        active: [
          "active:shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_4px_8px_rgba(0,0,0,0.15)]",
          "active:translate-y-0.5",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Soft 3D clay card with candy pastel background and rounded corners",
      skeleton: {
        element: "div",
        baseClasses: [
          "rounded-3xl",
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
          trueClasses: "hover:-translate-y-1 cursor-pointer",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [
            "bg-[#fce7f3]",
            "shadow-[0_12px_24px_rgba(0,0,0,0.1),inset_0_-6px_12px_rgba(0,0,0,0.08)]",
          ],
        },
        mint: {
          id: "mint",
          label: "Mint",
          labelZh: "薄荷",
          classes: [
            "bg-[#d1fae5]",
            "shadow-[0_12px_24px_rgba(0,0,0,0.1),inset_0_-6px_12px_rgba(0,0,0,0.08)]",
          ],
        },
        lavender: {
          id: "lavender",
          label: "Lavender",
          labelZh: "薰衣草",
          classes: [
            "bg-[#ede9fe]",
            "shadow-[0_12px_24px_rgba(0,0,0,0.1),inset_0_-6px_12px_rgba(0,0,0,0.08)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_16px_32px_rgba(0,0,0,0.15),inset_0_-6px_12px_rgba(0,0,0,0.08)]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Soft clay input with inset shadow and rounded corners",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-white/80",
          "rounded-2xl",
          "border-none",
          "text-gray-800",
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
            "shadow-[inset_0_4px_8px_rgba(0,0,0,0.08)]",
          ],
        },
        raised: {
          id: "raised",
          label: "Raised",
          labelZh: "凸起",
          classes: [
            "shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(0,0,0,0.05)]",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_0_0_3px_rgba(196,181,253,0.4)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    heading: {
      id: "heading",
      name: "Heading",
      nameZh: "标题",
      description: "Playful clay-style heading with bold weight",
      skeleton: {
        element: "div",
        baseClasses: [
          "font-bold",
          "tracking-tight",
          "leading-tight",
          "text-gray-800",
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
          classes: ["text-gray-800"],
        },
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: ["text-[#ec4899]"],
        },
        purple: {
          id: "purple",
          label: "Purple",
          labelZh: "紫色",
          classes: ["text-[#8b5cf6]"],
        },
      },
      slots: [
        { id: "text", label: "Text", labelZh: "文字", required: true, default: "Clay Heading", type: "text" },
      ],
    },

    badge: {
      id: "badge",
      name: "Badge",
      nameZh: "徽章",
      description: "Small candy-colored clay badge with 3D shadow",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-block",
          "font-semibold",
          "text-xs md:text-sm",
          "text-gray-800",
          "rounded-xl",
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
          classes: [
            "bg-[#f8b4d9]",
            "shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(0,0,0,0.08)]",
          ],
        },
        mint: {
          id: "mint",
          label: "Mint",
          labelZh: "薄荷",
          classes: [
            "bg-[#a7f3d0]",
            "shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(0,0,0,0.08)]",
          ],
        },
        lavender: {
          id: "lavender",
          label: "Lavender",
          labelZh: "薰衣草",
          classes: [
            "bg-[#c4b5fd]",
            "shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(0,0,0,0.08)]",
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
      description: "Clay-style navigation bar with soft 3D shadow",
      skeleton: {
        element: "nav",
        baseClasses: [
          "bg-[#fce7f3]",
          "rounded-b-2xl",
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
            "shadow-[0_8px_16px_rgba(0,0,0,0.1),inset_0_-4px_8px_rgba(0,0,0,0.05)]",
          ],
        },
        mint: {
          id: "mint",
          label: "Mint",
          labelZh: "薄荷",
          classes: [
            "bg-[#d1fae5]",
            "shadow-[0_8px_16px_rgba(0,0,0,0.1),inset_0_-4px_8px_rgba(0,0,0,0.05)]",
          ],
        },
      },
      slots: [
        { id: "logo", label: "Logo", labelZh: "Logo", required: true, default: "BRAND", type: "text" },
        { id: "children", label: "Links", labelZh: "链接", required: false, type: "children" },
      ],
    },
  },
};
