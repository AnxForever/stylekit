import { DesignStyle } from "./index";

export const liquidGlass: DesignStyle = {
  slug: "liquid-glass",
  name: "Apple 流动玻璃",
  nameEn: "Apple Liquid Glass",
  description:
    "Apple WWDC 2025 发布的全新设计语言，通过 SVG 折射滤镜、彩虹边缘光晕、流体形变动画和多层玻璃堆叠，创造出超越传统毛玻璃的有机流动视觉体验。",
  cover: "/styles/liquid-glass.svg",
  styleType: "visual",
  tags: ["modern", "brand-inspired"],
  category: "modern",
  colors: {
    primary: "rgba(255, 255, 255, 0.1)",
    secondary: "rgba(255, 255, 255, 0.15)",
    accent: ["#ff6b6b", "#4ecdc4", "#a855f7", "#007AFF", "#FF2D55"],
  },
  keywords: ["Apple", "Liquid Glass", "流动玻璃", "彩虹边缘", "折射", "多层堆叠", "WWDC 2025"],

  philosophy: `Liquid Glass（流动玻璃）是 Apple WWDC 2025 发布的革命性设计语言，超越传统毛玻璃效果，通过光线折射、彩虹边缘和流体动画创造出真正有机、流动的视觉体验。

核心理念：
- 彩虹折射边缘：边缘呈现棱镜效果，红橙黄绿青蓝紫的光谱渐变
- 流体形变：圆角随交互产生液态变形动画
- 多层深度：3+ 层玻璃堆叠产生丰富的空间层次
- 动态模糊：边缘清晰，中心模糊的渐变效果
- 高饱和度：backdrop-saturate-180 让背景色彩更加鲜艳

与 Glassmorphism 的区别：
| 特性 | Glassmorphism | Liquid Glass |
|------|---------------|--------------|
| 边框 | border-white/20 | 彩虹渐变边框 |
| 模糊 | blur-2xl | blur-3xl + saturate-180 |
| 动画 | 简单过渡 | 液态形变 morph |
| 深度 | 单层 | 多层堆叠 |
| 高光 | ring-inset | 顶部渐变条 + 彩虹光晕 |`,

  doList: [
    "使用超高模糊值 backdrop-blur-[40px] 或 backdrop-blur-3xl",
    "添加饱和度增强 backdrop-saturate-[1.8] 或 backdrop-saturate-200",
    "使用彩虹渐变边框模拟光线折射效果",
    "添加顶部高光渐变条 [background-image:linear-gradient(...)]",
    "使用超大圆角 rounded-3xl 或 rounded-[24px]",
    "使用流体动画 transition-all duration-500 ease-out",
    "多层玻璃堆叠时使用不同透明度和偏移",
    "添加脉冲发光动画 animate-pulse 或自定义 glow",
  ],

  dontList: [
    "禁止使用低模糊值 backdrop-blur-sm（太弱）",
    "禁止省略饱和度增强（颜色会显得暗淡）",
    "禁止使用直角或小圆角（rounded-none, rounded-sm）",
    "禁止使用单一颜色边框（应使用渐变）",
    "禁止使用快速过渡（duration-100, duration-150）",
    "禁止使用纯白背景作为底层（应使用深色渐变）",
  ],

  components: {
    button: {
      name: "按钮",
      description: "流动玻璃按钮，具有彩虹边缘渐变和液态压缩效果",
      code: `<button className="
  relative px-6 py-3
  bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8]
  rounded-[20px]
  text-white font-medium
  shadow-lg shadow-black/5
  before:absolute before:inset-0 before:rounded-[20px]
  before:p-[1px] before:-z-10
  before:bg-gradient-to-r before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]
  after:absolute after:inset-[1px] after:rounded-[19px] after:-z-10
  after:bg-gradient-to-b after:from-white/20 after:to-transparent
  hover:bg-white/15 hover:shadow-xl
  hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]
  active:scale-[0.98]
  transition-all duration-500 ease-out
">
  Liquid Button
</button>`,
    },
    card: {
      name: "卡片",
      description: "流动玻璃卡片，多层深度、彩虹边缘折射效果",
      code: `<div className="
  relative p-6 md:p-8
  bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8]
  rounded-[24px]
  shadow-xl shadow-black/10
  before:absolute before:inset-0 before:rounded-[24px]
  before:p-[1px] before:-z-10
  before:bg-gradient-to-br before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]
  after:absolute after:inset-[1px] after:rounded-[23px] after:-z-10
  after:bg-gradient-to-b after:from-white/15 after:to-transparent
  [box-shadow:inset_0_1px_0_rgba(255,255,255,0.4)]
">
  <h3 className="text-xl font-semibold text-white mb-2">
    Liquid Glass Card
  </h3>
  <p className="text-white/80">
    多层玻璃效果，边缘带有彩虹光线折射
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "流动玻璃输入框，焦点时彩虹边框动画",
      code: `<input
  type="text"
  placeholder="请输入..."
  className="
    w-full px-4 py-3
    bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8]
    border border-white/20
    rounded-[16px]
    text-white placeholder-white/50
    focus:outline-none
    focus:bg-white/15
    focus:border-transparent
    focus:[box-shadow:0_0_0_2px_rgba(168,85,247,0.5),0_0_20px_rgba(168,85,247,0.2)]
    transition-all duration-500 ease-out
  "
/>`,
    },
    nav: {
      name: "导航栏",
      description: "固定顶部的流动玻璃导航栏，带彩虹底边",
      code: `<nav className="
  fixed top-0 left-0 right-0 z-50
  px-6 py-4
  bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8]
  border-b border-white/10
  [box-shadow:0_1px_0_0_rgba(255,255,255,0.1),inset_0_-1px_0_0_rgba(168,85,247,0.2)]
">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    <a href="/" className="text-white font-bold text-xl">
      Logo
    </a>
    <div className="flex gap-6">
      <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
        Home
      </a>
      <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
        About
      </a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区块",
      description: "带深色渐变背景的流动玻璃 Hero 展示区域",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]
  px-6
">
  <div className="
    max-w-2xl mx-auto text-center
    p-8 md:p-12
    relative
    bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8]
    rounded-[32px]
    shadow-2xl shadow-black/20
    before:absolute before:inset-0 before:rounded-[32px]
    before:p-[1px] before:-z-10
    before:bg-gradient-to-br before:from-[#ff6b6b] before:via-[#4ecdc4] before:to-[#a855f7]
    after:absolute after:inset-[1px] after:rounded-[31px] after:-z-10
    after:bg-gradient-to-b after:from-white/20 after:to-transparent
  ">
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
      Liquid Glass
    </h1>
    <p className="text-lg text-white/80 mb-8">
      Apple WWDC 2025 全新设计语言
    </p>
    <button className="
      px-8 py-4
      bg-white/15 backdrop-blur-md
      rounded-full
      text-white font-semibold
      border border-white/30
      hover:bg-white/25
      hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]
      transition-all duration-500 ease-out
    ">
      Get Started
    </button>
  </div>
</section>`,
    },
    footer: {
      name: "页脚",
      description: "流动玻璃页脚，带有顶部彩虹边缘",
      code: `<footer className="
  px-6 py-8
  bg-white/5 backdrop-blur-[40px] backdrop-saturate-[1.8]
  border-t border-white/10
  [box-shadow:0_-1px_0_0_rgba(255,255,255,0.1),inset_0_1px_0_0_rgba(168,85,247,0.2)]
">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
    <span className="text-white/60 text-sm">Liquid Glass Design</span>
    <div className="flex gap-6">
      <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
        About
      </a>
      <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
        Contact
      </a>
    </div>
  </div>
</footer>`,
    },
  },

  globalCss: `/* Liquid Glass 全局样式 */

/* 流动玻璃变量 */
:root {
  --liquid-glass-bg: rgba(255, 255, 255, 0.1);
  --liquid-glass-bg-hover: rgba(255, 255, 255, 0.15);
  --liquid-glass-blur: 40px;
  --liquid-glass-saturate: 1.8;
  --liquid-glass-border-start: #ff6b6b;
  --liquid-glass-border-mid: #4ecdc4;
  --liquid-glass-border-end: #a855f7;
}

/* 彩虹边框渐变 */
.liquid-glass-rainbow-border {
  background: linear-gradient(
    135deg,
    var(--liquid-glass-border-start) 0%,
    #ffd93d 25%,
    #6bcb77 50%,
    var(--liquid-glass-border-mid) 75%,
    var(--liquid-glass-border-end) 100%
  );
}

/* 基础流动玻璃类 */
.liquid-glass {
  background: var(--liquid-glass-bg);
  backdrop-filter: blur(var(--liquid-glass-blur)) saturate(var(--liquid-glass-saturate));
  -webkit-backdrop-filter: blur(var(--liquid-glass-blur)) saturate(var(--liquid-glass-saturate));
  border-radius: 24px;
}

/* 顶部高光条 */
.liquid-glass-highlight {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.2),
    transparent 50%
  );
}

/* 流体形变动画 */
@keyframes liquid-morph {
  0%, 100% { border-radius: 24px; }
  25% { border-radius: 28px 20px 26px 22px; }
  50% { border-radius: 22px 26px 20px 28px; }
  75% { border-radius: 26px 22px 28px 20px; }
}

.liquid-glass-morph {
  animation: liquid-morph 8s ease-in-out infinite;
}

/* 脉冲发光动画 */
@keyframes liquid-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.3); }
  50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.5); }
}

.liquid-glass-glow {
  animation: liquid-glow 3s ease-in-out infinite;
}

/* 彩虹边缘脉冲 */
@keyframes rainbow-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.liquid-glass-rainbow-pulse {
  animation: rainbow-pulse 2s ease-in-out infinite;
}

/* 多层玻璃堆叠 */
.liquid-glass-stack-1 { --liquid-glass-bg: rgba(255, 255, 255, 0.08); }
.liquid-glass-stack-2 { --liquid-glass-bg: rgba(255, 255, 255, 0.12); }
.liquid-glass-stack-3 { --liquid-glass-bg: rgba(255, 255, 255, 0.16); }

/* 深色渐变容器背景 */
.liquid-glass-container {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
  min-height: 100vh;
}`,

  aiRules: `你是一个 Apple Liquid Glass（流动玻璃）设计风格的前端开发专家。这是 Apple WWDC 2025 发布的全新设计语言。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用低模糊值 backdrop-blur-sm, backdrop-blur（太弱）
- 省略饱和度增强 backdrop-saturate
- 使用直角或小圆角 rounded-none, rounded-sm, rounded
- 使用单一颜色边框（应使用彩虹渐变）
- 使用快速过渡 duration-100, duration-150
- 使用纯色不透明背景 bg-white, bg-black
- 使用浅色背景作为容器底层（应使用深色渐变）

## 必须遵守

- 超高模糊值 backdrop-blur-[40px], backdrop-blur-3xl
- 高饱和度增强 backdrop-saturate-[1.8], backdrop-saturate-200
- 彩虹渐变边框 from-[#ff6b6b] via-[#4ecdc4] to-[#a855f7]
- 顶部高光渐变 from-white/20 to-transparent
- 超大圆角 rounded-3xl, rounded-[24px]
- 流体过渡 transition-all duration-500 ease-out
- 半透明背景 bg-white/10 到 bg-white/15
- 多层堆叠使用 z-index 和不同透明度

## 彩虹配色

边缘折射渐变：
- 红: #ff6b6b
- 橙: #ffd93d
- 绿: #6bcb77
- 青: #4ecdc4
- 紫: #a855f7

背景推荐：
- 深色渐变: from-[#1a1a2e] via-[#16213e] to-[#0f0f23]
- Apple 蓝: #007AFF
- Apple 粉: #FF2D55

## 层级结构

1. 底层：深色渐变背景
2. 中层：流动玻璃容器（backdrop-blur-[40px] backdrop-saturate-[1.8]）
3. 边框层：彩虹渐变伪元素 before:
4. 高光层：顶部渐变伪元素 after:
5. 顶层：内容元素

## 核心特效

1. 彩虹边框：使用 before 伪元素 + 渐变背景 + p-[1px]
2. 顶部高光：使用 after 伪元素 + 从白色渐变到透明
3. 液态动画：animation: liquid-morph 8s ease-in-out infinite
4. 发光效果：hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]
5. 压缩反馈：active:scale-[0.98]

## 自检

每次生成代码后检查：
1. 有深色渐变背景容器
2. 有 backdrop-blur-[40px] 或 backdrop-blur-3xl
3. 有 backdrop-saturate-[1.8] 或更高
4. 有彩虹渐变边框
5. 有顶部高光条
6. 使用 rounded-[24px] 或更大圆角
7. 过渡时间 >= 500ms
8. 文字可读性良好`,

  examplePrompts: [
    {
      title: "Apple 风格控制中心",
      titleEn: "Apple-style Control Center",
      description: "iOS 风格的流动玻璃控制中心",
      descriptionEn: "iOS-style liquid glass control center",
      prompt: `用 Liquid Glass 风格创建一个 iOS 风格控制中心，要求：

## 核心效果
- 背景：深色渐变 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]
- 主面板：bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[24px]
- 彩虹边框：使用 before 伪元素实现渐变边框
- 顶部渐变：使用 after 伪元素实现高光

## 控制模块
- 网格布局：2x4 圆角正方形网格
- 每个磁贴：bg-white/10 rounded-[16px] 带彩虹边框
- 激活状态：bg-[#007AFF]/40 shadow-[0_0_20px_rgba(0,122,255,0.4)]

## 交互
- 开关控件：胶囊形状，开启时带发光
- 滑块控件：流动玻璃轨道，圆形滑块带发光
- 所有过渡：transition-all duration-500 ease-out`,
    },
    {
      title: "流动玻璃音乐播放器",
      titleEn: "Liquid Glass Music Player",
      description: "Apple Music 风格播放界面",
      descriptionEn: "Apple Music style player interface",
      prompt: `用 Liquid Glass 风格设计一个音乐播放器界面，要求：

## 背景层
- 当前播放歌曲的模糊封面作为背景
- 叠加深色渐变：bg-gradient-to-b from-black/40 via-transparent to-black/60

## 播放卡片（多层玻璃）
- 外层容器：bg-white/8 backdrop-blur-[40px] backdrop-saturate-[1.8] rounded-[32px]
- 彩虹边框：before 伪元素实现
- 内层面板：bg-white/12 rounded-[28px] p-6

## 控件设计
- 专辑封面：rounded-[20px] shadow-2xl 带发光边框
- 播放按钮：w-16 h-16 bg-white/15 rounded-full 带脉冲发光动画
- 上下曲按钮：w-12 h-12 bg-white/10 rounded-full
- 进度条：h-1 bg-white/20 rounded-full，滑块 w-4 h-4 带发光

## 动画
- 专辑封面：hover 时微微放大和发光
- 播放按钮：按下时液态压缩效果
- 进度条滑块：拖动时发光增强`,
    },
    {
      title: "流动玻璃登录页面",
      titleEn: "Liquid Glass Login Page",
      description: "现代登录表单设计",
      descriptionEn: "Modern login form design",
      prompt: `用 Liquid Glass 风格创建一个登录页面，要求：

## 全屏背景
- 深色渐变：bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]
- 添加装饰性彩虹光斑元素

## 登录卡片
- 居中容器：max-w-md mx-auto
- 流动玻璃：bg-white/10 backdrop-blur-[40px] backdrop-saturate-[1.8]
- 圆角：rounded-[32px]
- 彩虹边框：before 伪元素
- 顶部高光：after 伪元素

## 表单元素
- 输入框：bg-white/10 backdrop-blur-xl border border-white/20 rounded-[16px]
- 焦点态：focus:bg-white/15 focus:shadow-[0_0_0_2px_rgba(168,85,247,0.5)]
- 占位符：placeholder:text-white/50

## 按钮
- 主按钮：彩虹渐变边框 + 发光 hover 效果
- 次按钮：bg-transparent border border-white/30 text-white/80
- 社交登录：bg-white/10 hover:bg-white/15 rounded-[12px]

## 额外元素
- Logo：text-white text-2xl font-bold 带发光效果
- 分隔线：border-t border-white/20 my-6
- 链接：text-white/70 hover:text-white`,
    },
  ],
};
