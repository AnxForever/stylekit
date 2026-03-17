import { DesignStyle } from "./index";

export const retroRadio: DesignStyle = {
  slug: "retro-radio",
  name: "复古收音机",
  nameEn: "Retro Radio",
  description:
    "复古收音机美学，融合木纹质感、黄铜旋钮、奶油色面板和温暖的模拟信号感。适合怀旧、音乐、手工艺和温馨氛围的项目。",
  descriptionEn:
    "Vintage radio aesthetics featuring wood grain textures, brass knobs, cream panels, and warm analog feel. Ideal for nostalgic, music, craft, and cozy atmosphere projects.",
  cover: "/styles/retro-radio.svg",
  styleType: "animation",
  tags: ["retro", "expressive"],
  category: "retro",
  colors: {
    primary: "#3d2b1f",
    secondary: "#f5e6d3",
    accent: ["#d4a017", "#8b6914", "#c4956a", "#5c3d2e", "#e8d5b7"],
  },
  keywords: ["radio", "vintage", "retro", "wood", "brass", "analog", "dial", "knob", "warm", "nostalgic", "frequency"],

  philosophy: `Retro Radio 风格再现了黄金时代收音机的温暖质感与模拟美学。

核心理念：
- 木纹质感：深色木质背景传递温暖与怀旧
- 黄铜点缀：旋钮、刻度和装饰元素使用黄铜/金色
- 奶油面板：浅色区域使用羊皮纸/奶油色调
- 频率刻度：线性刻度和数字营造调频氛围
- 温暖光晕：柔和的暖色阴影模拟真空管发光
- 衬线标题：标题使用衬线字体呼应复古印刷

设计原则：
- 视觉一致性：所有组件遵循统一的木质+黄铜+奶油色视觉语言
- 层次分明：通过材质对比（木/铜/布）建立信息层级
- 交互反馈：旋钮旋转、指针摆动等拟物化反馈
- 响应式适配：在各尺寸屏幕上保持温暖的视觉体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准`,

  philosophyEn: `Retro Radio style recreates the warm textures and analog aesthetics of golden-age radios.

Core principles:
- Wood grain texture: dark wood backgrounds convey warmth and nostalgia
- Brass accents: knobs, dials, and decorative elements use brass/gold tones
- Cream panels: light areas use parchment/cream tones
- Frequency dial: linear scales and numbers create a tuning atmosphere
- Warm glow: soft warm shadows simulate vacuum tube illumination
- Serif headings: headings use serif fonts echoing vintage typography`,

  doList: [
    "Use dark wood (#3d2b1f) as primary background",
    "Apply brass/gold (#d4a017) accents on interactive elements",
    "Use cream (#f5e6d3) for text and panel backgrounds",
    "Add warm box-shadow glows to simulate tube warmth",
    "Use serif fonts for headings, sans-serif for body text",
    "Include dial/knob metaphors in interactive components",
  ],

  doListEn: [
    "Use dark wood (#3d2b1f) as primary background",
    "Apply brass/gold (#d4a017) accents on interactive elements",
    "Use cream (#f5e6d3) for text and panel backgrounds",
    "Add warm box-shadow glows to simulate tube warmth",
    "Use serif fonts for headings, sans-serif for body text",
    "Include dial/knob metaphors in interactive components",
  ],

  dontList: [
    "Don't use neon or high-saturation colors",
    "Don't use monospace fonts for body text",
    "Don't use sharp corners (rounded-none)",
    "Don't use cold blue or pure white backgrounds",
    "Don't use flat design without texture or depth",
  ],

  dontListEn: [
    "Don't use neon or high-saturation colors",
    "Don't use monospace fonts for body text",
    "Don't use sharp corners (rounded-none)",
    "Don't use cold blue or pure white backgrounds",
    "Don't use flat design without texture or depth",
  ],

  components: {
    button: {
      name: "按钮",
      description: "复古收音机黄铜按钮，带温暖光晕",
      code: `<button className="group relative px-8 py-3 bg-[#d4a017] text-[#3d2b1f] font-serif text-lg tracking-wide border-2 border-[#d4a017] rounded-lg shadow-[0_2px_12px_rgba(212,160,23,0.4)] hover:shadow-[0_4px_24px_rgba(212,160,23,0.6)] hover:bg-[#e0b020] active:translate-y-[2px] active:shadow-[0_1px_6px_rgba(212,160,23,0.3)] transition-all duration-300">
  <span className="group-hover:tracking-wider transition-all duration-300">Tune In</span>
</button>`,
    },
    card: {
      name: "卡片",
      description: "木纹质感面板，带黄铜边框装饰",
      code: `<div className="group bg-[#3d2b1f] border-2 border-[#d4a017]/30 rounded-lg p-6 relative overflow-hidden hover:border-[#d4a017]/60 hover:shadow-[0_4px_24px_rgba(212,160,23,0.2)] hover:-translate-y-1 transition-all duration-300">
  {/* Wood grain texture overlay */}
  <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q25 8 50 10 T100 10' fill='none' stroke='%23d4a017' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E\")", backgroundSize: "100px 20px"}} />
  <div className="relative">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-3 h-3 rounded-full bg-[#d4a017] shadow-[0_0_8px_rgba(212,160,23,0.5)]" />
      <h3 className="text-[#d4a017] font-serif text-xs tracking-widest">Station</h3>
    </div>
    <h4 className="text-[#f5e6d3] text-xl font-serif font-bold mb-2">Title Here</h4>
    <p className="text-[#f5e6d3]/60 text-sm leading-relaxed">Description text with warm cream tint.</p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "复古旋钮风格输入框",
      code: `<div className="space-y-2">
  <label className="block text-[#d4a017] font-serif text-xs tracking-widest">Frequency</label>
  <input
    type="text"
    className="w-full px-4 py-3 bg-[#2a1f15] border-2 border-[#d4a017]/30 rounded-lg text-[#f5e6d3] text-sm placeholder:text-[#f5e6d3]/40 focus:outline-none focus:border-[#d4a017] focus:shadow-[0_0_12px_rgba(212,160,23,0.3)] transition-all duration-300"
    placeholder="Search frequencies..."
  />
</div>`,
    },
    nav: {
      name: "导航栏",
      description: "复古收音机导航栏，带黄铜装饰",
      code: `<nav className="bg-[#3d2b1f]/95 border-b-2 border-[#d4a017]/30 backdrop-blur-sm px-6 py-3 flex justify-between items-center">
  <span className="text-[#d4a017] font-serif text-sm tracking-widest">Retro Radio</span>
  <div className="flex gap-6">
    <a className="text-[#f5e6d3] font-serif text-xs tracking-widest hover:text-[#d4a017] transition-colors duration-300">Stations</a>
    <a className="text-[#f5e6d3]/60 font-serif text-xs tracking-widest hover:text-[#d4a017] transition-colors duration-300">Favorites</a>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区域",
      description: "复古收音机 Hero 区域，带温暖光晕和频率刻度",
      code: `<section className="relative bg-[#3d2b1f] overflow-hidden px-6 py-20">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,160,23,0.08),transparent_70%)]" />
  <div className="relative max-w-4xl mx-auto text-center">
    <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-wide text-[#f5e6d3]" style={{textShadow: "0 2px 20px rgba(212,160,23,0.3)"}}>
      Retro Radio
    </h1>
    <p className="mt-4 text-[#d4a017]/80 font-serif text-sm tracking-widest">
      Tune into the golden age
    </p>
  </div>
</section>`,
    },
    footer: {
      name: "页脚",
      description: "复古收音机页脚",
      code: `<footer className="bg-[#2a1f15] border-t-2 border-[#d4a017]/20 px-6 py-6">
  <p className="text-[#f5e6d3]/40 font-serif text-xs text-center tracking-widest">
    Crafted with warmth -- Retro Radio
  </p>
</footer>`,
    },
  },

  globalCss: `/* Retro Radio Global Styles */
@layer base {
  body {
    @apply bg-[#3d2b1f] text-[#f5e6d3] antialiased;
  }

  h1, h2, h3 {
    font-family: Georgia, "Times New Roman", serif;
    text-shadow: 0 1px 8px rgba(212, 160, 23, 0.2);
  }

  ::selection {
    @apply bg-[#d4a017] text-[#3d2b1f];
  }
}

@keyframes rr-dial-sweep {
  0% { transform: rotate(-60deg); }
  50% { transform: rotate(60deg); }
  100% { transform: rotate(-60deg); }
}
@keyframes rr-knob-glow {
  0%, 100% { box-shadow: 0 0 8px rgba(212, 160, 23, 0.3); }
  50% { box-shadow: 0 0 20px rgba(212, 160, 23, 0.6); }
}
@keyframes rr-static-noise {
  0% { opacity: 0.03; transform: translateX(0); }
  25% { opacity: 0.06; transform: translateX(-1px); }
  50% { opacity: 0.02; transform: translateX(1px); }
  75% { opacity: 0.05; transform: translateX(-0.5px); }
  100% { opacity: 0.03; transform: translateX(0); }
}
@keyframes rr-warm-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

:root {
  --retro-radio-primary: #3d2b1f;
  --retro-radio-secondary: #f5e6d3;
  --retro-radio-accent: #d4a017;
  --retro-radio-glow: rgba(212, 160, 23, 0.3);
}

.retro-radio-card {
  position: relative;
  overflow: hidden;
}

.retro-radio-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(212, 160, 23, 0.05), transparent);
  pointer-events: none;
}

.retro-radio-card:hover::before {
  opacity: 1;
}

.retro-radio-frosted {
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  background: rgba(61, 43, 31, 0.85);
}

.retro-radio-animate-in {
  animation: retro-radio-fade-in 0.6s ease-out both;
}

@keyframes retro-radio-fade-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.retro-radio-focus { outline: 2px solid var(--retro-radio-accent, currentColor); outline-offset: 2px; }`,

  aiRules: `STYLE: Retro Radio
TYPE: Vintage radio warm analog aesthetic

MUST USE:
- Background: Dark wood (#3d2b1f or #2a1f15)
- Primary accent: Brass/gold (#d4a017) for interactive elements
- Text: Cream (#f5e6d3) for readability on dark wood
- Serif fonts for headings (Georgia, Times New Roman)
- Sans-serif for body text
- Warm box-shadow glows to simulate tube warmth
- Rounded corners (rounded-lg) for approachable feel
- Dial/knob metaphors in interactive components
- Warm radial gradients for ambient glow

MUST AVOID:
- Neon or high-saturation colors
- Monospace fonts
- Sharp corners (rounded-none)
- Cold blue or pure white backgrounds
- Flat design without texture or depth
- Black backgrounds

COLOR RULES:
- Primary: Dark Wood (#3d2b1f)
- Secondary: Cream (#f5e6d3)
- Accent: Brass/Gold (#d4a017)
- Surface: Deep Wood (#2a1f15)
- Muted: Warm Brown (#5c3d2e)

SPECIAL EFFECTS:
- Dial sweep animation (rr-dial-sweep)
- Knob glow pulsing (rr-knob-glow)
- Static noise texture (rr-static-noise)
- Warm pulse for tube indicators (rr-warm-pulse)

Animation & Interaction Rules:
- Warm Glow: Hover states expand warm brass glow gradually with duration-300.
- Knob Turn: Interactive dials rotate smoothly with ease-in-out transitions.
- Tube Warmup: Elements fade in with a warm pulse, simulating vacuum tube power-on.
- Gentle Feedback: All transitions use duration-300 for a relaxed, analog feel.`,

  aiRulesEn: `STYLE: Retro Radio
TYPE: Vintage radio warm analog aesthetic

MUST USE:
- Background: Dark wood (#3d2b1f or #2a1f15)
- Primary accent: Brass/gold (#d4a017) for interactive elements
- Text: Cream (#f5e6d3) for readability on dark wood
- Serif fonts for headings (Georgia, Times New Roman)
- Sans-serif for body text
- Warm box-shadow glows to simulate tube warmth
- Rounded corners (rounded-lg) for approachable feel

MUST AVOID:
- Neon or high-saturation colors
- Monospace fonts
- Sharp corners (rounded-none)
- Cold blue or pure white backgrounds
- Flat design without texture or depth

Animation & Interaction Rules:
- Warm Glow: Hover states expand warm brass glow gradually with duration-300.
- Knob Turn: Interactive dials rotate smoothly with ease-in-out transitions.
- Tube Warmup: Elements fade in with a warm pulse, simulating vacuum tube power-on.
- Gentle Feedback: All transitions use duration-300 for a relaxed, analog feel.`,

  examplePrompts: [
    {
      title: "复古音乐播放器",
      titleEn: "Vintage Music Player",
      description: "带频率刻度和旋钮的音乐播放界面",
      descriptionEn: "Music player interface with frequency dial and knobs",
      prompt: `Create a vintage music player using Retro Radio style:
- Dark wood background with warm glow
- Brass frequency dial with sweep animation
- Cream panel with station information
- Volume and tone knobs with rotation
- Serif typography throughout`,
    },
    {
      title: "怀旧电台节目表",
      titleEn: "Nostalgic Radio Schedule",
      description: "温暖木质背景上的电台节目列表",
      descriptionEn: "Radio program schedule on warm wood background",
      prompt: `Build a radio program schedule using Retro Radio style:
- Wood-textured card panels for each show
- Brass accent borders and dividers
- Cream text on dark backgrounds
- Warm shadow glows on hover
- Vintage serif headings`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "复古收音机风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Retro Radio style",
      prompt: `Create a portfolio showcase page using Retro Radio style with project grid, about section, contact form, and consistent warm vintage visual language.`,
    },
  ],

  variants: [
    {
      id: "retro-radio-mahogany",
      name: "复古收音机红木版",
      nameEn: "Retro Radio Mahogany",
      description: "Richer, darker wood tones with copper accents",
      colors: {
        primary: "#2c1810",
        secondary: "#f0dcc8",
        accent: ["#b87333", "#8b4513", "#cd853f", "#4a2c1a", "#deb887"],
      },
    },
    {
      id: "retro-radio-ivory",
      name: "复古收音机象牙版",
      nameEn: "Retro Radio Ivory",
      description: "Lighter variant with ivory panels and silver accents",
      colors: {
        primary: "#4a3728",
        secondary: "#fffff0",
        accent: ["#c0c0c0", "#a0a0a0", "#d4c5a9", "#6b5344", "#e8e0d0"],
      },
    },
  ],
};
