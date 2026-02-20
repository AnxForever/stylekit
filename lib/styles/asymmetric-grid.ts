import { DesignStyle } from "./index";

export const asymmetricGrid: DesignStyle = {
  slug: "asymmetric-grid",
  name: "非对称网格",
  nameEn: "Asymmetric Grid",
  description:
    "打破传统对称网格的布局方式，通过不规则的列宽、重叠元素和视觉张力创造动态有趣的页面结构，适合创意作品集、艺术展览和品牌展示。",
  cover: "/styles/asymmetric-grid.svg",
  styleType: "layout",
  tags: ["modern", "expressive", "high-contrast"],
  compatibleWith: ["editorial", "neo-brutalist", "geometric-bold", "swiss-style"],
  category: "modern",
  colors: {
    primary: "#0f0f0f",
    secondary: "#ffffff",
    accent: ["#ff3366", "#00d4ff", "#ffcc00"],
  },
  keywords: ["非对称", "网格", "不规则", "动态", "张力", "重叠", "创意"],

  philosophy: `Asymmetric Grid 打破传统网格的均匀分布，通过不等宽列、元素重叠和留白对比创造视觉张力。

核心理念：
- 打破对称：故意使用不等宽的列和行
- 视觉张力：通过大小对比和位置偏移创造动感
- 留白即内容：大面积留白与密集区域形成对比
- 层次重叠：允许元素相互重叠产生深度感
- 空间突围：交互时元素从杂乱网格中"跳"到最前面`,

  doList: [
    "使用 CSS Grid 的 grid-template-columns 定义不等宽列",
    "允许元素跨越多列多行 col-span-2 row-span-3",
    "使用 -translate 和 z-index 创造重叠效果",
    "保持足够的留白与密集区域对比",
    "使用大小差异明显的字体层级",
    "让图片和内容块突破网格边界",
    "悬停时大幅提升 z-index 和 scale，让元素从网格中弹出",
    "使用硬边阴影（shadow-[Xpx_Ypx_0px_color]）强化物理剥离感",
    "卡片内部标题/标签以不同 delay 位移，创造视差错位",
  ],

  dontList: [
    "禁止所有列宽完全相等",
    "禁止元素整齐对齐毫无变化",
    "禁止忽略移动端的响应式调整",
    "禁止过度杂乱失去可读性",
    "禁止所有元素大小相近",
    "禁止使用柔和阴影（shadow-sm, shadow-md）",
    "禁止使用过长的 duration（不超过 300ms）",
  ],

  components: {
    button: {
      name: "按钮",
      description: "动态偏移硬边阴影按钮",
      code: `<button className="
  relative px-8 py-4
  bg-[#0f0f0f] text-white
  font-bold uppercase tracking-widest
  hover:-translate-x-2 hover:-translate-y-2
  hover:shadow-[6px_6px_0px_#ff3366]
  active:translate-x-0 active:translate-y-0 active:shadow-none
  transition-all duration-200 ease-out
">
  Explore
</button>`,
    },
    card: {
      name: "不规则卡片",
      description: "可重叠卡片，悬停时空间突围 + 内部视差",
      code: `<div className="
  group relative p-8
  bg-white
  border-2 border-[#0f0f0f]
  -rotate-2
  hover:rotate-1 hover:scale-105 hover:z-50
  hover:-translate-y-4
  hover:shadow-[8px_8px_0px_#ff3366]
  transition-all duration-300 ease-out
">
  <span className="inline-block text-xs uppercase tracking-widest text-gray-500 bg-gray-100 px-2 py-1 group-hover:-translate-y-2 group-hover:bg-[#ff3366] group-hover:text-white transition-all duration-300">Featured</span>
  <h3 className="text-3xl font-bold mt-4 mb-4 group-hover:translate-x-2 transition-transform duration-300 delay-75">Breaking the Grid</h3>
  <p className="text-gray-600 group-hover:translate-x-1 transition-transform duration-300 delay-100">Asymmetry creates visual tension and dynamic spatial interest.</p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "带偏移标签的输入框",
      code: `<div className="relative">
  <label className="
    absolute -top-3 left-4
    bg-white px-2
    text-xs uppercase tracking-widest
    text-[#0f0f0f]
  ">Email</label>
  <input
    type="email"
    className="
      w-full px-4 py-4
      border-2 border-[#0f0f0f]
      bg-transparent
      focus:border-[#ff3366]
      focus:shadow-[4px_4px_0px_#ff3366]
      focus:outline-none
      transition-all duration-200 ease-out
    "
    placeholder="your@email.com"
  />
</div>`,
    },
    nav: {
      name: "非对称导航",
      description: "偏移效果的导航栏",
      code: `<nav className="
  flex items-center justify-between
  px-8 py-6
  border-b-2 border-[#0f0f0f]
">
  <span className="text-2xl font-bold tracking-tighter">ASYMM.</span>
  <div className="flex gap-8">
    <a href="#" className="uppercase tracking-widest text-sm hover:text-[#ff3366] hover:-translate-y-1 transition-all duration-200">Work</a>
    <a href="#" className="uppercase tracking-widest text-sm hover:text-[#ff3366] hover:-translate-y-1 transition-all duration-200">About</a>
    <a href="#" className="uppercase tracking-widest text-sm hover:text-[#ff3366] hover:-translate-y-1 transition-all duration-200">Contact</a>
  </div>
</nav>`,
    },
    hero: {
      name: "非对称 Hero",
      description: "打破对称的主视觉区域",
      code: `<div className="
  grid grid-cols-12
  min-h-[80vh]
  relative
">
  <div className="col-span-8 bg-[#0f0f0f] p-16 flex flex-col justify-end">
    <h1 className="text-8xl font-bold text-white leading-none">
      CREATIVE<br/>TENSION
    </h1>
  </div>
  <div className="col-span-4 bg-[#ff3366] p-8 flex items-center">
    <p className="text-white text-xl">Breaking symmetry to create visual interest</p>
  </div>
  <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-[#ffcc00] p-6 z-20 hover:-translate-y-2 hover:shadow-[6px_6px_0px_#0f0f0f] transition-all duration-200">
    <span className="text-sm uppercase tracking-widest font-bold">Scroll to explore</span>
  </div>
</div>`,
    },
  },

  globalCss: `/* Asymmetric Grid 全局样式 */
.asymmetric-grid {
  --ag-black: #0f0f0f;
  --ag-accent: #ff3366;
  --ag-secondary: #00d4ff;
  --ag-tertiary: #ffcc00;
}

/* 硬边阴影弹出 */
.ag-pop {
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;
}

.ag-pop:hover {
  transform: translate(-4px, -4px);
  box-shadow: 8px 8px 0 var(--ag-accent);
}

.ag-pop:active {
  transform: translate(0, 0);
  box-shadow: none;
}`,

  aiRules: `你是 Asymmetric Grid 布局专家。生成代码必须遵守：

## 布局规则
- 使用 CSS Grid 12列系统，但列宽必须不相等
- 允许元素重叠，使用 z-index 控制层级
- 使用 -translate 创造偏移效果
- 保持视觉张力：大面积留白与密集区域对比

## Animation & Interaction Rules
- Spatial Tension: 悬停时大幅提升 z-index（z-50）并使用 scale-105，让元素从杂乱网格中"跳"到最前面。
- Hard Popping: 使用干脆的 ease-out 配合 duration-200 到 duration-300，配合高对比度硬阴影（shadow-[8px_8px_0px_color]）。
- Parallax Content: 卡片内部的标题、标签和描述在悬停时以不同的 delay（delay-75, delay-100）和 translate 距离位移，造成排版错位。
- Physical Feedback: active 状态归零 translate 和 shadow，模拟按压弹回。

## 禁止
- 所有列宽相等的对称布局
- 圆角设计（rounded-lg, rounded-xl）
- 柔和阴影（shadow-sm, shadow-md）
- 超过 duration-300 的过渡时间`,
};
