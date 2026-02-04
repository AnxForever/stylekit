import { DesignStyle } from "./index";

export const vaporwave: DesignStyle = {
  slug: "vaporwave",
  name: "蒸汽波",
  nameEn: "Vaporwave",
  description:
    "80-90年代复古未来主义美学，粉紫渐变、霓虹色彩、故障艺术效果、希腊雕塑和日文元素，充满怀旧与超现实感。",
  cover: "/styles/vaporwave.svg",
  styleType: "visual",
  tags: ["retro", "expressive"],
  category: "retro",
  colors: {
    primary: "#ff71ce",
    secondary: "#01cdfe",
    accent: ["#05ffa1", "#b967ff", "#fffb96"],
  },
  keywords: ["蒸汽波", "复古未来", "霓虹", "80年代", "故障艺术", "赛博"],

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
  ],

  dontList: [
    "禁止使用单调的灰色配色",
    "禁止使用过于现代简约的设计",
    "禁止省略霓虹发光效果",
    "禁止使用过于正式的字体",
  ],

  components: {
    button: {
      name: "按钮",
      description: "蒸汽波风格按钮，霓虹发光效果",
      code: `<button className="
  px-8 py-4
  bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500
  text-white font-bold uppercase tracking-wider
  border-2 border-white/30
  shadow-[0_0_20px_rgba(255,113,206,0.5),0_0_40px_rgba(1,205,254,0.3)]
  hover:shadow-[0_0_30px_rgba(255,113,206,0.7),0_0_60px_rgba(1,205,254,0.5)]
  hover:scale-105
  transition-all duration-300
">
  AESTHETIC
</button>`,
    },
    card: {
      name: "卡片",
      description: "蒸汽波风格卡片",
      code: `<div className="
  p-8
  bg-gradient-to-br from-purple-900/80 to-pink-900/80
  backdrop-blur-sm
  border border-pink-500/30
  shadow-[0_0_30px_rgba(255,113,206,0.3)]
">
  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 mb-3">
    アエステティック
  </h3>
  <p className="text-pink-200/80">
    Welcome to the aesthetic dimension
  </p>
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
- VHS 故障效果`,

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
