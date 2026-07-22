"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Stage constants                                                    */
/* ------------------------------------------------------------------ */

const INK = "#1A1712";
const PAPER = "#F5F0E6";
const PAPER_DEEP = "#EBE3D3";
const BRICK = "#B3401F";
const SAND = "#C9BBA0";
const FONT_SERIF = '"Fraunces", Georgia, "Times New Roman", serif';

/* ------------------------------------------------------------------ */
/*  Global parallax engine — one rAF loop, transform-only,            */
/*  disabled under reduced-motion and on small screens.               */
/* ------------------------------------------------------------------ */

function useParallax(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    if (reduce || small) return;

    const layers = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (!layers.length) return;

    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      for (const el of layers) {
        const rate = parseFloat(el.dataset.parallax || "0");
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const offset = (center - vh / 2) * rate;
        el.style.transform = `translate3d(0, ${(-offset).toFixed(1)}px, 0)`;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);
}

/* ------------------------------------------------------------------ */
/*  Scroll progress for the reader's rule                              */
/* ------------------------------------------------------------------ */

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return p;
}

function useInView(threshold = 0.2) {
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
  const { ref, inView } = useInView(0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section head — chapter number + top rule                          */
/* ------------------------------------------------------------------ */

function ChapterHead({ no, kicker, title, sub }: { no: string; kicker: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-baseline gap-5 border-t border-[#1A1712]/25 pt-5 mb-7">
        <span className="text-5xl md:text-6xl text-[#B3401F] leading-none" style={{ fontFamily: FONT_SERIF }}>{no}</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#1A1712]/50">{kicker}</span>
      </div>
      <div className="md:flex md:items-end md:justify-between md:gap-12">
        <h2 className="text-4xl md:text-6xl text-[#1A1712] leading-[1.02] max-w-2xl" style={{ fontFamily: FONT_SERIF }}>
          {title}
        </h2>
        {sub && <p className="mt-4 md:mt-0 text-[#1A1712]/65 text-base leading-relaxed max-w-sm md:text-right">{sub}</p>}
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const paletteSwatches = [
  { name: "Ink", value: INK, label: "Body copy", text: PAPER },
  { name: "Paper", value: PAPER, label: "The stage", text: INK },
  { name: "Paper Deep", value: PAPER_DEEP, label: "Inset panels", text: INK },
  { name: "Brick", value: BRICK, label: "The one accent", text: PAPER },
  { name: "Sand", value: SAND, label: "Dividers", text: INK },
];

const rateTiers = [
  { rate: "0.10", label: "Background", desc: "Giant faint numerals and washes. Moves least — the eye reads it as far away." },
  { rate: "0.30", label: "Midground", desc: "Rules, captions, secondary marks. A middle plane that ties fore and back together." },
  { rate: "0.50", label: "Foreground", desc: "Rarely the body text itself — accents that lead the scroll and settle last." },
];

type NavTab = "buttons" | "cards" | "inputs" | "quote";

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [ready, setReady] = useState(false);
  const [navTab, setNavTab] = useState<NavTab>("buttons");
  const [demoRate, setDemoRate] = useState(0.3);
  const progress = useScrollProgress();
  useParallax(ready);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: PAPER, color: INK }}>
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.loli.net/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..600&display=swap"
      />
      <style>{`
        html { scroll-behavior: smooth; }
        .pe-serif { font-family: ${FONT_SERIF}; }
        .pe-dropcap::first-letter {
          float: left;
          font-family: ${FONT_SERIF};
          font-size: 3.6em;
          line-height: 0.82;
          padding: 0.05em 0.12em 0 0;
          color: ${BRICK};
          font-weight: 600;
        }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          [data-parallax] { transform: none !important; }
        }
        @media (max-width: 767px) {
          [data-parallax] { transform: none !important; }
        }
      `}</style>

      {/* Reader progress rule */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent">
        <div className="h-full bg-[#B3401F] origin-left" style={{ transform: `scaleX(${progress})` }} />
      </div>

      {/* ============================================================ */}
      {/* NAV — masthead                                               */}
      {/* ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#1A1712]/15 bg-[#F5F0E6]/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/styles/parallax-editorial" className="group flex items-center gap-1.5 text-[#1A1712]/60 hover:text-[#B3401F] text-sm transition-colors duration-300">
              <span className="group-hover:-translate-x-0.5 transition-transform duration-300 inline-block">&larr;</span>
              <span>Back to Docs</span>
            </Link>
            <span className="hidden sm:block text-[#1A1712]/20">/</span>
            <span className="hidden sm:block text-xl text-[#1A1712] tracking-tight" style={{ fontFamily: FONT_SERIF }}>
              The Paper Press
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6" style={{ fontFamily: FONT_SERIF }}>
            {[
              { label: "Depth", href: "#depth" },
              { label: "Interlock", href: "#interlock" },
              { label: "Typography", href: "#typography" },
              { label: "Palette", href: "#palette" },
              { label: "Components", href: "#components" },
            ].map((item) => (
              <a key={item.label} href={item.href} className="text-sm text-[#1A1712]/70 hover:text-[#B3401F] transition-colors duration-300">
                {item.label}
              </a>
            ))}
          </nav>
          <Link href="/" className="text-sm text-[#1A1712]/70 hover:text-[#B3401F] transition-colors duration-300" style={{ fontFamily: FONT_SERIF }}>
            StyleKit
          </Link>
        </div>
      </header>

      {/* ============================================================ */}
      {/* HERO — layered parallax masthead                             */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden px-5 md:px-8">
        <div data-parallax="0.12" aria-hidden className="pointer-events-none absolute inset-0 will-change-transform">
          <span className="absolute top-[12%] left-[-2%] leading-none text-[#1A1712]/[0.05] select-none" style={{ fontFamily: FONT_SERIF, fontSize: "26vw" }}>
            1892
          </span>
        </div>
        <div data-parallax="0.34" aria-hidden className="pointer-events-none absolute right-[8%] top-[22%] w-px h-64 bg-[#B3401F]/40 will-change-transform" />
        <div data-parallax="0.22" aria-hidden className="pointer-events-none absolute left-[14%] bottom-[16%] w-40 h-40 rounded-full border border-[#C9BBA0] will-change-transform" />

        <div className="relative max-w-3xl mx-auto text-center" style={{ opacity: ready ? 1 : 0, transition: "opacity 0.9s ease-out 0.2s" }}>
          <p className="pe-serif italic text-[#B3401F] text-lg mb-5">Issue 001 &mdash; The Depth Number</p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-[#1A1712] leading-[0.92] tracking-tight mb-8" style={{ fontFamily: FONT_SERIF }}>
            Depth on Paper
          </h1>
          <p className="text-[#1A1712]/70 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Scroll, and the layers slide out of register. A flat page borrows the thickness of a printed spread.
          </p>
          <a
            href="#depth"
            className="group inline-flex items-center gap-2 pe-serif text-lg text-[#1A1712] hover:text-[#B3401F] transition-colors duration-300"
          >
            <span>Begin reading</span>
            <span className="inline-block w-10 h-px bg-[#B3401F] origin-left scale-x-100 group-hover:scale-x-[1.6] transition-transform duration-300" />
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-[#1A1712]/40 animate-pulse">
          Scroll
        </div>
      </section>

      {/* ============================================================ */}
      {/* 01 — DEPTH / RATE TIERS                                      */}
      {/* ============================================================ */}
      <section id="depth" className="scroll-mt-20 py-24 md:py-36 px-5 md:px-8">
        <div className="max-w-5xl mx-auto">
          <ChapterHead
            no="01"
            kicker="Depth"
            title="Three planes, three speeds"
            sub="Depth is hierarchy. Background layers move least and read as far away; foreground moves most and leads the eye. Never more than three tiers, or the page turns muddy."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
            {rateTiers.map((tier, i) => (
              <Reveal key={tier.rate} delay={i * 0.1}>
                <div className="border-t border-[#1A1712]/20 pt-5">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="pe-serif text-2xl text-[#1A1712]">{tier.label}</span>
                    <span className="font-mono text-xs text-[#B3401F]">rate {tier.rate}</span>
                  </div>
                  <p className="text-[#1A1712]/70 text-sm leading-relaxed">{tier.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Live rate demo */}
          <Reveal delay={0.1} className="mt-16">
            <div className="border border-[#1A1712]/15 bg-[#EBE3D3]/60 overflow-hidden">
              <div className="relative h-72 overflow-hidden">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                  style={{ transform: `translateY(${(1 - demoRate) * -30 + 15}px)` }}
                >
                  <span className="pe-serif text-[10rem] leading-none text-[#1A1712]/[0.06] select-none">A</span>
                </div>
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transform: `translateY(${demoRate * 40 - 20}px)` }}
                >
                  <div className="text-center">
                    <p className="pe-serif text-3xl md:text-4xl text-[#1A1712]">Foreground text</p>
                    <p className="font-mono text-xs text-[#B3401F] mt-2">translate3d(0, progress &times; {demoRate.toFixed(2)}, 0)</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-[#1A1712]/15 px-6 py-5 flex items-center gap-5">
                <label className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1A1712]/55 shrink-0">Rate</label>
                <input
                  type="range"
                  min={0}
                  max={0.6}
                  step={0.02}
                  value={demoRate}
                  onChange={(e) => setDemoRate(Number(e.target.value))}
                  className="w-full accent-[#B3401F]"
                />
                <span className="font-mono text-xs text-[#1A1712]/70 tabular-nums shrink-0 w-10">{demoRate.toFixed(2)}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 02 — STICKY INTERLOCK                                        */}
      {/* ============================================================ */}
      <section id="interlock" className="scroll-mt-20 py-24 md:py-36 px-5 md:px-8">
        <div className="max-w-5xl mx-auto">
          <ChapterHead
            no="02"
            kicker="Interlock"
            title="The image holds, the text moves"
            sub="A sticky image pins to the viewport while the column beside it keeps scrolling — the mesh of a magazine spread, rebuilt for the screen."
          />
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Sticky image column */}
          <div className="md:sticky md:top-24 md:h-[70vh] h-72">
            <div className="relative w-full h-full overflow-hidden border border-[#1A1712]/15">
              <div className="absolute inset-0" style={{ background: `linear-gradient(150deg, ${PAPER_DEEP} 0%, ${SAND} 60%, #A6976F 100%)` }} />
              <div data-parallax="0.16" aria-hidden className="pointer-events-none absolute inset-0 will-change-transform flex items-center justify-center">
                <span className="pe-serif text-[12rem] leading-none text-[#1A1712]/10 select-none">&para;</span>
              </div>
              <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#1A1712]/50">
                position: sticky
              </div>
            </div>
          </div>

          {/* Scrolling text column */}
          <div className="space-y-10">
            {[
              { h: "It stays in place", b: "As you scroll, this column slides past a pinned plate. The eye keeps its anchor while the argument advances — the reader never loses the picture." },
              { h: "Then it releases", b: "When the text runs out, the sticky plate lets go and the next spread takes over. The hand-off is the rhythm of the whole layout." },
              { h: "Meshed, not stacked", b: "Image and text interlock rather than sit in separate blocks. That mesh is what separates an editorial layout from a landing page." },
            ].map((block, i) => (
              <Reveal key={block.h} delay={i * 0.05}>
                <div className="border-t border-[#1A1712]/20 pt-5">
                  <h3 className="pe-serif text-2xl md:text-3xl text-[#1A1712] mb-3">{block.h}</h3>
                  <p className={`text-[#1A1712]/75 leading-[1.7] max-w-[62ch] ${i === 0 ? "pe-dropcap" : ""}`}>{block.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 03 — TYPOGRAPHY                                              */}
      {/* ============================================================ */}
      <section id="typography" className="scroll-mt-20 py-24 md:py-36 px-5 md:px-8">
        <div className="max-w-5xl mx-auto">
          <ChapterHead
            no="03"
            kicker="Typography"
            title="Parallax is the stage, type is the star"
            sub="The motion means nothing if the page can't be read. Serif display, a comfortable measure, drop caps and chapter numbers carry the whole thing when the scrolling stops."
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16">
            <Reveal>
              <p className="pe-dropcap text-[#1A1712]/85 text-lg leading-[1.75] max-w-[68ch] mb-6">
                The measure is capped near sixty-eight characters, the line-height opened to a comfortable one-point-seven-five, and the first letter dropped four lines into the paragraph in brick red. None of it depends on the parallax. Turn the motion off entirely and the page still reads like a printed feature &mdash; which is exactly the test a good editorial layout has to pass.
              </p>
              <p className="text-[#1A1712]/70 leading-[1.75] max-w-[68ch]">
                Depth is a garnish. Structure is the meal. The chapter numbers, the top rules, the hanging accent color &mdash; these are the magazine&rsquo;s grammar, and they do the real work of pacing a long read.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-6">
                {[
                  { label: "Display", cls: "text-5xl", sample: "Register" },
                  { label: "Heading", cls: "text-3xl", sample: "The spread" },
                  { label: "Pull quote", cls: "text-2xl italic", sample: "“Depth is hierarchy.”" },
                  { label: "Body", cls: "text-base", sample: "Sixty-eight characters to the line." },
                ].map((row) => (
                  <div key={row.label} className="flex items-baseline gap-5 border-t border-[#1A1712]/12 pt-4">
                    <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-[#1A1712]/40">{row.label}</span>
                    <span className={`pe-serif text-[#1A1712] ${row.cls}`}>{row.sample}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Pull quote */}
          <Reveal delay={0.1} className="mt-16">
            <blockquote className="border-l-2 border-[#B3401F] pl-6 md:pl-10 max-w-3xl">
              <p className="pe-serif italic text-3xl md:text-4xl text-[#1A1712] leading-snug">
                Scrolling is turning pages, and depth is the fourth dimension of the layout.
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 04 — PALETTE                                                 */}
      {/* ============================================================ */}
      <section id="palette" className="scroll-mt-20 py-24 md:py-36 px-5 md:px-8">
        <div className="max-w-5xl mx-auto">
          <ChapterHead
            no="04"
            kicker="Palette"
            title="Warm paper, ink, one brick"
            sub="No cold whites, no second accent. The paper is warm, the ink is near-black, and brick red appears only where the reader should look."
          />

          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {paletteSwatches.map((swatch) => (
                <div key={swatch.name} className="group">
                  <div
                    className="h-28 border border-[#1A1712]/12 flex items-end p-3 transition-transform duration-500 group-hover:-translate-y-1"
                    style={{ backgroundColor: swatch.value }}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: swatch.text, opacity: 0.75 }}>
                      {swatch.value}
                    </span>
                  </div>
                  <div className="mt-3 pe-serif text-lg text-[#1A1712]">{swatch.name}</div>
                  <div className="text-xs text-[#1A1712]/50">{swatch.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 05 — COMPONENTS                                              */}
      {/* ============================================================ */}
      <section id="components" className="scroll-mt-20 py-24 md:py-36 px-5 md:px-8">
        <div className="max-w-5xl mx-auto">
          <ChapterHead
            no="05"
            kicker="Components"
            title="Set like a page, not an app"
            sub="Sharp edges, serif labels, brick underlines. Every control looks like it belongs in a printed publication."
          />

          <Reveal className="mb-10">
            <div className="flex flex-wrap gap-6 border-b border-[#1A1712]/15" style={{ fontFamily: FONT_SERIF }}>
              {(["buttons", "cards", "inputs", "quote"] as NavTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setNavTab(tab)}
                  className={`pb-3 -mb-px text-lg capitalize border-b-2 transition-colors duration-300 ${
                    navTab === tab ? "border-[#B3401F] text-[#1A1712]" : "border-transparent text-[#1A1712]/50 hover:text-[#1A1712]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="min-h-[240px]">
              {navTab === "buttons" && (
                <div className="flex flex-wrap items-center gap-8">
                  <button className="pe-serif text-lg bg-[#1A1712] text-[#F5F0E6] px-6 py-3 hover:bg-[#B3401F] transition-colors duration-300">
                    Subscribe
                  </button>
                  <button className="group inline-flex items-center gap-2 pe-serif text-lg text-[#1A1712] hover:text-[#B3401F] transition-colors duration-300">
                    Read the chapter
                    <span className="inline-block w-8 h-px bg-[#B3401F] origin-left group-hover:scale-x-150 transition-transform duration-300" />
                  </button>
                  <button className="pe-serif text-lg text-[#1A1712]/55 hover:text-[#1A1712] transition-colors duration-300">Skip</button>
                </div>
              )}

              {navTab === "cards" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { no: "01", t: "The Register Shift", b: "Foreground and background out of register." },
                    { no: "02", t: "The Pinned Plate", b: "An image holds while the column scrolls." },
                    { no: "03", t: "The Drop Cap", b: "A brick letter four lines tall opens the read." },
                  ].map((c) => (
                    <div key={c.no} className="border-t border-[#1A1712]/20 pt-5">
                      <span className="pe-serif text-4xl text-[#B3401F] leading-none">{c.no}</span>
                      <h4 className="pe-serif text-xl text-[#1A1712] mt-3 mb-2">{c.t}</h4>
                      <p className="text-[#1A1712]/70 text-sm leading-relaxed">{c.b}</p>
                    </div>
                  ))}
                </div>
              )}

              {navTab === "inputs" && (
                <div className="max-w-md space-y-8">
                  <label className="block">
                    <span className="block pe-serif italic text-sm text-[#1A1712]/60 mb-1.5">Your email</span>
                    <input
                      type="email"
                      placeholder="reader@paper.press"
                      className="w-full bg-transparent py-2.5 text-lg text-[#1A1712] placeholder-[#1A1712]/30 border-b border-[#1A1712]/25 focus:outline-none focus:border-[#B3401F] transition-colors duration-300"
                    />
                  </label>
                  <label className="block">
                    <span className="block pe-serif italic text-sm text-[#1A1712]/60 mb-1.5">A note to the editor</span>
                    <textarea
                      rows={3}
                      placeholder="Dear editor..."
                      className="w-full bg-transparent py-2.5 text-lg text-[#1A1712] placeholder-[#1A1712]/30 border-b border-[#1A1712]/25 focus:outline-none focus:border-[#B3401F] transition-colors duration-300 resize-none"
                    />
                  </label>
                  <button className="pe-serif text-lg bg-[#1A1712] text-[#F5F0E6] px-6 py-3 hover:bg-[#B3401F] transition-colors duration-300">
                    Send to the press
                  </button>
                </div>
              )}

              {navTab === "quote" && (
                <blockquote className="border-l-2 border-[#B3401F] pl-6 md:pl-10 max-w-3xl">
                  <p className="pe-serif italic text-2xl md:text-3xl text-[#1A1712] leading-snug mb-4">
                    The reader doesn&rsquo;t swipe across a screen &mdash; they move through a stack of spreads sliding out of register.
                  </p>
                  <cite className="pe-serif text-sm text-[#1A1712]/55 not-italic">&mdash; The Depth Number, Issue 001</cite>
                </blockquote>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 06 — DO / DON'T                                              */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-5 md:px-8">
        <div className="max-w-5xl mx-auto">
          <ChapterHead no="06" kicker="Guidelines" title="Do / Don't" />
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="border-t-2 border-[#1A1712] pt-6">
                <h3 className="pe-serif text-2xl text-[#1A1712] mb-6">Do</h3>
                <ul className="space-y-3">
                  {[
                    "Warm paper stage, ink body, one brick-red accent",
                    "Parallax via transform: translate3d, rAF-throttled",
                    "At most three rate tiers per viewport",
                    "Serif headings, 65-75ch measure, drop caps, chapter numbers",
                    "Sticky image-text interlock like a spread",
                    "Static, readable fallback under reduced motion and on mobile",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#1A1712]/75 leading-relaxed">
                      <span className="text-[#B3401F] pe-serif shrink-0">&mdash;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t-2 border-[#1A1712]/30 pt-6">
                <h3 className="pe-serif text-2xl text-[#1A1712]/60 mb-6">Don&apos;t</h3>
                <ul className="space-y-3">
                  {[
                    "Mutate top/margin/height in a scroll handler",
                    "Stack more than three parallax rate tiers",
                    "Make body copy the parallax subject",
                    "Keep heavy parallax on mobile (perf + motion sickness)",
                    "Add a second accent or flood brick red as a surface",
                    "Use cold or pure-white backgrounds",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#1A1712]/55 leading-relaxed">
                      <span className="text-[#1A1712]/35 pe-serif shrink-0">&times;</span>
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
      <footer className="relative overflow-hidden border-t border-[#1A1712]/15 py-20 px-5 md:px-8">
        <div data-parallax="0.1" aria-hidden className="pointer-events-none absolute inset-0 will-change-transform flex items-center justify-center">
          <span className="pe-serif text-[20vw] leading-none text-[#1A1712]/[0.04] select-none">fin</span>
        </div>
        <div className="relative max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <p className="pe-serif italic text-lg text-[#1A1712]/70">Parallax Editorial &mdash; depth on paper.</p>
          <Link href="/styles" className="group inline-flex items-center gap-2 pe-serif text-lg text-[#1A1712] hover:text-[#B3401F] transition-colors duration-300">
            <span className="inline-block w-8 h-px bg-[#B3401F] group-hover:scale-x-150 origin-right transition-transform duration-300" />
            Back to all styles
          </Link>
        </div>
      </footer>
    </div>
  );
}
