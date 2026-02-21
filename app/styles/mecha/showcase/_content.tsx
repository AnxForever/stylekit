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
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function TargetIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function ShieldIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7L12 2z" />
    </svg>
  );
}

function BoltIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function CpuIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="0" />
      <rect x="8" y="8" width="8" height="8" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  );
}

function WarnIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" stroke="white" strokeWidth="2" />
      <line x1="12" y1="17" x2="12.01" y2="17" stroke="white" strokeWidth="2" />
    </svg>
  );
}

function CrosshairIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="22" y1="12" x2="18" y2="12" />
      <line x1="6" y1="12" x2="2" y2="12" />
      <line x1="12" y1="6" x2="12" y2="2" />
      <line x1="12" y1="22" x2="12" y2="18" />
    </svg>
  );
}

function GearIcon({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Color constants                                                     */
/* ------------------------------------------------------------------ */

const NAVY = "#1a2744";
const GREEN = "#4a5c3a";
const YELLOW = "#fbbf24";
const RED = "#ef4444";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const paletteSwatches = [
  { name: "NAVY-PRIME", hex: NAVY, label: "Primary Base", usage: "Background, panels" },
  { name: "MILI-GREEN", hex: GREEN, label: "Secondary Base", usage: "Borders, accents" },
  { name: "WARN-YELLOW", hex: YELLOW, label: "Warning Accent", usage: "Highlights, CTA" },
  { name: "DANGER-RED", hex: RED, label: "Danger Accent", usage: "Alerts, errors" },
];

const systemStats = [
  { label: "POWER OUTPUT", value: "94%", color: YELLOW, barW: "94%" },
  { label: "ARMOR INTEGRITY", value: "77%", color: GREEN, barW: "77%" },
  { label: "WEAPON CHARGE", value: "61%", color: YELLOW, barW: "61%" },
  { label: "THERMAL LOAD", value: "38%", color: RED, barW: "38%" },
];

const unitLog = [
  { id: "EVT-001", msg: "Primary thruster online", level: "OK", time: "00:00:01" },
  { id: "EVT-002", msg: "Armor hardpoints locked", level: "OK", time: "00:00:04" },
  { id: "EVT-003", msg: "Thermal spike detected in sector 3", level: "WARN", time: "00:00:09" },
  { id: "EVT-004", msg: "Sync signal lost — relay", level: "ERR", time: "00:00:15" },
  { id: "EVT-005", msg: "Backup uplink established", level: "OK", time: "00:00:17" },
];

type PanelTab = "systems" | "weapons" | "comms" | "data";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<PanelTab>("systems");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);
  const [deployPressed, setDeployPressed] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const [lockActive, setLockActive] = useState(false);
  const [hydraulicActive, setHydraulicActive] = useState(false);
  const [armorHovered, setArmorHovered] = useState(false);
  const [hazardHovered, setHazardHovered] = useState(false);
  const [triggerPressed, setTriggerPressed] = useState(false);
  const [cmdValue, setCmdValue] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  /* ================================================================ */
  /* RENDER                                                            */
  /* ================================================================ */
  return (
    <div
      className="min-h-screen overflow-x-hidden font-mono"
      style={{ backgroundColor: NAVY, color: YELLOW }}
    >
      <style>{`
        @keyframes mecha-scan {
          0% { transform: translateY(-100%); opacity: 0.7; }
          100% { transform: translateY(400%); opacity: 0; }
        }
        @keyframes mecha-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes mecha-pulse-red {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
          50% { box-shadow: 0 0 0 6px rgba(239,68,68,0.25); }
        }
        @keyframes mecha-stripe-march {
          from { background-position: 0 0; }
          to { background-position: 40px 0; }
        }
        @keyframes mecha-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .mecha-blink {
          animation: mecha-blink 1.2s ease-in-out infinite;
        }
        .mecha-pulse-red {
          animation: mecha-pulse-red 1.4s ease-in-out infinite;
        }
        .mecha-stripe-march {
          animation: mecha-stripe-march 1.5s linear infinite;
        }
        .mecha-spin-slow {
          animation: mecha-spin 8s linear infinite;
        }
        .mecha-grid-bg {
          background-image:
            linear-gradient(rgba(74,92,58,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74,92,58,0.15) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                     */}
      {/* ================================================================ */}
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: `${NAVY}f0`,
          borderBottom: `2px solid ${GREEN}`,
          backdropFilter: "blur(4px)",
        }}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-14">
          {/* Logo panel */}
          <div
            className="flex items-center gap-2 px-3 py-1.5"
            style={{
              border: `2px solid ${YELLOW}`,
              clipPath: "polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)",
            }}
          >
            <ShieldIcon className="w-4 h-4" style={{ color: YELLOW }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: YELLOW }}>
              MECHA<span style={{ color: RED }}>-</span>SYSTEM
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {["SYSTEMS", "PALETTE", "COMPONENTS", "ANIMATION", "PROTOCOL"].map((item) => (
              <span
                key={item}
                className="px-3 py-1 text-xs uppercase tracking-widest cursor-pointer transition-all duration-100 ease-linear"
                style={{ color: `${GREEN}cc` }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = YELLOW;
                  (e.currentTarget as HTMLElement).style.backgroundColor = `${YELLOW}15`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = `${GREEN}cc`;
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                {item}
              </span>
            ))}
          </nav>

          {/* Back link */}
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-widest font-bold transition-all duration-100 ease-linear"
            style={{
              color: NAVY,
              backgroundColor: YELLOW,
              border: `2px solid ${YELLOW}`,
              clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%)",
              boxShadow: `3px 3px 0 ${GREEN}`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = `1px 1px 0 ${GREEN}`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
              (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0 ${GREEN}`;
            }}
          >
            <span>&#8592;</span>
            <span>STYLEKIT</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO — System boot screen                                     */}
      {/* ================================================================ */}
      <section
        className="relative pt-28 pb-24 px-5 md:px-10 overflow-hidden mecha-grid-bg"
        style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
      >
        {/* Top warning stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-3 mecha-stripe-march"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, ${YELLOW} 0px, ${YELLOW} 20px, ${NAVY} 20px, ${NAVY} 40px)`,
          }}
        />

        {/* Corner brackets */}
        <div className="absolute top-16 left-5 w-10 h-10 pointer-events-none"
          style={{ borderTop: `2px solid ${YELLOW}40`, borderLeft: `2px solid ${YELLOW}40` }} />
        <div className="absolute top-16 right-5 w-10 h-10 pointer-events-none"
          style={{ borderTop: `2px solid ${YELLOW}40`, borderRight: `2px solid ${YELLOW}40` }} />
        <div className="absolute bottom-5 left-5 w-10 h-10 pointer-events-none"
          style={{ borderBottom: `2px solid ${YELLOW}40`, borderLeft: `2px solid ${YELLOW}40` }} />
        <div className="absolute bottom-5 right-5 w-10 h-10 pointer-events-none"
          style={{ borderBottom: `2px solid ${YELLOW}40`, borderRight: `2px solid ${YELLOW}40` }} />

        {/* Spinning crosshair decoration */}
        <div className="absolute top-24 right-10 opacity-20 mecha-spin-slow hidden md:block">
          <CrosshairIcon className="w-24 h-24" style={{ color: GREEN }} />
        </div>
        <div className="absolute bottom-24 left-10 opacity-10 hidden md:block" style={{ animation: "mecha-spin 14s linear infinite reverse" }}>
          <GearIcon className="w-20 h-20" style={{ color: YELLOW }} />
        </div>

        {/* Scanline */}
        {scanActive && (
          <div
            className="absolute left-0 right-0 h-1 pointer-events-none z-20"
            style={{
              background: `linear-gradient(90deg, transparent, ${YELLOW}80, transparent)`,
              animation: "mecha-scan 1.5s linear",
              top: "14px",
            }}
          />
        )}

        <div className="max-w-6xl mx-auto relative w-full">
          {/* System ID tag */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2" style={{ backgroundColor: YELLOW }} />
              <span
                className="text-xs uppercase tracking-[0.3em]"
                style={{ color: GREEN }}
              >
                // UNIT-EVA-01 — SYSTEM ONLINE
              </span>
              <div className="w-2 h-2 mecha-blink" style={{ backgroundColor: RED }} />
            </div>
          </div>

          {/* Main title */}
          <h1
            className="text-6xl md:text-8xl lg:text-[100px] font-bold uppercase leading-none mb-4"
            style={{
              color: YELLOW,
              letterSpacing: "0.05em",
              textShadow: `4px 4px 0 ${GREEN}60`,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            MECHA
          </h1>

          <div
            className="text-xl md:text-2xl font-bold uppercase tracking-[0.2em] mb-8"
            style={{
              color: GREEN,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.18s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.18s",
            }}
          >
            ARMOR CLASS // OPERATIONAL
          </div>

          <p
            className="text-sm uppercase tracking-widest mb-10 max-w-xl leading-relaxed"
            style={{
              color: `${GREEN}bb`,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.24s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.24s",
            }}
          >
            Inspired by Gundam / EVA aesthetics — tech panels, warning signals,
            military-industrial color palette. Angular, hard-edged, relentless.
          </p>

          {/* CTA row */}
          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.32s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.32s",
            }}
          >
            {/* Primary — Tactical Lock-on demo */}
            <button
              className="relative overflow-hidden flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-100 ease-linear"
              style={{
                backgroundColor: deployPressed ? RED : YELLOW,
                color: NAVY,
                border: `2px solid ${YELLOW}`,
                clipPath: "polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)",
                boxShadow: deployPressed ? `2px 2px 0 ${GREEN}` : `4px 4px 0 ${GREEN}`,
                transform: deployPressed ? "translate(2px,2px)" : "translate(0,0)",
              }}
              onMouseDown={() => setDeployPressed(true)}
              onMouseUp={() => setDeployPressed(false)}
              onMouseLeave={() => setDeployPressed(false)}
              onClick={() => { setScanActive(true); setTimeout(() => setScanActive(false), 1600); }}
            >
              <BoltIcon className="w-4 h-4" />
              DEPLOY
            </button>

            {/* Secondary */}
            <button
              className="flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-100 ease-linear"
              style={{
                backgroundColor: "transparent",
                color: GREEN,
                border: `2px solid ${GREEN}`,
                clipPath: "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,0 100%)",
                boxShadow: `4px 4px 0 ${GREEN}40`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = YELLOW;
                (e.currentTarget as HTMLElement).style.borderColor = YELLOW;
                (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${YELLOW}60`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = GREEN;
                (e.currentTarget as HTMLElement).style.borderColor = GREEN;
                (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${GREEN}40`;
              }}
            >
              <TargetIcon className="w-4 h-4" />
              SCAN DATA
            </button>
          </div>

          {/* Stats bar */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.42s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.42s",
            }}
          >
            {[
              { label: "UNITS ACTIVE", value: "3 / 5", color: YELLOW },
              { label: "THREAT LEVEL", value: "ALPHA-3", color: RED },
              { label: "SYNC RATE", value: "89.7%", color: GREEN },
              { label: "UPTIME", value: "14:22:09", color: YELLOW },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="p-4 transition-all duration-100 ease-linear cursor-default"
                style={{
                  backgroundColor: `${GREEN}18`,
                  border: `1px solid ${GREEN}60`,
                  borderLeft: `3px solid ${stat.color}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = `${stat.color}15`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = `${GREEN}18`;
                }}
              >
                <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: `${GREEN}99` }}>
                  [{String(i + 1).padStart(2, "0")}] {stat.label}
                </div>
                <div className="text-lg font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 mecha-grid-bg">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2" style={{ backgroundColor: YELLOW }} />
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color: GREEN }}>
                // PALETTE REGISTRY
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase" style={{ color: YELLOW, letterSpacing: "0.04em" }}>
              COLOR SYSTEM
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-sm uppercase tracking-widest leading-relaxed max-w-lg" style={{ color: `${GREEN}bb` }}>
              Four primary combat colors — navy base, military green support,
              warning yellow for critical UI, danger red for hazard signals.
            </p>
          </RevealBlock>

          {/* Main swatches */}
          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
              {paletteSwatches.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="cursor-pointer transition-all duration-100 ease-linear"
                  style={{
                    border: `2px solid ${hoveredSwatch === i ? YELLOW : GREEN}`,
                    transform: hoveredSwatch === i ? "translateY(-4px)" : "translateY(0)",
                    boxShadow: hoveredSwatch === i ? `4px 4px 0 ${YELLOW}60` : `4px 4px 0 ${GREEN}40`,
                  }}
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  {/* Color swatch */}
                  <div
                    className="h-28 w-full relative"
                    style={{ backgroundColor: swatch.hex }}
                  >
                    {/* Warning stripes on navy */}
                    {swatch.hex === NAVY && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-4 opacity-40"
                        style={{
                          backgroundImage: `repeating-linear-gradient(-45deg, ${YELLOW}, ${YELLOW} 4px, ${NAVY} 4px, ${NAVY} 8px)`,
                        }}
                      />
                    )}
                    {/* ID label */}
                    <div
                      className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-widest"
                      style={{ color: swatch.hex === NAVY ? YELLOW : NAVY }}
                    >
                      [{String(i + 1).padStart(2, "0")}]
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="p-3" style={{ backgroundColor: `${NAVY}cc` }}>
                    <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: YELLOW }}>
                      {swatch.name}
                    </div>
                    <div className="text-[10px] font-mono mb-1" style={{ color: GREEN }}>
                      {swatch.hex}
                    </div>
                    <div
                      className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 inline-block"
                      style={{ backgroundColor: `${GREEN}30`, color: `${GREEN}cc` }}
                    >
                      {swatch.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Usage matrix */}
          <RevealBlock delay={0.18}>
            <div
              className="p-6"
              style={{
                border: `2px solid ${GREEN}`,
                borderLeft: `4px solid ${YELLOW}`,
                backgroundColor: `${GREEN}10`,
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5" style={{ backgroundColor: YELLOW }} />
                <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: GREEN }}>
                  COLOR USAGE MATRIX
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { role: "Background / Panels", spec: "#1a2744 navy", color: NAVY },
                  { role: "Borders / Support", spec: "#4a5c3a green", color: GREEN },
                  { role: "Primary CTA / Titles", spec: "#fbbf24 yellow", color: YELLOW },
                  { role: "Alerts / Danger States", spec: "#ef4444 red", color: RED },
                ].map((row) => (
                  <div key={row.role} className="flex items-center justify-between py-2"
                    style={{ borderBottom: `1px solid ${GREEN}40` }}>
                    <span className="text-xs uppercase tracking-widest" style={{ color: `${GREEN}aa` }}>
                      {row.role}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3" style={{ backgroundColor: row.color, border: `1px solid ${GREEN}80` }} />
                      <code className="text-[10px]" style={{ color: YELLOW }}>{row.spec}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. COMPONENT GALLERY (4 tabs)                                    */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ backgroundColor: `${GREEN}08` }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2" style={{ backgroundColor: YELLOW }} />
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color: GREEN }}>
                // COMPONENT ARMORY
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase" style={{ color: YELLOW, letterSpacing: "0.04em" }}>
              BATTLE COMPONENTS
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-sm uppercase tracking-widest leading-relaxed max-w-lg" style={{ color: `${GREEN}bb` }}>
              Angular panels, hard-edge shadows, zero rounded corners.
              Every interaction fires like a weapon system.
            </p>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["systems", "weapons", "comms", "data"] as PanelTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-100 ease-linear"
                  style={{
                    backgroundColor: activeTab === tab ? YELLOW : "transparent",
                    color: activeTab === tab ? NAVY : `${GREEN}cc`,
                    border: `2px solid ${activeTab === tab ? YELLOW : GREEN}`,
                    boxShadow: activeTab === tab ? `3px 3px 0 ${GREEN}` : "none",
                    transform: activeTab === tab ? "translate(-1px,-1px)" : "translate(0,0)",
                  }}
                >
                  [{tab.toUpperCase()}]
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.15}>
            <div
              className="p-8 md:p-12"
              style={{
                border: `2px solid ${GREEN}`,
                borderLeft: `4px solid ${YELLOW}`,
                backgroundColor: `${NAVY}dd`,
                clipPath: "polygon(0 0,100% 0,100% calc(100% - 24px),calc(100% - 24px) 100%,0 100%)",
              }}
            >
              {/* Top corner decoration */}
              <div className="relative mb-8">
                <div
                  className="absolute top-0 right-0 w-12 h-12"
                  style={{ borderTop: `2px solid ${YELLOW}60`, borderRight: `2px solid ${YELLOW}60` }}
                />
                <div className="text-[10px] uppercase tracking-widest" style={{ color: `${GREEN}80` }}>
                  MODULE // {activeTab.toUpperCase()}_PANEL
                </div>
              </div>

              {/* ---- SYSTEMS TAB ---- */}
              {activeTab === "systems" && (
                <div className="space-y-10">
                  {/* Buttons */}
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] mb-5" style={{ color: `${GREEN}99` }}>
                      ENGAGEMENT CONTROLS
                    </div>
                    <div className="flex flex-wrap gap-4 items-center">
                      {/* Primary angular button */}
                      <button
                        className="group relative overflow-hidden flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-100 ease-linear"
                        style={{
                          backgroundColor: "#2b2b2b",
                          color: YELLOW,
                          border: `2px solid ${YELLOW}60`,
                          boxShadow: `4px 4px 0 ${NAVY}`,
                          clipPath: "polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = YELLOW;
                          (e.currentTarget as HTMLElement).style.color = NAVY;
                          (e.currentTarget as HTMLElement).style.borderColor = YELLOW;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = "#2b2b2b";
                          (e.currentTarget as HTMLElement).style.color = YELLOW;
                          (e.currentTarget as HTMLElement).style.borderColor = `${YELLOW}60`;
                        }}
                        onMouseDown={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px)";
                          (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0 ${NAVY}`;
                        }}
                        onMouseUp={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                          (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${NAVY}`;
                        }}
                      >
                        <BoltIcon className="w-4 h-4" />
                        ENGAGE_SYSTEM
                      </button>

                      {/* Danger button */}
                      <button
                        className="flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-100 ease-linear"
                        style={{
                          backgroundColor: "transparent",
                          color: RED,
                          border: `2px solid ${RED}`,
                          clipPath: "polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,0 100%)",
                          boxShadow: `4px 4px 0 ${RED}40`,
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = RED;
                          (e.currentTarget as HTMLElement).style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                          (e.currentTarget as HTMLElement).style.color = RED;
                        }}
                        onMouseDown={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px)";
                          (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0 ${RED}40`;
                        }}
                        onMouseUp={(e) => {
                          (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                          (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${RED}40`;
                        }}
                      >
                        <WarnIcon className="w-4 h-4" />
                        ABORT
                      </button>

                      {/* Ghost button */}
                      <button
                        className="px-8 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-100 ease-linear"
                        style={{
                          backgroundColor: "transparent",
                          color: GREEN,
                          border: `2px solid ${GREEN}`,
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.color = YELLOW;
                          (e.currentTarget as HTMLElement).style.borderColor = YELLOW;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.color = GREEN;
                          (e.currentTarget as HTMLElement).style.borderColor = GREEN;
                        }}
                      >
                        STANDBY
                      </button>
                    </div>
                  </div>

                  {/* Input */}
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] mb-5" style={{ color: `${GREEN}99` }}>
                      COMMAND TERMINAL
                    </div>
                    <div className="relative max-w-md">
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1"
                        style={{ backgroundColor: cmdValue ? YELLOW : GREEN }}
                      />
                      <input
                        type="text"
                        value={cmdValue}
                        onChange={(e) => setCmdValue(e.target.value)}
                        placeholder="ENTER COMMAND..."
                        className="w-full px-4 py-3 pl-5 font-mono text-sm uppercase bg-transparent transition-all duration-150 ease-linear outline-none"
                        style={{
                          color: YELLOW,
                          border: `2px solid ${GREEN}`,
                          borderLeft: "none",
                          backgroundColor: `${NAVY}80`,
                        }}
                        onFocus={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = YELLOW;
                          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 8px ${YELLOW}40`;
                        }}
                        onBlur={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = GREEN;
                          (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        }}
                      />
                      {cmdValue && (
                        <div
                          className="absolute right-0 top-0 bottom-0 flex items-center px-3 text-[10px] uppercase tracking-widest"
                          style={{ color: YELLOW, backgroundColor: `${GREEN}30` }}
                        >
                          EXEC
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ---- WEAPONS TAB ---- */}
              {activeTab === "weapons" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { id: "WPN-01", name: "PLASMA CANNON", status: "ACTIVE", charge: 94, color: YELLOW },
                    { id: "WPN-02", name: "RAILGUN ARRAY", status: "STANDBY", charge: 62, color: GREEN },
                    { id: "WPN-03", name: "MISSILE PODS", status: "RELOAD", charge: 23, color: RED },
                    { id: "WPN-04", name: "BEAM SABER", status: "ACTIVE", charge: 100, color: YELLOW },
                  ].map((wpn) => (
                    <div
                      key={wpn.id}
                      className="group p-5 transition-all duration-150 ease-linear cursor-pointer relative"
                      style={{
                        backgroundColor: `${NAVY}cc`,
                        border: `2px solid ${GREEN}`,
                        borderLeft: `4px solid ${wpn.color}`,
                        clipPath: "polygon(0 0,100% 0,100% calc(100% - 16px),calc(100% - 16px) 100%,0 100%)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderLeftWidth = "10px";
                        (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${wpn.color}40`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderLeftWidth = "4px";
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                      }}
                    >
                      {/* Corner bracket */}
                      <div
                        className="absolute top-2 right-2 w-6 h-6 transition-all duration-150 ease-linear group-hover:w-8 group-hover:h-8"
                        style={{ borderTop: `2px solid ${wpn.color}60`, borderRight: `2px solid ${wpn.color}60` }}
                      />

                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2" style={{ backgroundColor: wpn.color }} />
                        <span className="text-[10px] uppercase tracking-widest" style={{ color: `${GREEN}99` }}>
                          {wpn.id}
                        </span>
                      </div>
                      <h4
                        className="text-base font-bold uppercase tracking-widest mb-3"
                        style={{ color: wpn.color }}
                      >
                        {wpn.name}
                      </h4>

                      {/* Charge bar */}
                      <div
                        className="h-1.5 mb-3"
                        style={{ backgroundColor: `${GREEN}30` }}
                      >
                        <div
                          className="h-full transition-all duration-500"
                          style={{ width: `${wpn.charge}%`, backgroundColor: wpn.color }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span
                          className="text-[10px] uppercase tracking-widest px-2 py-0.5"
                          style={{
                            color: wpn.status === "ACTIVE" ? GREEN : wpn.status === "RELOAD" ? RED : `${GREEN}80`,
                            border: `1px solid ${wpn.status === "ACTIVE" ? GREEN : wpn.status === "RELOAD" ? RED : `${GREEN}40`}`,
                          }}
                        >
                          {wpn.status}
                        </span>
                        <span className="text-xs font-bold" style={{ color: wpn.color }}>{wpn.charge}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ---- COMMS TAB ---- */}
              {activeTab === "comms" && (
                <div className="space-y-8">
                  {/* Signal indicators */}
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] mb-5" style={{ color: `${GREEN}99` }}>
                      SIGNAL BADGES
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { label: "ONLINE", bg: `${GREEN}30`, text: GREEN, border: GREEN },
                        { label: "OFFLINE", bg: `${RED}20`, text: RED, border: RED },
                        { label: "SYNC", bg: `${YELLOW}20`, text: YELLOW, border: YELLOW },
                        { label: "ARMED", bg: `${RED}30`, text: RED, border: RED },
                        { label: "STANDBY", bg: `${GREEN}20`, text: `${GREEN}cc`, border: `${GREEN}60` },
                        { label: "CRITICAL", bg: `${RED}25`, text: RED, border: RED },
                      ].map((b) => (
                        <span
                          key={b.label}
                          className="flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-all duration-100 ease-linear cursor-default"
                          style={{
                            backgroundColor: b.bg,
                            color: b.text,
                            border: `1px solid ${b.border}`,
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                            (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0 ${b.border}`;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "none";
                          }}
                        >
                          <div
                            className="w-1.5 h-1.5"
                            style={{ backgroundColor: b.text }}
                          />
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Progress bars — system load */}
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] mb-5" style={{ color: `${GREEN}99` }}>
                      SYSTEM LOAD
                    </div>
                    <div className="space-y-4">
                      {systemStats.map((stat) => (
                        <div key={stat.label}>
                          <div className="flex justify-between mb-2">
                            <span className="text-[10px] uppercase tracking-widest" style={{ color: GREEN }}>
                              {stat.label}
                            </span>
                            <span className="text-[10px] font-bold" style={{ color: stat.color }}>
                              {stat.value}
                            </span>
                          </div>
                          <div className="h-2 relative" style={{ backgroundColor: `${GREEN}20` }}>
                            <div
                              className="h-full transition-all duration-700"
                              style={{ width: stat.barW, backgroundColor: stat.color }}
                            />
                            {/* Segment ticks */}
                            {[25, 50, 75].map((tick) => (
                              <div
                                key={tick}
                                className="absolute top-0 bottom-0 w-px"
                                style={{ left: `${tick}%`, backgroundColor: `${NAVY}80` }}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---- DATA TAB ---- */}
              {activeTab === "data" && (
                <div className="space-y-6">
                  <div className="text-[10px] uppercase tracking-[0.2em] mb-5" style={{ color: `${GREEN}99` }}>
                    EVENT LOG — UNIT-EVA-01
                  </div>
                  <div className="space-y-2">
                    {unitLog.map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-center gap-4 p-3 transition-all duration-100 ease-linear cursor-default"
                        style={{
                          backgroundColor: `${GREEN}10`,
                          border: `1px solid ${GREEN}40`,
                          borderLeft: `3px solid ${entry.level === "ERR" ? RED : entry.level === "WARN" ? YELLOW : GREEN}`,
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = `${GREEN}20`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = `${GREEN}10`;
                        }}
                      >
                        <span className="text-[10px] font-bold shrink-0" style={{ color: `${GREEN}80` }}>
                          {entry.time}
                        </span>
                        <span
                          className="text-[10px] font-bold uppercase tracking-widest shrink-0 px-1.5 py-0.5"
                          style={{
                            color: entry.level === "ERR" ? RED : entry.level === "WARN" ? YELLOW : GREEN,
                            border: `1px solid ${entry.level === "ERR" ? RED : entry.level === "WARN" ? YELLOW : GREEN}`,
                          }}
                        >
                          {entry.level}
                        </span>
                        <span className="text-xs uppercase tracking-widest" style={{ color: `${GREEN}cc` }}>
                          {entry.msg}
                        </span>
                        <span className="text-[10px] ml-auto shrink-0" style={{ color: `${GREEN}60` }}>
                          {entry.id}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. ANIMATION & INTERACTION RULES — all 4 named aiRules          */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 mecha-grid-bg">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2 mecha-blink" style={{ backgroundColor: RED }} />
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color: GREEN }}>
                // ANIMATION PROTOCOL
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase" style={{ color: YELLOW, letterSpacing: "0.04em" }}>
              INTERACTION RULES
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p className="text-sm uppercase tracking-widest leading-relaxed max-w-lg" style={{ color: `${GREEN}bb` }}>
              Four named protocols define all mecha interaction behavior.
              Hover, click, and hold each demo to observe the mechanics.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* ---- Rule 1: Hydraulic Rigidness ---- */}
            <RevealBlock delay={0.08}>
              <div
                className="p-8 h-full"
                style={{
                  border: `2px solid ${GREEN}`,
                  borderLeft: `4px solid ${YELLOW}`,
                  backgroundColor: `${NAVY}cc`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{ backgroundColor: `${YELLOW}20`, color: YELLOW, border: `1px solid ${YELLOW}60` }}
                  >
                    RULE-01
                  </span>
                  <span className="text-sm font-bold uppercase tracking-widest" style={{ color: YELLOW }}>
                    Hydraulic Rigidness
                  </span>
                </div>

                <p
                  className="text-[10px] font-mono mb-2 uppercase tracking-widest leading-relaxed"
                  style={{ color: `${GREEN}80` }}
                >
                  duration-100~150 + ease-linear
                </p>
                <p className="text-xs mb-6 leading-relaxed" style={{ color: `${GREEN}bb` }}>
                  All interactions use hard, mechanical linear cuts — no spring easing.
                  Toggle the arm to feel the instant, hydraulic snap.
                </p>

                <div className="space-y-4">
                  {/* Linear demo */}
                  <div>
                    <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: `${GREEN}80` }}>
                      HYDRAULIC (ease-linear, 100ms)
                    </div>
                    <div
                      className="h-10 flex items-center px-2 mb-2"
                      style={{ backgroundColor: `${GREEN}15`, border: `1px solid ${GREEN}40` }}
                    >
                      <div
                        className="w-7 h-7"
                        style={{
                          backgroundColor: YELLOW,
                          transform: hydraulicActive ? "translateX(160px)" : "translateX(0)",
                          transition: hydraulicActive ? "transform 0.1s ease-linear" : "transform 0.3s ease-linear",
                        }}
                      />
                    </div>
                    <button
                      className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-100 ease-linear"
                      style={{
                        color: NAVY,
                        backgroundColor: YELLOW,
                        border: `2px solid ${YELLOW}`,
                        boxShadow: `3px 3px 0 ${GREEN}`,
                      }}
                      onClick={() => setHydraulicActive((v) => !v)}
                      onMouseDown={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `1px 1px 0 ${GREEN}`;
                      }}
                      onMouseUp={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                        (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0 ${GREEN}`;
                      }}
                    >
                      {hydraulicActive ? "RETRACT" : "EXTEND"}
                    </button>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* ---- Rule 2: Armor Shifting ---- */}
            <RevealBlock delay={0.12}>
              <div
                className="p-8 h-full"
                style={{
                  border: `2px solid ${GREEN}`,
                  borderLeft: `4px solid ${GREEN}`,
                  backgroundColor: `${NAVY}cc`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{ backgroundColor: `${GREEN}30`, color: GREEN, border: `1px solid ${GREEN}` }}
                  >
                    RULE-02
                  </span>
                  <span className="text-sm font-bold uppercase tracking-widest" style={{ color: YELLOW }}>
                    Armor Shifting
                  </span>
                </div>

                <p
                  className="text-[10px] font-mono mb-2 uppercase tracking-widest leading-relaxed"
                  style={{ color: `${GREEN}80` }}
                >
                  clip-path change + border-l thickness shift
                </p>
                <p className="text-xs mb-6 leading-relaxed" style={{ color: `${GREEN}bb` }}>
                  Hover to see clip-path corner morph and border-left expand — simulating
                  armor plate sliding and locking into position.
                </p>

                <div className="flex items-center justify-center py-4">
                  <div
                    className="w-48 h-28 flex flex-col justify-end p-4 cursor-pointer transition-all duration-150 ease-linear relative"
                    style={{
                      backgroundColor: `${GREEN}20`,
                      border: `2px solid ${GREEN}`,
                      borderLeft: armorHovered ? `10px solid ${YELLOW}` : `4px solid ${YELLOW}`,
                      clipPath: armorHovered
                        ? "polygon(0 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%)"
                        : "polygon(0 0,100% 0,100% calc(100% - 24px),calc(100% - 24px) 100%,0 100%)",
                      boxShadow: armorHovered ? `6px 6px 0 ${YELLOW}40` : `4px 4px 0 ${GREEN}40`,
                    }}
                    onMouseEnter={() => setArmorHovered(true)}
                    onMouseLeave={() => setArmorHovered(false)}
                  >
                    <div
                      className="absolute top-2 right-2 w-8 h-8 transition-all duration-150 ease-linear"
                      style={{
                        borderTop: `2px solid ${YELLOW}`,
                        borderRight: `2px solid ${YELLOW}`,
                        transform: armorHovered ? "translate(-2px,2px)" : "translate(0,0)",
                      }}
                    />
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: YELLOW }}>
                      ARMOR PANEL
                    </span>
                    <span className="text-[9px] uppercase tracking-widest" style={{ color: `${GREEN}99` }}>
                      {armorHovered ? "LOCKED" : "HOVER TO SHIFT"}
                    </span>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* ---- Rule 3: Hazard Flashing ---- */}
            <RevealBlock delay={0.16}>
              <div
                className="p-8 h-full"
                style={{
                  border: `2px solid ${GREEN}`,
                  borderLeft: `4px solid ${RED}`,
                  backgroundColor: `${NAVY}cc`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{ backgroundColor: `${RED}25`, color: RED, border: `1px solid ${RED}` }}
                  >
                    RULE-03
                  </span>
                  <span className="text-sm font-bold uppercase tracking-widest" style={{ color: YELLOW }}>
                    Hazard Flashing
                  </span>
                </div>

                <p
                  className="text-[10px] font-mono mb-2 uppercase tracking-widest leading-relaxed"
                  style={{ color: `${GREEN}80` }}
                >
                  hover: warning pulse + stripe overlay
                </p>
                <p className="text-xs mb-6 leading-relaxed" style={{ color: `${GREEN}bb` }}>
                  Critical controls flash warning yellow / red with hazard stripe overlay
                  on hover to reinforce industrial alert urgency.
                </p>

                <div className="flex items-center justify-center py-4">
                  <button
                    className="relative overflow-hidden flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-100 ease-linear"
                    style={{
                      backgroundColor: hazardHovered ? RED : "#2b2b2b",
                      color: hazardHovered ? "white" : RED,
                      border: `2px solid ${RED}`,
                      boxShadow: hazardHovered ? `0 0 12px ${RED}60` : `4px 4px 0 ${RED}40`,
                    }}
                    onMouseEnter={() => setHazardHovered(true)}
                    onMouseLeave={() => setHazardHovered(false)}
                    onMouseDown={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px)";
                    }}
                    onMouseUp={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                    }}
                  >
                    {/* Stripe overlay */}
                    <span
                      className="pointer-events-none absolute inset-0 transition-opacity duration-100"
                      style={{
                        opacity: hazardHovered ? 0.18 : 0,
                        backgroundImage: `repeating-linear-gradient(45deg, #000 0px, #000 6px, transparent 6px, transparent 12px)`,
                      }}
                    />
                    <WarnIcon className="w-4 h-4" />
                    <span className="relative z-10">DANGER ZONE</span>
                  </button>
                </div>

                <p
                  className="text-[10px] text-center mt-2 uppercase tracking-widest"
                  style={{ color: hazardHovered ? RED : `${GREEN}60` }}
                >
                  {hazardHovered ? "ALERT: HAZARD SIGNAL ACTIVE" : "HOVER TO TRIGGER HAZARD"}
                </p>
              </div>
            </RevealBlock>

            {/* ---- Rule 4: Tactical Lock-on ---- */}
            <RevealBlock delay={0.2}>
              <div
                className="p-8 h-full"
                style={{
                  border: `2px solid ${GREEN}`,
                  borderLeft: `4px solid ${YELLOW}`,
                  backgroundColor: `${NAVY}cc`,
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                    style={{ backgroundColor: `${YELLOW}20`, color: YELLOW, border: `1px solid ${YELLOW}60` }}
                  >
                    RULE-04
                  </span>
                  <span className="text-sm font-bold uppercase tracking-widest" style={{ color: YELLOW }}>
                    Tactical Lock-on
                  </span>
                </div>

                <p
                  className="text-[10px] font-mono mb-2 uppercase tracking-widest leading-relaxed"
                  style={{ color: `${GREEN}80` }}
                >
                  active: translate + shadow collapse
                </p>
                <p className="text-xs mb-6 leading-relaxed" style={{ color: `${GREEN}bb` }}>
                  Active press fires a crisp linear displacement and shadow collapse —
                  like the heavy snap of a trigger on a combat weapon system.
                </p>

                <div className="flex items-center justify-center py-4">
                  <button
                    className="flex items-center gap-2 px-8 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-100 ease-linear"
                    style={{
                      backgroundColor: triggerPressed ? `${YELLOW}20` : YELLOW,
                      color: triggerPressed ? YELLOW : NAVY,
                      border: `2px solid ${YELLOW}`,
                      boxShadow: triggerPressed ? `1px 1px 0 ${GREEN}` : `5px 5px 0 ${GREEN}`,
                      transform: triggerPressed ? "translate(4px,4px)" : "translate(0,0)",
                    }}
                    onMouseDown={() => { setTriggerPressed(true); setLockActive(true); }}
                    onMouseUp={() => { setTriggerPressed(false); setTimeout(() => setLockActive(false), 500); }}
                    onMouseLeave={() => { setTriggerPressed(false); setLockActive(false); }}
                  >
                    <CrosshairIcon className="w-4 h-4" />
                    {lockActive ? "LOCKED" : "PRESS & HOLD"}
                  </button>
                </div>

                <p
                  className="text-[10px] text-center mt-2 uppercase tracking-widest"
                  style={{ color: lockActive ? YELLOW : `${GREEN}60` }}
                >
                  {lockActive ? "TARGET ACQUIRED — SHADOW COLLAPSED" : "CLICK + HOLD TO LOCK-ON"}
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. MECHA CONTROL PANEL — Full app UI demo                       */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ backgroundColor: `${GREEN}08` }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2" style={{ backgroundColor: YELLOW }} />
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color: GREEN }}>
                // MISSION CONTROL
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase" style={{ color: YELLOW, letterSpacing: "0.04em" }}>
              COMBAT PANEL
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-sm uppercase tracking-widest leading-relaxed max-w-lg" style={{ color: `${GREEN}bb` }}>
              Full-composition mock UI showing mecha components in context —
              unit readouts, weapon grids, log feed, and warning indicators.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Left: Unit Status */}
            <RevealBlock delay={0.1} className="md:col-span-2">
              <div
                className="p-7 h-full"
                style={{
                  border: `2px solid ${GREEN}`,
                  borderTop: `4px solid ${YELLOW}`,
                  backgroundColor: `${NAVY}dd`,
                  clipPath: "polygon(0 0,100% 0,100% calc(100% - 20px),calc(100% - 20px) 100%,0 100%)",
                }}
              >
                {/* Panel header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: `${GREEN}80` }}>
                      // UNIT STATUS
                    </div>
                    <h3 className="text-lg font-bold uppercase tracking-widest" style={{ color: YELLOW }}>
                      EVA-01 MAIN CONTROL
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 mecha-blink" style={{ backgroundColor: GREEN }} />
                    <span className="text-[10px] uppercase tracking-widest" style={{ color: GREEN }}>
                      ONLINE
                    </span>
                  </div>
                </div>

                {/* System bars */}
                <div className="space-y-5 mb-8">
                  {systemStats.map((stat) => (
                    <div key={stat.label}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-[10px] uppercase tracking-widest" style={{ color: GREEN }}>
                          {stat.label}
                        </span>
                        <span className="text-xs font-bold" style={{ color: stat.color }}>
                          {stat.value}
                        </span>
                      </div>
                      <div className="relative h-2" style={{ backgroundColor: `${GREEN}20` }}>
                        <div
                          className="h-full transition-all duration-700"
                          style={{ width: stat.barW, backgroundColor: stat.color }}
                        />
                        <div className="absolute inset-0 flex justify-around pointer-events-none">
                          {[1, 2, 3].map((t) => (
                            <div key={t} className="w-px h-full" style={{ backgroundColor: `${NAVY}60` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Warning stripe footer */}
                <div
                  className="h-4 w-full"
                  style={{
                    backgroundImage: `repeating-linear-gradient(-45deg, ${YELLOW}, ${YELLOW} 8px, ${NAVY} 8px, ${NAVY} 16px)`,
                    opacity: 0.4,
                  }}
                />
              </div>
            </RevealBlock>

            {/* Right: Quick stats */}
            <RevealBlock delay={0.18}>
              <div className="space-y-4 h-full">
                {/* Sync rate */}
                <div
                  className="p-5 transition-all duration-150 ease-linear cursor-default"
                  style={{
                    border: `2px solid ${GREEN}`,
                    borderLeft: `4px solid ${YELLOW}`,
                    backgroundColor: `${NAVY}cc`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderLeftWidth = "8px";
                    (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${YELLOW}40`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderLeftWidth = "4px";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: `${GREEN}80` }}>
                    SYNC RATE
                  </div>
                  <div className="text-4xl font-bold" style={{ color: YELLOW }}>89.7%</div>
                  <div className="text-[10px] uppercase tracking-widest mt-1" style={{ color: `${GREEN}80` }}>
                    PILOT NEURAL LINK
                  </div>
                </div>

                {/* Threat level */}
                <div
                  className="p-5 mecha-pulse-red transition-all duration-150 ease-linear cursor-default"
                  style={{
                    border: `2px solid ${RED}`,
                    borderLeft: `4px solid ${RED}`,
                    backgroundColor: `${NAVY}cc`,
                  }}
                >
                  <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: `${RED}99` }}>
                    THREAT LEVEL
                  </div>
                  <div className="text-2xl font-bold uppercase tracking-widest" style={{ color: RED }}>
                    ALPHA-3
                  </div>
                  <div className="flex gap-1 mt-3">
                    {[1, 2, 3, 4, 5].map((lvl) => (
                      <div
                        key={lvl}
                        className="flex-1 h-3"
                        style={{ backgroundColor: lvl <= 3 ? RED : `${RED}30` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Active units */}
                <div
                  className="p-5 transition-all duration-150 ease-linear cursor-default"
                  style={{
                    border: `2px solid ${GREEN}`,
                    borderLeft: `4px solid ${GREEN}`,
                    backgroundColor: `${NAVY}cc`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = YELLOW;
                    (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${YELLOW}30`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = GREEN;
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: `${GREEN}80` }}>
                    ACTIVE UNITS
                  </div>
                  <div className="text-4xl font-bold" style={{ color: GREEN }}>3 / 5</div>
                  <div className="flex gap-1.5 mt-3">
                    {[true, true, true, false, false].map((active, i) => (
                      <div
                        key={i}
                        className="w-8 h-2 transition-all duration-150 ease-linear"
                        style={{
                          backgroundColor: active ? GREEN : `${GREEN}30`,
                          border: `1px solid ${active ? GREEN : `${GREEN}40`}`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Uptime */}
                <div
                  className="p-5 transition-all duration-150 ease-linear cursor-default"
                  style={{
                    border: `2px solid ${GREEN}60`,
                    backgroundColor: `${GREEN}10`,
                  }}
                >
                  <div className="text-[10px] uppercase tracking-widest mb-2" style={{ color: `${GREEN}80` }}>
                    UPTIME
                  </div>
                  <div className="text-2xl font-bold font-mono" style={{ color: `${GREEN}cc` }}>
                    14:22:09
                  </div>
                  <div className="text-[9px] uppercase tracking-widest mt-1" style={{ color: `${GREEN}60` }}>
                    CONTINUOUS OPERATION
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. DESIGN PHILOSOPHY — Do / Don't + Principles                  */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10 mecha-grid-bg">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2" style={{ backgroundColor: YELLOW }} />
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color: GREEN }}>
                // DESIGN DOCTRINE
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase" style={{ color: YELLOW, letterSpacing: "0.04em" }}>
              BATTLE PROTOCOL
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-sm uppercase tracking-widest leading-relaxed max-w-lg" style={{ color: `${GREEN}bb` }}>
              Absolute rules for mecha design. Hard lines. No exceptions.
              Deviating from these rules compromises the armor integrity.
            </p>
          </RevealBlock>

          {/* Core principles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {[
              {
                id: "PNC-01",
                icon: <ShieldIcon className="w-7 h-7" />,
                title: "ARMOR PANEL",
                tagline: "Angular, impenetrable, structured",
                desc: "All containers use squared panels with hard-edge shadows offset 4px. clip-path corner cuts simulate beveled armor plating. Zero rounded corners.",
                rules: ["rounded-none everywhere", "shadow-[4px_4px_0px_color]", "border-2 for panel edges", "clip-path corner bevels"],
                color: YELLOW,
                borderColor: YELLOW,
              },
              {
                id: "PNC-02",
                icon: <WarnIcon className="w-7 h-7" />,
                title: "WARNING SYSTEM",
                tagline: "Yellow signals. Red danger. No subtlety.",
                desc: "Warning stripes (#fbbf24 / #1a2744 at 45deg), square status indicators, blinking red alerts for critical states. The UI must communicate urgency.",
                rules: ["Stripe: repeating-linear-gradient(-45deg)", "Square status dot, not rounded", "Blink animation on critical indicators", "Red pulse shadow on danger states"],
                color: RED,
                borderColor: RED,
              },
              {
                id: "PNC-03",
                icon: <CpuIcon className="w-7 h-7" />,
                title: "TECH ANNOTATION",
                tagline: "Monospace. Uppercase. Technical.",
                desc: "All labels use font-mono uppercase tracking-widest. Unit IDs like [EVT-001], bracket notation // SYSTEM ONLINE, technical parameter display.",
                rules: ["font-mono font-bold uppercase", "tracking-widest on all labels", "// prefix for system messages", "[XX] bracket IDs for components"],
                color: GREEN,
                borderColor: GREEN,
              },
              {
                id: "PNC-04",
                icon: <BoltIcon className="w-7 h-7" />,
                title: "INDUSTRIAL COLOR",
                tagline: "Navy base. Green support. No pastels.",
                desc: "bg-[#1a2744] navy and bg-[#4a5c3a] military green are the only backgrounds. No white, no light grays. Warning yellow and danger red as the only bright values.",
                rules: ["#1a2744 navy — only background", "#4a5c3a green — borders, support", "#fbbf24 — CTAs, highlights only", "#ef4444 — alerts, errors only"],
                color: YELLOW,
                borderColor: GREEN,
              },
            ].map((p, i) => (
              <RevealBlock key={p.id} delay={i * 0.08}>
                <div
                  className="p-7 h-full transition-all duration-150 ease-linear cursor-default group"
                  style={{
                    border: `2px solid ${p.borderColor}`,
                    borderLeft: `4px solid ${p.color}`,
                    backgroundColor: `${NAVY}dd`,
                    clipPath: "polygon(0 0,100% 0,100% calc(100% - 16px),calc(100% - 16px) 100%,0 100%)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderLeftWidth = "8px";
                    (e.currentTarget as HTMLElement).style.boxShadow = `5px 5px 0 ${p.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderLeftWidth = "4px";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-12 h-12 flex items-center justify-center shrink-0 transition-transform duration-150 ease-linear group-hover:scale-110"
                      style={{ backgroundColor: `${p.color}20`, border: `2px solid ${p.color}60`, color: p.color }}
                    >
                      {p.icon}
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: `${GREEN}80` }}>
                        {p.id}
                      </div>
                      <h3 className="text-base font-bold uppercase tracking-widest" style={{ color: YELLOW }}>
                        {p.title}
                      </h3>
                      <p className="text-xs" style={{ color: p.color }}>{p.tagline}</p>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed mb-5" style={{ color: `${GREEN}bb` }}>
                    {p.desc}
                  </p>

                  <ul className="space-y-2">
                    {p.rules.map((rule) => (
                      <li key={rule} className="flex items-start gap-2 text-[10px] font-mono uppercase tracking-widest" style={{ color: `${GREEN}cc` }}>
                        <div className="w-1.5 h-1.5 mt-1 shrink-0" style={{ backgroundColor: p.color }} />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Do / Don't */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <RevealBlock delay={0.12}>
              <div
                className="p-7 h-full"
                style={{
                  border: `2px solid ${GREEN}`,
                  borderTop: `4px solid ${GREEN}`,
                  backgroundColor: `${NAVY}dd`,
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 flex items-center justify-center"
                    style={{ backgroundColor: `${GREEN}30`, border: `2px solid ${GREEN}` }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" style={{ color: GREEN }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold uppercase tracking-widest" style={{ color: GREEN }}>
                    AUTHORIZED
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "bg-[#1a2744] navy base — always",
                    "border-2 border-[#4a5c3a] panel edges",
                    "rounded-none everywhere, no exceptions",
                    "shadow-[4px_4px_0px] hard offset",
                    "font-mono uppercase tracking-widest",
                    "Warning stripe repeating-linear-gradient",
                    "clip-path corner bevels on panels",
                    "Square status dots, never circles",
                    "duration-100~150 ease-linear mechanics",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-xs leading-relaxed" style={{ color: `${GREEN}cc` }}>
                      <div className="w-1.5 h-1.5 mt-1.5 shrink-0" style={{ backgroundColor: GREEN }} />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.18}>
              <div
                className="p-7 h-full"
                style={{
                  border: `2px solid ${RED}60`,
                  borderTop: `4px solid ${RED}`,
                  backgroundColor: `${NAVY}dd`,
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-8 h-8 flex items-center justify-center"
                    style={{ backgroundColor: `${RED}20`, border: `2px solid ${RED}` }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" style={{ color: RED }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold uppercase tracking-widest" style={{ color: RED }}>
                    PROHIBITED
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Rounded corners — any border radius",
                    "Pastel, soft, or light background colors",
                    "Glassmorphism / blur / frosted glass",
                    "Handwritten or decorative font families",
                    "White or light gray backgrounds",
                    "Spring cubic-bezier easing — too soft",
                    "Shadow with blur — use hard offset only",
                    "Gradient backgrounds on panels",
                    "Lowercase text labels in UI components",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-xs leading-relaxed" style={{ color: `${RED}cc` }}>
                      <div className="w-1.5 h-1.5 mt-1.5 shrink-0" style={{ backgroundColor: RED }} />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. FEATURE HIGHLIGHTS                                            */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10" style={{ backgroundColor: `${GREEN}08` }}>
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-2 h-2" style={{ backgroundColor: YELLOW }} />
              <span className="text-xs uppercase tracking-[0.2em]" style={{ color: GREEN }}>
                // CAPABILITY MATRIX
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold uppercase" style={{ color: YELLOW, letterSpacing: "0.04em" }}>
              SYSTEM CAPABILITIES
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              {
                id: "CAP-01",
                icon: <ShieldIcon className="w-6 h-6" />,
                title: "ARMOR PANELS",
                desc: "Angular clip-path beveled containers that simulate interlocking mecha armor plates.",
                color: YELLOW,
              },
              {
                id: "CAP-02",
                icon: <WarnIcon className="w-6 h-6" />,
                title: "HAZARD SIGNALS",
                desc: "Repeating diagonal stripe patterns and pulsing red alerts for critical state indication.",
                color: RED,
              },
              {
                id: "CAP-03",
                icon: <CpuIcon className="w-6 h-6" />,
                title: "TECH GRID",
                desc: "40x40px grid overlay using military green at 15% opacity — the signature mecha background.",
                color: GREEN,
              },
              {
                id: "CAP-04",
                icon: <BoltIcon className="w-6 h-6" />,
                title: "HARD SHADOWS",
                desc: "shadow-[4px_4px_0px] offset block shadows with no blur radius. Solid, mechanical depth.",
                color: YELLOW,
              },
              {
                id: "CAP-05",
                icon: <CrosshairIcon className="w-6 h-6" />,
                title: "LOCK-ON MECHANICS",
                desc: "Active press triggers translate + shadow collapse, like firing a heavy-caliber weapon.",
                color: GREEN,
              },
              {
                id: "CAP-06",
                icon: <GearIcon className="w-6 h-6" />,
                title: "UNIT ANNOTATIONS",
                desc: "UNIT-01 bracket IDs, // comment prefix labels, and technical mono readouts throughout.",
                color: YELLOW,
              },
            ].map((feature, i) => (
              <RevealBlock key={feature.id} delay={i * 0.06}>
                <div
                  className="relative p-6 h-full transition-all duration-150 ease-linear cursor-default group"
                  style={{
                    border: `2px solid ${GREEN}`,
                    borderLeft: `4px solid ${feature.color}`,
                    backgroundColor: `${NAVY}dd`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = feature.color;
                    (e.currentTarget as HTMLElement).style.borderLeftColor = feature.color;
                    (e.currentTarget as HTMLElement).style.boxShadow = `5px 5px 0 ${feature.color}40`;
                    (e.currentTarget as HTMLElement).style.borderLeftWidth = "8px";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = GREEN;
                    (e.currentTarget as HTMLElement).style.borderLeftColor = feature.color;
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    (e.currentTarget as HTMLElement).style.borderLeftWidth = "4px";
                  }}
                >
                  {/* Top-right corner bracket */}
                  <div
                    className="absolute top-2 right-2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-linear"
                    style={{ borderTop: `2px solid ${feature.color}`, borderRight: `2px solid ${feature.color}` }}
                  />

                  <div
                    className="w-10 h-10 flex items-center justify-center mb-4 transition-transform duration-150 ease-linear group-hover:translate-x-1"
                    style={{
                      backgroundColor: `${feature.color}20`,
                      border: `2px solid ${feature.color}60`,
                      color: feature.color,
                    }}
                  >
                    {feature.icon}
                  </div>

                  <div className="text-[10px] uppercase tracking-widest mb-1" style={{ color: `${GREEN}80` }}>
                    {feature.id}
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: YELLOW }}>
                    {feature.title}
                  </h4>
                  <p className="text-xs leading-relaxed" style={{ color: `${GREEN}bb` }}>
                    {feature.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FOOTER                                                           */}
      {/* ================================================================ */}
      <footer
        className="relative overflow-hidden"
        style={{
          borderTop: `2px solid ${GREEN}`,
          backgroundColor: NAVY,
        }}
      >
        {/* Top warning stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-2 opacity-50"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, ${YELLOW} 0px, ${YELLOW} 16px, ${NAVY} 16px, ${NAVY} 32px)`,
          }}
        />

        {/* Grid overlay */}
        <div className="absolute inset-0 mecha-grid-bg pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-5 md:px-10 pt-16 pb-12">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
            {/* Brand */}
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 flex items-center justify-center"
                  style={{ backgroundColor: YELLOW, color: NAVY }}
                >
                  <ShieldIcon className="w-5 h-5" />
                </div>
                <span className="text-lg font-bold uppercase tracking-widest" style={{ color: YELLOW }}>
                  MECHA<span style={{ color: RED }}>-</span>SYSTEM
                </span>
              </div>
              <p className="text-xs uppercase tracking-widest leading-relaxed" style={{ color: `${GREEN}99` }}>
                Machine-grade UI inspired by Gundam and EVA aesthetics.
                Angular panels, warning signals, military-industrial power.
              </p>
              {/* Color swatches row */}
              <div className="flex gap-2">
                {[NAVY, GREEN, YELLOW, RED].map((c, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 transition-all duration-100 ease-linear"
                    style={{
                      backgroundColor: c,
                      border: `2px solid ${GREEN}`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1.3)";
                      (e.currentTarget as HTMLElement).style.borderColor = YELLOW;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                      (e.currentTarget as HTMLElement).style.borderColor = GREEN;
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Nav links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-xs">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: `${GREEN}80` }}>
                  // STYLE
                </span>
                <Link href="/styles/mecha" className="uppercase tracking-widest transition-all duration-100 ease-linear"
                  style={{ color: `${GREEN}cc` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = YELLOW; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${GREEN}cc`; }}>
                  Documentation
                </Link>
                <Link href="/styles/mecha/showcase" className="uppercase tracking-widest transition-all duration-100 ease-linear"
                  style={{ color: `${GREEN}cc` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = YELLOW; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${GREEN}cc`; }}>
                  Showcase
                </Link>
                <Link href="/styles/mecha/cover" className="uppercase tracking-widest transition-all duration-100 ease-linear"
                  style={{ color: `${GREEN}cc` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = YELLOW; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${GREEN}cc`; }}>
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: `${GREEN}80` }}>
                  // STYLEKIT
                </span>
                <Link href="/" className="uppercase tracking-widest transition-all duration-100 ease-linear"
                  style={{ color: `${GREEN}cc` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = YELLOW; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${GREEN}cc`; }}>
                  Home
                </Link>
                <Link href="/styles" className="uppercase tracking-widest transition-all duration-100 ease-linear"
                  style={{ color: `${GREEN}cc` }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = YELLOW; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = `${GREEN}cc`; }}>
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: `${GREEN}80` }}>
                  // PALETTE
                </span>
                {paletteSwatches.map((s) => (
                  <span key={s.name} className="flex items-center gap-2 uppercase tracking-widest" style={{ color: `${GREEN}cc` }}>
                    <div className="w-3 h-3" style={{ backgroundColor: s.hex, border: `1px solid ${GREEN}60` }} />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px mb-8" style={{ backgroundColor: `${GREEN}40` }} />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs uppercase tracking-widest" style={{ color: `${GREEN}80` }}>
              <div className="w-2 h-2 mecha-blink" style={{ backgroundColor: GREEN }} />
              <span>UNIT-MECHA // STYLEKIT OPERATIONAL</span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-100 ease-linear"
              style={{
                color: NAVY,
                backgroundColor: YELLOW,
                border: `2px solid ${YELLOW}`,
                clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,0 100%)",
                boxShadow: `3px 3px 0 ${GREEN}`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(-1px,-1px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `5px 5px 0 ${GREEN}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0 ${GREEN}`;
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `1px 1px 0 ${GREEN}`;
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translate(-1px,-1px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `5px 5px 0 ${GREEN}`;
              }}
            >
              <TargetIcon className="w-3 h-3" />
              BACK TO STYLEKIT
              <span>&#8594;</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
