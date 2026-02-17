"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Cpu, Shield, Radio, Activity, Zap, BarChart3, Wifi, AlertTriangle } from "lucide-react";

function HudPanel({
  children,
  className = "",
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div className={`relative bg-slate-900/85 backdrop-blur-xl border border-cyan-500/30 rounded-lg p-6 shadow-[0_4px_24px_rgba(0,0,0,0.4)] hover:border-cyan-500/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300 ${className}`}>
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
      {/* Scanline overlay */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(148,163,184,0.03)_2px,rgba(148,163,184,0.03)_4px)] pointer-events-none rounded-lg" />
      {label && (
        <div className="absolute -top-3 left-6 bg-[#020617] px-3 py-0.5 border border-cyan-500/30 rounded">
          <span className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest">{label}</span>
        </div>
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

function StatusDot({ status }: { status: "online" | "warning" | "danger" | "offline" }) {
  const colors = {
    online: "bg-green-400 shadow-[0_0_10px_rgba(34,197,94,0.6)]",
    warning: "bg-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.6)]",
    danger: "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]",
    offline: "bg-gray-500",
  };
  return (
    <div className={`w-2.5 h-2.5 rounded-full ${colors[status]} ${status !== "offline" ? "animate-pulse" : ""}`} />
  );
}

function ProgressBar({ value, color = "cyan" }: { value: number; color?: string }) {
  const gradients: Record<string, string> = {
    cyan: "from-cyan-500 to-sky-400",
    green: "from-emerald-500 to-green-400",
    yellow: "from-amber-500 to-yellow-400",
    red: "from-red-600 to-red-400",
  };
  return (
    <div className="w-full h-2 bg-slate-800 border border-slate-700/50 rounded-sm overflow-hidden">
      <div
        className={`h-full bg-gradient-to-r ${gradients[color]} shadow-[0_0_8px_currentColor] transition-all duration-700`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function RadarDisplay() {
  return (
    <div className="relative w-64 h-64 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Grid circles */}
        {[30, 60, 90].map((r) => (
          <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="rgba(14,165,233,0.15)" strokeWidth="1" />
        ))}
        {/* Cross lines */}
        <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(14,165,233,0.1)" strokeWidth="1" />
        <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(14,165,233,0.1)" strokeWidth="1" />
        {/* Sweep */}
        <g className="origin-center" style={{ animation: "hud-radar-sweep 6s linear infinite", transformOrigin: "100px 100px" }}>
          <defs>
            <linearGradient id="sweep-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(6,182,212,0)" />
              <stop offset="100%" stopColor="rgba(6,182,212,0.4)" />
            </linearGradient>
          </defs>
          <path d="M100,100 L100,10 A90,90 0 0,1 163.6,36.4 Z" fill="url(#sweep-grad)" />
        </g>
        {/* Blips */}
        <circle cx="130" cy="60" r="3" fill="#22D3EE" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="130" r="3" fill="#22D3EE" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="140" cy="120" r="3" fill="#22C55E" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.3;0.7" dur="1.8s" repeatCount="indefinite" />
        </circle>
        {/* Center */}
        <circle cx="100" cy="100" r="4" fill="#22D3EE">
          <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

function DataStreamLine({ time, text, type = "info" }: { time: string; text: string; type?: "info" | "success" | "warning" | "error" }) {
  const borderColors = {
    info: "border-l-slate-600",
    success: "border-l-green-500",
    warning: "border-l-orange-500",
    error: "border-l-red-500",
  };
  const textColors = {
    info: "text-slate-400",
    success: "text-green-400",
    warning: "text-orange-400",
    error: "text-red-400",
  };
  return (
    <div className={`flex gap-3 px-3 py-2 bg-slate-800/30 border-l-2 ${borderColors[type]} hover:bg-slate-800/50 transition-colors`}>
      <span className="text-cyan-400 font-mono text-xs font-semibold shrink-0">{time}</span>
      <span className={`font-mono text-xs ${textColors[type]}`}>{text}</span>
    </div>
  );
}

export default function SciFiHudShowcaseContent() {
  const [systemTime, setSystemTime] = useState("00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setSystemTime(now.toISOString().slice(11, 19));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-[#E5F2FF]">
      <style jsx global>{`
        @keyframes hud-radar-sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Status Bar */}
      <nav className="sticky top-0 z-50 bg-[#020617]/95 backdrop-blur-sm border-b border-cyan-500/30 px-6 md:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/styles/sci-fi-hud" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-mono text-xs uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center text-cyan-300 font-mono font-bold text-xs bg-cyan-500/10 border border-cyan-500 rounded shadow-[0_0_10px_rgba(6,182,212,0.3)]">
              HUD
            </div>
            <span className="text-[#E5F2FF] font-mono text-sm uppercase tracking-[0.15em]">StyleKit Command</span>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <span className="text-cyan-400 font-mono text-xs bg-cyan-500/10 border border-cyan-500/30 rounded px-3 py-1">{systemTime} UTC</span>
          <div className="flex items-center gap-2">
            <StatusDot status="online" />
            <span className="hidden sm:inline text-slate-400 font-mono text-[10px] uppercase tracking-wider">Systems Online</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 md:px-8 pt-16 pb-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] mb-4">{"// Design System Interface"}</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-mono mb-6" style={{ textShadow: "0 0 30px rgba(6,182,212,0.4)" }}>
            SCI-FI HUD
          </h1>
          <p className="text-slate-400 font-mono text-sm max-w-2xl leading-relaxed">
            Command center interface inspired by starship bridges and tactical displays.
            Semi-transparent glass panels, glowing cyan accents, radar systems, and real-time data streams.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="px-6 md:px-8 pb-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* System Status */}
          <HudPanel label="System Status" className="lg:col-span-2">
            <div className="pt-4 space-y-5">
              {[
                { label: "POWER CORE", value: 92, color: "cyan" },
                { label: "SHIELD ARRAY", value: 78, color: "green" },
                { label: "COMM BANDWIDTH", value: 64, color: "yellow" },
                { label: "HULL INTEGRITY", value: 45, color: "red" },
              ].map((m) => (
                <div key={m.label} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">{m.label}</span>
                    <span className="text-cyan-400 font-mono text-sm font-bold">{m.value}%</span>
                  </div>
                  <ProgressBar value={m.value} color={m.color} />
                </div>
              ))}
            </div>
          </HudPanel>

          {/* Radar */}
          <HudPanel label="Tactical Radar">
            <div className="pt-4">
              <RadarDisplay />
              <div className="mt-4 flex justify-center gap-4">
                {[
                  { label: "Friendly", color: "bg-green-400" },
                  { label: "Unknown", color: "bg-cyan-400" },
                  { label: "Hostile", color: "bg-red-500" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${l.color}`} />
                    <span className="text-slate-500 font-mono text-[10px] uppercase">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </HudPanel>

          {/* Data Stream */}
          <HudPanel label="Data Stream" className="lg:col-span-2">
            <div className="pt-4 space-y-1 max-h-56 overflow-y-auto">
              <DataStreamLine time="09:42:01" text="System boot sequence initiated" type="info" />
              <DataStreamLine time="09:42:03" text="Core systems online - all checks passed" type="success" />
              <DataStreamLine time="09:42:05" text="Shield generator calibrating..." type="info" />
              <DataStreamLine time="09:42:08" text="Anomaly detected in sector 7-G" type="warning" />
              <DataStreamLine time="09:42:12" text="Navigation locked: destination Alpha Centauri" type="success" />
              <DataStreamLine time="09:42:15" text="Hull breach detected - deck 12 sealed" type="error" />
              <DataStreamLine time="09:42:18" text="Repair drones deployed" type="info" />
              <DataStreamLine time="09:42:22" text="Long-range scanner sweep complete" type="success" />
            </div>
          </HudPanel>

          {/* Subsystem Status */}
          <HudPanel label="Subsystems">
            <div className="pt-4 space-y-3">
              {[
                { name: "Navigation", icon: Radio, status: "online" as const },
                { name: "Weapons", icon: Zap, status: "online" as const },
                { name: "Life Support", icon: Activity, status: "online" as const },
                { name: "Communications", icon: Wifi, status: "warning" as const },
                { name: "Secondary Power", icon: AlertTriangle, status: "danger" as const },
              ].map((s) => (
                <div key={s.name} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">
                  <div className="flex items-center gap-3">
                    <s.icon className="w-4 h-4 text-cyan-500/60" />
                    <span className="text-slate-300 font-mono text-xs uppercase tracking-wider">{s.name}</span>
                  </div>
                  <StatusDot status={s.status} />
                </div>
              ))}
            </div>
          </HudPanel>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="px-6 md:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] mb-8">{"// Component Library"}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buttons */}
            <HudPanel label="Buttons">
              <div className="pt-4 flex flex-wrap gap-3">
                <button className="px-5 py-2.5 bg-slate-900/80 border border-cyan-500/40 text-cyan-400 rounded shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 transition-all duration-300 font-mono text-xs uppercase tracking-widest">
                  Initialize
                </button>
                <button className="px-5 py-2.5 bg-cyan-500/20 border border-cyan-300 text-cyan-300 rounded shadow-[0_0_20px_rgba(6,182,212,0.5)] font-mono text-xs uppercase tracking-widest">
                  Active
                </button>
                <button className="px-5 py-2.5 bg-slate-900/80 border border-red-500/40 text-red-400 rounded shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:border-red-400 hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all duration-300 font-mono text-xs uppercase tracking-widest">
                  Override
                </button>
                <button className="px-5 py-2.5 bg-slate-900/80 border border-green-500/40 text-green-400 rounded shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:border-green-400 hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all duration-300 font-mono text-xs uppercase tracking-widest">
                  Confirm
                </button>
              </div>
            </HudPanel>

            {/* Input */}
            <HudPanel label="Input Fields">
              <div className="pt-4 space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-cyan-400 font-mono text-[10px] uppercase tracking-widest">Access Code</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-cyan-500/30 rounded text-[#E5F2FF] font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                      placeholder="Enter command..."
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-pulse" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-cyan-400 font-mono text-[10px] uppercase tracking-widest">Coordinates</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-cyan-500/30 rounded text-[#E5F2FF] font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
                    placeholder="X: 0.00 Y: 0.00 Z: 0.00"
                  />
                </div>
              </div>
            </HudPanel>

            {/* Metric Cards */}
            <HudPanel label="Metric Indicators" className="md:col-span-2">
              <div className="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Crew", value: "847", icon: Cpu },
                  { label: "Cargo", value: "72.4T", icon: BarChart3 },
                  { label: "Range", value: "4.2 LY", icon: Radio },
                  { label: "Uptime", value: "99.97%", icon: Shield },
                ].map((m) => (
                  <div key={m.label} className="bg-slate-800/30 border border-slate-700/50 rounded p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <m.icon className="w-3.5 h-3.5 text-cyan-500/50" />
                      <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">{m.label}</span>
                    </div>
                    <p className="text-cyan-400 font-mono text-xl font-bold">{m.value}</p>
                  </div>
                ))}
              </div>
            </HudPanel>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="px-6 md:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] mb-8">{"// Color System"}</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { name: "Deep Navy", hex: "#020617", bg: "bg-[#020617]", text: "text-slate-400" },
              { name: "Dark Slate", hex: "#0f172a", bg: "bg-[#0f172a]", text: "text-slate-400" },
              { name: "Primary Cyan", hex: "#06B6D4", bg: "bg-cyan-500", text: "text-white" },
              { name: "Bright Blue", hex: "#0EA5E9", bg: "bg-sky-500", text: "text-white" },
              { name: "Neon Cyan", hex: "#22D3EE", bg: "bg-cyan-400", text: "text-black" },
              { name: "Success", hex: "#22C55E", bg: "bg-green-500", text: "text-white" },
              { name: "Warning", hex: "#F97316", bg: "bg-orange-500", text: "text-white" },
              { name: "Danger", hex: "#EF4444", bg: "bg-red-500", text: "text-white" },
              { name: "Text Primary", hex: "#E5F2FF", bg: "bg-[#E5F2FF]", text: "text-black" },
              { name: "Text Secondary", hex: "#94A3B8", bg: "bg-slate-400", text: "text-black" },
            ].map((c) => (
              <div key={c.name} className={`${c.bg} rounded p-3 border border-slate-700/30`}>
                <p className={`${c.text} font-mono text-[10px] uppercase tracking-wider`}>{c.name}</p>
                <p className={`${c.text} font-mono text-xs opacity-70`}>{c.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 px-6 md:px-8 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 font-mono text-xs">Sci-Fi HUD Design System // StyleKit</p>
          <div className="flex gap-4">
            <Link href="/styles/sci-fi-hud" className="text-cyan-400 font-mono text-xs uppercase tracking-wider hover:text-cyan-300 transition-colors">
              Documentation
            </Link>
            <Link href="/styles" className="text-slate-400 font-mono text-xs uppercase tracking-wider hover:text-slate-300 transition-colors">
              All Styles
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
