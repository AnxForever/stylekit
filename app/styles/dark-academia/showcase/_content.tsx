"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ── data ─────────────────────────────────────────────── */
const subjects = [
  { id: "01", title: "Classical Literature", category: "Humanities", desc: "From Homer to Dostoevsky, the great works that shaped Western thought." },
  { id: "02", title: "Moral Philosophy", category: "Philosophy", desc: "Plato, Aristotle, Nietzsche and the eternal questions of ethics." },
  { id: "03", title: "Ancient History", category: "History", desc: "The rise and fall of civilizations, echoing through millennia." },
];

const libraryBooks = [
  { title: "The Secret History", author: "Donna Tartt", year: "1992", status: "Available" },
  { title: "Dead Poets Society", author: "N.H. Kleinbaum", year: "1989", status: "Checked Out" },
  { title: "Brideshead Revisited", author: "Evelyn Waugh", year: "1945", status: "Available" },
  { title: "The Picture of Dorian Gray", author: "Oscar Wilde", year: "1890", status: "On Hold" },
  { title: "If We Were Villains", author: "M.L. Rio", year: "2017", status: "Available" },
];

const semesterSchedule = [
  { time: "8:00 AM", course: "Latin I", room: "Hall 204", professor: "Dr. Ashworth" },
  { time: "10:30 AM", course: "History of Art", room: "Gallery Wing", professor: "Prof. Bellini" },
  { time: "1:00 PM", course: "Ethics & Logic", room: "Old Chapel", professor: "Dr. Thorne" },
  { time: "3:30 PM", course: "Poetry Workshop", room: "Library Annex", professor: "Prof. Keats" },
];

const essayProgress = [
  { title: "On the Nature of Beauty", progress: 85, words: "4,200" },
  { title: "Aristotelian Ethics Today", progress: 60, words: "2,800" },
  { title: "Gothic Architecture", progress: 35, words: "1,400" },
];

const colorTokens = [
  { name: "Espresso", hex: "#3d2b1f", tw: "bg-[#3d2b1f]", text: "text-[#f5f0e1]" },
  { name: "Forest Moss", hex: "#2d4a3e", tw: "bg-[#2d4a3e]", text: "text-[#f5f0e1]" },
  { name: "Antique Gold", hex: "#8b7355", tw: "bg-[#8b7355]", text: "text-white" },
  { name: "Parchment", hex: "#f5f0e1", tw: "bg-[#f5f0e1]", text: "text-[#3d2b1f]" },
  { name: "Deep Umber", hex: "#5c4033", tw: "bg-[#5c4033]", text: "text-[#f5f0e1]" },
  { name: "Candlelight", hex: "#c4a35a", tw: "bg-[#c4a35a]", text: "text-[#3d2b1f]" },
  { name: "Worn Leather", hex: "#6b4226", tw: "bg-[#6b4226]", text: "text-[#f5f0e1]" },
  { name: "Ivory", hex: "#ede5d0", tw: "bg-[#ede5d0]", text: "text-[#3d2b1f]" },
];

const doRules = [
  "Use deep browns, forest greens, antique gold as primary palette",
  "Apply serif typefaces for all headings and body text",
  "Build warm, muted backgrounds with parchment and cream tones",
  "Use subtle inset shadows to evoke depth and aged surfaces",
  "Transition durations 700ms-1000ms with ease-in-out for gravitas",
  "Add ornate borders and classical divider lines in gold tones",
];

const dontRules = [
  "Never use neon or high-saturation fluorescent colors",
  "Avoid modern tech or industrial design elements",
  "No bouncy, flashy, or attention-grabbing animations",
  "Never use cold blue-gray palettes or sterile whites",
  "Do not use sans-serif fonts for primary text",
  "Avoid sharp geometric shapes without warmth",
];

/* ── inline SVGs ──────────────────────────────────────── */
function BookIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function FeatherIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" /><line x1="16" y1="8" x2="2" y2="22" /><line x1="17.5" y1="15" x2="9" y2="15" />
    </svg>
  );
}

function ScrollIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v3h4" /><path d="M19 17V5a2 2 0 0 0-2-2H4" />
    </svg>
  );
}

function CandleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="9" y="10" width="6" height="11" rx="1" /><path d="M12 2c1 2 3 4 3 6a3 3 0 0 1-6 0c0-2 2-4 3-6z" />
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

function ChevronIcon({ className = "", direction = "down" }: { className?: string; direction?: "down" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {direction === "down" ? <polyline points="6 9 12 15 18 9" /> : <polyline points="9 18 15 12 9 6" />}
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

function OrnamentDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#8b7355]/40" />
      <svg viewBox="0 0 20 20" className="w-4 h-4 text-[#8b7355]/50">
        <path d="M10 2l2.5 5 5.5.8-4 3.9.9 5.3L10 14.5 5.1 17l.9-5.3-4-3.9 5.5-.8z" fill="currentColor" />
      </svg>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#8b7355]/40" />
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
function AcademiaButton({ children, variant = "filled", className = "" }: {
  children: React.ReactNode;
  variant?: "filled" | "outline" | "gold" | "moss";
  className?: string;
}) {
  const base = "px-8 py-3 font-serif tracking-[0.1em] text-sm transition-all duration-700 ease-in-out";
  const variants: Record<string, string> = {
    filled: "bg-[#3d2b1f] text-[#f5f0e1] border border-[#8b7355]/30 hover:bg-[#322317] hover:border-[#8b7355]/60 hover:shadow-[0_8px_18px_rgba(61,43,31,0.3)]",
    outline: "bg-transparent text-[#3d2b1f] border border-[#3d2b1f]/40 hover:bg-[#3d2b1f] hover:text-[#f5f0e1] hover:border-[#3d2b1f]",
    gold: "bg-[#c4a35a] text-[#3d2b1f] border border-[#8b7355]/30 hover:bg-[#b4933a] hover:shadow-[0_8px_18px_rgba(196,163,90,0.3)]",
    moss: "bg-[#2d4a3e] text-[#f5f0e1] border border-[#2d4a3e]/50 hover:bg-[#1d3a2e] hover:shadow-[0_8px_18px_rgba(45,74,62,0.3)]",
  };
  return <button className={`${base} ${variants[variant]} ${className}`}>{children}</button>;
}

function AcademiaCard({ title, desc, icon, index = 0 }: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  index?: number;
}) {
  return (
    <RevealBlock delay={index * 0.1}>
      <div className="group relative p-8 bg-[#f5f0e1] border border-[#8b7355]/20 shadow-[inset_0_0_35px_rgba(139,115,85,0.04),0_4px_14px_rgba(61,43,31,0.04)] hover:border-[#8b7355]/50 hover:shadow-[inset_0_0_60px_rgba(139,115,85,0.1),0_8px_24px_rgba(61,43,31,0.08)] transition-all duration-1000 ease-in-out overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(245,230,180,0.15),transparent_55%)] transition-opacity duration-1000 ease-in-out pointer-events-none" />
        <div className="relative">
          <div className="w-12 h-px bg-[#8b7355]/40 mb-6 group-hover:w-20 group-hover:bg-[#8b7355] transition-all duration-1000 ease-in-out" />
          <div className="mb-4 text-[#8b7355] group-hover:text-[#c4a35a] transition-colors duration-700">
            {icon}
          </div>
          <h3 className="text-xl font-serif text-[#3d2b1f] mb-3 tracking-wide group-hover:text-[#2d2016] transition-colors duration-700">{title}</h3>
          <p className="text-[#3d2b1f]/60 font-serif text-sm leading-relaxed group-hover:text-[#3d2b1f]/80 transition-colors duration-700">{desc}</p>
        </div>
      </div>
    </RevealBlock>
  );
}

function LibraryBookRow({ book, index }: { book: typeof libraryBooks[0]; index: number }) {
  const statusColors: Record<string, string> = {
    "Available": "text-[#2d4a3e] bg-[#2d4a3e]/10",
    "Checked Out": "text-[#8b4513] bg-[#8b4513]/10",
    "On Hold": "text-[#c4a35a] bg-[#c4a35a]/10",
  };
  return (
    <RevealBlock delay={index * 0.08} className="group">
      <div className="flex items-center gap-4 px-6 py-4 border-b border-[#8b7355]/10 last:border-b-0 hover:bg-[#f5f0e1]/60 transition-colors duration-700">
        <span className="text-xs text-[#8b7355]/40 font-serif w-6">{String(index + 1).padStart(2, "0")}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-serif text-[#3d2b1f] truncate group-hover:text-[#2d2016] transition-colors duration-700">{book.title}</p>
          <p className="text-xs text-[#3d2b1f]/40 font-serif">{book.author}, {book.year}</p>
        </div>
        <span className={`text-xs font-serif px-3 py-1 rounded-sm ${statusColors[book.status] || "text-[#3d2b1f]/40"}`}>{book.status}</span>
      </div>
    </RevealBlock>
  );
}

function ScheduleRow({ item, index }: { item: typeof semesterSchedule[0]; index: number }) {
  return (
    <RevealBlock delay={index * 0.1}>
      <div className="group grid grid-cols-4 gap-4 px-6 py-4 border-b border-[#8b7355]/10 last:border-b-0 hover:bg-[#f5f0e1]/60 transition-colors duration-700">
        <span className="text-sm font-serif text-[#c4a35a]">{item.time}</span>
        <span className="text-sm font-serif text-[#3d2b1f] group-hover:text-[#2d2016] transition-colors duration-700">{item.course}</span>
        <span className="text-sm font-serif text-[#3d2b1f]/50">{item.room}</span>
        <span className="text-sm font-serif text-[#2d4a3e]">{item.professor}</span>
      </div>
    </RevealBlock>
  );
}

function EssayProgressBar({ essay, index }: { essay: typeof essayProgress[0]; index: number }) {
  return (
    <RevealBlock delay={index * 0.1}>
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <p className="text-sm font-serif text-[#3d2b1f] italic">{essay.title}</p>
          <span className="text-xs font-serif text-[#8b7355]">{essay.words} words</span>
        </div>
        <div className="h-1.5 bg-[#3d2b1f]/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#3d2b1f] to-[#2d4a3e] rounded-full transition-all duration-1000 ease-in-out"
            style={{ width: `${essay.progress}%` }}
          />
        </div>
        <p className="text-right text-xs font-serif text-[#c4a35a]">{essay.progress}%</p>
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

  const tabs = ["catalog", "schedule", "essays"];

  const accordionItems = [
    { title: "The Dark Academia Aesthetic", content: "Dark Academia romanticizes the pursuit of knowledge through classical education, Gothic architecture, and literary culture. It draws from the golden age of university life, candlelit libraries, and the weight of leather-bound volumes." },
    { title: "Core Visual Elements", content: "Tweed and leather textures, handwritten letters on aged parchment, dusty bookshelves reaching cathedral ceilings, ornate borders inspired by medieval manuscripts, and warm amber candlelight casting soft shadows." },
    { title: "Cultural Foundations", content: "The Secret History by Donna Tartt, Dead Poets Society, Oxford and Cambridge traditions, Greek and Latin classics, Romanticism and Gothic literature, and the ideal of the devoted scholar." },
    { title: "Typography & Color", content: "Classical serif typefaces evoke the printed word. Deep espresso browns, forest moss greens, antique gold accents, and warm parchment backgrounds create a palette of scholarly warmth and timeless sophistication." },
  ];

  return (
    <div className="min-h-screen bg-[#f5f0e1]" style={{ fontFamily: "'Georgia', 'Garamond', serif" }}>
      <style>{`
        @keyframes da-candle-flicker {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
        @keyframes da-quill-write {
          0% { transform: translateX(0) rotate(0deg); }
          50% { transform: translateX(2px) rotate(1deg); }
          100% { transform: translateX(0) rotate(0deg); }
        }
        .da-candle { animation: da-candle-flicker 3s ease-in-out infinite; }
        .da-quill:hover { animation: da-quill-write 2s ease-in-out infinite; }
        .da-spine { border-left: 3px solid #8b7355; padding-left: 1.25rem; }
        .da-divider {
          border: none;
          height: 1px;
          background: linear-gradient(to right, transparent, #8b7355, transparent);
          margin: 0;
        }
        .da-tab-active {
          position: relative;
        }
        .da-tab-active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #c4a35a;
        }
      `}</style>

      {/* ── Navigation ───────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f0e1]/90 backdrop-blur-sm border-b border-[#8b7355]/15">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 text-[#3d2b1f]/60 hover:text-[#c4a35a] transition-colors duration-700">
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="text-sm font-serif italic tracking-wide">Return to the world</span>
          </Link>
          <div className="flex items-center gap-3">
            <BookIcon className="w-4 h-4 text-[#8b7355]/40 da-candle" />
            <span className="text-sm font-serif text-[#3d2b1f]/40 italic tracking-widest">Dark Academia</span>
          </div>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-14 overflow-hidden bg-gradient-to-b from-[#3d2b1f] via-[#2d4a3e] to-[#3d2b1f]">
        {/* Texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
        }} />
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,163,90,0.08),transparent_70%)]" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div
            className="mb-8"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <OrnamentDivider className="mb-8 [&_*]:!border-[#f5f0e1]/20 [&_svg]:!text-[#c4a35a]/50" />
            <p className="text-sm font-serif text-[#c4a35a]/80 tracking-[0.3em] uppercase mb-4">Est. MDCCCLXXII</p>
          </div>

          <h1
            className="text-5xl md:text-8xl font-serif text-[#f5f0e1] tracking-wide leading-[1.1] mb-6"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            Dark Academia
          </h1>

          <p
            className="text-base md:text-lg font-serif text-[#f5f0e1]/60 max-w-2xl mx-auto leading-relaxed italic mb-10"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1) 0.4s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.4s",
            }}
          >
            To devote oneself to the pursuit of knowledge is the noblest of all callings.
            In the quiet of the library, truth awaits between the pages.
          </p>

          <div
            className="flex flex-wrap justify-center gap-4"
            style={{
              opacity: heroRevealed ? 1 : 0,
              transform: heroRevealed ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 1.4s cubic-bezier(0.16,1,0.3,1) 0.6s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.6s",
            }}
          >
            <AcademiaButton variant="gold">Enter the Archive</AcademiaButton>
            <AcademiaButton variant="outline" className="!text-[#f5f0e1]/70 !border-[#f5f0e1]/20 hover:!bg-[#f5f0e1]/10 hover:!text-[#f5f0e1]">View Syllabus</AcademiaButton>
          </div>
        </div>
      </section>

      {/* ── Component Demos (Tab-switched) ───────────── */}
      <section className="py-20 px-6 bg-[#f5f0e1]">
        <RevealBlock className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-serif text-[#c4a35a] tracking-[0.3em] uppercase mb-3">Component Gallery</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#3d2b1f] mb-3 tracking-wide">Study Materials</h2>
            <p className="text-sm font-serif text-[#3d2b1f]/50 italic max-w-xl mx-auto">Interactive elements designed with the weight and warmth of classical scholarship</p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex border border-[#8b7355]/20 bg-[#f5f0e1]">
              {[
                { key: "catalog", label: "Library Catalog" },
                { key: "schedule", label: "Lecture Schedule" },
                { key: "essays", label: "Essay Progress" },
              ].map((tab, i) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(i)}
                  className={`relative px-6 py-3 text-sm font-serif tracking-wide transition-all duration-700 ${
                    activeTab === i
                      ? "text-[#3d2b1f] bg-white/50 da-tab-active"
                      : "text-[#3d2b1f]/40 hover:text-[#3d2b1f]/70"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab: Library Catalog */}
          {activeTab === 0 && (
            <div className="bg-white/40 border border-[#8b7355]/15 shadow-[0_4px_20px_rgba(61,43,31,0.04)]">
              <div className="grid grid-cols-4 gap-4 px-6 py-3 border-b border-[#8b7355]/15 bg-[#3d2b1f]/5">
                <span className="text-xs font-serif text-[#8b7355] tracking-[0.15em] uppercase col-span-1">No.</span>
                <span className="text-xs font-serif text-[#8b7355] tracking-[0.15em] uppercase col-span-1">Title & Author</span>
                <span className="text-xs font-serif text-[#8b7355] tracking-[0.15em] uppercase col-span-1" />
                <span className="text-xs font-serif text-[#8b7355] tracking-[0.15em] uppercase col-span-1 text-right">Status</span>
              </div>
              {libraryBooks.map((book, i) => (
                <LibraryBookRow key={i} book={book} index={i} />
              ))}
            </div>
          )}

          {/* Tab: Lecture Schedule */}
          {activeTab === 1 && (
            <div className="bg-white/40 border border-[#8b7355]/15 shadow-[0_4px_20px_rgba(61,43,31,0.04)]">
              <div className="grid grid-cols-4 gap-4 px-6 py-3 border-b border-[#8b7355]/15 bg-[#3d2b1f]/5">
                {["Time", "Course", "Room", "Professor"].map((h) => (
                  <span key={h} className="text-xs font-serif text-[#8b7355] tracking-[0.15em] uppercase">{h}</span>
                ))}
              </div>
              {semesterSchedule.map((item, i) => (
                <ScheduleRow key={i} item={item} index={i} />
              ))}
            </div>
          )}

          {/* Tab: Essay Progress */}
          {activeTab === 2 && (
            <div className="bg-white/40 border border-[#8b7355]/15 shadow-[0_4px_20px_rgba(61,43,31,0.04)] p-8 space-y-8">
              {essayProgress.map((essay, i) => (
                <EssayProgressBar key={i} essay={essay} index={i} />
              ))}
              <hr className="da-divider" />
              <div className="flex justify-between items-center">
                <p className="text-sm font-serif text-[#3d2b1f]/50 italic">Total progress across all essays</p>
                <span className="text-sm font-serif text-[#c4a35a]">{Math.round(essayProgress.reduce((s, e) => s + e.progress, 0) / essayProgress.length)}%</span>
              </div>
            </div>
          )}
        </RevealBlock>
      </section>

      {/* ── Subject Cards ────────────────────────────── */}
      <section className="py-20 px-6 bg-[#3d2b1f]/[0.03]">
        <RevealBlock className="text-center mb-12">
          <p className="text-xs font-serif text-[#c4a35a] tracking-[0.3em] uppercase mb-3">Academic Pursuits</p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#3d2b1f] mb-3 tracking-wide">Fields of Study</h2>
          <p className="text-sm font-serif text-[#3d2b1f]/50 italic">Each discipline a door to deeper understanding</p>
        </RevealBlock>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {subjects.map((subject, i) => (
            <AcademiaCard
              key={subject.id}
              title={subject.title}
              desc={subject.desc}
              icon={
                i === 0 ? <BookIcon className="w-7 h-7" /> :
                i === 1 ? <FeatherIcon className="w-7 h-7" /> :
                <ScrollIcon className="w-7 h-7" />
              }
              index={i}
            />
          ))}
        </div>
      </section>

      {/* ── Buttons & Inputs ─────────────────────────── */}
      <section className="py-20 px-6 bg-[#f5f0e1]">
        <div className="max-w-4xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="text-xs font-serif text-[#c4a35a] tracking-[0.3em] uppercase mb-3">Interactive Elements</p>
            <h2 className="text-3xl font-serif text-[#3d2b1f] mb-3 tracking-wide">Actions & Inputs</h2>
            <p className="text-sm font-serif text-[#3d2b1f]/50 italic">Deliberate, purposeful interactions</p>
          </RevealBlock>

          <RevealBlock delay={0.1} className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              <AcademiaButton variant="filled">Read More</AcademiaButton>
              <AcademiaButton variant="outline">Annotate</AcademiaButton>
              <AcademiaButton variant="gold">Bookmark</AcademiaButton>
              <AcademiaButton variant="moss">Explore</AcademiaButton>
              <button className="px-8 py-3 font-serif tracking-[0.1em] text-sm bg-[#d4c5a9] text-[#3d2b1f]/40 border border-[#8b7355]/15 cursor-not-allowed">Sealed</button>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-serif text-[#8b7355] tracking-[0.15em] uppercase">Search the Archives</label>
                <input
                  type="text"
                  placeholder="Enter your query..."
                  className="w-full px-5 py-3.5 bg-[#f5f0e1]/80 border border-[#8b7355]/25 text-[#3d2b1f] placeholder-[#8b7355]/40 font-serif focus:border-[#8b7355] focus:shadow-[0_0_8px_rgba(139,115,85,0.15)] focus:outline-none transition-all duration-700"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-serif text-[#8b7355] tracking-[0.15em] uppercase">Lecture Notes</label>
                <textarea
                  rows={3}
                  placeholder="Write your reflections..."
                  className="w-full px-5 py-3.5 bg-[#f5f0e1]/80 border border-[#8b7355]/25 text-[#3d2b1f] placeholder-[#8b7355]/40 font-serif resize-none focus:border-[#8b7355] focus:shadow-[0_0_8px_rgba(139,115,85,0.15)] focus:outline-none transition-all duration-700"
                />
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Accordion ────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#3d2b1f]/[0.03]">
        <div className="max-w-3xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="text-xs font-serif text-[#c4a35a] tracking-[0.3em] uppercase mb-3">Knowledge Base</p>
            <h2 className="text-3xl font-serif text-[#3d2b1f] mb-3 tracking-wide">Folios & Marginalia</h2>
            <p className="text-sm font-serif text-[#3d2b1f]/50 italic">Expand each folio to reveal its contents</p>
          </RevealBlock>

          <div className="space-y-2">
            {accordionItems.map((item, i) => (
              <RevealBlock key={i} delay={i * 0.08}>
                <div className="bg-white/40 border border-[#8b7355]/15 overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#3d2b1f]/[0.03] transition-colors duration-700"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-serif text-[#c4a35a]">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-serif text-[#3d2b1f] tracking-wide">{item.title}</span>
                    </div>
                    <ChevronIcon
                      className={`w-4 h-4 text-[#8b7355] transition-transform duration-700 ${openAccordion === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openAccordion === i && (
                    <div className="px-6 pb-6">
                      <div className="da-spine">
                        <p className="text-sm font-serif text-[#3d2b1f]/60 leading-relaxed italic">{item.content}</p>
                      </div>
                    </div>
                  )}
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── Alerts / Notifications ────────────────────── */}
      <section className="py-20 px-6 bg-[#f5f0e1]">
        <div className="max-w-3xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="text-xs font-serif text-[#c4a35a] tracking-[0.3em] uppercase mb-3">Notifications</p>
            <h2 className="text-3xl font-serif text-[#3d2b1f] mb-3 tracking-wide">Scholarly Notes</h2>
          </RevealBlock>

          <div className="space-y-3">
            {[
              { type: "success", title: "Thesis Accepted", desc: "Your dissertation on Classical Ethics has been approved by the faculty.", color: "#2d4a3e", icon: <CheckIcon className="w-5 h-5" /> },
              { type: "warning", title: "Deadline Approaching", desc: "The essay on Romantic Poetry is due before the fortnight ends.", color: "#c4a35a", icon: <CandleIcon className="w-5 h-5" /> },
              { type: "error", title: "Overdue Return", desc: "A leather-bound volume of Virgil must be returned to the library.", color: "#8b4513", icon: <BookIcon className="w-5 h-5" /> },
              { type: "info", title: "New Acquisition", desc: "A rare first edition of Keats has arrived in the special collections.", color: "#3d2b1f", icon: <FeatherIcon className="w-5 h-5" /> },
            ].map((alert, i) => (
              <RevealBlock key={i} delay={i * 0.1}>
                <div className="flex items-start gap-4 p-5 bg-white/40 border-l-[3px] transition-all duration-700 hover:bg-white/60" style={{ borderLeftColor: alert.color }}>
                  <div style={{ color: alert.color }} className="mt-0.5">{alert.icon}</div>
                  <div>
                    <p className="font-serif font-bold text-sm tracking-wide" style={{ color: alert.color }}>{alert.title}</p>
                    <p className="text-[#3d2b1f]/50 text-sm font-serif italic mt-1">{alert.desc}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── Color Palette ────────────────────────────── */}
      <section className="py-20 px-6 bg-[#3d2b1f]/[0.03]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="text-xs font-serif text-[#c4a35a] tracking-[0.3em] uppercase mb-3">Visual Identity</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#3d2b1f] mb-3 tracking-wide">Color Palette</h2>
            <p className="text-sm font-serif text-[#3d2b1f]/50 italic">The warm hues of candlelit libraries and aged parchment</p>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colorTokens.map((color, i) => (
              <RevealBlock key={color.name} delay={i * 0.06}>
                <div className="group">
                  <div className={`${color.tw} h-24 md:h-32 flex items-end p-4 transition-all duration-700 group-hover:shadow-lg`}>
                    <span className={`text-xs font-serif ${color.text} opacity-80`}>{color.hex}</span>
                  </div>
                  <div className="py-3">
                    <p className="text-sm font-serif text-[#3d2b1f] tracking-wide">{color.name}</p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ── Design Rules ─────────────────────────────── */}
      <section className="py-20 px-6 bg-[#f5f0e1]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="text-xs font-serif text-[#c4a35a] tracking-[0.3em] uppercase mb-3">Guidelines</p>
            <h2 className="text-3xl md:text-4xl font-serif text-[#3d2b1f] mb-3 tracking-wide">Design Principles</h2>
            <p className="text-sm font-serif text-[#3d2b1f]/50 italic">Rules for maintaining scholarly dignity in every interface</p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-8">
            <RevealBlock delay={0.1}>
              <div className="p-8 bg-white/40 border border-[#2d4a3e]/15">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-[#2d4a3e]/10 flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-[#2d4a3e]" />
                  </div>
                  <h3 className="font-serif text-[#2d4a3e] tracking-wide text-lg">Observe</h3>
                </div>
                <ul className="space-y-3">
                  {doRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#2d4a3e] mt-1 text-xs">+</span>
                      <span className="text-sm font-serif text-[#3d2b1f]/70 leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.2}>
              <div className="p-8 bg-white/40 border border-[#8b4513]/15">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-[#8b4513]/10 flex items-center justify-center">
                    <span className="text-[#8b4513] font-serif text-sm">x</span>
                  </div>
                  <h3 className="font-serif text-[#8b4513] tracking-wide text-lg">Avoid</h3>
                </div>
                <ul className="space-y-3">
                  {dontRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#8b4513] mt-1 text-xs">-</span>
                      <span className="text-sm font-serif text-[#3d2b1f]/70 leading-relaxed">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ── Typography Specimen ──────────────────────── */}
      <section className="py-20 px-6 bg-[#3d2b1f]/[0.03]">
        <div className="max-w-4xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="text-xs font-serif text-[#c4a35a] tracking-[0.3em] uppercase mb-3">Typography</p>
            <h2 className="text-3xl font-serif text-[#3d2b1f] mb-3 tracking-wide">The Written Word</h2>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="p-10 bg-white/40 border border-[#8b7355]/15">
              <p className="text-6xl md:text-7xl font-serif text-[#3d2b1f] mb-4 tracking-wide">Carpe Diem</p>
              <hr className="da-divider" />
              <p className="text-3xl font-serif text-[#2d4a3e] my-4 italic">Seize the Day</p>
              <p className="text-xl font-serif text-[#c4a35a] italic mb-4">In the pursuit of beauty and truth</p>
              <p className="text-sm font-serif text-[#3d2b1f]/50 leading-relaxed max-w-2xl">
                Dark Academia typography favors classical serifs with generous letter-spacing,
                evoking the printed pages of leather-bound volumes. Each letterform carries
                the weight of centuries of scholarly tradition. The typeface itself becomes
                a vessel for the timeless pursuit of knowledge.
              </p>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ── Toggle / Settings ────────────────────────── */}
      <section className="py-20 px-6 bg-[#f5f0e1]">
        <div className="max-w-3xl mx-auto">
          <RevealBlock className="text-center mb-12">
            <p className="text-xs font-serif text-[#c4a35a] tracking-[0.3em] uppercase mb-3">Preferences</p>
            <h2 className="text-3xl font-serif text-[#3d2b1f] mb-3 tracking-wide">Study Settings</h2>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <ToggleSection />
          </RevealBlock>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────── */}
      <footer className="py-16 px-6 bg-[#3d2b1f]">
        <div className="max-w-6xl mx-auto text-center">
          <OrnamentDivider className="mb-8 [&_*]:!border-[#f5f0e1]/10 [&_svg]:!text-[#c4a35a]/30" />
          <p className="text-sm font-serif text-[#f5f0e1]/30 italic tracking-wide">
            Dark Academia &mdash; The beauty of knowledge in darkness
          </p>
          <p className="text-xs font-serif text-[#f5f0e1]/15 mt-2 tracking-widest uppercase">
            Memento Mori
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ── Toggle Section (isolated state) ─────────────────── */
function ToggleSection() {
  const [toggleStates, setToggleStates] = useState([true, false, true]);
  const items = [
    { label: "Candlelight Mode", desc: "Read by warm amber light" },
    { label: "Classical Music", desc: "Play ambient background music" },
    { label: "Marginalia", desc: "Show annotation notes in margins" },
  ];

  return (
    <div className="bg-white/40 border border-[#8b7355]/15 p-6 divide-y divide-[#8b7355]/10">
      {items.map((item, i) => (
        <div key={i} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
          <div>
            <p className="font-serif text-[#3d2b1f] text-sm tracking-wide">{item.label}</p>
            <p className="text-xs font-serif text-[#3d2b1f]/40 mt-0.5">{item.desc}</p>
          </div>
          <button
            onClick={() => {
              const next = [...toggleStates];
              next[i] = !next[i];
              setToggleStates(next);
            }}
            className={`relative w-12 h-6 rounded-full transition-colors duration-700 ${
              toggleStates[i] ? "bg-[#3d2b1f]" : "bg-[#3d2b1f]/20"
            }`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-[#f5f0e1] rounded-full shadow transition-transform duration-700 ${toggleStates[i] ? "translate-x-6" : ""}`} />
          </button>
        </div>
      ))}
    </div>
  );
}
