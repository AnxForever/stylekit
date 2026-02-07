// Parallax Sections Layout Recipes
import type { StyleRecipes } from "./types";

export const parallaxSectionsRecipes: StyleRecipes = {
  styleSlug: "parallax-sections",
  styleName: "Parallax Sections",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Floating button with blur background for parallax sections",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-medium",
          "rounded-full",
          "backdrop-blur-md",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-6 py-3 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-8 py-4 text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-10 py-5 text-lg" },
          ],
          default: "md",
        },
      ],
      variants: {
        glass: {
          id: "glass",
          label: "Glass",
          labelZh: "玻璃",
          classes: [
            "bg-white/20 text-white",
            "border border-white/30",
            "hover:bg-white/30",
          ],
        },
        solid: {
          id: "solid",
          label: "Solid",
          labelZh: "实心",
          classes: [
            "bg-white text-[#1e3a5f]",
            "hover:bg-white/90",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "轮廓",
          classes: [
            "bg-transparent text-white",
            "border-2 border-white",
            "hover:bg-white/10",
          ],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Explore More", type: "text" },
      ],
      states: {
        hover: ["hover:scale-105"],
        active: ["active:scale-95"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Semi-transparent content card with blur effect",
      skeleton: {
        element: "div",
        baseClasses: [
          "backdrop-blur-sm",
          "rounded-2xl",
          "shadow-xl",
          "transition-all duration-300",
        ],
      },
      parameters: [
        {
          id: "width",
          label: "Width",
          labelZh: "宽度",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "max-w-md" },
            { value: "md", label: "Medium", labelZh: "中", classes: "max-w-2xl" },
            { value: "lg", label: "Large", labelZh: "大", classes: "max-w-4xl" },
            { value: "full", label: "Full", labelZh: "全宽", classes: "w-full" },
          ],
          default: "md",
        },
      ],
      variants: {
        light: {
          id: "light",
          label: "Light",
          labelZh: "浅色",
          classes: ["bg-white/90 text-[#1e3a5f]"],
        },
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: ["bg-[#1e3a5f]/90 text-white"],
        },
        glass: {
          id: "glass",
          label: "Glass",
          labelZh: "玻璃",
          classes: ["bg-white/20 text-white border border-white/20"],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: true, default: "Section Title", type: "text" },
        { id: "content", label: "Content", labelZh: "内容", required: false, type: "text" },
      ],
      states: {
        hover: ["hover:shadow-2xl"],
        active: [],
        disabled: ["opacity-50"],
      },
    },

    section: {
      id: "section",
      name: "Parallax Section",
      nameZh: "视差区块",
      description: "Full-screen section with fixed background for parallax effect",
      skeleton: {
        element: "section",
        baseClasses: [
          "relative",
          "min-h-screen",
          "bg-fixed bg-cover bg-center",
          "flex items-center justify-center",
        ],
      },
      parameters: [
        {
          id: "overlay",
          label: "Overlay",
          labelZh: "遮罩",
          type: "select",
          options: [
            { value: "none", label: "None", labelZh: "无", classes: "" },
            { value: "light", label: "Light", labelZh: "浅", classes: "has-overlay-light" },
            { value: "dark", label: "Dark", labelZh: "深", classes: "has-overlay-dark" },
            { value: "gradient", label: "Gradient", labelZh: "渐变", classes: "has-overlay-gradient" },
          ],
          default: "dark",
        },
        {
          id: "contentAlign",
          label: "Content Alignment",
          labelZh: "内容对齐",
          type: "select",
          options: [
            { value: "center", label: "Center", labelZh: "居中", classes: "items-center justify-center" },
            { value: "start", label: "Start", labelZh: "顶部", classes: "items-start justify-center pt-32" },
            { value: "end", label: "End", labelZh: "底部", classes: "items-end justify-center pb-32" },
          ],
          default: "center",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
        sticky: {
          id: "sticky",
          label: "Sticky",
          labelZh: "粘性",
          classes: ["sticky top-0"],
        },
      },
      slots: [
        { id: "background", label: "Background Image", labelZh: "背景图片", required: true, type: "text" },
        { id: "content", label: "Content", labelZh: "内容", required: true, type: "element" },
      ],
      states: {
        hover: [],
        active: [],
        disabled: [],
      },
    },

    nav: {
      id: "nav",
      name: "Navigation",
      nameZh: "导航",
      description: "Fixed floating navigation with blur background",
      skeleton: {
        element: "nav",
        baseClasses: [
          "fixed top-0 left-0 right-0 z-50",
          "px-8 py-4",
          "backdrop-blur-lg",
          "border-b border-white/10",
        ],
      },
      parameters: [],
      variants: {
        glass: {
          id: "glass",
          label: "Glass",
          labelZh: "玻璃",
          classes: ["bg-white/10 text-white"],
        },
        solid: {
          id: "solid",
          label: "Solid",
          labelZh: "实心",
          classes: ["bg-[#1e3a5f] text-white"],
        },
      },
      slots: [
        { id: "logo", label: "Logo", labelZh: "标志", required: true, type: "text" },
        { id: "links", label: "Links", labelZh: "链接", required: true, type: "element" },
      ],
      states: {
        hover: [],
        active: [],
        disabled: [],
      },
    },

    divider: {
      id: "divider",
      name: "Transition Divider",
      nameZh: "过渡分隔",
      description: "Gradient divider between parallax sections",
      skeleton: {
        element: "div",
        baseClasses: [
          "flex items-center justify-center",
        ],
      },
      parameters: [
        {
          id: "height",
          label: "Height",
          labelZh: "高度",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "h-32" },
            { value: "md", label: "Medium", labelZh: "中", classes: "h-64" },
            { value: "lg", label: "Large", labelZh: "大", classes: "h-96" },
          ],
          default: "md",
        },
      ],
      variants: {
        gradient: {
          id: "gradient",
          label: "Gradient",
          labelZh: "渐变",
          classes: ["bg-gradient-to-b from-[#1e3a5f] via-[#3b82f6] to-[#93c5fd]"],
        },
        solid: {
          id: "solid",
          label: "Solid",
          labelZh: "纯色",
          classes: ["bg-[#1e3a5f]"],
        },
        fade: {
          id: "fade",
          label: "Fade",
          labelZh: "淡出",
          classes: ["bg-gradient-to-b from-transparent via-[#1e3a5f]/50 to-[#1e3a5f]"],
        },
      },
      slots: [
        { id: "text", label: "Text", labelZh: "文字", required: false, type: "text" },
      ],
      states: {
        hover: [],
        active: [],
        disabled: [],
      },
    },
  },
};
