"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Intersection Observer Hook                                          */
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
/*  RevealBlock Component                                               */
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
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const SPRAY_COLORS = [
  {
    name: "SPRAY RED",
    hex: "#ff2d55",
    role: "PRIMARY / DANGER",
    textDark: false,
    rotDeg: "-2deg",
  },
  {
    name: "ASPHALT",
    hex: "#1c1c1e",
    role: "BASE / GROUND",
    textDark: false,
    rotDeg: "1.5deg",
  },
  {
    name: "CYAN SPRAY",
    hex: "#00e5ff",
    role: "ACCENT / ELECTRIC",
    textDark: true,
    rotDeg: "-1deg",
  },
  {
    name: "NEON YELLOW",
    hex: "#ffea00",
    role: "ACCENT / FLASH",
    textDark: true,
    rotDeg: "2deg",
  },
  {
    name: "PURPLE",
    hex: "#b620e0",
    role: "ACCENT / WILDSTYLE",
    textDark: false,
    rotDeg: "-1.5deg",
  },
  {
    name: "ORANGE",
    hex: "#ff6d00",
    role: "ACCENT / HEAT",
    textDark: false,
    rotDeg: "1deg",
  },
];

const GALLERY_ARTWORKS = [
  {
    id: 1,
    title: "WILDSTYLE",
    artist: "ZERO-ONE",
    year: "2024",
    tag: "Colors",
    desc: "Interlocking letters with arrows and connections — the peak of graffiti complexity. No one can read it except the writer.",
    bg: "#ff2d55",
    shadow: "#00e5ff",
    accent: "#ffea00",
    rot: "-1.5deg",
    skew: "-2deg",
  },
  {
    id: 2,
    title: "THROW UP",
    artist: "BRIZ",
    year: "2024",
    tag: "Tags",
    desc: "Bubble letters in two colors. Done fast, done bold. Speed is the style. Every wall, every night.",
    bg: "#00e5ff",
    shadow: "#b620e0",
    accent: "#ff2d55",
    rot: "1deg",
    skew: "1.5deg",
  },
  {
    id: 3,
    title: "BLOCKBUSTER",
    artist: "CROME",
    year: "2023",
    tag: "Colors",
    desc: "Giant chrome letters that cover entire rolling gates. Impossible to miss. Impossible to buff without painting the whole wall.",
    bg: "#b620e0",
    shadow: "#ffea00",
    accent: "#00e5ff",
    rot: "-0.5deg",
    skew: "-1deg",
  },
  {
    id: 4,
    title: "STENCIL RUN",
    artist: "KLUB",
    year: "2023",
    tag: "Tags",
    desc: "Pre-cut cardboard, one spray pass, gone. Reproducible rage. Political. Precise. The street speaks in multiples.",
    bg: "#ffea00",
    shadow: "#ff2d55",
    accent: "#1c1c1e",
    rot: "2deg",
    skew: "1deg",
  },
];

const BUTTON_VARIANTS = [
  {
    label: "BOMB IT",
    bg: "#ff2d55",
    text: "#ffffff",
    shadow: "#00e5ff",
    rot: "-2deg",
    skew: "-2deg",
  },
  {
    label: "THROW UP",
    bg: "transparent",
    text: "#ffea00",
    border: "#ffea00",
    shadow: "#b620e0",
    rot: "1deg",
    skew: "1deg",
  },
  {
    label: "WILDSTYLE",
    bg: "#b620e0",
    text: "#ffffff",
    shadow: "#ffea00",
    rot: "-1deg",
    skew: "-1deg",
  },
  {
    label: "GHOST TAG",
    bg: "#1c1c1e",
    text: "#00e5ff",
    border: "#00e5ff",
    shadow: "#ff2d55",
    rot: "0.5deg",
    skew: "0.5deg",
  },
];

const TYPO_SCALE = [
  {
    label: "DISPLAY",
    size: "text-8xl md:text-9xl",
    weight: "font-black",
    tracking: "tracking-tight",
    color: "#ff2d55",
    sample: "GRAF",
    skew: "-4deg",
    rot: "-1deg",
  },
  {
    label: "H1",
    size: "text-6xl md:text-7xl",
    weight: "font-black",
    tracking: "tracking-tight",
    color: "#00e5ff",
    sample: "STREET",
    skew: "-3deg",
    rot: "0.5deg",
  },
  {
    label: "H2",
    size: "text-4xl md:text-5xl",
    weight: "font-black",
    tracking: "tracking-wider",
    color: "#ffea00",
    sample: "WILDSTYLE",
    skew: "-2deg",
    rot: "-0.5deg",
  },
  {
    label: "H3",
    size: "text-2xl md:text-3xl",
    weight: "font-black",
    tracking: "tracking-widest",
    color: "#b620e0",
    sample: "THROW UP",
    skew: "-1deg",
    rot: "0.5deg",
  },
  {
    label: "BODY",
    size: "text-base md:text-lg",
    weight: "font-bold",
    tracking: "tracking-wide",
    color: "#ffffff",
    sample: "Every wall is a canvas. Every night is a session. No permission needed.",
    skew: "0deg",
    rot: "0deg",
  },
  {
    label: "LABEL",
    size: "text-xs",
    weight: "font-black",
    tracking: "tracking-[0.4em]",
    color: "#ff6d00",
    sample: "TAG / CREW / SPOT / BUFF",
    skew: "0deg",
    rot: "-1deg",
  },
];

const DO_LIST = [
  "Dark bg-[#1c1c1e] as base — asphalt, concrete, city ground",
  "High-saturation spray colors at full intensity — no muted tones",
  "font-black uppercase on all headings with random rotation transforms",
  "text-shadow / drop-shadow for spray paint glow effect",
  "border-4 with hard offset shadows shadow-[Npx_Npx_0px_#color]",
  "skewX / skewY transforms to mimic freehand writing",
  "Mix ultra-large (text-9xl) and ultra-small (text-xs) in same composition",
  "Asymmetric, off-grid layouts — nothing perfectly centered",
];

const DONT_LIST = [
  "No pastel colors — zero tints, zero muted saturation",
  "No thin fonts — font-light or font-normal on headings is forbidden",
  "No symmetric grid layouts — Bauhaus grids are wrong here",
  "No rounded-full on cards — this is not a pill or bubble UI",
  "No backdrop-blur — graffiti does not apologize with frosted glass",
  "No soft box-shadows — use hard offset color shadows only",
  "No centered text blocks — always left-aligned or intentionally broken",
  "No smooth long animations — duration-100 or duration-150, ease-linear",
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const { ref: heroRef, inView: heroInView } = useInView();

  // Gallery filter state
  const [galleryFilter, setGalleryFilter] = useState<"All" | "Colors" | "Tags">("All");

  // Spray color picker state
  const [activeSprayColor, setActiveSprayColor] = useState("#ff2d55");

  // Button pressed state (for stamp-wall Hard Contrast effect)
  const [pressedBtn, setPressedBtn] = useState<number | null>(null);

  // Input value
  const [tagInput, setTagInput] = useState("");

  const filteredArtworks =
    galleryFilter === "All"
      ? GALLERY_ARTWORKS
      : GALLERY_ARTWORKS.filter((a) => a.tag === galleryFilter);

  return (
    <div className="min-h-screen bg-[#1c1c1e] text-white font-sans">

      {/* Brick wall texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(255,255,255,0.02) 31px, rgba(255,255,255,0.02) 32px), repeating-linear-gradient(90deg, transparent, transparent 63px, rgba(255,255,255,0.015) 63px, rgba(255,255,255,0.015) 64px)",
          opacity: 1,
        }}
        aria-hidden="true"
      />

      {/* ================================================================
          SECTION 1 — FIXED NAVIGATION
      ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1c1c1e] border-b-4 border-[#ff2d55]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Back link */}
            <Link
              href="/"
              className="flex items-center gap-2 text-[#ffea00] hover:text-[#00e5ff] transition-colors duration-100 ease-linear group"
            >
              <span
                className="font-black text-lg leading-none"
                style={{ transform: "scaleX(-1)" }}
              >
                &#8594;
              </span>
              <span className="font-black text-xs uppercase tracking-[0.3em] group-hover:skew-x-[-4deg] transition-transform duration-100 ease-linear">
                StyleKit
              </span>
            </Link>

            {/* Logo */}
            <div
              className="flex items-center gap-2"
              style={{ transform: "skewX(-4deg)" }}
            >
              <span
                className="font-black text-xl md:text-2xl uppercase tracking-wider"
                style={{
                  color: "#ff2d55",
                  textShadow: "3px 3px 0px #00e5ff, 6px 6px 0px #b620e0",
                  letterSpacing: "0.08em",
                }}
              >
                GRAFF
              </span>
              <span
                className="font-black text-xl md:text-2xl uppercase tracking-wider text-[#00e5ff]"
                style={{
                  textShadow: "3px 3px 0px #ff2d55",
                }}
              >
                ITI
              </span>
              <span className="hidden md:inline font-black text-xl uppercase tracking-wider text-[#ffea00]">
                STREET
              </span>
            </div>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-0">
              {["Hero", "Components", "Colors", "Typography", "Gallery"].map((item, i) => {
                const colors = ["#ff2d55", "#00e5ff", "#ffea00", "#b620e0", "#ff6d00"];
                return (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="px-4 py-5 text-xs font-black uppercase tracking-widest text-white hover:text-[#1c1c1e] transition-colors duration-100 ease-linear"
                    style={
                      {
                        "--hover-bg": colors[i % colors.length],
                      } as React.CSSProperties
                    }
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        colors[i % colors.length];
                      (e.currentTarget as HTMLElement).style.color = "#1c1c1e";
                      (e.currentTarget as HTMLElement).style.transform = `rotate(${
                        i % 2 === 0 ? "-2deg" : "2deg"
                      }) skewX(${i % 2 === 0 ? "-3deg" : "3deg"})`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "";
                      (e.currentTarget as HTMLElement).style.color = "";
                      (e.currentTarget as HTMLElement).style.transform = "";
                    }}
                  >
                    {item}
                  </a>
                );
              })}
            </nav>

            {/* CTA */}
            <a
              href="#gallery"
              className="px-4 py-2 bg-[#ff2d55] text-white font-black uppercase tracking-widest text-xs border-4 border-[#1c1c1e] shadow-[4px_4px_0px_#00e5ff] hover:shadow-[2px_2px_0px_#00e5ff] hover:translate-x-[2px] hover:translate-y-[2px] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all duration-100 ease-linear"
              style={{ transform: "rotate(-1deg)" }}
            >
              VIEW GALLERY
            </a>
          </div>
        </div>
      </header>

      {/* ================================================================
          SECTION 2 — HERO
      ================================================================ */}
      <section
        id="hero"
        className="pt-16 relative z-10 overflow-hidden"
        ref={heroRef}
      >
        <div className="min-h-screen flex flex-col justify-center relative px-4 md:px-12 py-24">

          {/* Spray splatter decorations — background */}
          <div
            className="absolute top-20 left-[5%] w-40 h-40 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, #ff2d5540 0%, transparent 70%)",
              filter: "blur(1px)",
              opacity: heroInView ? 1 : 0,
              transition: "opacity 1.2s ease 0.1s",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute top-40 right-[8%] w-56 h-56 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, #00e5ff30 0%, transparent 70%)",
              filter: "blur(2px)",
              opacity: heroInView ? 1 : 0,
              transition: "opacity 1.2s ease 0.2s",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-32 left-[20%] w-48 h-48 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, #ffea0025 0%, transparent 70%)",
              opacity: heroInView ? 1 : 0,
              transition: "opacity 1.2s ease 0.3s",
            }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-20 right-[15%] w-32 h-32 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, #b620e035 0%, transparent 70%)",
              opacity: heroInView ? 1 : 0,
              transition: "opacity 1.2s ease 0.35s",
            }}
            aria-hidden="true"
          />

          {/* Paint drip decorations — top edge */}
          {[
            { left: "10%", color: "#ff2d55", h: "5rem", w: "0.5rem", delay: 0.4 },
            { left: "22%", color: "#00e5ff", h: "3.5rem", w: "0.375rem", delay: 0.5 },
            { left: "50%", color: "#ffea00", h: "6rem", w: "0.5rem", delay: 0.45 },
            { left: "68%", color: "#b620e0", h: "4rem", w: "0.375rem", delay: 0.55 },
            { left: "82%", color: "#ff6d00", h: "5.5rem", w: "0.5rem", delay: 0.5 },
          ].map((drip, i) => (
            <div
              key={i}
              className="absolute top-16 pointer-events-none group"
              style={{ left: drip.left }}
              aria-hidden="true"
            >
              <div
                style={{
                  width: drip.w,
                  height: drip.h,
                  backgroundColor: drip.color,
                  borderRadius: "0 0 9999px 9999px",
                  opacity: heroInView ? 0.7 : 0,
                  transform: heroInView ? "scaleY(1)" : "scaleY(0)",
                  transformOrigin: "top",
                  transition: `opacity 0.4s ease ${drip.delay}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${drip.delay}s`,
                }}
              />
            </div>
          ))}

          {/* Hero content */}
          <div className="max-w-7xl mx-auto w-full">
            {/* Kicker */}
            <div
              style={{
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? "translateY(0) rotate(-2deg)" : "translateY(20px) rotate(-2deg)",
                transition: "opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s",
              }}
            >
              <span
                className="inline-block text-xs font-black uppercase tracking-[0.5em] mb-6"
                style={{
                  color: "#ffea00",
                  transform: "rotate(-2deg)",
                  display: "inline-block",
                }}
              >
                No Permission Needed — The City Is The Canvas
              </span>
            </div>

            {/* Main title — massive skewed spray-paint style */}
            <div
              style={{
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? "translateX(0)" : "translateX(-60px)",
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s",
              }}
            >
              <h1
                className="font-black uppercase leading-none mb-2"
                style={{
                  fontSize: "clamp(5rem, 16vw, 14rem)",
                  letterSpacing: "-0.02em",
                  transform: "skewX(-5deg)",
                  color: "#ff2d55",
                  textShadow: "6px 6px 0px #00e5ff, 12px 12px 0px rgba(0,229,255,0.3)",
                  lineHeight: 0.9,
                }}
              >
                GRAFF
              </h1>
            </div>

            <div
              style={{
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? "translateX(0)" : "translateX(60px)",
                transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s",
              }}
            >
              <h1
                className="font-black uppercase leading-none mb-8"
                style={{
                  fontSize: "clamp(3rem, 12vw, 10rem)",
                  letterSpacing: "0.04em",
                  transform: "skewX(-3deg) rotate(1deg)",
                  color: "#ffffff",
                  textShadow: "5px 5px 0px #b620e0",
                  lineHeight: 0.9,
                  paddingLeft: "clamp(1rem, 4vw, 6rem)",
                }}
              >
                ITI <span style={{ color: "#00e5ff", textShadow: "4px 4px 0px #ff2d55" }}>STREET</span>
              </h1>
            </div>

            {/* Subtext + buttons */}
            <div
              className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16"
              style={{
                opacity: heroInView ? 1 : 0,
                transform: heroInView ? "translateY(0)" : "translateY(40px)",
                transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
              }}
            >
              <p
                className="max-w-md text-base md:text-lg font-bold text-white/70 leading-relaxed"
                style={{ transform: "rotate(-0.5deg)" }}
              >
                Urban graffiti culture, raw spray-paint energy, asymmetric layouts,
                high-saturation color clashes, bold skewed typography.
                Born on the subways. Lives on every surface.
              </p>

              <div className="flex flex-wrap gap-4">
                {/* Primary CTA — hard shadow */}
                <a
                  href="#components"
                  className="px-10 py-4 font-black uppercase tracking-wider text-base text-white border-4 border-[#1c1c1e] shadow-[6px_6px_0px_#00e5ff] hover:shadow-[3px_3px_0px_#00e5ff] hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all duration-100 ease-linear"
                  style={{
                    backgroundColor: "#ff2d55",
                    transform: "rotate(-2deg) skewX(-2deg)",
                  }}
                >
                  EXPLORE
                </a>

                {/* Secondary CTA — outline hard shadow */}
                <a
                  href="#gallery"
                  className="px-10 py-4 font-black uppercase tracking-wider text-base border-4 shadow-[6px_6px_0px_#b620e0] hover:shadow-[3px_3px_0px_#b620e0] hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all duration-100 ease-linear"
                  style={{
                    backgroundColor: "transparent",
                    color: "#ffea00",
                    borderColor: "#ffea00",
                    transform: "rotate(1deg)",
                  }}
                >
                  GALLERY
                </a>
              </div>
            </div>

            {/* Stats strip */}
            <div
              className="mt-16 flex flex-wrap gap-0 border-t-4 border-[#ff2d55] pt-8"
              style={{
                opacity: heroInView ? 1 : 0,
                transition: "opacity 0.6s ease 0.7s",
              }}
            >
              {[
                { value: "5", label: "ACCENT COLORS", color: "#ff2d55" },
                { value: "0", label: "PERMISSIONS", color: "#00e5ff" },
                { value: "100%", label: "SATURATION", color: "#ffea00" },
                { value: "RAW", label: "ENERGY", color: "#b620e0" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex-1 min-w-[120px] px-4 md:px-8 py-4 border-r-4 last:border-r-0"
                  style={{ borderColor: "#ff2d55" }}
                >
                  <p
                    className="font-black text-4xl md:text-5xl leading-none"
                    style={{
                      color: stat.color,
                      textShadow: `2px 2px 0px rgba(0,0,0,0.5)`,
                      transform: `rotate(${i % 2 === 0 ? "-1deg" : "1deg"})`,
                      display: "block",
                    }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-white/50 mt-2">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — COMPONENT DEMOS
      ================================================================ */}
      <section id="components" className="py-24 px-4 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">

          <RevealBlock className="mb-16">
            <div className="border-b-4 border-[#00e5ff] pb-6">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-[#00e5ff] mb-3">
                COMPONENT SYSTEM / UI ELEMENTS
              </p>
              <h2
                className="text-5xl md:text-7xl font-black uppercase leading-none"
                style={{
                  transform: "skewX(-4deg)",
                  textShadow: "4px 4px 0px #ff2d55",
                }}
              >
                COMPONENTS
              </h2>
            </div>
          </RevealBlock>

          {/* — Buttons — */}
          <RevealBlock className="mb-16">
            <div className="border-4 border-[#ff2d55] p-6 md:p-10 relative"
              style={{ boxShadow: "6px 6px 0px #b620e0" }}
            >
              <p
                className="text-xs font-black uppercase tracking-[0.3em] text-[#ff2d55] mb-8 border-l-4 border-[#ff2d55] pl-4"
                style={{ transform: "rotate(-0.5deg)" }}
              >
                BUTTON VARIANTS — HARD OFFSET SHADOWS + VANDALISM SNAP
              </p>
              <div className="flex flex-wrap gap-6 items-start">
                {BUTTON_VARIANTS.map((btn, i) => (
                  <button
                    key={btn.label}
                    onMouseDown={() => setPressedBtn(i)}
                    onMouseUp={() => setPressedBtn(null)}
                    onMouseLeave={() => setPressedBtn(null)}
                    className="px-8 py-4 font-black uppercase tracking-widest text-sm border-4 transition-all duration-100 ease-linear"
                    style={{
                      backgroundColor: btn.bg,
                      color: btn.text,
                      borderColor: btn.border ?? "#1c1c1e",
                      boxShadow:
                        pressedBtn === i
                          ? "none"
                          : `5px 5px 0px ${btn.shadow}`,
                      transform:
                        pressedBtn === i
                          ? `translate(5px, 5px) rotate(${btn.rot}) skewX(${btn.skew})`
                          : `rotate(${btn.rot}) skewX(${btn.skew})`,
                    }}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* Active press indicator */}
              <div className="mt-8 pt-6 border-t-4 border-[#ff2d55]/30">
                <p className="text-xs font-bold text-white/40 uppercase tracking-[0.3em]">
                  Active State: removes shadow + shifts position — "stamps the wall"
                </p>
              </div>
            </div>
          </RevealBlock>

          {/* — Cards with paint drip hover — */}
          <RevealBlock className="mb-16">
            <div className="border-4 border-[#00e5ff] p-6 md:p-10 relative"
              style={{ boxShadow: "6px 6px 0px #ffea00" }}
            >
              <p
                className="text-xs font-black uppercase tracking-[0.3em] text-[#00e5ff] mb-8 border-l-4 border-[#00e5ff] pl-4"
                style={{ transform: "rotate(-0.5deg)" }}
              >
                CARD HOVER — PAINT DRIP ANIMATION ON HOVER
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "WILDSTYLE", accent: "#ff2d55", shadow: "#00e5ff", badge: "COMPLEX", rot: "-1.5deg" },
                  { title: "THROW UP", accent: "#00e5ff", shadow: "#b620e0", badge: "QUICK", rot: "1deg" },
                  { title: "STENCIL", accent: "#ffea00", shadow: "#ff6d00", badge: "PRECISE", rot: "-0.5deg" },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="relative overflow-hidden border-4 p-6 group cursor-pointer transition-all duration-150 ease-linear"
                    style={{
                      borderColor: card.accent,
                      boxShadow: `5px 5px 0px ${card.shadow}`,
                      transform: `rotate(${card.rot})`,
                      backgroundColor: "#1c1c1e",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform =
                        `rotate(${card.rot}) skewY(-1deg)`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform =
                        `rotate(${card.rot})`;
                    }}
                  >
                    {/* Paint drip — stretches on hover via group-hover */}
                    <div
                      className="absolute top-0 right-6 rounded-b-full pointer-events-none"
                      style={{
                        width: "0.5rem",
                        height: "3rem",
                        backgroundColor: card.accent,
                        opacity: 0.6,
                        transition: "height 0.15s ease-linear",
                      }}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute top-0 right-12 rounded-b-full pointer-events-none"
                      style={{
                        width: "0.375rem",
                        height: "1.5rem",
                        backgroundColor: card.shadow,
                        opacity: 0.4,
                        transition: "height 0.15s ease-linear 0.05s",
                      }}
                      aria-hidden="true"
                    />
                    <div className="pointer-events-none">
                      {/* Using group-hover classes for drip effect */}
                    </div>

                    <span
                      className="inline-block px-3 py-1 text-xs font-black uppercase tracking-widest mb-4 text-[#1c1c1e]"
                      style={{ backgroundColor: card.accent, transform: "rotate(-1deg)" }}
                    >
                      {card.badge}
                    </span>
                    <h3
                      className="text-3xl font-black uppercase mb-3 group-hover:skew-x-[-3deg] transition-transform duration-100 ease-linear"
                      style={{
                        color: card.accent,
                        textShadow: `3px 3px 0px ${card.shadow}`,
                      }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-sm font-bold text-white/60 leading-relaxed">
                      Hit the wall. Leave your mark. Come back tomorrow.
                    </p>
                    <div
                      className="mt-4 h-1 w-12 group-hover:w-full transition-all duration-150 ease-linear"
                      style={{ backgroundColor: card.accent }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* — Input with neon focus — */}
          <RevealBlock>
            <div className="border-4 border-[#b620e0] p-6 md:p-10 relative"
              style={{ boxShadow: "6px 6px 0px #ff6d00" }}
            >
              <p
                className="text-xs font-black uppercase tracking-[0.3em] text-[#b620e0] mb-8 border-l-4 border-[#b620e0] pl-4"
                style={{ transform: "rotate(-0.5deg)" }}
              >
                INPUT FIELDS — NEON FOCUS BORDER + SPRAY GLOW
              </p>
              <div className="max-w-lg space-y-5">
                <div>
                  <label
                    className="block text-xs font-black uppercase tracking-[0.3em] text-[#ffea00] mb-2"
                    style={{ transform: "rotate(-0.5deg)", display: "block" }}
                  >
                    YOUR TAG NAME
                  </label>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="WRITE YOUR NAME..."
                    className="w-full px-6 py-4 bg-[#1c1c1e] border-4 border-[#ff2d55]/60 text-white placeholder-white/20 font-black uppercase tracking-wide focus:outline-none transition-all duration-100 ease-linear"
                    style={{
                      borderRadius: 0,
                    }}
                    onFocus={(e) => {
                      (e.target as HTMLElement).style.borderColor = "#00e5ff";
                      (e.target as HTMLElement).style.boxShadow =
                        "0 0 0 2px #00e5ff40, 4px 4px 0px #b620e0";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLElement).style.borderColor = "rgba(255,45,85,0.6)";
                      (e.target as HTMLElement).style.boxShadow = "";
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-black uppercase tracking-[0.3em] text-[#ffea00] mb-2"
                    style={{ transform: "rotate(-0.5deg)", display: "block" }}
                  >
                    CREW / SQUAD
                  </label>
                  <input
                    type="text"
                    placeholder="YOUR CREW NAME..."
                    className="w-full px-6 py-4 bg-[#1c1c1e] border-4 border-[#ff2d55]/60 text-white placeholder-white/20 font-black uppercase tracking-wide focus:outline-none transition-all duration-100 ease-linear"
                    style={{ borderRadius: 0 }}
                    onFocus={(e) => {
                      (e.target as HTMLElement).style.borderColor = "#ffea00";
                      (e.target as HTMLElement).style.boxShadow =
                        "0 0 0 2px #ffea0040, 4px 4px 0px #ff6d00";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLElement).style.borderColor = "rgba(255,45,85,0.6)";
                      (e.target as HTMLElement).style.boxShadow = "";
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-black uppercase tracking-[0.3em] text-[#ffea00] mb-2"
                    style={{ transform: "rotate(-0.5deg)", display: "block" }}
                  >
                    MESSAGE / MANIFESTO
                  </label>
                  <textarea
                    rows={3}
                    placeholder="SAY SOMETHING TO THE CITY..."
                    className="w-full px-6 py-4 bg-[#1c1c1e] border-4 border-[#ff2d55]/60 text-white placeholder-white/20 font-black uppercase tracking-wide focus:outline-none transition-all duration-100 ease-linear resize-none"
                    style={{ borderRadius: 0 }}
                    onFocus={(e) => {
                      (e.target as HTMLElement).style.borderColor = "#b620e0";
                      (e.target as HTMLElement).style.boxShadow =
                        "0 0 0 2px #b620e040, 4px 4px 0px #ffea00";
                    }}
                    onBlur={(e) => {
                      (e.target as HTMLElement).style.borderColor = "rgba(255,45,85,0.6)";
                      (e.target as HTMLElement).style.boxShadow = "";
                    }}
                  />
                </div>
                <button
                  className="px-10 py-4 bg-[#ff2d55] text-white font-black uppercase tracking-widest text-sm border-4 border-[#1c1c1e] shadow-[5px_5px_0px_#00e5ff] hover:shadow-[2px_2px_0px_#00e5ff] hover:translate-x-[3px] hover:translate-y-[3px] active:shadow-none active:translate-x-[5px] active:translate-y-[5px] transition-all duration-100 ease-linear"
                  style={{ transform: "rotate(-1deg)" }}
                >
                  BOMB IT
                </button>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 — COLOR SYSTEM
      ================================================================ */}
      <section id="colors" className="py-24 px-4 md:px-12 relative z-10 bg-[#111113]">
        <div className="max-w-7xl mx-auto">

          <RevealBlock className="mb-16">
            <div className="border-b-4 border-[#ffea00] pb-6">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-[#ffea00] mb-3">
                SPRAY CAN COLLECTION / COLOR SYSTEM
              </p>
              <h2
                className="text-5xl md:text-7xl font-black uppercase leading-none"
                style={{
                  transform: "skewX(-4deg)",
                  textShadow: "4px 4px 0px #b620e0",
                  color: "#ffea00",
                }}
              >
                PALETTE
              </h2>
            </div>
          </RevealBlock>

          {/* Interactive spray color picker */}
          <RevealBlock className="mb-12" delay={0.05}>
            <div
              className="border-4 border-[#ffffff]/20 p-6 mb-8"
              style={{ boxShadow: `6px 6px 0px ${activeSprayColor}` }}
            >
              <p className="text-xs font-black uppercase tracking-[0.3em] text-white/60 mb-4">
                ACTIVE SPRAY COLOR — CLICK A SWATCH TO CHANGE
              </p>
              <div className="flex items-center gap-6">
                <div
                  className="w-24 h-24 border-4 border-[#1c1c1e] flex-shrink-0 transition-all duration-150 ease-linear"
                  style={{
                    backgroundColor: activeSprayColor,
                    boxShadow: `6px 6px 0px ${activeSprayColor}80`,
                  }}
                />
                <div>
                  <p
                    className="font-black text-3xl md:text-4xl uppercase leading-none mb-1"
                    style={{
                      color: activeSprayColor,
                      textShadow: `3px 3px 0px rgba(0,0,0,0.5)`,
                      transform: "skewX(-3deg)",
                      display: "block",
                    }}
                  >
                    {SPRAY_COLORS.find((c) => c.hex === activeSprayColor)?.name ?? ""}
                  </p>
                  <p className="font-mono text-sm font-bold text-white/60 tracking-widest uppercase">
                    {activeSprayColor} &mdash;{" "}
                    {SPRAY_COLORS.find((c) => c.hex === activeSprayColor)?.role ?? ""}
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>

          {/* Spray can swatches */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {SPRAY_COLORS.map((color, i) => (
              <RevealBlock key={color.hex} delay={i * 0.07}>
                <button
                  onClick={() => setActiveSprayColor(color.hex)}
                  className="w-full text-left transition-all duration-100 ease-linear group"
                  style={{
                    transform: `rotate(${color.rotDeg})`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      `rotate(${color.rotDeg}) skewY(-2deg) scale(1.05)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      `rotate(${color.rotDeg})`;
                  }}
                >
                  {/* Spray can body */}
                  <div
                    className="relative border-4 border-[#1c1c1e] overflow-hidden"
                    style={{
                      backgroundColor: color.hex,
                      boxShadow:
                        activeSprayColor === color.hex
                          ? `0 0 0 3px #ffffff, 6px 6px 0px rgba(0,0,0,0.6)`
                          : `4px 4px 0px rgba(0,0,0,0.6)`,
                    }}
                  >
                    {/* Spray highlight */}
                    <div
                      className="absolute top-2 left-2 w-3 h-6 rounded-full opacity-30"
                      style={{ backgroundColor: "#ffffff" }}
                      aria-hidden="true"
                    />

                    <div className="p-4 pt-8 pb-6">
                      {/* Spray drip decoration */}
                      <div
                        className="absolute top-0 right-4 rounded-b-full"
                        style={{
                          width: "0.375rem",
                          height: "2rem",
                          backgroundColor: "rgba(0,0,0,0.2)",
                        }}
                        aria-hidden="true"
                      />

                      <p
                        className="font-black text-xs uppercase tracking-widest leading-tight mb-1"
                        style={{ color: color.textDark ? "#000000" : "#ffffff" }}
                      >
                        {color.name}
                      </p>
                      <p
                        className="font-mono text-xs tracking-wider"
                        style={{ color: color.textDark ? "#00000080" : "#ffffff80" }}
                      >
                        {color.hex}
                      </p>
                    </div>
                  </div>

                  <p
                    className="text-xs font-bold uppercase tracking-widest mt-2 text-white/40"
                    style={{ transform: "rotate(-0.5deg)", display: "block" }}
                  >
                    {color.role}
                  </p>
                </button>
              </RevealBlock>
            ))}
          </div>

          {/* Color rule */}
          <RevealBlock delay={0.5} className="mt-12">
            <div className="border-4 border-[#ff2d55] p-6 md:p-8"
              style={{ boxShadow: "6px 6px 0px #ff2d55" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-[#ff2d55] mb-4">
                    COLOR RULE — DO
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Full saturation always — no tints, no muted tones",
                      "High-contrast color clashes — red on black, cyan on red",
                      "Use color as impact, not decoration",
                      "Multiple accent colors in same composition = energy",
                    ].map((rule, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="font-black text-[#ff2d55] text-sm flex-shrink-0">+</span>
                        <span className="text-xs font-bold text-white/70 uppercase tracking-wide">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-white/30 mb-4">
                    COLOR RULE — NEVER
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Pastels or muted tones — they kill the energy",
                      "Gradients — spray paint bleeds, not blends",
                      "Single-color compositions — clash is the point",
                      "White as primary — it is background only",
                    ].map((rule, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="font-black text-white/30 text-sm flex-shrink-0">-</span>
                        <span className="text-xs font-bold text-white/30 uppercase tracking-wide line-through decoration-white/20">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 — TYPOGRAPHY SHOWCASE
      ================================================================ */}
      <section id="typography" className="py-24 px-4 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">

          <RevealBlock className="mb-16">
            <div className="border-b-4 border-[#b620e0] pb-6">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-[#b620e0] mb-3">
                TYPE SYSTEM / STREET LETTERING
              </p>
              <h2
                className="text-5xl md:text-7xl font-black uppercase leading-none"
                style={{
                  transform: "skewX(-4deg)",
                  textShadow: "4px 4px 0px #ffea00",
                  color: "#b620e0",
                }}
              >
                TYPOGRAPHY
              </h2>
            </div>
          </RevealBlock>

          {/* Type scale */}
          <div className="space-y-0 border-4 border-[#b620e0]"
            style={{ boxShadow: "8px 8px 0px #ffea00" }}
          >
            {TYPO_SCALE.map((item, i) => (
              <RevealBlock key={item.label} delay={i * 0.07}>
                <div
                  className="px-6 md:px-10 py-6 border-b-4 last:border-b-0 border-[#ffffff]/10 group cursor-default transition-all duration-100 ease-linear"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      `${item.color}15`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "";
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-6">
                    {/* Label */}
                    <div className="w-20 flex-shrink-0">
                      <span
                        className="text-xs font-black uppercase tracking-[0.3em]"
                        style={{ color: item.color }}
                      >
                        {item.label}
                      </span>
                    </div>

                    {/* Sample text */}
                    <div className="flex-1 overflow-hidden">
                      <p
                        className={`${item.size} ${item.weight} ${item.tracking} uppercase leading-none`}
                        style={{
                          color: item.color,
                          transform: `skewX(${item.skew}) rotate(${item.rot})`,
                          textShadow:
                            i < 3
                              ? `3px 3px 0px rgba(0,0,0,0.5)`
                              : undefined,
                          display: "block",
                        }}
                      >
                        {item.sample}
                      </p>
                    </div>

                    {/* Meta */}
                    <div className="w-48 flex-shrink-0">
                      <p className="text-xs font-mono text-white/30 uppercase tracking-widest">
                        {item.weight} / {item.tracking}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Typography rules */}
          <RevealBlock delay={0.4} className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "ALWAYS UPPERCASE",
                  desc: "Graffiti shouts. Every headline must be uppercase — capitals carry weight, demand attention, refuse to be ignored.",
                  color: "#ff2d55",
                  shadow: "#00e5ff",
                },
                {
                  title: "SKEW + ROTATE",
                  desc: "Transform every headline. skewX(-2deg) to skewX(-5deg) plus slight rotation. Text that sits flat is text that begs to be ignored.",
                  color: "#00e5ff",
                  shadow: "#b620e0",
                },
                {
                  title: "FONT-BLACK ONLY",
                  desc: "Thin fonts have no place on the street. font-black on every headline. Weight is authority. Authority is presence.",
                  color: "#ffea00",
                  shadow: "#ff6d00",
                },
              ].map((card, i) => (
                <div
                  key={card.title}
                  className="border-4 p-6"
                  style={{
                    borderColor: card.color,
                    boxShadow: `5px 5px 0px ${card.shadow}`,
                    transform: `rotate(${i === 1 ? "-0.5deg" : i === 2 ? "1deg" : "-1deg"})`,
                  }}
                >
                  <h3
                    className="text-xl font-black uppercase mb-3"
                    style={{
                      color: card.color,
                      transform: "skewX(-3deg)",
                      textShadow: `2px 2px 0px ${card.shadow}50`,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm font-bold text-white/60 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================
          SECTION 6 — GALLERY
      ================================================================ */}
      <section id="gallery" className="py-24 px-4 md:px-12 relative z-10 bg-[#111113]">
        <div className="max-w-7xl mx-auto">

          <RevealBlock className="mb-12">
            <div className="border-b-4 border-[#ff6d00] pb-6">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-[#ff6d00] mb-3">
                ARTWORK GALLERY / THE WALL
              </p>
              <h2
                className="text-5xl md:text-7xl font-black uppercase leading-none"
                style={{
                  transform: "skewX(-4deg)",
                  textShadow: "4px 4px 0px #ff6d00",
                  color: "#ffffff",
                }}
              >
                GALLERY
              </h2>
            </div>
          </RevealBlock>

          {/* Filter tabs — useState interaction */}
          <RevealBlock className="mb-10" delay={0.05}>
            <div className="flex gap-0 border-4 border-[#ff6d00] w-fit"
              style={{ boxShadow: "4px 4px 0px #ff2d55" }}
            >
              {(["All", "Colors", "Tags"] as const).map((filter, i) => {
                const filterColors = ["#ff6d00", "#00e5ff", "#ffea00"];
                const isActive = galleryFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setGalleryFilter(filter)}
                    className="px-8 py-4 font-black uppercase tracking-widest text-sm border-r-4 last:border-r-0 border-[#ff6d00] transition-all duration-100 ease-linear"
                    style={{
                      backgroundColor: isActive ? filterColors[i] : "transparent",
                      color: isActive ? "#1c1c1e" : filterColors[i],
                      transform: isActive
                        ? `rotate(${i % 2 === 0 ? "-1deg" : "1deg"})`
                        : "none",
                    }}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </RevealBlock>

          {/* Gallery grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArtworks.map((artwork, i) => (
              <RevealBlock key={artwork.id} delay={i * 0.08}>
                <div
                  className="relative overflow-hidden border-4 group cursor-pointer transition-all duration-150 ease-linear"
                  style={{
                    borderColor: artwork.bg,
                    boxShadow: `8px 8px 0px ${artwork.shadow}`,
                    transform: `rotate(${artwork.rot})`,
                    backgroundColor: artwork.bg,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      `rotate(${artwork.rot}) skewX(${artwork.skew}) scale(1.02)`;
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      `4px 4px 0px ${artwork.shadow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      `rotate(${artwork.rot})`;
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      `8px 8px 0px ${artwork.shadow}`;
                  }}
                >
                  {/* Paint drip decorations — stretch on hover */}
                  <div
                    className="absolute top-0 left-8 rounded-b-full pointer-events-none group-hover:h-24 transition-all duration-150 ease-linear"
                    style={{
                      width: "0.625rem",
                      height: "4rem",
                      backgroundColor: "rgba(0,0,0,0.3)",
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute top-0 left-16 rounded-b-full pointer-events-none group-hover:h-16 transition-all duration-150 ease-linear"
                    style={{
                      width: "0.375rem",
                      height: "2.5rem",
                      backgroundColor: "rgba(0,0,0,0.2)",
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="absolute top-0 right-10 rounded-b-full pointer-events-none group-hover:h-20 transition-all duration-150 ease-linear"
                    style={{
                      width: "0.5rem",
                      height: "3rem",
                      backgroundColor: artwork.accent,
                      opacity: 0.7,
                    }}
                    aria-hidden="true"
                  />

                  {/* Spray splatter bg accent */}
                  <div
                    className="absolute bottom-0 right-0 w-32 h-32 rounded-full pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${artwork.accent}30 0%, transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />

                  {/* Content */}
                  <div className="relative p-8 md:p-10">
                    {/* Tag badge */}
                    <span
                      className="inline-block px-3 py-1 text-xs font-black uppercase tracking-widest mb-4 text-[#1c1c1e]"
                      style={{
                        backgroundColor: artwork.accent,
                        transform: "rotate(-1.5deg)",
                      }}
                    >
                      {artwork.tag}
                    </span>

                    {/* Title */}
                    <h3
                      className="font-black uppercase leading-none mb-4 group-hover:skew-x-[-4deg] transition-transform duration-100 ease-linear"
                      style={{
                        fontSize: "clamp(2.5rem, 6vw, 5rem)",
                        color: "#1c1c1e",
                        textShadow: `4px 4px 0px ${artwork.shadow}80`,
                      }}
                    >
                      {artwork.title}
                    </h3>

                    {/* Meta */}
                    <div className="flex items-center gap-4 mb-4">
                      <p
                        className="text-xs font-black uppercase tracking-[0.3em] text-[#1c1c1e]/70"
                        style={{ transform: "rotate(-0.5deg)" }}
                      >
                        {artwork.artist}
                      </p>
                      <div
                        className="w-1 h-1 rounded-full"
                        style={{ backgroundColor: "rgba(28,28,30,0.5)" }}
                        aria-hidden="true"
                      />
                      <p className="text-xs font-black uppercase tracking-[0.3em] text-[#1c1c1e]/70">
                        {artwork.year}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-sm font-bold text-[#1c1c1e]/80 leading-relaxed max-w-sm">
                      {artwork.desc}
                    </p>

                    {/* Bottom bar */}
                    <div
                      className="mt-6 h-1 w-16 group-hover:w-full transition-all duration-150 ease-linear"
                      style={{ backgroundColor: "#1c1c1e" }}
                    />
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Empty state */}
          {filteredArtworks.length === 0 && (
            <div className="text-center py-24">
              <p
                className="text-4xl font-black uppercase text-white/20"
                style={{ transform: "skewX(-4deg) rotate(-2deg)" }}
              >
                NOTHING HERE YET
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ================================================================
          SECTION 7 — DESIGN RULES (DO / DON'T)
      ================================================================ */}
      <section className="py-24 px-4 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">

          <RevealBlock className="mb-16">
            <div className="border-b-4 border-[#00e5ff] pb-6">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-[#00e5ff] mb-3">
                DESIGN RULES / THE CODE
              </p>
              <h2
                className="text-5xl md:text-7xl font-black uppercase leading-none"
                style={{
                  transform: "skewX(-4deg)",
                  textShadow: "4px 4px 0px #00e5ff",
                  color: "#ffffff",
                }}
              >
                THE RULES
              </h2>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-[#ff2d55]"
            style={{ boxShadow: "8px 8px 0px #00e5ff" }}
          >
            {/* DO */}
            <RevealBlock delay={0.05}>
              <div className="md:border-r-4 border-[#ff2d55]">
                <div
                  className="px-6 py-5 border-b-4 border-[#ff2d55] flex items-center gap-3"
                  style={{ backgroundColor: "#ff2d55" }}
                >
                  <span
                    className="font-black text-2xl text-white"
                    style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}
                  >
                    DO
                  </span>
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-white/70">
                    — STREET CODE APPROVED
                  </span>
                </div>
                <ul className="divide-y-4 divide-[#ff2d55]/20">
                  {DO_LIST.map((rule, i) => (
                    <li
                      key={i}
                      className="flex gap-4 px-6 py-4 group hover:bg-[#ff2d55]/10 transition-colors duration-100 ease-linear cursor-default"
                    >
                      <span className="font-black text-[#ff2d55] text-sm flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-100">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs font-bold text-white/70 uppercase tracking-wide leading-relaxed">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* DON'T */}
            <RevealBlock delay={0.1}>
              <div>
                <div className="px-6 py-5 border-b-4 border-[#ffffff]/10 flex items-center gap-3">
                  <span className="font-black text-2xl text-white/20">
                    DON&apos;T
                  </span>
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-white/20">
                    — AGAINST THE CODE
                  </span>
                </div>
                <ul className="divide-y-4 divide-[#ffffff]/10">
                  {DONT_LIST.map((rule, i) => (
                    <li
                      key={i}
                      className="flex gap-4 px-6 py-4 cursor-default"
                    >
                      <span className="font-black text-white/20 text-sm flex-shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs font-bold text-white/25 uppercase tracking-wide leading-relaxed line-through decoration-white/15">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 8 — ANIMATION RULES
      ================================================================ */}
      <section className="py-24 px-4 md:px-12 relative z-10 bg-[#111113]">
        <div className="max-w-7xl mx-auto">

          <RevealBlock className="mb-16">
            <div className="border-b-4 border-[#ff6d00] pb-6">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-[#ff6d00] mb-3">
                MOTION SYSTEM / ANIMATION RULES
              </p>
              <h2
                className="text-5xl md:text-7xl font-black uppercase leading-none"
                style={{
                  transform: "skewX(-4deg)",
                  textShadow: "4px 4px 0px #ff6d00",
                  color: "#ffffff",
                }}
              >
                MOTION
              </h2>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: "PAINT DRIP",
                desc: "Hover stretches drip decorations along Y axis. Height transition on hover: duration-150 ease-linear. The paint falls, doesn't bounce.",
                example: "hover:h-24 transition-all duration-150 ease-linear",
                color: "#ff2d55",
                shadow: "#00e5ff",
                rot: "-1deg",
              },
              {
                name: "VANDALISM SNAP",
                desc: "Aggressive rotation and skew changes on interaction. Hover triggers skewX(-3deg) or skewY(-1deg) snap. No easing — instant skew shift.",
                example: "hover:skewX([-3deg]) duration-100 ease-linear",
                color: "#00e5ff",
                shadow: "#b620e0",
                rot: "0.5deg",
              },
              {
                name: "HARD CONTRAST",
                desc: "Active state instantly removes hard shadow and applies large XY displacement. The button 'stamps' the wall — impact with no smoothing.",
                example: "active:shadow-none active:translate-x-[6px] active:translate-y-[6px]",
                color: "#ffea00",
                shadow: "#ff6d00",
                rot: "-0.5deg",
              },
              {
                name: "ZERO POLISH",
                desc: "Duration-100 or duration-150 maximum. Always ease-linear. No ease-in-out, no cubic-bezier spring. Graffiti does not polish its movements.",
                example: "duration-100 ease-linear / duration-150 ease-linear",
                color: "#b620e0",
                shadow: "#ffea00",
                rot: "1deg",
              },
            ].map((rule, i) => (
              <RevealBlock key={rule.name} delay={i * 0.07}>
                <div
                  className="border-4 p-6 md:p-8 group cursor-default"
                  style={{
                    borderColor: rule.color,
                    boxShadow: `6px 6px 0px ${rule.shadow}`,
                    transform: `rotate(${rule.rot})`,
                  }}
                >
                  <h3
                    className="text-2xl md:text-3xl font-black uppercase mb-3 group-hover:skew-x-[-3deg] transition-transform duration-100 ease-linear"
                    style={{
                      color: rule.color,
                      textShadow: `3px 3px 0px ${rule.shadow}60`,
                    }}
                  >
                    {rule.name}
                  </h3>
                  <p className="text-sm font-bold text-white/60 leading-relaxed mb-4">
                    {rule.desc}
                  </p>
                  <div
                    className="px-4 py-3 border-4 border-[#ffffff]/10"
                    style={{ backgroundColor: `${rule.color}10` }}
                  >
                    <p className="font-mono text-xs text-white/40 uppercase tracking-wide">
                      {rule.example}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 9 — FOOTER
      ================================================================ */}
      <footer className="relative z-10 border-t-4 border-[#ff2d55]">
        {/* Color band */}
        <div className="flex h-3">
          <div className="flex-1 bg-[#ff2d55]" />
          <div className="w-24 bg-[#00e5ff]" />
          <div className="w-20 bg-[#ffea00]" />
          <div className="w-16 bg-[#b620e0]" />
          <div className="w-12 bg-[#ff6d00]" />
        </div>

        <div className="bg-[#1c1c1e] px-4 md:px-12 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-4 border-[#ff2d55] mb-12"
              style={{ boxShadow: "8px 8px 0px #00e5ff" }}
            >
              {/* Brand */}
              <div className="border-b-4 md:border-b-0 md:border-r-4 border-[#ff2d55] p-8">
                <div
                  className="mb-6"
                  style={{ transform: "skewX(-4deg)" }}
                >
                  <p
                    className="font-black text-4xl uppercase leading-none"
                    style={{
                      color: "#ff2d55",
                      textShadow: "4px 4px 0px #00e5ff, 8px 8px 0px #b620e040",
                    }}
                  >
                    GRAFF
                  </p>
                  <p
                    className="font-black text-3xl uppercase leading-none"
                    style={{
                      color: "#00e5ff",
                      textShadow: "3px 3px 0px #ff2d55",
                    }}
                  >
                    ITI STREET
                  </p>
                </div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-[0.3em] leading-relaxed">
                  Urban graffiti culture.
                  Raw spray-paint energy.
                  The city is the canvas.
                </p>
              </div>

              {/* Navigation */}
              <div className="border-b-4 md:border-b-0 md:border-r-4 border-[#ff2d55] p-8">
                <p
                  className="text-xs font-black uppercase tracking-[0.3em] text-[#ffea00] mb-6"
                  style={{ transform: "rotate(-1deg)" }}
                >
                  SECTIONS
                </p>
                <ul className="space-y-3">
                  {[
                    { label: "Hero", href: "#hero" },
                    { label: "Components", href: "#components" },
                    { label: "Color System", href: "#colors" },
                    { label: "Typography", href: "#typography" },
                    { label: "Gallery", href: "#gallery" },
                  ].map((link, i) => {
                    const colors = ["#ff2d55", "#00e5ff", "#ffea00", "#b620e0", "#ff6d00"];
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-xs font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors duration-100 ease-linear flex items-center gap-2 group"
                        >
                          <span
                            className="font-black group-hover:translate-x-1 transition-transform duration-100 ease-linear"
                            style={{ color: colors[i % colors.length] }}
                          >
                            &rarr;
                          </span>
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* StyleKit links */}
              <div className="p-8">
                <p
                  className="text-xs font-black uppercase tracking-[0.3em] text-[#00e5ff] mb-6"
                  style={{ transform: "rotate(0.5deg)" }}
                >
                  STYLEKIT
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    { label: "All Styles", href: "/styles" },
                    { label: "Bauhaus", href: "/styles/bauhaus" },
                    { label: "Neo Brutalist", href: "/styles/neo-brutalist-playful" },
                    { label: "Neon Gradient", href: "/styles/neon-gradient" },
                    { label: "Back to Home", href: "/" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs font-black uppercase tracking-widest text-white/50 hover:text-[#ff2d55] transition-colors duration-100 ease-linear flex items-center gap-2 group"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-100 ease-linear text-[#ff2d55]">
                          &rarr;
                        </span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Color dots */}
                <div className="flex gap-2">
                  {["#ff2d55", "#00e5ff", "#ffea00", "#b620e0", "#ff6d00"].map((c, i) => (
                    <div
                      key={c}
                      className="w-5 h-5 border-2 border-[#1c1c1e] flex-shrink-0"
                      style={{
                        backgroundColor: c,
                        transform: `rotate(${i % 2 === 0 ? "-3deg" : "3deg"})`,
                      }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t-4 border-[#ff2d55]/30 pt-6">
              <p className="text-xs font-bold text-white/30 uppercase tracking-[0.3em]">
                GRAFFITI STREET SHOWCASE &mdash; STYLEKIT DESIGN SYSTEM
              </p>
              <div className="flex items-center gap-4">
                <p
                  className="text-xs font-black uppercase tracking-widest text-[#ff2d55]"
                  style={{ transform: "rotate(-1deg) skewX(-3deg)" }}
                >
                  NO PERMISSION NEEDED
                </p>
                <div
                  className="h-4 w-4 flex-shrink-0"
                  style={{
                    backgroundColor: "#ff2d55",
                    transform: "rotate(45deg)",
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
