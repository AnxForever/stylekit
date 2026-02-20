"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline Hooks                                                        */
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
      { threshold: 0.15, ...options }
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
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const bushidoVirtues = [
  {
    kanji: "義",
    romaji: "Gi",
    name: "Righteousness",
    desc: "The bone of the warrior. To decide and act without hesitation. Justice flows from the blade of conviction.",
    color: "#dc2626",
  },
  {
    kanji: "勇",
    romaji: "Yu",
    name: "Courage",
    desc: "To face the neon void without trembling. Heroic courage is lived in each moment — in each breath, each strike.",
    color: "#a020f0",
  },
  {
    kanji: "仁",
    romaji: "Jin",
    name: "Benevolence",
    desc: "Through intense training the samurai becomes quick and strong. Mercy comes only from that strength.",
    color: "#38bdf8",
  },
  {
    kanji: "礼",
    romaji: "Rei",
    name: "Respect",
    desc: "The samurai has no reason to be cruel. Without respect, the blade is merely a weapon — not an extension of self.",
    color: "#fbbf24",
  },
  {
    kanji: "誠",
    romaji: "Makoto",
    name: "Honesty",
    desc: "To speak, to act. These are not separate things. The samurai's word alone is unbreakable contract.",
    color: "#dc2626",
  },
  {
    kanji: "名",
    romaji: "Meiyo",
    name: "Honor",
    desc: "A decision made through introspection. This is the definition of honor — the electric signature of the soul.",
    color: "#a020f0",
  },
  {
    kanji: "忠",
    romaji: "Chugi",
    name: "Loyalty",
    desc: "Loyalty to those under the samurai's care is the final and defining virtue of Bushido.",
    color: "#38bdf8",
  },
];

const colorSwatches = [
  {
    name: "深夜",
    nameEn: "Deep Night",
    value: "#080818",
    glow: "rgba(8,8,24,0.8)",
    textColor: "#dc2626",
  },
  {
    name: "緋色",
    nameEn: "Crimson",
    value: "#dc2626",
    glow: "rgba(220,38,38,0.6)",
    textColor: "#dc2626",
  },
  {
    name: "紫炎",
    nameEn: "Violet",
    value: "#a020f0",
    glow: "rgba(160,32,240,0.6)",
    textColor: "#a020f0",
  },
  {
    name: "氷蒼",
    nameEn: "Ice Blue",
    value: "#38bdf8",
    glow: "rgba(56,189,248,0.6)",
    textColor: "#38bdf8",
  },
  {
    name: "黄金",
    nameEn: "Gold",
    value: "#fbbf24",
    glow: "rgba(251,191,36,0.6)",
    textColor: "#fbbf24",
  },
];

const doRules = [
  "刀 — Diagonal slash decorations (skew-y transform) to evoke the katana cut",
  "霓虹 — Neon glow shadows matching each accent: crimson, violet, ice blue, gold",
  "文字 — font-mono for UI elements; kanji/Japanese characters for decorative weight",
  "背景 — Deep night #080818 as base; no bright or warm backgrounds",
  "境界 — Crimson border glow at 30% rest opacity, 80% on hover — never thick solid borders",
  "動き — Smooth transitions 0.4–0.7s; slash reveals from 0 width; no instant cuts",
];

const dontRules = [
  "明 — Never use light or white backgrounds — this style lives in darkness",
  "丸 — Never use rounded-full or soft organic shapes on primary elements",
  "花 — Never use pastel colors, gradients with pink, or any watercolor-adjacent palette",
  "飾 — Never add decorations without purpose — every element must feel earned",
  "文 — Never use serif fonts for UI; they break the cyberpunk-bushido fusion",
  "忘 — Never forget: honor before aesthetics. Function before ornament.",
];

const slashCards = [
  {
    title: "刀 Katana Cut",
    subtitle: "Primary Interaction",
    desc: "The slash reveals on hover — a diagonal crimson line that 'cuts' across the card surface, evoking the swift draw of a katana from its sheath.",
    accentColor: "#dc2626",
    glow: "rgba(220,38,38,0.5)",
  },
  {
    title: "紫 Violet Strike",
    subtitle: "Secondary Variant",
    desc: "Violet slash variant for secondary cards. The color shifts while the interaction language — the diagonal cut — remains consistent across the system.",
    accentColor: "#a020f0",
    glow: "rgba(160,32,240,0.4)",
  },
  {
    title: "氷 Ice Slash",
    subtitle: "Tertiary Variant",
    desc: "Ice blue slash for tertiary emphasis. Three colors, one gesture. The katana cut as design system token — universal yet unmistakably neon samurai.",
    accentColor: "#38bdf8",
    glow: "rgba(56,189,248,0.4)",
  },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeBushido, setActiveBushido] = useState(0);
  const [slashActive, setSlashActive] = useState(false);
  const [activeTab, setActiveTab] = useState<"button" | "card" | "input">("button");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 120);
    return () => clearTimeout(t);
  }, []);

  const activeVirtue = bushidoVirtues[activeBushido];

  return (
    <div className="min-h-screen bg-[#080818] text-white font-mono overflow-x-hidden">

      {/* ===== 1. Fixed Navigation ===== */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[#080818]/95 backdrop-blur-md"
        style={{ boxShadow: "0 1px 0 rgba(220,38,38,0.6), 0 4px 24px rgba(220,38,38,0.15)" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Back link */}
            <Link
              href="/styles"
              className="text-sm text-[#dc2626] tracking-wider hover:text-[#ff3333] transition-colors duration-300 flex items-center gap-2 group"
              style={{ textShadow: "0 0 10px rgba(220,38,38,0.5)" }}
            >
              <svg
                className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              StyleKit
              <span className="text-[#dc2626]/40 ml-1">→</span>
            </Link>

            {/* Center brand — katakana decoration */}
            <div className="flex items-center gap-3">
              <span className="text-[#a020f0]/40 text-xs tracking-widest hidden md:block">ネオン</span>
              <span
                className="text-base text-[#dc2626] tracking-[0.2em] font-mono"
                style={{ textShadow: "0 0 12px rgba(220,38,38,0.7)" }}
              >
                霓虹武士
              </span>
              <span className="text-[#38bdf8]/40 text-xs tracking-widest hidden md:block">サムライ</span>
            </div>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-6">
              {["Virtues", "Colors", "Rules"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-xs text-white/30 tracking-[0.15em] uppercase hover:text-[#dc2626] transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* ===== 2. Hero ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#080818]">
        {/* Diagonal katana slash SVG decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1440 900"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            <line
              x1="0"
              y1="900"
              x2="1440"
              y2="0"
              stroke="#dc2626"
              strokeWidth="1.5"
              opacity="0.35"
            />
            <line
              x1="80"
              y1="900"
              x2="1440"
              y2="80"
              stroke="#dc2626"
              strokeWidth="0.5"
              opacity="0.12"
            />
            <line
              x1="0"
              y1="820"
              x2="1360"
              y2="0"
              stroke="#a020f0"
              strokeWidth="0.5"
              opacity="0.10"
            />
          </svg>
        </div>

        {/* Ink splatter background texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle,#dc2626 2px,transparent 2px) 0 0/28px 28px, radial-gradient(circle,#dc2626 1px,transparent 1px) 14px 14px/28px 28px",
          }}
        />

        {/* Ambient glows */}
        <div
          className="absolute top-0 right-0 w-[55%] h-[60%] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 80% 10%, rgba(220,38,38,0.08) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[45%] h-[50%] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 10% 90%, rgba(160,32,240,0.07) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute top-[40%] right-[15%] w-[30%] h-[30%] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, rgba(56,189,248,0.05) 0%, transparent 60%)",
          }}
        />

        {/* Large faded 侍 kanji */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
          style={{
            fontSize: "clamp(200px, 28vw, 400px)",
            color: "#dc2626",
            opacity: 0.04,
            fontFamily: "serif",
            lineHeight: 1,
          }}
        >
          侍
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-24 w-full">
          {/* Label */}
          <p
            className="text-xs text-[#dc2626]/60 tracking-[0.35em] uppercase mb-8 font-mono"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            StyleKit / Neon Samurai / 霓虹武士風
          </p>

          {/* Main title */}
          <h1
            className="font-mono font-bold leading-none tracking-tight mb-4"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
              textShadow: "0 0 30px rgba(220,38,38,0.8), 0 0 80px rgba(220,38,38,0.3)",
              color: "#ffffff",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(48px)",
              transition:
                "opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <span style={{ color: "#dc2626" }}>NEON</span>
            <br />
            <span>SAMURAI</span>
          </h1>

          {/* Gold 侍 accent */}
          <div
            className="flex items-baseline gap-4 mb-8"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
              transition:
                "opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.22s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.22s",
            }}
          >
            <span
              className="text-5xl md:text-7xl"
              style={{
                color: "#fbbf24",
                textShadow: "0 0 20px rgba(251,191,36,0.6)",
                fontFamily: "serif",
              }}
            >
              侍
            </span>
            <span className="text-sm text-[#a020f0] tracking-[0.2em]" style={{ textShadow: "0 0 8px rgba(160,32,240,0.6)" }}>
              ×
            </span>
            <span
              className="text-2xl md:text-3xl text-[#38bdf8] tracking-[0.15em]"
              style={{ textShadow: "0 0 15px rgba(56,189,248,0.6)" }}
            >
              電気
            </span>
          </div>

          {/* Description */}
          <p
            className="text-base md:text-lg text-white/40 max-w-xl leading-relaxed mb-12 font-mono"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.34s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.34s",
            }}
          >
            Japanese bushido aesthetics fused with cyberpunk neon. Katana diagonals.
            Ink splatter accents. Honor code typography. Crimson blood-red cuts through deep night.
          </p>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 0.85s cubic-bezier(0.16,1,0.3,1) 0.46s, transform 0.85s cubic-bezier(0.16,1,0.3,1) 0.46s",
            }}
          >
            {/* Primary crimson CTA */}
            <button
              className="group relative px-8 py-3.5 bg-[#dc2626] text-white text-sm tracking-[0.2em] uppercase overflow-hidden transition-all duration-400 hover:bg-[#b91c1c]"
              style={{
                boxShadow: "0 0 20px rgba(220,38,38,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {/* Ink splatter hover overlay */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle,rgba(255,255,255,0.06) 2px,transparent 2px) 0 0/16px 16px",
                }}
              />
              <span className="relative z-10">斬 / Execute Style</span>
            </button>
            {/* Ice blue secondary */}
            <button
              className="px-8 py-3.5 bg-transparent text-[#38bdf8] text-sm tracking-[0.2em] uppercase border border-[#38bdf8]/30 hover:border-[#38bdf8]/80 transition-all duration-400"
              style={{
                boxShadow: "0 0 0 transparent",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 0 15px rgba(56,189,248,0.4)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 0 transparent")
              }
            >
              学 / Learn More
            </button>
          </div>

          {/* Scroll indicator with crimson glow */}
          <div
            className="mt-20 flex items-center gap-3"
            style={{
              opacity: heroRevealed ? 0.5 : 0,
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.9s",
            }}
          >
            <div
              className="w-px h-10 bg-[#dc2626]"
              style={{ boxShadow: "0 0 6px rgba(220,38,38,0.8)" }}
            />
            <span className="text-[10px] text-white/30 tracking-[0.3em] uppercase">Scroll</span>
          </div>
        </div>
      </section>

      {/* ===== 3. Katana Slash Animation Cards ===== */}
      <section
        id="slash"
        className="relative py-24 md:py-32 px-6 md:px-12 bg-[#080818] overflow-hidden"
      >
        {/* Section background slash */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1440 600" fill="none">
            <line x1="0" y1="600" x2="1440" y2="0" stroke="#dc2626" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <RevealBlock className="mb-14">
            <p className="text-xs text-[#dc2626]/60 tracking-[0.3em] uppercase mb-3">
              Katana Slash / 刀の斬撃
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
              style={{ textShadow: "0 0 20px rgba(220,38,38,0.3)" }}
            >
              Slash Interactions
            </h2>
            <p className="text-white/35 max-w-lg leading-relaxed text-sm">
              CSS-only diagonal slash decorations animate across cards on hover.
              A crimson line cut — like a katana draw — reveals from 0 to full width.
              Hover each card to feel the strike.
            </p>
          </RevealBlock>

          {/* Toggle slash global reveal */}
          <RevealBlock delay={0.1} className="mb-10">
            <button
              onClick={() => setSlashActive((v) => !v)}
              className="text-xs tracking-[0.25em] uppercase px-6 py-3 border transition-all duration-400"
              style={{
                borderColor: slashActive ? "#dc2626" : "rgba(220,38,38,0.3)",
                color: slashActive ? "#dc2626" : "rgba(220,38,38,0.5)",
                boxShadow: slashActive ? "0 0 15px rgba(220,38,38,0.3)" : "none",
              }}
            >
              {slashActive ? "斬 — Slash Active" : "斬 — Toggle Slash Reveal"}
            </button>
          </RevealBlock>

          {/* Slash cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {slashCards.map((card, i) => (
              <RevealBlock key={card.title} delay={i * 0.1}>
                <div
                  className="group relative overflow-hidden border bg-[#0c0c1e] cursor-pointer transition-all duration-500"
                  style={{
                    borderColor: `${card.accentColor}30`,
                    boxShadow: slashActive ? `0 0 20px ${card.glow}` : "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${card.accentColor}80`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${card.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${card.accentColor}30`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = slashActive
                      ? `0 0 20px ${card.glow}`
                      : "none";
                  }}
                >
                  {/* Katana slash line — diagonal, animates from 0 on hover */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div
                      className="absolute"
                      style={{
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        transform: "skewY(-15deg)",
                        transformOrigin: "top left",
                      }}
                    >
                      <div
                        className="absolute top-1/2 left-0 h-px transition-all duration-500"
                        style={{
                          background: card.accentColor,
                          opacity: 0.6,
                          width: slashActive ? "100%" : "0%",
                          boxShadow: `0 0 8px ${card.accentColor}`,
                        }}
                      />
                    </div>

                    {/* Group hover slash — CSS trick via inline style */}
                    <style>{`
                      .slash-card-${i}:hover .slash-line-${i} {
                        width: 100% !important;
                      }
                    `}</style>
                    <div
                      className="absolute"
                      style={{
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        transform: "skewY(-15deg)",
                        transformOrigin: "top left",
                        pointerEvents: "none",
                      }}
                    >
                      <div
                        className={`slash-line-${i} absolute top-1/2 left-0 h-px transition-all duration-500`}
                        style={{
                          background: card.accentColor,
                          opacity: 0.4,
                          width: "0%",
                          boxShadow: `0 0 6px ${card.accentColor}`,
                        }}
                      />
                    </div>
                  </div>

                  <div className={`slash-card-${i} p-8`}>
                    {/* Accent line left */}
                    <div
                      className="w-1 h-8 mb-6 transition-all duration-400"
                      style={{
                        background: card.accentColor,
                        boxShadow: `0 0 10px ${card.glow}`,
                      }}
                    />
                    <p
                      className="text-[10px] tracking-[0.3em] uppercase mb-2"
                      style={{ color: `${card.accentColor}80` }}
                    >
                      {card.subtitle}
                    </p>
                    <h3
                      className="text-xl font-bold mb-4"
                      style={{
                        color: card.accentColor,
                        textShadow: `0 0 10px ${card.glow}`,
                      }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. Component Showcase ===== */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 bg-[#080818]">
        {/* Subtle ink splatter texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            background:
              "radial-gradient(circle,#a020f0 1.5px,transparent 1.5px) 0 0/22px 22px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="mb-14">
            <p className="text-xs text-[#a020f0]/60 tracking-[0.3em] uppercase mb-3">
              Components / 部品
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ textShadow: "0 0 20px rgba(160,32,240,0.3)" }}
            >
              Component Showcase
            </h2>
            <p className="text-white/35 max-w-md text-sm leading-relaxed">
              Buttons forged in crimson. Cards cut by diagonal blades.
              Inputs with glowing border focus states. Every element carries the mark of the warrior.
            </p>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.08} className="flex gap-0 mb-10 border border-[#dc2626]/20">
            {(["button", "card", "input"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300"
                style={{
                  background: activeTab === tab ? "#dc2626" : "transparent",
                  color: activeTab === tab ? "#ffffff" : "rgba(220,38,38,0.4)",
                  boxShadow: activeTab === tab ? "0 0 15px rgba(220,38,38,0.4)" : "none",
                }}
              >
                {tab === "button" ? "刀 Buttons" : tab === "card" ? "盾 Cards" : "筆 Inputs"}
              </button>
            ))}
          </RevealBlock>

          {/* Component demo */}
          <RevealBlock delay={0.14}>
            <div
              className="relative p-10 md:p-14 border border-[#dc2626]/15 bg-[#0a0a1a] overflow-hidden"
              style={{ boxShadow: "inset 0 0 40px rgba(8,8,24,0.8)" }}
            >
              {/* Corner slash accent */}
              <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none overflow-hidden">
                <svg viewBox="0 0 96 96" className="absolute inset-0 w-full h-full">
                  <line
                    x1="0"
                    y1="96"
                    x2="96"
                    y2="0"
                    stroke="#dc2626"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                </svg>
              </div>

              {/* Buttons tab */}
              {activeTab === "button" && (
                <div className="space-y-10">
                  <div>
                    <p className="text-[10px] text-white/25 tracking-[0.25em] uppercase mb-5">
                      Primary / 主要
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {/* Crimson primary with glow + ink splatter hover */}
                      <button
                        className="group relative px-7 py-3 bg-[#dc2626] text-white text-xs tracking-[0.2em] uppercase overflow-hidden transition-all duration-400 hover:bg-[#b91c1c]"
                        style={{ boxShadow: "0 0 20px rgba(220,38,38,0.5)" }}
                      >
                        <span
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background:
                              "radial-gradient(circle,rgba(255,255,255,0.08) 2px,transparent 2px) 0 0/14px 14px",
                          }}
                        />
                        <span className="relative z-10">斬 Strike</span>
                      </button>

                      {/* Ice blue secondary */}
                      <button
                        className="px-7 py-3 bg-transparent text-[#38bdf8] text-xs tracking-[0.2em] uppercase border border-[#38bdf8]/30 hover:border-[#38bdf8]/80 transition-all duration-400"
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLButtonElement).style.boxShadow =
                            "0 0 15px rgba(56,189,248,0.4)")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLButtonElement).style.boxShadow = "none")
                        }
                      >
                        氷 Ice
                      </button>

                      {/* Gold ghost */}
                      <button
                        className="px-7 py-3 bg-transparent text-[#fbbf24] text-xs tracking-[0.2em] uppercase border border-[#fbbf24]/30 hover:border-[#fbbf24]/80 transition-all duration-400"
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLButtonElement).style.boxShadow =
                            "0 0 15px rgba(251,191,36,0.4)")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLButtonElement).style.boxShadow = "none")
                        }
                      >
                        金 Gold
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] text-white/25 tracking-[0.25em] uppercase mb-5">
                      Disabled state / 無効
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button
                        disabled
                        className="px-7 py-3 bg-[#dc2626]/20 text-white/20 text-xs tracking-[0.2em] uppercase border border-[#dc2626]/10 cursor-not-allowed"
                      >
                        斬 Disabled
                      </button>
                      <button
                        disabled
                        className="px-7 py-3 bg-transparent text-white/15 text-xs tracking-[0.2em] uppercase border border-white/10 cursor-not-allowed"
                      >
                        無 Inactive
                      </button>
                    </div>
                  </div>

                  <p className="text-[10px] text-white/20 leading-relaxed max-w-md">
                    Primary: crimson fill + ink splatter hover overlay via radial-gradient.
                    Secondary + ghost: transparent fill, colored border + glow on hover.
                    All buttons: font-mono, uppercase, tracked — no rounded corners.
                  </p>
                </div>
              )}

              {/* Cards tab */}
              {activeTab === "card" && (
                <div className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Crimson slash card */}
                    <div
                      className="group relative overflow-hidden border border-[#dc2626]/30 bg-[#0c0c1e] p-7 transition-all duration-500 hover:border-[#dc2626]/70 cursor-pointer"
                      style={{ boxShadow: "none" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLDivElement).style.boxShadow =
                          "0 0 20px rgba(220,38,38,0.3)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLDivElement).style.boxShadow = "none")
                      }
                    >
                      {/* Diagonal slash decoration */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <svg className="absolute inset-0 w-full h-full">
                          <line
                            x1="0"
                            y1="100%"
                            x2="100%"
                            y2="0"
                            stroke="#dc2626"
                            strokeWidth="1.5"
                            opacity="0.25"
                          />
                        </svg>
                      </div>
                      <div
                        className="w-0.5 h-6 bg-[#dc2626] mb-5"
                        style={{ boxShadow: "0 0 8px rgba(220,38,38,0.6)" }}
                      />
                      <p className="text-[10px] text-[#dc2626]/50 tracking-[0.25em] uppercase mb-2">
                        Crimson / 緋
                      </p>
                      <h3
                        className="text-lg font-bold text-white mb-3"
                        style={{ textShadow: "0 0 8px rgba(220,38,38,0.3)" }}
                      >
                        Crimson Blade Card
                      </h3>
                      <p className="text-white/35 text-sm leading-relaxed">
                        Diagonal slash SVG across the card. Left crimson accent bar.
                        Border glows crimson on hover.
                      </p>
                    </div>

                    {/* Violet card */}
                    <div
                      className="group relative overflow-hidden border border-[#a020f0]/30 bg-[#0c0c1e] p-7 transition-all duration-500 hover:border-[#a020f0]/70 cursor-pointer"
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLDivElement).style.boxShadow =
                          "0 0 20px rgba(160,32,240,0.3)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLDivElement).style.boxShadow = "none")
                      }
                    >
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <svg className="absolute inset-0 w-full h-full">
                          <line
                            x1="0"
                            y1="100%"
                            x2="100%"
                            y2="0"
                            stroke="#a020f0"
                            strokeWidth="1.5"
                            opacity="0.25"
                          />
                        </svg>
                      </div>
                      <div
                        className="w-0.5 h-6 bg-[#a020f0] mb-5"
                        style={{ boxShadow: "0 0 8px rgba(160,32,240,0.6)" }}
                      />
                      <p className="text-[10px] text-[#a020f0]/50 tracking-[0.25em] uppercase mb-2">
                        Violet / 紫
                      </p>
                      <h3
                        className="text-lg font-bold text-white mb-3"
                        style={{ textShadow: "0 0 8px rgba(160,32,240,0.3)" }}
                      >
                        Violet Spirit Card
                      </h3>
                      <p className="text-white/35 text-sm leading-relaxed">
                        Violet variant of the slash card. Same language, different chromatic spirit.
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] text-white/20 leading-relaxed max-w-md">
                    All cards: dark #0c0c1e fill, diagonal slash SVG, left accent bar, colored border.
                    Hover: border opacity increases, glow shadow appears. No border-radius.
                  </p>
                </div>
              )}

              {/* Input tab */}
              {activeTab === "input" && (
                <div className="space-y-8 max-w-md">
                  <div>
                    <label className="block text-[10px] text-[#dc2626]/60 tracking-[0.3em] uppercase mb-3">
                      武士名 / Warrior Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name..."
                      className="w-full px-4 py-3 bg-[#0c0c1e] text-white text-sm font-mono placeholder-white/20 outline-none transition-all duration-400"
                      style={{
                        border: "1px solid rgba(220,38,38,0.3)",
                      }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLInputElement).style.border =
                          "1px solid rgba(220,38,38,0.8)";
                        (e.currentTarget as HTMLInputElement).style.boxShadow =
                          "0 0 15px rgba(220,38,38,0.2)";
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLInputElement).style.border =
                          "1px solid rgba(220,38,38,0.3)";
                        (e.currentTarget as HTMLInputElement).style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#38bdf8]/60 tracking-[0.3em] uppercase mb-3">
                      刀の名前 / Blade Name
                    </label>
                    <input
                      type="text"
                      placeholder="Name your katana..."
                      className="w-full px-4 py-3 bg-[#0c0c1e] text-white text-sm font-mono placeholder-white/20 outline-none transition-all duration-400"
                      style={{
                        border: "1px solid rgba(56,189,248,0.3)",
                      }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLInputElement).style.border =
                          "1px solid rgba(56,189,248,0.8)";
                        (e.currentTarget as HTMLInputElement).style.boxShadow =
                          "0 0 15px rgba(56,189,248,0.2)";
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLInputElement).style.border =
                          "1px solid rgba(56,189,248,0.3)";
                        (e.currentTarget as HTMLInputElement).style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-[#a020f0]/60 tracking-[0.3em] uppercase mb-3">
                      誓い / Oath
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Speak your bushido oath..."
                      className="w-full px-4 py-3 bg-[#0c0c1e] text-white text-sm font-mono placeholder-white/20 outline-none transition-all duration-400 resize-none"
                      style={{
                        border: "1px solid rgba(160,32,240,0.3)",
                      }}
                      onFocus={(e) => {
                        (e.currentTarget as HTMLTextAreaElement).style.border =
                          "1px solid rgba(160,32,240,0.8)";
                        (e.currentTarget as HTMLTextAreaElement).style.boxShadow =
                          "0 0 15px rgba(160,32,240,0.2)";
                      }}
                      onBlur={(e) => {
                        (e.currentTarget as HTMLTextAreaElement).style.border =
                          "1px solid rgba(160,32,240,0.3)";
                        (e.currentTarget as HTMLTextAreaElement).style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <p className="text-[10px] text-white/20 leading-relaxed">
                    Inputs: dark fill, colored border at 30% opacity, focus reveals glow + border 80% opacity.
                    Each input carries its own accent color. No rounded corners. font-mono throughout.
                  </p>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 5. Honor Code / Bushido Virtues ===== */}
      <section
        id="virtues"
        className="relative py-24 md:py-32 px-6 md:px-12 bg-[#080818] overflow-hidden"
      >
        {/* Large faded background character */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none hidden lg:block"
          style={{
            fontSize: "clamp(300px, 35vw, 500px)",
            color: "#a020f0",
            opacity: 0.025,
            fontFamily: "serif",
            lineHeight: 1,
          }}
        >
          道
        </div>

        {/* Diagonal slash bg decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 1440 800" fill="none">
            <line x1="0" y1="800" x2="1440" y2="0" stroke="#a020f0" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <RevealBlock className="mb-14">
            <p className="text-xs text-[#a020f0]/60 tracking-[0.3em] uppercase mb-3">
              Bushido Code / 武士道
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ textShadow: "0 0 20px rgba(160,32,240,0.3)" }}
            >
              Seven Virtues of the Samurai
            </h2>
            <p className="text-white/35 max-w-lg text-sm leading-relaxed">
              義勇仁礼誠名忠 — The seven pillars of bushido. Each virtue is a law.
              The design system honors this code: every element earns its place.
            </p>
          </RevealBlock>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Virtue selector — vertical scroll-style */}
            <div className="lg:col-span-4">
              <div className="space-y-0">
                {bushidoVirtues.map((virtue, i) => (
                  <RevealBlock key={virtue.kanji} delay={i * 0.06}>
                    <button
                      onClick={() => setActiveBushido(i)}
                      className="w-full text-left px-0 py-5 border-b transition-all duration-400 flex items-center gap-5 group"
                      style={{
                        borderColor:
                          activeBushido === i ? `${virtue.color}50` : "rgba(255,255,255,0.06)",
                      }}
                    >
                      {/* Crimson vertical accent line */}
                      <div
                        className="w-0.5 self-stretch flex-shrink-0 transition-all duration-400"
                        style={{
                          background:
                            activeBushido === i ? virtue.color : "rgba(255,255,255,0.08)",
                          boxShadow:
                            activeBushido === i ? `0 0 8px ${virtue.color}` : "none",
                        }}
                      />
                      {/* Kanji */}
                      <span
                        className="text-4xl flex-shrink-0 transition-all duration-400"
                        style={{
                          color:
                            activeBushido === i ? virtue.color : "rgba(255,255,255,0.2)",
                          textShadow:
                            activeBushido === i ? `0 0 15px ${virtue.color}` : "none",
                          fontFamily: "serif",
                        }}
                      >
                        {virtue.kanji}
                      </span>
                      <div>
                        <p
                          className="text-[10px] tracking-[0.25em] uppercase transition-colors duration-400"
                          style={{
                            color:
                              activeBushido === i ? `${virtue.color}80` : "rgba(255,255,255,0.2)",
                          }}
                        >
                          {virtue.romaji}
                        </p>
                        <p
                          className="text-sm font-bold transition-colors duration-400"
                          style={{
                            color:
                              activeBushido === i ? "#ffffff" : "rgba(255,255,255,0.35)",
                          }}
                        >
                          {virtue.name}
                        </p>
                      </div>
                    </button>
                  </RevealBlock>
                ))}
              </div>
            </div>

            {/* Active virtue detail */}
            <div className="lg:col-span-8">
              <RevealBlock delay={0.2}>
                <div
                  className="relative h-full border bg-[#0c0c1e] p-10 md:p-14 overflow-hidden"
                  style={{
                    borderColor: `${activeVirtue.color}30`,
                    boxShadow: `0 0 40px ${activeVirtue.color}15`,
                  }}
                >
                  {/* Diagonal slash */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <svg className="absolute inset-0 w-full h-full">
                      <line
                        x1="0"
                        y1="100%"
                        x2="100%"
                        y2="0"
                        stroke={activeVirtue.color}
                        strokeWidth="1.5"
                        opacity="0.18"
                      />
                    </svg>
                  </div>

                  {/* Large background kanji */}
                  <div
                    className="absolute bottom-4 right-8 select-none pointer-events-none"
                    style={{
                      fontSize: "clamp(100px, 16vw, 200px)",
                      color: activeVirtue.color,
                      opacity: 0.06,
                      fontFamily: "serif",
                      lineHeight: 1,
                    }}
                  >
                    {activeVirtue.kanji}
                  </div>

                  <div className="relative z-10">
                    <p
                      className="text-[10px] tracking-[0.35em] uppercase mb-4"
                      style={{ color: `${activeVirtue.color}60` }}
                    >
                      Virtue {activeBushido + 1} of 7 / 武士道
                    </p>

                    {/* Kanji display */}
                    <div
                      className="text-8xl md:text-9xl mb-6"
                      style={{
                        color: activeVirtue.color,
                        textShadow: `0 0 30px ${activeVirtue.color}, 0 0 80px ${activeVirtue.color}40`,
                        fontFamily: "serif",
                        lineHeight: 1,
                      }}
                    >
                      {activeVirtue.kanji}
                    </div>

                    <h3
                      className="text-2xl md:text-3xl font-bold text-white mb-2"
                      style={{ textShadow: "0 0 10px rgba(255,255,255,0.2)" }}
                    >
                      {activeVirtue.romaji} — {activeVirtue.name}
                    </h3>

                    {/* Crimson vertical accent + description */}
                    <div className="flex gap-5 mt-8">
                      <div
                        className="w-0.5 flex-shrink-0 self-stretch"
                        style={{
                          background: activeVirtue.color,
                          boxShadow: `0 0 8px ${activeVirtue.color}`,
                        }}
                      />
                      <p className="text-white/50 text-base leading-relaxed">
                        {activeVirtue.desc}
                      </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-4 mt-10">
                      <button
                        onClick={() => setActiveBushido((v) => Math.max(0, v - 1))}
                        disabled={activeBushido === 0}
                        className="px-5 py-2.5 text-xs tracking-[0.2em] uppercase border transition-all duration-300 disabled:opacity-20"
                        style={{
                          borderColor: `${activeVirtue.color}40`,
                          color: `${activeVirtue.color}80`,
                        }}
                      >
                        前 Prev
                      </button>
                      <button
                        onClick={() =>
                          setActiveBushido((v) => Math.min(bushidoVirtues.length - 1, v + 1))
                        }
                        disabled={activeBushido === bushidoVirtues.length - 1}
                        className="px-5 py-2.5 text-xs tracking-[0.2em] uppercase border transition-all duration-300 disabled:opacity-20"
                        style={{
                          borderColor: `${activeVirtue.color}40`,
                          color: `${activeVirtue.color}80`,
                        }}
                      >
                        次 Next
                      </button>
                      <span className="text-[10px] text-white/20 tracking-[0.2em] ml-2">
                        {activeBushido + 1} / {bushidoVirtues.length}
                      </span>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 6. Color System ===== */}
      <section
        id="colors"
        className="relative py-24 md:py-32 px-6 md:px-12 bg-[#080818] overflow-hidden"
      >
        {/* Ink splatter texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            background:
              "radial-gradient(circle,#38bdf8 2px,transparent 2px) 0 0/32px 32px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <RevealBlock className="mb-14">
            <p className="text-xs text-[#38bdf8]/60 tracking-[0.3em] uppercase mb-3">
              Color System / 色体系
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ textShadow: "0 0 20px rgba(56,189,248,0.3)" }}
            >
              The Palette of Night
            </h2>
            <p className="text-white/35 max-w-lg text-sm leading-relaxed">
              Five colors. One vision. Deep night as foundation — then crimson, violet,
              ice blue, and gold as the neon signals that cut through darkness.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-5 gap-4">
            {colorSwatches.map((swatch, i) => (
              <RevealBlock key={swatch.value} delay={i * 0.08}>
                <div
                  className="group relative overflow-hidden border bg-[#0c0c1e] p-6 transition-all duration-500 cursor-default"
                  style={{
                    borderColor: `${swatch.value}30`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${swatch.value}70`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${swatch.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${swatch.value}30`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  {/* Color swatch */}
                  <div
                    className="w-full aspect-square mb-5 transition-all duration-500 group-hover:scale-[1.03]"
                    style={{
                      background: swatch.value,
                      boxShadow: `0 0 20px ${swatch.glow}`,
                    }}
                  />

                  {/* Japanese color name */}
                  <p
                    className="text-2xl mb-1 transition-all duration-400"
                    style={{
                      color: swatch.textColor,
                      textShadow: `0 0 10px ${swatch.glow}`,
                      fontFamily: "serif",
                    }}
                  >
                    {swatch.name}
                  </p>

                  <p className="text-[10px] text-white/35 tracking-[0.15em] uppercase mb-3">
                    {swatch.nameEn}
                  </p>

                  <p
                    className="text-xs font-mono transition-colors duration-400 group-hover:opacity-80"
                    style={{ color: `${swatch.textColor}60` }}
                  >
                    {swatch.value}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Color usage diagram */}
          <RevealBlock delay={0.4} className="mt-12">
            <div
              className="relative border border-[#dc2626]/15 bg-[#0a0a1a] p-8 md:p-10 overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <svg className="absolute inset-0 w-full h-full opacity-10">
                  <line x1="0" y1="100%" x2="100%" y2="0" stroke="#dc2626" strokeWidth="1" />
                </svg>
              </div>
              <div className="relative z-10 grid md:grid-cols-3 gap-8">
                <div>
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase mb-3"
                    style={{ color: "rgba(220,38,38,0.6)" }}
                  >
                    Primary Role / 主色
                  </p>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-4 h-4 flex-shrink-0"
                      style={{ background: "#dc2626", boxShadow: "0 0 8px rgba(220,38,38,0.6)" }}
                    />
                    <span className="text-sm text-white/60">Crimson #dc2626</span>
                  </div>
                  <p className="text-xs text-white/25 leading-relaxed">
                    All primary interactions, borders on hover, CTA buttons, accent lines.
                  </p>
                </div>
                <div>
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase mb-3"
                    style={{ color: "rgba(160,32,240,0.6)" }}
                  >
                    Secondary Role / 副色
                  </p>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-4 h-4 flex-shrink-0"
                      style={{ background: "#a020f0", boxShadow: "0 0 8px rgba(160,32,240,0.6)" }}
                    />
                    <span className="text-sm text-white/60">Violet #a020f0</span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-4 h-4 flex-shrink-0"
                      style={{ background: "#38bdf8", boxShadow: "0 0 8px rgba(56,189,248,0.6)" }}
                    />
                    <span className="text-sm text-white/60">Ice Blue #38bdf8</span>
                  </div>
                  <p className="text-xs text-white/25 leading-relaxed">
                    Section accents, secondary buttons, supporting glows.
                  </p>
                </div>
                <div>
                  <p
                    className="text-[10px] tracking-[0.3em] uppercase mb-3"
                    style={{ color: "rgba(251,191,36,0.6)" }}
                  >
                    Accent Role / 強調色
                  </p>
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-4 h-4 flex-shrink-0"
                      style={{ background: "#fbbf24", boxShadow: "0 0 8px rgba(251,191,36,0.6)" }}
                    />
                    <span className="text-sm text-white/60">Gold #fbbf24</span>
                  </div>
                  <p className="text-xs text-white/25 leading-relaxed">
                    Kanji decorations, honor marks, sparingly used prestige signals.
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 7. Do / Don't Rules ===== */}
      <section
        id="rules"
        className="relative py-24 md:py-32 px-6 md:px-12 bg-[#080818] overflow-hidden"
      >
        {/* Katana slash bg */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 1440 700" fill="none">
            <line x1="0" y1="700" x2="1440" y2="0" stroke="#dc2626" strokeWidth="2" />
            <line x1="50" y1="700" x2="1440" y2="50" stroke="#dc2626" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <RevealBlock className="mb-14">
            <p className="text-xs text-[#fbbf24]/60 tracking-[0.3em] uppercase mb-3">
              Design Law / 掟
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              style={{ textShadow: "0 0 20px rgba(251,191,36,0.2)" }}
            >
              The Warrior&apos;s Code
            </h2>
            <p className="text-white/35 max-w-lg text-sm leading-relaxed">
              The samurai follows a strict code of conduct. The designer follows one too.
              These are the laws of the Neon Samurai design system.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* DO panel */}
            <RevealBlock delay={0.08}>
              <div
                className="relative h-full border-l-2 border bg-[#0c0c1e] p-8 md:p-10 overflow-hidden"
                style={{
                  borderLeftColor: "#dc2626",
                  borderColor: "rgba(220,38,38,0.15)",
                  boxShadow: "inset 4px 0 20px rgba(220,38,38,0.08)",
                }}
              >
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full">
                    <line
                      x1="0"
                      y1="100%"
                      x2="100%"
                      y2="0"
                      stroke="#dc2626"
                      strokeWidth="1"
                      opacity="0.08"
                    />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div
                      className="w-5 h-5 border-2 border-[#dc2626] flex items-center justify-center flex-shrink-0"
                      style={{ boxShadow: "0 0 8px rgba(220,38,38,0.5)" }}
                    >
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="#dc2626"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3
                      className="text-lg font-bold tracking-[0.15em] uppercase"
                      style={{
                        color: "#dc2626",
                        textShadow: "0 0 10px rgba(220,38,38,0.6)",
                      }}
                    >
                      従え — DO
                    </h3>
                  </div>

                  <ul className="space-y-5">
                    {doRules.map((rule, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <span
                          className="text-[10px] text-[#dc2626]/50 tracking-[0.1em] mt-1 flex-shrink-0 font-mono"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm text-white/45 leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>

            {/* DON'T panel */}
            <RevealBlock delay={0.14}>
              <div
                className="relative h-full border bg-[#0c0c1e] p-8 md:p-10 overflow-hidden"
                style={{
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {/* Dim crossed lines for don't */}
                  <svg className="absolute inset-0 w-full h-full">
                    <line x1="0" y1="0" x2="100%" y2="100%" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                    <line x1="100%" y1="0" x2="0" y2="100%" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  </svg>
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-5 h-5 border-2 border-white/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M3 3l6 6M9 3l-6 6"
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold tracking-[0.15em] uppercase text-white/30">
                      禁じ手 — DON&apos;T
                    </h3>
                  </div>

                  <ul className="space-y-5">
                    {dontRules.map((rule, i) => (
                      <li key={i} className="flex gap-4 items-start">
                        <span className="text-[10px] text-white/15 tracking-[0.1em] mt-1 flex-shrink-0 font-mono">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm text-white/25 leading-relaxed line-through decoration-white/10">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Bushido quote */}
          <RevealBlock delay={0.22} className="mt-10">
            <div
              className="relative border border-[#fbbf24]/15 bg-[#0a0a1a] p-10 overflow-hidden text-center"
            >
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <svg className="absolute inset-0 w-full h-full">
                  <line
                    x1="0"
                    y1="100%"
                    x2="100%"
                    y2="0"
                    stroke="#fbbf24"
                    strokeWidth="1"
                    opacity="0.08"
                  />
                </svg>
              </div>
              <div className="relative z-10">
                <p
                  className="text-xl md:text-2xl text-white/50 leading-relaxed max-w-2xl mx-auto mb-5"
                  style={{ fontFamily: "serif", fontStyle: "italic" }}
                >
                  &ldquo;The way of the samurai is found in death. The way of the designer is found in purpose.
                  Every pixel must earn its right to exist.&rdquo;
                </p>
                <span
                  className="text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: "rgba(251,191,36,0.5)" }}
                >
                  — 武士道の掟 / Bushido Design Principle
                </span>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== 8. Footer ===== */}
      <footer className="relative bg-[#080818] overflow-hidden">
        {/* Katana slash SVG divider */}
        <div className="relative w-full overflow-hidden" style={{ height: "2px" }}>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #dc2626 30%, #a020f0 50%, #38bdf8 70%, transparent 100%)",
              boxShadow: "0 0 12px rgba(220,38,38,0.6), 0 0 24px rgba(160,32,240,0.3)",
            }}
          />
        </div>

        {/* Large faded 忍 (endurance) kanji */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none"
          style={{
            fontSize: "clamp(180px, 22vw, 320px)",
            color: "#dc2626",
            opacity: 0.025,
            fontFamily: "serif",
            lineHeight: 1,
          }}
        >
          忍
        </div>

        {/* Diagonal katana slash behind footer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 1440 300" fill="none">
            <line x1="0" y1="300" x2="1440" y2="0" stroke="#dc2626" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div
                className="text-5xl mb-3"
                style={{
                  color: "#fbbf24",
                  textShadow: "0 0 20px rgba(251,191,36,0.5)",
                  fontFamily: "serif",
                }}
              >
                忍
              </div>
              <p
                className="text-sm text-[#dc2626] tracking-[0.2em] mb-1"
                style={{ textShadow: "0 0 8px rgba(220,38,38,0.5)" }}
              >
                霓虹武士 / NEON SAMURAI
              </p>
              <p className="text-xs text-white/20 tracking-[0.15em]">
                Part of StyleKit — a living library of design systems
              </p>
            </div>

            {/* Color band */}
            <div className="flex gap-2 items-center">
              {["#dc2626", "#a020f0", "#38bdf8", "#fbbf24"].map((c) => (
                <div
                  key={c}
                  className="w-8 h-8 transition-all duration-400 hover:scale-110"
                  style={{
                    background: c,
                    boxShadow: `0 0 12px ${c}`,
                  }}
                />
              ))}
            </div>

            {/* Nav */}
            <nav className="flex flex-col items-center md:items-end gap-3">
              <Link
                href="/styles/neon-samurai"
                className="text-xs text-white/25 hover:text-[#dc2626] transition-colors duration-300 tracking-[0.15em]"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="text-xs text-white/25 hover:text-[#dc2626] transition-colors duration-300 tracking-[0.15em]"
              >
                All Styles
              </Link>
              <Link
                href="/"
                className="text-xs text-white/25 hover:text-[#dc2626] transition-colors duration-300 tracking-[0.15em]"
              >
                Home
              </Link>
            </nav>
          </div>

          {/* Footer bottom */}
          <div
            className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderTop: "1px solid rgba(220,38,38,0.12)" }}
          >
            <p className="text-[10px] text-white/15 tracking-[0.25em] uppercase font-mono">
              &copy; 2025 StyleKit 道場 — Honor Code Design System
            </p>
            <p className="text-[10px] text-white/10 tracking-[0.15em] font-mono">
              義勇仁礼誠名忠
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
