import { DesignStyle } from "./index";

export const stripeStyle: DesignStyle = {
  slug: "stripe-style",
  name: "Stripe 风格",
  nameEn: "Stripe Style",
  description:
    "精致专业的金融科技风格，以 Stripe 紫为主色调，配合渐变网格背景、精致卡片阴影和流畅动画，适合支付产品和开发者工具。",
  cover: "/styles/stripe-style.svg",
  styleType: "visual",
  tags: ["modern"],
  category: "modern",
  colors: {
    primary: "#635bff",
    secondary: "#0a2540",
    accent: ["#00d4ff", "#7a73ff", "#80e9ff"],
  },
  keywords: ["Stripe", "金融", "支付", "SaaS", "开发者", "专业", "科技"],

  philosophy: `Stripe Style 是一种源于 Stripe 的精致设计风格，以其标志性的紫色和专业的视觉语言著称。通过渐变网格背景、精致的卡片阴影和流畅的动画，传达信任感和技术实力。

核心理念：
- 专业信任：精致的设计传达可靠性
- 技术感：网格背景和代码元素展示技术实力
- 品牌一致：Stripe 紫贯穿整个设计
- 流畅体验：微妙的动画增强交互感`,

  doList: [
    "使用 Stripe 紫 #635bff 作为主色调",
    "添加渐变网格背景增加技术感",
    "使用精致的多层阴影",
    "保持适中的圆角 rounded-lg 或 rounded-xl",
    "使用流畅的过渡动画",
    "代码块使用深色背景",
  ],

  dontList: [
    "禁止使用过于鲜艳的配色",
    "禁止使用过大的圆角",
    "禁止使用粗糙的阴影",
    "禁止忽略网格背景元素",
    "禁止使用不专业的字体",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Stripe 风格按钮，专业精致",
      code: `<button className="
  px-6 py-3
  bg-[#635bff]
  rounded-lg
  text-white font-medium
  shadow-[0_2px_4px_rgba(99,91,255,0.2),0_4px_8px_rgba(99,91,255,0.2)]
  hover:shadow-[0_4px_8px_rgba(99,91,255,0.3),0_8px_16px_rgba(99,91,255,0.2)]
  hover:-translate-y-0.5
  transition-all duration-200
">
  Get Started
</button>`,
    },
    card: {
      name: "卡片",
      description: "Stripe 风格卡片，精致阴影",
      code: `<div className="
  p-6
  bg-white
  rounded-xl
  shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]
  hover:shadow-[0_4px_8px_rgba(0,0,0,0.06),0_16px_32px_rgba(0,0,0,0.1)]
  transition-shadow duration-300
">
  <h3 className="text-xl font-semibold text-[#0a2540] mb-2">
    Payments
  </h3>
  <p className="text-gray-600">
    Accept payments online with a complete platform
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "Stripe 风格输入框",
      code: `<input
  type="text"
  placeholder="Card number"
  className="
    w-full px-4 py-3
    bg-white
    border border-gray-300
    rounded-lg
    text-[#0a2540] placeholder-gray-400
    shadow-[0_1px_2px_rgba(0,0,0,0.05)]
    focus:outline-none focus:ring-2 focus:ring-[#635bff] focus:border-transparent
    transition-all
  "
/>`,
    },
    nav: {
      name: "导航栏",
      description: "Stripe 风格导航栏",
      code: `<nav className="
  px-6 py-4
  bg-white
  border-b border-gray-200
">
  <div className="max-w-6xl mx-auto flex items-center justify-between">
    <a href="/" className="text-[#635bff] font-bold text-xl">
      stripe
    </a>
    <div className="flex items-center gap-8">
      <a href="#" className="text-[#0a2540] hover:text-[#635bff] font-medium transition-colors">
        Products
      </a>
      <a href="#" className="text-[#0a2540] hover:text-[#635bff] font-medium transition-colors">
        Developers
      </a>
      <button className="px-4 py-2 bg-[#635bff] text-white rounded-lg font-medium hover:bg-[#5851ea] transition-colors">
        Sign in
      </button>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero 区块",
      description: "Stripe 风格 Hero 展示区域",
      code: `<section className="
  relative
  min-h-screen
  flex items-center
  bg-[#f6f9fc]
  overflow-hidden
">
  {/* Grid Background */}
  <div className="absolute inset-0 opacity-40"
    style={{
      backgroundImage: \`
        linear-gradient(to right, rgba(99,91,255,0.1) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(99,91,255,0.1) 1px, transparent 1px)
      \`,
      backgroundSize: '40px 40px'
    }}
  />

  <div className="relative max-w-6xl mx-auto px-6 py-20">
    <h1 className="text-5xl md:text-7xl font-bold text-[#0a2540] mb-6">
      Financial infrastructure<br />
      <span className="text-[#635bff]">for the internet</span>
    </h1>
    <p className="text-xl text-gray-600 mb-8 max-w-2xl">
      Millions of companies use Stripe to accept payments, send payouts, and manage their businesses online.
    </p>
    <div className="flex gap-4">
      <button className="px-8 py-4 bg-[#635bff] text-white rounded-full font-semibold shadow-lg hover:-translate-y-0.5 transition-all">
        Start now
      </button>
      <button className="px-8 py-4 bg-white text-[#0a2540] rounded-full font-semibold shadow-lg hover:-translate-y-0.5 transition-all">
        Contact sales
      </button>
    </div>
  </div>
</section>`,
    },
  },

  globalCss: `/* Stripe Style 全局样式 */

:root {
  --stripe-purple: #635bff;
  --stripe-purple-light: #7a73ff;
  --stripe-dark: #0a2540;
  --stripe-cyan: #00d4ff;
  --stripe-bg: #f6f9fc;
  --stripe-grid: rgba(99, 91, 255, 0.1);
}

/* 网格背景 */
.stripe-grid-bg {
  background-image:
    linear-gradient(to right, var(--stripe-grid) 1px, transparent 1px),
    linear-gradient(to bottom, var(--stripe-grid) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Stripe 风格卡片阴影 */
.stripe-card {
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 8px 16px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;
}

.stripe-card:hover {
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.06),
    0 16px 32px rgba(0, 0, 0, 0.1);
}

/* Stripe 风格按钮 */
.stripe-button {
  background: var(--stripe-purple);
  box-shadow:
    0 2px 4px rgba(99, 91, 255, 0.2),
    0 4px 8px rgba(99, 91, 255, 0.2);
  transition: all 0.2s ease;
}

.stripe-button:hover {
  transform: translateY(-2px);
  box-shadow:
    0 4px 8px rgba(99, 91, 255, 0.3),
    0 8px 16px rgba(99, 91, 255, 0.2);
}

/* 代码块样式 */
.stripe-code {
  background: var(--stripe-dark);
  border-radius: 8px;
  font-family: 'SF Mono', SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
}`,

  aiRules: `你是一个 Stripe Style 设计风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用非 Stripe 品牌色作为主色
- 使用过大的圆角 rounded-3xl, rounded-full（按钮除外）
- 使用粗糙的单层阴影
- 忽略网格背景元素
- 使用不专业的配色

## 必须遵守

- 主色调 Stripe 紫 #635bff
- 深色文字 #0a2540
- 背景色 #f6f9fc
- 精致多层阴影
- 适中圆角 rounded-lg, rounded-xl
- 流畅过渡动画

## 配色

主色调：
- Stripe 紫: bg-[#635bff], text-[#635bff]
- 深蓝: text-[#0a2540]
- 背景: bg-[#f6f9fc]

强调色：
- 青色: #00d4ff
- 浅紫: #7a73ff
- 亮青: #80e9ff

## 阴影

卡片阴影：
shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.08)]

按钮阴影：
shadow-[0_2px_4px_rgba(99,91,255,0.2),0_4px_8px_rgba(99,91,255,0.2)]

## 网格背景

使用 CSS 线性渐变创建网格：
background-image: linear-gradient(to right, rgba(99,91,255,0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(99,91,255,0.1) 1px, transparent 1px);
background-size: 40px 40px;

## 自检

每次生成代码后检查：
1. 使用了 Stripe 紫作为主色
2. 阴影精致多层
3. 有网格背景元素
4. 整体感觉专业可信`,

  examplePrompts: [
    {
      title: "支付页面",
      titleEn: "Payment Page",
      description: "Stripe 风格支付表单",
      descriptionEn: "Stripe-style payment form",
      prompt: `用 Stripe Style 创建一个支付页面，要求：
1. 背景：浅灰色 + 网格图案
2. 支付卡片：白色背景，精致阴影
3. 表单：卡号、有效期、CVV 输入框
4. 按钮：Stripe 紫，悬停上浮效果
5. 安全标识：锁图标和安全文字`,
    },
    {
      title: "开发者文档",
      titleEn: "Developer Docs",
      description: "Stripe 风格 API 文档",
      descriptionEn: "Stripe-style API documentation",
      prompt: `用 Stripe Style 设计一个开发者文档页面，要求：
1. 左侧：导航菜单，API 端点列表
2. 右侧：代码示例，深色背景
3. 标题：清晰的层级结构
4. 代码块：语法高亮，复制按钮
5. 整体：专业、技术感强`,
    },
  ],
};
