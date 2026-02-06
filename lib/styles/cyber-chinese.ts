import { DesignStyle } from "./index";

export const cyberChinese: DesignStyle = {
  slug: "cyber-chinese",
  name: "赛博中华风",
  nameEn: "Cyber Chinese",
  description:
    "传统中华美学与赛博朋克科幻的碰撞融合，朱红金黄搭配霓虹蓝紫，龙凤印章与霓虹灯笼交织的未来东方幻想。",
  cover: "/styles/cyber-chinese.svg",
  styleType: "visual",
  tags: ["expressive", "modern", "high-contrast"],
  category: "expressive",
  colors: {
    primary: "#d4553a",
    secondary: "#c9a227",
    accent: ["#00d4ff", "#a020f0", "#0a0a0a"],
  },
  keywords: ["赛博朋克", "中华风", "霓虹", "龙凤", "印章", "灯笼", "未来东方"],

  philosophy: `Cyber Chinese（赛博中华）是传统中国美学与赛博朋克科幻风格的融合，在暗色基底上用霓虹光效重新演绎东方经典元素。

核心理念：
- 古今碰撞：传统朱红金黄与霓虹蓝紫并存
- 东方未来：龙凤图腾、印章纹样被赛博化重构
- 霓虹灯笼：传统灯笼造型发出赛博光芒
- 锐利线条：直角硬朗造型体现科技感`,

  doList: [
    "使用朱红 #d4553a 和金黄 #c9a227 为主色调",
    "搭配霓虹蓝 #00d4ff 和霓虹紫 #a020f0",
    "使用直角无圆角的锐利造型",
    "添加霓虹发光效果",
    "融入中国传统纹样元素（如印章、云纹）",
    "深色背景为主基调",
  ],

  dontList: [
    "禁止使用明亮白色背景",
    "禁止使用柔和圆润的造型",
    "禁止省略霓虹发光效果",
    "禁止使用过于西式的装饰元素",
  ],

  components: {
    button: {
      name: "按钮",
      description: "赛博中华风格按钮",
      code: `<button className="
  px-8 py-4
  bg-[#d4553a]
  border border-[#c9a227]
  text-white font-bold tracking-wider
  shadow-[0_0_16px_rgba(212,85,58,0.5)]
  hover:shadow-[0_0_24px_rgba(201,162,39,0.6)]
  hover:border-[#c9a227]
  transition-all duration-300
">
  Enter
</button>`,
    },
    card: {
      name: "卡片",
      description: "赛博中华风格卡片",
      code: `<div className="
  p-8
  bg-[#0a0a0a]/90
  border border-[#d4553a]/40
  shadow-[0_0_16px_rgba(212,85,58,0.3)]
">
  <h3 className="text-2xl font-bold text-[#c9a227] mb-3">
    CYBER ORIENT
  </h3>
  <p className="text-[#00d4ff]/70">
    Where tradition meets tomorrow
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "赛博中华风格输入框",
      code: `<input
  type="text"
  placeholder="Enter text..."
  className="
    w-full px-6 py-4
    bg-[#0a0a0a]/80
    border border-[#c9a227]/40
    text-[#00d4ff] placeholder-[#c9a227]/40
    focus:border-[#00d4ff]
    focus:shadow-[0_0_16px_rgba(0,212,255,0.5)]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "赛博中华风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#0a0a0a]
  relative overflow-hidden
">
  {/* Neon grid background */}
  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(212,85,58,0.1)_1px,transparent_1px),linear-gradient(rgba(201,162,39,0.1)_1px,transparent_1px)] bg-[size:60px_60px]" />

  {/* Seal stamp decoration */}
  <div className="absolute top-20 right-20 w-24 h-24 border-2 border-[#d4553a] rotate-12 flex items-center justify-center">
    <span className="text-[#d4553a] text-3xl font-bold">印</span>
  </div>

  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#d4553a] to-[#c9a227] mb-6">
      CYBER CHINESE
    </h1>
    <p className="text-xl text-[#00d4ff]/80 mb-8">
      Where tradition meets tomorrow
    </p>
    <button className="
      px-10 py-4
      bg-gradient-to-r from-[#d4553a] to-[#c9a227]
      text-white font-bold tracking-wider
      shadow-[0_0_24px_rgba(212,85,58,0.5)]
      hover:shadow-[0_0_40px_rgba(201,162,39,0.7)]
      transition-all
    ">
      Explore
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Cyber Chinese 全局样式 */

:root {
  --cc-vermilion: #d4553a;
  --cc-gold: #c9a227;
  --cc-black: #0a0a0a;
  --cc-neon-blue: #00d4ff;
  --cc-neon-purple: #a020f0;
}

/* 霓虹发光 */
.cc-neon-glow {
  text-shadow:
    0 0 10px var(--cc-neon-blue),
    0 0 20px var(--cc-neon-blue),
    0 0 40px var(--cc-neon-blue);
}

/* 朱红霓虹 */
.cc-vermilion-glow {
  text-shadow:
    0 0 10px var(--cc-vermilion),
    0 0 20px var(--cc-vermilion);
}

/* 印章样式 */
.cc-seal {
  border: 2px solid var(--cc-vermilion);
  padding: 0.5em;
  transform: rotate(5deg);
  color: var(--cc-vermilion);
  font-weight: bold;
}

/* 赛博网格 */
.cc-grid {
  background-image:
    linear-gradient(90deg, rgba(212, 85, 58, 0.1) 1px, transparent 1px),
    linear-gradient(rgba(201, 162, 39, 0.1) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* 灯笼阴影 */
.cc-lantern-glow {
  box-shadow:
    0 0 20px rgba(212, 85, 58, 0.4),
    0 0 40px rgba(201, 162, 39, 0.2);
}`,

  aiRules: `你是一个 Cyber Chinese 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用明亮白色背景
- 使用柔和圆润造型（rounded-lg, rounded-full）
- 省略霓虹发光效果
- 使用过于西式的装饰元素
- 使用 emoji

## 必须遵守

- 朱红 #d4553a 和金黄 #c9a227 为主色
- 霓虹蓝 #00d4ff 和霓虹紫 #a020f0 为辅色
- 深黑背景 bg-[#0a0a0a]
- 直角无圆角 rounded-none
- 霓虹发光效果 shadow-[0_0_Xpx_rgba(...)]
- 中国传统纹样元素

## 配色

主色调：
- 朱红: #d4553a
- 金黄: #c9a227
- 深黑: #0a0a0a
- 霓虹蓝: #00d4ff
- 霓虹紫: #a020f0

## 特殊元素

- 印章纹样
- 龙凤图腾
- 云纹装饰
- 灯笼造型
- 赛博网格`,

  examplePrompts: [
    {
      title: "东方赛博落地页",
      titleEn: "Oriental Cyberpunk Landing",
      description: "融合中华传统与赛博朋克的品牌页面",
      descriptionEn: "Brand page fusing Chinese tradition with cyberpunk",
      prompt: `用 Cyber Chinese 风格创建一个东方赛博落地页，要求：
1. 背景：深黑 + 赛博网格
2. 标题：朱红金黄渐变 + 霓虹发光
3. 装饰：印章、云纹、灯笼元素
4. 按钮：朱红底色 + 金色边框
5. 整体东方未来科幻感`,
    },
  ],
};
