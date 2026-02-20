"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks & primitives                                          */
/* ------------------------------------------------------------------ */

function useInView(options: IntersectionObserverInit = {}) {
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
      { threshold: 0.15, ...options },
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
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const ACCENT_PURPLE = "#6c5ce7";
const ACCENT_TEAL = "#00cec9";
const ACCENT_PINK = "#fd79a8";
const ACCENT_YELLOW = "#ffeaa7";
const PRIMARY_DARK = "#1a1a2e";
const SECONDARY_LIGHT = "#f0f0f5";

const cardData = [
  {
    id: 0,
    label: "Design",
    title: "Visual Hierarchy",
    body: "Cards establish depth through layering — the top card commands attention while lower cards provide context.",
    accent: ACCENT_PURPLE,
    bg: "#ffffff",
  },
  {
    id: 1,
    label: "Interaction",
    title: "Fan on Hover",
    body: "On interaction, the stack fans out to reveal each card individually, inviting exploration.",
    accent: ACCENT_TEAL,
    bg: "#f8faff",
  },
  {
    id: 2,
    label: "Motion",
    title: "Spring Physics",
    body: "cubic-bezier(0.16,1,0.3,1) gives cards a natural, springy feel — fast start, soft landing.",
    accent: ACCENT_PINK,
    bg: "#fff8fc",
  },
  {
    id: 3,
    label: "Structure",
    title: "Z-axis Depth",
    body: "Scale + translateY + rotate work together to simulate genuine three-dimensional stacking.",
    accent: ACCENT_YELLOW,
    bg: "#fffef0",
  },
  {
    id: 4,
    label: "System",
    title: "Reorder by Click",
    body: "Clicking any card brings it to the front, enabling natural deck-browsing interactions.",
    accent: ACCENT_PURPLE,
    bg: "#f5f4ff",
  },
];

const colorSwatches = [
  { name: "Deep Purple-Black", hex: PRIMARY_DARK, textLight: true },
  { name: "Near White", hex: SECONDARY_LIGHT, textLight: false },
  { name: "Purple", hex: ACCENT_PURPLE, textLight: true },
  { name: "Teal", hex: ACCENT_TEAL, textLight: false },
  { name: "Pink", hex: ACCENT_PINK, textLight: false },
  { name: "Yellow", hex: ACCENT_YELLOW, textLight: false },
];

const useCases = [
  {
    title: "Carousel",
    desc: "Replace flat carousels with stacked cards that convey depth. Users intuitively understand more content exists behind the top card.",
    icon: "◐",
    accent: ACCENT_PURPLE,
  },
  {
    title: "Deck Selection",
    desc: "Card games, flash cards, and quiz apps use physical deck metaphors. The stack signals a collection of discrete, selectable items.",
    icon: "▤",
    accent: ACCENT_TEAL,
  },
  {
    title: "Step-by-step",
    desc: "Progress through a multi-step flow by advancing through the deck. Completed steps slip beneath the current card, showing forward motion.",
    icon: "→",
    accent: ACCENT_PINK,
  },
  {
    title: "Gallery",
    desc: "Photo galleries and portfolio showcases gain spatial richness when images are presented as a stack rather than a flat grid.",
    icon: "▣",
    accent: ACCENT_YELLOW,
  },
];

const doRules = [
  "Use scale(0.95) and scale(0.90) for visible depth layers",
  "Offset each card 8px down and 4px right to signal depth",
  "Apply cubic-bezier(0.16,1,0.3,1) for spring-like snap",
  "Keep the top card fully opaque; reduce opacity 10% per layer",
  "Lift the hovered card with a dramatic shadow increase",
  "Limit visible stack depth to 3 cards maximum at rest",
];

const dontRules = [
  "Never stack more than 5 cards — visual noise defeats depth",
  "Never use linear easing — it feels mechanical and flat",
  "Never make all cards fully visible at rest — mystery drives engagement",
  "Never skip the rotation offset — it is the key spatial cue",
  "Never use identical background colors across stacked cards",
  "Never animate the Z-index directly — reorder with state, not transition",
];

const navLinks = [
  { label: "Stack", href: "#stack" },
  { label: "Depth", href: "#depth" },
  { label: "Components", href: "#components" },
  { label: "Colors", href: "#colors" },
  { label: "Use Cases", href: "#usecases" },
  { label: "Rules", href: "#rules" },
];

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function CardStackShowcaseContent() {
  const [isFanned, setIsFanned] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [selectedUseCase, setSelectedUseCase] = useState<number | null>(null);
  const [heroFanned, setHeroFanned] = useState(false);
  const [depthFanned, setDepthFanned] = useState(false);

  // Reorder cards so activeCard is always index 0 (top)
  const orderedCards = [
    cardData[activeCard],
    ...cardData.filter((_, i) => i !== activeCard),
  ];

  const getRestStyle = (i: number): React.CSSProperties => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: cardData.length - i,
    transform: `translateY(${i * 8}px) translateX(${i * 4}px) scale(${1 - i * 0.05}) rotate(${i * 1.5}deg)`,
    opacity: i < 3 ? 1 - i * 0.1 : 0,
    transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
    pointerEvents: i === 0 ? "auto" : "none",
  });

  const getFannedStyle = (i: number): React.CSSProperties => ({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: i,
    transform: `translateY(${i * -6}px) translateX(${(i - 2) * 68}px) rotate(${(i - 2) * 8}deg) scale(0.9)`,
    opacity: 1,
    transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
    pointerEvents: "auto",
  });

  return (
    <div style={{ background: SECONDARY_LIGHT, minHeight: "100vh" }}>

      {/* ============================================================ */}
      {/* 1. FIXED NAV                                                 */}
      {/* ============================================================ */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 56,
          display: "flex",
          alignItems: "center",
          background: `linear-gradient(to right, ${PRIMARY_DARK} 50%, #ffffff 50%)`,
          boxShadow: "0 2px 24px rgba(26,26,46,0.18)",
        }}
      >
        {/* Left half — dark */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            paddingLeft: 24,
            gap: 16,
          }}
        >
          <Link
            href="/styles"
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 13,
              textDecoration: "none",
              letterSpacing: "0.04em",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "color 0.2s",
            }}
          >
            <span style={{ fontSize: 16 }}>&#8592;</span> Styles
          </Link>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
          <Link
            href="/"
            style={{
              color: "#ffffff",
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              letterSpacing: "0.06em",
            }}
          >
            StyleKit{" "}
            <span style={{ color: ACCENT_PURPLE, fontWeight: 400 }}>
              &#8250;
            </span>
          </Link>
        </div>

        {/* Depth icon — center */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 14 - i * 2,
                height: 18 - i * 2,
                borderRadius: 3,
                background: i === 0 ? ACCENT_PURPLE : i === 1 ? ACCENT_TEAL : ACCENT_PINK,
                opacity: 1 - i * 0.25,
                marginLeft: i === 0 ? 0 : -6,
                marginTop: i * 3,
                boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
              }}
            />
          ))}
        </div>

        {/* Right half — light */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: 24,
            gap: 20,
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                color: PRIMARY_DARK,
                fontSize: 12,
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                transition: "color 0.2s",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ============================================================ */}
      {/* 2. HERO                                                      */}
      {/* ============================================================ */}
      <section
        id="hero"
        style={{
          background: PRIMARY_DARK,
          minHeight: "100vh",
          paddingTop: 56,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative orbs */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "15%",
            left: "8%",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${ACCENT_PURPLE}22 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: "10%",
            right: "6%",
            width: 260,
            height: 260,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${ACCENT_TEAL}1a 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "45%",
            right: "18%",
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${ACCENT_PINK}15 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        {/* Hero text */}
        <div style={{ textAlign: "center", marginBottom: 64, zIndex: 2 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.3em",
              color: ACCENT_PURPLE,
              textTransform: "uppercase",
              marginBottom: 20,
              fontWeight: 600,
            }}
          >
            StyleKit / Card Stack
          </div>
          <h1
            style={{
              fontSize: "clamp(56px, 9vw, 112px)",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              margin: 0,
              perspective: "800px",
              perspectiveOrigin: "center",
            }}
          >
            <span
              style={{
                display: "inline-block",
                transform: "rotateX(8deg)",
                transformStyle: "preserve-3d",
                textShadow: `0 4px 32px ${ACCENT_PURPLE}55, 0 0 80px ${ACCENT_PURPLE}22`,
              }}
            >
              CARD
            </span>
            <br />
            <span
              style={{
                display: "inline-block",
                transform: "rotateX(-6deg)",
                transformStyle: "preserve-3d",
                color: ACCENT_PURPLE,
                textShadow: `0 4px 32px ${ACCENT_PURPLE}88`,
              }}
            >
              STACK
            </span>
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 16,
              marginTop: 28,
              letterSpacing: "0.05em",
              maxWidth: 420,
              lineHeight: 1.6,
            }}
          >
            3D layering with Z-axis depth. Cards that fan, lift, and breathe.
            Spatial dimension through perspective.
          </p>
        </div>

        {/* Interactive hero card stack */}
        <div
          style={{ zIndex: 2, textAlign: "center" }}
          onMouseEnter={() => setHeroFanned(true)}
          onMouseLeave={() => setHeroFanned(false)}
        >
          <div
            style={{
              position: "relative",
              width: 280,
              height: 170,
              margin: "0 auto",
              cursor: "pointer",
            }}
          >
            {[4, 3, 2, 1, 0].map((i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 160,
                  borderRadius: 16,
                  background:
                    i === 0
                      ? "#ffffff"
                      : i === 1
                        ? "#f5f3ff"
                        : i === 2
                          ? "#e8f8f7"
                          : i === 3
                            ? "#fff0f6"
                            : "#fffbea",
                  boxShadow: i === 0
                    ? heroFanned
                      ? "0 24px 56px rgba(0,0,0,0.45)"
                      : "0 16px 40px rgba(0,0,0,0.35)"
                    : "0 8px 24px rgba(0,0,0,0.20)",
                  zIndex: heroFanned ? i : 5 - i,
                  transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                  transform: heroFanned
                    ? `translateX(${(i - 2) * 72}px) translateY(${i === 2 ? 0 : Math.abs(i - 2) * 8}px) rotate(${(i - 2) * 9}deg) scale(0.88)`
                    : `translateY(${i * 8}px) translateX(${i * 4}px) scale(${1 - i * 0.05}) rotate(${i * 1.5}deg)`,
                  opacity: heroFanned ? 1 : i < 3 ? 1 - i * 0.1 : 0,
                  overflow: "hidden",
                }}
              >
                {/* Accent stripe */}
                <div
                  style={{
                    height: 5,
                    background:
                      i === 0
                        ? ACCENT_PURPLE
                        : i === 1
                          ? ACCENT_TEAL
                          : i === 2
                            ? ACCENT_PINK
                            : i === 3
                              ? ACCENT_YELLOW
                              : ACCENT_PURPLE,
                    borderRadius: "16px 16px 0 0",
                  }}
                />
                {i === 0 && (
                  <div style={{ padding: "16px 20px" }}>
                    <div
                      style={{
                        fontSize: 10,
                        letterSpacing: "0.15em",
                        color: ACCENT_PURPLE,
                        textTransform: "uppercase",
                        fontWeight: 700,
                        marginBottom: 8,
                      }}
                    >
                      Card Stack
                    </div>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: PRIMARY_DARK,
                        marginBottom: 6,
                      }}
                    >
                      Hover to fan out
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "rgba(26,26,46,0.55)",
                        lineHeight: 1.5,
                      }}
                    >
                      5 cards stacked with depth
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 32,
              fontSize: 12,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Hover the stack to fan
          </div>
        </div>

        {/* Scroll cue */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 1,
              height: 48,
              background: `linear-gradient(to bottom, transparent, ${ACCENT_PURPLE})`,
            }}
          />
          <span
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Scroll
          </span>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. INTERACTIVE CARD DECK                                     */}
      {/* ============================================================ */}
      <section
        id="stack"
        style={{
          background: SECONDARY_LIGHT,
          padding: "120px 24px",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <RevealBlock>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.25em",
                color: ACCENT_PURPLE,
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              Primary Demo
            </div>
            <h2
              style={{
                fontSize: "clamp(32px,5vw,56px)",
                fontWeight: 800,
                color: PRIMARY_DARK,
                margin: "0 0 16px",
                letterSpacing: "-0.02em",
              }}
            >
              Interactive Card Deck
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "rgba(26,26,46,0.55)",
                maxWidth: 480,
                lineHeight: 1.7,
              }}
            >
              Hover to fan the deck. Click any card to bring it to front. The
              stack always shows depth — you can feel there is more beneath.
            </p>
          </RevealBlock>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 80,
              alignItems: "start",
              marginTop: 64,
            }}
          >
            {/* Card stack interactive area */}
            <RevealBlock delay={0.1}>
              <div
                style={{
                  position: "relative",
                  height: 300,
                  cursor: "pointer",
                }}
                onMouseEnter={() => setIsFanned(true)}
                onMouseLeave={() => setIsFanned(false)}
              >
                {orderedCards.map((card, i) => (
                  <div
                    key={card.id}
                    onClick={() => {
                      if (isFanned) {
                        setActiveCard(card.id);
                        setIsFanned(false);
                      }
                    }}
                    style={{
                      ...(isFanned ? getFannedStyle(i) : getRestStyle(i)),
                      height: 200,
                      borderRadius: 16,
                      background: card.bg,
                      boxShadow:
                        i === 0 && !isFanned
                          ? "0 24px 48px rgba(0,0,0,0.18)"
                          : isFanned && i === activeCard
                            ? "0 20px 40px rgba(0,0,0,0.2)"
                            : "0 8px 24px rgba(0,0,0,0.12)",
                      overflow: "hidden",
                      cursor: isFanned ? "pointer" : "default",
                    }}
                  >
                    {/* Accent stripe */}
                    <div
                      style={{
                        height: 5,
                        background: card.accent,
                        borderRadius: "16px 16px 0 0",
                      }}
                    />
                    <div style={{ padding: "20px 24px" }}>
                      <div
                        style={{
                          fontSize: 9,
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          fontWeight: 700,
                          color: card.accent,
                          marginBottom: 10,
                        }}
                      >
                        {card.label}
                      </div>
                      <div
                        style={{
                          fontSize: 17,
                          fontWeight: 700,
                          color: PRIMARY_DARK,
                          marginBottom: 10,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {card.title}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "rgba(26,26,46,0.6)",
                          lineHeight: 1.6,
                        }}
                      >
                        {card.body}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealBlock>

            {/* Controls + explanation */}
            <RevealBlock delay={0.2}>
              <div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: PRIMARY_DARK,
                    marginBottom: 24,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Deck Controls
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <button
                    onClick={() => setIsFanned((f) => !f)}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 12,
                      background: isFanned ? ACCENT_PURPLE : "transparent",
                      color: isFanned ? "#ffffff" : ACCENT_PURPLE,
                      border: `2px solid ${ACCENT_PURPLE}`,
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: "pointer",
                      letterSpacing: "0.04em",
                      transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    {isFanned ? "Collapse Stack" : "Fan Out Stack"}
                  </button>

                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    {cardData.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setActiveCard(c.id);
                          setIsFanned(false);
                        }}
                        style={{
                          padding: "8px 14px",
                          borderRadius: 8,
                          background:
                            activeCard === c.id ? c.accent : "transparent",
                          color:
                            activeCard === c.id
                              ? PRIMARY_DARK
                              : "rgba(26,26,46,0.55)",
                          border: `1.5px solid ${activeCard === c.id ? c.accent : "rgba(26,26,46,0.15)"}`,
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: "pointer",
                          letterSpacing: "0.04em",
                          transition: "all 0.2s",
                        }}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 32,
                    padding: "20px 24px",
                    borderRadius: 12,
                    background: `${PRIMARY_DARK}08`,
                    borderLeft: `3px solid ${ACCENT_PURPLE}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      color: ACCENT_PURPLE,
                      textTransform: "uppercase",
                      fontWeight: 700,
                      marginBottom: 8,
                    }}
                  >
                    Current top card
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: PRIMARY_DARK,
                    }}
                  >
                    {cardData[activeCard].title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(26,26,46,0.5)",
                      marginTop: 4,
                    }}
                  >
                    Index {activeCard} of {cardData.length - 1} — click any
                    card in fanned state to reorder
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 20,
                    fontSize: 12,
                    color: "rgba(26,26,46,0.4)",
                    lineHeight: 1.7,
                  }}
                >
                  The deck hover detection uses onMouseEnter/onMouseLeave on
                  the container, not individual cards. This prevents flickering
                  as the pointer moves between stacked elements.
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. DEPTH MECHANICS DEMO                                      */}
      {/* ============================================================ */}
      <section
        id="depth"
        style={{
          background: PRIMARY_DARK,
          padding: "120px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* BG texture */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle at 20% 40%, ${ACCENT_PURPLE}15 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${ACCENT_TEAL}10 0%, transparent 50%)`,
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 960, margin: "0 auto", position: "relative" }}>
          <RevealBlock>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.25em",
                color: ACCENT_TEAL,
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              Depth Mechanics
            </div>
            <h2
              style={{
                fontSize: "clamp(28px,4.5vw,48px)",
                fontWeight: 800,
                color: "#ffffff",
                margin: "0 0 48px",
                letterSpacing: "-0.02em",
              }}
            >
              At Rest vs Fanned State
            </h2>
          </RevealBlock>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 48,
            }}
          >
            {/* At rest */}
            <RevealBlock delay={0.1}>
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 20,
                  padding: "40px 32px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    color: ACCENT_PURPLE,
                    textTransform: "uppercase",
                    fontWeight: 700,
                    marginBottom: 32,
                  }}
                >
                  At Rest
                </div>

                {/* Mini stack demo — rest */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 40,
                  }}
                >
                  <div style={{ position: "relative", width: 200, height: 160 }}>
                    {[2, 1, 0].map((i) => (
                      <div
                        key={i}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: "50%",
                          marginLeft: -80,
                          width: 160,
                          height: 110,
                          borderRadius: 12,
                          background: i === 0 ? "#fff" : i === 1 ? "#f0eeff" : "#e4e0ff",
                          boxShadow:
                            i === 0
                              ? "0 12px 32px rgba(0,0,0,0.35)"
                              : "0 6px 16px rgba(0,0,0,0.20)",
                          borderTop: `4px solid ${i === 0 ? ACCENT_PURPLE : i === 1 ? ACCENT_TEAL : ACCENT_PINK}`,
                          zIndex: 3 - i,
                          transform: `translateY(${i * 10}px) translateX(${i * 5}px) scale(${1 - i * 0.06}) rotate(${i * 2}deg)`,
                          opacity: 1 - i * 0.12,
                          transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Annotations */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "Card 0 (top)", value: "scale(1.00), rotate(0deg)", color: ACCENT_PURPLE },
                    { label: "Card 1", value: "scale(0.94), rotate(2deg), Y+10 X+5", color: ACCENT_TEAL },
                    { label: "Card 2", value: "scale(0.88), rotate(4deg), Y+20 X+10", color: ACCENT_PINK },
                  ].map((row) => (
                    <div
                      key={row.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 16px",
                        borderRadius: 8,
                        background: "rgba(255,255,255,0.05)",
                        border: `1px solid ${row.color}33`,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          color: row.color,
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {row.label}
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.45)",
                          fontFamily: "monospace",
                        }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Fanned */}
            <RevealBlock delay={0.2}>
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 20,
                  padding: "40px 32px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 32,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: "0.18em",
                      color: ACCENT_TEAL,
                      textTransform: "uppercase",
                      fontWeight: 700,
                    }}
                  >
                    Fanned Out
                  </div>
                  <button
                    onClick={() => setDepthFanned((f) => !f)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 8,
                      background: depthFanned ? ACCENT_TEAL : "transparent",
                      color: depthFanned ? PRIMARY_DARK : ACCENT_TEAL,
                      border: `1.5px solid ${ACCENT_TEAL}`,
                      fontSize: 11,
                      fontWeight: 600,
                      cursor: "pointer",
                      letterSpacing: "0.06em",
                      transition: "all 0.25s",
                    }}
                  >
                    {depthFanned ? "Collapse" : "Animate"}
                  </button>
                </div>

                {/* Mini stack demo — fanned */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 40,
                    height: 140,
                  }}
                >
                  <div style={{ position: "relative", width: 240, height: 130 }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: "50%",
                          marginLeft: -60,
                          width: 120,
                          height: 90,
                          borderRadius: 10,
                          background: i === 0 ? "#fff" : i === 1 ? "#f0eeff" : "#e4e0ff",
                          boxShadow: "0 8px 24px rgba(0,0,0,0.28)",
                          borderTop: `4px solid ${i === 0 ? ACCENT_PURPLE : i === 1 ? ACCENT_TEAL : ACCENT_PINK}`,
                          zIndex: i,
                          transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                          transform: depthFanned
                            ? `translateX(${(i - 1) * 88}px) rotate(${(i - 1) * 10}deg) scale(0.88) translateY(${i === 1 ? -8 : 0}px)`
                            : `translateY(${i * 8}px) translateX(${i * 4}px) scale(${1 - i * 0.05}) rotate(${i * 2}deg)`,
                          opacity: depthFanned ? 1 : 1 - i * 0.12,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Annotations */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { label: "Card 0 (left)", value: "translateX(-88px) rotate(-10deg)", color: ACCENT_PURPLE },
                    { label: "Card 1 (center)", value: "translateX(0) translateY(-8px) scale(0.88)", color: ACCENT_TEAL },
                    { label: "Card 2 (right)", value: "translateX(+88px) rotate(+10deg)", color: ACCENT_PINK },
                  ].map((row) => (
                    <div
                      key={row.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 16px",
                        borderRadius: 8,
                        background: "rgba(255,255,255,0.05)",
                        border: `1px solid ${row.color}33`,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          color: row.color,
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {row.label}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          color: "rgba(255,255,255,0.45)",
                          fontFamily: "monospace",
                        }}
                      >
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Transform code snippet */}
          <RevealBlock delay={0.3}>
            <div
              style={{
                marginTop: 48,
                background: "rgba(255,255,255,0.04)",
                borderRadius: 16,
                padding: "32px 36px",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: ACCENT_YELLOW,
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: 20,
                }}
              >
                Transform Formula
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 24,
                }}
              >
                {[
                  {
                    label: "At Rest (i = card index)",
                    code: `translateY(i × 8px)
translateX(i × 4px)
scale(1 − i × 0.05)
rotate(i × 1.5deg)
opacity(1 − i × 0.10)`,
                    color: ACCENT_PURPLE,
                  },
                  {
                    label: "Fanned Out",
                    code: `translateX((i − 2) × 68px)
translateY(i × −6px)
rotate((i − 2) × 8deg)
scale(0.90)
opacity(1.00)`,
                    color: ACCENT_TEAL,
                  },
                ].map((block) => (
                  <div key={block.label}>
                    <div
                      style={{
                        fontSize: 11,
                        color: block.color,
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        marginBottom: 10,
                      }}
                    >
                      {block.label}
                    </div>
                    <pre
                      style={{
                        fontSize: 12,
                        color: "rgba(255,255,255,0.65)",
                        fontFamily: "monospace",
                        lineHeight: 1.9,
                        margin: 0,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {block.code}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. COMPONENT SHOWCASE                                        */}
      {/* ============================================================ */}
      <section
        id="components"
        style={{
          background: "#f7f7fc",
          padding: "120px 24px",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <RevealBlock>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.25em",
                color: ACCENT_PURPLE,
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              Components
            </div>
            <h2
              style={{
                fontSize: "clamp(28px,4.5vw,48px)",
                fontWeight: 800,
                color: PRIMARY_DARK,
                margin: "0 0 56px",
                letterSpacing: "-0.02em",
              }}
            >
              Button, Input, and Card Variants
            </h2>
          </RevealBlock>

          {/* Buttons */}
          <RevealBlock delay={0.1}>
            <div
              style={{
                background: "#ffffff",
                borderRadius: 20,
                padding: "40px 40px",
                boxShadow: "0 4px 24px rgba(26,26,46,0.07)",
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  color: "rgba(26,26,46,0.4)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 28,
                }}
              >
                Button Variants
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
                {/* Primary purple */}
                <button
                  style={{
                    padding: "12px 28px",
                    borderRadius: 12,
                    background: ACCENT_PURPLE,
                    color: "#ffffff",
                    border: "none",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                    boxShadow: `0 6px 20px ${ACCENT_PURPLE}44`,
                    transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 12px 28px ${ACCENT_PURPLE}55`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 6px 20px ${ACCENT_PURPLE}44`;
                  }}
                >
                  Primary
                </button>

                {/* Teal */}
                <button
                  style={{
                    padding: "12px 28px",
                    borderRadius: 12,
                    background: ACCENT_TEAL,
                    color: PRIMARY_DARK,
                    border: "none",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                    boxShadow: `0 6px 20px ${ACCENT_TEAL}44`,
                    transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 12px 28px ${ACCENT_TEAL}55`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 6px 20px ${ACCENT_TEAL}44`;
                  }}
                >
                  Secondary
                </button>

                {/* Pink */}
                <button
                  style={{
                    padding: "12px 28px",
                    borderRadius: 12,
                    background: ACCENT_PINK,
                    color: PRIMARY_DARK,
                    border: "none",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                    boxShadow: `0 6px 20px ${ACCENT_PINK}44`,
                    transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  }}
                >
                  Accent
                </button>

                {/* Ghost */}
                <button
                  style={{
                    padding: "12px 28px",
                    borderRadius: 12,
                    background: "transparent",
                    color: ACCENT_PURPLE,
                    border: `2px solid ${ACCENT_PURPLE}`,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                    transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = `${ACCENT_PURPLE}0d`;
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                  }}
                >
                  Ghost
                </button>

                {/* Disabled */}
                <button
                  disabled
                  style={{
                    padding: "12px 28px",
                    borderRadius: 12,
                    background: "rgba(26,26,46,0.08)",
                    color: "rgba(26,26,46,0.3)",
                    border: "none",
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "not-allowed",
                    letterSpacing: "0.04em",
                  }}
                >
                  Disabled
                </button>
              </div>
            </div>
          </RevealBlock>

          {/* Inputs */}
          <RevealBlock delay={0.15}>
            <div
              style={{
                background: "#ffffff",
                borderRadius: 20,
                padding: "40px 40px",
                boxShadow: "0 4px 24px rgba(26,26,46,0.07)",
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  color: "rgba(26,26,46,0.4)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 28,
                }}
              >
                Input Fields
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {[
                  { label: "Default", placeholder: "Enter value...", borderColor: "rgba(26,26,46,0.15)" },
                  { label: "Focused", placeholder: "Active input...", borderColor: ACCENT_PURPLE },
                  { label: "Teal Accent", placeholder: "Search...", borderColor: ACCENT_TEAL },
                  { label: "Error State", placeholder: "Invalid input", borderColor: ACCENT_PINK },
                ].map((inp) => (
                  <div key={inp.label}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 11,
                        fontWeight: 600,
                        color: "rgba(26,26,46,0.5)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}
                    >
                      {inp.label}
                    </label>
                    <input
                      placeholder={inp.placeholder}
                      readOnly
                      style={{
                        display: "block",
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: 10,
                        border: `2px solid ${inp.borderColor}`,
                        fontSize: 14,
                        color: PRIMARY_DARK,
                        background: "#ffffff",
                        outline: "none",
                        boxShadow:
                          inp.borderColor === ACCENT_PURPLE
                            ? `0 0 0 4px ${ACCENT_PURPLE}18`
                            : inp.borderColor === ACCENT_TEAL
                              ? `0 0 0 4px ${ACCENT_TEAL}18`
                              : "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* 3D tilt cards */}
          <RevealBlock delay={0.2}>
            <div
              style={{
                background: "#ffffff",
                borderRadius: 20,
                padding: "40px 40px",
                boxShadow: "0 4px 24px rgba(26,26,46,0.07)",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  color: "rgba(26,26,46,0.4)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  marginBottom: 28,
                }}
              >
                3D Tilt Card — Hover Each
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
                {[
                  { title: "Depth Layer", sub: "Z-axis perspective", accent: ACCENT_PURPLE, icon: "◈" },
                  { title: "Spring Snap", sub: "0.16,1,0.3,1 easing", accent: ACCENT_TEAL, icon: "⊕" },
                  { title: "Hover Lift", sub: "24px shadow elevation", accent: ACCENT_PINK, icon: "◉" },
                ].map((card) => (
                  <div
                    key={card.title}
                    style={{
                      borderRadius: 16,
                      background: "#fafafa",
                      border: "1px solid rgba(26,26,46,0.06)",
                      padding: "28px 24px",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                      boxShadow: "0 4px 16px rgba(26,26,46,0.06)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.transform = "translateY(-6px) rotateX(4deg)";
                      el.style.boxShadow = "0 24px 48px rgba(26,26,46,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.transform = "translateY(0) rotateX(0)";
                      el.style.boxShadow = "0 4px 16px rgba(26,26,46,0.06)";
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: `${card.accent}18`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        color: card.accent,
                        marginBottom: 16,
                      }}
                    >
                      {card.icon}
                    </div>
                    <div
                      style={{
                        height: 3,
                        background: card.accent,
                        borderRadius: 2,
                        width: 32,
                        marginBottom: 16,
                      }}
                    />
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: PRIMARY_DARK,
                        marginBottom: 8,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {card.title}
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: "rgba(26,26,46,0.5)",
                        lineHeight: 1.5,
                      }}
                    >
                      {card.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. COLOR SYSTEM                                              */}
      {/* ============================================================ */}
      <section
        id="colors"
        style={{
          background: SECONDARY_LIGHT,
          padding: "120px 24px",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <RevealBlock>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.25em",
                color: ACCENT_PINK,
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              Color System
            </div>
            <h2
              style={{
                fontSize: "clamp(28px,4.5vw,48px)",
                fontWeight: 800,
                color: PRIMARY_DARK,
                margin: "0 0 16px",
                letterSpacing: "-0.02em",
              }}
            >
              Six-Color Palette
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "rgba(26,26,46,0.55)",
                maxWidth: 520,
                lineHeight: 1.7,
                marginBottom: 56,
              }}
            >
              Deep purple-black anchors every composition. Accent colors
              — purple, teal, pink, yellow — rotate across cards for visual
              variety without sacrificing cohesion.
            </p>
          </RevealBlock>

          {/* Swatches on light background */}
          <RevealBlock delay={0.1}>
            <div
              style={{
                marginBottom: 12,
                fontSize: 11,
                letterSpacing: "0.12em",
                color: "rgba(26,26,46,0.4)",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Light Context
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: 16,
                marginBottom: 48,
              }}
            >
              {colorSwatches.map((s) => (
                <div key={s.name}>
                  <div
                    style={{
                      height: 80,
                      borderRadius: 16,
                      background: s.hex,
                      boxShadow: "0 4px 16px rgba(26,26,46,0.10)",
                      marginBottom: 10,
                      border:
                        s.hex === SECONDARY_LIGHT
                          ? "2px solid rgba(26,26,46,0.12)"
                          : "none",
                      transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px) scale(1.03)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0) scale(1)";
                    }}
                  />
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: PRIMARY_DARK,
                      marginBottom: 2,
                    }}
                  >
                    {s.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(26,26,46,0.4)",
                      fontFamily: "monospace",
                    }}
                  >
                    {s.hex}
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Swatches on dark background */}
          <RevealBlock delay={0.15}>
            <div
              style={{
                background: PRIMARY_DARK,
                borderRadius: 24,
                padding: "40px 40px",
              }}
            >
              <div
                style={{
                  marginBottom: 24,
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Dark Context
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(6, 1fr)",
                  gap: 16,
                }}
              >
                {colorSwatches.map((s) => (
                  <div key={s.name}>
                    <div
                      style={{
                        height: 72,
                        borderRadius: 14,
                        background: s.hex,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
                        marginBottom: 10,
                        border:
                          s.hex === PRIMARY_DARK
                            ? "1.5px solid rgba(255,255,255,0.15)"
                            : "none",
                        transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px) scale(1.03)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0) scale(1)";
                      }}
                    />
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.8)",
                        marginBottom: 2,
                      }}
                    >
                      {s.name}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.35)",
                        fontFamily: "monospace",
                      }}
                    >
                      {s.hex}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. USE CASES                                                 */}
      {/* ============================================================ */}
      <section
        id="usecases"
        style={{
          background: PRIMARY_DARK,
          padding: "120px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(ellipse at 70% 20%, ${ACCENT_PINK}12 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, ${ACCENT_YELLOW}0e 0%, transparent 55%)`,
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 960, margin: "0 auto", position: "relative" }}>
          <RevealBlock>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.25em",
                color: ACCENT_PINK,
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              Use Cases
            </div>
            <h2
              style={{
                fontSize: "clamp(28px,4.5vw,48px)",
                fontWeight: 800,
                color: "#ffffff",
                margin: "0 0 16px",
                letterSpacing: "-0.02em",
              }}
            >
              Where Card Stack Belongs
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.45)",
                maxWidth: 480,
                lineHeight: 1.7,
                marginBottom: 64,
              }}
            >
              The stacked card pattern is most powerful when it replaces flat,
              dimensionless lists with content that has natural depth and order.
            </p>
          </RevealBlock>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 24,
            }}
          >
            {useCases.map((uc, idx) => (
              <RevealBlock key={uc.title} delay={0.1 + idx * 0.08}>
                <div
                  onClick={() =>
                    setSelectedUseCase(selectedUseCase === idx ? null : idx)
                  }
                  style={{
                    borderRadius: 20,
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${selectedUseCase === idx ? uc.accent + "66" : "rgba(255,255,255,0.08)"}`,
                    padding: "32px 32px",
                    cursor: "pointer",
                    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                    boxShadow:
                      selectedUseCase === idx
                        ? `0 12px 40px ${uc.accent}22`
                        : "none",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                    {/* Mini fanned stack */}
                    <div
                      style={{
                        flexShrink: 0,
                        position: "relative",
                        width: 72,
                        height: 56,
                        marginTop: 4,
                      }}
                    >
                      {[2, 1, 0].map((i) => (
                        <div
                          key={i}
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: 44,
                            height: 34,
                            borderRadius: 7,
                            background:
                              i === 0
                                ? "#fff"
                                : i === 1
                                  ? "rgba(255,255,255,0.6)"
                                  : "rgba(255,255,255,0.3)",
                            borderTop: `3px solid ${uc.accent}`,
                            zIndex: 3 - i,
                            transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                            transform:
                              selectedUseCase === idx
                                ? `translateX(${(i - 1) * 22}px) rotate(${(i - 1) * 7}deg) scale(0.88)`
                                : `translateY(${i * 5}px) translateX(${i * 3}px) scale(${1 - i * 0.06}) rotate(${i * 2}deg)`,
                            opacity: selectedUseCase === idx ? 1 : 1 - i * 0.2,
                          }}
                        />
                      ))}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          marginBottom: 12,
                        }}
                      >
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 10,
                            background: `${uc.accent}22`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 18,
                            color: uc.accent,
                          }}
                        >
                          {uc.icon}
                        </div>
                        <div
                          style={{
                            fontSize: 17,
                            fontWeight: 700,
                            color: "#ffffff",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {uc.title}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "rgba(255,255,255,0.5)",
                          lineHeight: 1.65,
                        }}
                      >
                        {uc.desc}
                      </div>

                      {selectedUseCase === idx && (
                        <div
                          style={{
                            marginTop: 20,
                            padding: "14px 18px",
                            borderRadius: 10,
                            background: `${uc.accent}15`,
                            border: `1px solid ${uc.accent}33`,
                            fontSize: 12,
                            color: uc.accent,
                            fontWeight: 600,
                            letterSpacing: "0.04em",
                          }}
                        >
                          The mini stack above fans out when this card is
                          selected — demonstrating the pattern within the
                          pattern itself.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. DO / DON'T RULES                                          */}
      {/* ============================================================ */}
      <section
        id="rules"
        style={{
          background: "#f7f7fc",
          padding: "120px 24px",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <RevealBlock>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.25em",
                color: ACCENT_PURPLE,
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              Design Rules
            </div>
            <h2
              style={{
                fontSize: "clamp(28px,4.5vw,48px)",
                fontWeight: 800,
                color: PRIMARY_DARK,
                margin: "0 0 56px",
                letterSpacing: "-0.02em",
              }}
            >
              Do and Don&apos;t
            </h2>
          </RevealBlock>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 32,
            }}
          >
            {/* Do */}
            <RevealBlock delay={0.1}>
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 20,
                  padding: "40px 36px",
                  boxShadow: "0 4px 24px rgba(26,26,46,0.07)",
                  borderTop: `4px solid ${ACCENT_TEAL}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 28,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: `${ACCENT_TEAL}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: ACCENT_TEAL,
                      fontSize: 14,
                      fontWeight: 800,
                    }}
                  >
                    +
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: ACCENT_TEAL,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Do
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {doRules.map((rule) => (
                    <div
                      key={rule}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "12px 16px",
                        borderRadius: 10,
                        background: `${ACCENT_TEAL}08`,
                        border: `1px solid ${ACCENT_TEAL}20`,
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: ACCENT_TEAL,
                          flexShrink: 0,
                          marginTop: 5,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 13,
                          color: "rgba(26,26,46,0.7)",
                          lineHeight: 1.5,
                        }}
                      >
                        {rule}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Don't */}
            <RevealBlock delay={0.2}>
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: 20,
                  padding: "40px 36px",
                  boxShadow: "0 4px 24px rgba(26,26,46,0.07)",
                  borderTop: `4px solid ${ACCENT_PINK}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 28,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: `${ACCENT_PINK}22`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: ACCENT_PINK,
                      fontSize: 14,
                      fontWeight: 800,
                    }}
                  >
                    &minus;
                  </div>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      color: ACCENT_PINK,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Don&apos;t
                  </span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {dontRules.map((rule) => (
                    <div
                      key={rule}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "12px 16px",
                        borderRadius: 10,
                        background: `${ACCENT_PINK}08`,
                        border: `1px solid ${ACCENT_PINK}20`,
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: ACCENT_PINK,
                          flexShrink: 0,
                          marginTop: 5,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 13,
                          color: "rgba(26,26,46,0.7)",
                          lineHeight: 1.5,
                        }}
                      >
                        {rule}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. FOOTER                                                    */}
      {/* ============================================================ */}
      <footer
        style={{
          background: PRIMARY_DARK,
          padding: "80px 24px 56px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative card suit shapes */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          {/* Large fanned card stack decoration top-right */}
          {[4, 3, 2, 1, 0].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: -20,
                right: 80,
                width: 120,
                height: 80,
                borderRadius: 12,
                background:
                  i === 0
                    ? `${ACCENT_PURPLE}22`
                    : i === 1
                      ? `${ACCENT_TEAL}18`
                      : i === 2
                        ? `${ACCENT_PINK}14`
                        : i === 3
                          ? `${ACCENT_YELLOW}10`
                          : "rgba(255,255,255,0.04)",
                border: `1px solid ${i === 0 ? ACCENT_PURPLE : i === 1 ? ACCENT_TEAL : i === 2 ? ACCENT_PINK : ACCENT_YELLOW}33`,
                transform: `translateX(${(i - 2) * 28}px) translateY(${i * 12}px) rotate(${(i - 2) * 7}deg) scale(${1 - i * 0.04})`,
              }}
            />
          ))}

          {/* Small stack decoration bottom-left */}
          {[2, 1, 0].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                bottom: 24,
                left: 60,
                width: 64,
                height: 44,
                borderRadius: 8,
                background:
                  i === 0
                    ? `${ACCENT_TEAL}20`
                    : i === 1
                      ? `${ACCENT_PINK}15`
                      : `${ACCENT_YELLOW}10`,
                border: `1px solid rgba(255,255,255,0.06)`,
                transform: `translateY(${i * 6}px) translateX(${i * 3}px) rotate(${i * 3}deg) scale(${1 - i * 0.06})`,
              }}
            />
          ))}
        </div>

        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* Logo row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 48,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  marginBottom: 6,
                }}
              >
                StyleKit
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(255,255,255,0.35)",
                  letterSpacing: "0.08em",
                }}
              >
                Card Stack Showcase
              </div>
            </div>

            {/* Accent dots */}
            <div style={{ display: "flex", gap: 8 }}>
              {[ACCENT_PURPLE, ACCENT_TEAL, ACCENT_PINK, ACCENT_YELLOW].map((c) => (
                <div
                  key={c}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: c,
                    boxShadow: `0 0 12px ${c}88`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Links */}
          <div
            style={{
              display: "flex",
              gap: 24,
              marginBottom: 48,
              flexWrap: "wrap",
            }}
          >
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.4)",
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.4)";
                }}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)",
              marginBottom: 32,
            }}
          />

          {/* Copyright */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "0.08em",
              }}
            >
              &copy; 2025 StyleKit. Card Stack layout system.
            </div>
            <div
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.06em",
                fontFamily: "monospace",
              }}
            >
              cubic-bezier(0.16, 1, 0.3, 1)
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
