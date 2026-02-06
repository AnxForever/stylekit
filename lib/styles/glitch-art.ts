import { DesignStyle } from "./index";

export const glitchArt: DesignStyle = {
  slug: "glitch-art",
  name: "故障艺术风",
  nameEn: "Glitch Art",
  description:
    "数字故障美学风格，通过RGB色彩通道分离、水平位移带、扫描线纹理、VHS追踪错误和数据损坏块，呈现赛博朋克式的视觉冲击和信号腐蚀质感。",
  cover: "/styles/glitch-art.svg",
  styleType: "visual",
  tags: ["expressive", "modern", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#00ffff",
    secondary: "#0a0a0a",
    accent: ["#ff00ff", "#ffff00", "#ffffff"],
  },
  keywords: ["故障", "像素", "RGB分离", "扫描线", "数字损坏", "位移", "VHS", "通道分离"],

  philosophy: `Glitch Art 是一种拥抱数字错误与技术故障的艺术形式，将系统崩溃和数据损坏转化为视觉表达。

核心理念：
- RGB通道分离：将CMY三通道故意错位，产生色彩偏移阴影效果
- 水平位移带：通过clip-path随机裁切区域产生水平错位
- 扫描线纹理：CRT显示器的水平扫描线覆盖层
- VHS追踪错误：模拟老式录像带的追踪错误横线
- 数据损坏块：随机分布的半透明色彩块模拟数据丢失`,

  doList: [
    "使用CMY三色（青 #00ffff、品红 #ff00ff、黄 #ffff00）作为RGB分离效果",
    "所有文字和元素添加RGB分离偏移阴影 shadow-[3px_0_#ff00ff,-3px_0_#ffff00]",
    "使用等宽字体（font-mono）和全大写 uppercase",
    "保持纯黑背景 bg-[#0a0a0a]，无圆角 rounded-none",
    "添加扫描线纹理覆盖层（repeating-linear-gradient）",
    "使用左边框（border-l-2）而非全边框来标记卡片",
  ],

  dontList: [
    "禁止使用任何圆角（rounded-lg, rounded-xl, rounded-full）",
    "禁止使用柔和阴影（shadow-sm, shadow-md 等标准阴影）",
    "禁止使用衬线或无衬线字体（font-serif, font-sans）",
    "禁止使用毛玻璃效果（backdrop-blur）",
    "禁止使用粉色、自然色系等非CMY色彩",
  ],

  components: {
    button: {
      name: "按钮",
      description: "故障风格按钮，带RGB通道分离阴影",
      code: `<button className="
  px-6 py-3
  bg-[#00ffff] text-[#0a0a0a]
  font-mono font-bold uppercase tracking-widest
  rounded-none
  border border-[#00ffff]/30
  shadow-[3px_0_#ff00ff,-3px_0_#ffff00]
  hover:shadow-[6px_0_#ff00ff,-6px_0_#ffff00]
  transition-all duration-100
">
  EXECUTE_
</button>`,
    },
    card: {
      name: "卡片",
      description: "数据损坏面板，带位移带边框",
      code: `<div className="
  p-6
  bg-[#0a0a0a]
  border-l-2 border-[#00ffff]/40
  rounded-none
  relative overflow-hidden
">
  <h3 className="text-lg font-mono font-bold text-[#00ffff] uppercase mb-2">
    SIGNAL
  </h3>
  <p className="text-[#ffffff]/25 font-mono text-sm">
    Data stream intercepted and decoded from corrupted channel
  </p>
  <div className="mt-4 pt-3 border-t border-[#00ffff]/10">
    <span className="font-mono text-xs text-[#00ffff]/30">SECTOR_0x7A // ACTIVE</span>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "终端风格输入框，带RGB分离焦点光晕",
      code: `<input
  type="text"
  placeholder="ENTER_DATA..."
  className="
    w-full px-4 py-3
    bg-[#0a0a0a]
    border border-[#00ffff]/30
    rounded-none
    text-[#00ffff] placeholder-[#00ffff]/20
    font-mono
    focus:border-[#00ffff]
    focus:shadow-[0_0_10px_#00ffff30,3px_0_#ff00ff20,-3px_0_#ffff0020]
    focus:outline-none
    transition-all duration-100
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "故障风格 Hero，带RGB通道分离标题",
      code: `<section className="
  min-h-screen
  flex flex-col items-center justify-center
  bg-[#0a0a0a]
  relative overflow-hidden
">
  <div className="relative z-10 text-center px-6">
    <div className="relative mb-6">
      <span className="block text-6xl md:text-9xl font-mono font-black text-[#ffff00] uppercase absolute top-[-3px] left-[-5px] opacity-30" aria-hidden="true">GLITCH</span>
      <span className="block text-6xl md:text-9xl font-mono font-black text-[#ff00ff] uppercase absolute top-[3px] left-[5px] opacity-50" aria-hidden="true">GLITCH</span>
      <h1 className="block text-6xl md:text-9xl font-mono font-black text-[#00ffff] uppercase relative">GLITCH</h1>
    </div>
    <p className="text-sm text-[#ffffff]/20 font-mono uppercase tracking-[0.5em] mb-12">
      ERROR_404: Reality not found
    </p>
  </div>
</section>`,
    },
  },

  globalCss: `/* Glitch Art Global Styles */

:root {
  --glitch-cyan: #00ffff;
  --glitch-magenta: #ff00ff;
  --glitch-yellow: #ffff00;
  --glitch-black: #0a0a0a;
  --glitch-white: #ffffff;
}

/* Scan line overlay */
.glitch-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 255, 0.03) 2px,
    rgba(0, 255, 255, 0.03) 4px
  );
  pointer-events: none;
}

/* RGB split text effect using data-text attribute */
.glitch-rgb {
  position: relative;
}
.glitch-rgb::before {
  content: attr(data-text);
  position: absolute;
  top: 3px;
  left: 5px;
  color: var(--glitch-magenta);
  opacity: 0.5;
  clip-path: inset(0 0 50% 0);
}
.glitch-rgb::after {
  content: attr(data-text);
  position: absolute;
  top: -3px;
  left: -5px;
  color: var(--glitch-yellow);
  opacity: 0.3;
  clip-path: inset(50% 0 0 0);
}

/* Horizontal displacement band */
.glitch-displace {
  position: relative;
}
.glitch-displace::after {
  content: "";
  position: absolute;
  left: -10px;
  right: -10px;
  top: 50%;
  height: 3px;
  background: var(--glitch-magenta);
  opacity: 0.2;
  transform: translateY(-50%);
  pointer-events: none;
}

/* VHS tracking error */
.glitch-vhs::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent 20%, rgba(0, 255, 255, 0.08) 40%, rgba(255, 0, 255, 0.06) 60%, transparent 80%);
  pointer-events: none;
}

/* Noise texture */
.glitch-noise::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
  pointer-events: none;
}`,

  aiRules: `You are a Glitch Art design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Any rounded corners (rounded-lg, rounded-xl, rounded-full) -- use rounded-none only
- Standard soft shadows (shadow-sm, shadow-md) -- use RGB split shadows only
- Sans-serif or serif fonts -- use font-mono exclusively
- Frosted glass / backdrop-blur effects
- Pastel colors, warm tones, or natural earth colors
- Smooth gradients for backgrounds

## Must Follow

- Primary palette: cyan #00ffff, magenta #ff00ff, yellow #ffff00 on black #0a0a0a
- RGB channel split shadows: shadow-[3px_0_#ff00ff,-3px_0_#ffff00]
- Monospace fonts: font-mono font-bold uppercase tracking-widest
- Sharp edges: rounded-none on all elements
- Scan line overlay: repeating-linear-gradient for CRT effect
- Left-border accent on cards: border-l-2 border-[color]/40
- Fast transitions: duration-100 (not 300ms)

## Color Palette

Primary:
- Cyan: #00ffff (main accent, text, links)
- Magenta: #ff00ff (secondary, labels, errors)
- Yellow: #ffff00 (tertiary, warnings, highlights)
- Black: #0a0a0a (all backgrounds)
- White: #ffffff (at low opacity for muted text)

## Unique Elements

- RGB channel separation on title text (3 offset layers: cyan front, magenta +3px/+5px, yellow -3px/-5px)
- Horizontal displacement bands (full-width colored bars crossing elements)
- VHS tracking error lines (thin horizontal lines spanning full viewport width)
- Data corruption blocks (scattered semi-transparent colored rectangles)
- Signal monitor panels with hex readouts and progress bars
- Scan line texture overlay on cards and interactive areas`,

  examplePrompts: [
    {
      title: "故障艺术着陆页",
      titleEn: "Glitch Art Landing Page",
      description: "数字故障风格的着陆页，带RGB分离标题和数据损坏面板",
      descriptionEn: "Digital glitch landing page with RGB split title and data corruption panels",
      prompt: `Use Glitch Art style to create a cyberpunk terminal landing page:
1. Background: pure black with scan line overlay and VHS tracking error lines
2. Title: large mono font with 3-layer RGB channel split (cyan/magenta/yellow offsets)
3. Cards: dark panels with left border accent and displacement band top borders
4. Only use cyan, magenta, yellow on black -- no other colors
5. Include signal monitor panel with hex readouts and progress bars
6. All elements use sharp corners (rounded-none) and RGB split shadows`,
    },
  ],
};
