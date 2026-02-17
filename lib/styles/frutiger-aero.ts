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
    "Add glossy highlights and reflections on cards",
    "Include nature-inspired decorative elements (bubbles, leaves, water)",
    "Use clean sans-serif typography",
  ],

  dontList: [
    "Don't use dark or black backgrounds",
    "Don't use sharp corners or angular shapes",
    "Don't use neon or harsh colors",
    "Don't use monospace fonts",
    "Don't use flat/matte surfaces without any glass effect",
  ],

  components: {
    button: {
      name: "Button",
      description: "Frutiger Aero glass button with translucent white background and glossy feel",
      code: `<button className="
  px-6 py-3
  bg-gradient-to-b from-white/90 to-white/60
  backdrop-blur-md
  border border-white/50
  rounded-full
  text-sky-700 font-medium text-sm
  shadow-lg
  hover:shadow-xl hover:from-white/95
  transition-all duration-300
">
  Glass Button
</button>`,
    },
    card: {
      name: "Card",
      description: "Frosted glass card with translucent white background on sky-blue gradient",
      code: `<div className="
  p-6
  bg-white/40 backdrop-blur-xl
  border border-white/50
  rounded-3xl
  shadow-xl
  hover:bg-white/50 hover:shadow-2xl hover:scale-[1.01]
  transition-all duration-300
">
  <h3 className="text-xl font-semibold text-sky-900 mb-2">
    Aero Card
  </h3>
  <p className="text-sky-700/80">
    Translucent glass panel with Vista-style frosted effect
  </p>
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
    focus:outline-none focus:border-white/70 focus:bg-white/40
    transition-all
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
      <a href="#" className="text-sky-700/80 hover:text-sky-900 transition-colors">
        Home
      </a>
      <a href="#" className="text-sky-700/80 hover:text-sky-900 transition-colors">
        About
      </a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero",
      description: "Sky-blue gradient hero section with floating glass card",
      code: `<section className="
  relative min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-sky-300 via-sky-400 to-sky-500
  overflow-hidden px-6
">
  <div className="
    max-w-2xl mx-auto text-center
    p-8 md:p-12
    bg-white/30 backdrop-blur-xl
    border border-white/40
    rounded-3xl
    shadow-2xl
  ">
    <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-6">
      Frutiger Aero
    </h1>
    <p className="text-lg text-white/80 mb-8">
      Sky-blue glass aesthetic inspired by Windows Vista/7
    </p>
    <button className="
      px-8 py-4
      bg-gradient-to-b from-white/90 to-white/60
      backdrop-blur-md border border-white/50
      rounded-full
      text-sky-700 font-semibold
      hover:from-white/95
      shadow-lg hover:shadow-xl
      transition-all
    ">
      Explore
    </button>
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

## Must Follow

- Background: Sky blue gradients (from-sky-300 to-sky-500 or custom #87CEEB/#5FB3CC)
- Cards: Semi-transparent white (bg-white/30 to bg-white/50) with backdrop-blur-xl
- Borders: Subtle white borders (border-white/30 to border-white/50)
- Rounded corners: Always large (rounded-2xl or rounded-3xl)
- Shadows: Soft, diffused shadows for depth
- Text: White or dark blue for contrast on glass
- Decorative: Bubbles, water droplets, cloud-like shapes floating
- Typography: Clean sans-serif (no monospace or serif)
- Glass effect is mandatory on all cards and panels
- Maintain "airy" spacing with generous padding and margins

## Color Palette

Sky gradients: from-sky-300, via-sky-400, to-sky-500
Glass panels: bg-white/30, bg-white/40, bg-white/50
Text: text-white (on dark areas), text-sky-900 (on glass)
Accents: emerald-300 (nature), sky-200 (water)

## Self Check

After generating code verify:
1. Sky-blue gradient background present
2. All panels have backdrop-blur
3. Using semi-transparent white backgrounds
4. Large rounded corners on all elements
5. Text is readable against glass backgrounds`,

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
