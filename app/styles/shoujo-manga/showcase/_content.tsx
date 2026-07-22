"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"

/* ------------------------------------------------------------------ */
/*  Inline hooks & helpers — ZERO @/components/showcase imports        */
/* ------------------------------------------------------------------ */

function useInView(options = { threshold: 0.15 }) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, options)
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return { ref, inView }
}

function RevealBlock({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s` }}>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  SVG primitives                                                     */
/* ------------------------------------------------------------------ */

function Sparkle({ size = 20, color = "#fde68a", style = {} }: { size?: number; color?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={style}>
      <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z" fill={color} />
    </svg>
  )
}

function SmallSparkle({ size = 12, color = "#fde68a", style = {} }: { size?: number; color?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" style={style}>
      <path d="M6 0 L6.9 5.1 L12 6 L6.9 6.9 L6 12 L5.1 6.9 L0 6 L5.1 5.1 Z" fill={color} />
    </svg>
  )
}

function FlowerSVG({ size = 24, color = "#ffb7c5", style = {} }: { size?: number; color?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={style}>
      <ellipse cx="16" cy="8" rx="4" ry="7" fill={color} opacity="0.9" />
      <ellipse cx="16" cy="24" rx="4" ry="7" fill={color} opacity="0.9" />
      <ellipse cx="8" cy="16" rx="7" ry="4" fill={color} opacity="0.9" />
      <ellipse cx="24" cy="16" rx="7" ry="4" fill={color} opacity="0.9" />
      <ellipse cx="9.9" cy="9.9" rx="4" ry="7" fill={color} opacity="0.75" transform="rotate(-45 9.9 9.9)" />
      <ellipse cx="22.1" cy="22.1" rx="4" ry="7" fill={color} opacity="0.75" transform="rotate(-45 22.1 22.1)" />
      <ellipse cx="22.1" cy="9.9" rx="4" ry="7" fill={color} opacity="0.75" transform="rotate(45 22.1 9.9)" />
      <ellipse cx="9.9" cy="22.1" rx="4" ry="7" fill={color} opacity="0.75" transform="rotate(45 9.9 22.1)" />
      <circle cx="16" cy="16" r="5" fill="#fde68a" />
    </svg>
  )
}

function SakuraPetal({ size = 28, color = "#fecdd3", rotate = 0, style = {} }: { size?: number; color?: string; rotate?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" style={{ transform: `rotate(${rotate}deg)`, ...style }}>
      <ellipse cx="14" cy="14" rx="7" ry="13" fill={color} opacity="0.85" rx-override="7" />
      <ellipse cx="14" cy="14" rx="4" ry="11" fill="white" opacity="0.3" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false)
  const [activeChapter, setActiveChapter] = useState(0)
  const [activeComponent, setActiveComponent] = useState<"buttons" | "cards" | "inputs">("buttons")
  const [likedPanels, setLikedPanels] = useState<Set<string>>(new Set())

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const toggleLike = (id: string) => {
    setLikedPanels(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  const chapters = [
    {
      label: "Chapter 1",
      subtitle: "出会い — First Meeting",
      panels: [
        { id: "c1p1", span: "col-span-2 row-span-2", bg: "#ffe4ec", label: "The moment our eyes met", size: "text-sm" },
        { id: "c1p2", span: "col-span-1 row-span-1", bg: "#f3e8ff", label: "Heartbeat", size: "text-xs" },
        { id: "c1p3", span: "col-span-1 row-span-1", bg: "#fde68a22", label: "Sparkle", size: "text-xs" },
        { id: "c1p4", span: "col-span-1 row-span-2", bg: "#fecdd3", label: "Under the sakura tree...", size: "text-xs" },
        { id: "c1p5", span: "col-span-2 row-span-1", bg: "#e9d5ff", label: "To be continued", size: "text-xs" },
      ],
    },
    {
      label: "Chapter 2",
      subtitle: "恋心 — Falling in Love",
      panels: [
        { id: "c2p1", span: "col-span-1 row-span-2", bg: "#fce7f3", label: "She noticed him first", size: "text-xs" },
        { id: "c2p2", span: "col-span-2 row-span-1", bg: "#ddd6fe", label: "Words left unspoken", size: "text-sm" },
        { id: "c2p3", span: "col-span-1 row-span-1", bg: "#fde68a33", label: "Stars align", size: "text-xs" },
        { id: "c2p4", span: "col-span-1 row-span-1", bg: "#fbcfe8", label: "Blush", size: "text-xs" },
        { id: "c2p5", span: "col-span-2 row-span-2", bg: "#ede9fe", label: "A dream wrapped in petals", size: "text-sm" },
      ],
    },
    {
      label: "Chapter 3",
      subtitle: "告白 — Confession",
      panels: [
        { id: "c3p1", span: "col-span-3 row-span-1", bg: "#fce7f3", label: "The courage to say those words", size: "text-sm" },
        { id: "c3p2", span: "col-span-1 row-span-2", bg: "#c4b5fd44", label: "Trembling hands", size: "text-xs" },
        { id: "c3p3", span: "col-span-2 row-span-2", bg: "#ffb7c522", label: "\"I... like you.\"", size: "text-base" },
        { id: "c3p4", span: "col-span-1 row-span-1", bg: "#fde68a22", label: "Sparkle burst!", size: "text-xs" },
        { id: "c3p5", span: "col-span-2 row-span-1", bg: "#fecdd3", label: "Happy ending awaits", size: "text-xs" },
      ],
    },
  ]

  const palette = [
    { name: "Sakura Pink", hex: "#ffb7c5", role: "Primary" },
    { name: "Pearl White", hex: "#fff5f7", role: "Background" },
    { name: "Soft Purple", hex: "#c4b5fd", role: "Accent" },
    { name: "Sparkle Gold", hex: "#fde68a", role: "Highlight" },
    { name: "Blush Pink", hex: "#fecdd3", role: "Secondary" },
  ]

  const screentones = [
    {
      name: "Fine Dots",
      pattern: "radial-gradient(circle, #ffb7c5 1px, transparent 1px)",
      size: "8px 8px",
      opacity: 0.35,
      mood: "Soft, delicate — used for blush and background fill",
    },
    {
      name: "Coarse Dots",
      pattern: "radial-gradient(circle, #c4b5fd 1.5px, transparent 1.5px)",
      size: "12px 12px",
      opacity: 0.4,
      mood: "Dreamy, airy — used for shadow tones and depth",
    },
    {
      name: "Crosshatch",
      pattern: "repeating-linear-gradient(45deg, #fecdd3 0, #fecdd3 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, #fecdd3 0, #fecdd3 1px, transparent 0, transparent 50%)",
      size: "8px 8px",
      opacity: 0.3,
      mood: "Vintage, textured — used for dramatic mood scenes",
    },
  ]

  const kanjiWords = [
    { kanji: "愛", reading: "Ai", meaning: "Love" },
    { kanji: "恋", reading: "Koi", meaning: "Romance" },
    { kanji: "夢", reading: "Yume", meaning: "Dream" },
  ]

  return (
    <div className="min-h-screen text-gray-700" style={{ backgroundColor: "#fff5f7", fontFamily: "'Georgia', serif" }}>
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes shoujo-float {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(5deg); }
          66% { transform: translateY(-5px) rotate(-3deg); }
        }
        @keyframes shoujo-spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes shoujo-pulse-glow {
          0%,100% { filter: drop-shadow(0 0 4px #fde68a88); }
          50% { filter: drop-shadow(0 0 12px #fde68acc); }
        }
        @keyframes shoujo-heartbeat {
          0%,100% { transform: scale(1); }
          20% { transform: scale(1.2); }
          40% { transform: scale(0.95); }
          60% { transform: scale(1.1); }
        }
        @keyframes shoujo-petal-fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(60px) rotate(360deg); opacity: 0; }
        }
        .float-slow { animation: shoujo-float 5s ease-in-out infinite; }
        .float-mid  { animation: shoujo-float 4s ease-in-out infinite 0.8s; }
        .float-fast { animation: shoujo-float 3.2s ease-in-out infinite 1.5s; }
        .spin-slow  { animation: shoujo-spin-slow 8s linear infinite; }
        .pulse-glow { animation: shoujo-pulse-glow 2s ease-in-out infinite; }
        .heartbeat  { animation: shoujo-heartbeat 1.2s ease-in-out infinite; }
        .petal-fall { animation: shoujo-petal-fall 4s ease-in infinite; }
        .ribbon-btn {
          clip-path: polygon(8px 0%, calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 8px 100%, 0% 50%);
        }
        .ribbon-tab {
          clip-path: polygon(0% 0%, calc(100% - 14px) 0%, 100% 50%, calc(100% - 14px) 100%, 0% 100%);
        }
        .scallop-top {
          mask-image: radial-gradient(circle at 50% 100%, transparent 10px, black 10px);
          -webkit-mask-image: radial-gradient(ellipse 12px 12px at 6px 0px, transparent 12px, black 12px);
        }
      `}</style>

      {/* ===== NAV ===== */}
      <header style={{ backgroundColor: "#fff5f7", borderBottom: "2px solid #ffb7c5", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <FlowerSVG size={28} color="#ffb7c5" />
            <span style={{ fontSize: 18, fontWeight: 700, color: "#e879a0", letterSpacing: 1 }}>少女漫画風</span>
            <FlowerSVG size={20} color="#c4b5fd" />
          </Link>

          {/* Nav links */}
          <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {["Chapter", "Palette", "Components", "Screentone", "Typography"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ fontSize: 13, color: "#b06080", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#e879a0")}
                onMouseLeave={e => (e.currentTarget.style.color = "#b06080")}>
                {item}
              </a>
            ))}
          </nav>

          {/* Corner sparkles */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Sparkle size={16} color="#fde68a" style={{ animation: "shoujo-pulse-glow 2s ease-in-out infinite" }} />
            <SmallSparkle size={10} color="#c4b5fd" style={{ animation: "shoujo-pulse-glow 2s ease-in-out infinite 0.5s" }} />
            <Sparkle size={14} color="#ffb7c5" style={{ animation: "shoujo-pulse-glow 2s ease-in-out infinite 1s" }} />
          </div>
        </div>

        {/* Scalloped border bottom via repeating radial-gradient */}
        <div style={{
          height: 8,
          background: "radial-gradient(circle at 8px -4px, #fff5f7 8px, #ffb7c5 8px)",
          backgroundSize: "16px 8px",
        }} />
      </header>

      {/* ===== HERO ===== */}
      <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "80px 24px" }}>
        {/* Screentone dot background */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, #ffb7c5 1px, transparent 1px)",
          backgroundSize: "8px 8px",
          opacity: 0.18,
        }} />

        {/* Floating sakura petals */}
        {[0, 72, 144, 216, 288].map((rot, i) => (
          <div key={i} className={i % 2 === 0 ? "float-slow" : "float-mid"} style={{
            position: "absolute",
            left: `${10 + i * 18}%`,
            top: `${15 + (i % 3) * 20}%`,
            pointerEvents: "none",
          }}>
            <SakuraPetal size={32 + i * 4} color="#fecdd3" rotate={rot} />
          </div>
        ))}
        {[45, 135, 225, 315].map((rot, i) => (
          <div key={i} className="float-fast" style={{
            position: "absolute",
            right: `${8 + i * 15}%`,
            top: `${10 + i * 18}%`,
            pointerEvents: "none",
          }}>
            <SakuraPetal size={24 + i * 3} color="#ffb7c5" rotate={rot} />
          </div>
        ))}

        {/* Corner flower decorations */}
        <div style={{ position: "absolute", top: 32, left: 32 }} className="float-slow">
          <FlowerSVG size={56} color="#ffb7c5" />
        </div>
        <div style={{ position: "absolute", top: 32, right: 32 }} className="float-mid">
          <FlowerSVG size={44} color="#c4b5fd" />
        </div>
        <div style={{ position: "absolute", bottom: 48, left: 48 }} className="float-fast">
          <FlowerSVG size={40} color="#fecdd3" />
        </div>
        <div style={{ position: "absolute", bottom: 48, right: 48 }} className="float-slow">
          <FlowerSVG size={52} color="#ffb7c5" />
        </div>

        {/* Sparkle scatters */}
        {[
          { top: "20%", left: "20%", size: 24, color: "#fde68a", delay: 0 },
          { top: "35%", right: "18%", size: 18, color: "#fde68a", delay: 0.6 },
          { top: "65%", left: "15%", size: 14, color: "#fde68a", delay: 1.2 },
          { top: "55%", right: "12%", size: 20, color: "#c4b5fd", delay: 0.3 },
          { top: "78%", left: "40%", size: 16, color: "#fde68a", delay: 0.9 },
          { top: "25%", right: "35%", size: 12, color: "#ffb7c5", delay: 1.5 },
        ].map((s, i) => (
          <div key={i} className="pulse-glow" style={{ position: "absolute", ...s, pointerEvents: "none", animationDelay: `${s.delay}s` }}>
            <Sparkle size={s.size} color={s.color} />
          </div>
        ))}

        {/* Hero content */}
        <div style={{ textAlign: "center", maxWidth: 680, position: "relative", zIndex: 1 }}>
          <div style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
          }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 20 }}>
              <SmallSparkle size={14} color="#fde68a" />
              <span style={{ fontSize: 13, color: "#b06080", letterSpacing: 4, textTransform: "uppercase" }}>shoujo manga style</span>
              <SmallSparkle size={14} color="#fde68a" />
            </div>

            <h1 style={{
              fontSize: "clamp(48px, 8vw, 88px)",
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: 16,
              background: "linear-gradient(135deg, #e879a0 0%, #a855f7 50%, #e879a0 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Shoujo Manga
            </h1>

            <p style={{
              fontSize: 26,
              fontStyle: "italic",
              color: "#c4b5fd",
              marginBottom: 12,
              fontWeight: 600,
              letterSpacing: 2,
            }}>
              浪漫な物語
            </p>
            <p style={{ fontSize: 15, color: "#b06080", marginBottom: 36, lineHeight: 1.7, fontStyle: "italic" }}>
              Romantic Story — where every heartbeat blooms into petals and every glance becomes a sparkle
            </p>

            {/* CTA button with ribbon tail effect */}
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <button
                className="ribbon-btn"
                style={{
                  padding: "14px 40px",
                  background: "linear-gradient(135deg, #ffb7c5, #e879a0)",
                  color: "white",
                  border: "none",
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: "pointer",
                  letterSpacing: 1,
                  boxShadow: "0 6px 20px rgba(232,121,160,0.4)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(232,121,160,0.5)" }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(232,121,160,0.4)" }}
              >
                Begin the Story
              </button>
              <button
                style={{
                  padding: "14px 32px",
                  background: "white",
                  color: "#e879a0",
                  border: "2px solid #ffb7c5",
                  borderRadius: 9999,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#fff5f7"; e.currentTarget.style.borderColor = "#e879a0" }}
                onMouseLeave={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#ffb7c5" }}
              >
                Explore Palette
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CHAPTER PAGES — Manga Panel Grid ===== */}
      <section id="chapter" className="scroll-mt-16" style={{ padding: "80px 24px", backgroundColor: "#fce7f3" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <RevealBlock className="" delay={0}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 12 }}>
                <Sparkle size={16} color="#fde68a" />
                <span style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#b06080" }}>manga panels</span>
                <Sparkle size={16} color="#fde68a" />
              </div>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: "#e879a0", marginBottom: 8 }}>Chapter Pages</h2>
              <p style={{ fontSize: 14, color: "#b06080", fontStyle: "italic" }}>An asymmetric manga grid — each panel tells a fragment of the story</p>
            </div>
          </RevealBlock>

          {/* Chapter tab switcher — ribbon shape */}
          <RevealBlock delay={0.1}>
            <div style={{ display: "flex", gap: 4, marginBottom: 24, flexWrap: "wrap" }}>
              {chapters.map((ch, i) => (
                <button
                  key={i}
                  className="ribbon-tab"
                  onClick={() => setActiveChapter(i)}
                  style={{
                    padding: "10px 32px 10px 20px",
                    background: activeChapter === i
                      ? "linear-gradient(135deg, #ffb7c5, #e879a0)"
                      : "white",
                    color: activeChapter === i ? "white" : "#b06080",
                    border: "none",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: 1,
                    transition: "all 0.25s",
                    boxShadow: activeChapter === i ? "0 4px 14px rgba(232,121,160,0.35)" : "none",
                  }}
                >
                  {ch.label}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Panel grid */}
          <RevealBlock delay={0.15}>
            <div style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 16, fontWeight: 700, color: "#c4b5fd", fontStyle: "italic", marginBottom: 4 }}>
                {chapters[activeChapter].subtitle}
              </p>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(3, 120px)",
              gap: 6,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 8px 40px rgba(232,121,160,0.15)",
            }}>
              {chapters[activeChapter].panels.map((panel, pi) => {
                const isLiked = likedPanels.has(panel.id)
                return (
                  <div
                    key={panel.id}
                    className={panel.span}
                    style={{
                      backgroundColor: panel.bg,
                      borderRadius: 6,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                      overflow: "hidden",
                    }}
                    onClick={() => toggleLike(panel.id)}
                    onMouseEnter={e => { e.currentTarget.style.transform = "scale(0.98)" }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)" }}
                  >
                    {/* Screentone dot overlay on first and last panel */}
                    {pi === 0 && (
                      <div style={{
                        position: "absolute", inset: 0, pointerEvents: "none",
                        backgroundImage: "radial-gradient(circle, #ffb7c5 1px, transparent 1px)",
                        backgroundSize: "8px 8px",
                        opacity: 0.2,
                      }} />
                    )}

                    {/* Flower corner decoration on active/first panel */}
                    {pi === 0 && (
                      <div style={{ position: "absolute", top: 6, right: 6, pointerEvents: "none" }}>
                        <FlowerSVG size={20} color="#ffb7c580" />
                      </div>
                    )}

                    <span style={{ fontSize: panel.size, color: "#6b3a5a", fontStyle: "italic", textAlign: "center", padding: 12, lineHeight: 1.5, zIndex: 1 }}>
                      {panel.label}
                    </span>

                    {/* Like indicator */}
                    <div style={{
                      position: "absolute", bottom: 6, right: 8,
                      fontSize: 14,
                      transition: "transform 0.2s",
                      transform: isLiked ? "scale(1.3)" : "scale(1)",
                    }}>
                      {isLiked ? <span style={{ color: "#e879a0" }}>&#10084;</span> : <span style={{ color: "#fecdd3" }}>&#9825;</span>}
                    </div>

                    {/* Sparkle on liked */}
                    {isLiked && (
                      <div className="pulse-glow" style={{ position: "absolute", top: 6, left: 6, pointerEvents: "none" }}>
                        <SmallSparkle size={12} color="#fde68a" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <p style={{ fontSize: 12, color: "#b06080", marginTop: 10, fontStyle: "italic", textAlign: "right" }}>
              Tap any panel to mark with love
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* ===== SPARKLE PALETTE ===== */}
      <section id="palette" className="scroll-mt-16" style={{ padding: "80px 24px", backgroundColor: "#fff5f7" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 12 }}>
                <Sparkle size={18} color="#fde68a" />
                <span style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#b06080" }}>color palette</span>
                <Sparkle size={18} color="#fde68a" />
              </div>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: "#e879a0", marginBottom: 8 }}>Sparkle Palette</h2>
              <p style={{ fontSize: 14, color: "#b06080", fontStyle: "italic" }}>Each color carries the spirit of a shoujo moment</p>
            </div>
          </RevealBlock>

          {/* Flower petal arrangement — non-grid */}
          <RevealBlock delay={0.1}>
            <div style={{ position: "relative", minHeight: 440, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* Center flower */}
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <div className="spin-slow">
                  <FlowerSVG size={64} color="#ffb7c5" />
                </div>
              </div>

              {/* Petal swatches arranged radially */}
              {palette.map((p, i) => {
                const angle = (i / palette.length) * 360 - 90
                const rad = (angle * Math.PI) / 180
                const r = 160
                const x = Math.cos(rad) * r
                const y = Math.sin(rad) * r
                return (
                  <div key={p.hex}
                    className="float-slow"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      textAlign: "center",
                      animationDelay: `${i * 0.4}s`,
                    }}>
                    <div style={{
                      width: 80, height: 80,
                      borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
                      backgroundColor: p.hex,
                      border: "3px solid white",
                      boxShadow: `0 6px 20px ${p.hex}88`,
                      margin: "0 auto 8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <Sparkle size={18} color={p.hex === "#fde68a" ? "#e879a0" : "#fde68a"} />
                    </div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "#6b3a5a", marginBottom: 2, whiteSpace: "nowrap" }}>{p.name}</p>
                    <p style={{ fontSize: 10, color: "#b06080", letterSpacing: 1 }}>{p.hex}</p>
                    <p style={{ fontSize: 9, color: "#c4b5fd", textTransform: "uppercase", letterSpacing: 1 }}>{p.role}</p>
                  </div>
                )
              })}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== COMPONENT STAGE — Ribbon banner tabs ===== */}
      <section id="components" className="scroll-mt-16" style={{ padding: "80px 24px", backgroundColor: "#fce7f3" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 12 }}>
                <SmallSparkle size={14} color="#fde68a" />
                <span style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#b06080" }}>ui components</span>
                <SmallSparkle size={14} color="#fde68a" />
              </div>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: "#e879a0", marginBottom: 8 }}>Component Stage</h2>
              <p style={{ fontSize: 14, color: "#b06080", fontStyle: "italic" }}>Every button and card, dressed in ribbon and lace</p>
            </div>
          </RevealBlock>

          {/* Ribbon banner tab headers */}
          <RevealBlock delay={0.1}>
            <div style={{ display: "flex", gap: 0, marginBottom: 32 }}>
              {(["buttons", "cards", "inputs"] as const).map((tab) => {
                const label = tab === "buttons" ? "ボタン" : tab === "cards" ? "カード" : "入力"
                const isActive = activeComponent === tab
                return (
                  <button
                    key={tab}
                    className="ribbon-tab"
                    onClick={() => setActiveComponent(tab)}
                    style={{
                      padding: "12px 40px 12px 24px",
                      background: isActive
                        ? "linear-gradient(135deg, #ffb7c5, #e879a0)"
                        : "#fff5f7",
                      color: isActive ? "white" : "#b06080",
                      border: "none",
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: "pointer",
                      letterSpacing: 2,
                      marginRight: 4,
                      transition: "all 0.25s",
                      boxShadow: isActive ? "0 4px 16px rgba(232,121,160,0.35)" : "none",
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <div style={{
              backgroundColor: "white",
              borderRadius: 16,
              padding: "40px 36px",
              border: "2px solid #ffb7c5",
              boxShadow: "0 8px 32px rgba(232,121,160,0.12)",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Screentone bg in panel */}
              <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                backgroundImage: "radial-gradient(circle, #ffb7c5 1px, transparent 1px)",
                backgroundSize: "8px 8px",
                opacity: 0.07,
              }} />

              {/* Flower corner decoration */}
              <div style={{ position: "absolute", top: 12, right: 12, pointerEvents: "none" }}>
                <FlowerSVG size={32} color="#ffb7c540" />
              </div>

              {/* Lace bottom border */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 10, pointerEvents: "none",
                background: "radial-gradient(circle at 8px 10px, #fff5f7 8px, #ffb7c5 8px)",
                backgroundSize: "16px 10px",
              }} />

              {activeComponent === "buttons" && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", paddingBottom: 16 }}>
                  {/* Rounded-full gradient primary */}
                  <button style={{
                    padding: "12px 28px",
                    background: "linear-gradient(135deg, #ffb7c5, #e879a0)",
                    color: "white", border: "none", borderRadius: 9999,
                    fontSize: 14, fontWeight: 700, cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(232,121,160,0.4)",
                    display: "flex", alignItems: "center", gap: 6,
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.06)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,121,160,0.5)" }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(232,121,160,0.4)" }}>
                    <span style={{ fontSize: 16 }}>&#10084;</span> Love it
                  </button>

                  {/* Purple accent */}
                  <button style={{
                    padding: "12px 28px",
                    background: "linear-gradient(135deg, #c4b5fd, #a78bfa)",
                    color: "white", border: "none", borderRadius: 9999,
                    fontSize: 14, fontWeight: 700, cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(167,139,250,0.4)",
                    display: "flex", alignItems: "center", gap: 6,
                    transition: "transform 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                    <span>&#10024;</span> Dream with me
                  </button>

                  {/* Gold sparkle outline */}
                  <button style={{
                    padding: "12px 28px",
                    background: "transparent",
                    color: "#c4751a", border: "2px solid #fde68a", borderRadius: 9999,
                    fontSize: 14, fontWeight: 700, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 6,
                    transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = "#fde68a22" }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent" }}>
                    <SmallSparkle size={12} color="#fde68a" /> Sparkle
                  </button>

                  {/* Ghost */}
                  <button style={{
                    padding: "12px 28px",
                    background: "white",
                    color: "#e879a0", border: "2px solid #fecdd3", borderRadius: 9999,
                    fontSize: 14, fontWeight: 700, cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "#ffb7c5"; e.currentTarget.style.background = "#fff5f7" }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#fecdd3"; e.currentTarget.style.background = "white" }}>
                    &#9825; Soft touch
                  </button>

                  {/* Ribbon-shape CTA */}
                  <button className="ribbon-btn" style={{
                    padding: "12px 32px",
                    background: "linear-gradient(135deg, #fecdd3, #ffb7c5)",
                    color: "#6b3a5a", border: "none",
                    fontSize: 14, fontWeight: 700, cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(254,205,211,0.5)",
                    transition: "transform 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                    Ribbon CTA
                  </button>
                </div>
              )}

              {activeComponent === "cards" && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, paddingBottom: 16 }}>
                  {[
                    { title: "Sakura Diary", desc: "Write your feelings under the cherry blossoms", color: "#fce7f3", accent: "#e879a0" },
                    { title: "Star Wish", desc: "Make a wish on every falling star tonight", color: "#ede9fe", accent: "#a78bfa" },
                    { title: "Golden Moment", desc: "Treasure every sparkle of this precious time", color: "#fef9c3", accent: "#c4751a" },
                  ].map((card) => (
                    <div key={card.title} style={{
                      backgroundColor: card.color,
                      border: "2px solid #ffb7c5",
                      borderRadius: 16, padding: 24,
                      position: "relative", overflow: "hidden",
                      cursor: "pointer",
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(232,121,160,0.2)" }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}>
                      {/* Screentone bg */}
                      <div style={{
                        position: "absolute", inset: 0, pointerEvents: "none",
                        backgroundImage: "radial-gradient(circle, #ffb7c5 1px, transparent 1px)",
                        backgroundSize: "8px 8px",
                        opacity: 0.1,
                      }} />
                      {/* Flower corner */}
                      <div style={{ position: "absolute", top: 8, right: 8 }}>
                        <FlowerSVG size={24} color={`${card.accent}55`} />
                      </div>
                      <h4 style={{ fontSize: 16, fontWeight: 800, color: card.accent, marginBottom: 8 }}>{card.title}</h4>
                      <p style={{ fontSize: 13, color: "#6b3a5a", lineHeight: 1.6, fontStyle: "italic" }}>{card.desc}</p>
                      {/* Lace bottom */}
                      <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0, height: 8,
                        background: "radial-gradient(circle at 6px 8px, transparent 6px, #ffb7c544 6px)",
                        backgroundSize: "12px 8px",
                      }} />
                    </div>
                  ))}
                </div>
              )}

              {activeComponent === "inputs" && (
                <div style={{ maxWidth: 480, display: "flex", flexDirection: "column", gap: 20, paddingBottom: 16 }}>
                  {[
                    { label: "お名前 (Your Name)", placeholder: "あなたの名前...", type: "text", color: "#ffb7c5" },
                    { label: "メール (Email)", placeholder: "dream@shoujo.jp", type: "email", color: "#c4b5fd" },
                    { label: "ひとこと (Message)", placeholder: "Tell your story...", type: "text", color: "#fecdd3" },
                  ].map((field) => (
                    <div key={field.label} style={{ position: "relative" }}>
                      <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#b06080", marginBottom: 6, fontStyle: "italic" }}>
                        {field.label}
                      </label>
                      <div style={{ position: "relative" }}>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          style={{
                            width: "100%", padding: "12px 40px 12px 16px",
                            border: `2px solid ${field.color}`,
                            borderRadius: 12, outline: "none",
                            backgroundColor: "white",
                            fontSize: 14, color: "#6b3a5a",
                            fontStyle: "italic",
                            transition: "border-color 0.2s, box-shadow 0.2s",
                            boxSizing: "border-box",
                          }}
                          onFocus={e => { e.currentTarget.style.borderColor = "#e879a0"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(232,121,160,0.15)" }}
                          onBlur={e => { e.currentTarget.style.borderColor = field.color; e.currentTarget.style.boxShadow = "none" }}
                        />
                        {/* Heart corner decoration */}
                        <span style={{
                          position: "absolute", right: 12, top: "50%",
                          transform: "translateY(-50%)",
                          fontSize: 14, color: field.color, pointerEvents: "none",
                        }}>&#10084;</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== SCREENTONE GALLERY ===== */}
      <section id="screentone" className="scroll-mt-16" style={{ padding: "80px 24px", backgroundColor: "#fff5f7" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 12 }}>
                <Sparkle size={16} color="#fde68a" />
                <span style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#b06080" }}>texture & tone</span>
                <Sparkle size={16} color="#fde68a" />
              </div>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: "#e879a0", marginBottom: 8 }}>Screentone Gallery</h2>
              <p style={{ fontSize: 14, color: "#b06080", fontStyle: "italic" }}>The half-tone language of manga — each pattern carries emotion</p>
            </div>
          </RevealBlock>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {screentones.map((tone, i) => (
              <RevealBlock key={tone.name} delay={i * 0.12}>
                <div style={{
                  borderRadius: 20, overflow: "hidden",
                  border: "2px solid #ffb7c5",
                  boxShadow: "0 8px 24px rgba(232,121,160,0.1)",
                }}>
                  {/* Pattern preview */}
                  <div style={{
                    height: 140,
                    backgroundImage: tone.pattern,
                    backgroundSize: tone.size,
                    opacity: tone.opacity,
                    backgroundColor: "#fff5f7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}>
                    <div style={{ opacity: 1 / tone.opacity }}>
                      <FlowerSVG size={40} color="#ffb7c5" />
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: "20px 24px", backgroundColor: "white" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <SmallSparkle size={12} color="#fde68a" />
                      <h3 style={{ fontSize: 16, fontWeight: 800, color: "#e879a0" }}>{tone.name}</h3>
                    </div>
                    <p style={{ fontSize: 12, color: "#b06080", fontFamily: "monospace", marginBottom: 8 }}>
                      pattern size: {tone.size}
                    </p>
                    <p style={{ fontSize: 13, color: "#6b3a5a", fontStyle: "italic", lineHeight: 1.6 }}>
                      {tone.mood}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TYPOGRAPHY ROMANCE ===== */}
      <section id="typography" className="scroll-mt-16" style={{ padding: "80px 24px", backgroundColor: "#fce7f3" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 12 }}>
                <SmallSparkle size={14} color="#fde68a" />
                <span style={{ fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "#b06080" }}>typography</span>
                <SmallSparkle size={14} color="#fde68a" />
              </div>
              <h2 style={{ fontSize: 36, fontWeight: 800, color: "#e879a0", marginBottom: 8 }}>Typography Romance</h2>
              <p style={{ fontSize: 14, color: "#b06080", fontStyle: "italic" }}>
                Never uppercase in shoujo — it breaks the dream
              </p>
            </div>
          </RevealBlock>

          {/* Large kanji trio */}
          <RevealBlock delay={0.1}>
            <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap", marginBottom: 56 }}>
              {kanjiWords.map((w, i) => (
                <div key={w.kanji} className={i === 0 ? "float-slow" : i === 1 ? "float-mid" : "float-fast"}
                  style={{ textAlign: "center", cursor: "default" }}>
                  <div style={{
                    fontSize: 96,
                    fontWeight: 900,
                    background: "linear-gradient(135deg, #e879a0 0%, #a855f7 50%, #fecdd3 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    lineHeight: 1.1,
                    marginBottom: 4,
                    filter: "drop-shadow(0 4px 8px rgba(232,121,160,0.25))",
                  }}>
                    {w.kanji}
                  </div>
                  <p style={{ fontSize: 16, color: "#c4b5fd", fontStyle: "italic", fontWeight: 600 }}>{w.reading}</p>
                  <p style={{ fontSize: 12, color: "#b06080", letterSpacing: 2, textTransform: "lowercase" }}>{w.meaning}</p>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Type scale */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { text: "Shoujo Manga Style", size: 48, weight: 800, italic: false, note: "Hero Display — soft, rounded, never harsh" },
              { text: "浪漫な物語 — A Romantic Story", size: 28, weight: 700, italic: true, note: "Sub-heading — italic for dream-like quality" },
              { text: "Every glance became a petal falling in slow motion...", size: 18, weight: 400, italic: true, note: "Body — italic prose, generous line-height" },
              { text: "caption: under the sakura tree, spring 2026", size: 13, weight: 400, italic: true, note: "Caption — small, whispered, poetic" },
            ].map((item, i) => (
              <RevealBlock key={i} delay={i * 0.1}>
                <div style={{
                  backgroundColor: "white",
                  border: "2px solid #ffb7c5",
                  borderRadius: 16, padding: "24px 28px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  flexWrap: "wrap", gap: 16,
                }}>
                  <p style={{
                    fontSize: item.size,
                    fontWeight: item.weight,
                    fontStyle: item.italic ? "italic" : "normal",
                    background: "linear-gradient(135deg, #e879a0, #a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    margin: 0,
                    lineHeight: 1.3,
                    flex: 1,
                  }}>
                    {item.text}
                  </p>
                  <span style={{
                    fontSize: 11, color: "#b06080", fontStyle: "italic",
                    maxWidth: 200, textAlign: "right", lineHeight: 1.5,
                  }}>
                    {item.note}
                  </span>
                </div>
              </RevealBlock>
            ))}
          </div>

          <RevealBlock delay={0.5}>
            <div style={{
              marginTop: 36,
              padding: "20px 28px",
              backgroundColor: "#fff5f7",
              border: "2px dashed #ffb7c5",
              borderRadius: 12,
              textAlign: "center",
            }}>
              <p style={{ fontSize: 14, color: "#b06080", fontStyle: "italic", lineHeight: 1.7 }}>
                Shoujo typography rule: Softness over strength. Curves over angles.<br />
                <strong style={{ color: "#e879a0" }}>Never shout</strong> — whisper, dream, and let the flowers speak for you.
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ backgroundColor: "#ffb7c5", position: "relative", paddingTop: 0 }}>
        {/* Scalloped lace top border */}
        <div style={{
          height: 16,
          background: "radial-gradient(circle at 12px 16px, #fce7f3 14px, #ffb7c5 14px)",
          backgroundSize: "24px 16px",
          marginBottom: 0,
        }} />

        {/* Screentone overlay */}
        <div style={{
          position: "absolute", top: 16, left: 0, right: 0, bottom: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, #fff5f7 1px, transparent 1px)",
          backgroundSize: "8px 8px",
          opacity: 0.15,
        }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 40px", textAlign: "center", position: "relative" }}>
          {/* Sparkle decorations */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 24 }}>
            <Sparkle size={20} color="#fde68a" style={{ animation: "shoujo-pulse-glow 2s ease-in-out infinite" }} />
            <FlowerSVG size={36} color="white" />
            <Sparkle size={24} color="#fde68a" style={{ animation: "shoujo-pulse-glow 2s ease-in-out infinite 0.4s" }} />
            <FlowerSVG size={28} color="white" />
            <Sparkle size={18} color="#fde68a" style={{ animation: "shoujo-pulse-glow 2s ease-in-out infinite 0.8s" }} />
          </div>

          <p style={{ fontSize: 22, fontWeight: 800, color: "white", marginBottom: 8, letterSpacing: 2 }}>
            少女漫画風
          </p>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", fontStyle: "italic", marginBottom: 24, lineHeight: 1.7 }}>
            Every story blooms in pink — styled with love, wrapped in petals
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", marginBottom: 32 }}>
            <Link href="/styles" style={{ fontSize: 13, color: "white", textDecoration: "none", fontWeight: 600, opacity: 0.9 }}>
              All Styles
            </Link>
            <Link href="/styles/shoujo-manga" style={{ fontSize: 13, color: "white", textDecoration: "none", fontWeight: 600, opacity: 0.9 }}>
              Documentation
            </Link>
          </div>

          {/* Bottom sparkle row */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, opacity: 0.7 }}>
            {[16, 10, 14, 10, 16].map((s, i) => (
              <SmallSparkle key={i} size={s} color="#fde68a" style={{ animationDelay: `${i * 0.3}s` }} />
            ))}
          </div>

          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 20, letterSpacing: 1 }}>
            StyleKit — Shoujo Manga Showcase 2026
          </p>
        </div>

        {/* Scalloped lace bottom border */}
        <div style={{
          height: 12,
          background: "radial-gradient(circle at 12px 0px, #fce7f3 12px, #ffb7c5 12px)",
          backgroundSize: "24px 12px",
        }} />
      </footer>
    </div>
  )
}
