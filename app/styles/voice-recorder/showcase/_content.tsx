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
// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ScanlineOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,65,0.03) 2px,rgba(0,255,65,0.03) 4px)",
      }}
    />
  );
}

function GlowDot({ on = true }: { on?: boolean }) {
  return (
    <div
      className="w-2 h-2 shrink-0"
      style={{
        background: on ? "#00ff41" : "#00ff4130",
        boxShadow: on ? "0 0 8px #00ff41, 0 0 16px #00ff4160" : "none",
      }}
    />
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#00ff41]/40 mb-6">
      {"// "}{children}
    </p>
  );
}

function MicrophoneIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#00ff41" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="1" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="8" y1="21" x2="16" y2="21" />
    </svg>
  );
}

function WaveformIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#00ff41" strokeWidth="2" strokeLinecap="round">
      <line x1="4" y1="8" x2="4" y2="16" />
      <line x1="8" y1="4" x2="8" y2="20" />
      <line x1="12" y1="6" x2="12" y2="18" />
      <line x1="16" y1="4" x2="16" y2="20" />
      <line x1="20" y1="8" x2="20" y2="16" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#00ff41">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#00ff41">
      <rect x="4" y="4" width="16" height="16" />
    </svg>
  );
}
// ---------------------------------------------------------------------------
// Main showcase
// ---------------------------------------------------------------------------

const WAVEFORM_BARS = 32;
const BAR_HEIGHTS = [30, 55, 80, 45, 90, 60, 75, 95, 40, 70, 85, 50, 65, 92, 35, 78, 88, 42, 68, 55, 82, 48, 72, 90, 38, 62, 85, 52, 76, 95, 44, 58];

const LOG_LINES = [
  { time: "00:00:01", msg: "Audio context initialized" },
  { time: "00:00:01", msg: "Sample rate: 44100 Hz" },
  { time: "00:00:02", msg: "Buffer size: 1024 frames" },
  { time: "00:00:02", msg: "Input device: default microphone" },
  { time: "00:00:03", msg: "Recording started..." },
  { time: "00:03:42", msg: "Signal level: -12.4 dBFS" },
  { time: "00:03:42", msg: "Peak hold: -6.2 dBFS" },
];

const COLORS = [
  { name: "Background", hex: "#0d1117", tw: "bg-[#0d1117]" },
  { name: "Dark BG", hex: "#080b10", tw: "bg-[#080b10]" },
  { name: "Matrix Green", hex: "#00ff41", tw: "bg-[#00ff41]" },
  { name: "Green 70%", hex: "#00ff41b3", tw: "bg-[#00ff41]/70" },
  { name: "Green 40%", hex: "#00ff4166", tw: "bg-[#00ff41]/40" },
  { name: "Green 20%", hex: "#00ff4133", tw: "bg-[#00ff41]/20" },
];

export default function VoiceRecorderShowcase() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!isRecording) return;
    const id = setInterval(() => setCurrentTime((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, [isRecording]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#00ff41] font-mono relative overflow-hidden">
      <ScanlineOverlay />

      {/* Moving scanline */}
      <div
        className="absolute left-0 right-0 h-[2px] bg-[#00ff41]/10 pointer-events-none z-10"
        style={{ animation: "vr-scanline 8s linear infinite" }}
      />

      {/* ---- 1. Hero ---- */}
      <section className="relative px-6 py-24 md:py-32 overflow-hidden">
        <ScanlineOverlay />
        <div className="relative max-w-5xl mx-auto text-center">
          <RevealBlock>
            <p className="text-xs uppercase tracking-[0.4em] text-[#00ff41]/40 mb-6">
              sys://voice-recorder v2.4.1
            </p>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wider"
              style={{ textShadow: "0 0 30px rgba(0,255,65,0.4), 0 0 60px rgba(0,255,65,0.15)" }}
            >
              VOICE RECORDER
            </h1>
          </RevealBlock>
          <RevealBlock delay={0.2}>
            <p className="mt-6 text-[#00ff41]/50 text-sm max-w-xl mx-auto">
              &gt; CRT terminal aesthetic meets audio waveform visualization.
              Scanlines, matrix green glow, and typewriter animations.
            </p>
          </RevealBlock>
          <RevealBlock delay={0.3}>
            <div className="mt-8 flex justify-center gap-4">
              <div className="flex items-center gap-2 text-xs text-[#00ff41]/40">
                <GlowDot /> SIGNAL: OK
              </div>
              <div className="flex items-center gap-2 text-xs text-[#00ff41]/40">
                <GlowDot /> LATENCY: 12ms
              </div>
              <div className="flex items-center gap-2 text-xs text-[#00ff41]/40">
                <GlowDot /> 44.1kHz
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>
      {/* ---- 2. Waveform Visualizer ---- */}
      <section className="relative px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <SectionLabel>Waveform Visualizer</SectionLabel>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <div className="relative bg-[#080b10] border border-[#00ff41]/20 p-6 overflow-hidden">
              <ScanlineOverlay />
              <div className="relative flex items-end justify-center gap-[3px] h-40">
                {BAR_HEIGHTS.map((h, i) => (
                  <div
                    key={i}
                    className="w-2 md:w-3 bg-[#00ff41] origin-bottom"
                    style={{
                      height: `${h}%`,
                      opacity: 0.6 + (h / 100) * 0.4,
                      animation: `vr-waveform ${0.8 + (i % 5) * 0.2}s ease-in-out ${i * 0.05}s infinite`,
                      boxShadow: "0 0 4px rgba(0,255,65,0.3)",
                    }}
                  />
                ))}
              </div>
              <div className="relative mt-4 flex justify-between text-xs text-[#00ff41]/30">
                <span>0 Hz</span>
                <span>11 kHz</span>
                <span>22 kHz</span>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---- 3. Recording Controls ---- */}
      <section className="relative px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <SectionLabel>Recording Controls</SectionLabel>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <div className="relative bg-[#080b10] border border-[#00ff41]/20 p-8 overflow-hidden">
              <ScanlineOverlay />
              <div className="relative flex flex-col items-center gap-6">
                <div className="flex items-center gap-3">
                  <MicrophoneIcon size={32} />
                  <span className="text-2xl font-bold tracking-wider">
                    {formatTime(currentTime)}
                  </span>
                  {isRecording && (
                    <div
                      className="w-3 h-3 bg-red-500 rounded-full"
                      style={{ animation: "vr-blink 1s ease-in-out infinite" }}
                    />
                  )}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => { setIsRecording(!isRecording); if (!isRecording) setCurrentTime(0); }}
                    className={`px-6 py-3 font-mono text-sm uppercase tracking-[0.2em] border transition-all duration-150 ${
                      isRecording
                        ? "bg-red-500/20 text-red-400 border-red-500/40 hover:bg-red-500/30"
                        : "bg-[#00ff41]/10 text-[#00ff41] border-[#00ff41]/40 hover:bg-[#00ff41] hover:text-[#0d1117]"
                    }`}
                  >
                    {isRecording ? "STOP" : "RECORD"}
                  </button>
                  <button className="px-6 py-3 font-mono text-sm uppercase tracking-[0.2em] border border-[#00ff41]/20 text-[#00ff41]/50 hover:border-[#00ff41]/40 hover:text-[#00ff41] transition-all duration-150 flex items-center gap-2">
                    <PlayIcon /> PLAY
                  </button>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>
      {/* ---- 4. Terminal Log Output ---- */}
      <section className="relative px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <SectionLabel>Terminal Log</SectionLabel>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <div className="relative bg-[#080b10] border border-[#00ff41]/20 p-6 overflow-hidden">
              <ScanlineOverlay />
              <div className="relative space-y-1">
                {LOG_LINES.map((line, i) => (
                  <div key={i} className="flex gap-3 text-xs">
                    <span className="text-[#00ff41]/30 shrink-0">[{line.time}]</span>
                    <span className="text-[#00ff41]/70">{line.msg}</span>
                  </div>
                ))}
                <div className="flex gap-3 text-xs">
                  <span className="text-[#00ff41]/30">[--:--:--]</span>
                  <span className="text-[#00ff41]">
                    &gt; _<span style={{ animation: "vr-blink 1s step-end infinite" }}>|</span>
                  </span>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---- 5. Button Variants ---- */}
      <section className="relative px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <SectionLabel>Button Variants</SectionLabel>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-[#00ff41]/10 text-[#00ff41] font-mono text-sm uppercase tracking-[0.2em] border border-[#00ff41]/40 shadow-[0_0_12px_rgba(0,255,65,0.2)] hover:bg-[#00ff41] hover:text-[#0d1117] hover:shadow-[0_0_30px_rgba(0,255,65,0.6)] active:translate-y-[2px] transition-all duration-150">
                PRIMARY
              </button>
              <button className="px-8 py-4 bg-transparent text-[#00ff41] font-mono text-sm uppercase tracking-[0.2em] border border-[#00ff41]/20 hover:border-[#00ff41]/50 hover:shadow-[0_0_16px_rgba(0,255,65,0.15)] active:translate-y-[2px] transition-all duration-150">
                SECONDARY
              </button>
              <button className="px-8 py-4 bg-[#00ff41] text-[#0d1117] font-mono text-sm uppercase tracking-[0.2em] border border-[#00ff41] shadow-[0_0_16px_rgba(0,255,65,0.4)] hover:shadow-[0_0_30px_rgba(0,255,65,0.7)] active:translate-y-[2px] transition-all duration-150 font-bold">
                SOLID
              </button>
              <button className="px-8 py-4 bg-transparent text-[#00ff41]/40 font-mono text-sm uppercase tracking-[0.2em] border border-[#00ff41]/10 cursor-not-allowed opacity-50">
                DISABLED
              </button>
            </div>
          </RevealBlock>
        </div>
      </section>
      {/* ---- 6. Card Grid ---- */}
      <section className="relative px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <SectionLabel>Card Components</SectionLabel>
          </RevealBlock>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "AUDIO INPUT", desc: "Microphone capture and preprocessing module", icon: <MicrophoneIcon /> },
              { title: "WAVEFORM", desc: "Real-time frequency analysis and visualization", icon: <WaveformIcon /> },
              { title: "SIGNAL OUT", desc: "Processed audio output and export pipeline", icon: <PlayIcon /> },
            ].map((card, i) => (
              <RevealBlock key={card.title} delay={0.1 + i * 0.1}>
                <div className="group relative bg-[#0d1117] border border-[#00ff41]/20 p-6 overflow-hidden hover:border-[#00ff41]/50 hover:shadow-[0_0_24px_rgba(0,255,65,0.1)] hover:-translate-y-1 transition-all duration-200">
                  <ScanlineOverlay />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-3">
                      <GlowDot />
                      <span className="text-[#00ff41]/50 text-xs uppercase tracking-[0.2em]">Module {String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="mb-3">{card.icon}</div>
                    <h3 className="text-[#00ff41] text-lg font-bold mb-2">{card.title}</h3>
                    <p className="text-[#00ff41]/40 text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 7. Input Fields ---- */}
      <section className="relative px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <SectionLabel>Input Fields</SectionLabel>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <div className="max-w-md space-y-6">
              <div className="space-y-2">
                <label className="block text-[#00ff41]/50 text-xs uppercase tracking-[0.2em]">Command</label>
                <div className="flex items-center bg-[#080b10] border border-[#00ff41]/30 focus-within:border-[#00ff41] focus-within:shadow-[0_0_12px_rgba(0,255,65,0.2)] transition-all duration-200">
                  <span className="text-[#00ff41]/30 text-sm pl-4 select-none">$</span>
                  <input type="text" className="w-full px-3 py-3 bg-transparent text-[#00ff41] text-sm placeholder:text-[#00ff41]/20 focus:outline-none font-mono" placeholder="enter command..." />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-[#00ff41]/50 text-xs uppercase tracking-[0.2em]">Filename</label>
                <input type="text" className="w-full px-4 py-3 bg-[#080b10] border border-[#00ff41]/30 text-[#00ff41] text-sm placeholder:text-[#00ff41]/20 focus:outline-none focus:border-[#00ff41] focus:shadow-[0_0_12px_rgba(0,255,65,0.2)] transition-all duration-200 font-mono" placeholder="recording_001.wav" />
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>
      {/* ---- 8. Typography ---- */}
      <section className="relative px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <SectionLabel>Typography</SectionLabel>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider" style={{ textShadow: "0 0 20px rgba(0,255,65,0.4)" }}>
                Heading 1
              </h1>
              <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wider text-[#00ff41]/90">
                Heading 2
              </h2>
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-[#00ff41]/80">
                Heading 3
              </h3>
              <p className="text-sm text-[#00ff41]/60 leading-relaxed max-w-2xl">
                All text in the Voice Recorder style uses monospace fonts exclusively.
                This creates a consistent terminal aesthetic across all components.
                The matrix green (#00ff41) serves as the primary text color with
                varying opacity levels for hierarchy.
              </p>
              <p className="text-xs text-[#00ff41]/40 uppercase tracking-[0.3em]">
                Label / Caption / Metadata
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---- 9. Color Palette ---- */}
      <section className="relative px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <SectionLabel>Color Palette</SectionLabel>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {COLORS.map((c) => (
                <div key={c.name} className="space-y-2">
                  <div
                    className="h-16 border border-[#00ff41]/20"
                    style={{ backgroundColor: c.hex.replace(/[a-f0-9]{2}$/i, "") || c.hex }}
                  >
                    <div className="w-full h-full" style={{ backgroundColor: c.hex }} />
                  </div>
                  <p className="text-xs text-[#00ff41]/60">{c.name}</p>
                  <p className="text-xs text-[#00ff41]/30">{c.hex}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>
      {/* ---- 10. Animation Keyframes Demo ---- */}
      <section className="relative px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <SectionLabel>Animation Keyframes</SectionLabel>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-[#080b10] border border-[#00ff41]/20 p-6">
                <p className="text-xs text-[#00ff41]/40 uppercase tracking-[0.2em] mb-3">vr-glow-pulse</p>
                <div
                  className="w-full h-12 bg-[#00ff41]/10 border border-[#00ff41]/30"
                  style={{ animation: "vr-glow-pulse 2s ease-in-out infinite" }}
                />
              </div>
              <div className="bg-[#080b10] border border-[#00ff41]/20 p-6">
                <p className="text-xs text-[#00ff41]/40 uppercase tracking-[0.2em] mb-3">vr-blink</p>
                <span
                  className="text-2xl text-[#00ff41] font-bold"
                  style={{ animation: "vr-blink 1s step-end infinite" }}
                >
                  _
                </span>
              </div>
              <div className="bg-[#080b10] border border-[#00ff41]/20 p-6">
                <p className="text-xs text-[#00ff41]/40 uppercase tracking-[0.2em] mb-3">vr-waveform</p>
                <div className="flex items-end gap-1 h-12">
                  {[40, 70, 55, 85, 60, 90, 45, 75].map((h, i) => (
                    <div
                      key={i}
                      className="w-3 bg-[#00ff41] origin-bottom"
                      style={{
                        height: `${h}%`,
                        animation: `vr-waveform ${0.6 + i * 0.1}s ease-in-out ${i * 0.08}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---- 11. VU Meter / Level Indicator ---- */}
      <section className="relative px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <SectionLabel>VU Meter</SectionLabel>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <div className="relative bg-[#080b10] border border-[#00ff41]/20 p-6 overflow-hidden">
              <ScanlineOverlay />
              <div className="relative space-y-4">
                {["L", "R"].map((ch) => (
                  <div key={ch} className="flex items-center gap-3">
                    <span className="text-xs text-[#00ff41]/50 w-4">{ch}</span>
                    <div className="flex-1 h-4 bg-[#0d1117] border border-[#00ff41]/10 flex gap-[2px] p-[2px]">
                      {Array.from({ length: 24 }).map((_, i) => {
                        const isActive = i < (ch === "L" ? 18 : 15);
                        const isHot = i >= 20;
                        const isWarm = i >= 16;
                        let color = "#00ff41";
                        if (isHot) color = "#ff0040";
                        else if (isWarm) color = "#ffaa00";
                        return (
                          <div
                            key={i}
                            className="flex-1 h-full transition-all duration-100"
                            style={{
                              backgroundColor: isActive ? color : `${color}15`,
                              boxShadow: isActive ? `0 0 4px ${color}60` : "none",
                            }}
                          />
                        );
                      })}
                    </div>
                    <span className="text-xs text-[#00ff41]/30 w-16 text-right">
                      {ch === "L" ? "-6.2" : "-12.4"} dB
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---- 12. Back to Docs ---- */}
      <section className="relative px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <RevealBlock>
            <Link
              href="/styles/voice-recorder"
              className="inline-flex items-center gap-2 text-[#00ff41]/50 text-sm hover:text-[#00ff41] transition-colors duration-150"
            >
              <span>&larr;</span>
              <span className="uppercase tracking-[0.2em]">Back to Voice Recorder docs</span>
            </Link>
          </RevealBlock>
        </div>
      </section>
    </div>
  );
}
