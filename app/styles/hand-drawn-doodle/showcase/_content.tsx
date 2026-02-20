"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const colorSwatches = [
  { name: "Ink Black", value: "#2c2c2c", angle: "-2deg", note: "Primary text" },
  { name: "Paper White", value: "#fffef5", angle: "1.5deg", note: "Background" },
  { name: "Red Marker", value: "#ff6b6b", angle: "-1deg", note: "Accent / CTA" },
  { name: "Teal Marker", value: "#4ecdc4", angle: "2deg", note: "Secondary accent" },
  { name: "Yellow Marker", value: "#ffd93d", angle: "-1.5deg", note: "Highlight" },
];

const doRules = [
  "Use dashed borders — they feel hand-drawn and friendly",
  "Rotate elements slightly (-2deg to +2deg) for organic charm",
  "Add tape or pin decorations to cards for texture",
  "Offset marker shadows in teal or red for a pen-press feel",
  "Use wavy underlines on links and highlights",
  "Keep line weights consistent, like a real pen nib",
];

const dontRules = [
  "Never use solid borders — always border-dashed",
  "Never use rounded-lg or larger — max rounded-sm",
  "Never use dark or gradient backgrounds",
  "Never use monospace or serif fonts",
  "Never use drop-shadow without color intentionality",
  "Never center every element — skew layouts like real notes",
];

const principleCards = [
  {
    icon: "pencil",
    title: "Imperfect Lines",
    desc: "Slight wobbles and uneven strokes signal humanity. Perfect lines belong to machines.",
    rotation: "-1.5deg",
  },
  {
    icon: "notebook",
    title: "Ruled Backgrounds",
    desc: "Notebook lines create immediate context — you are reading a real note, not a screen.",
    rotation: "1deg",
  },
  {
    icon: "tape",
    title: "Paper Artifacts",
    desc: "Tape, pins, coffee rings, and dog-ears are not noise — they are memories of use.",
    rotation: "-2deg",
  },
  {
    icon: "marker",
    title: "Marker Shadows",
    desc: "Shadows in teal, red, or yellow mimic marker bleed rather than physical depth.",
    rotation: "1.5deg",
  },
  {
    icon: "star",
    title: "Doodle Decoration",
    desc: "Stars, arrows, and squiggles fill white space the way margins fill with thoughts.",
    rotation: "-0.5deg",
  },
  {
    icon: "rotate",
    title: "Intentional Rotation",
    desc: "A 1-2 degree tilt separates authentic handcraft from sterile grid alignment.",
    rotation: "2deg",
  },
];

const typographyScale = [
  { label: "Display", size: "text-[52px]", weight: "font-black", sample: "Doodle & Design", note: "52px — Hero titles, rotate slightly" },
  { label: "H1", size: "text-[36px]", weight: "font-bold", sample: "Section Heading", note: "36px — Section titles" },
  { label: "H2", size: "text-[24px]", weight: "font-bold", sample: "Card Title Here", note: "24px — Card headings" },
  { label: "H3", size: "text-[18px]", weight: "font-semibold", sample: "Subsection Label", note: "18px — Subsection headings" },
  { label: "Body", size: "text-[15px]", weight: "font-normal", sample: "Natural body copy flows across the page like handwriting.", note: "15px — Paragraph text" },
  { label: "Caption", size: "text-[12px]", weight: "font-medium", sample: "Note in margin — ref. pg. 42", note: "12px — Captions, annotations" },
];

/* ------------------------------------------------------------------ */
/*  Hooks & Utilities                                                  */
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
/*  SVG Doodle Decorations                                             */
/* ------------------------------------------------------------------ */

function DoodleStar({ size = 20, color = "#ffd93d", rotation = 0 }: { size?: number; color?: string; rotation?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ transform: `rotate(${rotation}deg)` }}
      fill="none"
    >
      <path
        d="M12 2 L13.5 9 L20 9 L14.5 13.5 L16.5 20.5 L12 16.5 L7.5 20.5 L9.5 13.5 L4 9 L10.5 9 Z"
        fill={color}
        stroke={color}
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DoodleArrow({ color = "#4ecdc4" }: { color?: string }) {
  return (
    <svg width="48" height="32" viewBox="0 0 48 32" fill="none">
      <path
        d="M4 16 Q12 10 22 16 Q30 22 40 16"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M34 10 L42 16 L34 22"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function DoodleSquiggle({ color = "#ff6b6b" }: { color?: string }) {
  return (
    <svg width="80" height="16" viewBox="0 0 80 16" fill="none">
      <path
        d="M2 8 Q10 2 18 8 Q26 14 34 8 Q42 2 50 8 Q58 14 66 8 Q74 2 78 8"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function DoodleCircle({ size = 40, color = "#4ecdc4" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path
        d="M20 4 Q36 4 36 20 Q36 36 20 36 Q4 36 4 20 Q4 8 20 4"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function DoodleSpiral() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 16 Q16 10 22 10 Q28 10 28 16 Q28 24 20 24 Q10 24 10 14 Q10 6 20 6 Q30 6 30 16"
        stroke="#2c2c2c"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}

function TapeStrip({ color = "#ffd93d", rotation = "-3deg", width = "80px" }: { color?: string; rotation?: string; width?: string }) {
  return (
    <div
      className="absolute"
      style={{
        width,
        height: "22px",
        background: color,
        opacity: 0.45,
        transform: `rotate(${rotation})`,
        top: "-10px",
        left: "50%",
        marginLeft: `calc(-${width} / 2)`,
        borderRadius: "2px",
      }}
    />
  );
}

function PushPin({ color = "#ff6b6b" }: { color?: string }) {
  return (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
      <div
        className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
        style={{ background: color }}
      />
    </div>
  );
}

function NotebookLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          "repeating-linear-gradient(transparent, transparent 31px, rgba(168,200,232,0.35) 31px, rgba(168,200,232,0.35) 32px)",
      }}
    />
  );
}

function MarginLine() {
  return (
    <div
      className="absolute top-0 bottom-0 w-px"
      style={{ left: "120px", background: "rgba(255,107,107,0.2)" }}
    />
  );
}

function CoffeeStain({ size = 60, top = "70%", left = "80%" }: { size?: number; top?: string; left?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      style={{ position: "absolute", top, left, opacity: 0.09, pointerEvents: "none" }}
    >
      <circle cx="30" cy="30" r="28" stroke="#7a4f2e" strokeWidth="6" fill="none" />
      <circle cx="30" cy="30" r="22" stroke="#7a4f2e" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Section wrapper                                                    */
/* ------------------------------------------------------------------ */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block text-xs font-bold tracking-[0.18em] text-[#ff6b6b] uppercase mb-3 border-b-2 border-dashed border-[#ff6b6b]/40 pb-0.5"
    >
      {children}
    </span>
  );
}

function SectionHeading({ children, rotate = "0deg" }: { children: React.ReactNode; rotate?: string }) {
  return (
    <h2
      className="text-4xl md:text-5xl font-black text-[#2c2c2c] mb-4 leading-tight"
      style={{ transform: `rotate(${rotate})`, display: "inline-block" }}
    >
      {children}
    </h2>
  );
}

/* ------------------------------------------------------------------ */
/*  Icon renderer                                                      */
/* ------------------------------------------------------------------ */

function PrincipleIcon({ icon }: { icon: string }) {
  const props = { width: 28, height: 28, viewBox: "0 0 28 28", fill: "none" as const };
  if (icon === "pencil") return (
    <svg {...props}><path d="M4 22 L8 6 L20 18 Z" stroke="#2c2c2c" strokeWidth="2" strokeLinejoin="round" fill="none"/><path d="M8 6 L22 6 L20 18" stroke="#2c2c2c" strokeWidth="2" strokeLinejoin="round" fill="none"/></svg>
  );
  if (icon === "notebook") return (
    <svg {...props}><rect x="4" y="4" width="18" height="22" rx="1" stroke="#2c2c2c" strokeWidth="2" strokeDasharray="2 1" fill="none"/><line x1="8" y1="10" x2="18" y2="10" stroke="#2c2c2c" strokeWidth="1.5"/><line x1="8" y1="14" x2="18" y2="14" stroke="#2c2c2c" strokeWidth="1.5"/><line x1="8" y1="18" x2="14" y2="18" stroke="#2c2c2c" strokeWidth="1.5"/></svg>
  );
  if (icon === "tape") return (
    <svg {...props}><rect x="2" y="10" width="24" height="8" rx="1" stroke="#2c2c2c" strokeWidth="2" strokeDasharray="3 1" fill="rgba(255,217,61,0.3)"/></svg>
  );
  if (icon === "marker") return (
    <svg {...props}><rect x="6" y="2" width="8" height="20" rx="2" stroke="#2c2c2c" strokeWidth="2" fill="none"/><path d="M6 18 L14 18 L12 26 L8 26 Z" stroke="#2c2c2c" strokeWidth="1.5" fill="none"/></svg>
  );
  if (icon === "star") return (
    <svg {...props}><path d="M14 3 L16 10 L23 10 L17.5 14.5 L19.5 21.5 L14 17.5 L8.5 21.5 L10.5 14.5 L5 10 L12 10 Z" stroke="#2c2c2c" strokeWidth="2" strokeLinejoin="round" fill="none"/></svg>
  );
  return (
    <svg {...props}><path d="M6 14 A8 8 0 1 1 22 14" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" fill="none"/><path d="M19 11 L22 14 L19 17" stroke="#2c2c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function HandDrawnDoodleShowcase() {
  const [activeTab, setActiveTab] = useState<"Buttons" | "Cards" | "Inputs">("Buttons");
  const [inputVal, setInputVal] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  const { ref: heroRef, inView: heroInView } = useInView();
  const { ref: componentsRef, inView: componentsInView } = useInView();
  const { ref: paletteRef, inView: paletteInView } = useInView();
  const { ref: decorRef, inView: decorInView } = useInView();
  const { ref: typographyRef, inView: typographyInView } = useInView();
  const { ref: rulesRef, inView: rulesInView } = useInView();
  const { ref: gridRef, inView: gridInView } = useInView();
  const { ref: footerRef, inView: footerInView } = useInView();

  const notebookLines: React.CSSProperties = {
    backgroundImage:
      "repeating-linear-gradient(transparent, transparent 31px, rgba(168,200,232,0.35) 31px, rgba(168,200,232,0.35) 32px)",
  };

  return (
    <div className="min-h-screen bg-[#fffef5] text-[#2c2c2c]" style={{ fontFamily: '"Segoe UI", system-ui, sans-serif' }}>

      {/* ---------------------------------------------------------------- */}
      {/* 1. NAV                                                           */}
      {/* ---------------------------------------------------------------- */}
      <header
        className="sticky top-0 z-50 border-b-2 border-dashed border-[#2c2c2c]/30"
        style={{ background: "#fffef5", ...notebookLines }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between relative">
          <MarginLine />
          <div className="flex items-center gap-3">
            <span
              className="font-black text-xl text-[#2c2c2c] select-none"
              style={{ transform: "rotate(-0.5deg)", display: "inline-block" }}
            >
              Hand-Drawn Doodle
            </span>
            <DoodleStar size={14} color="#ffd93d" rotation={15} />
          </div>
          <nav className="flex items-center gap-6">
            <a
              href="#components"
              className="text-sm font-semibold text-[#2c2c2c] underline decoration-wavy decoration-[#4ecdc4] underline-offset-4 hover:text-[#4ecdc4] transition-colors"
            >
              Components
            </a>
            <a
              href="#palette"
              className="text-sm font-semibold text-[#2c2c2c] underline decoration-wavy decoration-[#ff6b6b] underline-offset-4 hover:text-[#ff6b6b] transition-colors"
            >
              Palette
            </a>
            <a
              href="#typography"
              className="text-sm font-semibold text-[#2c2c2c] underline decoration-wavy decoration-[#ffd93d] underline-offset-4 hover:text-[#ffd93d] transition-colors"
            >
              Typography
            </a>
            <Link
              href="/"
              className="text-sm font-bold text-[#2c2c2c] border-2 border-dashed border-[#2c2c2c] px-3 py-1 hover:shadow-[3px_3px_0px_#4ecdc4] transition-shadow"
              style={{ transform: "rotate(0.3deg)", display: "inline-block" }}
            >
              StyleKit →
            </Link>
          </nav>
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* 2. HERO                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section
        ref={heroRef}
        className="relative overflow-hidden min-h-[90vh] flex items-center"
        style={{ background: "#fffef5", ...notebookLines }}
      >
        <MarginLine />
        <CoffeeStain size={90} top="65%" left="82%" />
        <CoffeeStain size={50} top="15%" left="10%" />

        {/* Floating doodle decorations */}
        <div className="absolute top-8 right-16 opacity-70" style={{ transform: "rotate(12deg)" }}>
          <DoodleStar size={28} color="#ffd93d" rotation={0} />
        </div>
        <div className="absolute top-24 right-36 opacity-60">
          <DoodleStar size={16} color="#ff6b6b" rotation={30} />
        </div>
        <div className="absolute bottom-24 right-24 opacity-50" style={{ transform: "rotate(-10deg)" }}>
          <DoodleSquiggle color="#4ecdc4" />
        </div>
        <div className="absolute top-1/3 right-12 opacity-40">
          <DoodleArrow color="#ff6b6b" />
        </div>
        <div className="absolute bottom-32 left-24 opacity-50">
          <DoodleCircle size={48} color="#ffd93d" />
        </div>
        <div className="absolute top-16 left-40 opacity-30">
          <DoodleSpiral />
        </div>

        <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
          <div
            style={{
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="text-xs font-bold tracking-[0.22em] text-[#ff6b6b] uppercase border-b-2 border-dashed border-[#ff6b6b]/50 pb-0.5">
                Design System
              </span>
              <DoodleStar size={12} color="#ffd93d" rotation={20} />
            </div>

            <h1 className="font-black text-[#2c2c2c] leading-tight mb-8">
              <span
                className="block text-[56px] md:text-[72px]"
                style={{ transform: "rotate(-1.5deg)", display: "inline-block" }}
              >
                Doodle &amp;
              </span>
              <span
                className="block text-[56px] md:text-[72px] text-[#ff6b6b]"
                style={{ transform: "rotate(1deg)", display: "inline-block" }}
              >
                Design
              </span>
            </h1>

            <p
              className="text-lg md:text-xl text-[#2c2c2c]/70 max-w-xl mb-10 leading-relaxed"
              style={{ transform: "rotate(-0.3deg)", display: "inline-block" }}
            >
              A notebook-paper design system where imperfect lines, dashed borders, and marker accents
              make every interface feel genuinely handmade.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <button
                className="px-7 py-3 font-bold text-[#2c2c2c] bg-[#fffef5] border-2 border-dashed border-[#2c2c2c] text-base transition-all duration-150 hover:bg-[#fff] active:scale-95"
                style={{
                  boxShadow: "4px 4px 0px #4ecdc4",
                  transform: "rotate(-0.5deg)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0px #ff6b6b"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0px #4ecdc4"; }}
              >
                Start Sketching
              </button>
              <button
                className="px-7 py-3 font-bold text-[#2c2c2c] border-2 border-dashed border-[#2c2c2c]/40 text-base hover:border-[#ffd93d] transition-colors"
                style={{ transform: "rotate(0.5deg)" }}
              >
                View Docs →
              </button>
            </div>

            {/* Arrow pointing down */}
            <div className="mt-16 opacity-40" style={{ transform: "rotate(-5deg)" }}>
              <svg width="32" height="48" viewBox="0 0 32 48" fill="none">
                <path d="M16 4 Q16 28 16 36" stroke="#2c2c2c" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M8 30 L16 40 L24 30" stroke="#2c2c2c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. COMPONENTS DEMO                                               */}
      {/* ---------------------------------------------------------------- */}
      <section id="components" className="py-20 relative" style={{ background: "#fffef5" }}>
        <div
          ref={componentsRef}
          className="max-w-6xl mx-auto px-6"
          style={{
            opacity: componentsInView ? 1 : 0,
            transform: componentsInView ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="mb-12">
            <SectionLabel>Components</SectionLabel>
            <div><SectionHeading rotate="-0.5deg">Sketched UI Kit</SectionHeading></div>
            <p className="text-[#2c2c2c]/60 text-base mt-3 max-w-lg">
              Interactive elements that look like they were drawn on graph paper during a meeting.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {(["Buttons", "Cards", "Inputs"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-5 py-2 font-bold text-sm border-2 border-dashed transition-all duration-150"
                style={{
                  borderColor: activeTab === tab ? "#2c2c2c" : "#2c2c2c40",
                  background: activeTab === tab ? "#2c2c2c" : "transparent",
                  color: activeTab === tab ? "#fffef5" : "#2c2c2c",
                  transform: activeTab === tab ? "rotate(-0.5deg)" : "rotate(0deg)",
                  boxShadow: activeTab === tab ? "3px 3px 0px #ffd93d" : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Buttons tab */}
          {activeTab === "Buttons" && (
            <div className="border-2 border-dashed border-[#2c2c2c]/25 p-8 relative" style={{ background: "#fffef5", ...notebookLines }}>
              <NotebookLines />
              <MarginLine />
              <p className="text-xs font-bold text-[#2c2c2c]/40 uppercase tracking-widest mb-6 relative z-10">Button variants</p>
              <div className="flex flex-wrap gap-4 relative z-10">
                <button
                  className="px-6 py-2.5 font-bold border-2 border-dashed border-[#2c2c2c] text-[#2c2c2c] transition-all duration-150 active:scale-95"
                  style={{ boxShadow: "3px 3px 0px #4ecdc4" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "rotate(-1deg) translateY(-2px)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0px #ff6b6b";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "rotate(0deg) translateY(0)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "3px 3px 0px #4ecdc4";
                  }}
                >
                  Primary
                </button>
                <button
                  className="px-6 py-2.5 font-bold border-2 border-dashed border-[#ff6b6b] text-[#ff6b6b] transition-all duration-150 active:scale-95"
                  style={{ boxShadow: "3px 3px 0px #ff6b6b" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "rotate(1deg) translateY(-2px)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0px #ffd93d";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "rotate(0deg) translateY(0)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "3px 3px 0px #ff6b6b";
                  }}
                >
                  Danger
                </button>
                <button
                  className="px-6 py-2.5 font-bold bg-[#ffd93d] border-2 border-dashed border-[#2c2c2c] text-[#2c2c2c] transition-all duration-150 active:scale-95"
                  style={{ boxShadow: "3px 3px 0px #2c2c2c" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "rotate(-0.5deg) translateY(-2px)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "5px 5px 0px #2c2c2c";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "rotate(0deg) translateY(0)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "3px 3px 0px #2c2c2c";
                  }}
                >
                  Highlight
                </button>
                <button
                  className="px-6 py-2.5 font-bold border-2 border-dashed border-[#2c2c2c]/30 text-[#2c2c2c]/50 transition-all duration-150"
                  style={{ cursor: "not-allowed" }}
                >
                  Disabled
                </button>
                <button
                  className="px-6 py-2.5 font-bold bg-[#4ecdc4] border-2 border-dashed border-[#2c2c2c] text-[#2c2c2c] transition-all duration-150 active:scale-95"
                  style={{ boxShadow: "3px 3px 0px #2c2c2c" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "rotate(1deg) translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "rotate(0deg) translateY(0)";
                  }}
                >
                  Teal
                </button>
              </div>
            </div>
          )}

          {/* Cards tab */}
          {activeTab === "Cards" && (
            <div className="border-2 border-dashed border-[#2c2c2c]/25 p-8 relative" style={{ background: "#fffef5", ...notebookLines }}>
              <NotebookLines />
              <MarginLine />
              <p className="text-xs font-bold text-[#2c2c2c]/40 uppercase tracking-widest mb-6 relative z-10">Card variants</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {[
                  { title: "Quick Note", body: "Write your thoughts before they slip away. The best ideas arrive uninvited.", tape: "#ffd93d", shadow: "#4ecdc4", rot: "-1deg" },
                  { title: "Reminder", body: "Check notebook margins. The best ideas are always in the margins.", tape: "#ff6b6b", shadow: "#ff6b6b", rot: "1.5deg" },
                  { title: "Idea Sketch", body: "Rough is fine. The first sketch is never the last. Keep going.", tape: "#4ecdc4", shadow: "#ffd93d", rot: "-0.5deg" },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="relative border-2 border-dashed border-[#2c2c2c]/30 p-5 pt-7 transition-all duration-200 cursor-default"
                    style={{
                      transform: `rotate(${card.rot})`,
                      boxShadow: `4px 4px 0px ${card.shadow}`,
                      background: "#fffef5",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = `rotate(${parseFloat(card.rot) + 0.5}deg) translateY(-4px)`;
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `6px 6px 0px ${card.shadow}`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = `rotate(${card.rot})`;
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `4px 4px 0px ${card.shadow}`;
                    }}
                  >
                    <TapeStrip color={card.tape} rotation="-3deg" />
                    <h3 className="font-bold text-[#2c2c2c] text-base mb-2">{card.title}</h3>
                    <p className="text-sm text-[#2c2c2c]/60 leading-relaxed">{card.body}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inputs tab */}
          {activeTab === "Inputs" && (
            <div className="border-2 border-dashed border-[#2c2c2c]/25 p-8 relative" style={{ background: "#fffef5", ...notebookLines }}>
              <NotebookLines />
              <MarginLine />
              <p className="text-xs font-bold text-[#2c2c2c]/40 uppercase tracking-widest mb-6 relative z-10">Input variants</p>
              <div className="flex flex-col gap-5 max-w-md relative z-10">
                <div>
                  <label className="block text-xs font-bold text-[#2c2c2c]/60 uppercase tracking-widest mb-1.5">
                    Your Note
                  </label>
                  <input
                    type="text"
                    placeholder="Write something..."
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    className="w-full px-4 py-2.5 font-medium text-[#2c2c2c] outline-none bg-[#fffef5] border-2 border-dashed transition-all duration-200"
                    style={{
                      borderColor: inputFocused ? "#ff6b6b" : "#2c2c2c40",
                      boxShadow: inputFocused ? "3px 3px 0px #ffd93d" : "none",
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2c2c2c]/60 uppercase tracking-widest mb-1.5">
                    Sketch Title
                  </label>
                  <input
                    type="text"
                    placeholder="Name your sketch..."
                    className="w-full px-4 py-2.5 font-medium text-[#2c2c2c] outline-none bg-[#fffef5] border-2 border-dashed border-[#2c2c2c]/40 transition-all duration-200 focus:border-[#ff6b6b] focus:shadow-[3px_3px_0px_#ffd93d]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2c2c2c]/60 uppercase tracking-widest mb-1.5">
                    Tags (disabled)
                  </label>
                  <input
                    type="text"
                    placeholder="sketch, doodle, idea"
                    disabled
                    className="w-full px-4 py-2.5 font-medium text-[#2c2c2c]/30 bg-[#2c2c2c]/5 border-2 border-dashed border-[#2c2c2c]/20 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2c2c2c]/60 uppercase tracking-widest mb-1.5">
                    Long Note
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Keep writing, fill the page..."
                    className="w-full px-4 py-2.5 font-medium text-[#2c2c2c] outline-none bg-[#fffef5] border-2 border-dashed border-[#2c2c2c]/40 transition-all duration-200 focus:border-[#ff6b6b] resize-none"
                    style={{ lineHeight: "32px" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 4. COLOR PALETTE                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section id="palette" className="py-20 relative border-t-2 border-dashed border-[#2c2c2c]/15" style={{ background: "#fffef5" }}>
        <div ref={paletteRef} className="max-w-6xl mx-auto px-6">
          <RevealBlock className="mb-12">
            <SectionLabel>Color Palette</SectionLabel>
            <div><SectionHeading rotate="0.5deg">Five Marker Colors</SectionHeading></div>
            <p className="text-[#2c2c2c]/60 text-base mt-3 max-w-lg">
              Each swatch is a paint chip pinned to the board. Slightly rotated, slightly personal.
            </p>
          </RevealBlock>

          <div className="flex flex-wrap gap-6 justify-start">
            {colorSwatches.map((swatch, i) => (
              <RevealBlock key={swatch.name} delay={i * 0.08}>
                <div
                  className="border-2 border-dashed border-[#2c2c2c]/30 p-5 w-44 relative transition-all duration-200 cursor-default"
                  style={{
                    transform: `rotate(${swatch.angle})`,
                    background: "#fffef5",
                    boxShadow: `3px 3px 0px ${swatch.value === "#fffef5" ? "#2c2c2c30" : swatch.value}40`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = `rotate(${parseFloat(swatch.angle) + 1}deg) translateY(-4px)`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `5px 5px 0px ${swatch.value === "#fffef5" ? "#2c2c2c" : swatch.value}80`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = `rotate(${swatch.angle})`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `3px 3px 0px ${swatch.value === "#fffef5" ? "#2c2c2c30" : swatch.value}40`;
                  }}
                >
                  <PushPin color={i % 3 === 0 ? "#ff6b6b" : i % 3 === 1 ? "#4ecdc4" : "#ffd93d"} />
                  <div
                    className="w-14 h-14 rounded-full border-2 border-dashed border-[#2c2c2c]/25 mx-auto mb-4"
                    style={{ background: swatch.value, boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)" }}
                  />
                  <p className="font-bold text-sm text-[#2c2c2c] text-center">{swatch.name}</p>
                  <p className="text-xs text-[#2c2c2c]/50 text-center mt-0.5 font-mono">{swatch.value}</p>
                  <p className="text-xs text-[#2c2c2c]/40 text-center mt-1">{swatch.note}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 5. NOTEBOOK DECORATIONS DEMO                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20 relative border-t-2 border-dashed border-[#2c2c2c]/15" style={{ background: "#fffef5", ...notebookLines }}>
        <MarginLine />
        <div ref={decorRef} className="max-w-6xl mx-auto px-6 relative z-10">
          <RevealBlock className="mb-12">
            <SectionLabel>Decoration System</SectionLabel>
            <div><SectionHeading rotate="-0.5deg">Notebook Artifacts</SectionHeading></div>
            <p className="text-[#2c2c2c]/60 text-base mt-3 max-w-lg">
              These are not decorations — they are memories. Tape, pins, rings, and holes tell a story of real use.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Tape strip demo */}
            <RevealBlock delay={0}>
              <div className="border-2 border-dashed border-[#2c2c2c]/25 p-6 relative bg-[#fffef5]" style={{ transform: "rotate(-0.5deg)" }}>
                <TapeStrip color="#ffd93d" rotation="-3deg" width="70px" />
                <h3 className="font-bold text-[#2c2c2c] text-sm mb-2 mt-2">Tape Strip</h3>
                <p className="text-xs text-[#2c2c2c]/55 leading-relaxed mb-4">
                  Masking tape in yellow, red, or teal pinned to the top center of a card. Use at 40-50% opacity so the background shows through.
                </p>
                <div className="flex gap-3">
                  {["#ffd93d", "#ff6b6b", "#4ecdc4"].map((c) => (
                    <div
                      key={c}
                      className="h-5 rounded-sm"
                      style={{ width: "48px", background: c, opacity: 0.5, transform: `rotate(${Math.random() > 0.5 ? "-2deg" : "2deg"})` }}
                    />
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Pushpin demo */}
            <RevealBlock delay={0.06}>
              <div className="border-2 border-dashed border-[#2c2c2c]/25 p-6 relative bg-[#fffef5]" style={{ transform: "rotate(1deg)" }}>
                <PushPin color="#4ecdc4" />
                <h3 className="font-bold text-[#2c2c2c] text-sm mb-2 mt-2">Pushpin</h3>
                <p className="text-xs text-[#2c2c2c]/55 leading-relaxed mb-4">
                  A small filled circle at the top center, slightly raised. Colors rotate between red, teal, and yellow.
                </p>
                <div className="flex gap-4 justify-center mt-2">
                  {["#ff6b6b", "#4ecdc4", "#ffd93d"].map((c) => (
                    <div key={c} className="w-4 h-4 rounded-full border-2 border-white shadow-sm" style={{ background: c }} />
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Wavy underline demo */}
            <RevealBlock delay={0.12}>
              <div className="border-2 border-dashed border-[#2c2c2c]/25 p-6 relative bg-[#fffef5]" style={{ transform: "rotate(-1.5deg)" }}>
                <h3 className="font-bold text-[#2c2c2c] text-sm mb-2">Wavy Underline</h3>
                <p className="text-xs text-[#2c2c2c]/55 leading-relaxed mb-4">
                  Links and highlights use{" "}
                  <span style={{ textDecoration: "underline", textDecorationStyle: "wavy", textDecorationColor: "#4ecdc4" }}>
                    wavy teal underlines
                  </span>{" "}
                  and{" "}
                  <span style={{ textDecoration: "underline", textDecorationStyle: "wavy", textDecorationColor: "#ff6b6b" }}>
                    red marker variants
                  </span>
                  .
                </p>
                <div className="flex flex-col gap-1.5">
                  <DoodleSquiggle color="#4ecdc4" />
                  <DoodleSquiggle color="#ff6b6b" />
                </div>
              </div>
            </RevealBlock>

            {/* Coffee stain demo */}
            <RevealBlock delay={0.18}>
              <div className="border-2 border-dashed border-[#2c2c2c]/25 p-6 relative bg-[#fffef5] overflow-hidden" style={{ transform: "rotate(0.5deg)" }}>
                <svg width="70" height="70" viewBox="0 0 60 60" style={{ position: "absolute", bottom: "8px", right: "8px", opacity: 0.12, pointerEvents: "none" }}>
                  <circle cx="30" cy="30" r="28" stroke="#7a4f2e" strokeWidth="6" fill="none" />
                  <circle cx="30" cy="30" r="22" stroke="#7a4f2e" strokeWidth="1.5" fill="none" />
                </svg>
                <h3 className="font-bold text-[#2c2c2c] text-sm mb-2">Coffee Ring</h3>
                <p className="text-xs text-[#2c2c2c]/55 leading-relaxed">
                  An SVG concentric circle at low opacity (8-12%) in warm brown, placed at a card corner. Adds authentic desktop patina.
                </p>
              </div>
            </RevealBlock>

            {/* Spiral binding demo */}
            <RevealBlock delay={0.24}>
              <div className="border-2 border-dashed border-[#2c2c2c]/25 p-6 relative bg-[#fffef5] flex gap-4" style={{ transform: "rotate(-1deg)" }}>
                <div className="flex flex-col gap-3 py-1">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 rounded-full border-2 border-dashed border-[#2c2c2c]/30"
                      style={{ background: "#fffef5" }}
                    />
                  ))}
                </div>
                <div>
                  <h3 className="font-bold text-[#2c2c2c] text-sm mb-2">Spiral Holes</h3>
                  <p className="text-xs text-[#2c2c2c]/55 leading-relaxed">
                    Dashed-border circles on the left edge simulate spiral notebook binding. Each hole is 16px, spaced evenly.
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Marker highlight demo */}
            <RevealBlock delay={0.30}>
              <div className="border-2 border-dashed border-[#2c2c2c]/25 p-6 relative bg-[#fffef5]" style={{ transform: "rotate(1.5deg)" }}>
                <h3 className="font-bold text-[#2c2c2c] text-sm mb-2">Marker Highlight</h3>
                <p className="text-xs text-[#2c2c2c]/55 leading-relaxed mb-3">
                  Use a linear-gradient background on inline text to simulate highlighter bleed:
                </p>
                <p className="text-sm font-semibold text-[#2c2c2c]">
                  The best{" "}
                  <span
                    style={{
                      background: "linear-gradient(104deg, transparent 0.9%, rgba(255,217,61,0.45) 2.4%, rgba(255,217,61,0.3) 97.1%, transparent 98.2%)",
                      padding: "0 2px",
                    }}
                  >
                    design systems
                  </span>{" "}
                  feel{" "}
                  <span
                    style={{
                      background: "linear-gradient(104deg, transparent 0.9%, rgba(78,205,196,0.35) 2.4%, rgba(78,205,196,0.2) 97.1%, transparent 98.2%)",
                      padding: "0 2px",
                    }}
                  >
                    human
                  </span>
                  .
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 6. TYPOGRAPHY                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section id="typography" className="py-20 relative border-t-2 border-dashed border-[#2c2c2c]/15" style={{ background: "#fffef5" }}>
        <div ref={typographyRef} className="max-w-6xl mx-auto px-6">
          <RevealBlock className="mb-12">
            <SectionLabel>Typography</SectionLabel>
            <div><SectionHeading rotate="-1deg">Type Hierarchy</SectionHeading></div>
            <p className="text-[#2c2c2c]/60 text-base mt-3 max-w-lg">
              Bold sans-serif with intentional rotations. No serifs, no monospace — this is a marker pen, not a typewriter.
            </p>
          </RevealBlock>

          <div className="border-2 border-dashed border-[#2c2c2c]/25 overflow-hidden" style={{ background: "#fffef5", ...notebookLines }}>
            <MarginLine />
            {typographyScale.map((item, i) => (
              <RevealBlock key={item.label} delay={i * 0.06}>
                <div
                  className="flex items-baseline gap-6 px-8 py-5 border-b-2 border-dashed border-[#2c2c2c]/10 last:border-b-0 relative z-10"
                  style={{ paddingLeft: "136px" }}
                >
                  <span className="absolute left-8 text-[10px] font-bold text-[#ff6b6b]/60 uppercase tracking-widest" style={{ top: "50%", transform: "translateY(-50%)" }}>
                    {item.label}
                  </span>
                  <span
                    className={`${item.size} ${item.weight} text-[#2c2c2c] leading-none`}
                    style={{ transform: `rotate(${i % 2 === 0 ? "-0.5deg" : "0.3deg"})`, display: "inline-block" }}
                  >
                    {item.sample}
                  </span>
                  <span className="text-xs text-[#2c2c2c]/35 font-medium ml-auto shrink-0 hidden md:block">{item.note}</span>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Highlight examples */}
          <RevealBlock delay={0.3} className="mt-8">
            <div className="border-2 border-dashed border-[#2c2c2c]/25 p-6 relative" style={{ background: "#fffef5", transform: "rotate(-0.3deg)" }}>
              <p className="text-base font-medium text-[#2c2c2c] leading-loose">
                The hand-drawn system uses{" "}
                <span style={{ background: "linear-gradient(104deg, transparent 0.9%, rgba(255,217,61,0.4) 2.4%, rgba(255,217,61,0.25) 97.1%, transparent 98.2%)", padding: "0 2px" }}>
                  yellow highlights
                </span>{" "}
                for key terms,{" "}
                <span style={{ textDecoration: "underline", textDecorationStyle: "wavy", textDecorationColor: "#4ecdc4" }}>
                  teal wavy underlines
                </span>{" "}
                for links, and{" "}
                <span style={{ textDecoration: "underline", textDecorationStyle: "wavy", textDecorationColor: "#ff6b6b" }}>
                  red wavy underlines
                </span>{" "}
                for critical references.
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 7. DO / DON'T CARDS                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20 relative border-t-2 border-dashed border-[#2c2c2c]/15" style={{ background: "#fffef5" }}>
        <div ref={rulesRef} className="max-w-6xl mx-auto px-6">
          <RevealBlock className="mb-12">
            <SectionLabel>Design Rules</SectionLabel>
            <div><SectionHeading rotate="0.5deg">Do &amp; Don&apos;t</SectionHeading></div>
            <p className="text-[#2c2c2c]/60 text-base mt-3 max-w-lg">
              Sticky notes from a design critique session. Teal for yes, red for no.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* DO column */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#4ecdc4]" />
                <span className="font-bold text-sm text-[#4ecdc4] uppercase tracking-widest">Do</span>
              </div>
              <div className="flex flex-col gap-4">
                {doRules.map((rule, i) => (
                  <RevealBlock key={i} delay={i * 0.07}>
                    <div
                      className="border-2 border-dashed border-[#4ecdc4]/40 p-4 relative transition-all duration-200"
                      style={{
                        transform: `rotate(${i % 2 === 0 ? "-1deg" : "0.8deg"})`,
                        background: "#fffef5",
                        boxShadow: "3px 3px 0px #4ecdc4",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.transform = `rotate(${i % 2 === 0 ? "-0.5deg" : "1.3deg"}) translateY(-3px)`;
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "5px 5px 0px #4ecdc4";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.transform = `rotate(${i % 2 === 0 ? "-1deg" : "0.8deg"})`;
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "3px 3px 0px #4ecdc4";
                      }}
                    >
                      <TapeStrip color="#4ecdc4" rotation="-2deg" width="50px" />
                      <p className="text-sm text-[#2c2c2c] font-medium leading-relaxed mt-1">{rule}</p>
                    </div>
                  </RevealBlock>
                ))}
              </div>
            </div>

            {/* DON'T column */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-[#ff6b6b]" />
                <span className="font-bold text-sm text-[#ff6b6b] uppercase tracking-widest">Don&apos;t</span>
              </div>
              <div className="flex flex-col gap-4">
                {dontRules.map((rule, i) => (
                  <RevealBlock key={i} delay={i * 0.07 + 0.1}>
                    <div
                      className="border-2 border-dashed border-[#ff6b6b]/40 p-4 relative transition-all duration-200"
                      style={{
                        transform: `rotate(${i % 2 === 0 ? "1deg" : "-0.8deg"})`,
                        background: "#fffef5",
                        boxShadow: "3px 3px 0px #ff6b6b",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.transform = `rotate(${i % 2 === 0 ? "0.5deg" : "-1.3deg"}) translateY(-3px)`;
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "5px 5px 0px #ff6b6b";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.transform = `rotate(${i % 2 === 0 ? "1deg" : "-0.8deg"})`;
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "3px 3px 0px #ff6b6b";
                      }}
                    >
                      <TapeStrip color="#ff6b6b" rotation="2deg" width="50px" />
                      <p className="text-sm text-[#2c2c2c] font-medium leading-relaxed mt-1">{rule}</p>
                    </div>
                  </RevealBlock>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 8. SKETCHBOOK GRID                                               */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-20 relative border-t-2 border-dashed border-[#2c2c2c]/15" style={{ background: "#fffef5" }}>
        <div ref={gridRef} className="max-w-6xl mx-auto px-6">
          <RevealBlock className="mb-12">
            <SectionLabel>Sketchbook</SectionLabel>
            <div><SectionHeading rotate="-0.8deg">Design Principles</SectionHeading></div>
            <p className="text-[#2c2c2c]/60 text-base mt-3 max-w-lg">
              Six torn-paper cards from the sketchbook — each with a hand-drawn icon and a core principle.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {principleCards.map((card, i) => (
              <RevealBlock key={card.title} delay={i * 0.08}>
                <div
                  className="border-2 border-dashed border-[#2c2c2c]/25 p-6 relative transition-all duration-200 cursor-default"
                  style={{
                    transform: `rotate(${card.rotation})`,
                    background: "#fffef5",
                    boxShadow: `3px 3px 0px ${["#4ecdc4", "#ff6b6b", "#ffd93d", "#4ecdc4", "#ff6b6b", "#ffd93d"][i]}`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = `rotate(${parseFloat(card.rotation) + 0.8}deg) translateY(-4px)`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `5px 5px 0px ${["#4ecdc4", "#ff6b6b", "#ffd93d", "#4ecdc4", "#ff6b6b", "#ffd93d"][i]}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = `rotate(${card.rotation})`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `3px 3px 0px ${["#4ecdc4", "#ff6b6b", "#ffd93d", "#4ecdc4", "#ff6b6b", "#ffd93d"][i]}`;
                  }}
                >
                  {/* Torn paper top edge simulation */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-20"
                    style={{
                      background: "repeating-linear-gradient(90deg, transparent, transparent 6px, #2c2c2c 6px, #2c2c2c 7px)",
                    }}
                  />

                  <div className="mb-4 mt-1">
                    <PrincipleIcon icon={card.icon} />
                  </div>
                  <h3 className="font-bold text-[#2c2c2c] text-base mb-2">{card.title}</h3>
                  <p className="text-sm text-[#2c2c2c]/60 leading-relaxed">{card.desc}</p>

                  {/* Page number bottom right */}
                  <span className="absolute bottom-3 right-4 text-[10px] text-[#2c2c2c]/20 font-medium">
                    pg. {i + 1}
                  </span>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* BONUS: Interactive Doodle Canvas Banner                          */}
      {/* ---------------------------------------------------------------- */}
      <section className="py-16 relative border-t-2 border-dashed border-[#2c2c2c]/15" style={{ background: "#fffef5", ...notebookLines }}>
        <MarginLine />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <RevealBlock>
            <div
              className="border-2 border-dashed border-[#2c2c2c]/30 p-10 relative overflow-hidden"
              style={{ background: "#fffef5", transform: "rotate(-0.2deg)" }}
            >
              <TapeStrip color="#ffd93d" rotation="-2deg" width="100px" />

              {/* Decorations */}
              <div className="absolute top-6 right-10 opacity-50" style={{ transform: "rotate(15deg)" }}>
                <DoodleStar size={24} color="#ffd93d" />
              </div>
              <div className="absolute bottom-8 right-20 opacity-40">
                <DoodleArrow color="#4ecdc4" />
              </div>
              <div className="absolute top-12 right-40 opacity-30">
                <DoodleCircle size={36} color="#ff6b6b" />
              </div>
              <CoffeeStain size={60} top="60%" left="88%" />

              <div className="max-w-xl relative z-10">
                <span className="text-xs font-bold tracking-[0.2em] text-[#4ecdc4] uppercase block mb-3">
                  Ready to start?
                </span>
                <h2
                  className="text-3xl md:text-4xl font-black text-[#2c2c2c] mb-4"
                  style={{ transform: "rotate(-0.5deg)", display: "inline-block" }}
                >
                  Your blank page is waiting.
                </h2>
                <p className="text-[#2c2c2c]/60 text-base leading-relaxed mb-7">
                  Every great design started as a doodle on a napkin. This system just gives you the margins to fill.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <button
                    className="px-7 py-3 font-bold text-[#2c2c2c] border-2 border-dashed border-[#2c2c2c] transition-all duration-150 active:scale-95"
                    style={{ boxShadow: "4px 4px 0px #ffd93d", transform: "rotate(-0.5deg)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0px #4ecdc4";
                      (e.currentTarget as HTMLButtonElement).style.transform = "rotate(-1deg) translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0px #ffd93d";
                      (e.currentTarget as HTMLButtonElement).style.transform = "rotate(-0.5deg)";
                    }}
                  >
                    Open Sketchbook
                  </button>
                  <button
                    className="px-7 py-3 font-bold text-[#2c2c2c]/60 border-2 border-dashed border-[#2c2c2c]/30 transition-colors hover:border-[#ff6b6b] hover:text-[#ff6b6b]"
                    style={{ transform: "rotate(0.5deg)" }}
                  >
                    Browse Gallery →
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 9. FOOTER                                                        */}
      {/* ---------------------------------------------------------------- */}
      <footer
        ref={footerRef}
        className="border-t-2 border-dashed border-[#2c2c2c]/25 py-12 relative"
        style={{ background: "#fffef5", ...notebookLines }}
      >
        <MarginLine />
        <div
          className="max-w-6xl mx-auto px-6 relative z-10"
          style={{
            opacity: footerInView ? 1 : 0,
            transform: footerInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {/* Brand */}
            <div>
              <span
                className="block font-black text-xl text-[#2c2c2c] mb-3"
                style={{ transform: "rotate(-0.5deg)", display: "inline-block" }}
              >
                Hand-Drawn Doodle
              </span>
              <p className="text-sm text-[#2c2c2c]/55 leading-relaxed max-w-xs">
                A design system built for humans who still think best with a pen in hand.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <DoodleStar size={12} color="#ffd93d" rotation={10} />
                <DoodleStar size={10} color="#ff6b6b" rotation={-5} />
                <DoodleStar size={14} color="#4ecdc4" rotation={20} />
              </div>
            </div>

            {/* Links */}
            <div>
              <p className="font-bold text-xs uppercase tracking-widest text-[#2c2c2c]/40 mb-4">Explore</p>
              <div className="flex flex-col gap-2">
                {["Components", "Color System", "Typography", "Decorations", "Patterns"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-sm font-medium text-[#2c2c2c] w-fit"
                    style={{ textDecoration: "underline", textDecorationStyle: "wavy", textDecorationColor: "#4ecdc4", textUnderlineOffset: "4px" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.textDecorationColor = "#ff6b6b"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.textDecorationColor = "#4ecdc4"; }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Credits */}
            <div>
              <p className="font-bold text-xs uppercase tracking-widest text-[#2c2c2c]/40 mb-4">Credits</p>
              <p className="text-sm text-[#2c2c2c]/55 leading-relaxed">
                Part of the{" "}
                <Link
                  href="/"
                  className="font-bold text-[#2c2c2c]"
                  style={{ textDecoration: "underline", textDecorationStyle: "wavy", textDecorationColor: "#ffd93d", textUnderlineOffset: "4px" }}
                >
                  StyleKit
                </Link>{" "}
                collection — a curated library of design system showcases.
              </p>
              <p className="text-xs text-[#2c2c2c]/35 mt-4 leading-relaxed">
                Drawn with care. No rulers were harmed.
              </p>
              <div className="mt-4 border-2 border-dashed border-[#2c2c2c]/20 p-3 inline-block" style={{ transform: "rotate(0.5deg)" }}>
                <p className="text-xs text-[#2c2c2c]/50 font-medium">
                  Colors: <span className="text-[#ff6b6b] font-bold">#ff6b6b</span>{" "}
                  <span className="text-[#4ecdc4] font-bold">#4ecdc4</span>{" "}
                  <span className="text-[#ffd93d] font-bold">#ffd93d</span>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-dashed border-[#2c2c2c]/15 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <p className="text-xs text-[#2c2c2c]/40">
              Hand-Drawn Doodle Design System — part of StyleKit
            </p>
            <div className="flex items-center gap-4">
              <DoodleSquiggle color="#ffd93d" />
              <p className="text-xs text-[#2c2c2c]/30" style={{ transform: "rotate(-0.3deg)", display: "inline-block" }}>
                Keep your margins full.
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
