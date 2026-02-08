// Asymmetric Grid Layout Recipes
import type { StyleRecipes } from "./types";

export const asymmetricGridRecipes: StyleRecipes = {
  styleSlug: "asymmetric-grid",
  styleName: "Asymmetric Grid",
  recipes: {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Dynamic offset button with sharp edges and hover displacement",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-bold",
          "uppercase",
          "tracking-widest",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-4 py-2 text-xs" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-6 py-3 text-sm" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-8 py-4 text-base" },
          ],
          default: "md",
        },
      ],
      variants: {
        primary: {
          id: "primary",
          label: "Primary",
          labelZh: "主要",
          classes: [
            "bg-[#0f0f0f] text-white",
            "hover:-translate-x-1 hover:-translate-y-1",
            "hover:shadow-[4px_4px_0px_#ff3366]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "次要",
          classes: [
            "bg-white text-[#0f0f0f]",
            "border-2 border-[#0f0f0f]",
            "hover:-translate-x-1 hover:-translate-y-1",
            "hover:shadow-[4px_4px_0px_#0f0f0f]",
          ],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: [
            "bg-[#ff3366] text-white",
            "hover:-translate-x-1 hover:-translate-y-1",
            "hover:shadow-[4px_4px_0px_#0f0f0f]",
          ],
        },
      },
      slots: [
        { id: "label", label: "Label", labelZh: "文字", required: true, default: "Explore", type: "text" },
      ],
      states: {
        hover: [
          "hover:-translate-x-1",
          "hover:-translate-y-1",
        ],
        active: ["active:translate-x-0 active:translate-y-0 active:shadow-none"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "Irregular card with rotation and overlap capability",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-white",
          "border-2 border-[#0f0f0f]",
          "transition-transform duration-300",
        ],
      },
      parameters: [
        {
          id: "padding",
          label: "Padding",
          labelZh: "内边距",
          type: "select",
          options: [
            { value: "sm", label: "Small", labelZh: "小", classes: "p-6 md:p-8" },
            { value: "md", label: "Medium", labelZh: "中", classes: "p-8 md:p-10" },
            { value: "lg", label: "Large", labelZh: "大", classes: "p-10 md:p-12" },
          ],
          default: "md",
        },
        {
          id: "rotation",
          label: "Rotation",
          labelZh: "旋转",
          type: "select",
          options: [
            { value: "none", label: "None", labelZh: "无", classes: "" },
            { value: "slight-left", label: "Slight Left", labelZh: "左倾", classes: "-rotate-1" },
            { value: "slight-right", label: "Slight Right", labelZh: "右倾", classes: "rotate-1" },
            { value: "left", label: "Left", labelZh: "大左倾", classes: "-rotate-2" },
            { value: "right", label: "Right", labelZh: "大右倾", classes: "rotate-2" },
          ],
          default: "slight-left",
        },
        {
          id: "zIndex",
          label: "Layer",
          labelZh: "层级",
          type: "select",
          options: [
            { value: "back", label: "Back", labelZh: "后层", classes: "z-0" },
            { value: "middle", label: "Middle", labelZh: "中层", classes: "z-10" },
            { value: "front", label: "Front", labelZh: "前层", classes: "z-20" },
          ],
          default: "middle",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: ["bg-white"],
        },
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: ["bg-[#0f0f0f] text-white border-white"],
        },
        accent: {
          id: "accent",
          label: "Accent",
          labelZh: "强调",
          classes: ["bg-[#ff3366] text-white border-[#0f0f0f]"],
        },
      },
      slots: [
        { id: "eyebrow", label: "Eyebrow", labelZh: "眉标", required: false, type: "text" },
        { id: "title", label: "Title", labelZh: "标题", required: false, default: "Card Title", type: "text" },
        { id: "children", label: "Content", labelZh: "内容", required: true, default: "Card content goes here", type: "children" },
      ],
      states: {
        hover: ["hover:rotate-0"],
        active: [],
        disabled: ["opacity-50"],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Sharp-edged input with offset focus styling",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-transparent",
          "border-2 border-[#0f0f0f]",
          "text-[#0f0f0f]",
          "placeholder:text-gray-400",
          "focus:outline-none",
          "focus:border-[#ff3366]",
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
            { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-3 text-sm" },
            { value: "md", label: "Medium", labelZh: "中", classes: "px-4 py-4 text-base" },
            { value: "lg", label: "Large", labelZh: "大", classes: "px-6 py-5 text-lg" },
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
        inverted: {
          id: "inverted",
          label: "Inverted",
          labelZh: "反色",
          classes: [
            "bg-[#0f0f0f] text-white border-white",
            "placeholder:text-white/40",
            "focus:border-[#00d4ff]",
          ],
        },
      },
      slots: [
        { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, default: "your@email.com", type: "text" },
      ],
      states: {
        focus: [
          "focus:shadow-[4px_4px_0px_#00d4ff]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    section: {
      id: "section",
      name: "Grid Section",
      nameZh: "网格区块",
      description: "Asymmetric grid section with unequal columns",
      skeleton: {
        element: "section",
        baseClasses: [
          "grid grid-cols-12",
          "gap-4",
          "min-h-screen",
          "p-8",
        ],
      },
      parameters: [
        {
          id: "split",
          label: "Column Split",
          labelZh: "列分割",
          type: "select",
          options: [
            { value: "5-7", label: "5/7 Split", labelZh: "5/7 分割", classes: "" },
            { value: "4-8", label: "4/8 Split", labelZh: "4/8 分割", classes: "" },
            { value: "3-9", label: "3/9 Split", labelZh: "3/9 分割", classes: "" },
            { value: "7-5", label: "7/5 Split", labelZh: "7/5 分割", classes: "" },
            { value: "8-4", label: "8/4 Split", labelZh: "8/4 分割", classes: "" },
          ],
          default: "5-7",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: ["bg-white"],
        },
        inverted: {
          id: "inverted",
          label: "Inverted",
          labelZh: "反转",
          classes: ["bg-[#0f0f0f]"],
        },
      },
      slots: [
        { id: "left", label: "Left Column", labelZh: "左列", required: true, type: "element" },
        { id: "right", label: "Right Column", labelZh: "右列", required: true, type: "element" },
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
      description: "Sharp-edged navigation with offset hover effects",
      skeleton: {
        element: "nav",
        baseClasses: [
          "flex items-center justify-between",
          "px-8",
          "border-b-2 border-[#0f0f0f]",
        ],
      },
      parameters: [
        {
          id: "density",
          label: "Density",
          labelZh: "密度",
          type: "select",
          options: [
            { value: "compact", label: "Compact", labelZh: "紧凑", classes: "py-4" },
            { value: "comfortable", label: "Comfortable", labelZh: "舒适", classes: "py-6" },
            { value: "spacious", label: "Spacious", labelZh: "宽松", classes: "py-8" },
          ],
          default: "comfortable",
        },
      ],
      variants: {
        default: {
          id: "default",
          label: "Default",
          labelZh: "默认",
          classes: ["bg-white"],
        },
        dark: {
          id: "dark",
          label: "Dark",
          labelZh: "深色",
          classes: ["bg-[#0f0f0f] text-white border-white"],
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
  },
};
