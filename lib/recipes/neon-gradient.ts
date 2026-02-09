// Neon Gradient Component Recipes
import type { StyleRecipes } from "./types";

export const neonGradientRecipes: StyleRecipes = {
  styleSlug: "neon-gradient",
  styleName: "Neon Gradient",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Neon gradient button with glow effect and thick border",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-bold",
          "rounded-xl",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-4 py-2 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-6 py-3 md:px-8 md:py-4 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-8 py-4 md:px-10 md:py-5 text-base md:text-lg" },
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
            "bg-gradient-to-r from-cyan-400 to-pink-500",
            "text-white",
            "border-2 border-white/20",
            "shadow-[0_0_20px_rgba(236,72,153,0.5)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-transparent",
            "text-white",
            "border-2 border-cyan-400",
          ],
        },
        gradient: {
          id: "gradient",
          label: "Gradient",
          labelZh: "渐变",
          classes: [
            "bg-gradient-to-r from-cyan-400 via-green-400 to-yellow-400",
            "text-black",
            "border-2 border-pink-400",
            "shadow-[0_0_20px_rgba(34,211,238,0.4)]",
          ],
        },
        icon: {
          id: "icon",
          label: "Icon",
          labelZh: "图标",
          classes: [
            "w-12 h-12",
            "bg-gradient-to-br from-purple-500 to-pink-500",
            "border-2 border-yellow-400",
            "shadow-[0_0_15px_rgba(250,204,21,0.4)]",
            "flex items-center justify-center",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Get Started", type: "text" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_30px_rgba(236,72,153,0.7)]",
          "hover:scale-105",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Gradient-filled card with thick colored border and glow",
      skeleton: {
        element: "div",
        baseClasses: [
          "rounded-2xl md:rounded-3xl",
          "border-4",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "p-5 md:p-6" },
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
          trueClasses: "hover:-translate-y-2 cursor-pointer",
        },
      ],
      variants: {
        purplePink: {
          id: "purplePink",
          label: "Purple Pink",
          labelZh: "紫粉",
          classes: [
            "bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500",
            "border-yellow-400",
            "shadow-[0_0_30px_rgba(168,85,247,0.4)]",
          ],
        },
        cyanGreen: {
          id: "cyanGreen",
          label: "Cyan Green",
          labelZh: "青绿",
          classes: [
            "bg-gradient-to-br from-cyan-400 via-teal-500 to-green-500",
            "border-pink-400",
            "shadow-[0_0_30px_rgba(34,211,238,0.4)]",
          ],
        },
        pinkRose: {
          id: "pinkRose",
          label: "Pink Rose",
          labelZh: "粉红",
          classes: [
            "bg-gradient-to-br from-pink-500 via-rose-500 to-red-500",
            "border-cyan-400",
            "shadow-[0_0_30px_rgba(236,72,153,0.4)]",
          ],
        },
        yellowGreen: {
          id: "yellowGreen",
          label: "Yellow Green",
          labelZh: "黄绿",
          classes: [
            "bg-gradient-to-br from-yellow-400 via-green-400 to-cyan-400",
            "border-purple-500",
            "shadow-[0_0_30px_rgba(250,204,21,0.4)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Feature", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Description text", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]",
          "hover:-translate-y-2",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Dark background input with glowing border on focus",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "px-5 py-4",
          "bg-white/5",
          "border-2 border-purple-500/50",
          "rounded-xl",
          "text-white",
          "placeholder:text-white/40",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-4 py-3 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-4 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-6 py-5 text-base md:text-lg" },
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
        withButton: {
          id: "withButton",
          label: "With Button",
          labelZh: "带按钮",
          classes: ["pr-24"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Enter your email...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-cyan-400",
          "focus:shadow-[0_0_20px_rgba(34,211,238,0.3)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    nav: {
      id: "nav",
      name: "Navigation",
      nameZh: "导航栏",
      description: "Dark transparent navigation with blur and gradient CTA",
      skeleton: {
        element: "nav",
        baseClasses: [
          "bg-[#0f0a1e]/80 backdrop-blur-xl",
          "border-b border-purple-500/20",
          "px-4 md:px-8",
          "py-4",
        ],
      },
      parameters: [
        {
          id: "sticky",
          label: "Sticky",
          labelZh: "固定",
          type: "boolean",
          default: false,
          trueClasses: "fixed top-0 left-0 right-0 z-50",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
      },
      slots: [
        { id: "logo", label: "Logo", labelZh: "Logo", required: true, default: "ACME", type: "text" },
        { id: "children", label: "Links", labelZh: "链接", required: false, type: "children" },
      ],
      states: {},
    },

    badge: {
      id: "badge",
      name: "Badge",
      nameZh: "徽章",
      description: "Dashed border badge with star decorations",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center gap-2",
          "px-4 py-2",
          "border-2 border-dashed",
          "rounded-full",
          "text-sm font-medium",
        ],
      },
      parameters: [],
      variants: {
        yellow: {
          id: "yellow",
          label: "Yellow",
          labelZh: "黄色",
          classes: [
            "border-yellow-400",
            "text-yellow-400",
          ],
        },
        cyan: {
          id: "cyan",
          label: "Cyan",
          labelZh: "青色",
          classes: [
            "border-cyan-400",
            "text-cyan-400",
          ],
        },
        pink: {
          id: "pink",
          label: "Pink",
          labelZh: "粉色",
          classes: [
            "border-pink-400",
            "text-pink-400",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "New Feature", type: "text" },
      ],
      states: {},
    },

    floatingCard: {
      id: "floatingCard",
      name: "Floating Card",
      nameZh: "漂浮卡片",
      description: "Rotated floating card for hero sections",
      skeleton: {
        element: "div",
        baseClasses: [
          "rounded-2xl",
          "border-4",
          "p-5",
          "absolute",
        ],
      },
      parameters: [
        {
          id: "rotation",
          label: "Rotation",
          labelZh: "旋转",
          type: "select",
          options: [
            { value: "left", label: "Left", labelZh: "左", classes: "rotate-[-8deg]" },
            { value: "right", label: "Right", labelZh: "右", classes: "rotate-[5deg]" },
            { value: "slight", label: "Slight", labelZh: "微调", classes: "rotate-[3deg]" },
          ],
          default: "left",
        },
      ],
      variants: {
        purplePink: {
          id: "purplePink",
          label: "Purple Pink",
          labelZh: "紫粉",
          classes: [
            "bg-gradient-to-br from-purple-500 to-pink-500",
            "border-yellow-400",
            "shadow-[0_0_30px_rgba(168,85,247,0.5)]",
          ],
        },
        cyanGreen: {
          id: "cyanGreen",
          label: "Cyan Green",
          labelZh: "青绿",
          classes: [
            "bg-gradient-to-br from-green-400 to-cyan-400",
            "border-pink-400",
            "shadow-[0_0_30px_rgba(34,211,238,0.5)]",
          ],
        },
        pinkRose: {
          id: "pinkRose",
          label: "Pink Rose",
          labelZh: "粉红",
          classes: [
            "bg-gradient-to-br from-pink-500 to-rose-500",
            "border-cyan-400",
            "shadow-[0_0_30px_rgba(236,72,153,0.5)]",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: true, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Fast", type: "text" },
      ],
      states: {},
    },

    decorator: {
      id: "decorator",
      name: "Decorator",
      nameZh: "装饰元素",
      description: "Animated decorative icons for backgrounds",
      skeleton: {
        element: "div",
        baseClasses: [
          "absolute",
        ],
      },
      parameters: [],
      variants: {
        star: {
          id: "star",
          label: "Star",
          labelZh: "星星",
          classes: [
            "text-yellow-400",
            "animate-pulse",
          ],
        },
        rocket: {
          id: "rocket",
          label: "Rocket",
          labelZh: "火箭",
          classes: [
            "text-pink-400",
          ],
        },
        sparkles: {
          id: "sparkles",
          label: "Sparkles",
          labelZh: "闪光",
          classes: [
            "text-cyan-400",
            "animate-bounce",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: true, type: "icon" },
      ],
      states: {},
    },
  },
};
