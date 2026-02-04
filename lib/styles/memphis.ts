import { DesignStyle } from "./index";

export const memphis: DesignStyle = {
  slug: "memphis",
  name: "孟菲斯风格",
  nameEn: "Memphis",
  description:
    "80年代意大利设计运动，大胆的几何图形、鲜艳的撞色、不规则形状和有趣的图案，打破传统设计规则。",
  cover: "/styles/memphis.svg",
  styleType: "visual",
  tags: ["retro", "expressive", "high-contrast"],
  category: "retro",
  colors: {
    primary: "#ff6b6b",
    secondary: "#feca57",
    accent: ["#48dbfb", "#ff9ff3", "#1dd1a1", "#5f27cd"],
  },
  keywords: ["孟菲斯", "几何", "撞色", "80年代", "波普", "图案", "大胆"],

  philosophy: `Memphis（孟菲斯）是1980年代由意大利设计师 Ettore Sottsass 创立的设计运动，以打破传统、拥抱混乱和趣味性著称。

核心理念：
- 反叛传统：打破功能主义的严肃设计
- 大胆撞色：鲜艳、对比强烈的色彩组合
- 几何图形：圆形、三角形、波浪线的自由组合
- 趣味性：设计应该有趣、令人愉悦`,

  doList: [
    "使用鲜艳的撞色组合",
    "添加几何图形装饰（圆、三角、波浪）",
    "使用粗边框 border-4",
    "不规则的布局和形状",
    "添加点状、条纹、波浪图案",
    "使用粗体无衬线字体",
  ],

  dontList: [
    "禁止使用单调的配色",
    "禁止过于对称规整的布局",
    "禁止使用细边框",
    "禁止省略几何装饰元素",
  ],

  components: {
    button: {
      name: "按钮",
      description: "孟菲斯风格按钮",
      code: `<button className="
  relative px-8 py-4
  bg-yellow-400
  border-4 border-black
  text-black font-black uppercase
  shadow-[6px_6px_0px_#000]
  hover:shadow-[3px_3px_0px_#000]
  hover:translate-x-[3px] hover:translate-y-[3px]
  transition-all duration-150
">
  <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full" />
  Click Me!
</button>`,
    },
    card: {
      name: "卡片",
      description: "孟菲斯风格卡片",
      code: `<div className="
  relative p-8
  bg-pink-300
  border-4 border-black
  shadow-[8px_8px_0px_#000]
">
  {/* Decorative shapes */}
  <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full border-2 border-black" />
  <div className="absolute -bottom-3 -right-3 w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] border-b-cyan-400 border-r-[20px] border-r-transparent" />

  <h3 className="text-2xl font-black text-black mb-3">
    MEMPHIS
  </h3>
  <p className="text-black/80 font-medium">
    Bold, colorful, and fun!
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "孟菲斯风格输入框",
      code: `<input
  type="text"
  placeholder="Type here..."
  className="
    w-full px-6 py-4
    bg-white
    border-4 border-black
    text-black font-bold placeholder-gray-400
    shadow-[4px_4px_0px_#48dbfb]
    focus:shadow-[4px_4px_0px_#ff6b6b]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "孟菲斯风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-br from-yellow-300 via-pink-300 to-cyan-300
  relative overflow-hidden
  px-6 py-20
">
  {/* Decorative elements */}
  <div className="absolute top-20 left-20 w-20 h-20 bg-red-500 rounded-full border-4 border-black" />
  <div className="absolute bottom-32 right-20 w-16 h-16 bg-blue-500 border-4 border-black rotate-45" />
  <div className="absolute top-40 right-40 w-0 h-0 border-l-[30px] border-l-transparent border-b-[50px] border-b-green-400 border-r-[30px] border-r-transparent" />

  <div className="relative z-10 text-center">
    <h1 className="text-6xl md:text-8xl font-black text-black mb-6" style="text-shadow: 4px 4px 0 #ff6b6b, 8px 8px 0 #48dbfb">
      MEMPHIS
    </h1>
    <p className="text-xl font-bold text-black/80 mb-8">
      Design should be fun!
    </p>
    <button className="
      px-10 py-5
      bg-yellow-400
      border-4 border-black
      text-black font-black text-lg uppercase
      shadow-[8px_8px_0px_#000]
      hover:shadow-[4px_4px_0px_#000]
      hover:translate-x-1 hover:translate-y-1
      transition-all
    ">
      Let's Go!
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Memphis 全局样式 */

:root {
  --memphis-red: #ff6b6b;
  --memphis-yellow: #feca57;
  --memphis-cyan: #48dbfb;
  --memphis-pink: #ff9ff3;
  --memphis-green: #1dd1a1;
  --memphis-purple: #5f27cd;
}

/* 孟菲斯阴影 */
.memphis-shadow {
  box-shadow: 6px 6px 0px #000;
}

/* 波浪线背景 */
.memphis-waves {
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q25 0 50 10 T100 10' stroke='%23000' stroke-width='2' fill='none'/%3E%3C/svg%3E");
  background-repeat: repeat-x;
}

/* 点状图案 */
.memphis-dots {
  background-image: radial-gradient(#000 2px, transparent 2px);
  background-size: 20px 20px;
}

/* 条纹图案 */
.memphis-stripes {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    #000 10px,
    #000 12px
  );
}`,

  aiRules: `你是一个 Memphis 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用单调、低饱和度的配色
- 使用过于对称规整的布局
- 使用细边框 border
- 省略几何装饰元素

## 必须遵守

- 鲜艳撞色 bg-yellow-400, bg-pink-300, bg-cyan-400
- 粗边框 border-4 border-black
- 硬边阴影 shadow-[6px_6px_0px_#000]
- 几何装饰（圆形、三角形、方形）
- 粗体字 font-black, font-bold

## 配色

主色调：
- 红色: #ff6b6b, bg-red-500
- 黄色: #feca57, bg-yellow-400
- 青色: #48dbfb, bg-cyan-400
- 粉色: #ff9ff3, bg-pink-300
- 绿色: #1dd1a1, bg-green-400

## 装饰元素

- 圆形 rounded-full
- 三角形（用 border 实现）
- 方形 rotate-45
- 波浪线、点状、条纹图案`,

  examplePrompts: [
    {
      title: "创意工作室官网",
      titleEn: "Creative Studio Website",
      description: "大胆有趣的创意网站",
      descriptionEn: "Bold and fun creative website",
      prompt: `用 Memphis 风格创建一个创意工作室官网，要求：
1. 背景：多彩渐变 + 几何装饰
2. 标题：粗体 + 多层阴影
3. 卡片：粗边框 + 硬阴影
4. 按钮：鲜艳撞色
5. 添加圆形、三角形装饰`,
    },
  ],
};
