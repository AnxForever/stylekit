import { DesignStyle } from "./index";

export const cyberWafuu: DesignStyle = {
  slug: "cyber-wafuu",
  name: "赛博和风",
  nameEn: "Cyber Wafuu",
  description:
    "青海波纹样与电路走线融合、鸟居门导航框架、麻叶纹网格、金继ぎ金色修复线、障子屏风格栅面板、传统纹样被科技'侵入'的日式赛博美学。",
  cover: "/styles/cyber-wafuu.svg",
  styleType: "visual",
  tags: ["expressive", "modern", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#1e3a5f",
    secondary: "#080814",
    accent: ["#c41e3a", "#c9a227", "#38bdf8"],
  },
  keywords: ["赛博和风", "数字和风", "青海波", "金继ぎ", "障子", "鸟居", "麻叶纹", "电路"],

  philosophy: `Cyber Wafuu reimagines traditional Japanese visual culture through digital disruption, creating a sophisticated fusion where heritage patterns are "hacked" by technology.

Core principles:
- Seigaiha digital waves: the classic wave pattern overlaid with circuit board traces
- Torii gate navigation: sacred gate structure reborn as navigation frames
- Asanoha grid: hemp leaf geometric grid as layout scaffolding
- Kintsugi gold repair: golden crack lines as decorative borders and accents
- Shoji screen panels: traditional sliding door grids as card frame systems
- Cherry blossom + neon: organic sakura forms outlined in electric light
- Pattern collision: traditional repeating patterns visibly intersecting with digital traces`,

  doList: [
    "Use dark indigo backgrounds (bg-[#080814])",
    "Add seigaiha wave pattern backgrounds with CSS repeating-radial-gradient",
    "Use shoji screen grid as card frame structure",
    "Apply kintsugi gold crack line borders and accents",
    "Use torii gate shape for navigation framing",
    "Add circuit trace connecting lines between elements",
    "Layer traditional patterns with digital overlay effects",
  ],

  dontList: [
    "No soft pastel colors",
    "No organic irregular rounded shapes",
    "No Western serif fonts",
    "No rounded-full borders",
    "No light backgrounds (bg-white, bg-gray-50)",
  ],

  components: {
    button: {
      name: "Button",
      description: "Button with seigaiha pattern background and neon glow border",
      code: `<button className="
  relative px-6 py-3
  bg-[#1e3a5f] text-[#e2e8f0]
  font-sans font-semibold tracking-wider
  border border-[#1e3a5f]/60
  shadow-[0_0_12px_rgba(30,58,95,0.4)]
  hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]
  hover:border-[#38bdf8]/60
  transition-all duration-300
">
  Execute
</button>`,
    },
    card: {
      name: "Card",
      description: "Shoji grid frame card with kintsugi gold accent lines",
      code: `<div className="
  relative p-8
  bg-[#080814]
  border border-[#1e3a5f]/30
  shadow-[0_0_15px_rgba(30,58,95,0.2)]
  hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]
  hover:border-[#38bdf8]/40
  transition-all duration-300
">
  <div className="absolute top-0 left-1/3 w-px h-full bg-[#1e3a5f]/15" />
  <div className="absolute top-0 left-2/3 w-px h-full bg-[#1e3a5f]/15" />
  <div className="absolute top-1/2 left-0 w-full h-px bg-[#1e3a5f]/10" />
  <div className="absolute top-2 left-2 right-2 h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent" />
  <div className="relative z-10">
    <h3 className="text-2xl font-sans font-bold text-[#38bdf8] tracking-wider mb-3">
      SEIGAIHA
    </h3>
    <p className="text-[#e2e8f0]/45 font-sans">
      Traditional waves, digitally reborn
    </p>
  </div>
</div>`,
    },
    input: {
      name: "Input",
      description: "Input with wave pattern underline and circuit trace focus glow",
      code: `<input
  type="text"
  placeholder="Input..."
  className="
    w-full px-4 py-3
    bg-[#080814]
    border border-[#1e3a5f]/30
    text-[#e2e8f0] placeholder-[#e2e8f0]/20
    font-sans
    focus:border-[#38bdf8]/60
    focus:shadow-[0_0_12px_rgba(56,189,248,0.3)]
    focus:outline-none
    transition-all duration-300
  "
/>`,
    },
    hero: {
      name: "Hero",
      description: "Full-screen hero with seigaiha wave background and torii gate frame",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#080814]
  relative overflow-hidden
">
  <div className="absolute inset-0 opacity-[0.03]" style={{
    backgroundImage: "radial-gradient(circle at 50% 100%, transparent 60%, rgba(56,189,248,0.4) 60%, rgba(56,189,248,0.4) 62%, transparent 62%), radial-gradient(circle at 0% 100%, transparent 60%, rgba(56,189,248,0.4) 60%, rgba(56,189,248,0.4) 62%, transparent 62%)",
    backgroundSize: "60px 30px"
  }} />
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-sans font-bold text-[#38bdf8] uppercase tracking-widest mb-2
      [text-shadow:0_0_25px_rgba(56,189,248,0.4)]">
      CYBER WAFUU
    </h1>
  </div>
</section>`,
    },
  },

  globalCss: `/* Cyber Wafuu Global Styles */

:root {
  --cw-indigo: #1e3a5f;
  --cw-dark: #080814;
  --cw-vermillion: #c41e3a;
  --cw-gold: #c9a227;
  --cw-blue: #38bdf8;
}

/* Seigaiha wave pattern (digital version) */
.cw-seigaiha {
  background-image:
    radial-gradient(circle at 50% 100%, transparent 60%, rgba(56, 189, 248, 0.04) 60%, rgba(56, 189, 248, 0.04) 62%, transparent 62%),
    radial-gradient(circle at 0% 100%, transparent 60%, rgba(56, 189, 248, 0.04) 60%, rgba(56, 189, 248, 0.04) 62%, transparent 62%);
  background-size: 60px 30px;
}

/* Kintsugi gold crack line */
.cw-kintsugi {
  position: relative;
}
.cw-kintsugi::after {
  content: "";
  position: absolute;
  top: 4px;
  left: 8px;
  right: 8px;
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    var(--cw-gold) 15%,
    transparent 30%,
    var(--cw-gold) 50%,
    transparent 65%,
    var(--cw-gold) 80%,
    transparent 100%
  );
  opacity: 0.3;
  box-shadow: 0 0 6px rgba(201, 162, 39, 0.3);
}

/* Shoji screen grid */
.cw-shoji-grid {
  position: relative;
}
.cw-shoji-grid::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to right, rgba(30, 58, 95, 0.12) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(30, 58, 95, 0.12) 1px, transparent 1px);
  background-size: 33.33% 50%;
  pointer-events: none;
}

/* Circuit trace decoration */
.cw-circuit::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    var(--cw-blue) 15%,
    transparent 35%,
    var(--cw-blue) 55%,
    transparent 75%,
    var(--cw-blue) 90%,
    transparent 100%
  );
  opacity: 0.2;
}

/* Asanoha hemp leaf pattern overlay */
.cw-asanoha {
  background-image:
    linear-gradient(30deg, rgba(30, 58, 95, 0.06) 12%, transparent 12.5%, transparent 87%, rgba(30, 58, 95, 0.06) 87.5%),
    linear-gradient(150deg, rgba(30, 58, 95, 0.06) 12%, transparent 12.5%, transparent 87%, rgba(30, 58, 95, 0.06) 87.5%),
    linear-gradient(30deg, rgba(30, 58, 95, 0.06) 12%, transparent 12.5%, transparent 87%, rgba(30, 58, 95, 0.06) 87.5%),
    linear-gradient(150deg, rgba(30, 58, 95, 0.06) 12%, transparent 12.5%, transparent 87%, rgba(30, 58, 95, 0.06) 87.5%);
  background-size: 40px 70px;
  background-position: 0 0, 0 0, 20px 35px, 20px 35px;
}

/* Gold foil shimmer */
.cw-gold-foil {
  background: linear-gradient(
    135deg,
    rgba(201, 162, 39, 0.08) 0%,
    rgba(201, 162, 39, 0.03) 50%,
    rgba(201, 162, 39, 0.12) 100%
  );
}`,

  aiRules: `You are a Cyber Wafuu design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Soft pastel colors
- Organic irregular shapes
- Western serif fonts
- rounded-full borders
- Light backgrounds (bg-white, bg-gray-50, etc.)
- Standard drop shadows (use glow effects only)

## Must Follow

- Dark indigo backgrounds: bg-[#080814] or bg-[#1e3a5f]
- Seigaiha wave pattern as background texture (repeating-radial-gradient)
- Shoji screen grid frame structure for cards
- Kintsugi gold crack lines as border accents
- Torii gate shapes for navigation frames
- Circuit trace line connections between elements
- Electric blue accent: #38bdf8 with glow effects
- Vermillion #c41e3a and gold #c9a227 for traditional accents

## Color Palette

Primary:
- Indigo: #1e3a5f
- Dark Background: #080814
- Vermillion: #c41e3a
- Gold Foil: #c9a227
- Electric Blue: #38bdf8

## Unique Elements

- Seigaiha wave pattern (CSS repeating-radial-gradient)
- Kintsugi gold crack line accents (gradient border decorations)
- Shoji screen grid card frames (CSS grid overlays)
- Torii gate navigation frames
- Asanoha hemp leaf pattern background`,

  examplePrompts: [
    {
      title: "赛博和风着陆页",
      titleEn: "Cyber Wafuu Landing Page",
      description: "青海波、金继ぎ与障子屏风的数字融合页面",
      descriptionEn: "Seigaiha, kintsugi and shoji screen digital fusion page",
      prompt: `Use Cyber Wafuu style to create a dark Japanese-tech landing page:
1. Background: dark indigo with seigaiha wave pattern overlay
2. Navigation: torii gate shaped frame with vermillion accents
3. Cards: shoji screen grid frames with kintsugi gold crack accents
4. Circuit trace lines connecting card elements
5. Cherry blossom with neon outlines as decorative accents
6. Asanoha hemp leaf grid as section background`,
    },
  ],
};
