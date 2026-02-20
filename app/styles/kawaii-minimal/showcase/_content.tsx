"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks & components – ZERO @/components/showcase imports     */
/* ------------------------------------------------------------------ */

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function RevealBlock({ children, className = "", delay = 0 }: {
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
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const features = [
  {
    title: "Habit Tracker",
    desc: "Track your daily routines with gentle visual feedback and pastel progress indicators.",
    gradient: "from-pink-200 to-purple-200",
  },
  {
    title: "Mood Journal",
    desc: "Record feelings with soft color coding and rounded emotion indicators.",
    gradient: "from-purple-200 to-cyan-200",
  },
  {
    title: "Wish List",
    desc: "Save your favourite things in a delightfully soft collection board.",
    gradient: "from-cyan-200 to-yellow-200",
  },
];

const statsData = [
  { label: "Happy Users", value: "8,400+", color: "#F9A8D4" },
  { label: "Daily Check-ins", value: "24k", color: "#A78BFA" },
  { label: "Habits Tracked", value: "156k", color: "#67E8F9" },
  { label: "Joy Score", value: "4.9", color: "#FDE68A" },
];

const palette = [
  { name: "Soft Pink", hex: "#F9A8D4" },
  { name: "Warm White", hex: "#FFF7ED" },
  { name: "Soft Purple", hex: "#A78BFA" },
  { name: "Soft Cyan", hex: "#67E8F9" },
  { name: "Soft Yellow", hex: "#FDE68A" },
  { name: "Text Dark", hex: "#1f2937" },
  { name: "Text Light", hex: "#6b7280" },
  { name: "Card White", hex: "#ffffff" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"button" | "card" | "input">("button");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF7ED] text-gray-800">
      <style>{`
        @keyframes kawaii-float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes kawaii-wiggle {
          0%,100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
        @keyframes kawaii-bounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .kawaii-spring { transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1); }
      `}</style>

      {/* ===== Fixed Nav ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFF7ED]/90 backdrop-blur-sm border-b border-pink-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
          <Link href="/styles/kawaii-minimal/showcase" className="text-lg font-bold tracking-tight text-gray-800">
            Kawaii<span className="text-pink-400">Minimal</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {["Features", "Components", "Palette", "Rules"].map((item) => (
              <span key={item} className="text-sm text-gray-400 hover:text-pink-400 cursor-pointer transition-colors duration-300">
                {item}
              </span>
            ))}
          </nav>
          <Link
            href="/styles/kawaii-minimal"
            className="px-5 py-2 bg-pink-300 text-white text-sm font-medium rounded-full shadow-[0_4px_0_#f472b6,0_8px_15px_rgba(244,114,182,0.25)] hover:shadow-[0_2px_0_#f472b6,0_4px_10px_rgba(244,114,182,0.25)] hover:translate-y-[2px] hover:scale-x-[1.03] hover:scale-y-[0.98] active:translate-y-[4px] active:shadow-[0_0_0_#f472b6] active:scale-[0.95] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          >
            Docs
          </Link>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="pt-28 md:pt-40 pb-20 px-6 md:px-12 max-w-6xl mx-auto relative overflow-hidden">
        {/* Floating decorative blobs */}
        <div
          className="absolute top-32 right-8 w-32 h-32 rounded-full bg-pink-200/40 hidden md:block pointer-events-none"
          style={{ animation: "kawaii-float 5s ease-in-out infinite", filter: "blur(40px)" }}
        />
        <div
          className="absolute top-64 left-4 w-24 h-24 rounded-full bg-purple-200/30 hidden md:block pointer-events-none"
          style={{ animation: "kawaii-float 6s ease-in-out infinite 1s", filter: "blur(30px)" }}
        />
        <div
          className="absolute bottom-20 right-24 w-20 h-20 rounded-full bg-cyan-200/30 hidden md:block pointer-events-none"
          style={{ animation: "kawaii-float 7s ease-in-out infinite 2s", filter: "blur(30px)" }}
        />

        <div className="text-center">
          <span
            className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-pink-400 mb-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.6s cubic-bezier(0.34,1.56,0.64,1)",
            }}
          >
            Kawaii Minimal
          </span>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight mb-6"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.1s",
            }}
          >
            Soft, sweet,
            <br />
            <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
              delightfully
            </span>
            <br />
            minimal.
          </h1>
          <p
            className="text-gray-500 max-w-lg mx-auto text-lg leading-relaxed mb-10 font-medium"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.3s",
            }}
          >
            Japanese kawaii culture meets Nordic minimalism. Pastel palettes, rounded shapes, and jelly-soft interactions.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.4s",
            }}
          >
            <button className="px-8 py-4 bg-pink-300 text-white rounded-full font-medium shadow-[0_8px_0_#f472b6,0_15px_20px_rgba(244,114,182,0.35)] hover:shadow-[0_6px_0_#f472b6,0_10px_15px_rgba(244,114,182,0.35)] hover:translate-y-[2px] hover:scale-x-[1.05] hover:scale-y-[0.97] active:translate-y-[8px] active:shadow-[0_0_0_#f472b6,0_0_0_rgba(244,114,182,0)] active:scale-[0.95] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
              Get Started
            </button>
            <button className="px-8 py-4 bg-white border-2 border-pink-200 text-pink-400 rounded-full font-medium hover:bg-pink-50 hover:border-pink-300 hover:scale-x-[1.04] hover:scale-y-[0.98] active:scale-[0.94] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
              Explore
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsData.map((s, i) => (
            <div
              key={s.label}
              className="bg-white rounded-3xl p-5 text-center shadow-[0_4px_20px_rgba(251,207,232,0.3)] border border-pink-50 kawaii-spring hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(244,114,182,0.2)] cursor-pointer"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.6s cubic-bezier(0.34,1.56,0.64,1) ${0.5 + i * 0.1}s`,
              }}
            >
              <div className="text-2xl md:text-3xl font-extrabold mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-gray-400 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Features ===== */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-purple-400 mb-3 block">Features</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Made with <span className="text-pink-400">gentle care</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <RevealBlock key={f.title} delay={i * 0.15}>
                <div className="group bg-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(251,207,232,0.4)] border-2 border-pink-100 hover:shadow-[0_20px_40px_rgba(244,114,182,0.3)] hover:-translate-y-3 hover:rotate-[1deg] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 group-hover:-rotate-[12deg] transition-transform duration-300 ease-out`}>
                    <span className="text-white text-lg font-bold">{f.title[0]}</span>
                  </div>
                  <h3 className="text-gray-800 text-xl font-bold mb-3 group-hover:text-pink-400 transition-colors duration-300">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{f.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Component Demos (tab-switched) ===== */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-purple-400 mb-3 block">Components</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Soft <span className="text-pink-400">building blocks</span>
            </h2>
          </RevealBlock>

          {/* Tabs */}
          <RevealBlock delay={0.1} className="mb-10">
            <div className="flex gap-3">
              {(["button", "card", "input"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium capitalize transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                    activeTab === tab
                      ? "bg-pink-300 text-white shadow-[0_4px_0_#f472b6] translate-y-0"
                      : "bg-white text-gray-500 border-2 border-pink-100 hover:border-pink-200 hover:bg-pink-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <div className="bg-white rounded-3xl p-8 md:p-12 border-2 border-pink-100 shadow-[0_10px_30px_rgba(251,207,232,0.3)]">
              {activeTab === "button" && (
                <div className="flex flex-wrap gap-6 items-center">
                  <button className="px-8 py-4 bg-pink-300 text-white rounded-full font-medium shadow-[0_8px_0_#f472b6,0_15px_20px_rgba(244,114,182,0.35)] hover:shadow-[0_6px_0_#f472b6,0_10px_15px_rgba(244,114,182,0.35)] hover:translate-y-[2px] hover:scale-x-[1.05] hover:scale-y-[0.97] active:translate-y-[8px] active:shadow-[0_0_0_#f472b6] active:scale-[0.95] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    Click Me
                  </button>
                  <button className="px-6 py-3 bg-white border-2 border-pink-200 text-pink-400 rounded-full font-medium hover:bg-pink-50 hover:border-pink-300 hover:scale-x-[1.04] hover:scale-y-[0.98] active:scale-[0.94] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    Explore
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-pink-300 to-purple-300 text-white rounded-full font-medium shadow-md hover:shadow-[0_12px_24px_rgba(244,114,182,0.28)] hover:-translate-y-1 hover:rotate-[1deg] active:scale-[0.93] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    Gradient
                  </button>
                  <button className="px-6 py-3 bg-purple-300 text-white rounded-full font-medium shadow-[0_6px_0_#a78bfa] hover:translate-y-[2px] hover:shadow-[0_4px_0_#a78bfa] active:translate-y-[6px] active:shadow-[0_0_0_#a78bfa] active:scale-[0.95] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    Purple
                  </button>
                  <button className="px-6 py-3 text-pink-400 font-medium rounded-full hover:bg-pink-50 active:scale-[0.94] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                    Ghost
                  </button>
                </div>
              )}
              {activeTab === "card" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "Sweet Feature", desc: "A delightful, marshmallow-soft experience designed with care.", gradient: "from-pink-200 to-purple-200", color: "pink" },
                    { title: "Cloud Storage", desc: "Keep your memories safe in fluffy cloud-based storage.", gradient: "from-purple-200 to-cyan-200", color: "purple" },
                    { title: "Daily Rewards", desc: "Collect cute stickers and badges for completing habits.", gradient: "from-cyan-200 to-yellow-200", color: "cyan" },
                    { title: "Friend Circle", desc: "Share progress with friends in a gentle, supportive space.", gradient: "from-yellow-200 to-pink-200", color: "yellow" },
                  ].map((c) => (
                    <div key={c.title} className="group bg-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(251,207,232,0.4)] border-2 border-pink-100 hover:shadow-[0_20px_40px_rgba(244,114,182,0.3)] hover:-translate-y-3 hover:rotate-[1deg] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center mb-5 shadow-inner group-hover:scale-110 group-hover:-rotate-[12deg] transition-transform duration-300`}>
                        <span className="text-white text-sm font-bold">{c.title[0]}</span>
                      </div>
                      <h4 className="text-gray-800 text-lg font-bold mb-2 group-hover:text-pink-400 transition-colors">{c.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed font-medium">{c.desc}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "input" && (
                <div className="max-w-md space-y-6">
                  <div className="space-y-2">
                    <label className="block text-gray-600 text-sm font-medium">Your Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white border-2 border-pink-200 rounded-2xl text-gray-700 placeholder:text-pink-300 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-200"
                      placeholder="Type here..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-gray-600 text-sm font-medium">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-white border-2 border-purple-200 rounded-2xl text-gray-700 placeholder:text-purple-300 focus:outline-none focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200"
                      placeholder="hello@kawaii.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-gray-600 text-sm font-medium">Message</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 bg-white border-2 border-cyan-200 rounded-2xl text-gray-700 placeholder:text-cyan-300 focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100 transition-all duration-200 resize-none"
                      placeholder="Say something sweet..."
                    />
                  </div>
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Decorative section: Habit Tracker demo ===== */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="text-center mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-cyan-400 mb-3 block">In Action</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Soft <span className="text-pink-400">in every detail</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_rgba(251,207,232,0.3)] border-2 border-pink-100">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Weekly Habits</h3>
              <div className="space-y-4">
                {[
                  { name: "Morning meditation", progress: 85, color: "bg-pink-300" },
                  { name: "Read 30 minutes", progress: 60, color: "bg-purple-300" },
                  { name: "Drink 8 glasses", progress: 100, color: "bg-cyan-300" },
                  { name: "Evening walk", progress: 40, color: "bg-yellow-300" },
                ].map((habit) => (
                  <div key={habit.name} className="group flex items-center gap-4 p-4 bg-[#FFF7ED] rounded-2xl hover:bg-pink-50 transition-colors duration-300 cursor-pointer">
                    <div className={`w-10 h-10 ${habit.color} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm group-hover:scale-110 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}>
                      {habit.progress}%
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800 mb-1">{habit.name}</div>
                      <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
                        <div className={`h-full ${habit.color} rounded-full transition-all duration-700`} style={{ width: `${habit.progress}%` }} />
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(7)].map((_, d) => (
                        <div
                          key={d}
                          className={`w-3 h-3 rounded-full ${d < Math.round(habit.progress / 15) ? habit.color : "bg-pink-100"} transition-colors`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Color Palette ===== */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-12">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-purple-400 mb-3 block">Palette</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Color <span className="text-pink-400">system</span>
            </h2>
          </RevealBlock>

          <RevealBlock delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {palette.map((c) => (
                <div key={c.name} className="group cursor-pointer">
                  <div
                    className="w-full aspect-[3/2] rounded-3xl mb-3 shadow-[0_4px_15px_rgba(251,207,232,0.3)] group-hover:scale-[1.05] group-hover:shadow-[0_10px_25px_rgba(244,114,182,0.2)] transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{ backgroundColor: c.hex, border: c.hex === "#ffffff" || c.hex === "#FFF7ED" ? "2px solid #fce7f3" : "none" }}
                  />
                  <div className="font-medium text-sm text-gray-800">{c.name}</div>
                  <div className="text-xs text-gray-400 uppercase">{c.hex}</div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== Design Rules ===== */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <RevealBlock className="mb-16">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-purple-400 mb-3 block">Guidelines</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Design <span className="text-pink-400">rules</span>
            </h2>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <RevealBlock>
              <div className="bg-white rounded-3xl p-8 border-2 border-green-100 shadow-[0_10px_30px_rgba(167,243,208,0.2)]">
                <h3 className="text-lg font-bold text-green-500 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Do
                </h3>
                <ul className="space-y-4">
                  {[
                    "Warm white background bg-[#FFF7ED]",
                    "Large rounded corners: rounded-2xl, 3xl, full",
                    "Soft shadows with pink/pastel tints",
                    "Pastel colors: pink-300, purple-300, cyan-200",
                    "Bounce interactions: hover:scale-105 active:scale-95",
                    "Generous spacing: p-6, p-8, gap-6",
                    "White cards with light pink borders",
                    "Jelly squash-and-stretch on hover",
                    "Spring easing: cubic-bezier(0.34,1.56,0.64,1)",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                      <span className="mt-1 w-2 h-2 rounded-full bg-green-400 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.15}>
              <div className="bg-white rounded-3xl p-8 border-2 border-red-100 shadow-[0_10px_30px_rgba(254,202,202,0.2)]">
                <h3 className="text-lg font-bold text-red-400 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Don&apos;t
                </h3>
                <ul className="space-y-4">
                  {[
                    "Dark or black backgrounds",
                    "Sharp corners: rounded-none, rounded-sm",
                    "Glow or neon effects",
                    "High saturation neon colors",
                    "Bold black borders",
                    "Dense, cluttered layouts",
                    "Stiff linear transitions",
                    "Heavy drop shadows",
                  ].map((rule) => (
                    <li key={rule} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                      <span className="mt-1 w-2 h-2 rounded-full bg-red-400 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-pink-100 bg-white/50">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">StyleKit</span>
              <span className="text-xs text-gray-300">Kawaii Minimal Showcase</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/styles/kawaii-minimal" className="text-sm text-gray-400 hover:text-pink-400 transition-colors duration-300">
                Documentation
              </Link>
              <Link href="/styles" className="text-sm text-gray-400 hover:text-pink-400 transition-colors duration-300">
                All Styles
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
