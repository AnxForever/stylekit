"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks                                                       */
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
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function SunIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function CloudIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  );
}

function RainIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <line x1="16" y1="13" x2="16" y2="21" />
      <line x1="8" y1="13" x2="8" y2="21" />
      <line x1="12" y1="15" x2="12" y2="23" />
      <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" />
    </svg>
  );
}

function SnowIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
      <line x1="8" y1="16" x2="8.01" y2="16" />
      <line x1="8" y1="20" x2="8.01" y2="20" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
      <line x1="12" y1="22" x2="12.01" y2="22" />
      <line x1="16" y1="16" x2="16.01" y2="16" />
      <line x1="16" y1="20" x2="16.01" y2="20" />
    </svg>
  );
}

function ThermometerIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main showcase                                                      */
/* ------------------------------------------------------------------ */

const WEATHER_CONDITIONS = [
  { label: "Sunny", icon: SunIcon, temp: 28, color: "#ff6b35" },
  { label: "Cloudy", icon: CloudIcon, temp: 18, color: "#87CEEB" },
  { label: "Rainy", icon: RainIcon, temp: 14, color: "#6ba3be" },
  { label: "Snowy", icon: SnowIcon, temp: -2, color: "#a8d8f0" },
];

export default function WeatherCardShowcaseContent() {
  const [activeCondition, setActiveCondition] = useState(0);
  const [temperature, setTemperature] = useState(22);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#87CEEB] via-[#a8d8f0] to-[#b8e4f9] text-gray-800 overflow-hidden">
      {/* Global keyframes */}
      <style>{`
        @keyframes wc-cloud-drift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(60px); }
        }
        @keyframes wc-rain-fall {
          0% { transform: translateY(-10px); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateY(120px); opacity: 0; }
        }
        @keyframes wc-sun-rays {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes wc-temp-count {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes wc-snow-fall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.6; }
          100% { transform: translateY(120px) rotate(360deg); opacity: 0; }
        }
      `}</style>

      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Drifting clouds */}
        <div
          className="absolute top-20 right-[10%] w-40 h-14 bg-white/60 rounded-full blur-sm"
          style={{ animation: "wc-cloud-drift 20s ease-in-out infinite" }}
        />
        <div
          className="absolute top-36 left-[5%] w-28 h-10 bg-white/40 rounded-full blur-sm"
          style={{ animation: "wc-cloud-drift 25s ease-in-out infinite reverse" }}
        />
        <div
          className="absolute top-52 right-[30%] w-20 h-8 bg-white/30 rounded-full blur-sm"
          style={{ animation: "wc-cloud-drift 18s ease-in-out infinite" }}
        />

        <RevealBlock className="relative max-w-lg mx-auto text-center">
          <div className="p-10 md:p-14 bg-white/40 backdrop-blur-[30px] border border-white/30 rounded-3xl shadow-[0_8px_32px_rgba(135,206,235,0.25)] overflow-hidden">
            <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-3xl" />
            <p className="relative text-sm text-gray-500 mb-2 uppercase tracking-wider">Weather Card Style</p>
            <h1 className="relative text-5xl md:text-7xl font-bold text-gray-800 mb-2">
              {temperature}&deg;
            </h1>
            <p className="relative text-lg text-gray-600 mb-6">
              Atmospheric animations with glassmorphic overlays
            </p>
            <div className="relative flex justify-center gap-3">
              <button
                className="px-6 py-3 bg-gradient-to-r from-[#87CEEB] to-[#6bb5d6] text-white rounded-2xl font-medium shadow-[0_4px_16px_rgba(135,206,235,0.3)] hover:shadow-[0_8px_32px_rgba(135,206,235,0.4)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                Explore
              </button>
              <button
                className="px-6 py-3 bg-white/50 backdrop-blur-[20px] text-gray-700 rounded-2xl font-medium border border-white/30 hover:bg-white/60 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              >
                Learn More
              </button>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ── 2. Main Weather Card ────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Weather Display</h2>
            <p className="text-gray-500 text-center mb-10">Glassmorphic card with live temperature and condition</p>
          </RevealBlock>

          <RevealBlock delay={0.1} className="max-w-md mx-auto">
            <div className="relative p-8 bg-white/40 backdrop-blur-[30px] border border-white/30 rounded-3xl shadow-[0_8px_32px_rgba(135,206,235,0.25)] overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-3xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider">Current Weather</p>
                    <p className="text-[#ff6b35] font-medium mt-1">{WEATHER_CONDITIONS[activeCondition].label}</p>
                  </div>
                  <div className="w-12 h-12 flex items-center justify-center text-[#ff6b35]">
                    {(() => {
                      const Icon = WEATHER_CONDITIONS[activeCondition].icon;
                      return <Icon className="w-10 h-10" />;
                    })()}
                  </div>
                </div>
                <div className="text-7xl font-bold text-gray-800 mb-4" style={{ animation: "wc-temp-count 0.5s ease-out" }}>
                  {WEATHER_CONDITIONS[activeCondition].temp}&deg;
                </div>
                <div className="flex gap-2 mt-6">
                  {WEATHER_CONDITIONS.map((c, i) => (
                    <button
                      key={c.label}
                      onClick={() => setActiveCondition(i)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                        i === activeCondition
                          ? "bg-gradient-to-r from-[#87CEEB] to-[#6bb5d6] text-white shadow-[0_4px_12px_rgba(135,206,235,0.3)]"
                          : "bg-white/40 text-gray-600 hover:bg-white/60"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 3. Rain Animation Demo ──────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Rain Animation</h2>
            <p className="text-gray-500 text-center mb-10">Gentle raindrops falling through the atmosphere</p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="relative h-64 bg-gradient-to-b from-[#6ba3be] to-[#87CEEB] rounded-3xl overflow-hidden border border-white/20 shadow-[0_8px_32px_rgba(135,206,235,0.25)]">
              {/* Rain drops */}
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-4 bg-white/40 rounded-full"
                  style={{
                    left: `${5 + (i * 4.5)}%`,
                    animation: `wc-rain-fall ${1.5 + (i % 5) * 0.3}s linear infinite`,
                    animationDelay: `${(i * 0.15)}s`,
                  }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/30 backdrop-blur-[20px] rounded-2xl px-8 py-4 border border-white/30">
                  <RainIcon className="w-8 h-8 text-white mx-auto mb-2" />
                  <p className="text-white font-medium text-center">Light Rain</p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 4. Sun Rays Animation ─────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Sun Rays</h2>
            <p className="text-gray-500 text-center mb-10">Rotating sun with warm radiant glow</p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="relative h-64 bg-gradient-to-b from-[#ff6b35]/20 to-[#87CEEB] rounded-3xl overflow-hidden border border-white/20 shadow-[0_8px_32px_rgba(135,206,235,0.25)] flex items-center justify-center">
              {/* Sun rays */}
              <div
                className="absolute w-48 h-48 opacity-20"
                style={{ animation: "wc-sun-rays 30s linear infinite" }}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-1 h-24 bg-[#ff6b35] origin-bottom -translate-x-1/2"
                    style={{ transform: `translateX(-50%) rotate(${i * 30}deg)` }}
                  />
                ))}
              </div>
              {/* Sun circle */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-[#ffd700] to-[#ff6b35] rounded-full shadow-[0_0_40px_rgba(255,107,53,0.4),0_0_80px_rgba(255,107,53,0.2)]" />
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 5. Button Variants ─────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Buttons</h2>
            <p className="text-gray-500 text-center mb-10">Sky gradient and sunset accent variants</p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-[#87CEEB] to-[#6bb5d6] text-white rounded-2xl font-medium border border-white/30 shadow-[0_4px_16px_rgba(135,206,235,0.3)] hover:shadow-[0_8px_32px_rgba(135,206,235,0.4)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                Sky Primary
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white rounded-2xl font-medium border border-white/30 shadow-[0_4px_16px_rgba(255,107,53,0.3)] hover:shadow-[0_8px_32px_rgba(255,107,53,0.4)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                Sunset Accent
              </button>
              <button className="px-6 py-3 bg-white/50 backdrop-blur-[20px] text-gray-700 rounded-2xl font-medium border border-white/30 hover:bg-white/60 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                Glass Secondary
              </button>
              <button className="px-6 py-3 bg-transparent text-[#87CEEB] rounded-2xl font-medium border-2 border-[#87CEEB]/40 hover:border-[#87CEEB] hover:bg-[#87CEEB]/10 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                Outline
              </button>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 6. Card Grid ──────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Weather Conditions</h2>
            <p className="text-gray-500 text-center mb-10">Glassmorphic cards for different weather states</p>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WEATHER_CONDITIONS.map((c, i) => (
              <RevealBlock key={c.label} delay={i * 0.1}>
                <div className="p-6 bg-white/40 backdrop-blur-[30px] border border-white/30 rounded-2xl shadow-[0_4px_16px_rgba(135,206,235,0.2)] hover:shadow-[0_8px_32px_rgba(135,206,235,0.3)] hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] text-center">
                  <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center" style={{ color: c.color }}>
                    <c.icon className="w-10 h-10" />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{c.temp}&deg;</div>
                  <p className="text-gray-500 text-sm">{c.label}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Input Fields ───────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-md mx-auto">
          <RevealBlock>
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Inputs</h2>
            <p className="text-gray-500 text-center mb-10">Soft, cloud-like form elements</p>
          </RevealBlock>

          <RevealBlock delay={0.1} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1.5 font-medium">Location</label>
              <input
                type="text"
                placeholder="Search city..."
                className="w-full px-5 py-3.5 bg-white/50 backdrop-blur-[20px] border border-white/30 rounded-2xl text-gray-700 placeholder-gray-400 shadow-[0_2px_8px_rgba(135,206,235,0.15)] focus:outline-none focus:border-[#87CEEB] focus:shadow-[0_0_0_3px_rgba(135,206,235,0.3)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5 font-medium">Temperature Unit</label>
              <input
                type="text"
                placeholder="Celsius / Fahrenheit"
                className="w-full px-5 py-3.5 bg-white/50 backdrop-blur-[20px] border border-white/30 rounded-2xl text-gray-700 placeholder-gray-400 shadow-[0_2px_8px_rgba(135,206,235,0.15)] focus:outline-none focus:border-[#87CEEB] focus:shadow-[0_0_0_3px_rgba(135,206,235,0.3)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5 font-medium">Notes</label>
              <textarea
                placeholder="Add weather notes..."
                rows={3}
                className="w-full px-5 py-3.5 bg-white/50 backdrop-blur-[20px] border border-white/30 rounded-2xl text-gray-700 placeholder-gray-400 shadow-[0_2px_8px_rgba(135,206,235,0.15)] focus:outline-none focus:border-[#87CEEB] focus:shadow-[0_0_0_3px_rgba(135,206,235,0.3)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] resize-none"
              />
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 8. Typography ─────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Typography</h2>
            <p className="text-gray-500 text-center mb-10">Clean, readable type hierarchy</p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="p-8 bg-white/40 backdrop-blur-[30px] border border-white/30 rounded-3xl shadow-[0_4px_16px_rgba(135,206,235,0.2)] space-y-6">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Hero</p>
                <p className="text-5xl font-bold text-gray-800">Weather Card</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Heading 1</p>
                <p className="text-3xl font-bold text-gray-800">Atmospheric Design</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Heading 2</p>
                <p className="text-2xl font-semibold text-gray-700">Glassmorphic Overlays</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Body</p>
                <p className="text-base text-gray-600">Weather data presented through poetic animations and translucent surfaces that respond to atmospheric conditions.</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Small / Caption</p>
                <p className="text-sm text-gray-500">Updated 15 minutes ago &middot; Humidity 65%</p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 9. Color Palette ──────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Color Palette</h2>
            <p className="text-gray-500 text-center mb-10">Sky, cloud, and sunset tones</p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: "Sky Blue", hex: "#87CEEB", text: "text-white" },
                { name: "Sky Light", hex: "#b8e4f9", text: "text-gray-700" },
                { name: "Cloud", hex: "#f0f0f0", text: "text-gray-700" },
                { name: "Sunset", hex: "#ff6b35", text: "text-white" },
                { name: "Gold", hex: "#ffd700", text: "text-gray-800" },
              ].map((c) => (
                <div key={c.name} className="text-center">
                  <div
                    className="w-full aspect-square rounded-2xl mb-2 border border-white/30 shadow-[0_4px_16px_rgba(135,206,235,0.15)]"
                    style={{ backgroundColor: c.hex }}
                  />
                  <p className="text-sm font-medium text-gray-700">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.hex}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 10. Snow Fall Animation ───────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Snow Fall</h2>
            <p className="text-gray-500 text-center mb-10">Gentle snowflakes drifting down</p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="relative h-64 bg-gradient-to-b from-[#a8d8f0] to-[#d0e8f0] rounded-3xl overflow-hidden border border-white/20 shadow-[0_8px_32px_rgba(135,206,235,0.25)]">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${3 + (i * 4)}%`,
                    animation: `wc-snow-fall ${2 + (i % 4) * 0.5}s linear infinite`,
                    animationDelay: `${(i * 0.2)}s`,
                    opacity: 0.6 + (i % 3) * 0.15,
                  }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/30 backdrop-blur-[20px] rounded-2xl px-8 py-4 border border-white/30">
                  <SnowIcon className="w-8 h-8 text-[#6ba3be] mx-auto mb-2" />
                  <p className="text-[#4a6a7a] font-medium text-center">Light Snow</p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 11. Temperature Counter ─────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Temperature Control</h2>
            <p className="text-gray-500 text-center mb-10">Interactive temperature counter with animation</p>
          </RevealBlock>

          <RevealBlock delay={0.1} className="max-w-xs mx-auto">
            <div className="p-8 bg-white/40 backdrop-blur-[30px] border border-white/30 rounded-3xl shadow-[0_8px_32px_rgba(135,206,235,0.25)] text-center">
              <ThermometerIcon className="w-8 h-8 text-[#ff6b35] mx-auto mb-4" />
              <div
                key={temperature}
                className="text-6xl font-bold text-gray-800 mb-6"
                style={{ animation: "wc-temp-count 0.3s ease-out" }}
              >
                {temperature}&deg;
              </div>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setTemperature((t) => t - 1)}
                  className="w-12 h-12 bg-[#87CEEB]/20 text-[#6ba3be] rounded-xl text-xl font-bold hover:bg-[#87CEEB]/30 active:scale-[0.95] transition-all duration-300"
                >
                  -
                </button>
                <button
                  onClick={() => setTemperature(22)}
                  className="px-4 h-12 bg-white/50 text-gray-500 rounded-xl text-sm font-medium hover:bg-white/60 active:scale-[0.95] transition-all duration-300"
                >
                  Reset
                </button>
                <button
                  onClick={() => setTemperature((t) => t + 1)}
                  className="w-12 h-12 bg-[#ff6b35]/20 text-[#ff6b35] rounded-xl text-xl font-bold hover:bg-[#ff6b35]/30 active:scale-[0.95] transition-all duration-300"
                >
                  +
                </button>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── 12. Back to Docs ──────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <RevealBlock>
            <Link
              href="/styles/weather-card"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/50 backdrop-blur-[20px] text-gray-700 rounded-2xl font-medium border border-white/30 hover:bg-white/60 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <span>&larr;</span>
              <span>Back to Weather Card docs</span>
            </Link>
          </RevealBlock>
        </div>
      </section>
    </div>
  );
}