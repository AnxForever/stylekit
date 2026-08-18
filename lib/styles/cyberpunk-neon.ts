import type { DesignStyle } from "./types";
import { cyberpunkNeonAtoms } from "./atoms";

export const cyberpunkNeon: DesignStyle = {
  atoms: cyberpunkNeonAtoms,
  slug: "cyberpunk-neon",
  name: "赛博朋克霓虹",
  nameEn: "Cyberpunk Neon",
  description:
    "未来感十足的赛博朋克风格，霓虹发光效果、深色背景、高科技感的 UI 元素。适合游戏、科技产品、创意工作室。",
  descriptionEn:
    "A futuristic cyberpunk style with neon glow effects, dark backgrounds, and high-tech UI elements. Ideal for games, tech products, and creative studios.",
  cover: "/styles/cyberpunk-neon.svg",
  styleType: "visual",
  tags: ["high-contrast"],
  category: "expressive",
  colors: {
    primary: "#00ffff",
    secondary: "#0a0a0f",
    accent: ["#ff00ff", "#ffff00", "#00ff00", "#ff0506"],
  },
  keywords: ["赛博朋克", "霓虹", "未来", "发光", "游戏", "科技", "expressive", "bold", "vibrant", "表现力"],
  keywordsEn: ["cyberpunk", "neon glow", "cyberpunk ui", "futuristic interface", "sci-fi", "game ui", "dark background", "high contrast", "glowing buttons", "tech landing page", "night city aesthetic"],

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

  aiRules: `风格：Cyberpunk Neon
类型：未来感科幻界面

必须使用：
- 深色背景：bg-[#0a0a0f] 或 bg-gray-950
- 霓虹发光阴影：shadow-[0_0_20px_rgba(0,255,255,0.5)]
- 文字发光：style={{textShadow: '0 0 10px currentColor'}}
- 发光边框：border border-cyan-400 shadow-[0_0_10px...]
- 高饱和度颜色：cyan-400、fuchsia-500、yellow-400
- 科技感文字使用 font-mono
- 标签使用 uppercase tracking-wider

必须避免：
- 浅色/白色背景
- 低饱和度颜色
- 普通阴影（shadow-md）
- 暖色调配色
- 过大的圆角（rounded-2xl 及以上）
- 柔和/亲和的设计语言

配色规则：
- 主色：青色 (#00ffff)
- 强调色：品红 (#ff00ff)
- 背景：近黑色 (#0a0a0f)
- 文字：带发光效果的白色
- 边框：主色调发光

特殊效果：
- 扫描线叠加层，营造科技感
- 使用 animate-pulse 制造脉冲元素
- hover 时发光增强

---

## 动效规则

### 交互物理
- **Unstable Neon**：发光效果可以带有轻微脉冲，谨慎使用 \`animate-pulse\`。禁止高频闪烁影响可读性。
- **Glitch Press**：active 状态使用偏移位移 + 颜色反转，而不是缩放。例如：\`active:translate-x-[2px] active:-translate-y-[1px] active:text-fuchsia-400\`
- **CRT Scanline**：卡片在 hover 时提升扫描线密度/可见度，模拟终端扫描效果。
- **Fast & Raw**：常规交互使用 \`duration-100\` 到 \`duration-150\`；只有扫光效果可以放宽到 \`duration-300\`。

### 时长参考
| 交互 | 时长 | 缓动 |
|-------------|----------|--------|
| 按钮 hover | 100-150ms | ease-out |
| 发光脉冲 | 2-3s | ease-in-out（循环） |
| 扫光 | 150-300ms | ease-out |
| Glitch Press | 瞬间 | — |

---

## 排版

| 元素 | 类名 |
|---------|---------|
| 标题 | font-mono font-bold uppercase tracking-[0.2em] |
| 标签 | text-xs font-mono uppercase tracking-wider |
| 正文 | font-mono text-sm |
| 代码/数据 | font-mono tabular-nums |

---

## 禁止使用的模式

| 模式 | 原因 |
|---------|--------|
| 浅色/白色背景 | 破坏霓虹的可见度 |
| 低饱和度颜色 | 失去赛博朋克的强度感 |
| shadow-md, shadow-lg | 不使用模糊阴影——只用发光 |
| 暖色调配色 | 与冷峻科技美学相悖 |
| rounded-2xl, rounded-3xl | 过于柔和，缺乏科技感 |
| 柔和/亲和的语言 | 破坏沉浸感 |
| active 状态使用 scale 变换 | 应改用 glitch 偏移 |

---

## 自检清单

输出代码前请逐项确认：
- [ ] 背景是近黑色（#0a0a0f 或 bg-gray-950）
- [ ] 霓虹发光使用 shadow-[0_0_Xpx_rgba(...)] 格式
- [ ] 文字在合适的地方带有 textShadow 发光效果
- [ ] 仅使用高饱和度颜色（青、品红、黄、绿）
- [ ] 所有文字元素都使用 font-mono
- [ ] Active 状态使用 glitch 偏移，而不是 scale
- [ ] 圆角是 rounded-sm 或 rounded-none
- [ ] 过渡要快：duration-100 到 duration-150`,

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

---

## Animation Rules

### Interaction Physics
- **Unstable Neon**: Glow effects may pulse subtly. Use \`animate-pulse\` sparingly. NO high-frequency flickering that hurts readability.
- **Glitch Press**: Active state uses OFFSET translation + color inversion, NOT scale. Example: \`active:translate-x-[2px] active:-translate-y-[1px] active:text-fuchsia-400\`
- **CRT Scanline**: Cards increase scanline density/visibility on hover, simulating terminal scanning.
- **Fast & Raw**: Standard interactions use \`duration-100\` to \`duration-150\`. Only scan sweeps may use up to \`duration-300\`.

### Timing Guidelines
| Interaction | Duration | Easing |
|-------------|----------|--------|
| Button hover | 100-150ms | ease-out |
| Glow pulse | 2-3s | ease-in-out (loop) |
| Scan sweep | 150-300ms | ease-out |
| Glitch press | instant | — |

---

## Typography

| Element | Classes |
|---------|---------|
| Headers | font-mono font-bold uppercase tracking-[0.2em] |
| Labels | text-xs font-mono uppercase tracking-wider |
| Body | font-mono text-sm |
| Code/Data | font-mono tabular-nums |

---

## Forbidden Patterns

| Pattern | Reason |
|---------|--------|
| Light/white backgrounds | Destroys neon visibility |
| Low saturation colors | Loses cyberpunk intensity |
| shadow-md, shadow-lg | No blur shadows — only glow |
| Warm color schemes | Contradicts cold tech aesthetic |
| rounded-2xl, rounded-3xl | Too soft, not technical enough |
| Soft/friendly language | Breaks immersion |
| scale transforms on active | Use glitch offset instead |

---

## Self-Verification Checklist

Before outputting code, verify:
- [ ] Background is near-black (#0a0a0f or bg-gray-950)
- [ ] Neon glows use shadow-[0_0_Xpx_rgba(...)] format
- [ ] Text has textShadow glow effect where appropriate
- [ ] High saturation colors only (cyan, magenta, yellow, green)
- [ ] font-mono for all text elements
- [ ] Active states use glitch offset, NOT scale
- [ ] Rounded corners are rounded-sm or rounded-none
- [ ] Transitions are fast: duration-100 to duration-150`,

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
