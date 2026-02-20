import { DesignStyle } from "./index";

export const gothic: DesignStyle = {
  slug: "gothic",
  name: "哥特式风",
  nameEn: "Gothic",
  description:
    "中世纪哥特建筑美学，尖拱、玫瑰窗、手抄本装饰、大教堂氛围。深紫与血红配色，金色装饰线条，充满黑暗而庄严的神秘气息。",
  cover: "/styles/gothic.svg",
  styleType: "visual",
  tags: ["retro", "expressive", "high-contrast"],
  category: "retro",
  colors: {
    primary: "#2d1b4e",
    secondary: "#8b1a1a",
    accent: ["#c9a227", "#0a0a0a", "#4a2d6e"],
  },
  keywords: ["哥特", "中世纪", "大教堂", "尖拱", "玫瑰窗", "黑暗", "神秘"],

  philosophy: `Gothic（哥特式）设计灵感源自中世纪晚期的大教堂建筑和手抄本装饰艺术，强调垂直线条、尖拱结构和精致的装饰纹样。

核心理念：
- 大教堂美学：尖拱、飞扶壁和玫瑰窗的结构之美
- 黑暗庄严：深色调营造神秘而肃穆的氛围
- 金色点缀：以金色装饰线条和细节突出奢华感
- 手抄本风格：繁复的装饰边框和花体字`,

  doList: [
    "使用深紫、血红、黑色为主色调",
    "添加金色装饰线条和边框",
    "使用衬线字体传达古典感",
    "营造黑暗、神秘的氛围",
    "使用尖拱形状和哥特式图案",
    "添加精致的装饰纹样",
    "交互以缓慢光影增强为主，保持庄严厚重感",
  ],

  dontList: [
    "禁止使用明亮欢快的配色",
    "禁止使用圆润可爱的元素",
    "禁止使用现代无衬线字体作为主标题",
    "禁止使用过于简约的设计",
    "禁止快速抖动、弹性跳动等轻浮动效",
  ],

  components: {
    button: {
      name: "按钮",
      description: "哥特式风格按钮",
      code: `<button className="
  px-10 py-4
  bg-[#0a0a0a]
  border border-[#c9a227]/40
  text-[#c9a227] font-serif uppercase tracking-[0.2em]
  shadow-[0_4px_20px_rgba(10,10,10,0.9),inset_0_0_0_1px_rgba(201,162,39,0.1)]
  hover:bg-[#2d1b4e]/30
  hover:border-[#c9a227]
  hover:text-[#dfc266]
  hover:shadow-[0_0_30px_rgba(201,162,39,0.2),inset_0_0_10px_rgba(201,162,39,0.1)]
  active:bg-[#000000]
  active:shadow-[inset_0_10px_20px_rgba(0,0,0,0.9)]
  transition-all duration-700 ease-in-out
">
  Enter Sanctum
</button>`,
    },
    card: {
      name: "卡片",
      description: "哥特式风格卡片",
      code: `<div className="group relative p-10
  bg-gradient-to-b from-[#111111] to-[#0a0a0a]
  border border-[#c9a227]/20
  shadow-[0_10px_40px_rgba(0,0,0,0.9)]
  hover:border-[#c9a227]/60
  hover:shadow-[0_0_40px_rgba(45,27,78,0.6)]
  transition-all duration-700 ease-in-out
  overflow-hidden
">
  <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#c9a227]/10 group-hover:border-[#c9a227]/80 transition-colors duration-700" />
  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#c9a227]/10 group-hover:border-[#c9a227]/80 transition-colors duration-700" />

  <h3 className="text-3xl font-serif text-[#c9a227]/80 mb-4 tracking-widest uppercase group-hover:text-[#dfc266] group-hover:drop-shadow-[0_0_8px_rgba(201,162,39,0.4)] transition-all duration-700">
    CATHEDRAL
  </h3>
  <div className="w-12 h-px bg-[#8b1a1a]/50 mb-6 group-hover:w-full group-hover:bg-[#8b1a1a] transition-all duration-1000 ease-in-out" />
  <p className="text-[#c9a227]/50 font-serif leading-relaxed group-hover:text-[#c9a227]/80 transition-colors duration-700">
    In the shadow of the spire, where crimson light bleeds through rose windows onto the cold marble floor.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "哥特式风格输入框",
      code: `<input
  type="text"
  placeholder="Inscribe here..."
  className="
    w-full px-6 py-4
    bg-[#0a0a0a]/80
    border-2 border-[#c9a227]/30
    text-[#c9a227] placeholder-[#c9a227]/30
    font-serif
    focus:border-[#c9a227]
    focus:shadow-[0_0_16px_rgba(201,162,39,0.3)]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "哥特式风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-[#0a0a0a] via-[#2d1b4e] to-[#0a0a0a]
  relative overflow-hidden
">
  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_30%,#c9a227_0%,transparent_60%)]" />

  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-serif text-[#c9a227] mb-6 tracking-wider">
      GOTHIC
    </h1>
    <p className="text-xl text-[#c9a227]/60 font-serif mb-8">
      In tenebris lux
    </p>
    <button className="
      px-10 py-4
      bg-[#2d1b4e]
      border-2 border-[#c9a227]/60
      text-[#c9a227] font-serif uppercase tracking-widest
      shadow-[0_4px_16px_rgba(45,27,78,0.6)]
      hover:shadow-[0_6px_24px_rgba(201,162,39,0.4)]
      transition-all
    ">
      Explore
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Gothic 全局样式 */

:root {
  --gothic-purple: #2d1b4e;
  --gothic-blood: #8b1a1a;
  --gothic-black: #0a0a0a;
  --gothic-gold: #c9a227;
}

/* 金色发光 */
.gothic-glow {
  text-shadow:
    0 0 10px var(--gothic-gold),
    0 0 20px rgba(201, 162, 39, 0.3);
}

/* 尖拱装饰 */
.gothic-arch {
  clip-path: polygon(0 100%, 0 20%, 50% 0, 100% 20%, 100% 100%);
}

/* 装饰边框 */
.gothic-border {
  border: 2px solid rgba(201, 162, 39, 0.4);
  box-shadow: inset 0 0 20px rgba(10, 10, 10, 0.8);
}

/* 玫瑰窗装饰 */
.gothic-rose-window {
  background: radial-gradient(
    circle,
    var(--gothic-purple) 20%,
    var(--gothic-blood) 40%,
    var(--gothic-black) 60%
  );
}`,

  aiRules: `你是一个 Gothic 哥特式设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用明亮的白色背景
- 使用欢快、可爱的设计元素
- 使用无衬线字体作为主标题
- 使用圆润的大圆角

## 必须遵守

- 深紫血红黑色配色 bg-[#2d1b4e], bg-[#8b1a1a], bg-[#0a0a0a]
- 金色装饰 text-[#c9a227], border-[#c9a227]
- 衬线字体 font-serif
- 深色背景 bg-[#0a0a0a]
- 精致边框装饰

## 配色

主色调：
- 深紫: #2d1b4e
- 血红: #8b1a1a
- 纯黑: #0a0a0a
- 金色: #c9a227

## 特殊元素

- 尖拱形状
- 金色装饰线
- 精致边框
- 玫瑰窗图案

## Animation & Interaction Rules

- Cathedral Weight: 禁止轻浮弹跳或快速位移，交互应以光影与色阶的缓慢变化为主。
- Divine Illumination: 金色边框与文字在 hover 时缓慢增强发光，模拟烛火与神圣光晕。
- Stone Mechanism: \`:active\` 通过深色内阴影增强按压阻尼感，而非常规缩放反馈。
- Eternal Slowness: 动画建议 \`duration-500\` 到 \`duration-700\` 搭配 \`ease-in-out\`，维持庄严厚重气质。`,

  examplePrompts: [
    {
      title: "中世纪图书馆页面",
      titleEn: "Medieval Library Page",
      description: "哥特式风格图书馆目录",
      descriptionEn: "Gothic-style library catalog",
      prompt: `用 Gothic 风格创建一个中世纪图书馆页面，要求：
1. 背景：深色渐变
2. 标题：金色衬线字体
3. 卡片：深色背景配金色边框
4. 添加尖拱形装饰元素
5. 整体庄严神秘感`,
    },
  ],
};
