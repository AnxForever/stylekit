"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// useInView — disconnects after first intersection (fire-once)
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// RevealBlock — fade + slide-up on scroll
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Pixel sprite drawn with box-shadow (classic CSS pixel-art technique)
// Each entry: [col, row, color]
// ---------------------------------------------------------------------------
const HEART_PIXELS: [number, number, string][] = [
  [1, 0, "#ff004d"], [2, 0, "#ff004d"], [4, 0, "#ff004d"], [5, 0, "#ff004d"],
  [0, 1, "#ff004d"], [1, 1, "#ff004d"], [2, 1, "#ff77a8"], [3, 1, "#ff004d"],
  [4, 1, "#ff77a8"], [5, 1, "#ff004d"], [6, 1, "#ff004d"],
  [0, 2, "#ff004d"], [1, 2, "#ff004d"], [2, 2, "#ff004d"], [3, 2, "#ff004d"],
  [4, 2, "#ff004d"], [5, 2, "#ff004d"], [6, 2, "#ff004d"],
  [1, 3, "#ff004d"], [2, 3, "#ff004d"], [3, 3, "#ff004d"],
  [4, 3, "#ff004d"], [5, 3, "#ff004d"],
  [2, 4, "#ff004d"], [3, 4, "#ff004d"], [4, 4, "#ff004d"],
  [3, 5, "#ff004d"],
];

const STAR_PIXELS: [number, number, string][] = [
  [3, 0, "#ffec27"],
  [2, 1, "#ffec27"], [3, 1, "#ffec27"], [4, 1, "#ffec27"],
  [0, 2, "#ffec27"], [1, 2, "#ffec27"], [2, 2, "#ffec27"], [3, 2, "#ffec27"],
  [4, 2, "#ffec27"], [5, 2, "#ffec27"], [6, 2, "#ffec27"],
  [1, 3, "#ffec27"], [2, 3, "#ffec27"], [3, 3, "#ffec27"],
  [4, 3, "#ffec27"], [5, 3, "#ffec27"],
  [2, 4, "#ffec27"], [4, 4, "#ffec27"],
  [1, 5, "#ffec27"], [5, 5, "#ffec27"],
];

const COIN_PIXELS: [number, number, string][] = [
  [1, 0, "#ffec27"], [2, 0, "#ffec27"], [3, 0, "#ffec27"], [4, 0, "#ffec27"],
  [0, 1, "#ffec27"], [1, 1, "#ffa300"], [2, 1, "#ffec27"], [3, 1, "#ffa300"],
  [4, 1, "#ffec27"], [5, 1, "#ffec27"],
  [0, 2, "#ffec27"], [1, 2, "#ffec27"], [2, 2, "#ffec27"], [3, 2, "#ffec27"],
  [4, 2, "#ffec27"], [5, 2, "#ffec27"],
  [0, 3, "#ffec27"], [1, 3, "#ffa300"], [2, 3, "#ffec27"], [3, 3, "#ffa300"],
  [4, 3, "#ffec27"], [5, 3, "#ffec27"],
  [1, 4, "#ffec27"], [2, 4, "#ffec27"], [3, 4, "#ffec27"], [4, 4, "#ffec27"],
];

function PixelSprite({
  pixels,
  pixelSize = 6,
}: {
  pixels: [number, number, string][];
  pixelSize?: number;
}) {
  const shadow = pixels
    .map(([col, row, color]) => `${col * pixelSize}px ${row * pixelSize}px 0 ${color}`)
    .join(", ");

  const maxCol = Math.max(...pixels.map(([c]) => c));
  const maxRow = Math.max(...pixels.map(([, r]) => r));

  return (
    <div
      style={{
        width: pixelSize,
        height: pixelSize,
        boxShadow: shadow,
        marginRight: (maxCol + 1) * pixelSize,
        marginBottom: (maxRow + 1) * pixelSize,
        imageRendering: "pixelated",
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Pixel border utility (4-direction hard outline)
// ---------------------------------------------------------------------------
const PIXEL_BORDER = "4px solid #1a1c2c";
const PIXEL_SHADOW = "4px 4px 0 #1a1c2c";

// ---------------------------------------------------------------------------
// Section wrapper
// ---------------------------------------------------------------------------
function Section({
  title,
  subtitle,
  children,
  dark = false,
  accentColor = "#ffec27",
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  dark?: boolean;
  accentColor?: string;
}) {
  return (
    <section
      style={{
        backgroundColor: dark ? "#0f0f1e" : "#1a1c2c",
        padding: "64px 24px",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <RevealBlock className="text-center mb-12">
          <h2
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "clamp(1.25rem, 4vw, 2rem)",
              fontWeight: 900,
              color: accentColor,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: 8,
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontFamily: "'Courier New', monospace",
              color: "#29adff",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontSize: "0.75rem",
            }}
          >
            {subtitle}
          </p>
        </RevealBlock>
        {children}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Pixel Button component
// ---------------------------------------------------------------------------
function PixelButton({
  children,
  bg = "#ff004d",
  border = "#1a1c2c",
  color = "#ffffff",
  shadowColor = "#1a1c2c",
  shadowOffset = 4,
  className = "",
  style: extraStyle,
  onClick,
}: {
  children: React.ReactNode;
  bg?: string;
  border?: string;
  color?: string;
  shadowColor?: string;
  shadowOffset?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onClick={onClick}
      className={className}
      style={{
        backgroundColor: bg,
        border: `4px solid ${border}`,
        borderRadius: 0,
        color,
        fontFamily: "'Courier New', monospace",
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        boxShadow: pressed
          ? "none"
          : `${shadowOffset}px ${shadowOffset}px 0 ${shadowColor}`,
        transform: pressed
          ? `translate(${shadowOffset}px, ${shadowOffset}px)`
          : "translate(0, 0)",
        cursor: "pointer",
        transition: "none",
        imageRendering: "pixelated",
        ...extraStyle,
      }}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Main showcase
// ---------------------------------------------------------------------------
export default function PixelArtShowcase() {
  // --- state 1: score counter ---
  const [score, setScore] = useState(0);
  // --- state 2: active game menu item ---
  const [activeMenu, setActiveMenu] = useState(0);
  // --- state 3: health bar ---
  const [health, setHealth] = useState(75);
  // --- state 4: toggle options ---
  const [toggleStates, setToggleStates] = useState([true, false, true]);
  // --- state 5: active tab in component panel ---
  const [activeTab, setActiveTab] = useState(0);
  // --- hero blink ---
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 600);
    return () => clearInterval(t);
  }, []);

  const menuItems = ["START GAME", "OPTIONS", "HIGH SCORES", "CREDITS"];
  const tabs = ["BUTTON", "CARD", "INPUT"];

  const palette = [
    { name: "DARK",   hex: "#1a1c2c" },
    { name: "RED",    hex: "#ff004d" },
    { name: "GREEN",  hex: "#00e436" },
    { name: "BLUE",   hex: "#29adff" },
    { name: "YELLOW", hex: "#ffec27" },
    { name: "PINK",   hex: "#ff77a8" },
    { name: "ORANGE", hex: "#ffa300" },
    { name: "PURPLE", hex: "#7e2553" },
    { name: "LIGHT",  hex: "#f4f4f4" },
    { name: "BROWN",  hex: "#5f574f" },
    { name: "TAN",    hex: "#c2c3c7" },
    { name: "TEAL",   hex: "#008751" },
  ];

  const doRules = [
    "Use rounded-none — zero radius, always",
    "Use border-4 for all borders",
    "Hard shadow: 4px 4px 0 color — no blur",
    "PICO-8 / NES palette only",
    "Monospace or pixel fonts, uppercase",
    "Pixel Perfect Drop: active translate equals shadow offset exactly",
    "Palette Swap: hover hard-cuts to another 8-bit color",
    "transition-none everywhere — state machine, not animation engine",
  ];

  const dontRules = [
    "No rounded corners of any kind",
    "No gradients — ever",
    "No soft box-shadow with blur",
    "No off-palette colors",
    "No thin borders (border, border-2)",
    "No transition-* except transition-none",
    "No opacity transitions on hover",
    "No mismatched active translate vs shadow offset",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a1c2c",
        fontFamily: "'Courier New', monospace",
        imageRendering: "pixelated",
      }}
    >
      {/* ================================================================
          SECTION 1 — Fixed navigation bar
      ================================================================ */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backgroundColor: "#1a1c2c",
          borderBottom: "4px solid #ff004d",
          padding: "12px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Link
            href="/styles/pixel-art"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 16,
                height: 16,
                backgroundColor: "#ff004d",
                border: "2px solid #ffec27",
                boxShadow: "2px 2px 0 #ffec27",
              }}
            />
            <span
              style={{
                color: "#ffec27",
                fontWeight: 900,
                fontSize: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
              }}
            >
              PIXEL ART
            </span>
          </Link>

          {/* Nav links */}
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {["PLAY", "SCORES", "ABOUT"].map((item) => (
              <span
                key={item}
                style={{
                  color: "#29adff",
                  fontSize: "0.7rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  transition: "none",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLSpanElement).style.color = "#ffffff")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLSpanElement).style.color = "#29adff")
                }
              >
                {item}
              </span>
            ))}
            <Link href="/styles" style={{ textDecoration: "none" }}>
              <PixelButton
                bg="#ff004d"
                border="#ffffff"
                shadowColor="#00e436"
                shadowOffset={3}
                className="px-3 py-1 text-xs"
                style={{ fontSize: "0.65rem", padding: "6px 12px" } as React.CSSProperties}
              >
                ALL STYLES
              </PixelButton>
            </Link>
          </div>
        </div>
      </nav>

      {/* ================================================================
          SECTION 2 — Hero section
      ================================================================ */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1c2c",
          padding: "80px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background pixel grid decoration */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(41,173,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(41,173,255,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            pointerEvents: "none",
          }}
        />

        {/* Sprites row */}
        <div
          style={{
            display: "flex",
            gap: 48,
            justifyContent: "center",
            marginBottom: 48,
          }}
        >
          <PixelSprite pixels={HEART_PIXELS} pixelSize={8} />
          <PixelSprite pixels={STAR_PIXELS} pixelSize={8} />
          <PixelSprite pixels={COIN_PIXELS} pixelSize={8} />
        </div>

        {/* Title */}
        <div style={{ position: "relative", zIndex: 1, marginBottom: 16 }}>
          <h1
            style={{
              fontSize: "clamp(2rem, 8vw, 5rem)",
              fontWeight: 900,
              color: "#ffec27",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              lineHeight: 1,
              textShadow: "6px 6px 0 #ff004d",
            }}
          >
            PIXEL ART
          </h1>
        </div>

        {/* Blinking "INSERT COIN" */}
        <div
          style={{
            fontSize: "0.9rem",
            color: "#ffffff",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            marginBottom: 8,
            opacity: blink ? 1 : 0,
            transition: "none",
          }}
        >
          INSERT COIN TO CONTINUE
        </div>

        <p
          style={{
            color: "#29adff",
            fontSize: "clamp(0.75rem, 2vw, 1rem)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            maxWidth: 560,
            marginBottom: 40,
            lineHeight: 1.7,
          }}
        >
          Retro 8-bit aesthetics. Sharp corners. Pixel borders.
          Hard shadows. PICO-8 palette. Pure nostalgia.
        </p>

        {/* CTA buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          <PixelButton
            bg="#ff004d"
            border="#ffffff"
            shadowColor="#00e436"
            shadowOffset={6}
            style={{ fontSize: "1.1rem", padding: "16px 40px" } as React.CSSProperties}
          >
            PRESS START
          </PixelButton>
          <PixelButton
            bg="#29adff"
            border="#ffffff"
            shadowColor="#ffec27"
            shadowOffset={6}
            style={{ fontSize: "1.1rem", padding: "16px 40px" } as React.CSSProperties}
          >
            HIGH SCORES
          </PixelButton>
        </div>

        {/* Score display */}
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 40,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "SCORE", value: "9999" },
            { label: "LEVEL", value: "01" },
            { label: "LIVES", value: "03" },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "0.6rem",
                  color: "#29adff",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: 4,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 900,
                  color: "#ffec27",
                  letterSpacing: "0.1em",
                  textShadow: "2px 2px 0 #ff004d",
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — Component demos: Button, Card, Input
      ================================================================ */}
      <Section
        title="COMPONENTS"
        subtitle="CORE UI ELEMENTS"
        dark={true}
        accentColor="#ffec27"
      >
        {/* Tab switcher */}
        <RevealBlock>
          <div
            style={{
              display: "flex",
              borderBottom: "4px solid #29adff",
              marginBottom: 32,
            }}
          >
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: "10px 20px",
                  fontFamily: "'Courier New', monospace",
                  fontWeight: 900,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  border: "none",
                  borderRadius: 0,
                  cursor: "pointer",
                  transition: "none",
                  backgroundColor: activeTab === i ? "#29adff" : "transparent",
                  color: activeTab === i ? "#ffffff" : "#29adff",
                  borderBottom: activeTab === i ? "4px solid #29adff" : "none",
                  marginBottom: activeTab === i ? -4 : 0,
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          {/* BUTTON panel */}
          {activeTab === 0 && (
            <div
              style={{
                backgroundColor: "#1a1c2c",
                border: "4px solid #ffffff",
                padding: 32,
                boxShadow: "8px 8px 0 #ff004d",
              }}
            >
              <p
                style={{
                  color: "#29adff",
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: 20,
                }}
              >
                PALETTE SWAP — hover hard-cuts color, no transitions
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
                <PixelButton
                  bg="#ff004d"
                  border="#1a1c2c"
                  shadowColor="#1a1c2c"
                  style={{ padding: "12px 24px", fontSize: "0.8rem" } as React.CSSProperties}
                >
                  START
                </PixelButton>
                <PixelButton
                  bg="#00e436"
                  border="#1a1c2c"
                  shadowColor="#1a1c2c"
                  style={{ padding: "12px 24px", fontSize: "0.8rem" } as React.CSSProperties}
                >
                  PLAY
                </PixelButton>
                <PixelButton
                  bg="#29adff"
                  border="#1a1c2c"
                  shadowColor="#1a1c2c"
                  style={{ padding: "12px 24px", fontSize: "0.8rem" } as React.CSSProperties}
                >
                  JUMP
                </PixelButton>
                <PixelButton
                  bg="#ffec27"
                  border="#1a1c2c"
                  color="#1a1c2c"
                  shadowColor="#1a1c2c"
                  style={{ padding: "12px 24px", fontSize: "0.8rem" } as React.CSSProperties}
                >
                  COIN
                </PixelButton>
              </div>

              <p
                style={{
                  color: "#29adff",
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: 16,
                }}
              >
                PIXEL PERFECT DROP — active translate === shadow offset
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 16 }}>
                <PixelButton
                  bg="#ff004d"
                  border="#1a1c2c"
                  shadowColor="#1a1c2c"
                  shadowOffset={2}
                  style={{ padding: "8px 16px", fontSize: "0.65rem" } as React.CSSProperties}
                >
                  SMALL
                </PixelButton>
                <PixelButton
                  bg="#ff004d"
                  border="#1a1c2c"
                  shadowColor="#1a1c2c"
                  shadowOffset={4}
                  style={{ padding: "12px 24px", fontSize: "0.8rem" } as React.CSSProperties}
                >
                  MEDIUM
                </PixelButton>
                <PixelButton
                  bg="#ff004d"
                  border="#1a1c2c"
                  shadowColor="#1a1c2c"
                  shadowOffset={6}
                  style={{ padding: "16px 40px", fontSize: "1rem" } as React.CSSProperties}
                >
                  LARGE
                </PixelButton>
              </div>

              {/* Code snippet */}
              <pre
                style={{
                  marginTop: 24,
                  backgroundColor: "#0f0f1e",
                  border: "4px solid #29adff",
                  padding: 16,
                  fontSize: "0.65rem",
                  color: "#29adff",
                  overflowX: "auto",
                  lineHeight: 1.6,
                }}
              >{`<button className="
  px-6 py-3 bg-[#ff004d]
  border-[4px] border-[#1a1c2c] rounded-none
  text-white font-bold uppercase tracking-widest
  shadow-[4px_4px_0_#1a1c2c]
  hover:bg-[#29adff] hover:shadow-[4px_4px_0_#ff004d]
  active:translate-x-[4px] active:translate-y-[4px]
  active:shadow-none transition-none
">
  START
</button>`}</pre>
            </div>
          )}

          {/* CARD panel */}
          {activeTab === 1 && (
            <div
              style={{
                backgroundColor: "#1a1c2c",
                border: "4px solid #ffffff",
                padding: 32,
                boxShadow: "8px 8px 0 #00e436",
              }}
            >
              <p
                style={{
                  color: "#29adff",
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: 20,
                }}
              >
                HOVER SWAPS BORDER + TITLE COLOR — transition-none
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: 16,
                  marginBottom: 24,
                }}
              >
                {[
                  { title: "LEVEL 1", sub: "PRESS START TO ENTER THE PIXEL WORLD.", color: "#ff004d", icon: ">" },
                  { title: "LEVEL 2", sub: "COLLECT ALL COINS TO UNLOCK THE BOSS.", color: "#00e436", icon: "*" },
                  { title: "LEVEL 3", sub: "DEFEAT THE FINAL ENEMY. YOU CAN DO IT!", color: "#29adff", icon: "!" },
                ].map(({ title, sub, color, icon }) => (
                  <div
                    key={title}
                    className="group"
                    style={{
                      padding: 24,
                      backgroundColor: "#f4f4f4",
                      border: `4px solid #1a1c2c`,
                      boxShadow: `4px 4px 0 #1a1c2c`,
                      cursor: "pointer",
                      transition: "none",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.border = `4px solid ${color}`;
                      el.style.boxShadow = `4px 4px 0 ${color}`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.border = "4px solid #1a1c2c";
                      el.style.boxShadow = "4px 4px 0 #1a1c2c";
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor: color,
                        border: "4px solid #1a1c2c",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 12,
                        fontSize: "1.2rem",
                        color: "#ffffff",
                        fontWeight: 900,
                      }}
                    >
                      {icon}
                    </div>
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 900,
                        textTransform: "uppercase",
                        color: "#1a1c2c",
                        letterSpacing: "0.1em",
                        marginBottom: 8,
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.7rem",
                        color: "#5f574f",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        lineHeight: 1.5,
                      }}
                    >
                      {sub}
                    </p>
                  </div>
                ))}
              </div>

              <pre
                style={{
                  backgroundColor: "#0f0f1e",
                  border: "4px solid #29adff",
                  padding: 16,
                  fontSize: "0.65rem",
                  color: "#29adff",
                  overflowX: "auto",
                  lineHeight: 1.6,
                }}
              >{`<div className="group p-6
  bg-white border-[4px] border-[#1a1c2c] rounded-none
  shadow-[4px_4px_0_#1a1c2c]
  hover:border-[#ff004d] hover:shadow-[4px_4px_0_#ff004d]
  transition-none cursor-pointer">
  <h3 className="font-bold uppercase text-[#1a1c2c]
    group-hover:text-[#ff004d] transition-none">
    LEVEL 1
  </h3>
</div>`}</pre>
            </div>
          )}

          {/* INPUT panel */}
          {activeTab === 2 && (
            <div
              style={{
                backgroundColor: "#1a1c2c",
                border: "4px solid #ffffff",
                padding: 32,
                boxShadow: "8px 8px 0 #ffec27",
              }}
            >
              <p
                style={{
                  color: "#29adff",
                  fontSize: "0.65rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: 20,
                }}
              >
                FOCUS: inner color shadow — no ring glow
              </p>
              <div
                style={{
                  maxWidth: 400,
                  backgroundColor: "#f4f4f4",
                  border: "4px solid #1a1c2c",
                  padding: 24,
                  boxShadow: "8px 8px 0 #ff004d",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 900,
                    color: "#1a1c2c",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    textAlign: "center",
                    marginBottom: 20,
                  }}
                >
                  NEW GAME
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input
                    type="text"
                    placeholder="PLAYER NAME..."
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      backgroundColor: "#ffffff",
                      border: PIXEL_BORDER,
                      borderRadius: 0,
                      fontFamily: "'Courier New', monospace",
                      fontWeight: 700,
                      color: "#1a1c2c",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      outline: "none",
                      fontSize: "0.8rem",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLInputElement).style.boxShadow =
                        "inset 0 0 0 3px #29adff";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLInputElement).style.boxShadow = "none";
                    }}
                  />
                  <select
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      backgroundColor: "#ffffff",
                      border: PIXEL_BORDER,
                      borderRadius: 0,
                      fontFamily: "'Courier New', monospace",
                      fontWeight: 700,
                      color: "#1a1c2c",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      outline: "none",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    <option>EASY MODE</option>
                    <option>NORMAL MODE</option>
                    <option>HARD MODE</option>
                    <option>PIXEL PERFECT</option>
                  </select>
                  <PixelButton
                    bg="#00e436"
                    border="#1a1c2c"
                    shadowColor="#1a1c2c"
                    shadowOffset={6}
                    style={{ padding: "14px", fontSize: "1rem", width: "100%" } as React.CSSProperties}
                  >
                    START GAME
                  </PixelButton>
                </div>
              </div>

              <pre
                style={{
                  marginTop: 24,
                  backgroundColor: "#0f0f1e",
                  border: "4px solid #29adff",
                  padding: 16,
                  fontSize: "0.65rem",
                  color: "#29adff",
                  overflowX: "auto",
                  lineHeight: 1.6,
                }}
              >{`<input
  type="text"
  placeholder="ENTER NAME..."
  className="
    w-full px-4 py-3
    bg-white border-4 border-[#1a1c2c] rounded-none
    text-[#1a1c2c] placeholder-[#8b8680]
    font-mono uppercase
    focus:outline-none
    focus:shadow-[inset_0_0_0_3px_#29adff]
    transition-all
  "
/>`}</pre>
            </div>
          )}
        </RevealBlock>
      </Section>

      {/* ================================================================
          SECTION 4 — Color palette (NES/PICO-8)
      ================================================================ */}
      <Section
        title="COLOR SYSTEM"
        subtitle="PICO-8 INSPIRED PALETTE — 12 COLORS"
        dark={false}
        accentColor="#ffec27"
      >
        <RevealBlock>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: 12,
            }}
          >
            {palette.map(({ name, hex }, i) => (
              <RevealBlock key={hex} delay={i * 0.04}>
                <div
                  style={{
                    border: "4px solid #ffffff",
                    boxShadow: "4px 4px 0 #000000",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: 64,
                      backgroundColor: hex,
                      imageRendering: "pixelated",
                    }}
                  />
                  <div
                    style={{
                      backgroundColor: "#0f0f1e",
                      padding: "8px 10px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 900,
                        color: "#ffffff",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.6rem",
                        color: "#29adff",
                        fontFamily: "'Courier New', monospace",
                        letterSpacing: "0.05em",
                        marginTop: 2,
                      }}
                    >
                      {hex.toUpperCase()}
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </RevealBlock>

        {/* Pixel art divider */}
        <RevealBlock delay={0.2} className="mt-12">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              flexWrap: "wrap",
            }}
          >
            {palette.map(({ hex }) => (
              <div
                key={hex}
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: hex,
                  border: "2px solid #000000",
                  imageRendering: "pixelated",
                }}
              />
            ))}
          </div>
        </RevealBlock>
      </Section>

      {/* ================================================================
          SECTION 5 — Design rules (do / don't)
      ================================================================ */}
      <Section
        title="DESIGN RULES"
        subtitle="DO'S AND DON'TS OF PIXEL ART UI"
        dark={true}
        accentColor="#00e436"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {/* DO list */}
          <RevealBlock>
            <div
              style={{
                border: "4px solid #00e436",
                boxShadow: "6px 6px 0 #00e436",
                padding: 24,
                backgroundColor: "#0f0f1e",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    backgroundColor: "#00e436",
                    border: "4px solid #ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.9rem",
                    fontWeight: 900,
                    color: "#ffffff",
                    flexShrink: 0,
                  }}
                >
                  +
                </div>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 900,
                    color: "#00e436",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  DO
                </h3>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {doRules.map((rule) => (
                  <li
                    key={rule}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        color: "#00e436",
                        fontWeight: 900,
                        fontSize: "0.8rem",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      [+]
                    </span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "#c2c3c7",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        lineHeight: 1.5,
                      }}
                    >
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>

          {/* DON'T list */}
          <RevealBlock delay={0.1}>
            <div
              style={{
                border: "4px solid #ff004d",
                boxShadow: "6px 6px 0 #ff004d",
                padding: 24,
                backgroundColor: "#0f0f1e",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    backgroundColor: "#ff004d",
                    border: "4px solid #ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.9rem",
                    fontWeight: 900,
                    color: "#ffffff",
                    flexShrink: 0,
                  }}
                >
                  X
                </div>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 900,
                    color: "#ff004d",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  DON'T
                </h3>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {dontRules.map((rule) => (
                  <li
                    key={rule}
                    style={{
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        color: "#ff004d",
                        fontWeight: 900,
                        fontSize: "0.8rem",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      [X]
                    </span>
                    <span
                      style={{
                        fontSize: "0.7rem",
                        color: "#c2c3c7",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        lineHeight: 1.5,
                      }}
                    >
                      {rule}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealBlock>
        </div>
      </Section>

      {/* ================================================================
          SECTION 6 — Typography section
      ================================================================ */}
      <Section
        title="TYPOGRAPHY"
        subtitle="PIXEL FONT SYSTEM — MONOSPACE UPPERCASE"
        dark={false}
        accentColor="#ffec27"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { label: "DISPLAY", size: "clamp(2rem, 6vw, 3.5rem)", weight: 900, color: "#ffec27", shadow: "4px 4px 0 #ff004d", sample: "GAME OVER" },
            { label: "HEADING", size: "clamp(1.4rem, 4vw, 2.2rem)", weight: 900, color: "#ff004d", shadow: "3px 3px 0 #1a1c2c", sample: "HIGH SCORE" },
            { label: "SUBHEAD", size: "clamp(1rem, 3vw, 1.5rem)", weight: 900, color: "#29adff", shadow: "2px 2px 0 #1a1c2c", sample: "LEVEL SELECT" },
            { label: "BODY",    size: "0.9rem",                    weight: 700, color: "#c2c3c7", shadow: "none",              sample: "INSERT COIN TO CONTINUE. PRESS START TO PLAY." },
            { label: "CAPTION", size: "0.7rem",                    weight: 700, color: "#5f574f", shadow: "none",              sample: "© 1985 STYLEKIT GAMES. ALL RIGHTS RESERVED." },
          ].map(({ label, size, weight, color, shadow, sample }, i) => (
            <RevealBlock key={label} delay={i * 0.07}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 24,
                  padding: 20,
                  backgroundColor: "#0f0f1e",
                  border: "4px solid #ffffff",
                  boxShadow: "4px 4px 0 #000000",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: "0.6rem",
                    color: "#29adff",
                    textTransform: "uppercase",
                    letterSpacing: "0.15em",
                    fontWeight: 900,
                    minWidth: 64,
                    flexShrink: 0,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: size,
                    fontWeight: weight,
                    color,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    textShadow: shadow,
                    lineHeight: 1.2,
                  }}
                >
                  {sample}
                </span>
              </div>
            </RevealBlock>
          ))}
        </div>

        {/* Letter spacing demo */}
        <RevealBlock delay={0.4} className="mt-8">
          <div
            style={{
              padding: 24,
              backgroundColor: "#0f0f1e",
              border: "4px solid #ffec27",
              boxShadow: "6px 6px 0 #ffec27",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: "0.6rem",
                color: "#29adff",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: 16,
              }}
            >
              LETTER SPACING SCALE
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { tracking: "0em",    label: "NORMAL" },
                { tracking: "0.05em", label: "TIGHT PIXEL" },
                { tracking: "0.1em",  label: "STANDARD PIXEL" },
                { tracking: "0.2em",  label: "WIDE PIXEL" },
                { tracking: "0.4em",  label: "EXTREME PIXEL" },
              ].map(({ tracking, label }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.6rem", color: "#5f574f", minWidth: 120 }}>
                    {label} ({tracking})
                  </span>
                  <span
                    style={{
                      fontFamily: "'Courier New', monospace",
                      color: "#f4f4f4",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: tracking,
                      fontSize: "0.85rem",
                    }}
                  >
                    PIXEL ART
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>
      </Section>

      {/* ================================================================
          SECTION 7 — Interactive game elements
          (score counter + health bar — two useState demos)
      ================================================================ */}
      <Section
        title="INTERACTIVE"
        subtitle="LIVE GAME UI DEMOS"
        dark={true}
        accentColor="#ff004d"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {/* Score counter */}
          <RevealBlock>
            <div
              style={{
                backgroundColor: "#ff004d",
                border: "4px solid #ffffff",
                padding: 32,
                boxShadow: "8px 8px 0 #ffec27",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "0.65rem",
                  color: "#ffffff",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: 8,
                }}
              >
                CURRENT SCORE
              </p>
              <div
                style={{
                  fontSize: "4rem",
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "0.1em",
                  textShadow: "4px 4px 0 #1a1c2c",
                  marginBottom: 24,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {score.toString().padStart(6, "0")}
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
                <PixelButton
                  bg="#ffffff"
                  border="#1a1c2c"
                  color="#1a1c2c"
                  shadowColor="#1a1c2c"
                  shadowOffset={3}
                  onClick={() => setScore(Math.max(0, score - 100))}
                  style={{ width: 52, height: 52, fontSize: "1.4rem" } as React.CSSProperties}
                >
                  -
                </PixelButton>
                <PixelButton
                  bg="#1a1c2c"
                  border="#ffffff"
                  color="#ffffff"
                  shadowColor="#ffffff"
                  shadowOffset={3}
                  onClick={() => setScore(0)}
                  style={{ width: 52, height: 52, fontSize: "0.6rem" } as React.CSSProperties}
                >
                  RST
                </PixelButton>
                <PixelButton
                  bg="#ffffff"
                  border="#1a1c2c"
                  color="#1a1c2c"
                  shadowColor="#1a1c2c"
                  shadowOffset={3}
                  onClick={() => setScore(score + 100)}
                  style={{ width: 52, height: 52, fontSize: "1.4rem" } as React.CSSProperties}
                >
                  +
                </PixelButton>
              </div>
            </div>
          </RevealBlock>

          {/* Health / stats bars */}
          <RevealBlock delay={0.1}>
            <div
              style={{
                backgroundColor: "#0f0f1e",
                border: "4px solid #ffffff",
                padding: 32,
                boxShadow: "8px 8px 0 #ff004d",
              }}
            >
              <p
                style={{
                  fontSize: "0.65rem",
                  color: "#29adff",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: 20,
                }}
              >
                PLAYER STATS
              </p>

              {[
                { label: "HP", value: health, max: 100, color: "#ff004d", icon: "♥" },
                { label: "XP", value: 2450,   max: 5000, color: "#29adff", icon: "★" },
                { label: "MP", value: 80,      max: 100, color: "#7e2553", icon: "◆" },
              ].map(({ label, value, max, color, icon }) => (
                <div key={label} style={{ marginBottom: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 6,
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 900,
                        color,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {icon} {label}
                    </span>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        color: "#ffffff",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {value}/{max}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 20,
                      backgroundColor: "#1a1c2c",
                      border: "4px solid #ffffff",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${(value / max) * 100}%`,
                        backgroundColor: color,
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                </div>
              ))}

              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                <PixelButton
                  bg="#ff004d"
                  border="#ffffff"
                  color="#ffffff"
                  shadowColor="#ffffff"
                  shadowOffset={3}
                  onClick={() => setHealth(Math.max(0, health - 10))}
                  style={{ padding: "8px 14px", fontSize: "0.65rem" } as React.CSSProperties}
                >
                  DAMAGE
                </PixelButton>
                <PixelButton
                  bg="#00e436"
                  border="#ffffff"
                  color="#ffffff"
                  shadowColor="#ffffff"
                  shadowOffset={3}
                  onClick={() => setHealth(Math.min(100, health + 10))}
                  style={{ padding: "8px 14px", fontSize: "0.65rem" } as React.CSSProperties}
                >
                  HEAL
                </PixelButton>
              </div>
            </div>
          </RevealBlock>
        </div>

        {/* Game menu selector */}
        <RevealBlock delay={0.2} className="mt-8">
          <div
            style={{
              maxWidth: 400,
              margin: "0 auto",
              backgroundColor: "#1a1c2c",
              border: "4px solid #ffffff",
              padding: 32,
              boxShadow: "8px 8px 0 #00e436",
            }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                color: "#29adff",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              MAIN MENU — CLICK TO SELECT
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {menuItems.map((item, i) => (
                <button
                  key={item}
                  onClick={() => setActiveMenu(i)}
                  style={{
                    width: "100%",
                    padding: "14px 16px",
                    backgroundColor: activeMenu === i ? "#ff004d" : "transparent",
                    border: `4px solid ${activeMenu === i ? "#ffffff" : "#29adff"}`,
                    borderRadius: 0,
                    color: activeMenu === i ? "#ffffff" : "#29adff",
                    fontFamily: "'Courier New', monospace",
                    fontWeight: 900,
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "none",
                    boxShadow: activeMenu === i ? "4px 4px 0 #ffffff" : "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span>{activeMenu === i ? ">" : " "}</span>
                  {item}
                </button>
              ))}
            </div>
            <p
              style={{
                marginTop: 16,
                fontSize: "0.6rem",
                color: "#5f574f",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                textAlign: "center",
              }}
            >
              SELECTED: {menuItems[activeMenu]}
            </p>
          </div>
        </RevealBlock>

        {/* Options toggles */}
        <RevealBlock delay={0.3} className="mt-8">
          <div
            style={{
              maxWidth: 400,
              margin: "0 auto",
              backgroundColor: "#1a1c2c",
              border: "4px solid #ffffff",
              padding: 32,
              boxShadow: "8px 8px 0 #00e436",
            }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                color: "#29adff",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              GAME OPTIONS
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "SOUND FX",  index: 0 },
                { label: "MUSIC",     index: 1 },
                { label: "VIBRATION", index: 2 },
              ].map(({ label, index }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      color: "#ffffff",
                      fontWeight: 900,
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {label}
                  </span>
                  <button
                    onClick={() => {
                      const next = [...toggleStates];
                      next[index] = !next[index];
                      setToggleStates(next);
                    }}
                    style={{
                      position: "relative",
                      width: 64,
                      height: 28,
                      border: "4px solid #ffffff",
                      borderRadius: 0,
                      backgroundColor: toggleStates[index] ? "#00e436" : "#ff004d",
                      cursor: "pointer",
                      transition: "none",
                      padding: 0,
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        top: 0,
                        left: toggleStates[index] ? 36 : 0,
                        width: 24,
                        height: 24,
                        backgroundColor: "#ffffff",
                        transition: "none",
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "0.5rem",
                        fontWeight: 900,
                        color: "#ffffff",
                        left: toggleStates[index] ? 4 : "auto",
                        right: toggleStates[index] ? "auto" : 4,
                        fontFamily: "'Courier New', monospace",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {toggleStates[index] ? "ON" : "OFF"}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </RevealBlock>
      </Section>

      {/* ================================================================
          SECTION 8 — Philosophy / about section
      ================================================================ */}
      <Section
        title="PHILOSOPHY"
        subtitle="THE PIXEL ART ETHOS"
        dark={false}
        accentColor="#29adff"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {[
            {
              icon: "■",
              color: "#ff004d",
              title: "PIXEL PERFECT",
              body:
                "Every element aligns to the pixel grid. No sub-pixel rendering. No anti-aliasing. Hard edges only.",
            },
            {
              icon: "◆",
              color: "#00e436",
              title: "STATE MACHINE",
              body:
                "UI runs on a state machine, not an animation engine. All transitions are instantaneous hard cuts.",
            },
            {
              icon: "★",
              color: "#ffec27",
              title: "LIMITED PALETTE",
              body:
                "16 colors maximum. PICO-8 inspired. Every color choice is deliberate, no gradients allowed.",
            },
            {
              icon: "♥",
              color: "#29adff",
              title: "NOSTALGIA CODED",
              body:
                "Every interaction echoes classic games. The aesthetic is constraint turned into identity.",
            },
          ].map(({ icon, color, title, body }, i) => (
            <RevealBlock key={title} delay={i * 0.08}>
              <div
                style={{
                  padding: 24,
                  backgroundColor: "#0f0f1e",
                  border: `4px solid ${color}`,
                  boxShadow: `4px 4px 0 ${color}`,
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    color,
                    marginBottom: 12,
                    textShadow: `2px 2px 0 #000000`,
                  }}
                >
                  {icon}
                </div>
                <h3
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 900,
                    color: "#ffffff",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: 10,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: "0.7rem",
                    color: "#c2c3c7",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    lineHeight: 1.6,
                  }}
                >
                  {body}
                </p>
              </div>
            </RevealBlock>
          ))}
        </div>
      </Section>

      {/* ================================================================
          SECTION 9 — Achievement badges / tags
      ================================================================ */}
      <Section
        title="BADGES"
        subtitle="ACHIEVEMENTS AND ITEM TAGS"
        dark={true}
        accentColor="#ffec27"
      >
        <RevealBlock>
          <div
            style={{
              backgroundColor: "#0f0f1e",
              border: "4px solid #ffffff",
              padding: 32,
              boxShadow: "8px 8px 0 #ff004d",
              marginBottom: 24,
            }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                color: "#29adff",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginBottom: 16,
              }}
            >
              ITEM RARITY TAGS
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { label: "COMMON",    bg: "#5f574f", color: "#ffffff" },
                { label: "UNCOMMON",  bg: "#00e436", color: "#ffffff" },
                { label: "RARE",      bg: "#29adff", color: "#ffffff" },
                { label: "EPIC",      bg: "#7e2553", color: "#ffffff" },
                { label: "LEGENDARY", bg: "#ffec27", color: "#1a1c2c" },
                { label: "GODLIKE",   bg: "#ff004d", color: "#ffffff" },
              ].map(({ label, bg, color }) => (
                <span
                  key={label}
                  style={{
                    padding: "8px 14px",
                    backgroundColor: bg,
                    border: "4px solid #1a1c2c",
                    color,
                    fontSize: "0.65rem",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    boxShadow: "2px 2px 0 #1a1c2c",
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </RevealBlock>

        <RevealBlock delay={0.1}>
          <div
            style={{
              backgroundColor: "#0f0f1e",
              border: "4px solid #ffffff",
              padding: 32,
              boxShadow: "8px 8px 0 #00e436",
            }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                color: "#29adff",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginBottom: 16,
              }}
            >
              ACHIEVEMENT BADGES
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                alignItems: "center",
              }}
            >
              {[
                { label: "1",    bg: "#ff004d", size: 40 },
                { label: "★",    bg: "#ffec27", size: 48, color: "#1a1c2c" },
                { label: "PRO",  bg: "#00e436", size: 40 },
                { label: "MAX",  bg: "#7e2553", size: 40 },
                { label: "99",   bg: "#1a1c2c", border: "#29adff", size: 40, color: "#29adff" },
                { label: "NEW!", bg: "#ffa300", size: 40, color: "#1a1c2c" },
              ].map(({ label, bg, size, color = "#ffffff", border = "#ffffff" }) => (
                <div
                  key={label}
                  style={{
                    width: size,
                    height: size,
                    backgroundColor: bg,
                    border: `4px solid ${border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: size > 44 ? "1.1rem" : "0.65rem",
                    color,
                    boxShadow: "2px 2px 0 #000000",
                    letterSpacing: "0.05em",
                  }}
                >
                  {label}
                </div>
              ))}

              {/* Group avatars */}
              <div style={{ display: "flex", marginLeft: 8 }}>
                {["A", "B", "C"].map((letter, i) => (
                  <div
                    key={letter}
                    style={{
                      width: 44,
                      height: 44,
                      backgroundColor: ["#ff004d", "#00e436", "#ffec27"][i],
                      border: "4px solid #ffffff",
                      marginLeft: i === 0 ? 0 : -8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      color: i === 2 ? "#1a1c2c" : "#ffffff",
                      fontSize: "0.8rem",
                      zIndex: 3 - i,
                      position: "relative",
                    }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealBlock>
      </Section>

      {/* ================================================================
          SECTION 10 — Footer with pixel art decoration
      ================================================================ */}
      <footer
        style={{
          backgroundColor: "#1a1c2c",
          borderTop: "4px solid #ff004d",
          padding: "48px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
          }}
        >
          {/* Pixel sprite row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 48,
              marginBottom: 40,
              flexWrap: "wrap",
            }}
          >
            <PixelSprite pixels={STAR_PIXELS} pixelSize={6} />
            <PixelSprite pixels={HEART_PIXELS} pixelSize={6} />
            <PixelSprite pixels={COIN_PIXELS} pixelSize={6} />
          </div>

          {/* Pixel divider */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              marginBottom: 32,
              flexWrap: "wrap",
            }}
          >
            {["#ff004d", "#ffa300", "#ffec27", "#00e436", "#29adff", "#7e2553", "#ff77a8", "#ff004d"].map(
              (color, i) => (
                <div
                  key={i}
                  style={{
                    width: 24,
                    height: 8,
                    backgroundColor: color,
                    imageRendering: "pixelated",
                  }}
                />
              )
            )}
          </div>

          {/* Footer content */}
          <div
            style={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "#ff004d",
                  border: "3px solid #ffec27",
                  boxShadow: "3px 3px 0 #ffec27",
                }}
              />
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 900,
                  color: "#ffec27",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  textShadow: "3px 3px 0 #ff004d",
                }}
              >
                PIXEL ART
              </span>
              <div
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "#ff004d",
                  border: "3px solid #ffec27",
                  boxShadow: "3px 3px 0 #ffec27",
                }}
              />
            </div>

            <p
              style={{
                fontSize: "0.65rem",
                color: "#29adff",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              PART OF{" "}
              <Link
                href="/"
                style={{
                  color: "#ffec27",
                  textDecoration: "none",
                  fontWeight: 900,
                }}
              >
                STYLEKIT
              </Link>
            </p>

            <p
              style={{
                fontSize: "0.6rem",
                color: "#5f574f",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              8-BIT RETRO GAMING AESTHETICS — PICO-8 PALETTE
            </p>

            <p
              style={{
                fontSize: "0.6rem",
                color: "#5f574f",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              © 2026 STYLEKIT. INSERT COIN TO CONTINUE.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
