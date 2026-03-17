"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks                                                       */
/* ------------------------------------------------------------------ */

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
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                   */
/* ------------------------------------------------------------------ */

function CardIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  );
}

function FlipIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
  );
}

function SparkleIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0l1.2 7.8L21 12l-7.8 1.2L12 21l-1.2-7.8L3 12l7.8-1.2z" />
    </svg>
  );
}

function ArrowRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function CounterIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8M8 10h8M8 14h5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Number Ticker Component                                            */
/* ------------------------------------------------------------------ */

function NumberTicker({ value, label }: { value: string; label: string }) {
  const [displayed, setDisplayed] = useState("0");

  useEffect(() => {
    const target = parseInt(value.replace(/,/g, ""), 10);
    if (isNaN(target)) { setDisplayed(value); return; }
    let current = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setDisplayed(current.toLocaleString());
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <div className="font-mono text-3xl md:text-4xl text-[#d4a574] font-bold tabular-nums">
        {displayed}
      </div>
      <div className="text-white/50 text-xs uppercase tracking-widest mt-2">{label}</div>
    </div>
  );
}
/* ------------------------------------------------------------------ */
/*  Main Showcase                                                      */
/* ------------------------------------------------------------------ */

export default function CardFlipShowcaseContent() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeCard, setActiveCard] = useState(0);

  return (
    <div className="min-h-screen bg-[#0a0e27] text-white">
      {/* ---- 1. Hero Section ---- */}
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#d4a574]/5 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-5xl mx-auto text-center" style={{ perspective: "800px" }}>
          <RevealBlock>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d4a574]/30 text-[#d4a574] text-xs tracking-widest uppercase mb-8">
              <SparkleIcon className="w-3 h-3" />
              Animation Style
            </div>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              style={{ textShadow: "0 0 60px rgba(212,165,116,0.2)" }}
            >
              Card Flip
            </h1>
          </RevealBlock>
          <RevealBlock delay={0.2}>
            <p className="mt-6 text-white/50 text-lg max-w-2xl mx-auto">
              3D flip animations meet luxury dark-and-gold design. Perspective transforms,
              number tickers, and shimmer effects for premium interactive experiences.
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* ---- 2. Bank Card Flip Demo ---- */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="flex items-center gap-3 mb-8">
              <CardIcon className="w-5 h-5 text-[#d4a574]" />
              <h2 className="text-2xl md:text-3xl font-bold">Bank Card Flip</h2>
            </div>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <div className="flex flex-col items-center gap-8">
              <div
                className="cursor-pointer"
                style={{ perspective: "1000px" }}
                onClick={() => setIsFlipped(!isFlipped)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setIsFlipped(!isFlipped); }}
                aria-label={isFlipped ? "Show card front" : "Show card back"}
              >
                <div
                  className="relative w-[340px] h-[200px] md:w-[400px] md:h-[240px] transition-transform duration-700"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#1a1f3a] to-[#141833] border border-[#d4a574]/40 rounded-2xl p-6 flex flex-col justify-between"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[#d4a574] text-xs tracking-[0.2em] uppercase">Premium Card</span>
                      <div className="w-12 h-8 rounded bg-[#d4a574]/30 border border-[#d4a574]/50" />
                    </div>
                    <div>
                      <p className="text-white/90 font-mono text-xl tracking-[0.15em]">4532 **** **** 7890</p>
                      <div className="flex justify-between mt-3">
                        <div>
                          <p className="text-white/40 text-[10px] uppercase tracking-widest">Card Holder</p>
                          <p className="text-white/80 text-sm">STYLEKIT MEMBER</p>
                        </div>
                        <div>
                          <p className="text-white/40 text-[10px] uppercase tracking-widest">Expires</p>
                          <p className="text-white/80 text-sm font-mono">12/28</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Back */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-[#1a1f3a] to-[#141833] border border-[#d4a574]/40 rounded-2xl p-6 flex flex-col justify-center gap-4"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <div className="w-full h-12 bg-[#0a0e27] rounded" />
                    <div className="flex items-center gap-4">
                      <div className="flex-1 h-8 bg-[#0a0e27]/60 rounded" />
                      <div className="px-4 py-1.5 bg-[#d4a574]/20 border border-[#d4a574]/40 rounded text-[#d4a574] font-mono text-sm">
                        CVV: 123
                      </div>
                    </div>
                    <p className="text-white/30 text-[10px] text-center mt-2">Click to flip back</p>
                  </div>
                </div>
              </div>
              <p className="text-white/40 text-sm flex items-center gap-2">
                <FlipIcon className="w-4 h-4" />
                Click the card to flip
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---- 3. Number Ticker / Counter ---- */}
      <section className="px-6 py-16 md:py-24 bg-[#1a1f3a]/30">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="flex items-center gap-3 mb-8">
              <CounterIcon className="w-5 h-5 text-[#d4a574]" />
              <h2 className="text-2xl md:text-3xl font-bold">Number Ticker</h2>
            </div>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "12847", label: "Transactions" },
                { value: "3256", label: "Active Cards" },
                { value: "98", label: "Countries" },
                { value: "4721", label: "Members" },
              ].map((item) => (
                <div key={item.label} className="bg-[#1a1f3a] border border-[#d4a574]/20 rounded-xl p-6">
                  <NumberTicker value={item.value} label={item.label} />
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---- 4. Button Variants ---- */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Button Variants</h2>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap gap-4">
              <button className="group relative px-8 py-3.5 bg-[#d4a574] text-[#0a0e27] font-semibold text-sm tracking-wide rounded-xl shadow-[0_4px_16px_rgba(212,165,116,0.2)] hover:shadow-[0_8px_32px_rgba(212,165,116,0.4)] active:scale-[0.97] transition-all duration-300 overflow-hidden">
                <span className="relative z-10">Primary Gold</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
              <button className="px-8 py-3.5 bg-transparent text-[#d4a574] font-semibold text-sm tracking-wide rounded-xl border border-[#d4a574]/40 hover:border-[#d4a574] hover:shadow-[0_0_20px_rgba(212,165,116,0.15)] active:scale-[0.97] transition-all duration-300">
                Secondary Outline
              </button>
              <button className="px-8 py-3.5 bg-[#1a1f3a] text-white/80 font-semibold text-sm tracking-wide rounded-xl border border-white/10 hover:border-[#d4a574]/30 hover:text-[#d4a574] active:scale-[0.97] transition-all duration-300">
                Ghost
              </button>
              <button className="px-8 py-3.5 bg-[#d4a574]/10 text-[#d4a574] font-semibold text-sm tracking-wide rounded-xl hover:bg-[#d4a574]/20 active:scale-[0.97] transition-all duration-300">
                Soft Gold
              </button>
            </div>
          </RevealBlock>
        </div>
      </section>
      {/* ---- 5. Card Grid with Hover Flip ---- */}
      <section className="px-6 py-16 md:py-24 bg-[#1a1f3a]/30">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Card Grid</h2>
          </RevealBlock>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Gold Tier", desc: "Premium membership with exclusive benefits", icon: "G" },
              { title: "Platinum Tier", desc: "Enhanced rewards and priority access", icon: "P" },
              { title: "Diamond Tier", desc: "Ultimate luxury with unlimited perks", icon: "D" },
            ].map((card, i) => (
              <RevealBlock key={card.title} delay={i * 0.1}>
                <div
                  className={`group cursor-pointer bg-[#1a1f3a] border rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 ${activeCard === i ? "border-[#d4a574] shadow-[0_8px_32px_rgba(212,165,116,0.2)]" : "border-[#d4a574]/20 hover:border-[#d4a574]/50"}`}
                  onClick={() => setActiveCard(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setActiveCard(i); }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#d4a574]/10 border border-[#d4a574]/30 flex items-center justify-center text-[#d4a574] font-bold text-lg mb-4">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                  <p className="text-white/50 text-sm">{card.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 6. Input Fields ---- */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Input Fields</h2>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <div className="max-w-md space-y-6">
              <div className="space-y-2">
                <label className="block text-[#d4a574] text-xs uppercase tracking-widest">Card Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-[#0a0e27] border border-[#d4a574]/30 text-white font-mono text-sm placeholder:text-white/30 rounded-xl focus:outline-none focus:border-[#d4a574] focus:shadow-[0_0_0_3px_rgba(212,165,116,0.15)] transition-all duration-300"
                  placeholder="0000 0000 0000 0000"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-[#d4a574] text-xs uppercase tracking-widest">Expiry</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-[#0a0e27] border border-[#d4a574]/30 text-white font-mono text-sm placeholder:text-white/30 rounded-xl focus:outline-none focus:border-[#d4a574] focus:shadow-[0_0_0_3px_rgba(212,165,116,0.15)] transition-all duration-300"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[#d4a574] text-xs uppercase tracking-widest">CVV</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-[#0a0e27] border border-[#d4a574]/30 text-white font-mono text-sm placeholder:text-white/30 rounded-xl focus:outline-none focus:border-[#d4a574] focus:shadow-[0_0_0_3px_rgba(212,165,116,0.15)] transition-all duration-300"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>
      {/* ---- 7. Typography Showcase ---- */}
      <section className="px-6 py-16 md:py-24 bg-[#1a1f3a]/30">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Typography</h2>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <div className="space-y-6">
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Heading / Sans-serif</p>
                <h3 className="text-4xl font-bold tracking-tight">Premium Card Experience</h3>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Body / Sans-serif</p>
                <p className="text-white/70 text-base leading-relaxed max-w-lg">
                  Elegant 3D card animations with smooth perspective transforms. Every interaction
                  feels premium with gold accents and deep navy backgrounds.
                </p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Monospace / Numbers</p>
                <p className="text-[#d4a574] font-mono text-3xl tabular-nums">4532 8901 2345 6789</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Label / Uppercase</p>
                <p className="text-[#d4a574] text-xs uppercase tracking-[0.2em]">Card Holder Name</p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---- 8. Color Palette ---- */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Color Palette</h2>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { name: "Deep Navy", hex: "#0a0e27", text: "text-white" },
                { name: "Dark Blue", hex: "#1a1f3a", text: "text-white" },
                { name: "Gold", hex: "#d4a574", text: "text-[#0a0e27]" },
                { name: "Light Gold", hex: "#f0d9b5", text: "text-[#0a0e27]" },
                { name: "Muted Gold", hex: "#8b7355", text: "text-white" },
              ].map((color) => (
                <div key={color.hex} className="space-y-2">
                  <div
                    className="h-20 rounded-xl border border-white/10"
                    style={{ backgroundColor: color.hex }}
                  />
                  <p className="text-white/80 text-sm font-medium">{color.name}</p>
                  <p className="text-white/40 text-xs font-mono">{color.hex}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---- 9. Animation Keyframes Demo ---- */}
      <section className="px-6 py-16 md:py-24 bg-[#1a1f3a]/30">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Animations</h2>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1a1f3a] border border-[#d4a574]/20 rounded-xl p-6">
                <p className="text-[#d4a574] text-xs uppercase tracking-widest mb-4">card-flip-shimmer</p>
                <div className="relative h-12 bg-[#0a0e27] rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4a574]/20 to-transparent"
                    style={{ animation: "card-flip-shimmer 2s ease-in-out infinite" }}
                  />
                </div>
              </div>
              <div className="bg-[#1a1f3a] border border-[#d4a574]/20 rounded-xl p-6">
                <p className="text-[#d4a574] text-xs uppercase tracking-widest mb-4">card-flip-pulse</p>
                <div
                  className="h-12 bg-[#d4a574] rounded-lg"
                  style={{ animation: "card-flip-pulse 2s ease-in-out infinite" }}
                />
              </div>
              <div className="bg-[#1a1f3a] border border-[#d4a574]/20 rounded-xl p-6">
                <p className="text-[#d4a574] text-xs uppercase tracking-widest mb-4">card-flip-rotate</p>
                <div className="flex justify-center" style={{ perspective: "400px" }}>
                  <div
                    className="w-20 h-12 bg-[#d4a574]/20 border border-[#d4a574]/40 rounded-lg"
                    style={{ animation: "card-flip-rotate 3s ease-in-out infinite alternate", transformStyle: "preserve-3d" }}
                  />
                </div>
              </div>
              <div className="bg-[#1a1f3a] border border-[#d4a574]/20 rounded-xl p-6">
                <p className="text-[#d4a574] text-xs uppercase tracking-widest mb-4">Transition Timing</p>
                <div className="space-y-2 text-white/60 text-sm font-mono">
                  <p>flip: 700ms ease</p>
                  <p>shimmer: 2s ease-in-out</p>
                  <p>hover: 300ms ease</p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>
      {/* ---- 10. Dark Mode Card Layouts ---- */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Card Layouts</h2>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#1a1f3a] border border-[#d4a574]/20 rounded-xl p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#d4a574]/20 flex items-center justify-center">
                    <SparkleIcon className="w-4 h-4 text-[#d4a574]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Balance</p>
                    <p className="text-white/40 text-xs">Updated just now</p>
                  </div>
                </div>
                <p className="text-[#d4a574] font-mono text-3xl font-bold">$24,580.00</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded">+12.5%</span>
                  <span className="text-white/40 text-xs leading-6">vs last month</span>
                </div>
              </div>
              <div className="bg-[#1a1f3a] border border-[#d4a574]/20 rounded-xl p-8 space-y-4">
                <p className="text-[#d4a574] text-xs uppercase tracking-widest">Recent Activity</p>
                {[
                  { name: "Coffee Shop", amount: "-$4.50", time: "2m ago" },
                  { name: "Subscription", amount: "-$12.99", time: "1h ago" },
                  { name: "Transfer In", amount: "+$500.00", time: "3h ago" },
                ].map((tx) => (
                  <div key={tx.name} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-white/80 text-sm">{tx.name}</p>
                      <p className="text-white/30 text-xs">{tx.time}</p>
                    </div>
                    <p className={`font-mono text-sm ${tx.amount.startsWith("+") ? "text-green-400" : "text-white/60"}`}>
                      {tx.amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---- 11. Interactive States Demo ---- */}
      <section className="px-6 py-16 md:py-24 bg-[#1a1f3a]/30">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Interactive States</h2>
          </RevealBlock>
          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <p className="text-[#d4a574] text-xs uppercase tracking-widest">Default</p>
                <div className="bg-[#1a1f3a] border border-[#d4a574]/20 rounded-xl p-4 text-white/70 text-sm">
                  Card at rest state
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[#d4a574] text-xs uppercase tracking-widest">Hover</p>
                <div className="bg-[#1a1f3a] border border-[#d4a574]/60 rounded-xl p-4 text-white/90 text-sm shadow-[0_8px_32px_rgba(212,165,116,0.15)] -translate-y-0.5">
                  Card with hover effect
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[#d4a574] text-xs uppercase tracking-widest">Focus</p>
                <div className="bg-[#1a1f3a] border border-[#d4a574] rounded-xl p-4 text-white text-sm shadow-[0_0_0_3px_rgba(212,165,116,0.2)]">
                  Card with focus ring
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ---- 12. Back to Docs ---- */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <RevealBlock>
            <Link
              href="/styles/card-flip"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4a574] text-[#0a0e27] font-semibold text-sm rounded-xl hover:shadow-[0_8px_32px_rgba(212,165,116,0.3)] transition-all duration-300"
            >
              Back to Card Flip Docs
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </RevealBlock>
        </div>
      </section>

      {/* Global keyframe styles */}
      <style jsx global>{`
        @keyframes card-flip-rotate {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(180deg); }
        }
        @keyframes card-flip-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes card-flip-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
