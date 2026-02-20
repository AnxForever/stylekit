import { DesignStyle } from "./index";

export const frutigerAero: DesignStyle = {
  slug: "frutiger-aero",
  name: "Frutiger Aero",
  nameEn: "Frutiger Aero",
  description:
    "Windows Vista/7时代的玻璃质感美学，天空蓝渐变、半透明毛玻璃面板与自然元素融合，营造清新通透的数字自然感。",
  cover: "/styles/frutiger-aero.svg",
  styleType: "visual",
  tags: ["retro", "expressive"],
  category: "retro",
  colors: {
    primary: "#87CEEB",
    secondary: "#5FB3CC",
    accent: ["#ffffff", "#e0f2fe", "#34d399", "#7dd3fc"],
  },
  keywords: ["aero glass", "translucent", "sky blue", "glossy", "Vista", "Y2K", "nature", "bubbles"],

  philosophy: `Frutiger Aero draws inspiration from the Windows Vista/7 Aero glass aesthetic -- sky-blue gradients, frosted glass panels, water droplets, and a feeling of floating in clean air.

Core principles:
- Translucency: Semi-transparent white panels over bright sky gradients
- Nature meets technology: Organic shapes, bubbles, and leaves blended with digital UI
- Light and airy: Generous whitespace, soft shadows, rounded corners everywhere
- Glossy reflections: Subtle gradient highlights that simulate light on glass surfaces`,

  doList: [
    "Use sky blue gradient backgrounds (from-sky-300 to-sky-500)",
    "Apply backdrop-blur and translucent white panels (bg-white/30 to bg-white/50)",
    "Use large rounded corners (rounded-2xl to rounded-3xl)",
    "Add glossy top-half highlight div (absolute, bg-gradient-to-b from-white/60 to-white/10, h-1/2) on buttons and cards",
    "Include nature-inspired decorative elements (bubbles, leaves, water) as absolute positioned blur divs",
    "Use clean sans-serif typography",
    "Aurora orbs on cards: two absolute blur-3xl divs (green + sky-blue) that group-hover:scale-150",
    "Buttons use active:scale-95 for bouncy jelly press physics",
    "Luminous glow on button hover: hover:shadow-[0_8px_20px_rgba(2,132,199,0.6)]",
    "focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500 for all focusable elements",
  ],

  dontList: [
    "Don't use dark or black backgrounds",
    "Don't use sharp corners or angular shapes",
    "Don't use neon or harsh colors",
    "Don't use monospace fonts",
    "Don't use flat/matte surfaces without any glass effect",
    "Don't use active:scale-[0.98] — use active:scale-95 for the jelly bounce physics",
    "Don't use focus:ring without focus:ring-offset-sky-500 (focus ring invisible on sky blue background)",
  ],

  components: {
    button: {
      name: "Button",
      description: "Aero glossy capsule button: top-half white overlay simulates glass reflection, luminous sky-blue glow on hover, active:scale-95 jelly bounce press, focus ring offset matches sky background",
      code: `{/* Primary Aero Glossy Button */}
<button className="
  group relative
  px-8 py-3
  bg-gradient-to-b from-sky-400 to-sky-600
  border border-sky-300/50
  rounded-full
  text-white font-bold text-sm
  shadow-[0_4px_10px_rgba(2,132,199,0.4),inset_0_-3px_5px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)]
  hover:shadow-[0_8px_20px_rgba(2,132,199,0.6),0_0_30px_rgba(125,211,252,0.3),inset_0_-3px_5px_rgba(0,0,0,0.2)]
  hover:-translate-y-0.5
  focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500
  active:scale-95 active:translate-y-0
  active:shadow-[0_2px_5px_rgba(2,132,199,0.3),inset_0_2px_4px_rgba(0,0,0,0.3)]
  transition-all duration-200 ease-out
  overflow-hidden
">
  {/* Glossy top-half highlight — brightens on group-hover */}
  <div className="
    absolute top-0 left-0 right-0 h-1/2
    bg-gradient-to-b from-white/60 to-white/10
    rounded-t-full
    group-hover:from-white/80 group-hover:to-white/20
    transition-colors duration-200
    pointer-events-none
  " />
  <span className="relative z-10 drop-shadow-sm">Glossy Button</span>
</button>

{/* Secondary Aero Glass Button */}
<button className="
  group relative
  px-8 py-3
  bg-gradient-to-b from-white/80 to-white/50
  backdrop-blur-md border border-white/60
  rounded-full
  text-sky-700 font-bold text-sm
  shadow-[0_4px_10px_rgba(255,255,255,0.4),inset_0_1px_1px_rgba(255,255,255,0.8)]
  hover:shadow-[0_8px_20px_rgba(255,255,255,0.5)] hover:-translate-y-0.5
  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-500
  active:scale-95 active:translate-y-0
  transition-all duration-200 ease-out
  overflow-hidden
">
  <div className="
    absolute top-0 left-0 right-0 h-1/2
    bg-gradient-to-b from-white/70 to-white/20
    rounded-t-full
    group-hover:from-white/90 group-hover:to-white/30
    transition-colors duration-200
    pointer-events-none
  " />
  <span className="relative z-10">Glass Button</span>
</button>`,
    },
    card: {
      name: "Card",
      description: "Frosted glass card with aurora orbs: two absolute blur-3xl colored orbs scale-150 on group-hover, card lifts and scales, glossy top-half highlight",
      code: `<div className="
  group relative
  p-8
  bg-gradient-to-br from-white/70 to-white/30
  backdrop-blur-xl
  border border-white/60
  rounded-3xl
  shadow-[0_8px_32px_rgba(14,165,233,0.15),inset_0_0_0_1px_rgba(255,255,255,0.8)]
  hover:shadow-[0_16px_48px_rgba(14,165,233,0.3),0_0_60px_rgba(125,211,252,0.15),inset_0_0_0_1px_rgba(255,255,255,0.9)]
  hover:-translate-y-2 hover:scale-[1.02]
  transition-all duration-300 ease-out
  overflow-hidden
  cursor-pointer
">
  {/* Aurora orb — green, top-right, expands on group-hover */}
  <div className="
    absolute -top-16 -right-16 w-40 h-40
    bg-green-400/20 blur-3xl rounded-full
    group-hover:scale-150 group-hover:bg-green-300/30
    transition-all duration-500
    pointer-events-none
  " />
  {/* Aurora orb — sky-blue, bottom-left, expands on group-hover */}
  <div className="
    absolute -bottom-16 -left-16 w-40 h-40
    bg-sky-400/20 blur-3xl rounded-full
    group-hover:scale-150 group-hover:bg-sky-300/30
    transition-all duration-500
    pointer-events-none
  " />

  {/* Glossy top-edge highlight */}
  <div className="
    absolute top-0 left-0 right-0 h-1/3
    bg-gradient-to-b from-white/50 to-transparent
    rounded-t-3xl
    pointer-events-none
  " />

  <div className="relative z-10">
    <h3 className="text-xl font-semibold text-sky-900 mb-2">
      Aero Card
    </h3>
    <p className="text-sky-700/80 leading-relaxed">
      Frosted glass panel with aurora atmosphere and glossy reflection.
    </p>
  </div>
</div>`,
    },
    input: {
      name: "Input",
      description: "Glass input field with translucent background and soft focus state",
      code: `<input
  type="text"
  placeholder="Type here..."
  className="
    w-full px-4 py-3
    bg-white/30 backdrop-blur-md
    border border-white/40
    rounded-2xl
    text-sky-900 placeholder:text-sky-400/50
    hover:border-white/60 hover:bg-white/40
    focus:outline-none focus:border-white/80 focus:bg-white/50
    focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500
    transition-all duration-200
  "
/>`,
    },
    nav: {
      name: "Navigation",
      description: "Translucent glass navigation bar with backdrop blur",
      code: `<nav className="
  fixed top-0 left-0 right-0 z-50
  px-6 py-4
  bg-white/30 backdrop-blur-xl
  border-b border-white/30
">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    <a href="/" className="text-sky-800 font-bold text-xl">
      Logo
    </a>
    <div className="flex gap-6">
      <a href="#" className="text-sky-700/80 hover:text-sky-900 transition-colors duration-200">
        Home
      </a>
      <a href="#" className="text-sky-700/80 hover:text-sky-900 transition-colors duration-200">
        About
      </a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero",
      description: "Sky-blue gradient hero section with floating glass card and aurora orbs",
      code: `<section className="
  relative min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-sky-300 via-sky-400 to-sky-500
  overflow-hidden px-6
">
  {/* Background aurora orbs */}
  <div className="absolute top-20 right-20 w-80 h-80 bg-green-400/20 blur-3xl rounded-full pointer-events-none" />
  <div className="absolute bottom-20 left-20 w-80 h-80 bg-white/20 blur-3xl rounded-full pointer-events-none" />

  <div className="
    relative z-10
    max-w-2xl mx-auto text-center
    p-8 md:p-12
    bg-white/30 backdrop-blur-xl
    border border-white/40
    rounded-3xl
    shadow-[0_8px_32px_rgba(14,165,233,0.2),inset_0_0_0_1px_rgba(255,255,255,0.7)]
    overflow-hidden
  ">
    {/* Glossy top-half */}
    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-3xl pointer-events-none" />
    <div className="relative z-10">
      <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-6">
        Frutiger Aero
      </h1>
      <p className="text-lg text-white/80 mb-8 leading-relaxed">
        Sky-blue glass aesthetic inspired by Windows Vista/7
      </p>
      <button className="
        group relative
        px-8 py-4
        bg-gradient-to-b from-sky-400 to-sky-600
        border border-sky-300/50
        rounded-full
        text-white font-semibold
        shadow-[0_4px_10px_rgba(2,132,199,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)]
        hover:shadow-[0_8px_20px_rgba(2,132,199,0.6),0_0_30px_rgba(125,211,252,0.3)]
        hover:-translate-y-0.5
        focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500
        active:scale-95 active:translate-y-0
        transition-all duration-200 ease-out
        overflow-hidden
      ">
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-white/10 rounded-t-full group-hover:from-white/80 transition-colors duration-200 pointer-events-none" />
        <span className="relative z-10">Explore</span>
      </button>
    </div>
  </div>
</section>`,
    },
    footer: {
      name: "Footer",
      description: "Glass footer with translucent background",
      code: `<footer className="
  py-8 px-6
  bg-white/20 backdrop-blur-md
  border-t border-white/20
">
  <div className="max-w-6xl mx-auto text-center">
    <p className="text-sky-700/60 text-sm">
      Frutiger Aero Style
    </p>
  </div>
</footer>`,
    },
  },

  globalCss: `/* Frutiger Aero Global Styles */

:root {
  --aero-sky-light: #87CEEB;
  --aero-sky-dark: #5FB3CC;
  --aero-glass-bg: rgba(255, 255, 255, 0.3);
  --aero-glass-border: rgba(255, 255, 255, 0.4);
}

@keyframes aero-float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes aero-bubble {
  0% { transform: translateY(100%) scale(0.5); opacity: 0; }
  50% { opacity: 0.6; }
  100% { transform: translateY(-100vh) scale(1); opacity: 0; }
}

@keyframes aero-shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.aero-glass {
  background: var(--aero-glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--aero-glass-border);
}`,

  aiRules: `You are a Frutiger Aero design style expert. All generated code must follow these rules:

## Absolute Forbidden

- Dark or black backgrounds (bg-black, bg-gray-900, bg-slate-900)
- Sharp corners (rounded-none, rounded-sm)
- Monospace fonts (font-mono)
- Neon glow effects or harsh saturated colors
- Flat/matte surfaces without glass effect
- active:scale-[0.98] — use active:scale-95 instead (Aero has jelly bounce physics)
- focus:ring without focus:ring-offset-sky-500 (ring invisible on sky-blue background)

## Must Follow

- Background: Sky blue gradients (from-sky-300 to-sky-500)
- Cards: Semi-transparent white (bg-white/30 to bg-white/70) with backdrop-blur-xl
- Borders: Subtle white borders (border-white/30 to border-white/60)
- Rounded corners: Always large (rounded-2xl or rounded-3xl)
- Glossy highlight: Absolute div with h-1/2 bg-gradient-to-b from-white/60 to-white/10 on buttons and cards
- Glass effect is mandatory on all cards and panels
- Generous padding and airy spacing

## Animation & Interaction Rules

- Aero Glossy Layer: Every button and major card MUST include an absolute div positioned at top-0 left-0 right-0 h-1/2 with bg-gradient-to-b from-white/60 to-white/10 rounded-t-full (or rounded-t-3xl for cards). On group-hover, this brightens to from-white/80 to-white/20. This simulates the classic Web 2.0 glossy top-half glass reflection.
- Aurora Orbs: Cards use two absolutely-positioned blur-3xl rounded-full divs — one with bg-green-400/20 (top-right corner, -top-16 -right-16 w-40 h-40) and one with bg-sky-400/20 (bottom-left corner). On group-hover, both scale to group-hover:scale-150 and intensify (green-300/30, sky-300/30). Use transition-all duration-500. The orbs create the aurora/glow atmosphere.
- Luminous Glow: Primary buttons hover to hover:shadow-[0_8px_20px_rgba(2,132,199,0.6),0_0_30px_rgba(125,211,252,0.3),...]. The double shadow (directional + ambient) creates the luminous aqua water glow.
- Jelly Bounce: active:scale-95 (not 0.98 or 0.97). The 5% compression is the Aero "jelly" squash. Combined with active:translate-y-0 and active:shadow collapsing, it bounces back. use active:shadow-[0_2px_5px_...] (small shadow indicates pressed state).
- Card Float: hover:-translate-y-2 hover:scale-[1.02] — more dramatic than other styles because glass panels feel lighter. Shadow expands to hover:shadow-[0_16px_48px_...].
- Focus Ring on Sky: focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-sky-500. Without ring-offset-sky-500, the ring blends into the sky-blue background and becomes invisible.
- Easing: duration-200 ease-out for buttons. duration-300 ease-out for cards. Aurora orbs use duration-500 (they expand slowly, like clouds).

## Color Palette

Sky gradients: from-sky-300, via-sky-400, to-sky-500
Glass panels: bg-white/30, bg-white/40, bg-white/50, bg-white/70
Text: text-white (on dark areas), text-sky-900 (on glass), text-sky-700/80 (secondary)
Accents: emerald-300/green-400 (nature aurora), sky-200/sky-300 (water aurora)

## Unique Elements (Aero-Only)

1. Glossy top-half: absolute h-1/2 white gradient overlay on every button and card
2. Aurora orbs: two blur-3xl absolute divs (green + sky-blue) that expand on group-hover
3. Luminous glow: multi-shadow combining directional + ambient sky-blue glow
4. Jelly bounce: active:scale-95 (5% compression, bigger than other styles)
5. Rounded-full capsule buttons (never square)

## Self Check

After generating code verify:
1. Sky-blue gradient background present
2. All panels have backdrop-blur and semi-transparent white backgrounds
3. Glossy top-half div present on buttons (h-1/2 absolute) and cards
4. Aurora orbs present on cards (green + sky-blue blur-3xl, group-hover:scale-150)
5. active:scale-95 (not scale-[0.98] or scale-[0.97])
6. focus:ring-offset-sky-500 on all focusable elements
7. Large rounded corners on all elements (rounded-2xl+)`,

  examplePrompts: [
    {
      title: "Weather Dashboard",
      titleEn: "Weather Dashboard",
      description: "Aero glass weather panels on sky background",
      descriptionEn: "Create a weather dashboard with Aero glass panels and sky background",
      prompt: `Create a weather dashboard in Frutiger Aero style:
1. Background: Full sky-blue gradient (from-sky-300 to-sky-500)
2. Main card: Current temperature with glass panel, large numbers
3. Hourly forecast: Horizontal scroll with small glass cards
4. Weekly forecast: List with glass rows
5. Decorative floating bubbles in the background`,
    },
    {
      title: "Music Player",
      titleEn: "Music Player",
      description: "Vista-style translucent music controls",
      descriptionEn: "Build a music player with translucent Vista-style controls",
      prompt: `Create a music player in Frutiger Aero style:
1. Background: Sky gradient with floating bubbles
2. Album card: Glass panel with cover art
3. Controls: Translucent play/pause buttons with glass effect
4. Progress bar: Glass track with glossy slider
5. Playlist: Side panel with glass rows`,
    },
    {
      title: "Product Showcase",
      titleEn: "Product Showcase",
      description: "Floating glass product cards on blue sky",
      descriptionEn: "Design a product showcase with floating glass cards on blue sky",
      prompt: `Create a product showcase in Frutiger Aero style:
1. Background: Sky gradient with cloud-like decorations
2. Hero: Large title with glass overlay
3. Product grid: 3-column glass cards with hover float effect
4. Each card: Product image, name, price on translucent panel
5. CTA buttons: Glossy white glass with rounded-full`,
    },
  ],
};
