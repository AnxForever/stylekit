"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ── data ─────────────────────────────────────────────── */
const gardenEntries = [
  { name: "Lavender", type: "Herb", season: "Summer", status: "Blooming" },
  { name: "Rosemary", type: "Herb", season: "Year-round", status: "Thriving" },
  { name: "Heirloom Tomatoes", type: "Vegetable", season: "Summer", status: "Ripening" },
  { name: "Sunflowers", type: "Flower", season: "Late Summer", status: "Budding" },
  { name: "Wild Strawberries", type: "Berry", season: "Spring", status: "Harvesting" },
];

const recipes = [
  { title: "Sourdough Bread", time: "4 hours", difficulty: "Medium", desc: "A rustic loaf with a golden crust, made with wild yeast starter." },
  { title: "Lavender Honey", time: "2 weeks", difficulty: "Easy", desc: "Infuse local honey with dried lavender from the garden." },
  { title: "Berry Preserves", time: "1 hour", difficulty: "Easy", desc: "Wild strawberry jam, sealed in hand-labeled mason jars." },
];

const dailyRoutine = [
  { time: "6:00 AM", task: "Morning walk through the meadow", icon: "sun" },
  { time: "8:00 AM", task: "Feed sourdough starter, prepare dough", icon: "wheat" },
  { time: "10:00 AM", task: "Tend the herb garden", icon: "flower" },
  { time: "2:00 PM", task: "Forage for wild berries and mushrooms", icon: "leaf" },
  { time: "4:00 PM", task: "Afternoon tea with fresh scones", icon: "cup" },
  { time: "7:00 PM", task: "Read by the fireplace", icon: "book" },
];

const seasonalProgress = [
  { label: "Garden planted", pct: 90 },
  { label: "Preserves made", pct: 65 },
  { label: "Quilts finished", pct: 40 },
  { label: "Books read", pct: 75 },
];

const colorTokens = [
  { name: "Grass Green", hex: "#5a8f5a", tw: "bg-[#5a8f5a]", text: "text-white" },
  { name: "Daisy Yellow", hex: "#f5d75f", tw: "bg-[#f5d75f]", text: "text-[#8b7355]" },
  { name: "Earth Brown", hex: "#8b7355", tw: "bg-[#8b7355]", text: "text-white" },
  { name: "Rose Pink", hex: "#d4a0a0", tw: "bg-[#d4a0a0]", text: "text-white" },
  { name: "Cream Linen", hex: "#faf6f0", tw: "bg-[#faf6f0]", text: "text-[#8b7355]" },
  { name: "Sage", hex: "#9caf88", tw: "bg-[#9caf88]", text: "text-white" },
  { name: "Honey", hex: "#daa520", tw: "bg-[#daa520]", text: "text-white" },
  { name: "Mushroom", hex: "#c4b59d", tw: "bg-[#c4b59d]", text: "text-[#5c4033]" },
];

const doRules = [
  "Use warm earth tones: greens, yellows, browns, and soft pinks",
  "Apply rounded corners everywhere (rounded-full, rounded-2xl, rounded-xl)",
  "Use serif fonts for headings to evoke classical warmth",
  "Include botanical decorations: flowers, leaves, mushrooms",
  "Transition durations 500ms-700ms with ease-in-out for gentleness",
  "Use linen/cream textures for backgrounds",
];

const dontRules = [
  "Never use cold blue-gray tones or sterile whites",
  "Avoid sharp corners or hard angular borders",
  "No neon or high-saturation fluorescent colors",
  "Never use tech or industrial style elements",
  "Avoid aggressive or abrupt animations",
  "Do not use monospace or ultra-modern sans-serif fonts",
];

/* ── inline SVGs ──────────────────────────────────────── */
function FlowerSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2a4 4 0 0 1 0 8 4 4 0 0 1 0-8z" fill="currentColor" opacity="0.15" />
      <path d="M18.4 5.6a4 4 0 0 1-5.7 5.7 4 4 0 0 1 5.7-5.7z" fill="currentColor" opacity="0.15" />
      <path d="M22 12a4 4 0 0 1-8 0 4 4 0 0 1 8 0z" fill="currentColor" opacity="0.15" />
      <path d="M18.4 18.4a4 4 0 0 1-5.7-5.7 4 4 0 0 1 5.7 5.7z" fill="currentColor" opacity="0.15" />
      <path d="M12 22a4 4 0 0 1 0-8 4 4 0 0 1 0 8z" fill="currentColor" opacity="0.15" />
      <path d="M5.6 18.4a4 4 0 0 1 5.7-5.7 4 4 0 0 1-5.7 5.7z" fill="currentColor" opacity="0.15" />
      <path d="M2 12a4 4 0 0 1 8 0 4 4 0 0 1-8 0z" fill="currentColor" opacity="0.15" />
      <path d="M5.6 5.6a4 4 0 0 1 5.7 5.7 4 4 0 0 1-5.7-5.7z" fill="currentColor" opacity="0.15" />
    </svg>
  );
}

function LeafSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.8 10-10 10Z" />
      <path d="M2 21c0-3 1.9-5.5 4.5-6.5" />
    </svg>
  );
}

function MushroomSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2C6.5 2 2 6 2 11h20c0-5-4.5-9-10-9z" />
      <path d="M10 11v8a2 2 0 0 0 4 0v-8" />
      <circle cx="8" cy="7" r="1" fill="currentColor" opacity="0.3" />
      <circle cx="14" cy="6" r="1.2" fill="currentColor" opacity="0.3" />
      <circle cx="11" cy="4" r="0.8" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

function HeartSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" opacity="0.8" className={className}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function SunSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function ArrowLeftIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function FloralDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4a0a0]/40" />
      <FlowerSvg className="w-5 h-5 text-[#d4a0a0]/60" />
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4a0a0]/40" />
    </div>
  );
}

/* ── hooks ────────────────────────────────────────────── */
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

/* ── sub-components ───────────────────────────────────── */
function CottageButton({ children, variant = "green", className = "" }: {
  children: React.ReactNode;
  variant?: "green" | "outline" | "pink" | "yellow" | "brown";
  className?: string;
}) {
  const base = "px-7 py-3 font-serif text-sm rounded-full transition-all duration-500 ease-in-out";
  const variants: Record<string, string> = {
    green: "bg-[#5a8f5a] text-[#faf6f0] shadow-[0_4px_10px_rgba(90,143,90,0.2)] hover:shadow-[0_8px_20px_rgba(90,143,90,0.3)] hover:-translate-y-0.5 hover:rotate-[0.8deg] active:scale-[0.97]",
    outline: "bg-transparent text-[#8b7355] border-2 border-dashed border-[#8b7355]/40 hover:bg-[#8b7355] hover:text-[#faf6f0] hover:border-solid",
    pink: "bg-[#d4a0a0] text-white shadow-[0_4px_10px_rgba(212,160,160,0.2)] hover:shadow-[0_8px_20px_rgba(212,160,160,0.3)] hover:-translate-y-0.5",
    yellow: "bg-[#f5d75f] text-[#8b7355] shadow-[0_4px_10px_rgba(245,215,95,0.2)] hover:shadow-[0_8px_20px_rgba(245,215,95,0.3)] hover:-translate-y-0.5",
    brown: "bg-[#8b7355] text-[#faf6f0] shadow-[0_4px_10px_rgba(139,115,85,0.2)] hover:shadow-[0_8px_20px_rgba(139,115,85,0.3)] hover:-translate-y-0.5",
  };
  return <button className={`${base} ${variants[variant]} ${className}`}>{children}</button>;
}

function CottageCard({ title, desc, icon, index = 0 }: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  index?: number;
}) {
  return (
    <RevealBlock delay={index * 0.1}>
      <div className="group p-8 bg-[#faf6f0] rounded-2xl border border-[#d4a0a0]/30 shadow-[0_4px_20px_rgba(139,115,85,0.04)] hover:shadow-[0_12px_30px_rgba(139,115,85,0.1)] hover:-translate-y-1 hover:-rotate-[0.5deg] transition-all duration-700 ease-in-out">
        <div className="w-10 h-10 mb-4 text-[#d4a0a0] group-hover:scale-105 group-hover:rotate-6 transition-all duration-500 ease-in-out">
          {icon}
        </div>
        <h3 className="text-lg font-serif text-[#8b7355] mb-2 group-hover:text-[#5a8f5a] transition-colors duration-500">{title}</h3>
        <p className="text-sm font-serif text-[#8b7355]/60 leading-relaxed">{desc}</p>
      </div>
    </RevealBlock>
  );
}

function GardenRow({ entry, index }: { entry: typeof gardenEntries[0]; index: number }) {
  const statusColors: Record<string, string> = {
    "Blooming": "text-[#d4a0a0] bg-[#d4a0a0]/10",
    "Thriving": "text-[#5a8f5a] bg-[#5a8f5a]/10",
    "Ripening": "text-[#daa520] bg-[#daa520]/10",
    "Budding": "text-[#f5d75f] bg-[#f5d75f]/20",
    "Harvesting": "text-[#8b7355] bg-[#8b7355]/10",
  };
  return (
    <RevealBlock delay={index * 0.08} className="group">
      <div className="flex items-center gap-4 px-6 py-4 border-b border-[#d4a0a0]/15 last:border-b-0 hover:bg-[#faf6f0]/80 transition-colors duration-500">
        <span className="text-xs text-[#d4a0a0]/50 font-serif w-5">{String(index + 1).padStart(2, "0")}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-serif text-[#8b7355] truncate group-hover:text-[#5a8f5a] transition-colors duration-500">{entry.name}</p>
          <p className="text-xs text-[#8b7355]/40 font-serif">{entry.type} &middot; {entry.season}</p>
        </div>
        <span className={`text-xs font-serif px-3 py-1 rounded-full ${statusColors[entry.status] || "text-[#8b7355]/40"}`}>{entry.status}</span>
      </div>
    </RevealBlock>
  );
}

function RecipeCard({ recipe, index }: { recipe: typeof recipes[0]; index: number }) {
  return (
    <RevealBlock delay={index * 0.1}>
      <div className="group p-6 bg-[#faf6f0] rounded-2xl border border-dashed border-[#d4a0a0]/30 hover:border-solid hover:border-[#5a8f5a]/40 hover:shadow-[0_8px_24px_rgba(90,143,90,0.08)] transition-all duration-500 ease-in-out">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-serif text-[#d4a0a0] px-2 py-0.5 bg-[#d4a0a0]/10 rounded-full">{recipe.difficulty}</span>
          <span className="text-xs font-serif text-[#8b7355]/40">{recipe.time}</span>
        </div>
        <h4 className="text-base font-serif text-[#8b7355] mb-2 group-hover:text-[#5a8f5a] transition-colors duration-500">{recipe.title}</h4>
        <p className="text-sm font-serif text-[#8b7355]/50 leading-relaxed">{recipe.desc}</p>
      </div>
    </RevealBlock>
  );
}

function DailyItem({ item, index }: { item: typeof dailyRoutine[0]; index: number }) {
  const icons: Record<string, React.ReactNode> = {
    sun: <SunSvg className="w-4 h-4" />,
    wheat: <LeafSvg className="w-4 h-4" />,
    flower: <FlowerSvg className="w-4 h-4" />,
    leaf: <LeafSvg className="w-4 h-4" />,
    cup: <HeartSvg className="w-4 h-4" />,
    book: <MushroomSvg className="w-4 h-4" />,
  };
  return (
    <RevealBlock delay={index * 0.08}>
      <div className="group flex items-center gap-4 py-3 border-b border-[#d4a0a0]/10 last:border-b-0 hover:bg-[#faf6f0]/60 transition-colors duration-500">
        <span className="text-xs font-serif text-[#5a8f5a] w-16">{item.time}</span>
        <div className="text-[#d4a0a0] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">{icons[item.icon]}</div>
        <p className="text-sm font-serif text-[#8b7355] group-hover:text-[#5a8f5a] transition-colors duration-500">{item.task}</p>
      </div>
    </RevealBlock>
  );
}

/* ── main ─────────────────────────────────────────────── */
export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const tabs = ["garden", "recipes", "daily"];

  const accordionItems = [
    { title: "What is Cottagecore?", content: "Cottagecore romanticizes rural life: harmony with nature, traditional crafts, foraging, baking, and the simple pleasures of countryside living. It emerged from internet culture in the late 2010s as a yearning for slower, gentler ways." },
    { title: "Visual Design Elements", content: "Floral patterns, gingham textures, hand-drawn illustrations, linen backgrounds, dashed borders with rounded corners, warm serif typefaces, and decorations of mushrooms, berries, leaves, and wildflowers." },
    { title: "Color Philosophy", content: "Warm earth tones anchor the palette: grass greens, daisy yellows, and rich browns. Soft pinks and cream backgrounds create a nurturing atmosphere, while honey and sage accents add depth without coldness." },
    { title: "Modern Applications", content: "Cottagecore translates into digital design through soft shadows, generous border-radius, botanical SVG decorations, dashed borders suggesting hand-stitching, and interactions that feel gentle and unhurried." },
  ];

  return (
    <div className="min-h-screen bg-[#faf6f0]" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>
      <style>{`
        @keyframes cottage-sway {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: rotate(1deg); }
        }
        @keyframes cottage-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .cottage-sway { animation: cottage-sway 4s ease-in-out infinite; }
        .cottage-float { animation: cottage-float 3s ease-in-out infinite; }
        .cottage-linen {
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238b7355' fill-opacity='0.025'%3E%3Cpath d='M0 0h20v20H0zM20 20h20v20H20z'/%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>

      {/* ── Navigation ───────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#faf6f0]/90 backdrop-blur-sm border-b border-[#d4a0a0]/20">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 text-[#8b7355]/60 hover:text-[#5a8f5a] transition-colors duration-500">
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="text-sm font-serif italic">Back to the village</span>
          </Link>
          <div className="flex items-center gap-2">
            <FlowerSvg className="w-4 h-4 text-[#d4a0a0]/50 cottage-sway" />
            <span className="text-sm font-serif text-[#8b7355]/40 italic">Cottagecore</span>
          </div>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-14 overflow-hidden bg-gradient-to-b from-[#faf6f0] via-[#f5d75f]/10 to-[#d4a0a0]/15">
        {/* Linen texture */}
        <div className="absolute inset-0 cottage-linen" />
        {/* Decorative flowers */}
        <div className="absolute top-20 left-10 text-[#d4a0a0]/20 cottage-sway"><FlowerSvg className="w-16 h-16" /></div>
        <div className="absolute bottom-20 right-10 text-[#5a8f5a]/15 cottage-sway" style={{ animationDelay: "1s" }}><LeafSvg className="w-20 h-20" /></div>
        <div className="absolute top-40 right-20 text-[#f5d75f]/20 cottage-float"><SunSvg className="w-12 h-12" /></div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div
            className="mb-6"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <FloralDivider className="mb-6" />
            <p className="text-xs font-serif text-[#5a8f5a] tracking-[0.25em] uppercase">A return to simpler times</p>
          </div>

          <h1
            className="text-5xl md:text-8xl font-serif text-[#8b7355] tracking-wide leading-[1.1] mb-6"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            Cottagecore
          </h1>

          <p
            className="text-base md:text-lg font-serif text-[#8b7355]/60 max-w-2xl mx-auto leading-relaxed italic mb-10"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            Where wildflowers bloom and bread rises in the warmth of a country kitchen.
            Every stitch tells a story of spring.
          </p>

          <div
            className="flex flex-wrap justify-center gap-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1) 0.6s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.6s",
            }}
          >
            <CottageButton variant="green">Explore the Garden</CottageButton>
            <CottageButton variant="outline">View Recipes</CottageButton>
          </div>
        </div>
      </section>

      {/* ── Component Demos (Tab-switched) ───────────── */}
      <section className="py-20 px-6 bg-[#faf6f0] cottage-linen">
        <RevealBlock className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-serif text-[#5a8f5a] tracking-[0.25em] uppercase mb-3">Component Gallery</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#8b7355] mb-3">Country Life</h2>
            <p className="text-sm font-serif text-[#8b7355]/50 italic max-w-xl mx-auto">Interactive elements inspired by the warmth and charm of rural living</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white/60 rounded-full p-1 border border-[#d4a0a0]/20">
              {[
                { key: "garden", label: "Garden Journal" },
                { key: "recipes", label: "Recipe Book" },
                { key: "daily", label: "Daily Routine" },
              ].map((tab, i) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(i)}
                  className={`px-5 py-2.5 text-sm font-serif rounded-full transition-all duration-500 ${
                    activeTab === i
                      ? "bg-[#5a8f5a] text-white shadow-[0_2px_8px_rgba(90,143,90,0.2)]"
                      : "text-[#8b7355]/50 hover:text-[#8b7355]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab: Garden Journal */}
          {activeTab === 0 && (
            <div className="bg-white/60 rounded-2xl border border-[#d4a0a0]/20 overflow-hidden shadow-[0_4px_20px_rgba(139,115,85,0.04)]">
              <div className="flex items-center gap-4 px-6 py-3 border-b border-[#d4a0a0]/15 bg-[#5a8f5a]/5">
                <span className="text-xs font-serif text-[#5a8f5a] tracking-[0.15em] uppercase flex-1">Plant</span>
                <span className="text-xs font-serif text-[#5a8f5a] tracking-[0.15em] uppercase w-24 text-right">Status</span>
              </div>
              {gardenEntries.map((entry, i) => (
                <GardenRow key={i} entry={entry} index={i} />
              ))}
            </div>
          )}

          {/* Tab: Recipe Book */}
          {activeTab === 1 && (
            <div className="grid md:grid-cols-3 gap-6">
              {recipes.map((recipe, i) => (
                <RecipeCard key={i} recipe={recipe} index={i} />
              ))}
            </div>
          )}

          {/* Tab: Daily Routine */}
          {activeTab === 2 && (
            <div className="bg-white/60 rounded-2xl border border-[#d4a0a0]/20 p-6 shadow-[0_4px_20px_rgba(139,115,85,0.04)]">
              {dailyRoutine.map((item, i) => (
                <DailyItem key={i} item={item} index={i} />
              ))}
            </div>
          )}
        </RevealBlock>
      </section>

      {/* ── Feature Cards ────────────────────────────── */}
      <section className="py-20 px-6 bg-[#5a8f5a]/[0.04]">
        <RevealBlock className="text-center mb-12">
          <p className="text-xs font-serif text-[#5a8f5a] tracking-[0.25em] uppercase mb-3">Countryside Charms</p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#8b7355] mb-3">Simple Pleasures</h2>
          <p className="text-sm font-serif text-[#8b7355]/50 italic">The beauty found in everyday things</p>
        </RevealBlock>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: "The Garden", desc: "Lavender and rosemary grow alongside heirloom tomatoes and climbing roses. Every season brings new discoveries.", icon: <FlowerSvg className="w-8 h-8" /> },
            { title: "The Kitchen", desc: "Fresh sourdough cools on the counter while berry preserves simmer gently on the stove.", icon: <HeartSvg className="w-8 h-8" /> },
            { title: "The Meadow", desc: "Wildflowers sway in the afternoon breeze as butterflies dance above the tall grass.", icon: <LeafSvg className="w-8 h-8" /> },
          ].map((card, i) => (
            <CottageCard key={i} title={card.title} desc={card.desc} icon={card.icon} index={i} />
          ))}
        </div>
      </section>

      {/* ── Buttons & Inputs ─────────────────────────── */}
      <section className="py-20 px-6 bg-[#faf6f0] cottage-linen">
        <div className="max-w-4xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="text-xs font-serif text-[#5a8f5a] tracking-[0.25em] uppercase mb-3">Interactive Elements</p>
            <h2 className="text-3xl font-serif text-[#8b7355] mb-3">Gentle Actions</h2>
            <p className="text-sm font-serif text-[#8b7355]/50 italic">Soft, inviting interactions</p>
          </RevealBlock>

          <RevealBlock delay={0.1} className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              <CottageButton variant="green">Harvest</CottageButton>
              <CottageButton variant="pink">Gather</CottageButton>
              <CottageButton variant="outline">Forage</CottageButton>
              <CottageButton variant="yellow">Preserve</CottageButton>
              <CottageButton variant="brown">Plant</CottageButton>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-serif text-[#5a8f5a] tracking-wide">Garden Notes</label>
                <input
                  type="text"
                  placeholder="What did you plant today?"
                  className="w-full px-5 py-3.5 bg-[#faf6f0] border border-[#d4a0a0]/30 rounded-xl text-[#8b7355] placeholder-[#8b7355]/35 font-serif focus:border-[#5a8f5a]/60 focus:shadow-[0_0_12px_rgba(90,143,90,0.15)] focus:outline-none transition-all duration-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-serif text-[#5a8f5a] tracking-wide">Recipe Thoughts</label>
                <textarea
                  rows={3}
                  placeholder="Write your recipe notes..."
                  className="w-full px-5 py-3.5 bg-[#faf6f0] border border-[#d4a0a0]/30 rounded-xl text-[#8b7355] placeholder-[#8b7355]/35 font-serif resize-none focus:border-[#5a8f5a]/60 focus:shadow-[0_0_12px_rgba(90,143,90,0.15)] focus:outline-none transition-all duration-500"
                />
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Accordion ────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#5a8f5a]/[0.04]">
        <div className="max-w-3xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="text-xs font-serif text-[#5a8f5a] tracking-[0.25em] uppercase mb-3">Knowledge</p>
            <h2 className="text-3xl font-serif text-[#8b7355] mb-3">Country Wisdom</h2>
            <p className="text-sm font-serif text-[#8b7355]/50 italic">Unfold each page to discover more</p>
          </RevealBlock>

          <div className="space-y-3">
            {accordionItems.map((item, i) => (
              <RevealBlock key={i} delay={i * 0.08}>
                <div className="bg-white/60 rounded-2xl border border-[#d4a0a0]/20 overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#5a8f5a]/[0.03] transition-colors duration-500"
                  >
                    <div className="flex items-center gap-3">
                      <FlowerSvg className="w-4 h-4 text-[#d4a0a0]/50" />
                      <span className="font-serif text-[#8b7355]">{item.title}</span>
                    </div>
                    <ChevronIcon className={`w-4 h-4 text-[#d4a0a0] transition-transform duration-500 ${openAccordion === i ? "rotate-180" : ""}`} />
                  </button>
                  {openAccordion === i && (
                    <div className="px-6 pb-6">
                      <p className="text-sm font-serif text-[#8b7355]/60 leading-relaxed pl-7">{item.content}</p>
                    </div>
                  )}
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── Seasonal Progress ────────────────────────── */}
      <section className="py-20 px-6 bg-[#faf6f0] cottage-linen">
        <div className="max-w-3xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="text-xs font-serif text-[#5a8f5a] tracking-[0.25em] uppercase mb-3">Growing Season</p>
            <h2 className="text-3xl font-serif text-[#8b7355] mb-3">Progress</h2>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="bg-white/60 rounded-2xl border border-[#d4a0a0]/20 p-8 space-y-6">
              {seasonalProgress.map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <p className="text-sm font-serif text-[#8b7355]">{item.label}</p>
                    <span className="text-xs font-serif text-[#5a8f5a]">{item.pct}%</span>
                  </div>
                  <div className="h-2.5 bg-[#5a8f5a]/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#5a8f5a] to-[#9caf88] rounded-full transition-all duration-1000"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Alerts ───────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#5a8f5a]/[0.04]">
        <div className="max-w-3xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="text-xs font-serif text-[#5a8f5a] tracking-[0.25em] uppercase mb-3">Reminders</p>
            <h2 className="text-3xl font-serif text-[#8b7355] mb-3">Gentle Notes</h2>
          </RevealBlock>

          <div className="space-y-3">
            {[
              { title: "Harvest Ready", desc: "The strawberries are ripe and the tomatoes are turning red.", color: "#5a8f5a", icon: <CheckIcon className="w-5 h-5" /> },
              { title: "Weather Notice", desc: "Rain expected tomorrow. Bring in the linens from the line.", color: "#daa520", icon: <SunSvg className="w-5 h-5" /> },
              { title: "Oh Dear", desc: "The jam has bubbled over on the stove.", color: "#d4a0a0", icon: <HeartSvg className="w-5 h-5" /> },
              { title: "Season Note", desc: "Best time to plant lavender is this week.", color: "#8b7355", icon: <FlowerSvg className="w-5 h-5" /> },
            ].map((alert, i) => (
              <RevealBlock key={i} delay={i * 0.1}>
                <div className="flex items-start gap-4 p-5 bg-white/60 rounded-2xl border border-[#d4a0a0]/15 hover:shadow-[0_4px_16px_rgba(139,115,85,0.06)] transition-all duration-500">
                  <div className="mt-0.5 p-2 rounded-full" style={{ color: alert.color, backgroundColor: `${alert.color}15` }}>{alert.icon}</div>
                  <div>
                    <p className="font-serif font-bold text-sm" style={{ color: alert.color }}>{alert.title}</p>
                    <p className="text-[#8b7355]/50 text-sm font-serif italic mt-1">{alert.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── Color Palette ────────────────────────────── */}
      <section className="py-20 px-6 bg-[#faf6f0] cottage-linen">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="text-xs font-serif text-[#5a8f5a] tracking-[0.25em] uppercase mb-3">Visual Identity</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#8b7355] mb-3">Color Palette</h2>
            <p className="text-sm font-serif text-[#8b7355]/50 italic">Nature's own palette, warm and welcoming</p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colorTokens.map((color, i) => (
              <RevealBlock key={color.name} delay={i * 0.06}>
                <div className="group">
                  <div className={`${color.tw} h-24 md:h-32 rounded-t-2xl flex items-end p-4 transition-all duration-500 group-hover:shadow-lg`}>
                    <span className={`text-xs font-serif ${color.text} opacity-80`}>{color.hex}</span>
                  </div>
                  <div className="py-3 bg-white/60 rounded-b-2xl border-x border-b border-[#d4a0a0]/15 px-4">
                    <p className="text-sm font-serif text-[#8b7355]">{color.name}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design Rules ─────────────────────────────── */}
      <section className="py-20 px-6 bg-[#5a8f5a]/[0.04]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="text-xs font-serif text-[#5a8f5a] tracking-[0.25em] uppercase mb-3">Guidelines</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#8b7355] mb-3">Design Principles</h2>
            <p className="text-sm font-serif text-[#8b7355]/50 italic">Rules for keeping the countryside spirit alive</p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            <RevealBlock delay={0.1}>
              <div className="p-8 bg-white/60 rounded-2xl border border-[#5a8f5a]/15">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-[#5a8f5a]/10 rounded-full flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-[#5a8f5a]" />
                  </div>
                  <h3 className="font-serif text-[#5a8f5a] text-lg">Embrace</h3>
                </div>
                <ul className="space-y-3">
                  {doRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <LeafSvg className="w-3.5 h-3.5 text-[#5a8f5a] mt-1 shrink-0" />
                      <span className="text-sm font-serif text-[#8b7355]/70 leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.2}>
              <div className="p-8 bg-white/60 rounded-2xl border border-[#d4a0a0]/15">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-[#d4a0a0]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#d4a0a0] font-serif text-sm">x</span>
                  </div>
                  <h3 className="font-serif text-[#d4a0a0] text-lg">Avoid</h3>
                </div>
                <ul className="space-y-3">
                  {dontRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#d4a0a0] mt-1 text-xs shrink-0">-</span>
                      <span className="text-sm font-serif text-[#8b7355]/70 leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── Toggle / Settings ────────────────────────── */}
      <section className="py-20 px-6 bg-[#faf6f0] cottage-linen">
        <div className="max-w-3xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="text-xs font-serif text-[#5a8f5a] tracking-[0.25em] uppercase mb-3">Preferences</p>
            <h2 className="text-3xl font-serif text-[#8b7355] mb-3">Cottage Settings</h2>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <CottageToggleSection />
          </RevealBlock>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="py-16 px-6 bg-[#faf6f0] border-t border-[#d4a0a0]/15">
        <div className="max-w-6xl mx-auto text-center">
          <FloralDivider className="mb-8" />
          <p className="text-sm font-serif text-[#8b7355]/40 italic">
            Cottagecore &mdash; Where the simple life blooms
          </p>
          <p className="text-xs font-serif text-[#8b7355]/20 mt-2">
            Made with love and sunshine
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ── Toggle Section (isolated state) ─────────────────── */
function CottageToggleSection() {
  const [toggleStates, setToggleStates] = useState([true, false, true]);
  const items = [
    { label: "Morning Birds", desc: "Wake with birdsong at dawn" },
    { label: "Fresh Bread", desc: "Daily baking reminder" },
    { label: "Garden Notes", desc: "Track your plants and seeds" },
  ];

  return (
    <div className="bg-white/60 rounded-2xl border border-[#d4a0a0]/20 p-6 divide-y divide-[#d4a0a0]/10">
      {items.map((item, i) => (
        <div key={i} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
          <div>
            <p className="font-serif text-[#8b7355] text-sm">{item.label}</p>
            <p className="text-xs font-serif text-[#8b7355]/35 mt-0.5">{item.desc}</p>
          </div>
          <button
            onClick={() => {
              const next = [...toggleStates];
              next[i] = !next[i];
              setToggleStates(next);
            }}
            className={`relative w-12 h-6 rounded-full transition-colors duration-500 ${
              toggleStates[i] ? "bg-[#5a8f5a]" : "bg-[#d4a0a0]/30"
            }`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-500 ${toggleStates[i] ? "translate-x-6" : ""}`} />
          </button>
        </div>
      ))}
    </div>
  );
}
