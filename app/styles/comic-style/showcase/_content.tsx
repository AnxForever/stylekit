"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────
   useInView hook
───────────────────────────────────────── */

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

/* ─────────────────────────────────────────
   RevealBlock
───────────────────────────────────────── */

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
        transition: `opacity 0.5s ease-out ${delay}s, transform 0.5s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   SpeechBubble
───────────────────────────────────────── */

function SpeechBubble({
  children,
  color = "#ffcc00",
  textColor = "#1a1a1a",
  direction = "left",
  className = "",
}: {
  children: React.ReactNode;
  color?: string;
  textColor?: string;
  direction?: "left" | "right";
  className?: string;
}) {
  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className="relative border-4 border-black px-5 py-3 font-black uppercase text-sm leading-tight"
        style={{
          backgroundColor: color,
          color: textColor,
          borderRadius: "18px",
          boxShadow: "3px 3px 0 #000",
        }}
      >
        {children}
        {/* Tail */}
        <svg
          width="26"
          height="22"
          viewBox="0 0 26 22"
          className="absolute"
          style={{
            bottom: "-22px",
            left: direction === "left" ? "22px" : "auto",
            right: direction === "right" ? "22px" : "auto",
          }}
        >
          {/* Stroke triangle */}
          <polygon
            points="0,0 26,0 10,22"
            fill="#000"
          />
          {/* Fill triangle (slightly inset) */}
          <polygon
            points="3,0 23,0 11,18"
            fill={color}
          />
          {/* Hide top seam */}
          <rect x="-2" y="-2" width="30" height="7" fill={color} />
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   ThoughtBubble
───────────────────────────────────────── */

function ThoughtBubble({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className="border-4 border-black px-6 py-4 font-black uppercase text-black text-sm text-center"
        style={{
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          boxShadow: "3px 3px 0 #000",
        }}
      >
        {children}
      </div>
      <div
        className="absolute border-4 border-black bg-white"
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          bottom: -18,
          left: 26,
          boxShadow: "2px 2px 0 #000",
        }}
      />
      <div
        className="absolute border-4 border-black bg-white"
        style={{
          width: 9,
          height: 9,
          borderRadius: "50%",
          bottom: -30,
          left: 18,
          boxShadow: "1px 1px 0 #000",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   ActionBurst (star polygon)
───────────────────────────────────────── */

function ActionBurst({
  word,
  color = "#ff3333",
  textColor = "#ffffff",
  size = "md",
  rotate = 0,
  className = "",
}: {
  word: string;
  color?: string;
  textColor?: string;
  size?: "sm" | "md" | "lg";
  rotate?: number;
  className?: string;
}) {
  const sizes = { sm: 84, md: 112, lg: 144 };
  const fontSizes = { sm: "0.6rem", md: "0.8rem", lg: "1rem" };
  const px = sizes[size];
  return (
    <div
      className={`flex items-center justify-center font-black uppercase select-none ${className}`}
      style={{
        width: px,
        height: px,
        backgroundColor: color,
        color: textColor,
        fontSize: fontSizes[size],
        letterSpacing: "0.05em",
        transform: `rotate(${rotate}deg)`,
        clipPath:
          "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        textShadow: "1px 1px 0 rgba(0,0,0,0.35)",
      }}
    >
      {word}
    </div>
  );
}

/* ─────────────────────────────────────────
   ComicButton
───────────────────────────────────────── */

function ComicButton({
  children,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
}) {
  const variantClasses: Record<string, string> = {
    primary:
      "bg-[#ff3333] text-white border-4 border-black shadow-[4px_4px_0_#000] hover:scale-110 hover:-rotate-3 active:shadow-none active:translate-x-[2px] active:translate-y-[2px]",
    secondary:
      "bg-[#ffcc00] text-black border-4 border-black shadow-[4px_4px_0_#000] hover:scale-110 hover:-rotate-3 active:shadow-none active:translate-x-[2px] active:translate-y-[2px]",
    outline:
      "bg-white text-black border-4 border-black shadow-[4px_4px_0_#000] hover:scale-110 hover:-rotate-3 active:shadow-none active:translate-x-[2px] active:translate-y-[2px]",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-6 py-3 font-black uppercase tracking-widest text-sm transition-all duration-100 ease-out ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
}

/* ─────────────────────────────────────────
   ComicPanel wrapper
───────────────────────────────────────── */

function ComicPanel({
  children,
  className = "",
  accentColor = "#000",
}: {
  children: React.ReactNode;
  className?: string;
  accentColor?: string;
}) {
  return (
    <div
      className={`border-4 border-black overflow-hidden ${className}`}
      style={{ boxShadow: `6px 6px 0 ${accentColor}` }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   Static data
───────────────────────────────────────── */

const colorSwatches = [
  { hex: "#ff3333", label: "Danger Red", word: "POW!", textColor: "#fff" },
  { hex: "#ffcc00", label: "Action Yellow", word: "BAM!", textColor: "#000" },
  { hex: "#3366ff", label: "Hero Blue", word: "ZAP!", textColor: "#fff" },
  { hex: "#33cc33", label: "Victory Green", word: "KA-BOOM!", textColor: "#fff" },
];

const featureCards = [
  {
    icon: "\u2726",
    iconBg: "#ff3333",
    title: "Bold Ink Lines",
    desc: "Every border is 4px solid black. Ink is the law.",
  },
  {
    icon: "◉",
    iconBg: "#ffcc00",
    title: "Halftone Texture",
    desc: "Radial-gradient dots mimic vintage newsprint printing.",
  },
  {
    icon: "\u2605",
    iconBg: "#3366ff",
    title: "Primary Palette",
    desc: "Red, Yellow, Blue, Green — four pillars of comic color.",
  },
  {
    icon: "\u26A1",
    iconBg: "#33cc33",
    title: "Exaggerated Motion",
    desc: "scale-110, -rotate-3, 100ms — everything snaps and pops.",
  },
];

const doRules = [
  "border-4 border-black on every element",
  "Hard offset shadows: shadow-[4px_4px_0_#000]",
  "ALL-CAPS font-black uppercase always",
  "ease-out or linear transitions only",
  "Halftone radial-gradient dot backgrounds",
];

const dontRules = [
  "rounded-* (speech bubbles use rounded-2xl only)",
  "shadow-sm or any soft/blurred shadows",
  "Gradients — use flat primary fills",
  "ease-in-out timing functions",
  "Serif or thin-weight fonts",
];

/* ─────────────────────────────────────────
   Main component
───────────────────────────────────────── */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"buttons" | "cards" | "bubbles">("buttons");
  const [pressedLabel, setPressedLabel] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  function handlePress(label: string) {
    setPressedLabel(label);
    setTimeout(() => setPressedLabel(null), 600);
  }

  return (
    <div
      className="min-h-screen text-[#1a1a1a]"
      style={{ backgroundColor: "#fffef8", fontFamily: "'Arial Black', 'Arial Bold', Gadget, sans-serif" }}
    >
      <style>{`
        @keyframes comic-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes comic-marquee-rev {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @keyframes burst-in {
          0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
          70%  { transform: scale(1.2) rotate(5deg); opacity: 1; }
          100% { transform: scale(1)   rotate(0deg);  opacity: 1; }
        }
        @keyframes badge-pop {
          0%   { transform: scale(0); }
          70%  { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .comic-halftone {
          background-image: radial-gradient(circle, #1a1a1a 1px, transparent 1px);
          background-size: 12px 12px;
        }
        .comic-halftone-light {
          background-image: radial-gradient(circle, #1a1a1a 1px, transparent 1px);
          background-size: 10px 10px;
        }
        .speed-lines {
          background-image: repeating-conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            transparent 7deg,
            rgba(26,26,26,0.05) 7deg,
            rgba(26,26,26,0.05) 8deg
          );
        }
        .comic-card-hover {
          transition: transform 0.1s ease-out, box-shadow 0.1s ease-out;
        }
        .comic-card-hover:hover {
          transform: scale(1.05) rotate(-1deg);
          box-shadow: 8px 8px 0 #000;
        }
        .panel-lift {
          transition: transform 0.1s ease-out, box-shadow 0.1s ease-out;
        }
        .panel-lift:hover {
          transform: translate(-3px, -3px);
          box-shadow: 9px 9px 0 #ff3333;
        }
        .nav-pill:hover {
          background-color: #ff3333;
          color: #ffffff;
        }
        .burst-appear {
          animation: burst-in 0.35s ease-out forwards;
        }
        .halftone-reveal-overlay {
          transition: opacity 0.1s ease-out;
        }
      `}</style>

      {/* ═══════════════════════════════════
          NAV
      ═══════════════════════════════════ */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b-4 border-black"
        style={{ backgroundColor: "#fffef8" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Wordmark */}
            <Link href="/styles/comic-style/showcase" className="flex items-center gap-3">
              <div
                className="border-4 border-black px-3 py-1 font-black uppercase tracking-widest text-sm"
                style={{ backgroundColor: "#ff3333", color: "#fff", boxShadow: "3px 3px 0 #000" }}
              >
                COMIC
              </div>
              <span className="font-black uppercase tracking-widest text-sm hidden sm:block">STYLE</span>
            </Link>

            {/* Links */}
            <nav className="flex items-center gap-2">
              {(
                [
                  { label: "DOCS", href: "/styles/comic-style" },
                  { label: "STYLES", href: "/styles" },
                ] as const
              ).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="nav-pill border-4 border-black px-3 py-1 font-black uppercase tracking-widest text-xs transition-colors duration-100 ease-out"
                  style={{ boxShadow: "2px 2px 0 #000" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════
          HERO
      ═══════════════════════════════════ */}
      <section className="pt-28 pb-12 px-4 md:px-8 max-w-7xl mx-auto relative overflow-hidden">
        {/* Halftone dot field */}
        <div
          className="absolute inset-0 comic-halftone pointer-events-none"
          style={{ opacity: 0.055 }}
        />

        {/* Radial speed lines */}
        <div
          className="absolute inset-0 speed-lines pointer-events-none"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transition: "opacity 0.8s ease-out 0.4s",
          }}
        />

        {/* Burst — top right */}
        <div
          className="absolute top-20 right-4 md:right-14 pointer-events-none"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "scale(1) rotate(14deg)" : "scale(0) rotate(14deg)",
            transition: "opacity 0.35s ease-out 0.65s, transform 0.35s ease-out 0.65s",
          }}
        >
          <ActionBurst word="WOW!" color="#3366ff" textColor="#fff" size="lg" rotate={14} />
        </div>

        {/* Burst — left (desktop) */}
        <div
          className="absolute top-52 left-2 md:left-6 pointer-events-none hidden md:block"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "scale(1) rotate(-10deg)" : "scale(0) rotate(-10deg)",
            transition: "opacity 0.35s ease-out 0.8s, transform 0.35s ease-out 0.8s",
          }}
        >
          <ActionBurst word="NEW!" color="#33cc33" textColor="#fff" size="md" rotate={-10} />
        </div>

        {/* Title card */}
        <div
          className="relative z-10 border-4 border-black p-6 md:p-10 mb-10 max-w-4xl"
          style={{
            backgroundColor: "#fffef8",
            boxShadow: heroRevealed ? "8px 8px 0 #000" : "0px 0px 0 #000",
            transform: heroRevealed ? "translateY(0) rotate(-0.5deg)" : "translateY(40px)",
            opacity: heroRevealed ? 1 : 0,
            transition:
              "box-shadow 0.5s ease-out, transform 0.5s ease-out, opacity 0.5s ease-out",
          }}
        >
          {/* Caption bar */}
          <div
            className="border-b-4 border-black pb-3 mb-6 font-black uppercase tracking-widest text-xs"
            style={{ color: "#ff3333" }}
          >
            ISSUE #001 — ORIGIN STORY
          </div>

          <h1
            className="font-black uppercase leading-none mb-6"
            style={{
              fontSize: "clamp(2.8rem, 8vw, 6rem)",
              letterSpacing: "-0.02em",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s",
            }}
          >
            COMIC
            <br />
            <span style={{ color: "#ff3333", WebkitTextStroke: "2px #000" }}>STYLE</span>
            <br />
            <span
              style={{
                fontSize: "clamp(1.4rem, 4vw, 3rem)",
                color: "#3366ff",
              }}
            >
              DESIGN KIT
            </span>
          </h1>

          {/* Speech bubble subtitle */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.5s ease-out 0.4s",
              marginTop: "2rem",
            }}
          >
            <SpeechBubble color="#ffcc00" textColor="#1a1a1a" direction="left">
              Bold ink lines, halftone dots &amp; primary color explosions!
            </SpeechBubble>
          </div>
        </div>

        {/* Hero CTA row */}
        <div
          className="relative z-10 flex flex-col sm:flex-row gap-5 items-start"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.5s ease-out 0.55s, transform 0.5s ease-out 0.55s",
          }}
        >
          <div
            className="border-4 border-black p-4 max-w-sm"
            style={{ backgroundColor: "#3366ff", color: "#fff", boxShadow: "4px 4px 0 #000" }}
          >
            <p className="font-black uppercase tracking-wider text-sm leading-relaxed">
              Every element hand-inked. Every shadow hard-offset. Every word shouted in caps.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-1">
            <ComicButton variant="primary" onClick={() => handlePress("hero-primary")}>
              {pressedLabel === "hero-primary" ? "KAPOW!" : "EXPLORE NOW"}
            </ComicButton>
            <ComicButton variant="secondary" onClick={() => handlePress("hero-secondary")}>
              {pressedLabel === "hero-secondary" ? "ZAP!" : "READ DOCS"}
            </ComicButton>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          MARQUEE TICKER
      ═══════════════════════════════════ */}
      <div
        className="w-full overflow-hidden border-y-4 border-black py-3"
        style={{ backgroundColor: "#ff3333" }}
      >
        <div
          className="flex w-[200%]"
          style={{ animation: "comic-marquee 18s linear infinite" }}
        >
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex-1 flex justify-around items-center font-black uppercase tracking-widest text-xs text-white"
            >
              <span>COMIC STYLE</span>
              <span className="text-[#ffcc00]">&#9733;</span>
              <span>BOLD INK LINES</span>
              <span className="text-[#ffcc00]">&#9733;</span>
              <span>HALFTONE DOTS</span>
              <span className="text-[#ffcc00]">&#9733;</span>
              <span>PRIMARY COLORS</span>
              <span className="text-[#ffcc00]">&#9733;</span>
              <span>PANEL LAYOUTS</span>
              <span className="text-[#ffcc00]">&#9733;</span>
              <span>ACTION WORDS</span>
              <span className="text-[#ffcc00]">&#9733;</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════
          PANEL GRID
      ═══════════════════════════════════ */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <RevealBlock className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <ActionBurst word="EPIC!" color="#ffcc00" textColor="#000" size="sm" />
            <h2
              className="font-black uppercase tracking-tight"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}
            >
              PANEL LAYOUTS
            </h2>
          </div>
          <p className="font-black uppercase tracking-wider text-sm" style={{ color: "#3366ff" }}>
            Comic grid — thick borders, variable sizes, storytelling composition
          </p>
        </RevealBlock>

        {/* Variable panel grid */}
        <div className="grid grid-cols-3 grid-rows-2 gap-3 h-[480px] md:h-[560px]">
          {/* Wide panel — col-span-2 */}
          <RevealBlock delay={0} className="col-span-2 row-span-1 h-full">
            <div
              className="panel-lift border-4 border-black h-full overflow-hidden relative group cursor-pointer"
              style={{ boxShadow: "6px 6px 0 #000" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/comic-panel1/800/400"
                alt="Wide comic panel"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-100 ease-out"
              />
              <div
                className="absolute inset-0 comic-halftone halftone-reveal-overlay opacity-0 group-hover:opacity-20"
              />
              <div
                className="absolute bottom-0 left-0 right-0 border-t-4 border-black px-4 py-2 font-black uppercase text-xs"
                style={{ backgroundColor: "#fffef8" }}
              >
                The hero arrives in the city...
              </div>
              <div className="absolute top-3 right-3">
                <SpeechBubble color="#ffcc00" textColor="#1a1a1a" direction="right">
                  To the rescue!
                </SpeechBubble>
              </div>
            </div>
          </RevealBlock>

          {/* Tall panel — row-span-2 */}
          <RevealBlock delay={0.1} className="col-span-1 row-span-2 h-full">
            <div
              className="panel-lift border-4 border-black h-full overflow-hidden relative group cursor-pointer"
              style={{ boxShadow: "6px 6px 0 #000" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/comic-panel2/400/700"
                alt="Tall comic panel"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-100 ease-out"
              />
              <div
                className="absolute inset-0 halftone-reveal-overlay opacity-0 group-hover:opacity-15"
                style={{
                  backgroundImage: "radial-gradient(circle, #ff3333 1px, transparent 1px)",
                  backgroundSize: "10px 10px",
                }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 border-t-4 border-black px-3 py-2 font-black uppercase text-xs"
                style={{ backgroundColor: "#ff3333", color: "#fff" }}
              >
                Villain lurks...
              </div>
            </div>
          </RevealBlock>

          {/* Small panel 1 */}
          <RevealBlock delay={0.2} className="col-span-1 row-span-1 h-full">
            <div
              className="panel-lift border-4 border-black h-full overflow-hidden relative group cursor-pointer"
              style={{ boxShadow: "6px 6px 0 #000" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/comic-panel3/400/300"
                alt="Small comic panel"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-100 ease-out"
              />
              <div
                className="absolute inset-0 halftone-reveal-overlay opacity-0 group-hover:opacity-20"
                style={{
                  backgroundImage: "radial-gradient(circle, #ffcc00 1.5px, transparent 1.5px)",
                  backgroundSize: "14px 14px",
                }}
              />
              <div className="absolute top-2 left-2">
                <ActionBurst word="BAM!" color="#ffcc00" textColor="#000" size="sm" />
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 border-t-4 border-black px-3 py-1 font-black uppercase text-xs"
                style={{ backgroundColor: "#fffef8" }}
              >
                Battle begins!
              </div>
            </div>
          </RevealBlock>

          {/* Small panel 2 */}
          <RevealBlock delay={0.3} className="col-span-1 row-span-1 h-full">
            <div
              className="panel-lift border-4 border-black h-full overflow-hidden relative group cursor-pointer"
              style={{ boxShadow: "6px 6px 0 #000" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/comic-panel4/400/300"
                alt="Victory comic panel"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-100 ease-out"
              />
              <div className="absolute top-2 right-2">
                <ActionBurst word="WIN!" color="#33cc33" textColor="#fff" size="sm" rotate={10} />
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 border-t-4 border-black px-3 py-1 font-black uppercase text-xs"
                style={{ backgroundColor: "#33cc33", color: "#fff" }}
              >
                Victory — at last!
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ═══════════════════════════════════
          COMPONENT DEMOS
      ═══════════════════════════════════ */}
      <section className="py-16 px-4 md:px-8" style={{ backgroundColor: "#1a1a1a" }}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-10 text-white">
            <div className="flex items-center gap-4 mb-2">
              <ActionBurst word="POW!" color="#ff3333" textColor="#fff" size="sm" />
              <h2
                className="font-black uppercase tracking-tight"
                style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}
              >
                COMPONENTS
              </h2>
            </div>
            <p className="font-black uppercase tracking-wider text-sm" style={{ color: "#ffcc00" }}>
              Interactive demo — click the tabs below
            </p>
          </RevealBlock>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {(["buttons", "cards", "bubbles"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className="px-5 py-2 border-4 border-black font-black uppercase tracking-widest text-xs transition-all duration-100 ease-out hover:scale-105"
                style={{
                  backgroundColor: activeTab === tab ? "#ff3333" : "#fffef8",
                  color: activeTab === tab ? "#fff" : "#1a1a1a",
                  boxShadow:
                    activeTab === tab ? "0px 0px 0 #000" : "4px 4px 0 #fffef8",
                  transform: activeTab === tab ? "translate(3px, 3px)" : undefined,
                }}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Tab panel */}
          <div
            className="border-4 border-[#fffef8] p-6 md:p-10"
            style={{ boxShadow: "8px 8px 0 #ff3333", backgroundColor: "#fffef8" }}
          >
            {/* BUTTONS */}
            {activeTab === "buttons" && (
              <div>
                <p className="font-black uppercase tracking-widest text-sm mb-8 text-black">
                  Button Variants — Heavy Ink Press Interaction
                </p>
                <div className="flex flex-wrap gap-4 mb-10">
                  <ComicButton variant="primary" onClick={() => handlePress("tab-primary")}>
                    {pressedLabel === "tab-primary" ? "POW!" : "PRIMARY ACTION"}
                  </ComicButton>
                  <ComicButton variant="secondary" onClick={() => handlePress("tab-secondary")}>
                    {pressedLabel === "tab-secondary" ? "ZAP!" : "SECONDARY"}
                  </ComicButton>
                  <ComicButton variant="outline" onClick={() => handlePress("tab-outline")}>
                    {pressedLabel === "tab-outline" ? "BAM!" : "OUTLINE"}
                  </ComicButton>
                </div>
                <div
                  className="border-4 border-black p-4 font-black uppercase tracking-wider text-xs"
                  style={{ backgroundColor: "#ffcc00" }}
                >
                  <span className="block mb-1 text-black">INTERACTION PHYSICS:</span>
                  <span style={{ color: "#ff3333" }}>hover:scale-110 hover:-rotate-3</span>
                  <span className="mx-2 text-black">|</span>
                  <span style={{ color: "#3366ff" }}>
                    active:shadow-none active:translate-x-[2px] active:translate-y-[2px]
                  </span>
                </div>
              </div>
            )}

            {/* CARDS */}
            {activeTab === "cards" && (
              <div>
                <p className="font-black uppercase tracking-widest text-sm mb-8 text-black">
                  Card Variants — Pop-Art Explosion on Hover
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {featureCards.map((card, i) => (
                    <RevealBlock key={card.title} delay={i * 0.07}>
                      <div
                        className="comic-card-hover border-4 border-black cursor-pointer"
                        style={{ boxShadow: "6px 6px 0 #000", backgroundColor: "#fffef8" }}
                      >
                        <div
                          className="border-b-4 border-black p-4 flex items-center gap-3"
                          style={{ backgroundColor: card.iconBg }}
                        >
                          <span className="text-2xl font-black text-white">{card.icon}</span>
                          <span className="font-black uppercase tracking-widest text-xs text-white">
                            {card.title}
                          </span>
                        </div>
                        <div className="p-4">
                          <p className="font-black uppercase tracking-wide text-xs leading-relaxed">
                            {card.desc}
                          </p>
                        </div>
                      </div>
                    </RevealBlock>
                  ))}
                </div>
              </div>
            )}

            {/* BUBBLES */}
            {activeTab === "bubbles" && (
              <div>
                <p className="font-black uppercase tracking-widest text-sm mb-10 text-black">
                  Speech &amp; Thought Bubbles + Action Bursts
                </p>
                <div className="flex flex-col gap-14">
                  {/* Speech bubbles row */}
                  <div className="flex flex-wrap gap-12 items-end">
                    <div>
                      <p className="font-black uppercase tracking-widest text-xs mb-8 text-black/40">
                        SPEECH — RED
                      </p>
                      <SpeechBubble color="#ff3333" textColor="#fff" direction="left">
                        With great power...
                      </SpeechBubble>
                    </div>
                    <div>
                      <p className="font-black uppercase tracking-widest text-xs mb-8 text-black/40">
                        SPEECH — YELLOW
                      </p>
                      <SpeechBubble color="#ffcc00" textColor="#1a1a1a" direction="left">
                        Comes great responsibility!
                      </SpeechBubble>
                    </div>
                    <div>
                      <p className="font-black uppercase tracking-widest text-xs mb-8 text-black/40">
                        SPEECH — BLUE
                      </p>
                      <SpeechBubble color="#3366ff" textColor="#fff" direction="right">
                        I am the hero!
                      </SpeechBubble>
                    </div>
                  </div>

                  {/* Thought bubble + action bursts row */}
                  <div className="flex flex-wrap gap-12 items-center">
                    <div>
                      <p className="font-black uppercase tracking-widest text-xs mb-12 text-black/40">
                        THOUGHT BUBBLE
                      </p>
                      <ThoughtBubble>
                        Hmm... should I<br />use rounded corners?
                      </ThoughtBubble>
                    </div>
                    <div>
                      <p className="font-black uppercase tracking-widest text-xs mb-4 text-black/40">
                        ACTION BURSTS
                      </p>
                      <div className="flex flex-wrap gap-3 items-center">
                        <ActionBurst word="POW!" color="#ff3333" textColor="#fff" size="md" rotate={-5} />
                        <ActionBurst word="ZAP!" color="#3366ff" textColor="#fff" size="sm" rotate={8} />
                        <ActionBurst word="KA-BOOM!" color="#33cc33" textColor="#fff" size="lg" rotate={-3} />
                        <ActionBurst word="BAM!" color="#ffcc00" textColor="#000" size="sm" rotate={12} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          COLOR PALETTE
      ═══════════════════════════════════ */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <RevealBlock className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <ActionBurst word="ZAP!" color="#3366ff" textColor="#fff" size="sm" />
            <h2
              className="font-black uppercase tracking-tight"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}
            >
              COLOR PALETTE
            </h2>
          </div>
          <p className="font-black uppercase tracking-wider text-sm text-black/50">
            Four pillars of comic-book color — flat, bold, unmistakable
          </p>
        </RevealBlock>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {colorSwatches.map((sw, i) => (
            <RevealBlock key={sw.hex} delay={i * 0.08}>
              <div
                className="border-4 border-black group cursor-pointer transition-all duration-100 ease-out hover:-translate-y-2 hover:-rotate-2"
                style={{ boxShadow: "6px 6px 0 #000" }}
              >
                <div
                  className="h-36 md:h-48 flex items-center justify-center border-b-4 border-black relative overflow-hidden"
                  style={{ backgroundColor: sw.hex }}
                >
                  <div
                    className="absolute inset-0 halftone-reveal-overlay opacity-0 group-hover:opacity-15"
                    style={{
                      backgroundImage: `radial-gradient(circle, ${sw.textColor === "#fff" ? "#000" : "#fff"} 1px, transparent 1px)`,
                      backgroundSize: "10px 10px",
                    }}
                  />
                  <span
                    className="font-black uppercase text-2xl md:text-3xl relative z-10"
                    style={{
                      color: sw.textColor,
                      textShadow: "2px 2px 0 rgba(0,0,0,0.25)",
                    }}
                  >
                    {sw.word}
                  </span>
                </div>
                <div className="p-3" style={{ backgroundColor: "#fffef8" }}>
                  <p className="font-black uppercase tracking-widest text-xs mb-1">{sw.label}</p>
                  <p className="font-black text-xs text-black/40 tracking-widest">{sw.hex}</p>
                </div>
              </div>
            </RevealBlock>
          ))}
        </div>

        {/* Paper swatch */}
        <RevealBlock delay={0.4} className="mt-4">
          <div
            className="border-4 border-black p-4 flex items-center justify-between"
            style={{ backgroundColor: "#fffef8", boxShadow: "4px 4px 0 #000" }}
          >
            <div>
              <p className="font-black uppercase tracking-widest text-xs mb-1">Paper White — Background</p>
              <p className="font-black text-xs text-black/40 tracking-widest">#fffef8</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border-4 border-black" style={{ backgroundColor: "#fffef8" }} />
              <span className="font-black uppercase text-xs">Newsprint Tone</span>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ═══════════════════════════════════
          DESIGN RULES — DO / DON'T
      ═══════════════════════════════════ */}
      <section
        className="py-16 px-4 md:px-8"
        style={{
          backgroundImage: "radial-gradient(circle, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          backgroundColor: "#fffef8",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="mb-10">
            <div className="flex items-center gap-4 mb-2">
              <ActionBurst word="RULE!" color="#ffcc00" textColor="#000" size="sm" />
              <h2
                className="font-black uppercase tracking-tight"
                style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}
              >
                DESIGN RULES
              </h2>
            </div>
            <p
              className="font-black uppercase tracking-wider text-sm text-black/60 inline-block px-2"
              style={{ backgroundColor: "#fffef8" }}
            >
              The laws of comic-style — violate them at your peril
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* DO */}
            <RevealBlock delay={0}>
              <ComicPanel accentColor="#ff3333" className="h-full">
                <div
                  className="border-b-4 border-black px-5 py-3 flex items-center gap-3"
                  style={{ backgroundColor: "#33cc33" }}
                >
                  <span className="font-black text-white text-xl">&#10003;</span>
                  <span className="font-black uppercase tracking-widest text-sm text-white">
                    DO THESE
                  </span>
                </div>
                <div className="p-5 bg-[#fffef8]">
                  <ul className="space-y-3">
                    {doRules.map((rule) => (
                      <li key={rule} className="flex items-start gap-3">
                        <span
                          className="flex-shrink-0 w-6 h-6 border-4 border-black flex items-center justify-center font-black text-xs"
                          style={{ backgroundColor: "#33cc33", color: "#fff" }}
                        >
                          &#10003;
                        </span>
                        <span className="font-black uppercase tracking-wide text-xs leading-relaxed">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ComicPanel>
            </RevealBlock>

            {/* DON'T */}
            <RevealBlock delay={0.1}>
              <ComicPanel accentColor="#000" className="h-full">
                <div
                  className="border-b-4 border-black px-5 py-3 flex items-center gap-3"
                  style={{ backgroundColor: "#ff3333" }}
                >
                  <span className="font-black text-white text-xl">&#10007;</span>
                  <span className="font-black uppercase tracking-widest text-sm text-white">
                    NEVER DO
                  </span>
                </div>
                <div className="p-5 bg-[#fffef8]">
                  <ul className="space-y-3">
                    {dontRules.map((rule) => (
                      <li key={rule} className="flex items-start gap-3">
                        <span
                          className="flex-shrink-0 w-6 h-6 border-4 border-black flex items-center justify-center font-black text-xs"
                          style={{ backgroundColor: "#ff3333", color: "#fff" }}
                        >
                          &#10007;
                        </span>
                        <span className="font-black uppercase tracking-wide text-xs leading-relaxed line-through decoration-2">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ComicPanel>
            </RevealBlock>
          </div>

          {/* Typography panel */}
          <RevealBlock delay={0.2}>
            <div
              className="border-4 border-black p-6"
              style={{ backgroundColor: "#fffef8", boxShadow: "6px 6px 0 #000" }}
            >
              <div
                className="border-b-4 border-black pb-3 mb-5 font-black uppercase tracking-widest text-xs"
                style={{ color: "#ff3333" }}
              >
                TYPOGRAPHY SYSTEM
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border-4 border-black p-4">
                  <p className="font-black uppercase tracking-widest text-xs text-black/40 mb-3">DISPLAY</p>
                  <p
                    className="font-black uppercase leading-none"
                    style={{ fontSize: "2.5rem", letterSpacing: "-0.02em" }}
                  >
                    KAPOW!
                  </p>
                  <p className="font-black uppercase text-xs mt-2 text-black/40">
                    Arial Black, 40px+, ALL-CAPS
                  </p>
                </div>
                <div className="border-4 border-black p-4">
                  <p className="font-black uppercase tracking-widest text-xs text-black/40 mb-3">HEADING</p>
                  <p className="font-black uppercase tracking-wider text-2xl">HERO TITLE</p>
                  <p className="font-black uppercase text-xs mt-2 text-black/40">
                    font-black, tracking-wider
                  </p>
                </div>
                <div className="border-4 border-black p-4">
                  <p className="font-black uppercase tracking-widest text-xs text-black/40 mb-3">CAPTION</p>
                  <p className="font-black uppercase tracking-widest text-sm">
                    Panel caption text...
                  </p>
                  <p className="font-black uppercase text-xs mt-2 text-black/40">
                    font-black, tracking-widest, 14px
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ═══════════════════════════════════
          INTERACTIONS SHOWCASE
      ═══════════════════════════════════ */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <RevealBlock className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <ActionBurst word="KA-BOOM!" color="#ff3333" textColor="#fff" size="sm" />
            <h2
              className="font-black uppercase tracking-tight"
              style={{ fontSize: "clamp(1.8rem, 5vw, 3.5rem)" }}
            >
              INTERACTIONS
            </h2>
          </div>
          <p className="font-black uppercase tracking-wider text-sm text-black/50">
            Hover every card — feel the ink snap to life
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Pop-Art Explosion */}
          <RevealBlock delay={0}>
            <div
              className="border-4 border-black group cursor-pointer transition-all duration-100 ease-out hover:scale-110 hover:-rotate-3"
              style={{ boxShadow: "6px 6px 0 #000", backgroundColor: "#fffef8" }}
            >
              <div
                className="border-b-4 border-black p-6 relative overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: "#ff3333", minHeight: 110 }}
              >
                <div className="absolute inset-0 speed-lines opacity-0 group-hover:opacity-100 transition-opacity duration-100" />
                <ActionBurst word="POP!" color="#ffcc00" textColor="#000" size="md" className="relative z-10" />
              </div>
              <div className="p-4">
                <p className="font-black uppercase tracking-widest text-xs mb-1">POP-ART EXPLOSION</p>
                <p className="font-black uppercase text-xs text-black/50">
                  scale-110 rotate(-3deg) on hover
                </p>
              </div>
            </div>
          </RevealBlock>

          {/* Halftone Reveal */}
          <RevealBlock delay={0.08}>
            <div
              className="border-4 border-black group cursor-pointer transition-all duration-100 ease-out hover:scale-110 hover:-rotate-3"
              style={{ boxShadow: "6px 6px 0 #000", backgroundColor: "#fffef8" }}
            >
              <div
                className="border-b-4 border-black p-6 relative overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: "#3366ff", minHeight: 110 }}
              >
                <div className="absolute inset-0 comic-halftone halftone-reveal-overlay opacity-0 group-hover:opacity-25" />
                <span className="font-black uppercase text-white text-lg relative z-10">HALFTONE</span>
              </div>
              <div className="p-4">
                <p className="font-black uppercase tracking-widest text-xs mb-1">HALFTONE REVEAL</p>
                <p className="font-black uppercase text-xs text-black/50">
                  Dot overlay fades in on hover
                </p>
              </div>
            </div>
          </RevealBlock>

          {/* Heavy Ink Press */}
          <RevealBlock delay={0.16}>
            <div
              className="border-4 border-black group cursor-pointer transition-all duration-100 ease-out hover:scale-110 hover:-rotate-3"
              style={{ boxShadow: "6px 6px 0 #000", backgroundColor: "#fffef8" }}
            >
              <div
                className="border-b-4 border-black p-6 flex items-center justify-center"
                style={{ backgroundColor: "#ffcc00", minHeight: 110 }}
              >
                <button
                  type="button"
                  className="border-4 border-black px-4 py-2 font-black uppercase tracking-widest text-sm active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all duration-100"
                  style={{ boxShadow: "4px 4px 0 #000", backgroundColor: "#fff" }}
                >
                  PRESS ME
                </button>
              </div>
              <div className="p-4">
                <p className="font-black uppercase tracking-widest text-xs mb-1">HEAVY INK PRESS</p>
                <p className="font-black uppercase text-xs text-black/50">
                  Shadow collapses on active
                </p>
              </div>
            </div>
          </RevealBlock>

          {/* Badge Pop */}
          <RevealBlock delay={0.24}>
            <div
              className="border-4 border-black group cursor-pointer transition-all duration-100 ease-out hover:scale-110 hover:-rotate-3"
              style={{ boxShadow: "6px 6px 0 #000", backgroundColor: "#fffef8" }}
            >
              <div
                className="border-b-4 border-black p-6 flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: "#33cc33", minHeight: 110 }}
              >
                <span className="font-black uppercase text-white text-lg">HOVER</span>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                  <ActionBurst word="NEW!" color="#ffcc00" textColor="#000" size="md" />
                </div>
              </div>
              <div className="p-4">
                <p className="font-black uppercase tracking-widest text-xs mb-1">BADGE POP</p>
                <p className="font-black uppercase text-xs text-black/50">
                  scale-0 to scale-100 badge reveal
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FOOTER
      ═══════════════════════════════════ */}
      <footer className="border-t-4 border-black" style={{ backgroundColor: "#1a1a1a" }}>
        {/* Footer marquee */}
        <div
          className="w-full overflow-hidden border-b-4 border-black py-3"
          style={{ backgroundColor: "#ffcc00" }}
        >
          <div
            className="flex w-[200%]"
            style={{ animation: "comic-marquee-rev 22s linear infinite" }}
          >
            {[0, 1].map((i) => (
              <div
                key={i}
                className="flex-1 flex justify-around items-center font-black uppercase tracking-widest text-xs text-black"
              >
                <span>STYLEKIT</span>
                <span>&#10022;</span>
                <span>COMIC STYLE</span>
                <span>&#10022;</span>
                <span>ISSUE #001</span>
                <span>&#10022;</span>
                <span>THE END</span>
                <span>&#10022;</span>
                <span>OR IS IT?</span>
                <span>&#10022;</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Brand block */}
            <div>
              <div
                className="border-4 border-[#fffef8] px-4 py-2 font-black uppercase tracking-widest text-sm inline-block mb-4"
                style={{ backgroundColor: "#ff3333", color: "#fff", boxShadow: "4px 4px 0 #fffef8" }}
              >
                COMIC STYLE
              </div>
              <p className="font-black uppercase tracking-wider text-xs text-white/50 max-w-xs leading-relaxed">
                Bold ink lines, halftone dots, and primary color explosions — design like it matters.
              </p>
            </div>

            {/* Sign-off bubble */}
            <div className="flex flex-col items-center gap-6">
              <ThoughtBubble>
                <span className="text-xs">The end?<br />Never!</span>
              </ThoughtBubble>
              <div className="flex gap-3 mt-6">
                <ActionBurst word="POW!" color="#ff3333" textColor="#fff" size="sm" rotate={-8} />
                <ActionBurst word="ZAP!" color="#3366ff" textColor="#fff" size="sm" rotate={6} />
              </div>
            </div>

            {/* Footer links */}
            <div className="flex flex-col gap-3 md:items-end">
              <Link
                href="/styles/comic-style"
                className="border-4 border-black px-4 py-2 font-black uppercase tracking-widest text-xs text-black transition-all duration-100 ease-out hover:scale-105"
                style={{ backgroundColor: "#ffcc00", boxShadow: "4px 4px 0 #fffef8" }}
              >
                VIEW DOCS
              </Link>
              <Link
                href="/styles"
                className="border-4 border-[#fffef8] px-4 py-2 font-black uppercase tracking-widest text-xs text-white transition-all duration-100 ease-out hover:scale-105"
                style={{ boxShadow: "4px 4px 0 #fffef8" }}
              >
                ALL STYLES
              </Link>
              <p className="font-black uppercase tracking-widest text-xs text-white/30 mt-2">
                StyleKit &middot; Comic Style &middot; 2026
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
