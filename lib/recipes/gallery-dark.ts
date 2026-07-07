// Dark Gallery Component Recipes
import { createStyleRecipes } from "./factory";

export const galleryDarkRecipes = createStyleRecipes("gallery-dark", "Dark Gallery", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Minimal transparent or amber-accented button for dark gallery interfaces",
    skeleton: {
      element: "button",
      baseClasses: [
        "font-sans",
        "text-xs",
        "tracking-[0.15em]",
        "transition-colors duration-200",
      ],
    },
    parameters: [
      {
        id: "variant",
        label: "Variant",
        labelZh: "样式",
        type: "select",
        options: [
          { value: "ghost", label: "Ghost", labelZh: "幽灵", classes: "bg-transparent text-[#666666] hover:text-white" },
          { value: "amber", label: "Amber", labelZh: "琥珀", classes: "bg-[#C4956A] text-white hover:bg-[#A07850]" },
          { value: "outline", label: "Outline", labelZh: "描边", classes: "border border-[#2A2A2A] text-white hover:border-[#666666]" },
        ],
        default: "ghost",
      },
      {
        id: "size",
        label: "Size",
        labelZh: "尺寸",
        type: "select",
        options: [
          { value: "sm", label: "Small", labelZh: "小", classes: "px-3 py-1.5 text-[10px]" },
          { value: "md", label: "Medium", labelZh: "中", classes: "px-5 py-2 text-xs" },
          { value: "lg", label: "Large", labelZh: "大", classes: "px-8 py-3 text-sm" },
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
      ghost: {
        id: "ghost",
        label: "Ghost",
        labelZh: "幽灵",
        classes: ["bg-transparent text-[#666666]", "hover:text-white"],
      },
    },
    slots: [
      { id: "label", label: "Label", labelZh: "文字", required: true, default: "View Series", type: "text" },
    ],
    states: {
      hover: ["hover:text-white", "hover:opacity-80"],
      disabled: ["opacity-30 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Image card with hover metadata reveal, for gallery grids",
    skeleton: {
      element: "div",
      baseClasses: [
        "group relative overflow-hidden bg-[#1A1A1A] rounded-sm cursor-pointer",
      ],
    },
    parameters: [
      {
        id: "aspect",
        label: "Aspect",
        labelZh: "比例",
        type: "select",
        options: [
          { value: "square", label: "Square", labelZh: "方形", classes: "aspect-square" },
          { value: "landscape", label: "Landscape", labelZh: "横图", classes: "aspect-[4/3]" },
          { value: "portrait", label: "Portrait", labelZh: "竖图", classes: "aspect-[3/4]" },
          { value: "wide", label: "Wide", labelZh: "宽幅", classes: "aspect-[2/1]" },
        ],
        default: "square",
      },
      {
        id: "padding",
        label: "Padding",
        labelZh: "内边距",
        type: "select",
        options: [
          { value: "none", label: "None", labelZh: "无", classes: "p-0" },
          { value: "sm", label: "Small", labelZh: "小", classes: "p-2" },
          { value: "md", label: "Medium", labelZh: "中", classes: "p-4" },
        ],
        default: "none",
      },
    ],
    variants: {
      default: {
        id: "default",
        label: "Default",
        labelZh: "默认",
        classes: [""],
      },
      featured: {
        id: "featured",
        label: "Featured",
        labelZh: "精选",
        classes: ["col-span-2", "row-span-2"],
      },
    },
    slots: [
      { id: "children", label: "Children", labelZh: "子元素", required: true, type: "children" },
      { id: "image", label: "Image", labelZh: "图片", required: false, type: "element" },
      { id: "caption", label: "Caption", labelZh: "图注", required: false, type: "text" },
    ],
    states: {
      hover: ["group-hover:opacity-100", "group-hover:translate-y-0"],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Dark background input with minimal styling for contact forms",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full bg-transparent border-b border-[#2A2A2A]",
        "px-0 py-2 text-sm text-white",
        "placeholder:text-[#555555]",
        "focus:outline-none focus:border-[#C4956A]",
        "transition-colors duration-200",
        "font-sans font-light",
      ],
    },
    parameters: [
      {
        id: "size",
        label: "Size",
        labelZh: "尺寸",
        type: "select",
        options: [
          { value: "sm", label: "Small", labelZh: "小", classes: "py-1.5 text-xs" },
          { value: "md", label: "Medium", labelZh: "中", classes: "py-2 text-sm" },
          { value: "lg", label: "Large", labelZh: "大", classes: "py-3 text-base" },
        ],
        default: "md",
      },
      {
        id: "fullWidth",
        label: "Full Width",
        labelZh: "全宽",
        type: "boolean",
        default: true,
        trueClasses: "w-full",
      },
    ],
    variants: {
      default: {
        id: "default",
        label: "Default",
        labelZh: "默认",
        classes: [""],
      },
    },
    slots: [
      { id: "placeholder", label: "Placeholder", labelZh: "占位符", required: false, type: "text" },
    ],
    states: {
      focus: ["focus:border-[#C4956A]"],
    },
  },
});
