// Luxury Retail Component Recipes
import { createStyleRecipes, sizeParam, fullWidthParam, paddingParam } from "./factory";

export const luxuryRetailRecipes = createStyleRecipes("luxury-retail", "Luxury Retail", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Outlined border button that inverts on hover for restrained luxury feel",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-light",
        "tracking-[0.2em]",
        "uppercase",
        "rounded-sm",
        "transition-all duration-300",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-6 py-2 text-[10px]",
        md: "px-8 py-3 text-xs",
        lg: "px-10 py-4 text-xs",
      }),
      fullWidthParam,
    ],
    variants: {
      outlined: {
        id: "outlined",
        label: "Outlined",
        labelZh: "描边",
        classes: [
          "border border-[#1a1a1a] text-[#1a1a1a] bg-transparent",
        ],
      },
      gold: {
        id: "gold",
        label: "Gold Outlined",
        labelZh: "金色描边",
        classes: [
          "border border-[#c9a96e] text-[#c9a96e] bg-transparent",
        ],
      },
      filled: {
        id: "filled",
        label: "Filled",
        labelZh: "填充",
        classes: [
          "bg-[#1a1a1a] text-[#faf9f6] border border-[#1a1a1a]",
        ],
      },
    },
    slots: [
      { id: "label", label: "Label", labelZh: "文字", required: true, default: "Discover", type: "text" },
    ],
    states: {
      hover: [
        "hover:bg-[#1a1a1a] hover:text-[#faf9f6]",
      ],
      active: ["active:opacity-80"],
      disabled: ["opacity-40 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Large-image product card with serif title and minimal info hierarchy",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#faf9f6]",
        "rounded-sm",
        "transition-all duration-300",
      ],
    },
    parameters: [
      paddingParam({
        sm: "p-0",
        md: "p-0",
        lg: "p-0",
      }),
      {
        id: "interactive",
        label: "Interactive",
        labelZh: "可交互",
        type: "boolean",
        default: false,
        trueClasses: "cursor-pointer group",
      },
    ],
    variants: {
      default: {
        id: "default",
        label: "Default",
        labelZh: "默认",
        classes: [],
      },
      bordered: {
        id: "bordered",
        label: "Bordered",
        labelZh: "边框",
        classes: [
          "border border-[#e8e0d4]",
        ],
      },
    },
    slots: [
      { id: "image", label: "Image", labelZh: "图片", required: false, type: "children" },
      { id: "title", label: "Title", labelZh: "标题", required: false, default: "Signature Piece", type: "text" },
      { id: "children", label: "Content", labelZh: "内容", required: true, default: "$1,280", type: "children" },
    ],
    states: {
      hover: [
        "hover:opacity-95",
      ],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Bottom-border input with transparent background for luxury forms",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-transparent",
        "border-0 border-b border-[#c9a96e]",
        "text-sm text-[#1a1a1a]",
        "placeholder:text-[#8b7355]",
        "focus:outline-none",
        "tracking-wide",
        "transition-colors duration-300",
      ],
    },
    parameters: [
      sizeParam({
        sm: "py-2 text-xs",
        md: "py-3 text-sm",
        lg: "py-4 text-sm",
      }),
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
        classes: [
          "border-[#e8e0d4] text-[#e8e0d4] placeholder:text-[#8b7355]",
        ],
      },
    },
    slots: [
      { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Your email", type: "text" },
    ],
    states: {
      focus: [
        "focus:border-[#1a1a1a]",
      ],
      disabled: ["opacity-40 cursor-not-allowed"],
    },
  },

  heading: {
    id: "heading",
    name: "Heading",
    nameZh: "标题",
    description: "Serif heading with wide tracking for luxury brand feel",
    skeleton: {
      element: "div",
      baseClasses: [
        "font-serif",
        "text-[#1a1a1a]",
        "leading-tight",
      ],
    },
    parameters: [
      {
        id: "level",
        label: "Level",
        labelZh: "层级",
        type: "select",
        options: [
          { value: "hero", label: "Hero", labelZh: "主标题", classes: "text-4xl md:text-5xl lg:text-6xl" },
          { value: "h1", label: "H1", labelZh: "一级", classes: "text-3xl md:text-4xl lg:text-5xl" },
          { value: "h2", label: "H2", labelZh: "二级", classes: "text-2xl md:text-3xl" },
          { value: "h3", label: "H3", labelZh: "三级", classes: "text-lg md:text-xl" },
        ],
        default: "h1",
      },
    ],
    variants: {
      default: {
        id: "default",
        label: "Default",
        labelZh: "默认",
        classes: ["text-[#1a1a1a]"],
      },
      gold: {
        id: "gold",
        label: "Gold",
        labelZh: "金色",
        classes: ["text-[#c9a96e]"],
      },
      light: {
        id: "light",
        label: "Light",
        labelZh: "浅色",
        classes: ["text-[#faf9f6]"],
      },
    },
    slots: [
      { id: "text", label: "Text", labelZh: "文字", required: true, default: "Timeless Elegance", type: "text" },
    ],
  },

  badge: {
    id: "badge",
    name: "Badge",
    nameZh: "徽章",
    description: "Minimal luxury badge with wide letter spacing",
    skeleton: {
      element: "div",
      baseClasses: [
        "inline-block",
        "font-light",
        "text-[10px]",
        "tracking-[0.2em]",
        "uppercase",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-3 py-1",
        md: "px-4 py-1.5",
        lg: "px-5 py-2",
      }),
    ],
    variants: {
      default: {
        id: "default",
        label: "Default",
        labelZh: "默认",
        classes: ["border border-[#e8e0d4] text-[#8b7355]"],
      },
      gold: {
        id: "gold",
        label: "Gold",
        labelZh: "金色",
        classes: ["border border-[#c9a96e] text-[#c9a96e]"],
      },
      dark: {
        id: "dark",
        label: "Dark",
        labelZh: "深色",
        classes: ["bg-[#1a1a1a] text-[#faf9f6]"],
      },
    },
    slots: [
      { id: "label", label: "Label", labelZh: "文字", required: true, default: "New Season", type: "text" },
    ],
  },

  nav: {
    id: "nav",
    name: "Navigation",
    nameZh: "导航栏",
    description: "Centered logo navigation with brand hierarchy",
    skeleton: {
      element: "nav",
      baseClasses: [
        "bg-[#faf9f6]",
        "border-b border-[#e8e0d4]",
        "px-6 md:px-8",
        "py-5 md:py-6",
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
        classes: ["bg-[#1a1a1a] border-[#2c2c2c] text-[#e8e0d4]"],
      },
    },
    slots: [
      { id: "logo", label: "Logo", labelZh: "Logo", required: true, default: "MAISON", type: "text" },
      { id: "children", label: "Links", labelZh: "链接", required: false, type: "children" },
    ],
  },
});
