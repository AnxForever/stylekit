"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Global keyframe styles                                              */
/* ------------------------------------------------------------------ */

const globalCss = `
@keyframes vnFadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes vnBlink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
@keyframes vnFloat {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-6px); }
}
@keyframes vnShimmer {
  from { transform: translateX(-100%); }
  to   { transform: translateX(100%); }
}
`;

/* ------------------------------------------------------------------ */
/*  Inline hooks                                                        */
/* ------------------------------------------------------------------ */

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
      { threshold: 0.15, ...options },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

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
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Static data                                                         */
/* ------------------------------------------------------------------ */

const DIALOG_CHARS = [
  {
    name: "Sakura",
    title: "The Dreamer",
    color: "#6366f1",
    bgColor: "rgba(99,102,241,0.15)",
    borderColor: "rgba(99,102,241,0.30)",
    gradFrom: "#6366f1",
    gradTo: "#4f46e5",
    lines: [
      "\"The cherry blossoms are beautiful this time of year... Every petal that falls carries a story of its own.\"",
      "\"I used to sit under this very tree when I was a child. Father would tell me — the blossoms bloom so briefly because their beauty is worth protecting.\"",
      "\"Do you ever feel that a moment is so perfect, you almost want to freeze time entirely? That is how I feel right now.\"",
    ],
  },
  {
    name: "Hana",
    title: "The Wanderer",
    color: "#ec4899",
    bgColor: "rgba(236,72,153,0.15)",
    borderColor: "rgba(236,72,153,0.30)",
    gradFrom: "#ec4899",
    gradTo: "#db2777",
    lines: [
      "\"I have seen a hundred towns just like this one. But this lantern light... there is something here I cannot name.\"",
      "\"Every journey has a destination only the road knows. We just have to be patient enough to listen to our feet.\"",
      "\"I do not carry a map. Maps are promises made by people who stayed in one place too long.\"",
    ],
  },
  {
    name: "Kenji",
    title: "The Archivist",
    color: "#10b981",
    bgColor: "rgba(16,185,129,0.12)",
    borderColor: "rgba(16,185,129,0.28)",
    gradFrom: "#10b981",
    gradTo: "#059669",
    lines: [
      "\"Every document tells two stories: the one written in ink, and the one hidden in the margins.\"",
      "\"The archive holds memory that bodies cannot. Empires rise and fall, but the records persist — if someone cares enough to protect them.\"",
      "\"This particular entry predates the war by six decades. Whoever wrote it knew what was coming.\"",
    ],
  },
];

const CHAPTERS = [
  {
    id: "spring",
    label: "Spring Encounter",
    subLabel: "Act I — The Meeting",
    desc: "Under the cherry blossom tree, a chance meeting changes everything.",
  },
  {
    id: "summer",
    label: "Summer Festival",
    subLabel: "Act II — The Bond",
    desc: "Lanterns drift upward into the velvet night sky.",
  },
  {
    id: "autumn",
    label: "Autumn Farewell",
    subLabel: "Act III — The Parting",
    desc: "The leaves fall like letters never sent.",
  },
  {
    id: "winter",
    label: "Winter Promise",
    subLabel: "Act IV — The Return",
    desc: "Snow covers everything — even the words we could not say.",
  },
];

const COLOR_PALETTE = [
  { name: "Slate", hex: "#4a5568", role: "Primary — text, dark panels", label: "Primary" },
  { name: "Light", hex: "#f7fafc", role: "Secondary — bg, card fills", label: "Secondary" },
  { name: "Indigo", hex: "#6366f1", role: "Accent A — primary UI", label: "Accent A" },
  { name: "Pink", hex: "#ec4899", role: "Accent B — Hana character", label: "Accent B" },
  { name: "Emerald", hex: "#10b981", role: "Accent C — Kenji character", label: "Accent C" },
];

const DO_RULES = [
  "Semi-transparent dialog panels: bg-[#1a202c]/85 backdrop-blur-md",
  "L-shaped corner decorations using absolute-positioned spans",
  "Character nameplates as colored badge strips — -top-4 left-6",
  "Frosted glass choice buttons with shimmer on hover",
  "Serif fonts (font-serif) for all in-world dialog text",
  "Atmospheric gradients for scene backgrounds",
  "Indigo accent (#6366f1) as the primary UI interaction color",
];

const DONT_RULES = [
  "Never use flat white or solid opaque panels for dialog boxes",
  "Never omit corner decorations on key interactive panels",
  "Never use sans-serif fonts for in-world character dialog",
  "Never use bright primary colors outside of the defined palette",
  "Never use thick borders — 1px at 20–40% opacity only",
  "Never animate choice buttons with aggressive scaling transforms",
  "Never use drop shadows without specifying rgba with low opacity",
];

const COMPONENT_TABS = ["Button", "Card", "Input"] as const;
type ComponentTab = typeof COMPONENT_TABS[number];

/* ------------------------------------------------------------------ */
/*  Main component                                                      */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [activeChar, setActiveChar] = useState(0);
  const [dialogPage, setDialogPage] = useState(0);
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ComponentTab>("Button");

  const char = DIALOG_CHARS[activeChar];
  const line = char.lines[dialogPage % char.lines.length];

  function nextDialog() {
    setDialogPage((p) => p + 1);
  }

  function switchChar(idx: number) {
    setActiveChar(idx);
    setDialogPage(0);
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, #1a202c 0%, #2d3748 50%, #1a202c 100%)" }}
    >
      {/* Global keyframes */}
      <style>{globalCss}</style>

      {/* ============================================================ */}
      {/* SECTION 1: Fixed Nav                                         */}
      {/* ============================================================ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-[#6366f1]/20"
        style={{
          background: "rgba(26,32,44,0.90)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <Link
              href="/styles/visual-novel"
              className="font-sans text-[13px] tracking-wider text-[#a5b4fc]/75 hover:text-white transition-colors duration-200 flex items-center gap-1.5"
            >
              <span>&larr;</span>
              Back to Docs
            </Link>
            <span className="text-white/15 text-xs">|</span>
            <span className="font-sans text-[13px] tracking-widest text-[#f7fafc]">
              Visual Novel
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {["hero", "dialog", "chapters", "components", "palette", "rules"].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="group relative font-sans text-[11px] tracking-[0.1em] uppercase text-[#a5b4fc]/60 hover:text-white transition-colors duration-200"
              >
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-[#6366f1] transition-all duration-300 mr-1">
                  &#9654;
                </span>
                {id}
              </a>
            ))}
          </div>

          <div className="font-sans text-[10px] tracking-[0.18em] text-white/30">
            視覚小説
          </div>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* SECTION 2: Hero — ADV Scene                                  */}
      {/* ============================================================ */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-end overflow-hidden pt-14"
        style={{
          background:
            "linear-gradient(180deg, #4a6fa5 0%, #7b9cc7 40%, #c4a882 70%, #e8c19a 100%)",
        }}
      >
        {/* Atmospheric particles */}
        {[
          { top: "10%", left: "15%", size: 5, op: 0.3, color: "#6366f1" },
          { top: "22%", left: "70%", size: 3, op: 0.2, color: "#ec4899" },
          { top: "38%", left: "85%", size: 6, op: 0.25, color: "#f7fafc" },
          { top: "55%", left: "5%", size: 4, op: 0.18, color: "#10b981" },
          { top: "65%", left: "50%", size: 3, op: 0.15, color: "#6366f1" },
          { top: "8%", left: "42%", size: 4, op: 0.22, color: "#f7fafc" },
          { top: "30%", left: "28%", size: 2, op: 0.28, color: "#ec4899" },
        ].map((p, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: p.color,
              opacity: p.op,
              filter: "blur(1px)",
              pointerEvents: "none",
              animation: `vnFloat ${3 + i * 0.7}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* Character silhouettes */}
        <div className="absolute bottom-[28%] left-1/2 -translate-x-1/2 flex items-end gap-16 pointer-events-none">
          {/* Left silhouette */}
          <div className="flex flex-col items-center opacity-20" style={{ animation: "vnFloat 4s ease-in-out infinite" }}>
            <div className="w-8 h-8 rounded-full bg-[#1a202c] mb-[-2px]" />
            <div className="w-14 h-[100px] bg-[#1a202c]" style={{ borderRadius: "30% 30% 0 0" }} />
          </div>
          {/* Center main silhouette */}
          <div className="flex flex-col items-center opacity-30" style={{ animation: "vnFloat 3.5s ease-in-out infinite 0.5s" }}>
            <div className="w-10 h-10 rounded-full bg-[#1a202c] mb-[-2px]" />
            <div className="w-18 h-[120px] bg-[#1a202c]" style={{ width: 72, borderRadius: "28% 28% 0 0" }} />
          </div>
          {/* Right silhouette */}
          <div className="flex flex-col items-center opacity-20" style={{ animation: "vnFloat 4.5s ease-in-out infinite 1s" }}>
            <div className="w-7 h-7 rounded-full bg-[#1a202c] mb-[-2px]" />
            <div className="w-12 h-[90px] bg-[#1a202c]" style={{ borderRadius: "30% 30% 0 0" }} />
          </div>
        </div>

        {/* Floating title */}
        <div className="relative z-10 text-center px-6 mb-8" style={{ animation: "vnFadeUp 1s ease-out 0.2s both" }}>
          <div
            className="inline-block font-sans text-[10px] tracking-[0.25em] uppercase text-[#1a202c]/60 border border-[#1a202c]/20 rounded px-4 py-1 mb-5"
          >
            Chapter I
          </div>
          <h1
            className="font-serif text-[#1a202c]/75 mb-3"
            style={{ fontSize: "clamp(2.2rem,6vw,4rem)", fontWeight: 400, letterSpacing: "0.03em", lineHeight: 1.2 }}
          >
            視覚小説風
          </h1>
          <p
            className="font-serif italic text-[#1a202c]/50 max-w-md mx-auto"
            style={{ fontSize: "clamp(0.95rem,2vw,1.15rem)", lineHeight: 1.7 }}
          >
            ADV visual novel aesthetics — translucent dialog panels, character nameplates,
            ornate corner frames, and atmospheric scene compositions.
          </p>
        </div>

        {/* ADV Dialog panel at bottom — Narrator */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-10">
          <div className="relative mt-6">
            {/* Narrator nameplate */}
            <div
              className="absolute -top-4 left-6 px-6 py-1.5 rounded-t-md rounded-br-md z-10"
              style={{
                background: "linear-gradient(90deg, #4a5568, #2d3748)",
                boxShadow: "0 4px 10px rgba(74,85,104,0.4)",
              }}
            >
              <span className="font-sans font-bold text-white tracking-wide text-sm">Narrator</span>
            </div>
            {/* Dialog panel */}
            <div
              className="group relative rounded-xl p-8 pt-10 border border-white/20 hover:border-white/35 hover:-translate-y-0.5 transition-all duration-500 ease-out cursor-text"
              style={{
                background: "rgba(26,32,44,0.82)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
              }}
            >
              {/* L-corner decorations */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-white/25" />
              <div className="absolute top-3 right-3 w-4 h-4 border-r border-t border-white/25" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-white/25" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-white/25" />
              {/* Blink indicator */}
              <div
                className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 text-white/60 transition-opacity duration-300"
                style={{ animation: "vnBlink 1.2s ease-in-out infinite" }}
              >
                ▼
              </div>
              <p
                className="font-serif text-white/85 leading-relaxed tracking-wide"
                style={{ fontSize: "clamp(0.95rem,1.8vw,1.1rem)" }}
              >
                "The sky burned amber as evening claimed the town. Two figures stood beneath
                the ancient cherry tree — their meeting, though neither knew it yet, would
                change the course of everything that followed..."
              </p>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-8 bg-[#1a202c]/50" />
          <span className="font-sans text-[9px] tracking-[0.18em] text-[#1a202c]/60">SCROLL</span>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3: Chapter Selection                                 */}
      {/* ============================================================ */}
      <section
        id="chapters"
        className="py-24 px-6"
        style={{ background: "rgba(17,24,39,0.92)" }}
      >
        <div className="max-w-3xl mx-auto">
          <RevealBlock delay={0}>
            <div className="text-center mb-14">
              <div className="inline-block font-sans text-[10px] tracking-[0.22em] uppercase text-[#a5b4fc]/60 border border-[#6366f1]/25 rounded px-4 py-1 mb-4">
                Section 01 — Story Branches
              </div>
              <h2
                className="font-serif text-[#f7fafc] font-normal mb-3"
                style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)" }}
              >
                Chapter Selection
              </h2>
              <p className="font-sans text-[14px] text-white/40 max-w-sm mx-auto leading-relaxed">
                Choose a chapter to follow. Each path leads somewhere different.
              </p>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div
              className="font-serif italic text-center text-white/45 mb-8"
              style={{ fontSize: "1rem" }}
            >
              "The story awaits. Which chapter will you open?"
            </div>
          </RevealBlock>

          <div className="flex flex-col gap-3">
            {CHAPTERS.map((ch, i) => (
              <RevealBlock key={ch.id} delay={0.15 + i * 0.08}>
                <button
                  onClick={() => setActiveChapter(activeChapter === ch.id ? null : ch.id)}
                  className="group relative w-full px-8 py-4 text-left rounded-lg border border-[#6366f1]/30 hover:bg-[#6366f1]/20 hover:border-[#6366f1]/60 hover:text-white hover:-translate-y-0.5 active:translate-x-2 transition-all duration-300 ease-out overflow-hidden"
                  style={{
                    background:
                      activeChapter === ch.id
                        ? "rgba(99,102,241,0.18)"
                        : "rgba(26,32,44,0.60)",
                    backdropFilter: "blur(8px)",
                    color: "#e2e8f0",
                  }}
                >
                  {/* Shimmer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  <div className="flex items-center gap-3 relative z-10">
                    <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-[#6366f1] transition-all duration-300 font-sans text-sm">
                      &#9654;
                    </span>
                    <div className="flex-1">
                      <div className="font-sans text-lg font-medium">{ch.label}</div>
                      {activeChapter === ch.id && (
                        <div className="mt-1 font-sans text-xs tracking-widest text-[#a5b4fc]/60 uppercase">
                          {ch.subLabel}
                        </div>
                      )}
                      {activeChapter === ch.id && (
                        <div className="mt-2 font-serif italic text-sm text-white/55 leading-relaxed">
                          {ch.desc}
                        </div>
                      )}
                    </div>
                    <span className="font-sans text-xs tracking-widest text-[#6366f1]/50 font-mono">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </button>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4: Dialog System Demo                                */}
      {/* ============================================================ */}
      <section
        id="dialog"
        className="py-24 px-6"
        style={{ background: "rgba(26,32,44,0.85)" }}
      >
        <div className="max-w-5xl mx-auto">
          <RevealBlock delay={0}>
            <div className="text-center mb-14">
              <div className="inline-block font-sans text-[10px] tracking-[0.22em] uppercase text-[#a5b4fc]/60 border border-[#6366f1]/25 rounded px-4 py-1 mb-4">
                Section 02 — Dialog System
              </div>
              <h2
                className="font-serif text-[#f7fafc] font-normal mb-3"
                style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)" }}
              >
                ADV Dialog Box
              </h2>
              <p className="font-sans text-[14px] text-white/40 max-w-md mx-auto leading-relaxed">
                The core ADV interface — bottom-anchored dialog panel with character nameplate,
                L-shaped corner decorations, and speaker switching.
              </p>
            </div>
          </RevealBlock>

          {/* Interactive dialog demo */}
          <RevealBlock delay={0.1}>
            <div
              className="relative rounded-xl overflow-hidden border border-[#6366f1]/18"
              style={{
                background: "linear-gradient(180deg, #1a202c 0%, #2d3748 60%, #374151 100%)",
                minHeight: 460,
              }}
            >
              {/* Scene outer corner decorations */}
              <div className="absolute top-3 left-3 w-5 h-5 border-l border-t border-[#6366f1]/35" />
              <div className="absolute top-3 right-3 w-5 h-5 border-r border-t border-[#6366f1]/35" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-l border-b border-[#6366f1]/35" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-r border-b border-[#6366f1]/35" />

              {/* Bokeh in scene */}
              {[
                { top: "12%", left: "20%", size: 5, op: 0.18, color: "#6366f1" },
                { top: "28%", left: "75%", size: 4, op: 0.15, color: "#ec4899" },
                { top: "50%", left: "10%", size: 6, op: 0.12, color: "#10b981" },
              ].map((d, i) => (
                <span
                  key={i}
                  style={{
                    position: "absolute",
                    top: d.top,
                    left: d.left,
                    width: d.size,
                    height: d.size,
                    borderRadius: "50%",
                    background: d.color,
                    opacity: d.op,
                    filter: "blur(2px)",
                    pointerEvents: "none",
                  }}
                />
              ))}

              {/* Character silhouette */}
              <div className="absolute bottom-[33%] left-1/2 -translate-x-1/2 flex flex-col items-center opacity-15 pointer-events-none" style={{ transition: "all 0.4s ease" }}>
                <div
                  className="w-7 h-7 rounded-full mb-[-2px]"
                  style={{ background: char.color, transition: "background 0.4s ease" }}
                />
                <div
                  className="w-12 h-[85px]"
                  style={{ background: char.color, borderRadius: "26% 26% 0 0", transition: "background 0.4s ease" }}
                />
              </div>

              {/* Speaker selector tabs */}
              <div className="absolute bottom-[170px] left-0 right-0 flex gap-2 px-6 md:px-8">
                {DIALOG_CHARS.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => switchChar(i)}
                    className="font-sans text-[11px] tracking-widest transition-all duration-250"
                    style={{
                      padding: "5px 16px",
                      borderRadius: "4px 4px 0 0",
                      border: `1px solid ${activeChar === i ? c.color : "rgba(255,255,255,0.10)"}`,
                      borderBottom: activeChar === i ? `2px solid ${c.color}` : "1px solid transparent",
                      background: activeChar === i ? `${c.color}22` : "rgba(255,255,255,0.04)",
                      color: activeChar === i ? c.color : "rgba(255,255,255,0.38)",
                      cursor: "pointer",
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>

              {/* Dialog panel */}
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{
                  background: "rgba(26,32,44,0.88)",
                  backdropFilter: "blur(16px)",
                  borderTop: `1px solid ${char.borderColor}`,
                  padding: "32px 28px 24px",
                  minHeight: 170,
                }}
              >
                {/* L-corner decorations */}
                <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-[#6366f1]/30" />
                <div className="absolute top-3 right-3 w-4 h-4 border-r border-t border-[#6366f1]/30" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-[#6366f1]/30" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-[#6366f1]/30" />

                {/* Nameplate */}
                <div
                  className="absolute -top-4 left-6 px-6 py-1.5 rounded-t-md rounded-br-md z-10"
                  style={{
                    background: `linear-gradient(90deg, ${char.gradFrom}, ${char.gradTo})`,
                    boxShadow: `0 4px 10px ${char.color}4d`,
                    transition: "background 0.35s ease",
                  }}
                >
                  <span className="font-sans font-bold text-white tracking-wide text-sm">{char.name}</span>
                  <span className="font-sans text-[10px] text-white/60 italic ml-2">{char.title}</span>
                </div>

                {/* Dialog text */}
                <p
                  className="font-serif text-white/88 leading-relaxed tracking-wide mb-4"
                  style={{
                    fontSize: "clamp(0.9rem,1.8vw,1.05rem)",
                    minHeight: 72,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {line}
                </p>

                <div className="flex items-center justify-between">
                  <div className="font-sans text-[10px] tracking-widest text-white/22">
                    {(dialogPage % char.lines.length) + 1} / {char.lines.length}
                  </div>
                  <button
                    onClick={nextDialog}
                    className="group flex items-center gap-2 font-sans text-[11px] tracking-widest text-[#a5b4fc]/75 hover:text-white transition-colors duration-200"
                    style={{
                      padding: "6px 16px",
                      background: "rgba(99,102,241,0.12)",
                      border: "1px solid rgba(99,102,241,0.28)",
                      borderRadius: 3,
                      cursor: "pointer",
                    }}
                  >
                    <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#6366f1] transition-all duration-300">&#9654;</span>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Three dialog cards (exact card pattern) */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {DIALOG_CHARS.map((c, idx) => (
              <RevealBlock key={c.name} delay={0.1 + idx * 0.1}>
                <div className="relative mt-6">
                  {/* Character nameplate */}
                  <div
                    className="absolute -top-4 left-6 px-6 py-1.5 rounded-t-md rounded-br-md z-10"
                    style={{
                      background: `linear-gradient(90deg, ${c.gradFrom}, ${c.gradTo})`,
                      boxShadow: `0 4px 10px ${c.color}4d`,
                    }}
                  >
                    <span className="font-sans font-bold text-white tracking-wide text-sm">{c.name}</span>
                  </div>
                  {/* Dialog panel */}
                  <div
                    className="group relative rounded-xl p-8 pt-10 border hover:border-[#6366f1]/40 hover:-translate-y-0.5 transition-all duration-500 ease-out cursor-text"
                    style={{
                      background: "rgba(26,32,44,0.85)",
                      backdropFilter: "blur(16px)",
                      border: `1px solid ${c.color}33`,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    }}
                  >
                    {/* L-corner decorations */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-[#6366f1]/30" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-r border-t border-[#6366f1]/30" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-[#6366f1]/30" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-[#6366f1]/30" />
                    {/* Hover blink indicator */}
                    <div
                      className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: c.color, animation: "vnBlink 1.2s ease-in-out infinite" }}
                    >
                      ▼
                    </div>
                    <p
                      className="font-serif text-white/88 leading-relaxed tracking-wide"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {c.lines[0]}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5: Component Demo                                    */}
      {/* ============================================================ */}
      <section
        id="components"
        className="py-24 px-6"
        style={{ background: "rgba(17,24,39,0.92)" }}
      >
        <div className="max-w-5xl mx-auto">
          <RevealBlock delay={0}>
            <div className="text-center mb-14">
              <div className="inline-block font-sans text-[10px] tracking-[0.22em] uppercase text-[#a5b4fc]/60 border border-[#6366f1]/25 rounded px-4 py-1 mb-4">
                Section 03 — Component Library
              </div>
              <h2
                className="font-serif text-[#f7fafc] font-normal mb-3"
                style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)" }}
              >
                Component Showcase
              </h2>
              <p className="font-sans text-[14px] text-white/40 max-w-md mx-auto leading-relaxed">
                All interactive elements styled to the visual novel aesthetic.
              </p>
            </div>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.08}>
            <div className="flex items-center gap-0 mb-10 border-b border-[#6366f1]/20">
              {COMPONENT_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="group relative font-sans text-[12px] tracking-widest uppercase transition-all duration-250"
                  style={{
                    padding: "10px 28px",
                    color: activeTab === tab ? "#a5b4fc" : "rgba(255,255,255,0.35)",
                    background: "transparent",
                    border: "none",
                    borderBottom: activeTab === tab ? "2px solid #6366f1" : "2px solid transparent",
                    cursor: "pointer",
                  }}
                >
                  <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#6366f1] transition-all duration-300 mr-1">&#9654;</span>
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab content */}
          <RevealBlock delay={0.12}>
            <div
              className="relative rounded-xl border border-[#6366f1]/18 p-10"
              style={{ background: "rgba(26,32,44,0.70)", backdropFilter: "blur(12px)" }}
            >
              {/* Corner decorations */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-[#6366f1]/30" />
              <div className="absolute top-3 right-3 w-4 h-4 border-r border-t border-[#6366f1]/30" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-[#6366f1]/30" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-[#6366f1]/30" />

              {/* Button tab */}
              {activeTab === "Button" && (
                <div className="flex flex-col gap-4 max-w-lg">
                  <div className="font-sans text-[10px] tracking-[0.18em] uppercase text-[#a5b4fc]/50 mb-2">
                    Choice Button — Primary Interaction
                  </div>

                  {/* Exact gold-standard button pattern */}
                  <button className="group relative w-full px-8 py-4 bg-[#1a202c]/60 backdrop-blur-md text-[#e2e8f0] font-sans text-lg text-left rounded-lg border border-[#6366f1]/30 hover:bg-[#6366f1]/20 hover:border-[#6366f1]/60 hover:text-white hover:-translate-y-0.5 active:translate-x-2 transition-all duration-300 ease-out overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                    <div className="flex items-center gap-3 relative z-10">
                      <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-[#6366f1] transition-all duration-300">&#9654;</span>
                      <span>"I should go to the rooftop and watch the sunset."</span>
                    </div>
                  </button>

                  <button className="group relative w-full px-8 py-4 bg-[#1a202c]/60 backdrop-blur-md text-[#e2e8f0] font-sans text-lg text-left rounded-lg border border-[#ec4899]/30 hover:bg-[#ec4899]/20 hover:border-[#ec4899]/60 hover:text-white hover:-translate-y-0.5 active:translate-x-2 transition-all duration-300 ease-out overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                    <div className="flex items-center gap-3 relative z-10">
                      <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-[#ec4899] transition-all duration-300">&#9654;</span>
                      <span>"Stay and talk to Hana a little longer."</span>
                    </div>
                  </button>

                  <button className="group relative w-full px-8 py-4 bg-[#1a202c]/60 backdrop-blur-md text-[#e2e8f0] font-sans text-lg text-left rounded-lg border border-[#10b981]/30 hover:bg-[#10b981]/20 hover:border-[#10b981]/60 hover:text-white hover:-translate-y-0.5 active:translate-x-2 transition-all duration-300 ease-out overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                    <div className="flex items-center gap-3 relative z-10">
                      <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-[#10b981] transition-all duration-300">&#9654;</span>
                      <span>"Ask Kenji about the old archive records."</span>
                    </div>
                  </button>

                  {/* Confirm & Cancel */}
                  <div className="flex gap-3 mt-2">
                    <button
                      className="flex-1 font-sans text-sm tracking-widest text-white rounded transition-all duration-200 hover:-translate-y-0.5 active:translate-x-2"
                      style={{
                        padding: "10px 0",
                        background: "rgba(99,102,241,0.80)",
                        border: "1px solid rgba(99,102,241,0.55)",
                        cursor: "pointer",
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      className="flex-1 font-sans text-sm tracking-widest rounded transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        padding: "10px 0",
                        background: "rgba(236,72,153,0.10)",
                        border: "1px solid rgba(236,72,153,0.22)",
                        color: "rgba(249,168,212,0.75)",
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Card tab */}
              {activeTab === "Card" && (
                <div className="max-w-lg">
                  <div className="font-sans text-[10px] tracking-[0.18em] uppercase text-[#a5b4fc]/50 mb-6">
                    ADV Dialog Card — with Nameplate
                  </div>

                  {/* Exact gold-standard card pattern */}
                  <div className="relative mt-6">
                    <div
                      className="absolute -top-4 left-6 px-6 py-1.5 rounded-t-md rounded-br-md z-10"
                      style={{
                        background: "linear-gradient(90deg, #6366f1, #4f46e5)",
                        boxShadow: "0 4px 10px rgba(99,102,241,0.3)",
                      }}
                    >
                      <span className="font-sans font-bold text-white tracking-wide">Sakura</span>
                    </div>
                    <div
                      className="group relative rounded-xl p-8 pt-10 border border-[#6366f1]/20 hover:border-[#6366f1]/40 hover:bg-[#1a202c]/90 hover:-translate-y-0.5 transition-all duration-500 ease-out cursor-text"
                      style={{
                        background: "rgba(26,32,44,0.85)",
                        backdropFilter: "blur(16px)",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                      }}
                    >
                      <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-[#6366f1]/30" />
                      <div className="absolute top-3 right-3 w-4 h-4 border-r border-t border-[#6366f1]/30" />
                      <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-[#6366f1]/30" />
                      <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-[#6366f1]/30" />
                      <div
                        className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 group-hover:animate-bounce text-[#6366f1] transition-opacity duration-300"
                      >
                        ▼
                      </div>
                      <p className="font-serif text-white/90 text-xl leading-relaxed tracking-wide">
                        "The cherry blossoms are beautiful this time of year..."
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Input tab */}
              {activeTab === "Input" && (
                <div className="max-w-lg flex flex-col gap-6">
                  <div className="font-sans text-[10px] tracking-[0.18em] uppercase text-[#a5b4fc]/50 mb-2">
                    Input Fields — Player Data Entry
                  </div>
                  <div>
                    <label className="block font-sans text-[11px] tracking-widest uppercase text-[#a5b4fc]/55 mb-2">
                      Player Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name..."
                      className="w-full font-serif text-white/85 rounded outline-none focus:border-[#6366f1]/50 transition-colors duration-200"
                      style={{
                        padding: "10px 14px",
                        background: "rgba(26,32,44,0.75)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(99,102,241,0.25)",
                        fontSize: "0.95rem",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[11px] tracking-widest uppercase text-[#a5b4fc]/55 mb-2">
                      Chapter Note
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Leave a note for this save..."
                      className="w-full font-serif text-white/75 rounded outline-none resize-none focus:border-[#6366f1]/50 transition-colors duration-200"
                      style={{
                        padding: "10px 14px",
                        background: "rgba(26,32,44,0.75)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(99,102,241,0.25)",
                        fontSize: "0.9rem",
                        lineHeight: 1.65,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[11px] tracking-widest uppercase text-[#a5b4fc]/55 mb-2">
                      Route Select
                    </label>
                    <select
                      className="w-full font-sans text-white/75 rounded outline-none"
                      style={{
                        padding: "10px 14px",
                        background: "rgba(26,32,44,0.75)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(99,102,241,0.25)",
                        fontSize: "0.9rem",
                        boxSizing: "border-box",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">Select a route...</option>
                      <option value="sakura">Sakura Route</option>
                      <option value="hana">Hana Route</option>
                      <option value="kenji">Kenji Route</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 6: Color Palette                                     */}
      {/* ============================================================ */}
      <section
        id="palette"
        className="py-24 px-6"
        style={{ background: "rgba(26,32,44,0.90)" }}
      >
        <div className="max-w-5xl mx-auto">
          <RevealBlock delay={0}>
            <div className="text-center mb-14">
              <div className="inline-block font-sans text-[10px] tracking-[0.22em] uppercase text-[#a5b4fc]/60 border border-[#6366f1]/25 rounded px-4 py-1 mb-4">
                Section 04 — Color System
              </div>
              <h2
                className="font-serif text-[#f7fafc] font-normal mb-3"
                style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)" }}
              >
                Palette
              </h2>
              <p className="font-sans text-[14px] text-white/40 max-w-sm mx-auto leading-relaxed">
                Five tones form the visual novel world — from deep slate through luminous
                indigo, pink, and emerald.
              </p>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {COLOR_PALETTE.map((c, i) => (
              <RevealBlock key={c.hex} delay={0.07 * i}>
                <div
                  className="group relative rounded-xl border border-white/10 overflow-hidden hover:-translate-y-0.5 transition-all duration-500 ease-out"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {/* Corner decorations */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-l border-t border-[#6366f1]/25" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-r border-b border-[#6366f1]/25" />

                  {/* Swatch with nameplate badge */}
                  <div className="relative" style={{ height: 100, background: c.hex }}>
                    <div
                      className="absolute bottom-2 left-2 font-sans font-bold text-[9px] tracking-widest uppercase px-2 py-0.5 rounded"
                      style={{
                        background: "rgba(26,32,44,0.75)",
                        color: "rgba(255,255,255,0.75)",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {c.label}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="font-sans font-semibold text-[13px] text-[#f7fafc] mb-1 tracking-wide">
                      {c.name}
                    </div>
                    <div className="font-mono text-[11px] text-[#a5b4fc]/65 mb-2">
                      {c.hex}
                    </div>
                    <div className="font-sans text-[10px] text-white/28 leading-relaxed">
                      {c.role}
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 7: Design Rules — Do / Don't                        */}
      {/* ============================================================ */}
      <section
        id="rules"
        className="py-24 px-6"
        style={{ background: "rgba(17,24,39,0.92)" }}
      >
        <div className="max-w-5xl mx-auto">
          <RevealBlock delay={0}>
            <div className="text-center mb-14">
              <div className="inline-block font-sans text-[10px] tracking-[0.22em] uppercase text-[#a5b4fc]/60 border border-[#6366f1]/25 rounded px-4 py-1 mb-4">
                Section 05 — Design Rules
              </div>
              <h2
                className="font-serif text-[#f7fafc] font-normal mb-3"
                style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)" }}
              >
                The Tutorial
              </h2>
              <p
                className="font-serif italic text-white/40 max-w-sm mx-auto leading-relaxed"
                style={{ fontSize: "0.95rem" }}
              >
                "Pay attention — these rules will serve you well on this journey."
              </p>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* DO panel — wrapped in dialog panel styling */}
            <RevealBlock delay={0.1}>
              <div className="relative mt-6">
                <div
                  className="absolute -top-4 left-6 px-6 py-1.5 rounded-t-md rounded-br-md z-10"
                  style={{
                    background: "linear-gradient(90deg, #10b981, #059669)",
                    boxShadow: "0 4px 10px rgba(16,185,129,0.3)",
                  }}
                >
                  <span className="font-sans font-bold text-white tracking-wide text-sm">DO</span>
                </div>
                <div
                  className="relative rounded-xl p-8 pt-10 border border-[#10b981]/22"
                  style={{
                    background: "rgba(16,185,129,0.06)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-[#10b981]/35" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-r border-t border-[#10b981]/35" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-[#10b981]/35" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-[#10b981]/35" />

                  <div
                    className="font-serif italic text-white/45 mb-6 leading-relaxed"
                    style={{ fontSize: "0.875rem" }}
                  >
                    "These are the principles that keep the world coherent..."
                  </div>

                  <ul className="flex flex-col gap-3">
                    {DO_RULES.map((rule, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="flex-shrink-0 mt-0.5 flex items-center justify-center rounded-full"
                          style={{
                            width: 18,
                            height: 18,
                            background: "rgba(16,185,129,0.18)",
                            border: "1px solid rgba(16,185,129,0.38)",
                          }}
                        >
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                            <path d="M1.5 4.5l2 2 4-4" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="font-sans text-[13px] text-white/68 leading-snug">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>

            {/* DON'T panel */}
            <RevealBlock delay={0.2}>
              <div className="relative mt-6">
                <div
                  className="absolute -top-4 left-6 px-6 py-1.5 rounded-t-md rounded-br-md z-10"
                  style={{
                    background: "linear-gradient(90deg, #ec4899, #db2777)",
                    boxShadow: "0 4px 10px rgba(236,72,153,0.3)",
                  }}
                >
                  <span className="font-sans font-bold text-white tracking-wide text-sm">{"DON'T"}</span>
                </div>
                <div
                  className="relative rounded-xl p-8 pt-10 border border-[#ec4899]/20"
                  style={{
                    background: "rgba(236,72,153,0.05)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-[#ec4899]/32" />
                  <div className="absolute top-3 right-3 w-4 h-4 border-r border-t border-[#ec4899]/32" />
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-[#ec4899]/32" />
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-[#ec4899]/32" />

                  <div
                    className="font-serif italic text-white/45 mb-6 leading-relaxed"
                    style={{ fontSize: "0.875rem" }}
                  >
                    "...and these are the mistakes that break the immersion."
                  </div>

                  <ul className="flex flex-col gap-3">
                    {DONT_RULES.map((rule, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="flex-shrink-0 mt-0.5 flex items-center justify-center rounded-full"
                          style={{
                            width: 18,
                            height: 18,
                            background: "rgba(236,72,153,0.14)",
                            border: "1px solid rgba(236,72,153,0.32)",
                          }}
                        >
                          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                            <path d="M2 2l5 5M7 2L2 7" stroke="#ec4899" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                        </span>
                        <span className="font-sans text-[13px] text-white/68 leading-snug">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 8: Footer                                            */}
      {/* ============================================================ */}
      <footer
        className="relative py-24 px-6 overflow-hidden text-center"
        style={{
          background: "linear-gradient(180deg, rgba(17,24,39,0.95) 0%, #000 100%)",
        }}
      >
        {/* Ornate corner decorations on footer */}
        <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-[#6366f1]/20" />
        <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-[#6366f1]/20" />
        <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-[#6366f1]/20" />
        <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-[#6366f1]/20" />

        {/* Ornament line */}
        <div className="flex items-center justify-center gap-4 mb-12 opacity-35">
          <div className="flex-1 max-w-[120px] h-px bg-[#6366f1]/50" />
          <span className="font-sans text-[10px] tracking-[0.22em] text-[#a5b4fc]/65">FIN</span>
          <div className="flex-1 max-w-[120px] h-px bg-[#6366f1]/50" />
        </div>

        <RevealBlock delay={0}>
          <div
            className="font-serif italic text-white/55 mb-4"
            style={{ fontSize: "clamp(1.3rem,3.5vw,2rem)" }}
          >
            To be continued...
          </div>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          <div className="font-sans text-[11px] tracking-[0.20em] text-[#a5b4fc]/30 uppercase mb-12">
            Chapter I — Visual Novel // Interactive Storytelling // StyleKit
          </div>
        </RevealBlock>

        <RevealBlock delay={0.2}>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/"
              className="group font-sans text-[12px] tracking-widest text-[#a5b4fc]/50 hover:text-white transition-colors duration-200"
            >
              <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-[#6366f1] transition-all duration-300 mr-1">&#9654;</span>
              StyleKit
            </Link>
            <span className="text-white/10 text-sm">|</span>
            <span className="font-sans text-[12px] tracking-widest text-white/18">
              Visual Novel
            </span>
            <span className="text-white/10 text-sm">|</span>
            <span className="font-mono text-[12px] text-[#a5b4fc]/22">
              #6366f1 / #ec4899 / #10b981
            </span>
          </div>
        </RevealBlock>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(180deg, transparent, #000)" }}
        />
      </footer>
    </div>
  );
}
