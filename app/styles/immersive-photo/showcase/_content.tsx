"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Stage constants                                                    */
/* ------------------------------------------------------------------ */

const INK = "#0C0D10";
const PAPER = "#F4F1EA";
const AMBER = "#E8B04B";

/* Generated atmospheric AVIF/WebP assets + their inline LQIP blur-ups. */
const PHOTOS = {
  dawn: {
    avif: "/images/styles/immersive-photo/dawn-ridge.avif",
    webp: "/images/styles/immersive-photo/dawn-ridge.webp",
    lqip: "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAACwAwCdASoUAAwAPu1oqk6ppiQiMAgBMB2JYgC7ACHVHcrlzaZPAAD+odjk9JEgtG+12BRnfREvUbKOHdQvtIQAAAA=",
    alt: "Dawn light breaking warm over a distant ridgeline",
  },
  dusk: {
    avif: "/images/styles/immersive-photo/dusk-coast.avif",
    webp: "/images/styles/immersive-photo/dusk-coast.webp",
    lqip: "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAABwAwCdASoUAAwAPu1iqU2ppaOiMAgBMB2JZgCsACHUvrtSBIAA/uQPkGg/9TfVb1ZGAF4Pepnd/CbgIX53fsfZhs32hm+fgAA=",
    alt: "Dusk glow over a darkening coastline",
  },
  fog: {
    avif: "/images/styles/immersive-photo/fog-forest.avif",
    webp: "/images/styles/immersive-photo/fog-forest.webp",
    lqip: "data:image/webp;base64,UklGRkoAAABXRUJQVlA4ID4AAABwAwCdASoUAAwAPu1iqU2ppaOiMAgBMB2JZwAAMKH9FjpjUAAA/tC5VDitnuYWrCk3jAcwhC9oYBDdDgAAAA==",
    alt: "Pale mist settling through a quiet forest",
  },
} as const;

type PhotoKey = keyof typeof PHOTOS;

/* ------------------------------------------------------------------ */
/*  Photo — <picture> AVIF+WebP with LQIP blur-up + optional Ken Burns */
/* ------------------------------------------------------------------ */

function Photo({
  photo,
  priority = false,
  kenBurns = false,
  className = "",
  sizes = "100vw",
}: {
  photo: (typeof PHOTOS)[PhotoKey];
  priority?: boolean;
  kenBurns?: boolean;
  className?: string;
  sizes?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* LQIP placeholder */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${photo.lqip})`, filter: "blur(16px)", transform: "scale(1.08)" }}
      />
      {/* Real frame */}
      <picture>
        <source srcSet={photo.avif} type="image/avif" />
        <source srcSet={photo.webp} type="image/webp" />
        <img
          src={photo.webp}
          alt={photo.alt}
          sizes={sizes}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          // @ts-expect-error fetchpriority is valid HTML but not yet in React types here
          fetchpriority={priority ? "high" : undefined}
          onLoad={() => setLoaded(true)}
          data-loaded={loaded}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"} ${kenBurns ? "ip-kenburns" : ""}`}
        />
      </picture>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

function useInView(threshold = 0.15) {
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
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section head (on solid sections)                                   */
/* ------------------------------------------------------------------ */

function SectionHead({ no, kicker, title, sub, dark = false }: { no: string; kicker: string; title: string; sub?: string; dark?: boolean }) {
  const t = dark ? "text-white" : "text-[#0C0D10]";
  const m = dark ? "text-white/55" : "text-[#0C0D10]/55";
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono text-sm text-[#E8B04B] tabular-nums">{no}</span>
        <span className={`font-mono text-[11px] uppercase tracking-[0.3em] ${m}`}>{kicker}</span>
      </div>
      <div className="md:flex md:items-end md:justify-between md:gap-12">
        <h2 className={`text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05] max-w-2xl ${t}`}>{title}</h2>
        {sub && <p className={`mt-4 md:mt-0 text-base leading-relaxed max-w-sm md:text-right ${m}`}>{sub}</p>}
      </div>
    </Reveal>
  );
}

const galleryCards: { key: PhotoKey; kicker: string; title: string }[] = [
  { key: "dawn", kicker: "Field notes", title: "First light on the ridge" },
  { key: "fog", kicker: "Field notes", title: "Mist through the pines" },
  { key: "dusk", kicker: "Field notes", title: "The coast at last light" },
];

const paletteSwatches = [
  { name: "Ink", value: INK, label: "Solid sections", text: PAPER },
  { name: "Paper", value: PAPER, label: "Quiet text bands", text: INK },
  { name: "Amber", value: AMBER, label: "Sampled from light", text: INK },
  { name: "Surface", value: "#1A1C22", label: "Frosted panels", text: PAPER },
  { name: "Mist", value: "#B8BCC4", label: "Muted captions", text: INK },
];

type Tab = "buttons" | "cards" | "inputs";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [tab, setTab] = useState<Tab>("buttons");
  const [kbOn, setKbOn] = useState(true);

  return (
    <div className="relative min-h-screen font-sans" style={{ backgroundColor: INK, color: PAPER }}>
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes ip-kenburns {
          from { transform: scale(1) translate3d(0,0,0); }
          to { transform: scale(1.12) translate3d(-2%,-1.5%,0); }
        }
        .ip-kenburns { animation: ip-kenburns 18s ease-in-out infinite alternate; will-change: transform; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .ip-kenburns { animation: none !important; }
          [class*="transition-opacity"] { transition: none !important; }
        }
      `}</style>

      {/* ============================================================ */}
      {/* NAV — transparent-to-scrim over the hero                     */}
      {/* ============================================================ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-black/55 to-transparent">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/styles/immersive-photo" className="group flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors duration-300">
              <span className="group-hover:-translate-x-0.5 transition-transform duration-300 inline-block">&larr;</span>
              <span>Back to Docs</span>
            </Link>
            <span className="hidden sm:block text-white/25">/</span>
            <span className="hidden sm:block text-white font-semibold tracking-tight">Atlas</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/75">
            {[
              { label: "Series", href: "#series" },
              { label: "Craft", href: "#craft" },
              { label: "Palette", href: "#palette" },
              { label: "Components", href: "#components" },
            ].map((item) => (
              <a key={item.label} href={item.href} className="hover:text-white transition-colors duration-300">
                {item.label}
              </a>
            ))}
          </nav>
          <Link href="/" className="text-sm text-white/80 hover:text-[#E8B04B] font-semibold transition-colors duration-300">
            StyleKit
          </Link>
        </div>
      </header>

      {/* ============================================================ */}
      {/* HERO — full-bleed Ken Burns + scrim                          */}
      {/* ============================================================ */}
      <section className="relative h-screen overflow-hidden">
        <Photo photo={PHOTOS.dawn} priority kenBurns={kbOn} sizes="100vw" />
        {/* Readability scrim */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.18) 45%, rgba(0,0,0,0.35))" }} />
        <div className="relative z-10 h-full max-w-6xl mx-auto px-5 md:px-8 flex flex-col justify-end pb-24 md:pb-28">
          <Reveal>
            <p className="text-[#E8B04B] uppercase tracking-[0.3em] text-sm mb-4">Chapter One</p>
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-semibold max-w-4xl leading-[1.03] tracking-tight">
              The light arrives<br />before the sound
            </h1>
            <p className="mt-6 text-white/80 text-lg max-w-xl leading-relaxed">
              A full-bleed frame, a slow Ken Burns drift, and text that floats on a readability scrim. The photograph leads; the interface stays out of the way.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#series" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/12 backdrop-blur-md border border-white/30 text-white font-medium hover:bg-white/20 hover:border-white/50 transition-all duration-300">
                View the series <span aria-hidden>&rarr;</span>
              </a>
              <button
                onClick={() => setKbOn((v) => !v)}
                className="text-sm text-white/70 hover:text-white underline underline-offset-4 transition-colors duration-300"
              >
                Ken Burns: {kbOn ? "on" : "off"}
              </button>
            </div>
          </Reveal>
        </div>
        <span className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 animate-bounce">Scroll</span>
      </section>

      {/* ============================================================ */}
      {/* QUIET TEXT BAND — breath                                     */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: INK }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-2xl md:text-3xl leading-relaxed text-white/85 font-light">
              Between two photographs, a quiet band of solid color. The eye needs somewhere to rest before the next full-bleed frame &mdash; <span className="text-[#E8B04B]">whitespace is breath.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SERIES — split full-bleed frame + caption                    */}
      {/* ============================================================ */}
      <section id="series" className="scroll-mt-0 relative h-screen overflow-hidden">
        <Photo photo={PHOTOS.fog} kenBurns={kbOn} sizes="100vw" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.15) 55%, transparent)" }} />
        <div className="relative z-10 h-full max-w-6xl mx-auto px-5 md:px-8 flex flex-col justify-center">
          <Reveal className="max-w-xl">
            <p className="text-[#E8B04B] uppercase tracking-[0.3em] text-sm mb-4">The Series</p>
            <h2 className="text-white text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight mb-5">
              Mist keeps its own hours
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              A left-anchored scrim keeps the headline legible while the forest breathes behind it. The image still carries every color on screen.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* GALLERY — full-bleed photo cards with scrim captions         */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: INK }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="01"
            kicker="Gallery"
            title="Every card is a frame"
            sub="Locked aspect ratios prevent layout shift; a gradient scrim guarantees the caption stays readable no matter the photo."
            dark
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {galleryCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.08}>
                <article className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#1A1C22]">
                  <Photo photo={PHOTOS[card.key]} sizes="(max-width: 768px) 100vw, 33vw" className="transition-transform duration-[1200ms] ease-out group-hover:scale-105" />
                  <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.05) 55%, transparent)" }} />
                  <div className="absolute inset-x-0 bottom-0 z-20 p-6">
                    <p className="text-xs uppercase tracking-widest text-[#E8B04B] mb-1">{card.kicker}</p>
                    <h3 className="text-white text-xl font-semibold">{card.title}</h3>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CRAFT — how it's wired (solid)                               */}
      {/* ============================================================ */}
      <section id="craft" className="scroll-mt-16 py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: "#0A0B0E" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="02"
            kicker="Craft"
            title="Fast frames, honest motion"
            sub="The immersion can't cost the load. Dual-format images, blur-up loading, transform-only Ken Burns, and a reduced-motion fallback."
            dark
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {[
              { n: "AVIF + WebP", d: "A <picture> ships AVIF with a WebP fallback and responsive srcset. The hero is preloaded; everything else is lazy + decoding=async." },
              { n: "Blur-up LQIP", d: "A 20px inline placeholder paints instantly, then the real frame cross-fades in on decode. The first paint is never blank." },
              { n: "Ken Burns", d: "A slow transform scale + translate (18s) lets the still breathe. Transform only, so it stays on the compositor." },
              { n: "Scrim + a11y", d: "Every text-over-image sits on a gradient scrim for 4.5:1 contrast; reduced-motion stops the drift and instant-fades the frames." },
            ].map((item, i) => (
              <Reveal key={item.n} delay={i * 0.06}>
                <div className="border-t border-white/12 pt-5">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.n}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{item.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-12">
            <div className="bg-[#141519] border border-white/10 rounded-lg p-6 overflow-x-auto">
              <pre className="font-mono text-[12px] leading-relaxed text-white/80"><code>{`<picture>
  <source srcset="dawn.avif" type="image/avif" />
  <source srcset="dawn.webp" type="image/webp" />
  <img src="dawn.webp" alt="Dawn over the ridge"
       fetchpriority="high" decoding="async"
       class="ip-kenburns" />   `}<span style={{ color: "#6b7684" }}>{`// transform-only drift`}</span>{`
</picture>`}</code></pre>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PALETTE                                                      */}
      {/* ============================================================ */}
      <section id="palette" className="scroll-mt-16 py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: PAPER }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="03"
            kicker="Palette"
            title="Color comes from the light"
            sub="Ink and paper for the solid bands; a single amber sampled from the dawn glow. The photographs supply everything else."
          />
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {paletteSwatches.map((s) => (
                <div key={s.name} className="group">
                  <div className="h-28 rounded-lg border border-black/10 flex items-end p-3 transition-transform duration-500 group-hover:-translate-y-1" style={{ backgroundColor: s.value }}>
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: s.text, opacity: 0.75 }}>{s.value}</span>
                  </div>
                  <div className="mt-3 text-sm font-semibold text-[#0C0D10]">{s.name}</div>
                  <div className="text-xs text-[#0C0D10]/55">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* COMPONENTS — frosted, over a photo                           */}
      {/* ============================================================ */}
      <section id="components" className="scroll-mt-0 relative min-h-screen overflow-hidden flex items-center py-24">
        <Photo photo={PHOTOS.dusk} kenBurns={kbOn} sizes="100vw" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78), rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.55))" }} />
        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 w-full">
          <SectionHead
            no="04"
            kicker="Components"
            title="Frosted, so they never block the view"
            sub="Controls use translucency and blur to stay legible over any photograph without hiding it."
            dark
          />
          <Reveal className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "inputs"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                    tab === t ? "bg-white/20 backdrop-blur-md border border-white/40 text-white" : "bg-white/8 backdrop-blur-md border border-white/20 text-white/65 hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-2xl border border-white/15 bg-black/25 backdrop-blur-md p-8 md:p-12 min-h-[220px]">
              {tab === "buttons" && (
                <div className="flex flex-wrap items-center gap-5">
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/12 backdrop-blur-md border border-white/30 text-white font-medium hover:bg-white/20 hover:border-white/50 transition-all duration-300">
                    View the series <span aria-hidden>&rarr;</span>
                  </button>
                  <button className="px-6 py-3 rounded-full bg-[#E8B04B] text-[#0C0D10] font-semibold hover:bg-[#f0bd5f] transition-colors duration-300">
                    Amber accent
                  </button>
                  <button className="px-6 py-3 rounded-full bg-transparent border border-white/20 text-white/80 font-medium hover:text-white hover:border-white/40 transition-colors duration-300">
                    Ghost
                  </button>
                </div>
              )}
              {tab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {galleryCards.map((c) => (
                    <div key={c.title} className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#1A1C22]">
                      <Photo photo={PHOTOS[c.key]} sizes="200px" />
                      <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent 60%)" }} />
                      <div className="absolute bottom-0 z-20 p-4">
                        <h4 className="text-white text-sm font-semibold">{c.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {tab === "inputs" && (
                <div className="max-w-sm space-y-5">
                  <input type="email" placeholder="Your email" className="w-full px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white placeholder-white/50 focus:outline-none focus:border-white/60 focus:bg-white/15 transition-all duration-300" />
                  <input type="text" placeholder="Search the archive" className="w-full px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white placeholder-white/50 focus:outline-none focus:border-white/60 focus:bg-white/15 transition-all duration-300" />
                  <button className="w-full px-6 py-3 rounded-full bg-[#E8B04B] text-[#0C0D10] font-semibold hover:bg-[#f0bd5f] transition-colors duration-300">Subscribe</button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* DO / DON'T                                                   */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: INK }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead no="05" kicker="Guidelines" title="Do / Don't" dark />
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="border-t-2 border-[#E8B04B] pt-6">
                <h3 className="text-2xl font-semibold text-white mb-6">Do</h3>
                <ul className="space-y-3">
                  {[
                    "One full-bleed photo per screen; the image leads",
                    "Scrim every text-over-image for 4.5:1 contrast",
                    "Ken Burns transform-only, 8-20s, reduced-motion off",
                    "LQIP blur-up then cross-fade the real frame",
                    "AVIF + WebP + srcset; hero preload, rest lazy",
                    "One amber accent sampled from the light",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/75 leading-relaxed">
                      <span className="text-[#E8B04B] font-mono shrink-0">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t-2 border-white/25 pt-6">
                <h3 className="text-2xl font-semibold text-white/60 mb-6">Don&apos;t</h3>
                <ul className="space-y-3">
                  {[
                    "Bury the photo under a pile of cards",
                    "Put text on an image with no scrim",
                    "Ship unoptimized full-size JPGs above the fold",
                    "Make Ken Burns fast or animate layout props",
                    "Place an image without an aspect-ratio (CLS)",
                    "Force a brand color that fights the photo",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/55 leading-relaxed">
                      <span className="text-white/35 font-mono shrink-0">&times;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER                                                       */}
      {/* ============================================================ */}
      <footer className="py-16 px-5 md:px-8 border-t border-white/10" style={{ backgroundColor: INK }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <p className="text-white/45 text-sm">Immersive Photo &mdash; the photograph is the protagonist.</p>
          <Link href="/styles" className="group inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-300">
            <span aria-hidden className="group-hover:-translate-x-0.5 transition-transform duration-300 inline-block">&larr;</span>
            Back to all styles
          </Link>
        </div>
      </footer>
    </div>
  );
}
