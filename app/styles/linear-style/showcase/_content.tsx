"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ShortcutHint } from "@/lib/platform/shortcut-hint";

/* ------------------------------------------------------------------ */
/*  useInView hook                                                      */
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

/* ------------------------------------------------------------------ */
/*  RevealBlock                                                         */
/* ------------------------------------------------------------------ */

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
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
/* ------------------------------------------------------------------ */
/*  Kbd component                                                       */
/* ------------------------------------------------------------------ */

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-zinc-400 bg-white/[0.06] border border-white/10 rounded">
      {children}
    </kbd>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline SVG icons (1px stroke, Linear aesthetic)                     */
/* ------------------------------------------------------------------ */

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </svg>
  );
}

function IssueIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <circle cx="7" cy="7" r="5.5" />
      <path d="M7 4.5v3" strokeLinecap="round" />
      <circle cx="7" cy="9.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CheckCircleIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4.5 7l2 2 3.5-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InProgressIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 1.5A5.5 5.5 0 0112.5 7" stroke="#5e6ad2" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function BacklogIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
    </svg>
  );
}

function ChevronLeftIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 4l-4 4 4 4" />
    </svg>
  );
}

function HomeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 7l5-4.5L12 7" />
      <path d="M3.5 8v4h2.5v-2.5h2V12h2.5V8" />
    </svg>
  );
}

function InboxIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 8.5l2-1.5h6l2 1.5" />
      <rect x="2" y="2" width="10" height="10" rx="1.5" />
    </svg>
  );
}

function ViewsIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
      <rect x="2" y="2" width="4" height="4" rx="0.5" />
      <rect x="8" y="2" width="4" height="4" rx="0.5" />
      <rect x="2" y="8" width="4" height="4" rx="0.5" />
      <rect x="8" y="8" width="4" height="4" rx="0.5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type IssueStatus = "done" | "in-progress" | "backlog" | "todo";
type IssuePriority = "urgent" | "high" | "medium" | "low";

interface Issue {
  id: string;
  title: string;
  status: IssueStatus;
  priority: IssuePriority;
  label: string;
  labelColor: string;
  assignee: string;
  time: string;
}

const issues: Issue[] = [
  { id: "STY-281", title: "Implement dark mode token system", status: "done", priority: "high", label: "Feature", labelColor: "#5e6ad2", assignee: "AX", time: "2d" },
  { id: "STY-282", title: "Fix border-radius inconsistency in card components", status: "done", priority: "urgent", label: "Bug", labelColor: "#eb5757", assignee: "KL", time: "4h" },
  { id: "STY-283", title: "Add keyboard shortcut overlay for command menu", status: "in-progress", priority: "high", label: "Feature", labelColor: "#5e6ad2", assignee: "AX", time: "1d" },
  { id: "STY-284", title: "Optimize SVG icon bundle size", status: "in-progress", priority: "medium", label: "Perf", labelColor: "#f2c94c", assignee: "MR", time: "3h" },
  { id: "STY-285", title: "Design token documentation for spacing scale", status: "todo", priority: "medium", label: "Docs", labelColor: "#27ae60", assignee: "KL", time: "6h" },
  { id: "STY-286", title: "Audit color contrast ratios for WCAG AA", status: "backlog", priority: "low", label: "A11y", labelColor: "#2d9cdb", assignee: "MR", time: "1d" },
  { id: "STY-287", title: "Migrate to CSS custom properties for theming", status: "backlog", priority: "low", label: "Refactor", labelColor: "#9b59b6", assignee: "AX", time: "3d" },
];

const sidebarItems = [
  { icon: "home", label: "Home", active: false },
  { icon: "inbox", label: "Inbox", active: false, badge: 3 },
  { icon: "issues", label: "My Issues", active: true },
  { icon: "views", label: "Views", active: false },
];

const sidebarTeams = [
  { name: "StyleKit", key: "STY", color: "#5e6ad2" },
  { name: "Design System", key: "DSN", color: "#27ae60" },
  { name: "Infrastructure", key: "INF", color: "#f2c94c" },
];

const colorTokens = [
  { name: "Background", value: "#0a0a0b", textClass: "text-zinc-400" },
  { name: "Surface", value: "rgba(255,255,255,0.03)", textClass: "text-zinc-400", display: "white/3%" },
  { name: "Surface Hover", value: "rgba(255,255,255,0.06)", textClass: "text-zinc-400", display: "white/6%" },
  { name: "Border", value: "rgba(255,255,255,0.1)", textClass: "text-zinc-400", display: "white/10%" },
  { name: "Brand", value: "#5e6ad2", textClass: "text-white" },
  { name: "Text Primary", value: "#e4e4e7", textClass: "text-zinc-900", display: "zinc-200" },
  { name: "Text Secondary", value: "#a1a1aa", textClass: "text-zinc-900", display: "zinc-400" },
  { name: "Text Muted", value: "#71717a", textClass: "text-white", display: "zinc-500" },
];

const typographyScale = [
  { label: "Display", size: "text-4xl", weight: "font-semibold", tracking: "tracking-tight", sample: "Build software" },
  { label: "Title", size: "text-2xl", weight: "font-semibold", tracking: "tracking-tight", sample: "Project Overview" },
  { label: "Heading", size: "text-lg", weight: "font-medium", tracking: "tracking-tight", sample: "Active Sprint" },
  { label: "Body", size: "text-sm", weight: "font-normal", tracking: "", sample: "Issues are the building blocks of your project." },
  { label: "Caption", size: "text-xs", weight: "font-normal", tracking: "", sample: "Updated 2 hours ago by @anxforever" },
  { label: "Label", size: "text-[10px]", weight: "font-medium", tracking: "tracking-wider uppercase", sample: "STATUS / PRIORITY / LABEL" },
];

const doRules = [
  "Near-black background: bg-[#0a0a0b] or bg-zinc-950",
  "1px semi-transparent borders: border-white/10",
  "Text hierarchy via zinc scale: zinc-100, zinc-400, zinc-500",
  "Brand indigo #5e6ad2 only for CTAs and active states",
  "Inter font, tracking-tight, text-sm as default body",
  "Opacity-based hover: hover:bg-white/[0.05]",
  "Fast transitions: duration-150 ease-out",
  "Kbd hints for keyboard shortcuts",
];

const dontRules = [
  "White or light backgrounds",
  "Large border-radius (rounded-2xl or above)",
  "Colored shadows or shadow-xl",
  "Multiple font families",
  "High-saturation colors (except brand purple)",
  "Decorative blobs, gradients, or noise textures",
  "Scale transforms on hover (hover:scale-105)",
  "Slow transitions (duration-500+)",
];

/* ------------------------------------------------------------------ */
/*  Status icon helper                                                  */
/* ------------------------------------------------------------------ */

function StatusIcon({ status }: { status: IssueStatus }) {
  switch (status) {
    case "done":
      return <CheckCircleIcon className="w-3.5 h-3.5 text-[#27ae60]" />;
    case "in-progress":
      return <InProgressIcon className="w-3.5 h-3.5 text-zinc-400" />;
    case "todo":
      return <IssueIcon className="w-3.5 h-3.5 text-zinc-500" />;
    case "backlog":
      return <BacklogIcon className="w-3.5 h-3.5 text-zinc-600" />;
  }
}

function PriorityBadge({ priority }: { priority: IssuePriority }) {
  const map: Record<IssuePriority, { bars: number; color: string }> = {
    urgent: { bars: 4, color: "#eb5757" },
    high: { bars: 3, color: "#f2c94c" },
    medium: { bars: 2, color: "#5e6ad2" },
    low: { bars: 1, color: "#71717a" },
  };
  const { bars, color } = map[priority];
  return (
    <div className="flex items-end gap-[2px] h-3" title={priority}>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-[3px] rounded-[0.5px]"
          style={{
            height: `${4 + i * 2}px`,
            backgroundColor: i <= bars ? color : "rgba(255,255,255,0.08)",
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdQuery, setCmdQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"buttons" | "cards" | "inputs" | "badges">("buttons");

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
        setCmdQuery("");
      }
      if (e.key === "Escape") setCmdOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-zinc-100 overflow-x-hidden" style={{ fontFamily: "'Inter', -apple-system, system-ui, sans-serif", letterSpacing: "-0.01em" }}>
      <style>{`
        @keyframes linear-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes linear-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes linear-cmd-in {
          from { opacity: 0; transform: scale(0.98) translateY(-8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .linear-fade-up { animation: linear-fade-up 0.5s cubic-bezier(0.16,1,0.3,1) forwards; }
        .linear-glow { animation: linear-glow 4s ease-in-out infinite; }
      `}</style>

      {/* ============================================================ */}
      {/* COMMAND PALETTE OVERLAY                                       */}
      {/* ============================================================ */}
      {cmdOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]" onClick={() => setCmdOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg border border-white/10 rounded-lg bg-[#161618] shadow-2xl overflow-hidden"
            style={{ animation: "linear-cmd-in 0.15s ease-out" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <SearchIcon className="w-4 h-4 text-zinc-500 flex-shrink-0" />
              <input
                autoFocus
                value={cmdQuery}
                onChange={(e) => setCmdQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-600 outline-none"
                placeholder="Type a command or search..."
              />
              <Kbd>ESC</Kbd>
            </div>
            <div className="py-2 px-2 max-h-64 overflow-y-auto">
              {[
                { label: "Create new issue", kbd: "C" },
                { label: "Search issues", kbd: "S" },
                { label: "Go to active sprint", kbd: "G A" },
                { label: "Toggle sidebar", kbd: "[" },
                { label: "Switch workspace", kbd: "W" },
              ]
                .filter((c) => c.label.toLowerCase().includes(cmdQuery.toLowerCase()))
                .map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm text-zinc-300 hover:bg-white/[0.06] transition-colors duration-150"
                    onClick={() => setCmdOpen(false)}
                  >
                    <span>{c.label}</span>
                    <Kbd>{c.kbd}</Kbd>
                  </button>
                ))}
              {cmdQuery &&
                [].filter(() => false).length === 0 && (
                  <div className="px-3 py-6 text-center text-xs text-zinc-600">
                    No results for &ldquo;{cmdQuery}&rdquo;
                  </div>
                )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* STICKY NAV                                                    */}
      {/* ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0b]/80 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-5 md:px-10 flex items-center justify-between h-12">
          <div className="flex items-center gap-3">
            <Link href="/styles/linear-style" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors duration-150">
              <ChevronLeftIcon className="w-4 h-4" />
              <span className="text-xs font-medium">Back</span>
            </Link>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded flex items-center justify-center bg-gradient-to-br from-[#5e6ad2] to-[#8b5cf6]">
                <span className="text-[9px] font-bold text-white">L</span>
              </div>
              <span className="text-sm font-medium text-zinc-100 tracking-tight">Linear Style</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCmdOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors duration-150 cursor-pointer"
          >
            <SearchIcon className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-xs text-zinc-500">Search...</span>
            <Kbd><ShortcutHint keys="K" /></Kbd>
          </button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 1. HERO                                                         */}
      {/* ============================================================ */}
      <section className="relative pt-32 pb-24 px-5 md:px-10 overflow-hidden">
        {/* Subtle top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#5e6ad2]/[0.08] rounded-full blur-[120px] linear-glow pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-[#5e6ad2]" />
              <span className="text-xs text-zinc-400 font-medium">Precision. Restraint. Developer aesthetics.</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-100 mb-4">
              Linear Style
            </h1>
            <p className="text-base md:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed mb-8">
              Every pixel has a purpose. A design language built for tools that developers love — precise typography, subtle borders, and restrained color.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setCmdOpen(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-[#5e6ad2] to-[#8b5cf6] text-white text-sm font-medium rounded-lg hover:opacity-90 active:opacity-80 transition-opacity duration-150"
              >
                Open Command Menu
              </button>
              <button
                type="button"
                className="px-5 py-2.5 border border-white/10 bg-white/[0.03] text-zinc-300 text-sm font-medium rounded-lg hover:bg-white/[0.06] transition-colors duration-150 flex items-center gap-2"
              >
                <span>Quick start</span>
                <Kbd><ShortcutHint keys="K" /></Kbd>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. ISSUE BOARD                                                */}
      {/* ============================================================ */}
      <section className="py-20 px-5 md:px-10">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-100 mb-1">Issue Board</h2>
                <p className="text-sm text-zinc-500">The core interface — dense, scannable, keyboard-driven.</p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Kbd>C</Kbd>
                <span className="text-xs text-zinc-600">New issue</span>
              </div>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="border border-white/10 rounded-lg overflow-hidden bg-white/[0.02]">
              {/* Table header */}
              <div className="grid grid-cols-[auto_1fr_80px_80px_60px_50px] gap-3 px-4 py-2.5 border-b border-white/[0.06] text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                <div className="w-3.5" />
                <div>Issue</div>
                <div>Label</div>
                <div>Priority</div>
                <div>Assignee</div>
                <div className="text-right">Est.</div>
              </div>
              {/* Issue rows */}
              {issues.map((issue, i) => (
                <div
                  key={issue.id}
                  className="grid grid-cols-[auto_1fr_80px_80px_60px_50px] gap-3 px-4 py-2.5 border-b border-white/[0.04] last:border-b-0 hover:bg-white/[0.03] transition-colors duration-150 cursor-pointer group items-center"
                >
                  <StatusIcon status={issue.status} />
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-xs text-zinc-500 font-mono flex-shrink-0">{issue.id}</span>
                    <span className="text-sm text-zinc-200 truncate group-hover:text-zinc-100 transition-colors duration-150">{issue.title}</span>
                  </div>
                  <span
                    className="px-2 py-0.5 text-[10px] font-medium rounded w-fit"
                    style={{ backgroundColor: `${issue.labelColor}15`, color: issue.labelColor }}
                  >
                    {issue.label}
                  </span>
                  <PriorityBadge priority={issue.priority} />
                  <div className="w-6 h-6 rounded-full bg-white/[0.08] flex items-center justify-center text-[10px] font-medium text-zinc-400">
                    {issue.assignee}
                  </div>
                  <span className="text-xs text-zinc-600 text-right">{issue.time}</span>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. DESIGN TOKENS                                                */}
      {/* ============================================================ */}
      <section className="py-20 px-5 md:px-10 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-100 mb-1">Design Tokens</h2>
            <p className="text-sm text-zinc-500 mb-10">The precise values behind the aesthetic.</p>
          </RevealBlock>

          {/* Color palette */}
          <RevealBlock delay={0.1} className="mb-12">
            <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Color Palette</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {colorTokens.map((c) => (
                <div key={c.name} className="border border-white/10 rounded-lg overflow-hidden">
                  <div className="h-16" style={{ backgroundColor: c.value }} />
                  <div className="px-3 py-2.5 bg-white/[0.02]">
                    <div className="text-xs font-medium text-zinc-200">{c.name}</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{c.display || c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>

          {/* Border & Surface */}
          <RevealBlock delay={0.15} className="mb-12">
            <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Surface & Border Hierarchy</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-white/10 rounded-lg p-5 bg-white/[0.02] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="text-xs font-medium text-zinc-200 mb-1">Surface Level 1</div>
                <div className="text-[10px] text-zinc-500 font-mono">bg-white/[0.02] + border-white/10</div>
                <div className="text-xs text-zinc-400 mt-2">Cards, panels, containers</div>
              </div>
              <div className="border border-white/10 rounded-lg p-5 bg-white/[0.05] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="text-xs font-medium text-zinc-200 mb-1">Surface Level 2</div>
                <div className="text-[10px] text-zinc-500 font-mono">bg-white/[0.05] + border-white/10</div>
                <div className="text-xs text-zinc-400 mt-2">Hover states, active rows</div>
              </div>
              <div className="border border-white/[0.15] rounded-lg p-5 bg-[#161618] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <div className="text-xs font-medium text-zinc-200 mb-1">Elevated Surface</div>
                <div className="text-[10px] text-zinc-500 font-mono">bg-[#161618] + backdrop-blur</div>
                <div className="text-xs text-zinc-400 mt-2">Modals, command palette, dropdowns</div>
              </div>
            </div>
          </RevealBlock>

          {/* Typography */}
          <RevealBlock delay={0.2}>
            <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Typography Scale</h3>
            <div className="border border-white/10 rounded-lg overflow-hidden">
              {typographyScale.map((t, i) => (
                <div key={t.label} className={`flex items-baseline gap-6 px-5 py-3.5 ${i < typographyScale.length - 1 ? "border-b border-white/[0.04]" : ""}`}>
                  <div className="w-16 flex-shrink-0">
                    <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">{t.label}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`${t.size} ${t.weight} ${t.tracking} text-zinc-100 truncate block`}>{t.sample}</span>
                  </div>
                  <div className="hidden md:block flex-shrink-0">
                    <span className="text-[10px] text-zinc-600 font-mono">{t.size} {t.weight} {t.tracking || "normal"}</span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. COMPONENT DEMOS                                              */}
      {/* ============================================================ */}
      <section className="py-20 px-5 md:px-10 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-100 mb-1">Components</h2>
            <p className="text-sm text-zinc-500 mb-10">Restrained, functional, keyboard-first.</p>
          </RevealBlock>

          {/* Tab bar */}
          <RevealBlock delay={0.05}>
            <div className="flex gap-1 mb-8 border-b border-white/[0.06]">
              {(["buttons", "cards", "inputs", "badges"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 text-xs font-medium capitalize transition-colors duration-150 border-b-2 -mb-px ${
                    activeTab === tab
                      ? "text-zinc-100 border-[#5e6ad2]"
                      : "text-zinc-500 border-transparent hover:text-zinc-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Buttons */}
          {activeTab === "buttons" && (
            <RevealBlock delay={0.1}>
              <div className="flex flex-wrap gap-3 items-center">
                <button type="button" className="px-4 py-2 bg-gradient-to-r from-[#5e6ad2] to-[#8b5cf6] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity duration-150">
                  Primary
                </button>
                <button type="button" className="px-4 py-2 border border-white/10 bg-white/[0.03] text-zinc-300 text-sm font-medium rounded-lg hover:bg-white/[0.06] transition-colors duration-150">
                  Secondary
                </button>
                <button type="button" className="px-4 py-2 text-zinc-400 text-sm font-medium rounded-lg hover:text-zinc-200 hover:bg-white/[0.04] transition-colors duration-150">
                  Ghost
                </button>
                <button type="button" className="px-4 py-2 bg-[#eb5757]/10 text-[#eb5757] text-sm font-medium rounded-lg hover:bg-[#eb5757]/20 transition-colors duration-150">
                  Destructive
                </button>
                <button type="button" className="px-3 py-1.5 border border-white/10 bg-white/[0.03] text-zinc-400 text-xs font-medium rounded-md hover:bg-white/[0.06] transition-colors duration-150 flex items-center gap-1.5">
                  <SearchIcon className="w-3 h-3" />
                  With Icon
                </button>
              </div>
            </RevealBlock>
          )}

          {/* Cards */}
          {activeTab === "cards" && (
            <RevealBlock delay={0.1}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-colors duration-150">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-4 h-4 rounded-full border-2 border-[#5e6ad2]" />
                    <span className="text-sm text-white font-medium">STY-142</span>
                    <span className="ml-auto text-xs text-zinc-500">2h ago</span>
                  </div>
                  <h4 className="text-white text-sm mb-1.5">Add dark mode support for dashboard</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">Implement theme switching with system preference detection.</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-medium text-[#5e6ad2] bg-[#5e6ad2]/10 rounded">Feature</span>
                    <span className="px-2 py-0.5 text-[10px] font-medium text-[#f2c94c] bg-[#f2c94c]/10 rounded">In Progress</span>
                  </div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.05] transition-colors duration-150">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircleIcon className="w-4 h-4 text-[#27ae60]" />
                    <span className="text-sm text-white font-medium">STY-139</span>
                    <span className="ml-auto text-xs text-zinc-500">1d ago</span>
                  </div>
                  <h4 className="text-white text-sm mb-1.5">Optimize SVG icon sprite generation</h4>
                  <p className="text-zinc-500 text-xs leading-relaxed">Reduce bundle size by 40% with tree-shaking.</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-medium text-[#27ae60] bg-[#27ae60]/10 rounded">Done</span>
                    <span className="px-2 py-0.5 text-[10px] font-medium text-[#2d9cdb] bg-[#2d9cdb]/10 rounded">Perf</span>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Inputs */}
          {activeTab === "inputs" && (
            <RevealBlock delay={0.1}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-zinc-400 text-xs font-medium">Issue title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#5e6ad2]/50 focus:bg-white/[0.05] transition-all duration-150"
                    placeholder="Enter a title..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-zinc-400 text-xs font-medium">Description</label>
                  <textarea
                    className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#5e6ad2]/50 focus:bg-white/[0.05] transition-all duration-150 resize-none h-20"
                    placeholder="Add a description..."
                  />
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Badges */}
          {activeTab === "badges" && (
            <RevealBlock delay={0.1}>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Feature", color: "#5e6ad2" },
                  { label: "Bug", color: "#eb5757" },
                  { label: "Enhancement", color: "#f2c94c" },
                  { label: "Performance", color: "#2d9cdb" },
                  { label: "Documentation", color: "#27ae60" },
                  { label: "Refactor", color: "#9b59b6" },
                  { label: "Urgent", color: "#eb5757" },
                  { label: "In Progress", color: "#5e6ad2" },
                  { label: "Done", color: "#27ae60" },
                  { label: "Backlog", color: "#71717a" },
                ].map((b) => (
                  <span
                    key={b.label}
                    className="px-2.5 py-1 text-[11px] font-medium rounded"
                    style={{ color: b.color, background: `${b.color}15` }}
                  >
                    {b.label}
                  </span>
                ))}
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. DESIGN RULES                                                */}
      {/* ============================================================ */}
      <section className="py-20 px-5 md:px-10 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-100 mb-1">Design Rules</h2>
            <p className="text-sm text-zinc-500 mb-10">The constraints that define the aesthetic.</p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            <RevealBlock delay={0.1}>
              <div className="border border-white/10 rounded-lg p-6 bg-white/[0.02]">
                <h3 className="text-sm font-medium text-[#27ae60] mb-5 flex items-center gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-[#27ae60]" />
                  Do
                </h3>
                <ul className="space-y-2.5">
                  {doRules.map((rule, i) => (
                    <li key={i} className="flex gap-2.5 text-xs text-zinc-400">
                      <span className="text-[#27ae60] shrink-0 font-medium">+</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.15}>
              <div className="border border-white/10 rounded-lg p-6 bg-white/[0.02]">
                <h3 className="text-sm font-medium text-[#eb5757] mb-5 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <circle cx="7" cy="7" r="5.5" stroke="#eb5757" strokeWidth="1.2" />
                    <path d="M5 5l4 4M9 5l-4 4" stroke="#eb5757" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  Don&apos;t
                </h3>
                <ul className="space-y-2.5">
                  {dontRules.map((rule, i) => (
                    <li key={i} className="flex gap-2.5 text-xs text-zinc-400">
                      <span className="text-[#eb5757] shrink-0 font-medium">-</span>
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
      {/* 6. SIDEBAR NAVIGATION                                           */}
      {/* ============================================================ */}
      <section className="py-20 px-5 md:px-10 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-100 mb-1">Sidebar Navigation</h2>
            <p className="text-sm text-zinc-500 mb-10">Compact, hierarchical, workspace-aware.</p>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="max-w-xs border border-white/10 rounded-lg bg-white/[0.02] overflow-hidden">
              {/* Workspace header */}
              <div className="px-3 py-3 border-b border-white/[0.06] flex items-center gap-2.5">
                <div className="w-5 h-5 rounded flex items-center justify-center bg-gradient-to-br from-[#5e6ad2] to-[#8b5cf6]">
                  <span className="text-[9px] font-bold text-white">S</span>
                </div>
                <span className="text-sm font-medium text-zinc-200 tracking-tight">StyleKit</span>
                <svg className="w-3 h-3 text-zinc-500 ml-auto" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
                  <path d="M3 4.5l3 3 3-3" />
                </svg>
              </div>

              {/* Nav items */}
              <div className="py-1.5 px-1.5">
                {sidebarItems.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors duration-150 cursor-pointer ${
                      item.active
                        ? "bg-white/[0.06] text-zinc-100"
                        : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
                    }`}
                  >
                    {item.icon === "home" && <HomeIcon className="w-3.5 h-3.5 flex-shrink-0" />}
                    {item.icon === "inbox" && <InboxIcon className="w-3.5 h-3.5 flex-shrink-0" />}
                    {item.icon === "issues" && <IssueIcon className="w-3.5 h-3.5 flex-shrink-0" />}
                    {item.icon === "views" && <ViewsIcon className="w-3.5 h-3.5 flex-shrink-0" />}
                    <span className="text-xs font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto text-[10px] font-medium text-zinc-500 bg-white/[0.06] px-1.5 py-0.5 rounded">
                        {item.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Teams section */}
              <div className="px-1.5 pb-3">
                <div className="px-2.5 py-2 text-[10px] font-medium text-zinc-600 uppercase tracking-wider">
                  Teams
                </div>
                {sidebarTeams.map((team) => (
                  <div
                    key={team.key}
                    className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200 transition-colors duration-150 cursor-pointer"
                  >
                    <div
                      className="w-3.5 h-3.5 rounded flex items-center justify-center text-[8px] font-bold text-white"
                      style={{ backgroundColor: team.color }}
                    >
                      {team.key[0]}
                    </div>
                    <span className="text-xs font-medium">{team.name}</span>
                    <span className="ml-auto text-[10px] text-zinc-600 font-mono">{team.key}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. INTERACTION PHYSICS                                         */}
      {/* ============================================================ */}
      <section className="py-20 px-5 md:px-10 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-100 mb-1">Interaction Physics</h2>
            <p className="text-sm text-zinc-500 mb-10">Fast, precise, no theatrics. Hover each element to feel the difference.</p>
          </RevealBlock>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Opacity hover */}
            <RevealBlock delay={0.1}>
              <div className="border border-white/10 rounded-lg p-6 bg-white/[0.02]">
                <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Opacity Transition</h3>
                <p className="text-xs text-zinc-500 mb-4">Primary buttons use opacity for hover — no color shift, no scale.</p>
                <button type="button" className="px-5 py-2.5 bg-gradient-to-r from-[#5e6ad2] to-[#8b5cf6] text-white text-sm font-medium rounded-lg hover:opacity-90 active:opacity-80 transition-opacity duration-150">
                  Hover me
                </button>
                <div className="mt-3 text-[10px] text-zinc-600 font-mono">hover:opacity-90 / duration-150</div>
              </div>
            </RevealBlock>

            {/* Background hover */}
            <RevealBlock delay={0.15}>
              <div className="border border-white/10 rounded-lg p-6 bg-white/[0.02]">
                <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Surface Hover</h3>
                <p className="text-xs text-zinc-500 mb-4">List items and cards brighten their surface on hover.</p>
                <div className="space-y-1">
                  {["Active sprint", "Backlog", "Completed"].map((item) => (
                    <div
                      key={item}
                      className="px-3 py-2 rounded-md text-sm text-zinc-300 hover:bg-white/[0.05] transition-colors duration-150 cursor-pointer"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-[10px] text-zinc-600 font-mono">hover:bg-white/[0.05] / duration-150</div>
              </div>
            </RevealBlock>

            {/* Focus ring */}
            <RevealBlock delay={0.2}>
              <div className="border border-white/10 rounded-lg p-6 bg-white/[0.02]">
                <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Focus State</h3>
                <p className="text-xs text-zinc-500 mb-4">Inputs use a subtle brand-colored border on focus.</p>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-white/[0.03] border border-white/10 rounded-lg text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#5e6ad2]/50 focus:bg-white/[0.05] transition-all duration-150"
                  placeholder="Click to focus..."
                />
                <div className="mt-3 text-[10px] text-zinc-600 font-mono">focus:border-[#5e6ad2]/50</div>
              </div>
            </RevealBlock>

            {/* Transition speed comparison */}
            <RevealBlock delay={0.25}>
              <div className="border border-white/10 rounded-lg p-6 bg-white/[0.02]">
                <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4">Speed Matters</h3>
                <p className="text-xs text-zinc-500 mb-4">150ms is the sweet spot. Compare with slower transitions.</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-md text-xs text-zinc-300 bg-white/[0.03] hover:bg-white/[0.08] transition-colors duration-150 cursor-pointer">
                      150ms
                    </div>
                    <span className="text-[10px] text-[#27ae60] font-mono">Correct</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-md text-xs text-zinc-300 bg-white/[0.03] hover:bg-white/[0.08] transition-colors duration-500 cursor-pointer">
                      500ms
                    </div>
                    <span className="text-[10px] text-[#eb5757] font-mono">Too slow</span>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER                                                         */}
      {/* ============================================================ */}
      <footer className="py-8 px-5 md:px-10 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs text-zinc-600">
            Linear Style Showcase{" "}
            <span className="text-zinc-700">
              · Part of{" "}
              <Link href="/" className="text-zinc-500 hover:text-zinc-300 transition-colors duration-150">
                StyleKit
              </Link>
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}

