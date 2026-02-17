"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Atom,
  Network,
  Waves,
  Orbit,
  Sparkles,
  Zap,
  Activity,
} from "lucide-react";

/* ---------- helper: decorative particle ---------- */
function Particle({
  size,
  top,
  left,
  opacity,
  delay,
  duration,
}: {
  size: number;
  top: string;
  left: string;
  opacity: number;
  delay: number;
  duration: number;
}) {
  return (
    <div
      className="absolute rounded-full bg-white pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        opacity,
        animation: `particle-float ${duration}s ${delay}s ease-in-out infinite`,
      }}
    />
  );
}

/* ---------- helper: glass card ---------- */
function ParticleCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-[#0f1419]/80 backdrop-blur-xl rounded-xl border border-white/5 p-6 transition-all duration-300 hover:border-blue-500/20 hover:shadow-[0_0_25px_rgba(59,130,246,0.1)] ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- particle seed data ---------- */
const particles = [
  { size: 3, top: "8%", left: "12%", opacity: 0.4, delay: 0, duration: 8 },
  { size: 2, top: "15%", left: "28%", opacity: 0.3, delay: 1.2, duration: 10 },
  { size: 5, top: "22%", left: "55%", opacity: 0.2, delay: 0.5, duration: 12 },
  { size: 3, top: "10%", left: "72%", opacity: 0.5, delay: 2, duration: 9 },
  { size: 2, top: "30%", left: "88%", opacity: 0.3, delay: 0.8, duration: 11 },
  { size: 4, top: "40%", left: "5%", opacity: 0.35, delay: 1.5, duration: 10 },
  { size: 2, top: "35%", left: "42%", opacity: 0.25, delay: 3, duration: 13 },
  { size: 3, top: "50%", left: "65%", opacity: 0.45, delay: 0.3, duration: 8 },
  { size: 5, top: "55%", left: "20%", opacity: 0.2, delay: 2.5, duration: 14 },
  { size: 2, top: "60%", left: "80%", opacity: 0.35, delay: 1, duration: 9 },
  { size: 3, top: "70%", left: "35%", opacity: 0.3, delay: 0.7, duration: 11 },
  { size: 4, top: "75%", left: "90%", opacity: 0.25, delay: 2.2, duration: 12 },
  { size: 2, top: "18%", left: "48%", opacity: 0.6, delay: 1.8, duration: 7 },
  { size: 3, top: "45%", left: "15%", opacity: 0.3, delay: 0.4, duration: 10 },
  { size: 2, top: "65%", left: "58%", opacity: 0.4, delay: 3.2, duration: 9 },
  { size: 4, top: "5%", left: "40%", opacity: 0.2, delay: 1.1, duration: 13 },
  { size: 3, top: "85%", left: "25%", opacity: 0.35, delay: 0.6, duration: 8 },
  { size: 2, top: "90%", left: "70%", opacity: 0.3, delay: 2.8, duration: 11 },
];

/* ---------- color palette data ---------- */
const palette = [
  { hex: "#0a0e1a", label: "Deep Space" },
  { hex: "#0f1419", label: "Dark Surface" },
  { hex: "#e0e8ff", label: "Star White" },
  { hex: "#3b82f6", label: "Node Blue" },
  { hex: "#14b8a6", label: "Link Teal" },
  { hex: "#a78bfa", label: "Pulse Violet" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-[#e0e8ff] relative overflow-hidden">
      {/* Global keyframes */}
      <style jsx global>{`
        @keyframes particle-float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -15px); }
          50% { transform: translate(-5px, 10px); }
          75% { transform: translate(-10px, -5px); }
        }
      `}</style>

      {/* Decorative particle field (covers hero area) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}
        {/* SVG connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
          <line x1="12%" y1="8%" x2="28%" y2="15%" stroke="white" strokeWidth="0.5" />
          <line x1="28%" y1="15%" x2="48%" y2="18%" stroke="white" strokeWidth="0.5" />
          <line x1="55%" y1="22%" x2="72%" y2="10%" stroke="white" strokeWidth="0.5" />
          <line x1="72%" y1="10%" x2="88%" y2="30%" stroke="white" strokeWidth="0.5" />
          <line x1="5%" y1="40%" x2="15%" y2="45%" stroke="white" strokeWidth="0.5" />
          <line x1="42%" y1="35%" x2="65%" y2="50%" stroke="white" strokeWidth="0.5" />
          <line x1="20%" y1="55%" x2="35%" y2="70%" stroke="white" strokeWidth="0.5" />
          <line x1="65%" y1="50%" x2="80%" y2="60%" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0a0e1a]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/styles/particle"
            className="flex items-center gap-2 text-[#e0e8ff] text-sm font-semibold hover:text-white transition-colors"
          >
            <Atom className="w-4 h-4 text-blue-400" />
            <span>PARTICLE</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/50">
            <span className="hover:text-white transition-colors cursor-pointer">Features</span>
            <span className="hover:text-white transition-colors cursor-pointer">Network</span>
            <span className="hover:text-white transition-colors cursor-pointer">Docs</span>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
            Launch
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 md:pt-44 pb-20 px-6 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-[#e0e8ff] mb-6 leading-tight">
            Particle System
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            A living network of floating particles and connection lines that creates a sense of data
            flowing through space. Tech-forward yet organic.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_24px_rgba(59,130,246,0.4)]">
              Explore Network
            </button>
            <button className="px-8 py-3 bg-white/5 backdrop-blur border border-white/10 text-white/80 rounded-lg font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/20">
              View Source
            </button>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#e0e8ff] mb-12 text-center">
            Core Concepts
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: "Floating Nodes", desc: "Particles drift slowly in random directions, creating an organic constellation feel that breathes life into deep backgrounds." },
              { icon: Network, title: "Connection Lines", desc: "Thin lines appear between nearby particles at low opacity, forming a dynamic mesh that visualizes invisible relationships." },
              { icon: Activity, title: "Pulse Effects", desc: "Subtle scale and opacity pulsing on select particles draws attention without overwhelming the foreground content." },
            ].map((item, i) => (
              <ParticleCard key={i}>
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-[#e0e8ff] mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </ParticleCard>
            ))}
          </div>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#e0e8ff] mb-12 text-center">
            Components
          </h2>

          {/* Buttons */}
          <ParticleCard className="mb-6">
            <h3 className="text-sm font-medium text-white/40 uppercase tracking-wide mb-4">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium text-sm transition-all duration-300 hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                Primary
              </button>
              <button className="px-6 py-3 bg-white/5 backdrop-blur border border-white/10 text-white/80 rounded-lg font-medium text-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20">
                Secondary
              </button>
              <button className="px-6 py-3 text-white/60 rounded-lg font-medium text-sm transition-all duration-300 hover:text-white hover:bg-white/5">
                Ghost
              </button>
            </div>
          </ParticleCard>

          {/* Inputs */}
          <ParticleCard>
            <h3 className="text-sm font-medium text-white/40 uppercase tracking-wide mb-4">Inputs</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">Node Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-[#0a0e1a] border border-white/10 rounded-lg text-[#e0e8ff] placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition-all duration-300"
                  placeholder="Enter node identifier"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">Connection Radius</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 bg-[#0a0e1a] border border-white/10 rounded-lg text-[#e0e8ff] placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition-all duration-300"
                  placeholder="150"
                />
              </div>
            </div>
          </ParticleCard>
        </div>
      </section>

      {/* Network Visualization */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#e0e8ff] mb-12">
            Network Visualization
          </h2>
          <ParticleCard className="p-0 overflow-hidden">
            <svg viewBox="0 0 600 300" className="w-full h-auto">
              {/* Connection lines */}
              <line x1="100" y1="80" x2="250" y2="120" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
              <line x1="250" y1="120" x2="400" y2="60" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
              <line x1="400" y1="60" x2="500" y2="150" stroke="rgba(59,130,246,0.15)" strokeWidth="1" />
              <line x1="250" y1="120" x2="300" y2="220" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
              <line x1="100" y1="80" x2="150" y2="200" stroke="rgba(59,130,246,0.15)" strokeWidth="1" />
              <line x1="150" y1="200" x2="300" y2="220" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
              <line x1="300" y1="220" x2="450" y2="240" stroke="rgba(59,130,246,0.15)" strokeWidth="1" />
              <line x1="500" y1="150" x2="450" y2="240" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
              <line x1="400" y1="60" x2="300" y2="220" stroke="rgba(100,200,255,0.1)" strokeWidth="0.5" />
              <line x1="100" y1="80" x2="300" y2="220" stroke="rgba(100,200,255,0.08)" strokeWidth="0.5" />
              {/* Nodes */}
              <circle cx="100" cy="80" r="6" fill="rgba(59,130,246,0.8)" />
              <circle cx="100" cy="80" r="12" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
              <circle cx="250" cy="120" r="8" fill="rgba(20,184,166,0.8)" />
              <circle cx="250" cy="120" r="16" fill="none" stroke="rgba(20,184,166,0.2)" strokeWidth="1" />
              <circle cx="400" cy="60" r="5" fill="rgba(167,139,250,0.8)" />
              <circle cx="400" cy="60" r="10" fill="none" stroke="rgba(167,139,250,0.2)" strokeWidth="1" />
              <circle cx="500" cy="150" r="7" fill="rgba(59,130,246,0.8)" />
              <circle cx="500" cy="150" r="14" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
              <circle cx="150" cy="200" r="4" fill="rgba(100,255,200,0.6)" />
              <circle cx="150" cy="200" r="8" fill="none" stroke="rgba(100,255,200,0.15)" strokeWidth="1" />
              <circle cx="300" cy="220" r="6" fill="rgba(59,130,246,0.8)" />
              <circle cx="300" cy="220" r="12" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
              <circle cx="450" cy="240" r="5" fill="rgba(20,184,166,0.7)" />
              <circle cx="450" cy="240" r="10" fill="none" stroke="rgba(20,184,166,0.2)" strokeWidth="1" />
            </svg>
          </ParticleCard>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "128", label: "Particles", icon: Atom },
              { value: "342", label: "Connections", icon: Network },
              { value: "60", label: "FPS", icon: Zap },
              { value: "7", label: "Clusters", icon: Orbit },
            ].map((stat, i) => (
              <ParticleCard key={i} className="text-center">
                <stat.icon className="w-5 h-5 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-semibold text-[#e0e8ff] mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-white/40 uppercase tracking-wide">{stat.label}</div>
              </ParticleCard>
            ))}
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#e0e8ff] mb-12 text-center">
            Color Palette
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {palette.map((c) => (
              <div key={c.hex} className="text-center">
                <div
                  className="w-full aspect-square rounded-xl border border-white/10 mb-2"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="text-xs text-white/60 font-medium">{c.label}</div>
                <div className="text-xs text-white/30 font-mono">{c.hex}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0e1a] border-t border-white/5 py-8 px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/styles" className="text-xs text-white/30 hover:text-white/60 transition-colors">
              Styles
            </Link>
            <span className="text-xs text-white/30">Particle System</span>
            <Waves className="w-3 h-3 text-white/20" />
          </div>
          <Link
            href="/styles/particle"
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Docs
          </Link>
        </div>
      </footer>
    </div>
  );
}
