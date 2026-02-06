import { DesignStyle } from "./index";

export const magicCircle: DesignStyle = {
  slug: "magic-circle",
  name: "魔法阵风",
  nameEn: "Magic Circle",
  description:
    "同心圆环嵌套体系、六芒星几何核心、符文铭文沿圆路径排列、生命之花神圣几何、金色辉光辐射与炼金术符号交织的奇幻视觉风格。",
  cover: "/styles/magic-circle.svg",
  styleType: "visual",
  tags: ["expressive", "modern"],
  category: "expressive",
  colors: {
    primary: "#1e1b4b",
    secondary: "#0a0920",
    accent: ["#fbbf24", "#e2e8f0", "#818cf8"],
  },
  keywords: ["魔法阵", "符文", "神秘", "奇幻", "光效", "几何", "魔法", "同心圆", "六芒星"],

  philosophy: `Magic Circle draws from the arcane tradition of geometric summoning circles, weaving precision geometry with radiant light effects.

Core principles:
- Concentric ring system: multiple nested circles of varying thickness, dash patterns, and colors
- Hexagram/pentagram central figures: overlapping triangles as primary structural motifs
- Runic inscription borders: text-like marks arranged along circular paths
- Sacred geometry patterns: Flower of Life, Metatron's Cube as background textures
- Rotating ring animation: slow counter-rotating rings suggesting arcane machinery
- Golden center radiation: warm glow emanating from the center of compositions
- Alchemical symbols: fire, water, air, earth triangles at intersection points`,

  doList: [
    "Use deep dark navy backgrounds (bg-[#0a0920])",
    "Add concentric ring decorations around focal elements",
    "Use hexagonal or circular card layouts",
    "Apply runic inscription marks along borders",
    "Add golden glow radiation from center of elements",
    "Use sacred geometry patterns as subtle backgrounds",
    "Place alchemical symbols at geometric intersection points",
  ],

  dontList: [
    "No bright neon colors (use warm gold and cool indigo only)",
    "No brutalist style elements",
    "No pixel art aesthetics",
    "No heavy/thick borders",
    "No informal/handwritten fonts",
  ],

  components: {
    button: {
      name: "Button",
      description: "Hexagon-bordered button with golden glow hover radiation",
      code: `<button className="
  relative px-6 py-3
  bg-[#1e1b4b] text-[#fbbf24]
  font-serif font-semibold tracking-wide
  border border-[#fbbf24]/30
  rounded-sm
  shadow-[0_0_20px_rgba(251,191,36,0.2)]
  hover:shadow-[0_0_35px_rgba(251,191,36,0.5)]
  hover:border-[#fbbf24]/60
  transition-all duration-500
">
  Invoke
</button>`,
    },
    card: {
      name: "Card",
      description: "Card with concentric ring border decorations and runic edge marks",
      code: `<div className="
  relative p-8
  bg-[#0a0920]
  border border-[#fbbf24]/15
  rounded-sm
  shadow-[0_0_20px_rgba(251,191,36,0.12)]
  hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]
  hover:border-[#fbbf24]/30
  transition-all duration-500
">
  <h3 className="text-2xl font-serif font-bold text-[#fbbf24] mb-3">
    Arcanum
  </h3>
  <p className="text-[#e2e8f0]/50 font-sans">
    Ancient geometries reveal hidden truths
  </p>
</div>`,
    },
    input: {
      name: "Input",
      description: "Input with geometric frame and golden glow focus",
      code: `<input
  type="text"
  placeholder="Enter rune..."
  className="
    w-full px-4 py-3
    bg-[#0a0920]
    border border-[#fbbf24]/15
    rounded-sm
    text-[#e2e8f0] placeholder-[#e2e8f0]/25
    font-sans
    focus:border-[#fbbf24]/50
    focus:shadow-[0_0_20px_rgba(251,191,36,0.25)]
    focus:outline-none
    transition-all duration-500
  "
/>`,
    },
    hero: {
      name: "Hero",
      description: "Hero with concentric ring decorations and hexagram layout",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#0a0920]
  relative overflow-hidden
">
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="w-[500px] h-[500px] border border-[#fbbf24]/8 rounded-full animate-spin" style={{ animationDuration: "40s" }} />
    <div className="absolute w-[400px] h-[400px] border border-dashed border-[#818cf8]/6 rounded-full animate-spin" style={{ animationDuration: "60s", animationDirection: "reverse" }} />
    <div className="absolute w-[300px] h-[300px] border border-[#fbbf24]/10 rounded-full" />
  </div>
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#fbbf24] mb-2
      [text-shadow:0_0_40px_rgba(251,191,36,0.4)]">
      ARCANE CIRCLE
    </h1>
  </div>
</section>`,
    },
  },

  globalCss: `/* Magic Circle Global Styles */

:root {
  --mc-navy: #1e1b4b;
  --mc-dark: #0a0920;
  --mc-gold: #fbbf24;
  --mc-silver: #e2e8f0;
  --mc-indigo: #818cf8;
}

/* Golden glow text */
.mc-gold-glow {
  text-shadow: 0 0 25px var(--mc-gold), 0 0 50px rgba(251, 191, 36, 0.2);
}

/* Concentric ring decoration */
.mc-rings {
  position: relative;
}
.mc-rings::before {
  content: "";
  position: absolute;
  inset: -20px;
  border: 1px solid rgba(251, 191, 36, 0.08);
  border-radius: 50%;
  animation: mc-rotate 30s linear infinite;
}
.mc-rings::after {
  content: "";
  position: absolute;
  inset: -40px;
  border: 1px dashed rgba(129, 140, 248, 0.06);
  border-radius: 50%;
  animation: mc-rotate 45s linear infinite reverse;
}

@keyframes mc-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Runic inscription border */
.mc-rune-border {
  position: relative;
}
.mc-rune-border::after {
  content: "--- ... --- . -- --- ...";
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 8px;
  letter-spacing: 4px;
  color: rgba(251, 191, 36, 0.15);
  pointer-events: none;
}

/* Sacred geometry shimmer */
.mc-sacred-bg {
  background-image:
    radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 25% 25%, rgba(129, 140, 248, 0.02) 0%, transparent 40%),
    radial-gradient(circle at 75% 75%, rgba(129, 140, 248, 0.02) 0%, transparent 40%);
}

/* Center glow radiation */
.mc-center-glow {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(251, 191, 36, 0.08) 0%,
    rgba(251, 191, 36, 0.02) 40%,
    transparent 70%
  );
}`,

  aiRules: `You are a Magic Circle design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Bright neon colors (use warm gold and cool indigo only)
- Brutalist style elements
- Pixel art aesthetics
- Heavy/thick borders
- Informal/handwritten fonts
- Light backgrounds

## Must Follow

- Deep dark backgrounds: bg-[#0a0920] or bg-[#1e1b4b]
- Concentric ring decorations (nested circles with varying styles)
- Gold accent glow: #fbbf24 with radiant shadow effects
- Hexagram/sacred geometry structural motifs
- Runic inscription marks along borders
- Elegant serif fonts for headings (font-serif)
- Thin elegant borders with low opacity
- Golden center radiation glow effects

## Color Palette

Primary:
- Deep Navy: #1e1b4b
- Dark Background: #0a0920
- Gold Glow: #fbbf24
- Silver White: #e2e8f0
- Mystic Indigo: #818cf8

## Unique Elements

- Concentric circle/ring decorative system (multiple nested rings)
- Runic inscription borders (dot-dash marks along edges)
- Hexagram/sacred geometry card layout
- Alchemical symbols at geometric intersection points
- Rotating ring animation suggesting arcane machinery`,

  examplePrompts: [
    {
      title: "魔法阵主题页面",
      titleEn: "Magic Circle Theme Page",
      description: "同心圆环、六芒星与金色辉光的神秘几何页面",
      descriptionEn: "Concentric rings, hexagram and golden glow mystical page",
      prompt: `Use Magic Circle style to create a mystical dark-themed page:
1. Background: deep navy with sacred geometry shimmer pattern
2. Hero: concentric rotating rings around golden-glow title
3. Cards: arranged in hexagonal grid with runic inscription borders
4. Buttons: hexagon-bordered with golden glow hover radiation
5. Alchemical symbols at geometric intersection points
6. Slow-rotating ring animation suggesting ancient mechanisms`,
    },
  ],
};
