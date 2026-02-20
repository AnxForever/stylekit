import { DesignStyle } from "./index";

export const pixelAnime: DesignStyle = {
  slug: "pixel-anime",
  name: "像素动漫风",
  nameEn: "Pixel Anime",
  description:
    "将经典JRPG游戏UI与像素动漫美学融合，以RPG对话框、状态条、像素边框和NES色板打造怀旧8-bit游戏界面风格。",
  cover: "/styles/pixel-anime.svg",
  styleType: "visual",
  tags: ["retro", "expressive"],
  category: "retro",
  colors: {
    primary: "#4a90d9",
    secondary: "#2d1b69",
    accent: ["#ff6b6b", "#ffd93d", "#50c878"],
  },
  keywords: ["像素动漫", "JRPG", "8-bit", "RPG对话框", "像素", "NES色板"],

  philosophy: `Pixel Anime merges classic JRPG game UI with pixel-art anime aesthetics. Every element feels like it belongs in a 16-bit RPG menu screen.

Core principles:
- RPG Dialogue Boxes: Window frames with chunky borders and corner block decorations, referencing Final Fantasy and Dragon Quest menu systems
- Health/Status Bars: HP, MP, and EXP progress bars with pixel-precise flat fills and bordered containers
- Pixel Borders: All borders are 2px+ solid with hard edges, using image-rendering: pixelated where applicable
- NES/SNES Palette: Limited color palette of bold primary colors (blue, red, gold, green) on deep purple backgrounds
- Step-based Interactions: Hover states use translate-x/y in pixel-aligned steps, not smooth transforms
- Blinking Cursor: Selection arrows and continue prompts use blinking pixel arrows`,

  doList: [
    "Use RPG dialogue box frames with 4px borders and corner block decorations",
    "Include HP/MP/EXP status bar UI elements with flat fills",
    "Apply hard offset shadows (4px_4px_0px) for pixel depth",
    "Use monospace font exclusively for all text",
    "Keep interactions step-based (translate-x/y in 2px increments)",
    "Use NES-palette colors: blue #4a90d9, red #ff6b6b, gold #ffd93d, green #50c878",
    "Add pixel corner block decorations on major containers",
    "Framerate Drop: use `duration-75 ease-linear` for all transitions to simulate 15fps GBA/NDS-era animation cadence",
    "Blocky Aura: hover glow must be hard-edge multi-directional colored shadows with zero blur: `hover:shadow-[4px_4px_0_#ffd93d,-2px_-2px_0_#ffd93d]`",
    "Anime Action: button active state applies squash-and-stretch `active:scale-x-110 active:scale-y-90` — classic Japanese animation physics on press",
    "Corner Blink: card corner pixel squares use `group-hover:animate-pulse` to simulate game UI idle standby animation; never animate in non-hover state",
  ],

  dontList: [
    "Never use smooth gradients (linear-gradient, radial-gradient)",
    "Never use rounded corners (rounded-lg/xl/full)",
    "Never use blur effects (blur, backdrop-blur)",
    "Never use serif fonts",
    "Never use soft shadows (shadow-sm/md/lg/xl)",
    "Never use `ease-in-out` or `ease` curves — only `ease-linear` or `transition-none` (pixel animations are abrupt, not organic)",
    "Never use blurred glow shadows for the Blocky Aura effect — zero blur is mandatory for 8-bit authenticity",
    "Never trigger Corner Blink animation outside of `group-hover` state — idle blinking on load creates visual noise",
  ],

  components: {
    button: {
      name: "RPG Menu Button",
      description: "Pixel anime button with Blocky Aura multi-shadow hover + Anime Action squash-and-stretch on press",
      code: `<button className="
  px-6 py-3
  bg-[#4a90d9] text-white
  font-mono font-bold uppercase tracking-widest
  border-2 border-[#1a1040]
  shadow-[4px_4px_0_#1a1040]
  hover:bg-[#5aa0e9]
  hover:shadow-[4px_4px_0_#ffd93d,-2px_-2px_0_#ffd93d]
  hover:-translate-y-1
  active:scale-x-110 active:scale-y-90
  active:translate-x-[4px] active:translate-y-[4px]
  active:shadow-none
  transition-all duration-75 ease-linear
">
  ATTACK
</button>`,
    },
    card: {
      name: "RPG Dialogue Box",
      description: "Card with Corner Blink pixel squares on group-hover + Blocky Aura shadow shift",
      code: `<div className="group relative p-6 bg-[#1a1040] border-2 border-[#4a90d9] shadow-[6px_6px_0_#1a1040] hover:shadow-[8px_8px_0_#4a90d9] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-75 ease-linear cursor-pointer">
  {/* Corner pixels — blink on hover (Corner Blink) */}
  <div className="absolute -top-[6px] -left-[6px] w-[12px] h-[12px] bg-[#4a90d9] border-2 border-[#1a1040] group-hover:bg-[#ffd93d] group-hover:animate-pulse transition-colors duration-75" />
  <div className="absolute -top-[6px] -right-[6px] w-[12px] h-[12px] bg-[#4a90d9] border-2 border-[#1a1040] group-hover:bg-[#ffd93d] group-hover:animate-pulse transition-colors duration-75" />
  <div className="absolute -bottom-[6px] -left-[6px] w-[12px] h-[12px] bg-[#4a90d9] border-2 border-[#1a1040] group-hover:bg-[#ffd93d] group-hover:animate-pulse transition-colors duration-75" />
  <div className="absolute -bottom-[6px] -right-[6px] w-[12px] h-[12px] bg-[#4a90d9] border-2 border-[#1a1040] group-hover:bg-[#ffd93d] group-hover:animate-pulse transition-colors duration-75" />
  <div className="relative">
    <h3 className="text-2xl font-mono font-bold text-[#ffd93d] uppercase mb-2 group-hover:text-white transition-colors duration-75">
      QUEST LOG
    </h3>
    <p className="text-[#e0e0ff]/70 font-mono text-sm group-hover:text-[#ffd93d] transition-colors duration-75">
      &gt; A new adventure awaits! Press A to continue...
    </p>
  </div>
</div>`,
    },
    input: {
      name: "Pixel Input",
      description: "Input with pixel border, blinking cursor effect, and monospace text",
      code: `<input
  type="text"
  placeholder="ENTER NAME..."
  className="
    w-full px-4 py-3
    bg-[#1a1040]
    border-2 border-[#4a90d9]
    text-[#e0e0ff] placeholder-[#e0e0ff]/40
    font-mono
    focus:border-[#ffd93d]
    focus:shadow-[2px_2px_0px_#4a90d9]
    focus:outline-none
    transition-all duration-150 ease-linear
    caret-[#ffd93d]
  "
/>`,
    },
    hero: {
      name: "RPG Title Screen",
      description: "Title screen hero with pixel grid background, RPG window frame, and selection arrow",
      code: `<section className="
  min-h-screen relative overflow-hidden
  flex items-center justify-center
  bg-[#2d1b69]
">
  <div className="absolute inset-0" style={{
    backgroundImage: "linear-gradient(rgba(26,16,64,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(26,16,64,0.15) 1px, transparent 1px)",
    backgroundSize: "8px 8px"
  }} />
  <div className="relative z-10 text-center px-6">
    <h1 className="text-5xl md:text-7xl font-mono font-bold text-[#4a90d9] uppercase tracking-wider mb-2">
      PIXEL
    </h1>
    <h2 className="text-4xl md:text-6xl font-mono font-bold text-[#ffd93d] uppercase tracking-wider mb-6">
      ANIME
    </h2>
    <p className="text-lg text-[#e0e0ff]/60 font-mono mb-8">
      JRPG // 8-BIT // NES PALETTE
    </p>
    <button className="px-10 py-4 bg-[#ff6b6b] text-white font-mono font-bold uppercase tracking-wider border-2 border-[#1a1040] shadow-[4px_4px_0px_#1a1040] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1a1040] transition-all duration-150 ease-linear">
      PRESS START
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Pixel Anime Global Styles */

:root {
  --pa-blue: #4a90d9;
  --pa-dark: #2d1b69;
  --pa-deep: #1a1040;
  --pa-red: #ff6b6b;
  --pa-gold: #ffd93d;
  --pa-green: #50c878;
  --pa-text: #e0e0ff;
}

/* RPG dialogue box frame with corner blocks */
.pa-dialog-frame {
  position: relative;
  border: 2px solid var(--pa-blue);
  background: var(--pa-deep);
}
.pa-dialog-frame::before,
.pa-dialog-frame::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  background: var(--pa-blue);
}
.pa-dialog-frame::before { top: -4px; left: -4px; }
.pa-dialog-frame::after { top: -4px; right: -4px; }

/* Pixel grid overlay */
.pa-pixel-grid::after {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(26, 16, 64, 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 16, 64, 0.12) 1px, transparent 1px);
  background-size: 8px 8px;
  pointer-events: none;
  image-rendering: pixelated;
}

/* HP/MP/EXP status bar */
.pa-status-bar {
  height: 8px;
  border: 2px solid var(--pa-deep);
  background: var(--pa-deep);
}
.pa-status-bar-fill {
  height: 100%;
  image-rendering: pixelated;
}

/* Pixel hard shadow */
.pa-shadow {
  box-shadow: 4px 4px 0px var(--pa-deep);
}

/* Blinking cursor animation */
@keyframes pa-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
.pa-blink {
  animation: pa-blink 1s infinite;
}`,

  aiRules: `You are a Pixel Anime design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Smooth gradients (linear-gradient, radial-gradient for decoration)
- Rounded corners (rounded-lg, rounded-xl, rounded-full)
- Blur effects (blur, backdrop-blur)
- Serif fonts
- Soft shadows (shadow-sm, shadow-md, shadow-lg, shadow-xl)

## Must Follow

- Dark purple background: bg-[#2d1b69] as primary, bg-[#1a1040] as secondary
- RPG dialogue box frames with 2-4px borders and corner block decorations
- HP/MP/EXP status bar UI elements with flat color fills
- Hard offset pixel shadows: shadow-[4px_4px_0px_#1a1040]
- Monospace font: font-mono for ALL text
- Bold 2px borders: border-2 border-[#1a1040]
- Flat colors only, no gradients
- Step-based hover: hover:translate-x-[2px] hover:translate-y-[2px]
- Linear easing: ease-linear, duration-75

## Color Palette (NES-inspired)

Primary:
- Pixel Blue: #4a90d9
- Dark Purple: #2d1b69
- Deep Dark: #1a1040
- Pixel Red: #ff6b6b
- Pixel Gold: #ffd93d
- Pixel Green: #50c878
- Light Text: #e0e0ff

## Unique Elements

- RPG dialogue box frame with corner block decorations
- HP/MP/EXP status bar progress indicators
- Pixel-grid background pattern (8px grid)
- Blinking pixel arrow cursor/continue indicators
- Step-based pixel-aligned hover translations

## Animation & Interaction Rules

- Framerate Drop: All transitions must use \`duration-75 ease-linear\` to simulate 15fps GBA/NDS-era animation. Never use \`ease-in-out\` or smooth bezier curves — pixel animations are abrupt state changes.
- Blocky Aura: Hover glow must use multi-directional hard-edge colored shadows with zero blur: \`hover:shadow-[4px_4px_0_#ffd93d,-2px_-2px_0_#ffd93d]\`. No \`blur()\` or \`drop-shadow()\` ever.
- Anime Action: Button active state applies squash-and-stretch: \`active:scale-x-110 active:scale-y-90\` — Japanese animation physics on press, not a translate drop.
- Corner Blink: Card corner pixel squares must use \`group-hover:animate-pulse\` to simulate idle game UI animation. Never animate in non-hover state — blink only when the player's cursor is over the card.`,

  examplePrompts: [
    {
      title: "JRPG角色面板",
      titleEn: "JRPG Character Panel",
      description: "经典RPG风格的角色状态面板",
      descriptionEn: "Classic RPG-style character status panel with HP/MP bars",
      prompt: `Use Pixel Anime style to create a JRPG character panel:
1. Background: dark purple with visible pixel grid overlay
2. RPG dialogue box frames with corner block decorations
3. HP/MP/EXP status bars with flat color fills
4. Character stats in monospace font, NES color palette
5. Pixel shadows and step-based button interactions`,
    },
  ],
};
