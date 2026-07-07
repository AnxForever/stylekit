"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

// ─── RevealBlock ──────────────────────────────────────────────────────────────

function RevealBlock({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(10px)",
        transition: `opacity 0.45s ease-out ${delay}s, transform 0.45s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Typographic Primitives ───────────────────────────────────────────────────

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <h2 className="font-serif text-xl md:text-2xl tracking-tight text-[#111111] flex items-baseline gap-3 mb-5">
      <span className="font-bold">{number}</span>
      <span className="font-bold">{title}</span>
    </h2>
  );
}

function SubHeading({ number, title }: { number: string; title: string }) {
  return (
    <h3 className="font-serif text-base md:text-lg tracking-tight text-[#111111] flex items-baseline gap-3 mb-3">
      <span className="font-bold">{number}</span>
      <span className="font-bold italic">{title}</span>
    </h3>
  );
}

function Cite({ n }: { n: number }) {
  return (
    <a href="#references" className="text-[#0B5394] hover:underline underline-offset-2">
      [{n}]
    </a>
  );
}

function Asterism() {
  return (
    <div className="text-center font-serif text-[#6B6B66] tracking-[0.6em] py-2 select-none" aria-hidden="true">
      * * *
    </div>
  );
}

// ─── Figure 1 Data: Semantic Differential Profiles ───────────────────────────
// Method after Osgood, Suci and Tannenbaum (1957); profile-line presentation.
// Ratings on a 7-point bipolar scale, comparing two StyleKit styles.

const SD_PAIRS = [
  { left: "Calm", right: "Exciting", paper: 2, brutalist: 6 },
  { left: "Formal", right: "Casual", paper: 1, brutalist: 6 },
  { left: "Simple", right: "Complex", paper: 3, brutalist: 4 },
  { left: "Classic", right: "Novel", paper: 2, brutalist: 6 },
  { left: "Quiet", right: "Loud", paper: 1, brutalist: 7 },
  { left: "Precise", right: "Loose", paper: 1, brutalist: 5 },
  { left: "Serious", right: "Playful", paper: 2, brutalist: 7 },
  { left: "Restrained", right: "Expressive", paper: 2, brutalist: 7 },
];

const CHART_LEFT = 168;
const CHART_RIGHT = 508;
const ROW_TOP = 52;
const ROW_STEP = 34;

function scaleX(value: number): number {
  return CHART_LEFT + ((value - 1) * (CHART_RIGHT - CHART_LEFT)) / 6;
}

function rowY(index: number): number {
  return ROW_TOP + index * ROW_STEP;
}

function SemanticProfileFigure() {
  const paperPoints = SD_PAIRS.map((p, i) => `${scaleX(p.paper)},${rowY(i)}`).join(" ");
  const brutalistPoints = SD_PAIRS.map((p, i) => `${scaleX(p.brutalist)},${rowY(i)}`).join(" ");
  const bottomY = rowY(SD_PAIRS.length - 1);

  return (
    <svg
      viewBox="0 0 660 372"
      role="img"
      aria-label="Semantic differential profile chart comparing LaTeX Paper and Neo-Brutalist styles"
      className="w-full max-w-2xl mx-auto"
    >
      {/* Scale ticks 1-7 */}
      {[1, 2, 3, 4, 5, 6, 7].map((t) => (
        <g key={t}>
          <text
            x={scaleX(t)}
            y={30}
            textAnchor="middle"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="11"
            fill="#6B6B66"
          >
            {t}
          </text>
          <line
            x1={scaleX(t)}
            y1={40}
            x2={scaleX(t)}
            y2={bottomY + 12}
            stroke="#D4D4D0"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
        </g>
      ))}

      {/* Neutral midpoint rule */}
      <line x1={scaleX(4)} y1={40} x2={scaleX(4)} y2={bottomY + 12} stroke="#6B6B66" strokeWidth="1" />

      {/* Bipolar adjective labels */}
      {SD_PAIRS.map((p, i) => (
        <g key={p.left}>
          <text
            x={CHART_LEFT - 14}
            y={rowY(i) + 4}
            textAnchor="end"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="12"
            fill="#111111"
          >
            {p.left}
          </text>
          <text
            x={CHART_RIGHT + 14}
            y={rowY(i) + 4}
            textAnchor="start"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="12"
            fill="#111111"
          >
            {p.right}
          </text>
        </g>
      ))}

      {/* Profile: Neo-Brutalist (hyperref blue, dashed, square markers) */}
      <polyline points={brutalistPoints} fill="none" stroke="#0B5394" strokeWidth="1.5" strokeDasharray="5 3" />
      {SD_PAIRS.map((p, i) => (
        <rect
          key={`b-${p.left}`}
          x={scaleX(p.brutalist) - 3.5}
          y={rowY(i) - 3.5}
          width="7"
          height="7"
          fill="#FFFFFF"
          stroke="#0B5394"
          strokeWidth="1.5"
        />
      ))}

      {/* Profile: LaTeX Paper (ink, solid, circle markers) */}
      <polyline points={paperPoints} fill="none" stroke="#111111" strokeWidth="1.5" />
      {SD_PAIRS.map((p, i) => (
        <circle key={`p-${p.left}`} cx={scaleX(p.paper)} cy={rowY(i)} r="3.5" fill="#111111" />
      ))}

      {/* Legend */}
      <g>
        <line x1={CHART_LEFT} y1={352} x2={CHART_LEFT + 26} y2={352} stroke="#111111" strokeWidth="1.5" />
        <circle cx={CHART_LEFT + 13} cy={352} r="3.5" fill="#111111" />
        <text
          x={CHART_LEFT + 34}
          y={356}
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="12"
          fill="#111111"
        >
          LaTeX Paper
        </text>
        <line
          x1={CHART_LEFT + 150}
          y1={352}
          x2={CHART_LEFT + 176}
          y2={352}
          stroke="#0B5394"
          strokeWidth="1.5"
          strokeDasharray="5 3"
        />
        <rect x={CHART_LEFT + 159.5} y={348.5} width="7" height="7" fill="#FFFFFF" stroke="#0B5394" strokeWidth="1.5" />
        <text
          x={CHART_LEFT + 184}
          y={356}
          fontFamily="Georgia, 'Times New Roman', serif"
          fontSize="12"
          fill="#0B5394"
        >
          Neo-Brutalist
        </text>
      </g>
    </svg>
  );
}

// ─── Table 1 Data: Kano Classification with Better-Worse Coefficients ────────

const KANO_ROWS = [
  { feature: "Load time under 1 s", category: "Must-be (M)", better: "0.21", worse: "−0.83" },
  { feature: "CSV export", category: "One-dimensional (O)", better: "0.64", worse: "−0.57" },
  { feature: "Dark mode", category: "Attractive (A)", better: "0.72", worse: "−0.18" },
  { feature: "AI autocomplete", category: "Indifferent (I)", better: "0.24", worse: "−0.11" },
  { feature: "Confetti burst", category: "Indifferent (I)", better: "0.10", worse: "−0.05" },
];

// ─── References ───────────────────────────────────────────────────────────────

const REFERENCES = [
  "C. E. Osgood, G. J. Suci, and P. H. Tannenbaum, The Measurement of Meaning. Urbana: University of Illinois Press, 1957.",
  "M. Nagamachi, “Kansei engineering: A new ergonomic consumer-oriented technology for product development,” International Journal of Industrial Ergonomics, vol. 15, no. 1, pp. 3–11, 1995.",
  "T. Lavie and N. Tractinsky, “Assessing dimensions of perceived visual aesthetics of web sites,” International Journal of Human-Computer Studies, vol. 60, no. 3, pp. 269–298, 2004.",
  "N. Kano, N. Seraku, F. Takahashi, and S. Tsuji, “Attractive quality and must-be quality,” Journal of the Japanese Society for Quality Control, vol. 14, no. 2, pp. 147–156, 1984.",
  "C. Berger et al., “Kano’s methods for understanding customer-defined quality,” Center for Quality Management Journal, vol. 2, no. 4, pp. 3–36, 1993.",
  "G. Lindgaard, G. Fernandes, C. Dudek, and J. Brown, “Attention web designers: You have 50 milliseconds to make a good first impression!,” Behaviour and Information Technology, vol. 25, no. 2, pp. 115–126, 2006.",
];

// ─── Citation Formats ─────────────────────────────────────────────────────────

const CITATIONS: Record<string, string> = {
  BibTeX: `@article{stylekit2026latex,
  title   = {Order as Interface: Typesetting
             the Web like a Paper},
  author  = {Researcher, A. and Coauthor, B.},
  journal = {The Web Typography Letters},
  volume  = {12},
  pages   = {1--18},
  year    = {2026}
}`,
  APA: `Researcher, A., & Coauthor, B. (2026). Order as interface: Typesetting the web like a paper. The Web Typography Letters, 12, 1-18.`,
  MLA: `Researcher, A., and B. Coauthor. "Order as Interface: Typesetting the Web like a Paper." The Web Typography Letters, vol. 12, 2026, pp. 1-18.`,
};

// ─── Main Showcase ────────────────────────────────────────────────────────────

export default function LatexPaperShowcaseContent() {
  const [showProof, setShowProof] = useState(false);
  const [citeFormat, setCiteFormat] = useState<"BibTeX" | "APA" | "MLA">("BibTeX");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-serif">
      {/* ─── Section 1: Running Head ──────────────────────────────────────── */}
      <header className="border-b border-[#D4D4D0] bg-[#FFFFFF] sticky top-0 z-20">
        <nav className="max-w-3xl mx-auto px-6 py-3 flex items-baseline justify-between text-sm">
          <Link
            href="/styles/latex-paper"
            className="text-[#0B5394] hover:underline underline-offset-2"
          >
            &larr; Back to style
          </Link>
          <span className="hidden md:inline italic text-[#6B6B66]">
            J. Web Typogr. 12 (2026) 1&ndash;18
          </span>
          <div className="flex items-baseline gap-4">
            <a href="#abstract" className="text-[#0B5394] hover:underline underline-offset-2">Abstract</a>
            <a href="#figure-1" className="text-[#0B5394] hover:underline underline-offset-2">Figures</a>
            <a href="#references" className="text-[#0B5394] hover:underline underline-offset-2">References</a>
          </div>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-6 pb-8">
        {/* ─── Section 2: Document Head ──────────────────────────────────── */}
        <RevealBlock>
          <section className="pt-14 pb-4 text-center">
            <h1 className="text-3xl md:text-4xl tracking-tight leading-snug max-w-2xl mx-auto">
              Order as Interface: Typesetting the Web like a Paper
            </h1>
            <p className="text-sm mt-6">
              A. Researcher<sup className="text-[#0B5394]">1</sup>
              <span className="inline-block w-6" />
              B. Coauthor<sup className="text-[#0B5394]">2</sup>
              <span className="inline-block w-6" />
              C. Reviewer<sup className="text-[#0B5394]">1</sup>
            </p>
            <p className="text-sm text-[#6B6B66] mt-1.5">
              <sup>1</sup>Institute of Web Typography
              <span className="inline-block w-4" />
              <sup>2</sup>Department of Design Science
            </p>
            <p className="text-sm italic text-[#6B6B66] mt-1.5">July 5, 2026</p>
          </section>
        </RevealBlock>

        {/* ─── Section 3: Abstract + Keywords ────────────────────────────── */}
        <RevealBlock>
          <section id="abstract" className="py-6">
            <div className="max-w-xl mx-auto px-6 md:px-8">
              <p className="text-sm font-bold text-center mb-2.5">Abstract</p>
              <p className="text-sm leading-relaxed text-justify">
                We port the typographic system of academic papers to the web.
                Numbered sections, theorem environments, display equations,
                booktabs tables, and hanging-indent references give every element
                a unique, citable coordinate. We argue that this visible order is
                itself an interface: it tells readers where they are, what can be
                referenced, and why the content deserves trust. Two instruments
                from design science &mdash; the semantic differential <Cite n={1} /> and
                the Kano model <Cite n={4} /> &mdash; are typeset below as a working
                demonstration.
              </p>
              <p className="text-sm mt-4 leading-relaxed">
                <span className="ltx-smallcaps font-bold" style={{ fontVariant: "small-caps" }}>
                  Keywords:
                </span>{" "}
                <span className="italic">
                  typesetting, theorem environments, numbered equations, booktabs,
                  scholarly interfaces
                </span>
              </p>
            </div>
          </section>
        </RevealBlock>

        {/* ─── Section 4: Contents ───────────────────────────────────────── */}
        <RevealBlock>
          <section className="py-6 max-w-xl mx-auto">
            <p className="text-sm font-bold text-center mb-3">Contents</p>
            <ol className="text-sm space-y-1.5">
              {[
                { n: "1", t: "Introduction", href: "#sec-1", page: "1" },
                { n: "2", t: "Theorem Environments and Equations", href: "#sec-2", page: "2" },
                { n: "3", t: "Figures", href: "#figure-1", page: "3" },
                { n: "4", t: "Tables", href: "#sec-4", page: "4" },
                { n: "5", t: "Notation and Palette", href: "#sec-5", page: "5" },
                { n: "6", t: "Artifacts and Correspondence", href: "#sec-6", page: "6" },
                { n: "A", t: "Appendix: Style Rules", href: "#appendix-a", page: "8" },
              ].map((item) => (
                <li key={item.n} className="flex items-baseline gap-3">
                  <span className="font-bold w-4 text-right">{item.n}</span>
                  <a href={item.href} className="text-[#0B5394] hover:underline underline-offset-2">
                    {item.t}
                  </a>
                  <span className="flex-1 border-b border-dotted border-[#D4D4D0] translate-y-[-3px]" />
                  <span className="text-[#6B6B66]">{item.page}</span>
                </li>
              ))}
            </ol>
          </section>
        </RevealBlock>

        <Asterism />

        {/* ─── Section 5: 1 Introduction (typography specimen) ───────────── */}
        <RevealBlock>
          <section id="sec-1" className="py-8">
            <SectionHeading number="1" title="Introduction" />
            <p className="text-[15px] leading-relaxed text-justify mb-4">
              A paper does not decorate; it enumerates. Where a marketing page
              reaches for gradients, the paper reaches for a section number.
              Empirical work suggests that first aesthetic impressions form
              within 50 milliseconds <Cite n={6} />, and the impression this
              style aims to give is a precise one: <em>someone checked this</em>.
              Sentences sit in a measured column, citations resolve to a numbered
              list, and each claim can be pointed at without ambiguity
              <sup className="text-[#0B5394]">
                <a href="#footnotes" className="hover:underline">1</a>
              </sup>
              .
            </p>

            <SubHeading number="1.1" title="Type specimen" />
            <div className="border border-[#D4D4D0] px-6 py-5 mb-6 space-y-3">
              <p className="text-3xl tracking-tight">Section heading, 30 px</p>
              <p className="text-xl tracking-tight">Subsection heading, 20 px</p>
              <p className="text-[15px] leading-relaxed">
                Body text at 15 px with relaxed leading, set in a serif that
                recalls Computer Modern. Emphasis is <em>italic</em>, never
                colored; strong emphasis is <strong>bold</strong>, used sparingly.
              </p>
              <p className="text-sm text-[#6B6B66] italic">
                Caption and marginalia at 14 px, muted ink.
              </p>
              <p className="text-sm font-mono bg-[#F5F5F0] px-3 py-2">
                \usepackage{"{booktabs}"} % monospace for verbatim
              </p>
            </div>

            <SubHeading number="1.2" title="Cross-references" />
            <p className="text-[15px] leading-relaxed text-justify">
              Blue in this document means exactly one thing: it can be followed.
              Theorem <a href="#sec-2" className="text-[#0B5394] hover:underline underline-offset-2">1</a> states
              the coefficients tabulated in Table{" "}
              <a href="#sec-4" className="text-[#0B5394] hover:underline underline-offset-2">1</a>, and
              Figure <a href="#figure-1" className="text-[#0B5394] hover:underline underline-offset-2">1</a> profiles
              this style against its temperamental opposite.
            </p>
          </section>
        </RevealBlock>

        {/* ─── Section 6: 2 Theorem Environments + Numbered Equations ───── */}
        <RevealBlock>
          <section id="sec-2" className="py-8">
            <SectionHeading number="2" title="Theorem Environments and Equations" />

            <div className="bg-[#FFFFFF] border border-[#111111] border-l-2 px-6 py-4 mb-6">
              <p className="text-[15px] leading-relaxed">
                <span className="font-bold">Definition 1 (Kano categories).</span>{" "}
                <span className="italic">
                  Let A, O, M, and I denote the number of respondents classifying
                  a feature as Attractive, One-dimensional, Must-be, and
                  Indifferent, respectively <Cite n={4} />.
                </span>
              </p>
            </div>

            <div className="bg-[#F5F5F0] border-l-2 border-[#111111] px-6 py-5 mb-2">
              <p className="text-[15px] leading-relaxed">
                <span className="font-bold">Theorem 1 (Better&ndash;Worse coefficients).</span>{" "}
                <span className="italic">
                  Under Definition 1, the expected gain in satisfaction from
                  providing a feature, and the expected loss from omitting it,
                  are given by equations (1) and (2) <Cite n={5} />.
                </span>
              </p>

              {/* Equation (1) */}
              <div className="flex items-baseline my-5">
                <p className="flex-1 text-center text-[16px] italic">
                  Better = (A + O) / (A + O + M + I)
                </p>
                <p className="not-italic text-[15px]">(1)</p>
              </div>

              {/* Equation (2) */}
              <div className="flex items-baseline mb-4">
                <p className="flex-1 text-center text-[16px] italic">
                  Worse = &minus;(O + M) / (A + O + M + I)
                </p>
                <p className="not-italic text-[15px]">(2)</p>
              </div>

              <button
                onClick={() => setShowProof(!showProof)}
                className="text-sm text-[#0B5394] hover:underline underline-offset-2"
              >
                {showProof ? "Hide proof sketch ▴" : "Show proof sketch ▾"}
              </button>

              {showProof && (
                <div className="mt-4 pt-4 border-t border-[#D4D4D0]">
                  <p className="text-sm leading-relaxed text-justify">
                    <span className="italic">Proof sketch.</span> Attractive and
                    One-dimensional responses are precisely those whose
                    satisfaction increases when the feature is present, hence the
                    numerator of (1); One-dimensional and Must-be responses are
                    those whose satisfaction decreases when it is absent, hence
                    (2) with a negative sign. Normalizing by A + O + M + I
                    bounds both coefficients in [&minus;1, 1].{" "}
                    <span className="float-right not-italic">&#9633;</span>
                  </p>
                </div>
              )}
            </div>

            <div className="border-l-2 border-[#D4D4D0] px-6 py-3 mt-6">
              <p className="text-sm leading-relaxed text-[#6B6B66]">
                <span className="font-bold not-italic text-[#111111]">Remark 1.</span>{" "}
                <span className="italic">
                  Classifications decay over time: a television remote rated
                  Attractive in 1983 had become Must-be by 1998. A Kano table is
                  a snapshot, not a constitution.
                </span>
              </p>
            </div>
          </section>
        </RevealBlock>

        {/* ─── Section 7: 3 Figure 1 (SD profile chart) ─────────────────── */}
        <RevealBlock>
          <section id="figure-1" className="py-8">
            <SectionHeading number="3" title="Figures" />
            <p className="text-[15px] leading-relaxed text-justify mb-6">
              Graphics enter a paper only as numbered, captioned figures. Below,
              the classic profile-line presentation of the semantic differential{" "}
              <Cite n={1} /> compares this style with Neo-Brutalist on eight
              bipolar adjective pairs, rated on a 7-point scale &mdash; the same
              instrument used to build product personalities in Kansei
              engineering <Cite n={2} /> and to factor web aesthetics into
              classical and expressive dimensions <Cite n={3} />.
            </p>

            <div className="border border-[#D4D4D0] px-4 py-6">
              <SemanticProfileFigure />
            </div>
            <p className="text-sm text-center leading-relaxed mt-3 max-w-xl mx-auto">
              <span className="font-bold">Figure 1:</span> Semantic differential
              profiles of the <span className="italic">LaTeX Paper</span> (solid
              ink) and <span className="italic">Neo-Brutalist</span> (dashed
              blue) styles; 8 bipolar pairs, 7-point scale, midpoint at 4.
            </p>
          </section>
        </RevealBlock>

        {/* ─── Section 8: 4 Table 1 (booktabs) ───────────────────────────── */}
        <RevealBlock>
          <section id="sec-4" className="py-8">
            <SectionHeading number="4" title="Tables" />
            <p className="text-[15px] leading-relaxed text-justify mb-6">
              Tables follow the booktabs discipline: a heavy rule above and
              below, a thin rule beneath the header, and not a single vertical
              line. The caption sits above the table, as tradition demands.
            </p>

            <p className="text-sm text-center leading-relaxed mb-3 max-w-xl mx-auto">
              <span className="font-bold">Table 1:</span> Kano classification of
              dashboard features with Better&ndash;Worse coefficients computed
              from equations (1) and (2).
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border-t-2 border-b-2 border-[#111111] text-[15px]">
                <thead>
                  <tr className="border-b border-[#111111]">
                    <th className="text-left font-normal italic px-3 py-2.5">Feature</th>
                    <th className="text-left font-normal italic px-3 py-2.5">Category</th>
                    <th className="text-right font-normal italic px-3 py-2.5">Better</th>
                    <th className="text-right font-normal italic px-3 py-2.5">Worse</th>
                  </tr>
                </thead>
                <tbody>
                  {KANO_ROWS.map((row) => (
                    <tr key={row.feature}>
                      <td className="px-3 py-2">{row.feature}</td>
                      <td className="px-3 py-2">{row.category}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{row.better}</td>
                      <td className="px-3 py-2 text-right tabular-nums">{row.worse}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-[#6B6B66] leading-relaxed mt-2">
              <span className="italic">Note.</span> 37% of respondents classified
              the confetti burst as Reverse (R) &mdash; delight is not universally
              delightful.
            </p>
          </section>
        </RevealBlock>

        {/* ─── Section 9: 5 Notation and Palette ─────────────────────────── */}
        <RevealBlock>
          <section id="sec-5" className="py-8">
            <SectionHeading number="5" title="Notation and Palette" />
            <p className="text-[15px] leading-relaxed text-justify mb-6">
              The entire document is set with five inks. Even the palette is
              typeset as a table rather than painted as swatch cards.
            </p>

            <p className="text-sm text-center leading-relaxed mb-3 max-w-xl mx-auto">
              <span className="font-bold">Table 2:</span> The five-color notation
              of the LaTeX Paper style.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border-t-2 border-b-2 border-[#111111] text-[15px]">
                <thead>
                  <tr className="border-b border-[#111111]">
                    <th className="text-left font-normal italic px-3 py-2.5">Symbol</th>
                    <th className="text-left font-normal italic px-3 py-2.5">Role</th>
                    <th className="text-left font-normal italic px-3 py-2.5">Value</th>
                    <th className="text-left font-normal italic px-3 py-2.5">Specimen</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { sym: "ink", role: "Text, heavy rules, primary buttons", hex: "#111111" },
                    { sym: "paper", role: "The page itself", hex: "#FFFFFF" },
                    { sym: "href", role: "Links and cross-references only", hex: "#0B5394" },
                    { sym: "thm", role: "Theorem environment fill", hex: "#F5F5F0" },
                    { sym: "rule", role: "Thin rules and field borders", hex: "#D4D4D0" },
                  ].map((c) => (
                    <tr key={c.sym}>
                      <td className="px-3 py-2 italic">{c.sym}</td>
                      <td className="px-3 py-2">{c.role}</td>
                      <td className="px-3 py-2 font-mono text-sm">{c.hex}</td>
                      <td className="px-3 py-2">
                        <span
                          className="inline-block w-10 h-4 border border-[#D4D4D0] align-middle"
                          style={{ backgroundColor: c.hex }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </RevealBlock>

        <Asterism />

        {/* ─── Section 10: 6 Artifacts (buttons, badges, progress) ──────── */}
        <RevealBlock>
          <section id="sec-6" className="py-8">
            <SectionHeading number="6" title="Artifacts and Correspondence" />

            <SubHeading number="6.1" title="Actions as paper artifacts" />
            <p className="text-[15px] leading-relaxed text-justify mb-5">
              Buttons in this style behave like the artifacts of a publication:
              a solid-ink imperative, a ruled alternative, and citation-shaped
              links in hyperref blue.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <button className="px-6 py-2.5 bg-[#111111] text-[#FFFFFF] text-sm tracking-tight border border-[#111111] hover:bg-[#FFFFFF] hover:text-[#111111] transition-colors duration-200">
                Download PDF
              </button>
              <button className="px-6 py-2.5 bg-transparent text-[#111111] text-sm tracking-tight border border-[#111111] hover:bg-[#F5F5F0] transition-colors duration-200">
                View Source
              </button>
              <button className="px-6 py-2.5 bg-transparent text-[#6B6B66] text-sm tracking-tight border border-[#D4D4D0] hover:border-[#111111] hover:text-[#111111] transition-colors duration-200">
                Supplementary
              </button>
              <button className="text-sm text-[#0B5394] hover:underline underline-offset-2">
                [BibTeX]
              </button>
              <button className="text-sm text-[#0B5394] hover:underline underline-offset-2">
                [DOI]
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              {["peer-reviewed", "open access", "v2 revised", "dataset", "erratum"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-sm border border-[#111111] text-[#111111]"
                  style={{ fontVariant: "small-caps" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <SubHeading number="6.2" title="Review pipeline" />
            <div className="space-y-3 mb-8 max-w-xl">
              {[
                { stage: "Submitted", pct: 100 },
                { stage: "Under review", pct: 100 },
                { stage: "Revisions", pct: 60 },
                { stage: "Camera-ready", pct: 15 },
              ].map((s) => (
                <div key={s.stage} className="flex items-center gap-4">
                  <span className="text-sm w-32 shrink-0">{s.stage}</span>
                  <div className="flex-1 h-2 border border-[#111111] bg-[#FFFFFF]">
                    <div className="h-full bg-[#111111]" style={{ width: `${s.pct}%` }} />
                  </div>
                  <span className="text-sm text-[#6B6B66] w-10 text-right tabular-nums">{s.pct}%</span>
                </div>
              ))}
            </div>

            <SubHeading number="6.3" title="Correspondence" />
            <form
              className="border border-[#D4D4D0] px-6 py-5 max-w-xl"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="ltx-name" className="block text-sm mb-1.5">
                    Name<span className="text-[#0B5394]">*</span>
                  </label>
                  <input
                    id="ltx-name"
                    type="text"
                    placeholder="A. Reader"
                    className="w-full px-3 py-2 bg-[#FFFFFF] text-sm text-[#111111] placeholder:text-[#6B6B66] placeholder:italic border border-[#D4D4D0] focus:outline-none focus:border-[#111111] transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="ltx-email" className="block text-sm mb-1.5">
                    Email<span className="text-[#0B5394]">*</span>
                  </label>
                  <input
                    id="ltx-email"
                    type="email"
                    placeholder="name@university.edu"
                    className="w-full px-3 py-2 bg-[#FFFFFF] text-sm text-[#111111] placeholder:text-[#6B6B66] placeholder:italic border border-[#D4D4D0] focus:outline-none focus:border-[#111111] transition-colors duration-200"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="ltx-type" className="block text-sm mb-1.5">
                  Correspondence type
                </label>
                <select
                  id="ltx-type"
                  className="w-full px-3 py-2 bg-[#FFFFFF] text-sm text-[#111111] border border-[#D4D4D0] focus:outline-none focus:border-[#111111] transition-colors duration-200"
                >
                  <option>Comment on the paper</option>
                  <option>Request for data</option>
                  <option>Reported erratum</option>
                  <option>Collaboration inquiry</option>
                </select>
              </div>
              <div className="mb-5">
                <label htmlFor="ltx-msg" className="block text-sm mb-1.5">
                  Message
                </label>
                <textarea
                  id="ltx-msg"
                  rows={4}
                  placeholder="Dear authors, regarding equation (2)..."
                  className="w-full px-3 py-2 bg-[#FFFFFF] text-sm text-[#111111] placeholder:text-[#6B6B66] placeholder:italic border border-[#D4D4D0] focus:outline-none focus:border-[#111111] transition-colors duration-200 resize-none"
                />
              </div>
              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#111111] text-[#FFFFFF] text-sm tracking-tight border border-[#111111] hover:bg-[#FFFFFF] hover:text-[#111111] transition-colors duration-200"
                >
                  Submit letter
                </button>
                {submitted && (
                  <p className="text-sm italic text-[#6B6B66]">
                    Manuscript received. Assigned no. 2026-0705.
                  </p>
                )}
              </div>
            </form>
          </section>
        </RevealBlock>

        {/* ─── Section 11: 7 Editorial Environments (alerts) ─────────────── */}
        <RevealBlock>
          <section className="py-8">
            <SectionHeading number="7" title="Editorial Environments" />
            <p className="text-[15px] leading-relaxed text-justify mb-6">
              Status messages wear the clothes of editorial apparatus: notes,
              verifications, cautions, and errata &mdash; each a labeled
              environment, never a colored pill.
            </p>
            <div className="space-y-4">
              <div className="border-l-2 border-[#0B5394] bg-[#FFFFFF] px-5 py-3">
                <p className="text-sm leading-relaxed">
                  <span className="font-bold text-[#0B5394]">Note.</span>{" "}
                  <span className="italic">
                    A revised preprint of this document is available on the
                    repository.
                  </span>
                </p>
              </div>
              <div className="border-l-2 border-[#111111] bg-[#F5F5F0] px-5 py-3">
                <p className="text-sm leading-relaxed">
                  <span className="font-bold">Verified.</span>{" "}
                  <span className="italic">
                    All numerical results in Table 1 were reproduced by an
                    independent reviewer.
                  </span>
                </p>
              </div>
              <div className="border border-[#111111] bg-[#FFFFFF] px-5 py-3">
                <p className="text-sm leading-relaxed">
                  <span className="font-bold">Caution.</span>{" "}
                  <span className="italic">
                    Kano classifications are unstable below N = 200 respondents;
                    interpret the coefficients accordingly.
                  </span>
                </p>
              </div>
              <div className="border-l-2 border-[#111111] bg-[#FFFFFF] px-5 py-3">
                <p className="text-sm leading-relaxed">
                  <span className="font-bold">Erratum.</span>{" "}
                  <span className="italic">
                    In the first printing, equation (2) omitted the negative
                    sign. Corrected on July 5, 2026.
                  </span>
                </p>
              </div>
            </div>
          </section>
        </RevealBlock>

        {/* ─── Section 12: 8 Quotation and Footnotes ─────────────────────── */}
        <RevealBlock>
          <section className="py-8">
            <SectionHeading number="8" title="Quotation" />
            <blockquote className="max-w-xl mx-auto px-8 md:px-10 py-2 my-4">
              <p className="text-[15px] italic leading-relaxed text-center">
                &ldquo;The measurement of meaning begins the moment we admit
                that impressions can be placed on a scale.&rdquo;
              </p>
              <footer className="text-sm text-[#6B6B66] text-center mt-3">
                &mdash; after Osgood, Suci and Tannenbaum <Cite n={1} />
              </footer>
            </blockquote>

            <div id="footnotes" className="mt-10 pt-4 border-t border-[#D4D4D0] max-w-md">
              <p className="text-sm leading-relaxed text-[#6B6B66]">
                <sup className="text-[#0B5394]">1</sup> Precision of reference is
                the paper&apos;s answer to the hyperlink: it worked for three
                centuries before the anchor tag.
              </p>
            </div>
          </section>
        </RevealBlock>

        {/* ─── Section 13: Cite This Paper (tabs) ────────────────────────── */}
        <RevealBlock>
          <section className="py-8">
            <SectionHeading number="9" title="Citing This Document" />
            <div className="border border-[#111111] max-w-xl">
              <div className="flex border-b border-[#111111]">
                {(["BibTeX", "APA", "MLA"] as const).map((format) => (
                  <button
                    key={format}
                    onClick={() => setCiteFormat(format)}
                    className={`px-5 py-2 text-sm tracking-tight border-r border-[#111111] last:border-r-0 transition-colors duration-200 ${
                      citeFormat === format
                        ? "bg-[#111111] text-[#FFFFFF]"
                        : "bg-[#FFFFFF] text-[#111111] hover:bg-[#F5F5F0]"
                    }`}
                  >
                    {format}
                  </button>
                ))}
              </div>
              <pre className="px-5 py-4 bg-[#F5F5F0] text-[13px] font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto">
                {CITATIONS[citeFormat]}
              </pre>
            </div>
          </section>
        </RevealBlock>

        {/* ─── Section 14: References (hanging indent) ───────────────────── */}
        <RevealBlock>
          <section id="references" className="py-8">
            <h2 className="font-serif text-xl md:text-2xl tracking-tight font-bold mb-5">
              References
            </h2>
            <ol className="text-sm leading-relaxed space-y-2.5">
              {REFERENCES.map((ref, i) => (
                <li key={ref} className="pl-8 -indent-8">
                  <span className="inline-block w-8 text-[#111111]">[{i + 1}]</span>
                  {ref}
                </li>
              ))}
            </ol>
          </section>
        </RevealBlock>

        {/* ─── Section 15: Appendix A — Style Rules ──────────────────────── */}
        <RevealBlock>
          <section id="appendix-a" className="py-8">
            <SectionHeading number="A" title="Appendix: Style Rules" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-[15px] font-bold mb-3">A.1&emsp;Commands</p>
                <ul className="text-sm leading-relaxed space-y-2">
                  {[
                    "Serif throughout; headings tracked tight",
                    "Number sections 1 / 1.1 / 1.2, equations (n), figures and tables",
                    "Abstract as a narrow, centered, indented block",
                    "Theorem boxes: bold label, italic body, light fill or left rule",
                    "booktabs tables: heavy top and bottom rules, thin midrule",
                    "References with hanging indents and [n] labels",
                    "Blue #0B5394 exclusively for links and cross-references",
                  ].map((rule) => (
                    <li key={rule} className="pl-5 -indent-5">
                      <span className="inline-block w-5 text-[#111111]">+</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[15px] font-bold mb-3">A.2&emsp;Prohibitions</p>
                <ul className="text-sm leading-relaxed space-y-2 text-[#6B6B66]">
                  {[
                    "Vertical rules or zebra stripes in tables",
                    "Colorful buttons, gradients, brand palettes",
                    "Sans-serif body text",
                    "Rounded corners of any radius",
                    "Shadows; paper is flat",
                    "Decorative graphics outside numbered figures",
                  ].map((rule) => (
                    <li key={rule} className="pl-5 -indent-5">
                      <span className="inline-block w-5">&minus;</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </RevealBlock>

        <Asterism />
      </main>

      {/* ─── Section 16: Footer (page number) ────────────────────────────── */}
      <footer className="border-t border-[#D4D4D0] py-8">
        <div className="max-w-3xl mx-auto px-6 text-center text-sm">
          <p className="text-[#111111]">18</p>
          <p className="italic text-[#6B6B66] mt-3">
            Preprint typeset with the{" "}
            <span className="not-italic">LaTeX Paper</span> style &mdash;
            everything numbered, everything citable.
          </p>
          <p className="mt-2">
            <Link
              href="/styles/latex-paper"
              className="text-[#0B5394] hover:underline underline-offset-2"
            >
              Return to style page
            </Link>
            <span className="mx-3 text-[#D4D4D0]">|</span>
            <Link href="/styles" className="text-[#0B5394] hover:underline underline-offset-2">
              Browse all styles
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
