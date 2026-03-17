import { DesignStyle } from "./index";

export const voiceRecorder: DesignStyle = {
  slug: "voice-recorder",
  name: "语音录制",
  nameEn: "Voice Recorder",
  description:
    "CRT终端美学与波形可视化的融合，包含扫描线、打字机效果、矩阵绿辉光和声波动画。适合音频工具、黑客终端、复古科技项目。",
  descriptionEn:
    "A fusion of CRT terminal aesthetics and waveform visualization, featuring scanlines, typewriter effects, matrix green glow, and sound wave animations. Ideal for audio tools, hacker terminals, and retro tech projects.",
  cover: "/styles/voice-recorder.svg",
  styleType: "animation",
  tags: ["retro", "expressive", "high-contrast"],
  category: "retro",
  colors: {
    primary: "#0d1117",
    secondary: "#080b10",
    accent: ["#00ff41", "#00cc33", "#33ff66"],
  },
  keywords: [
    "voice recorder",
    "waveform",
    "CRT",
    "terminal",
    "hacker",
    "matrix",
    "scanline",
    "audio",
    "retro",
    "monospace",
  ],

  philosophy: `Voice Recorder 风格将CRT终端美学与音频波形可视化相结合。

核心理念：
- 扫描线叠加：所有内容区域使用 repeating-linear-gradient 扫描线效果
- 矩阵绿辉光：关键元素使用 #00ff41 发光效果
- 等宽字体：所有文字使用 monospace 字体，模拟终端输出
- 极暗背景：#0d1117 深色背景最大化绿色辉光对比度
- 波形动画：音频条使用 CSS 关键帧实现高度振荡
- 打字机效果：文字逐字显现，模拟终端输入

设计原则：
- 视觉一致性：所有组件遵循统一的终端视觉语言
- 层次分明：通过绿色深浅和辉光强度建立信息层级
- 交互反馈：每个可交互元素都有明确的 hover、active、focus 状态
- 响应式适配：设计在移动端、平板、桌面端保持一致体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准`,

  philosophyEn: `Voice Recorder style merges CRT terminal aesthetics with audio waveform visualization.

Core principles:
- Scanline overlay: all content areas use repeating-linear-gradient scanline effects
- Matrix green glow: key elements use #00ff41 glow effects
- Monospace fonts: all text uses monospace fonts to simulate terminal output
- Ultra-dark backgrounds: #0d1117 dark background maximizes green glow contrast
- Waveform animation: audio bars use CSS keyframes for height oscillation
- Typewriter effect: text appears character by character, simulating terminal input`,

  doList: [
    "Use scanline overlay on all content areas",
    "Apply matrix green (#00ff41) glow to key elements",
    "Use monospace fonts for all text",
    "Keep backgrounds ultra-dark (#0d1117) for maximum contrast",
    "Add waveform bar animations for audio visualization",
    "Use typewriter animation for terminal-style text reveal",
  ],

  doListEn: [
    "Use scanline overlay on all content areas",
    "Apply matrix green (#00ff41) glow to key elements",
    "Use monospace fonts for all text",
    "Keep backgrounds ultra-dark (#0d1117) for maximum contrast",
    "Add waveform bar animations for audio visualization",
    "Use typewriter animation for terminal-style text reveal",
  ],

  dontList: [
    "Don't use light or white backgrounds",
    "Don't use serif or sans-serif body fonts",
    "Don't use rounded corners larger than 2px",
    "Don't use subtle shadows - only green glows",
    "Don't use colors outside the green spectrum for primary elements",
  ],

  dontListEn: [
    "Don't use light or white backgrounds",
    "Don't use serif or sans-serif body fonts",
    "Don't use rounded corners larger than 2px",
    "Don't use subtle shadows - only green glows",
    "Don't use colors outside the green spectrum for primary elements",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Voice Recorder 终端按钮，带矩阵绿辉光和脉冲效果",
      code: `<button className="group relative px-8 py-4 bg-[#00ff41]/10 text-[#00ff41] font-mono text-sm uppercase tracking-[0.2em] border border-[#00ff41]/40 shadow-[0_0_12px_rgba(0,255,65,0.2)] hover:bg-[#00ff41] hover:text-[#0d1117] hover:shadow-[0_0_30px_rgba(0,255,65,0.6)] active:translate-y-[2px] active:shadow-[0_0_8px_rgba(0,255,65,0.4)] transition-all duration-150">
  <span className="group-hover:animate-pulse">REC</span>
</button>`,
    },
    card: {
      name: "卡片",
      description: "Voice Recorder 终端窗口卡片，带扫描线叠加",
      code: `<div className="group bg-[#0d1117] border border-[#00ff41]/20 p-6 relative overflow-hidden hover:border-[#00ff41]/50 hover:shadow-[0_0_24px_rgba(0,255,65,0.15)] hover:-translate-y-1 transition-all duration-200">
  {/* Scanline overlay */}
  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,65,0.03)_2px,rgba(0,255,65,0.03)_4px)] pointer-events-none" />

  <div className="relative">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-2 h-2 bg-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.8)] animate-pulse" />
      <span className="text-[#00ff41]/60 font-mono text-xs uppercase tracking-[0.2em]">Terminal</span>
    </div>
    <h4 className="text-[#00ff41] text-lg font-mono font-bold mb-2">
      AUDIO MODULE
    </h4>
    <p className="text-[#00ff41]/50 font-mono text-sm leading-relaxed">
      Waveform analysis and signal processing unit.
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Voice Recorder 命令行风格输入框",
      code: `<div className="space-y-2">
  <label className="block text-[#00ff41]/60 font-mono text-xs uppercase tracking-[0.2em]">Command</label>
  <div className="flex items-center bg-[#080b10] border border-[#00ff41]/30 focus-within:border-[#00ff41] focus-within:shadow-[0_0_12px_rgba(0,255,65,0.2)] transition-all duration-200">
    <span className="text-[#00ff41]/40 font-mono text-sm pl-4 select-none">$</span>
    <input
      type="text"
      className="w-full px-3 py-3 bg-transparent text-[#00ff41] font-mono text-sm placeholder:text-[#00ff41]/20 focus:outline-none"
      placeholder="enter command..."
    />
  </div>
</div>`,
    },
    nav: {
      name: "导航栏",
      description: "Voice Recorder 终端导航栏",
      code: `<nav className="bg-[#080b10]/95 border-b border-[#00ff41]/20 backdrop-blur-sm px-6 py-3 flex justify-between items-center">
  <div className="flex items-center gap-2">
    <div className="w-2 h-2 bg-[#00ff41] shadow-[0_0_8px_rgba(0,255,65,0.6)]" />
    <span className="text-[#00ff41] font-mono text-sm uppercase tracking-[0.15em]">VOICE-REC</span>
  </div>
  <div className="flex gap-6">
    <a className="text-[#00ff41] font-mono text-xs uppercase tracking-widest hover:text-[#00ff41]/70 transition-colors">Record</a>
    <a className="text-[#00ff41]/50 font-mono text-xs uppercase tracking-widest hover:text-[#00ff41] transition-colors">Analyze</a>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区域",
      description: "Voice Recorder Hero 区域，带扫描线和打字机标题",
      code: `<section className="relative bg-[#0d1117] overflow-hidden px-6 py-20">
  {/* Scanline overlay */}
  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,65,0.03)_2px,rgba(0,255,65,0.03)_4px)] pointer-events-none" />
  <div className="relative max-w-4xl mx-auto text-center">
    <h1 className="text-5xl md:text-7xl font-mono font-bold uppercase tracking-wider text-[#00ff41]" style={{textShadow: '0 0 20px rgba(0,255,65,0.5), 0 0 40px rgba(0,255,65,0.2)'}}>
      VOICE RECORDER
    </h1>
    <p className="mt-4 text-[#00ff41]/50 font-mono text-sm">
      &gt; initializing audio capture module...
    </p>
  </div>
</section>`,
    },
    footer: {
      name: "页脚",
      description: "Voice Recorder 终端页脚",
      code: `<footer className="bg-[#080b10] border-t border-[#00ff41]/15 px-6 py-6">
  <p className="text-[#00ff41]/30 font-mono text-xs text-center uppercase tracking-widest">
    SIGNAL: OK // LATENCY: 12ms // BUFFER: 1024
  </p>
</footer>`,
    },
  },

  globalCss: `/* Voice Recorder Global Styles */
@layer base {
  body {
    @apply bg-[#0d1117] text-[#00ff41] antialiased;
    background-image:
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 255, 65, 0.03) 2px,
        rgba(0, 255, 65, 0.03) 4px
      );
  }

  ::selection {
    @apply bg-[#00ff41] text-[#0d1117];
  }
}

@keyframes vr-scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
@keyframes vr-waveform {
  0%, 100% { height: 15%; }
  25% { height: 80%; }
  50% { height: 40%; }
  75% { height: 95%; }
}
@keyframes vr-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
@keyframes vr-typewriter {
  from { width: 0; }
  to { width: 100%; }
}
@keyframes vr-glow-pulse {
  0%, 100% { box-shadow: 0 0 8px rgba(0, 255, 65, 0.3); }
  50% { box-shadow: 0 0 20px rgba(0, 255, 65, 0.6); }
}

:root {
  --vr-primary: #00ff41;
  --vr-bg: #0d1117;
  --vr-bg-dark: #080b10;
  --vr-glow: rgba(0, 255, 65, 0.3);
}

.vr-card {
  position: relative;
  overflow: hidden;
}

.vr-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(0, 255, 65, 0.05), transparent);
  pointer-events: none;
}

.vr-card:hover::before {
  opacity: 1;
}

.vr-scanline-overlay {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 255, 65, 0.03) 2px,
    rgba(0, 255, 65, 0.03) 4px
  );
  pointer-events: none;
}

.vr-glow-text {
  text-shadow: 0 0 10px rgba(0, 255, 65, 0.5), 0 0 20px rgba(0, 255, 65, 0.2);
}

.vr-focus { outline: 2px solid var(--vr-primary, currentColor); outline-offset: 2px; }`,

  aiRules: `STYLE: Voice Recorder
TYPE: CRT terminal + audio waveform animation aesthetic

MUST USE:
- Background: Always ultra-dark (#0d1117 or #080b10)
- Primary accent: Matrix green (#00ff41) for all interactive elements
- All text must use monospace fonts (font-mono)
- Scanline overlay: repeating-linear-gradient on content areas
- Green glow: box-shadow/text-shadow with rgba(0,255,65,x)
- uppercase text with wide letter-spacing for labels
- Waveform bar animations for audio visualization
- Typewriter animation for text reveals

MUST AVOID:
- Light/white backgrounds
- Pastel or muted colors
- Serif or sans-serif fonts
- Large border-radius (max 2px)
- Subtle/standard shadows (use green glow only)
- Colors outside the green spectrum for primary UI

COLOR RULES:
- Primary: Matrix Green (#00ff41)
- Background: Ultra-dark (#0d1117)
- Secondary BG: Darker (#080b10)
- Muted: Green at 50% opacity
- Borders: Green at 20-40% opacity

SPECIAL EFFECTS:
- Scanline overlay via CSS repeating-linear-gradient
- Waveform bars with vr-waveform keyframe animation
- Typewriter text reveal with vr-typewriter animation
- Cursor blink with vr-blink animation
- Glow pulse with vr-glow-pulse animation
- Moving scanline with vr-scanline animation`,

  aiRulesEn: `STYLE: Voice Recorder
TYPE: CRT terminal + audio waveform animation aesthetic

MUST USE:
- Background: Always ultra-dark (#0d1117 or #080b10)
- Primary accent: Matrix green (#00ff41) for all interactive elements
- All text must use monospace fonts (font-mono)
- Scanline overlay: repeating-linear-gradient on content areas
- Green glow: box-shadow/text-shadow with rgba(0,255,65,x)
- uppercase text with wide letter-spacing for labels

MUST AVOID:
- Light/white backgrounds
- Pastel or muted colors
- Serif or sans-serif fonts
- Large border-radius (max 2px)
- Subtle/standard shadows (use green glow only)

Animation & Interaction Rules:
- Green Glow Pulse: On hover, outer glow must visibly expand with vr-glow-pulse animation.
- Terminal Response: Active state should feel like pressing a physical terminal key. Use active:translate-y-[2px].
- Waveform Bars: Audio visualization bars oscillate using vr-waveform keyframes with staggered delays.
- Instant Feedback: Terminal interactions should be snappy, use duration-100 or duration-150.`,

  examplePrompts: [
    {
      title: "音频录制面板",
      titleEn: "Audio Recording Panel",
      description: "带波形可视化和录制控制的终端面板",
      descriptionEn: "Terminal panel with waveform visualization and recording controls",
      prompt: `Create an audio recording panel using Voice Recorder style:
- Dark terminal background with scanline overlay
- Animated waveform bars in matrix green
- Record/Stop/Play buttons with green glow
- Terminal log output showing recording status
- Monospace font throughout`,
    },
    {
      title: "信号分析仪表盘",
      titleEn: "Signal Analysis Dashboard",
      description: "CRT终端风格的音频信号分析界面",
      descriptionEn: "CRT terminal-style audio signal analysis interface",
      prompt: `Build a signal analysis dashboard using Voice Recorder style:
- Ultra-dark background with green scanlines
- VU meter with animated level bars
- Frequency spectrum display
- Terminal command input
- Status indicators with green glow`,
    },
    {
      title: "语音处理工具",
      titleEn: "Voice Processing Tool",
      description: "生成语音录制风格的音频处理页面",
      descriptionEn: "Generate a voice processing page in Voice Recorder style",
      prompt: `Create a voice processing tool page using Voice Recorder style with waveform display, processing controls, terminal output, and consistent CRT terminal aesthetic.`,
    },
  ],

  variants: [
    {
      id: "voice-recorder-amber",
      name: "语音录制琥珀版",
      nameEn: "Voice Recorder Amber",
      description: "Amber-toned variant reminiscent of vintage phosphor monitors",
      colors: {
        primary: "#0d1117",
        secondary: "#0f0d08",
        accent: ["#ffb000", "#cc8800", "#ffd044"],
      },
    },
    {
      id: "voice-recorder-cyan",
      name: "语音录制青色版",
      nameEn: "Voice Recorder Cyan",
      description: "Cyan-toned variant with cool blue-green terminal aesthetic",
      colors: {
        primary: "#0a1117",
        secondary: "#080d12",
        accent: ["#00ffd5", "#00ccaa", "#33ffe0"],
      },
    },
  ],
};
