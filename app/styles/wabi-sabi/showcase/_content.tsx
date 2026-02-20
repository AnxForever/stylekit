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
        transform: inView ? "translateY(0)" : "translateY(28px)",
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

const colorSwatches = [
  { name: "Sumi", label: "Ink", hex: "#3a3a3a", note: "Primary text — deep charcoal" },
  { name: "Washi", label: "Warm Paper", hex: "#f2ede4", note: "Secondary surface — rice paper", border: true },
  { name: "Koke", label: "Moss", hex: "#8a9a7b", note: "Accent — quiet sage" },
  { name: "Cha", label: "Tea", hex: "#b5a78c", note: "Accent — warm beige" },
  { name: "Tsuchi", label: "Clay", hex: "#8b6f4e", note: "Accent — earthen brown" },
];

const philosophyPrinciples = [
  {
    japanese: "不完全",
    romaji: "Fukanzen",
    meaning: "Imperfect",
    desc: "The cracked glaze on a tea bowl is not a flaw. It is where the firing left its mark. Every imperfection is an autobiography written in heat and time.",
  },
  {
    japanese: "無常",
    romaji: "Mujo",
    meaning: "Impermanent",
    desc: "The cherry blossoms fall in three days. Their beauty is inseparable from their brevity. Design that acknowledges change lives longer than design that denies it.",
  },
  {
    japanese: "不完成",
    romaji: "Fukansei",
    meaning: "Incomplete",
    desc: "The unfinished line invites the eye to complete it. Leave space for the viewer to participate. Incompleteness is an open hand reaching toward the beholder.",
  },
  {
    japanese: "侘び",
    romaji: "Wabi",
    meaning: "Rustic simplicity",
    desc: "The satisfaction of a plain wooden bowl over a gilded one. Finding richness in restraint, contentment in the humble, grace in the ordinary and overlooked.",
  },
  {
    japanese: "寂び",
    romaji: "Sabi",
    meaning: "Aged beauty",
    desc: "The patina of a copper roof turned green, the grain of weathered driftwood. Time is not erosion but artistry — the world's slowest and most patient craftsman.",
  },
];

const specimenCards = [
  {
    japanese: "割れた器",
    label: "Cracked Ceramic",
    desc: "The crack runs from rim to foot. We do not discard this bowl — we mend it with gold and call it more beautiful than before. Kintsugi teaches the worth of what has broken.",
  },
  {
    japanese: "風化した石",
    label: "Weathered Stone",
    desc: "A thousand years of rain have made this stone what it is. No sculptor's hand could achieve this smoothness, this particular weight of grey. Age is its own craft.",
  },
  {
    japanese: "落ち葉",
    label: "Fallen Leaf",
    desc: "Curled at the edges, colour fading from the outside in. The decay is the beauty — not despite what it is becoming, but because of it. This is the last radiance.",
  },
  {
    japanese: "古い道",
    label: "Worn Path",
    desc: "Each footstep is invisible, yet the path remembers them all. The earth compressed by countless journeys is a record of human longing, as faithful as any archive.",
  },
];

const doRules = [
  "Warm paper background — let the surface breathe",
  "Extreme whitespace — emptiness is not void, it is space with intention",
  "Thin ink brushstroke dividers at low opacity",
  "Serif font-light — no heaviness, no insistence, no performance",
  "Asymmetric layouts — intentionally off-center, as nature arranges things",
  "Duration-1000 slow transitions — unhurried, like the turning of seasons",
  "Natural motifs: water, stone, bamboo, moss, fallen leaf",
];

const dontRules = [
  "No bright colors or high saturation — vibrancy is noise",
  "No busy patterns or competing elements — stillness requires discipline",
  "No tech or digital visual effects — this is older than screens",
  "No perfectly symmetric layouts — symmetry is a human imposition",
  "No bold or heavy typography weights — lightness is the message",
  "No drop shadows or glows — hierarchy lives in whitespace alone",
];

/* ------------------------------------------------------------------ */
/*  Inline SVG Motifs                                                   */
/* ------------------------------------------------------------------ */

function WaterRippleSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="100" cy="102" rx="12" ry="8" stroke="#3a3a3a" strokeWidth="0.8" opacity="0.35" />
      <ellipse cx="99" cy="101" rx="28" ry="19" stroke="#3a3a3a" strokeWidth="0.6" opacity="0.27" />
      <ellipse cx="101" cy="103" rx="48" ry="33" stroke="#3a3a3a" strokeWidth="0.5" opacity="0.20" />
      <ellipse cx="98" cy="100" rx="70" ry="49" stroke="#3a3a3a" strokeWidth="0.4" opacity="0.14" />
      <ellipse cx="102" cy="104" rx="92" ry="64" stroke="#3a3a3a" strokeWidth="0.35" opacity="0.09" />
      <circle cx="100" cy="102" r="2.5" fill="#3a3a3a" opacity="0.22" />
    </svg>
  );
}

function BambooSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M38 275 C37 240, 36 200, 39 165 C41 130, 40 95, 37 60 C35 30, 38 10, 40 5"
        stroke="#8a9a7b"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.45"
      />
      <rect x="34" y="60" width="10" height="3" rx="1.5" fill="#8a9a7b" opacity="0.35" />
      <rect x="33" y="120" width="10" height="3" rx="1.5" fill="#8a9a7b" opacity="0.35" />
      <rect x="35" y="180" width="10" height="3" rx="1.5" fill="#8a9a7b" opacity="0.35" />
      <rect x="34" y="235" width="10" height="3" rx="1.5" fill="#8a9a7b" opacity="0.35" />
      <path d="M40 55 C55 45, 70 38, 68 28 C60 35, 48 40, 40 55Z" fill="#8a9a7b" opacity="0.28" />
      <path d="M38 115 C20 105, 8 95, 12 84 C22 92, 32 102, 38 115Z" fill="#8a9a7b" opacity="0.22" />
      <path d="M40 175 C58 162, 72 155, 70 143 C60 150, 48 162, 40 175Z" fill="#8a9a7b" opacity="0.25" />
      <path d="M37 230 C18 218, 6 208, 10 197 C20 205, 30 218, 37 230Z" fill="#8a9a7b" opacity="0.20" />
    </svg>
  );
}

function StoneTextureSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 80 C15 65, 18 45, 30 32 C42 20, 58 18, 75 22 C90 26, 105 20, 118 30 C132 40, 140 58, 138 74 C136 90, 125 102, 108 106 C90 110, 70 108, 55 106 C38 104, 24 96, 20 80Z"
        fill="#b5a78c"
        opacity="0.12"
      />
      <path
        d="M20 80 C15 65, 18 45, 30 32 C42 20, 58 18, 75 22 C90 26, 105 20, 118 30 C132 40, 140 58, 138 74 C136 90, 125 102, 108 106 C90 110, 70 108, 55 106 C38 104, 24 96, 20 80Z"
        stroke="#8b6f4e"
        strokeWidth="0.8"
        opacity="0.20"
      />
      <ellipse cx="52" cy="68" rx="14" ry="9" fill="#8a9a7b" opacity="0.18" />
      <ellipse cx="96" cy="55" rx="10" ry="7" fill="#8a9a7b" opacity="0.14" />
      <ellipse cx="72" cy="88" rx="12" ry="6" fill="#8a9a7b" opacity="0.12" />
      <path d="M60 40 C65 55, 70 68, 68 85" stroke="#8b6f4e" strokeWidth="0.6" opacity="0.15" strokeLinecap="round" />
      <path d="M90 35 C88 48, 92 62, 95 75" stroke="#8b6f4e" strokeWidth="0.5" opacity="0.12" strokeLinecap="round" />
    </svg>
  );
}

function InkBrushLine({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M0 4 C20 3.5, 60 2.5, 120 3.8 C180 5, 220 5.2, 280 4 C330 3, 370 3.5, 400 4"
        stroke="#3a3a3a"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.15"
      />
    </svg>
  );
}

function MoonSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="62" cy="60" r="38" fill="#b5a78c" opacity="0.10" />
      <circle cx="62" cy="60" r="38" stroke="#3a3a3a" strokeWidth="0.7" opacity="0.13" />
      <ellipse cx="78" cy="56" rx="32" ry="36" fill="#f7f3ec" opacity="0.90" />
      <circle cx="62" cy="60" r="50" stroke="#3a3a3a" strokeWidth="0.4" opacity="0.06" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function InkDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full ${className}`}>
      <InkBrushLine className="w-full h-2" />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-serif tracking-[0.45em] text-[#8a9a7b] uppercase mb-5 block">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Keyframes via inline style tag                                      */
/* ------------------------------------------------------------------ */

const wabiBreathCSS = `
  @keyframes wabiBreath {
    0%   { opacity: 0.7; }
    50%  { opacity: 1; }
    100% { opacity: 0.7; }
  }
  .wabi-breath {
    animation: wabiBreath 8000ms ease-in-out infinite;
  }
`;

/* ------------------------------------------------------------------ */
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState<"button" | "card" | "input">("button");
  const [activePrinciple, setActivePrinciple] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#3a3a3a] font-serif overflow-x-hidden">

      {/* Keyframes injection */}
      <style dangerouslySetInnerHTML={{ __html: wabiBreathCSS }} />

      {/* ===================================================================
          1. FIXED NAVIGATION
      ==================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f7f3ec]/95 backdrop-blur-sm border-b border-[#d4cdc5]/30">
        <div className="max-w-6xl mx-auto px-8 md:px-16">
          <div className="flex items-center justify-between h-14 md:h-16">

            {/* Back link */}
            <Link
              href="/"
              className="font-serif text-xs text-[#3a3a3a]/40 tracking-[0.2em] transition-opacity duration-1000 hover:opacity-100 opacity-60 flex items-center gap-2"
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                <path d="M10 12L6 8l4-4" />
              </svg>
              StyleKit
            </Link>

            {/* Center brand */}
            <span className="font-serif font-light text-sm text-[#3a3a3a]/50 tracking-[0.3em]">
              侘寂
            </span>

            {/* Right nav */}
            <nav className="flex items-center gap-7">
              <Link
                href="/styles/wabi-sabi"
                className="font-serif text-xs text-[#3a3a3a] tracking-[0.15em] opacity-30 hover:opacity-70 transition-opacity duration-1000"
              >
                docs
              </Link>
              <Link
                href="/styles"
                className="font-serif text-xs text-[#3a3a3a] tracking-[0.15em] opacity-30 hover:opacity-70 transition-opacity duration-1000"
              >
                styles
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===================================================================
          2. HERO
      ==================================================================== */}
      <section className="relative pt-52 pb-52 md:pt-64 md:pb-64 px-8 md:px-16 overflow-hidden flex items-center justify-center min-h-screen">

        {/* Background bamboo — far right, very faint */}
        <div className="absolute right-[5%] top-[8%] pointer-events-none wabi-breath">
          <BambooSVG className="w-14 h-56 md:w-18 md:h-72" />
        </div>

        {/* Water ripple — upper left, decorative */}
        <div className="absolute left-[2%] top-[20%] pointer-events-none opacity-30">
          <WaterRippleSVG className="w-52 h-52 md:w-72 md:h-72" />
        </div>

        {/* Moon — lower right */}
        <div className="absolute right-[15%] bottom-[10%] pointer-events-none opacity-80">
          <MoonSVG className="w-36 h-36 md:w-52 md:h-52" />
        </div>

        {/* Hero content — centered */}
        <div className="relative z-10 text-center max-w-2xl mx-auto">

          {/* Moss-green Japanese label */}
          <p className="text-xs font-serif tracking-[0.5em] text-[#8a9a7b] uppercase mb-10">
            侘寂 &nbsp;&middot;&nbsp; Wabi-Sabi
          </p>

          {/* Main title */}
          <h1
            className="font-serif font-light text-[#3a3a3a]/80 leading-none mb-8"
            style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)", letterSpacing: "-0.02em" }}
          >
            The beauty of<br />imperfection
          </h1>

          {/* Italic subtitle */}
          <p
            className="font-serif font-light italic text-[#8a8278] leading-loose mb-16 mx-auto max-w-md"
            style={{ fontSize: "clamp(1rem, 2vw, 1.2rem)" }}
          >
            Nothing lasts, nothing is finished, and nothing is perfect —
            this is the beginning of beauty, not its end.
          </p>

          {/* Thin divider */}
          <div className="w-16 h-[1px] bg-[#d4cdc5]/50 mx-auto mb-10" />

          {/* Button — exact spec pattern */}
          <button className="px-8 py-3 bg-transparent text-[#3a3a3a] font-serif text-sm tracking-[0.2em] border-b border-[#d4cdc5]/50 hover:border-[#3a3a3a] hover:bg-[#3a3a3a]/5 active:bg-[#3a3a3a]/10 transition-all duration-1000 ease-in-out">
            Enter Silence
          </button>
        </div>
      </section>

      {/* Ink divider */}
      <div className="px-8 md:px-16 py-3">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ===================================================================
          3. PHILOSOPHY / PRINCIPLES — 5 wabi-sabi principles
      ==================================================================== */}
      <section className="py-32 md:py-48 px-8 md:px-16 bg-[#f2ede4]">
        <div className="max-w-5xl mx-auto">

          <RevealBlock className="mb-24">
            <SectionLabel>Philosophy</SectionLabel>
            <h2
              className="font-serif font-light text-[#3a3a3a] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.01em" }}
            >
              Five principles
            </h2>
            <p className="font-serif font-light text-[#8a8278] mt-5 leading-loose max-w-sm text-sm">
              The five pillars of wabi-sabi — each a lens through which imperfection becomes revelation.
            </p>
          </RevealBlock>

          <div className="space-y-16 md:space-y-20">
            {philosophyPrinciples.map((principle, i) => (
              <RevealBlock key={principle.romaji} delay={i * 0.08}>
                <button
                  className="w-full text-left group"
                  onClick={() => setActivePrinciple(activePrinciple === i ? null : i)}
                >
                  <div
                    className={`flex flex-col md:flex-row gap-6 md:gap-16 py-8 border-b border-[#d4cdc5]/30 transition-all duration-1000 ease-in-out ${
                      i % 2 === 1 ? "md:pl-16" : ""
                    }`}
                  >
                    {/* Japanese + romaji */}
                    <div className="flex-shrink-0 md:w-40">
                      <p
                        className="font-serif font-light leading-none mb-2 transition-opacity duration-1000 ease-in-out"
                        style={{
                          fontSize: "clamp(2rem, 5vw, 3rem)",
                          color: "#3a3a3a",
                          opacity: activePrinciple === i ? 0.35 : 0.12,
                        }}
                      >
                        {principle.japanese}
                      </p>
                      <p
                        className="text-xs font-serif tracking-[0.3em] uppercase transition-opacity duration-1000 ease-in-out"
                        style={{ color: "#3a3a3a", opacity: activePrinciple === i ? 0.55 : 0.28 }}
                      >
                        {principle.romaji}
                      </p>
                    </div>

                    {/* Meaning + desc */}
                    <div className="flex-1">
                      <h3
                        className="font-serif font-light text-[#3a3a3a] text-xl mb-4 leading-tight transition-opacity duration-1000 ease-in-out group-hover:opacity-100"
                        style={{ opacity: activePrinciple === i ? 1 : 0.6 }}
                      >
                        {principle.meaning}
                      </h3>
                      <p
                        className="font-serif font-light text-sm leading-[1.95] transition-opacity duration-1000 ease-in-out"
                        style={{
                          color: "#3a3a3a",
                          opacity: activePrinciple === i ? 0.65 : 0,
                          maxHeight: activePrinciple === i ? "120px" : "0px",
                          overflow: "hidden",
                          transition: "opacity 1000ms ease-in-out, max-height 1000ms ease-in-out",
                        }}
                      >
                        {principle.desc}
                      </p>
                    </div>

                    {/* Toggle indicator — ink fading */}
                    <div className="flex-shrink-0 self-center">
                      <div
                        className="w-4 h-[1px] bg-[#3a3a3a] transition-opacity duration-1000 ease-in-out"
                        style={{ opacity: activePrinciple === i ? 0.5 : 0.15 }}
                      />
                    </div>
                  </div>
                </button>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Ink divider */}
      <div className="px-8 md:px-16 py-3">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ===================================================================
          4. SPECIMENS — 4 wabi-sabi object cards
      ==================================================================== */}
      <section className="py-32 md:py-48 px-8 md:px-16 bg-[#f7f3ec]">
        <div className="max-w-5xl mx-auto">

          <RevealBlock className="mb-24">
            <SectionLabel>Specimens</SectionLabel>
            <h2
              className="font-serif font-light text-[#3a3a3a] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.01em" }}
            >
              Wabi-sabi objects
            </h2>
            <p className="font-serif font-light text-[#8a8278] mt-5 leading-loose max-w-sm text-sm">
              Four objects that carry the mark of time and the grace of imperfection.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-0">
            {specimenCards.map((card, i) => (
              <RevealBlock key={card.label} delay={i * 0.10}>
                {/* Exact card pattern from spec */}
                <div className="group p-12 bg-[#f2ede4] border-l border-[#d4cdc5]/30 hover:border-[#8a9a7b]/40 hover:bg-[#efebe1] transition-all duration-[1500ms] ease-in-out cursor-default">
                  <p className="text-xs font-serif tracking-[0.4em] text-[#8a9a7b] mb-3 opacity-60">
                    {card.japanese}
                  </p>
                  <h3 className="text-xl font-serif font-light text-[#3a3a3a]/70 mb-6 tracking-widest group-hover:text-[#3a3a3a] transition-colors duration-1000">
                    {card.label}
                  </h3>
                  <p className="text-sm text-[#8a8278] font-serif leading-loose group-hover:text-[#5c564f] transition-colors duration-1000">
                    {card.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Ink divider */}
      <div className="px-8 md:px-16 py-3">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ===================================================================
          5. COMPONENT DEMO — Tab switcher (useState)
      ==================================================================== */}
      <section className="py-32 md:py-48 px-8 md:px-16 bg-[#f2ede4]">
        <div className="max-w-4xl mx-auto">

          <RevealBlock className="mb-20">
            <SectionLabel>Components</SectionLabel>
            <h2
              className="font-serif font-light text-[#3a3a3a] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.01em" }}
            >
              Elements of silence
            </h2>
            <p className="font-serif font-light text-[#8a8278] mt-5 leading-loose max-w-sm text-sm">
              Each element carries the quietness of ink on paper. No excess. Nothing performed.
            </p>
          </RevealBlock>

          {/* Tab switcher — minimal wabi-sabi style, small tracking labels */}
          <RevealBlock delay={0.06} className="mb-12">
            <div className="flex gap-10 border-b border-[#d4cdc5]/30">
              {(["button", "card", "input"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-xs font-serif tracking-[0.2em] uppercase transition-all duration-1000 ease-in-out border-b -mb-px ${
                    activeTab === tab
                      ? "text-[#3a3a3a] border-[#3a3a3a]/50 opacity-100"
                      : "text-[#3a3a3a] border-transparent opacity-30 hover:opacity-60"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo area */}
          <RevealBlock delay={0.12}>
            <div className="min-h-[340px] bg-[#f7f3ec] border-l border-[#d4cdc5]/30 p-10 md:p-14">

              {/* Button demo */}
              {activeTab === "button" && (
                <div className="flex flex-col gap-14">
                  <div>
                    <p className="text-xs font-serif tracking-[0.35em] text-[#3a3a3a]/30 uppercase mb-8">Primary — underline border</p>
                    <div className="flex flex-wrap gap-6 items-center">
                      <button className="px-8 py-3 bg-transparent text-[#3a3a3a] font-serif text-sm tracking-[0.2em] border-b border-[#d4cdc5]/50 hover:border-[#3a3a3a] hover:bg-[#3a3a3a]/5 active:bg-[#3a3a3a]/10 transition-all duration-1000 ease-in-out">
                        Enter Silence
                      </button>
                      <button className="px-8 py-3 bg-transparent text-[#8a9a7b] font-serif text-sm tracking-[0.2em] border-b border-[#8a9a7b]/30 hover:border-[#8a9a7b] hover:bg-[#8a9a7b]/5 transition-all duration-1000 ease-in-out">
                        Observe
                      </button>
                      <button className="px-8 py-3 bg-transparent text-[#8b6f4e] font-serif text-sm tracking-[0.2em] border-b border-[#8b6f4e]/30 hover:border-[#8b6f4e] hover:bg-[#8b6f4e]/5 transition-all duration-1000 ease-in-out">
                        Rest
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-serif tracking-[0.35em] text-[#3a3a3a]/30 uppercase mb-8">Filled — ink on paper</p>
                    <div className="flex flex-wrap gap-6 items-center">
                      <button className="px-8 py-3 bg-[#3a3a3a] text-[#f2ede4] font-serif text-xs tracking-[0.25em] uppercase transition-all duration-1000 ease-in-out hover:bg-[#8a9a7b]">
                        Continue
                      </button>
                      <button className="px-8 py-3 bg-[#8a9a7b] text-[#f7f3ec] font-serif text-xs tracking-[0.25em] uppercase transition-all duration-1000 ease-in-out hover:bg-[#3a3a3a]">
                        Matcha
                      </button>
                    </div>
                  </div>

                  <p className="text-xs font-serif text-[#3a3a3a]/25 italic leading-relaxed max-w-sm">
                    Ink weight shifts — never scale, never shadow. The border deepens like ink absorbing into paper over time.
                  </p>
                </div>
              )}

              {/* Card demo */}
              {activeTab === "card" && (
                <div className="flex flex-col gap-8">
                  <p className="text-xs font-serif tracking-[0.35em] text-[#3a3a3a]/30 uppercase mb-4">Exact wabi-sabi card pattern</p>
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="group p-12 bg-[#f2ede4] border-l border-[#d4cdc5]/30 hover:border-[#8a9a7b]/40 hover:bg-[#efebe1] transition-all duration-[1500ms] ease-in-out cursor-default">
                      <h3 className="text-xl font-serif font-light text-[#3a3a3a]/70 mb-6 tracking-widest group-hover:text-[#3a3a3a] transition-colors duration-1000">
                        Imperfect Beauty
                      </h3>
                      <p className="text-sm text-[#8a8278] font-serif leading-loose group-hover:text-[#5c564f] transition-colors duration-1000">
                        Nothing lasts, nothing is finished, and nothing is perfect.
                      </p>
                    </div>
                    <div className="group p-12 bg-[#f2ede4] border-l border-[#d4cdc5]/30 hover:border-[#8a9a7b]/40 hover:bg-[#efebe1] transition-all duration-[1500ms] ease-in-out cursor-default">
                      <h3 className="text-xl font-serif font-light text-[#3a3a3a]/70 mb-6 tracking-widest group-hover:text-[#3a3a3a] transition-colors duration-1000">
                        Still Reflection
                      </h3>
                      <p className="text-sm text-[#8a8278] font-serif leading-loose group-hover:text-[#5c564f] transition-colors duration-1000">
                        The pond holds the sky entire — perfectly, without effort.
                      </p>
                    </div>
                  </div>
                  <p className="text-xs font-serif text-[#3a3a3a]/25 italic leading-loose">
                    Left border only — no top, right, or bottom. 1500ms transition on background. Text opacity fades from /70 to full on hover.
                  </p>
                </div>
              )}

              {/* Input demo */}
              {activeTab === "input" && (
                <div className="max-w-sm flex flex-col gap-10">
                  <p className="text-xs font-serif tracking-[0.35em] text-[#3a3a3a]/30 uppercase">Correspondence</p>
                  <div className="space-y-8">
                    <div>
                      <label className="block text-xs font-serif tracking-[0.3em] text-[#3a3a3a]/35 uppercase mb-3">
                        name
                      </label>
                      <input
                        type="text"
                        placeholder="your name..."
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#d4cdc5]/60 text-[#3a3a3a] font-serif placeholder-[#d4cdc5] focus:outline-none focus:border-[#8a9a7b]/60 transition-colors duration-1000 ease-in-out"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-serif tracking-[0.3em] text-[#3a3a3a]/35 uppercase mb-3">
                        a thought
                      </label>
                      <input
                        type="text"
                        placeholder="let the words rest here..."
                        className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#d4cdc5]/60 text-[#3a3a3a] font-serif placeholder-[#d4cdc5] focus:outline-none focus:border-[#8a9a7b]/60 transition-colors duration-1000 ease-in-out"
                      />
                    </div>
                    <button className="px-8 py-3 bg-transparent text-[#3a3a3a] font-serif text-sm tracking-[0.2em] border-b border-[#d4cdc5]/50 hover:border-[#3a3a3a] hover:bg-[#3a3a3a]/5 transition-all duration-1000 ease-in-out">
                      Send quietly
                    </button>
                  </div>
                  <p className="text-xs font-serif text-[#3a3a3a]/25 italic leading-loose">
                    Bottom border only. No rounded corners. No border-box. Serif light — like a brushstroke of correspondence.
                  </p>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Ink divider */}
      <div className="px-8 md:px-16 py-3">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ===================================================================
          6. COLOR PALETTE — 5 swatches with massive whitespace, thin bottom border
      ==================================================================== */}
      <section className="py-32 md:py-48 px-8 md:px-16 bg-[#f7f3ec]">
        <div className="max-w-5xl mx-auto">

          <RevealBlock className="mb-24">
            <SectionLabel>Palette</SectionLabel>
            <h2
              className="font-serif font-light text-[#3a3a3a] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.01em" }}
            >
              Earth &amp; silence
            </h2>
            <p className="font-serif font-light text-[#8a8278] mt-5 leading-loose max-w-sm text-sm">
              Five colours drawn from the forest floor, the tea garden, the autumn hillside.
            </p>
          </RevealBlock>

          {/* Swatches — NO visible boxes, just thin bottom border under each */}
          <div className="flex flex-col">
            {colorSwatches.map((swatch, i) => (
              <RevealBlock key={swatch.name} delay={i * 0.08}>
                <div
                  className="flex items-center gap-10 py-10 border-b border-[#d4cdc5]/30 last:border-b-0"
                  style={{ paddingLeft: `${[0, 40, 16, 56, 8][i]}px` }}
                >
                  {/* Thin color bar — not a box, just a color line */}
                  <div
                    className="flex-shrink-0 h-[2px] w-20"
                    style={{
                      backgroundColor: swatch.hex,
                      border: swatch.border ? "none" : "none",
                      outline: swatch.border ? `1px solid #3a3a3a15` : "none",
                    }}
                  />

                  {/* Color info */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-baseline md:gap-5">
                      <p className="font-serif font-light text-[#3a3a3a] text-base">{swatch.name}</p>
                      <p className="font-serif text-xs text-[#3a3a3a]/35 tracking-[0.2em]">{swatch.label}</p>
                    </div>
                    <p className="font-serif text-xs text-[#3a3a3a]/25 mt-1 tracking-[0.1em]">{swatch.note}</p>
                  </div>

                  {/* Hex — ultrasmall, matching color */}
                  <p
                    className="font-serif text-xs tracking-[0.15em] hidden md:block opacity-50"
                    style={{ color: swatch.hex === "#f2ede4" ? "#a09088" : swatch.hex }}
                  >
                    {swatch.hex}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Ink divider */}
      <div className="px-8 md:px-16 py-3">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ===================================================================
          7. DESIGN RULES — Do / Don't with opacity hover effect
      ==================================================================== */}
      <section className="py-32 md:py-48 px-8 md:px-16 bg-[#f2ede4]">
        <div className="max-w-5xl mx-auto">

          <RevealBlock className="mb-24">
            <SectionLabel>Principles</SectionLabel>
            <h2
              className="font-serif font-light text-[#3a3a3a] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.01em" }}
            >
              The way of wabi
            </h2>
            <p className="font-serif font-light text-[#8a8278] mt-5 leading-loose max-w-md text-sm">
              Not rules but a practice. Not constraints but a clearing away of what was never necessary.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-16 md:gap-24">

            {/* Embrace — Do */}
            <RevealBlock delay={0.06}>
              <div>
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-5 h-[1px] bg-[#8a9a7b]" />
                  <h3 className="font-serif font-light text-[#8a9a7b] text-sm tracking-[0.3em] uppercase">
                    Embrace
                  </h3>
                </div>
                {/* Each rule on its own line, huge py-6 between each */}
                <div className="flex flex-col">
                  {doRules.map((rule, i) => (
                    <div
                      key={i}
                      className="py-6 border-b border-[#d4cdc5]/30 last:border-b-0 group cursor-default"
                    >
                      <p className="font-serif font-light text-[#3a3a3a] text-sm leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out">
                        {rule}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Release — Don't */}
            <RevealBlock delay={0.12}>
              <div style={{ marginTop: "24px" }}>
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-5 h-[1px] bg-[#8b6f4e]" />
                  <h3 className="font-serif font-light text-[#8b6f4e] text-sm tracking-[0.3em] uppercase">
                    Release
                  </h3>
                </div>
                <div className="flex flex-col">
                  {dontRules.map((rule, i) => (
                    <div
                      key={i}
                      className="py-6 border-b border-[#d4cdc5]/30 last:border-b-0 group cursor-default"
                    >
                      <p className="font-serif font-light text-[#3a3a3a] text-sm leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out">
                        {rule}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* Ink divider */}
      <div className="px-8 md:px-16 py-3">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ===================================================================
          8. TYPOGRAPHY
      ==================================================================== */}
      <section className="py-32 md:py-48 px-8 md:px-16 bg-[#f7f3ec]">
        <div className="max-w-5xl mx-auto">

          <RevealBlock className="mb-24 md:ml-8">
            <SectionLabel>Typography</SectionLabel>
            <h2
              className="font-serif font-light text-[#3a3a3a] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.01em" }}
            >
              Type as silence
            </h2>
          </RevealBlock>

          <div className="space-y-20">
            <RevealBlock>
              <div className="border-b border-[#d4cdc5]/30 pb-14">
                <p className="text-xs font-serif tracking-[0.3em] text-[#3a3a3a]/25 uppercase mb-5">
                  Display — font-light, wide tracking
                </p>
                <p
                  className="font-serif font-light text-[#3a3a3a]/80 leading-none"
                  style={{ fontSize: "clamp(3rem, 8vw, 6rem)", letterSpacing: "0.08em" }}
                >
                  stillness
                </p>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.06}>
              <div className="border-b border-[#d4cdc5]/30 pb-14 md:ml-10">
                <p className="text-xs font-serif tracking-[0.3em] text-[#3a3a3a]/25 uppercase mb-5">
                  Heading — font-light, natural
                </p>
                <p
                  className="font-serif font-light text-[#3a3a3a] leading-tight"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}
                >
                  The beauty of things impermanent
                </p>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.10}>
              <div className="border-b border-[#d4cdc5]/30 pb-14">
                <p className="text-xs font-serif tracking-[0.3em] text-[#3a3a3a]/25 uppercase mb-5">
                  Subheading — italic, moss accent
                </p>
                <p
                  className="font-serif font-light italic text-[#8a9a7b] leading-snug"
                  style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)" }}
                >
                  Where light falls unevenly, the eye rests
                </p>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.14}>
              <div className="border-b border-[#d4cdc5]/30 pb-14 md:ml-20">
                <p className="text-xs font-serif tracking-[0.3em] text-[#3a3a3a]/25 uppercase mb-5">
                  Body — font-light, generous leading
                </p>
                <p className="font-serif font-light text-[#3a3a3a]/55 text-base leading-[2] max-w-lg">
                  The worn wooden floor holds decades of footsteps. Each scratch is a story. Each dent, a memory. We do not sand them away — we wax them to a gentle shine and call the house our own.
                </p>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.18}>
              <div>
                <p className="text-xs font-serif tracking-[0.3em] text-[#3a3a3a]/25 uppercase mb-5">
                  Caption — extreme tracking
                </p>
                <p
                  className="font-serif font-light text-[#3a3a3a]/30 uppercase"
                  style={{ fontSize: "10px", letterSpacing: "0.5em" }}
                >
                  a small thing, briefly noticed
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* Ink divider */}
      <div className="px-8 md:px-16 py-3">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ===================================================================
          9. NATURAL MOTIFS
      ==================================================================== */}
      <section className="py-32 md:py-48 px-8 md:px-16 bg-[#f2ede4]">
        <div className="max-w-5xl mx-auto">

          <RevealBlock className="mb-24">
            <SectionLabel>Motifs</SectionLabel>
            <h2
              className="font-serif font-light text-[#3a3a3a] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.01em" }}
            >
              Drawn from nature
            </h2>
            <p className="font-serif font-light text-[#8a8278] mt-5 leading-loose max-w-md text-sm">
              Inline SVG motifs — water, stone, bamboo. No photography. No stock illustration. Only the mark.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-0">
            <RevealBlock delay={0.05}>
              <div className="p-8 md:p-12 flex flex-col items-start gap-8">
                <WaterRippleSVG className="w-28 h-28 opacity-65" />
                <div>
                  <h3 className="font-serif font-light text-[#3a3a3a] text-lg mb-3">Water</h3>
                  <p className="font-serif font-light text-[#8a8278] text-sm leading-[1.95]">
                    Concentric imperfect ellipses. Each ring slightly off-center — as if drawn by a trembling brush after deep meditation.
                  </p>
                </div>
                <p className="font-serif text-xs text-[#3a3a3a]/25 italic">mizu — 水</p>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.10}>
              <div
                className="p-8 md:p-12 flex flex-col items-start gap-8 md:mt-16"
                style={{ borderLeft: "1px solid #d4cdc530" }}
              >
                <BambooSVG className="w-8 h-32 opacity-80" />
                <div>
                  <h3 className="font-serif font-light text-[#3a3a3a] text-lg mb-3">Bamboo</h3>
                  <p className="font-serif font-light text-[#8a8278] text-sm leading-[1.95]">
                    A single stalk, gently curved. Nodes mark the joints. Leaves fall asymmetrically. Sage-coloured — present but unimposing.
                  </p>
                </div>
                <p className="font-serif text-xs text-[#3a3a3a]/25 italic">take — 竹</p>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.15}>
              <div
                className="p-8 md:p-12 flex flex-col items-start gap-8"
                style={{ borderLeft: "1px solid #d4cdc530" }}
              >
                <StoneTextureSVG className="w-32 h-24 opacity-65" />
                <div>
                  <h3 className="font-serif font-light text-[#3a3a3a] text-lg mb-3">Stone</h3>
                  <p className="font-serif font-light text-[#8a8278] text-sm leading-[1.95]">
                    An irregular silhouette, moss patches, hairline fractures. The stone does not apologize for its asymmetry — it simply is.
                  </p>
                </div>
                <p className="font-serif text-xs text-[#3a3a3a]/25 italic">ishi — 石</p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* Ink divider */}
      <div className="px-8 md:px-16 py-3">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ===================================================================
          10. KINTSUGI QUOTE
      ==================================================================== */}
      <section className="py-32 md:py-48 px-8 md:px-16 bg-[#f7f3ec]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="md:ml-24 max-w-2xl">
              <div className="h-[1px] bg-[#d4cdc5]/60 w-16 mb-14" />

              <blockquote
                className="font-serif font-light text-[#3a3a3a]/60 leading-[1.95] italic"
                style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)" }}
              >
                &ldquo;In Japan, broken objects are often repaired with gold. The breakage and repair are part of the history of the object, rather than something to be concealed. The cracks are gilded — and the vessel is more beautiful for having been broken.&rdquo;
              </blockquote>

              <div className="flex items-center gap-4 mt-12">
                <div className="h-[1px] bg-[#d4cdc5]/60 w-8" />
                <p className="font-serif text-xs text-[#3a3a3a]/30 tracking-[0.25em]">
                  Kintsugi &mdash; 金継ぎ
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Ink divider */}
      <div className="px-8 md:px-16 py-3">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ===================================================================
          11. MA (間) — SPACE
      ==================================================================== */}
      <section className="py-32 md:py-48 px-8 md:px-16 bg-[#f2ede4]">
        <div className="max-w-5xl mx-auto">

          <RevealBlock className="mb-24">
            <SectionLabel>Ma</SectionLabel>
            <h2
              className="font-serif font-light text-[#3a3a3a] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.01em" }}
            >
              The space between
            </h2>
            <p className="font-serif font-light text-[#8a8278] mt-5 leading-loose max-w-md text-sm">
              Ma (間) — the pause, the interval, the emptiness that gives form its meaning and weight.
            </p>
          </RevealBlock>

          {/* Three panels — different proportions, deliberate asymmetry */}
          <div className="flex flex-col md:flex-row gap-0">
            <RevealBlock delay={0.05} className="flex-shrink-0 md:w-20">
              <div className="h-48 md:h-auto md:min-h-[420px] bg-[#3a3a3a]/03 flex items-end justify-center pb-10">
                <p
                  className="font-serif font-light text-[#3a3a3a]/18 text-xs tracking-[0.4em]"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  emptiness
                </p>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.10} className="flex-1">
              <div className="p-10 md:p-16 bg-[#f7f3ec] border-x border-[#d4cdc5]/30 md:min-h-[420px] flex flex-col justify-between">
                <div>
                  <p className="font-serif font-light text-[#3a3a3a]/28 text-xs tracking-[0.3em] uppercase mb-10">
                    Center presence
                  </p>
                  <p className="font-serif font-light text-[#3a3a3a] text-xl leading-[1.95] max-w-sm">
                    A room needs walls to hold the silence. A page needs margins to hold the words. The empty space is not nothing — it is the container of everything.
                  </p>
                </div>
                <div className="flex justify-end mt-10">
                  <WaterRippleSVG className="w-20 h-20 opacity-25" />
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.15} className="flex-shrink-0 md:w-16">
              <div className="h-24 md:h-auto md:min-h-[420px] bg-[#3a3a3a]/02 flex items-center justify-center">
                <p
                  className="font-serif font-light text-[#3a3a3a]/15 text-xs tracking-[0.35em]"
                  style={{ writingMode: "vertical-rl" }}
                >
                  間
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===================================================================
          FOOTER
      ==================================================================== */}
      <footer className="py-32 md:py-48 px-8 md:px-16 bg-[#f7f3ec]">
        <div className="max-w-5xl mx-auto">

          {/* Thin horizontal line above footer content */}
          <div className="h-[1px] bg-[#d4cdc5]/40 w-full mb-20" />

          {/* Footer brand — centered, tracking-[0.3em] */}
          <div className="text-center mb-20">
            <p className="font-serif font-light text-[#3a3a3a]/50 tracking-[0.3em] text-sm mb-6">
              侘寂 &nbsp;// &nbsp;Wabi-Sabi &nbsp;// &nbsp;StyleKit
            </p>
            <p className="font-serif font-light text-[#3a3a3a]/25 text-xs tracking-[0.25em] uppercase">
              nothing lasts &nbsp;&middot;&nbsp; nothing is finished &nbsp;&middot;&nbsp; nothing is perfect
            </p>
          </div>

          {/* Nav links — very minimal */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <nav className="flex items-center gap-8">
              <Link
                href="/styles"
                className="font-serif font-light text-xs text-[#3a3a3a] tracking-[0.2em] uppercase opacity-30 hover:opacity-65 transition-opacity duration-1000 ease-in-out"
              >
                All Styles
              </Link>
              <Link
                href="/styles/wabi-sabi"
                className="font-serif font-light text-xs text-[#3a3a3a] tracking-[0.2em] uppercase opacity-30 hover:opacity-65 transition-opacity duration-1000 ease-in-out"
              >
                Docs
              </Link>
              <Link
                href="/"
                className="font-serif font-light text-xs text-[#3a3a3a] tracking-[0.2em] uppercase opacity-30 hover:opacity-65 transition-opacity duration-1000 ease-in-out"
              >
                Home
              </Link>
            </nav>

            {/* Color palette dots */}
            <div className="flex items-center gap-3">
              {colorSwatches.map((s) => (
                <div
                  key={s.hex}
                  className="rounded-full"
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: s.hex,
                    border: s.border ? "1px solid #3a3a3a18" : "none",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bottom line */}
          <div className="mt-16 pt-8 border-t border-[#d4cdc5]/25">
            <p className="font-serif font-light text-[#3a3a3a]/18 text-xs tracking-[0.3em] uppercase text-center">
              一期一会 &nbsp;&middot;&nbsp; ichi-go ichi-e &nbsp;&middot;&nbsp; one time, one meeting
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
