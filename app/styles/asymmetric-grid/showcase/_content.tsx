"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks & primitives                                          */
/* ------------------------------------------------------------------ */

function useInView(options = { threshold: 0.15 }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      options,
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
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const gridLayouts = [
  {
    id: "2+3+7",
    label: "2 + 3 + 7",
    cols: [
      { span: 2, bg: "#ff3366", text: "#ffffff", label: "2" },
      { span: 3, bg: "#0f0f0f", text: "#ffffff", label: "3" },
      { span: 7, bg: "#00d4ff", text: "#0f0f0f", label: "7" },
    ],
  },
  {
    id: "3+5+4",
    label: "3 + 5 + 4",
    cols: [
      { span: 3, bg: "#ffcc00", text: "#0f0f0f", label: "3" },
      { span: 5, bg: "#0f0f0f", text: "#ffffff", label: "5" },
      { span: 4, bg: "#ff3366", text: "#ffffff", label: "4" },
    ],
  },
  {
    id: "1+8+3",
    label: "1 + 8 + 3",
    cols: [
      { span: 1, bg: "#ff3366", text: "#ffffff", label: "1" },
      { span: 8, bg: "#ffffff", text: "#0f0f0f", label: "8" },
      { span: 3, bg: "#00d4ff", text: "#0f0f0f", label: "3" },
    ],
  },
  {
    id: "5+2+5",
    label: "5 + 2 + 5",
    cols: [
      { span: 5, bg: "#0f0f0f", text: "#ffffff", label: "5" },
      { span: 2, bg: "#ffcc00", text: "#0f0f0f", label: "2" },
      { span: 5, bg: "#ff3366", text: "#ffffff", label: "5" },
    ],
  },
];

const doRules = [
  "Overlap elements deliberately — depth creates hierarchy",
  "Use unequal column spans: 3+9, 7+5, 1+8+3, never 6+6",
  "Hard-offset shadows signal interactive weight",
  "Let text escape its bounding box — tension is intentional",
  "Rotate accent elements slightly for editorial energy",
];

const dontRules = [
  "Never center everything symmetrically",
  "Never use equal column splits (6+6, 4+4+4)",
  "Never align all edges to the same baseline",
  "Never use soft drop-shadows — hard offsets only",
  "Never avoid overlaps — they are the feature, not the bug",
];

const typographyExamples = [
  {
    text: "BOLD",
    size: "clamp(72px, 10vw, 120px)",
    weight: 900,
    tracking: "-0.04em",
    label: "DISPLAY / HEADLINE — font-black, tracking-tighter",
    color: "#0f0f0f",
  },
  {
    text: "TENSION",
    size: "clamp(40px, 6vw, 64px)",
    weight: 900,
    tracking: "-0.03em",
    label: "SECTION TITLE — font-black, tracking-tight",
    color: "#ff3366",
  },
  {
    text: "ASYMMETRY",
    size: "clamp(20px, 3vw, 32px)",
    weight: 300,
    tracking: "0.5em",
    label: "SUBTITLE — font-light, tracking-[0.5em]",
    color: "#0f0f0f",
  },
  {
    text: "EDITORIAL",
    size: "18px",
    weight: 700,
    tracking: "0.3em",
    label: "LABEL — font-bold, tracking-widest, uppercase",
    color: "#00d4ff",
  },
];

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function AsymmetricGridShowcase() {
  const [activeTab, setActiveTab] = useState("2+3+7");
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const [inputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const activeLayout =
    gridLayouts.find((l) => l.id === activeTab) ?? gridLayouts[0];

  /* ---------------------------------------------------------------- */
  /*  1. NAV                                                          */
  /* ---------------------------------------------------------------- */
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        color: "#0f0f0f",
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* NAV */}
      <nav
        style={{
          backgroundColor: "#ffffff",
          borderBottom: "2px solid #0f0f0f",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 24px",
            height: "64px",
            alignItems: "center",
          }}
        >
          {/* Logo — left-offset, spans 3 */}
          <div
            style={{
              gridColumn: "1 / span 3",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                backgroundColor: "#ff3366",
                boxShadow: "4px 4px 0 #0f0f0f",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontWeight: 900,
                fontSize: "15px",
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
              }}
            >
              ASYM
            </span>
          </div>

          {/* Nav items — asymmetric sizes and spacing */}
          <div
            style={{
              gridColumn: "4 / span 7",
              display: "flex",
              alignItems: "center",
            }}
          >
            {[
              {
                label: "Grid",
                size: "14px",
                active: true,
                weight: "700",
                padding: "0 20px",
              },
              {
                label: "Components",
                size: "12px",
                active: false,
                weight: "400",
                padding: "0 16px",
              },
              {
                label: "Typography",
                size: "16px",
                active: false,
                weight: "600",
                padding: "0 24px",
              },
              {
                label: "Rules",
                size: "11px",
                active: false,
                weight: "400",
                padding: "0 12px",
              },
            ].map((item) => (
              <span
                key={item.label}
                style={{
                  fontSize: item.size,
                  fontWeight: item.weight,
                  padding: item.padding,
                  height: "64px",
                  display: "flex",
                  alignItems: "center",
                  borderBottom: item.active
                    ? "3px solid #ff3366"
                    : "3px solid transparent",
                  color: item.active ? "#ff3366" : "#0f0f0f",
                  cursor: "pointer",
                  letterSpacing: item.active ? "-0.02em" : "0",
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </span>
            ))}
          </div>

          {/* CTA — right-most 2 cols */}
          <div
            style={{
              gridColumn: "11 / span 2",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link
              href="/styles/asymmetric-grid"
              style={{
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                padding: "8px 14px",
                backgroundColor: "#0f0f0f",
                color: "#ffffff",
                textDecoration: "none",
                boxShadow: "4px 4px 0 #ff3366",
              }}
            >
              Use Style
            </Link>
          </div>
        </div>
      </nav>

      {/* -------------------------------------------------------------- */}
      {/*  2. HERO                                                        */}
      {/* -------------------------------------------------------------- */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "80px 24px 40px",
        }}
      >
        {/* Top row: 7 + 5 asymmetric split */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            alignItems: "flex-start",
          }}
        >
          {/* Left 7 cols: giant headline */}
          <div style={{ gridColumn: "1 / span 7" }}>
            <RevealBlock delay={0}>
              <div
                style={{
                  fontSize: "clamp(60px, 8vw, 100px)",
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  color: "#0f0f0f",
                }}
              >
                ASYM
                <br />
                METRIC
              </div>
            </RevealBlock>
            <RevealBlock delay={0.15}>
              <div
                style={{
                  fontSize: "clamp(60px, 8vw, 100px)",
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  color: "#ff3366",
                  marginTop: "-8px",
                }}
              >
                GRID
              </div>
            </RevealBlock>
          </div>

          {/* Right 5 cols: abstract colored rectangles */}
          <div
            style={{
              gridColumn: "8 / span 5",
              position: "relative",
              height: "280px",
            }}
          >
            {/* Cyan block — behind */}
            <RevealBlock delay={0.1}>
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "20px",
                  width: "180px",
                  height: "180px",
                  backgroundColor: "#00d4ff",
                }}
              />
            </RevealBlock>
            {/* Red block — offset +8px, overlapping cyan */}
            <RevealBlock delay={0.2}>
              <div
                style={{
                  position: "absolute",
                  top: "28px",
                  left: "80px",
                  width: "140px",
                  height: "140px",
                  backgroundColor: "#ff3366",
                  boxShadow: "8px 8px 0 #0f0f0f",
                  zIndex: 2,
                }}
              />
            </RevealBlock>
            {/* Yellow accent square */}
            <RevealBlock delay={0.3}>
              <div
                style={{
                  position: "absolute",
                  top: "156px",
                  left: "24px",
                  width: "56px",
                  height: "56px",
                  backgroundColor: "#ffcc00",
                  boxShadow: "6px 6px 0 #0f0f0f",
                  zIndex: 3,
                }}
              />
            </RevealBlock>
            {/* Diagonal tension line */}
            <div
              style={{
                position: "absolute",
                top: "220px",
                left: "0",
                width: "100%",
                height: "2px",
                backgroundColor: "#0f0f0f",
                transform: "rotate(-3deg)",
                transformOrigin: "left center",
              }}
            />
          </div>
        </div>

        {/* Bottom row: description text, asymmetrically offset */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            marginTop: "48px",
            borderTop: "2px solid #0f0f0f",
            paddingTop: "32px",
          }}
        >
          <RevealBlock delay={0.35}>
            <div style={{ gridColumn: "3 / span 8" }}>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: 300,
                  lineHeight: 1.6,
                  color: "#0f0f0f",
                  maxWidth: "680px",
                  marginLeft: "16.66%",
                }}
              >
                Asymmetric Grid is built on deliberate imbalance. Unequal
                columns, overlapping elements, and hard-offset shadows create
                editorial tension that symmetric grids can never achieve.
              </p>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.45}>
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "32px",
                marginLeft: "16.66%",
                flexWrap: "wrap",
              }}
            >
              {[
                { hex: "#ff3366", name: "Hot Red" },
                { hex: "#00d4ff", name: "Cyan" },
                { hex: "#ffcc00", name: "Yellow" },
                { hex: "#0f0f0f", name: "Near-Black" },
              ].map((tag) => (
                <span
                  key={tag.hex}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "6px 12px",
                    border: "2px solid #0f0f0f",
                  }}
                >
                  <span
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor: tag.hex,
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                  {tag.name}
                </span>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/*  3. GRID ANATOMY                                               */}
      {/* -------------------------------------------------------------- */}
      <section
        style={{
          backgroundColor: "#0f0f0f",
          padding: "80px 24px",
          marginTop: "60px",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <RevealBlock>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "20px",
                marginBottom: "40px",
                flexWrap: "wrap",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(36px, 4vw, 64px)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                Grid Anatomy
              </h2>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#ff3366",
                }}
              >
                12-column system
              </span>
            </div>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.1}>
            <div
              style={{
                display: "flex",
                marginBottom: "32px",
                borderBottom: "2px solid #333",
                overflowX: "auto",
              }}
            >
              {gridLayouts.map((layout) => (
                <button
                  key={layout.id}
                  onClick={() => setActiveTab(layout.id)}
                  style={{
                    padding: "12px 24px",
                    fontSize: "13px",
                    fontWeight: activeTab === layout.id ? 900 : 400,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: activeTab === layout.id ? "#ffffff" : "#666",
                    backgroundColor:
                      activeTab === layout.id ? "#ff3366" : "transparent",
                    border: "none",
                    borderBottom:
                      activeTab === layout.id
                        ? "2px solid #ff3366"
                        : "2px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {layout.label}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Active layout — main row */}
          <RevealBlock delay={0.2}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: "4px",
                height: "200px",
                marginBottom: "4px",
              }}
            >
              {activeLayout.cols.map((col, i) => (
                <div
                  key={i}
                  style={{
                    gridColumn: `span ${col.span}`,
                    backgroundColor: col.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "8px",
                    border:
                      col.bg === "#ffffff" ? "2px solid #333" : "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(28px, 4vw, 52px)",
                      fontWeight: 900,
                      color: col.text,
                      lineHeight: 1,
                    }}
                  >
                    {col.label}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: col.text,
                      opacity: 0.5,
                    }}
                  >
                    col
                  </span>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Sub-grid row */}
          <RevealBlock delay={0.3}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: "4px",
                height: "72px",
              }}
            >
              <div
                style={{
                  gridColumn: "span 5",
                  backgroundColor: "#ffcc00",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "#0f0f0f",
                    textTransform: "uppercase",
                  }}
                >
                  Sub-row A
                </span>
              </div>
              <div
                style={{
                  gridColumn: "span 3",
                  backgroundColor: "#222",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "#fff",
                    textTransform: "uppercase",
                  }}
                >
                  B
                </span>
              </div>
              <div
                style={{
                  gridColumn: "span 4",
                  backgroundColor: "#00d4ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "#0f0f0f",
                    textTransform: "uppercase",
                  }}
                >
                  Sub-row C
                </span>
              </div>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.4}>
            <p
              style={{
                fontSize: "14px",
                color: "#888",
                marginTop: "24px",
                letterSpacing: "0.02em",
                lineHeight: 1.6,
              }}
            >
              Each layout distributes 12 columns unequally. The tension between
              wide and narrow cells is the foundation of the aesthetic.
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/*  4. COLOR TENSION                                              */}
      {/* -------------------------------------------------------------- */}
      <section
        style={{ padding: "80px 24px", maxWidth: "1400px", margin: "0 auto" }}
      >
        <RevealBlock>
          <h2
            style={{
              fontSize: "clamp(36px, 4vw, 64px)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              color: "#0f0f0f",
              margin: "0 0 56px 0",
            }}
          >
            Color <span style={{ color: "#ff3366" }}>Tension</span>
          </h2>
        </RevealBlock>

        {/* Deliberately non-grid layout using absolute positioning */}
        <div style={{ position: "relative", height: "420px" }}>
          {/* Big near-black block */}
          <RevealBlock delay={0}>
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "55%",
                height: "320px",
                backgroundColor: "#0f0f0f",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "28px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "#666",
                  textTransform: "uppercase",
                }}
              >
                Primary
              </span>
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                #0f0f0f
              </span>
              <span
                style={{ fontSize: "13px", color: "#888", marginTop: "8px" }}
              >
                Near-Black — background, body text
              </span>
            </div>
          </RevealBlock>

          {/* Medium red block — offset, overlaps black */}
          <RevealBlock delay={0.15}>
            <div
              style={{
                position: "absolute",
                top: "40px",
                left: "48%",
                width: "32%",
                height: "240px",
                backgroundColor: "#ff3366",
                boxShadow: "8px 8px 0 #0f0f0f",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "24px",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.6)",
                  textTransform: "uppercase",
                }}
              >
                Accent
              </span>
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: 900,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                #ff3366
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.7)",
                  marginTop: "6px",
                }}
              >
                Hot Red — primary accent
              </span>
            </div>
          </RevealBlock>

          {/* Small cyan block — corner */}
          <RevealBlock delay={0.25}>
            <div
              style={{
                position: "absolute",
                top: "200px",
                right: "0",
                width: "18%",
                height: "190px",
                backgroundColor: "#00d4ff",
                boxShadow: "6px 6px 0 #0f0f0f",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "16px",
                zIndex: 3,
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "rgba(0,0,0,0.5)",
                  textTransform: "uppercase",
                }}
              >
                Secondary
              </span>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 900,
                  color: "#0f0f0f",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                }}
              >
                #00d4ff
              </span>
            </div>
          </RevealBlock>

          {/* Yellow accent strip — bottom left */}
          <RevealBlock delay={0.35}>
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "30%",
                height: "72px",
                backgroundColor: "#ffcc00",
                boxShadow: "6px 6px 0 #0f0f0f",
                display: "flex",
                alignItems: "center",
                padding: "0 20px",
                zIndex: 4,
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "#0f0f0f",
                  textTransform: "uppercase",
                }}
              >
                #ffcc00 — Yellow Accent
              </span>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/*  5. COMPONENT SHOWCASE                                         */}
      {/* -------------------------------------------------------------- */}
      <section
        style={{
          backgroundColor: "#f5f5f5",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <RevealBlock>
            <h2
              style={{
                fontSize: "clamp(36px, 4vw, 64px)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "#0f0f0f",
                margin: "0 0 56px 0",
              }}
            >
              Components
            </h2>
          </RevealBlock>

          {/* Asymmetric component grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: "24px",
              alignItems: "start",
            }}
          >
            {/* Buttons — span 4 */}
            <div style={{ gridColumn: "1 / span 4" }}>
              <RevealBlock delay={0.05}>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#999",
                    marginBottom: "20px",
                  }}
                >
                  Buttons
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    alignItems: "flex-start",
                  }}
                >
                  {[
                    {
                      id: "primary",
                      label: "PRIMARY",
                      size: "15px",
                      pad: "14px 28px",
                      bg: "#0f0f0f",
                      color: "#fff",
                      shadow: "6px 6px 0 #ff3366",
                      ox: "6px",
                      oy: "6px",
                      border: "none",
                    },
                    {
                      id: "accent",
                      label: "ACCENT",
                      size: "13px",
                      pad: "12px 24px",
                      bg: "#ff3366",
                      color: "#fff",
                      shadow: "6px 6px 0 #0f0f0f",
                      ox: "6px",
                      oy: "6px",
                      border: "none",
                    },
                    {
                      id: "outline",
                      label: "OUTLINE",
                      size: "12px",
                      pad: "10px 20px",
                      bg: "#fff",
                      color: "#0f0f0f",
                      shadow: "4px 4px 0 #00d4ff",
                      ox: "4px",
                      oy: "4px",
                      border: "2px solid #0f0f0f",
                    },
                    {
                      id: "small",
                      label: "SMALL",
                      size: "10px",
                      pad: "8px 16px",
                      bg: "#ffcc00",
                      color: "#0f0f0f",
                      shadow: "4px 4px 0 #0f0f0f",
                      ox: "4px",
                      oy: "4px",
                      border: "none",
                    },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onMouseEnter={() => setHoveredBtn(btn.id)}
                      onMouseLeave={() => setHoveredBtn(null)}
                      style={{
                        padding: btn.pad,
                        fontSize: btn.size,
                        fontWeight: 900,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        backgroundColor: btn.bg,
                        color: btn.color,
                        border: btn.border,
                        boxShadow:
                          hoveredBtn === btn.id ? "none" : btn.shadow,
                        transform:
                          hoveredBtn === btn.id
                            ? `translate(${btn.ox}, ${btn.oy})`
                            : "translate(0, 0)",
                        transition:
                          "box-shadow 0.12s ease, transform 0.12s ease",
                        cursor: "pointer",
                      }}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </RevealBlock>
            </div>

            {/* Large feature card — span 5 */}
            <div style={{ gridColumn: "5 / span 5" }}>
              <RevealBlock delay={0.1}>
                <div
                  style={{
                    backgroundColor: "#0f0f0f",
                    padding: "36px",
                    boxShadow: "8px 8px 0 #ff3366",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-20px",
                      right: "-20px",
                      width: "100px",
                      height: "100px",
                      backgroundColor: "#ff3366",
                      opacity: 0.15,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      color: "#ff3366",
                      textTransform: "uppercase",
                    }}
                  >
                    Feature Card
                  </span>
                  <h3
                    style={{
                      fontSize: "28px",
                      fontWeight: 900,
                      color: "#ffffff",
                      marginTop: "12px",
                      marginBottom: "16px",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                    }}
                  >
                    Visual Tension
                    <br />
                    by Design
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#999",
                      lineHeight: 1.7,
                    }}
                  >
                    Asymmetric layouts break expectation. Hard offset shadows
                    signal weight and interactivity without subtlety.
                  </p>
                  <div
                    style={{
                      marginTop: "24px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: "#ff3366",
                      }}
                    />
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: "#00d4ff",
                      }}
                    />
                    <div
                      style={{
                        width: "14px",
                        height: "14px",
                        backgroundColor: "#ffcc00",
                      }}
                    />
                  </div>
                </div>
              </RevealBlock>
            </div>

            {/* Two small cards — span 3 */}
            <div style={{ gridColumn: "10 / span 3" }}>
              <RevealBlock delay={0.15}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {[
                    {
                      label: "Overlap",
                      val: "Z-index",
                      accent: "#00d4ff",
                    },
                    {
                      label: "Tension",
                      val: "Offset",
                      accent: "#ffcc00",
                    },
                  ].map((card) => (
                    <div
                      key={card.label}
                      style={{
                        backgroundColor: "#ffffff",
                        border: "2px solid #0f0f0f",
                        padding: "20px",
                        boxShadow: `6px 6px 0 ${card.accent}`,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          color: "#999",
                          textTransform: "uppercase",
                        }}
                      >
                        {card.label}
                      </span>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: 900,
                          color: "#0f0f0f",
                          marginTop: "8px",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {card.val}
                      </div>
                    </div>
                  ))}
                </div>
              </RevealBlock>
            </div>
          </div>

          {/* Input with offset floating label */}
          <RevealBlock delay={0.2}>
            <div
              style={{
                marginTop: "48px",
                maxWidth: "480px",
                position: "relative",
                paddingTop: "24px",
              }}
            >
              <label
                style={{
                  position: "absolute",
                  top: inputFocused || inputValue ? "0" : "38px",
                  left: inputFocused || inputValue ? "-4px" : "16px",
                  fontSize:
                    inputFocused || inputValue ? "10px" : "14px",
                  fontWeight: 700,
                  letterSpacing:
                    inputFocused || inputValue ? "0.12em" : "0",
                  textTransform: "uppercase",
                  color: inputFocused ? "#ff3366" : "#0f0f0f",
                  transition: "all 0.2s cubic-bezier(0.16,1,0.3,1)",
                  pointerEvents: "none",
                  backgroundColor:
                    inputFocused || inputValue ? "#f5f5f5" : "transparent",
                  padding: "0 4px",
                }}
              >
                Search Layouts
              </label>
              <input
                type="text"
                value={inputValue}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                onChange={(e) => setInputValue(e.target.value)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  fontSize: "16px",
                  fontWeight: 500,
                  border: `2px solid ${inputFocused ? "#ff3366" : "#0f0f0f"}`,
                  backgroundColor: "#ffffff",
                  outline: "none",
                  boxShadow: inputFocused
                    ? "8px 8px 0 #ff3366"
                    : "6px 6px 0 #0f0f0f",
                  transition: "all 0.15s ease",
                  boxSizing: "border-box",
                }}
                placeholder=""
              />
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/*  6. TYPOGRAPHY GRID                                            */}
      {/* -------------------------------------------------------------- */}
      <section
        style={{ padding: "80px 24px", maxWidth: "1400px", margin: "0 auto" }}
      >
        <RevealBlock>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              marginBottom: "60px",
              position: "relative",
            }}
          >
            <h2
              style={{
                fontSize: "clamp(48px, 7vw, 96px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                color: "#0f0f0f",
                margin: 0,
                lineHeight: 1,
              }}
            >
              TYPE
            </h2>
            {/* Label overlaps the headline — text escaping its container */}
            <div
              style={{
                position: "absolute",
                left: "clamp(160px, 20vw, 320px)",
                bottom: "8px",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#ff3366",
                whiteSpace: "nowrap",
              }}
            >
              Typography Rules
            </div>
          </div>
        </RevealBlock>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {typographyExamples.map((ex, i) => (
            <RevealBlock key={i} delay={i * 0.08}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(12, 1fr)",
                  alignItems: "center",
                  borderTop: "1px solid #e0e0e0",
                  padding: "24px 0",
                }}
              >
                {/* Index number — asymmetric left margin per row */}
                <div
                  style={{
                    gridColumn: "1 / span 1",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#ccc",
                    letterSpacing: "0.1em",
                    paddingLeft: i % 2 === 0 ? "0" : "16px",
                  }}
                >
                  0{i + 1}
                </div>

                {/* Text sample — spans 7 cols */}
                <div style={{ gridColumn: "2 / span 7" }}>
                  <div
                    style={{
                      fontSize: ex.size,
                      fontWeight: ex.weight,
                      letterSpacing: ex.tracking,
                      color: ex.color,
                      textTransform: "uppercase",
                      lineHeight: 1.1,
                    }}
                  >
                    {ex.text}
                  </div>
                </div>

                {/* Label — offset right */}
                <div
                  style={{
                    gridColumn: "9 / span 4",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#999",
                    letterSpacing: "0.05em",
                    lineHeight: 1.5,
                    paddingLeft: "16px",
                  }}
                >
                  {ex.label}
                </div>
              </div>
            </RevealBlock>
          ))}

          <RevealBlock delay={0.4}>
            <div
              style={{
                borderTop: "2px solid #0f0f0f",
                paddingTop: "32px",
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: "24px",
                marginTop: "8px",
              }}
            >
              {/* Tight tracking demo */}
              <div style={{ gridColumn: "1 / span 5" }}>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#ff3366",
                    marginBottom: "12px",
                  }}
                >
                  Tight Tracking
                </p>
                <div
                  style={{
                    fontSize: "40px",
                    fontWeight: 900,
                    letterSpacing: "-0.06em",
                    textTransform: "uppercase",
                    color: "#0f0f0f",
                    lineHeight: 1,
                  }}
                >
                  CONDENSED
                </div>
              </div>
              {/* Wide tracking demo */}
              <div style={{ gridColumn: "7 / span 6" }}>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#00d4ff",
                    marginBottom: "12px",
                  }}
                >
                  Wide Tracking
                </p>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: 300,
                    letterSpacing: "0.5em",
                    textTransform: "uppercase",
                    color: "#0f0f0f",
                    lineHeight: 1.4,
                  }}
                >
                  EXPANDED
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/*  7. DESIGN RULES (the grid itself is broken to prove the point) */}
      {/* -------------------------------------------------------------- */}
      <section
        style={{
          backgroundColor: "#0f0f0f",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <RevealBlock>
            <h2
              style={{
                fontSize: "clamp(36px, 4vw, 64px)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "#ffffff",
                margin: "0 0 56px 0",
              }}
            >
              Design <span style={{ color: "#ff3366" }}>Rules</span>
            </h2>
          </RevealBlock>

          {/* DO rules — positioned asymmetrically across the grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              rowGap: "20px",
            }}
          >
            <RevealBlock delay={0}>
              <div style={{ gridColumn: "1 / span 2" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 900,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#00d4ff",
                  }}
                >
                  DO
                </span>
              </div>
            </RevealBlock>

            {doRules.map((rule, i) => (
              <RevealBlock key={i} delay={0.08 + i * 0.06}>
                <div
                  style={{
                    gridColumn:
                      i % 2 === 0 ? "3 / span 8" : "2 / span 9",
                    padding: "20px 24px",
                    borderLeft: "3px solid #00d4ff",
                    marginLeft: i % 3 === 2 ? "48px" : "0",
                  }}
                >
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: i % 2 === 0 ? 600 : 400,
                      color: i % 2 === 0 ? "#ffffff" : "#aaa",
                      lineHeight: 1.5,
                    }}
                  >
                    {rule}
                  </span>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Divider with offset accent */}
          <RevealBlock delay={0.4}>
            <div
              style={{
                height: "2px",
                backgroundColor: "#333",
                margin: "48px 0",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "20%",
                  top: "-1px",
                  width: "60%",
                  height: "4px",
                  backgroundColor: "#ff3366",
                }}
              />
            </div>
          </RevealBlock>

          {/* DON'T rules */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              rowGap: "20px",
            }}
          >
            <RevealBlock delay={0.45}>
              <div style={{ gridColumn: "1 / span 2" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 900,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "#ff3366",
                  }}
                >
                  DON&apos;T
                </span>
              </div>
            </RevealBlock>

            {dontRules.map((rule, i) => (
              <RevealBlock key={i} delay={0.5 + i * 0.06}>
                <div
                  style={{
                    gridColumn:
                      i % 2 === 0 ? "2 / span 9" : "3 / span 8",
                    padding: "20px 24px",
                    borderLeft: "3px solid #ff3366",
                    marginLeft: i % 3 === 1 ? "32px" : "0",
                    opacity: 0.85,
                  }}
                >
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: i % 2 === 0 ? 400 : 600,
                      color: "#888",
                      lineHeight: 1.5,
                    }}
                  >
                    {rule}
                  </span>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Visual proof: symmetric grid with X vs asymmetric */}
          <RevealBlock delay={0.85}>
            <div
              style={{
                marginTop: "60px",
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: "24px",
                alignItems: "center",
              }}
            >
              {/* Bad — symmetric grid with X */}
              <div style={{ gridColumn: "1 / span 5" }}>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#ff3366",
                    marginBottom: "16px",
                  }}
                >
                  DON&apos;T — Equal columns
                </p>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "4px",
                      opacity: 0.35,
                    }}
                  >
                    {[...Array(6)].map((_, idx) => (
                      <div
                        key={idx}
                        style={{ height: "60px", backgroundColor: "#444" }}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "64px",
                        fontWeight: 900,
                        color: "#ff3366",
                        lineHeight: 1,
                      }}
                    >
                      X
                    </span>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div
                style={{
                  gridColumn: "6 / span 1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: "28px", color: "#555" }}>
                  {"\u2192"}
                </span>
              </div>

              {/* Good — asymmetric */}
              <div style={{ gridColumn: "7 / span 6" }}>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#00d4ff",
                    marginBottom: "16px",
                  }}
                >
                  DO — Asymmetric tension
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "7fr 3fr 2fr",
                    gap: "4px",
                  }}
                >
                  <div
                    style={{
                      height: "60px",
                      backgroundColor: "#ff3366",
                      boxShadow: "4px 4px 0 #fff",
                    }}
                  />
                  <div
                    style={{ height: "60px", backgroundColor: "#00d4ff" }}
                  />
                  <div
                    style={{ height: "60px", backgroundColor: "#ffcc00" }}
                  />
                  <div
                    style={{
                      height: "60px",
                      backgroundColor: "#333",
                      gridColumn: "span 2",
                    }}
                  />
                  <div
                    style={{ height: "60px", backgroundColor: "#ff3366" }}
                  />
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* -------------------------------------------------------------- */}
      {/*  8. FOOTER (asymmetric: text left-heavy, accent block right)   */}
      {/* -------------------------------------------------------------- */}
      <footer
        style={{
          backgroundColor: "#ffffff",
          borderTop: "2px solid #0f0f0f",
          padding: "60px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "24px",
            alignItems: "end",
          }}
        >
          {/* Left-heavy text block — 7 cols */}
          <div style={{ gridColumn: "1 / span 7" }}>
            <RevealBlock delay={0}>
              <div
                style={{
                  fontSize: "clamp(40px, 5vw, 72px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  color: "#0f0f0f",
                  lineHeight: 1,
                  marginBottom: "24px",
                }}
              >
                BREAK
                <br />
                THE
                <br />
                <span style={{ color: "#ff3366" }}>GRID.</span>
              </div>
            </RevealBlock>
            <RevealBlock delay={0.1}>
              <p
                style={{
                  fontSize: "14px",
                  color: "#888",
                  lineHeight: 1.7,
                  maxWidth: "360px",
                  marginBottom: "32px",
                }}
              >
                Asymmetric Grid is part of StyleKit — a curated collection of
                design systems built for maximum aesthetic impact.
              </p>
            </RevealBlock>
            <RevealBlock delay={0.2}>
              <div
                style={{
                  display: "flex",
                  gap: "24px",
                  alignItems: "center",
                }}
              >
                <Link
                  href="/styles/asymmetric-grid"
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#0f0f0f",
                    textDecoration: "none",
                    borderBottom: "2px solid #ff3366",
                    paddingBottom: "2px",
                  }}
                >
                  View Style Docs
                </Link>
                <Link
                  href="/styles"
                  style={{
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#aaa",
                    textDecoration: "none",
                  }}
                >
                  All Styles
                </Link>
              </div>
            </RevealBlock>
          </div>

          {/* Right accent block — 4 cols, deliberately unbalanced */}
          <div style={{ gridColumn: "9 / span 4" }}>
            <RevealBlock delay={0.15}>
              <div
                style={{
                  backgroundColor: "#ff3366",
                  padding: "36px",
                  boxShadow: "8px 8px 0 #0f0f0f",
                  position: "relative",
                }}
              >
                {/* Yellow corner accent square */}
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    width: "24px",
                    height: "24px",
                    backgroundColor: "#ffcc00",
                  }}
                />
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.6)",
                    marginBottom: "16px",
                  }}
                >
                  StyleKit
                </p>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: 900,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    marginBottom: "20px",
                  }}
                >
                  Asymmetric
                  <br />
                  Grid
                </p>
                <div style={{ display: "flex", gap: "8px" }}>
                  {["#0f0f0f", "#00d4ff", "#ffcc00"].map((color) => (
                    <div
                      key={color}
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: color,
                        border: "1px solid rgba(255,255,255,0.3)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Bottom bar — full width, asymmetric content */}
          <div
            style={{
              gridColumn: "1 / span 12",
              borderTop: "1px solid #e0e0e0",
              paddingTop: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "16px",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                color: "#ccc",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              ASYMMETRIC-GRID &mdash; STYLEKIT
            </span>
            <span
              style={{
                fontSize: "11px",
                color: "#ccc",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Deliberate imbalance. Maximum tension.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
