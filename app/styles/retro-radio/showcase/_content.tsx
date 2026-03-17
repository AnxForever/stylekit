"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Inline hooks
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
/* PLACEHOLDER_SECTION_LABEL */

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-serif text-xs tracking-[0.3em] text-[#d4a017]/60 mb-6">
      {"~ "}{children}{" ~"}
    </p>
  );
}

function BrassKnob({ label, rotation = 0 }: { label: string; rotation?: number }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-14 h-14 rounded-full border-2 border-[#8b6914] relative"
        style={{
          background: "linear-gradient(135deg, #e0b020, #d4a017, #8b6914)",
          boxShadow: "0 2px 12px rgba(212,160,23,0.4), inset 0 1px 2px rgba(255,255,255,0.2)",
        }}
      >
        <div
          className="absolute w-0.5 h-4 bg-[#3d2b1f] left-1/2 -translate-x-1/2 top-1 rounded-full"
          style={{ transform: `translateX(-50%) rotate(${rotation}deg)`, transformOrigin: "bottom center" }}
        />
      </div>
      <span className="text-[#f5e6d3]/60 font-serif text-[10px] tracking-widest">{label}</span>
    </div>
  );
}

function TubeIndicator({ active = false }: { active?: boolean }) {
  return (
    <div
      className="w-3 h-3 rounded-full transition-all duration-700"
      style={{
        background: active ? "#d4a017" : "#5c3d2e",
        boxShadow: active ? "0 0 8px rgba(212,160,23,0.6), 0 0 16px rgba(212,160,23,0.3)" : "none",
      }}
    />
  );
}

// Inline SVG icons
function RadioIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.4" />
      <circle cx="12" cy="12" r="2" fill="#d4a017" />
      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.4" />
      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
    </svg>
  );
}

function DialIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" fill="#d4a017" />
      <line x1="12" y1="2" x2="12" y2="6" />
    </svg>
  );
}

function SpeakerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#d4a017" opacity="0.2" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12 Q6 6 10 12 T18 12 T22 12" />
    </svg>
  );
}

/* PLACEHOLDER_MAIN_EXPORT */

// ---------------------------------------------------------------------------
// Main Export
// ---------------------------------------------------------------------------

export default function RetroRadioShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const [frequency, setFrequency] = useState(98.7);
  const [volume, setVolume] = useState(65);
  const [activeStation, setActiveStation] = useState(0);
  const [powered, setPowered] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setPowered(true), 300);
    return () => clearTimeout(t);
  }, []);

  const stations = [
    { id: 0, name: "Golden Classics", freq: 98.7, genre: "Oldies", color: "#d4a017" },
    { id: 1, name: "Jazz Lounge", freq: 101.3, genre: "Jazz", color: "#c4956a" },
    { id: 2, name: "Vinyl Hour", freq: 88.5, genre: "Rock", color: "#8b6914" },
    { id: 3, name: "Midnight Serenade", freq: 105.1, genre: "Classical", color: "#e8d5b7" },
  ];

  const palette = [
    { name: "Dark Wood", hex: "#3d2b1f", label: "PRIMARY" },
    { name: "Cream", hex: "#f5e6d3", label: "SECONDARY" },
    { name: "Brass", hex: "#d4a017", label: "ACCENT" },
    { name: "Deep Wood", hex: "#2a1f15", label: "SURFACE" },
    { name: "Antique Gold", hex: "#8b6914", label: "MUTED" },
    { name: "Warm Tan", hex: "#c4956a", label: "TERTIARY" },
    { name: "Parchment", hex: "#e8d5b7", label: "LIGHT" },
    { name: "Walnut", hex: "#5c3d2e", label: "DARK" },
  ];

  const animations = [
    { label: "Dial Sweep", desc: "Needle sweeps -60deg to 60deg simulating tuning", code: "animation: rr-dial-sweep 4s ease-in-out infinite" },
    { label: "Knob Glow", desc: "Brass knob pulsing warm glow on interaction", code: "animation: rr-knob-glow 2s ease-in-out infinite" },
    { label: "Static Noise", desc: "Subtle noise texture shift for analog feel", code: "animation: rr-static-noise 0.5s steps(4) infinite" },
    { label: "Warm Pulse", desc: "Tube indicator warm breathing effect", code: "animation: rr-warm-pulse 3s ease-in-out infinite" },
  ];

  const selectedStation = stations[activeStation];

  return (
    <div
      className="min-h-screen bg-[#3d2b1f] text-[#f5e6d3]"
      style={{ opacity: powered ? 1 : 0, transition: "opacity 0.6s ease" }}
    >
      <style jsx global>{`
        @keyframes rr-dial-sweep {
          0% { transform: rotate(-60deg); }
          50% { transform: rotate(60deg); }
          100% { transform: rotate(-60deg); }
        }
        @keyframes rr-knob-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(212,160,23,0.3); }
          50% { box-shadow: 0 0 20px rgba(212,160,23,0.6); }
        }
        @keyframes rr-static-noise {
          0% { opacity: 0.03; transform: translateX(0); }
          25% { opacity: 0.06; transform: translateX(-1px); }
          50% { opacity: 0.02; transform: translateX(1px); }
          75% { opacity: 0.05; transform: translateX(-0.5px); }
          100% { opacity: 0.03; transform: translateX(0); }
        }
        @keyframes rr-warm-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* 1. Hero */}
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,160,23,0.1),transparent_70%)]" />
        <div
          className="relative max-w-4xl mx-auto text-center"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="flex justify-center mb-6"><RadioIcon /></div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-wide" style={{ textShadow: "0 2px 30px rgba(212,160,23,0.3)" }}>Retro Radio</h1>
          <p className="mt-4 text-[#d4a017]/80 font-serif text-sm tracking-[0.2em]">Tune into the golden age of analog warmth</p>
          <div className="mt-8 flex justify-center gap-3">
            {[true, true, true, false, false].map((on, i) => <TubeIndicator key={i} active={on} />)}
          </div>
        </div>
      </section>

      {/* 2. Frequency Dial */}
      <RevealBlock className="px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Frequency Dial</SectionLabel>
          <div className="bg-[#f5e6d3] rounded-xl p-8">
            <div className="flex justify-between mb-2 px-2">
              {["530", "700", "900", "1100", "1400", "1600"].map((f) => (
                <span key={f} className="text-[#3d2b1f]/70 font-serif text-xs">{f}</span>
              ))}
            </div>
            <div className="h-px bg-[#3d2b1f]/20 mb-4 relative">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="absolute top-0 w-px bg-[#3d2b1f]/30" style={{ left: `${(i / 29) * 100}%`, height: i % 5 === 0 ? "8px" : "4px" }} />
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <div className="relative w-40 h-20">
                <div className="absolute bottom-0 left-1/2 w-0.5 h-16 bg-[#d4a017] origin-bottom" style={{ animation: "rr-dial-sweep 4s ease-in-out infinite" }} />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#d4a017]" style={{ boxShadow: "0 0 12px rgba(212,160,23,0.5)" }} />
              </div>
            </div>
            <p className="text-center text-[#3d2b1f]/60 font-serif text-xs mt-4 tracking-widest">FM STEREO</p>
          </div>
        </div>
      </RevealBlock>

      {/* 3. Radio Tuner Display */}
      <RevealBlock className="px-6 py-16 md:py-20 bg-[#2a1f15]">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Radio Tuner</SectionLabel>
          <div className="bg-[#3d2b1f] border-2 border-[#d4a017]/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#d4a017] font-serif text-xs tracking-widest">FM STEREO</span>
              <div className="flex gap-2"><TubeIndicator active /><TubeIndicator active /></div>
            </div>
            <div className="bg-[#2a1f15] rounded-lg p-4 mb-4">
              <div className="text-center">
                <span className="text-[#d4a017] font-serif text-5xl font-bold" style={{ textShadow: "0 0 20px rgba(212,160,23,0.4)" }}>{selectedStation.freq.toFixed(1)}</span>
                <span className="text-[#d4a017]/60 font-serif text-lg ml-2">MHz</span>
              </div>
              <p className="text-center text-[#f5e6d3]/60 font-serif text-sm mt-2">{selectedStation.name}</p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {stations.map((s) => (
                <button key={s.id} onClick={() => setActiveStation(s.id)} className={`px-3 py-2 rounded-lg font-serif text-xs transition-all duration-300 border ${activeStation === s.id ? "bg-[#d4a017] text-[#3d2b1f] border-[#d4a017]" : "bg-[#2a1f15] text-[#f5e6d3]/70 border-[#d4a017]/20 hover:border-[#d4a017]/50"}`}>
                  {s.freq}
                </button>
              ))}
            </div>
          </div>
        </div>
      </RevealBlock>

      {/* 4. Volume/Tone Knobs */}
      <RevealBlock className="px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Controls</SectionLabel>
          <div className="flex justify-center gap-12 md:gap-16">
            <BrassKnob label="VOLUME" rotation={-30 + (volume / 100) * 240} />
            <BrassKnob label="TONE" rotation={45} />
            <BrassKnob label="BASS" rotation={-15} />
            <BrassKnob label="TREBLE" rotation={60} />
          </div>
          <div className="mt-8 max-w-md mx-auto">
            <label className="block text-[#d4a017]/60 font-serif text-xs tracking-widest mb-2 text-center">VOLUME: {volume}%</label>
            <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="w-full accent-[#d4a017] cursor-pointer" />
          </div>
        </div>
      </RevealBlock>

      {/* 5. Button Variants */}
      <RevealBlock className="px-6 py-16 md:py-20 bg-[#2a1f15]">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Buttons</SectionLabel>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-3 bg-[#d4a017] text-[#3d2b1f] font-serif tracking-wide border-2 border-[#d4a017] rounded-lg shadow-[0_2px_12px_rgba(212,160,23,0.4)] hover:shadow-[0_4px_24px_rgba(212,160,23,0.6)] hover:bg-[#e0b020] active:translate-y-[2px] transition-all duration-300">
              Tune In
            </button>
            <button className="px-8 py-3 bg-[#3d2b1f] text-[#f5e6d3] font-serif tracking-wide border-2 border-[#d4a017]/40 rounded-lg hover:border-[#d4a017] hover:shadow-[0_2px_16px_rgba(212,160,23,0.2)] active:translate-y-[2px] transition-all duration-300">
              Browse Stations
            </button>
            <button className="px-8 py-3 bg-[#2a1f15] text-[#d4a017] font-serif tracking-wide border-2 border-[#d4a017]/20 rounded-lg hover:border-[#d4a017]/50 active:translate-y-[2px] transition-all duration-300">
              Save Preset
            </button>
          </div>
        </div>
      </RevealBlock>

      {/* 6. Card Grid */}
      <RevealBlock className="px-6 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Station Cards</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stations.map((s, i) => (
              <RevealBlock key={s.id} delay={i * 0.1}>
                <div className="bg-[#3d2b1f] border-2 border-[#d4a017]/20 rounded-lg p-6 hover:border-[#d4a017]/50 hover:shadow-[0_4px_24px_rgba(212,160,23,0.15)] hover:-translate-y-1 transition-all duration-300 cursor-pointer" onClick={() => setActiveStation(s.id)}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ background: s.color, boxShadow: `0 0 8px ${s.color}60` }} />
                    <span className="text-[#d4a017]/70 font-serif text-xs tracking-widest">{s.genre}</span>
                  </div>
                  <h3 className="text-[#f5e6d3] text-lg font-serif font-bold mb-1">{s.name}</h3>
                  <p className="text-[#f5e6d3]/50 text-sm">{s.freq} MHz</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </RevealBlock>

      {/* 7. Input Fields */}
      <RevealBlock className="px-6 py-16 md:py-20 bg-[#2a1f15]">
        <div className="max-w-md mx-auto">
          <SectionLabel>Input Fields</SectionLabel>
          <div className="space-y-4">
            <div>
              <label className="block text-[#d4a017] font-serif text-xs tracking-widest mb-2">Frequency</label>
              <input
                type="text"
                value={frequency.toFixed(1)}
                onChange={(e) => { const v = parseFloat(e.target.value); if (!isNaN(v)) setFrequency(v); }}
                className="w-full px-4 py-3 bg-[#3d2b1f] border-2 border-[#d4a017]/30 rounded-lg text-[#f5e6d3] font-serif placeholder:text-[#f5e6d3]/30 focus:outline-none focus:border-[#d4a017] focus:shadow-[0_0_12px_rgba(212,160,23,0.3)] transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-[#d4a017] font-serif text-xs tracking-widest mb-2">Station Name</label>
              <input type="text" placeholder="Enter station name..." className="w-full px-4 py-3 bg-[#3d2b1f] border-2 border-[#d4a017]/30 rounded-lg text-[#f5e6d3] font-serif placeholder:text-[#f5e6d3]/30 focus:outline-none focus:border-[#d4a017] focus:shadow-[0_0_12px_rgba(212,160,23,0.3)] transition-all duration-300" />
            </div>
          </div>
        </div>
      </RevealBlock>

      {/* 8. Typography */}
      <RevealBlock className="px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Typography</SectionLabel>
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-serif font-bold" style={{ textShadow: "0 2px 16px rgba(212,160,23,0.2)" }}>Heading One</h1>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#f5e6d3]/90">Heading Two</h2>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-[#d4a017]">Heading Three</h3>
            <p className="text-base text-[#f5e6d3]/70 leading-relaxed">Body text uses a clean sans-serif for readability against the warm wood background. The cream tones ensure comfortable reading in any lighting condition, echoing the gentle glow of a vintage radio dial.</p>
            <p className="text-sm text-[#f5e6d3]/50 leading-relaxed">Small text for captions and metadata, maintaining warmth while staying legible at reduced sizes.</p>
          </div>
        </div>
      </RevealBlock>

      {/* 9. Color Palette */}
      <RevealBlock className="px-6 py-16 md:py-20 bg-[#2a1f15]">
        <div className="max-w-4xl mx-auto">
          <SectionLabel>Color Palette</SectionLabel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {palette.map((c) => (
              <div key={c.hex} className="group">
                <div className="h-20 rounded-lg border-2 border-[#d4a017]/20 group-hover:border-[#d4a017]/50 transition-all duration-300" style={{ background: c.hex, boxShadow: c.hex === "#3d2b1f" || c.hex === "#2a1f15" || c.hex === "#5c3d2e" ? "inset 0 0 20px rgba(212,160,23,0.1)" : "none" }} />
                <p className="text-[#f5e6d3]/80 font-serif text-xs mt-2">{c.name}</p>
                <p className="text-[#d4a017]/50 font-mono text-[10px]">{c.hex} / {c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealBlock>

      {/* 10. Animation Keyframes */}
      <RevealBlock className="px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Animations</SectionLabel>
          <div className="space-y-4">
            {animations.map((a) => (
              <div key={a.label} className="bg-[#2a1f15] border border-[#d4a017]/20 rounded-lg p-4 hover:border-[#d4a017]/40 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <WaveIcon />
                  <h4 className="text-[#d4a017] font-serif font-bold text-sm">{a.label}</h4>
                </div>
                <p className="text-[#f5e6d3]/60 text-sm mb-2">{a.desc}</p>
                <code className="text-[#d4a017]/70 text-xs font-mono bg-[#3d2b1f] px-2 py-1 rounded">{a.code}</code>
              </div>
            ))}
          </div>
        </div>
      </RevealBlock>

      {/* 11. Speaker Grille Pattern */}
      <RevealBlock className="px-6 py-16 md:py-20 bg-[#2a1f15]">
        <div className="max-w-3xl mx-auto">
          <SectionLabel>Speaker Grille</SectionLabel>
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-xl border-2 border-[#d4a017]/30 overflow-hidden relative" style={{ background: "radial-gradient(circle at 50% 50%, #3d2b1f 0%, #2a1f15 100%)" }}>
              <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, #5c3d2e 2px, transparent 2px)", backgroundSize: "12px 12px" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border border-[#d4a017]/20" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-[#d4a017]/15" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-[#d4a017]/30" style={{ animation: "rr-warm-pulse 3s ease-in-out infinite" }} />
              </div>
            </div>
          </div>
          <p className="text-center text-[#f5e6d3]/40 font-serif text-xs mt-4 tracking-widest">FULL RANGE SPEAKER</p>
        </div>
      </RevealBlock>

      {/* 12. Back to Docs */}
      <RevealBlock className="px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <SectionLabel>Explore More</SectionLabel>
          <Link href="/styles" className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4a017] text-[#3d2b1f] font-serif tracking-wide rounded-lg shadow-[0_2px_12px_rgba(212,160,23,0.4)] hover:shadow-[0_4px_24px_rgba(212,160,23,0.6)] transition-all duration-300">
            Back to All Styles
          </Link>
        </div>
      </RevealBlock>
    </div>
  );
}