// Pastel App UI Style Tokens - Scaffold
import type { StyleTokens } from "./tokens";

export const pastelUiTokens: StyleTokens = {
  "border": {
    "width": "border",
    "color": "border-[#66508f]",
    "radius": "rounded-lg",
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
      "primary": "bg-[#fff8f0]",
      "secondary": "bg-[#66508f]",
      "accent": [
        "bg-[#d9c7ff]",
        "bg-[#cbefdf]",
        "bg-[#ffe49a]",
        "bg-[#ffb5a7]"
      ]
    },
    "text": {
      "primary": "text-[#66508f]",
      "secondary": "text-[#d9c7ff]",
      "muted": "text-zinc-500"
    },
    "button": {
      "primary": "bg-[#66508f] text-white",
      "secondary": "bg-[#fff8f0] text-[#66508f]",
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
      "rounded-lg",
      "border",
      "font-medium",
      "inline-flex",
      "items-center"
    ],
    "card": [
      "rounded-lg",
      "border",
      "bg-white/80"
    ],
    "input": [
      "rounded-lg",
      "border",
      "bg-background",
      "focus:outline-none"
    ]
  }
};
