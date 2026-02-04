import { DesignStyle } from "./index";

export const y2k: DesignStyle = {
  slug: "y2k",
  name: "千禧风格",
  nameEn: "Y2K",
  description:
    "2000年代初的未来主义美学，金属质感、透明塑料、气泡元素、银色和彩虹渐变，充满对数字时代的乐观想象。",
  cover: "/styles/y2k.svg",
  styleType: "visual",
  tags: ["retro", "expressive"],
  category: "retro",
  colors: {
    primary: "#c0c0c0",
    secondary: "#ff69b4",
    accent: ["#00ffff", "#ff00ff", "#87ceeb"],
  },
  keywords: ["Y2K", "千禧", "未来主义", "金属", "透明", "气泡", "2000年代"],

  philosophy: `Y2K（千禧风格）是1990年代末至2000年代初的设计美学，反映了人们对新千年和数字未来的乐观想象。

核心理念：
- 未来感：对数字时代的乐观憧憬
- 金属质感：银色、铬合金、反光材质
- 透明元素：透明塑料、气泡、水滴效果
- 彩虹渐变：全息效果、彩虹反光`,

  doList: [
    "使用银色/金属渐变 bg-gradient-to-r from-gray-300 via-white to-gray-300",
    "添加气泡/球体装饰元素",
    "使用透明/半透明效果 bg-white/30 backdrop-blur",
    "彩虹渐变文字效果",
    "圆润的未来感造型 rounded-full",
    "添加星星、闪光装饰",
  ],

  dontList: [
    "禁止使用暗沉的配色",
    "禁止使用过于扁平的设计",
    "禁止省略光泽/反光效果",
    "禁止使用粗糙的纹理",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Y2K风格按钮，金属光泽",
      code: `<button className="
  px-8 py-4
  bg-gradient-to-b from-gray-200 via-white to-gray-300
  rounded-full
  text-gray-700 font-bold
  border border-white/50
  shadow-[0_4px_15px_rgba(0,0,0,0.1),inset_0_2px_3px_rgba(255,255,255,0.8)]
  hover:shadow-[0_6px_20px_rgba(0,0,0,0.15),inset_0_2px_3px_rgba(255,255,255,0.9)]
  hover:scale-105
  transition-all duration-300
">
  Click Me ✨
</button>`,
    },
    card: {
      name: "卡片",
      description: "Y2K风格卡片，透明气泡感",
      code: `<div className="
  p-8
  bg-gradient-to-br from-white/60 to-pink-100/40
  backdrop-blur-md
  rounded-3xl
  border border-white/60
  shadow-[0_8px_32px_rgba(0,0,0,0.1)]
">
  <div className="flex items-center gap-3 mb-4">
    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-pink-400" />
    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400" />
    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400" />
  </div>
  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mb-3">
    Future is Now
  </h3>
  <p className="text-gray-600">
    Welcome to the new millennium
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Y2K风格输入框",
      code: `<input
  type="text"
  placeholder="Type here..."
  className="
    w-full px-6 py-4
    bg-gradient-to-b from-white to-gray-100
    rounded-full
    border border-gray-200
    text-gray-700 placeholder-gray-400
    shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)]
    focus:border-pink-300
    focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.05),0_0_0_3px_rgba(255,105,180,0.2)]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "Y2K风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-br from-pink-100 via-white to-cyan-100
  relative overflow-hidden
">
  {/* Floating bubbles */}
  <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-pink-200/50 to-transparent blur-xl" />
  <div className="absolute bottom-32 right-32 w-48 h-48 rounded-full bg-gradient-to-br from-cyan-200/50 to-transparent blur-xl" />

  <div className="relative z-10 text-center px-6">
    <div className="inline-block mb-6">
      <span className="text-6xl">✨</span>
    </div>
    <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-6">
      Y2K AESTHETIC
    </h1>
    <p className="text-xl text-gray-500 mb-8">
      The future is bright and shiny
    </p>
    <button className="
      px-10 py-4
      bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400
      rounded-full
      text-white font-bold
      shadow-[0_4px_20px_rgba(255,105,180,0.4)]
      hover:shadow-[0_6px_30px_rgba(255,105,180,0.6)]
      hover:scale-105
      transition-all
    ">
      Enter the Future ✨
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Y2K 全局样式 */

:root {
  --y2k-silver: #c0c0c0;
  --y2k-pink: #ff69b4;
  --y2k-cyan: #00ffff;
  --y2k-purple: #ff00ff;
}

/* 金属光泽效果 */
.y2k-metallic {
  background: linear-gradient(
    135deg,
    #e8e8e8 0%,
    #ffffff 25%,
    #e8e8e8 50%,
    #ffffff 75%,
    #e8e8e8 100%
  );
}

/* 彩虹渐变文字 */
.y2k-rainbow-text {
  background: linear-gradient(90deg, #ff69b4, #00ffff, #ff00ff, #ff69b4);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: rainbow 3s linear infinite;
}

@keyframes rainbow {
  to { background-position: 200% center; }
}

/* 气泡效果 */
.y2k-bubble {
  background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), transparent);
  border-radius: 50%;
}`,

  aiRules: `你是一个 Y2K 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用暗沉、灰暗的配色
- 使用过于扁平的设计
- 省略光泽和反光效果
- 使用尖锐的直角

## 必须遵守

- 金属渐变 bg-gradient-to-b from-gray-200 via-white to-gray-300
- 圆润造型 rounded-full, rounded-3xl
- 透明效果 bg-white/60 backdrop-blur
- 彩虹渐变 from-pink-400 via-purple-400 to-cyan-400
- 气泡/球体装饰元素

## 配色

主色调：
- 银色: #c0c0c0, from-gray-300
- 粉色: #ff69b4, from-pink-400
- 青色: #00ffff, from-cyan-400
- 紫色: #ff00ff, from-purple-400

## 装饰元素

- 星星 ✨
- 气泡球体
- 彩虹渐变
- 透明塑料质感`,

  examplePrompts: [
    {
      title: "时尚品牌官网",
      titleEn: "Fashion Brand Website",
      description: "千禧风格时尚网站",
      descriptionEn: "Y2K fashion website",
      prompt: `用 Y2K 风格创建一个时尚品牌官网，要求：
1. 背景：粉白渐变 + 气泡装饰
2. 导航：透明毛玻璃效果
3. 产品卡片：金属光泽边框
4. 按钮：圆润 + 彩虹渐变
5. 添加星星闪光装饰`,
    },
  ],
};
