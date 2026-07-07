// Warm Organic Component Recipes
import { createStyleRecipes } from "./factory";

export const warmOrganicRecipes = createStyleRecipes("warm-organic", "Warm Organic", {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Earthy terracotta action button with warm shadow, rounded-lg, and a clay-like hover deepen",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-medium",
          "rounded-lg",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-4 py-1.5 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-6 py-2.5 text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-8 py-3 text-base" },
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
            "bg-[#C86A4A] text-white",
            "shadow-[0_2px_12px_-3px_rgba(200,106,74,0.3)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-transparent text-[#2D2A24]",
            "border border-[#D4BFA5]",
          ],
        },
        ghost: {
          id: "ghost",
          label: "Ghost",
          labelZh: "幽灵",
          classes: [
            "bg-transparent text-[#2D2A24]/65",
            "hover:bg-[#E8DED1]/60",
          ],
        },
      },
      slots: [
        { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Get in Touch", type: "text" },
      ],
      states: {
        hover: [
          "hover:bg-[#B55A3A]",
          "hover:translate-y-[-1px]",
        ],
        active: ["active:bg-[#A04A2A]", "active:scale-[0.98]"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Warm sand-toned card with soft clay shadow, warm hairline border, and organic decorative dot accent",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#E8DED1]",
          "rounded-lg",
          "shadow-[0_4px_20px_-4px_rgba(45,42,36,0.10)]",
          "transition-all duration-200",
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
          default: false,
          trueClasses: "cursor-pointer",
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
          labelZh: "凸起",
          classes: [
            "shadow-[0_8px_30px_-6px_rgba(45,42,36,0.12)]",
          ],
        },
        clay: {
          id: "clay",
          label: "Clay",
          labelZh: "黏土",
          classes: [
            "bg-[#D4BFA5]",
            "border border-[#D4BFA5]/60",
          ],
        },
      },
      slots: [
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Clay House", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "A warm, grounded project with natural materials and earthy tones.", type: "children" },
      ],
      states: {
        hover: [
          "hover:shadow-[0_8px_30px_-6px_rgba(45,42,36,0.18)]",
          "hover:-translate-y-0.5",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Warm gray input with clay border and a terracotta-tinted focus ring, like writing on handmade paper",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-[#E8DED1]/40",
          "border border-[#D4BFA5]",
          "rounded-lg",
          "font-sans",
          "text-[#2D2A24]",
          "placeholder:text-[#2D2A24]/40",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-2 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-3 text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-4 py-3.5 text-base" },
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
        search: {
          id: "search",
          label: "Search",
          labelZh: "搜索",
          classes: [
            "pl-10",
            "bg-[#F5F0EB]",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "Your email address", type: "text" },
      ],
      states: {
        focus: [
          "focus:border-[#C86A4A]",
          "focus:ring-1 focus:ring-[#C86A4A]/20",
        ],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },

    divider: {
      id: "divider",
      name: "Divider",
      nameZh: "分隔线",
      description: "Organic decorative divider with warm hairline and terracotta or olive dots, like a natural section break in a sketchbook",
      skeleton: {
        element: "div",
        baseClasses: [
          "flex items-center justify-center gap-2",
          "w-full",
        ],
        children: [
          { element: "span", classes: ["flex-1", "h-px", "bg-[#D4BFA5]", "opacity-50"], slot: "lineLeft" },
          { element: "span", classes: ["inline-block", "rounded-full"], slot: "dot" },
          { element: "span", classes: ["flex-1", "h-px", "bg-[#D4BFA5]", "opacity-50"], slot: "lineRight" },
        ],
      },
      parameters: [
        {
          id: "size",
          label: "Size",
          labelZh: "大小",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "my-6" },
            { value: "md", label: "Medium", labelZh: "中", classes: "my-10" },
            { value: "lg", label: "Large", labelZh: "大", classes: "my-16" },
          ],
          default: "md",
        },
      ],
      variants: {
        terracotta: {
          id: "terracotta",
          label: "Terracotta",
          labelZh: "陶土色",
          classes: [
            "w-2 h-2",
            "bg-[#C86A4A]/40",
          ],
        },
        olive: {
          id: "olive",
          label: "Olive",
          labelZh: "橄榄绿",
          classes: [
            "w-2 h-2",
            "bg-[#7A8B5E]/40",
          ],
        },
        double: {
          id: "double",
          label: "Double Dot",
          labelZh: "双点",
          classes: [
            "w-1.5 h-1.5",
            "bg-[#C86A4A]/30",
          ],
        },
      },
      slots: [
        { id: "lineLeft", label: "Left Line", labelZh: "左线", required: false, type: "element" },
        { id: "dot", label: "Center Dot", labelZh: "中心点", required: false, type: "element" },
        { id: "lineRight", label: "Right Line", labelZh: "右线", required: false, type: "element" },
      ],
    },
});
