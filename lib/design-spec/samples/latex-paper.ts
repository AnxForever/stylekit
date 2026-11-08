import type { DesignSpec } from "../types";

export const latexPaperSpec: DesignSpec = {
  slug: "latex-paper",
  name: "论文排版风",
  nameEn: "LaTeX Paper",
  cover: "/styles/latex-paper.svg",
  theme: "light",
  northStar: {
    zh: "Computer Modern 的比例、编号的层级、三线表的克制：一张纸。",
    en: "Computer Modern proportions, numbered hierarchy, booktabs restraint — one sheet of paper.",
  },
  summary: {
    zh: "论文排版风把 LaTeX 的排版语汇搬到网页：全文衬线并收紧字距以模拟 Computer Modern，标题用 1 与 1.1 的层级编号，摘要用两侧缩进的窄块加居中小标题，定理用浅底或 2px 左线加粗体标签配斜体正文，表格用 booktabs 三线表（上下粗线加表头细线，绝无竖线与斑马纹），链接统一 hyperref 蓝。它禁止彩色大按钮、渐变、无衬线正文、圆角、阴影与装饰图形——纸是平的，层次只靠横线与留白。",
    en: "LaTeX Paper carries LaTeX's typographic language onto the web: serif throughout with tightened tracking to imitate Computer Modern, headings numbered 1 and 1.1, the abstract as a narrow inset block under a small centred label, theorems on a light ground or behind a 2px left rule with a bold label and italic body, tables as booktabs three-line compositions (heavy top and bottom, thin header rule, never verticals or stripes), and links in hyperref blue. It forbids large colorful buttons, gradients, sans body copy, radius, shadow and decorative graphics — paper is flat, so hierarchy comes from rules and whitespace alone.",
  },
  colors: [
    {
      name: "墨",
      nameEn: "Ink",
      value: "#111111",
      group: "brand",
      role: {
        zh: "正文、标题、三线表的粗线。印刷黑。",
        en: "Body, headings and the heavy booktabs rules — printing black.",
      },
      token: "--color-ink",
    },
    {
      name: "白",
      nameEn: "White",
      value: "#ffffff",
      group: "surface",
      role: {
        zh: "纸面。纯白，不泛黄。",
        en: "The sheet — pure white with no yellowing.",
      },
      token: "--color-white",
    },
    {
      name: "hyperlink 蓝",
      nameEn: "Hyperref Blue",
      value: "#0b5394",
      group: "accent",
      role: {
        zh: "链接与交叉引用，是唯一允许出现的彩色。",
        en: "Links and cross-references — the only color permitted.",
      },
      token: "--color-hyperref-blue",
    },
    {
      name: "定理底",
      nameEn: "Theorem Ground",
      value: "#f5f5f0",
      group: "surface",
      role: {
        zh: "定理环境与代码块的浅底。",
        en: "The light ground behind theorems and code.",
      },
      token: "--color-theorem-ground",
    },
    {
      name: "次灰",
      nameEn: "Muted Grey",
      value: "#6b6b66",
      group: "neutral",
      role: {
        zh: "图注、元数据与参考文献的补充信息。",
        en: "Captions, metadata and secondary reference detail.",
      },
      token: "--color-muted-grey",
    },
    {
      name: "线灰",
      nameEn: "Rule Grey",
      value: "#d4d4d0",
      group: "neutral",
      role: {
        zh: "表头细线与极次级分隔。",
        en: "Thin header rules and the faintest dividers.",
      },
      token: "--color-rule-grey",
    },
  ],
  fonts: [
    {
      family: "Latin Modern Roman",
      substitute: "'Computer Modern', 'Source Serif', Georgia, serif",
      weights: [400, 700],
      sizes: [12, 14, 17, 20, 26, 34],
      lineHeight: { display: 1.2, heading: 1.3, body: 1.55 },
      tracking: { display: "-0.01em", label: "0.04em" },
      role: {
        zh: "全文衬线，标题加紧字距模拟 Computer Modern。正文行高 1.55，比常规论文略松以适应屏幕。",
        en: "Serif throughout, headings on tight tracking for the Computer Modern feel. Body leading runs 1.55 — slightly looser than print for the screen.",
      },
      token: "--font-serif",
    },
    {
      family: "Latin Modern Mono",
      substitute: "ui-monospace, 'Courier New', monospace",
      weights: [400],
      sizes: [12, 13],
      lineHeight: { display: 1.4, heading: 1.4, body: 1.5 },
      tracking: { display: "0", label: "0.04em" },
      role: {
        zh: "代码、公式编号与算法块。等宽只在代码处出现，正文绝不使用。",
        en: "Code, equation numbers and algorithm blocks. Monospace appears only there, never in body copy.",
      },
      token: "--font-mono",
    },
  ],
  typeScale: [
    { role: "display", font: "Latin Modern Roman", weight: 700, size: 34, lineHeight: 1.2, tracking: "-0.01em", token: "--text-display" },
    { role: "heading", font: "Latin Modern Roman", weight: 700, size: 26, lineHeight: 1.25, token: "--text-heading" },
    { role: "subheading", font: "Latin Modern Roman", weight: 700, size: 20, lineHeight: 1.3, token: "--text-subheading" },
    { role: "body-lg", font: "Latin Modern Roman", weight: 400, size: 17, lineHeight: 1.55, token: "--text-body-lg" },
    { role: "body", font: "Latin Modern Roman", weight: 400, size: 14, lineHeight: 1.55, token: "--text-body" },
    { role: "label", font: "Latin Modern Roman", weight: 700, size: 12, lineHeight: 1.4, tracking: "0.04em", token: "--text-label" },
  ],
  spacing: {
    base: 4,
    density: "comfortable",
    scale: [4, 8, 12, 16, 24, 32, 48, 64],
    maxWidth: 700,
    sectionGap: 48,
    cardPadding: 16,
    elementGap: 12,
  },
  radii: [
    { element: "cards", value: "0" },
    { element: "buttons", value: "0" },
    { element: "inputs", value: "0" },
  ],
  surfaces: [
    { level: 0, name: "White", value: "#ffffff", purpose: "纸面" },
    { level: 1, name: "Theorem Ground", value: "#f5f5f0", purpose: "定理与代码块" },
  ],
  elevation: [{ name: "None", value: "none — paper is flat" }],
  components: [
    {
      name: "Numbered Section",
      role: { zh: "带编号的小节标题", en: "The numbered section heading" },
      construction: {
        zh: "格式为「1 引言」「1.1 背景」，编号与标题之间用 12px 空隙（不用制表符）。一级 26px/700，二级 20px/700，均为衬线并紧字距。编号不缩进，标题与编号左对齐。",
        en: "Formatted as '1 Introduction' or '1.1 Background' with a 12px gap between number and title instead of a tab. Level one runs 26px/700 and level two 20px/700, both serif on tight tracking. The number is unindented and flush with the title.",
      },
    },
    {
      name: "Theorem Block",
      role: { zh: "定理环境", en: "The theorem environment" },
      construction: {
        zh: "浅底 #f5f5f0（或白底配 2px 墨色左线）、零圆角、内边距 12px 16px，无阴影。标签用 12px/700 正体（如「定理 1」），正文用 14px 斜体衬线、行高 1.55，标签与正文之间一个空格。",
        en: "A #f5f5f0 ground (or white with a 2px ink left rule), zero radius, 12px 16px padding, no shadow. The label runs 12px/700 upright — 'Theorem 1' — with the body in 14px italic serif on 1.55 leading, one space after the label.",
      },
    },
    {
      name: "Booktabs Table",
      role: { zh: "三线表", en: "The three-line table" },
      construction: {
        zh: "顶部 2px 墨线、表头下 1px 墨线（或 #d4d4d0）、底部 2px 墨线，单元格 padding 4px 12px、14px 衬线，数值列右对齐。绝不允许竖线与斑马纹。表题在表上方，格式为「表 1：」。",
        en: "A 2px ink rule on top, a 1px rule (black or #d4d4d0) under the header, and a 2px rule at the bottom, with 4px 12px cell padding at 14px serif and numeric columns right-aligned. Verticals and striping are absolutely excluded. The caption sits above as 'Table 1:'.",
      },
    },
    {
      name: "Abstract Block",
      role: { zh: "摘要", en: "The abstract" },
      construction: {
        zh: "最大宽度 36rem、左右各 32px 内边距、居中放置。上方一个 12px/700 居中小标题「摘要」，正文 14px 衬线、行高 1.6、两端对齐（text-align: justify）。",
        en: "Capped at 36rem and centred with 32px side padding. A 12px/700 centred label sits above, with the body at 14px serif on 1.6 leading and justified.",
      },
    },
    {
      name: "Reference Entry",
      role: { zh: "参考文献条目", en: "A reference entry" },
      construction: {
        zh: "14px 衬线、行高 1.5、悬挂缩进（padding-left: 1.5em 配 text-indent: -1.5em），条目编号用 [1] 方括号。条目之间 8px。作者与年份不加粗，保持平铺。",
        en: "14px serif on 1.5 leading with a hanging indent (padding-left 1.5em against text-indent -1.5em), numbered with square brackets like [1], and 8px between entries. Authors and years stay unbolded and flat.",
      },
    },
  ],
  imagery: {
    zh: "图形只能作为带编号图注的 Figure 出现：折线、柱状、示意图，黑白或低饱和。图注在图下方、14px 次灰、格式为「图 1：」。不使用装饰插画、emoji、彩色大图与任何无编号的图像。",
    en: "Graphics appear only as numbered figures: line plots, bar charts, diagrams, in black-and-white or low saturation. The caption sits below at 14px in muted grey as 'Figure 1:'. No decorative illustration, emoji, large color images or unnumbered visuals.",
  },
  layout: {
    zh: "版心 700px、居中、文字两端对齐。区块间距 48px，标题上方留 32px。单栏，页边距对称。所有分隔用横线，绝不用底色块或阴影分区。",
    en: "A 700px measure, centred, with justified text. Sections sit 48px apart and headings reserve 32px above. One column with symmetrical margins. Every division is a horizontal rule — never a filled block or a shadow.",
  },
  dos: [
    { zh: "全文衬线，标题紧字距", en: "Serif throughout with tight heading tracking" },
    { zh: "小节用 1 与 1.1 编号", en: "Number sections as 1 and 1.1" },
    { zh: "表格用 booktabs 三线", en: "Tables use booktabs three-line rules" },
    { zh: "链接统一 hyperref 蓝", en: "Links use hyperref blue throughout" },
    { zh: "定理用浅底或左线", en: "Theorems use a light ground or a left rule" },
    { zh: "零圆角、零阴影", en: "Zero radius, zero shadow" },
  ],
  donts: [
    { zh: "不要给表格加竖线与斑马纹", en: "No verticals or zebra stripes in tables" },
    { zh: "不要用彩色大按钮与渐变", en: "No large colorful buttons or gradients" },
    { zh: "不要用无衬线正文", en: "No sans body copy" },
    { zh: "不要用任何圆角", en: "No radius anywhere" },
    { zh: "不要用阴影", en: "No shadows" },
    { zh: "不要用装饰图形与 emoji", en: "No decorative graphics or emoji" },
  ],
  promptGuide: {
    quickColors: {
      text: "#111111",
      background: "#ffffff",
      link: "#0b5394",
      theorem: "#f5f5f0",
      muted: "#6b6b66",
      rule: "#d4d4d0",
    },
    prompts: [
      {
        zh: "做一个论文排版页面：版心 700px、居中、全文衬线（Latin Modern Roman 或 Source Serif）、正文 14px、行高 1.55、两端对齐。标题用 1 / 1.1 编号、编号与标题间距 12px、26px 与 20px 700 字重。摘要用 36rem 窄块居中、上方 12px 居中小标题。表格用 booktabs：顶部 2px #111、表头下 1px #d4d4d0、底部 2px #111，绝无竖线。链接色 #0b5394。零圆角零阴影。",
        en: "Build a LaTeX paper page: a 700px measure, centred, serif throughout (Latin Modern Roman or Source Serif), body at 14px on 1.55 leading and justified. Headings number as 1 and 1.1 with a 12px gap, at 26px and 20px weight 700. The abstract is a 36rem centred block under a 12px centred label. Tables follow booktabs: 2px #111 on top, 1px #d4d4d0 under the header, 2px #111 at the bottom, and no verticals. Links are #0b5394. Zero radius, zero shadow.",
      },
    ],
  },
  similar: [
    { name: "Distill Style", why: { zh: "同为学术排版，但 Distill 有边注与突破版心的图表，LaTeX 更严守版心", en: "Both scholarly, though Distill adds sidenotes and breakout figures while LaTeX keeps the measure strict" } },
    { name: "F-Pattern Layout", why: { zh: "同样服务长文阅读，但 F 型优化扫读，LaTeX 优化细读", en: "Both serve long reading, though F-pattern optimizes scanning while LaTeX optimizes close reading" } },
  ],
  completeness: "full",
};
