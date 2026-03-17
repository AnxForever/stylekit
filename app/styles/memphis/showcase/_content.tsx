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
/*  Memphis color constants                                             */
/* ------------------------------------------------------------------ */

const C = {
  red: "#ff6b6b",
  yellow: "#feca57",
  cyan: "#48dbfb",
  pink: "#ff9ff3",
  green: "#1dd1a1",
  purple: "#5f27cd",
  black: "#000000",
};

/* ------------------------------------------------------------------ */
/*  Inline SVG geometric accents                                        */
/* ------------------------------------------------------------------ */

function CircleDecor({
  size = 24,
  color = C.red,
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        border: "2px solid #000",
        flexShrink: 0,
      }}
    />
  );
}

function TriangleDecor({
  size = 20,
  color = C.cyan,
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <polygon
        points="10,2 18,18 2,18"
        fill={color}
        stroke="#000"
        strokeWidth="2"
      />
    </svg>
  );
}

function DiamondDecor({
  size = 20,
  color = C.pink,
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="14"
        height="14"
        fill={color}
        stroke="#000"
        strokeWidth="2"
        transform="rotate(45 10 10)"
      />
    </svg>
  );
}

function StarDecor({
  size = 22,
  color = C.yellow,
  className = "",
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      aria-hidden="true"
    >
      <polygon
        points="11,2 13.5,8.5 20,9.5 15,14 16.5,21 11,17.5 5.5,21 7,14 2,9.5 8.5,8.5"
        fill={color}
        stroke="#000"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function WaveLine({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="120"
      height="24"
      viewBox="0 0 120 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 12 Q15 4 30 12 T60 12 T90 12 T120 12"
        stroke="#000"
        strokeWidth="2.5"
        fill="none"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const paletteSwatches = [
  { name: "Hot Red", hex: C.red, label: "Primary" },
  { name: "Pop Yellow", hex: C.yellow, label: "Secondary" },
  { name: "Cyber Cyan", hex: C.cyan, label: "Accent 1" },
  { name: "Neon Pink", hex: C.pink, label: "Accent 2" },
  { name: "Retro Green", hex: C.green, label: "Accent 3" },
  { name: "Deep Purple", hex: C.purple, label: "Accent 4" },
];

type ComponentTab = "buttons" | "cards" | "inputs" | "badges";

const projectCards = [
  {
    title: "Brand Identity",
    desc: "Loud, bold, geometric. Let your brand shout from every pixel.",
    bg: C.yellow,
    accent: C.red,
    geo: "circle",
    rotationClass: "-rotate-1",
  },
  {
    title: "Event Poster",
    desc: "Clashing colors and pattern chaos make every event unmissable.",
    bg: C.cyan,
    accent: C.purple,
    geo: "triangle",
    rotationClass: "rotate-1",
  },
  {
    title: "App UI",
    desc: "Playful interfaces that make users smile on every interaction.",
    bg: C.pink,
    accent: C.green,
    geo: "diamond",
    rotationClass: "-rotate-1",
  },
  {
    title: "Editorial Layout",
    desc: "Break the grid. Asymmetry and tension is the Memphis signature.",
    bg: C.green,
    accent: C.red,
    geo: "star",
    rotationClass: "rotate-2",
  },
];

const patternStripes = `repeating-linear-gradient(
  45deg,
  transparent,
  transparent 8px,
  rgba(0,0,0,0.12) 8px,
  rgba(0,0,0,0.12) 10px
)`;

const patternDots = `radial-gradient(#000 1.5px, transparent 1.5px)`;

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);
  const [pressedBtn, setPressedBtn] = useState<string | null>(null);

  // Playful Chaos — card hover state tracking
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Pop Swap demo state
  const [popSwapHovered, setPopSwapHovered] = useState(false);

  // Toy Button Physics — track which button is active
  const [toyBtnActive, setToyBtnActive] = useState(false);

  // Snappy Motion comparison
  const [snappyMode, setSnappyMode] = useState<"snappy" | "slow" | null>(null);

  // Playful Chaos demo grid
  const [chaosHovered, setChaosHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "#fffbe6", fontFamily: "system-ui, sans-serif" }}
    >
      <style>{`
        @keyframes memphis-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes memphis-spin-rev {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes memphis-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes memphis-shake {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-5deg); }
          40% { transform: rotate(5deg); }
          60% { transform: rotate(-3deg); }
          80% { transform: rotate(3deg); }
        }
        @keyframes memphis-strobe {
          0%, 49% { background-color: ${C.yellow}; }
          50%, 100% { background-color: ${C.pink}; }
        }
        @keyframes memphis-march {
          from { background-position: 0 0; }
          to { background-position: 20px 20px; }
        }
        .memphis-spin-slow { animation: memphis-spin 8s linear infinite; }
        .memphis-spin-rev-slow { animation: memphis-spin-rev 12s linear infinite; }
        .memphis-bounce-anim { animation: memphis-bounce 1.4s ease-in-out infinite; }
        .memphis-shake-anim { animation: memphis-shake 0.5s ease-in-out; }
        .memphis-march-anim { animation: memphis-march 1s linear infinite; }

        /* Snappy motion helper */
        .duration-snappy { transition-duration: 150ms !important; transition-timing-function: ease-out !important; }
        .duration-slow { transition-duration: 800ms !important; transition-timing-function: ease !important; }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                     */}
      {/* ================================================================ */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: C.yellow,
          borderBottom: "4px solid #000",
          boxShadow: "0 4px 0 #000",
        }}
      >
        <div
          style={{
            maxWidth: 1152,
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px",
              backgroundColor: C.red,
              border: "3px solid #000",
              boxShadow: "3px 3px 0 #000",
            }}
          >
            <CircleDecor size={14} color={C.cyan} />
            <span style={{ fontWeight: 900, color: "#fff", fontSize: 15, letterSpacing: 1 }}>
              MEMPHIS
            </span>
          </div>

          {/* Nav items */}
          <nav style={{ display: "flex", gap: 4, alignItems: "center" }} className="hidden md:flex">
            {["Palette", "Components", "Animations", "App Demo", "Philosophy"].map((item) => (
              <span
                key={item}
                style={{
                  padding: "6px 14px",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  border: "2px solid transparent",
                  transition: "all 150ms ease-out",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "#000";
                  el.style.color = C.yellow;
                  el.style.border = "2px solid #000";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "transparent";
                  el.style.color = "#000";
                  el.style.border = "2px solid transparent";
                }}
              >
                {item}
              </span>
            ))}
          </nav>

          {/* Back link */}
          <Link
            href="/styles/memphis"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 18px",
              backgroundColor: C.purple,
              border: "3px solid #000",
              boxShadow: "4px 4px 0 #000",
              color: "#fff",
              fontWeight: 900,
              fontSize: 13,
              textDecoration: "none",
              transition: "all 150ms ease-out",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = C.pink;
              el.style.boxShadow = "6px 6px 0 #000";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = C.purple;
              el.style.boxShadow = "4px 4px 0 #000";
            }}
          >
            <span>&#8592;</span>
            <span>Back to Docs</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO                                                          */}
      {/* ================================================================ */}
      <section
        style={{
          position: "relative",
          paddingTop: 100,
          paddingBottom: 80,
          paddingLeft: 20,
          paddingRight: 20,
          overflow: "hidden",
          background: `linear-gradient(135deg, ${C.yellow} 0%, ${C.pink} 50%, ${C.cyan} 100%)`,
          borderBottom: "4px solid #000",
        }}
      >
        {/* Scattered geometric background decorations */}
        <div style={{ position: "absolute", top: 24, left: 40 }}>
          <CircleDecor size={52} color={C.red} className="memphis-bounce-anim" />
        </div>
        <div style={{ position: "absolute", top: 80, right: 60 }}>
          <DiamondDecor size={48} color={C.purple} className="memphis-spin-slow" />
        </div>
        <div style={{ position: "absolute", bottom: 40, left: 120 }}>
          <TriangleDecor size={44} color={C.green} className="memphis-spin-rev-slow" />
        </div>
        <div style={{ position: "absolute", bottom: 60, right: 100 }}>
          <StarDecor size={50} color={C.yellow} className="memphis-bounce-anim" />
        </div>
        <div style={{ position: "absolute", top: 160, left: "35%" }}>
          <CircleDecor size={20} color={C.cyan} />
        </div>
        <div style={{ position: "absolute", top: 40, left: "55%" }}>
          <TriangleDecor size={28} color={C.red} />
        </div>
        <div style={{ position: "absolute", bottom: 20, left: "65%" }}>
          <DiamondDecor size={26} color={C.yellow} />
        </div>

        {/* Dot pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: patternDots,
            backgroundSize: "20px 20px",
            opacity: 0.06,
            pointerEvents: "none",
          }}
        />

        {/* Hero content */}
        <div
          style={{
            maxWidth: 1152,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
          }}
        >
          {/* Eyebrow badge */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0s",
              marginBottom: 24,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 18px",
                backgroundColor: "#000",
                color: C.yellow,
                fontWeight: 900,
                fontSize: 12,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                border: "3px solid #000",
                boxShadow: "4px 4px 0 " + C.red,
              }}
            >
              <CircleDecor size={8} color={C.red} />
              孟菲斯设计风格 — Memphis
              <CircleDecor size={8} color={C.cyan} />
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(52px, 9vw, 108px)",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-2px",
              color: "#000",
              marginBottom: 16,
              textShadow: `5px 5px 0 ${C.red}, 10px 10px 0 ${C.cyan}`,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            BREAK
            <br />
            THE RULES.
          </h1>

          {/* Sub */}
          <p
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#000",
              maxWidth: 520,
              margin: "0 auto 32px",
              lineHeight: 1.5,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            80s Italian design rebellion. Bold geometry, clashing colors,
            irregular shapes — design should be fun, loud, and unapologetic.
          </p>

          {/* CTA buttons */}
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 60,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            {/* Primary — Toy Button Physics */}
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                backgroundColor: C.yellow,
                border: "4px solid #000",
                boxShadow: pressedBtn === "hero-primary" ? "0 0 0 #000" : "6px 6px 0 #000",
                fontWeight: 900,
                fontSize: 16,
                textTransform: "uppercase",
                cursor: "pointer",
                transform: pressedBtn === "hero-primary" ? "translate(6px, 6px)" : "translate(0,0)",
                transition: "all 150ms ease-out",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = C.pink;
                (e.currentTarget as HTMLElement).style.boxShadow = "8px 8px 0 #000";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = C.yellow;
                if (pressedBtn !== "hero-primary") {
                  (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0 #000";
                }
              }}
              onMouseDown={() => setPressedBtn("hero-primary")}
              onMouseUp={() => setPressedBtn(null)}
            >
              <CircleDecor size={10} color={C.red} />
              Explore Memphis
            </button>

            {/* Secondary */}
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 32px",
                backgroundColor: "#fff",
                border: "4px solid #000",
                boxShadow: "6px 6px 0 #000",
                fontWeight: 900,
                fontSize: 16,
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 150ms ease-out",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = C.cyan;
                (e.currentTarget as HTMLElement).style.boxShadow = "8px 8px 0 #000";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#fff";
                (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0 #000";
              }}
            >
              <TriangleDecor size={14} color={C.purple} />
              View Components
            </button>
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
              maxWidth: 800,
              margin: "0 auto",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            {[
              { value: "1980s", label: "Italian Origin", bg: C.red },
              { value: "∞", label: "Color Combos", bg: C.purple },
              { value: "100%", label: "Fun Guaranteed", bg: C.green },
              { value: "0", label: "Boring Allowed", bg: C.cyan },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  backgroundColor: stat.bg,
                  border: "3px solid #000",
                  boxShadow: "4px 4px 0 #000",
                  padding: "16px 8px",
                  textAlign: "center",
                  cursor: "default",
                  transition: "all 150ms ease-out",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0 #000";
                  (e.currentTarget as HTMLElement).style.transform = "translate(-1px, -1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0 #000";
                  (e.currentTarget as HTMLElement).style.transform = "translate(0, 0)";
                }}
              >
                <div style={{ fontSize: 26, fontWeight: 900, color: "#fff", textShadow: "2px 2px 0 rgba(0,0,0,0.3)" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section style={{ padding: "80px 20px", backgroundColor: "#fff", borderBottom: "4px solid #000" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <RevealBlock className="mb-4">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <WaveLine />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: C.red,
                }}
              >
                Palette
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 900,
                color: "#000",
                lineHeight: 1.05,
                letterSpacing: "-1px",
                textShadow: `3px 3px 0 ${C.yellow}`,
              }}
            >
              SIX BOLD COLORS
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p style={{ fontSize: 17, fontWeight: 600, color: "#333", maxWidth: 500, lineHeight: 1.6 }}>
              High-saturation clashing hues straight from the 1980s Italian design scene.
              Every color fights for attention — and that is the point.
            </p>
          </RevealBlock>

          {/* Swatch row */}
          <RevealBlock delay={0.1}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                marginBottom: 48,
              }}
            >
              {paletteSwatches.map((swatch, i) => (
                <div
                  key={swatch.name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    cursor: "pointer",
                  }}
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    style={{
                      width: 88,
                      height: 88,
                      backgroundColor: swatch.hex,
                      border: "4px solid #000",
                      boxShadow:
                        hoveredSwatch === i
                          ? "8px 8px 0 #000"
                          : "4px 4px 0 #000",
                      transform:
                        hoveredSwatch === i
                          ? "translate(-2px, -2px)"
                          : "translate(0, 0)",
                      transition: "all 150ms ease-out",
                    }}
                  />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 13, fontWeight: 800, color: "#000" }}>
                      {swatch.name}
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#555", fontFamily: "monospace", marginTop: 2 }}>
                      {swatch.hex}
                    </div>
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: 4,
                        padding: "2px 8px",
                        backgroundColor: swatch.hex,
                        border: "2px solid #000",
                        fontSize: 10,
                        fontWeight: 800,
                        color: "#000",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {swatch.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Pattern sampler */}
          <RevealBlock delay={0.2}>
            <div
              style={{
                border: "4px solid #000",
                boxShadow: "8px 8px 0 #000",
                padding: 32,
                backgroundColor: "#fffbe6",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#555",
                  marginBottom: 20,
                }}
              >
                Memphis pattern library
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 16,
                }}
              >
                {[
                  {
                    label: "Diagonal Stripes",
                    bg: patternStripes,
                    bgColor: C.yellow,
                  },
                  {
                    label: "Dot Grid",
                    bg: patternDots,
                    bgColor: C.cyan,
                    bgSize: "16px 16px",
                  },
                  {
                    label: "Color Block",
                    bg: `linear-gradient(90deg, ${C.red} 33%, ${C.yellow} 33%, ${C.yellow} 66%, ${C.purple} 66%)`,
                    bgColor: "transparent",
                  },
                ].map((p) => (
                  <div key={p.label}>
                    <div
                      style={{
                        height: 72,
                        backgroundColor: p.bgColor,
                        backgroundImage: p.bg,
                        backgroundSize: p.bgSize ?? "auto",
                        border: "3px solid #000",
                        boxShadow: "3px 3px 0 #000",
                        marginBottom: 8,
                        transition: "all 150ms ease-out",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "5px 5px 0 #000";
                        (e.currentTarget as HTMLElement).style.transform = "translate(-1px,-1px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0 #000";
                        (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                      }}
                    />
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#555", textAlign: "center" }}>
                      {p.label}
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
      <section
        style={{
          padding: "80px 20px",
          backgroundColor: C.cyan,
          borderBottom: "4px solid #000",
          backgroundImage: patternStripes,
        }}
      >
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <RevealBlock className="mb-4">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <TriangleDecor size={22} color={C.red} />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#000",
                }}
              >
                Components
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 900,
                color: "#000",
                lineHeight: 1.05,
                letterSpacing: "-1px",
                textShadow: `3px 3px 0 ${C.red}`,
              }}
            >
              BUILDING BLOCKS
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p style={{ fontSize: 17, fontWeight: 600, color: "#000", maxWidth: 500, lineHeight: 1.6 }}>
              Each component is thick-bordered, hard-shadowed, and ready to clash.
              Pop Swap color transitions on every hover state.
            </p>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-6">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {(["buttons", "cards", "inputs", "badges"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "10px 22px",
                    fontWeight: 900,
                    fontSize: 13,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    border: "3px solid #000",
                    boxShadow: activeTab === tab ? "0 0 0 #000" : "4px 4px 0 #000",
                    transform: activeTab === tab ? "translate(4px, 4px)" : "translate(0, 0)",
                    backgroundColor: activeTab === tab ? "#000" : C.yellow,
                    color: activeTab === tab ? C.yellow : "#000",
                    transition: "all 150ms ease-out",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.15}>
            <div
              style={{
                backgroundColor: "#fff",
                border: "4px solid #000",
                boxShadow: "8px 8px 0 #000",
                padding: "40px 40px",
              }}
            >
              {/* ---- BUTTONS TAB ---- */}
              {activeTab === "buttons" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                  {/* Primary buttons */}
                  <div>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 900,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#555",
                        marginBottom: 16,
                      }}
                    >
                      Primary — Toy Button Physics + Pop Swap
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
                      {[
                        { label: "Click Me!", bg: C.yellow, hoverBg: C.pink, shadowColor: "#000" },
                        { label: "Go Bold!", bg: C.red, hoverBg: C.cyan, shadowColor: "#000" },
                        { label: "Memphis!", bg: C.purple, hoverBg: C.green, shadowColor: "#000" },
                      ].map(({ label, bg, hoverBg }) => {
                        const id = `btn-${label}`;
                        return (
                          <button
                            key={label}
                            style={{
                              position: "relative",
                              padding: "14px 28px",
                              backgroundColor: pressedBtn === id ? hoverBg : bg,
                              border: "4px solid #000",
                              boxShadow:
                                pressedBtn === id
                                  ? "0 0 0 #000"
                                  : "6px 6px 0 #000",
                              fontWeight: 900,
                              fontSize: 15,
                              textTransform: "uppercase",
                              color: "#000",
                              cursor: "pointer",
                              transform:
                                pressedBtn === id
                                  ? "translate(6px, 6px)"
                                  : "translate(0, 0)",
                              transition: "all 150ms ease-out",
                            }}
                            onMouseEnter={(e) => {
                              if (pressedBtn !== id) {
                                (e.currentTarget as HTMLElement).style.backgroundColor = hoverBg;
                                (e.currentTarget as HTMLElement).style.boxShadow = "8px 8px 0 #000";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (pressedBtn !== id) {
                                (e.currentTarget as HTMLElement).style.backgroundColor = bg;
                                (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0 #000";
                              }
                            }}
                            onMouseDown={() => setPressedBtn(id)}
                            onMouseUp={() => setPressedBtn(null)}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Outline + icon buttons */}
                  <div>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 900,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#555",
                        marginBottom: 16,
                      }}
                    >
                      With geometric accents
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
                      <button
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "12px 24px",
                          backgroundColor: C.cyan,
                          border: "4px solid #000",
                          boxShadow: "6px 6px 0 #000",
                          fontWeight: 900,
                          fontSize: 14,
                          textTransform: "uppercase",
                          cursor: "pointer",
                          transition: "all 150ms ease-out",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.backgroundColor = C.pink;
                          el.style.boxShadow = "8px 8px 0 #000";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.backgroundColor = C.cyan;
                          el.style.boxShadow = "6px 6px 0 #000";
                        }}
                      >
                        <CircleDecor size={12} color={C.red} />
                        Circle
                      </button>

                      <button
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "12px 24px",
                          backgroundColor: C.green,
                          border: "4px solid #000",
                          boxShadow: "6px 6px 0 #000",
                          fontWeight: 900,
                          fontSize: 14,
                          textTransform: "uppercase",
                          cursor: "pointer",
                          transition: "all 150ms ease-out",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.backgroundColor = C.yellow;
                          el.style.boxShadow = "8px 8px 0 #000";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.backgroundColor = C.green;
                          el.style.boxShadow = "6px 6px 0 #000";
                        }}
                      >
                        <TriangleDecor size={14} color={C.purple} />
                        Triangle
                      </button>

                      <button
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "12px 24px",
                          backgroundColor: "#000",
                          border: "4px solid #000",
                          boxShadow: `6px 6px 0 ${C.yellow}`,
                          fontWeight: 900,
                          fontSize: 14,
                          textTransform: "uppercase",
                          color: "#fff",
                          cursor: "pointer",
                          transition: "all 150ms ease-out",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.boxShadow = `8px 8px 0 ${C.red}`;
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.boxShadow = `6px 6px 0 ${C.yellow}`;
                        }}
                      >
                        <StarDecor size={14} color={C.yellow} />
                        Star
                      </button>
                    </div>
                  </div>

                  {/* Size variants */}
                  <div>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 900,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#555",
                        marginBottom: 16,
                      }}
                    >
                      Size variants
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
                      {[
                        { size: "SM", padding: "8px 16px", fontSize: 11, shadow: "3px 3px 0 #000" },
                        { size: "MD", padding: "12px 24px", fontSize: 14, shadow: "5px 5px 0 #000" },
                        { size: "LG", padding: "18px 36px", fontSize: 17, shadow: "7px 7px 0 #000" },
                      ].map(({ size, padding, fontSize, shadow }) => (
                        <button
                          key={size}
                          style={{
                            padding,
                            backgroundColor: C.yellow,
                            border: "4px solid #000",
                            boxShadow: shadow,
                            fontWeight: 900,
                            fontSize,
                            textTransform: "uppercase",
                            cursor: "pointer",
                            transition: "all 150ms ease-out",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = C.pink;
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.backgroundColor = C.yellow;
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---- CARDS TAB ---- */}
              {activeTab === "cards" && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: 20,
                  }}
                >
                  {projectCards.map((card, i) => (
                    <div
                      key={card.title}
                      className={`group ${card.rotationClass}`}
                      style={{
                        position: "relative",
                        padding: 28,
                        backgroundColor: card.bg,
                        border: "4px solid #000",
                        boxShadow:
                          hoveredCard === i
                            ? "12px 12px 0 #000"
                            : "8px 8px 0 #000",
                        transform:
                          hoveredCard === i
                            ? "translate(-2px, -2px)"
                            : "translate(0, 0)",
                        cursor: "pointer",
                        transition: "all 200ms ease-out",
                      }}
                      onMouseEnter={() => setHoveredCard(i)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Playful Chaos — each shape moves independently */}
                      <div
                        style={{
                          position: "absolute",
                          top: -16,
                          left: -16,
                          transition: "transform 200ms ease-out",
                          transform:
                            hoveredCard === i
                              ? "translate(16px, -8px)"
                              : "translate(0, 0)",
                        }}
                      >
                        <CircleDecor size={32} color={card.accent} />
                      </div>
                      <div
                        style={{
                          position: "absolute",
                          bottom: -12,
                          right: -12,
                          transition: "transform 200ms ease-out",
                          transform:
                            hoveredCard === i
                              ? "translate(-8px, 8px) rotate(20deg)"
                              : "translate(0, 0) rotate(0deg)",
                        }}
                      >
                        <TriangleDecor size={28} color="#000" />
                      </div>

                      <h4
                        style={{
                          fontSize: 20,
                          fontWeight: 900,
                          color: "#000",
                          marginBottom: 8,
                          marginTop: 12,
                          textTransform: "uppercase",
                          letterSpacing: "-0.5px",
                          transition: "color 150ms ease-out",
                        }}
                      >
                        {card.title}
                      </h4>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#000",
                          lineHeight: 1.5,
                          opacity: 0.8,
                        }}
                      >
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* ---- INPUTS TAB ---- */}
              {activeTab === "inputs" && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: 24,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 12,
                          fontWeight: 900,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "#000",
                          marginBottom: 8,
                        }}
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="Type loudly..."
                        style={{
                          width: "100%",
                          padding: "12px 18px",
                          backgroundColor: "#fff",
                          border: "4px solid #000",
                          boxShadow: `4px 4px 0 ${C.cyan}`,
                          fontWeight: 700,
                          fontSize: 14,
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                        onFocus={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${C.red}`;
                        }}
                        onBlur={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${C.cyan}`;
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 12,
                          fontWeight: 900,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "#000",
                          marginBottom: 8,
                        }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="hello@memphis.design"
                        style={{
                          width: "100%",
                          padding: "12px 18px",
                          backgroundColor: "#fff",
                          border: "4px solid #000",
                          boxShadow: `4px 4px 0 ${C.yellow}`,
                          fontWeight: 700,
                          fontSize: 14,
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                        onFocus={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${C.red}`;
                        }}
                        onBlur={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${C.yellow}`;
                        }}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 12,
                          fontWeight: 900,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "#000",
                          marginBottom: 8,
                        }}
                      >
                        Message
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Say it BOLDLY..."
                        style={{
                          width: "100%",
                          padding: "12px 18px",
                          backgroundColor: "#fff",
                          border: "4px solid #000",
                          boxShadow: `4px 4px 0 ${C.pink}`,
                          fontWeight: 700,
                          fontSize: 14,
                          outline: "none",
                          resize: "none",
                          boxSizing: "border-box",
                        }}
                        onFocus={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${C.red}`;
                        }}
                        onBlur={(e) => {
                          (e.currentTarget as HTMLElement).style.boxShadow = `4px 4px 0 ${C.pink}`;
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                      <label
                        style={{
                          display: "block",
                          fontSize: 12,
                          fontWeight: 900,
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "#000",
                          marginBottom: 8,
                        }}
                      >
                        Style
                      </label>
                      <select
                        style={{
                          width: "100%",
                          padding: "12px 18px",
                          backgroundColor: "#fff",
                          border: "4px solid #000",
                          boxShadow: `4px 4px 0 ${C.green}`,
                          fontWeight: 700,
                          fontSize: 14,
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      >
                        <option>Loud & Bold</option>
                        <option>Pop Art</option>
                        <option>Retro Clash</option>
                        <option>Full Chaos</option>
                      </select>
                    </div>
                    <button
                      style={{
                        padding: "14px 24px",
                        backgroundColor: C.yellow,
                        border: "4px solid #000",
                        boxShadow: "6px 6px 0 #000",
                        fontWeight: 900,
                        fontSize: 15,
                        textTransform: "uppercase",
                        cursor: "pointer",
                        transition: "all 150ms ease-out",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.backgroundColor = C.pink;
                        el.style.boxShadow = "8px 8px 0 #000";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLElement;
                        el.style.backgroundColor = C.yellow;
                        el.style.boxShadow = "6px 6px 0 #000";
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}

              {/* ---- BADGES TAB ---- */}
              {activeTab === "badges" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                  <div>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 900,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#555",
                        marginBottom: 14,
                      }}
                    >
                      Memphis badges — thick borders, hard shadows
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                      {[
                        { label: "Memphis", bg: C.yellow },
                        { label: "Bold", bg: C.red, color: "#fff" },
                        { label: "Retro", bg: C.purple, color: "#fff" },
                        { label: "Geo", bg: C.cyan },
                        { label: "Pop", bg: C.pink },
                        { label: "80s", bg: C.green },
                        { label: "Clash", bg: "#000", color: C.yellow },
                        { label: "Fun!", bg: C.red, color: "#fff" },
                      ].map((b) => (
                        <span
                          key={b.label}
                          style={{
                            padding: "6px 14px",
                            backgroundColor: b.bg,
                            border: "3px solid #000",
                            boxShadow: "3px 3px 0 #000",
                            fontWeight: 900,
                            fontSize: 12,
                            textTransform: "uppercase",
                            color: b.color ?? "#000",
                            letterSpacing: "0.05em",
                            cursor: "default",
                            transition: "all 150ms ease-out",
                            display: "inline-block",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "translate(-1px,-1px)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "5px 5px 0 #000";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0 #000";
                          }}
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 900,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#555",
                        marginBottom: 14,
                      }}
                    >
                      Status badges with icons
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                      {[
                        { label: "Active", bg: C.green, icon: <CircleDecor size={10} color="#fff" /> },
                        { label: "Bold Move", bg: C.yellow, icon: <StarDecor size={12} color={C.red} /> },
                        { label: "In Progress", bg: C.cyan, icon: <TriangleDecor size={12} color={C.purple} /> },
                        { label: "Chaos Mode", bg: "#000", color: C.yellow, icon: <DiamondDecor size={12} color={C.pink} /> },
                      ].map((b) => (
                        <span
                          key={b.label}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "8px 16px",
                            backgroundColor: b.bg,
                            border: "3px solid #000",
                            boxShadow: "3px 3px 0 #000",
                            fontWeight: 900,
                            fontSize: 12,
                            textTransform: "uppercase",
                            color: b.color ?? "#000",
                            cursor: "default",
                          }}
                        >
                          {b.icon}
                          {b.label}
                        </span>
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
      {/* 5. ANIMATION & INTERACTION RULES — 4 named aiRules demos         */}
      {/* ================================================================ */}
      <section style={{ padding: "80px 20px", backgroundColor: "#fff", borderBottom: "4px solid #000" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <RevealBlock className="mb-4">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <DiamondDecor size={22} color={C.yellow} />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: C.purple,
                }}
              >
                Animation &amp; Interaction Rules
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 900,
                color: "#000",
                lineHeight: 1.05,
                letterSpacing: "-1px",
                textShadow: `3px 3px 0 ${C.cyan}`,
              }}
            >
              4 NAMED RULES
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-12">
            <p style={{ fontSize: 17, fontWeight: 600, color: "#333", maxWidth: 540, lineHeight: 1.6 }}>
              Hover and click each demo to feel the named interaction pattern.
              These four rules are the soul of Memphis interaction design.
            </p>
          </RevealBlock>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 24,
            }}
          >
            {/* ---- Rule 1: Playful Chaos ---- */}
            <RevealBlock delay={0.08}>
              <div
                style={{
                  backgroundColor: C.yellow,
                  border: "4px solid #000",
                  boxShadow: "8px 8px 0 #000",
                  padding: 28,
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    backgroundColor: "#000",
                    color: C.yellow,
                    fontWeight: 900,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 8,
                  }}
                >
                  Playful Chaos
                </div>
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: 11,
                    color: "#555",
                    marginBottom: 20,
                    lineHeight: 1.6,
                  }}
                >
                  group-hover:translate-x-4 group-hover:-translate-y-2<br />
                  group-hover:-translate-x-2 group-hover:rotate-12<br />
                  Each shape moves independently — no uniform direction.
                </p>

                {/* Interactive demo card */}
                <div
                  style={{
                    position: "relative",
                    padding: "28px 20px 20px",
                    backgroundColor: C.pink,
                    border: "4px solid #000",
                    boxShadow: chaosHovered ? "12px 12px 0 #000" : "8px 8px 0 #000",
                    transform: chaosHovered ? "translate(-2px, -2px)" : "translate(0, 0)",
                    cursor: "pointer",
                    transition: "all 200ms ease-out",
                  }}
                  onMouseEnter={() => setChaosHovered(true)}
                  onMouseLeave={() => setChaosHovered(false)}
                >
                  {/* Circle — moves right+up */}
                  <div
                    style={{
                      position: "absolute",
                      top: -18,
                      left: -18,
                      transition: "transform 200ms ease-out",
                      transform: chaosHovered
                        ? "translate(16px, -8px)"
                        : "translate(0, 0)",
                    }}
                  >
                    <CircleDecor size={36} color={C.yellow} />
                  </div>
                  {/* Triangle — moves left+down, rotates */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: -14,
                      right: -14,
                      transition: "transform 200ms ease-out",
                      transform: chaosHovered
                        ? "translate(-8px, 8px) rotate(20deg)"
                        : "translate(0, 0) rotate(0deg)",
                    }}
                  >
                    <TriangleDecor size={34} color={C.cyan} />
                  </div>

                  <h4
                    style={{
                      fontWeight: 900,
                      fontSize: 17,
                      textTransform: "uppercase",
                      marginBottom: 6,
                      transition: "color 150ms ease-out",
                      color: chaosHovered ? "#fff" : "#000",
                    }}
                  >
                    MEMPHIS
                  </h4>
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: 13,
                      color: "#000",
                      opacity: 0.8,
                    }}
                  >
                    {chaosHovered ? "Shapes flying everywhere!" : "Hover — watch the shapes escape"}
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* ---- Rule 2: Toy Button Physics ---- */}
            <RevealBlock delay={0.12}>
              <div
                style={{
                  backgroundColor: C.cyan,
                  border: "4px solid #000",
                  boxShadow: "8px 8px 0 #000",
                  padding: 28,
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    backgroundColor: "#000",
                    color: C.cyan,
                    fontWeight: 900,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 8,
                  }}
                >
                  Toy Button Physics
                </div>
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: 11,
                    color: "#555",
                    marginBottom: 20,
                    lineHeight: 1.6,
                  }}
                >
                  active:translate-x-[6px] active:translate-y-[6px]<br />
                  active:shadow-none<br />
                  Button fully bottoms out — like pressing a toy key.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
                  <button
                    style={{
                      padding: "14px 28px",
                      backgroundColor: toyBtnActive ? C.yellow : C.yellow,
                      border: "4px solid #000",
                      boxShadow: toyBtnActive ? "0 0 0 #000" : "6px 6px 0 #000",
                      fontWeight: 900,
                      fontSize: 16,
                      textTransform: "uppercase",
                      color: "#000",
                      cursor: "pointer",
                      transform: toyBtnActive ? "translate(6px, 6px)" : "translate(0, 0)",
                      transition: "all 150ms ease-out",
                    }}
                    onMouseEnter={(e) => {
                      if (!toyBtnActive) {
                        (e.currentTarget as HTMLElement).style.backgroundColor = C.pink;
                        (e.currentTarget as HTMLElement).style.boxShadow = "8px 8px 0 #000";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!toyBtnActive) {
                        (e.currentTarget as HTMLElement).style.backgroundColor = C.yellow;
                        (e.currentTarget as HTMLElement).style.boxShadow = "6px 6px 0 #000";
                      }
                    }}
                    onMouseDown={() => setToyBtnActive(true)}
                    onMouseUp={() => setToyBtnActive(false)}
                  >
                    PRESS ME!
                  </button>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#333" }}>
                    {toyBtnActive
                      ? "Bottomed out — shadow gone, pressed into the page"
                      : "Click and hold to feel the toy physics"}
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* ---- Rule 3: Pop Swap ---- */}
            <RevealBlock delay={0.16}>
              <div
                style={{
                  backgroundColor: C.red,
                  border: "4px solid #000",
                  boxShadow: "8px 8px 0 #000",
                  padding: 28,
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    backgroundColor: "#000",
                    color: C.red,
                    fontWeight: 900,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 8,
                  }}
                >
                  Pop Swap
                </div>
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.8)",
                    marginBottom: 20,
                    lineHeight: 1.6,
                  }}
                >
                  hover:bg-pink-400<br />
                  transition-colors duration-150<br />
                  Instant color reversal — no gradients, just BOOM.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div
                    style={{
                      padding: "20px 24px",
                      backgroundColor: popSwapHovered ? C.yellow : "#000",
                      border: "4px solid " + (popSwapHovered ? "#000" : C.yellow),
                      cursor: "pointer",
                      transition: "background-color 150ms ease-out, border-color 150ms ease-out",
                    }}
                    onMouseEnter={() => setPopSwapHovered(true)}
                    onMouseLeave={() => setPopSwapHovered(false)}
                  >
                    <span
                      style={{
                        fontWeight: 900,
                        fontSize: 20,
                        textTransform: "uppercase",
                        color: popSwapHovered ? "#000" : C.yellow,
                        transition: "color 150ms ease-out",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {popSwapHovered ? "POP!" : "HOVER ME"}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>
                    {popSwapHovered
                      ? "Instant swap — no fade, just BANG"
                      : "Hover to trigger the pop color swap"}
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* ---- Rule 4: Snappy Motion ---- */}
            <RevealBlock delay={0.2}>
              <div
                style={{
                  backgroundColor: C.purple,
                  border: "4px solid #000",
                  boxShadow: "8px 8px 0 #000",
                  padding: 28,
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "4px 12px",
                    backgroundColor: "#000",
                    color: C.purple,
                    fontWeight: 900,
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: 8,
                  }}
                >
                  Snappy Motion
                </div>
                <p
                  style={{
                    fontFamily: "monospace",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.8)",
                    marginBottom: 20,
                    lineHeight: 1.6,
                  }}
                >
                  duration-150 ease-out<br />
                  All animations — no exceptions.<br />
                  Pop toy snap — vs slow/sluggish.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {/* Snappy row */}
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <span style={{ fontSize: 11, fontWeight: 700, color: C.yellow, textTransform: "uppercase" }}>
                        Snappy (150ms)
                      </span>
                      <button
                        style={{
                          padding: "4px 12px",
                          backgroundColor: C.yellow,
                          border: "2px solid #000",
                          fontWeight: 900,
                          fontSize: 11,
                          cursor: "pointer",
                          textTransform: "uppercase",
                        }}
                        onClick={() =>
                          setSnappyMode(snappyMode === "snappy" ? null : "snappy")
                        }
                      >
                        GO
                      </button>
                    </div>
                    <div
                      style={{
                        position: "relative",
                        height: 36,
                        backgroundColor: "rgba(0,0,0,0.3)",
                        border: "2px solid #000",
                        borderRadius: 0,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: 4,
                          width: 28,
                          height: 28,
                          backgroundColor: C.yellow,
                          border: "2px solid #000",
                          transform: `translateY(-50%) translateX(${snappyMode === "snappy" ? "120px" : "0px"})`,
                          transition:
                            snappyMode === "snappy"
                              ? "transform 150ms ease-out"
                              : "none",
                        }}
                      />
                    </div>
                  </div>

                  {/* Slow row */}
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>
                        Slow (800ms)
                      </span>
                      <button
                        style={{
                          padding: "4px 12px",
                          backgroundColor: "rgba(255,255,255,0.2)",
                          border: "2px solid #000",
                          fontWeight: 900,
                          fontSize: 11,
                          cursor: "pointer",
                          textTransform: "uppercase",
                          color: "#fff",
                        }}
                        onClick={() =>
                          setSnappyMode(snappyMode === "slow" ? null : "slow")
                        }
                      >
                        GO
                      </button>
                    </div>
                    <div
                      style={{
                        position: "relative",
                        height: 36,
                        backgroundColor: "rgba(0,0,0,0.2)",
                        border: "2px solid rgba(0,0,0,0.4)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: 4,
                          width: 28,
                          height: 28,
                          backgroundColor: "rgba(255,255,255,0.4)",
                          border: "2px solid rgba(0,0,0,0.3)",
                          transform: `translateY(-50%) translateX(${snappyMode === "slow" ? "120px" : "0px"})`,
                          transition:
                            snappyMode === "slow"
                              ? "transform 800ms ease"
                              : "none",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. MEMPHIS APP UI DEMO — Creative Studio Kanban                  */}
      {/* ================================================================ */}
      <section
        style={{
          padding: "80px 20px",
          backgroundColor: C.yellow,
          borderBottom: "4px solid #000",
          backgroundImage: patternDots,
          backgroundSize: "18px 18px",
        }}
      >
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <RevealBlock className="mb-4">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <StarDecor size={22} color={C.red} />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#000",
                }}
              >
                App Demo
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 900,
                color: "#000",
                lineHeight: 1.05,
                letterSpacing: "-1px",
                textShadow: `3px 3px 0 ${C.red}`,
              }}
            >
              STUDIO KANBAN
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-10">
            <p style={{ fontSize: 17, fontWeight: 600, color: "#000", maxWidth: 500, lineHeight: 1.6 }}>
              A mock creative studio project board — hard borders, pop colors,
              geometric cards. Playful Chaos on every card hover.
            </p>
          </RevealBlock>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {[
              {
                col: "Backlog",
                colBg: C.purple,
                tasks: [
                  { title: "Brand Moodboard", tag: "Design", tagBg: C.pink },
                  { title: "Color System", tag: "System", tagBg: C.cyan },
                ],
              },
              {
                col: "In Progress",
                colBg: C.red,
                tasks: [
                  { title: "Logo Concepts", tag: "Branding", tagBg: C.yellow },
                  { title: "Pattern Library", tag: "Assets", tagBg: C.green },
                  { title: "Hero Animation", tag: "Motion", tagBg: C.purple, color: "#fff" },
                ],
              },
              {
                col: "Review",
                colBg: C.cyan,
                tasks: [
                  { title: "Typography Scale", tag: "Type", tagBg: C.red, color: "#fff" },
                  { title: "Component Set", tag: "UI", tagBg: C.yellow },
                ],
              },
              {
                col: "Done!",
                colBg: C.green,
                tasks: [
                  { title: "Memphis Research", tag: "Research", tagBg: C.purple, color: "#fff" },
                  { title: "Grid System", tag: "Layout", tagBg: C.pink },
                  { title: "Style Guide", tag: "Docs", tagBg: C.yellow },
                ],
              },
            ].map((column) => (
              <RevealBlock key={column.col} delay={0.08}>
                <div>
                  {/* Column header */}
                  <div
                    style={{
                      padding: "10px 16px",
                      backgroundColor: column.colBg,
                      border: "4px solid #000",
                      borderBottom: "none",
                      fontWeight: 900,
                      fontSize: 14,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: column.colBg === C.purple || column.colBg === C.red ? "#fff" : "#000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {column.col}
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        backgroundColor: "#000",
                        color: column.colBg,
                        borderRadius: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        fontWeight: 900,
                      }}
                    >
                      {column.tasks.length}
                    </span>
                  </div>

                  {/* Task list */}
                  <div
                    style={{
                      backgroundColor: "#fff",
                      border: "4px solid #000",
                      padding: 12,
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                      minHeight: 120,
                    }}
                  >
                    {column.tasks.map((task, ti) => (
                      <div
                        key={task.title}
                        style={{
                          padding: "12px 14px",
                          backgroundColor: "#fffbe6",
                          border: "3px solid #000",
                          boxShadow: "3px 3px 0 #000",
                          cursor: "pointer",
                          transition: "all 150ms ease-out",
                          position: "relative",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.boxShadow = "5px 5px 0 #000";
                          el.style.transform = "translate(-1px, -1px)";
                          el.style.backgroundColor = column.tasks[ti % column.tasks.length]?.tagBg ?? C.yellow;
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.boxShadow = "3px 3px 0 #000";
                          el.style.transform = "translate(0, 0)";
                          el.style.backgroundColor = "#fffbe6";
                        }}
                      >
                        <div style={{ fontWeight: 800, fontSize: 13, color: "#000", marginBottom: 6 }}>
                          {task.title}
                        </div>
                        <span
                          style={{
                            padding: "2px 8px",
                            backgroundColor: task.tagBg,
                            border: "2px solid #000",
                            fontSize: 10,
                            fontWeight: 900,
                            textTransform: "uppercase",
                            color: task.color ?? "#000",
                          }}
                        >
                          {task.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. DESIGN PHILOSOPHY — Do / Don&apos;t + principle cards         */}
      {/* ================================================================ */}
      <section style={{ padding: "80px 20px", backgroundColor: "#fffbe6", borderBottom: "4px solid #000" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <RevealBlock className="mb-4">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <WaveLine />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: C.green,
                }}
              >
                Philosophy
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 900,
                color: "#000",
                lineHeight: 1.05,
                letterSpacing: "-1px",
                textShadow: `3px 3px 0 ${C.green}`,
              }}
            >
              DESIGN PRINCIPLES
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p style={{ fontSize: 17, fontWeight: 600, color: "#333", maxWidth: 520, lineHeight: 1.6 }}>
              Three core ideas that define Memphis. Rebellion without chaos. Decoration without excess.
              Fun without apology.
            </p>
          </RevealBlock>

          {/* 3 principle cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 24,
              marginBottom: 40,
            }}
          >
            {[
              {
                bg: C.red,
                title: "Anti-Minimalism",
                tagline: "More is more.",
                desc: "Memphis openly rejected the 'less is more' dogma. Every surface is an opportunity for decoration, geometry, and color. Empty space is wasted space.",
                rules: ["border-4 border-black always", "shadow-[6px_6px_0px_#000]", "geometric decorations required"],
                geo: <CircleDecor size={40} color={C.yellow} />,
                textColor: "#fff",
              },
              {
                bg: C.purple,
                title: "Geometric Freedom",
                tagline: "Circles, triangles, diamonds.",
                desc: "The Memphis vocabulary is built from simple primitive shapes. Mix them, rotate them, clash them. Combine circle + triangle + square in the same component.",
                rules: ["rounded-full circles", "CSS triangle borders", "rotate-45 diamonds"],
                geo: <TriangleDecor size={40} color={C.cyan} />,
                textColor: "#fff",
              },
              {
                bg: C.green,
                title: "Deliberate Clash",
                tagline: "Color against color.",
                desc: "Harmonious color combinations are the enemy. Place red next to cyan, yellow on purple, pink on green. The tension IS the aesthetic.",
                rules: ["bg-yellow-400 on bg-pink-300", "text contrast — visible not comfortable", "never monochromatic"],
                geo: <DiamondDecor size={40} color={C.red} />,
                textColor: "#000",
              },
            ].map((principle, i) => (
              <RevealBlock key={principle.title} delay={i * 0.08}>
                <div
                  style={{
                    backgroundColor: principle.bg,
                    border: "4px solid #000",
                    boxShadow: "8px 8px 0 #000",
                    padding: 28,
                    height: "100%",
                    boxSizing: "border-box",
                    position: "relative",
                    transition: "all 150ms ease-out",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = "12px 12px 0 #000";
                    el.style.transform = "translate(-2px, -2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = "8px 8px 0 #000";
                    el.style.transform = "translate(0, 0)";
                  }}
                >
                  <div style={{ marginBottom: 16 }}>{principle.geo}</div>
                  <h3
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      color: principle.textColor,
                      textTransform: "uppercase",
                      letterSpacing: "-0.5px",
                      marginBottom: 4,
                    }}
                  >
                    {principle.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: principle.textColor,
                      opacity: 0.8,
                      marginBottom: 12,
                    }}
                  >
                    {principle.tagline}
                  </p>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: principle.textColor,
                      lineHeight: 1.6,
                      opacity: 0.85,
                      marginBottom: 16,
                    }}
                  >
                    {principle.desc}
                  </p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {principle.rules.map((rule) => (
                      <li
                        key={rule}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                          fontSize: 11,
                          fontWeight: 700,
                          color: principle.textColor,
                          fontFamily: "monospace",
                        }}
                      >
                        <span
                          style={{
                            marginTop: 2,
                            width: 8,
                            height: 8,
                            backgroundColor: "#000",
                            flexShrink: 0,
                            display: "inline-block",
                          }}
                        />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Do / Don&apos;t lists */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            <RevealBlock delay={0.1}>
              <div
                style={{
                  backgroundColor: "#fff",
                  border: "4px solid #000",
                  boxShadow: "8px 8px 0 " + C.green,
                  padding: 28,
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      backgroundColor: C.green,
                      border: "3px solid #000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: 18,
                    }}
                  >
                    &#10003;
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 900, color: "#000", textTransform: "uppercase" }}>
                    Do
                  </h3>
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    "Use border-4 border-black always",
                    "Apply shadow-[6px_6px_0px_#000] to all cards",
                    "Clash colors — red + cyan, yellow + purple",
                    "Add circular, triangular, diamond decorations",
                    "Use font-black font-bold — maximum weight",
                    "Group hover: each shape moves its own direction",
                    "active:translate-x-[6px] active:shadow-none",
                    "transition-colors duration-150 for Pop Swap",
                    "duration-150 ease-out for all animations",
                    "hover:bg-pink-400 hover:shadow-[8px_8px_0px_#000]",
                  ].map((rule) => (
                    <li
                      key={rule}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#333",
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          marginTop: 4,
                          width: 8,
                          height: 8,
                          backgroundColor: C.green,
                          border: "2px solid #000",
                          flexShrink: 0,
                          display: "inline-block",
                        }}
                      />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.16}>
              <div
                style={{
                  backgroundColor: "#fff",
                  border: "4px solid #000",
                  boxShadow: "8px 8px 0 " + C.red,
                  padding: 28,
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      backgroundColor: C.red,
                      border: "3px solid #000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 900,
                      fontSize: 18,
                      color: "#fff",
                    }}
                  >
                    &#10007;
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 900, color: "#000", textTransform: "uppercase" }}>
                    Don&apos;t
                  </h3>
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    "No single monotone color palettes",
                    "No thin borders — border-1 or border-2 is too weak",
                    "No symmetric, rigid grid-aligned layouts",
                    "No geometric decorations that stay static on hover",
                    "No shadow on active/pressed buttons",
                    "No button hover that shrinks the shadow",
                    "No gradients as primary fill — use solid colors",
                    "No soft rounded corners — Memphis is angular",
                    "No slow animations — 150ms max, stay snappy",
                    "No cold corporate blues or neutral grays as accents",
                  ].map((rule) => (
                    <li
                      key={rule}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        fontSize: 13,
                        fontWeight: 600,
                        color: "#333",
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          marginTop: 4,
                          width: 8,
                          height: 8,
                          backgroundColor: C.red,
                          border: "2px solid #000",
                          flexShrink: 0,
                          display: "inline-block",
                        }}
                      />
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
      <section
        style={{
          padding: "80px 20px",
          backgroundColor: "#000",
          borderBottom: "4px solid #000",
        }}
      >
        <div style={{ maxWidth: 1152, margin: "0 auto" }}>
          <RevealBlock className="mb-12">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <CircleDecor size={20} color={C.pink} />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: C.pink,
                }}
              >
                Features
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.05,
                letterSpacing: "-1px",
                textShadow: `3px 3px 0 ${C.yellow}`,
              }}
            >
              MADE WITH REBELLION
            </h2>
          </RevealBlock>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 20,
            }}
          >
            {[
              {
                geo: <CircleDecor size={32} color={C.red} />,
                title: "Bold Borders",
                desc: "border-4 border-black on every element. No exceptions. Thin borders are for minimalists.",
                bg: C.yellow,
              },
              {
                geo: <TriangleDecor size={32} color={C.purple} />,
                title: "Hard Shadows",
                desc: "shadow-[6px_6px_0px_#000] — offset, no blur, full black. Like the element was stamped on the page.",
                bg: C.cyan,
              },
              {
                geo: <DiamondDecor size={32} color={C.cyan} />,
                title: "Clashing Colors",
                desc: "Yellow on pink on purple on green. Every combination that breaks the color wheel rule is a Memphis opportunity.",
                bg: C.pink,
              },
              {
                geo: <StarDecor size={32} color={C.yellow} />,
                title: "Geometric Chaos",
                desc: "Circles, triangles, and diamonds scattered asymmetrically. Each one moves in its own direction on hover.",
                bg: C.red,
              },
              {
                geo: <CircleDecor size={32} color={C.green} />,
                title: "Toy Physics",
                desc: "Buttons press down 6px and lose their shadow. The page becomes a tactile toy — every click has weight.",
                bg: C.purple,
              },
              {
                geo: <WaveLine className="memphis-march-anim" />,
                title: "Pattern Texture",
                desc: "Dots, diagonal stripes, and wave lines fill every background. Empty surfaces are Memphis violations.",
                bg: C.green,
              },
            ].map((feature, i) => (
              <RevealBlock key={feature.title} delay={i * 0.06}>
                <div
                  style={{
                    backgroundColor: feature.bg,
                    border: "4px solid #000",
                    boxShadow: "6px 6px 0 #000",
                    padding: 24,
                    height: "100%",
                    boxSizing: "border-box",
                    transition: "all 150ms ease-out",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = "10px 10px 0 #000";
                    el.style.transform = "translate(-2px, -2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.boxShadow = "6px 6px 0 #000";
                    el.style.transform = "translate(0, 0)";
                  }}
                >
                  <div style={{ marginBottom: 14 }}>{feature.geo}</div>
                  <h4
                    style={{
                      fontSize: 17,
                      fontWeight: 900,
                      color: "#000",
                      textTransform: "uppercase",
                      letterSpacing: "-0.3px",
                      marginBottom: 8,
                    }}
                  >
                    {feature.title}
                  </h4>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#000",
                      lineHeight: 1.6,
                      opacity: 0.85,
                    }}
                  >
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
        style={{
          backgroundColor: C.red,
          border: "none",
          borderTop: "4px solid #000",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Stripe accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            backgroundImage: `repeating-linear-gradient(90deg, ${C.yellow} 0px, ${C.yellow} 24px, #000 24px, #000 26px, ${C.cyan} 26px, ${C.cyan} 50px, #000 50px, #000 52px)`,
          }}
        />

        {/* Corner decorations */}
        <div style={{ position: "absolute", top: 24, left: 24 }} className="memphis-bounce-anim">
          <CircleDecor size={40} color={C.yellow} />
        </div>
        <div style={{ position: "absolute", top: 24, right: 40 }} className="memphis-spin-slow">
          <DiamondDecor size={36} color={C.purple} />
        </div>
        <div style={{ position: "absolute", bottom: 32, left: 80 }} className="memphis-spin-rev-slow">
          <TriangleDecor size={32} color={C.cyan} />
        </div>
        <div style={{ position: "absolute", bottom: 24, right: 60 }} className="memphis-bounce-anim">
          <StarDecor size={38} color={C.yellow} />
        </div>

        <div
          style={{
            maxWidth: 1152,
            margin: "0 auto",
            padding: "56px 20px 40px",
          }}
        >
          {/* Top row */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 32,
              marginBottom: 40,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 20px",
                  backgroundColor: "#000",
                  border: "3px solid #000",
                  boxShadow: `4px 4px 0 ${C.yellow}`,
                }}
              >
                <CircleDecor size={14} color={C.yellow} />
                <span style={{ fontWeight: 900, color: "#fff", fontSize: 18, letterSpacing: 2, textTransform: "uppercase" }}>
                  Memphis
                </span>
              </div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#fff", maxWidth: 360, lineHeight: 1.5 }}>
                80s Italian design rebellion. Bold, geometric, loud, and completely unapologetic.
              </p>
            </div>

            {/* Color dot strip */}
            <div style={{ display: "flex", gap: 6 }}>
              {Object.values(C)
                .filter((v) => v !== "#000000")
                .map((color, i) => (
                  <div
                    key={i}
                    style={{
                      width: 28,
                      height: 28,
                      backgroundColor: color,
                      border: "3px solid #000",
                      transition: "all 150ms ease-out",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0 #000";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  />
                ))}
            </div>

            {/* Nav links */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 32 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 900,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#000",
                    marginBottom: 4,
                  }}
                >
                  Style
                </span>
                {[
                  { label: "Documentation", href: "/styles/memphis" },
                  { label: "Showcase", href: "/styles/memphis/showcase" },
                  { label: "Cover", href: "/styles/memphis/cover" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#fff",
                      textDecoration: "none",
                      transition: "color 150ms ease-out",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = C.yellow;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 900,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#000",
                    marginBottom: 4,
                  }}
                >
                  StyleKit
                </span>
                {[
                  { label: "Home", href: "/" },
                  { label: "All Styles", href: "/styles" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#fff",
                      textDecoration: "none",
                      transition: "color 150ms ease-out",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = C.yellow;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#fff";
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 4,
              backgroundColor: "#000",
              marginBottom: 24,
            }}
          />

          {/* Bottom row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>
              Made with rebellion for StyleKit
            </div>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 22px",
                backgroundColor: C.yellow,
                border: "3px solid #000",
                boxShadow: "4px 4px 0 #000",
                fontWeight: 900,
                fontSize: 13,
                textTransform: "uppercase",
                color: "#000",
                textDecoration: "none",
                transition: "all 150ms ease-out",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = C.pink;
                el.style.boxShadow = "6px 6px 0 #000";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = C.yellow;
                el.style.boxShadow = "4px 4px 0 #000";
              }}
            >
              &#8592; Back to StyleKit
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
