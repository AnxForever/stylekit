import type { DesignStyle } from "./types";

export const luxeLookbook: DesignStyle = {
  slug: "luxe-lookbook",
  name: "奢华画册",
  nameEn: "Luxe Lookbook",
  description:
    "时装屋数字旗舰的高级定制美学：瓷白底、墨黑字、一支哑光金；超大高对比 Didone 衬线做标题，通栏丝绸动态视频首屏，画册网格悬停揭图。留白即奢侈，克制即高级，数字如艺术品——像一家敢为一件大衣标价四千欧元的时装屋。",
  descriptionEn:
    "The couture aesthetic of a fashion maison's digital flagship: a porcelain ground, ink-noir type, one muted gold; oversized high-contrast Didone serif display, a full-bleed silk-motion film hero, and a lookbook grid with hover image reveals. Absence is the luxury, restraint is the polish, numerals become art -- a house that charges four thousand euros for a coat.",
  cover: "/styles/luxe-lookbook.svg",
  styleType: "visual",
  tags: [],
  category: "expressive",
  colors: {
    primary: "#141210",
    secondary: "#F7F5F1",
    accent: ["#9A7B4F", "#E8E3DB", "#6B6259"],
  },
  keywords: [
    "奢华",
    "时装",
    "画册",
    "高级定制",
    "编辑排版",
    "衬线",
    "留白",
    "瓷白",
    "哑光金",
    "极简奢侈",
    "maison",
    "lookbook",
  ],
  keywordsEn: [
    "luxury fashion",
    "lookbook",
    "maison website",
    "couture",
    "editorial layout",
    "didone serif",
    "high fashion",
    "porcelain palette",
    "muted gold accent",
    "quiet luxury",
    "campaign site",
    "flagship boutique",
  ],

  philosophy: `奢华画册的信条：奢侈不是加法，是减法。真正的时装屋从不喧哗——它靠留白、靠克制、靠一件单品占满整屏来说话。数字旗舰就是一本会动的画册：图片是主角，文字是低语，金色只落在一处。

核心理念：
- 留白即奢侈：巨量负空间不是浪费，是底气。敢让一个标题独占半屏、敢让一张大衣照片四周全空，才像卖四千欧元的屋子
- 画册是叙事：lookbook 不是商品陈列，是一季的故事。每张竖幅肖像按顺序铺陈，悬停缓缓揭开，像翻动纸质画册
- 动态如丝绸不似烟花：首屏丝绸流动的循环视频给静态页面注入呼吸，但运动必须慢、必须无缝，是绸缎垂落不是特效炸裂
- 一支哑光金：整站唯一强调色是 #9A7B4F 哑光金——落在 kicker、hairline 焦点、单个 CTA。多一处就俗
- 数字即艺术：超大高对比 Didone 衬线（Playfair Display）把标题和编号当版画来排，字重靠字体本身的粗细对比，不靠 bold
- 编辑式克制：全站方角、hairline 细线（1px #141210/20）分栏、大写字母 0.3em 字距的标签。任何圆角、阴影、渐变都会拉低身价

设计原则：
- 性能红线：视频海报帧作 LCP（AVIF 优先），preload="none"，进视口才静音自动播、离屏暂停；显式宽高比防 CLS
- 降级：prefers-reduced-motion / Save-Data 只显海报静帧，给播放按钮
- 图片：竖幅 4:5 肖像用 <picture> AVIF+WebP，懒加载 + 显式宽高比；悬停只用 transform/opacity（scale 1.04 + 说明上浮）
- 排版层级：Didone 衬线做展示，中性无衬线做正文与标签；正文行高宽松，标签全大写宽字距`,

  philosophyEn: `The luxe-lookbook creed: luxury is subtraction, not addition. A true maison never shouts -- it speaks through negative space, through restraint, through letting a single garment own the whole screen. The digital flagship is a lookbook that moves: the image is the subject, the words are a whisper, the gold lands in exactly one place.

Core principles:
- Absence is the luxury: vast negative space is not waste, it is confidence. Only a house that dares let a headline own half the screen, and a coat photograph float in emptiness, reads as one that charges four thousand euros
- The lookbook is narrative: the grid is not a product rack, it is a season's story. Portrait plates unfold in sequence, revealing slowly on hover, like turning the pages of a printed lookbook
- Motion like silk, not fireworks: a looping silk-motion video breathes life into a static page, but the motion must be slow and seamless -- satin falling, never an effect exploding
- One muted gold: the only accent across the whole site is #9A7B4F muted gold -- on the kicker, the hairline focus, a single CTA. One more use and it turns cheap
- Numerals as art: the oversized high-contrast Didone serif (Playfair Display) sets titles and numbers like engravings; weight comes from the typeface's own thick-thin contrast, never from bold
- Editorial restraint: square corners everywhere, hairline rules (1px #141210/20) dividing columns, uppercase labels at 0.3em tracking. Any radius, shadow, or gradient cheapens the house

Design principles:
- Performance line: the video poster frame is the LCP (AVIF first), preload="none", muted autoplay only in view, pause offscreen; explicit aspect-ratio to prevent CLS
- Fallbacks: prefers-reduced-motion / Save-Data show the poster still only, with a play button
- Imagery: portrait 4:5 plates via <picture> AVIF+WebP, lazy-loaded with explicit aspect-ratio; hover uses transform/opacity only (scale 1.04 + caption rise)
- Typographic hierarchy: Didone serif for display, a neutral sans for body and labels; generous body line-height, all-caps wide-tracked labels`,

  doList: [
    "瓷白底 #F7F5F1 + 墨黑字 #141210 + 唯一哑光金 #9A7B4F 强调",
    "超大高对比 Didone 衬线（Playfair Display）做标题，clamp() 最大可到 ~8rem",
    "巨量留白：让单个标题或一张竖幅照片独占大半屏",
    "画册网格：4:5 竖幅肖像用 <picture> AVIF+WebP，悬停 scale(1.04) 缓慢揭图 + 说明上浮",
    "视频首屏海报优先：poster AVIF 作 LCP，preload=none，进视口才静音自动播、离屏暂停",
    "hairline 细线（1px #141210/20）分栏，全站方角（rounded-none）",
    "大写标签 0.3em 字距，中性无衬线做正文与标签，衬线只做展示",
    "prefers-reduced-motion / Save-Data 下不自动播、显海报静帧",
  ],

  doListEn: [
    "Porcelain #F7F5F1 ground, ink #141210 type, one muted gold #9A7B4F accent",
    "Oversized high-contrast Didone serif (Playfair Display) for titles, clamp() up to ~8rem",
    "Vast whitespace: let a single headline or one portrait plate own most of the screen",
    "Lookbook grid: 4:5 portraits via <picture> AVIF+WebP, hover scale(1.04) slow reveal + caption rise",
    "Poster-first video hero: poster AVIF as LCP, preload=none, muted autoplay in view, pause offscreen",
    "Hairline rules (1px #141210/20) to divide columns; square corners everywhere (rounded-none)",
    "Uppercase labels at 0.3em tracking; neutral sans for body and labels, serif for display only",
    "Under prefers-reduced-motion / Save-Data, do not autoplay -- show the poster still",
  ],

  dontList: [
    "禁止圆角、阴影、渐变（任何一处都拉低身价，改用方角与 hairline）",
    "禁止把金色用在多处（唯一强调色只落在 kicker / 焦点 / 单个 CTA）",
    "禁止用 font-bold 造字重（粗细来自 Didone 衬线本身的对比）",
    "禁止拥挤排版（留白是奢侈，密集是廉价）",
    "禁止视频作 LCP 依赖或省略海报（首屏白屏、LCP 爆炸）",
    "禁止快速 / 跳变的花哨动效（动态是丝绸垂落，不是特效炸裂）",
  ],

  dontListEn: [
    "Never use radius, shadow, or gradient (each one cheapens it -- use square corners and hairlines)",
    "Never spread the gold around (the single accent lands only on kicker / focus / one CTA)",
    "Never fake weight with font-bold (thickness comes from the Didone serif's own contrast)",
    "Never crowd the layout (whitespace is luxury, density is cheap)",
    "Never make the video the LCP dependency or omit the poster (blank first paint, LCP blowup)",
    "Never use fast or jump-cut showy motion (motion is silk falling, not an effect exploding)",
  ],

  components: {
    button: {
      name: "Button",
      description: "Squared ink CTA and a hairline outline",
      code: `<button className="inline-flex items-center justify-center
  px-9 py-4 rounded-none
  bg-[#141210] text-[#F7F5F1]
  uppercase tracking-[0.2em] text-xs
  hover:bg-[#9A7B4F]
  transition-all duration-500
">
  Book an appointment
</button>

<button className="inline-flex items-center justify-center px-9 py-4 rounded-none
  bg-transparent text-[#141210] border border-[#141210]
  uppercase tracking-[0.2em] text-xs
  hover:bg-[#141210] hover:text-[#F7F5F1] transition-all duration-500">
  View the collection
</button>`,
    },
    card: {
      name: "Card",
      description: "Editorial lookbook card with a portrait plate and hairline caption",
      code: `<article className="group bg-[#F7F5F1]">
  <div className="relative aspect-[4/5] overflow-hidden bg-[#E8E3DB]">
    <picture>
      <source srcSet="/look-01.avif" type="image/avif" />
      <source srcSet="/look-01.webp" type="image/webp" />
      <img src="/look-01.webp" alt="The camel coat" loading="lazy" decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
    </picture>
  </div>
  <div className="pt-6 border-t border-[#141210]/15 mt-6">
    <p className="uppercase tracking-[0.3em] text-xs text-[#9A7B4F] mb-2">Look 01</p>
    <h3 className="font-serif text-2xl text-[#141210]">The Camel Coat</h3>
  </div>
</article>`,
    },
    input: {
      name: "Input",
      description: "Underline field for the newsletter and appointment forms",
      code: `<input type="email" placeholder="Your email"
  className="w-full px-0 py-3 rounded-none
    bg-transparent border-b border-[#141210]/25
    text-[#141210] placeholder-[#141210]/40
    uppercase tracking-[0.15em] text-xs
    focus:outline-none focus:border-[#9A7B4F]
    transition-all duration-500" />`,
    },
    nav: {
      name: "Navigation",
      description: "Serif masthead over the film, with letter-spaced links",
      code: `<nav className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-[#F7F5F1]/80 to-transparent">
  <div className="max-w-6xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
    <span className="font-serif text-2xl tracking-tight text-[#141210]">Maison</span>
    <div className="flex items-center gap-8 uppercase tracking-[0.25em] text-xs text-[#141210]">
      <a href="#lookbook" className="hover:text-[#9A7B4F] transition-colors duration-500">Lookbook</a>
      <a href="#atelier" className="hover:text-[#9A7B4F] transition-colors duration-500">Atelier</a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero",
      description: "Poster-first silk-motion film hero: LCP poster, in-view autoplay, scrim, reduced-motion fallback",
      code: `function FilmHero() {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // keep poster still
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { v.load(); v.play().catch(() => {}); }
      else { v.pause(); }
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <section className="relative h-screen overflow-hidden bg-[#F7F5F1]">
      <video ref={ref} poster="/poster.avif" muted loop playsInline preload="none" aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover">
        <source src="/silk.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/50 via-transparent to-[#141210]/20" />
      <div className="relative z-10 h-full max-w-6xl mx-auto px-6 md:px-10 flex flex-col justify-end pb-24">
        <p className="uppercase tracking-[0.3em] text-xs text-[#F7F5F1]/80 mb-5">Autumn Maison</p>
        <h1 className="font-serif text-[#F7F5F1] text-6xl md:text-8xl leading-[0.95] max-w-4xl">
          The Silk Season
        </h1>
      </div>
    </section>
  );
}`,
    },
    footer: {
      name: "Footer",
      description: "Quiet maison footer with hairline top rule and letter-spaced columns",
      code: `<footer className="border-t border-[#141210]/15 bg-[#F7F5F1] py-16">
  <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-wrap items-end justify-between gap-8">
    <span className="font-serif text-3xl text-[#141210]">Maison</span>
    <p className="uppercase tracking-[0.25em] text-xs text-[#6B6259]">Paris - Milan - Tokyo</p>
  </div>
</footer>`,
    },
  },

  globalCss: `/* Luxe Lookbook Global Styles */

:root {
  --ll-porcelain: #F7F5F1;
  --ll-stone: #E8E3DB;
  --ll-ink: #141210;
  --ll-gold: #9A7B4F;
  --ll-taupe: #6B6259;
  --ll-hairline: rgba(20, 18, 16, 0.2);
  --ll-serif: "Playfair Display", "Times New Roman", Georgia, serif;
}

/* Load the Didone display face from the CN mirror */
@import url("https://fonts.loli.net/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..700&display=swap");

.ll-display {
  font-family: var(--ll-serif);
  letter-spacing: -0.01em;
  line-height: 0.95;
}

/* Oversized editorial title */
.ll-hero-title {
  font-family: var(--ll-serif);
  font-size: clamp(3rem, 12vw, 8rem);
  line-height: 0.92;
}

/* Airy uppercase label */
.ll-label {
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 0.75rem;
  color: var(--ll-gold);
}

/* Hairline rule */
.ll-rule {
  border: 0;
  border-top: 1px solid var(--ll-hairline);
}

/* Full-bleed film cover */
.ll-cover {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Readability scrim over the film */
.ll-scrim {
  background: linear-gradient(to top, rgba(20,18,16,0.5), rgba(20,18,16,0) 55%, rgba(20,18,16,0.2));
}

/* Lookbook plate: slow reveal on hover, transform/opacity only */
.ll-plate img {
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.ll-plate:hover img,
.ll-plate:focus-within img {
  transform: scale(1.04);
}

@media (prefers-reduced-motion: reduce) {
  .ll-plate img { transition: none; }
  .ll-plate:hover img,
  .ll-plate:focus-within img { transform: none; }
}`,

  aiRules: `# Luxe Lookbook（奢华画册）设计系统

你是一位专精于时装屋画册（fashion-maison lookbook）界面的前端开发专家。生成的所有代码都必须严格遵守以下规范。

## 风格身份
- **名称**：Luxe Lookbook（奢华画册）
- **本质**：数字旗舰即一本会动的画册；留白即奢侈，一支金色强调，数字如艺术品
- **气质**：高定感、编辑感、克制内敛、低调奢华
- **灵感来源**：Celine、The Row、Jacquemus 等时装屋的 campaign 官网；纸质时装画册

---

## 绝对禁止

| 模式 | 原因 |
|---------|--------|
| 圆角、阴影或渐变装饰 | 每一处都会拉低身价；改用方角与 hairline |
| 金色用在多处 | 唯一强调色只落在 kicker / 焦点 / 单个 CTA |
| 用 font-bold 伪造字重 | 粗细应来自 Didone 衬线本身的对比 |
| 拥挤的排版 | 留白才是奢侈 |
| 视频作为 LCP 依赖 / 省略海报 | 首屏空白，LCP 爆炸 |
| 快速 / 跳变的花哨动效 | 动态应是丝绸垂落，而非特效炸裂 |

## 必须遵守

### 调色板
- 瓷白底 #F7F5F1 / 石灰面 #E8E3DB / 墨黑字 #141210 / 灰褐正文 #6B6259
- 唯一哑光金 #9A7B4F：kicker、hairline 焦点、单个主 CTA
- 全站方角（rounded-none）；hairline 细线 border-[#141210]/20

### 排版
- 展示用超大高对比 Didone 衬线（Playfair Display）；标题 clamp() 可到 ~8rem，line-height ~0.92
- 正文与标签用中性无衬线；标签全大写、字距 0.3em（tracking-[0.3em]）
- 字重来自字体本身，绝不使用 font-bold；行高宽松

### 丝绸动态视频首屏（poster = LCP）
- video 必须带 poster（AVIF 优先）作为 LCP；muted loop playsInline preload="none"
- 仅在进入视口时播放（通过 IntersectionObserver），离屏时暂停：
\`\`\`js
const io = new IntersectionObserver(([e]) => {
  if (e.isIntersecting) { v.load(); v.play().catch(() => {}); }
  else { v.pause(); }
}, { threshold: 0.25 });
io.observe(v);
\`\`\`
- 文字压在视频上，用渐变遮罩加深保证 4.5:1 对比度
- 显式 aspect-ratio / h-screen 防止 CLS

### 画册网格（hover 揭图）
- 竖幅 4:5 肖像用 <picture>：\`<source srcSet=".avif" type="image/avif"><source srcSet=".webp" type="image/webp">\`
- 懒加载 loading="lazy" decoding="async"，并显式设置 aspect-[4/5]
- 悬停只使用 transform/opacity：group-hover:scale-[1.04]（duration-700 缓动）加上说明文字上浮
- 可通过键盘聚焦（focus-within 同样触发揭图）

### 降级方案
- prefers-reduced-motion / Save-Data：不自动播放，显示海报静帧，并提供播放按钮
- 移动端可以只显示海报

## 自检清单

- [ ] 全站方角；无圆角、阴影或渐变装饰
- [ ] 金色只出现在极少数地方
- [ ] 标题使用 Didone 衬线、留白充足、不使用 font-bold
- [ ] 视频海报是 LCP，preload=none，仅在进入视口时播放，离屏暂停
- [ ] 画册图片使用 <picture> AVIF+WebP，显式 4:5，懒加载，悬停 transform 揭图
- [ ] reduced-motion / Save-Data 降级为海报静帧`,

  aiRulesEn: `# Luxe Lookbook Design System

You are an expert frontend developer specializing in fashion-maison lookbook interfaces. Generate all code strictly following these specifications.

## Style Identity
- **Name**: Luxe Lookbook
- **Essence**: A digital flagship as a moving lookbook; absence is the luxury, one gold accent, numerals as art
- **Mood**: Couture, editorial, restrained, quietly expensive
- **Inspiration**: Celine, The Row, Jacquemus campaign sites; printed fashion lookbooks

---

## Forbidden

| Pattern | Reason |
|---------|--------|
| Radius, shadow, or gradient decoration | Each one cheapens it; use square corners and hairlines |
| Gold used in many places | The single accent lands only on kicker / focus / one CTA |
| font-bold to fake weight | Thickness comes from the Didone serif's own contrast |
| Crowded layout | Whitespace is the luxury |
| Video as the LCP dependency / no poster | Blank first paint, LCP blowup |
| Fast / jump-cut showy motion | Motion is silk falling, not an effect exploding |

## Required

### Palette
- Porcelain ground #F7F5F1 / stone surface #E8E3DB / ink text #141210 / taupe body #6B6259
- One muted gold #9A7B4F: kicker, hairline focus, a single primary CTA
- Square corners everywhere (rounded-none); hairline rules border-[#141210]/20

### Typography
- Display uses the oversized high-contrast Didone serif (Playfair Display); titles clamp() up to ~8rem, line-height ~0.92
- Body and labels use a neutral sans; labels are uppercase at 0.3em tracking (tracking-[0.3em])
- Weight comes from the typeface, never font-bold; generous line-height

### Silk-Motion Video Hero (poster = LCP)
- The video must carry a poster (AVIF first) as the LCP; muted loop playsInline preload="none"
- Play only in view via IntersectionObserver, pause offscreen:
\`\`\`js
const io = new IntersectionObserver(([e]) => {
  if (e.isIntersecting) { v.load(); v.play().catch(() => {}); }
  else { v.pause(); }
}, { threshold: 0.25 });
io.observe(v);
\`\`\`
- Scrim text over the film with a gradient darkening for 4.5:1
- Explicit aspect-ratio / h-screen to prevent CLS

### Lookbook Grid (hover reveal)
- Portrait 4:5 plates via <picture>: \`<source srcSet=".avif" type="image/avif"><source srcSet=".webp" type="image/webp">\`
- Lazy-load loading="lazy" decoding="async" with an explicit aspect-[4/5]
- Hover uses transform/opacity only: group-hover:scale-[1.04] (duration-700 ease) plus a caption rise
- Keyboard-focusable (focus-within reveals too)

### Fallbacks
- prefers-reduced-motion / Save-Data: do not autoplay, show the poster still, offer a play button
- Mobile may show poster only

## Self-Verification Checklist

- [ ] Square corners everywhere; no radius, shadow, or gradient decoration
- [ ] Gold appears in only a very few places
- [ ] Titles set in the Didone serif, ample whitespace, no font-bold
- [ ] Video poster is the LCP, preload=none, play only in view, pause offscreen
- [ ] Lookbook images use <picture> AVIF+WebP, explicit 4:5, lazy, hover-transform reveal
- [ ] reduced-motion / Save-Data fall back to the poster still`,

  examplePrompts: [
    {
      title: "时装屋秋季画册首屏",
      titleEn: "Maison Autumn Lookbook Hero",
      description: "丝绸动态视频开场的时装屋落地页",
      descriptionEn: "A fashion maison landing page opened by a silk-motion film",
      prompt: `Create a fashion-maison lookbook landing page with:
1. A full-bleed silk-motion film hero: a <video muted loop playsInline preload="none"> with a poster AVIF as the LCP; load()/play() only in view via IntersectionObserver, pause offscreen; a gradient scrim so the serif headline stays legible
2. Porcelain #F7F5F1 ground, ink #141210 type, one muted gold #9A7B4F accent only on the kicker and a single CTA
3. Oversized high-contrast Didone serif (Playfair Display) title using clamp() up to ~8rem, line-height ~0.92; uppercase tracking-[0.3em] labels
4. A lookbook grid of four 4:5 portrait plates via <picture> AVIF+WebP, lazy-loaded with explicit aspect-ratio; hover reveals with group-hover:scale-[1.04] and a caption rise (transform/opacity only), keyboard-focusable
5. Square corners everywhere (rounded-none), hairline rules (1px #141210/20), vast whitespace; no radius, shadow, or gradient decoration
6. prefers-reduced-motion / Save-Data: no autoplay, show the poster still with a play button`,
      promptEn: `Create a fashion-maison lookbook landing page with:
1. A full-bleed silk-motion film hero: a <video muted loop playsInline preload="none"> with a poster AVIF as the LCP; load()/play() only in view via IntersectionObserver, pause offscreen; a gradient scrim so the serif headline stays legible
2. Porcelain #F7F5F1 ground, ink #141210 type, one muted gold #9A7B4F accent only on the kicker and a single CTA
3. Oversized high-contrast Didone serif (Playfair Display) title using clamp() up to ~8rem, line-height ~0.92; uppercase tracking-[0.3em] labels
4. A lookbook grid of four 4:5 portrait plates via <picture> AVIF+WebP, lazy-loaded with explicit aspect-ratio; hover reveals with group-hover:scale-[1.04] and a caption rise (transform/opacity only), keyboard-focusable
5. Square corners everywhere (rounded-none), hairline rules (1px #141210/20), vast whitespace; no radius, shadow, or gradient decoration
6. prefers-reduced-motion / Save-Data: no autoplay, show the poster still with a play button`,
    },
    {
      title: "高级成衣产品页",
      titleEn: "Ready-to-Wear Product Page",
      description: "编辑式留白的单品详情页",
      descriptionEn: "A single-garment detail page with editorial whitespace",
      prompt: `Create a couture ready-to-wear product page with:
1. A 4:5 portrait plate of the garment via <picture> AVIF+WebP occupying most of the screen, vast whitespace around it, explicit aspect-ratio and lazy loading below the fold
2. Porcelain #F7F5F1 ground, ink #141210 Didone serif garment name (Playfair Display), taupe #6B6259 body copy, one muted gold #9A7B4F line on the "Book an appointment" CTA
3. Uppercase tracking-[0.3em] labels for price and materials, separated by hairline rules (1px #141210/20)
4. Square-cornered underline inputs for the appointment form; no radius, shadow, or gradient
5. A small hover-reveal lookbook strip of related looks at the foot, transform/opacity only`,
      promptEn: `Create a couture ready-to-wear product page with:
1. A 4:5 portrait plate of the garment via <picture> AVIF+WebP occupying most of the screen, vast whitespace around it, explicit aspect-ratio and lazy loading below the fold
2. Porcelain #F7F5F1 ground, ink #141210 Didone serif garment name (Playfair Display), taupe #6B6259 body copy, one muted gold #9A7B4F line on the "Book an appointment" CTA
3. Uppercase tracking-[0.3em] labels for price and materials, separated by hairline rules (1px #141210/20)
4. Square-cornered underline inputs for the appointment form; no radius, shadow, or gradient
5. A small hover-reveal lookbook strip of related looks at the foot, transform/opacity only`,
    },
  ],

  variants: [
    {
      id: "luxe-lookbook-noir",
      name: "奢华画册·夜色",
      nameEn: "Luxe Noir",
      description: "Inverted evening grade: ink ground with porcelain type and the same muted gold for an after-dark campaign",
      colors: {
        primary: "#F4F1EB",
        secondary: "#141210",
        accent: ["#B08D57", "#241F1A", "#9C948A"],
      },
    },
    {
      id: "luxe-lookbook-blush",
      name: "奢华画册·裸粉",
      nameEn: "Luxe Blush",
      description: "Warm nude grade: a blush-porcelain ground with soft rosewood type for a couture bridal or beauty maison",
      colors: {
        primary: "#2A2422",
        secondary: "#F3E9E3",
        accent: ["#A9836B", "#E6D6CC", "#8A7267"],
      },
    },
  ],
};
