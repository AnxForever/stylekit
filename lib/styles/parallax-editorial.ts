import type { DesignStyle } from "./types";

export const parallaxEditorial: DesignStyle = {
  slug: "parallax-editorial",
  name: "视差杂志",
  nameEn: "Parallax Editorial",
  description:
    "有物理纵深的杂志排版。暖纸底色上，前景文字与背景层以不同速率滚动，制造真实的层叠景深；sticky 图文交错、章节编号、首字下沉，把长内容读成一场有节奏的翻页。",
  descriptionEn:
    "Editorial layout with physical depth. On warm paper, foreground text and background layers scroll at different rates to build real parallax; sticky image-text interlock, chapter numbers and drop caps turn long-form into a paced turn of the page.",
  cover: "/styles/parallax-editorial.svg",
  styleType: "layout",
  tags: [],
  category: "expressive",
  colors: {
    primary: "#1A1712",
    secondary: "#F5F0E6",
    accent: ["#B3401F", "#2E2A22", "#C9BBA0"],
  },
  keywords: ["parallax", "editorial", "magazine", "scroll", "depth", "drop cap", "sticky", "视差", "杂志", "编辑排版", "景深", "滚动"],
  keywordsEn: ["parallax editorial", "magazine layout website", "parallax scrolling", "editorial design", "scroll depth effect", "drop cap typography", "sticky sections", "long-form article design", "print-inspired web design", "layered scrolling"],

  philosophy: `视差杂志的信条：滚动是翻页，深度是版面的第四维。当前景与背景以不同速率移动，平面的网页第一次有了纸张的厚度——读者不是划过屏幕，而是穿过一叠正在错位滑动的版面。

核心理念：
- 深度即层次：背景层慢、前景层快，速差本身就是视觉层级。近的先走、远的滞后，眼睛自然读出主次
- 排版先于视差：视差是舞台不是主角。字体、栏宽、行高必须先立得住——衬线大标题、舒适的正文测度（65-75 字符/行）、清晰的章节结构
- sticky 交错：图像 sticky 钉住，文字在其上继续滚动；或反之。图文咬合像杂志的对开跨页
- 编辑信号：章节编号、首字下沉（drop cap）、悬挂标点、栏间竖线——这些是杂志的语法，不是装饰
- 克制的强调：砖红 #B3401F 只用于首字下沉、章节号、关键引文和链接，正文永远是近黑墨
- 节奏留白：大段留白是呼吸口。视差段落之间必须有安静的纯文字段落，否则晕

设计原则：
- 性能红线：视差只用 transform: translate3d（合成器层），rAF 节流，绝不在 scroll 事件里改 top/margin
- 无障碍红线：prefers-reduced-motion 下所有视差层归零速差、变成普通静态版面，阅读顺序不变
- 景深纪律：一屏最多 3 个视差速率层级，超过就浑浊
- 响应式：移动端大幅削弱或关闭视差（性能 + 眩晕），保留排版与 sticky 结构`,

  philosophyEn: `The parallax-editorial creed: scrolling is turning pages, and depth is the fourth dimension of the layout. When foreground and background move at different rates, a flat page finally gains the thickness of paper — the reader doesn't swipe across a screen, they move through a stack of spreads sliding out of register.

Core principles:
- Depth is hierarchy: background slow, foreground fast. The rate difference itself reads as importance — near things lead, far things lag
- Typography before parallax: parallax is the stage, not the star. The type must stand on its own first — serif display headings, a comfortable measure (65-75 characters), clear chapter structure
- Sticky interlock: an image pins while text scrolls over it, or the reverse — image and text meshing like a magazine spread
- Editorial signals: chapter numbers, drop caps, hanging punctuation, column rules — these are magazine grammar, not decoration
- Restrained accent: brick red #B3401F only for drop caps, chapter numbers, pull quotes and links; body copy stays near-black ink
- Rhythm and rest: generous whitespace is the breath. Parallax passages must alternate with quiet text-only passages or the eye tires

Design principles:
- Performance line: parallax uses transform: translate3d (compositor layer) only, rAF-throttled, never mutating top/margin in a scroll handler
- Accessibility line: under prefers-reduced-motion all layers drop to zero rate difference and become a normal static layout; reading order never changes
- Depth discipline: at most three parallax rate tiers per viewport, more turns muddy
- Responsive: on mobile, weaken or disable parallax (performance + motion sickness) while keeping the typography and sticky structure`,

  doList: [
    "暖纸底色 #F5F0E6，正文近黑墨 #1A1712，营造印刷纸感",
    "衬线展示字体做大标题（如 Fraunces / Playfair），无衬线或同族做正文",
    "视差层用 transform: translate3d(0, scrollProgress * rate, 0)，背景 rate 小、前景 rate 大",
    "sticky 图文交错：position: sticky 钉住图像层，文字在侧栏继续滚动",
    "章节以大号衬线编号 + 顶部细横线分隔，建立杂志式结构",
    "首字下沉 drop cap：段落首字母 float、放大 3-4 行高、砖红 #B3401F",
    "正文测度控制在 65-75 字符/行，行高 1.6-1.75",
    "砖红 #B3401F 只用于首字、章节号、引文、链接；其余保持墨黑",
    "所有视差用 rAF 节流，写 prefers-reduced-motion 归零降级",
  ],

  doListEn: [
    "Warm paper base #F5F0E6 with near-black ink body #1A1712 for a printed feel",
    "Serif display face for headlines (e.g. Fraunces / Playfair), sans or same-family for body",
    "Parallax layers via transform: translate3d(0, scrollProgress * rate, 0) — small rate for background, larger for foreground",
    "Sticky image-text interlock: position: sticky pins the image layer while text scrolls in the adjacent column",
    "Number chapters with large serif figures and a thin top rule to build magazine structure",
    "Drop caps: float the paragraph's first letter, scale it 3-4 lines tall, brick red #B3401F",
    "Keep the measure at 65-75 characters per line, line-height 1.6-1.75",
    "Brick red #B3401F only on drop caps, chapter numbers, pull quotes and links; keep the rest ink",
    "rAF-throttle all parallax and ship a prefers-reduced-motion zero-rate fallback",
  ],

  dontList: [
    "禁止在 scroll 事件里直接改 top / margin / height（触发重排卡顿）——视差只用 transform",
    "禁止一屏超过 3 个视差速率层级（景深浑浊）",
    "禁止让视差压过可读性：正文永远不做视差主体，测度不超 75 字符",
    "禁止移动端保留强视差（性能差 + 眩晕），应削弱或关闭",
    "禁止多个强调色，禁止把砖红铺成大面积底色",
    "禁止省略 prefers-reduced-motion 降级",
    "禁止用冷色/纯白背景（失去暖纸质感）",
  ],

  dontListEn: [
    "Never mutate top/margin/height in a scroll handler (layout thrash) — parallax is transform-only",
    "Never exceed three parallax rate tiers per viewport (muddy depth)",
    "Never let parallax overpower reading: body copy is never the parallax subject, measure stays under 75 chars",
    "Never keep heavy parallax on mobile (perf + motion sickness) — weaken or disable it",
    "Never use multiple accents or flood brick red as a surface color",
    "Never omit the prefers-reduced-motion fallback",
    "Never use cold or pure-white backgrounds (kills the warm paper feel)",
  ],

  components: {
    button: {
      name: "Button",
      description: "Editorial link-button with brick underline sweep",
      code: `<button className="group relative inline-flex items-center gap-2
  font-serif text-[#1A1712] text-lg
  transition-colors duration-300
  hover:text-[#B3401F]
">
  <span>Read the chapter</span>
  <span className="inline-block w-8 h-px bg-[#B3401F] origin-left scale-x-100 group-hover:scale-x-150 transition-transform duration-300" />
</button>`,
    },
    card: {
      name: "Card",
      description: "Chapter card with serif number and top rule",
      code: `<article className="border-t border-[#1A1712]/20 pt-5">
  <span className="font-serif text-4xl text-[#B3401F] leading-none">03</span>
  <h3 className="font-serif text-2xl text-[#1A1712] mt-3 mb-2">The Register Shift</h3>
  <p className="text-[#1A1712]/70 leading-relaxed max-w-prose">
    When foreground and background slide out of register, the page gains the thickness of paper.
  </p>
</article>`,
    },
    input: {
      name: "Input",
      description: "Underline field on paper with brick focus rule",
      code: `<label className="block">
  <span className="block font-serif text-sm text-[#1A1712]/60 mb-1.5 italic">Your email</span>
  <input type="email" placeholder="reader@paper.press"
    className="w-full bg-transparent py-2.5 text-lg text-[#1A1712] placeholder-[#1A1712]/30
      border-b border-[#1A1712]/25
      focus:outline-none focus:border-[#B3401F]
      transition-colors duration-300" />
</label>`,
    },
    nav: {
      name: "Navigation",
      description: "Masthead nav with serif wordmark and rule",
      code: `<nav className="border-b border-[#1A1712]/15 bg-[#F5F0E6]/90 backdrop-blur-sm">
  <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
    <span className="font-serif text-xl text-[#1A1712] tracking-tight">The Paper Press</span>
    <div className="flex items-center gap-6 font-serif text-sm">
      <a href="#features" className="text-[#1A1712]/70 hover:text-[#B3401F] transition-colors duration-300">Features</a>
      <a href="#archive" className="text-[#1A1712]/70 hover:text-[#B3401F] transition-colors duration-300">Archive</a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero",
      description: "Layered parallax masthead over paper",
      code: `<section className="relative min-h-screen overflow-hidden bg-[#F5F0E6] flex items-center">
  {/* Background layer (slow) */}
  <div data-parallax="0.15" className="absolute inset-0 will-change-transform">
    <span className="absolute top-24 left-8 font-serif text-[22vw] leading-none text-[#1A1712]/[0.04] select-none">1892</span>
  </div>
  {/* Midground rule (medium) */}
  <div data-parallax="0.4" className="absolute right-10 top-1/3 w-px h-64 bg-[#B3401F]/40 will-change-transform" />
  {/* Foreground text (fast, or static) */}
  <div className="relative max-w-3xl mx-auto px-6 text-center">
    <p className="font-serif italic text-[#B3401F] mb-4">Issue 001</p>
    <h1 className="font-serif text-6xl md:text-8xl text-[#1A1712] leading-[0.95]">Depth on Paper</h1>
    <p className="mt-6 text-[#1A1712]/70 text-lg max-w-xl mx-auto">Scroll, and the layers slide out of register.</p>
  </div>
</section>`,
    },
  },

  globalCss: `/* Parallax Editorial Global Styles */

:root {
  --pe-ink: #1A1712;
  --pe-ink-soft: rgba(26, 23, 18, 0.7);
  --pe-paper: #F5F0E6;
  --pe-paper-deep: #EBE3D3;
  --pe-brick: #B3401F;
  --pe-sand: #C9BBA0;
  --pe-measure: 68ch;
}

body {
  background: var(--pe-paper);
  color: var(--pe-ink);
}

/* Parallax layers: JS sets --pe-y from scroll progress * rate; transform-only */
[data-parallax] {
  transform: translate3d(0, var(--pe-y, 0), 0);
  will-change: transform;
}

/* Drop cap */
.pe-dropcap::first-letter {
  float: left;
  font-family: var(--font-serif), Georgia, serif;
  font-size: 3.6em;
  line-height: 0.82;
  padding: 0.05em 0.12em 0 0;
  color: var(--pe-brick);
  font-weight: 600;
}

/* Comfortable measure for body copy */
.pe-measure {
  max-width: var(--pe-measure);
}

/* Column rule between text blocks */
.pe-rule {
  border-top: 1px solid rgba(26, 23, 18, 0.2);
}

@media (prefers-reduced-motion: reduce) {
  [data-parallax] {
    transform: none !important;
  }
}`,

  aiRules: `你是一个视差杂志（Parallax Editorial）风格的前端开发专家。生成的所有代码必须严格遵守以下约束：

## 绝对禁止

- 在 scroll 事件里直接改 top / margin / height（重排卡顿）——视差只用 transform: translate3d
- 一屏超过 3 个视差速率层级
- 让视差压过可读性：正文永远不是视差主体，测度不超 75 字符
- 移动端保留强视差（性能 + 眩晕）
- 多个强调色；把砖红铺成大面积底色
- 冷色 / 纯白背景（失去暖纸质感）
- 省略 prefers-reduced-motion 降级

## 必须遵守

### 纸面与油墨
- 背景 #F5F0E6（暖纸），深纸 #EBE3D3
- 正文 #1A1712（近黑墨），次要 rgba(26,23,18,0.7)
- 唯一强调 #B3401F（砖红）：首字下沉、章节号、引文、链接
- 沙色 #C9BBA0 作分隔 / 次要装饰

### 字体
衬线展示字体做标题（推荐 Fraunces 或 Playfair Display）：
<link rel="stylesheet" href="https://fonts.loli.net/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&display=swap" />
标题 font-family: "Fraunces", Georgia, serif；正文可同族或搭配一款人文无衬线

### 视差引擎（招牌，rAF 节流）
每个视差层加 data-parallax="速率"（0.1-0.5），JS 单一 rAF 循环统一更新：
let ticking = false;
function onScroll() {
  if (ticking) return; ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    document.querySelectorAll('[data-parallax]').forEach(el => {
      const rate = parseFloat(el.dataset.parallax);
      el.style.setProperty('--pe-y', \`\${-y * rate}px\`);   // 或按元素相对视口位置计算
    });
    ticking = false;
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
CSS: [data-parallax] { transform: translate3d(0, var(--pe-y,0), 0); will-change: transform; }
背景层 rate 小（0.1-0.2），前景层 rate 大（0.35-0.5）

### sticky 图文交错
外层 grid 两栏；图像列 position: sticky; top: 0; height: 100vh，文字列正常流动，形成钉住-滚动咬合

### 编辑排版语法
- 章节：大号衬线编号（text-4xl+）+ 顶部细横线 border-t
- 首字下沉：段落加 .pe-dropcap，::first-letter float 放大 3-4 行、砖红
- 测度：正文 max-width 65-75ch，行高 1.6-1.75
- 引文：大号斜体衬线 + 左侧砖红竖线

### GSAP 配方（可选，项目已有 gsap 时优先）
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray("[data-parallax]").forEach((el) => {
  gsap.to(el, {
    yPercent: () => -30 * parseFloat(el.dataset.parallax) * 5,
    ease: "none",
    scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
  });
});

### 无障碍
@media (prefers-reduced-motion: reduce) { [data-parallax] { transform: none !important; } }
所有层归零速差，变普通静态版面，阅读顺序不变

## 自检

1. 背景是暖纸、正文是墨黑、唯一砖红强调？
2. 视差只用 transform: translate3d + rAF 节流？
3. 一屏不超过 3 个速率层级？
4. 正文测度 65-75 字符、有衬线标题 / 章节号 / 首字下沉？
5. 有 sticky 图文交错？
6. 有 prefers-reduced-motion 归零降级？
7. 移动端削弱 / 关闭了视差？`,

  aiRulesEn: `# Parallax Editorial Design System

You are an expert frontend developer specializing in parallax editorial layout. Generate all code strictly following these specifications.

## Style Identity
- **Name**: Parallax Editorial
- **Essence**: Scrolling is turning pages; depth is the layout's fourth dimension
- **Mood**: Printed, considered, literary, cinematic long-form
- **Inspiration**: Magazine spreads, longform scrollytelling features, printed editorial typography

---

## Forbidden

| Pattern | Reason |
|---------|--------|
| Mutating top/margin/height in a scroll handler | Layout thrash; parallax is transform: translate3d only |
| More than 3 parallax rate tiers per viewport | Muddy depth |
| Parallax overpowering readability | Body copy is never the parallax subject; measure stays under 75ch |
| Heavy parallax on mobile | Performance and motion sickness — weaken or disable |
| Multiple accents / brick-red surfaces | One accent; brick is a signal, not a fill |
| Cold or pure-white backgrounds | Kills the warm paper feel |
| Missing prefers-reduced-motion fallback | Accessibility is non-negotiable |

## Required

### Paper and Ink
- Background #F5F0E6 (warm paper), deep paper #EBE3D3
- Body #1A1712 (near-black ink), secondary rgba(26,23,18,0.7)
- The one accent #B3401F (brick red): drop caps, chapter numbers, pull quotes, links
- Sand #C9BBA0 for dividers / secondary decoration

### Type
Serif display face for headings (Fraunces or Playfair Display recommended):
\`\`\`html
<link rel="stylesheet" href="https://fonts.loli.net/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&display=swap" />
\`\`\`
Headings font-family: "Fraunces", Georgia, serif; body same-family or a humanist sans.
(fonts.googleapis.com works too; loli.net mirrors it for CN access.)

### Parallax Engine (signature, rAF-throttled)
Tag each layer with data-parallax="rate" (0.1-0.5); one shared rAF loop updates them:
\`\`\`js
let ticking = false;
function onScroll() {
  if (ticking) return; ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    document.querySelectorAll("[data-parallax]").forEach((el) => {
      const rate = parseFloat(el.dataset.parallax);
      el.style.setProperty("--pe-y", \`\${-y * rate}px\`);
    });
    ticking = false;
  });
}
window.addEventListener("scroll", onScroll, { passive: true });
\`\`\`
\`\`\`css
[data-parallax] { transform: translate3d(0, var(--pe-y, 0), 0); will-change: transform; }
\`\`\`
Background layers small rate (0.1-0.2), foreground large (0.35-0.5).

### Sticky Interlock
Two-column grid; the image column is position: sticky; top: 0; height: 100vh while the text column flows normally — a pin-and-scroll mesh.

### Editorial Typography Grammar
- Chapters: large serif numerals (text-4xl+) with a thin top rule (border-t)
- Drop caps: .pe-dropcap with ::first-letter float, scaled 3-4 lines, brick red
- Measure: body max-width 65-75ch, line-height 1.6-1.75
- Pull quotes: large italic serif with a left brick rule

### GSAP Recipe (preferred when gsap is available)
\`\`\`js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
gsap.utils.toArray("[data-parallax]").forEach((el) => {
  gsap.to(el, {
    yPercent: () => -30 * parseFloat(el.dataset.parallax) * 5,
    ease: "none",
    scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
  });
});
\`\`\`

### Reduced Motion
\`\`\`css
@media (prefers-reduced-motion: reduce) { [data-parallax] { transform: none !important; } }
\`\`\`
All layers drop to zero rate difference; the layout becomes static and reading order is unchanged.

## Self-Verification Checklist

- [ ] Warm paper base, ink body, single brick-red accent
- [ ] Parallax is transform: translate3d + rAF-throttled only
- [ ] No more than 3 rate tiers per viewport
- [ ] Body measure 65-75ch with serif headings / chapter numbers / drop caps
- [ ] Sticky image-text interlock present
- [ ] prefers-reduced-motion zero-rate fallback
- [ ] Parallax weakened or disabled on mobile`,

  examplePrompts: [
    {
      title: "视差长文特写",
      titleEn: "Parallax Longform Feature",
      description: "有景深的杂志长文页",
      descriptionEn: "A magazine longform feature with depth",
      prompt: `Create a parallax editorial longform feature page with:
1. Warm paper #F5F0E6, ink #1A1712 body, single brick-red #B3401F accent
2. Load Fraunces serif from fonts.loli.net for headings and pull quotes
3. Hero: three parallax layers via transform translate3d — a giant faint background year (rate 0.15), a brick vertical rule (rate 0.4), and static foreground title
4. Chapters numbered with large serif figures and a thin top rule; first paragraph of each uses a brick drop cap
5. One sticky interlock section: an image column pinned while the text column scrolls beside it
6. Body measure capped at 68ch, line-height 1.7
7. Single rAF scroll loop drives all [data-parallax] layers; prefers-reduced-motion sets transform:none and parallax weakens on mobile`,
      promptEn: `Create a parallax editorial longform feature page with:
1. Warm paper #F5F0E6, ink #1A1712 body, single brick-red #B3401F accent
2. Load Fraunces serif from fonts.loli.net for headings and pull quotes
3. Hero: three parallax layers via transform translate3d — a giant faint background year (rate 0.15), a brick vertical rule (rate 0.4), and static foreground title
4. Chapters numbered with large serif figures and a thin top rule; first paragraph of each uses a brick drop cap
5. One sticky interlock section: an image column pinned while the text column scrolls beside it
6. Body measure capped at 68ch, line-height 1.7
7. Single rAF scroll loop drives all [data-parallax] layers; prefers-reduced-motion sets transform:none and parallax weakens on mobile`,
    },
    {
      title: "视差品牌故事页",
      titleEn: "Parallax Brand Story",
      description: "分章节的品牌叙事落地页",
      descriptionEn: "A chaptered brand-narrative landing page",
      prompt: `Create a parallax editorial brand story landing page with:
1. Paper #F5F0E6 stage, ink type, brick #B3401F for chapter numbers and links only
2. Fraunces serif headings; humanist sans body at 70ch measure
3. Four chapters, each with a serif index (01-04), top rule, drop-cap opening paragraph
4. Two sticky interlock sections alternating image-left / image-right, images pinned while copy scrolls
5. A background sand-colored layer drifting at rate 0.12 behind the whole page
6. Pull quote with a left brick rule and large italic serif
7. rAF-throttled parallax, transform-only, reduced-motion static fallback, parallax disabled under 768px`,
      promptEn: `Create a parallax editorial brand story landing page with:
1. Paper #F5F0E6 stage, ink type, brick #B3401F for chapter numbers and links only
2. Fraunces serif headings; humanist sans body at 70ch measure
3. Four chapters, each with a serif index (01-04), top rule, drop-cap opening paragraph
4. Two sticky interlock sections alternating image-left / image-right, images pinned while copy scrolls
5. A background sand-colored layer drifting at rate 0.12 behind the whole page
6. Pull quote with a left brick rule and large italic serif
7. rAF-throttled parallax, transform-only, reduced-motion static fallback, parallax disabled under 768px`,
    },
  ],

  variants: [
    {
      id: "parallax-editorial-noir",
      name: "视差杂志·夜刊",
      nameEn: "Parallax Noir",
      description: "Inverted evening edition: charcoal stock with warm ivory type and the same brick accent",
      colors: {
        primary: "#EDE6D8",
        secondary: "#17150F",
        accent: ["#C8542E", "#2A251C", "#5C5443"],
      },
    },
    {
      id: "parallax-editorial-botanic",
      name: "视差杂志·草木",
      nameEn: "Parallax Botanic",
      description: "Herbarium variant: pale paper with a deep green accent for a naturalist journal",
      colors: {
        primary: "#1A1712",
        secondary: "#F1EEE2",
        accent: ["#3F6B47", "#2E2A22", "#C4BBA2"],
      },
    },
  ],
};
