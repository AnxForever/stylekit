"use client";

import { useState } from "react";

const works = [
  { title: "Edge of the City", medium: "35mm · Ilford HP5", year: "2026", w: 3, h: 2 },
  { title: "Silent Morning", medium: "Digital · Fuji GFX", year: "2025", w: 2, h: 3 },
  { title: "Concrete Shadows", medium: "35mm · Kodak Portra", year: "2025", w: 4, h: 3 },
  { title: "Glass House", medium: "Medium Format · Velvia", year: "2024", w: 3, h: 2 },
  { title: "Fog Sequence", medium: "Digital · Leica M11", year: "2024", w: 2, h: 2 },
  { title: "Neon Reflections", medium: "35mm · Cinestill", year: "2026", w: 3, h: 4 },
  { title: "The Passage", medium: "Large Format", year: "2025", w: 4, h: 3 },
  { title: "Coastal Light", medium: "Digital · Hasselblad", year: "2024", w: 3, h: 2 },
];

const aspectClass = (w: number, h: number) => {
  const r = w / h;
  if (r >= 1.5) return "col-span-2 row-span-1";
  if (r <= 0.67) return "col-span-1 row-span-2";
  if (r >= 1.2) return "col-span-2 row-span-1";
  return "col-span-1 row-span-1";
};

const accentGrad = "bg-gradient-to-r from-[#C4956A] to-[#A07850]";

export default function GalleryDarkShowcase() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans">
      {/* Ultra-minimal nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-sm border-b border-[#1A1A1A]">
        <nav className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[#C4956A] text-xs tracking-[0.3em] font-medium">GALLERY</span>
          </div>
          <div className="flex items-center gap-8 text-xs tracking-[0.15em] text-[#666666]">
            <a href="#" className="hover:text-white transition-colors">WORK</a>
            <a href="#" className="hover:text-white transition-colors">ABOUT</a>
            <a href="#" className="hover:text-white transition-colors">CONTACT</a>
          </div>
        </nav>
      </header>

      {/* Hero — full-bleed image area */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-[#1A1A1A]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#222] via-[#1A1A1A] to-[#111]" />
          {/* Grid overlay hint */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }} />
        </div>
        <div className="absolute bottom-16 left-0 right-0 px-6 max-w-7xl mx-auto">
          <p className="text-[#C4956A] text-xs tracking-[0.3em] mb-3">FEATURED SERIES</p>
          <h1 className="text-5xl md:text-7xl font-light leading-tight tracking-tight">Urban Solitude</h1>
          <p className="text-[#666666] text-sm mt-4 max-w-lg leading-relaxed">
            A photographic exploration of empty spaces in the modern city — quiet corners where architecture meets atmosphere.
          </p>
          <div className="flex items-center gap-3 mt-6 text-xs text-[#555555]">
            <span>12 photographs</span>
            <span className="w-px h-3 bg-[#333]" />
            <span>2024–2026</span>
            <span className="w-px h-3 bg-[#333]" />
            <span className="text-[#C4956A]">View series →</span>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-xs tracking-[0.3em] text-[#C4956A]">ALL WORK</h2>
          <div className="flex gap-3 text-xs text-[#555555]">
            <span className="text-white">All</span>
            <span className="hover:text-white transition-colors cursor-pointer">Architecture</span>
            <span className="hover:text-white transition-colors cursor-pointer">Portrait</span>
            <span className="hover:text-white transition-colors cursor-pointer">Landscape</span>
            <span className="hover:text-white transition-colors cursor-pointer">Street</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[200px]">
          {works.map((work, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className={`group relative overflow-hidden bg-[#1A1A1A] rounded-sm ${aspectClass(work.w, work.h)} cursor-pointer`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#222] to-[#151515 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className={`absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300`}>
                <p className="text-sm font-medium">{work.title}</p>
                <p className="text-xs text-[#C4956A] mt-0.5">{work.medium}</p>
              </div>
              <div className="absolute top-3 right-3 text-[10px] text-[#555555] font-mono">
                <span className={`${accentGrad} bg-clip-text text-transparent font-bold`}>{work.year}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* About / Bio */}
      <section className="border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#C4956A] mb-4">ABOUT</p>
            <h2 className="text-3xl font-light leading-tight">Seeing the<br/>unseen corners</h2>
          </div>
          <div className="space-y-4 text-sm text-[#888888] leading-relaxed">
            <p>
              I am a documentary and architectural photographer based between Tokyo and Berlin.
              My work explores the quiet intersection of human presence and built environment —
              the spaces we occupy but rarely notice.
            </p>
            <p>
              Trained in fine art photography at the University of the Arts London, I work
              primarily with medium format film and digital capture, printing all my own
              work in the darkroom.
            </p>
            <div className="flex items-center gap-6 pt-4 text-xs">
              <div>
                <span className="text-[#C4956A] font-medium">12+</span>
                <span className="text-[#555555] ml-1">years</span>
              </div>
              <div>
                <span className="text-[#C4956A] font-medium">48</span>
                <span className="text-[#555555] ml-1">exhibitions</span>
              </div>
              <div>
                <span className="text-[#C4956A] font-medium">3</span>
                <span className="text-[#555555] ml-1">monographs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-[#1A1A1A]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <p className="text-xs tracking-[0.3em] text-[#C4956A] mb-8 text-center">CONTACT</p>
          <div className="max-w-md mx-auto text-center space-y-6">
            <p className="text-sm text-[#666666] leading-relaxed">
              Available for commissioned work, exhibitions, and collaborations.
            </p>
            <div className="space-y-1">
              <p className="text-sm"><span className="text-[#C4956A]">hello</span>@example.com</p>
              <p className="text-xs text-[#555555]">@gallery_photo</p>
            </div>
            <div className={`h-px ${accentGrad} w-12 mx-auto`} />
            <p className="text-[10px] text-[#444444] tracking-[0.2em]">DARK GALLERY PORTFOLIO</p>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <div className="max-w-4xl w-full mx-6" onClick={(e) => e.stopPropagation()}>
            <div className="aspect-[4/3] bg-[#1A1A1A] rounded-sm flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="w-48 h-32 mx-auto bg-gradient-to-br from-[#222] to-[#151515] rounded-sm" />
                <p className="text-xs text-[#555555] mt-3">{works[lightbox].medium}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-medium">{works[lightbox].title}</p>
                <p className="text-xs text-[#666666]">{works[lightbox].year}</p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="text-xs text-[#555555] hover:text-white transition-colors tracking-[0.15em]"
              >
                CLOSE
              </button>
            </div>
          </div>
          {/* Nav arrows */}
          <button
            onClick={() => setLightbox(Math.max(0, lightbox - 1))}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-[#444444] hover:text-white text-2xl transition-colors disabled:opacity-20"
            disabled={lightbox === 0}
          >‹</button>
          <button
            onClick={() => setLightbox(Math.min(works.length - 1, lightbox + 1))}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-[#444444] hover:text-white text-2xl transition-colors disabled:opacity-20"
            disabled={lightbox === works.length - 1}
          >›</button>
        </div>
      )}
    </div>
  );
}
