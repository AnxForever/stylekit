"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
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
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* --- Inline SVG & Decoration Components --- */

function WarningStripe({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-2 w-full ${className}`}
      style={{
        background:
          "repeating-linear-gradient(-45deg, #fbbf24, #fbbf24 10px, #1a2744 10px, #1a2744 20px)",
      }}
    />
  );
}

function TechGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(74,92,58,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(74,92,58,0.12) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />
  );
}

function StatusIndicator({
  label,
  status,
  color = "#fbbf24",
}: {
  label: string;
  status: string;
  color?: string;
}) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
      <div className="w-2 h-2" style={{ backgroundColor: color }} />
      <span className="text-[#4a5c3a]">{label}</span>
      <span className="ml-auto" style={{ color }}>
        {status}
      </span>
    </div>
  );
}

function UnitLabel({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-3 h-3 bg-[#fbbf24]" />
      <span className="text-xs font-mono text-[#4a5c3a] uppercase tracking-widest">{text}</span>
    </div>
  );
}

function PowerBar({
  label,
  percent,
  color = "#fbbf24",
}: {
  label: string;
  percent: number;
  color?: string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-xs font-mono uppercase tracking-widest text-[#4a5c3a]">{label}</span>
        <span className="text-xs font-mono uppercase tracking-widest" style={{ color }}>
          {percent}%
        </span>
      </div>
      <div className="h-2 bg-[#0f1c38] border border-[#4a5c3a]/30 rounded-none">
        <div
          className="h-full rounded-none transition-all duration-150 ease-linear"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

function MechaDivider() {
  return (
    <div className="flex items-center gap-4 py-6">
      <div className="h-px flex-1 bg-[#4a5c3a]/30" />
      <div className="w-3 h-3 bg-[#fbbf24]" />
      <div className="h-0.5 w-8 bg-[#fbbf24]" />
      <div className="w-3 h-3 border-2 border-[#ef4444]" />
      <div className="h-px flex-1 bg-[#4a5c3a]/30" />
    </div>
  );
}

function PanelFrame({
  children,
  className = "",
  borderColor = "#4a5c3a",
}: {
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
}) {
  return (
    <div
      className={`relative rounded-none ${className}`}
      style={{
        border: `2px solid ${borderColor}`,
        clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)",
      }}
    >
      {/* Offset shadow panel */}
      <div
        className="absolute top-1 left-1 -right-1 -bottom-1 pointer-events-none rounded-none"
        style={{ border: "1px solid rgba(251, 191, 36, 0.15)" }}
      />
      {/* Top-right corner bracket */}
      <div
        className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 pointer-events-none"
        style={{ borderColor: `${borderColor}60` }}
      />
      {children}
    </div>
  );
}

/* --- Color data --- */

const colorPalette = [
  { name: "Deep Navy", hex: "#1a2744", role: "Primary Background", textColor: "#fbbf24" },
  { name: "Abyss Blue", hex: "#0f1c38", role: "Darker Panel BG", textColor: "#fbbf24" },
  { name: "Military Green", hex: "#4a5c3a", role: "Secondary / Borders", textColor: "#ffffff" },
  { name: "Warning Yellow", hex: "#fbbf24", role: "Primary Accent", textColor: "#1a2744" },
  { name: "Danger Red", hex: "#ef4444", role: "Alert / Danger", textColor: "#ffffff" },
  { name: "Steel Dark", hex: "#2b2b2b", role: "Button Surface", textColor: "#fbbf24" },
];

/* --- Do / Don't rules --- */

const doRules = [
  "Use military green and deep navy as base palette",
  "Add warning yellow #fbbf24 and danger red #ef4444 for accents",
  "Use monospace fonts with uppercase and tracking-widest",
  "Design sharp-cornered panels with no border-radius (rounded-none)",
  "Add technical annotations, unit numbers, and status codes",
  "Use hard-edge shadows (shadow-[4px_4px_0px_color]) on panels",
];

const dontRules = [
  "Never use soft rounded corners or pill shapes",
  "Avoid pastel, pink, or light-toned palettes",
  "Do not use glassmorphism or blur effects",
  "Avoid handwritten, cursive, or decorative fonts",
];

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"button" | "card" | "input">("button");
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1c38] text-[#e5e5e5] font-mono uppercase">
      <style>{`
        @keyframes mecha-scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes mecha-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .mecha-scanline-overlay::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(251,191,36,0.15), transparent);
          animation: mecha-scanline 4s linear infinite;
          pointer-events: none;
        }
        .mecha-hover-underline {
          position: relative;
        }
        .mecha-hover-underline::after {
          content: '';
          position: absolute;
          width: 100%;
          transform: scaleX(0);
          height: 2px;
          bottom: 0;
          left: 0;
          background: #fbbf24;
          transform-origin: bottom right;
          transition: transform 0.15s ease-linear;
        }
        .mecha-hover-underline:hover::after {
          transform: scaleX(1);
          transform-origin: bottom left;
        }
      `}</style>

      {/* ===== 1. Fixed Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f1c38]/95 backdrop-blur-sm">
        <WarningStripe />
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14 md:h-16 border-b border-[#4a5c3a]/30">
            <Link
              href="/styles/mecha/showcase"
              className="flex items-center gap-3 text-[#fbbf24] tracking-widest text-sm font-bold"
            >
              <div className="w-3 h-3 bg-[#fbbf24]" />
              MECHA_SYS
            </Link>
            <nav className="flex items-center gap-6 md:gap-8">
              <Link
                href="/styles/mecha"
                className="text-xs tracking-widest text-[#4a5c3a] mecha-hover-underline pb-1 font-bold"
              >
                DOCS
              </Link>
              <Link
                href="/styles"
                className="text-xs tracking-widest text-[#4a5c3a] mecha-hover-underline pb-1 font-bold"
              >
                STYLEKIT
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== 2. Hero Section ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <TechGrid />

        {/* Warning stripes top */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <WarningStripe />
        </div>

        {/* Scanline overlay */}
        <div className="absolute inset-0 mecha-scanline-overlay pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center pt-32 md:pt-0">
          {/* Left: Title block */}
          <div>
            <div
              className="flex items-center gap-3 mb-6"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.4s ease-linear, transform 0.4s ease-linear",
              }}
            >
              <div className="h-0.5 w-8 bg-[#fbbf24]" />
              <span className="text-xs tracking-widest text-[#4a5c3a] font-bold">
                // SYSTEM ONLINE
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold leading-[0.95] tracking-tight mb-6">
              <span
                className="block text-[#fbbf24]"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 0.5s ease-linear, transform 0.5s ease-linear",
                }}
              >
                MECHA
              </span>
              <span
                className="block text-[#4a5c3a] text-4xl md:text-5xl mt-2"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
                  transition: "opacity 0.5s ease-linear 0.1s, transform 0.5s ease-linear 0.1s",
                }}
              >
                ARMOR CLASS
              </span>
            </h1>

            <p
              className="text-sm md:text-base text-[#4a5c3a] tracking-wider max-w-md mb-8"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.5s ease-linear 0.2s, transform 0.5s ease-linear 0.2s",
              }}
            >
              Industrial-grade design framework. Military precision. Zero compromise.
            </p>

            <div
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 0.5s ease-linear 0.3s",
              }}
            >
              <button
                className="
                  group relative overflow-hidden px-10 py-3
                  bg-[#2b2b2b] text-[#fbbf24]
                  font-bold tracking-widest rounded-none
                  border-2 border-[#fbbf24]/60
                  shadow-[4px_4px_0px_#1a2744]
                  hover:bg-[#fbbf24] hover:text-[#1a2744] hover:border-[#fbbf24]
                  active:translate-y-[2px] active:shadow-[2px_2px_0px_#1a2744]
                  transition-all duration-100 ease-linear
                "
                style={{
                  clipPath:
                    "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
                }}
              >
                <span
                  className="pointer-events-none absolute inset-0 opacity-0 transition-none group-hover:opacity-20"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #000 0px, #000 6px, transparent 6px, transparent 12px)",
                  }}
                />
                <span className="relative z-10">DEPLOY_SYSTEM</span>
              </button>
            </div>
          </div>

          {/* Right: System status panel */}
          <div
            className="hidden md:block"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.5s ease-linear 0.2s, transform 0.5s ease-linear 0.2s",
            }}
          >
            <PanelFrame className="p-6 bg-[#1a2744]">
              <UnitLabel text="UNIT-01 // STATUS PANEL" className="mb-6" />

              <div className="space-y-4 mb-6">
                <PowerBar label="REACTOR_CORE" percent={94} color="#fbbf24" />
                <PowerBar label="ARMOR_INTEGRITY" percent={87} color="#4a5c3a" />
                <PowerBar label="WEAPON_SYS" percent={100} color="#fbbf24" />
                <PowerBar label="SHIELD_GEN" percent={72} color="#ef4444" />
              </div>

              <div className="border-t border-[#4a5c3a]/30 pt-4 space-y-2">
                <StatusIndicator label="MAIN_DRIVE" status="ACTIVE" color="#fbbf24" />
                <StatusIndicator label="COMMS_LINK" status="ONLINE" color="#4a5c3a" />
                <StatusIndicator label="THREAT_LVL" status="ELEVATED" color="#ef4444" />
              </div>

              {/* Blinking alert */}
              <div className="mt-4 flex items-center gap-2">
                <div
                  className="w-2 h-2 bg-[#ef4444]"
                  style={{ animation: "mecha-blink 1s ease-linear infinite" }}
                />
                <span className="text-[10px] tracking-widest text-[#ef4444]">
                  ALERT: COMBAT_READY
                </span>
              </div>
            </PanelFrame>
          </div>
        </div>

        {/* Warning stripes bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <WarningStripe />
        </div>
      </section>

      {/* ===== 3. Component Demos ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock>
          <MechaDivider />
          <h2 className="text-3xl md:text-5xl text-center tracking-wider mb-4 font-bold">
            <span className="text-[#fbbf24]">COMPONENT</span>{" "}
            <span className="text-[#4a5c3a]">ARSENAL</span>
          </h2>
          <p className="text-center text-xs text-[#4a5c3a] tracking-widest mb-12">
            // INTERACTIVE ELEMENTS -- OPERATIONAL STATUS: GREEN
          </p>
        </RevealBlock>

        {/* Tab Switcher */}
        <RevealBlock delay={0.1} className="mb-12">
          <div className="flex gap-0 border-2 border-[#4a5c3a] rounded-none">
            {(["button", "card", "input"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  flex-1 px-6 py-4 text-xs tracking-widest font-bold rounded-none
                  transition-all duration-100 ease-linear
                  ${
                    activeTab === tab
                      ? "bg-[#fbbf24] text-[#1a2744] shadow-[inset_0_-2px_0_#c9a227]"
                      : "bg-[#1a2744] text-[#4a5c3a] hover:text-[#fbbf24] hover:bg-[#1a2744]/80"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>
        </RevealBlock>

        {/* Demo panel */}
        <RevealBlock delay={0.2}>
          <PanelFrame className="p-8 md:p-12 bg-[#1a2744] min-h-[300px]">
            {/* Button demo */}
            {activeTab === "button" && (
              <div className="flex flex-col items-center gap-8">
                <p className="text-xs tracking-widest text-[#4a5c3a] mb-4">
                  // HYDRAULIC RIGIDNESS -- 100ms EASE-LINEAR
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  {/* Primary */}
                  <button
                    className="
                      group relative overflow-hidden px-10 py-3
                      bg-[#2b2b2b] text-[#fbbf24]
                      font-bold tracking-widest rounded-none
                      border-2 border-[#fbbf24]/60
                      shadow-[4px_4px_0px_#1a2744]
                      hover:bg-[#fbbf24] hover:text-[#1a2744] hover:border-[#fbbf24]
                      active:translate-y-[2px] active:shadow-[2px_2px_0px_#1a2744]
                      transition-all duration-100 ease-linear
                    "
                    style={{
                      clipPath:
                        "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
                    }}
                  >
                    <span
                      className="pointer-events-none absolute inset-0 opacity-0 transition-none group-hover:opacity-20"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(45deg, #000 0px, #000 6px, transparent 6px, transparent 12px)",
                      }}
                    />
                    <span className="relative z-10">ENGAGE_SYSTEM</span>
                  </button>
                  {/* Danger */}
                  <button
                    className="
                      px-10 py-3
                      bg-[#ef4444] text-white
                      font-bold tracking-widest rounded-none
                      border-2 border-[#ef4444]
                      shadow-[4px_4px_0px_#fbbf24]
                      hover:translate-x-[2px] hover:translate-y-[2px]
                      hover:shadow-[2px_2px_0px_#fbbf24]
                      active:translate-x-[4px] active:translate-y-[4px]
                      active:shadow-none
                      transition-all duration-100 ease-linear
                    "
                  >
                    EJECT_POD
                  </button>
                  {/* Ghost */}
                  <button
                    className="
                      px-10 py-3
                      bg-transparent text-[#4a5c3a]
                      font-bold tracking-widest rounded-none
                      border-2 border-[#4a5c3a]
                      hover:border-[#fbbf24] hover:text-[#fbbf24]
                      hover:shadow-[0_0_8px_rgba(251,191,36,0.3)]
                      active:translate-y-[2px]
                      transition-all duration-100 ease-linear
                    "
                  >
                    STANDBY
                  </button>
                </div>
              </div>
            )}

            {/* Card demo */}
            {activeTab === "card" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "ARMOR PANEL",
                    desc: "Status: Operational. Hull integrity nominal.",
                    unit: "UNIT-01",
                    statusColor: "#fbbf24",
                    statusText: "ACTIVE",
                  },
                  {
                    title: "WEAPON ARRAY",
                    desc: "Targeting systems calibrated. Ready to deploy.",
                    unit: "UNIT-02",
                    statusColor: "#ef4444",
                    statusText: "ARMED",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="
                      group relative overflow-hidden p-8
                      bg-[#1a2744] rounded-none
                      border-2 border-[#4a5c3a]
                      border-l-4 border-l-[#fbbf24]
                      shadow-[4px_4px_0px_rgba(251,191,36,0.3)]
                      hover:border-l-[10px]
                      transition-all duration-150 ease-linear
                      cursor-pointer
                    "
                    style={{
                      clipPath:
                        "polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)",
                    }}
                    onMouseEnter={() => setHoveredPanel(i)}
                    onMouseLeave={() => setHoveredPanel(null)}
                  >
                    <div className="absolute top-2 right-2 h-8 w-8 border-t-2 border-r-2 border-[#fbbf24]/40 transition-all duration-150 ease-linear group-hover:translate-x-[-2px] group-hover:translate-y-[2px] group-hover:border-[#fbbf24]" />

                    <UnitLabel text={card.unit} className="mb-3" />
                    <h3 className="text-xl font-bold text-[#fbbf24] mb-2 tracking-wider">
                      {card.title}
                    </h3>
                    <p className="text-[#4a5c3a]/80 text-sm mb-4">{card.desc}</p>
                    <div className="flex items-center justify-end gap-2">
                      <span className="text-[10px] tracking-widest" style={{ color: card.statusColor }}>
                        {card.statusText}
                      </span>
                      <div
                        className="h-2 w-2"
                        style={{
                          backgroundColor: card.statusColor,
                          animation:
                            hoveredPanel === i ? "mecha-blink 0.5s ease-linear infinite" : "none",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Input demo */}
            {activeTab === "input" && (
              <div className="max-w-md mx-auto space-y-8">
                <div>
                  <label className="block text-xs tracking-widest text-[#fbbf24] mb-3 font-bold">
                    // COMMAND_INPUT
                  </label>
                  <input
                    type="text"
                    placeholder="ENTER COMMAND..."
                    className="
                      w-full px-4 py-3
                      bg-[#1a2744]/80
                      border-2 border-[#4a5c3a] rounded-none
                      text-[#fbbf24] placeholder-[#4a5c3a]/60
                      font-mono
                      focus:border-[#fbbf24]
                      focus:shadow-[0_0_8px_rgba(251,191,36,0.4)]
                      focus:outline-none
                      transition-all duration-100 ease-linear
                    "
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-widest text-[#ef4444] mb-3 font-bold">
                    // AUTH_CODE
                  </label>
                  <input
                    type="text"
                    placeholder="ENTER ACCESS CODE..."
                    className="
                      w-full px-4 py-3
                      bg-[#1a2744]/80
                      border-2 border-[#ef4444]/50 rounded-none
                      text-[#ef4444] placeholder-[#ef4444]/30
                      font-mono
                      focus:border-[#ef4444]
                      focus:shadow-[0_0_8px_rgba(239,68,68,0.4)]
                      focus:outline-none
                      transition-all duration-100 ease-linear
                    "
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="w-5 h-5 border-2 border-[#4a5c3a] flex items-center justify-center cursor-pointer hover:border-[#fbbf24] transition-colors duration-100 ease-linear rounded-none"
                  >
                    <div className="w-2.5 h-2.5 bg-[#fbbf24]" />
                  </div>
                  <span className="text-xs text-[#4a5c3a] tracking-widest">
                    CONFIRM AUTHORIZATION PROTOCOL
                  </span>
                </div>
              </div>
            )}
          </PanelFrame>
        </RevealBlock>
      </section>

      {/* ===== 4. Color Palette ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock>
          <MechaDivider />
          <h2 className="text-3xl md:text-5xl text-center tracking-wider mb-4 font-bold">
            <span className="text-[#fbbf24]">COLOUR</span>{" "}
            <span className="text-[#4a5c3a]">REGISTRY</span>
          </h2>
          <p className="text-center text-xs text-[#4a5c3a] tracking-widest mb-16">
            // APPROVED COLOUR CODES -- MIL-SPEC COMPLIANT
          </p>
        </RevealBlock>

        <RevealBlock delay={0.15}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {colorPalette.map((color, i) => (
              <RevealBlock key={color.hex} delay={0.1 + i * 0.05}>
                <div className="group cursor-pointer">
                  <div
                    className="
                      w-full aspect-[4/3] mb-4 border-2 border-[#4a5c3a]/30 rounded-none
                      group-hover:border-[#fbbf24]
                      group-hover:shadow-[4px_4px_0px_rgba(251,191,36,0.3)]
                      transition-all duration-100 ease-linear
                      flex items-end p-4
                    "
                    style={{ backgroundColor: color.hex }}
                  >
                    <span
                      className="text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-100 font-bold"
                      style={{ color: color.textColor }}
                    >
                      {color.hex}
                    </span>
                  </div>
                  <h4 className="text-xs tracking-widest mb-1 font-bold text-[#fbbf24]">
                    {color.name}
                  </h4>
                  <p className="text-[10px] text-[#4a5c3a] tracking-widest">{color.role}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </RevealBlock>
      </section>

      {/* ===== 5. Design Rules (Do / Don't) ===== */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock>
          <MechaDivider />
          <h2 className="text-3xl md:text-5xl text-center tracking-wider mb-4 font-bold">
            <span className="text-[#fbbf24]">DESIGN</span>{" "}
            <span className="text-[#4a5c3a]">PROTOCOL</span>
          </h2>
          <p className="text-center text-xs text-[#4a5c3a] tracking-widest mb-16">
            // OPERATIONAL DIRECTIVES -- STRICT COMPLIANCE REQUIRED
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Do list */}
          <RevealBlock delay={0.1}>
            <PanelFrame className="p-8 bg-[#1a2744]" borderColor="#4a5c3a">
              <UnitLabel text="DIRECTIVE // COMPLY" className="mb-6" />
              <ul className="space-y-5">
                {doRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-3 h-3 bg-[#4a5c3a] shrink-0" />
                    <span className="text-xs text-[#e5e5e5]/70 leading-relaxed tracking-wider normal-case">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </PanelFrame>
          </RevealBlock>

          {/* Don't list */}
          <RevealBlock delay={0.2}>
            <PanelFrame className="p-8 bg-[#1a2744]" borderColor="#ef4444">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-[#ef4444]" />
                <span className="text-xs tracking-widest text-[#ef4444] font-bold">
                  WARNING // PROHIBITED
                </span>
              </div>
              <ul className="space-y-5">
                {dontRules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-3 h-3 bg-[#ef4444] shrink-0" />
                    <span className="text-xs text-[#e5e5e5]/70 leading-relaxed tracking-wider normal-case">
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </PanelFrame>
          </RevealBlock>
        </div>

        {/* Interaction rules */}
        <RevealBlock delay={0.3} className="mt-12">
          <PanelFrame className="p-8 bg-[#1a2744]" borderColor="#fbbf24">
            <UnitLabel text="INTERACTION // SPEC" className="mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: "HYDRAULIC RIGIDNESS",
                  desc: "All transitions use duration-100 to 150 with ease-linear. No soft spring or bounce easing.",
                },
                {
                  name: "ARMOR SHIFTING",
                  desc: "Hover triggers clip-path corner changes and border thickness jumps, simulating armor plate engagement.",
                },
                {
                  name: "HAZARD FLASHING",
                  desc: "Critical controls pulse warning colors (red/yellow) with diagonal stripe overlays on hover.",
                },
                {
                  name: "TACTICAL LOCK-ON",
                  desc: "Active state uses sharp translate with shadow fallback, like pulling a heavy mechanical trigger.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-2 h-2 bg-[#fbbf24] shrink-0" />
                  <div className="normal-case">
                    <span className="text-xs text-[#fbbf24] tracking-widest font-bold uppercase">
                      {item.name}:
                    </span>{" "}
                    <span className="text-xs text-[#e5e5e5]/50 tracking-wider leading-relaxed">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </PanelFrame>
        </RevealBlock>
      </section>

      {/* ===== 6. Footer ===== */}
      <footer className="border-t-2 border-[#4a5c3a]/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <MechaDivider />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#fbbf24]" />
              <p className="text-xs tracking-widest text-[#4a5c3a]">
                STYLEKIT // MECHA SHOWCASE
              </p>
            </div>
            <Link
              href="/styles/mecha"
              className="text-xs tracking-widest text-[#4a5c3a] mecha-hover-underline pb-1 hover:text-[#fbbf24] transition-colors duration-100 ease-linear font-bold"
            >
              VIEW FULL DOCUMENTATION &rarr;
            </Link>
          </div>
        </div>
        <WarningStripe />
      </footer>
    </div>
  );
}
