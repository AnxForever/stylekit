import { DesignStyle } from "./index";

export const glassmorphism: DesignStyle = {
  slug: "glassmorphism",
  name: "玻璃拟态",
  nameEn: "Glassmorphism",
  description:
    "半透明毛玻璃效果，通过 backdrop-blur 模糊背景、柔和边框和微妙阴影，创造现代感十足的层叠界面。",
  cover: "/styles/glassmorphism.png",
  category: "modern",
  colors: {
    primary: "rgba(255, 255, 255, 0.25)",
    secondary: "rgba(255, 255, 255, 0.18)",
    accent: ["#667eea", "#764ba2", "#f093fb", "#f5576c"],
  },
  keywords: ["毛玻璃", "透明", "模糊", "现代", "层叠"],

  philosophy: `Glassmorphism（玻璃拟态）是一种源于 iOS 和 macOS 设计语言的现代 UI 风格，通过半透明背景和背景模糊效果创造出类似磨砂玻璃的视觉感受。

核心理念：
- 层次感：通过透明度区分前后层级
- 现代感：模糊效果营造高端科技氛围
- 轻盈感：半透明元素减少视觉重量
- 深度感：微妙阴影增强空间层次`,

  doList: [
    "使用半透明背景 bg-white/20 或 bg-white/10",
    "添加背景模糊 backdrop-blur-md 或 backdrop-blur-xl",
    "使用细微边框 border border-white/20",
    "添加柔和阴影 shadow-lg 或 shadow-xl",
    "使用渐变背景作为底层 bg-gradient-to-br",
    "圆角适中 rounded-xl 或 rounded-2xl",
    "文字使用高对比度确保可读性",
  ],

  dontList: [
    "禁止在纯白或纯色背景上使用（需要渐变或图片背景）",
    "禁止过度透明导致内容不可读",
    "禁止使用硬边缘阴影",
    "禁止省略 backdrop-blur（这是核心效果）",
    "禁止在低对比度环境下使用浅色文字",
  ],

  components: {
    button: {
      name: "按钮",
      description: "玻璃拟态风格按钮，带有半透明背景和模糊效果",
      code: `<button className="
  px-6 py-3
  bg-white/20 backdrop-blur-md
  border border-white/30
  rounded-xl
  text-white font-medium
  shadow-lg shadow-black/10
  hover:bg-white/30
  hover:shadow-xl
  transition-all duration-300
">
  Glass Button
</button>`,
    },
    card: {
      name: "卡片",
      description: "毛玻璃卡片，适合在渐变背景上展示内容",
      code: `<div className="
  p-6 md:p-8
  bg-white/20 backdrop-blur-xl
  border border-white/30
  rounded-2xl
  shadow-xl shadow-black/10
">
  <h3 className="text-xl font-semibold text-white mb-2">
    Glass Card
  </h3>
  <p className="text-white/80">
    毛玻璃效果的卡片内容
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "玻璃拟态输入框",
      code: `<input
  type="text"
  placeholder="请输入..."
  className="
    w-full px-4 py-3
    bg-white/10 backdrop-blur-md
    border border-white/20
    rounded-xl
    text-white placeholder-white/50
    focus:outline-none focus:border-white/40
    focus:bg-white/20
    transition-all
  "
/>`,
    },
    nav: {
      name: "导航栏",
      description: "固定顶部的毛玻璃导航栏",
      code: `<nav className="
  fixed top-0 left-0 right-0 z-50
  px-6 py-4
  bg-white/10 backdrop-blur-xl
  border-b border-white/10
">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    <a href="/" className="text-white font-bold text-xl">
      Logo
    </a>
    <div className="flex gap-6">
      <a href="#" className="text-white/80 hover:text-white transition-colors">
        首页
      </a>
      <a href="#" className="text-white/80 hover:text-white transition-colors">
        关于
      </a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区块",
      description: "带渐变背景的 Hero 展示区域",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400
  px-6
">
  <div className="
    max-w-2xl mx-auto text-center
    p-8 md:p-12
    bg-white/10 backdrop-blur-xl
    border border-white/20
    rounded-3xl
    shadow-2xl
  ">
    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
      Glassmorphism
    </h1>
    <p className="text-lg text-white/80 mb-8">
      现代感十足的毛玻璃设计风格
    </p>
    <button className="
      px-8 py-4
      bg-white/20 backdrop-blur-md
      border border-white/30
      rounded-full
      text-white font-semibold
      hover:bg-white/30
      transition-all
    ">
      开始探索
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Glassmorphism 全局样式 */

/* 渐变背景变量 */
:root {
  --glass-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* 基础毛玻璃类 */
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
}

/* 渐变背景容器 */
.glass-container {
  background: var(--glass-gradient);
  min-height: 100vh;
}`,

  aiRules: `你是一个 Glassmorphism 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 在纯色背景上使用玻璃效果（必须有渐变或图片背景）
- 省略 backdrop-blur 属性
- 使用硬边缘阴影 shadow-[Xpx_Xpx_0px]
- 使用不透明背景 bg-white, bg-black
- 使用直角 rounded-none

## 必须遵守

- 半透明背景 bg-white/10 到 bg-white/30
- 背景模糊 backdrop-blur-md 或 backdrop-blur-xl
- 细微边框 border border-white/20
- 柔和阴影 shadow-lg, shadow-xl
- 圆角 rounded-xl 或 rounded-2xl
- 渐变背景容器 bg-gradient-to-br

## 配色

渐变背景推荐：
- 紫粉: from-purple-600 via-pink-500 to-orange-400
- 蓝紫: from-blue-600 via-purple-600 to-pink-500
- 青蓝: from-cyan-400 via-blue-500 to-purple-600

玻璃元素：
- 背景: bg-white/10, bg-white/20
- 边框: border-white/20, border-white/30
- 文字: text-white, text-white/80

## 层级结构

1. 底层：渐变背景或图片
2. 中层：毛玻璃容器
3. 顶层：内容元素

## 自检

每次生成代码后检查：
1. 有渐变或图片背景
2. 有 backdrop-blur
3. 使用半透明背景色
4. 有柔和阴影
5. 文字可读性良好`,

  examplePrompts: [
    {
      title: "登录/注册页",
      titleEn: "Login/Register Page",
      description: "毛玻璃风格的认证页面",
      descriptionEn: "Glassmorphic authentication page",
      prompt: `用 Glassmorphism 风格创建一个登录页面，要求：
1. 背景：全屏渐变（紫粉或蓝紫色系）
2. 登录卡片：居中，bg-white/10 backdrop-blur-xl，圆角 rounded-2xl
3. 表单：输入框半透明背景，focus 时边框发光
4. 按钮：渐变背景或半透明白色，hover 时更亮
5. 装饰：添加一些模糊的圆形光斑作为背景装饰`,
    },
    {
      title: "音乐播放器",
      titleEn: "Music Player",
      description: "现代感音乐播放界面",
      descriptionEn: "Modern music player interface",
      prompt: `用 Glassmorphism 风格设计一个音乐播放器界面，要求：
1. 背景：当前播放歌曲的模糊封面图
2. 播放卡片：毛玻璃效果，显示封面、歌曲信息
3. 控制栏：播放/暂停/上下曲按钮，半透明背景
4. 进度条：渐变色轨道，毛玻璃滑块
5. 播放列表：侧边栏，半透明背景，每行歌曲 hover 时更亮`,
    },
    {
      title: "天气应用",
      titleEn: "Weather App",
      description: "精美的天气展示界面",
      descriptionEn: "Beautiful weather display interface",
      prompt: `用 Glassmorphism 风格创建一个天气应用界面，要求：
1. 背景：根据天气变化的渐变（晴天蓝黄、阴天灰蓝等）
2. 主卡片：当前天气，大温度数字，天气图标
3. 小时预报：横向滚动，每个时间点一个小卡片
4. 周预报：列表形式，每行一天
5. 所有卡片：backdrop-blur, bg-white/20, rounded-xl, shadow-lg`,
    },
  ],
};
