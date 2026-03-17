// Shopify Clean Component Recipes
import { createStyleRecipes } from "./factory";

export const shopifyCleanRecipes = createStyleRecipes("shopify-clean", "Shopify Clean", {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "E-commerce CTA button with brand green and clear affordance",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-medium",
          "rounded-lg",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-4 py-2 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-6 py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-8 py-3.5 text-base md:text-lg" },
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
            "bg-[#008060] text-white",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-white text-[#1a1a1a]",
            "border border-[#e3e3e3]",
          ],
        },
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: [
            "bg-[#1a1a1a] text-white",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Add to Cart", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-[#006e52]",
        ],
        active: ["active:bg-[#005c45]"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Product card with image area, title, and pricing",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "rounded-lg",
          "border border-[#e3e3e3]",
          "overflow-hidden",
          "transition-shadow duration-200",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "p-3" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-4" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-5 md:p-6" },
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
        elevated: {
          id: "elevated",
          label: "Elevated",
          labelZh: "悬浮",
          classes: [
            "shadow-sm border-transparent",
          ],
        },
        minimal: {
          id: "minimal",
          label: "Minimal",
          labelZh: "极简",
          classes: [
            "border-transparent shadow-none",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Product Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Product details", type: "children" },
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
      description: "Search or form input with green focus ring",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-white",
          "rounded-lg",
          "border border-[#e3e3e3]",
          "text-[#1a1a1a]",
          "placeholder:text-[#9ca3af]",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-2 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-5 py-3.5 text-base md:text-lg" },
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
          classes: ["bg-[#f7f7f8] border-[#e3e3e3]"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Search products...", type: "text" },
      ],
      states: {
        focus: [
          "focus:ring-2 focus:ring-[#008060]/20",
          "focus:border-[#008060]",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-[#f7f7f8]"],
      },
    },
});
