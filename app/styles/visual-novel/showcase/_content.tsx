"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks & primitives                                          */
/* ------------------------------------------------------------------ */

function useInView(options: IntersectionObserverInit = {}) {
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
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Corner decoration component                                        */
/* ------------------------------------------------------------------ */

function CornerDeco({
  color = "#6366f1",
  size = 16,
  position = "tl",
}: {
  color?: string;
  size?: number;
  position?: "tl" | "tr" | "bl" | "br";
}) {
  const styles: Record<string, React.CSSProperties> = {
    tl: { top: 8, left: 8, borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}` },
    tr: { top: 8, right: 8, borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` },
    bl: { bottom: 8, left: 8, borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}` },
    br: { bottom: 8, right: 8, borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` },
  };
  return (
    <span
      style={{
        position: "absolute",
        width: size,
        height: size,
        ...styles[position],
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const characters = [
  {
    name: "Aria",
    title: "The Navigator",
    color: "#6366f1",
    lines: [
      "The stars have shifted again. We are not where we were — but perhaps that is exactly where we need to be. Every deviation from the map is an invitation to discover what the map never knew.",
      "I have sailed these routes for three cycles now. Trust the instruments, trust the wind, and above all — trust the silence between the stars. It speaks louder than any compass.",
      "There is a port beyond this fog. I have seen it only in dreams, but dreams are the oldest navigational charts in existence. Set the sails. We go forward.",
    ],
  },
  {
    name: "Lena",
    title: "The Archivist",
    color: "#ec4899",
    lines: [
      "Every document tells two stories: the one written in ink, and the one hidden in the margins. I have spent my life reading margins. You would be surprised what people leave behind when they think no one is watching.",
      "The archive holds memory that bodies cannot. Empires rise and fall, but the records persist — if someone cares enough to protect them. That has always been my purpose.",
      "This particular entry predates the war by six decades. Whoever wrote it knew what was coming. That frightens me more than the war itself ever did.",
    ],
  },
  {
    name: "Ren",
    title: "The Wanderer",
    color: "#10b981",
    lines: [
      "I do not carry a map. Maps are promises made by people who stayed in one place too long. The road changes; the map does not. I prefer to be wrong in real time than right in theory.",
      "There is a freedom in having no destination. Every town is a chapter, every stranger a sentence. Some chapters end badly. That is still a chapter.",
      "You ask me where I am going. The honest answer is: away from where I was. The better answer is: toward something I cannot yet name but will recognize the moment I see it.",
    ],
  },
];

const choiceBranches = [
  { label: "Ask Aria about the shifting stars.", consequence: "Aria Route — Navigation Arc" },
  { label: "Follow Lena into the restricted archive.", consequence: "Lena Route — Knowledge Arc" },
  { label: "Leave with Ren before dawn.", consequence: "Ren Route — Freedom Arc" },
  { label: "Stay behind and investigate alone.", consequence: "Solo Route — Mystery Arc" },
];

const colorPalette = [
  { french: "Gris Ardoise", name: "Slate Gray", hex: "#4a5568", role: "Primary — main text, dark panels" },
  { french: "Blanc Nacre", name: "Near White", hex: "#f7fafc", role: "Secondary — background, card fills" },
  { french: "Indigo Profond", name: "Indigo", hex: "#6366f1", role: "Accent A — primary UI, nameplates" },
  { french: "Rose Mysterieux", name: "Pink", hex: "#ec4899", role: "Accent B — character highlight, alerts" },
  { french: "Jade Vivant", name: "Teal", hex: "#10b981", role: "Accent C — success states, third char" },
];

const saveSlots = [
  {
    slot: 1,
    chapter: "Chapter 3 — The Fog Lifts",
    location: "Northern Harbor, Dusk",
    timestamp: "2026-02-15  14:32",
    playtime: "4h 17m",
    active: true,
  },
  {
    slot: 2,
    chapter: "Chapter 2 — Margins of Memory",
    location: "The Grand Archive, Midnight",
    timestamp: "2026-02-14  20:08",
    playtime: "2h 44m",
    active: true,
  },
  {
    slot: 3,
    chapter: "[Empty Slot]",
    location: "",
    timestamp: "",
    playtime: "",
    active: false,
  },
];

const doRules = [
  "Semi-transparent dialog panels: bg-[#1a202c]/85 backdrop-blur-md",
  "L-shaped corner decorations using absolute-positioned spans",
  "Character nameplates as colored badge strips — -top-3 left-6",
  "Frosted glass choice buttons: bg-white/50 backdrop-blur-sm",
  "Serif fonts (font-serif) for all in-world dialog text",
  "Atmospheric gradients for scene backgrounds: from-slate-700 to-slate-900",
  "Indigo accent (#6366f1) as the primary UI interaction color",
];

const dontRules = [
  "Never use flat white or solid opaque panels for dialog boxes",
  "Never omit corner decorations on key interactive panels",
  "Never use sans-serif fonts for in-world character dialog",
  "Never use bright primary colors outside of the defined palette",
  "Never use thick borders — 1px at 20-40% opacity only",
  "Never animate choice buttons with aggressive scaling transforms",
  "Never use drop shadows without specifying rgba with low opacity",
];

const bokehDots = [
  { top: "12%", left: "18%", size: 6, opacity: 0.35, color: "#6366f1" },
  { top: "28%", left: "72%", size: 4, opacity: 0.25, color: "#ec4899" },
  { top: "45%", left: "8%", size: 8, opacity: 0.20, color: "#10b981" },
  { top: "62%", left: "85%", size: 5, opacity: 0.30, color: "#6366f1" },
  { top: "18%", left: "55%", size: 3, opacity: 0.40, color: "#ec4899" },
  { top: "78%", left: "32%", size: 7, opacity: 0.18, color: "#10b981" },
  { top: "35%", left: "90%", size: 4, opacity: 0.28, color: "#6366f1" },
  { top: "88%", left: "68%", size: 6, opacity: 0.22, color: "#ec4899" },
  { top: "7%", left: "42%", size: 5, opacity: 0.32, color: "#10b981" },
  { top: "52%", left: "48%", size: 3, opacity: 0.20, color: "#6366f1" },
];

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function VisualNovelShowcaseContent() {
  const [activeSpeaker, setActiveSpeaker] = useState(0);
  const [activeDialog, setActiveDialog] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [activeSaveSlot, setActiveSaveSlot] = useState<number | null>(null);

  const currentChar = characters[activeSpeaker];
  const currentLine = currentChar.lines[activeDialog % currentChar.lines.length];

  function cycleDialog() {
    setActiveDialog((prev) => prev + 1);
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(160deg, #1a202c 0%, #2d3748 50%, #1a202c 100%)" }}
    >
      {/* ---------------------------------------------------------------- */}
      {/* Section 1: Fixed Nav                                             */}
      {/* ---------------------------------------------------------------- */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "rgba(26, 32, 44, 0.90)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(99, 102, 241, 0.18)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              style={{ color: "#a5b4fc", fontSize: 13, fontFamily: "sans-serif", letterSpacing: "0.04em" }}
              className="hover:text-white transition-colors duration-200"
            >
              StyleKit &rarr;
            </Link>
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 12 }}>|</span>
            <span style={{ color: "#f7fafc", fontSize: 13, fontFamily: "sans-serif", letterSpacing: "0.08em" }}>
              Visual Novel
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Dialog", "Choices", "Palette", "Components", "Save"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                style={{
                  color: "rgba(165, 180, 252, 0.75)",
                  fontSize: 12,
                  fontFamily: "sans-serif",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                }}
                className="hover:text-white transition-colors duration-200"
              >
                {label}
              </a>
            ))}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.35)",
              fontFamily: "sans-serif",
              letterSpacing: "0.1em",
            }}
          >
            視覚小説
          </div>
        </div>
      </nav>

      {/* ---------------------------------------------------------------- */}
      {/* Section 2: Hero — Scene                                          */}
      {/* ---------------------------------------------------------------- */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(180deg, #1a202c 0%, #2d3748 40%, #374151 70%, #1a202c 100%)",
          paddingTop: 56,
        }}
      >
        {/* Atmospheric bokeh dots */}
        {bokehDots.map((dot, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              top: dot.top,
              left: dot.left,
              width: dot.size,
              height: dot.size,
              borderRadius: "50%",
              background: dot.color,
              opacity: dot.opacity,
              filter: "blur(1.5px)",
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Horizon glow */}
        <div
          style={{
            position: "absolute",
            bottom: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "60%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(99,102,241,0.25), transparent)",
          }}
        />

        {/* Character silhouette hint (CSS shape) */}
        <div
          style={{
            position: "absolute",
            bottom: "18%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            opacity: 0.12,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#f7fafc",
              marginBottom: -2,
            }}
          />
          <div
            style={{
              width: 60,
              height: 110,
              background: "#f7fafc",
              borderRadius: "30% 30% 0 0",
            }}
          />
        </div>

        {/* Scene title overlay */}
        <div className="relative z-10 text-center px-6">
          <RevealBlock delay={0.1}>
            <div
              style={{
                display: "inline-block",
                padding: "4px 16px",
                border: "1px solid rgba(99,102,241,0.30)",
                borderRadius: 2,
                marginBottom: 24,
                fontSize: 11,
                letterSpacing: "0.22em",
                color: "rgba(165,180,252,0.75)",
                fontFamily: "sans-serif",
              }}
            >
              CHAPTER I — VISUAL NOVEL
            </div>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <h1
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
                fontWeight: 400,
                color: "#f7fafc",
                lineHeight: 1.18,
                letterSpacing: "0.02em",
                marginBottom: 20,
              }}
            >
              視覚小説風
            </h1>
          </RevealBlock>

          <RevealBlock delay={0.3}>
            <p
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                color: "rgba(247,250,252,0.55)",
                maxWidth: 520,
                margin: "0 auto 32px",
                lineHeight: 1.7,
                fontStyle: "italic",
              }}
            >
              ADV game UI aesthetic — translucent dialog panels, character nameplates,
              frosted-glass choice branches, and atmospheric scene compositions.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.4}>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href="#dialog"
                style={{
                  display: "inline-block",
                  padding: "10px 28px",
                  background: "rgba(99,102,241,0.80)",
                  borderRadius: 4,
                  color: "#f7fafc",
                  fontSize: 13,
                  fontFamily: "sans-serif",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                  border: "1px solid rgba(99,102,241,0.60)",
                  backdropFilter: "blur(6px)",
                }}
              >
                Begin Showcase
              </a>
              <a
                href="#palette"
                style={{
                  display: "inline-block",
                  padding: "10px 28px",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 4,
                  color: "rgba(247,250,252,0.70)",
                  fontSize: 13,
                  fontFamily: "sans-serif",
                  letterSpacing: "0.06em",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(6px)",
                }}
              >
                View Palette
              </a>
            </div>
          </RevealBlock>
        </div>

        {/* Scroll cue */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            opacity: 0.4,
          }}
        >
          <div style={{ width: 1, height: 36, background: "rgba(165,180,252,0.5)" }} />
          <span
            style={{
              fontSize: 10,
              letterSpacing: "0.16em",
              color: "rgba(165,180,252,0.6)",
              fontFamily: "sans-serif",
            }}
          >
            SCROLL
          </span>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Section 3: ADV Dialog Box Demo                                   */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="dialog"
        style={{ padding: "96px 24px", background: "rgba(26,32,44,0.70)" }}
      >
        <div className="max-w-5xl mx-auto">
          <RevealBlock delay={0}>
            <div className="text-center mb-14">
              <div
                style={{
                  display: "inline-block",
                  padding: "3px 14px",
                  border: "1px solid rgba(99,102,241,0.30)",
                  borderRadius: 2,
                  marginBottom: 14,
                  fontSize: 10,
                  letterSpacing: "0.20em",
                  color: "rgba(165,180,252,0.65)",
                  fontFamily: "sans-serif",
                }}
              >
                SECTION 02 — DIALOG SYSTEM
              </div>
              <h2
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                  color: "#f7fafc",
                  fontWeight: 400,
                  marginBottom: 10,
                }}
              >
                ADV Dialog Box
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(247,250,252,0.45)",
                  fontFamily: "sans-serif",
                  maxWidth: 480,
                  margin: "0 auto",
                  lineHeight: 1.65,
                }}
              >
                The core visual novel interface — bottom-anchored dialog panel with
                character nameplate, L-shaped corner decorations, and speaker switching.
              </p>
            </div>
          </RevealBlock>

          {/* Scene preview area */}
          <RevealBlock delay={0.1}>
            <div
              style={{
                position: "relative",
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid rgba(99,102,241,0.18)",
                background:
                  "linear-gradient(180deg, #1a202c 0%, #2d3748 60%, #374151 100%)",
                minHeight: 420,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Outer corner decorations on scene container */}
              <CornerDeco color="rgba(99,102,241,0.35)" size={20} position="tl" />
              <CornerDeco color="rgba(99,102,241,0.35)" size={20} position="tr" />
              <CornerDeco color="rgba(99,102,241,0.35)" size={20} position="bl" />
              <CornerDeco color="rgba(99,102,241,0.35)" size={20} position="br" />

              {/* Bokeh in scene */}
              {bokehDots.slice(0, 5).map((dot, i) => (
                <span
                  key={i}
                  style={{
                    position: "absolute",
                    top: dot.top,
                    left: dot.left,
                    width: dot.size + 2,
                    height: dot.size + 2,
                    borderRadius: "50%",
                    background: dot.color,
                    opacity: dot.opacity * 0.6,
                    filter: "blur(2px)",
                    pointerEvents: "none",
                  }}
                />
              ))}

              {/* Character silhouette area */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  paddingBottom: 0,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    opacity: 0.15,
                    marginBottom: 0,
                    pointerEvents: "none",
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: currentChar.color,
                      marginBottom: -2,
                      transition: "background 0.4s ease",
                    }}
                  />
                  <div
                    style={{
                      width: 50,
                      height: 90,
                      background: currentChar.color,
                      borderRadius: "24% 24% 0 0",
                      transition: "background 0.4s ease",
                    }}
                  />
                </div>
              </div>

              {/* Speaker selector tabs */}
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  padding: "12px 16px 0",
                  background: "rgba(0,0,0,0.20)",
                }}
              >
                {characters.map((char, i) => (
                  <button
                    key={char.name}
                    onClick={() => { setActiveSpeaker(i); setActiveDialog(0); }}
                    style={{
                      padding: "6px 18px",
                      fontSize: 11,
                      fontFamily: "sans-serif",
                      letterSpacing: "0.08em",
                      borderRadius: "4px 4px 0 0",
                      border: `1px solid ${activeSpeaker === i ? char.color : "rgba(255,255,255,0.10)"}`,
                      borderBottom: activeSpeaker === i ? `2px solid ${char.color}` : "1px solid transparent",
                      background: activeSpeaker === i ? `${char.color}22` : "rgba(255,255,255,0.04)",
                      color: activeSpeaker === i ? char.color : "rgba(255,255,255,0.40)",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                    }}
                  >
                    {char.name}
                  </button>
                ))}
              </div>

              {/* Dialog box panel */}
              <div
                style={{
                  position: "relative",
                  background: "rgba(26,32,44,0.85)",
                  backdropFilter: "blur(12px)",
                  borderTop: "1px solid rgba(99,102,241,0.20)",
                  padding: "32px 28px 24px",
                }}
              >
                {/* L-corner decorations on dialog box */}
                <CornerDeco color={`${currentChar.color}55`} size={14} position="tl" />
                <CornerDeco color={`${currentChar.color}55`} size={14} position="tr" />
                <CornerDeco color={`${currentChar.color}55`} size={14} position="bl" />
                <CornerDeco color={`${currentChar.color}55`} size={14} position="br" />

                {/* Nameplate */}
                <div
                  style={{
                    position: "absolute",
                    top: -14,
                    left: 24,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "4px 16px",
                    background: currentChar.color,
                    borderRadius: 2,
                    transition: "background 0.35s ease",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: "sans-serif",
                      fontWeight: 600,
                      letterSpacing: "0.10em",
                      color: "#fff",
                    }}
                  >
                    {currentChar.name.toUpperCase()}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontFamily: "sans-serif",
                      color: "rgba(255,255,255,0.65)",
                      fontStyle: "italic",
                    }}
                  >
                    {currentChar.title}
                  </span>
                </div>

                {/* Dialog text */}
                <p
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
                    color: "rgba(247,250,252,0.88)",
                    lineHeight: 1.78,
                    marginBottom: 18,
                    minHeight: 80,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {currentLine}
                </p>

                {/* Controls row */}
                <div className="flex items-center justify-between">
                  <div
                    style={{
                      fontSize: 10,
                      fontFamily: "sans-serif",
                      color: "rgba(255,255,255,0.25)",
                      letterSpacing: "0.10em",
                    }}
                  >
                    {`${(activeDialog % currentChar.lines.length) + 1} / ${currentChar.lines.length}`}
                  </div>
                  <button
                    onClick={cycleDialog}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 16px",
                      background: "rgba(99,102,241,0.15)",
                      border: "1px solid rgba(99,102,241,0.30)",
                      borderRadius: 3,
                      color: "rgba(165,180,252,0.80)",
                      fontSize: 11,
                      fontFamily: "sans-serif",
                      letterSpacing: "0.08em",
                      cursor: "pointer",
                    }}
                  >
                    Next
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Section 4: Choice Branch Buttons                                 */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="choices"
        style={{ padding: "96px 24px", background: "rgba(17,24,39,0.85)" }}
      >
        <div className="max-w-3xl mx-auto">
          <RevealBlock delay={0}>
            <div className="text-center mb-14">
              <div
                style={{
                  display: "inline-block",
                  padding: "3px 14px",
                  border: "1px solid rgba(99,102,241,0.30)",
                  borderRadius: 2,
                  marginBottom: 14,
                  fontSize: 10,
                  letterSpacing: "0.20em",
                  color: "rgba(165,180,252,0.65)",
                  fontFamily: "sans-serif",
                }}
              >
                SECTION 03 — NARRATIVE BRANCHES
              </div>
              <h2
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                  color: "#f7fafc",
                  fontWeight: 400,
                  marginBottom: 10,
                }}
              >
                Choice Branches
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(247,250,252,0.45)",
                  fontFamily: "sans-serif",
                  maxWidth: 460,
                  margin: "0 auto",
                  lineHeight: 1.65,
                }}
              >
                Frosted glass buttons with indigo accent on selection. Each branch
                reveals its narrative arc label.
              </p>
            </div>
          </RevealBlock>

          {/* Choice prompt text */}
          <RevealBlock delay={0.1}>
            <div
              style={{
                textAlign: "center",
                marginBottom: 28,
                fontFamily: "Georgia, 'Times New Roman', serif",
                fontSize: "1rem",
                color: "rgba(247,250,252,0.55)",
                fontStyle: "italic",
              }}
            >
              "The door is before you. What do you do?"
            </div>
          </RevealBlock>

          {/* Choice buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {choiceBranches.map((choice, i) => (
              <RevealBlock key={i} delay={0.15 + i * 0.08}>
                <button
                  onClick={() => setSelectedChoice(selectedChoice === i ? null : i)}
                  style={{
                    width: "100%",
                    padding: "16px 24px",
                    background:
                      selectedChoice === i
                        ? "rgba(99,102,241,0.18)"
                        : "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(8px)",
                    borderRadius: 8,
                    border: `1px solid ${selectedChoice === i ? "rgba(99,102,241,0.55)" : "rgba(99,102,241,0.15)"}`,
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    transition: "all 0.25s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <CornerDeco
                    color={selectedChoice === i ? "rgba(99,102,241,0.50)" : "rgba(99,102,241,0.20)"}
                    size={10}
                    position="tl"
                  />
                  <CornerDeco
                    color={selectedChoice === i ? "rgba(99,102,241,0.50)" : "rgba(99,102,241,0.20)"}
                    size={10}
                    position="br"
                  />
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        color: selectedChoice === i ? "#a5b4fc" : "rgba(247,250,252,0.78)",
                        marginBottom: selectedChoice === i ? 6 : 0,
                        transition: "color 0.25s ease",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}. {choice.label}
                    </div>
                    {selectedChoice === i && (
                      <div
                        style={{
                          fontSize: 11,
                          fontFamily: "sans-serif",
                          letterSpacing: "0.10em",
                          color: "rgba(165,180,252,0.60)",
                        }}
                      >
                        {choice.consequence}
                      </div>
                    )}
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    style={{
                      flexShrink: 0,
                      color: selectedChoice === i ? "#a5b4fc" : "rgba(99,102,241,0.40)",
                      transition: "color 0.25s ease, transform 0.25s ease",
                      transform: selectedChoice === i ? "translateX(2px)" : "none",
                    }}
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </RevealBlock>
            ))}
          </div>

          {/* Confirm selection */}
          <RevealBlock delay={0.55}>
            <div className="text-center mt-8">
              <button
                disabled={selectedChoice === null}
                style={{
                  padding: "10px 32px",
                  background:
                    selectedChoice !== null
                      ? "rgba(99,102,241,0.80)"
                      : "rgba(255,255,255,0.06)",
                  border: `1px solid ${selectedChoice !== null ? "rgba(99,102,241,0.60)" : "rgba(255,255,255,0.10)"}`,
                  borderRadius: 4,
                  color: selectedChoice !== null ? "#fff" : "rgba(255,255,255,0.25)",
                  fontSize: 13,
                  fontFamily: "sans-serif",
                  letterSpacing: "0.08em",
                  cursor: selectedChoice !== null ? "pointer" : "default",
                  transition: "all 0.25s ease",
                }}
              >
                Confirm Choice
              </button>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Section 5: Color System                                          */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="palette"
        style={{ padding: "96px 24px", background: "rgba(26,32,44,0.90)" }}
      >
        <div className="max-w-5xl mx-auto">
          <RevealBlock delay={0}>
            <div className="text-center mb-14">
              <div
                style={{
                  display: "inline-block",
                  padding: "3px 14px",
                  border: "1px solid rgba(99,102,241,0.30)",
                  borderRadius: 2,
                  marginBottom: 14,
                  fontSize: 10,
                  letterSpacing: "0.20em",
                  color: "rgba(165,180,252,0.65)",
                  fontFamily: "sans-serif",
                }}
              >
                SECTION 04 — COLOR SYSTEM
              </div>
              <h2
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                  color: "#f7fafc",
                  fontWeight: 400,
                  marginBottom: 10,
                }}
              >
                Palette
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(247,250,252,0.45)",
                  fontFamily: "sans-serif",
                  maxWidth: 420,
                  margin: "0 auto",
                  lineHeight: 1.65,
                }}
              >
                Five tones form the visual novel world — from deep slate through luminous
                indigo, pink, and jade.
              </p>
            </div>
          </RevealBlock>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 20,
            }}
          >
            {colorPalette.map((color, i) => (
              <RevealBlock key={color.hex} delay={0.08 * i}>
                <div
                  style={{
                    position: "relative",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(8px)",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.10)",
                    overflow: "hidden",
                    paddingBottom: 20,
                  }}
                >
                  <CornerDeco color="rgba(99,102,241,0.25)" size={10} position="tl" />
                  <CornerDeco color="rgba(99,102,241,0.25)" size={10} position="br" />

                  {/* Swatch */}
                  <div
                    style={{
                      height: 88,
                      background: color.hex,
                      marginBottom: 16,
                    }}
                  />

                  <div style={{ padding: "0 16px" }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        fontStyle: "italic",
                        color: "rgba(247,250,252,0.45)",
                        marginBottom: 4,
                      }}
                    >
                      {color.french}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontFamily: "sans-serif",
                        fontWeight: 600,
                        color: "#f7fafc",
                        marginBottom: 4,
                        letterSpacing: "0.03em",
                      }}
                    >
                      {color.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontFamily: "monospace",
                        color: "rgba(165,180,252,0.70)",
                        marginBottom: 8,
                      }}
                    >
                      {color.hex}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        fontFamily: "sans-serif",
                        color: "rgba(247,250,252,0.30)",
                        lineHeight: 1.55,
                        letterSpacing: "0.03em",
                      }}
                    >
                      {color.role}
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Section 6: Component Showcase                                    */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="components"
        style={{ padding: "96px 24px", background: "rgba(17,24,39,0.85)" }}
      >
        <div className="max-w-5xl mx-auto">
          <RevealBlock delay={0}>
            <div className="text-center mb-14">
              <div
                style={{
                  display: "inline-block",
                  padding: "3px 14px",
                  border: "1px solid rgba(99,102,241,0.30)",
                  borderRadius: 2,
                  marginBottom: 14,
                  fontSize: 10,
                  letterSpacing: "0.20em",
                  color: "rgba(165,180,252,0.65)",
                  fontFamily: "sans-serif",
                }}
              >
                SECTION 05 — COMPONENTS
              </div>
              <h2
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                  color: "#f7fafc",
                  fontWeight: 400,
                  marginBottom: 10,
                }}
              >
                Component Showcase
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(247,250,252,0.45)",
                  fontFamily: "sans-serif",
                  maxWidth: 420,
                  margin: "0 auto",
                  lineHeight: 1.65,
                }}
              >
                Buttons, inputs, and character badge components styled to the visual
                novel aesthetic.
              </p>
            </div>
          </RevealBlock>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 32,
            }}
          >
            {/* Button variants */}
            <RevealBlock delay={0.1}>
              <div
                style={{
                  position: "relative",
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 10,
                  border: "1px solid rgba(99,102,241,0.18)",
                  padding: 28,
                }}
              >
                <CornerDeco color="rgba(99,102,241,0.30)" size={12} position="tl" />
                <CornerDeco color="rgba(99,102,241,0.30)" size={12} position="br" />
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    color: "rgba(165,180,252,0.55)",
                    fontFamily: "sans-serif",
                    marginBottom: 20,
                  }}
                >
                  BUTTON VARIANTS
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {/* Choice button */}
                  <button
                    style={{
                      width: "100%",
                      padding: "12px 20px",
                      background: "rgba(255,255,255,0.08)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(99,102,241,0.25)",
                      borderRadius: 6,
                      color: "rgba(247,250,252,0.80)",
                      fontSize: 13,
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    Choice Button
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="rgba(165,180,252,0.60)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {/* Confirm button */}
                  <button
                    style={{
                      width: "100%",
                      padding: "12px 20px",
                      background: "rgba(99,102,241,0.75)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(99,102,241,0.55)",
                      borderRadius: 6,
                      color: "#fff",
                      fontSize: 13,
                      fontFamily: "sans-serif",
                      letterSpacing: "0.06em",
                      cursor: "pointer",
                    }}
                  >
                    Confirm
                  </button>

                  {/* Cancel button */}
                  <button
                    style={{
                      width: "100%",
                      padding: "12px 20px",
                      background: "rgba(236,72,153,0.12)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(236,72,153,0.25)",
                      borderRadius: 6,
                      color: "rgba(249,168,212,0.80)",
                      fontSize: 13,
                      fontFamily: "sans-serif",
                      letterSpacing: "0.06em",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </RevealBlock>

            {/* Input field */}
            <RevealBlock delay={0.2}>
              <div
                style={{
                  position: "relative",
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 10,
                  border: "1px solid rgba(99,102,241,0.18)",
                  padding: 28,
                }}
              >
                <CornerDeco color="rgba(99,102,241,0.30)" size={12} position="tl" />
                <CornerDeco color="rgba(99,102,241,0.30)" size={12} position="br" />
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    color: "rgba(165,180,252,0.55)",
                    fontFamily: "sans-serif",
                    marginBottom: 20,
                  }}
                >
                  INPUT FIELDS
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 11,
                        fontFamily: "sans-serif",
                        letterSpacing: "0.10em",
                        color: "rgba(165,180,252,0.60)",
                        marginBottom: 6,
                      }}
                    >
                      PLAYER NAME
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name..."
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        background: "rgba(26,32,44,0.70)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(99,102,241,0.25)",
                        borderRadius: 4,
                        color: "rgba(247,250,252,0.85)",
                        fontSize: "0.95rem",
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 11,
                        fontFamily: "sans-serif",
                        letterSpacing: "0.10em",
                        color: "rgba(165,180,252,0.60)",
                        marginBottom: 6,
                      }}
                    >
                      CHAPTER NOTE
                    </label>
                    <textarea
                      placeholder="Leave a note for this save..."
                      rows={3}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        background: "rgba(26,32,44,0.70)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(99,102,241,0.25)",
                        borderRadius: 4,
                        color: "rgba(247,250,252,0.75)",
                        fontSize: "0.9rem",
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        outline: "none",
                        resize: "none",
                        lineHeight: 1.65,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Character badges */}
            <RevealBlock delay={0.3}>
              <div
                style={{
                  position: "relative",
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 10,
                  border: "1px solid rgba(99,102,241,0.18)",
                  padding: 28,
                }}
              >
                <CornerDeco color="rgba(99,102,241,0.30)" size={12} position="tl" />
                <CornerDeco color="rgba(99,102,241,0.30)" size={12} position="br" />
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    color: "rgba(165,180,252,0.55)",
                    fontFamily: "sans-serif",
                    marginBottom: 20,
                  }}
                >
                  CHARACTER BADGES
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {characters.map((char) => (
                    <div
                      key={char.name}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 14px",
                        background: `${char.color}10`,
                        border: `1px solid ${char.color}30`,
                        borderRadius: 6,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {/* Color strip left */}
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: 3,
                          background: char.color,
                          borderRadius: "6px 0 0 6px",
                        }}
                      />
                      <div style={{ marginLeft: 8 }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontFamily: "sans-serif",
                            fontWeight: 600,
                            color: char.color,
                            letterSpacing: "0.06em",
                          }}
                        >
                          {char.name}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            fontFamily: "sans-serif",
                            color: "rgba(247,250,252,0.40)",
                            letterSpacing: "0.06em",
                            fontStyle: "italic",
                          }}
                        >
                          {char.title}
                        </div>
                      </div>
                      <div
                        style={{
                          marginLeft: "auto",
                          display: "inline-block",
                          padding: "2px 10px",
                          background: `${char.color}22`,
                          border: `1px solid ${char.color}35`,
                          borderRadius: 2,
                          fontSize: 10,
                          fontFamily: "sans-serif",
                          letterSpacing: "0.10em",
                          color: char.color,
                        }}
                      >
                        ROUTE
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Section 7: Do / Don't Rules                                      */}
      {/* ---------------------------------------------------------------- */}
      <section
        style={{ padding: "96px 24px", background: "rgba(26,32,44,0.90)" }}
      >
        <div className="max-w-5xl mx-auto">
          <RevealBlock delay={0}>
            <div className="text-center mb-14">
              <div
                style={{
                  display: "inline-block",
                  padding: "3px 14px",
                  border: "1px solid rgba(99,102,241,0.30)",
                  borderRadius: 2,
                  marginBottom: 14,
                  fontSize: 10,
                  letterSpacing: "0.20em",
                  color: "rgba(165,180,252,0.65)",
                  fontFamily: "sans-serif",
                }}
              >
                SECTION 06 — DESIGN RULES
              </div>
              <h2
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                  color: "#f7fafc",
                  fontWeight: 400,
                  marginBottom: 10,
                }}
              >
                The Tutorial
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(247,250,252,0.45)",
                  fontFamily: "sans-serif",
                  maxWidth: 420,
                  margin: "0 auto",
                  lineHeight: 1.65,
                  fontStyle: "italic",
                }}
              >
                "Pay attention to these rules — they will serve you well on this journey."
              </p>
            </div>
          </RevealBlock>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 28,
            }}
          >
            {/* Do panel */}
            <RevealBlock delay={0.1}>
              <div
                style={{
                  position: "relative",
                  background: "rgba(16,185,129,0.06)",
                  border: "1px solid rgba(16,185,129,0.22)",
                  borderRadius: 10,
                  padding: 28,
                }}
              >
                <CornerDeco color="rgba(16,185,129,0.40)" size={14} position="tl" />
                <CornerDeco color="rgba(16,185,129,0.40)" size={14} position="br" />

                {/* Tutorial nameplate */}
                <div
                  style={{
                    position: "absolute",
                    top: -13,
                    left: 20,
                    display: "inline-block",
                    padding: "3px 14px",
                    background: "#10b981",
                    borderRadius: 2,
                    fontSize: 11,
                    fontFamily: "sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.10em",
                    color: "#fff",
                  }}
                >
                  DO
                </div>

                <div
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: 13,
                    color: "rgba(247,250,252,0.55)",
                    fontStyle: "italic",
                    marginBottom: 18,
                    marginTop: 8,
                    lineHeight: 1.6,
                  }}
                >
                  "These are the principles that keep the world coherent..."
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {doRules.map((rule, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        fontSize: 13,
                        fontFamily: "sans-serif",
                        color: "rgba(247,250,252,0.70)",
                        lineHeight: 1.55,
                      }}
                    >
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "rgba(16,185,129,0.20)",
                          border: "1px solid rgba(16,185,129,0.40)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 1,
                        }}
                      >
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                          <path d="M1.5 4.5l2 2 4-4" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't panel */}
            <RevealBlock delay={0.2}>
              <div
                style={{
                  position: "relative",
                  background: "rgba(236,72,153,0.05)",
                  border: "1px solid rgba(236,72,153,0.20)",
                  borderRadius: 10,
                  padding: 28,
                }}
              >
                <CornerDeco color="rgba(236,72,153,0.38)" size={14} position="tl" />
                <CornerDeco color="rgba(236,72,153,0.38)" size={14} position="br" />

                {/* Tutorial nameplate */}
                <div
                  style={{
                    position: "absolute",
                    top: -13,
                    left: 20,
                    display: "inline-block",
                    padding: "3px 14px",
                    background: "#ec4899",
                    borderRadius: 2,
                    fontSize: 11,
                    fontFamily: "sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.10em",
                    color: "#fff",
                  }}
                >
                  {"DON'T"}
                </div>

                <div
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: 13,
                    color: "rgba(247,250,252,0.55)",
                    fontStyle: "italic",
                    marginBottom: 18,
                    marginTop: 8,
                    lineHeight: 1.6,
                  }}
                >
                  "...and these are the mistakes that break the immersion."
                </div>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {dontRules.map((rule, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        fontSize: 13,
                        fontFamily: "sans-serif",
                        color: "rgba(247,250,252,0.70)",
                        lineHeight: 1.55,
                      }}
                    >
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "rgba(236,72,153,0.15)",
                          border: "1px solid rgba(236,72,153,0.35)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 1,
                        }}
                      >
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                          <path d="M2 2l5 5M7 2L2 7" stroke="#ec4899" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Section 8: Save / Load Screen                                    */}
      {/* ---------------------------------------------------------------- */}
      <section
        id="save"
        style={{ padding: "96px 24px", background: "rgba(17,24,39,0.90)" }}
      >
        <div className="max-w-4xl mx-auto">
          <RevealBlock delay={0}>
            <div className="text-center mb-14">
              <div
                style={{
                  display: "inline-block",
                  padding: "3px 14px",
                  border: "1px solid rgba(99,102,241,0.30)",
                  borderRadius: 2,
                  marginBottom: 14,
                  fontSize: 10,
                  letterSpacing: "0.20em",
                  color: "rgba(165,180,252,0.65)",
                  fontFamily: "sans-serif",
                }}
              >
                SECTION 07 — SAVE SYSTEM
              </div>
              <h2
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                  color: "#f7fafc",
                  fontWeight: 400,
                  marginBottom: 10,
                }}
              >
                Save / Load
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(247,250,252,0.45)",
                  fontFamily: "sans-serif",
                  maxWidth: 420,
                  margin: "0 auto",
                  lineHeight: 1.65,
                }}
              >
                Save slot cards with chapter info, timestamps, play time, and
                decorative corner frames. Click a slot to expand it.
              </p>
            </div>
          </RevealBlock>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {saveSlots.map((slot, i) => {
              const isExpanded = activeSaveSlot === i;
              return (
                <RevealBlock key={i} delay={0.1 + i * 0.1}>
                  <div
                    style={{
                      width: "100%",
                      position: "relative",
                      background: isExpanded
                        ? "rgba(99,102,241,0.12)"
                        : slot.active
                          ? "rgba(255,255,255,0.04)"
                          : "rgba(255,255,255,0.02)",
                      border: `1px solid ${isExpanded ? "rgba(99,102,241,0.45)" : "rgba(99,102,241,0.14)"}`,
                      borderRadius: 10,
                      padding: "22px 28px",
                      transition: "all 0.30s ease",
                      cursor: slot.active ? "pointer" : "default",
                    }}
                    onClick={() => {
                      if (slot.active) setActiveSaveSlot(isExpanded ? null : i);
                    }}
                  >
                    <CornerDeco
                      color={isExpanded ? "rgba(99,102,241,0.55)" : "rgba(99,102,241,0.22)"}
                      size={14}
                      position="tl"
                    />
                    <CornerDeco
                      color={isExpanded ? "rgba(99,102,241,0.55)" : "rgba(99,102,241,0.22)"}
                      size={14}
                      position="tr"
                    />
                    <CornerDeco
                      color={isExpanded ? "rgba(99,102,241,0.55)" : "rgba(99,102,241,0.22)"}
                      size={14}
                      position="bl"
                    />
                    <CornerDeco
                      color={isExpanded ? "rgba(99,102,241,0.55)" : "rgba(99,102,241,0.22)"}
                      size={14}
                      position="br"
                    />

                    <div className="flex items-start justify-between gap-6">
                      {/* Slot number badge */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 40,
                          height: 40,
                          background: slot.active
                            ? isExpanded
                              ? "rgba(99,102,241,0.30)"
                              : "rgba(99,102,241,0.12)"
                            : "rgba(255,255,255,0.04)",
                          border: `1px solid ${slot.active ? "rgba(99,102,241,0.35)" : "rgba(255,255,255,0.08)"}`,
                          borderRadius: 6,
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 14,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            color: slot.active ? "rgba(165,180,252,0.80)" : "rgba(255,255,255,0.20)",
                          }}
                        >
                          {String(slot.slot).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Slot info */}
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 14,
                            fontFamily: "Georgia, 'Times New Roman', serif",
                            color: slot.active ? "rgba(247,250,252,0.85)" : "rgba(247,250,252,0.25)",
                            marginBottom: slot.active ? 6 : 0,
                          }}
                        >
                          {slot.chapter}
                        </div>
                        {slot.active && (
                          <>
                            <div
                              style={{
                                fontSize: 12,
                                fontFamily: "sans-serif",
                                color: "rgba(165,180,252,0.55)",
                                marginBottom: 10,
                                fontStyle: "italic",
                              }}
                            >
                              {slot.location}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
                              <div>
                                <div
                                  style={{
                                    fontSize: 10,
                                    fontFamily: "sans-serif",
                                    letterSpacing: "0.10em",
                                    color: "rgba(255,255,255,0.25)",
                                    marginBottom: 2,
                                  }}
                                >
                                  SAVED
                                </div>
                                <div
                                  style={{
                                    fontSize: 12,
                                    fontFamily: "monospace",
                                    color: "rgba(247,250,252,0.55)",
                                  }}
                                >
                                  {slot.timestamp}
                                </div>
                              </div>
                              <div>
                                <div
                                  style={{
                                    fontSize: 10,
                                    fontFamily: "sans-serif",
                                    letterSpacing: "0.10em",
                                    color: "rgba(255,255,255,0.25)",
                                    marginBottom: 2,
                                  }}
                                >
                                  PLAY TIME
                                </div>
                                <div
                                  style={{
                                    fontSize: 12,
                                    fontFamily: "monospace",
                                    color: "rgba(247,250,252,0.55)",
                                  }}
                                >
                                  {slot.playtime}
                                </div>
                              </div>
                            </div>

                            {/* Expanded: Load button */}
                            {isExpanded && (
                              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                                <button
                                  onClick={(e) => e.stopPropagation()}
                                  style={{
                                    padding: "8px 24px",
                                    background: "rgba(99,102,241,0.78)",
                                    border: "1px solid rgba(99,102,241,0.55)",
                                    borderRadius: 4,
                                    color: "#fff",
                                    fontSize: 12,
                                    fontFamily: "sans-serif",
                                    letterSpacing: "0.08em",
                                    cursor: "pointer",
                                  }}
                                >
                                  Load Game
                                </button>
                                <button
                                  onClick={(e) => e.stopPropagation()}
                                  style={{
                                    padding: "8px 24px",
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    borderRadius: 4,
                                    color: "rgba(247,250,252,0.45)",
                                    fontSize: 12,
                                    fontFamily: "sans-serif",
                                    letterSpacing: "0.08em",
                                    cursor: "pointer",
                                  }}
                                >
                                  Overwrite
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      {/* Expand chevron */}
                      {slot.active && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          style={{
                            flexShrink: 0,
                            color: isExpanded ? "rgba(165,180,252,0.75)" : "rgba(99,102,241,0.35)",
                            transform: isExpanded ? "rotate(180deg)" : "none",
                            transition: "transform 0.25s ease",
                            marginTop: 4,
                          }}
                        >
                          <path
                            d="M4 6l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="1.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Section 9: Footer — Scene Fade                                   */}
      {/* ---------------------------------------------------------------- */}
      <footer
        style={{
          position: "relative",
          padding: "96px 24px 64px",
          background: "linear-gradient(180deg, rgba(17,24,39,0.90) 0%, #000 100%)",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Fade vignette top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 80,
            background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.80))",
            pointerEvents: "none",
          }}
        />

        {/* Ornament line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginBottom: 40,
            opacity: 0.35,
          }}
        >
          <div style={{ flex: 1, maxWidth: 120, height: 1, background: "rgba(99,102,241,0.50)" }} />
          <span style={{ fontSize: 10, fontFamily: "sans-serif", letterSpacing: "0.20em", color: "rgba(165,180,252,0.70)" }}>
            END
          </span>
          <div style={{ flex: 1, maxWidth: 120, height: 1, background: "rgba(99,102,241,0.50)" }} />
        </div>

        <RevealBlock delay={0}>
          <div
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
              color: "rgba(247,250,252,0.65)",
              fontStyle: "italic",
              marginBottom: 16,
              letterSpacing: "0.02em",
            }}
          >
            To be continued...
          </div>
        </RevealBlock>

        <RevealBlock delay={0.15}>
          <div
            style={{
              fontSize: 11,
              fontFamily: "sans-serif",
              letterSpacing: "0.18em",
              color: "rgba(165,180,252,0.35)",
              marginBottom: 48,
            }}
          >
            CHAPTER I — FIN
          </div>
        </RevealBlock>

        <RevealBlock delay={0.25}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/"
              style={{
                fontSize: 12,
                fontFamily: "sans-serif",
                color: "rgba(165,180,252,0.55)",
                letterSpacing: "0.08em",
                textDecoration: "none",
              }}
            >
              StyleKit &rarr;
            </Link>
            <span style={{ color: "rgba(255,255,255,0.10)", fontSize: 12 }}>|</span>
            <span
              style={{
                fontSize: 12,
                fontFamily: "sans-serif",
                color: "rgba(255,255,255,0.18)",
                letterSpacing: "0.10em",
              }}
            >
              Visual Novel Style
            </span>
            <span style={{ color: "rgba(255,255,255,0.10)", fontSize: 12 }}>|</span>
            <span
              style={{
                fontSize: 12,
                fontFamily: "monospace",
                color: "rgba(165,180,252,0.25)",
              }}
            >
              #6366f1 / #ec4899 / #10b981
            </span>
          </div>
        </RevealBlock>

        {/* Bottom fade to black */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
            background: "linear-gradient(180deg, transparent, #000)",
            pointerEvents: "none",
          }}
        />
      </footer>
    </div>
  );
}
