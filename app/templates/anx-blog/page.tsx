"use client";

import { useMemo, useState, useEffect, type CSSProperties, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Command,
  Sparkles,
  X,
  Search,
  ChevronRight,
  Loader2,
  Send,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

// ─── Types ───────────────────────────────────────────────────────────────────

type NavItem = {
  label: string;
  href: string;
  tone: string;
};

type LabItem = {
  index: string;
  title: string;
  description: string;
  tags: string[];
};

type PostItem = {
  index: string;
  category: string;
  title: string;
  date: string;
};

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

type ContactErrors = {
  name?: string;
  email?: string;
  message?: string;
};

type ContactState = "idle" | "loading" | "success" | "error";

// ─── Static data ─────────────────────────────────────────────────────────────

const navItems: NavItem[] = [
  { label: "Work", href: "#work", tone: "hover:bg-[var(--accent-pink)]" },
  { label: "About", href: "#about", tone: "hover:bg-[var(--accent-green)]" },
  { label: "Blog", href: "#logs", tone: "hover:bg-[var(--accent-blue)]" },
  { label: "Lab", href: "#lab", tone: "hover:bg-[var(--accent-yellow)]" },
  { label: "Contact", href: "#contact", tone: "hover:bg-[var(--accent-orange)]" },
];

const labItems: LabItem[] = [
  {
    index: "01",
    title: "Neural Field Visualizer",
    description:
      "Watch hidden layers, attention drift, and loss surface geometry in real time.",
    tags: ["THREE.JS", "WEBGL"],
  },
  {
    index: "02",
    title: "Audio Reactive Particles",
    description:
      "A particle swarm that bends to live microphone energy and beat density.",
    tags: ["WEB AUDIO", "CANVAS"],
  },
  {
    index: "03",
    title: "Generative Typography",
    description:
      "Letterforms split, snap, and recover as pointer velocity changes.",
    tags: ["SVG", "GSAP"],
  },
  {
    index: "04",
    title: "Physics Layout Engine",
    description:
      "Cards collide and settle with constraints that still feel tactile and playful.",
    tags: ["MATTER.JS", "REACT"],
  },
];

const postItems: PostItem[] = [
  {
    index: "01",
    category: "Coding Philosophy",
    title: "Vibe Coding: Shipping With Taste and Constraint",
    date: "// 2026.02.01",
  },
  {
    index: "02",
    category: "Data Storytelling",
    title: "Visualizing My Music Memory With Python",
    date: "// 2026.01.21",
  },
  {
    index: "03",
    category: "AI Experiments",
    title: "When Anime Characters Gain Physical Presence",
    date: "// 2026.01.11",
  },
  {
    index: "04",
    category: "Notes",
    title: "Building a Blog While Finishing University",
    date: "// 2025.12.28",
  },
];

const skills = [
  { label: "React", value: 95 },
  { label: "Next.js", value: 90 },
  { label: "TypeScript", value: 86 },
  { label: "WebGL", value: 72 },
  { label: "Design", value: 82 },
  { label: "Node", value: 77 },
];

// ─── TapeLine ────────────────────────────────────────────────────────────────

function TapeLine() {
  return (
    <div className="-rotate-2 border-y-4 border-black bg-[var(--accent-pink)] text-black">
      <div className="overflow-hidden py-4">
        <div className="flex min-w-[1400px] animate-[marquee_16s_linear_infinite] gap-8 px-4 font-black uppercase tracking-tight text-4xl">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-6">
              <Sparkles className="h-10 w-10 shrink-0" aria-hidden="true" />
              <span className="text-transparent [-webkit-text-stroke:2px_#000]">
                Full Stack
              </span>
              <span>Creative Dev</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Mobile Menu Overlay ─────────────────────────────────────────────────────

function MobileMenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 m-4 border-4 border-black bg-white shadow-[8px_8px_0_#000]">
        <div className="flex items-center justify-between border-b-4 border-black px-5 py-4">
          <span className="text-xs font-black tracking-[0.18em] uppercase">Navigation</span>
          <button
            onClick={onClose}
            className="border-2 border-black bg-black p-1.5 text-white hover:bg-zinc-800"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-col divide-y-2 divide-black">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={onClose}
              className={`flex items-center justify-between px-5 py-5 text-2xl font-black uppercase tracking-[-0.02em] transition-colors ${item.tone}`}
            >
              <span>{item.label}</span>
              <ChevronRight className="h-5 w-5" />
            </a>
          ))}
        </nav>

        <div className="border-t-4 border-black px-5 py-4">
          <p className="text-[10px] font-black tracking-[0.18em] text-zinc-400 uppercase">
            DESIGNED + BUILT BY ANX
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── CMD+K Palette ───────────────────────────────────────────────────────────

type PaletteResult =
  | { kind: "lab"; item: LabItem }
  | { kind: "post"; item: PostItem };

function CmdKPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const results = useMemo<PaletteResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return [
        ...labItems.map((item): PaletteResult => ({ kind: "lab", item })),
        ...postItems.map((item): PaletteResult => ({ kind: "post", item })),
      ];
    }
    const labs: PaletteResult[] = labItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
      )
      .map((item) => ({ kind: "lab", item }));
    const posts: PaletteResult[] = postItems
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
      )
      .map((item) => ({ kind: "post", item }));
    return [...labs, ...posts];
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-xl border-4 border-black bg-white shadow-[8px_8px_0_#000]">
        {/* Search bar */}
        <div className="flex items-center gap-3 border-b-4 border-black px-4 py-3">
          <Search className="h-5 w-5 shrink-0 text-zinc-400" />
          <input
            autoFocus
            type="text"
            placeholder="Search lab projects + posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm font-bold tracking-wide outline-none placeholder:text-zinc-400"
          />
          <button
            onClick={onClose}
            className="border-2 border-black bg-black p-1 text-white hover:bg-zinc-800"
            aria-label="Close palette"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto divide-y-2 divide-zinc-100">
          {results.length === 0 && (
            <div className="px-4 py-8 text-center text-sm font-black tracking-[0.12em] text-zinc-400 uppercase">
              No results found
            </div>
          )}
          {results.map((result, idx) => {
            if (result.kind === "lab") {
              return (
                <button
                  key={`lab-${result.item.index}-${idx}`}
                  onClick={onClose}
                  className="flex w-full items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-[var(--accent-yellow)]"
                >
                  <span className="shrink-0 border-2 border-black bg-[var(--accent-violet)] px-2 py-0.5 text-[9px] font-black tracking-[0.16em] text-white">
                    LAB
                  </span>
                  <span className="flex-1 text-sm font-black tracking-[-0.01em]">
                    {result.item.title}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400" />
                </button>
              );
            }
            return (
              <button
                key={`post-${result.item.index}-${idx}`}
                onClick={onClose}
                className="flex w-full items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-[var(--accent-blue)]/30"
              >
                <span className="shrink-0 border-2 border-black bg-[var(--accent-blue)] px-2 py-0.5 text-[9px] font-black tracking-[0.16em] text-black">
                  POST
                </span>
                <span className="flex-1 text-sm font-black tracking-[-0.01em]">
                  {result.item.title}
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400" />
              </button>
            );
          })}
        </div>

        {/* Footer hint */}
        <div className="border-t-4 border-black bg-zinc-50 px-4 py-2.5">
          <p className="text-[10px] font-black tracking-[0.16em] text-zinc-400 uppercase">
            Press ESC to close
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Lab Detail Modal ─────────────────────────────────────────────────────────

function LabModal({
  item,
  onClose,
}: {
  item: LabItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-lg border-4 border-black bg-white shadow-[10px_10px_0_#000]">
        {/* Header */}
        <div className="flex items-start justify-between border-b-4 border-black bg-[var(--accent-violet)] px-5 py-4">
          <div>
            <p className="text-[10px] font-black tracking-[0.18em] text-white/70 uppercase">
              LAB PROJECT {item.index}
            </p>
            <h4 className="text-2xl font-black leading-tight tracking-[-0.03em] text-white">
              {item.title}
            </h4>
          </div>
          <button
            onClick={onClose}
            className="mt-0.5 border-2 border-white/40 bg-white/10 p-1.5 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-6 space-y-5">
          <p className="text-sm leading-relaxed text-zinc-700">{item.description}</p>

          <div>
            <p className="mb-2 text-[10px] font-black tracking-[0.16em] text-zinc-400 uppercase">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="border-2 border-black bg-[var(--accent-green)] px-3 py-1 text-[10px] font-black tracking-[0.14em]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="border-t-2 border-zinc-100 pt-4 flex items-center gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 border-4 border-black bg-black px-4 py-2.5 text-xs font-black tracking-[0.12em] text-white shadow-[4px_4px_0_#555] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none uppercase"
            >
              <span>View Project</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <button
              onClick={onClose}
              className="border-2 border-black px-4 py-2.5 text-xs font-black tracking-[0.12em] uppercase hover:bg-zinc-100"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────

function ContactForm() {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [contactState, setContactState] = useState<ContactState>("idle");

  function validate(): boolean {
    const next: ContactErrors = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim() || !form.email.includes("@"))
      next.email = "Enter a valid email address.";
    if (form.message.trim().length < 10)
      next.message = "Message must be at least 10 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleChange(field: keyof ContactForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    setContactState("loading");
    setTimeout(() => {
      setContactState("success");
    }, 1500);
  }

  if (contactState === "success") {
    return (
      <div className="border-4 border-black bg-[var(--accent-green)] p-6 shadow-[6px_6px_0_#000]">
        <p className="text-xl font-black tracking-[-0.02em]">Message sent!</p>
        <p className="mt-1 text-sm font-bold leading-relaxed text-black/70">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => {
            setForm({ name: "", email: "", message: "" });
            setErrors({});
            setContactState("idle");
          }}
          className="mt-4 border-2 border-black bg-black px-4 py-2 text-xs font-black tracking-[0.12em] text-[var(--accent-green)] uppercase hover:bg-zinc-800"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Name */}
      <div>
        <label className="mb-1.5 block text-[10px] font-black tracking-[0.16em] uppercase">
          Name
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Your name"
          className={`w-full border-2 border-black bg-white px-3 py-2.5 text-sm font-bold outline-none placeholder:text-zinc-400 focus:border-[var(--accent-pink)] ${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && (
          <p className="mt-1 text-[10px] font-black tracking-wide text-red-600">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="mb-1.5 block text-[10px] font-black tracking-[0.16em] uppercase">
          Email
        </label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="you@example.com"
          className={`w-full border-2 border-black bg-white px-3 py-2.5 text-sm font-bold outline-none placeholder:text-zinc-400 focus:border-[var(--accent-pink)] ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && (
          <p className="mt-1 text-[10px] font-black tracking-wide text-red-600">{errors.email}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="mb-1.5 block text-[10px] font-black tracking-[0.16em] uppercase">
          Message
        </label>
        <textarea
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder="What's on your mind?"
          rows={4}
          className={`w-full resize-none border-2 border-black bg-white px-3 py-2.5 text-sm font-bold outline-none placeholder:text-zinc-400 focus:border-[var(--accent-pink)] ${errors.message ? "border-red-500" : ""}`}
        />
        {errors.message && (
          <p className="mt-1 text-[10px] font-black tracking-wide text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={contactState === "loading"}
        className="inline-flex items-center gap-2 border-4 border-black bg-black px-6 py-3 text-xs font-black tracking-[0.14em] text-white shadow-[4px_4px_0_#555] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-60 disabled:cursor-not-allowed uppercase"
      >
        {contactState === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            <span>Send Message</span>
          </>
        )}
      </button>
    </form>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnxBlogTemplate() {
  const [chaos, setChaos] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cmdKOpen, setCmdKOpen] = useState(false);
  const [selectedLab, setSelectedLab] = useState<LabItem | null>(null);

  const gridCells = useMemo(() => Array.from({ length: 380 }), []);

  // Global CMD+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdKOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <div
      className="min-h-screen bg-white text-black"
      style={
        {
          "--accent-pink": "#ff007d",
          "--accent-green": "#ccff00",
          "--accent-blue": "#00d9ff",
          "--accent-yellow": "#ffd400",
          "--accent-orange": "#ff9800",
          "--accent-violet": "#9b5cff",
        } as CSSProperties
      }
    >
      {/* Chaos toggle */}
      <button
        onClick={() => setChaos((prev) => !prev)}
        className="fixed right-3 top-3 z-[80] border-2 border-black bg-black px-3 py-2 text-[10px] font-black tracking-widest text-white shadow-[3px_3px_0_#fff] transition-all hover:-translate-y-[1px] hover:translate-x-[1px]"
      >
        {chaos ? "DISABLE CHAOS" : "ENABLE CHAOS"}
      </button>

      {/* Overlays */}
      <MobileMenuOverlay
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <CmdKPalette key={String(cmdKOpen)} open={cmdKOpen} onClose={() => setCmdKOpen(false)} />
      <LabModal item={selectedLab} onClose={() => setSelectedLab(null)} />

      <main
        className={`relative overflow-hidden transition-transform duration-200 ${
          chaos ? "rotate-[0.35deg] scale-[1.002]" : ""
        }`}
      >
        {/* ── Nav ──────────────────────────────────────────────────────────── */}
        <nav className="fixed left-2 right-2 top-2 z-50 border-4 border-black bg-white px-3 py-3 shadow-[4px_4px_0_#000] md:left-4 md:right-4 md:top-4 md:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <Link
              href="/templates/anx-blog"
              className="-rotate-1 border-2 border-black bg-black px-2 py-1 text-lg font-black tracking-tight text-white md:text-2xl"
            >
              DEV_AVANT_GARDE
            </Link>

            <div className="hidden items-center gap-3 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={`border-2 border-black bg-white px-4 py-2 text-xs font-black tracking-[0.14em] shadow-[4px_4px_0_#000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none ${item.tone}`}
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => setCmdKOpen(true)}
                className="ml-1 inline-flex items-center gap-2 border-2 border-black bg-zinc-100 px-3 py-2 text-xs font-bold shadow-[2px_2px_0_#000] transition-colors hover:bg-black hover:text-white"
              >
                <Command className="h-4 w-4" />
                <span>CMD+K</span>
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="border-2 border-black bg-[var(--accent-yellow)] px-3 py-2 text-xs font-black tracking-[0.14em] shadow-[2px_2px_0_#000] md:hidden"
            >
              MENU
            </button>
          </div>
        </nav>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative flex min-h-[78vh] items-center justify-center overflow-hidden px-4 pb-24 pt-36 md:min-h-screen md:pt-28">
          <div className="pointer-events-none absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] grid-rows-[repeat(19,minmax(0,1fr))] opacity-10">
            {gridCells.map((_, i) => (
              <div key={i} className="border border-black" />
            ))}
          </div>

          <div className="pointer-events-none absolute left-[8%] top-[22%] h-64 w-64 bg-[var(--accent-blue)]/30 blur-3xl" />
          <div className="pointer-events-none absolute right-[8%] top-[16%] h-72 w-72 bg-[var(--accent-green)]/45 blur-3xl" />
          <div className="pointer-events-none absolute left-[16%] top-[42%] h-80 w-80 bg-[var(--accent-pink)]/40 blur-3xl" />

          <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1fr_340px] md:items-end">
            <div className="space-y-4">
              <span className="inline-block -rotate-2 border-2 border-black bg-[var(--accent-pink)] px-3 py-1 text-[11px] font-black tracking-[0.15em]">
                HELLO WORLD
              </span>

              <h1 className="text-[60px] font-black uppercase leading-[0.9] tracking-[-0.06em] md:text-[138px]">
                <span className="block">
                  DIG<span className="text-zinc-400">IT</span>AL
                </span>
              </h1>

              <h2 className="flex flex-wrap items-center gap-x-2 text-[52px] font-black uppercase leading-[0.85] tracking-[-0.06em] md:text-[128px]">
                <span className="bg-[var(--accent-pink)] px-2">AL</span>
                <span className="bg-[var(--accent-orange)] px-2 text-white">CH</span>
                <span className="bg-[var(--accent-blue)] px-2 text-white">E</span>
                <span className="text-transparent [-webkit-text-stroke:2px_#000]">MIST</span>
              </h2>

              <div className="h-2 w-full max-w-lg border-2 border-black bg-[var(--accent-green)]" />
            </div>

            <div className="-rotate-3 border-4 border-black bg-black p-5 font-mono text-sm text-[var(--accent-green)] shadow-[8px_8px_0_#7aff00]">
              <p>{"// system status"}</p>
              <p>const creativity = Infinity;</p>
              <p>let bugs = 0;</p>
              <p>{"/* ready to deploy */"}</p>
            </div>
          </div>

          <a
            href="#lab"
            className="absolute bottom-6 left-4 inline-flex items-center gap-2 border-2 border-black bg-[var(--accent-yellow)] px-4 py-2 text-[11px] font-black tracking-[0.16em] shadow-[3px_3px_0_#000] md:left-10"
          >
            <span>SCROLL</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </section>

        <TapeLine />

        {/* ── Lab ──────────────────────────────────────────────────────────── */}
        <section id="lab" className="relative overflow-hidden border-y-2 border-zinc-100 px-4 py-24 md:py-28">
          <div className="pointer-events-none absolute -left-14 top-24 h-72 w-72 rounded-full bg-[var(--accent-blue)]/14 blur-3xl" />

          <div className="mx-auto max-w-6xl">
            <div className="mb-12 flex items-end justify-between">
              <h3 className="text-5xl font-black uppercase tracking-[-0.05em] md:text-7xl">
                THE <span className="text-[var(--accent-violet)]">LAB</span>
              </h3>
              <span className="text-lg font-black tracking-[0.18em] text-zinc-300">001-004</span>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {labItems.map((item, idx) => (
                <button
                  id={idx === 0 ? "work" : undefined}
                  key={item.index}
                  onClick={() => setSelectedLab(item)}
                  className="group border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000] transition-all hover:-translate-y-1 hover:translate-x-1 hover:shadow-[10px_10px_0_#000] text-left w-full"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <span className="text-4xl font-black tracking-[-0.06em] text-zinc-300">
                      {item.index}
                    </span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                  <h4 className="mb-2 text-2xl font-black leading-tight tracking-[-0.03em]">
                    {item.title}
                  </h4>
                  <p className="mb-5 text-sm leading-relaxed text-zinc-600">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border-2 border-black bg-zinc-100 px-2 py-1 text-[10px] font-black tracking-[0.14em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Blog Logs ────────────────────────────────────────────────────── */}
        <section id="logs" className="relative overflow-hidden px-4 py-24 md:py-28">
          <div className="pointer-events-none absolute bottom-10 left-0 h-72 w-72 bg-[var(--accent-green)]/18 blur-3xl" />
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <h3 className="text-5xl font-black uppercase leading-[0.84] tracking-[-0.05em] md:text-7xl">
                  LATEST
                  <br />
                  <span className="bg-gradient-to-r from-[var(--accent-green)] to-[var(--accent-blue)] bg-clip-text text-transparent">
                    LOGS
                  </span>
                </h3>
                <p className="mt-3 text-sm font-mono text-zinc-600">{"// technical notes + process"}</p>
              </div>
              <span className="text-3xl font-black tracking-[0.08em] text-zinc-200">001-004</span>
            </div>

            <div className="space-y-4">
              {postItems.map((post) => (
                <a
                  key={post.index}
                  href="#"
                  className="group block border-4 border-black bg-white px-5 py-4 shadow-[5px_5px_0_#000] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-4">
                      <span className="min-w-10 text-2xl font-black text-zinc-300">{post.index}</span>
                      <div>
                        <p className="mb-1 text-[11px] font-black uppercase tracking-[0.14em] text-zinc-500">
                          {post.category}
                        </p>
                        <p className="text-xl font-black tracking-[-0.03em] md:text-2xl">{post.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-black tracking-[0.14em] text-zinc-600">
                      <span>{post.date}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── About / Toolkit ──────────────────────────────────────────────── */}
        <section id="about" className="border-y-4 border-black bg-[var(--accent-orange)] px-4 py-24 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 inline-block border-4 border-black bg-white px-4 py-3 shadow-[6px_6px_0_#000]">
              <h3 className="text-5xl font-black uppercase leading-[0.82] tracking-[-0.04em] md:text-7xl">
                THE
                <br />
                <span className="text-transparent [-webkit-text-stroke:2px_#000]">TOOLKIT</span>
              </h3>
              <p className="mt-2 border-t-2 border-black pt-2 text-[10px] font-black tracking-[0.15em]">
                {"// WEAPONS OF CHOICE"}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {skills.map((skill) => (
                <div key={skill.label} className="border-2 border-black bg-white p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-black tracking-[0.12em] uppercase">
                      {skill.label}
                    </span>
                    <span className="text-sm font-black">{skill.value}%</span>
                  </div>
                  <div className="h-3 border-2 border-black bg-zinc-100">
                    <div
                      className="h-full bg-black transition-all duration-700"
                      style={{ width: `${skill.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────────────────── */}
        <section id="contact" className="relative overflow-hidden px-4 py-24 md:py-28">
          <div className="absolute right-14 top-10 h-56 w-56 rotate-12 bg-[var(--accent-pink)]/14" />
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <span className="-rotate-2 inline-block border-2 border-black bg-black px-3 py-1 text-[10px] font-black tracking-[0.14em] text-white">
                  READY TO START?
                </span>
                <h3 className="mt-4 text-6xl font-black uppercase leading-[0.82] tracking-[-0.06em] md:text-8xl">
                  LET&apos;S
                  <br />
                  <span className="text-transparent [-webkit-text-stroke:2px_#000]">TALK</span>
                </h3>
              </div>

              <div className="space-y-3">
                <a
                  href="mailto:anxforever@qq.com"
                  className="inline-flex border-4 border-black bg-[var(--accent-yellow)] px-4 py-3 text-2xl font-black tracking-[-0.02em] shadow-[6px_6px_0_#000]"
                >
                  anxforever@qq.com
                </a>
                <div className="flex flex-wrap gap-2 text-[10px] font-black tracking-[0.15em]">
                  <a
                    href="https://github.com/AnxForever"
                    className="border-2 border-black bg-white px-3 py-1.5"
                  >
                    GITHUB
                  </a>
                  <a
                    href="mailto:anxforever@qq.com"
                    className="border-2 border-black bg-white px-3 py-1.5"
                  >
                    EMAIL
                  </a>
                </div>
                <p className="text-[10px] font-black tracking-[0.16em] text-zinc-500">
                  DESIGNED + BUILT BY ANX
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#000] md:max-w-xl">
              <p className="mb-5 text-[10px] font-black tracking-[0.18em] text-zinc-500 uppercase">
                Or send a message directly
              </p>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <TemplateBackButton variant="brutal" />
    </div>
  );
}
