// Glassmorphism Component Recipes
import type { StyleRecipes } from "./types";

export const glassmorphismRecipes: StyleRecipes = {
  styleSlug: "glassmorphism",
  styleName: "Glassmorphism",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Frosted glass button with backdrop blur and translucent background",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-medium",
          "backdrop-blur-md",
          "rounded-xl",
          "border border-white/30",
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
            "bg-white/30 backdrop-blur-md text-white",
            "shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-black/20 backdrop-blur-md text-white",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]",
          ],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: [
            "bg-[#667eea]/30 backdrop-blur-md text-white",
            "shadow-[0_8px_32px_0_rgba(102,126,234,0.37)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-white",
            "border-white/50",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Click Me", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-white/40",
          "hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.5)]",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Frosted glass card with translucent background and blur effect",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white/20",
          "backdrop-blur-xl",
          "rounded-2xl",
          "border border-white/20",
          "shadow-lg",
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
          classes: ["shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"],
        },
        light: {
          id: "light",
          label: "Light",
          labelZh: "浅色",
          classes: [
            "bg-white/30",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.2)]",
          ],
        },
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: [
            "bg-black/30",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:bg-white/30",
          "hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.5)]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Translucent glass input with blur backdrop",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-white/10",
          "backdrop-blur-md",
          "rounded-xl",
          "border border-white/20",
          "text-white",
          "placeholder:text-white/50",
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
        filled: {
          id: "filled",
          label: "Filled",
          labelZh: "填充",
          classes: ["bg-white/20"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Type here...", type: "text" },
      ],
      states: {
        focus: [
          "focus:bg-white/20",
          "focus:border-white/40",
          "focus:shadow-[0_4px_16px_0_rgba(31,38,135,0.3)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    heading: {
      id: "heading",
      name: "Heading",
      nameZh: "标题",
      description: "Glass-style heading with translucent text effects",
      skeleton: {
        element: "div",
        baseClasses: [
          "font-bold",
          "tracking-tight",
          "leading-tight",
          "text-white",
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
          classes: ["text-white"],
        },
        frosted: {
          id: "frosted",
          label: "Frosted",
          labelZh: "磨砂",
          classes: ["text-white/80"],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: ["text-[#667eea]"],
        },
      },
      slots: [
        { id: "text", label: "Text", labelZh: "文字", required: true, default: "Glass Heading", type: "text" },
      ],
    },

    badge: {
      id: "badge",
      name: "Badge",
      nameZh: "徽章",
      description: "Small glass-style label with blur effect",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-block",
          "font-medium",
          "text-xs md:text-sm",
          "backdrop-blur-md",
          "rounded-full",
          "border border-white/30",
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
          classes: ["bg-white/20 text-white"],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: ["bg-[#667eea]/30 text-white"],
        },
        light: {
          id: "light",
          label: "Light",
          labelZh: "浅色",
          classes: ["bg-white/40 text-white"],
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
      description: "Frosted glass navigation bar with blur backdrop",
      skeleton: {
        element: "nav",
        baseClasses: [
          "bg-white/10",
          "backdrop-blur-xl",
          "border-b border-white/20",
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
          classes: [],
        },
        solid: {
          id: "solid",
          label: "Solid",
          labelZh: "实色",
          classes: ["bg-white/30"],
        },
      },
      slots: [
        { id: "logo", label: "Logo", labelZh: "Logo", required: true, default: "BRAND", type: "text" },
        { id: "children", label: "Links", labelZh: "链接", required: false, type: "children" },
      ],
    },
  },
};
