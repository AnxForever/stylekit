// Fresh Market Component Recipes
import { createStyleRecipes } from "./factory";

export const freshMarketRecipes = createStyleRecipes("fresh-market", "Fresh Market", {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Rounded pill button with warm pumpkin orange CTA and friendly feel",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-medium",
          "rounded-full",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-4 py-1.5 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-6 py-2.5 md:px-8 md:py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-8 py-3 md:px-10 md:py-4 text-base md:text-lg" },
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
            "bg-[#e8722a] text-white",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-[#d4e4bc] text-[#2d5016]",
          ],
        },
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: [
            "bg-[#2d5016] text-white",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Add to Basket", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-[#d4641f]",
        ],
        active: ["active:scale-95"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Warm rounded product card with soft shadow for food items",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "rounded-2xl",
          "shadow-sm",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "p-4 md:p-5" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-5 md:p-8" },
          ],
          default: "md",
        },
        {
          id: "interactive",
          label: "Interactive",
          labelZh: "可交互",
          type: "boolean",
          default: true,
          trueClasses: "hover:shadow-md cursor-pointer",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: [],
        },
        organic: {
          id: "organic",
          label: "Organic",
          labelZh: "有机",
          classes: [
            "border border-[#d4e4bc]",
          ],
        },
        featured: {
          id: "featured",
          label: "Featured",
          labelZh: "精选",
          classes: [
            "ring-2 ring-[#e8722a]/20",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Fresh Produce", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Farm-fresh quality", type: "children" },
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
      description: "Rounded search input with soft green border for product search",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-white",
          "rounded-full",
          "border border-[#d4e4bc]",
          "text-[#2d5016]",
          "placeholder:text-[#8b7355]",
          "focus:outline-none",
          "transition-colors",
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
            { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-2.5 md:px-5 md:py-3 text-sm md:text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-6 py-3 md:px-6 md:py-3.5 text-base md:text-lg" },
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
        cream: {
          id: "cream",
          label: "Cream",
          labelZh: "奶油",
          classes: ["bg-[#fef9f0]"],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Search for fresh produce...", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#2d5016]",
          "focus:ring-2 focus:ring-[#2d5016]/20",
        ],
        disabled: ["opacity-50 cursor-not-allowed bg-[#fef9f0]"],
      },
    },
});
