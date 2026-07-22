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
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline SVG icons — no external imports                             */
/* ------------------------------------------------------------------ */

function ArrowLeftIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}

function ZapIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function SquareIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" />
    </svg>
  );
}

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function PlusIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
    </svg>
  );
}

function TriangleIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2L22 20H2L12 2z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Constants                                                           */
/* ------------------------------------------------------------------ */

const RED = "#ff6b6b";
const TEAL = "#4ecdc4";
const YELLOW = "#ffe66d";
const MINT = "#95e1d3";
const CORAL = "#f38181";

const COLORS = [
  { name: "Playful Red", hex: RED, label: "Accent 1", role: "Buttons, alerts, highlights" },
  { name: "Vibrant Teal", hex: TEAL, label: "Accent 2", role: "Shadows, badges, borders" },
  { name: "Bold Yellow", hex: YELLOW, label: "Accent 3", role: "Backgrounds, nav, markers" },
  { name: "Fresh Mint", hex: MINT, label: "Accent 4", role: "Surface, panels, cards" },
  { name: "Warm Coral", hex: CORAL, label: "Accent 5", role: "Tags, labels, decorations" },
];

type ComponentTab = "buttons" | "cards" | "inputs" | "badges";

/* ------------------------------------------------------------------ */
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);

  // aiRule 1: Toy Spring — toggle state
  const [toySpringActive, setToySpringActive] = useState(false);
  const [toySpringPressing, setToySpringPressing] = useState(false);

  // aiRule 2: Tilt Exaggeration — per-card tilt hover
  const [tiltHovered, setTiltHovered] = useState<number | null>(null);

  // aiRule 3: Color Ping-Pong — cycling shadow color
  const [pingPongIndex, setPingPongIndex] = useState(0);
  const pingPongColors = [RED, TEAL, YELLOW];
  const pingPongNames = ["Red", "Teal", "Yellow"];

  // aiRule 4: Joyful Press — press demo
  const [pressState, setPressState] = useState<"idle" | "pressing" | "done">("idle");
  const [pressCount, setPressCount] = useState(0);

  // Component demo state
  const [inputVal, setInputVal] = useState("");
  const [toggleOn, setToggleOn] = useState(false);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([true, false, true, false]);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (pingPongIndex === 0) return;
    const t = setTimeout(() => {
      setPingPongIndex((prev) => (prev + 1) % pingPongColors.length);
    }, 900);
    return () => clearTimeout(t);
  }, [pingPongIndex]);

  function startPingPong() {
    setPingPongIndex((prev) => (prev + 1) % pingPongColors.length);
  }

  function handleJoyfulPress() {
    setPressState("pressing");
    setPressCount((c) => c + 1);
    setTimeout(() => setPressState("done"), 300);
    setTimeout(() => setPressState("idle"), 1200);
  }

  function toggleCheck(i: number) {
    setCheckedItems((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  }

  const currentPingColor = pingPongColors[pingPongIndex];

  return (
    <div className="min-h-screen bg-white font-sans text-black overflow-x-hidden">
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes brutal-bounce {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes brutal-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes brutal-pop {
          0% { transform: scale(0.8) rotate(-5deg); opacity: 0; }
          60% { transform: scale(1.1) rotate(2deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        .brutal-bounce-anim {
          animation: brutal-bounce 2s ease-in-out infinite;
        }
        .brutal-spin-anim {
          animation: brutal-spin 6s linear infinite;
        }
        .brutal-pop-anim {
          animation: brutal-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .toy-spring {
          transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                     */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#ffe66d] border-b-4 border-black">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <div
            className="font-black text-lg md:text-xl bg-black text-[#ffe66d] px-3 py-1 rotate-[-2deg] select-none"
            style={{ letterSpacing: "-0.02em" }}
          >
            PLAY
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {(["Palette", "Components", "aiRules", "Do/Don't"] as const).map((item, i) => {
              const navColors = [RED, TEAL, MINT, CORAL];
              const navHrefs = ["#palette", "#components", "#ai-rules", "#do-dont"];
              return (
                <a
                  key={item}
                  href={navHrefs[i]}
                  className="font-black text-sm px-3 py-1 border-2 border-transparent hover:border-black transition-all duration-200"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = navColors[i];
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  {item}
                </a>
              );
            })}
          </nav>

          {/* Back link */}
          <Link
            href="/"
            data-back-navigation="true"
            className="group flex items-center gap-2 font-black text-sm px-4 py-2 bg-black text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,107,107,1)] hover:shadow-[6px_6px_0px_0px_rgba(78,205,196,1)] hover:-translate-y-1 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          >
            <ArrowLeftIcon className="w-4 h-4 toy-spring group-hover:-translate-x-1" />
            <span className="hidden md:inline">StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO                                                          */}
      {/* ================================================================ */}
      <section className="relative pt-20 md:pt-24 pb-20 px-4 md:px-8 bg-[#4ecdc4] border-b-4 border-black overflow-hidden min-h-[90vh] flex items-center">
        {/* Decorative geometric blocks */}
        <div className="absolute top-16 right-8 md:right-24 w-16 h-16 md:w-28 md:h-28 bg-[#ffe66d] border-4 border-black rotate-12 brutal-bounce-anim pointer-events-none" />
        <div className="absolute bottom-12 left-8 md:left-20 w-12 h-12 md:w-20 md:h-20 bg-[#ff6b6b] border-4 border-black -rotate-12 brutal-bounce-anim pointer-events-none" style={{ animationDelay: "0.5s" }} />
        <div className="absolute top-32 left-4 md:left-10 w-8 h-8 md:w-14 md:h-14 bg-[#f38181] border-4 border-black rotate-6 brutal-bounce-anim pointer-events-none" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 right-12 md:right-40 w-10 h-10 md:w-16 md:h-16 bg-[#95e1d3] border-4 border-black -rotate-6 brutal-bounce-anim pointer-events-none" style={{ animationDelay: "0.3s" }} />
        <div className="absolute top-24 right-1/3 w-6 h-6 md:w-10 md:h-10 bg-black brutal-spin-anim pointer-events-none" />

        {/* Decorative black bottom strip */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-black" />

        <div className="max-w-6xl mx-auto relative w-full">
          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0) rotate(-1deg)" : "translateY(20px)",
              transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <div className="inline-block bg-[#ff6b6b] border-4 border-black px-4 py-1 mb-6 font-black text-white text-xs md:text-sm uppercase tracking-widest">
              Neo-Brutalist Playful
            </div>
          </div>

          {/* Main title */}
          <h1
            className="font-black leading-none mb-4"
            style={{
              fontSize: "clamp(3.5rem, 12vw, 9rem)",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0) rotate(-2deg)" : "translateY(36px)",
              transition: "opacity 0.65s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.65s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            PLAY
            <br />
            <span className="text-white" style={{ textShadow: "4px 4px 0px #000" }}>
              FUL!
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="font-mono text-base md:text-xl max-w-md mb-8 font-bold"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0) rotate(1deg)" : "translateY(20px)",
              transition: "opacity 0.65s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.65s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            野兽派也可以很有趣。硬边缘 + 彩色 + 弹簧感 = 俏皮野兽派。
          </p>

          {/* CTA Row */}
          <div
            className="flex flex-wrap gap-4"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.65s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.65s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <button className="group relative font-black text-white bg-[#ff6b6b] px-8 py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(78,205,196,1)] hover:-translate-y-1 hover:translate-x-[1px] hover:rotate-[2deg] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none active:scale-95 active:rotate-0 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-base md:text-lg rotate-[-1deg]">
              <span className="absolute -top-2 -right-2 w-3 h-3 bg-[#ffe66d] border-2 border-black toy-spring group-hover:translate-x-1 group-hover:-translate-y-1" />
              <span className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#4ecdc4] border-2 border-black toy-spring group-hover:-translate-x-1 group-hover:translate-y-1" />
              <span className="relative z-10">开始玩吧</span>
            </button>
            <button className="font-black bg-[#ffe66d] px-8 py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(255,107,107,1)] hover:-translate-y-1 active:translate-x-[6px] active:translate-y-[6px] active:shadow-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-base md:text-lg rotate-[1deg] hover:rotate-[-2deg]">
              看看吧
            </button>
          </div>

          {/* Stats bar */}
          <div
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.65s cubic-bezier(0.16,1,0.3,1) 0.42s, transform 0.65s cubic-bezier(0.16,1,0.3,1) 0.42s",
            }}
          >
            {[
              { val: "5", label: "Accent Colors", bg: RED, rotate: "-2deg" },
              { val: "4", label: "aiRules", bg: TEAL, rotate: "1deg" },
              { val: "0", label: "Border Radius", bg: YELLOW, rotate: "-1deg" },
              { val: "3deg", label: "Max Rotation", bg: CORAL, rotate: "2deg" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white border-4 border-black p-4 text-center toy-spring hover:-translate-y-2 cursor-default"
                style={{ transform: `rotate(${s.rotate})`, boxShadow: "3px 3px 0px 0px #000" }}
              >
                <div className="font-black text-2xl md:text-3xl" style={{ color: s.bg }}>
                  {s.val}
                </div>
                <div className="font-mono text-xs font-bold text-black/70 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section id="palette" className="scroll-mt-16 py-20 md:py-28 px-4 md:px-8 bg-white border-b-4 border-black">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-3">
            <div className="font-black text-xs uppercase tracking-widest bg-[#ff6b6b] text-white inline-block px-3 py-1 border-2 border-black mb-4">
              Color System
            </div>
            <h2 className="font-black text-4xl md:text-6xl leading-none">
              5 BOLD
              <br />
              <span style={{ color: TEAL }}>ACCENTS</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="font-mono text-base md:text-lg max-w-lg text-black/70 font-bold">
              纯黑底色配 5 种强调色。彩色硬阴影在各色之间跳跃——这就是 Color Ping-Pong。
            </p>
          </RevealBlock>

          {/* Swatch grid */}
          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
              {COLORS.map((c, i) => (
                <div
                  key={c.name}
                  className="group cursor-pointer"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    className="w-full aspect-square border-4 border-black transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{
                      backgroundColor: c.hex,
                      boxShadow: hoveredSwatch === i
                        ? "8px 8px 0px 0px #000"
                        : "4px 4px 0px 0px #000",
                      transform: hoveredSwatch === i
                        ? `translateY(-6px) rotate(${i % 2 === 0 ? "2deg" : "-2deg"})`
                        : `rotate(${i % 2 === 0 ? "-1deg" : "1deg"})`,
                    }}
                  >
                    {hoveredSwatch === i && (
                      <div className="w-full h-full flex items-center justify-center">
                        <SquareIcon className="w-8 h-8 text-black/20 brutal-pop-anim" />
                      </div>
                    )}
                  </div>
                  <div className="mt-3 px-1">
                    <div className="font-black text-sm">{c.name}</div>
                    <div className="font-mono text-xs text-black/60">{c.hex}</div>
                    <div className="mt-1">
                      <span
                        className="inline-block font-mono text-[10px] font-bold px-2 py-0.5 border-2 border-black"
                        style={{ backgroundColor: c.hex }}
                      >
                        {c.label}
                      </span>
                    </div>
                    <div className="font-mono text-[10px] text-black/50 mt-1">{c.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Shadow color combos */}
          <RevealBlock delay={0.15}>
            <div className="bg-[#ffe66d] border-4 border-black p-6 md:p-8" style={{ boxShadow: "6px 6px 0px 0px #000" }}>
              <div className="font-black text-xs uppercase tracking-widest mb-5">Shadow Color Combos</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { bg: RED, shadow: TEAL, label: "Red + Teal" },
                  { bg: TEAL, shadow: YELLOW, label: "Teal + Yellow" },
                  { bg: YELLOW, shadow: RED, label: "Yellow + Red" },
                  { bg: MINT, shadow: CORAL, label: "Mint + Coral" },
                ].map((combo) => (
                  <button
                    key={combo.label}
                    className="font-black text-black text-sm px-4 py-3 border-4 border-black transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 active:translate-y-1 active:shadow-none"
                    style={{
                      backgroundColor: combo.bg,
                      boxShadow: `5px 5px 0px 0px ${combo.shadow}`,
                    }}
                  >
                    {combo.label}
                  </button>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. COMPONENT GALLERY (4 tabs)                                    */}
      {/* ================================================================ */}
      <section id="components" className="scroll-mt-16 py-20 md:py-28 px-4 md:px-8 bg-[#95e1d3] border-b-4 border-black">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-3">
            <div className="font-black text-xs uppercase tracking-widest bg-black text-[#ffe66d] inline-block px-3 py-1 border-2 border-black mb-4">
              Components
            </div>
            <h2 className="font-black text-4xl md:text-6xl leading-none">
              BUILD
              <br />
              <span className="text-black" style={{ WebkitTextStroke: "3px #000", color: "transparent" }}>
                BLOCKS
              </span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="font-mono text-base md:text-lg max-w-lg text-black/70 font-bold">
              无圆角。粗边框。彩色阴影。每个组件都有旋转 + 弹簧反馈。
            </p>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.08} className="mb-6">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "inputs", "badges"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="font-black text-sm px-5 py-2.5 border-4 border-black capitalize transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1"
                  style={{
                    backgroundColor: activeTab === tab ? "#000" : "#fff",
                    color: activeTab === tab ? "#ffe66d" : "#000",
                    boxShadow: activeTab === tab ? `4px 4px 0px 0px ${RED}` : "3px 3px 0px 0px #000",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.12}>
            <div className="bg-white border-4 border-black p-8 md:p-12" style={{ boxShadow: "8px 8px 0px 0px #000" }}>

              {/* ---- BUTTONS TAB ---- */}
              {activeTab === "buttons" && (
                <div className="space-y-10">
                  <div>
                    <p className="font-mono text-xs font-bold uppercase tracking-widest text-black/50 mb-5">
                      Primary — Toy Spring + Joyful Press
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button className="group relative font-black text-white bg-[#ff6b6b] px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(78,205,196,1)] hover:shadow-[8px_8px_0px_0px_rgba(255,230,109,1)] hover:-translate-y-1 hover:translate-x-[1px] hover:rotate-[3deg] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none active:scale-95 active:rotate-0 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] rotate-[-2deg]">
                        <span className="absolute -top-2 -right-2 w-3 h-3 bg-[#ffe66d] border-2 border-black toy-spring group-hover:translate-x-1 group-hover:-translate-y-1" />
                        <span className="absolute -bottom-2 -left-2 w-3 h-3 bg-[#4ecdc4] border-2 border-black toy-spring group-hover:-translate-x-1 group-hover:translate-y-1" />
                        <span className="relative z-10">点我呀</span>
                      </button>
                      <button className="font-black bg-[#ffe66d] px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,107,107,1)] hover:shadow-[8px_8px_0px_0px_rgba(78,205,196,1)] hover:-translate-y-1 hover:rotate-[-2deg] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] rotate-[2deg]">
                        黄色款
                      </button>
                      <button className="font-black text-white bg-[#4ecdc4] px-6 py-3 border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,230,109,1)] hover:shadow-[8px_8px_0px_0px_rgba(255,107,107,1)] hover:-translate-y-1 hover:rotate-[2deg] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] rotate-[-1deg]">
                        青色款
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-xs font-bold uppercase tracking-widest text-black/50 mb-5">
                      Outline &amp; Ghost variants
                    </p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <button className="font-black text-black bg-white px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,107,107,1)] hover:bg-[#ff6b6b] hover:text-white hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                        Outlined
                      </button>
                      <button className="font-black text-black bg-transparent px-6 py-3 border-4 border-dashed border-black hover:bg-black hover:text-[#ffe66d] hover:border-solid hover:-translate-y-1 active:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                        Dashed
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-xs font-bold uppercase tracking-widest text-black/50 mb-5">
                      Size variants
                    </p>
                    <div className="flex flex-wrap gap-4 items-end">
                      {[
                        { label: "SM", px: "px-4 py-2 text-xs", rot: "-1deg" },
                        { label: "MD", px: "px-6 py-3 text-sm", rot: "2deg" },
                        { label: "LG", px: "px-9 py-4 text-base", rot: "-2deg" },
                        { label: "XL", px: "px-12 py-5 text-lg", rot: "1deg" },
                      ].map(({ label, px, rot }) => (
                        <button
                          key={label}
                          className={`font-black text-white bg-[#ff6b6b] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(78,205,196,1)] hover:-translate-y-1 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${px}`}
                          style={{ transform: `rotate(${rot})` }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---- CARDS TAB ---- */}
              {activeTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    {
                      title: "创意工作室",
                      desc: "无边界的想象力。硬边缘框架内的彩色爆发。",
                      bg: RED,
                      shadow: TEAL,
                      rot: "-1deg",
                      hoverRot: "2deg",
                    },
                    {
                      title: "年轻化品牌",
                      desc: "多彩色块 + 微旋转 + 弹簧动画。每个元素都在跳舞。",
                      bg: YELLOW,
                      shadow: RED,
                      rot: "1deg",
                      hoverRot: "-2deg",
                    },
                    {
                      title: "趣味应用",
                      desc: "儿童产品不需要无聊。粗边框也可以充满欢笑。",
                      bg: TEAL,
                      shadow: YELLOW,
                      rot: "-2deg",
                      hoverRot: "1deg",
                    },
                    {
                      title: "儿童教育",
                      desc: "颜色丰富的学习界面。旋转 + 弹跳，让学习更有趣。",
                      bg: MINT,
                      shadow: CORAL,
                      rot: "2deg",
                      hoverRot: "-1deg",
                    },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="group bg-white border-4 border-black p-6 cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                      style={{
                        boxShadow: `8px 8px 0px 0px ${card.shadow}`,
                        transform: `rotate(${card.rot})`,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = `rotate(${card.hoverRot}) translateY(-8px)`;
                        (e.currentTarget as HTMLElement).style.boxShadow = `12px 12px 0px 0px ${card.bg}`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = `rotate(${card.rot})`;
                        (e.currentTarget as HTMLElement).style.boxShadow = `8px 8px 0px 0px ${card.shadow}`;
                      }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-4 h-4 border-2 border-black transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-125" style={{ backgroundColor: card.bg }} />
                        <div className="w-4 h-4 border-2 border-black transition-transform duration-300 delay-75 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2" style={{ backgroundColor: card.shadow }} />
                        <div className="w-4 h-4 border-2 border-black transition-transform duration-300 delay-150 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-45" style={{ backgroundColor: YELLOW }} />
                      </div>
                      <h3 className="font-black text-xl mb-2 group-hover:text-[#ff6b6b] transition-colors duration-200">
                        {card.title}
                      </h3>
                      <p className="font-mono text-sm text-black/70">{card.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* ---- INPUTS TAB ---- */}
              {activeTab === "inputs" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-5">
                    <div>
                      <label className="block font-black text-sm mb-2">项目名称</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="输入点什么..."
                          value={inputVal}
                          onChange={(e) => setInputVal(e.target.value)}
                          className="w-full px-4 py-3 border-4 border-black bg-[#ffe66d] font-mono text-base focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(78,205,196,1)] transition-all placeholder:text-black/40 font-bold"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 bg-black rotate-45" aria-hidden="true" />
                      </div>
                    </div>
                    <div>
                      <label className="block font-black text-sm mb-2">品牌描述</label>
                      <textarea
                        rows={3}
                        placeholder="描述你的品牌风格..."
                        className="w-full px-4 py-3 border-4 border-black bg-[#95e1d3] font-mono text-sm focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(255,107,107,1)] transition-all placeholder:text-black/40 resize-none font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-black text-sm mb-2">选择风格</label>
                      <select className="w-full px-4 py-3 border-4 border-black bg-[#f38181] font-mono font-bold text-sm focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(255,230,109,1)] transition-all">
                        <option>Neo-Brutalist Playful</option>
                        <option>Art Deco</option>
                        <option>Kawaii Minimal</option>
                        <option>Geometric Bold</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="block font-black text-sm mb-3">开关切换</label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setToggleOn(!toggleOn)}
                          className="relative w-16 h-8 border-4 border-black transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                          style={{ backgroundColor: toggleOn ? RED : "#e5e5e5" }}
                        >
                          <span
                            className="absolute top-0.5 w-5 h-5 bg-white border-2 border-black transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                            style={{ left: toggleOn ? "calc(100% - 1.45rem)" : "2px" }}
                          />
                        </button>
                        <span className="font-mono text-sm font-bold">{toggleOn ? "已开启" : "已关闭"}</span>
                      </div>
                    </div>
                    <div>
                      <label className="block font-black text-sm mb-3">任务清单</label>
                      <div className="space-y-2">
                        {["设计原型", "开发组件", "测试交互", "部署上线"].map((item, i) => (
                          <button
                            key={item}
                            onClick={() => toggleCheck(i)}
                            className="flex items-center gap-3 w-full text-left font-mono text-sm font-bold p-2 border-2 border-black hover:bg-[#ffe66d] transition-colors duration-200"
                          >
                            <span
                              className="w-5 h-5 border-2 border-black flex items-center justify-center shrink-0 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                              style={{ backgroundColor: checkedItems[i] ? RED : "transparent" }}
                            >
                              {checkedItems[i] && <CheckIcon className="w-3 h-3 text-white" />}
                            </span>
                            <span className={checkedItems[i] ? "line-through opacity-50" : ""}>{item}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <button className="w-full font-black text-white bg-black py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,107,107,1)] hover:shadow-[6px_6px_0px_0px_rgba(78,205,196,1)] hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                      提交表单
                    </button>
                  </div>
                </div>
              )}

              {/* ---- BADGES TAB ---- */}
              {activeTab === "badges" && (
                <div className="space-y-8">
                  <div>
                    <p className="font-mono text-xs font-bold uppercase tracking-widest text-black/50 mb-5">
                      Status badges — border + rotation
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "进行中", bg: TEAL, rot: "-2deg" },
                        { label: "已完成", bg: RED, rot: "1deg" },
                        { label: "计划中", bg: YELLOW, rot: "-1deg" },
                        { label: "已暂停", bg: MINT, rot: "2deg" },
                        { label: "已取消", bg: CORAL, rot: "-2deg" },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="font-black text-black text-xs px-3 py-1.5 border-2 border-black toy-spring hover:scale-110 hover:-translate-y-1 cursor-default"
                          style={{
                            backgroundColor: b.bg,
                            transform: `rotate(${b.rot})`,
                          }}
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-xs font-bold uppercase tracking-widest text-black/50 mb-5">
                      Tag chips with icons
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "野兽派", icon: <ZapIcon className="w-3 h-3" />, bg: RED },
                        { label: "俏皮", icon: <TriangleIcon className="w-3 h-3" />, bg: YELLOW },
                        { label: "多彩", icon: <SquareIcon className="w-3 h-3" />, bg: TEAL },
                        { label: "年轻化", icon: <ZapIcon className="w-3 h-3" />, bg: MINT },
                        { label: "弹簧感", icon: <PlusIcon className="w-3 h-3" />, bg: CORAL },
                        { label: "图标化", icon: <TriangleIcon className="w-3 h-3" />, bg: RED },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="inline-flex items-center gap-1.5 font-black text-black text-xs px-3 py-1.5 border-2 border-black toy-spring hover:scale-[1.1] hover:-translate-y-1 cursor-default"
                          style={{ backgroundColor: b.bg }}
                        >
                          {b.icon}
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="font-mono text-xs font-bold uppercase tracking-widest text-black/50 mb-5">
                      Count badges
                    </p>
                    <div className="flex flex-wrap gap-6 items-center">
                      {[
                        { label: "消息", count: 5, bg: RED },
                        { label: "任务", count: 12, bg: TEAL },
                        { label: "点赞", count: 99, bg: YELLOW },
                        { label: "关注", count: 24, bg: CORAL },
                      ].map((b) => (
                        <div key={b.label} className="flex items-center gap-2">
                          <span className="font-black text-sm">{b.label}</span>
                          <span
                            className="w-7 h-7 border-2 border-black flex items-center justify-center font-black text-xs toy-spring hover:scale-[1.2]"
                            style={{ backgroundColor: b.bg }}
                          >
                            {b.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. aiRules INTERACTIVE DEMO                                      */}
      {/* ================================================================ */}
      <section id="ai-rules" className="scroll-mt-16 py-20 md:py-28 px-4 md:px-8 bg-[#ffe66d] border-b-4 border-black">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-3">
            <div className="font-black text-xs uppercase tracking-widest bg-[#ff6b6b] text-white inline-block px-3 py-1 border-2 border-black mb-4">
              aiRules — 4 Interaction Laws
            </div>
            <h2 className="font-black text-4xl md:text-6xl leading-none">
              FEEL
              <br />
              <span style={{ color: RED }}>THE RULES</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="font-mono text-base md:text-lg max-w-lg text-black/70 font-bold">
              每条规则都有一个可交互演示。点击、悬停、感受弹簧感——这是让俏皮野兽派区别于普通 Brutalist 的核心。
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* ---- aiRule 1: Toy Spring ---- */}
            <RevealBlock delay={0.08}>
              <div className="bg-white border-4 border-black p-8" style={{ boxShadow: "6px 6px 0px 0px #000" }}>
                <div className="mb-2">
                  <span className="font-black text-xs uppercase tracking-widest bg-[#ff6b6b] text-white px-2 py-0.5 border-2 border-black">
                    Rule 1
                  </span>
                </div>
                <h3 className="font-black text-2xl mb-1">Toy Spring</h3>
                <p className="font-mono text-xs text-black/60 mb-1 font-bold">
                  cubic-bezier(0.34, 1.56, 0.64, 1)
                </p>
                <p className="font-mono text-sm text-black/70 mb-6 font-bold">
                  位移和旋转带有弹簧回弹感。像按压一个弹簧玩具——松开时会过冲再稳定。
                </p>

                <div className="bg-[#f5f5f5] border-4 border-black p-6 flex flex-col items-center gap-6">
                  {/* Visual ball track */}
                  <div className="relative w-full h-12 bg-white border-2 border-black overflow-hidden">
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-8 h-8 bg-[#ff6b6b] border-2 border-black"
                      style={{
                        left: toySpringActive ? "calc(100% - 36px)" : "4px",
                        transition: "left 0.6s cubic-bezier(0.34,1.56,0.64,1)",
                      }}
                    />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xs text-black/30 font-bold pointer-events-none select-none">
                      spring vs linear
                    </div>
                  </div>

                  <div className="flex gap-4 items-center">
                    <button
                      onClick={() => setToySpringActive(!toySpringActive)}
                      onMouseDown={() => setToySpringPressing(true)}
                      onMouseUp={() => setToySpringPressing(false)}
                      onMouseLeave={() => setToySpringPressing(false)}
                      className="font-black text-white bg-[#ff6b6b] px-6 py-3 border-4 border-black transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                      style={{
                        boxShadow: toySpringPressing ? "none" : "5px 5px 0px 0px #000",
                        transform: toySpringPressing ? "translate(5px, 5px) scale(0.95)" : "rotate(-2deg)",
                      }}
                    >
                      {toySpringActive ? "弹回" : "弹出"}
                    </button>
                    <p className="font-mono text-xs text-black/60 font-bold">
                      {toySpringActive ? "过冲后稳定 — 注意弹簧感" : "点击查看弹簧运动"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 bg-black text-[#ffe66d] font-mono text-xs p-3 font-bold">
                  <span className="text-[#4ecdc4]">ease</span>: cubic-bezier(0.34, 1.56, 0.64, 1)
                  <br />
                  <span className="text-[#ff6b6b]">duration</span>: 300ms
                </div>
              </div>
            </RevealBlock>

            {/* ---- aiRule 2: Tilt Exaggeration ---- */}
            <RevealBlock delay={0.12}>
              <div className="bg-white border-4 border-black p-8" style={{ boxShadow: "6px 6px 0px 0px #000" }}>
                <div className="mb-2">
                  <span className="font-black text-xs uppercase tracking-widest bg-[#4ecdc4] text-black px-2 py-0.5 border-2 border-black">
                    Rule 2
                  </span>
                </div>
                <h3 className="font-black text-2xl mb-1">Tilt Exaggeration</h3>
                <p className="font-mono text-xs text-black/60 mb-1 font-bold">
                  rotate-[-2deg] -&gt; hover:rotate-[3deg]
                </p>
                <p className="font-mono text-sm text-black/70 mb-6 font-bold">
                  初始轻微倾斜，hover 时切换到反向更大角度（仍在 3 度内）。保持俏皮但可控。
                </p>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "初始 -2deg", rot: "-2deg", hoverRot: "3deg", bg: RED, shadow: TEAL },
                    { label: "初始 +1deg", rot: "1deg", hoverRot: "-3deg", bg: YELLOW, shadow: RED },
                    { label: "初始 -1deg", rot: "-1deg", hoverRot: "2deg", bg: TEAL, shadow: YELLOW },
                    { label: "初始 +2deg", rot: "2deg", hoverRot: "-2deg", bg: MINT, shadow: CORAL },
                  ].map((card, i) => (
                    <div
                      key={i}
                      className="border-4 border-black p-4 cursor-pointer font-black text-xs text-center transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                      style={{
                        backgroundColor: card.bg,
                        boxShadow: tiltHovered === i ? `8px 8px 0px 0px ${card.shadow}` : `4px 4px 0px 0px ${card.shadow}`,
                        transform: tiltHovered === i
                          ? `rotate(${card.hoverRot}) translateY(-6px)`
                          : `rotate(${card.rot})`,
                      }}
                      onMouseEnter={() => setTiltHovered(i)}
                      onMouseLeave={() => setTiltHovered(null)}
                    >
                      <div className="font-mono text-[10px] mb-1 font-bold opacity-70">{card.label}</div>
                      <div className="font-black">{tiltHovered === i ? `hover: ${card.hoverRot}` : card.rot}</div>
                    </div>
                  ))}
                </div>

                <p className="font-mono text-xs text-black/50 font-bold mt-4">
                  Hover each card to see the tilt flip — never exceeds 3deg.
                </p>
              </div>
            </RevealBlock>

            {/* ---- aiRule 3: Color Ping-Pong ---- */}
            <RevealBlock delay={0.16}>
              <div className="bg-white border-4 border-black p-8" style={{ boxShadow: "6px 6px 0px 0px #000" }}>
                <div className="mb-2">
                  <span className="font-black text-xs uppercase tracking-widest bg-[#ffe66d] text-black px-2 py-0.5 border-2 border-black">
                    Rule 3
                  </span>
                </div>
                <h3 className="font-black text-2xl mb-1">Color Ping-Pong</h3>
                <p className="font-mono text-xs text-black/60 mb-1 font-bold">
                  shadow: Red -&gt; Teal -&gt; Yellow -&gt; ...
                </p>
                <p className="font-mono text-sm text-black/70 mb-6 font-bold">
                  硬边阴影在青、粉、黄之间跳跃切换。维持野兽派结构同时增强玩具感。
                </p>

                <div className="flex flex-col items-center gap-6">
                  {/* Demo element with jumping shadow */}
                  <div
                    className="bg-black text-white font-black text-xl px-10 py-6 border-4 border-black transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{
                      boxShadow: `8px 8px 0px 0px ${currentPingColor}`,
                      transform: "rotate(-1deg)",
                    }}
                  >
                    SHADOW
                    <span style={{ color: currentPingColor }}> COLOR</span>
                    <div className="font-mono text-xs opacity-60 text-center mt-1">
                      current: {pingPongNames[pingPongIndex]}
                    </div>
                  </div>

                  <div className="flex gap-3 items-center">
                    {pingPongColors.map((c, i) => (
                      <div
                        key={c}
                        className="w-6 h-6 border-2 border-black transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                        style={{
                          backgroundColor: c,
                          transform: pingPongIndex === i ? "scale(1.4) rotate(10deg)" : "scale(1)",
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={startPingPong}
                    className="font-black text-black bg-[#ffe66d] px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(78,205,196,1)] hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                  >
                    下一个颜色 Ping!
                  </button>
                </div>

                <div className="mt-4 bg-black text-[#ffe66d] font-mono text-xs p-3 font-bold">
                  <span className="text-[#ff6b6b]">Red</span>{" "}
                  <span className="text-white">-&gt;</span>{" "}
                  <span className="text-[#4ecdc4]">Teal</span>{" "}
                  <span className="text-white">-&gt;</span>{" "}
                  <span className="text-[#ffe66d]">Yellow</span>{" "}
                  <span className="text-white">-&gt; loop</span>
                </div>
              </div>
            </RevealBlock>

            {/* ---- aiRule 4: Joyful Press ---- */}
            <RevealBlock delay={0.2}>
              <div className="bg-white border-4 border-black p-8" style={{ boxShadow: "6px 6px 0px 0px #000" }}>
                <div className="mb-2">
                  <span className="font-black text-xs uppercase tracking-widest bg-[#f38181] text-white px-2 py-0.5 border-2 border-black">
                    Rule 4
                  </span>
                </div>
                <h3 className="font-black text-2xl mb-1">Joyful Press</h3>
                <p className="font-mono text-xs text-black/60 mb-1 font-bold">
                  active: shadow=0 + translate + scale(0.95)
                </p>
                <p className="font-mono text-sm text-black/70 mb-6 font-bold">
                  :active 需要"压扁"反馈：阴影归零 + 等量位移 + 轻微缩放。模拟真实按压感。
                </p>

                <div className="flex flex-col items-center gap-6">
                  <div className="text-center">
                    <div
                      className="font-black text-4xl mb-2 transition-all duration-200"
                      style={{ color: pressState === "done" ? RED : pressState === "pressing" ? TEAL : "black" }}
                    >
                      {pressCount}
                    </div>
                    <div className="font-mono text-xs text-black/50 font-bold">PRESS COUNT</div>
                  </div>

                  {/* The main press demo button */}
                  <button
                    onClick={handleJoyfulPress}
                    className="font-black text-white text-lg px-10 py-5 border-4 border-black transition-all duration-150 ease-[cubic-bezier(0.34,1.56,0.64,1)] active:translate-x-[6px] active:translate-y-[6px] active:shadow-none active:scale-95"
                    style={{
                      backgroundColor: pressState === "pressing" ? TEAL : pressState === "done" ? RED : "#000",
                      boxShadow: "6px 6px 0px 0px rgba(255,107,107,1)",
                      transform: pressState === "pressing" ? "translate(6px, 6px) scale(0.95)" : "rotate(-1deg)",
                    }}
                  >
                    {pressState === "pressing" ? "压下去了!" : pressState === "done" ? "弹起来!" : "按我!"}
                  </button>

                  <div className="w-full bg-[#f5f5f5] border-2 border-black p-4">
                    <div className="font-mono text-xs font-bold text-black/70 space-y-1">
                      <div className={pressState === "idle" ? "text-black" : "text-black/30"}>
                        idle: shadow-[6px_6px_0px] rotate(-1deg)
                      </div>
                      <div className={pressState === "pressing" ? "text-[#4ecdc4]" : "text-black/30"}>
                        pressing: translate(6px,6px) shadow=none scale(0.95)
                      </div>
                      <div className={pressState === "done" ? "text-[#ff6b6b]" : "text-black/30"}>
                        done: spring back with overshoot
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. FULL APP DEMO — ACTIVITY BOARD                                */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-white border-b-4 border-black">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-3">
            <div className="font-black text-xs uppercase tracking-widest bg-[#4ecdc4] text-black inline-block px-3 py-1 border-2 border-black mb-4">
              App Demo
            </div>
            <h2 className="font-black text-4xl md:text-6xl leading-none">
              ACTIVITY
              <br />
              <span style={{ color: TEAL }}>BOARD</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="font-mono text-base md:text-lg max-w-lg text-black/70 font-bold">
              一个真实的活动看板 UI，展示俏皮野兽派在产品界面中的应用。彩色卡片 + 彩色边框 + 旋转装饰。
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Task board — col span 2 */}
            <RevealBlock delay={0.1} className="md:col-span-2">
              <div className="bg-[#ffe66d] border-4 border-black p-6 md:p-8" style={{ boxShadow: "8px 8px 0px 0px #000" }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-black text-xl">今日任务</h3>
                  <button className="font-black text-white bg-black px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(255,107,107,1)] hover:shadow-[5px_5px_0px_0px_rgba(78,205,196,1)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-sm flex items-center gap-2">
                    <PlusIcon className="w-4 h-4" />
                    添加任务
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { title: "设计 Neo-Brutalist 组件库", tag: "设计", tagBg: RED, done: true },
                    { title: "实现 Toy Spring 动画效果", tag: "开发", tagBg: TEAL, done: true },
                    { title: "编写 Color Ping-Pong 规则文档", tag: "文档", tagBg: MINT, done: false },
                    { title: "对 Joyful Press 进行用户测试", tag: "测试", tagBg: CORAL, done: false },
                    { title: "优化移动端旋转倾斜体验", tag: "优化", tagBg: YELLOW, done: false },
                  ].map((task, i) => (
                    <div
                      key={i}
                      className="group flex items-center gap-4 bg-white border-4 border-black p-4 toy-spring hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                    >
                      <div
                        className="w-6 h-6 border-2 border-black flex items-center justify-center shrink-0 toy-spring group-hover:scale-110"
                        style={{ backgroundColor: task.done ? RED : "transparent" }}
                      >
                        {task.done && <CheckIcon className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`font-mono text-sm font-bold flex-1 ${task.done ? "line-through opacity-50" : ""}`}>
                        {task.title}
                      </span>
                      <span
                        className="font-black text-[10px] px-2 py-0.5 border-2 border-black shrink-0"
                        style={{ backgroundColor: task.tagBg }}
                      >
                        {task.tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Sidebar stats */}
            <RevealBlock delay={0.18}>
              <div className="space-y-4">
                {/* Progress card */}
                <div className="bg-[#ff6b6b] border-4 border-black p-6 toy-spring hover:-translate-y-2 cursor-default" style={{ boxShadow: "4px 4px 0px 0px #000" }}>
                  <div className="font-black text-white text-xs uppercase tracking-widest mb-2">今日进度</div>
                  <div className="font-black text-white text-4xl mb-3">2/5</div>
                  <div className="h-3 bg-white/30 border-2 border-white overflow-hidden">
                    <div className="h-full bg-white transition-all duration-700" style={{ width: "40%" }} />
                  </div>
                  <div className="font-mono text-white/80 text-xs font-bold mt-2">40% complete</div>
                </div>

                {/* Streak card */}
                <div className="bg-[#4ecdc4] border-4 border-black p-6 toy-spring hover:-translate-y-1 cursor-default" style={{ boxShadow: "4px 4px 0px 0px #000", transform: "rotate(1deg)" }}>
                  <div className="font-black text-xs uppercase tracking-widest mb-2">连续天数</div>
                  <div className="font-black text-4xl mb-2">7</div>
                  <div className="flex gap-1">
                    {[...Array(7)].map((_, d) => (
                      <div
                        key={d}
                        className="flex-1 h-4 border-2 border-black transition-all duration-300"
                        style={{ backgroundColor: d < 5 ? "#000" : "transparent" }}
                      />
                    ))}
                  </div>
                </div>

                {/* Labels grid */}
                <div className="bg-[#95e1d3] border-4 border-black p-6" style={{ boxShadow: "4px 4px 0px 0px #000", transform: "rotate(-1deg)" }}>
                  <div className="font-black text-xs uppercase tracking-widest mb-4">项目标签</div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: "设计", bg: RED },
                      { label: "开发", bg: TEAL },
                      { label: "测试", bg: YELLOW },
                      { label: "文档", bg: CORAL },
                      { label: "优化", bg: MINT },
                    ].map((tag) => (
                      <span
                        key={tag.label}
                        className="font-black text-xs px-2 py-1 border-2 border-black toy-spring hover:scale-110"
                        style={{ backgroundColor: tag.bg }}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. DO / DON'T RULES                                              */}
      {/* ================================================================ */}
      <section id="do-dont" className="scroll-mt-16 py-20 md:py-28 px-4 md:px-8 bg-[#f38181] border-b-4 border-black">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-3">
            <div className="font-black text-xs uppercase tracking-widest bg-black text-[#f38181] inline-block px-3 py-1 border-2 border-black mb-4">
              Design Philosophy
            </div>
            <h2 className="font-black text-4xl md:text-6xl leading-none text-white">
              DO /
              <br />
              <span className="text-black">DON&apos;T</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="font-mono text-base md:text-lg max-w-lg text-white/80 font-bold">
              俏皮野兽派有明确的边界。跨越这些边界，风格就会崩塌。遵守它们，你会得到真正的俏皮。
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* DO */}
            <RevealBlock delay={0.1}>
              <div className="bg-white border-4 border-black p-8" style={{ boxShadow: "8px 8px 0px 0px #000" }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#ffe66d] border-4 border-black flex items-center justify-center">
                    <CheckIcon className="w-5 h-5 text-black" />
                  </div>
                  <h3 className="font-black text-2xl">DO</h3>
                  <div className="ml-auto w-4 h-4 border-2 border-black bg-[#4ecdc4] rotate-12" />
                </div>
                <ul className="space-y-3">
                  {[
                    "保持无圆角 rounded-none",
                    "使用纯黑边框 border-4 border-black",
                    "元素添加轻微旋转 rotate-[-2deg] rotate-[1deg]",
                    "使用多种强调色，色彩丰富",
                    "hover 可用 scale-105 放大效果",
                    "适当使用几何图形装饰（方块、三角、线条）",
                    "阴影可使用彩色 shadow-[...rgba(255,107,107,1)]",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 font-mono text-sm font-bold">
                      <span className="mt-1.5 w-3 h-3 bg-[#ffe66d] border-2 border-black shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T */}
            <RevealBlock delay={0.15}>
              <div className="bg-white border-4 border-black p-8" style={{ boxShadow: "8px 8px 0px 0px #000" }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-[#ff6b6b] border-4 border-black flex items-center justify-center">
                    <XIcon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-black text-2xl">DON&apos;T</h3>
                  <div className="ml-auto w-4 h-4 border-2 border-black bg-[#ff6b6b] -rotate-12" />
                </div>
                <ul className="space-y-3">
                  {[
                    "禁止圆角 — 任何 rounded-sm 及以上",
                    "禁止模糊阴影 — 只允许硬切阴影",
                    "禁止渐变 — 纯色只允许",
                    "禁止旋转超过 3 度",
                    "禁止使用柔和的灰色",
                    "禁止使用 emoji 或 Unicode 符号字符",
                    "禁止过度装饰导致结构感消失",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 font-mono text-sm font-bold">
                      <span className="mt-1.5 w-3 h-3 bg-[#ff6b6b] border-2 border-black shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Philosophy text */}
          <RevealBlock delay={0.2}>
            <div className="bg-black text-white border-4 border-black p-8 rotate-[-1deg]" style={{ boxShadow: "8px 8px 0px 0px rgba(255,107,107,1)" }}>
              <div className="font-black text-xs uppercase tracking-widest text-[#ffe66d] mb-4">Philosophy</div>
              <p className="font-mono text-base md:text-lg font-bold leading-relaxed text-white/90 max-w-2xl">
                Neo-Brutalist Playful 是原版 Neo-Brutalist 的活泼变体。
                在保持硬边缘、无圆角的结构基础上，
                通过<span style={{ color: RED }}> 轻微旋转</span>、
                <span style={{ color: TEAL }}> 多彩色块</span>、
                <span style={{ color: YELLOW }}> 弹簧动画</span>和
                <span style={{ color: MINT }}> 图标化装饰</span>增加趣味性。
              </p>
              <p className="font-mono text-sm font-bold text-white/60 mt-4">
                适用场景：年轻化品牌、创意工作室、儿童产品、趣味应用
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FEATURE HIGHLIGHTS                                               */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-4 md:px-8 bg-[#4ecdc4] border-b-4 border-black">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <div className="font-black text-xs uppercase tracking-widest bg-[#ffe66d] text-black inline-block px-3 py-1 border-2 border-black mb-4">
              Key Features
            </div>
            <h2 className="font-black text-4xl md:text-6xl leading-none">
              WHY
              <br />
              <span className="text-white" style={{ textShadow: "3px 3px 0px #000" }}>PLAYFUL?</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              {
                icon: <ZapIcon className="w-7 h-7" />,
                title: "弹簧物理",
                desc: "cubic-bezier(0.34,1.56,0.64,1) 让所有交互带有玩具弹性，区别于硬切的原版。",
                bg: RED,
                rot: "-2deg",
                hoverShadow: RED,
              },
              {
                icon: <SquareIcon className="w-7 h-7" />,
                title: "硬边缘结构",
                desc: "零圆角。border-4 border-black。这是野兽派的 DNA——不可妥协。",
                bg: YELLOW,
                rot: "1deg",
                hoverShadow: YELLOW,
              },
              {
                icon: <TriangleIcon className="w-7 h-7" />,
                title: "微旋转倾斜",
                desc: "元素轻微倾斜 1-2deg，hover 时切换反向。给静态布局注入活力。",
                bg: TEAL,
                rot: "-1deg",
                hoverShadow: TEAL,
              },
              {
                icon: <PlusIcon className="w-7 h-7" />,
                title: "彩色阴影跳跃",
                desc: "阴影颜色在红青黄之间 Ping-Pong 切换。这是最具辨识度的俏皮元素。",
                bg: MINT,
                rot: "2deg",
                hoverShadow: MINT,
              },
              {
                icon: <ZapIcon className="w-7 h-7" />,
                title: "压扁反馈",
                desc: "Joyful Press：点击时阴影归零 + 位移 + scale-95，模拟真实物理按压。",
                bg: CORAL,
                rot: "-2deg",
                hoverShadow: CORAL,
              },
              {
                icon: <SquareIcon className="w-7 h-7" />,
                title: "几何装饰",
                desc: "方块、三角、线条作为装饰元素。禁止 emoji——纯几何才是野兽派语言。",
                bg: RED,
                rot: "1deg",
                hoverShadow: TEAL,
              },
            ].map((feature, i) => (
              <RevealBlock key={feature.title} delay={i * 0.07}>
                <div
                  className="group bg-white border-4 border-black p-7 h-full cursor-default"
                  style={{
                    boxShadow: "5px 5px 0px 0px #000",
                    transform: `rotate(${feature.rot})`,
                    transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = `7px 7px 0px 0px ${feature.hoverShadow}`;
                    el.style.transform = `rotate(${parseFloat(feature.rot) > 0 ? "-1deg" : "1deg"}) translateY(-8px)`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = "5px 5px 0px 0px #000";
                    el.style.transform = `rotate(${feature.rot})`;
                  }}
                >
                  <div
                    className="w-12 h-12 border-4 border-black flex items-center justify-center mb-5 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:rotate-12"
                    style={{ backgroundColor: feature.bg }}
                  >
                    {feature.icon}
                  </div>
                  <h4 className="font-black text-lg mb-2">{feature.title}</h4>
                  <p className="font-mono text-sm text-black/70 font-bold leading-relaxed">{feature.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. FOOTER                                                        */}
      {/* ================================================================ */}
      <footer className="relative bg-black border-t-4 border-[#ffe66d] overflow-hidden">
        {/* Decorative top color strip */}
        <div className="flex h-3 overflow-hidden">
          {[RED, TEAL, YELLOW, MINT, CORAL, RED, TEAL, YELLOW, MINT, CORAL].map((c, i) => (
            <div key={i} className="flex-1 h-full" style={{ backgroundColor: c }} />
          ))}
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-8 left-8 w-10 h-10 border-4 border-[#ffe66d] brutal-bounce-anim pointer-events-none" style={{ animationDelay: "0.2s" }} />
        <div className="absolute top-12 right-16 w-6 h-6 border-4 border-[#ff6b6b] rotate-45 brutal-bounce-anim pointer-events-none" style={{ animationDelay: "0.8s" }} />
        <div className="absolute bottom-16 left-24 w-8 h-8 border-4 border-[#4ecdc4] brutal-bounce-anim pointer-events-none" style={{ animationDelay: "0.5s" }} />

        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-16 pb-12">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="font-black text-2xl bg-[#ffe66d] text-black px-4 py-2 border-4 border-[#ffe66d] rotate-[-2deg] w-fit">
                PLAY<span style={{ color: RED }}>FUL</span>
              </div>
              <p className="font-mono text-sm text-white/60 font-bold leading-relaxed">
                俏皮野兽派——Neo-Brutalist 的活泼变体。
                硬边缘 + 彩色 + 弹簧感 = 年轻化品牌的完美选择。
              </p>
              <div className="flex gap-2 flex-wrap">
                {[RED, TEAL, YELLOW, MINT, CORAL].map((c, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 border-2 border-white toy-spring hover:scale-[1.3] hover:rotate-12"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div className="flex flex-col gap-3">
                <span className="font-black text-xs uppercase tracking-widest text-[#ffe66d]">Style</span>
                <Link href="/styles/neo-brutalist-playful" className="font-mono font-bold text-white/60 hover:text-[#ff6b6b] transition-colors duration-200">
                  Documentation
                </Link>
                <Link href="/styles/neo-brutalist-playful/showcase" className="font-mono font-bold text-white/60 hover:text-[#4ecdc4] transition-colors duration-200">
                  Showcase
                </Link>
                <Link href="/styles/neo-brutalist-playful/cover" className="font-mono font-bold text-white/60 hover:text-[#ffe66d] transition-colors duration-200">
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-black text-xs uppercase tracking-widest text-[#ffe66d]">StyleKit</span>
                <Link href="/" className="font-mono font-bold text-white/60 hover:text-[#ff6b6b] transition-colors duration-200">
                  Home
                </Link>
                <Link href="/styles" className="font-mono font-bold text-white/60 hover:text-[#4ecdc4] transition-colors duration-200">
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-black text-xs uppercase tracking-widest text-[#ffe66d]">Palette</span>
                {COLORS.map((c) => (
                  <span key={c.name} className="flex items-center gap-2 font-mono text-xs font-bold text-white/50">
                    <span className="w-3 h-3 border-2 border-white/30 inline-block shrink-0" style={{ backgroundColor: c.hex }} />
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-1 flex overflow-hidden mb-8">
            {[RED, TEAL, YELLOW, MINT, CORAL].map((c) => (
              <div key={c} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-sm font-bold text-white/50">
              <span>Built for StyleKit</span>
              <span className="w-2 h-2 bg-[#ff6b6b] border border-[#ff6b6b]" />
              <span>Neo-Brutalist Playful</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 font-black text-black bg-[#ffe66d] px-6 py-3 border-4 border-[#ffe66d] shadow-[4px_4px_0px_0px_rgba(255,107,107,1)] hover:shadow-[6px_6px_0px_0px_rgba(78,205,196,1)] hover:-translate-y-1 active:translate-y-0 active:shadow-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] rotate-[-1deg] hover:rotate-[1deg]"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Back to StyleKit
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
