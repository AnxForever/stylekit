"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Stage constants                                                    */
/* ------------------------------------------------------------------ */

const BASE = "#05060A";
const SURFACE = "#141821";
const PAPER = "#F3EFE8";
const GOLD = "#E4C063";
const STEEL = "#9AA6B8";

const VIDEO_WEBM = "/video/cinematic-video-hero/aurora.webm";
const POSTER = "/video/cinematic-video-hero/poster.avif";
const POSTER_WEBP = "/video/cinematic-video-hero/poster.webp";

/* ------------------------------------------------------------------ */
/*  VideoStage — poster-first, in-view muted autoplay, honors          */
/*  prefers-reduced-motion and Save-Data (falls back to the poster).   */
/* ------------------------------------------------------------------ */

function VideoStage({
  playing,
  className = "",
}: {
  playing: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // @ts-expect-error saveData is not in the TS lib but is supported
    const saveData = navigator.connection && navigator.connection.saveData;
    if (reduce || saveData) {
      setBlocked(true);
      return; // poster stays; never autoplay
    }

    let io: IntersectionObserver | null = null;
    if (playing) {
      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            v.load();
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        },
        { threshold: 0.25 }
      );
      io.observe(v);
    } else {
      v.pause();
    }
    return () => io?.disconnect();
  }, [playing]);

  return (
    <video
      ref={ref}
      poster={POSTER}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full object-cover ${className}`}
      style={{ backgroundColor: BASE }}
      data-blocked={blocked}
    >
      <source src={VIDEO_WEBM} type="video/webm" />
      {/* An mp4 source would go here in production (H.264) for full Safari coverage */}
    </video>
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
/*  Section head                                                       */
/* ------------------------------------------------------------------ */

function SectionHead({ no, kicker, title, sub }: { no: string; kicker: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono text-sm text-[#E4C063] tabular-nums">{no}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/45">{kicker}</span>
      </div>
      <div className="md:flex md:items-end md:justify-between md:gap-12">
        <h2 className="text-3xl md:text-5xl font-semibold text-white tracking-tight leading-[1.05] max-w-2xl">{title}</h2>
        {sub && <p className="mt-4 md:mt-0 text-white/55 text-base leading-relaxed max-w-sm md:text-right">{sub}</p>}
      </div>
    </Reveal>
  );
}

const scenes = [
  { no: "01", title: "The long dissolve", body: "Poster paints instantly, the loop slips in behind it." },
  { no: "02", title: "Held on the wide", body: "Slow motion carries the mood; nothing jump-cuts." },
  { no: "03", title: "Fade to the fold", body: "Below the hero, quiet solid sections take over." },
];

const paletteSwatches = [
  { name: "Base", value: BASE, label: "The grade", text: PAPER },
  { name: "Surface", value: SURFACE, label: "Panels", text: PAPER },
  { name: "Paper", value: PAPER, label: "Solid-section text", text: BASE },
  { name: "Gold", value: GOLD, label: "The one accent", text: BASE },
  { name: "Steel", value: STEEL, label: "Secondary", text: BASE },
];

type Tab = "buttons" | "cards" | "inputs";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [playing, setPlaying] = useState(true);
  const [tab, setTab] = useState<Tab>("buttons");

  return (
    <div className="relative min-h-screen font-sans" style={{ backgroundColor: BASE, color: PAPER }}>
      <style>{`
        html { scroll-behavior: smooth; }
        .cv-letterbox::before, .cv-letterbox::after {
          content: ""; position: absolute; left: 0; right: 0; height: 5vh;
          background: ${BASE}; z-index: 20; pointer-events: none;
        }
        .cv-letterbox::before { top: 0; }
        .cv-letterbox::after { bottom: 0; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
      `}</style>

      {/* ============================================================ */}
      {/* NAV                                                          */}
      {/* ============================================================ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-black/60 to-transparent">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/styles/cinematic-video-hero" className="group flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors duration-300">
              <span className="group-hover:-translate-x-0.5 transition-transform duration-300 inline-block">&larr;</span>
              <span>Back to Docs</span>
            </Link>
            <span className="hidden sm:block text-white/25">/</span>
            <span className="hidden sm:block text-white font-semibold tracking-tight">Aurora Studios</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/75">
            {[
              { label: "Reel", href: "#reel" },
              { label: "Craft", href: "#craft" },
              { label: "Palette", href: "#palette" },
              { label: "Components", href: "#components" },
            ].map((item) => (
              <a key={item.label} href={item.href} className="hover:text-white transition-colors duration-300">
                {item.label}
              </a>
            ))}
          </nav>
          <Link href="/" className="text-sm text-white/80 hover:text-[#E4C063] font-semibold transition-colors duration-300">
            StyleKit
          </Link>
        </div>
      </header>

      {/* ============================================================ */}
      {/* HERO — poster-first video                                    */}
      {/* ============================================================ */}
      <section className="cv-letterbox relative h-screen overflow-hidden">
        <VideoStage playing={playing} />
        {/* Readability scrim */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to top, rgba(5,6,10,0.8), rgba(5,6,10,0.2) 45%, rgba(5,6,10,0.45))" }} />
        <div className="relative z-10 h-full max-w-6xl mx-auto px-5 md:px-8 flex flex-col justify-end pb-24 md:pb-28">
          <Reveal>
            <p className="text-[#E4C063] uppercase tracking-[0.3em] text-sm mb-4">Now screening</p>
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-semibold max-w-4xl leading-[1.03] tracking-tight">
              Some stories<br />only move
            </h1>
            <p className="mt-6 text-white/80 text-lg max-w-xl leading-relaxed">
              A short muted loop plays behind a poster that painted first. The film is atmosphere; every word you need lives in the text layer.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#reel" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#E4C063] text-[#05060A] font-semibold hover:bg-[#efce78] transition-all duration-300">
                Watch the film <span aria-hidden>&#9654;</span>
              </a>
              <button
                onClick={() => setPlaying((v) => !v)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white hover:bg-white/18 transition-all duration-300"
              >
                {playing ? "Pause" : "Play"} loop
              </button>
            </div>
          </Reveal>
        </div>
        <span className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 animate-bounce">Scroll</span>
      </section>

      {/* ============================================================ */}
      {/* QUIET BAND                                                   */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: BASE }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-2xl md:text-3xl leading-relaxed text-white/85 font-light">
              The opener is a trailer, not a slide. But the trailer must never cost the load &mdash; <span className="text-[#E4C063]">the poster leads, the video follows.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* REEL — second video panel                                    */}
      {/* ============================================================ */}
      <section id="reel" className="scroll-mt-0 relative h-screen overflow-hidden">
        <VideoStage playing={playing} />
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to right, rgba(5,6,10,0.82), rgba(5,6,10,0.2) 55%, transparent)" }} />
        <div className="relative z-10 h-full max-w-6xl mx-auto px-5 md:px-8 flex flex-col justify-center">
          <Reveal className="max-w-xl">
            <p className="text-[#E4C063] uppercase tracking-[0.3em] text-sm mb-4">The Reel</p>
            <h2 className="text-white text-4xl md:text-6xl font-semibold leading-[1.05] tracking-tight mb-5">
              Motion is the message
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              A left-anchored scrim keeps the copy legible while the footage breathes behind it. Same loop, only in view, only when it earns its bytes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CRAFT — how it's wired                                       */}
      {/* ============================================================ */}
      <section id="craft" className="scroll-mt-16 py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: "#08090E" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="01"
            kicker="Craft"
            title="A trailer that respects the load"
            sub="The poster is the LCP; the video is progressive enhancement, played only in view and never with sound."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {[
              { n: "Poster first", d: "A small AVIF poster paints as the LCP. The <video> carries preload=none, so nothing heavy blocks the first frame." },
              { n: "In-view play", d: "An IntersectionObserver calls load() and play() only when the hero enters view, and pauses it when it leaves." },
              { n: "Muted loop", d: "muted + loop + playsInline is what lets browsers autoplay at all. The loop is short and seams without a jump-cut." },
              { n: "Graceful fallback", d: "prefers-reduced-motion and Save-Data never autoplay — the poster still simply stays. Mobile can show poster only." },
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
            <div className="bg-[#12141B] border border-white/10 rounded-lg p-6 overflow-x-auto">
              <pre className="font-mono text-[12px] leading-relaxed text-white/80"><code>{`<video poster="poster.avif" muted loop playsInline preload="none" aria-hidden>
  <source src="aurora.webm" type="video/webm" />
  <source src="aurora.mp4"  type="video/mp4" />
</video>
`}<span style={{ color: "#6b7684" }}>{`// play only in view`}</span>{`
new IntersectionObserver(([e]) =>
  e.isIntersecting ? v.play() : v.pause()
).observe(v);`}</code></pre>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PALETTE                                                      */}
      {/* ============================================================ */}
      <section id="palette" className="scroll-mt-16 py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: BASE }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="02"
            kicker="Palette"
            title="Graded like film"
            sub="A near-black base, a raised surface, one warm gold pulled from the footage, and steel for the quiet parts."
          />
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {paletteSwatches.map((s) => (
                <div key={s.name} className="group">
                  <div className="h-28 rounded-lg border border-white/10 flex items-end p-3 transition-transform duration-500 group-hover:-translate-y-1" style={{ backgroundColor: s.value }}>
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: s.text, opacity: 0.75 }}>{s.value}</span>
                  </div>
                  <div className="mt-3 text-sm font-semibold text-white">{s.name}</div>
                  <div className="text-xs text-white/55">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SCENE GALLERY — poster-backed cards                          */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: "#08090E" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead no="03" kicker="Scenes" title="Poster-backed, never autoplay below the fold" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {scenes.map((scene, i) => (
              <Reveal key={scene.no} delay={i * 0.08}>
                <article className="relative aspect-video overflow-hidden rounded-xl bg-[#141821]">
                  <picture>
                    <source srcSet={POSTER} type="image/avif" />
                    <source srcSet={POSTER_WEBP} type="image/webp" />
                    <img src={POSTER_WEBP} alt="Aurora mesh drifting over a dark field" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                  </picture>
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,6,10,0.8), transparent 65%)" }} />
                  <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/12 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-xs">&#9654;</span>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-xs uppercase tracking-widest text-[#E4C063] mb-1">Scene {scene.no}</p>
                    <h3 className="text-white text-lg font-semibold mb-1">{scene.title}</h3>
                    <p className="text-white/60 text-sm">{scene.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* COMPONENTS — over a video                                    */}
      {/* ============================================================ */}
      <section id="components" className="scroll-mt-0 relative min-h-screen overflow-hidden flex items-center py-24">
        <VideoStage playing={playing} />
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to top, rgba(5,6,10,0.85), rgba(5,6,10,0.5) 50%, rgba(5,6,10,0.6))" }} />
        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 w-full">
          <SectionHead
            no="04"
            kicker="Components"
            title="Legible over any frame"
            sub="Gold for the one action, frosted translucency for everything else, so controls never hide the footage."
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
            <div className="rounded-2xl border border-white/15 bg-black/30 backdrop-blur-md p-8 md:p-12 min-h-[220px]">
              {tab === "buttons" && (
                <div className="flex flex-wrap items-center gap-5">
                  <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#E4C063] text-[#05060A] font-semibold hover:bg-[#efce78] transition-all duration-300">
                    Watch the film <span aria-hidden>&#9654;</span>
                  </button>
                  <button className="px-7 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white hover:bg-white/18 transition-all duration-300">
                    Learn more
                  </button>
                  <button className="px-7 py-3.5 rounded-full bg-transparent text-white/80 hover:text-white transition-colors duration-300">
                    Skip intro
                  </button>
                </div>
              )}
              {tab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {scenes.map((s) => (
                    <div key={s.no} className="relative aspect-video overflow-hidden rounded-lg bg-[#141821]">
                      <picture>
                        <source srcSet={POSTER} type="image/avif" />
                        <img src={POSTER_WEBP} alt="" loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                      </picture>
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,6,10,0.8), transparent 60%)" }} />
                      <div className="absolute bottom-0 p-4">
                        <h4 className="text-white text-sm font-semibold">{s.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {tab === "inputs" && (
                <div className="max-w-sm space-y-5">
                  <input type="email" placeholder="Email for the premiere" className="w-full px-5 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-white placeholder-white/50 focus:outline-none focus:border-[#E4C063]/70 focus:bg-white/15 transition-all duration-300" />
                  <button className="w-full px-7 py-3.5 rounded-full bg-[#E4C063] text-[#05060A] font-semibold hover:bg-[#efce78] transition-all duration-300">Reserve a seat</button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* DO / DON'T                                                   */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: BASE }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead no="05" kicker="Guidelines" title="Do / Don't" />
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="border-t-2 border-[#E4C063] pt-6">
                <h3 className="text-2xl font-semibold text-white mb-6">Do</h3>
                <ul className="space-y-3">
                  {[
                    "Poster frame as the LCP; video is enhancement",
                    "preload=none; load and play only in view",
                    "muted loop playsInline; a seamless short loop",
                    "Scrim every text-over-video for 4.5:1",
                    "Dark grade with a single warm-gold accent",
                    "Fallback to the poster on reduced-motion / Save-Data",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/75 leading-relaxed">
                      <span className="text-[#E4C063] font-mono shrink-0">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t-2 border-white/25 pt-6">
                <h3 className="text-2xl font-semibold text-white/60 mb-6">Don&apos;t</h3>
                <ul className="space-y-3">
                  {[
                    "Make the video the LCP or omit the poster",
                    "preload=auto or auto-load a heavy file",
                    "Bake critical information into the video",
                    "Autoplay with sound",
                    "Put text on footage with no scrim",
                    "Use fast cuts or a loop that doesn't seam",
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
      <footer className="py-16 px-5 md:px-8 border-t border-white/10" style={{ backgroundColor: BASE }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <p className="text-white/45 text-sm">Cinematic Video Hero &mdash; the opener is a trailer.</p>
          <Link href="/styles" className="group inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-300">
            <span aria-hidden className="group-hover:-translate-x-0.5 transition-transform duration-300 inline-block">&larr;</span>
            Back to all styles
          </Link>
        </div>
      </footer>
    </div>
  );
}
