"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────
// RevealBlock
// ─────────────────────────────────────────────────────────────

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
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Inline SVG botanical components
// ─────────────────────────────────────────────────────────────

function IrisFlower({ size = 48, color = "#c9a227" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <ellipse cx="24" cy="24" rx="6" ry="12" fill={color} opacity="0.85" />
      <ellipse cx="24" cy="24" rx="6" ry="12" fill={color} opacity="0.85" transform="rotate(60 24 24)" />
      <ellipse cx="24" cy="24" rx="6" ry="12" fill={color} opacity="0.85" transform="rotate(120 24 24)" />
      <ellipse cx="24" cy="24" rx="6" ry="12" fill={color} opacity="0.5" transform="rotate(30 24 24)" />
      <ellipse cx="24" cy="24" rx="6" ry="12" fill={color} opacity="0.5" transform="rotate(90 24 24)" />
      <ellipse cx="24" cy="24" rx="6" ry="12" fill={color} opacity="0.5" transform="rotate(150 24 24)" />
      <circle cx="24" cy="24" r="4" fill="#2d5016" />
      <circle cx="24" cy="24" r="2" fill={color} />
    </svg>
  );
}

function LeafSprig({ size = 40, color = "#4a7c3f" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 38 C20 38 8 28 8 16 C8 8 14 4 20 4 C26 4 32 8 32 16 C32 28 20 38 20 38Z" fill={color} opacity="0.75" />
      <path d="M20 38 L20 4" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M20 22 C20 22 13 18 11 12" stroke="#f5f0e1" strokeWidth="1" opacity="0.5" />
      <path d="M20 22 C20 22 27 18 29 12" stroke="#f5f0e1" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function CornerOrnament({
  position,
  size = 80,
}: {
  position: "tl" | "tr" | "bl" | "br";
  size?: number;
}) {
  const transforms: Record<string, string> = {
    tl: "rotate(0)",
    tr: "rotate(90)",
    br: "rotate(180)",
    bl: "rotate(270)",
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      style={{ transform: transforms[position] }}
    >
      <path
        d="M4 4 C4 4 4 40 20 56 C36 72 76 76 76 76"
        stroke="#c9a227"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <path
        d="M4 4 C4 4 20 8 28 20 C36 32 32 52 40 60"
        stroke="#4a7c3f"
        strokeWidth="1"
        opacity="0.5"
      />
      <circle cx="10" cy="10" r="3" fill="#c9a227" opacity="0.7" />
      <ellipse cx="30" cy="20" rx="5" ry="8" fill="#c9a227" opacity="0.4" transform="rotate(-30 30 20)" />
      <ellipse cx="50" cy="42" rx="4" ry="7" fill="#4a7c3f" opacity="0.35" transform="rotate(20 50 42)" />
      <circle cx="62" cy="62" r="2.5" fill="#c9a227" opacity="0.6" />
    </svg>
  );
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-2" aria-hidden="true">
      <svg width="320" height="32" viewBox="0 0 320 32" fill="none">
        <line x1="0" y1="16" x2="120" y2="16" stroke="#c9a227" strokeWidth="1" opacity="0.5" />
        <line x1="200" y1="16" x2="320" y2="16" stroke="#c9a227" strokeWidth="1" opacity="0.5" />
        <path
          d="M135 16 C140 8 148 4 160 4 C172 4 180 8 185 16 C180 24 172 28 160 28 C148 28 140 24 135 16Z"
          stroke="#c9a227"
          strokeWidth="1.5"
          fill="#c9a227"
          opacity="0.15"
        />
        <circle cx="160" cy="16" r="3" fill="#c9a227" opacity="0.7" />
        <circle cx="128" cy="16" r="2" fill="#4a7c3f" opacity="0.5" />
        <circle cx="192" cy="16" r="2" fill="#4a7c3f" opacity="0.5" />
        <path
          d="M118 16 Q123 10 128 16 Q123 22 118 16Z"
          fill="#c9a227"
          opacity="0.4"
        />
        <path
          d="M202 16 Q197 10 192 16 Q197 22 202 16Z"
          fill="#c9a227"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}

function VineDividerNav() {
  return (
    <svg width="100%" height="8" viewBox="0 0 600 8" preserveAspectRatio="none" fill="none" aria-hidden="true">
      <path
        d="M0 4 C50 0 100 8 150 4 C200 0 250 8 300 4 C350 0 400 8 450 4 C500 0 550 8 600 4"
        stroke="#c9a227"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <circle cx="150" cy="4" r="2" fill="#c9a227" opacity="0.5" />
      <circle cx="300" cy="4" r="2" fill="#4a7c3f" opacity="0.5" />
      <circle cx="450" cy="4" r="2" fill="#c9a227" opacity="0.5" />
    </svg>
  );
}

function BotanicalFrame() {
  return (
    <svg
      viewBox="0 0 600 400"
      fill="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      {/* Top border vine */}
      <path
        d="M0 20 C100 5 200 35 300 15 C400 -5 500 30 600 12"
        stroke="#c9a227"
        strokeWidth="2"
        opacity="0.45"
      />
      {/* Bottom border vine */}
      <path
        d="M0 380 C100 395 200 365 300 385 C400 405 500 370 600 388"
        stroke="#c9a227"
        strokeWidth="2"
        opacity="0.45"
      />
      {/* Left border vine */}
      <path
        d="M20 0 C5 100 35 200 15 300 C-5 400 30 450 12 500"
        stroke="#4a7c3f"
        strokeWidth="1.5"
        opacity="0.35"
      />
      {/* Right border vine */}
      <path
        d="M580 0 C595 100 565 200 585 300 C605 400 570 450 588 500"
        stroke="#4a7c3f"
        strokeWidth="1.5"
        opacity="0.35"
      />
      {/* Corner blossoms */}
      <circle cx="20" cy="20" r="6" fill="#c9a227" opacity="0.3" />
      <circle cx="580" cy="20" r="6" fill="#c9a227" opacity="0.3" />
      <circle cx="20" cy="380" r="6" fill="#c9a227" opacity="0.3" />
      <circle cx="580" cy="380" r="6" fill="#c9a227" opacity="0.3" />
      {/* Leaf flourishes on corners */}
      <ellipse cx="40" cy="40" rx="10" ry="18" fill="#4a7c3f" opacity="0.25" transform="rotate(-45 40 40)" />
      <ellipse cx="560" cy="40" rx="10" ry="18" fill="#4a7c3f" opacity="0.25" transform="rotate(45 560 40)" />
      <ellipse cx="40" cy="360" rx="10" ry="18" fill="#4a7c3f" opacity="0.25" transform="rotate(45 40 360)" />
      <ellipse cx="560" cy="360" rx="10" ry="18" fill="#4a7c3f" opacity="0.25" transform="rotate(-45 560 360)" />
      {/* Top center ornament */}
      <path d="M280 10 C285 2 290 6 295 10 C300 14 305 18 300 22 C295 26 285 22 280 18 C275 14 275 18 280 10Z" fill="#c9a227" opacity="0.3" />
      <circle cx="300" cy="12" r="3" fill="#c9a227" opacity="0.5" />
    </svg>
  );
}

function WatermarkFloral() {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0.04 }}
    >
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={angle}
          cx="200"
          cy="200"
          rx="40"
          ry="100"
          fill="#2d5016"
          transform={`rotate(${angle} 200 200)`}
        />
      ))}
      <circle cx="200" cy="200" r="20" fill="#c9a227" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────

type ComponentTab = "Button" | "Card" | "Input";

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("Button");
  const [toggleStates, setToggleStates] = useState([true, false, true]);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  function handleToggle(index: number) {
    setToggleStates((prev) => prev.map((v, i) => (i === index ? !v : v)));
  }

  const componentTabs: ComponentTab[] = ["Button", "Card", "Input"];

  return (
    <div className="min-h-screen bg-[#f5f0e1] text-[#2d5016]">
      <style>{`
        @keyframes sway {
          0%, 100% { transform: rotate(-2deg) scale(1); }
          50% { transform: rotate(2deg) scale(1.02); }
        }
        @keyframes gold-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .botanical-hover:hover {
          transform: scale(1.1) rotate(5deg);
          transition: transform 0.5s ease-in-out;
        }
        .botanical-hover {
          transition: transform 0.5s ease-in-out;
        }
        .vine-sway {
          animation: sway 6s ease-in-out infinite;
          transform-origin: bottom center;
        }
        .gold-glow:hover {
          box-shadow: 0 0 20px rgba(201,162,39,0.4);
          transition: box-shadow 0.7s ease-in-out;
        }
        .gold-glow {
          transition: box-shadow 0.7s ease-in-out;
        }
        .radial-bloom:hover {
          background-image: radial-gradient(circle at 30% 30%, rgba(201,162,39,0.15), transparent);
        }
        .initial-cap::first-letter {
          font-size: 5rem;
          line-height: 0.7;
          float: left;
          margin-right: 0.1em;
          margin-top: 0.1em;
          color: #c9a227;
          font-family: Georgia, serif;
        }
      `}</style>

      {/* ═══════════════════════════════════════════════
          NAV
      ═══════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f0e1]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between py-4">
            <Link
              href="/styles/art-nouveau"
              className="font-serif text-xl italic text-[#2d5016] hover:text-[#c9a227] transition-colors duration-500"
            >
              Art Nouveau
            </Link>
            <nav className="flex items-center gap-8">
              <Link
                href="/styles"
                className="font-serif text-sm italic text-[#2d5016]/70 hover:text-[#c9a227] transition-colors duration-500"
              >
                All Styles
              </Link>
              <Link
                href="/styles/art-nouveau"
                className="font-serif text-sm italic text-[#2d5016]/70 hover:text-[#c9a227] transition-colors duration-500"
              >
                Docs
              </Link>
            </nav>
          </div>
          <VineDividerNav />
        </div>
      </header>

      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-24 px-6 md:px-10 overflow-hidden min-h-[90vh] flex flex-col items-center justify-center">
        {/* Parchment watermark */}
        <div className="absolute inset-0 overflow-hidden">
          <WatermarkFloral />
        </div>

        {/* Botanical frame */}
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="relative pt-12 pb-12 px-8 md:px-16 text-center" style={{ minHeight: "380px" }}>
            <BotanicalFrame />

            {/* Corner ornaments */}
            <div className="absolute top-0 left-0">
              <CornerOrnament position="tl" size={72} />
            </div>
            <div className="absolute top-0 right-0">
              <CornerOrnament position="tr" size={72} />
            </div>
            <div className="absolute bottom-0 left-0">
              <CornerOrnament position="bl" size={72} />
            </div>
            <div className="absolute bottom-0 right-0">
              <CornerOrnament position="br" size={72} />
            </div>

            {/* Hero title */}
            <div className="relative z-10 flex flex-col items-center gap-6 py-8">
              <div className="botanical-hover">
                <IrisFlower size={64} color="#c9a227" />
              </div>

              <h1
                className="font-serif text-6xl md:text-8xl leading-none text-[#2d5016]"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                  transition:
                    "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <span className="italic">Art</span>{" "}
                <span className="not-italic">Nouveau</span>
              </h1>

              <p
                className="font-serif text-lg md:text-2xl italic text-[#c9a227] max-w-xl"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
                  transition:
                    "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              >
                Where nature breathes through every curve, and beauty blooms in botanical gold.
              </p>

              <p
                className="font-serif text-sm text-[#2d5016]/60 max-w-md leading-relaxed"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s",
                }}
              >
                Inspired by Alphonse Mucha and Tiffany glass — organic, golden, and deeply ornate.
              </p>

              <div
                className="flex items-center gap-4 mt-4"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s",
                }}
              >
                <button className="gold-glow px-8 py-3 bg-[#2d5016] text-[#f5f0e1] rounded-full font-serif italic text-sm hover:bg-[#3a6b1e] transition-colors duration-500">
                  Explore Collection
                </button>
                <button className="gold-glow px-8 py-3 border-2 border-[#2d5016] rounded-full font-serif italic text-sm text-[#2d5016] hover:bg-[#2d5016]/5 transition-colors duration-500">
                  View Docs
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating iris decorations */}
        <div
          className="absolute left-8 top-40 vine-sway hidden md:block"
          style={{ animationDelay: "0s" }}
        >
          <IrisFlower size={40} color="#8b6db5" />
        </div>
        <div
          className="absolute right-12 top-56 vine-sway hidden md:block"
          style={{ animationDelay: "2s" }}
        >
          <LeafSprig size={48} color="#4a7c3f" />
        </div>
        <div
          className="absolute left-1/4 bottom-16 vine-sway hidden md:block"
          style={{ animationDelay: "1s" }}
        >
          <IrisFlower size={32} color="#c9a227" />
        </div>
        <div
          className="absolute right-1/4 bottom-12 vine-sway hidden md:block"
          style={{ animationDelay: "3s" }}
        >
          <LeafSprig size={36} color="#2d5016" />
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════
          COMPONENT DEMO
      ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-10 max-w-7xl mx-auto">
        <RevealBlock>
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <LeafSprig size={36} color="#4a7c3f" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl italic text-[#2d5016] mb-3">
              Component Showcase
            </h2>
            <p className="font-serif text-[#c9a227] italic">
              Every element hand-crafted with botanical precision
            </p>
          </div>
        </RevealBlock>

        {/* Tabs */}
        <RevealBlock delay={0.1} className="mb-12">
          <div className="flex justify-center gap-2 flex-wrap">
            {componentTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="font-serif italic px-8 py-2.5 rounded-full text-sm transition-all duration-500 gold-glow"
                style={{
                  backgroundColor: activeTab === tab ? "#8b6db5" : "transparent",
                  color: activeTab === tab ? "#f5f0e1" : "#2d5016",
                  border: `2px solid ${activeTab === tab ? "#8b6db5" : "#c9a227"}`,
                }}
              >
                {tab} Variants
              </button>
            ))}
          </div>
        </RevealBlock>

        {/* Tab Content */}
        {activeTab === "Button" && (
          <RevealBlock className="max-w-3xl mx-auto">
            <div className="relative rounded-3xl border border-[#c9a227] bg-[#f5f0e1] p-10 radial-bloom transition-all duration-500">
              <div className="absolute top-2 left-2">
                <CornerOrnament position="tl" size={48} />
              </div>
              <div className="absolute top-2 right-2">
                <CornerOrnament position="tr" size={48} />
              </div>
              <div className="absolute bottom-2 left-2">
                <CornerOrnament position="bl" size={48} />
              </div>
              <div className="absolute bottom-2 right-2">
                <CornerOrnament position="br" size={48} />
              </div>

              <h3 className="font-serif italic text-[#2d5016] text-xl text-center mb-8">
                Button Variants
              </h3>
              <div className="flex flex-wrap gap-4 justify-center items-center">
                <button className="gold-glow px-8 py-3 bg-[#2d5016] text-[#f5f0e1] rounded-full font-serif italic text-sm hover:bg-[#3a6b1e] transition-all duration-500">
                  Primary
                </button>
                <button className="gold-glow px-8 py-3 bg-[#c9a227] text-[#2d5016] rounded-full font-serif italic text-sm hover:bg-[#b8911e] transition-all duration-500">
                  Gold Accent
                </button>
                <button className="gold-glow px-8 py-3 border-2 border-[#2d5016] rounded-full font-serif italic text-sm text-[#2d5016] hover:bg-[#2d5016]/5 transition-all duration-500">
                  Outline
                </button>
                <button className="gold-glow px-8 py-3 bg-[#8b6db5] text-[#f5f0e1] rounded-full font-serif italic text-sm hover:bg-[#7a5ca4] transition-all duration-500">
                  Lavender
                </button>
                <button className="gold-glow px-8 py-3 bg-[#4a7c3f] text-[#f5f0e1] rounded-full font-serif italic text-sm hover:bg-[#3a6b2f] transition-all duration-500">
                  Sage
                </button>
                <button
                  className="px-8 py-3 rounded-full font-serif italic text-sm cursor-not-allowed"
                  style={{
                    backgroundColor: "#e8e0cc",
                    color: "#aaa090",
                    border: "2px solid #d4c9a8",
                  }}
                  disabled
                >
                  Withered
                </button>
              </div>
            </div>
          </RevealBlock>
        )}

        {activeTab === "Card" && (
          <RevealBlock className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Floral Motifs",
                  desc: "Lilies, irises, and orchids bloom across every surface with gilded abandon.",
                  accent: "#c9a227",
                  icon: <IrisFlower size={40} color="#c9a227" />,
                },
                {
                  title: "Organic Curves",
                  desc: "Whiplash lines that mirror the growth of wild vines climbing stone walls.",
                  accent: "#8b6db5",
                  icon: <LeafSprig size={40} color="#8b6db5" />,
                },
                {
                  title: "Botanical Gold",
                  desc: "Gilded accents and warm metallic warmth — craftsmanship made visible.",
                  accent: "#4a7c3f",
                  icon: <IrisFlower size={40} color="#4a7c3f" />,
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="relative rounded-3xl border border-[#c9a227] bg-[#f5f0e1] p-8 gold-glow radial-bloom transition-all duration-700"
                >
                  <div className="absolute top-2 left-2">
                    <CornerOrnament position="tl" size={40} />
                  </div>
                  <div className="absolute top-2 right-2">
                    <CornerOrnament position="tr" size={40} />
                  </div>
                  <div className="botanical-hover mb-4">{card.icon}</div>
                  <h3
                    className="font-serif italic text-xl mb-3"
                    style={{ color: card.accent }}
                  >
                    {card.title}
                  </h3>
                  <p className="font-serif text-sm text-[#2d5016]/70 leading-relaxed italic">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </RevealBlock>
        )}

        {activeTab === "Input" && (
          <RevealBlock className="max-w-2xl mx-auto">
            <div className="relative rounded-3xl border border-[#c9a227] bg-[#f5f0e1] p-10">
              <div className="absolute top-2 left-2">
                <CornerOrnament position="tl" size={48} />
              </div>
              <div className="absolute top-2 right-2">
                <CornerOrnament position="tr" size={48} />
              </div>

              <h3 className="font-serif italic text-[#2d5016] text-xl text-center mb-8">
                Input Variants
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block font-serif italic text-sm text-[#c9a227] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alphonse Mucha"
                    className="w-full rounded-full border border-[#c9a227] bg-white/60 px-6 py-3 font-serif italic text-[#2d5016] text-sm placeholder-[#2d5016]/40 focus:outline-none focus:border-[#8b6db5] focus:shadow-[0_0_0_3px_rgba(139,109,181,0.15)] transition-all duration-500"
                  />
                </div>
                <div>
                  <label className="block font-serif italic text-sm text-[#c9a227] mb-2">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Share your botanical dreams..."
                    className="w-full rounded-3xl border border-[#c9a227] bg-white/60 px-6 py-3 font-serif italic text-[#2d5016] text-sm placeholder-[#2d5016]/40 focus:outline-none focus:border-[#8b6db5] focus:shadow-[0_0_0_3px_rgba(139,109,181,0.15)] transition-all duration-500 resize-none"
                  />
                </div>
                <div>
                  <label className="block font-serif italic text-sm text-[#c9a227] mb-2">
                    Art Style
                  </label>
                  <select className="w-full rounded-full border border-[#c9a227] bg-white/60 px-6 py-3 font-serif italic text-[#2d5016] text-sm focus:outline-none focus:border-[#8b6db5] transition-all duration-500 appearance-none cursor-pointer">
                    <option>Mucha Poster</option>
                    <option>Tiffany Glass</option>
                    <option>Guimard Metro</option>
                    <option>Klimt Mosaic</option>
                  </select>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-[#c9a227] flex items-center justify-center cursor-pointer bg-[#2d5016]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#f5f0e1]" />
                  </div>
                  <span className="font-serif italic text-sm text-[#2d5016]/70">
                    I embrace organic beauty in all forms
                  </span>
                </div>
              </div>
            </div>
          </RevealBlock>
        )}
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════
          COLOR PALETTE
      ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-16">
              <div className="flex justify-center mb-4">
                <IrisFlower size={36} color="#8b6db5" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl italic text-[#2d5016] mb-3">
                The Garden Palette
              </h2>
              <p className="font-serif italic text-[#c9a227]">
                Colors drawn from the living world — forest, gold, lavender, sage
              </p>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              {
                name: "Forest Green",
                hex: "#2d5016",
                label: "Primary",
                desc: "The ancient woodland",
                textOnSwatch: "white",
                blob: "M60,30 C65,10 85,5 90,30 C95,55 75,70 50,65 C25,60 15,50 20,30 C25,10 55,50 60,30Z",
              },
              {
                name: "Warm Parchment",
                hex: "#f5f0e1",
                label: "Background",
                desc: "Aged manuscript",
                textOnSwatch: "#2d5016",
                blob: "M55,25 C70,5 95,15 90,40 C85,65 60,75 35,65 C10,55 5,35 20,20 C35,5 40,45 55,25Z",
              },
              {
                name: "Ancient Gold",
                hex: "#c9a227",
                label: "Accent",
                desc: "Gilded illumination",
                textOnSwatch: "#2d5016",
                blob: "M50,20 C70,0 100,20 95,50 C90,80 60,85 35,70 C10,55 5,25 25,15 C45,5 30,40 50,20Z",
              },
              {
                name: "Wisteria",
                hex: "#8b6db5",
                label: "Accent",
                desc: "Twilight blossom",
                textOnSwatch: "white",
                blob: "M60,15 C80,0 100,25 90,55 C80,85 50,80 25,65 C0,50 10,20 35,15 C60,10 40,30 60,15Z",
              },
              {
                name: "Sage Green",
                hex: "#4a7c3f",
                label: "Accent",
                desc: "Sunlit meadow",
                textOnSwatch: "white",
                blob: "M55,20 C75,5 95,30 85,60 C75,90 45,85 20,65 C-5,45 5,15 30,10 C55,5 35,35 55,20Z",
              },
            ].map((swatch, i) => (
              <RevealBlock key={swatch.hex} delay={i * 0.08}>
                <div className="flex flex-col items-center gap-3 group cursor-pointer">
                  <div className="relative w-full aspect-square">
                    <svg
                      viewBox="0 0 110 110"
                      className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                    >
                      <path
                        d={swatch.blob}
                        fill={swatch.hex}
                        style={
                          swatch.hex === "#c9a227"
                            ? {
                                filter:
                                  "drop-shadow(0 2px 6px rgba(201,162,39,0.5))",
                              }
                            : {}
                        }
                      />
                      {swatch.hex === "#c9a227" && (
                        <>
                          <path
                            d={swatch.blob}
                            fill="url(#goldLeaf)"
                            opacity="0.3"
                          />
                          <defs>
                            <pattern
                              id="goldLeaf"
                              patternUnits="userSpaceOnUse"
                              width="10"
                              height="10"
                              patternTransform="rotate(45)"
                            >
                              <line
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="10"
                                stroke="#f5f0e1"
                                strokeWidth="1"
                                opacity="0.4"
                              />
                            </pattern>
                          </defs>
                        </>
                      )}
                    </svg>
                    <div
                      className="absolute inset-0 flex flex-col items-center justify-center"
                      style={{ color: swatch.textOnSwatch }}
                    >
                      <span className="font-serif italic text-xs opacity-80">
                        {swatch.label}
                      </span>
                      <span className="font-serif font-bold text-base mt-0.5">
                        {swatch.hex}
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-serif italic text-sm text-[#2d5016] font-bold">
                      {swatch.name}
                    </p>
                    <p className="font-serif italic text-xs text-[#2d5016]/55 mt-0.5">
                      {swatch.desc}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════
          TYPOGRAPHY SHOWCASE
      ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-10 max-w-6xl mx-auto">
        <RevealBlock>
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <LeafSprig size={36} color="#2d5016" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl italic text-[#2d5016] mb-3">
              Living Typography
            </h2>
            <p className="font-serif italic text-[#c9a227]">
              Letters that grow like vines across the page
            </p>
          </div>
        </RevealBlock>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Scale showcase */}
          <RevealBlock delay={0.1} className="relative rounded-3xl border border-[#c9a227] bg-[#f5f0e1] p-8">
            <div className="absolute top-2 left-2">
              <CornerOrnament position="tl" size={44} />
            </div>
            <div className="absolute top-2 right-2">
              <CornerOrnament position="tr" size={44} />
            </div>
            <div className="space-y-4">
              <p className="font-serif text-5xl italic text-[#2d5016]">Display</p>
              <p className="font-serif text-4xl text-[#c9a227]">Heading One</p>
              <p className="font-serif text-3xl italic text-[#8b6db5]">Heading Two</p>
              <p className="font-serif text-2xl text-[#4a7c3f]">Heading Three</p>
              <p className="font-serif text-xl italic text-[#2d5016]/70">Subheading</p>
              <p className="font-serif text-base text-[#2d5016]/60 leading-relaxed">
                Body text flows with the natural rhythm of organic prose — unhurried, elegant, and full of quiet beauty.
              </p>
              <p className="font-serif text-sm italic text-[#c9a227]">
                Caption — gilded and understated
              </p>
            </div>
          </RevealBlock>

          {/* Decorated initial cap letter */}
          <RevealBlock delay={0.2} className="relative rounded-3xl border border-[#c9a227] bg-[#f5f0e1] p-8">
            <div className="absolute bottom-2 left-2">
              <CornerOrnament position="bl" size={44} />
            </div>
            <div className="absolute bottom-2 right-2">
              <CornerOrnament position="br" size={44} />
            </div>
            <h3 className="font-serif italic text-[#c9a227] text-sm mb-4">
              Botanical Initial Cap
            </h3>
            <p
              className="font-serif text-base text-[#2d5016]/80 leading-relaxed initial-cap"
            >
              rt Nouveau embraced nature as its highest muse. From the tendrils of ivy winding round iron gates, to the unfurling petals of a morning lily, every form was an invitation to beauty. The movement declared that design itself was a living thing, breathing and growing through the hands of its makers.
            </p>

            <div className="mt-8 pt-6 border-t border-[#c9a227]/30">
              <h3 className="font-serif italic text-[#c9a227] text-sm mb-4">
                Style Weights
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Italic", style: "italic", weight: "normal" },
                  { label: "Bold Italic", style: "italic", weight: "bold" },
                  { label: "Regular", style: "normal", weight: "normal" },
                  { label: "Bold", style: "normal", weight: "bold" },
                ].map((t) => (
                  <p
                    key={t.label}
                    className="font-serif text-lg text-[#2d5016]"
                    style={{ fontStyle: t.style, fontWeight: t.weight }}
                  >
                    {t.label} — The Garden Awaits
                  </p>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════
          DESIGN RULES
      ═══════════════════════════════════════════════ */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-16">
              <div className="flex justify-center mb-4">
                <IrisFlower size={40} color="#c9a227" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl italic text-[#2d5016] mb-3">
                The Laws of the Garden
              </h2>
              <p className="font-serif italic text-[#c9a227]">
                What thrives and what withers in Art Nouveau
              </p>
            </div>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Do list */}
            <RevealBlock delay={0.1}>
              <div className="relative rounded-3xl border border-[#4a7c3f] bg-[#f5f0e1] p-8">
                <div className="absolute top-2 left-2">
                  <CornerOrnament position="tl" size={44} />
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <LeafSprig size={28} color="#4a7c3f" />
                  <h3 className="font-serif italic text-2xl text-[#4a7c3f]">
                    What Blooms
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "Organic flowing curves in every UI element",
                    "Rounded-3xl and rounded-full — nothing sharper",
                    "Serif and italic typefaces for all headings",
                    "Gold glow on hover: 0 0 20px rgba(201,162,39,0.4)",
                    "Slow transitions: duration-500 minimum, duration-700 preferred",
                    "Botanical SVG ornaments at corners and dividers",
                    "Parchment #f5f0e1 as the base background",
                    "Radial gradient blooms on card hover",
                    "Natural, unhurried motion — like a plant growing",
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-[#4a7c3f]/15 border border-[#4a7c3f]/40 flex items-center justify-center flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#4a7c3f]" />
                      </div>
                      <span className="font-serif italic text-sm text-[#2d5016]/80 leading-snug">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Dont list */}
            <RevealBlock delay={0.2}>
              <div className="relative rounded-3xl border border-[#c9a227]/50 bg-[#f5f0e1] p-8">
                <div className="absolute top-2 right-2">
                  <CornerOrnament position="tr" size={44} />
                </div>
                <div className="flex items-center gap-3 mb-6">
                  <IrisFlower size={28} color="#c9a227" />
                  <h3 className="font-serif italic text-2xl text-[#c9a227]">
                    What Withers
                  </h3>
                </div>
                <ul className="space-y-4">
                  {[
                    "No sharp corners — rounded-none, rounded-sm, rounded-md are forbidden",
                    "No monospace or sans-serif headings",
                    "No hard box shadows — only soft golden glows",
                    "No duration-100 or duration-150 — too mechanical",
                    "No geometric or grid patterns — only organic forms",
                    "No cold blue or grey color dominance",
                    "No flat, minimal, or brutalist aesthetics",
                    "No abrupt state changes — all must flow",
                    "No design element devoid of natural inspiration",
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-[#c9a227]/10 border border-[#c9a227]/40 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-0.5 bg-[#c9a227]" />
                      </div>
                      <span className="font-serif italic text-sm text-[#2d5016]/70 leading-snug">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Toggle switches */}
          <RevealBlock delay={0.3} className="mt-10">
            <div className="relative rounded-3xl border border-[#c9a227] bg-[#f5f0e1] p-8">
              <div className="absolute top-2 left-2">
                <CornerOrnament position="tl" size={40} />
              </div>
              <div className="absolute top-2 right-2">
                <CornerOrnament position="tr" size={40} />
              </div>
              <h3 className="font-serif italic text-[#c9a227] text-xl mb-6 text-center">
                Style Preferences
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { label: "Botanical Borders", desc: "SVG vine ornaments" },
                  { label: "Gold Aura on Hover", desc: "Soft radial glow" },
                  { label: "Organic Motion", desc: "Slow flowing transitions" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-2xl border border-[#c9a227]/30 bg-white/40"
                  >
                    <div>
                      <p className="font-serif italic text-sm text-[#2d5016] font-bold">
                        {item.label}
                      </p>
                      <p className="font-serif italic text-xs text-[#2d5016]/50 mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggle(i)}
                      className="relative w-12 h-6 rounded-full transition-colors duration-500 flex-shrink-0"
                      style={{
                        backgroundColor: toggleStates[i] ? "#2d5016" : "#d4c9a8",
                      }}
                    >
                      <span
                        className="absolute top-0.5 left-0.5 w-5 h-5 bg-[#f5f0e1] rounded-full shadow-sm transition-transform duration-500"
                        style={{
                          transform: toggleStates[i]
                            ? "translateX(24px)"
                            : "translateX(0)",
                        }}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════ */}
      <footer className="py-16 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          {/* Ornamental footer divider */}
          <div className="flex items-center justify-center mb-10" aria-hidden="true">
            <svg width="480" height="48" viewBox="0 0 480 48" fill="none">
              <line x1="0" y1="24" x2="160" y2="24" stroke="#c9a227" strokeWidth="1" opacity="0.4" />
              <line x1="320" y1="24" x2="480" y2="24" stroke="#c9a227" strokeWidth="1" opacity="0.4" />
              <path
                d="M175 24 C185 8 195 4 240 4 C285 4 295 8 305 24 C295 40 285 44 240 44 C195 44 185 40 175 24Z"
                stroke="#c9a227"
                strokeWidth="1.5"
                fill="#c9a227"
                opacity="0.08"
              />
              <circle cx="240" cy="24" r="5" fill="#c9a227" opacity="0.6" />
              <ellipse cx="215" cy="24" rx="8" ry="12" fill="#4a7c3f" opacity="0.25" transform="rotate(-20 215 24)" />
              <ellipse cx="265" cy="24" rx="8" ry="12" fill="#4a7c3f" opacity="0.25" transform="rotate(20 265 24)" />
              <circle cx="168" cy="24" r="2.5" fill="#c9a227" opacity="0.4" />
              <circle cx="312" cy="24" r="2.5" fill="#c9a227" opacity="0.4" />
              <path
                d="M155 24 Q161 16 168 24 Q161 32 155 24Z"
                fill="#c9a227"
                opacity="0.35"
              />
              <path
                d="M325 24 Q319 16 312 24 Q319 32 325 24Z"
                fill="#c9a227"
                opacity="0.35"
              />
            </svg>
          </div>

          <div className="text-center space-y-4">
            <div className="flex justify-center gap-6 mb-4">
              <div className="botanical-hover">
                <IrisFlower size={32} color="#c9a227" />
              </div>
              <div className="botanical-hover">
                <LeafSprig size={32} color="#4a7c3f" />
              </div>
              <div className="botanical-hover">
                <IrisFlower size={32} color="#8b6db5" />
              </div>
            </div>

            <p className="font-serif text-2xl italic text-[#2d5016]">
              Art Nouveau
            </p>
            <p className="font-serif italic text-[#c9a227] text-base">
              Crafted with organic precision
            </p>
            <p className="font-serif italic text-sm text-[#2d5016]/50 max-w-sm mx-auto leading-relaxed">
              Where nature breathes through every pixel, and beauty blooms in the space between structure and form.
            </p>

            <div className="pt-6 flex items-center justify-center gap-8">
              <Link
                href="/styles/art-nouveau"
                className="font-serif italic text-sm text-[#2d5016]/60 hover:text-[#c9a227] transition-colors duration-500"
              >
                Documentation
              </Link>
              <span className="text-[#c9a227]/40">&#10022;</span>
              <Link
                href="/styles"
                className="font-serif italic text-sm text-[#2d5016]/60 hover:text-[#c9a227] transition-colors duration-500"
              >
                All Styles
              </Link>
              <span className="text-[#c9a227]/40">&#10022;</span>
              <Link
                href="/"
                className="font-serif italic text-sm text-[#2d5016]/60 hover:text-[#c9a227] transition-colors duration-500"
              >
                StyleKit Home
              </Link>
            </div>

            <p className="font-serif italic text-xs text-[#2d5016]/35 pt-4">
              StyleKit &middot; Art Nouveau Showcase
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
