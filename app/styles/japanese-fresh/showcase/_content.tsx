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
/*  Botanical SVG accents — inline line drawings, one per section      */
/* ------------------------------------------------------------------ */

function BotanicalBranch({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 200"
      fill="none"
      stroke="#a0aec0"
      strokeWidth="0.8"
      aria-hidden="true"
    >
      <path d="M50 200 C50 160, 55 120, 58 80 C60 60, 55 40, 58 20" />
      <path d="M58 80 C70 75, 80 65, 85 58 C78 68, 68 76, 58 80" />
      <path d="M56 50 C44 42, 36 32, 30 24 C38 34, 46 44, 56 50" />
      <path d="M57 95 C68 92, 78 84, 82 78" />
      <path d="M55 110 C42 106, 32 96, 26 88" />
    </svg>
  );
}

function BotanicalWillow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 200"
      fill="none"
      stroke="#a0aec0"
      strokeWidth="0.7"
      aria-hidden="true"
    >
      <path d="M50 0 C50 40, 50 80, 50 140" />
      <path d="M50 30 C62 50, 72 80, 68 120" />
      <path d="M50 30 C38 50, 28 80, 32 120" />
      <path d="M50 60 C66 80, 78 110, 76 148" />
      <path d="M50 60 C34 80, 22 110, 24 148" />
      <path d="M50 90 C60 108, 65 132, 62 160" />
      <path d="M50 90 C40 108, 35 132, 38 160" />
    </svg>
  );
}

function BotanicalLeaf({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 120"
      fill="none"
      stroke="#a0aec0"
      strokeWidth="0.7"
      aria-hidden="true"
    >
      <path d="M40 115 C40 85, 30 55, 18 32 C28 18, 52 18, 62 32 C72 46, 65 78, 40 115 Z" />
      <path d="M40 115 C40 85, 40 55, 40 32" />
      <path d="M28 60 C33 54, 40 52, 47 55" />
      <path d="M22 44 C28 39, 35 37, 42 40" />
    </svg>
  );
}

function BotanicalReed({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 200"
      fill="none"
      stroke="#a0aec0"
      strokeWidth="0.7"
      aria-hidden="true"
    >
      <path d="M30 200 C32 160, 34 120, 36 80 C38 50, 36 25, 34 5" />
      <path d="M50 200 C48 155, 46 115, 44 75 C42 45, 44 20, 46 2" />
      <path d="M15 200 C18 170, 22 140, 25 110 C28 85, 26 60, 24 35" />
      <ellipse cx="34" cy="5" rx="5" ry="12" />
      <ellipse cx="46" cy="2" rx="5" ry="12" />
      <ellipse cx="24" cy="35" rx="4" ry="10" />
    </svg>
  );
}

function BotanicalFern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 160"
      fill="none"
      stroke="#a0aec0"
      strokeWidth="0.7"
      aria-hidden="true"
    >
      <path d="M60 155 C60 120, 58 85, 56 50 C54 25, 56 10, 58 2" />
      <path d="M56 50 C42 42, 28 32, 18 20 C32 28, 46 40, 56 50" />
      <path d="M57 32 C70 24, 84 14, 94 4 C80 12, 68 22, 57 32" />
      <path d="M57 72 C42 64, 28 54, 18 42" />
      <path d="M57 90 C72 82, 86 74, 96 62" />
      <path d="M57 110 C42 104, 28 96, 20 84" />
    </svg>
  );
}

function BotanicalCircle({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      stroke="#a0aec0"
      strokeWidth="0.6"
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="50" />
      <path d="M60 10 C60 35, 58 50, 55 60 C52 72, 50 88, 60 110" />
      <path d="M10 60 C35 60, 50 58, 60 55 C72 52, 88 50, 110 60" />
      <path d="M25 25 C38 38, 50 50, 60 60" />
      <path d="M95 25 C82 38, 70 50, 60 60" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const paletteData = [
  { name: "Sky Blue", nameJa: "空色", hex: "#64b5f6", role: "Primary" },
  { name: "Rice White", nameJa: "白米", hex: "#fafaf8", role: "Background", outlined: true },
  { name: "Mint", nameJa: "薄荷", hex: "#98d8c8", role: "Accent" },
  { name: "Gentle Pink", nameJa: "桜色", hex: "#ffb7c5", role: "Accent" },
  { name: "Powder Blue", nameJa: "水色", hex: "#b8d4e3", role: "Accent" },
  { name: "Muted Text", nameJa: "灰青", hex: "#b0b8c4", role: "Secondary" },
  { name: "Warm Border", nameJa: "縁", hex: "#d4d4cf", role: "Hairline", outlined: true },
];

const philosophyCards = [
  {
    kanji: "間",
    label: "Ma",
    desc: "The space between things. Silence between notes. Whitespace between sections. The pause is as important as the word — it gives everything else room to breathe.",
    color: "#64b5f6",
  },
  {
    kanji: "侘",
    label: "Wabi",
    desc: "Beauty in imperfection. A slightly off-center composition. Asymmetric placement. Deliberate restraint over relentless polish. The irregular is what is real.",
    color: "#98d8c8",
  },
  {
    kanji: "寂",
    label: "Sabi",
    desc: "The beauty of time passing. Organic forms over rigid grids. Hairline borders that barely exist. Quiet inevitability. Things worn gently by experience.",
    color: "#ffb7c5",
  },
  {
    kanji: "清",
    label: "Sei",
    desc: "Purity without coldness. The feeling of light through shoji screens. Clean lines that invite the eye to rest rather than to seek. Stillness that is not emptiness.",
    color: "#b8d4e3",
  },
];

const journalEntries = [
  {
    date: "Feb 21",
    dateJa: "二月廿一日",
    title: "Morning light",
    excerpt: "The kind of quiet that only exists before the rest of the world wakes.",
    mood: "#64b5f6",
  },
  {
    date: "Feb 20",
    dateJa: "二月二十日",
    title: "After the rain",
    excerpt: "The city smells of wet concrete and something faintly green.",
    mood: "#98d8c8",
  },
  {
    date: "Feb 19",
    dateJa: "二月十九日",
    title: "Afternoon tea",
    excerpt: "Nothing more meditative than watching steam rise from a ceramic cup.",
    mood: "#b8d4e3",
  },
  {
    date: "Feb 18",
    dateJa: "二月十八日",
    title: "Paper windows",
    excerpt: "Light arrives softened, like a thought you cannot quite name.",
    mood: "#ffb7c5",
  },
];

type ComponentTab = "buttons" | "cards" | "inputs" | "typography";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([false, true, false]);

  // Animation & Interaction rule demo states
  const [floatHovered, setFloatHovered] = useState(false);
  const [airyActive, setAiryActive] = useState(false);
  const [subtleFocused, setSubtleFocused] = useState(false);
  const [tactilePressed, setTactilePressed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  function toggleItem(i: number) {
    setCheckedItems((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-[#fafaf8] text-[#4a5568] overflow-x-hidden">
      <style>{`
        @keyframes jf-sway {
          0%, 100% { transform: rotate(0deg) translateY(0px); }
          33%  { transform: rotate(1.5deg) translateY(-3px); }
          66%  { transform: rotate(-1deg) translateY(2px); }
        }
        @keyframes jf-drift {
          0%, 100% { transform: translateY(0px); }
          50%  { transform: translateY(-6px); }
        }
        @keyframes jf-breathe {
          0%, 100% { opacity: 0.07; }
          50%  { opacity: 0.13; }
        }
        @keyframes jf-petal {
          0%   { transform: translateY(-8px) rotate(0deg); opacity: 0; }
          15%  { opacity: 0.18; }
          85%  { opacity: 0.12; }
          100% { transform: translateY(70px) rotate(200deg); opacity: 0; }
        }
        .jf-sway   { animation: jf-sway 9s ease-in-out infinite; }
        .jf-drift  { animation: jf-drift 6s ease-in-out infinite; }
        .jf-breathe{ animation: jf-breathe 5s ease-in-out infinite; }
        .jf-petal  { animation: jf-petal 10s ease-in-out infinite; }
      `}</style>

      {/* ================================================================ */}
      {/* 1. NAVIGATION                                                    */}
      {/* ================================================================ */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: "rgba(250,250,248,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "0.5px solid rgba(212,212,207,0.4)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10 flex items-center justify-between h-14">
          {/* Logo mark */}
          <div className="flex items-center gap-2.5">
            <svg
              viewBox="0 0 28 48"
              width="14"
              height="24"
              fill="none"
              stroke="#b0b8c4"
              strokeWidth="0.8"
              aria-hidden="true"
            >
              <path d="M14 46 C14 36, 15 24, 16 14 C17 7, 15 2, 16 0" />
              <path d="M16 14 C21 12, 26 8, 28 4 C24 8, 19 12, 16 14" />
              <path d="M15 26 C10 24, 5 19, 2 14 C6 19, 11 24, 15 26" />
            </svg>
            <span className="font-light text-sm text-[#7a8a9e] tracking-[0.12em]">
              日系清新風
            </span>
          </div>

          {/* Nav items */}
          <nav className="hidden md:flex items-center gap-1">
            {["Palette", "Philosophy", "Components", "Animations", "App"].map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 font-light text-xs text-[#b0b8c4] tracking-widest rounded-md cursor-pointer transition-colors duration-500 hover:text-[#64b5f6]"
              >
                {item}
              </span>
            ))}
          </nav>

          {/* Back link */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-1.5 font-light text-xs text-[#7a8a9e] tracking-widest rounded-lg transition-all duration-500 hover:text-[#64b5f6] hover:-translate-y-px"
            style={{ border: "0.5px solid rgba(212,212,207,0.5)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(100,181,246,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,212,207,0.5)";
            }}
          >
            <span>&#8592;</span>
            <span>StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO — Ma (間) full-screen breathing room                     */}
      {/* ================================================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
        {/* Botanical left */}
        <div
          className="jf-sway absolute left-6 md:left-16 bottom-20 w-16 h-36"
          style={{ opacity: 0.1, pointerEvents: "none" }}
        >
          <BotanicalBranch className="w-full h-full" />
        </div>

        {/* Botanical right */}
        <div
          className="jf-drift absolute right-8 md:right-20 top-32 w-10 h-24"
          style={{ opacity: 0.09, pointerEvents: "none", animationDelay: "2s" }}
        >
          <BotanicalLeaf className="w-full h-full" />
        </div>

        {/* Floating petals */}
        {[
          { left: "22%", top: "18%", delay: "0s", size: 28 },
          { left: "60%", top: "14%", delay: "3.5s", size: 20 },
          { left: "78%", top: "38%", delay: "6s", size: 24 },
        ].map((p, i) => (
          <div
            key={i}
            className="jf-petal absolute pointer-events-none hidden md:block"
            style={{ left: p.left, top: p.top, animationDelay: p.delay }}
          >
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 40 40"
              fill="none"
              stroke="#ffb7c5"
              strokeWidth="0.6"
              aria-hidden="true"
            >
              <path d="M20 2 C24 8, 26 14, 20 20 C14 14, 16 8, 20 2 Z" />
              <path d="M38 20 C32 24, 26 26, 20 20 C26 14, 32 16, 38 20 Z" />
              <path d="M20 38 C16 32, 14 26, 20 20 C26 26, 24 32, 20 38 Z" />
              <path d="M2 20 C8 16, 14 14, 20 20 C14 26, 8 24, 2 20 Z" />
            </svg>
          </div>
        ))}

        {/* Linen texture */}
        <div
          className="jf-breathe absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='6' height='6' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='6' height='6' fill='%23fafaf8'/%3E%3Crect x='0' y='0' width='1' height='1' fill='%23e8e8e4' opacity='0.12'/%3E%3Crect x='3' y='3' width='1' height='1' fill='%23e8e8e4' opacity='0.08'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 text-center px-8 max-w-xl">
          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0s",
              marginBottom: "2.5rem",
            }}
          >
            <span className="font-light text-[10px] tracking-[0.4em] text-[#b0b8c4]">
              japanese fresh &nbsp;&middot;&nbsp; 日系清新風
            </span>
          </div>

          {/* Kanji */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.08s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.08s",
              display: "flex",
              justifyContent: "center",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            {[
              { k: "間", c: "#64b5f6" },
              { k: "侘", c: "#98d8c8" },
              { k: "寂", c: "#ffb7c5" },
              { k: "清", c: "#b8d4e3" },
            ].map(({ k, c }, i) => (
              <span
                key={k}
                className="font-extralight text-2xl tracking-wide jf-drift"
                style={{ color: c, opacity: 0.55, animationDelay: `${i * 0.7}s` }}
              >
                {k}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            className="font-extralight text-5xl md:text-6xl text-[#4a5568] tracking-wide leading-tight"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.14s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.14s",
              marginBottom: "1.5rem",
            }}
          >
            the beauty of
            <br />
            <span className="text-[#64b5f6]">empty space</span>
          </h1>

          {/* Hairline */}
          <div
            style={{
              width: "2.5rem",
              height: "0.5px",
              backgroundColor: "#d4d4cf",
              opacity: heroVisible ? 0.5 : 0,
              margin: "0 auto 2rem",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          />

          {/* Sub */}
          <p
            className="font-light text-sm text-[#b0b8c4] tracking-wide leading-loose"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
              marginBottom: "3.5rem",
            }}
          >
            Ma (間) · wabi-sabi · hairline borders · botanical accents
            <br />
            meditative slowness · extreme whitespace
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 justify-center"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <button
              className="px-10 py-3 font-light text-sm text-[#7a8a9e] tracking-widest rounded-lg transition-all duration-500 hover:-translate-y-0.5 hover:text-[#64b5f6] hover:bg-[#64b5f6]/5"
              style={{ border: "0.5px solid rgba(212,212,207,0.5)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(100,181,246,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,212,207,0.5)";
              }}
              onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
              onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              explore
            </button>
            <button
              className="px-10 py-3 font-light text-sm text-white tracking-widest rounded-lg transition-all duration-500 hover:-translate-y-0.5 hover:opacity-90"
              style={{
                backgroundColor: "rgba(100,181,246,0.75)",
                border: "0.5px solid rgba(100,181,246,0.35)",
              }}
              onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.75"; }}
              onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              begin
            </button>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{
            opacity: heroVisible ? 0.35 : 0,
            transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1) 1s",
          }}
        >
          <span className="font-light text-[9px] tracking-[0.45em] text-[#b0b8c4]">scroll</span>
          <div className="w-px h-10" style={{ backgroundColor: "rgba(212,212,207,0.5)" }} />
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section className="py-32 md:py-40 px-6 md:px-10 relative overflow-hidden">
        {/* Botanical accent */}
        <div
          className="jf-drift absolute right-8 md:right-16 top-20 w-12 h-28 pointer-events-none"
          style={{ opacity: 0.09, animationDelay: "1s" }}
        >
          <BotanicalLeaf className="w-full h-full" />
        </div>

        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-14">
            <span className="block font-light text-[10px] tracking-[0.45em] text-[#b0b8c4] mb-5">
              palette / 色
            </span>
            <h2 className="font-extralight text-3xl md:text-4xl text-[#4a5568] tracking-wide mb-4">
              warm neutral palette
            </h2>
            <p className="font-light text-sm text-[#b0b8c4] tracking-wide leading-loose max-w-sm">
              Seven tones anchored in rice white and sky blue. Borders use warm #d4d4cf
              at 30–40% opacity — never harsh. Text stays in muted #b0b8c4 to keep the
              eye at rest.
            </p>
          </RevealBlock>

          {/* Swatches */}
          <RevealBlock delay={0.1} className="mb-16">
            <div className="flex flex-wrap gap-8 md:gap-12">
              {paletteData.map((swatch, i) => (
                <div
                  key={swatch.hex}
                  className="flex flex-col items-center gap-3 cursor-default"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: swatch.hex,
                      border: swatch.outlined ? "0.5px solid rgba(212,212,207,0.6)" : "none",
                      transform: hoveredSwatch === i ? "translateY(-6px)" : "translateY(0)",
                    }}
                  />
                  <div className="text-center">
                    <div className="font-light text-xs text-[#7a8a9e] tracking-wide mb-0.5">
                      {swatch.name}
                    </div>
                    <div className="font-light text-[10px] text-[#b0b8c4] font-mono tracking-wide mb-0.5">
                      {swatch.hex}
                    </div>
                    <div className="font-light text-[9px] text-[#c8d0d8] tracking-widest">
                      {swatch.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Gradient tonal strip */}
          <RevealBlock delay={0.2}>
            <div
              className="h-px mb-6"
              style={{ backgroundColor: "rgba(212,212,207,0.3)" }}
            />
            <p className="font-light text-[9px] tracking-[0.3em] text-[#c8d0d8] mb-5">
              tonal transitions
            </p>
            <div className="flex gap-3 flex-wrap">
              {[
                { from: "#64b5f6", to: "#b8d4e3", label: "sky \u2192 powder" },
                { from: "#98d8c8", to: "#64b5f6", label: "mint \u2192 sky" },
                { from: "#ffb7c5", to: "#b8d4e3", label: "pink \u2192 powder" },
                { from: "#fafaf8", to: "#b8d4e3", label: "rice \u2192 powder" },
              ].map((g) => (
                <div key={g.label} className="flex-1" style={{ minWidth: "120px" }}>
                  <div
                    className="h-8 rounded-md mb-2 transition-all duration-500 hover:-translate-y-0.5"
                    style={{ background: `linear-gradient(135deg, ${g.from}, ${g.to})` }}
                  />
                  <div className="font-light text-[9px] text-[#c8d0d8] tracking-wide">{g.label}</div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. MA PHILOSOPHY — kanji cards                                  */}
      {/* ================================================================ */}
      <section
        className="py-32 md:py-40 px-6 md:px-10 relative overflow-hidden"
        style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
      >
        {/* Botanical accent */}
        <div
          className="jf-sway absolute left-4 md:left-10 top-1/3 w-10 h-24 pointer-events-none"
          style={{ opacity: 0.09 }}
        >
          <BotanicalWillow className="w-full h-full" />
        </div>

        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-14">
            <span className="block font-light text-[10px] tracking-[0.45em] text-[#b0b8c4] mb-5">
              philosophy / 美学
            </span>
            <h2 className="font-extralight text-3xl md:text-4xl text-[#4a5568] tracking-wide mb-4">
              ma &middot; wabi &middot; sabi &middot; sei
            </h2>
            <p className="font-light text-sm text-[#b0b8c4] tracking-wide leading-loose max-w-sm">
              Four ancient aesthetics that shape every decision. Intentional emptiness,
              imperfect beauty, the passage of time, and luminous purity.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {philosophyCards.map((card, i) => (
              <RevealBlock key={card.kanji} delay={i * 0.09}>
                <div
                  className="p-10 md:p-12 bg-white rounded-lg transition-all duration-500 cursor-default h-full"
                  style={{ border: "0.5px solid rgba(212,212,207,0.35)" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-0.5px)";
                    el.style.backgroundColor = `${card.color}04`;
                    el.style.borderColor = `${card.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(0)";
                    el.style.backgroundColor = "white";
                    el.style.borderColor = "rgba(212,212,207,0.35)";
                  }}
                >
                  <div
                    className="font-extralight text-5xl mb-3 leading-none"
                    style={{ color: card.color, opacity: 0.45 }}
                  >
                    {card.kanji}
                  </div>
                  <div
                    className="font-light text-[10px] tracking-[0.25em] mb-5"
                    style={{ color: card.color }}
                  >
                    {card.label}
                  </div>
                  <div
                    className="h-px mb-5"
                    style={{ backgroundColor: "rgba(212,212,207,0.35)" }}
                  />
                  <p className="font-light text-sm text-[#b0b8c4] leading-loose tracking-wide">
                    {card.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. COMPONENT GALLERY                                             */}
      {/* ================================================================ */}
      <section className="py-32 md:py-40 px-6 md:px-10 relative overflow-hidden">
        {/* Botanical accent */}
        <div
          className="jf-drift absolute right-6 md:right-14 bottom-16 w-12 h-32 pointer-events-none"
          style={{ opacity: 0.09, animationDelay: "1.5s" }}
        >
          <BotanicalFern className="w-full h-full" />
        </div>

        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-10">
            <span className="block font-light text-[10px] tracking-[0.45em] text-[#b0b8c4] mb-5">
              components / 部品
            </span>
            <h2 className="font-extralight text-3xl md:text-4xl text-[#4a5568] tracking-wide mb-4">
              quiet building blocks
            </h2>
            <p className="font-light text-sm text-[#b0b8c4] tracking-wide leading-loose max-w-sm">
              Hairline borders only. Font-extralight or font-light throughout.
              No shadows — elements float in their whitespace by their own presence.
            </p>
          </RevealBlock>

          {/* Tab nav */}
          <RevealBlock delay={0.08} className="mb-8">
            <div className="flex gap-2 flex-wrap">
              {(["buttons", "cards", "inputs", "typography"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-5 py-2 font-light text-xs tracking-widest rounded-lg capitalize transition-all duration-500"
                  style={{
                    color: activeTab === tab ? "#64b5f6" : "#b0b8c4",
                    border: activeTab === tab
                      ? "0.5px solid rgba(100,181,246,0.4)"
                      : "0.5px solid rgba(212,212,207,0.4)",
                    backgroundColor: "transparent",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Panel */}
          <RevealBlock delay={0.14}>
            <div
              className="p-8 md:p-12 bg-white rounded-lg"
              style={{ border: "0.5px solid rgba(212,212,207,0.35)" }}
            >
              {/* ---- BUTTONS ---- */}
              {activeTab === "buttons" && (
                <div className="space-y-10">
                  <div>
                    <p className="font-light text-[9px] tracking-[0.35em] text-[#c8d0d8] mb-6">
                      whisper buttons — hairline border, weightless hover
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { label: "explore", color: "#64b5f6" },
                        { label: "discover", color: "#98d8c8" },
                        { label: "reflect", color: "#ffb7c5" },
                        { label: "begin", color: "#b8d4e3" },
                      ].map((btn) => (
                        <button
                          key={btn.label}
                          className="px-8 py-2.5 font-light text-sm text-[#7a8a9e] tracking-widest rounded-lg transition-all duration-500"
                          style={{ border: "0.5px solid rgba(212,212,207,0.5)", backgroundColor: "transparent" }}
                          onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.color = btn.color;
                            el.style.borderColor = `${btn.color}50`;
                            el.style.backgroundColor = `${btn.color}06`;
                            el.style.transform = "translateY(-0.5px)";
                          }}
                          onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.color = "#7a8a9e";
                            el.style.borderColor = "rgba(212,212,207,0.5)";
                            el.style.backgroundColor = "transparent";
                            el.style.transform = "translateY(0)";
                          }}
                          onMouseDown={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.opacity = "0.75";
                            el.style.backgroundColor = `${btn.color}10`;
                          }}
                          onMouseUp={(e) => {
                            const el = e.currentTarget as HTMLElement;
                            el.style.opacity = "1";
                          }}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div
                    className="h-px"
                    style={{ backgroundColor: "rgba(212,212,207,0.3)" }}
                  />
                  <div>
                    <p className="font-light text-[9px] tracking-[0.35em] text-[#c8d0d8] mb-6">
                      filled — translucent tint, gentle weight
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { label: "morning", bg: "rgba(100,181,246,0.14)", color: "#64b5f6" },
                        { label: "garden", bg: "rgba(152,216,200,0.14)", color: "#98d8c8" },
                        { label: "sakura", bg: "rgba(255,183,197,0.18)", color: "#ffb7c5" },
                      ].map((btn) => (
                        <button
                          key={btn.label}
                          className="px-8 py-2.5 font-light text-sm tracking-widest rounded-lg transition-all duration-500"
                          style={{
                            backgroundColor: btn.bg,
                            color: btn.color,
                            border: `0.5px solid ${btn.color}35`,
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "translateY(-0.5px)";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                          }}
                          onMouseDown={(e) => {
                            (e.currentTarget as HTMLElement).style.opacity = "0.75";
                          }}
                          onMouseUp={(e) => {
                            (e.currentTarget as HTMLElement).style.opacity = "1";
                          }}
                        >
                          {btn.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---- CARDS ---- */}
              {activeTab === "cards" && (
                <div className="grid md:grid-cols-2 gap-5">
                  {[
                    { title: "Morning Light", titleJa: "朝の光", desc: "Light through shoji screens. Unhurried. Weightless.", accent: "#64b5f6" },
                    { title: "Garden Quiet", titleJa: "庭の静寂", desc: "A single maple leaf mid-fall. Time slowing down.", accent: "#98d8c8" },
                    { title: "Paper Fold", titleJa: "紙の折り目", desc: "Washi pressed flat, its grain still visible in light.", accent: "#ffb7c5" },
                    { title: "Distant Rain", titleJa: "遠雨", desc: "The sound heard from inside warmth. Present, far.", accent: "#b8d4e3" },
                  ].map((card, i) => (
                    <div
                      key={card.title}
                      className="p-8 bg-white rounded-lg transition-all duration-500 cursor-default"
                      style={{ border: "0.5px solid rgba(212,212,207,0.35)" }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = "translateY(-0.5px)";
                        el.style.borderColor = `${card.accent}35`;
                        el.style.backgroundColor = `${card.accent}03`;
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.transform = "translateY(0)";
                        el.style.borderColor = "rgba(212,212,207,0.35)";
                        el.style.backgroundColor = "white";
                      }}
                    >
                      <div
                        className="w-6 h-px mb-5"
                        style={{ backgroundColor: card.accent, opacity: 0.5 }}
                      />
                      <h4
                        className="font-extralight text-base text-[#4a5568] tracking-wide mb-1 transition-colors duration-500"
                        style={{ color: hoveredCard === i ? card.accent : "#4a5568" }}
                      >
                        {card.title}
                      </h4>
                      <div className="font-light text-[9px] text-[#c8d0d8] tracking-widest mb-3">
                        {card.titleJa}
                      </div>
                      <p className="font-light text-xs text-[#b0b8c4] leading-loose tracking-wide">
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* ---- INPUTS ---- */}
              {activeTab === "inputs" && (
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-10">
                    <p className="font-light text-[9px] tracking-[0.35em] text-[#c8d0d8]">
                      bottom-line only &middot; floating labels &middot; no surrounding frame
                    </p>
                    {[
                      { id: "inp-name", label: "your name", type: "text", color: "#64b5f6" },
                      { id: "inp-email", label: "email address", type: "email", color: "#98d8c8" },
                      { id: "inp-thought", label: "a quiet thought", type: "text", color: "#ffb7c5" },
                    ].map((field) => (
                      <div key={field.id} className="relative pt-1">
                        <input
                          type={field.type}
                          id={field.id}
                          placeholder=" "
                          onFocus={() => setFocusedField(field.id)}
                          onBlur={() => setFocusedField(null)}
                          className="w-full pb-2.5 pt-0 bg-transparent font-light text-sm text-[#4a5568] tracking-wide focus:outline-none transition-all duration-500"
                          style={{
                            border: "none",
                            borderBottom: focusedField === field.id
                              ? `0.5px solid ${field.color}`
                              : "0.5px solid rgba(212,212,207,0.7)",
                          }}
                        />
                        <label
                          htmlFor={field.id}
                          className="absolute top-0 left-0 font-light text-[10px] tracking-widest pointer-events-none transition-colors duration-500"
                          style={{ color: focusedField === field.id ? field.color : "#c8d0d8" }}
                        >
                          {field.label}
                        </label>
                      </div>
                    ))}
                    <button
                      className="font-light text-xs text-[#7a8a9e] tracking-widest px-8 py-2.5 rounded-lg transition-all duration-500"
                      style={{ border: "0.5px solid rgba(212,212,207,0.5)", backgroundColor: "transparent" }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.color = "#64b5f6";
                        el.style.borderColor = "rgba(100,181,246,0.4)";
                        el.style.transform = "translateY(-0.5px)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.color = "#7a8a9e";
                        el.style.borderColor = "rgba(212,212,207,0.5)";
                        el.style.transform = "translateY(0)";
                      }}
                    >
                      send quietly
                    </button>
                  </div>
                  <div className="space-y-6">
                    <p className="font-light text-[9px] tracking-[0.35em] text-[#c8d0d8]">
                      checkboxes &middot; hairline border, no heavy ring
                    </p>
                    {["receive morning notes", "seasonal updates", "wabi-sabi digest"].map(
                      (item, i) => (
                        <label
                          key={item}
                          className="flex items-center gap-4 cursor-pointer"
                        >
                          <button
                            onClick={() => toggleItem(i)}
                            className="flex items-center justify-center rounded transition-all duration-500 flex-shrink-0"
                            style={{
                              width: "1.25rem",
                              height: "1.25rem",
                              border: checkedItems[i]
                                ? "0.5px solid rgba(100,181,246,0.5)"
                                : "0.5px solid rgba(212,212,207,0.6)",
                              backgroundColor: checkedItems[i] ? "rgba(100,181,246,0.1)" : "transparent",
                              borderRadius: "0.2rem",
                            }}
                          >
                            {checkedItems[i] && (
                              <svg viewBox="0 0 12 12" width="8" height="8" fill="none" stroke="#64b5f6" strokeWidth="1.5">
                                <path d="M1.5 6l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </button>
                          <span className="font-light text-sm text-[#7a8a9e] tracking-wide">{item}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* ---- TYPOGRAPHY ---- */}
              {activeTab === "typography" && (
                <div className="space-y-8">
                  {[
                    { sample: "日系清新", size: "2.75rem", weight: 200, label: "Display extralight", tracking: "0.06em" },
                    { sample: "Morning Light", size: "2rem", weight: 200, label: "Heading 1 extralight", tracking: "0.05em" },
                    { sample: "桜の季節 — cherry season", size: "1.375rem", weight: 300, label: "Heading 2 light", tracking: "0.07em" },
                    { sample: "Wabi-sabi aesthetics and the beauty of imperfection", size: "1rem", weight: 300, label: "Body light", tracking: "0.04em" },
                    { sample: "hairline borders · botanical accents · meditative slowness", size: "0.8rem", weight: 300, label: "Caption light", tracking: "0.1em" },
                    { sample: "palette · border · hairline · 間 · 侘寂", size: "0.65rem", weight: 300, label: "Label light", tracking: "0.22em" },
                  ].map((t, i) => (
                    <div
                      key={t.label}
                      className="pb-6"
                      style={{ borderBottom: "0.5px solid rgba(212,212,207,0.25)" }}
                    >
                      <p
                        style={{
                          fontSize: t.size,
                          fontWeight: t.weight,
                          letterSpacing: t.tracking,
                          color: "#4a5568",
                          lineHeight: 1.4,
                          marginBottom: "0.375rem",
                        }}
                      >
                        {t.sample}
                      </p>
                      <span className="font-light text-[9px] text-[#c8d0d8] tracking-widest font-mono">
                        {t.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. ANIMATION & INTERACTION RULES — 4 named aiRules as demos     */}
      {/* ================================================================ */}
      <section
        className="py-32 md:py-40 px-6 md:px-10 relative overflow-hidden"
        style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
      >
        {/* Botanical accent */}
        <div
          className="jf-sway absolute left-6 md:left-14 bottom-12 w-10 h-24 pointer-events-none"
          style={{ opacity: 0.08, animationDelay: "0.5s" }}
        >
          <BotanicalCircle className="w-full h-full" />
        </div>

        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-14">
            <span className="block font-light text-[10px] tracking-[0.45em] text-[#b0b8c4] mb-5">
              interactions / 動き
            </span>
            <h2 className="font-extralight text-3xl md:text-4xl text-[#4a5568] tracking-wide mb-4">
              animation &amp; interaction rules
            </h2>
            <p className="font-light text-sm text-[#b0b8c4] tracking-wide leading-loose max-w-sm">
              Four named rules govern every motion. Meditative, never jarring.
              Hover or click each demo to feel the Japanese Fresh interaction language.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Rule 1: Weightless Float */}
            <RevealBlock delay={0.08}>
              <div
                className="p-8 md:p-10 bg-white rounded-lg h-full"
                style={{ border: "0.5px solid rgba(212,212,207,0.35)", boxSizing: "border-box" }}
              >
                <div
                  className="inline-block font-light text-[9px] tracking-[0.2em] rounded mb-3 px-2.5 py-1"
                  style={{
                    color: "#64b5f6",
                    border: "0.5px solid rgba(100,181,246,0.35)",
                  }}
                >
                  Weightless Float
                </div>
                <p className="font-light text-[9px] tracking-wide text-[#c8d0d8] leading-loose mb-6 font-mono">
                  hover 仅允许极轻上浮（约 0.5px）<br />
                  避免重阴影和大位移
                </p>

                {/* Demo */}
                <div
                  className="rounded-lg p-5 cursor-pointer transition-all duration-500"
                  style={{
                    border: "0.5px solid rgba(212,212,207,0.4)",
                    backgroundColor: floatHovered ? "rgba(100,181,246,0.03)" : "transparent",
                    transform: floatHovered ? "translateY(-0.5px)" : "translateY(0)",
                    borderColor: floatHovered ? "rgba(100,181,246,0.3)" : "rgba(212,212,207,0.4)",
                  }}
                  onMouseEnter={() => setFloatHovered(true)}
                  onMouseLeave={() => setFloatHovered(false)}
                >
                  <p
                    className="font-light text-xs tracking-wide transition-colors duration-500"
                    style={{ color: floatHovered ? "#64b5f6" : "#7a8a9e" }}
                  >
                    {floatHovered ? "floating — only 0.5px of lift, no shadow" : "hover this element"}
                  </p>
                  <p className="font-light text-[9px] text-[#c8d0d8] tracking-wide mt-2 font-mono">
                    hover:–translate-y-0.5 &middot; duration-500
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Rule 2: Airy Transitions */}
            <RevealBlock delay={0.12}>
              <div
                className="p-8 md:p-10 bg-white rounded-lg h-full"
                style={{ border: "0.5px solid rgba(212,212,207,0.35)", boxSizing: "border-box" }}
              >
                <div
                  className="inline-block font-light text-[9px] tracking-[0.2em] rounded mb-3 px-2.5 py-1"
                  style={{
                    color: "#98d8c8",
                    border: "0.5px solid rgba(152,216,200,0.35)",
                  }}
                >
                  Airy Transitions
                </div>
                <p className="font-light text-[9px] tracking-wide text-[#c8d0d8] leading-loose mb-6 font-mono">
                  颜色变化采用 duration-500 + ease-in-out<br />
                  像晨雾中缓慢显现
                </p>

                {/* Demo */}
                <button
                  onClick={() => setAiryActive((v) => !v)}
                  className="w-full rounded-lg p-4 font-light text-xs tracking-widest text-left transition-all duration-500"
                  style={{
                    color: airyActive ? "#98d8c8" : "#b0b8c4",
                    border: `0.5px solid ${airyActive ? "rgba(152,216,200,0.4)" : "rgba(212,212,207,0.4)"}`,
                    backgroundColor: airyActive ? "rgba(152,216,200,0.06)" : "transparent",
                  }}
                >
                  {airyActive
                    ? "color has arrived — like morning mist clearing"
                    : "click — watch the slow color shift unfold"}
                </button>
                <p className="font-light text-[9px] text-[#c8d0d8] tracking-wide mt-3 font-mono">
                  transition: all 500ms ease-in-out
                </p>
              </div>
            </RevealBlock>

            {/* Rule 3: Subtle Focus */}
            <RevealBlock delay={0.16}>
              <div
                className="p-8 md:p-10 bg-white rounded-lg h-full"
                style={{ border: "0.5px solid rgba(212,212,207,0.35)", boxSizing: "border-box" }}
              >
                <div
                  className="inline-block font-light text-[9px] tracking-[0.2em] rounded mb-3 px-2.5 py-1"
                  style={{
                    color: "#ffb7c5",
                    border: "0.5px solid rgba(255,183,197,0.35)",
                  }}
                >
                  Subtle Focus
                </div>
                <p className="font-light text-[9px] tracking-wide text-[#c8d0d8] leading-loose mb-6 font-mono">
                  focus 只调整发丝级边框颜色<br />
                  不使用粗 ring 或强 glow
                </p>

                {/* Demo — bottom-line input */}
                <div className="relative pt-1">
                  <input
                    type="text"
                    placeholder=" "
                    onFocus={() => setSubtleFocused(true)}
                    onBlur={() => setSubtleFocused(false)}
                    className="w-full pb-2.5 pt-0 bg-transparent font-light text-xs text-[#4a5568] tracking-wide focus:outline-none transition-all duration-500"
                    style={{
                      border: "none",
                      borderBottom: subtleFocused
                        ? "0.5px solid #ffb7c5"
                        : "0.5px solid rgba(212,212,207,0.6)",
                    }}
                  />
                  <label
                    className="absolute top-0 left-0 font-light text-[9px] tracking-widest pointer-events-none transition-colors duration-500"
                    style={{ color: subtleFocused ? "#ffb7c5" : "#c8d0d8" }}
                  >
                    {subtleFocused ? "focused — hairline only, no ring, no glow" : "click to focus this input"}
                  </label>
                </div>
                <p className="font-light text-[9px] text-[#c8d0d8] tracking-wide mt-4 font-mono">
                  border-b: 0.5px &middot; no ring &middot; no box-shadow
                </p>
              </div>
            </RevealBlock>

            {/* Rule 4: Tactile Click */}
            <RevealBlock delay={0.2}>
              <div
                className="p-8 md:p-10 bg-white rounded-lg h-full"
                style={{ border: "0.5px solid rgba(212,212,207,0.35)", boxSizing: "border-box" }}
              >
                <div
                  className="inline-block font-light text-[9px] tracking-[0.2em] rounded mb-3 px-2.5 py-1"
                  style={{
                    color: "#b8d4e3",
                    border: "0.5px solid rgba(184,212,227,0.35)",
                  }}
                >
                  Tactile Click
                </div>
                <p className="font-light text-[9px] tracking-wide text-[#c8d0d8] leading-loose mb-6 font-mono">
                  active 态优先微调透明度和背景层<br />
                  不使用明显缩放
                </p>

                {/* Demo */}
                <button
                  className="w-full rounded-lg p-4 font-light text-xs tracking-widest text-left transition-all duration-500"
                  style={{
                    color: "#7a8a9e",
                    border: `0.5px solid ${tactilePressed ? "rgba(184,212,227,0.5)" : "rgba(212,212,207,0.4)"}`,
                    backgroundColor: tactilePressed ? "rgba(184,212,227,0.12)" : "transparent",
                    opacity: tactilePressed ? 0.75 : 1,
                  }}
                  onMouseDown={() => setTactilePressed(true)}
                  onMouseUp={() => setTactilePressed(false)}
                  onMouseLeave={() => setTactilePressed(false)}
                >
                  {tactilePressed ? "pressed — opacity shift + bg tint" : "press and hold this button"}
                </button>
                <p className="font-light text-[9px] text-[#c8d0d8] tracking-wide mt-3 font-mono">
                  active: opacity 0.75 + bg tint &middot; no scale transform
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. JOURNAL APP DEMO                                              */}
      {/* ================================================================ */}
      <section className="py-32 md:py-40 px-6 md:px-10 relative overflow-hidden">
        {/* Botanical accent */}
        <div
          className="jf-drift absolute right-4 md:right-12 top-20 w-8 h-20 pointer-events-none"
          style={{ opacity: 0.08, animationDelay: "0.8s" }}
        >
          <BotanicalReed className="w-full h-full" />
        </div>

        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-14">
            <span className="block font-light text-[10px] tracking-[0.45em] text-[#b0b8c4] mb-5">
              app demo / アプリ
            </span>
            <h2 className="font-extralight text-3xl md:text-4xl text-[#4a5568] tracking-wide mb-4">
              quiet journal
            </h2>
            <p className="font-light text-sm text-[#b0b8c4] tracking-wide leading-loose max-w-sm">
              A mock journal interface demonstrating the full system in context —
              extreme whitespace, hairline borders, botanical accents, bottom-line inputs.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-5">
            {/* Sidebar */}
            <RevealBlock delay={0.1}>
              <div
                className="bg-white rounded-lg p-7 h-full"
                style={{ border: "0.5px solid rgba(212,212,207,0.35)" }}
              >
                <div className="font-light text-[9px] tracking-[0.35em] text-[#c8d0d8] mb-7">
                  entries / 記録
                </div>
                <div>
                  {journalEntries.map((entry, i) => (
                    <div
                      key={entry.date}
                      className="cursor-pointer transition-all duration-500"
                      style={{
                        paddingTop: i === 0 ? 0 : "1.25rem",
                        paddingBottom: "1.25rem",
                        borderBottom: i < journalEntries.length - 1
                          ? "0.5px solid rgba(212,212,207,0.25)"
                          : "none",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.paddingLeft = "0.375rem";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.paddingLeft = "0";
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <div
                          className="rounded-full flex-shrink-0"
                          style={{ width: "0.3rem", height: "0.3rem", backgroundColor: entry.mood, opacity: 0.6 }}
                        />
                        <span className="font-light text-[9px] text-[#c8d0d8] tracking-widest">
                          {entry.date}
                        </span>
                      </div>
                      <p className="font-light text-xs text-[#4a5568] tracking-wide mb-1">
                        {entry.title}
                      </p>
                      <p className="font-light text-[10px] text-[#b0b8c4] leading-relaxed tracking-wide line-clamp-2">
                        {entry.excerpt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Main entry view */}
            <RevealBlock delay={0.15} className="md:col-span-2">
              <div
                className="bg-white rounded-lg p-8 md:p-10 h-full"
                style={{ border: "0.5px solid rgba(212,212,207,0.35)" }}
              >
                {/* Entry header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="font-light text-[9px] tracking-[0.35em] text-[#c8d0d8] mb-2">
                      {journalEntries[0].dateJa}
                    </div>
                    <h3 className="font-extralight text-2xl text-[#4a5568] tracking-wide">
                      {journalEntries[0].title}
                    </h3>
                  </div>
                  <div
                    className="w-2 h-2 rounded-full mt-1 flex-shrink-0"
                    style={{ backgroundColor: "#64b5f6", opacity: 0.4 }}
                  />
                </div>

                {/* Hairline */}
                <div
                  className="h-px mb-7"
                  style={{ backgroundColor: "rgba(212,212,207,0.3)" }}
                />

                {/* Body */}
                <p className="font-light text-sm text-[#7a8a9e] leading-loose tracking-wide mb-5">
                  {journalEntries[0].excerpt}
                </p>
                <p className="font-light text-sm text-[#b0b8c4] leading-loose tracking-wide mb-8">
                  There is a kind of light that exists only once a day, for a few minutes,
                  before the world fully commits to being awake. It does not announce itself.
                  You have to already be looking. The light will not wait for you to find it.
                  It arrives and departs on its own schedule, indifferent and perfect.
                </p>

                {/* Hairline */}
                <div
                  className="h-px mb-7"
                  style={{ backgroundColor: "rgba(212,212,207,0.3)" }}
                />

                {/* Bottom-line input */}
                <div className="relative pt-1">
                  <input
                    type="text"
                    placeholder=" "
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderBottomColor = "#64b5f6";
                      const lbl = (e.currentTarget as HTMLElement).nextElementSibling as HTMLElement | null;
                      if (lbl) lbl.style.color = "#64b5f6";
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(212,212,207,0.6)";
                      const lbl = (e.currentTarget as HTMLElement).nextElementSibling as HTMLElement | null;
                      if (lbl) lbl.style.color = "#c8d0d8";
                    }}
                    className="w-full pb-2.5 pt-0 bg-transparent font-light text-sm text-[#4a5568] tracking-wide focus:outline-none transition-all duration-500"
                    style={{ border: "none", borderBottom: "0.5px solid rgba(212,212,207,0.6)" }}
                  />
                  <label
                    className="absolute top-0 left-0 font-light text-[9px] tracking-widest pointer-events-none transition-colors duration-500"
                    style={{ color: "#c8d0d8" }}
                  >
                    add a note
                  </label>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. DO / DON&apos;T PRINCIPLES                                       */}
      {/* ================================================================ */}
      <section
        className="py-32 md:py-40 px-6 md:px-10 relative overflow-hidden"
        style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
      >
        {/* Botanical accent */}
        <div
          className="jf-sway absolute right-6 md:right-14 bottom-16 w-10 h-24 pointer-events-none"
          style={{ opacity: 0.08 }}
        >
          <BotanicalBranch className="w-full h-full" />
        </div>

        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-14">
            <span className="block font-light text-[10px] tracking-[0.45em] text-[#b0b8c4] mb-5">
              principles / 原則
            </span>
            <h2 className="font-extralight text-3xl md:text-4xl text-[#4a5568] tracking-wide mb-4">
              do and do not
            </h2>
            <p className="font-light text-sm text-[#b0b8c4] tracking-wide leading-loose max-w-sm">
              Every restraint is intentional. The rules exist to preserve the meditative
              quality that defines Japanese Fresh.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Do */}
            <RevealBlock delay={0.1}>
              <div
                className="bg-white rounded-lg p-8 md:p-10 h-full"
                style={{ border: "0.5px solid rgba(152,216,200,0.35)", boxSizing: "border-box" }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: "1.5rem",
                      height: "1.5rem",
                      backgroundColor: "rgba(152,216,200,0.12)",
                      border: "0.5px solid rgba(152,216,200,0.4)",
                    }}
                  >
                    <svg viewBox="0 0 12 12" width="8" height="8" fill="none" stroke="#98d8c8" strokeWidth="1.5">
                      <path d="M1.5 6l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="font-light text-xs tracking-[0.2em] text-[#98d8c8]">do</span>
                </div>
                <ul className="space-y-4">
                  {[
                    "Use extreme whitespace (py-32, py-40) — Ma is the primary tool",
                    "Hairline borders only (0.5px, rgba at 30–40% opacity)",
                    "Include one delicate botanical SVG accent per section",
                    "Use font-extralight / font-light exclusively throughout",
                    "Bottom-line only inputs with floating labels",
                    "Warm neutral border color #d4d4cf instead of harsh gray",
                    "Asymmetric placement for wabi-sabi character",
                    "transition duration-500 for meditative interactions",
                    "Weightless hover — 0.5px lift, transparent tint, no shadow",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3">
                      <span
                        className="mt-2 flex-shrink-0 rounded-full"
                        style={{ width: "0.25rem", height: "0.25rem", backgroundColor: "#98d8c8", opacity: 0.6 }}
                      />
                      <span className="font-light text-xs text-[#7a8a9e] tracking-wide leading-loose">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.16}>
              <div
                className="bg-white rounded-lg p-8 md:p-10 h-full"
                style={{ border: "0.5px solid rgba(212,212,207,0.35)", boxSizing: "border-box" }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width: "1.5rem",
                      height: "1.5rem",
                      backgroundColor: "rgba(255,183,197,0.1)",
                      border: "0.5px solid rgba(255,183,197,0.35)",
                    }}
                  >
                    <svg viewBox="0 0 12 12" width="8" height="8" fill="none" stroke="#ffb7c5" strokeWidth="1.5">
                      <path d="M2 2l8 8M10 2l-8 8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="font-light text-xs tracking-[0.2em] text-[#ffb7c5]">do not</span>
                </div>
                <ul className="space-y-4">
                  {[
                    "Never use bold or heavy font weights (font-bold, font-semibold)",
                    "Never use uppercase text — too aggressive for this aesthetic",
                    "Never use border-2 or thicker — only hairline borders exist here",
                    "Never use visible shadows (shadow-lg, shadow-xl) — elements float",
                    "Never use dark or black backgrounds",
                    "Never use sharp corners (rounded-none) — always gentle",
                    "Never crowd sections — maintain extreme breathing room between",
                    "Never use fast, abrupt transitions under 200ms",
                    "Never use neon or high-saturation colors anywhere",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3">
                      <span
                        className="mt-2 flex-shrink-0 rounded-full"
                        style={{ width: "0.25rem", height: "0.25rem", backgroundColor: "#ffb7c5", opacity: 0.5 }}
                      />
                      <span className="font-light text-xs text-[#b0b8c4] tracking-wide leading-loose line-through decoration-[#d4d4cf]/50">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 9. CSS TOKENS REFERENCE                                          */}
      {/* ================================================================ */}
      <section className="py-32 md:py-40 px-6 md:px-10 relative overflow-hidden">
        {/* Botanical accent */}
        <div
          className="jf-drift absolute left-6 md:left-16 top-24 w-8 h-18 pointer-events-none"
          style={{ opacity: 0.08, animationDelay: "2s" }}
        >
          <BotanicalLeaf className="w-full h-full" />
        </div>

        <div className="max-w-5xl mx-auto">
          <RevealBlock className="mb-14">
            <span className="block font-light text-[10px] tracking-[0.45em] text-[#b0b8c4] mb-5">
              css tokens / 変数
            </span>
            <h2 className="font-extralight text-3xl md:text-4xl text-[#4a5568] tracking-wide mb-4">
              global css variables
            </h2>
            <p className="font-light text-sm text-[#b0b8c4] tracking-wide leading-loose max-w-sm">
              All design tokens exposed as CSS custom properties for full system consistency.
              Reference them in any component.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            <RevealBlock delay={0.1}>
              <div
                className="bg-white rounded-lg p-8 h-full"
                style={{ border: "0.5px solid rgba(212,212,207,0.35)", boxSizing: "border-box" }}
              >
                <p className="font-light text-[9px] tracking-[0.3em] text-[#c8d0d8] mb-5">
                  :root tokens
                </p>
                <pre
                  className="font-mono"
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 300,
                    color: "#7a8a9e",
                    lineHeight: 2.2,
                    letterSpacing: "0.03em",
                    margin: 0,
                    whiteSpace: "pre",
                    overflowX: "auto",
                  }}
                >
{`:root {
  --jf-sky:     #64b5f6;
  --jf-rice:    #fafaf8;
  --jf-mint:    #98d8c8;
  --jf-pink:    #ffb7c5;
  --jf-powder:  #b8d4e3;
  --jf-text:    #4a5568;
  --jf-muted:   #b0b8c4;
  --jf-border:  #d4d4cf;
}`}
                </pre>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.14}>
              <div
                className="bg-white rounded-lg p-8 h-full"
                style={{ border: "0.5px solid rgba(212,212,207,0.35)", boxSizing: "border-box" }}
              >
                <p className="font-light text-[9px] tracking-[0.3em] text-[#c8d0d8] mb-5">
                  utility classes
                </p>
                <div className="space-y-5">
                  {[
                    { name: ".jf-linen", desc: "Subtle washi paper texture background overlay" },
                    { name: ".jf-divider", desc: "0.5px hairline divider at 40% opacity" },
                    { name: ".jf-input-underline", desc: "Bottom-border only input, no radius, no frame" },
                    { name: ".jf-ma-section", desc: "py-32 section spacing — the Ma principle" },
                    { name: ".jf-botanical", desc: "Botanical SVG opacity + stroke color preset" },
                  ].map((cls) => (
                    <div key={cls.name}>
                      <code
                        className="block font-mono mb-1 transition-colors duration-500"
                        style={{ fontSize: "0.7rem", fontWeight: 300, color: "#64b5f6", letterSpacing: "0.04em" }}
                      >
                        {cls.name}
                      </code>
                      <p
                        className="font-light leading-loose tracking-wide"
                        style={{ fontSize: "0.7rem", color: "#b0b8c4" }}
                      >
                        {cls.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FOOTER                                                           */}
      {/* ================================================================ */}
      <footer
        className="relative overflow-hidden"
        style={{ backgroundColor: "rgba(255,255,255,0.6)", borderTop: "0.5px solid rgba(212,212,207,0.3)" }}
      >
        {/* Botanical footer accent */}
        <div
          className="jf-sway absolute right-10 md:right-20 top-8 w-8 h-18 pointer-events-none"
          style={{ opacity: 0.07, animationDelay: "1s" }}
        >
          <BotanicalBranch className="w-full h-full" />
        </div>

        <div className="max-w-5xl mx-auto px-6 md:px-10 pt-16 pb-10">
          {/* Top */}
          <div className="flex flex-wrap items-start justify-between gap-10 mb-14">
            {/* Brand */}
            <div style={{ maxWidth: "240px" }}>
              <div className="flex items-center gap-2 mb-4">
                <svg
                  viewBox="0 0 20 36"
                  width="10"
                  height="18"
                  fill="none"
                  stroke="#b0b8c4"
                  strokeWidth="0.8"
                  aria-hidden="true"
                >
                  <path d="M10 34 C10 26, 10.5 18, 11 10 C11.5 5, 10.5 1, 11 0" />
                  <path d="M11 10 C15 8, 18 5, 20 2 C17 5, 14 8, 11 10" />
                  <path d="M10.5 20 C7 18, 4 14, 2 10 C4 14, 7 18, 10.5 20" />
                </svg>
                <span className="font-light text-sm text-[#7a8a9e] tracking-[0.1em]">
                  japanese fresh
                </span>
              </div>
              <p className="font-light text-xs text-[#b0b8c4] leading-loose tracking-wide mb-4">
                Ma philosophy, wabi-sabi beauty, hairline borders
                and botanical accents. Design that breathes.
              </p>
              <div className="flex gap-2">
                {["#64b5f6", "#98d8c8", "#ffb7c5", "#b8d4e3", "#d4d4cf"].map((c) => (
                  <div
                    key={c}
                    className="rounded-full transition-all duration-500 hover:scale-110 cursor-default"
                    style={{
                      width: "0.875rem",
                      height: "0.875rem",
                      backgroundColor: c,
                      border: c === "#d4d4cf" ? "0.5px solid rgba(212,212,207,0.6)" : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-10">
              <div className="flex flex-col gap-3">
                <span className="font-light text-[9px] tracking-[0.3em] text-[#c8d0d8]">style</span>
                {[
                  { label: "documentation", href: "/styles/japanese-fresh" },
                  { label: "showcase", href: "/styles/japanese-fresh/showcase" },
                  { label: "cover", href: "/styles/japanese-fresh/cover" },
                ].map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="font-light text-xs text-[#b0b8c4] tracking-wide transition-colors duration-500 hover:text-[#64b5f6]"
                    style={{ textDecoration: "none" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-light text-[9px] tracking-[0.3em] text-[#c8d0d8]">stylekit</span>
                {[
                  { label: "home", href: "/" },
                  { label: "all styles", href: "/styles" },
                ].map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="font-light text-xs text-[#b0b8c4] tracking-wide transition-colors duration-500 hover:text-[#64b5f6]"
                    style={{ textDecoration: "none" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-light text-[9px] tracking-[0.3em] text-[#c8d0d8]">philosophy</span>
                {["間 — ma", "侘 — wabi", "寂 — sabi", "清 — sei"].map((p) => (
                  <span key={p} className="font-light text-xs text-[#c8d0d8] tracking-wide">{p}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Hairline */}
          <div
            className="h-px mb-8"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(212,212,207,0.4) 40%, rgba(212,212,207,0.4) 60%, transparent 100%)",
            }}
          />

          {/* Bottom row */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-light text-[9px] tracking-[0.25em] text-[#c8d0d8]">
              日系清新風 &mdash; japanese fresh &mdash; for stylekit
            </span>
            <div className="flex items-center gap-3">
              {["#64b5f6", "#98d8c8", "#ffb7c5", "#b8d4e3"].map((c, i) => (
                <div
                  key={c}
                  className="rounded-full jf-breathe"
                  style={{
                    width: "0.3rem",
                    height: "0.3rem",
                    backgroundColor: c,
                    opacity: 0.5,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>
            <Link
              href="/"
              className="flex items-center gap-1.5 font-light text-[10px] tracking-widest text-[#7a8a9e] px-4 py-1.5 rounded-lg transition-all duration-500 hover:text-[#64b5f6] hover:-translate-y-px"
              style={{ border: "0.5px solid rgba(212,212,207,0.4)", textDecoration: "none" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(100,181,246,0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,212,207,0.4)";
              }}
            >
              <span>&#8592;</span>
              <span>back to stylekit</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
