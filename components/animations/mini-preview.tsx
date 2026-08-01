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
      /* Animations-index card canvas: subtle dot grid so the motion reads
         against a drafting-table surface instead of a flat void. */
      .sk-preview-canvas {
        background-image: radial-gradient(circle, rgba(15, 23, 42, 0.08) 1px, transparent 1px);
        background-size: 16px 16px;
      }
      .dark .sk-preview-canvas {
        background-image: radial-gradient(circle, rgba(255, 255, 255, 0.09) 1px, transparent 1px);
      }

      /* Hover replays: the card remounts the preview on pointer enter, so
         loops restart from zero when the user actually engages a card. */

      @media (prefers-reduced-motion: reduce) {
        .sk-mini-anim {
          animation: none !important;
          transition: none !important;
        }
        [class*="sk-mini-"] {
          animation-play-state: paused !important;
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

      /* --- Simulated-cursor choreography for pointer-driven effects.
             A tiny cursor dot tours the scene while the effect responds in
             sync, so pointer interactions read as a looping screen recording. */
      .sk-mini-cur {
        position: absolute;
        width: 9px;
        height: 9px;
        border-radius: 9999px;
        background: #fff;
        box-shadow: 0 0 0 1.5px rgba(15, 23, 42, 0.85), 0 2px 6px rgba(15, 23, 42, 0.35);
        z-index: 3;
        pointer-events: none;
      }

      @keyframes sk-mini-trailpath {
        0%, 100% { transform: translate(0px, 0px); }
        25% { transform: translate(36px, -9px); }
        50% { transform: translate(56px, 8px); }
        75% { transform: translate(22px, 13px); }
      }
      .sk-mini-trail-cur { animation: sk-mini-trailpath 2.8s ease-in-out infinite; }
      .sk-mini-trail-d1 { animation: sk-mini-trailpath 2.8s ease-in-out infinite 0.12s; }
      .sk-mini-trail-d2 { animation: sk-mini-trailpath 2.8s ease-in-out infinite 0.24s; }
      .sk-mini-trail-d3 { animation: sk-mini-trailpath 2.8s ease-in-out infinite 0.36s; }

      @keyframes sk-mini-aurapath {
        0%, 100% { transform: translate(6px, 4px); }
        40% { transform: translate(44px, 12px); }
        70% { transform: translate(26px, -4px); }
      }
      .sk-mini-aura-cur { animation: sk-mini-aurapath 3.2s ease-in-out infinite; }
      .sk-mini-aura-glow { animation: sk-mini-aurapath 3.2s ease-in-out infinite 0.08s; }

      @keyframes sk-mini-proxcur {
        0%, 100% { transform: translate(-4px, 16px); }
        45%, 62% { transform: translate(34px, 8px); }
      }
      .sk-mini-prox-cur { animation: sk-mini-proxcur 3.2s ease-in-out infinite; }
      @keyframes sk-mini-proxitem {
        0%, 22%, 88%, 100% { opacity: 0.14; filter: blur(3px); }
        45%, 64% { opacity: 1; filter: blur(0); }
      }
      .sk-mini-prox-item { animation: sk-mini-proxitem 3.2s ease-in-out infinite; }

      @keyframes sk-mini-repelcur {
        0%, 100% { transform: translate(-12px, 8px); }
        50% { transform: translate(62px, 8px); }
      }
      .sk-mini-repel-cur { animation: sk-mini-repelcur 3.2s ease-in-out infinite; }
      @keyframes sk-mini-repel-a {
        0%, 20%, 80%, 100% { transform: translateY(0) scale(1); }
        10%, 90% { transform: translateY(-8px) scale(1.12); }
      }
      @keyframes sk-mini-repel-b {
        0%, 12%, 36%, 64%, 88%, 100% { transform: translateY(0) scale(1); }
        23%, 77% { transform: translateY(-8px) scale(1.12); }
      }
      @keyframes sk-mini-repel-c {
        0%, 24%, 48%, 76%, 100% { transform: translateY(0) scale(1); }
        36%, 64% { transform: translateY(-8px) scale(1.12); }
      }
      @keyframes sk-mini-repel-d {
        0%, 38%, 62%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-8px) scale(1.12); }
      }
      .sk-mini-repel-1 { animation: sk-mini-repel-a 3.2s ease-in-out infinite; display: inline-block; }
      .sk-mini-repel-2 { animation: sk-mini-repel-b 3.2s ease-in-out infinite; display: inline-block; }
      .sk-mini-repel-3 { animation: sk-mini-repel-c 3.2s ease-in-out infinite; display: inline-block; }
      .sk-mini-repel-4 { animation: sk-mini-repel-d 3.2s ease-in-out infinite; display: inline-block; }

      @keyframes sk-mini-distcur {
        0%, 100% { transform: translate(4px, 6px); }
        50% { transform: translate(50px, 28px); }
      }
      .sk-mini-dist-cur { animation: sk-mini-distcur 3.2s ease-in-out infinite; }
      @keyframes sk-mini-disttile {
        0%, 14%, 86%, 100% { transform: none; }
        35% { transform: skewX(-7deg) scaleY(1.06); }
        55% { transform: skewX(5deg) scaleY(0.95); }
        70% { transform: skewX(-2deg) scaleY(1.02); }
      }
      .sk-mini-dist-tile { animation: sk-mini-disttile 3.2s ease-in-out infinite; }

      @keyframes sk-mini-parcur {
        0%, 100% { transform: translate(6px, 38px); }
        50% { transform: translate(62px, 38px); }
      }
      .sk-mini-par-cur { animation: sk-mini-parcur 3.6s ease-in-out infinite; }
      @keyframes sk-mini-parback {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(-4px); }
      }
      @keyframes sk-mini-parmid {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(-9px); }
      }
      @keyframes sk-mini-parfront {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(-15px); }
      }
      .sk-mini-par-back { animation: sk-mini-parback 3.6s ease-in-out infinite; }
      .sk-mini-par-mid { animation: sk-mini-parmid 3.6s ease-in-out infinite; }
      .sk-mini-par-front { animation: sk-mini-parfront 3.6s ease-in-out infinite; }

      @keyframes sk-mini-dragcur {
        0%, 100% { transform: translate(-8px, -12px); }
        18% { transform: translate(0px, 0px); }
        55% { transform: translate(28px, 7px); }
        72% { transform: translate(38px, -14px); }
      }
      .sk-mini-drag-cur { animation: sk-mini-dragcur 3.6s ease-in-out infinite; }
      @keyframes sk-mini-dragcard {
        0%, 18% { transform: translate(0, 0) rotate(0); }
        55% { transform: translate(28px, 7px) rotate(9deg); }
        66% { transform: translate(-5px, -2px) rotate(-3deg); }
        76% { transform: translate(3px, 1px) rotate(1.5deg); }
        84%, 100% { transform: translate(0, 0) rotate(0); }
      }
      .sk-mini-drag-card { animation: sk-mini-dragcard 3.6s ease-in-out infinite; }

      @keyframes sk-mini-ctxcur {
        0%, 100% { transform: translate(2px, 4px); }
        35%, 70% { transform: translate(40px, 16px); }
      }
      .sk-mini-ctx-cur { animation: sk-mini-ctxcur 3.6s ease-in-out infinite; }
      @keyframes sk-mini-ctxdot {
        0%, 32%, 74%, 100% { opacity: 1; transform: scale(1); }
        40%, 68% { opacity: 0; transform: scale(0.4); }
      }
      .sk-mini-ctx-dot { animation: sk-mini-ctxdot 3.6s ease-in-out infinite; }
      @keyframes sk-mini-ctxpill {
        0%, 34%, 72%, 100% { opacity: 0; transform: scale(0.5); }
        42%, 66% { opacity: 1; transform: scale(1); }
      }
      .sk-mini-ctx-pill { animation: sk-mini-ctxpill 3.6s ease-in-out infinite; transform-origin: center; }
    `}</style>
  );
}

export function MiniPreview({ slug }: { slug: string }) {
  switch (slug) {
    case "fade-in-up":
      return (
        <div className="relative h-16 w-24 overflow-hidden rounded-md border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-zinc-950">
          <div className="absolute inset-x-2 top-2 space-y-1">
            <div className="h-1 w-10 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <div className="h-1 w-14 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <div className="sk-mini-anim sk-mini-fade-up absolute inset-x-2 bottom-2 flex items-center gap-1.5 rounded-[4px] border border-zinc-200 bg-white px-1.5 py-1 shadow-sm dark:border-white/10 dark:bg-zinc-800">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            <span className="text-[7px] font-medium leading-none text-zinc-700 dark:text-zinc-200">Saved</span>
          </div>
        </div>
      );
    case "scale-in":
      return (
        <div className="relative h-16 w-24 overflow-hidden rounded-md border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-950">
          <div className="absolute inset-0 bg-zinc-900/20 dark:bg-black/45" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="sk-mini-anim sk-mini-scale-in w-16 rounded-[5px] border border-zinc-200 bg-white p-1.5 shadow-lg dark:border-white/10 dark:bg-zinc-800">
              <div className="h-1 w-8 rounded-full bg-zinc-500 dark:bg-zinc-300" />
              <div className="mt-1 h-1 w-11 rounded-full bg-zinc-200 dark:bg-zinc-600" />
              <div className="mt-1.5 flex gap-1">
                <span className="h-2.5 w-6 rounded-[3px] bg-blue-600" />
                <span className="h-2.5 w-6 rounded-[3px] border border-zinc-300 dark:border-zinc-600" />
              </div>
            </div>
          </div>
        </div>
      );
    case "hover-lift":
      return (
        <div className="sk-mini-anim sk-mini-hover-lift w-16 overflow-hidden rounded-[5px] border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-800">
          <div className="h-6 w-full bg-[linear-gradient(160deg,#1e3a5f,#2d6a8f_50%,#e8a854)]" />
          <div className="space-y-1 p-1.5">
            <div className="h-1 w-9 rounded-full bg-zinc-500 dark:bg-zinc-300" />
            <div className="h-1 w-6 rounded-full bg-zinc-200 dark:bg-zinc-600" />
          </div>
        </div>
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
        <div className="w-20 rounded-[5px] border border-zinc-200 bg-white p-1.5 dark:border-white/10 dark:bg-zinc-800">
          <div className="flex items-center gap-1.5">
            <span className="h-4 w-4 shrink-0 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="flex-1 space-y-1">
              <div className="h-1 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-1 w-3/5 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
            </div>
          </div>
          <div className="mt-1.5 h-5 animate-pulse rounded-[3px] bg-zinc-200 dark:bg-zinc-700" />
        </div>
      );
    case "fade-in-down":
      return (
        <div className="w-20">
          <div className="flex items-center gap-1 rounded-t-[4px] border border-zinc-200 bg-white px-1.5 py-1 dark:border-white/10 dark:bg-zinc-800">
            <span className="h-1 w-4 rounded-full bg-zinc-500 dark:bg-zinc-300" />
            <span className="ml-auto h-1 w-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          </div>
          <div className="sk-mini-anim sk-mini-fade-down mt-0.5 space-y-1 rounded-b-[4px] border border-zinc-200 bg-white p-1.5 shadow-md dark:border-white/10 dark:bg-zinc-800">
            <div className="h-1 w-10 rounded-full bg-zinc-400 dark:bg-zinc-500" />
            <div className="h-1 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-1 w-11 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </div>
      );
    case "slide-in-left":
      return (
        <div className="relative h-16 w-24 overflow-hidden rounded-md border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
          <div className="absolute right-2 top-2 h-1 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="absolute right-2 top-5 h-1 w-6 rounded-full bg-zinc-100 dark:bg-zinc-800" />
          <div className="sk-mini-anim sk-mini-slide-left absolute bottom-0 left-0 top-0 w-9 space-y-1 border-r border-zinc-200 bg-zinc-50 p-1.5 shadow-md dark:border-white/10 dark:bg-zinc-800">
            <div className="h-1 w-5 rounded-full bg-zinc-500 dark:bg-zinc-300" />
            <div className="h-1 w-6 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <div className="h-1 w-4 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          </div>
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
        <div className="h-16 w-24 space-y-1 overflow-hidden rounded-md border border-zinc-200 bg-zinc-50 p-1.5 dark:border-white/10 dark:bg-zinc-950">
          {[0, 0.3, 0.6].map((d) => (
            <div
              key={d}
              className="sk-mini-anim sk-mini-reveal flex items-center gap-1.5 rounded-[3px] border border-zinc-200 bg-white p-1 dark:border-white/10 dark:bg-zinc-800"
              style={{ animationDelay: `${d}s` }}
            >
              <span className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-zinc-200 dark:bg-zinc-700" />
              <span className="h-1 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
          ))}
        </div>
      );
    case "parallax-float":
      return (
        <div className="relative h-16 w-24 overflow-hidden rounded-md border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
          <div className="sk-mini-anim sk-mini-float-a absolute -right-1 -top-1 h-9 w-9 rounded-full bg-[linear-gradient(160deg,#2d6a8f,#e8a854)] opacity-80" />
          <div className="sk-mini-anim sk-mini-float-b absolute bottom-2 left-2 w-12 rounded-[4px] border border-zinc-200 bg-white p-1 shadow-md dark:border-white/10 dark:bg-zinc-800">
            <div className="h-1 w-8 rounded-full bg-zinc-500 dark:bg-zinc-300" />
            <div className="mt-0.5 h-1 w-5 rounded-full bg-zinc-200 dark:bg-zinc-600" />
          </div>
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
        <div className="flex items-center gap-2 rounded-[5px] bg-zinc-900 px-3 py-2 dark:bg-white">
          <span className="inline-flex gap-1">
            {["-0.32s", "-0.16s", "0s"].map((d) => (
              <span
                key={d}
                className="sk-mini-anim sk-mini-dot h-1.5 w-1.5 rounded-full bg-white dark:bg-zinc-900"
                style={{ animationDelay: d }}
              />
            ))}
          </span>
          <span className="text-[8px] font-medium leading-none text-zinc-300 dark:text-zinc-600">Loading</span>
        </div>
      );
    case "background-gradient-shift":
      return (
        <div
          className="sk-mini-anim sk-mini-bg-shift relative h-14 w-24 overflow-hidden rounded-md border border-white/30 dark:border-white/10"
          style={{
            background: "linear-gradient(-45deg, #1e3a5f, #4c1d95, #0e7490, #155e75)",
            backgroundSize: "400% 400%",
          }}
        >
          <div className="absolute bottom-2 left-2 space-y-1">
            <div className="h-1.5 w-12 rounded-full bg-white/85" />
            <div className="h-1 w-8 rounded-full bg-white/45" />
          </div>
        </div>
      );
    case "stagger-children":
      return (
        <div className="w-20 space-y-1 rounded-[5px] border border-zinc-200 bg-white p-1.5 shadow-md dark:border-white/10 dark:bg-zinc-800">
          {[0, 0.15, 0.3, 0.45].map((d, i) => (
            <div
              key={d}
              className="sk-mini-anim sk-mini-stagger flex items-center gap-1.5"
              style={{ animationDelay: `${d}s` }}
            >
              <span className="h-2 w-2 shrink-0 rounded-[2px] bg-zinc-200 dark:bg-zinc-600" />
              <span
                className="h-1 rounded-full bg-zinc-300 dark:bg-zinc-500"
                style={{ width: [40, 30, 44, 24][i] }}
              />
            </div>
          ))}
        </div>
      );
    case "blur-in":
      return (
        <div className="h-14 w-20 overflow-hidden rounded-[5px] border border-zinc-200 dark:border-white/10">
          <div className="sk-mini-anim sk-mini-blur-in h-full w-full bg-[linear-gradient(200deg,#312e52,#7c5f9e_55%,#e8a0a0)]" />
        </div>
      );
    case "spotlight-card":
      return (
        <div className="relative h-13 w-20 overflow-hidden rounded-[8px] border border-white/10 bg-zinc-900 shadow-[0_20px_32px_-26px_rgba(0,0,0,0.95)]">
          <div className="absolute left-2 top-2 h-1 w-9 rounded-full bg-white/25" />
          <div className="absolute left-2 top-4.5 h-1 w-12 rounded-full bg-white/15" />
          <div className="absolute bottom-2 left-2 h-2.5 w-7 rounded-[3px] bg-white/10" />
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
        <div className="sk-mini-anim sk-mini-magnetic rounded-[6px] bg-foreground px-4 py-2 text-[9px] font-medium uppercase tracking-[0.16em] text-background shadow-[0_16px_28px_-24px_rgba(15,23,42,0.9)]">
          Buy now
        </div>
      );
    case "bounce-in":
      return (
        <div className="relative">
          <div className="flex h-9 w-9 items-center justify-center rounded-[7px] border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-800">
            <span className="block h-3.5 w-3 rounded-[2px] border-2 border-zinc-400 border-t-[3px] dark:border-zinc-400" />
          </div>
          <span className="sk-mini-anim sk-mini-bounce absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[7px] font-bold leading-none text-white">
            3
          </span>
        </div>
      );
    case "slide-in-right":
      return (
        <div className="relative h-16 w-24 overflow-hidden rounded-md border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
          <div className="absolute left-2 top-2 h-1 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="absolute left-2 top-5 h-1 w-6 rounded-full bg-zinc-100 dark:bg-zinc-800" />
          <div className="sk-mini-anim sk-mini-slide-right absolute bottom-0 right-0 top-0 w-10 space-y-1 border-l border-zinc-200 bg-zinc-50 p-1.5 shadow-md dark:border-white/10 dark:bg-zinc-800">
            <div className="h-1 w-6 rounded-full bg-zinc-500 dark:bg-zinc-300" />
            <div className="h-3 w-full rounded-[3px] bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-1 w-5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          </div>
        </div>
      );
    case "rotate-in":
      return (
        <div className="sk-mini-anim sk-mini-rotate flex h-9 w-9 items-center justify-center rounded-[8px] bg-zinc-900 shadow-md dark:bg-white">
          <span className="text-[13px] font-bold leading-none text-white dark:text-zinc-900">S</span>
        </div>
      );
    case "shake":
      return (
        <div className="sk-mini-anim sk-mini-shake border-2 border-red-400/60 bg-red-50 px-3 py-1.5 text-[10px] text-red-500 dark:bg-red-900/20 dark:border-red-500/30 dark:text-red-400">
          Error
        </div>
      );
    case "flip-card":
      return (
        <div style={{ perspective: 300 }}>
          <div className={`${previewPanelClass} sk-mini-flip h-12 w-9 rounded-[6px] bg-white p-1 dark:bg-zinc-800`}>
            <div className="h-5 w-full rounded-[3px] bg-[linear-gradient(160deg,#1e3a5f,#2d6a8f_50%,#e8a854)]" />
            <div className="mt-1 h-1 w-5 rounded-full bg-zinc-400 dark:bg-zinc-400" />
            <div className="mt-0.5 h-1 w-4 rounded-full bg-zinc-200 dark:bg-zinc-600" />
          </div>
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
        <div className="relative h-14 w-24 overflow-hidden rounded-[14px] border border-cyan-400/20 bg-zinc-950">
          <span className="sk-mini-aura-glow absolute left-0 top-0 h-9 w-9 -translate-x-1/2 rounded-full bg-cyan-300/25 blur-[6px]" />
          <span className="sk-mini-aura-glow absolute left-0 top-0 h-5 w-5 rounded-full border border-cyan-200/40 bg-cyan-300/20" style={{ marginLeft: 2, marginTop: 2 }} />
          <span className="sk-mini-cur sk-mini-aura-cur left-0 top-0" style={{ width: 7, height: 7, marginLeft: 8, marginTop: 8 }} />
        </div>
      );
    case "cursor-trail":
      return (
        <div className="relative h-14 w-24 overflow-hidden rounded-[14px] border border-cyan-400/20 bg-zinc-950">
          <span className="sk-mini-trail-d3 absolute left-3 top-6 h-1 w-1 rounded-full bg-cyan-300/30" />
          <span className="sk-mini-trail-d2 absolute left-3 top-6 h-1.5 w-1.5 rounded-full bg-cyan-300/45" />
          <span className="sk-mini-trail-d1 absolute left-3 top-6 h-2 w-2 rounded-full bg-cyan-300/70" />
          <span className="sk-mini-cur sk-mini-trail-cur left-3 top-6" style={{ width: 8, height: 8 }} />
        </div>
      );
    case "proximity-reveal":
      return (
        <div className="relative h-14 w-24 overflow-hidden border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
          <div className="sk-mini-prox-item absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-1">
            <span className="block h-2 w-12 rounded-full bg-zinc-800 dark:bg-zinc-100" />
            <span className="block h-1.5 w-8 rounded-full bg-zinc-400 dark:bg-zinc-500" />
          </div>
          <span className="sk-mini-cur sk-mini-prox-cur left-1 top-1" />
        </div>
      );
    case "text-repulsion":
      return (
        <div className="relative flex h-14 w-24 items-center justify-center gap-0.5 overflow-hidden border border-zinc-200 bg-white text-lg font-bold text-zinc-950 dark:border-white/10 dark:bg-zinc-900 dark:text-white">
          <span className="sk-mini-repel-1">T</span>
          <span className="sk-mini-repel-2">Y</span>
          <span className="sk-mini-repel-3">P</span>
          <span className="sk-mini-repel-4">E</span>
          <span className="sk-mini-cur sk-mini-repel-cur left-1 top-4" />
        </div>
      );
    case "image-distortion":
      return (
        <div className="relative h-14 w-24 overflow-hidden border border-white/10">
          <div className="sk-mini-dist-tile h-full w-full bg-[linear-gradient(135deg,#0f172a,#0891b2_44%,#fb923c)]">
            <div className="h-full w-full bg-[radial-gradient(circle_at_60%_42%,rgba(255,255,255,0.42),transparent_26%)]" />
          </div>
          <span className="sk-mini-cur sk-mini-dist-cur left-1 top-1" />
        </div>
      );
    case "parallax-layers":
      return (
        <div className="relative h-14 w-24 overflow-hidden border border-white/10 bg-zinc-950">
          <span className="sk-mini-par-back absolute left-4 top-5 h-7 w-7 rounded-full bg-cyan-300/30" />
          <span className="sk-mini-par-mid absolute left-10 top-2 h-10 w-11 border border-white/25 bg-white/10" />
          <span className="sk-mini-par-front absolute bottom-2 right-3 h-4 w-9 bg-orange-300" />
          <span className="sk-mini-cur sk-mini-par-cur left-1 top-1" style={{ width: 7, height: 7 }} />
        </div>
      );
    case "drag-physics":
      return (
        <div className="relative h-14 w-24 overflow-hidden border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
          <span className="sk-mini-drag-card absolute left-5 top-4 h-7 w-7 border border-zinc-950 bg-white shadow-[4px_4px_0_rgba(15,23,42,0.14)] dark:border-white dark:bg-zinc-800" />
          <span className="sk-mini-cur sk-mini-drag-cur left-7 top-6" style={{ width: 8, height: 8 }} />
        </div>
      );
    case "context-cursor":
      return (
        <div className="relative h-14 w-24 overflow-hidden border border-white/10 bg-zinc-950">
          <span className="absolute left-8 top-3 h-8 w-10 border border-white/15 bg-white/5" />
          <span className="sk-mini-ctx-cur absolute left-1 top-1">
            <span className="sk-mini-cur sk-mini-ctx-dot" style={{ position: "relative", display: "block" }} />
            <span className="sk-mini-ctx-pill absolute -left-2 -top-1 rounded-full bg-cyan-300 px-1.5 py-0.5 text-[8px] font-medium text-zinc-950">
              View
            </span>
          </span>
        </div>
      );
    case "counter-roll":
      return (
        <div className="flex flex-col items-center gap-1 rounded-[5px] border border-zinc-200 bg-white px-3 py-2 dark:border-white/10 dark:bg-zinc-800">
          <div className="flex gap-0.5 font-mono text-base font-semibold tabular-nums">
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
          <span className="text-[7px] uppercase tracking-[0.22em] text-zinc-400">Users</span>
        </div>
      );
    case "morph-shape":
      return (
        <div className="relative h-16 w-24 overflow-hidden rounded-md border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
          <div className="sk-mini-anim sk-mini-morph absolute -right-2 -top-2 h-11 w-11 bg-gradient-to-br from-teal-300 to-cyan-400 opacity-70 dark:from-teal-500/45 dark:to-cyan-500/35" />
          <div className="absolute bottom-2 left-2 space-y-1">
            <div className="h-1.5 w-12 rounded-full bg-zinc-800 dark:bg-zinc-100" />
            <div className="h-1 w-8 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          </div>
        </div>
      );
    case "fade-out-down":
      return (
        <div className="relative h-16 w-24 overflow-hidden rounded-md border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-zinc-950">
          <div className="absolute inset-x-2 top-2 space-y-1">
            <div className="h-1 w-10 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <div className="h-1 w-14 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <div className="sk-mini-anim sk-mini-fade-out-down absolute inset-x-2 bottom-2 flex items-center gap-1.5 rounded-[4px] border border-zinc-200 bg-white px-1.5 py-1 shadow-sm dark:border-white/10 dark:bg-zinc-800">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
            <span className="text-[7px] font-medium leading-none text-zinc-700 dark:text-zinc-200">Dismissed</span>
          </div>
        </div>
      );
    case "scale-out":
      return (
        <div className="relative h-16 w-24 overflow-hidden rounded-md border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-950">
          <div className="absolute inset-0 bg-zinc-900/10 dark:bg-black/30" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="sk-mini-anim sk-mini-scale-out w-16 rounded-[5px] border border-zinc-200 bg-white p-1.5 shadow-lg dark:border-white/10 dark:bg-zinc-800">
              <div className="flex items-center justify-between">
                <div className="h-1 w-8 rounded-full bg-zinc-500 dark:bg-zinc-300" />
                <span className="text-[8px] leading-none text-zinc-400">×</span>
              </div>
              <div className="mt-1 h-1 w-11 rounded-full bg-zinc-200 dark:bg-zinc-600" />
            </div>
          </div>
        </div>
      );
    case "slide-out-right":
      return (
        <div className="relative h-16 w-24 overflow-hidden rounded-md border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
          <div className="absolute left-2 top-2 h-1 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div className="absolute left-2 top-5 h-1 w-6 rounded-full bg-zinc-100 dark:bg-zinc-800" />
          <div className="sk-mini-anim sk-mini-slide-out-r absolute bottom-0 right-0 top-0 w-10 space-y-1 border-l border-zinc-200 bg-zinc-50 p-1.5 shadow-md dark:border-white/10 dark:bg-zinc-800">
            <div className="h-1 w-6 rounded-full bg-zinc-500 dark:bg-zinc-300" />
            <div className="h-3 w-full rounded-[3px] bg-zinc-200 dark:bg-zinc-700" />
          </div>
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
        <div className="relative h-13 w-20">
          <div className="relative h-12 w-20 overflow-hidden rounded-[5px] border border-zinc-200 dark:border-white/10">
            <div className="sk-mini-anim sk-mini-crossfade-a absolute inset-0 bg-[linear-gradient(160deg,#1e3a5f,#2d6a8f_50%,#e8a854)]" />
            <div className="sk-mini-crossfade-b h-full w-full bg-[linear-gradient(200deg,#312e52,#7c5f9e_55%,#e8a0a0)]" />
          </div>
          <div className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 gap-1">
            <span className="h-1 w-1 rounded-full bg-zinc-400" />
            <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          </div>
        </div>
      );
    case "slide-swap":
      return (
        <div className="relative h-12 w-20 overflow-hidden rounded-[5px] border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
          <div className="sk-mini-anim sk-mini-slide-swap absolute inset-1 rounded-[3px] bg-[linear-gradient(160deg,#1e3a5f,#2d6a8f_50%,#e8a854)]">
            <div className="absolute bottom-1 left-1 h-1 w-7 rounded-full bg-white/70" />
          </div>
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
        <div className="sk-mini-anim sk-mini-elastic flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
          <span className="text-sm font-light leading-none">+</span>
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
        <div className="h-14 w-20 overflow-hidden rounded-[5px] border border-zinc-200 dark:border-white/10">
          <div className="sk-mini-anim sk-mini-zoom-in h-full w-full bg-[linear-gradient(160deg,#1e3a5f,#2d6a8f_45%,#e8a854_85%,#d97742)]" />
        </div>
      );
    case "marquee-scroll":
      return (
        <div className="w-22 overflow-hidden border-y border-zinc-200 py-1 dark:border-white/10">
          <div className="sk-mini-anim sk-mini-marquee flex whitespace-nowrap gap-2">
            {["ACME", "NOVA", "ORBIT", "ZEN", "ACME", "NOVA", "ORBIT", "ZEN"].map((brand, i) => (
              <span
                key={i}
                className="shrink-0 text-[7px] font-bold tracking-[0.14em] text-zinc-400 dark:text-zinc-500"
              >
                {brand}
              </span>
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
