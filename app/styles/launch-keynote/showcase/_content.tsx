"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Stage constants                                                    */
/* ------------------------------------------------------------------ */

const STAGE = "#000000";
const PANEL = "#1D1D1F";
const PAPER = "#F5F5F7";
const BLUE = "#2997FF";
const BLUE_PRESS = "#0071E3";
const GRAY = "#86868B";

const FRAME_COUNT = 96;
const FRAME_BASE = "/images/styles/launch-keynote/frames/frame-";
const POSTER = "/images/styles/launch-keynote/poster.webp";

function frameSrc(i: number) {
  return `${FRAME_BASE}${String(i).padStart(4, "0")}.webp`;
}

/* Paint one frame with object-fit: contain and a black letterbox, */
/* sizing the canvas devicePixelRatio-aware but capped at 2.        */
function paintFrame(canvas: HTMLCanvasElement, img: HTMLImageElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const rect = canvas.getBoundingClientRect();
  const cw = Math.max(1, Math.round(rect.width * dpr));
  const ch = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== cw || canvas.height !== ch) {
    canvas.width = cw;
    canvas.height = ch;
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = STAGE;
  ctx.fillRect(0, 0, cw, ch);
  const iw = img.naturalWidth || 1280;
  const ih = img.naturalHeight || 720;
  const scale = Math.min(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
}

/* ------------------------------------------------------------------ */
/*  Scrub callouts — one message per milestone                         */
/* ------------------------------------------------------------------ */

const callouts = [
  { kicker: "Titanium", title: "Forged, not cast", body: "A grade-5 titanium enclosure, lighter than any before it." },
  { kicker: "Display", title: "Brighter in the sun", body: "Peak 2600 nits, so it stays legible on the brightest stage." },
  { kicker: "Silicon", title: "The whole reveal, in one chip", body: "A 3-nanometer core scrubs this animation without breaking a sweat." },
  { kicker: "Ready", title: "This is Vertex Pro", body: "One product, one message, one reveal - the scrollbar was the playhead." },
];

/* ------------------------------------------------------------------ */
/*  ScrubStage — the signature scroll-scrubbed frame sequence          */
/* ------------------------------------------------------------------ */

function ScrubStage() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<HTMLImageElement[]>([]);
  const drawn = useRef(-1);
  const rafId = useRef(0);

  const [loaded, setLoaded] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [milestone, setMilestone] = useState(0);

  // Detect reduced motion, paint the poster immediately as the first frame.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const wantsReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(wantsReduced);

    const poster = new Image();
    poster.onload = () => {
      if (drawn.current < 0) paintFrame(canvas, poster);
    };
    poster.src = POSTER;
  }, []);

  // Lazy-load the 96 frames only when the section nears the viewport.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let cancelled = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        for (let i = 0; i < FRAME_COUNT; i++) {
          const img = new Image();
          img.decoding = "async";
          img.onload = () => {
            if (cancelled) return;
            setLoaded((n) => n + 1);
          };
          // A failed frame still advances the gate so the loading
          // overlay clears; the scrub keeps the last good frame it drew.
          img.onerror = () => {
            if (cancelled) return;
            setLoaded((n) => n + 1);
          };
          img.src = frameSrc(i);
          frames.current[i] = img;
        }
      },
      { rootMargin: "50% 0px" }
    );
    io.observe(wrap);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, []);

  // Reduced motion: once the final frame is ready, draw it statically.
  useEffect(() => {
    if (!reduced) return;
    const canvas = canvasRef.current;
    const finalFrame = frames.current[FRAME_COUNT - 1];
    if (canvas && finalFrame && finalFrame.complete && finalFrame.naturalWidth) {
      paintFrame(canvas, finalFrame);
      drawn.current = FRAME_COUNT - 1;
      setMilestone(callouts.length - 1);
    }
  }, [reduced, loaded]);

  // The scrub: rAF-throttled, read scroll position once per frame.
  useEffect(() => {
    if (reduced) return;

    const draw = () => {
      rafId.current = 0;
      const wrap = wrapRef.current;
      const canvas = canvasRef.current;
      if (!wrap || !canvas) return;

      const rect = wrap.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;

      const idx = Math.min(FRAME_COUNT - 1, Math.floor(progress * (FRAME_COUNT - 1)));
      if (idx !== drawn.current) {
        const img = frames.current[idx];
        if (img && img.complete && img.naturalWidth) {
          paintFrame(canvas, img);
          drawn.current = idx;
        }
      }

      const m = progress >= 0.75 ? 3 : progress >= 0.5 ? 2 : progress >= 0.25 ? 1 : 0;
      setMilestone((prev) => (prev === m ? prev : m));
    };

    const onScroll = () => {
      if (!rafId.current) rafId.current = requestAnimationFrame(draw);
    };
    const onResize = () => {
      const canvas = canvasRef.current;
      const img = frames.current[drawn.current];
      if (canvas && img && img.complete && img.naturalWidth) paintFrame(canvas, img);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    draw();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [reduced]);

  const ready = loaded >= FRAME_COUNT;

  return (
    <section
      ref={wrapRef}
      id="reveal"
      className="relative scroll-mt-0"
      style={{ height: reduced ? "100vh" : "350vh", backgroundColor: STAGE }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <canvas ref={canvasRef} aria-hidden="true" className="w-full h-full" style={{ display: "block" }} />

        {/* loading progress until enough frames are cached */}
        {!reduced && !ready && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <div className="h-0.5 w-40 bg-white/15 rounded-full overflow-hidden">
              <div className="h-full bg-[#2997FF] transition-[width] duration-200" style={{ width: `${Math.round((loaded / FRAME_COUNT) * 100)}%` }} />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#86868B] tabular-nums">
              {Math.round((loaded / FRAME_COUNT) * 100)}%
            </span>
          </div>
        )}

        {/* callouts */}
        {reduced ? (
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gradient-to-t from-black via-black/70 to-transparent">
            {callouts.map((c) => (
              <div key={c.title}>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[#2997FF] mb-1.5">{c.kicker}</p>
                <h3 className="text-[#F5F5F7] text-xl font-semibold tracking-tight mb-1">{c.title}</h3>
                <p className="text-[#86868B] text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-16">
            <div className="max-w-6xl mx-auto relative h-40 md:h-44">
              {callouts.map((c, i) => (
                <div
                  key={c.title}
                  aria-hidden={milestone !== i}
                  className="absolute inset-x-0 bottom-0 max-w-md"
                  style={{
                    opacity: milestone === i ? 1 : 0,
                    transform: milestone === i ? "translateY(0)" : "translateY(24px)",
                    transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
                    pointerEvents: milestone === i ? "auto" : "none",
                  }}
                >
                  <p className="text-[11px] uppercase tracking-[0.3em] text-[#2997FF] mb-2">{c.kicker}</p>
                  <h3 className="text-[#F5F5F7] text-2xl md:text-4xl font-semibold tracking-tight mb-2 leading-[1.05]">{c.title}</h3>
                  <p className="text-[#86868B] text-base leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
            {/* progress dots */}
            <div className="max-w-6xl mx-auto mt-6 flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#2997FF] tabular-nums">FRAME {String(Math.min(FRAME_COUNT, milestone * 24 + 1)).padStart(2, "0")} / 96</span>
              <div className="flex gap-1.5 flex-1 max-w-xs">
                {callouts.map((_, i) => (
                  <span key={i} className="h-1 flex-1 rounded-full" style={{ backgroundColor: i <= milestone ? BLUE : "rgba(255,255,255,0.15)", transition: "background-color 0.4s ease-out" }} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal-on-scroll helper                                            */
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

function SectionHead({ no, kicker, title, sub }: { no: string; kicker: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono text-sm text-[#2997FF] tabular-nums">{no}</span>
        <span className="h-px flex-1 bg-white/10" />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#86868B]">{kicker}</span>
      </div>
      <div className="md:flex md:items-end md:justify-between md:gap-12">
        <h2 className="text-3xl md:text-5xl font-semibold text-[#F5F5F7] tracking-tight leading-[1.05] max-w-2xl">{title}</h2>
        {sub && <p className="mt-4 md:mt-0 text-[#86868B] text-base leading-relaxed max-w-sm md:text-right">{sub}</p>}
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const paletteSwatches = [
  { name: "Stage", value: STAGE, label: "The black stage", text: PAPER },
  { name: "Panel", value: PANEL, label: "Elevated cards", text: PAPER },
  { name: "Paper", value: PAPER, label: "Text & headlines", text: STAGE },
  { name: "Blue", value: BLUE, label: "The one accent", text: STAGE },
  { name: "Gray", value: GRAY, label: "Captions & specs", text: STAGE },
];

const specRows = [
  { label: "Chip", value: "A17 Vertex", detail: "6-core, 3nm" },
  { label: "Display", value: "6.7″ XDR", detail: "2600 nits peak" },
  { label: "Enclosure", value: "Titanium", detail: "Grade-5, brushed" },
  { label: "Battery", value: "29 hours", detail: "Video playback" },
  { label: "Weight", value: "187 g", detail: "Lightest ever" },
];

type CompTab = "buttons" | "cards" | "forms";
type SpecTab = "camera" | "power" | "connectivity";

const specTabData: Record<SpecTab, { k: string; v: string }[]> = {
  camera: [
    { k: "Main", v: "48 MP, f/1.6" },
    { k: "Ultra-wide", v: "12 MP, 120 deg" },
    { k: "Telephoto", v: "5x optical" },
  ],
  power: [
    { k: "Battery", v: "4400 mAh" },
    { k: "Fast charge", v: "50% in 25 min" },
    { k: "Wireless", v: "25 W" },
  ],
  connectivity: [
    { k: "Cellular", v: "5G mmWave" },
    { k: "Wi-Fi", v: "Wi-Fi 7" },
    { k: "Port", v: "USB-C 3.2" },
  ],
};

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [compTab, setCompTab] = useState<CompTab>("buttons");
  const [specTab, setSpecTab] = useState<SpecTab>("camera");
  const [email, setEmail] = useState("");

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: STAGE, color: PAPER, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
      <style>{`
        html { scroll-behavior: smooth; }
        .lk-headline { letter-spacing: -0.03em; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
      `}</style>

      {/* ============================================================ */}
      {/* NAV                                                          */}
      {/* ============================================================ */}
      <header className="fixed top-0 inset-x-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-5 md:px-8 h-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/styles/launch-keynote" className="group flex items-center gap-1.5 text-[#86868B] hover:text-[#F5F5F7] text-sm transition-colors duration-300">
              <span className="group-hover:-translate-x-0.5 transition-transform duration-300 inline-block">&larr;</span>
              <span>Back to Docs</span>
            </Link>
            <span className="hidden sm:block text-white/20">/</span>
            <span className="hidden sm:block text-[#F5F5F7] font-semibold tracking-tight">Vertex Pro</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-[#F5F5F7]/80">
            {[
              { label: "Reveal", href: "#reveal" },
              { label: "Palette", href: "#palette" },
              { label: "Specs", href: "#specs" },
              { label: "Components", href: "#components" },
            ].map((item) => (
              <a key={item.label} href={item.href} className="hover:text-white transition-colors duration-300">
                {item.label}
              </a>
            ))}
          </nav>
          <Link href="/styles" className="text-sm text-[#2997FF] hover:underline underline-offset-4 font-medium transition-colors duration-300">
            StyleKit
          </Link>
        </div>
      </header>

      {/* ============================================================ */}
      {/* HERO                                                         */}
      {/* ============================================================ */}
      <section id="top" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(600px circle at 50% 38%, rgba(41,151,255,0.18), transparent 60%)" }} />
        <Reveal className="relative z-10">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-[#2997FF] mb-6">Now revealed</p>
          <h1 className="lk-headline text-[#F5F5F7] font-semibold leading-[1.04]" style={{ fontSize: "clamp(2.75rem, 9vw, 7rem)" }}>
            Vertex Pro.<br />
            <span className="text-[#86868B]">Titanium.</span> So light.
          </h1>
          <p className="mt-8 text-lg md:text-xl text-[#86868B] max-w-xl mx-auto leading-relaxed">
            Scroll and the product reveals itself, one frame at a time. The scrollbar is the playhead.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <a href="#reveal" className="inline-flex items-center gap-1.5 px-7 py-3 rounded-full bg-[#2997FF] text-white font-medium tracking-tight hover:bg-[#0071E3] active:scale-[0.98] transition-all duration-300">
              Watch the reveal
            </a>
            <a href="#specs" className="inline-flex items-center gap-1 text-[#2997FF] font-medium tracking-tight hover:underline underline-offset-4">
              See the specs <span aria-hidden>&rsaquo;</span>
            </a>
          </div>
        </Reveal>
        <span className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-[#86868B] animate-bounce">Scroll</span>
      </section>

      {/* ============================================================ */}
      {/* SCRUB — the signature scroll-scrubbed frame sequence         */}
      {/* ============================================================ */}
      <ScrubStage />

      {/* ============================================================ */}
      {/* QUIET BAND                                                   */}
      {/* ============================================================ */}
      <section className="py-24 md:py-36 px-5 md:px-8" style={{ backgroundColor: STAGE }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="lk-headline text-3xl md:text-5xl leading-[1.1] text-[#F5F5F7] font-semibold">
              One product. One message. <span className="text-[#2997FF]">One reveal.</span>
            </p>
            <p className="mt-6 text-[#86868B] text-lg leading-relaxed">
              The stage stays black so the light falls only on the product. Every viewport carries a single claim, and the scroll is the beat.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PALETTE                                                      */}
      {/* ============================================================ */}
      <section id="palette" className="scroll-mt-12 py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: "#050505" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead no="01" kicker="Palette" title="Black stage, one electric blue" sub="Everything is black, near-white and gray. A single blue carries every link, CTA and key number." />
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {paletteSwatches.map((s) => (
                <div key={s.name} className="group">
                  <div className="h-28 rounded-2xl border border-white/10 flex items-end p-3 transition-transform duration-500 group-hover:-translate-y-1" style={{ backgroundColor: s.value }}>
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: s.text, opacity: 0.8 }}>{s.value}</span>
                  </div>
                  <div className="mt-3 text-sm font-semibold text-[#F5F5F7]">{s.name}</div>
                  <div className="text-xs text-[#86868B]">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TYPOGRAPHY                                                   */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: STAGE }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead no="02" kicker="Typography" title="System SF, tight and huge" sub="A native SF-grade sans, clamped up to 7rem, tracking pulled to -0.03em, with 600 against 400 for weight contrast." />
          <Reveal>
            <div className="space-y-8 border-t border-white/10 pt-10">
              <p className="lk-headline text-5xl md:text-7xl font-semibold text-[#F5F5F7]">Aa Vertex</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#2997FF] mb-3">Weight 600 - Headline</p>
                  <p className="text-2xl md:text-3xl font-semibold tracking-tight text-[#F5F5F7] leading-tight">Pro cameras. Pro display. Pro everything.</p>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#2997FF] mb-3">Weight 400 - Body</p>
                  <p className="text-base text-[#86868B] leading-relaxed">The keynote voice is calm and declarative. Short sentences. A single idea at a time. The type does the work so the stage can stay empty.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* COMPONENTS — tabbed                                          */}
      {/* ============================================================ */}
      <section id="components" className="scroll-mt-12 py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: "#050505" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead no="03" kicker="Components" title="Controls for a keynote" sub="Blue for the one action, dark panels for everything else, hairline borders that never fight the stage." />
          <Reveal className="mb-8">
            <div className="flex flex-wrap gap-2">
              {(["buttons", "cards", "forms"] as CompTab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setCompTab(t)}
                  className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                    compTab === t ? "bg-[#2997FF] text-white" : "bg-[#1D1D1F] text-[#86868B] hover:text-[#F5F5F7] border border-white/10"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="rounded-3xl border border-white/10 bg-[#0C0C0D] p-8 md:p-12 min-h-[240px]">
              {compTab === "buttons" && (
                <div className="flex flex-wrap items-center gap-5">
                  <button className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#2997FF] text-white font-medium tracking-tight hover:bg-[#0071E3] active:scale-[0.98] transition-all duration-300">Buy</button>
                  <button className="px-6 py-3 rounded-full bg-[#1D1D1F] border border-white/10 text-[#F5F5F7] font-medium tracking-tight hover:border-white/25 transition-all duration-300">Add to bag</button>
                  <a className="inline-flex items-center gap-1 text-[#2997FF] font-medium tracking-tight hover:underline underline-offset-4 cursor-pointer">Learn more <span aria-hidden>&rsaquo;</span></a>
                  <button className="px-6 py-3 rounded-full bg-transparent text-[#86868B] font-medium tracking-tight hover:text-[#F5F5F7] transition-colors duration-300">Compare</button>
                </div>
              )}
              {compTab === "cards" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {[
                    { k: "Chip", t: "A17 Vertex", b: "The fastest ever, and only getting started." },
                    { k: "Camera", t: "48 MP main", b: "A leap you can see the moment you shoot." },
                    { k: "Battery", t: "29 hours", b: "All-day video, and then some." },
                  ].map((c) => (
                    <div key={c.t} className="rounded-2xl bg-[#1D1D1F] p-6">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#2997FF] mb-2">{c.k}</p>
                      <h4 className="text-[#F5F5F7] text-lg font-semibold tracking-tight mb-1">{c.t}</h4>
                      <p className="text-[#86868B] text-sm leading-relaxed">{c.b}</p>
                    </div>
                  ))}
                </div>
              )}
              {compTab === "forms" && (
                <form className="max-w-md space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-sm text-[#86868B] mb-1.5">Launch updates</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-5 py-3 rounded-xl bg-[#1D1D1F] border border-white/10 text-[#F5F5F7] placeholder-[#86868B] focus:outline-none focus:border-[#2997FF] transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#86868B] mb-1.5">Choose a finish</label>
                    <select className="w-full px-5 py-3 rounded-xl bg-[#1D1D1F] border border-white/10 text-[#F5F5F7] focus:outline-none focus:border-[#2997FF] transition-colors duration-300">
                      <option>Titanium</option>
                      <option>Space Black</option>
                      <option>Aurora Green</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-[#86868B] mb-1.5">Anything else</label>
                    <textarea rows={3} placeholder="Tell us what you want to know" className="w-full px-5 py-3 rounded-xl bg-[#1D1D1F] border border-white/10 text-[#F5F5F7] placeholder-[#86868B] focus:outline-none focus:border-[#2997FF] transition-colors duration-300 resize-none" />
                  </div>
                  <button type="submit" className="w-full px-6 py-3 rounded-full bg-[#2997FF] text-white font-medium tracking-tight hover:bg-[#0071E3] active:scale-[0.98] transition-all duration-300">
                    {email ? "Notify me" : "Keep me posted"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* badges + progress */}
          <Reveal delay={0.1} className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl bg-[#1D1D1F] p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#86868B] mb-4">Badges</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[#2997FF]/15 text-[#2997FF] text-xs font-medium">New</span>
                <span className="px-3 py-1 rounded-full bg-white/5 text-[#F5F5F7] text-xs font-medium border border-white/10">Pro</span>
                <span className="px-3 py-1 rounded-full bg-white/5 text-[#86868B] text-xs font-medium border border-white/10">In stock</span>
                <span className="px-3 py-1 rounded-full bg-[#30D158]/15 text-[#30D158] text-xs font-medium">Carbon neutral</span>
              </div>
            </div>
            <div className="rounded-2xl bg-[#1D1D1F] p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#86868B] mb-4">Charge</p>
              <div className="space-y-4">
                {[{ l: "0 to 50%", w: "50%" }, { l: "Full charge", w: "100%" }].map((p) => (
                  <div key={p.l}>
                    <div className="flex justify-between text-xs text-[#86868B] mb-1.5"><span>{p.l}</span><span className="tabular-nums">{p.w}</span></div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-[#2997FF] rounded-full" style={{ width: p.w }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ALERTS                                                       */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: STAGE }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead no="04" kicker="Messages" title="Quiet status, one accent" />
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { tone: BLUE, bg: "rgba(41,151,255,0.1)", label: "Info", body: "Pre-orders open Friday at 5am PT." },
                { tone: "#30D158", bg: "rgba(48,209,88,0.1)", label: "Success", body: "Your reservation is confirmed." },
                { tone: "#FFD60A", bg: "rgba(255,214,10,0.1)", label: "Notice", body: "Trade-in values vary by condition." },
                { tone: "#FF453A", bg: "rgba(255,69,58,0.1)", label: "Sold out", body: "Titanium is temporarily unavailable." },
              ].map((a) => (
                <div key={a.label} className="rounded-2xl p-5 flex items-start gap-3 border border-white/10" style={{ backgroundColor: a.bg }}>
                  <span className="mt-1 w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: a.tone }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: a.tone }}>{a.label}</p>
                    <p className="text-sm text-[#F5F5F7]/80 leading-relaxed">{a.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SPECS — tabbed table + big number grid                       */}
      {/* ============================================================ */}
      <section id="specs" className="scroll-mt-12 py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: "#050505" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead no="05" kicker="Specs" title="Numbers, calmly stated" sub="Large figures on a quiet grid read as credible. No charts, no flourish - just the facts of the product." />

          <Reveal className="mb-10">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-px rounded-2xl overflow-hidden border border-white/10">
              {specRows.map((r) => (
                <div key={r.label} className="bg-[#0C0C0D] p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#86868B] mb-3">{r.label}</p>
                  <p className="lk-headline text-2xl md:text-3xl font-semibold text-[#F5F5F7] leading-none mb-2">{r.value}</p>
                  <p className="text-xs text-[#86868B]">{r.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex flex-wrap gap-2 mb-6">
              {(["camera", "power", "connectivity"] as SpecTab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setSpecTab(t)}
                  className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                    specTab === t ? "bg-[#2997FF] text-white" : "bg-[#1D1D1F] text-[#86868B] hover:text-[#F5F5F7] border border-white/10"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <table className="w-full text-left border-collapse">
              <tbody>
                {specTabData[specTab].map((row, i) => (
                  <tr key={row.k} className={i === 0 ? "" : "border-t border-white/10"}>
                    <th scope="row" className="py-4 pr-4 text-sm font-medium text-[#86868B] align-top w-40">{row.k}</th>
                    <td className="py-4 text-lg font-semibold tracking-tight text-[#F5F5F7]">{row.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TESTIMONIAL                                                  */}
      {/* ============================================================ */}
      <section className="py-24 md:py-36 px-5 md:px-8" style={{ backgroundColor: STAGE }}>
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <blockquote className="lk-headline text-2xl md:text-4xl font-semibold text-[#F5F5F7] leading-[1.2]">
              &ldquo;It doesn&rsquo;t just show the product. <span className="text-[#2997FF]">It performs the reveal.</span>&rdquo;
            </blockquote>
            <p className="mt-8 text-[#86868B]">Review desk, The Verge-adjacent</p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* DO / DON'T                                                   */}
      {/* ============================================================ */}
      <section className="py-24 md:py-32 px-5 md:px-8" style={{ backgroundColor: "#050505" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead no="06" kicker="Guidelines" title="Do / Don't" />
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="border-t-2 border-[#2997FF] pt-6">
                <h3 className="text-2xl font-semibold text-[#F5F5F7] mb-6">Do</h3>
                <ul className="space-y-3">
                  {[
                    "Keep the stage pure black; one product per viewport",
                    "Scrub a sticky canvas with a webp frame sequence",
                    "Lazy-load frames only in view; paint a poster first",
                    "Read scroll once per rAF; keep the last frame if unloaded",
                    "Use one electric-blue accent and nothing more",
                    "Statically render the final frame under reduced-motion",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#F5F5F7]/75 leading-relaxed">
                      <span className="text-[#2997FF] font-mono shrink-0">+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t-2 border-white/20 pt-6">
                <h3 className="text-2xl font-semibold text-[#86868B] mb-6">Don&apos;t</h3>
                <ul className="space-y-3">
                  {[
                    "Add rainbow gradients or a second accent color",
                    "Read offsetTop per frame in a scroll handler",
                    "Preload all 96 frames on page load",
                    "Bake critical information into the frame images",
                    "Pile on borders that break the infinite black depth",
                    "Ignore prefers-reduced-motion or a devicePixelRatio cap",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#86868B] leading-relaxed">
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
      <footer className="py-16 px-5 md:px-8 border-t border-white/10" style={{ backgroundColor: STAGE }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-6">
          <p className="text-[#86868B] text-sm">Launch Keynote - the reveal is the page.</p>
          <Link href="/styles" className="group inline-flex items-center gap-2 text-sm text-[#86868B] hover:text-[#F5F5F7] transition-colors duration-300">
            <span aria-hidden className="group-hover:-translate-x-0.5 transition-transform duration-300 inline-block">&larr;</span>
            Back to all styles
          </Link>
        </div>
      </footer>
    </div>
  );
}
