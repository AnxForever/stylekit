"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const sidebarPages = [
  { label: "Getting Started", active: false },
  { label: "Quick Note", active: true },
  { label: "Personal Home", active: false },
  { label: "Task Board", active: false },
  { label: "Project Tracker", active: false },
];

const blockTypes: Array<{
  type: string;
  content?: string;
  level?: number;
  emoji?: string;
  detail?: string;
}> = [
  { type: "heading", content: "Welcome to Notion Style", level: 1 },
  { type: "paragraph", content: "A clean and minimal design system inspired by Notion. Content-first, distraction-free, functionally elegant." },
  { type: "callout", emoji: "!", content: "This showcase demonstrates the Notion aesthetic: subtle borders, soft hover states, and clear hierarchy." },
  { type: "divider" },
  { type: "heading", content: "Core Principles", level: 2 },
  { type: "toggle", content: "Content First", detail: "Design serves content, never competes with it. Every visual element has a functional purpose." },
  { type: "toggle", content: "Subtle Interactions", detail: "Hover and click feedback is gentle and natural. Block highlighting uses only a 5% brightness shift." },
  { type: "toggle", content: "Clear Hierarchy", detail: "Font size and color distinguish information layers. No gradients, no heavy shadows, no decoration." },
];

const taskItems = [
  { done: true, text: "Set up project structure", tag: "Setup", tagColor: "#2eaadc" },
  { done: true, text: "Design component library", tag: "Design", tagColor: "#0f7b6c" },
  { done: false, text: "Implement responsive layout", tag: "Dev", tagColor: "#eb5757" },
  { done: false, text: "Write documentation", tag: "Docs", tagColor: "#dfab01" },
  { done: false, text: "User testing round", tag: "QA", tagColor: "#9b9a97" },
];

const tableData = [
  { name: "Typography", status: "Done", priority: "High", owner: "Design Team" },
  { name: "Color System", status: "Done", priority: "High", owner: "Design Team" },
  { name: "Components", status: "In Progress", priority: "Medium", owner: "Dev Team" },
  { name: "Documentation", status: "Not Started", priority: "Low", owner: "Tech Writer" },
];

const paletteColors = [
  { name: "Text", value: "#37352f", text: "text-white" },
  { name: "Background", value: "#ffffff", text: "text-[#37352f]" },
  { name: "Surface", value: "#f7f6f3", text: "text-[#37352f]" },
  { name: "Hover", value: "#efedea", text: "text-[#37352f]" },
  { name: "Active", value: "#e3e1db", text: "text-[#37352f]" },
  { name: "Blue", value: "#2eaadc", text: "text-white" },
  { name: "Red", value: "#eb5757", text: "text-white" },
  { name: "Green", value: "#0f7b6c", text: "text-white" },
];

const doRules = [
  "Use Notion signature beige background #f7f6f3",
  "Subtle borders with border-gray-200",
  "Hover uses light gray background: hover:bg-[#efedea]",
  "Maintain clear text hierarchy with size and color",
  "Use system font stack for readability",
  "Cards use group class with drag handle illusion",
  "All transitions duration-150 for instant responsiveness",
];

const dontRules = [
  "Never use large corners rounded-2xl or larger",
  "Never use gradient backgrounds",
  "Never use heavy shadows shadow-xl or shadow-2xl",
  "Never use overly vivid colors",
  "Never apply translate or scale animations",
  "Never add hover border changes or shadow jumps",
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

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function NotionBlock({ block }: { block: typeof blockTypes[number] }) {
  const [toggleOpen, setToggleOpen] = useState(false);

  if (block.type === "heading") {
    const size = block.level === 1 ? "text-4xl font-bold" : "text-2xl font-semibold";
    return (
      <div className="group -ml-6 pl-6 py-1 hover:bg-[#efedea] transition-colors duration-150 rounded-md relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <span className="text-gray-400 text-xs cursor-grab select-none">&#x2af8;</span>
        </div>
        {block.level === 1 ? (
          <h2 className={`${size} text-[#37352f]`}>{block.content}</h2>
        ) : (
          <h3 className={`${size} text-[#37352f]`}>{block.content}</h3>
        )}
      </div>
    );
  }

  if (block.type === "paragraph") {
    return (
      <div className="group -ml-6 pl-6 py-0.5 hover:bg-[#efedea] transition-colors duration-150 rounded-md relative">
        <div className="absolute left-0 top-3 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <span className="text-gray-400 text-xs cursor-grab select-none">&#x2af8;</span>
        </div>
        <p className="text-[#37352f]/80 leading-relaxed">{block.content}</p>
      </div>
    );
  }

  if (block.type === "callout") {
    return (
      <div className="group -ml-6 pl-6 py-0.5 hover:bg-[#efedea] transition-colors duration-150 rounded-md relative">
        <div className="absolute left-0 top-4 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <span className="text-gray-400 text-xs cursor-grab select-none">&#x2af8;</span>
        </div>
        <div className="flex gap-3 p-4 bg-[#f7f6f3] rounded-md border border-gray-200">
          <span className="text-lg flex-shrink-0 w-6 h-6 flex items-center justify-center bg-[#2eaadc]/10 rounded text-[#2eaadc] text-xs font-bold">{block.emoji}</span>
          <p className="text-[#37352f]/80 text-sm leading-relaxed">{block.content}</p>
        </div>
      </div>
    );
  }

  if (block.type === "divider") {
    return <hr className="border-t border-[#37352f]/[0.09] my-2" />;
  }

  if (block.type === "toggle") {
    return (
      <div className="group -ml-6 pl-6 py-0.5 hover:bg-[#efedea] transition-colors duration-150 rounded-md relative">
        <div className="absolute left-0 top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <span className="text-gray-400 text-xs cursor-grab select-none">&#x2af8;</span>
        </div>
        <button
          type="button"
          onClick={() => setToggleOpen(!toggleOpen)}
          className="flex items-center gap-2 w-full text-left py-1"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className={`text-[#37352f]/50 transition-transform duration-150 flex-shrink-0 ${toggleOpen ? "rotate-90" : ""}`}
          >
            <path d="M6 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-[#37352f] font-medium">{block.content}</span>
        </button>
        {toggleOpen && (
          <div className="ml-6 mt-1 text-[#37352f]/70 text-sm leading-relaxed pb-1">
            {block.detail}
          </div>
        )}
      </div>
    );
  }

  return null;
}

function TaskCheckbox({ item }: { item: typeof taskItems[number] }) {
  const [checked, setChecked] = useState(item.done);
  return (
    <div className="group flex items-center gap-3 py-2 px-3 -mx-3 rounded-md hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150 cursor-pointer">
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
        <span className="text-gray-400 text-xs cursor-grab select-none">&#x2af8;</span>
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
        className="text-xs px-2 py-0.5 rounded-sm"
        style={{ backgroundColor: `${item.tagColor}15`, color: item.tagColor }}
      >
        {item.tag}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main                                                               */
/* ------------------------------------------------------------------ */

export default function ShowcaseContent() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState<"blocks" | "checklist" | "table" | "board">("blocks");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const tabs = ["blocks", "checklist", "table", "board"] as const;

  return (
    <div className="min-h-screen bg-white text-[#37352f]">
      {/* ===== Navigation ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-[#37352f]/[0.09]">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-11">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1 hover:bg-[#efedea] active:bg-[#e3e1db] rounded transition-colors duration-150 md:hidden"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 5h12M3 9h12M3 13h12" />
                </svg>
              </button>
              <Link href="/styles/notion-style/showcase" className="text-sm font-medium text-[#37352f] flex items-center gap-2">
                <div className="w-5 h-5 bg-[#f7f6f3] border border-gray-200 rounded flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-sm bg-white border border-gray-300" />
                </div>
                Notion Style
              </Link>
            </div>
            <nav className="flex items-center gap-1">
              <Link href="/styles/notion-style" className="px-2 py-1 text-xs text-[#37352f]/50 hover:bg-[#efedea] active:bg-[#e3e1db] rounded transition-colors duration-150">
                Docs
              </Link>
              <Link href="/styles" className="px-2 py-1 text-xs text-[#37352f]/50 hover:bg-[#efedea] active:bg-[#e3e1db] rounded transition-colors duration-150">
                Styles
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ===== Sidebar overlay (mobile) ===== */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/20" />
          <aside
            className="absolute left-0 top-0 bottom-0 w-60 bg-[#f7f6f3] border-r border-gray-200 p-3 pt-14"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-0.5">
              {sidebarPages.map((pg) => (
                <div
                  key={pg.label}
                  className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors duration-150 cursor-pointer ${
                    pg.active ? "bg-[#efedea]" : "hover:bg-[#efedea]"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" className="text-[#37352f]/40 flex-shrink-0">
                    <rect x="2" y="2" width="10" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="1" />
                  </svg>
                  <span className={`text-[#37352f] ${pg.active ? "font-medium" : ""}`}>{pg.label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}

      {/* ===== Main content with sidebar ===== */}
      <div className="flex pt-11">
        {/* Desktop sidebar */}
        <aside className="hidden md:block w-60 flex-shrink-0 bg-[#f7f6f3] border-r border-gray-200 p-3 pt-6 min-h-screen sticky top-11">
          <div className="mb-4">
            <button
              type="button"
              className="w-full px-2 py-1.5 text-left text-sm text-[#37352f]/50 hover:bg-[#efedea] active:bg-[#e3e1db] rounded-md transition-colors duration-150 flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" className="text-[#37352f]/40">
                <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
                <path d="M10 10l3 3" stroke="currentColor" strokeWidth="1" />
              </svg>
              Search
            </button>
          </div>
          <div className="space-y-0.5">
            {sidebarPages.map((pg) => (
              <div
                key={pg.label}
                className={`group flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors duration-150 cursor-pointer ${
                  pg.active ? "bg-[#efedea]" : "hover:bg-[#efedea]"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" className="text-[#37352f]/40 flex-shrink-0">
                  <rect x="2" y="2" width="10" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
                <span className={`text-[#37352f] ${pg.active ? "font-medium" : ""}`}>{pg.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-[#37352f]/[0.09]">
            <button
              type="button"
              className="w-full px-2 py-1.5 text-left text-sm text-[#37352f]/40 hover:bg-[#efedea] active:bg-[#e3e1db] rounded-md transition-colors duration-150 flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#37352f]/40">
                <path d="M7 3v8M3 7h8" />
              </svg>
              New page
            </button>
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1 max-w-3xl mx-auto px-6 py-12">
          {/* ===== Hero ===== */}
          <section className="mb-16">
            <div
              className="mb-6"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-[#f7f6f3] border border-gray-200 mb-6">
                <div className="h-8 w-8 rounded bg-white border border-gray-300 flex items-center justify-center">
                  <span className="text-[#37352f] font-bold text-sm">N</span>
                </div>
              </div>
            </div>

            <h1
              className="text-4xl md:text-5xl font-bold text-[#37352f] mb-4"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              Notion Style Showcase
            </h1>

            <p
              className="text-lg text-[#37352f]/50 max-w-xl"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transform: heroRevealed ? "translateY(0)" : "translateY(12px)",
                transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            >
              A clean and minimal design system for documentation and productivity applications. Content-first, distraction-free.
            </p>

            <div
              className="flex gap-2 mt-8"
              style={{
                opacity: heroRevealed ? 1 : 0,
                transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s",
              }}
            >
              <button type="button" className="px-3 py-1.5 bg-[#2eaadc] text-white rounded text-sm font-medium hover:bg-[#2899c6] transition-colors duration-150">
                Get Started
              </button>
              <button type="button" className="px-3 py-1.5 bg-transparent text-[#37352f]/60 rounded text-sm font-medium hover:bg-[#efedea] active:bg-[#e3e1db] transition-colors duration-150">
                Learn More
              </button>
            </div>
          </section>

          {/* ===== Block Editor Demo ===== */}
          <section className="mb-20">
            <RevealBlock>
              <div className="space-y-1">
                {blockTypes.map((block, i) => (
                  <NotionBlock key={i} block={block} />
                ))}
              </div>
            </RevealBlock>
          </section>

          <hr className="border-t border-[#37352f]/[0.09] mb-20" />

          {/* ===== Component Demos (Tab-Switched) ===== */}
          <section className="mb-20">
            <RevealBlock className="mb-8">
              <h2 className="text-2xl font-semibold text-[#37352f] mb-2">Component Library</h2>
              <p className="text-sm text-[#37352f]/50">
                Interactive components following Notion design conventions.
              </p>
            </RevealBlock>

            {/* Tabs */}
            <div className="flex gap-1 mb-8 border-b border-[#37352f]/[0.09] pb-px">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-sm capitalize transition-colors duration-150 relative ${
                    activeTab === tab
                      ? "text-[#37352f] font-medium"
                      : "text-[#37352f]/50 hover:bg-[#efedea]"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#37352f]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
              {activeTab === "blocks" && (
                <RevealBlock>
                  <div className="space-y-3">
                    {["Text Block", "Heading Block", "Callout Block", "Toggle Block", "Code Block"].map((name) => (
                      <div key={name} className="group p-3 -mx-3 rounded-md hover:bg-[#efedea] transition-colors duration-150 flex gap-2 cursor-pointer">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pt-0.5 flex-shrink-0">
                          <span className="text-gray-400 text-sm cursor-grab select-none">&#x2af8;</span>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#37352f] mb-1 group-hover:underline decoration-gray-300 underline-offset-4">
                            {name}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            {name === "Text Block" && "The fundamental building block for all content."}
                            {name === "Heading Block" && "Three levels of headings for clear document structure."}
                            {name === "Callout Block" && "Highlight important information with custom icons."}
                            {name === "Toggle Block" && "Collapsible content for progressive disclosure."}
                            {name === "Code Block" && "Syntax-highlighted code with language detection."}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </RevealBlock>
              )}

              {activeTab === "checklist" && (
                <RevealBlock>
                  <div className="space-y-0.5">
                    {taskItems.map((item, i) => (
                      <TaskCheckbox key={i} item={item} />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="mt-4 px-3 py-1.5 text-sm text-[#37352f]/40 hover:bg-[#efedea] active:bg-[#e3e1db] rounded transition-colors duration-150 flex items-center gap-2"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1" className="text-[#37352f]/40">
                      <path d="M7 3v8M3 7h8" />
                    </svg>
                    Add item
                  </button>
                </RevealBlock>
              )}

              {activeTab === "table" && (
                <RevealBlock>
                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[#f7f6f3]">
                          <th className="text-left px-4 py-2 font-medium text-[#37352f]/60 border-b border-r border-gray-200">Name</th>
                          <th className="text-left px-4 py-2 font-medium text-[#37352f]/60 border-b border-r border-gray-200">Status</th>
                          <th className="text-left px-4 py-2 font-medium text-[#37352f]/60 border-b border-r border-gray-200">Priority</th>
                          <th className="text-left px-4 py-2 font-medium text-[#37352f]/60 border-b border-gray-200">Owner</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((row, i) => (
                          <tr key={i} className="hover:bg-[#efedea] transition-colors duration-150">
                            <td className="px-4 py-2.5 border-b border-r border-gray-200 text-[#37352f]">{row.name}</td>
                            <td className="px-4 py-2.5 border-b border-r border-gray-200">
                              <span className={`text-xs px-2 py-0.5 rounded-sm ${
                                row.status === "Done" ? "bg-[#0f7b6c]/10 text-[#0f7b6c]"
                                  : row.status === "In Progress" ? "bg-[#2eaadc]/10 text-[#2eaadc]"
                                    : "bg-gray-100 text-gray-500"
                              }`}>
                                {row.status}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 border-b border-r border-gray-200 text-[#37352f]/70">{row.priority}</td>
                            <td className="px-4 py-2.5 border-b border-gray-200 text-[#37352f]/70">{row.owner}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </RevealBlock>
              )}

              {activeTab === "board" && (
                <RevealBlock>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* To Do */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium text-[#37352f]/50 uppercase tracking-wider">To Do</span>
                        <span className="text-xs text-[#37352f]/30">3</span>
                      </div>
                      <div className="space-y-2">
                        {["Implement responsive layout", "Write documentation", "User testing round"].map((t) => (
                          <div key={t} className="group p-3 bg-white border border-gray-200 rounded-md hover:bg-[#efedea] transition-colors duration-150 cursor-pointer">
                            <p className="text-sm text-[#37352f]">{t}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* In Progress */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium text-[#2eaadc] uppercase tracking-wider">In Progress</span>
                        <span className="text-xs text-[#37352f]/30">1</span>
                      </div>
                      <div className="space-y-2">
                        <div className="group p-3 bg-white border border-gray-200 rounded-md hover:bg-[#efedea] transition-colors duration-150 cursor-pointer">
                          <p className="text-sm text-[#37352f]">Design component library</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs px-2 py-0.5 rounded-sm bg-[#0f7b6c]/10 text-[#0f7b6c]">Design</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Done */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium text-[#0f7b6c] uppercase tracking-wider">Done</span>
                        <span className="text-xs text-[#37352f]/30">1</span>
                      </div>
                      <div className="space-y-2">
                        <div className="group p-3 bg-white border border-gray-200 rounded-md hover:bg-[#efedea] transition-colors duration-150 cursor-pointer">
                          <p className="text-sm text-[#37352f] line-through opacity-60">Set up project structure</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs px-2 py-0.5 rounded-sm bg-[#2eaadc]/10 text-[#2eaadc]">Setup</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </RevealBlock>
              )}
            </div>
          </section>

          <hr className="border-t border-[#37352f]/[0.09] mb-20" />

          {/* ===== Color Palette ===== */}
          <section className="mb-20">
            <RevealBlock className="mb-8">
              <h2 className="text-2xl font-semibold text-[#37352f] mb-2">Color Palette</h2>
              <p className="text-sm text-[#37352f]/50">
                Restrained and functional. Colors serve meaning, not decoration.
              </p>
            </RevealBlock>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {paletteColors.map((c, i) => (
                <RevealBlock key={c.name} delay={i * 0.04}>
                  <div className="group cursor-pointer">
                    <div
                      className={`aspect-[3/2] rounded-md flex items-end p-3 border border-gray-200 ${c.text}`}
                      style={{ backgroundColor: c.value }}
                    >
                      <div>
                        <p className="text-xs font-medium">{c.name}</p>
                        <p className="text-xs opacity-60 font-mono">{c.value}</p>
                      </div>
                    </div>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </section>

          <hr className="border-t border-[#37352f]/[0.09] mb-20" />

          {/* ===== Design Rules ===== */}
          <section className="mb-20">
            <RevealBlock className="mb-8">
              <h2 className="text-2xl font-semibold text-[#37352f] mb-2">Design Rules</h2>
            </RevealBlock>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <RevealBlock>
                <div className="flex items-center gap-3 p-3 bg-[#0f7b6c]/5 rounded-md mb-4">
                  <span className="text-xs font-bold text-[#0f7b6c] uppercase tracking-wider">Do</span>
                </div>
                <ul className="space-y-3">
                  {doRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#37352f]/70">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#0f7b6c] flex-shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </RevealBlock>

              <RevealBlock delay={0.1}>
                <div className="flex items-center gap-3 p-3 bg-[#eb5757]/5 rounded-md mb-4">
                  <span className="text-xs font-bold text-[#eb5757] uppercase tracking-wider">Don&apos;t</span>
                </div>
                <ul className="space-y-3">
                  {dontRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#37352f]/70">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#eb5757] flex-shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </RevealBlock>
            </div>
          </section>

          {/* ===== Footer ===== */}
          <footer className="border-t border-[#37352f]/[0.09] pt-8 pb-16">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-[#37352f]/40">
                StyleKit &middot; Notion Style Showcase
              </p>
              <Link href="/styles/notion-style" className="text-xs text-[#37352f]/50 hover:text-[#37352f] transition-colors duration-150">
                View Full Documentation &rarr;
              </Link>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
