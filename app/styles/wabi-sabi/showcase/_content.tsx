"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks — ZERO @/components/showcase imports                  */
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
/*  Inline SVG motifs — wabi-sabi natural forms                        */
/* ------------------------------------------------------------------ */

function EnsoSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        d="M 50 10 A 40 40 0 1 1 20 75"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function WaterRippleSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
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
    </svg>
  );
}

function InkBrushLine({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 8"
      fill="none"
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
      aria-hidden="true"
    >
      <circle cx="62" cy="60" r="38" fill="#b5a78c" opacity="0.10" />
      <circle cx="62" cy="60" r="38" stroke="#3a3a3a" strokeWidth="0.7" opacity="0.13" />
      <ellipse cx="78" cy="56" rx="32" ry="36" fill="#f7f3ec" opacity="0.90" />
      <circle cx="62" cy="60" r="50" stroke="#3a3a3a" strokeWidth="0.4" opacity="0.06" />
    </svg>
  );
}

function StoneTextureSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 120"
      fill="none"
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
      <path d="M60 40 C65 55, 70 68, 68 85" stroke="#8b6f4e" strokeWidth="0.6" opacity="0.15" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
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
/*  Data                                                               */
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

const journalEntries = [
  {
    time: "06:14",
    tea: "Gyokuro",
    note: "First light came slowly through the paper screen. The tea was cold before I finished reading.",
    accent: "#8a9a7b",
  },
  {
    time: "09:32",
    tea: "Hojicha",
    note: "Rain on the window. I noticed a crack in the ceramic bowl I have used for three years. I will keep it.",
    accent: "#b5a78c",
  },
  {
    time: "14:17",
    tea: "Sencha",
    note: "The garden stone has a new patch of lichen. Time is doing its slow work.",
    accent: "#8b6f4e",
  },
];

const teaCabinet = [
  { name: "Gyokuro", remaining: 85, color: "#8a9a7b" },
  { name: "Hojicha", remaining: 40, color: "#b5a78c" },
  { name: "Sencha", remaining: 60, color: "#8b6f4e" },
  { name: "Matcha", remaining: 20, color: "#3a3a3a" },
];

const poems = [
  {
    label: "Stone",
    poet: "Basho",
    lines: ["An old silent pond", "A frog jumps into the pond", "Splash! Silence again."],
    year: "1686",
  },
  {
    label: "Rain",
    poet: "Buson",
    lines: ["In the spring rain", "the small river", "grows muddy and swift."],
    year: "c. 1760",
  },
  {
    label: "Silence",
    poet: "Issa",
    lines: ["This world of dew", "is only a world of dew —", "and yet... and yet..."],
    year: "c. 1820",
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
  "No translate, scale, or spring animations",
  "No drop shadows or glows — hierarchy lives in whitespace alone",
  "No bold or heavy typography weights — lightness is the message",
  "No perfectly symmetric layouts — symmetry is a human imposition",
];

const wabiBreathCSS = `
  @keyframes wabiBreath {
    0%   { opacity: 0.7; }
    50%  { opacity: 1; }
    100% { opacity: 0.7; }
  }
  .wabi-breath {
    animation: wabiBreath 8000ms ease-in-out infinite;
  }
  @keyframes wabiDust {
    0%   { background-color: #f7f3ec; }
    50%  { background-color: #ebe6dd; }
    100% { background-color: #f7f3ec; }
  }
  .wabi-dust-once {
    animation: wabiDust 2000ms ease-in-out 1 forwards;
  }
`;

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"button" | "card" | "input">("button");
  const [activePrinciple, setActivePrinciple] = useState<number | null>(null);
  const [activePoem, setActivePoem] = useState(0);

  // Animation rule demo states
  const [stillnessHovered, setStillnessHovered] = useState(false);
  const [shadowHovered, setShadowHovered] = useState(false);
  const [dustKey, setDustKey] = useState(0);
  const [dustActive, setDustActive] = useState(false);
  const [inkOpacityHovered, setInkOpacityHovered] = useState(false);

  // Ma demo
  const [maExpanded, setMaExpanded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  function triggerDust() {
    setDustActive(false);
    // Force re-mount of animation by cycling key
    setDustKey((k) => k + 1);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setDustActive(true);
      });
    });
  }

  return (
    <div className="min-h-screen bg-[#f7f3ec] text-[#3a3a3a] font-serif overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: wabiBreathCSS }} />

      {/* ================================================================ */}
      {/* 1. FIXED NAVIGATION                                              */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f7f3ec]/95 backdrop-blur-sm border-b border-[#d4cdc5]/30">
        <div className="max-w-6xl mx-auto px-8 md:px-16">
          <div className="flex items-center justify-between h-14 md:h-16">

            <Link
              href="/styles/wabi-sabi"
              data-back-navigation="true"
              className="font-serif text-xs text-[#3a3a3a]/40 tracking-[0.2em] transition-opacity duration-1000 hover:opacity-100 opacity-60 flex items-center gap-2"
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
                <path d="M10 12L6 8l4-4" />
              </svg>
              StyleKit
            </Link>

            <div className="flex items-center gap-3">
              <EnsoSVG className="w-7 h-7 text-[#3a3a3a]" />
              <span className="font-serif font-light text-sm text-[#3a3a3a]/50 tracking-[0.3em]">
                侘寂
              </span>
            </div>

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

      {/* ================================================================ */}
      {/* 2. HERO                                                          */}
      {/* ================================================================ */}
      <section className="relative pt-52 pb-52 md:pt-64 md:pb-64 px-8 md:px-16 overflow-hidden flex items-center justify-center min-h-screen">

        <div className="absolute right-[5%] top-[8%] pointer-events-none wabi-breath">
          <BambooSVG className="w-14 h-56 md:w-18 md:h-72" />
        </div>

        <div className="absolute left-[2%] top-[20%] pointer-events-none opacity-30">
          <WaterRippleSVG className="w-52 h-52 md:w-72 md:h-72" />
        </div>

        <div className="absolute right-[15%] bottom-[10%] pointer-events-none opacity-80">
          <MoonSVG className="w-36 h-36 md:w-52 md:h-52" />
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <p
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1200ms ease-in-out 0ms",
            }}
            className="text-xs font-serif tracking-[0.5em] text-[#8a9a7b] uppercase mb-10"
          >
            侘寂 &nbsp;&middot;&nbsp; Wabi-Sabi
          </p>

          <h1
            className="font-serif font-light text-[#3a3a3a]/80 leading-none mb-8"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 7rem)",
              letterSpacing: "-0.02em",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1400ms ease-in-out 200ms, transform 1400ms ease-in-out 200ms",
            }}
          >
            The beauty of<br />imperfection
          </h1>

          <p
            className="font-serif font-light italic text-[#8a8278] leading-loose mb-16 mx-auto max-w-md"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 1400ms ease-in-out 500ms, transform 1400ms ease-in-out 500ms",
            }}
          >
            Nothing lasts, nothing is finished, and nothing is perfect —
            this is the beginning of beauty, not its end.
          </p>

          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 1600ms ease-in-out 800ms",
            }}
          >
            <div className="w-16 h-[1px] bg-[#d4cdc5]/50 mx-auto mb-10" />
            <button className="px-8 py-3 bg-transparent text-[#3a3a3a] font-serif text-sm tracking-[0.2em] border-b border-[#d4cdc5]/50 hover:border-[#3a3a3a] hover:bg-[#3a3a3a]/5 active:bg-[#3a3a3a]/10 transition-all duration-1000 ease-in-out">
              Enter Silence
            </button>
          </div>

          {/* Three wabi concepts */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1400ms ease-in-out 1100ms, transform 1400ms ease-in-out 1100ms",
            }}
            className="grid grid-cols-3 gap-8 mt-24 text-left"
          >
            {[
              { label: "Wabi", kanji: "侘", meaning: "Rustic simplicity. The beauty found in humble imperfection." },
              { label: "Sabi", kanji: "寂", meaning: "The melancholy of transience. Time leaves its mark, and that mark is beautiful." },
              { label: "Ma", kanji: "間", meaning: "Negative space. The pause between notes is as important as the notes themselves." },
            ].map((concept) => (
              <div key={concept.label}>
                <div className="font-serif font-light text-[#3a3a3a]/15 text-4xl leading-none mb-2">
                  {concept.kanji}
                </div>
                <div className="text-[10px] tracking-[0.25em] text-[#b5a78c] uppercase mb-2">
                  {concept.label}
                </div>
                <p className="font-serif font-light text-[#8a8278] text-xs leading-[1.9]">
                  {concept.meaning}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="px-8 md:px-16 py-3">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ================================================================ */}
      {/* 3. PHILOSOPHY / PRINCIPLES                                       */}
      {/* ================================================================ */}
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

                    <div className="flex-1">
                      <h3
                        className="font-serif font-light text-[#3a3a3a] text-xl mb-4 leading-tight transition-opacity duration-1000 ease-in-out group-hover:opacity-100"
                        style={{ opacity: activePrinciple === i ? 1 : 0.6 }}
                      >
                        {principle.meaning}
                      </h3>
                      <p
                        className="font-serif font-light text-sm leading-[1.95]"
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

      <div className="px-8 md:px-16 py-3">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ================================================================ */}
      {/* 4. SPECIMEN CARDS                                               */}
      {/* ================================================================ */}
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

      <div className="px-8 md:px-16 py-3">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ================================================================ */}
      {/* 5. COMPONENT DEMO                                               */}
      {/* ================================================================ */}
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

          <RevealBlock delay={0.12}>
            <div className="min-h-[340px] bg-[#f7f3ec] border-l border-[#d4cdc5]/30 p-10 md:p-14">

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
                    Left border only — 1500ms transition on background. Text opacity fades from /70 to full on hover.
                  </p>
                </div>
              )}

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

      <div className="px-8 md:px-16 py-3">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ================================================================ */}
      {/* 6. ANIMATION & INTERACTION RULES — all 4 named aiRules demos    */}
      {/* ================================================================ */}
      <section className="py-32 md:py-48 px-8 md:px-16 bg-[#f7f3ec]">
        <div className="max-w-5xl mx-auto">

          <RevealBlock className="mb-24">
            <SectionLabel>Interactions</SectionLabel>
            <h2
              className="font-serif font-light text-[#3a3a3a] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.01em" }}
            >
              Animation &amp; Interaction Rules
            </h2>
            <p className="font-serif font-light text-[#8a8278] mt-5 leading-loose max-w-md text-sm">
              Four named rules govern every interaction in this system.
              Hover or click each demo to feel the principle in practice.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-0">

            {/* Rule 01 — Absolute Stillness */}
            <RevealBlock delay={0.06}>
              <div className="p-10 md:p-14 border-b border-r border-[#d4cdc5]/30">
                <div className="mb-6">
                  <span className="text-[10px] font-serif tracking-[0.35em] text-[#8a9a7b] uppercase">Rule 01</span>
                  <h3 className="font-serif font-light text-[#3a3a3a] text-xl mt-2 mb-4">Absolute Stillness</h3>
                  <p className="font-serif font-light text-[#8a8278] text-sm leading-[1.95] mb-6">
                    侘寂的核心是静谧。绝对禁止使用任何 translate（位移）、scale（缩放）或弹簧动画。
                    元素必须像石头一样静静待在原处。
                  </p>
                  <p className="text-xs font-serif text-[#3a3a3a]/30 italic leading-loose">
                    <span className="font-mono not-italic">transform: none</span> — no hover translate, no scale, no spring easing.
                    The element sits like a stone in a garden, immovable.
                  </p>
                </div>

                {/* Interactive demo */}
                <div className="mt-8 flex flex-col gap-4">
                  <span className="text-[10px] font-serif tracking-[0.3em] text-[#b5a78c] uppercase">Live demo</span>
                  <button
                    className="self-start px-8 py-3 bg-transparent text-[#3a3a3a] font-serif text-sm tracking-[0.2em] border-b border-[#d4cdc5]/50 hover:border-[#3a3a3a] hover:bg-[#3a3a3a]/5 transition-all duration-1000 ease-in-out"
                    onMouseEnter={() => setStillnessHovered(true)}
                    onMouseLeave={() => setStillnessHovered(false)}
                  >
                    Stone-still
                  </button>
                  <p
                    className="text-xs font-serif italic transition-opacity duration-1000 ease-in-out"
                    style={{ color: "#b5a78c", opacity: stillnessHovered ? 1 : 0.4 }}
                  >
                    {stillnessHovered
                      ? "No movement. Like a stone in a garden."
                      : "Hover — the button does not move."}
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Rule 02 — Shadowless Void */}
            <RevealBlock delay={0.1}>
              <div className="p-10 md:p-14 border-b border-[#d4cdc5]/30">
                <div className="mb-6">
                  <span className="text-[10px] font-serif tracking-[0.35em] text-[#8a9a7b] uppercase">Rule 02</span>
                  <h3 className="font-serif font-light text-[#3a3a3a] text-xl mt-2 mb-4">Shadowless Void</h3>
                  <p className="font-serif font-light text-[#8a8278] text-sm leading-[1.95] mb-6">
                    放弃所有营造现代立体感的 box-shadow。界面的层次仅通过大量留白和非常微弱的边框线来表达。
                  </p>
                  <p className="text-xs font-serif text-[#3a3a3a]/30 italic leading-loose">
                    <span className="font-mono not-italic">box-shadow: none</span> — depth is expressed only through whitespace and ultra-thin borders.
                    No modern 3D illusion.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  <span className="text-[10px] font-serif tracking-[0.3em] text-[#b5a78c] uppercase">Live demo</span>
                  <div
                    className="p-8 bg-[#f2ede4] border-l border-[#d4cdc5]/30 cursor-default transition-all duration-1000 ease-in-out"
                    style={{
                      borderColor: shadowHovered ? "rgba(138, 154, 123, 0.4)" : "rgba(212, 205, 197, 0.3)",
                      backgroundColor: shadowHovered ? "#ebe6dc" : "#f2ede4",
                    }}
                    onMouseEnter={() => setShadowHovered(true)}
                    onMouseLeave={() => setShadowHovered(false)}
                  >
                    <p className="font-serif font-light text-sm text-[#3a3a3a] transition-opacity duration-1000 ease-in-out"
                      style={{ opacity: shadowHovered ? 0.7 : 0.35 }}>
                      Hover this card.
                    </p>
                  </div>
                  <p
                    className="text-xs font-serif italic transition-opacity duration-1000 ease-in-out"
                    style={{ color: "#b5a78c", opacity: shadowHovered ? 1 : 0.4 }}
                  >
                    {shadowHovered
                      ? "Only a border darkens. No shadow appears. Depth through space."
                      : "The border will deepen — no shadow will emerge."}
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Rule 03 — Dust Breathing */}
            <RevealBlock delay={0.14}>
              <div className="p-10 md:p-14 border-r border-[#d4cdc5]/30">
                <div className="mb-6">
                  <span className="text-[10px] font-serif tracking-[0.35em] text-[#8a9a7b] uppercase">Rule 03</span>
                  <h3 className="font-serif font-light text-[#3a3a3a] text-xl mt-2 mb-4">Dust Breathing</h3>
                  <p className="font-serif font-light text-[#8a8278] text-sm leading-[1.95] mb-6">
                    所有交互必须极其极其缓慢。强制使用 duration-1000 甚至更长的过渡时间（如 duration-[1500ms]），
                    配合 ease-in-out。让背景颜色的加深看起来像自然光线缓慢变暗。
                  </p>
                  <p className="text-xs font-serif text-[#3a3a3a]/30 italic leading-loose">
                    <span className="font-mono not-italic">transition-duration: 1000ms–1500ms</span> — interactions unfold
                    like dusk settling, not a light switch flipping.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  <span className="text-[10px] font-serif tracking-[0.3em] text-[#b5a78c] uppercase">Live demo — click to breathe</span>
                  <button
                    className="self-start px-8 py-3 bg-transparent text-[#3a3a3a] font-serif text-sm tracking-[0.2em] border-b border-[#d4cdc5]/50 hover:border-[#3a3a3a] hover:bg-[#3a3a3a]/5 transition-all duration-1000 ease-in-out"
                    onClick={triggerDust}
                  >
                    Breathe
                  </button>
                  <div
                    key={dustKey}
                    className={dustActive ? "wabi-dust-once" : ""}
                    style={{
                      height: "56px",
                      backgroundColor: "#f7f3ec",
                      border: "1px solid rgba(212, 205, 197, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="font-serif font-light text-xs tracking-[0.15em] text-[#b5a78c]">
                      {dustActive ? "Darkening over 2 seconds — like light fading..." : "Waiting..."}
                    </span>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Rule 04 — Ink Fading */}
            <RevealBlock delay={0.18}>
              <div className="p-10 md:p-14">
                <div className="mb-6">
                  <span className="text-[10px] font-serif tracking-[0.35em] text-[#8a9a7b] uppercase">Rule 04</span>
                  <h3 className="font-serif font-light text-[#3a3a3a] text-xl mt-2 mb-4">Ink Fading</h3>
                  <p className="font-serif font-light text-[#8a8278] text-sm leading-[1.95] mb-6">
                    悬停（Hover）时，文本的颜色不要发生突变，而是通过改变透明度（如从 opacity-60 缓慢过渡到 opacity-100），
                    模拟墨迹在时间中的显现。
                  </p>
                  <p className="text-xs font-serif text-[#3a3a3a]/30 italic leading-loose">
                    <span className="font-mono not-italic">opacity: 0.4 &rarr; 1.0</span> over 1200ms — text appears like ink
                    emerging from the page, not appearing suddenly.
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  <span className="text-[10px] font-serif tracking-[0.3em] text-[#b5a78c] uppercase">Live demo</span>
                  <div
                    className="cursor-default"
                    onMouseEnter={() => setInkOpacityHovered(true)}
                    onMouseLeave={() => setInkOpacityHovered(false)}
                  >
                    <p
                      className="font-serif font-light italic text-[#3a3a3a] text-base leading-[2.2] transition-opacity ease-in-out"
                      style={{
                        opacity: inkOpacityHovered ? 1 : 0.25,
                        transitionDuration: "1200ms",
                      }}
                    >
                      &ldquo;In the tea ceremony, every gesture is deliberate.
                      Nothing is rushed. The bowl is held with both hands.&rdquo;
                    </p>
                  </div>
                  <p
                    className="text-xs font-serif italic transition-opacity duration-1000 ease-in-out"
                    style={{ color: "#b5a78c", opacity: inkOpacityHovered ? 1 : 0.4 }}
                  >
                    {inkOpacityHovered
                      ? "Ink fully revealed — opacity 100%."
                      : "Hover the text — watch it emerge from opacity 25%."}
                  </p>
                </div>
              </div>
            </RevealBlock>

          </div>

          {/* CSS reference block */}
          <RevealBlock delay={0.22} className="mt-10">
            <div className="bg-[#f2ede4] border-l-2 border-[#8a9a7b]/30 p-8 md:p-10">
              <p className="text-[10px] font-serif tracking-[0.3em] text-[#8a9a7b] uppercase mb-5">
                CSS reference
              </p>
              <div className="grid md:grid-cols-2 gap-x-10 gap-y-3 font-mono text-xs text-[#8a8278]">
                <div>transition-duration: 1000ms; /* minimum */</div>
                <div>/* No transform: translate, scale */</div>
                <div>opacity: 0.25 &rarr; 1.0; /* Ink Fading */</div>
                <div>ease-in-out; /* always, never linear */</div>
                <div>box-shadow: none; /* Shadowless Void */</div>
                <div>transition-duration: 1500ms; /* Dust Breathing */</div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      <div className="px-8 md:px-16 py-3">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ================================================================ */}
      {/* 7. APP DEMO — Tea Journal                                       */}
      {/* ================================================================ */}
      <section className="py-32 md:py-48 px-8 md:px-16 bg-[#f2ede4]">
        <div className="max-w-5xl mx-auto">

          <RevealBlock className="mb-24">
            <SectionLabel>App Demo</SectionLabel>
            <h2
              className="font-serif font-light text-[#3a3a3a] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.01em" }}
            >
              A daily tea journal
            </h2>
            <p className="font-serif font-light text-[#8a8278] mt-5 leading-loose max-w-md text-sm">
              A mock application showing the wabi-sabi system in context.
              Slow transitions, paper textures, ink-dark text, generous silence.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-0">
            {/* Main journal */}
            <RevealBlock delay={0.1} className="md:col-span-2">
              <div className="bg-[#f7f3ec] border-l border-[#d4cdc5]/30 p-10 md:p-14 h-full">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <div className="text-[10px] font-serif tracking-[0.3em] text-[#b5a78c] uppercase mb-2">
                      February 21, 2026
                    </div>
                    <h3 className="font-serif font-light text-[#3a3a3a] text-2xl">Morning Pages</h3>
                  </div>
                  <span className="text-[10px] font-serif tracking-[0.2em] text-[#3a3a3a]/25">Entry 47</span>
                </div>

                <div className="space-y-10">
                  {journalEntries.map((entry) => (
                    <div
                      key={entry.time}
                      className="flex gap-8 pb-10 border-b border-[#d4cdc5]/20 last:border-b-0"
                    >
                      <div className="flex-shrink-0 w-14">
                        <span className="font-mono text-xs text-[#b5a78c]">{entry.time}</span>
                      </div>
                      <div>
                        <div
                          className="text-[10px] font-serif tracking-[0.25em] uppercase mb-3"
                          style={{ color: entry.accent }}
                        >
                          {entry.tea}
                        </div>
                        <p className="font-serif font-light italic text-[#5c564f] text-sm leading-[2]">
                          {entry.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10">
                  <input
                    type="text"
                    placeholder="Begin writing..."
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#d4cdc5]/40 text-[#3a3a3a] font-serif font-light italic text-sm placeholder-[#d4cdc5] focus:outline-none focus:border-[#8a9a7b]/60 transition-colors duration-1000 ease-in-out"
                  />
                </div>
              </div>
            </RevealBlock>

            {/* Sidebar */}
            <RevealBlock delay={0.16}>
              <div className="flex flex-col h-full">
                {/* Tea cabinet */}
                <div className="bg-[#f7f3ec] border-l border-[#d4cdc5]/30 p-8 flex-1">
                  <div className="text-[10px] font-serif tracking-[0.25em] text-[#8a8278] uppercase mb-6">Tea Cabinet</div>
                  <div className="space-y-5">
                    {teaCabinet.map((tea) => (
                      <div key={tea.name}>
                        <div className="flex justify-between mb-2">
                          <span className="font-serif font-light text-sm text-[#5c564f]">{tea.name}</span>
                          <span className="font-mono text-xs text-[#b5a78c]">{tea.remaining}g</span>
                        </div>
                        <div className="h-[1px] bg-[#d4cdc5]/30 relative">
                          <div
                            className="absolute top-0 left-0 h-full"
                            style={{ width: `${tea.remaining}%`, backgroundColor: tea.color, opacity: 0.5 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div className="bg-[#f7f3ec] border-l border-t border-[#d4cdc5]/30 p-8">
                  <div className="text-[10px] font-serif tracking-[0.25em] text-[#8a8278] uppercase mb-4">Reflection</div>
                  <p className="font-serif font-light italic text-[#5c564f] text-xs leading-[2]">
                    &ldquo;The tea ceremony exists in the present moment only.
                    It cannot be preserved or replicated.&rdquo;
                  </p>
                </div>

                {/* Streak */}
                <div className="bg-[#f7f3ec] border-l border-t border-[#d4cdc5]/30 p-8">
                  <div className="text-[10px] font-serif tracking-[0.25em] text-[#8a8278] uppercase mb-3">Quiet Streak</div>
                  <div className="font-serif font-light text-[#3a3a3a] leading-none mb-1" style={{ fontSize: "3rem" }}>23</div>
                  <div className="text-[10px] font-serif tracking-[0.15em] text-[#b5a78c]">mornings in stillness</div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      <div className="px-8 md:px-16 py-3">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ================================================================ */}
      {/* 8. HAIKU SECTION — Ma / Poetry                                  */}
      {/* ================================================================ */}
      <section className="py-32 md:py-48 px-8 md:px-16 bg-[#f7f3ec]">
        <div className="max-w-5xl mx-auto">

          <RevealBlock className="mb-24">
            <SectionLabel>Ma — 間</SectionLabel>
            <h2
              className="font-serif font-light text-[#3a3a3a] leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: "-0.01em" }}
            >
              Negative space as design
            </h2>
            <p className="font-serif font-light text-[#8a8278] mt-5 leading-loose max-w-md text-sm">
              Ma (間) — the pause, the interval, the emptiness that gives form its meaning.
              Select a poem and notice how space frames the words.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="flex">
              {/* Poem selector */}
              <div className="flex flex-col border-r border-[#d4cdc5]/30" style={{ minWidth: "160px" }}>
                {poems.map((poem, i) => (
                  <button
                    key={poem.label}
                    onClick={() => setActivePoem(i)}
                    className="text-left py-6 px-6 border-b border-[#d4cdc5]/20 last:border-b-0 transition-all duration-1000 ease-in-out"
                    style={{ backgroundColor: activePoem === i ? "#f2ede4" : "transparent" }}
                  >
                    <div
                      className="font-serif text-sm transition-opacity duration-1000 ease-in-out mb-1"
                      style={{ opacity: activePoem === i ? 1 : 0.4, color: "#3a3a3a" }}
                    >
                      {poem.label}
                    </div>
                    <div className="text-[10px] font-serif tracking-[0.15em] text-[#b5a78c]">
                      {poem.poet}
                    </div>
                  </button>
                ))}
              </div>

              {/* Poem content — vast empty space */}
              <div className="flex-1 flex items-center py-16 px-16 bg-[#f7f3ec]" style={{ minHeight: "280px" }}>
                <div>
                  <p className="font-serif font-light italic text-[#3a3a3a] leading-[2.8]" style={{ fontSize: "1.15rem" }}>
                    {poems[activePoem].lines.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < poems[activePoem].lines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                  <div className="mt-8 text-[10px] font-serif tracking-[0.25em] text-[#b5a78c] uppercase">
                    {poems[activePoem].poet}, {poems[activePoem].year}
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Ma toggle demo */}
          <RevealBlock delay={0.18} className="mt-16">
            <div className="border border-[#d4cdc5]/30 p-10 md:p-14">
              <div className="text-[10px] font-serif tracking-[0.3em] text-[#8a8278] uppercase mb-4">
                Negative space demonstration
              </div>
              <p className="font-serif font-light text-[#8a8278] text-sm leading-loose mb-8 max-w-md">
                Toggle below to see how reducing content reveals meaning through space.
                The empty areas are not wasted — they are active.
              </p>
              <button
                onClick={() => setMaExpanded(!maExpanded)}
                className="px-8 py-3 bg-transparent text-[#3a3a3a] font-serif text-xs tracking-[0.2em] uppercase border-b border-[#d4cdc5]/50 hover:border-[#3a3a3a] hover:bg-[#3a3a3a]/5 transition-all duration-1000 ease-in-out mb-10"
              >
                {maExpanded ? "Compress" : "Expand"}
              </button>
              <div
                className="grid grid-cols-3 transition-all duration-[1500ms] ease-in-out"
                style={{ gap: maExpanded ? "3rem" : "1rem" }}
              >
                {[
                  { label: "Stone", kanji: "岩" },
                  { label: "Water", kanji: "水" },
                  { label: "Silence", kanji: "静" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border border-[#d4cdc5]/30 text-center transition-all duration-[1500ms] ease-in-out"
                    style={{ padding: maExpanded ? "2rem" : "1rem" }}
                  >
                    <div className="font-serif font-light text-[#3a3a3a]/15 text-3xl mb-2">{item.kanji}</div>
                    <div className="text-[10px] font-serif tracking-[0.2em] text-[#b5a78c] uppercase">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      <div className="px-8 md:px-16 py-3">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ================================================================ */}
      {/* 9. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section className="py-32 md:py-48 px-8 md:px-16 bg-[#f2ede4]">
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

          <div className="flex flex-col">
            {colorSwatches.map((swatch, i) => (
              <RevealBlock key={swatch.name} delay={i * 0.08}>
                <div
                  className="flex items-center gap-10 py-10 border-b border-[#d4cdc5]/30 last:border-b-0"
                  style={{ paddingLeft: `${[0, 40, 16, 56, 8][i]}px` }}
                >
                  <div
                    className="flex-shrink-0 h-[2px] w-20"
                    style={{
                      backgroundColor: swatch.hex,
                      outline: swatch.border ? `1px solid #3a3a3a15` : "none",
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-baseline md:gap-5">
                      <p className="font-serif font-light text-[#3a3a3a] text-base">{swatch.name}</p>
                      <p className="font-serif text-xs text-[#3a3a3a]/35 tracking-[0.2em]">{swatch.label}</p>
                    </div>
                    <p className="font-serif text-xs text-[#3a3a3a]/25 mt-1 tracking-[0.1em]">{swatch.note}</p>
                  </div>
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

      <div className="px-8 md:px-16 py-3">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ================================================================ */}
      {/* 10. DESIGN RULES — Do / Don't                                   */}
      {/* ================================================================ */}
      <section className="py-32 md:py-48 px-8 md:px-16 bg-[#f7f3ec]">
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
            <RevealBlock delay={0.06}>
              <div>
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-5 h-[1px] bg-[#8a9a7b]" />
                  <h3 className="font-serif font-light text-[#8a9a7b] text-sm tracking-[0.3em] uppercase">Embrace</h3>
                </div>
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

            <RevealBlock delay={0.12}>
              <div style={{ marginTop: "24px" }}>
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-5 h-[1px] bg-[#8b6f4e]" />
                  <h3 className="font-serif font-light text-[#8b6f4e] text-sm tracking-[0.3em] uppercase">Release</h3>
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

      <div className="px-8 md:px-16 py-3">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ================================================================ */}
      {/* 11. NATURAL MOTIFS                                              */}
      {/* ================================================================ */}
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
                    A single stalk, gently curved. Nodes mark the joints. Sage-coloured — present but unimposing.
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

      <div className="px-8 md:px-16 py-3">
        <InkDivider className="max-w-5xl mx-auto" />
      </div>

      {/* ================================================================ */}
      {/* 12. KINTSUGI QUOTE                                              */}
      {/* ================================================================ */}
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

      {/* ================================================================ */}
      {/* FOOTER                                                           */}
      {/* ================================================================ */}
      <footer className="py-32 md:py-48 px-8 md:px-16 bg-[#f7f3ec]">
        <div className="max-w-5xl mx-auto">

          <div className="h-[1px] bg-[#d4cdc5]/40 w-full mb-20" />

          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <EnsoSVG className="w-8 h-8 text-[#3a3a3a]" />
            </div>
            <p className="font-serif font-light text-[#3a3a3a]/50 tracking-[0.3em] text-sm mb-6">
              侘寂 &nbsp;// &nbsp;Wabi-Sabi &nbsp;// &nbsp;StyleKit
            </p>
            <p className="font-serif font-light text-[#3a3a3a]/25 text-xs tracking-[0.25em] uppercase">
              nothing lasts &nbsp;&middot;&nbsp; nothing is finished &nbsp;&middot;&nbsp; nothing is perfect
            </p>
          </div>

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
