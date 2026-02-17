"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Code,
  GitBranch,
  Hexagon,
  Triangle,
  Circle,
  Workflow,
  Cpu,
} from "lucide-react";

// --- Helper Components ---

function GenCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-neutral-900/80 backdrop-blur rounded-xl border border-neutral-800 p-6 transition-all duration-300 hover:border-violet-500/30 hover:shadow-[0_0_25px_rgba(124,58,237,0.15)] ${className}`}
    >
      {children}
    </div>
  );
}

function ParamBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex font-mono text-xs bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded px-2 py-1">
      {children}
    </span>
  );
}

// --- SVG Patterns ---

function DotGrid() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 w-full h-full opacity-[0.06]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="dot-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#7c3aed" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-grid)" />
    </svg>
  );
}

function ConcentricCircles({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {[20, 40, 60, 80, 100].map((r) => (
        <circle
          key={r}
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="#7c3aed"
          strokeWidth="0.5"
          opacity={0.15 + (r / 100) * 0.2}
        />
      ))}
      {[30, 55, 75, 95].map((r) => (
        <circle
          key={`d-${r}`}
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="0.3"
          strokeDasharray="4 6"
          opacity={0.1 + (r / 100) * 0.15}
        />
      ))}
    </svg>
  );
}

// Mini SVG illustrations for algorithm cards
function PerlinNoiseSvg() {
  return (
    <svg viewBox="0 0 80 60" className="w-full h-16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0,30 Q10,10 20,28 T40,25 T60,32 T80,20"
        fill="none"
        stroke="#7c3aed"
        strokeWidth="1.5"
        opacity="0.7"
      />
      <path
        d="M0,40 Q15,25 25,38 T50,35 T70,42 T80,30"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="1"
        opacity="0.5"
      />
      <path
        d="M0,50 Q12,35 22,48 T45,45 T65,50 T80,42"
        fill="none"
        stroke="#14b8a6"
        strokeWidth="0.8"
        opacity="0.4"
      />
    </svg>
  );
}

function VoronoiSvg() {
  return (
    <svg viewBox="0 0 80 60" className="w-full h-16" xmlns="http://www.w3.org/2000/svg">
      <polygon points="0,0 30,5 25,30 0,25" fill="none" stroke="#f43f5e" strokeWidth="0.8" opacity="0.5" />
      <polygon points="30,5 55,0 60,20 25,30" fill="none" stroke="#7c3aed" strokeWidth="0.8" opacity="0.5" />
      <polygon points="55,0 80,0 80,25 60,20" fill="none" stroke="#3b82f6" strokeWidth="0.8" opacity="0.5" />
      <polygon points="0,25 25,30 20,55 0,60" fill="none" stroke="#14b8a6" strokeWidth="0.8" opacity="0.5" />
      <polygon points="25,30 60,20 65,50 20,55" fill="none" stroke="#f59e0b" strokeWidth="0.8" opacity="0.5" />
      <polygon points="60,20 80,25 80,60 65,50" fill="none" stroke="#7c3aed" strokeWidth="0.8" opacity="0.5" />
      {/* Cell centers */}
      <circle cx="14" cy="15" r="1.5" fill="#f43f5e" opacity="0.7" />
      <circle cx="42" cy="12" r="1.5" fill="#7c3aed" opacity="0.7" />
      <circle cx="68" cy="12" r="1.5" fill="#3b82f6" opacity="0.7" />
      <circle cx="12" cy="42" r="1.5" fill="#14b8a6" opacity="0.7" />
      <circle cx="42" cy="38" r="1.5" fill="#f59e0b" opacity="0.7" />
      <circle cx="70" cy="40" r="1.5" fill="#7c3aed" opacity="0.7" />
    </svg>
  );
}

function FlowFieldSvg() {
  return (
    <svg viewBox="0 0 80 60" className="w-full h-16" xmlns="http://www.w3.org/2000/svg">
      {[0, 10, 20, 30, 40, 50].map((y) => (
        <path
          key={y}
          d={`M0,${y + 5} C20,${y + (y % 20 === 0 ? -5 : 10)} 40,${y + (y % 20 === 0 ? 15 : 0)} 80,${y + 5}`}
          fill="none"
          stroke="#7c3aed"
          strokeWidth="0.8"
          opacity={0.2 + (y / 50) * 0.4}
        />
      ))}
    </svg>
  );
}

function FractalTreeSvg() {
  return (
    <svg viewBox="0 0 80 60" className="w-full h-16" xmlns="http://www.w3.org/2000/svg">
      {/* Trunk */}
      <line x1="40" y1="58" x2="40" y2="35" stroke="#7c3aed" strokeWidth="1.5" opacity="0.7" />
      {/* Level 1 */}
      <line x1="40" y1="35" x2="28" y2="22" stroke="#3b82f6" strokeWidth="1" opacity="0.6" />
      <line x1="40" y1="35" x2="52" y2="22" stroke="#3b82f6" strokeWidth="1" opacity="0.6" />
      {/* Level 2 */}
      <line x1="28" y1="22" x2="20" y2="12" stroke="#14b8a6" strokeWidth="0.7" opacity="0.5" />
      <line x1="28" y1="22" x2="34" y2="12" stroke="#14b8a6" strokeWidth="0.7" opacity="0.5" />
      <line x1="52" y1="22" x2="46" y2="12" stroke="#f43f5e" strokeWidth="0.7" opacity="0.5" />
      <line x1="52" y1="22" x2="60" y2="12" stroke="#f43f5e" strokeWidth="0.7" opacity="0.5" />
      {/* Level 3 */}
      <line x1="20" y1="12" x2="16" y2="5" stroke="#f59e0b" strokeWidth="0.5" opacity="0.4" />
      <line x1="20" y1="12" x2="24" y2="5" stroke="#f59e0b" strokeWidth="0.5" opacity="0.4" />
      <line x1="34" y1="12" x2="31" y2="5" stroke="#f59e0b" strokeWidth="0.5" opacity="0.4" />
      <line x1="34" y1="12" x2="37" y2="5" stroke="#f59e0b" strokeWidth="0.5" opacity="0.4" />
      <line x1="46" y1="12" x2="43" y2="5" stroke="#f59e0b" strokeWidth="0.5" opacity="0.4" />
      <line x1="46" y1="12" x2="49" y2="5" stroke="#f59e0b" strokeWidth="0.5" opacity="0.4" />
      <line x1="60" y1="12" x2="57" y2="5" stroke="#f59e0b" strokeWidth="0.5" opacity="0.4" />
      <line x1="60" y1="12" x2="63" y2="5" stroke="#f59e0b" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

// --- Algorithm data ---

const algorithms = [
  { name: "Perlin Noise", desc: "Gradient noise for organic procedural textures", icon: Workflow, svg: PerlinNoiseSvg },
  { name: "Voronoi", desc: "Partitioning space into regions by nearest seed", icon: Hexagon, svg: VoronoiSvg },
  { name: "Flow Field", desc: "Vector field driving particle movement paths", icon: GitBranch, svg: FlowFieldSvg },
  { name: "Fractal Tree", desc: "Recursive branching via L-system rules", icon: Triangle, svg: FractalTreeSvg },
];

// --- Palette ---

const palette = [
  { hex: "#7c3aed", label: "Violet", hsl: "263, 84%, 58%" },
  { hex: "#3b82f6", label: "Blue", hsl: "217, 91%, 60%" },
  { hex: "#14b8a6", label: "Teal", hsl: "173, 80%, 40%" },
  { hex: "#f43f5e", label: "Rose", hsl: "347, 90%, 60%" },
  { hex: "#f59e0b", label: "Amber", hsl: "38, 92%, 50%" },
];

// --- Main Showcase ---

export default function GenerativeArtShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Dot Grid Pattern Overlay */}
      <DotGrid />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-neutral-800 px-6 py-4 flex justify-between items-center">
        <Link
          href="/styles/generative-art"
          className="flex items-center gap-2 font-mono text-white text-sm tracking-wider hover:text-violet-400 transition-colors"
        >
          <Code className="w-4 h-4 text-violet-400" />
          <span className="font-bold">GenArt</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 font-mono text-sm">
          <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Algorithms</span>
          <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Gallery</span>
          <span className="text-neutral-400 hover:text-white transition-colors cursor-pointer">Parameters</span>
          <ParamBadge>seed: 42</ParamBadge>
        </div>

        <button className="font-mono text-sm px-4 py-2 border border-violet-500/40 text-violet-400 rounded-lg hover:bg-violet-500/10 transition-colors">
          Generate
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 md:pt-40 pb-20 px-6 z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <ParamBadge>v1.0.0</ParamBadge>
              <ParamBadge>creative-coding</ParamBadge>
            </div>
            <h1 className="font-mono font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              <span className="text-white block">Generative</span>
              <span className="text-violet-400 block">Art</span>
            </h1>
            <p className="font-mono text-neutral-400 text-sm md:text-base mb-8 leading-relaxed max-w-md">
              Algorithm-driven visual aesthetics. Every element is procedurally generated through mathematical functions, noise textures, and parametric systems.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button className="px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 border bg-violet-600 text-white border-violet-500 hover:bg-violet-500 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                Explore Algorithms
              </button>
              <button className="px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 border bg-transparent text-violet-400 border-violet-500/40 hover:border-violet-400 hover:bg-violet-500/10">
                View Source
              </button>
            </div>
          </div>

          {/* Hero decoration: concentric circles */}
          <div className="relative flex items-center justify-center">
            <ConcentricCircles className="w-72 h-72 md:w-96 md:h-96 opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-violet-500 shadow-[0_0_15px_rgba(124,58,237,0.6)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Algorithms Section */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Cpu className="w-5 h-5 text-violet-400" />
            <h2 className="font-mono text-2xl font-bold text-white">Algorithms</h2>
            <span className="font-mono text-xs text-neutral-600 ml-auto">4 modules loaded</span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {algorithms.map((algo) => {
              const Icon = algo.icon;
              const SvgIllust = algo.svg;
              return (
                <GenCard key={algo.name}>
                  <div className="mb-4">
                    <SvgIllust />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-violet-400" />
                    <h3 className="font-mono text-sm font-bold text-white">{algo.name}</h3>
                  </div>
                  <p className="font-mono text-xs text-neutral-400 leading-relaxed">{algo.desc}</p>
                </GenCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="py-16 px-6 relative z-10 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-mono text-2xl font-bold text-white mb-8">Components</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Buttons */}
            <GenCard>
              <h3 className="font-mono text-xs uppercase tracking-wider text-violet-400 mb-4">Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 border bg-violet-600 text-white border-violet-500 hover:bg-violet-500 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                  Primary
                </button>
                <button className="px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 border bg-transparent text-violet-400 border-violet-500/40 hover:border-violet-400 hover:bg-violet-500/10">
                  Secondary
                </button>
                <button className="px-6 py-3 rounded-lg font-mono text-sm transition-all duration-300 border bg-transparent text-neutral-500 border-neutral-700 hover:border-neutral-500 hover:text-neutral-300">
                  Ghost
                </button>
              </div>
            </GenCard>

            {/* Inputs */}
            <GenCard>
              <h3 className="font-mono text-xs uppercase tracking-wider text-violet-400 mb-4">Inputs</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg text-neutral-100 font-mono text-sm placeholder:text-neutral-600 focus:outline-none focus:border-violet-500 focus:shadow-[0_0_10px_rgba(124,58,237,0.2)] transition-all duration-300"
                  placeholder="Enter seed value..."
                  defaultValue="42"
                />
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-700 rounded-lg text-neutral-100 font-mono text-sm placeholder:text-neutral-600 focus:outline-none focus:border-violet-500 focus:shadow-[0_0_10px_rgba(124,58,237,0.2)] transition-all duration-300"
                  placeholder="Noise scale..."
                />
              </div>
            </GenCard>

            {/* Parameter Badges */}
            <GenCard className="md:col-span-2">
              <h3 className="font-mono text-xs uppercase tracking-wider text-violet-400 mb-4">Parameter Badges</h3>
              <div className="flex flex-wrap gap-3">
                <ParamBadge>seed: 1234</ParamBadge>
                <ParamBadge>iterations: 100</ParamBadge>
                <ParamBadge>scale: 0.005</ParamBadge>
                <ParamBadge>octaves: 6</ParamBadge>
                <ParamBadge>persistence: 0.5</ParamBadge>
                <ParamBadge>lacunarity: 2.0</ParamBadge>
                <ParamBadge>algorithm: perlin</ParamBadge>
                <ParamBadge>dimensions: 2D</ParamBadge>
              </div>
            </GenCard>
          </div>
        </div>
      </section>

      {/* Palette Generator Section */}
      <section className="py-16 px-6 relative z-10 border-t border-neutral-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Circle className="w-5 h-5 text-violet-400" />
            <h2 className="font-mono text-2xl font-bold text-white">Palette Generator</h2>
            <span className="font-mono text-xs text-neutral-600 ml-auto">HSL rotation from base</span>
          </div>

          {/* Color Swatches Row */}
          <div className="flex gap-4 mb-8">
            {palette.map((color) => (
              <div key={color.hex} className="flex-1 group">
                <div
                  className="h-20 rounded-lg mb-3 transition-all duration-300 group-hover:shadow-[0_0_20px_var(--swatch-color)] group-hover:scale-105"
                  style={{
                    backgroundColor: color.hex,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    ["--swatch-color" as any]: `${color.hex}80`,
                  }}
                />
                <p className="font-mono text-xs text-white">{color.label}</p>
                <p className="font-mono text-xs text-neutral-600">{color.hex}</p>
              </div>
            ))}
          </div>

          {/* Color Palette Grid */}
          <GenCard>
            <h3 className="font-mono text-xs uppercase tracking-wider text-violet-400 mb-4">HSL Breakdown</h3>
            <div className="grid grid-cols-5 gap-3">
              {palette.map((color) => (
                <div key={color.hex} className="text-center">
                  <div
                    className="w-full aspect-square rounded-lg mb-2 border border-neutral-800"
                    style={{ backgroundColor: color.hex }}
                  />
                  <p className="font-mono text-xs text-neutral-400">{color.hsl}</p>
                </div>
              ))}
            </div>
          </GenCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-neutral-800 py-8 px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-neutral-600">Generative Art Style</span>
            <span className="font-mono text-xs text-neutral-600">seed: 42</span>
            <Link
              href="/styles"
              className="font-mono text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
            >
              All Styles
            </Link>
          </div>
          <Link
            href="/styles/generative-art"
            className="font-mono text-xs text-violet-400 hover:text-violet-300 transition-colors tracking-wider flex items-center gap-2"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Docs
          </Link>
        </div>
      </footer>
    </div>
  );
}
