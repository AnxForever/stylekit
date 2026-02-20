"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const kintsugiPanels = [
  {
    label: "Vessel",
    title: "器 / Utsuwa",
    proverb: "割れた器に金を流し込む — 傷は物語となる",
    translation: "Pour gold into broken vessels — the wound becomes the story.",
    desc: "In kintsugi philosophy, the fracture is not hidden but celebrated. Each crack is a record of survival, filled with gold to proclaim its history rather than conceal it.",
  },
  {
    label: "Architecture",
    title: "構造 / Kōzō",
    proverb: "壊れた所こそ光が入る",
    translation: "It is through the broken places that light enters.",
    desc: "Digital infrastructure mirrors the kintsugi vessel: when systems fail, the repair protocols trace new pathways. The network scar becomes its strongest node.",
  },
  {
    label: "Interface",
    title: "界面 / Kaimen",
    proverb: "不完全さの中に完全な美しさがある",
    translation: "Within imperfection lies perfect beauty.",
    desc: "Every interface carries its scars — deprecated APIs, legacy routes, patched vulnerabilities. The cyber-wafuu aesthetic makes these repairs luminous, not shameful.",
  },
];

const paletteColors = [
  {
    hex: "#1e3a5f",
    japaneseName: "深海青",
    englishName: "Deep Blue",
    romaji: "Shinkai Ao",
    desc: "The depth of the ocean at night — where ancient and digital currents converge.",
  },
  {
    hex: "#080814",
    japaneseName: "虚無黒",
    englishName: "Void Black",
    romaji: "Komu Kuro",
    desc: "Before the code was written, there was the void. The substrate on which all else rests.",
  },
  {
    hex: "#c41e3a",
    japaneseName: "深紅",
    englishName: "Crimson",
    romaji: "Shinku",
    desc: "The danger signal, the torii gate, the alarm. Crimson commands attention across both worlds.",
  },
  {
    hex: "#c9a227",
    japaneseName: "金繕い",
    englishName: "Kintsugi Gold",
    romaji: "Kintsugi",
    desc: "The gold lacquer that repairs what is broken. More precious than the original glaze.",
  },
  {
    hex: "#38bdf8",
    japaneseName: "電子青",
    englishName: "Digital Blue",
    romaji: "Denshi Ao",
    desc: "The luminescence of a terminal screen, the glow of data in transit through fiber.",
  },
];

const wabisabiPrinciples = [
  {
    num: "一",
    title: "不完全さを受け入れる / Embrace Imperfection",
    body: "Strive not for pixel-perfect uniformity. Let the system breathe. A UI that acknowledges its limitations is more honest than one that pretends at flawlessness. Build with wabi in mind: rustic, impermanent, incomplete.",
  },
  {
    num: "二",
    title: "空白を敬う / Respect the Void",
    body: "Ma (間) — the Japanese concept of negative space — is not emptiness to be filled, but space with intent. Every padding unit, every line break, every margin is a breath. Do not crowd the canvas.",
  },
  {
    num: "三",
    title: "傷を輝かせる / Make Wounds Luminous",
    body: "Error states, deprecated components, legacy code paths: these are the kintsugi cracks of your system. Document them in gold. A clearly-labeled workaround is more valuable than a hidden one.",
  },
  {
    num: "四",
    title: "無常を設計する / Design for Impermanence",
    body: "Nothing in the digital world is permanent. Features deprecate, libraries abandon, paradigms shift. Build components that can be gracefully retired. Write the code as if you are already writing its eulogy.",
  },
];

const typographyChars = [
  { char: "美", meaning: "Beauty", style: "Display / 見出し", note: "Found in what is naturally imperfect." },
  { char: "道", meaning: "Way", style: "Body / 本文", note: "The path itself is the destination." },
  { char: "間", meaning: "Space", style: "Caption / 注釈", note: "The silence between notes makes the music." },
];

const navLinks = ["概要 / About", "原則 / Principles", "色彩 / Colors", "要素 / Elements"];

/* ------------------------------------------------------------------ */
/*  Hooks & Utilities                                                  */
/* ------------------------------------------------------------------ */

function useInView(options = { threshold: 0.15 }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, options);
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function RevealBlock({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SVG Primitives                                                     */
/* ------------------------------------------------------------------ */

function KintsugiCrackLarge() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <path
        d="M100 10 L108 72 L145 95 L120 140 L130 190"
        stroke="#c9a227"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 5px #c9a227)" }}
      />
      <path
        d="M100 10 L88 65 L60 88 L75 130 L68 190"
        stroke="#c9a227"
        strokeWidth="1"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 4px #c9a22799)" }}
      />
      <path
        d="M108 72 L130 80 L155 68"
        stroke="#c9a227"
        strokeWidth="0.8"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 3px #c9a22780)" }}
      />
      <path
        d="M88 65 L62 55 L40 70"
        stroke="#c9a227"
        strokeWidth="0.7"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 3px #c9a22780)" }}
      />
      <circle cx="108" cy="72" r="2" fill="#c9a227" style={{ filter: "drop-shadow(0 0 6px #c9a227)" }} />
      <circle cx="88" cy="65" r="1.5" fill="#c9a227" style={{ filter: "drop-shadow(0 0 5px #c9a227)" }} />
      <circle cx="120" cy="140" r="1.8" fill="#c9a227" style={{ filter: "drop-shadow(0 0 5px #c9a227)" }} />
    </svg>
  );
}

function KintsugiCrackCorner() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
      aria-hidden="true"
    >
      <path
        d="M80 0 L55 30 L40 25 L20 55 L0 80"
        stroke="#c9a227"
        strokeWidth="1.2"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 4px #c9a227)" }}
      />
      <path
        d="M55 30 L70 50"
        stroke="#c9a227"
        strokeWidth="0.8"
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 3px #c9a22799)" }}
      />
      <circle cx="55" cy="30" r="1.5" fill="#c9a227" style={{ filter: "drop-shadow(0 0 5px #c9a227)" }} />
    </svg>
  );
}

function MonCircle() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Outer ring */}
      <circle cx="60" cy="60" r="56" stroke="#c9a227" strokeWidth="1.5" opacity="0.8" />
      <circle cx="60" cy="60" r="50" stroke="#c9a227" strokeWidth="0.5" opacity="0.4" />
      {/* Inner mon pattern — stylized mitsu-tomoe */}
      <path
        d="M60 30 C68 30 75 37 75 45 C75 53 68 58 60 58 C52 58 47 53 47 45 C47 37 52 30 60 30 Z"
        stroke="#c9a227"
        strokeWidth="1"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M60 62 C52 62 45 55 45 47 C45 39 52 34 60 34 C56 40 56 54 60 58 C64 54 64 40 60 34 C68 34 75 39 75 47 C75 55 68 62 60 62 Z"
        fill="#c9a227"
        opacity="0.25"
      />
      {/* Center dot */}
      <circle cx="60" cy="60" r="4" fill="#c9a227" opacity="0.9" style={{ filter: "drop-shadow(0 0 6px #c9a227)" }} />
      {/* Kintsugi crack through the mon */}
      <path
        d="M60 4 L63 40 L72 60 L65 90 L60 116"
        stroke="#c9a227"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.5"
        style={{ filter: "drop-shadow(0 0 3px #c9a227)" }}
      />
      {/* Tick marks at cardinal points */}
      <line x1="60" y1="4" x2="60" y2="12" stroke="#c9a227" strokeWidth="1.5" />
      <line x1="60" y1="108" x2="60" y2="116" stroke="#c9a227" strokeWidth="1.5" />
      <line x1="4" y1="60" x2="12" y2="60" stroke="#c9a227" strokeWidth="1.5" />
      <line x1="108" y1="60" x2="116" y2="60" stroke="#c9a227" strokeWidth="1.5" />
    </svg>
  );
}

function ShojiBg() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(201,162,39,0.09) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(201,162,39,0.09) 60px)",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [activePanel, setActivePanel] = useState(0);
  const [activeTab, setActiveTab] = useState<"button" | "card" | "input">("button");
  const [inputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [hoveredColor, setHoveredColor] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#080814] text-white overflow-x-hidden" style={{ fontFamily: "system-ui, sans-serif" }}>

      {/* ── 1. NAV ── */}
      <nav
        className="sticky top-0 z-50 border-b border-[#c9a227]/40"
        style={{ background: "rgba(8,8,20,0.96)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/styles/cyber-wafuu" className="flex items-center gap-3 group">
            <div className="w-7 h-7 relative flex-shrink-0">
              <MonCircle />
            </div>
            <span
              className="text-base font-bold tracking-widest"
              style={{ color: "#c9a227", letterSpacing: "0.15em" }}
            >
              赛博<span className="text-white/80">和</span>風
            </span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                className="text-xs tracking-[0.12em] text-white/50 hover:text-[#c9a227] transition-colors duration-200 flex items-center gap-1.5"
              >
                <span className="text-[#c41e3a] text-[10px]">・</span>
                {link}
              </button>
            ))}
          </div>

          {/* Back link */}
          <Link
            href="/styles/cyber-wafuu"
            className="text-xs text-white/30 hover:text-[#c9a227] transition-colors duration-200 tracking-wider hidden sm:block"
          >
            ← 戻る
          </Link>
        </div>
      </nav>

      {/* ── 2. HERO ── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Shoji grid background */}
        <ShojiBg />

        {/* Atmospheric glow blobs */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(30,58,95,0.35) 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(196,30,58,0.08) 0%, transparent 70%)" }}
        />
        <div
          className="absolute top-0 left-0 w-80 h-80 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(56,189,248,0.06) 0%, transparent 70%)" }}
        />

        {/* Central kintsugi mon */}
        <div className="relative w-48 h-48 mb-10 flex-shrink-0">
          {/* Outer glow ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: "0 0 60px rgba(201,162,39,0.15), 0 0 120px rgba(201,162,39,0.07)" }}
          />
          <div className="relative z-10 w-full h-full">
            <MonCircle />
          </div>
          {/* Rotating ring decoration */}
          <div
            className="absolute inset-[-16px] rounded-full border border-[#c9a227]/20"
            style={{ animation: "spin 24s linear infinite" }}
          />
          <div
            className="absolute inset-[-28px] rounded-full border border-[#1e3a5f]/50"
            style={{ animation: "spin 40s linear infinite reverse" }}
          />
        </div>

        {/* Main title */}
        <div className="text-center relative z-10 px-6">
          <RevealBlock delay={0.1}>
            <div className="mb-1">
              <span
                className="block text-6xl md:text-8xl font-black tracking-[0.15em] leading-none"
                style={{ color: "#38bdf8", textShadow: "0 0 40px rgba(56,189,248,0.3)" }}
              >
                CYBER
              </span>
              <span
                className="block text-6xl md:text-8xl font-bold tracking-[0.2em] leading-none mt-2"
                style={{
                  color: "#c9a227",
                  fontFamily: "serif",
                  textShadow: "0 0 30px rgba(201,162,39,0.4), 0 0 60px rgba(201,162,39,0.15)",
                }}
              >
                和風
              </span>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.25}>
            <p
              className="mt-6 text-sm md:text-base tracking-[0.25em] uppercase"
              style={{ color: "#c9a227", opacity: 0.8 }}
            >
              Where Heritage Meets Protocol
            </p>
          </RevealBlock>

          <RevealBlock delay={0.4}>
            <p className="mt-4 text-white/40 text-xs tracking-[0.18em] max-w-sm mx-auto">
              伝統と技術の交差点 — at the crossroads of tradition and technology
            </p>
          </RevealBlock>

          <RevealBlock delay={0.55}>
            <div className="mt-10 flex items-center justify-center gap-6">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#c9a227]/50" />
              <span className="text-[#c9a227]/60 text-xs tracking-[0.3em]">ア イ ウ エ オ</span>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#c9a227]/50" />
            </div>
          </RevealBlock>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #080814)" }}
        />
      </section>

      {/* ── 3. KINTSUGI GALLERY ── */}
      <section className="py-24 px-6 relative">
        <ShojiBg />
        <div className="max-w-5xl mx-auto relative z-10">
          <RevealBlock>
            <div className="text-center mb-12">
              <span className="text-xs tracking-[0.25em] text-[#c9a227]/60 uppercase block mb-3">
                金繕い / Kintsugi Gallery
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ color: "#c9a227", fontFamily: "serif", textShadow: "0 0 20px rgba(201,162,39,0.2)" }}
              >
                Repair as Revelation
              </h2>
              <p className="mt-3 text-white/40 text-sm max-w-lg mx-auto tracking-wide">
                The art of mending with gold lacquer — applied to digital systems and interfaces.
              </p>
            </div>
          </RevealBlock>

          {/* Tab selector */}
          <RevealBlock delay={0.1}>
            <div className="flex justify-center gap-2 mb-8">
              {kintsugiPanels.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => setActivePanel(i)}
                  className="px-5 py-2 text-xs tracking-[0.15em] transition-all duration-300 border"
                  style={{
                    borderColor: activePanel === i ? "#c9a227" : "rgba(201,162,39,0.2)",
                    color: activePanel === i ? "#c9a227" : "rgba(255,255,255,0.4)",
                    background: activePanel === i ? "rgba(201,162,39,0.08)" : "transparent",
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Active panel */}
          <RevealBlock delay={0.15}>
            <div
              className="relative overflow-hidden border border-[#c9a227]/20 p-8 md:p-12"
              style={{
                background: "rgba(30,58,95,0.12)",
                minHeight: "320px",
              }}
            >
              {/* Kintsugi crack SVG */}
              <div className="absolute inset-0 w-full h-full pointer-events-none">
                <KintsugiCrackLarge />
              </div>

              <div className="relative z-10 max-w-2xl">
                <p
                  className="text-3xl mb-2 font-bold"
                  style={{ color: "#c9a227", fontFamily: "serif" }}
                >
                  {kintsugiPanels[activePanel].title}
                </p>
                <p
                  className="text-base mb-1 text-white/60 italic"
                  style={{ fontFamily: "serif" }}
                >
                  {kintsugiPanels[activePanel].proverb}
                </p>
                <p className="text-xs text-[#c9a227]/50 mb-6 tracking-wide">
                  — {kintsugiPanels[activePanel].translation}
                </p>
                <p className="text-sm text-white/55 leading-relaxed max-w-lg">
                  {kintsugiPanels[activePanel].desc}
                </p>
              </div>

              {/* Corner accent */}
              <div className="absolute bottom-4 right-4 text-[#c9a227]/20 text-5xl font-bold" style={{ fontFamily: "serif" }}>
                金
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 4. PALETTE ── */}
      <section className="py-24 px-6 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(30,58,95,0.06)" }}
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <RevealBlock>
            <div className="text-center mb-14">
              <span className="text-xs tracking-[0.25em] text-[#c9a227]/60 uppercase block mb-3">
                色彩 / Shikisai
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ color: "#38bdf8", textShadow: "0 0 20px rgba(56,189,248,0.2)" }}
              >
                The Color Palette
              </h2>
              <p className="mt-3 text-white/40 text-sm">漆器の色調 — Lacquerware color philosophy</p>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {paletteColors.map((c, i) => (
              <RevealBlock key={c.hex} delay={i * 0.08}>
                <button
                  className="w-full text-left transition-all duration-300 group"
                  onMouseEnter={() => setHoveredColor(i)}
                  onMouseLeave={() => setHoveredColor(null)}
                  style={{ transform: hoveredColor === i ? "translateY(-4px)" : "translateY(0)" }}
                >
                  {/* Chip */}
                  <div
                    className="h-28 w-full border border-[#c9a227]/10 relative overflow-hidden"
                    style={{ background: c.hex }}
                  >
                    {/* Subtle shoji grid on chip */}
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(255,255,255,0.15) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(255,255,255,0.15) 20px)",
                      }}
                    />
                    <span
                      className="absolute bottom-2 right-2 text-xs font-mono opacity-60"
                      style={{ color: i === 1 ? "#c9a227" : "#080814" }}
                    >
                      {c.hex}
                    </span>
                  </div>
                  {/* Label */}
                  <div
                    className="border border-[#c9a227]/15 border-t-0 p-3"
                    style={{
                      background: "rgba(8,8,20,0.9)",
                      boxShadow: hoveredColor === i ? `0 8px 24px ${c.hex}22` : "none",
                    }}
                  >
                    <p className="text-xs text-[#c9a227] font-bold tracking-wider">{c.japaneseName}</p>
                    <p className="text-[10px] text-white/50 mt-0.5 tracking-wide">{c.englishName}</p>
                    <p className="text-[9px] text-white/25 mt-1 italic leading-relaxed">{c.romaji}</p>
                  </div>
                </button>
              </RevealBlock>
            ))}
          </div>

          {/* Expanded description for hovered color */}
          <div
            className="mt-6 p-4 border border-[#c9a227]/15 text-sm text-white/50 italic tracking-wide transition-all duration-300"
            style={{
              background: "rgba(30,58,95,0.1)",
              minHeight: "56px",
              opacity: hoveredColor !== null ? 1 : 0,
            }}
          >
            {hoveredColor !== null && paletteColors[hoveredColor].desc}
          </div>
        </div>
      </section>

      {/* ── 5. COMPONENT DEMO ── */}
      <section className="py-24 px-6 relative">
        <ShojiBg />
        <div className="max-w-5xl mx-auto relative z-10">
          <RevealBlock>
            <div className="text-center mb-12">
              <span className="text-xs tracking-[0.25em] text-[#c9a227]/60 uppercase block mb-3">
                要素 / Yōso
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ color: "#c9a227", fontFamily: "serif", textShadow: "0 0 20px rgba(201,162,39,0.2)" }}
              >
                Component Lexicon
              </h2>
              <p className="mt-3 text-white/40 text-sm">部品の辞典 — the vocabulary of the interface</p>
            </div>
          </RevealBlock>

          {/* Tab selector */}
          <RevealBlock delay={0.1}>
            <div className="flex justify-center gap-0 mb-10 border border-[#c9a227]/20">
              {(["button", "card", "input"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="flex-1 py-2.5 text-xs tracking-[0.15em] uppercase transition-all duration-200"
                  style={{
                    background: activeTab === tab ? "rgba(201,162,39,0.1)" : "transparent",
                    color: activeTab === tab ? "#c9a227" : "rgba(255,255,255,0.35)",
                    borderRight: tab !== "input" ? "1px solid rgba(201,162,39,0.2)" : "none",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Button demo */}
          {activeTab === "button" && (
            <RevealBlock>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Primary */}
                <div
                  className="p-6 border border-[#c9a227]/20 relative overflow-hidden"
                  style={{ background: "rgba(30,58,95,0.2)" }}
                >
                  <KintsugiCrackCorner />
                  <p className="text-xs text-white/30 tracking-[0.15em] mb-4 uppercase">Primary / 主要</p>
                  <button
                    className="w-full py-3 px-5 text-sm tracking-[0.15em] font-bold transition-all duration-200 hover:brightness-110"
                    style={{
                      background: "#1e3a5f",
                      border: "1px solid #c9a227",
                      color: "#c9a227",
                      boxShadow: "0 0 16px rgba(201,162,39,0.15)",
                    }}
                  >
                    起動 / Initialize
                  </button>
                  <p className="text-[10px] text-white/25 mt-3">Navy base + gold border + gold text</p>
                </div>

                {/* Secondary */}
                <div
                  className="p-6 border border-[#c41e3a]/20 relative overflow-hidden"
                  style={{ background: "rgba(196,30,58,0.06)" }}
                >
                  <KintsugiCrackCorner />
                  <p className="text-xs text-white/30 tracking-[0.15em] mb-4 uppercase">Secondary / 警戒</p>
                  <button
                    className="w-full py-3 px-5 text-sm tracking-[0.15em] font-bold transition-all duration-200 hover:brightness-110"
                    style={{
                      background: "transparent",
                      border: "1px solid #c41e3a",
                      color: "#c41e3a",
                      boxShadow: "0 0 12px rgba(196,30,58,0.12)",
                    }}
                  >
                    警告 / Alert
                  </button>
                  <p className="text-[10px] text-white/25 mt-3">Transparent + crimson outline</p>
                </div>

                {/* Ghost */}
                <div
                  className="p-6 border border-white/5 relative overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                >
                  <KintsugiCrackCorner />
                  <p className="text-xs text-white/30 tracking-[0.15em] mb-4 uppercase">Ghost / 幽霊</p>
                  <button
                    className="w-full py-3 px-5 text-sm tracking-[0.15em] font-bold transition-all duration-200 hover:text-[#c9a227]"
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    ゴースト / Ghost
                  </button>
                  <p className="text-[10px] text-white/25 mt-3">Minimal + katakana label</p>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Card demo */}
          {activeTab === "card" && (
            <RevealBlock>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card 1 */}
                <div
                  className="relative overflow-hidden border border-[#c9a227]/20 p-6"
                  style={{
                    background: "rgba(30,58,95,0.15)",
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(201,162,39,0.05) 30px), repeating-linear-gradient(90deg, transparent, transparent 29px, rgba(201,162,39,0.05) 30px)",
                  }}
                >
                  <KintsugiCrackCorner />
                  <div
                    className="inline-block text-xs tracking-[0.15em] px-2 py-1 mb-4"
                    style={{ border: "1px solid rgba(196,30,58,0.4)", color: "#c41e3a", background: "rgba(196,30,58,0.08)" }}
                  >
                    ・ PROTOCOL / 規約
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Washi Interface Layer</h3>
                  <p className="text-sm text-white/45 leading-relaxed">
                    Digital surfaces textured like handmade paper. Each component carries the grain of its material, the trace of its making.
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-[#c9a227]/30 to-transparent" />
                    <span className="text-[10px] text-[#c9a227]/50 tracking-widest">詳細</span>
                  </div>
                </div>

                {/* Card 2 */}
                <div
                  className="relative overflow-hidden border border-[#38bdf8]/15 p-6"
                  style={{ background: "rgba(56,189,248,0.04)" }}
                >
                  <KintsugiCrackCorner />
                  <div
                    className="inline-block text-xs tracking-[0.15em] px-2 py-1 mb-4"
                    style={{ border: "1px solid rgba(56,189,248,0.3)", color: "#38bdf8", background: "rgba(56,189,248,0.08)" }}
                  >
                    ・ DATA / データ
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Fiber Optic Scroll</h3>
                  <p className="text-sm text-white/45 leading-relaxed">
                    Ancient scrolls unrolled along fiber optic cables. The kanji of the classics transmitted at the speed of light.
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gradient-to-r from-[#38bdf8]/30 to-transparent" />
                    <span className="text-[10px] text-[#38bdf8]/50 tracking-widest">詳細</span>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Input demo */}
          {activeTab === "input" && (
            <RevealBlock>
              <div className="max-w-lg mx-auto space-y-6">
                {/* Text input */}
                <div>
                  <label className="block text-xs tracking-[0.18em] text-[#c9a227]/70 mb-2 uppercase">
                    入力 / Input Field
                  </label>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    placeholder="コマンドを入力 / Enter command..."
                    className="w-full px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-300"
                    style={{
                      background: "rgba(8,8,20,0.8)",
                      border: inputFocused ? "1px solid #c9a227" : "1px solid rgba(201,162,39,0.2)",
                      boxShadow: inputFocused ? "0 0 0 2px rgba(201,162,39,0.12), 0 0 20px rgba(201,162,39,0.08)" : "none",
                    }}
                  />
                  {inputValue && (
                    <p className="mt-2 text-[10px] text-[#38bdf8]/60 tracking-wide">
                      入力受付: <span className="text-[#38bdf8]/80 font-mono">{inputValue}</span>
                    </p>
                  )}
                </div>

                {/* Search input */}
                <div>
                  <label className="block text-xs tracking-[0.18em] text-[#c9a227]/70 mb-2 uppercase">
                    検索 / Search Field
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="検索... / Search..."
                      className="w-full px-4 py-3 pl-10 text-sm text-white placeholder-white/25 outline-none transition-all duration-300 hover:border-[#c9a227]/40"
                      style={{
                        background: "rgba(30,58,95,0.15)",
                        border: "1px solid rgba(201,162,39,0.2)",
                      }}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c9a227]/40 text-sm">
                      ⌖
                    </span>
                  </div>
                </div>

                {/* Select */}
                <div>
                  <label className="block text-xs tracking-[0.18em] text-[#c9a227]/70 mb-2 uppercase">
                    選択 / Select Field
                  </label>
                  <select
                    className="w-full px-4 py-3 text-sm text-white/70 outline-none appearance-none cursor-pointer"
                    style={{
                      background: "rgba(8,8,20,0.8)",
                      border: "1px solid rgba(201,162,39,0.2)",
                    }}
                  >
                    <option>伝統 / Traditional Mode</option>
                    <option>現代 / Modern Mode</option>
                    <option>融合 / Hybrid Mode</option>
                  </select>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ── 6. THE WAY OF WABISABI ── */}
      <section className="py-24 px-6 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(180deg, rgba(30,58,95,0.08) 0%, transparent 50%, rgba(196,30,58,0.04) 100%)" }}
        />
        <ShojiBg />

        <div className="max-w-5xl mx-auto relative z-10">
          <RevealBlock>
            <div className="text-center mb-14">
              <span className="text-xs tracking-[0.25em] text-[#c9a227]/60 uppercase block mb-3">
                道 / Dō
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ color: "#c9a227", fontFamily: "serif", textShadow: "0 0 20px rgba(201,162,39,0.2)" }}
              >
                The Way of Wabi-sabi
              </h2>
              <p className="mt-3 text-white/40 text-sm max-w-md mx-auto">
                侘び寂びの道 — Four scrolls for the practitioner of honest interfaces.
              </p>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {wabisabiPrinciples.map((p, i) => (
              <RevealBlock key={p.num} delay={i * 0.1}>
                <div
                  className="relative overflow-hidden border border-[#c9a227]/15 p-7 group hover:border-[#c9a227]/35 transition-all duration-300"
                  style={{ background: "rgba(8,8,20,0.7)" }}
                >
                  {/* Kintsugi crack on left edge */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none overflow-hidden">
                    <svg viewBox="0 0 32 200" fill="none" className="h-full w-full">
                      <path
                        d="M16 0 L20 50 L10 100 L18 150 L14 200"
                        stroke="#c9a227"
                        strokeWidth="1"
                        strokeLinecap="round"
                        style={{ filter: "drop-shadow(0 0 3px #c9a227)" }}
                        opacity="0.6"
                      />
                      <path
                        d="M20 50 L28 70"
                        stroke="#c9a227"
                        strokeWidth="0.6"
                        strokeLinecap="round"
                        opacity="0.4"
                      />
                    </svg>
                  </div>

                  <div className="pl-8">
                    {/* Number */}
                    <div
                      className="text-4xl font-bold mb-3 leading-none"
                      style={{
                        color: "#c9a227",
                        fontFamily: "serif",
                        textShadow: "0 0 20px rgba(201,162,39,0.3)",
                        opacity: 0.9,
                      }}
                    >
                      {p.num}
                    </div>
                    {/* Title */}
                    <h3 className="text-sm font-bold text-white/80 tracking-wide mb-3 leading-snug">
                      {p.title}
                    </h3>
                    {/* Body */}
                    <p className="text-xs text-white/45 leading-relaxed">
                      {p.body}
                    </p>
                  </div>

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(ellipse at top left, rgba(201,162,39,0.04), transparent 70%)" }}
                  />
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. TYPOGRAPHY ── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <RevealBlock>
            <div className="text-center mb-14">
              <span className="text-xs tracking-[0.25em] text-[#c9a227]/60 uppercase block mb-3">
                書体 / Shotai
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ color: "#38bdf8", textShadow: "0 0 20px rgba(56,189,248,0.2)" }}
              >
                Typography System
              </h2>
              <p className="mt-3 text-white/40 text-sm">文字の哲学 — the philosophy of characters</p>
            </div>
          </RevealBlock>

          {/* Large character showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {typographyChars.map((t, i) => (
              <RevealBlock key={t.char} delay={i * 0.12}>
                <div
                  className="relative overflow-hidden border border-[#c9a227]/15 p-8 text-center group hover:border-[#c9a227]/35 transition-all duration-300"
                  style={{ background: "rgba(30,58,95,0.08)" }}
                >
                  <div
                    className="text-[100px] leading-none font-bold mb-4 block"
                    style={{
                      color: "#c9a227",
                      fontFamily: "serif",
                      textShadow: "0 0 40px rgba(201,162,39,0.3)",
                      opacity: 0.9,
                    }}
                  >
                    {t.char}
                  </div>
                  <p className="text-lg font-bold text-white/80 tracking-widest">{t.meaning}</p>
                  <p className="text-xs text-[#38bdf8]/60 mt-1 tracking-[0.15em]">{t.style}</p>
                  <div className="h-px bg-gradient-to-r from-transparent via-[#c9a227]/30 to-transparent my-4" />
                  <p className="text-xs text-white/35 italic leading-relaxed">{t.note}</p>

                  {/* Shoji grid overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(201,162,39,0.05) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(201,162,39,0.05) 20px)",
                    }}
                  />
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Type scale */}
          <RevealBlock delay={0.2}>
            <div
              className="border border-[#c9a227]/15 relative overflow-hidden"
              style={{ background: "rgba(8,8,20,0.6)" }}
            >
              <div className="border-b border-[#c9a227]/10 px-6 py-3 flex items-center gap-3">
                <span className="text-[10px] tracking-[0.2em] text-[#c9a227]/60 uppercase">Type Scale / 文字サイズ</span>
              </div>
              <div className="p-6 space-y-5">
                {[
                  { label: "Display", size: "text-4xl", jp: "文字は魂の形", en: "Characters hold the soul's form" },
                  { label: "Heading", size: "text-2xl", jp: "道は続く", en: "The path continues" },
                  { label: "Body", size: "text-base", jp: "間の美学は沈黙の中にある", en: "The aesthetics of ma live in silence" },
                  { label: "Caption", size: "text-xs", jp: "壊れた所に光が入る — it is through broken places that light enters", en: "" },
                ].map((row) => (
                  <div key={row.label} className="flex items-baseline gap-6">
                    <span className="text-[10px] text-[#c9a227]/40 tracking-widest w-16 flex-shrink-0">{row.label}</span>
                    <div>
                      <p
                        className={`${row.size} text-white/70 leading-snug`}
                        style={{ fontFamily: row.label === "Display" || row.label === "Heading" ? "serif" : "inherit" }}
                      >
                        {row.jp}
                      </p>
                      {row.en && <p className="text-xs text-white/25 mt-0.5 italic">{row.en}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 8. FOOTER ── */}
      <footer
        className="relative py-20 px-6 border-t border-[#c9a227]/15 overflow-hidden"
        style={{ background: "#080814" }}
      >
        <ShojiBg />

        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(201,162,39,0.05) 0%, transparent 70%)" }}
        />

        <div className="max-w-5xl mx-auto relative z-10 text-center">
          {/* Mon circle */}
          <div className="w-24 h-24 mx-auto mb-8 opacity-80">
            <MonCircle />
          </div>

          {/* Logo text */}
          <p
            className="text-2xl font-bold tracking-[0.25em] mb-3"
            style={{ color: "#c9a227", fontFamily: "serif", textShadow: "0 0 20px rgba(201,162,39,0.3)" }}
          >
            赛博和風
          </p>
          <p className="text-xs tracking-[0.3em] text-white/30 uppercase mb-10">
            Cyber Wafuu — Heritage Meets Protocol
          </p>

          {/* Divider with kintsugi motif */}
          <div className="flex items-center justify-center gap-6 mb-10">
            <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent to-[#c9a227]/30" />
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
              <circle cx="10" cy="10" r="8" stroke="#c9a227" strokeWidth="1" opacity="0.5" />
              <circle cx="10" cy="10" r="2" fill="#c9a227" opacity="0.7" />
              <path d="M10 2 L10 5 M10 15 L10 18 M2 10 L5 10 M15 10 L18 10" stroke="#c9a227" strokeWidth="1" opacity="0.4" />
            </svg>
            <div className="h-px flex-1 max-w-32 bg-gradient-to-l from-transparent to-[#c9a227]/30" />
          </div>

          {/* Katakana decoration */}
          <p className="text-xs tracking-[0.35em] text-white/15 mb-8">
            サ イ バ ー ・ 和 風 ・ ス タ イ ル キ ッ ト
          </p>

          <Link
            href="/styles/cyber-wafuu"
            className="inline-block text-xs tracking-[0.2em] text-[#c9a227]/50 hover:text-[#c9a227] transition-colors duration-200 border border-[#c9a227]/20 hover:border-[#c9a227]/50 px-6 py-2.5"
          >
            ← スタイルに戻る / Back to Style
          </Link>

          <p className="mt-10 text-[10px] text-white/15 tracking-widest">
            不完全さの中に美がある — beauty lives in imperfection
          </p>
        </div>
      </footer>

      {/* Global keyframes */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
