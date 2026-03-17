"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks -- ZERO @/components/showcase imports                 */
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
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Color tokens                                                       */
/* ------------------------------------------------------------------ */

const WARM_WHITE = "#faf9f6";
const DARK = "#1a1a1a";
const GOLD = "#c9a96e";
const MUTED = "#8b7355";
const CREAM = "#e8e0d4";
const PRODUCT_BG = "#f0ece4";
const DARK_BG = "#2c2c2c";

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function DiamondIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.7 10.3 12 21.3l9.3-11L16.5 3h-9l-4.8 7.3z" />
      <path d="M2.7 10.3h18.6" />
      <path d="M12 21.3 7.5 3" />
      <path d="M12 21.3 16.5 3" />
      <path d="M12 3v7.3" />
    </svg>
  );
}

function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function BagIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Gold Divider                                                       */
/* ------------------------------------------------------------------ */

function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#c9a96e] to-transparent" />
    </div>
  );
}

function GoldDiamondDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9a96e]" />
      <DiamondIcon className="w-4 h-4 text-[#c9a96e]" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9a96e]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main showcase                                                      */
/* ------------------------------------------------------------------ */

export default function LuxuryRetailShowcase() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(0);
  const [emailValue, setEmailValue] = useState("");

  const sizes = ["XS", "S", "M", "L", "XL"];
  const colorOptions = [
    { name: "Ivory", color: "#f0ece4" },
    { name: "Noir", color: "#1a1a1a" },
    { name: "Gold", color: "#c9a96e" },
    { name: "Camel", color: "#8b7355" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: WARM_WHITE }}>

      {/* ── Section 1: Brand Navigation ── */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b" style={{ borderColor: CREAM, backgroundColor: WARM_WHITE }}>
        <div className="flex gap-6 md:gap-8">
          <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase cursor-pointer transition-colors hover:text-[#1a1a1a]" style={{ color: MUTED }}>Women</span>
          <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase cursor-pointer transition-colors hover:text-[#1a1a1a]" style={{ color: MUTED }}>Men</span>
          <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase cursor-pointer transition-colors hover:text-[#1a1a1a] hidden md:inline" style={{ color: MUTED }}>Jewellery</span>
        </div>
        <span className="font-serif text-xl md:text-2xl tracking-[0.15em]" style={{ color: DARK }}>MAISON</span>
        <div className="flex items-center gap-4 md:gap-6">
          <SearchIcon className="w-4 h-4 text-[#8b7355]" />
          <HeartIcon className="w-4 h-4 hidden md:block text-[#8b7355]" />
          <BagIcon className="w-4 h-4 text-[#8b7355]" />
        </div>
      </nav>

      {/* ── Section 2: Fullscreen Hero ── */}
      <RevealBlock>
        <section className="min-h-[85vh] flex items-center justify-center px-6 md:px-12" style={{ backgroundColor: WARM_WHITE }}>
          <div className="text-center max-w-2xl">
            <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase mb-6 md:mb-8" style={{ color: GOLD }}>Autumn / Winter 2026</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight mb-6" style={{ color: DARK }}>
              The Art of<br />Timeless Elegance
            </h1>
            <p className="text-sm md:text-base leading-relaxed tracking-wide mb-8 md:mb-10 max-w-lg mx-auto" style={{ color: MUTED }}>
              A curated collection where heritage meets modern refinement. Each piece tells a story of craftsmanship perfected over generations.
            </p>
            <button
              className="px-10 py-3 border text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#1a1a1a] hover:text-[#faf9f6]"
              style={{ borderColor: DARK, color: DARK }}
            >
              Explore Collection
            </button>
          </div>
        </section>
      </RevealBlock>

      <GoldDivider className="mx-12 md:mx-24" />

      {/* ── Section 3: Product Editorial Grid ── */}
      <RevealBlock>
        <section className="px-6 md:px-12 py-16 md:py-24" style={{ backgroundColor: WARM_WHITE }}>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>New Arrivals</p>
            <h2 className="font-serif text-2xl md:text-3xl" style={{ color: DARK }}>Curated Selection</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
            {[
              { label: "Outerwear", title: "Cashmere Coat", price: "$2,480" },
              { label: "Accessories", title: "Leather Tote", price: "$1,890" },
              { label: "Ready-to-wear", title: "Silk Blouse", price: "$680" },
              { label: "Jewellery", title: "Chain Bracelet", price: "$1,150" },
            ].map((product, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden mb-4 rounded-sm" style={{ backgroundColor: PRODUCT_BG }}>
                  <div
                    className="w-full h-full group-hover:scale-[1.02] transition-transform duration-700"
                    style={{
                      background: `linear-gradient(135deg, ${CREAM} 0%, #d8cfc0 50%, ${CREAM} 100%)`,
                    }}
                  />
                </div>
                <p className="text-[10px] tracking-[0.15em] uppercase mb-1" style={{ color: MUTED }}>{product.label}</p>
                <h3 className="font-serif text-lg mb-1" style={{ color: DARK }}>{product.title}</h3>
                <p className="text-sm" style={{ color: MUTED }}>{product.price}</p>
              </div>
            ))}
          </div>
        </section>
      </RevealBlock>

      <GoldDiamondDivider className="mx-12 md:mx-24" />

      {/* ── Section 4: Typography Showcase ── */}
      <RevealBlock>
        <section className="px-6 md:px-12 py-16 md:py-24" style={{ backgroundColor: WARM_WHITE }}>
          <div className="max-w-4xl mx-auto">
            <p className="text-[10px] tracking-[0.3em] uppercase mb-8 text-center" style={{ color: GOLD }}>Typography</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase mb-4" style={{ color: MUTED }}>Serif / Headings</p>
                <h2 className="font-serif text-4xl mb-2" style={{ color: DARK }}>Elegance</h2>
                <h3 className="font-serif text-2xl mb-2" style={{ color: DARK }}>Refinement</h3>
                <h4 className="font-serif text-xl mb-2" style={{ color: DARK }}>Heritage</h4>
                <p className="font-serif text-base" style={{ color: MUTED }}>The serif typeface conveys tradition and authority.</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.15em] uppercase mb-4" style={{ color: MUTED }}>Sans-Serif / Body</p>
                <p className="text-base tracking-wide leading-relaxed mb-3" style={{ color: DARK }}>
                  Body text uses a clean sans-serif with generous letter-spacing and line-height to maintain readability and sophistication.
                </p>
                <p className="text-sm tracking-wide leading-relaxed mb-3" style={{ color: MUTED }}>
                  Secondary text in muted tones establishes visual hierarchy without competing with headline content.
                </p>
                <p className="text-xs tracking-[0.2em] uppercase" style={{ color: GOLD }}>Accent labels use gold and uppercase</p>
              </div>
            </div>
          </div>
        </section>
      </RevealBlock>

      <GoldDivider className="mx-12 md:mx-24" />

      {/* ── Section 5: Lookbook / Campaign ── */}
      <RevealBlock>
        <section className="px-6 md:px-12 py-16 md:py-24" style={{ backgroundColor: WARM_WHITE }}>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              <div className="md:col-span-7">
                <div className="aspect-[4/5] rounded-sm overflow-hidden" style={{ backgroundColor: PRODUCT_BG }}>
                  <div
                    className="w-full h-full"
                    style={{
                      background: `linear-gradient(180deg, ${CREAM} 0%, #c9b89c 60%, ${MUTED} 100%)`,
                    }}
                  />
                </div>
              </div>
              <div className="md:col-span-5 md:pl-4">
                <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: GOLD }}>Campaign</p>
                <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-6" style={{ color: DARK }}>
                  The Essence of Modern Luxury
                </h2>
                <p className="text-sm tracking-wide leading-relaxed mb-8" style={{ color: MUTED }}>
                  Our Autumn/Winter collection draws inspiration from the quiet grandeur of European manor houses.
                  Each piece is crafted with meticulous attention to detail, using only the finest natural materials.
                </p>
                <button
                  className="px-8 py-3 border text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#1a1a1a] hover:text-[#faf9f6]"
                  style={{ borderColor: DARK, color: DARK }}
                >
                  View Lookbook
                </button>
              </div>
            </div>
          </div>
        </section>
      </RevealBlock>

      <GoldDivider className="mx-12 md:mx-24" />

      {/* ── Section 6: Size & Color Selectors ── */}
      <RevealBlock>
        <section className="px-6 md:px-12 py-16 md:py-24" style={{ backgroundColor: WARM_WHITE }}>
          <div className="max-w-lg mx-auto">
            <p className="text-[10px] tracking-[0.3em] uppercase mb-8 text-center" style={{ color: GOLD }}>Product Options</p>

            {/* Size selector */}
            <div className="mb-10">
              <p className="text-xs tracking-[0.15em] uppercase mb-4" style={{ color: MUTED }}>Size</p>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="w-12 h-12 border text-xs tracking-wider transition-all duration-300 rounded-sm"
                    style={{
                      borderColor: selectedSize === size ? DARK : CREAM,
                      backgroundColor: selectedSize === size ? DARK : "transparent",
                      color: selectedSize === size ? WARM_WHITE : DARK,
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color selector */}
            <div>
              <p className="text-xs tracking-[0.15em] uppercase mb-4" style={{ color: MUTED }}>Color - {colorOptions[selectedColor].name}</p>
              <div className="flex gap-4">
                {colorOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className="w-8 h-8 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: opt.color,
                      border: `1px solid ${CREAM}`,
                      outline: selectedColor === i ? `2px solid ${GOLD}` : "2px solid transparent",
                      outlineOffset: "3px",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </RevealBlock>

      <GoldDiamondDivider className="mx-12 md:mx-24" />

      {/* ── Section 7: Testimonial ── */}
      <RevealBlock>
        <section className="px-6 md:px-12 py-16 md:py-24 text-center" style={{ backgroundColor: WARM_WHITE }}>
          <div className="max-w-2xl mx-auto">
            <DiamondIcon className="w-6 h-6 mx-auto mb-8 text-[#c9a96e]" />
            <blockquote className="font-serif italic text-xl md:text-2xl leading-relaxed mb-6" style={{ color: DARK }}>
              &ldquo;True luxury is not about excess. It is about restraint, precision, and the quiet confidence that comes from impeccable craft.&rdquo;
            </blockquote>
            <p className="text-xs tracking-[0.2em] uppercase" style={{ color: MUTED }}>
              Creative Director, Maison
            </p>
          </div>
        </section>
      </RevealBlock>

      <GoldDivider className="mx-12 md:mx-24" />

      {/* ── Section 8: Email Signup ── */}
      <RevealBlock>
        <section className="px-6 md:px-12 py-16 md:py-24" style={{ backgroundColor: WARM_WHITE }}>
          <div className="max-w-md mx-auto text-center">
            <p className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: GOLD }}>Newsletter</p>
            <h2 className="font-serif text-2xl md:text-3xl mb-3" style={{ color: DARK }}>Stay Informed</h2>
            <p className="text-sm tracking-wide leading-relaxed mb-8" style={{ color: MUTED }}>
              Receive exclusive access to new collections, private events, and editorial stories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                className="flex-1 py-3 bg-transparent border-0 border-b text-sm tracking-wide focus:outline-none transition-colors duration-300"
                style={{
                  borderColor: GOLD,
                  color: DARK,
                }}
              />
              <button
                className="px-8 py-3 border text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#1a1a1a] hover:text-[#faf9f6] shrink-0"
                style={{ borderColor: DARK, color: DARK }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </RevealBlock>

      <GoldDivider className="mx-12 md:mx-24" />

      {/* ── Section 9: Alerts & Badges ── */}
      <RevealBlock>
        <section className="px-6 md:px-12 py-16 md:py-24" style={{ backgroundColor: WARM_WHITE }}>
          <div className="max-w-3xl mx-auto">
            <p className="text-[10px] tracking-[0.3em] uppercase mb-8 text-center" style={{ color: GOLD }}>Status Elements</p>

            {/* Badges */}
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {[
                { label: "New Season", border: GOLD, text: GOLD },
                { label: "Limited Edition", border: DARK, text: DARK },
                { label: "Exclusive", border: MUTED, text: MUTED },
                { label: "In Stock", border: CREAM, text: MUTED },
                { label: "Sold Out", border: CREAM, text: "#b0a090" },
              ].map((badge, i) => (
                <span
                  key={i}
                  className="px-4 py-1.5 text-[10px] tracking-[0.2em] uppercase border rounded-sm"
                  style={{ borderColor: badge.border, color: badge.text }}
                >
                  {badge.label}
                </span>
              ))}
            </div>

            {/* Alerts */}
            <div className="space-y-4">
              <div className="border-l-2 px-4 py-3 rounded-sm" style={{ borderColor: GOLD, backgroundColor: "#f8f5ef" }}>
                <p className="text-xs tracking-wide" style={{ color: DARK }}>
                  <span className="font-medium">Complimentary shipping</span> on all orders over $500.
                </p>
              </div>
              <div className="border-l-2 px-4 py-3 rounded-sm" style={{ borderColor: DARK, backgroundColor: "#f5f2ec" }}>
                <p className="text-xs tracking-wide" style={{ color: DARK }}>
                  <span className="font-medium">Private appointment available</span> for in-store styling consultations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </RevealBlock>

      <GoldDivider className="mx-12 md:mx-24" />

      {/* ── Section 10: Button Variants ── */}
      <RevealBlock>
        <section className="px-6 md:px-12 py-16 md:py-24" style={{ backgroundColor: WARM_WHITE }}>
          <div className="max-w-3xl mx-auto">
            <p className="text-[10px] tracking-[0.3em] uppercase mb-8 text-center" style={{ color: GOLD }}>Buttons</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-3 border border-[#1a1a1a] text-[#1a1a1a] text-xs tracking-[0.2em] uppercase font-light hover:bg-[#1a1a1a] hover:text-[#faf9f6] transition-all duration-300 rounded-sm">
                Primary
              </button>
              <button className="px-8 py-3 border text-xs tracking-[0.2em] uppercase font-light hover:bg-[#c9a96e] hover:text-[#faf9f6] transition-all duration-300 rounded-sm" style={{ borderColor: GOLD, color: GOLD }}>
                Gold Accent
              </button>
              <button className="px-8 py-3 text-xs tracking-[0.2em] uppercase font-light transition-all duration-300 rounded-sm" style={{ backgroundColor: DARK, color: WARM_WHITE }}>
                Filled
              </button>
              <button className="px-8 py-3 text-xs tracking-[0.2em] uppercase font-light transition-all duration-300 border rounded-sm opacity-40 cursor-not-allowed" style={{ borderColor: CREAM, color: "#b0a090" }}>
                Disabled
              </button>
            </div>
          </div>
        </section>
      </RevealBlock>

      <GoldDivider className="mx-12 md:mx-24" />

      {/* ── Section 11: Rules Summary ── */}
      <RevealBlock>
        <section className="px-6 md:px-12 py-16 md:py-24" style={{ backgroundColor: WARM_WHITE }}>
          <div className="max-w-3xl mx-auto">
            <p className="text-[10px] tracking-[0.3em] uppercase mb-3 text-center" style={{ color: GOLD }}>Design System</p>
            <h2 className="font-serif text-2xl md:text-3xl text-center mb-12" style={{ color: DARK }}>Style Rules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="font-serif text-lg mb-4" style={{ color: DARK }}>Do</h3>
                <ul className="space-y-3">
                  {[
                    "Use warm white #faf9f6 background",
                    "Serif headings, sans-serif body",
                    "Gold accents on borders and dividers only",
                    "Large product images (aspect-[3/4]+)",
                    "Outlined buttons with hover invert",
                    "Generous tracking and leading",
                    "1px dividers with subtle tones",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: GOLD }} />
                      <span className="text-sm tracking-wide" style={{ color: DARK }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-lg mb-4" style={{ color: DARK }}>Don&apos;t</h3>
                <ul className="space-y-3">
                  {[
                    "Saturated bright colors",
                    "Sans-serif bold main headings",
                    "Rounded corners beyond rounded-sm",
                    "Large gold fill areas",
                    "Emojis or cartoon graphics",
                    "Small product thumbnails",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: "#b0a090" }} />
                      <span className="text-sm tracking-wide" style={{ color: MUTED }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </RevealBlock>

      <GoldDiamondDivider className="mx-12 md:mx-24" />

      {/* ── Section 12: Footer ── */}
      <footer className="px-6 md:px-12 py-16 text-center" style={{ backgroundColor: DARK }}>
        <p className="font-serif text-2xl tracking-[0.1em] mb-4" style={{ color: CREAM }}>MAISON</p>
        <div className="flex justify-center flex-wrap gap-6 md:gap-8 mb-8">
          {["Stores", "Contact", "Careers", "Press", "Legal"].map((item) => (
            <span key={item} className="text-xs tracking-[0.2em] uppercase cursor-pointer transition-colors hover:text-[#e8e0d4]" style={{ color: MUTED }}>
              {item}
            </span>
          ))}
        </div>
        <div className="h-px max-w-xs mx-auto mb-8" style={{ background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
        <p className="text-xs" style={{ color: MUTED }}>&copy; 2026 Maison. All rights reserved.</p>
      </footer>

      {/* ── Back link ── */}
      <div className="py-8 text-center" style={{ backgroundColor: WARM_WHITE }}>
        <Link
          href="/styles/luxury-retail"
          className="text-xs tracking-[0.2em] uppercase transition-colors hover:text-[#1a1a1a]"
          style={{ color: MUTED }}
        >
          Back to Style Details
        </Link>
      </div>
    </div>
  );
}
