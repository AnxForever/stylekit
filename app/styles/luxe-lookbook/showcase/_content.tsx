"use client";

import { type CSSProperties, useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Maison constants                                                   */
/* ------------------------------------------------------------------ */

const PORCELAIN = "#F7F5F1";
const STONE = "#E8E3DB";
const INK = "#141210";
const GOLD = "#9A7B4F";
const TAUPE = "#6B6259";
const SERIF = '"Playfair Display", "Times New Roman", Georgia, serif';
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const VIDEO_MP4 = "/video/luxe-lookbook/silk.mp4";
const VIDEO_WEBM = "/video/luxe-lookbook/silk.webm";
const POSTER = "/video/luxe-lookbook/poster.avif";
const POSTER_WEBP = "/video/luxe-lookbook/poster.webp";

const LOOKS = [
  { no: "01", avif: "/images/styles/luxe-lookbook/look-01.avif", webp: "/images/styles/luxe-lookbook/look-01.webp", title: "The Camel Coat", note: "Double-faced wool, cut to the ankle.", alt: "A model in a floor-length camel wool coat against porcelain seamless." },
  { no: "02", avif: "/images/styles/luxe-lookbook/look-02.avif", webp: "/images/styles/luxe-lookbook/look-02.webp", title: "Ivory Column", note: "Bias-cut silk, a single seam.", alt: "A model in an ivory bias-cut silk column dress." },
  { no: "03", avif: "/images/styles/luxe-lookbook/look-03.avif", webp: "/images/styles/luxe-lookbook/look-03.webp", title: "Noir Tailoring", note: "Wool crepe, sculpted shoulder.", alt: "A model in sharp black wool crepe tailoring." },
  { no: "04", avif: "/images/styles/luxe-lookbook/look-04.avif", webp: "/images/styles/luxe-lookbook/look-04.webp", title: "Gilded Knit", note: "Hand-loomed with a gold thread.", alt: "A model in a fine knit shot through with muted gold thread." },
];

const PALETTE = [
  { name: "Porcelain", value: PORCELAIN, label: "The ground", text: INK },
  { name: "Stone", value: STONE, label: "Raised surface", text: INK },
  { name: "Ink", value: INK, label: "The type", text: PORCELAIN },
  { name: "Gold", value: GOLD, label: "The one accent", text: PORCELAIN },
  { name: "Taupe", value: TAUPE, label: "Body copy", text: PORCELAIN },
];

const RUNWAY = [
  { season: "Autumn Maison", city: "Paris", venue: "Palais de Tokyo", date: "28 Sep" },
  { season: "The Silk Season", city: "Milan", venue: "Palazzo Serbelloni", date: "04 Oct" },
  { season: "Winter Atelier", city: "Tokyo", venue: "Omotesando Hall", date: "19 Oct" },
];

type Collection = "atelier" | "readytowear" | "accessories";

const COLLECTIONS: Record<Collection, { label: string; line: string; body: string }> = {
  atelier: {
    label: "Atelier",
    line: "Made to measure",
    body: "Each piece begins as a single length of cloth and a fitting. The atelier keeps the seams honest and the silhouette quiet.",
  },
  readytowear: {
    label: "Ready-to-Wear",
    line: "The season, in stores",
    body: "A tight edit of the maison codes, cut for the everyday and delivered in porcelain and ink. Nothing loud, everything considered.",
  },
  accessories: {
    label: "Accessories",
    line: "The finishing note",
    body: "Leather goods and small objects finished by hand, each carrying a single thread of muted gold as the house signature.",
  },
};

/* ------------------------------------------------------------------ */
/*  FilmStage - poster-first, in-view muted autoplay, honors           */
/*  prefers-reduced-motion and Save-Data (falls back to the poster).   */
/* ------------------------------------------------------------------ */

function FilmStage({ playing, className = "" }: { playing: boolean; className?: string }) {
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
            if (v.readyState === 0) v.load();
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
      style={{ backgroundColor: STONE }}
      data-blocked={blocked}
    >
      <source src={VIDEO_MP4} type="video/mp4" />
      <source src={VIDEO_WEBM} type="video/webm" />
    </video>
  );
}

/* ------------------------------------------------------------------ */
/*  Hooks + reveal                                                     */
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
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.8s ${EASE} ${delay}s, transform 0.8s ${EASE} ${delay}s`,
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
    <Reveal className="mb-14 md:mb-20">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs tabular-nums" style={{ color: GOLD, fontFamily: SERIF }}>{no}</span>
        <span className="uppercase tracking-[0.3em] text-[11px]" style={{ color: TAUPE }}>{kicker}</span>
      </div>
      <div className="md:flex md:items-end md:justify-between md:gap-16">
        <h2 className="text-3xl md:text-5xl leading-[1.02] max-w-2xl" style={{ color: INK, fontFamily: SERIF }}>{title}</h2>
        {sub && <p className="mt-5 md:mt-0 text-base leading-relaxed max-w-sm md:text-right" style={{ color: TAUPE }}>{sub}</p>}
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Lookbook plate - hover / focus reveal, transform + opacity only    */
/* ------------------------------------------------------------------ */

function Plate({ look, active, onSelect }: { look: (typeof LOOKS)[number]; active: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group block text-left w-full focus:outline-none"
      aria-pressed={active}
    >
      <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: STONE }}>
        <picture>
          <source srcSet={look.avif} type="image/avif" />
          <source srcSet={look.webp} type="image/webp" />
          <img
            src={look.webp}
            alt={look.alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
            style={{ transitionTimingFunction: EASE }}
          />
        </picture>
        {/* caption rises on hover */}
        <div
          className="absolute inset-x-0 bottom-0 p-5 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 transition-all duration-500"
          style={{ background: "linear-gradient(to top, rgba(20,18,16,0.6), transparent)", transitionTimingFunction: EASE }}
        >
          <p className="uppercase tracking-[0.3em] text-[10px] mb-1" style={{ color: PORCELAIN }}>Discover</p>
        </div>
        {active && <span className="absolute top-4 left-4 w-2 h-2" style={{ backgroundColor: GOLD }} aria-hidden />}
      </div>
      <div className="pt-5 mt-5 border-t" style={{ borderColor: "rgba(20,18,16,0.15)" }}>
        <p className="uppercase tracking-[0.3em] text-[10px] mb-1" style={{ color: GOLD }}>Look {look.no}</p>
        <h3 className="text-xl md:text-2xl" style={{ color: INK, fontFamily: SERIF }}>{look.title}</h3>
        <p className="text-sm mt-1" style={{ color: TAUPE }}>{look.note}</p>
      </div>
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

type FormState = "idle" | "sent";

export default function ShowcaseContent() {
  const [playing, setPlaying] = useState(true);
  const [collection, setCollection] = useState<Collection>("atelier");
  const [selectedLook, setSelectedLook] = useState("01");
  const [email, setEmail] = useState("");
  const [form, setForm] = useState<FormState>("idle");

  const labelStyle: CSSProperties = { color: TAUPE };

  return (
    <div className="relative min-h-screen font-sans" style={{ backgroundColor: PORCELAIN, color: INK }}>
      {/* Didone display face from the CN mirror */}
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.loli.net/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..700&display=swap"
      />
      <style>{`
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
      `}</style>

      {/* ============================================================ */}
      {/* NAV                                                          */}
      {/* ============================================================ */}
      <header className="fixed top-0 inset-x-0 z-50" style={{ background: "linear-gradient(to bottom, rgba(247,245,241,0.85), rgba(247,245,241,0))" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link href="/styles/luxe-lookbook" className="text-sm transition-colors duration-500 hover:opacity-60" style={{ color: TAUPE }}>
              Back to Docs
            </Link>
            <span className="hidden sm:block" style={{ color: "rgba(20,18,16,0.25)" }}>/</span>
            <span className="hidden sm:block text-2xl tracking-tight" style={{ color: INK, fontFamily: SERIF }}>Maison</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 uppercase tracking-[0.25em] text-xs" style={{ color: INK }}>
            {[
              { label: "Lookbook", href: "#lookbook" },
              { label: "Atelier", href: "#atelier" },
              { label: "Palette", href: "#palette" },
              { label: "Components", href: "#components" },
            ].map((item) => (
              <a key={item.label} href={item.href} className="transition-colors duration-500 hover:text-[#9A7B4F]">
                {item.label}
              </a>
            ))}
          </nav>
          <Link href="/" className="uppercase tracking-[0.25em] text-xs transition-colors duration-500 hover:text-[#9A7B4F]" style={{ color: INK }}>
            StyleKit
          </Link>
        </div>
      </header>

      {/* ============================================================ */}
      {/* HERO - silk-motion film                                      */}
      {/* ============================================================ */}
      <section className="relative h-screen overflow-hidden">
        <FilmStage playing={playing} />
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to top, rgba(20,18,16,0.55), rgba(20,18,16,0.05) 50%, rgba(20,18,16,0.25))" }} />
        <div className="relative z-10 h-full max-w-6xl mx-auto px-6 md:px-10 flex flex-col justify-end pb-24 md:pb-28">
          <Reveal>
            <p className="uppercase tracking-[0.3em] text-xs mb-5" style={{ color: "rgba(247,245,241,0.85)" }}>Autumn Maison</p>
            <h1 className="leading-[0.9] max-w-4xl" style={{ color: PORCELAIN, fontFamily: SERIF, fontSize: "clamp(3rem, 12vw, 8rem)" }}>
              The Silk Season
            </h1>
            <p className="mt-7 text-lg max-w-xl leading-relaxed" style={{ color: "rgba(247,245,241,0.82)" }}>
              A single length of cloth, held in slow motion. The film is the atmosphere; every word you need is set in type, not baked into the frame.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#lookbook" className="px-9 py-4 bg-[#F7F5F1] text-[#141210] uppercase tracking-[0.2em] text-xs hover:bg-[#9A7B4F] hover:text-[#F7F5F1] transition-all duration-500">
                View the lookbook
              </a>
              <button
                onClick={() => setPlaying((v) => !v)}
                className="px-9 py-4 bg-transparent border border-[#F7F5F1]/50 text-[#F7F5F1] uppercase tracking-[0.2em] text-xs hover:bg-[#F7F5F1] hover:text-[#141210] transition-all duration-500"
              >
                {playing ? "Pause film" : "Play film"}
              </button>
            </div>
          </Reveal>
        </div>
        <span className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 uppercase tracking-[0.3em] text-[10px]" style={{ color: "rgba(247,245,241,0.7)" }}>Scroll</span>
      </section>

      {/* ============================================================ */}
      {/* MANIFESTO - quiet band                                       */}
      {/* ============================================================ */}
      <section className="py-28 md:py-44 px-6 md:px-10" style={{ backgroundColor: PORCELAIN }}>
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="uppercase tracking-[0.3em] text-xs mb-8" style={{ color: GOLD }}>The House</p>
            <p className="text-2xl md:text-4xl leading-[1.35]" style={{ color: INK, fontFamily: SERIF }}>
              Luxury is subtraction, not addition. We let a single garment own the screen, a single gold thread carry the signature, and the rest of the page fall quiet.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* LOOKBOOK - hover-reveal grid                                 */}
      {/* ============================================================ */}
      <section id="lookbook" className="scroll-mt-20 py-24 md:py-36 px-6 md:px-10" style={{ backgroundColor: STONE }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="01"
            kicker="Lookbook"
            title="A season, page by page"
            sub="Four looks, shot as portrait plates. Each reveals slowly on hover, the way a printed lookbook turns."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {LOOKS.map((look, i) => (
              <Reveal key={look.no} delay={i * 0.08} className="ll-plate">
                <Plate look={look} active={selectedLook === look.no} onSelect={() => setSelectedLook(look.no)} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-14">
            <p className="text-sm" style={{ color: TAUPE }}>
              Selected -
              <span className="ml-2" style={{ color: INK, fontFamily: SERIF }}>
                Look {selectedLook} - {LOOKS.find((l) => l.no === selectedLook)?.title}
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ATELIER - collection switcher (tabs)                         */}
      {/* ============================================================ */}
      <section id="atelier" className="scroll-mt-20 py-24 md:py-36 px-6 md:px-10" style={{ backgroundColor: PORCELAIN }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead no="02" kicker="Atelier" title="Three ways to wear the house" />
          <Reveal>
            <div className="flex flex-wrap gap-8 border-b pb-5 mb-10" style={{ borderColor: "rgba(20,18,16,0.15)" }}>
              {(Object.keys(COLLECTIONS) as Collection[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setCollection(key)}
                  className="uppercase tracking-[0.25em] text-xs transition-colors duration-500"
                  style={{ color: collection === key ? GOLD : TAUPE }}
                >
                  {COLLECTIONS[key].label}
                </button>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <h3 className="text-4xl md:text-6xl leading-[0.95]" style={{ color: INK, fontFamily: SERIF }}>
                {COLLECTIONS[collection].line}
              </h3>
              <div>
                <p className="text-lg leading-relaxed" style={{ color: TAUPE }}>{COLLECTIONS[collection].body}</p>
                <button className="mt-8 px-9 py-4 bg-[#141210] text-[#F7F5F1] uppercase tracking-[0.2em] text-xs hover:bg-[#9A7B4F] transition-all duration-500">
                  Explore {COLLECTIONS[collection].label}
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PALETTE                                                      */}
      {/* ============================================================ */}
      <section id="palette" className="scroll-mt-20 py-24 md:py-36 px-6 md:px-10" style={{ backgroundColor: STONE }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead
            no="03"
            kicker="Palette"
            title="Porcelain, ink, one gold"
            sub="A near-white ground, an ink for type, a stone surface for panels, and a single muted gold that is never spread thin."
          />
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {PALETTE.map((s) => (
                <div key={s.name} className="group">
                  <div className="h-32 border flex items-end p-3 transition-transform duration-700 group-hover:-translate-y-1" style={{ backgroundColor: s.value, borderColor: "rgba(20,18,16,0.12)" }}>
                    <span className="uppercase tracking-[0.15em] text-[9px]" style={{ color: s.text, opacity: 0.8 }}>{s.value}</span>
                  </div>
                  <div className="mt-4 text-sm" style={{ color: INK, fontFamily: SERIF, fontSize: "1.05rem" }}>{s.name}</div>
                  <div className="text-xs mt-0.5" style={labelStyle}>{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TYPOGRAPHY specimen                                          */}
      {/* ============================================================ */}
      <section className="py-24 md:py-36 px-6 md:px-10" style={{ backgroundColor: PORCELAIN }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead no="04" kicker="Typography" title="Numerals as art" sub="A high-contrast Didone serif for display, a neutral sans for the whisper. Weight is the typeface's, never a utility class." />
          <Reveal>
            <div className="border-t border-b py-12" style={{ borderColor: "rgba(20,18,16,0.15)" }}>
              <div className="leading-[0.85] select-none" style={{ color: INK, fontFamily: SERIF, fontSize: "clamp(4rem, 18vw, 13rem)" }}>
                Aa
                <span style={{ color: GOLD }}>.</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 tabular-nums text-2xl md:text-4xl" style={{ color: TAUPE, fontFamily: SERIF }}>
                <span>0 1 2 3 4</span>
                <span style={{ color: INK }}>5 6 7 8 9</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.05} className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="uppercase tracking-[0.3em] text-[11px] mb-4" style={{ color: GOLD }}>Display - Playfair Display</p>
              <p className="text-4xl md:text-5xl leading-[1.05]" style={{ color: INK, fontFamily: SERIF }}>
                The coat is cut once, and cut right.
              </p>
            </div>
            <div>
              <p className="uppercase tracking-[0.3em] text-[11px] mb-4" style={{ color: GOLD }}>Body - Neutral Sans</p>
              <p className="text-lg leading-relaxed" style={{ color: TAUPE }}>
                Body copy stays quiet and legible, generous in line-height and set in a neutral sans so the serif display can hold all the drama. Labels above run in uppercase at wide tracking; the eye reads them as a house mark, not a sentence.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* COMPONENTS - over the film                                   */}
      {/* ============================================================ */}
      <section id="components" className="scroll-mt-20 relative min-h-screen overflow-hidden flex items-center py-24">
        <FilmStage playing={playing} />
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to top, rgba(20,18,16,0.7), rgba(20,18,16,0.35) 50%, rgba(20,18,16,0.5))" }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 w-full">
          <Reveal className="mb-14">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs" style={{ color: GOLD, fontFamily: SERIF }}>05</span>
              <span className="uppercase tracking-[0.3em] text-[11px]" style={{ color: "rgba(247,245,241,0.6)" }}>Components</span>
            </div>
            <h2 className="text-3xl md:text-5xl leading-[1.02] max-w-2xl" style={{ color: PORCELAIN, fontFamily: SERIF }}>Legible over any frame</h2>
          </Reveal>

          {/* Buttons */}
          <Reveal className="mb-12">
            <p className="uppercase tracking-[0.3em] text-[11px] mb-5" style={{ color: "rgba(247,245,241,0.6)" }}>Buttons</p>
            <div className="flex flex-wrap items-center gap-5">
              <button className="px-9 py-4 bg-[#F7F5F1] text-[#141210] uppercase tracking-[0.2em] text-xs hover:bg-[#9A7B4F] hover:text-[#F7F5F1] transition-all duration-500">
                Book an appointment
              </button>
              <button className="px-9 py-4 bg-transparent border border-[#F7F5F1] text-[#F7F5F1] uppercase tracking-[0.2em] text-xs hover:bg-[#F7F5F1] hover:text-[#141210] transition-all duration-500">
                View the collection
              </button>
              <button className="px-1 py-2 bg-transparent border-b border-[#F7F5F1]/50 text-[#F7F5F1] uppercase tracking-[0.2em] text-xs hover:border-[#9A7B4F] hover:text-[#9A7B4F] transition-all duration-500">
                Read the notes
              </button>
              <button className="px-9 py-4 bg-[#9A7B4F] text-[#141210] uppercase tracking-[0.2em] text-xs hover:opacity-80 transition-all duration-500">
                Reserve
              </button>
            </div>
          </Reveal>

          {/* Cards */}
          <Reveal delay={0.05} className="mb-12">
            <p className="uppercase tracking-[0.3em] text-[11px] mb-5" style={{ color: "rgba(247,245,241,0.6)" }}>Cards</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {LOOKS.slice(0, 3).map((look) => (
                <article key={look.no} className="p-6" style={{ backgroundColor: "rgba(247,245,241,0.94)" }}>
                  <p className="uppercase tracking-[0.3em] text-[10px] mb-3" style={{ color: GOLD }}>Look {look.no}</p>
                  <h4 className="text-xl mb-2" style={{ color: INK, fontFamily: SERIF }}>{look.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: TAUPE }}>{look.note}</p>
                  <div className="mt-5 pt-4 border-t" style={{ borderColor: "rgba(20,18,16,0.15)" }}>
                    <span className="uppercase tracking-[0.2em] text-[10px]" style={{ color: INK }}>From EUR 4,000</span>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>

          {/* Badges */}
          <Reveal delay={0.1}>
            <p className="uppercase tracking-[0.3em] text-[11px] mb-5" style={{ color: "rgba(247,245,241,0.6)" }}>Badges</p>
            <div className="flex flex-wrap gap-4">
              {["Made to measure", "Limited edition", "Archive", "Runway exclusive"].map((b, i) => (
                <span
                  key={b}
                  className="px-4 py-2 uppercase tracking-[0.2em] text-[10px] border"
                  style={
                    i === 0
                      ? { backgroundColor: GOLD, color: INK, borderColor: GOLD }
                      : { backgroundColor: "transparent", color: PORCELAIN, borderColor: "rgba(247,245,241,0.4)" }
                  }
                >
                  {b}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* APPOINTMENT + NEWSLETTER form                                */}
      {/* ============================================================ */}
      <section className="py-24 md:py-36 px-6 md:px-10" style={{ backgroundColor: PORCELAIN }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <SectionHead no="06" kicker="Appointment" title="Be shown the season first" />
            <Reveal>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setForm("sent");
                }}
                className="space-y-8 max-w-md"
              >
                <div>
                  <label htmlFor="ll-name" className="block uppercase tracking-[0.25em] text-[10px] mb-3" style={labelStyle}>Full name</label>
                  <input
                    id="ll-name"
                    type="text"
                    placeholder="Your name"
                    className="w-full px-0 py-3 bg-transparent border-b text-[#141210] placeholder-[#141210]/40 uppercase tracking-[0.15em] text-xs focus:outline-none focus:border-[#9A7B4F] transition-all duration-500"
                    style={{ borderColor: "rgba(20,18,16,0.25)" }}
                  />
                </div>
                <div>
                  <label htmlFor="ll-email" className="block uppercase tracking-[0.25em] text-[10px] mb-3" style={labelStyle}>Email</label>
                  <input
                    id="ll-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full px-0 py-3 bg-transparent border-b text-[#141210] placeholder-[#141210]/40 uppercase tracking-[0.15em] text-xs focus:outline-none focus:border-[#9A7B4F] transition-all duration-500"
                    style={{ borderColor: "rgba(20,18,16,0.25)" }}
                  />
                </div>
                <div>
                  <label htmlFor="ll-boutique" className="block uppercase tracking-[0.25em] text-[10px] mb-3" style={labelStyle}>Preferred boutique</label>
                  <select
                    id="ll-boutique"
                    className="w-full px-0 py-3 bg-transparent border-b text-[#141210] uppercase tracking-[0.15em] text-xs focus:outline-none focus:border-[#9A7B4F] transition-all duration-500"
                    style={{ borderColor: "rgba(20,18,16,0.25)" }}
                  >
                    <option>Paris</option>
                    <option>Milan</option>
                    <option>Tokyo</option>
                  </select>
                </div>
                <button type="submit" className="px-9 py-4 bg-[#141210] text-[#F7F5F1] uppercase tracking-[0.2em] text-xs hover:bg-[#9A7B4F] transition-all duration-500">
                  {form === "sent" ? "Requested" : "Request appointment"}
                </button>
                {form === "sent" && (
                  <p className="text-sm" style={{ color: GOLD }}>Thank you. The maison will write to {email || "you"} shortly.</p>
                )}
              </form>
            </Reveal>
          </div>

          <div className="md:pt-4">
            <Reveal delay={0.05}>
              <div className="border-t pt-10" style={{ borderColor: "rgba(20,18,16,0.15)" }}>
                <p className="uppercase tracking-[0.3em] text-[11px] mb-4" style={{ color: GOLD }}>The Letter</p>
                <h3 className="text-3xl md:text-4xl leading-[1.05] mb-6" style={{ color: INK, fontFamily: SERIF }}>
                  A quiet note, each season
                </h3>
                <p className="text-base leading-relaxed mb-8" style={{ color: TAUPE }}>
                  No noise, no daily mail. One letter when a collection arrives, written by the atelier and shot on porcelain.
                </p>
                <div className="flex items-end gap-4 max-w-md">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-0 py-3 bg-transparent border-b text-[#141210] placeholder-[#141210]/40 uppercase tracking-[0.15em] text-xs focus:outline-none focus:border-[#9A7B4F] transition-all duration-500"
                    style={{ borderColor: "rgba(20,18,16,0.25)" }}
                  />
                  <button className="px-7 py-3 bg-transparent border border-[#141210] text-[#141210] uppercase tracking-[0.2em] text-[10px] hover:bg-[#141210] hover:text-[#F7F5F1] transition-all duration-500">
                    Subscribe
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* RUNWAY schedule table                                        */}
      {/* ============================================================ */}
      <section className="py-24 md:py-36 px-6 md:px-10" style={{ backgroundColor: STONE }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead no="07" kicker="Runway" title="The season in three cities" />
          <Reveal>
            <div className="border-t" style={{ borderColor: "rgba(20,18,16,0.2)" }}>
              {RUNWAY.map((row) => (
                <div
                  key={row.season}
                  className="grid grid-cols-12 gap-4 items-baseline py-7 border-b group"
                  style={{ borderColor: "rgba(20,18,16,0.15)" }}
                >
                  <span className="col-span-6 md:col-span-5 text-2xl md:text-3xl transition-colors duration-500 group-hover:text-[#9A7B4F]" style={{ color: INK, fontFamily: SERIF }}>{row.season}</span>
                  <span className="col-span-3 md:col-span-3 uppercase tracking-[0.2em] text-xs" style={{ color: TAUPE }}>{row.city}</span>
                  <span className="hidden md:block md:col-span-3 uppercase tracking-[0.15em] text-xs" style={{ color: TAUPE }}>{row.venue}</span>
                  <span className="col-span-3 md:col-span-1 text-right tabular-nums text-sm" style={{ color: INK, fontFamily: SERIF }}>{row.date}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PRESS quote                                                  */}
      {/* ============================================================ */}
      <section className="py-28 md:py-44 px-6 md:px-10" style={{ backgroundColor: INK }}>
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="uppercase tracking-[0.3em] text-[11px] mb-10" style={{ color: GOLD }}>The Press</p>
            <blockquote className="text-3xl md:text-5xl leading-[1.25]" style={{ color: PORCELAIN, fontFamily: SERIF }}>
              &ldquo;The maison says everything by leaving the room half empty. It is the most expensive kind of quiet.&rdquo;
            </blockquote>
            <p className="mt-10 uppercase tracking-[0.25em] text-xs" style={{ color: "rgba(247,245,241,0.6)" }}>Vogue - The Editor&apos;s Note</p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* DO / DON'T                                                   */}
      {/* ============================================================ */}
      <section className="py-24 md:py-36 px-6 md:px-10" style={{ backgroundColor: PORCELAIN }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead no="08" kicker="Guidelines" title="The house code" />
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="border-t-2 pt-7" style={{ borderColor: GOLD }}>
                <h3 className="text-2xl md:text-3xl mb-7" style={{ color: INK, fontFamily: SERIF }}>Do</h3>
                <ul className="space-y-4">
                  {[
                    "Porcelain ground, ink type, one muted gold accent",
                    "Oversized Didone serif; weight from the face, not font-bold",
                    "Vast whitespace; let one plate own the screen",
                    "Poster-first film; play only in view, pause offscreen",
                    "4:5 plates via picture AVIF+WebP; hover transform reveal",
                    "Square corners and hairline rules everywhere",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: TAUPE }}>
                      <span className="shrink-0" style={{ color: GOLD }}>+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t-2 pt-7" style={{ borderColor: "rgba(20,18,16,0.25)" }}>
                <h3 className="text-2xl md:text-3xl mb-7" style={{ color: "rgba(20,18,16,0.55)", fontFamily: SERIF }}>Don&apos;t</h3>
                <ul className="space-y-4">
                  {[
                    "Add radius, shadow, or gradient decoration",
                    "Spread the gold across many elements",
                    "Fake weight with font-bold utilities",
                    "Crowd the layout or fill the whitespace",
                    "Make the video the LCP or omit the poster",
                    "Use fast or jump-cut showy motion",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "rgba(20,18,16,0.5)" }}>
                      <span className="shrink-0" style={{ color: "rgba(20,18,16,0.35)" }}>-</span>
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
      <footer className="py-16 px-6 md:px-10 border-t" style={{ backgroundColor: PORCELAIN, borderColor: "rgba(20,18,16,0.15)" }}>
        <div className="max-w-6xl mx-auto flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="text-3xl tracking-tight" style={{ color: INK, fontFamily: SERIF }}>Maison</span>
            <p className="uppercase tracking-[0.25em] text-xs mt-3" style={{ color: TAUPE }}>Paris - Milan - Tokyo</p>
          </div>
          <Link href="/styles" className="uppercase tracking-[0.2em] text-xs transition-colors duration-500 hover:text-[#9A7B4F]" style={{ color: INK }}>
            Back to all styles
          </Link>
        </div>
      </footer>
    </div>
  );
}
