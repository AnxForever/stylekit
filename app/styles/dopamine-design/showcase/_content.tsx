"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks                                                       */
/* ------------------------------------------------------------------ */

function useInView() {
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
      { threshold: 0.15 }
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
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating orb decoration                                            */
/* ------------------------------------------------------------------ */

function GradientOrb({
  size,
  color1,
  color2,
  top,
  left,
  delay = 0,
}: {
  size: number;
  color1: string;
  color2: string;
  top: string;
  left: string;
  delay?: number;
}) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color1} 0%, ${color2} 60%, transparent 100%)`,
        top,
        left,
        opacity: 0.35,
        filter: "blur(60px)",
        animation: `dopamine-float 6s ease-in-out ${delay}s infinite alternate`,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Geometric decoration shapes                                        */
/* ------------------------------------------------------------------ */

function GeometricDeco() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Triangle */}
      <div
        className="absolute"
        style={{
          top: "12%",
          right: "8%",
          width: 0,
          height: 0,
          borderLeft: "30px solid transparent",
          borderRight: "30px solid transparent",
          borderBottom: "52px solid rgba(255,190,11,0.25)",
          animation: "dopamine-spin 12s linear infinite",
        }}
      />
      {/* Circle */}
      <div
        className="absolute rounded-full"
        style={{
          bottom: "18%",
          left: "5%",
          width: 48,
          height: 48,
          border: "4px solid rgba(58,134,255,0.3)",
          animation: "dopamine-spin 8s linear infinite reverse",
        }}
      />
      {/* Hexagon via clip-path */}
      <div
        className="absolute"
        style={{
          top: "60%",
          right: "12%",
          width: 40,
          height: 40,
          background: "rgba(6,214,160,0.2)",
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          animation: "dopamine-float 5s ease-in-out 1s infinite alternate",
        }}
      />
      {/* Small diamond */}
      <div
        className="absolute"
        style={{
          top: "30%",
          left: "12%",
          width: 24,
          height: 24,
          background: "rgba(251,86,7,0.25)",
          transform: "rotate(45deg)",
          animation: "dopamine-float 4s ease-in-out 0.5s infinite alternate",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const palette = [
  { name: "Hot Pink", hex: "#ff006e", shadow: "0 8px 30px rgba(255,0,110,0.4)" },
  { name: "Electric Purple", hex: "#8338ec", shadow: "0 8px 30px rgba(131,56,236,0.35)" },
  { name: "Vivid Yellow", hex: "#ffbe0b", shadow: "0 8px 30px rgba(255,190,11,0.35)" },
  { name: "Ocean Blue", hex: "#3a86ff", shadow: "0 8px 30px rgba(58,134,255,0.3)" },
  { name: "Mint Green", hex: "#06d6a0", shadow: "0 8px 30px rgba(6,214,160,0.3)" },
  { name: "Blaze Orange", hex: "#fb5607", shadow: "0 8px 30px rgba(251,86,7,0.35)" },
];

const philosophyPoints = [
  {
    title: "Color Explosion",
    desc: "5-6 high-saturation colors working in harmony. No dull, no muted, no gray.",
    color: "#ff006e",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="#ff006e" opacity="0.15" />
        <circle cx="16" cy="16" r="8" fill="#ff006e" />
      </svg>
    ),
  },
  {
    title: "Bold Typography",
    desc: "Oversized fonts, heavy weights, tight leading. Every heading demands attention.",
    color: "#8338ec",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" rx="6" fill="#8338ec" opacity="0.15" />
        <text x="16" y="23" textAnchor="middle" fontSize="18" fontWeight="900" fill="#8338ec">A</text>
      </svg>
    ),
  },
  {
    title: "Rounded & Friendly",
    desc: "Large border-radius, pill shapes, bubble elements. Everything feels approachable.",
    color: "#3a86ff",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="2" y="8" width="28" height="16" rx="8" fill="#3a86ff" opacity="0.15" />
        <rect x="6" y="12" width="20" height="8" rx="4" fill="#3a86ff" />
      </svg>
    ),
  },
  {
    title: "Playful Motion",
    desc: "Elastic animations, overshoot, joyful micro-interactions on every element.",
    color: "#06d6a0",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M4 24 Q10 4 16 16 Q22 28 28 8" stroke="#06d6a0" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
];

const doRules = [
  "High-saturation colors only: #ff006e, #8338ec, #ffbe0b, #3a86ff, #06d6a0, #fb5607",
  "Maximum border-radius: rounded-full for buttons, rounded-3xl for cards",
  "Colored shadows on every elevated element",
  "font-black for headings, text-5xl+ for hero text",
  "Pill-shaped buttons with px-8 py-4",
  "hover:scale-105 + active:scale-95 on all interactive elements",
  "Gradient backgrounds: from-pink-500 via-purple-500 to-blue-500",
  "SVG geometric shapes and CSS orbs instead of emoji",
];

const dontRules = [
  "No gray backgrounds or gray text anywhere",
  "No small border-radius (rounded-sm, rounded-md)",
  "No black/gray shadows (shadow-md, shadow-lg)",
  "No serif fonts",
  "No desaturated or pastel colors",
  "No thin/light font weights for headings",
  "No generic emoji as decorative elements",
  "No corporate or serious typography",
];

/* ------------------------------------------------------------------ */
/*  Main showcase component                                            */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [activeColor, setActiveColor] = useState(0);
  const [btnPressed, setBtnPressed] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [toggleOn, setToggleOn] = useState(false);

  const keyframes = `
    @keyframes dopamine-float {
      0% { transform: translateY(0px); }
      100% { transform: translateY(-20px); }
    }
    @keyframes dopamine-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes dopamine-gradient {
      0% { background-position: 0% 50%; }
      100% { background-position: 100% 50%; }
    }
    @keyframes dopamine-pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
  `;

  return (
    <div
      style={{
        fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
        background: "#ffffff",
        color: "#1a1a2e",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      {/* ============================================================ */}
      {/*  NAV                                                          */}
      {/* ============================================================ */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(16px)",
          background: "rgba(255,255,255,0.85)",
          borderBottom: "1px solid rgba(131,56,236,0.1)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/styles/dopamine-design/showcase"
            className="text-xl font-black"
            style={{ color: "#ff006e" }}
          >
            Dopamine Design
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold" style={{ color: "#8338ec" }}>
              Live Showcase
            </span>
            <Link
              href={`/preview?url=/styles/dopamine-design/showcase`}
              className="px-4 py-2 text-sm font-bold rounded-full transition-all duration-200 hover:scale-105"
              style={{
                background: "rgba(131,56,236,0.1)",
                color: "#8338ec",
                border: "2px solid rgba(131,56,236,0.2)",
              }}
            >
              Preview
            </Link>
            <Link
              href="/styles/dopamine-design"
              className="px-5 py-2 text-sm font-bold text-white rounded-full transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #ff006e, #8338ec)",
                boxShadow: "0 6px 20px rgba(255,0,110,0.3)",
              }}
            >
              Docs →
            </Link>
          </div>
        </div>
      </nav>

      {/* ============================================================ */}
      {/*  HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <GeometricDeco />
        <GradientOrb size={400} color1="#ff006e" color2="#8338ec" top="-10%" left="-5%" />
        <GradientOrb size={300} color1="#3a86ff" color2="#06d6a0" top="60%" left="75%" delay={2} />
        <GradientOrb size={200} color1="#ffbe0b" color2="#fb5607" top="20%" left="85%" delay={1} />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <RevealBlock>
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold mb-8"
              style={{
                background: "linear-gradient(135deg, rgba(255,0,110,0.1), rgba(131,56,236,0.1))",
                color: "#ff006e",
                border: "2px solid rgba(255,0,110,0.15)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" fill="#ff006e" />
              </svg>
              2025-2026 Design Trend
            </div>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <h1
              className="text-5xl md:text-8xl font-black tracking-tight leading-[0.95] mb-6"
              style={{
                background: "linear-gradient(135deg, #ff006e 0%, #8338ec 40%, #3a86ff 70%, #06d6a0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Dopamine
              <br />
              Design.
            </h1>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto mb-10" style={{ color: "#555" }}>
              High-saturation neon colors. Bold typography. Joyful energy.
              <br />
              Colors that make you <span style={{ color: "#ff006e", fontWeight: 800 }}>feel alive</span>.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                className="px-8 py-4 text-lg font-bold text-white rounded-full transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #ff006e, #8338ec)",
                  boxShadow: "0 8px 30px rgba(255,0,110,0.4)",
                }}
              >
                Explore Style
              </button>
              <button
                className="px-8 py-4 text-lg font-bold rounded-full transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(131,56,236,0.08)",
                  color: "#8338ec",
                  border: "2px solid rgba(131,56,236,0.2)",
                }}
              >
                View Tokens
              </button>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PHILOSOPHY                                                    */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#faf5ff" }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#8338ec" }}>
              Philosophy
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-16" style={{ color: "#1a1a2e" }}>
              Design that sparks joy.
            </h2>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {philosophyPoints.map((p, i) => (
              <RevealBlock key={p.title} delay={i * 0.08}>
                <div
                  className="p-6 md:p-8 rounded-3xl transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1"
                  style={{
                    background: "#ffffff",
                    boxShadow: `0 8px 30px ${p.color}20`,
                    border: `2px solid ${p.color}15`,
                  }}
                >
                  <div className="mb-4">{p.icon}</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: p.color }}>
                    {p.title}
                  </h3>
                  <p className="text-sm font-medium leading-relaxed" style={{ color: "#666" }}>
                    {p.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  COLOR PALETTE                                                 */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#ff006e" }}>
              Color System
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-16">
              Six colors. Zero gray.
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {palette.map((c, i) => (
              <RevealBlock key={c.name} delay={i * 0.06}>
                <button
                  onClick={() => setActiveColor(i)}
                  className="w-full text-left rounded-3xl overflow-hidden transition-all duration-200 hover:scale-[1.03] hover:-translate-y-1"
                  style={{
                    boxShadow: activeColor === i ? c.shadow : "0 4px 15px rgba(0,0,0,0.06)",
                    border: activeColor === i ? `3px solid ${c.hex}` : "3px solid transparent",
                  }}
                >
                  <div
                    className="h-28 md:h-36"
                    style={{ background: c.hex }}
                  />
                  <div className="p-4 bg-white">
                    <p className="font-bold text-sm">{c.name}</p>
                    <p className="text-xs font-mono mt-1" style={{ color: "#999" }}>
                      {c.hex}
                    </p>
                  </div>
                </button>
              </RevealBlock>
            ))}
          </div>

          {/* Active color preview */}
          <RevealBlock delay={0.3}>
            <div
              className="mt-10 p-8 rounded-3xl text-white text-center transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${palette[activeColor].hex}, ${palette[(activeColor + 1) % palette.length].hex})`,
                boxShadow: palette[activeColor].shadow,
              }}
            >
              <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Active</p>
              <p className="text-3xl md:text-4xl font-black">{palette[activeColor].name}</p>
              <p className="font-mono text-sm mt-2 opacity-70">{palette[activeColor].hex}</p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  COMPONENT DEMOS                                               */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6" style={{ background: "#fff5f9" }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#fb5607" }}>
              Components
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-16">
              Built to feel alive.
            </h2>
          </RevealBlock>

          {/* Buttons row */}
          <RevealBlock delay={0.1}>
            <h3 className="text-lg font-bold mb-6" style={{ color: "#8338ec" }}>Buttons</h3>
            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onMouseDown={() => setBtnPressed(true)}
                onMouseUp={() => setBtnPressed(false)}
                onMouseLeave={() => setBtnPressed(false)}
                className="px-8 py-4 text-lg font-bold text-white rounded-full transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #ff006e, #8338ec)",
                  boxShadow: "0 8px 30px rgba(255,0,110,0.4)",
                  transform: btnPressed ? "scale(0.95)" : undefined,
                }}
              >
                Primary Action
              </button>
              <button
                className="px-8 py-4 text-lg font-bold text-white rounded-full transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
                style={{
                  background: "#3a86ff",
                  boxShadow: "0 8px 30px rgba(58,134,255,0.3)",
                }}
              >
                Secondary
              </button>
              <button
                className="px-8 py-4 text-lg font-bold rounded-full transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(255,0,110,0.08)",
                  color: "#ff006e",
                  border: "2px solid rgba(255,0,110,0.2)",
                }}
              >
                Ghost Button
              </button>
              <button
                className="px-8 py-4 text-lg font-bold text-white rounded-full transition-all duration-200 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #ffbe0b, #fb5607)",
                  boxShadow: "0 8px 30px rgba(251,86,7,0.35)",
                }}
              >
                Warm CTA
              </button>
            </div>
          </RevealBlock>

          {/* Cards */}
          <RevealBlock delay={0.15}>
            <h3 className="text-lg font-bold mb-6" style={{ color: "#8338ec" }}>Cards</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {[
                {
                  gradient: "linear-gradient(135deg, #ff006e, #8338ec)",
                  shadow: "0 16px 50px rgba(255,0,110,0.3)",
                  title: "Dopamine Boost",
                  desc: "Colors that make you feel alive. Bold, bright, and unapologetically joyful.",
                  badge: "Hot",
                  badgeBg: "rgba(255,255,255,0.2)",
                },
                {
                  gradient: "linear-gradient(135deg, #3a86ff, #06d6a0)",
                  shadow: "0 16px 50px rgba(58,134,255,0.25)",
                  title: "Ocean Breeze",
                  desc: "Cool tones that energize without overwhelming. Fresh and inviting.",
                  badge: "New",
                  badgeBg: "rgba(255,255,255,0.2)",
                },
                {
                  gradient: "linear-gradient(135deg, #ffbe0b, #fb5607)",
                  shadow: "0 16px 50px rgba(251,86,7,0.25)",
                  title: "Solar Flare",
                  desc: "Warm energy that radiates confidence. Impossible to ignore.",
                  badge: "Trending",
                  badgeBg: "rgba(255,255,255,0.2)",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="p-8 rounded-3xl text-white transition-all duration-200 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer"
                  style={{
                    background: card.gradient,
                    boxShadow: card.shadow,
                  }}
                >
                  <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
                    style={{ background: card.badgeBg, backdropFilter: "blur(8px)" }}
                  >
                    {card.badge}
                  </div>
                  <h4 className="text-2xl font-black mb-2">{card.title}</h4>
                  <p className="text-white/80 leading-relaxed text-sm">{card.desc}</p>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Input & Toggle */}
          <RevealBlock delay={0.2}>
            <h3 className="text-lg font-bold mb-6" style={{ color: "#8338ec" }}>Inputs & Controls</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="p-8 rounded-3xl bg-white" style={{ boxShadow: "0 8px 30px rgba(131,56,236,0.1)" }}>
                <label className="block text-sm font-bold mb-2" style={{ color: "#8338ec" }}>
                  Your Name
                </label>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl text-base font-medium transition-all duration-200 outline-none"
                  placeholder="Type something fun..."
                  style={{
                    border: "2px solid rgba(131,56,236,0.2)",
                    background: "#faf5ff",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#ff006e";
                    e.currentTarget.style.boxShadow = "0 0 0 4px rgba(255,0,110,0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(131,56,236,0.2)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              <div className="p-8 rounded-3xl bg-white flex flex-col justify-center" style={{ boxShadow: "0 8px 30px rgba(58,134,255,0.1)" }}>
                <label className="block text-sm font-bold mb-4" style={{ color: "#3a86ff" }}>
                  Dopamine Mode
                </label>
                <button
                  onClick={() => setToggleOn((v) => !v)}
                  className="relative w-16 h-9 rounded-full transition-all duration-200"
                  style={{
                    background: toggleOn
                      ? "linear-gradient(135deg, #ff006e, #8338ec)"
                      : "rgba(0,0,0,0.1)",
                    boxShadow: toggleOn ? "0 4px 15px rgba(255,0,110,0.3)" : "none",
                  }}
                >
                  <div
                    className="absolute top-1 w-7 h-7 rounded-full bg-white transition-all duration-200"
                    style={{
                      left: toggleOn ? "calc(100% - 32px)" : "4px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    }}
                  />
                </button>
                <p className="text-sm font-medium mt-3" style={{ color: "#888" }}>
                  {toggleOn ? "Activated — maximum vibes" : "Tap to activate"}
                </p>
              </div>
            </div>
          </RevealBlock>

          {/* Badges */}
          <RevealBlock delay={0.25}>
            <h3 className="text-lg font-bold mb-6" style={{ color: "#8338ec" }}>Badges & Tags</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Featured", bg: "#ff006e", shadow: "rgba(255,0,110,0.3)" },
                { label: "Trending", bg: "#8338ec", shadow: "rgba(131,56,236,0.3)" },
                { label: "New Release", bg: "#3a86ff", shadow: "rgba(58,134,255,0.3)" },
                { label: "Popular", bg: "#06d6a0", shadow: "rgba(6,214,160,0.3)" },
                { label: "Limited", bg: "#fb5607", shadow: "rgba(251,86,7,0.3)" },
                { label: "Sale", bg: "#ffbe0b", shadow: "rgba(255,190,11,0.3)" },
              ].map((b) => (
                <span
                  key={b.label}
                  className="px-5 py-2 rounded-full text-sm font-bold text-white transition-all duration-200 hover:scale-105 cursor-default"
                  style={{ background: b.bg, boxShadow: `0 4px 15px ${b.shadow}` }}
                >
                  {b.label}
                </span>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DESIGN RULES                                                  */}
      {/* ============================================================ */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "#06d6a0" }}>
              Design Rules
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-16">
              The dopamine code.
            </h2>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            <RevealBlock delay={0.1}>
              <div
                className="p-8 rounded-3xl h-full"
                style={{
                  background: "linear-gradient(135deg, rgba(6,214,160,0.06), rgba(58,134,255,0.06))",
                  border: "2px solid rgba(6,214,160,0.12)",
                }}
              >
                <h3 className="text-xl font-bold mb-6" style={{ color: "#06d6a0" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="inline mr-2 -mt-0.5">
                    <circle cx="10" cy="10" r="9" fill="#06d6a0" opacity="0.15" />
                    <path d="M6 10l3 3 5-6" stroke="#06d6a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Do
                </h3>
                <ul className="space-y-3">
                  {doRules.map((rule, i) => (
                    <li key={i} className="flex gap-3 text-sm font-medium" style={{ color: "#444" }}>
                      <span style={{ color: "#06d6a0", fontWeight: 700, flexShrink: 0 }}>+</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.15}>
              <div
                className="p-8 rounded-3xl h-full"
                style={{
                  background: "linear-gradient(135deg, rgba(255,0,110,0.06), rgba(251,86,7,0.06))",
                  border: "2px solid rgba(255,0,110,0.12)",
                }}
              >
                <h3 className="text-xl font-bold mb-6" style={{ color: "#ff006e" }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="inline mr-2 -mt-0.5">
                    <circle cx="10" cy="10" r="9" fill="#ff006e" opacity="0.15" />
                    <path d="M7 7l6 6M13 7l-6 6" stroke="#ff006e" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Don&apos;t
                </h3>
                <ul className="space-y-3">
                  {dontRules.map((rule, i) => (
                    <li key={i} className="flex gap-3 text-sm font-medium" style={{ color: "#444" }}>
                      <span style={{ color: "#ff006e", fontWeight: 700, flexShrink: 0 }}>-</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                        */}
      {/* ============================================================ */}
      <footer
        className="py-12 px-6 text-center"
        style={{
          background: "linear-gradient(135deg, #ff006e, #8338ec, #3a86ff)",
        }}
      >
        <p className="text-white/90 text-sm font-semibold">
          Dopamine Design Showcase{" "}
          <span className="opacity-60">
            · Part of{" "}
            <Link href="/" className="underline hover:opacity-100 transition-opacity">
              StyleKit
            </Link>
          </span>
        </p>
      </footer>
    </div>
  );
}
