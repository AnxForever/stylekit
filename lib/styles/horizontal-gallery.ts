import type { DesignStyle } from "./types";

export const horizontalGallery: DesignStyle = {
  slug: "horizontal-gallery",
  name: "横滚画廊",
  nameEn: "Horizontal Gallery",
  description:
    "白盒美术馆式的横向滚动作品集布局，无边框大图沿水平展线依次排开，留白即展墙，编号与极细图注还原策展语言，观看是一场步行。",
  descriptionEn:
    "A white-cube, curator-style portfolio layout. Borderless large images line up along a horizontal snap-scroll rail; whitespace acts as the gallery wall, numbered hairline captions echo museum labels, and viewing becomes a walk.",
  cover: "/styles/horizontal-gallery.svg",
  styleType: "layout",
  tags: ["responsive"],
  compatibleWith: ["editorial", "minimalist-flat", "swiss-style", "luxury-retail", "wabi-sabi"],
  category: "minimal",
  colors: {
    primary: "#1A1A1A",
    secondary: "#FCFCFA",
    accent: ["#A85A3A", "#8A8A85", "#E8E6E1", "#2E2E2C"],
  },
  keywords: ["横滚", "画廊", "策展", "白盒", "作品集", "留白", "horizontal scroll", "gallery", "white cube", "portfolio", "minimal", "极简"],
  keywordsEn: ["horizontal gallery", "horizontal scroll website", "scroll snap", "white cube", "art gallery website", "museum website", "photography portfolio", "exhibition website", "curated showcase", "minimal gallery"],

  philosophy: `Horizontal Gallery（横滚画廊）把网页想象成一座白盒美术馆（White Cube）：观看不是向下刷信息流，而是沿着一条展线向前步行，每一步停在一件作品正前方。

核心理念：
- 留白即展墙：#FCFCFA 的画廊白不是空缺，而是作品之间的呼吸与静默，间距本身就是策展决定
- 横向即展线：overflow-x-auto 加 scroll-snap 让滚动变成步行，每件作品都被 snap 停驻在观看者面前
- 作品即主角：无边框、无阴影、无圆角，任何容器装饰都不得与作品争夺注意力
- 图注即策展：No. 01 的编号与极细大写图注，用博物馆墙签（wall label）的语气交代作者、媒介与年代

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问`,

  philosophyEn: `Horizontal Gallery imagines the page as a white-cube museum: viewing is not an infinite downward feed but a forward walk along an exhibition line, pausing in front of each work.

Core principles:
- Whitespace is the wall: gallery white #FCFCFA is not emptiness but the silence between works; spacing itself is a curatorial decision
- Horizontal is the route: overflow-x-auto plus scroll-snap turns scrolling into walking, each piece snapping to rest before the viewer
- The work is the protagonist: no borders, no shadows, no rounded corners; container decoration must never compete with the artwork
- Captions are curation: No. 01 numbering and hairline uppercase captions speak in the voice of a museum wall label`,

  doList: [
    "画廊条带使用 overflow-x-auto snap-x snap-mandatory，每件作品 shrink-0 snap-start",
    "作品图一律 rounded-none 无边框无阴影，object-cover 填充 aspect-[4/5] 或 aspect-[3/2]",
    "每件作品配编号 No. 01 / Fig. 01，图注用 text-xs uppercase tracking-[0.2em] text-[#8A8A85] 置于图外下方",
    "分割线全部是 hairline：border-t border-[#E8E6E1]，永远只有 1px",
    "作品之间保持巨大水平留白 gap-16 md:gap-24，条带首尾留出展墙边距 px-6 md:px-20",
    "章节标题作为条带首格并 sticky left-0 bg-[#FCFCFA]，伴随横滚始终在场",
    "标题使用 font-serif font-light tracking-wide，正文 sans 浅色，层级靠字号与字距而非加粗",
    "隐藏横滚滚动条（scrollbar-width: none 与 ::-webkit-scrollbar display: none），用细线进度和箭头代替",
  ],

  doListEn: [
    "Build the gallery strip with overflow-x-auto snap-x snap-mandatory, each work shrink-0 snap-start",
    "Artwork images are always rounded-none with no border and no shadow, object-cover inside aspect-[4/5] or aspect-[3/2]",
    "Give every work a No. 01 / Fig. 01 index and a hairline caption text-xs uppercase tracking-[0.2em] text-[#8A8A85] below the image",
    "All dividers are hairlines: border-t border-[#E8E6E1], never thicker than 1px",
    "Keep vast horizontal whitespace between works gap-16 md:gap-24, with wall margins px-6 md:px-20 at both ends",
    "Place the section title as the first strip cell with sticky left-0 bg-[#FCFCFA] so it accompanies the scroll",
    "Set titles in font-serif font-light tracking-wide, body in sans muted tones; hierarchy comes from size and letter-spacing, not weight",
    "Hide the horizontal scrollbar (scrollbar-width: none plus ::-webkit-scrollbar display: none) and replace it with a hairline progress line and arrows",
  ],

  dontList: [
    "禁止给作品图加阴影、圆角或边框（作品必须像直接挂在展墙上一样干净）",
    "禁止把文字压在作品图上，图注只能出现在图外下方",
    "禁止在横滚条带内混排竖向瀑布流或多行网格",
    "禁止厚重边框 border-2 及以上，一切线条保持 hairline",
    "禁止花哨背景：渐变墙、纹理墙、大面积色块都不允许出现在展墙上",
    "禁止高饱和多色装饰，点缀色只允许赤陶 #A85A3A 少量出现",
  ],

  dontListEn: [
    "Never add shadows, rounded corners, or borders to artwork images (works must hang clean on the wall)",
    "Never place text on top of artwork; captions live only below the image",
    "Never mix vertical masonry or multi-row grids inside the horizontal strip",
    "Never use heavy borders (border-2 and up); every line stays a hairline",
    "Never use flashy backgrounds: gradient walls, textured walls, or large color blocks are forbidden on the gallery wall",
    "Never use saturated multicolor decoration; the only accent allowed is a restrained terracotta #A85A3A",
  ],

  components: {
    button: {
      name: "画廊按钮",
      description: "无圆角墨黑按钮，大写字母配舒展字距，如同展签上的指令",
      code: `<button className="px-8 py-3 bg-[#1A1A1A] text-[#FCFCFA] rounded-none text-xs font-light uppercase tracking-[0.2em] hover:bg-[#2E2E2C] transition-colors duration-300">View Works</button>`,
    },
    card: {
      name: "作品卡片",
      description: "横滚条带内的作品单元：无边框大图、编号、hairline 分割与极细图注",
      code: `<figure className="w-72 shrink-0 snap-start">
  <div className="aspect-[4/5] overflow-hidden bg-[#E8E6E1]">
    <img
      src="/artwork-01.jpg"
      alt="Untitled Study"
      className="w-full h-full object-cover rounded-none"
    />
  </div>
  <figcaption className="mt-5 pt-4 border-t border-[#E8E6E1]">
    <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-2">No. 01</p>
    <p className="font-serif font-light text-base text-[#1A1A1A]">Untitled Study</p>
    <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A85] mt-1.5">Archival Pigment Print, 2026</p>
  </figcaption>
</figure>`,
    },
    input: {
      name: "登记输入框",
      description: "访客登记式的下划线输入框，透明底、hairline 底边、大写占位符",
      code: `<input
  type="text"
  placeholder="YOUR NAME"
  className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#E8E6E1] rounded-none text-sm text-[#1A1A1A] placeholder:text-xs placeholder:uppercase placeholder:tracking-[0.2em] placeholder:text-[#8A8A85] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-300"
/>`,
    },
    nav: {
      name: "展馆导航",
      description: "hairline 底边导航，serif 馆名与大写细字距链接",
      code: `<nav className="flex items-center justify-between px-6 md:px-20 py-6 bg-[#FCFCFA] border-b border-[#E8E6E1]">
  <span className="font-serif font-light text-xl tracking-wide text-[#1A1A1A]">White Room</span>
  <div className="flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] text-[#8A8A85]">
    <span className="text-[#1A1A1A] cursor-pointer">Works</span>
    <span className="hover:text-[#1A1A1A] transition-colors cursor-pointer">Exhibitions</span>
    <span className="hover:text-[#1A1A1A] transition-colors cursor-pointer">Visit</span>
  </div>
</nav>`,
    },
    hero: {
      name: "横滚展线",
      description: "风格核心：sticky 标题格伴随的 snap 横滚作品条带",
      code: `<section className="py-24 bg-[#FCFCFA]">
  <div className="flex gap-16 overflow-x-auto snap-x snap-mandatory pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    <div className="sticky left-0 z-10 shrink-0 w-64 pl-6 md:pl-20 bg-[#FCFCFA] flex flex-col justify-between">
      <div>
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-4">Current Exhibition</p>
        <h2 className="font-serif font-light text-4xl leading-tight text-[#1A1A1A]">The Weight of Quiet Things</h2>
      </div>
      <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A85]">01 / 08</p>
    </div>
    <figure className="w-80 shrink-0 snap-start">
      <div className="aspect-[4/5] bg-[#E8E6E1]" />
      <figcaption className="mt-5 pt-4 border-t border-[#E8E6E1]">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-2">No. 01</p>
        <p className="font-serif font-light text-[#1A1A1A]">Still Field</p>
        <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A85] mt-1.5">Oil on Linen, 2025</p>
      </figcaption>
    </figure>
    <figure className="w-[28rem] shrink-0 snap-start pr-6 md:pr-20">
      <div className="aspect-[3/2] bg-[#E8E6E1]" />
      <figcaption className="mt-5 pt-4 border-t border-[#E8E6E1]">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-2">No. 02</p>
        <p className="font-serif font-light text-[#1A1A1A]">Northern Wall</p>
        <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A85] mt-1.5">Gelatin Silver Print, 2026</p>
      </figcaption>
    </figure>
  </div>
</section>`,
    },
    footer: {
      name: "展馆页脚",
      description: "hairline 顶边页脚，开放时间与地址如同展签排布",
      code: `<footer className="bg-[#FCFCFA] border-t border-[#E8E6E1] px-6 md:px-20 py-16">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
    <div>
      <p className="font-serif font-light text-lg text-[#1A1A1A] mb-4">White Room</p>
      <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A85] leading-loose">14 Quiet Street<br />Copenhagen K</p>
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-4">Hours</p>
      <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A85] leading-loose">Tue - Sat, 11:00 - 18:00<br />Sunday by appointment</p>
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-[0.25em] text-[#A85A3A] mb-4">Contact</p>
      <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A85] leading-loose">mail@whiteroom.gallery<br />+45 33 12 00 00</p>
    </div>
  </div>
</footer>`,
    },
  },

  globalCss: `/* Horizontal Gallery Global Styles */

/* Signature horizontal strip: snap scroll with hidden scrollbar */
.hgallery-strip {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.hgallery-strip::-webkit-scrollbar {
  display: none;
}

.hgallery-item {
  flex-shrink: 0;
  scroll-snap-align: start;
}

.hgallery-item--center {
  scroll-snap-align: center;
}

/* Sticky title cell that walks along with the strip */
.hgallery-sticky-title {
  position: sticky;
  left: 0;
  z-index: 10;
  background: #FCFCFA;
}

/* Museum wall label caption */
.hgallery-caption {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #8A8A85;
}

.hgallery-index {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: #A85A3A;
}

/* Hairline rules */
.hgallery-hairline {
  border-color: #E8E6E1;
  border-width: 1px;
}

/* Hairline scroll progress track */
.hgallery-progress {
  position: relative;
  height: 1px;
  background: #E8E6E1;
}

.hgallery-progress-thumb {
  position: absolute;
  top: 0;
  left: 0;
  height: 1px;
  background: #1A1A1A;
  transition: width 0.2s ease-out;
}

/* Horizontal Gallery Design Tokens */
:root {
  --horizontal-gallery-wall: #FCFCFA;
  --horizontal-gallery-ink: #1A1A1A;
  --horizontal-gallery-ink-soft: #2E2E2C;
  --horizontal-gallery-muted: #8A8A85;
  --horizontal-gallery-hairline: #E8E6E1;
  --horizontal-gallery-terracotta: #A85A3A;
}

@keyframes horizontal-gallery-fade-in {
  from { opacity: 0; transform: translateX(16px); }
  to { opacity: 1; transform: translateX(0); }
}

.horizontal-gallery-animate-in {
  animation: horizontal-gallery-fade-in 0.6s ease-out both;
}`,

  aiRules: `You are a curator-minded frontend expert specializing in the Horizontal Gallery (white cube) layout. All generated code must strictly follow these constraints:

## Absolute Rules

- The core content area is a horizontal strip: overflow-x-auto snap-x snap-mandatory, items shrink-0 snap-start
- Artwork images: rounded-none, no border, no shadow, object-cover, aspect-[4/5] or aspect-[3/2]
- Every work carries an index (No. 01 / Fig. 01) in terracotta #A85A3A and a caption below the image: text-xs uppercase tracking-[0.2em] text-[#8A8A85]
- Background is gallery white #FCFCFA, text is ink #1A1A1A, all dividers are hairlines border-[#E8E6E1]
- Horizontal whitespace between works is generous: gap-16 md:gap-24, wall margins px-6 md:px-20
- Section titles use font-serif font-light tracking-wide; body text is sans
- Hide horizontal scrollbars (scrollbar-width: none; ::-webkit-scrollbar display: none) and show a hairline progress line or arrows instead
- A sticky title cell (sticky left-0 bg-[#FCFCFA]) may accompany the strip

## Forbidden

- Shadows, rounded corners, or borders on artwork images
- Text overlaid on artwork
- Vertical masonry or multi-row grids inside the strip
- Borders thicker than 1px anywhere
- Gradient, textured, or saturated multicolor backgrounds on the wall
- Any accent color other than restrained terracotta #A85A3A

## Layout Structure

Strip container:
- flex gap-16 md:gap-24 overflow-x-auto snap-x snap-mandatory
- hidden scrollbar, hairline progress underneath

Work cell:
- figure with w-72 to w-[28rem], shrink-0, snap-start
- image block aspect-[4/5] or aspect-[3/2] overflow-hidden
- figcaption: mt-5 pt-4 border-t border-[#E8E6E1], index then serif title then caption

## Responsive

- Mobile (< 768px): narrower cells (w-64), wall margins px-6, keep the strip horizontal
- Tablet (768px+): w-80 cells, px-12 margins
- Desktop (1024px+): mixed w-80 / w-[28rem] cells, px-20 margins, sticky title cell enabled
- Respect prefers-reduced-motion: disable smooth scrolling and scale transitions

## Self-Check

After generating code, verify:
1. The strip snaps horizontally and the scrollbar is hidden
2. No artwork image has a shadow, radius, or border
3. Every work shows an index and a hairline caption below the image
4. All lines on the page are 1px hairlines in #E8E6E1
5. The only accent color present is #A85A3A`,

  aiRulesEn: `You are a curator-minded frontend expert specializing in the Horizontal Gallery (white cube) layout. All generated code must strictly follow these constraints:

## Absolute Rules

- The core content area is a horizontal strip: overflow-x-auto snap-x snap-mandatory, items shrink-0 snap-start
- Artwork images: rounded-none, no border, no shadow, object-cover, aspect-[4/5] or aspect-[3/2]
- Every work carries an index (No. 01 / Fig. 01) in terracotta #A85A3A and a caption below the image: text-xs uppercase tracking-[0.2em] text-[#8A8A85]
- Background is gallery white #FCFCFA, text is ink #1A1A1A, all dividers are hairlines border-[#E8E6E1]
- Horizontal whitespace between works is generous: gap-16 md:gap-24, wall margins px-6 md:px-20
- Section titles use font-serif font-light tracking-wide; body text is sans
- Hide horizontal scrollbars (scrollbar-width: none; ::-webkit-scrollbar display: none) and show a hairline progress line or arrows instead
- A sticky title cell (sticky left-0 bg-[#FCFCFA]) may accompany the strip

## Forbidden

- Shadows, rounded corners, or borders on artwork images
- Text overlaid on artwork
- Vertical masonry or multi-row grids inside the strip
- Borders thicker than 1px anywhere
- Gradient, textured, or saturated multicolor backgrounds on the wall
- Any accent color other than restrained terracotta #A85A3A

## Layout Structure

Strip container:
- flex gap-16 md:gap-24 overflow-x-auto snap-x snap-mandatory
- hidden scrollbar, hairline progress underneath

Work cell:
- figure with w-72 to w-[28rem], shrink-0, snap-start
- image block aspect-[4/5] or aspect-[3/2] overflow-hidden
- figcaption: mt-5 pt-4 border-t border-[#E8E6E1], index then serif title then caption

## Responsive

- Mobile (< 768px): narrower cells (w-64), wall margins px-6, keep the strip horizontal
- Tablet (768px+): w-80 cells, px-12 margins
- Desktop (1024px+): mixed w-80 / w-[28rem] cells, px-20 margins, sticky title cell enabled
- Respect prefers-reduced-motion: disable smooth scrolling and scale transitions

## Self-Check

After generating code, verify:
1. The strip snaps horizontally and the scrollbar is hidden
2. No artwork image has a shadow, radius, or border
3. Every work shows an index and a hairline caption below the image
4. All lines on the page are 1px hairlines in #E8E6E1
5. The only accent color present is #A85A3A`,

  examplePrompts: [
    {
      title: "摄影师作品集",
      titleEn: "Photographer Portfolio",
      description: "白盒画廊式的横滚摄影作品集",
      descriptionEn: "White-cube horizontal scrolling photography portfolio",
      prompt: `Create a photographer portfolio in Horizontal Gallery style:
1. Gallery white #FCFCFA wall, ink #1A1A1A text, hairline dividers border-[#E8E6E1]
2. Hero with a font-serif font-light exhibition title and dates in uppercase tracked caption text
3. Core: a horizontal strip (flex gap-16 md:gap-24 overflow-x-auto snap-x snap-mandatory) of 8 photos
4. Each photo: shrink-0 snap-start, aspect-[4/5] or aspect-[3/2], rounded-none, no shadow, no border
5. Below each photo: No. 0X index in #A85A3A, serif title, then medium/year caption in text-xs uppercase tracking-[0.2em] text-[#8A8A85]
6. Sticky title cell (sticky left-0 bg-[#FCFCFA]) as the first strip item with a 01 / 08 counter
7. Hidden scrollbar plus a 1px progress line and prev/next arrows
8. Footer with gallery hours as wall-label typography`,
    },
    {
      title: "美术馆展览页",
      titleEn: "Museum Exhibition Page",
      description: "当期展览详情页，含策展陈述与作品目录",
      descriptionEn: "Current exhibition page with curatorial statement and catalogue",
      prompt: `Build a museum exhibition page in Horizontal Gallery style:
1. Hairline nav with serif gallery wordmark and uppercase tracked links
2. Exhibition hero: large font-serif font-light title, dates, and an On View badge with hairline border
3. Horizontal snap strip of artworks with No. 0X indices and museum wall-label captions below each image
4. Curatorial statement section: two columns, serif pull quote plus sans body in #8A8A85
5. Catalogue table with hairline row dividers: No., Title, Medium, Year, Status
6. RSVP form with underline inputs (bg-transparent border-b border-[#E8E6E1] rounded-none)
7. Only accent color: terracotta #A85A3A for indices and small highlights
No shadows, no rounded corners, no text over images anywhere`,
    },
    {
      title: "极简产品 Lookbook",
      titleEn: "Minimal Product Lookbook",
      description: "把产品当作展品的横滚 lookbook",
      descriptionEn: "A horizontal lookbook that treats products as exhibits",
      prompt: `Create a fashion lookbook in Horizontal Gallery style:
1. Treat each product photo as an exhibit: borderless, shadowless, rounded-none, aspect-[4/5]
2. Horizontal snap-mandatory strip with vast gap-16 md:gap-24 whitespace between looks
3. Under each look: Fig. 0X index in #A85A3A, serif product name, price in text-xs uppercase tracking-[0.2em] text-[#8A8A85]
4. Sticky season title (sticky left-0) accompanying the scroll
5. Hairline-only UI: 1px #E8E6E1 dividers, underline inputs, rounded-none uppercase tracked buttons
6. Gallery white #FCFCFA background throughout, no gradients or color blocks
7. Hidden scrollbars with a thin progress line and a 03 / 12 counter`,
    },
  ],

  variants: [
    {
      id: "horizontal-gallery-warm",
      name: "横滚画廊暖色版",
      nameEn: "Horizontal Gallery Warm",
      description: "Warm-toned variant with shifted hues toward amber/orange",
      colors: {
        primary: "#201A16",
        secondary: "#FCFAF6",
        accent: ["#B0562E", "#8F8578", "#EBE4D8", "#332C26"],
      },
    },
    {
      id: "horizontal-gallery-cool",
      name: "横滚画廊冷色版",
      nameEn: "Horizontal Gallery Cool",
      description: "Cool-toned variant with shifted hues toward blue/teal",
      colors: {
        primary: "#171A1C",
        secondary: "#FAFBFB",
        accent: ["#8A5A46", "#85888A", "#E2E4E4", "#2A2E30"],
      },
    },
  ],
};
