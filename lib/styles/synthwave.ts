import { DesignStyle } from "./index";

export const synthwave: DesignStyle = {
  slug: "synthwave",
  name: "合成波",
  nameEn: "Synthwave",
  description:
    "80年代复古未来主义音乐美学，霓虹粉紫配色、网格地平线、日落渐变和复古科技感，充满怀旧的未来想象。",
  cover: "/styles/synthwave.svg",
  styleType: "visual",
  tags: ["retro", "expressive", "high-contrast"],
  category: "retro",
  colors: {
    primary: "#ff00ff",
    secondary: "#00ffff",
    accent: ["#ff6ec7", "#7b68ee", "#ff1493"],
  },
  keywords: ["合成波", "80年代", "霓虹", "复古未来", "网格", "日落"],

  philosophy: `Synthwave（合成波）是一种源于2000年代中期的电子音乐流派和视觉美学，致敬80年代的科幻电影、电子游戏和合成器音乐。

核心理念：
- 复古未来：对80年代未来想象的怀旧
- 霓虹美学：粉色、紫色、青色的霓虹灯效果
- 网格地平线：透视网格延伸至地平线
- 日落渐变：橙粉紫的日落天空`,

  doList: [
    "使用粉紫青霓虹配色",
    "添加透视网格背景",
    "使用日落渐变（橙→粉→紫）",
    "添加霓虹发光效果",
    "使用复古风格字体",
    "添加太阳/山脉剪影元素",
  ],

  dontList: [
    "禁止使用明亮的白色背景",
    "禁止使用现代简约的设计",
    "禁止省略霓虹发光效果",
    "禁止使用过于正式的字体",
  ],

  components: {
    button: {
      name: "按钮",
      description: "合成波风格按钮",
      code: `<button className="
  px-8 py-4
  bg-transparent
  border-2 border-pink-500
  text-pink-500 font-bold uppercase tracking-wider
  shadow-[0_0_10px_rgba(255,0,255,0.5),inset_0_0_10px_rgba(255,0,255,0.1)]
  hover:bg-pink-500 hover:text-black
  hover:shadow-[0_0_20px_rgba(255,0,255,0.8),0_0_40px_rgba(255,0,255,0.4)]
  transition-all duration-300
">
  Start
</button>`,
    },
    card: {
      name: "卡片",
      description: "合成波风格卡片",
      code: `<div className="
  p-8
  bg-gradient-to-b from-purple-900/80 to-black/80
  border border-pink-500/50
  shadow-[0_0_20px_rgba(255,0,255,0.2)]
  backdrop-blur-sm
">
  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 mb-3">
    RETRO FUTURE
  </h3>
  <p className="text-pink-200/70">
    Back to the 80s
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "合成波风格输入框",
      code: `<input
  type="text"
  placeholder="Enter text..."
  className="
    w-full px-6 py-4
    bg-black/50
    border-2 border-cyan-500/50
    text-cyan-100 placeholder-cyan-500/50
    shadow-[0_0_10px_rgba(0,255,255,0.1)]
    focus:border-pink-500
    focus:shadow-[0_0_20px_rgba(255,0,255,0.3)]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "合成波风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-purple-900 via-pink-900 to-orange-900
  relative overflow-hidden
">
  {/* Sun */}
  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-t from-orange-500 via-pink-500 to-purple-500 rounded-t-full opacity-80" />

  {/* Grid floor */}
  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(transparent_0%,rgba(255,0,255,0.1)_100%)]">
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,0,255,0.3)_1px,transparent_1px),linear-gradient(rgba(255,0,255,0.3)_1px,transparent_1px)] bg-[size:60px_30px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom" />
  </div>

  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-pink-400 to-purple-600 mb-6" style="text-shadow: 0 0 40px rgba(255,0,255,0.5)">
      SYNTHWAVE
    </h1>
    <p className="text-xl text-pink-200/80 mb-8">
      Ride into the sunset
    </p>
    <button className="
      px-10 py-4
      bg-gradient-to-r from-pink-500 to-purple-500
      text-white font-bold uppercase tracking-wider
      shadow-[0_0_30px_rgba(255,0,255,0.5)]
      hover:shadow-[0_0_50px_rgba(255,0,255,0.8)]
      transition-all
    ">
      Drive
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Synthwave 全局样式 */

:root {
  --synth-pink: #ff00ff;
  --synth-cyan: #00ffff;
  --synth-purple: #7b68ee;
  --synth-orange: #ff6ec7;
}

/* 霓虹发光 */
.synth-glow {
  text-shadow:
    0 0 10px var(--synth-pink),
    0 0 20px var(--synth-pink),
    0 0 40px var(--synth-pink);
}

/* 网格地板 */
.synth-grid {
  background-image:
    linear-gradient(90deg, rgba(255, 0, 255, 0.3) 1px, transparent 1px),
    linear-gradient(rgba(255, 0, 255, 0.3) 1px, transparent 1px);
  background-size: 60px 30px;
  transform: perspective(500px) rotateX(60deg);
  transform-origin: bottom;
}

/* 日落渐变 */
.synth-sunset {
  background: linear-gradient(
    to bottom,
    #1a0533 0%,
    #4a1942 30%,
    #ff6b6b 60%,
    #feca57 100%
  );
}

/* 扫描线 */
.synth-scanlines::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15) 0px,
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}`,

  aiRules: `你是一个 Synthwave 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用明亮的白色背景
- 使用现代简约的设计
- 省略霓虹发光效果
- 使用正式的字体

## 必须遵守

- 粉紫青配色 from-pink-500, from-purple-500, from-cyan-500
- 深色背景 bg-purple-900, bg-black
- 霓虹发光 shadow-[0_0_20px_rgba(255,0,255,0.5)]
- 网格背景装饰
- 日落渐变 from-orange-500 via-pink-500 to-purple-500

## 配色

主色调：
- 粉色: #ff00ff, from-pink-500
- 青色: #00ffff, from-cyan-500
- 紫色: #7b68ee, from-purple-500
- 橙色: #ff6ec7

## 特殊元素

- 透视网格地板
- 日落太阳
- 山脉剪影
- 扫描线效果`,

  examplePrompts: [
    {
      title: "复古游戏界面",
      titleEn: "Retro Game Interface",
      description: "80年代风格游戏UI",
      descriptionEn: "80s style game UI",
      prompt: `用 Synthwave 风格创建一个复古游戏界面，要求：
1. 背景：日落渐变 + 网格地板
2. 标题：霓虹发光效果
3. 按钮：霓虹边框
4. 添加太阳和山脉剪影
5. 整体复古未来感`,
    },
  ],
};
