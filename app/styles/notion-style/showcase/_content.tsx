"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const sidebarPages = [
  { icon: "home", label: "Home", active: false },
  { icon: "page", label: "Quick Note", active: true },
  { icon: "page", label: "Personal Home", active: false },
  { icon: "database", label: "Task Board", active: false },
  { icon: "database", label: "Project Tracker", active: false },
  { icon: "page", label: "Design System", active: false },
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
  { name: "Typography", status: "Done", priority: "High", owner: "Design" },
  { name: "Color System", status: "Done", priority: "High", owner: "Design" },
  { name: "Components", status: "In Progress", priority: "Medium", owner: "Dev" },
  { name: "Animations", status: "In Progress", priority: "Low", owner: "Dev" },
  { name: "Documentation", status: "Not Started", priority: "Low", owner: "Writer" },
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

const doRules = [
  "Use Notion signature surface color #f7f6f3",
  "Subtle borders with border-gray-200 or opacity variants",
  "Hover uses #efedea, active press uses #e3e1db",
  "Maintain clear text hierarchy with size and opacity",
  "System font stack: -apple-system, BlinkMacSystemFont, Segoe UI",
  "Drag handle ⋮⋮ appears on block hover, opacity 0 to 100",
  "All transitions duration-150 for instant responsiveness",
  "Keep corners small: rounded or rounded-md only",
];

const dontRules = [
  "Never use large corners rounded-2xl or larger",
  "Never use gradient backgrounds on content areas",
  "Never use heavy shadows (shadow-xl or shadow-2xl)",
  "Never use overly vivid or saturated colors",
  "Never apply translate or scale transforms on interaction",
  "Never add border changes or shadow jumps on hover",
  "Never animate layout-affecting properties",
];

/* ------------------------------------------------------------------ */
/*  Inline hooks & components                                          */
/* ------------------------------------------------------------------ */

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
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Drag Handle                                                        */
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
/*  Block Components                                                   */
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
          <path d="M5 3l5 4-5 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

function TaskCheckbox({ item }: { item: typeof taskItems[number] }) {
  const [checked, setChecked] = useState(item.done);
  return (
    <div className="group flex items-center gap-3 py-2 px-3 -mx-3 rounded-md hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 cursor-pointer relative">
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0 select-none text-[#37352f]/30 text-sm leading-none">
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
            <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <span className={`text-sm flex-1 ${checked ? "line-through text-[#37352f]/40" : "text-[#37352f]"}`}>
        {item.text}
      </span>
      <span
        className="text-xs px-2 py-0.5 rounded-sm font-medium"
        style={{ backgroundColor: `${item.tagColor}18`, color: item.tagColor }}
      >
        {item.tag}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar Icon                                                        */
/* ------------------------------------------------------------------ */

function SidebarIcon({ type }: { type: string }) {
  if (type === "database") {
    return (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-[#37352f]/40 flex-shrink-0">
        <rect x="1" y="1" width="11" height="3" rx="0.5" stroke="currentColor" strokeWidth="1" />
        <rect x="1" y="5.5" width="11" height="3" rx="0.5" stroke="currentColor" strokeWidth="1" />
        <rect x="1" y="10" width="11" height="2" rx="0.5" stroke="currentColor" strokeWidth="1" />
      </svg>
    );
  }
  if (type === "home") {
    return (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-[#37352f]/40 flex-shrink-0">
        <path d="M1.5 6.5L6.5 2L11.5 6.5V11.5H8.5V8.5H4.5V11.5H1.5V6.5Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-[#37352f]/40 flex-shrink-0">
      <rect x="2" y="1.5" width="9" height="10" rx="1" stroke="currentColor" strokeWidth="1" />
      <path d="M4.5 4.5h4M4.5 6.5h4M4.5 8.5h2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"checklist" | "table" | "board">("checklist");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const tabs = ["checklist", "table", "board"] as const;

  return (
    <div className="min-h-screen bg-[#f7f6f3] text-[#37352f] font-sans" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, sans-serif' }}>

      {/* ===== Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#f7f6f3]/95 backdrop-blur-sm border-b border-[#e8e6e3]">
        <div className="flex items-center justify-between h-11 px-4 max-w-full">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 hover:bg-[#efedea] active:bg-[#e3e1db] rounded transition-colors duration-150 md:hidden"
              aria-label="Toggle sidebar"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />
              </svg>
            </button>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1 text-sm text-[#37352f]/50">
              <Link href="/styles/notion-style/showcase" className="hover:text-[#37352f] transition-colors duration-150 flex items-center gap-1.5">
                <div className="w-4 h-4 bg-white border border-gray-200 rounded-sm flex items-center justify-center">
                  <span className="text-[#37352f] font-bold text-[9px]">N</span>
                </div>
                Notion Style
              </Link>
              <svg width="12" height="12" viewBox="0 0 12 12" className="opacity-40">
                <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span className="text-[#37352f]">Showcase</span>
            </nav>
          </div>

          <div className="flex items-center gap-1">
            <button type="button" className="px-2.5 py-1 text-xs text-[#37352f]/60 hover:bg-[#efedea] active:bg-[#e3e1db] rounded transition-colors duration-150 flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2">
                <circle cx="5" cy="5" r="3.5" />
                <path d="M9.5 9.5l-2-2" strokeLinecap="round" />
              </svg>
              Search
            </button>
            <button type="button" className="px-2.5 py-1 text-xs text-[#37352f]/60 hover:bg-[#efedea] active:bg-[#e3e1db] rounded transition-colors duration-150">
              Share
            </button>
            <Link href="/styles/notion-style" className="px-2.5 py-1 text-xs text-[#37352f]/60 hover:bg-[#efedea] active:bg-[#e3e1db] rounded transition-colors duration-150">
              Docs
            </Link>
            <Link href="/styles" className="px-2.5 py-1 text-xs text-[#37352f]/60 hover:bg-[#efedea] active:bg-[#e3e1db] rounded transition-colors duration-150">
              All Styles
            </Link>
          </div>
        </div>
      </header>

      {/* ===== Mobile sidebar overlay ===== */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/20" />
          <aside
            className="absolute left-0 top-0 bottom-0 w-60 bg-[#f7f6f3] border-r border-[#e8e6e3] p-3 pt-14 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3">
              <button
                type="button"
                className="w-full px-2 py-1.5 text-left text-sm text-[#37352f]/50 hover:bg-[#efedea] active:bg-[#e3e1db] rounded-md transition-colors duration-150 flex items-center gap-2"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-[#37352f]/40">
                  <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1" />
                  <path d="M10.5 10.5l-2-2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
                Search
              </button>
            </div>
            <div className="space-y-0.5">
              {sidebarPages.map((pg) => (
                <div
                  key={pg.label}
                  className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors duration-150 cursor-pointer ${
                    pg.active ? "bg-[#efedea] text-[#37352f]" : "text-[#37352f]/70 hover:bg-[#efedea]"
                  }`}
                >
                  <SidebarIcon type={pg.icon} />
                  <span className={pg.active ? "font-medium" : ""}>{pg.label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}

      {/* ===== Layout: Sidebar + Main ===== */}
      <div className="flex pt-11 min-h-screen">

        {/* Desktop sidebar */}
        <aside className="hidden md:flex flex-col w-64 flex-shrink-0 bg-[#f7f6f3] border-r border-[#e8e6e3] sticky top-11 self-start h-[calc(100vh-2.75rem)] overflow-y-auto">
          <div className="p-3">
            {/* Search */}
            <button
              type="button"
              className="w-full px-2 py-1.5 mb-1 text-left text-sm text-[#37352f]/50 hover:bg-[#efedea] active:bg-[#e3e1db] rounded-md transition-colors duration-150 flex items-center gap-2"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-[#37352f]/40">
                <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1" />
                <path d="M10.5 10.5l-2-2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
              Search
            </button>

            {/* Workspace */}
            <div className="mt-3 mb-2 px-2">
              <span className="text-xs font-medium text-[#37352f]/40 uppercase tracking-wider">Workspace</span>
            </div>

            {/* Pages */}
            <div className="space-y-0.5">
              {sidebarPages.map((pg) => (
                <div
                  key={pg.label}
                  className={`group flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors duration-150 cursor-pointer ${
                    pg.active
                      ? "bg-[#efedea] text-[#37352f]"
                      : "text-[#37352f]/70 hover:bg-[#efedea] hover:text-[#37352f]"
                  }`}
                >
                  <SidebarIcon type={pg.icon} />
                  <span className={`flex-1 ${pg.active ? "font-medium text-[#37352f]" : ""}`}>{pg.label}</span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#37352f]/40">
                      <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* New page */}
            <div className="mt-3 pt-3 border-t border-[#e8e6e3]">
              <button
                type="button"
                className="w-full px-2 py-1.5 text-left text-sm text-[#37352f]/40 hover:bg-[#efedea] active:bg-[#e3e1db] rounded-md transition-colors duration-150 flex items-center gap-2"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#37352f]/40">
                  <path d="M6.5 2.5v8M2.5 6.5h8" strokeLinecap="round" />
                </svg>
                New page
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">

          {/* ===== Section 1: Hero — Document-style cover + heading ===== */}
          <section className="mb-0">
            {/* Cover image */}
            <div
              className="w-full h-36 md:h-52 bg-gradient-to-r from-[#2eaadc]/20 via-[#0f7b6c]/15 to-[#37352f]/10 overflow-hidden"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div className="w-full h-full flex items-end px-8 pb-4">
                <span className="text-[#37352f]/10 text-[80px] md:text-[120px] font-bold leading-none select-none">N</span>
              </div>
            </div>

            {/* Page icon + title */}
            <div className="max-w-3xl mx-auto px-6 md:px-16">
              {/* Icon */}
              <div
                className="-mt-7 mb-4 w-14 h-14 flex items-center justify-center text-4xl select-none"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(10px)",
                  transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s",
                }}
              >
                {"📄"}
              </div>

              {/* Title */}
              <h1
                className="text-4xl md:text-5xl font-bold text-[#37352f] mb-3 leading-tight"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.15s",
                }}
              >
                Notion Style
              </h1>

              {/* Description */}
              <p
                className="text-base text-[#37352f]/50 mb-6 max-w-xl"
                style={{
                  opacity: heroRevealed ? 1 : 0,
                  transform: heroRevealed ? "translateY(0)" : "translateY(12px)",
                  transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.25s",
                }}
              >
                A design system inspired by quiet productivity. Every block is a building unit. Every interaction is a gentle acknowledgment.
              </p>

              {/* Hero metadata row */}
              <div
                className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#37352f]/40 border-b border-[#e8e6e3] pb-6 mb-10"
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
                  <span className="text-[#0f7b6c]">Published</span>
                </span>
                <span>
                  <span className="text-[#37352f]/30">Category </span>
                  Design System
                </span>
              </div>
            </div>
          </section>

          {/* ===== Section 2: Block Types Demo ===== */}
          <section className="max-w-3xl mx-auto px-6 md:px-16 mb-16">
            <RevealBlock>
              <div className="space-y-1">
                {/* H1 Block */}
                <div className="group relative pl-5">
                  <DragHandle top="top-2" />
                  <h2 className="text-3xl font-bold text-[#37352f] py-1 hover:bg-[#efedea] active:bg-[#e3e1db] rounded-md px-2 -ml-2 transition-colors duration-150 cursor-text">
                    Welcome to Notion Style
                  </h2>
                </div>

                {/* H2 Block */}
                <div className="group relative pl-5 mt-6">
                  <DragHandle top="top-1" />
                  <h3 className="text-xl font-semibold text-[#37352f] py-1 hover:bg-[#efedea] active:bg-[#e3e1db] rounded-md px-2 -ml-2 transition-colors duration-150 cursor-text">
                    Core principles
                  </h3>
                </div>

                {/* Paragraph Block */}
                <div className="group relative pl-5">
                  <DragHandle top="top-1" />
                  <p className="text-[#37352f]/80 leading-relaxed text-sm py-0.5 hover:bg-[#efedea] active:bg-[#e3e1db] rounded-md px-2 -ml-2 transition-colors duration-150 cursor-text">
                    A clean and minimal design system for documentation and productivity. Content-first, distraction-free, functionally elegant. The design serves the content — never competes with it.
                  </p>
                </div>

                {/* Callout Block */}
                <div className="group relative pl-5 pt-1">
                  <DragHandle top="top-3" />
                  <div className="flex gap-3 p-3.5 bg-[#2eaadc]/5 rounded-md border border-[#2eaadc]/20 hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 cursor-text">
                    <span className="flex-shrink-0 text-base">{"💡"}</span>
                    <p className="text-[#37352f]/80 text-sm leading-relaxed">
                      Hover any block to reveal the drag handle <strong>&#x22EE;&#x22EE;</strong> on the left. This is the Drag Handle Illusion — present only when needed.
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="group relative pl-5 py-2">
                  <DragHandle top="top-2" />
                  <hr className="border-t border-[#37352f]/[0.09]" />
                </div>

                {/* Toggle Blocks */}
                <ToggleBlock title="Content First">
                  Design serves content, never competes with it. Every visual element has a functional purpose.
                </ToggleBlock>

                <ToggleBlock title="Subtle Interactions">
                  Hover and click feedback is gentle and natural. Block highlighting uses only a 5% brightness shift — never translate, never scale.
                </ToggleBlock>

                <ToggleBlock title="Clear Hierarchy">
                  {"Font size and opacity distinguish information layers. No gradients, no heavy shadows, no decoration for decoration's sake."}
                </ToggleBlock>

                {/* Quote Block */}
                <div className="group relative pl-5 pt-1">
                  <DragHandle top="top-3" />
                  <blockquote className="border-l-[3px] border-[#37352f] pl-4 py-1 hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 rounded-r-md cursor-text">
                    <p className="text-[#37352f]/70 text-sm leading-relaxed italic">
                      {"The best interface is the one you don't notice. Notion's design achieves invisibility through restraint."}
                    </p>
                  </blockquote>
                </div>

                {/* Code Block */}
                <div className="group relative pl-5 pt-1">
                  <DragHandle top="top-3" />
                  <div className="bg-[#37352f] rounded-md overflow-hidden hover:ring-1 hover:ring-[#37352f]/30 transition-all duration-150">
                    <div className="flex items-center justify-between px-4 py-2 bg-white/5">
                      <span className="text-xs text-white/40 font-mono">typescript</span>
                    </div>
                    <pre className="px-4 pb-4 text-xs text-green-300 font-mono leading-relaxed overflow-x-auto">
                      <code>{`// Drag handle: opacity 0 → 1 on block hover
<div className="group relative">
  <div className="opacity-0 group-hover:opacity-100
    transition-opacity duration-150 absolute -left-5">
    ⋮⋮
  </div>
  <p className="hover:bg-[#efedea]
    active:bg-[#e3e1db]
    transition-colors duration-150">
    Block content here
  </p>
</div>`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </section>

          <div className="max-w-3xl mx-auto px-6 md:px-16">
            <hr className="border-t border-[#37352f]/[0.09] mb-16" />
          </div>

          {/* ===== Section 3: Interactive Database View ===== */}
          <section className="max-w-3xl mx-auto px-6 md:px-16 mb-16">
            <RevealBlock className="mb-6">
              <div className="flex items-center gap-3 mb-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#37352f]/40">
                  <rect x="1.5" y="1.5" width="13" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="1" />
                  <rect x="1.5" y="6.5" width="13" height="3.5" rx="0.5" stroke="currentColor" strokeWidth="1" />
                  <rect x="1.5" y="11.5" width="13" height="3" rx="0.5" stroke="currentColor" strokeWidth="1" />
                </svg>
                <h2 className="text-xl font-semibold text-[#37352f]">Component Library</h2>
              </div>
              <p className="text-sm text-[#37352f]/50 ml-7">
                Interactive components following Notion design conventions.
              </p>
            </RevealBlock>

            {/* Tab bar */}
            <div className="flex gap-0.5 mb-6 border-b border-[#e8e6e3]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-3 py-1.5 text-sm capitalize transition-colors duration-150 rounded-t-md ${
                    activeTab === tab
                      ? "text-[#37352f] font-medium"
                      : "text-[#37352f]/50 hover:bg-[#efedea] hover:text-[#37352f]"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#37352f]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab: Checklist */}
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
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#37352f]/40">
                      <path d="M6.5 2.5v8M2.5 6.5h8" strokeLinecap="round" />
                    </svg>
                    Add item
                  </button>
                </div>
              </RevealBlock>
            )}

            {/* Tab: Table */}
            {activeTab === "table" && (
              <RevealBlock>
                <div className="border border-[#e8e6e3] rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#f7f6f3]">
                        <th className="text-left px-4 py-2.5 font-medium text-[#37352f]/50 text-xs border-b border-r border-[#e8e6e3]">Name</th>
                        <th className="text-left px-4 py-2.5 font-medium text-[#37352f]/50 text-xs border-b border-r border-[#e8e6e3]">Status</th>
                        <th className="text-left px-4 py-2.5 font-medium text-[#37352f]/50 text-xs border-b border-r border-[#e8e6e3]">Priority</th>
                        <th className="text-left px-4 py-2.5 font-medium text-[#37352f]/50 text-xs border-b border-[#e8e6e3]">Owner</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {tableData.map((row, i) => (
                        <tr
                          key={i}
                          className="group hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 cursor-pointer"
                        >
                          <td className="px-4 py-2.5 border-b border-r border-[#e8e6e3] text-[#37352f] text-sm">
                            <div className="flex items-center gap-2">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 select-none text-[#37352f]/30 text-xs leading-none">&#x22EE;&#x22EE;</div>
                              {row.name}
                            </div>
                          </td>
                          <td className="px-4 py-2.5 border-b border-r border-[#e8e6e3]">
                            <span className={`text-xs px-2 py-0.5 rounded-sm font-medium ${
                              row.status === "Done"
                                ? "bg-[#0f7b6c]/10 text-[#0f7b6c]"
                                : row.status === "In Progress"
                                  ? "bg-[#2eaadc]/10 text-[#2eaadc]"
                                  : "bg-gray-100 text-gray-400"
                            }`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="px-4 py-2.5 border-b border-r border-[#e8e6e3] text-[#37352f]/60 text-sm">{row.priority}</td>
                          <td className="px-4 py-2.5 border-b border-[#e8e6e3] text-[#37352f]/60 text-sm">{row.owner}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="bg-white border-t border-[#e8e6e3] px-4 py-2">
                    <button type="button" className="text-xs text-[#37352f]/40 hover:text-[#37352f] transition-colors duration-150 flex items-center gap-1.5">
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
                        <path d="M5.5 1.5v8M1.5 5.5h8" />
                      </svg>
                      New
                    </button>
                  </div>
                </div>
              </RevealBlock>
            )}

            {/* Tab: Board */}
            {activeTab === "board" && (
              <RevealBlock>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* To Do column */}
                  <div>
                    <div className="flex items-center gap-2 mb-2 px-1">
                      <span className="text-xs font-semibold text-[#37352f]/50 uppercase tracking-wider">To Do</span>
                      <span className="text-xs text-[#37352f]/30">3</span>
                    </div>
                    <div className="space-y-2">
                      {["Implement responsive layout", "Write documentation", "User testing round"].map((t) => (
                        <div
                          key={t}
                          className="group p-3 bg-white border border-[#e8e6e3] rounded-md hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 cursor-pointer"
                        >
                          <div className="flex items-start gap-2">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 select-none text-[#37352f]/30 text-xs mt-0.5">&#x22EE;&#x22EE;</div>
                            <p className="text-sm text-[#37352f]">{t}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* In Progress column */}
                  <div>
                    <div className="flex items-center gap-2 mb-2 px-1">
                      <span className="text-xs font-semibold text-[#2eaadc] uppercase tracking-wider">In Progress</span>
                      <span className="text-xs text-[#37352f]/30">2</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { text: "Design component library", tag: "Design", color: "#0f7b6c" },
                        { text: "Set up project structure", tag: "Setup", color: "#2eaadc" },
                      ].map((card) => (
                        <div
                          key={card.text}
                          className="group p-3 bg-white border border-[#e8e6e3] rounded-md hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 cursor-pointer"
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 select-none text-[#37352f]/30 text-xs mt-0.5">&#x22EE;&#x22EE;</div>
                            <p className="text-sm text-[#37352f]">{card.text}</p>
                          </div>
                          <span
                            className="text-xs px-2 py-0.5 rounded-sm font-medium ml-4"
                            style={{ backgroundColor: `${card.color}15`, color: card.color }}
                          >
                            {card.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Done column */}
                  <div>
                    <div className="flex items-center gap-2 mb-2 px-1">
                      <span className="text-xs font-semibold text-[#0f7b6c] uppercase tracking-wider">Done</span>
                      <span className="text-xs text-[#37352f]/30">1</span>
                    </div>
                    <div className="space-y-2">
                      <div className="group p-3 bg-white border border-[#e8e6e3] rounded-md hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 cursor-pointer opacity-70">
                        <div className="flex items-start gap-2 mb-2">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 select-none text-[#37352f]/30 text-xs mt-0.5">&#x22EE;&#x22EE;</div>
                          <p className="text-sm text-[#37352f] line-through">Color system research</p>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded-sm font-medium ml-4 bg-[#0f7b6c]/10 text-[#0f7b6c]">Research</span>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            )}
          </section>

          <div className="max-w-3xl mx-auto px-6 md:px-16">
            <hr className="border-t border-[#37352f]/[0.09] mb-16" />
          </div>

          {/* ===== Section 4: Color Palette ===== */}
          <section className="max-w-3xl mx-auto px-6 md:px-16 mb-16">
            <RevealBlock className="mb-6">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-4 h-4 rounded-sm bg-gradient-to-br from-[#2eaadc] via-[#0f7b6c] to-[#eb5757]" />
                <h2 className="text-xl font-semibold text-[#37352f]">Color Palette</h2>
              </div>
              <p className="text-sm text-[#37352f]/50 ml-7">
                Restrained and functional. Colors serve meaning, not decoration.
              </p>
            </RevealBlock>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {paletteColors.map((c, i) => (
                <RevealBlock key={c.name} delay={i * 0.04}>
                  <div className="group cursor-pointer">
                    <div
                      className={`aspect-[4/3] rounded-md flex items-end p-3 border border-[#e8e6e3] hover:ring-1 hover:ring-[#37352f]/20 transition-all duration-150 ${c.textClass}`}
                      style={{ backgroundColor: c.value }}
                    >
                      <div>
                        <p className="text-xs font-semibold leading-tight">{c.name}</p>
                        <p className="text-xs opacity-60 font-mono leading-tight">{c.value}</p>
                      </div>
                    </div>
                  </div>
                </RevealBlock>
              ))}
            </div>

            {/* Highlight colors row */}
            <RevealBlock delay={0.3} className="mt-6">
              <p className="text-xs text-[#37352f]/40 mb-3">Text highlight colors</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Default", bg: "#37352f14", text: "#37352f" },
                  { label: "Blue", bg: "#2eaadc20", text: "#2eaadc" },
                  { label: "Red", bg: "#eb575720", text: "#eb5757" },
                  { label: "Teal", bg: "#0f7b6c20", text: "#0f7b6c" },
                  { label: "Yellow", bg: "#dfab0120", text: "#dfab01" },
                  { label: "Orange", bg: "#e07b3920", text: "#e07b39" },
                  { label: "Pink", bg: "#e255a120", text: "#e255a1" },
                  { label: "Purple", bg: "#9065b020", text: "#9065b0" },
                ].map((chip) => (
                  <div
                    key={chip.label}
                    className="group relative px-3 py-1 rounded-md text-xs font-medium hover:brightness-95 active:brightness-90 transition-all duration-150 cursor-pointer"
                    style={{ backgroundColor: chip.bg, color: chip.text }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute -left-3 top-1/2 -translate-y-1/2 select-none text-[#37352f]/30 text-xs">&#x22EE;&#x22EE;</div>
                    {chip.label}
                  </div>
                ))}
              </div>
            </RevealBlock>
          </section>

          <div className="max-w-3xl mx-auto px-6 md:px-16">
            <hr className="border-t border-[#37352f]/[0.09] mb-16" />
          </div>

          {/* ===== Section 5: Interaction Showcase ===== */}
          <section className="max-w-3xl mx-auto px-6 md:px-16 mb-16">
            <RevealBlock className="mb-6">
              <h2 className="text-xl font-semibold text-[#37352f] mb-1">Interaction Physics</h2>
              <p className="text-sm text-[#37352f]/50">
                Ultimate restraint. Zero translate. Zero scale. Only color.
              </p>
            </RevealBlock>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Block highlight demo */}
              <RevealBlock>
                <div className="border border-[#e8e6e3] rounded-md overflow-hidden bg-white">
                  <div className="px-4 py-3 border-b border-[#e8e6e3] bg-[#f7f6f3]">
                    <span className="text-xs font-medium text-[#37352f]/50">Block Highlighting</span>
                  </div>
                  <div className="p-4 space-y-0.5">
                    {["Heading block", "Paragraph block", "List item block", "Callout block"].map((name) => (
                      <div
                        key={name}
                        className="group flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 cursor-pointer"
                      >
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 select-none text-[#37352f]/30 text-xs">&#x22EE;&#x22EE;</div>
                        <span className="text-sm text-[#37352f]">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealBlock>

              {/* Button variants */}
              <RevealBlock delay={0.1}>
                <div className="border border-[#e8e6e3] rounded-md overflow-hidden bg-white">
                  <div className="px-4 py-3 border-b border-[#e8e6e3] bg-[#f7f6f3]">
                    <span className="text-xs font-medium text-[#37352f]/50">Button Variants</span>
                  </div>
                  <div className="p-4 space-y-3">
                    <button type="button" className="px-3 py-1.5 bg-[#2eaadc] text-white rounded text-sm font-medium hover:bg-[#2899c6] transition-colors duration-150 block w-full text-left">
                      Primary action
                    </button>
                    <button type="button" className="px-3 py-1.5 bg-transparent text-[#37352f] border border-[#e8e6e3] rounded text-sm hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 block w-full text-left">
                      Secondary action
                    </button>
                    <button type="button" className="px-3 py-1.5 bg-[#eb5757]/10 text-[#eb5757] rounded text-sm hover:bg-[#eb5757]/15 active:bg-[#eb5757]/20 transition-colors duration-150 block w-full text-left">
                      Destructive action
                    </button>
                    <button type="button" className="px-3 py-1.5 text-[#37352f]/50 rounded text-sm hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 block w-full text-left">
                      Ghost action
                    </button>
                  </div>
                </div>
              </RevealBlock>
            </div>
          </section>

          <div className="max-w-3xl mx-auto px-6 md:px-16">
            <hr className="border-t border-[#37352f]/[0.09] mb-16" />
          </div>

          {/* ===== Section 6: Design Rules ===== */}
          <section className="max-w-3xl mx-auto px-6 md:px-16 mb-16">
            <RevealBlock className="mb-6">
              <h2 className="text-xl font-semibold text-[#37352f] mb-1">Design Rules</h2>
              <p className="text-sm text-[#37352f]/50">Written as Notion callout blocks.</p>
            </RevealBlock>

            {/* Do list as callout */}
            <RevealBlock className="mb-8">
              <div className="flex gap-3 p-4 bg-[#0f7b6c]/5 rounded-md border border-[#0f7b6c]/20 mb-4">
                <span className="text-base flex-shrink-0">{"✅"}</span>
                <div>
                  <p className="text-sm font-semibold text-[#0f7b6c] mb-3">Do</p>
                  <ul className="space-y-2">
                    {doRules.map((rule, i) => (
                      <li key={i} className="group flex items-start gap-2 text-sm text-[#37352f]/70 rounded-md px-1 py-0.5 hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 cursor-default">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 select-none text-[#37352f]/30 text-xs mt-0.5 flex-shrink-0">&#x22EE;&#x22EE;</div>
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#0f7b6c] flex-shrink-0" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>

            {/* Don't list as callout */}
            <RevealBlock delay={0.1}>
              <div className="flex gap-3 p-4 bg-[#eb5757]/5 rounded-md border border-[#eb5757]/20">
                <span className="text-base flex-shrink-0">{"🚫"}</span>
                <div>
                  <p className="text-sm font-semibold text-[#eb5757] mb-3">{"Don't"}</p>
                  <ul className="space-y-2">
                    {dontRules.map((rule, i) => (
                      <li key={i} className="group flex items-start gap-2 text-sm text-[#37352f]/70 rounded-md px-1 py-0.5 hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 cursor-default">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 select-none text-[#37352f]/30 text-xs mt-0.5 flex-shrink-0">&#x22EE;&#x22EE;</div>
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#eb5757] flex-shrink-0" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealBlock>
          </section>

          {/* ===== Footer ===== */}
          <footer className="max-w-3xl mx-auto px-6 md:px-16 border-t border-[#e8e6e3] py-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-xs text-[#37352f]/40 mb-1">
                  StyleKit &middot; Notion Style Showcase
                </p>
                <p className="text-xs text-[#37352f]/30">
                  Quiet productivity. Blocks over components.
                </p>
              </div>
              <div className="flex items-center gap-3">
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
