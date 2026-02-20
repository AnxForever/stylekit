import { DesignStyle } from "./index";

export const vaporwave: DesignStyle = {
  slug: "vaporwave",
  name: "霓虹复古",
  nameEn: "Neon Retro",
  description:
    "80-90年代复古未来主义美学，粉紫渐变、霓虹色彩、故障艺术效果。包含蒸汽波、合成波、赛博朋克三种变体。",
  cover: "/styles/vaporwave.svg",
  styleType: "visual",
  tags: ["retro", "expressive", "high-contrast"],
  category: "retro",
  colors: {
    primary: "#ff71ce",
    secondary: "#01cdfe",
    accent: ["#05ffa1", "#b967ff", "#fffb96"],
  },
  keywords: ["蒸汽波", "复古未来", "霓虹", "80年代", "故障艺术", "赛博", "合成波", "赛博朋克", "vaporwave", "synthwave", "cyberpunk"],

  // 风格变体
  variants: [
    {
      id: "vaporwave",
      name: "蒸汽波",
      nameEn: "Vaporwave",
      description: "80-90年代消费主义、日文元素、希腊雕塑、故障艺术",
      colors: {
        primary: "#ff71ce",
        secondary: "#01cdfe",
        accent: ["#05ffa1", "#b967ff", "#fffb96"],
      },
    },
    {
      id: "synthwave",
      name: "合成波",
      nameEn: "Synthwave",
      description: "80年代合成器音乐、网格地平线、日落渐变、科幻电影感",
      colors: {
        primary: "#ff00ff",
        secondary: "#00ffff",
        accent: ["#ff6ec7", "#7b68ee", "#ff1493"],
      },
      cssOverrides: `
/* Synthwave variant - more saturated, grid horizon */
.synth-grid {
  background: linear-gradient(to bottom, transparent 0%, #ff00ff33 100%),
    repeating-linear-gradient(90deg, #ff00ff22 0px, transparent 1px, transparent 80px),
    repeating-linear-gradient(0deg, #ff00ff22 0px, transparent 1px, transparent 80px);
}
.synth-sun {
  background: linear-gradient(to bottom, #ff6ec7, #ff1493, #7b68ee);
  border-radius: 50% 50% 0 0;
}
`,
    },
    {
      id: "cyberpunk",
      name: "赛博朋克",
      nameEn: "Cyberpunk",
      description: "深色背景、霓虹发光、未来都市、科技感",
      colors: {
        primary: "#00ffff",
        secondary: "#0a0a0f",
        accent: ["#ff00ff", "#ffff00", "#00ff00"],
      },
      cssOverrides: `
/* Cyberpunk variant - dark background, strong neon */
body { background: #0a0a0f; }
.cyber-neon {
  text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor;
}
.cyber-border {
  border: 1px solid #00ffff;
  box-shadow: 0 0 10px #00ffff, inset 0 0 10px #00ffff33;
}
`,
    },
  ],

  philosophy: `Vaporwave（蒸汽波）是一种源于2010年代初的网络亚文化美学，融合了80-90年代的消费主义符号、日本文化元素和早期互联网美学。

核心理念：
- 怀旧感：对80-90年代商业美学的戏仿和致敬
- 超现实：希腊雕塑、棕榈树、日落等超现实元素组合
- 霓虹色彩：粉色、青色、紫色的渐变组合
- 故障美学：VHS 故障、扫描线、色差效果`,

  doList: [
    "使用粉紫青渐变 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500",
    "添加霓虹发光效果 shadow-[0_0_20px_rgba(255,113,206,0.5)]",
    "使用故障/扫描线效果作为装饰",
    "融入日文文字或希腊雕塑元素",
    "使用网格线背景营造复古感",
    "字体使用粗体或像素风格",
    "hover 引入迷幻扭曲：轻微旋转、位移与渐变流动",
    "点击使用错误弹窗式错位位移，营造旧系统 glitch 反馈",
    "霓虹光晕强调粉+青双色散射，形成 Aesthetic 重影效果",
  ],

  dontList: [
    "禁止使用单调的灰色配色",
    "禁止使用过于现代简约的设计",
    "禁止省略霓虹发光效果",
    "禁止使用过于正式的字体",
    "禁止仅用单色 glow，必须体现粉青双色发光重影",
    "禁止所有交互都过快，hover 需保留漂浮式慢节奏",
  ],

  components: {
    button: {
      name: "按钮",
      description: "蒸汽波风格按钮，霓虹发光效果",
      code: `<button className="
  relative px-10 py-3
  bg-gradient-to-r from-[#ff71ce] via-[#b967ff] to-[#01cdfe] bg-[length:200%_auto]
  text-white font-black uppercase tracking-[0.3em]
  border-2 border-white/50
  shadow-[4px_4px_0_rgba(1,205,254,0.6)]
  hover:bg-right
  hover:shadow-[8px_8px_0_rgba(255,113,206,0.8),0_0_30px_rgba(185,103,255,0.5)]
  hover:-translate-y-1 hover:-rotate-2
  active:rotate-0 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none
  transition-all duration-300 ease-out
">
  A E S T H E T I C S
</button>`,
    },
    card: {
      name: "卡片",
      description: "蒸汽波风格卡片",
      code: `<div className="
  group p-8
  bg-[#2b0057]/60 backdrop-blur-xl
  border-t-2 border-l-2 border-[#ff71ce]/50 border-b-4 border-r-4 border-[#01cdfe]/50
  shadow-[0_10px_30px_rgba(255,113,206,0.2)]
  hover:shadow-[0_0_50px_rgba(1,205,254,0.4)]
  hover:-translate-y-2 hover:rotate-1
  transition-all duration-500
  relative overflow-hidden cursor-pointer
">
  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,113,206,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(1,205,254,0.2)_1px,transparent_1px)] bg-[size:15px_15px] opacity-20 group-hover:opacity-50 group-hover:scale-110 transition-all duration-700" style={{ transform: "perspective(200px) rotateX(45deg)" }} />

  <div className="relative z-10">
    <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#ff71ce] to-[#01cdfe] mb-3 tracking-[0.2em] group-hover:tracking-[0.4em] transition-all duration-500" style={{ textShadow: "2px 2px 0px rgba(185,103,255,0.5)" }}>
      V I R T U A L
    </h3>
    <div className="inline-block bg-[#01cdfe] text-[#2b0057] px-2 py-1 font-mono font-bold text-xs uppercase mb-4">
      Windows 95.exe
    </div>
    <p className="text-[#ff71ce] font-medium leading-relaxed drop-shadow-[0_0_5px_rgba(255,113,206,0.5)]">
      Welcome to the aesthetic dimension. Where marble statues cry digital tears and the mall music never stops playing.
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "蒸汽波风格输入框",
      code: `<input
  type="text"
  placeholder="输入..."
  className="
    w-full px-6 py-4
    bg-purple-900/50
    border-2 border-pink-500/50
    text-pink-100 placeholder-pink-300/50
    shadow-[0_0_15px_rgba(255,113,206,0.2)]
    focus:border-cyan-400
    focus:shadow-[0_0_25px_rgba(1,205,254,0.4)]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "蒸汽波风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-purple-900 via-pink-900 to-indigo-900
  relative overflow-hidden
">
  {/* Grid background */}
  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,113,206,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,113,206,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />

  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-6">
      VAPORWAVE
    </h1>
    <p className="text-xl text-pink-200/80 mb-8">
      アエステティック・ドリーム
    </p>
    <button className="
      px-10 py-4
      bg-gradient-to-r from-pink-500 to-cyan-500
      text-white font-bold uppercase
      shadow-[0_0_30px_rgba(255,113,206,0.5)]
      hover:shadow-[0_0_50px_rgba(255,113,206,0.7)]
      transition-all
    ">
      Enter the Dream
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Vaporwave 全局样式 */

:root {
  --vapor-pink: #ff71ce;
  --vapor-cyan: #01cdfe;
  --vapor-purple: #b967ff;
  --vapor-green: #05ffa1;
  --vapor-yellow: #fffb96;
}

/* 霓虹发光效果 */
.vapor-glow {
  text-shadow:
    0 0 10px var(--vapor-pink),
    0 0 20px var(--vapor-pink),
    0 0 40px var(--vapor-cyan);
}

/* 网格背景 */
.vapor-grid {
  background-image:
    linear-gradient(rgba(255, 113, 206, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 113, 206, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}

/* 扫描线效果 */
.vapor-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1) 0px,
    rgba(0, 0, 0, 0.1) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}`,

  aiRules: `你是一个 Vaporwave 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用单调的灰色或黑白配色
- 使用过于现代简约的设计
- 省略霓虹发光效果
- 使用正式的衬线字体

## 必须遵守

- 粉紫青渐变 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500
- 霓虹发光 shadow-[0_0_20px_rgba(255,113,206,0.5)]
- 深色背景 bg-purple-900, bg-pink-900
- 网格线背景装饰
- 大写字母和宽字距 uppercase tracking-wider

## 配色

主色调：
- 粉色: #ff71ce, from-pink-500
- 青色: #01cdfe, from-cyan-500
- 紫色: #b967ff, from-purple-500
- 绿色: #05ffa1
- 黄色: #fffb96

## 特殊元素

- 日文文字装饰
- 希腊雕塑图片
- 棕榈树、日落元素
- VHS 故障效果

## Animation & Interaction Rules

- Aesthetic Warp: hover 引入轻微旋转与位移，并驱动渐变流动（如 bg-[length:200%_auto] + hover:bg-right）。
- Glitch/Error Snap: active 使用突兀错位（如 translate-x / -translate-y），模拟旧系统故障弹窗反馈。
- Dual-Color Irradiation: 发光必须呈现粉色 #ff71ce 与青色 #01cdfe 双重散射重影。
- Floating Slowness: 非点击动画使用 duration-500 左右，营造互联网废墟中的缓慢漂浮感。`,

  examplePrompts: [
    {
      title: "复古音乐播放器",
      titleEn: "Retro Music Player",
      description: "80年代风格音乐界面",
      descriptionEn: "80s style music interface",
      prompt: `用 Vaporwave 风格创建一个音乐播放器界面，要求：
1. 背景：紫粉渐变 + 网格线
2. 专辑封面：带霓虹边框发光
3. 播放控制：霓虹按钮
4. 进度条：渐变色
5. 添加日文装饰文字`,
    },
  ],
};
