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
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s ease-out ${delay}s, transform 0.5s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Scholarly primitives ─────────────────────────────────────────────────────

function Cite({ n }: { n: number }) {
  return (
    <sup className="font-sans text-[11px] font-semibold text-[#2A7AE2] cursor-pointer hover:underline">
      [{n}]
    </sup>
  );
}

function Sidenote({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <span className="block my-4 rounded-sm border-l-2 border-[#2A7AE2]/40 bg-[#F3F4F6] px-3.5 py-2.5 font-sans text-[13px] leading-relaxed text-[#6B7280] xl:absolute xl:top-1 xl:right-[-14rem] xl:my-0 xl:w-48 xl:rounded-none xl:border-l-0 xl:border-t xl:border-[#E5E7EB] xl:bg-transparent xl:px-0 xl:py-0 xl:pt-2 xl:text-xs">
      <span className="font-medium text-[#2A7AE2]">{label}</span> {children}
    </span>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-serif text-[1.0625rem] leading-[1.75] text-[#1F2933]">{children}</p>
  );
}

function SectionHeading({ no, zh, en }: { no: string; zh: string; en: string }) {
  return (
    <h2 className="font-serif text-2xl md:text-[1.75rem] font-semibold tracking-tight text-[#1F2933] pt-2">
      <span className="text-[#9CA3AF] mr-3">{no}</span>
      {zh}
      <span className="ml-3 font-sans text-[11px] font-normal uppercase tracking-[0.16em] text-[#9CA3AF] align-middle">
        {en}
      </span>
    </h2>
  );
}

function SectionDivider() {
  return (
    <div className="max-w-[42rem] mx-auto px-4 md:px-6 py-10 flex items-center gap-4">
      <hr className="flex-1 border-t border-[#E5E7EB]" />
      <span className="font-serif text-sm text-[#9CA3AF]">&sect;</span>
      <hr className="flex-1 border-t border-[#E5E7EB]" />
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const contents = [
  { no: "1", title: "引言：把主观感受变成可测量对象" },
  { no: "2", title: "需求的三种品质：狩野模型" },
  { no: "3", title: "情绪的几何：Russell 情感环形模型" },
  { no: "4", title: "给风格画像：语义差异法" },
  { no: "A", title: "附录：本刊视觉规范" },
  { no: "B", title: "附录：审稿意见表" },
];

const kanoRows = [
  { feature: "首屏加载 < 1 s", cls: "Must-be", better: 0.18, worse: -0.83, note: "" },
  { feature: "CSV 数据导出", cls: "One-dimensional", better: 0.62, worse: -0.58, note: "" },
  { feature: "Dark Mode", cls: "Attractive", better: 0.71, worse: -0.24, note: "" },
  { feature: "AI 字段补全", cls: "Indifferent", better: 0.28, worse: -0.12, note: "分层后新手段为 Attractive" },
  { feature: "完成撒花动效", cls: "Indifferent", better: 0.08, worse: -0.05, note: "37% 受访者判为 Reverse" },
];

const kanoClsColor: Record<string, string> = {
  "Must-be": "text-[#1F2933] border-[#1F2933]/30",
  "One-dimensional": "text-[#2A7AE2] border-[#2A7AE2]/30",
  "Attractive": "text-[#E4572E] border-[#E4572E]/30",
  "Indifferent": "text-[#6B7280] border-[#6B7280]/30",
};

const emotionAnchors = [
  { zh: "愉悦", en: "Pleasure", deg: 0, x: 380, y: 220, lx: 392, ly: 224, ta: "start", note: "正效价极点，唤醒度中性。" },
  { zh: "兴奋", en: "Excitement", deg: 45, x: 336, y: 114, lx: 344, ly: 106, ta: "start", note: "高唤醒、正效价。Tsai 的研究表明欧美文化更偏好这类理想情绪。" },
  { zh: "唤醒", en: "Arousal", deg: 90, x: 230, y: 70, lx: 230, ly: 52, ta: "middle", note: "唤醒轴正极，效价中性。" },
  { zh: "苦恼", en: "Distress", deg: 135, x: 124, y: 114, lx: 116, ly: 106, ta: "end", note: "高唤醒、负效价。视觉复杂度过高的网页常落入此象限（Tuch et al., 2009）。" },
  { zh: "不悦", en: "Displeasure", deg: 180, x: 80, y: 220, lx: 68, ly: 224, ta: "end", note: "负效价极点，唤醒度中性。" },
  { zh: "沮丧", en: "Depression", deg: 225, x: 124, y: 326, lx: 116, ly: 344, ta: "end", note: "低唤醒、负效价。" },
  { zh: "困倦", en: "Sleepiness", deg: 270, x: 230, y: 370, lx: 230, ly: 396, ta: "middle", note: "唤醒轴负极。" },
  { zh: "放松", en: "Relaxation", deg: 315, x: 336, y: 326, lx: 344, ly: 344, ta: "start", note: "低唤醒、正效价。东亚文化更偏好的理想情绪（Tsai, AVT）。" },
] as const;

const sdPairs = [
  { left: "简洁", right: "复杂", a: 2, b: 5 },
  { left: "平静", right: "刺激", a: 2, b: 6 },
  { left: "理性", right: "感性", a: 1, b: 5 },
  { left: "轻盈", right: "厚重", a: 2, b: 6 },
  { left: "传统", right: "新潮", a: 3, b: 6 },
  { left: "柔和", right: "强烈", a: 2, b: 7 },
  { left: "精致", right: "粗犷", a: 2, b: 6 },
  { left: "克制", right: "奔放", a: 1, b: 6 },
];

const paletteRows = [
  { hex: "#FFFFFF", role: "纸面", usage: "页面底色，一切论证的画布", border: true },
  { hex: "#1F2933", role: "墨灰", usage: "正文与标题，booktabs 表格横线", border: false },
  { hex: "#2A7AE2", role: "学术蓝", usage: "仅用于链接、编号引用与关键强调", border: false },
  { hex: "#E4572E", role: "图表橙", usage: "仅用于图表中的数据强调", border: false },
  { hex: "#6B7280", role: "注释灰", usage: "边注、图注、元信息", border: false },
  { hex: "#F3F4F6", role: "浅灰面", usage: "页脚、批注框与代码块的次级表面", border: true },
];

const references = [
  "Osgood, C. E., Suci, G. J., & Tannenbaum, P. H. (1957). The Measurement of Meaning. University of Illinois Press.",
  "Russell, J. A. (1980). A circumplex model of affect. Journal of Personality and Social Psychology, 39(6), 1161-1178.",
  "Kano, N., Seraku, N., Takahashi, F., & Tsuji, S. (1984). Attractive quality and must-be quality. Quality, 14(2), 147-156.",
  "Berger, C., et al. (1993). Kano's methods for understanding customer-defined quality. Center for Quality Management Journal, 2(4).",
  "Valdez, P., & Mehrabian, A. (1994). Effects of color on emotions. Journal of Experimental Psychology: General, 123(4), 394-409.",
  "Tuch, A. N., et al. (2009). Visual complexity of websites: Effects on users' experience. International Journal of Human-Computer Studies, 67(9), 703-715.",
];

const recommendationLabels: Record<string, string> = {
  accept: "直接录用（Accept）",
  minor: "小修后录用（Minor Revision）",
  major: "大修后再审（Major Revision）",
  reject: "退稿（Reject）",
};

// ─── Figure 1: Kano model curves (SVG) ────────────────────────────────────────

function KanoCurvesChart() {
  return (
    <svg viewBox="0 0 560 400" className="w-full h-auto" role="img" aria-label="狩野模型三类品质曲线">
      <rect x="0" y="0" width="560" height="400" fill="#FFFFFF" />
      {/* quadrant guides */}
      <line x1="70" y1="205" x2="500" y2="205" stroke="#9CA3AF" strokeWidth="1" />
      <line x1="280" y1="370" x2="280" y2="45" stroke="#9CA3AF" strokeWidth="1" />
      <path d="M 500 205 l -9 -4.5 v 9 z" fill="#9CA3AF" />
      <path d="M 280 45 l -4.5 9 h 9 z" fill="#9CA3AF" />
      {/* axis labels */}
      <text x="496" y="224" textAnchor="end" fontSize="11" fill="#6B7280" fontFamily="ui-sans-serif, system-ui">功能充分</text>
      <text x="74" y="224" fontSize="11" fill="#6B7280" fontFamily="ui-sans-serif, system-ui">功能缺失</text>
      <text x="292" y="56" fontSize="11" fill="#6B7280" fontFamily="ui-sans-serif, system-ui">满意</text>
      <text x="292" y="364" fontSize="11" fill="#6B7280" fontFamily="ui-sans-serif, system-ui">不满</text>
      {/* time-decay annotation, upper-left quadrant */}
      <text x="84" y="88" fontSize="11" fill="#6B7280" fontFamily="ui-sans-serif, system-ui">时间衰变：A 逐渐退化为 O，再退化为 M</text>
      <text x="84" y="106" fontSize="10" fill="#9CA3AF" fontFamily="ui-sans-serif, system-ui">（电视遥控器：1983 A，1989 O，1998 M。Kano, 2001）</text>
      {/* Must-be: concave, dashed ink */}
      <path d="M 95 355 C 180 250, 300 228, 470 215" fill="none" stroke="#1F2933" strokeWidth="2" strokeDasharray="6 4" />
      {/* One-dimensional: straight blue */}
      <path d="M 95 345 L 470 70" fill="none" stroke="#2A7AE2" strokeWidth="2" />
      {/* Attractive: convex orange */}
      <path d="M 95 225 C 220 218, 360 170, 470 55" fill="none" stroke="#E4572E" strokeWidth="2" />
      {/* curve end markers */}
      <circle cx="470" cy="55" r="3.5" fill="#E4572E" />
      <circle cx="470" cy="70" r="3.5" fill="#2A7AE2" />
      <circle cx="470" cy="215" r="3.5" fill="#1F2933" />
      <text x="480" y="59" fontSize="12" fontWeight="600" fill="#E4572E" fontFamily="ui-sans-serif, system-ui">A</text>
      <text x="480" y="82" fontSize="12" fontWeight="600" fill="#2A7AE2" fontFamily="ui-sans-serif, system-ui">O</text>
      <text x="480" y="219" fontSize="12" fontWeight="600" fill="#1F2933" fontFamily="ui-sans-serif, system-ui">M</text>
    </svg>
  );
}

// ─── Figure 2: Russell circumplex (SVG, interactive) ──────────────────────────

function CircumplexChart({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (i: number) => void;
}) {
  return (
    <svg viewBox="0 0 460 440" className="w-full h-auto max-w-[30rem] mx-auto" role="img" aria-label="Russell 情感环形模型">
      <rect x="0" y="0" width="460" height="440" fill="#FFFFFF" />
      <circle cx="230" cy="220" r="150" fill="none" stroke="#D1D5DB" strokeWidth="1" />
      <circle cx="230" cy="220" r="75" fill="none" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 4" />
      <line x1="60" y1="220" x2="400" y2="220" stroke="#E5E7EB" strokeWidth="1" />
      <line x1="230" y1="390" x2="230" y2="50" stroke="#E5E7EB" strokeWidth="1" />
      {/* radius to the selected anchor */}
      <line
        x1="230"
        y1="220"
        x2={emotionAnchors[selected].x}
        y2={emotionAnchors[selected].y}
        stroke="#E4572E"
        strokeWidth="1.5"
        strokeDasharray="4 3"
      />
      <circle cx="230" cy="220" r="3" fill="#9CA3AF" />
      {emotionAnchors.map((a, i) => (
        <g key={a.en} onClick={() => onSelect(i)} className="cursor-pointer">
          <circle
            cx={a.x}
            cy={a.y}
            r={i === selected ? 7 : 4.5}
            fill={i === selected ? "#E4572E" : "#FFFFFF"}
            stroke={i === selected ? "#E4572E" : "#2A7AE2"}
            strokeWidth="2"
          />
          <text
            x={a.lx}
            y={a.ly}
            textAnchor={a.ta}
            fontSize="12"
            fontWeight={i === selected ? 600 : 400}
            fill={i === selected ? "#E4572E" : "#1F2933"}
            fontFamily="ui-sans-serif, system-ui"
          >
            {a.zh} {a.deg}&#176;
          </text>
        </g>
      ))}
    </svg>
  );
}

// ─── Figure 3: Semantic differential profile (SVG) ────────────────────────────

function SDProfileChart() {
  const xOf = (score: number) => 170 + (score - 1) * 50;
  const yOf = (i: number) => 48 + i * 40;
  const pointsA = sdPairs.map((p, i) => `${xOf(p.a)},${yOf(i)}`).join(" ");
  const pointsB = sdPairs.map((p, i) => `${xOf(p.b)},${yOf(i)}`).join(" ");
  return (
    <svg viewBox="0 0 640 380" className="w-full h-auto" role="img" aria-label="语义差异法七点量表画像折线">
      <rect x="0" y="0" width="640" height="380" fill="#FFFFFF" />
      {/* scale header 1-7 */}
      {[1, 2, 3, 4, 5, 6, 7].map((s) => (
        <text key={s} x={xOf(s)} y="26" textAnchor="middle" fontSize="10" fill="#9CA3AF" fontFamily="ui-sans-serif, system-ui">
          {s}
        </text>
      ))}
      {/* neutral midline */}
      <line x1={xOf(4)} y1="36" x2={xOf(4)} y2="340" stroke="#E5E7EB" strokeWidth="1" strokeDasharray="3 4" />
      {/* dot grid and word pairs */}
      {sdPairs.map((p, i) => (
        <g key={p.left}>
          {[1, 2, 3, 4, 5, 6, 7].map((s) => (
            <circle key={s} cx={xOf(s)} cy={yOf(i)} r="2" fill="#E5E7EB" />
          ))}
          <text x="150" y={yOf(i) + 4} textAnchor="end" fontSize="12" fill="#1F2933" fontFamily="ui-sans-serif, system-ui">
            {p.left}
          </text>
          <text x="490" y={yOf(i) + 4} fontSize="12" fill="#1F2933" fontFamily="ui-sans-serif, system-ui">
            {p.right}
          </text>
        </g>
      ))}
      {/* profiles */}
      <polyline points={pointsA} fill="none" stroke="#2A7AE2" strokeWidth="2" />
      <polyline points={pointsB} fill="none" stroke="#E4572E" strokeWidth="2" />
      {sdPairs.map((p, i) => (
        <g key={`pt-${p.left}`}>
          <circle cx={xOf(p.a)} cy={yOf(i)} r="4" fill="#2A7AE2" />
          <circle cx={xOf(p.b)} cy={yOf(i)} r="4" fill="#E4572E" />
        </g>
      ))}
      {/* legend */}
      <g fontFamily="ui-sans-serif, system-ui" fontSize="11">
        <rect x="530" y="44" width="14" height="3" fill="#2A7AE2" />
        <text x="550" y="50" fill="#1F2933">学术科普风</text>
        <rect x="530" y="66" width="14" height="3" fill="#E4572E" />
        <text x="550" y="72" fill="#1F2933">新野兽派</text>
      </g>
    </svg>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function DistillStyleShowcaseContent() {
  const [kanoView, setKanoView] = useState<"curves" | "coefficients">("curves");
  const [selectedEmotion, setSelectedEmotion] = useState(1);
  const [recommendation, setRecommendation] = useState("minor");

  const anchor = emotionAnchors[selectedEmotion];

  return (
    <div className="min-h-screen bg-white text-[#1F2933] font-sans">
      {/* ── Section 1: Masthead navigation ─────────────────────────────────── */}
      <RevealBlock>
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB]">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-3 min-w-0">
                <Link
                  href="/styles/distill-style"
                  className="shrink-0 text-sm text-[#6B7280] hover:text-[#2A7AE2] hover:underline underline-offset-4 transition-colors flex items-center gap-1.5"
                >
                  <span>&larr;</span>
                  Back to Docs
                </Link>
                <div className="w-px h-4 bg-[#E5E7EB]" />
                <span className="font-serif text-base md:text-lg font-semibold tracking-tight truncate">
                  The Distill Review
                  <span className="hidden sm:inline text-[#6B7280] font-normal"> · 设计科学评论</span>
                </span>
              </div>
              <div className="hidden md:flex items-center gap-6 text-sm text-[#6B7280]">
                <a href="#articles" className="hover:text-[#2A7AE2] hover:underline underline-offset-4 transition-colors">Articles</a>
                <a href="#archive" className="hover:text-[#2A7AE2] hover:underline underline-offset-4 transition-colors">Archive</a>
                <a href="#submit" className="hover:text-[#2A7AE2] hover:underline underline-offset-4 transition-colors">Submit</a>
                <span className="text-[11px] uppercase tracking-[0.14em] text-[#9CA3AF]">ISSN 2026-0705</span>
              </div>
            </div>
          </div>
        </nav>
      </RevealBlock>

      {/* ── Section 2: Article header with byline block ────────────────────── */}
      <RevealBlock>
        <header id="articles" className="max-w-[42rem] mx-auto px-4 md:px-6 pt-14 md:pt-20 scroll-mt-16">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {["cs.HC", "stat.AP", "设计科学", "Peer-Reviewed"].map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 border border-[#E5E7EB] rounded-sm text-[11px] uppercase tracking-[0.12em] text-[#6B7280]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="font-serif text-3xl md:text-[2.75rem] md:leading-[1.2] font-semibold tracking-tight text-[#1F2933] mb-4">
            界面风格的可测量性：从狩野曲线到情绪圆环
          </h1>
          <p className="font-serif text-lg md:text-xl leading-[1.6] text-[#6B7280] mb-10">
            三个经典测量工具如何把「好看」翻译成坐标、曲线与折线。
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 border-t border-b border-[#E5E7EB] py-4 text-sm">
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#6B7280] mb-1">Authors</p>
              <p className="text-[#1F2933]">Lin Qiao<sup className="text-[#2A7AE2]">1</sup>, A. N. Reader<sup className="text-[#2A7AE2]">2</sup></p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#6B7280] mb-1">Affiliations</p>
              <p className="text-[#1F2933]"><sup className="text-[#2A7AE2]">1</sup>StyleKit Lab <sup className="text-[#2A7AE2]">2</sup>Open Web Inst.</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#6B7280] mb-1">Published</p>
              <p className="text-[#1F2933]">July 5, 2026</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#6B7280] mb-1">DOI</p>
              <p className="font-mono text-xs text-[#1F2933] pt-0.5">10.23915/sk.00042</p>
            </div>
          </div>
        </header>
      </RevealBlock>

      {/* ── Section 3: Abstract and keywords ───────────────────────────────── */}
      <RevealBlock>
        <section className="max-w-[42rem] mx-auto px-4 md:px-6 pt-10">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#6B7280] mb-3">摘要 · Abstract</p>
          <p className="font-serif text-[1.0625rem] leading-[1.75] text-[#1F2933] border-l-2 border-[#E5E7EB] pl-5">
            设计讨论常被「感觉」一词终结。本文以三个经过时间检验的测量工具为线索——狩野模型的二维品质曲线
            <Cite n={3} />、Russell 的情感环形模型<Cite n={2} />
            与 Osgood 的语义差异法<Cite n={1} />——演示如何把界面风格的主观体验放进可讨论、可复现的坐标系。
            全部图表由本文自绘，数据出处见参考文献与图注。
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-5">
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#9CA3AF] mr-1">Keywords</span>
            {["狩野模型", "情感环形", "语义差异法", "设计测量"].map((k) => (
              <span key={k} className="px-2 py-0.5 bg-[#F3F4F6] rounded-sm text-xs text-[#6B7280]">
                {k}
              </span>
            ))}
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 4: Contents ────────────────────────────────────────────── */}
      <RevealBlock>
        <section className="max-w-[42rem] mx-auto px-4 md:px-6 pt-12">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#6B7280] mb-2">目录 · Contents</p>
          <ol>
            {contents.map((c) => (
              <li
                key={c.no}
                className="flex items-baseline gap-4 py-2.5 border-b border-[#E5E7EB] last:border-b-0 text-sm group cursor-pointer"
              >
                <span className="font-mono text-xs text-[#9CA3AF] w-4 shrink-0">{c.no}</span>
                <span className="font-serif text-[#1F2933] group-hover:text-[#2A7AE2] transition-colors">{c.title}</span>
                <span className="ml-auto text-[#D1D5DB] font-serif">&sect;</span>
              </li>
            ))}
          </ol>
        </section>
      </RevealBlock>

      {/* ── Section 5: Introduction prose with citations and sidenotes ─────── */}
      <RevealBlock>
        <article className="max-w-[42rem] mx-auto px-4 md:px-6 pt-14 space-y-5">
          <SectionHeading no="1" zh="引言：把主观感受变成可测量对象" en="Introduction" />
          <div className="relative">
            <Prose>
              1957 年，Osgood 与同事出版《The Measurement of Meaning》<Cite n={1} />，
              提出用成对的双极形容词与七点量表测量概念的内涵意义。此后跨越二十三种文化的重复研究里，
              因子分析一再浮现出同样的三大因子：评价（Evaluation）、力量（Potency）与活动性（Activity）。
              主观感受第一次表现出跨文化的稳定结构。
            </Prose>
            <Sidenote label="注 1.">
              EPA 三因子在 Atlas of Affective Meanings 收录的跨文化样本中反复出现；Heise（2014）再次确认 E 与 P 高度一致。
            </Sidenote>
          </div>
          <div className="relative">
            <Prose>
              1980 年，Russell 用四种独立方法收敛出同一个结论：情绪不是一张离散标签清单，
              而是效价（valence）与唤醒度（arousal）张成的二维平面上的一个环<Cite n={2} />。
              1984 年，狩野纪昭把「满意度」拆成两个正交维度，画出了后来以他命名的三条品质曲线<Cite n={3} />。
            </Prose>
            <Sidenote label="注 2.">
              Russell 同时使用 circular ordering、多维标度（MDS）与主成分分析（PCA），四法收敛才敢下结论。
            </Sidenote>
          </div>
          <Prose>
            这三个工具有一个共同点：它们都不否认主观性，而是给主观性一套坐标。对设计师而言，
            这意味着「这个风格太吵了」可以被改写成「它落在高唤醒、负效价象限」——一个可以被复核、
            被比较、被推翻的陈述。以下三节各演示一个工具，图表均可交互。
          </Prose>
        </article>
      </RevealBlock>

      {/* ── Section 6: Figure 1 - Kano model with view tabs ────────────────── */}
      <RevealBlock>
        <section className="max-w-[42rem] mx-auto px-4 md:px-6 pt-14 space-y-5">
          <SectionHeading no="2" zh="需求的三种品质：狩野模型" en="The Kano Model" />
          <Prose>
            狩野模型的坐标系里，横轴是功能的具备程度，纵轴是用户满意度。当然品质（Must-be）是一条凹线：
            做得再好也只能到达中性，缺失则坠入深度不满；一元品质（One-dimensional）是一条 45 度直线，
            投入与满意成正比；魅力品质（Attractive）是一条凸线——没有它无人抱怨，有了它便是惊喜。
          </Prose>
        </section>
      </RevealBlock>
      <RevealBlock>
        <figure className="max-w-4xl mx-auto px-4 md:px-6 mt-8">
          <div className="border border-[#E5E7EB] rounded-md bg-white">
            <div className="flex items-center gap-1 px-4 pt-3 border-b border-[#E5E7EB]">
              {([
                { id: "curves", label: "品质曲线" },
                { id: "coefficients", label: "Better-Worse 系数" },
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setKanoView(tab.id)}
                  className={`px-3 py-2 text-sm border-b-2 -mb-px transition-colors ${
                    kanoView === tab.id
                      ? "border-[#2A7AE2] text-[#2A7AE2] font-medium"
                      : "border-transparent text-[#6B7280] hover:text-[#1F2933]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-4 md:p-6">
              {kanoView === "curves" ? (
                <div>
                  <KanoCurvesChart />
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-xs text-[#6B7280]">
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-5 h-0.5 bg-[#E4572E]" />魅力品质 Attractive（凸线）
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-5 h-0.5 bg-[#2A7AE2]" />一元品质 One-dimensional（直线）
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="inline-block w-5 h-0.5 border-t-2 border-dashed border-[#1F2933]" />当然品质 Must-be（凹线）
                    </span>
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[36rem] border-t-2 border-b-2 border-[#1F2933] text-sm">
                    <thead>
                      <tr className="border-b border-[#1F2933]">
                        <th className="text-left py-2 pr-3 font-semibold">功能点</th>
                        <th className="text-left py-2 pr-3 font-semibold">Kano 分类</th>
                        <th className="text-left py-2 pr-3 font-semibold">Better</th>
                        <th className="text-left py-2 font-semibold">Worse</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kanoRows.map((row) => (
                        <tr key={row.feature} className="align-middle">
                          <td className="py-2.5 pr-3 text-[#1F2933]">
                            {row.feature}
                            {row.note && <span className="block text-[11px] text-[#9CA3AF]">{row.note}</span>}
                          </td>
                          <td className="py-2.5 pr-3">
                            <span className={`inline-block px-1.5 py-0.5 border rounded-sm text-[11px] ${kanoClsColor[row.cls]}`}>
                              {row.cls}
                            </span>
                          </td>
                          <td className="py-2.5 pr-3 w-[27%]">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-24 bg-[#F3F4F6] rounded-sm overflow-hidden">
                                <div className="h-full bg-[#2A7AE2]" style={{ width: `${row.better * 100}%` }} />
                              </div>
                              <span className="font-mono text-xs text-[#1F2933]">{row.better.toFixed(2)}</span>
                            </div>
                          </td>
                          <td className="py-2.5 w-[27%]">
                            <div className="flex items-center gap-2">
                              <div className="h-1.5 w-24 bg-[#F3F4F6] rounded-sm overflow-hidden">
                                <div className="h-full bg-[#E4572E]" style={{ width: `${Math.abs(row.worse) * 100}%` }} />
                              </div>
                              <span className="font-mono text-xs text-[#1F2933]">{row.worse.toFixed(2)}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="mt-3 text-xs leading-relaxed text-[#9CA3AF]">
                    虚构自洽示例（SaaS 仪表盘调研）。Better = (A+O)/(A+O+M+I)；Worse = -(O+M)/(A+O+M+I)。系数出处见 Berger et al.（1993）。
                  </p>
                </div>
              )}
            </div>
          </div>
          <figcaption className="mt-3 pt-2 border-t border-[#E5E7EB] text-[13px] leading-relaxed text-[#6B7280]">
            <span className="font-medium text-[#1F2933]">图 1：</span>
            狩野模型的三类品质曲线与 Better-Worse 系数视图。横轴为功能具备程度，纵轴为满意度；
            分类会随时间从 Attractive 衰变为 Must-be（O 到 M 平均 5-7 年）。数据与曲线形态依据 Kano et al.（1984）与 Berger et al.（1993）。
          </figcaption>
        </figure>
      </RevealBlock>

      {/* ── Section 7: Circumplex prose + Figure 2 (interactive) ───────────── */}
      <RevealBlock>
        <section className="max-w-[42rem] mx-auto px-4 md:px-6 pt-14 space-y-5">
          <SectionHeading no="3" zh="情绪的几何：Russell 情感环形模型" en="Circumplex of Affect" />
          <div className="relative">
            <Prose>
              Russell 让被试对 28 个情绪形容词做环形排序，八个锚点词以 45 度的等间隔落在圆环上
              <Cite n={2} />。这个平面对界面设计的意义是直接的：明度主导愉悦感，饱和度主导唤醒度
              <Cite n={5} />；网页视觉复杂度与唤醒度的相关高达 r = .74，与效价的相关是 r = -.61
              <Cite n={6} />。换句话说，风格的每一个色彩决策都在这个圆环上移动你的用户。
            </Prose>
            <Sidenote label="注 3.">
              Valdez 与 Mehrabian（1994）的回归：Pleasure = .69B + .22S；Arousal = -.31B + .60S。B 为明度，S 为饱和度。
            </Sidenote>
          </div>
        </section>
      </RevealBlock>
      <RevealBlock>
        <figure className="max-w-4xl mx-auto px-4 md:px-6 mt-8">
          <div className="border border-[#E5E7EB] rounded-md bg-white p-4 md:p-6">
            <CircumplexChart selected={selectedEmotion} onSelect={setSelectedEmotion} />
            <div className="mt-4 border-t border-[#E5E7EB] pt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <p className="text-sm">
                <span className="font-serif font-semibold text-[#E4572E]">{anchor.zh}</span>
                <span className="text-[#6B7280]"> {anchor.en} · {anchor.deg}&#176;</span>
              </p>
              <p className="text-xs leading-relaxed text-[#6B7280] sm:flex-1">{anchor.note}</p>
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#9CA3AF] shrink-0">点击锚点查看坐标</p>
            </div>
          </div>
          <figcaption className="mt-3 pt-2 border-t border-[#E5E7EB] text-[13px] leading-relaxed text-[#6B7280]">
            <span className="font-medium text-[#1F2933]">图 2：</span>
            情感环形模型的八个锚点情绪词。横轴为效价（valence），纵轴为唤醒度（arousal），
            锚点角度取自 Russell（1980）：愉悦 0&#176;、兴奋 45&#176;、唤醒 90&#176;、苦恼 135&#176;、
            不悦 180&#176;、沮丧 225&#176;、困倦 270&#176;、放松 315&#176;。
          </figcaption>
        </figure>
      </RevealBlock>

      {/* ── Section 8: Semantic differential prose + Figure 3 ──────────────── */}
      <RevealBlock>
        <section className="max-w-[42rem] mx-auto px-4 md:px-6 pt-14 space-y-5">
          <SectionHeading no="4" zh="给风格画像：语义差异法" en="Semantic Differential" />
          <Prose>
            语义差异法的经典呈现是 profile 折线：把多个概念在同一组词对上的得分叠加对比<Cite n={1} />。
            下图用八组双极词对（每因子至少两对）为两种界面风格画像——折线之间的水平距离，
            就是两种设计语言在语义空间里的距离。感性工学（Kansei Engineering）正是沿这条路
            把语义得分一路映射到具体设计要素。
          </Prose>
        </section>
      </RevealBlock>
      <RevealBlock>
        <figure className="max-w-4xl mx-auto px-4 md:px-6 mt-8">
          <div className="border border-[#E5E7EB] rounded-md bg-white p-4 md:p-6">
            <SDProfileChart />
          </div>
          <figcaption className="mt-3 pt-2 border-t border-[#E5E7EB] text-[13px] leading-relaxed text-[#6B7280]">
            <span className="font-medium text-[#1F2933]">图 3：</span>
            两种界面风格在八组双极词对上的语义差异画像（七点量表，作者自评示例，n = 1，仅作方法演示）。
            方法与量表结构依据 Osgood et al.（1957）；分析前需对反向词对重编码。
          </figcaption>
        </figure>
      </RevealBlock>

      {/* ── Section 9: Pull quote ──────────────────────────────────────────── */}
      <RevealBlock>
        <section className="max-w-[42rem] mx-auto px-4 md:px-6 pt-14">
          <blockquote className="border-l-2 border-[#2A7AE2] pl-6 py-1">
            <p className="font-serif text-xl md:text-2xl leading-[1.6] text-[#1F2933] italic">
              &ldquo;These terms fall in a circle: pleasure, excitement, arousal, distress,
              displeasure, depression, sleepiness, and relaxation.&rdquo;
            </p>
            <footer className="mt-3 text-sm text-[#6B7280]">
              Russell, J. A.（1980）<cite className="not-italic">Journal of Personality and Social Psychology, 39</cite>(6)
            </footer>
          </blockquote>
        </section>
      </RevealBlock>

      <SectionDivider />

      {/* ── Section 10: Appendix A.1 - Color palette ───────────────────────── */}
      <RevealBlock>
        <section className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="max-w-[42rem] mx-auto mb-6">
            <SectionHeading no="A.1" zh="本刊视觉规范：色板" en="Palette" />
            <p className="font-serif text-[1.0625rem] leading-[1.75] text-[#1F2933] mt-4">
              六个颜色，各司其职。色彩在本刊只服务于信息：蓝指向可点击与被引用之物，橙只属于数据。
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 border-t-2 border-b-2 border-[#1F2933]">
            {paletteRows.map((c) => (
              <div key={c.hex} className="p-4 border-b border-r border-[#E5E7EB] last:border-b-0 md:[&:nth-child(n+4)]:border-b-0">
                <div
                  className={`h-14 rounded-sm mb-3 ${c.border ? "border border-[#E5E7EB]" : ""}`}
                  style={{ backgroundColor: c.hex }}
                />
                <p className="text-sm font-medium text-[#1F2933]">{c.role}</p>
                <p className="font-mono text-xs text-[#6B7280] mb-1">{c.hex}</p>
                <p className="text-xs leading-relaxed text-[#9CA3AF]">{c.usage}</p>
              </div>
            ))}
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 11: Appendix A.2 - Typography specimen ─────────────────── */}
      <RevealBlock>
        <section className="max-w-[42rem] mx-auto px-4 md:px-6 pt-14">
          <SectionHeading no="A.2" zh="字体样张" en="Type Specimen" />
          <div className="mt-6 divide-y divide-[#E5E7EB] border-t border-b border-[#E5E7EB]">
            <div className="py-5">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9CA3AF] mb-2">标题一 · Serif Semibold</p>
              <p className="font-serif text-3xl font-semibold tracking-tight">学术排版的网页化</p>
            </div>
            <div className="py-5">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9CA3AF] mb-2">标题二 · Serif Semibold</p>
              <p className="font-serif text-2xl font-semibold tracking-tight">窄列、边注与突破版心的图</p>
            </div>
            <div className="py-5">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9CA3AF] mb-2">正文 · Serif 17/1.75，带编号引用</p>
              <p className="font-serif text-[1.0625rem] leading-[1.75]">
                正文列宽锁定约 42rem，这是眼睛完成一次换行扫视的舒适极限<Cite n={2} />。
              </p>
            </div>
            <div className="py-5">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9CA3AF] mb-2">边注 · Sans 13/1.6 注释灰</p>
              <p className="text-[13px] leading-relaxed text-[#6B7280]">边注承载旁白与出处，大屏悬浮右缘，小屏内联折叠。</p>
            </div>
            <div className="py-5">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9CA3AF] mb-2">元信息 · Mono</p>
              <p className="font-mono text-sm text-[#1F2933]">doi:10.23915/sk.00042 · arXiv:2607.00042</p>
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 12: Appendix A.3 - Buttons ─────────────────────────────── */}
      <RevealBlock>
        <section className="max-w-[42rem] mx-auto px-4 md:px-6 pt-14">
          <SectionHeading no="A.3" zh="操作组件" en="Actions" />
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button className="px-5 py-2.5 bg-[#1F2933] text-white text-sm font-medium rounded-md hover:bg-[#111827] transition-colors duration-150">
              Download PDF
            </button>
            <button className="px-5 py-2.5 bg-white text-[#1F2933] text-sm font-medium rounded-md border border-[#E5E7EB] hover:border-[#9CA3AF] transition-colors duration-150">
              View on arXiv
            </button>
            <button className="px-2 py-2.5 text-sm font-medium text-[#2A7AE2] underline underline-offset-4 decoration-[#2A7AE2]/40 hover:decoration-[#2A7AE2] transition-colors duration-150">
              Supplementary Materials
            </button>
            <button className="px-2.5 py-1 border border-[#E5E7EB] rounded-sm font-mono text-xs text-[#6B7280] hover:text-[#2A7AE2] hover:border-[#2A7AE2]/40 transition-colors duration-150">
              [BibTeX]
            </button>
            <button className="px-5 py-2.5 bg-[#1F2933] text-white text-sm font-medium rounded-md opacity-40 cursor-not-allowed" disabled>
              Submitting...
            </button>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-[#9CA3AF]">
            主按钮用墨灰而非学术蓝——蓝色保留给链接与引用，避免语义混淆。圆角不超过 rounded-md，hover 只改变颜色。
          </p>
        </section>
      </RevealBlock>

      {/* ── Section 13: Appendix A.4 - Cards ───────────────────────────────── */}
      <RevealBlock>
        <section className="max-w-4xl mx-auto px-4 md:px-6 pt-14">
          <div className="max-w-[42rem] mx-auto mb-6">
            <SectionHeading no="A.4" zh="卡片" en="Cards" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <RevealBlock delay={0}>
              <div className="h-full bg-white border border-[#E5E7EB] rounded-md p-5 hover:border-[#D1D5DB] transition-colors">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#6B7280] mb-2">Abstract</p>
                <h3 className="font-serif text-lg font-semibold leading-snug mb-2">Why Momentum Really Works</h3>
                <p className="font-serif text-sm leading-[1.75] text-[#1F2933]">
                  A closed-form view of momentum<Cite n={4} /> and its damping behavior across the eigenspace of the loss surface.
                </p>
                <p className="mt-3 pt-3 border-t border-[#E5E7EB] text-xs text-[#6B7280]">Distill, 2017 · doi:10.23915/distill.00006</p>
              </div>
            </RevealBlock>
            <RevealBlock delay={0.08}>
              <div className="h-full bg-white border border-[#E5E7EB] rounded-md p-5 hover:border-[#D1D5DB] transition-colors">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#6B7280] mb-2">Finding</p>
                <p className="font-serif text-4xl font-semibold text-[#E4572E] mb-1">r = .74</p>
                <p className="text-sm text-[#1F2933] leading-relaxed">网页视觉复杂度与唤醒度的相关系数</p>
                <p className="mt-3 pt-3 border-t border-[#E5E7EB] text-xs text-[#6B7280]">Tuch et al.（2009），n = 36 网站截图</p>
              </div>
            </RevealBlock>
            <RevealBlock delay={0.16}>
              <div className="h-full bg-[#F3F4F6] border border-[#E5E7EB] border-l-2 border-l-[#2A7AE2] rounded-md p-5">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#2A7AE2] mb-2">Margin Note</p>
                <p className="text-[13px] leading-relaxed text-[#6B7280]">
                  带批注的卡片继承边注语言：浅灰面、蓝色左缘、小号注释灰文字。用于编辑旁白与阅读提示，不用于正文论证。
                </p>
                <p className="mt-3 pt-3 border-t border-[#E5E7EB] text-xs text-[#9CA3AF]">Editorial sidenote card</p>
              </div>
            </RevealBlock>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 14: Appendix A.5 - Annotation alerts ───────────────────── */}
      <RevealBlock>
        <section className="max-w-[42rem] mx-auto px-4 md:px-6 pt-14 space-y-3">
          <SectionHeading no="A.5" zh="批注框" en="Annotations" />
          <div className="pt-3 space-y-3">
            <div className="border border-[#E5E7EB] border-l-2 border-l-[#2A7AE2] rounded-sm bg-[#2A7AE2]/5 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#2A7AE2] mb-1">编者注 · Editorial Note</p>
              <p className="text-sm leading-relaxed text-[#1F2933]">图 2 支持点击交互；打印版读者请参考锚点角度表。</p>
            </div>
            <div className="border border-[#E5E7EB] border-l-2 border-l-[#2F7D46] rounded-sm bg-[#2F7D46]/5 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#2F7D46] mb-1">复现确认 · Replication Verified</p>
              <p className="text-sm leading-relaxed text-[#1F2933]">环形结构已在四种语言样本中复现（Russell, 1989）。</p>
            </div>
            <div className="border border-[#E5E7EB] border-l-2 border-l-[#E4572E] rounded-sm bg-[#E4572E]/5 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#E4572E] mb-1">方法学警示 · Methodological Caution</p>
              <p className="text-sm leading-relaxed text-[#1F2933]">
                Kano 问卷样本量 n &lt; 200 时分类不可靠；措辞变化会改变分类结果（Chapman &amp; Callegaro, 2022; Song, 2016）。
              </p>
            </div>
            <div className="border border-[#E5E7EB] border-l-2 border-l-[#B91C1C] rounded-sm bg-[#B91C1C]/5 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#B91C1C] mb-1">勘误 · Erratum</p>
              <p className="text-sm leading-relaxed text-[#1F2933]">初版图 3 中「柔和-强烈」词对方向标反，本版已重编码修正。</p>
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 15: Appendix B - Review form ───────────────────────────── */}
      <RevealBlock>
        <section id="submit" className="max-w-[42rem] mx-auto px-4 md:px-6 pt-14 scroll-mt-16">
          <SectionHeading no="B" zh="审稿意见表" en="Review Form" />
          <div className="mt-6 border border-[#E5E7EB] rounded-md p-5 md:p-6 space-y-4 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] text-[#6B7280] mb-1.5">Reviewer</label>
                <input
                  type="text"
                  placeholder="署名或匿名代号"
                  className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-md font-serif text-sm text-[#1F2933] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#2A7AE2] focus:ring-1 focus:ring-[#2A7AE2]/30 transition-colors duration-150"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-[0.14em] text-[#6B7280] mb-1.5">Email</label>
                <input
                  type="email"
                  placeholder="reviewer@university.edu"
                  className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-md font-serif text-sm text-[#1F2933] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#2A7AE2] focus:ring-1 focus:ring-[#2A7AE2]/30 transition-colors duration-150"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#6B7280] mb-1.5">Recommendation</label>
              <select
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-md text-sm text-[#1F2933] focus:outline-none focus:border-[#2A7AE2] focus:ring-1 focus:ring-[#2A7AE2]/30 transition-colors duration-150"
              >
                <option value="accept">直接录用（Accept）</option>
                <option value="minor">小修后录用（Minor Revision）</option>
                <option value="major">大修后再审（Major Revision）</option>
                <option value="reject">退稿（Reject）</option>
              </select>
              <p className="mt-1.5 text-xs text-[#9CA3AF]">
                当前推荐：<span className="text-[#2A7AE2]">{recommendationLabels[recommendation]}</span>
              </p>
            </div>
            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#6B7280] mb-1.5">Comments to Authors</label>
              <textarea
                rows={4}
                placeholder="请围绕方法、证据与图表规范给出可执行的修改意见。"
                className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-md font-serif text-sm text-[#1F2933] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#2A7AE2] focus:ring-1 focus:ring-[#2A7AE2]/30 transition-colors duration-150 resize-y"
              />
            </div>
            <div className="flex items-center justify-between pt-1">
              <p className="text-xs text-[#9CA3AF]">双盲评审 · 意见将匿名转交作者</p>
              <button className="px-5 py-2.5 bg-[#1F2933] text-white text-sm font-medium rounded-md hover:bg-[#111827] transition-colors duration-150">
                Submit Review
              </button>
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 16: Design rules summary ───────────────────────────────── */}
      <RevealBlock>
        <section className="max-w-4xl mx-auto px-4 md:px-6 pt-14">
          <div className="max-w-[42rem] mx-auto mb-6">
            <SectionHeading no="C" zh="设计规则摘要" en="Design Rules" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border border-[#E5E7EB] rounded-md p-5 md:p-6 bg-white">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#2F7D46] mb-4">Do</p>
              <ul className="space-y-2.5">
                {[
                  "serif 正文窄列 max-w-[42rem]，行高 1.75",
                  "边注大屏悬浮右缘，小屏内联折叠",
                  "编号引用上标 [n]，页脚参考文献对应",
                  "figure 突破版心 max-w-4xl，图注以「图 N：」开头",
                  "hairline 分割 border-[#E5E7EB]，不超过 1px",
                  "学术蓝仅用于链接与关键强调",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-2.5 text-sm text-[#1F2933]">
                    <span className="mt-0.5 shrink-0 text-[#2F7D46] font-semibold">+</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-[#E5E7EB] rounded-md p-5 md:p-6 bg-white">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#B91C1C] mb-4">Don&apos;t</p>
              <ul className="space-y-2.5">
                {[
                  "渐变（bg-gradient-*）",
                  "重阴影（shadow-lg 及以上）",
                  "大圆角（rounded-md 以上）",
                  "正文全宽铺满",
                  "多彩装饰与大面积色块",
                  "sans-serif 正文（sans 只用于 UI 标签）",
                ].map((rule) => (
                  <li key={rule} className="flex items-start gap-2.5 text-sm text-[#1F2933]">
                    <span className="mt-0.5 shrink-0 text-[#B91C1C] font-semibold">&times;</span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </RevealBlock>

      {/* ── Section 17: References footer ──────────────────────────────────── */}
      <RevealBlock>
        <footer id="archive" className="mt-16 bg-[#F3F4F6] border-t border-[#E5E7EB] scroll-mt-16">
          <div className="max-w-[42rem] mx-auto px-4 md:px-6 py-12">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#6B7280] mb-4">参考文献 · References</p>
            <ol className="space-y-2.5">
              {references.map((r, i) => (
                <li key={r} className="flex gap-3 font-serif text-sm leading-relaxed text-[#1F2933]">
                  <span className="shrink-0 font-sans text-xs font-semibold text-[#2A7AE2] pt-0.5">[{i + 1}]</span>
                  <span>{r}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8 pt-5 border-t border-[#E5E7EB]">
              <p className="text-[11px] uppercase tracking-[0.14em] text-[#9CA3AF] mb-2">引用本文 · Cite this article</p>
              <pre className="font-mono text-[11px] leading-relaxed text-[#6B7280] bg-white border border-[#E5E7EB] rounded-sm p-3 overflow-x-auto">{`@article{qiao2026measurable,
  title  = {The Measurability of Interface Styles},
  author = {Qiao, Lin and Reader, A. N.},
  journal= {The Distill Review},
  year   = {2026},
  doi    = {10.23915/sk.00042}
}`}</pre>
            </div>
            <div className="mt-8 pt-5 border-t border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6B7280]">
              <p>The Distill Review · 设计科学评论 · ISSN 2026-0705 · CC BY 4.0</p>
              <Link
                href="/styles/distill-style"
                className="text-[#2A7AE2] hover:underline underline-offset-4"
              >
                &larr; Back to Distill Style Docs
              </Link>
            </div>
          </div>
        </footer>
      </RevealBlock>
    </div>
  );
}
