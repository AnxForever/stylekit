"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Inline useInView hook
// ---------------------------------------------------------------------------
function useInView(options?: { threshold?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: options?.threshold ?? 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold]);

  return { ref, inView };
}

// ---------------------------------------------------------------------------
// Inline RevealBlock component
// ---------------------------------------------------------------------------
function RevealBlock({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ornamental divider
// ---------------------------------------------------------------------------
function GoldDivider() {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#8b7355]/40" />
      <span className="text-[#8b7355]/60 font-serif text-xs tracking-[0.3em]">&#x2767;</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#8b7355]/40" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chapter data for the Reading Room switcher
// ---------------------------------------------------------------------------
const CHAPTERS = [
  {
    subject: "Philosophy",
    quote:
      "The unexamined life is not worth living. In the quiet of the library, one confronts the eternal questions that no age has yet answered.",
    author: "Socrates",
    year: "399 BC",
    source: "Apology",
  },
  {
    subject: "Literature",
    quote:
      "Books are a uniquely portable magic. Every page turned is a world entered, every chapter closed a life briefly lived and mourned.",
    author: "Stephen King",
    year: "2000",
    source: "On Writing",
  },
  {
    subject: "Art History",
    quote:
      "To look at beauty is to submit to its instruction. The great paintings do not hang in silence — they speak to those who stand long enough to listen.",
    author: "John Berger",
    year: "1972",
    source: "Ways of Seeing",
  },
  {
    subject: "History",
    quote:
      "History is a gallery of pictures in which there are few originals and many copies. Each civilization believes itself the first, and the last.",
    author: "Alexis de Tocqueville",
    year: "1835",
    source: "Democracy in America",
  },
];

// ---------------------------------------------------------------------------
// Component gallery tabs
// ---------------------------------------------------------------------------
const GALLERY_TABS = ["Buttons", "Cards", "Inputs"] as const;
type GalleryTab = (typeof GALLERY_TABS)[number];

// ---------------------------------------------------------------------------
// Main showcase component
// ---------------------------------------------------------------------------
export default function ShowcaseContent() {
  // Hero entrance state
  const [heroRevealed, setHeroRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Reading Room chapter switcher
  const [activeChapter, setActiveChapter] = useState(0);

  // Component gallery tab
  const [activeGallery, setActiveGallery] = useState<GalleryTab>("Buttons");

  return (
    <div className="min-h-screen bg-[#f5f0e1] font-serif text-[#3d2b1f]">

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#3d2b1f]/95 backdrop-blur-sm border-b border-[#8b7355]/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14 md:h-16">
            <Link
              href="/styles/dark-academia/showcase"
              className="font-serif text-[#f5f0e1]/90 tracking-[0.25em] uppercase text-sm"
            >
              Dark Academia
            </Link>
            <nav className="flex items-center gap-2 text-[#f5f0e1]/50 text-xs tracking-widest select-none">
              <Link
                href="/styles/dark-academia"
                className="relative group px-3 py-1 transition-colors duration-700 hover:text-[#8b7355]"
              >
                Docs
                <span className="absolute bottom-0 left-3 w-0 h-px bg-[#8b7355] group-hover:w-[calc(100%-1.5rem)] transition-all duration-1000 ease-in-out" />
              </Link>
              <span className="opacity-30">|</span>
              <Link
                href="/styles"
                className="relative group px-3 py-1 transition-colors duration-700 hover:text-[#8b7355]"
              >
                Gallery
                <span className="absolute bottom-0 left-3 w-0 h-px bg-[#8b7355] group-hover:w-[calc(100%-1.5rem)] transition-all duration-1000 ease-in-out" />
              </Link>
              <span className="opacity-30">|</span>
              <Link
                href="/"
                className="relative group px-3 py-1 transition-colors duration-700 hover:text-[#8b7355]"
              >
                Home
                <span className="absolute bottom-0 left-3 w-0 h-px bg-[#8b7355] group-hover:w-[calc(100%-1.5rem)] transition-all duration-1000 ease-in-out" />
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#3d2b1f] via-[#2d4a3e]/80 to-[#3d2b1f]">
        {/* Parchment texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Eyebrow */}
          <p
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 900ms cubic-bezier(0.16,1,0.3,1) 0ms, transform 900ms cubic-bezier(0.16,1,0.3,1) 0ms",
            }}
            className="text-[#8b7355]/70 text-xs tracking-[0.4em] uppercase mb-6"
          >
            StyleKit — Design System Showcase
          </p>

          {/* Main title */}
          <h1
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 1000ms cubic-bezier(0.16,1,0.3,1) 150ms, transform 1000ms cubic-bezier(0.16,1,0.3,1) 150ms",
            }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#f5f0e1] leading-[1.1] tracking-wide mb-4"
          >
            <em>Dark Academia</em>
          </h1>

          {/* Gold rule */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transition: "opacity 1000ms ease-in-out 350ms",
            }}
            className="flex items-center justify-center gap-4 my-7"
          >
            <div className="w-16 h-px bg-[#8b7355]/40" />
            <span className="text-[#8b7355]/60 text-xs tracking-[0.3em]">&#x2767;</span>
            <div className="w-16 h-px bg-[#8b7355]/40" />
          </div>

          {/* Subtitle */}
          <p
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 1000ms cubic-bezier(0.16,1,0.3,1) 400ms, transform 1000ms cubic-bezier(0.16,1,0.3,1) 400ms",
            }}
            className="font-serif italic text-[#f5f0e1]/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Classical libraries. Leather-bound tomes. Knowledge as a form of reverence.
            Warm, still, solemn — an interface as stable as an ancient folio.
          </p>

          {/* CTA */}
          <div
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition:
                "opacity 1000ms cubic-bezier(0.16,1,0.3,1) 600ms, transform 1000ms cubic-bezier(0.16,1,0.3,1) 600ms",
            }}
          >
            <button className="px-10 py-4 bg-[#3d2b1f] text-[#f5f0e1] font-serif tracking-[0.15em] rounded-sm border border-[#8b7355]/45 hover:shadow-[0_8px_18px_rgba(61,43,31,0.35)] duration-700 ease-in-out transition-shadow text-sm uppercase">
              Enter the Archive
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            opacity: heroRevealed ? 1 : 0,
            transition: "opacity 1200ms ease-in-out 900ms",
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#8b7355]/40 text-xs tracking-[0.3em] uppercase flex flex-col items-center gap-2"
        >
          <span>Scroll</span>
          <div className="w-px h-6 bg-[#8b7355]/30" />
        </div>
      </section>

      {/* READING ROOM */}
      <section className="py-20 md:py-32 px-6 bg-[#f5f0e1]">
        <div className="max-w-4xl mx-auto">
          <RevealBlock delay={0}>
            <p className="text-[#8b7355]/70 text-xs tracking-[0.35em] uppercase mb-3">
              The Reading Room
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#3d2b1f] mb-2 tracking-wide">
              Course of Study
            </h2>
          </RevealBlock>

          <RevealBlock delay={100}>
            <GoldDivider />
          </RevealBlock>

          <RevealBlock delay={150}>
            <div className="flex flex-wrap gap-0 mb-10 border border-[#8b7355]/25 rounded-sm overflow-hidden">
              {CHAPTERS.map((ch, i) => (
                <button
                  key={ch.subject}
                  onClick={() => setActiveChapter(i)}
                  className={[
                    "flex-1 min-w-[80px] py-3 px-4 text-xs tracking-[0.2em] uppercase font-serif transition-colors duration-700 ease-in-out border-r border-[#8b7355]/20 last:border-r-0",
                    activeChapter === i
                      ? "bg-[#3d2b1f] text-[#f5f0e1]"
                      : "bg-[#f5f0e1] text-[#3d2b1f]/50 hover:text-[#8b7355]",
                  ].join(" ")}
                >
                  {ch.subject}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={200}>
            <div className="bg-[#f5f0e1] border border-[#8b7355]/25 rounded-sm shadow-[inset_0_0_35px_rgba(139,115,85,0.05)] p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.2),transparent_55%)] pointer-events-none" />
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#8b7355]/60 via-[#8b7355]/30 to-[#8b7355]/60" />
              <div className="relative pl-4">
                <p className="text-[#8b7355]/60 text-xs tracking-[0.3em] uppercase mb-6 font-serif">
                  {CHAPTERS[activeChapter].source} &middot; {CHAPTERS[activeChapter].year}
                </p>
                <blockquote className="font-serif italic text-xl md:text-2xl text-[#3d2b1f]/80 leading-relaxed mb-8">
                  &ldquo;{CHAPTERS[activeChapter].quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-[#8b7355]/40" />
                  <p className="font-serif text-sm text-[#8b7355] tracking-wide">
                    {CHAPTERS[activeChapter].author}
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* COMPONENT GALLERY */}
      <section className="py-20 md:py-32 px-6 bg-[#3d2b1f]/[0.04]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock delay={0}>
            <p className="text-[#8b7355]/70 text-xs tracking-[0.35em] uppercase mb-3">
              The Workshop
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#3d2b1f] mb-2 tracking-wide">
              Component Gallery
            </h2>
          </RevealBlock>

          <RevealBlock delay={100}>
            <GoldDivider />
          </RevealBlock>

          <RevealBlock delay={150}>
            <div className="flex gap-0 mb-10 border-b border-[#8b7355]/20">
              {GALLERY_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveGallery(tab)}
                  className={[
                    "px-6 py-3 text-xs tracking-[0.2em] uppercase font-serif transition-colors duration-700 ease-in-out border-b-2 -mb-px",
                    activeGallery === tab
                      ? "border-[#8b7355] text-[#3d2b1f]"
                      : "border-transparent text-[#3d2b1f]/40 hover:text-[#8b7355]",
                  ].join(" ")}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {activeGallery === "Buttons" && (
            <RevealBlock delay={0}>
              <div className="space-y-10">
                <div>
                  <p className="text-[#8b7355]/60 text-xs tracking-[0.3em] uppercase mb-5 font-serif">
                    Primary Actions
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="group relative px-8 py-3 bg-[#3d2b1f] text-[#f5f0e1] font-serif tracking-[0.15em] rounded-sm border border-[#8b7355]/45 hover:shadow-[0_8px_18px_rgba(61,43,31,0.35)] duration-700 ease-in-out transition-shadow text-sm overflow-hidden">
                      <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.2),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                      <span className="relative">Read More</span>
                    </button>
                    <button className="group relative px-8 py-3 bg-[#2d4a3e] text-[#f5f0e1] font-serif tracking-[0.15em] rounded-sm border border-[#8b7355]/30 hover:shadow-[0_8px_18px_rgba(45,74,62,0.35)] duration-700 ease-in-out transition-shadow text-sm overflow-hidden">
                      <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.15),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                      <span className="relative">Explore</span>
                    </button>
                    <button className="group relative px-8 py-3 bg-[#f5f0e1] text-[#3d2b1f] font-serif tracking-[0.15em] rounded-sm border border-[#8b7355]/45 hover:border-[#8b7355] hover:shadow-[0_8px_18px_rgba(61,43,31,0.15)] duration-700 ease-in-out transition-all text-sm overflow-hidden">
                      <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,115,85,0.1),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                      <span className="relative">Annotate</span>
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-[#8b7355]/60 text-xs tracking-[0.3em] uppercase mb-5 font-serif">
                    Ghost Variants
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-8 py-3 font-serif tracking-[0.15em] rounded-sm border border-[#3d2b1f]/30 text-[#3d2b1f]/70 hover:border-[#8b7355] hover:text-[#8b7355] duration-700 ease-in-out transition-all text-sm">
                      Browse Catalog
                    </button>
                    <button className="px-8 py-3 font-serif tracking-[0.15em] rounded-sm border border-[#8b7355]/40 text-[#8b7355] hover:bg-[#8b7355]/10 duration-700 ease-in-out transition-all text-sm">
                      Bookmark
                    </button>
                    <button
                      disabled
                      className="px-8 py-3 font-serif tracking-[0.15em] rounded-sm border border-[#3d2b1f]/10 text-[#3d2b1f]/25 cursor-not-allowed text-sm"
                    >
                      Sealed
                    </button>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {activeGallery === "Cards" && (
            <RevealBlock delay={0}>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "The Library",
                    category: "Architecture",
                    body: "Endless shelves of leather-bound volumes, the scent of old pages mingling with candle wax and centuries of accumulated thought.",
                  },
                  {
                    title: "The Letter",
                    category: "Correspondence",
                    body: "Written by candlelight, each word chosen with deliberate care, sealed with dark wax and sent across the cold corridor of time.",
                  },
                  {
                    title: "The Lecture",
                    category: "Academia",
                    body: "A professor speaks of ancient civilizations while autumn rain patterns against tall Gothic windows, the chalk dust still hanging in the air.",
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="group relative bg-[#f5f0e1] border border-[#8b7355]/25 rounded-sm shadow-[inset_0_0_35px_rgba(139,115,85,0.05)] p-7 overflow-hidden cursor-default"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.2),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                    <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-[#8b7355]/30 group-hover:bg-[#8b7355]/60 transition-colors duration-700" />
                    <div className="relative pl-3">
                      <p className="text-[#8b7355]/60 text-xs tracking-[0.3em] uppercase mb-3 font-serif transition-colors duration-700 group-hover:text-[#8b7355]">
                        {card.category}
                      </p>
                      <h3 className="font-serif text-xl text-[#3d2b1f] mb-3 tracking-wide">
                        {card.title}
                      </h3>
                      <div className="w-8 h-px bg-[#8b7355]/40 group-hover:w-16 group-hover:bg-[#8b7355] duration-1000 ease-in-out transition-all mb-4" />
                      <p className="font-serif text-sm text-[#3d2b1f]/60 leading-relaxed">
                        {card.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealBlock>
          )}

          {activeGallery === "Inputs" && (
            <RevealBlock delay={0}>
              <div className="max-w-2xl space-y-6">
                <div>
                  <label className="block font-serif text-xs tracking-[0.3em] uppercase text-[#8b7355]/80 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name..."
                    className="w-full px-5 py-3 bg-[#f5f0e1] border border-[#8b7355]/30 rounded-sm font-serif text-sm text-[#3d2b1f] placeholder:text-[#3d2b1f]/30 focus:outline-none focus:border-[#8b7355] focus:shadow-[0_0_8px_rgba(139,115,85,0.2)] transition-all duration-700"
                  />
                </div>
                <div>
                  <label className="block font-serif text-xs tracking-[0.3em] uppercase text-[#8b7355]/80 mb-2">
                    Search the Archives
                  </label>
                  <input
                    type="text"
                    placeholder="Search tomes, authors, subjects..."
                    className="w-full px-5 py-3 bg-[#f5f0e1] border border-[#8b7355]/30 rounded-sm font-serif text-sm text-[#3d2b1f] placeholder:text-[#3d2b1f]/30 focus:outline-none focus:border-[#8b7355] focus:shadow-[0_0_8px_rgba(139,115,85,0.2)] transition-all duration-700"
                  />
                </div>
                <div>
                  <label className="block font-serif text-xs tracking-[0.3em] uppercase text-[#8b7355]/80 mb-2">
                    Notes
                  </label>
                  <textarea
                    placeholder="Record your observations..."
                    rows={4}
                    className="w-full px-5 py-3 bg-[#f5f0e1] border border-[#8b7355]/30 rounded-sm font-serif text-sm text-[#3d2b1f] placeholder:text-[#3d2b1f]/30 focus:outline-none focus:border-[#8b7355] focus:shadow-[0_0_8px_rgba(139,115,85,0.2)] transition-all duration-700 resize-none"
                  />
                </div>
                <button className="px-8 py-3 bg-[#3d2b1f] text-[#f5f0e1] font-serif tracking-[0.15em] rounded-sm border border-[#8b7355]/45 hover:shadow-[0_8px_18px_rgba(61,43,31,0.35)] duration-700 ease-in-out transition-shadow text-sm">
                  Submit
                </button>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* COLOR PALETTE */}
      <section className="py-20 md:py-32 px-6 bg-[#f5f0e1]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock delay={0}>
            <p className="text-[#8b7355]/70 text-xs tracking-[0.35em] uppercase mb-3">
              The Palette
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#3d2b1f] mb-2 tracking-wide">
              Ink Samples
            </h2>
          </RevealBlock>

          <RevealBlock delay={100}>
            <GoldDivider />
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mt-4">
            {[
              { name: "Deep Brown", hex: "#3d2b1f", label: "Primary" },
              { name: "Forest Green", hex: "#2d4a3e", label: "Secondary" },
              { name: "Antique Gold", hex: "#8b7355", label: "Accent I" },
              { name: "Parchment", hex: "#f5f0e1", label: "Background" },
              { name: "Dark Brown", hex: "#5c4033", label: "Accent III" },
            ].map((swatch, i) => (
              <RevealBlock key={swatch.hex} delay={i * 80}>
                <div className="group border border-[#8b7355]/20 rounded-sm overflow-hidden hover:border-[#8b7355]/50 transition-colors duration-700">
                  <div
                    className="h-28 md:h-36 relative overflow-hidden"
                    style={{ backgroundColor: swatch.hex }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.15),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity" />
                  </div>
                  <div className="p-3 bg-[#f5f0e1] border-t border-[#8b7355]/15">
                    <p className="font-serif text-xs text-[#3d2b1f] tracking-wide">{swatch.name}</p>
                    <p className="font-serif text-[10px] text-[#8b7355]/70 mt-0.5">{swatch.hex}</p>
                    <p className="font-serif text-[10px] text-[#3d2b1f]/40 mt-0.5 tracking-[0.2em] uppercase">{swatch.label}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* TYPOGRAPHY */}
      <section className="py-20 md:py-32 px-6 bg-[#3d2b1f]/[0.04]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock delay={0}>
            <p className="text-[#8b7355]/70 text-xs tracking-[0.35em] uppercase mb-3">
              The Written Word
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#3d2b1f] mb-2 tracking-wide">
              Typography
            </h2>
          </RevealBlock>

          <RevealBlock delay={100}>
            <GoldDivider />
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-10 mt-6">
            <RevealBlock delay={0}>
              <div className="bg-[#f5f0e1] border border-[#8b7355]/25 rounded-sm shadow-[inset_0_0_35px_rgba(139,115,85,0.05)] p-8">
                <p className="text-[#8b7355]/60 text-xs tracking-[0.3em] uppercase mb-5 font-serif">Display</p>
                <p className="font-serif text-5xl text-[#3d2b1f] leading-tight mb-2">
                  <em>Carpe Diem</em>
                </p>
                <p className="font-serif text-3xl text-[#2d4a3e] leading-tight mb-2">
                  Seize the Day
                </p>
                <p className="font-serif text-xl text-[#8b7355] leading-snug">
                  In Pursuit of Beauty
                </p>
              </div>
            </RevealBlock>

            <RevealBlock delay={100}>
              <div className="bg-[#f5f0e1] border border-[#8b7355]/25 rounded-sm shadow-[inset_0_0_35px_rgba(139,115,85,0.05)] p-8">
                <p className="text-[#8b7355]/60 text-xs tracking-[0.3em] uppercase mb-5 font-serif">{"Body & Detail"}</p>
                <p className="font-serif text-base text-[#3d2b1f]/75 leading-relaxed mb-5">
                  Dark Academia typography draws from the great printed traditions —
                  classical serifs with generous tracking, evoking leather-bound volumes
                  and the gravity of the written word.
                </p>
                <div className="space-y-2">
                  {[
                    { label: "Display", cls: "text-2xl" },
                    { label: "Heading", cls: "text-lg" },
                    { label: "Body", cls: "text-base" },
                    { label: "Caption", cls: "text-xs tracking-widest uppercase" },
                  ].map((t) => (
                    <div key={t.label} className="flex items-baseline gap-4">
                      <span className="font-serif text-[10px] tracking-[0.2em] uppercase text-[#8b7355]/50 w-14 shrink-0">{t.label}</span>
                      <span className={`font-serif text-[#3d2b1f]/70 ${t.cls}`}>Aa Bb Cc</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* DESIGN RULES */}
      <section className="py-20 md:py-32 px-6 bg-[#f5f0e1]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock delay={0}>
            <p className="text-[#8b7355]/70 text-xs tracking-[0.35em] uppercase mb-3">
              The Curriculum
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#3d2b1f] mb-2 tracking-wide">
              Design Rules
            </h2>
          </RevealBlock>

          <RevealBlock delay={100}>
            <GoldDivider />
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8 mt-4">
            <RevealBlock delay={0}>
              <div className="group relative bg-[#f5f0e1] border border-[#8b7355]/25 rounded-sm shadow-[inset_0_0_35px_rgba(139,115,85,0.05)] p-8 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.2),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2d4a3e]/50" />
                <div className="relative pl-4">
                  <p className="font-serif text-xs tracking-[0.3em] uppercase text-[#2d4a3e] mb-5">
                    Commandments
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Use deep brown, forest green, and antique gold exclusively",
                      "Employ serif fonts throughout — body, headings, captions alike",
                      "Allow duration-700 to duration-1000 for all transitions",
                      "Introduce candlelight glow on hover via radial gradient",
                      "Expanding gold underlines signal interactivity",
                      "Parchment cream as the resting background",
                      "Inset shadows suggest paper depth, never harsh drop shadows",
                    ].map((rule) => (
                      <li key={rule} className="flex items-start gap-3">
                        <span className="text-[#2d4a3e] font-serif text-base leading-none mt-0.5 shrink-0">&#x2713;</span>
                        <span className="font-serif text-sm text-[#3d2b1f]/70 leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={100}>
              <div className="group relative bg-[#f5f0e1] border border-[#8b7355]/25 rounded-sm shadow-[inset_0_0_35px_rgba(139,115,85,0.05)] p-8 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.2),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5c4033]/50" />
                <div className="relative pl-4">
                  <p className="font-serif text-xs tracking-[0.3em] uppercase text-[#5c4033] mb-5">
                    Prohibitions
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Never use neon, high-saturation, or cool-toned colors",
                      "No playful scale(), bounce, or jump animations",
                      "Avoid modern sans-serif fonts — they break the atmosphere",
                      "Do not apply rapid transitions (below duration-500)",
                      "No hard drop-shadows or glowing outlines",
                      "Avoid cold gray or blue backgrounds",
                      "Never stack many bright decorative elements — keep it still",
                    ].map((rule) => (
                      <li key={rule} className="flex items-start gap-3">
                        <span className="text-[#5c4033] font-serif text-base leading-none mt-0.5 shrink-0">&#x2717;</span>
                        <span className="font-serif text-sm text-[#3d2b1f]/70 leading-relaxed">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* QUOTE SHOWCASE */}
      <section className="py-20 md:py-32 px-6 bg-[#3d2b1f]">
        <div className="max-w-3xl mx-auto text-center">
          <RevealBlock delay={0}>
            <p className="text-[#8b7355]/60 text-xs tracking-[0.35em] uppercase mb-10 font-serif">
              From the Commonplace Book
            </p>
          </RevealBlock>

          <RevealBlock delay={100}>
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="flex-1 h-px bg-[#8b7355]/20" />
              <span className="text-[#8b7355]/40 font-serif text-xs tracking-[0.3em]">&#x2767;</span>
              <div className="flex-1 h-px bg-[#8b7355]/20" />
            </div>
          </RevealBlock>

          <RevealBlock delay={200}>
            <blockquote className="font-serif italic text-2xl md:text-3xl text-[#f5f0e1]/80 leading-relaxed mb-8">
              &ldquo;The love of learning, the sequestered nooks,
              <br />
              And all the sweet serenity of books.&rdquo;
            </blockquote>
          </RevealBlock>

          <RevealBlock delay={300}>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="w-8 h-px bg-[#8b7355]/40" />
              <p className="font-serif text-sm text-[#8b7355] tracking-[0.2em]">
                Henry Wadsworth Longfellow
              </p>
              <div className="w-8 h-px bg-[#8b7355]/40" />
            </div>
            <p className="font-serif text-xs text-[#8b7355]/40 tracking-[0.25em] uppercase mt-2">
              Morituri Salutamus, 1875
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* INTERACTION STATES */}
      <section className="py-20 md:py-32 px-6 bg-[#f5f0e1]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock delay={0}>
            <p className="text-[#8b7355]/70 text-xs tracking-[0.35em] uppercase mb-3">
              The Behaviour
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-[#3d2b1f] mb-2 tracking-wide">
              Interaction States
            </h2>
          </RevealBlock>

          <RevealBlock delay={100}>
            <GoldDivider />
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6 mt-4">
            <RevealBlock delay={0}>
              <div className="group relative bg-[#f5f0e1] border border-[#8b7355]/25 rounded-sm shadow-[inset_0_0_35px_rgba(139,115,85,0.05)] p-8 overflow-hidden cursor-default min-h-[200px] flex flex-col justify-end">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.25),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                <p className="relative font-serif text-xs tracking-[0.3em] uppercase text-[#8b7355]/60 mb-2">
                  Candlelight Reveal
                </p>
                <p className="relative font-serif text-sm text-[#3d2b1f]/60 leading-relaxed">
                  Hover to see warm radial glow emerge from the corner, as if a candle were drawn near.
                </p>
              </div>
            </RevealBlock>

            <RevealBlock delay={80}>
              <div className="group relative bg-[#f5f0e1] border border-[#8b7355]/25 rounded-sm shadow-[inset_0_0_35px_rgba(139,115,85,0.05)] p-8 overflow-hidden cursor-default min-h-[200px] flex flex-col justify-end">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.2),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                <p className="relative font-serif text-xs tracking-[0.3em] uppercase text-[#8b7355]/60 mb-2">
                  Expanding Underline
                </p>
                <div className="relative">
                  <p className="font-serif text-lg text-[#3d2b1f] mb-2 tracking-wide">A Study in Gold</p>
                  <div className="w-8 h-px bg-[#8b7355]/40 group-hover:w-24 group-hover:bg-[#8b7355] duration-1000 ease-in-out transition-all" />
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={160}>
              <div className="group relative bg-[#f5f0e1] border border-[#8b7355]/25 rounded-sm shadow-[inset_0_0_35px_rgba(139,115,85,0.05)] p-8 overflow-hidden cursor-default min-h-[200px] flex flex-col justify-end">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.2),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                <p className="relative font-serif text-xs tracking-[0.3em] uppercase text-[#8b7355]/60 mb-2">
                  Antique Slowness
                </p>
                <p className="relative font-serif text-sm text-[#3d2b1f]/60 group-hover:text-[#8b7355] duration-700 ease-in-out transition-colors leading-relaxed">
                  Ink and gold transitions at duration-700 to 1000 — the pace of turning a page.
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#3d2b1f] border-t border-[#8b7355]/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="font-serif text-[#f5f0e1]/80 tracking-[0.2em] uppercase text-sm mb-1">
                Dark Academia
              </p>
              <p className="font-serif text-[#8b7355]/50 text-xs tracking-wide italic">
                StyleKit Design System
              </p>
            </div>

            <div className="flex items-center gap-2 text-[#8b7355]/30">
              <div className="w-16 h-px bg-[#8b7355]/20" />
              <span className="font-serif text-xs tracking-[0.3em]">&#x2767;</span>
              <div className="w-16 h-px bg-[#8b7355]/20" />
            </div>

            <div className="flex gap-6 text-xs font-serif tracking-[0.2em] uppercase">
              <Link
                href="/styles/dark-academia"
                className="text-[#f5f0e1]/40 hover:text-[#8b7355] transition-colors duration-700"
              >
                Documentation
              </Link>
              <Link
                href="/styles"
                className="text-[#f5f0e1]/40 hover:text-[#8b7355] transition-colors duration-700"
              >
                All Styles
              </Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
