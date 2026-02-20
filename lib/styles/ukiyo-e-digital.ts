import { DesignStyle } from "./index";

export const ukiyoEDigital: DesignStyle = {
  slug: "ukiyo-e-digital",
  name: "浮世绘数字风",
  nameEn: "Ukiyo-e Digital",
  description:
    "灵感源自日本浮世绘木版画，以靛蓝、朱红、金叶为主色调，扁平化设计、强烈的轮廓线、波浪纹样和北斋式构图，将传统东方美学融入现代数字界面。",
  cover: "/styles/ukiyo-e-digital.svg",
  styleType: "visual",
  tags: ["retro", "expressive"],
  category: "retro",
  colors: {
    primary: "#1a3055",
    secondary: "#f5f0e1",
    accent: ["#d4553a", "#c9a227", "#2a5a8c"],
  },
  keywords: ["浮世绘", "木版画", "北斋", "波浪", "和风", "扁平", "东方美学"],

  philosophy: `Ukiyo-e Digital（浮世绘数字风）将江户时代的木版画艺术转化为现代数字设计语言，保留其独特的扁平透视和色彩分区技法。

核心理念：
- 扁平透视：无景深的层叠式构图
- 色彩分区：大面积的纯色填充和强烈轮廓
- 自然意象：波浪、山川、花鸟的装饰性表达
- 东方韵味：含蓄、留白与意境的美学追求`,

  doList: [
    "使用靛蓝、朱红、金叶为主色调",
    "采用扁平设计和强烈的轮廓线",
    "使用硬边阴影模拟版画质感",
    "添加波浪和自然纹样装饰",
    "米白色为背景营造和纸质感",
    "使用粗体文字配合宽字距",
    "hover 采用木版错位：硬边偏移阴影 + 小幅位移，不用任何模糊",
    "active 模拟印章按压：取消阴影并切换朱红边框/文字反馈",
    "交互节奏保持短促硬切（duration-75~100, ease-linear）",
  ],

  dontList: [
    "禁止使用渐变阴影或柔和模糊",
    "禁止使用透明度和玻璃效果",
    "禁止使用西式圆角和圆形按钮",
    "禁止使用霓虹色或高饱和度现代色彩",
    "禁止弹簧式回弹和现代 App 的丝滑动效",
    "禁止软阴影与 glassmorphism 破坏木版硬朗质感",
  ],

  components: {
    button: {
      name: "按钮",
      description: "浮世绘数字风按钮",
      code: `<button className="
  px-10 py-3
  bg-[#d4553a] text-[#f5f0e1]
  border-[3px] border-[#1a3055]
  rounded-none font-bold tracking-widest uppercase
  shadow-[4px_4px_0px_#1a3055]
  hover:shadow-[8px_8px_0px_#1a3055]
  hover:-translate-y-1 hover:-translate-x-1
  active:shadow-none
  active:translate-y-[4px] active:translate-x-[4px]
  active:border-[#d4553a]
  transition-all duration-75 ease-linear
">
  Enter Domain
</button>`,
    },
    card: {
      name: "卡片",
      description: "浮世绘数字风卡片",
      code: `<div className="
  group p-8
  bg-[#f5f0e1]
  border-[3px] border-[#1a3055]
  rounded-none
  shadow-[6px_6px_0px_#1a3055]
  hover:shadow-[12px_12px_0px_#d4553a]
  hover:-translate-y-1.5 hover:-translate-x-1.5
  transition-all duration-100 ease-linear
  cursor-pointer
  relative overflow-hidden
">
  <div className="absolute top-4 right-4 w-8 h-8 border-[3px] border-[#d4553a] text-[#d4553a] flex items-center justify-center font-bold opacity-80 group-hover:opacity-100 group-hover:bg-[#d4553a] group-hover:text-[#f5f0e1] transition-colors duration-75">
    印
  </div>

  <h3 className="text-3xl font-black text-[#1a3055] tracking-widest mb-4 mt-2 group-hover:text-[#d4553a] transition-colors duration-75">
    GREAT WAVE
  </h3>
  <div className="w-16 h-1 bg-[#1a3055] mb-5 group-hover:bg-[#d4553a] transition-colors duration-75" />
  <p className="text-[#1a3055] font-bold leading-relaxed pr-8">
    Beneath the shadow of the mountain, the digital woodblock breathes. Hard edges, flat colors, and deliberate imperfections.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "浮世绘数字风输入框",
      code: `<input
  type="text"
  placeholder="Enter text..."
  className="
    w-full px-6 py-4
    bg-[#f5f0e1]
    border-2 border-[#1a3055]/60
    rounded-none
    text-[#1a3055] placeholder-[#1a3055]/40
    focus:border-[#d4553a]
    focus:shadow-[2px_2px_0px_#d4553a]
    focus:outline-none
    transition-all duration-75 ease-linear
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "浮世绘数字风 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-[#f5f0e1]
  relative overflow-hidden
">
  {/* Wave decoration */}
  <div className="absolute bottom-0 left-0 right-0 h-1/3">
    <svg viewBox="0 0 1200 300" className="w-full h-full fill-[#1a3055]/10">
      <path d="M0,150 Q150,50 300,150 T600,150 T900,150 T1200,150 L1200,300 L0,300 Z" />
    </svg>
  </div>

  {/* Sun circle */}
  <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-[#d4553a]/20 border-2 border-[#d4553a]/30" />

  <div className="relative z-10 text-center px-6">
    <h1 className="text-6xl md:text-8xl font-bold text-[#1a3055] tracking-wider mb-6">
      UKIYO-E
    </h1>
    <p className="text-xl text-[#1a3055]/70 tracking-widest mb-8">
      Floating world in digital form
    </p>
    <button className="
      px-10 py-4
      bg-[#d4553a] text-[#f5f0e1]
      border-2 border-[#1a3055]
      rounded-sm font-bold tracking-wider
      shadow-[4px_4px_0px_#1a3055]
      hover:shadow-[6px_6px_0px_#1a3055]
      hover:-translate-y-0.5
      transition-all duration-300
    ">
      Discover
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Ukiyo-e Digital 全局样式 */

:root {
  --ue-indigo: #1a3055;
  --ue-vermilion: #d4553a;
  --ue-gold: #c9a227;
  --ue-rice: #f5f0e1;
}

/* 硬边阴影 */
.ue-shadow {
  box-shadow: 4px 4px 0px var(--ue-indigo);
}

/* 波浪纹装饰 */
.ue-wave-bg {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,25 Q50,0 100,25 T200,25' fill='none' stroke='%231a3055' stroke-width='1' opacity='0.1'/%3E%3C/svg%3E");
  background-size: 200px 50px;
  background-repeat: repeat;
}

/* 和纸质感 */
.ue-washi {
  background-color: var(--ue-rice);
  background-image: radial-gradient(
    circle at 50% 50%,
    rgba(26, 48, 85, 0.02) 0%,
    transparent 80%
  );
}

/* 朱印效果 */
.ue-stamp {
  border: 2px solid var(--ue-vermilion);
  padding: 4px 8px;
  color: var(--ue-vermilion);
  font-weight: bold;
}`,

  aiRules: `你是一个 Ukiyo-e Digital 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用渐变阴影或柔和模糊效果
- 使用透明度和玻璃拟态
- 使用大圆角或圆形按钮
- 使用霓虹色或高饱和度现代色彩

## 必须遵守

- 靛蓝 #1a3055 为主色，朱红 #d4553a 为强调色
- 米白 #f5f0e1 为背景（和纸质感）
- 使用硬边阴影 shadow-[Xpx_Ypx_0px_color]
- 使用小圆角 rounded-sm 或直角
- 粗边框 border-2 营造版画轮廓感

## 配色

主色调：
- 靛蓝: #1a3055
- 朱红: #d4553a
- 金叶: #c9a227
- 米白: #f5f0e1

## 特殊元素

- 波浪纹 SVG 装饰
- 硬边阴影模拟版画质感
- 朱印/印章效果装饰
- 大面积扁平色块

## Animation & Interaction Rules

- Woodblock Offset: hover 必须使用硬边偏移阴影（无 blur）+ 轻微位移，模拟木版错位叠印。
- Stamp Press: active 瞬间取消阴影与位移，并切换朱红边框/文字反馈，表现印章压印。
- Zero Fluidity: 使用 duration-75 ease-linear 或 transition-none，拒绝现代丝滑动效。
- Motif Reveal: 波纹/云纹等传统图案可在 hover 进行不透明度硬切，强化版面层次。`,

  examplePrompts: [
    {
      title: "浮世绘风展示页",
      titleEn: "Ukiyo-e Exhibition Page",
      description: "木版画风格的展示页面",
      descriptionEn: "Woodblock print style exhibition page",
      prompt: `用 Ukiyo-e Digital 风格创建一个展示页面，要求：
1. 背景：米白色和纸质感
2. 标题：靛蓝粗体字，宽字距
3. 卡片：硬边阴影，强轮廓
4. 添加波浪纹和朱红装饰元素
5. 整体东方木版画美学`,
    },
  ],
};
