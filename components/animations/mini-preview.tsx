"use client";

/**
 * Mini preview: CSS-only keyframe animations used by animation cards
 * and the vocabulary page. Lighter than the full AnimationPreview
 * component (which is a real imported component) but covers the
 * 48 catalog slugs with infinite auto-looping visuals — ideal for
 * contexts where the reader does not interact with the card
 * (hover-only previews stay static, so we lean on keyframe-driven
 * loops here).
 */

export const previewPanelClass =
  "sk-mini-anim relative overflow-hidden border border-black/10 shadow-[0_14px_30px_-22px_rgba(15,23,42,0.9)] dark:border-white/10";

export function MiniPreviewStyles() {
  return (
    <style>{`
      @media (prefers-reduced-motion: reduce) {
        .sk-mini-anim {
          animation: none !important;
          transition: none !important;
        }
      }

      @keyframes sk-mini-fade-up {
        0%, 100% { opacity: 0; transform: translateY(10px) scale(0.96); }
        18%, 78% { opacity: 1; transform: translateY(0) scale(1); }
      }

      @keyframes sk-mini-scale-in {
        0%, 100% { opacity: 0; transform: scale(0.82); }
        18%, 78% { opacity: 1; transform: scale(1); }
      }

      @keyframes sk-mini-hover-lift {
        0%, 100% { transform: translateY(0); box-shadow: 0 10px 24px -22px rgba(15, 23, 42, 0.8); }
        50% { transform: translateY(-5px); box-shadow: 0 24px 36px -24px rgba(15, 23, 42, 0.85); }
      }

      @keyframes sk-mini-type {
        0% { width: 0; }
        45%, 80% { width: 5.2ch; }
        100% { width: 0; }
      }

      @keyframes sk-mini-blink {
        0%, 100% { border-color: transparent; }
        50% { border-color: currentColor; }
      }

      @keyframes sk-mini-fade-down {
        0%, 100% { opacity: 0; transform: translateY(-10px) scale(0.96); }
        18%, 78% { opacity: 1; transform: translateY(0) scale(1); }
      }

      @keyframes sk-mini-slide-left {
        0%, 100% { opacity: 0; transform: translateX(-14px); }
        18%, 78% { opacity: 1; transform: translateX(0); }
      }

      @keyframes sk-mini-glow {
        0%, 100% { box-shadow: 0 0 0 rgba(99,102,241,0); }
        50% { box-shadow: 0 0 14px rgba(99,102,241,0.45), 0 0 28px rgba(99,102,241,0.18); }
      }

      @keyframes sk-mini-reveal {
        0%, 100% { opacity: 0; transform: translateY(6px); }
        28%, 78% { opacity: 1; transform: translateY(0); }
      }

      @keyframes sk-mini-float-a {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }

      @keyframes sk-mini-float-b {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      @keyframes sk-mini-gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      @keyframes sk-mini-dot {
        0%, 80%, 100% { transform: scale(0.4); opacity: 0.35; }
        40% { transform: scale(1); opacity: 1; }
      }

      @keyframes sk-mini-bg-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      @keyframes sk-mini-stagger {
        0%, 100% { opacity: 0; transform: translateY(5px); }
        18%, 78% { opacity: 1; transform: translateY(0); }
      }

      @keyframes sk-mini-blur-in {
        0%, 100% { opacity: 0; filter: blur(6px); transform: scale(0.98); }
        18%, 78% { opacity: 1; filter: blur(0); transform: scale(1); }
      }

      @keyframes sk-mini-spotlight {
        0%, 100% { transform: translate3d(-16%, 0, 0); opacity: 0.24; }
        50% { transform: translate3d(20%, 0, 0); opacity: 0.48; }
      }

      @keyframes sk-mini-magnetic {
        0%, 100% { transform: translate(0, 0); }
        25% { transform: translate(3px, -2px); }
        50% { transform: translate(-2px, 3px); }
        75% { transform: translate(2px, 1px); }
      }

      @keyframes sk-mini-bounce {
        0%, 100% { opacity: 0; transform: scale(0.3); }
        18% { transform: scale(1.08); opacity: 1; }
        28% { transform: scale(0.92); }
        38%, 78% { transform: scale(1); opacity: 1; }
      }

      @keyframes sk-mini-slide-right {
        0%, 100% { opacity: 0; transform: translateX(14px); }
        18%, 78% { opacity: 1; transform: translateX(0); }
      }

      @keyframes sk-mini-rotate {
        0%, 100% { opacity: 0; transform: rotate(-180deg) scale(0.6); }
        18%, 78% { opacity: 1; transform: rotate(0) scale(1); }
      }

      @keyframes sk-mini-shake {
        0%, 100% { transform: translateX(0); }
        12% { transform: translateX(-6px); }
        24% { transform: translateX(6px); }
        36% { transform: translateX(-4px); }
        48% { transform: translateX(4px); }
        60% { transform: translateX(-2px); }
        72%, 100% { transform: translateX(0); }
      }

      @keyframes sk-mini-flip {
        0%, 40% { transform: perspective(400px) rotateY(0); }
        50%, 90% { transform: perspective(400px) rotateY(180deg); }
        100% { transform: perspective(400px) rotateY(0); }
      }

      @keyframes sk-mini-ripple {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0.5; }
        100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
      }

      @keyframes sk-mini-counter {
        0%, 100% { transform: translateY(100%); opacity: 0; }
        20%, 80% { transform: translateY(0); opacity: 1; }
      }

      @keyframes sk-mini-morph {
        0%, 100% { border-radius: 40% 60% 70% 30% / 40% 30% 60% 70%; }
        25% { border-radius: 60% 40% 30% 70% / 60% 70% 40% 30%; }
        50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        75% { border-radius: 50% 40% 60% 50% / 30% 50% 70% 50%; }
      }

      .sk-mini-fade-up { animation: sk-mini-fade-up 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
      .sk-mini-scale-in { animation: sk-mini-scale-in 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
      .sk-mini-hover-lift { animation: sk-mini-hover-lift 2.2s ease-in-out infinite; }
      .sk-mini-type { animation: sk-mini-type 3s steps(5, end) infinite; }
      .sk-mini-blink { animation: sk-mini-blink 0.8s step-end infinite; }
      .sk-mini-fade-down { animation: sk-mini-fade-down 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
      .sk-mini-slide-left { animation: sk-mini-slide-left 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
      .sk-mini-glow { animation: sk-mini-glow 2.1s ease-in-out infinite; }
      .sk-mini-reveal { animation: sk-mini-reveal 2.8s ease-in-out infinite; }
      .sk-mini-float-a { animation: sk-mini-float-a 3s ease-in-out infinite; }
      .sk-mini-float-b { animation: sk-mini-float-b 2.5s ease-in-out infinite; }
      .sk-mini-gradient { animation: sk-mini-gradient 3s linear infinite; }
      .sk-mini-dot { animation: sk-mini-dot 1.4s ease-in-out infinite both; }
      .sk-mini-bg-shift { animation: sk-mini-bg-shift 4.2s ease infinite; }
      .sk-mini-stagger { animation: sk-mini-stagger 2.5s ease-in-out infinite; }
      .sk-mini-blur-in { animation: sk-mini-blur-in 3s ease-in-out infinite; }
      .sk-mini-spotlight { animation: sk-mini-spotlight 3s ease-in-out infinite; }
      .sk-mini-magnetic { animation: sk-mini-magnetic 2.5s ease-in-out infinite; }
      .sk-mini-bounce { animation: sk-mini-bounce 2.6s cubic-bezier(0.34, 1.56, 0.64, 1) infinite; }
      .sk-mini-slide-right { animation: sk-mini-slide-right 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
      .sk-mini-rotate { animation: sk-mini-rotate 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
      .sk-mini-shake { animation: sk-mini-shake 2.5s ease-in-out infinite; }
      .sk-mini-flip { animation: sk-mini-flip 3.5s ease-in-out infinite; transform-style: preserve-3d; }
      .sk-mini-ripple { animation: sk-mini-ripple 2s ease-out infinite; }
      .sk-mini-counter { animation: sk-mini-counter 3s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
      .sk-mini-morph { animation: sk-mini-morph 8s ease-in-out infinite; }

      @keyframes sk-mini-fade-out-down {
        0%, 20% { opacity: 1; transform: translateY(0) scale(1); }
        50%, 100% { opacity: 0; transform: translateY(10px) scale(0.96); }
      }

      @keyframes sk-mini-scale-out {
        0%, 20% { opacity: 1; transform: scale(1); }
        50%, 100% { opacity: 0; transform: scale(0.7); }
      }

      @keyframes sk-mini-slide-out-r {
        0%, 20% { opacity: 1; transform: translateX(0); }
        50%, 100% { opacity: 0; transform: translateX(16px); }
      }

      @keyframes sk-mini-collapse {
        0%, 30% { max-height: 40px; opacity: 1; }
        60%, 100% { max-height: 0; opacity: 0; }
      }

      @keyframes sk-mini-crossfade-a {
        0%, 45% { opacity: 1; }
        55%, 95% { opacity: 0; }
        100% { opacity: 1; }
      }

      @keyframes sk-mini-crossfade-b {
        0%, 45% { opacity: 0; }
        55%, 95% { opacity: 1; }
        100% { opacity: 0; }
      }

      @keyframes sk-mini-slide-swap {
        0%, 15% { opacity: 1; transform: translateX(0); }
        30% { opacity: 0; transform: translateX(-14px); }
        31% { opacity: 0; transform: translateX(14px); }
        50%, 85% { opacity: 1; transform: translateX(0); }
        100% { opacity: 0; transform: translateX(-14px); }
      }

      @keyframes sk-mini-morph-trans {
        0%, 100% { width: 28px; height: 28px; border-radius: 50%; background: #6366f1; }
        50% { width: 52px; height: 22px; border-radius: 6px; background: #ec4899; }
      }

      @keyframes sk-mini-text-reveal {
        0%, 100% { clip-path: inset(100% 0 0 0); opacity: 0; }
        20%, 78% { clip-path: inset(0 0 0 0); opacity: 1; }
      }

      @keyframes sk-mini-underline {
        0%, 100% { transform: scaleX(0); transform-origin: right; }
        30%, 70% { transform: scaleX(1); transform-origin: left; }
      }

      @keyframes sk-mini-progress {
        0% { width: 0; }
        60%, 85% { width: 100%; }
        100% { width: 0; }
      }

      @keyframes sk-mini-progress-shimmer {
        from { background-position: -200% 0; }
        to { background-position: 200% 0; }
      }

      @keyframes sk-mini-elastic {
        0%, 100% { opacity: 0; transform: scale(0); }
        20% { transform: scale(1.18); opacity: 1; }
        30% { transform: scale(0.9); }
        40% { transform: scale(1.06); }
        50%, 78% { transform: scale(1); opacity: 1; }
      }

      @keyframes sk-mini-pulse-ring {
        0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.5); }
        70% { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
        100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
      }

      .sk-mini-fade-out-down { animation: sk-mini-fade-out-down 2.6s ease-in-out infinite; }
      .sk-mini-scale-out { animation: sk-mini-scale-out 2.4s ease-in-out infinite; }
      .sk-mini-slide-out-r { animation: sk-mini-slide-out-r 2.6s ease-in-out infinite; }
      .sk-mini-collapse { animation: sk-mini-collapse 2.8s ease-in-out infinite; overflow: hidden; }
      .sk-mini-crossfade-a { animation: sk-mini-crossfade-a 3s ease-in-out infinite; }
      .sk-mini-crossfade-b { animation: sk-mini-crossfade-b 3s ease-in-out infinite; position: absolute; inset: 0; }
      .sk-mini-slide-swap { animation: sk-mini-slide-swap 3s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
      .sk-mini-morph-trans { animation: sk-mini-morph-trans 2.4s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
      .sk-mini-text-reveal { animation: sk-mini-text-reveal 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
      .sk-mini-underline { animation: sk-mini-underline 2.4s ease-in-out infinite; }
      .sk-mini-progress { animation: sk-mini-progress 2.5s ease-in-out infinite, sk-mini-progress-shimmer 1.5s linear infinite; background: linear-gradient(90deg, #6366f1, #818cf8, #6366f1); background-size: 200% 100%; }
      .sk-mini-elastic { animation: sk-mini-elastic 2.8s cubic-bezier(0.34, 1.56, 0.64, 1) infinite; }
      .sk-mini-pulse-ring { animation: sk-mini-pulse-ring 2s ease-out infinite; }

      @keyframes sk-mini-zoom-in {
        0%, 100% { opacity: 0; transform: scale(0.4); }
        18%, 78% { opacity: 1; transform: scale(1); }
      }

      @keyframes sk-mini-marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }

      @keyframes sk-mini-shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }

      @keyframes sk-mini-pulse-beat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.12); }
      }

      @keyframes sk-mini-elastic-snap {
        0%, 100% { transform: scaleX(1); }
        20% { transform: scaleX(1.22); }
        40% { transform: scaleX(0.92); }
        55% { transform: scaleX(1.06); }
        70% { transform: scaleX(0.98); }
      }

      @keyframes sk-mini-border-draw {
        0% { stroke-dashoffset: 200; }
        50%, 80% { stroke-dashoffset: 0; }
        100% { stroke-dashoffset: 200; }
      }

      @keyframes sk-mini-glitch {
        0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
        20% { clip-path: inset(20% 0 60% 0); transform: translate(-2px, 1px); }
        40% { clip-path: inset(50% 0 20% 0); transform: translate(2px, -1px); }
        60% { clip-path: inset(30% 0 40% 0); transform: translate(-1px, 2px); }
        80% { clip-path: inset(60% 0 10% 0); transform: translate(1px, -1px); }
      }

      .sk-mini-zoom-in { animation: sk-mini-zoom-in 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite; }
      .sk-mini-marquee { animation: sk-mini-marquee 4s linear infinite; }
      .sk-mini-shimmer { animation: sk-mini-shimmer 2s ease-in-out infinite; }
      .sk-mini-pulse-beat { animation: sk-mini-pulse-beat 2s ease-in-out infinite; }
      .sk-mini-elastic-snap { animation: sk-mini-elastic-snap 2.5s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite; }
      .sk-mini-border-draw { animation: sk-mini-border-draw 3s ease-in-out infinite; }
      .sk-mini-glitch { animation: sk-mini-glitch 3s steps(2, end) infinite; }

      @keyframes sk-mini-scramble {
        0%, 100% { opacity: 0.4; letter-spacing: 0.15em; }
        15% { opacity: 0.6; letter-spacing: 0.12em; }
        50%, 80% { opacity: 1; letter-spacing: 0.08em; }
      }

      @keyframes sk-mini-tilt {
        0%, 100% { transform: rotateX(0deg) rotateY(0deg); }
        25% { transform: rotateX(-6deg) rotateY(8deg); }
        50% { transform: rotateX(4deg) rotateY(-6deg); }
        75% { transform: rotateX(-3deg) rotateY(5deg); }
      }

      @keyframes sk-mini-confetti-1 {
        0% { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(1); }
        100% { opacity: 0; transform: translate(-14px, 18px) rotate(180deg) scale(0.3); }
      }
      @keyframes sk-mini-confetti-2 {
        0% { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(1); }
        100% { opacity: 0; transform: translate(12px, 20px) rotate(-200deg) scale(0.3); }
      }
      @keyframes sk-mini-confetti-3 {
        0% { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(1); }
        100% { opacity: 0; transform: translate(-8px, -14px) rotate(140deg) scale(0.3); }
      }
      @keyframes sk-mini-confetti-4 {
        0% { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(1); }
        100% { opacity: 0; transform: translate(16px, -12px) rotate(-160deg) scale(0.3); }
      }
      @keyframes sk-mini-confetti-5 {
        0% { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(1); }
        100% { opacity: 0; transform: translate(0, -20px) rotate(220deg) scale(0.3); }
      }

      .sk-mini-scramble { animation: sk-mini-scramble 2.5s ease-in-out infinite; }
      .sk-mini-tilt { animation: sk-mini-tilt 3s ease-in-out infinite; transform-style: preserve-3d; }
      .sk-mini-confetti-1 { animation: sk-mini-confetti-1 1.2s cubic-bezier(0, 0.9, 0.57, 1) infinite; }
      .sk-mini-confetti-2 { animation: sk-mini-confetti-2 1.2s cubic-bezier(0, 0.9, 0.57, 1) 0.05s infinite; }
      .sk-mini-confetti-3 { animation: sk-mini-confetti-3 1.2s cubic-bezier(0, 0.9, 0.57, 1) 0.1s infinite; }
      .sk-mini-confetti-4 { animation: sk-mini-confetti-4 1.2s cubic-bezier(0, 0.9, 0.57, 1) 0.15s infinite; }
      .sk-mini-confetti-5 { animation: sk-mini-confetti-5 1.2s cubic-bezier(0, 0.9, 0.57, 1) 0.08s infinite; }

      @keyframes sk-mini-page-turn {
        0%, 20% { transform: perspective(400px) rotateY(0deg); opacity: 1; }
        50% { transform: perspective(400px) rotateY(-75deg); opacity: 0.3; }
        51% { transform: perspective(400px) rotateY(-75deg); opacity: 0; }
        52%, 80% { transform: perspective(400px) rotateY(0deg); opacity: 1; }
        100% { transform: perspective(400px) rotateY(0deg); opacity: 1; }
      }

      @keyframes sk-mini-peel {
        0%, 20% { transform: perspective(400px) rotateX(0deg) rotateZ(0deg); clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); opacity: 1; }
        55% { transform: perspective(400px) rotateX(-10deg) rotateZ(5deg); clip-path: polygon(0% 0%, 30% 0%, 0% 30%); opacity: 0.6; }
        56% { opacity: 0; }
        57%, 80% { transform: perspective(400px) rotateX(0deg) rotateZ(0deg); clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); opacity: 1; }
        100% { opacity: 1; }
      }

      .sk-mini-page-turn { animation: sk-mini-page-turn 3.5s ease-in-out infinite; transform-origin: left center; backface-visibility: hidden; }
      .sk-mini-peel { animation: sk-mini-peel 3.5s ease-in-out infinite; transform-origin: bottom left; }

      @keyframes sk-mini-beam {
        to { transform: rotate(360deg); }
      }
      .sk-mini-beam-spin { animation: sk-mini-beam 2.5s linear infinite; }

      @keyframes sk-mini-write {
        0% { stroke-dashoffset: 1; }
        60%, 100% { stroke-dashoffset: 0; }
      }
      .sk-mini-write { stroke-dasharray: 1; animation: sk-mini-write 2.5s ease-in-out infinite; }

      @keyframes sk-mini-ann-sweep {
        0% { background-size: 0% 70%; }
        45%, 100% { background-size: 100% 70%; }
      }
      .sk-mini-ann { animation: sk-mini-ann-sweep 2.5s ease-in-out infinite; }
      @keyframes sk-mini-ann-note {
        0%, 40% { opacity: 0; transform: rotate(-6deg) translateY(3px); }
        65%, 100% { opacity: 0.9; transform: rotate(-6deg) translateY(0); }
      }
      .sk-mini-ann-note { animation: sk-mini-ann-note 2.5s ease-in-out infinite; }
    `}</style>
  );
}

export function MiniPreview({ slug }: { slug: string }) {
  switch (slug) {
    case "fade-in-up":
      return (
        <div className={`${previewPanelClass} sk-mini-fade-up h-10 w-14 rounded-[14px] bg-gradient-to-br from-sky-100 to-sky-200 dark:from-sky-500/30 dark:to-sky-700/25`}>
          <div className="absolute left-2 right-2 top-2 h-1 rounded-full bg-white/65 dark:bg-white/15" />
          <div className="absolute bottom-2 left-2 h-1.5 w-7 rounded-full bg-white/55 dark:bg-white/10" />
        </div>
      );
    case "scale-in":
      return (
        <div className={`${previewPanelClass} sk-mini-scale-in flex h-11 w-11 items-center justify-center rounded-[16px] bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-500/28 dark:to-fuchsia-500/18`}>
          <div className="h-4 w-4 rounded-full border border-white/70 bg-white/60 dark:border-white/20 dark:bg-white/10" />
        </div>
      );
    case "hover-lift":
      return (
        <div className={`${previewPanelClass} sk-mini-hover-lift h-9 w-14 rounded-[14px] bg-gradient-to-b from-amber-100 to-orange-100 dark:from-amber-500/28 dark:to-orange-500/22`} />
      );
    case "typewriter":
      return (
        <div className="overflow-hidden rounded-[14px] border border-emerald-500/15 bg-[#08110d] px-3 py-2 shadow-[0_18px_34px_-26px_rgba(5,150,105,0.8)]">
          <span className="sk-mini-type sk-mini-blink block overflow-hidden whitespace-nowrap border-r-2 border-current font-mono text-[12px] text-emerald-400">
            Hello
          </span>
        </div>
      );
    case "skeleton-pulse":
      return (
        <div className="w-full max-w-[112px] space-y-1.5 px-4">
          <div className="h-2 rounded-full bg-zinc-200/90 animate-pulse dark:bg-zinc-700/80" />
          <div className="h-2 w-4/5 rounded-full bg-zinc-200/90 animate-pulse dark:bg-zinc-700/80" />
          <div className="h-2 w-2/3 rounded-full bg-zinc-200/90 animate-pulse dark:bg-zinc-700/80" />
        </div>
      );
    case "fade-in-down":
      return (
        <div className={`${previewPanelClass} sk-mini-fade-down h-10 w-14 rounded-[14px] bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-500/28 dark:to-cyan-500/20`}>
          <div className="absolute left-2 right-2 bottom-2 h-1 rounded-full bg-white/65 dark:bg-white/12" />
        </div>
      );
    case "slide-in-left":
      return (
        <div className={`${previewPanelClass} sk-mini-slide-left h-9 w-14 rounded-[14px] bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-500/25 dark:to-teal-500/18`}>
          <div className="absolute inset-y-2 left-2 w-1 rounded-full bg-white/60 dark:bg-white/12" />
        </div>
      );
    case "hover-glow":
      return (
        <div className="sk-mini-anim sk-mini-glow rounded-full bg-indigo-500 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white shadow-[0_12px_28px_-24px_rgba(79,70,229,0.9)]">
          Glow
        </div>
      );
    case "scroll-reveal":
      return (
        <div className="space-y-1.5">
            {[0, 0.3, 0.6].map((d) => (
              <div
                key={d}
                className="sk-mini-anim sk-mini-reveal h-2 w-16 rounded-full bg-green-200/90 dark:bg-green-500/25"
                style={{ animationDelay: `${d}s` }}
              />
            ))}
        </div>
      );
    case "parallax-float":
      return (
        <div className="relative h-14 w-20">
          <div className="sk-mini-anim sk-mini-float-a absolute left-1 top-1 h-7 w-7 rounded-full bg-violet-200/90 shadow-[0_18px_26px_-24px_rgba(124,58,237,0.9)] dark:bg-violet-500/25" />
          <div className="sk-mini-anim sk-mini-float-b absolute right-1 top-5 h-4 w-4 rounded-[8px] bg-pink-200/90 shadow-[0_18px_26px_-24px_rgba(236,72,153,0.9)] dark:bg-pink-500/25" />
        </div>
      );
    case "text-gradient-flow":
      return (
        <span
          className="sk-mini-anim sk-mini-gradient text-sm font-semibold tracking-tight"
          style={{
            background: "linear-gradient(270deg, #6366f1, #ec4899, #8b5cf6, #06b6d4, #6366f1)",
            backgroundSize: "300% 300%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Gradient
        </span>
      );
    case "spinner-dots":
      return (
        <div className="inline-flex gap-1.5">
            {["-0.32s", "-0.16s", "0s"].map((d) => (
              <span
                key={d}
                className="sk-mini-anim sk-mini-dot h-2.5 w-2.5 rounded-full bg-zinc-800 dark:bg-zinc-200"
                style={{ animationDelay: d }}
              />
            ))}
        </div>
      );
    case "background-gradient-shift":
      return (
        <div
          className="sk-mini-anim sk-mini-bg-shift h-12 w-20 rounded-[16px] border border-white/40 shadow-[0_18px_32px_-24px_rgba(15,23,42,0.9)] dark:border-white/10"
          style={{
            background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
            backgroundSize: "400% 400%",
          }}
        />
      );
    case "stagger-children":
      return (
        <div className="space-y-1">
            {[0, 0.15, 0.3, 0.45].map((d) => (
              <div
                key={d}
                className="sk-mini-anim sk-mini-stagger h-2 w-16 rounded-full bg-teal-200/90 dark:bg-teal-500/22"
                style={{ animationDelay: `${d}s` }}
              />
            ))}
        </div>
      );
    case "blur-in":
      return (
        <div className={`${previewPanelClass} sk-mini-blur-in h-10 w-14 rounded-[14px] bg-gradient-to-br from-indigo-100 to-slate-100 dark:from-indigo-500/28 dark:to-slate-500/20`} />
      );
    case "spotlight-card":
      return (
        <div className="relative h-12 w-20 overflow-hidden rounded-[16px] border border-white/10 bg-zinc-900 shadow-[0_20px_32px_-26px_rgba(0,0,0,0.95)]">
          <div className="absolute inset-x-2 top-2 h-px bg-white/10" />
            <div
              className="sk-mini-anim sk-mini-spotlight absolute inset-y-0 -left-8 w-20"
              style={{
                background: "radial-gradient(circle at center, rgba(255,255,255,0.24), transparent 60%)",
              }}
            />
        </div>
      );
    case "magnetic-hover":
      return (
          <div
            className="sk-mini-anim sk-mini-magnetic rounded-full bg-foreground px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-background shadow-[0_16px_28px_-24px_rgba(15,23,42,0.9)]"
          />
      );
    case "bounce-in":
      return (
        <div className={`${previewPanelClass} sk-mini-bounce flex h-10 w-10 items-center justify-center rounded-[16px] bg-gradient-to-br from-rose-200 to-pink-300 dark:from-rose-500/28 dark:to-pink-500/22`}>
          <div className="h-3 w-3 rounded-full bg-white/70 dark:bg-white/15" />
        </div>
      );
    case "slide-in-right":
      return (
        <div className={`${previewPanelClass} sk-mini-slide-right h-9 w-14 rounded-[14px] bg-gradient-to-l from-cyan-100 to-blue-100 dark:from-cyan-500/25 dark:to-blue-500/18`}>
          <div className="absolute inset-y-2 right-2 w-1 rounded-full bg-white/60 dark:bg-white/12" />
        </div>
      );
    case "rotate-in":
      return (
        <div className={`${previewPanelClass} sk-mini-rotate h-10 w-10 rounded-[14px] bg-gradient-to-br from-amber-200 to-orange-300 dark:from-amber-500/28 dark:to-orange-500/22`} />
      );
    case "shake":
      return (
        <div className="sk-mini-anim sk-mini-shake border-2 border-red-400/60 bg-red-50 px-3 py-1.5 text-[10px] text-red-500 dark:bg-red-900/20 dark:border-red-500/30 dark:text-red-400">
          Error
        </div>
      );
    case "flip-card":
      return (
        <div className={`${previewPanelClass} sk-mini-flip h-10 w-14 rounded-[14px] bg-gradient-to-br from-violet-200 to-purple-300 dark:from-violet-500/28 dark:to-purple-500/22`}>
          <div className="absolute inset-2 border border-white/50 dark:border-white/10 rounded-[8px]" />
        </div>
      );
    case "ripple-click":
      return (
        <div className="relative flex h-9 w-16 items-center justify-center overflow-hidden bg-indigo-500 shadow-[0_14px_28px_-22px_rgba(79,70,229,0.9)]">
          <span className="relative z-10 text-[10px] text-white uppercase tracking-wider">Click</span>
          <span
            className="sk-mini-anim sk-mini-ripple absolute left-1/2 top-1/2 h-3 w-3 rounded-full bg-white/30"
          />
        </div>
      );
    case "cursor-aura":
      return (
        <div className="relative h-12 w-16 rounded-[14px] border border-cyan-400/20 bg-zinc-950">
          <span className="absolute left-8 top-6 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/30 bg-cyan-300/15" />
          <span className="absolute left-7 top-5 h-1.5 w-1.5 rounded-full bg-white" />
        </div>
      );
    case "cursor-trail":
      return (
        <div className="relative h-12 w-20 rounded-[14px] border border-cyan-400/20 bg-zinc-950">
          {[0, 1, 2, 3].map((index) => (
            <span
              key={index}
              className="absolute rounded-full bg-cyan-300"
              style={{ left: 18 + index * 12, top: 26 - index * 3, width: 8 - index, height: 8 - index, opacity: 1 - index * 0.18 }}
            />
          ))}
        </div>
      );
    case "proximity-reveal":
      return (
        <div className="flex h-10 w-20 items-center justify-between border border-zinc-200 bg-white px-2 dark:border-white/10 dark:bg-zinc-900">
          <span className="h-2 w-8 rounded-full bg-zinc-300 dark:bg-zinc-700" />
          <span className="h-5 w-5 border border-zinc-300 bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800" />
        </div>
      );
    case "text-repulsion":
      return (
        <div className="flex gap-0.5 text-lg font-bold text-zinc-950 dark:text-white">
          {["T", "Y", "P", "E"].map((letter, index) => (
            <span key={letter} style={{ transform: `translate(${index % 2 ? 2 : -2}px, ${index === 1 ? -3 : 2}px)` }}>{letter}</span>
          ))}
        </div>
      );
    case "image-distortion":
      return (
        <div className="h-12 w-16 overflow-hidden border border-white/10 bg-[linear-gradient(135deg,#0f172a,#0891b2_44%,#fb923c)]">
          <div className="h-full w-full bg-[radial-gradient(circle_at_60%_42%,rgba(255,255,255,0.42),transparent_22%)]" />
        </div>
      );
    case "parallax-layers":
      return (
        <div className="relative h-12 w-20 overflow-hidden border border-white/10 bg-zinc-950">
          <span className="absolute left-3 top-4 h-7 w-7 rounded-full bg-cyan-300/40" />
          <span className="absolute left-8 top-2 h-9 w-10 border border-white/20 bg-white/10" />
          <span className="absolute bottom-2 right-3 h-4 w-8 bg-orange-300" />
        </div>
      );
    case "drag-physics":
      return (
        <div className="relative h-12 w-20 border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
          <span className="absolute left-8 top-4 h-6 w-6 rotate-6 border border-zinc-950 bg-white shadow-[4px_4px_0_rgba(15,23,42,0.14)] dark:border-white dark:bg-zinc-800" />
        </div>
      );
    case "context-cursor":
      return (
        <div className="relative h-12 w-20 border border-white/10 bg-zinc-950">
          <span className="absolute left-3 top-3 h-6 w-7 border border-white/10 bg-white/5" />
          <span className="absolute left-9 top-5 rounded-full bg-cyan-300 px-1.5 py-0.5 text-[8px] text-zinc-950">View</span>
        </div>
      );
    case "counter-roll":
      return (
        <div className="flex gap-0.5 font-mono text-base tabular-nums">
          {["9", "8", "7"].map((n, i) => (
            <span key={i} className="inline-block overflow-hidden h-[1.3em]">
              <span
                className="sk-mini-anim sk-mini-counter inline-block"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {n}
              </span>
            </span>
          ))}
        </div>
      );
    case "morph-shape":
      return (
        <div
          className="sk-mini-anim sk-mini-morph h-12 w-12 bg-gradient-to-br from-teal-300 to-cyan-400 shadow-[0_16px_28px_-22px_rgba(6,182,212,0.8)] dark:from-teal-500/40 dark:to-cyan-500/30"
        />
      );
    case "fade-out-down":
      return (
        <div className={`${previewPanelClass} sk-mini-fade-out-down h-10 w-14 rounded-[14px] bg-gradient-to-br from-red-100 to-rose-200 dark:from-red-500/28 dark:to-rose-500/20`}>
          <div className="absolute left-2 right-2 top-2 h-1 rounded-full bg-white/65 dark:bg-white/12" />
        </div>
      );
    case "scale-out":
      return (
        <div className={`${previewPanelClass} sk-mini-scale-out flex h-11 w-11 items-center justify-center rounded-[16px] bg-gradient-to-br from-orange-100 to-amber-200 dark:from-orange-500/28 dark:to-amber-500/20`}>
          <div className="h-4 w-4 rounded-full bg-white/60 dark:bg-white/12" />
        </div>
      );
    case "slide-out-right":
      return (
        <div className={`${previewPanelClass} sk-mini-slide-out-r h-9 w-14 rounded-[14px] bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-500/25 dark:to-pink-500/18`}>
          <div className="absolute inset-y-2 right-2 w-1 rounded-full bg-white/60 dark:bg-white/12" />
        </div>
      );
    case "collapse":
      return (
        <div className="w-20 space-y-0.5">
          <div className="flex items-center justify-between rounded-t-[10px] border border-black/10 bg-zinc-100 px-2 py-1.5 dark:border-white/10 dark:bg-zinc-800">
            <div className="h-1 w-8 rounded-full bg-zinc-400/50 dark:bg-zinc-500/40" />
            <div className="h-2 w-2 rounded-sm bg-zinc-400/40 dark:bg-zinc-500/30" />
          </div>
          <div className="sk-mini-anim sk-mini-collapse rounded-b-[10px] border border-t-0 border-black/10 bg-zinc-50 dark:border-white/10 dark:bg-zinc-900">
            <div className="space-y-1 px-2 py-1.5">
              <div className="h-1 w-full rounded-full bg-zinc-200/80 dark:bg-zinc-700/50" />
              <div className="h-1 w-3/4 rounded-full bg-zinc-200/80 dark:bg-zinc-700/50" />
            </div>
          </div>
        </div>
      );
    case "crossfade":
      return (
        <div className="relative h-10 w-16 overflow-hidden rounded-[14px] border border-black/10 shadow-[0_14px_28px_-22px_rgba(15,23,42,0.9)] dark:border-white/10">
          <div className="sk-mini-anim sk-mini-crossfade-a absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-100 to-violet-200 dark:from-indigo-500/30 dark:to-violet-500/20">
            <div className="h-4 w-4 rounded-full bg-indigo-400/60 dark:bg-indigo-300/30" />
          </div>
          <div className="sk-mini-crossfade-b flex items-center justify-center bg-gradient-to-br from-pink-100 to-rose-200 dark:from-pink-500/30 dark:to-rose-500/20">
            <div className="h-3 w-6 rounded-[6px] bg-pink-400/60 dark:bg-pink-300/30" />
          </div>
        </div>
      );
    case "slide-swap":
      return (
        <div className={`${previewPanelClass} sk-mini-slide-swap h-9 w-14 rounded-[14px] bg-gradient-to-r from-sky-100 to-indigo-100 dark:from-sky-500/25 dark:to-indigo-500/18`}>
          <div className="absolute inset-2 border border-white/50 dark:border-white/10 rounded-[8px]" />
        </div>
      );
    case "morph-transition":
      return (
        <div className="sk-mini-anim sk-mini-morph-trans shadow-[0_14px_28px_-22px_rgba(99,102,241,0.8)]" />
      );
    case "text-reveal":
      return (
        <div className="relative overflow-hidden rounded-[14px] border border-white/10 bg-zinc-900 px-3 py-2.5 shadow-[0_18px_34px_-26px_rgba(0,0,0,0.9)]">
          <div className="space-y-1">
            {[0, 0.15, 0.3].map((d) => (
              <div
                key={d}
                className="sk-mini-anim sk-mini-text-reveal h-1.5 rounded-full"
                style={{
                  animationDelay: `${d}s`,
                  width: d === 0.3 ? 24 : d === 0.15 ? 40 : 48,
                  background: d === 0 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>
        </div>
      );
    case "underline-draw":
      return (
        <div className="flex gap-3">
          {["Home", "Blog"].map((t, i) => (
            <div key={t} className="relative">
              <span className="text-[10px] font-medium tracking-wide text-foreground">{t}</span>
              <div
                className="sk-mini-anim sk-mini-underline mt-0.5 h-[2px] w-full bg-foreground"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
            </div>
          ))}
        </div>
      );
    case "progress-bar":
      return (
        <div className="w-16 space-y-1.5">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div className="sk-mini-anim sk-mini-progress h-full rounded-full" />
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div className="sk-mini-anim sk-mini-progress h-full rounded-full" style={{ animationDelay: "0.3s" }} />
          </div>
        </div>
      );
    case "elastic-scale":
      return (
        <div className={`${previewPanelClass} sk-mini-elastic flex h-10 w-10 items-center justify-center rounded-[16px] bg-gradient-to-br from-emerald-200 to-teal-300 dark:from-emerald-500/28 dark:to-teal-500/22`}>
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-200">!</span>
        </div>
      );
    case "pulse-ring":
      return (
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="sk-mini-anim sk-mini-pulse-ring h-2.5 w-2.5 rounded-full bg-green-500" />
            <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">Online</span>
          </div>
          <span className="sk-mini-anim sk-mini-pulse-ring h-2.5 w-2.5 rounded-full bg-blue-500" style={{ animationDelay: "0.5s" }} />
          <span className="sk-mini-anim sk-mini-pulse-ring h-2.5 w-2.5 rounded-full bg-red-500" style={{ animationDelay: "1s" }} />
        </div>
      );
    case "zoom-in":
      return (
        <div className={`${previewPanelClass} sk-mini-zoom-in h-11 w-11 rounded-[16px] bg-gradient-to-br from-sky-200 to-blue-300 dark:from-sky-500/28 dark:to-blue-500/22`}>
          <div className="absolute inset-2 border border-white/50 dark:border-white/10 rounded-[10px]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white/60 dark:bg-white/15" />
        </div>
      );
    case "marquee-scroll":
      return (
        <div className="w-20 overflow-hidden">
          <div className="sk-mini-anim sk-mini-marquee flex whitespace-nowrap gap-3">
            {["A", "B", "C", "D", "A", "B", "C", "D"].map((l, i) => (
              <span key={i} className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[6px] bg-purple-200/90 text-[8px] font-bold text-purple-600 dark:bg-purple-500/25 dark:text-purple-300">{l}</span>
            ))}
          </div>
        </div>
      );
    case "shimmer":
      return (
        <div className="w-20 space-y-1.5">
          {[1, 0.7, 0.5].map((w, i) => (
            <div key={i} className="relative overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700" style={{ height: 6, width: `${w * 100}%` }}>
              <div className="sk-mini-anim sk-mini-shimmer absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/60 to-transparent dark:via-white/10" style={{ animationDelay: `${i * 0.2}s` }} />
            </div>
          ))}
        </div>
      );
    case "pulse":
      return (
        <div className="flex items-center gap-3">
          <div className="sk-mini-anim sk-mini-pulse-beat h-7 w-7 rounded-xl bg-gradient-to-br from-red-400 to-rose-500 shadow-[0_12px_24px_-18px_rgba(239,68,68,0.9)] dark:from-red-500/50 dark:to-rose-500/40">
            <div className="flex h-full items-center justify-center">
              <span className="text-[8px] font-bold text-white">3</span>
            </div>
          </div>
          <div className="sk-mini-anim sk-mini-pulse-beat h-2 w-2 rounded-full bg-red-500" style={{ animationDelay: "0.5s" }} />
        </div>
      );
    case "elastic-snap":
      return (
        <div className="sk-mini-anim sk-mini-elastic-snap rounded-[10px] bg-foreground px-5 py-2 text-[10px] uppercase tracking-[0.2em] text-background shadow-[0_14px_28px_-22px_rgba(15,23,42,0.9)]">
          Snap
        </div>
      );
    case "border-trace":
      return (
        <div className="relative h-10 w-16">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 64 40">
            <rect x="1" y="1" width="62" height="38" rx="8" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="200" className="sk-mini-anim sk-mini-border-draw" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[9px] text-indigo-500 dark:text-indigo-400">Hover</span>
          </div>
        </div>
      );
    case "glitch-text":
      return (
        <div className="relative overflow-hidden rounded-[14px] border border-cyan-500/15 bg-[#0a0e14] px-3 py-2 shadow-[0_18px_34px_-26px_rgba(0,200,255,0.5)]">
          <span className="sk-mini-anim sk-mini-glitch text-[11px] font-bold tracking-wider text-cyan-400">GLITCH</span>
        </div>
      );
    case "text-scramble":
      return (
        <div className="overflow-hidden rounded-[14px] border border-cyan-500/15 bg-[#0a0e14] px-3 py-2 shadow-[0_18px_34px_-26px_rgba(0,200,255,0.5)]">
          <span className="sk-mini-anim sk-mini-scramble font-mono text-[11px] font-bold tracking-wider text-cyan-400">DECODE</span>
        </div>
      );
    case "tilt-3d":
      return (
        <div style={{ perspective: 400 }}>
          <div className={`${previewPanelClass} sk-mini-anim sk-mini-tilt h-11 w-16 rounded-[12px] bg-gradient-to-br from-indigo-200 to-violet-300 dark:from-indigo-500/30 dark:to-violet-500/25 shadow-[0_14px_28px_-22px_rgba(99,102,241,0.7)]`}>
            <div className="absolute left-2 right-2 top-2 h-1 rounded-full bg-white/50 dark:bg-white/15" />
            <div className="absolute bottom-2 left-2 h-1.5 w-6 rounded-full bg-white/40 dark:bg-white/10" />
            <div className="absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full bg-white/60 dark:bg-white/20" />
          </div>
        </div>
      );
    case "confetti-burst":
      return (
        <div className="relative flex items-center justify-center">
          <div className="rounded-[10px] bg-foreground px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-background shadow-[0_14px_28px_-22px_rgba(15,23,42,0.9)]">Click</div>
          <span className="sk-mini-anim sk-mini-confetti-1 absolute h-1.5 w-1.5 rounded-full bg-pink-500" />
          <span className="sk-mini-anim sk-mini-confetti-2 absolute h-1.5 w-1.5 rounded-sm bg-yellow-400" />
          <span className="sk-mini-anim sk-mini-confetti-3 absolute h-1.5 w-1.5 rounded-full bg-blue-500" />
          <span className="sk-mini-anim sk-mini-confetti-4 absolute h-1.5 w-1.5 rounded-sm bg-green-400" />
          <span className="sk-mini-anim sk-mini-confetti-5 absolute h-1.5 w-1.5 rounded-full bg-purple-500" />
        </div>
      );
    case "scroll-page-turn":
      return (
        <div className="relative h-12 w-16">
          <div className={`${previewPanelClass} sk-mini-page-turn absolute inset-0 rounded-[12px] bg-gradient-to-br from-slate-700 to-slate-800`}>
            <div className="absolute left-2 right-2 top-2 h-1 rounded-full bg-white/30" />
            <div className="absolute bottom-2 left-2 h-1.5 w-7 rounded-full bg-white/20" />
          </div>
          <div className="absolute inset-0 -z-10 flex items-center justify-center rounded-[12px] border border-black/10 bg-gradient-to-br from-indigo-700 to-indigo-800 dark:border-white/10">
            <div className="h-1 w-6 rounded-full bg-white/25" />
          </div>
        </div>
      );
    case "scroll-peel-away":
      return (
        <div className="relative h-12 w-16">
          <div className={`${previewPanelClass} sk-mini-peel absolute inset-0 rounded-[12px] bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-300 dark:to-zinc-400`}>
            <div className="absolute left-2 right-2 top-2 h-1 rounded-full bg-black/10" />
            <div className="absolute bottom-2 left-2 h-1.5 w-7 rounded-full bg-black/8" />
          </div>
          <div className="absolute inset-0 -z-10 flex items-center justify-center rounded-[12px] border border-black/10 bg-gradient-to-br from-amber-50 to-orange-100 dark:border-white/10 dark:from-amber-200 dark:to-orange-200">
            <div className="h-1 w-6 rounded-full bg-amber-800/20" />
          </div>
        </div>
      );
    case "border-beam":
      return (
        <div className="relative h-10 w-16 overflow-hidden rounded-lg">
          <div className="sk-mini-anim sk-mini-beam-spin absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 [background:conic-gradient(transparent_0deg_300deg,#7c3aed_330deg,#38bdf8_355deg,transparent_360deg)]" />
          <div className="absolute inset-[2px] flex items-center justify-center rounded-[6px] bg-zinc-900">
            <span className="text-[9px] text-zinc-400">Beam</span>
          </div>
        </div>
      );
    case "handwriting-reveal":
      return (
        <svg className="h-10 w-16 text-zinc-700 dark:text-zinc-200" viewBox="0 0 64 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path pathLength="1" className="sk-mini-anim sk-mini-write" d="M14 8 C13 16 12 26 12 32 M12 22 C17 17 23 18 24 23 C25 28 24 31 23 32 M38 20 C38 25 38 29 38 32 M38 12 C38 12.5 38 13 38 13.5 M52 10 C53 18 53 24 52 28" />
        </svg>
      );
    case "hand-drawn-annotation":
      return (
        <div className="relative">
          <span className="sk-mini-anim sk-mini-ann rounded-sm px-0.5 text-[10px] text-zinc-700 [background:linear-gradient(rgba(255,176,0,0.35)_0_0)_left_center/0%_70%_no-repeat] dark:text-zinc-200">
            annotate
          </span>
          <span className="sk-mini-anim sk-mini-ann-note absolute -bottom-4 left-6 font-serif text-[8px] italic text-amber-700">
            this!
          </span>
        </div>
      );
    default:
      return (
        <div className="h-10 w-10 rounded-full bg-zinc-200 animate-pulse dark:bg-zinc-700" />
      );
  }
}
