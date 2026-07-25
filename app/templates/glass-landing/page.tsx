"use client";

export const dynamic = "force-static";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Check,
  Compass,
  Download,
  Gem,
  Layers,
  Menu,
  Minus,
  Moon,
  Pause,
  Play,
  Plus,
  Quote,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Sliders,
  Sparkles,
  Volume2,
  Waves,
  X,
} from "lucide-react";
import { Albert_Sans, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});
const sans = Albert_Sans({ subsets: ["latin"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Engine", href: "#engine" },
  { label: "Spaces", href: "#spaces" },
  { label: "Pricing", href: "#pricing" },
  { label: "Questions", href: "#faq" },
];

const PRESS = [
  "Resonance",
  "The Mix Review",
  "Audio Frontier",
  "Pitch & Tone",
  "Studio Weekly",
  "Waveform",
  "The Listening Room",
];

// Deterministic waveform for the hero player (runs at build under force-static).
const WAVEFORM = Array.from({ length: 58 }, (_, i) => {
  const envelope = Math.sin((i / 57) * Math.PI);
  const texture = 0.5 + 0.5 * Math.abs(Math.sin(i * 1.27) * Math.cos(i * 0.63));
  return Math.round(16 + envelope * texture * 80);
});
const WAVE_PROGRESS = 0.36;

const FEATURES = [
  {
    icon: Compass,
    label: "HEAD-TRACKED",
    title: "The stage holds still",
    body: "Turn your head and the singer stays center, the cello stays stage-left. Motion sensors keep the room fixed in place, the way a real one would.",
  },
  {
    icon: Sliders,
    label: "REAL-TIME",
    title: "Mastered as it plays",
    body: "Loudness, width, and depth balance live against a reference curve. No bounce, no render queue, no waiting around to hear the change land.",
  },
  {
    icon: Layers,
    label: "STEMS",
    title: "Every part, placed",
    body: "Pull the vocal up front, push the pads to the back wall, lift the strings overhead. Each stem gets real coordinates in three dimensions.",
  },
  {
    icon: Gem,
    label: "LOSSLESS",
    title: "Nothing thrown away",
    body: "Twenty-four bit source, up to 192 kHz, rendered without a single re-encode. What you master is exactly what reaches the listener.",
  },
  {
    icon: Boxes,
    label: "ROOMS",
    title: "Borrow any acoustics",
    body: "Model a late-night jazz club, a stone cathedral, or the inside of a moving car. Swap the room and the whole mix breathes differently.",
  },
  {
    icon: Download,
    label: "OFFLINE",
    title: "Spatial on the flight",
    body: "Cache full head-tracked mixes straight to the device. Thirty-eight thousand feet, airplane mode, still surrounded on every side.",
  },
];

const STAGE_SOURCES = [
  { label: "Vocals", top: "20%", left: "50%", delay: "0s" },
  { label: "Piano", top: "40%", left: "23%", delay: "0.7s" },
  { label: "Strings", top: "34%", left: "77%", delay: "1.2s" },
  { label: "Bass", top: "72%", left: "37%", delay: "1.7s" },
  { label: "Percussion", top: "70%", left: "67%", delay: "2.3s" },
];

const ENGINE_POINTS = [
  "Object-based mixing, not fixed channels",
  "Sub-degree placement resolution",
  "Binaural render for any pair of headphones",
];

const METRICS = [
  { value: "12 ms", label: "motion-to-sound latency, measured head-tracked end to end" },
  { value: "128", label: "independent audio objects placed in a single session" },
  { value: "192 kHz", label: "lossless rendering ceiling, 24-bit, never re-encoded" },
  { value: "3,200+", label: "hours of spatial catalog, remastered and growing weekly" },
];

const TESTIMONIALS = [
  {
    quote:
      "I ran our last record through the cathedral profile and heard reverb tails I had been missing for a decade. It is the first spatial tool that stops feeling like a trick.",
    name: "Mara Oyelaran",
    role: "Mastering Engineer, Goldline",
  },
  {
    quote:
      "Head-tracking is the part nobody oversells enough. You turn, the mix stays put, and a plain pair of headphones becomes a room you are standing inside.",
    name: "Devin Ashcroft",
    role: "Producer, Lower Third",
  },
  {
    quote:
      "We release every single in stereo and Nocturne spatial now. Listeners feel the difference before they can name it, and they stay to the very last bar.",
    name: "Yuki Tanaka",
    role: "A&R, Nightglass Records",
  },
];

const PLANS = [
  {
    name: "Listener",
    monthly: 0,
    yearly: 0,
    blurb: "Immersive playback on the headphones you already own.",
    features: [
      "Head-tracked spatial playback",
      "Lossless streaming to 48 kHz",
      "Six signature room profiles",
      "Offline cache, twenty tracks",
    ],
    cta: "Start listening",
    featured: false,
  },
  {
    name: "Studio",
    monthly: 18,
    yearly: 15,
    blurb: "Compose, place, and master a full mix in real space.",
    features: [
      "Everything in Listener",
      "24-bit rendering up to 192 kHz",
      "128 audio objects per session",
      "Every room profile, plus custom rooms",
      "Real-time mastering suite",
      "Spatial and stereo stem export",
    ],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    name: "Label",
    monthly: null,
    yearly: null,
    blurb: "Ship spatial across an entire back catalog.",
    features: [
      "Everything in Studio",
      "Batch spatial rendering",
      "Catalog retention analytics",
      "SSO and shared team seats",
      "A dedicated mastering engineer",
    ],
    cta: "Talk to us",
    featured: false,
  },
];

const FAQS = [
  {
    q: "Do I need special headphones?",
    a: "Any stereo headphones work. Head-tracking uses the motion sensors already in modern earbuds and headsets, or your phone held steady in front of you. There is no proprietary hardware to buy, ever.",
  },
  {
    q: "Will spatial change how my stereo master sounds?",
    a: "Never. Your stereo master stays untouched. Nocturne renders a separate spatial layer beside it, and you can A/B the two instantly at any point in the session.",
  },
  {
    q: "What can I export?",
    a: "Dolby Atmos ADM BWF, binaural stereo, and a standard stereo fold-down in a single pass. Stems carry their spatial coordinates with them, so a mix reopens anywhere with its geometry intact.",
  },
  {
    q: "Is the Listener plan really free?",
    a: "Yes, free for as long as you want it, including head-tracked playback and lossless streaming. Creators begin on a 14-day Studio trial that needs no card up front.",
  },
];

const FOOTER_COLS = [
  { title: "Product", links: ["Engine", "Room profiles", "Mastering", "Spatial export", "Desktop app"] },
  { title: "Listen", links: ["Catalog", "New releases", "Sessions", "Gift a year"] },
  { title: "Company", links: ["Studio", "Careers", "Press kit", "Contact"] },
  { title: "Legal", links: ["Privacy", "Terms", "Licensing", "Credits"] },
];

// Signature glass surfaces reused across the page.
const GLASS =
  "border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.02] backdrop-blur-xl shadow-[0_30px_80px_-32px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.16)]";
const GLASS_SOFT =
  "border border-white/10 bg-white/[0.035] backdrop-blur-xl shadow-[0_20px_50px_-30px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.10)]";

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function GlassLandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [yearly, setYearly] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const played = Math.floor(WAVEFORM.length * WAVE_PROGRESS);

  return (
    <div
      className={`${sans.className} relative min-h-screen bg-[#050D0F] text-[#E7F2F0] antialiased selection:bg-[#7DE3E0] selection:text-[#04191A]`}
    >
      <TemplateBackButton variant="glass" />

      <style>{`
        @keyframes noc-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
        @keyframes noc-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes noc-drift { 0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.75; } 50% { transform: translate(4%, -3%) scale(1.1); opacity: 1; } }
        @keyframes noc-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes noc-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes noc-sonar { to { transform: rotate(360deg); } }
        @keyframes noc-ping { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(2.8); opacity: 0; } }
        @keyframes noc-eq { 0%, 100% { transform: scaleY(0.3); } 50% { transform: scaleY(1); } }
        .noc-rise { opacity: 0; animation: noc-rise 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .noc-float { animation: noc-float 7s ease-in-out infinite; }
        .noc-drift { animation: noc-drift 17s ease-in-out infinite; }
        .noc-drift-slow { animation: noc-drift 24s ease-in-out infinite; }
        .noc-marquee { animation: noc-marquee 36s linear infinite; }
        .noc-pulse { animation: noc-pulse 2.4s ease-in-out infinite; }
        .noc-sonar { animation: noc-sonar 9s linear infinite; }
        .noc-ping { animation: noc-ping 3.2s ease-out infinite; }
        .noc-eq { animation: noc-eq 900ms ease-in-out infinite; transform-origin: bottom; }
        @media (prefers-reduced-motion: reduce) {
          .noc-rise { animation: none; opacity: 1; }
          .noc-float, .noc-drift, .noc-drift-slow, .noc-marquee, .noc-pulse, .noc-sonar, .noc-ping, .noc-eq { animation: none; }
        }
      `}</style>

      {/* ── Aurora backdrop ─────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(60% 50% at 14% 8%, rgba(16,185,129,0.18), transparent 60%)," +
              "radial-gradient(55% 45% at 86% 14%, rgba(34,211,238,0.15), transparent 60%)," +
              "radial-gradient(75% 60% at 50% 104%, rgba(125,227,224,0.13), transparent 66%)",
          }}
        />
        <div className="noc-drift absolute -left-32 top-[-12%] h-[46vw] w-[46vw] rounded-full bg-emerald-500/20 blur-[130px]" />
        <div className="noc-drift-slow absolute right-[-14%] top-[6%] h-[42vw] w-[42vw] rounded-full bg-cyan-500/[0.16] blur-[140px]" />
        <div className="noc-drift absolute bottom-[-18%] left-1/3 h-[44vw] w-[44vw] rounded-full bg-teal-400/[0.14] blur-[150px]" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 80% at 50% 0%, transparent 52%, rgba(2,7,8,0.82) 100%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* ── Nav ─────────────────────────────────────────────── */}
        <header className="sticky top-0 z-40 px-4 pt-4">
          <div className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl ${GLASS} px-4 py-3 md:px-6`}>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="relative grid h-8 w-8 place-items-center rounded-xl border border-white/15 bg-gradient-to-br from-[#7DE3E0]/30 to-emerald-400/10">
                <Moon className="h-4 w-4 text-[#7DE3E0]" strokeWidth={2} />
              </span>
              <span className="text-lg font-semibold tracking-tight">Nocturne</span>
            </a>

            <nav className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-[#E7F2F0]/60 transition-colors hover:text-[#E7F2F0]"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <a href="#top" className="text-sm text-[#E7F2F0]/60 transition-colors hover:text-[#E7F2F0]">
                Sign in
              </a>
              <a
                href="#pricing"
                className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7DE3E0] to-emerald-300 px-4 py-2 text-sm font-semibold text-[#04191A] shadow-[0_8px_30px_-8px_rgba(125,227,224,0.6)] transition-transform hover:-translate-y-0.5"
              >
                Get started
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="text-[#E7F2F0] md:hidden"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {menuOpen && (
            <div className={`mx-auto mt-2 max-w-6xl rounded-2xl ${GLASS} p-4 md:hidden`}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-sm text-[#E7F2F0]/75"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#pricing"
                onClick={() => setMenuOpen(false)}
                className="mt-3 block rounded-full bg-gradient-to-r from-[#7DE3E0] to-emerald-300 px-4 py-2.5 text-center text-sm font-semibold text-[#04191A]"
              >
                Get started
              </a>
            </div>
          )}
        </header>

        {/* ── Hero ────────────────────────────────────────────── */}
        <section id="top" className="mx-auto grid max-w-6xl gap-14 px-5 pb-20 pt-14 md:grid-cols-[1.02fr_0.98fr] md:items-center md:px-8 md:pb-28 md:pt-20">
          <div>
            <p
              className={`${mono.className} noc-rise mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] tracking-[0.18em] text-[#7DE3E0]`}
            >
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              SPATIAL AUDIO, MASTERED LIVE
            </p>
            <h1 className={`${display.className} noc-rise text-[3.1rem] font-medium leading-[0.98] tracking-tight md:text-[4.6rem]`} style={{ animationDelay: "80ms" }}>
              Your music,
              <br />
              <em className="text-[#7DE3E0]">unfurled</em>
              <br />
              into space.
            </h1>
            <p
              className="noc-rise mt-7 max-w-md text-base leading-relaxed text-[#E7F2F0]/60 md:text-lg"
              style={{ animationDelay: "160ms" }}
            >
              Nocturne renders every stem into a room you can walk through — head-tracked, lossless, and
              mastered as it plays. Put on any headphones and step inside the mix.
            </p>
            <div className="noc-rise mt-9 flex flex-wrap items-center gap-4" style={{ animationDelay: "240ms" }}>
              <a
                href="#pricing"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7DE3E0] to-emerald-300 px-6 py-3.5 text-sm font-semibold text-[#04191A] shadow-[0_14px_44px_-12px_rgba(125,227,224,0.65)] transition-transform hover:-translate-y-0.5"
              >
                Start listening
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#engine"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-[#E7F2F0] backdrop-blur-md transition-colors hover:bg-white/10"
              >
                Hear a demo
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <p className={`${mono.className} noc-rise mt-8 text-[11px] tracking-wide text-[#E7F2F0]/35`} style={{ animationDelay: "320ms" }}>
              FREE FOREVER FOR LISTENERS · NO CARD · ANY HEADPHONES
            </p>
          </div>

          {/* Hero player — pure CSS product art */}
          <div className="noc-rise relative" style={{ animationDelay: "200ms" }}>
            <div aria-hidden className="absolute -inset-8 bg-[#7DE3E0]/10 blur-3xl" />
            <div className="noc-float relative">
              <div className={`relative rounded-[1.75rem] ${GLASS} p-4`}>
                {/* Artwork */}
                <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 30% 24%, rgba(125,227,224,0.55), transparent 55%)," +
                        "radial-gradient(circle at 74% 82%, rgba(52,211,153,0.5), transparent 55%)," +
                        "linear-gradient(135deg, #06171A 0%, #0A2A2C 100%)",
                    }}
                  />
                  {/* Concentric soundstage rings */}
                  <div aria-hidden className="absolute inset-0 grid place-items-center">
                    {[88, 62, 38].map((size) => (
                      <div
                        key={size}
                        className="absolute rounded-full border border-white/15"
                        style={{ width: `${size}%`, height: `${size}%` }}
                      />
                    ))}
                    <div className="absolute h-3 w-3 rounded-full bg-[#7DE3E0] shadow-[0_0_30px_8px_rgba(125,227,224,0.7)]" />
                  </div>
                  {/* Now-playing chip + equalizer */}
                  <div className={`${mono.className} absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-2.5 py-1 text-[10px] tracking-[0.14em] text-[#E7F2F0]/80 backdrop-blur-md`}>
                    <span className="flex h-3 items-end gap-[2px]">
                      {[0, 1, 2, 3].map((bar) => (
                        <span
                          key={bar}
                          className={`w-[2px] rounded-sm bg-[#7DE3E0] ${playing ? "noc-eq" : ""}`}
                          style={{ height: "70%", animationDelay: `${bar * 130}ms` }}
                        />
                      ))}
                    </span>
                    NOW PLAYING
                  </div>
                  <span className={`${mono.className} absolute right-3 top-3 rounded-full border border-white/15 bg-black/25 px-2.5 py-1 text-[10px] tracking-[0.12em] text-[#7DE3E0] backdrop-blur-md`}>
                    ATMOS
                  </span>
                  {/* Title scrim */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className={`${display.className} text-2xl italic leading-none`}>Meridian</p>
                    <p className="mt-1 text-xs text-[#E7F2F0]/60">Vesper Lang · Nocturnes, Vol. II</p>
                  </div>
                </div>

                {/* Waveform */}
                <div className="px-1 pt-4">
                  <div className="flex h-12 items-center gap-[3px]">
                    {WAVEFORM.map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-full"
                        style={{
                          height: `${h}%`,
                          backgroundColor: i <= played ? "#7DE3E0" : "rgba(231,242,240,0.16)",
                        }}
                      />
                    ))}
                  </div>
                  <div className={`${mono.className} mt-2 flex justify-between text-[10px] text-[#E7F2F0]/45`}>
                    <span>1:24</span>
                    <span>3:58</span>
                  </div>
                </div>

                {/* Transport */}
                <div className="mt-2 flex items-center justify-between px-1 pb-1">
                  <button type="button" aria-label="Shuffle" className="text-[#E7F2F0]/50 transition-colors hover:text-[#E7F2F0]">
                    <Shuffle className="h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-4">
                    <button type="button" aria-label="Previous track" className="text-[#E7F2F0]/80 transition-colors hover:text-[#E7F2F0]">
                      <SkipBack className="h-5 w-5" fill="currentColor" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlaying(!playing)}
                      aria-label={playing ? "Pause" : "Play"}
                      className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#7DE3E0] to-emerald-300 text-[#04191A] shadow-[0_10px_30px_-8px_rgba(125,227,224,0.7)] transition-transform hover:scale-105"
                    >
                      {playing ? <Pause className="h-5 w-5" fill="currentColor" /> : <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" />}
                    </button>
                    <button type="button" aria-label="Next track" className="text-[#E7F2F0]/80 transition-colors hover:text-[#E7F2F0]">
                      <SkipForward className="h-5 w-5" fill="currentColor" />
                    </button>
                  </div>
                  <button type="button" aria-label="Repeat" className="text-[#E7F2F0]/50 transition-colors hover:text-[#E7F2F0]">
                    <Repeat className="h-4 w-4" />
                  </button>
                </div>

                {/* Spatial footer */}
                <div className="mt-3 flex items-center justify-between border-t border-white/10 px-1 pt-3">
                  <span className={`${mono.className} flex items-center gap-1.5 text-[10px] tracking-[0.12em] text-[#E7F2F0]/45`}>
                    <Waves className="h-3.5 w-3.5 text-[#7DE3E0]" />
                    HEAD-TRACKED · LDAC
                  </span>
                  <span className="flex items-center gap-1.5 text-[#E7F2F0]/45">
                    <Volume2 className="h-3.5 w-3.5" />
                    <span className="h-1 w-16 rounded-full bg-white/10">
                      <span className="block h-1 w-2/3 rounded-full bg-[#7DE3E0]" />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Press marquee ───────────────────────────────────── */}
        <section className="overflow-hidden border-y border-white/[0.06] py-7">
          <p className={`${mono.className} mb-5 text-center text-[10px] tracking-[0.24em] text-[#E7F2F0]/30`}>
            HEARD ABOUT IN
          </p>
          <div className="noc-marquee flex w-max items-center gap-14 pr-14">
            {[...PRESS, ...PRESS].map((name, i) => (
              <span key={i} className={`${display.className} whitespace-nowrap text-xl italic text-[#E7F2F0]/30`}>
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* ── Features ────────────────────────────────────────── */}
        <section id="engine" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className={`${mono.className} mb-4 flex items-center gap-2 text-xs tracking-[0.22em] text-[#7DE3E0]`}>
                <Waves className="h-4 w-4" />
                THE ENGINE
              </p>
              <h2 className={`${display.className} max-w-xl text-4xl font-medium leading-[1.02] md:text-5xl`}>
                Six pieces, tuned for <em className="text-[#7DE3E0]">careful ears.</em>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[#E7F2F0]/50">
              One engine, split into the parts that matter — so spatial audio finally sounds like a place
              you are in, not an effect switched on over the top.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <article
                key={feature.title}
                className={`group rounded-2xl ${GLASS_SOFT} p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20`}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-white/15 to-white/[0.02] transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="h-5 w-5 text-[#7DE3E0]" strokeWidth={1.75} />
                  </span>
                  <span className={`${mono.className} text-[10px] tracking-[0.18em] text-[#E7F2F0]/30`}>
                    {feature.label}
                  </span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-[#E7F2F0]/55">{feature.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Spatial showcase ────────────────────────────────── */}
        <section id="spaces" className="border-y border-white/[0.06]">
          <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 md:grid-cols-2 md:items-center md:px-8 md:py-28">
            <div>
              <p className={`${mono.className} mb-4 text-xs tracking-[0.22em] text-[#7DE3E0]`}>THE SOUNDSTAGE</p>
              <h2 className={`${display.className} text-4xl font-medium leading-[1.02] md:text-5xl`}>
                A room you can <em className="text-[#7DE3E0]">stand inside.</em>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[#E7F2F0]/60">
                Nocturne places every source on a real stage around the listener. The rings show a live
                mix — five instruments positioned in space, sweeping past your ears as the track plays.
                Move, and the geometry moves with you.
              </p>
              <ul className="mt-8 space-y-3">
                {ENGINE_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-[#E7F2F0]/75">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[#7DE3E0]/30 bg-[#7DE3E0]/10">
                      <Check className="h-3 w-3 text-[#7DE3E0]" strokeWidth={2.5} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* CSS-drawn soundstage */}
            <div className="relative">
              <div aria-hidden className="absolute inset-6 rounded-full bg-[#7DE3E0]/10 blur-3xl" />
              <div className={`relative mx-auto aspect-square w-full max-w-md rounded-full ${GLASS_SOFT}`}>
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  {/* sonar sweep */}
                  <div
                    className="noc-sonar absolute inset-0"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent 0deg, rgba(125,227,224,0.22) 42deg, transparent 80deg)",
                    }}
                  />
                </div>
                {/* rings */}
                <div aria-hidden className="absolute inset-0 grid place-items-center">
                  {[92, 68, 44, 20].map((size) => (
                    <div
                      key={size}
                      className="absolute rounded-full border border-white/10"
                      style={{ width: `${size}%`, height: `${size}%` }}
                    />
                  ))}
                  {/* axis hairlines */}
                  <div className="absolute h-[92%] w-px bg-white/[0.06]" />
                  <div className="absolute h-px w-[92%] bg-white/[0.06]" />
                </div>
                {/* listener */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-[#7DE3E0]/40 bg-[#7DE3E0]/15 shadow-[0_0_30px_6px_rgba(125,227,224,0.4)]">
                    <Compass className="h-4 w-4 text-[#7DE3E0]" />
                  </span>
                  <span className={`${mono.className} mt-1.5 block text-[9px] tracking-[0.14em] text-[#E7F2F0]/45`}>YOU</span>
                </div>
                {/* sources */}
                {STAGE_SOURCES.map((source) => (
                  <div
                    key={source.label}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ top: source.top, left: source.left }}
                  >
                    <span className="relative flex items-center justify-center">
                      <span
                        className="noc-ping absolute h-3 w-3 rounded-full bg-[#7DE3E0]/50"
                        style={{ animationDelay: source.delay }}
                      />
                      <span className="relative h-2.5 w-2.5 rounded-full bg-[#7DE3E0] shadow-[0_0_14px_3px_rgba(125,227,224,0.6)]" />
                    </span>
                    <span className={`${mono.className} mt-1.5 block whitespace-nowrap text-center text-[9px] tracking-[0.1em] text-[#E7F2F0]/60`}>
                      {source.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Metrics ─────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <div className={`grid gap-px overflow-hidden rounded-2xl ${GLASS_SOFT} sm:grid-cols-2 lg:grid-cols-4`}>
            {METRICS.map((metric) => (
              <div key={metric.value} className="bg-white/[0.01] p-7">
                <p className={`${display.className} text-4xl font-medium tracking-tight text-[#7DE3E0] md:text-5xl`}>
                  {metric.value}
                </p>
                <p className="mt-3 text-[13px] leading-snug text-[#E7F2F0]/55">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Testimonials ────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <p className={`${mono.className} mb-12 text-xs tracking-[0.22em] text-[#7DE3E0]`}>FROM THE STUDIOS</p>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial) => (
              <figure key={testimonial.name} className={`flex flex-col rounded-2xl ${GLASS_SOFT} p-7`}>
                <Quote className="h-6 w-6 text-[#7DE3E0]/50" fill="currentColor" strokeWidth={0} />
                <blockquote className={`${display.className} mt-4 flex-1 text-xl italic leading-[1.35] text-[#E7F2F0]/90`}>
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-6 border-t border-white/10 pt-4">
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className={`${mono.className} mt-1 text-[11px] tracking-wide text-[#E7F2F0]/40`}>
                    {testimonial.role}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── Pricing ─────────────────────────────────────────── */}
        <section id="pricing" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className={`${mono.className} mb-4 text-xs tracking-[0.22em] text-[#7DE3E0]`}>PRICING</p>
              <h2 className={`${display.className} text-4xl font-medium leading-[1.02] md:text-5xl`}>
                Free to listen. <em className="text-[#7DE3E0]">Fair to create.</em>
              </h2>
            </div>
            <div className={`${mono.className} flex items-center gap-3 text-xs`}>
              <span className={yearly ? "text-[#E7F2F0]/40" : "text-[#E7F2F0]"}>MONTHLY</span>
              <button
                type="button"
                role="switch"
                aria-checked={yearly}
                onClick={() => setYearly(!yearly)}
                className="relative h-6 w-11 rounded-full border border-white/20 bg-white/5 transition-colors"
              >
                <span
                  className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#7DE3E0] transition-all ${
                    yearly ? "left-[calc(100%-1.25rem)]" : "left-1"
                  }`}
                />
              </button>
              <span className={yearly ? "text-[#E7F2F0]" : "text-[#E7F2F0]/40"}>
                YEARLY <span className="text-[#7DE3E0]">-17%</span>
              </span>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-2xl p-8 ${
                  plan.featured
                    ? `${GLASS} border-[#7DE3E0]/30`
                    : GLASS_SOFT
                }`}
              >
                {plan.featured && (
                  <span className={`${mono.className} absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7DE3E0] to-emerald-300 px-3 py-1 text-[10px] font-medium tracking-[0.12em] text-[#04191A]`}>
                    <Sparkles className="h-3 w-3" />
                    MOST LOVED
                  </span>
                )}
                <h3 className={`${mono.className} mb-2 text-sm tracking-[0.16em]`}>{plan.name.toUpperCase()}</h3>
                <p className="mb-6 min-h-10 text-sm leading-relaxed text-[#E7F2F0]/50">{plan.blurb}</p>
                <div className="mb-8">
                  {plan.monthly === null ? (
                    <span className={`${display.className} text-4xl italic text-[#E7F2F0]`}>Custom</span>
                  ) : (
                    <span className="flex items-end gap-1">
                      <span className="mt-2 self-start text-lg text-[#E7F2F0]/50">$</span>
                      <span className={`${mono.className} text-5xl font-medium leading-none tracking-tight`}>
                        {yearly ? plan.yearly : plan.monthly}
                      </span>
                      <span className={`${mono.className} mb-1 text-sm text-[#E7F2F0]/45`}>/mo</span>
                    </span>
                  )}
                </div>
                <ul className="mb-10 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-[#E7F2F0]/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#7DE3E0]" strokeWidth={2.5} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#top"
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all ${
                    plan.featured
                      ? "bg-gradient-to-r from-[#7DE3E0] to-emerald-300 text-[#04191A] shadow-[0_12px_36px_-12px_rgba(125,227,224,0.6)] hover:-translate-y-0.5"
                      : "border border-white/15 bg-white/5 text-[#E7F2F0] hover:bg-white/10"
                  }`}
                >
                  {plan.cta}
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <section id="faq" className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-[0.8fr_1.2fr] md:px-8 md:py-28">
          <div>
            <p className={`${mono.className} mb-4 text-xs tracking-[0.22em] text-[#7DE3E0]`}>QUESTIONS</p>
            <h2 className={`${display.className} text-4xl font-medium leading-[1.02] md:text-5xl`}>
              Asked, <em className="text-[#7DE3E0]">answered.</em>
            </h2>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#E7F2F0]/50">
              Anything else and a real engineer answers the shared inbox within a business day.
            </p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const open = openFaq === index;
              return (
                <div key={faq.q} className={`rounded-2xl ${GLASS_SOFT} px-5`}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-base font-medium">{faq.q}</span>
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-[#7DE3E0]">
                      {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  {open && <p className="pb-6 pr-6 text-sm leading-relaxed text-[#E7F2F0]/55">{faq.a}</p>}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Final CTA ───────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 60% 80% at 50% 120%, rgba(125,227,224,0.3), transparent 62%)," +
                "radial-gradient(ellipse 50% 60% at 20% 0%, rgba(16,185,129,0.18), transparent 60%)",
            }}
          />
          <div className="relative mx-auto max-w-4xl px-5 py-24 text-center md:px-8 md:py-32">
            <p className={`${mono.className} mb-6 text-xs tracking-[0.22em] text-[#7DE3E0]`}>PRESS PLAY</p>
            <h2 className={`${display.className} mx-auto max-w-2xl text-4xl font-medium leading-[1.02] md:text-6xl`}>
              Put on your headphones.
              <br />
              <em className="text-[#7DE3E0]">Step inside the mix.</em>
            </h2>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#pricing"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#7DE3E0] to-emerald-300 px-7 py-4 text-sm font-semibold text-[#04191A] shadow-[0_16px_50px_-14px_rgba(125,227,224,0.7)] transition-transform hover:-translate-y-0.5"
              >
                Open Nocturne free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <span className={`${mono.className} text-[11px] tracking-wide text-[#E7F2F0]/35`}>
                LISTENER PLAN, FREE FOREVER
              </span>
            </div>
          </div>
        </section>

        {/* ── Footer ──────────────────────────────────────────── */}
        <footer className="border-t border-white/[0.06]">
          <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
            <div className="grid gap-10 md:grid-cols-[1.3fr_repeat(4,0.7fr)]">
              <div>
                <a href="#top" className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-xl border border-white/15 bg-gradient-to-br from-[#7DE3E0]/30 to-emerald-400/10">
                    <Moon className="h-4 w-4 text-[#7DE3E0]" strokeWidth={2} />
                  </span>
                  <span className="text-lg font-semibold tracking-tight">Nocturne</span>
                </a>
                <p className="mt-5 max-w-[16rem] text-sm leading-relaxed text-[#E7F2F0]/40">
                  Spatial audio for people who do their best listening after dark.
                </p>
              </div>
              {FOOTER_COLS.map((col) => (
                <nav key={col.title}>
                  <p className={`${mono.className} mb-4 text-[11px] tracking-[0.18em] text-[#E7F2F0]/35`}>
                    {col.title.toUpperCase()}
                  </p>
                  {col.links.map((link) => (
                    <a
                      key={link}
                      href="#top"
                      className="block py-1.5 text-sm text-[#E7F2F0]/55 transition-colors hover:text-[#E7F2F0]"
                    >
                      {link}
                    </a>
                  ))}
                </nav>
              ))}
            </div>
            <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-6">
              <p className={`${mono.className} text-[11px] text-[#E7F2F0]/30`}>© 2026 NOCTURNE AUDIO</p>
              <p className={`${mono.className} flex items-center gap-2 text-[11px] tracking-[0.14em] text-[#E7F2F0]/30`}>
                <span className="noc-pulse h-1.5 w-1.5 rounded-full bg-[#7DE3E0]" />
                MASTERED IN THE DARK
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
