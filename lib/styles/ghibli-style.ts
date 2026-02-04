import { DesignStyle } from "./index";

export const ghibliStyle: DesignStyle = {
  slug: "ghibli-style",
  name: "吉卜力风格",
  nameEn: "Ghibli Style",
  description:
    "灵感源自吉卜力工作室动画的设计风格，温暖柔和的色调、手绘质感、自然元素和梦幻氛围，传递治愈与诗意。",
  cover: "/styles/ghibli-style.svg",
  styleType: "visual",
  tags: ["expressive", "retro"],
  category: "expressive",
  colors: {
    primary: "#7cb9a8",
    secondary: "#f4e4bc",
    accent: ["#e8a87c", "#85cdca", "#c38d94"],
  },
  keywords: ["吉卜力", "宫崎骏", "手绘", "治愈", "自然", "梦幻", "动画"],

  philosophy: `Ghibli Style（吉卜力风格）受日本吉卜力工作室动画影响，以温暖、治愈、富有诗意的视觉语言著称。

核心理念：
- 手绘质感：保留手工绘制的温度和不完美
- 自然主题：云朵、森林、天空等自然元素
- 柔和色调：温暖的大地色系和天空色
- 梦幻氛围：创造宁静治愈的视觉体验`,

  doList: [
    "使用柔和温暖的色调",
    "添加手绘风格的插图或边框",
    "融入自然元素（云、树、花）",
    "使用圆润柔和的形状",
    "添加微妙的纹理效果",
    "创造梦幻般的渐变背景",
  ],

  dontList: [
    "禁止使用过于锐利的边缘",
    "禁止使用高对比的刺眼配色",
    "禁止使用冰冷的科技感元素",
    "禁止过于复杂的动效",
  ],

  components: {
    button: {
      name: "按钮",
      description: "吉卜力风格按钮",
      code: `<button className="
  px-8 py-4
  bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a]
  text-white font-medium
  rounded-full
  border-2 border-[#5a9a8a]/30
  shadow-[0_4px_14px_rgba(124,185,168,0.4)]
  hover:shadow-[0_6px_20px_rgba(124,185,168,0.5)]
  hover:-translate-y-0.5
  transition-all duration-300
">
  Begin Journey
</button>`,
    },
    card: {
      name: "卡片",
      description: "吉卜力风格卡片",
      code: `<div className="
  p-6
  bg-gradient-to-br from-[#f4e4bc]/90 to-[#e8d5a3]/90
  rounded-3xl
  border border-[#d4c49a]/50
  shadow-[0_8px_30px_rgba(0,0,0,0.08)]
  backdrop-blur-sm
">
  <div className="w-16 h-16 bg-gradient-to-br from-[#85cdca] to-[#7cb9a8] rounded-full flex items-center justify-center mb-4">
    {/* Cloud icon */}
    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
    </svg>
  </div>
  <h3 className="text-xl font-semibold text-[#5a4a3a] mb-2">
    Sky Garden
  </h3>
  <p className="text-[#7a6a5a]">
    Where dreams float among the clouds
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "吉卜力风格输入框",
      code: `<input
  type="text"
  placeholder="Write your story..."
  className="
    w-full px-5 py-4
    bg-[#f4e4bc]/60
    border-2 border-[#d4c49a]/40
    rounded-2xl
    text-[#5a4a3a] placeholder-[#a89a7a]
    focus:outline-none focus:border-[#7cb9a8]
    focus:bg-[#f4e4bc]/80
    transition-all duration-300
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "吉卜力风格 Hero",
      code: `<section className="
  min-h-screen
  bg-gradient-to-b from-[#87ceeb] via-[#b4e4f5] to-[#f4e4bc]
  relative overflow-hidden
  flex items-center justify-center
  px-6
">
  {/* Clouds */}
  <div className="absolute top-20 left-10 w-32 h-16 bg-white/60 rounded-full blur-sm" />
  <div className="absolute top-32 right-20 w-40 h-20 bg-white/50 rounded-full blur-sm" />
  <div className="absolute top-16 right-40 w-24 h-12 bg-white/40 rounded-full blur-sm" />

  <div className="relative z-10 text-center max-w-2xl">
    <h1 className="text-5xl md:text-7xl font-semibold text-[#5a4a3a] mb-6 leading-tight">
      A World of
      <br />
      <span className="text-[#7cb9a8]">Wonder</span>
    </h1>
    <p className="text-xl text-[#7a6a5a] mb-8 leading-relaxed">
      Where every journey begins with a single step into the magical unknown.
    </p>
    <button className="px-10 py-4 bg-gradient-to-b from-[#7cb9a8] to-[#5a9a8a] text-white font-medium rounded-full shadow-[0_4px_20px_rgba(124,185,168,0.4)] hover:-translate-y-1 transition-all duration-300">
      Start Adventure
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Ghibli Style 全局样式 */

:root {
  --ghibli-sage: #7cb9a8;
  --ghibli-cream: #f4e4bc;
  --ghibli-coral: #e8a87c;
  --ghibli-sky: #85cdca;
  --ghibli-rose: #c38d94;
  --ghibli-brown: #5a4a3a;
}

/* 柔和渐变背景 */
.ghibli-sky-gradient {
  background: linear-gradient(180deg, #87ceeb 0%, #b4e4f5 50%, #f4e4bc 100%);
}

/* 手绘风格边框 */
.ghibli-border {
  border: 2px solid rgba(212, 196, 154, 0.5);
  border-radius: 1.5rem;
}

/* 云朵样式 */
.ghibli-cloud {
  background: rgba(255, 255, 255, 0.5);
  border-radius: 9999px;
  filter: blur(4px);
}

/* 柔和阴影 */
.ghibli-shadow {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
}`,

  aiRules: `你是一个 Ghibli Style 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用锐利的直角边缘
- 使用高对比刺眼的配色
- 使用冰冷的科技感元素
- 过于复杂的动效

## 必须遵守

- 柔和色调 from-[#7cb9a8], bg-[#f4e4bc]
- 圆润形状 rounded-full, rounded-3xl, rounded-2xl
- 温和渐变 bg-gradient-to-b, bg-gradient-to-br
- 柔和阴影 shadow-[0_8px_30px_rgba(0,0,0,0.08)]
- 自然元素装饰

## 配色

主色调：
- 鼠尾草绿: #7cb9a8
- 奶油色: #f4e4bc
- 珊瑚橙: #e8a87c
- 天空蓝: #85cdca
- 玫瑰粉: #c38d94
- 深棕色: #5a4a3a (文字)

## 装饰元素

- 云朵形状
- 柔和的圆形
- 自然图案
- 渐变背景`,

  examplePrompts: [
    {
      title: "治愈系个人博客",
      titleEn: "Healing Personal Blog",
      description: "温暖治愈的个人博客",
      descriptionEn: "Warm and healing personal blog",
      prompt: `用 Ghibli Style 创建一个治愈系个人博客，要求：
1. 背景：天空到大地的柔和渐变
2. 装饰：云朵、自然元素
3. 配色：鼠尾草绿、奶油色、天空蓝
4. 圆润的卡片和按钮
5. 整体传递温暖治愈的感觉`,
    },
  ],
};
