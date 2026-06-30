// Design principles (CRAP) — system-layer foundations.
//
// Contrast, Repetition, Alignment, Proximity: the four principles that turn a
// pile of correct tokens (color, type, spacing) into a composition that reads
// as intentional. This module is self-contained — structured principle data,
// a copyable self-review checklist, and a markdown generator — so it can be
// unit-tested without touching the React layer.

export type PrincipleId = "contrast" | "repetition" | "alignment" | "proximity";

export interface PrincipleSnippet {
  lang: string;
  code: string;
}

export interface DesignPrinciple {
  id: PrincipleId;
  /** Single uppercase letter of the CRAP mnemonic. */
  letter: string;
  name: string;
  nameZh: string;
  definition: string;
  definitionZh: string;
  /** One-line memory hook. */
  mnemonic: string;
  mnemonicZh: string;
  /** Self-review questions, en/zh paired. */
  checklist: { en: string; zh: string }[];
  /** Minimal reference implementation for the principle. */
  snippet: PrincipleSnippet;
}

export const DESIGN_PRINCIPLES: DesignPrinciple[] = [
  {
    id: "contrast",
    letter: "C",
    name: "Contrast",
    nameZh: "对比",
    definition:
      "If two elements are not the same, make them clearly different — never almost the same. Contrast creates hierarchy and pulls the eye to what matters.",
    definitionZh:
      "如果两个元素不一样，就让它们明显不一样，绝不似是而非。对比建立层次，把视线引向最重要的东西。",
    mnemonic: "Don't be timid — if elements differ, make them differ boldly.",
    mnemonicZh: "别犹豫——元素要有别，就让差异够大。",
    checklist: [
      {
        en: "Headings and body text have an obvious jump in size and weight, not a subtle one.",
        zh: "标题和正文在字号、字重上有明显的跳变，而不是细微差别。",
      },
      {
        en: "Primary and secondary actions carry clearly different visual weight.",
        zh: "主次操作的视觉重量明显不同。",
      },
      {
        en: "Key information stands out by size, color, or weight — not by italics alone.",
        zh: "关键信息靠大小、颜色或字重跳出，而不是只靠斜体。",
      },
    ],
    snippet: {
      lang: "css",
      code: [
        ".title {",
        "  font-size: 2.5rem;",
        "  font-weight: 700;",
        "}",
        ".body {",
        "  font-size: 1rem;",
        "  font-weight: 400;",
        "  color: var(--muted);",
        "}",
      ].join("\n"),
    },
  },
  {
    id: "repetition",
    letter: "R",
    name: "Repetition",
    nameZh: "重复",
    definition:
      "Repeat visual elements — color, shape, type, spacing — throughout the design. Repetition builds unity and makes a layout feel like one system instead of scattered parts.",
    definitionZh:
      "在整个设计中重复视觉元素——颜色、形状、字体、间距。重复建立统一感，让布局像一个系统，而不是零散的拼凑。",
    mnemonic: "Reuse the same tokens everywhere — consistency reads as intention.",
    mnemonicZh: "到处复用同一套 token——一致会被读成「刻意」。",
    checklist: [
      {
        en: "Radius, shadow, and spacing all come from one shared token set.",
        zh: "圆角、阴影、间距都取自同一套共享 token。",
      },
      {
        en: "Elements of the same kind share the same style — every card looks like a card.",
        zh: "同类元素样式一致——每张卡片都像卡片。",
      },
      {
        en: "Brand color and type recur across sections to tie the page together.",
        zh: "品牌色和字体在各区块反复出现，把页面串成一体。",
      },
    ],
    snippet: {
      lang: "css",
      code: [
        ":root {",
        "  --radius: 8px;",
        "  --shadow: 0 1px 3px rgb(0 0 0 / 0.1);",
        "}",
        ".card {",
        "  border-radius: var(--radius);",
        "  box-shadow: var(--shadow);",
        "}",
      ].join("\n"),
    },
  },
  {
    id: "alignment",
    letter: "A",
    name: "Alignment",
    nameZh: "对齐",
    definition:
      "Every element should have a visual connection to something else on the page. Nothing is placed arbitrarily — shared edges and baselines create an invisible order the eye trusts.",
    definitionZh:
      "页面上每个元素都该和别的元素有视觉连接。没有东西是随手一放的——共享的边线和基线建立起一种眼睛信赖的隐形秩序。",
    mnemonic: "Nothing floats — put everything on a shared edge or baseline.",
    mnemonicZh: "没有东西该飘着——一切都落在共享的边线或基线上。",
    checklist: [
      {
        en: "Elements share alignment edges instead of each sitting on its own.",
        zh: "元素共享对齐边，而不是各自为政。",
      },
      {
        en: "Avoid mixing centered and left-aligned text in the same block.",
        zh: "同一区块里避免居中与左对齐混用。",
      },
      {
        en: "A grid or shared left edge constrains where things land.",
        zh: "用网格或共享左边线约束元素的落点。",
      },
    ],
    snippet: {
      lang: "css",
      code: [
        ".form {",
        "  display: grid;",
        "  gap: 12px;",
        "}",
        ".form > * {",
        "  text-align: left;",
        "}",
      ].join("\n"),
    },
  },
  {
    id: "proximity",
    letter: "P",
    name: "Proximity",
    nameZh: "亲密性",
    definition:
      "Group related items close together and push unrelated ones apart. Proximity turns scattered elements into a few clear units, cutting the work the reader's eye has to do.",
    definitionZh:
      "把相关的东西聚拢、把无关的推远。亲密性把零散元素归并成几个清晰的单元，减少读者眼睛要做的功。",
    mnemonic: "Closeness equals relationship — group by meaning, not by gut.",
    mnemonicZh: "靠近 = 相关——按含义分组，而不是凭手感。",
    checklist: [
      {
        en: "A label sits tight against the input it describes, not floating between two.",
        zh: "标签紧贴它所描述的输入框，而不是漂在两者之间。",
      },
      {
        en: "Related items form a group with more whitespace between groups than within.",
        zh: "相关项成组，组与组之间的留白大于组内留白。",
      },
      {
        en: "Lonely, ungrouped elements are pulled into the unit they belong to.",
        zh: "孤立、未分组的元素被归入它所属的单元。",
      },
    ],
    snippet: {
      lang: "css",
      code: [
        ".field {",
        "  display: flex;",
        "  flex-direction: column;",
        "  gap: 4px;",
        "}",
        ".form {",
        "  display: flex;",
        "  flex-direction: column;",
        "  gap: 24px;",
        "}",
      ].join("\n"),
    },
  },
];

/** Look up a principle by its CRAP letter (case-insensitive). */
export function principleByLetter(letter: string): DesignPrinciple | undefined {
  const upper = letter.toUpperCase();
  return DESIGN_PRINCIPLES.find((p) => p.letter === upper);
}

export interface ChecklistEntry {
  principle: PrincipleId;
  letter: string;
  en: string;
  zh: string;
}

/** Flatten every principle's checklist into one list, tagged with its origin. */
export function allChecklist(): ChecklistEntry[] {
  return DESIGN_PRINCIPLES.flatMap((p) =>
    p.checklist.map((item) => ({
      principle: p.id,
      letter: p.letter,
      en: item.en,
      zh: item.zh,
    })),
  );
}

/** Render a copyable markdown self-review checklist. */
export function generateChecklistMarkdown(locale: "en" | "zh" = "en"): string {
  const title = locale === "zh" ? "# CRAP 设计自查清单" : "# CRAP Design Checklist";
  const lines: string[] = [title, ""];
  for (const p of DESIGN_PRINCIPLES) {
    const name = locale === "zh" ? p.nameZh : p.name;
    lines.push(`## ${p.letter} — ${name}`);
    for (const item of p.checklist) {
      lines.push(`- [ ] ${locale === "zh" ? item.zh : item.en}`);
    }
    lines.push("");
  }
  return lines.join("\n").trim();
}
