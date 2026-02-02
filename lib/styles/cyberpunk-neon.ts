import { DesignStyle } from "./index";

export const cyberpunkNeon: DesignStyle = {
  slug: "cyberpunk-neon",
  name: "赛博朋克霓虹",
  nameEn: "Cyberpunk Neon",
  description:
    "未来感十足的赛博朋克风格，霓虹发光效果、深色背景、高科技感的 UI 元素。适合游戏、科技产品、创意工作室。",
  cover: "/styles/cyberpunk-neon.png",
  styleType: "visual",
  tags: ["expressive", "modern", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#00ffff",
    secondary: "#0a0a0f",
    accent: ["#ff00ff", "#ffff00", "#00ff00"],
  },
  keywords: ["赛博朋克", "霓虹", "未来", "发光", "游戏", "科技"],

  philosophy: `Cyberpunk Neon 风格来源于赛博朋克科幻美学，通过霓虹发光、深色背景和高对比度创造未来感。

核心理念：
- 霓虹发光：核心元素使用发光效果突出
- 深色主导：近乎纯黑的背景让霓虹更加醒目
- 高科技感：使用网格、扫描线等元素增加科技感
- 色彩冲击：青色、品红、黄色等高饱和度颜色`,

  doList: [
    "背景使用深色 bg-[#0a0a0f] 或 bg-gray-950",
    "使用 shadow-[0_0_20px_rgba(0,255,255,0.5)] 创造发光效果",
    "文字发光 [text-shadow:0_0_10px_currentColor]",
    "边框发光 border border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.3)]",
    "使用扫描线背景效果增加科技感",
    "按钮悬停增强发光 hover:shadow-[0_0_30px_rgba(0,255,255,0.7)]",
    "渐变文字 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent",
  ],

  dontList: [
    "禁止使用浅色/白色背景",
    "禁止使用低饱和度颜色",
    "禁止使用普通阴影 shadow-md（必须是发光阴影）",
    "禁止使用暖色调（除非作为警告/错误色）",
    "禁止圆角过大 rounded-2xl, rounded-3xl",
    "禁止使用柔和/温暖的设计语言",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Cyberpunk 风格的霓虹按钮",
      code: `// Neon Primary
<button className="px-6 py-3 bg-transparent border border-cyan-400 text-cyan-400 rounded-lg shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] hover:bg-cyan-400/10 transition-all duration-300 font-mono uppercase tracking-wider">
  Initialize
</button>

// Neon Filled
<button className="px-6 py-3 bg-cyan-400 text-black rounded-lg shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:shadow-[0_0_30px_rgba(0,255,255,0.7)] transition-all duration-300 font-mono font-bold uppercase tracking-wider">
  Execute
</button>

// Magenta Variant
<button className="px-6 py-3 bg-transparent border border-fuchsia-500 text-fuchsia-500 rounded-lg shadow-[0_0_15px_rgba(255,0,255,0.4)] hover:shadow-[0_0_25px_rgba(255,0,255,0.6)] hover:bg-fuchsia-500/10 transition-all duration-300 font-mono uppercase tracking-wider">
  Override
</button>`,
    },
    card: {
      name: "卡片",
      description: "Cyberpunk 风格的发光卡片",
      code: `<div className="bg-gray-950 border border-cyan-400/30 rounded-lg p-6 shadow-[0_0_15px_rgba(0,255,255,0.2)] hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] hover:border-cyan-400/50 transition-all duration-300 relative overflow-hidden">
  {/* Scan line effect */}
  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.03)_50%)] bg-[length:100%_4px] pointer-events-none" />

  <div className="relative">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
      <h3 className="text-cyan-400 font-mono uppercase tracking-wider text-sm">System Module</h3>
    </div>
    <h4 className="text-white text-xl font-bold mb-3" style={{textShadow: '0 0 10px rgba(255,255,255,0.3)'}}>
      Neural Interface
    </h4>
    <p className="text-gray-400 leading-relaxed">
      Advanced cybernetic enhancement module with quantum processing.
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
}`,

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
- Glow intensifies on hover`,

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
  ],
};
