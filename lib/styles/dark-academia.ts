import type { DesignStyle } from "./types";

export const darkAcademia: DesignStyle = {
  slug: "dark-academia",
  name: "暗黑学院风",
  nameEn: "Dark Academia",
  description:
    "古典大学图书馆、皮革装帧书籍、古典文学和老式校园美学。深棕与墨绿配色，暗金点缀，温暖而沉静的学术氛围。",
  descriptionEn:
    "Classical university libraries, leather-bound books, classical literature, and vintage campus aesthetics. Deep brown and dark green palette with antique gold accents -- a warm and contemplative scholarly atmosphere.",
  cover: "/styles/dark-academia.svg",
  styleType: "visual",
  tags: ["retro"],
  category: "retro",
  colors: {
    primary: "#3d2b1f",
    secondary: "#2d4a3e",
    accent: ["#8b7355", "#f5f0e1", "#5c4033", "#647f53"],
  },
  keywords: ["暗黑学院", "古典", "图书馆", "文学", "大学", "皮革", "手稿", "retro", "vintage", "nostalgic"],

  philosophy: `Dark Academia（暗黑学院风）是一种以古典教育、文学和建筑为核心的美学流派，融合了古希腊罗马文化、哥特式建筑和维多利亚时代学术氛围。

核心理念：
- 学术古典：古典大学建筑和图书馆的庄严之美
- 文学气息：皮革装帧的古籍与手写体的浪漫
- 温暖沉静：大地色系营造温暖而内敛的氛围
- 知识崇拜：对学习、阅读和智慧的极致推崇

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Dark Academia is an aesthetic movement centered on classical education, literature, and architecture, blending Greco-Roman culture, Gothic architecture, and Victorian-era scholarly atmosphere.

Core principles:
- Scholarly classicism: The solemn beauty of classical university buildings and libraries
- Literary atmosphere: The romance of leather-bound antique books and handwritten scripts
- Warm serenity: Earth tones create a warm yet introspective atmosphere
- Knowledge worship: The ultimate reverence for learning, reading, and wisdom`,

  doList: [
    "使用深棕、墨绿、暗金为主色调",
    "使用奶白色作为背景或文字底色",
    "使用衬线字体传达古典学术感",
    "营造温暖、沉静、内敛的氛围",
    "使用微妙的阴影和边框",
    "添加纸张质感或皮革质感暗示",
  ],

  doListEn: [
    "Use deep brown, dark green, and antique gold as primary colors",
    "Use cream white as background or text base color",
    "Use serif fonts to convey classical scholarly feel",
    "Create a warm, serene, and introspective atmosphere",
    "Use subtle shadows and borders",
    "Add paper texture or leather texture hints",
  ],

  dontList: [
    "禁止使用鲜艳的霓虹配色",
    "禁止使用现代科技感设计",
    "禁止使用过于花哨的动画效果",
    "禁止使用冰冷的灰蓝色调",
  ],

  dontListEn: [
    "Do not use vivid neon colors",
    "Do not use modern tech-feel design",
    "Do not use overly flashy animation effects",
    "Do not use cold blue-gray tones",
  ],

  components: {
    button: {
      name: "按钮",
      description: "暗黑学院风格按钮",
      code: `<button className="
  px-10 py-4
  bg-[#3d2b1f]
  border border-[#8b7355]/45
  text-[#f5f0e1]/85 font-serif tracking-[0.15em]
  rounded-sm
  shadow-[0_4px_10px_rgba(61,43,31,0.2)]
  hover:bg-[#322317]
  hover:text-[#f5f0e1]
  hover:border-[#8b7355]/80
  hover:shadow-[0_8px_18px_rgba(61,43,31,0.35)]
  active:bg-[#24190f]
  transition-all duration-700 ease-in-out
">
  Read More
</button>`,
    },
    card: {
      name: "卡片",
      description: "暗黑学院风格卡片",
      code: `<div className="group relative p-10
  bg-[#f5f0e1]
  border border-[#8b7355]/25
  rounded-sm
  shadow-[inset_0_0_35px_rgba(139,115,85,0.05),0_4px_14px_rgba(61,43,31,0.05)]
  hover:border-[#8b7355]/55
  hover:shadow-[inset_0_0_60px_rgba(139,115,85,0.14),0_8px_24px_rgba(61,43,31,0.1)]
  transition-all duration-1000 ease-in-out
  overflow-hidden
">
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.2),transparent_55%)] transition-opacity duration-1000 ease-in-out pointer-events-none" />
  <div className="relative">
    <div className="w-12 h-px bg-[#8b7355]/40 mb-6 group-hover:w-24 group-hover:bg-[#8b7355] transition-all duration-1000 ease-in-out" />
    <h3 className="text-3xl font-serif text-[#3d2b1f] mb-4 tracking-wide group-hover:text-[#2d2016] transition-colors duration-700">
    Classical Literature
    </h3>
    <p className="text-[#3d2b1f]/70 font-serif leading-relaxed group-hover:text-[#3d2b1f]/90 transition-colors duration-700">
      In the quiet of the library, dust motes drift through candlelight over weathered pages.
    </p>
  </div>
</div>`,
    },
    input: {
      name: "输入框",
      description: "暗黑学院风格输入框",
      code: `<input
  type="text"
  placeholder="Search the archives..."
  className="
    w-full px-6 py-4
    bg-[#f5f0e1]/80
    border border-[#8b7355]/30
    text-[#3d2b1f] placeholder-[#8b7355]/50
    font-serif rounded
    focus:border-[#8b7355]
    focus:shadow-[0_0_8px_rgba(139,115,85,0.2)]
    focus:outline-none
    transition-all
  "
/>`,
    },
    hero: {
      name: "Hero 区块",
      description: "暗黑学院风格 Hero",
      code: `<section className="
  min-h-screen
  flex items-center justify-center
  bg-gradient-to-b from-[#3d2b1f] via-[#2d4a3e] to-[#3d2b1f]
  relative overflow-hidden
">
  <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,...')] bg-repeat" />

  <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
    <h1 className="text-5xl md:text-7xl font-serif text-[#f5f0e1] mb-6 tracking-wide leading-tight">
      Dark Academia
    </h1>
    <p className="text-lg text-[#f5f0e1]/70 font-serif mb-8 leading-relaxed">
      Knowledge is the only flame that illuminates the darkness
    </p>
    <button className="
      px-10 py-4
      bg-[#3d2b1f]
      border border-[#8b7355]/60
      text-[#f5f0e1] font-serif tracking-wide
      rounded
      shadow-sm
      hover:shadow-md
      transition-all
    ">
      Explore the Archive
    </button>
  </div>
</section>`,
    },
  },

  globalCss: `/* Dark Academia 全局样式 */

:root {
  --da-brown: #3d2b1f;
  --da-green: #2d4a3e;
  --da-gold: #8b7355;
  --da-cream: #f5f0e1;
  --da-dark: #5c4033;
}

/* 纸张质感 */
.da-parchment {
  background-color: var(--da-cream);
  background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
}

/* 皮革质感 */
.da-leather {
  background-color: var(--da-brown);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* 书脊装饰 */
.da-spine {
  border-left: 4px solid var(--da-gold);
  padding-left: 1rem;
}

/* 古典分割线 */
.da-divider {
  border: none;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--da-gold),
    transparent
  );
  margin: 2rem 0;
}
@keyframes dark-academia-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes dark-academia-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.dark-academia-card {
  position: relative;
  overflow: hidden;
}

.dark-academia-card::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: linear-gradient(135deg, rgba(61, 43, 31, 0.05), transparent);
  pointer-events: none;
}

.dark-academia-card:hover::before {
  opacity: 1;
}

.dark-academia-frosted {
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  background: rgba(61, 43, 31, 0.08);
}

.dark-academia-accent-corner {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%);
}

.dark-academia-animate-in {
  animation: dark-academia-fade-in 0.5s ease-out both;
}`,

  aiRules: `你是一个 Dark Academia 暗黑学院风设计的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 使用鲜艳的霓虹色彩
- 使用现代科技感设计
- 使用过于花哨的动画效果
- 使用冰冷的灰蓝色调

## 必须遵守

- 深棕墨绿配色 bg-[#3d2b1f], bg-[#2d4a3e]
- 暗金装饰 text-[#8b7355], border-[#8b7355]
- 奶白色背景 bg-[#f5f0e1]
- 衬线字体 font-serif
- 微妙阴影 shadow-sm
- 温暖氛围

## 配色

主色调：
- 深棕: #3d2b1f
- 墨绿: #2d4a3e
- 暗金: #8b7355
- 奶白: #f5f0e1
- 深褐: #5c4033

## 特殊元素

- 纸张质感背景
- 书脊装饰线
- 古典分割线
- 衬线排版

## Animation & Interaction Rules

- Library Stillness: 禁止使用跳跃、缩放或任何轻浮位移（如 \`translate\`）。界面应保持古籍般沉稳。
- Candlelight Reveal: 悬停时可使用极柔和径向光晕或内阴影变化，模拟烛光靠近，亮度变化需克制。
- Antique Slowness: 过渡建议 \`duration-700\` 到 \`duration-1000\`，并使用 \`ease-in-out\` 呈现厚重时间感。
- Ink & Gold: 文本与装饰线在墨黑与暗金之间缓慢过渡，不使用高对比闪烁或突然反转。

## Layout & Spacing
- Section padding: py-16 md:py-24
- Card padding: p-6 md:p-8
- Gap between cards: gap-6 md:gap-8
- Max content width: max-w-6xl mx-auto

## Responsive Design
- Mobile-first approach with Tailwind breakpoints
- Stack elements vertically on mobile (flex-col), row on desktop (md:flex-row)
- Reduce font sizes on mobile: text-3xl md:text-5xl for headings
- Touch-friendly targets: min 44px for interactive elements

## Self-Check Verification
After generating code, verify:
1. All interactive elements have hover/focus/active states
2. Color contrast meets WCAG 2.1 AA (4.5:1 for text)
3. Layout is responsive across breakpoints
4. Typography hierarchy is clear (h1 > h2 > h3 > body)
5. Spacing is consistent using the defined scale
6. All animations respect prefers-reduced-motion`,

  aiRulesEn: `You are a Dark Academia design style frontend development expert. All generated code must strictly follow these constraints:

## Absolutely Forbidden

- Vivid neon colors
- Modern tech-feel design
- Overly flashy animation effects
- Cold blue-gray tones

## Must Follow

- Deep brown and dark green palette bg-[#3d2b1f], bg-[#2d4a3e]
- Antique gold decorations text-[#8b7355], border-[#8b7355]
- Cream white background bg-[#f5f0e1]
- Serif fonts font-serif
- Subtle shadows shadow-sm
- Warm atmosphere

## Color Palette

Primary:
- Deep Brown: #3d2b1f
- Dark Green: #2d4a3e
- Antique Gold: #8b7355
- Cream White: #f5f0e1
- Dark Umber: #5c4033

## Special Elements

- Paper texture backgrounds
- Book spine decorative lines
- Classical divider lines
- Serif typography

## Animation & Interaction Rules

- Library Stillness: No jumping, scaling, or any frivolous displacement (like \`translate\`). The interface should maintain the composure of ancient tomes.
- Candlelight Reveal: Hover may use extremely soft radial glow or inner shadow changes, simulating candlelight approaching -- brightness changes must be restrained.
- Antique Slowness: Transitions should use \`duration-700\` to \`duration-1000\` with \`ease-in-out\` for a weighty sense of time.
- Ink & Gold: Text and decorative lines transition slowly between ink black and antique gold, without high-contrast flashing or sudden inversions.`,

  examplePrompts: [
    {
      title: "古典图书馆目录",
      titleEn: "Classical Library Catalog",
      description: "暗黑学院风格图书馆",
      descriptionEn: "Dark academia style library",
      prompt: `用 Dark Academia 风格创建一个古典图书馆页面，要求：
1. 背景：温暖的奶白色纸张质感
2. 标题：深棕色衬线字体
3. 卡片：微妙边框和阴影
4. 添加书脊装饰线
5. 整体温暖沉静的学术氛围`,
    },
  {
      title: "SaaS 着陆页",
      titleEn: "SaaS Landing Page",
      description: "生成 暗黑学院风风格的 SaaS 产品着陆页",
      descriptionEn: "Generate a SaaS product landing page in Dark Academia style",
      prompt: `Create a SaaS landing page using Dark Academia style with hero section, feature grid, testimonials, pricing table, and footer.`,
    },
    {
      title: "作品集展示",
      titleEn: "Portfolio Showcase",
      description: "生成 暗黑学院风风格的作品集页面",
      descriptionEn: "Generate a portfolio showcase in Dark Academia style",
      prompt: `Create a portfolio showcase page using Dark Academia style with project grid, about section, contact form, and consistent visual language.`,
    }],

  variants: [
    {
      id: "dark-academia-warm",
      name: "暗黑学院风暖色版",
      nameEn: "Dark Academia Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#342e19",
        secondary: "#425c51",
        accent: ["#78794f", "#edf2e1", "#50452a"],
      },
    },
    {
      id: "dark-academia-cool",
      name: "暗黑学院风冷色版",
      nameEn: "Dark Academia Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#422829",
        secondary: "#294338",
        accent: ["#996d64", "#fceee6", "#623d41"],
      },
    },
  ],
};
