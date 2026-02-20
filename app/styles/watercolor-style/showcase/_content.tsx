"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

// ─── Data ──────────────────────────────────────────────────────────────────────

const paletteMoods = [
  {
    id: "dawn",
    label: "Dawn",
    blobs: [
      { color: "#e8a87c", opacity: 0.32, top: "8%",  left: "-4%",  w: 380, h: 380 },
      { color: "#fad4b8", opacity: 0.38, top: "30%", left: "28%",  w: 300, h: 300 },
      { color: "#c38d94", opacity: 0.22, top: "3%",  left: "55%",  w: 270, h: 270 },
      { color: "#d4a373", opacity: 0.28, top: "52%", left: "68%",  w: 250, h: 250 },
    ],
  },
  {
    id: "tide",
    label: "Tide",
    blobs: [
      { color: "#85cdca", opacity: 0.38, top: "12%", left: "6%",   w: 360, h: 360 },
      { color: "#4a6fa5", opacity: 0.18, top: "38%", left: "38%",  w: 310, h: 310 },
      { color: "#85cdca", opacity: 0.28, top: "3%",  left: "58%",  w: 260, h: 260 },
      { color: "#b8dfe0", opacity: 0.33, top: "55%", left: "66%",  w: 230, h: 230 },
    ],
  },
  {
    id: "dusk",
    label: "Dusk",
    blobs: [
      { color: "#c38d94", opacity: 0.33, top: "7%",  left: "5%",   w: 340, h: 340 },
      { color: "#4a6fa5", opacity: 0.22, top: "33%", left: "33%",  w: 285, h: 285 },
      { color: "#e8a87c", opacity: 0.28, top: "8%",  left: "58%",  w: 255, h: 255 },
      { color: "#c38d94", opacity: 0.18, top: "60%", left: "70%",  w: 240, h: 240 },
    ],
  },
];

const typographyScale = [
  { label: "Display",    cls: "text-5xl md:text-6xl", sample: "Soft Beauty"                                       },
  { label: "Heading 1",  cls: "text-4xl md:text-5xl", sample: "Painted Light"                                     },
  { label: "Heading 2",  cls: "text-3xl md:text-4xl", sample: "Gentle Wash"                                       },
  { label: "Heading 3",  cls: "text-2xl md:text-3xl", sample: "Organic Flow"                                      },
  { label: "Body Large", cls: "text-xl",              sample: "Texture over precision, always."                   },
  { label: "Body",       cls: "text-base",            sample: "Digital elements rendered as if painted on wet paper." },
  { label: "Caption",    cls: "text-sm",              sample: "Soft edges, color bleeding, imprecise beauty."     },
];

const designRules = [
  { type: "do",   rule: "Use semi-transparent fills",  detail: "bg-[#4a6fa5]/20 feels painted, not flat."             },
  { type: "do",   rule: "Embrace organic shapes",       detail: "Irregular border-radius mimics brushwork."            },
  { type: "do",   rule: "Layer wash blobs freely",      detail: "Overlapping blur-3xl divs create painted depth."      },
  { type: "dont", rule: "Avoid sharp, solid fills",     detail: "Fully opaque blocks kill the painterly mood."         },
  { type: "dont", rule: "Skip rigid uniform corners",   detail: "rounded-md is too mechanical for this style."         },
  { type: "dont", rule: "No harsh contrast jumps",      detail: "Abrupt color transitions break the soft aesthetic."   },
];

const galleryItems = [
  { title: "Morning Mist",   category: "Landscape", accent: "#4a6fa5", secondary: "#85cdca" },
  { title: "Peach Blossom",  category: "Botanical", accent: "#e8a87c", secondary: "#d4a373" },
  { title: "Ocean Depths",   category: "Abstract",  accent: "#85cdca", secondary: "#4a6fa5" },
  { title: "Rose Garden",    category: "Floral",    accent: "#c38d94", secondary: "#e8a87c" },
];

// ─── Inline hook ───────────────────────────────────────────────────────────────

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

// ─── Inline RevealBlock ────────────────────────────────────────────────────────

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
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed]   = useState(false);
  const [activeMood, setActiveMood]       = useState(0);
  const [activeTab, setActiveTab]         = useState<"buttons" | "cards" | "inputs">("buttons");
  const [submitted, setSubmitted]         = useState(false);
  const [msgValue, setMsgValue]           = useState("");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const mood = paletteMoods[activeMood];

  return (
    <div
      className="min-h-screen text-[#3a3430]"
      style={{ backgroundColor: "#faf8f5", fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      <style>{`
        @keyframes blob-drift {
          0%,100% { transform: scale(1) translate(0px,0px); }
          25%      { transform: scale(1.04) translate(6px,-5px); }
          50%      { transform: scale(0.97) translate(-5px,7px); }
          75%      { transform: scale(1.02) translate(-6px,-2px); }
        }
        @keyframes float-gentle {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          40%     { transform: translateY(-10px) rotate(1.2deg); }
          70%     { transform: translateY(-5px) rotate(-0.6deg); }
        }
        @keyframes wc-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .wb { animation: blob-drift 13s ease-in-out infinite; }
        .wb:nth-child(2) { animation-delay:-4s; animation-duration:16s; }
        .wb:nth-child(3) { animation-delay:-8s; animation-duration:11s; }
        .wb:nth-child(4) { animation-delay:-11s; animation-duration:18s; }
        .fc { animation: float-gentle 7s ease-in-out infinite; }
        .fc:nth-child(2) { animation-delay:-2.5s; }
        .fc:nth-child(3) { animation-delay:-5s; }
        .paper {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E");
          background-repeat: repeat;
        }
        .wb-btn { transition: all 0.5s ease-in-out; }
        .wb-btn:hover { opacity: 0.87; transform: scale(1.03); }
        .or1 { border-radius: 2rem 3rem 2rem 3rem / 3rem 2rem 3rem 2rem; }
        .or2 { border-radius: 3rem 2rem 3rem 2rem / 2rem 3rem 2rem 3rem; }
        .or3 { border-radius: 60% 40% 55% 45% / 45% 55% 40% 60%; }
      `}</style>

      {/* ─── NAV ──────────────────────────────────────────────────────────────── */}
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <nav
          className="flex items-center gap-6 md:gap-10 px-6 py-3 backdrop-blur-md"
          style={{
            backgroundColor: "rgba(250,248,245,0.84)",
            borderRadius: "9999px",
            border: "1px solid rgba(74,111,165,0.16)",
            boxShadow: "0 4px 24px rgba(74,111,165,0.10)",
          }}
        >
          <Link
            href="/styles/watercolor-style/showcase"
            className="font-serif italic text-[#4a6fa5] text-base tracking-wide"
          >
            Watercolor
          </Link>
          <span
            className="hidden md:block w-2 h-2 rounded-full"
            style={{ backgroundColor: "rgba(232,168,124,0.65)" }}
          />
          <Link
            href="/styles/watercolor-style"
            className="text-sm text-[#3a3430]/55 hover:text-[#4a6fa5] transition-colors duration-300"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            Docs
          </Link>
          <Link
            href="/styles"
            className="text-sm text-[#3a3430]/55 hover:text-[#4a6fa5] transition-colors duration-300"
            style={{ fontFamily: "system-ui, sans-serif" }}
          >
            Styles
          </Link>
        </nav>
      </header>

      {/* ─── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-24 pb-20 paper">
        {/* Wash blobs */}
        <div
          className="wb absolute rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: "rgba(232,168,124,0.26)", width: 440, height: 440, top: "5%", left: "-10%" }}
        />
        <div
          className="wb absolute rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: "rgba(133,205,202,0.24)", width: 400, height: 400, top: "3%", right: "-8%" }}
        />
        <div
          className="wb absolute rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: "rgba(195,141,148,0.20)", width: 320, height: 320, bottom: "10%", left: "12%" }}
        />
        <div
          className="wb absolute rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: "rgba(74,111,165,0.16)", width: 360, height: 360, bottom: "4%", right: "8%" }}
        />
        <div
          className="wb absolute rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: "rgba(212,163,115,0.18)", width: 280, height: 280, top: "40%", left: "45%" }}
        />

        {/* Hero text */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p
            className="text-sm tracking-[0.24em] uppercase mb-6"
            style={{
              fontFamily: "system-ui, sans-serif",
              color: "rgba(74,111,165,0.65)",
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            StyleKit Design System
          </p>

          <h1
            className="font-serif italic leading-tight mb-6"
            style={{
              fontSize: "clamp(3rem, 9vw, 7rem)",
              color: "#3a3430",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(48px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            Watercolor
            <br />
            <span style={{ color: "#4a6fa5" }}>Style</span>
          </h1>

          <p
            className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10 font-serif italic"
            style={{
              color: "rgba(58,52,48,0.60)",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            Organic, imprecise beauty. Digital elements rendered as if painted on wet paper — soft edges, color bleeding, texture over precision.
          </p>

          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(18px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s",
            }}
          >
            <button
              type="button"
              className="wb-btn inline-flex items-center gap-3 px-8 py-3.5 font-serif italic text-[#faf8f5] text-base or1"
              style={{
                backgroundColor: "rgba(74,111,165,0.80)",
                boxShadow: "0 8px 32px rgba(74,111,165,0.24)",
              }}
            >
              Explore the palette
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Floating organic decoration shapes */}
        <div
          className="fc absolute hidden lg:block"
          style={{ bottom: "18%", left: "5%", opacity: heroRevealed ? 0.88 : 0, transition: "opacity 1.2s 0.65s" }}
        >
          <div className="w-20 h-20 or3" style={{ backgroundColor: "rgba(212,163,115,0.32)", backdropFilter: "blur(2px)" }} />
        </div>
        <div
          className="fc absolute hidden lg:block"
          style={{ top: "28%", right: "6%", opacity: heroRevealed ? 0.80 : 0, transition: "opacity 1.2s 0.80s" }}
        >
          <div className="w-14 h-14" style={{ backgroundColor: "rgba(133,205,202,0.38)", borderRadius: "45% 55% 60% 40% / 55% 45% 55% 45%" }} />
        </div>
        <div
          className="fc absolute hidden lg:block"
          style={{ bottom: "30%", right: "12%", opacity: heroRevealed ? 0.75 : 0, transition: "opacity 1.2s 0.95s" }}
        >
          <div className="w-10 h-10" style={{ backgroundColor: "rgba(195,141,148,0.35)", borderRadius: "50% 60% 45% 55% / 60% 45% 55% 50%" }} />
        </div>

        {/* Scroll dots */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5"
          style={{ opacity: heroRevealed ? 0.6 : 0, transition: "opacity 1s 0.9s" }}
        >
          {["#e8a87c", "#85cdca", "#c38d94", "#4a6fa5", "#d4a373"].map((c, i) => (
            <div
              key={c}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: c, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </section>

      {/* ─── MARQUEE ──────────────────────────────────────────────────────────── */}
      <div
        className="w-full overflow-hidden py-5"
        style={{ borderTop: "1px solid rgba(74,111,165,0.10)", borderBottom: "1px solid rgba(74,111,165,0.10)" }}
      >
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "wc-marquee 30s linear infinite", width: "200%" }}
        >
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex-1 flex justify-around items-center font-serif italic text-sm"
              style={{ color: "rgba(74,111,165,0.50)" }}
            >
              <span>Organic Beauty</span>
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "rgba(232,168,124,0.60)" }} />
              <span>Color Bleeding</span>
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "rgba(133,205,202,0.60)" }} />
              <span>Painted Texture</span>
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "rgba(195,141,148,0.60)" }} />
              <span>Soft Edges</span>
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "rgba(212,163,115,0.60)" }} />
              <span>Wet Paper</span>
              <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: "rgba(74,111,165,0.40)" }} />
            </div>
          ))}
        </div>
      </div>

      {/* ─── PALETTE MOODS ────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-6xl mx-auto">
        <RevealBlock>
          <h2 className="font-serif italic text-4xl md:text-5xl text-[#3a3430] mb-2">
            Palette <span style={{ color: "#4a6fa5" }}>Moods</span>
          </h2>
          <p className="mb-10 font-serif italic" style={{ color: "rgba(58,52,48,0.58)" }}>
            Each mood blends accent washes to evoke a different time of day.
          </p>
        </RevealBlock>

        {/* Mood tabs — useState interaction */}
        <RevealBlock delay={0.1}>
          <div className="flex gap-3 mb-10 flex-wrap">
            {paletteMoods.map((m, idx) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveMood(idx)}
                className="px-6 py-2 font-serif italic text-base transition-all duration-500"
                style={{
                  borderRadius: idx === activeMood ? "2rem 3rem 2rem 3rem / 3rem 2rem 3rem 2rem" : "9999px",
                  backgroundColor: idx === activeMood ? "rgba(74,111,165,0.16)" : "rgba(74,111,165,0.05)",
                  color: idx === activeMood ? "#4a6fa5" : "rgba(58,52,48,0.50)",
                  border: idx === activeMood ? "1px solid rgba(74,111,165,0.28)" : "1px solid transparent",
                }}
              >
                {m.label}
              </button>
            ))}
          </div>
        </RevealBlock>

        {/* Wash canvas */}
        <RevealBlock delay={0.2}>
          <div
            className="relative w-full overflow-hidden paper"
            style={{
              height: 360,
              borderRadius: "2rem 3rem 2rem 3rem / 3rem 2rem 3rem 2rem",
              border: "1px solid rgba(74,111,165,0.09)",
              backgroundColor: "#faf8f5",
            }}
          >
            {mood.blobs.map((b, idx) => (
              <div
                key={idx}
                className="absolute rounded-full blur-3xl pointer-events-none transition-all duration-700"
                style={{ backgroundColor: b.color, opacity: b.opacity, width: b.w, height: b.h, top: b.top, left: b.left }}
              />
            ))}
            <div className="relative z-10 flex flex-col items-center justify-center h-full">
              <p className="font-serif italic text-3xl md:text-4xl text-[#3a3430]/65 mb-2">{mood.label}</p>
              <p
                className="text-sm tracking-widest uppercase"
                style={{ fontFamily: "system-ui, sans-serif", color: "rgba(58,52,48,0.38)" }}
              >
                {mood.id} palette
              </p>
            </div>
          </div>
        </RevealBlock>

        {/* Swatches */}
        <RevealBlock delay={0.3} className="mt-8 flex flex-wrap gap-4">
          {[
            { hex: "#4a6fa5", name: "Muted Blue"  },
            { hex: "#e8a87c", name: "Peach"        },
            { hex: "#85cdca", name: "Teal"         },
            { hex: "#c38d94", name: "Mauve"        },
            { hex: "#d4a373", name: "Warm Tan"     },
            { hex: "#faf8f5", name: "Paper White", border: true },
          ].map((s) => (
            <div key={s.hex} className="flex flex-col items-center gap-2">
              <div
                className="w-14 h-14 or3"
                style={{
                  backgroundColor: s.hex,
                  border: s.border ? "1px solid rgba(74,111,165,0.18)" : "none",
                  boxShadow: `0 4px 16px ${s.hex}44`,
                }}
              />
              <span
                className="text-xs text-center"
                style={{ fontFamily: "system-ui, sans-serif", color: "rgba(58,52,48,0.48)" }}
              >
                {s.name}
              </span>
            </div>
          ))}
        </RevealBlock>
      </section>

      {/* ─── COMPONENT DEMOS ──────────────────────────────────────────────────── */}
      <section
        className="py-24 md:py-36 paper"
        style={{ backgroundColor: "rgba(74,111,165,0.03)" }}
      >
        <div className="px-6 md:px-12 max-w-6xl mx-auto">
          <RevealBlock>
            <h2 className="font-serif italic text-4xl md:text-5xl text-[#3a3430] mb-2">Components</h2>
            <p className="mb-12 font-serif italic" style={{ color: "rgba(58,52,48,0.58)" }}>
              Every element painted with the same organic hand.
            </p>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.1}>
            <div className="flex gap-3 mb-10 flex-wrap">
              {(["buttons", "cards", "inputs"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className="px-6 py-2 font-serif italic text-base capitalize transition-all duration-500"
                  style={{
                    borderRadius: tab === activeTab ? "3rem 2rem 3rem 2rem / 2rem 3rem 2rem 3rem" : "9999px",
                    backgroundColor: tab === activeTab ? "rgba(133,205,202,0.20)" : "rgba(133,205,202,0.06)",
                    color: tab === activeTab ? "#2a7a76" : "rgba(58,52,48,0.50)",
                    border: tab === activeTab ? "1px solid rgba(133,205,202,0.35)" : "1px solid transparent",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Tab: Buttons */}
          {activeTab === "buttons" && (
            <RevealBlock>
              <div
                className="relative p-8 md:p-12 overflow-hidden paper"
                style={{
                  backgroundColor: "#faf8f5",
                  borderRadius: "2rem 3rem 2rem 3rem / 3rem 2rem 3rem 2rem",
                  border: "1px solid rgba(74,111,165,0.10)",
                  boxShadow: "0 8px 32px rgba(74,111,165,0.07)",
                }}
              >
                <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: "rgba(232,168,124,0.28)" }} />
                <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: "rgba(133,205,202,0.22)" }} />
                <div className="relative z-10 flex flex-wrap gap-4">
                  <button type="button" className="wb-btn px-7 py-3 font-serif italic text-[#faf8f5] or1" style={{ backgroundColor: "rgba(74,111,165,0.80)", boxShadow: "0 6px 24px rgba(74,111,165,0.22)" }}>
                    Primary Wash
                  </button>
                  <button type="button" className="wb-btn px-7 py-3 font-serif italic text-[#4a6fa5] or2" style={{ backgroundColor: "rgba(74,111,165,0.10)", border: "1px solid rgba(74,111,165,0.28)" }}>
                    Soft Outline
                  </button>
                  <button type="button" className="wb-btn px-7 py-3 font-serif italic text-[#faf8f5] or1" style={{ backgroundColor: "rgba(232,168,124,0.78)", boxShadow: "0 6px 24px rgba(232,168,124,0.22)" }}>
                    Peach Wash
                  </button>
                  <button type="button" className="wb-btn px-7 py-3 font-serif italic text-[#faf8f5] or2" style={{ backgroundColor: "rgba(195,141,148,0.75)", boxShadow: "0 6px 24px rgba(195,141,148,0.22)" }}>
                    Mauve Ghost
                  </button>
                  <button type="button" className="wb-btn px-7 py-3 font-serif italic text-[#2a7a76] or1" style={{ backgroundColor: "rgba(133,205,202,0.18)", border: "1px solid rgba(133,205,202,0.35)" }}>
                    Teal Ghost
                  </button>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Tab: Cards */}
          {activeTab === "cards" && (
            <RevealBlock>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {galleryItems.map((item, idx) => (
                  <div
                    key={item.title}
                    className="relative p-8 overflow-hidden paper group"
                    style={{
                      backgroundColor: "#faf8f5",
                      border: `1px solid ${item.accent}22`,
                      boxShadow: `0 8px 32px ${item.accent}14`,
                      borderRadius: idx % 2 === 0
                        ? "2rem 3rem 2rem 3rem / 3rem 2rem 3rem 2rem"
                        : "3rem 2rem 3rem 2rem / 2rem 3rem 2rem 3rem",
                      transition: "all 0.5s ease-in-out",
                    }}
                  >
                    <div
                      className="absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl pointer-events-none"
                      style={{ backgroundColor: `${item.accent}38` }}
                    />
                    <div
                      className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full blur-3xl pointer-events-none"
                      style={{ backgroundColor: `${item.secondary}30` }}
                    />
                    <span
                      className="text-xs uppercase tracking-widest mb-3 block relative z-10"
                      style={{ fontFamily: "system-ui, sans-serif", color: `${item.accent}88` }}
                    >
                      {item.category}
                    </span>
                    <h3 className="font-serif italic text-xl text-[#3a3430] mb-2 relative z-10">{item.title}</h3>
                    <p className="text-sm font-serif relative z-10" style={{ color: "rgba(58,52,48,0.55)" }}>
                      Layered washes of transparency create depth through overlap rather than opacity.
                    </p>
                  </div>
                ))}
              </div>
            </RevealBlock>
          )}

          {/* Tab: Inputs */}
          {activeTab === "inputs" && (
            <RevealBlock>
              <div
                className="relative p-8 md:p-12 overflow-hidden paper"
                style={{
                  backgroundColor: "#faf8f5",
                  borderRadius: "3rem 2rem 3rem 2rem / 2rem 3rem 2rem 3rem",
                  border: "1px solid rgba(195,141,148,0.18)",
                  boxShadow: "0 8px 32px rgba(74,111,165,0.07)",
                }}
              >
                <div className="absolute -top-8 -left-8 w-36 h-36 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: "rgba(195,141,148,0.28)" }} />
                <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: "rgba(133,205,202,0.24)" }} />
                <div className="relative z-10 space-y-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "system-ui, sans-serif", color: "rgba(58,52,48,0.42)" }}>Name</label>
                    <input
                      type="text"
                      placeholder="Your name..."
                      className="w-full px-4 py-3 font-serif italic text-[#3a3430] placeholder-[#3a3430]/30 outline-none transition-all duration-500"
                      style={{ backgroundColor: "rgba(74,111,165,0.05)", border: "1px solid rgba(74,111,165,0.16)", borderRadius: "1.5rem 2rem 1.5rem 2rem" }}
                      onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px rgba(74,111,165,0.14)"; e.currentTarget.style.borderColor = "rgba(74,111,165,0.40)"; }}
                      onBlur={(e)  => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(74,111,165,0.16)"; }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "system-ui, sans-serif", color: "rgba(58,52,48,0.42)" }}>Email</label>
                    <input
                      type="email"
                      placeholder="hello@studio.com"
                      className="w-full px-4 py-3 font-serif italic text-[#3a3430] placeholder-[#3a3430]/30 outline-none transition-all duration-500"
                      style={{ backgroundColor: "rgba(74,111,165,0.05)", border: "1px solid rgba(74,111,165,0.16)", borderRadius: "2rem 1.5rem 2rem 1.5rem" }}
                      onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px rgba(74,111,165,0.14)"; e.currentTarget.style.borderColor = "rgba(74,111,165,0.40)"; }}
                      onBlur={(e)  => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(74,111,165,0.16)"; }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "system-ui, sans-serif", color: "rgba(58,52,48,0.42)" }}>Message</label>
                    <textarea
                      rows={3}
                      placeholder="Write freely, like paint on wet paper..."
                      className="w-full px-4 py-3 font-serif italic text-[#3a3430] placeholder-[#3a3430]/30 outline-none resize-none transition-all duration-500"
                      style={{ backgroundColor: "rgba(74,111,165,0.05)", border: "1px solid rgba(74,111,165,0.16)", borderRadius: "2rem 2.5rem 2rem 2.5rem" }}
                      onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px rgba(74,111,165,0.14)"; e.currentTarget.style.borderColor = "rgba(74,111,165,0.40)"; }}
                      onBlur={(e)  => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(74,111,165,0.16)"; }}
                    />
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ─── TYPOGRAPHY ───────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-6xl mx-auto">
        <RevealBlock>
          <h2 className="font-serif italic text-4xl md:text-5xl text-[#3a3430] mb-2">Typography</h2>
          <p className="mb-14 font-serif italic" style={{ color: "rgba(58,52,48,0.58)" }}>
            Serif italic headings anchor the painterly voice.
          </p>
        </RevealBlock>

        <div>
          {typographyScale.map((item, idx) => (
            <RevealBlock key={item.label} delay={idx * 0.05}>
              <div
                className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 py-6"
                style={{
                  borderBottom:
                    idx < typographyScale.length - 1
                      ? "1px solid rgba(74,111,165,0.09)"
                      : "none",
                }}
              >
                <span
                  className="text-xs uppercase tracking-widest w-28 shrink-0"
                  style={{ fontFamily: "system-ui, sans-serif", color: "rgba(58,52,48,0.38)" }}
                >
                  {item.label}
                </span>
                <span className={`font-serif italic leading-tight text-[#3a3430] ${item.cls}`}>
                  {item.sample}
                </span>
              </div>
            </RevealBlock>
          ))}
        </div>
      </section>

      {/* ─── DESIGN RULES ─────────────────────────────────────────────────────── */}
      <section
        className="py-24 md:py-36 paper"
        style={{ backgroundColor: "rgba(232,168,124,0.05)" }}
      >
        <div className="px-6 md:px-12 max-w-6xl mx-auto">
          <RevealBlock>
            <h2 className="font-serif italic text-4xl md:text-5xl text-[#3a3430] mb-2">Design Rules</h2>
            <p className="mb-14 font-serif italic" style={{ color: "rgba(58,52,48,0.58)" }}>
              The principles that keep every element feeling painted, not printed.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {designRules.map((rule, idx) => {
              const isDo = rule.type === "do";
              return (
                <RevealBlock key={idx} delay={idx * 0.07}>
                  <div
                    className="relative p-7 overflow-hidden"
                    style={{
                      backgroundColor: isDo ? "rgba(133,205,202,0.09)" : "rgba(195,141,148,0.09)",
                      border: `1px solid ${isDo ? "rgba(133,205,202,0.22)" : "rgba(195,141,148,0.22)"}`,
                      borderRadius: idx % 2 === 0
                        ? "2rem 3rem 2rem 3rem / 3rem 2rem 3rem 2rem"
                        : "3rem 2rem 3rem 2rem / 2rem 3rem 2rem 3rem",
                    }}
                  >
                    <div
                      className="absolute -bottom-5 -right-5 w-20 h-20 rounded-full blur-2xl pointer-events-none"
                      style={{ backgroundColor: isDo ? "rgba(133,205,202,0.38)" : "rgba(195,141,148,0.38)" }}
                    />
                    <div className="flex items-start gap-4 relative z-10">
                      <span
                        className="text-xs font-medium uppercase tracking-widest px-2.5 py-1 shrink-0 mt-0.5"
                        style={{
                          fontFamily: "system-ui, sans-serif",
                          color: isDo ? "#2a7a6a" : "#904050",
                          backgroundColor: isDo ? "rgba(133,205,202,0.22)" : "rgba(195,141,148,0.22)",
                          borderRadius: "9999px",
                        }}
                      >
                        {isDo ? "Do" : "Avoid"}
                      </span>
                      <div>
                        <p className="font-serif italic text-[#3a3430] text-lg mb-1">{rule.rule}</p>
                        <p className="text-sm font-serif" style={{ color: "rgba(58,52,48,0.52)" }}>{rule.detail}</p>
                      </div>
                    </div>
                  </div>
                </RevealBlock>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ──────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-6 md:px-12 max-w-4xl mx-auto">
        <RevealBlock>
          <h2 className="font-serif italic text-4xl md:text-5xl text-[#3a3430] mb-2">
            Send a <span style={{ color: "#4a6fa5" }}>Note</span>
          </h2>
          <p className="mb-12 font-serif italic" style={{ color: "rgba(58,52,48,0.58)" }}>
            Like a letter sealed with a wax stamp — unhurried, considered.
          </p>
        </RevealBlock>

        {submitted ? (
          <RevealBlock>
            <div
              className="relative text-center py-16 px-8 overflow-hidden paper"
              style={{
                backgroundColor: "rgba(133,205,202,0.10)",
                borderRadius: "2rem 3rem 2rem 3rem / 3rem 2rem 3rem 2rem",
                border: "1px solid rgba(133,205,202,0.22)",
              }}
            >
              <div className="absolute inset-0 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: "rgba(133,205,202,0.12)" }} />
              <p className="font-serif italic text-3xl text-[#3a3430] mb-3 relative z-10">Thank you</p>
              <p className="font-serif italic relative z-10" style={{ color: "rgba(58,52,48,0.58)" }}>
                Your note has been received, like a brushstroke on fresh paper.
              </p>
              <button
                type="button"
                className="wb-btn mt-8 px-6 py-2 font-serif italic text-[#4a6fa5] relative z-10"
                style={{ backgroundColor: "rgba(74,111,165,0.10)", border: "1px solid rgba(74,111,165,0.22)", borderRadius: "9999px" }}
                onClick={() => { setSubmitted(false); setMsgValue(""); }}
              >
                Write another
              </button>
            </div>
          </RevealBlock>
        ) : (
          <RevealBlock delay={0.1}>
            <div
              className="relative p-8 md:p-12 overflow-hidden paper"
              style={{
                backgroundColor: "#faf8f5",
                borderRadius: "2rem 3rem 2rem 3rem / 3rem 2rem 3rem 2rem",
                border: "1px solid rgba(74,111,165,0.10)",
                boxShadow: "0 12px 48px rgba(74,111,165,0.07)",
              }}
            >
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: "rgba(232,168,124,0.24)" }} />
              <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: "rgba(133,205,202,0.18)" }} />

              <div className="relative z-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "system-ui, sans-serif", color: "rgba(58,52,48,0.40)" }}>Name</label>
                    <input
                      type="text"
                      placeholder="Your name..."
                      className="w-full px-4 py-3 font-serif italic text-[#3a3430] placeholder-[#3a3430]/30 outline-none transition-all duration-500"
                      style={{ backgroundColor: "rgba(74,111,165,0.04)", border: "1px solid rgba(74,111,165,0.15)", borderRadius: "1.5rem 2rem 1.5rem 2rem" }}
                      onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px rgba(74,111,165,0.13)"; e.currentTarget.style.borderColor = "rgba(74,111,165,0.38)"; }}
                      onBlur={(e)  => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(74,111,165,0.15)"; }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "system-ui, sans-serif", color: "rgba(58,52,48,0.40)" }}>Email</label>
                    <input
                      type="email"
                      placeholder="hello@studio.com"
                      className="w-full px-4 py-3 font-serif italic text-[#3a3430] placeholder-[#3a3430]/30 outline-none transition-all duration-500"
                      style={{ backgroundColor: "rgba(74,111,165,0.04)", border: "1px solid rgba(74,111,165,0.15)", borderRadius: "2rem 1.5rem 2rem 1.5rem" }}
                      onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px rgba(74,111,165,0.13)"; e.currentTarget.style.borderColor = "rgba(74,111,165,0.38)"; }}
                      onBlur={(e)  => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(74,111,165,0.15)"; }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "system-ui, sans-serif", color: "rgba(58,52,48,0.40)" }}>Message</label>
                  <textarea
                    rows={5}
                    placeholder="Write freely, like paint on wet paper..."
                    value={msgValue}
                    onChange={(e) => setMsgValue(e.target.value)}
                    className="w-full px-4 py-3 font-serif italic text-[#3a3430] placeholder-[#3a3430]/30 outline-none resize-none transition-all duration-500"
                    style={{ backgroundColor: "rgba(74,111,165,0.04)", border: "1px solid rgba(74,111,165,0.15)", borderRadius: "2rem 2.5rem 2rem 2.5rem" }}
                    onFocus={(e) => { e.currentTarget.style.boxShadow = "0 0 0 3px rgba(74,111,165,0.13)"; e.currentTarget.style.borderColor = "rgba(74,111,165,0.38)"; }}
                    onBlur={(e)  => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(74,111,165,0.15)"; }}
                  />
                  {msgValue.length > 0 && (
                    <p className="text-xs mt-1 text-right" style={{ fontFamily: "system-ui, sans-serif", color: "rgba(58,52,48,0.32)" }}>
                      {msgValue.length} characters
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="wb-btn flex items-center gap-3 px-8 py-3 font-serif italic text-[#faf8f5] or1"
                    style={{ backgroundColor: "rgba(74,111,165,0.80)", boxShadow: "0 6px 24px rgba(74,111,165,0.20)" }}
                    onClick={() => setSubmitted(true)}
                  >
                    Send note
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>
        )}
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer
        className="relative overflow-hidden paper"
        style={{ borderTop: "1px solid rgba(74,111,165,0.09)" }}
      >
        <div className="absolute -top-16 left-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: "rgba(232,168,124,0.16)" }} />
        <div className="absolute -top-10 right-1/3 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: "rgba(133,205,202,0.13)" }} />
        <div className="absolute bottom-0 left-1/2 w-52 h-52 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: "rgba(195,141,148,0.10)" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div>
              <p className="font-serif italic text-3xl text-[#3a3430] mb-2">Watercolor Style</p>
              <p className="text-sm font-serif italic" style={{ color: "rgba(58,52,48,0.48)" }}>Part of the StyleKit design system</p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <Link href="/styles/watercolor-style" className="font-serif italic text-[#4a6fa5] hover:opacity-70 transition-opacity duration-300">
                View documentation
              </Link>
              <Link href="/styles" className="font-serif italic text-[#3a3430]/45 hover:opacity-70 transition-opacity duration-300 text-sm">
                All styles
              </Link>
            </div>
          </div>

          <div
            className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ borderTop: "1px solid rgba(74,111,165,0.09)" }}
          >
            <p className="text-xs" style={{ fontFamily: "system-ui, sans-serif", color: "rgba(58,52,48,0.32)" }}>
              StyleKit &middot; Watercolor Style Showcase
            </p>
            <div className="flex gap-2">
              {["#e8a87c", "#85cdca", "#c38d94", "#4a6fa5", "#d4a373"].map((color) => (
                <div
                  key={color}
                  className="w-3 h-3 or3"
                  style={{ backgroundColor: color, opacity: 0.58 }}
                />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
