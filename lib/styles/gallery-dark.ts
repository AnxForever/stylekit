import type { DesignStyle } from "./types";

export const galleryDark: DesignStyle = {
  slug: "gallery-dark",
  name: "暗色画廊风",
  nameEn: "Dark Gallery",
  description:
    "暗色调摄影画廊作品集风格：近黑背景让全出血图片成为绝对主角，温琥珀色点缀无信息，超轻极简排版安静退后。适合摄影师、电影人、视觉艺术家的作品展示。",
  descriptionEn:
    "A dark photography gallery portfolio: near-black canvases let full-bleed images command absolute attention; warm amber accents highlight metadata and captions while ultra-light typography retreats into the background. For photographers, filmmakers, and visual artists whose work speaks louder than chrome.",
  cover: "/styles/gallery-dark.svg",
  styleType: "visual",
  tags: ["dark-theme", "responsive"],
  category: "minimal",
  colors: {
    primary: "#0A0A0A",
    secondary: "#FFFFFF",
    accent: ["#C4956A", "#FFFFFF", "#2A2A2A", "#1A1A1A"],
  },
  keywords: [
    "摄影",
    "画廊",
    "暗色",
    "作品集",
    "全出血",
    "大图",
    "极简",
    "视觉艺术家",
    "电影",
    "展览",
  ],
  keywordsEn: [
    "photography",
    "gallery",
    "dark",
    "portfolio",
    "full-bleed",
    "cinematic",
    "minimal",
    "visual artist",
    "filmmaker",
    "exhibition",
  ],

  philosophy: `暗色画廊风是"减法即策展"的设计实践——拿掉一切与作品争抢注意力的元素，只留下承载观看的框架。

核心理念：
- 暗场即画框：#0A0A0A 近黑背景不是"深色模式"，而是实体画廊的暗场空间——让每一张照片从黑暗中浮现，像展厅里被聚光灯照亮的作品
- 全出血即尊重：图片撑满容器边缘，不设 padding、不加阴影、不设边框——让图像自身成为边界，让细节无所遁形
- 琥珀色即现场感：#C4956A 温琥珀色只用于日期、标签、图注与展签——就像暗室里那盏小暖灯，只照亮信息的轮廓，不照亮信息本身
- 克制即信任：超轻字重（font-light）、hairline 细线分隔、大间距、大字号字距（tracking-wider）——设计越退让，观看越专注
- 无衬线即当代：正文必须无衬线（font-sans），杜绝一切装饰性字体与华丽字形——像画廊导览册一样安静、精准、不打扰

设计原则：
- 色彩即氛围：#0A0A0A 底色创造沉浸暗场，#1A1A1A 用于卡片与容器的微妙分层，#2A2A2A 用于分隔线与边框的分界——视觉层次靠灰度堆叠完成，不靠色相变化
- 排版即呼吸：标题用超大字号、极轻字重、紧密行距制造视觉冲击；元信息用超小号、大写、大字号字距保持克制——两种节奏互为观照
- 图片即叙事：传统"标题在上、正文在下"的卡片布局在此消解——图片本身就是标题。caption 仅补充上下文：时间、地点、媒介、尺寸
- 网格即节奏：等宽网格排列作品缩略图，行与行之间预留呼吸感；hover 仅做微弱的亮度变化——让观看者自主选择目光的落点
- 转场即沉浸：页面切换与 lightbox 打开应当平滑、不抢戏——至少 300ms ease-out，像电影 fade 一样自然

这就是暗色画廊风：不是"深色版极简"，而是"实体画廊体验的数字化"——把展厅的仪式感、暗场的沉浸感、展签的克制感，忠实翻译成像素。`,

  philosophyEn: `Dark Gallery is "subtraction as curation": strip away everything that competes with the work, leaving only the frame that holds the viewing experience.

Core principles:
- The dark is the frame: #0A0A0A is not a "dark mode" background — it is the dimmed gallery room where each photograph emerges from shadow, spotlit by its own light
- Full-bleed is respect: images stretch to the edge without padding, shadow, or border — the image becomes its own boundary, detail has nowhere to hide
- Amber is presence: #C4956A warm amber is reserved for dates, tags, captions, and wayfinding — like the tiny reading light on a gallery wall label, it illuminates only what matters
- Restraint is trust: ultra-light font weights, hairline separators, generous whitespace, wide tracking — the more the design retreats, the deeper the viewing goes
- Sans-serif is now: body text is always sans-serif (Inter/font-sans), rejecting decorative typography entirely — as quiet and precise as a gallery brochure

Design principles:
- Color is atmosphere: #0A0A0A creates the immersive dark field; #1A1A1A layers for cards and containers; #2A2A2A defines borders and dividers — hierarchy is built entirely through gray-scale depth, not hue
- Typography is breathing: oversized headlines in ultra-light weight deliver visual impact; metadata in tiny caps with wide tracking provides context — two rhythms in dialogue
- The image is the headline: the traditional card layout with "title above, text below" dissolves — the image becomes the title. Captions only supplement: time, place, medium, dimensions
- Grid is rhythm: equal-width columns arrange thumbnails at a breathable distance; hover brings only a subtle brightness shift — letting the viewer choose their own focus
- Transition is immersion: page changes and lightbox opens should be smooth and unobtrusive — at least 300ms ease-out, like a film fade

This is Dark Gallery: not a "dark mode minimal" but a "gallery experience digitized" — translating the ceremony of the exhibition space, the immersion of the dark room, and the restraint of the wall label into pixels.`,

  doList: [
    "全出血图片：在容器上用 overflow-hidden、图片上用 object-cover w-full h-full，容器 padding-0",
    "背景使用 bg-[#0A0A0A]，卡片与侧面板使用 bg-[#1A1A1A]，分隔线使用 border-[#2A2A2A]",
    "元信息（日期、标签、地点、展签）使用 text-[#C4956A] text-[10px] uppercase tracking-[0.15em] font-light",
    "正文使用 font-sans font-light text-white，大标题使用 text-4xl md:text-6xl lg:text-7xl font-light tracking-tight",
    "卡片使用 border border-[#2A2A2A] rounded-sm，不加阴影不设投影",
    "作品缩略图网格使用 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6，hover:opacity-90 微亮度变化",
    "页面导航使用 px-6 md:px-8 py-4 md:py-5 border-b border-[#2A2A2A]，链接使用 text-[11px] uppercase tracking-[0.15em] font-light",
    "输入框使用 bg-[#0A0A0A] border-[#2A2A2A] focus:border-[#C4956A] focus:ring-1 focus:ring-[#C4956A]/30 rounded-sm",
  ],

  doListEn: [
    "Full-bleed images: use overflow-hidden on the container, object-cover w-full h-full on the image, padding-0 on the container",
    "Background uses bg-[#0A0A0A]; elevated surfaces use bg-[#1A1A1A]; dividers and borders use border-[#2A2A2A]",
    "Metadata (dates, tags, locations, wall labels) in text-[#C4956A] text-[10px] uppercase tracking-[0.15em] font-light",
    "Body text uses font-sans font-light text-white; headlines use text-4xl md:text-6xl lg:text-7xl font-light tracking-tight",
    "Cards use border border-[#2A2A2A] rounded-sm with no shadows or elevation",
    "Thumbnail grids use grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 with hover:opacity-90 for a subtle brightness shift",
    "Navigation uses px-6 md:px-8 py-4 md:py-5 border-b border-[#2A2A2A] with links in text-[11px] uppercase tracking-[0.15em] font-light",
    "Inputs use bg-[#0A0A0A] border-[#2A2A2A] focus:border-[#C4956A] focus:ring-1 focus:ring-[#C4956A]/30 rounded-sm",
  ],

  dontList: [
    "禁止使用彩色阴影（shadow-lg shadow-2xl）与渐变背景（bg-gradient-*）——破坏暗场纯净度",
    "禁止大圆角：最多 rounded-sm，图片容器使用 rounded-none 直角",
    "禁止亮色背景（bg-white bg-gray-50 bg-gray-100）——打破暗场沉浸感",
    "禁止彩色或明亮的分隔线：所有分隔线使用 border-[#2A2A2A] hairline 极细",
    "禁止衬线字体（font-serif）与粗重字重（font-bold font-semibold）——保持当代无衬线与轻量化",
    "禁止在图片周围添加 padding 或边框——图片必须全出血",
  ],

  dontListEn: [
    "Never use colored shadows (shadow-lg shadow-2xl) or gradient backgrounds (bg-gradient-*) — they break the purity of the dark field",
    "Never use large border radii: rounded-sm at most; image containers must be rounded-none (square corners)",
    "Never use light backgrounds (bg-white, bg-gray-50, bg-gray-100) — they puncture the immersive dark atmosphere",
    "Never use colored or bright dividers: all separators use border-[#2A2A2A] hairline only",
    "Never use serif fonts (font-serif) or heavy font weights (font-bold, font-semibold) — keep it contemporary sans-serif and lightweight",
    "Never add padding or border around images — full-bleed is mandatory",
  ],

  components: {
    button: {
      name: "画廊操作按钮",
      description: "暗面按钮，hairline 边框，hover 时边框变为琥珀色，极轻字重与大字号字距",
      code: `<button className="px-5 py-2.5 bg-[#1A1A1A] text-white text-sm font-light tracking-wider border border-[#2A2A2A] rounded-sm hover:border-[#C4956A] hover:bg-[#2A2A2A] transition-all duration-300">Exhibition Info</button>`,
    },
    card: {
      name: "展览卡片",
      description: "暗色展品卡：hairline 边框、全出血图片位、琥珀色日期与展签元信息",
      code: `<div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-sm overflow-hidden">
  <div className="aspect-[4/3] bg-[#1A1A1A] flex items-center justify-center text-[#3A3A3A] text-xs font-light tracking-wider">[ Full-Bleed Image ]</div>
  <div className="p-4">
    <span className="text-[#C4956A] text-[10px] uppercase tracking-[0.15em] font-light">Tokyo, 2026</span>
    <h3 className="text-white text-sm font-light tracking-wide mt-1">Between Shadows</h3>
    <p className="text-[#4A4A4A] text-xs font-light mt-1">Archival pigment print, 80 x 120 cm</p>
  </div>
</div>`,
    },
    input: {
      name: "展品检索框",
      description: "暗底搜索输入框，hairline 边框，聚焦时琥珀色细环",
      code: `<input type="text" placeholder="Search exhibitions..." className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#2A2A2A] rounded-sm text-white text-sm font-light placeholder:text-[#4A4A4A] focus:outline-none focus:border-[#C4956A] focus:ring-1 focus:ring-[#C4956A]/30 transition-all duration-300" />`,
    },
    nav: {
      name: "画廊刊头",
      description: "masthead 式顶栏：暗底 + hairline 下边线 + 大写极细导航链接",
      code: `<nav className="flex items-center justify-between px-8 py-5 bg-[#0A0A0A] border-b border-[#2A2A2A]">
  <span className="text-white text-sm font-light tracking-[0.2em] uppercase">GALLERY</span>
  <div className="flex items-center gap-8 text-[11px] text-[#666666] uppercase tracking-[0.15em] font-light">
    <a href="#" className="hover:text-white transition-colors duration-300">Exhibitions</a>
    <a href="#" className="hover:text-white transition-colors duration-300">Artists</a>
    <a href="#" className="hover:text-white transition-colors duration-300">Visit</a>
  </div>
</nav>`,
    },
    hero: {
      name: "展览头部",
      description: "全出血图片 hero 区：暗色遮罩、底对齐标题、琥珀色标签与灰色正文",
      code: `<section className="relative bg-[#0A0A0A] min-h-[80vh] flex items-end overflow-hidden">
  <div className="absolute inset-0 bg-[#0A0A0A]/50" />
  <div className="relative z-10 px-8 pb-16 max-w-3xl">
    <p className="text-[#C4956A] text-[11px] uppercase tracking-[0.2em] mb-3 font-light">Featured Exhibition</p>
    <h1 className="text-white text-5xl md:text-7xl font-light leading-tight tracking-tight mb-4">The Space Between</h1>
    <p className="text-[#666666] text-sm font-light max-w-xl">A survey of contemporary Japanese photography, exploring the tension between presence and absence.</p>
  </div>
</section>`,
    },
    footer: {
      name: "画廊页脚",
      description: "暗底页脚，hairline 上边线，琥珀色标签标识信息组，灰色内容正文",
      code: `<footer className="bg-[#0A0A0A] border-t border-[#2A2A2A] px-8 py-12">
  <div className="max-w-6xl mx-auto">
    <div className="flex flex-wrap justify-between gap-8 text-xs font-light">
      <div>
        <p className="text-[#C4956A] text-[10px] uppercase tracking-[0.15em] mb-2">Location</p>
        <p className="text-[#666666]">47 Berwick Street<br />London, W1F 8SQ</p>
      </div>
      <div>
        <p className="text-[#C4956A] text-[10px] uppercase tracking-[0.15em] mb-2">Hours</p>
        <p className="text-[#666666]">Tue-Sat 11:00 - 19:00<br />Sun 12:00 - 17:00</p>
      </div>
      <div>
        <p className="text-[#C4956A] text-[10px] uppercase tracking-[0.15em] mb-2">Contact</p>
        <p className="text-[#666666]">info@gallery.com<br />+44 20 7946 0958</p>
      </div>
    </div>
    <p className="mt-8 pt-4 border-t border-[#2A2A2A] text-[10px] text-[#4A4A4A] tracking-[0.1em] font-light">&copy; 2026 Gallery. All rights reserved.</p>
  </div>
</footer>`,
    },
  },

  globalCss: `.gallery-dark-card {
  background: #0A0A0A;
  border: 1px solid #2A2A2A;
  border-radius: 0.125rem;
  overflow: hidden;
  transition: all 300ms ease-out;
}
.gallery-dark-card:hover {
  border-color: #4A4A4A;
}
.gallery-dark-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.gallery-dark-image-container {
  overflow: hidden;
  position: relative;
  background: #1A1A1A;
}
.gallery-dark-image-container:hover .gallery-dark-image {
  opacity: 0.9;
  transition: opacity 300ms ease-out;
}
.gallery-dark-caption {
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 300;
  line-height: 1.6;
  color: #666666;
  letter-spacing: 0.05em;
}
.gallery-dark-meta {
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 300;
  color: #C4956A;
}
.gallery-dark-hairline {
  border: none;
  border-top: 1px solid #2A2A2A;
}
.gallery-dark-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
@media (min-width: 768px) {
  .gallery-dark-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
}
.gallery-dark-hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 10, 0.5);
}
.gallery-dark-body {
  background: #0A0A0A;
  color: #FFFFFF;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-weight: 300;
}
.gallery-dark-section {
  padding: 4rem 0;
}
@media (min-width: 768px) {
  .gallery-dark-section {
    padding: 6rem 0;
  }
}
.gallery-dark-lightbox {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.95);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 300ms ease-out;
  pointer-events: none;
}
.gallery-dark-lightbox.open {
  opacity: 1;
  pointer-events: auto;
}
.gallery-dark-lightbox img {
  max-height: 90vh;
  max-width: 90vw;
  object-fit: contain;
}`,

  aiRules: `你是一位暗色画廊风（Dark Gallery）设计专家。这种风格将高端实体画廊的体验数字化：暗场沉浸感、全出血图片优先、温琥珀色信息层、超轻极简排版。

## 绝对规则
- 背景：主色 bg-[#0A0A0A]；次级容器 bg-[#1A1A1A]；可交互元素 bg-[#2A2A2A] / border-[#2A2A2A]
- 正文：font-sans font-light，颜色 text-white
- 标题：font-light tracking-tight text-white，超大字重（text-4xl ~ text-7xl）
- 温琥珀色 #C4956A 只用于日期、标签、图注、展签等元信息——绝对不用于正文段落与主标题
- 图片：object-cover w-full h-full 全出血，容器 overflow-hidden padding-0 无边框
- 层级靠灰度堆叠（#0A0A0A → #1A1A1A → #2A2A2A）与留白完成，不使用色相变化区分区域
- 分隔线一律使用 border-[#2A2A2A] hairline 极细线（1px）
- 圆角：卡片最多 rounded-sm（2px），图片容器 rounded-none
- 英文字距：标题 tracking-tight，元信息 tracking-[0.15em]，导航 tracking-[0.2em]
- 转场：transition-all duration-300，缓动 ease-out

## 禁止
- 渐变 bg-gradient-*
- 投影 shadow-sm 及以上（暗底上阴影不可见）
- 圆角超过 rounded-sm，图片容器必须直角
- 亮色背景（bg-white / bg-gray-50）
- 衬线字体（font-serif）与粗重字重（font-bold / font-semibold）
- 图片容器有 padding 或 border 边框
- 彩色或亮色分隔线

## 布局与间距
- 页面壳层：bg-[#0A0A0A]
- 作品缩略图网格：grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6
- 索引卡片内边距：p-4（或 p-0 全出血布局）
- 区块节奏：py-16 md:py-24
- 容器 padding：px-6 md:px-8 lg:px-12

## 响应式
- 移动端：网格改为单列或双列，保持全出血，导航折叠为汉堡菜单
- 桌面端（md+）：三列网格，hover 有微亮度变化（hover:opacity-90），lightbox 转场

## 自检清单
生成代码后验证：
1. 背景色不是白色或浅灰——必须是 #0A0A0A 系列
2. 所有图片都是全出血（无 padding、无 border）
3. 温琥珀色只出现在元信息上，不在正文或标题中
4. 字体使用 font-sans font-light，没有 font-serif 或 font-bold
5. 没有渐变、没有投影、没有大圆角
6. 分隔线颜色是 #2A2A2A，不是亮灰或彩色`,

  aiRulesEn: `You are a Dark Gallery design expert. This style digitizes the high-end physical gallery experience: immersive dark field, full-bleed image priority, warm amber information layer, ultra-light minimal typography.

## Absolute Rules
- Background: primary bg-[#0A0A0A]; secondary bg-[#1A1A1A]; interactive bg-[#2A2A2A] / border-[#2A2A2A]
- Body: font-sans font-light, text-white
- Headings: font-light tracking-tight text-white in oversized weights (text-4xl through text-7xl)
- Warm amber #C4956A only for dates, tags, captions, wall labels — never for body paragraphs or main headings
- Images: object-cover w-full h-full full-bleed; containers: overflow-hidden padding-0 border-0
- Hierarchy through gray-scale stacking (#0A0A0A → #1A1A1A → #2A2A2A) and whitespace, never through hue
- All dividers: border-[#2A2A2A] hairline (1px)
- Radii: cards rounded-sm at most (2px); image containers rounded-none
- Tracking: headings tracking-tight, metadata tracking-[0.15em], navigation tracking-[0.2em]
- Transitions: transition-all duration-300 ease-out

## Forbidden
- Gradients bg-gradient-*
- Shadows of any kind (invisible on dark surfaces)
- Radii beyond rounded-sm; image containers must be square
- Light backgrounds (bg-white, bg-gray-50)
- Serif fonts (font-serif) or heavy weights (font-bold, font-semibold)
- Padding or border around images
- Colored or bright dividers

## Layout & Spacing
- Page shell: bg-[#0A0A0A]
- Thumbnail grid: grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6
- Card padding: p-4 (or p-0 for full-bleed image cards)
- Section rhythm: py-16 md:py-24
- Container padding: px-6 md:px-8 lg:px-12

## Self-Check
1. Background is not white or light gray — must be #0A0A0A series
2. All images are full-bleed (no padding, no border)
3. Warm amber only on metadata, not on body or headings
4. Font is font-sans font-light; no font-serif or font-bold
5. No gradients, no shadows, no large radii
6. Divider color is #2A2A2A, not light gray or colored`,

  examplePrompts: [
    {
      title: "摄影作品集主页",
      titleEn: "Photography Portfolio Home",
      description: "全出血图片网格、展览头部 hero、温琥珀色元信息的完整摄影作品集首页",
      descriptionEn: "A full photography portfolio homepage with a full-bleed hero, thumbnail grid, and warm amber metadata",
      prompt:
        "Build a photography portfolio homepage in Dark Gallery style: a full-screen hero section with a large headline 'The Space Between' and a warm amber 'Featured Exhibition' label above it, a grid of full-bleed thumbnail cards (grid-cols-2 md:grid-cols-3) where each card shows a placeholder image with amber date/location metadata and a light caption below, a minimal gallery masthead nav with uppercase tracked navigation links, and a dark footer with amber-labeled contact info and opening hours. Use bg-[#0A0A0A] throughout, hairline borders, font-light sans-serif typography, and no shadows or gradients.",
    },
    {
      title: "展览专题页",
      titleEn: "Exhibition Feature Page",
      description: "单场展览详情页，含策展陈述、作品列表与参观信息",
      descriptionEn: "A single exhibition detail page with curatorial statement, artwork listing, and visitor information",
      prompt:
        "Design an exhibition feature page in Dark Gallery style: a large full-bleed hero image representing the exhibition, the exhibition title in oversized font-light text, a curatorial statement paragraph in text-[#666666] font-light, a horizontal scrollable row of full-bleed artwork thumbnails each with amber metadata (title, year, medium, dimensions), a visitor info section with amber-labeled fields (Location, Hours, Admission) in the dark footer, and a gallery masthead with a back link. Use rounded-sm on cards only, rounded-none on images, border-[#2A2A2A] hairlines throughout.",
    },
    {
      title: "艺术家简介页",
      titleEn: "Artist Profile Page",
      description: "艺术家详情页面：肖像、简历、作品节选与展览履历",
      descriptionEn: "An artist profile with portrait, biography, selected works, and exhibition history",
      prompt:
        "Create an artist profile page in Dark Gallery style: a hero section with a large portrait image on the left and the artist name in oversized font-light text, a nationality and birth year in amber meta text, a biography paragraph in text-[#666666] font-light, a 'Selected Works' section with a grid of full-bleed thumbnail cards each having amber metadata (title, year, medium), an 'Exhibitions' timeline where each entry has an amber year label and gray venue text, separated by border-[#2A2A2A] hairlines, and a dark footer. No shadows, no gradients, no light backgrounds.",
    },
  ],
};
