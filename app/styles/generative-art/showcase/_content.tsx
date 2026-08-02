"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hook — ZERO @/components/showcase imports                   */
/* ------------------------------------------------------------------ */

function useInView(options: IntersectionObserverInit = {}) {
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
/*  Inline SVG geometry                                                */
/* ------------------------------------------------------------------ */

function GeoDiamond({ className = "", color = "#7c3aed" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <rect x="12" y="2" width="14.14" height="14.14" transform="rotate(45 12 12)" />
    </svg>
  );
}

function GeoCircle({ className = "", color = "#3b82f6" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function GeoTriangle({ className = "", color = "#14b8a6" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <polygon points="12,3 22,21 2,21" />
    </svg>
  );
}

function GeoHex({ className = "", color = "#f59e0b" }: { className?: string; color?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <polygon points="12,2 20.66,7 20.66,17 12,22 3.34,17 3.34,7" />
    </svg>
  );
}

function GridPattern({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {Array.from({ length: 10 }, (_, row) =>
        Array.from({ length: 10 }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * 22 + 2}
            cy={row * 22 + 2}
            r="1.2"
            fill="rgba(124,58,237,0.25)"
          />
        ))
      )}
    </svg>
  );
}

function ConcentricCircles({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {[140, 110, 80, 50, 20].map((r) => (
        <circle
          key={r}
          cx="150"
          cy="150"
          r={r}
          fill="none"
          stroke="rgba(124,58,237,0.15)"
          strokeWidth="1"
        />
      ))}
      {[120, 90, 60, 30].map((r) => (
        <circle
          key={`b-${r}`}
          cx="150"
          cy="150"
          r={r}
          fill="none"
          stroke="rgba(59,130,246,0.1)"
          strokeWidth="0.5"
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const algorithmColors = [
  { name: "Violet", hex: "#7c3aed", label: "Primary", hsl: "hsl(263,73%,55%)" },
  { name: "Near-Black", hex: "#0a0a0a", label: "Background", hsl: "hsl(0,0%,4%)" },
  { name: "Blue", hex: "#3b82f6", label: "Secondary", hsl: "hsl(217,91%,60%)" },
  { name: "Teal", hex: "#14b8a6", label: "Tertiary", hsl: "hsl(173,80%,40%)" },
  { name: "Rose", hex: "#f43f5e", label: "Highlight", hsl: "hsl(350,89%,60%)" },
  { name: "Amber", hex: "#f59e0b", label: "Accent", hsl: "hsl(38,92%,50%)" },
];

const algorithms = [
  { name: "Perlin Noise", id: "perlin", code: "0x01", color: "#7c3aed", desc: "Gradient noise for organic procedural textures. Seed dynamically injected via hash function." },
  { name: "Voronoi", id: "voronoi", code: "0x02", color: "#3b82f6", desc: "Distance field partitioning. Each cell boundary derived from point set {P₀, P₁, ... Pₙ}." },
  { name: "Flow Field", id: "flow", code: "0x03", color: "#14b8a6", desc: "Vector field integration using 4th-order Runge-Kutta. Particles follow curl-noise trajectories." },
  { name: "Mandelbrot", id: "fractal", code: "0x04", color: "#f43f5e", desc: "Iterative complex function z = z² + c. Bounded at |z| < 2 for max 256 iterations." },
];

type ComponentTab = "buttons" | "cards" | "inputs" | "badges";

/* ------------------------------------------------------------------ */
/*  Seed generator utility                                             */
/* ------------------------------------------------------------------ */

function generateSeed(): number {
  return Math.floor(Math.random() * 99999);
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<ComponentTab>("buttons");
  const [hoveredSwatch, setHoveredSwatch] = useState<number | null>(null);
  const [activeAlgo, setActiveAlgo] = useState(0);
  const [seed, setSeed] = useState(42731);
  const [iterations, setIterations] = useState(128);
  const [noiseScale, setNoiseScale] = useState(0.4);

  // aiRule 1: Algorithmic Flow demo
  const [flowActive, setFlowActive] = useState(false);
  const [flowOffset, setFlowOffset] = useState(0);

  // aiRule 2: Parameter Shifting demo
  const [shiftHovered, setShiftHovered] = useState<number | null>(null);
  const [paramSeed, setParamSeed] = useState(42);

  // aiRule 3: Exact Precision demo
  const [precisionMode, setPrecisionMode] = useState<"linear" | "spring" | "ease" | null>(null);

  // aiRule 4: Mathematical Glow demo
  const [glowTarget, setGlowTarget] = useState<number | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!flowActive) { setFlowOffset(0); return; }
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      setFlowOffset(frame * 2);
    }, 50);
    return () => clearInterval(id);
  }, [flowActive]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-mono text-white overflow-x-hidden">
      <style>{`
        @keyframes gen-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes gen-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.06); }
        }
        @keyframes gen-drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(12px, -12px) rotate(90deg); }
          50% { transform: translate(-6px, 16px) rotate(180deg); }
          75% { transform: translate(-16px, -6px) rotate(270deg); }
        }
        @keyframes gen-hue-cycle {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        @keyframes gen-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
        }
        @keyframes gen-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes flow-line {
          0% { stroke-dashoffset: 200; }
          100% { stroke-dashoffset: 0; }
        }
        .gen-rotate-slow { animation: gen-rotate 20s linear infinite; }
        .gen-rotate-fast { animation: gen-rotate 4s linear infinite; }
        .gen-pulse-anim { animation: gen-pulse 3s ease-in-out infinite; }
        .gen-drift-anim { animation: gen-drift 8s ease-in-out infinite; }
        .gen-hue-anim { animation: gen-hue-cycle 6s linear infinite; }
        .gen-blink { animation: gen-blink 1.2s step-end infinite; }
        .gen-scan-line {
          animation: gen-scan 3s linear infinite;
        }
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ================================================================ */}
      {/* 1. FIXED NAV                                                     */}
      {/* ================================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 relative">
              <div
                className="absolute inset-0 border border-violet-500/60 rotate-45 transition-transform duration-200 ease-linear"
                style={{ boxShadow: "0 0 8px rgba(124,58,237,0.4)" }}
              />
              <div className="absolute inset-[5px] bg-violet-500/40 rotate-45" />
            </div>
            <span className="text-white font-mono font-bold tracking-wider text-sm uppercase">
              Gen<span className="text-violet-400">Art</span>
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: "Palette", href: "#palette" },
              { label: "Components", href: "#components" },
              { label: "Algorithms", href: "#algorithms" },
              { label: "aiRules", href: "#ai-rules" },
              { label: "Philosophy", href: "#philosophy" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-1.5 text-xs font-mono uppercase tracking-[0.15em] text-neutral-500 hover:text-violet-400 hover:bg-violet-500/5 transition-all duration-200 ease-linear rounded"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Back link */}
          <Link
            href="/styles/generative-art"
            data-back-navigation="true"
            className="flex items-center gap-1.5 px-4 py-2 rounded font-mono text-xs uppercase tracking-[0.15em] text-violet-300 border border-violet-500/40 hover:border-violet-400 hover:text-white hover:shadow-[0_0_14px_rgba(124,58,237,0.3)] transition-all duration-200 ease-linear"
          >
            <span>←</span>
            <span>StyleKit</span>
          </Link>
        </div>
      </header>

      {/* ================================================================ */}
      {/* 2. HERO                                                          */}
      {/* ================================================================ */}
      <section className="relative pt-28 md:pt-36 pb-24 px-5 md:px-10 overflow-hidden">
        {/* Background geometric decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-40">
            <GridPattern className="w-full h-full" />
          </div>

          {/* Concentric circles top-right */}
          <div className="absolute -top-20 -right-20 w-96 h-96 opacity-50 gen-rotate-slow">
            <ConcentricCircles className="w-full h-full" />
          </div>

          {/* Concentric circles bottom-left */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 opacity-30">
            <ConcentricCircles className="w-full h-full" />
          </div>

          {/* Floating geometric shapes */}
          <div className="absolute top-32 right-1/4 gen-drift-anim opacity-40">
            <GeoDiamond className="w-8 h-8" color="#7c3aed" />
          </div>
          <div className="absolute top-48 left-1/4 gen-pulse-anim opacity-30">
            <GeoCircle className="w-12 h-12" color="#3b82f6" />
          </div>
          <div className="absolute bottom-40 right-1/3 gen-drift-anim opacity-25" style={{ animationDelay: "2s" }}>
            <GeoHex className="w-7 h-7" color="#f59e0b" />
          </div>
          <div className="absolute top-56 right-20 gen-rotate-slow opacity-20">
            <GeoTriangle className="w-6 h-6" color="#14b8a6" />
          </div>

          {/* Scan line effect */}
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent gen-scan-line pointer-events-none" />
        </div>

        {/* Hero content */}
        <div className="max-w-6xl mx-auto relative">
          {/* Eyebrow */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0s",
            }}
          >
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-2 h-2 bg-violet-500 rotate-45 shadow-[0_0_8px_rgba(124,58,237,0.6)]" />
              <span className="text-violet-400 font-mono text-xs uppercase tracking-[0.25em]">
                Algorithm-Driven Visual Aesthetics
              </span>
              <div className="w-2 h-2 bg-violet-500 rotate-45 shadow-[0_0_8px_rgba(124,58,237,0.6)]" />
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-5xl md:text-7xl lg:text-[88px] font-mono font-bold leading-[1.0] tracking-tight mb-6"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            <span className="text-white">Generative</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #3b82f6 40%, #14b8a6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Art.
            </span>
          </h1>

          {/* Sub */}
          <p
            className="text-neutral-400 font-mono text-sm md:text-base leading-relaxed max-w-2xl mb-4"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            算法驱动的程序化视觉美学 — Mathematical functions, noise textures,{" "}
            and parametric geometry create unique dynamic interfaces. Every element is{" "}
            derived from code, not craft.
          </p>

          {/* Param tags */}
          <div
            className="flex flex-wrap gap-3 mb-10"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s",
            }}
          >
            {[
              { label: "seed", value: seed },
              { label: "iterations", value: iterations },
              { label: "noise_scale", value: noiseScale.toFixed(2) },
              { label: "algo", value: "perlin_v2" },
            ].map((p) => (
              <span
                key={p.label}
                className="px-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded font-mono text-xs text-neutral-400"
              >
                <span className="text-violet-400">{p.label}</span>
                <span className="text-neutral-600 mx-1">:</span>
                <span className="text-neutral-200">{p.value}</span>
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-20"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s",
            }}
          >
            <button
              onClick={() => setSeed(generateSeed())}
              className="group relative px-6 py-3 rounded-lg overflow-hidden font-mono text-sm uppercase tracking-[0.18em] bg-violet-900/35 text-violet-300 border border-violet-500/50 hover:border-violet-400 hover:text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] active:opacity-90 transition-all duration-200 ease-linear"
            >
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(124,58,237,0.3)_50%,transparent_75%)] bg-[length:200%_200%] bg-[0%_0%] group-hover:bg-[100%_100%] transition-all duration-500 ease-linear" />
              <span className="relative z-10 group-hover:tracking-[0.24em] transition-all duration-200 ease-linear">
                Regenerate
              </span>
            </button>
            <button className="group px-6 py-3 rounded-lg font-mono text-sm uppercase tracking-[0.18em] bg-transparent text-violet-400 border border-violet-500/40 hover:border-violet-400 hover:bg-violet-500/10 hover:shadow-[0_0_14px_rgba(124,58,237,0.25)] transition-all duration-200 ease-linear">
              <span className="group-hover:tracking-[0.24em] transition-all duration-200 ease-linear">
                Parameters
              </span>
            </button>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            {[
              { value: "∞", label: "Unique Outputs", color: "#7c3aed" },
              { value: "4", label: "aiRules", color: "#3b82f6" },
              { value: "16ms", label: "Render Delta", color: "#14b8a6" },
              { value: "2^31", label: "Seed Space", color: "#f59e0b" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="group bg-neutral-900/80 backdrop-blur rounded-lg p-5 border border-neutral-800 hover:border-violet-500/40 hover:shadow-[0_0_20px_rgba(124,58,237,0.14)] transition-all duration-200 ease-linear cursor-crosshair"
                style={{ transitionDelay: `${i * 0.04}s` }}
              >
                <div className="text-2xl font-bold font-mono mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-neutral-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 3. COLOR PALETTE                                                 */}
      {/* ================================================================ */}
      <section id="palette" className="py-20 md:py-28 px-5 md:px-10 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-violet-400 block mb-3">
              // color_system
            </span>
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-white leading-tight">
              Algorithmic{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Color System
              </span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-neutral-400 font-mono text-sm max-w-xl leading-relaxed">
              Colors generated via HSL rotation from violet base (#7c3aed at hsl(263,73%,55%)).
              Each accent is a 60-degree hue step. Background stays near-black to maximize
              perceptual contrast for algorithm-generated visuals.
            </p>
          </RevealBlock>

          {/* Swatches */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-6 md:gap-10 justify-start mb-16">
              {algorithmColors.map((swatch, i) => (
                <div
                  key={swatch.name}
                  className="flex flex-col items-center gap-3 cursor-crosshair"
                  onMouseEnter={() => setHoveredSwatch(i)}
                  onMouseLeave={() => setHoveredSwatch(null)}
                >
                  <div
                    style={{
                      transform: hoveredSwatch === i ? "translateY(-8px) scale(1.08)" : "translateY(0) scale(1)",
                      transition: "transform 0.2s ease-linear",
                    }}
                  >
                    <div
                      className="w-20 h-20 md:w-24 md:h-24 rounded-lg relative overflow-hidden"
                      style={{
                        backgroundColor: swatch.hex,
                        border: swatch.hex === "#0a0a0a" ? "1px solid #404040" : "none",
                        boxShadow:
                          hoveredSwatch === i
                            ? `0 0 24px ${swatch.hex}99, 0 0 48px ${swatch.hex}44`
                            : `0 0 8px ${swatch.hex}33`,
                        transition: "box-shadow 0.2s ease-linear",
                      }}
                    >
                      {/* Scanline overlay on hover */}
                      {hoveredSwatch === i && (
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.06)_2px,rgba(255,255,255,0.06)_4px)]" />
                      )}
                      {/* Rotating indicator */}
                      <div
                        className="absolute top-1 right-1 w-2 h-2 border border-white/30 rotate-45 transition-transform duration-200 ease-linear"
                        style={{
                          transform: hoveredSwatch === i ? "rotate(90deg)" : "rotate(45deg)",
                        }}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-mono font-bold text-neutral-300">{swatch.name}</div>
                    <div className="text-[10px] font-mono text-neutral-600 mt-0.5">{swatch.hex}</div>
                    <div className="text-[9px] font-mono text-neutral-700 mt-0.5">{swatch.hsl}</div>
                    <span className="inline-block mt-1.5 px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-[0.1em] text-neutral-500 bg-neutral-900 border border-neutral-800">
                      {swatch.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* HSL rotation diagram */}
          <RevealBlock delay={0.2}>
            <div className="bg-neutral-900/80 backdrop-blur rounded-xl p-8 border border-neutral-800">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-600 mb-6">
                // hsl_rotation_palette — base: hsl(263, 73%, 55%)
              </p>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {[
                  { offset: 0, name: "Violet", hex: "#7c3aed" },
                  { offset: 60, name: "+60° Blue", hex: "#3b82f6" },
                  { offset: 120, name: "+120° Teal", hex: "#14b8a6" },
                  { offset: 180, name: "+180° Rose", hex: "#f43f5e" },
                  { offset: 240, name: "+240° Amber", hex: "#f59e0b" },
                  { offset: 300, name: "+300° Fuchsia", hex: "#a855f7" },
                ].map((g) => (
                  <div key={g.name} className="group cursor-crosshair">
                    <div
                      className="h-14 rounded-lg mb-2 transition-all duration-200 ease-linear group-hover:shadow-[0_0_16px_rgba(124,58,237,0.3)] group-hover:-translate-y-1"
                      style={{ backgroundColor: g.hex }}
                    />
                    <div className="text-[9px] font-mono text-neutral-500 text-center">
                      <div className="text-neutral-400">{g.name}</div>
                      <div className="text-violet-500/60">+{g.offset}deg</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 4. COMPONENT GALLERY                                             */}
      {/* ================================================================ */}
      <section id="components" className="py-20 md:py-28 px-5 md:px-10 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-blue-400 block mb-3">
              // component_library
            </span>
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-white leading-tight">
              Algorithmic{" "}
              <span style={{ color: "#3b82f6" }}>Components</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-8">
            <p className="text-neutral-400 font-mono text-sm max-w-lg leading-relaxed">
              Every component follows Exact Precision timing (ease-linear, 200ms).
              Dark glass morphism with violet glow on interaction. Monospace font
              throughout — code is the aesthetic.
            </p>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-8">
            <div className="flex flex-wrap gap-2 border-b border-neutral-800 pb-4">
              {(["buttons", "cards", "inputs", "badges"] as ComponentTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded font-mono text-xs uppercase tracking-[0.15em] transition-all duration-200 ease-linear ${
                    activeTab === tab
                      ? "bg-violet-900/40 text-violet-300 border border-violet-500/50 shadow-[0_0_12px_rgba(124,58,237,0.25)]"
                      : "text-neutral-500 border border-neutral-800 hover:text-neutral-300 hover:border-neutral-600"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Demo panel */}
          <RevealBlock delay={0.15}>
            <div className="bg-neutral-900/80 backdrop-blur rounded-xl p-8 md:p-12 border border-neutral-800 relative overflow-hidden">
              {/* Background grid */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_20px,rgba(124,58,237,0.03)_20px,rgba(124,58,237,0.03)_21px),repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(124,58,237,0.03)_20px,rgba(124,58,237,0.03)_21px)]" />

              <div className="relative z-10">
                {/* ---- BUTTONS ---- */}
                {activeTab === "buttons" && (
                  <div className="space-y-10">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-600 mb-5">
                        // primary — violet glow, ease-linear, duration-200
                      </p>
                      <div className="flex flex-wrap gap-4 items-center">
                        <button className="group relative px-6 py-3 rounded-lg overflow-hidden font-mono text-sm uppercase tracking-[0.18em] bg-violet-900/35 text-violet-300 border border-violet-500/50 hover:border-violet-400 hover:text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] active:opacity-90 transition-all duration-200 ease-linear">
                          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(124,58,237,0.3)_50%,transparent_75%)] bg-[length:200%_200%] bg-[0%_0%] group-hover:bg-[100%_100%] transition-all duration-500 ease-linear" />
                          <span className="relative z-10 group-hover:tracking-[0.24em] transition-all duration-200 ease-linear">
                            Generate
                          </span>
                        </button>
                        <button className="group px-6 py-3 rounded-lg font-mono text-sm uppercase tracking-[0.18em] bg-transparent text-violet-400 border border-violet-500/40 hover:border-violet-400 hover:bg-violet-500/10 hover:shadow-[0_0_14px_rgba(124,58,237,0.25)] transition-all duration-200 ease-linear">
                          <span className="group-hover:tracking-[0.24em] transition-all duration-200 ease-linear">
                            Parameters
                          </span>
                        </button>
                        <button className="px-6 py-3 rounded-lg font-mono text-sm uppercase tracking-[0.18em] text-blue-400 border border-blue-500/40 hover:border-blue-400 hover:bg-blue-500/10 hover:shadow-[0_0_14px_rgba(59,130,246,0.25)] transition-all duration-200 ease-linear">
                          Render
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-600 mb-5">
                        // accent variants — algorithmic HSL palette
                      </p>
                      <div className="flex flex-wrap gap-4 items-center">
                        {[
                          { label: "Perlin", color: "#7c3aed", glow: "124,58,237" },
                          { label: "Voronoi", color: "#3b82f6", glow: "59,130,246" },
                          { label: "Flow", color: "#14b8a6", glow: "20,184,166" },
                          { label: "Fractal", color: "#f43f5e", glow: "244,63,94" },
                        ].map((b) => (
                          <button
                            key={b.label}
                            className="px-4 py-2.5 rounded-lg font-mono text-xs uppercase tracking-[0.15em] border transition-all duration-200 ease-linear hover:brightness-125"
                            style={{
                              color: b.color,
                              borderColor: `${b.color}55`,
                              backgroundColor: `${b.color}15`,
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 16px rgba(${b.glow},0.4)`;
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                            }}
                          >
                            {b.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-600 mb-5">
                        // size variants
                      </p>
                      <div className="flex flex-wrap gap-4 items-center">
                        {[
                          { size: "xs", px: "px-3 py-1.5 text-[10px]", track: "tracking-[0.12em]" },
                          { size: "sm", px: "px-4 py-2 text-xs", track: "tracking-[0.15em]" },
                          { size: "md", px: "px-6 py-3 text-sm", track: "tracking-[0.18em]" },
                          { size: "lg", px: "px-8 py-4 text-base", track: "tracking-[0.2em]" },
                        ].map(({ size, px, track }) => (
                          <button
                            key={size}
                            className={`rounded-lg font-mono uppercase bg-violet-900/35 text-violet-300 border border-violet-500/50 hover:border-violet-400 hover:shadow-[0_0_16px_rgba(124,58,237,0.35)] transition-all duration-200 ease-linear hover:tracking-[0.24em] ${px} ${track}`}
                          >
                            {size.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ---- CARDS ---- */}
                {activeTab === "cards" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {algorithms.map((algo) => (
                      <div
                        key={algo.id}
                        className="group bg-neutral-900/80 backdrop-blur rounded-xl p-6 border border-neutral-800 relative overflow-hidden hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(124,58,237,0.14)] transition-all duration-200 ease-linear cursor-crosshair"
                      >
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(124,58,237,0.05)_2px,rgba(124,58,237,0.05)_4px)] transition-opacity duration-200 ease-linear" />
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <div
                              className="w-2 h-2 rounded-none rotate-45 transition-transform duration-200 ease-linear group-hover:rotate-90"
                              style={{
                                backgroundColor: algo.color,
                                boxShadow: `0 0 8px ${algo.color}99`,
                              }}
                            />
                            <h3
                              className="font-mono text-xs uppercase tracking-[0.2em]"
                              style={{ color: algo.color }}
                            >
                              Algorithm // {algo.code}
                            </h3>
                          </div>
                          <h4 className="text-white text-lg font-mono font-bold mb-2 group-hover:text-violet-200 transition-colors duration-200 ease-linear">
                            {algo.name}
                          </h4>
                          <p className="text-neutral-400 font-mono text-xs leading-relaxed group-hover:text-neutral-300 transition-colors duration-200 ease-linear">
                            {algo.desc}
                          </p>
                          <div className="flex gap-2 mt-4">
                            <span className="px-2 py-1 bg-neutral-800 rounded font-mono text-[9px] uppercase tracking-[0.1em] text-neutral-500">
                              seed: {seed}
                            </span>
                            <span className="px-2 py-1 bg-neutral-800 rounded font-mono text-[9px] uppercase tracking-[0.1em] text-neutral-500">
                              iter: {iterations}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ---- INPUTS ---- */}
                {activeTab === "inputs" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-5">
                      <div>
                        <label className="block text-violet-400 font-mono text-xs uppercase tracking-wider mb-2">
                          Seed Value
                        </label>
                        <input
                          type="number"
                          value={seed}
                          onChange={(e) => setSeed(Number(e.target.value))}
                          className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg text-neutral-100 font-mono text-sm focus:outline-none focus:border-violet-500 focus:shadow-[0_0_10px_rgba(124,58,237,0.2)] transition-all duration-200 ease-linear"
                        />
                      </div>
                      <div>
                        <label className="block text-blue-400 font-mono text-xs uppercase tracking-wider mb-2">
                          Iterations
                        </label>
                        <input
                          type="range"
                          min={16}
                          max={512}
                          value={iterations}
                          onChange={(e) => setIterations(Number(e.target.value))}
                          className="w-full accent-violet-500"
                        />
                        <div className="flex justify-between mt-1">
                          <span className="font-mono text-[10px] text-neutral-600">16</span>
                          <span className="font-mono text-xs text-violet-400">{iterations}</span>
                          <span className="font-mono text-[10px] text-neutral-600">512</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-teal-400 font-mono text-xs uppercase tracking-wider mb-2">
                          Noise Scale
                        </label>
                        <input
                          type="range"
                          min={0.1}
                          max={2.0}
                          step={0.05}
                          value={noiseScale}
                          onChange={(e) => setNoiseScale(Number(e.target.value))}
                          className="w-full accent-teal-500"
                        />
                        <div className="flex justify-between mt-1">
                          <span className="font-mono text-[10px] text-neutral-600">0.10</span>
                          <span className="font-mono text-xs text-teal-400">{noiseScale.toFixed(2)}</span>
                          <span className="font-mono text-[10px] text-neutral-600">2.00</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-amber-400 font-mono text-xs uppercase tracking-wider mb-2">
                          Algorithm
                        </label>
                        <select className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg text-neutral-100 font-mono text-sm focus:outline-none focus:border-violet-500 transition-all duration-200 ease-linear">
                          <option>Perlin Noise</option>
                          <option>Voronoi Diagram</option>
                          <option>Flow Field</option>
                          <option>Mandelbrot Set</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-rose-400 font-mono text-xs uppercase tracking-wider mb-2">
                          Color Mode
                        </label>
                        <div className="flex gap-2">
                          {["HSL", "HSV", "LAB", "RGB"].map((mode) => (
                            <button
                              key={mode}
                              className="flex-1 py-2 rounded font-mono text-xs uppercase tracking-[0.12em] border border-neutral-700 text-neutral-400 hover:border-violet-500/50 hover:text-violet-300 transition-all duration-200 ease-linear"
                            >
                              {mode}
                            </button>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => setSeed(generateSeed())}
                        className="w-full py-3.5 rounded-lg font-mono text-sm uppercase tracking-[0.18em] bg-violet-900/40 text-violet-300 border border-violet-500/50 hover:border-violet-400 hover:shadow-[0_0_20px_rgba(124,58,237,0.35)] transition-all duration-200 ease-linear hover:tracking-[0.24em]"
                      >
                        Run Generation
                      </button>
                    </div>
                  </div>
                )}

                {/* ---- BADGES ---- */}
                {activeTab === "badges" && (
                  <div className="space-y-8">
                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-600 mb-5">
                        // algorithm_tags
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {[
                          { label: "perlin_noise", color: "#7c3aed" },
                          { label: "voronoi", color: "#3b82f6" },
                          { label: "flow_field", color: "#14b8a6" },
                          { label: "fractal", color: "#f43f5e" },
                          { label: "L-system", color: "#f59e0b" },
                          { label: "reaction_diffusion", color: "#a855f7" },
                          { label: "wave_function", color: "#3b82f6" },
                          { label: "cellular_automata", color: "#14b8a6" },
                        ].map((b) => (
                          <span
                            key={b.label}
                            className="px-3 py-1.5 rounded font-mono text-[10px] uppercase tracking-[0.1em] border transition-all duration-200 ease-linear hover:-translate-y-0.5 cursor-default"
                            style={{
                              color: b.color,
                              borderColor: `${b.color}44`,
                              backgroundColor: `${b.color}12`,
                            }}
                          >
                            {b.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-600 mb-5">
                        // param_badges
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {[
                          { key: "seed", val: seed, color: "#7c3aed" },
                          { key: "iter", val: iterations, color: "#3b82f6" },
                          { key: "scale", val: noiseScale.toFixed(2), color: "#14b8a6" },
                          { key: "x", val: "0.382", color: "#f59e0b" },
                          { key: "y", val: "0.618", color: "#f43f5e" },
                          { key: "t", val: "0.00s", color: "#a855f7" },
                        ].map((b) => (
                          <span
                            key={b.key}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs border border-neutral-700 bg-neutral-900"
                          >
                            <span style={{ color: b.color }}>{b.key}</span>
                            <span className="text-neutral-600">:</span>
                            <span className="text-neutral-300">{b.val}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-600 mb-5">
                        // status_indicators
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {[
                          { label: "Rendering", dot: "#f59e0b", pulse: true },
                          { label: "Complete", dot: "#14b8a6", pulse: false },
                          { label: "Queued", dot: "#3b82f6", pulse: false },
                          { label: "Error", dot: "#f43f5e", pulse: false },
                        ].map((b) => (
                          <span
                            key={b.label}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded font-mono text-xs border border-neutral-700 bg-neutral-900 text-neutral-300"
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${b.pulse ? "gen-pulse-anim" : ""}`}
                              style={{ backgroundColor: b.dot }}
                            />
                            {b.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 5. ALGORITHM SHOWCASE                                            */}
      {/* ================================================================ */}
      <section id="algorithms" className="py-20 md:py-28 px-5 md:px-10 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-teal-400 block mb-3">
              // algorithm_catalogue
            </span>
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-white leading-tight">
              Core <span style={{ color: "#14b8a6" }}>Algorithms</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-neutral-400 font-mono text-sm max-w-xl leading-relaxed">
              Four foundational generative functions. Each produces distinct visual output
              from identical seed values. Click an algorithm to inspect its parameters.
            </p>
          </RevealBlock>

          {/* Algorithm selector */}
          <RevealBlock delay={0.1} className="mb-6">
            <div className="flex flex-wrap gap-2">
              {algorithms.map((algo, i) => (
                <button
                  key={algo.id}
                  onClick={() => setActiveAlgo(i)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-xs uppercase tracking-[0.12em] border transition-all duration-200 ease-linear"
                  style={{
                    color: activeAlgo === i ? algo.color : "#6b7280",
                    borderColor: activeAlgo === i ? `${algo.color}66` : "#404040",
                    backgroundColor: activeAlgo === i ? `${algo.color}14` : "transparent",
                    boxShadow: activeAlgo === i ? `0 0 16px ${algo.color}33` : "none",
                  }}
                >
                  <span className="font-mono text-[9px] opacity-60">{algo.code}</span>
                  {algo.name}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* SVG Preview */}
              <div className="md:col-span-2 bg-neutral-900/80 backdrop-blur rounded-xl border border-neutral-800 relative overflow-hidden" style={{ minHeight: "320px" }}>
                {/* Coordinate axes */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 320" preserveAspectRatio="none">
                  {/* Grid */}
                  {Array.from({ length: 8 }, (_, i) => (
                    <line key={`v${i}`} x1={i * 57} y1="0" x2={i * 57} y2="320" stroke="rgba(124,58,237,0.06)" strokeWidth="1" />
                  ))}
                  {Array.from({ length: 6 }, (_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 57} x2="400" y2={i * 57} stroke="rgba(124,58,237,0.06)" strokeWidth="1" />
                  ))}

                  {/* Perlin noise simulation — wavy lines */}
                  {activeAlgo === 0 && Array.from({ length: 12 }, (_, i) => {
                    const y = 30 + i * 22;
                    const pts = Array.from({ length: 20 }, (_, j) => {
                      const x = j * 21;
                      const wave = Math.sin((j + (seed % 50)) * 0.4 + i * 0.8) * 12 +
                                   Math.sin((j + (seed % 30)) * 0.9 + i * 0.3) * 6;
                      return `${x},${y + wave}`;
                    }).join(" ");
                    return (
                      <polyline
                        key={i}
                        points={pts}
                        fill="none"
                        stroke={`hsl(${263 + i * 8},73%,${45 + i * 2}%)`}
                        strokeWidth="1"
                        opacity="0.6"
                      />
                    );
                  })}

                  {/* Voronoi simulation — cell boundaries */}
                  {activeAlgo === 1 && Array.from({ length: 8 }, (_, i) => {
                    const x = ((seed * (i + 1) * 137) % 360) + 20;
                    const y = ((seed * (i + 3) * 97) % 280) + 20;
                    return (
                      <g key={i}>
                        <circle cx={x} cy={y} r="3" fill="#3b82f6" opacity="0.8" />
                        <circle cx={x} cy={y} r={30 + i * 8} fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.2" />
                      </g>
                    );
                  })}

                  {/* Flow field simulation — vector arrows */}
                  {activeAlgo === 2 && Array.from({ length: 7 }, (_, row) =>
                    Array.from({ length: 10 }, (_, col) => {
                      const x = col * 40 + 20;
                      const y = row * 44 + 22;
                      const angle = Math.sin(col * 0.5 + row * 0.3 + (seed % 100) * 0.01) * Math.PI;
                      const dx = Math.cos(angle) * 12;
                      const dy = Math.sin(angle) * 12;
                      return (
                        <line
                          key={`${row}-${col}`}
                          x1={x}
                          y1={y}
                          x2={x + dx}
                          y2={y + dy}
                          stroke="#14b8a6"
                          strokeWidth="1"
                          opacity="0.5"
                          markerEnd="url(#arr)"
                        />
                      );
                    })
                  )}
                  {activeAlgo === 2 && (
                    <defs>
                      <marker id="arr" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
                        <polygon points="0 0, 4 2, 0 4" fill="#14b8a6" opacity="0.6" />
                      </marker>
                    </defs>
                  )}

                  {/* Mandelbrot simulation — escape time rings */}
                  {activeAlgo === 3 && Array.from({ length: 8 }, (_, i) => (
                    <ellipse
                      key={i}
                      cx="200"
                      cy="160"
                      rx={20 + i * 22}
                      ry={15 + i * 18}
                      fill="none"
                      stroke={`hsl(${(i * 45 + (seed % 360)) % 360},80%,55%)`}
                      strokeWidth="1"
                      opacity={0.6 - i * 0.06}
                    />
                  ))}
                </svg>

                {/* Corner labels */}
                <div className="absolute top-3 left-3 font-mono text-[9px] text-neutral-600 uppercase tracking-[0.1em]">
                  x: 0.000
                </div>
                <div className="absolute top-3 right-3 font-mono text-[9px] text-neutral-600 uppercase tracking-[0.1em]">
                  {algorithms[activeAlgo].name}
                </div>
                <div className="absolute bottom-3 right-3 font-mono text-[9px] text-neutral-600">
                  seed: {seed}
                </div>
              </div>

              {/* Param panel */}
              <div className="bg-neutral-900/80 backdrop-blur rounded-xl border border-neutral-800 p-6">
                <div className="flex items-center gap-2 mb-5">
                  <div
                    className="w-2 h-2 rotate-45"
                    style={{
                      backgroundColor: algorithms[activeAlgo].color,
                      boxShadow: `0 0 8px ${algorithms[activeAlgo].color}88`,
                    }}
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                    Parameters
                  </span>
                </div>

                <div className="space-y-4">
                  {[
                    { key: "seed", val: seed, color: "#7c3aed" },
                    { key: "iterations", val: iterations, color: "#3b82f6" },
                    { key: "noise_scale", val: noiseScale.toFixed(3), color: "#14b8a6" },
                    { key: "algorithm", val: algorithms[activeAlgo].code, color: algorithms[activeAlgo].color },
                    { key: "color_space", val: "hsl_rot", color: "#f59e0b" },
                    { key: "output_w", val: "1920", color: "#a855f7" },
                    { key: "output_h", val: "1080", color: "#a855f7" },
                  ].map((p) => (
                    <div key={p.key} className="flex items-center justify-between py-1.5 border-b border-neutral-800">
                      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-neutral-500">
                        {p.key}
                      </span>
                      <span className="font-mono text-xs" style={{ color: p.color }}>
                        {p.val}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSeed(generateSeed())}
                  className="mt-6 w-full py-2.5 rounded-lg font-mono text-xs uppercase tracking-[0.15em] border border-violet-500/40 text-violet-400 hover:border-violet-400 hover:shadow-[0_0_12px_rgba(124,58,237,0.3)] transition-all duration-200 ease-linear hover:tracking-[0.2em]"
                >
                  New Seed
                </button>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 6. aiRules INTERACTIVE DEMOS                                     */}
      {/* ================================================================ */}
      <section id="ai-rules" className="py-20 md:py-28 px-5 md:px-10 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-rose-400 block mb-3">
              // ai_rules_demo
            </span>
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-white leading-tight">
              Interaction <span style={{ color: "#f43f5e" }}>Rules</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-neutral-400 font-mono text-sm max-w-xl leading-relaxed">
              Four named aiRules define every interaction in Generative Art style.
              Each rule is demonstrated live below — interact with each demo to
              feel the precise, algorithmic feedback pattern.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* aiRule 1: Algorithmic Flow */}
            <RevealBlock delay={0.08}>
              <div className="bg-neutral-900/80 backdrop-blur rounded-xl p-8 border border-neutral-800 h-full relative overflow-hidden">
                <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(124,58,237,0.04)_2px,rgba(124,58,237,0.04)_4px)] transition-opacity duration-200 ease-linear pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2.5 py-1 rounded font-mono text-[9px] uppercase tracking-[0.15em] bg-violet-900/40 text-violet-400 border border-violet-500/30">
                      aiRule 01
                    </span>
                    <span className="font-mono text-xs text-white">Algorithmic Flow</span>
                  </div>
                  <p className="text-[10px] font-mono text-neutral-500 mb-5 leading-relaxed">
                    交互应体现参数计算过程。通过网格或渐变层的线性位移模拟噪点流动。
                    Grid shifts linearly to simulate noise field displacement.
                  </p>

                  {/* Flow grid demo */}
                  <div className="relative h-32 rounded-lg bg-neutral-950 overflow-hidden mb-4 border border-neutral-800">
                    <div
                      className="absolute inset-0 transition-transform duration-200 ease-linear"
                      style={{
                        backgroundImage: "radial-gradient(circle, rgba(124,58,237,0.3) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                        transform: `translate(${(flowOffset * 0.5) % 20}px, ${(flowOffset * 0.3) % 20}px)`,
                      }}
                    />
                    <div
                      className="absolute inset-0 transition-all duration-200 ease-linear"
                      style={{
                        background: flowActive
                          ? `linear-gradient(${flowOffset * 3}deg, rgba(124,58,237,0.15), rgba(59,130,246,0.1), transparent)`
                          : "transparent",
                      }}
                    />
                    <div className="absolute bottom-2 right-2 font-mono text-[9px] text-neutral-600">
                      t: {flowOffset.toString().padStart(4, "0")}
                    </div>
                  </div>

                  <button
                    onClick={() => setFlowActive(!flowActive)}
                    className={`w-full py-2.5 rounded-lg font-mono text-xs uppercase tracking-[0.15em] border transition-all duration-200 ease-linear ${
                      flowActive
                        ? "bg-violet-900/40 text-violet-300 border-violet-500/60 shadow-[0_0_16px_rgba(124,58,237,0.3)]"
                        : "text-neutral-500 border-neutral-700 hover:text-violet-400 hover:border-violet-500/40"
                    }`}
                  >
                    {flowActive ? "Stop Flow // t=" + flowOffset : "Activate Flow Field"}
                  </button>
                </div>
              </div>
            </RevealBlock>

            {/* aiRule 2: Parameter Shifting */}
            <RevealBlock delay={0.12}>
              <div className="bg-neutral-900/80 backdrop-blur rounded-xl p-8 border border-neutral-800 h-full">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-1 rounded font-mono text-[9px] uppercase tracking-[0.15em] bg-blue-900/40 text-blue-400 border border-blue-500/30">
                    aiRule 02
                  </span>
                  <span className="font-mono text-xs text-white">Parameter Shifting</span>
                </div>
                <p className="text-[10px] font-mono text-neutral-500 mb-5 leading-relaxed">
                  悬停时轻微调整字距与标记形态（方点旋转45deg→90deg），暗示 seed/参数变化。
                  Letter-spacing and marker rotation shift on hover.
                </p>

                {/* Interactive parameter list */}
                <div className="space-y-2 mb-5">
                  {[
                    { label: "noise_octaves", val: 4, color: "#7c3aed" },
                    { label: "persistence", val: 0.5, color: "#3b82f6" },
                    { label: "lacunarity", val: 2.0, color: "#14b8a6" },
                    { label: "amplitude", val: 1.0, color: "#f59e0b" },
                  ].map((p, i) => (
                    <div
                      key={p.label}
                      className="flex items-center justify-between py-2.5 px-3 rounded border border-neutral-800 cursor-crosshair transition-all duration-200 ease-linear hover:border-violet-500/30 hover:bg-violet-500/5"
                      onMouseEnter={() => setShiftHovered(i)}
                      onMouseLeave={() => setShiftHovered(null)}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 transition-transform duration-200 ease-linear"
                          style={{
                            backgroundColor: p.color,
                            transform: shiftHovered === i ? "rotate(90deg)" : "rotate(45deg)",
                            boxShadow: shiftHovered === i ? `0 0 6px ${p.color}88` : "none",
                          }}
                        />
                        <span
                          className="font-mono text-[10px] uppercase transition-all duration-200 ease-linear"
                          style={{
                            color: shiftHovered === i ? p.color : "#6b7280",
                            letterSpacing: shiftHovered === i ? "0.18em" : "0.1em",
                          }}
                        >
                          {p.label}
                        </span>
                      </div>
                      <span
                        className="font-mono text-xs transition-all duration-200 ease-linear"
                        style={{ color: shiftHovered === i ? "#ffffff" : "#6b7280" }}
                      >
                        {p.val}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Seed shift demo */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setParamSeed(generateSeed())}
                    className="flex-1 py-2 rounded-lg font-mono text-xs uppercase tracking-[0.15em] border border-blue-500/40 text-blue-400 hover:border-blue-400 hover:shadow-[0_0_12px_rgba(59,130,246,0.25)] transition-all duration-200 ease-linear hover:tracking-[0.2em]"
                  >
                    Shift Params
                  </button>
                  <span className="font-mono text-xs text-neutral-400">
                    seed: <span className="text-blue-400">{paramSeed}</span>
                  </span>
                </div>
              </div>
            </RevealBlock>

            {/* aiRule 3: Exact Precision */}
            <RevealBlock delay={0.16}>
              <div className="bg-neutral-900/80 backdrop-blur rounded-xl p-8 border border-neutral-800 h-full">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-1 rounded font-mono text-[9px] uppercase tracking-[0.15em] bg-teal-900/40 text-teal-400 border border-teal-500/30">
                    aiRule 03
                  </span>
                  <span className="font-mono text-xs text-white">Exact Precision</span>
                </div>
                <p className="text-[10px] font-mono text-neutral-500 mb-5 leading-relaxed">
                  优先使用 ease-linear + duration-200，保持程序化、可预测的反馈节奏。
                  Compare: linear (predictable) vs spring (bouncy) vs ease-in-out.
                </p>

                <div className="space-y-5">
                  {[
                    {
                      id: "linear" as const,
                      label: "ease-linear / duration-200",
                      desc: "Exact Precision — recommended",
                      color: "#14b8a6",
                      css: "transition: transform 0.2s linear",
                    },
                    {
                      id: "spring" as const,
                      label: "cubic-bezier(0.34,1.56,0.64,1)",
                      desc: "Spring — avoid in this style",
                      color: "#f43f5e",
                      css: "transition: transform 0.6s cubic-bezier(0.34,1.56,0.64,1)",
                    },
                    {
                      id: "ease" as const,
                      label: "ease-in-out / duration-500",
                      desc: "Organic — avoid over-softening",
                      color: "#f59e0b",
                      css: "transition: transform 0.5s ease-in-out",
                    },
                  ].map((mode) => (
                    <div key={mode.id}>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="font-mono text-[9px] uppercase tracking-[0.1em]" style={{ color: mode.color }}>
                            {mode.label}
                          </span>
                          <div className="font-mono text-[8px] text-neutral-600 mt-0.5">{mode.desc}</div>
                        </div>
                        <button
                          className="text-[9px] font-mono px-2.5 py-1 rounded border transition-all duration-200 ease-linear uppercase tracking-[0.1em]"
                          style={{
                            color: mode.color,
                            borderColor: `${mode.color}44`,
                            backgroundColor: `${mode.color}12`,
                          }}
                          onClick={() => setPrecisionMode(precisionMode === mode.id ? null : mode.id)}
                        >
                          {precisionMode === mode.id ? "Reset" : "Animate"}
                        </button>
                      </div>
                      <div className="relative h-8 bg-neutral-950 rounded border border-neutral-800 overflow-hidden">
                        <div
                          className="absolute top-1/2 -translate-y-1/2 left-2 w-5 h-5 rounded-sm rotate-45"
                          style={{
                            backgroundColor: mode.color,
                            transform: `translateY(-50%) translateX(${precisionMode === mode.id ? "210px" : "0"}) rotate(${precisionMode === mode.id ? "180deg" : "45deg"})`,
                            transition: precisionMode === mode.id
                              ? mode.id === "linear"
                                ? "transform 0.2s linear"
                                : mode.id === "spring"
                                ? "transform 0.6s cubic-bezier(0.34,1.56,0.64,1)"
                                : "transform 0.5s ease-in-out"
                              : "none",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* aiRule 4: Mathematical Glow */}
            <RevealBlock delay={0.2}>
              <div className="bg-neutral-900/80 backdrop-blur rounded-xl p-8 border border-neutral-800 h-full">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2.5 py-1 rounded font-mono text-[9px] uppercase tracking-[0.15em] bg-amber-900/40 text-amber-400 border border-amber-500/30">
                    aiRule 04
                  </span>
                  <span className="font-mono text-xs text-white">Mathematical Glow</span>
                </div>
                <p className="text-[10px] font-mono text-neutral-500 mb-5 leading-relaxed">
                  发光以清晰几何边缘为主，避免过度雾化。Glow follows sharp geometric
                  boundaries — not diffuse halos. Each shape has a distinct glow signature.
                </p>

                {/* Geometric glow demos */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {[
                    {
                      i: 0,
                      label: "Diamond",
                      color: "#7c3aed",
                      shape: (
                        <div
                          className="w-10 h-10 rotate-45 transition-all duration-200 ease-linear"
                          style={{
                            backgroundColor: "#7c3aed",
                            boxShadow: glowTarget === 0 ? "0 0 20px rgba(124,58,237,0.8), 0 0 40px rgba(124,58,237,0.4)" : "0 0 4px rgba(124,58,237,0.2)",
                          }}
                        />
                      ),
                    },
                    {
                      i: 1,
                      label: "Circle",
                      color: "#3b82f6",
                      shape: (
                        <div
                          className="w-10 h-10 rounded-full border-2 transition-all duration-200 ease-linear"
                          style={{
                            borderColor: "#3b82f6",
                            boxShadow: glowTarget === 1
                              ? "0 0 20px rgba(59,130,246,0.8), inset 0 0 12px rgba(59,130,246,0.3)"
                              : "0 0 4px rgba(59,130,246,0.2)",
                          }}
                        />
                      ),
                    },
                    {
                      i: 2,
                      label: "Hex Line",
                      color: "#14b8a6",
                      shape: (
                        <svg viewBox="0 0 40 40" className="w-10 h-10">
                          <polygon
                            points="20,4 34,12 34,28 20,36 6,28 6,12"
                            fill="none"
                            stroke="#14b8a6"
                            strokeWidth={glowTarget === 2 ? "2" : "1"}
                            style={{
                              filter: glowTarget === 2 ? "drop-shadow(0 0 6px rgba(20,184,166,0.9))" : "none",
                              transition: "all 0.2s ease-linear",
                            }}
                          />
                        </svg>
                      ),
                    },
                    {
                      i: 3,
                      label: "Cross Grid",
                      color: "#f59e0b",
                      shape: (
                        <svg viewBox="0 0 40 40" className="w-10 h-10">
                          <line x1="20" y1="4" x2="20" y2="36" stroke="#f59e0b" strokeWidth={glowTarget === 3 ? "2" : "1"} style={{ filter: glowTarget === 3 ? "drop-shadow(0 0 4px rgba(245,158,11,0.9))" : "none", transition: "all 0.2s ease-linear" }} />
                          <line x1="4" y1="20" x2="36" y2="20" stroke="#f59e0b" strokeWidth={glowTarget === 3 ? "2" : "1"} style={{ filter: glowTarget === 3 ? "drop-shadow(0 0 4px rgba(245,158,11,0.9))" : "none", transition: "all 0.2s ease-linear" }} />
                          <circle cx="20" cy="20" r="4" fill="#f59e0b" style={{ filter: glowTarget === 3 ? "drop-shadow(0 0 6px rgba(245,158,11,1))" : "none", transition: "all 0.2s ease-linear" }} />
                        </svg>
                      ),
                    },
                  ].map((item) => (
                    <div
                      key={item.i}
                      className="flex flex-col items-center gap-2 p-4 rounded-lg bg-neutral-950 border border-neutral-800 cursor-crosshair transition-all duration-200 ease-linear hover:border-neutral-700"
                      onMouseEnter={() => setGlowTarget(item.i)}
                      onMouseLeave={() => setGlowTarget(null)}
                    >
                      <div className="flex items-center justify-center h-12">
                        {item.shape}
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: item.color }}>
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="font-mono text-[9px] text-neutral-600 text-center">
                  Hover each shape — glow follows geometric edge, not diffuse halo
                </p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 7. DO / DON'T RULES                                              */}
      {/* ================================================================ */}
      <section id="philosophy" className="py-20 md:py-28 px-5 md:px-10 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 block mb-3">
              // design_rules
            </span>
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-white leading-tight">
              Do <span style={{ color: "#f59e0b" }}>&amp;</span> Don&apos;t
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.05} className="mb-14">
            <p className="text-neutral-400 font-mono text-sm max-w-xl leading-relaxed">
              Design rules for Generative Art — derived from the style&apos;s algorithm-first
              philosophy. Deviation breaks the aesthetic contract.
            </p>
          </RevealBlock>

          {/* 3 philosophy principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              {
                icon: <GeoCircle className="w-8 h-8" color="#7c3aed" />,
                title: "Algorithm First",
                tagline: "Code drives every visual",
                desc: "No element is placed by hand. Each shape, color, and position is derived from a mathematical function. The codebase IS the design tool.",
                items: ["SVG geometry as decoration", "HSL rotation for palettes", "Parametric control via seed"],
                color: "#7c3aed",
              },
              {
                icon: <GeoDiamond className="w-8 h-8" color="#3b82f6" />,
                title: "Dark Canvas",
                tagline: "Near-black amplifies color",
                desc: "bg-[#0a0a0a] is mandatory. The near-black background makes algorithm-generated colors appear luminous, like code on a terminal screen.",
                items: ["bg-[#0a0a0a] always", "Neutral-800 for borders", "Violet glow on interaction"],
                color: "#3b82f6",
              },
              {
                icon: <GeoHex className="w-8 h-8" color="#14b8a6" />,
                title: "Mono Typography",
                tagline: "font-mono everywhere",
                desc: "Monospace fonts make the interface feel like code output. Every label, number, and heading uses font-mono — no exceptions.",
                items: ["font-mono for all text", "Uppercase tracking labels", "Coordinate and param display"],
                color: "#14b8a6",
              },
            ].map((p, i) => (
              <RevealBlock key={p.title} delay={i * 0.08}>
                <div
                  className="group bg-neutral-900/80 backdrop-blur rounded-xl p-7 border border-neutral-800 h-full transition-all duration-200 ease-linear hover:border-violet-500/30 hover:shadow-[0_0_20px_rgba(124,58,237,0.1)] cursor-crosshair"
                >
                  <div className="mb-5 transition-transform duration-200 ease-linear group-hover:scale-110">
                    {p.icon}
                  </div>
                  <h3 className="text-base font-mono font-bold text-white mb-1">{p.title}</h3>
                  <p className="text-[10px] font-mono uppercase tracking-[0.1em] mb-3" style={{ color: p.color }}>
                    {p.tagline}
                  </p>
                  <p className="text-neutral-400 font-mono text-xs leading-relaxed mb-5">{p.desc}</p>
                  <ul className="space-y-2">
                    {p.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[10px] font-mono text-neutral-500">
                        <span
                          className="mt-0.5 w-1.5 h-1.5 rotate-45 shrink-0"
                          style={{ backgroundColor: p.color }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Do / Don't lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RevealBlock delay={0.1}>
              <div className="bg-neutral-900/80 backdrop-blur rounded-xl p-8 border border-teal-500/20 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-7 h-7 rounded border border-teal-500/40 bg-teal-500/10 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-mono text-sm uppercase tracking-[0.15em] text-teal-400">Do</h3>
                  <div className="ml-auto w-2 h-2 rotate-45 bg-teal-500/40" />
                </div>
                <ul className="space-y-3">
                  {[
                    "bg-[#0a0a0a] or bg-neutral-950 — dark canvas always",
                    "font-mono for all text — code-art aesthetic",
                    "HSL rotation palette from violet #7c3aed base",
                    "SVG geometric shapes as procedural decoration",
                    "Show seed, coordinates, iteration counts as UI",
                    "ease-linear + duration-200 for exact precision",
                    "bg-neutral-900/80 backdrop-blur dark glass cards",
                    "shadow-[0_0_20px_rgba(124,58,237,0.4)] violet glow",
                    "Dot grid or line grid as background texture",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 font-mono text-xs text-neutral-400 leading-relaxed">
                      <span className="mt-1 w-1.5 h-1.5 rotate-45 shrink-0 bg-teal-400/60" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.16}>
              <div className="bg-neutral-900/80 backdrop-blur rounded-xl p-8 border border-rose-500/20 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-7 h-7 rounded border border-rose-500/40 bg-rose-500/10 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="font-mono text-sm uppercase tracking-[0.15em] text-rose-400">Don&apos;t</h3>
                  <div className="ml-auto w-2 h-2 rotate-45 bg-rose-500/40" />
                </div>
                <ul className="space-y-3">
                  {[
                    "No images or raster bitmaps — SVG only",
                    "No light or white backgrounds — breaks the aesthetic",
                    "No serif or sans-serif fonts — monospace only",
                    "No conventional shadows (shadow-md, shadow-lg)",
                    "No static lifeless layouts — everything must move",
                    "No spring/bounce easing — ease-linear is the standard",
                    "No more than 5 colors without algorithmic justification",
                    "No decorative elements not procedurally derived",
                    "No over-fogged glow — keep geometric edge clarity",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 font-mono text-xs text-neutral-400 leading-relaxed">
                      <span className="mt-1 w-1.5 h-1.5 rotate-45 shrink-0 bg-rose-400/60" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* 8. FEATURE HIGHLIGHTS                                            */}
      {/* ================================================================ */}
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-violet-400 block mb-3">
              // feature_set
            </span>
            <h2 className="text-4xl md:text-5xl font-mono font-bold text-white leading-tight">
              Built with <span style={{ color: "#7c3aed" }}>Precision</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              {
                icon: <GeoCircle className="w-7 h-7" color="#7c3aed" />,
                title: "Parametric Control",
                desc: "Seed, iterations, scale — every visual output is reproducible and controllable via numeric parameters.",
                color: "#7c3aed",
              },
              {
                icon: <GeoDiamond className="w-7 h-7" color="#3b82f6" />,
                title: "HSL Rotation Palette",
                desc: "Six accent colors derived by rotating 60 degrees around the HSL wheel from violet base. Mathematically justified.",
                color: "#3b82f6",
              },
              {
                icon: <GeoTriangle className="w-7 h-7" color="#14b8a6" />,
                title: "SVG Geometry Only",
                desc: "No raster images. All decoration is procedural SVG — circles, lines, polygons derived from mathematical forms.",
                color: "#14b8a6",
              },
              {
                icon: <GeoHex className="w-7 h-7" color="#f59e0b" />,
                title: "Dark Glass Morphism",
                desc: "bg-neutral-900/80 with backdrop-blur. Cards feel like frosted dark glass — translucent, not opaque.",
                color: "#f59e0b",
              },
              {
                icon: <GeoCircle className="w-7 h-7" color="#f43f5e" />,
                title: "Exact Linear Timing",
                desc: "ease-linear at duration-200 for all interactions. Predictable, programmable, machine-like precision.",
                color: "#f43f5e",
              },
              {
                icon: <GeoDiamond className="w-7 h-7" color="#a855f7" />,
                title: "Parameter Display",
                desc: "UI elements surface algorithm state — seed values, coordinates, iteration counts. The interface is the debugger.",
                color: "#a855f7",
              },
            ].map((feature, i) => (
              <RevealBlock key={feature.title} delay={i * 0.06}>
                <div className="group bg-neutral-900/80 backdrop-blur rounded-xl p-7 border border-neutral-800 h-full transition-all duration-200 ease-linear hover:border-violet-500/30 hover:shadow-[0_0_16px_rgba(124,58,237,0.12)] cursor-crosshair relative overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(124,58,237,0.03)_2px,rgba(124,58,237,0.03)_4px)] transition-opacity duration-200 ease-linear" />
                  <div className="relative z-10">
                    <div className="mb-4 transition-transform duration-200 ease-linear group-hover:scale-110">
                      {feature.icon}
                    </div>
                    <h4 className="font-mono text-sm font-bold text-white mb-2 group-hover:text-violet-200 transition-colors duration-200 ease-linear">
                      {feature.title}
                    </h4>
                    <p className="font-mono text-xs text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors duration-200 ease-linear">
                      {feature.desc}
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-linear">
                    <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: feature.color }} />
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* FOOTER                                                           */}
      {/* ================================================================ */}
      <footer className="relative bg-[#0a0a0a] border-t border-neutral-800 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <GridPattern className="absolute bottom-0 right-0 w-64 h-64" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-violet-500/30 via-transparent to-transparent" />
        </div>

        {/* Top accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent" />

        <div className="max-w-6xl mx-auto px-5 md:px-10 pt-16 pb-12 relative z-10">
          {/* Top row */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="flex flex-col gap-4 max-w-xs">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 relative">
                  <div
                    className="absolute inset-0 border border-violet-500/60 rotate-45"
                    style={{ boxShadow: "0 0 8px rgba(124,58,237,0.4)" }}
                  />
                  <div className="absolute inset-[5px] bg-violet-500/40 rotate-45" />
                </div>
                <span className="font-mono font-bold text-white tracking-wider text-sm uppercase">
                  Gen<span className="text-violet-400">Art</span>
                </span>
              </div>
              <p className="font-mono text-xs text-neutral-500 leading-relaxed">
                Algorithm-driven visual aesthetics through mathematical functions,
                noise textures, and parametric geometry.
              </p>
              {/* Color dots */}
              <div className="flex gap-2">
                {["#7c3aed", "#3b82f6", "#14b8a6", "#f43f5e", "#f59e0b"].map((c) => (
                  <div
                    key={c}
                    className="w-4 h-4 rotate-45 transition-all duration-200 ease-linear hover:scale-125 cursor-crosshair"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 font-mono text-xs">
              <div className="flex flex-col gap-3">
                <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-600">Style</span>
                <Link href="/styles/generative-art" className="text-neutral-500 hover:text-violet-400 transition-colors duration-200 ease-linear">
                  Documentation
                </Link>
                <Link href="/styles/generative-art/showcase" className="text-neutral-500 hover:text-violet-400 transition-colors duration-200 ease-linear">
                  Showcase
                </Link>
                <Link href="/styles/generative-art/cover" className="text-neutral-500 hover:text-violet-400 transition-colors duration-200 ease-linear">
                  Cover
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-600">StyleKit</span>
                <Link href="/" className="text-neutral-500 hover:text-violet-400 transition-colors duration-200 ease-linear">
                  Home
                </Link>
                <Link href="/styles" className="text-neutral-500 hover:text-violet-400 transition-colors duration-200 ease-linear">
                  All Styles
                </Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-600">Palette</span>
                {algorithmColors.map((s) => (
                  <span key={s.name} className="flex items-center gap-2 text-neutral-500 text-[10px]">
                    <span
                      className="w-2.5 h-2.5 rotate-45 inline-block shrink-0"
                      style={{ backgroundColor: s.hex, border: s.hex === "#0a0a0a" ? "1px solid #404040" : "none" }}
                    />
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-neutral-800 mb-8" />

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 font-mono text-xs text-neutral-600">
              <span>GenArt Style — StyleKit</span>
              <span className="text-neutral-800">|</span>
              <span>seed: <span className="text-violet-400/60">{seed}</span></span>
              <span className="text-neutral-800">|</span>
              <span>iter: <span className="text-blue-400/60">{iterations}</span></span>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2 rounded-lg font-mono text-xs uppercase tracking-[0.15em] border border-violet-500/30 text-violet-400 hover:border-violet-400 hover:shadow-[0_0_14px_rgba(124,58,237,0.3)] transition-all duration-200 ease-linear hover:tracking-[0.2em]"
            >
              <GeoDiamond className="w-3 h-3" color="#7c3aed" />
              Back to StyleKit
              <span>→</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
