import { DesignStyle } from "./index";

export const sciFiHud: DesignStyle = {
  slug: "sci-fi-hud",
  name: "科幻HUD",
  nameEn: "Sci-Fi HUD",
  description:
    "源自星际飞船驾驶舱和战术指挥中心的全息显示界面。深空背景、青色发光边框、半透明玻璃面板、雷达扫描动效，营造'正在操作高科技设备'的沉浸体验。",
  cover: "/styles/sci-fi-hud.svg",
  styleType: "visual",
  tags: ["expressive", "modern", "high-contrast"],
  category: "modern",
  colors: {
    primary: "#06B6D4",
    secondary: "#020617",
    accent: ["#0EA5E9", "#22D3EE", "#22C55E"],
  },
  keywords: ["科幻", "HUD", "全息", "雷达", "指挥中心", "太空", "发光边框", "数据流"],

  philosophy: `Sci-Fi HUD 风格源自电影、游戏中的未来科技界面，核心在于"信息即界面"。

设计原则：
- 深空背景：极深的蓝灰色背景模拟太空指挥室
- 发光几何：所有元素使用青色/蓝绿色发光边框，创造全息投影感
- 信息密集：通过分层和模块化保持大量实时数据的可读性
- 实时动态：雷达扫描、数据流滚动、状态脉冲传递"系统运行中"的感觉
- 半透明材质：面板使用玻璃态效果 + 模糊背景`,

  doList: [
    "背景使用深空色 bg-[#020617] 或 bg-slate-950",
    "面板使用半透明 bg-slate-900/85 backdrop-blur-xl",
    "边框使用发光效果 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.5)]",
    "文字使用冷色调 text-[#E5F2FF] 或 text-slate-300",
    "使用 font-mono uppercase tracking-wider 营造科技感",
    "角标装饰使用 L 型边框 border-t-2 border-l-2",
    "状态指示器使用发光脉冲动画",
    "进度条使用渐变填充 + 发光扫描效果",
    "交互时角标做锁定位移（收缩/外扩）以体现 Tactical Lock",
    "扫描线在 hover 时提升对比或位移，模拟数据过载",
    "active 状态使用高亮内发光反馈全息点击而非重力下沉",
  ],

  dontList: [
    "禁止使用浅色/白色背景",
    "禁止使用暖色调（橙、粉等暖色仅限警告状态）",
    "禁止使用普通阴影 shadow-md（必须是发光阴影）",
    "禁止使用衬线字体",
    "禁止使用圆润可爱的设计语言",
    "禁止大圆角 rounded-2xl+",
    "禁止面板交互只有普通阴影加深（缺少系统激活感）",
    "禁止状态灯静止不动（HUD 需持续脉冲或闪烁）",
  ],

  components: {
    button: {
      name: "HUD 按钮",
      description: "半透明发光边框按钮，悬停增强辉光",
      code: `// Primary HUD Button
<button className="group relative px-8 py-3 bg-slate-900/80 border border-cyan-500/50 text-cyan-400 rounded-sm shadow-[0_0_10px_rgba(6,182,212,0.3)] hover:bg-cyan-500/10 hover:border-cyan-300 hover:text-cyan-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.6),inset_0_0_10px_rgba(6,182,212,0.2)] active:scale-95 active:shadow-[inset_0_0_20px_rgba(255,255,255,0.6)] transition-all duration-150 ease-out overflow-hidden font-mono text-sm uppercase tracking-widest">
  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(6,182,212,0.1)_2px,rgba(6,182,212,0.1)_4px)] opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
  <span className="relative z-10">Initialize</span>
</button>

// Active HUD Button
<button className="px-6 py-3 bg-cyan-500/20 border border-cyan-300 text-cyan-300 rounded-sm shadow-[0_0_20px_rgba(6,182,212,0.5)] font-mono text-sm uppercase tracking-widest">
  System Active
</button>

// Danger HUD Button
<button className="px-6 py-3 bg-slate-900/80 border border-red-500/40 text-red-400 rounded-sm shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:border-red-400 hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all duration-150 font-mono text-sm uppercase tracking-widest">
  Override
</button>`,
    },
    card: {
      name: "HUD 面板",
      description: "半透明玻璃面板，带角标锁定和扫描线过载效果",
      code: `<div className="group relative bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-sm p-8 shadow-[0_4px_24px_rgba(0,0,0,0.6)] hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(6,182,212,0.25)] transition-all duration-200 cursor-crosshair">
  {/* L-shaped corner lock animation */}
  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:border-cyan-300 transition-all duration-150" />
  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:border-cyan-300 transition-all duration-150" />
  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500 group-hover:-translate-x-1 group-hover:translate-y-1 group-hover:border-cyan-300 transition-all duration-150" />
  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:border-cyan-300 transition-all duration-150" />

  {/* Scanline overload */}
  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(148,163,184,0.03)_2px,rgba(148,163,184,0.03)_4px)] group-hover:opacity-80 pointer-events-none rounded-sm transition-opacity duration-150" />

  <div className="relative z-10">
    <div className="flex items-center gap-3 mb-5">
      <div className="w-2 h-2 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,1)] group-hover:bg-cyan-300 group-hover:animate-pulse" />
      <h3 className="text-cyan-500 font-mono text-xs uppercase tracking-[0.2em] group-hover:text-cyan-300 transition-colors">
        System Module
      </h3>
    </div>
    <h4 className="text-white text-xl font-mono font-bold mb-3 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-200">
      Subsystem Status
    </h4>
    <p className="text-slate-400 text-sm font-mono leading-relaxed group-hover:text-slate-300 transition-colors duration-200">
      &gt; Quantum core operating at optimal efficiency.
      <br/>&gt; Awaiting command input...
    </p>
  </div>
</div>`,
    },
    input: {
      name: "HUD 输入框",
      description: "深色背景输入框，发光聚焦效果",
      code: `<div className="space-y-2">
  <label className="block text-cyan-400 font-mono text-xs uppercase tracking-widest">Access Code</label>
  <div className="relative">
    <input
      type="text"
      className="w-full px-4 py-3 bg-slate-950 border border-cyan-500/30 rounded text-[#E5F2FF] font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
      placeholder="Enter command..."
    />
    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-pulse" />
  </div>
</div>`,
    },
    nav: {
      name: "HUD 状态栏",
      description: "顶部状态栏，显示系统名称、时间和状态指示器",
      code: `<nav className="bg-[#020617]/95 backdrop-blur-sm border-b border-cyan-500/30 px-8 py-3 flex justify-between items-center">
  <div className="flex items-center gap-4">
    <div className="w-10 h-10 flex items-center justify-center text-cyan-300 font-mono font-bold text-sm bg-cyan-500/10 border-2 border-cyan-500 rounded shadow-[0_0_15px_rgba(6,182,212,0.4)]">
      HUD
    </div>
    <span className="text-[#E5F2FF] font-mono text-sm uppercase tracking-[0.15em]">Nexus Command</span>
  </div>
  <div className="flex items-center gap-6">
    <span className="text-cyan-400 font-mono text-sm bg-cyan-500/10 border border-cyan-500/30 rounded px-3 py-1">12:34:56 UTC</span>
    <div className="flex items-center gap-2">
      <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse" />
      <span className="text-slate-400 font-mono text-xs uppercase tracking-wider">Online</span>
    </div>
  </div>
</nav>`,
    },
  },

  globalCss: `/* Sci-Fi HUD Global Styles */
@layer base {
  body {
    background-color: #020617;
    color: #E5F2FF;
  }

  ::selection {
    background-color: rgba(6, 182, 212, 0.4);
    color: #E5F2FF;
  }
}

@keyframes hud-radar-sweep {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes hud-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.2); }
}

@keyframes hud-data-slide {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes hud-bar-shine {
  from { left: -100%; }
  to { left: 100%; }
}`,

  aiRules: `STYLE: Sci-Fi HUD
TYPE: Futuristic command center interface

MUST USE:
- Deep space background: bg-[#020617] or bg-slate-950
- Semi-transparent panels: bg-slate-900/85 backdrop-blur-xl
- Cyan glow borders: border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.5)]
- L-shaped corner decorations on important panels
- font-mono uppercase tracking-wider for labels
- Status indicators with pulse animation
- Scanline overlays for tech atmosphere
- Progress bars with gradient fill and glow

MUST AVOID:
- Light/white backgrounds
- Warm color schemes (except for warning/danger status)
- Regular shadows (shadow-md, shadow-lg)
- Serif fonts
- Cute/rounded design language
- Large border-radius (rounded-2xl+)

COLOR SYSTEM:
- Background: #020617 (deep navy)
- Panel: rgba(15, 23, 42, 0.85) (translucent slate)
- Primary accent: #06B6D4 (cyan)
- Secondary accent: #0EA5E9 (bright blue)
- Highlight: #22D3EE (neon cyan)
- Success: #22C55E (green)
- Warning: #F97316 (orange)
- Danger: #EF4444 (red)
- Text primary: #E5F2FF
- Text secondary: #94A3B8

SPECIAL EFFECTS:
- Radar sweep rotation animation (6s linear infinite)
- Status pulse glow (2s ease-in-out)
- Data line slide-in animation
- Progress bar shine sweep
- Scanline repeating gradient overlay

## Animation & Interaction Rules
- Tactical Lock: hover 时四角 L 型角标需进行短促锁定位移（duration-150）。
- Data Overload: 悬停时提升扫描线可见度与发光强度，模拟数据过载。
- Holographic Pierce: active 状态优先高亮内发光反馈，不做重力式下沉。
- Terminal Blinking: 状态灯和关键提示保持脉冲或闪烁，维持系统在线感。`,

  examplePrompts: [
    {
      title: "指挥中心仪表盘",
      titleEn: "Command Center Dashboard",
      description: "包含系统状态、雷达扫描、数据流和资源指标",
      descriptionEn: "System status, radar scan, data stream, and resource metrics",
      prompt: `Create a command center dashboard using Sci-Fi HUD style:
- Deep space dark background with scanline overlay
- Top status bar with system name, time, and connection indicator
- Left panel: System status with glowing progress bars
- Right panel: Real-time data stream log with color-coded entries
- Bottom: Control buttons with hover glow effects
- L-shaped corner decorations on all major panels
- Cyan/teal color scheme with status colors`,
    },
  ],
};
