"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Check, X, AlertTriangle, Info } from "lucide-react";

function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.15, ...options });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, inView };
}

function RevealBlock({ children, delay = 0, inView }: { children: React.ReactNode; delay?: number; inView: boolean }) {
  return (
    <div style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeVariant, setActiveVariant] = useState<"Cathedral" | "Manuscript">("Cathedral");
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const { ref: componentsRef, inView: componentsInView } = useInView();
  const { ref: philosophyRef, inView: philosophyInView } = useInView();
  const { ref: paletteRef, inView: paletteInView } = useInView();
  const { ref: typographyRef, inView: typographyInView } = useInView();
  const { ref: formsRef, inView: formsInView } = useInView();
  const { ref: rulesRef, inView: rulesInView } = useInView();

  const cathedralCards = [
    {
      title: "The Nave",
      latin: "Navis Cathedralis",
      desc: "The central passage where pilgrims gather beneath soaring vaulted ceilings of stone and shadow, drawn toward the altar by divine geometry.",
      accent: "#8b1a1a",
    },
    {
      title: "Rose Window",
      latin: "Fenestra Rosae",
      desc: "Stained glass petals radiate outward from a sacred center, flooding the interior with colored divine light at each turning of the sun.",
      accent: "#c9a227",
    },
    {
      title: "The Cloister",
      latin: "Claustrum Sanctum",
      desc: "Silent arcaded corridors where contemplation deepens and footsteps echo against ancient stone worn smooth by centuries of devotion.",
      accent: "#4a2d6e",
    },
  ];

  const manuscriptCards = [
    {
      title: "Illumination",
      latin: "Illuminatio Divina",
      desc: "Gold leaf catches candlelight as the scribe's brush traces intricate borders around sacred text, preserving wisdom for eternity.",
      accent: "#c9a227",
    },
    {
      title: "Bestiary",
      latin: "Liber Bestiarum",
      desc: "Fantastical creatures fill the margins — dragons, griffins, and chimeras — watching over the sacred words with eternal vigilance.",
      accent: "#8b1a1a",
    },
    {
      title: "Psalter",
      latin: "Psalterium Regium",
      desc: "Royal psalms transcribed by candlelight, each letter a devotion, each page a testament to the enduring power of the written word.",
      accent: "#4a2d6e",
    },
  ];

  const displayCards = activeVariant === "Cathedral" ? cathedralCards : manuscriptCards;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#c9a227]">

      {/* Navigation */}
      <header className="bg-[#0a0a0a] border-b border-[#c9a227]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link
              href="/styles/gothic/showcase"
              className="font-serif text-lg md:text-xl tracking-widest uppercase text-[#c9a227] hover:text-[#c9a227]/80 transition-colors"
            >
              GOTHIC
            </Link>
            <nav className="flex items-center gap-8">
              <Link
                href="/styles/gothic"
                className="text-sm tracking-wider text-[#c9a227]/50 hover:text-[#c9a227] transition-colors font-serif"
              >
                Docs
              </Link>
              <Link
                href="/styles"
                className="text-sm tracking-wider text-[#c9a227]/50 hover:text-[#c9a227] transition-colors font-serif"
              >
                StyleKit
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#2d1b4e] to-[#0a0a0a] min-h-[90vh] flex items-center justify-center">
        {/* Radial gold glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 30%, #c9a227 0%, transparent 60%)",
            opacity: 0.06,
          }}
        />
        {/* Decorative pointed arch frame */}
        <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none">
          <div
            className="w-64 h-32 border-x border-t border-[#c9a227]/15"
            style={{ clipPath: "polygon(0 100%, 0 40%, 50% 0, 100% 40%, 100% 100%)" }}
          />
        </div>
        {/* Vertical gold line top */}
        <div className="absolute top-0 left-1/2 -translate-x-px w-px h-16 bg-gradient-to-b from-transparent via-[#c9a227]/40 to-transparent" />
        {/* Vertical gold line bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-px w-px h-16 bg-gradient-to-t from-transparent via-[#c9a227]/40 to-transparent" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/50 font-serif mb-6">
              哥特式风格 · Stilus Gothicus
            </p>
          </div>

          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            <h1
              className="font-serif text-6xl md:text-8xl lg:text-9xl tracking-wider uppercase mb-6"
              style={{
                color: "#c9a227",
                textShadow: "0 0 60px rgba(201,162,39,0.35), 0 0 120px rgba(201,162,39,0.15)",
              }}
            >
              GOTHIC
            </h1>
          </div>

          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            {/* Gold divider */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a227]/50" />
              <span className="text-[#c9a227]/40 font-serif text-sm">†</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a227]/50" />
            </div>
            <p className="font-serif italic text-lg md:text-xl text-[#c9a227]/60 tracking-wider max-w-2xl mx-auto mb-10">
              In tenebris et umbra, pulchritudo latet.
              <span className="block text-sm mt-2 text-[#c9a227]/40 not-italic tracking-widest">
                In darkness and shadow, beauty lies hidden.
              </span>
            </p>
          </div>

          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.55s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.55s",
            }}
          >
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="px-8 py-3 border border-[#c9a227]/60 text-[#c9a227] font-serif text-sm tracking-widest uppercase hover:bg-[#c9a227]/10 hover:shadow-[0_6px_24px_rgba(201,162,39,0.4)] transition-all duration-300">
                Enter the Cathedral
              </button>
              <button className="px-8 py-3 bg-[#8b1a1a] text-[#c9a227] font-serif text-sm tracking-widest uppercase hover:bg-[#8b1a1a]/80 hover:shadow-[0_6px_24px_rgba(139,26,26,0.5)] transition-all duration-300">
                Explore the Crypt
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Components Demo — Cathedral vs Manuscript Toggle */}
      <section className="py-20 md:py-28 px-6" ref={componentsRef}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock inView={componentsInView} delay={0}>
            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-3 text-center">
              Component Gallery
            </p>
            <h2 className="font-serif text-3xl md:text-5xl tracking-wider uppercase text-[#c9a227] text-center mb-4"
              style={{ textShadow: "0 0 30px rgba(201,162,39,0.2)" }}>
              Sacred Forms
            </h2>
            <div className="flex items-center justify-center gap-3 mb-12">
              <div className="h-px w-12 bg-[#c9a227]/30" />
              <span className="font-serif text-xs text-[#c9a227]/30 italic tracking-wider">elementa designi</span>
              <div className="h-px w-12 bg-[#c9a227]/30" />
            </div>
          </RevealBlock>

          {/* Variant toggle */}
          <RevealBlock inView={componentsInView} delay={0.1}>
            <div className="flex justify-center mb-12">
              <div className="border border-[#c9a227]/30 flex">
                {(["Cathedral", "Manuscript"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setActiveVariant(v)}
                    className={`px-8 py-3 font-serif text-sm tracking-widest uppercase transition-all duration-300 ${
                      activeVariant === v
                        ? "bg-[#c9a227]/15 text-[#c9a227] border-[#c9a227]/50"
                        : "text-[#c9a227]/40 hover:text-[#c9a227]/70"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* Cards */}
          <RevealBlock inView={componentsInView} delay={0.2}>
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {displayCards.map((card, i) => (
                <div
                  key={card.title}
                  className="group relative bg-[#0d0d0d] border border-[#c9a227]/20 overflow-hidden cursor-pointer hover:border-[#c9a227]/60 hover:shadow-[0_8px_30px_rgba(45,27,78,0.5)] transition-all duration-300"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  {/* Candlelight hover effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at top right, ${card.accent}26, transparent 60%)`,
                    }}
                  />
                  {/* Top gold bar */}
                  <div className="h-px w-full" style={{ background: `linear-gradient(to right, transparent, ${card.accent}80, transparent)` }} />
                  <div className="p-7">
                    <p className="font-serif text-xs italic tracking-wider mb-2" style={{ color: `${card.accent}80` }}>
                      {card.latin}
                    </p>
                    <h3
                      className="font-serif text-xl tracking-wider uppercase mb-4 transition-colors duration-300"
                      style={{ color: card.accent }}
                    >
                      {card.title}
                    </h3>
                    {/* Expanding gold underline */}
                    <div
                      className="h-px w-8 group-hover:w-full mb-4 transition-all duration-700"
                      style={{ background: `${card.accent}60` }}
                    />
                    <p className="text-sm text-[#c9a227]/50 leading-relaxed font-serif italic">
                      {card.desc}
                    </p>
                  </div>
                  {/* Bottom arch decoration */}
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-l border-t opacity-20" style={{ borderColor: card.accent }} />
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Button variants */}
          <RevealBlock inView={componentsInView} delay={0.3}>
            <div className="bg-[#0d0d0d] border border-[#c9a227]/20 p-8 mb-8">
              <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-6">
                Button Variants
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-7 py-3 border border-[#c9a227]/60 text-[#c9a227] font-serif text-sm tracking-widest uppercase hover:bg-[#c9a227]/10 hover:shadow-[0_6px_24px_rgba(201,162,39,0.4)] transition-all duration-300">
                  Gold Outline
                </button>
                <button className="px-7 py-3 bg-[#8b1a1a] text-[#c9a227] font-serif text-sm tracking-widest uppercase hover:bg-[#8b1a1a]/80 hover:shadow-[0_6px_24px_rgba(139,26,26,0.5)] transition-all duration-300">
                  Blood Red
                </button>
                <button className="px-7 py-3 bg-[#2d1b4e] text-[#c9a227] font-serif text-sm tracking-widest uppercase hover:bg-[#4a2d6e] hover:shadow-[0_6px_24px_rgba(45,27,78,0.5)] transition-all duration-300">
                  Deep Purple
                </button>
                <button className="px-7 py-3 bg-[#c9a227] text-[#0a0a0a] font-serif text-sm tracking-widest uppercase hover:bg-[#c9a227]/90 hover:shadow-[0_6px_24px_rgba(201,162,39,0.5)] transition-all duration-300">
                  Sacred Gold
                </button>
                <button
                  className="px-7 py-3 font-serif text-sm tracking-widest uppercase cursor-not-allowed"
                  style={{ color: "#c9a227", opacity: 0.25, border: "1px solid currentColor" }}
                  disabled
                >
                  Forbidden
                </button>
              </div>
            </div>
          </RevealBlock>

          {/* Gothic input */}
          <RevealBlock inView={componentsInView} delay={0.4}>
            <div className="bg-[#0d0d0d] border border-[#c9a227]/20 p-8">
              <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-6">
                Sacred Form
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs tracking-[0.3em] uppercase text-[#c9a227]/50 font-serif mb-2">
                    Name of the Penitent
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name..."
                    className="w-full px-4 py-3 bg-transparent border border-[#c9a227]/30 text-[#c9a227]/80 font-serif text-sm tracking-wider placeholder:text-[#c9a227]/20 focus:outline-none focus:border-[#c9a227]/60 focus:shadow-[0_0_12px_rgba(201,162,39,0.15)] transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-[0.3em] uppercase text-[#c9a227]/50 font-serif mb-2">
                    Sacred Epistle
                  </label>
                  <input
                    type="email"
                    placeholder="your@epistula.com"
                    className="w-full px-4 py-3 bg-transparent border border-[#c9a227]/30 text-[#c9a227]/80 font-serif text-sm tracking-wider placeholder:text-[#c9a227]/20 focus:outline-none focus:border-[#c9a227]/60 focus:shadow-[0_0_12px_rgba(201,162,39,0.15)] transition-all duration-300"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs tracking-[0.3em] uppercase text-[#c9a227]/50 font-serif mb-2">
                    Your Confession
                  </label>
                  <textarea
                    placeholder="Speak your words into the void..."
                    rows={3}
                    className="w-full px-4 py-3 bg-transparent border border-[#c9a227]/30 text-[#c9a227]/80 font-serif text-sm tracking-wider placeholder:text-[#c9a227]/20 focus:outline-none focus:border-[#c9a227]/60 focus:shadow-[0_0_12px_rgba(201,162,39,0.15)] transition-all duration-300 resize-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <button className="px-8 py-3 bg-[#8b1a1a] text-[#c9a227] font-serif text-sm tracking-widest uppercase hover:bg-[#8b1a1a]/80 hover:shadow-[0_6px_24px_rgba(139,26,26,0.5)] transition-all duration-300">
                    Submit Petition
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Design Philosophy — Cathedral Architecture */}
      <section className="bg-[#0a0a0a] py-20 md:py-28 px-6 border-t border-[#c9a227]/10" ref={philosophyRef}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock inView={philosophyInView} delay={0}>
            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-3 text-center">
              Philosophia Designi
            </p>
            <h2 className="font-serif text-3xl md:text-5xl tracking-wider uppercase text-[#c9a227] text-center mb-12"
              style={{ textShadow: "0 0 30px rgba(201,162,39,0.2)" }}>
              Cathedral Architecture
            </h2>
          </RevealBlock>

          {/* Tab navigation */}
          <RevealBlock inView={philosophyInView} delay={0.1}>
            <div className="border border-[#c9a227]/20 mb-0">
              <div className="flex border-b border-[#c9a227]/20">
                {["Structure", "Light", "Ornament"].map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className={`flex-1 py-4 font-serif text-xs tracking-[0.3em] uppercase transition-all duration-300 ${
                      activeTab === i
                        ? "bg-[#c9a227]/10 text-[#c9a227] border-b-2 border-[#c9a227]/60 -mb-px"
                        : "text-[#c9a227]/30 hover:text-[#c9a227]/60"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-8 md:p-12 bg-[#0d0d0d] min-h-[200px]">
                {activeTab === 0 && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-serif text-xl text-[#c9a227] tracking-wider uppercase mb-4">
                        Pointed Arch Principle
                      </h3>
                      <p className="font-serif italic text-[#c9a227]/60 leading-relaxed text-sm mb-4">
                        The pointed arch redirects weight outward and downward, allowing walls to soar higher than was ever possible in the Romanesque tradition. This structural revelation became the defining form of the Gothic aesthetic.
                      </p>
                      <p className="font-serif italic text-[#c9a227]/40 text-sm leading-relaxed">
                        In design: use vertical emphasis, sharp angles, and upward-reaching compositions. Never settle for horizontal sprawl when vertical aspiration is possible.
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      {/* Decorative pointed arch SVG */}
                      <div className="relative w-48 h-64 flex items-end justify-center">
                        <div
                          className="w-32 h-48 border-2 border-[#c9a227]/30"
                          style={{
                            clipPath: "polygon(0 100%, 0 35%, 50% 0, 100% 35%, 100% 100%)",
                          }}
                        />
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{ paddingTop: "40px" }}
                        >
                          <div
                            className="w-16 h-24 border border-[#c9a227]/20"
                            style={{
                              clipPath: "polygon(0 100%, 0 40%, 50% 0, 100% 40%, 100% 100%)",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 1 && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-serif text-xl text-[#c9a227] tracking-wider uppercase mb-4">
                        The Rose Window
                      </h3>
                      <p className="font-serif italic text-[#c9a227]/60 leading-relaxed text-sm mb-4">
                        Stained glass transformed stone walls into vessels of divine light. Each colored panel was chosen not for decoration, but to narrate scripture to an illiterate populace through the universal language of luminous color.
                      </p>
                      <p className="font-serif italic text-[#c9a227]/40 text-sm leading-relaxed">
                        In design: use gold accents as focal points of light against deep darkness. Let radial gradients suggest the rose window. Allow the dark to make the light sacred.
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      {/* Rose window representation */}
                      <div className="relative w-40 h-40 rounded-full border border-[#c9a227]/30 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full"
                          style={{ background: "radial-gradient(circle at center, rgba(201,162,39,0.15) 0%, transparent 70%)" }}
                        />
                        <div className="w-24 h-24 rounded-full border border-[#c9a227]/20 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-[#c9a227]/20 border border-[#c9a227]/40" />
                        </div>
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                          <div
                            key={deg}
                            className="absolute w-px h-16 bg-[#c9a227]/15 origin-bottom"
                            style={{ transform: `rotate(${deg}deg) translateX(-50%)`, bottom: "50%", left: "50%" }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 2 && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-serif text-xl text-[#c9a227] tracking-wider uppercase mb-4">
                        Sacred Ornamentation
                      </h3>
                      <p className="font-serif italic text-[#c9a227]/60 leading-relaxed text-sm mb-4">
                        Gothic ornament is never gratuitous. Gargoyles serve as waterspouts and spiritual guardians. Tracery carries water away from stone joints. Every decorative element has structural or symbolic purpose rooted in doctrine.
                      </p>
                      <p className="font-serif italic text-[#c9a227]/40 text-sm leading-relaxed">
                        In design: use gold borders and decorative lines as structural dividers. Every ornamental element should guide the eye or reinforce hierarchy — beauty and function as one.
                      </p>
                    </div>
                    <div className="flex flex-col gap-3">
                      {["Gold border lines as structural dividers", "Serif letterforms as sacred letterforms", "Dark ground as the void — light as revelation", "Latin mottos as gravitas anchors"].map((rule) => (
                        <div key={rule} className="flex items-start gap-3">
                          <span className="text-[#c9a227]/50 font-serif mt-0.5">†</span>
                          <span className="font-serif text-sm text-[#c9a227]/60 italic">{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </RevealBlock>

          {/* Accordion */}
          <RevealBlock inView={philosophyInView} delay={0.2}>
            <div className="mt-8 space-y-2">
              {[
                {
                  title: "Memento Mori — Remember You Must Die",
                  content: "Gothic aesthetics are rooted in the medieval preoccupation with mortality and the transience of earthly existence. Death was not morbid but instructive — a reminder that only the eternal matters. This solemn awareness gives Gothic design its gravity and weight.",
                },
                {
                  title: "Lux in Tenebris — Light in Darkness",
                  content: "The greatest achievement of Gothic architecture is the creation of sacred light within a structure of stone. The contrast between deep shadow and gold luminance mirrors the theological contrast between sin and grace, ignorance and revelation, mortality and transcendence.",
                },
                {
                  title: "Sub Specie Aeternitatis — Under the Aspect of Eternity",
                  content: "Gothic craftsmen built for eternity, not for fashion. Every stone was laid with the knowledge that the cathedral would outlast its builders by centuries. This permanence mindset demands that design choices be deliberate, studied, and worthy of endurance.",
                },
              ].map((item, i) => (
                <div key={i} className="border border-[#c9a227]/20 bg-[#0d0d0d]">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#c9a227]/5 transition-colors duration-200"
                  >
                    <span className="font-serif text-sm tracking-wider text-[#c9a227]/80">{item.title}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#c9a227]/50 transition-transform duration-300 flex-shrink-0 ml-4 ${openAccordion === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openAccordion === i && (
                    <div className="px-6 pb-5 border-t border-[#c9a227]/10">
                      <p className="font-serif italic text-sm text-[#c9a227]/50 leading-relaxed mt-4">
                        {item.content}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-20 md:py-28 px-6 border-t border-[#c9a227]/10" ref={paletteRef}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock inView={paletteInView} delay={0}>
            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-3 text-center">
              Chromata Sacra
            </p>
            <h2 className="font-serif text-3xl md:text-5xl tracking-wider uppercase text-[#c9a227] text-center mb-4"
              style={{ textShadow: "0 0 30px rgba(201,162,39,0.2)" }}>
              Color Palette
            </h2>
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px w-12 bg-[#c9a227]/30" />
              <span className="font-serif text-xs text-[#c9a227]/30 italic tracking-wider">colores tenebrarum</span>
              <div className="h-px w-12 bg-[#c9a227]/30" />
            </div>
          </RevealBlock>

          <RevealBlock inView={paletteInView} delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
              {[
                { name: "Deep Purple", hex: "#2d1b4e", role: "Primary", bg: "bg-[#2d1b4e]", note: "Cathedral shadow" },
                { name: "Blood Red", hex: "#8b1a1a", role: "Secondary", bg: "bg-[#8b1a1a]", note: "Sacred wound" },
                { name: "Sacred Gold", hex: "#c9a227", role: "Accent", bg: "bg-[#c9a227]", note: "Divine light" },
                { name: "Near Black", hex: "#0a0a0a", role: "Ground", bg: "bg-[#0a0a0a] border border-[#c9a227]/20", note: "The void" },
                { name: "Medium Purple", hex: "#4a2d6e", role: "Support", bg: "bg-[#4a2d6e]", note: "Dusk cloister" },
              ].map((color) => (
                <div key={color.name} className="group border border-[#c9a227]/20 hover:border-[#c9a227]/50 transition-all duration-300">
                  <div className={`h-24 md:h-32 ${color.bg}`} />
                  <div className="p-4 border-t border-[#c9a227]/20 bg-[#0d0d0d]">
                    <p className="font-serif text-xs tracking-widest uppercase text-[#c9a227]/50 mb-1">{color.role}</p>
                    <p className="font-serif text-sm text-[#c9a227]/80 tracking-wider">{color.name}</p>
                    <p className="text-xs text-[#c9a227]/30 font-mono mt-1">{color.hex}</p>
                    <p className="font-serif text-xs italic text-[#c9a227]/25 mt-1">{color.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Alerts / proclamations */}
          <RevealBlock inView={paletteInView} delay={0.2}>
            <div className="mt-12 space-y-3">
              <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-6">
                Proclamationes — Alert States
              </p>
              <div className="flex items-start gap-4 p-4 bg-[#0d0d0d] border border-[#c9a227]/20 border-l-2 border-l-[#c9a227]">
                <Check className="w-5 h-5 text-[#c9a227] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-serif text-sm tracking-wider text-[#c9a227] uppercase">Blessed — Ritual Complete</p>
                  <p className="font-serif text-xs italic text-[#c9a227]/40 mt-1">The sacred operation has been fulfilled.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-[#0d0d0d] border border-[#c9a227]/20 border-l-2 border-l-[#c9a227]/40">
                <AlertTriangle className="w-5 h-5 text-[#c9a227]/60 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-serif text-sm tracking-wider text-[#c9a227]/70 uppercase">Omen — Heed the Warning</p>
                  <p className="font-serif text-xs italic text-[#c9a227]/30 mt-1">Dark forces stir at the edges of perception.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-[#0d0d0d] border border-[#c9a227]/20 border-l-2 border-l-[#8b1a1a]">
                <X className="w-5 h-5 text-[#8b1a1a] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-serif text-sm tracking-wider text-[#8b1a1a] uppercase">Cursed — Ritual Failed</p>
                  <p className="font-serif text-xs italic text-[#c9a227]/30 mt-1">Something ancient and malevolent has intervened.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-[#0d0d0d] border border-[#c9a227]/20 border-l-2 border-l-[#4a2d6e]">
                <Info className="w-5 h-5 text-[#4a2d6e] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-serif text-sm tracking-wider text-[#4a2d6e] uppercase">Prophecy — Ancient Knowledge</p>
                  <p className="font-serif text-xs italic text-[#c9a227]/30 mt-1">The scrolls speak of things yet to come.</p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Typography Rules */}
      <section className="bg-[#0a0a0a] py-20 md:py-28 px-6 border-t border-[#c9a227]/10" ref={typographyRef}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock inView={typographyInView} delay={0}>
            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-3 text-center">
              Ars Typographica
            </p>
            <h2 className="font-serif text-3xl md:text-5xl tracking-wider uppercase text-[#c9a227] text-center mb-12"
              style={{ textShadow: "0 0 30px rgba(201,162,39,0.2)" }}>
              Typography Rules
            </h2>
          </RevealBlock>

          <RevealBlock inView={typographyInView} delay={0.1}>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-[#0d0d0d] border border-[#c9a227]/20 p-8">
                <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-6">Hierarchy Display</p>
                <div className="space-y-5">
                  <div>
                    <p className="font-serif text-4xl md:text-5xl tracking-wider text-[#c9a227]" style={{ textShadow: "0 0 20px rgba(201,162,39,0.3)" }}>
                      GOTHIC
                    </p>
                    <p className="text-xs text-[#c9a227]/30 font-serif italic mt-1">H1 · serif · tracking-wider · gold glow</p>
                  </div>
                  <div className="h-px bg-[#c9a227]/10" />
                  <div>
                    <p className="font-serif text-2xl tracking-wider text-[#8b1a1a]">
                      Sanctum Altare
                    </p>
                    <p className="text-xs text-[#c9a227]/30 font-serif italic mt-1">H2 · serif · blood red · tracking-wider</p>
                  </div>
                  <div className="h-px bg-[#c9a227]/10" />
                  <div>
                    <p className="font-serif text-lg tracking-wider text-[#c9a227]/70 uppercase">
                      Via Crucis
                    </p>
                    <p className="text-xs text-[#c9a227]/30 font-serif italic mt-1">H3 · serif · gold/70 · uppercase</p>
                  </div>
                  <div className="h-px bg-[#c9a227]/10" />
                  <div>
                    <p className="font-serif text-sm italic text-[#c9a227]/55 leading-relaxed">
                      Sub specie aeternitatis, omnia mutantur.
                    </p>
                    <p className="text-xs text-[#c9a227]/30 font-serif italic mt-1">Body · serif · italic · gold/55</p>
                  </div>
                  <div className="h-px bg-[#c9a227]/10" />
                  <div>
                    <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/35 font-serif">
                      Captions & Labels
                    </p>
                    <p className="text-xs text-[#c9a227]/30 font-serif italic mt-1">Caption · tracking-[0.4em] · gold/35</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#0d0d0d] border border-[#c9a227]/20 p-8">
                <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-6">Illuminated Quote</p>
                <blockquote className="border-l-2 border-[#c9a227]/50 pl-6 mb-8">
                  <p className="font-serif text-lg italic text-[#c9a227]/70 leading-relaxed mb-3">
                    &ldquo;In the shadow of the cathedral, the soul learns to see without eyes — perceiving the divine in the play of light across ancient stone.&rdquo;
                  </p>
                  <footer className="font-serif text-xs tracking-widest uppercase text-[#c9a227]/35">
                    — Vita Cathedralis
                  </footer>
                </blockquote>

                <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-4">Drop Cap</p>
                <p className="font-serif text-sm italic text-[#c9a227]/50 leading-relaxed">
                  <span
                    className="float-left mr-2 font-serif leading-none text-[#c9a227]"
                    style={{ fontSize: "3.5rem", lineHeight: 1, textShadow: "0 0 20px rgba(201,162,39,0.4)" }}
                  >
                    D
                  </span>
                  arkness is not the absence of light. It is the canvas upon which light inscribes its most sacred revelations. Without the void of the cathedral walls, the rose window would be merely colored glass — meaningless and mute.
                </p>
              </div>
            </div>
          </RevealBlock>

          {/* Dropdown demo */}
          <RevealBlock inView={typographyInView} delay={0.2}>
            <div className="max-w-sm mx-auto">
              <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-4 text-center">
                Sacred Archive — Dropdown
              </p>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="w-full px-5 py-3 bg-[#0d0d0d] border border-[#c9a227]/30 font-serif text-sm tracking-wider text-[#c9a227]/70 flex items-center justify-between hover:border-[#c9a227]/60 transition-all duration-300"
                >
                  <span>Select Chapter</span>
                  <ChevronDown className={`w-4 h-4 text-[#c9a227]/50 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-px bg-[#0d0d0d] border border-[#c9a227]/30 z-10">
                    {["Genesis — In principio", "Exodus — The Long March", "Psalms — Songs of Darkness", "Revelation — The Final Arch"].map((item) => (
                      <button
                        key={item}
                        className="w-full px-5 py-3 text-left font-serif text-sm text-[#c9a227]/60 hover:text-[#c9a227] hover:bg-[#c9a227]/5 border-b border-[#c9a227]/10 last:border-b-0 transition-all duration-200 tracking-wider"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Forms / Gothic-styled interaction section */}
      <section className="py-20 md:py-28 px-6 border-t border-[#c9a227]/10" ref={formsRef}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock inView={formsInView} delay={0}>
            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-3 text-center">
              Vitae Sanctorum
            </p>
            <h2 className="font-serif text-3xl md:text-5xl tracking-wider uppercase text-[#c9a227] text-center mb-12"
              style={{ textShadow: "0 0 30px rgba(201,162,39,0.2)" }}>
              Illuminated Manuscripts
            </h2>
          </RevealBlock>

          <RevealBlock inView={formsInView} delay={0.1}>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  numeral: "I",
                  title: "The Hours",
                  subtitle: "Horae Canonicae",
                  desc: "From Matins before dawn to Compline at dusk, the canonical hours organize sacred time. Each hour is a brushstroke in the illuminated manuscript of the day.",
                  accent: "#c9a227",
                },
                {
                  numeral: "II",
                  title: "The Bestiary",
                  subtitle: "Liber Bestiarum",
                  desc: "Fantastic creatures populate the margins of medieval manuscripts — dragons represent sin, unicorns purity, pelicans sacrifice. Each beast a symbol encrypted in vellum.",
                  accent: "#8b1a1a",
                },
                {
                  numeral: "III",
                  title: "The Psalter",
                  subtitle: "Psalterium Aureum",
                  desc: "The Golden Psalter of St. Gallen: each page a devotional labor lasting months. Gold leaf laid over gesso catches candlelight and sanctifies the written word.",
                  accent: "#4a2d6e",
                },
              ].map((item) => (
                <div
                  key={item.numeral}
                  className="group relative bg-[#0d0d0d] border border-[#c9a227]/20 p-8 overflow-hidden cursor-pointer hover:border-[#c9a227]/50 hover:shadow-[0_8px_30px_rgba(45,27,78,0.5)] transition-all duration-300"
                >
                  {/* Candlelight hover effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at top right, ${item.accent}20, transparent 60%)`,
                    }}
                  />
                  {/* Roman numeral decorative */}
                  <div
                    className="absolute top-4 right-6 font-serif text-6xl opacity-5"
                    style={{ color: item.accent }}
                  >
                    {item.numeral}
                  </div>
                  <p className="font-serif text-xs italic mb-2" style={{ color: `${item.accent}60` }}>
                    {item.subtitle}
                  </p>
                  <h3
                    className="font-serif text-xl tracking-wider uppercase mb-3 transition-colors duration-300"
                    style={{ color: item.accent }}
                  >
                    {item.title}
                  </h3>
                  {/* Expanding gold underline */}
                  <div
                    className="h-px w-8 group-hover:w-full mb-4 transition-all duration-700"
                    style={{ background: `${item.accent}50` }}
                  />
                  <p className="font-serif italic text-sm text-[#c9a227]/50 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Tags / Badges */}
          <RevealBlock inView={formsInView} delay={0.2}>
            <div className="mt-12 bg-[#0d0d0d] border border-[#c9a227]/20 p-8">
              <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-6">
                Sigilla — Tags & Badges
              </p>
              <div className="space-y-6">
                <div>
                  <p className="font-serif text-xs italic text-[#c9a227]/30 mb-3">Orders of Knighthood</p>
                  <div className="flex flex-wrap gap-3">
                    {["Templar", "Hospitaller", "Teutonic", "Santiago", "Calatrava"].map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1 font-serif text-xs tracking-widest uppercase border border-[#c9a227]/30 text-[#c9a227]/60 hover:border-[#c9a227]/60 hover:text-[#c9a227] hover:bg-[#c9a227]/5 cursor-pointer transition-all duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-[#c9a227]/10" />
                <div>
                  <p className="font-serif text-xs italic text-[#c9a227]/30 mb-3">Sacred Status Marks</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-1 font-serif text-xs tracking-widest uppercase bg-[#c9a227] text-[#0a0a0a]">Blessed</span>
                    <span className="px-4 py-1 font-serif text-xs tracking-widest uppercase bg-[#8b1a1a] text-[#c9a227]">Cursed</span>
                    <span className="px-4 py-1 font-serif text-xs tracking-widest uppercase bg-[#2d1b4e] text-[#c9a227]">Sealed</span>
                    <span className="px-4 py-1 font-serif text-xs tracking-widest uppercase border border-[#c9a227]/30 text-[#c9a227]/40 cursor-not-allowed">Forbidden</span>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Design Rules — Do and Don't */}
      <section className="bg-[#0a0a0a] py-20 md:py-28 px-6 border-t border-[#c9a227]/10" ref={rulesRef}>
        <div className="max-w-7xl mx-auto">
          <RevealBlock inView={rulesInView} delay={0}>
            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 font-serif mb-3 text-center">
              Regulae Monasticae
            </p>
            <h2 className="font-serif text-3xl md:text-5xl tracking-wider uppercase text-[#c9a227] text-center mb-12"
              style={{ textShadow: "0 0 30px rgba(201,162,39,0.2)" }}>
              Sacred Rules
            </h2>
          </RevealBlock>

          <RevealBlock inView={rulesInView} delay={0.1}>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#0d0d0d] border border-[#c9a227]/20 p-8">
                <h3 className="font-serif text-xl tracking-wider uppercase text-[#c9a227] mb-6 flex items-center gap-3">
                  <Check className="w-5 h-5" />
                  Mandatum — Must Follow
                </h3>
                <ul className="space-y-4">
                  {[
                    "Deep purple, blood red, near-black as the foundation palette",
                    "Gold (#c9a227) accents for all luminous focal points",
                    "Serif fonts for all titles, headings, and body text",
                    "tracking-wider or tracking-widest on all important text",
                    "Dark backgrounds throughout — no white or light sections",
                    "Gold borders at 20–60% opacity for structural definition",
                    "Pointed arch shapes and upward-reaching compositions",
                    "Latin mottos and italicized phrases for gravitas",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3">
                      <span className="text-[#c9a227] font-serif mt-0.5 flex-shrink-0">†</span>
                      <span className="font-serif text-sm italic text-[#c9a227]/60">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0d0d0d] border border-[#8b1a1a]/30 p-8">
                <h3 className="font-serif text-xl tracking-wider uppercase text-[#8b1a1a] mb-6 flex items-center gap-3">
                  <X className="w-5 h-5" />
                  Prohibitum — Never Do
                </h3>
                <ul className="space-y-4">
                  {[
                    "Bright or cheerful colors — pastels, neons, vivid primaries",
                    "Cute, rounded, or playful design elements",
                    "Modern sans-serif as main title fonts",
                    "Overly minimalist design stripped of ornament",
                    "White or very light section backgrounds",
                    "Casual or informal tone in copy or labels",
                    "Flat, shadowless modern UI patterns",
                    "Horizontal sprawl instead of vertical aspiration",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3">
                      <span className="text-[#8b1a1a] font-serif mt-0.5 flex-shrink-0">×</span>
                      <span className="font-serif text-sm italic text-[#c9a227]/50">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-[#c9a227]/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-serif text-xs tracking-[0.4em] uppercase text-[#c9a227]/40 italic">
                In tenebris lux — In darkness, light
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-[#c9a227]/20" />
              <span className="font-serif text-xs text-[#c9a227]/25 tracking-widest uppercase">
                Gothic · StyleKit
              </span>
              <div className="h-px w-12 bg-[#c9a227]/20" />
            </div>
            <Link
              href="/styles/gothic"
              className="font-serif text-xs tracking-widest uppercase text-[#c9a227]/40 hover:text-[#c9a227]/70 transition-colors"
            >
              Docs →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
