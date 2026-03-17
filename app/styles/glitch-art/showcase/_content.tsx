"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  useInView hook                                                      */
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

/* ------------------------------------------------------------------ */
/*  RevealBlock                                                         */
/* ------------------------------------------------------------------ */

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

const ERROR_LOG_PANELS = [
  {
    id: "0x00A1",
    border: "#00ffff",
    label: "MEMORY_FAULT",
    lines: [
      "SEG_FAULT AT 0xDEADBEEF",
      "STACK TRACE CORRUPTED",
      "RETRY COUNT: 9999",
      "STATUS: UNRECOVERABLE",
    ],
  },
  {
    id: "0x00B2",
    border: "#ff00ff",
    label: "SIGNAL_LOST",
    lines: [
      "CARRIER FREQ: ---.---",
      "SNR: -∞ dB",
      "FRAME SYNC: FAIL",
      "STATUS: SEARCHING",
    ],
  },
  {
    id: "0x00C3",
    border: "#ffff00",
    label: "DATA_CORRUPT",
    lines: [
      "CHECKSUM: 0xBADF00D",
      "PARITY ERROR: TRUE",
      "BLOCKS LOST: 847",
      "STATUS: UNREADABLE",
    ],
  },
  {
    id: "0x00D4",
    border: "#00ffff",
    label: "VHS_TRACKING",
    lines: [
      "HEAD AZIMUTH: DRIFT",
      "TAPE SPEED: VARIABLE",
      "COLOR BURST: ABSENT",
      "STATUS: DEGRADED",
    ],
  },
  {
    id: "0x00E5",
    border: "#ff00ff",
    label: "RGB_DESYNC",
    lines: [
      "R CHANNEL: +3px",
      "G CHANNEL: 0px",
      "B CHANNEL: -3px",
      "STATUS: SEPARATED",
    ],
  },
  {
    id: "0x00F6",
    border: "#ffff00",
    label: "RENDER_FAIL",
    lines: [
      "FRAMEBUFFER: TORN",
      "VSYNC: DISABLED",
      "ARTIFACTS: 2,048",
      "STATUS: GLITCHING",
    ],
  },
];

const SIGNAL_READINGS = [
  { label: "R_CHANNEL", value: "FF", bar: 100, color: "#ff00ff" },
  { label: "G_CHANNEL", value: "00", bar: 0, color: "#00ffff" },
  { label: "B_CHANNEL", value: "FF", bar: 100, color: "#00ffff" },
  { label: "SYNC_LOCK", value: "3E", bar: 24, color: "#ffff00" },
  { label: "NOISE_FLR", value: "A7", bar: 65, color: "#ff00ff" },
  { label: "CARRIER", value: "--", bar: 0, color: "#ffffff" },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */

export default function GlitchArtShowcase() {
  const [activeTab, setActiveTab] = useState<"BUTTONS" | "CARDS" | "INPUTS">(
    "BUTTONS"
  );

  /* hero inView */
  const { ref: heroRef, inView: heroInView } = useInView();

  return (
    <div
      className="min-h-screen font-mono uppercase tracking-widest"
      style={{ backgroundColor: "#0a0a0a", color: "#ffffff" }}
    >
      {/* ============================================================ */}
      {/* 1. NAV                                                        */}
      {/* ============================================================ */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          backgroundColor: "#0a0a0a",
          borderBottom: "1px solid rgba(0,255,255,0.2)",
        }}
      >
        <div className="flex items-center gap-4">
        <Link
          href="/styles/glitch-art"
          className="group flex items-center gap-1.5 text-xs tracking-widest uppercase"
          style={{ color: "#ff00ff", textDecoration: "none" }}
        >
          <span
            className="group-hover:-translate-x-0.5 transition-transform duration-150 inline-block"
            style={{ color: "#00ffff" }}
          >
            &larr;
          </span>
          <span>BACK_TO_DOCS</span>
        </Link>
        <span
          className="text-lg font-bold tracking-widest"
          style={{ color: "#00ffff" }}
        >
          [GLITCH.ART]
        </span>
        </div>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm tracking-widest"
            style={{ color: "#ffffff", textDecoration: "none" }}
          >
            StyleKit →
          </Link>
          <span className="text-xs tracking-widest" style={{ color: "#00ff00" }}>
            SYS_OK
          </span>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* 2. HERO                                                       */}
      {/* ============================================================ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden flex flex-col items-center justify-center min-h-screen px-6 py-32"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,255,0.03) 2px,rgba(0,255,255,0.03) 4px)",
          }}
        />

        {/* Horizontal displacement band */}
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: "38%",
            height: "3px",
            background:
              "linear-gradient(90deg, #ff00ff 0%, #00ffff 33%, #ffff00 66%, #ff00ff 100%)",
            opacity: 0.6,
          }}
        />
        <div
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            top: "62%",
            height: "1px",
            background: "#00ffff",
            opacity: 0.3,
          }}
        />

        {/* RGB Chromatic aberration title */}
        <div
          className="relative text-center mb-6"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(48px)",
            transition:
              "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0s",
          }}
        >
          <div className="relative inline-block select-none">
            {/* Yellow layer — bottom */}
            <span
              className="absolute inset-0 text-[clamp(64px,12vw,120px)] font-bold tracking-widest"
              style={{
                color: "#ffff00",
                opacity: 0.3,
                transform: "translate(-3px, -5px)",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              GLITCH
            </span>
            {/* Magenta layer — middle */}
            <span
              className="absolute inset-0 text-[clamp(64px,12vw,120px)] font-bold tracking-widest"
              style={{
                color: "#ff00ff",
                opacity: 0.5,
                transform: "translate(3px, 5px)",
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              GLITCH
            </span>
            {/* Cyan layer — top */}
            <span
              className="relative text-[clamp(64px,12vw,120px)] font-bold tracking-widest"
              style={{
                color: "#00ffff",
                textShadow: "3px 0 #ff00ff, -3px 0 #ffff00",
              }}
            >
              GLITCH
            </span>
          </div>
        </div>

        {/* Secondary title */}
        <div
          className="text-center mb-4"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(32px)",
            transition:
              "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          <span
            className="text-2xl font-bold tracking-widest"
            style={{ color: "#ff00ff" }}
          >
            ERROR_404
          </span>
        </div>

        {/* Subtitle */}
        <div
          className="text-center mb-12 max-w-2xl"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(32px)",
            transition:
              "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}
        >
          <p className="text-xs tracking-widest" style={{ color: "#ffffff", opacity: 0.6 }}>
            DATA_STREAM_CORRUPTED // RENDERING_ARTIFACT_DETECTED
          </p>
          <p className="text-xs tracking-widest mt-2" style={{ color: "#00ffff", opacity: 0.4 }}>
            RGB_CHANNELS_DESYNCHRONIZED // VHS_TRACKING_FAILURE // SIGNAL_NOISE_RATIO: -∞
          </p>
        </div>

        {/* CTA Button */}
        <div
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(32px)",
            transition:
              "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
          }}
        >
          <button
            className="px-10 py-4 text-sm font-bold tracking-widest active:skew-x-[-10deg] active:scale-x-110 active:scale-y-90"
            style={{
              backgroundColor: "transparent",
              border: "2px solid #00ffff",
              color: "#00ffff",
              boxShadow: "3px 0 #ff00ff, -3px 0 #ffff00",
              transition: "none",
            }}
          >
            INIT_CORRUPTION.EXE
          </button>
        </div>

        {/* Corner markers */}
        <div
          className="absolute top-6 left-6 text-xs"
          style={{ color: "#00ffff", opacity: 0.4 }}
        >
          [0x0000]
        </div>
        <div
          className="absolute top-6 right-6 text-xs"
          style={{ color: "#ff00ff", opacity: 0.4 }}
        >
          [RES:1080P]
        </div>
        <div
          className="absolute bottom-6 left-6 text-xs"
          style={{ color: "#ffff00", opacity: 0.4 }}
        >
          [FRAME:0001]
        </div>
        <div
          className="absolute bottom-6 right-6 text-xs"
          style={{ color: "#ffffff", opacity: 0.3 }}
        >
          [SYS:HALT]
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. COMPONENTS DEMO                                            */}
      {/* ============================================================ */}
      <section className="px-6 py-24" style={{ backgroundColor: "#0a0a0a" }}>
        <RevealBlock className="max-w-5xl mx-auto">
          {/* Section label */}
          <div className="mb-8">
            <p className="text-xs tracking-widest" style={{ color: "#ff00ff", opacity: 0.6 }}>
              // SECTION_03 — COMPONENT_DEMO
            </p>
            <h2
              className="text-3xl font-bold tracking-widest mt-1"
              style={{
                color: "#ffffff",
                textShadow: "3px 0 #ff00ff, -3px 0 #ffff00",
              }}
            >
              UI_COMPONENTS
            </h2>
          </div>

          {/* Tab switcher */}
          <div
            className="flex mb-0"
            style={{ borderBottom: "2px solid #00ffff" }}
          >
            {(["BUTTONS", "CARDS", "INPUTS"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-3 text-xs font-bold tracking-widest"
                style={{
                  backgroundColor:
                    activeTab === tab ? "#00ffff" : "transparent",
                  color: activeTab === tab ? "#0a0a0a" : "#00ffff",
                  border:
                    activeTab === tab
                      ? "2px solid #00ffff"
                      : "2px solid rgba(0,255,255,0.3)",
                  borderBottom: "none",
                  transition: "none",
                  cursor: "pointer",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab panels */}
          <div
            className="p-8"
            style={{
              border: "2px solid #00ffff",
              borderTop: "none",
              backgroundColor: "#0a0a0a",
              minHeight: "280px",
            }}
          >
            {/* BUTTONS panel */}
            {activeTab === "BUTTONS" && (
              <div>
                <p
                  className="text-xs tracking-widest mb-6"
                  style={{ color: "#00ffff", opacity: 0.5 }}
                >
                  // BTN_VARIANTS — ALL TRANSITIONS DISABLED
                </p>
                <div className="flex flex-wrap gap-4">
                  {/* Primary */}
                  <button
                    className="px-8 py-4 text-xs font-bold tracking-widest active:skew-x-[-10deg] active:scale-x-110 active:scale-y-90"
                    style={{
                      backgroundColor: "#00ffff",
                      color: "#0a0a0a",
                      border: "2px solid #00ffff",
                      boxShadow: "3px 0 #ff00ff, -3px 0 #ffff00",
                      transition: "none",
                    }}
                  >
                    PRIMARY
                  </button>
                  {/* Secondary */}
                  <button
                    className="px-8 py-4 text-xs font-bold tracking-widest active:skew-x-[10deg] active:scale-x-110 active:scale-y-90"
                    style={{
                      backgroundColor: "#ff00ff",
                      color: "#0a0a0a",
                      border: "2px solid #ff00ff",
                      boxShadow: "3px 0 #00ffff, -3px 0 #ffff00",
                      transition: "none",
                    }}
                  >
                    SECONDARY
                  </button>
                  {/* Warning */}
                  <button
                    className="px-8 py-4 text-xs font-bold tracking-widest active:skew-x-[-10deg] active:scale-x-110 active:scale-y-90"
                    style={{
                      backgroundColor: "#ffff00",
                      color: "#0a0a0a",
                      border: "2px solid #ffff00",
                      boxShadow: "3px 0 #ff00ff, -3px 0 #00ffff",
                      transition: "none",
                    }}
                  >
                    WARNING
                  </button>
                  {/* Ghost */}
                  <button
                    className="px-8 py-4 text-xs font-bold tracking-widest active:skew-x-[-10deg]"
                    style={{
                      backgroundColor: "transparent",
                      color: "#ffffff",
                      border: "2px solid rgba(255,255,255,0.3)",
                      transition: "none",
                    }}
                  >
                    GHOST
                  </button>
                  {/* Disabled */}
                  <button
                    disabled
                    className="px-8 py-4 text-xs font-bold tracking-widest"
                    style={{
                      backgroundColor: "transparent",
                      color: "rgba(0,255,255,0.2)",
                      border: "2px solid rgba(0,255,255,0.1)",
                      cursor: "not-allowed",
                      transition: "none",
                    }}
                  >
                    DISABLED
                  </button>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span
                    className="text-xs tracking-widest px-3 py-1"
                    style={{ border: "1px solid #00ffff", color: "#00ffff" }}
                  >
                    TAG_001
                  </span>
                  <span
                    className="text-xs tracking-widest px-3 py-1"
                    style={{ border: "1px solid #ff00ff", color: "#ff00ff" }}
                  >
                    TAG_002
                  </span>
                  <span
                    className="text-xs tracking-widest px-3 py-1"
                    style={{ border: "1px solid #ffff00", color: "#ffff00" }}
                  >
                    CORRUPTED
                  </span>
                </div>
              </div>
            )}

            {/* CARDS panel */}
            {activeTab === "CARDS" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    accent: "#00ffff",
                    hoverAccent: "#ff00ff",
                    title: "DISTORTION",
                    body: "PIXEL DISPLACEMENT ACTIVE",
                    id: "0xA1B2",
                  },
                  {
                    accent: "#ff00ff",
                    hoverAccent: "#00ffff",
                    title: "CORRUPTION",
                    body: "DATA INTEGRITY: COMPROMISED",
                    id: "0xC3D4",
                  },
                  {
                    accent: "#ffff00",
                    hoverAccent: "#ff00ff",
                    title: "SIGNAL_LOSS",
                    body: "CARRIER: NOT FOUND",
                    id: "0xE5F6",
                  },
                ].map((card) => (
                  <div
                    key={card.id}
                    className="group p-5 relative overflow-hidden"
                    style={{
                      backgroundColor: "#0a0a0a",
                      borderLeft: `4px solid ${card.accent}`,
                      border: `1px solid rgba(255,255,255,0.05)`,
                      borderLeftWidth: "4px",
                      borderLeftColor: card.accent,
                      transition: "none",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderLeftColor =
                        card.hoverAccent;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderLeftColor =
                        card.accent;
                    }}
                  >
                    {/* Displacement band on hover — static via CSS trick */}
                    <div
                      className="absolute left-0 right-0 opacity-0 group-hover:opacity-100"
                      style={{
                        top: "40%",
                        height: "2px",
                        background: card.hoverAccent,
                        transition: "none",
                      }}
                    />
                    <p
                      className="text-xs tracking-widest mb-1"
                      style={{ color: card.accent, opacity: 0.6 }}
                    >
                      [{card.id}]
                    </p>
                    <h3
                      className="text-lg font-bold tracking-widest mb-2"
                      style={{ color: "#ffffff" }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-xs tracking-widest"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* INPUTS panel */}
            {activeTab === "INPUTS" && (
              <div className="space-y-5 max-w-md">
                <p
                  className="text-xs tracking-widest mb-4"
                  style={{ color: "#00ffff", opacity: 0.5 }}
                >
                  // INPUT_VARIANTS — FOCUS: RGB_SPLIT_GLOW
                </p>
                {/* Text input */}
                <div>
                  <label
                    className="block text-xs tracking-widest mb-2"
                    style={{ color: "#00ffff" }}
                  >
                    USER_ID:
                  </label>
                  <input
                    type="text"
                    placeholder="ENTER_IDENTIFIER"
                    className="w-full px-4 py-3 text-xs tracking-widest placeholder:opacity-30"
                    style={{
                      backgroundColor: "#0a0a0a",
                      color: "#00ffff",
                      border: "2px solid #00ffff",
                      outline: "none",
                      transition: "none",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.boxShadow =
                        "3px 0 #ff00ff, -3px 0 #ffff00, 0 0 16px rgba(0,255,255,0.3)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                {/* Password input */}
                <div>
                  <label
                    className="block text-xs tracking-widest mb-2"
                    style={{ color: "#ff00ff" }}
                  >
                    ACCESS_KEY:
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3 text-xs tracking-widest placeholder:opacity-30"
                    style={{
                      backgroundColor: "#0a0a0a",
                      color: "#ff00ff",
                      border: "2px solid #ff00ff",
                      outline: "none",
                      transition: "none",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.boxShadow =
                        "3px 0 #00ffff, -3px 0 #ffff00, 0 0 16px rgba(255,0,255,0.3)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                {/* Select */}
                <div>
                  <label
                    className="block text-xs tracking-widest mb-2"
                    style={{ color: "#ffff00" }}
                  >
                    CORRUPTION_MODE:
                  </label>
                  <select
                    className="w-full px-4 py-3 text-xs tracking-widest"
                    style={{
                      backgroundColor: "#0a0a0a",
                      color: "#ffff00",
                      border: "2px solid #ffff00",
                      outline: "none",
                      transition: "none",
                    }}
                  >
                    <option value="rgb">RGB_SPLIT</option>
                    <option value="vhs">VHS_TRACKING</option>
                    <option value="data">DATA_CORRUPT</option>
                    <option value="scan">SCANLINE</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/* 4. COLOR SYSTEM                                               */}
      {/* ============================================================ */}
      <section
        className="px-6 py-24"
        style={{ backgroundColor: "#050505", borderTop: "1px solid rgba(0,255,255,0.1)" }}
      >
        <RevealBlock className="max-w-5xl mx-auto">
          <div className="mb-8">
            <p className="text-xs tracking-widest" style={{ color: "#ffff00", opacity: 0.6 }}>
              // SECTION_04 — COLOR_SYSTEM
            </p>
            <h2
              className="text-3xl font-bold tracking-widest mt-1"
              style={{
                color: "#ffffff",
                textShadow: "3px 0 #ff00ff, -3px 0 #ffff00",
              }}
            >
              CMY_PALETTE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                hex: "#00ffff",
                rgb: "0,255,255",
                type: "PRIMARY",
                name: "CYAN",
                channel: "C",
              },
              {
                hex: "#ff00ff",
                rgb: "255,0,255",
                type: "SECONDARY",
                name: "MAGENTA",
                channel: "M",
              },
              {
                hex: "#ffff00",
                rgb: "255,255,0",
                type: "ACCENT",
                name: "YELLOW",
                channel: "Y",
              },
              {
                hex: "#ffffff",
                rgb: "255,255,255",
                type: "NEUTRAL",
                name: "WHITE",
                channel: "W",
              },
            ].map((color) => (
              <div
                key={color.hex}
                className="p-5"
                style={{
                  backgroundColor: "#0a0a0a",
                  borderLeft: `4px solid ${color.hex}`,
                  border: `1px solid rgba(255,255,255,0.05)`,
                  borderLeftWidth: "4px",
                  borderLeftColor: color.hex,
                }}
              >
                <div
                  className="w-full h-16 mb-4"
                  style={{
                    backgroundColor: color.hex,
                    boxShadow: `0 0 20px ${color.hex}40`,
                  }}
                />
                <div className="space-y-1">
                  <p
                    className="text-xs tracking-widest font-bold"
                    style={{ color: color.hex }}
                  >
                    {color.name}
                  </p>
                  <p
                    className="text-xs tracking-widest"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    [HEX:{color.hex}]
                  </p>
                  <p
                    className="text-xs tracking-widest"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    [RGB:{color.rgb}]
                  </p>
                  <p
                    className="text-xs tracking-widest"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    [TYPE:{color.type}]
                  </p>
                  <p
                    className="text-xs tracking-widest"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    [CH:{color.channel}]
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Black swatch */}
          <div
            className="mt-4 p-5 flex items-center gap-8"
            style={{
              backgroundColor: "#0a0a0a",
              borderLeft: "4px solid rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderLeftWidth: "4px",
              borderLeftColor: "rgba(255,255,255,0.2)",
            }}
          >
            <div
              className="w-24 h-10 flex-shrink-0"
              style={{
                backgroundColor: "#0a0a0a",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
            <div className="flex gap-8 flex-wrap">
              <p
                className="text-xs tracking-widest"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                [HEX:#0A0A0A]
              </p>
              <p
                className="text-xs tracking-widest"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                [RGB:10,10,10]
              </p>
              <p
                className="text-xs tracking-widest"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                [TYPE:BACKGROUND]
              </p>
              <p
                className="text-xs tracking-widest"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                [VOID]
              </p>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/* 5. GLITCH EFFECTS DEMO                                        */}
      {/* ============================================================ */}
      <section
        className="px-6 py-24"
        style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid rgba(255,0,255,0.1)" }}
      >
        <RevealBlock className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs tracking-widest" style={{ color: "#ff00ff", opacity: 0.6 }}>
              // SECTION_05 — CORE_TECHNIQUES
            </p>
            <h2
              className="text-3xl font-bold tracking-widest mt-1"
              style={{
                color: "#ffffff",
                textShadow: "3px 0 #ff00ff, -3px 0 #ffff00",
              }}
            >
              GLITCH_EFFECTS
            </h2>
          </div>

          <div className="space-y-6">
            {/* Effect 1: RGB Channel Split */}
            <RevealBlock delay={0.05}>
              <div
                className="p-6"
                style={{
                  backgroundColor: "#050505",
                  borderLeft: "4px solid #00ffff",
                  border: "1px solid rgba(0,255,255,0.1)",
                  borderLeftWidth: "4px",
                  borderLeftColor: "#00ffff",
                }}
              >
                <p
                  className="text-xs tracking-widest mb-4"
                  style={{ color: "#00ffff", opacity: 0.7 }}
                >
                  [TECHNIQUE_01] RGB_CHANNEL_SPLIT
                </p>
                <div className="relative inline-block">
                  <span
                    className="absolute text-4xl font-bold tracking-widest"
                    style={{
                      color: "#ffff00",
                      opacity: 0.35,
                      transform: "translate(-4px, -4px)",
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  >
                    CORRUPTED
                  </span>
                  <span
                    className="absolute text-4xl font-bold tracking-widest"
                    style={{
                      color: "#ff00ff",
                      opacity: 0.5,
                      transform: "translate(4px, 4px)",
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  >
                    CORRUPTED
                  </span>
                  <span
                    className="relative text-4xl font-bold tracking-widest"
                    style={{
                      color: "#00ffff",
                    }}
                  >
                    CORRUPTED
                  </span>
                </div>
                <p
                  className="text-xs tracking-widest mt-4"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  THREE STACKED SPANS // YELLOW:-4PX MAGENTA:+4PX CYAN:TOP
                </p>
              </div>
            </RevealBlock>

            {/* Effect 2: Horizontal Displacement Band */}
            <RevealBlock delay={0.1}>
              <div
                className="p-6 relative overflow-hidden"
                style={{
                  backgroundColor: "#050505",
                  borderLeft: "4px solid #ff00ff",
                  border: "1px solid rgba(255,0,255,0.1)",
                  borderLeftWidth: "4px",
                  borderLeftColor: "#ff00ff",
                }}
              >
                <p
                  className="text-xs tracking-widest mb-4"
                  style={{ color: "#ff00ff", opacity: 0.7 }}
                >
                  [TECHNIQUE_02] HORIZONTAL_DISPLACEMENT_BAND
                </p>
                <div className="relative py-8 flex items-center">
                  <span
                    className="text-2xl font-bold tracking-widest"
                    style={{ color: "#ffffff", opacity: 0.8 }}
                  >
                    SIGNAL_STREAM_ACTIVE
                  </span>
                  {/* The band */}
                  <div
                    className="absolute left-0 right-0"
                    style={{
                      top: "50%",
                      height: "4px",
                      background:
                        "linear-gradient(90deg, #ff00ff 0%, #00ffff 50%, #ffff00 100%)",
                      opacity: 0.8,
                    }}
                  />
                </div>
                <p
                  className="text-xs tracking-widest"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  COLORED BAR CROSSING ELEMENT // SIMULATES TAPE HEAD MISALIGNMENT
                </p>
              </div>
            </RevealBlock>

            {/* Effect 3: VHS Tracking Error */}
            <RevealBlock delay={0.15}>
              <div
                className="p-6 relative overflow-hidden"
                style={{
                  backgroundColor: "#050505",
                  borderLeft: "4px solid #ffff00",
                  border: "1px solid rgba(255,255,0,0.1)",
                  borderLeftWidth: "4px",
                  borderLeftColor: "#ffff00",
                }}
              >
                <p
                  className="text-xs tracking-widest mb-4"
                  style={{ color: "#ffff00", opacity: 0.7 }}
                >
                  [TECHNIQUE_03] VHS_TRACKING_ERROR_LINE
                </p>
                <div className="relative py-6">
                  <div className="space-y-2">
                    <div
                      className="h-4"
                      style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                    />
                    <div
                      className="h-4"
                      style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                    />
                    {/* VHS tracking line — thin, spanning full width */}
                    <div
                      className="h-px w-full"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, #ffff00 20%, #ffffff 50%, #ff00ff 80%, transparent 100%)",
                        opacity: 0.9,
                      }}
                    />
                    <div
                      className="h-4"
                      style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                    />
                    <div
                      className="h-4"
                      style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                    />
                  </div>
                </div>
                <p
                  className="text-xs tracking-widest"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  THIN HORIZONTAL LINE // FULL WIDTH SPAN // VHS HEAD DESYNC
                </p>
              </div>
            </RevealBlock>

            {/* Effect 4: Data Corruption Block */}
            <RevealBlock delay={0.2}>
              <div
                className="p-6 relative overflow-hidden"
                style={{
                  backgroundColor: "#050505",
                  borderLeft: "4px solid #00ffff",
                  border: "1px solid rgba(0,255,255,0.1)",
                  borderLeftWidth: "4px",
                  borderLeftColor: "#00ffff",
                }}
              >
                <p
                  className="text-xs tracking-widest mb-4"
                  style={{ color: "#00ffff", opacity: 0.7 }}
                >
                  [TECHNIQUE_04] DATA_CORRUPTION_BLOCK
                </p>
                <div className="relative py-6">
                  <p
                    className="text-xl font-bold tracking-widest"
                    style={{ color: "#ffffff", opacity: 0.7 }}
                  >
                    MEMORY_BLOCK: 0xDEADBEEF // READ_FAULT
                  </p>
                  {/* Semi-transparent corruption rectangle overlay */}
                  <div
                    className="absolute"
                    style={{
                      top: "20%",
                      left: "15%",
                      width: "40%",
                      height: "60%",
                      backgroundColor: "rgba(0,255,255,0.15)",
                      border: "1px solid rgba(0,255,255,0.4)",
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      top: "30%",
                      left: "50%",
                      width: "25%",
                      height: "30%",
                      backgroundColor: "rgba(255,0,255,0.12)",
                      border: "1px solid rgba(255,0,255,0.3)",
                    }}
                  />
                </div>
                <p
                  className="text-xs tracking-widest"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  SEMI-TRANSPARENT RECTANGLES // OVERLAID ON CONTENT // SIMULATES DATA LOSS
                </p>
              </div>
            </RevealBlock>

            {/* Effect 5: Scanline Overlay */}
            <RevealBlock delay={0.25}>
              <div
                className="p-6 relative overflow-hidden"
                style={{
                  backgroundColor: "#050505",
                  borderLeft: "4px solid #ff00ff",
                  border: "1px solid rgba(255,0,255,0.1)",
                  borderLeftWidth: "4px",
                  borderLeftColor: "#ff00ff",
                }}
              >
                <p
                  className="text-xs tracking-widest mb-4"
                  style={{ color: "#ff00ff", opacity: 0.7 }}
                >
                  [TECHNIQUE_05] SCANLINE_OVERLAY
                </p>
                <div
                  className="relative py-8"
                  style={{
                    background: "#0a0a0a",
                  }}
                >
                  <p
                    className="text-xl font-bold tracking-widest text-center"
                    style={{ color: "#ff00ff" }}
                  >
                    CRT_DISPLAY_ARTIFACT
                  </p>
                  {/* Scanline overlay on top of content */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,255,0.05) 2px,rgba(0,255,255,0.05) 4px)",
                    }}
                  />
                </div>
                <p
                  className="text-xs tracking-widest mt-4"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  REPEATING-LINEAR-GRADIENT // 2PX TRANSPARENT + 2PX RGBA // CRT PHOSPHOR ROWS
                </p>
              </div>
            </RevealBlock>
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/* 6. SIGNAL MONITOR                                             */}
      {/* ============================================================ */}
      <section
        className="px-6 py-24"
        style={{ backgroundColor: "#050505", borderTop: "1px solid rgba(255,255,0,0.1)" }}
      >
        <RevealBlock className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs tracking-widest" style={{ color: "#ffff00", opacity: 0.6 }}>
              // SECTION_06 — SIGNAL_MONITOR
            </p>
            <h2
              className="text-3xl font-bold tracking-widest mt-1"
              style={{
                color: "#ffffff",
                textShadow: "3px 0 #ff00ff, -3px 0 #ffff00",
              }}
            >
              SYS_MONITOR
            </h2>
          </div>

          <div
            className="p-8"
            style={{
              backgroundColor: "#0a0a0a",
              border: "2px solid #00ffff",
              boxShadow: "0 0 40px rgba(0,255,255,0.08)",
            }}
          >
            {/* Monitor header */}
            <div
              className="flex items-center justify-between mb-6 pb-4"
              style={{ borderBottom: "1px solid rgba(0,255,255,0.2)" }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-2 h-2"
                  style={{ backgroundColor: "#00ff00" }}
                />
                <span
                  className="text-xs tracking-widest"
                  style={{ color: "#00ffff" }}
                >
                  [MONITOR_ACTIVE]
                </span>
              </div>
              <div className="flex gap-4">
                <span
                  className="text-xs tracking-widest"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  PID:8472
                </span>
                <span
                  className="text-xs tracking-widest"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  TS:1708400000
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Signal readouts */}
              <div>
                <p
                  className="text-xs tracking-widest mb-4"
                  style={{ color: "#00ffff", opacity: 0.6 }}
                >
                  // CHANNEL_READOUT
                </p>
                <div className="space-y-3">
                  {SIGNAL_READINGS.map((reading) => (
                    <div key={reading.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="text-xs tracking-widest"
                          style={{ color: reading.color }}
                        >
                          {reading.label}
                        </span>
                        <span
                          className="text-xs tracking-widest"
                          style={{ color: "rgba(255,255,255,0.5)" }}
                        >
                          0x{reading.value}
                        </span>
                      </div>
                      <div
                        className="h-2"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.05)",
                          border: `1px solid ${reading.color}40`,
                        }}
                      >
                        <div
                          style={{
                            width: `${reading.bar}%`,
                            height: "100%",
                            backgroundColor: reading.color,
                            opacity: 0.8,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hex dump */}
              <div>
                <p
                  className="text-xs tracking-widest mb-4"
                  style={{ color: "#ff00ff", opacity: 0.6 }}
                >
                  // HEX_DUMP: 0x0000–0x00FF
                </p>
                <div
                  className="p-4 overflow-hidden"
                  style={{
                    backgroundColor: "#050505",
                    border: "1px solid rgba(255,0,255,0.2)",
                  }}
                >
                  {[
                    "00 FF FF 00 FF 00 FF FF 00 FF",
                    "FF 00 00 FF 00 FF FF 00 FF 00",
                    "DE AD BE EF CA FE BA BE 00 FF",
                    "FF 00 FF 00 00 FF 00 FF FF 00",
                    "BA D0 00 FF 00 00 FF FF 00 FF",
                    "00 FF 00 FF BA DF 00 D0 FF 00",
                    "FF FF 00 FF 00 FF 00 FF 00 00",
                    "00 00 FF FF 00 FF FF 00 FF 00",
                  ].map((line, i) => (
                    <div key={i} className="flex gap-3 mb-1">
                      <span
                        className="text-xs tracking-widest w-12 flex-shrink-0"
                        style={{ color: "rgba(255,255,0,0.5)" }}
                      >
                        {`${(i * 10).toString(16).padStart(4, "0").toUpperCase()}:`}
                      </span>
                      <span
                        className="text-xs tracking-widest"
                        style={{
                          color:
                            i % 3 === 0
                              ? "#00ffff"
                              : i % 3 === 1
                              ? "#ff00ff"
                              : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {line}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Status indicators */}
                <div
                  className="mt-4 p-3"
                  style={{
                    backgroundColor: "#050505",
                    border: "1px solid rgba(0,255,255,0.15)",
                  }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className="text-xs tracking-widest"
                      style={{ color: "#00ffff" }}
                    >
                      INTEGRITY
                    </span>
                    <span
                      className="text-xs tracking-widest"
                      style={{ color: "#ff0000" }}
                    >
                      FAILED
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className="text-xs tracking-widest"
                      style={{ color: "#ff00ff" }}
                    >
                      PARITY
                    </span>
                    <span
                      className="text-xs tracking-widest"
                      style={{ color: "#ffff00" }}
                    >
                      ERROR
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span
                      className="text-xs tracking-widest"
                      style={{ color: "#ffff00" }}
                    >
                      CHECKSUM
                    </span>
                    <span
                      className="text-xs tracking-widest"
                      style={{ color: "#ff00ff" }}
                    >
                      0xBADF00D
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Corrupted data display */}
            <div
              className="mt-6 p-4"
              style={{
                backgroundColor: "#050505",
                border: "1px solid rgba(255,255,0,0.2)",
              }}
            >
              <p
                className="text-xs tracking-widest mb-3"
                style={{ color: "#ffff00", opacity: 0.7 }}
              >
                // CORRUPTED_STREAM_PREVIEW
              </p>
              <div className="flex flex-wrap gap-1">
                {[
                  "▓▓▓",
                  "░░░",
                  "0xFF",
                  "▓░▓",
                  "ERR",
                  "▒▒▒",
                  "0x00",
                  "▓▓░",
                  "NUL",
                  "▒░▒",
                  "0xAA",
                  "▓░░",
                  "CRC",
                  "░▓░",
                  "0xBB",
                  "▒▒░",
                  "ACK",
                  "░░▓",
                  "0xCC",
                  "▓▒░",
                ].map((chunk, i) => (
                  <span
                    key={i}
                    className="text-xs tracking-widest px-1"
                    style={{
                      color:
                        i % 4 === 0
                          ? "#00ffff"
                          : i % 4 === 1
                          ? "#ff00ff"
                          : i % 4 === 2
                          ? "#ffff00"
                          : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {chunk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/* 7. DO / DON'T RULES                                           */}
      {/* ============================================================ */}
      <section
        className="px-6 py-24"
        style={{ backgroundColor: "#0a0a0a", borderTop: "1px solid rgba(0,255,255,0.1)" }}
      >
        <RevealBlock className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs tracking-widest" style={{ color: "#00ffff", opacity: 0.6 }}>
              // SECTION_07 — DESIGN_RULES
            </p>
            <h2
              className="text-3xl font-bold tracking-widest mt-1"
              style={{
                color: "#ffffff",
                textShadow: "3px 0 #ff00ff, -3px 0 #ffff00",
              }}
            >
              DO_vs_DONT
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DO column */}
            <div>
              <div
                className="mb-3 px-4 py-2 inline-block"
                style={{
                  backgroundColor: "rgba(0,255,255,0.1)",
                  border: "1px solid #00ffff",
                }}
              >
                <span
                  className="text-xs font-bold tracking-widest"
                  style={{ color: "#00ffff" }}
                >
                  DO: CORRECT_APPROACH
                </span>
              </div>
              <div className="space-y-3">
                {[
                  "USE TRANSITION:NONE ON ALL INTERACTIVE ELEMENTS",
                  "APPLY RGB SHADOW: 3PX 0 #FF00FF, -3PX 0 #FFFF00",
                  "SET BORDER-L-4 NOT FULL BORDER ON CARDS",
                  "USE FONT-MONO UPPERCASE TRACKING-WIDEST EVERYWHERE",
                  "ACTIVE:SKEW-X FOR STRUCTURAL TEAR EFFECT",
                  "BLACK BACKGROUND #0A0A0A ONLY",
                  "CMY COLORS: CYAN MAGENTA YELLOW WHITE",
                  "ZERO ROUNDED CORNERS ANYWHERE",
                  "SCANLINE OVERLAY VIA REPEATING-LINEAR-GRADIENT",
                  "HEX READOUTS IN TERMINAL-STYLE PANELS",
                ].map((rule, i) => (
                  <div
                    key={i}
                    className="p-4"
                    style={{
                      backgroundColor: "#050505",
                      borderLeft: "4px solid #00ffff",
                    }}
                  >
                    <p
                      className="text-xs tracking-widest"
                      style={{ color: "#ffffff", opacity: 0.8 }}
                    >
                      + {rule}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* DON'T column */}
            <div>
              <div
                className="mb-3 px-4 py-2 inline-block"
                style={{
                  backgroundColor: "rgba(255,0,255,0.1)",
                  border: "1px solid #ff00ff",
                }}
              >
                <span
                  className="text-xs font-bold tracking-widest"
                  style={{ color: "#ff00ff" }}
                >
                  DONT: CORRUPTION_ERRORS
                </span>
              </div>
              <div className="space-y-3">
                {[
                  "NO SMOOTH TRANSITIONS OR EASING CURVES",
                  "NO SOFT BOX SHADOWS OR BLUR GLOW",
                  "NO ROUNDED CORNERS (ROUNDED-NONE ALWAYS)",
                  "NO SANS-SERIF OR SERIF FONTS",
                  "NO COLORS OUTSIDE CMY PALETTE",
                  "NO GRADIENTS EXCEPT DISPLACEMENT BANDS",
                  "NO FULL BORDER ON CARDS (LEFT ONLY)",
                  "NO OPACITY ANIMATIONS OR FADES",
                  "NO PASTEL OR MUTED TONES",
                  "NO WHITE BACKGROUNDS OR LIGHT SURFACES",
                ].map((rule, i) => (
                  <div
                    key={i}
                    className="p-4"
                    style={{
                      backgroundColor: "#050505",
                      borderLeft: "4px solid #ff00ff",
                    }}
                  >
                    <p
                      className="text-xs tracking-widest"
                      style={{ color: "#ffffff", opacity: 0.8 }}
                    >
                      - {rule}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/* 8. ERROR LOG GRID                                             */}
      {/* ============================================================ */}
      <section
        className="px-6 py-24"
        style={{ backgroundColor: "#050505", borderTop: "1px solid rgba(255,0,255,0.1)" }}
      >
        <RevealBlock className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs tracking-widest" style={{ color: "#ff00ff", opacity: 0.6 }}>
              // SECTION_08 — ERROR_LOG_GRID
            </p>
            <h2
              className="text-3xl font-bold tracking-widest mt-1"
              style={{
                color: "#ffffff",
                textShadow: "3px 0 #ff00ff, -3px 0 #ffff00",
              }}
            >
              SYSTEM_ERRORS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ERROR_LOG_PANELS.map((panel, i) => (
              <RevealBlock key={panel.id} delay={i * 0.06}>
                <div
                  className="p-5 h-full"
                  style={{
                    backgroundColor: "#0a0a0a",
                    borderLeft: `4px solid ${panel.border}`,
                    border: `1px solid rgba(255,255,255,0.04)`,
                    borderLeftWidth: "4px",
                    borderLeftColor: panel.border,
                  }}
                >
                  {/* Panel header */}
                  <div
                    className="flex items-center justify-between mb-4 pb-3"
                    style={{ borderBottom: `1px solid ${panel.border}30` }}
                  >
                    <span
                      className="text-xs font-bold tracking-widest"
                      style={{ color: panel.border }}
                    >
                      {panel.label}
                    </span>
                    <span
                      className="text-xs tracking-widest"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      [{panel.id}]
                    </span>
                  </div>

                  {/* Error lines */}
                  <div className="space-y-2">
                    {panel.lines.map((line, j) => (
                      <p
                        key={j}
                        className="text-xs tracking-widest"
                        style={{
                          color:
                            j === panel.lines.length - 1
                              ? panel.border
                              : "rgba(255,255,255,0.5)",
                          opacity: j === panel.lines.length - 1 ? 1 : 0.7,
                        }}
                      >
                        {j === panel.lines.length - 1 ? "\u25B6 " : "  "}
                        {line}
                      </p>
                    ))}
                  </div>

                  {/* Timestamp */}
                  <div
                    className="mt-4 pt-3"
                    style={{ borderTop: `1px solid ${panel.border}20` }}
                  >
                    <p
                      className="text-xs tracking-widest"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                      TS: 1708{(i * 317 + 42).toString().padStart(6, "0")}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Bottom log stream */}
          <RevealBlock delay={0.4}>
            <div
              className="mt-8 p-5"
              style={{
                backgroundColor: "#0a0a0a",
                border: "1px solid rgba(0,255,255,0.15)",
                borderLeft: "4px solid #00ffff",
              }}
            >
              <p
                className="text-xs tracking-widest mb-3"
                style={{ color: "#00ffff", opacity: 0.6 }}
              >
                // LIVE_ERROR_STREAM
              </p>
              <div className="space-y-1">
                {[
                  { t: "0x00", msg: "KERNEL PANIC — NOT SYNCING: VFS UNABLE TO MOUNT FS", c: "#ff00ff" },
                  { t: "0x01", msg: "OOPS: GENERAL PROTECTION FAULT IN HARDIRQ", c: "#ffff00" },
                  { t: "0x02", msg: "BUG: SOFT LOCKUP — CPU#0 STUCK FOR 22S", c: "#00ffff" },
                  { t: "0x03", msg: "EXT4-FS ERROR: MB_CACHE_BLOCK CORRUPTED", c: "#ff00ff" },
                  { t: "0x04", msg: "GLITCH_RENDER: FRAMEBUFFER TORN — PRESENTING ARTIFACT", c: "#ffffff" },
                ].map((entry, i) => (
                  <div key={i} className="flex gap-4">
                    <span
                      className="text-xs tracking-widest flex-shrink-0 w-10"
                      style={{ color: "#ffff00", opacity: 0.5 }}
                    >
                      [{entry.t}]
                    </span>
                    <span
                      className="text-xs tracking-widest"
                      style={{ color: entry.c, opacity: 0.8 }}
                    >
                      {entry.msg}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/* 9. FOOTER                                                     */}
      {/* ============================================================ */}
      <footer
        className="px-6 py-16 relative overflow-hidden"
        style={{ backgroundColor: "#0a0a0a", borderTop: "2px solid rgba(0,255,255,0.15)" }}
      >
        {/* VHS tracking error line decoration */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "30%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent 0%, #00ffff 15%, rgba(255,255,255,0.8) 40%, #ff00ff 60%, #ffff00 80%, transparent 100%)",
            opacity: 0.4,
          }}
        />
        <div
          className="absolute left-0 right-0"
          style={{
            top: "70%",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent 0%, #ff00ff 30%, transparent 60%, #00ffff 80%, transparent 100%)",
            opacity: 0.25,
          }}
        />

        <div className="max-w-5xl mx-auto">
          {/* SYS:HALT label */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-2 h-2"
              style={{ backgroundColor: "#ff0000" }}
            />
            <span
              className="text-sm font-bold tracking-widest"
              style={{ color: "#ff00ff" }}
            >
              [SYS:HALT]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Brand */}
            <div>
              <p
                className="text-lg font-bold tracking-widest mb-3"
                style={{
                  color: "#00ffff",
                  textShadow: "3px 0 #ff00ff, -3px 0 #ffff00",
                }}
              >
                [GLITCH.ART]
              </p>
              <p
                className="text-xs tracking-widest"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                DIGITAL_ERROR_AS_AESTHETIC
              </p>
              <p
                className="text-xs tracking-widest mt-1"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                RGB_SEPARATED // CMY_ONLY
              </p>
            </div>

            {/* Links */}
            <div>
              <p
                className="text-xs font-bold tracking-widest mb-4"
                style={{ color: "#ff00ff" }}
              >
                NAVIGATION
              </p>
              <div className="space-y-2">
                {["COMPONENTS", "COLOR_SYSTEM", "EFFECTS_DEMO", "ERROR_LOG"].map(
                  (item) => (
                    <p key={item}>
                      <span
                        className="text-xs tracking-widest"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                      >
                        // {item}
                      </span>
                    </p>
                  )
                )}
              </div>
            </div>

            {/* System info */}
            <div>
              <p
                className="text-xs font-bold tracking-widest mb-4"
                style={{ color: "#ffff00" }}
              >
                SYS_INFO
              </p>
              <div className="space-y-2">
                {[
                  ["VERSION", "0x0001"],
                  ["BUILD", "CORRUPTED"],
                  ["RUNTIME", "NODE_20"],
                  ["RENDERER", "NEXT_15"],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between">
                    <span
                      className="text-xs tracking-widest"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {label}:
                    </span>
                    <span
                      className="text-xs tracking-widest"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright in hex format */}
          <div
            className="pt-6"
            style={{ borderTop: "1px solid rgba(0,255,255,0.1)" }}
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p
                className="text-xs tracking-widest"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                0x00A9 2026 GLITCH.ART // ALL_RIGHTS_CORRUPTED // STYLEKIT_DEMO
              </p>
              <p
                className="text-xs tracking-widest"
                style={{ color: "rgba(255,255,255,0.15)" }}
              >
                [END_OF_TRANSMISSION]
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
