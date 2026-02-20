"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

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

// ─── Inline SVG Pattern Components ──────────────────────────────────────────

function KenteStripe({ height = 8 }: { height?: number }) {
  return (
    <div className="w-full flex" style={{ height }}>
      <div className="flex-1 bg-[#c4501f]" />
      <div className="flex-1 bg-[#f0c75e]" />
      <div className="flex-1 bg-[#1a5632]" />
      <div className="flex-1 bg-[#c4501f]" />
      <div className="flex-1 bg-[#f0c75e]" />
      <div className="flex-1 bg-[#1a5632]" />
      <div className="flex-1 bg-[#c4501f]" />
      <div className="flex-1 bg-[#f0c75e]" />
      <div className="flex-1 bg-[#1a5632]" />
      <div className="flex-1 bg-[#c4501f]" />
      <div className="flex-1 bg-[#f0c75e]" />
      <div className="flex-1 bg-[#1a5632]" />
    </div>
  );
}

function ZigzagPattern() {
  return (
    <svg
      viewBox="0 0 200 40"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polyline
        points="0,20 20,5 40,20 60,5 80,20 100,5 120,20 140,5 160,20 180,5 200,20"
        fill="none"
        stroke="#c4501f"
        strokeWidth="3"
      />
      <polyline
        points="0,30 20,15 40,30 60,15 80,30 100,15 120,30 140,15 160,30 180,15 200,30"
        fill="none"
        stroke="#f0c75e"
        strokeWidth="2"
      />
      <polyline
        points="0,38 20,23 40,38 60,23 80,38 100,23 120,38 140,23 160,38 180,23 200,38"
        fill="none"
        stroke="#1a5632"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function DiamondPattern() {
  return (
    <svg
      viewBox="0 0 200 80"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {[0, 40, 80, 120, 160].map((x) => (
        <g key={x}>
          <polygon
            points={`${x + 20},5 ${x + 38},20 ${x + 20},35 ${x + 2},20`}
            fill="#c4501f"
            opacity="0.8"
          />
          <polygon
            points={`${x + 20},42 ${x + 38},57 ${x + 20},72 ${x + 2},57`}
            fill="#f0c75e"
            opacity="0.8"
          />
          <polygon
            points={`${x + 20},5 ${x + 38},20 ${x + 20},35 ${x + 2},20`}
            fill="none"
            stroke="#2c1810"
            strokeWidth="1.5"
          />
          <polygon
            points={`${x + 20},42 ${x + 38},57 ${x + 20},72 ${x + 2},57`}
            fill="none"
            stroke="#2c1810"
            strokeWidth="1.5"
          />
        </g>
      ))}
    </svg>
  );
}

function CrossStitchPattern() {
  const crosses = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 8; col++) {
      const x = col * 25 + 12;
      const y = row * 25 + 12;
      const color = (row + col) % 3 === 0 ? "#c4501f" : (row + col) % 3 === 1 ? "#f0c75e" : "#1a5632";
      crosses.push(
        <g key={`${row}-${col}`}>
          <line x1={x - 6} y1={y - 6} x2={x + 6} y2={y + 6} stroke={color} strokeWidth="2" />
          <line x1={x + 6} y1={y - 6} x2={x - 6} y2={y + 6} stroke={color} strokeWidth="2" />
        </g>
      );
    }
  }
  return (
    <svg
      viewBox="0 0 200 80"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {crosses}
    </svg>
  );
}

function ChevronPattern() {
  return (
    <svg
      viewBox="0 0 200 60"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polygon points="0,0 100,30 200,0 200,10 100,40 0,10" fill="#c4501f" />
      <polygon points="0,15 100,45 200,15 200,25 100,55 0,25" fill="#f0c75e" />
      <polygon points="0,30 100,60 200,30 200,40 100,60 0,40" fill="#1a5632" />
    </svg>
  );
}

function WeaveGridPattern() {
  const cells = [];
  const colors = ["#c4501f", "#f0c75e", "#1a5632", "#e8d5b5", "#c4501f", "#f0c75e", "#1a5632", "#2c1810"];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 8; col++) {
      const colorIndex = (row * 3 + col) % colors.length;
      cells.push(
        <rect
          key={`${row}-${col}`}
          x={col * 25}
          y={row * 20}
          width="24"
          height="19"
          fill={colors[colorIndex]}
          opacity={row % 2 === col % 2 ? 1 : 0.6}
        />
      );
    }
  }
  return (
    <svg
      viewBox="0 0 200 80"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {cells}
    </svg>
  );
}

function TrianglePattern() {
  const triangles = [];
  for (let col = 0; col < 10; col++) {
    const x = col * 20;
    const color = col % 3 === 0 ? "#c4501f" : col % 3 === 1 ? "#f0c75e" : "#1a5632";
    triangles.push(
      <g key={col}>
        <polygon points={`${x},0 ${x + 20},0 ${x + 10},20`} fill={color} />
        <polygon points={`${x},40 ${x + 10},20 ${x + 20},40`} fill={color} opacity="0.6" />
      </g>
    );
  }
  return (
    <svg
      viewBox="0 0 200 40"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {triangles}
    </svg>
  );
}

// Decorative Adinkra-inspired symbol (Sankofa bird silhouette)
function AdinkraSymbol({ color = "#f0c75e", size = 48 }: { color?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="20" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="24" cy="24" r="14" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <polygon points="24,8 30,20 18,20" fill={color} />
      <polygon points="24,40 18,28 30,28" fill={color} opacity="0.7" />
      <rect x="22" y="20" width="4" height="8" fill={color} />
      <circle cx="24" cy="24" r="3" fill={color} opacity="0.4" />
    </svg>
  );
}

// Main Component
export default function ShowcaseContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeComponentTab, setActiveComponentTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [toggleStates, setToggleStates] = useState([true, false, true]);
  const [weavingProgress, setWeavingProgress] = useState(65);

  const { ref: heroRef, inView: heroInView } = useInView();
  const { ref: statsRef, inView: statsInView } = useInView();

  const componentTabs = ["Button", "Card", "Input"];

  const accordionItems = [
    {
      title: "What is Kente Cloth?",
      content:
        "Kente, known as nwentoma among the Akan of Ghana and Ivory Coast, is one of Africa's most recognized textiles. Woven in colorful, geometric strips, each pattern combination carries specific proverbs, historical events, or philosophical concepts. Gold represents royalty and wealth, green represents growth and renewal, and red carries the weight of sacrifice and struggle.",
    },
    {
      title: "The Adire Tradition",
      content:
        "Adire — meaning 'tied and dyed' in Yoruba — is the indigo-dyed cloth of Nigeria's Yoruba people. Artisans apply cassava paste or tie-resist patterns before immersing cloth in indigo vats. Each design encodes proverbs and cultural knowledge. The craft has been predominantly carried by women, passed from mother to daughter across generations.",
    },
    {
      title: "Geometry as Visual Language",
      content:
        "In West African textile arts, geometric patterns are not merely decorative — they communicate. Zigzags trace life's winding journey. Diamonds represent the dual nature of existence: the seen and unseen worlds. Cross-stitch repeats bind communities across time. Interlocking chevrons signify unity and collective strength. Every thread is a word in a living visual language.",
    },
    {
      title: "Why Patterns Are Essential",
      content:
        "An African textile design without pattern is like a griot without stories. The dense rhythmic repetition of shapes creates visual music — a controlled abundance that celebrates rather than minimizes. White space is not virtue here; fullness, richness, and layered visual information express generosity, hospitality, and cultural pride.",
    },
  ];

  const colorPalette = [
    { name: "Kente Orange", hex: "#c4501f", textDark: true },
    { name: "Dark Wood", hex: "#2c1810", textDark: false },
    { name: "Gold", hex: "#f0c75e", textDark: true },
    { name: "Forest Green", hex: "#1a5632", textDark: false },
    { name: "Sand", hex: "#e8d5b5", textDark: true },
  ];

  const principles = [
    {
      type: "do" as const,
      title: "Bold Pattern Repetition",
      desc: "Layer geometric motifs rhythmically. Repetition creates the visual rhythm that makes textiles sing.",
    },
    {
      type: "do" as const,
      title: "Warm Earth Colors",
      desc: "Ground every palette in the ochres, terracottas, and forest greens of the West African landscape.",
    },
    {
      type: "do" as const,
      title: "Heavy Typography",
      desc: "Bold, wide-tracked uppercase text carries the authority of tradition. Thin fonts betray the craft.",
    },
    {
      type: "dont" as const,
      title: "Cold Blues or Tech Tones",
      desc: "Digital-native palettes — electric blue, cool grays, neon accents — break the cultural grounding entirely.",
    },
    {
      type: "dont" as const,
      title: "Minimalist Empty Space",
      desc: "Silence in textile is waste. Every surface invites pattern. Refuse the modern cult of emptiness.",
    },
    {
      type: "dont" as const,
      title: "Thin Delicate Fonts",
      desc: "Hairline weights dissolve the authority that bold craft demands. Use weight as a statement.",
    },
  ];

  const craftCards = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
          <rect x="2" y="6" width="4" height="12" fill="#c4501f" />
          <rect x="8" y="4" width="4" height="16" fill="#f0c75e" />
          <rect x="14" y="6" width="4" height="12" fill="#1a5632" />
          <rect x="20" y="8" width="2" height="8" fill="#c4501f" />
          <line x1="2" y1="12" x2="22" y2="12" stroke="#2c1810" strokeWidth="0.5" />
        </svg>
      ),
      title: "Kente Weave",
      subtitle: "Ghana & Ivory Coast",
      desc: "Warp-dominated strip weaving producing bold geometric bands. Gold, green, and red threads interlock to carry proverbs and status. Each 4-inch strip is stitched together with neighboring strips to build the final cloth.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
          <circle cx="12" cy="12" r="8" stroke="#1a5632" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" fill="#f0c75e" opacity="0.5" />
          <circle cx="12" cy="12" r="1.5" fill="#c4501f" />
          <path d="M12 4 Q16 8 12 12 Q8 8 12 4" fill="#1a5632" opacity="0.6" />
          <path d="M20 12 Q16 16 12 12 Q16 8 20 12" fill="#c4501f" opacity="0.6" />
        </svg>
      ),
      title: "Adire Indigo",
      subtitle: "Yoruba, Nigeria",
      desc: "Resist-dyeing with indigo produces otherworldly patterns. Cassava paste, raffia ties, and stitching block the dye from penetrating cloth. Unwrapped, the fabric reveals pale negative space against deep blue — each piece unique, unrepeatable.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
          <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" stroke="#f0c75e" strokeWidth="2" fill="none" />
          <polygon points="12,6 18,10 18,14 12,18 6,14 6,10" fill="#c4501f" opacity="0.5" />
          <polygon points="12,9 15,11 15,13 12,15 9,13 9,11" fill="#1a5632" />
        </svg>
      ),
      title: "Mudcloth (Bogolan)",
      subtitle: "Mali & Senegal",
      desc: "Fermented mud applied over sun-dried, tannin-soaked cotton creates permanent dark patterns. White negative space is left by the original cloth. Symbols encode hunter's achievements, proverbs, and protective power. Each cloth is a wearable archive.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
          <rect x="3" y="3" width="8" height="8" fill="#c4501f" />
          <rect x="13" y="3" width="8" height="8" fill="#f0c75e" />
          <rect x="3" y="13" width="8" height="8" fill="#1a5632" />
          <rect x="13" y="13" width="8" height="8" fill="#c4501f" />
          <line x1="3" y1="11" x2="21" y2="11" stroke="#2c1810" strokeWidth="1" />
          <line x1="11" y1="3" x2="11" y2="21" stroke="#2c1810" strokeWidth="1" />
        </svg>
      ),
      title: "Kuba Weave",
      subtitle: "Democratic Republic of Congo",
      desc: "Cut-pile embroidery on raffia creates velvety geometric patterns with extraordinary precision. Kuba kings historically restricted certain patterns for royal use alone. The density of pattern and the tactile depth of pile create cloth you read with your fingertips.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#2c1810] text-[#e8d5b5]">
      {/* Top Kente stripe */}
      <KenteStripe height={10} />

      {/* ─── Navigation ──────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 px-6 py-4 bg-[#2c1810] border-b-4 border-[#f0c75e]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/african-textile"
            className="flex items-center gap-2 text-[#f0c75e] hover:text-[#e8d5b5] transition-colors duration-200"
          >
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-bold uppercase tracking-widest">Back</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-center">
              <span className="w-3 h-3 rounded-sm bg-[#c4501f] inline-block" />
              <span className="w-3 h-3 rounded-sm bg-[#f0c75e] inline-block" />
              <span className="w-3 h-3 rounded-sm bg-[#1a5632] inline-block" />
            </div>
            <span className="font-bold text-base md:text-lg uppercase tracking-widest text-[#e8d5b5]">
              African Textile
            </span>
          </div>

          <Link
            href="/"
            className="px-4 py-2 text-sm font-bold uppercase tracking-widest text-[#2c1810] bg-[#f0c75e] border-2 border-[#c4501f] shadow-[4px_4px_0_#c4501f] hover:shadow-[6px_6px_0_#c4501f] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200"
          >
            StyleKit &rarr;
          </Link>
        </div>
      </nav>

      {/* ─── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 md:py-36 px-6">
        {/* Background weave grid decoration */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <WeaveGridPattern />
        </div>

        {/* Left vertical stripe accent */}
        <div className="absolute left-0 top-0 bottom-0 w-3 flex flex-col">
          <div className="flex-1 bg-[#c4501f]" />
          <div className="flex-1 bg-[#f0c75e]" />
          <div className="flex-1 bg-[#1a5632]" />
          <div className="flex-1 bg-[#c4501f]" />
        </div>

        {/* Right vertical stripe accent */}
        <div className="absolute right-0 top-0 bottom-0 w-3 flex flex-col">
          <div className="flex-1 bg-[#1a5632]" />
          <div className="flex-1 bg-[#c4501f]" />
          <div className="flex-1 bg-[#f0c75e]" />
          <div className="flex-1 bg-[#1a5632]" />
        </div>

        {/* Hero Kente pattern strip across top */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="h-10 border-2 border-[#f0c75e] overflow-hidden">
            <ZigzagPattern />
          </div>
        </div>

        <div
          ref={heroRef}
          className="max-w-4xl mx-auto text-center relative z-10"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(48px)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* Adinkra symbol */}
          <div className="flex justify-center mb-6">
            <AdinkraSymbol color="#f0c75e" size={64} />
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-1 flex-1 max-w-[80px] bg-[#c4501f]" />
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#f0c75e]">
              Kente &middot; Adire &middot; Bogolan
            </span>
            <div className="h-1 flex-1 max-w-[80px] bg-[#c4501f]" />
          </div>

          <h1 className="text-5xl md:text-8xl font-bold text-[#e8d5b5] mb-4 leading-tight uppercase tracking-widest">
            Woven
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold text-[#c4501f] mb-4 uppercase tracking-widest">
            Traditions
          </h2>
          <div className="flex justify-center mb-6">
            <span className="text-3xl md:text-4xl font-bold text-[#f0c75e] uppercase tracking-wider">
              非洲纺织
            </span>
          </div>

          <p className="text-base md:text-lg text-[#e8d5b5]/80 max-w-2xl mx-auto leading-relaxed tracking-wide mb-10">
            Centuries of West African textile craftsmanship translated into digital design.
            Bold geometric patterns, rhythmic repetition, vibrant life energy — every thread
            carries a story, every color a meaning.
          </p>

          {/* Rhythmic color block decorations */}
          <div className="flex justify-center gap-2 flex-wrap">
            {["#c4501f", "#f0c75e", "#1a5632", "#e8d5b5", "#c4501f", "#f0c75e", "#1a5632"].map(
              (color, i) => (
                <div
                  key={i}
                  className="w-8 h-8 md:w-10 md:h-10 border-2 border-[#2c1810]"
                  style={{ backgroundColor: color }}
                />
              )
            )}
          </div>
        </div>

        {/* Hero Kente pattern strip across bottom */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="h-10 border-2 border-[#f0c75e] overflow-hidden">
            <ChevronPattern />
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-6 overflow-hidden">
        <TrianglePattern />
      </div>

      {/* ─── Stats ───────────────────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2">
              Heritage Metrics
            </h2>
            <p className="text-sm text-[#f0c75e]/70 uppercase tracking-widest">
              A living tradition, measured
            </p>
          </RevealBlock>

          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {[
              { label: "Artisan Traditions", value: "3,000+", icon: "years", sub: "years of craft" },
              { label: "Kente Patterns", value: "300+", icon: "patterns", sub: "named designs" },
              { label: "Countries", value: "54", icon: "nations", sub: "unique textiles" },
              { label: "Living Weavers", value: "12K+", icon: "artisans", sub: "active today" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-6 bg-[#e8d5b5] border-2 border-[#2c1810] shadow-[4px_4px_0_#c4501f] hover:shadow-[6px_6px_0_#c4501f] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200 group"
                style={{
                  opacity: statsInView ? 1 : 0,
                  transform: statsInView ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s, box-shadow 0.2s ease, translate 0.2s ease`,
                }}
              >
                <div className="flex gap-1 mb-4">
                  <span className="w-2 h-2 bg-[#c4501f] inline-block" />
                  <span className="w-2 h-2 bg-[#f0c75e] inline-block" />
                  <span className="w-2 h-2 bg-[#1a5632] inline-block" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-[#2c1810] mb-1 uppercase">
                  {stat.value}
                </p>
                <p className="text-xs font-bold uppercase tracking-widest text-[#c4501f] mb-1">
                  {stat.label}
                </p>
                <p className="text-xs text-[#2c1810]/50 tracking-wide">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <KenteStripe height={6} />

      {/* ─── Component Demos ─────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#1a0e09]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2">
              Component Demos
            </h2>
            <p className="text-sm text-[#f0c75e]/70 uppercase tracking-widest">
              UI elements with Kente soul
            </p>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.1}>
            <div className="flex border-b-4 border-[#f0c75e] mb-8">
              {componentTabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActiveComponentTab(i)}
                  className={`px-6 py-3 font-bold uppercase tracking-widest text-sm border-2 border-b-0 transition-all duration-200 ${
                    activeComponentTab === i
                      ? "bg-[#f0c75e] text-[#2c1810] border-[#f0c75e]"
                      : "bg-transparent text-[#f0c75e]/60 border-[#f0c75e]/30 hover:text-[#f0c75e]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Button Panel */}
          {activeComponentTab === 0 && (
            <RevealBlock>
              <div className="p-8 bg-[#e8d5b5] border-2 border-[#2c1810] shadow-[6px_6px_0_#c4501f]">
                <div className="flex gap-1 mb-6">
                  {["#c4501f", "#f0c75e", "#1a5632", "#c4501f", "#f0c75e"].map((c, i) => (
                    <div key={i} className="w-5 h-5" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <h3 className="text-lg font-bold uppercase tracking-widest text-[#2c1810] mb-6">
                  Buttons
                </h3>
                <div className="flex flex-wrap gap-4 items-center">
                  <button className="px-6 py-3 bg-[#c4501f] text-[#e8d5b5] font-bold uppercase tracking-widest border-2 border-[#f0c75e] shadow-[4px_4px_0_#2c1810] hover:shadow-[6px_6px_0_#2c1810] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200">
                    Primary
                  </button>
                  <button className="px-6 py-3 bg-[#2c1810] text-[#e8d5b5] font-bold uppercase tracking-widest border-2 border-[#c4501f] shadow-[4px_4px_0_#c4501f] hover:shadow-[6px_6px_0_#c4501f] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200">
                    Secondary
                  </button>
                  <button className="px-6 py-3 bg-[#1a5632] text-[#e8d5b5] font-bold uppercase tracking-widest border-2 border-[#f0c75e] shadow-[4px_4px_0_#2c1810] hover:shadow-[6px_6px_0_#2c1810] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200">
                    Accent
                  </button>
                  <button className="px-6 py-3 bg-[#f0c75e] text-[#2c1810] font-bold uppercase tracking-widest border-2 border-[#2c1810] shadow-[4px_4px_0_#2c1810] hover:shadow-[6px_6px_0_#2c1810] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200">
                    Gold
                  </button>
                  <button
                    disabled
                    className="px-6 py-3 bg-[#e8d5b5]/40 text-[#2c1810]/30 font-bold uppercase tracking-widest border-2 border-[#2c1810]/20 cursor-not-allowed"
                  >
                    Disabled
                  </button>
                </div>
                <div className="mt-6 pt-6 border-t-2 border-[#2c1810]/20 flex flex-wrap gap-4 items-center">
                  <button className="flex items-center gap-2 px-6 py-3 bg-[#c4501f] text-[#e8d5b5] font-bold uppercase tracking-widest border-2 border-[#f0c75e] shadow-[4px_4px_0_#2c1810] hover:shadow-[6px_6px_0_#2c1810] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200 group">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden="true">
                      <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2a5 5 0 110 10A5 5 0 018 3zm1 2H7v3H4l4 4 4-4H9V5z" />
                    </svg>
                    Download
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-transparent text-[#2c1810] font-bold uppercase tracking-widest border-2 border-[#2c1810] hover:bg-[#c4501f] hover:text-[#e8d5b5] hover:border-[#c4501f] transition-all duration-200">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                      <path d="M2 8a6 6 0 1012 0A6 6 0 002 8zm5-1h2v2H7V7zm0-3h2v2H7V4z" />
                    </svg>
                    Learn More
                  </button>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Card Panel */}
          {activeComponentTab === 1 && (
            <RevealBlock>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    title: "Kente Strip",
                    tag: "Ashanti Ghana",
                    desc: "Each 4-inch strip carries a pattern name. Multiple strips are stitched side-by-side to create the full cloth of a chief.",
                    accent: "#c4501f",
                  },
                  {
                    title: "Adire Oniko",
                    tag: "Yoruba Nigeria",
                    desc: "Raffia-tied resist dyeing creates round circular patterns in indigo. The tight tie prevents dye penetration, leaving pale dots on deep blue.",
                    accent: "#1a5632",
                  },
                  {
                    title: "Bogolan Strip",
                    tag: "Mande Mali",
                    desc: "Fermented mud and tannin-treated cotton produce rich dark geometric patterns that carry the hunter's protective power and clan markings.",
                    accent: "#f0c75e",
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="p-6 bg-[#e8d5b5] border-2 border-[#2c1810] shadow-[4px_4px_0_#c4501f] hover:shadow-[6px_6px_0_#c4501f] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200 group"
                  >
                    <div className="flex gap-1 mb-4">
                      <div className="w-4 h-4" style={{ backgroundColor: card.accent }} />
                      <div className="w-4 h-4 bg-[#2c1810]" />
                      <div className="w-4 h-4" style={{ backgroundColor: card.accent, opacity: 0.5 }} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#c4501f] mb-2 block">
                      {card.tag}
                    </span>
                    <h3 className="text-lg font-bold uppercase tracking-wider text-[#2c1810] mb-3 group-hover:text-[#c4501f] transition-colors duration-200">
                      {card.title}
                    </h3>
                    <p className="text-sm text-[#2c1810]/60 leading-relaxed tracking-wide">
                      {card.desc}
                    </p>
                    <div className="mt-5 pt-4 border-t-2 border-[#2c1810]/20 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-[#2c1810]/40 font-bold">
                        Explore tradition
                      </span>
                      <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-[#c4501f] group-hover:translate-x-1 transition-transform" aria-hidden="true">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L12.586 9H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </RevealBlock>
          )}

          {/* Input Panel */}
          {activeComponentTab === 2 && (
            <RevealBlock>
              <div className="max-w-md mx-auto p-8 bg-[#e8d5b5] border-2 border-[#2c1810] shadow-[6px_6px_0_#c4501f]">
                <div className="flex gap-1 mb-6">
                  {["#c4501f", "#f0c75e", "#1a5632", "#c4501f"].map((c, i) => (
                    <div key={i} className="w-5 h-5" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <h3 className="text-lg font-bold uppercase tracking-widest text-[#2c1810] mb-6">
                  Commission a Piece
                </h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#c4501f] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full px-4 py-3 bg-[#e8d5b5] border-2 border-[#2c1810]/50 text-[#2c1810] placeholder-[#2c1810]/30 font-medium tracking-wide focus:outline-none focus:border-[#c4501f] focus:shadow-[0_0_0_3px_rgba(196,80,31,0.2)] transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#c4501f] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-[#e8d5b5] border-2 border-[#2c1810]/50 text-[#2c1810] placeholder-[#2c1810]/30 font-medium tracking-wide focus:outline-none focus:border-[#c4501f] focus:shadow-[0_0_0_3px_rgba(196,80,31,0.2)] transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#c4501f] mb-2">
                      Pattern Vision
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe the cloth you dream of..."
                      className="w-full px-4 py-3 bg-[#e8d5b5] border-2 border-[#2c1810]/50 text-[#2c1810] placeholder-[#2c1810]/30 font-medium tracking-wide focus:outline-none focus:border-[#c4501f] focus:shadow-[0_0_0_3px_rgba(196,80,31,0.2)] transition-all duration-200 resize-none"
                    />
                  </div>
                  <button className="w-full py-3 bg-[#c4501f] text-[#e8d5b5] font-bold uppercase tracking-widest border-2 border-[#f0c75e] shadow-[4px_4px_0_#2c1810] hover:shadow-[6px_6px_0_#2c1810] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200">
                    Send Commission
                  </button>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-8 overflow-hidden">
        <ZigzagPattern />
      </div>

      {/* ─── Color Palette ───────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#2c1810]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2">
              Color Palette
            </h2>
            <p className="text-sm text-[#f0c75e]/70 uppercase tracking-widest">
              Five earthy African colors, rooted in the landscape
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {colorPalette.map((color, i) => (
              <RevealBlock key={i} delay={i * 0.08}>
                <div className="group cursor-default">
                  {/* Large swatch */}
                  <div
                    className="w-full aspect-square border-4 border-[#2c1810] shadow-[6px_6px_0_rgba(0,0,0,0.4)] group-hover:shadow-[8px_8px_0_rgba(0,0,0,0.5)] group-hover:-translate-x-[2px] group-hover:-translate-y-[2px] transition-all duration-200 flex items-end p-2 mb-3"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span
                      className="text-xs font-bold uppercase tracking-widest"
                      style={{ color: color.textDark ? "#2c1810" : "#e8d5b5" }}
                    >
                      {color.hex}
                    </span>
                  </div>
                  <p className="text-sm font-bold uppercase tracking-wider text-[#e8d5b5] mb-1">
                    {color.name}
                  </p>
                  {/* Mini kente stripe under each swatch */}
                  <div className="flex h-2">
                    <div className="flex-1" style={{ backgroundColor: color.hex, opacity: 0.8 }} />
                    <div className="flex-1 bg-[#f0c75e]" />
                    <div className="flex-1 bg-[#1a5632]" />
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Color usage guide */}
          <RevealBlock delay={0.5} className="mt-12 p-6 border-2 border-[#f0c75e]/30">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  label: "Primary",
                  color: "#c4501f",
                  name: "Kente Orange",
                  usage: "CTAs, headers, strong accents, borders",
                },
                {
                  label: "Background",
                  color: "#2c1810",
                  name: "Dark Wood",
                  usage: "Main background, deep contrast surfaces",
                },
                {
                  label: "Accent",
                  color: "#f0c75e",
                  name: "Gold",
                  usage: "Gold accents, decorative highlights, dividers",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 shrink-0 border-2 border-[#e8d5b5]/20"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#f0c75e] mb-1">
                      {item.label}
                    </p>
                    <p className="text-sm font-bold text-[#e8d5b5] mb-1">{item.name}</p>
                    <p className="text-xs text-[#e8d5b5]/50 tracking-wide">{item.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Section Divider */}
      <KenteStripe height={8} />

      {/* ─── Pattern Showcase ────────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#1a0e09]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2">
              Pattern Showcase
            </h2>
            <p className="text-sm text-[#f0c75e]/70 uppercase tracking-widest">
              Geometric language of the loom — inline SVG patterns
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Zigzag */}
            <RevealBlock delay={0.05}>
              <div className="group border-2 border-[#f0c75e]/40 p-6 hover:border-[#f0c75e] hover:shadow-[4px_4px_0_#c4501f] transition-all duration-200">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#f0c75e] mb-4">
                  Zigzag — Life's Journey
                </h3>
                <div className="bg-[#2c1810] p-4 border border-[#f0c75e]/20 h-20 overflow-hidden">
                  <ZigzagPattern />
                </div>
                <p className="text-xs text-[#e8d5b5]/50 mt-3 tracking-wide leading-relaxed">
                  The zigzag represents the winding road of life — ups and downs, challenges and triumphs. Used in Kente strips to honor elders who have navigated life's full journey.
                </p>
              </div>
            </RevealBlock>

            {/* Diamond */}
            <RevealBlock delay={0.1}>
              <div className="group border-2 border-[#f0c75e]/40 p-6 hover:border-[#f0c75e] hover:shadow-[4px_4px_0_#c4501f] transition-all duration-200">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#f0c75e] mb-4">
                  Diamond — Duality of Existence
                </h3>
                <div className="bg-[#2c1810] p-4 border border-[#f0c75e]/20 h-20 overflow-hidden">
                  <DiamondPattern />
                </div>
                <p className="text-xs text-[#e8d5b5]/50 mt-3 tracking-wide leading-relaxed">
                  Four-sided diamonds encode the four cardinal directions and the dual nature of existence: physical and spiritual, masculine and feminine, mortal and divine.
                </p>
              </div>
            </RevealBlock>

            {/* Cross-Stitch */}
            <RevealBlock delay={0.15}>
              <div className="group border-2 border-[#f0c75e]/40 p-6 hover:border-[#f0c75e] hover:shadow-[4px_4px_0_#c4501f] transition-all duration-200">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#f0c75e] mb-4">
                  Cross-Stitch — Community Bonds
                </h3>
                <div className="bg-[#2c1810] p-4 border border-[#f0c75e]/20 h-20 overflow-hidden">
                  <CrossStitchPattern />
                </div>
                <p className="text-xs text-[#e8d5b5]/50 mt-3 tracking-wide leading-relaxed">
                  Intersecting threads symbolize the crossing of paths and the binding of community. In Kuba weaving, cross-stitch density signals the cloth's ceremonial importance.
                </p>
              </div>
            </RevealBlock>

            {/* Chevron */}
            <RevealBlock delay={0.2}>
              <div className="group border-2 border-[#f0c75e]/40 p-6 hover:border-[#f0c75e] hover:shadow-[4px_4px_0_#c4501f] transition-all duration-200">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#f0c75e] mb-4">
                  Chevron — Collective Strength
                </h3>
                <div className="bg-[#2c1810] p-4 border border-[#f0c75e]/20 h-20 overflow-hidden">
                  <ChevronPattern />
                </div>
                <p className="text-xs text-[#e8d5b5]/50 mt-3 tracking-wide leading-relaxed">
                  Arrowhead chevrons point forward: progress, ambition, and collective direction. Layered chevrons amplify this message — more layers, greater communal resolve.
                </p>
              </div>
            </RevealBlock>

            {/* Weave Grid */}
            <RevealBlock delay={0.25} className="md:col-span-2">
              <div className="group border-2 border-[#f0c75e]/40 p-6 hover:border-[#f0c75e] hover:shadow-[4px_4px_0_#c4501f] transition-all duration-200">
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#f0c75e] mb-4">
                  Weave Grid — The Loom Itself
                </h3>
                <div className="bg-[#2c1810] border border-[#f0c75e]/20 h-24 overflow-hidden">
                  <WeaveGridPattern />
                </div>
                <p className="text-xs text-[#e8d5b5]/50 mt-3 tracking-wide leading-relaxed">
                  The fundamental structure of all woven cloth: warp and weft threads crossing at right angles, each intersection a decision. The grid is not just aesthetic — it is the physical reality of weaving made visible. Color alternation at each cell mimics the over-under rhythm of the loom.
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-8 overflow-hidden">
        <TrianglePattern />
      </div>

      {/* ─── Craft Traditions Grid ───────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#2c1810]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2">
              Craft Traditions
            </h2>
            <p className="text-sm text-[#f0c75e]/70 uppercase tracking-widest">
              Four living textile arts that inspire this style
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {craftCards.map((card, i) => (
              <RevealBlock key={i} delay={i * 0.1}>
                <div className="group p-6 bg-[#e8d5b5] border-2 border-[#2c1810] shadow-[4px_4px_0_#c4501f] hover:shadow-[6px_6px_0_#c4501f] group-hover:shadow-[4px_4px_0_#c4501f] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0 p-2 bg-[#2c1810] border-2 border-[#c4501f]">
                      {card.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#c4501f] mb-1">
                        {card.subtitle}
                      </p>
                      <h3 className="text-lg font-bold uppercase tracking-wider text-[#2c1810] group-hover:text-[#c4501f] transition-colors duration-200">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {["#c4501f", "#f0c75e", "#1a5632", "#c4501f", "#f0c75e", "#1a5632"].map((c, j) => (
                      <div key={j} className="flex-1 h-1" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <p className="text-sm text-[#2c1810]/70 leading-relaxed tracking-wide">
                    {card.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <KenteStripe height={8} />

      {/* ─── Interactive Accordion ───────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#3a2010]">
        <div className="max-w-4xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2">
              The Knowledge Loom
            </h2>
            <p className="text-sm text-[#f0c75e]/70 uppercase tracking-widest">
              Layered knowledge, like layered cloth
            </p>
          </RevealBlock>

          <div className="space-y-3">
            {accordionItems.map((item, i) => (
              <RevealBlock key={i} delay={i * 0.08}>
                <div className="border-2 border-[#f0c75e]/40 bg-[#2c1810] overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#c4501f]/10 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex gap-0.5">
                        <span className="w-1.5 h-5 bg-[#c4501f] inline-block" />
                        <span className="w-1.5 h-5 bg-[#f0c75e] inline-block" />
                        <span className="w-1.5 h-5 bg-[#1a5632] inline-block" />
                      </div>
                      <span className="font-bold text-[#e8d5b5] uppercase tracking-wide text-sm md:text-base">
                        {item.title}
                      </span>
                    </div>
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className={`w-5 h-5 text-[#f0c75e] shrink-0 transition-transform duration-300 ${openAccordion === i ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {openAccordion === i && (
                    <div className="px-6 pb-6 border-t-2 border-[#f0c75e]/20">
                      <p className="text-sm text-[#e8d5b5]/70 leading-relaxed tracking-wide pt-4">
                        {item.content}
                      </p>
                    </div>
                  )}
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-8 overflow-hidden bg-[#2c1810]">
        <ZigzagPattern />
      </div>

      {/* ─── Weaving Progress (Interactive) ─────────────────────────────── */}
      <section className="py-16 px-6 bg-[#2c1810]">
        <div className="max-w-4xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2">
              Weaving Progress
            </h2>
            <p className="text-sm text-[#f0c75e]/70 uppercase tracking-widest">
              Track the cloth as it grows on the loom
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="p-8 bg-[#e8d5b5] border-2 border-[#2c1810] shadow-[6px_6px_0_#c4501f]">
              <div className="flex gap-1 mb-6">
                {["#c4501f", "#f0c75e", "#1a5632", "#c4501f", "#f0c75e", "#1a5632"].map((c, i) => (
                  <div key={i} className="w-6 h-6" style={{ backgroundColor: c }} />
                ))}
              </div>

              <h3 className="text-lg font-bold uppercase tracking-widest text-[#2c1810] mb-6">
                Kente Strip Completion
              </h3>

              {/* Main progress bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold uppercase tracking-widest text-[#2c1810]">
                    Overall Weave
                  </p>
                  <p className="text-sm font-bold text-[#c4501f] font-mono">{weavingProgress}%</p>
                </div>
                <div className="h-5 bg-[#2c1810]/20 border-2 border-[#2c1810]">
                  <div
                    className="h-full transition-all duration-500 flex"
                    style={{ width: `${weavingProgress}%` }}
                  >
                    {/* Kente-colored progress bar */}
                    <div className="flex-1 bg-[#c4501f]" />
                    <div className="w-1 bg-[#f0c75e]" />
                    <div className="w-1 bg-[#1a5632]" />
                  </div>
                </div>
              </div>

              {/* Row breakdown */}
              <div className="mb-6">
                <p className="text-sm font-bold uppercase tracking-widest text-[#2c1810] mb-3">
                  Pattern Rows
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { label: "Row 1", value: 100, color: "#1a5632" },
                    { label: "Row 2", value: 100, color: "#c4501f" },
                    { label: "Row 3", value: weavingProgress, color: "#f0c75e" },
                    { label: "Row 4", value: 0, color: "#e8d5b5" },
                  ].map((row, i) => (
                    <div key={i}>
                      <div className="h-4 bg-[#2c1810]/20 border border-[#2c1810]/40 mb-1">
                        <div
                          className="h-full transition-all duration-500"
                          style={{ width: `${row.value}%`, backgroundColor: row.color }}
                        />
                      </div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#c4501f] text-center">
                        {row.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 pt-5 border-t-2 border-[#2c1810]/20">
                <button
                  onClick={() => setWeavingProgress(Math.max(0, weavingProgress - 10))}
                  className="px-5 py-2.5 text-sm font-bold uppercase tracking-widest border-2 border-[#2c1810] text-[#2c1810] shadow-[3px_3px_0_#2c1810] hover:shadow-[5px_5px_0_#2c1810] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200"
                >
                  Unweave
                </button>
                <button
                  onClick={() => setWeavingProgress(Math.min(100, weavingProgress + 10))}
                  className="px-5 py-2.5 text-sm font-bold uppercase tracking-widest bg-[#c4501f] text-[#e8d5b5] border-2 border-[#f0c75e] shadow-[3px_3px_0_#2c1810] hover:shadow-[5px_5px_0_#2c1810] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200"
                >
                  Weave On
                </button>
                <button
                  onClick={() => setWeavingProgress(100)}
                  className="px-5 py-2.5 text-sm font-bold uppercase tracking-widest bg-[#1a5632] text-[#e8d5b5] border-2 border-[#f0c75e] shadow-[3px_3px_0_#2c1810] hover:shadow-[5px_5px_0_#2c1810] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200"
                >
                  Complete
                </button>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-8 overflow-hidden">
        <ChevronPattern />
      </div>

      {/* ─── Toggle Preferences ──────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#1a0e09]">
        <div className="max-w-4xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2">
              Style Preferences
            </h2>
            <p className="text-sm text-[#f0c75e]/70 uppercase tracking-widest">
              Customize your textile experience
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="p-8 bg-[#e8d5b5] border-2 border-[#2c1810] shadow-[6px_6px_0_#c4501f] space-y-5">
              <div className="flex gap-1 mb-6">
                {["#c4501f", "#f0c75e", "#1a5632", "#c4501f", "#f0c75e"].map((c, i) => (
                  <div key={i} className="w-5 h-5" style={{ backgroundColor: c }} />
                ))}
              </div>

              {[
                {
                  label: "Woven Texture Overlay",
                  desc: "Display subtle textile grain across all surfaces",
                },
                {
                  label: "Geometric Decorations",
                  desc: "Show Kente-inspired pattern blocks and dividers",
                },
                {
                  label: "Earth Tone Lock",
                  desc: "Restrict color selection to traditional pigment palette",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b-2 border-[#2c1810]/10 last:border-0">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-[#2c1810]">
                      {item.label}
                    </p>
                    <p className="text-xs text-[#2c1810]/50 mt-0.5 tracking-wide">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      const next = [...toggleStates];
                      next[i] = !next[i];
                      setToggleStates(next);
                    }}
                    className={`relative w-14 h-7 border-2 transition-all duration-200 shrink-0 ${
                      toggleStates[i]
                        ? "bg-[#c4501f] border-[#f0c75e]"
                        : "bg-[#2c1810]/20 border-[#2c1810]/30"
                    }`}
                    aria-pressed={toggleStates[i]}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-[#e8d5b5] border border-[#2c1810]/30 transition-transform duration-200 ${
                        toggleStates[i] ? "translate-x-7" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Section Divider */}
      <KenteStripe height={8} />

      {/* ─── Design Principles ───────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#2c1810]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2">
              Design Principles
            </h2>
            <p className="text-sm text-[#f0c75e]/70 uppercase tracking-widest">
              The laws of the loom — what to do, what to avoid
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {/* Do list */}
            <RevealBlock delay={0.05}>
              <div className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#1a5632] border-2 border-[#f0c75e] flex items-center justify-center">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-[#f0c75e]" aria-hidden="true">
                      <path fillRule="evenodd" d="M13.707 4.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L6 10.586l6.293-6.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-widest text-[#1a5632]">
                    Do
                  </h3>
                </div>
                <div className="space-y-3">
                  {principles
                    .filter((p) => p.type === "do")
                    .map((p, i) => (
                      <div
                        key={i}
                        className="p-5 bg-[#e8d5b5] border-2 border-[#1a5632] shadow-[4px_4px_0_#1a5632]"
                      >
                        <div className="flex gap-1 mb-3">
                          <span className="w-2 h-2 bg-[#1a5632] inline-block" />
                          <span className="w-2 h-2 bg-[#f0c75e] inline-block" />
                          <span className="w-2 h-2 bg-[#c4501f] inline-block" />
                        </div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-[#2c1810] mb-2">
                          {p.title}
                        </h4>
                        <p className="text-xs text-[#2c1810]/60 leading-relaxed tracking-wide">
                          {p.desc}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </RevealBlock>

            {/* Dont list */}
            <RevealBlock delay={0.1}>
              <div className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-[#c4501f] border-2 border-[#f0c75e] flex items-center justify-center">
                    <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-[#f0c75e]" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.293 4.293a1 1 0 010 1.414L9.414 8l2.879 2.879a1 1 0 01-1.414 1.414L8 9.414l-2.879 2.879a1 1 0 01-1.414-1.414L6.586 8 3.707 5.121a1 1 0 011.414-1.414L8 6.586l2.879-2.879a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-widest text-[#c4501f]">
                    Don&apos;t
                  </h3>
                </div>
                <div className="space-y-3">
                  {principles
                    .filter((p) => p.type === "dont")
                    .map((p, i) => (
                      <div
                        key={i}
                        className="p-5 bg-[#e8d5b5] border-2 border-[#c4501f] shadow-[4px_4px_0_#c4501f]"
                      >
                        <div className="flex gap-1 mb-3">
                          <span className="w-2 h-2 bg-[#c4501f] inline-block" />
                          <span className="w-2 h-2 bg-[#2c1810] inline-block" />
                          <span className="w-2 h-2 bg-[#c4501f]/50 inline-block" />
                        </div>
                        <h4 className="text-sm font-bold uppercase tracking-wider text-[#2c1810] mb-2">
                          {p.title}
                        </h4>
                        <p className="text-xs text-[#2c1810]/60 leading-relaxed tracking-wide">
                          {p.desc}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-8 overflow-hidden">
        <ZigzagPattern />
      </div>

      {/* ─── Typography Showcase ─────────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#1a0e09]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2">
              Typography
            </h2>
            <p className="text-sm text-[#f0c75e]/70 uppercase tracking-widest">
              Bold voice of the griot
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="p-8 md:p-12 bg-[#e8d5b5] border-2 border-[#2c1810] shadow-[6px_6px_0_#c4501f]">
              {/* Kente stripe header on card */}
              <div className="flex gap-0 mb-8 -mx-8 md:-mx-12 -mt-8 md:-mt-12 overflow-hidden" style={{ height: 8 }}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1"
                    style={{
                      backgroundColor: i % 3 === 0 ? "#c4501f" : i % 3 === 1 ? "#f0c75e" : "#1a5632",
                    }}
                  />
                ))}
              </div>

              <div className="mt-4 space-y-6">
                <div className="pb-6 border-b-2 border-[#2c1810]/10">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#c4501f] mb-2">
                    Display / H1
                  </p>
                  <p className="text-5xl md:text-7xl font-bold text-[#2c1810] uppercase tracking-widest leading-none">
                    Heritage
                  </p>
                </div>

                <div className="pb-6 border-b-2 border-[#2c1810]/10">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#c4501f] mb-2">
                    Heading / H2
                  </p>
                  <p className="text-3xl md:text-5xl font-bold text-[#2c1810] uppercase tracking-wider">
                    Woven Stories
                  </p>
                </div>

                <div className="pb-6 border-b-2 border-[#2c1810]/10">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#c4501f] mb-2">
                    Subheading / H3
                  </p>
                  <p className="text-2xl font-bold text-[#2c1810] uppercase tracking-wide">
                    Patterns of Life and Land
                  </p>
                </div>

                <div className="pb-6 border-b-2 border-[#2c1810]/10">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#c4501f] mb-2">
                    Body Text
                  </p>
                  <p className="text-base text-[#2c1810]/70 leading-relaxed tracking-wide max-w-2xl">
                    The loom stands in the compound, its rhythmic clacking filling the morning air. Thread by thread, strip by strip, a cloth takes shape that will outlast the weaver. Each color chosen with intention. Each pattern placed with ancestral purpose. To wear this cloth is to carry history.
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#c4501f] mb-2">
                    Caption / Label
                  </p>
                  <p className="text-sm font-bold uppercase tracking-widest text-[#c4501f]">
                    Ashanti Kente Weaving &middot; Ghana &middot; 17th Century Onward
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Section Divider */}
      <KenteStripe height={8} />

      {/* ─── Tabs: Cultural Contexts ─────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#2c1810]">
        <div className="max-w-4xl mx-auto">
          <RevealBlock className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2">
              Cultural Contexts
            </h2>
            <p className="text-sm text-[#f0c75e]/70 uppercase tracking-widest">
              Textile as ceremony, identity, and archive
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="border-2 border-[#f0c75e]/40 bg-[#1a0e09]">
              {/* Tab nav */}
              <div className="flex border-b-2 border-[#f0c75e]/30">
                {[
                  { label: "Ceremony", icon: "◆" },
                  { label: "Identity", icon: "◈" },
                  { label: "Archive", icon: "◇" },
                ].map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-4 text-xs md:text-sm font-bold uppercase tracking-widest border-b-4 -mb-px transition-all duration-200 ${
                      activeTab === i
                        ? "border-[#c4501f] text-[#c4501f] bg-[#c4501f]/10"
                        : "border-transparent text-[#e8d5b5]/40 hover:text-[#e8d5b5]/70"
                    }`}
                  >
                    <span className={activeTab === i ? "text-[#f0c75e]" : ""}>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div className="p-8 min-h-[200px]">
                {activeTab === 0 && (
                  <div>
                    <div className="flex gap-1 mb-4">
                      <span className="w-3 h-3 bg-[#c4501f] inline-block" />
                      <span className="w-3 h-3 bg-[#f0c75e] inline-block" />
                      <span className="w-3 h-3 bg-[#1a5632] inline-block" />
                    </div>
                    <h4 className="text-xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-4">
                      Cloth as Sacred Object
                    </h4>
                    <p className="text-sm text-[#e8d5b5]/60 leading-relaxed tracking-wide mb-4">
                      In many West African cultures, specific textile patterns are worn only at ceremonies: funerals, enstoolment of chiefs, coming-of-age rites, and harvest festivals. The cloth transforms the wearer into a ceremonial participant — both announcing their status and invoking ancestral protection.
                    </p>
                    <p className="text-sm text-[#e8d5b5]/60 leading-relaxed tracking-wide">
                      Kente worn at a funeral carries different pattern meanings than Kente worn at a naming ceremony. The cloth speaks a language that the community reads at a glance, ensuring that the correct spiritual protocols are honored.
                    </p>
                  </div>
                )}
                {activeTab === 1 && (
                  <div>
                    <div className="flex gap-1 mb-4">
                      <span className="w-3 h-3 bg-[#1a5632] inline-block" />
                      <span className="w-3 h-3 bg-[#c4501f] inline-block" />
                      <span className="w-3 h-3 bg-[#f0c75e] inline-block" />
                    </div>
                    <h4 className="text-xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-4">
                      Woven Identity
                    </h4>
                    <p className="text-sm text-[#e8d5b5]/60 leading-relaxed tracking-wide mb-4">
                      Among the Akan, specific Kente patterns are associated with clans, lineages, and social positions. Wearing a pattern claims membership in a community and signals one's role within it. Pattern literacy — the ability to read cloth — is a social skill as vital as reading text.
                    </p>
                    <p className="text-sm text-[#e8d5b5]/60 leading-relaxed tracking-wide">
                      In the diaspora, Kente has become a pan-African identity symbol, worn at graduation ceremonies and cultural celebrations worldwide as an assertion of continental heritage and Black pride.
                    </p>
                  </div>
                )}
                {activeTab === 2 && (
                  <div>
                    <div className="flex gap-1 mb-4">
                      <span className="w-3 h-3 bg-[#f0c75e] inline-block" />
                      <span className="w-3 h-3 bg-[#1a5632] inline-block" />
                      <span className="w-3 h-3 bg-[#c4501f] inline-block" />
                    </div>
                    <h4 className="text-xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-4">
                      Living Archive
                    </h4>
                    <p className="text-sm text-[#e8d5b5]/60 leading-relaxed tracking-wide mb-4">
                      Before widespread literacy, West African textiles preserved historical memory. Bogolan patterns recorded hunter's exploits. Adire stitching encoded proverbs. Kente pattern names — like &ldquo;Sika Futuro&rdquo; (Gold Dust) or &ldquo;Oyokoman&rdquo; (Oyoko Clan) — are living cultural citations.
                    </p>
                    <p className="text-sm text-[#e8d5b5]/60 leading-relaxed tracking-wide">
                      Museums hold these cloths not merely as art objects but as historical documents. Each thread is evidence of a civilization that chose beauty and meaning as inseparable — that saw no distinction between the functional and the sacred.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-8 overflow-hidden">
        <TrianglePattern />
      </div>

      {/* ─── Alerts & Notifications ──────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#3a2010]">
        <div className="max-w-4xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2">
              Alert States
            </h2>
            <p className="text-sm text-[#f0c75e]/70 uppercase tracking-widest">
              Earthen notices — grounded in tradition
            </p>
          </RevealBlock>

          <div className="space-y-4">
            {[
              {
                type: "success",
                icon: (
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path fillRule="evenodd" d="M13.707 4.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L6 10.586l6.293-6.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ),
                title: "Pattern saved",
                desc: "Your Kente weave design has been preserved for future generations.",
                bg: "bg-[#1a5632]/20",
                border: "border-[#1a5632]",
                textColor: "text-[#1a5632]",
                accent: "#1a5632",
              },
              {
                type: "warning",
                icon: (
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 1a.5.5 0 01.447.276l7 14A.5.5 0 0115 16H1a.5.5 0 01-.447-.724l7-14A.5.5 0 018 1zm0 4a.5.5 0 01.5.5v4a.5.5 0 01-1 0v-4A.5.5 0 018 5zm0 7a1 1 0 110 2 1 1 0 010-2z" clipRule="evenodd" />
                  </svg>
                ),
                title: "Thread tension warning",
                desc: "The warp tension may need adjustment before continuing the weave.",
                bg: "bg-[#f0c75e]/20",
                border: "border-[#f0c75e]",
                textColor: "text-[#f0c75e]",
                accent: "#f0c75e",
              },
              {
                type: "error",
                icon: (
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.293 4.293a1 1 0 010 1.414L9.414 8l2.879 2.879a1 1 0 01-1.414 1.414L8 9.414l-2.879 2.879a1 1 0 01-1.414-1.414L6.586 8 3.707 5.121a1 1 0 011.414-1.414L8 6.586l2.879-2.879a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ),
                title: "Thread broke",
                desc: "The weave encountered a break. Please re-thread the loom and try again.",
                bg: "bg-[#c4501f]/20",
                border: "border-[#c4501f]",
                textColor: "text-[#c4501f]",
                accent: "#c4501f",
              },
              {
                type: "info",
                icon: (
                  <svg viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM7 5a1 1 0 112 0v4a1 1 0 11-2 0V5zm1 6a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                ),
                title: "Tradition note",
                desc: "Each Kente pattern carries a unique name and cultural meaning.",
                bg: "bg-[#e8d5b5]/10",
                border: "border-[#e8d5b5]/50",
                textColor: "text-[#e8d5b5]",
                accent: "#e8d5b5",
              },
            ].map((alert, i) => (
              <RevealBlock key={i} delay={i * 0.07}>
                <div
                  className={`flex items-start gap-4 p-5 border-l-4 ${alert.bg} ${alert.border}`}
                >
                  <span className={`${alert.textColor} shrink-0 mt-0.5`}>{alert.icon}</span>
                  <div>
                    <p className={`text-sm font-bold uppercase tracking-widest ${alert.textColor} mb-1`}>
                      {alert.title}
                    </p>
                    <p
                      className="text-xs leading-relaxed tracking-wide"
                      style={{ color: `${alert.accent}99` }}
                    >
                      {alert.desc}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <KenteStripe height={8} />

      {/* ─── Feature Showcase Grid ───────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#2c1810]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#e8d5b5] mb-2">
              Style Features
            </h2>
            <p className="text-sm text-[#f0c75e]/70 uppercase tracking-widest">
              What makes African Textile design system unique
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                title: "Geometric Repetition",
                desc: "Patterns repeat with rhythmic purpose. No space is left unspoken. Every surface participates in the visual dialogue.",
                pattern: "zigzag",
                delay: 0,
              },
              {
                title: "Bold Weight Typography",
                desc: "The griot's voice is never a whisper. Text commands attention through mass, uppercase authority, and generous tracking.",
                pattern: "diamond",
                delay: 0.08,
              },
              {
                title: "Warm Color Harmony",
                desc: "Kente orange, gold, forest green, and earth sand create a palette rooted in the West African savanna and forest.",
                pattern: "weave",
                delay: 0.16,
              },
              {
                title: "Hard Shadow Blocks",
                desc: "Flat 4px offset shadows in dark wood create tactile depth that echoes the physicality of woven cloth and carved wood.",
                pattern: "triangle",
                delay: 0.24,
              },
              {
                title: "Cultural Symbolism",
                desc: "Every visual choice carries meaning. Chevrons signal direction. Diamonds encode duality. Crosses bind community.",
                pattern: "cross",
                delay: 0.32,
              },
              {
                title: "Alternating Color Blocks",
                desc: "Grid layouts use rhythmic color alternation — orange, gold, green, sand — mimicking the warp-weft structure of the loom.",
                pattern: "chevron",
                delay: 0.4,
              },
            ].map((feature, i) => (
              <RevealBlock key={i} delay={feature.delay}>
                <div className="group p-6 bg-[#e8d5b5] border-2 border-[#2c1810] shadow-[4px_4px_0_#c4501f] hover:shadow-[6px_6px_0_#c4501f] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200 h-full flex flex-col">
                  {/* Mini pattern preview */}
                  <div className="h-12 bg-[#2c1810] border border-[#f0c75e]/30 mb-4 overflow-hidden">
                    {feature.pattern === "zigzag" && <ZigzagPattern />}
                    {feature.pattern === "diamond" && <DiamondPattern />}
                    {feature.pattern === "weave" && <WeaveGridPattern />}
                    {feature.pattern === "triangle" && <TrianglePattern />}
                    {feature.pattern === "cross" && <CrossStitchPattern />}
                    {feature.pattern === "chevron" && <ChevronPattern />}
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#2c1810] mb-3 group-hover:text-[#c4501f] transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-[#2c1810]/60 leading-relaxed tracking-wide flex-1">
                    {feature.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-8 overflow-hidden">
        <ZigzagPattern />
      </div>

      {/* ─── Closing Quote ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#1a0e09]">
        <div className="max-w-3xl mx-auto">
          <RevealBlock>
            <div className="relative p-10 md:p-14 border-4 border-[#f0c75e] shadow-[8px_8px_0_#c4501f]">
              {/* Pattern corners */}
              <div className="absolute top-0 left-0 w-10 h-10 bg-[#c4501f]" />
              <div className="absolute top-0 right-0 w-10 h-10 bg-[#1a5632]" />
              <div className="absolute bottom-0 left-0 w-10 h-10 bg-[#1a5632]" />
              <div className="absolute bottom-0 right-0 w-10 h-10 bg-[#c4501f]" />

              <div className="flex justify-center mb-6">
                <AdinkraSymbol color="#f0c75e" size={48} />
              </div>

              <blockquote className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-[#e8d5b5] text-center leading-tight mb-6">
                &ldquo;The cloth is the story. The story is the people. The people are the cloth.&rdquo;
              </blockquote>

              <div className="flex items-center justify-center gap-3">
                <div className="h-px flex-1 bg-[#f0c75e]/30" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#f0c75e]">
                  West African Weaving Proverb
                </span>
                <div className="h-px flex-1 bg-[#f0c75e]/30" />
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ─── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#2c1810] border-t-4 border-[#f0c75e]">
        {/* Kente stripe footer divider */}
        <KenteStripe height={8} />

        <div className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Brand */}
              <div className="text-center md:text-left">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
                  <div className="flex gap-1">
                    <span className="w-4 h-4 bg-[#c4501f] inline-block" />
                    <span className="w-4 h-4 bg-[#f0c75e] inline-block" />
                    <span className="w-4 h-4 bg-[#1a5632] inline-block" />
                  </div>
                  <span className="font-bold uppercase tracking-widest text-[#e8d5b5]">
                    African Textile
                  </span>
                </div>
                <p className="text-xs text-[#f0c75e]/50 tracking-wide max-w-[240px] leading-relaxed">
                  A design system rooted in the weaving traditions of West Africa. Patterns carry meaning. Colors carry history.
                </p>
              </div>

              {/* Center Adinkra */}
              <div className="opacity-40">
                <AdinkraSymbol color="#f0c75e" size={56} />
              </div>

              {/* Links */}
              <div className="text-center md:text-right">
                <p className="text-xs font-bold uppercase tracking-widest text-[#f0c75e]/60 mb-3">
                  StyleKit
                </p>
                <div className="flex flex-col gap-2 items-center md:items-end">
                  <Link
                    href="/"
                    className="text-sm font-bold uppercase tracking-widest text-[#f0c75e] hover:text-[#e8d5b5] transition-colors duration-200"
                  >
                    StyleKit &rarr;
                  </Link>
                  <Link
                    href="/styles"
                    className="text-xs font-bold uppercase tracking-widest text-[#f0c75e]/40 hover:text-[#f0c75e] transition-colors duration-200"
                  >
                    All Styles
                  </Link>
                </div>
              </div>
            </div>

            {/* Kente stripe row */}
            <div className="mt-10 mb-6">
              <div className="flex h-3">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-1"
                    style={{
                      backgroundColor:
                        i % 4 === 0 ? "#c4501f" : i % 4 === 1 ? "#f0c75e" : i % 4 === 2 ? "#1a5632" : "#e8d5b5",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-[#f0c75e]/30 tracking-widest uppercase">
                African Textile Showcase &middot; StyleKit Design System &middot; 非洲纺织
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Kente stripe */}
        <KenteStripe height={10} />
      </footer>
    </div>
  );
}
