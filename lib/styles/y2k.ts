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
      code: `<button className="px-10 py-4 bg-gradient-to-b from-gray-100 via-white to-gray-300 rounded-full text-[#ff1493] font-black uppercase tracking-widest border-2 border-white shadow-[0_5px_15px_rgba(0,255,255,0.4),inset_0_2px_4px_rgba(255,255,255,1)] hover:shadow-[0_10px_25px_rgba(255,20,147,0.5),inset_0_4px_8px_rgba(255,255,255,1)] hover:-translate-y-1 hover:scale-105 active:scale-90 active:shadow-[0_2px_5px_rgba(0,255,255,0.4)] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
  Cyber Love
</button>`,
    },
    card: {
      name: "卡片",
      description: "Y2K风格卡片，透明气泡感",
      code: `<div className="group p-8 bg-gradient-to-br from-white/70 to-[#ff69b4]/20 backdrop-blur-xl rounded-[2.5rem] border-2 border-white shadow-[0_10px_30px_rgba(0,255,255,0.2)] hover:shadow-[0_15px_40px_rgba(255,105,180,0.3)] hover:-translate-y-2 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] relative overflow-hidden">
  <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-tr from-[#00ffff] to-[#ff69b4] blur-md opacity-60 group-hover:scale-150 group-hover:translate-x-2 transition-transform duration-500 ease-out" />
  <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-tr from-[#b142fe] to-[#00ffff] blur-lg opacity-40 group-hover:scale-125 group-hover:-translate-y-4 transition-transform duration-500 ease-out" />
  <div className="relative z-10">
    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] group-hover:rotate-12 transition-transform">
      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#ff69b4] to-[#00ffff]" />
    </div>
    <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff69b4] via-[#b142fe] to-[#00ffff] mb-3 group-hover:tracking-wider transition-all duration-300">
      FUTURE IS NOW
    </h3>
    <p className="text-gray-700 font-bold leading-relaxed">
      Welcome to the new millennium. Glossy buttons, iridescent glows, absolute digital optimism.
    </p>
  </div>
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
    <div className="inline-flex items-center justify-center mb-6">
      <div className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 p-[2px] shadow-[0_10px_40px_rgba(255,105,180,0.35)]">
        <div className="h-full w-full rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center">
          <div className="h-6 w-6 rotate-45 rounded-sm bg-gradient-to-r from-pink-400 to-cyan-400 opacity-90" />
        </div>
      </div>
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
      Enter the Future
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

- 星星/闪光装饰
- 气泡球体
- 彩虹渐变
- 透明塑料质感

## 动效与交互规则

- 液态金属（Chrome Liquid）：交互必须传达"液态金属"或"塑料果冻"质感。悬停时金属渐变通过高亮内阴影增强（如 \`hover:shadow-[inset_0_4px_8px_rgba(255,255,255,1)]\`），模拟光泽在金属表面滑过的 3D 反光感。
- 气泡弹跳（Bubble Pop）：Y2K 充满乐观和玩具感。必须使用弹性自定义缓动 \`ease-[cubic-bezier(0.34,1.56,0.64,1)]\`，悬停时夸张放大（\`hover:scale-105\` 或 \`hover:-translate-y-1\`），点击时如果冻般挤压（\`active:scale-90\`）。
- 镭射炫光（CD Glare）：阴影颜色必须使用高饱和度青色（#00ffff）和粉色（#ff69b4）的混合光晕，模拟 CD 光盘的镭射反光。禁止使用黑色阴影。
- 熔岩灯效果：卡片内的圆形气泡装饰在悬停时产生非对称移动或拉伸，就像熔岩灯中的液滴上升。`,

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
