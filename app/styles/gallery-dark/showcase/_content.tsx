"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UnsplashAttribution } from "@/components/styles/unsplash-attribution";

gsap.registerPlugin(ScrollTrigger);

const works = [
  { title: "Edge of the City", medium: "35mm · Ilford HP5", year: "2026", w: 3, h: 2 },
  { title: "Silent Morning", medium: "Digital · Fuji GFX", year: "2025", w: 2, h: 3 },
  { title: "Concrete Shadows", medium: "35mm · Kodak Portra", year: "2025", w: 4, h: 3 },
  { title: "Glass House", medium: "Medium Format · Velvia", year: "2024", w: 3, h: 2 },
  { title: "Fog Sequence", medium: "Digital · Leica M11", year: "2024", w: 2, h: 2 },
  { title: "Neon Reflections", medium: "35mm · Cinestill", year: "2026", w: 3, h: 4 },
  { title: "The Passage", medium: "Large Format", year: "2025", w: 4, h: 3 },
  { title: "Coastal Light", medium: "Digital · Hasselblad", year: "2024", w: 3, h: 2 },
  { title: "Urban Grid", medium: "Medium Format · Portra", year: "2026", w: 2, h: 2 },
  { title: "Quiet Morning", medium: "35mm · Tri-X", year: "2025", w: 3, h: 2 },
];

const aspectClass = (w: number, h: number) => {
  const r = w / h;
  if (r >= 1.5) return "md:col-span-2 md:row-span-1";
  if (r <= 0.67) return "md:col-span-1 md:row-span-2";
  if (r >= 1.2) return "md:col-span-2 md:row-span-1";
  return "md:col-span-1 md:row-span-1";
};

// Detect if generated images exist; fall back to placeholder gradient if not
function styleImageUrl(slug: string, index: number): string {
  // Webpack will resolve this at build time; runtime fallback handled by onError
  return `/images/styles/gallery-dark/${String(index + 1).padStart(2, "0")}.webp`;
}

export default function GalleryDarkShowcase() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-bg", {
        yPercent: 25,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1.5 },
      });
      gsap.to(".hero-title", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.to(".hero-meta", {
        yPercent: 30,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 },
      });
      gsap.fromTo(
        ".gallery-item",
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1,
          duration: 0.8, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: ".gallery-grid", start: "top 82%", toggleActions: "play none none reverse" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  const goNext = useCallback(() => {
    if (lightbox !== null) setLightbox((lightbox + 1) % works.length);
  }, [lightbox]);
  const goPrev = useCallback(() => {
    if (lightbox !== null) setLightbox((lightbox - 1 + works.length) % works.length);
  }, [lightbox]);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, goNext, goPrev]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      {/* HERO */}
      <section ref={heroRef} className="hero-section relative h-screen w-full overflow-hidden">
        <div className="hero-bg absolute inset-0 will-change-transform">
          <div className="absolute inset-0 bg-gradient-to-br from-[#222] via-[#141414] to-[#0A0A0A]" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.08) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="relative w-[600px] h-[400px] border border-[#2A2A2A]">
              <div className="absolute -top-0.5 -left-0.5 w-3 h-3 border-t-2 border-l-2 border-[#C4956A]" />
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 border-t-2 border-r-2 border-[#C4956A]" />
              <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 border-b-2 border-l-2 border-[#C4956A]" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-b-2 border-r-2 border-[#C4956A]" />
            </div>
          </div>
        </div>
        <div className="hero-title absolute inset-0 flex items-center justify-center will-change-transform">
          <div className="text-center px-6">
            <p className="text-[#C4956A] text-xs md:text-sm tracking-[0.3em] mb-4 font-medium">FEATURED SERIES</p>
            <h1 className="text-5xl md:text-8xl font-light leading-[0.95] tracking-tight">Urban<br />Solitude</h1>
          </div>
        </div>
        <div className="hero-meta absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-12 md:pb-16 will-change-transform">
          <div className="max-w-2xl">
            <p className="text-sm md:text-base text-[#888888] leading-relaxed max-w-xl">A photographic exploration of empty spaces in the modern city.</p>
            <div className="flex items-center gap-4 mt-4 text-xs text-[#555555]">
              <span>12 photographs</span>
              <span className="w-px h-3 bg-[#333]" />
              <span>2024–2026</span>
              <span className="w-px h-3 bg-[#333]" />
              <span className="text-[#C4956A] cursor-pointer hover:text-white transition-colors">View series →</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[10px] text-[#444444] tracking-[0.2em] animate-pulse">
          <span>SCROLL</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M3 7l3 3 3-3" stroke="#666" strokeWidth="1" />
          </svg>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="px-6 md:px-16 py-24 md:py-36">
        <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-12 md:gap-20">
          <div className="md:col-span-2">
            <p className="text-xs tracking-[0.25em] text-[#C4956A] font-medium">STATEMENT</p>
          </div>
          <div className="md:col-span-3 space-y-6">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-[#CCCCCC]">
              &ldquo;I am drawn to the spaces between things — the pause between footsteps,
              the light that catches a window at dusk, the geometry of a shadow across concrete.&rdquo;
            </p>
            <p className="text-sm text-[#666666] leading-relaxed">
              This series collects images made over three years across Tokyo, Berlin, and New York.
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="px-6 md:px-16 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4956A]" />
              <h2 className="text-xs tracking-[0.3em] text-[#C4956A] font-medium">WORKS</h2>
            </div>
            <div className="hidden md:flex gap-5 text-xs text-[#555555]">
              <span className="text-white">All</span>
              <span className="hover:text-white transition-colors cursor-pointer">Architecture</span>
              <span className="hover:text-white transition-colors cursor-pointer">Street</span>
              <span className="hover:text-white transition-colors cursor-pointer">Portrait</span>
              <span className="hover:text-white transition-colors cursor-pointer">Landscape</span>
            </div>
          </div>
          <div className="gallery-grid grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[260px]">
            {works.map((work, i) => (
              <button
                key={i}
                onClick={() => setLightbox(i)}
                className={`gallery-item group relative overflow-hidden bg-[#1A1A1A] rounded-sm cursor-pointer ${aspectClass(work.w, work.h)} will-change-transform`}
              >
                {/* Unsplash image or fallback gradient */}
                <img
                  src={styleImageUrl("gallery-dark", i)}
                  alt={work.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${imgErrors.has(i) ? "hidden" : ""}`}
                  onError={() => setImgErrors((prev) => new Set(prev).add(i))}
                />
                {imgErrors.has(i) && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#222] to-[#141414] group-hover:scale-105 transition-transform duration-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-5 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                  <p className="text-sm md:text-base font-medium">{work.title}</p>
                  <p className="text-xs text-[#C4956A] mt-0.5">{work.medium}</p>
                </div>
                <div className="absolute top-2 right-2 md:top-3 md:right-3 text-[10px] text-[#C4956A] font-mono font-bold">{work.year}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-t border-[#1A1A1A] px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4956A]" />
            <p className="text-xs tracking-[0.3em] text-[#C4956A] font-medium">PROCESS</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              { step: "01", title: "Frame", desc: "Every photograph begins with patient observation — waiting for light, shadow, and subject to align." },
              { step: "02", title: "Develop", desc: "Film is developed by hand in the darkroom. Digital files are graded to match film's natural tonality." },
              { step: "03", title: "Print", desc: "Final images are printed on archival Hahnemühle paper, signed, numbered, and editioned." },
            ].map((p) => (
              <div key={p.step}>
                <p className="text-[#C4956A] text-sm font-bold mb-2">{p.step}</p>
                <h3 className="text-xl md:text-2xl font-light mb-2">{p.title}</h3>
                <p className="text-sm text-[#666666] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="border-t border-[#1A1A1A] px-6 md:px-16 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4956A]" />
            <p className="text-xs tracking-[0.3em] text-[#C4956A] font-medium">CONTACT</p>
          </div>
          <div className="max-w-md mx-auto text-center space-y-6">
            <p className="text-sm text-[#666666] leading-relaxed">Available for commissioned work, exhibitions, and collaborations.</p>
            <div className="space-y-1">
              <p className="text-base"><span className="text-[#C4956A]">hello</span>@example.com</p>
              <p className="text-sm text-[#555555]">@gallery_photo</p>
            </div>
            <div className="h-px w-12 mx-auto bg-[#C4956A]" />
            <p className="text-[10px] text-[#444444] tracking-[0.2em]">DARK GALLERY · PORTFOLIO STYLE</p>
            <div className="mt-6">
              <UnsplashAttribution />
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm" onClick={() => setLightbox(null)}>
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10 flex items-center gap-3">
            <span className="text-xs text-[#555555] font-mono">{lightbox + 1} / {works.length}</span>
            <button onClick={() => setLightbox(null)} className="text-xs text-[#555555] hover:text-white transition-colors tracking-[0.15em]">CLOSE <span className="hidden md:inline">(ESC)</span></button>
          </div>
          <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-[#444444] hover:text-white text-3xl transition-colors z-10" aria-label="Previous">‹</button>
          <div className="max-w-5xl w-full mx-6" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-[3/2] bg-[#1A1A1A] rounded-sm flex items-center justify-center overflow-hidden">
              {!imgErrors.has(lightbox) ? (
                <img src={styleImageUrl("gallery-dark", lightbox)} alt={works[lightbox].title} className="w-full h-full object-cover" onError={() => setImgErrors((prev) => new Set(prev).add(lightbox))} />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#222] to-[#141414]" />
              )}
            </div>
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-lg md:text-xl font-medium">{works[lightbox].title}</p>
                <p className="text-xs text-[#666666]">{works[lightbox].year}</p>
              </div>
              <p className="text-[10px] text-[#444444] font-mono tracking-[0.05em]">ƒ/2.8 · 1/125s · ISO 400</p>
            </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-[#444444] hover:text-white text-3xl transition-colors z-10" aria-label="Next">›</button>
        </div>
      )}
    </div>
  );
}
