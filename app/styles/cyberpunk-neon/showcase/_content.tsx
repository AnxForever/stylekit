"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Cpu, Globe, ChevronRight } from "lucide-react";

// Glitch Text Component - Electric short circuit effect
function GlitchText({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`glitch-text relative inline-block ${className}`} data-text={children}>
      {children}
      <style jsx>{`
        .glitch-text {
          position: relative;
        }
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .glitch-text::before {
          color: #ff00ff;
          animation: glitch-1 0.3s infinite linear alternate-reverse;
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
          transform: translate(-2px);
        }
        .glitch-text::after {
          color: #00ffd5;
          animation: glitch-2 0.3s infinite linear alternate-reverse;
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
          transform: translate(2px);
        }
        @keyframes glitch-1 {
          0% { clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%); transform: translate(-2px); }
          20% { clip-path: polygon(0 15%, 100% 15%, 100% 35%, 0 35%); transform: translate(2px); }
          40% { clip-path: polygon(0 10%, 100% 10%, 100% 30%, 0 30%); transform: translate(-1px); }
          60% { clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%); transform: translate(1px); }
          80% { clip-path: polygon(0 5%, 100% 5%, 100% 25%, 0 25%); transform: translate(-2px); }
          100% { clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%); transform: translate(2px); }
        }
        @keyframes glitch-2 {
          0% { clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%); transform: translate(2px); }
          20% { clip-path: polygon(0 70%, 100% 70%, 100% 95%, 0 95%); transform: translate(-2px); }
          40% { clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 100%); transform: translate(1px); }
          60% { clip-path: polygon(0 60%, 100% 60%, 100% 90%, 0 90%); transform: translate(-1px); }
          80% { clip-path: polygon(0 68%, 100% 68%, 100% 98%, 0 98%); transform: translate(2px); }
          100% { clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%); transform: translate(-2px); }
        }
      `}</style>
    </span>
  );
}

// HUD Panel Component with corner decorations
function HudPanel({
  children,
  className = "",
  color = "cyan"
}: {
  children: React.ReactNode;
  className?: string;
  color?: "cyan" | "magenta" | "green";
}) {
  const colors = {
    cyan: { border: "border-[#00ffd5]", text: "text-[#00ffd5]", bg: "bg-[#00ffd5]" },
    magenta: { border: "border-[#ff00ff]", text: "text-[#ff00ff]", bg: "bg-[#ff00ff]" },
    green: { border: "border-[#00ff00]", text: "text-[#00ff00]", bg: "bg-[#00ff00]" },
  };
  const c = colors[color];

  return (
    <div className={`relative ${className}`}>
      {/* Corner decorations */}
      <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${c.border}`} />
      <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${c.border}`} />
      <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${c.border}`} />
      <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${c.border}`} />
      {/* Dashed border */}
      <div className={`border border-dashed ${c.border}/40 p-4`}>
        {children}
      </div>
    </div>
  );
}

// Traffic Light Dots
function TrafficLights() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
      <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
    </div>
  );
}

// Typing cursor effect
function TypingCursor() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => setVisible(v => !v), 530);
    return () => clearInterval(interval);
  }, []);
  return <span className={`${visible ? 'opacity-100' : 'opacity-0'} transition-opacity`}>_</span>;
}

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Scanlines Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)",
        }}
      />

      {/* Grid Background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#00ffd5 1px, transparent 1px), linear-gradient(90deg, #00ffd5 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />

      {/* Navigation - Terminal Style */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center">
        <Link
          href="/styles/cyberpunk-neon"
          className="flex items-center gap-2 font-mono text-[#00ffd5] text-sm tracking-wider hover:text-[#00ffd5]/80 transition-colors"
        >
          <span className="text-[#ff00ff]">&gt;_</span>
          <span className="italic">ACME INC.</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 font-mono text-sm tracking-wider">
          <span className="text-white/60 hover:text-white transition-colors cursor-pointer">[FEATURES]</span>
          <span className="text-white/60 hover:text-white transition-colors cursor-pointer">[PRICING]</span>
          <span className="text-white/60 hover:text-white transition-colors cursor-pointer">[ABOUT]</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline font-mono text-sm text-white/60 tracking-wider hover:text-white transition-colors cursor-pointer">LOG_IN</span>
          <button className="font-mono text-sm px-4 py-2 border border-[#00ffd5] text-[#00ffd5] tracking-wider hover:bg-[#00ffd5]/10 transition-colors">
            INIT_SYSTEM
          </button>
        </div>
      </nav>

      {/* Status Bar */}
      <div className="fixed top-16 left-6 z-40">
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2 py-1 bg-[#00ffd5]/20 border border-[#00ffd5]/50 text-[#00ffd5]">
            SYSTEM_STATUS: <span className="text-[#00ff00]">ONLINE</span>
          </span>
        </div>
      </div>

      {/* Hero Section - SaaS Layout */}
      <section className="pt-32 md:pt-40 pb-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy with Glitch Text */}
            <div>
              <h1 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <GlitchText className="text-white block mb-2">TRANSFORM</GlitchText>
                <span className="text-[#ff00ff] block">THE WAY</span>
                <span className="text-[#00ffd5] block">YOUR TEAM</span>
                <span className="text-white block">WORKS</span>
              </h1>

              <p className="font-mono text-white/50 text-sm md:text-base mb-8 leading-relaxed max-w-md">
                &gt; Acme Platform brings your team together
                with powerful tools designed to streamline
                workflows, boost productivity, and drive
                results.<TypingCursor />
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button className="font-mono px-6 py-3 bg-[#00ffd5] text-black font-bold tracking-wider hover:bg-[#00ffd5]/90 transition-colors flex items-center gap-2">
                  START FREE TRIAL
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button className="font-mono px-6 py-3 border border-white/30 text-white tracking-wider hover:border-white/60 transition-colors">
                  WATCH DEMO
                </button>
              </div>
            </div>

            {/* Right: HUD Display */}
            <div className="relative">
              {/* HUD Version Label */}
              <div className="absolute -top-6 right-0 font-mono text-xs text-[#00ffd5]/50 tracking-wider">
                HUD_DISPLAY_V 0.9
              </div>

              {/* Main HUD Frame */}
              <div className="border border-[#00ffd5]/30 p-6 relative">
                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00ffd5]" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00ffd5]" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00ffd5]" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00ffd5]" />

                <div className="space-y-4">
                  {/* Window Card */}
                  <HudPanel color="cyan">
                    <div className="flex items-start gap-4">
                      <TrafficLights />
                      <div className="flex-1">
                        <div className="h-2 bg-[#00ffd5]/20 rounded mb-2 w-3/4" />
                        <div className="h-2 bg-[#00ffd5]/20 rounded mb-2 w-1/2" />
                        <div className="h-2 bg-[#00ffd5]/20 rounded w-2/3" />
                      </div>
                    </div>
                  </HudPanel>

                  <div className="grid grid-cols-2 gap-4">
                    {/* CPU Panel */}
                    <HudPanel color="cyan">
                      <div className="flex items-center gap-3">
                        <Cpu className="w-8 h-8 text-[#00ffd5]" />
                      </div>
                    </HudPanel>

                    {/* Stats Panel */}
                    <HudPanel color="cyan">
                      <div className="text-right">
                        <div className="font-mono text-2xl font-bold text-[#00ffd5]">98%</div>
                        <div className="font-mono text-xs text-[#00ffd5]/50">CPU_LOAD</div>
                      </div>
                    </HudPanel>
                  </div>

                  {/* Globe Panel */}
                  <HudPanel color="cyan">
                    <div className="flex items-center gap-4">
                      <Globe className="w-8 h-8 text-[#00ffd5]" />
                      <div className="flex-1">
                        <div className="h-1 bg-[#00ffd5]/30 rounded" />
                      </div>
                    </div>
                  </HudPanel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-mono text-2xl md:text-3xl font-bold mb-12 text-[#00ffd5]">
            {"//"} CORE_FEATURES
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "NEURAL.SYNC", desc: "Real-time collaboration with AI-powered insights", status: "ACTIVE" },
              { title: "QUANTUM.ENCRYPT", desc: "Military-grade encryption for all your data", status: "SECURE" },
              { title: "HYPER.SCALE", desc: "Infinitely scalable infrastructure on demand", status: "READY" },
            ].map((feature, i) => (
              <HudPanel key={i} color={i === 1 ? "magenta" : "cyan"}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono text-lg font-bold text-white">{feature.title}</h3>
                    <span className={`font-mono text-xs px-2 py-0.5 ${
                      i === 1 ? "bg-[#ff00ff]/20 text-[#ff00ff]" : "bg-[#00ffd5]/20 text-[#00ffd5]"
                    }`}>
                      {feature.status}
                    </span>
                  </div>
                  <p className="font-mono text-sm text-white/50">{feature.desc}</p>
                </div>
              </HudPanel>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 relative z-10 border-t border-[#00ffd5]/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "12.4K", label: "ACTIVE_USERS", color: "cyan" },
              { value: "99.9%", label: "UPTIME_SLA", color: "green" },
              { value: "24/7", label: "SUPPORT_ACCESS", color: "magenta" },
              { value: "$10M+", label: "CUSTOMER_SAVINGS", color: "cyan" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`font-mono text-3xl md:text-4xl font-bold mb-2 ${
                  stat.color === "cyan" ? "text-[#00ffd5]" :
                  stat.color === "magenta" ? "text-[#ff00ff]" : "text-[#00ff00]"
                }`}>
                  {stat.value}
                </div>
                <div className="font-mono text-xs text-white/40 tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-mono text-3xl md:text-4xl font-bold mb-6">
            <span className="text-white">READY TO </span>
            <GlitchText className="text-[#00ffd5]">INITIALIZE</GlitchText>
            <span className="text-white">?</span>
          </h2>
          <p className="font-mono text-white/50 mb-8">
            Join thousands of teams already using Acme Platform
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="font-mono px-8 py-4 bg-[#00ffd5] text-black font-bold tracking-wider hover:bg-[#00ffd5]/90 transition-colors">
              START FREE TRIAL
            </button>
            <button className="font-mono px-8 py-4 border border-[#ff00ff] text-[#ff00ff] tracking-wider hover:bg-[#ff00ff]/10 transition-colors">
              SCHEDULE DEMO
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#00ffd5]/20 py-8 px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-white/30">design/prompts</span>
            <span className="font-mono text-xs text-white/30">Prompt</span>
            <Link href="/styles" className="font-mono text-xs text-white/30 hover:text-white/60 transition-colors">
              Styles
            </Link>
          </div>
          <Link
            href="/styles/cyberpunk-neon"
            className="font-mono text-xs text-[#00ffd5] hover:text-[#00ffd5]/80 transition-colors tracking-wider flex items-center gap-2"
          >
            <ArrowLeft className="w-3 h-3" />
            BACK TO DOCS
          </Link>
        </div>
      </footer>
    </div>
  );
}
