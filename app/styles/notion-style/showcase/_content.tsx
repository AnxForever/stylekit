"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

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
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const sidebarPages = [
  { icon: "home", label: "Home", active: false, indent: 0 },
  { icon: "page", label: "Quick Note", active: true, indent: 0 },
  { icon: "page", label: "Personal Home", active: false, indent: 0 },
  { icon: "page", label: "Reading List", active: false, indent: 1 },
  { icon: "page", label: "Book Notes", active: false, indent: 1 },
  { icon: "database", label: "Task Board", active: false, indent: 0 },
  { icon: "database", label: "Project Tracker", active: false, indent: 0 },
  { icon: "page", label: "Design System", active: false, indent: 0 },
];

const taskItems = [
  { done: true, text: "Set up project structure", tag: "Setup", tagColor: "#2eaadc" },
  { done: true, text: "Design component library", tag: "Design", tagColor: "#0f7b6c" },
  { done: false, text: "Implement responsive layout", tag: "Dev", tagColor: "#eb5757" },
  { done: false, text: "Write documentation", tag: "Docs", tagColor: "#dfab01" },
  { done: false, text: "User testing round", tag: "QA", tagColor: "#9b9a97" },
  { done: false, text: "Deploy to production", tag: "Ops", tagColor: "#e07b39" },
];

const tableData = [
  { name: "Typography", status: "Done", priority: "High", owner: "Design", date: "Jan 10" },
  { name: "Color System", status: "Done", priority: "High", owner: "Design", date: "Jan 14" },
  { name: "Components", status: "In Progress", priority: "Medium", owner: "Dev", date: "Feb 01" },
  { name: "Animations", status: "In Progress", priority: "Low", owner: "Dev", date: "Feb 08" },
  { name: "Documentation", status: "Not Started", priority: "Low", owner: "Writer", date: "Mar 01" },
];

const paletteColors = [
  { name: "Text", value: "#37352f", textClass: "text-white" },
  { name: "Background", value: "#ffffff", textClass: "text-[#37352f]" },
  { name: "Surface", value: "#f7f6f3", textClass: "text-[#37352f]" },
  { name: "Hover", value: "#efedea", textClass: "text-[#37352f]" },
  { name: "Active", value: "#e3e1db", textClass: "text-[#37352f]" },
  { name: "Blue", value: "#2eaadc", textClass: "text-white" },
  { name: "Red", value: "#eb5757", textClass: "text-white" },
  { name: "Teal", value: "#0f7b6c", textClass: "text-white" },
];

const highlightColors = [
  { label: "Default", bg: "#37352f14", text: "#37352f" },
  { label: "Blue", bg: "#2eaadc20", text: "#2eaadc" },
  { label: "Red", bg: "#eb575720", text: "#eb5757" },
  { label: "Teal", bg: "#0f7b6c20", text: "#0f7b6c" },
  { label: "Yellow", bg: "#dfab0120", text: "#dfab01" },
  { label: "Orange", bg: "#e07b3920", text: "#e07b39" },
  { label: "Pink", bg: "#e255a120", text: "#e255a1" },
  { label: "Purple", bg: "#9065b020", text: "#9065b0" },
];

const doRules = [
  "Use Notion signature surface color #f7f6f3 for page background",
  "Subtle borders with border-gray-200 or low-opacity variants",
  "Hover background #efedea, active press background #e3e1db",
  "Maintain clear text hierarchy with size and opacity levels",
  "System font stack: -apple-system, BlinkMacSystemFont, Segoe UI",
  "Drag handle ⋮⋮ appears on block hover, opacity 0 to 100",
  "All transitions duration-150 for instant, natural responsiveness",
  "Keep corners small: rounded or rounded-md only",
  "Use semantic colors sparingly — blue for info, red for danger, teal for success",
];

const dontRules = [
  "Never use large corners rounded-2xl or larger",
  "Never use gradient backgrounds on content areas",
  "Never use heavy shadows (shadow-xl or shadow-2xl)",
  "Never use overly vivid or saturated accent colors",
  "Never apply translate or scale transforms on hover or active",
  "Never add border changes or shadow jumps on hover",
  "Never animate layout-affecting properties",
  "Never use decorative elements that compete with content",
];

const typographyExamples = [
  { tag: "h1", label: "Heading 1", size: "text-3xl", weight: "font-bold", sample: "The Block-Based Editor" },
  { tag: "h2", label: "Heading 2", size: "text-2xl", weight: "font-semibold", sample: "Core Principles" },
  { tag: "h3", label: "Heading 3", size: "text-xl", weight: "font-semibold", sample: "Interaction Physics" },
  { tag: "p", label: "Body", size: "text-base", weight: "font-normal", sample: "Content readability is the primary concern of every design decision made here." },
  { tag: "small", label: "Caption", size: "text-sm", weight: "font-normal", sample: "Secondary context and metadata live at this scale with reduced opacity." },
  { tag: "tiny", label: "Label", size: "text-xs", weight: "font-medium", sample: "TAGS / STATUS / METADATA" },
];

/* ------------------------------------------------------------------ */
/*  Icon components                                                    */
/* ------------------------------------------------------------------ */

function IconPage() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-[#37352f]/40 flex-shrink-0">
      <rect x="2" y="1.5" width="9" height="10" rx="1" stroke="currentColor" strokeWidth="1" />
      <path d="M4.5 4.5h4M4.5 6.5h4M4.5 8.5h2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function IconDatabase() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-[#37352f]/40 flex-shrink-0">
      <rect x="1" y="1" width="11" height="3" rx="0.5" stroke="currentColor" strokeWidth="1" />
      <rect x="1" y="5.5" width="11" height="3" rx="0.5" stroke="currentColor" strokeWidth="1" />
      <rect x="1" y="10" width="11" height="2" rx="0.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function IconHome() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-[#37352f]/40 flex-shrink-0">
      <path d="M1.5 6.5L6.5 2L11.5 6.5V11.5H8.5V8.5H4.5V11.5H1.5V6.5Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

function SidebarIcon({ type }: { type: string }) {
  if (type === "database") return <IconDatabase />;
  if (type === "home") return <IconHome />;
  return <IconPage />;
}

/* ------------------------------------------------------------------ */
/*  DragHandle                                                         */
/* ------------------------------------------------------------------ */

function DragHandle({ top = "top-2" }: { top?: string }) {
  return (
    <div
      className={`absolute -left-5 ${top} opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-grab select-none`}
      aria-hidden="true"
    >
      <span className="text-[#37352f]/30 text-sm leading-none">&#x22EE;&#x22EE;</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ToggleBlock                                                        */
/* ------------------------------------------------------------------ */

function ToggleBlock({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="group relative pl-5">
      <DragHandle />
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-full text-left py-1 hover:bg-[#efedea] active:bg-[#e3e1db] rounded-md px-2 -ml-2 transition-colors duration-150"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          className={`text-[#37352f]/40 flex-shrink-0 transition-transform duration-150 ${open ? "rotate-90" : ""}`}
        >
          <path
            d="M5 3l5 4-5 4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-[#37352f] font-medium text-sm">{title}</span>
      </button>
      {open && (
        <div className="ml-5 mt-1 pb-2 text-[#37352f]/70 text-sm leading-relaxed border-l border-gray-200 pl-4">
          {children}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  TaskCheckbox                                                       */
/* ------------------------------------------------------------------ */

function TaskCheckbox({ item }: { item: (typeof taskItems)[number] }) {
  const [checked, setChecked] = useState(item.done);
  return (
    <div className="group flex items-center gap-3 py-2 px-3 -mx-3 rounded-md hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 cursor-pointer relative">
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0 select-none text-[#37352f]/30 text-xs leading-none">
        &#x22EE;&#x22EE;
      </div>
      <button
        type="button"
        onClick={() => setChecked(!checked)}
        className={`w-4 h-4 rounded-sm border flex-shrink-0 flex items-center justify-center transition-colors duration-150 ${
          checked ? "bg-[#2eaadc] border-[#2eaadc]" : "border-gray-300 hover:border-gray-400"
        }`}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 5l2 2 4-4"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      <span
        className={`text-sm flex-1 ${
          checked ? "line-through text-[#37352f]/40" : "text-[#37352f]"
        }`}
      >
        {item.text}
      </span>
      <span
        className="text-xs px-2 py-0.5 rounded-sm font-medium"
        style={{
          backgroundColor: `${item.tagColor}18`,
          color: item.tagColor,
        }}
      >
        {item.tag}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Callout block variants                                             */
/* ------------------------------------------------------------------ */

function CalloutBlock({
  emoji,
  color,
  title,
  children,
}: {
  emoji: string;
  color: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="group relative pl-5"
    >
      <DragHandle top="top-3" />
      <div
        className="flex gap-3 p-3.5 rounded-md hover:brightness-[0.97] transition-all duration-150 cursor-text"
        style={{
          backgroundColor: `${color}0d`,
          border: `1px solid ${color}30`,
        }}
      >
        <span className="flex-shrink-0 text-base leading-relaxed">{emoji}</span>
        <div className="flex-1 min-w-0">
          {title && (
            <p className="text-sm font-semibold mb-1" style={{ color }}>
              {title}
            </p>
          )}
          <p className="text-[#37352f]/80 text-sm leading-relaxed">{children}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

export default function NotionStyleShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"checklist" | "table" | "board">("checklist");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>("typography");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const tabs = ["checklist", "table", "board"] as const;

  return (
    <div
      className="min-h-screen bg-[#f7f6f3] text-[#37352f] font-sans"
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
      }}
    >
      {/* ============================================================ */}
      {/* Section 1 — Fixed Navigation                                 */}
      {/* ============================================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-11 px-4 max-w-full">
          <div className="flex items-center gap-2">
            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 hover:bg-[#efedea] active:bg-[#e3e1db] rounded transition-colors duration-150 md:hidden"
              aria-label="Toggle sidebar"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />
              </svg>
            </button>

            {/* Logo area */}
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 bg-[#37352f] rounded-sm flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-[10px] leading-none">N</span>
              </div>
              <span className="text-sm font-medium text-[#37352f] hidden sm:inline">Notion Style</span>
            </div>

            {/* Breadcrumb separator */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              className="text-[#37352f]/30 hidden sm:block"
            >
              <path
                d="M4 2l4 4-4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-sm text-[#37352f]/50 hidden sm:inline">Showcase</span>
          </div>

          {/* Nav actions */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              className="px-2.5 py-1 text-xs text-[#37352f]/60 hover:bg-[#efedea] active:bg-[#e3e1db] rounded transition-colors duration-150 flex items-center gap-1.5"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              >
                <circle cx="5" cy="5" r="3.5" />
                <path d="M9.5 9.5l-2-2" />
              </svg>
              <span className="hidden sm:inline">Search</span>
            </button>
            <button
              type="button"
              className="px-2.5 py-1 text-xs text-[#37352f]/60 hover:bg-[#efedea] active:bg-[#e3e1db] rounded transition-colors duration-150 hidden sm:flex items-center gap-1.5"
            >
              Share
            </button>
            <Link
              href="/styles/notion-style"
              className="px-2.5 py-1 text-xs text-[#37352f]/60 hover:bg-[#efedea] active:bg-[#e3e1db] rounded transition-colors duration-150"
            >
              Docs
            </Link>
            <Link
              href="/styles"
              className="px-2.5 py-1 text-xs font-medium text-[#37352f] hover:bg-[#efedea] active:bg-[#e3e1db] rounded transition-colors duration-150 flex items-center gap-1"
            >
              StyleKit
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-[#37352f]/40">
                <path
                  d="M2.5 5h5M5 2.5L7.5 5 5 7.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* Mobile sidebar overlay                                       */}
      {/* ============================================================ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-black/20" />
          <aside
            className="absolute left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 pt-14 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3">
              <button
                type="button"
                className="w-full px-2 py-1.5 text-left text-sm text-[#37352f]/50 hover:bg-[#efedea] active:bg-[#e3e1db] rounded-md transition-colors duration-150 flex items-center gap-2 mb-2"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-[#37352f]/40">
                  <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1" />
                  <path d="M10.5 10.5l-2-2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
                Search
              </button>
              <div className="mt-3 mb-1 px-2">
                <span className="text-xs font-semibold text-[#37352f]/40 uppercase tracking-wider">
                  Workspace
                </span>
              </div>
              <div className="space-y-0.5">
                {sidebarPages.map((pg) => (
                  <div
                    key={pg.label}
                    className={`flex items-center gap-2 rounded-md transition-colors duration-150 cursor-pointer text-sm ${
                      pg.indent === 1 ? "pl-6 pr-2 py-1.5" : "px-2 py-1.5"
                    } ${
                      pg.active
                        ? "bg-[#efedea] text-[#37352f]"
                        : "text-[#37352f]/70 hover:bg-[#efedea]"
                    }`}
                  >
                    <SidebarIcon type={pg.icon} />
                    <span className={pg.active ? "font-medium" : ""}>{pg.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* ============================================================ */}
      {/* Layout: Sidebar + Main                                       */}
      {/* ============================================================ */}
      <div className="flex pt-11 min-h-screen">

        {/* ========================================================== */}
        {/* Desktop sidebar                                             */}
        {/* ========================================================== */}
        <aside className="hidden md:flex flex-col w-64 flex-shrink-0 bg-white border-r border-gray-200 sticky top-11 self-start h-[calc(100vh-2.75rem)] overflow-y-auto">
          <div className="p-3">
            {/* Search */}
            <button
              type="button"
              className="w-full px-2 py-1.5 mb-2 text-left text-sm text-[#37352f]/50 hover:bg-[#efedea] active:bg-[#e3e1db] rounded-md transition-colors duration-150 flex items-center gap-2"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-[#37352f]/40">
                <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1" />
                <path d="M10.5 10.5l-2-2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
              Search
              <span className="ml-auto text-[10px] text-[#37352f]/30">⌘K</span>
            </button>

            {/* Favorites section */}
            <div className="mt-3 mb-1 px-2">
              <span className="text-xs font-semibold text-[#37352f]/40 uppercase tracking-wider">
                Favorites
              </span>
            </div>
            <div className="space-y-0.5 mb-3">
              {sidebarPages.slice(0, 2).map((pg) => (
                <div
                  key={`fav-${pg.label}`}
                  className={`group flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors duration-150 cursor-pointer ${
                    pg.active
                      ? "bg-[#efedea] text-[#37352f]"
                      : "text-[#37352f]/70 hover:bg-[#efedea] hover:text-[#37352f]"
                  }`}
                >
                  <SidebarIcon type={pg.icon} />
                  <span className={`flex-1 ${pg.active ? "font-medium text-[#37352f]" : ""}`}>
                    {pg.label}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#37352f]/40">
                      <path
                        d="M4 2l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Workspace section */}
            <div className="mt-2 mb-1 px-2">
              <span className="text-xs font-semibold text-[#37352f]/40 uppercase tracking-wider">
                Workspace
              </span>
            </div>
            <div className="space-y-0.5">
              {sidebarPages.map((pg) => (
                <div
                  key={`ws-${pg.label}`}
                  className={`group flex items-center gap-2 rounded-md transition-colors duration-150 cursor-pointer text-sm ${
                    pg.indent === 1 ? "pl-6 pr-2 py-1.5" : "px-2 py-1.5"
                  } ${
                    pg.active
                      ? "bg-[#efedea] text-[#37352f]"
                      : "text-[#37352f]/70 hover:bg-[#efedea] hover:text-[#37352f]"
                  }`}
                >
                  <SidebarIcon type={pg.icon} />
                  <span className={`flex-1 ${pg.active ? "font-medium text-[#37352f]" : ""}`}>
                    {pg.label}
                  </span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#37352f]/40">
                      <path
                        d="M4 2l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* New page button */}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <button
                type="button"
                className="w-full px-2 py-1.5 text-left text-sm text-[#37352f]/40 hover:bg-[#efedea] active:bg-[#e3e1db] rounded-md transition-colors duration-150 flex items-center gap-2"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-[#37352f]/40"
                  strokeLinecap="round"
                >
                  <path d="M6.5 2.5v8M2.5 6.5h8" />
                </svg>
                New page
              </button>
            </div>

            {/* Workspace name footer */}
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-[#efedea] transition-colors duration-150 cursor-pointer">
                <div className="w-5 h-5 rounded-sm bg-[#37352f] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[9px] font-bold">S</span>
                </div>
                <span className="text-xs text-[#37352f]/60 font-medium">StyleKit Workspace</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ========================================================== */}
        {/* Main content area                                           */}
        {/* ========================================================== */}
        <main className="flex-1 min-w-0">

          {/* ========================================================= */}
          {/* Section 2 — Hero: Notion-style page header                 */}
          {/* ========================================================= */}
          <section className="mb-0">
            {/* Cover image — soft gradient banner */}
            <div
              className="w-full h-36 md:h-48 overflow-hidden relative"
              style={{
                background:
                  "linear-gradient(135deg, #2eaadc18 0%, #0f7b6c12 40%, #f7f6f3 100%)",
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {/* Subtle watermark character */}
              <div className="absolute bottom-0 right-8 text-[#37352f]/[0.04] text-[160px] md:text-[220px] font-bold leading-none select-none pointer-events-none">
                N
              </div>
              {/* Breadcrumb path on cover */}
              <div className="absolute top-4 left-6 flex items-center gap-1.5 text-xs text-[#37352f]/40">
                <span>StyleKit</span>
                <span>/</span>
                <span>Notion Style</span>
                <span>/</span>
                <span className="text-[#37352f]/60">Showcase</span>
              </div>
            </div>

            {/* Page header content */}
            <div className="max-w-3xl mx-auto px-6 md:px-16">
              {/* Emoji icon */}
              <div
                className="-mt-7 mb-4 w-14 h-14 flex items-center justify-center text-4xl select-none"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(10px)",
                  transition:
                    "opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s",
                }}
              >
                {"📝"}
              </div>

              {/* Page title */}
              <h1
                className="text-4xl md:text-5xl font-bold text-[#37352f] mb-3 leading-tight"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
                  transition:
                    "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s",
                }}
              >
                Notion Style
              </h1>

              {/* Page description */}
              <p
                className="text-base text-[#37352f]/50 mb-5 max-w-lg leading-relaxed"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(12px)",
                  transition:
                    "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s",
                }}
              >
                A design system inspired by quiet productivity. Every block is a building
                unit. Every interaction is a gentle acknowledgment. Content first, always.
              </p>

              {/* Metadata row */}
              <div
                className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#37352f]/40 pb-6 mb-10 border-b border-gray-200"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.35s",
                }}
              >
                <span>
                  <span className="text-[#37352f]/30">Created </span>
                  Feb 20, 2026
                </span>
                <span>
                  <span className="text-[#37352f]/30">Status </span>
                  <span
                    className="px-1.5 py-0.5 rounded-sm text-[10px] font-medium"
                    style={{ backgroundColor: "#0f7b6c18", color: "#0f7b6c" }}
                  >
                    Published
                  </span>
                </span>
                <span>
                  <span className="text-[#37352f]/30">Category </span>
                  Design System
                </span>
                <span>
                  <span className="text-[#37352f]/30">Version </span>
                  1.0
                </span>
              </div>
            </div>
          </section>

          {/* ========================================================= */}
          {/* Section 3 — Block Editor Simulation                        */}
          {/* ========================================================= */}
          <section className="max-w-3xl mx-auto px-6 md:px-16 mb-16">
            <RevealBlock>
              <div className="space-y-1">

                {/* H1 block */}
                <div className="group relative pl-5">
                  <DragHandle top="top-2" />
                  <h2 className="text-3xl font-bold text-[#37352f] py-1 hover:bg-[#efedea] active:bg-[#e3e1db] rounded-md px-2 -ml-2 transition-colors duration-150 cursor-text">
                    Welcome to Notion Style
                  </h2>
                </div>

                {/* H2 block */}
                <div className="group relative pl-5 mt-5">
                  <DragHandle top="top-1" />
                  <h3 className="text-xl font-semibold text-[#37352f] py-1 hover:bg-[#efedea] active:bg-[#e3e1db] rounded-md px-2 -ml-2 transition-colors duration-150 cursor-text">
                    The block-based editor model
                  </h3>
                </div>

                {/* Paragraph block */}
                <div className="group relative pl-5">
                  <DragHandle top="top-1" />
                  <p className="text-[#37352f]/80 leading-relaxed text-sm py-0.5 hover:bg-[#efedea] active:bg-[#e3e1db] rounded-md px-2 -ml-2 transition-colors duration-150 cursor-text">
                    Every element in this design system is a discrete block. Hover any block
                    to reveal the drag handle on the left. Blocks can be rearranged, nested,
                    and transformed into different types without leaving the keyboard.
                  </p>
                </div>

                {/* Blue callout */}
                <div className="pt-1">
                  <CalloutBlock emoji="💡" color="#2eaadc">
                    Hover any block to see the{" "}
                    <strong className="font-semibold">&#x22EE;&#x22EE;</strong> drag handle
                    appear at opacity-100. This Drag Handle Illusion is Notion&apos;s
                    signature interaction — present only when needed, invisible otherwise.
                  </CalloutBlock>
                </div>

                {/* Divider */}
                <div className="group relative pl-5 py-2">
                  <DragHandle top="top-2" />
                  <hr className="border-t border-[#37352f]/[0.09]" />
                </div>

                {/* Toggle blocks */}
                <ToggleBlock title="Content First">
                  Design serves content, never competes with it. Every visual element has a
                  functional purpose. If something does not aid readability or interaction, it
                  does not belong on the page.
                </ToggleBlock>

                <ToggleBlock title="Subtle Interactions">
                  Hover and click feedback is gentle and natural. Block highlighting uses only
                  a 5% brightness shift — from{" "}
                  <code className="font-mono text-[#37352f]/70 bg-[#37352f]/5 px-1 rounded">
                    #f7f6f3
                  </code>{" "}
                  to{" "}
                  <code className="font-mono text-[#37352f]/70 bg-[#37352f]/5 px-1 rounded">
                    #efedea
                  </code>
                  . Never translate, never scale.
                </ToggleBlock>

                <ToggleBlock title="Clear Hierarchy">
                  Font size and opacity distinguish information layers. H1 is bold and large.
                  Body text is slightly reduced opacity. Secondary metadata is at 40% opacity.
                  No gradients, no heavy shadows, no decoration for its own sake.
                </ToggleBlock>

                <ToggleBlock title="System Typography">
                  Uses the native system font stack so the UI feels native on every platform.
                  On macOS it renders in San Francisco, on Windows in Segoe UI, on Linux in
                  the default sans-serif. No web font loading delays.
                </ToggleBlock>

                {/* Quote block */}
                <div className="group relative pl-5 pt-1">
                  <DragHandle top="top-3" />
                  <blockquote className="border-l-[3px] border-[#37352f] pl-4 py-1 hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 rounded-r-md cursor-text">
                    <p className="text-[#37352f]/70 text-sm leading-relaxed italic">
                      &ldquo;The best interface is the one you don&apos;t notice. Notion&apos;s
                      design achieves invisibility through restraint.&rdquo;
                    </p>
                  </blockquote>
                </div>

                {/* Red callout — warning */}
                <div className="pt-1">
                  <CalloutBlock emoji="⚠️" color="#eb5757" title="Important">
                    Never add translate or scale animations on hover or active states. The
                    entire philosophy of Notion-style interaction relies on pure color shifts
                    with no movement artifacts.
                  </CalloutBlock>
                </div>

                {/* Teal callout — success */}
                <div className="pt-1">
                  <CalloutBlock emoji="✅" color="#0f7b6c" title="Best Practice">
                    Keep all interaction transitions at{" "}
                    <code className="font-mono bg-[#0f7b6c]/10 px-1 rounded text-[#0f7b6c]">
                      duration-150
                    </code>{" "}
                    for immediate, natural responsiveness. Longer transitions feel sluggish in
                    a productivity tool.
                  </CalloutBlock>
                </div>

                {/* Code block */}
                <div className="group relative pl-5 pt-2">
                  <DragHandle top="top-3" />
                  <div className="bg-[#37352f] rounded-md overflow-hidden hover:ring-1 hover:ring-[#37352f]/30 transition-all duration-150">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
                      <span className="text-xs text-white/40 font-mono">typescript</span>
                      <span className="text-xs text-white/20">Block interaction pattern</span>
                    </div>
                    <pre className="px-4 pb-4 pt-3 text-xs text-green-300 font-mono leading-relaxed overflow-x-auto">
                      <code>{`// Drag handle: opacity 0 → 1 on block hover
<div className="group relative">
  <div
    className="absolute -left-5 top-2
      opacity-0 group-hover:opacity-100
      transition-opacity duration-150
      cursor-grab select-none text-[#37352f]/30"
  >
    ⋮⋮
  </div>
  <p
    className="hover:bg-[#efedea]
      active:bg-[#e3e1db]
      transition-colors duration-150
      rounded-md px-2"
  >
    Block content here
  </p>
</div>`}</code>
                    </pre>
                  </div>
                </div>

                {/* Numbered list block */}
                <div className="group relative pl-5 pt-2">
                  <DragHandle top="top-1" />
                  <h3 className="text-lg font-semibold text-[#37352f] py-0.5 mb-2 hover:bg-[#efedea] active:bg-[#e3e1db] rounded-md px-2 -ml-2 transition-colors duration-150 cursor-text">
                    Design principles
                  </h3>
                </div>
                {[
                  "Block model — every element is a draggable, reorderable unit",
                  "Spatial memory — consistent layout prevents cognitive load",
                  "Progressive disclosure — complexity revealed only when needed",
                  "Instant feedback — 150ms is the maximum tolerable delay",
                ].map((item, i) => (
                  <div key={i} className="group relative pl-5">
                    <DragHandle top="top-1" />
                    <div className="flex items-start gap-3 py-0.5 hover:bg-[#efedea] active:bg-[#e3e1db] rounded-md px-2 -ml-2 transition-colors duration-150 cursor-text">
                      <span className="text-xs text-[#37352f]/40 mt-1 flex-shrink-0 w-4 text-right font-mono">
                        {i + 1}.
                      </span>
                      <p className="text-sm text-[#37352f]/80 leading-relaxed">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealBlock>
          </section>

          <div className="max-w-3xl mx-auto px-6 md:px-16">
            <hr className="border-t border-[#37352f]/[0.09] mb-16" />
          </div>

          {/* ========================================================= */}
          {/* Section 4 — Interactive Database View                      */}
          {/* ========================================================= */}
          <section className="max-w-3xl mx-auto px-6 md:px-16 mb-16">
            <RevealBlock className="mb-6">
              <div className="flex items-center gap-3 mb-1">
                <IconDatabase />
                <h2 className="text-xl font-semibold text-[#37352f]">Component Library</h2>
              </div>
              <p className="text-sm text-[#37352f]/50 ml-6">
                Interactive Notion-style database with checklist, table, and board views.
              </p>
            </RevealBlock>

            {/* View switcher tabs */}
            <div className="flex gap-0.5 mb-6 border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-3 py-1.5 text-sm capitalize transition-colors duration-150 ${
                    activeTab === tab
                      ? "text-[#37352f] font-medium"
                      : "text-[#37352f]/50 hover:bg-[#efedea] hover:text-[#37352f] rounded-t-md"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#37352f]" />
                  )}
                </button>
              ))}
            </div>

            {/* Checklist view */}
            {activeTab === "checklist" && (
              <RevealBlock>
                <div className="space-y-0.5">
                  {taskItems.map((item, i) => (
                    <TaskCheckbox key={i} item={item} />
                  ))}
                  <button
                    type="button"
                    className="mt-2 px-3 py-1.5 text-sm text-[#37352f]/40 hover:bg-[#efedea] active:bg-[#e3e1db] rounded transition-colors duration-150 flex items-center gap-2 -mx-3"
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      className="text-[#37352f]/40"
                    >
                      <path d="M6.5 2.5v8M2.5 6.5h8" />
                    </svg>
                    Add item
                  </button>
                </div>
              </RevealBlock>
            )}

            {/* Table view */}
            {activeTab === "table" && (
              <RevealBlock>
                <div className="border border-gray-200 rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#f7f6f3]">
                        {["Name", "Status", "Priority", "Owner", "Date"].map((h) => (
                          <th
                            key={h}
                            className="text-left px-3 py-2.5 font-medium text-[#37352f]/50 text-xs border-b border-r border-gray-200 last:border-r-0"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {tableData.map((row, i) => (
                        <tr
                          key={i}
                          className="group hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 cursor-pointer"
                        >
                          <td className="px-3 py-2.5 border-b border-r border-gray-200 text-[#37352f] text-sm">
                            <div className="flex items-center gap-2">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 select-none text-[#37352f]/30 text-xs leading-none flex-shrink-0">
                                &#x22EE;&#x22EE;
                              </div>
                              {row.name}
                            </div>
                          </td>
                          <td className="px-3 py-2.5 border-b border-r border-gray-200">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-sm font-medium ${
                                row.status === "Done"
                                  ? "bg-[#0f7b6c]/10 text-[#0f7b6c]"
                                  : row.status === "In Progress"
                                  ? "bg-[#2eaadc]/10 text-[#2eaadc]"
                                  : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 border-b border-r border-gray-200 text-[#37352f]/60 text-sm">
                            {row.priority}
                          </td>
                          <td className="px-3 py-2.5 border-b border-r border-gray-200 text-[#37352f]/60 text-sm">
                            {row.owner}
                          </td>
                          <td className="px-3 py-2.5 border-b border-gray-200 text-[#37352f]/40 text-xs font-mono">
                            {row.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="bg-white border-t border-gray-200 px-3 py-2">
                    <button
                      type="button"
                      className="text-xs text-[#37352f]/40 hover:text-[#37352f] transition-colors duration-150 flex items-center gap-1.5"
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                      >
                        <path d="M5.5 1.5v8M1.5 5.5h8" />
                      </svg>
                      New row
                    </button>
                  </div>
                </div>
              </RevealBlock>
            )}

            {/* Board / Kanban view */}
            {activeTab === "board" && (
              <RevealBlock>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* To Do */}
                  <div>
                    <div className="flex items-center gap-2 mb-2 px-1">
                      <span className="text-xs font-semibold text-[#37352f]/50 uppercase tracking-wider">
                        To Do
                      </span>
                      <span className="text-xs text-[#37352f]/30">3</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        "Implement responsive layout",
                        "Write documentation",
                        "User testing round",
                      ].map((t) => (
                        <div
                          key={t}
                          className="group p-3 bg-white border border-gray-200 rounded-md hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 cursor-pointer"
                        >
                          <div className="flex items-start gap-2">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 select-none text-[#37352f]/30 text-xs mt-0.5 flex-shrink-0">
                              &#x22EE;&#x22EE;
                            </div>
                            <p className="text-sm text-[#37352f] leading-snug">{t}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* In Progress */}
                  <div>
                    <div className="flex items-center gap-2 mb-2 px-1">
                      <span className="text-xs font-semibold text-[#2eaadc] uppercase tracking-wider">
                        In Progress
                      </span>
                      <span className="text-xs text-[#37352f]/30">2</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { text: "Design component library", tag: "Design", color: "#0f7b6c" },
                        { text: "Set up project structure", tag: "Setup", color: "#2eaadc" },
                      ].map((card) => (
                        <div
                          key={card.text}
                          className="group p-3 bg-white border border-gray-200 rounded-md hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 cursor-pointer"
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 select-none text-[#37352f]/30 text-xs mt-0.5 flex-shrink-0">
                              &#x22EE;&#x22EE;
                            </div>
                            <p className="text-sm text-[#37352f] leading-snug">{card.text}</p>
                          </div>
                          <span
                            className="text-xs px-2 py-0.5 rounded-sm font-medium ml-4"
                            style={{
                              backgroundColor: `${card.color}15`,
                              color: card.color,
                            }}
                          >
                            {card.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Done */}
                  <div>
                    <div className="flex items-center gap-2 mb-2 px-1">
                      <span className="text-xs font-semibold text-[#0f7b6c] uppercase tracking-wider">
                        Done
                      </span>
                      <span className="text-xs text-[#37352f]/30">1</span>
                    </div>
                    <div className="space-y-2">
                      <div className="group p-3 bg-white border border-gray-200 rounded-md hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 cursor-pointer opacity-60">
                        <div className="flex items-start gap-2 mb-2">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 select-none text-[#37352f]/30 text-xs mt-0.5 flex-shrink-0">
                            &#x22EE;&#x22EE;
                          </div>
                          <p className="text-sm text-[#37352f] line-through leading-snug">
                            Color system research
                          </p>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded-sm font-medium ml-4 bg-[#0f7b6c]/10 text-[#0f7b6c]">
                          Research
                        </span>
                      </div>
                    </div>
                    {/* Add card button */}
                    <button
                      type="button"
                      className="mt-2 w-full px-2 py-1.5 text-xs text-[#37352f]/40 hover:bg-[#efedea] active:bg-[#e3e1db] rounded-md transition-colors duration-150 flex items-center gap-1.5"
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                      >
                        <path d="M5.5 1.5v8M1.5 5.5h8" />
                      </svg>
                      New
                    </button>
                  </div>
                </div>
              </RevealBlock>
            )}
          </section>

          <div className="max-w-3xl mx-auto px-6 md:px-16">
            <hr className="border-t border-[#37352f]/[0.09] mb-16" />
          </div>

          {/* ========================================================= */}
          {/* Section 5 — Color Palette                                  */}
          {/* ========================================================= */}
          <section className="max-w-3xl mx-auto px-6 md:px-16 mb-16">
            <RevealBlock className="mb-6">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-4 h-4 rounded-sm bg-gradient-to-br from-[#2eaadc] via-[#0f7b6c] to-[#eb5757]" />
                <h2 className="text-xl font-semibold text-[#37352f]">Color System</h2>
              </div>
              <p className="text-sm text-[#37352f]/50 ml-7">
                Restrained and functional. Colors serve meaning, not decoration.
              </p>
            </RevealBlock>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {paletteColors.map((c, i) => (
                <RevealBlock key={c.name} delay={i * 0.04}>
                  <div className="group cursor-pointer">
                    <div
                      className={`aspect-[4/3] rounded-md flex items-end p-3 border border-gray-200 hover:ring-1 hover:ring-[#37352f]/20 transition-all duration-150 ${c.textClass}`}
                      style={{ backgroundColor: c.value }}
                    >
                      <div>
                        <p className="text-xs font-semibold leading-tight">{c.name}</p>
                        <p className="text-xs opacity-50 font-mono leading-tight">{c.value}</p>
                      </div>
                    </div>
                  </div>
                </RevealBlock>
              ))}
            </div>

            {/* Text highlight swatches */}
            <RevealBlock delay={0.3}>
              <p className="text-xs text-[#37352f]/40 mb-3 font-medium uppercase tracking-wider">
                Text highlight colors
              </p>
              <div className="flex flex-wrap gap-2">
                {highlightColors.map((chip) => (
                  <div
                    key={chip.label}
                    className="group relative px-3 py-1 rounded-md text-xs font-medium hover:brightness-95 active:brightness-90 transition-all duration-150 cursor-pointer"
                    style={{ backgroundColor: chip.bg, color: chip.text }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute -left-3 top-1/2 -translate-y-1/2 select-none text-[#37352f]/30 text-xs">
                      &#x22EE;&#x22EE;
                    </div>
                    {chip.label}
                  </div>
                ))}
              </div>
            </RevealBlock>

            {/* Semantic usage table */}
            <RevealBlock delay={0.4} className="mt-8">
              <p className="text-xs text-[#37352f]/40 mb-3 font-medium uppercase tracking-wider">
                Semantic usage
              </p>
              <div className="border border-gray-200 rounded-md overflow-hidden">
                {[
                  {
                    color: "#2eaadc",
                    name: "Blue",
                    uses: "Info callouts, links, primary actions, in-progress status",
                  },
                  {
                    color: "#eb5757",
                    name: "Red",
                    uses: "Error callouts, destructive actions, danger warnings",
                  },
                  {
                    color: "#0f7b6c",
                    name: "Teal",
                    uses: "Success callouts, completed status, positive confirmation",
                  },
                  {
                    color: "#dfab01",
                    name: "Yellow",
                    uses: "Warning callouts, pending states, caution indicators",
                  },
                ].map((item, i) => (
                  <div
                    key={item.name}
                    className={`group flex items-center gap-3 px-4 py-3 hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 cursor-default ${
                      i < 3 ? "border-b border-gray-200" : ""
                    }`}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 select-none text-[#37352f]/30 text-xs flex-shrink-0">
                      &#x22EE;&#x22EE;
                    </div>
                    <div
                      className="w-3 h-3 rounded-sm flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium w-14 flex-shrink-0" style={{ color: item.color }}>
                      {item.name}
                    </span>
                    <span className="text-sm text-[#37352f]/60">{item.uses}</span>
                  </div>
                ))}
              </div>
            </RevealBlock>
          </section>

          <div className="max-w-3xl mx-auto px-6 md:px-16">
            <hr className="border-t border-[#37352f]/[0.09] mb-16" />
          </div>

          {/* ========================================================= */}
          {/* Section 6 — Typography System                              */}
          {/* ========================================================= */}
          <section className="max-w-3xl mx-auto px-6 md:px-16 mb-16">
            <RevealBlock className="mb-6">
              <h2 className="text-xl font-semibold text-[#37352f] mb-1">Typography System</h2>
              <p className="text-sm text-[#37352f]/50">
                System font stack. Size and weight carry the entire visual hierarchy.
              </p>
            </RevealBlock>

            <div className="border border-gray-200 rounded-md overflow-hidden">
              {typographyExamples.map((item, i) => (
                <RevealBlock
                  key={item.label}
                  delay={i * 0.05}
                >
                  <div
                    className={`group flex flex-col md:flex-row md:items-center gap-3 md:gap-6 px-4 py-4 hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 cursor-default ${
                      i < typographyExamples.length - 1 ? "border-b border-gray-200" : ""
                    }`}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 select-none text-[#37352f]/30 text-xs flex-shrink-0 hidden md:block">
                      &#x22EE;&#x22EE;
                    </div>
                    <div className="flex items-center gap-3 md:w-32 flex-shrink-0">
                      <code className="text-xs font-mono text-[#37352f]/30 bg-[#37352f]/5 px-1.5 py-0.5 rounded w-12 text-center">
                        {item.tag}
                      </code>
                      <span className="text-xs text-[#37352f]/40 font-medium">{item.label}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`${item.size} ${item.weight} text-[#37352f] leading-snug truncate`}>
                        {item.sample}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#37352f]/30 font-mono flex-shrink-0">
                      <span>{item.size}</span>
                      <span className="text-[#37352f]/20">·</span>
                      <span>{item.weight}</span>
                    </div>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </section>

          <div className="max-w-3xl mx-auto px-6 md:px-16">
            <hr className="border-t border-[#37352f]/[0.09] mb-16" />
          </div>

          {/* ========================================================= */}
          {/* Section 7 — Interaction Showcase                           */}
          {/* ========================================================= */}
          <section className="max-w-3xl mx-auto px-6 md:px-16 mb-16">
            <RevealBlock className="mb-6">
              <h2 className="text-xl font-semibold text-[#37352f] mb-1">Interaction Physics</h2>
              <p className="text-sm text-[#37352f]/50">
                Ultimate restraint. Zero translate. Zero scale. Color only.
              </p>
            </RevealBlock>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Block highlight demo */}
              <RevealBlock>
                <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
                  <div className="px-4 py-3 border-b border-gray-200 bg-[#f7f6f3]">
                    <span className="text-xs font-medium text-[#37352f]/50">
                      Block Highlighting — hover each row
                    </span>
                  </div>
                  <div className="p-4 space-y-0.5">
                    {[
                      "Heading block",
                      "Paragraph block",
                      "List item block",
                      "Callout block",
                      "Toggle block",
                    ].map((name) => (
                      <div
                        key={name}
                        className="group flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 cursor-pointer"
                      >
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 select-none text-[#37352f]/30 text-xs flex-shrink-0">
                          &#x22EE;&#x22EE;
                        </div>
                        <span className="text-sm text-[#37352f]">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealBlock>

              {/* Button variants */}
              <RevealBlock delay={0.1}>
                <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
                  <div className="px-4 py-3 border-b border-gray-200 bg-[#f7f6f3]">
                    <span className="text-xs font-medium text-[#37352f]/50">Button Variants</span>
                  </div>
                  <div className="p-4 space-y-2.5">
                    <button
                      type="button"
                      className="px-3 py-1.5 bg-[#2eaadc] text-white rounded text-sm font-medium hover:bg-[#2899c6] transition-colors duration-150 block w-full text-left"
                    >
                      Primary action
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1.5 bg-transparent text-[#37352f] border border-gray-200 rounded text-sm hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 block w-full text-left"
                    >
                      Secondary action
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1.5 text-[#eb5757] rounded text-sm hover:bg-[#eb5757]/10 active:bg-[#eb5757]/15 transition-colors duration-150 block w-full text-left"
                      style={{ backgroundColor: "#eb575710" }}
                    >
                      Destructive action
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1.5 text-[#37352f]/50 rounded text-sm hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 block w-full text-left"
                    >
                      Ghost action
                    </button>
                  </div>
                </div>
              </RevealBlock>

              {/* Input / inline edit demo */}
              <RevealBlock delay={0.15}>
                <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
                  <div className="px-4 py-3 border-b border-gray-200 bg-[#f7f6f3]">
                    <span className="text-xs font-medium text-[#37352f]/50">Inline Edit Fields</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="group">
                      <label className="block text-xs text-[#37352f]/40 mb-1">Page title</label>
                      <div className="px-2 py-1.5 rounded-md hover:bg-[#efedea] transition-colors duration-150 cursor-text border border-transparent hover:border-gray-200">
                        <span className="text-sm text-[#37352f] font-medium">My first Notion page</span>
                      </div>
                    </div>
                    <div className="group">
                      <label className="block text-xs text-[#37352f]/40 mb-1">Description</label>
                      <div className="px-2 py-1.5 rounded-md hover:bg-[#efedea] transition-colors duration-150 cursor-text border border-transparent hover:border-gray-200">
                        <span className="text-sm text-[#37352f]/60">
                          Click to add a description...
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-[#37352f]/40 mb-1">Tags</label>
                      <div className="flex flex-wrap gap-1.5">
                        {["Design", "Dev", "2026"].map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs rounded-sm font-medium bg-[#2eaadc]/10 text-[#2eaadc] hover:bg-[#2eaadc]/15 transition-colors duration-150 cursor-pointer"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </RevealBlock>

              {/* Context menu simulation */}
              <RevealBlock delay={0.2}>
                <div className="border border-gray-200 rounded-md overflow-hidden bg-white">
                  <div className="px-4 py-3 border-b border-gray-200 bg-[#f7f6f3]">
                    <span className="text-xs font-medium text-[#37352f]/50">Context Menu Pattern</span>
                  </div>
                  <div className="p-4">
                    <div className="border border-gray-200 rounded-md bg-white shadow-sm overflow-hidden inline-block min-w-[180px]">
                      {[
                        { icon: "✦", label: "Turn into" },
                        { icon: "⧉", label: "Duplicate" },
                        { icon: "→", label: "Move to" },
                        { icon: "🔗", label: "Copy link" },
                        null,
                        { icon: "🗑", label: "Delete", danger: true },
                      ].map((item, idx) =>
                        item === null ? (
                          <div key={idx} className="border-t border-gray-200 my-0.5" />
                        ) : (
                          <div
                            key={item.label}
                            className={`group flex items-center gap-2.5 px-3 py-2 hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 cursor-pointer`}
                          >
                            <span className="text-sm w-4 text-center text-[#37352f]/40 flex-shrink-0">
                              {item.icon}
                            </span>
                            <span
                              className={`text-sm ${
                                item.danger ? "text-[#eb5757]" : "text-[#37352f]"
                              }`}
                            >
                              {item.label}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </RevealBlock>
            </div>
          </section>

          <div className="max-w-3xl mx-auto px-6 md:px-16">
            <hr className="border-t border-[#37352f]/[0.09] mb-16" />
          </div>

          {/* ========================================================= */}
          {/* Section 8 — Design Rules (accordion)                       */}
          {/* ========================================================= */}
          <section className="max-w-3xl mx-auto px-6 md:px-16 mb-16">
            <RevealBlock className="mb-6">
              <h2 className="text-xl font-semibold text-[#37352f] mb-1">Design Rules</h2>
              <p className="text-sm text-[#37352f]/50">
                Guiding constraints that make Notion-style instantly recognizable.
              </p>
            </RevealBlock>

            {/* Accordion sections */}
            {[
              {
                id: "typography",
                icon: "✦",
                title: "Typography & Hierarchy",
                content: (
                  <p className="text-sm text-[#37352f]/70 leading-relaxed">
                    Use system fonts exclusively. Size and weight are the only tools for
                    establishing hierarchy — no font-family changes, no gradient text, no
                    decorative lettering. Body text sits at{" "}
                    <code className="font-mono text-xs bg-[#37352f]/5 px-1 rounded">
                      text-[#37352f]/80
                    </code>{" "}
                    while secondary text uses{" "}
                    <code className="font-mono text-xs bg-[#37352f]/5 px-1 rounded">
                      text-[#37352f]/50
                    </code>
                    .
                  </p>
                ),
              },
              {
                id: "spacing",
                icon: "⊞",
                title: "Spacing & Layout",
                content: (
                  <p className="text-sm text-[#37352f]/70 leading-relaxed">
                    Generous whitespace creates breathing room without large borders or
                    heavy visual separators. Use{" "}
                    <code className="font-mono text-xs bg-[#37352f]/5 px-1 rounded">
                      border-gray-200
                    </code>{" "}
                    for dividers. Max content width is{" "}
                    <code className="font-mono text-xs bg-[#37352f]/5 px-1 rounded">
                      max-w-3xl
                    </code>{" "}
                    to maintain comfortable reading line lengths.
                  </p>
                ),
              },
              {
                id: "motion",
                icon: "◎",
                title: "Motion & Transitions",
                content: (
                  <p className="text-sm text-[#37352f]/70 leading-relaxed">
                    All transitions use{" "}
                    <code className="font-mono text-xs bg-[#37352f]/5 px-1 rounded">
                      duration-150
                    </code>
                    . Never use translate, scale, or rotate on interactive elements. The
                    only permitted motion is{" "}
                    <code className="font-mono text-xs bg-[#37352f]/5 px-1 rounded">
                      transition-colors
                    </code>{" "}
                    and{" "}
                    <code className="font-mono text-xs bg-[#37352f]/5 px-1 rounded">
                      transition-opacity
                    </code>
                    . Page-level entry animations may use subtle translateY with opacity.
                  </p>
                ),
              },
              {
                id: "borders",
                icon: "▭",
                title: "Borders & Shadows",
                content: (
                  <p className="text-sm text-[#37352f]/70 leading-relaxed">
                    Use{" "}
                    <code className="font-mono text-xs bg-[#37352f]/5 px-1 rounded">
                      border-gray-200
                    </code>{" "}
                    for all structural borders. Context menus may use{" "}
                    <code className="font-mono text-xs bg-[#37352f]/5 px-1 rounded">
                      shadow-sm
                    </code>
                    . Absolutely no{" "}
                    <code className="font-mono text-xs bg-[#37352f]/5 px-1 rounded">
                      shadow-xl
                    </code>{" "}
                    or larger. Corners use{" "}
                    <code className="font-mono text-xs bg-[#37352f]/5 px-1 rounded">
                      rounded-md
                    </code>{" "}
                    at the most — no{" "}
                    <code className="font-mono text-xs bg-[#37352f]/5 px-1 rounded">
                      rounded-2xl
                    </code>
                    .
                  </p>
                ),
              },
            ].map(({ id, icon, title, content }) => (
              <RevealBlock key={id} className="mb-1">
                <div className="border border-gray-200 rounded-md overflow-hidden mb-2">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedSection(expandedSection === id ? null : id)
                    }
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 text-left"
                  >
                    <span className="text-sm text-[#37352f]/40 flex-shrink-0">{icon}</span>
                    <span className="text-sm font-medium text-[#37352f] flex-1">{title}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      className={`text-[#37352f]/30 flex-shrink-0 transition-transform duration-150 ${
                        expandedSection === id ? "rotate-90" : ""
                      }`}
                    >
                      <path
                        d="M5 3l5 4-5 4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {expandedSection === id && (
                    <div className="px-4 pb-4 pt-1 border-t border-gray-200 bg-[#f7f6f3]/50">
                      {content}
                    </div>
                  )}
                </div>
              </RevealBlock>
            ))}

            {/* Do / Don't callouts */}
            <RevealBlock delay={0.1} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Do */}
                <div className="flex gap-3 p-4 rounded-md" style={{ backgroundColor: "#0f7b6c0d", border: "1px solid #0f7b6c30" }}>
                  <span className="text-base flex-shrink-0">{"✅"}</span>
                  <div>
                    <p className="text-sm font-semibold text-[#0f7b6c] mb-2">Do</p>
                    <ul className="space-y-1.5">
                      {doRules.map((rule, i) => (
                        <li
                          key={i}
                          className="group flex items-start gap-2 text-xs text-[#37352f]/70 rounded py-0.5 hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 cursor-default px-1"
                        >
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 select-none text-[#37352f]/30 text-xs flex-shrink-0">
                            &#x22EE;&#x22EE;
                          </div>
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-[#0f7b6c] flex-shrink-0" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Don't */}
                <div className="flex gap-3 p-4 rounded-md" style={{ backgroundColor: "#eb57570d", border: "1px solid #eb575730" }}>
                  <span className="text-base flex-shrink-0">{"🚫"}</span>
                  <div>
                    <p className="text-sm font-semibold text-[#eb5757] mb-2">{"Don't"}</p>
                    <ul className="space-y-1.5">
                      {dontRules.map((rule, i) => (
                        <li
                          key={i}
                          className="group flex items-start gap-2 text-xs text-[#37352f]/70 rounded py-0.5 hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 cursor-default px-1"
                        >
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 select-none text-[#37352f]/30 text-xs flex-shrink-0">
                            &#x22EE;&#x22EE;
                          </div>
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-[#eb5757] flex-shrink-0" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </section>

          {/* ========================================================= */}
          {/* Footer                                                      */}
          {/* ========================================================= */}
          <footer className="max-w-3xl mx-auto px-6 md:px-16 border-t border-gray-200 py-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-xs text-[#37352f]/40 mb-1 font-medium">
                  StyleKit &middot; Notion Style
                </p>
                <p className="text-xs text-[#37352f]/25">
                  Quiet productivity. Blocks over components.
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Link
                  href="/styles/notion-style"
                  className="text-xs text-[#37352f]/50 hover:text-[#37352f] hover:bg-[#efedea] active:bg-[#e3e1db] px-2 py-1 rounded transition-colors duration-150"
                >
                  Documentation &rarr;
                </Link>
                <Link
                  href="/styles"
                  className="text-xs text-[#37352f]/50 hover:text-[#37352f] hover:bg-[#efedea] active:bg-[#e3e1db] px-2 py-1 rounded transition-colors duration-150"
                >
                  All Styles &rarr;
                </Link>
              </div>
            </div>
          </footer>

        </main>
      </div>
    </div>
  );
}
