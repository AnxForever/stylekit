import { DesignStyle } from "./index";

export const midCenturyModern: DesignStyle = {
  slug: "mid-century-modern",
  name: "中世纪现代",
  nameEn: "Mid-Century Modern",
  description:
    "50年代原子时代设计美学，几何图案、有机曲线、饱和色彩。Eames椅、原子钟、星芒图案为灵感。",
  cover: "/styles/mid-century-modern.svg",
  styleType: "visual",
  tags: ["retro", "expressive"],
  category: "retro",
  colors: {
    primary: "#e8572a",
    secondary: "#f5f0e1",
    accent: ["#2a6e5e", "#c4a35a", "#3d3d3d"],
  },
  keywords: ["中世纪", "原子时代", "有机曲线", "星芒", "复古现代"],

  philosophy: `Mid-Century Modern（中世纪现代主义）是20世纪40-60年代盛行的设计运动，诞生于战后乐观主义与太空时代的交汇点。它追求形式与功能的完美统一，相信好的设计应该服务于日常生活。

核心美学源自"有机现代主义"理念：几何形态与自然曲线的融合。椭圆、肾形、星芒、原子模型等图案反复出现，体现了那个时代对科学进步与自然和谐的双重信仰。

配色上偏爱饱和但不刺眼的暖色调——焦橙、芥末黄、橄榄绿、孔雀蓝——搭配奶油白和深炭灰的中性底色。这些颜色从自然界与现代材料中提取，既温暖又克制。

排版注重清晰与可读性，偏好无衬线字体，字重适中，间距宽松。标题往往采用大写加宽字距，正文则保持舒适的行高。

在界面设计中，Mid-Century Modern 强调留白、网格对齐与视觉层次。卡片和容器使用微妙的圆角（而非尖锐直角），阴影柔和克制，整体传达一种既复古又永不过时的优雅感。`,

  doList: [
    "使用饱和暖色调 bg-[#e8572a] text-[#2a6e5e] 搭配奶油底 bg-[#f5f0e1]",
    "使用中等圆角 rounded-lg rounded-xl 模拟有机曲线",
    "使用宽松字距 tracking-wide tracking-wider 营造复古排版感",
    "添加微妙柔和的阴影 shadow-md shadow-lg 增加层次",
    "使用无衬线字体 font-sans 保持现代清晰感",
    "保持充足留白 p-8 p-12 gap-8 让设计呼吸",
    "使用 border-2 搭配风格色 border-[#e8572a] 强调几何结构",
    "利用 grid 和 flexbox 实现对称均衡的布局",
  ],

  dontList: [
    "禁止使用荧光色或霓虹色 bg-pink-500 text-cyan-400",
    "禁止使用尖锐直角 rounded-none 或极大圆角 rounded-full",
    "禁止使用重阴影 shadow-2xl 或发光效果",
    "禁止使用衬线字体 font-serif 或手写字体",
    "禁止使用渐变背景 bg-gradient-to-r 破坏平面色块感",
    "禁止密集排列内容，缺乏留白",
    "禁止使用纯黑背景 bg-black",
  ],

  components: {
    button: {
      name: "按钮",
      description: "中世纪现代风格按钮",
      code: `<button className="
  px-8 py-3
  bg-[#e8572a] text-[#f5f0e1]
  font-sans font-semibold uppercase tracking-wider text-sm
  rounded-lg
  border-2 border-[#3d3d3d]
  shadow-[4px_4px_0_#3d3d3d]
  hover:shadow-[6px_6px_0_#3d3d3d]
  hover:-translate-y-[2px] hover:-translate-x-[2px]
  active:shadow-none active:translate-y-[4px] active:translate-x-[4px]
  transition-all duration-150 ease-out
">
  Explore
</button>`,
    },
    card: {
      name: "卡片",
      description: "中世纪现代风格卡片",
      code: `<div className="
  group relative p-8
  bg-[#f5f0e1]
  border-2 border-[#3d3d3d]
  rounded-xl
  shadow-[4px_4px_0_#3d3d3d]
  hover:bg-[#efe9d3]
  hover:shadow-[8px_8px_0_#3d3d3d]
  hover:-translate-y-1 hover:-translate-x-1
  transition-all duration-200 ease-out
">
  {/* Starburst decoration */}
  <div className="absolute top-4 right-4 w-8 h-8">
    <div className="w-full h-full text-[#c4a35a] group-hover:rotate-45 group-hover:text-[#a88945] transition-all duration-500 ease-in-out">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12,0 14,9 24,9 16,14 18,24 12,18 6,24 8,14 0,9 10,9" />
      </svg>
    </div>
  </div>

  <div className="w-12 h-1 bg-[#e8572a] rounded-full mb-4 group-hover:w-20 transition-all duration-300 ease-out" />
  <h3 className="text-xl font-sans font-bold text-[#3d3d3d] tracking-wide mb-3 group-hover:text-[#e8572a] transition-colors duration-200">
    Atomic Living
  </h3>
  <p className="text-[#3d3d3d]/75 font-sans leading-relaxed">
    Timeless design for the modern home. Where form meets function in perfect, analog harmony.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "中世纪现代风格输入框",
      code: `<input
  type="text"
  placeholder="Your name..."
  className="
    w-full px-5 py-3
    bg-white
    border-2 border-[#3d3d3d]/30
    rounded-lg
    text-[#3d3d3d] placeholder-[#3d3d3d]/40
    font-sans tracking-wide
    focus:border-[#e8572a]
    focus:shadow-[0_0_0_3px_rgba(232,87,42,0.15)]
    focus:outline-none
    transition-all duration-200
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "中世纪现代风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#f5f0e1]
  relative overflow-hidden
">
  {/* Background geometric shapes */}
  <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-[#2a6e5e]/10" />
  <div className="absolute bottom-32 right-16 w-48 h-24 bg-[#c4a35a]/15 rounded-[40%_60%_60%_40%/60%_40%_60%_40%]" />
  <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-[#e8572a]/10 rotate-45" />

  <div className="relative z-10 text-center px-6 max-w-3xl">
    <div className="w-16 h-1 bg-[#e8572a] mx-auto mb-8 rounded-full" />
    <h1 className="text-5xl md:text-7xl font-sans font-bold text-[#3d3d3d] mb-6 tracking-wide">
      MID-CENTURY
    </h1>
    <p className="text-xl text-[#3d3d3d]/60 mb-10 tracking-wider font-sans">
      Where atomic age optimism meets organic modernism
    </p>
    <div className="flex gap-4 justify-center">
      <button className="
        px-10 py-4
        bg-[#e8572a] text-[#f5f0e1]
        font-sans font-semibold uppercase tracking-wider
        rounded-lg border-2 border-[#c4442020]
        shadow-[0_4px_0_#c4442020]
        hover:translate-y-[2px] hover:shadow-[0_2px_0_#c4442020]
        transition-all duration-200
      ">
        Discover
      </button>
      <button className="
        px-10 py-4
        bg-transparent text-[#3d3d3d]
        font-sans font-semibold uppercase tracking-wider
        rounded-lg border-2 border-[#3d3d3d]
        hover:bg-[#3d3d3d] hover:text-[#f5f0e1]
        transition-all duration-200
      ">
        Gallery
      </button>
    </div>
  </div>
</section>`,
    },
  },

  globalCss: `/* Mid-Century Modern 全局样式 */

:root {
  --mcm-orange: #e8572a;
  --mcm-cream: #f5f0e1;
  --mcm-teal: #2a6e5e;
  --mcm-gold: #c4a35a;
  --mcm-charcoal: #3d3d3d;
}

/* 有机形状 */
.mcm-organic {
  border-radius: 40% 60% 60% 40% / 60% 40% 60% 40%;
}

/* 星芒装饰 */
.mcm-starburst {
  background-image: conic-gradient(
    from 0deg,
    transparent 0deg 30deg,
    rgba(196, 163, 90, 0.08) 30deg 33deg,
    transparent 33deg 60deg
  );
}

/* 复古分隔线 */
.mcm-divider {
  height: 3px;
  background: var(--mcm-orange);
  border-radius: 999px;
  max-width: 80px;
}

/* 卡片悬浮效果 */
.mcm-card-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.mcm-card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 6px 6px 0 var(--mcm-charcoal);
}

/* 肾形容器 */
.mcm-kidney {
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
}`,

  aiRules: `你是一个 Mid-Century Modern 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用荧光色或霓虹色（pink-500, cyan-400, lime-400）
- 使用尖锐直角 rounded-none
- 使用纯黑背景 bg-black
- 使用渐变 bg-gradient-to-*
- 使用衬线字体 font-serif
- 使用重阴影或发光效果

## 必须遵守

- 奶油色底 bg-[#f5f0e1]
- 焦橙主色 text-[#e8572a] bg-[#e8572a]
- 孔雀蓝点缀 text-[#2a6e5e] bg-[#2a6e5e]
- 金色装饰 text-[#c4a35a]
- 炭灰文字 text-[#3d3d3d]
- 中等圆角 rounded-lg rounded-xl
- 无衬线字体 font-sans
- 宽字距 tracking-wide tracking-wider
- 充足留白 p-8 gap-8

## 配色

主色调：
- 焦橙: #e8572a
- 奶油白: #f5f0e1
- 孔雀蓝: #2a6e5e
- 金色: #c4a35a
- 炭灰: #3d3d3d

## 装饰元素

- 星芒图案
- 有机曲线形状
- 肾形和椭圆容器
- 色块分隔线
- 几何装饰图形

## Animation & Interaction Rules

- Analog Switch: 交互应模拟复古机械按键，active 以硬位移 + 阴影消失表达阻尼反馈。
- Brass Shimmer: 黄铜装饰（如星芒）在 hover 轻微旋转并加深色泽，营造金属反光。
- Retro Elevation: 卡片 hover 通过硬边阴影加长与轻微反向位移强化版画式层级。
- Warm Dimming: 奶油底色在交互时仅做轻微变暗，避免高对比闪烁或现代霓虹感。`,

  examplePrompts: [
    {
      title: "复古家居品牌官网",
      titleEn: "Retro Home Brand Website",
      description: "原子时代风格的家居品牌展示页",
      descriptionEn: "Atomic age style home brand showcase",
      prompt: `用 Mid-Century Modern 风格创建一个家居品牌官网，要求：
1. 背景：奶油白 #f5f0e1
2. 标题：炭灰无衬线字体 + 宽字距
3. 装饰：星芒图案 + 有机曲线形状
4. 按钮：焦橙色 + 中等圆角
5. 整体温暖、均衡、留白充足`,
    },
  ],
};
