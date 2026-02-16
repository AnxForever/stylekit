// Minimalist Flat Component Recipes
import {
  sizeParam,
  fullWidthParam,
  paddingParam,
  interactiveParam,
  buttonSlots,
  cardSlots,
  inputSlots,
  defaultVariant,
  variant,
  createStyleRecipes,
} from "./factory";

export const minimalistFlatRecipes = createStyleRecipes(
  "minimalist-flat",
  "Minimalist Flat",
  {
    button: {
      id: "button",
      name: "Button",
      nameZh: "\u6309\u94ae",
      description: "Ultra-minimal button with no shadows and high contrast",
      skeleton: {
        element: "button",
        baseClasses: [
          "font-medium",
          "border-2 border-black",
          "transition-colors duration-200",
        ],
      },
      parameters: [
        sizeParam({
          sm: "px-4 py-1.5 text-sm",
          md: "px-5 py-2 md:px-6 md:py-3 text-sm md:text-base",
          lg: "px-6 py-3 md:px-8 md:py-4 text-base md:text-lg",
        }),
        fullWidthParam,
      ],
      variants: {
        primary: {
          id: "primary",
          label: "Primary",
          labelZh: "\u4e3b\u8981",
          classes: ["bg-black text-white"],
        },
        secondary: {
          id: "secondary",
          label: "Secondary",
          labelZh: "\u6b21\u8981",
          classes: ["bg-white text-black"],
        },
        outline: {
          id: "outline",
          label: "Outline",
          labelZh: "\u8f6e\u5ed3",
          classes: ["bg-transparent text-black"],
        },
      },
      slots: buttonSlots("Click Me"),
      states: {
        hover: ["hover:bg-white hover:text-black"],
        active: ["active:bg-gray-100"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
    card: {
      id: "card",
      name: "Card",
      nameZh: "\u5361\u7247",
      description: "Flat card with thin border and no shadow",
      skeleton: {
        element: "div",
        baseClasses: [
          "bg-white",
          "border-2 border-black",
          "transition-colors duration-200",
        ],
      },
      parameters: [
        paddingParam({
          sm: "p-4 md:p-5",
          md: "p-5 md:p-8",
          lg: "p-8 md:p-12",
        }),
        interactiveParam("cursor-pointer", false),
      ],
      variants: {
        default: defaultVariant,
        inverted: variant("inverted", "Inverted", "\u53cd\u8272", ["bg-black text-white border-black"]),
        accent: variant("accent", "Accent", "\u5f3a\u8c03", ["bg-[#ff3366] text-white border-[#ff3366]"]),
      },
      slots: cardSlots(),
      states: {
        hover: ["hover:bg-black hover:text-white"],
      },
    },

    input: {
      id: "input",
      name: "Input",
      nameZh: "\u8f93\u5165\u6846",
      description: "Minimal input with bottom border and no shadow",
      skeleton: {
        element: "input",
        baseClasses: [
          "w-full",
          "bg-transparent",
          "border-0 border-b-2 border-black",
          "text-black",
          "placeholder:text-gray-400",
          "focus:outline-none",
          "transition-colors duration-200",
        ],
      },
      parameters: [
        sizeParam({
          sm: "px-0 py-1.5 text-sm",
          md: "px-0 py-2 md:py-3 text-sm md:text-base",
          lg: "px-0 py-3 md:py-4 text-base md:text-lg",
        }),
      ],
      variants: {
        default: defaultVariant,
        boxed: variant("boxed", "Boxed", "\u6846\u7ebf", ["border-2 border-black px-4"]),
      },
      slots: inputSlots(),
      states: {
        focus: ["focus:border-[#ff3366]"],
        disabled: ["opacity-40 cursor-not-allowed"],
      },
    },
  },
);
