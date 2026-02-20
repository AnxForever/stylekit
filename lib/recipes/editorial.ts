// Editorial Component Recipes
import { createStyleRecipes } from "./factory";

export const editorialRecipes = createStyleRecipes("editorial", "Editorial", {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Editorial button with hover-underline animation and uppercase tracking",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-sans",
          "tracking-[0.2em]",
          "uppercase",
          "text-xs",
          "relative",
          "pb-1",
          "transition-colors duration-200",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "text-[10px]" },
            { value: "md", label: "Medium", labelZh: "中", classes: "text-xs" },
            { value: "lg", label: "Large", labelZh: "大", classes: "text-sm" },
          ],
          default: "md",
        },
        {
          id: "withArrow",
          label: "Arrow Icon",
          labelZh: "箭头图标",
          type: "boolean",
          default: false,
          trueClasses: "flex items-center gap-4 group",
        },
      ],
      variants: {
        primary: {
          id: "primary",
          label: "Primary",
          labelZh: "主要",
          classes: [
            "text-[#1C1C1C]",
            "after:content-[''] after:absolute after:w-full after:h-px",
            "after:bottom-0 after:left-0 after:bg-current",
            "after:origin-bottom-right after:scale-x-0",
            "hover:after:origin-bottom-left hover:after:scale-x-100",
            "after:transition-transform after:duration-500",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "text-[#1C1C1C]/60",
          ],
        },
        filled: {
          id: "filled",
          label: "Filled",
          labelZh: "填充",
          classes: [
            "bg-[#1C1C1C] text-[#F9F8F6]",
            "px-6 py-3",
          ],
        },
        ghost: {
          id: "ghost",
          label: "Ghost",
          labelZh: "幽灵",
          classes: [
            "text-[#1C1C1C]/40",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Submit Inquiry", type: "text" },
      ],
      states: {
        hover: [
          "hover:text-[#1C1C1C]",
        ],
        active: ["active:opacity-60"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Editorial work list item with bottom border and hover italic effect",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#F9F8F6]",
          "border-b border-[#1C1C1C]/10",
          "transition-colors duration-200",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "py-6 md:py-8 px-4" },
            { value: "md", label: "Medium", labelZh: "中", classes: "py-10 md:py-16 px-4" },
            { value: "lg", label: "Large", labelZh: "大", classes: "py-12 md:py-20 px-4" },
          ],
          default: "md",
        },
        {
          id: "interactive",
          label: "Interactive",
          labelZh: "可交互",
          type: "boolean",
          default: true,
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
        featured: {
          id: "featured",
          label: "Featured",
          labelZh: "精选",
          classes: ["border-b border-[#1C1C1C]/20"],
        },
        minimal: {
          id: "minimal",
          label: "Minimal",
          labelZh: "极简",
          classes: ["border-b border-[#1C1C1C]/[0.05]"],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "The Modernist", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: [
          "hover:bg-[#1C1C1C]/[0.02]",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Editorial floating-label input with bottom border only",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "border-b border-[#1C1C1C]/20",
          "bg-transparent",
          "rounded-none",
          "font-serif text-xl",
          "focus:outline-none",
          "transition-colors duration-200",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "py-2 text-base" },
            { value: "md", label: "Medium", labelZh: "中", classes: "py-4 text-xl" },
            { value: "lg", label: "Large", labelZh: "大", classes: "py-5 text-2xl" },
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
        emphasized: {
          id: "emphasized",
          label: "Emphasized",
          labelZh: "强调",
          classes: ["border-[#1C1C1C]/40"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Your Name", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#1C1C1C]",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    heading: {
      id: "heading",
      name: "Heading",
      nameZh: "标题",
      description: "Editorial serif heading with tight tracking and normal weight",
      skeleton: {
        element: "div",
        baseClasses: [
          "font-serif",
          "font-normal",
          "tracking-tighter",
          "leading-[0.9]",
          "text-[#1C1C1C]",
        ],
      },
      parameters: [
        {
          id: "level",
          label: "Level",
          labelZh: "层级",
          type: "select",
          options: [
            { value: "hero", label: "Hero", labelZh: "主标题", classes: "text-6xl md:text-8xl lg:text-[9rem]" },
            { value: "h1", label: "H1", labelZh: "一级", classes: "text-5xl md:text-7xl" },
            { value: "h2", label: "H2", labelZh: "二级", classes: "text-4xl md:text-6xl" },
            { value: "h3", label: "H3", labelZh: "三级", classes: "text-2xl md:text-3xl" },
          ],
          default: "h1",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: ["text-[#1C1C1C]"],
        },
        muted: {
          id: "muted",
          label: "Muted",
          labelZh: "柔和",
          classes: ["text-[#1C1C1C]/60"],
        },
        italic: {
          id: "italic",
          label: "Italic",
          labelZh: "斜体",
          classes: ["italic text-[#1C1C1C]/60"],
        },
      },
      slots: [
        { id: "text", label: "Text", labelZh: "文字", required: true, default: "Digital Craftsmanship.", type: "text" },
      ],
    },

    badge: {
      id: "badge",
      name: "Badge",
      nameZh: "标签",
      description: "Editorial uppercase label with wide tracking",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-block",
          "font-sans",
          "font-normal",
          "text-xs",
          "uppercase",
          "tracking-[0.2em]",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "text-[10px]" },
            { value: "md", label: "Medium", labelZh: "中", classes: "text-xs" },
          ],
          default: "sm",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: ["text-[#1C1C1C]/40"],
        },
        prominent: {
          id: "prominent",
          label: "Prominent",
          labelZh: "突出",
          classes: ["text-[#1C1C1C]"],
        },
        muted: {
          id: "muted",
          label: "Muted",
          labelZh: "柔和",
          classes: ["text-[#1C1C1C]/20"],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "ART DIRECTION", type: "text" },
      ],
    },

    nav: {
      id: "nav",
      name: "Navigation",
      nameZh: "导航栏",
      description: "Fixed editorial navigation with frosted glass background",
      skeleton: {
        element: "nav",
        baseClasses: [
          "bg-[#F9F8F6]/90",
          "backdrop-blur-sm",
          "border-b border-[#1C1C1C]/10",
          "px-6 md:px-12",
          "h-16 md:h-20",
        ],
      },
      parameters: [
        {
          id: "sticky",
          label: "Fixed",
          labelZh: "固定",
          type: "boolean",
          default: true,
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
        transparent: {
          id: "transparent",
          label: "Transparent",
          labelZh: "透明",
          classes: ["bg-transparent backdrop-blur-none border-transparent"],
        },
      },
      slots: [
        { id: "logo", label: "Logo", labelZh: "Logo", required: true, default: "Editorial", type: "text" },
        { id: "children", label: "Links", labelZh: "链接", required: false, type: "children" },
      ],
    },
});
