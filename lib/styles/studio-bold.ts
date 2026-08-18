import type { DesignStyle } from "./types";

export const studioBold: DesignStyle = {
  slug: "studio-bold",
  name: "创意工作室风",
  nameEn: "Creative Studio",
  description:
    "一种大胆、自信的作品集风格，适合设计工作室、创意机构与自由职业者。超大标题、色彩碰撞、丰富悬停态、客户徽标墙与团队网格——专业但不刻板，充满个性。",
  descriptionEn:
    "A bold, confident portfolio style for design studios, agencies, and freelancers. Oversized typography, bold color blocking, rich hover states, client logo walls, and team grids — professional but never corporate, with personality built in.",
  cover: "/styles/studio-bold.svg",
  styleType: "visual",
  tags: ["responsive", "high-contrast", "brand-inspired"],
  category: "modern",
  colors: {
    primary: "#1A1A1A",
    secondary: "#FFFFFF",
    accent: ["#FF6B6B", "#F5F5F0", "#333333", "#0D0D0D"],
  },
  keywords: ["工作室", "创意", "作品集", "代理", "品牌", "项目展示", "case study", "自由职业", "大胆", "现代"],
  keywordsEn: ["studio", "creative", "agency", "portfolio", "brand", "showcase", "case study", "freelancer", "bold", "modern"],

  philosophy: `创意工作室风是"设计师为自己做的网站"：把 agency 网站的所有表达欲都放出来，但用克制兜底。

核心理念：
- 大胆即态度：超大字号、全宽色块、满出血图片——不做平静的中性背景，每一屏都在说"这就是我们的品味"
- 悬挂式导航：nav 吸顶但不死贴，hover 时珊瑚色划线或块状标记，让导览本身变成界面表情
- 项目卡片即海报：每张 project card 都是一张小海报——标题占 30% 高度，悬停时上滑、放大、色偏移，告诉浏览者"点我会发生好事"
- 色彩块即分区：不用传统卡片框线，用珊瑚色或浅沙色色块来切功能区域，header 全黑、project 区浅沙、footer 更暗，视觉节奏由背景色驱动
- 证明即信任：客户徽标墙、团队头像网格、引用语块——在不会打断浏览流的节奏中植入社会证明

设计原则：
- 层级靠尺寸和重量，不靠颜色：标题可以大到 text-7xl，副标题用 text-xl font-normal，体量差就是层级差
- 悬停态必须值得等：transition-duration-300、scale-105、shadow-2xl、border 变色，四个同时发生才会让浏览者觉得"这个站点活着"
- 单色背景色块是版式骨架：深色区用 #1A1A1A + #0D0D0D 退到底层，浅色区用 #F5F5F0 做呼吸层，珊瑚色只出现在需要视线着陆的地方
- 留白是奢侈品：section 间距 py-24 起步，让每个色块有充分的呼吸感再换到下一个
- 字体只用无衬线：Inter 或同类，字重用 400-700-900 三个档，不做多层字重混搭`,

  philosophyEn: `Creative Studio is "the website designers make for themselves": all the expressive energy of an agency site, held together by editorial restraint.

Core principles:
- Boldness is attitude: oversized type, full-width color blocks, edge-to-edge imagery — no quiet neutral backgrounds, every viewport says "this is our taste"
- Navigation is hung: sticky nav with coral underline or block markers on hover, making navigation itself an interface expression
- Project cards are posters: every project card is a mini poster — the title takes 30% height, and on hover it slides up, scales, and shifts color, telling the visitor "clicking me leads somewhere good"
- Color blocks are sections: instead of card borders, use coral or warm-sand color blocks to partition functional areas — header is full black, projects are light sand, footer is darker — visual rhythm driven by background color
- Proof is trust: client logo walls, team avatar grids, testimonial pull quotes — social proof embedded in the browsing rhythm without interrupting flow

Design principles:
- Hierarchy comes from size and weight, not color: headings can go to text-7xl, subtitles stay text-xl font-normal — mass difference is hierarchy
- Hover states must be worth waiting for: transition-duration-300, scale-105, shadow-2xl, border color shift — four things happening at once makes visitors feel "this site is alive"
- Monochromatic color blocks are the layout skeleton: dark zones at #1A1A1A + #0D0D0D recede to background, light zones at #F5F5F0 breathe as midground, coral only where the eye needs to land
- Whitespace is a luxury: section spacing starts at py-24, giving each color block room to breathe before the next
- Sans-serif only: Inter or equivalent, weight range 400-700-900, no multi-weight mixing`,

  doList: [
    "深色背景区 bg-[#1A1A1A] 搭配 text-white，浅色区 bg-[#F5F5F0] 搭配 text-[#1A1A1A]",
    "超大 hero 标题 text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-white，其中部分文字用 text-[#FF6B6B] 高亮",
    "project card 使用 bg-[#F5F5F0] rounded-none overflow-hidden group，悬停时 group-hover:scale-[1.02] group-hover:shadow-2xl transition-all duration-300",
    "CTA 按钮使用 bg-[#FF6B6B] text-white font-bold px-8 py-4 text-lg hover:bg-[#E55A5A] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300",
    "客户徽标行：flex flex-wrap justify-center gap-12 py-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-300",
    "团队头像网格：flex -space-x-3，头像 rounded-full border-2 border-white shadow-md",
    "分割用有色块：两个 section 之间不依赖 border，而是 bg 切换——深色区起、浅色区落、再深色区收尾",
    "导航吸顶：fixed top-0 w-full z-50 bg-[#1A1A1A]/95 backdrop-blur-sm border-b border-white/10，hover 项用 text-[#FF6B6B]",
    "引用语块 testimonial：max-w-4xl mx-auto text-center italic text-2xl md:text-3xl leading-relaxed text-[#1A1A1A] px-12 py-16",
  ],

  doListEn: [
    "Dark sections use bg-[#1A1A1A] with text-white; light sections use bg-[#F5F5F0] with text-[#1A1A1A]",
    "Oversized hero headings: text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-white, with select words highlighted in text-[#FF6B6B]",
    "Project cards use bg-[#F5F5F0] rounded-none overflow-hidden group, with group-hover:scale-[1.02] group-hover:shadow-2xl transition-all duration-300",
    "CTA buttons use bg-[#FF6B6B] text-white font-bold px-8 py-4 text-lg hover:bg-[#E55A5A] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300",
    "Client logo rows: flex flex-wrap justify-center gap-12 py-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-300",
    "Team avatar grids: flex -space-x-3, with rounded-full border-2 border-white shadow-md on each avatar",
    "Section transitions use color blocks: dark background starts, light background takes over, dark background closes — no borders between sections",
    "Fixed navigation: fixed top-0 w-full z-50 bg-[#1A1A1A]/95 backdrop-blur-sm border-b border-white/10, with hover items in text-[#FF6B6B]",
    "Testimonial blocks: max-w-4xl mx-auto text-center italic text-2xl md:text-3xl leading-relaxed text-[#1A1A1A] px-12 py-16",
  ],

  dontList: [
    "禁止用小号或标准字号做 hero 标题（< text-5xl）：创意工作室的 hero 必须自带冲击力",
    "禁止圆角 rounded-lg 及以上（除非头像）：project card 应当直角干净，圆角会软化自信感",
    "禁止衬线字体：所有文本必须无衬线，正文用 font-light 或 font-normal，标题用 font-bold 或 font-black",
    "禁止细边框分割：section 切换靠 bg 色块而非 border，色块的切换本身就是分隔符",
    "禁止低调悬停：悬停必须在 scale / shadow / color 三个维度同时发生，淡出 opacity 不够",
    "禁止纯白色背景 bg-white：深色区用 #1A1A1A，浅色区用 #F5F5F0，白色只出现在文字上",
  ],

  dontListEn: [
    "Never use small or standard sizing for hero headings (below text-5xl): a creative studio hero must carry visual impact",
    "Never use rounded-lg or larger radii (except avatars): project cards should be clean and square; rounding softens confidence",
    "Never use serif fonts: all text must be sans-serif; body uses font-light or font-normal, headings use font-bold or font-black",
    "Never rely on thin borders for section separation: sections transition via bg color blocks, not borders — the color switch is the separator",
    "Never use subtle hover states: hover must shift in scale, shadow, and color simultaneously; fading opacity is insufficient",
    "Never use pure white bg-white: dark zones use #1A1A1A, light zones use #F5F5F0; white only appears on text",
  ],

  components: {
    button: {
      name: "大胆操作按钮",
      description: "珊瑚色实心按钮，粗体大字号，悬停时放大加阴影，像 agency 的 Contact 入口",
      code: `<button className="bg-[#FF6B6B] text-white font-bold px-8 py-4 text-lg hover:bg-[#E55A5A] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-none">Start a Project</button>`,
    },
    card: {
      name: "项目卡片",
      description: "直角项目海报卡：浅色底、大标题、标签行、悬停时放大+shadow+色彩偏移",
      code: `<div className="group bg-[#F5F5F0] overflow-hidden">
  <div className="relative">
    <div className="aspect-[16/10] bg-gradient-to-br from-[#333333] to-[#1A1A1A] group-hover:scale-[1.02] transition-all duration-300"></div>
    <div className="absolute top-4 left-4 flex gap-2">
      <span className="text-[11px] uppercase tracking-[0.12em] bg-white/90 text-[#1A1A1A] px-3 py-1 font-medium">Branding</span>
      <span className="text-[11px] uppercase tracking-[0.12em] bg-white/90 text-[#1A1A1A] px-3 py-1 font-medium">2024</span>
    </div>
  </div>
  <div className="p-8">
    <h3 className="text-2xl font-bold text-[#1A1A1A] group-hover:text-[#FF6B6B] transition-colors duration-300 mb-3">Project Title</h3>
    <p className="text-base text-[#333333] leading-relaxed font-light">A bold rebrand for a forward-thinking design studio. Strategy, identity, and digital execution.</p>
    <div className="flex items-center gap-2 mt-6">
      <span className="text-sm font-medium text-[#FF6B6B]">View Case Study</span>
      <span className="text-[#FF6B6B] group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
    </div>
  </div>
</div>`,
    },
    input: {
      name: "联系表单输入框",
      description: "深底反白输入框，聚焦时 coral 底线与光环",
      code: `<input type="text" placeholder="Your email address" className="w-full bg-[#333333] border-0 border-b-2 border-white/20 px-4 py-4 text-white text-base placeholder:text-white/40 focus:outline-none focus:border-[#FF6B6B] focus:ring-0 transition-colors duration-300" />`,
    },
    nav: {
      name: "悬挂式导航栏",
      description: "吸顶深色导航，hover 珊瑚色文字，半透明磨砂底",
      code: `<nav className="fixed top-0 w-full z-50 bg-[#1A1A1A]/95 backdrop-blur-sm border-b border-white/10 px-6 md:px-12">
  <div className="flex items-center justify-between h-16 md:h-20">
    <span className="text-xl font-bold tracking-tight text-white">Studio</span>
    <div className="flex items-center gap-8 text-sm text-white/70">
      <span className="hover:text-[#FF6B6B] transition-colors duration-200 cursor-pointer font-medium">Work</span>
      <span className="hover:text-[#FF6B6B] transition-colors duration-200 cursor-pointer font-medium">Services</span>
      <span className="hover:text-[#FF6B6B] transition-colors duration-200 cursor-pointer font-medium">About</span>
      <span className="bg-[#FF6B6B] text-white px-5 py-2 font-bold hover:bg-[#E55A5A] transition-colors duration-200 cursor-pointer">Contact</span>
    </div>
  </div>
</nav>`,
    },
    hero: {
      name: "工作室头部 Hero",
      description: "超大标题 + 可选高亮 + 描述与 CTA 的深色区，整个视口冲击力",
      code: `<section className="bg-[#1A1A1A] min-h-screen flex items-center px-6 md:px-16">
  <div className="max-w-6xl mx-auto w-full pt-20">
    <p className="text-sm md:text-base font-medium text-[#FF6B6B] uppercase tracking-[0.2em] mb-6">Est. 2020 — Design Studio</p>
    <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-white mb-8">
      We Make <span className="text-[#FF6B6B]">Things</span><br />That Matter
    </h1>
    <p className="max-w-2xl text-lg md:text-xl text-white/60 leading-relaxed font-light mb-10">
      A branding and digital design studio working with ambitious founders to build iconic brands and memorable experiences.
    </p>
    <div className="flex flex-wrap gap-4">
      <button className="bg-[#FF6B6B] text-white font-bold px-8 py-4 text-lg hover:bg-[#E55A5A] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 rounded-none">View Our Work</button>
      <button className="border-2 border-white/30 text-white font-bold px-8 py-4 text-lg hover:border-white hover:bg-white/10 transition-all duration-300 rounded-none">Get in Touch</button>
    </div>
  </div>
</section>`,
    },
    footer: {
      name: "工作室页脚",
      description: "深色页脚：三列信息 + 珊瑚色社交链接 + 极简版权行",
      code: `<footer className="bg-[#0D0D0D] border-t border-white/10 px-6 md:px-16 py-16 md:py-20">
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
      <div>
        <span className="text-xl font-bold text-white mb-4 block">Studio</span>
        <p className="text-white/40 text-sm leading-relaxed font-light">A design studio crafting bold identities and digital experiences for ambitious brands since 2020.</p>
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.16em] text-white/30 font-medium mb-4">Contact</p>
        <p className="text-white/70 text-sm mb-2">hello@studio.com</p>
        <p className="text-white/70 text-sm">+1 (555) 123-4567</p>
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-[0.16em] text-white/30 font-medium mb-4">Social</p>
        <div className="flex gap-4">
          <span className="text-white/50 hover:text-[#FF6B6B] transition-colors duration-200 text-sm cursor-pointer font-medium">Twitter</span>
          <span className="text-white/50 hover:text-[#FF6B6B] transition-colors duration-200 text-sm cursor-pointer font-medium">Instagram</span>
          <span className="text-white/50 hover:text-[#FF6B6B] transition-colors duration-200 text-sm cursor-pointer font-medium">LinkedIn</span>
        </div>
      </div>
    </div>
    <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-white/30 text-xs font-light">&copy; 2026 Studio. All rights reserved.</p>
      <div className="flex gap-6 text-xs text-white/30">
        <span className="hover:text-white/60 cursor-pointer transition-colors">Privacy</span>
        <span className="hover:text-white/60 cursor-pointer transition-colors">Terms</span>
      </div>
    </div>
  </div>
</footer>`,
    },
  },

  globalCss: `.studio-bold-section-dark {
  background-color: #1A1A1A;
  color: #FFFFFF;
}
.studio-bold-section-light {
  background-color: #F5F5F0;
  color: #1A1A1A;
}
.studio-bold-section-darker {
  background-color: #0D0D0D;
  color: #FFFFFF;
}
.studio-bold-hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-color: #1A1A1A;
  padding: 0 clamp(1.5rem, 5vw, 4rem);
}
.studio-bold-card {
  background-color: #F5F5F0;
  overflow: hidden;
  transition: all 300ms ease;
}
.studio-bold-card:hover {
  transform: scale(1.02);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
.studio-bold-card:hover .studio-bold-card-title {
  color: #FF6B6B;
}
.studio-bold-card-arrow {
  transition: transform 300ms ease;
}
.studio-bold-card:hover .studio-bold-card-arrow {
  transform: translateX(4px);
}
.studio-bold-btn-primary {
  background-color: #FF6B6B;
  color: #FFFFFF;
  font-weight: 700;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  border: none;
  cursor: pointer;
  transition: all 300ms ease;
}
.studio-bold-btn-primary:hover {
  background-color: #E55A5A;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}
.studio-bold-btn-outline {
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: #FFFFFF;
  font-weight: 700;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  background: transparent;
  cursor: pointer;
  transition: all 300ms ease;
}
.studio-bold-btn-outline:hover {
  border-color: #FFFFFF;
  background-color: rgba(255, 255, 255, 0.1);
}
.studio-bold-clients {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  padding: 3rem 0;
  opacity: 0.6;
  filter: grayscale(1);
  transition: all 300ms ease;
}
.studio-bold-clients:hover {
  opacity: 1;
  filter: grayscale(0);
}
.studio-bold-testimonial {
  max-width: 56rem;
  margin: 0 auto;
  text-align: center;
  font-style: italic;
  font-size: 1.5rem;
  line-height: 1.6;
  color: #1A1A1A;
  padding: 4rem 3rem;
}
@media (min-width: 768px) {
  .studio-bold-testimonial {
    font-size: 1.875rem;
  }
}
.studio-bold-team-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  border: 2px solid #FFFFFF;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}
.studio-bold-nav-link {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  transition: color 200ms ease;
  cursor: pointer;
}
.studio-bold-nav-link:hover {
  color: #FF6B6B;
}`,

  aiRules: `You are a Creative Studio (创意工作室风) design expert. This is a bold, confident portfolio style for design studios, agencies, and freelancers — inspired by Pentagram, IDEO, and top-tier agency sites.

## Absolute Rules
- Background: dark #1A1A1A for hero and footer; warm sand #F5F5F0 for content sections; deep #0D0D0D for footer bottom
- Body text: font-sans, font-light or font-normal, color inherits from section bg
- Headings: font-bold or font-black, sizes start at text-5xl and go up
- Coral #FF6B6B: the sole accent color — for headline highlights, CTAs, hover indicators, active nav items
- All sections are color blocks: switch bg color instead of using borders for separation
- Project cards: bg-[#F5F5F0] rounded-none, hover: scale-[1.02] + shadow-2xl + title shifts to coral
- CTA buttons: bg-[#FF6B6B] text-white font-bold, hover: bg-[#E55A5A] + shadow-xl + -translate-y-0.5
- Navigation: fixed top-0 w-full z-50 bg-[#1A1A1A]/95 backdrop-blur-sm, hover items turn coral
- Radius: rounded-none for cards and buttons; rounded-full only for avatars
- Shadows: cards use no shadow default, shadow-2xl on hover; buttons use shadow-xl on hover

## Forbidden
- Serif fonts of any kind (font-serif)
- Pure white backgrounds (bg-white) — white is text-only
- Subtle or single-axis hover states — hover must shift scale, shadow, and color simultaneously
- Thin borders for section separation — sections transition via bg color blocks
- Rounded-lg or larger on containers (cards, buttons, sections)
- Undersized hero headings (anything below text-5xl)
- Quiet/default shadows (shadow-sm, shadow-md) on hoverable elements

## Layout & Spacing
- Hero: min-h-screen, large heading, one-line description, dual CTAs
- Section rhythm: py-20 md:py-28 between color-block sections
- Project grid: 2-3 column grid with gap-8 md:gap-12
- Client logos: flex wrap centered, grayscale with hover:grayscale-0
- Team avatars: overlapping flex -space-x-3 with white borders
- Testimonials: centered italic block with generous padding

## Color Block Patterns
- Hero / Nav / Footer: bg-[#1A1A1A] or bg-[#0D0D0D], white text
- Work / Process / Team sections: bg-[#F5F5F0], dark text
- CTA band: could be either — use coral button to anchor the band

## Responsive
- Mobile: single-column project grid, nav collapses to hamburger with coral icon
- Tablet: 2-column grid, nav links visible
- Desktop: 3-column grid, full nav with CTA button

## Self-Check Verification
After generating code, verify:
1. No bg-white anywhere on structural elements
2. Every hoverable card has scale + shadow + color transitions
3. Coral (#FF6B6B) is the only accent color in use
4. No rounded corners on cards, buttons, or sections
5. Section transitions go dark → light → dark (or a subsection thereof)
6. All interactive elements have visible hover and focus states
7. Hero heading is at least text-5xl`,

  aiRulesEn: `You are a Creative Studio design expert. This is a bold, confident portfolio style for design studios, agencies, and freelancers — inspired by Pentagram, IDEO, and top-tier agency sites.

## Absolute Rules
- Background: dark #1A1A1A for hero and footer; warm sand #F5F5F0 for content sections; deep #0D0D0D for footer bottom
- Body text: font-sans, font-light or font-normal, color inherits from section bg
- Headings: font-bold or font-black, sizes start at text-5xl and go up
- Coral #FF6B6B: the sole accent color — for headline highlights, CTAs, hover indicators, active nav items
- All sections are color blocks: switch bg color instead of using borders for separation
- Project cards: bg-[#F5F5F0] rounded-none, hover: scale-[1.02] + shadow-2xl + title shifts to coral
- CTA buttons: bg-[#FF6B6B] text-white font-bold, hover: bg-[#E55A5A] + shadow-xl + -translate-y-0.5
- Navigation: fixed top-0 w-full z-50 bg-[#1A1A1A]/95 backdrop-blur-sm, hover items turn coral
- Radius: rounded-none for cards and buttons; rounded-full only for avatars
- Shadows: cards use no shadow default, shadow-2xl on hover; buttons use shadow-xl on hover

## Forbidden
- Serif fonts of any kind (font-serif)
- Pure white backgrounds (bg-white) — white is text-only
- Subtle or single-axis hover states — hover must shift scale, shadow, and color simultaneously
- Thin borders for section separation — sections transition via bg color blocks
- Rounded-lg or larger on containers (cards, buttons, sections)
- Undersized hero headings (anything below text-5xl)
- Quiet/default shadows (shadow-sm, shadow-md) on hoverable elements

## Layout & Spacing
- Hero: min-h-screen, large heading, one-line description, dual CTAs
- Section rhythm: py-20 md:py-28 between color-block sections
- Project grid: 2-3 column grid with gap-8 md:gap-12
- Client logos: flex wrap centered, grayscale with hover:grayscale-0
- Team avatars: overlapping flex -space-x-3 with white borders
- Testimonials: centered italic block with generous padding

## Color Block Patterns
- Hero / Nav / Footer: bg-[#1A1A1A] or bg-[#0D0D0D], white text
- Work / Process / Team sections: bg-[#F5F5F0], dark text
- CTA band: could be either — use coral button to anchor the band

## Responsive
- Mobile: single-column project grid, nav collapses to hamburger with coral icon
- Tablet: 2-column grid, nav links visible
- Desktop: 3-column grid, full nav with CTA button

## Self-Check Verification
After generating code, verify:
1. No bg-white anywhere on structural elements
2. Every hoverable card has scale + shadow + color transitions
3. Coral (#FF6B6B) is the only accent color in use
4. No rounded corners on cards, buttons, or sections
5. Section transitions go dark → light → dark (or a subsection thereof)
6. All interactive elements have visible hover and focus states
7. Hero heading is at least text-5xl`,

  examplePrompts: [
    {
      title: "创意工作室品牌首页",
      titleEn: "Creative Studio Homepage",
      description: "含超大 hero、项目网格、过程展示、客户徽标、团队和联系表单的完整首页",
      descriptionEn: "A full homepage with oversized hero, project grid, process section, client logos, team avatars, and contact form",
      prompt:
        "Build a creative studio homepage in Studio Bold style: a fixed dark nav (bg-[#1A1A1A]/95 backdrop-blur-sm) with coral hover, a full-viewport hero (bg-[#1A1A1A]) with an oversized heading text-7xl md:text-8xl where select words are highlighted in coral text-[#FF6B6B], a subtitle in white/60, a coral CTA button and an outline button. Then a project grid section (bg-[#F5F5F0]) with 6 project cards in a 3-column grid, each card being a rounded-none group with a dark placeholder image area, tag badges, a bold title that turns coral on hover, description, and a 'View Case Study' link with arrow. Then a process/timeline section, a client logo wall (grayscale hover:grayscale-0), a team grid with overlapping avatar circles, a testimonial pull quote, and a dark footer (bg-[#0D0D0D]) with three-column info and social links.",
    },
    {
      title: "项目 / Case Study 详情页",
      titleEn: "Project / Case Study Detail Page",
      description: "全出血图片、大号章节标题、结果数据与下一项目导航",
      descriptionEn: "Full-bleed imagery, large section headings, results data, and next-project navigation",
      prompt:
        "Design a case study detail page in Studio Bold style: a full-bleed hero image at the top, a dark overlay section with the project title text-5xl md:text-6xl font-bold text-white, a tag row (client, discipline, year) in white/50, then a sequence of alternating light (bg-[#F5F5F0]) and dark (bg-[#1A1A1A]) content sections. Include a full-width image break, a stat callout row (3 large numbers with labels), a client testimonial in italic centered format, and a next-project navigation at the bottom (large title with arrow, dark bg, linking to the next case study).",
    },
    {
      title: "关于页 / 团队页",
      titleEn: "About / Team Page",
      description: "工作室故事、核心人物网格、文化理念与招聘 CTA",
      descriptionEn: "Studio story, core team grid, culture values, and hiring CTA",
      prompt:
        "Create an About page in Studio Bold style: start with a dark section (bg-[#1A1A1A]) featuring the studio name in oversized text and a short manifesto paragraph in white/60. Then a light section (bg-[#F5F5F0]) with a 3-column team grid — each member card is rounded-none, shows a portrait, name in bold, role, and social links that turn coral on hover. Follow with a culture values section using numbered cards with coral accents, a client logo wall, and a hiring CTA band (bg-[#FF6B6B]) with white text and an outline button. Close with the standard dark footer.",
    },
  ],
};
