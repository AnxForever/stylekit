"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline useInView – IntersectionObserver, threshold 0.15           */
/* ------------------------------------------------------------------ */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/*  RevealBlock – cubic-bezier(0.16,1,0.3,1) + stagger               */
/* ------------------------------------------------------------------ */
function RevealBlock({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline SVG Icons                                                  */
/* ------------------------------------------------------------------ */
function LayersIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-9.75 5.25m0 0v6.75m5.571-9.75L21.75 12l-9.75 5.25L2.25 12" />
    </svg>
  );
}

function MountainIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 20l5.5-9.5L12 16l3.5-6L21 20H3z" />
    </svg>
  );
}

function WavesIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0M2 20c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    </svg>
  );
}

function ArrowDownIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  );
}

function ArrowLeftIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  );
}

function ChevronDownIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function CheckIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function XIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function EyeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function SparklesIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
    </svg>
  );
}

function InfoIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  );
}

function AlertTriangleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components: GlassCard, ParallaxLayer, GlassDivider            */
/* ------------------------------------------------------------------ */
function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-700 ease-out hover:bg-black/60 hover:border-white/30 hover:backdrop-blur-xl ${className}`}
    >
      {/* Glass glare layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function GlassDivider() {
  return (
    <div className="relative h-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Color palette data                                                */
/* ------------------------------------------------------------------ */
const COLORS = [
  { name: "Deep Blue",   hex: "#1e3a5f", light: false },
  { name: "Sky Blue",    hex: "#3b82f6", light: false },
  { name: "Light Blue",  hex: "#93c5fd", light: true  },
  { name: "Cyan",        hex: "#0ea5e9", light: false },
  { name: "Snow White",  hex: "#f8fafc", light: true  },
  { name: "Midnight",    hex: "#0c1d35", light: false },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                    */
/* ------------------------------------------------------------------ */
export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState("buttons");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  /* Hero entrance */
  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* Parallax scroll tracking for depth transforms */
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ---- Tab content ---- */
  const tabs: Record<string, { label: string; content: React.ReactNode }> = {
    buttons: {
      label: "Buttons",
      content: (
        <div className="space-y-8">
          <p className="text-white/70 text-lg font-light leading-relaxed">
            Parallax buttons use glassmorphism with backdrop-blur and transparent borders.
            The cinematic-slow hover (duration-500) keeps the immersive feel.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-10 py-4 bg-white/10 backdrop-blur-md text-white uppercase tracking-widest rounded-full font-medium border border-white/20 hover:bg-white/30 hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:bg-white/5 transition-all duration-500 ease-out">
              Glass Primary
            </button>
            <button className="px-10 py-4 bg-[#3b82f6] text-white rounded-full font-medium tracking-wide hover:bg-[#3b82f6]/80 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-500">
              Solid Accent
            </button>
            <button className="px-10 py-4 bg-transparent text-white rounded-full font-medium border-2 border-white/40 hover:bg-white/10 hover:border-white/70 transition-all duration-500">
              Outline
            </button>
            <button className="px-10 py-4 text-white/70 rounded-full font-medium hover:text-white hover:bg-white/5 transition-all duration-500">
              Ghost
            </button>
          </div>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-medium border border-white/20 hover:bg-white/20 transition-all duration-500">
              Small Glass
            </button>
            <button className="px-14 py-5 bg-white/10 backdrop-blur-md text-white rounded-full text-lg font-medium border border-white/20 hover:bg-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all duration-500">
              Large Glass
            </button>
            <button className="px-10 py-4 bg-gradient-to-r from-[#3b82f6] to-[#0ea5e9] text-white rounded-full font-medium hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500">
              Gradient
            </button>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-white/50 text-sm font-mono">
              transition-all duration-500 ease-out | backdrop-blur-md | hover:shadow-[0_0_30px_...]
            </p>
          </div>
        </div>
      ),
    },
    cards: {
      label: "Cards",
      content: (
        <div className="space-y-8">
          <p className="text-white/70 text-lg font-light leading-relaxed">
            Cards use translucent backgrounds with glass-glare overlays on hover.
            Foreground stays calm while the background depth keeps moving.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: LayersIcon, title: "Layered Depth", desc: "Multiple background planes create a three-dimensional feel as you scroll through each section." },
              { icon: MountainIcon, title: "Immersive Vista", desc: "Full-screen fixed backgrounds frame each content block like a panoramic window." },
              { icon: WavesIcon, title: "Fluid Motion", desc: "Gradient dividers and smooth transitions stitch sections into one continuous journey." },
              { icon: EyeIcon, title: "Visual Focus", desc: "Each section highlights a single message -- no clutter, just depth and purpose." },
            ].map((card, i) => (
              <GlassCard key={i} className="p-8 md:p-10">
                <div className="w-14 h-14 rounded-full bg-[#3b82f6]/20 flex items-center justify-center mb-5">
                  <card.icon className="w-7 h-7 text-[#93c5fd]" />
                </div>
                <h3 className="text-xl font-light text-white mb-3 tracking-wide group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] transition-all duration-500">
                  {card.title}
                </h3>
                <p className="text-white/60 leading-relaxed font-light group-hover:text-white/80 transition-colors duration-500">
                  {card.desc}
                </p>
              </GlassCard>
            ))}
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-white/50 text-sm font-mono">
              bg-black/40 backdrop-blur-md | group-hover:bg-black/60 | glass-glare overlay
            </p>
          </div>
        </div>
      ),
    },
    forms: {
      label: "Forms",
      content: (
        <div className="space-y-8">
          <p className="text-white/70 text-lg font-light leading-relaxed">
            Form inputs blend into the parallax atmosphere with frosted-glass styling
            and soft border focus transitions.
          </p>
          <div className="max-w-lg mx-auto space-y-6">
            <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-8 space-y-5">
              <div>
                <label className="block text-white/60 font-light text-sm mb-2 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm text-white placeholder-white/40 rounded-full border border-white/20 focus:border-white/60 focus:outline-none transition-colors duration-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-white/60 font-light text-sm mb-2 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm text-white placeholder-white/40 rounded-full border border-white/20 focus:border-white/60 focus:outline-none transition-colors duration-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-white/60 font-light text-sm mb-2 uppercase tracking-wider">Message</label>
                <textarea
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm text-white placeholder-white/40 rounded-2xl border border-white/20 focus:border-white/60 focus:outline-none transition-colors duration-500 h-28 resize-none"
                  placeholder="Your message..."
                />
              </div>
              <button className="w-full px-6 py-4 bg-white/10 backdrop-blur-md text-white uppercase tracking-widest rounded-full font-medium border border-white/20 hover:bg-white/30 hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-500">
                Send Message
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm text-white placeholder-white/40 rounded-full border border-white/20 focus:border-[#3b82f6] focus:outline-none transition-colors duration-500"
                  placeholder="Search layers..."
                />
              </div>
              <button className="px-8 py-4 bg-[#3b82f6] text-white rounded-full font-medium hover:bg-[#3b82f6]/80 transition-all duration-500">
                Search
              </button>
            </div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-white/50 text-sm font-mono">
              bg-white/10 backdrop-blur-sm | rounded-full | focus:border-white/60 | duration-500
            </p>
          </div>
        </div>
      ),
    },
    alerts: {
      label: "Alerts",
      content: (
        <div className="space-y-8">
          <p className="text-white/70 text-lg font-light leading-relaxed">
            Notifications stay unobtrusive within the immersive flow, using
            translucent tinted backgrounds and gentle icon accents.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-5 bg-[#3b82f6]/10 backdrop-blur-sm rounded-xl border border-[#3b82f6]/30">
              <InfoIcon className="w-5 h-5 text-[#93c5fd] mt-0.5 shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">Parallax Tip</p>
                <p className="text-white/70 text-sm">Use background-attachment: fixed on each full-screen section to create the depth illusion.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#22c55e]/10 backdrop-blur-sm rounded-xl border border-[#22c55e]/30">
              <CheckIcon className="w-5 h-5 text-[#22c55e] mt-0.5 shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">Performance Passed</p>
                <p className="text-white/70 text-sm">All parallax layers render within 16ms budget. Smooth 60fps scrolling achieved.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#fbbf24]/10 backdrop-blur-sm rounded-xl border border-[#fbbf24]/30">
              <AlertTriangleIcon className="w-5 h-5 text-[#fbbf24] mt-0.5 shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">Mobile Fallback</p>
                <p className="text-white/70 text-sm">iOS Safari does not support background-attachment: fixed. Gracefully degrade to scroll.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 bg-[#ef4444]/10 backdrop-blur-sm rounded-xl border border-[#ef4444]/30">
              <XIcon className="w-5 h-5 text-[#ef4444] mt-0.5 shrink-0" />
              <div>
                <p className="text-white font-medium mb-1">Layer Overload</p>
                <p className="text-white/70 text-sm">More than 4 parallax layers will cause jank on mid-range devices. Keep it simple.</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-white/50 text-sm font-mono">
              bg-[color]/10 backdrop-blur-sm | border-[color]/30 | translucent tinted glass
            </p>
          </div>
        </div>
      ),
    },
    dropdown: {
      label: "Dropdowns",
      content: (
        <div className="space-y-8">
          <p className="text-white/70 text-lg font-light leading-relaxed">
            Dropdowns maintain the immersive parallax atmosphere with frosted-glass panels
            and smooth cinematic transitions.
          </p>
          <div className="max-w-md mx-auto space-y-6">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen((p) => !p)}
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-md text-left rounded-full border border-white/20 flex items-center justify-between hover:border-white/40 transition-all duration-500"
              >
                <span className="text-white/80">Choose a section</span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-[#93c5fd] transition-transform duration-500 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl z-10 overflow-hidden">
                  {["Hero Section", "Feature Cards", "Testimonials", "Contact Form", "Gallery"].map((item) => (
                    <button
                      key={item}
                      className="w-full px-6 py-4 text-left text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 border-b border-white/5 last:border-b-0"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Fixed BG", "Sticky", "Fade", "Scroll"].map((opt) => (
                <button
                  key={opt}
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/15 text-white/70 hover:text-white hover:bg-white/20 hover:border-white/30 transition-all duration-500 text-center"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <p className="text-white/50 text-sm font-mono">
              bg-black/60 backdrop-blur-xl | rounded-2xl | duration-500 cinematic ease
            </p>
          </div>
        </div>
      ),
    },
  };

  return (
    <div className="min-h-screen bg-[#0c1d35]">
      <style>{`
        @keyframes parallax-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes parallax-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes parallax-drift {
          0% { transform: translateX(0) translateY(0); }
          33% { transform: translateX(8px) translateY(-6px); }
          66% { transform: translateX(-4px) translateY(4px); }
          100% { transform: translateX(0) translateY(0); }
        }
        @keyframes parallax-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes parallax-pulse-ring {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.6; }
          100% { transform: scale(1); opacity: 0.3; }
        }
      `}</style>

      {/* ============================================================ */}
      {/*  FIXED NAVIGATION                                            */}
      {/* ============================================================ */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[#0c1d35]/60 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/parallax-sections"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-500"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wider">Back</span>
          </Link>
          <span className="text-xl font-bold text-white tracking-widest uppercase flex items-center gap-3">
            <LayersIcon className="w-5 h-5 text-[#93c5fd]" />
            Parallax
          </span>
          <Link
            href="/styles"
            className="text-white/60 hover:text-white transition-colors duration-500 text-sm uppercase tracking-wider"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* ============================================================ */}
      {/*  HERO — full-screen with parallax depth layers               */}
      {/* ============================================================ */}
      <section className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
        {/* Background layer (moves slowest) */}
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center"
          style={{
            backgroundImage: "linear-gradient(135deg, #1e3a5f 0%, #3b82f6 40%, #0ea5e9 70%, #1e3a5f 100%)",
            transform: `translateY(${scrollY * 0.15}px)`,
          }}
        />
        {/* Midground gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 40%, transparent 30%, #0c1d35 80%)",
            transform: `translateY(${scrollY * 0.08}px)`,
          }}
        />
        {/* Floating orbs (midground decorative) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-64 h-64 rounded-full bg-[#3b82f6]/20 blur-3xl"
            style={{
              top: "15%",
              left: "10%",
              animation: "parallax-drift 12s ease-in-out infinite",
              transform: `translateY(${scrollY * 0.05}px)`,
            }}
          />
          <div
            className="absolute w-48 h-48 rounded-full bg-[#0ea5e9]/20 blur-3xl"
            style={{
              top: "60%",
              right: "15%",
              animation: "parallax-drift 15s ease-in-out infinite reverse",
              transform: `translateY(${scrollY * 0.03}px)`,
            }}
          />
          <div
            className="absolute w-32 h-32 rounded-full bg-[#93c5fd]/15 blur-2xl"
            style={{
              bottom: "25%",
              left: "55%",
              animation: "parallax-float 8s ease-in-out infinite",
            }}
          />
        </div>
        {/* Dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1d35]/60 via-transparent to-[#0c1d35]" />

        {/* Foreground content */}
        <div
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div
            className="w-20 h-20 mx-auto mb-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center"
            style={{ animation: "parallax-pulse-ring 4s ease-in-out infinite" }}
          >
            <MountainIcon className="w-10 h-10 text-[#93c5fd]" />
          </div>
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight leading-none">
            Parallax
            <br />
            <span className="text-[#93c5fd]">Sections</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/60 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Immersive scroll experiences where background and foreground move at different speeds,
            creating a sense of three-dimensional depth.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-10 py-4 bg-white/10 backdrop-blur-md text-white uppercase tracking-widest rounded-full font-medium border border-white/20 hover:bg-white/30 hover:border-white/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:bg-white/5 transition-all duration-500 ease-out">
              Explore Story
            </button>
            <button className="px-10 py-4 bg-white text-[#1e3a5f] rounded-full font-medium uppercase tracking-widest hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-500">
              Learn More
            </button>
          </div>
          <div className="mt-16" style={{ animation: "parallax-float 3s ease-in-out infinite" }}>
            <ArrowDownIcon className="w-8 h-8 text-white/40 mx-auto" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  INTERLUDE — parallax fixed-bg section                       */}
      {/* ============================================================ */}
      <section
        className="relative min-h-[60vh] bg-fixed bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: "linear-gradient(180deg, #0ea5e9 0%, #1e3a5f 100%)" }}
      >
        <div className="absolute inset-0 bg-[#0c1d35]/50" />
        <RevealBlock className="relative z-10 text-center px-6">
          <WavesIcon className="w-14 h-14 mx-auto mb-6 text-[#93c5fd]/80" />
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Depth in Motion
          </h2>
          <p className="text-xl text-white/60 max-w-xl mx-auto font-light">
            Fixed backgrounds create a sense of depth as content flows over them,
            like looking through stacked panes of glass.
          </p>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/*  FEATURE CARDS SECTION                                       */}
      {/* ============================================================ */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Background parallax layer */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(circle at 30% 50%, #3b82f6 0%, transparent 60%), radial-gradient(circle at 70% 50%, #0ea5e9 0%, transparent 60%)",
            transform: `translateY(${scrollY * -0.05}px)`,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Parallax Techniques
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
              Three approaches to creating immersive scrolling experiences with distinct depth layers.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: LayersIcon,
                title: "Fixed Backgrounds",
                desc: "Set background-attachment: fixed on full-screen sections. Content scrolls over stationary images, creating the classic parallax illusion of depth.",
                accent: "#3b82f6",
              },
              {
                icon: MountainIcon,
                title: "Transform on Scroll",
                desc: "Track scroll position with useEffect and apply CSS transforms at different rates to foreground, midground, and background layers for smooth differential movement.",
                accent: "#0ea5e9",
              },
              {
                icon: SparklesIcon,
                title: "Glass Layering",
                desc: "Stack translucent backdrop-blur panels at varying z-indices. Hover reveals glass-glare overlays that simulate light refracting through depth layers.",
                accent: "#93c5fd",
              },
            ].map((card, i) => (
              <RevealBlock key={i} delay={i * 0.15}>
                <GlassCard className="p-10 h-full">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${card.accent}20` }}
                  >
                    <span style={{ color: card.accent }}><card.icon className="w-8 h-8" /></span>
                  </div>
                  <h3 className="text-2xl font-light text-white mb-4 tracking-wide group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] transition-all duration-500">
                    {card.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed font-light group-hover:text-white/80 transition-colors duration-500">
                    {card.desc}
                  </p>
                </GlassCard>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TAB-SWITCHED COMPONENT DEMOS                                */}
      {/* ============================================================ */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Subtle parallax BG */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #0c1d35 0%, #1e3a5f 50%, #0c1d35 100%)",
            transform: `translateY(${scrollY * -0.03}px)`,
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Component Gallery
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
              Every element inherits the parallax atmosphere -- frosted glass, soft glow, cinematic pacing.
            </p>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            {/* Tab bar */}
            <div className="flex flex-wrap gap-1 p-1.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-10">
              {Object.entries(tabs).map(([key, tab]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex-1 min-w-[100px] px-5 py-3 rounded-full text-sm font-medium uppercase tracking-wider transition-all duration-500 ${
                    activeTab === key
                      ? "bg-white/15 text-white backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                      : "text-white/50 hover:text-white/80 hover:bg-white/5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-8 md:p-12">
              {tabs[activeTab].content}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  PARALLAX DEPTH DEMO — interactive scroll layers             */}
      {/* ============================================================ */}
      <section
        className="relative min-h-[80vh] bg-fixed bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: "linear-gradient(135deg, #3b82f6 0%, #0ea5e9 50%, #1e3a5f 100%)" }}
      >
        <div className="absolute inset-0 bg-[#0c1d35]/40" />
        {/* Decorative depth rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[500px] h-[500px] rounded-full border border-white/10"
            style={{
              animation: "parallax-pulse-ring 6s ease-in-out infinite",
              transform: `translateY(${scrollY * -0.02}px)`,
            }}
          />
          <div
            className="absolute w-[350px] h-[350px] rounded-full border border-white/15"
            style={{
              animation: "parallax-pulse-ring 5s ease-in-out infinite 0.5s",
              transform: `translateY(${scrollY * -0.04}px)`,
            }}
          />
          <div
            className="absolute w-[200px] h-[200px] rounded-full border border-white/20"
            style={{
              animation: "parallax-pulse-ring 4s ease-in-out infinite 1s",
              transform: `translateY(${scrollY * -0.06}px)`,
            }}
          />
        </div>
        <RevealBlock className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <SparklesIcon className="w-14 h-14 mx-auto mb-6 text-[#93c5fd]/80" />
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Layers of Reality
          </h2>
          <p className="text-xl text-white/60 max-w-xl mx-auto font-light mb-10">
            Three concentric rings pulse at different rates and move at different scroll speeds --
            demonstrating true parallax depth separation.
          </p>
          <div className="flex gap-6 justify-center text-sm uppercase tracking-widest text-white/50">
            <span>Background: 0.02x</span>
            <span className="text-white/20">|</span>
            <span>Midground: 0.04x</span>
            <span className="text-white/20">|</span>
            <span>Foreground: 0.06x</span>
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/*  COLOR PALETTE                                               */}
      {/* ============================================================ */}
      <section className="py-32 px-6 bg-[#0c1d35]">
        <div className="max-w-7xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Color Palette
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
              Deep blues and ethereal cyans create the atmospheric depth that defines the parallax experience.
            </p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {COLORS.map((color, i) => (
              <RevealBlock key={color.hex} delay={i * 0.08}>
                <div className="group rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500">
                  <div
                    className="h-28 flex items-end p-4 relative overflow-hidden"
                    style={{ backgroundColor: color.hex }}
                  >
                    {/* Glass glare on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <span className={`relative z-10 text-sm font-medium ${color.light ? "text-[#1e3a5f]" : "text-white"}`}>
                      {color.name}
                    </span>
                  </div>
                  <div className="bg-black/60 backdrop-blur-sm p-3 text-center">
                    <span className="font-mono text-sm text-white/60 group-hover:text-white/90 transition-colors duration-500">
                      {color.hex}
                    </span>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Extended palette info */}
          <RevealBlock delay={0.3} className="mt-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-10">
              <h3 className="text-lg font-medium text-white mb-6 uppercase tracking-wider">Usage Guidelines</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="w-8 h-2 rounded-full bg-[#1e3a5f] mb-3" />
                  <p className="text-white/70 text-sm font-light leading-relaxed">
                    <span className="text-white font-medium">Deep Blue (#1e3a5f)</span> -- Primary background for fixed parallax layers.
                    Pairs with white text at full contrast.
                  </p>
                </div>
                <div>
                  <div className="w-8 h-2 rounded-full bg-[#3b82f6] mb-3" />
                  <p className="text-white/70 text-sm font-light leading-relaxed">
                    <span className="text-white font-medium">Sky Blue (#3b82f6)</span> -- Accent color for interactive elements.
                    Used in gradient transitions between sections.
                  </p>
                </div>
                <div>
                  <div className="w-8 h-2 rounded-full bg-[#93c5fd] mb-3" />
                  <p className="text-white/70 text-sm font-light leading-relaxed">
                    <span className="text-white font-medium">Light Blue (#93c5fd)</span> -- Glow highlights and icon tints.
                    Provides the ethereal, atmospheric quality.
                  </p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  TYPOGRAPHY SPECIMEN                                         */}
      {/* ============================================================ */}
      <section
        className="relative py-32 px-6 overflow-hidden"
        style={{ background: "linear-gradient(180deg, #0c1d35 0%, #1e3a5f 50%, #0c1d35 100%)" }}
      >
        <div className="max-w-5xl mx-auto relative z-10">
          <RevealBlock className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Typography
            </h2>
            <p className="text-xl text-white/50 font-light">
              Clean sans-serif type with generous tracking for an open, atmospheric feel.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            <RevealBlock>
              <GlassCard className="p-10">
                <p className="text-white/40 text-sm uppercase tracking-widest mb-4">Heading Scale</p>
                <div className="space-y-4">
                  <p className="text-5xl font-bold text-white tracking-tight">Aa</p>
                  <p className="text-3xl font-bold text-white/90">Immersive Depth</p>
                  <p className="text-xl font-light text-white/70">Section Subtitle</p>
                  <p className="text-base text-white/50 font-light">Body text with generous leading for readability against dark backgrounds.</p>
                </div>
              </GlassCard>
            </RevealBlock>
            <RevealBlock delay={0.15}>
              <GlassCard className="p-10">
                <p className="text-white/40 text-sm uppercase tracking-widest mb-4">Tracking & Weight</p>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-[#93c5fd]/60 uppercase tracking-wider mb-1">tracking-widest / uppercase</p>
                    <p className="text-lg text-white uppercase tracking-widest font-medium">Navigate Layers</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#93c5fd]/60 uppercase tracking-wider mb-1">tracking-tight / bold</p>
                    <p className="text-3xl text-white font-bold tracking-tight">Deep Blue</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#93c5fd]/60 uppercase tracking-wider mb-1">font-light / relaxed</p>
                    <p className="text-lg text-white/60 font-light leading-relaxed">
                      Light weight and relaxed leading let text breathe against the dark atmospheric canvas.
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#93c5fd]/60 uppercase tracking-wider mb-1">font-mono / sm</p>
                    <p className="text-sm text-white/40 font-mono">backdrop-blur-md | duration-500</p>
                  </div>
                </div>
              </GlassCard>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  DESIGN RULES                                                */}
      {/* ============================================================ */}
      <section className="py-32 px-6 bg-[#0c1d35]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Design Rules
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
              Principles for crafting immersive parallax experiences that feel cinematic without causing discomfort.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            <RevealBlock>
              <div className="bg-[#22c55e]/5 backdrop-blur-sm rounded-2xl p-8 border border-[#22c55e]/20">
                <h3 className="text-xl font-medium text-[#22c55e] mb-6 flex items-center gap-3 uppercase tracking-wider">
                  <CheckIcon className="w-5 h-5" /> Embrace
                </h3>
                <ul className="space-y-4">
                  {[
                    "Full-screen sections with min-h-screen for rhythmic pacing",
                    "Fixed background attachment (bg-fixed) for depth illusion",
                    "Gradient dividers to stitch parallax sections together",
                    "Glassmorphism: bg-white/10 + backdrop-blur-md + border-white/20",
                    "Cinematic duration-500 to 700ms transitions",
                    "Glass-glare overlays on hover for light-refraction feel",
                    "Translate depth with scroll-linked transforms at different rates",
                    "Soft radial glows and blur-3xl orbs for atmosphere",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-white/70 font-light leading-relaxed">
                      <CheckIcon className="w-4 h-4 text-[#22c55e] mt-1 shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.15}>
              <div className="bg-[#ef4444]/5 backdrop-blur-sm rounded-2xl p-8 border border-[#ef4444]/20">
                <h3 className="text-xl font-medium text-[#ef4444] mb-6 flex items-center gap-3 uppercase tracking-wider">
                  <XIcon className="w-5 h-5" /> Avoid
                </h3>
                <ul className="space-y-4">
                  {[
                    "Scrolling backgrounds on mobile (iOS Safari does not support bg-fixed)",
                    "More than 3-4 parallax layers (causes jank on mid-range devices)",
                    "Inconsistent section heights breaking the visual rhythm",
                    "Low contrast between background images and overlay text",
                    "Heavy per-section animations that compete with scroll motion",
                    "Large Y-axis card hover displacements (background already moves)",
                    "Short, abrupt transitions (break the cinematic narrative)",
                    "Dense content layouts that dilute the one-message-per-section focus",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-white/70 font-light leading-relaxed">
                      <XIcon className="w-4 h-4 text-[#ef4444] mt-1 shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  INTERACTION SHOWCASE — scroll speed comparison               */}
      {/* ============================================================ */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #1e3a5f 0%, #3b82f6 100%)",
            transform: `translateY(${scrollY * -0.04}px)`,
          }}
        />
        <div className="absolute inset-0 bg-[#0c1d35]/30" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Scroll Speed Tiers
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
              Each depth tier responds to scroll at a different rate, creating the parallax separation.
            </p>
          </RevealBlock>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tier: "Background",
                speed: "0.15x",
                desc: "Moves slowest. Fixed gradients and large blurred orbs. Creates the deep canvas.",
                color: "#1e3a5f",
                multiplier: 0.15,
              },
              {
                tier: "Midground",
                speed: "0.08x",
                desc: "Decorative elements, rings, and gradient overlays. Bridges foreground and background.",
                color: "#3b82f6",
                multiplier: 0.08,
              },
              {
                tier: "Foreground",
                speed: "1x (normal)",
                desc: "Content cards, text, and interactive elements. Scrolls naturally with the user.",
                color: "#93c5fd",
                multiplier: 1,
              },
            ].map((item, i) => (
              <RevealBlock key={i} delay={i * 0.15}>
                <div className="group relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-8 hover:bg-black/60 hover:border-white/30 transition-all duration-700 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <div className="relative z-10">
                    <div
                      className="w-4 h-4 rounded-full mb-4"
                      style={{ backgroundColor: item.color, boxShadow: `0 0 20px ${item.color}60` }}
                    />
                    <h3 className="text-2xl font-light text-white mb-1">{item.tier}</h3>
                    <p className="text-[#93c5fd] font-mono text-sm mb-4">{item.speed}</p>
                    <p className="text-white/60 font-light leading-relaxed group-hover:text-white/80 transition-colors duration-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>

          {/* Live scroll indicator */}
          <RevealBlock delay={0.5} className="mt-12">
            <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Current Scroll Position</p>
                <p className="text-3xl font-mono text-white">{Math.round(scrollY)}px</p>
              </div>
              <div className="flex gap-8">
                <div className="text-center">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">BG Offset</p>
                  <p className="text-lg font-mono text-[#1e3a5f]">{(scrollY * 0.15).toFixed(1)}px</p>
                </div>
                <div className="text-center">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">MG Offset</p>
                  <p className="text-lg font-mono text-[#3b82f6]">{(scrollY * 0.08).toFixed(1)}px</p>
                </div>
                <div className="text-center">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">FG Offset</p>
                  <p className="text-lg font-mono text-[#93c5fd]">{scrollY.toFixed(1)}px</p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FOOTER                                                      */}
      {/* ============================================================ */}
      <footer className="relative py-20 px-6 bg-[#0c1d35] border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <RevealBlock>
            <div
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
              style={{ animation: "parallax-pulse-ring 5s ease-in-out infinite" }}
            >
              <LayersIcon className="w-8 h-8 text-[#93c5fd]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
              Parallax Sections
            </h3>
            <p className="text-white/40 font-light mb-8 max-w-md mx-auto">
              Immersive depth through differential scroll speeds.
              Every section a window into another layer.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <Link
                href="/styles/parallax-sections"
                className="text-white/50 hover:text-white uppercase tracking-wider transition-colors duration-500"
              >
                Overview
              </Link>
              <span className="text-white/20">|</span>
              <Link
                href="/styles"
                className="text-white/50 hover:text-white uppercase tracking-wider transition-colors duration-500"
              >
                All Styles
              </Link>
              <span className="text-white/20">|</span>
              <Link
                href="/"
                className="text-[#93c5fd]/70 hover:text-[#93c5fd] uppercase tracking-wider transition-colors duration-500"
              >
                StyleKit
              </Link>
            </div>
          </RevealBlock>
        </div>
      </footer>
    </div>
  );
}
