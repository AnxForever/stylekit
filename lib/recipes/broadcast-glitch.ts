// Broadcast Glitch Component Recipes
import {
  sizeParam,
  paddingParam,
  fullWidthParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  variant,
  createStyleRecipes,
} from "./factory";

export const broadcastGlitchRecipes = createStyleRecipes(
  "broadcast-glitch",
  "Broadcast Glitch",
  {
    button: {
      id: "button",
      name: "Button",
      nameZh: "按钮",
      description: "Hard signal button that channel-splits on hover",
      skeleton: {
        element: "button",
        baseClasses: [
          "inline-flex items-center justify-center gap-2",
          "rounded-none border-2",
          "font-mono font-bold uppercase tracking-[0.15em]",
          "transition-transform duration-100",
          "active:translate-y-0.5",
        ],
      },
      parameters: [
        sizeParam({ sm: "px-4 py-2 text-xs", md: "px-7 py-3 text-sm", lg: "px-9 py-4 text-base" }),
        fullWidthParam,
      ],
      variants: {
        red: variant("red", "Red", "红", ["bg-[#FF2E4C]", "text-[#0B0B0E]", "border-[#EDEDED]"]),
        cyan: variant("cyan", "Cyan", "青", ["bg-[#00E5D8]", "text-[#0B0B0E]", "border-[#EDEDED]"]),
        yellow: variant("yellow", "Yellow", "黄", ["bg-[#F5E000]", "text-[#0B0B0E]", "border-[#EDEDED]"]),
        signal: variant("signal", "Signal", "信号", ["bg-transparent", "text-[#EDEDED]", "border-[#EDEDED]/40"]),
      },
      slots: buttonSlots("Transmit"),
      states: {
        hover: ["hover:[text-shadow:2px_0_#00E5D8,-2px_0_#F5E000]"],
        active: ["active:translate-y-0.5"],
        focus: ["focus:outline-none", "focus:border-[#00E5D8]"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "卡片",
      description: "CRT panel card with a scanline feel and a hard signal border",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative bg-[#101014]",
          "border-2 border-[#EDEDED]/30",
          "rounded-none",
        ],
      },
      parameters: [paddingParam({ sm: "p-4", md: "p-6", lg: "p-8" })],
      variants: {
        red: variant("red", "Red channel", "红", ["border-t-4", "border-t-[#FF2E4C]"]),
        cyan: variant("cyan", "Cyan channel", "青", ["border-t-4", "border-t-[#00E5D8]"]),
        yellow: variant("yellow", "Yellow channel", "黄", ["border-t-4", "border-t-[#F5E000]"]),
      },
      slots: cardSlots("Signal Lost", "Please stand by. Normal service will not resume."),
      states: {
        hover: ["hover:border-[#00E5D8]/50"],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "输入框",
      description: "Terminal field with cyan phosphor text",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full bg-[#101014] rounded-none px-3",
          "font-mono text-[#00E5D8] placeholder-[#EDEDED]/25",
          "border-2 border-[#EDEDED]/30",
          "focus:outline-none focus:border-[#00E5D8]",
          "transition-colors duration-100",
        ],
      },
      parameters: [
        sizeParam({ sm: "py-2 text-sm", md: "py-3 text-base", lg: "py-4 text-lg" }),
        fullWidthParam,
      ],
      variants: {
        default: variant("default", "Default", "默认", []),
      },
      slots: inputSlots("type to transmit_"),
      states: {
        focus: ["focus:border-[#00E5D8]"],
      },
    },
  },
);
