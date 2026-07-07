import type { DesignStyle } from "./types";

export const latexPaper: DesignStyle = {
  slug: "latex-paper",
  name: "论文排版风",
  nameEn: "LaTeX Paper",
  description:
    "把 LaTeX 学术论文的排版语言搬到网页：Computer Modern 字感、居中标题与 Abstract、层级编号小节、定理环境、编号公式、booktabs 表格与悬挂缩进参考文献。适合研究主页、课程讲义与学术型作品集。",
  descriptionEn:
    "The typographic language of LaTeX academic papers, brought to the web: Computer Modern feel, centered title and abstract, hierarchically numbered sections, theorem environments, numbered equations, booktabs tables, and hanging-indent references. Built for research homepages, lecture notes, and scholarly portfolios.",
  cover: "/styles/latex-paper.svg",
  styleType: "visual",
  tags: ["retro", "high-contrast"],
  category: "minimal",
  colors: {
    primary: "#111111",
    secondary: "#FFFFFF",
    accent: ["#0B5394", "#F5F5F0", "#6B6B66", "#D4D4D0"],
  },
  keywords: ["学术", "论文", "LaTeX", "排版", "定理环境", "编号公式", "booktabs", "参考文献", "研究主页", "课程讲义", "academic", "scholarly", "serif"],
  keywordsEn: ["academic", "paper", "LaTeX", "typesetting", "theorem", "numbered equations", "booktabs", "references", "research homepage", "lecture notes", "Computer Modern", "scholarly", "serif"],

  philosophy: `LaTeX Paper（论文排版风）把学术论文的排版系统当作一种视觉语言：一切都有编号，一切都可引用。秩序感本身就是学术可信度的外观。

核心理念：
- 编号即导航：小节 1 / 1.1 / 1.2、公式 (1) (2)、Theorem 1、Figure 1、Table 1、参考文献 [1]——每个元素都有唯一坐标，读者可以精确指认任何位置
- 仪式感即可信度：居中标题、作者行、日期、Abstract 窄块，这套百年不变的开场白让内容自动获得"经过同行评审"的气质
- 结构先于装饰：没有阴影、没有圆角、没有彩色按钮，唯一的强调手段是编号、斜体、粗细横线和 hyperref 蓝
- 黑白为主，蓝为引用：墨黑 #111111 承载正文，纸白 #FFFFFF 是版面，hyperref 蓝 #0B5394 只用于链接与交叉引用——蓝色出现的地方就是可以点的地方

设计原则：
- 全文衬线：模拟 Computer Modern 的字感，标题正文皆 serif，代码用等宽
- 定理环境承载重点：Theorem / Definition / Remark 用浅底或左线框出，斜体正文，替代一切"卡片"
- booktabs 三线表：上下粗横线 + 表头下细线，绝无竖线，绝无斑马纹
- 悬挂缩进参考文献：[1] 标号突出于左侧，第二行起对齐正文
- 页面即纸张：窄栏（65ch 左右）、充足行距、页码感页脚，读起来像一份可打印的 PDF`,

  philosophyEn: `LaTeX Paper treats the typesetting system of academic papers as a visual language: everything is numbered, everything is citable. The sense of order itself is the visual grammar of scholarly credibility.

Core principles:
- Numbering is navigation: sections 1 / 1.1 / 1.2, equations (1) (2), Theorem 1, Figure 1, Table 1, references [1] — every element has a unique coordinate that readers can point to precisely
- Ritual is credibility: centered title, author line, date, and a narrow abstract block — this century-old opening ceremony lends content a peer-reviewed air
- Structure before decoration: no shadows, no rounded corners, no colorful buttons; the only emphasis tools are numbering, italics, rules of varying weight, and hyperref blue
- Ink black on paper white, blue for citations: #111111 carries the text, #FFFFFF is the page, #0B5394 marks only links and cross-references — wherever blue appears, it can be clicked
- Serif throughout, theorem environments instead of cards, booktabs tables with no vertical rules, hanging-indent references, and a page that reads like a printable PDF`,

  doList: [
    "全文使用衬线字体 font-serif，标题加 tracking-tight 模拟 Computer Modern 字感",
    "文档头部居中：标题 text-3xl md:text-4xl、作者行 text-sm、日期 italic，依次垂直排列",
    "Abstract 使用两侧缩进窄块 max-w-xl mx-auto px-8，顶部居中小标题 font-bold text-sm",
    "小节标题使用层级编号：1 / 1.1 / 1.2，编号与标题之间留双空格感 gap-3",
    "定理环境使用浅底 bg-[#F5F5F0] 或左线 border-l-2 border-[#111111]，标签粗体 + 正文斜体",
    "公式独立成行居中，右侧放 (n) 编号：flex justify-between 或 relative + absolute right-0",
    "表格使用 booktabs 三线表：border-t-2 border-b-2 border-[#111111] 粗线 + 表头下 border-b 细线",
    "链接与交叉引用统一 hyperref 蓝 text-[#0B5394]，hover 加下划线",
    "参考文献使用悬挂缩进：pl-8 -indent-8 或 grid grid-cols-[2rem_1fr]，[n] 标号在左",
    "正文栏宽控制在 max-w-2xl 或 max-w-3xl，行距 leading-relaxed",
  ],

  doListEn: [
    "Use serif fonts throughout with font-serif; add tracking-tight on headings for a Computer Modern feel",
    "Center the document head: title text-3xl md:text-4xl, author line text-sm, italic date, stacked vertically",
    "Set the abstract as a narrow indented block max-w-xl mx-auto px-8 with a centered bold small heading",
    "Number section headings hierarchically: 1 / 1.1 / 1.2, with a gap-3 between number and title",
    "Build theorem environments with light fill bg-[#F5F5F0] or a left rule border-l-2 border-[#111111]: bold label + italic body",
    "Display equations centered on their own line with an (n) tag on the right: flex justify-between or relative + absolute right-0",
    "Use booktabs tables: heavy border-t-2 border-b-2 border-[#111111] rules plus a thin border-b under the header, never vertical rules",
    "Color links and cross-references in hyperref blue text-[#0B5394], underline on hover",
    "Set references with hanging indents: pl-8 -indent-8 or grid grid-cols-[2rem_1fr] with [n] labels on the left",
    "Keep the text column at max-w-2xl or max-w-3xl with leading-relaxed line height",
  ],

  dontList: [
    "禁止表格出现竖线或斑马纹底色——booktabs 只允许横线",
    "禁止彩色大按钮和渐变——操作元素只能是墨黑实底、细边框或 hyperref 蓝链接",
    "禁止正文使用无衬线字体——sans 破坏论文字感，代码请用等宽",
    "禁止圆角——一律 rounded-none，纸上没有圆角",
    "禁止阴影 shadow-*——纸张是平的，层次靠横线与留白",
    "禁止装饰性图形、emoji、插画——图形只能以带编号图注的 Figure 形式出现",
  ],

  dontListEn: [
    "Never draw vertical rules or zebra striping in tables — booktabs allows horizontal rules only",
    "Never use large colorful buttons or gradients — actions are solid ink, thin outlines, or hyperref-blue links",
    "Never set body text in sans-serif — it breaks the paper feel; use monospace only for code",
    "Never round corners — rounded-none everywhere, paper has no border radius",
    "Never use shadows (shadow-*) — paper is flat; hierarchy comes from rules and whitespace",
    "Never add decorative graphics, emoji, or illustrations — graphics may only appear as numbered, captioned figures",
  ],

  components: {
    button: {
      name: "按钮",
      description: "论文语境的操作元素：墨黑实底主按钮、细边框次按钮、hyperref 蓝引用式链接",
      code: `{/* Primary: solid ink, like a bold imperative */}
<button className="px-6 py-2.5 bg-[#111111] text-[#FFFFFF] font-serif text-sm tracking-tight rounded-none border border-[#111111] hover:bg-[#FFFFFF] hover:text-[#111111] transition-colors duration-200">
  Download PDF
</button>

{/* Secondary: thin ruled outline */}
<button className="px-6 py-2.5 bg-transparent text-[#111111] font-serif text-sm tracking-tight rounded-none border border-[#111111] hover:bg-[#F5F5F0] transition-colors duration-200">
  View Source
</button>

{/* Citation link: hyperref blue, like \\cite{} */}
<button className="font-serif text-sm text-[#0B5394] hover:underline underline-offset-2">
  [BibTeX]
</button>`,
    },
    card: {
      name: "定理框",
      description: "卡片以定理环境呈现：粗体标签 + 斜体正文，浅底无圆角无阴影",
      code: `<div className="bg-[#F5F5F0] border-l-2 border-[#111111] rounded-none px-6 py-5 max-w-2xl">
  <p className="font-serif text-[15px] leading-relaxed text-[#111111]">
    <span className="font-bold not-italic">Theorem 1.</span>{" "}
    <span className="italic">
      A layout in which every element carries a number can be referenced
      without ambiguity; order, once visible, reads as credibility.
    </span>
  </p>
  <p className="font-serif text-sm text-[#6B6B66] mt-3">
    See Section <span className="text-[#0B5394]">2.1</span> for the proof sketch.
  </p>
</div>`,
    },
    input: {
      name: "输入框",
      description: "极简下线输入：白底细边框，聚焦时边框转墨黑，无圆角无光晕",
      code: `<div className="max-w-md">
  <label className="block font-serif text-sm text-[#111111] mb-1.5">
    Corresponding author<span className="text-[#0B5394]">*</span>
  </label>
  <input
    type="email"
    placeholder="name@university.edu"
    className="w-full px-3 py-2 bg-[#FFFFFF] font-serif text-sm text-[#111111] placeholder:text-[#6B6B66] placeholder:italic border border-[#D4D4D0] rounded-none focus:outline-none focus:border-[#111111] transition-colors duration-200"
  />
</div>`,
    },
    nav: {
      name: "导航",
      description: "页眉式导航：running head 小体例，细横线分隔，链接为 hyperref 蓝",
      code: `<header className="bg-[#FFFFFF] border-b border-[#D4D4D0]">
  <nav className="max-w-3xl mx-auto px-6 py-3 flex items-baseline justify-between font-serif text-sm">
    <span className="italic text-[#6B6B66]">J. Web Typogr. 12 (2026) 1&ndash;18</span>
    <div className="flex items-baseline gap-5">
      <a href="#" className="text-[#0B5394] hover:underline underline-offset-2">Abstract</a>
      <a href="#" className="text-[#0B5394] hover:underline underline-offset-2">Figures</a>
      <a href="#" className="text-[#0B5394] hover:underline underline-offset-2">References</a>
    </div>
  </nav>
</header>`,
    },
    hero: {
      name: "文档头",
      description: "论文开场式 Hero：居中标题、作者行、日期与 Abstract 窄块",
      code: `<section className="bg-[#FFFFFF] px-6 pt-16 pb-12 text-center">
  <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-[#111111] max-w-2xl mx-auto leading-snug">
    Order as Interface: Typesetting the Web like a Paper
  </h1>
  <p className="font-serif text-sm text-[#111111] mt-5">
    A. Researcher<sup className="text-[#0B5394]">1</sup>
    <span className="mx-3" />
    B. Coauthor<sup className="text-[#0B5394]">2</sup>
  </p>
  <p className="font-serif text-sm italic text-[#6B6B66] mt-1">July 5, 2026</p>
  <div className="max-w-xl mx-auto mt-8 px-8 text-left">
    <p className="font-serif text-sm font-bold text-center mb-2">Abstract</p>
    <p className="font-serif text-sm leading-relaxed text-[#111111]">
      We port the typographic system of academic papers to the web: numbered
      sections, theorem environments, display equations, and booktabs tables.
    </p>
  </div>
</section>`,
    },
    footer: {
      name: "页脚",
      description: "页码感页脚：顶部细横线 + 居中页码 + 期刊行",
      code: `<footer className="bg-[#FFFFFF] border-t border-[#D4D4D0] px-6 py-6">
  <div className="max-w-3xl mx-auto font-serif text-sm text-center">
    <p className="text-[#111111]">1</p>
    <p className="text-[#6B6B66] italic mt-2">
      Preprint submitted to <span className="not-italic">The Web Typography Letters</span>
    </p>
    <p className="mt-1">
      <a href="#" className="text-[#0B5394] hover:underline underline-offset-2">arXiv:2607.00001</a>
    </p>
  </div>
</footer>`,
    },
  },

  globalCss: `/* LaTeX Paper global styles */
:root {
  --ltx-ink: #111111;
  --ltx-paper: #FFFFFF;
  --ltx-href: #0B5394;
  --ltx-thm-bg: #F5F5F0;
  --ltx-rule: #D4D4D0;
  --ltx-muted: #6B6B66;
}

body {
  font-family: "Computer Modern Serif", Georgia, Cambria, "Times New Roman", Times, serif;
  background: var(--ltx-paper);
  color: var(--ltx-ink);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  font-family: inherit;
  letter-spacing: -0.01em;
}

::selection {
  background: var(--ltx-thm-bg);
  color: var(--ltx-ink);
}

/* Theorem environment: bold label, italic body, light fill */
.ltx-theorem {
  background: var(--ltx-thm-bg);
  border-left: 2px solid var(--ltx-ink);
  padding: 1.25rem 1.5rem;
}
.ltx-theorem .ltx-theorem-label {
  font-weight: 700;
  font-style: normal;
}
.ltx-theorem .ltx-theorem-body {
  font-style: italic;
}

/* Display equation: centered formula, (n) tag on the right */
.ltx-equation {
  display: flex;
  align-items: baseline;
  margin: 1.5rem 0;
}
.ltx-equation .ltx-equation-math {
  flex: 1;
  text-align: center;
  font-style: italic;
}
.ltx-equation .ltx-equation-tag {
  font-style: normal;
  color: var(--ltx-ink);
}

/* booktabs table: heavy top/bottom rules, thin midrule, no vertical rules */
.ltx-booktabs {
  width: 100%;
  border-collapse: collapse;
  border-top: 2px solid var(--ltx-ink);
  border-bottom: 2px solid var(--ltx-ink);
}
.ltx-booktabs thead th {
  border-bottom: 1px solid var(--ltx-ink);
  font-weight: 400;
  font-style: italic;
  padding: 0.5rem 0.75rem;
}
.ltx-booktabs td {
  padding: 0.45rem 0.75rem;
}

/* Hanging-indent reference list */
.ltx-refs {
  list-style: none;
  padding: 0;
}
.ltx-refs li {
  padding-left: 2rem;
  text-indent: -2rem;
  margin-bottom: 0.5rem;
}

/* Small-caps label, e.g. for keywords line */
.ltx-smallcaps {
  font-variant: small-caps;
  letter-spacing: 0.05em;
}

@keyframes latex-paper-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.latex-paper-animate-in {
  animation: latex-paper-fade-in 0.5s ease-out both;
}`,

  aiRules: `You are a LaTeX Paper design expert. Everything is numbered, everything is citable.

## Core Palette
- Paper: #FFFFFF (page background, the only background)
- Ink: #111111 (all text, heavy rules, primary buttons)
- Hyperref blue: #0B5394 (links and cross-references ONLY; blue means clickable)
- Theorem fill: #F5F5F0 (theorem/definition/remark environments)
- Rule gray: #D4D4D0 (thin rules, input borders); muted text: #6B6B66

## Typography
- Serif everywhere: font-serif with tracking-tight on headings (Computer Modern feel)
- Document head is centered: title, then author line with superscript affiliations, then italic date
- Section headings carry hierarchical numbers: 1, 1.1, 1.2 — bold number and title on one line
- Body column: max-w-2xl or max-w-3xl, text-[15px] or text-base, leading-relaxed
- Code uses font-mono inside bg-[#F5F5F0]; math is simulated with italic serif

## Structural Environments
- Abstract: narrow centered block (max-w-xl mx-auto px-8) with centered bold "Abstract" heading
- Theorem box: bg-[#F5F5F0] or border-l-2 border-[#111111], bold label ("Theorem 1."), italic body
- Display equation: own centered line in italic serif, with (n) number flushed right
- Table: booktabs only — border-t-2 and border-b-2 in #111111, thin border-b under header, NO vertical rules, NO zebra rows; caption ABOVE the table ("Table 1: ...")
- Figure: content + centered caption BELOW ("Figure 1: ..."), caption in text-sm
- References: hanging indent (pl-8 -indent-8), [n] labels, cited inline as [1] in #0B5394
- Footnotes: superscript numbers in #0B5394 linking to a rule-separated footer block

## Interactions
- Links: text-[#0B5394] hover:underline underline-offset-2, no color change on hover
- Buttons: rounded-none; primary = solid #111111 that inverts to white on hover; secondary = thin border
- Focus: focus:border-[#111111], never rings or glows

## Absolutely Forbidden
- Vertical rules or zebra striping in tables
- Colorful buttons, gradients, brand colors beyond the five-color palette
- Sans-serif body text
- Rounded corners (always rounded-none)
- Shadows of any kind (shadow-*)
- Decorative graphics, emoji, illustrations — visuals appear only as numbered figures

## Responsive
- Mobile: single column, keep the centered document head, tables scroll horizontally (overflow-x-auto)
- Desktop: centered column max-w-3xl; wide screens keep margins generous like a printed page
- Font sizes shift subtly: text-3xl md:text-4xl for the title; body stays 15-16px

## Self-Check
1. Does every section, equation, figure, and table carry a number?
2. Is blue used ONLY for links and cross-references?
3. Are all corners square and all surfaces flat (no shadow)?
4. Do tables have horizontal rules only?
5. Does the page read like a printable PDF?`,

  aiRulesEn: `You are a LaTeX Paper design expert. Everything is numbered, everything is citable.

## Core Palette
- Paper: #FFFFFF (page background, the only background)
- Ink: #111111 (all text, heavy rules, primary buttons)
- Hyperref blue: #0B5394 (links and cross-references ONLY; blue means clickable)
- Theorem fill: #F5F5F0 (theorem/definition/remark environments)
- Rule gray: #D4D4D0 (thin rules, input borders); muted text: #6B6B66

## Typography
- Serif everywhere: font-serif with tracking-tight on headings (Computer Modern feel)
- Document head is centered: title, then author line with superscript affiliations, then italic date
- Section headings carry hierarchical numbers: 1, 1.1, 1.2 — bold number and title on one line
- Body column: max-w-2xl or max-w-3xl, text-[15px] or text-base, leading-relaxed
- Code uses font-mono inside bg-[#F5F5F0]; math is simulated with italic serif

## Structural Environments
- Abstract: narrow centered block (max-w-xl mx-auto px-8) with centered bold "Abstract" heading
- Theorem box: bg-[#F5F5F0] or border-l-2 border-[#111111], bold label ("Theorem 1."), italic body
- Display equation: own centered line in italic serif, with (n) number flushed right
- Table: booktabs only — border-t-2 and border-b-2 in #111111, thin border-b under header, NO vertical rules, NO zebra rows; caption ABOVE the table ("Table 1: ...")
- Figure: content + centered caption BELOW ("Figure 1: ..."), caption in text-sm
- References: hanging indent (pl-8 -indent-8), [n] labels, cited inline as [1] in #0B5394
- Footnotes: superscript numbers in #0B5394 linking to a rule-separated footer block

## Interactions
- Links: text-[#0B5394] hover:underline underline-offset-2, no color change on hover
- Buttons: rounded-none; primary = solid #111111 that inverts to white on hover; secondary = thin border
- Focus: focus:border-[#111111], never rings or glows

## Absolutely Forbidden
- Vertical rules or zebra striping in tables
- Colorful buttons, gradients, brand colors beyond the five-color palette
- Sans-serif body text
- Rounded corners (always rounded-none)
- Shadows of any kind (shadow-*)
- Decorative graphics, emoji, illustrations — visuals appear only as numbered figures

## Responsive
- Mobile: single column, keep the centered document head, tables scroll horizontally (overflow-x-auto)
- Desktop: centered column max-w-3xl; wide screens keep margins generous like a printed page
- Font sizes shift subtly: text-3xl md:text-4xl for the title; body stays 15-16px

## Self-Check
1. Does every section, equation, figure, and table carry a number?
2. Is blue used ONLY for links and cross-references?
3. Are all corners square and all surfaces flat (no shadow)?
4. Do tables have horizontal rules only?
5. Does the page read like a printable PDF?`,

  examplePrompts: [
    {
      title: "研究者个人主页",
      titleEn: "Researcher Homepage",
      description: "论文列表、项目与 BibTeX 引用块的学术个人主页",
      descriptionEn: "Academic homepage with publication list, projects, and BibTeX citation blocks",
      prompt: `Use LaTeX Paper style to build a researcher's personal homepage:
1. Document head: centered name as title (font-serif text-4xl tracking-tight), affiliation line with superscript numbers, italic contact line with hyperref-blue email link
2. Abstract-style bio: narrow centered block (max-w-xl mx-auto px-8) with bold centered "About" heading
3. Section "1  Publications": hanging-indent list with [1] [2] [3] labels, italic venue names, and [PDF] [DOI] [BibTeX] links in text-[#0B5394]
4. Expandable BibTeX citation block per paper: font-mono text-xs inside bg-[#F5F5F0] rounded-none, toggled by the [BibTeX] link
5. Section "2  Projects": theorem-style boxes (bg-[#F5F5F0] border-l-2 border-[#111111]) with bold project names and italic one-line summaries
6. Section "3  Teaching": booktabs table (border-t-2 border-b-2 border-[#111111], thin rule under header, no vertical rules) listing courses, terms, roles
7. Footer: thin top rule, centered page number, italic "Last compiled: <date>" line
8. Palette: #FFFFFF paper, #111111 ink, #0B5394 links only, rounded-none, no shadows, serif throughout`,
    },
    {
      title: "课程讲义页面",
      titleEn: "Lecture Notes Page",
      description: "带定理环境、编号公式与习题的课程讲义",
      descriptionEn: "Course lecture notes with theorem environments, numbered equations, and exercises",
      prompt: `Use LaTeX Paper style to create a lecture notes page:
1. Running head: thin bottom rule, italic course code left ("CS 401: Design Science"), hyperref-blue anchor links right
2. Centered head: lecture title, lecturer line, italic date
3. Numbered sections 1 / 1.1 / 1.2 with bold section headings in font-serif tracking-tight
4. Definition and Theorem environments: bg-[#F5F5F0] boxes with bold labels ("Definition 1.", "Theorem 2.") and italic bodies
5. Display equations centered in italic serif with (1) (2) tags flushed right
6. A worked example in a border border-[#D4D4D0] box captioned "Example 1"
7. Exercises section: ordered list with bold "Exercise n." prefixes and difficulty stated in italic
8. Footnotes with superscript hyperref-blue numbers and a rule-separated footnote block
9. Strictly serif, rounded-none, no shadows, blue only for links and cross-references`,
    },
    {
      title: "学术型产品白皮书",
      titleEn: "Academic Product Whitepaper",
      description: "以论文格式呈现产品技术白皮书的着陆页",
      descriptionEn: "A landing page presenting a product whitepaper in full paper format",
      prompt: `Use LaTeX Paper style to build a product whitepaper landing page:
1. Paper head: centered product-as-paper title, team members as authors with superscripts, italic version date
2. Abstract block summarizing the product in 4-5 lines, narrow and indented
3. Section "1  Motivation" with body text max-w-2xl leading-relaxed and inline citations [1] [2] in #0B5394
4. Section "2  Method": theorem box stating the core guarantee, followed by a centered display equation with (1) tag
5. Section "3  Evaluation": booktabs comparison table (Table 1 caption above, heavy top/bottom rules, no vertical rules) versus competitors
6. Figure 1: simple inline SVG line chart with centered "Figure 1: ..." caption below
7. Call-to-action as paper artifacts: solid-ink "Download PDF" button and thin-outline "View Source" button, both rounded-none
8. References section with hanging indents and a footer with centered page number`,
    },
  ],
};
