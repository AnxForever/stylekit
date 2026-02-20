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
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Botanical SVG Decorations ───────────────────────────────────────────────

function FlowerSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="20" cy="20" r="4" fill="#f5d75f" />
      <ellipse cx="20" cy="10" rx="3" ry="6" fill="#d4a0a0" />
      <ellipse cx="20" cy="30" rx="3" ry="6" fill="#d4a0a0" />
      <ellipse cx="10" cy="20" rx="6" ry="3" fill="#d4a0a0" />
      <ellipse cx="30" cy="20" rx="6" ry="3" fill="#d4a0a0" />
      <ellipse cx="13" cy="13" rx="3" ry="6" fill="#f5d75f" opacity="0.7" transform="rotate(45 13 13)" />
      <ellipse cx="27" cy="13" rx="3" ry="6" fill="#f5d75f" opacity="0.7" transform="rotate(-45 27 13)" />
      <ellipse cx="13" cy="27" rx="3" ry="6" fill="#f5d75f" opacity="0.7" transform="rotate(-45 13 27)" />
      <ellipse cx="27" cy="27" rx="3" ry="6" fill="#f5d75f" opacity="0.7" transform="rotate(45 27 27)" />
    </svg>
  );
}

function LeafSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M15 2 Q28 10 26 24 Q22 36 15 38 Q8 36 4 24 Q2 10 15 2Z"
        fill="#5a8f5a"
        opacity="0.8"
      />
      <path d="M15 2 Q15 20 15 38" stroke="#faf6f0" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function MushroomSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 20 Q4 6 18 4 Q32 6 32 20Z" fill="#d4a0a0" />
      <rect x="13" y="20" width="10" height="12" rx="3" fill="#faf6f0" />
      <circle cx="12" cy="14" r="2" fill="#faf6f0" opacity="0.6" />
      <circle cx="20" cy="10" r="1.5" fill="#faf6f0" opacity="0.6" />
      <circle cx="26" cy="15" r="1.5" fill="#faf6f0" opacity="0.6" />
    </svg>
  );
}

function DaisySvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="16" r="4" fill="#f5d75f" />
      <ellipse cx="16" cy="6" rx="2.5" ry="5" fill="white" opacity="0.9" />
      <ellipse cx="16" cy="26" rx="2.5" ry="5" fill="white" opacity="0.9" />
      <ellipse cx="6" cy="16" rx="5" ry="2.5" fill="white" opacity="0.9" />
      <ellipse cx="26" cy="16" rx="5" ry="2.5" fill="white" opacity="0.9" />
      <ellipse cx="9" cy="9" rx="2.5" ry="5" fill="white" opacity="0.8" transform="rotate(45 9 9)" />
      <ellipse cx="23" cy="9" rx="2.5" ry="5" fill="white" opacity="0.8" transform="rotate(-45 23 9)" />
      <ellipse cx="9" cy="23" rx="2.5" ry="5" fill="white" opacity="0.8" transform="rotate(-45 9 23)" />
      <ellipse cx="23" cy="23" rx="2.5" ry="5" fill="white" opacity="0.8" transform="rotate(45 23 23)" />
    </svg>
  );
}

function BerrySvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="10" cy="22" r="6" fill="#d4a0a0" opacity="0.9" />
      <circle cx="22" cy="24" r="5" fill="#d4a0a0" opacity="0.85" />
      <circle cx="16" cy="16" r="5.5" fill="#c08080" opacity="0.8" />
      <path d="M16 10 Q18 4 22 6" stroke="#5a8f5a" strokeWidth="1.5" fill="none" />
      <path d="M16 10 Q14 4 10 6" stroke="#5a8f5a" strokeWidth="1.5" fill="none" />
      <circle cx="14" cy="19" r="1" fill="#faf6f0" opacity="0.4" />
      <circle cx="22" cy="22" r="0.8" fill="#faf6f0" opacity="0.4" />
    </svg>
  );
}

function FernSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M20 48 Q20 30 20 10" stroke="#5a8f5a" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M20 38 Q12 32 8 26" stroke="#5a8f5a" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M20 38 Q28 32 32 26" stroke="#5a8f5a" strokeWidth="1" fill="none" opacity="0.6" />
      <path d="M20 30 Q11 24 8 18" stroke="#5a8f5a" strokeWidth="1" fill="none" opacity="0.55" />
      <path d="M20 30 Q29 24 32 18" stroke="#5a8f5a" strokeWidth="1" fill="none" opacity="0.55" />
      <path d="M20 22 Q14 16 12 10" stroke="#5a8f5a" strokeWidth="1" fill="none" opacity="0.5" />
      <path d="M20 22 Q26 16 28 10" stroke="#5a8f5a" strokeWidth="1" fill="none" opacity="0.5" />
      <ellipse cx="8" cy="24" rx="4" ry="2.5" fill="#5a8f5a" opacity="0.3" transform="rotate(-30 8 24)" />
      <ellipse cx="32" cy="24" rx="4" ry="2.5" fill="#5a8f5a" opacity="0.3" transform="rotate(30 32 24)" />
      <ellipse cx="8" cy="16" rx="3.5" ry="2" fill="#5a8f5a" opacity="0.25" transform="rotate(-40 8 16)" />
      <ellipse cx="32" cy="16" rx="3.5" ry="2" fill="#5a8f5a" opacity="0.25" transform="rotate(40 32 16)" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

type Season = {
  name: string;
  color: string;
  emoji: string;
  plants: { name: string; desc: string; svgType: "flower" | "leaf" | "mushroom" | "daisy" | "berry" | "fern" }[];
};

const seasons: Season[] = [
  {
    name: "Spring",
    color: "#d4a0a0",
    emoji: "&#10047;",
    plants: [
      {
        name: "Wild Violet",
        desc: "First to bloom after frost, petals like small purple hearts scattered across the moss.",
        svgType: "flower",
      },
      {
        name: "Wood Anemone",
        desc: "Delicate white stars that carpet ancient woodland floors each April.",
        svgType: "daisy",
      },
      {
        name: "Primrose",
        desc: "Pale yellow clusters that brighten hedgerows and meadow edges in tender spring light.",
        svgType: "flower",
      },
    ],
  },
  {
    name: "Summer",
    color: "#5a8f5a",
    emoji: "&#10047;",
    plants: [
      {
        name: "Meadowsweet",
        desc: "Creamy frothy blossoms with a honey-almond scent drifting over the sunlit riverbank.",
        svgType: "daisy",
      },
      {
        name: "Elder Flower",
        desc: "Flat-topped umbels of tiny white flowers, perfect for cordials and elderflower syrups.",
        svgType: "flower",
      },
      {
        name: "Ox-Eye Daisy",
        desc: "Bold white petals around a golden disc, swaying tall in the warm summer breeze.",
        svgType: "daisy",
      },
    ],
  },
  {
    name: "Autumn",
    color: "#8b7355",
    emoji: "&#10047;",
    plants: [
      {
        name: "Penny Bun",
        desc: "The stout king of mushrooms, found beneath oak and birch on mist-wrapped mornings.",
        svgType: "mushroom",
      },
      {
        name: "Bramble Leaf",
        desc: "Turning crimson and gold, bramble leaves trace the edges of old lanes in October.",
        svgType: "fern",
      },
      {
        name: "Wild Berry",
        desc: "Deep red bramble clusters heavy on the thorns, picked before the frost arrives.",
        svgType: "berry",
      },
    ],
  },
  {
    name: "Winter",
    color: "#7a9e9e",
    emoji: "&#10047;",
    plants: [
      {
        name: "Holly",
        desc: "Glossy evergreen leaves bearing scarlet berries against bare grey winter branches.",
        svgType: "leaf",
      },
      {
        name: "Snowdrop",
        desc: "The first hopeful flower of the year, pressing through frozen earth in January.",
        svgType: "daisy",
      },
      {
        name: "Ivy",
        desc: "Evergreen faithful ivy threading through old stone walls and sheltering wrens.",
        svgType: "fern",
      },
    ],
  },
];

const componentTabs = ["Buttons", "Cards", "Inputs"] as const;
type ComponentTab = (typeof componentTabs)[number];

const craftItems = [
  {
    title: "Embroidery Hoop",
    subtitle: "Cross-stitch & satin stitch",
    desc: "Cotton florals stitched by hand onto linen, each petal placed with patience and morning light.",
    tag: "Needle & Thread",
    tagColor: "#d4a0a0",
    svgType: "flower" as const,
  },
  {
    title: "Wild Herb Pressing",
    subtitle: "Botanical preservation",
    desc: "Lavender, chamomile, and feverfew pressed between the pages of an old field guide.",
    tag: "Foraged",
    tagColor: "#5a8f5a",
    svgType: "fern" as const,
  },
  {
    title: "Homemade Preserves",
    subtitle: "Bramble jam & elderflower",
    desc: "Summer captured in glass jars, sealed with wax and labelled in fading handwriting.",
    tag: "Pantry",
    tagColor: "#f5d75f",
    svgType: "berry" as const,
  },
  {
    title: "Dried Flower Wreath",
    subtitle: "For the front door",
    desc: "Bundles of dried lavender, wheat, and rose hips wound with twine onto a willow frame.",
    tag: "Seasonal",
    tagColor: "#8b7355",
    svgType: "daisy" as const,
  },
];

const typographyExamples = [
  { text: "Wander", size: "text-5xl", color: "#5a8f5a", note: "Display heading — main titles" },
  { text: "Gather & Grow", size: "text-3xl", color: "#8b7355", note: "Section heading — h2 level" },
  { text: "Where wildflowers bloom.", size: "text-xl", color: "#d4a0a0", note: "Subtitle — italic accent" },
  { text: "A warm cup of chamomile tea, a good book, and the sound of rain.", size: "text-base", color: "#8b7355", note: "Body copy" },
  { text: "foraged . pressed . stitched", size: "text-xs", color: "#8b7355", note: "Eyebrow / label — wide tracking" },
];

// ─── Main Component ────────────────────────────────────────────────────────────

export default function CottagecoreShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeSeason, setActiveSeason] = useState(0);
  const [activeComponentTab, setActiveComponentTab] = useState<ComponentTab>("Buttons");
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);
  const [craftHovered, setCraftHovered] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const season = seasons[activeSeason];

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#8b7355]">
      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(4deg); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-5deg); }
        }
        @keyframes floatC {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          40% { transform: translateY(-18px) rotate(6deg); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes linendrift {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        .float-a { animation: floatA 7s ease-in-out infinite; }
        .float-b { animation: floatB 9s ease-in-out infinite; }
        .float-c { animation: floatC 6s ease-in-out infinite; }
        .sway { animation: sway 5s ease-in-out infinite; }
        .linen-bg {
          background-color: #faf6f0;
          background-image:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 18px,
              rgba(139,115,85,0.04) 18px,
              rgba(139,115,85,0.04) 19px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 18px,
              rgba(139,115,85,0.03) 18px,
              rgba(139,115,85,0.03) 19px
            );
        }
        .hover-tilt:hover {
          transform: translateY(-4px) rotate(-0.8deg);
        }
        .hover-tilt-r:hover {
          transform: translateY(-4px) rotate(0.8deg);
        }
      `}</style>

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50">
        <nav className="flex items-center justify-center py-4 px-6">
          <div className="bg-[#faf6f0]/90 backdrop-blur-sm border border-[#d4a0a0]/30 rounded-full px-6 py-2.5 flex items-center gap-5 shadow-[0_2px_12px_rgba(139,115,85,0.08)]">
            <Link
              href="/styles/cottagecore"
              className="font-serif text-sm text-[#8b7355]/60 hover:text-[#5a8f5a] transition-colors duration-500"
            >
              Docs
            </Link>
            <span className="text-[#d4a0a0] text-xs select-none">&#10047;</span>
            <span className="font-serif text-[#5a8f5a] text-sm font-medium">Cottagecore</span>
            <span className="text-[#d4a0a0] text-xs select-none">&#10047;</span>
            <Link
              href="/styles"
              className="font-serif text-sm text-[#8b7355]/60 hover:text-[#5a8f5a] transition-colors duration-500"
            >
              Gallery
            </Link>
          </div>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-center justify-center px-6 linen-bg">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-25"
            style={{ background: "radial-gradient(circle, #f5d75f55 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #d4a0a055 0%, transparent 70%)" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #5a8f5a22 0%, transparent 70%)" }}
          />
        </div>

        {/* Floating botanicals */}
        <div className="absolute top-16 left-8 md:left-24 float-a pointer-events-none">
          <FlowerSvg className="w-10 h-10 md:w-16 md:h-16 opacity-55" />
        </div>
        <div className="absolute top-28 right-10 md:right-28 float-b pointer-events-none">
          <LeafSvg className="w-8 h-10 md:w-12 md:h-16 opacity-50" />
        </div>
        <div className="absolute bottom-32 left-14 md:left-36 float-c pointer-events-none">
          <MushroomSvg className="w-9 h-11 md:w-13 md:h-16 opacity-50" />
        </div>
        <div className="absolute bottom-24 right-12 md:right-36 float-a pointer-events-none">
          <DaisySvg className="w-9 h-9 md:w-14 md:h-14 opacity-45" />
        </div>
        <div className="absolute top-1/2 left-6 md:left-16 float-b pointer-events-none">
          <LeafSvg className="w-6 h-8 md:w-8 md:h-10 opacity-35" />
        </div>
        <div className="absolute top-1/3 right-6 md:right-16 float-c pointer-events-none">
          <BerrySvg className="w-8 h-8 md:w-10 md:h-10 opacity-40" />
        </div>
        <div className="absolute bottom-1/2 left-1/3 float-a pointer-events-none hidden md:block">
          <FernSvg className="w-8 h-10 opacity-30" />
        </div>

        {/* Hero text */}
        <div className="relative z-10 text-center max-w-3xl">
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0ms",
            }}
          >
            <p className="font-serif text-xs tracking-[0.38em] text-[#8b7355]/45 uppercase mb-5">
              A Design Style for StyleKit
            </p>
          </div>

          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.95s cubic-bezier(0.16,1,0.3,1) 120ms, transform 0.95s cubic-bezier(0.16,1,0.3,1) 120ms",
            }}
          >
            <h1 className="font-serif text-6xl md:text-9xl text-[#5a8f5a] mb-5 leading-none tracking-tight">
              Cottagecore
            </h1>
          </div>

          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 250ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 250ms",
            }}
          >
            <p className="font-serif italic text-xl md:text-2xl text-[#8b7355]/65 mb-10 leading-relaxed max-w-xl mx-auto">
              Romanticised rural life — embroidery, wildflowers, honey, and the quiet warmth of handmade things.
            </p>
          </div>

          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 380ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 380ms",
            }}
          >
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button className="px-9 py-3.5 bg-[#5a8f5a] text-[#faf6f0] font-serif rounded-full shadow-[0_4px_14px_rgba(90,143,90,0.25)] hover:shadow-[0_8px_24px_rgba(90,143,90,0.35)] hover:-translate-y-0.5 hover:rotate-[0.8deg] active:scale-[0.97] active:rotate-0 transition-all duration-500">
                Wander the Meadow
              </button>
              <button className="px-9 py-3.5 bg-[#faf6f0] text-[#8b7355] font-serif rounded-full border border-[#d4a0a0]/40 shadow-[0_2px_10px_rgba(139,115,85,0.07)] hover:border-[#d4a0a0]/70 hover:-translate-y-0.5 hover:rotate-[-0.8deg] active:scale-[0.97] active:rotate-0 transition-all duration-500">
                Browse All Styles
              </button>
            </div>
          </div>

          {/* Decorative divider */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 520ms",
            }}
            className="flex items-center justify-center gap-3 mt-14"
          >
            <span className="block w-16 h-px bg-gradient-to-r from-transparent via-[#d4a0a0]/50 to-transparent" />
            <FlowerSvg className="w-5 h-5 opacity-35" />
            <span className="block w-16 h-px bg-gradient-to-r from-transparent via-[#d4a0a0]/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY STRIP ── */}
      <section className="py-16 px-6 bg-[#5a8f5a]">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-shrink-0">
              <FlowerSvg className="w-16 h-16 opacity-70 sway" />
            </div>
            <blockquote className="font-serif italic text-lg md:text-2xl text-[#faf6f0]/90 leading-relaxed text-center md:text-left">
              {'"Cottagecore romanticises agrarian life, turning the act of picking berries, kneading dough, or pressing a flower into a radical act of tenderness."'}
            </blockquote>
            <div className="flex-shrink-0 hidden md:block">
              <DaisySvg className="w-14 h-14 opacity-60 float-b" />
            </div>
          </div>
        </div>
      </section>

      {/* ── SEASONAL BOTANICALS ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="font-serif text-xs tracking-[0.32em] text-[#8b7355]/45 uppercase mb-3">
              The Garden Calendar
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#5a8f5a] mb-4">
              Seasonal Botanicals
            </h2>
            <p className="font-serif italic text-[#8b7355]/55 max-w-lg mx-auto">
              Each season brings its own palette of wildflowers, herbs, and forest finds.
            </p>
          </RevealBlock>

          {/* Season tabs */}
          <RevealBlock delay={0.08} className="flex items-center justify-center gap-2 mb-12 flex-wrap">
            {seasons.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setActiveSeason(i)}
                className={[
                  "px-5 py-2 font-serif rounded-full text-sm transition-all duration-500",
                  activeSeason === i
                    ? "bg-[#5a8f5a] text-[#faf6f0] shadow-[0_4px_10px_rgba(90,143,90,0.2)] scale-105"
                    : "bg-[#faf6f0] text-[#8b7355]/65 border border-[#d4a0a0]/30 hover:-translate-y-0.5 hover:rotate-[0.8deg]",
                ].join(" ")}
              >
                {s.name}
              </button>
            ))}
          </RevealBlock>

          {/* Plant cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {season.plants.map((plant, i) => (
              <RevealBlock key={`${activeSeason}-${plant.name}`} delay={i * 0.08}>
                <div className="group bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 shadow-[0_4px_20px_rgba(139,115,85,0.05)] p-7 hover:-translate-y-1 hover:-rotate-[0.8deg] active:scale-[0.97] active:rotate-0 transition-all duration-700 cursor-default">
                  <div className="mb-5 flex items-start justify-between">
                    <div className="w-12 h-12 group-hover:rotate-6 group-hover:scale-105 transition-all duration-500">
                      {plant.svgType === "flower" && <FlowerSvg className="w-full h-full" />}
                      {plant.svgType === "leaf" && <LeafSvg className="w-full h-full" />}
                      {plant.svgType === "mushroom" && <MushroomSvg className="w-full h-full" />}
                      {plant.svgType === "daisy" && <DaisySvg className="w-full h-full" />}
                      {plant.svgType === "berry" && <BerrySvg className="w-full h-full" />}
                      {plant.svgType === "fern" && <FernSvg className="w-8 h-10" />}
                    </div>
                    <span
                      className="text-xs font-serif tracking-wider uppercase px-3 py-1 rounded-full"
                      style={{ background: season.color + "22", color: season.color }}
                    >
                      {season.name}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-[#5a8f5a] mb-2 group-hover:text-[#8b7355] transition-colors duration-500">
                    {plant.name}
                  </h3>
                  <p className="font-serif italic text-sm text-[#8b7355]/60 leading-relaxed">{plant.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPONENT GALLERY ── */}
      <section className="py-24 px-6 bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="font-serif text-xs tracking-[0.32em] text-[#8b7355]/45 uppercase mb-3">
              Component Gallery
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#5a8f5a] mb-4">
              Handcrafted Elements
            </h2>
            <p className="font-serif italic text-[#8b7355]/55 max-w-lg mx-auto">
              Each component carries a gentle imperfection — a slight lean, a soft bloom on hover.
            </p>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.08} className="flex items-center justify-center gap-3 mb-12 flex-wrap">
            {componentTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveComponentTab(tab)}
                className={[
                  "px-6 py-2.5 font-serif text-sm rounded-full transition-all duration-500",
                  activeComponentTab === tab
                    ? "bg-[#8b7355] text-[#faf6f0] shadow-[0_4px_12px_rgba(139,115,85,0.2)]"
                    : "bg-[#faf6f0] text-[#8b7355]/65 border border-[#8b7355]/20 hover:-translate-y-0.5 hover:rotate-[0.8deg]",
                ].join(" ")}
              >
                {tab}
              </button>
            ))}
          </RevealBlock>

          {/* Buttons panel */}
          {activeComponentTab === "Buttons" && (
            <RevealBlock>
              <div className="bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 shadow-[0_4px_20px_rgba(139,115,85,0.06)] p-8 md:p-12">
                <p className="font-serif text-xs tracking-[0.3em] text-[#8b7355]/45 uppercase mb-8">
                  Button Variants
                </p>
                <div className="flex flex-wrap gap-4 mb-10">
                  <button className="px-7 py-3 bg-[#5a8f5a] text-[#faf6f0] font-serif rounded-full shadow-[0_4px_10px_rgba(90,143,90,0.2)] hover:shadow-[0_8px_20px_rgba(90,143,90,0.3)] hover:-translate-y-0.5 hover:rotate-[0.8deg] active:scale-[0.97] active:rotate-0 transition-all duration-500">
                    Primary
                  </button>
                  <button className="px-7 py-3 bg-[#faf6f0] text-[#5a8f5a] font-serif rounded-full border border-[#5a8f5a]/40 hover:border-[#5a8f5a] hover:-translate-y-0.5 hover:rotate-[-0.8deg] active:scale-[0.97] active:rotate-0 transition-all duration-500">
                    Outline
                  </button>
                  <button className="px-7 py-3 bg-[#d4a0a0] text-[#faf6f0] font-serif rounded-full shadow-[0_4px_10px_rgba(212,160,160,0.2)] hover:shadow-[0_8px_20px_rgba(212,160,160,0.3)] hover:-translate-y-0.5 hover:rotate-[0.8deg] active:scale-[0.97] active:rotate-0 transition-all duration-500">
                    Floral Pink
                  </button>
                  <button className="px-7 py-3 bg-[#f5d75f] text-[#8b7355] font-serif rounded-full shadow-[0_4px_10px_rgba(245,215,95,0.3)] hover:shadow-[0_8px_20px_rgba(245,215,95,0.4)] hover:-translate-y-0.5 hover:rotate-[-0.8deg] active:scale-[0.97] active:rotate-0 transition-all duration-500">
                    Daisy Yellow
                  </button>
                  <button className="px-7 py-3 bg-[#8b7355] text-[#faf6f0] font-serif rounded-full shadow-[0_4px_10px_rgba(139,115,85,0.2)] hover:shadow-[0_8px_20px_rgba(139,115,85,0.3)] hover:-translate-y-0.5 hover:rotate-[0.8deg] active:scale-[0.97] active:rotate-0 transition-all duration-500">
                    Earth Brown
                  </button>
                </div>
                <div className="border-t border-[#d4a0a0]/20 pt-6">
                  <p className="font-serif text-xs tracking-[0.3em] text-[#8b7355]/45 uppercase mb-3">
                    Interaction Physics
                  </p>
                  <p className="font-serif italic text-sm text-[#8b7355]/55 leading-relaxed max-w-lg">
                    Hover for a gentle lift and rotation — like picking up a handwritten note from a
                    wooden table. Press for a soft cushion effect:{" "}
                    <span className="not-italic text-[#5a8f5a]">active:scale-[0.97]</span>.
                  </p>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Cards panel */}
          {activeComponentTab === "Cards" && (
            <RevealBlock>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Wildflower Honey",
                    subtitle: "From the hive, with love",
                    desc: "Golden and fragrant, gathered by industrious bees from meadows full of clover and borage in late June.",
                    tag: "Harvest",
                    tagColor: "#f5d75f",
                    svgType: "daisy" as const,
                  },
                  {
                    title: "Forest Mushrooms",
                    subtitle: "Foraged at dawn",
                    desc: "Earthy and rich, found beneath ancient oaks on cool mornings when mist still clings to the bracken.",
                    tag: "Forage",
                    tagColor: "#d4a0a0",
                    svgType: "mushroom" as const,
                  },
                  {
                    title: "Bramble Jam",
                    subtitle: "September's gift",
                    desc: "Thick and dark, simmered with sugar and lemon peel, sealed in old jars from the highest shelf.",
                    tag: "Pantry",
                    tagColor: "#8b7355",
                    svgType: "berry" as const,
                  },
                  {
                    title: "Garden Herbs",
                    subtitle: "Sage, thyme, rosemary",
                    desc: "Hung in small bundles to dry above the kitchen window, scenting the whole cottage.",
                    tag: "Garden",
                    tagColor: "#5a8f5a",
                    svgType: "fern" as const,
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className="group bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 shadow-[0_4px_20px_rgba(139,115,85,0.05)] p-7 hover:-translate-y-1 hover:-rotate-[0.8deg] active:scale-[0.97] active:rotate-0 transition-all duration-700 cursor-default"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 group-hover:rotate-6 group-hover:scale-105 transition-all duration-500">
                        {card.svgType === "daisy" && <DaisySvg className="w-full h-full" />}
                        {card.svgType === "mushroom" && <MushroomSvg className="w-full h-full" />}
                        {card.svgType === "berry" && <BerrySvg className="w-full h-full" />}
                        {card.svgType === "fern" && <FernSvg className="w-10 h-12" />}
                      </div>
                      <span
                        className="text-xs font-serif tracking-wider px-3 py-1 rounded-full"
                        style={{ background: card.tagColor + "33", color: "#8b7355" }}
                      >
                        {card.tag}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl text-[#5a8f5a] mb-1 group-hover:text-[#8b7355] transition-colors duration-500">
                      {card.title}
                    </h3>
                    <p className="font-serif italic text-sm text-[#8b7355]/45 mb-3">{card.subtitle}</p>
                    <p className="font-serif text-sm text-[#8b7355]/55 leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>
            </RevealBlock>
          )}

          {/* Inputs panel */}
          {activeComponentTab === "Inputs" && (
            <RevealBlock>
              <div className="bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 shadow-[0_4px_20px_rgba(139,115,85,0.06)] p-8 md:p-12 max-w-2xl mx-auto">
                <p className="font-serif text-xs tracking-[0.3em] text-[#8b7355]/45 uppercase mb-8">
                  Form Elements
                </p>
                <div className="space-y-6">
                  <div>
                    <label className="block font-serif text-sm text-[#8b7355]/65 mb-2 italic">
                      Your name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Beatrice of the Hollows"
                      className="w-full px-4 py-3 bg-[#faf6f0] border border-[#8b7355]/30 rounded-xl font-serif text-[#8b7355] placeholder:text-[#8b7355]/30 focus:outline-none focus:border-[#5a8f5a]/60 focus:shadow-[0_0_12px_rgba(90,143,90,0.2)] transition-all duration-500"
                    />
                  </div>
                  <div>
                    <label className="block font-serif text-sm text-[#8b7355]/65 mb-2 italic">
                      A letter from the garden
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write your thoughts here, among the herbs and rain..."
                      className="w-full px-4 py-3 bg-[#faf6f0] border border-[#8b7355]/30 rounded-xl font-serif text-[#8b7355] placeholder:text-[#8b7355]/30 focus:outline-none focus:border-[#5a8f5a]/60 focus:shadow-[0_0_12px_rgba(90,143,90,0.2)] transition-all duration-500 resize-none leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="block font-serif text-sm text-[#8b7355]/65 mb-2 italic">
                      How did you find us?
                    </label>
                    <select className="w-full px-4 py-3 bg-[#faf6f0] border border-[#8b7355]/30 rounded-xl font-serif text-[#8b7355]/70 focus:outline-none focus:border-[#5a8f5a]/60 transition-all duration-500 appearance-none">
                      <option>By the meadow path</option>
                      <option>From a friend in the forest</option>
                      <option>Pressed in a letter</option>
                      <option>Followed the bees here</option>
                    </select>
                  </div>
                  <button className="w-full px-6 py-3.5 bg-[#5a8f5a] text-[#faf6f0] font-serif rounded-full shadow-[0_4px_10px_rgba(90,143,90,0.2)] hover:shadow-[0_8px_20px_rgba(90,143,90,0.3)] hover:-translate-y-0.5 hover:rotate-[0.8deg] active:scale-[0.97] active:rotate-0 transition-all duration-500">
                    Send by Meadow Post
                  </button>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ── COLOUR PALETTE ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="font-serif text-xs tracking-[0.32em] text-[#8b7355]/45 uppercase mb-3">
              Colour Palette
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#5a8f5a] mb-4">
              {"Nature's Own Colours"}
            </h2>
            <p className="font-serif italic text-[#8b7355]/55 max-w-lg mx-auto">
              Pressed from wildflowers, steeped in bark tea, ground from earth itself.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {[
              { name: "Grass Green", hex: "#5a8f5a", label: "Primary", note: "Buttons, headings, icons", border: false },
              { name: "Cream Linen", hex: "#faf6f0", label: "Background", note: "Page & card backgrounds", border: true },
              { name: "Daisy Yellow", hex: "#f5d75f", label: "Accent", note: "Highlights & flower centres", border: false },
              { name: "Earth Brown", hex: "#8b7355", label: "Text", note: "Body copy & secondary text", border: false },
              { name: "Flower Pink", hex: "#d4a0a0", label: "Accent", note: "Borders & floral details", border: false },
            ].map((color, i) => (
              <RevealBlock key={color.hex} delay={i * 0.06}>
                <div
                  className="group cursor-default"
                  onMouseEnter={() => setHoveredColor(color.hex)}
                  onMouseLeave={() => setHoveredColor(null)}
                >
                  <div
                    className="relative h-36 md:h-48 rounded-2xl mb-3 flex items-end justify-end p-3 transition-all duration-700 shadow-[0_4px_16px_rgba(139,115,85,0.08)]"
                    style={{
                      background: color.hex,
                      border: color.border ? "1px solid #d4a0a0aa" : undefined,
                      transform: hoveredColor === color.hex ? "translateY(-6px) rotate(-1deg)" : undefined,
                    }}
                  >
                    <div className="transition-opacity duration-500" style={{ opacity: hoveredColor === color.hex ? 0.5 : 0.15 }}>
                      <FlowerSvg className="w-8 h-8" />
                    </div>
                  </div>
                  <p className="font-serif text-sm font-medium text-[#5a8f5a]">{color.name}</p>
                  <p className="font-serif text-xs text-[#8b7355]/45 mt-0.5">{color.hex}</p>
                  <p className="font-serif text-xs italic text-[#8b7355]/35 mt-0.5">{color.note}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── CRAFT WORKSHOP ── */}
      <section className="py-24 px-6 bg-[#f5f0e8]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="font-serif text-xs tracking-[0.32em] text-[#8b7355]/45 uppercase mb-3">
              The Craft Workshop
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#5a8f5a] mb-4">
              Made by Hand, Made with Love
            </h2>
            <p className="font-serif italic text-[#8b7355]/55 max-w-lg mx-auto">
              Cottagecore celebrates slow crafts — each one a meditation on patience and the beauty of imperfection.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {craftItems.map((item, i) => (
              <RevealBlock key={item.title} delay={i * 0.07}>
                <div
                  className="group bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 shadow-[0_4px_20px_rgba(139,115,85,0.05)] p-8 transition-all duration-700 cursor-default"
                  style={{
                    transform: craftHovered === i ? "translateY(-6px) rotate(-0.8deg)" : undefined,
                  }}
                  onMouseEnter={() => setCraftHovered(i)}
                  onMouseLeave={() => setCraftHovered(null)}
                >
                  <div className="flex items-start gap-5 mb-5">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-6 group-hover:scale-105"
                      style={{ background: item.tagColor + "22" }}>
                      {item.svgType === "flower" && <FlowerSvg className="w-9 h-9" />}
                      {item.svgType === "fern" && <FernSvg className="w-8 h-10" />}
                      {item.svgType === "berry" && <BerrySvg className="w-9 h-9" />}
                      {item.svgType === "daisy" && <DaisySvg className="w-9 h-9" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                        <h3 className="font-serif text-xl text-[#5a8f5a] group-hover:text-[#8b7355] transition-colors duration-500">
                          {item.title}
                        </h3>
                        <span
                          className="text-xs font-serif tracking-wider px-3 py-1 rounded-full flex-shrink-0"
                          style={{ background: item.tagColor + "33", color: "#8b7355" }}
                        >
                          {item.tag}
                        </span>
                      </div>
                      <p className="font-serif italic text-sm text-[#8b7355]/45">{item.subtitle}</p>
                    </div>
                  </div>
                  <p className="font-serif text-sm text-[#8b7355]/60 leading-relaxed">{item.desc}</p>
                  <div className="mt-5 pt-5 border-t border-[#d4a0a0]/20 flex items-center gap-2">
                    <span className="block w-6 h-px bg-[#d4a0a0]/50" />
                    <p className="font-serif italic text-xs text-[#8b7355]/35">
                      A slow craft, done with care
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── TYPOGRAPHY ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="font-serif text-xs tracking-[0.32em] text-[#8b7355]/45 uppercase mb-3">
              Typography
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#5a8f5a] mb-4">
              Words Like Handwriting
            </h2>
            <p className="font-serif italic text-[#8b7355]/55 max-w-md mx-auto">
              Serif typography evokes old recipe books and letters tucked beneath dried flowers.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-10 mb-10">
            {/* Scale card */}
            <RevealBlock>
              <div className="bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 shadow-[0_4px_20px_rgba(139,115,85,0.06)] p-8">
                <p className="font-serif text-xs tracking-[0.3em] text-[#8b7355]/45 uppercase mb-6">
                  Type Scale
                </p>
                <div className="space-y-4">
                  {typographyExamples.map((ex, i) => (
                    <div key={i} className="border-b border-[#d4a0a0]/15 pb-4 last:border-0 last:pb-0">
                      <p
                        className={`font-serif ${ex.size} leading-tight mb-1`}
                        style={{ color: ex.color }}
                      >
                        {ex.text}
                      </p>
                      <p className="font-serif text-xs text-[#8b7355]/35 italic">{ex.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Quote + details card */}
            <RevealBlock delay={0.12}>
              <div className="bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 shadow-[0_4px_20px_rgba(139,115,85,0.06)] p-8 flex flex-col gap-6">
                <div>
                  <p className="font-serif text-xs tracking-[0.3em] text-[#8b7355]/45 uppercase mb-5">
                    Quotation Style
                  </p>
                  <blockquote className="border-l-2 border-[#d4a0a0]/55 pl-5">
                    <p className="font-serif text-lg italic text-[#8b7355] leading-relaxed mb-4">
                      {'"The earth laughs in flowers, and the soul finds rest in meadows too far from clocks to hear them."'}
                    </p>
                    <p className="font-serif text-xs text-[#8b7355]/35 tracking-wider">
                      — A Cottagecore Proverb
                    </p>
                  </blockquote>
                </div>
                <div className="pt-5 border-t border-[#d4a0a0]/20">
                  <p className="font-serif text-xs tracking-[0.3em] text-[#8b7355]/45 uppercase mb-4">
                    Usage Notes
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Use italic for quotes, captions, and gentle accents",
                      "Heading weight: font-semibold or normal — never bold",
                      "Wide letter-spacing for labels: tracking-[0.3em]",
                      "Body text: leading-relaxed for breathing room",
                    ].map((note, i) => (
                      <li key={i} className="flex items-start gap-2 font-serif text-sm text-[#8b7355]/60">
                        <span className="text-[#d4a0a0] flex-shrink-0 mt-0.5">&#10047;</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── DESIGN RULES ── */}
      <section className="py-24 px-6 bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="font-serif text-xs tracking-[0.32em] text-[#8b7355]/45 uppercase mb-3">
              Design Rules
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#5a8f5a] mb-4">
              The Cottage Recipe
            </h2>
            <p className="font-serif italic text-[#8b7355]/55 max-w-lg mx-auto">
              Like a recipe card passed down through the family — follow it warmly, not mechanically.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Do card */}
            <RevealBlock>
              <div className="group bg-[#faf6f0] rounded-3xl border border-[#5a8f5a]/30 shadow-[0_4px_20px_rgba(90,143,90,0.06)] p-8 hover:-translate-y-1 hover:rotate-[0.8deg] transition-all duration-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-[#5a8f5a] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#faf6f0] text-base font-bold">&#10003;</span>
                  </div>
                  <p className="font-serif text-lg text-[#5a8f5a]">Always Do</p>
                  <DaisySvg className="w-7 h-7 ml-auto opacity-45 group-hover:rotate-6 group-hover:scale-105 transition-all duration-500" />
                </div>
                <ul className="space-y-3">
                  {[
                    "Warm earth tones — sage greens, dusty yellows, pinks, browns",
                    "Rounded corners: rounded-full, rounded-3xl, rounded-xl",
                    "Serif fonts for all headings and key interface text",
                    "Slight hover rotation (0.8deg–1deg) for handmade feel",
                    "Cream linen (#faf6f0) as the primary background",
                    "Botanical SVG decorations with gentle floating animations",
                    "Soft shadows — never sharp or high-contrast drop shadows",
                    "Generous whitespace to honour breathing room",
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 font-serif text-sm text-[#8b7355]/65">
                      <LeafSvg className="w-4 h-5 flex-shrink-0 mt-0.5 opacity-55" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't card */}
            <RevealBlock delay={0.12}>
              <div className="group bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 shadow-[0_4px_20px_rgba(212,160,160,0.06)] p-8 hover:-translate-y-1 hover:-rotate-[0.8deg] transition-all duration-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-full bg-[#d4a0a0] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#faf6f0] text-base font-bold">&#10005;</span>
                  </div>
                  <p className="font-serif text-lg text-[#d4a0a0]">{"Don't"}</p>
                  <MushroomSvg className="w-7 h-8 ml-auto opacity-45 group-hover:rotate-6 group-hover:scale-105 transition-all duration-500" />
                </div>
                <ul className="space-y-3">
                  {[
                    "Cold blue-grey tones, icy neutrals, or high-saturation neons",
                    "Sharp right-angle corners or hard geometric rigid frames",
                    "Tech, industrial, or corporate visual vocabulary",
                    "Fast snappy transitions — keep duration 500ms to 700ms",
                    "Sans-serif-only typography in headings or labels",
                    "Heavy or hard borders — keep them soft and faded",
                    "Cluttered dense layouts — slow living needs space",
                    "Flat or sterile flat-design aesthetics",
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 font-serif text-sm text-[#8b7355]/65">
                      <span className="text-[#d4a0a0] flex-shrink-0 mt-0.5 text-xs">&#10005;</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Colour pairing reference */}
          <RevealBlock delay={0.16}>
            <div className="bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 shadow-[0_4px_20px_rgba(139,115,85,0.05)] p-8">
              <p className="font-serif text-xs tracking-[0.3em] text-[#8b7355]/45 uppercase mb-6">
                Approved Colour Pairings
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { bg: "#5a8f5a", text: "#faf6f0", label: "Primary CTA" },
                  { bg: "#faf6f0", text: "#5a8f5a", label: "Outline / Ghost" },
                  { bg: "#d4a0a0", text: "#faf6f0", label: "Floral Accent" },
                  { bg: "#f5d75f", text: "#8b7355", label: "Daisy Highlight" },
                ].map((pair, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-[#d4a0a0]/30 overflow-hidden"
                  >
                    <div
                      className="h-12 flex items-center justify-center font-serif text-sm"
                      style={{ background: pair.bg, color: pair.text, border: pair.bg === "#faf6f0" ? "1px solid #d4a0a0aa" : undefined }}
                    >
                      Aa
                    </div>
                    <div className="p-2.5 text-center">
                      <p className="font-serif text-xs text-[#8b7355]/55">{pair.label}</p>
                      <p className="font-serif text-xs text-[#8b7355]/35 mt-0.5">
                        {pair.bg} / {pair.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── INTERACTION PHYSICS DEMO ── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="font-serif text-xs tracking-[0.32em] text-[#8b7355]/45 uppercase mb-3">
              Interaction Physics
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#5a8f5a] mb-4">
              Handmade Imperfection
            </h2>
            <p className="font-serif italic text-[#8b7355]/55 max-w-xl mx-auto">
              Nothing in the cottage is machine-perfect. A slight lean, a gentle bounce — digital rendered as handmade.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            <RevealBlock>
              <div className="bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 shadow-[0_4px_16px_rgba(139,115,85,0.06)] p-7 text-center">
                <div className="flex justify-center mb-5">
                  <FlowerSvg className="w-16 h-16 sway" />
                </div>
                <p className="font-serif text-base text-[#5a8f5a] mb-2">Botanical Sway</p>
                <p className="font-serif italic text-xs text-[#8b7355]/50 leading-relaxed mb-3">
                  Decorative elements sway gently with a slow CSS keyframe, like wildflowers in a summer breeze.
                </p>
                <code className="font-serif text-xs text-[#8b7355]/30 bg-[#f5f0e8] px-2 py-1 rounded-lg">
                  animation: sway 5s ease-in-out infinite
                </code>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.08}>
              <div className="bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 shadow-[0_4px_16px_rgba(139,115,85,0.06)] p-7 text-center">
                <div className="flex justify-center mb-5">
                  <button className="px-6 py-3 bg-[#5a8f5a] text-[#faf6f0] font-serif rounded-full shadow-[0_4px_10px_rgba(90,143,90,0.2)] hover:shadow-[0_8px_20px_rgba(90,143,90,0.3)] hover:-translate-y-0.5 hover:rotate-[0.8deg] active:scale-[0.97] active:rotate-0 transition-all duration-500 text-sm">
                    Hover Me
                  </button>
                </div>
                <p className="font-serif text-base text-[#5a8f5a] mb-2">Gentle Imperfection</p>
                <p className="font-serif italic text-xs text-[#8b7355]/50 leading-relaxed mb-3">
                  Hover lifts and leans the element slightly. Nothing in the cottage is perfectly straight.
                </p>
                <code className="font-serif text-xs text-[#8b7355]/30 bg-[#f5f0e8] px-2 py-1 rounded-lg">
                  hover:rotate-[0.8deg] hover:-translate-y-0.5
                </code>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.16}>
              <div className="bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 shadow-[0_4px_16px_rgba(139,115,85,0.06)] p-7 text-center">
                <div className="flex justify-center mb-5">
                  <button className="px-6 py-3 bg-[#d4a0a0] text-[#faf6f0] font-serif rounded-full shadow-[0_4px_10px_rgba(212,160,160,0.2)] hover:-translate-y-0.5 active:scale-[0.97] active:rotate-0 transition-all duration-500 text-sm">
                    Press Me
                  </button>
                </div>
                <p className="font-serif text-base text-[#5a8f5a] mb-2">Soft Cushion Press</p>
                <p className="font-serif italic text-xs text-[#8b7355]/50 leading-relaxed mb-3">
                  Clicking feels like pressing into a soft feather cushion — a gentle give, then recovery.
                </p>
                <code className="font-serif text-xs text-[#8b7355]/30 bg-[#f5f0e8] px-2 py-1 rounded-lg">
                  active:scale-[0.97] duration-500
                </code>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY DEEP DIVE ── */}
      <section className="py-24 px-6 bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="font-serif text-xs tracking-[0.32em] text-[#8b7355]/45 uppercase mb-3">
              Philosophy
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#5a8f5a] mb-4">
              A Slower Way of Living
            </h2>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Pastoral Poetry",
                desc: "Cottagecore romanticises the agrarian — tending a garden, picking berries, kneading bread at dawn. The design reflects this: nothing is hurried, nothing is harsh.",
                svgType: "flower" as const,
                color: "#5a8f5a",
              },
              {
                title: "Handmade Warmth",
                desc: "Every interface element should feel as if it was made by hand — a slight imperfection in alignment, a warm colour that doesn't quite match the grid.",
                svgType: "leaf" as const,
                color: "#8b7355",
              },
              {
                title: "Natural Intimacy",
                desc: "Flowers, mushrooms, bees, berries: the natural world is brought indoors. Botanical SVG decorations are never decoration alone — they carry meaning and warmth.",
                svgType: "berry" as const,
                color: "#d4a0a0",
              },
              {
                title: "Cosy Domesticity",
                desc: "The warmth of a cottage kitchen: soft light, worn surfaces, the smell of something baking. Cream, brown, green — colours that say 'come in, stay a while'.",
                svgType: "mushroom" as const,
                color: "#f5d75f",
              },
            ].map((item, i) => (
              <RevealBlock key={item.title} delay={i * 0.08}>
                <div className="group bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 shadow-[0_4px_20px_rgba(139,115,85,0.05)] p-7 hover:-translate-y-1 hover:rotate-[0.5deg] transition-all duration-700 cursor-default">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 group-hover:rotate-6 group-hover:scale-105 transition-all duration-500">
                      {item.svgType === "flower" && <FlowerSvg className="w-full h-full" />}
                      {item.svgType === "leaf" && <LeafSvg className="w-full h-full" />}
                      {item.svgType === "berry" && <BerrySvg className="w-full h-full" />}
                      {item.svgType === "mushroom" && <MushroomSvg className="w-full h-full" />}
                    </div>
                    <h3
                      className="font-serif text-xl group-hover:opacity-80 transition-opacity duration-500"
                      style={{ color: item.color }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-serif italic text-sm text-[#8b7355]/60 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16 px-6 bg-[#faf6f0] border-t border-[#d4a0a0]/30">
        <div className="max-w-5xl mx-auto">
          {/* Botanical top border */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className="block flex-1 h-px bg-gradient-to-r from-transparent via-[#d4a0a0]/30 to-transparent" />
            <FlowerSvg className="w-5 h-5 opacity-35" />
            <MushroomSvg className="w-5 h-6 opacity-35" />
            <DaisySvg className="w-5 h-5 opacity-35" />
            <BerrySvg className="w-5 h-5 opacity-35" />
            <LeafSvg className="w-4 h-5 opacity-35" />
            <span className="block flex-1 h-px bg-gradient-to-r from-transparent via-[#d4a0a0]/30 to-transparent" />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <FlowerSvg className="w-8 h-8 opacity-45" />
              <span className="font-serif text-[#8b7355]/55 italic text-sm">
                StyleKit — Cottagecore Showcase
              </span>
            </div>
            <nav className="flex items-center gap-4 flex-wrap justify-center">
              <span className="text-[#d4a0a0]/40 text-xs select-none">&#10047;</span>
              <Link
                href="/styles/cottagecore"
                className="font-serif text-sm text-[#8b7355]/45 hover:text-[#5a8f5a] transition-colors duration-500 italic"
              >
                View Documentation
              </Link>
              <span className="text-[#d4a0a0]/40 text-xs select-none">&#10047;</span>
              <Link
                href="/styles"
                className="font-serif text-sm text-[#8b7355]/45 hover:text-[#5a8f5a] transition-colors duration-500 italic"
              >
                All Styles
              </Link>
              <span className="text-[#d4a0a0]/40 text-xs select-none">&#10047;</span>
            </nav>
          </div>

          {/* Bottom signature */}
          <div className="mt-10 pt-6 border-t border-[#d4a0a0]/20 flex items-center justify-center gap-4">
            <DaisySvg className="w-6 h-6 opacity-25" />
            <p className="font-serif italic text-xs text-[#8b7355]/28 text-center">
              Where the digital world slows down and wildflowers grow through the cracks.
            </p>
            <FernSvg className="w-5 h-6 opacity-25" />
          </div>
        </div>
      </footer>
    </div>
  );
}
