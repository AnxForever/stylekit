import { DesignStyle } from "./index";

export const skeuomorphism: DesignStyle = {
  slug: "skeuomorphism",
  name: "拟物设计",
  nameEn: "Skeuomorphism",
  description:
    "模拟真实世界物体的数字设计风格，通过纹理、光影、材质模仿现实物品，带来熟悉感和直觉性体验。",
  cover: "/styles/skeuomorphism.svg",
  styleType: "visual",
  tags: ["retro", "expressive"],
  category: "retro",
  colors: {
    primary: "#8b7355",
    secondary: "#d4c4a8",
    accent: ["#c9a227", "#5c4033", "#2e5a3c"],
  },
  keywords: ["拟物", "写实", "纹理", "质感", "真实", "3D", "阴影"],

  philosophy: `Skeuomorphism（拟物设计）是一种模拟真实世界物体外观和行为的设计方法，曾在早期 iOS 和数字产品中广泛使用。

核心理念：
- 真实模拟：界面元素模仿现实物品的外观和触感
- 材质纹理：皮革、木材、金属等真实材质纹理
- 光影深度：通过高光、阴影创造立体感
- 熟悉直觉：利用用户对现实世界的认知减少学习成本`,

  doList: [
    "使用真实材质纹理（皮革、木材、金属）",
    "添加逼真的光影效果",
    "模拟物理按钮的按压反馈",
    "使用渐变创造立体感",
    "添加细腻的边缘高光",
    "模拟真实物品的形态和比例",
  ],

  dontList: [
    "禁止使用纯扁平的色块",
    "禁止省略阴影和高光",
    "禁止使用过于简化的图标",
    "禁止忽视材质细节",
  ],

  components: {
    button: {
      name: "按钮",
      description: "拟物风格按钮",
      code: `<button className="
  px-8 py-4
  bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300
  border border-gray-400
  rounded-lg
  text-gray-700 font-semibold
  shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.1)]
  hover:from-gray-200 hover:via-gray-300 hover:to-gray-400
  active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]
  active:translate-y-[1px]
  transition-all duration-100
">
  Press Me
</button>`,
    },
    card: {
      name: "卡片",
      description: "拟物风格卡片",
      code: `<div className="
  p-6
  bg-gradient-to-b from-amber-50 to-amber-100
  border border-amber-300
  rounded-xl
  shadow-[0_8px_16px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.5)]
  relative overflow-hidden
">
  {/* Leather texture overlay */}
  <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,...')] pointer-events-none" />
  <h3 className="text-xl font-bold text-amber-900 mb-2">
    Leather Card
  </h3>
  <p className="text-amber-800">
    Realistic texture and depth
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "拟物风格输入框",
      code: `<input
  type="text"
  placeholder="Type here..."
  className="
    w-full px-4 py-3
    bg-gradient-to-b from-white to-gray-100
    border border-gray-300
    rounded-lg
    text-gray-700
    shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.8)]
    focus:outline-none focus:ring-2 focus:ring-blue-400
    focus:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15),0_0_8px_rgba(59,130,246,0.3)]
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "拟物风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-stone-200 via-stone-300 to-stone-400
  relative
">
  {/* Wood texture background */}
  <div className="absolute inset-0 opacity-20 bg-repeat" style="background-image: url('wood-texture.png')" />

  <div className="relative z-10 text-center p-8 bg-gradient-to-b from-white/90 to-gray-100/90 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.8)] border border-white/50">
    <h1 className="text-5xl font-bold text-gray-800 mb-4" style="text-shadow: 0 1px 0 rgba(255,255,255,0.8)">
      Skeuomorphism
    </h1>
    <p className="text-xl text-gray-600 mb-6">
      Digital meets physical
    </p>
    <button className="px-8 py-4 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg text-white font-bold shadow-[0_4px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)]">
      Explore
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Skeuomorphism 全局样式 */

:root {
  --skeu-leather: #8b7355;
  --skeu-wood: #d4c4a8;
  --skeu-metal: #c0c0c0;
  --skeu-paper: #f5f5dc;
}

/* 金属质感按钮 */
.skeu-metal-button {
  background: linear-gradient(180deg, #e8e8e8 0%, #c0c0c0 50%, #a8a8a8 100%);
  border: 1px solid #888;
  box-shadow:
    0 4px 8px rgba(0,0,0,0.3),
    inset 0 1px 0 rgba(255,255,255,0.8),
    inset 0 -1px 0 rgba(0,0,0,0.2);
}

/* 凹陷效果 */
.skeu-inset {
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.2), inset 0 -1px 0 rgba(255,255,255,0.5);
}

/* 凸起效果 */
.skeu-raised {
  box-shadow: 0 4px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5);
}`,

  aiRules: `你是一个 Skeuomorphism 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用纯扁平的色块
- 省略阴影和高光效果
- 使用过于简化的图标
- 忽视材质和纹理细节

## 必须遵守

- 渐变背景 bg-gradient-to-b from-gray-100 to-gray-300
- 复杂阴影 shadow-[0_4px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.8)]
- 边框层次 border border-gray-400
- 圆角适中 rounded-lg
- 按压反馈 active:translate-y-[1px]

## 配色

- 使用自然材质色调
- 皮革棕: #8b7355
- 木材米: #d4c4a8
- 金属银: #c0c0c0
- 纸张白: #f5f5dc

## 光影原则

- 顶部高光 (inset 0 1px 0 rgba(255,255,255,0.8))
- 底部暗边 (inset 0 -1px 0 rgba(0,0,0,0.1))
- 外部投影 (0 4px 8px rgba(0,0,0,0.3))`,

  examplePrompts: [
    {
      title: "复古音乐播放器",
      titleEn: "Retro Music Player",
      description: "仿真实收音机的音乐播放界面",
      descriptionEn: "Music player mimicking real radio",
      prompt: `用 Skeuomorphism 风格创建一个复古音乐播放器界面，要求：
1. 背景：模拟木质或金属材质
2. 按钮：带有真实按压感的 3D 效果
3. 旋钮：模拟真实旋钮的外观
4. 显示屏：模拟 LCD 或复古显示器
5. 整体有复古电子设备的质感`,
    },
  ],
};
