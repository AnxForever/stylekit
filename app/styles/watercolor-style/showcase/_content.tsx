"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const galleryItems = [
  { title: "Morning Mist", category: "Landscape", desc: "Soft blues and greens blending into warm dawn tones.", color: "#4a6fa5" },
  { title: "Peach Blossom", category: "Botanical", desc: "Warm peach washes on textured paper, capturing spring.", color: "#e8a87c" },
  { title: "Ocean Depths", category: "Abstract", desc: "Layered teal and blue washes creating liquid depth.", color: "#85cdca" },
  { title: "Rose Garden", category: "Floral", desc: "Delicate rose pigments bleeding into cream paper.", color: "#c38d94" },
];

const principles = [
  { title: "Flow", desc: "Colors flow like water on paper, with natural gradients and organic edges. Nothing is forced or mechanical.", icon: "flow" },
  { title: "Soft Edges", desc: "No hard boundaries. Everything transitions gently, like pigment meeting wet paper.", icon: "soft" },
  { title: "Paper Texture", desc: "A warm, cream-toned base that evokes the feeling of watercolor paper beneath your fingers.", icon: "paper" },
  { title: "Transparency", desc: "Colors layer with semi-transparency, creating depth through overlap rather than opacity.", icon: "layer" },
];

const paletteColors = [
  { name: "Blue Gray", value: "#4a6fa5", text: "text-white", desc: "Primary text and accents" },
  { name: "Paper", value: "#faf8f5", text: "text-[#4a6fa5]", desc: "Base background" },
  { name: "Peach", value: "#e8a87c", text: "text-white", desc: "Warm accent wash" },
  { name: "Teal", value: "#85cdca", text: "text-white", desc: "Cool accent wash" },
  { name: "Rose", value: "#c38d94", text: "text-white", desc: "Floral accent" },
  { name: "Sand", value: "#d4a373", text: "text-white", desc: "Earth tone accent" },
];

const doRules = [
  "Use soft gradients bg-gradient-to-* to simulate watercolor blending",
  "Use semi-transparent colors with opacity or rgba",
  "Use large border-radius: rounded-3xl or rounded-full",
  "Use warm paper-tone background: bg-[#faf8f5]",
  "Use serif italic typography for artistic feel",
  "Use blur-3xl color blobs for watercolor wash effects",
];

const dontRules = [
  "Never use hard borders like border-4 border-black",
  "Never use hard-edge box shadows",
  "Never use pure black backgrounds",
  "Never use sharp corners rounded-none",
  "Never use oversaturated or harsh colors",
  "Never use bold sans-serif uppercase text",
];

/* ------------------------------------------------------------------ */
/*  Inline hooks & components                                          */
/* ------------------------------------------------------------------ */

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function RevealBlock({ children, className = "", delay = 0 }: {
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
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function WatercolorBlob({ color, className = "" }: { color: string; className?: string }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={{ backgroundColor: `${color}20` }}
    />
  );
}

function GalleryCard({ item, index }: { item: typeof galleryItems[number]; index: number }) {
  return (
    <RevealBlock delay={index * 0.1}>
      <div className="group cursor-pointer">
        <div
          className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-4"
          style={{
            background: `
              radial-gradient(ellipse at ${30 + index * 15}% ${40 + index * 10}%, ${item.color}30 0%, transparent 60%),
              radial-gradient(ellipse at ${60 - index * 10}% ${70 - index * 5}%, #faf8f5 0%, transparent 70%),
              linear-gradient(135deg, ${item.color}15, #faf8f5, ${item.color}10)
            `,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
          <div
            className="absolute w-32 h-32 rounded-full blur-2xl group-hover:blur-xl transition-all duration-700"
            style={{
              backgroundColor: `${item.color}25`,
              top: "20%",
              left: "15%",
            }}
          />
          <div
            className="absolute w-40 h-40 rounded-full blur-2xl group-hover:blur-xl transition-all duration-700"
            style={{
              backgroundColor: `${item.color}15`,
              bottom: "25%",
              right: "10%",
            }}
          />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-xs font-serif italic text-[#4a6fa5]/60 tracking-wider">{item.category}</span>
          </div>
        </div>
        <h3 className="text-xl font-serif italic text-[#4a6fa5] mb-1 group-hover:text-[#4a6fa5]/80 transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-sm text-[#4a6fa5]/50 font-serif">{item.desc}</p>
      </div>
    </RevealBlock>
  );
}

function PrincipleCard({ item, index }: { item: typeof principles[number]; index: number }) {
  const iconPaths: Record<string, string> = {
    flow: "M3 12c3-6 6 6 9 0s6 6 9 0",
    soft: "M12 3c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9z",
    paper: "M4 4h16v16H4V4zm2 2v12h12V6H6z",
    layer: "M2 12l10-6 10 6-10 6-10-6zm0 4l10 6 10-6",
  };
  return (
    <RevealBlock delay={index * 0.1}>
      <div
        className="relative p-8 rounded-3xl overflow-hidden group cursor-pointer"
        style={{
          background: `linear-gradient(135deg, ${paletteColors[index + 2]?.value || "#e8a87c"}12, white, ${paletteColors[index + 2]?.value || "#85cdca"}08)`,
        }}
      >
        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" style={{ backgroundColor: paletteColors[index + 2]?.value || "#e8a87c" }} />
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4a6fa5" strokeWidth="1.5" className="mb-4 opacity-60">
          <path d={iconPaths[item.icon]} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="text-lg font-serif italic text-[#4a6fa5] mb-2">{item.title}</h3>
        <p className="text-sm text-[#4a6fa5]/60 font-serif leading-relaxed">{item.desc}</p>
      </div>
    </RevealBlock>
  );
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"buttons" | "cards" | "inputs" | "washes">("buttons");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const tabs = ["buttons", "cards", "inputs", "washes"] as const;

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#4a6fa5]">
      <style>{`
        @keyframes wc-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.03); }
        }
      `}</style>

      {/* ===== Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#faf8f5] via-[#e8a87c]/5 to-[#85cdca]/5 backdrop-blur-sm border-b border-[#4a6fa5]/[0.08]">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16">
            <Link href="/styles/watercolor-style/showcase" className="font-serif text-lg italic text-[#4a6fa5]">
              Aquarelle
            </Link>
            <nav className="flex items-center gap-6">
              <Link href="/styles/watercolor-style" className="font-serif text-sm text-[#4a6fa5]/50 hover:text-[#4a6fa5] transition-colors duration-300">
                Docs
              </Link>
              <Link href="/styles" className="font-serif text-sm text-[#4a6fa5]/50 hover:text-[#4a6fa5] transition-colors duration-300">
                Styles
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <WatercolorBlob color="#e8a87c" className="w-72 h-72 top-16 left-[5%]" />
        <WatercolorBlob color="#85cdca" className="w-96 h-96 bottom-16 right-[5%]" />
        <WatercolorBlob color="#c38d94" className="w-80 h-80 top-1/3 left-1/2 -translate-x-1/2" />
        <WatercolorBlob color="#4a6fa5" className="w-64 h-64 bottom-1/4 left-[20%]" />
        <WatercolorBlob color="#d4a373" className="w-56 h-56 top-[20%] right-[15%]" />

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 text-center max-w-3xl">
          <p
            className="text-sm font-serif italic text-[#4a6fa5]/50 tracking-wider mb-6"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            Where colors dance and flow freely
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-serif italic leading-[1.1] mb-6"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <span className="text-[#4a6fa5]">Watercolor</span>
            <br />
            <span
              className="inline-block"
              style={{
                background: "linear-gradient(135deg, #e8a87c, #85cdca, #c38d94)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Style.
            </span>
          </h1>
          <p
            className="text-lg md:text-xl font-serif text-[#4a6fa5]/60 max-w-xl mx-auto mb-10"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            Soft color washes, organic edges, and paper textures that bring digital interfaces to life with artistic warmth.
          </p>
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s",
            }}
          >
            <button className="px-10 py-4 bg-gradient-to-r from-[#4a6fa5]/80 to-[#85cdca]/80 rounded-full text-white font-serif text-lg shadow-lg shadow-[#4a6fa5]/20 hover:shadow-xl hover:shadow-[#4a6fa5]/30 hover:-translate-y-0.5 transition-all duration-300">
              Begin Painting
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {["#e8a87c", "#85cdca", "#c38d94", "#d4a373", "#4a6fa5"].map((c, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full opacity-40"
              style={{
                backgroundColor: c,
                animation: `wc-float 3s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </div>
      </section>

      {/* ===== Principles ===== */}
      <section className="py-24 md:py-40 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif italic mb-4">
            Core <span className="text-[#4a6fa5]/40">Principles</span>
          </h2>
          <p className="text-sm font-serif text-[#4a6fa5]/50 max-w-md mx-auto">
            The essence of watercolor translated into digital design language.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((p, i) => (
            <PrincipleCard key={p.title} item={p} index={i} />
          ))}
        </div>
      </section>

      {/* ===== Gallery ===== */}
      <section className="py-24 md:py-40 px-6 md:px-12 max-w-6xl mx-auto relative">
        <WatercolorBlob color="#e8a87c" className="w-64 h-64 -top-12 -left-12" />
        <WatercolorBlob color="#85cdca" className="w-48 h-48 bottom-0 -right-8" />

        <RevealBlock className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif italic mb-4">
            Gallery of <span className="text-[#4a6fa5]/40">Washes</span>
          </h2>
          <p className="text-sm font-serif text-[#4a6fa5]/50 max-w-md">
            Each piece demonstrates the layered, transparent qualities of watercolor design.
          </p>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {galleryItems.map((item, i) => (
            <GalleryCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ===== Component Demos (Tab-Switched) ===== */}
      <section className="py-24 md:py-40 px-6 md:px-12 relative">
        <WatercolorBlob color="#c38d94" className="w-80 h-80 top-20 right-0" />
        <div className="max-w-5xl mx-auto relative z-10">
          <RevealBlock className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif italic mb-4">
              Component <span className="text-[#4a6fa5]/40">Palette</span>
            </h2>
            <p className="text-sm font-serif text-[#4a6fa5]/50 max-w-md">
              UI elements rendered in watercolor aesthetic.
            </p>
          </RevealBlock>

          {/* Tabs */}
          <div className="flex gap-2 mb-12 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full text-sm font-serif capitalize transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-[#4a6fa5]/80 to-[#85cdca]/80 text-white shadow-lg shadow-[#4a6fa5]/15"
                    : "bg-white/60 text-[#4a6fa5]/60 hover:bg-white/80 border border-[#4a6fa5]/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[350px]">
            {activeTab === "buttons" && (
              <RevealBlock>
                <div
                  className="p-10 rounded-3xl"
                  style={{
                    background: "radial-gradient(ellipse at 20% 50%, #e8a87c15 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, #85cdca12 0%, transparent 50%), #faf8f5",
                  }}
                >
                  <p className="text-sm font-serif italic text-[#4a6fa5]/50 mb-8">Button variations</p>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-8 py-4 bg-gradient-to-r from-[#4a6fa5]/80 to-[#85cdca]/80 rounded-full text-white font-serif shadow-lg shadow-[#4a6fa5]/20 hover:shadow-xl hover:shadow-[#4a6fa5]/30 hover:-translate-y-0.5 transition-all duration-300">
                      Primary
                    </button>
                    <button className="px-8 py-4 bg-white/60 rounded-full text-[#4a6fa5] font-serif border border-[#4a6fa5]/20 shadow-lg shadow-[#4a6fa5]/5 hover:bg-white/80 hover:-translate-y-0.5 transition-all duration-300">
                      Secondary
                    </button>
                    <button className="px-8 py-4 bg-gradient-to-r from-[#e8a87c]/70 to-[#d4a373]/70 rounded-full text-white font-serif shadow-lg shadow-[#e8a87c]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                      Warm Accent
                    </button>
                    <button className="px-8 py-4 bg-gradient-to-r from-[#c38d94]/70 to-[#e8a87c]/70 rounded-full text-white font-serif shadow-lg shadow-[#c38d94]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                      Rose
                    </button>
                  </div>
                </div>
              </RevealBlock>
            )}

            {activeTab === "cards" && (
              <RevealBlock>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 bg-gradient-to-br from-[#e8a87c]/15 via-white to-[#85cdca]/15 rounded-3xl shadow-lg shadow-[#4a6fa5]/5 border border-[#4a6fa5]/5 backdrop-blur-sm group cursor-pointer hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-serif italic text-[#4a6fa5] mb-3">Peach and Teal</h3>
                    <p className="text-[#4a6fa5]/60 font-serif text-sm leading-relaxed mb-4">
                      Warm and cool colors layered with transparency, creating gentle depth and movement.
                    </p>
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#e8a87c]/40 blur-[1px]" />
                      <div className="w-6 h-6 rounded-full bg-[#85cdca]/40 blur-[1px]" />
                    </div>
                  </div>
                  <div className="p-8 bg-gradient-to-br from-[#c38d94]/15 via-white to-[#d4a373]/15 rounded-3xl shadow-lg shadow-[#4a6fa5]/5 border border-[#4a6fa5]/5 backdrop-blur-sm group cursor-pointer hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl font-serif italic text-[#4a6fa5] mb-3">Rose and Sand</h3>
                    <p className="text-[#4a6fa5]/60 font-serif text-sm leading-relaxed mb-4">
                      Earth tones blending softly into floral hues, evoking a garden in watercolor.
                    </p>
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#c38d94]/40 blur-[1px]" />
                      <div className="w-6 h-6 rounded-full bg-[#d4a373]/40 blur-[1px]" />
                    </div>
                  </div>
                  <div className="md:col-span-2 p-8 bg-gradient-to-r from-[#4a6fa5]/10 via-white to-[#85cdca]/10 rounded-3xl shadow-lg shadow-[#4a6fa5]/5 border border-[#4a6fa5]/5 backdrop-blur-sm">
                    <h3 className="text-xl font-serif italic text-[#4a6fa5] mb-3">Full Wash</h3>
                    <p className="text-[#4a6fa5]/60 font-serif text-sm leading-relaxed">
                      A wider card demonstrating how watercolor aesthetics scale across larger surfaces. The gradient wash feels like a single brushstroke across the canvas.
                    </p>
                  </div>
                </div>
              </RevealBlock>
            )}

            {activeTab === "inputs" && (
              <RevealBlock>
                <div
                  className="p-10 rounded-3xl space-y-8"
                  style={{
                    background: "radial-gradient(ellipse at 70% 20%, #85cdca10 0%, transparent 50%), radial-gradient(ellipse at 30% 80%, #e8a87c10 0%, transparent 50%), white",
                  }}
                >
                  <p className="text-sm font-serif italic text-[#4a6fa5]/50 mb-4">Form elements</p>
                  <div>
                    <label className="block text-sm font-serif italic text-[#4a6fa5]/60 mb-2">Your Name</label>
                    <input
                      type="text"
                      placeholder="Write here..."
                      className="w-full px-5 py-4 bg-white/60 border border-[#4a6fa5]/15 rounded-2xl text-[#4a6fa5] placeholder-[#4a6fa5]/30 font-serif focus:outline-none focus:border-[#4a6fa5]/30 focus:bg-white/80 focus:shadow-lg focus:shadow-[#4a6fa5]/5 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-serif italic text-[#4a6fa5]/60 mb-2">Email Address</label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-5 py-4 bg-white/60 border border-[#4a6fa5]/15 rounded-2xl text-[#4a6fa5] placeholder-[#4a6fa5]/30 font-serif focus:outline-none focus:border-[#4a6fa5]/30 focus:bg-white/80 focus:shadow-lg focus:shadow-[#4a6fa5]/5 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-serif italic text-[#4a6fa5]/60 mb-2">Your Message</label>
                    <textarea
                      rows={4}
                      placeholder="Let your words flow..."
                      className="w-full px-5 py-4 bg-white/60 border border-[#4a6fa5]/15 rounded-2xl text-[#4a6fa5] placeholder-[#4a6fa5]/30 font-serif focus:outline-none focus:border-[#4a6fa5]/30 focus:bg-white/80 focus:shadow-lg focus:shadow-[#4a6fa5]/5 transition-all duration-300 resize-none"
                    />
                  </div>
                </div>
              </RevealBlock>
            )}

            {activeTab === "washes" && (
              <RevealBlock>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="aspect-square rounded-3xl overflow-hidden relative">
                    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 40%, #e8a87c30 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, #85cdca25 0%, transparent 50%), #faf8f5" }} />
                    <div className="absolute inset-0 flex items-end p-6">
                      <p className="text-sm font-serif italic text-[#4a6fa5]/60">Warm + Cool Wash</p>
                    </div>
                  </div>
                  <div className="aspect-square rounded-3xl overflow-hidden relative">
                    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 30%, #c38d9435 0%, transparent 60%), radial-gradient(ellipse at 40% 80%, #d4a37320 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, #e8a87c15 0%, transparent 60%), #faf8f5" }} />
                    <div className="absolute inset-0 flex items-end p-6">
                      <p className="text-sm font-serif italic text-[#4a6fa5]/60">Triple Bloom</p>
                    </div>
                  </div>
                  <div className="aspect-square rounded-3xl overflow-hidden relative">
                    <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 30%, #4a6fa520 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, #4a6fa515 0%, transparent 50%), linear-gradient(180deg, #faf8f5, #4a6fa508)" }} />
                    <div className="absolute inset-0 flex items-end p-6">
                      <p className="text-sm font-serif italic text-[#4a6fa5]/60">Monochrome Wash</p>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            )}
          </div>
        </div>
      </section>

      {/* ===== Color Palette ===== */}
      <section className="py-24 md:py-40 px-6 md:px-12 relative">
        <WatercolorBlob color="#d4a373" className="w-64 h-64 top-10 left-0" />
        <div className="max-w-5xl mx-auto relative z-10">
          <RevealBlock className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif italic mb-4">
              Color <span className="text-[#4a6fa5]/40">Palette</span>
            </h2>
            <p className="text-sm font-serif text-[#4a6fa5]/50 max-w-md">
              Semi-transparent washes on warm paper. Always use these colors at reduced opacity for the watercolor effect.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {paletteColors.map((c, i) => (
              <RevealBlock key={c.name} delay={i * 0.06}>
                <div className="group cursor-pointer">
                  <div
                    className={`aspect-[3/2] rounded-2xl flex flex-col items-start justify-end p-4 shadow-lg shadow-[#4a6fa5]/5 ${c.text}`}
                    style={{ backgroundColor: c.value }}
                  >
                    <p className="text-sm font-serif italic">{c.name}</p>
                    <p className="text-xs opacity-60 font-mono">{c.value}</p>
                  </div>
                  <p className="text-xs font-serif text-[#4a6fa5]/40 mt-2">{c.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Design Rules ===== */}
      <section className="py-24 md:py-40 px-6 md:px-12 max-w-5xl mx-auto">
        <RevealBlock className="mb-16">
          <h2 className="text-4xl md:text-5xl font-serif italic mb-4">
            Design <span className="text-[#4a6fa5]/40">Rules</span>
          </h2>
        </RevealBlock>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <RevealBlock>
            <div className="p-6 bg-gradient-to-br from-[#85cdca]/10 via-white to-transparent rounded-3xl mb-4">
              <span className="text-sm font-serif italic text-[#85cdca]">Do</span>
            </div>
            <ul className="space-y-4">
              {doRules.map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4a6fa5]/70 font-serif">
                  <span className="mt-1 w-2 h-2 rounded-full bg-[#85cdca]/60 flex-shrink-0 blur-[0.5px]" />
                  {rule}
                </li>
              ))}
            </ul>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div className="p-6 bg-gradient-to-br from-[#c38d94]/10 via-white to-transparent rounded-3xl mb-4">
              <span className="text-sm font-serif italic text-[#c38d94]">Don&apos;t</span>
            </div>
            <ul className="space-y-4">
              {dontRules.map((rule, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[#4a6fa5]/70 font-serif">
                  <span className="mt-1 w-2 h-2 rounded-full bg-[#c38d94]/60 flex-shrink-0 blur-[0.5px]" />
                  {rule}
                </li>
              ))}
            </ul>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-[#4a6fa5]/[0.08]">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-8 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs font-serif text-[#4a6fa5]/40">
              StyleKit &middot; Watercolor Style Showcase
            </p>
            <Link href="/styles/watercolor-style" className="text-xs font-serif text-[#4a6fa5]/50 hover:text-[#4a6fa5] transition-colors duration-300">
              View Full Documentation &rarr;
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
