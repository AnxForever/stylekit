import { DesignStyle } from "./index";

export const editorial: DesignStyle = {
  slug: "editorial",
  name: "编辑杂志风",
  nameEn: "Editorial",
  description:
    "优雅的杂志排版风格，衬线标题、无衬线正文、精致的留白和网格系统。灵感来自高端时尚杂志和报纸排版。暖米色背景、柔和黑文字、精细的透明度层次和动画下划线交互。",
  cover: "/styles/editorial.svg",
  styleType: "visual",
  tags: ["minimal"],
  category: "minimal",
  colors: {
    primary: "#1C1C1C",
    secondary: "#F9F8F6",
    accent: ["#1C1C1C", "#6b7280"],
  },
  keywords: ["杂志排版", "衬线字体", "优雅留白", "网格系统", "极简主义", "作品集", "单色"],

  philosophy: `Editorial（编辑杂志风）设计风格源于传统印刷媒体的排版美学，特别是高端时尚杂志和报纸的设计语言。这种风格强调内容的层次结构、精致的字体搭配和大量留白。

核心理念：
- 内容为王：设计服务于内容，不喧宾夺主。UI 是低声细语，不是大声喊叫
- 字体层次：衬线标题与无衬线正文形成对比，标签使用 uppercase tracking 增加呼吸感
- 留白即美：适当的负空间让内容呼吸，section 间距 py-24 md:py-40 起步
- 单色克制：仅使用 #1C1C1C 配合不同透明度（/60 /40 /10）构建视觉层次，拒绝彩色装饰
- 微妙动效：hover-underline 动画、clip-path reveal、group-hover:italic 等克制而精致的交互`,

  doList: [
    "标题使用衬线字体 font-serif，正文使用无衬线字体 font-sans",
    "背景使用暖米色 bg-[#F9F8F6]，文字使用柔和黑 text-[#1C1C1C]",
    "使用透明度层次构建灰度：text-[#1C1C1C]/60（次要）、/40（辅助）、/10（边框）",
    "标签样式使用 font-sans text-xs tracking-[0.2em] uppercase",
    "Section 间距至少 py-24 md:py-40，容器内边距 px-6 md:px-12",
    "链接和按钮使用 hover-underline 动画下划线效果",
    "标题使用 tracking-tighter 紧凑字间距，hero 标题 text-6xl md:text-8xl 起步",
    "斜体用于副标题或装饰性文字：italic text-[#1C1C1C]/60",
    "表单使用底线输入框 + 浮动标签（peer-focus 模式）",
    "hover 交互使用 group-hover:italic 和微妙的 transition-all duration-500",
  ],

  dontList: [
    "禁止使用彩色强调色（红、蓝、绿等），保持纯单色体系",
    "禁止使用粗边框或阴影（shadow-*）",
    "禁止使用 #0a0a0a 纯黑或 #fafafa 冷白作为主色",
    "禁止标题使用无衬线字体",
    "禁止过小的行高，正文至少 leading-relaxed",
    "禁止元素堆积，保持呼吸感",
    "禁止使用渐变、背景图案或装饰性几何元素",
    "禁止使用大圆角 rounded-xl 以上",
  ],

  components: {
    button: {
      name: "按钮",
      description: "Editorial 风格按钮，强调黑白反转与细线提示",
      code: `{/* Contrast button */}
<button className="
  px-8 py-4
  bg-[#1C1C1C] text-[#F9F8F6]
  font-sans text-xs font-medium tracking-[0.2em] uppercase
  border border-[#1C1C1C]
  hover:bg-[#F9F8F6] hover:text-[#1C1C1C]
  transition-colors duration-200
">
  Read Story
</button>

{/* Text link with underline reveal */}
<button className="
  font-sans text-xs tracking-[0.2em] uppercase
  relative pb-1
  after:content-[''] after:absolute after:w-full after:h-px
  after:bottom-0 after:left-0 after:bg-current
  after:origin-bottom-right after:scale-x-0
  hover:after:origin-bottom-left hover:after:scale-x-100
  after:transition-transform after:duration-500
  after:ease-[cubic-bezier(0.16,1,0.3,1)]
  flex items-center gap-4 group
">
  View All
</button>
`,
    },
    card: {
      name: "卡片",
      description: "杂志内容卡片，慢速画幅放大与细线延展",
      code: `<div className="
  group border-t border-[#1C1C1C]/10 pt-6
  hover:border-[#1C1C1C]/40
  transition-colors duration-500
  cursor-pointer
">
  <div className="aspect-[4/5] bg-[#1C1C1C]/5 overflow-hidden mb-6">
    <div className="w-full h-full bg-[#1C1C1C]/10 group-hover:scale-105 transition-transform duration-1000 ease-out" />
  </div>
  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#1C1C1C]/40 mb-3 group-hover:text-[#1C1C1C]/70 transition-colors duration-300">
    Architecture
  </p>
  <h3 className="font-serif text-3xl tracking-tighter leading-snug mb-4">
    <span className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-current group-hover:after:w-full after:transition-[width] after:duration-500">
      The Silent Brutalism
    </span>
  </h3>
  <p className="font-sans text-sm text-[#1C1C1C]/60 leading-relaxed">
    Exploring the raw concrete monoliths that define the modern urban landscape.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "底线输入框 + 浮动标签，衬线字体输入文字",
      code: `<div className="relative">
  <input
    type="text"
    id="name"
    className="
      w-full bg-transparent
      border-b border-[#1C1C1C]/20
      py-4 font-serif text-xl
      focus:outline-none focus:border-[#1C1C1C]
      transition-colors
      peer placeholder-transparent
    "
    placeholder="Name"
  />
  <label
    htmlFor="name"
    className="
      absolute left-0 top-4
      font-sans text-xs tracking-[0.2em] uppercase text-[#1C1C1C]/40
      transition-all
      peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#1C1C1C]
      peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs
    "
  >
    Your Name
  </label>
</div>`,
    },
    nav: {
      name: "导航栏",
      description: "固定顶部导航，毛玻璃背景，hover-underline 链接",
      code: `<header className="fixed top-0 left-0 right-0 z-50 bg-[#F9F8F6]/90 backdrop-blur-sm">
  <div className="max-w-7xl mx-auto px-6 md:px-12">
    <div className="flex items-center justify-between h-16 md:h-20 border-b border-[#1C1C1C]/10">
      <a href="/" className="font-serif text-lg tracking-[0.3em] uppercase">
        Editorial
      </a>
      <nav className="flex items-center gap-6 md:gap-8">
        <a href="#" className="font-sans text-xs tracking-[0.2em] uppercase text-[#1C1C1C]/60 hover-underline pb-1">
          Work
        </a>
        <a href="#" className="font-sans text-xs tracking-[0.2em] uppercase text-[#1C1C1C]/60 hover-underline pb-1">
          About
        </a>
      </nav>
    </div>
  </div>
</header>`,
    },
    hero: {
      name: "Hero 区块",
      description: "超大衬线标题 + 副标题斜体 + clip-path 图片揭示",
      code: `<section className="pt-32 md:pt-48 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
  <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-40 gap-12">
    <h1 className="font-serif text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] tracking-tighter">
      Digital <br />
      <span className="italic text-[#1C1C1C]/60">Craftsmanship.</span>
    </h1>
    <p className="max-w-xs font-sans text-xs leading-relaxed uppercase tracking-[0.2em] text-[#1C1C1C]/60">
      Elevating brands through refined typography, minimalist layouts, and purposeful interactions.
    </p>
  </div>
  <div className="w-full aspect-[21/9] bg-gray-200 overflow-hidden">
    <img src="hero.jpg" alt="Hero" className="w-full h-full object-cover" />
  </div>
</section>`,
    },
  },

  globalCss: `/* Editorial 全局样式 */
:root {
  --ed-bg: #F9F8F6;
  --ed-fg: #1C1C1C;
}

body {
  font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
  background: var(--ed-bg);
  color: var(--ed-fg);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  font-weight: 400;
  letter-spacing: -0.02em;
}

::selection {
  background: var(--ed-fg);
  color: var(--ed-bg);
}

/* Hover underline animation */
.hover-underline {
  position: relative;
}
.hover-underline::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: currentColor;
  transform-origin: bottom right;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.hover-underline:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

/* Clip-path image reveal */
.clip-reveal {
  clip-path: inset(100% 0 0 0);
  transition: clip-path 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.clip-reveal.revealed {
  clip-path: inset(0% 0 0 0);
}`,

  aiRules: `You are an Editorial design style frontend development expert. All generated code must strictly follow these constraints:

## Core Palette

- Background: #F9F8F6 (warm cream, NOT pure white or #fafafa)
- Foreground: #1C1C1C (soft black, NOT #000 or #0a0a0a)
- Opacity hierarchy: text-[#1C1C1C]/60 (secondary), /40 (tertiary), /10 (borders/dividers)
- NO colored accents. This style is purely monochromatic.

## Typography

- Headings: font-serif, tracking-tighter, weight 400 (never bold)
- Hero titles: text-6xl md:text-8xl lg:text-[9rem] leading-[0.9]
- Labels: font-sans text-xs tracking-[0.2em] uppercase text-[#1C1C1C]/40
- Body: font-sans text-sm or text-base leading-relaxed text-[#1C1C1C]/80
- Italic for decorative subtitles: italic text-[#1C1C1C]/60

## Layout

- Section spacing: py-24 md:py-40 minimum
- Container: max-w-7xl mx-auto px-6 md:px-12
- Generous gaps: gap-12 lg:gap-24
- Content width: max-w-xs or max-w-md for body text
- Use 12-column grids: grid-cols-12 with col-span-5/col-span-7 splits

## Interactions

- Links: hover-underline animation (scaleX from right-to-left on hover)
- Titles: group-hover:italic transition-all duration-500
- Images: group-hover:scale-105 transition-transform duration-1000
- Arrows: group-hover:translate-x-2 transition-transform
- Borders: border-[#1C1C1C]/10, hover:bg-[#1C1C1C]/[0.02]

## Form Fields

- Bottom-border only: border-b border-[#1C1C1C]/20
- Floating labels with peer-focus pattern
- Input text: font-serif text-xl
- Focus: focus:border-[#1C1C1C] (no outline, no shadow, no ring)

## Navigation

- Fixed: fixed top-0 z-50 bg-[#F9F8F6]/90 backdrop-blur-sm
- Logo: font-serif text-lg tracking-[0.3em] uppercase
- Links: font-sans text-xs tracking-[0.2em] uppercase text-[#1C1C1C]/60

## Absolutely Forbidden

- Colored accents (red, blue, green) - this is a monochrome style
- Box shadows (shadow-*)
- Thick borders (border-2 and above)
- Large border-radius (rounded-xl and above)
- Gradients or background patterns
- Bold font weights on headings (font-bold, font-semibold)
- Pure black #000 or #0a0a0a
- Pure white #fff or #fafafa as background
- Decorative geometric shapes or icons

## Animation & Interaction Rules

- Cinematic Image Zoom: 配图区域应使用容器裁切 + 子元素慢速放大（如 \`group-hover:scale-105 duration-1000\`），保持时装大片式凝视感。
- Brutal Contrast: 交互对比应果断，但仅在既有调色盘中反转（\`#1C1C1C\` 与 \`#F9F8F6\`），禁止回退到纯黑纯白。
- Text Restraint: 文字本体不位移；hover 提示优先使用细线延展、字色加深等排版型反馈。
- Layout Lines: 分隔线 hover 时可从 \`/10\` 加深至 \`/40\`，用于强调网格骨架，不添加阴影和炫技动画。`,

  examplePrompts: [
    {
      title: "创意作品集",
      titleEn: "Creative Portfolio",
      description: "编辑杂志风格的创意设计师作品集",
      descriptionEn: "Editorial-style creative designer portfolio with monochrome palette",
      prompt: `Use Editorial style to create a creative portfolio page:
1. Fixed nav: font-serif logo with tracking-[0.3em], hover-underline links
2. Hero: massive serif title (9rem+) with italic subtitle in #1C1C1C/60, clip-path image reveal
3. Featured works: numbered list (01, 02, 03) with hover image float and group-hover:italic
4. Infinite marquee ticker: services list with dot separators
5. Archive grid: masonry 2-col layout with staggered scroll reveals
6. About section: sticky portrait left, serif quote right, services/clients lists
7. Contact: floating-label inputs with bottom borders, hover-underline submit button
8. Palette: bg-[#F9F8F6], text-[#1C1C1C] with /60 /40 /10 opacity hierarchy only`,
    },
    {
      title: "杂志风格博客",
      titleEn: "Magazine Style Blog",
      description: "经典杂志排版的博客首页",
      descriptionEn: "Classic magazine layout blog homepage",
      prompt: `Use Editorial style to create a magazine blog homepage:
1. Navigation: fixed top, bg-[#F9F8F6]/90 backdrop-blur, hover-underline links
2. Featured article: full-width grayscale image with clip-path reveal, serif title text-7xl
3. Article list: numbered editorial list with border-b border-[#1C1C1C]/10 dividers
4. Typography: font-serif headings tracking-tighter, font-sans text-xs labels with tracking-[0.2em] uppercase
5. Footer: minimal, text-xs uppercase with dot separators
6. Colors: monochrome only, #F9F8F6 background, #1C1C1C text with opacity variants`,
    },
    {
      title: "工作室介绍",
      titleEn: "Studio About Page",
      description: "设计工作室的介绍页面",
      descriptionEn: "Design studio about page with editorial typography",
      prompt: `Use Editorial style to design a studio about page:
1. Layout: 12-col grid, col-span-5 sticky portrait + col-span-7 content
2. Hero quote: font-serif text-6xl with line breaks and italic decorative words
3. Body text: font-sans text-sm leading-relaxed text-[#1C1C1C]/80, max-w-xl
4. Services & clients: two-column grid with uppercase tracking labels, serif list items
5. Contact section: Say Hello heading text-8xl, floating-label form inputs
6. Interactions: IntersectionObserver scroll reveals, group-hover:italic on links
7. Palette: bg-[#F9F8F6], pure monochrome, NO accent colors`,
    },
  ],
};
