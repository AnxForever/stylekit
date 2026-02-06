import { DesignStyle } from "./index";

export const neumorphism: DesignStyle = {
  slug: "neumorphism",
  name: "新拟物派",
  nameEn: "Neumorphism",
  description:
    "柔和的内凹外凸立体效果，通过双重阴影模拟光源，浅色背景配同色系元素，营造精致的立体感。",
  cover: "/styles/neumorphism.svg",
  styleType: "visual",
  tags: ["modern", "minimal"],
  category: "modern",
  colors: {
    primary: "#e0e5ec",
    secondary: "#d1d9e6",
    accent: ["#6d5dfc", "#ff6b6b", "#4ecdc4", "#ffe66d"],
  },
  keywords: ["立体感", "双重阴影", "柔和", "浅色系", "内凹外凸"],

  philosophy: `Neumorphism（新拟物派）是一种介于扁平设计和拟物设计之间的风格，通过柔和的阴影创造出元素从背景中"挤压"或"凹陷"的视觉效果。

核心理念：
- 柔和立体：通过双重阴影（亮/暗）模拟自然光源
- 同色系统一：元素与背景使用相同或相近的颜色
- 触感直觉：凸起表示可交互，凹陷表示已激活或输入区
- 克制装饰：避免过多颜色和对比，保持整体柔和感`,

  doList: [
    "使用浅色背景 bg-[#e0e5ec] 或 bg-[#f0f0f3]",
    "使用双重阴影 shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]",
    "凹陷效果使用 inset 阴影 shadow-[inset_8px_8px_16px_#b8bcc2,inset_-8px_-8px_16px_#ffffff]",
    "使用中等圆角 rounded-xl (12-24px)",
    "交互元素按下时从凸起变凹陷",
    "保持元素与背景同色系",
    "响应式阴影大小 md: 前缀增大",
  ],

  dontList: [
    "禁止使用纯黑或纯白背景",
    "禁止使用硬边缘阴影 shadow-[Xpx_Xpx_0px]",
    "禁止使用高对比度配色",
    "禁止使用粗边框 border-2 及以上",
    "禁止使用渐变背景 bg-gradient-*",
    "禁止直角 rounded-none",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Neumorphism 风格按钮，凸起效果，按下时凹陷",
      code: `<button className="
  bg-[#e0e5ec] text-gray-700 font-medium
  px-6 py-3 rounded-xl
  shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff]
  hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]
  active:shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff]
  transition-all duration-200
">
  按钮文字
</button>`,
    },
    card: {
      name: "卡片",
      description: "Neumorphism 风格卡片容器，柔和的凸起效果",
      code: `<div className="
  bg-[#e0e5ec] rounded-2xl p-6
  shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]
">
  <h3 className="text-gray-800 font-semibold text-lg mb-2">卡片标题</h3>
  <p className="text-gray-600">卡片内容描述文字</p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Neumorphism 风格输入框，凹陷效果表示输入区域",
      code: `<input
  type="text"
  placeholder="请输入..."
  className="
    w-full bg-[#e0e5ec] text-gray-700
    px-4 py-3 rounded-xl
    shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff]
    focus:shadow-[inset_6px_6px_12px_#b8bcc2,inset_-6px_-6px_12px_#ffffff]
    focus:outline-none
    placeholder:text-gray-400
    transition-shadow duration-200
  "
/>`,
    },
    nav: {
      name: "导航栏",
      description: "Neumorphism 风格导航栏",
      code: `<nav className="
  bg-[#e0e5ec] px-6 py-4
  shadow-[0_4px_12px_#b8bcc2]
">
  <div className="flex items-center justify-between max-w-6xl mx-auto">
    <span className="text-gray-800 font-bold text-xl">Logo</span>
    <div className="flex gap-2">
      <a href="#" className="
        px-4 py-2 rounded-lg text-gray-600
        hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]
        transition-shadow
      ">首页</a>
      <a href="#" className="
        px-4 py-2 rounded-lg text-gray-600
        hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]
        transition-shadow
      ">关于</a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区域",
      description: "Neumorphism 风格的 Hero 展示区",
      code: `<section className="bg-[#e0e5ec] min-h-[80vh] flex items-center px-6">
  <div className="max-w-4xl mx-auto text-center">
    <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
      柔和的立体世界
    </h1>
    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
      Neumorphism 通过精致的阴影效果，创造出触手可及的界面体验。
    </p>
    <button className="
      bg-[#6d5dfc] text-white font-medium
      px-8 py-4 rounded-xl
      shadow-[6px_6px_12px_#b8bcc2,-6px_-6px_12px_#ffffff]
      hover:shadow-[4px_4px_8px_#b8bcc2,-4px_-4px_8px_#ffffff]
      active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2)]
      transition-all duration-200
    ">
      开始探索
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Neumorphism 全局样式 */

/* 背景色 */
:root {
  --neu-bg: #e0e5ec;
  --neu-bg-light: #f0f0f3;
  --neu-shadow-dark: #b8bcc2;
  --neu-shadow-light: #ffffff;
  --neu-accent: #6d5dfc;
  --neu-text: #333333;
  --neu-text-muted: #6b7280;
}

/* 凸起效果 */
.neu-raised {
  background: var(--neu-bg);
  border-radius: 12px;
  box-shadow:
    8px 8px 16px var(--neu-shadow-dark),
    -8px -8px 16px var(--neu-shadow-light);
}

.neu-raised-sm {
  box-shadow:
    4px 4px 8px var(--neu-shadow-dark),
    -4px -4px 8px var(--neu-shadow-light);
}

/* 凹陷效果 */
.neu-pressed {
  background: var(--neu-bg);
  border-radius: 12px;
  box-shadow:
    inset 8px 8px 16px var(--neu-shadow-dark),
    inset -8px -8px 16px var(--neu-shadow-light);
}

.neu-pressed-sm {
  box-shadow:
    inset 4px 4px 8px var(--neu-shadow-dark),
    inset -4px -4px 8px var(--neu-shadow-light);
}

/* 悬停效果 */
.neu-hover:hover {
  box-shadow:
    4px 4px 8px var(--neu-shadow-dark),
    -4px -4px 8px var(--neu-shadow-light);
}

/* 激活效果 */
.neu-active:active {
  box-shadow:
    inset 4px 4px 8px var(--neu-shadow-dark),
    inset -4px -4px 8px var(--neu-shadow-light);
}

/* 圆形元素 */
.neu-circle {
  border-radius: 50%;
}`,

  aiRules: `# Neumorphism (新拟物派) 设计规范

## 核心原则
你正在使用 Neumorphism 设计风格。这种风格通过柔和的双重阴影创造元素的立体感。

## 必须遵循
1. 背景色使用浅灰色 bg-[#e0e5ec] 或 bg-[#f0f0f3]
2. 凸起效果: shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]
3. 凹陷效果: shadow-[inset_8px_8px_16px_#b8bcc2,inset_-8px_-8px_16px_#ffffff]
4. 圆角使用 rounded-xl 或 rounded-2xl (12-24px)
5. 按钮按下时从凸起变凹陷 (active: 伪类)
6. 输入框使用凹陷效果表示输入区域
7. 保持同色系：元素颜色与背景相近
8. 响应式阴影：移动端减小阴影尺寸

## 禁止使用
1. 纯黑/纯白背景
2. 硬边缘阴影 shadow-[Xpx_Xpx_0px]
3. 高对比度配色
4. 粗边框 border-2 及以上
5. 渐变背景
6. 直角 rounded-none

## 阴影参数说明
- 亮阴影方向：左上 (-X, -Y)，颜色接近白色 #ffffff
- 暗阴影方向：右下 (X, Y)，颜色比背景深 #b8bcc2
- 阴影模糊度通常是偏移量的 1.5-2 倍

## 配色方案
- 主背景: #e0e5ec
- 浅背景: #f0f0f3
- 暗阴影: #b8bcc2
- 亮阴影: #ffffff
- 强调色: #6d5dfc (紫色)
- 文字: #333333
- 次要文字: #6b7280

## 交互状态
- 默认: 凸起阴影
- Hover: 阴影略微缩小
- Active/Pressed: 变为凹陷阴影
- Focus: 阴影略微增大或添加强调色
- Disabled: 阴影减弱，透明度降低`,

  examplePrompts: [
    {
      title: "智能家居控制面板",
      titleEn: "Smart Home Control Panel",
      description: "设备控制和状态展示",
      descriptionEn: "Device control and status display",
      prompt: `用 Neumorphism 风格设计一个智能家居控制面板，要求：
1. 背景：统一浅灰色 #e0e5ec
2. 设备卡片：凸起效果，显示设备图标和状态
3. 开关按钮：圆形，开启时凹陷 + 强调色图标
4. 温度滑块：凹槽轨道，凸起滑块
5. 场景按钮：按下时从凸起变凹陷
所有阴影使用双色：右下深色 + 左上亮色`,
    },
    {
      title: "计算器应用",
      titleEn: "Calculator App",
      description: "拟物风格计算器界面",
      descriptionEn: "Skeuomorphic calculator interface",
      prompt: `用 Neumorphism 风格创建一个计算器界面，要求：
1. 外框：大圆角凸起容器
2. 显示屏：凹陷区域，深色背景，显示数字
3. 数字按钮：4x3 网格，凸起效果
4. 运算符：右侧一列，用强调色
5. 按下效果：从凸起变凹陷
背景色 #e0e5ec，阴影用 #a3b1c6 和 #ffffff`,
    },
    {
      title: "音频控制器",
      titleEn: "Audio Controller",
      description: "音量和均衡器控制",
      descriptionEn: "Volume and equalizer controls",
      prompt: `用 Neumorphism 风格设计一个音频控制器，要求：
1. 主容器：大圆角凸起面板
2. 旋钮：圆形凸起，带刻度指示
3. 推子/滑块：垂直凹槽，凸起滑块
4. 均衡器：多个垂直滑块并排
5. 按钮：静音/预设等，按下时凹陷
保持统一的浅灰色调，通过阴影创造立体感`,
    },
  ],
};
