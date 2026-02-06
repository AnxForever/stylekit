import { DesignStyle } from "./index";

export const outrun: DesignStyle = {
  slug: "outrun",
  name: "Outrun 复古未来",
  nameEn: "Outrun",
  description:
    "80年代日落、棕榈树剪影、跑车、网格地平线和复古浪潮美学。洋红与紫色霓虹、青色天空，充满速度感和怀旧未来主义。",
  cover: "/styles/outrun.svg",
  styleType: "visual",
  tags: ["retro", "expressive", "high-contrast"],
  category: "retro",
  colors: {
    primary: "#ff006e",
    secondary: "#a020f0",
    accent: ["#00d4ff", "#0a0a0a", "#ff6b35"],
  },
  keywords: ["Outrun", "复古未来", "80年代", "日落", "跑车", "棕榈树", "霓虹"],

  philosophy: `Outrun 是一种根植于80年代流行文化的视觉美学，命名自同名电子游戏。它将夕阳、跑车、棕榈树和霓虹灯光融为一体，创造出一种永恒的复古未来主义视觉语言。

核心理念：
- 日落驾驶：橙粉紫的日落天空下永恒的公路之旅
- 霓虹速度：洋红与紫色的霓虹灯光表达速度与激情
- 网格地平线：透视网格地板延伸向无限的地平线
- 棕榈剪影：黑色棕榈树映衬渐变天空`,

  doList: [
    "使用洋红、紫色、青色霓虹配色",
    "添加日落渐变天空背景",
    "使用透视网格地面效果",
    "添加霓虹发光效果",
    "使用粗体无衬线字体",
    "添加棕榈树或跑车剪影元素",
  ],

  dontList: [
    "禁止使用明亮的白色背景",
    "禁止使用现代简约风格",
    "禁止省略霓虹发光效果",
    "禁止使用柔和低饱和配色",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Outrun 风格按钮",
      code: `<button className="
  px-8 py-4
  bg-gradient-to-r from-[#ff006e] to-[#a020f0]
  text-white font-bold uppercase tracking-wider
  rounded-lg
  shadow-[0_0_20px_rgba(255,0,110,0.5)]
  hover:shadow-[0_0_30px_rgba(0,212,255,0.7)]
  hover:scale-105
  transition-all duration-300
">
  Drive
</button>`,
    },
    card: {
      name: "卡片",
      description: "Outrun 风格卡片",
      code: `<div className="
  p-8
  bg-[#0a0a0a]/80
  rounded-lg
  border border-[#ff006e]/50
  shadow-[0_0_20px_rgba(255,0,110,0.3)]
  backdrop-blur-sm
">
  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff006e] to-[#00d4ff] mb-3">
    MIDNIGHT RUN
  </h3>
  <p className="text-[#a020f0]/70">
    Chase the horizon
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Outrun 风格输入框",
      code: `<input
  type="text"
  placeholder="Enter destination..."
  className="
    w-full px-6 py-4
    bg-[#0a0a0a]/60
    rounded-lg
    border border-[#a020f0]/50
    text-[#00d4ff] placeholder-[#a020f0]/50
    shadow-[0_0_10px_rgba(160,32,240,0.2)]
    focus:border-[#00d4ff]
    focus:shadow-[0_0_20px_rgba(0,212,255,0.4)]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "Outrun 风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-[#0a0a0a] via-[#2d0a4e] to-[#ff006e]/30
  relative overflow-hidden
">
  {/* Sun */}
  <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-80 h-40 bg-gradient-to-t from-[#ff6b35] via-[#ff006e] to-[#a020f0] rounded-t-full opacity-80" />

  {/* Grid floor */}
  <div className="absolute bottom-0 left-0 right-0 h-1/2">
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,0,110,0.3)_1px,transparent_1px),linear-gradient(rgba(255,0,110,0.3)_1px,transparent_1px)] bg-[size:60px_30px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom" />
  </div>

  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#ff006e] to-[#a020f0] mb-6">
      OUTRUN
    </h1>
    <p className="text-xl text-[#00d4ff]/80 mb-8">
      Chase the sunset
    </p>
    <button className="
      px-10 py-4
      bg-gradient-to-r from-[#ff006e] to-[#a020f0]
      text-white font-bold uppercase tracking-wider
      rounded-lg
      shadow-[0_0_30px_rgba(255,0,110,0.5)]
      hover:shadow-[0_0_50px_rgba(255,0,110,0.8)]
      transition-all
    ">
      Ride
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Outrun 全局样式 */

:root {
  --outrun-magenta: #ff006e;
  --outrun-purple: #a020f0;
  --outrun-cyan: #00d4ff;
  --outrun-black: #0a0a0a;
  --outrun-orange: #ff6b35;
}

/* 霓虹发光 */
.outrun-glow {
  text-shadow:
    0 0 10px var(--outrun-magenta),
    0 0 20px var(--outrun-magenta),
    0 0 40px var(--outrun-magenta);
}

/* 网格地板 */
.outrun-grid {
  background-image:
    linear-gradient(90deg, rgba(255, 0, 110, 0.3) 1px, transparent 1px),
    linear-gradient(rgba(255, 0, 110, 0.3) 1px, transparent 1px);
  background-size: 60px 30px;
  transform: perspective(500px) rotateX(60deg);
  transform-origin: bottom;
}

/* 日落渐变 */
.outrun-sunset {
  background: linear-gradient(
    to bottom,
    #0a0a0a 0%,
    #2d0a4e 30%,
    #ff006e 60%,
    #ff6b35 100%
  );
}

/* 扫描线 */
.outrun-scanlines::after {
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

  aiRules: `你是一个 Outrun 复古未来设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用明亮的白色背景
- 使用现代简约的设计
- 省略霓虹发光效果
- 使用正式的字体

## 必须遵守

- 洋红紫青配色 from-[#ff006e], from-[#a020f0], text-[#00d4ff]
- 深色背景 bg-[#0a0a0a]
- 霓虹发光 shadow-[0_0_20px_rgba(255,0,110,0.5)]
- 网格背景装饰
- 日落渐变 from-[#ff6b35] via-[#ff006e] to-[#a020f0]

## 配色

主色调：
- 洋红: #ff006e
- 紫色: #a020f0
- 青色: #00d4ff
- 黑色: #0a0a0a
- 橙色: #ff6b35

## 特殊元素

- 透视网格地板
- 日落太阳
- 棕榈树剪影
- 扫描线效果`,

  examplePrompts: [
    {
      title: "复古赛车界面",
      titleEn: "Retro Racing Interface",
      description: "80年代风格赛车游戏UI",
      descriptionEn: "80s style racing game UI",
      prompt: `用 Outrun 风格创建一个复古赛车界面，要求：
1. 背景：日落渐变 + 网格地板
2. 标题：霓虹发光效果
3. 按钮：洋红霓虹边框
4. 添加太阳和棕榈树剪影
5. 整体复古未来速度感`,
    },
  ],
};
