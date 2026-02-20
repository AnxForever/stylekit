"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const dreamTabs = ["Dream I", "Dream II", "Dream III"] as const;
type DreamTab = (typeof dreamTabs)[number];

const dreamCards: Record<
  DreamTab,
  {
    title: string;
    subtitle: string;
    desc: string;
    orb1: string;
    orb2: string;
    orb3: string;
  }[]
> = {
  "Dream I": [
    {
      title: "The Persistence of Memory",
      subtitle: "Time",
      desc: "Hours bend and pour like liquid gold across stone archways that remember nothing. Clocks melt at the threshold of waking.",
      orb1: "bg-[#d4a574]/25",
      orb2: "bg-[#c38d94]/20",
      orb3: "bg-[#4a3f6b]/15",
    },
    {
      title: "Elephants of Desire",
      subtitle: "Weight",
      desc: "Towering figures on impossibly thin legs stride through a dusk that never arrives. Gravity is a suggestion here.",
      orb1: "bg-[#d4a574]/30",
      orb2: "bg-[#c38d94]/25",
      orb3: "bg-[#4a3f6b]/20",
    },
    {
      title: "The Burning Giraffe",
      subtitle: "Metamorphosis",
      desc: "Flame and form merge at the half-light of awakening, neither solid nor air. The body forgets what it was told.",
      orb1: "bg-[#d4a574]/20",
      orb2: "bg-[#c38d94]/30",
      orb3: "bg-[#4a3f6b]/15",
    },
  ],
  "Dream II": [
    {
      title: "Eye of the Unconscious",
      subtitle: "Portal",
      desc: "An iris opens onto landscapes that only sleep reveals to those who wait long enough at the threshold.",
      orb1: "bg-[#4a3f6b]/30",
      orb2: "bg-[#d4a574]/20",
      orb3: "bg-[#c38d94]/15",
    },
    {
      title: "The Dream Chamber",
      subtitle: "Space",
      desc: "Architecture folding inward upon itself in perpetual recursion. Stairways lead to rooms that have no walls.",
      orb1: "bg-[#4a3f6b]/25",
      orb2: "bg-[#d4a574]/25",
      orb3: "bg-[#c38d94]/20",
    },
    {
      title: "Swans Reflecting Elephants",
      subtitle: "Reflection",
      desc: "The mirror shows what the eye refuses — a world inverted in the still lake of the mind's edge.",
      orb1: "bg-[#4a3f6b]/20",
      orb2: "bg-[#d4a574]/30",
      orb3: "bg-[#c38d94]/25",
    },
  ],
  "Dream III": [
    {
      title: "Melting Clocks",
      subtitle: "Entropy",
      desc: "Time is not lost. It merely changes shape, pooling in corners where no one thinks to look for it.",
      orb1: "bg-[#c38d94]/30",
      orb2: "bg-[#4a3f6b]/25",
      orb3: "bg-[#d4a574]/20",
    },
    {
      title: "Soft Construction",
      subtitle: "Form",
      desc: "Bones become rivers. Skin becomes canvas. The body forgets the rules it was given at the moment of birth.",
      orb1: "bg-[#c38d94]/25",
      orb2: "bg-[#4a3f6b]/20",
      orb3: "bg-[#d4a574]/30",
    },
    {
      title: "Invisible Harp",
      subtitle: "Sound",
      desc: "Music plays in a room with no walls, the notes dissolving before they reach any ear that waits for them.",
      orb1: "bg-[#c38d94]/20",
      orb2: "bg-[#4a3f6b]/30",
      orb3: "bg-[#d4a574]/25",
    },
  ],
};

const colorPalette = [
  {
    name: "Midnight",
    hex: "#1a1a3e",
    glowColor: "rgba(26,26,62,0.5)",
    textColor: "#f0ece4",
    role: "Primary",
    description: "The midnight sky where all dreams are born",
  },
  {
    name: "Cream",
    hex: "#f0ece4",
    glowColor: "rgba(240,236,228,0.4)",
    textColor: "#1a1a3e",
    role: "Secondary",
    description: "The parchment on which visions are written",
  },
  {
    name: "Desert Gold",
    hex: "#d4a574",
    glowColor: "rgba(212,165,116,0.5)",
    textColor: "#1a1a3e",
    role: "Accent",
    description: "Sand dunes melting into the evening light",
  },
  {
    name: "Rose Dust",
    hex: "#c38d94",
    glowColor: "rgba(195,141,148,0.5)",
    textColor: "#1a1a3e",
    role: "Accent",
    description: "Petals pressed inside a dream journal",
  },
  {
    name: "Deep Purple",
    hex: "#4a3f6b",
    glowColor: "rgba(74,63,107,0.5)",
    textColor: "#f0ece4",
    role: "Accent",
    description: "The violet hour between sleep and waking",
  },
];

const doRules = [
  {
    title: "Dream-like Distortion",
    body: "hover:skew-x-2 hover:-rotate-1 — the dreamscape never holds still. Elements tilt and drift on interaction.",
  },
  {
    title: "Timeless Easing",
    body: "duration-700 minimum, prefer duration-1000. The dream breathes at its own pace — never hurried.",
  },
  {
    title: "Abyssal Glow",
    body: "hover:shadow-[0_0_50px_rgba(195,141,148,0.3)] — light rises from within, diffuse rose and gold only.",
  },
  {
    title: "Color Melting",
    body: "Orbs expand group-hover:scale-150 over duration-[2000ms] — color bleeds at the edges of consciousness.",
  },
  {
    title: "Expanding Underline",
    body: "group-hover:w-full transition-all duration-1000 — the gold line follows like a slow, inevitable tide.",
  },
  {
    title: "Serif Italic Typography",
    body: "font-serif italic for all expressive text. Rationality and sans-serif have no place in the dream.",
  },
  {
    title: "Midnight Blue Backgrounds",
    body: "#1a1a3e as the base canvas. Desert gold as the primary accent. Never pure black, never pure white.",
  },
  {
    title: "Organic Border-Radius",
    body: "rounded-[40%_60%_70%_30%/30%_30%_70%_70%] on featured elements — organic shapes resist geometry.",
  },
];

const dontRules = [
  {
    title: "No Symmetric Grids",
    body: "Equal, perfectly aligned grids betray the dream. Asymmetry is not an error — it is the design language.",
  },
  {
    title: "No Sharp Scale-105",
    body: "hover:scale-105 is the language of the rational world. Use skew and rotate instead — never flat scale alone.",
  },
  {
    title: "No Black Shadows",
    body: "drop-shadow with black kills the dream atmosphere. Only Abyssal Glow — rose and gold diffuse light.",
  },
  {
    title: "No Fast Transitions",
    body: "duration-200 is a jolt that breaks the spell. The dream world never moves faster than duration-700.",
  },
  {
    title: "No Static Orbs",
    body: "Decorative orbs without group-hover:scale-150 duration-[2000ms] are corpses — color must live and breathe.",
  },
  {
    title: "No Bright Pure Colors",
    body: "Neon and saturated hues do not exist in the subconscious. Muted, muted, muted — always.",
  },
];

const daliQuotes = [
  {
    quote:
      "Every morning when I wake up, I experience an exquisite joy — the joy of being Salvador Dali — and I ask myself in rapture: What wonderful things is this Salvador Dali going to accomplish today?",
    source: "Salvador Dali",
    theme: "On Becoming",
  },
  {
    quote:
      "The only difference between me and a madman is that I am not mad. The dream world is simply the subconscious rendered visible to those willing to look without flinching.",
    source: "Dream Manifesto",
    theme: "On Madness",
  },
  {
    quote:
      "Give me two hours a day of activity, and I'll take the other twenty-two in dreams. The unconscious is vaster than any waking architecture ever built.",
    source: "The Surrealist Codex",
    theme: "On Time",
  },
];

const typographyExamples = [
  {
    label: "Dream Title",
    className: "font-serif italic",
    size: "text-5xl md:text-6xl",
    colorStyle: "#f0ece4",
    shadow: "0 0 30px rgba(212,165,116,0.25)",
    sample: "The Persistence of Memory",
    note: "Display — clamp 4–11rem, serif italic, cream on midnight",
  },
  {
    label: "Section Heading",
    className: "font-serif italic",
    size: "text-3xl md:text-4xl",
    colorStyle: "#d4a574",
    shadow: "0 0 16px rgba(212,165,116,0.3)",
    sample: "Colors of the Subconscious",
    note: "H2 — 36px, serif italic, desert gold",
  },
  {
    label: "Eyebrow Label",
    className: "font-serif italic tracking-[0.4em] uppercase",
    size: "text-[10px]",
    colorStyle: "#c38d94",
    shadow: "none",
    sample: "The Gallery",
    note: "Caption — 10px, tracked wide, rose dust",
  },
  {
    label: "Body Text",
    className: "font-serif italic",
    size: "text-sm md:text-base",
    colorStyle: "rgba(240,236,228,0.45)",
    shadow: "none",
    sample:
      "Visions pulled from the boundary between sleep and waking, rendered in muted dreamscape hues.",
    note: "Body — 14–16px, serif italic, cream at 45% opacity",
  },
  {
    label: "Code Token",
    className: "font-mono",
    size: "text-[11px]",
    colorStyle: "rgba(195,141,148,0.7)",
    shadow: "none",
    sample: "hover:skew-x-2 hover:-rotate-1 duration-1000 ease-in-out",
    note: "Token — 11px, monospace, rose dust 70%",
  },
];

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
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
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function Orb({
  className,
  style,
}: {
  className: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

function EyeSVG({
  size = 64,
  opacity = 0.15,
}: {
  size?: number;
  opacity?: number;
}) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 80 48"
      fill="none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <path
        d="M4 24C4 24 16 6 40 6C64 6 76 24 76 24C76 24 64 42 40 42C16 42 4 24 4 24Z"
        stroke="#d4a574"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="40" cy="24" r="10" stroke="#d4a574" strokeWidth="1.2" fill="none" />
      <circle cx="40" cy="24" r="4" fill="#d4a574" opacity="0.6" />
      <ellipse cx="36" cy="21" rx="2" ry="1.5" fill="#f0ece4" opacity="0.4" />
    </svg>
  );
}

function ClockSVG({
  size = 60,
  opacity = 0.15,
}: {
  size?: number;
  opacity?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Melting clock face */}
      <ellipse cx="30" cy="26" rx="20" ry="18" stroke="#d4a574" strokeWidth="1.2" fill="none" />
      {/* Dripping bottom */}
      <path
        d="M20 42 Q24 54 30 58 Q36 54 40 42"
        stroke="#d4a574"
        strokeWidth="1.2"
        fill="none"
      />
      {/* Clock hands */}
      <line x1="30" y1="26" x2="30" y2="14" stroke="#d4a574" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="30" y1="26" x2="40" y2="30" stroke="#d4a574" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="30" cy="26" r="2" fill="#d4a574" opacity="0.7" />
    </svg>
  );
}

function SurrealButton({
  children,
  variant = "primary",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
}) {
  if (variant === "secondary") {
    return (
      <button className="px-8 py-3.5 bg-transparent text-[#d4a574] font-serif italic tracking-wide border border-[#d4a574]/40 rounded-full hover:bg-[#d4a574]/10 hover:shadow-[0_0_50px_rgba(212,165,116,0.2)] hover:skew-x-2 hover:-rotate-1 transition-all duration-1000 ease-in-out">
        {children}
      </button>
    );
  }
  if (variant === "ghost") {
    return (
      <button className="px-8 py-3.5 bg-transparent text-[#c38d94] font-serif italic tracking-wide border border-[#c38d94]/30 rounded-[30%_70%_60%_40%/40%_40%_60%_60%] hover:bg-[#c38d94]/10 hover:shadow-[0_0_50px_rgba(195,141,148,0.3)] hover:skew-x-2 hover:-rotate-1 transition-all duration-1000 ease-in-out">
        {children}
      </button>
    );
  }
  return (
    <button className="group px-10 py-4 bg-gradient-to-br from-[#1a1a3e] to-[#4a3f6b] text-[#f0ece4] font-serif italic tracking-wide border border-[#d4a574]/40 rounded-[40%_60%_70%_30%/30%_30%_70%_70%] shadow-[0_4px_24px_rgba(195,141,148,0.15)] hover:shadow-[0_0_50px_rgba(195,141,148,0.3)] hover:skew-x-2 hover:-rotate-1 transition-all duration-1000 ease-in-out">
      {children}
    </button>
  );
}

function DreamGalleryCard({
  item,
  index,
}: {
  item: {
    title: string;
    subtitle: string;
    desc: string;
    orb1: string;
    orb2: string;
    orb3: string;
  };
  index: number;
}) {
  const offsets = ["mt-0", "mt-6 md:mt-10", "mt-0 md:-mt-4"];
  const widths = ["md:w-[34%]", "md:w-[33%]", "md:w-[33%]"];

  return (
    <RevealBlock
      delay={index * 0.1}
      className={`flex-shrink-0 w-full ${widths[index]} ${offsets[index]}`}
    >
      <div className="group relative overflow-hidden rounded-2xl border border-[#d4a574]/20 bg-[#f0ece4] p-8 cursor-pointer hover:shadow-[0_0_50px_rgba(195,141,148,0.3)] hover:skew-x-2 hover:-rotate-1 transition-all duration-700 ease-in-out min-h-[220px]">
        {/* Melting orb top-right */}
        <div
          className={`absolute -top-10 -right-10 w-36 h-36 rounded-full ${item.orb1} blur-2xl group-hover:scale-150 transition-transform duration-[2000ms] ease-in-out`}
        />
        {/* Melting orb bottom-left */}
        <div
          className={`absolute -bottom-8 -left-8 w-28 h-28 rounded-full ${item.orb2} blur-2xl group-hover:scale-150 transition-transform duration-[2000ms] ease-in-out`}
        />
        {/* Melting orb center */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full ${item.orb3} blur-xl group-hover:scale-150 transition-transform duration-[2000ms] ease-in-out`}
        />

        <div className="relative z-10">
          <span className="text-[10px] font-serif italic text-[#c38d94]/60 tracking-[0.25em] uppercase">
            {item.subtitle}
          </span>
          <h3 className="text-xl font-serif italic text-[#1a1a3e] mt-1.5 mb-2 group-hover:tracking-widest transition-all duration-1000 ease-in-out leading-tight">
            {item.title}
          </h3>
          <div className="relative h-px mb-4">
            <div className="absolute inset-0 bg-[#d4a574]/20" />
            <div className="absolute inset-y-0 left-0 w-8 bg-[#d4a574] group-hover:w-full transition-all duration-1000 ease-in-out" />
          </div>
          <p className="text-[#1a1a3e]/55 font-serif text-sm leading-relaxed">{item.desc}</p>
        </div>
      </div>
    </RevealBlock>
  );
}

function WatercolorSwatch({
  color,
  index,
}: {
  color: (typeof colorPalette)[0];
  index: number;
}) {
  return (
    <RevealBlock delay={index * 0.07} className="flex flex-col items-center gap-4">
      <div className="relative group cursor-default">
        {/* Outer glow blob */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-110 transition-all duration-1000 ease-in-out"
          style={{ backgroundColor: color.hex }}
        />
        {/* Main circle */}
        <div
          className="relative w-24 h-24 rounded-full flex items-center justify-center overflow-hidden group-hover:skew-x-1 group-hover:-rotate-1 transition-all duration-700 ease-in-out"
          style={{ backgroundColor: color.hex, boxShadow: `0 8px 32px ${color.glowColor}` }}
        >
          {/* Inner diffuse orb */}
          <div
            className="w-10 h-10 rounded-full blur-md opacity-30 group-hover:scale-150 transition-transform duration-[2000ms] ease-in-out"
            style={{ backgroundColor: color.textColor }}
          />
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-serif italic text-[#f0ece4]/70 tracking-wide">{color.name}</p>
        <p className="text-[10px] font-mono text-[#d4a574]/60 mt-0.5">{color.hex}</p>
        <p className="text-[10px] font-serif italic text-[#f0ece4]/30 mt-0.5 max-w-[100px] mx-auto leading-relaxed">
          {color.description}
        </p>
      </div>
    </RevealBlock>
  );
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  return <SurrealismShowcase />;
}

export function SurrealismShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeDreamTab, setActiveDreamTab] = useState<DreamTab>("Dream I");
  const [activeComponentTab, setActiveComponentTab] = useState<
    "button" | "input" | "card"
  >("button");
  const [activeQuote, setActiveQuote] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a3e] text-[#f0ece4]">
      <style>{`
        @keyframes surreal-drift {
          0%, 100% { transform: translateY(0px) rotate(0deg) skewX(0deg); }
          33% { transform: translateY(-14px) rotate(1.5deg) skewX(0.5deg); }
          66% { transform: translateY(-6px) rotate(-1deg) skewX(-0.5deg); }
        }
        @keyframes surreal-pulse {
          0%, 100% { opacity: 0.12; transform: scale(1); }
          50% { opacity: 0.22; transform: scale(1.08); }
        }
        @keyframes surreal-melt {
          0%, 100% { border-radius: 40% 60% 70% 30% / 30% 30% 70% 70%; }
          25% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 50% 70% / 40% 70% 30% 60%; }
          75% { border-radius: 70% 30% 60% 40% / 30% 60% 40% 70%; }
        }
        .surreal-drift { animation: surreal-drift 9s ease-in-out infinite; }
        .surreal-pulse { animation: surreal-pulse 6s ease-in-out infinite; }
        .surreal-melt { animation: surreal-melt 12s ease-in-out infinite; }
      `}</style>

      {/* ==================================================================
          1. Fixed Navigation
      ================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a3e]/90 backdrop-blur-md border-b border-[#d4a574]/15">
        <div className="relative overflow-hidden">
          {/* Nav orb decorations */}
          <div
            className="absolute -left-8 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-[#d4a574]/15 blur-2xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute right-32 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#c38d94]/12 blur-2xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex items-center justify-between h-16">
              {/* Brand */}
              <Link
                href="/styles/surrealism/showcase"
                className="font-serif italic text-lg text-[#f0ece4] tracking-wider hover:text-[#d4a574] transition-colors duration-700"
              >
                Surrealism
              </Link>

              {/* Nav links */}
              <nav className="hidden md:flex items-center gap-1">
                {["Dream", "Components", "Palette", "Manifesto", "Glossary"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="group relative px-4 py-2 font-serif italic text-xs text-[#f0ece4]/40 tracking-widest hover:text-[#f0ece4]/80 transition-colors duration-700"
                  >
                    <span>{item}</span>
                    <span className="absolute bottom-1 left-4 right-4 h-px bg-[#d4a574] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-left" />
                  </a>
                ))}
              </nav>

              {/* CTA */}
              <Link
                href="/styles"
                className="ml-3 px-5 py-2 font-serif italic text-xs text-[#f0ece4]/70 border border-[#d4a574]/30 rounded-full hover:bg-[#d4a574]/10 hover:shadow-[0_0_20px_rgba(212,165,116,0.2)] hover:skew-x-1 hover:-rotate-[0.5deg] transition-all duration-700 ease-in-out"
              >
                All Styles
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ==================================================================
          2. Hero — midnight bg, melting SVG shapes, serif italic headings
      ================================================================== */}
      <section
        id="dream"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        {/* Background orb field */}
        <Orb className="top-[12%] right-[8%] w-80 h-80 bg-[#d4a574]/10 surreal-pulse" />
        <Orb
          className="bottom-[20%] left-[6%] w-64 h-64 bg-[#c38d94]/10 surreal-pulse"
          style={{ animationDelay: "2s" }}
        />
        <Orb
          className="top-[30%] left-[12%] w-40 h-40 bg-[#4a3f6b]/20 surreal-pulse"
          style={{ animationDelay: "4s" }}
        />
        <Orb className="top-[55%] right-[20%] w-48 h-48 bg-[#d4a574]/8" />
        <Orb className="bottom-[35%] right-[5%] w-52 h-52 bg-[#4a3f6b]/12" />

        {/* Floating surreal decorations */}
        <div
          className="surreal-drift absolute left-[7%] top-[38%] pointer-events-none"
          aria-hidden="true"
        >
          <ClockSVG size={80} opacity={0.14} />
        </div>
        <div
          className="surreal-drift absolute right-[10%] top-[22%] pointer-events-none"
          style={{ animationDelay: "3s" }}
          aria-hidden="true"
        >
          <EyeSVG size={72} opacity={0.12} />
        </div>
        <div
          className="surreal-drift absolute left-[20%] bottom-[18%] pointer-events-none"
          style={{ animationDelay: "5s" }}
          aria-hidden="true"
        >
          <ClockSVG size={50} opacity={0.1} />
        </div>
        <div
          className="absolute right-[14%] bottom-[30%] pointer-events-none surreal-melt w-12 h-12 bg-[#d4a574]/8 blur-sm"
          style={{ animationDelay: "2s" }}
          aria-hidden="true"
        />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          {/* Eyebrow */}
          <p
            className="text-[11px] font-serif italic text-[#d4a574]/55 tracking-[0.5em] mb-8 uppercase"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            StyleKit — Design System
          </p>

          {/* Giant melting title */}
          <h1
            className="font-serif italic leading-[0.88] tracking-tight mb-8 select-none"
            style={{
              fontSize: "clamp(4.5rem, 14vw, 11rem)",
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed
                ? "translateY(0) skewX(0deg)"
                : "translateY(48px) skewX(-3deg)",
              transition:
                "opacity 1.1s cubic-bezier(0.16,1,0.3,1) 0.12s, transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.12s",
            }}
          >
            <span className="text-[#f0ece4]">Sur</span>
            <span className="text-[#d4a574]">real</span>
            <span className="text-[#c38d94]">ism</span>
          </h1>

          {/* Chinese subtitle */}
          <p
            className="text-base font-serif italic text-[#d4a574]/50 mb-3 tracking-[0.25em]"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            超现实主义风
          </p>

          {/* English subtitle */}
          <p
            className="text-lg md:text-2xl font-serif italic text-[#d4a574]/80 mb-4 tracking-wide"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            Beyond the threshold of consciousness
          </p>

          <p
            className="text-base font-serif italic text-[#f0ece4]/35 max-w-lg mx-auto mb-14 leading-relaxed"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s",
            }}
          >
            Where dreams dissolve the boundaries of reason and the subconscious paints with
            impossible colors that no daylight can replicate. A design system born from Dali-inspired
            logic, melting forms, and the poetry of the unconscious mind.
          </p>

          {/* CTA row */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.6s",
            }}
          >
            <SurrealButton>Enter the Dream</SurrealButton>
            <SurrealButton variant="secondary">Observe from Here</SurrealButton>
          </div>

          {/* Hero stat strip */}
          <div
            className="mt-20 grid grid-cols-3 gap-6 max-w-sm mx-auto"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition:
                "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.75s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.75s",
            }}
          >
            {[
              { value: "5", label: "Dream Colors" },
              { value: "8", label: "Design Laws" },
              { value: "1000ms", label: "Dream Easing" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif italic text-2xl text-[#d4a574] mb-0.5">{stat.value}</p>
                <p className="font-serif text-[10px] text-[#f0ece4]/30 tracking-[0.15em] uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div
            className="mt-16 flex flex-col items-center gap-2"
            style={{
              opacity: heroRevealed ? 0.4 : 0,
              transition: "opacity 1s ease 1.2s",
            }}
          >
            <span className="text-[10px] font-serif italic text-[#d4a574]/60 tracking-[0.4em]">
              Descend
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-[#d4a574]/40 to-transparent" />
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#1a1a3e] to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </section>

      {/* ==================================================================
          3. Dream Gallery — tab switcher + asymmetric card layout
      ================================================================== */}
      <section className="py-28 md:py-36 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <RevealBlock className="mb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <span className="text-[10px] font-serif italic text-[#c38d94]/60 tracking-[0.4em] uppercase block mb-3">
                  The Gallery
                </span>
                <h2 className="text-4xl md:text-6xl font-serif italic text-[#f0ece4] leading-tight">
                  Dream<span className="text-[#d4a574]">scapes</span>
                </h2>
              </div>
              <p className="text-sm font-serif italic text-[#f0ece4]/30 max-w-xs md:text-right leading-relaxed">
                Visions pulled from the boundary between sleep and waking, rendered in muted
                dreamscape hues.
              </p>
            </div>
          </RevealBlock>

          {/* Dream tab switcher */}
          <RevealBlock delay={0.08} className="mb-12">
            <div className="flex gap-2 flex-wrap">
              {dreamTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveDreamTab(tab)}
                  className={`px-6 py-2.5 font-serif italic text-sm tracking-wider rounded-full border transition-all duration-700 ease-in-out ${
                    activeDreamTab === tab
                      ? "bg-[#d4a574]/20 border-[#d4a574]/50 text-[#d4a574] shadow-[0_0_20px_rgba(212,165,116,0.15)]"
                      : "bg-transparent border-[#f0ece4]/10 text-[#f0ece4]/35 hover:text-[#f0ece4]/60 hover:border-[#f0ece4]/20"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Asymmetric card row */}
          <div className="flex flex-col md:flex-row gap-5 md:gap-4 md:items-start">
            {dreamCards[activeDreamTab].map((item, i) => (
              <DreamGalleryCard key={`${activeDreamTab}-${i}`} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          4. Component Showcase — cream bg section
      ================================================================== */}
      <section
        id="components"
        className="py-28 md:py-36 px-6 md:px-12 bg-[#f0ece4] relative overflow-hidden"
      >
        {/* Background orbs on cream */}
        <Orb className="top-12 right-16 w-56 h-56 bg-[#d4a574]/12" />
        <Orb className="bottom-16 left-12 w-48 h-48 bg-[#c38d94]/10" />
        <Orb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#4a3f6b]/5" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <RevealBlock>
            <div className="mb-14 text-center">
              <span className="text-[10px] font-serif italic text-[#d4a574]/60 tracking-[0.4em] uppercase block mb-3">
                Elements
              </span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-[#1a1a3e]">
                Components of the Dream
              </h2>
              <p className="text-sm font-serif italic text-[#1a1a3e]/40 mt-4 max-w-md mx-auto leading-relaxed">
                Interactive elements shaped by the rules of the unconscious — each one distorted,
                glowing, melting.
              </p>
            </div>
          </RevealBlock>

          {/* Component tab switcher */}
          <RevealBlock delay={0.08} className="mb-10">
            <div className="flex justify-center gap-2">
              {(["button", "input", "card"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveComponentTab(tab)}
                  className={`px-7 py-2.5 font-serif italic text-sm tracking-wider rounded-full border transition-all duration-700 ease-in-out ${
                    activeComponentTab === tab
                      ? "bg-[#1a1a3e] border-[#1a1a3e] text-[#f0ece4] shadow-[0_0_24px_rgba(26,26,62,0.2)]"
                      : "bg-transparent border-[#1a1a3e]/20 text-[#1a1a3e]/50 hover:text-[#1a1a3e]/80 hover:border-[#1a1a3e]/35"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Component panel */}
          <RevealBlock delay={0.14}>
            <div className="relative rounded-3xl bg-white/60 border border-[#d4a574]/20 p-10 md:p-14 overflow-hidden backdrop-blur-sm">
              <Orb className="top-0 right-0 w-32 h-32 bg-[#d4a574]/10" />
              <Orb className="bottom-0 left-0 w-28 h-28 bg-[#c38d94]/10" />

              <div className="relative z-10 flex flex-col items-center gap-8">
                {activeComponentTab === "button" && (
                  <>
                    <div className="flex flex-col sm:flex-row gap-5 items-center flex-wrap justify-center">
                      <SurrealButton>Enter the Dream</SurrealButton>
                      <SurrealButton variant="secondary">Observe</SurrealButton>
                      <SurrealButton variant="ghost">Dissolve</SurrealButton>
                    </div>
                    <div className="text-center space-y-1.5">
                      <p className="text-xs font-serif italic text-[#1a1a3e]/40 tracking-wider">
                        Primary — organic blob border-radius, Dream-like Distortion skew+rotate,
                        Abyssal Glow
                      </p>
                      <p className="text-xs font-serif italic text-[#1a1a3e]/30 tracking-wider">
                        All transitions at duration-700 to duration-1000 ease-in-out minimum
                      </p>
                    </div>
                  </>
                )}

                {activeComponentTab === "input" && (
                  <>
                    <div className="w-full max-w-md space-y-5">
                      <div>
                        <label className="block text-xs font-serif italic text-[#d4a574]/70 tracking-widest mb-2">
                          Whisper your dreams...
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="What did you dream last night?"
                            className="w-full px-6 py-4 bg-[#f0ece4] border border-[#d4a574]/30 rounded-2xl text-[#1a1a3e] placeholder-[#c38d94]/40 font-serif italic focus:border-[#c38d94]/60 focus:shadow-[0_0_20px_rgba(195,141,148,0.25)] focus:outline-none transition-all duration-700"
                          />
                          <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-r from-[#d4a574]/5 via-transparent to-[#c38d94]/5" />
                        </div>
                        <p className="text-[10px] font-serif italic text-[#c38d94]/40 pl-1 mt-1.5">
                          No dream is too strange to be written down.
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs font-serif italic text-[#d4a574]/70 tracking-widest mb-2">
                          Name the dreamer...
                        </label>
                        <input
                          type="text"
                          placeholder="Salvador, René, Giorgio..."
                          className="w-full px-6 py-4 bg-[#f0ece4] border border-[#d4a574]/30 rounded-2xl text-[#1a1a3e] placeholder-[#c38d94]/40 font-serif italic focus:border-[#c38d94]/60 focus:shadow-[0_0_20px_rgba(195,141,148,0.25)] focus:outline-none transition-all duration-700"
                        />
                      </div>
                    </div>
                    <div className="text-center space-y-1.5">
                      <p className="text-xs font-serif italic text-[#1a1a3e]/40 tracking-wider">
                        Serif italic placeholder, rose-dust Abyssal Glow border on focus
                      </p>
                      <p className="text-xs font-serif italic text-[#1a1a3e]/30 tracking-wider">
                        No black shadow ever — only diffuse dreamscape glow
                      </p>
                    </div>
                  </>
                )}

                {activeComponentTab === "card" && (
                  <>
                    <div className="w-full max-w-md">
                      <div className="group relative overflow-hidden rounded-2xl border border-[#d4a574]/20 bg-white/80 p-8 cursor-pointer hover:shadow-[0_0_50px_rgba(195,141,148,0.3)] hover:skew-x-2 hover:-rotate-1 transition-all duration-700 ease-in-out">
                        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#d4a574]/20 blur-2xl group-hover:scale-150 transition-transform duration-[2000ms] ease-in-out" />
                        <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-[#c38d94]/20 blur-2xl group-hover:scale-150 transition-transform duration-[2000ms] ease-in-out" />
                        <div className="relative z-10">
                          <span className="text-[10px] font-serif italic text-[#c38d94]/60 tracking-[0.3em] uppercase">
                            Time
                          </span>
                          <h3 className="text-xl font-serif italic text-[#1a1a3e] mt-1.5 mb-2 group-hover:tracking-widest transition-all duration-1000 ease-in-out">
                            The Persistence of Memory
                          </h3>
                          <div className="relative h-px mb-4">
                            <div className="absolute inset-0 bg-[#d4a574]/15" />
                            <div className="absolute inset-y-0 left-0 w-8 bg-[#d4a574] group-hover:w-full transition-all duration-1000 ease-in-out" />
                          </div>
                          <p className="text-[#1a1a3e]/50 font-serif text-sm leading-relaxed">
                            Hours bend and pour like liquid gold across stone archways that remember
                            nothing.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center space-y-1.5">
                      <p className="text-xs font-serif italic text-[#1a1a3e]/40 tracking-wider">
                        Color Melting orbs expand over 2000ms on hover
                      </p>
                      <p className="text-xs font-serif italic text-[#1a1a3e]/30 tracking-wider">
                        Title tracking expands (duration-1000) — gold underline extends from w-8 to
                        w-full
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ==================================================================
          5. Color Palette — watercolor blob swatches, midnight bg
      ================================================================== */}
      <section
        id="palette"
        className="py-28 md:py-36 px-6 md:px-12 relative overflow-hidden"
      >
        <Orb className="top-20 left-1/4 w-72 h-72 bg-[#4a3f6b]/10 surreal-pulse" />
        <Orb className="bottom-20 right-1/4 w-56 h-56 bg-[#d4a574]/7" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-20">
              <span className="text-[10px] font-serif italic text-[#d4a574]/55 tracking-[0.4em] uppercase block mb-3">
                Palette
              </span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-[#f0ece4]">
                Colors of the <span className="text-[#d4a574]">Subconscious</span>
              </h2>
              <p className="text-sm font-serif italic text-[#f0ece4]/30 mt-4 max-w-sm mx-auto leading-relaxed">
                Each hue is a memory half-remembered — muted, dreamlike, never harsh. The palette
                of the unconscious speaks in whispers.
              </p>
            </div>
          </RevealBlock>

          {/* Watercolor blob swatches */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-12 md:gap-x-12">
            {colorPalette.map((color, i) => (
              <WatercolorSwatch key={color.hex} color={color} index={i} />
            ))}
          </div>

          {/* Color melting strip */}
          <RevealBlock delay={0.3} className="mt-20">
            <div className="relative">
              <div
                className="relative h-4 rounded-full overflow-hidden"
                style={{
                  background:
                    "linear-gradient(to right, #1a1a3e, #4a3f6b, #c38d94, #d4a574, #f0ece4)",
                }}
              >
                <div
                  className="absolute inset-0 blur-sm opacity-60"
                  style={{
                    background:
                      "linear-gradient(to right, #1a1a3e, #4a3f6b, #c38d94, #d4a574, #f0ece4)",
                  }}
                />
              </div>
              <div className="flex justify-between mt-3 px-1">
                {colorPalette.map((c) => (
                  <span
                    key={c.hex}
                    className="text-[9px] font-mono"
                    style={{ color: `${c.hex === "#1a1a3e" ? "#d4a574" : c.hex}80` }}
                  >
                    {c.hex}
                  </span>
                ))}
              </div>
              <p className="text-center text-[10px] font-serif italic text-[#f0ece4]/20 tracking-widest mt-3">
                Midnight to Cream — the full spectrum of the dream
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ==================================================================
          6. Surrealist Imagery — Dali quotes & dreamscape references
      ================================================================== */}
      <section className="py-28 md:py-36 px-6 md:px-12 bg-[#f0ece4] relative overflow-hidden">
        <Orb className="top-16 right-16 w-52 h-52 bg-[#d4a574]/12" />
        <Orb className="bottom-20 left-20 w-44 h-44 bg-[#c38d94]/10" />

        {/* Large eye watermark */}
        <div
          className="absolute top-1/2 right-8 -translate-y-1/2 pointer-events-none"
          aria-hidden="true"
        >
          <EyeSVG size={200} opacity={0.05} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock>
            <div className="mb-16">
              <span className="text-[10px] font-serif italic text-[#c38d94]/55 tracking-[0.4em] uppercase block mb-3">
                Dream Journal
              </span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-[#1a1a3e] leading-tight">
                The <span className="text-[#d4a574]">Surrealist</span> Vision
              </h2>
              <p className="text-sm font-serif italic text-[#1a1a3e]/45 mt-4 max-w-sm leading-relaxed">
                Words from the masters of the unconscious — inscribed at the threshold between
                reason and revelation.
              </p>
            </div>
          </RevealBlock>

          {/* Quote selector tabs */}
          <RevealBlock delay={0.06} className="mb-10">
            <div className="flex gap-2 flex-wrap">
              {daliQuotes.map((q, i) => (
                <button
                  key={i}
                  onClick={() => setActiveQuote(i)}
                  className={`px-5 py-2 font-serif italic text-xs tracking-widest rounded-full border transition-all duration-700 ease-in-out ${
                    activeQuote === i
                      ? "bg-[#1a1a3e] border-[#1a1a3e] text-[#f0ece4] shadow-[0_0_20px_rgba(26,26,62,0.2)]"
                      : "bg-transparent border-[#1a1a3e]/20 text-[#1a1a3e]/45 hover:border-[#1a1a3e]/40 hover:text-[#1a1a3e]/70"
                  }`}
                >
                  {q.theme}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Active quote display */}
          <RevealBlock delay={0.1}>
            <div className="group relative p-10 md:p-14 rounded-3xl bg-white/70 border border-[#d4a574]/20 overflow-hidden backdrop-blur-sm hover:shadow-[0_0_50px_rgba(195,141,148,0.2)] hover:skew-x-1 hover:-rotate-[0.5deg] transition-all duration-1000 ease-in-out">
              <Orb className="-top-6 -right-6 w-32 h-32 bg-[#d4a574]/12 group-hover:scale-150 transition-transform duration-[2000ms] ease-in-out" />
              <Orb className="-bottom-6 -left-6 w-24 h-24 bg-[#c38d94]/10 group-hover:scale-150 transition-transform duration-[2000ms] ease-in-out" />

              <div className="relative z-10 text-center">
                <div className="mb-8 flex justify-center">
                  <ClockSVG size={48} opacity={0.15} />
                </div>
                <blockquote className="text-xl md:text-2xl font-serif italic text-[#1a1a3e]/70 leading-relaxed max-w-2xl mx-auto mb-8">
                  &ldquo;{daliQuotes[activeQuote].quote}&rdquo;
                </blockquote>
                <p className="text-xs font-serif italic text-[#d4a574]/70 tracking-[0.3em] uppercase">
                  — {daliQuotes[activeQuote].source}
                </p>
              </div>
            </div>
          </RevealBlock>

          {/* Surrealist concept cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            {[
              {
                icon: "eye",
                title: "The Watching Eye",
                desc: "In surrealism, the eye is never passive. It absorbs, transforms, and returns the world unrecognized.",
              },
              {
                icon: "clock",
                title: "Liquefied Time",
                desc: "Clocks melt because time in dreams has no fixed form. It pools, drips, and evaporates without warning.",
              },
              {
                icon: "landscape",
                title: "Impossible Landscape",
                desc: "Desert and sea and sky collapse into one. Perspective is a convention that the dream refuses to honor.",
              },
            ].map((concept, i) => (
              <RevealBlock key={concept.title} delay={i * 0.08}>
                <div className="group relative p-7 rounded-2xl bg-white/60 border border-[#d4a574]/15 overflow-hidden hover:shadow-[0_0_50px_rgba(195,141,148,0.2)] hover:skew-x-2 hover:-rotate-1 transition-all duration-700 ease-in-out cursor-default h-full">
                  <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-[#d4a574]/15 blur-2xl group-hover:scale-150 transition-transform duration-[2000ms] ease-in-out" />
                  <div className="relative z-10">
                    <div className="mb-4">
                      {concept.icon === "eye" && <EyeSVG size={40} opacity={0.25} />}
                      {concept.icon === "clock" && <ClockSVG size={40} opacity={0.25} />}
                      {concept.icon === "landscape" && (
                        <svg width="40" height="24" viewBox="0 0 80 48" fill="none" style={{ opacity: 0.25 }} aria-hidden="true">
                          <path d="M0 36 Q20 8 40 28 Q60 48 80 20" stroke="#d4a574" strokeWidth="1.5" fill="none" />
                          <circle cx="60" cy="12" r="8" stroke="#d4a574" strokeWidth="1.2" fill="none" />
                        </svg>
                      )}
                    </div>
                    <h4 className="text-base font-serif italic text-[#1a1a3e]/80 mb-2 group-hover:tracking-wide transition-all duration-700 ease-in-out">
                      {concept.title}
                    </h4>
                    <p className="text-xs font-serif italic text-[#1a1a3e]/45 leading-relaxed">
                      {concept.desc}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          7. Interaction Glossary — midnight bg, gold accents
      ================================================================== */}
      <section
        id="glossary"
        className="py-28 md:py-36 px-6 md:px-12 relative overflow-hidden"
      >
        <Orb
          className="top-16 left-[20%] w-64 h-64 bg-[#c38d94]/8 surreal-pulse"
          style={{ animationDelay: "1s" }}
        />
        <Orb className="bottom-16 right-[15%] w-48 h-48 bg-[#d4a574]/8" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-16">
              <span className="text-[10px] font-serif italic text-[#c38d94]/55 tracking-[0.4em] uppercase block mb-3">
                Glossary
              </span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-[#f0ece4]">
                Physics of the <span className="text-[#d4a574]">Dreamworld</span>
              </h2>
              <p className="text-sm font-serif italic text-[#f0ece4]/30 mt-4 max-w-sm mx-auto leading-relaxed">
                Every interaction pattern has a name. Learn the language of the subconscious.
              </p>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4">
            {[
              {
                name: "Dream-like Distortion",
                token: "hover:skew-x-2 hover:-rotate-1",
                desc: "Nothing in the dream world stands perfectly upright. Elements tilt and drift on hover.",
                delay: 0.04,
                orbColor: "bg-[#d4a574]/12",
              },
              {
                name: "Timeless Easing",
                token: "duration-1000 ease-in-out",
                desc: "Time moves differently here. Minimum 700ms, prefer 1000ms. Never 200ms.",
                delay: 0.1,
                orbColor: "bg-[#c38d94]/12",
              },
              {
                name: "Color Melting",
                token: "group-hover:scale-150 duration-[2000ms]",
                desc: "Orb decorations expand slowly over 2 full seconds, bleeding color at the edges.",
                delay: 0.16,
                orbColor: "bg-[#4a3f6b]/18",
              },
              {
                name: "Abyssal Glow",
                token: "shadow-[0_0_50px_rgba(195,141,148,0.3)]",
                desc: "Light rises from within the element — rose and gold diffuse, never a black drop.",
                delay: 0.22,
                orbColor: "bg-[#d4a574]/12",
              },
              {
                name: "Expanding Underline",
                token: "group-hover:w-full duration-1000",
                desc: "The golden line follows like a slow tide, extending from its origin across full width.",
                delay: 0.28,
                orbColor: "bg-[#c38d94]/12",
              },
              {
                name: "Letter-space Bloom",
                token: "group-hover:tracking-widest duration-1000",
                desc: "Characters breathe apart on hover, as if the word itself is waking up from sleep.",
                delay: 0.34,
                orbColor: "bg-[#4a3f6b]/18",
              },
            ].map((item) => (
              <RevealBlock key={item.name} delay={item.delay}>
                <div className="group relative p-6 rounded-2xl border border-[#d4a574]/10 bg-[#f0ece4]/4 overflow-hidden hover:border-[#d4a574]/28 hover:bg-[#f0ece4]/5 hover:shadow-[0_0_30px_rgba(212,165,116,0.10)] transition-all duration-700 ease-in-out cursor-default h-full">
                  <div
                    className={`absolute -top-6 -right-6 w-20 h-20 rounded-full ${item.orbColor} blur-2xl group-hover:scale-150 transition-transform duration-[2000ms] ease-in-out`}
                  />
                  <div className="relative z-10">
                    <h4 className="text-base font-serif italic text-[#d4a574] mb-1.5 group-hover:tracking-wide transition-all duration-700 ease-in-out">
                      {item.name}
                    </h4>
                    <code className="text-[10px] font-mono text-[#c38d94]/55 block mb-3 leading-relaxed break-all">
                      {item.token}
                    </code>
                    <p className="text-xs font-serif italic text-[#f0ece4]/35 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
          8. Design Manifesto — Do / Don't, cream bg
      ================================================================== */}
      <section
        id="manifesto"
        className="py-28 md:py-36 px-6 md:px-12 bg-[#f0ece4] relative overflow-hidden"
      >
        <Orb className="top-1/3 left-1/3 w-36 h-36 bg-[#4a3f6b]/5" />
        <Orb className="bottom-16 right-16 w-48 h-48 bg-[#c38d94]/8" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock>
            <div className="mb-16">
              <span className="text-[10px] font-serif italic text-[#c38d94]/55 tracking-[0.4em] uppercase block mb-3">
                Manifesto
              </span>
              <h2 className="text-4xl md:text-5xl font-serif italic text-[#1a1a3e] leading-tight">
                Laws of the <span className="text-[#d4a574]">Dream</span>
              </h2>
              <p className="text-sm font-serif italic text-[#1a1a3e]/45 mt-4 max-w-sm leading-relaxed">
                A dream journal for designers. Written in the half-light between intention and
                intuition.
              </p>
            </div>
          </RevealBlock>

          {/* Asymmetric two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-6 md:gap-8">
            {/* Do column */}
            <RevealBlock delay={0.06}>
              <div className="relative p-8 md:p-10 rounded-3xl bg-white/70 border border-[#d4a574]/20 overflow-hidden backdrop-blur-sm h-full">
                <Orb className="-top-6 -right-6 w-24 h-24 bg-[#d4a574]/12" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#d4a574]" />
                    <h3 className="font-serif italic text-[#1a1a3e] text-base tracking-widest">
                      Embrace
                    </h3>
                  </div>
                  <ul className="space-y-5">
                    {doRules.map((rule, i) => (
                      <li
                        key={i}
                        className="group border-l-2 border-[#d4a574]/20 hover:border-[#d4a574] pl-4 transition-all duration-700 ease-in-out"
                      >
                        <p className="text-sm font-serif italic text-[#1a1a3e]/80 font-medium leading-snug group-hover:text-[#1a1a3e] transition-colors duration-700">
                          {rule.title}
                        </p>
                        <p className="text-xs font-serif italic text-[#1a1a3e]/40 leading-relaxed mt-1 group-hover:text-[#1a1a3e]/60 transition-colors duration-700">
                          {rule.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>

            {/* Don't column — offset vertically for asymmetry */}
            <RevealBlock delay={0.12} className="md:mt-8">
              <div className="relative p-8 md:p-10 rounded-3xl bg-white/70 border border-[#c38d94]/20 overflow-hidden backdrop-blur-sm h-full">
                <Orb className="-bottom-6 -left-6 w-24 h-24 bg-[#c38d94]/10" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#c38d94]" />
                    <h3 className="font-serif italic text-[#1a1a3e] text-base tracking-widest">
                      Resist
                    </h3>
                  </div>
                  <ul className="space-y-5">
                    {dontRules.map((rule, i) => (
                      <li
                        key={i}
                        className="group border-l-2 border-[#c38d94]/20 hover:border-[#c38d94] pl-4 transition-all duration-700 ease-in-out"
                      >
                        <p className="text-sm font-serif italic text-[#1a1a3e]/80 font-medium leading-snug group-hover:text-[#1a1a3e] transition-colors duration-700">
                          {rule.title}
                        </p>
                        <p className="text-xs font-serif italic text-[#1a1a3e]/40 leading-relaxed mt-1 group-hover:text-[#1a1a3e]/60 transition-colors duration-700">
                          {rule.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Typography showcase */}
          <RevealBlock delay={0.2} className="mt-12">
            <div className="p-8 md:p-10 rounded-3xl bg-white/60 border border-[#d4a574]/15 overflow-hidden backdrop-blur-sm">
              <h3 className="font-serif italic text-[#1a1a3e] text-base tracking-widest mb-8">
                Typography System
              </h3>
              <div className="space-y-6">
                {typographyExamples.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8 pb-5 border-b border-[#d4a574]/10 last:border-0 last:pb-0"
                  >
                    <div className="md:w-36 flex-shrink-0">
                      <span className="text-[10px] font-serif italic text-[#c38d94]/55 tracking-[0.2em] uppercase">
                        {item.label}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <p
                        className={`${item.size} ${item.className} leading-tight truncate`}
                        style={{
                          color: item.colorStyle,
                          textShadow: item.shadow !== "none" ? item.shadow : undefined,
                        }}
                      >
                        {item.sample}
                      </p>
                    </div>
                    <div className="md:w-48 flex-shrink-0">
                      <p className="text-[10px] font-serif italic text-[#1a1a3e]/35 leading-relaxed">
                        {item.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ==================================================================
          9. Footer — midnight dark, cream text, poetic motto
      ================================================================== */}
      <footer className="py-16 px-6 md:px-12 border-t border-[#d4a574]/10 relative overflow-hidden">
        <Orb className="-left-10 top-1/2 -translate-y-1/2 w-32 h-32 bg-[#d4a574]/7" />
        <Orb className="-right-10 top-1/2 -translate-y-1/2 w-28 h-28 bg-[#c38d94]/7" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Poetic motto */}
          <div className="text-center mb-12">
            <p className="text-2xl md:text-3xl font-serif italic text-[#f0ece4]/25 leading-relaxed max-w-xl mx-auto">
              Where logic dissolves,{" "}
              <span className="text-[#d4a574]/45">beauty begins.</span>
            </p>
          </div>

          {/* Color dots strip */}
          <div className="flex justify-center gap-3 mb-10">
            {colorPalette.map((c) => (
              <div
                key={c.hex}
                className="w-3 h-3 rounded-full transition-all duration-700 hover:scale-125"
                style={{
                  background: c.hex,
                  boxShadow: `0 0 8px ${c.glowColor}`,
                  border: c.hex === "#f0ece4" ? "1px solid rgba(212,165,116,0.3)" : "none",
                }}
                title={c.name}
              />
            ))}
          </div>

          {/* Footer nav row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-[#d4a574]/8">
            <div className="flex items-center gap-4">
              <div className="w-1 h-6 bg-[#d4a574]/35 rounded-full" />
              <div>
                <p className="font-serif italic text-sm text-[#f0ece4]/20 tracking-widest">
                  Surrealism — StyleKit
                </p>
                <p className="font-serif italic text-[10px] text-[#d4a574]/35 tracking-wider mt-0.5">
                  超现实主义风 — Dali-inspired Design System
                </p>
              </div>
            </div>

            <nav className="flex items-center gap-6">
              <Link
                href="/styles/surrealism"
                className="group relative font-serif italic text-xs text-[#f0ece4]/25 tracking-widest hover:text-[#d4a574]/70 transition-colors duration-700"
              >
                Docs
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#d4a574]/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-left" />
              </Link>
              <Link
                href="/styles"
                className="group relative font-serif italic text-xs text-[#f0ece4]/25 tracking-widest hover:text-[#d4a574]/70 transition-colors duration-700"
              >
                All Styles
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#d4a574]/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-left" />
              </Link>
              <Link
                href="/"
                className="group relative font-serif italic text-xs text-[#f0ece4]/25 tracking-widest hover:text-[#d4a574]/70 transition-colors duration-700"
              >
                Home
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#d4a574]/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-left" />
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
