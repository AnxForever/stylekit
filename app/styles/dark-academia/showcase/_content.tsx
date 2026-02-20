"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Inline useInView hook — required pattern
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// RevealBlock — scroll-triggered fade+rise animation
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Ornamental gold divider
// ---------------------------------------------------------------------------
function GoldDivider() {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#8b7355]/40" />
      <span className="text-[#8b7355]/60 font-serif text-sm tracking-[0.3em]">&#x2767;</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#8b7355]/40" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section label + heading pattern
// ---------------------------------------------------------------------------
function SectionHeader({
  eyebrow,
  heading,
  light = false,
}: {
  eyebrow: string;
  heading: string;
  light?: boolean;
}) {
  return (
    <>
      <RevealBlock delay={0}>
        <p
          className={`text-xs tracking-[0.35em] uppercase mb-3 font-serif ${
            light ? "text-[#8b7355]/60" : "text-[#8b7355]/70"
          }`}
        >
          {eyebrow}
        </p>
        <h2
          className={`font-serif text-3xl md:text-5xl mb-2 tracking-wide ${
            light ? "text-[#f5f0e1]" : "text-[#3d2b1f]"
          }`}
        >
          {heading}
        </h2>
      </RevealBlock>
      <RevealBlock delay={0.1}>
        <GoldDivider />
      </RevealBlock>
    </>
  );
}

// ---------------------------------------------------------------------------
// Data — Reading Room chapters
// ---------------------------------------------------------------------------
const CHAPTERS = [
  {
    subject: "Philosophy",
    quote:
      "The unexamined life is not worth living. In the quiet of the library, one confronts the eternal questions that no age has yet answered.",
    author: "Socrates",
    year: "399 BC",
    source: "Apology",
    latin: "Nosce te ipsum",
  },
  {
    subject: "Literature",
    quote:
      "Books are a uniquely portable magic. Every page turned is a world entered, every chapter closed a life briefly lived and mourned.",
    author: "Stephen King",
    year: "2000",
    source: "On Writing",
    latin: "Ars longa, vita brevis",
  },
  {
    subject: "Art History",
    quote:
      "To look at beauty is to submit to its instruction. The great paintings do not hang in silence — they speak to those who stand long enough to listen.",
    author: "John Berger",
    year: "1972",
    source: "Ways of Seeing",
    latin: "Pulchritudo vincit",
  },
  {
    subject: "History",
    quote:
      "History is a gallery of pictures in which there are few originals and many copies. Each civilization believes itself the first, and the last.",
    author: "Alexis de Tocqueville",
    year: "1835",
    source: "Democracy in America",
    latin: "Historia magistra vitae",
  },
];

// ---------------------------------------------------------------------------
// Data — Component gallery tabs
// ---------------------------------------------------------------------------
const GALLERY_TABS = ["Buttons", "Cards", "Inputs"] as const;
type GalleryTab = (typeof GALLERY_TABS)[number];

// ---------------------------------------------------------------------------
// Data — Library catalog entries
// ---------------------------------------------------------------------------
const CATALOG_ENTRIES = [
  {
    callNumber: "PA3877.M3",
    title: "The Dialogues of Plato",
    author: "Plato",
    year: "360 BC",
    subject: "Philosophy",
    status: "Available",
    shelf: "West Wing, Bay 3",
  },
  {
    callNumber: "PR2750.A2",
    title: "Hamlet, Prince of Denmark",
    author: "William Shakespeare",
    year: "1603",
    subject: "Drama",
    status: "On Reserve",
    shelf: "Reading Room A",
  },
  {
    callNumber: "QA76.9.A25",
    title: "The Nature of Things",
    author: "Lucretius",
    year: "50 BC",
    subject: "Natural Philosophy",
    status: "Available",
    shelf: "East Wing, Bay 7",
  },
  {
    callNumber: "PN6081.A75",
    title: "Essays of Michel de Montaigne",
    author: "Michel de Montaigne",
    year: "1580",
    subject: "Essays",
    status: "Restricted",
    shelf: "Rare Books Room",
  },
  {
    callNumber: "PR4034.P7",
    title: "Paradise Lost",
    author: "John Milton",
    year: "1667",
    subject: "Poetry",
    status: "Available",
    shelf: "North Wing, Bay 12",
  },
];

// ---------------------------------------------------------------------------
// Data — Color swatches
// ---------------------------------------------------------------------------
const SWATCHES = [
  { name: "Deep Brown", hex: "#3d2b1f", label: "Primary", role: "Leather & bark" },
  { name: "Forest Green", hex: "#2d4a3e", label: "Secondary", role: "Patina & moss" },
  { name: "Antique Gold", hex: "#8b7355", label: "Accent I", role: "Gilt & candle" },
  { name: "Parchment", hex: "#f5f0e1", label: "Background", role: "Aged vellum" },
  { name: "Dark Brown", hex: "#5c4033", label: "Accent II", role: "Tobacco & ash" },
];

// ---------------------------------------------------------------------------
// Data — Latin inscriptions for decorative use
// ---------------------------------------------------------------------------
const INSCRIPTIONS = [
  { latin: "Lux et Veritas", english: "Light and Truth" },
  { latin: "Veritas Vos Liberabit", english: "The Truth Shall Set You Free" },
  { latin: "Scientia Potentia Est", english: "Knowledge is Power" },
  { latin: "Per Aspera Ad Astra", english: "Through Hardship to the Stars" },
  { latin: "Dum Spiro Spero", english: "While I Breathe, I Hope" },
  { latin: "Carpe Diem", english: "Seize the Day" },
];

// ---------------------------------------------------------------------------
// Main showcase component
// ---------------------------------------------------------------------------
export default function DarkAcademiaShowcase() {
  // Hero entrance animation
  const [heroRevealed, setHeroRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Reading Room chapter switcher
  const [activeChapter, setActiveChapter] = useState(0);

  // Component gallery tab
  const [activeGallery, setActiveGallery] = useState<GalleryTab>("Buttons");

  // Library catalog selected row
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);

  // Mobile nav open state
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f0e1] font-serif text-[#3d2b1f]">

      {/* =================================================================
          NAV — Dark scholarly header with crest seal
      ================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#3d2b1f]/97 backdrop-blur-sm border-b border-[#8b7355]/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Crest + wordmark */}
            <Link
              href="/styles/dark-academia/showcase"
              className="flex items-center gap-3 group"
            >
              {/* SVG seal / crest */}
              <div className="w-7 h-7 rounded-full border border-[#8b7355]/50 flex items-center justify-center group-hover:border-[#8b7355] transition-colors duration-700">
                <span className="text-[#8b7355] text-[10px] font-serif leading-none">DA</span>
              </div>
              <span className="font-serif text-[#f5f0e1]/90 tracking-[0.25em] uppercase text-sm">
                Dark Academia
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1 text-[#f5f0e1]/50 text-xs tracking-widest select-none">
              {[
                { label: "Docs", href: "/styles/dark-academia" },
                { label: "Gallery", href: "/styles" },
                { label: "Home", href: "/" },
              ].map((link, i) => (
                <span key={link.href} className="flex items-center gap-1">
                  {i > 0 && <span className="opacity-30">|</span>}
                  <Link
                    href={link.href}
                    className="relative group px-3 py-1 transition-colors duration-700 hover:text-[#8b7355]"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-3 w-0 h-px bg-[#8b7355] group-hover:w-[calc(100%-1.5rem)] transition-all duration-1000 ease-in-out" />
                  </Link>
                </span>
              ))}
            </nav>

            {/* Mobile nav toggle */}
            <button
              onClick={() => setMobileNavOpen((v) => !v)}
              className="md:hidden flex flex-col gap-1 p-2 text-[#8b7355]/60 hover:text-[#8b7355] transition-colors duration-700"
              aria-label="Toggle navigation"
            >
              <span className={`block w-5 h-px bg-current transition-all duration-500 ${mobileNavOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`block w-5 h-px bg-current transition-all duration-500 ${mobileNavOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-px bg-current transition-all duration-500 ${mobileNavOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileNavOpen && (
          <div className="md:hidden border-t border-[#8b7355]/20 bg-[#3d2b1f]/98 px-6 py-4 flex flex-col gap-3">
            {[
              { label: "Documentation", href: "/styles/dark-academia" },
              { label: "Gallery", href: "/styles" },
              { label: "Home", href: "/" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
                className="font-serif text-xs tracking-[0.2em] uppercase text-[#f5f0e1]/50 hover:text-[#8b7355] transition-colors duration-700 py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* =================================================================
          HERO — Library / study atmosphere with scholarly quote
      ================================================================= */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#3d2b1f] via-[#2d4a3e]/80 to-[#3d2b1f]">
        {/* Parchment / grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Decorative corner ornaments */}
        <div className="absolute top-20 left-8 md:left-16 opacity-10 pointer-events-none">
          <div className="w-16 h-16 border-l border-t border-[#8b7355]" />
        </div>
        <div className="absolute top-20 right-8 md:right-16 opacity-10 pointer-events-none">
          <div className="w-16 h-16 border-r border-t border-[#8b7355]" />
        </div>
        <div className="absolute bottom-16 left-8 md:left-16 opacity-10 pointer-events-none">
          <div className="w-16 h-16 border-l border-b border-[#8b7355]" />
        </div>
        <div className="absolute bottom-16 right-8 md:right-16 opacity-10 pointer-events-none">
          <div className="w-16 h-16 border-r border-b border-[#8b7355]" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Eyebrow */}
          <p
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 900ms cubic-bezier(0.16,1,0.3,1) 0ms, transform 900ms cubic-bezier(0.16,1,0.3,1) 0ms",
            }}
            className="text-[#8b7355]/70 text-xs tracking-[0.4em] uppercase mb-6 font-serif"
          >
            StyleKit — Design System Showcase
          </p>

          {/* Main title */}
          <h1
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1000ms cubic-bezier(0.16,1,0.3,1) 150ms, transform 1000ms cubic-bezier(0.16,1,0.3,1) 150ms",
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
            <span className="text-[#8b7355]/60 text-sm tracking-[0.3em]">&#x2767;</span>
            <div className="w-16 h-px bg-[#8b7355]/40" />
          </div>

          {/* Latin motto */}
          <p
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 900ms cubic-bezier(0.16,1,0.3,1) 280ms, transform 900ms cubic-bezier(0.16,1,0.3,1) 280ms",
            }}
            className="font-serif italic text-[#8b7355]/70 text-sm tracking-[0.2em] mb-4"
          >
            Lux et Veritas — Light and Truth
          </p>

          {/* Subtitle */}
          <p
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 1000ms cubic-bezier(0.16,1,0.3,1) 400ms, transform 1000ms cubic-bezier(0.16,1,0.3,1) 400ms",
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
              transition: "opacity 1000ms cubic-bezier(0.16,1,0.3,1) 600ms, transform 1000ms cubic-bezier(0.16,1,0.3,1) 600ms",
            }}
            className="flex flex-wrap gap-4 items-center justify-center"
          >
            <button className="group relative px-10 py-4 bg-[#3d2b1f] text-[#f5f0e1] font-serif tracking-[0.15em] rounded-sm border border-[#8b7355]/45 hover:shadow-[0_8px_18px_rgba(61,43,31,0.35)] duration-700 ease-in-out transition-shadow text-sm uppercase overflow-hidden">
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.18),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
              <span className="relative">Enter the Archive</span>
            </button>
            <button className="px-10 py-4 font-serif tracking-[0.15em] rounded-sm border border-[#8b7355]/40 text-[#8b7355] hover:bg-[#8b7355]/10 duration-700 ease-in-out transition-all text-sm uppercase">
              Browse Catalog
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
          <span className="font-serif">Scroll</span>
          <div className="w-px h-8 bg-[#8b7355]/30" />
        </div>
      </section>

      {/* =================================================================
          READING ROOM — Scholarly quote switcher
      ================================================================= */}
      <section className="py-20 md:py-32 px-6 bg-[#f5f0e1]">
        <div className="max-w-4xl mx-auto">
          <SectionHeader eyebrow="The Reading Room" heading="Course of Study" />

          <RevealBlock delay={0.15}>
            <div className="flex flex-wrap gap-0 mb-10 border border-[#8b7355]/25 rounded-sm overflow-hidden">
              {CHAPTERS.map((ch, i) => (
                <button
                  key={ch.subject}
                  onClick={() => setActiveChapter(i)}
                  className={[
                    "flex-1 min-w-[70px] py-3 px-4 text-xs tracking-[0.2em] uppercase font-serif transition-colors duration-700 ease-in-out border-r border-[#8b7355]/20 last:border-r-0",
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

          <RevealBlock delay={0.2}>
            <div className="bg-[#f5f0e1] border border-[#8b7355]/25 rounded-sm shadow-[inset_0_0_35px_rgba(139,115,85,0.05)] p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.2),transparent_55%)] pointer-events-none" />
              {/* Spine accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#8b7355]/60 via-[#8b7355]/30 to-[#8b7355]/60" />
              <div className="relative pl-5">
                <p className="text-[#8b7355]/60 text-xs tracking-[0.3em] uppercase mb-1 font-serif">
                  {CHAPTERS[activeChapter].source} &middot; {CHAPTERS[activeChapter].year}
                </p>
                <p className="text-[#8b7355]/40 text-xs tracking-[0.25em] mb-6 font-serif italic">
                  {CHAPTERS[activeChapter].latin}
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

      {/* =================================================================
          COMPONENT GALLERY — Buttons, Cards, Inputs
      ================================================================= */}
      <section className="py-20 md:py-32 px-6 bg-[#3d2b1f]/[0.04]">
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="The Workshop" heading="Component Gallery" />

          <RevealBlock delay={0.15}>
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

          {/* Buttons */}
          {activeGallery === "Buttons" && (
            <RevealBlock delay={0}>
              <div className="space-y-12">
                <div>
                  <p className="text-[#8b7355]/60 text-xs tracking-[0.3em] uppercase mb-6 font-serif">
                    Primary Actions
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="group relative px-8 py-3 bg-[#3d2b1f] text-[#f5f0e1] font-serif tracking-[0.15em] rounded-sm border border-[#8b7355]/45 hover:shadow-[0_8px_18px_rgba(61,43,31,0.35)] duration-700 ease-in-out transition-shadow text-sm uppercase overflow-hidden">
                      <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.2),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                      <span className="relative">Read More</span>
                    </button>
                    <button className="group relative px-8 py-3 bg-[#2d4a3e] text-[#f5f0e1] font-serif tracking-[0.15em] rounded-sm border border-[#8b7355]/30 hover:shadow-[0_8px_18px_rgba(45,74,62,0.35)] duration-700 ease-in-out transition-shadow text-sm uppercase overflow-hidden">
                      <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.15),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                      <span className="relative">Explore</span>
                    </button>
                    <button className="group relative px-8 py-3 bg-[#f5f0e1] text-[#3d2b1f] font-serif tracking-[0.15em] rounded-sm border border-[#8b7355]/45 hover:border-[#8b7355] hover:shadow-[0_8px_18px_rgba(61,43,31,0.15)] duration-700 ease-in-out transition-all text-sm uppercase overflow-hidden">
                      <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,115,85,0.1),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                      <span className="relative">Annotate</span>
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-[#8b7355]/60 text-xs tracking-[0.3em] uppercase mb-6 font-serif">
                    Ghost Variants
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-8 py-3 font-serif tracking-[0.15em] rounded-sm border border-[#3d2b1f]/30 text-[#3d2b1f]/70 hover:border-[#8b7355] hover:text-[#8b7355] duration-700 ease-in-out transition-all text-sm uppercase">
                      Browse Catalog
                    </button>
                    <button className="px-8 py-3 font-serif tracking-[0.15em] rounded-sm border border-[#8b7355]/40 text-[#8b7355] hover:bg-[#8b7355]/10 duration-700 ease-in-out transition-all text-sm uppercase">
                      Bookmark
                    </button>
                    <button
                      disabled
                      className="px-8 py-3 font-serif tracking-[0.15em] rounded-sm border border-[#3d2b1f]/10 text-[#3d2b1f]/25 cursor-not-allowed text-sm uppercase"
                    >
                      Sealed
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-[#8b7355]/60 text-xs tracking-[0.3em] uppercase mb-6 font-serif">
                    Icon Variants
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="group relative flex items-center gap-3 px-8 py-3 bg-[#3d2b1f] text-[#f5f0e1] font-serif tracking-[0.15em] rounded-sm border border-[#8b7355]/45 hover:shadow-[0_8px_18px_rgba(61,43,31,0.35)] duration-700 ease-in-out transition-shadow text-sm uppercase overflow-hidden">
                      <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.2),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                      <span className="relative text-[#8b7355]">&#x2726;</span>
                      <span className="relative">Add to Collection</span>
                    </button>
                    <button className="group relative flex items-center gap-3 px-8 py-3 bg-[#f5f0e1] text-[#3d2b1f] font-serif tracking-[0.15em] rounded-sm border border-[#8b7355]/45 hover:border-[#8b7355] duration-700 ease-in-out transition-all text-sm uppercase overflow-hidden">
                      <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,115,85,0.1),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                      <span className="relative text-[#8b7355]">&#x2767;</span>
                      <span className="relative">Request Copy</span>
                    </button>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Cards */}
          {activeGallery === "Cards" && (
            <RevealBlock delay={0}>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "The Library",
                    category: "Architecture",
                    body: "Endless shelves of leather-bound volumes, the scent of old pages mingling with candle wax and centuries of accumulated thought.",
                    latin: "Bibliotheca",
                  },
                  {
                    title: "The Letter",
                    category: "Correspondence",
                    body: "Written by candlelight, each word chosen with deliberate care, sealed with dark wax and sent across the cold corridor of time.",
                    latin: "Epistola",
                  },
                  {
                    title: "The Lecture",
                    category: "Academia",
                    body: "A professor speaks of ancient civilizations while autumn rain patterns against tall Gothic windows, chalk dust hanging in the air.",
                    latin: "Lectio",
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="group relative bg-[#f5f0e1] border border-[#8b7355]/25 rounded-sm shadow-[inset_0_0_35px_rgba(139,115,85,0.05)] p-7 overflow-hidden cursor-default hover:border-[#8b7355]/50 hover:shadow-[inset_0_0_60px_rgba(139,115,85,0.12),0_8px_24px_rgba(61,43,31,0.08)] transition-all duration-1000 ease-in-out"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.2),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                    <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-[#8b7355]/30 group-hover:bg-[#8b7355]/60 transition-colors duration-700" />
                    <div className="relative pl-3">
                      <p className="text-[#8b7355]/40 text-[10px] tracking-[0.35em] uppercase mb-1 font-serif italic">
                        {card.latin}
                      </p>
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

          {/* Inputs */}
          {activeGallery === "Inputs" && (
            <RevealBlock delay={0}>
              <div className="max-w-2xl space-y-6">
                <div>
                  <label className="block font-serif text-xs tracking-[0.3em] uppercase text-[#8b7355]/80 mb-2">
                    Correspondent Name
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
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search tomes, authors, subjects..."
                      className="w-full px-5 py-3 pr-12 bg-[#f5f0e1] border border-[#8b7355]/30 rounded-sm font-serif text-sm text-[#3d2b1f] placeholder:text-[#3d2b1f]/30 focus:outline-none focus:border-[#8b7355] focus:shadow-[0_0_8px_rgba(139,115,85,0.2)] transition-all duration-700"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b7355]/40 text-sm">&#x2315;</span>
                  </div>
                </div>
                <div>
                  <label className="block font-serif text-xs tracking-[0.3em] uppercase text-[#8b7355]/80 mb-2">
                    Marginalia / Notes
                  </label>
                  <textarea
                    placeholder="Record your observations..."
                    rows={4}
                    className="w-full px-5 py-3 bg-[#f5f0e1] border border-[#8b7355]/30 rounded-sm font-serif text-sm text-[#3d2b1f] placeholder:text-[#3d2b1f]/30 focus:outline-none focus:border-[#8b7355] focus:shadow-[0_0_8px_rgba(139,115,85,0.2)] transition-all duration-700 resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <button className="group relative px-8 py-3 bg-[#3d2b1f] text-[#f5f0e1] font-serif tracking-[0.15em] rounded-sm border border-[#8b7355]/45 hover:shadow-[0_8px_18px_rgba(61,43,31,0.35)] duration-700 ease-in-out transition-shadow text-sm uppercase overflow-hidden">
                    <span className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.2),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                    <span className="relative">Submit</span>
                  </button>
                  <button className="px-6 py-3 font-serif tracking-[0.15em] text-[#3d2b1f]/40 hover:text-[#8b7355] transition-colors duration-700 text-sm uppercase">
                    Clear
                  </button>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* =================================================================
          LIBRARY CARD CATALOG — Interactive scholarly data table
      ================================================================= */}
      <section className="py-20 md:py-32 px-6 bg-[#f5f0e1]">
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="The Stacks" heading="Library Card Catalog" />

          <RevealBlock delay={0.15}>
            <p className="font-serif text-sm text-[#3d2b1f]/60 leading-relaxed mb-8 max-w-2xl italic">
              Select an entry to examine its cataloguing record. Each volume is
              classified according to the Dewey-adjacent system adopted by the
              Academy in its founding charter.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <div className="border border-[#8b7355]/25 rounded-sm overflow-hidden shadow-[inset_0_0_35px_rgba(139,115,85,0.03)]">
              {/* Table header */}
              <div className="hidden md:grid grid-cols-[120px_1fr_160px_100px] bg-[#3d2b1f] border-b border-[#8b7355]/30">
                {["Call Number", "Title & Author", "Subject", "Status"].map((col) => (
                  <div key={col} className="px-5 py-3">
                    <span className="font-serif text-[10px] tracking-[0.3em] uppercase text-[#8b7355]/70">
                      {col}
                    </span>
                  </div>
                ))}
              </div>

              {CATALOG_ENTRIES.map((entry, i) => (
                <div key={entry.callNumber}>
                  <button
                    onClick={() =>
                      setSelectedEntry(selectedEntry === i ? null : i)
                    }
                    className={[
                      "w-full text-left transition-colors duration-700 ease-in-out border-b border-[#8b7355]/15 last:border-b-0",
                      selectedEntry === i
                        ? "bg-[#3d2b1f]/[0.06]"
                        : "bg-[#f5f0e1] hover:bg-[#3d2b1f]/[0.03]",
                    ].join(" ")}
                  >
                    <div className="hidden md:grid grid-cols-[120px_1fr_160px_100px] items-center px-5 py-4">
                      <span className="font-serif text-xs text-[#8b7355] tracking-wide">
                        {entry.callNumber}
                      </span>
                      <div>
                        <p className="font-serif text-sm text-[#3d2b1f] tracking-wide">
                          {entry.title}
                        </p>
                        <p className="font-serif text-xs text-[#3d2b1f]/50 mt-0.5">
                          {entry.author}, {entry.year}
                        </p>
                      </div>
                      <span className="font-serif text-xs text-[#3d2b1f]/60 tracking-wide">
                        {entry.subject}
                      </span>
                      <span
                        className={[
                          "font-serif text-xs tracking-wide",
                          entry.status === "Available"
                            ? "text-[#2d4a3e]"
                            : entry.status === "Restricted"
                            ? "text-[#5c4033]"
                            : "text-[#8b7355]",
                        ].join(" ")}
                      >
                        {entry.status}
                      </span>
                    </div>

                    {/* Mobile row */}
                    <div className="md:hidden px-5 py-4">
                      <p className="font-serif text-sm text-[#3d2b1f] tracking-wide mb-0.5">
                        {entry.title}
                      </p>
                      <p className="font-serif text-xs text-[#8b7355] tracking-wide">
                        {entry.callNumber} &middot; {entry.subject}
                      </p>
                    </div>
                  </button>

                  {/* Expanded detail card */}
                  {selectedEntry === i && (
                    <div className="px-5 md:px-8 py-5 bg-[#3d2b1f]/[0.04] border-b border-[#8b7355]/15">
                      <div className="relative border border-[#8b7355]/25 rounded-sm bg-[#f5f0e1] p-6 overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.2),transparent_55%)] pointer-events-none" />
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#8b7355]/50 via-[#8b7355]/25 to-[#8b7355]/50" />
                        <div className="relative pl-4 grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-[#8b7355]/60 mb-1">
                              Full Title
                            </p>
                            <p className="font-serif text-base text-[#3d2b1f] tracking-wide mb-3">
                              {entry.title}
                            </p>
                            <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-[#8b7355]/60 mb-1">
                              Author
                            </p>
                            <p className="font-serif text-sm text-[#3d2b1f]/70">
                              {entry.author}
                            </p>
                          </div>
                          <div>
                            <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-[#8b7355]/60 mb-1">
                              Location
                            </p>
                            <p className="font-serif text-sm text-[#3d2b1f]/70 mb-3">
                              {entry.shelf}
                            </p>
                            <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-[#8b7355]/60 mb-1">
                              Status
                            </p>
                            <p
                              className={[
                                "font-serif text-sm",
                                entry.status === "Available"
                                  ? "text-[#2d4a3e]"
                                  : entry.status === "Restricted"
                                  ? "text-[#5c4033]"
                                  : "text-[#8b7355]",
                              ].join(" ")}
                            >
                              {entry.status}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* =================================================================
          COLOR PALETTE — Rich dark academic ink samples
      ================================================================= */}
      <section className="py-20 md:py-32 px-6 bg-[#3d2b1f]/[0.04]">
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="The Palette" heading="Ink Samples" />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mt-4">
            {SWATCHES.map((swatch, i) => (
              <RevealBlock key={swatch.hex} delay={i * 0.08}>
                <div className="group border border-[#8b7355]/20 rounded-sm overflow-hidden hover:border-[#8b7355]/50 transition-all duration-700 cursor-default">
                  <div
                    className="h-28 md:h-36 relative overflow-hidden"
                    style={{ backgroundColor: swatch.hex }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.15),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity" />
                    {/* Ink label overlay */}
                    <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <p className="font-serif text-[9px] tracking-[0.25em] uppercase text-[#f5f0e1]/50 leading-none">
                        {swatch.role}
                      </p>
                    </div>
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

          {/* Extended palette note */}
          <RevealBlock delay={0.4}>
            <div className="mt-10 border border-[#8b7355]/25 rounded-sm bg-[#f5f0e1] p-6 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#8b7355]/30" />
              <div className="pl-4">
                <p className="font-serif text-[10px] tracking-[0.3em] uppercase text-[#8b7355]/60 mb-2">
                  Colour Doctrine
                </p>
                <p className="font-serif text-sm text-[#3d2b1f]/65 leading-relaxed">
                  The Dark Academia palette draws exclusively from the warm, aged
                  tones of a Victorian library — leather spines, candle wax, aged
                  vellum, and verdigris-touched ironwork. No cool, clinical, or
                  neon hue may enter this chromatic vocabulary.
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* =================================================================
          DESIGN RULES — Do / Don't curriculum
      ================================================================= */}
      <section className="py-20 md:py-32 px-6 bg-[#f5f0e1]">
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="The Curriculum" heading="Design Rules" />

          <div className="grid md:grid-cols-2 gap-8 mt-4">
            {/* Commandments */}
            <RevealBlock delay={0}>
              <div className="group relative bg-[#f5f0e1] border border-[#8b7355]/25 rounded-sm shadow-[inset_0_0_35px_rgba(139,115,85,0.05)] p-8 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.2),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#2d4a3e]/50" />
                <div className="relative pl-4">
                  <p className="font-serif text-xs tracking-[0.3em] uppercase text-[#2d4a3e] mb-5">
                    Commandments — Faciendum
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Use deep brown, forest green, and antique gold exclusively",
                      "Employ serif fonts throughout — body, headings, captions alike",
                      "Allow duration-700 to duration-1000 for all transitions",
                      "Introduce candlelight glow on hover via radial gradient",
                      "Expanding gold underlines signal interactivity",
                      "Parchment cream as the resting surface color",
                      "Inset shadows suggest paper depth, not harsh drop shadows",
                    ].map((rule) => (
                      <li key={rule} className="flex items-start gap-3">
                        <span className="text-[#2d4a3e] font-serif text-base leading-none mt-0.5 shrink-0">
                          &#x2713;
                        </span>
                        <span className="font-serif text-sm text-[#3d2b1f]/70 leading-relaxed">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>

            {/* Prohibitions */}
            <RevealBlock delay={0.1}>
              <div className="group relative bg-[#f5f0e1] border border-[#8b7355]/25 rounded-sm shadow-[inset_0_0_35px_rgba(139,115,85,0.05)] p-8 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.2),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5c4033]/50" />
                <div className="relative pl-4">
                  <p className="font-serif text-xs tracking-[0.3em] uppercase text-[#5c4033] mb-5">
                    Prohibitions — Vitandum
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Never use neon, high-saturation, or cool-toned colors",
                      "No playful scale(), bounce, or jump animations",
                      "Avoid modern sans-serif fonts — they break the atmosphere",
                      "Do not apply rapid transitions (below duration-500)",
                      "No hard drop-shadows or glowing outlines",
                      "Avoid cold gray or blue backgrounds at any saturation",
                      "Never stack many bright decorative elements — keep it still",
                    ].map((rule) => (
                      <li key={rule} className="flex items-start gap-3">
                        <span className="text-[#5c4033] font-serif text-base leading-none mt-0.5 shrink-0">
                          &#x2717;
                        </span>
                        <span className="font-serif text-sm text-[#3d2b1f]/70 leading-relaxed">
                          {rule}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* =================================================================
          TYPOGRAPHY — Classical serif specimens
      ================================================================= */}
      <section className="py-20 md:py-32 px-6 bg-[#3d2b1f]/[0.04]">
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="The Written Word" heading="Typography" />

          <div className="grid md:grid-cols-2 gap-10 mt-6">
            {/* Display specimen */}
            <RevealBlock delay={0}>
              <div className="bg-[#f5f0e1] border border-[#8b7355]/25 rounded-sm shadow-[inset_0_0_35px_rgba(139,115,85,0.05)] p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.15),transparent_55%)] pointer-events-none" />
                <p className="text-[#8b7355]/60 text-xs tracking-[0.3em] uppercase mb-5 font-serif relative">
                  Display
                </p>
                <div className="relative">
                  <p className="font-serif text-5xl text-[#3d2b1f] leading-tight mb-2">
                    <em>Carpe Diem</em>
                  </p>
                  <p className="font-serif text-3xl text-[#2d4a3e] leading-tight mb-2">
                    Seize the Day
                  </p>
                  <p className="font-serif text-xl text-[#8b7355] leading-snug mb-2">
                    In Pursuit of Beauty
                  </p>
                  <p className="font-serif text-base text-[#3d2b1f]/60 leading-snug italic">
                    Dum spiro, spero — While I breathe, I hope
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Scale specimen */}
            <RevealBlock delay={0.1}>
              <div className="bg-[#f5f0e1] border border-[#8b7355]/25 rounded-sm shadow-[inset_0_0_35px_rgba(139,115,85,0.05)] p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.15),transparent_55%)] pointer-events-none" />
                <p className="text-[#8b7355]/60 text-xs tracking-[0.3em] uppercase mb-5 font-serif relative">
                  {"Body & Detail"}
                </p>
                <p className="font-serif text-base text-[#3d2b1f]/75 leading-relaxed mb-6 relative">
                  Dark Academia typography draws from the great printed traditions —
                  classical serifs with generous tracking, evoking leather-bound
                  volumes and the gravity of the written word.
                </p>
                <div className="space-y-2 relative">
                  {[
                    { label: "Display", cls: "text-2xl" },
                    { label: "Heading", cls: "text-lg" },
                    { label: "Body", cls: "text-base" },
                    { label: "Caption", cls: "text-xs tracking-widest uppercase" },
                  ].map((t) => (
                    <div key={t.label} className="flex items-baseline gap-4">
                      <span className="font-serif text-[10px] tracking-[0.2em] uppercase text-[#8b7355]/50 w-14 shrink-0">
                        {t.label}
                      </span>
                      <span className={`font-serif text-[#3d2b1f]/70 ${t.cls}`}>
                        Aa Bb Cc
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>

          {/* Latin inscriptions display */}
          <RevealBlock delay={0.2}>
            <div className="mt-10 border border-[#8b7355]/25 rounded-sm bg-[#f5f0e1] overflow-hidden">
              <div className="bg-[#3d2b1f] px-6 py-3 border-b border-[#8b7355]/30">
                <p className="font-serif text-[10px] tracking-[0.35em] uppercase text-[#8b7355]/70">
                  Inscriptiones — Classical Mottos
                </p>
              </div>
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#8b7355]/15">
                {INSCRIPTIONS.map((ins, i) => (
                  <div
                    key={ins.latin}
                    className={`group px-6 py-5 relative overflow-hidden cursor-default hover:bg-[#3d2b1f]/[0.03] transition-colors duration-700 ${
                      i % 2 === 0 && i < INSCRIPTIONS.length - 1
                        ? "border-b border-[#8b7355]/15"
                        : ""
                    }`}
                  >
                    <p className="font-serif italic text-lg text-[#3d2b1f] mb-1 tracking-wide group-hover:text-[#8b7355] transition-colors duration-700">
                      {ins.latin}
                    </p>
                    <p className="font-serif text-xs text-[#3d2b1f]/40 tracking-[0.2em] uppercase">
                      {ins.english}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* =================================================================
          QUOTE SHOWCASE — Commonplace book dark-background section
      ================================================================= */}
      <section className="py-20 md:py-32 px-6 bg-[#3d2b1f] relative overflow-hidden">
        {/* Texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
          }}
        />

        <div className="max-w-3xl mx-auto text-center relative">
          <RevealBlock delay={0}>
            <p className="text-[#8b7355]/60 text-xs tracking-[0.35em] uppercase mb-10 font-serif">
              From the Commonplace Book
            </p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="flex-1 h-px bg-[#8b7355]/20" />
              <span className="text-[#8b7355]/40 font-serif text-sm tracking-[0.3em]">
                &#x2767;
              </span>
              <div className="flex-1 h-px bg-[#8b7355]/20" />
            </div>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <blockquote className="font-serif italic text-2xl md:text-3xl text-[#f5f0e1]/80 leading-relaxed mb-8">
              &ldquo;The love of learning, the sequestered nooks,
              <br />
              And all the sweet serenity of books.&rdquo;
            </blockquote>
          </RevealBlock>

          <RevealBlock delay={0.3}>
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

          <RevealBlock delay={0.45}>
            <div className="mt-16 grid md:grid-cols-3 gap-6">
              {[
                {
                  quote: "Ignorance is the curse of God; knowledge is the wing wherewith we fly to heaven.",
                  author: "William Shakespeare",
                  work: "Henry VI, Part 2",
                },
                {
                  quote: "The more that you read, the more things you will know. The more that you learn, the more places you will go.",
                  author: "Dr. Seuss",
                  work: "I Can Read with My Eyes Shut",
                },
                {
                  quote: "Education is the kindling of a flame, not the filling of a vessel.",
                  author: "Socrates",
                  work: "Via Plutarch",
                },
              ].map((q) => (
                <div
                  key={q.author}
                  className="group border border-[#8b7355]/20 rounded-sm p-6 relative overflow-hidden hover:border-[#8b7355]/40 transition-colors duration-700 text-left"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,115,85,0.08),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                  <div className="relative">
                    <p className="font-serif italic text-sm text-[#f5f0e1]/60 leading-relaxed mb-4">
                      &ldquo;{q.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-px bg-[#8b7355]/40" />
                      <p className="font-serif text-xs text-[#8b7355]/70">{q.author}</p>
                    </div>
                    <p className="font-serif text-[10px] text-[#8b7355]/30 tracking-[0.2em] mt-0.5 italic">
                      {q.work}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* =================================================================
          INTERACTION STATES — Animation philosophy specimens
      ================================================================= */}
      <section className="py-20 md:py-32 px-6 bg-[#f5f0e1]">
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="The Behaviour" heading="Interaction States" />

          <div className="grid md:grid-cols-3 gap-6 mt-4">
            <RevealBlock delay={0}>
              <div className="group relative bg-[#f5f0e1] border border-[#8b7355]/25 rounded-sm shadow-[inset_0_0_35px_rgba(139,115,85,0.05)] p-8 overflow-hidden cursor-default min-h-[220px] flex flex-col justify-end">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.25),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                <p className="relative font-serif text-xs tracking-[0.3em] uppercase text-[#8b7355]/60 mb-2">
                  Candlelight Reveal
                </p>
                <p className="relative font-serif text-sm text-[#3d2b1f]/60 leading-relaxed">
                  Hover to see a warm radial glow emerge from the corner, as if
                  a candle were drawn near the page.
                </p>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.08}>
              <div className="group relative bg-[#f5f0e1] border border-[#8b7355]/25 rounded-sm shadow-[inset_0_0_35px_rgba(139,115,85,0.05)] p-8 overflow-hidden cursor-default min-h-[220px] flex flex-col justify-end">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.2),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                <p className="relative font-serif text-xs tracking-[0.3em] uppercase text-[#8b7355]/60 mb-2">
                  Expanding Underline
                </p>
                <div className="relative">
                  <p className="font-serif text-lg text-[#3d2b1f] mb-2 tracking-wide">
                    A Study in Gold
                  </p>
                  <div className="w-8 h-px bg-[#8b7355]/40 group-hover:w-24 group-hover:bg-[#8b7355] duration-1000 ease-in-out transition-all" />
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.16}>
              <div className="group relative bg-[#f5f0e1] border border-[#8b7355]/25 rounded-sm shadow-[inset_0_0_35px_rgba(139,115,85,0.05)] p-8 overflow-hidden cursor-default min-h-[220px] flex flex-col justify-end">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.2),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity pointer-events-none" />
                <p className="relative font-serif text-xs tracking-[0.3em] uppercase text-[#8b7355]/60 mb-2">
                  Antique Slowness
                </p>
                <p className="relative font-serif text-sm text-[#3d2b1f]/60 group-hover:text-[#8b7355] duration-700 ease-in-out transition-colors leading-relaxed">
                  Ink and gold transitions at duration-700 to 1000 — the calm
                  pace of turning a hand-written page.
                </p>
              </div>
            </RevealBlock>
          </div>

          {/* Spine decoration row */}
          <RevealBlock delay={0.25}>
            <div className="mt-10 grid md:grid-cols-4 gap-4">
              {[
                { label: "Leather", bg: "#3d2b1f", accent: "#8b7355" },
                { label: "Vellum", bg: "#f5f0e1", accent: "#3d2b1f" },
                { label: "Verdigris", bg: "#2d4a3e", accent: "#8b7355" },
                { label: "Tobacco", bg: "#5c4033", accent: "#f5f0e1" },
              ].map((spine) => (
                <div
                  key={spine.label}
                  className="group relative rounded-sm overflow-hidden h-28 cursor-default"
                  style={{ backgroundColor: spine.bg }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: spine.accent + "80" }} />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.12),transparent_55%)] opacity-0 group-hover:opacity-100 duration-1000 transition-opacity" />
                  <div className="absolute bottom-3 left-4 right-3">
                    <p
                      className="font-serif text-xs tracking-[0.3em] uppercase"
                      style={{ color: spine.accent }}
                    >
                      {spine.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* =================================================================
          MANUSCRIPT — Illuminated text border specimen
      ================================================================= */}
      <section className="py-20 md:py-32 px-6 bg-[#2d4a3e]/[0.06]">
        <div className="max-w-5xl mx-auto">
          <SectionHeader eyebrow="The Scriptorium" heading="Manuscript Borders" />

          <div className="grid md:grid-cols-2 gap-8 mt-4">
            {/* Illuminated card */}
            <RevealBlock delay={0}>
              <div className="group relative bg-[#f5f0e1] rounded-sm overflow-hidden cursor-default">
                {/* Outer frame */}
                <div className="border-2 border-[#8b7355]/40 group-hover:border-[#8b7355]/70 transition-colors duration-1000 p-1">
                  {/* Inner frame */}
                  <div className="border border-[#8b7355]/20 group-hover:border-[#8b7355]/40 transition-colors duration-1000 p-6 relative">
                    {/* Corner accents */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-[#8b7355]/60" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-[#8b7355]/60" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-[#8b7355]/60" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-[#8b7355]/60" />

                    <div className="py-4 text-center">
                      <p className="font-serif text-[10px] tracking-[0.4em] uppercase text-[#8b7355]/60 mb-4">
                        Illuminated Folio — Anno Domini
                      </p>
                      <p className="font-serif italic text-2xl text-[#3d2b1f] mb-2 leading-tight">
                        De Arte Studendi
                      </p>
                      <p className="font-serif text-xs text-[#3d2b1f]/50 tracking-[0.2em] mb-6">
                        On the Art of Study
                      </p>
                      <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-8 h-px bg-[#8b7355]/30" />
                        <span className="text-[#8b7355]/50 text-sm">&#x2726;</span>
                        <div className="w-8 h-px bg-[#8b7355]/30" />
                      </div>
                      <p className="font-serif text-sm text-[#3d2b1f]/65 leading-relaxed">
                        The scholar who masters this art shall find the library
                        a second home, the lamp a second sun, and the quill a
                        second voice for thoughts too great to hold in silence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>

            {/* Book spine stack illustration */}
            <RevealBlock delay={0.1}>
              <div className="space-y-2">
                <p className="font-serif text-[10px] tracking-[0.35em] uppercase text-[#8b7355]/60 mb-5">
                  Library Spine Collection
                </p>
                {[
                  { title: "Historia Naturalis", author: "Pliny the Elder", color: "#3d2b1f", accent: "#8b7355" },
                  { title: "The Anatomy of Melancholy", author: "Robert Burton", color: "#2d4a3e", accent: "#f5f0e1" },
                  { title: "Meditations", author: "Marcus Aurelius", color: "#5c4033", accent: "#f5f0e1" },
                  { title: "Novum Organum", author: "Francis Bacon", color: "#3d2b1f", accent: "#c9a84c" },
                  { title: "The Prince", author: "Machiavelli", color: "#2d4a3e", accent: "#8b7355" },
                  { title: "Essays", author: "Michel de Montaigne", color: "#5c4033", accent: "#f5f0e1" },
                ].map((book) => (
                  <div
                    key={book.title}
                    className="group flex items-center gap-0 rounded-sm overflow-hidden cursor-default h-10 hover:h-14 transition-all duration-700 ease-in-out"
                    style={{ backgroundColor: book.color }}
                  >
                    <div
                      className="w-1 h-full shrink-0"
                      style={{ backgroundColor: book.accent + "80" }}
                    />
                    <div className="flex items-center justify-between w-full px-4 overflow-hidden">
                      <p
                        className="font-serif text-xs tracking-wide truncate"
                        style={{ color: book.accent }}
                      >
                        {book.title}
                      </p>
                      <p
                        className="font-serif text-[10px] shrink-0 ml-3 opacity-0 group-hover:opacity-70 transition-opacity duration-700"
                        style={{ color: book.accent }}
                      >
                        {book.author}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* =================================================================
          FOOTER — Scholarly closing with seal and navigation
      ================================================================= */}
      <footer className="bg-[#3d2b1f] border-t border-[#8b7355]/30">
        {/* Top footer content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-8">
          <div className="grid md:grid-cols-3 gap-10 md:gap-16 mb-10">
            {/* Seal + identity */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full border border-[#8b7355]/50 flex items-center justify-center">
                  <span className="text-[#8b7355] text-xs font-serif leading-none">DA</span>
                </div>
                <div>
                  <p className="font-serif text-[#f5f0e1]/80 tracking-[0.2em] uppercase text-sm">
                    Dark Academia
                  </p>
                  <p className="font-serif text-[#8b7355]/50 text-xs tracking-wide italic">
                    StyleKit Design System
                  </p>
                </div>
              </div>
              <p className="font-serif text-xs text-[#f5f0e1]/30 leading-relaxed italic">
                A design language rooted in classical scholarship, built for
                those who believe the interface is a kind of architecture.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <p className="font-serif text-[10px] tracking-[0.35em] uppercase text-[#8b7355]/60 mb-4">
                Navigation
              </p>
              <ul className="space-y-2">
                {[
                  { label: "Documentation", href: "/styles/dark-academia" },
                  { label: "All Styles", href: "/styles" },
                  { label: "Home", href: "/" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-serif text-xs tracking-[0.15em] text-[#f5f0e1]/40 hover:text-[#8b7355] transition-colors duration-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Latin motto column */}
            <div>
              <p className="font-serif text-[10px] tracking-[0.35em] uppercase text-[#8b7355]/60 mb-4">
                Motto
              </p>
              <p className="font-serif italic text-[#f5f0e1]/70 text-lg tracking-wide mb-1">
                Veritas Vos Liberabit
              </p>
              <p className="font-serif text-xs text-[#8b7355]/50 tracking-[0.2em] mb-5">
                The Truth Shall Set You Free
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#8b7355]/20" />
                <span className="text-[#8b7355]/30 font-serif text-sm">&#x2767;</span>
                <div className="w-8 h-px bg-[#8b7355]/20" />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#8b7355]/20" />
            <span className="text-[#8b7355]/30 font-serif text-sm">&#x2767;</span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#8b7355]/20" />
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-serif text-xs text-[#f5f0e1]/20 tracking-wide">
              &copy; StyleKit Design System. All knowledge is communal.
            </p>
            <p className="font-serif text-xs text-[#8b7355]/30 tracking-[0.2em] italic">
              Scientia potentia est
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
