import { DesignStyle } from "./index";

export const neonSamurai: DesignStyle = {
  slug: "neon-samurai",
  name: "霓虹武士风",
  nameEn: "Neon Samurai",
  description:
    "日本传统武士美学与霓虹赛博朋克的碰撞融合，刀锋斜切线条、�的鸟居门框架、书法笔触与双色霓虹光效交织，浮世绘遇见霓虹灯的未来都市武道。",
  cover: "/styles/neon-samurai.svg",
  styleType: "visual",
  tags: ["expressive", "modern", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#dc2626",
    secondary: "#080818",
    accent: ["#a020f0", "#38bdf8", "#fbbf24"],
  },
  keywords: ["霓虹武士", "赛博武士", "日本", "霓虹", "传统融合", "动作", "刀锋", "鸟居"],

  philosophy: `Neon Samurai fuses Japanese bushido aesthetics with cyberpunk neon luminance, forging a style of relentless tension and kinetic energy.

Core principles:
- Katana slash geometry: diagonal tapered strokes cut across layouts as decorative dividers
- Torii gate framing: section containers shaped like sacred gate structures
- Dual-color glow: stroke color differs from its glow halo (purple stroke, blue glow)
- Armor-plate panels: angular card shapes inspired by samurai yoroi plate segments
- Ink splatter accents: burst particles on hover and interaction states
- Calligraphy brush strokes: neon-lit brush-stroke underlines and dividers
- Smoke/mist overlays: atmospheric depth through translucent background wisps`,

  doList: [
    "Use dark navy backgrounds (bg-[#080818])",
    "Add katana diagonal slash-stroke decorations",
    "Use torii gate shapes as section frames",
    "Apply dual-color glow (stroke != glow color)",
    "Use armor-plate angular card shapes",
    "Add ink splatter burst accents on hover",
    "Use calligraphy brush-stroke dividers with neon glow",
  ],

  dontList: [
    "No soft pastel colors or light backgrounds",
    "No rounded-full or large border radius",
    "No organic/irregular rounded shapes",
    "No serif fonts",
    "No standard drop shadows (use neon glow only)",
  ],

  components: {
    button: {
      name: "Button",
      description: "Sharp-edged button with slash-mark corner cuts and dual-color neon glow",
      code: `<button className="
  relative px-6 py-3
  bg-[#dc2626] text-white
  font-sans font-bold uppercase tracking-widest
  border border-[#dc2626]/60
  shadow-[0_0_15px_rgba(220,38,38,0.5)]
  hover:shadow-[0_0_25px_rgba(56,189,248,0.5)]
  hover:border-[#dc2626]
  transition-all duration-300
  before:content-[''] before:absolute before:top-0 before:right-0
  before:w-3 before:h-3 before:border-t before:border-r before:border-[#a020f0]
  after:content-[''] after:absolute after:bottom-0 after:left-0
  after:w-3 after:h-3 after:border-b after:border-l after:border-[#a020f0]
">
  Strike
</button>`,
    },
    card: {
      name: "Card",
      description: "Armor-plate styled card with angular borders and neon edge glow",
      code: `<div className="
  relative p-8
  bg-[#080818]
  border border-[#dc2626]/30
  shadow-[0_0_15px_rgba(220,38,38,0.2)]
  hover:shadow-[0_0_25px_rgba(220,38,38,0.5)]
  hover:border-[#dc2626]/60
  transition-all duration-300
  [clip-path:polygon(0_0,calc(100%-16px)_0,100%_16px,100%_100%,16px_100%,0_calc(100%-16px))]
">
  <h3 className="text-2xl font-sans font-bold text-[#dc2626] uppercase tracking-wider mb-3">
    BUSHIDO
  </h3>
  <p className="text-white/50 font-sans">
    The way of the warrior, illuminated by neon
  </p>
</div>`,
    },
    input: {
      name: "Input",
      description: "Brush-stroke underline input with neon glow focus",
      code: `<input
  type="text"
  placeholder="Enter command..."
  className="
    w-full px-4 py-3
    bg-transparent
    border-b-2 border-[#dc2626]/30
    text-white placeholder-white/25
    font-sans
    focus:border-[#dc2626]
    focus:shadow-[0_2px_15px_rgba(220,38,38,0.4)]
    focus:outline-none
    transition-all duration-300
  "
/>`,
    },
    hero: {
      name: "Hero",
      description: "Full-screen hero with torii gate frame, diagonal slashes, and smoke overlay",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#080818]
  relative overflow-hidden
">
  <div className="absolute inset-0 opacity-[0.03]" style={{
    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(220,38,38,0.3) 2px, rgba(220,38,38,0.3) 4px)"
  }} />
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-sans font-bold text-[#dc2626] uppercase tracking-widest mb-2
      [text-shadow:0_0_30px_rgba(220,38,38,0.6)]">
      NEON
    </h1>
    <h2 className="text-4xl md:text-6xl font-sans font-bold text-[#a020f0] uppercase tracking-widest mb-6
      [text-shadow:0_0_20px_rgba(56,189,248,0.5)]">
      SAMURAI
    </h2>
  </div>
</section>`,
    },
  },

  globalCss: `/* Neon Samurai Global Styles */

:root {
  --ns-red: #dc2626;
  --ns-dark: #080818;
  --ns-purple: #a020f0;
  --ns-blue: #38bdf8;
  --ns-gold: #fbbf24;
}

/* Dual-color neon text glow (red text, blue glow) */
.ns-dual-glow {
  text-shadow: 0 0 20px var(--ns-blue), 0 0 40px rgba(56, 189, 248, 0.3);
  color: var(--ns-red);
}

/* Katana slash diagonal line */
.ns-slash-line {
  position: relative;
}
.ns-slash-line::after {
  content: "";
  position: absolute;
  top: 50%;
  left: -10%;
  right: -10%;
  height: 2px;
  background: linear-gradient(135deg, transparent 10%, var(--ns-red) 30%, var(--ns-red) 70%, transparent 90%);
  box-shadow: 0 0 12px var(--ns-blue);
  transform: rotate(-15deg);
  pointer-events: none;
}

/* Torii gate frame */
.ns-torii-frame {
  border-top: 3px solid var(--ns-red);
  border-left: 2px solid var(--ns-red);
  border-right: 2px solid var(--ns-red);
  box-shadow: 0 -4px 15px rgba(220, 38, 38, 0.3);
  position: relative;
}
.ns-torii-frame::before {
  content: "";
  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--ns-red);
  opacity: 0.5;
}

/* Armor-plate clip path */
.ns-armor-clip {
  clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
}

/* Smoke overlay */
.ns-smoke::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at 50% 80%, rgba(220, 38, 38, 0.04) 0%, transparent 70%);
  pointer-events: none;
}

/* Scan line overlay */
.ns-scanlines::before {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.08) 2px,
    rgba(0, 0, 0, 0.08) 4px
  );
  pointer-events: none;
}`,

  aiRules: `You are a Neon Samurai design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Soft pastel colors or light backgrounds
- rounded-full or large border radius
- Organic/irregular shapes
- Serif fonts
- Light mode backgrounds (bg-white, bg-gray-50, etc.)
- Standard drop shadows (shadow-md, shadow-lg)

## Must Follow

- Dark navy backgrounds: bg-[#080818] or similar near-black
- Neon red primary: #dc2626 with glow effects
- Dual-color glow: stroke color differs from glow (e.g., purple text with blue glow halo)
- Katana slash diagonal lines as decorative elements
- Torii gate shapes for section framing
- Armor-plate angular clip-paths on cards
- Brush-stroke style underlines (not solid box borders for inputs)
- Ink splatter burst accents on hover

## Color Palette

Primary:
- Neon Red: #dc2626
- Dark Navy: #080818
- Electric Purple: #a020f0
- Neon Blue: #38bdf8
- Gold: #fbbf24

## Unique Elements

- Katana diagonal slash stroke decorations (tapered SVG paths)
- Torii gate shaped frames (double-beam top border)
- Dual-color glow effect (stroke color != glow color)
- Armor-plate angular card clip-paths
- Calligraphy brush-stroke neon dividers`,

  examplePrompts: [
    {
      title: "霓虹武士着陆页",
      titleEn: "Neon Samurai Landing Page",
      description: "刀锋斜切与双色霓虹光效融合的武士主题页面",
      descriptionEn: "Katana-slash and dual-glow neon bushido page",
      prompt: `Use Neon Samurai style to create a dark, high-contrast landing page:
1. Background: dark navy with smoke wisps and scan line overlay
2. Hero: torii gate frame with dual-color neon title glow
3. Diagonal katana slash decorations between sections
4. Cards: armor-plate angular clip-path with neon edge glow
5. Inputs: brush-stroke underline style with glow focus
6. Purple stroke with blue glow halo (dual-color effect)`,
    },
  ],
};
