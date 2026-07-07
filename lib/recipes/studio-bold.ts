// Creative Studio Component Recipes
import { createStyleRecipes } from "./factory";

export const studioBoldRecipes = createStyleRecipes("studio-bold", "Creative Studio", {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Bold coral action button with heavy weight, hover scale and shadow lift — the signature CTA of a creative agency site",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-bold",
          "rounded-none",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-5 py-2 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-8 py-4 text-lg" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-10 py-5 text-xl" },
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
            "bg-[#FF6B6B] text-white",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-transparent text-white",
            "border-2 border-white/30",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "线框",
          classes: [
            "bg-transparent text-[#1A1A1A]",
            "border-2 border-[#1A1A1A]/20",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Start a Project", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-[#E55A5A]",
          "hover:shadow-xl",
          "hover:-translate-y-0.5",
        ],
        active: ["active:scale-[0.98]"],
        disabled: ["opacity-40 cursor-not-allowed hover:translate-y-0 hover:shadow-none"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Full-bleed project poster card with light background, image area, tag badges, bold title, and dramatic hover state",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#F5F5F0]",
          "rounded-none",
          "overflow-hidden",
          "group",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "p-4" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-6 md:p-8" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-8 md:p-10" },
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
            "shadow-none",
          ],
        },
        featured: {
          id: "featured",
          label: "Featured",
          labelZh: "精选",
          classes: [
            "md:col-span-2",
            "md:row-span-2",
          ],
        },
      },
      slots: [
        { id: "children", label: "Children", labelZh: "子元素", required: true, type: "children" },
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Project Title", type: "text" },
        { id: "description", label: "Description", labelZh: "描述", required: false, default: "A bold rebrand for a forward-thinking studio.", type: "text" },
        { id: "tags", label: "Tags", labelZh: "标签", required: false, default: "Branding, 2024", type: "text" },
      ],
      states: {
        hover: [
          "group-hover:scale-[1.02]",
          "group-hover:shadow-2xl",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Dark-background contact input with bottom border and coral focus line — confident, minimal, inline with the dark studio aesthetic",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-[#333333]",
          "border-0 border-b-2 border-white/20",
          "text-white",
          "placeholder:text-white/40",
          "focus:outline-none",
          "transition-colors duration-300",
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "尺寸",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-3 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-4 text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-4 py-5 text-lg" },
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
        light: {
          id: "light",
          label: "Light",
          labelZh: "浅色",
          classes: [
            "bg-[#F5F5F0]",
            "text-[#1A1A1A]",
            "placeholder:text-[#1A1A1A]/30",
            "border-b-[#1A1A1A]/20",
            "focus:border-[#FF6B6B]",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Your email address", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#FF6B6B]",
          "focus:ring-0",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    nav: {
      id: "nav",
      name: "Nav",
      nameZh: "导航",
      description: "Fixed dark navigation bar with backdrop blur, coral hover links, and a CTA button — floats above the hero as a design statement",
      skeleton: {
        element: "nav",
        baseClasses: [
          "fixed top-0 w-full z-50",
          "bg-[#1A1A1A]/95 backdrop-blur-sm",
          "border-b border-white/10",
          "px-6 md:px-12",
        ],
      },
      parameters: [
        {
          id: "layout",
          label: "Layout",
          labelZh: "布局",
          type: "select",
          options: [
            { value: "spread", label: "Spread", labelZh: "展开", classes: "" },
            { value: "compact", label: "Compact", labelZh: "紧凑", classes: "max-w-6xl mx-auto" },
          ],
          default: "spread",
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
          classes: [
            "bg-transparent backdrop-blur-none",
            "border-b-transparent",
          ],
        },
      },
      slots: [
        { id: "brand", label: "Brand", labelZh: "品牌名", required: true, default: "Studio", type: "text" },
        { id: "links", label: "Navigation Links", labelZh: "导航链接", required: false, default: "Work, Services, About", type: "text" },
      ],
      states: {
        hover: [
          "hover:text-[#FF6B6B]",
        ],
      },
    },
});
