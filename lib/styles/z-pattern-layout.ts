import { DesignStyle } from "./index";

export const zPatternLayout: DesignStyle = {
  slug: "z-pattern-layout",
  name: "Z型布局",
  nameEn: "Z-Pattern Layout",
  description:
    "基于眼动追踪的Z型扫描布局，视线从左上到右上，斜穿到左下再到右下，形成Z字路径。适合着陆页、营销页面和简洁信息展示。",
  cover: "/styles/z-pattern-layout.svg",
  styleType: "layout",
  tags: ["modern", "responsive"],
  compatibleWith: ["modern-gradient", "apple-style", "stripe-style", "minimalist-flat", "corporate-clean"],
  category: "modern",
  colors: {
    primary: "#0f172a",
    secondary: "#ffffff",
    accent: ["#6366f1", "#06b6d4", "#f59e0b", "#ec4899"],
  },
  keywords: ["Z型", "着陆页", "营销", "视觉引导", "CTA", "扫描路径"],

  philosophy: `Z-Pattern Layout 基于用户在视觉简洁页面上的自然扫描路径。视线从左上角（logo/品牌）移到右上角（CTA），然后斜穿到左下角，最后移至右下角（最终CTA）。

核心理念：
- 视觉引导：利用Z型路径引导用户完成预设的信息接收顺序
- 关键点位：四个角是最重要的信息放置点
- 简洁明了：适合内容较少但需要强转化的页面
- 层层推进：每一行都是一个信息层级`,

  doList: [
    "左上角放置 logo/品牌标识",
    "右上角放置导航或首要 CTA",
    "中间区域放置核心价值主张",
    "左下角放置辅助信息或信任标识",
    "右下角放置最终 CTA 按钮",
    "每一行信息独立完整，层层递进",
  ],

  dontList: [
    "禁止在Z路径上放置不重要的内容",
    "禁止打断Z型视觉流动",
    "禁止使用过多的内容干扰路径",
    "禁止将 CTA 放在路径之外",
    "禁止让页面过于复杂和拥挤",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Z型布局中的 CTA 按钮",
      code: `<button className="
  px-8 py-4
  bg-[#6366f1] text-white
  rounded-xl
  font-semibold text-lg
  shadow-lg shadow-[#6366f1]/25
  hover:shadow-xl hover:shadow-[#6366f1]/30 hover:-translate-y-0.5
  transition-all duration-300
">
  Get Started
</button>`,
    },
    card: {
      name: "卡片",
      description: "Z型布局中的特性卡片",
      code: `<div className="
  p-8
  bg-white
  rounded-2xl
  shadow-sm
  border border-gray-100
  text-center
  hover:shadow-md
  transition-shadow
">
  <div className="w-14 h-14 bg-[#6366f1]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
    <svg className="w-7 h-7 text-[#6366f1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
  </div>
  <h3 className="text-lg font-semibold text-[#0f172a] mb-2">
    Feature
  </h3>
  <p className="text-gray-600 text-sm">
    Brief description of this feature
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "邮箱订阅输入框",
      code: `<div className="flex gap-3">
  <input
    type="email"
    placeholder="Enter your email..."
    className="
      flex-1 px-4 py-3
      bg-white
      border border-gray-200
      rounded-xl
      text-[#0f172a] placeholder-gray-400
      focus:outline-none focus:ring-2 focus:ring-[#6366f1]/20
      focus:border-[#6366f1]
      transition-all
    "
  />
  <button className="px-6 py-3 bg-[#6366f1] text-white rounded-xl font-medium">
    Subscribe
  </button>
</div>`,
    },
    hero: {
      name: "Z型布局完整示例",
      description: "Z型布局的完整着陆页",
      code: `<div className="min-h-screen bg-white">
  {/* Z的第一笔横线：Logo(左) → CTA(右) */}
  <header className="px-6 py-4">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <div className="text-xl font-bold text-[#0f172a]">Brand</div>
      <button className="px-4 py-2 bg-[#6366f1] text-white rounded-lg text-sm font-medium">
        Sign Up
      </button>
    </div>
  </header>

  {/* Z的对角线：核心内容区 */}
  <section className="px-6 py-20">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-bold text-[#0f172a] mb-6">
        Build Something Amazing
      </h1>
      <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
        The fastest way to build modern applications with everything you need.
      </p>
      <div className="flex gap-3 justify-center">
        <button className="px-8 py-4 bg-[#6366f1] text-white rounded-xl font-semibold shadow-lg shadow-[#6366f1]/25">
          Start Free Trial
        </button>
        <button className="px-8 py-4 border border-gray-200 rounded-xl font-semibold text-[#0f172a]">
          Learn More
        </button>
      </div>
    </div>
  </section>

  {/* Z的第二笔横线：信任标识(左) → 最终CTA(右) */}
  <section className="px-6 py-16 bg-gray-50">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-8">
        <span className="text-sm text-gray-500">Trusted by 10,000+ teams</span>
      </div>
      <button className="px-6 py-3 bg-[#0f172a] text-white rounded-xl font-medium">
        Start Building
      </button>
    </div>
  </section>
</div>`,
    },
  },

  globalCss: `/* Z-Pattern Layout 全局样式 */

/* Z型布局容器 */
.z-layout {
  max-width: 1200px;
  margin: 0 auto;
}

/* Z的第一行：品牌 + 导航/CTA */
.z-top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
}

/* Z的对角线区域：核心内容 */
.z-diagonal {
  text-align: center;
  padding: 5rem 1.5rem;
  max-width: 800px;
  margin: 0 auto;
}

/* Z的第二行：信任 + 最终CTA */
.z-bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1.5rem;
}

/* Z路径上的关键点 */
.z-point {
  position: relative;
}

.z-point::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background: #6366f1;
  border-radius: 50%;
}

/* 响应式 */
@media (max-width: 768px) {
  .z-top-bar,
  .z-bottom-bar {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  .z-diagonal {
    padding: 3rem 1.5rem;
  }
}`,

  aiRules: `你是一个 Z-Pattern Layout 布局专家。生成的所有代码必须严格遵守以下约束：

## 布局规则

Z型路径的四个关键点：
1. 左上角：Logo / 品牌标识
2. 右上角：导航 / 首要 CTA
3. 中间对角线：核心价值主张 / 主要内容
4. 左下角：信任标识 / 社会证明
5. 右下角：最终 CTA 按钮

## 内容规则

- 每一行信息独立完整
- 第一行建立品牌认知
- 对角线区域传递核心价值
- 最后一行促进转化
- 内容简洁，避免干扰路径

## 视觉引导

- 使用对比色突出 CTA
- 使用留白引导视线流动
- 中间区域使用居中布局
- 头尾使用 flex justify-between

## 响应式

桌面端：完整Z型路径
平板端：保持Z型，缩小间距
手机端：垂直堆叠，保持优先级顺序

## 自检

1. Logo在左上，CTA在右上
2. 核心内容居中显示
3. 最终CTA在右下
4. 视觉路径清晰流畅
5. 页面简洁不拥挤`,

  examplePrompts: [
    {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "Z型布局的 SaaS 产品着陆页",
      descriptionEn: "Z-pattern SaaS landing page",
      prompt: `用 Z-Pattern Layout 设计一个 SaaS 着陆页，要求：
1. 左上角：产品 logo
2. 右上角：Sign Up 按钮
3. 中间：产品标语 + 核心功能概述 + 主CTA
4. 中部：3个特性卡片
5. 底部左侧：客户logo/信任标识
6. 底部右侧：最终 CTA
7. 整体简洁，引导用户沿Z路径浏览`,
    },
  ],
};
