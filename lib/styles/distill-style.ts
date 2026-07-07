import type { DesignStyle } from "./types";

export const distillStyle: DesignStyle = {
  slug: "distill-style",
  name: "学术科普风",
  nameEn: "Distill Style",
  description:
    "以 Distill.pub 为原型的学术科普设计语言：窄列 serif 正文承载论证，边注承载旁白，图表突破版心承载证据。适合科普博客、研究者主页与学术型作品集。",
  descriptionEn:
    "An academic explainer aesthetic modeled on Distill.pub: a narrow serif column carries the argument, sidenotes carry the asides, and figures break the measure to carry the evidence. Built for science blogs, researcher homepages, and scholarly portfolios.",
  cover: "/styles/distill-style.svg",
  styleType: "visual",
  tags: ["minimal", "modern", "brand-inspired"],
  category: "minimal",
  colors: {
    primary: "#1F2933",
    secondary: "#FFFFFF",
    accent: ["#2A7AE2", "#E4572E", "#6B7280", "#F3F4F6"],
  },
  keywords: ["学术", "科普", "论文排版", "边注", "引用", "图表", "衬线正文", "研究者主页", "Distill", "serif", "academic", "期刊"],
  keywordsEn: ["academic", "scholarly", "explainer", "scientific publishing", "sidenote", "citation", "figure", "serif typography", "researcher homepage", "Distill.pub", "journal", "paper"],

  philosophy: `学术科普风是"论文排版的网页化"：把期刊三百年攒下的排版严谨，翻译成网页原生的呼吸感。

核心理念：
- 论证优先：一切视觉决策服务于论证的可读与可信，装饰是噪音
- 窄列即尊重：正文列宽锁定约 42rem（65-75 字符），这是眼睛完成一次换行扫视的舒适极限
- 三层信息带宽：正文承载主线论证，边注承载旁白与出处，突破版心的图表承载证据
- 引用即链接：编号上标引用是学术写作的超链接原型，在网页上两者合一
- 色彩即语义：墨灰负责陈述，学术蓝只指向可点击与被引用之物，图表橙只强调数据

设计原则：
- 层级靠排版建立：字号、字重、间距和 hairline 细线完成全部层级，不借助色块与阴影
- 图表是一等公民：figure 允许突破正文列宽居中展开，配编号图注（图 1：）说明来源与结论
- 元信息仪式感：作者、机构、日期、DOI 组成 byline 信息块，hairline 分隔，像论文首页一样可信
- 表格用 booktabs 语法：上下粗横线加表头细线，无竖线无斑马纹
- 克制的交互：hover 只做下划线与浅灰底，转场不超过 200ms，禁止一切炫技动效`,

  philosophyEn: `Distill Style is "paper typography, translated to the web": three centuries of journal rigor rebuilt with web-native breathing room.

Core principles:
- Argument first: every visual decision serves legibility and credibility; decoration is noise
- The narrow measure is respect: body column locks at ~42rem (65-75 characters), the comfortable limit of one eye-sweep per line
- Three bandwidths of information: body text carries the argument, sidenotes carry asides and provenance, full-bleed figures carry the evidence
- Citations are links: the numbered superscript is the ancestor of the hyperlink; on the web they become one
- Color is semantic: ink gray states, academic blue points only to the clickable and the cited, chart orange highlights only data`,

  doList: [
    "正文使用 font-serif 窄列 max-w-[42rem] mx-auto，行高 leading-[1.75]",
    "边注 sidenote：大屏 xl:absolute 悬浮到右缘的小号灰字（text-xs text-[#6B7280]），小屏折叠为内联浅灰块 bg-[#F3F4F6]",
    "编号引用使用上标 <sup>[1]</sup>，学术蓝 text-[#2A7AE2]，页脚给出对应参考文献",
    "figure 突破版心：max-w-4xl mx-auto 居中，figcaption 用 text-[13px] text-[#6B7280] 并以「图 N：」开头",
    "分割一律用 hairline：border-t border-[#E5E7EB]，粗细不超过 1px",
    "学术蓝 #2A7AE2 仅用于链接、引用与关键强调；数据强调只用图表橙 #E4572E",
    "作者信息块 byline：作者/机构/日期/DOI 组成 hairline 分隔的元信息网格，标签用小号大写字距 tracking-[0.12em]",
    "表格用 booktabs 风：border-t-2 border-b-2 border-[#1F2933] 上下横线 + 表头细线，无竖线",
    "标题 font-serif font-semibold text-[#1F2933]，层级靠字号与留白而非颜色",
  ],

  doListEn: [
    "Body text uses font-serif in a narrow column max-w-[42rem] mx-auto with leading-[1.75]",
    "Sidenotes float into the right margin on large screens (xl:absolute, text-xs text-[#6B7280]) and collapse inline as light-gray blocks bg-[#F3F4F6] on small screens",
    "Numbered citations use superscript <sup>[1]</sup> in academic blue text-[#2A7AE2], resolved in a references list",
    "Figures break the measure: max-w-4xl mx-auto centered, with figcaption in text-[13px] text-[#6B7280] starting with Fig. N:",
    "All separation uses hairlines: border-t border-[#E5E7EB], never thicker than 1px",
    "Academic blue #2A7AE2 only for links, citations, and key emphasis; data emphasis only in chart orange #E4572E",
    "Byline block: author/affiliation/date/DOI as a hairline-divided meta grid with small uppercase tracked labels",
    "Tables follow booktabs: border-t-2 border-b-2 border-[#1F2933] with a thin header rule, no vertical rules",
    "Headings are font-serif font-semibold text-[#1F2933]; hierarchy comes from size and whitespace, not color",
  ],

  dontList: [
    "禁止任何渐变 bg-gradient-*（论文没有渐变，证据不需要滤镜）",
    "禁止重阴影：最多 shadow-sm，杜绝 shadow-lg/shadow-2xl 与彩色阴影",
    "禁止大圆角：最多 rounded-md，正文与图表容器优先直角",
    "禁止正文全宽铺满：正文列宽不得超过 42rem，全宽只属于突破版心的图表",
    "禁止多彩装饰与大面积色块：色彩只服务于信息，不服务于气氛",
    "禁止 sans-serif 正文：正文必须衬线，无衬线只用于 UI 控件标签与元信息",
    "禁止表格竖线与斑马纹底色（booktabs 的两条横线已经足够）",
  ],

  dontListEn: [
    "Never use gradients bg-gradient-* (papers have no gradients; evidence needs no filter)",
    "Never use heavy shadows: shadow-sm at most, no shadow-lg/shadow-2xl or colored shadows",
    "Never use large radii: rounded-md at most; prefer square corners for prose and figure containers",
    "Never let body text run full width: the measure never exceeds 42rem; full bleed belongs to figures only",
    "Never add colorful decoration or large color fields: color serves information, not mood",
    "Never set body text in sans-serif: prose must be serif; sans is reserved for UI labels and metadata",
    "Never add vertical rules or zebra striping to tables (the two booktabs rules are enough)",
  ],

  components: {
    button: {
      name: "学术操作按钮",
      description: "克制的主操作按钮，墨灰底、rounded-md、小字号，像期刊页上的下载入口",
      code: `<button className="px-5 py-2.5 bg-[#1F2933] text-white text-sm font-medium rounded-md hover:bg-[#111827] transition-colors duration-150">Download PDF</button>`,
    },
    card: {
      name: "摘要卡片",
      description: "论文摘要卡：hairline 边框、编号引用上标与底部元信息行，自带边注式旁白",
      code: `<div className="relative bg-white border border-[#E5E7EB] rounded-md p-6">
  <p className="text-[11px] uppercase tracking-[0.14em] text-[#6B7280] mb-2">Abstract</p>
  <h3 className="font-serif text-lg font-semibold text-[#1F2933] mb-2">Why Momentum Really Works</h3>
  <p className="font-serif text-sm leading-[1.75] text-[#1F2933]">We derive a closed-form view of momentum<sup className="text-[#2A7AE2] font-sans text-[10px]">[1]</sup> and visualize its damping behavior across the eigenspace of the loss surface.</p>
  <p className="mt-3 pt-3 border-t border-[#E5E7EB] text-xs text-[#6B7280] font-sans">Gabriel Goh - Distill, 2017 - DOI 10.23915/distill.00006</p>
  <p className="mt-2 text-xs leading-relaxed text-[#6B7280] font-sans border-l-2 border-[#2A7AE2]/40 bg-[#F3F4F6] px-3 py-2 rounded-sm"><span className="text-[#2A7AE2] font-medium">SN.</span> 边注：小屏内联折叠，大屏悬浮右缘。</p>
</div>`,
    },
    input: {
      name: "文献检索框",
      description: "hairline 边框输入框，聚焦时学术蓝细环，无粗边无重投影",
      code: `<input type="text" placeholder="Search the archive, e.g. attention" className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-md font-serif text-sm text-[#1F2933] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#2A7AE2] focus:ring-1 focus:ring-[#2A7AE2]/30 transition-colors duration-150" />`,
    },
    nav: {
      name: "期刊刊头",
      description: "masthead 式顶栏：衬线刊名 + hairline 下边线 + 小号导航",
      code: `<nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#E5E7EB]">
  <span className="font-serif text-lg font-semibold tracking-tight text-[#1F2933]">The Distill Review</span>
  <div className="flex items-center gap-6 text-sm text-[#6B7280] font-sans">
    <span className="hover:text-[#2A7AE2] hover:underline underline-offset-4 transition-colors cursor-pointer">Articles</span>
    <span className="hover:text-[#2A7AE2] hover:underline underline-offset-4 transition-colors cursor-pointer">About</span>
    <span className="hover:text-[#2A7AE2] hover:underline underline-offset-4 transition-colors cursor-pointer">Submit</span>
  </div>
</nav>`,
    },
    hero: {
      name: "文章头部",
      description: "论文式 hero：衬线大标题 + byline 作者信息块（作者/机构/日期/DOI）",
      code: `<section className="bg-white px-6 py-16">
  <div className="max-w-[42rem] mx-auto">
    <p className="text-[11px] uppercase tracking-[0.16em] text-[#2A7AE2] font-sans mb-4">Research Explainer</p>
    <h1 className="font-serif text-4xl font-semibold leading-tight text-[#1F2933] mb-4">The Emotional Geometry of Interface Styles</h1>
    <p className="font-serif text-lg leading-[1.75] text-[#6B7280] mb-8">How valence and arousal locate every design language on a single circle.</p>
    <div className="grid grid-cols-2 gap-x-8 gap-y-3 border-t border-b border-[#E5E7EB] py-4 text-sm font-sans">
      <div><p className="text-[10px] uppercase tracking-[0.14em] text-[#6B7280] mb-0.5">Authors</p><p className="text-[#1F2933]">Lin Qiao, J. A. Russell</p></div>
      <div><p className="text-[10px] uppercase tracking-[0.14em] text-[#6B7280] mb-0.5">Published</p><p className="text-[#1F2933]">July 5, 2026</p></div>
    </div>
  </div>
</section>`,
    },
    footer: {
      name: "参考文献页脚",
      description: "编号参考文献列表 + hairline 上边线，像论文最后一页",
      code: `<footer className="bg-[#F3F4F6] border-t border-[#E5E7EB] px-6 py-10">
  <div className="max-w-[42rem] mx-auto">
    <p className="text-[11px] uppercase tracking-[0.14em] text-[#6B7280] font-sans mb-4">References</p>
    <ol className="space-y-2 font-serif text-sm text-[#1F2933]">
      <li className="flex gap-3"><span className="text-[#2A7AE2] font-sans text-xs pt-0.5">[1]</span><span>Russell, J. A. (1980). A circumplex model of affect. <em>JPSP, 39</em>(6), 1161-1178.</span></li>
      <li className="flex gap-3"><span className="text-[#2A7AE2] font-sans text-xs pt-0.5">[2]</span><span>Kano, N. et al. (1984). Attractive quality and must-be quality. <em>Quality, 14</em>(2).</span></li>
    </ol>
    <p className="mt-6 pt-4 border-t border-[#E5E7EB] text-xs text-[#6B7280] font-sans">The Distill Review - ISSN 2026-0705</p>
  </div>
</footer>`,
    },
  },

  globalCss: `.distill-style-article {
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  font-size: 1.0625rem;
  line-height: 1.75;
  color: #1F2933;
}
.distill-style-article p + p {
  margin-top: 1.25rem;
}
.distill-style-cite {
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 0.68em;
  font-weight: 600;
  vertical-align: super;
  line-height: 0;
  color: #2A7AE2;
  text-decoration: none;
  cursor: pointer;
}
.distill-style-cite:hover {
  text-decoration: underline;
}
.distill-style-sidenote {
  display: block;
  margin: 1rem 0;
  padding: 0.625rem 0.875rem;
  border-left: 2px solid rgba(42, 122, 226, 0.4);
  border-radius: 0.125rem;
  background: #F3F4F6;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 0.8125rem;
  line-height: 1.6;
  color: #6B7280;
}
@media (min-width: 1280px) {
  .distill-style-sidenote {
    position: absolute;
    top: 0;
    right: -14rem;
    width: 12rem;
    margin: 0;
    padding: 0.5rem 0 0 0;
    border-left: none;
    border-top: 1px solid #E5E7EB;
    background: transparent;
    font-size: 0.75rem;
  }
}
.distill-style-figure {
  max-width: 56rem;
  margin: 2.5rem auto;
}
.distill-style-figcaption {
  margin-top: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid #E5E7EB;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 0.8125rem;
  line-height: 1.6;
  color: #6B7280;
}
.distill-style-table {
  width: 100%;
  border-collapse: collapse;
  border-top: 2px solid #1F2933;
  border-bottom: 2px solid #1F2933;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 0.875rem;
}
.distill-style-table thead th {
  border-bottom: 1px solid #1F2933;
  padding: 0.5rem 0.75rem;
  text-align: left;
  font-weight: 600;
  color: #1F2933;
}
.distill-style-table tbody td {
  padding: 0.5rem 0.75rem;
  color: #1F2933;
}
.distill-style-hairline {
  border: none;
  border-top: 1px solid #E5E7EB;
}
.distill-style-smallcaps {
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-size: 0.6875rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #6B7280;
}`,

  aiRules: `You are a Distill Style (academic explainer) design expert. This style translates journal-grade paper typography into web-native layouts, modeled on Distill.pub.

## Absolute Rules
- Background: pure white #FFFFFF; secondary surfaces only #F3F4F6
- Body text: font-serif, color #1F2933, column locked at max-w-[42rem] mx-auto, leading-[1.75]
- Academic blue #2A7AE2 is reserved for links, numbered citations, and key emphasis only
- Chart orange #E4572E is reserved for data emphasis inside figures only
- Sidenotes: xl:absolute floating in the right margin as small gray sans text; inline light-gray blocks below xl
- Citations: superscript [1] in academic blue, resolved in a numbered references list at the page end
- Figures break the measure: max-w-4xl mx-auto, always followed by a hairline-topped figcaption starting with "Fig. N:"
- Byline block: authors / affiliations / date / DOI as a hairline-divided meta grid with uppercase tracked labels
- Tables: booktabs only - 2px top and bottom rules, 1px header rule, no vertical rules, no zebra striping
- Radius: rounded-md maximum; shadows: shadow-sm maximum

## Forbidden
- Gradients of any kind (bg-gradient-*)
- Heavy or colored shadows (shadow-lg, shadow-2xl)
- Radii beyond rounded-md
- Full-width body text (prose wider than 42rem)
- Sans-serif body copy (sans is only for UI labels and metadata)
- Decorative color fields, zebra tables, vertical table rules

## Layout & Spacing
- Section rhythm: py-12 md:py-16 between article blocks
- Prose column: max-w-[42rem]; figure column: max-w-4xl; page shell: max-w-5xl
- Hairlines (border-[#E5E7EB]) separate every metadata region

## Responsive
- Mobile: sidenotes collapse inline as bordered light-gray asides; figures go full-width with horizontal scroll for wide tables
- Desktop (xl+): sidenotes float into the right margin; the prose column stays centered

## Self-Check Verification
After generating code, verify:
1. Body text is serif, no wider than 42rem, with leading-[1.75]
2. Blue appears only on links/citations/emphasis; orange appears only on data
3. Every figure has a numbered figcaption; every citation number resolves in the references
4. No gradients, no shadows above shadow-sm, no radius above rounded-md
5. Tables have horizontal rules only
6. All interactive elements have visible hover and focus states`,

  aiRulesEn: `You are a Distill Style (academic explainer) design expert modeled on Distill.pub.

## Absolute Rules
- Pure white #FFFFFF background; #F3F4F6 for secondary surfaces only
- Serif body in #1F2933, column max-w-[42rem] mx-auto, leading-[1.75]
- Academic blue #2A7AE2 only for links, citations, key emphasis
- Chart orange #E4572E only for data emphasis in figures
- Sidenotes float in the right margin on xl screens, collapse inline below
- Numbered superscript citations resolved in a references list
- Figures break the measure at max-w-4xl with "Fig. N:" captions
- Booktabs tables: horizontal rules only

## Forbidden
- Gradients, heavy shadows, radii beyond rounded-md
- Full-width prose, sans-serif body copy
- Zebra striping and vertical table rules

## Responsive
- Mobile: inline sidenotes, scrollable wide tables
- Desktop: floating margin sidenotes beside a centered 42rem column`,

  examplePrompts: [
    {
      title: "学术科普文章页",
      titleEn: "Academic Explainer Article",
      description: "含狩野模型图、边注与参考文献的完整科普文章页",
      descriptionEn: "A full explainer article with a Kano model figure, sidenotes, and references",
      prompt:
        "Build an academic explainer article page in Distill Style: journal masthead, serif title with an author byline block (authors, affiliations, date, DOI), an abstract, a narrow 42rem serif body with numbered superscript citations and margin sidenotes, one SVG figure of the Kano model (Must-be concave curve, One-dimensional straight line, Attractive convex curve with labeled axes) breaking the measure at max-w-4xl with a 'Fig. 1:' caption, a booktabs results table, and a numbered references footer.",
    },
    {
      title: "研究者个人主页",
      titleEn: "Researcher Homepage",
      description: "论文列表、研究方向与简历下载的学术主页",
      descriptionEn: "A scholarly homepage with publications, research interests, and CV download",
      prompt:
        "Create a researcher homepage in Distill Style: white background, serif name and one-line research statement, a hairline-divided meta row (affiliation, email, ORCID), a publications list where each entry shows serif title, gray sans venue metadata, and small [PDF] [BibTeX] [Code] links in academic blue, plus a selected-projects section with abstract cards and a references-style footer.",
    },
    {
      title: "学术型作品集",
      titleEn: "Academic Portfolio",
      description: "把项目当论文陈列的作品集：摘要、图表与引用式致谢",
      descriptionEn: "A portfolio that presents projects like papers: abstracts, figures, and citation-style credits",
      prompt:
        "Design an academic portfolio in Distill Style: each project is presented like a paper with a serif title, an abstract paragraph in a narrow column, one wide figure with a numbered caption, tag badges styled like arXiv subject classes, and a credits line formatted as a citation. Keep hairline separators, blue reserved for links, and a booktabs skills table.",
    },
  ],
};
