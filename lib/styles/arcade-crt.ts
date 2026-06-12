import type { DesignStyle } from "./types";

export const arcadeCrt: DesignStyle = {
  slug: "arcade-crt",
  name: "街机CRT",
  nameEn: "Arcade CRT",
  description:
    "80-90年代街机显示器美学，包含扫描线、屏幕曲率、霓虹辉光和RGB色差效果。适合游戏、复古科技、创意项目。",
  descriptionEn:
    "80-90s arcade monitor aesthetics featuring scanlines, screen curvature, neon glow, and RGB chromatic aberration effects. Ideal for gaming, retro tech, and creative projects.",
  cover: "/styles/arcade-crt.svg",
  styleType: "visual",
  tags: ["retro", "expressive", "high-contrast"],
  category: "retro",
  colors: {
    primary: "#39ff14",
    secondary: "#050505",
    accent: ["#ff00ff", "#00ffff", "#ff2a2a", "#FFFF00", "#ff8533"],
  },
  keywords: ["CRT", "scanlines", "retro gaming", "arcade", "pixel", "neon glow", "chromatic aberration", "retro", "vintage", "nostalgic"],

  philosophy: `Arcade CRT 风格再现了80-90年代街机CRT显示器的怀旧辉光。

核心理念：
- 扫描线叠加：所有内容区域使用 repeating-linear-gradient 扫描线效果
- 霓虹辉光：关键元素使用 text-shadow/box-shadow 发光效果
- 像素字体：所有文字使用 monospace 字体
- 极暗背景：近乎纯黑的背景最大化霓虹对比度
- RGB色差：标题使用品红和青色偏移的 text-shadow
- 高饱和度：仅使用高饱和度霓虹色

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Arcade CRT style recreates the nostalgic glow of 80-90s arcade CRT monitors.

Core principles:
- Scanline overlay: all content areas use repeating-linear-gradient scanline effects
- Neon glow: key elements use text-shadow/box-shadow glow effects
- Pixel fonts: all text uses monospace fonts
- Ultra-dark backgrounds: near-pure black backgrounds maximize neon contrast
- RGB chromatic aberration: headings use magenta and cyan offset text-shadow
- High saturation: only high-saturation neon colors are used`,

  doList: [
    "Use scanline overlay on all content areas",
    "Apply neon glow (text-shadow/box-shadow) to key elements",
    "Use monospace/pixel fonts for all text",
    "Keep backgrounds near-black to maximize neon contrast",
    "Add RGB chromatic aberration on headlines",
    "Use high-saturation neon colors only",
  ],

  doListEn: [
    "Use scanline overlay on all content areas",
    "Apply neon glow (text-shadow/box-shadow) to key elements",
    "Use monospace/pixel fonts for all text",
    "Keep backgrounds near-black to maximize neon contrast",
    "Add RGB chromatic aberration on headlines",
    "Use high-saturation neon colors only",
  ],

  dontList: [
    "Don't use pastel or muted colors",
    "Don't use serif or sans-serif body fonts",
    "Don't use rounded corners larger than 4px",
    "Don't use subtle shadows - only neon glows",
    "Don't use gradients that aren't neon-to-dark",
  ],

  dontListEn: [
    "Don't use pastel or muted colors",
    "Don't use serif or sans-serif body fonts",
    "Don't use rounded corners larger than 4px",
    "Don't use subtle shadows - only neon glows",
    "Don't use gradients that aren't neon-to-dark",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Arcade CRT 霓虹按钮，带发光效果和像素字体",
      code: `<button className="group relative px-8 py-4 bg-[#39ff14]/10 text-[#39ff14] font-mono text-xl uppercase tracking-[0.2em] border-2 border-[#39ff14] shadow-[0_0_15px_rgba(57,255,20,0.4),inset_0_0_15px_rgba(57,255,20,0.2)] hover:bg-[#39ff14] hover:text-black hover:shadow-[0_0_40px_rgba(57,255,20,0.8),inset_0_0_20px_rgba(57,255,20,0.5)] active:translate-y-[6px] active:shadow-[0_0_10px_rgba(57,255,20,0.5)] transition-all duration-150">
  <span className="group-hover:animate-pulse">INSERT COIN</span>
</button>`,
    },
    card: {
      name: "卡片",
      description: "Arcade CRT 风格的发光边框卡片，带扫描线叠加",
      code: `<div className="group bg-[#0a0a0a] border-2 border-[#39ff14]/30 p-6 relative overflow-hidden hover:border-[#39ff14] hover:shadow-[0_0_30px_rgba(57,255,20,0.2)] hover:-translate-y-1 transition-all duration-200 cursor-crosshair">
  {/* Scanline overlay */}
  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(57,255,20,0.05)_2px,rgba(57,255,20,0.05)_4px)] pointer-events-none group-hover:opacity-50 transition-opacity duration-200" />

  <div className="relative">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-3 h-3 bg-[#39ff14] shadow-[0_0_10px_rgba(57,255,20,0.8)] group-hover:animate-ping" />
      <h3 className="text-[#39ff14] font-mono text-xs uppercase tracking-[0.2em]">Game Module</h3>
    </div>
    <h4 className="text-white text-xl font-mono font-bold mb-2 transition-all duration-100 group-hover:text-[#39ff14] group-active:translate-x-[2px]" style={{textShadow: '-2px 0 #ff00ff, 2px 0 #00ffff'}}>
      TITLE HERE
    </h4>
    <p className="text-[#39ff14]/60 font-mono text-sm leading-relaxed group-hover:text-[#39ff14]/90">
      Description text with terminal green tint.
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Arcade CRT 终端风格输入框",
      code: `<div className="space-y-2">
  <label className="block text-[#39ff14] font-mono text-xs uppercase tracking-[0.2em]">Player Name</label>
  <input
    type="text"
    className="w-full px-4 py-3 bg-black border-2 border-[#39ff14]/40 text-[#39ff14] font-mono text-sm placeholder:text-[#39ff14]/30 focus:outline-none focus:border-[#39ff14] focus:shadow-[0_0_15px_rgba(57,255,20,0.3)] transition-all duration-200"
    placeholder="ENTER NAME..."
  />
</div>`,
    },
    nav: {
      name: "导航栏",
      description: "Arcade CRT 导航栏，带扫描线和霓虹边框",
      code: `<nav className="bg-[#050505]/95 border-b-2 border-[#39ff14]/30 backdrop-blur-sm px-6 py-3 flex justify-between items-center">
  <span className="text-[#39ff14] font-mono text-sm uppercase tracking-[0.15em]">ARCADE CRT</span>
  <div className="flex gap-6">
    <a className="text-[#00ffff] font-mono text-xs uppercase tracking-widest hover:text-[#00ffff]/70 transition-colors">Games</a>
    <a className="text-[#39ff14]/60 font-mono text-xs uppercase tracking-widest hover:text-[#39ff14] transition-colors">Scores</a>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区域",
      description: "Arcade CRT Hero 区域，带 RGB 色差标题和扫描线",
      code: `<section className="relative bg-[#050505] overflow-hidden px-6 py-20">
  {/* Scanline overlay */}
  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(57,255,20,0.03)_2px,rgba(57,255,20,0.03)_4px)] pointer-events-none" />
  <div className="relative max-w-4xl mx-auto text-center">
    <h1 className="text-5xl md:text-7xl font-mono font-bold uppercase tracking-wider text-[#39ff14]" style={{textShadow: '-3px 0 #ff00ff, 3px 0 #00ffff'}}>
      ARCADE CRT
    </h1>
    <p className="mt-4 text-[#00ffff]/70 font-mono text-sm">
      Press Start to Begin
    </p>
  </div>
</section>`,
    },
    footer: {
      name: "页脚",
      description: "Arcade CRT 页脚",
      code: `<footer className="bg-[#050505] border-t-2 border-[#39ff14]/20 px-6 py-6">
  <p className="text-[#39ff14]/40 font-mono text-xs text-center uppercase tracking-widest">
    CREDITS: 00 // INSERT COIN
  </p>
</footer>`,
    },
  },

  globalCss: `/* Arcade CRT Global Styles */
@layer base {
  body {
    @apply bg-[#050505] text-[#39ff14] antialiased;
    background-image:
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(57, 255, 20, 0.03) 2px,
        rgba(57, 255, 20, 0.03) 4px
      );
  }

  h1, h2, h3 {
    text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff;
  }

  ::selection {
    @apply bg-[#39ff14] text-black;
  }
}

@keyframes crt-flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.98; }
}
@keyframes crt-scanline-move {
  0% { transform: translateY(0); }
  100% { transform: translateY(4px); }
}
@keyframes neon-flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
  20%, 24%, 55% { opacity: 0.8; }
}
@keyframes rgb-shift {
  0%, 100% { text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff; }
  50% { text-shadow: -3px 0 #ff00ff, 3px 0 #00ffff; }
}
/* Arcade CRT Design Tokens */
:root {
  --arcade-crt-primary: #39ff14;
  --arcade-crt-secondary: #050505;
  --arcade-crt-accent: #ff00ff;
  --arcade-crt-glow: rgba(57, 255, 20, 0.3);
}

.arcade-crt-card {
  position: relative;
  overflow: hidden;
}

.arcade-crt-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(57, 255, 20, 0.05), transparent);
  pointer-events: none;
}

.arcade-crt-card:hover::before {
  opacity: 1;
}

.arcade-crt-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(57, 255, 20, 0.08);
}

.arcade-crt-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.arcade-crt-animate-in {
  animation: arcade-crt-fade-in 0.5s ease-out both;
}

.arcade-crt-focus { outline: 2px solid var(--arcade-crt-primary, currentColor); outline-offset: 2px; }`,

  aiRules: `STYLE: Arcade CRT
TYPE: Retro gaming CRT monitor aesthetic

MUST USE:
- Background: Always near-black (#050505 or #0a0a0a)
- Primary accent: Neon green (#39ff14) for main interactive elements
- Secondary accents: Magenta (#ff00ff), Cyan (#00ffff), Red (#ff2a2a), Yellow (#FFFF00)
- All text must use monospace or pixel fonts (font-mono)
- Scanline overlay: repeating-linear-gradient on content areas
- RGB chromatic aberration: text-shadow with offset magenta and cyan on headlines
- Neon glow: box-shadow with color matching the element
- uppercase text with wide letter-spacing for labels
- CRT vignette: slight darkening at edges

MUST AVOID:
- Light/white backgrounds
- Pastel or muted colors
- Serif or sans-serif fonts
- Large border-radius (max 4px)
- Subtle/standard shadows (use neon glow only)
- Gradients that aren't neon-to-dark

COLOR RULES:
- Primary: Neon Green (#39ff14)
- Accent 1: Magenta (#ff00ff)
- Accent 2: Cyan (#00ffff)
- Accent 3: Red (#ff2a2a)
- Accent 4: Yellow (#FFFF00)
- Background: Near-black (#050505)

SPECIAL EFFECTS:
- Scanline overlay via CSS repeating-linear-gradient
- RGB chromatic aberration on headings
- Neon flicker animation for atmosphere
- CRT screen curvature hint via vignette

Animation & Interaction Rules:
- Neon Breathing: 悬停时，外发光 (box-shadow) 必须明显膨胀，甚至可以加入微弱的 \`animate-pulse\` 模拟电压不稳的闪烁感。
- Arcade Button Press: 点击状态 (\`:active\`) 必须模拟真实的物理街机按键被用力砸下的感觉。使用强烈位移 \`active:translate-y-[4px]\`，并瞬间改变阴影大小。
- CRT Distortion: 交互时，可以通过改变 text-shadow 的偏移量，瞬间放大 RGB 色差（如洋红和青色分离距离）。
- Instant Feedback: CRT 没有平滑物理惯性，交互响应时间应偏短，如 \`duration-100\` 或 \`duration-150\`。`,

  aiRulesEn: `STYLE: Arcade CRT
TYPE: Retro gaming CRT monitor aesthetic

MUST USE:
- Background: Always near-black (#050505 or #0a0a0a)
- Primary accent: Neon green (#39ff14) for main interactive elements
- Secondary accents: Magenta (#ff00ff), Cyan (#00ffff), Red (#ff2a2a), Yellow (#FFFF00)
- All text must use monospace or pixel fonts (font-mono)
- Scanline overlay: repeating-linear-gradient on content areas
- RGB chromatic aberration: text-shadow with offset magenta and cyan on headlines
- Neon glow: box-shadow with color matching the element
- uppercase text with wide letter-spacing for labels

MUST AVOID:
- Light/white backgrounds
- Pastel or muted colors
- Serif or sans-serif fonts
- Large border-radius (max 4px)
- Subtle/standard shadows (use neon glow only)
- Gradients that aren't neon-to-dark

Animation & Interaction Rules:
- Neon Breathing: On hover, outer glow (box-shadow) must visibly expand, optionally with subtle animate-pulse to simulate voltage instability flicker.
- Arcade Button Press: Active state (:active) must simulate the feel of a real arcade button being slammed down hard. Use strong displacement active:translate-y-[4px] and instantly change shadow size.
- CRT Distortion: On interaction, RGB chromatic aberration can be amplified by changing text-shadow offsets (magenta and cyan separation distance).
- Instant Feedback: CRT has no smooth physical inertia; interaction response time should be short, such as duration-100 or duration-150.`,

  examplePrompts: [
    {
      title: "街机游戏选择器",
      titleEn: "Arcade Game Selector",
      description: "带CRT显示器边框和扫描线的游戏选择界面",
      descriptionEn: "Game selector with CRT monitor frame and scanline overlay",
      prompt: `Create an arcade game selector using Arcade CRT style:
- Dark background with scanline overlay
- Neon green game cards with glow borders
- RGB chromatic aberration on game titles
- INSERT COIN button with neon pulse
- Monospace pixel font throughout`,
    },
    {
      title: "复古高分排行榜",
      titleEn: "Retro High-Score Board",
      description: "霓虹绿文字在黑色背景上的排行榜",
      descriptionEn: "Neon green text leaderboard on black background",
      prompt: `Build a retro high-score leaderboard using Arcade CRT style:
- Near-black background with scanline effect
- Neon green text for scores
- Player names in cyan
- Rank numbers in yellow
- Pulsing top-score highlight`,
    },
  {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 街机CRT风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Arcade CRT style",
      prompt: `Create a portfolio showcase page using Arcade CRT style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "arcade-crt-warm",
      name: "街机CRT暖色版",
      nameEn: "Arcade CRT Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#00ff71",
        secondary: "#1e1e1e",
        accent: ["#ff008b", "#36e5ff", "#d23f00", "#86ff17", "#be9c0e"],
      },
    },
    {
      id: "arcade-crt-cool",
      name: "街机CRT冷色版",
      nameEn: "Arcade CRT Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#a4e400",
        secondary: "#050505",
        accent: ["#8b1cff", "#00ff93", "#ff2184", "#ffd829", "#ff7374"],
      },
    },
  ],
};
