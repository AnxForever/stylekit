import type { DesignStyle } from "./types";

export const broadcastGlitch: DesignStyle = {
  slug: "broadcast-glitch",
  name: "故障广播",
  nameEn: "Broadcast Glitch",
  description:
    "老电视信号的动态包装。CRT 黑底上，扫描线缓缓滚动、RGB 通道红青错位抖动、SMPTE 测试卡彩条横扫、画面偶尔像信号不良般跳帧位移。这是 90 年代电视台呼号与 VHS 故障艺术的复兴——不是合成波日落，是坏掉的信号本身在发光。",
  descriptionEn:
    "The motion packaging of a dying broadcast signal. On CRT black, scanlines crawl, RGB channels split into red-cyan jitter, SMPTE color bars sweep, and the picture occasionally jumps like bad tracking. This is the revival of 90s TV idents and VHS glitch art — not a synthwave sunset, but a broken signal itself glowing.",
  cover: "/styles/broadcast-glitch.svg",
  styleType: "visual",
  tags: ["retro", "dark-theme", "high-contrast", "texture-heavy"],
  category: "retro",
  colors: {
    primary: "#0B0B0E",
    secondary: "#EDEDED",
    accent: ["#FF2E4C", "#00E5D8", "#F5E000"],
  },
  keywords: [
    "故障艺术",
    "故障广播",
    "CRT",
    "扫描线",
    "VHS",
    "测试卡",
    "通道分离",
    "电视包装",
    "glitch",
    "retro tv",
    "motion graphics",
    "MG动画",
  ],
  keywordsEn: [
    "broadcast glitch",
    "glitch art",
    "CRT",
    "scanlines",
    "VHS",
    "test card",
    "chromatic aberration",
    "channel splitting",
    "tv ident",
    "retro broadcast",
    "motion graphics",
    "landing page",
  ],

  philosophy: `故障广播的信条：把"信号不良"当成美学。当一台老 CRT 电视信号出错时，它会漏出扫描线、把颜色错位成红青重影、让画面抽搐跳帧——这些"缺陷"恰恰是最有生命力的动态语言。它复兴的是 90 年代电视台呼号（ident）、测试卡、VHS 磁带的质感，而不是合成波那种浪漫的霓虹日落。

核心理念：
- 信号即舞台：CRT 近黑 #0B0B0E 背景，永远覆一层缓缓滚动的扫描线，画面像从阴极射线管里发出来的
- 三原信号色：故障红 #FF2E4C、CRT 青 #00E5D8、测试卡黄 #F5E000——取自电视三原色与测试卡，绝不用合成波的紫粉渐变
- 通道分离是招牌：重要文字与图形做 RGB 红青错位（chromatic aberration），并带轻微随机抖动，像信号没对齐
- 故障即动效：跳帧位移（clip + translate 的 steps 硬切）、VHS 横向撕裂、信号条横扫、开机白闪——都是"坏信号"的动作
- 硬边无圆角：这是电子信号不是柔光 UI，方角、实色、粗边、等宽字，一切都硬
- 禁止日落：绝不做 outrun/synthwave 的紫粉橙渐变与地平线网格——那是另一个风格，本风格是坏掉的广播信号

设计原则：
- 性能红线：扫描线用 CSS 渐变叠层 + transform 滚动，故障用 transform/clip-path，绝不触发重排
- 无障碍红线：prefers-reduced-motion 下关闭抖动、跳帧与闪烁（防眩晕），停在清晰的测试卡终态
- 克制红线：故障是"点睛"，不是满屏癫痫——抖动幅度小、频率低，关键时刻才撕裂一下
- 可读红线：正文层不做通道分离（只在标题/装饰上做），保证正文清晰`,

  philosophyEn: `The glitch creed: treat "signal failure" as an aesthetic. When an old CRT's signal breaks, it leaks scanlines, splits color into red-cyan ghosting, and makes the picture twitch and jump — and those "defects" are the most alive motion language there is. It revives 90s TV idents, test cards and VHS tape texture, not the romantic neon sunset of synthwave.

Core principles:
- The signal is the stage: CRT near-black #0B0B0E, always overlaid with slowly crawling scanlines, as if the picture is emitted from a cathode-ray tube
- Three primary signal colors: glitch red #FF2E4C, CRT cyan #00E5D8, test-card yellow #F5E000 — drawn from TV primaries and the test card, never synthwave's purple-pink gradients
- Channel splitting is the signature: important type and shapes get RGB red-cyan offset (chromatic aberration) with a slight random jitter, as if the signal is misaligned
- Glitch is the motion: frame jumps (clip + translate with stepped hard cuts), VHS horizontal tearing, signal-bar sweeps, power-on white flash — all the moves of a bad signal
- Hard edges, no radius: this is an electronic signal, not soft-light UI — square corners, flat color, thick rules, monospace type, everything hard
- No sunset: never the purple-pink-orange gradient and horizon grid of outrun/synthwave — that is a different style; this one is a broken broadcast signal

Design principles:
- Performance line: scanlines via CSS gradient overlay + transform scroll, glitch via transform/clip-path, never reflow
- Accessibility line: under prefers-reduced-motion disable jitter, jumps and flicker (anti-vertigo), settling on a clear test-card end-state
- Restraint line: glitch is a highlight, not a screen-wide seizure — small amplitude, low frequency, tearing only at key moments
- Legibility line: body text never gets channel splitting (only titles/decor do), keeping prose crisp`,

  doList: [
    "背景用 CRT 近黑 #0B0B0E，永远覆一层缓缓滚动的扫描线（repeating-linear-gradient + transform 滚动）",
    "只用三原信号色：故障红 #FF2E4C、CRT 青 #00E5D8、测试卡黄 #F5E000，取自电视/测试卡",
    "标题做 RGB 通道分离：红青双影 text-shadow + 轻微随机抖动，制造信号错位感",
    "故障动效用 steps() 硬切：跳帧位移、VHS 横向撕裂、信号条横扫，绝不平滑过渡",
    "硬边方角、实色平涂、粗边框、等宽/压缩粗体字，一切都硬",
    "用 SMPTE 测试卡彩条作为标志性装饰（白黄青绿品红红蓝七条）",
    "开场用 CRT 开机白闪 + 收缩（scaleY 0→1）",
    "所有故障/闪烁/抖动写 prefers-reduced-motion 关闭，停在清晰测试卡终态防眩晕",
  ],

  doListEn: [
    "CRT near-black #0B0B0E background always overlaid with slowly crawling scanlines (repeating-linear-gradient + transform scroll)",
    "Only three signal colors: glitch red #FF2E4C, CRT cyan #00E5D8, test-card yellow #F5E000, from TV/test-card",
    "Titles get RGB channel splitting: red-cyan double-shadow text-shadow + slight random jitter for signal misalignment",
    "Glitch motion uses steps() hard cuts: frame jumps, VHS horizontal tearing, signal-bar sweeps — never a smooth transition",
    "Hard square corners, flat fills, thick borders, monospace / condensed bold type — everything hard",
    "Use SMPTE color bars as the signature decoration (white yellow cyan green magenta red blue)",
    "Open with a CRT power-on white flash + collapse (scaleY 0->1)",
    "Every glitch/flicker/jitter ships a prefers-reduced-motion off-switch, settling on a clear test-card end-state (anti-vertigo)",
  ],

  dontList: [
    "禁止合成波/outrun 的紫粉橙日落渐变与地平线网格——那是另一个风格",
    "禁止圆角、柔光、柔和阴影——这是硬电子信号不是柔 UI",
    "禁止第四种颜色，禁止把三原信号色调浑或降饱和",
    "禁止满屏持续癫痫式抖动——故障是点睛，幅度小频率低",
    "禁止在正文层做通道分离（只在标题/装饰做），否则正文不可读",
    "禁止动画 top/left/width/height——扫描线/故障用 transform/clip-path",
    "禁止忽略 prefers-reduced-motion（抖动闪烁有眩晕风险）",
  ],

  dontListEn: [
    "Never the purple-pink-orange sunset gradient and horizon grid of synthwave/outrun — that is a different style",
    "Never rounded corners, soft light or gentle shadows — this is a hard electronic signal, not soft UI",
    "Never a fourth hue, never muddy or desaturate the three signal colors",
    "Never a screen-wide continuous seizure-like jitter — glitch is a highlight, small amplitude, low frequency",
    "Never channel-split the body text (titles/decor only) or prose becomes unreadable",
    "Never animate top/left/width/height — scanlines/glitch use transform/clip-path",
    "Never skip prefers-reduced-motion (jitter and flicker carry a vertigo risk)",
  ],

  components: {
    button: {
      name: "Button",
      description: "Hard signal button that glitch-shifts its channels on hover",
      code: `<button className="group relative
  px-7 py-3 rounded-none
  bg-[#FF2E4C] text-[#0B0B0E]
  font-mono font-bold uppercase tracking-[0.15em] text-sm
  border-2 border-[#EDEDED]
  transition-transform duration-100
  hover:[text-shadow:2px_0_#00E5D8,-2px_0_#F5E000]
  active:translate-y-0.5
">
  <span className="relative z-10">&#9654; Transmit</span>
</button>`,
    },
    card: {
      name: "Card",
      description: "CRT panel with a scanline overlay and a test-bar header",
      code: `<article className="relative bg-[#101014] border-2 border-[#EDEDED]/30 rounded-none overflow-hidden">
  {/* test-bar header */}
  <div className="flex h-2">
    <span className="flex-1 bg-[#EDEDED]" /><span className="flex-1 bg-[#F5E000]" />
    <span className="flex-1 bg-[#00E5D8]" /><span className="flex-1 bg-[#FF2E4C]" />
  </div>
  {/* scanline overlay */}
  <span className="pointer-events-none absolute inset-0 opacity-30"
    style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.6) 3px)" }} />
  <div className="relative p-6">
    <span className="block font-mono text-xs text-[#00E5D8] mb-3">CH-01 / LIVE</span>
    <h3 className="font-mono font-bold uppercase text-xl text-[#EDEDED] tracking-tight mb-2">Signal Lost</h3>
    <p className="font-mono text-sm text-[#EDEDED]/60">Please stand by. Normal service will not resume.</p>
  </div>
</article>`,
    },
    input: {
      name: "Input",
      description: "Terminal-style field with a blinking cyan caret underline",
      code: `<label className="block font-mono">
  <span className="block text-xs uppercase tracking-[0.2em] text-[#EDEDED]/60 mb-2">&gt; Input Signal</span>
  <input type="text" placeholder="type to transmit_"
    className="w-full bg-[#101014] px-3 py-3 rounded-none
      text-[#00E5D8] placeholder-[#EDEDED]/25
      border-2 border-[#EDEDED]/30 focus:outline-none focus:border-[#00E5D8]" />
</label>`,
    },
    nav: {
      name: "Navigation",
      description: "Broadcast ident nav with a live REC dot and glitching wordmark",
      code: `<nav className="sticky top-0 z-50 bg-[#0B0B0E] border-b-2 border-[#EDEDED]/20">
  <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between font-mono">
    <a href="/" className="font-bold uppercase tracking-[0.2em] text-[#EDEDED] hover:[text-shadow:2px_0_#00E5D8,-2px_0_#FF2E4C] transition-all">
      CH&#9633;NNEL
    </a>
    <span className="flex items-center gap-2 text-xs text-[#FF2E4C]">
      <span className="w-2 h-2 rounded-full bg-[#FF2E4C]" style={{ animation: "bg-flicker 1s steps(2) infinite" }} /> REC
    </span>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero",
      description: "Full CRT hero with scanlines, channel-split title and a test-card corner",
      code: `<section className="relative min-h-screen bg-[#0B0B0E] overflow-hidden flex items-center px-6">
  <style>{\`
    @keyframes bg-scan { to { transform: translateY(6px); } }
    @keyframes bg-jitter { 0%,92%,100% { transform: translate(0,0); } 94% { transform: translate(-3px,1px); } 96% { transform: translate(2px,-1px); } }
    @keyframes bg-flicker { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
    @media (prefers-reduced-motion: reduce) { .bg-scan,.bg-jitter,.bg-flicker { animation: none !important; } }
  \`}</style>
  {/* scanlines */}
  <span className="bg-scan pointer-events-none absolute inset-0 opacity-25 z-20"
    style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.7) 3px)", animation: "bg-scan 0.4s steps(3) infinite" }} />
  {/* SMPTE test bars, corner */}
  <div className="absolute top-0 right-0 flex h-40 w-56 z-10">
    {["#EDEDED","#F5E000","#00E5D8","#3DFF6E","#FF2E9A","#FF2E4C","#2E6BFF"].map((c) => <span key={c} className="flex-1" style={{ background: c }} />)}
  </div>
  <div className="relative z-30 bg-jitter" style={{ animation: "bg-jitter 4s steps(1) infinite" }}>
    <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#00E5D8] mb-4">// no signal</p>
    <h1 className="font-mono font-bold uppercase text-[clamp(3rem,12vw,9rem)] leading-[0.85] text-[#EDEDED]"
      style={{ textShadow: "3px 0 #00E5D8, -3px 0 #FF2E4C" }}>
      Please<br/>Stand By
    </h1>
  </div>
</section>`,
    },
  },

  globalCss: `/* Broadcast Glitch - a broken CRT signal, glowing */

:root {
  --bg-crt: #0B0B0E;
  --bg-panel: #101014;
  --bg-phosphor: #EDEDED;
  --bg-red: #FF2E4C;
  --bg-cyan: #00E5D8;
  --bg-yellow: #F5E000;
}

/* Scanline crawl */
@keyframes bg-scan { to { transform: translateY(6px); } }

/* Signal jitter: mostly still, occasional glitch jump (steps, hard cut) */
@keyframes bg-jitter {
  0%, 92%, 100% { transform: translate(0, 0); }
  93% { transform: translate(-3px, 1px); }
  95% { transform: translate(2px, -1px); }
  97% { transform: translate(-1px, 0); }
}

/* Chromatic split pulse: nudge the red/cyan shadows */
@keyframes bg-split {
  0%, 100% { text-shadow: 2px 0 var(--bg-cyan), -2px 0 var(--bg-red); }
  50% { text-shadow: 3px 0 var(--bg-cyan), -3px 0 var(--bg-red); }
}

/* Flicker: phosphor instability */
@keyframes bg-flicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }

/* Power-on: CRT collapse open */
@keyframes bg-poweron { from { transform: scaleY(0.02); opacity: 0.2; } to { transform: scaleY(1); opacity: 1; } }

.bg-scanlines {
  background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.7) 3px);
}
.bg-scan { animation: bg-scan 0.4s steps(3) infinite; }
.bg-jitter { animation: bg-jitter 4s steps(1) infinite; }
.bg-split { animation: bg-split 2s steps(2) infinite; }
.bg-flicker { animation: bg-flicker 1.2s steps(2) infinite; }
.bg-poweron { animation: bg-poweron 0.5s steps(4) both; }

@media (prefers-reduced-motion: reduce) {
  .bg-scan, .bg-jitter, .bg-split, .bg-flicker, .bg-poweron { animation: none !important; transform: none; opacity: 1; }
}`,

  aiRules: `# 故障广播（Broadcast Glitch）设计系统

你是一个专精故障广播（Broadcast Glitch）风格的前端开发专家，生成的所有代码都必须严格遵循以下规范。

## 风格身份
- **名称**：Broadcast Glitch（故障广播 / Retro TV）
- **本质**：把老 CRT 电视的"信号不良"当成动态美学——扫描线、通道分离、跳帧、测试卡
- **气质**：怀旧、粗粝、电子、90 年代电视台呼号与 VHS 故障艺术
- **灵感来源**：SMPTE 测试卡、MTV/电视台 ident、VHS 磁带故障、datamosh

> 重要区分：这不是 synthwave / outrun。绝不用紫粉橙日落渐变与地平线网格。本风格是"坏掉的广播信号"，黑底、实色、硬边、扫描线。

---

## 绝对禁止

| 模式 | 原因 |
|---------|--------|
| 紫粉橙日落渐变 / 地平线网格 | 那是 synthwave/outrun，另一个风格；本风格是坏信号 |
| 圆角 / 柔光 / 柔和阴影 | 硬电子信号，不是柔 UI；一切方角实色 |
| 第四种颜色 / 调浑三原信号色 | 只有故障红/CRT 青/测试卡黄，取自电视三原色 |
| 满屏持续癫痫抖动 | 故障是点睛，幅度小频率低，关键时刻才撕裂 |
| 正文层做通道分离 | 正文必须可读；分离只用于标题/装饰 |
| 动画 top/left/width/height | 触发重排；扫描线/故障用 transform/clip-path |
| 缺少 prefers-reduced-motion 降级 | 抖动闪烁有眩晕风险，无障碍没有商量余地 |

## 必须遵守

### 信号舞台
- 背景 CRT 近黑 #0B0B0E，面板 #101014，永远覆一层滚动扫描线
- 文字荧光白 #EDEDED，等宽/压缩粗体
- 三原信号色：故障红 #FF2E4C、CRT 青 #00E5D8、测试卡黄 #F5E000

### 扫描线（永远在场）
\`\`\`css
.bg-scanlines { background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.7) 3px); }
@keyframes bg-scan { to { transform: translateY(6px); } }
.bg-scan { animation: bg-scan 0.4s steps(3) infinite; }
\`\`\`
用一个 pointer-events-none 的绝对定位叠层覆盖全屏。

### 通道分离（招牌）
\`\`\`css
/* 标题红青双影 */
h1 { text-shadow: 3px 0 #00E5D8, -3px 0 #FF2E4C; }
@keyframes bg-split { 0%,100% { text-shadow: 2px 0 #00E5D8, -2px 0 #FF2E4C; } 50% { text-shadow: 3px 0 #00E5D8, -3px 0 #FF2E4C; } }
\`\`\`
只用于标题与装饰，正文保持单色清晰。

### 故障跳帧（steps 硬切）
\`\`\`css
@keyframes bg-jitter { 0%,92%,100% { transform: translate(0,0); } 93% { transform: translate(-3px,1px); } 95% { transform: translate(2px,-1px); } }
.bg-jitter { animation: bg-jitter 4s steps(1) infinite; }
\`\`\`
大部分时间静止，偶尔跳一下——不是持续抖。

### SMPTE 测试卡彩条
七条等宽：白 #EDEDED / 黄 #F5E000 / 青 #00E5D8 / 绿 #3DFF6E / 品红 #FF2E9A / 红 #FF2E4C / 蓝 #2E6BFF。用作角落装饰或分隔条。

### CRT 开机
\`\`\`css
@keyframes bg-poweron { from { transform: scaleY(0.02); opacity: 0.2; } to { transform: scaleY(1); opacity: 1; } }
\`\`\`

### 字体
标题/正文用等宽或压缩粗体（ui-monospace / "Azeret Mono" / "Unbounded" 一类），大写、tracking 拉开，硬朗电子感。

### 节奏
- 扫描线滚动 0.4s steps(3) 常驻；跳帧 4s 一次；分离脉动 2s；闪烁 1.2s
- 一切用 steps()，硬切不平滑

### 无障碍
\`\`\`css
@media (prefers-reduced-motion: reduce) {
  .bg-scan, .bg-jitter, .bg-split, .bg-flicker, .bg-poweron { animation: none !important; }
}
\`\`\`
关闭所有抖动闪烁，停在清晰测试卡终态。

## 自检清单

- [ ] CRT 黑底 + 常驻滚动扫描线
- [ ] 只有故障红/CRT 青/测试卡黄三色，无紫粉日落渐变
- [ ] 标题有 RGB 通道分离，正文单色可读
- [ ] 故障是偶发跳帧（steps 硬切），不是满屏持续抖
- [ ] 有 SMPTE 测试卡彩条元素
- [ ] 参与动画的只有 transform/opacity/clip-path
- [ ] 存在 prefers-reduced-motion 降级（防眩晕）`,

  aiRulesEn: `# Broadcast Glitch Design System

You are an expert frontend developer specializing in the broadcast glitch style. Generate all code strictly following these specifications.

## Style Identity
- **Name**: Broadcast Glitch (Retro TV)
- **Essence**: treat an old CRT's "signal failure" as motion aesthetic — scanlines, channel splitting, frame jumps, test cards
- **Mood**: nostalgic, gritty, electronic; 90s TV idents and VHS glitch art
- **Inspiration**: SMPTE color bars, MTV/channel idents, VHS tape glitch, datamosh

> Important distinction: this is NOT synthwave / outrun. Never use the purple-pink-orange sunset gradient or horizon grid. This style is a "broken broadcast signal" — black ground, flat color, hard edges, scanlines.

---

## Forbidden

| Pattern | Reason |
|---------|--------|
| Purple-pink-orange sunset gradient / horizon grid | That is synthwave/outrun, a different style; this one is a bad signal |
| Rounded corners / soft light / gentle shadows | Hard electronic signal, not soft UI; square corners, flat color |
| A fourth hue / muddying the three signal colors | Only glitch red / CRT cyan / test-card yellow, from TV primaries |
| Screen-wide continuous seizure jitter | Glitch is a highlight — small amplitude, low frequency, tear only at key moments |
| Channel-splitting the body text | Prose must stay readable; split titles/decor only |
| Animating top/left/width/height | Layout thrash; scanlines/glitch use transform/clip-path |
| Missing prefers-reduced-motion fallback | Jitter and flicker carry a vertigo risk; non-negotiable |

## Required

### Signal Stage
- CRT near-black #0B0B0E background, panel #101014, always overlaid with crawling scanlines
- Phosphor-white #EDEDED text, monospace / condensed bold
- Three signal colors: glitch red #FF2E4C, CRT cyan #00E5D8, test-card yellow #F5E000

### Scanlines (always present)
\`\`\`css
.bg-scanlines { background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.7) 3px); }
@keyframes bg-scan { to { transform: translateY(6px); } }
.bg-scan { animation: bg-scan 0.4s steps(3) infinite; }
\`\`\`
Use a pointer-events-none absolutely-positioned overlay over the whole screen.

### Channel Splitting (signature)
\`\`\`css
h1 { text-shadow: 3px 0 #00E5D8, -3px 0 #FF2E4C; }
@keyframes bg-split { 0%,100% { text-shadow: 2px 0 #00E5D8, -2px 0 #FF2E4C; } 50% { text-shadow: 3px 0 #00E5D8, -3px 0 #FF2E4C; } }
\`\`\`
Titles and decor only; body stays single-color and crisp.

### Glitch Frame Jump (stepped hard cut)
\`\`\`css
@keyframes bg-jitter { 0%,92%,100% { transform: translate(0,0); } 93% { transform: translate(-3px,1px); } 95% { transform: translate(2px,-1px); } }
.bg-jitter { animation: bg-jitter 4s steps(1) infinite; }
\`\`\`
Still most of the time, an occasional jump — not a continuous shake.

### SMPTE Color Bars
Seven equal bars: white #EDEDED / yellow #F5E000 / cyan #00E5D8 / green #3DFF6E / magenta #FF2E9A / red #FF2E4C / blue #2E6BFF. Use as corner decoration or divider strip.

### CRT Power-On
\`\`\`css
@keyframes bg-poweron { from { transform: scaleY(0.02); opacity: 0.2; } to { transform: scaleY(1); opacity: 1; } }
\`\`\`

### Typography
Titles/body in monospace or condensed bold (ui-monospace / "Azeret Mono" / "Unbounded" family), uppercase, wide tracking, hard electronic feel.

### Rhythm
- Scanline crawl 0.4s steps(3) always on; frame jump once per ~4s; split pulse 2s; flicker 1.2s
- Everything uses steps() — hard cut, never smooth

### Reduced Motion
\`\`\`css
@media (prefers-reduced-motion: reduce) {
  .bg-scan, .bg-jitter, .bg-split, .bg-flicker, .bg-poweron { animation: none !important; }
}
\`\`\`
Disable all jitter and flicker, settle on a clear test-card end-state.

## Self-Verification Checklist

- [ ] CRT black ground + always-on crawling scanlines
- [ ] Only glitch red / CRT cyan / test-card yellow, no sunset gradient
- [ ] Titles have RGB channel splitting, body single-color and readable
- [ ] Glitch is an occasional frame jump (stepped hard cut), not a screen-wide shake
- [ ] A SMPTE color-bars element is present
- [ ] Only transform/opacity/clip-path animate
- [ ] prefers-reduced-motion fallback present (anti-vertigo)`,

  examplePrompts: [
    {
      title: "故障广播落地页",
      titleEn: "Broadcast Glitch Landing Page",
      description: "带扫描线、通道分离和测试卡的 CRT 故障落地页",
      descriptionEn: "A CRT glitch landing page with scanlines, channel splitting and test cards",
      prompt: `Create a broadcast glitch landing page with:
1. Stage: #0B0B0E CRT black, #EDEDED phosphor text, three signals #FF2E4C / #00E5D8 / #F5E000 only — NO synthwave sunset gradient
2. A full-screen pointer-events-none scanline overlay (repeating-linear-gradient 2px) crawling with transform translateY steps(3)
3. Hero title in monospace uppercase with RGB channel split (text-shadow 3px 0 #00E5D8, -3px 0 #FF2E4C), wrapped in a bg-jitter element that jumps once every ~4s (steps)
4. A SMPTE color-bars strip (white/yellow/cyan/green/magenta/red/blue) in a corner
5. A "REC" dot flickering with steps(2); a power-on scaleY collapse on load
6. Hard square corners, flat fills, thick borders throughout
7. All motion transform/opacity/clip-path only; everything steps() hard-cut; prefers-reduced-motion disables jitter/flicker and settles on a clean test-card`,
      promptEn: `Create a broadcast glitch landing page with:
1. Stage: #0B0B0E CRT black, #EDEDED phosphor text, three signals #FF2E4C / #00E5D8 / #F5E000 only — NO synthwave sunset gradient
2. A full-screen pointer-events-none scanline overlay (repeating-linear-gradient 2px) crawling with transform translateY steps(3)
3. Hero title in monospace uppercase with RGB channel split (text-shadow 3px 0 #00E5D8, -3px 0 #FF2E4C), wrapped in a bg-jitter element that jumps once every ~4s (steps)
4. A SMPTE color-bars strip (white/yellow/cyan/green/magenta/red/blue) in a corner
5. A "REC" dot flickering with steps(2); a power-on scaleY collapse on load
6. Hard square corners, flat fills, thick borders throughout
7. All motion transform/opacity/clip-path only; everything steps() hard-cut; prefers-reduced-motion disables jitter/flicker and settles on a clean test-card`,
    },
    {
      title: "测试卡待机屏",
      titleEn: "Test-Card Standby Screen",
      description: "电视台呼号式的待机 / 404 屏",
      descriptionEn: "A TV-ident style standby / 404 screen",
      prompt: `Create a broadcast glitch standby screen with:
1. CRT black #0B0B0E with always-on crawling scanlines
2. Centered monospace "PLEASE STAND BY" with channel-split shadow and a slow split pulse
3. Full SMPTE color bars across the bottom third
4. A small "CH 01 / NO SIGNAL" mono label in cyan, flickering occasionally
5. Occasional VHS horizontal tear (a thin clipped band translateX jump, steps)
6. transform/opacity/clip-path only; full prefers-reduced-motion fallback that stops jitter and shows a static test card`,
      promptEn: `Create a broadcast glitch standby screen with:
1. CRT black #0B0B0E with always-on crawling scanlines
2. Centered monospace "PLEASE STAND BY" with channel-split shadow and a slow split pulse
3. Full SMPTE color bars across the bottom third
4. A small "CH 01 / NO SIGNAL" mono label in cyan, flickering occasionally
5. Occasional VHS horizontal tear (a thin clipped band translateX jump, steps)
6. transform/opacity/clip-path only; full prefers-reduced-motion fallback that stops jitter and shows a static test card`,
    },
  ],

  variants: [
    {
      id: "broadcast-glitch-greenscreen",
      name: "故障广播·绿屏",
      nameEn: "Glitch Greenscreen",
      description: "A monochrome phosphor-green terminal variant, single-channel CRT",
      colors: {
        primary: "#020A02",
        secondary: "#39FF6E",
        accent: ["#39FF6E", "#EDEDED", "#F5E000"],
      },
    },
    {
      id: "broadcast-glitch-testcard",
      name: "故障广播·测试卡",
      nameEn: "Glitch Test-Card",
      description: "Leans fully into the test card with cyan and yellow leading on a lighter grey signal",
      colors: {
        primary: "#14141A",
        secondary: "#EDEDED",
        accent: ["#00E5D8", "#F5E000", "#FF2E4C"],
      },
    },
  ],
};
