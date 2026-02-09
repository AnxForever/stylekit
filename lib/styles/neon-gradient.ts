import { DesignStyle } from "./index";

export const neonGradient: DesignStyle = {
  slug: "neon-gradient",
  name: "霓虹渐变",
  nameEn: "Neon Gradient",
  description:
    "深色背景上的鲜艳渐变卡片，配合粗彩色边框和霓虹发光效果，适合科技产品、SaaS 着陆页、年轻化品牌。",
  cover: "/styles/neon-gradient.svg",
  styleType: "visual",
  tags: ["expressive"],
  category: "expressive",
  colors: {
    primary: "#a855f7",
    secondary: "#0f0a1e",
    accent: ["#f472b6", "#22d3ee", "#a3e635", "#fbbf24", "#fb7185"],
  },
  keywords: ["霓虹", "渐变", "深色", "发光", "科技", "SaaS", "年轻化"],

  philosophy: `Neon Gradient（霓虹渐变）是一种大胆、现代的设计风格，在深色背景上使用鲜艳的渐变色卡片和粗彩色边框，营造出未来感和科技感。

核心理念：
- 深色画布：深紫/深蓝背景作为霓虹色的完美衬托
- 鲜艳渐变：紫粉、青绿、黄绿等高饱和度渐变填充
- 粗彩色边框：3-4px 的亮色边框增强视觉冲击
- 发光效果：box-shadow 模拟霓虹灯光晕
- 漂浮元素：星星、火箭、几何图形作为装饰

适用场景：SaaS 产品、开发者工具、游戏平台、年轻化品牌`,

  doList: [
    "使用深色背景 bg-[#0f0a1e] 或 bg-slate-900",
    "卡片使用渐变填充 bg-gradient-to-br from-purple-500 to-pink-500",
    "添加粗彩色边框 border-4 border-yellow-400",
    "使用圆角 rounded-2xl 或 rounded-3xl",
    "添加发光阴影 shadow-[0_0_30px_rgba(168,85,247,0.5)]",
    "标题使用渐变文字或纯白色",
    "装饰元素使用 Lucide 图标（Star, Rocket, Sparkles）",
    "按钮使用渐变背景 + 发光效果",
  ],

  dontList: [
    "禁止使用浅色背景",
    "禁止使用低饱和度颜色",
    "禁止使用细边框 border 或 border-2",
    "禁止使用灰色调卡片",
    "禁止省略发光效果",
    "禁止使用 emoji（用 Lucide 图标替代）",
  ],

  components: {
    button: {
      name: "按钮",
      description: "霓虹渐变按钮，带发光效果",
      code: `{/* 主按钮 - 青粉渐变 */}
<button className="
  px-6 py-3 md:px-8 md:py-4
  bg-gradient-to-r from-cyan-400 to-pink-500
  text-white font-bold
  rounded-xl
  border-2 border-white/20
  shadow-[0_0_20px_rgba(236,72,153,0.5)]
  hover:shadow-[0_0_30px_rgba(236,72,153,0.7)]
  hover:scale-105
  transition-all duration-300
  text-sm md:text-base
">
  开始免费试用
</button>

{/* 次按钮 - 透明边框 */}
<button className="
  px-6 py-3 md:px-8 md:py-4
  bg-transparent
  text-white font-bold
  rounded-xl
  border-2 border-cyan-400
  hover:bg-cyan-400/10
  hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]
  transition-all duration-300
  text-sm md:text-base
">
  观看演示
</button>

{/* 图标按钮 */}
<button className="
  w-12 h-12
  bg-gradient-to-br from-purple-500 to-pink-500
  rounded-xl
  border-2 border-yellow-400
  shadow-[0_0_15px_rgba(250,204,21,0.4)]
  hover:scale-110
  transition-all duration-300
  flex items-center justify-center
">
  <ArrowRight className="w-5 h-5 text-white" />
</button>`,
    },
    card: {
      name: "卡片",
      description: "渐变填充卡片，粗彩色边框",
      code: `{/* 紫粉渐变卡片 */}
<div className="
  bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500
  rounded-2xl md:rounded-3xl
  border-4 border-yellow-400
  p-6 md:p-8
  shadow-[0_0_30px_rgba(168,85,247,0.4)]
  hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]
  hover:-translate-y-2
  transition-all duration-300
">
  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
    <Zap className="w-6 h-6 text-white" />
  </div>
  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">快点</h3>
  <p className="text-white/80 text-sm md:text-base">极速响应，毫秒级延迟</p>
</div>

{/* 青绿渐变卡片 */}
<div className="
  bg-gradient-to-br from-cyan-400 via-teal-500 to-green-500
  rounded-2xl md:rounded-3xl
  border-4 border-pink-400
  p-6 md:p-8
  shadow-[0_0_30px_rgba(34,211,238,0.4)]
  hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]
  hover:-translate-y-2
  transition-all duration-300
">
  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
    <Shield className="w-6 h-6 text-white" />
  </div>
  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">安全</h3>
  <p className="text-white/80 text-sm md:text-base">企业级安全保障</p>
</div>

{/* 粉红渐变卡片 */}
<div className="
  bg-gradient-to-br from-pink-500 via-rose-500 to-red-500
  rounded-2xl md:rounded-3xl
  border-4 border-cyan-400
  p-6 md:p-8
  shadow-[0_0_30px_rgba(236,72,153,0.4)]
  hover:shadow-[0_0_40px_rgba(236,72,153,0.6)]
  hover:-translate-y-2
  transition-all duration-300
">
  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
    <Users className="w-6 h-6 text-white" />
  </div>
  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">团队</h3>
  <p className="text-white/80 text-sm md:text-base">无缝协作体验</p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "深色背景输入框，发光边框",
      code: `<div className="relative">
  <input
    type="text"
    placeholder="输入你的邮箱..."
    className="
      w-full
      px-5 py-4
      bg-white/5
      border-2 border-purple-500/50
      rounded-xl
      text-white
      placeholder:text-white/40
      focus:outline-none
      focus:border-cyan-400
      focus:shadow-[0_0_20px_rgba(34,211,238,0.3)]
      transition-all duration-300
    "
  />
  <button className="
    absolute right-2 top-1/2 -translate-y-1/2
    px-4 py-2
    bg-gradient-to-r from-cyan-400 to-purple-500
    rounded-lg
    text-white font-medium text-sm
    hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]
    transition-all duration-300
  ">
    订阅
  </button>
</div>`,
    },
    nav: {
      name: "导航栏",
      description: "深色透明导航，发光按钮",
      code: `<nav className="
  fixed top-0 left-0 right-0 z-50
  bg-[#0f0a1e]/80 backdrop-blur-xl
  border-b border-purple-500/20
  px-4 md:px-8
  py-4
">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    {/* Logo */}
    <a href="/" className="flex items-center gap-2">
      <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      <span className="font-bold text-white text-lg">ACME公司</span>
    </a>

    {/* Nav Links */}
    <div className="hidden md:flex items-center gap-8">
      <a href="#" className="text-pink-400 font-medium hover:text-pink-300 transition-colors">特色</a>
      <a href="#" className="text-white/70 font-medium hover:text-white transition-colors">定价</a>
      <a href="#" className="text-white/70 font-medium hover:text-white transition-colors">关于</a>
      <a href="#" className="text-white/70 font-medium hover:text-white transition-colors">联系方式</a>
    </div>

    {/* CTA */}
    <div className="flex items-center gap-3">
      <a href="#" className="text-cyan-400 font-medium hover:text-cyan-300 transition-colors">登录</a>
      <button className="
        px-4 py-2
        bg-gradient-to-r from-cyan-400 to-purple-500
        text-white font-medium
        rounded-lg
        border border-white/20
        hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]
        transition-all duration-300
      ">
        开始
      </button>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区块",
      description: "深色背景 Hero，渐变标题和漂浮卡片",
      code: `<section className="
  min-h-screen
  bg-[#0f0a1e]
  bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
  from-purple-900/20 via-[#0f0a1e] to-[#0f0a1e]
  px-4 md:px-8
  py-20 md:py-32
  overflow-hidden
  relative
">
  {/* 装饰元素 */}
  <div className="absolute top-20 left-10 text-yellow-400 animate-pulse">
    <Star className="w-6 h-6 fill-current" />
  </div>
  <div className="absolute top-40 right-20 text-pink-400">
    <Rocket className="w-8 h-8" />
  </div>
  <div className="absolute bottom-40 left-1/4 text-cyan-400 animate-bounce">
    <Sparkles className="w-5 h-5" />
  </div>

  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
    {/* 左侧文字 */}
    <div>
      {/* 标签 */}
      <div className="
        inline-flex items-center gap-2
        px-4 py-2 mb-6
        border-2 border-dashed border-yellow-400
        rounded-full
        text-yellow-400 text-sm font-medium
      ">
        <Star className="w-4 h-4 fill-current" />
        加入已经在使用 ACME 的 50,000+ 团队
        <Star className="w-4 h-4 fill-current" />
      </div>

      {/* 标题 */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6">
        <span className="text-purple-400">改变</span>
        <span className="text-cyan-400">你的方式</span>
        <br />
        <span className="text-pink-400">团队</span>
        <br />
        <span className="text-white">著作</span>
      </h1>

      {/* 描述 */}
      <p className="text-white/70 text-lg md:text-xl max-w-lg mb-8">
        Acme平台通过强大的工具将您的团队整合在一起，旨在简化工作流程、提升生产力并推动成果。
      </p>

      {/* 按钮 */}
      <div className="flex flex-wrap gap-4">
        <button className="
          px-6 py-4
          bg-gradient-to-r from-cyan-400 via-green-400 to-yellow-400
          text-black font-bold
          rounded-xl
          border-2 border-pink-400
          shadow-[0_0_20px_rgba(34,211,238,0.4)]
          hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]
          hover:scale-105
          transition-all duration-300
          flex items-center gap-2
        ">
          开始免费试用
          <Sparkles className="w-5 h-5" />
        </button>
        <button className="
          px-6 py-4
          bg-transparent
          text-white font-bold
          rounded-xl
          border-2 border-white/30
          hover:border-white/50
          hover:bg-white/5
          transition-all duration-300
          flex items-center gap-2
        ">
          <ArrowRight className="w-5 h-5" />
          观看演示
        </button>
      </div>
    </div>

    {/* 右侧卡片 */}
    <div className="relative">
      {/* 紫粉卡片 */}
      <div className="
        absolute -top-4 -left-4 md:top-0 md:left-0
        w-48 md:w-56
        bg-gradient-to-br from-purple-500 to-pink-500
        rounded-2xl
        border-4 border-yellow-400
        p-5
        shadow-[0_0_30px_rgba(168,85,247,0.5)]
        transform rotate-[-8deg]
        z-10
      ">
        <Zap className="w-10 h-10 text-white mb-3" />
        <p className="text-white font-bold text-lg">快点</p>
      </div>

      {/* 青绿卡片 */}
      <div className="
        absolute top-20 right-0 md:top-24 md:right-4
        w-48 md:w-56
        bg-gradient-to-br from-green-400 to-cyan-400
        rounded-2xl
        border-4 border-pink-400
        p-5
        shadow-[0_0_30px_rgba(34,211,238,0.5)]
        transform rotate-[5deg]
        z-20
      ">
        <Shield className="w-10 h-10 text-white mb-3" />
        <p className="text-white font-bold text-lg">安全</p>
      </div>

      {/* 粉红卡片 */}
      <div className="
        absolute bottom-0 left-1/4
        w-52 md:w-64
        bg-gradient-to-br from-pink-500 to-rose-500
        rounded-2xl
        border-4 border-cyan-400
        p-5
        shadow-[0_0_30px_rgba(236,72,153,0.5)]
        transform rotate-[3deg]
        z-30
      ">
        <Users className="w-10 h-10 text-white mb-3" />
        <p className="text-white font-bold text-lg">团队</p>
      </div>
    </div>
  </div>
</section>`,
    },
    footer: {
      name: "底部工具栏",
      description: "固定底部的设计/提示切换栏",
      code: `<div className="
  fixed bottom-6 right-6
  flex items-center gap-2
  bg-[#1a1a2e]/90 backdrop-blur-xl
  rounded-xl
  border border-white/10
  p-2
">
  <button className="
    px-4 py-2
    bg-white/10
    text-white text-sm font-medium
    rounded-lg
    hover:bg-white/20
    transition-colors
  ">
    设计/提示
  </button>
  <button className="
    px-4 py-2
    text-white/60 text-sm font-medium
    rounded-lg
    hover:text-white hover:bg-white/10
    transition-colors
  ">
    提示
  </button>
  <button className="
    px-4 py-2
    bg-gradient-to-r from-purple-500 to-pink-500
    text-white text-sm font-medium
    rounded-lg
    hover:shadow-[0_0_15px_rgba(168,85,247,0.5)]
    transition-all
    flex items-center gap-2
  ">
    <Palette className="w-4 h-4" />
    风格
  </button>
</div>`,
    },
  },

  globalCss: `/* Neon Gradient 全局样式 */
:root {
  --neon-bg: #0f0a1e;
  --neon-purple: #a855f7;
  --neon-pink: #ec4899;
  --neon-cyan: #22d3ee;
  --neon-green: #a3e635;
  --neon-yellow: #fbbf24;
}

body {
  background: var(--neon-bg);
  color: white;
}

/* 发光文字 */
.neon-text-purple {
  color: var(--neon-purple);
  text-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
}

.neon-text-cyan {
  color: var(--neon-cyan);
  text-shadow: 0 0 20px rgba(34, 211, 238, 0.5);
}

.neon-text-pink {
  color: var(--neon-pink);
  text-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
}

/* 渐变边框 */
.neon-border-gradient {
  border: 4px solid transparent;
  background: linear-gradient(var(--neon-bg), var(--neon-bg)) padding-box,
              linear-gradient(135deg, var(--neon-cyan), var(--neon-pink)) border-box;
}

/* 卡片发光 */
.neon-glow-purple {
  box-shadow: 0 0 30px rgba(168, 85, 247, 0.4);
}

.neon-glow-cyan {
  box-shadow: 0 0 30px rgba(34, 211, 238, 0.4);
}

.neon-glow-pink {
  box-shadow: 0 0 30px rgba(236, 72, 153, 0.4);
}

/* 动画 */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.neon-float {
  animation: float 3s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px currentColor; }
  50% { box-shadow: 0 0 40px currentColor; }
}

.neon-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}`,

  aiRules: `你是一个 Neon Gradient（霓虹渐变）设计风格的前端开发专家。

## 核心特征

背景：
- 深色：bg-[#0f0a1e] 或 bg-slate-900
- 可添加径向渐变：bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20

卡片：
- 渐变填充：bg-gradient-to-br from-purple-500 to-pink-500
- 粗边框：border-4 border-yellow-400（对比色）
- 圆角：rounded-2xl 或 rounded-3xl
- 发光：shadow-[0_0_30px_rgba(168,85,247,0.4)]

配色系统：
- 紫色：#a855f7 - 主色
- 粉红：#ec4899 - 强调
- 青色：#22d3ee - 对比
- 黄色：#fbbf24 - 边框高亮
- 绿色：#a3e635 - 辅助

渐变组合：
- 紫粉：from-purple-500 via-pink-500 to-rose-500
- 青绿：from-cyan-400 via-teal-500 to-green-500
- 青粉：from-cyan-400 to-pink-500
- 黄绿：from-yellow-400 via-green-400 to-cyan-400

边框配色（对比原则）：
- 紫粉卡片 → border-yellow-400 或 border-cyan-400
- 青绿卡片 → border-pink-400 或 border-yellow-400
- 粉红卡片 → border-cyan-400

## 装饰元素

使用 Lucide React 图标：
- Star（星星）- 带 fill-current 填充
- Rocket（火箭）
- Sparkles（闪光）
- Zap（闪电）
- Shield（盾牌）

位置：absolute 定位，分散在页面各处
效果：animate-pulse, animate-bounce

## 交互

- hover:shadow-[0_0_40px_...] 发光增强
- hover:scale-105 放大
- hover:-translate-y-2 上浮
- transition-all duration-300

## 禁止

- 浅色背景
- 低饱和度颜色
- 细边框（border, border-2）
- 灰色调
- emoji 字符（用图标替代）`,

  examplePrompts: [
    {
      title: "SaaS 产品着陆页",
      titleEn: "SaaS Product Landing Page",
      description: "团队协作工具宣传页",
      descriptionEn: "Team collaboration tool promotion page",
      prompt: `用 Neon Gradient 风格创建一个 SaaS 产品着陆页，要求：

## 背景
- bg-[#0f0a1e] 深紫黑色
- 顶部添加紫色径向渐变光晕

## 导航栏
- 半透明深色 bg-[#0f0a1e]/80 backdrop-blur-xl
- Logo 带黄色渐变背景
- 链接：粉色高亮当前页，白色其他
- CTA 按钮：青紫渐变

## Hero 区块
- 左侧：虚线边框标签、渐变色标题、描述文字、双按钮
- 右侧：三张漂浮渐变卡片，不同旋转角度
- 装饰：星星、火箭、闪光图标散落

## 卡片设计
- 紫粉渐变 + 黄色边框 border-4
- 青绿渐变 + 粉色边框
- 粉红渐变 + 青色边框
- 每张带发光阴影 shadow-[0_0_30px_...]

## 按钮
- 主按钮：青黄渐变，粉色边框，发光效果
- 次按钮：透明，白色边框`,
    },
    {
      title: "开发者工具页面",
      titleEn: "Developer Tools Page",
      description: "API 或 SDK 产品介绍",
      descriptionEn: "API or SDK product introduction",
      prompt: `用 Neon Gradient 风格创建一个开发者工具介绍页，要求：

## 配色
- 背景：深色 bg-slate-900
- 主色：青色系 #22d3ee
- 强调：紫色系 #a855f7

## Hero
- 代码风格标题，带语法高亮色
- 终端样式代码块展示
- 安装命令一键复制按钮

## 功能卡片
- 图标 + 标题 + 描述
- 渐变背景：青紫、紫粉、粉黄
- 粗边框：对比色
- hover 发光增强

## 代码示例区
- 深色代码块 bg-black/50
- 语法高亮：关键字紫色、字符串绿色、函数青色
- 行号 + 复制按钮

## 定价卡片
- 免费版：透明边框
- 专业版：紫粉渐变填充，黄色边框
- 企业版：青绿渐变填充，粉色边框`,
    },
    {
      title: "游戏平台首页",
      titleEn: "Gaming Platform Homepage",
      description: "电竞或游戏社区",
      descriptionEn: "Esports or gaming community",
      prompt: `用 Neon Gradient 风格创建一个游戏平台首页，要求：

## 背景
- 深色 bg-[#0a0a0f]
- 网格线装饰
- 多个发光光斑

## 导航
- 霓虹风格 logo
- 游戏分类下拉
- 用户头像 + 金币数量

## Hero
- 大型游戏封面轮播
- 渐变遮罩
- 立即游戏按钮：亮色渐变

## 游戏卡片网格
- 封面图 + 渐变遮罩
- 游戏名称
- 在线人数标签（发光绿点）
- hover 边框发光

## 排行榜
- 深色半透明背景
- 排名数字：金/银/铜渐变
- 用户头像 + 积分

## 装饰
- 闪电、星星、火焰图标
- 粒子效果背景`,
    },
  ],
};
