import type { DesignStyle } from "./types";

export const immersivePhoto: DesignStyle = {
  slug: "immersive-photo",
  name: "沉浸摄影",
  nameEn: "Immersive Photo",
  description:
    "摄影即界面。全幅大图铺满视口，文字压在图上、靠可读性遮罩浮起；缓慢的 Ken Burns 推拉让静照呼吸，模糊占位先行、真图渐显。图是内容不是背景，排版为让照片说话而生。",
  descriptionEn:
    "Photography is the interface. Full-bleed images fill the viewport with text floating over readability scrims; a slow Ken Burns drift lets stills breathe, a blur-up placeholder loads first and the real frame fades in. The image is the content, not the backdrop.",
  cover: "/styles/immersive-photo.svg",
  styleType: "visual",
  tags: [],
  category: "expressive",
  colors: {
    primary: "#0C0D10",
    secondary: "#F4F1EA",
    accent: ["#E8B04B", "#1A1C22", "#B8BCC4"],
  },
  keywords: ["immersive", "photography", "full-bleed", "ken burns", "scrim", "hero image", "沉浸", "摄影", "全幅", "大图", "遮罩"],
  keywordsEn: ["immersive photography", "full-bleed images", "fullscreen hero", "Ken Burns effect", "text over image", "scrim overlay", "photo essay", "photography website", "blur-up placeholder", "visual storytelling"],

  philosophy: `沉浸摄影的信条：照片不是配图，是主角。当一张全幅大图铺满视口，界面就退居其后——文字只是压在光影上的说明，UI 是为了不挡住照片而存在。

核心理念：
- 图即内容：每屏一张能独立成立的照片，占满视口（full-bleed）。它承担情绪、色调与信息，排版为它让路
- 可读性遮罩（scrim）：文字压图必须先铺一层渐变暗罩或局部模糊，保证 4.5:1 对比。scrim 是纪律不是可选项
- Ken Burns：静照用极缓慢的 scale + translate 推拉（8-20s），让照片有呼吸感，但绝不快到让人眩晕
- 渐进加载：先上 LQIP 模糊占位（20px 内联 base64），真图 decode 后交叉淡入。首屏永不白屏
- 从图取色：唯一强调色从照片里采一支暖光（如琥珀金 #E8B04B），别硬塞品牌色
- 留白即呼吸：满图段落之间要有安静的纯色/纯文字段，否则视觉过载

设计原则：
- 性能红线：图用 AVIF + WebP 双格式、responsive srcset、hero 之外全部 lazy；显式 aspect-ratio 防 CLS；Ken Burns 只用 transform（合成器层）
- 无障碍红线：所有图有意义的 alt；prefers-reduced-motion 下 Ken Burns 停、交叉淡入变瞬时；scrim 保证文字对比达标
- LCP 纪律：首屏 hero 图 preload + fetchpriority=high，其余 loading=lazy + decoding=async
- 移动端：竖屏用 object-fit: cover + 焦点对齐，绝不拉伸变形`,

  philosophyEn: `The immersive-photo creed: the photograph is the protagonist, not the garnish. When a full-bleed image fills the viewport, the interface recedes behind it — text is just a caption pressed onto light, and the UI exists to stay out of the picture's way.

Core principles:
- The image is content: one self-sufficient photograph per screen, filling the viewport (full-bleed). It carries the mood, palette and information; type steps aside for it
- Readability scrims: text over an image must sit on a gradient darkening or local blur that guarantees 4.5:1 contrast. The scrim is discipline, not an option
- Ken Burns: stills get a very slow scale + translate drift (8-20s) so the photo breathes — never fast enough to induce motion sickness
- Progressive loading: an LQIP blur placeholder (20px inline base64) loads first, the real frame cross-fades in once decoded. The first paint is never blank
- Color from the image: the single accent is sampled from the photo's warm light (e.g. amber #E8B04B), not a forced brand color
- Whitespace is breath: alternate full-bleed passages with quiet solid/text-only sections or the eye overloads

Design principles:
- Performance line: AVIF + WebP dual formats, responsive srcset, everything below the hero lazy-loaded; explicit aspect-ratio to prevent CLS; Ken Burns uses transform only (compositor layer)
- Accessibility line: meaningful alt on every image; under prefers-reduced-motion the Ken Burns stops and cross-fades become instant; scrims keep text contrast compliant
- LCP discipline: preload the hero image with fetchpriority=high, everything else loading=lazy + decoding=async
- Mobile: portrait uses object-fit: cover with focal alignment, never distort by stretching`,

  doList: [
    "每屏一张全幅照片 object-cover 铺满视口，图是主角、UI 让路",
    "文字压图必铺可读性遮罩：linear-gradient 暗罩或局部 backdrop-blur，保证 4.5:1 对比",
    "Ken Burns 缓慢推拉：transform: scale(1.08) + translate，8-20s ease-in-out，只用 transform",
    "渐进加载：LQIP 20px 模糊占位内联 base64 先显，真图 decode 后 opacity 交叉淡入",
    "图用 AVIF + WebP 双格式 + srcset；hero preload fetchpriority=high，其余 loading=lazy decoding=async",
    "显式 aspect-ratio 或固定容器高度防 CLS",
    "唯一强调色从照片采暖光（如琥珀金 #E8B04B），只用于关键 CTA 与高亮",
    "满图段与安静纯色/纯文字段交替，给视觉呼吸",
    "prefers-reduced-motion 下停 Ken Burns、淡入变瞬时；每张图写有意义 alt",
  ],

  doListEn: [
    "One full-bleed photo per screen, object-cover filling the viewport; the image leads and UI steps aside",
    "Text over image always sits on a readability scrim: a linear-gradient darkening or local backdrop-blur guaranteeing 4.5:1",
    "Slow Ken Burns: transform scale(1.08) + translate, 8-20s ease-in-out, transform only",
    "Progressive loading: an inline 20px LQIP blur placeholder shows first, the real frame cross-fades in on decode",
    "AVIF + WebP dual formats + srcset; preload the hero with fetchpriority=high, everything else loading=lazy decoding=async",
    "Explicit aspect-ratio or fixed container height to prevent CLS",
    "One accent sampled from the photo's warm light (e.g. amber #E8B04B), only for key CTAs and highlights",
    "Alternate full-bleed passages with quiet solid/text-only sections for visual breath",
    "Under prefers-reduced-motion stop Ken Burns and make fades instant; give every image meaningful alt text",
  ],

  dontList: [
    "禁止把照片当纯装饰背景后铺一堆卡片挡住它（图是主角）",
    "禁止文字直接压在图上不加遮罩（读不清 + 对比不达标）",
    "禁止用未优化大图（必须 AVIF/WebP + srcset，绝不首屏加载多张全尺寸 JPG）",
    "禁止 Ken Burns 过快或改布局属性（只用 transform，8s 起步）",
    "禁止无 aspect-ratio 直接塞图（触发 CLS）",
    "禁止多个强调色，禁止硬塞与照片冲突的品牌色",
    "禁止省略 LQIP 占位（首屏白屏 / 跳版）与 prefers-reduced-motion 降级",
  ],

  dontListEn: [
    "Never treat the photo as mere backdrop buried under a pile of cards (the image leads)",
    "Never put text directly on an image with no scrim (unreadable + fails contrast)",
    "Never ship unoptimized large images (AVIF/WebP + srcset required; never load several full-size JPGs above the fold)",
    "Never make Ken Burns fast or animate layout props (transform only, 8s minimum)",
    "Never place an image without an aspect-ratio (causes CLS)",
    "Never use multiple accents or force a brand color that fights the photo",
    "Never omit the LQIP placeholder (blank/janky first paint) or the prefers-reduced-motion fallback",
  ],

  components: {
    button: {
      name: "Button",
      description: "Frosted button that stays legible over any photo",
      code: `<button className="inline-flex items-center gap-2
  px-6 py-3 rounded-full
  bg-white/12 backdrop-blur-md
  border border-white/30
  text-white font-medium
  hover:bg-white/20 hover:border-white/50
  transition-all duration-300
">
  View the series
  <span aria-hidden>&rarr;</span>
</button>`,
    },
    card: {
      name: "Card",
      description: "Full-bleed photo card with gradient scrim caption",
      code: `<article className="relative aspect-[4/5] overflow-hidden rounded-2xl group">
  <img src="/photo.avif" alt="A ridge at first light" loading="lazy" decoding="async"
    className="absolute inset-0 w-full h-full object-cover
      transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
  <div className="absolute bottom-0 p-6">
    <p className="text-xs uppercase tracking-widest text-[#E8B04B] mb-1">Field notes</p>
    <h3 className="text-white text-xl font-semibold">First light on the ridge</h3>
  </div>
</article>`,
    },
    input: {
      name: "Input",
      description: "Frosted field readable over imagery",
      code: `<input type="email" placeholder="Your email"
  className="w-full px-5 py-3 rounded-full
    bg-white/10 backdrop-blur-md
    border border-white/25
    text-white placeholder-white/50
    focus:outline-none focus:border-white/60 focus:bg-white/15
    transition-all duration-300" />`,
    },
    nav: {
      name: "Navigation",
      description: "Transparent-to-scrim nav floating over the hero photo",
      code: `<nav className="fixed top-0 inset-x-0 z-50
  bg-gradient-to-b from-black/50 to-transparent
">
  <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
    <span className="text-white font-semibold tracking-tight">Atlas</span>
    <div className="flex items-center gap-6 text-sm text-white/80">
      <a href="#series" className="hover:text-white transition-colors">Series</a>
      <a href="#about" className="hover:text-white transition-colors">About</a>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "Hero",
      description: "Full-bleed Ken Burns hero with LQIP blur-up and scrim",
      code: `<section className="relative h-screen overflow-hidden">
  {/* LQIP placeholder shows instantly, real frame fades over it */}
  <div className="absolute inset-0 bg-cover bg-center scale-105"
    style={{ backgroundImage: 'url(data:image/webp;base64,UklGR...)' }} />
  <img src="/hero.avif" alt="Dawn over the ridgeline" fetchpriority="high" decoding="async"
    className="absolute inset-0 w-full h-full object-cover
      motion-safe:animate-[kenburns_18s_ease-in-out_infinite_alternate]" />
  {/* Readability scrim */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
  <div className="relative z-10 h-full flex flex-col justify-end max-w-6xl mx-auto px-6 pb-24">
    <p className="text-[#E8B04B] uppercase tracking-widest text-sm mb-3">Chapter One</p>
    <h1 className="text-white text-5xl md:text-7xl font-semibold max-w-3xl leading-[1.05]">
      The light arrives before the sound
    </h1>
  </div>
</section>

{/* @keyframes kenburns { from { transform: scale(1) translate(0,0) } to { transform: scale(1.12) translate(-2%, -1%) } } */}`,
    },
  },

  globalCss: `/* Immersive Photo Global Styles */

:root {
  --ip-ink: #0C0D10;
  --ip-paper: #F4F1EA;
  --ip-amber: #E8B04B;
  --ip-mist: #B8BCC4;
}

/* Ken Burns — transform only, compositor-friendly */
@keyframes ip-kenburns {
  from { transform: scale(1) translate3d(0, 0, 0); }
  to { transform: scale(1.12) translate3d(-2%, -1.5%, 0); }
}
.ip-kenburns {
  animation: ip-kenburns 18s ease-in-out infinite alternate;
  will-change: transform;
}

/* Full-bleed image base — always cover, explicit ratio at call site to avoid CLS */
.ip-cover {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Readability scrim presets */
.ip-scrim-bottom { background: linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.15) 45%, transparent 70%); }
.ip-scrim-full { background: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.35)); }

/* Blur-up: LQIP is a scaled-up tiny image; real frame fades in on load */
.ip-lqip { filter: blur(16px); transform: scale(1.06); }
.ip-frame { opacity: 0; transition: opacity 0.8s ease; }
.ip-frame[data-loaded="true"] { opacity: 1; }

@media (prefers-reduced-motion: reduce) {
  .ip-kenburns { animation: none; }
  .ip-frame { transition: none; }
}`,

  aiRules: `# 沉浸摄影（Immersive Photo）设计系统

你是一个专精沉浸摄影（Immersive Photo）风格全幅摄影界面的前端开发专家，生成的所有代码都必须严格遵循以下规范。

## 风格身份
- **名称**：Immersive Photo（沉浸摄影）
- **本质**：摄影即界面；图像才是内容，UI 只负责让路
- **气质**：电影感、编辑感、氛围感、画廊级质感
- **灵感来源**：旅行与图片故事专题、Apple 产品摄影、全幅编辑跨页

---

## 绝对禁止

| 模式 | 原因 |
|---------|--------|
| 把照片当背景埋在一堆卡片下面 | 图像才是主角 |
| 文字直接压在图片上、不加遮罩 | 不可读，对比度不达标 |
| 使用未优化的大图 | 必须用 AVIF/WebP + srcset；首屏绝不能加载多张原尺寸 JPG |
| Ken Burns 快于 8s，或动画布局属性 | 只能用 transform，避免眩晕 |
| 图片没有 aspect-ratio／固定高度 | 会造成 CLS |
| 多个强调色／与照片冲突的品牌色 | 只允许一种从照片取样的强调色 |
| 缺少 LQIP 占位或 reduced-motion 降级 | 首屏空白／跳动，无障碍不达标 |

## 必须遵守

### 图即内容
每屏一张能独立成立的全幅照片，object-fit: cover 铺满视口。UI 退居其后，文字只是压在光影上的说明文字。

### 可读性遮罩（scrim，纪律）
在任何文字压图之前，先铺一层能保证 4.5:1 对比度的遮罩：
- 底部说明文字：linear-gradient(to top, rgba(0,0,0,0.72), transparent 70%)
- 全屏叠加：linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.35))
- 或局部 backdrop-blur-md + bg-black/30 浮层

### Ken Burns（招牌）
\`\`\`css
@keyframes ip-kenburns { from { transform: scale(1) translate3d(0,0,0); } to { transform: scale(1.12) translate3d(-2%,-1.5%,0); } }
.ip-kenburns { animation: ip-kenburns 18s ease-in-out infinite alternate; will-change: transform; }
\`\`\`
只用 transform（合成器层），时长 8-20s，绝不能让人眩晕。

### 渐进加载（LQIP blur-up）
1. 先渲染一张 20px 模糊占位图（内联 base64 或 CSS blur），配合 scale(1.06) 遮住边缘
2. 真实 <img> 的 onLoad 触发后，设置 data-loaded=true，opacity 从 0 交叉淡入到 1
\`\`\`jsx
const [loaded, setLoaded] = useState(false);
<img onLoad={() => setLoaded(true)} data-loaded={loaded} className="ip-frame" ... />
\`\`\`

### 性能
- 双格式：\`<picture><source srcset="x.avif" type="image/avif"><source srcset="x.webp" type="image/webp"><img src="x.webp"></picture>\`
- hero 图：fetchpriority="high" + preload；其余图片：loading="lazy" decoding="async"
- 显式声明 aspect-ratio（如 aspect-[4/5]）或固定容器高度，防止 CLS
- 使用响应式 srcset + sizes

### 配色（从图取色）
- 墨色 #0C0D10／纸色 #F4F1EA 用于纯色区块
- 图片上的文字：text-white + white/80 + white/60
- 唯一强调色琥珀金 #E8B04B：仅用于关键 CTA、章节引题、高亮
- 强调色要从当前照片的暖光中取样，绝不强行使用与照片冲突的品牌色

### 无障碍
- 每张图片都要有有意义的 alt（装饰性图片用 alt=""）
- prefers-reduced-motion：停止 Ken Burns，淡入变为瞬时
- 压在遮罩上的文字对比度 >= 4.5:1

## 自检清单

- [ ] 每屏一张全幅照片；图像是主导
- [ ] 每处压图文字都铺了遮罩，且对比度达标
- [ ] Ken Burns 只用 transform，时长 >=8s，并有 reduced-motion 降级
- [ ] 有 LQIP 占位 + 交叉淡入；首屏不会空白
- [ ] 图片是 AVIF/WebP 双格式 + srcset + 懒加载（hero 除外）
- [ ] 设置了 aspect-ratio 以防止 CLS
- [ ] 只有一种琥珀色强调色，且从图片中取样`,

  aiRulesEn: `# Immersive Photo Design System

You are an expert frontend developer specializing in immersive full-bleed photography interfaces. Generate all code strictly following these specifications.

## Style Identity
- **Name**: Immersive Photo
- **Essence**: Photography is the interface; the image is the content, the UI stays out of the way
- **Mood**: Cinematic, editorial, atmospheric, gallery-grade
- **Inspiration**: Travel and photo-essay features, Apple product photography, full-bleed editorial spreads

---

## Forbidden

| Pattern | Reason |
|---------|--------|
| Photo as backdrop buried under cards | The image is the protagonist |
| Text directly on an image with no scrim | Unreadable, fails contrast |
| Unoptimized large images | AVIF/WebP + srcset required; never several full-size JPGs above the fold |
| Ken Burns faster than 8s or animating layout props | transform only, no motion sickness |
| Image without aspect-ratio / fixed height | Causes CLS |
| Multiple accents / a brand color fighting the photo | One sampled accent only |
| Missing LQIP placeholder or reduced-motion fallback | Blank/janky paint, accessibility fail |

## Required

### The Image Is Content
One self-sufficient full-bleed photo per screen, object-fit: cover filling the viewport. UI recedes; text is a caption pressed onto light.

### Readability Scrim (discipline)
Before any text-over-image, lay a scrim guaranteeing 4.5:1:
- Bottom caption: linear-gradient(to top, rgba(0,0,0,0.72), transparent 70%)
- Full overlay: linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.35))
- Or a local backdrop-blur-md + bg-black/30 panel

### Ken Burns (signature)
\`\`\`css
@keyframes ip-kenburns { from { transform: scale(1) translate3d(0,0,0); } to { transform: scale(1.12) translate3d(-2%,-1.5%,0); } }
.ip-kenburns { animation: ip-kenburns 18s ease-in-out infinite alternate; will-change: transform; }
\`\`\`
transform only (compositor), 8-20s, never dizzying.

### Progressive Loading (LQIP blur-up)
1. Render a 20px blur placeholder first (inline base64 or CSS blur), scale(1.06) to hide edges
2. On the real <img> onLoad, set data-loaded=true and cross-fade opacity 0->1
\`\`\`jsx
const [loaded, setLoaded] = useState(false);
<img onLoad={() => setLoaded(true)} data-loaded={loaded} className="ip-frame" ... />
\`\`\`

### Performance
- Dual format: \`<picture><source srcset="x.avif" type="image/avif"><source srcset="x.webp" type="image/webp"><img src="x.webp"></picture>\`
- Hero: fetchpriority="high" + preload; others: loading="lazy" decoding="async"
- Explicit aspect-ratio (e.g. aspect-[4/5]) or fixed container height to prevent CLS
- Responsive srcset + sizes

### Palette (color from the image)
- Ink #0C0D10 / paper #F4F1EA for solid sections
- Text on image: text-white + white/80 + white/60
- One accent amber #E8B04B: key CTAs, chapter kickers, highlights only
- Sample the accent from the current photo's warm light; never force a clashing brand color

### Accessibility
- Meaningful alt on every image (alt="" for decorative)
- prefers-reduced-motion: stop Ken Burns, make fades instant
- Text over scrim contrast >= 4.5:1

## Self-Verification Checklist

- [ ] One full-bleed photo per screen; the image leads
- [ ] Every text-over-image sits on a scrim and passes contrast
- [ ] Ken Burns is transform-only, >=8s, with a reduced-motion fallback
- [ ] LQIP placeholder + cross-fade; no blank first paint
- [ ] Images are AVIF/WebP dual format + srcset + lazy (except hero)
- [ ] aspect-ratio set to prevent CLS
- [ ] Single amber accent, sampled from the image`,

  examplePrompts: [
    {
      title: "摄影游记长页",
      titleEn: "Photo Travelogue",
      description: "全幅大图驱动的旅行摄影长页",
      descriptionEn: "A full-bleed photo-driven travel essay",
      prompt: `Create an immersive photo travelogue with:
1. Full-screen hero photo with a slow Ken Burns drift (transform scale 1->1.12, 18s ease-in-out alternate), an LQIP blur-up placeholder that cross-fades to the real frame, and a bottom-to-top scrim
2. Ink #0C0D10 / paper #F4F1EA solid sections between the photo passages for breath
3. Chapter kickers and one CTA in amber #E8B04B sampled from the light; everything else white/white-80 over imagery
4. A gallery of full-bleed photo cards (aspect-[4/5]) that scale slightly on hover, each with a gradient scrim caption
5. Images as <picture> AVIF+WebP with srcset; hero fetchpriority=high, rest loading=lazy decoding=async; explicit aspect-ratio to avoid CLS
6. Frosted (backdrop-blur) nav and buttons that stay legible over any photo
7. prefers-reduced-motion: Ken Burns off, fades instant; meaningful alt on every image`,
      promptEn: `Create an immersive photo travelogue with:
1. Full-screen hero photo with a slow Ken Burns drift (transform scale 1->1.12, 18s ease-in-out alternate), an LQIP blur-up placeholder that cross-fades to the real frame, and a bottom-to-top scrim
2. Ink #0C0D10 / paper #F4F1EA solid sections between the photo passages for breath
3. Chapter kickers and one CTA in amber #E8B04B sampled from the light; everything else white/white-80 over imagery
4. A gallery of full-bleed photo cards (aspect-[4/5]) that scale slightly on hover, each with a gradient scrim caption
5. Images as <picture> AVIF+WebP with srcset; hero fetchpriority=high, rest loading=lazy decoding=async; explicit aspect-ratio to avoid CLS
6. Frosted (backdrop-blur) nav and buttons that stay legible over any photo
7. prefers-reduced-motion: Ken Burns off, fades instant; meaningful alt on every image`,
    },
    {
      title: "产品摄影落地页",
      titleEn: "Product Photo Landing",
      description: "大图沉浸式产品落地页",
      descriptionEn: "A full-bleed product hero landing page",
      prompt: `Create an immersive product landing page with:
1. A full-bleed product hero photo, Ken Burns on load, LQIP blur-up, and a left-anchored scrim so the headline stays readable
2. Alternating sections: full-bleed lifestyle photo, then a quiet ink/paper text section, repeating
3. Amber #E8B04B for the single buy CTA and price highlight only; all other text white over scrims
4. Photo detail cards with aspect-ratio locked and hover scale-105
5. <picture> AVIF+WebP srcset, hero preloaded fetchpriority=high, rest lazy
6. A frosted sticky buy-bar (backdrop-blur) that floats over the imagery
7. reduced-motion: no Ken Burns, instant cross-fades; every image has descriptive alt`,
      promptEn: `Create an immersive product landing page with:
1. A full-bleed product hero photo, Ken Burns on load, LQIP blur-up, and a left-anchored scrim so the headline stays readable
2. Alternating sections: full-bleed lifestyle photo, then a quiet ink/paper text section, repeating
3. Amber #E8B04B for the single buy CTA and price highlight only; all other text white over scrims
4. Photo detail cards with aspect-ratio locked and hover scale-105
5. <picture> AVIF+WebP srcset, hero preloaded fetchpriority=high, rest lazy
6. A frosted sticky buy-bar (backdrop-blur) that floats over the imagery
7. reduced-motion: no Ken Burns, instant cross-fades; every image has descriptive alt`,
    },
  ],

  variants: [
    {
      id: "immersive-photo-noir",
      name: "沉浸摄影·黑白",
      nameEn: "Immersive Noir",
      description: "Monochrome edition: grayscale imagery with a single cool-white accent for fine-art galleries",
      colors: {
        primary: "#0A0A0B",
        secondary: "#EDEDED",
        accent: ["#DCDCE0", "#141416", "#8A8A90"],
      },
    },
    {
      id: "immersive-photo-editorial",
      name: "沉浸摄影·刊物",
      nameEn: "Immersive Editorial",
      description: "Magazine edition: warm paper text sections between photos with a deep ink-blue accent",
      colors: {
        primary: "#0C0D10",
        secondary: "#F4F1EA",
        accent: ["#3B5B8C", "#1A1C22", "#B8BCC4"],
      },
    },
  ],
};
