// Cinematic Video Hero Component Recipes
import {
  createStyleRecipes,
  sizeParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
} from "./factory";

export const cinematicVideoHeroRecipes = createStyleRecipes("cinematic-video-hero", "Cinematic Video Hero", {
  button: {
    id: "button",
    name: "Button",
    nameZh: "按钮",
    description: "Warm-gold cinematic CTA and frosted secondary",
    skeleton: {
      element: "button",
      baseClasses: [
        "inline-flex items-center gap-2",
        "rounded-full",
        "transition-all duration-300 ease-out",
        "active:scale-[0.98]",
      ],
    },
    parameters: [
      sizeParam({
        sm: "px-5 py-2.5 text-xs",
        md: "px-7 py-3.5 text-sm",
        lg: "px-9 py-4 text-base",
      }),
      fullWidthParam,
    ],
    variants: {
      gold: variant("gold", "Gold", "金色", [
        "bg-[#E4C063] text-[#05060A] font-semibold",
        "hover:bg-[#efce78]",
      ]),
      frost: variant("frost", "Frosted", "毛玻璃", [
        "bg-white/10 backdrop-blur-md border border-white/25 text-white",
        "hover:bg-white/18 hover:border-white/40",
      ]),
      ghost: variant("ghost", "Ghost", "幽灵", [
        "bg-transparent text-white/80",
        "hover:text-white",
      ]),
    },
    slots: buttonSlots("Watch the film"),
    states: {
      hover: [],
    },
  },

  card: {
    id: "card",
    name: "Card",
    nameZh: "卡片",
    description: "Poster-backed scene card with a gradient scrim caption",
    skeleton: {
      element: "div",
      baseClasses: [
        "relative overflow-hidden",
        "rounded-xl",
        "bg-[#141821]",
      ],
    },
    parameters: [
      {
        id: "padding",
        label: "Ratio",
        labelZh: "比例",
        type: "select",
        options: [
          { value: "video", label: "Widescreen", labelZh: "宽银幕", classes: "aspect-video" },
          { value: "portrait", label: "Portrait", labelZh: "竖幅", classes: "aspect-[3/4]" },
          { value: "cinema", label: "Cinemascope", labelZh: "变形宽银幕", classes: "aspect-[21/9]" },
        ],
        default: "video",
      },
    ],
    variants: {
      scene: variant("scene", "Scene", "场景", []),
      framed: variant("framed", "Framed", "带框", ["border border-white/15"]),
    },
    slots: cardSlots("The long dissolve", "Scene notes from the opening reel."),
    states: {
      hover: [],
    },
  },

  input: {
    id: "input",
    name: "Input",
    nameZh: "输入框",
    description: "Frosted field legible over footage",
    skeleton: {
      element: "input",
      baseClasses: [
        "bg-white/10 backdrop-blur-md",
        "border border-white/25",
        "rounded-full",
        "px-5 py-3",
        "text-white placeholder-white/50",
        "focus:outline-none focus:border-[#E4C063]/70 focus:bg-white/15",
        "transition-all duration-300",
      ],
    },
    parameters: [fullWidthParam],
    variants: {
      frost: variant("frost", "Frosted", "毛玻璃", []),
      solid: variant("solid", "Solid", "实底", ["bg-[#141821] border-white/15 backdrop-blur-none"]),
    },
    slots: inputSlots("Email for the premiere"),
    states: {
      focus: [],
    },
  },
});
