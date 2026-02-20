"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// --- Inline useInView hook ---
function useInView(options?: { threshold?: number; once?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options?.once !== false) observer.disconnect();
        }
      },
      { threshold: options?.threshold ?? 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.once]);

  return { ref, inView };
}

// --- Inline RevealBlock component ---
function RevealBlock({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView({ threshold: 0.15, once: true });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// --- Inline SVG Botanical Decorations ---
function FlowerSvg({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
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
    <svg
      viewBox="0 0 30 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
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
    <svg
      viewBox="0 0 36 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
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
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
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

// --- Season data ---
type Season = {
  name: string;
  color: string;
  plants: { name: string; desc: string; svgType: "flower" | "leaf" | "mushroom" | "daisy" }[];
};

const seasons: Season[] = [
  {
    name: "Spring",
    color: "#d4a0a0",
    plants: [
      { name: "Wild Violet", desc: "First to bloom after frost, petals like small purple hearts scattered across the moss.", svgType: "flower" },
      { name: "Wood Anemone", desc: "Delicate white stars that carpet ancient woodland floors each April.", svgType: "daisy" },
      { name: "Primrose", desc: "Pale yellow clusters that brighten hedgerows and meadow edges.", svgType: "flower" },
    ],
  },
  {
    name: "Summer",
    color: "#5a8f5a",
    plants: [
      { name: "Meadowsweet", desc: "Creamy frothy blossoms with a honey-almond scent drifting over the riverbank.", svgType: "daisy" },
      { name: "Elder Flower", desc: "Flat-topped umbels of tiny white flowers, perfect for cordials and syrups.", svgType: "flower" },
      { name: "Ox-Eye Daisy", desc: "Bold white petals around a golden disc, swaying tall in the summer breeze.", svgType: "daisy" },
    ],
  },
  {
    name: "Autumn",
    color: "#8b7355",
    plants: [
      { name: "Penny Bun", desc: "The stout king of mushrooms, found beneath oak and birch on misty mornings.", svgType: "mushroom" },
      { name: "Bramble Leaf", desc: "Turning crimson and gold, bramble leaves trace the edges of old lanes.", svgType: "leaf" },
      { name: "Fly Agaric", desc: "The storybook mushroom — bright red cap with white spots, magical and untouched.", svgType: "mushroom" },
    ],
  },
  {
    name: "Winter",
    color: "#7a9e9e",
    plants: [
      { name: "Holly", desc: "Glossy leaves and scarlet berries against bare grey branches.", svgType: "leaf" },
      { name: "Snowdrop", desc: "The first hopeful flower of the year, pressing through frozen earth.", svgType: "daisy" },
      { name: "Ivy", desc: "Evergreen faithful ivy, threading through stone walls and sheltering wrens.", svgType: "leaf" },
    ],
  },
];

const componentTabs = ["Buttons", "Cards", "Inputs"];

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeSeason, setActiveSeason] = useState(0);
  const [activeComponentTab, setActiveComponentTab] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(timer);
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
        .float-a { animation: floatA 7s ease-in-out infinite; }
        .float-b { animation: floatB 9s ease-in-out infinite; }
        .float-c { animation: floatC 6s ease-in-out infinite; }
        .sway { animation: sway 5s ease-in-out infinite; }
      `}</style>

      {/* NAV */}
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

      {/* HERO */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, #f5d75f44 0%, transparent 70%)" }}
          />
          <div
            className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full opacity-25"
            style={{ background: "radial-gradient(circle, #d4a0a044 0%, transparent 70%)" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, #5a8f5a22 0%, transparent 70%)" }}
          />
        </div>

        <div className="absolute top-16 left-8 md:left-24 float-a pointer-events-none">
          <FlowerSvg className="w-10 h-10 md:w-14 md:h-14 opacity-60" />
        </div>
        <div className="absolute top-28 right-10 md:right-28 float-b pointer-events-none">
          <LeafSvg className="w-8 h-10 md:w-11 md:h-14 opacity-50" />
        </div>
        <div className="absolute bottom-28 left-14 md:left-36 float-c pointer-events-none">
          <MushroomSvg className="w-8 h-10 md:w-12 md:h-14 opacity-55" />
        </div>
        <div className="absolute bottom-20 right-12 md:right-32 float-a pointer-events-none">
          <DaisySvg className="w-9 h-9 md:w-12 md:h-12 opacity-50" />
        </div>
        <div className="absolute top-1/2 left-6 md:left-16 float-b pointer-events-none">
          <LeafSvg className="w-6 h-8 md:w-8 md:h-10 opacity-40" />
        </div>
        <div className="absolute top-1/3 right-6 md:right-14 float-c pointer-events-none">
          <FlowerSvg className="w-8 h-8 md:w-10 md:h-10 opacity-45" />
        </div>

        <div className="relative z-10 text-center max-w-3xl">
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0ms",
            }}
          >
            <p className="font-serif text-xs tracking-[0.35em] text-[#8b7355]/50 uppercase mb-4">
              A Design Style
            </p>
          </div>

          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 120ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 120ms",
            }}
          >
            <h1 className="font-serif text-6xl md:text-8xl text-[#5a8f5a] mb-4 leading-none tracking-tight">
              Cottagecore
            </h1>
          </div>

          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 240ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) 240ms",
            }}
          >
            <p className="font-serif italic text-xl md:text-2xl text-[#8b7355]/70 mb-10 leading-relaxed max-w-xl mx-auto">
              Romanticised rural life — embroidery, wildflowers, honey, and the quiet warmth of handmade things.
            </p>
          </div>

          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 360ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) 360ms",
            }}
          >
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button className="px-8 py-3.5 bg-[#5a8f5a] text-[#faf6f0] font-serif rounded-full shadow-[0_4px_10px_rgba(90,143,90,0.2)] hover:shadow-[0_8px_20px_rgba(90,143,90,0.3)] hover:-translate-y-0.5 hover:rotate-[0.8deg] active:scale-[0.97] active:rotate-0 transition-all duration-500">
                Wander the Meadow
              </button>
              <button className="px-8 py-3.5 bg-[#faf6f0] text-[#8b7355] font-serif rounded-full border border-[#d4a0a0]/40 shadow-[0_2px_8px_rgba(139,115,85,0.08)] hover:border-[#d4a0a0]/70 hover:-translate-y-0.5 hover:rotate-[-0.8deg] active:scale-[0.97] active:rotate-0 transition-all duration-500">
                Browse Styles
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* GARDEN SEASON SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="font-serif text-xs tracking-[0.3em] text-[#8b7355]/50 uppercase mb-3">The Garden Calendar</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#5a8f5a] mb-4">Seasonal Botanicals</h2>
            <p className="font-serif italic text-[#8b7355]/60 max-w-lg mx-auto">
              Each season brings its own palette of wildflowers, herbs, and forest finds.
            </p>
          </RevealBlock>

          <RevealBlock delay={100} className="flex items-center justify-center gap-2 mb-12 flex-wrap">
            {seasons.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setActiveSeason(i)}
                className={[
                  "px-5 py-2 font-serif rounded-full text-sm transition-all duration-500",
                  activeSeason === i
                    ? "bg-[#5a8f5a] text-[#faf6f0] shadow-[0_4px_10px_rgba(90,143,90,0.2)] scale-105"
                    : "bg-[#faf6f0] text-[#8b7355]/70 border border-[#d4a0a0]/30 hover:-translate-y-0.5 hover:rotate-[0.8deg]",
                ].join(" ")}
              >
                {s.name}
              </button>
            ))}
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            {season.plants.map((plant, i) => (
              <RevealBlock key={`${activeSeason}-${i}`} delay={i * 80}>
                <div className="group bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 shadow-[0_4px_20px_rgba(139,115,85,0.05)] p-7 hover:-translate-y-1 hover:-rotate-[0.8deg] active:scale-[0.97] active:rotate-0 transition-all duration-700 cursor-default">
                  <div className="mb-5 flex items-start justify-between">
                    {plant.svgType === "flower" && (
                      <FlowerSvg className="w-12 h-12 group-hover:rotate-6 group-hover:scale-105 transition-all duration-500" />
                    )}
                    {plant.svgType === "leaf" && (
                      <LeafSvg className="w-10 h-12 group-hover:rotate-6 group-hover:scale-105 transition-all duration-500" />
                    )}
                    {plant.svgType === "mushroom" && (
                      <MushroomSvg className="w-11 h-12 group-hover:rotate-6 group-hover:scale-105 transition-all duration-500" />
                    )}
                    {plant.svgType === "daisy" && (
                      <DaisySvg className="w-12 h-12 group-hover:rotate-6 group-hover:scale-105 transition-all duration-500" />
                    )}
                    <span
                      className="text-xs font-serif tracking-wider uppercase px-3 py-1 rounded-full"
                      style={{ background: season.color + "22", color: season.color }}
                    >
                      {season.name}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-[#5a8f5a] mb-2">{plant.name}</h3>
                  <p className="font-serif italic text-sm text-[#8b7355]/60 leading-relaxed">{plant.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* COMPONENT GALLERY */}
      <section className="py-24 px-6 bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="font-serif text-xs tracking-[0.3em] text-[#8b7355]/50 uppercase mb-3">Component Gallery</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#5a8f5a] mb-4">Handcrafted Elements</h2>
            <p className="font-serif italic text-[#8b7355]/60 max-w-lg mx-auto">
              Each component carries a gentle imperfection — a slight lean, a soft bloom on hover.
            </p>
          </RevealBlock>

          <RevealBlock delay={80} className="flex items-center justify-center gap-3 mb-12">
            {componentTabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveComponentTab(i)}
                className={[
                  "px-6 py-2.5 font-serif text-sm rounded-full transition-all duration-500",
                  activeComponentTab === i
                    ? "bg-[#8b7355] text-[#faf6f0] shadow-[0_4px_12px_rgba(139,115,85,0.2)]"
                    : "bg-[#faf6f0] text-[#8b7355]/70 border border-[#8b7355]/20 hover:-translate-y-0.5 hover:rotate-[0.8deg]",
                ].join(" ")}
              >
                {tab}
              </button>
            ))}
          </RevealBlock>

          {activeComponentTab === 0 && (
            <RevealBlock>
              <div className="bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 shadow-[0_4px_20px_rgba(139,115,85,0.06)] p-8 md:p-12">
                <p className="font-serif text-xs tracking-[0.3em] text-[#8b7355]/50 uppercase mb-8">Button Variants</p>
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
                </div>
                <p className="font-serif text-xs tracking-[0.3em] text-[#8b7355]/50 uppercase mb-4">Interaction Physics</p>
                <p className="font-serif italic text-sm text-[#8b7355]/60 leading-relaxed max-w-lg">
                  Hover for a gentle lift and rotation — like picking up a handwritten note from a wooden table.
                  Press for a soft cushion effect: <span className="font-normal text-[#5a8f5a]">active:scale-[0.97]</span>.
                </p>
              </div>
            </RevealBlock>
          )}

          {activeComponentTab === 1 && (
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
                ].map((card, i) => (
                  <div
                    key={i}
                    className="group bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 shadow-[0_4px_20px_rgba(139,115,85,0.05)] p-8 hover:-translate-y-1 hover:-rotate-[0.8deg] active:scale-[0.97] active:rotate-0 transition-all duration-700 cursor-default"
                  >
                    <div className="flex items-start justify-between mb-5">
                      {card.svgType === "daisy" ? (
                        <DaisySvg className="w-12 h-12 group-hover:rotate-6 group-hover:scale-105 transition-all duration-500" />
                      ) : (
                        <MushroomSvg className="w-11 h-12 group-hover:rotate-6 group-hover:scale-105 transition-all duration-500" />
                      )}
                      <span
                        className="text-xs font-serif tracking-wider px-3 py-1 rounded-full"
                        style={{ background: card.tagColor + "33", color: "#8b7355" }}
                      >
                        {card.tag}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl text-[#5a8f5a] mb-1">{card.title}</h3>
                    <p className="font-serif italic text-sm text-[#8b7355]/50 mb-3">{card.subtitle}</p>
                    <p className="font-serif text-sm text-[#8b7355]/60 leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>
            </RevealBlock>
          )}

          {activeComponentTab === 2 && (
            <RevealBlock>
              <div className="bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 shadow-[0_4px_20px_rgba(139,115,85,0.06)] p-8 md:p-12 max-w-2xl mx-auto">
                <p className="font-serif text-xs tracking-[0.3em] text-[#8b7355]/50 uppercase mb-8">Form Elements</p>
                <div className="space-y-6">
                  <div>
                    <label className="block font-serif text-sm text-[#8b7355]/70 mb-2 italic">Your name</label>
                    <input
                      type="text"
                      placeholder="e.g. Beatrice of the Hollows"
                      className="w-full px-4 py-3 bg-[#faf6f0] border border-[#8b7355]/30 rounded-xl font-serif text-[#8b7355] placeholder:text-[#8b7355]/30 focus:outline-none focus:border-[#5a8f5a]/60 focus:shadow-[0_0_12px_rgba(90,143,90,0.2)] transition-all duration-500"
                    />
                  </div>
                  <div>
                    <label className="block font-serif text-sm text-[#8b7355]/70 mb-2 italic">A letter from the garden</label>
                    <textarea
                      rows={4}
                      placeholder="Write your thoughts here, among the herbs and rain..."
                      className="w-full px-4 py-3 bg-[#faf6f0] border border-[#8b7355]/30 rounded-xl font-serif text-[#8b7355] placeholder:text-[#8b7355]/30 focus:outline-none focus:border-[#5a8f5a]/60 focus:shadow-[0_0_12px_rgba(90,143,90,0.2)] transition-all duration-500 resize-none leading-relaxed"
                    />
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

      {/* BOTANICAL PALETTE */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="font-serif text-xs tracking-[0.3em] text-[#8b7355]/50 uppercase mb-3">Colour Palette</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#5a8f5a] mb-4">{"Nature's Own Colours"}</h2>
            <p className="font-serif italic text-[#8b7355]/60 max-w-lg mx-auto">
              Pressed from wildflowers, steeped in bark tea, ground from earth itself.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {[
              { name: "Grass Green", hex: "#5a8f5a", label: "Primary", border: false },
              { name: "Cream Linen", hex: "#faf6f0", label: "Background", border: true },
              { name: "Daisy Yellow", hex: "#f5d75f", label: "Accent", border: false },
              { name: "Earth Brown", hex: "#8b7355", label: "Accent", border: false },
              { name: "Flower Pink", hex: "#d4a0a0", label: "Accent", border: false },
            ].map((color, i) => (
              <RevealBlock key={color.hex} delay={i * 60}>
                <div className="group cursor-default">
                  <div
                    className="relative h-36 md:h-44 rounded-2xl mb-3 flex items-end justify-end p-3 hover:-rotate-[1deg] hover:-translate-y-1 transition-all duration-700 shadow-[0_4px_16px_rgba(139,115,85,0.08)]"
                    style={{
                      background: color.hex,
                      border: color.border ? "1px solid #d4a0a0aa" : undefined,
                    }}
                  >
                    <div className="opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                      <FlowerSvg className="w-8 h-8" />
                    </div>
                  </div>
                  <p className="font-serif text-sm font-medium" style={{ color: "#5a8f5a" }}>
                    {color.name}
                  </p>
                  <p className="font-serif text-xs text-[#8b7355]/50 mt-0.5">{color.hex}</p>
                  <p className="font-serif text-xs italic text-[#8b7355]/40">{color.label}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* TYPOGRAPHY */}
      <section className="py-24 px-6 bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="font-serif text-xs tracking-[0.3em] text-[#8b7355]/50 uppercase mb-3">Typography</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#5a8f5a] mb-4">Words Like Handwriting</h2>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-10">
            <RevealBlock>
              <div className="bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 shadow-[0_4px_20px_rgba(139,115,85,0.06)] p-8">
                <p className="font-serif text-xs tracking-[0.3em] text-[#8b7355]/50 uppercase mb-5">Headings — font-serif</p>
                <p className="font-serif text-5xl text-[#5a8f5a] leading-tight mb-2">Wander</p>
                <p className="font-serif text-3xl text-[#8b7355] leading-tight mb-2">Gather</p>
                <p className="font-serif text-xl text-[#d4a0a0] leading-tight mb-2 italic">Bloom</p>
                <p className="font-serif text-sm text-[#8b7355]/50 mt-4">
                  Serif typography evokes the pages of old recipe books and handwritten letters tucked beneath dried flowers.
                </p>
              </div>
            </RevealBlock>

            <RevealBlock delay={120}>
              <div className="bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 shadow-[0_4px_20px_rgba(139,115,85,0.06)] p-8">
                <p className="font-serif text-xs tracking-[0.3em] text-[#8b7355]/50 uppercase mb-5">Quotations — italic</p>
                <blockquote className="border-l-2 border-[#d4a0a0]/60 pl-5">
                  <p className="font-serif text-lg italic text-[#8b7355] leading-relaxed mb-4">
                    {'"The earth laughs in flowers, and the soul finds rest in meadows too far from clocks to hear them."'}
                  </p>
                  <p className="font-serif text-xs text-[#8b7355]/40 tracking-wider">— A Cottagecore Proverb</p>
                </blockquote>
                <div className="mt-6 pt-6 border-t border-[#d4a0a0]/20">
                  <p className="font-serif text-sm text-[#8b7355]/60 leading-relaxed">
                    Use <span className="italic text-[#5a8f5a]">italic</span> for quotes, captions, and gentle accents throughout the design.
                  </p>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* DESIGN RULES — RECIPE CARD STYLE */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="font-serif text-xs tracking-[0.3em] text-[#8b7355]/50 uppercase mb-3">Design Rules</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#5a8f5a] mb-4">The Cottage Recipe</h2>
            <p className="font-serif italic text-[#8b7355]/60 max-w-lg mx-auto">
              Like a recipe card passed down through the family — follow it warmly, not mechanically.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            <RevealBlock>
              <div className="group bg-[#faf6f0] rounded-3xl border border-[#5a8f5a]/30 shadow-[0_4px_20px_rgba(90,143,90,0.06)] p-8 hover:-translate-y-1 hover:rotate-[0.8deg] transition-all duration-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#5a8f5a] flex items-center justify-center">
                    <span className="text-[#faf6f0] text-sm font-bold">&#10003;</span>
                  </div>
                  <p className="font-serif text-lg text-[#5a8f5a]">Always Do</p>
                  <DaisySvg className="w-7 h-7 ml-auto opacity-50 group-hover:rotate-6 group-hover:scale-105 transition-all duration-500" />
                </div>
                <ul className="space-y-3">
                  {[
                    "Warm earth tones — greens, yellows, pinks, browns",
                    "Rounded corners: rounded-full, rounded-3xl, rounded-xl",
                    "Serif font for all headings and key text",
                    "Slight hover rotation (1deg or less) for handmade feel",
                    "Linen cream (#faf6f0) as the main background",
                    "Botanical SVG decorations with gentle sway",
                    "Soft shadows, never sharp drop shadows",
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 font-serif text-sm text-[#8b7355]/70">
                      <LeafSvg className="w-4 h-5 flex-shrink-0 mt-0.5 opacity-60" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={120}>
              <div className="group bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 shadow-[0_4px_20px_rgba(212,160,160,0.06)] p-8 hover:-translate-y-1 hover:-rotate-[0.8deg] transition-all duration-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#d4a0a0] flex items-center justify-center">
                    <span className="text-[#faf6f0] text-sm font-bold">&#10005;</span>
                  </div>
                  <p className="font-serif text-lg text-[#d4a0a0]">{"Don't"} Do</p>
                  <MushroomSvg className="w-7 h-8 ml-auto opacity-50 group-hover:rotate-6 group-hover:scale-105 transition-all duration-500" />
                </div>
                <ul className="space-y-3">
                  {[
                    "Cold blue-grey tones or high-saturation neons",
                    "Sharp right-angle corners or hard geometric frames",
                    "Tech, industrial, or corporate visual language",
                    "Fast snappy transitions — keep duration 500-700ms",
                    "Sans-serif-only typography in headings",
                    "Heavy drop shadows or harsh borders",
                    "Cluttered layouts — honour breathing space",
                  ].map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 font-serif text-sm text-[#8b7355]/70">
                      <span className="text-[#d4a0a0] flex-shrink-0 mt-0.5">x</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* INTERACTION PHYSICS DEMO */}
      <section className="py-24 px-6 bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-14">
            <p className="font-serif text-xs tracking-[0.3em] text-[#8b7355]/50 uppercase mb-3">Interaction Physics</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#5a8f5a] mb-4">Handmade Imperfection</h2>
            <p className="font-serif italic text-[#8b7355]/60 max-w-xl mx-auto">
              Nothing in the cottage is machine-perfect. A slight lean, a gentle bounce — digital rendered as handmade.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            <RevealBlock>
              <div className="bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 p-7 text-center">
                <div className="flex justify-center mb-5">
                  <FlowerSvg className="w-16 h-16 sway" />
                </div>
                <p className="font-serif text-sm text-[#5a8f5a] mb-2">Botanical Sway</p>
                <p className="font-serif italic text-xs text-[#8b7355]/50 leading-relaxed">
                  Decorative elements sway gently with a slow CSS keyframe animation, like wildflowers in a breeze.
                </p>
                <p className="font-serif text-xs text-[#8b7355]/30 mt-3">group-hover:rotate-6 duration-500</p>
              </div>
            </RevealBlock>

            <RevealBlock delay={80}>
              <div className="bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 p-7 text-center">
                <div className="flex justify-center mb-5">
                  <button className="px-6 py-3 bg-[#5a8f5a] text-[#faf6f0] font-serif rounded-full shadow-[0_4px_10px_rgba(90,143,90,0.2)] hover:shadow-[0_8px_20px_rgba(90,143,90,0.3)] hover:-translate-y-0.5 hover:rotate-[0.8deg] active:scale-[0.97] active:rotate-0 transition-all duration-500 text-sm">
                    Hover Me
                  </button>
                </div>
                <p className="font-serif text-sm text-[#5a8f5a] mb-2">Handmade Imperfection</p>
                <p className="font-serif italic text-xs text-[#8b7355]/50 leading-relaxed">
                  Hover lifts and leans the button slightly. Nothing is perfectly straight in the cottage kitchen.
                </p>
                <p className="font-serif text-xs text-[#8b7355]/30 mt-3">hover:rotate-[0.8deg] hover:-translate-y-0.5</p>
              </div>
            </RevealBlock>

            <RevealBlock delay={160}>
              <div className="bg-[#faf6f0] rounded-3xl border border-[#d4a0a0]/40 p-7 text-center">
                <div className="flex justify-center mb-5">
                  <button className="px-6 py-3 bg-[#d4a0a0] text-[#faf6f0] font-serif rounded-full shadow-[0_4px_10px_rgba(212,160,160,0.2)] hover:-translate-y-0.5 active:scale-[0.97] active:rotate-0 transition-all duration-500 text-sm">
                    Press Me
                  </button>
                </div>
                <p className="font-serif text-sm text-[#5a8f5a] mb-2">Soft Cushion Press</p>
                <p className="font-serif italic text-xs text-[#8b7355]/50 leading-relaxed">
                  Clicking feels like pressing into a soft feather cushion — a gentle give, then recovery.
                </p>
                <p className="font-serif text-xs text-[#8b7355]/30 mt-3">active:scale-[0.97] active:rotate-0</p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6 bg-[#faf6f0] border-t border-[#d4a0a0]/30">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <FlowerSvg className="w-8 h-8 opacity-50" />
              <span className="font-serif text-[#8b7355]/60 italic text-sm">
                StyleKit — Cottagecore Showcase
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[#d4a0a0]/50 text-xs select-none">&#10047;</span>
              <Link
                href="/styles/cottagecore"
                className="font-serif text-sm text-[#8b7355]/50 hover:text-[#5a8f5a] transition-colors duration-500 italic"
              >
                View full documentation
              </Link>
              <span className="text-[#d4a0a0]/50 text-xs select-none">&#10047;</span>
              <Link
                href="/styles"
                className="font-serif text-sm text-[#8b7355]/50 hover:text-[#5a8f5a] transition-colors duration-500 italic"
              >
                All styles
              </Link>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-[#d4a0a0]/20 flex items-center justify-center gap-4">
            <DaisySvg className="w-6 h-6 opacity-30" />
            <p className="font-serif italic text-xs text-[#8b7355]/30">
              Where the digital world slows down and wildflowers grow through the cracks.
            </p>
            <LeafSvg className="w-5 h-6 opacity-30" />
          </div>
        </div>
      </footer>
    </div>
  );
}
