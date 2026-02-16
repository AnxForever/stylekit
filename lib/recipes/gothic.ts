// Gothic Component Recipes
import {
  sizeParam,
  fullWidthParam,
  paddingParam,
  interactiveParam,
  visibleParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  childrenSlot,
  labelSlot,
  iconSlot,
  defaultVariant,
  variant,
  createStyleRecipes,
} from "./factory";

export const gothicRecipes = createStyleRecipes(
  "gothic",
  "Gothic",
  {
    button: {
      id: "button",
      name: "Button",
      nameZh: "\u6309\u94ae",
      description: "Gothic button with ornate borders, deep purple tones and cathedral-inspired aesthetic",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-serif",
          "uppercase",
          "tracking-widest",
          "border-2",
          "transition-all duration-300 ease-in-out",
        ],
      },
      parameters: [
        sizeParam({
          sm: "px-3 py-1.5 text-sm",
          md: "px-4 py-2 md:px-6 md:py-3 text-sm md:text-base",
          lg: "px-6 py-3 md:px-8 md:py-4 text-base md:text-lg",
        }),
        fullWidthParam,
      ],
      variants: {
        primary: {
          id: "primary",
          label: "Primary",
          labelZh: "\u4e3b\u8981",
          classes: [
            "bg-[#2d1b4e] text-[#c9a227]",
            "border-[#c9a227]/60",
            "shadow-[0_4px_16px_rgba(45,27,78,0.6)]",
          ],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "\u6b21\u8981",
          classes: [
            "bg-[#0a0a0a] text-[#8b1a1a]",
            "border-[#8b1a1a]/60",
            "shadow-[0_4px_12px_rgba(139,26,26,0.4)]",
          ],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "\u8f6e\u5ed3",
          classes: [
            "bg-transparent text-[#c9a227]",
            "border-[#c9a227]/50",
          ],
        },
      },
      slots: buttonSlots("Enter"),
      states: {
        hover: [
          "hover:shadow-[0_6px_24px_rgba(201,162,39,0.4)]",
          "hover:border-[#c9a227]",
        ],
        active: ["active:scale-95"],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },

    card: {
      id: "card",
      name: "Card",
      nameZh: "\u5361\u7247",
      description: "Dark gothic card with ornate borders and cathedral-window aesthetic",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-[#0a0a0a]/90",
          "border-2 border-[#c9a227]/40",
          "shadow-[0_4px_20px_rgba(10,10,10,0.8)]",
          "transition-all duration-300 ease-in-out",
        ],
      },
      parameters: [
        paddingParam({ sm: "p-3 md:p-5", md: "p-5 md:p-8", lg: "p-6 md:p-10" }),
        interactiveParam("hover:-translate-y-1 cursor-pointer"),
      ],
      variants: {
        default: defaultVariant,
        blood: variant("blood", "Blood", "\u8840\u8272", ["border-[#8b1a1a]/50", "shadow-[0_4px_20px_rgba(139,26,26,0.3)]"]),
        gold: variant("gold", "Gold", "\u91d1\u8272", ["border-[#c9a227]/60", "shadow-[0_4px_20px_rgba(201,162,39,0.3)]"]),
      },
      slots: cardSlots(),
      states: {
        hover: [
          "hover:shadow-[0_8px_30px_rgba(201,162,39,0.3)]",
          "hover:border-[#c9a227]/60",
        ],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "\u8f93\u5165\u6846",
      description: "Gothic-styled input with ornate border and dark surface",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "border-2 border-[#c9a227]/30",
          "bg-[#0a0a0a]/80",
          "text-[#c9a227]",
          "placeholder:text-[#c9a227]/30",
          "font-serif",
          "focus:outline-none",
          "transition-all duration-300 ease-in-out",
        ],
      },
      parameters: [
        sizeParam({
          sm: "px-2 py-1.5 text-sm",
          md: "px-3 py-2 md:px-4 md:py-3 text-sm md:text-base",
          lg: "px-4 py-3 md:px-5 md:py-4 text-base md:text-lg",
        }),
      ],
      variants: {
        default: defaultVariant,
        blood: variant("blood", "Blood", "\u8840\u8272", ["border-[#8b1a1a]/50", "text-[#8b1a1a]", "placeholder:text-[#8b1a1a]/30"]),
      },
      slots: inputSlots(),
      states: {
        focus: [
          "focus:border-[#c9a227]",
          "focus:shadow-[0_0_16px_rgba(201,162,39,0.3)]",
        ],
        disabled: ["opacity-50 cursor-not-allowed"],
      },
    },
    stonePanel: {
      id: "stonePanel",
      name: "Stone Panel",
      nameZh: "\u77f3\u6750\u9762\u677f",
      description: "Medieval stone-textured panel with carved edge effect",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]",
          "border-4 border-[#3a3a3a]",
          "shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),inset_0_-2px_4px_rgba(0,0,0,0.3)]",
          "p-6",
        ],
      },
      parameters: [visibleParam],
      variants: {
        default: defaultVariant,
        dark: variant("dark", "Dark", "\u6df1\u8272", ["from-[#1a1a1a] to-[#0a0a0a]"]),
      },
      slots: childrenSlot(),
      states: {},
    },

    shieldBadge: {
      id: "shieldBadge",
      name: "Shield Badge",
      nameZh: "\u76fe\u724c\u5fbd\u7ae0",
      description: "Heraldic shield-shaped badge for status or labels",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center justify-center",
          "px-4 py-2",
          "bg-[#2d1b4e]",
          "text-[#c9a227]",
          "font-serif uppercase tracking-wider text-sm",
          "clip-path-shield",
        ],
      },
      parameters: [visibleParam],
      variants: {
        purple: variant("purple", "Purple", "\u7d2b\u8272", ["bg-[#2d1b4e]"]),
        blood: variant("blood", "Blood", "\u8840\u8272", ["bg-[#8b1a1a]"]),
        gold: variant("gold", "Gold", "\u91d1\u8272", ["bg-[#c9a227] text-[#0a0a0a]"]),
      },
      slots: labelSlot("Knight"),
      states: {},
    },
    waxSeal: {
      id: "waxSeal",
      name: "Wax Seal",
      nameZh: "\u706b\u6f06\u5370\u7ae0",
      description: "Circular wax seal decoration with embossed effect",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-flex items-center justify-center",
          "w-16 h-16",
          "rounded-full",
          "bg-[#8b1a1a]",
          "shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.5)]",
        ],
      },
      parameters: [
        sizeParam({ sm: "w-12 h-12", md: "w-16 h-16", lg: "w-20 h-20" }),
      ],
      variants: {
        default: defaultVariant,
      },
      slots: iconSlot(),
      states: {},
    },

    traceryDivider: {
      id: "traceryDivider",
      name: "Tracery Divider",
      nameZh: "\u82b1\u7a97\u5206\u9694\u7ebf",
      description: "Gothic tracery-inspired decorative divider",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "w-full h-8",
          "flex items-center justify-center",
        ],
      },
      parameters: [visibleParam],
      variants: {
        default: defaultVariant,
      },
      slots: childrenSlot(false),
      states: {},
    },

    illuminatedInitial: {
      id: "illuminatedInitial",
      name: "Illuminated Initial",
      nameZh: "\u88c5\u9970\u9996\u5b57\u6bcd",
      description: "Medieval illuminated manuscript style decorative initial letter",
      skeleton: {
        element: "div",
        baseClasses: [
          "inline-block",
          "text-6xl font-serif font-bold",
          "text-[#c9a227]",
          "float-left mr-2",
          "leading-none",
        ],
      },
      parameters: [visibleParam],
      variants: {
        gold: variant("gold", "Gold", "\u91d1\u8272", ["text-[#c9a227] drop-shadow-[0_2px_4px_rgba(201,162,39,0.5)]"]),
        blood: variant("blood", "Blood", "\u8840\u8272", ["text-[#8b1a1a] drop-shadow-[0_2px_4px_rgba(139,26,26,0.5)]"]),
      },
      slots: [{ id: "letter", label: "Letter", labelZh: "\u5b57\u6bcd", required: true, default: "T", type: "text" }],
      states: {},
    },
    parchmentCard: {
      id: "parchmentCard",
      name: "Parchment Card",
      nameZh: "\u7f8a\u76ae\u7eb8\u5361\u7247",
      description: "Card styled to look like aged parchment with burnt edges",
      skeleton: {
        element: "div",
        baseClasses: [
          "relative",
          "bg-gradient-to-br from-[#f5f0e1] to-[#e5d9c3]",
          "p-6",
          "shadow-lg",
        ],
      },
      parameters: [visibleParam],
      variants: {
        default: defaultVariant,
        aged: variant("aged", "Aged", "\u9648\u65e7", ["from-[#e5d9c3] to-[#d4c4a8]"]),
      },
      slots: childrenSlot(),
      states: {},
    },
  },
);
