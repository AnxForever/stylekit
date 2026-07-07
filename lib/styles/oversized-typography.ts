import type { DesignStyle } from "./types";

export const oversizedTypography: DesignStyle = {
  slug: "oversized-typography",
  name: "超大字体排版",
  nameEn: "Oversized Typography",
  description:
    "2026 年作品集网站头号趋势——文字即布局。姓名与标题以视口级 fluid clamp() 巨字充当 hero 和视觉主体，图像退居次要，黑白底色配唯一国际橙强调。",
  descriptionEn:
    "The defining portfolio trend of 2026: type IS the layout. Names and headlines become viewport-scale heroes via fluid clamp() sizing, imagery recedes to accents, and a single international orange cuts through near-black on warm white.",
  cover: "/styles/oversized-typography.svg",
  styleType: "visual",
  tags: ["high-contrast"],
  category: "expressive",
  colors: {
    primary: "#0A0A0A",
    secondary: "#FAFAF8",
    accent: ["#FF4D00", "#71717A", "#E4E4E7", "#18181B"],
  },
  keywords: ["超大字体", "巨字排版", "作品集", "fluid typography", "clamp", "marquee", "outline text", "字体海报", "typographic", "oversized"],
  keywordsEn: ["oversized type", "huge typography", "portfolio", "fluid clamp", "kinetic marquee", "outline text", "type-as-layout", "editorial black", "brutal type", "2026 trend"],

  philosophy: `超大字体排版把文字从"信息载体"升格为"版面本身"。当一个名字被放大到占据整个视口，它不再需要配图、装饰或卡片来证明自己——字重、字距和留白就是全部的视觉语言。

核心理念：
- 文字即布局：hero 不是"标题 + 配图"，而是一个 text-[clamp(3rem,12vw,10rem)] 的巨字本身。图像最多作为小尺寸点缀出现在角落
- 流体而非断点：字号用 clamp(min, vw, max) 随视口连续缩放，任何屏幕上巨字都顶满宽度，而不是在断点间跳变
- 压缩产生张力：font-black 配 tracking-tighter 和 leading-[0.85]，让笔画几乎相触，行与行咬合成一个黑色块面
- 双声部对比：视口级巨字负责情绪，font-mono uppercase tracking-widest 的小号标注负责信息——两个极端之间不允许存在中间字号
- 一种颜色的克制：近黑 #0A0A0A 与暖白 #FAFAF8 承担 95% 的画面，国际橙 #FF4D00 只在关键动作和悬停时刻出现，因稀缺而锋利

设计原则：
- 巨大留白是巨字的呼吸空间，section 之间用 py-24 以上的间距和 hairline 细线分隔
- 左对齐为主，让巨字左缘形成强悍的垂直轴线；居中只留给 marquee 滚动字条
- outline 文字（-webkit-text-stroke）作为 hover 反转或次要行处理，制造实心与空心的节奏
- 巨大章节序号（01 / 02 / 03）既是导航又是装饰，用序号的秩序感对冲字号的野性`,

  philosophyEn: `Oversized Typography promotes text from information carrier to the layout itself. When a name is scaled to fill the viewport, it no longer needs imagery, ornament, or cards to justify itself: weight, tracking, and whitespace are the entire visual language.

Core principles:
- Type is the layout: the hero is not headline-plus-image, it is one text-[clamp(3rem,12vw,10rem)] word. Images appear only as small accents in the margins
- Fluid, not breakpoints: sizes use clamp(min, vw, max) so giant words continuously fill the viewport width instead of jumping between breakpoints
- Compression creates tension: font-black with tracking-tighter and leading-[0.85] lets strokes nearly touch, locking lines into one black mass
- Two-voice contrast: viewport-scale display type carries emotion while font-mono uppercase tracking-widest micro-labels carry data. Nothing is allowed to live between these two extremes
- Discipline of one color: near-black #0A0A0A and warm white #FAFAF8 own 95% of the canvas; international orange #FF4D00 appears only on key actions and hover moments, sharp because it is scarce`,

  doList: [
    "标题使用 fluid 字号 text-[clamp(3rem,12vw,10rem)]，随视口连续缩放顶满宽度",
    "巨字统一 font-black uppercase tracking-tighter leading-[0.85]，行间几乎咬合",
    "导航、标注、元信息使用 font-mono text-xs uppercase tracking-widest 小号等宽字",
    "章节配巨大序号（01 / 02 / 03），用 text-[clamp(2rem,6vw,5rem)] font-black 展示",
    "配色只用近黑 #0A0A0A + 暖白 #FAFAF8 + 唯一强调色国际橙 #FF4D00",
    "hover 用下划线（underline underline-offset-8 decoration-2）或文字变橙，而非阴影",
    "outline 空心字用 -webkit-text-stroke 做 hover 反转或次要行",
    "区块之间用 border-t border-[#0A0A0A]/15 hairline 细线和 py-24 级留白分隔",
    "加入 marquee 无限滚动字条作为动态排版元素",
  ],

  doListEn: [
    "Size headlines with fluid text-[clamp(3rem,12vw,10rem)] so they continuously fill the viewport",
    "Set giant type as font-black uppercase tracking-tighter leading-[0.85] so lines nearly interlock",
    "Use font-mono text-xs uppercase tracking-widest for nav, labels, and meta information",
    "Pair sections with giant index numbers (01 / 02 / 03) at text-[clamp(2rem,6vw,5rem)] font-black",
    "Restrict color to near-black #0A0A0A, warm white #FAFAF8, and a single accent #FF4D00",
    "Hover via underline underline-offset-8 decoration-2 or a flip to orange, never via shadows",
    "Use -webkit-text-stroke outline text for hover inversions or secondary lines",
    "Separate sections with border-t border-[#0A0A0A]/15 hairlines and py-24+ whitespace",
    "Include an infinite marquee text strip as a kinetic typographic element",
  ],

  dontList: [
    "禁止任何渐变背景或渐变文字（bg-gradient-*），只允许实色",
    "禁止圆角卡片堆砌，最大只允许 rounded-none 或 rounded-sm",
    "禁止任何投影（shadow-*），层次只靠字号、字重和留白建立",
    "禁止引入第二种强调色，橙色 #FF4D00 之外不得出现彩色",
    "禁止用装饰性图标代替文字表达，箭头等符号只作为文字的从属",
    "禁止居中的小字号标题——标题要么巨大要么左对齐，不存在温和的中间态",
  ],

  dontListEn: [
    "Never use gradient backgrounds or gradient text (bg-gradient-*); solid colors only",
    "Never stack rounded cards; rounded-none or rounded-sm at most",
    "Never apply shadows (shadow-*); hierarchy comes from size, weight, and whitespace alone",
    "Never introduce a second accent color; no chroma exists beyond #FF4D00",
    "Never replace verbal expression with decorative icons; arrows serve type, not the reverse",
    "Never center small headings — titles are either huge or left-aligned, no timid middle ground",
  ],

  components: {
    button: {
      name: "巨字按钮",
      description: "大写等宽标签按钮，方角无阴影，hover 反转为橙",
      code: `<button className="px-8 py-4 bg-[#0A0A0A] text-[#FAFAF8] font-mono text-xs uppercase tracking-widest rounded-none border border-[#0A0A0A] hover:bg-[#FF4D00] hover:border-[#FF4D00] transition-colors duration-200">Start a Project</button>`,
    },
    card: {
      name: "索引卡片",
      description: "作品索引条目：巨大序号 + 超大标题 + mono 元信息，hairline 分隔",
      code: `<div className="group border-t border-[#0A0A0A]/15 py-8 cursor-pointer">
  <div className="flex items-baseline gap-6">
    <span className="font-mono text-sm text-[#71717A]">01</span>
    <div className="flex-1">
      <h3 className="text-[clamp(2rem,5vw,4rem)] font-black uppercase tracking-tighter leading-[0.9] text-[#0A0A0A] group-hover:text-[#FF4D00] transition-colors duration-200">Brand Identity</h3>
      <p className="font-mono text-xs uppercase tracking-widest text-[#71717A] mt-3">Art Direction — 2026</p>
    </div>
    <span className="text-2xl text-[#0A0A0A] group-hover:translate-x-2 group-hover:text-[#FF4D00] transition-all duration-200">&rarr;</span>
  </div>
</div>`,
    },
    input: {
      name: "下划线输入框",
      description: "只有底部 hairline 的裸输入框，聚焦时线条变橙",
      code: `<input type="text" placeholder="YOUR EMAIL" className="w-full px-0 py-4 bg-transparent border-0 border-b border-[#0A0A0A]/30 rounded-none font-mono text-sm uppercase tracking-widest text-[#0A0A0A] placeholder:text-[#71717A] focus:outline-none focus:border-b-2 focus:border-[#FF4D00] transition-colors" />`,
    },
    nav: {
      name: "mono 导航",
      description: "小号等宽大写导航，hairline 底线",
      code: `<nav className="flex items-center justify-between px-6 py-5 bg-[#FAFAF8] border-b border-[#0A0A0A]/15">
  <span className="font-black text-xl tracking-tighter uppercase text-[#0A0A0A]">AC&reg;</span>
  <div className="flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-[#0A0A0A]">
    <span className="hover:text-[#FF4D00] cursor-pointer transition-colors">Work</span>
    <span className="hover:text-[#FF4D00] cursor-pointer transition-colors">About</span>
    <span className="hover:text-[#FF4D00] cursor-pointer transition-colors">Contact</span>
  </div>
</nav>`,
    },
    hero: {
      name: "巨字 Hero",
      description: "视口级姓名巨字，第二行 outline 空心，角落 mono 标注",
      code: `<section className="bg-[#FAFAF8] px-6 pt-20 pb-16">
  <p className="font-mono text-xs uppercase tracking-widest text-[#FF4D00] mb-8">Independent Designer — Portfolio 2026</p>
  <h1 className="font-black uppercase tracking-tighter leading-[0.85] text-[#0A0A0A]">
    <span className="block text-[clamp(4rem,15vw,12rem)]">Ava</span>
    <span className="block text-[clamp(4rem,15vw,12rem)]" style={{ WebkitTextStroke: "2px #0A0A0A", color: "transparent" }}>Carter</span>
  </h1>
  <div className="flex justify-between items-end mt-12 border-t border-[#0A0A0A]/15 pt-4">
    <p className="font-mono text-xs uppercase tracking-widest text-[#71717A]">Based in Rotterdam</p>
    <p className="font-mono text-xs uppercase tracking-widest text-[#71717A]">Scroll &darr;</p>
  </div>
</section>`,
    },
    footer: {
      name: "巨字页脚",
      description: "以巨大 CTA 文字收尾，mono 元信息栏",
      code: `<footer className="bg-[#0A0A0A] text-[#FAFAF8] px-6 py-16">
  <p className="font-mono text-xs uppercase tracking-widest text-[#FF4D00] mb-6">Have an idea?</p>
  <a href="#" className="block text-[clamp(3rem,10vw,8rem)] font-black uppercase tracking-tighter leading-[0.85] hover:text-[#FF4D00] transition-colors duration-200">Let&apos;s Talk &rarr;</a>
  <div className="flex flex-wrap justify-between gap-4 mt-16 pt-6 border-t border-[#FAFAF8]/20 font-mono text-xs uppercase tracking-widest text-[#71717A]">
    <span>&copy; 2026 Ava Carter</span>
    <span>Rotterdam, NL</span>
    <span>Instagram / Behance</span>
  </div>
</footer>`,
    },
  },

  globalCss: `.oversized-typography-display {
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.04em;
  line-height: 0.85;
}
.oversized-typography-hero {
  font-size: clamp(3rem, 12vw, 10rem);
}
.oversized-typography-outline {
  -webkit-text-stroke: 2px #0A0A0A;
  color: transparent;
}
.oversized-typography-outline--inverse {
  -webkit-text-stroke: 2px #FAFAF8;
  color: transparent;
}
.oversized-typography-outline-hover {
  -webkit-text-stroke: 2px #0A0A0A;
  color: transparent;
  transition: color 0.2s ease;
}
.oversized-typography-outline-hover:hover {
  color: #FF4D00;
  -webkit-text-stroke: 2px #FF4D00;
}
.oversized-typography-label {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
}
.oversized-typography-hairline {
  border-top: 1px solid rgba(10, 10, 10, 0.15);
}
@keyframes oversized-typography-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.oversized-typography-marquee {
  display: flex;
  width: max-content;
  animation: oversized-typography-marquee 24s linear infinite;
}
.oversized-typography-marquee:hover {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  .oversized-typography-marquee {
    animation: none;
  }
}`,

  aiRules: `你是超大字体排版（Oversized Typography）设计专家，为 2026 年风格的作品集网站生成代码。

## 绝对规则
- hero 必须是一个视口级巨字（姓名或标语），使用 text-[clamp(3rem,12vw,10rem)] 级 fluid 字号，不允许"中等标题 + 大图"的传统 hero
- 所有 display 级文字统一 font-black uppercase tracking-tighter leading-[0.85]
- 字号只有两个声部：视口级巨字，和 font-mono text-xs uppercase tracking-widest 的小标注；正文 text-sm/text-base 仅少量出现
- 配色严格限定：#0A0A0A 近黑文字、#FAFAF8 暖白底、#FF4D00 唯一强调色、#71717A 与 #E4E4E7 辅助灰
- 章节使用巨大序号 01 / 02 / 03 编号
- hover 状态使用下划线（underline underline-offset-8）、变橙或 outline/实心反转（-webkit-text-stroke）
- 图像只能以小尺寸点缀出现（不超过视口宽度三分之一），永远不与巨字争夺主体地位

## 禁止
- 禁止渐变（bg-gradient-*、渐变文字）
- 禁止阴影（一切 shadow-*）
- 禁止圆角超过 rounded-sm
- 禁止第二种彩色强调色
- 禁止居中的小字号标题
- 禁止用图标库装饰代替文字表达

## 响应式
- 巨字依赖 clamp() 自动缩放，不需要为字号写断点
- 移动端保持 leading-[0.85] 与 uppercase，巨字可自然换行形成文字块
- marquee、序号、hairline 在所有断点保持一致
- 触控目标不小于 44px，mono 小标签可加 py-3 扩大点击区

## 自检清单
生成后确认：
1. 打开页面第一眼看到的是文字而不是图像
2. 页面出现的彩色只有 #FF4D00 一种
3. 不存在任何 shadow-* 与 bg-gradient-* 类
4. 所有大标题均为 uppercase + font-black + 负 tracking
5. 导航与元信息均为 font-mono uppercase tracking-widest 小字`,

  aiRulesEn: `You are an Oversized Typography design expert generating 2026-style portfolio code.

## Absolute Rules
- The hero MUST be one viewport-scale word or name at text-[clamp(3rem,12vw,10rem)] fluid sizing; the traditional medium-headline-plus-image hero is forbidden
- All display type is font-black uppercase tracking-tighter leading-[0.85]
- Only two typographic voices exist: viewport-scale display, and font-mono text-xs uppercase tracking-widest micro-labels; body text at text-sm/base appears sparingly
- Palette is strictly #0A0A0A near-black text, #FAFAF8 warm white background, #FF4D00 as the single accent, #71717A / #E4E4E7 support grays
- Number sections with giant indices 01 / 02 / 03
- Hover states use underline underline-offset-8, a flip to orange, or solid/outline inversion via -webkit-text-stroke
- Images may only appear as small accents (max one third of viewport width) and never compete with the type

## Forbidden
- Gradients of any kind (bg-gradient-*, gradient text)
- Shadows of any kind (all shadow-*)
- Border radius beyond rounded-sm
- Any second accent color
- Centered small-size headings
- Decorative icon sets replacing verbal expression

## Responsive
- Giant type scales via clamp(); no font-size breakpoints needed
- Keep leading-[0.85] and uppercase on mobile; let giant words wrap into a type block
- Marquee, indices, and hairlines stay identical across breakpoints
- Touch targets at least 44px; pad mono labels with py-3 for tap area

## Self-Check
After generating, verify:
1. The first thing seen is type, not imagery
2. The only chroma on the page is #FF4D00
3. Zero shadow-* and bg-gradient-* classes exist
4. Every display heading is uppercase + font-black + negative tracking
5. Nav and meta rows are font-mono uppercase tracking-widest`,

  examplePrompts: [
    {
      title: "设计师作品集首页",
      titleEn: "Designer Portfolio Home",
      description: "姓名巨字 hero + 作品索引列表 + marquee 字条的单页作品集",
      descriptionEn: "One-page portfolio with a giant-name hero, numbered works index, and marquee strip",
      prompt: "Build a 2026 oversized-typography portfolio homepage: the designer's name fills the viewport at text-[clamp(4rem,15vw,12rem)] font-black uppercase tracking-tighter leading-[0.85] (second line as -webkit-text-stroke outline), a font-mono uppercase tracking-widest micro-nav, an infinite marquee strip reading AVAILABLE FOR WORK, a numbered works index (01-04) with hairline dividers where titles flip to #FF4D00 on hover, and a giant LET'S TALK footer CTA. Colors: #0A0A0A on #FAFAF8 with #FF4D00 as the only accent. No gradients, no shadows, no rounded corners.",
    },
    {
      title: "创意工作室着陆页",
      titleEn: "Creative Studio Landing",
      description: "以宣言式巨字与服务序号列表构成的工作室着陆页",
      descriptionEn: "Studio landing page built from a manifesto headline and numbered service list",
      prompt: "Create a creative studio landing page in oversized-typography style: a manifesto hero WE MAKE BRANDS LOUD wrapping across three viewport-scale lines with the word LOUD in #FF4D00, giant section numbers 01/02/03 for services with mono uppercase meta labels, a black inverted section with -webkit-text-stroke outline headline in #FAFAF8, hairline-only dividers, small images used only as marginal accents, and an underline-on-hover contact link. Strictly #0A0A0A / #FAFAF8 / #FF4D00, zero shadows and zero gradients.",
    },
    {
      title: "字体主题活动页",
      titleEn: "Type-Driven Event Page",
      description: "设计大会活动页：日期与城市名做成海报级巨字",
      descriptionEn: "Conference page where dates and the city name become poster-scale type",
      prompt: "Design a design-conference event page in oversized-typography style: TYPO26 as a text-[clamp(4rem,16vw,13rem)] hero, the date 14-16 MAY set as a second giant outline line, a marquee strip listing speaker names in font-mono uppercase, a schedule table with hairline row dividers and mono time labels, and a rounded-none black register button that turns #FF4D00 on hover. Left-aligned everything, massive py-24 whitespace, near-black #0A0A0A on warm white #FAFAF8, no imagery except one small venue photo thumbnail.",
    },
  ],
};
