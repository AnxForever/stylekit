import { DesignStyle } from "./index";

export const glassmorphism: DesignStyle = {
  slug: "glassmorphism",
  name: "液态玻璃",
  nameEn: "Liquid Glass",
  description:
    "源自 Apple 设计语言的液态玻璃效果，具备光线折射、动态模糊、边缘高光和多层深度感，创造出流动、有机的现代界面。",
  cover: "/styles/glassmorphism.svg",
  styleType: "visual",
  tags: ["modern"],
  category: "modern",
  colors: {
    primary: "rgba(255, 255, 255, 0.25)",
    secondary: "rgba(255, 255, 255, 0.18)",
    accent: ["#007AFF", "#5856D6", "#FF2D55", "#34C759"],
  },
  keywords: ["液态玻璃", "光线折射", "动态模糊", "Apple", "流动", "有机"],

  philosophy: `Liquid Glass（液态玻璃）是 Apple 最新设计语言的核心，超越传统毛玻璃效果，通过光线折射、动态模糊和边缘高光创造出有机、流动的视觉体验。

核心理念：
- 光线折射：边缘呈现微妙的彩虹色光谱效果
- 动态深度：多层玻璃堆叠产生丰富的空间层次
- 有机形态：更圆润的边角和流体般的过渡动画
- 饱和增强：背景色彩通过玻璃层后更加鲜艳
- 边缘高光：顶部和左侧边缘的镜面反射效果`,

  doList: [
    "使用高模糊值 backdrop-blur-2xl 或 backdrop-blur-3xl",
    "添加饱和度增强 backdrop-saturate-150 或 backdrop-saturate-200",
    "使用边缘高光 ring-1 ring-white/30 ring-inset",
    "添加内阴影模拟光线折射 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]",
    "使用超大圆角 rounded-3xl 或 rounded-[2rem]",
    "使用流体动画 transition-all duration-500 ease-out",
    "多层玻璃堆叠时使用不同透明度",
    "添加微妙的渐变边框模拟彩虹折射",
  ],

  dontList: [
    "禁止使用低模糊值 backdrop-blur-sm（太弱）",
    "禁止省略饱和度增强（颜色会显得暗淡）",
    "禁止使用直角或小圆角（rounded-none, rounded-sm）",
    "禁止使用硬边缘阴影",
    "禁止使用快速过渡（duration-100, duration-150）",
    "禁止使用纯白背景作为底层",
  ],

  components: {
    button: {
      name: "按钮",
      description: "液态玻璃按钮，具有边缘高光、动态模糊和流体过渡",
      code: `<button className="
  px-6 py-3
  bg-white/25 backdrop-blur-2xl backdrop-saturate-150
  border border-white/40
  rounded-2xl
  text-white font-medium
  shadow-lg shadow-black/5
  ring-1 ring-inset ring-white/20
  hover:bg-white/35 hover:shadow-xl
  hover:ring-white/30
  active:scale-[0.98]
  transition-all duration-300 ease-out
">
  Liquid Button
</button>`,
    },
    card: {
      name: "卡片",
      description: "液态玻璃卡片，多层深度、边缘折射效果",
      code: `<div className="
  p-6 md:p-8
  bg-white/20 backdrop-blur-3xl backdrop-saturate-150
  border border-white/30
  rounded-3xl
  shadow-xl shadow-black/10
  ring-1 ring-inset ring-white/25
  [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.15),transparent)]
">
  <h3 className="text-xl font-semibold text-white mb-2">
    Liquid Glass Card
  </h3>
  <p className="text-white/80">
    多层玻璃效果，边缘带有光线折射
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "液态玻璃输入框，焦点时边缘发光增强",
      code: `<input
  type="text"
  placeholder="请输入..."
  className="
    w-full px-4 py-3
    bg-white/15 backdrop-blur-2xl backdrop-saturate-150
    border border-white/30
    rounded-2xl
    text-white placeholder-white/50
    ring-1 ring-inset ring-white/20
    focus:outline-none focus:border-white/50
    focus:bg-white/25 focus:ring-white/40
    focus:shadow-[0_0_20px_rgba(255,255,255,0.15)]
    transition-all duration-300 ease-out
  "
/>`,
    },
    nav: {
      name: "导航栏",
      description: "固定顶部的液态玻璃导航栏，带底部高光边缘",
      code: `<nav className="
  fixed top-0 left-0 right-0 z-50
  px-6 py-4
  bg-white/10 backdrop-blur-3xl backdrop-saturate-150
  border-b border-white/20
  shadow-[0_1px_0_0_rgba(255,255,255,0.1)]
">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    <a href="/" className="text-white font-bold text-xl">
      Logo
    </a>
    <div className="flex gap-6">
      <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
        首页
      </a>
      <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
        关于
      </a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区块",
      description: "带渐变背景的液态玻璃 Hero 展示区域",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500
  px-6
">
  <div className="
    max-w-2xl mx-auto text-center
    p-8 md:p-12
    bg-white/15 backdrop-blur-3xl backdrop-saturate-150
    border border-white/25
    rounded-[2rem]
    shadow-2xl shadow-black/10
    ring-1 ring-inset ring-white/20
    [background-image:linear-gradient(to_bottom,rgba(255,255,255,0.1),transparent)]
  ">
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
      Liquid Glass
    </h1>
    <p className="text-lg text-white/80 mb-8">
      源自 Apple 设计语言的液态玻璃效果
    </p>
    <button className="
      px-8 py-4
      bg-white/25 backdrop-blur-2xl backdrop-saturate-150
      border border-white/40
      rounded-full
      text-white font-semibold
      ring-1 ring-inset ring-white/30
      hover:bg-white/35
      transition-all duration-300 ease-out
    ">
      开始探索
    </button>
  </div>
</section>`,
    },
    footer: {
      name: "页脚",
      description: "液态玻璃页脚，带有顶部高光边缘",
      code: `<footer className="
  px-6 py-8
  bg-white/10 backdrop-blur-3xl backdrop-saturate-150
  border-t border-white/20
  shadow-[0_-1px_0_0_rgba(255,255,255,0.1)]
">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
    <span className="text-white/60 text-sm">Liquid Glass Design</span>
    <div className="flex gap-6">
      <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
        关于
      </a>
      <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
        联系
      </a>
    </div>
  </div>
</footer>`,
    },
  },

  globalCss: `/* Liquid Glass 全局样式 */

/* 液态玻璃变量 */
:root {
  --liquid-glass-bg: rgba(255, 255, 255, 0.15);
  --liquid-glass-bg-hover: rgba(255, 255, 255, 0.25);
  --liquid-glass-border: rgba(255, 255, 255, 0.3);
  --liquid-glass-ring: rgba(255, 255, 255, 0.2);
  --liquid-glass-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  --liquid-glass-blur: 24px;
  --liquid-glass-saturate: 1.5;
}

/* 基础液态玻璃类 */
.liquid-glass {
  background: var(--liquid-glass-bg);
  backdrop-filter: blur(var(--liquid-glass-blur)) saturate(var(--liquid-glass-saturate));
  -webkit-backdrop-filter: blur(var(--liquid-glass-blur)) saturate(var(--liquid-glass-saturate));
  border: 1px solid var(--liquid-glass-border);
  box-shadow:
    var(--liquid-glass-shadow),
    inset 0 1px 1px rgba(255, 255, 255, 0.25);
}

/* 液态玻璃容器 - 渐变背景 */
.liquid-glass-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  min-height: 100vh;
}

/* 边缘高光效果 */
.liquid-glass-highlight {
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.15),
    transparent 50%
  );
}

/* 彩虹边框效果（光线折射模拟） */
.liquid-glass-refraction {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.1) 25%,
    rgba(255, 200, 200, 0.1) 50%,
    rgba(200, 200, 255, 0.1) 75%,
    rgba(255, 255, 255, 0.3)
  );
  background-clip: padding-box;
}

/* 多层玻璃堆叠 */
.liquid-glass-layer-1 { --liquid-glass-bg: rgba(255, 255, 255, 0.1); }
.liquid-glass-layer-2 { --liquid-glass-bg: rgba(255, 255, 255, 0.15); }
.liquid-glass-layer-3 { --liquid-glass-bg: rgba(255, 255, 255, 0.2); }

/* 流体动画 */
@keyframes liquid-morph {
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
}

.liquid-glass-morph {
  animation: liquid-morph 8s ease-in-out infinite;
}

/* 胶囊标签样式 */
.liquid-glass-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(16px) saturate(1.5);
  -webkit-backdrop-filter: blur(16px) saturate(1.5);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.3);
}`,

  aiRules: `你是一个 Liquid Glass（液态玻璃）设计风格的前端开发专家。这是 Apple 最新设计语言的核心风格。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用低模糊值 backdrop-blur-sm, backdrop-blur（太弱）
- 省略饱和度增强 backdrop-saturate
- 使用直角或小圆角 rounded-none, rounded-sm, rounded
- 使用硬边缘阴影 shadow-[Xpx_Xpx_0px]
- 使用快速过渡 duration-100, duration-150
- 使用纯色不透明背景 bg-white, bg-black
- 省略边缘高光效果 ring-inset

## 必须遵守

- 高模糊值 backdrop-blur-2xl, backdrop-blur-3xl
- 饱和度增强 backdrop-saturate-150, backdrop-saturate-200
- 边缘高光 ring-1 ring-inset ring-white/20
- 内阴影高光 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]
- 超大圆角 rounded-2xl, rounded-3xl, rounded-[2rem]
- 流体过渡 transition-all duration-300 ease-out
- 半透明背景 bg-white/15 到 bg-white/30

## Apple 配色

渐变背景推荐：
- 蓝紫: from-blue-600 via-purple-600 to-pink-500
- 紫粉: from-purple-600 via-pink-500 to-orange-400
- 青蓝: from-cyan-400 via-blue-500 to-indigo-600

玻璃元素：
- 背景: bg-white/15, bg-white/20, bg-white/25
- 边框: border-white/30, border-white/40
- 高光环: ring-white/20, ring-white/30
- 文字: text-white, text-white/80

## 层级结构

1. 底层：鲜艳渐变背景
2. 中层：液态玻璃容器（backdrop-blur-3xl backdrop-saturate-150）
3. 顶层：内容元素（带 ring-inset 高光）

## 核心特效

1. 光线折射：使用渐变边框或多层堆叠模拟
2. 边缘高光：ring-1 ring-inset ring-white/20
3. 内发光：shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]
4. 饱和增强：backdrop-saturate-150 让背景更鲜艳
5. 深度阴影：shadow-xl shadow-black/10

## 自检

每次生成代码后检查：
1. 有渐变或鲜艳背景
2. 有 backdrop-blur-2xl 或 backdrop-blur-3xl
3. 有 backdrop-saturate-150 或更高
4. 有 ring-inset 边缘高光
5. 使用 rounded-2xl 或更大圆角
6. 过渡时间 >= 300ms
7. 文字可读性良好`,

  examplePrompts: [
    {
      title: "Apple 风格控制中心",
      titleEn: "Apple-style Control Center",
      description: "iOS 风格的液态玻璃控制中心",
      descriptionEn: "iOS-style liquid glass control center",
      prompt: `用 Liquid Glass 风格创建一个 iOS 风格控制中心，要求：

## 核心效果
- 背景：深色渐变 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900
- 主面板：bg-white/20 backdrop-blur-3xl backdrop-saturate-150 rounded-3xl
- 边缘高光：ring-1 ring-inset ring-white/20
- 顶部渐变：[background-image:linear-gradient(to_bottom,rgba(255,255,255,0.1),transparent)]

## 控制模块
- 网格布局：2x4 圆角正方形网格
- 每个磁贴：bg-white/15 rounded-2xl ring-1 ring-inset ring-white/15
- 激活状态：bg-[#007AFF]/40 shadow-[0_0_16px_rgba(0,122,255,0.4)]

## 交互
- 开关控件：胶囊形状，开启时 bg-[#34C759]/40 带发光
- 滑块控件：液态玻璃轨道 h-2 rounded-full，圆形滑块带 shadow-lg
- 所有过渡：transition-all duration-300 ease-out`,
    },
    {
      title: "液态玻璃音乐播放器",
      titleEn: "Liquid Glass Music Player",
      description: "Apple Music 风格播放界面",
      descriptionEn: "Apple Music style player interface",
      prompt: `用 Liquid Glass 风格设计一个音乐播放器界面，要求：

## 背景层
- 当前播放歌曲的模糊封面作为背景
- 叠加渐变：bg-gradient-to-b from-black/40 via-transparent to-black/60

## 播放卡片（多层玻璃）
- 外层容器：bg-white/10 backdrop-blur-3xl backdrop-saturate-150 rounded-[2rem]
- 内层面板：bg-white/20 rounded-3xl p-6
- 边缘效果：ring-1 ring-inset ring-white/25 shadow-2xl shadow-black/20

## 控件设计
- 专辑封面：rounded-2xl shadow-2xl ring-1 ring-white/10
- 播放按钮：w-16 h-16 bg-white/25 rounded-full ring-1 ring-inset ring-white/30
- 上下曲按钮：w-12 h-12 bg-white/15 rounded-full
- 进度条：h-1 bg-white/20 rounded-full，滑块 w-4 h-4 bg-white shadow-lg

## 歌词面板
- 侧滑动画：transform translate-x-full -> translate-x-0
- 背景：bg-black/40 backdrop-blur-3xl
- 文字：text-white/60 当前行 text-white text-xl font-medium`,
    },
    {
      title: "液态玻璃设置页面",
      titleEn: "Liquid Glass Settings Page",
      description: "iOS 设置页面风格",
      descriptionEn: "iOS Settings page style",
      prompt: `用 Liquid Glass 风格创建一个设置页面，要求：

## 背景
- 浅色渐变：bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100
- 或深色模式：bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900

## 导航栏
- 固定顶部：fixed top-0 left-0 right-0 z-50
- 液态玻璃：bg-white/70 dark:bg-black/40 backdrop-blur-2xl backdrop-saturate-150
- 底部边框：border-b border-white/50 dark:border-white/10

## 设置分组
- 卡片容器：bg-white/60 dark:bg-white/10 backdrop-blur-xl rounded-2xl
- 边缘高光：ring-1 ring-inset ring-white/50 dark:ring-white/10
- 分组标题：text-sm text-gray-500 uppercase tracking-wide px-4 py-2

## 设置行
- 布局：flex items-center justify-between px-4 py-3
- 图标：w-8 h-8 rounded-lg bg-[#007AFF] text-white flex items-center justify-center
- 分隔线：border-b border-gray-200/50 dark:border-white/5 ml-14

## 控件
- 开关：w-12 h-7 rounded-full bg-gray-200 dark:bg-white/20，开启时 bg-[#34C759]
- 箭头：text-gray-400 Lucide ChevronRight 图标
- 值显示：text-gray-500 text-sm`,
    },
    {
      title: "液态玻璃通知中心",
      titleEn: "Liquid Glass Notification Center",
      description: "macOS 风格通知面板",
      descriptionEn: "macOS-style notification panel",
      prompt: `用 Liquid Glass 风格创建一个 macOS 风格通知中心，要求：

## 面板容器
- 右侧滑入：fixed right-0 top-0 h-full w-80
- 液态玻璃：bg-white/20 backdrop-blur-3xl backdrop-saturate-150
- 边缘：border-l border-white/20 shadow-2xl

## 通知卡片
- 容器：bg-white/25 rounded-2xl p-4 mb-3
- 高光：ring-1 ring-inset ring-white/20
- 顶部渐变：[background-image:linear-gradient(to_bottom,rgba(255,255,255,0.15),transparent)]

## 通知内容
- 图标：w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600
- 标题：text-white font-semibold text-sm
- 内容：text-white/70 text-sm line-clamp-2
- 时间：text-white/50 text-xs

## 小组件区域
- 日历小组件：bg-white/15 rounded-3xl p-4
- 天气小组件：渐变背景 + 液态玻璃叠加
- 所有元素：ring-1 ring-inset ring-white/15`,
    },
    {
      title: "液态玻璃登录页面",
      titleEn: "Liquid Glass Login Page",
      description: "现代登录表单设计",
      descriptionEn: "Modern login form design",
      prompt: `用 Liquid Glass 风格创建一个登录页面，要求：

## 全屏背景
- 渐变：bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-500
- 可选：添加动态模糊光斑装饰元素

## 登录卡片
- 居中容器：max-w-md mx-auto
- 液态玻璃：bg-white/20 backdrop-blur-3xl backdrop-saturate-150
- 圆角：rounded-[2rem]
- 高光：ring-1 ring-inset ring-white/25 shadow-2xl shadow-black/20
- 顶部渐变：[background-image:linear-gradient(to_bottom,rgba(255,255,255,0.15),transparent)]

## 表单元素
- 输入框：bg-white/15 backdrop-blur-xl border border-white/30 rounded-xl
- 焦点态：focus:bg-white/25 focus:border-white/50 focus:ring-2 focus:ring-white/20
- 占位符：placeholder:text-white/50

## 按钮
- 主按钮：bg-white/30 hover:bg-white/40 text-white font-semibold rounded-xl
- 次按钮：bg-transparent border border-white/30 text-white/80
- 社交登录：bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-3

## 额外元素
- Logo：text-white text-2xl font-bold mb-8
- 分隔线：border-t border-white/20 my-6
- 链接：text-white/70 hover:text-white underline-offset-4`,
    },
  ],
};
