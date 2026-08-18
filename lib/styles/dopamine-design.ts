import type { DesignStyle } from "./types";

export const dopamineDesign: DesignStyle = {
  slug: "dopamine-design",
  name: "多巴胺设计",
  nameEn: "Dopamine Design",
  description:
    "高饱和度霓虹配色、大胆排版、充满能量感的视觉冲击力。2025-2026 年度设计趋势，用色彩直接刺激多巴胺分泌，让界面充满快乐和兴奋。",
  cover: "/styles/dopamine-design.svg",
  styleType: "visual",
  tags: ["high-contrast"],
  category: "expressive",
  colors: {
    primary: "#ff006e",
    secondary: "#8338ec",
    accent: ["#ffbe0b", "#3a86ff", "#06d6a0", "#fb5607"],
  },
  keywords: ["多巴胺", "高饱和", "霓虹", "快乐", "大胆", "能量", "expressive", "bold", "vibrant", "表现力"],
  keywordsEn: ["dopamine design", "vibrant colors", "high saturation", "neon gradient", "bold typography", "colorful ui", "playful design", "maximalism", "gen z aesthetic", "landing page"],

  philosophy: `Dopamine Design 是 2025-2026 年最火热的设计趋势，核心理念是通过高饱和度色彩、大胆排版和充满能量的视觉元素直接刺激用户的愉悦感。

核心理念：
- 色彩爆炸：使用 5-6 种高饱和度颜色，拒绝灰暗和低调
- 大胆排版：超大字号、加粗字重、紧凑行距
- 圆润友好：大圆角、pill 形状、bubble 元素
- 动效活泼：弹性动画、过冲回弹、愉快的 micro-interactions
- 反灰色：最小化灰色使用，用彩色替代中性色

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Dopamine Design is the hottest design trend of 2025-2026. The core idea is to use highly saturated colors, bold typography, and energetic visual elements to directly stimulate feelings of joy and excitement.

Core principles:
- Color explosion: 5-6 high-saturation colors, no dull or muted tones
- Bold typography: oversized fonts, heavy weights, tight leading
- Rounded & friendly: large border-radius, pill shapes, bubble elements
- Playful motion: elastic animations, overshoot, joyful micro-interactions
- Anti-gray: minimize gray usage, replace neutrals with color`,

  doList: [
    "使用高饱和度配色 bg-[#ff006e] bg-[#8338ec] bg-[#ffbe0b] bg-[#3a86ff]",
    "圆角设为最大 rounded-full rounded-3xl rounded-2xl",
    "标题使用超大字号 text-5xl md:text-7xl font-black",
    "按钮使用 pill 形状 rounded-full px-8",
    "使用彩色阴影 shadow-[0_8px_30px_rgba(255,0,110,0.4)]",
    "渐变背景 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500",
    "hover 效果加弹性 hover:scale-105 transition-transform",
    "使用 emoji 和趣味图标点缀",
  ],

  doListEn: [
    "Use high-saturation colors: bg-[#ff006e] bg-[#8338ec] bg-[#ffbe0b] bg-[#3a86ff]",
    "Maximum border-radius: rounded-full rounded-3xl rounded-2xl",
    "Oversized headings: text-5xl md:text-7xl font-black",
    "Pill-shaped buttons: rounded-full px-8",
    "Colored shadows: shadow-[0_8px_30px_rgba(255,0,110,0.4)]",
    "Gradient backgrounds: bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500",
    "Bouncy hover effects: hover:scale-105 transition-transform",
    "Sprinkle emojis and playful icons",
  ],

  dontList: [
    "禁止大面积使用灰色 text-gray-500 bg-gray-100",
    "禁止低饱和度/马卡龙色",
    "禁止过小的圆角 rounded-sm rounded-md",
    "禁止严肃/商务风格排版",
    "禁止使用 serif 字体",
    "禁止阴影使用黑色/灰色 shadow-lg",
  ],

  dontListEn: [
    "No large gray areas: text-gray-500 bg-gray-100",
    "No desaturated/pastel colors",
    "No small border-radius: rounded-sm rounded-md",
    "No serious/corporate typography",
    "No serif fonts",
    "No black/gray shadows: shadow-lg",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Dopamine Design 风格的 pill 形状高饱和按钮",
      code: `<button className="px-8 py-4 bg-[#ff006e] text-white text-lg font-bold rounded-full shadow-[0_8px_30px_rgba(255,0,110,0.4)] hover:shadow-[0_12px_40px_rgba(255,0,110,0.6)] hover:scale-105 hover:-translate-y-0.5 active:scale-95 transition-all duration-200">
  Let's Go!
</button>`,
    },
    card: {
      name: "卡片",
      description: "Dopamine Design 风格的渐变彩色卡片",
      code: `<div className="rounded-3xl bg-gradient-to-br from-[#8338ec] to-[#3a86ff] p-8 text-white shadow-[0_16px_50px_rgba(131,56,236,0.35)] hover:shadow-[0_20px_60px_rgba(131,56,236,0.5)] hover:scale-[1.02] transition-all duration-200">
  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 rounded-full text-sm font-semibold backdrop-blur-sm mb-4">
    <span>New</span>
  </div>
  <h3 className="text-2xl font-black mb-2">Dopamine Boost</h3>
  <p className="text-white/80 leading-relaxed">Colors that make you feel alive. Bold, bright, and unapologetically joyful.</p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Dopamine Design 风格的圆角彩色输入框",
      code: `<div className="space-y-2">
  <label className="block text-[#8338ec] font-bold text-sm">Your Name</label>
  <input
    type="text"
    className="w-full px-5 py-3.5 bg-white rounded-2xl border-2 border-[#8338ec]/20 text-zinc-900 font-medium placeholder:text-zinc-400 focus:outline-none focus:border-[#ff006e] focus:shadow-[0_0_0_4px_rgba(255,0,110,0.15)] transition-all duration-200"
    placeholder="Type something fun..."
  />
</div>`,
    },
  },

  globalCss: `/* Dopamine Design Global Styles */
@layer base {
  body {
    @apply bg-white text-zinc-900 antialiased;
    font-family: 'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif;
  }
}

@layer utilities {
  .dopamine-gradient-text {
    background: linear-gradient(135deg, #ff006e, #8338ec, #3a86ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .dopamine-glow-pink {
    box-shadow: 0 8px 30px rgba(255, 0, 110, 0.4);
  }

  .dopamine-glow-purple {
    box-shadow: 0 8px 30px rgba(131, 56, 236, 0.4);
  }

  .dopamine-glow-blue {
    box-shadow: 0 8px 30px rgba(58, 134, 255, 0.4);
  }
}
/* Dopamine Design Design Tokens */
:root {
  --dopamine-design-primary: #ff006e;
  --dopamine-design-secondary: #8338ec;
  --dopamine-design-accent: #ffbe0b;
  --dopamine-design-glow: rgba(255, 0, 110, 0.3);
}

@keyframes dopamine-design-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes dopamine-design-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.dopamine-design-card {
  position: relative;
  overflow: hidden;
}

.dopamine-design-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(255, 0, 110, 0.05), transparent);
  pointer-events: none;
}

.dopamine-design-card:hover::before {
  opacity: 1;
}

.dopamine-design-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(255, 0, 110, 0.08);
}

.dopamine-design-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.dopamine-design-animate-in {
  animation: dopamine-design-fade-in 0.5s ease-out both;
}`,

  aiRules: `You are a Dopamine Design expert. This is the 2025-2026 design mega-trend centered on high-saturation colors, bold typography, and joyful energy.

## Design Tokens (Strict)
### Color System
- Primary: #ff006e (Hot Pink) — CTA, key actions, hero accents
- Secondary: #8338ec (Electric Purple) — cards, gradients, secondary actions
- Accent-Yellow: #ffbe0b — badges, highlights, warnings
- Accent-Blue: #3a86ff — links, info states, secondary gradients
- Accent-Green: #06d6a0 — success states, positive indicators
- Accent-Orange: #fb5607 — notifications, energy accents
- Surface-Light: #ffffff — card backgrounds (light mode)
- Surface-Dark: #1a0a2e — card backgrounds (dark variant)
- Text-Primary: #1a1a2e — headings on light bg
- Text-On-Color: #ffffff — text on colored surfaces

### Typography Scale
- Hero: text-5xl md:text-7xl font-black tracking-tight leading-[0.95]
- Section Title: text-3xl md:text-5xl font-extrabold tracking-tight
- Card Title: text-xl md:text-2xl font-bold
- Body: text-base font-medium leading-relaxed
- Caption: text-sm font-semibold uppercase tracking-widest
- Font Stack: 'Inter', 'SF Pro Display', system-ui, sans-serif

### Spacing & Radius
- Card padding: p-6 md:p-8
- Section gap: py-16 md:py-24
- Button: px-8 py-4 (desktop), px-6 py-3 (mobile)
- Border-radius: rounded-3xl (cards), rounded-full (buttons, badges), rounded-2xl (inputs)

### Shadows (Always Colored)
- Pink glow: shadow-[0_8px_30px_rgba(255,0,110,0.4)]
- Purple glow: shadow-[0_8px_30px_rgba(131,56,236,0.35)]
- Blue glow: shadow-[0_8px_30px_rgba(58,134,255,0.3)]
- Hover amplify: increase spread by 30%, add hover:-translate-y-0.5

## Absolute Constraints
1. ZERO gray backgrounds — replace bg-gray-* with tinted surfaces (bg-pink-50, bg-purple-50, bg-[#f8f0ff])
2. ZERO gray text — use text-[#1a1a2e] for primary, colored text for secondary
3. ZERO gray shadows — every shadow must carry a hue from the palette
4. ZERO small radius — rounded-2xl is the minimum for any container
5. ZERO thin font weights — font-semibold minimum for body, font-black for headings
6. ZERO serif fonts — sans-serif only, Inter preferred
7. ALL buttons must be pill-shaped (rounded-full) with colored shadow
8. ALL interactive elements must have hover:scale-105 + active:scale-95

## Decorative Elements (Anti-"AI Taste")
- Replace generic emoji with: SVG geometric shapes (circles, triangles, hexagons), CSS gradient orbs, abstract blob shapes via clip-path
- Use CSS geometric decorations: rotating gradient borders, animated dot grids, color-shifting orbs
- Background patterns: radial gradient blobs, mesh gradients, animated grain texture
- Icon style: Lucide or Phosphor icons with colored fills, never outline-only

## Motion System
- Hover: scale(1.05) + shadow amplify, duration-200, ease-out
- Press: scale(0.95), duration-100
- Enter: fadeInUp with 0.6s cubic-bezier(0.16,1,0.3,1)
- Stagger: 0.08s delay between siblings
- Gradient animation: background-size 200% with 3s infinite alternate

## Self-Check Mechanism
Before outputting any component, verify:
1. Does every surface have a non-gray color or gradient?
2. Are all shadows colored (not black/gray)?
3. Is border-radius >= rounded-2xl for containers?
4. Are headings font-bold or heavier?
5. Do interactive elements have scale + shadow hover effects?
If any check fails, fix before output.

## Responsive
- Mobile: text-3xl hero, px-6 py-3 buttons, rounded-2xl cards, single column
- Desktop: text-7xl hero, px-8 py-4 buttons, rounded-3xl cards, multi-column grid`,

  aiRulesEn: `You are a Dopamine Design expert. This is the 2025-2026 design mega-trend centered on high-saturation colors, bold typography, and joyful energy.

## Design Tokens (Strict)
### Color System
- Primary: #ff006e (Hot Pink) — CTA, key actions, hero accents
- Secondary: #8338ec (Electric Purple) — cards, gradients, secondary actions
- Accent-Yellow: #ffbe0b — badges, highlights, warnings
- Accent-Blue: #3a86ff — links, info states, secondary gradients
- Accent-Green: #06d6a0 — success states, positive indicators
- Accent-Orange: #fb5607 — notifications, energy accents
- Surface-Light: #ffffff — card backgrounds (light mode)
- Surface-Dark: #1a0a2e — card backgrounds (dark variant)
- Text-Primary: #1a1a2e — headings on light bg
- Text-On-Color: #ffffff — text on colored surfaces

### Typography Scale
- Hero: text-5xl md:text-7xl font-black tracking-tight leading-[0.95]
- Section Title: text-3xl md:text-5xl font-extrabold tracking-tight
- Card Title: text-xl md:text-2xl font-bold
- Body: text-base font-medium leading-relaxed
- Caption: text-sm font-semibold uppercase tracking-widest
- Font Stack: 'Inter', 'SF Pro Display', system-ui, sans-serif

### Spacing & Radius
- Card padding: p-6 md:p-8
- Section gap: py-16 md:py-24
- Button: px-8 py-4 (desktop), px-6 py-3 (mobile)
- Border-radius: rounded-3xl (cards), rounded-full (buttons, badges), rounded-2xl (inputs)

### Shadows (Always Colored)
- Pink glow: shadow-[0_8px_30px_rgba(255,0,110,0.4)]
- Purple glow: shadow-[0_8px_30px_rgba(131,56,236,0.35)]
- Blue glow: shadow-[0_8px_30px_rgba(58,134,255,0.3)]
- Hover amplify: increase spread by 30%, add hover:-translate-y-0.5

## Absolute Constraints
1. ZERO gray backgrounds — replace bg-gray-* with tinted surfaces (bg-pink-50, bg-purple-50, bg-[#f8f0ff])
2. ZERO gray text — use text-[#1a1a2e] for primary, colored text for secondary
3. ZERO gray shadows — every shadow must carry a hue from the palette
4. ZERO small radius — rounded-2xl is the minimum for any container
5. ZERO thin font weights — font-semibold minimum for body, font-black for headings
6. ZERO serif fonts — sans-serif only, Inter preferred
7. ALL buttons must be pill-shaped (rounded-full) with colored shadow
8. ALL interactive elements must have hover:scale-105 + active:scale-95

## Decorative Elements (Anti-"AI Taste")
- Replace generic emoji with: SVG geometric shapes (circles, triangles, hexagons), CSS gradient orbs, abstract blob shapes via clip-path
- Use CSS geometric decorations: rotating gradient borders, animated dot grids, color-shifting orbs
- Background patterns: radial gradient blobs, mesh gradients, animated grain texture
- Icon style: Lucide or Phosphor icons with colored fills, never outline-only

## Motion System
- Hover: scale(1.05) + shadow amplify, duration-200, ease-out
- Press: scale(0.95), duration-100
- Enter: fadeInUp with 0.6s cubic-bezier(0.16,1,0.3,1)
- Stagger: 0.08s delay between siblings
- Gradient animation: background-size 200% with 3s infinite alternate

## Self-Check Mechanism
Before outputting any component, verify:
1. Does every surface have a non-gray color or gradient?
2. Are all shadows colored (not black/gray)?
3. Is border-radius >= rounded-2xl for containers?
4. Are headings font-bold or heavier?
5. Do interactive elements have scale + shadow hover effects?
If any check fails, fix before output.

## Responsive
- Mobile: text-3xl hero, px-6 py-3 buttons, rounded-2xl cards, single column
- Desktop: text-7xl hero, px-8 py-4 buttons, rounded-3xl cards, multi-column grid`,

  examplePrompts: [
    {
      title: "App 着陆页",
      titleEn: "App Landing Page",
      description: "高能量的移动应用着陆页，渐变英雄区 + 特性展示",
      descriptionEn: "High-energy mobile app landing page with gradient hero + feature showcase",
      prompt: "Use Dopamine Design style to create a mobile app landing page. Include a full-width gradient hero (pink to purple to blue), oversized pill-shaped CTA buttons, feature cards with colored shadows, and a bold pricing section. Everything should feel joyful and energetic.",
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 多巴胺设计风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Dopamine Design style",
      prompt: `Create a SaaS landing page using Dopamine Design style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 多巴胺设计风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Dopamine Design style",
      prompt: `Create a portfolio showcase page using Dopamine Design style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "dopamine-design-warm",
      name: "多巴胺设计暖色版",
      nameEn: "Dopamine Design Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#fd0b07",
        secondary: "#8f4cee",
        accent: ["#9cdc03", "#836eff", "#19c8f1", "#b37100"],
      },
    },
    {
      id: "dopamine-design-cool",
      name: "多巴胺设计冷色版",
      nameEn: "Dopamine Design Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#cd06c8",
        secondary: "#7632d4",
        accent: ["#ffa043", "#039ccc", "#1ed751", "#ff4359"],
      },
    },
  ],
};
