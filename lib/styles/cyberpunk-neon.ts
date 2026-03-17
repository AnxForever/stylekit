import { DesignStyle } from "./index";

export const cyberpunkNeon: DesignStyle = {
  slug: "cyberpunk-neon",
  name: "赛博朋克霓虹",
  nameEn: "Cyberpunk Neon",
  description:
    "未来感十足的赛博朋克风格，霓虹发光效果、深色背景、高科技感的 UI 元素。适合游戏、科技产品、创意工作室。",
  descriptionEn:
    "A futuristic cyberpunk style with neon glow effects, dark backgrounds, and high-tech UI elements. Ideal for games, tech products, and creative studios.",
  cover: "/styles/cyberpunk-neon.svg",
  styleType: "visual",
  tags: ["expressive", "modern", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#00ffff",
    secondary: "#0a0a0f",
    accent: ["#ff00ff", "#ffff00", "#00ff00", "#ff0506"],
  },
  keywords: ["赛博朋克", "霓虹", "未来", "发光", "游戏", "科技", "expressive", "bold", "vibrant", "表现力"],

  philosophy: `Cyberpunk Neon 风格来源于赛博朋克科幻美学，通过霓虹发光、深色背景和高对比度创造未来感。

核心理念：
- 霓虹发光：核心元素使用发光效果突出
- 深色主导：近乎纯黑的背景让霓虹更加醒目
- 高科技感：使用网格、扫描线等元素增加科技感
- 色彩冲击：青色、品红、黄色等高饱和度颜色

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Cyberpunk Neon style draws from cyberpunk sci-fi aesthetics, creating a futuristic feel through neon glow, dark backgrounds, and high contrast.

Core principles:
- Neon glow: Core elements stand out with glow effects
- Dark dominance: Near-black backgrounds make neon colors more striking
- High-tech feel: Grids, scanlines, and other elements enhance the tech atmosphere
- Color impact: Cyan, magenta, yellow, and other high-saturation colors`,

  doList: [
    "背景使用深色 bg-[#0a0a0f] 或 bg-gray-950",
    "使用 shadow-[0_0_20px_rgba(0,255,255,0.5)] 创造发光效果",
    "文字发光 [text-shadow:0_0_10px_currentColor]",
    "边框发光 border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.3)]",
    "使用扫描线背景效果增加科技感",
    "按钮悬停增强发光 hover:shadow-[0_0_30px_rgba(0,255,255,0.7)]",
    "渐变文字 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent",
  ],

  doListEn: [
    "Use dark backgrounds bg-[#0a0a0f] or bg-gray-950",
    "Use shadow-[0_0_20px_rgba(0,255,255,0.5)] to create glow effects",
    "Text glow with [text-shadow:0_0_10px_currentColor]",
    "Glowing borders with border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.3)]",
    "Use scanline background effects for tech feel",
    "Enhance glow on button hover hover:shadow-[0_0_30px_rgba(0,255,255,0.7)]",
    "Gradient text bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent",
  ],

  dontList: [
    "禁止使用浅色/白色背景",
    "禁止使用低饱和度颜色",
    "禁止使用普通阴影 shadow-md（必须是发光阴影）",
    "禁止使用暖色调（除非作为警告/错误色）",
    "禁止圆角过大 rounded-2xl, rounded-3xl",
    "禁止使用柔和/温暖的设计语言",
  ],

  dontListEn: [
    "Do not use light/white backgrounds",
    "Do not use low-saturation colors",
    "Do not use regular shadows like shadow-md (must use glow shadows)",
    "Do not use warm color schemes (unless for warning/error colors)",
    "Do not use overly large border radius rounded-2xl, rounded-3xl",
    "Do not use soft/warm design language",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Cyberpunk 风格的霓虹按钮",
      code: `<button className="group relative px-6 py-3 bg-transparent border border-cyan-400 text-cyan-300 rounded-sm font-mono text-sm uppercase tracking-[0.18em] shadow-[0_0_10px_rgba(0,255,255,0.4),inset_0_0_10px_rgba(0,255,255,0.15)] hover:bg-cyan-400/15 hover:shadow-[0_0_26px_rgba(0,255,255,0.8),inset_0_0_18px_rgba(0,255,255,0.35)] hover:text-cyan-100 active:translate-x-[2px] active:-translate-y-[1px] active:border-fuchsia-500 active:text-fuchsia-400 active:shadow-[0_0_8px_rgba(255,0,255,0.75)] transition-all duration-100 overflow-hidden motion-reduce:transition-none">
  <span className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent skew-x-12 group-hover:left-[120%] transition-all duration-150" />
  <span className="relative z-10 drop-shadow-[0_0_8px_currentColor] group-hover:animate-pulse">Initialize</span>
</button>`,
    },
    card: {
      name: "卡片",
      description: "Cyberpunk 风格的发光卡片",
      code: `<div className="group bg-gray-950 border border-cyan-400/30 rounded-sm p-6 shadow-[0_0_15px_rgba(0,255,255,0.15)] hover:shadow-[0_0_30px_rgba(0,255,255,0.45)] hover:border-cyan-300 transition-all duration-150 relative overflow-hidden">
  {/* Scan line effect */}
  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.03)_50%)] bg-[length:100%_4px] pointer-events-none opacity-60 group-hover:opacity-100 group-hover:bg-[length:100%_2px] transition-all duration-150" />
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(255,0,255,0.12),transparent_45%)] pointer-events-none transition-opacity duration-150" />

  <div className="relative">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-2 h-2 rounded-none bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)] group-hover:animate-ping" />
      <h3 className="text-cyan-400 font-mono uppercase tracking-[0.2em] text-xs group-hover:text-white transition-colors duration-150">System Module</h3>
    </div>
    <h4 className="text-white text-xl font-bold mb-3 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] group-active:translate-x-[1px] transition-all duration-150">
      Neural Interface
    </h4>
    <p className="text-gray-400 leading-relaxed font-mono text-sm group-hover:text-cyan-400/80 transition-colors duration-150">
      &gt; Advanced cybernetic enhancement module operational.
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Cyberpunk 风格的输入框",
      code: `<div className="space-y-2">
  <label className="block text-cyan-400 font-mono text-xs uppercase tracking-wider">Access Code</label>
  <div className="relative">
    <input
      type="text"
      className="w-full px-4 py-3 bg-gray-950 border border-cyan-400/30 rounded-lg text-cyan-400 font-mono placeholder:text-cyan-400/30 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-300"
      placeholder="Enter credentials..."
    />
    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)] animate-pulse" />
  </div>
</div>`,
    },
  },

  globalCss: `/* Cyberpunk Neon Global Styles */
@layer base {
  body {
    @apply bg-[#0a0a0f] text-white antialiased;
    background-image:
      linear-gradient(transparent 50%, rgba(0, 255, 255, 0.02) 50%);
    background-size: 100% 4px;
  }

  h1, h2, h3 {
    text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
  }

  ::selection {
    @apply bg-cyan-400 text-black;
  }
}

@keyframes neon-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
/* Cyberpunk Neon Design Tokens */
:root {
  --cyberpunk-neon-primary: #00ffff;
  --cyberpunk-neon-secondary: #0a0a0f;
  --cyberpunk-neon-accent: #ff00ff;
  --cyberpunk-neon-glow: rgba(0, 255, 255, 0.3);
}

.cyberpunk-neon-card {
  position: relative;
  overflow: hidden;
}

.cyberpunk-neon-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(0, 255, 255, 0.05), transparent);
  pointer-events: none;
}

.cyberpunk-neon-card:hover::before {
  opacity: 1;
}

.cyberpunk-neon-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(0, 255, 255, 0.08);
}

.cyberpunk-neon-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.cyberpunk-neon-animate-in {
  animation: cyberpunk-neon-fade-in 0.5s ease-out both;
}

.cyberpunk-neon-hover-lift { transition: transform 0.3s ease; }

.cyberpunk-neon-hover-lift:hover { transform: translateY(-2px); }

.cyberpunk-neon-focus { outline: 2px solid var(--cyberpunk-neon-primary, currentColor); outline-offset: 2px; }`,

  aiRules: `STYLE: Cyberpunk Neon
TYPE: Futuristic sci-fi interface

MUST USE:
- Dark background: bg-[#0a0a0f] or bg-gray-950
- Neon glow shadows: shadow-[0_0_20px_rgba(0,255,255,0.5)]
- Text glow: style={{textShadow: '0 0 10px currentColor'}}
- Glowing borders: border border-cyan-400 shadow-[0_0_10px...]
- High saturation colors: cyan-400, fuchsia-500, yellow-400
- font-mono for tech text
- uppercase tracking-wider for labels

MUST AVOID:
- Light/white backgrounds
- Low saturation colors
- Regular shadows (shadow-md)
- Warm color schemes
- Large rounded corners (rounded-2xl+)
- Soft/friendly design language

COLOR RULES:
- Primary: Cyan (#00ffff)
- Accent: Magenta (#ff00ff)
- Background: Near-black (#0a0a0f)
- Text: White with glow
- Borders: Primary color with glow

SPECIAL EFFECTS:
- Scan line overlay for tech feel
- Pulsing elements with animate-pulse
- Glow intensifies on hover

Animation & Interaction Rules:
- Unstable Neon: 发光效果可带轻微脉冲与强弱波动，但不能持续高频闪烁到影响可读性。
- Glitch Press: \`:active\` 优先使用错位平移（如 \`translate-x\` + \`-translate-y\`）与颜色反转，避免常规按钮缩放反馈。
- CRT Scanline: 大面积卡片在 hover 时提升扫描线密度或可见度，强调终端正在扫描的状态变化。
- Fast & Raw: 常规交互响应建议 \`duration-100\` 到 \`duration-150\`；仅扫描扫光可放宽到 \`duration-300\` 以内。`,

  aiRulesEn: `STYLE: Cyberpunk Neon
TYPE: Futuristic sci-fi interface

MUST USE:
- Dark background: bg-[#0a0a0f] or bg-gray-950
- Neon glow shadows: shadow-[0_0_20px_rgba(0,255,255,0.5)]
- Text glow: style={{textShadow: '0 0 10px currentColor'}}
- Glowing borders: border border-cyan-400 shadow-[0_0_10px...]
- High saturation colors: cyan-400, fuchsia-500, yellow-400
- font-mono for tech text
- uppercase tracking-wider for labels

MUST AVOID:
- Light/white backgrounds
- Low saturation colors
- Regular shadows (shadow-md)
- Warm color schemes
- Large rounded corners (rounded-2xl+)
- Soft/friendly design language

COLOR RULES:
- Primary: Cyan (#00ffff)
- Accent: Magenta (#ff00ff)
- Background: Near-black (#0a0a0f)
- Text: White with glow
- Borders: Primary color with glow

SPECIAL EFFECTS:
- Scan line overlay for tech feel
- Pulsing elements with animate-pulse
- Glow intensifies on hover

Animation & Interaction Rules:
- Unstable Neon: Glow effects may carry subtle pulsing and intensity fluctuations, but must not flicker at high frequency to the point of affecting readability.
- Glitch Press: \`:active\` should prioritize offset translation (e.g., \`translate-x\` + \`-translate-y\`) with color inversion, avoiding standard button scale feedback.
- CRT Scanline: Large cards increase scanline density or visibility on hover, emphasizing the terminal-scanning state change.
- Fast & Raw: Standard interaction response should use \`duration-100\` to \`duration-150\`; only scan sweeps may extend up to \`duration-300\`.`,

  examplePrompts: [
    {
      title: "游戏界面",
      titleEn: "Game Interface",
      description: "生成赛博朋克风格游戏 UI",
      descriptionEn: "Generate cyberpunk game interface",
      prompt: `Create a game interface using Cyberpunk Neon style:
- Dark background with scan line effect
- Neon glowing HUD elements
- Stats cards with cyan borders and glow
- Action buttons with pulse animation
- Futuristic font-mono typography
- Magenta accent for alerts/warnings`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 赛博朋克霓虹风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Cyberpunk Neon style",
      prompt: `Create a SaaS landing page using Cyberpunk Neon style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 赛博朋克霓虹风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Cyberpunk Neon style",
      prompt: `Create a portfolio showcase page using Cyberpunk Neon style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "cyberpunk-neon-warm",
      name: "赛博朋克霓虹暖色版",
      nameEn: "Cyberpunk Neon Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#36e5ff",
        secondary: "#232327",
        accent: ["#ff008b", "#86ff17", "#00ff74"],
      },
    },
    {
      id: "cyberpunk-neon-cool",
      name: "赛博朋克霓虹冷色版",
      nameEn: "Cyberpunk Neon Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#00ff93",
        secondary: "#09090e",
        accent: ["#8b1cff", "#ffd829", "#74e300"],
      },
    },
  ],
};
