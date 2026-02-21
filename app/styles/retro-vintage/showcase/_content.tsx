"use client";

import { useState, useRef, useEffect } from "react";

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
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const PALETTE = [
  {
    name: "Saddle Brown",
    hex: "#8b4513",
    label: "Primary",
    textLight: true,
  },
  {
    name: "Parchment Cream",
    hex: "#f5e6d3",
    label: "Background",
    textLight: false,
  },
  {
    name: "Rust Red",
    hex: "#c94c4c",
    label: "Accent I",
    textLight: true,
  },
  {
    name: "Forest Green",
    hex: "#2e4a3f",
    label: "Accent II",
    textLight: true,
  },
  {
    name: "Golden Tan",
    hex: "#d4a373",
    label: "Accent III",
    textLight: false,
  },
];

type Era = "1920s" | "1940s" | "1960s";

const ERA_DATA: Record<
  Era,
  {
    decade: string;
    subtitle: string;
    description: string;
    bg: string;
    primary: string;
    secondary: string;
    accent: string;
    border: string;
    tagline: string;
    details: string[];
    motif: string;
  }
> = {
  "1920s": {
    decade: "The Twenties",
    subtitle: "Art Deco & Jazz Age",
    description:
      "Bold geometric ornament meets gilded excess. The Roaring Twenties married machine-age precision with opulent decoration — every surface a canvas for symmetry and gold.",
    bg: "#f5e6d3",
    primary: "#8b4513",
    secondary: "#d4a373",
    accent: "#5c2e0a",
    border: "#8b4513",
    tagline: "BOLD · GEOMETRIC · GILDED",
    details: [
      "Chevron and sunburst motifs",
      "Gilded typefaces with serifs",
      "Warm amber and brown palettes",
      "Symmetrical ornament systems",
    ],
    motif: "◆",
  },
  "1940s": {
    decade: "The Forties",
    subtitle: "Wartime Utility & Craft",
    description:
      "Restraint born of necessity, beauty forged from scarcity. Wartime design stripped away excess and revealed the quiet dignity of honest materials and careful craft.",
    bg: "#ede0c8",
    primary: "#2e4a3f",
    secondary: "#8b4513",
    accent: "#1a2d26",
    border: "#2e4a3f",
    tagline: "HONEST · DURABLE · PURPOSEFUL",
    details: [
      "Forest green and brown tones",
      "Utilitarian sans-serif lettering",
      "Heavy-duty border treatments",
      "Minimal ornament, maximum integrity",
    ],
    motif: "\u2605",
  },
  "1960s": {
    decade: "The Sixties",
    subtitle: "Retro Optimism & Pop",
    description:
      "The post-war dream in full bloom. Mid-century optimism poured into furniture, posters, and everyday objects — warm palettes and confident type announcing a modern age.",
    bg: "#f5e6d3",
    primary: "#c94c4c",
    secondary: "#d4a373",
    accent: "#8b2c2c",
    border: "#c94c4c",
    tagline: "OPTIMISTIC · WARM · CONFIDENT",
    details: [
      "Rust red and golden tan palette",
      "Rounded serif display type",
      "Retro poster composition",
      "Warm tones, bold contrast",
    ],
    motif: "●",
  },
};

const TYPOGRAPHY_SAMPLES = [
  {
    label: "Display — Headline",
    size: "text-4xl md:text-5xl",
    weight: "font-serif",
    tracking: "tracking-wide",
    sample: "The Golden Age",
    note: "Serif Display / 48–64px",
  },
  {
    label: "Subheading",
    size: "text-2xl md:text-3xl",
    weight: "font-serif",
    tracking: "tracking-widest",
    sample: "CRAFTED WITH CARE",
    note: "Serif Uppercase / 28–36px / tracking-widest",
  },
  {
    label: "Body Copy",
    size: "text-base md:text-lg",
    weight: "font-serif",
    tracking: "tracking-normal",
    sample:
      "Every detail considered, every line drawn with intention. The warmth of time speaks through aged materials and patient hands.",
    note: "Serif Body / 16–18px / leading-relaxed",
  },
  {
    label: "Caption / Label",
    size: "text-xs",
    weight: "font-serif",
    tracking: "tracking-[0.3em]",
    sample: "EST. MDCCCLXV",
    note: "Small Caps / 10–12px / tracking-[0.3em]",
  },
];

const DESIGN_DOS = [
  "Vintage color tones: sepia, amber, brown series",
  "Paper and aged-texture backgrounds",
  "Serif fonts or vintage-style sans-serif",
  "Thick borders: border-2 or border-4",
  "Decorative corners, dividers, ornaments",
  "Uppercase titles with letter-spacing",
  "Sepia or brightness-90 filters on images",
  "duration-700 ease-in-out on all transitions",
  "Corner ornaments that reveal on hover",
  "Ink & Oxidation: bg darkens, text deepens",
];

const DESIGN_DONTS = [
  "No modern gradients whatsoever",
  "No neon or high-saturation colors",
  "No minimalist flat modern design",
  "No overly rounded corners (border-radius: full)",
  "No glassmorphism or backdrop-blur effects",
  "No scale() or translate-y() on hover — Antique Stillness",
  "No duration-150 or faster — Slow Passage only",
  "No new saturated hues on hover states",
  "No excessive or rapid animations",
  "No bright white backgrounds (#fff)",
];

/* ------------------------------------------------------------------ */
/*  Decorative Sub-Components                                           */
/* ------------------------------------------------------------------ */

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-10 md:mb-14">
      <div className="flex-1 h-px bg-[#8b4513]/30" />
      <div className="flex items-center gap-3">
        <span className="text-[#8b4513]/40 text-sm font-serif">—</span>
        <h2 className="font-serif text-xl md:text-2xl text-[#8b4513] uppercase tracking-[0.25em]">
          {label}
        </h2>
        <span className="text-[#8b4513]/40 text-sm font-serif">—</span>
      </div>
      <div className="flex-1 h-px bg-[#8b4513]/30" />
    </div>
  );
}

function CornerOrnament({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const posClass = {
    tl: "top-2 left-2 border-t-2 border-l-2",
    tr: "top-2 right-2 border-t-2 border-r-2",
    bl: "bottom-2 left-2 border-b-2 border-l-2",
    br: "bottom-2 right-2 border-b-2 border-r-2",
  }[position];

  return (
    <span
      className={`absolute w-5 h-5 border-[#8b4513] opacity-30 group-hover:opacity-100 transition-opacity duration-700 ease-in-out ${posClass}`}
      aria-hidden="true"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Main Export                                                         */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [selectedEra, setSelectedEra] = useState<Era>("1940s");
  const [journalOpen, setJournalOpen] = useState(false);

  const { ref: heroRef, inView: heroInView } = useInView();

  return (
    <div className="min-h-screen bg-[#f5e6d3] font-serif">
      {/* ---------------------------------------------------------------- */}
      {/* 1. NAVIGATION                                                     */}
      {/* ---------------------------------------------------------------- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f5e6d3] border-b-4 border-[#8b4513]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <span className="font-serif text-[#8b4513] uppercase tracking-[0.25em] text-sm md:text-base font-bold">
            Retro Vintage
          </span>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8">
            {[
              ["Components", "#components"],
              ["Palette", "#palette"],
              ["Typography", "#typography"],
              ["Eras", "#eras"],
              ["Rules", "#rules"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="font-serif text-xs uppercase tracking-[0.2em] text-[#8b4513]/70 hover:text-[#5c2e0a] transition-colors duration-700 ease-in-out"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Back link */}
          <a
            href="/styles"
            className="flex items-center gap-2 px-4 py-2 bg-transparent text-[#8b4513] border-2 border-[#8b4513] font-serif uppercase tracking-widest text-xs hover:bg-[#8b4513] hover:text-[#f5e6d3] transition-colors duration-700 ease-in-out"
          >
            <span aria-hidden="true">&#8592;</span>
            <span>StyleKit</span>
          </a>
        </div>
      </nav>

      {/* ---------------------------------------------------------------- */}
      {/* 2. HERO                                                           */}
      {/* ---------------------------------------------------------------- */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-28 px-4 md:px-8 border-b-4 border-[#8b4513] bg-[#f5e6d3]">
        <div
          ref={heroRef}
          className="max-w-4xl mx-auto text-center"
          style={{
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(32px)",
            transition:
              "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}
        >
          {/* Est. label */}
          <p className="text-xs font-serif uppercase tracking-[0.4em] text-[#8b4513]/50 mb-6">
            Est. Since the Golden Age
          </p>

          {/* Double-border frame around headline */}
          <div className="relative inline-block w-full max-w-3xl mx-auto mb-8">
            <div className="border-4 border-[#8b4513] p-1">
              <div className="border-2 border-[#8b4513]/40 px-6 py-8 md:px-12 md:py-12">
                {/* Corner ornaments (always visible in hero) */}
                <span className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#8b4513]" aria-hidden="true" />
                <span className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#8b4513]" aria-hidden="true" />
                <span className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#8b4513]" aria-hidden="true" />
                <span className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#8b4513]" aria-hidden="true" />

                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-[#8b4513] uppercase tracking-[0.1em] leading-tight">
                  Retro Vintage
                </h1>
                <p className="font-serif text-base md:text-xl text-[#8b4513]/70 mt-4 tracking-[0.08em]">
                  Warmth of Time &middot; Handcraft Warmth &middot; Classic Eternal
                </p>
              </div>
            </div>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex-1 h-px bg-[#8b4513]/30 max-w-[120px]" />
            <span className="text-[#8b4513] text-xl" aria-hidden="true">&#10022;</span>
            <div className="h-px bg-[#8b4513]/30 w-8" />
            <span className="text-[#8b4513]/60 text-sm" aria-hidden="true">&#10022;</span>
            <div className="h-px bg-[#8b4513]/30 w-8" />
            <span className="text-[#8b4513] text-xl" aria-hidden="true">&#10022;</span>
            <div className="flex-1 h-px bg-[#8b4513]/30 max-w-[120px]" />
          </div>

          {/* Vintage seal badge */}
          <div className="flex justify-center mb-8">
            <div className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center">
              {/* Outer ring */}
              <div className="absolute inset-0 border-4 border-[#8b4513] rounded-full" />
              {/* Inner ring */}
              <div className="absolute inset-2 border-2 border-[#8b4513]/50 rounded-full" />
              {/* Center content */}
              <div className="text-center z-10 px-2">
                <p className="font-serif text-[8px] uppercase tracking-[0.3em] text-[#8b4513]/60 leading-none mb-1">
                  Since
                </p>
                <p className="font-serif text-2xl md:text-3xl text-[#8b4513] leading-none font-bold">
                  1940
                </p>
                <p className="font-serif text-[8px] uppercase tracking-[0.3em] text-[#8b4513]/60 leading-none mt-1">
                  Authentic
                </p>
              </div>
            </div>
          </div>

          <p className="font-serif text-base md:text-lg text-[#8b4513]/75 max-w-2xl mx-auto leading-relaxed mb-10">
            A design language rooted in the 1940s-1950s aesthetic. Old typography,
            vintage tones, handcrafted textures — and the quiet permanence of
            things built to last.
          </p>

          {/* CTA with double border */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#components"
              className="inline-block px-8 py-4 bg-[#8b4513] text-[#f5e6d3] border-4 border-[#5c2e0a] font-serif uppercase tracking-[0.25em] text-sm hover:bg-[#5c2e0a] transition-colors duration-700 ease-in-out"
            >
              Explore Components
            </a>
            <a
              href="#eras"
              className="inline-block px-8 py-4 bg-[#f5e6d3] text-[#8b4513] border-4 border-double border-[#8b4513] font-serif uppercase tracking-[0.25em] text-sm hover:bg-[#eedbc2] hover:text-[#5c2e0a] transition-colors duration-700 ease-in-out"
            >
              Browse Eras
            </a>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 3. COMPONENT DEMOS                                                */}
      {/* ---------------------------------------------------------------- */}
      <section id="components" className="py-16 md:py-24 px-4 md:px-8 border-b-4 border-[#8b4513]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionDivider label="Component Demos" />
          </RevealBlock>

          {/* --- Buttons --- */}
          <RevealBlock delay={0.05}>
            <div className="mb-12 md:mb-16">
              <p className="text-xs font-serif uppercase tracking-[0.3em] text-[#8b4513]/50 mb-6">
                Buttons — Double-border, Serif, Slow Passage
              </p>
              <div className="flex flex-wrap gap-4 md:gap-6">
                {/* Primary: double-border filled */}
                <button className="px-7 py-3 bg-[#8b4513] text-[#f5e6d3] border-4 border-double border-[#5c2e0a] font-serif uppercase tracking-[0.25em] text-xs hover:bg-[#5c2e0a] transition-colors duration-700 ease-in-out">
                  Discover More
                </button>

                {/* Outlined: double-border ghost */}
                <button className="px-7 py-3 bg-[#f5e6d3] text-[#8b4513] border-4 border-double border-[#8b4513] font-serif uppercase tracking-[0.25em] text-xs hover:bg-[#eedbc2] hover:text-[#5c2e0a] transition-colors duration-700 ease-in-out">
                  Learn More
                </button>

                {/* Rust accent */}
                <button className="px-7 py-3 bg-[#c94c4c] text-[#f5e6d3] border-4 border-[#8b2c2c] font-serif uppercase tracking-[0.25em] text-xs hover:bg-[#8b2c2c] transition-colors duration-700 ease-in-out">
                  Special Offer
                </button>

                {/* Forest green */}
                <button className="px-7 py-3 bg-[#2e4a3f] text-[#f5e6d3] border-4 border-[#1a2d26] font-serif uppercase tracking-[0.25em] text-xs hover:bg-[#1a2d26] transition-colors duration-700 ease-in-out">
                  Read Story
                </button>

                {/* Est. badge-style */}
                <button className="px-8 py-4 bg-[#f5e6d3] text-[#8b4513] border-4 border-double border-[#8b4513] font-serif uppercase tracking-[0.35em] text-[10px] hover:bg-[#eedbc2] hover:text-[#5c2e0a] transition-colors duration-700 ease-in-out">
                  Est. 1940
                </button>
              </div>
            </div>
          </RevealBlock>

          {/* --- Cards with corner ornament reveal --- */}
          <RevealBlock delay={0.1}>
            <div className="mb-12 md:mb-16">
              <p className="text-xs font-serif uppercase tracking-[0.3em] text-[#8b4513]/50 mb-6">
                Cards — Corner Reveal &amp; Ink Oxidation on Hover
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    tag: "Chapter One",
                    title: "The Beginning",
                    body: "A story that spans generations, told through craftsmanship and tradition passed down with patient care.",
                    accent: "#c94c4c",
                  },
                  {
                    tag: "Chapter Two",
                    title: "The Journey",
                    body: "Every step taken with purpose, every detail considered with care. The road itself becomes the craft.",
                    accent: "#2e4a3f",
                  },
                  {
                    tag: "Chapter Three",
                    title: "The Legacy",
                    body: "What we create today becomes tomorrow's heritage — objects that carry the warmth of the hands that made them.",
                    accent: "#8b4513",
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className="group relative bg-[#f5e6d3] border-2 border-[#8b4513] p-6 md:p-8 hover:bg-[#eedbc2] transition-colors duration-700 ease-in-out"
                  >
                    {/* Corner ornaments — Corner Reveal pattern */}
                    <CornerOrnament position="tl" />
                    <CornerOrnament position="tr" />
                    <CornerOrnament position="bl" />
                    <CornerOrnament position="br" />

                    {/* Top accent bar */}
                    <div
                      className="h-1 w-12 mb-4"
                      style={{ backgroundColor: card.accent }}
                    />

                    <p className="text-[10px] font-serif uppercase tracking-[0.35em] text-[#8b4513]/50 mb-2">
                      {card.tag}
                    </p>

                    {/* Ink oxidation: title deepens on hover */}
                    <h3 className="text-xl md:text-2xl font-serif text-[#8b4513] group-hover:text-[#5c2e0a] transition-colors duration-700 ease-in-out mt-1 mb-3">
                      {card.title}
                    </h3>

                    <p className="font-serif text-sm md:text-base text-[#8b4513]/75 group-hover:text-[#5c2e0a]/80 leading-relaxed transition-colors duration-700 ease-in-out">
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* --- Inputs --- */}
          <RevealBlock delay={0.15}>
            <div>
              <p className="text-xs font-serif uppercase tracking-[0.3em] text-[#8b4513]/50 mb-6">
                Inputs — Serif Label, Transparent bg, Brown Border
              </p>
              <div className="max-w-2xl grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-serif uppercase tracking-[0.3em] text-[#8b4513]">
                    Your Name
                  </label>
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Enter your name..."
                    className="w-full px-4 py-3 bg-transparent border-b-2 border-[#8b4513] text-[#8b4513] font-serif placeholder:text-[#8b4513]/35 focus:outline-none focus:border-[#5c2e0a] transition-colors duration-700 ease-in-out"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-serif uppercase tracking-[0.3em] text-[#8b4513]">
                    Your Era
                  </label>
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="e.g. 1940s..."
                    className="w-full px-4 py-3 bg-transparent border-b-2 border-[#8b4513] text-[#8b4513] font-serif placeholder:text-[#8b4513]/35 focus:outline-none focus:border-[#5c2e0a] transition-colors duration-700 ease-in-out"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="block text-[10px] font-serif uppercase tracking-[0.3em] text-[#8b4513]">
                    Your Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Write your message..."
                    className="w-full px-4 py-3 bg-transparent border-2 border-[#8b4513] text-[#8b4513] font-serif placeholder:text-[#8b4513]/35 focus:outline-none focus:border-[#5c2e0a] transition-colors duration-700 ease-in-out resize-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <button className="px-8 py-3 bg-[#8b4513] text-[#f5e6d3] border-2 border-[#5c2e0a] font-serif uppercase tracking-[0.25em] text-xs hover:bg-[#5c2e0a] transition-colors duration-700 ease-in-out">
                    Send Correspondence
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 4. COLOR PALETTE                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section id="palette" className="py-16 md:py-24 px-4 md:px-8 border-b-4 border-[#8b4513] bg-[#ede0c8]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <SectionDivider label="Vintage Color Palette" />
          </RevealBlock>

          <RevealBlock delay={0.05}>
            <p className="font-serif text-sm md:text-base text-[#8b4513]/70 text-center max-w-2xl mx-auto mb-10 leading-relaxed tracking-wide">
              Five aged-paper swatches constitute the full Retro Vintage palette.
              Each tone is drawn from pre-war printing inks, leather-bound volumes,
              and the slow oxidation of honest materials.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {PALETTE.map((color, i) => (
              <RevealBlock key={color.name} delay={i * 0.07}>
                <div className="group relative border-2 border-[#8b4513] bg-[#f5e6d3] overflow-hidden hover:border-[#5c2e0a] transition-colors duration-700 ease-in-out">
                  {/* Swatch */}
                  <div
                    className="h-24 md:h-32 w-full"
                    style={{ backgroundColor: color.hex }}
                  />
                  {/* Label area with aged-paper feel */}
                  <div className="p-3 md:p-4 border-t-2 border-[#8b4513]/50">
                    <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#8b4513]/50 mb-1">
                      {color.label}
                    </p>
                    <p className="font-serif text-sm md:text-base text-[#8b4513] group-hover:text-[#5c2e0a] transition-colors duration-700 ease-in-out leading-tight">
                      {color.name}
                    </p>
                    <p className="font-serif text-[10px] tracking-widest text-[#8b4513]/50 mt-1 uppercase">
                      {color.hex}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Tonal strip */}
          <RevealBlock delay={0.4}>
            <div className="mt-10">
              <p className="text-[10px] font-serif uppercase tracking-[0.3em] text-[#8b4513]/50 mb-3 text-center">
                Tonal Gradient — Saddle Brown Family
              </p>
              <div className="flex h-10 border-2 border-[#8b4513] overflow-hidden">
                {["#f5e6d3", "#eedbc2", "#d4a373", "#8b4513", "#5c2e0a", "#3b1a08"].map(
                  (hex) => (
                    <div
                      key={hex}
                      className="flex-1"
                      style={{ backgroundColor: hex }}
                    />
                  )
                )}
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[9px] font-serif uppercase tracking-widest text-[#8b4513]/50">
                  Parchment Light
                </span>
                <span className="text-[9px] font-serif uppercase tracking-widest text-[#8b4513]/50">
                  Deep Espresso
                </span>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 5. TYPOGRAPHY SHOWCASE                                            */}
      {/* ---------------------------------------------------------------- */}
      <section id="typography" className="py-16 md:py-24 px-4 md:px-8 border-b-4 border-[#8b4513]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <SectionDivider label="Typography System" />
          </RevealBlock>

          {/* Type samples */}
          <div className="space-y-8 mb-14">
            {TYPOGRAPHY_SAMPLES.map((s, i) => (
              <RevealBlock key={s.label} delay={i * 0.08}>
                <div className="group relative border-l-4 border-[#8b4513]/30 pl-6 md:pl-8 hover:border-[#8b4513] transition-colors duration-700 ease-in-out">
                  <p className="text-[9px] font-serif uppercase tracking-[0.35em] text-[#8b4513]/40 mb-2">
                    {s.label} &mdash; {s.note}
                  </p>
                  <p
                    className={`${s.size} ${s.weight} ${s.tracking} text-[#8b4513] group-hover:text-[#5c2e0a] transition-colors duration-700 ease-in-out leading-snug`}
                  >
                    {s.sample}
                  </p>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Decorative divider band */}
          <RevealBlock delay={0.35}>
            <div className="relative border-y-2 border-[#8b4513]/30 py-8 text-center">
              <div className="flex items-center justify-center gap-3">
                <div className="flex-1 h-px bg-[#8b4513]/20" />
                <span className="text-[#8b4513]/40 text-base" aria-hidden="true">&#10022;</span>
                <span className="font-serif text-xs uppercase tracking-[0.4em] text-[#8b4513]/50 px-4">
                  Ornamental Divider
                </span>
                <span className="text-[#8b4513]/40 text-base" aria-hidden="true">&#10022;</span>
                <div className="flex-1 h-px bg-[#8b4513]/20" />
              </div>
            </div>
          </RevealBlock>

          {/* Vintage badge layout */}
          <RevealBlock delay={0.4}>
            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {[
                { top: "Fine", main: "Crafted", sub: "Est. 1940", accent: "#8b4513" },
                { top: "Authentic", main: "Heritage", sub: "Since The Golden Age", accent: "#2e4a3f" },
                { top: "Limited", main: "Edition", sub: "No. 0001 of 500", accent: "#c94c4c" },
              ].map((badge) => (
                <div
                  key={badge.main}
                  className="group relative border-4 border-double p-6 text-center hover:bg-[#eedbc2] transition-colors duration-700 ease-in-out"
                  style={{ borderColor: badge.accent }}
                >
                  <CornerOrnament position="tl" />
                  <CornerOrnament position="tr" />
                  <CornerOrnament position="bl" />
                  <CornerOrnament position="br" />

                  <p
                    className="text-[10px] font-serif uppercase tracking-[0.4em] mb-1 transition-colors duration-700 ease-in-out"
                    style={{ color: badge.accent }}
                  >
                    {badge.top}
                  </p>
                  <p
                    className="font-serif text-3xl md:text-4xl uppercase tracking-[0.15em] group-hover:text-[#5c2e0a] transition-colors duration-700 ease-in-out"
                    style={{ color: badge.accent }}
                  >
                    {badge.main}
                  </p>
                  <div
                    className="h-px my-3 mx-auto w-16"
                    style={{ backgroundColor: badge.accent, opacity: 0.4 }}
                  />
                  <p
                    className="text-[10px] font-serif uppercase tracking-[0.3em] transition-colors duration-700 ease-in-out"
                    style={{ color: badge.accent, opacity: 0.6 }}
                  >
                    {badge.sub}
                  </p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 6. ERA SHOWCASE — useState Decade Selector                       */}
      {/* ---------------------------------------------------------------- */}
      <section id="eras" className="py-16 md:py-24 px-4 md:px-8 border-b-4 border-[#8b4513] bg-[#ede0c8]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <SectionDivider label="Era Showcase" />
          </RevealBlock>

          <RevealBlock delay={0.05}>
            <p className="font-serif text-sm md:text-base text-[#8b4513]/70 text-center max-w-xl mx-auto mb-10 leading-relaxed">
              Select a decade to see how the Retro Vintage palette shifts its tone
              while preserving the warmth and authenticity of the era.
            </p>
          </RevealBlock>

          {/* Decade selector tabs */}
          <RevealBlock delay={0.1}>
            <div className="flex justify-center mb-10">
              <div className="inline-flex border-2 border-[#8b4513] overflow-hidden">
                {(["1920s", "1940s", "1960s"] as Era[]).map((era) => (
                  <button
                    key={era}
                    onClick={() => setSelectedEra(era)}
                    className={`px-6 py-3 font-serif uppercase tracking-[0.2em] text-xs transition-colors duration-700 ease-in-out border-r-2 border-[#8b4513] last:border-r-0 ${
                      selectedEra === era
                        ? "bg-[#8b4513] text-[#f5e6d3]"
                        : "bg-[#f5e6d3] text-[#8b4513] hover:bg-[#eedbc2] hover:text-[#5c2e0a]"
                    }`}
                  >
                    {era}
                  </button>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* Era content panel */}
          <div
            className="border-4 border-double p-8 md:p-12 transition-colors duration-700 ease-in-out"
            style={{
              backgroundColor: ERA_DATA[selectedEra].bg,
              borderColor: ERA_DATA[selectedEra].border,
            }}
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left: text content */}
              <div>
                <p
                  className="text-[10px] font-serif uppercase tracking-[0.4em] mb-2 transition-colors duration-700 ease-in-out"
                  style={{ color: ERA_DATA[selectedEra].primary, opacity: 0.6 }}
                >
                  {ERA_DATA[selectedEra].subtitle}
                </p>
                <h3
                  className="font-serif text-3xl md:text-4xl uppercase tracking-[0.1em] mb-2 transition-colors duration-700 ease-in-out"
                  style={{ color: ERA_DATA[selectedEra].primary }}
                >
                  {ERA_DATA[selectedEra].decade}
                </h3>
                <div
                  className="h-px w-20 my-4 transition-colors duration-700 ease-in-out"
                  style={{ backgroundColor: ERA_DATA[selectedEra].primary, opacity: 0.4 }}
                />
                <p
                  className="font-serif text-sm md:text-base leading-relaxed mb-6 transition-colors duration-700 ease-in-out"
                  style={{ color: ERA_DATA[selectedEra].primary, opacity: 0.8 }}
                >
                  {ERA_DATA[selectedEra].description}
                </p>
                <p
                  className="text-[10px] font-serif uppercase tracking-[0.35em] transition-colors duration-700 ease-in-out"
                  style={{ color: ERA_DATA[selectedEra].secondary }}
                >
                  {ERA_DATA[selectedEra].tagline}
                </p>
              </div>

              {/* Right: details list + motif */}
              <div>
                {/* Giant decorative motif */}
                <div className="text-center mb-6">
                  <span
                    className="font-serif text-7xl md:text-8xl transition-colors duration-700 ease-in-out"
                    style={{
                      color: ERA_DATA[selectedEra].primary,
                      opacity: 0.12,
                    }}
                    aria-hidden="true"
                  >
                    {ERA_DATA[selectedEra].motif}
                  </span>
                </div>

                <ul className="space-y-3">
                  {ERA_DATA[selectedEra].details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-start gap-3 font-serif text-sm transition-colors duration-700 ease-in-out"
                      style={{ color: ERA_DATA[selectedEra].primary, opacity: 0.8 }}
                    >
                      <span
                        className="mt-0.5 flex-shrink-0 text-xs transition-colors duration-700 ease-in-out"
                        style={{ color: ERA_DATA[selectedEra].secondary }}
                        aria-hidden="true"
                      >
                        &#10022;
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>

                {/* Era color sample chips */}
                <div className="flex gap-2 mt-6">
                  {[
                    ERA_DATA[selectedEra].bg,
                    ERA_DATA[selectedEra].primary,
                    ERA_DATA[selectedEra].secondary,
                    ERA_DATA[selectedEra].accent,
                  ].map((hex) => (
                    <div
                      key={hex}
                      className="w-8 h-8 border border-[#8b4513]/40 transition-colors duration-700 ease-in-out"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Journal interaction */}
          <RevealBlock delay={0.2}>
            <div className="mt-10">
              <div className="border-2 border-[#8b4513]">
                <button
                  onClick={() => setJournalOpen((v) => !v)}
                  className="w-full flex items-center justify-between px-6 py-4 bg-[#8b4513] text-[#f5e6d3] font-serif uppercase tracking-[0.2em] text-xs hover:bg-[#5c2e0a] transition-colors duration-700 ease-in-out"
                  aria-expanded={journalOpen}
                >
                  <span>Open the Field Journal</span>
                  <span
                    className="text-lg leading-none transition-transform duration-700 ease-in-out"
                    style={{
                      display: "inline-block",
                      transform: journalOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {journalOpen && (
                  <div className="p-6 md:p-8 bg-[#f5e6d3] border-t-2 border-[#8b4513]">
                    <p className="text-[10px] font-serif uppercase tracking-[0.35em] text-[#8b4513]/50 mb-3">
                      Field Notes &mdash; Era Observations
                    </p>
                    <p className="font-serif text-sm md:text-base text-[#8b4513]/80 leading-relaxed max-w-prose">
                      The {ERA_DATA[selectedEra].decade} taught designers that beauty
                      need not shout to be heard. The{" "}
                      {ERA_DATA[selectedEra].subtitle.toLowerCase()} period gave us
                      forms that have outlasted every trend that followed. What
                      endures is not novelty but integrity: materials chosen for
                      permanence, type set for readability across generations, and
                      color that ages the way good leather does &mdash; with character.
                    </p>
                    <div className="mt-4 pt-4 border-t border-[#8b4513]/20">
                      <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#8b4513]/40">
                        Recorded {selectedEra} &mdash; Field Observer
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 7. DESIGN RULES — Do / Don't                                     */}
      {/* ---------------------------------------------------------------- */}
      <section id="rules" className="py-16 md:py-24 px-4 md:px-8 border-b-4 border-[#8b4513]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <SectionDivider label="Design Rules" />
          </RevealBlock>

          <RevealBlock delay={0.05}>
            <p className="font-serif text-sm md:text-base text-[#8b4513]/70 text-center max-w-xl mx-auto mb-12 leading-relaxed">
              The Retro Vintage language is built on restraint and intentionality.
              These rules guard the authenticity of the aesthetic.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Do list — vintage newspaper style */}
            <RevealBlock delay={0.1}>
              <div className="group relative border-2 border-[#2e4a3f] bg-[#f5e6d3] hover:bg-[#eedbc2] transition-colors duration-700 ease-in-out">
                <CornerOrnament position="tl" />
                <CornerOrnament position="tr" />
                <CornerOrnament position="bl" />
                <CornerOrnament position="br" />

                <div className="border-b-2 border-[#2e4a3f] px-6 py-4 bg-[#2e4a3f]">
                  <h3 className="font-serif text-sm md:text-base uppercase tracking-[0.25em] text-[#f5e6d3]">
                    &#10003; Must Employ
                  </h3>
                </div>
                <ul className="p-6 md:p-8 space-y-3">
                  {DESIGN_DOS.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 font-serif text-sm text-[#2e4a3f]/80 group-hover:text-[#1a2d26]/80 transition-colors duration-700 ease-in-out leading-relaxed"
                    >
                      <span className="text-[#2e4a3f] mt-0.5 flex-shrink-0 group-hover:text-[#1a2d26] transition-colors duration-700 ease-in-out" aria-hidden="true">
                        &#9642;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            {/* Don't list — old wanted-poster style */}
            <RevealBlock delay={0.15}>
              <div className="group relative border-2 border-[#c94c4c] bg-[#f5e6d3] hover:bg-[#eedbc2] transition-colors duration-700 ease-in-out">
                <CornerOrnament position="tl" />
                <CornerOrnament position="tr" />
                <CornerOrnament position="bl" />
                <CornerOrnament position="br" />

                <div className="border-b-2 border-[#c94c4c] px-6 py-4 bg-[#c94c4c]">
                  <h3 className="font-serif text-sm md:text-base uppercase tracking-[0.25em] text-[#f5e6d3]">
                    &#10007; Must Avoid
                  </h3>
                </div>
                <ul className="p-6 md:p-8 space-y-3">
                  {DESIGN_DONTS.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 font-serif text-sm text-[#c94c4c]/80 group-hover:text-[#8b2c2c]/80 transition-colors duration-700 ease-in-out leading-relaxed"
                    >
                      <span className="text-[#c94c4c] mt-0.5 flex-shrink-0 group-hover:text-[#8b2c2c] transition-colors duration-700 ease-in-out" aria-hidden="true">
                        &#9642;
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>

          {/* Animation rules reference */}
          <RevealBlock delay={0.25}>
            <div className="mt-10 border-2 border-[#8b4513] bg-[#f5e6d3]">
              <div className="border-b-2 border-[#8b4513] px-6 py-4 bg-[#8b4513]">
                <h3 className="font-serif text-sm md:text-base uppercase tracking-[0.25em] text-[#f5e6d3]">
                  The Four Animation Laws
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-px bg-[#8b4513]/20 p-px">
                {[
                  {
                    name: "Antique Stillness",
                    rule: "Zero scale() or translate-y() on interactive elements. Objects do not leap. They breathe.",
                    color: "#8b4513",
                  },
                  {
                    name: "Ink & Oxidation",
                    rule: "Hover darkens backgrounds (hover:bg-[#eedbc2]) and deepens text (group-hover:text-[#5c2e0a]). No color additions.",
                    color: "#5c2e0a",
                  },
                  {
                    name: "Slow Passage",
                    rule: "All transitions minimum duration-700 ease-in-out. Duration-150 is categorically forbidden.",
                    color: "#2e4a3f",
                  },
                  {
                    name: "Corner Reveal",
                    rule: "Corner ornaments begin at opacity-30 and transition to opacity-100 on group hover, duration-700.",
                    color: "#c94c4c",
                  },
                ].map((law) => (
                  <div
                    key={law.name}
                    className="group bg-[#f5e6d3] p-5 md:p-6 hover:bg-[#eedbc2] transition-colors duration-700 ease-in-out"
                  >
                    <p
                      className="font-serif text-xs uppercase tracking-[0.25em] mb-2 transition-colors duration-700 ease-in-out"
                      style={{ color: law.color }}
                    >
                      {law.name}
                    </p>
                    <p className="font-serif text-sm text-[#8b4513]/70 group-hover:text-[#5c2e0a]/80 leading-relaxed transition-colors duration-700 ease-in-out">
                      {law.rule}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>

          {/* Vintage newspaper-style contrast comparison */}
          <RevealBlock delay={0.3}>
            <div className="mt-10">
              <p className="text-[10px] font-serif uppercase tracking-[0.3em] text-[#8b4513]/50 mb-6 text-center">
                Visual Contrast &mdash; Retro Vintage vs. Modern Flat
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Retro Vintage example */}
                <div className="border-2 border-[#8b4513] bg-[#f5e6d3] p-5">
                  <p className="text-[9px] font-serif uppercase tracking-[0.35em] text-[#2e4a3f] mb-3">
                    &#10003; Retro Vintage
                  </p>
                  <div className="border-4 border-double border-[#8b4513] p-4 relative">
                    <span className="absolute top-1 left-1 w-3 h-3 border-t border-l border-[#8b4513]" aria-hidden="true" />
                    <span className="absolute top-1 right-1 w-3 h-3 border-t border-r border-[#8b4513]" aria-hidden="true" />
                    <p className="text-[9px] font-serif uppercase tracking-[0.3em] text-[#8b4513]/50 mb-1">
                      Established
                    </p>
                    <p className="font-serif text-xl text-[#8b4513] tracking-wide">
                      The Heritage Collection
                    </p>
                    <div className="h-px bg-[#8b4513]/30 my-2" />
                    <p className="font-serif text-xs text-[#8b4513]/70 leading-relaxed">
                      Handcrafted with patience and care, each piece tells a story
                      of enduring quality.
                    </p>
                  </div>
                </div>

                {/* Modern flat — visually flagged as wrong */}
                <div className="border-2 border-[#c94c4c]/50 bg-[#f5e6d3] p-5 relative">
                  <p className="text-[9px] font-serif uppercase tracking-[0.35em] text-[#c94c4c] mb-3">
                    &#10007; Modern Flat (Avoid)
                  </p>
                  {/* Diagonal "wrong" stamp overlay */}
                  <div className="absolute inset-5 flex items-center justify-center pointer-events-none z-10" aria-hidden="true">
                    <span className="font-serif text-[#c94c4c]/20 text-5xl md:text-6xl uppercase tracking-widest rotate-[-12deg]">
                      Avoid
                    </span>
                  </div>
                  <div className="rounded-2xl bg-white p-4 shadow-lg">
                    <p className="text-[9px] font-sans text-gray-400 tracking-normal mb-1">
                      Collection
                    </p>
                    <p className="font-sans text-xl text-gray-800 font-bold">
                      The Heritage Collection
                    </p>
                    <div className="h-px bg-gray-100 my-2" />
                    <p className="font-sans text-xs text-gray-500 leading-relaxed">
                      Handcrafted with patience and care, each piece tells a story.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* 8. FOOTER                                                         */}
      {/* ---------------------------------------------------------------- */}
      <footer className="bg-[#f5e6d3] border-t-4 border-[#8b4513]">
        {/* Ornamental top border band */}
        <div className="border-b-2 border-[#8b4513]/20 px-4 py-3 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="flex-1 h-px bg-[#8b4513]/20 max-w-[100px]" />
            <span className="text-[#8b4513]/30 text-xs" aria-hidden="true">
              &#10022; &#10022; &#10022;
            </span>
            <div className="flex-1 h-px bg-[#8b4513]/20 max-w-[100px]" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
          {/* Footer content grid */}
          <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-12">
            {/* Brand */}
            <div>
              <p className="text-[10px] font-serif uppercase tracking-[0.4em] text-[#8b4513]/40 mb-2">
                The Collection
              </p>
              <p className="font-serif text-2xl text-[#8b4513] tracking-wide mb-3">
                Retro Vintage
              </p>
              <div className="h-px bg-[#8b4513]/20 mb-3 w-16" />
              <p className="font-serif text-xs text-[#8b4513]/60 leading-relaxed">
                A design language born from the 1940s-1950s aesthetic. Warmth,
                permanence, and the beauty of things built to last.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <p className="text-[10px] font-serif uppercase tracking-[0.4em] text-[#8b4513]/40 mb-4">
                In This Showcase
              </p>
              <ul className="space-y-2">
                {[
                  ["Components", "#components"],
                  ["Color Palette", "#palette"],
                  ["Typography", "#typography"],
                  ["Era Showcase", "#eras"],
                  ["Design Rules", "#rules"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="font-serif text-xs uppercase tracking-[0.2em] text-[#8b4513]/60 hover:text-[#5c2e0a] transition-colors duration-700 ease-in-out"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Attribution */}
            <div>
              <p className="text-[10px] font-serif uppercase tracking-[0.4em] text-[#8b4513]/40 mb-4">
                Style Details
              </p>
              <div className="space-y-2">
                {[
                  { k: "Era", v: "1940s–1950s" },
                  { k: "Primary", v: "#8b4513 Saddle Brown" },
                  { k: "Base", v: "#f5e6d3 Parchment" },
                  { k: "Transitions", v: "duration-700 ease-in-out" },
                  { k: "Motion", v: "Antique Stillness" },
                ].map(({ k, v }) => (
                  <div key={k} className="flex gap-2">
                    <span className="font-serif text-[10px] uppercase tracking-widest text-[#8b4513]/40 w-24 flex-shrink-0">
                      {k}
                    </span>
                    <span className="font-serif text-[10px] text-[#8b4513]/70">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t-2 border-[#8b4513]/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-[#8b4513]/40">
              StyleKit &mdash; Retro Vintage Showcase
            </p>

            <div className="flex items-center gap-4">
              <span className="text-[#8b4513]/20 text-sm" aria-hidden="true">
                &#10022;
              </span>
              <a
                href="/styles/retro-vintage"
                className="font-serif text-[10px] uppercase tracking-[0.25em] text-[#8b4513]/50 hover:text-[#5c2e0a] transition-colors duration-700 ease-in-out"
              >
                View Documentation
              </a>
              <span className="text-[#8b4513]/20 text-sm" aria-hidden="true">
                &#10022;
              </span>
              <a
                href="/styles"
                className="font-serif text-[10px] uppercase tracking-[0.25em] text-[#8b4513]/50 hover:text-[#5c2e0a] transition-colors duration-700 ease-in-out"
              >
                All Styles
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
