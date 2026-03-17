import { DesignStyle } from "./index";

export const acidGraphics: DesignStyle = {
  slug: "acid-graphics",
  name: "酸性平面设计",
  nameEn: "Acid Graphics",
  description:
    "高饱和度荧光色彩、扭曲字体、液态流动形态和迷幻视觉。源于锐舞文化和地下俱乐部美学，以强烈的视觉冲击力呈现反叛与实验精神。",
  descriptionEn:
    "High-saturation fluorescent colors, distorted typography, liquid flowing forms, and psychedelic visuals. Rooted in rave culture and underground club aesthetics, presenting rebellion and experimentation through intense visual impact.",
  cover: "/styles/acid-graphics.svg",
  styleType: "visual",
  tags: ["expressive", "high-contrast", "modern"],
  category: "expressive",
  colors: {
    primary: "#39ff14",
    secondary: "#0a0a0a",
    accent: ["#e6ff00", "#a020f0", "#ff6ec7", "#00ffff"],
  },
  keywords: ["酸性", "迷幻", "荧光", "扭曲", "锐舞", "Op-Art", "赛博", "expressive", "bold", "vibrant"],

  philosophy: `Acid Graphics 源于90年代锐舞文化和地下俱乐部场景，融合了赛博朋克、迷幻艺术和实验排版。

核心理念：
- 荧光色彩：使用高饱和度的荧光绿、酸性黄、电紫和赛博粉
- 暗色基底：深黑背景让荧光色彩更加刺眼和突出
- 扭曲变形：字体和形态的液态扭曲感，倾斜的卡片和元素
- 视觉噪声：扫描线叠加、Op-Art 棋盘格、3D 线框网格
- 多层叠加：文字和色彩的多层偏移堆叠，制造视觉干扰

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Acid Graphics originates from 90s rave culture and underground club scenes, blending cyberpunk, psychedelic art, and experimental typography.

Core principles:
- Fluorescent colors: High-saturation fluorescent green, acid yellow, electric purple, and cyber pink
- Dark base: Deep black backgrounds make fluorescent colors more glaring and prominent
- Distorted morphing: Liquid distortion feel in typography and forms, tilted cards and elements
- Visual noise: Scanline overlays, Op-Art checkerboards, 3D wireframe grids
- Multi-layer stacking: Multi-layer offset stacking of text and color, creating visual interference`,

  doList: [
    "使用纯黑 #0a0a0a 作为主背景",
    "使用荧光色系（绿 #39ff14、黄 #e6ff00、紫 #a020f0、粉 #ff6ec7）",
    "使用等宽字体 font-mono",
    "保持直角边缘（rounded-none）",
    "使用硬边偏移阴影（shadow-[Npx_Npx_0px_color]）",
    "文字全部大写 uppercase tracking-widest",
    "添加扫描线叠加效果",
    "使用 skew/rotate 创造扭曲感",
    "使用极短或无过渡的生硬动画（duration-75 或 duration-0）",
    "悬停时加入故障感反馈（如 hover:-skew-x-6、瞬时反差变化）",
  ],

  doListEn: [
    "Use pure black #0a0a0a as main background",
    "Use fluorescent color system (green #39ff14, yellow #e6ff00, purple #a020f0, pink #ff6ec7)",
    "Use monospace fonts font-mono",
    "Keep sharp edges (rounded-none)",
    "Use hard-edge offset shadows (shadow-[Npx_Npx_0px_color])",
    "All text uppercase tracking-widest",
    "Add scanline overlay effects",
    "Use skew/rotate to create distortion feel",
    "Use ultra-short or no-transition harsh animations (duration-75 or duration-0)",
    "Add glitch-feel feedback on hover (e.g., hover:-skew-x-6, instant contrast changes)",
  ],

  dontList: [
    "禁止使用柔和的粉彩色或低饱和度色",
    "禁止使用圆角（rounded-md 及以上）",
    "禁止使用衬线字体",
    "禁止使用柔和阴影（shadow-md、shadow-lg 等）",
    "禁止使用白色或浅色背景",
    "禁止使用渐变（所有颜色必须是纯平面荧光色）",
    "禁止使用平滑抛光感动效（ease-in-out、缓慢微交互）",
  ],

  dontListEn: [
    "Do not use soft pastel or low-saturation colors",
    "Do not use rounded corners (rounded-md and above)",
    "Do not use serif fonts",
    "Do not use soft shadows (shadow-md, shadow-lg, etc.)",
    "Do not use white or light backgrounds",
    "Do not use gradients (all colors must be flat fluorescent)",
    "Do not use polished smooth animations (ease-in-out, slow micro-interactions)",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Acid Graphics 风格按钮 - 荧光色硬边偏移阴影",
      code: `<button className="
  px-6 py-3
  bg-[#39ff14] text-[#0a0a0a]
  font-mono font-bold uppercase tracking-widest
  rounded-none
  border-2 border-[#39ff14]
  shadow-[4px_4px_0px_#a020f0]
  hover:translate-x-[2px] hover:translate-y-[2px]
  hover:shadow-[2px_2px_0px_#a020f0]
  hover:-skew-x-6
  active:translate-x-[6px] active:translate-y-[6px]
  active:shadow-none active:bg-[#ff6ec7] active:border-[#ff6ec7] active:text-white
  transition-all duration-75
">
  ACTIVATE
</button>`,
    },
    card: {
      name: "卡片",
      description: "Acid Graphics 风格卡片 - 暗底荧光边框硬阴影",
      code: `<div className="
  group p-8
  bg-[#0a0a0a]
  border-2 border-[#39ff14]
  rounded-none
  shadow-[5px_5px_0px_#a020f0]
  hover:shadow-[8px_8px_0px_#e6ff00]
  hover:border-[#e6ff00]
  hover:-translate-y-1
  transition-all duration-75
  cursor-crosshair
">
  <h3 className="text-2xl font-mono font-bold text-[#39ff14] uppercase tracking-widest mb-3 group-hover:text-[#e6ff00]">
    ACID_ZONE
  </h3>
  <p className="text-[#39ff14]/50 font-mono text-sm group-hover:text-[#e6ff00]/70">
    Distorted reality interface module
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Acid Graphics 风格输入框 - 终端风暗底荧光文字",
      code: `<input
  type="text"
  placeholder="ENTER_DATA>_"
  className="
    w-full px-4 py-3
    bg-[#0a0a0a]
    border-2 border-[#39ff14]/60
    rounded-none
    text-[#39ff14] placeholder-[#39ff14]/25
    font-mono
    focus:border-[#39ff14]
    focus:shadow-[3px_3px_0px_#a020f0]
    focus:outline-none
    transition-all duration-150
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "Acid Graphics 风格 Hero - 多层叠加标题、扫描线、Op-Art 背景",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#0a0a0a]
  relative overflow-hidden
">
  {/* Scanline overlay */}
  <div className="absolute inset-0 pointer-events-none opacity-20"
    style={{
      backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(57,255,20,0.03) 2px, rgba(57,255,20,0.03) 4px)'
    }}
  />
  <div className="relative z-10 px-6">
    {/* Chrome-layered title */}
    <div className="relative">
      <h1 className="text-7xl md:text-9xl font-mono font-black text-[#39ff14] uppercase tracking-tighter">
        ACID
      </h1>
      <h1 className="absolute inset-0 text-7xl md:text-9xl font-mono font-black text-[#a020f0] uppercase tracking-tighter translate-x-[3px] translate-y-[3px] opacity-60">
        ACID
      </h1>
    </div>
    <p className="text-sm text-[#39ff14]/40 font-mono uppercase tracking-[0.3em] mt-4">
      DISTORT // WARP // DISSOLVE
    </p>
    <button className="
      mt-8 px-10 py-4
      bg-[#39ff14] text-[#0a0a0a]
      font-mono font-bold uppercase tracking-widest
      rounded-none border-2 border-[#39ff14]
      shadow-[5px_5px_0px_#ff6ec7]
      hover:translate-x-[2px] hover:translate-y-[2px]
      hover:shadow-[3px_3px_0px_#ff6ec7]
      transition-all duration-150
    ">
      ENTER_VOID
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Acid Graphics Global Styles */

:root {
  --acid-green: #39ff14;
  --acid-black: #0a0a0a;
  --acid-yellow: #e6ff00;
  --acid-purple: #a020f0;
  --acid-pink: #ff6ec7;
  --acid-cyan: #00ffff;
}

/* Scanline overlay */
.acid-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(57, 255, 20, 0.03) 2px,
    rgba(57, 255, 20, 0.03) 4px
  );
  pointer-events: none;
}

/* Op-Art checkerboard */
.acid-checkerboard {
  background-image:
    linear-gradient(45deg, rgba(57, 255, 20, 0.04) 25%, transparent 25%),
    linear-gradient(-45deg, rgba(57, 255, 20, 0.04) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(57, 255, 20, 0.04) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(57, 255, 20, 0.04) 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0;
}

/* Chrome text layering - use with data-text attribute */
.acid-chrome {
  position: relative;
}
.acid-chrome::before {
  content: attr(data-text);
  position: absolute;
  top: 2px;
  left: 3px;
  color: var(--acid-purple);
  opacity: 0.6;
}
.acid-chrome::after {
  content: attr(data-text);
  position: absolute;
  top: -2px;
  left: -2px;
  color: var(--acid-pink);
  opacity: 0.5;
}

/* Fluorescent glow */
.acid-glow {
  text-shadow: 0 0 10px var(--acid-green), 0 0 20px var(--acid-green), 0 0 40px var(--acid-green);
}

/* 3D wireframe grid */
.acid-wireframe-grid {
  background-image:
    linear-gradient(rgba(57, 255, 20, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(57, 255, 20, 0.08) 1px, transparent 1px);
  background-size: 40px 40px;
}

.acid-graphics-filter { filter: brightness(1.05) contrast(1.02); }

.acid-graphics-hover-lift { transition: transform 0.3s ease; }

.acid-graphics-hover-lift:hover { transform: translateY(-2px); }`,

  aiRules: `You are an Acid Graphics design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Soft pastel colors, muted tones, or low-saturation colors
- Rounded corners of any kind (rounded-md, rounded-lg, rounded-xl, rounded-full)
- Serif fonts
- Subtle or soft shadows (shadow-sm, shadow-md, shadow-lg)
- Gradients of any kind (all colors must be flat fluorescent)
- White or light backgrounds
- Backdrop blur or frosted glass effects

## Must Follow

- Dark background: bg-[#0a0a0a] always
- Fluorescent colors only: green #39ff14, yellow #e6ff00, purple #a020f0, pink #ff6ec7
- Monospace fonts: font-mono for all text
- All uppercase: uppercase tracking-widest
- Sharp edges: rounded-none everywhere
- Hard offset shadows: shadow-[Npx_Npx_0px_color] with fluorescent colors
- Bold borders: border-2 with fluorescent colors
- Skewed/rotated elements for distortion feel
- Scanline/noise overlays for visual interference

## Animation & Interaction Rules

- Hard & glitchy only: use duration-75 or duration-0 for interaction transitions
- Hover must feel unstable: skew, abrupt offset changes, or harsh color flips
- Active state must be brutal: collapse shadow instantly and increase press translation
- Avoid polished micro-interactions; interactions should feel raw and disruptive

## Color Palette

Primary:
- Fluorescent Green: #39ff14 (main accent)
- Black: #0a0a0a (backgrounds)
- Acid Yellow: #e6ff00 (highlights)
- Electric Purple: #a020f0 (shadows, secondary)
- Cyber Pink: #ff6ec7 (accents)

## Special Elements

- Scanline overlay effects (repeating-linear-gradient)
- Op-Art checkerboard patterns
- Chrome text layering (multiple offset text copies)
- 3D wireframe grid backgrounds
- Skewed card layouts and tilted elements
- Terminal-style form inputs with fluorescent cursors`,

  aiRulesEn: `You are an Acid Graphics design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Soft pastel colors, muted tones, or low-saturation colors
- Rounded corners of any kind (rounded-md, rounded-lg, rounded-xl, rounded-full)
- Serif fonts
- Subtle or soft shadows (shadow-sm, shadow-md, shadow-lg)
- Gradients of any kind (all colors must be flat fluorescent)
- White or light backgrounds
- Backdrop blur or frosted glass effects

## Must Follow

- Dark background: bg-[#0a0a0a] always
- Fluorescent colors only: green #39ff14, yellow #e6ff00, purple #a020f0, pink #ff6ec7
- Monospace fonts: font-mono for all text
- All uppercase: uppercase tracking-widest
- Sharp edges: rounded-none everywhere
- Hard offset shadows: shadow-[Npx_Npx_0px_color] with fluorescent colors
- Bold borders: border-2 with fluorescent colors
- Skewed/rotated elements for distortion feel
- Scanline/noise overlays for visual interference

## Animation & Interaction Rules

- Hard & glitchy only: use duration-75 or duration-0 for interaction transitions
- Hover must feel unstable: skew, abrupt offset changes, or harsh color flips
- Active state must be brutal: collapse shadow instantly and increase press translation
- Avoid polished micro-interactions; interactions should feel raw and disruptive

## Color Palette

Primary:
- Fluorescent Green: #39ff14 (main accent)
- Black: #0a0a0a (backgrounds)
- Acid Yellow: #e6ff00 (highlights)
- Electric Purple: #a020f0 (shadows, secondary)
- Cyber Pink: #ff6ec7 (accents)

## Special Elements

- Scanline overlay effects (repeating-linear-gradient)
- Op-Art checkerboard patterns
- Chrome text layering (multiple offset text copies)
- 3D wireframe grid backgrounds
- Skewed card layouts and tilted elements
- Terminal-style form inputs with fluorescent cursors`,

  examplePrompts: [
    {
      title: "酸性平面着陆页",
      titleEn: "Acid Graphics Landing Page",
      description: "荧光色迷幻风格的着陆页，包含扫描线和 Op-Art 元素",
      descriptionEn: "Fluorescent psychedelic landing page with scanlines and Op-Art elements",
      prompt: `Use Acid Graphics style to create a landing page:
1. Background: pure black #0a0a0a with scanline overlay
2. Title: huge fluorescent green mono font, chrome-layered with purple offset
3. Cards: dark with fluorescent borders, hard offset shadows, slight skew
4. Only fluorescent colors on black - no white, no pastels
5. Terminal-style form inputs
6. Op-Art checkerboard pattern sections
7. Overall psychedelic, distorted, digital brutalism aesthetic`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 酸性平面设计风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Acid Graphics style",
      prompt: `Create a SaaS landing page using Acid Graphics style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 酸性平面设计风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Acid Graphics style",
      prompt: `Create a portfolio showcase page using Acid Graphics style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "acid-graphics-warm",
      name: "酸性平面设计暖色版",
      nameEn: "Acid Graphics Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#00ff71",
        secondary: "#232323",
        accent: ["#73ff20", "#e711af", "#ff718a", "#36e5ff"],
      },
    },
    {
      id: "acid-graphics-cool",
      name: "酸性平面设计冷色版",
      nameEn: "Acid Graphics Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#a4e400",
        secondary: "#090909",
        accent: ["#ffda1e", "#423aff", "#d775f6", "#00ff93"],
      },
    },
  ],
};
