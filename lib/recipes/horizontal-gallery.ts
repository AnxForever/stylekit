// Horizontal Gallery Component Recipes
import {
  sizeParam,
  fullWidthParam,
  paddingParam,
  interactiveParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const horizontalGalleryRecipes = createStyleRecipes("horizontal-gallery", "Horizontal Gallery", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Squared-off gallery button with uppercase tracked lettering, no radius and no shadow",
    skeleton: {
      element: "button",
      baseClasses: [
        "rounded-none",
        "font-light",
        "uppercase",
        "tracking-[0.2em]",
        "transition-colors duration-300",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-5 py-2 text-[10px]",
        md: "px-8 py-3 text-xs",
        lg: "px-10 py-4 text-xs md:text-sm",
      }),
      fullWidthParam,
    ],
    variants: {
      primary: variant("primary", "Primary", "主要", [
        "bg-[#1A1A1A] text-[#FCFCFA]",
      ]),
      outline: variant("outline", "Outline", "描边", [
        "bg-transparent text-[#1A1A1A]",
        "border border-[#1A1A1A]",
      ]),
      ghost: variant("ghost", "Ghost", "文字", [
        "bg-transparent text-[#1A1A1A]",
        "underline underline-offset-8 decoration-[#A85A3A] decoration-1",
      ]),
      terracotta: variant("terracotta", "Terracotta", "赤陶", [
        "bg-[#A85A3A] text-[#FCFCFA]",
      ]),
    },
    slots: buttonSlots("View Works"),
    states: {
      hover: ["hover:opacity-80"],
      active: ["active:opacity-60"],
      focus: ["focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-2"],
      disabled: ["opacity-40 cursor-not-allowed"],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Artwork figure card for the horizontal strip: borderless image area, index, hairline caption",
    skeleton: {
      element: "div",
      baseClasses: [
        "bg-[#FCFCFA]",
        "rounded-none",
        "shadow-none",
      ],
    },
    parameters: [
      paddingParam({
        sm: "p-0",
        md: "p-0 pb-4",
        lg: "p-0 pb-6",
      }),
      interactiveParam("group cursor-pointer"),
    ],
    variants: {
      artwork: variant("artwork", "Artwork", "作品", []),
      plaque: variant("plaque", "Wall Label", "墙签", [
        "border border-[#E8E6E1] p-6",
      ]),
      divided: variant("divided", "Divided", "分栏", [
        "border-t border-[#E8E6E1] pt-5",
      ]),
    },
    slots: cardSlots("No. 01 — Untitled Study", "Archival pigment print, 2026. Edition of 12."),
    states: {
      hover: ["hover:bg-[#FCFCFA]"],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Visitor-register underline input: transparent field over a hairline that inks on focus",
    skeleton: {
      element: "input",
      baseClasses: [
        "w-full",
        "bg-transparent",
        "rounded-none",
        "border-0 border-b border-[#E8E6E1]",
        "text-[#1A1A1A]",
        "placeholder:text-xs placeholder:uppercase placeholder:tracking-[0.2em] placeholder:text-[#8A8A85]",
        "focus:outline-none",
        "transition-colors duration-300",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-0 py-2 text-sm",
        md: "px-0 py-3 text-sm md:text-base",
        lg: "px-0 py-4 text-base",
      }),
      fullWidthParam,
    ],
    variants: {
      underline: variant("underline", "Underline", "下划线", []),
      boxed: variant("boxed", "Boxed", "细框", [
        "border border-[#E8E6E1] px-4",
      ]),
    },
    slots: inputSlots("YOUR NAME"),
    states: {
      focus: ["focus:border-[#1A1A1A]"],
      disabled: ["opacity-40 cursor-not-allowed"],
    },
  },
});
