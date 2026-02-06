import { DesignStyle } from "./index";

export const cyberAnime: DesignStyle = {
  slug: "cyber-anime",
  name: "赛博动漫风",
  nameEn: "Cyber Anime",
  description:
    "融合赛博朋克科幻UI与动漫美学，以HUD抬头显示、全息投影面板、机甲边框和多层霓虹光效，打造未来感十足的动漫界面风格。",
  cover: "/styles/cyber-anime.svg",
  styleType: "visual",
  tags: ["expressive", "modern", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#7c3aed",
    secondary: "#0f0f1a",
    accent: ["#06d6a0", "#ff006e", "#38bdf8"],
  },
  keywords: ["赛博动漫", "HUD", "全息", "霓虹", "机甲", "神经数据流"],

  philosophy: `Cyber Anime fuses cyberpunk HUD interfaces with anime's expressive power. Every panel is a data terminal, every border a mecha frame.

Core principles:
- HUD Overlay: Corner frame decorations, targeting brackets, and data readout overlays create the feel of piloting a mecha cockpit
- Holographic Panels: Vertical scan line textures layered over glassmorphic surfaces simulate flickering holographic displays
- Mecha Borders: Angled clip-path corners on panels reference mechanical armor plating and cockpit instrument frames
- Multi-layer Neon: Purple, cyan, and pink neon glows stack in multiple layers for depth - never a single flat glow
- Neural Data Streams: Monospace text readouts, status indicators, and data visualization patterns fill negative space
- Hexagonal Grid: The background grid uses hexagons, not squares, referencing sci-fi energy field patterns`,

  doList: [
    "Use HUD corner frame decorations on major containers (angled bracket corners)",
    "Layer vertical scan line overlays on holographic panels",
    "Apply multi-layer neon glow (2-3 shadow layers with decreasing opacity)",
    "Use mecha-style angled corners via clip-path on panel borders",
    "Include terminal/data readout style text with monospace font",
    "Use hexagonal grid background pattern instead of square grid",
    "Keep all backgrounds dark (#0f0f1a) with semi-transparent overlays",
  ],

  dontList: [
    "Never use soft pastel colors or natural organic tones",
    "Never use serif fonts - only geometric sans-serif or monospace",
    "Never use rounded-full - all shapes must be angular/geometric",
    "Never use light or white backgrounds as primary surfaces",
    "Never use standard shadow-sm/md/lg - only neon glow shadows",
  ],

  components: {
    button: {
      name: "Holographic Button",
      description: "Button with vertical scan line texture and multi-layer neon glow, styled like a cockpit control",
      code: `<button className="
  relative px-6 py-3 overflow-hidden
  bg-[#7c3aed] text-white
  font-sans font-bold uppercase tracking-widest
  border border-[#06d6a0]/50
  shadow-[0_0_10px_rgba(124,58,237,0.3),0_0_20px_rgba(124,58,237,0.15)]
  hover:shadow-[0_0_15px_rgba(124,58,237,0.5),0_0_30px_rgba(124,58,237,0.25)]
  hover:border-[#06d6a0]
  transition-all duration-300
">
  <span className="relative z-10">EXECUTE</span>
  <div className="absolute inset-0 opacity-10" style={{
    backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 3px)"
  }} />
</button>`,
    },
    card: {
      name: "HUD Panel",
      description: "Card with angled mecha-frame corners, scan line overlay, and data readout header",
      code: `<div className="
  relative p-6 overflow-hidden
  bg-[#0f0f1a]/90
  border border-[#7c3aed]/30
  backdrop-blur-sm
  shadow-[0_0_20px_rgba(124,58,237,0.2)]
  hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]
  hover:border-[#7c3aed]/60
  transition-all duration-300
" style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))" }}>
  <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-[#06d6a0]/60" />
  <div className="absolute top-0 right-4 w-4 h-4 border-r border-t border-[#06d6a0]/60" />
  <h3 className="text-xl font-bold text-[#06d6a0] uppercase tracking-wider mb-2">
    DATA PANEL
  </h3>
  <p className="text-[#e0e0ff]/60 text-sm font-mono">
    System status nominal
  </p>
</div>`,
    },
    input: {
      name: "Terminal Input",
      description: "Terminal-style input with blinking cursor effect and HUD-framed container",
      code: `<div className="relative">
  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#06d6a0] font-mono text-sm">&gt;</span>
  <input
    type="text"
    placeholder="Enter command..."
    className="
      w-full pl-8 pr-4 py-3
      bg-[#0f0f1a]/80
      border border-[#7c3aed]/30
      text-[#e0e0ff] placeholder-[#e0e0ff]/30
      font-mono
      focus:border-[#06d6a0]
      focus:shadow-[0_0_15px_rgba(6,214,160,0.3)]
      focus:outline-none
      transition-all duration-300
      caret-[#06d6a0]
    "
  />
</div>`,
    },
    hero: {
      name: "HUD Hero",
      description: "Full-screen hero with hexagonal grid background, HUD frame corners, and holographic title",
      code: `<section className="
  min-h-screen relative overflow-hidden
  flex items-center justify-center
  bg-[#0f0f1a]
">
  <div className="absolute inset-0" style={{
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='52'%3E%3Cpath d='M30 0 L60 15 L60 37 L30 52 L0 37 L0 15 Z' fill='none' stroke='%237c3aed' stroke-width='0.4' opacity='0.08'/%3E%3C/svg%3E\")"
  }} />
  <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-[#06d6a0]/50" />
  <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-[#06d6a0]/50" />
  <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-[#06d6a0]/50" />
  <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-[#06d6a0]/50" />
  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-bold text-[#7c3aed] uppercase tracking-wider mb-4 [text-shadow:0_0_40px_rgba(124,58,237,0.4),0_0_80px_rgba(124,58,237,0.15)]">
      CYBER ANIME
    </h1>
    <p className="text-lg text-[#e0e0ff]/50 font-mono mb-8">
      HUD // HOLOGRAPHIC // MECHA
    </p>
  </div>
</section>`,
    },
  },

  globalCss: `/* Cyber Anime Global Styles */

:root {
  --ca-purple: #7c3aed;
  --ca-dark: #0f0f1a;
  --ca-cyan: #06d6a0;
  --ca-pink: #ff006e;
  --ca-blue: #38bdf8;
  --ca-text: #e0e0ff;
}

/* Multi-layer neon glow */
.ca-glow {
  box-shadow: 0 0 10px rgba(124, 58, 237, 0.3),
              0 0 20px rgba(124, 58, 237, 0.15),
              0 0 40px rgba(124, 58, 237, 0.05);
}

/* Vertical scan line overlay */
.ca-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.02) 2px,
    rgba(255, 255, 255, 0.02) 3px
  );
  pointer-events: none;
}

/* Holographic shimmer */
.ca-holo {
  background: linear-gradient(
    135deg,
    rgba(124, 58, 237, 0.1),
    rgba(6, 214, 160, 0.1),
    rgba(56, 189, 248, 0.1)
  );
}

/* Hexagonal grid background */
.ca-hex-grid {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='52'%3E%3Cpath d='M30 0 L60 15 L60 37 L30 52 L0 37 L0 15 Z' fill='none' stroke='%237c3aed' stroke-width='0.4' opacity='0.08'/%3E%3C/svg%3E");
}

/* HUD corner frame */
.ca-hud-frame {
  position: relative;
}
.ca-hud-frame::before,
.ca-hud-frame::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border-color: rgba(6, 214, 160, 0.5);
}
.ca-hud-frame::before {
  top: 0; left: 0;
  border-left: 2px solid;
  border-top: 2px solid;
}
.ca-hud-frame::after {
  bottom: 0; right: 0;
  border-right: 2px solid;
  border-bottom: 2px solid;
}

/* Mecha angled corners */
.ca-mecha-clip {
  clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
}`,

  aiRules: `You are a Cyber Anime design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Soft pastel colors (no light pink, baby blue, etc.)
- Serif fonts of any kind
- Natural organic colors (brown, beige, olive, etc.)
- rounded-full on buttons or containers
- White or light backgrounds as primary surfaces
- Standard shadow-sm/md/lg (only neon glow shadows)

## Must Follow

- Dark background: bg-[#0f0f1a] as primary surface
- Primary purple: #7c3aed for key elements with multi-layer glow
- Cyan-green accent: #06d6a0 for highlights, borders, and HUD frames
- Hot pink accent: #ff006e for alerts and emphasis
- HUD corner frame decorations on major containers
- Vertical scan line overlay on holographic panels
- Mecha-style angled corners via clip-path on cards and panels
- Monospace terminal text for data readouts
- Hexagonal grid background pattern
- Multi-layer neon glow: shadow-[0_0_Xpx_rgba(...),0_0_Ypx_rgba(...)]

## Color Palette

Primary:
- Deep Purple: #7c3aed
- Dark Background: #0f0f1a
- Cyan-Green: #06d6a0
- Hot Pink: #ff006e
- Sky Blue: #38bdf8
- Light Text: #e0e0ff

## Unique Elements

- HUD corner frame decorations (bracket-style corners)
- Holographic vertical scan line texture overlays
- Mecha-style angular clip-path panel borders
- Neural network data visualization patterns
- Terminal-style data readout text blocks`,

  examplePrompts: [
    {
      title: "HUD仪表盘",
      titleEn: "HUD Dashboard",
      description: "机甲座舱风格数据仪表盘",
      descriptionEn: "Mecha cockpit-style data dashboard with HUD overlays",
      prompt: `Use Cyber Anime style to create a mecha cockpit dashboard:
1. Background: dark (#0f0f1a) with hexagonal grid pattern
2. Cards: HUD-framed panels with angled mecha corners and scan line overlays
3. Holographic glow effects with multi-layer purple/cyan neon
4. Terminal-style data readouts with monospace font
5. HUD corner decorations on the main viewport frame`,
    },
  ],
};
