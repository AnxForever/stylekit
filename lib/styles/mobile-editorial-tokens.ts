// Mobile Editorial Style Tokens - Scaffold
import type { StyleTokens } from "./tokens";

export const mobileEditorialTokens: StyleTokens = {
  "border": {
    "width": "border",
    "color": "border-[#24211f]",
    "radius": "rounded-md",
    "style": "border-solid"
  },
  "shadow": {
    "sm": "shadow-sm",
    "md": "shadow-md",
    "lg": "shadow-lg",
    "none": "shadow-none",
    "hover": "hover:shadow-md",
    "focus": "focus:shadow-md"
  },
  "interaction": {
    "transition": "transition-all duration-200",
    "hoverOpacity": "hover:opacity-90",
    "active": "active:scale-[0.98]"
  },
  "typography": {
    "heading": "font-semibold tracking-tight",
    "body": "font-sans",
    "sizes": {
      "hero": "text-4xl md:text-6xl",
      "h1": "text-3xl md:text-5xl",
      "h2": "text-2xl md:text-3xl",
      "h3": "text-xl md:text-2xl",
      "body": "text-sm md:text-base",
      "small": "text-xs md:text-sm"
    }
  },
  "spacing": {
    "section": "py-10 md:py-20",
    "container": "px-4 md:px-8",
    "card": "p-5 md:p-6",
    "gap": {
      "sm": "gap-2 md:gap-4",
      "md": "gap-4 md:gap-6",
      "lg": "gap-6 md:gap-8"
    }
  },
  "colors": {
    "background": {
      "primary": "bg-[#fffdf8]",
      "secondary": "bg-[#24211f]",
      "accent": [
        "bg-[#e97b61]",
        "bg-[#c5d8c1]",
        "bg-[#e9d7a9]",
        "bg-[#d7c4e8]"
      ]
    },
    "text": {
      "primary": "text-[#24211f]",
      "secondary": "text-[#e97b61]",
      "muted": "text-zinc-500"
    },
    "button": {
      "primary": "bg-[#24211f] text-white",
      "secondary": "bg-[#fffdf8] text-[#24211f]",
      "danger": "bg-red-500 text-white"
    }
  },
  "forbidden": {
    "classes": [],
    "patterns": [],
    "reasons": {}
  },
  "required": {
    "button": [
      "rounded-md",
      "border",
      "font-medium",
      "inline-flex",
      "items-center"
    ],
    "card": [
      "rounded-md",
      "border",
      "bg-white/80"
    ],
    "input": [
      "rounded-md",
      "border",
      "bg-background",
      "focus:outline-none"
    ]
  }
};
