"use client";

import Link from "next/link";
import { ArrowLeft, Cpu, Shield, Zap, Terminal, Radio, Radar } from "lucide-react";
import {
  ShowcaseHero,
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

const colors: ColorItem[] = [
  { name: "Deep Purple", hex: "#7c3aed", bg: "bg-[#7c3aed]" },
  { name: "Cyan-Green", hex: "#06d6a0", bg: "bg-[#06d6a0]" },
  { name: "Hot Pink", hex: "#ff006e", bg: "bg-[#ff006e]" },
  { name: "Sky Blue", hex: "#38bdf8", bg: "bg-[#38bdf8]" },
  { name: "Dark BG", hex: "#0f0f1a", bg: "bg-[#0f0f1a]" },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#0f0f1a] relative overflow-hidden">
      {/* Hexagonal grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='52'%3E%3Cpath d='M30 0 L60 15 L60 37 L30 52 L0 37 L0 15 Z' fill='none' stroke='%237c3aed' stroke-width='0.4' opacity='0.06'/%3E%3C/svg%3E\")",
        }}
      />

      {/* HUD viewport frame corners */}
      <div className="fixed top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-[#06d6a0]/40 pointer-events-none z-20" />
      <div className="fixed top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-[#06d6a0]/40 pointer-events-none z-20" />
      <div className="fixed bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-[#06d6a0]/40 pointer-events-none z-20" />
      <div className="fixed bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-[#06d6a0]/40 pointer-events-none z-20" />

      {/* Ambient glow */}
      <div className="fixed top-0 right-0 w-80 h-80 bg-[#7c3aed]/8 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-64 h-64 bg-[#06d6a0]/6 blur-[80px] pointer-events-none" />

      {/* Navigation bar with HUD data readout */}
      <nav className="relative z-10 px-6 py-4 border-b border-[#7c3aed]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/cyber-anime"
            className="flex items-center gap-2 text-[#06d6a0] hover:text-[#06d6a0]/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold uppercase tracking-widest text-sm">
              Back
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-[#06d6a0]/50 font-mono text-xs tracking-wider">
              SYS::ONLINE
            </span>
            <span className="w-2 h-2 bg-[#06d6a0] animate-pulse" />
            <span className="font-bold text-xl text-[#7c3aed] uppercase tracking-widest">
              CYBER ANIME
            </span>
          </div>
          <Link
            href="/styles"
            className="px-4 py-2 border border-[#06d6a0]/50 text-[#06d6a0] font-bold uppercase tracking-widest text-sm shadow-[0_0_10px_rgba(6,214,160,0.2)] hover:shadow-[0_0_15px_rgba(6,214,160,0.4)] transition-all duration-300"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero: HUD cockpit initialization sequence */}
      <ShowcaseHero
        title="CYBER ANIME"
        description="HUD interfaces, holographic panels, mecha cockpit aesthetics"
        className="relative z-10 pt-28 pb-24 px-6 text-center"
        titleClassName="text-6xl md:text-8xl font-bold text-[#7c3aed] uppercase tracking-wider mb-4 [text-shadow:0_0_40px_rgba(124,58,237,0.4),0_0_80px_rgba(124,58,237,0.15)]"
        descriptionClassName="text-lg text-[#e0e0ff]/40 font-mono max-w-2xl mx-auto mb-12"
      >
        <div className="inline-flex items-center gap-4 mb-10">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#06d6a0]/50" />
          <span className="text-sm font-mono text-[#06d6a0]/70 uppercase tracking-[0.3em]">
            Cockpit Interface Active
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#06d6a0]/50" />
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="relative overflow-hidden px-10 py-4 bg-[#7c3aed] text-white font-bold uppercase tracking-widest border border-[#06d6a0]/50 shadow-[0_0_15px_rgba(124,58,237,0.4),0_0_30px_rgba(124,58,237,0.15)] hover:shadow-[0_0_25px_rgba(124,58,237,0.6),0_0_50px_rgba(124,58,237,0.2)] transition-all duration-300">
            <span className="relative z-10">Execute</span>
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 3px)",
              }}
            />
          </button>
          <button className="px-10 py-4 bg-transparent text-[#06d6a0] font-bold uppercase tracking-widest border border-[#06d6a0] shadow-[0_0_10px_rgba(6,214,160,0.3)] hover:shadow-[0_0_20px_rgba(6,214,160,0.5)] transition-all duration-300">
            Scan
          </button>
        </div>
      </ShowcaseHero>

      {/* Color palette in HUD panel format */}
      <ShowcaseSection
        title="COLOR MATRIX"
        subtitle="NEON SPECTRUM // PALETTE DATA"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-[#e0e0ff] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#e0e0ff]/30 uppercase tracking-widest mb-10 text-center text-xs font-mono"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="border border-[#7c3aed]/30 bg-[#0f0f1a]/90 backdrop-blur-sm shadow-[0_0_10px_rgba(124,58,237,0.15)]"
            labelClassName="font-bold text-sm text-[#e0e0ff] uppercase tracking-wider"
            hexClassName="text-xs text-[#06d6a0] font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Mecha cockpit: split-panel dashboard layout */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#e0e0ff] uppercase tracking-widest mb-4">
              COCKPIT DASHBOARD
            </h2>
            <p className="text-[#e0e0ff]/30 uppercase tracking-widest text-xs font-mono">
              HUD Data Panels // Multi-Glow System
            </p>
          </div>

          {/* Asymmetric 2-column cockpit layout */}
          <div className="grid md:grid-cols-5 gap-6">
            {/* Left panel: large data readout */}
            <div
              className="md:col-span-3 relative overflow-hidden p-6 md:p-8 bg-[#0f0f1a]/90 border border-[#7c3aed]/30 backdrop-blur-sm shadow-[0_0_20px_rgba(124,58,237,0.2)] hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all duration-300"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
              }}
            >
              {/* HUD corner decorations */}
              <div className="absolute top-0 left-0 w-5 h-5 border-l-2 border-t-2 border-[#06d6a0]/50" />
              <div className="absolute top-0 right-5 w-5 h-5 border-r-2 border-t-2 border-[#06d6a0]/50" />
              <div className="absolute bottom-0 left-5 w-5 h-5 border-l-2 border-b-2 border-[#06d6a0]/50" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-r-2 border-b-2 border-[#06d6a0]/50" />

              <div className="flex items-center gap-3 mb-6">
                <Radar className="w-5 h-5 text-[#7c3aed]" />
                <h3 className="text-lg font-bold text-[#06d6a0] uppercase tracking-wider">
                  Primary Systems
                </h3>
                <span className="ml-auto text-[10px] font-mono text-[#e0e0ff]/30 uppercase">
                  Status: Active
                </span>
              </div>

              {/* Data readout rows */}
              <div className="space-y-4">
                {[
                  { label: "REACTOR", value: "98.2%", color: "#06d6a0", width: "w-[98%]" },
                  { label: "SHIELDS", value: "76.5%", color: "#38bdf8", width: "w-[76%]" },
                  { label: "WEAPONS", value: "100%", color: "#ff006e", width: "w-full" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs font-mono text-[#e0e0ff]/60 uppercase tracking-wider">
                        {item.label}
                      </span>
                      <span
                        className="text-xs font-mono uppercase"
                        style={{ color: item.color }}
                      >
                        {item.value}
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#1a1a2e] border border-[#7c3aed]/20">
                      <div
                        className={`h-full ${item.width}`}
                        style={{
                          background: `linear-gradient(90deg, ${item.color}40, ${item.color})`,
                          boxShadow: `0 0 8px ${item.color}40`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Scan line overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 3px)",
                }}
              />
            </div>

            {/* Right panel: stacked status cards */}
            <div className="md:col-span-2 flex flex-col gap-6">
              {[
                {
                  icon: Cpu,
                  title: "NEURAL CORE",
                  subtitle: "Processing online",
                  borderColor: "border-[#7c3aed]/40",
                  glowColor: "rgba(124,58,237,0.2)",
                  iconColor: "text-[#7c3aed]",
                  titleColor: "text-[#7c3aed]",
                },
                {
                  icon: Shield,
                  title: "FIREWALL",
                  subtitle: "Threat level zero",
                  borderColor: "border-[#06d6a0]/40",
                  glowColor: "rgba(6,214,160,0.2)",
                  iconColor: "text-[#06d6a0]",
                  titleColor: "text-[#06d6a0]",
                },
                {
                  icon: Zap,
                  title: "OVERCLOCK",
                  subtitle: "Maximum output",
                  borderColor: "border-[#ff006e]/30",
                  glowColor: "rgba(255,0,110,0.15)",
                  iconColor: "text-[#ff006e]",
                  titleColor: "text-[#ff006e]",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className={`relative overflow-hidden p-5 bg-[#0f0f1a]/90 border ${card.borderColor} backdrop-blur-sm hover:-translate-y-1 transition-all duration-300`}
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                    boxShadow: `0 0 15px ${card.glowColor}`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 border ${card.borderColor} flex items-center justify-center flex-shrink-0`}
                    >
                      <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                    </div>
                    <div>
                      <h3
                        className={`text-sm font-bold ${card.titleColor} uppercase tracking-wider mb-1`}
                      >
                        {card.title}
                      </h3>
                      <p className="text-[#e0e0ff]/40 text-xs font-mono">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Button showcase in terminal-style panel */}
      <ShowcaseSection
        title="CONTROLS"
        subtitle="HOLOGRAPHIC ACTIONS // SCAN LINE TEXTURE"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-[#e0e0ff] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#e0e0ff]/30 uppercase tracking-widest mb-10 text-center text-xs font-mono"
      >
        <div className="max-w-4xl mx-auto">
          <div
            className="relative overflow-hidden p-8 bg-[#0f0f1a]/90 border border-[#7c3aed]/20 backdrop-blur-sm shadow-[0_0_20px_rgba(124,58,237,0.1)]"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
            }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Radio className="w-4 h-4 text-[#06d6a0]" />
              <p className="text-sm font-bold text-[#06d6a0] uppercase tracking-widest">
                Action Panel
              </p>
              <div className="ml-auto flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#06d6a0]" />
                <span className="w-1.5 h-1.5 bg-[#7c3aed]" />
                <span className="w-1.5 h-1.5 bg-[#ff006e]" />
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="relative overflow-hidden px-6 py-3 bg-[#7c3aed] text-white font-bold uppercase tracking-widest text-sm border border-[#06d6a0]/50 shadow-[0_0_10px_rgba(124,58,237,0.3),0_0_20px_rgba(124,58,237,0.15)] hover:shadow-[0_0_20px_rgba(124,58,237,0.5),0_0_40px_rgba(124,58,237,0.2)] transition-all duration-300">
                <span className="relative z-10">Primary</span>
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 3px)",
                  }}
                />
              </button>
              <button className="px-6 py-3 bg-transparent text-[#06d6a0] font-bold uppercase tracking-widest text-sm border border-[#06d6a0] shadow-[0_0_10px_rgba(6,214,160,0.3)] hover:shadow-[0_0_15px_rgba(6,214,160,0.5)] transition-all duration-300">
                Secondary
              </button>
              <button className="px-6 py-3 bg-[#ff006e] text-white font-bold uppercase tracking-widest text-sm border border-[#ff006e]/50 shadow-[0_0_10px_rgba(255,0,110,0.3),0_0_20px_rgba(255,0,110,0.15)] hover:shadow-[0_0_20px_rgba(255,0,110,0.5)] transition-all duration-300">
                Accent
              </button>
              <button className="px-6 py-3 bg-transparent text-[#38bdf8] font-bold uppercase tracking-widest text-sm border border-[#38bdf8]/50 shadow-[0_0_10px_rgba(56,189,248,0.3)] hover:shadow-[0_0_15px_rgba(56,189,248,0.5)] transition-all duration-300">
                Info
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Terminal access form */}
      <ShowcaseSection
        title="TERMINAL"
        subtitle="SECURE ACCESS // AUTHENTICATION PROTOCOL"
        className="relative z-10 py-16 px-6"
        titleClassName="text-3xl font-bold text-[#e0e0ff] uppercase tracking-widest mb-4 text-center"
        subtitleClassName="text-[#e0e0ff]/30 uppercase tracking-widest mb-10 text-center text-xs font-mono"
      >
        <div className="max-w-md mx-auto">
          <div
            className="relative overflow-hidden p-8 bg-[#0f0f1a]/90 border border-[#7c3aed]/30 backdrop-blur-sm shadow-[0_0_20px_rgba(124,58,237,0.15)]"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
            }}
          >
            {/* HUD corner marks */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#06d6a0]/50" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#06d6a0]/50" />

            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto border border-[#06d6a0]/50 flex items-center justify-center mb-4 shadow-[0_0_10px_rgba(6,214,160,0.2)]">
                <Terminal className="w-7 h-7 text-[#06d6a0]" />
              </div>
              <h3 className="text-xl font-bold text-[#7c3aed] uppercase tracking-widest">
                Access
              </h3>
              <p className="text-[10px] font-mono text-[#e0e0ff]/30 mt-1 uppercase tracking-wider">
                Authentication required
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#06d6a0] uppercase tracking-widest mb-2">
                  User ID
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#06d6a0] font-mono text-sm">
                    &gt;
                  </span>
                  <input
                    type="text"
                    placeholder="Enter user ID..."
                    className="w-full pl-8 pr-4 py-3 bg-[#0f0f1a]/80 border border-[#7c3aed]/30 text-[#e0e0ff] placeholder-[#e0e0ff]/30 font-mono focus:border-[#06d6a0] focus:shadow-[0_0_15px_rgba(6,214,160,0.3)] focus:outline-none transition-all duration-300 caret-[#06d6a0]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#ff006e] uppercase tracking-widest mb-2">
                  Access Key
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ff006e] font-mono text-sm">
                    &gt;
                  </span>
                  <input
                    type="password"
                    placeholder="Enter access key..."
                    className="w-full pl-8 pr-4 py-3 bg-[#0f0f1a]/80 border border-[#7c3aed]/30 text-[#e0e0ff] placeholder-[#e0e0ff]/30 font-mono focus:border-[#ff006e] focus:shadow-[0_0_15px_rgba(255,0,110,0.3)] focus:outline-none transition-all duration-300 caret-[#ff006e]"
                  />
                </div>
              </div>
              <button className="relative overflow-hidden w-full px-6 py-3 bg-[#7c3aed] text-white font-bold uppercase tracking-widest text-sm border border-[#06d6a0]/50 shadow-[0_0_15px_rgba(124,58,237,0.4),0_0_30px_rgba(124,58,237,0.15)] hover:shadow-[0_0_25px_rgba(124,58,237,0.6)] transition-all duration-300">
                <span className="relative z-10">Authenticate</span>
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 3px)",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-6 border-t border-[#7c3aed]/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#e0e0ff]/20 uppercase tracking-wider">
            v2.0 // HUD Interface
          </span>
          <p className="text-[#e0e0ff]/30 text-sm uppercase tracking-widest">
            Cyber Anime Showcase /{" "}
            <Link
              href="/"
              className="text-[#06d6a0] hover:text-[#06d6a0]/80 transition-colors"
            >
              StyleKit
            </Link>
          </p>
          <span className="text-[10px] font-mono text-[#e0e0ff]/20 uppercase tracking-wider">
            Status: Online
          </span>
        </div>
      </footer>
    </div>
  );
}

