"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks — ZERO @/components/showcase imports                  */
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
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                    */
/* ------------------------------------------------------------------ */

function OctocatIcon({ size = 32, fill = "#ffffff" }: { size?: number; fill?: string }) {
  return (
    <svg height={size} viewBox="0 0 16 16" width={size} fill={fill} aria-hidden="true">
      <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
    </svg>
  );
}

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
    </svg>
  );
}

function ForkIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.252 2.252 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
    </svg>
  );
}

function IssueOpenIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
    </svg>
  );
}

function IssueClosedIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5Z" />
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0Z" />
    </svg>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
    </svg>
  );
}

function XIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z" />
    </svg>
  );
}

function FolderIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M.513 1.513A1.75 1.75 0 0 1 1.75 1h3.5c.55 0 1.07.26 1.4.7l.9 1.2a.25.25 0 0 0 .2.1H13a1 1 0 0 1 1 1v8.75A1.75 1.75 0 0 1 12.25 14H1.75A1.75 1.75 0 0 1 0 12.25V2.75c0-.464.184-.91.513-1.237Z" />
    </svg>
  );
}

function FileIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25V6h-2.75A1.75 1.75 0 0 1 9 4.25V1.5Zm6.75.062V4.25c0 .138.112.25.25.25h2.688Z" />
    </svg>
  );
}

function PRIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 6.823L3 9.099V11.5a2.25 2.25 0 1 1-1.5 0v-8.5a2.25 2.25 0 1 1 1.5 0v1.456l2.45-2.302ZM4 2.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0ZM4 13.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm8.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
    </svg>
  );
}

function TagIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2.5 7.775V2.75a.25.25 0 0 1 .25-.25h5.025a.25.25 0 0 1 .177.073l6.25 6.25a.25.25 0 0 1 0 .354l-5.025 5.025a.25.25 0 0 1-.354 0l-6.25-6.25a.25.25 0 0 1-.073-.177Zm-1.5 0V2.75C1 1.784 1.784 1 2.75 1h5.025c.464 0 .91.184 1.238.513l6.25 6.25a1.75 1.75 0 0 1 0 2.474l-5.026 5.026a1.75 1.75 0 0 1-2.474 0l-6.25-6.25A1.75 1.75 0 0 1 1 7.775ZM6 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
    </svg>
  );
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z" />
    </svg>
  );
}

function CodeIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4.72 3.22a.75.75 0 0 1 1.06 1.06L2.06 8l3.72 3.72a.75.75 0 1 1-1.06 1.06L.47 8.53a.75.75 0 0 1 0-1.06l4.25-4.25Zm6.56 0a.75.75 0 1 0-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 1 0 1.06 1.06l4.25-4.25a.75.75 0 0 0 0-1.06l-4.25-4.25Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Static data                                                         */
/* ------------------------------------------------------------------ */

const fileTree = [
  { name: "src", type: "dir", indent: 0 },
  { name: "components", type: "dir", indent: 1 },
  { name: "Button.tsx", type: "file", indent: 2, time: "2h ago" },
  { name: "Card.tsx", type: "file", indent: 2, time: "4h ago" },
  { name: "Input.tsx", type: "file", indent: 2, time: "yesterday" },
  { name: "styles", type: "dir", indent: 1 },
  { name: "tokens.ts", type: "file", indent: 2, time: "3d ago" },
  { name: "global.css", type: "file", indent: 2, time: "1w ago" },
  { name: "lib", type: "dir", indent: 0 },
  { name: "utils.ts", type: "file", indent: 1, time: "5d ago" },
  { name: "README.md", type: "file", indent: 0, time: "2h ago" },
  { name: "package.json", type: "file", indent: 0, time: "5d ago" },
  { name: "tsconfig.json", type: "file", indent: 0, time: "2w ago" },
];

const commits = [
  { hash: "a3f8d21", msg: "feat: add RevealBlock animation component", author: "AnxForever", time: "2 hours ago", status: "success" as const },
  { hash: "b1c2e90", msg: "fix: correct focus ring opacity in Safari 16", author: "contributor", time: "5 hours ago", status: "success" as const },
  { hash: "c4d5f12", msg: "refactor: extract useInView hook to shared module", author: "AnxForever", time: "1 day ago", status: "warning" as const },
  { hash: "e7f8a34", msg: "docs: update contributing guidelines for style additions", author: "contributor", time: "2 days ago", status: "error" as const },
  { hash: "f9a0b56", msg: "chore: bump vitest to v2.1, update lockfile", author: "dependabot", time: "3 days ago", status: "success" as const },
];

const issueItems = [
  {
    number: 42,
    title: "Button focus ring missing in Safari 16",
    labels: [
      { text: "bug", color: "#cf222e", bg: "#FFEBE9" },
      { text: "accessibility", color: "#0969da", bg: "#ddf4ff" },
    ],
    author: "anx4758",
    comments: 7,
    open: true,
  },
  {
    number: 41,
    title: "Add dark mode variant for Card component",
    labels: [
      { text: "enhancement", color: "#1f883d", bg: "#dafbe1" },
      { text: "good first issue", color: "#9a6700", bg: "#fff8c5" },
    ],
    author: "contributor",
    comments: 3,
    open: true,
  },
  {
    number: 40,
    title: "Document all design token categories in depth",
    labels: [{ text: "documentation", color: "#0969da", bg: "#ddf4ff" }],
    author: "AnxForever",
    comments: 12,
    open: false,
  },
  {
    number: 39,
    title: "Input placeholder color contrast fails WCAG AA",
    labels: [
      { text: "bug", color: "#cf222e", bg: "#FFEBE9" },
      { text: "a11y", color: "#1f883d", bg: "#dafbe1" },
    ],
    author: "reviewer",
    comments: 5,
    open: false,
  },
];

const prItems = [
  { number: 15, title: "feat: GitHub Style showcase complete rebuild", author: "AnxForever", checks: "passing" as const, branch: "feat/showcase-rebuild" },
  { number: 14, title: "fix: community runtime resolver caching", author: "AnxForever", checks: "passing" as const, branch: "fix/community-cache" },
  { number: 13, title: "chore: update vitest to v2.1", author: "dependabot", checks: "pending" as const, branch: "deps/vitest-2.1" },
];

const grayScale = [
  { name: "Text Primary", hex: "#1f2328", role: "Headings, body text" },
  { name: "Text Muted", hex: "#656d76", role: "Secondary text, captions" },
  { name: "Text Subtle", hex: "#8b949e", role: "Placeholder, disabled" },
  { name: "Border Default", hex: "#d0d7de", role: "Dividers, card outlines" },
  { name: "Canvas Inset", hex: "#f6f8fa", role: "Code blocks, subtle bg" },
  { name: "Canvas Default", hex: "#ffffff", role: "Page & card backgrounds" },
  { name: "Nav Dark", hex: "#24292f", role: "Top navigation bar" },
];

const semanticColors = [
  { name: "Interactive Blue", hex: "#0969da", bg: "#ddf4ff", role: "Links, primary CTA" },
  { name: "Success Green", hex: "#1f883d", bg: "#dafbe1", role: "Merge, success states" },
  { name: "Warning Amber", hex: "#9a6700", bg: "#fff8c5", role: "Pending, review needed" },
  { name: "Danger Red", hex: "#cf222e", bg: "#FFEBE9", role: "Close, delete, errors" },
];

const doRules = [
  "Use #0969da as the sole primary interactive color",
  "Build visual hierarchy with gray levels, not color variety",
  "Apply rounded-md (6px) corners consistently across all components",
  "Use font-mono with bg-[#f6f8fa] for all code and hash elements",
  "Semantic colors only: green=success, amber=warning, red=danger",
  "Keep transitions 75–150ms — no easing theatrics",
  "Focus rings: focus:ring-4 + brand color at 30% opacity",
  "Card hover: subtle background + border darkening only",
];

const dontRules = [
  "No gradient backgrounds on any UI surfaces",
  "No rounded-2xl or larger (avatars are the only exception)",
  "No shadow-lg or shadow-xl on cards or panels",
  "No serif fonts — system sans-serif stack only",
  "No purely decorative animations or particle effects",
  "No off-brand accent colors used for decoration",
  "No font-size above text-3xl in content areas",
  "No padding above p-6 — maintain information density",
];

const typographySamples = [
  { label: "Display / Heading", size: "text-2xl", weight: "font-semibold", sample: "Design System v2.1", meta: "24px · Semibold", muted: false },
  { label: "Section Title", size: "text-xl", weight: "font-semibold", sample: "Repository Overview", meta: "20px · Semibold", muted: false },
  { label: "Body / Description", size: "text-sm", weight: "font-normal", sample: "A comprehensive token library for building consistent developer tooling across platforms and teams.", meta: "14px · Regular", muted: false },
  { label: "Caption / Meta", size: "text-xs", weight: "font-normal", sample: "Updated 2 hours ago by AnxForever", meta: "12px · Regular", muted: true },
  { label: "Label / Badge", size: "text-xs", weight: "font-medium", sample: "good first issue", meta: "12px · Medium", muted: false },
];

const tokenCodeLines = [
  { line: "1", content: "export const githubTokens = {", color: "#1f2328" },
  { line: "2", content: "  colors: {", color: "#1f2328" },
  { line: "3", content: "    primary:   '#0969da', // Interactive blue", color: "#0969da" },
  { line: "4", content: "    success:   '#1f883d', // Merge green", color: "#1f883d" },
  { line: "5", content: "    warning:   '#9a6700', // Review amber", color: "#9a6700" },
  { line: "6", content: "    danger:    '#cf222e', // Close red", color: "#cf222e" },
  { line: "7", content: "    fg:        '#1f2328', // Text primary", color: "#656d76" },
  { line: "8", content: "    fgMuted:   '#656d76', // Text secondary", color: "#656d76" },
  { line: "9", content: "    border:    '#d0d7de', // All borders", color: "#656d76" },
  { line: "10", content: "    canvas:    '#f6f8fa', // Subtle bg", color: "#656d76" },
  { line: "11", content: "  },", color: "#1f2328" },
  { line: "12", content: "  radius:   'rounded-md', // 6px uniform", color: "#1f2328" },
  { line: "13", content: "  duration: '150ms',      // Max animation", color: "#1f2328" },
  { line: "14", content: "};", color: "#1f2328" },
];

/* ------------------------------------------------------------------ */
/*  Main export                                                         */
/* ------------------------------------------------------------------ */

export default function GitHubStyleShowcase() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [activeRepoTab, setActiveRepoTab] = useState<"code" | "issues" | "pulls">("code");
  const [issueFilter, setIssueFilter] = useState<"open" | "closed">("open");
  const [hoveredFile, setHoveredFile] = useState<string | null>(null);
  const [activeComponentTab, setActiveComponentTab] = useState<"button" | "card" | "input" | "code">("button");
  const [toggleStates, setToggleStates] = useState([true, false, true]);
  const [copied, setCopied] = useState(false);

  // Animation demo states
  const [extremeUtilityHovered, setExtremeUtilityHovered] = useState(false);
  const [microTactilityPressed, setMicroTactilityPressed] = useState(false);
  const [focusRingActive, setFocusRingActive] = useState(false);
  const [subtleBorderHovered, setSubtleBorderHovered] = useState(false);
  const [transitionCompareDuration, setTransitionCompareDuration] = useState<"slow" | "fast" | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const filteredIssues = issueItems.filter((i) =>
    issueFilter === "open" ? i.open : !i.open
  );

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif' }}
    >

      {/* ================================================================ */}
      {/* 1. FIXED DARK NAV                                                 */}
      {/* ================================================================ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#24292f] border-b border-[#30363d]">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
          <OctocatIcon size={32} fill="#ffffff" />

          <div className="hidden md:flex items-center flex-1 max-w-xs">
            <div className="relative w-full">
              <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8b949e]" />
              <input
                type="text"
                placeholder="Search or jump to..."
                className="w-full pl-8 pr-3 py-1 bg-transparent border border-[#57606a] rounded-md text-sm text-white placeholder-[#8b949e] focus:bg-[#0d1117] focus:border-[#58a6ff] focus:shadow-[0_0_0_3px_rgba(88,166,255,0.3)] focus:outline-none transition-all duration-150"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 text-sm text-[#e6edf3] font-semibold ml-2">
            <span className="hover:text-white transition-colors duration-100 cursor-pointer">Pull requests</span>
            <span className="hover:text-white transition-colors duration-100 cursor-pointer">Issues</span>
            <span className="hover:text-white transition-colors duration-100 cursor-pointer">Marketplace</span>
            <span className="hover:text-white transition-colors duration-100 cursor-pointer">Explore</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#0969da] flex items-center justify-center text-white text-xs font-bold select-none">
              A
            </div>
          </div>

          <Link
            href="/"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#8b949e] border border-[#57606a] rounded-md hover:border-[#8b949e] hover:text-[#e6edf3] transition-all duration-150 ml-2"
          >
            StyleKit &rarr;
          </Link>
        </div>
      </nav>

      <div className="pt-14">

        {/* ================================================================ */}
        {/* 2. HERO — Repository View                                         */}
        {/* ================================================================ */}
        <section className="border-b border-[#d0d7de]">
          <div className="max-w-7xl mx-auto px-4 pt-6 pb-0">

            {/* Breadcrumb */}
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(14px)",
                transition: "opacity 0.55s cubic-bezier(0.16,1,0.3,1) 0s, transform 0.55s cubic-bezier(0.16,1,0.3,1) 0s",
              }}
            >
              <div className="flex items-center gap-1.5 text-sm mb-4 flex-wrap">
                <span className="text-[#0969da] hover:underline cursor-pointer font-semibold">AnxForever</span>
                <span className="text-[#656d76]">/</span>
                <span className="text-[#0969da] hover:underline cursor-pointer font-semibold text-lg">stylekit</span>
                <span className="ml-2 px-2 py-0.5 text-xs font-medium text-[#656d76] border border-[#d0d7de] rounded-full">
                  Public
                </span>
              </div>
            </div>

            {/* Repo stats row */}
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(14px)",
                transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.08s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.08s",
              }}
            >
              <div className="flex items-center gap-4 text-sm text-[#656d76] mb-4 flex-wrap">
                <div className="flex items-center gap-1">
                  <StarIcon className="w-4 h-4" />
                  <span><strong className="text-[#1f2328]">1,247</strong> stars</span>
                </div>
                <div className="flex items-center gap-1">
                  <ForkIcon className="w-4 h-4" />
                  <span><strong className="text-[#1f2328]">89</strong> forks</span>
                </div>
                <div className="flex items-center gap-1">
                  <IssueOpenIcon className="w-4 h-4" />
                  <span><strong className="text-[#1f2328]">42</strong> issues</span>
                </div>

                <div className="flex items-center gap-1.5 ml-auto">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-[#1f2328] bg-[#f6f8fa] border border-[#d0d7de] rounded-md shadow-[0_1px_0_rgba(27,31,36,0.04)] hover:bg-[#f3f4f6] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#0969da]/20 transition-all duration-100">
                    <StarIcon className="w-4 h-4 text-[#656d76]" />
                    Star
                    <span className="px-1.5 py-0.5 text-xs bg-[#eaeef2] rounded-full">1.2k</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-[#1f2328] bg-[#f6f8fa] border border-[#d0d7de] rounded-md shadow-[0_1px_0_rgba(27,31,36,0.04)] hover:bg-[#f3f4f6] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#0969da]/20 transition-all duration-100">
                    <ForkIcon className="w-4 h-4 text-[#656d76]" />
                    Fork
                    <span className="px-1.5 py-0.5 text-xs bg-[#eaeef2] rounded-full">89</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Tab bar */}
            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.16s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.16s",
              }}
            >
              <div className="flex gap-1 border-b border-[#d0d7de] -mb-px">
                {(["code", "issues", "pulls"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveRepoTab(tab)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold capitalize border-b-2 transition-colors duration-100 ${
                      activeRepoTab === tab
                        ? "text-[#1f2328] border-[#fd8c73]"
                        : "text-[#656d76] border-transparent hover:text-[#1f2328] hover:bg-[#f6f8fa]"
                    }`}
                  >
                    {tab === "code" && <CodeIcon className="w-4 h-4" />}
                    {tab === "issues" && <IssueOpenIcon className="w-4 h-4" />}
                    {tab === "pulls" && <PRIcon className="w-4 h-4" />}
                    {tab}
                    {tab === "issues" && (
                      <span className="px-1.5 py-0.5 text-xs font-medium bg-[#eaeef2] text-[#656d76] rounded-full">42</span>
                    )}
                    {tab === "pulls" && (
                      <span className="px-1.5 py-0.5 text-xs font-medium bg-[#eaeef2] text-[#656d76] rounded-full">3</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 3. REPO TAB CONTENT — Code / Issues / Pulls                      */}
        {/* ================================================================ */}
        <section className="max-w-7xl mx-auto px-4 py-6">

          {/* ---- Code Tab ---- */}
          {activeRepoTab === "code" && (
            <div className="grid md:grid-cols-3 gap-6">
              <RevealBlock className="md:col-span-2" delay={0}>
                {/* Branch selector + Code button row */}
                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-[#1f2328] bg-[#f6f8fa] border border-[#d0d7de] rounded-md hover:bg-[#f3f4f6] active:scale-[0.98] transition-all duration-100">
                      <svg className="w-4 h-4 text-[#656d76]" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" />
                      </svg>
                      main
                      <svg className="w-3 h-3 text-[#656d76]" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M4.427 7.427l3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z" />
                      </svg>
                    </button>
                    <span className="text-sm text-[#656d76]">
                      <strong className="text-[#1f2328]">12</strong> branches
                    </span>
                    <span className="text-sm text-[#656d76]">
                      <strong className="text-[#1f2328]">4</strong> tags
                    </span>
                  </div>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-white bg-[#1f883d] border border-[#1b7f37] rounded-md shadow-[0_1px_0_rgba(27,31,36,0.04)] hover:bg-[#1a7f37] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#1f883d]/30 transition-all duration-100">
                    <FileIcon className="w-4 h-4" />
                    Code
                  </button>
                </div>

                {/* File tree */}
                <div className="border border-[#d0d7de] rounded-md overflow-hidden">
                  <div className="flex items-center gap-3 px-4 py-3 bg-[#f6f8fa] border-b border-[#d0d7de] text-sm">
                    <div className="w-5 h-5 rounded-full bg-[#0969da] shrink-0 flex items-center justify-center text-white text-xs font-bold">
                      A
                    </div>
                    <span className="text-[#1f2328] font-semibold truncate">feat: add RevealBlock animation component</span>
                    <span className="text-[#656d76] ml-auto shrink-0">2 hours ago</span>
                  </div>

                  {fileTree.map((file) => (
                    <div
                      key={`${file.name}-${file.indent}`}
                      onMouseEnter={() => setHoveredFile(file.name)}
                      onMouseLeave={() => setHoveredFile(null)}
                      className="flex items-center gap-3 py-2 text-sm border-b border-[#d0d7de] last:border-0 hover:bg-[#f6f8fa] transition-colors duration-100 cursor-pointer"
                      style={{ paddingLeft: `${16 + file.indent * 20}px`, paddingRight: "16px" }}
                    >
                      {file.type === "dir" ? (
                        <FolderIcon className="w-4 h-4 text-[#54aeff] shrink-0" />
                      ) : (
                        <FileIcon className="w-4 h-4 text-[#656d76] shrink-0" />
                      )}
                      <span
                        className="flex-1 truncate transition-colors duration-100"
                        style={{ color: hoveredFile === file.name ? "#0969da" : "#1f2328" }}
                      >
                        {file.name}
                      </span>
                      {file.type === "file" && (
                        <span className="text-[#656d76] text-xs shrink-0">{file.time}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* README preview */}
                <div className="mt-4 border border-[#d0d7de] rounded-md overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-2 bg-[#f6f8fa] border-b border-[#d0d7de]">
                    <FileIcon className="w-4 h-4 text-[#656d76]" />
                    <span className="text-sm font-semibold text-[#1f2328]">README.md</span>
                  </div>
                  <div className="p-6 prose prose-sm max-w-none">
                    <h1 className="text-2xl font-semibold text-[#1f2328] mb-2">StyleKit</h1>
                    <p className="text-sm text-[#1f2328] leading-relaxed mb-4">
                      130+ curated design style presets with design tokens, component code, and AI rules for consistent UI generation.
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {["TypeScript", "Next.js", "Tailwind CSS", "Design Tokens"].map((t) => (
                        <span key={t} className="px-2 py-0.5 text-xs font-medium text-[#0969da] bg-[#ddf4ff] rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="p-3 bg-[#f6f8fa] rounded-md border border-[#d0d7de] font-mono text-xs text-[#1f2328]">
                      <span className="text-[#656d76]">$ </span>npm install stylekit-tokens
                    </div>
                  </div>
                </div>
              </RevealBlock>

              {/* Sidebar */}
              <RevealBlock delay={0.1}>
                <div className="space-y-4">
                  {/* About panel */}
                  <div className="border border-[#d0d7de] rounded-md p-4">
                    <h3 className="text-sm font-semibold text-[#1f2328] mb-2">About</h3>
                    <p className="text-sm text-[#656d76] leading-relaxed mb-4">
                      130+ curated design style presets with tokens, component code, and AI rules.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-[#656d76]">
                        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M1.75 2h12.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0 1 14.25 14H1.75A1.75 1.75 0 0 1 0 12.25v-8.5C0 2.784.784 2 1.75 2ZM1.5 12.251c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V5.809L8.38 9.397a.75.75 0 0 1-.76 0L1.5 5.809v6.442Zm13-8.181v-.32a.25.25 0 0 0-.25-.25H1.75a.25.25 0 0 0-.25.25v.32L8 7.88Z" />
                        </svg>
                        stylekit@stylekit.dev
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#0969da] hover:underline cursor-pointer">
                        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M7.775 3.275a.75.75 0 0 0 1.06 1.06l1.25-1.25a2 2 0 1 1 2.83 2.83l-2.5 2.5a2 2 0 0 1-2.83 0 .75.75 0 0 0-1.06 1.06 3.5 3.5 0 0 0 4.95 0l2.5-2.5a3.5 3.5 0 0 0-4.95-4.95l-1.25 1.25Zm-4.69 9.64a2 2 0 0 1 0-2.83l2.5-2.5a2 2 0 0 1 2.83 0 .75.75 0 0 0 1.06-1.06 3.5 3.5 0 0 0-4.95 0l-2.5 2.5a3.5 3.5 0 0 0 4.95 4.95l1.25-1.25a.75.75 0 0 0-1.06-1.06l-1.25 1.25a2 2 0 0 1-2.83 0Z" />
                        </svg>
                        stylekit.dev
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {["design-system", "tokens", "next-js", "typescript", "tailwind"].map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 text-xs font-medium text-[#0969da] bg-[#ddf4ff] rounded-full hover:bg-[#b6e3ff] cursor-pointer transition-colors duration-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Releases panel */}
                  <div className="border border-[#d0d7de] rounded-md p-4">
                    <h3 className="text-sm font-semibold text-[#1f2328] mb-3">Releases</h3>
                    <div className="space-y-3">
                      {[
                        { tag: "v2.1.0", desc: "Community runtime + showcase", date: "Feb 2026" },
                        { tag: "v2.0.0", desc: "Batch L-N showcase rebuild", date: "Jan 2026" },
                        { tag: "v1.9.0", desc: "120 styles milestone", date: "Dec 2025" },
                      ].map((rel) => (
                        <div key={rel.tag} className="flex items-start gap-2">
                          <TagIcon className="w-4 h-4 text-[#1f883d] mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm text-[#0969da] font-semibold">{rel.tag}</p>
                            <p className="text-xs text-[#656d76]">{rel.desc}</p>
                            <p className="text-xs text-[#656d76]">{rel.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contributors */}
                  <div className="border border-[#d0d7de] rounded-md p-4">
                    <h3 className="text-sm font-semibold text-[#1f2328] mb-3">Contributors</h3>
                    <div className="flex gap-1.5 flex-wrap">
                      {["AnxForever", "contributor", "reviewer", "dependabot"].map((user, i) => (
                        <div
                          key={user}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold hover:ring-2 hover:ring-[#0969da] hover:ring-offset-1 transition-all duration-100 cursor-pointer"
                          style={{ backgroundColor: ["#0969da", "#1f883d", "#9a6700", "#656d76"][i] }}
                          title={user}
                        >
                          {user[0].toUpperCase()}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealBlock>
            </div>
          )}

          {/* ---- Issues Tab ---- */}
          {activeRepoTab === "issues" && (
            <RevealBlock delay={0}>
              <div className="border border-[#d0d7de] rounded-md overflow-hidden">
                <div className="flex items-center gap-0 bg-[#f6f8fa] border-b border-[#d0d7de] px-4 py-2">
                  <button
                    onClick={() => setIssueFilter("open")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-md transition-colors duration-100 ${issueFilter === "open" ? "text-[#1f2328]" : "text-[#656d76] hover:text-[#1f2328]"}`}
                  >
                    <IssueOpenIcon className="w-4 h-4" />
                    {issueItems.filter((i) => i.open).length} Open
                  </button>
                  <button
                    onClick={() => setIssueFilter("closed")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-md transition-colors duration-100 ${issueFilter === "closed" ? "text-[#1f2328]" : "text-[#656d76] hover:text-[#1f2328]"}`}
                  >
                    <CheckIcon className="w-4 h-4" />
                    {issueItems.filter((i) => !i.open).length} Closed
                  </button>
                </div>

                {filteredIssues.length === 0 ? (
                  <div className="py-16 text-center text-[#656d76] text-sm">
                    No {issueFilter} issues found.
                  </div>
                ) : (
                  filteredIssues.map((issue) => (
                    <div key={issue.number} className="group flex items-start gap-3 px-4 py-4 border-b border-[#d0d7de] last:border-0 hover:bg-[#f6f8fa] transition-colors duration-100">
                      <div className="mt-0.5 shrink-0">
                        {issue.open ? (
                          <IssueOpenIcon className="w-4 h-4 text-[#1f883d]" />
                        ) : (
                          <IssueClosedIcon className="w-4 h-4 text-[#8250df]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-[#1f2328] group-hover:text-[#0969da] cursor-pointer transition-colors duration-100">
                            {issue.title}
                          </span>
                          <div className="flex gap-1 flex-wrap">
                            {issue.labels.map((label) => (
                              <span
                                key={label.text}
                                className="px-2 py-0.5 text-xs font-medium rounded-full"
                                style={{ color: label.color, backgroundColor: label.bg }}
                              >
                                {label.text}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-[#656d76] mt-1">
                          #{issue.number} opened by{" "}
                          <span className="text-[#0969da] hover:underline cursor-pointer">{issue.author}</span>
                        </p>
                      </div>
                      {issue.comments > 0 && (
                        <div className="flex items-center gap-1 text-xs text-[#656d76] shrink-0 mt-0.5 hover:text-[#0969da] cursor-pointer transition-colors duration-100">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25H2.75Z" />
                          </svg>
                          {issue.comments}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </RevealBlock>
          )}

          {/* ---- Pulls Tab ---- */}
          {activeRepoTab === "pulls" && (
            <RevealBlock delay={0}>
              <div className="border border-[#d0d7de] rounded-md overflow-hidden">
                <div className="bg-[#f6f8fa] border-b border-[#d0d7de] px-4 py-2">
                  <span className="text-sm font-semibold text-[#1f2328]">{prItems.length} Open pull requests</span>
                </div>
                {prItems.map((pr) => (
                  <div key={pr.number} className="group flex items-start gap-3 px-4 py-4 border-b border-[#d0d7de] last:border-0 hover:bg-[#f6f8fa] transition-colors duration-100">
                    <PRIcon className="w-4 h-4 text-[#1f883d] mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1f2328] group-hover:text-[#0969da] cursor-pointer transition-colors duration-100">
                        {pr.title}
                      </p>
                      <p className="text-xs text-[#656d76] mt-1">
                        #{pr.number} by{" "}
                        <span className="text-[#0969da]">{pr.author}</span>
                        {" \u00b7 "}wants to merge into{" "}
                        <code className="px-1 py-0.5 bg-[#f6f8fa] rounded text-xs font-mono border border-[#d0d7de]">main</code>
                        {" "}from{" "}
                        <code className="px-1 py-0.5 bg-[#f6f8fa] rounded text-xs font-mono border border-[#d0d7de]">{pr.branch}</code>
                      </p>
                    </div>
                    <span
                      className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
                        pr.checks === "passing"
                          ? "text-[#1f883d] bg-[#dafbe1]"
                          : pr.checks === "pending"
                          ? "text-[#9a6700] bg-[#fff8c5]"
                          : "text-[#cf222e] bg-[#FFEBE9]"
                      }`}
                    >
                      <CheckIcon className="w-3 h-3" />
                      {pr.checks}
                    </span>
                  </div>
                ))}
              </div>
            </RevealBlock>
          )}
        </section>

        {/* ================================================================ */}
        {/* 4. COMMIT ACTIVITY                                                */}
        {/* ================================================================ */}
        <section className="py-12 border-t border-[#d0d7de]">
          <div className="max-w-7xl mx-auto px-4">
            <RevealBlock delay={0}>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[#1f2328]">Commit Activity</h2>
                <p className="text-sm text-[#656d76] mt-1">Recent commits with CI check status</p>
              </div>
            </RevealBlock>

            <div className="border border-[#d0d7de] rounded-md overflow-hidden">
              {commits.map((commit, i) => (
                <RevealBlock key={commit.hash} delay={i * 0.06}>
                  <div className="flex items-center gap-4 px-4 py-3 border-b border-[#d0d7de] last:border-0 hover:bg-[#f6f8fa] transition-colors duration-100 group">
                    <div
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        commit.status === "success"
                          ? "bg-[#1f883d]"
                          : commit.status === "warning"
                          ? "bg-[#9a6700]"
                          : "bg-[#cf222e]"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1f2328] group-hover:text-[#0969da] truncate transition-colors duration-100 cursor-pointer">
                        {commit.msg}
                      </p>
                      <p className="text-xs text-[#656d76] mt-0.5">
                        <span className="text-[#0969da]">{commit.author}</span> committed {commit.time}
                      </p>
                    </div>
                    <code className="text-xs font-mono text-[#0969da] hover:underline cursor-pointer shrink-0 px-2 py-1 bg-[#f6f8fa] border border-[#d0d7de] rounded-md">
                      {commit.hash}
                    </code>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
                        commit.status === "success"
                          ? "text-[#1f883d] bg-[#dafbe1]"
                          : commit.status === "warning"
                          ? "text-[#9a6700] bg-[#fff8c5]"
                          : "text-[#cf222e] bg-[#FFEBE9]"
                      }`}
                    >
                      {commit.status}
                    </span>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 5. ANIMATION & INTERACTION RULES — 4 named aiRules demos         */}
        {/* ================================================================ */}
        <section className="py-12 bg-[#f6f8fa] border-t border-[#d0d7de]">
          <div className="max-w-7xl mx-auto px-4">
            <RevealBlock delay={0}>
              <div className="mb-2">
                <h2 className="text-xl font-semibold text-[#1f2328]">Animation &amp; Interaction Rules</h2>
                <p className="text-sm text-[#656d76] mt-1">
                  Four named rules from the GitHub Style aiRules — hover or click each demo to observe the pattern.
                </p>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.04}>
              <div className="mt-6 mb-3 px-3 py-2 bg-white border border-[#d0d7de] rounded-md inline-flex items-center gap-2">
                <span className="text-xs font-mono text-[#656d76]">aiRules</span>
                <span className="w-px h-3 bg-[#d0d7de]" />
                <span className="text-xs text-[#1f2328]">GitHub Style interaction constraints</span>
              </div>
            </RevealBlock>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">

              {/* ---- Rule 1: Extreme Utility ---- */}
              <RevealBlock delay={0.06}>
                <div className="bg-white border border-[#d0d7de] rounded-md overflow-hidden h-full">
                  <div className="px-4 py-3 border-b border-[#d0d7de] bg-[#f6f8fa] flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="px-2 py-0.5 text-xs font-semibold text-[#0969da] bg-[#ddf4ff] rounded-full">
                          Extreme Utility
                        </span>
                        <span className="text-xs text-[#656d76] font-mono">duration-75 to 150</span>
                      </div>
                      <p className="text-xs text-[#656d76] leading-relaxed">
                        Interactions express state, not drama. No position shift or scale enlarge. Hover = color change only.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 space-y-5">
                    {/* Live demo */}
                    <div>
                      <p className="text-xs font-semibold text-[#656d76] mb-3 uppercase tracking-[0.12em]">Live demo — hover the button</p>
                      <div className="flex flex-wrap gap-3 items-center">
                        <button
                          onMouseEnter={() => setExtremeUtilityHovered(true)}
                          onMouseLeave={() => setExtremeUtilityHovered(false)}
                          className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold text-white bg-[#1f883d] border border-[#1b7f37] rounded-md shadow-[0_1px_0_rgba(27,31,36,0.04)] hover:bg-[#1a7f37] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#1f883d]/30 transition-all duration-100"
                        >
                          <CheckIcon className="w-4 h-4" />
                          Merge pull request
                        </button>
                        <button className="px-4 py-1.5 text-sm font-semibold text-[#1f2328] bg-[#f6f8fa] border border-[#d0d7de] rounded-md hover:bg-[#f3f4f6] active:scale-[0.98] transition-all duration-100">
                          Cancel
                        </button>
                      </div>
                    </div>

                    {/* State indicator */}
                    <div className="p-3 bg-[#f6f8fa] rounded-md border border-[#d0d7de]">
                      <p className="text-xs font-mono text-[#656d76]">
                        {extremeUtilityHovered
                          ? "hover: bg #1a7f37 — darker shade, no scale, no translate"
                          : "idle: bg #1f883d, border #1b7f37, shadow 1px under"}
                      </p>
                    </div>

                    {/* Code sample */}
                    <div className="bg-[#f6f8fa] border border-[#d0d7de] rounded-md overflow-hidden">
                      <div className="px-3 py-1.5 border-b border-[#d0d7de]">
                        <span className="text-xs text-[#656d76] font-mono">rule.ts</span>
                      </div>
                      <pre className="p-3 text-xs font-mono text-[#1f2328] leading-relaxed overflow-x-auto">{`// Extreme Utility
hover:bg-[#1a7f37]      // color only
active:scale-[0.98]     // micro confirm
transition-all          // duration-100
// NO: hover:scale-105 hover:-translate-y-1`}</pre>
                    </div>
                  </div>
                </div>
              </RevealBlock>

              {/* ---- Rule 2: Micro-Tactility ---- */}
              <RevealBlock delay={0.1}>
                <div className="bg-white border border-[#d0d7de] rounded-md overflow-hidden h-full">
                  <div className="px-4 py-3 border-b border-[#d0d7de] bg-[#f6f8fa]">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="px-2 py-0.5 text-xs font-semibold text-[#1f883d] bg-[#dafbe1] rounded-full">
                        Micro-Tactility
                      </span>
                      <span className="text-xs text-[#656d76] font-mono">active:scale-[0.98]</span>
                    </div>
                    <p className="text-xs text-[#656d76] leading-relaxed">
                      Press confirmation via subtle scale + bg deepen. Not skeuomorphic — just enough tactile signal.
                    </p>
                  </div>

                  <div className="p-5 space-y-5">
                    <div>
                      <p className="text-xs font-semibold text-[#656d76] mb-3 uppercase tracking-[0.12em]">Live demo — click and hold</p>
                      <div className="flex flex-wrap gap-3 items-center">
                        <button
                          onMouseDown={() => setMicroTactilityPressed(true)}
                          onMouseUp={() => setMicroTactilityPressed(false)}
                          onMouseLeave={() => setMicroTactilityPressed(false)}
                          className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold text-white bg-[#0969da] border border-[#0860ca] rounded-md shadow-[0_1px_0_rgba(27,31,36,0.04)] hover:bg-[#0860ca] active:scale-[0.98] active:bg-[#0757ba] focus:outline-none focus:ring-4 focus:ring-[#0969da]/30 transition-all duration-100"
                        >
                          Submit review
                        </button>
                        <button className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold text-white bg-[#cf222e] border border-[#c21e2d] rounded-md hover:bg-[#c21e2d] active:scale-[0.98] active:bg-[#b91c1c] focus:outline-none focus:ring-4 focus:ring-[#cf222e]/30 transition-all duration-100">
                          Close issue
                        </button>
                      </div>
                    </div>

                    <div className="p-3 bg-[#f6f8fa] rounded-md border border-[#d0d7de]">
                      <p className="text-xs font-mono text-[#656d76]">
                        {microTactilityPressed
                          ? "pressed: scale 0.98 + bg darkens — confirmatory squish"
                          : "idle: shadow-[0_1px_0] bottom underline illusion"}
                      </p>
                    </div>

                    <div className="bg-[#f6f8fa] border border-[#d0d7de] rounded-md overflow-hidden">
                      <div className="px-3 py-1.5 border-b border-[#d0d7de]">
                        <span className="text-xs text-[#656d76] font-mono">rule.ts</span>
                      </div>
                      <pre className="p-3 text-xs font-mono text-[#1f2328] leading-relaxed overflow-x-auto">{`// Micro-Tactility
shadow-[0_1px_0_rgba(27,31,36,0.04)]
hover:bg-[#0860ca]    // slightly darker
active:scale-[0.98]   // subtle squish
active:bg-[#0757ba]   // darkest state
// NO: active:scale-[0.85] active:rotate`}</pre>
                    </div>
                  </div>
                </div>
              </RevealBlock>

              {/* ---- Rule 3: A11y Focus Rings ---- */}
              <RevealBlock delay={0.14}>
                <div className="bg-white border border-[#d0d7de] rounded-md overflow-hidden h-full">
                  <div className="px-4 py-3 border-b border-[#d0d7de] bg-[#f6f8fa]">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="px-2 py-0.5 text-xs font-semibold text-[#9a6700] bg-[#fff8c5] rounded-full">
                        A11y Focus Rings
                      </span>
                      <span className="text-xs text-[#656d76] font-mono">focus:ring-4</span>
                    </div>
                    <p className="text-xs text-[#656d76] leading-relaxed">
                      Keyboard focus must be unambiguous. Always use focus:ring-4 with brand color at 30% opacity — never only border-color.
                    </p>
                  </div>

                  <div className="p-5 space-y-5">
                    <div>
                      <p className="text-xs font-semibold text-[#656d76] mb-3 uppercase tracking-[0.12em]">
                        Live demo — click button or Tab to the input
                      </p>
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-3">
                          <button
                            onFocus={() => setFocusRingActive(true)}
                            onBlur={() => setFocusRingActive(false)}
                            className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold text-[#1f2328] bg-[#f6f8fa] border border-[#d0d7de] rounded-md hover:bg-[#f3f4f6] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#0969da]/30 transition-all duration-150"
                          >
                            Focus me (Tab)
                          </button>
                          <button className="px-4 py-1.5 text-sm font-semibold text-white bg-[#1f883d] border border-[#1b7f37] rounded-md active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#1f883d]/30 transition-all duration-150">
                            Merge
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Tab to this input..."
                          onFocus={() => setFocusRingActive(true)}
                          onBlur={() => setFocusRingActive(false)}
                          className="w-full px-3 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md text-sm text-[#1f2328] placeholder-[#656d76] focus:bg-white focus:border-[#0969da] focus:shadow-[0_0_0_3px_rgba(9,105,218,0.3)] focus:outline-none transition-all duration-150"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-[#f6f8fa] rounded-md border border-[#d0d7de]">
                      <p className="text-xs font-mono text-[#656d76]">
                        {focusRingActive
                          ? "focus: ring-4 ring-[#0969da]/30 — visible for keyboard nav"
                          : "idle: no ring — ring appears only on keyboard focus"}
                      </p>
                    </div>

                    <div className="bg-[#f6f8fa] border border-[#d0d7de] rounded-md overflow-hidden">
                      <div className="px-3 py-1.5 border-b border-[#d0d7de]">
                        <span className="text-xs text-[#656d76] font-mono">rule.ts</span>
                      </div>
                      <pre className="p-3 text-xs font-mono text-[#1f2328] leading-relaxed overflow-x-auto">{`// A11y Focus Rings
focus:outline-none         // remove browser default
focus:ring-4               // 4px ring spread
focus:ring-[#0969da]/30    // brand blue 30%
// For inputs:
focus:shadow-[0_0_0_3px_rgba(9,105,218,0.3)]`}</pre>
                    </div>
                  </div>
                </div>
              </RevealBlock>

              {/* ---- Rule 4: Subtle Borders ---- */}
              <RevealBlock delay={0.18}>
                <div className="bg-white border border-[#d0d7de] rounded-md overflow-hidden h-full">
                  <div className="px-4 py-3 border-b border-[#d0d7de] bg-[#f6f8fa]">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="px-2 py-0.5 text-xs font-semibold text-[#cf222e] bg-[#FFEBE9] rounded-full">
                        Subtle Borders
                      </span>
                      <span className="text-xs text-[#656d76] font-mono">hover:bg + hover:border</span>
                    </div>
                    <p className="text-xs text-[#656d76] leading-relaxed">
                      Card hover adjusts only background and border shade. No shadow jump, no translate — pure tonal shift.
                    </p>
                  </div>

                  <div className="p-5 space-y-5">
                    <div>
                      <p className="text-xs font-semibold text-[#656d76] mb-3 uppercase tracking-[0.12em]">Live demo — hover the cards</p>
                      <div className="space-y-2">
                        {[
                          { name: "stylekit", desc: "130+ design style presets with tokens and AI rules.", lang: "TypeScript", langColor: "#3178c6", stars: "1.2k" },
                          { name: "claude-kit", desc: "Custom agents and skills for Claude Code productivity.", lang: "TypeScript", langColor: "#3178c6", stars: "487" },
                        ].map((repo) => (
                          <div
                            key={repo.name}
                            onMouseEnter={() => setSubtleBorderHovered(true)}
                            onMouseLeave={() => setSubtleBorderHovered(false)}
                            className="group p-4 bg-white border border-[#d0d7de] rounded-md hover:bg-[#f6f8fa] hover:border-[#8c959f] transition-all duration-150 cursor-pointer"
                          >
                            <div className="flex items-start justify-between mb-1.5">
                              <span className="text-sm font-semibold text-[#0969da] group-hover:underline">
                                AnxForever/{repo.name}
                              </span>
                              <span className="px-1.5 py-0.5 text-xs font-medium text-[#656d76] border border-[#d0d7de] rounded-full">
                                Public
                              </span>
                            </div>
                            <p className="text-xs text-[#656d76] mb-2">{repo.desc}</p>
                            <div className="flex items-center gap-3 text-xs text-[#656d76]">
                              <span className="flex items-center gap-1">
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.langColor }} />
                                {repo.lang}
                              </span>
                              <span>{repo.stars} stars</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-[#f6f8fa] rounded-md border border-[#d0d7de]">
                      <p className="text-xs font-mono text-[#656d76]">
                        {subtleBorderHovered
                          ? "hover: bg #f6f8fa + border #8c959f — tonal only, no shadow"
                          : "idle: bg #ffffff, border #d0d7de — minimal visual weight"}
                      </p>
                    </div>

                    <div className="bg-[#f6f8fa] border border-[#d0d7de] rounded-md overflow-hidden">
                      <div className="px-3 py-1.5 border-b border-[#d0d7de]">
                        <span className="text-xs text-[#656d76] font-mono">rule.ts</span>
                      </div>
                      <pre className="p-3 text-xs font-mono text-[#1f2328] leading-relaxed overflow-x-auto">{`// Subtle Borders
hover:bg-[#f6f8fa]      // canvas inset
hover:border-[#8c959f]  // border deepens
transition-all duration-150
// NO: hover:shadow-md hover:-translate-y-1`}</pre>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            </div>

            {/* Duration comparison strip */}
            <RevealBlock delay={0.22}>
              <div className="mt-6 bg-white border border-[#d0d7de] rounded-md overflow-hidden">
                <div className="px-4 py-3 bg-[#f6f8fa] border-b border-[#d0d7de]">
                  <h3 className="text-sm font-semibold text-[#1f2328]">Transition Duration — Why 75–150ms</h3>
                  <p className="text-xs text-[#656d76] mt-0.5">Animate each to feel the constraint. Fast = utility. Slow = distraction.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#d0d7de]">
                  {[
                    { label: "Too slow (400ms)", duration: 400, cls: "text-[#cf222e]", key: "slow" as const },
                    { label: "GitHub range (100ms)", duration: 100, cls: "text-[#1f883d]", key: "fast" as const },
                    { label: "Zero (jarring)", duration: 0, cls: "text-[#9a6700]", key: null },
                  ].map(({ label, duration, cls, key }) => (
                    <div key={label} className="p-4">
                      <p className={`text-xs font-semibold mb-3 ${cls}`}>{label}</p>
                      <button
                        onClick={() => key && setTransitionCompareDuration(transitionCompareDuration === key ? null : key)}
                        className="w-full px-3 py-1.5 text-sm font-semibold text-[#1f2328] bg-[#f6f8fa] border border-[#d0d7de] rounded-md hover:bg-[#eaeef2] hover:border-[#8c959f] active:scale-[0.98] focus:outline-none"
                        style={{ transition: `all ${duration}ms ease` }}
                      >
                        Hover me
                      </button>
                      <p className="text-xs text-[#656d76] font-mono mt-2">duration-[{duration}ms]</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 6. COMPONENT GALLERY                                              */}
        {/* ================================================================ */}
        <section className="py-12 border-t border-[#d0d7de]">
          <div className="max-w-7xl mx-auto px-4">
            <RevealBlock delay={0}>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[#1f2328]">Component Gallery</h2>
                <p className="text-sm text-[#656d76] mt-1">Canonical GitHub-style UI components — all interaction rules applied</p>
              </div>

              <div className="flex gap-1 bg-[#f6f8fa] border border-[#d0d7de] rounded-md p-1 w-fit mb-6">
                {(["button", "card", "input", "code"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveComponentTab(tab)}
                    className={`px-3 py-1.5 text-sm font-semibold rounded capitalize transition-colors duration-100 ${
                      activeComponentTab === tab
                        ? "bg-[#0969da] text-white"
                        : "text-[#656d76] hover:text-[#1f2328] hover:bg-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </RevealBlock>

            {/* ---- Buttons ---- */}
            {activeComponentTab === "button" && (
              <RevealBlock delay={0.05}>
                <div className="bg-white border border-[#d0d7de] rounded-md p-6">
                  <h3 className="text-sm font-semibold text-[#1f2328] mb-5">Button Variants</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-[#656d76] mb-3 font-mono">Semantic — each color has a function</p>
                      <div className="flex flex-wrap gap-3">
                        <button className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold text-white bg-[#1f883d] border border-[#1b7f37] rounded-md shadow-[0_1px_0_rgba(27,31,36,0.04)] hover:bg-[#1a7f37] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#1f883d]/30 transition-all duration-100">
                          <CheckIcon className="w-4 h-4" />
                          Merge pull request
                        </button>
                        <button className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold text-white bg-[#0969da] border border-[#0860ca] rounded-md shadow-[0_1px_0_rgba(27,31,36,0.04)] hover:bg-[#0860ca] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#0969da]/30 transition-all duration-100">
                          Submit review
                        </button>
                        <button className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold text-[#1f2328] bg-[#f6f8fa] border border-[#d0d7de] rounded-md shadow-[0_1px_0_rgba(27,31,36,0.04)] hover:bg-[#f3f4f6] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#0969da]/20 transition-all duration-100">
                          Cancel
                        </button>
                        <button className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold text-white bg-[#cf222e] border border-[#c21e2d] rounded-md shadow-[0_1px_0_rgba(27,31,36,0.04)] hover:bg-[#c21e2d] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#cf222e]/30 transition-all duration-100">
                          Close issue
                        </button>
                        <button disabled className="px-4 py-1.5 text-sm font-semibold text-[#8c959f] bg-[#f6f8fa] border border-[#d0d7de] rounded-md cursor-not-allowed opacity-60">
                          Disabled
                        </button>
                      </div>
                    </div>
                    <div className="border-t border-[#d0d7de] pt-5">
                      <p className="text-xs text-[#656d76] mb-3 font-mono">Outline variant — secondary actions</p>
                      <div className="flex flex-wrap gap-3">
                        <button className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold text-[#1f2328] bg-white border border-[#d0d7de] rounded-md hover:bg-[#f6f8fa] hover:border-[#8c959f] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#0969da]/20 transition-all duration-100">
                          <StarIcon className="w-4 h-4 text-[#656d76]" />
                          Star
                          <span className="px-1.5 py-0.5 text-xs bg-[#eaeef2] rounded-full">1.2k</span>
                        </button>
                        <button className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold text-[#1f2328] bg-white border border-[#d0d7de] rounded-md hover:bg-[#f6f8fa] hover:border-[#8c959f] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-[#0969da]/20 transition-all duration-100">
                          <ForkIcon className="w-4 h-4 text-[#656d76]" />
                          Fork
                        </button>
                        <button className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold text-[#1f2328] bg-white border border-[#d0d7de] rounded-md hover:bg-[#f6f8fa] hover:border-[#8c959f] active:scale-[0.98] focus:outline-none transition-all duration-100">
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="border-t border-[#d0d7de] pt-4">
                      <p className="text-xs font-mono text-[#656d76]">
                        Tactile rule: active:scale-[0.98] — micro confirm, never full transform.
                        Focus rule: focus:ring-4 + brand color 30% — always visible for keyboard users.
                      </p>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            )}

            {/* ---- Cards ---- */}
            {activeComponentTab === "card" && (
              <RevealBlock delay={0.05}>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: "stylekit", owner: "AnxForever", desc: "130+ design style presets with tokens, component code, and AI rules.", lang: "TypeScript", langColor: "#3178c6", stars: "1.2k", forks: "89", updated: "2 hours ago", badge: "Public" },
                      { name: "claude-code-kit", owner: "AnxForever", desc: "Custom agents, rules, and skills for Claude Code productivity.", lang: "TypeScript", langColor: "#3178c6", stars: "487", forks: "34", updated: "1 day ago", badge: "Private" },
                    ].map((repo) => (
                      <div key={repo.name} className="group p-4 bg-white border border-[#d0d7de] rounded-md hover:bg-[#f6f8fa] hover:border-[#8c959f] transition-all duration-150 cursor-pointer">
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-[#0969da] text-sm font-semibold group-hover:underline">
                            {repo.owner}/{repo.name}
                          </span>
                          <span className="px-1.5 py-0.5 text-xs font-medium text-[#656d76] border border-[#d0d7de] rounded-full">{repo.badge}</span>
                        </div>
                        <p className="text-sm text-[#656d76] mb-3 leading-relaxed">{repo.desc}</p>
                        <div className="flex items-center gap-4 text-xs text-[#656d76]">
                          <span className="flex items-center gap-1.5">
                            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: repo.langColor }} />
                            {repo.lang}
                          </span>
                          <span>{repo.stars} stars</span>
                          <span>{repo.forks} forks</span>
                          <span>Updated {repo.updated}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 bg-[#f6f8fa] border border-[#d0d7de] rounded-md">
                    <p className="text-xs font-mono text-[#656d76]">
                      Subtle Borders rule: hover:bg-[#f6f8fa] + hover:border-[#8c959f] — tonal shift only, no shadow or lift
                    </p>
                  </div>
                </div>
              </RevealBlock>
            )}

            {/* ---- Inputs ---- */}
            {activeComponentTab === "input" && (
              <RevealBlock delay={0.05}>
                <div className="bg-white border border-[#d0d7de] rounded-md p-6 max-w-lg">
                  <h3 className="text-sm font-semibold text-[#1f2328] mb-5">Input States</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-[#1f2328] mb-1.5">Default</label>
                      <input
                        type="text"
                        placeholder="Search or jump to..."
                        className="w-full px-3 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md text-sm text-[#1f2328] placeholder-[#656d76] focus:bg-white focus:border-[#0969da] focus:shadow-[0_0_0_3px_rgba(9,105,218,0.3)] focus:outline-none transition-all duration-150"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1f2328] mb-1.5">Error state</label>
                      <input
                        type="text"
                        defaultValue="invalid@"
                        className="w-full px-3 py-1.5 bg-white border border-[#cf222e] rounded-md text-sm text-[#1f2328] shadow-[0_0_0_3px_rgba(207,34,46,0.3)] focus:outline-none"
                      />
                      <p className="text-xs text-[#cf222e] mt-1.5">Enter a valid email address.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#1f2328] mb-1.5">With search icon</label>
                      <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#656d76]" />
                        <input
                          type="text"
                          placeholder="Search repositories..."
                          className="w-full pl-9 pr-3 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md text-sm text-[#1f2328] placeholder-[#656d76] focus:bg-white focus:border-[#0969da] focus:shadow-[0_0_0_3px_rgba(9,105,218,0.3)] focus:outline-none transition-all duration-150"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#656d76] mb-1.5">Disabled</label>
                      <input
                        type="text"
                        disabled
                        placeholder="Not editable"
                        className="w-full px-3 py-1.5 bg-[#f6f8fa] border border-[#d0d7de] rounded-md text-sm text-[#656d76] cursor-not-allowed opacity-60"
                      />
                    </div>
                  </div>
                </div>
              </RevealBlock>
            )}

            {/* ---- Code viewer ---- */}
            {activeComponentTab === "code" && (
              <RevealBlock delay={0.05}>
                <div className="bg-white border border-[#d0d7de] rounded-md overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-[#f6f8fa] border-b border-[#d0d7de]">
                    <span className="text-sm font-semibold text-[#1f2328]">tokens.ts</span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-[#656d76] border border-[#d0d7de] rounded-md hover:bg-white hover:text-[#1f2328] active:scale-[0.98] transition-all duration-100"
                    >
                      {copied ? <span className="text-[#1f883d]">Copied!</span> : "Copy"}
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm font-mono">
                      <tbody>
                        {tokenCodeLines.map((row) => (
                          <tr key={row.line} className="hover:bg-[#f6f8fa] transition-colors duration-75">
                            <td className="pl-4 pr-6 py-0.5 text-right text-xs text-[#8b949e] select-none w-8">{row.line}</td>
                            <td className="pr-4 py-0.5" style={{ color: row.color }}>{row.content}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </RevealBlock>
            )}
          </div>
        </section>

        {/* ================================================================ */}
        {/* 7. COLOR SYSTEM                                                    */}
        {/* ================================================================ */}
        <section className="py-12 bg-[#f6f8fa] border-t border-[#d0d7de]">
          <div className="max-w-7xl mx-auto px-4">
            <RevealBlock delay={0}>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[#1f2328]">Color System</h2>
                <p className="text-sm text-[#656d76] mt-1">
                  Precise gray-scale hierarchy + semantic functional colors. No color is decorative.
                </p>
              </div>
            </RevealBlock>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Gray scale */}
              <RevealBlock delay={0.05}>
                <div className="border border-[#d0d7de] rounded-md overflow-hidden bg-white">
                  <div className="px-4 py-3 bg-[#f6f8fa] border-b border-[#d0d7de]">
                    <h3 className="text-sm font-semibold text-[#1f2328]">Gray Scale</h3>
                    <p className="text-xs text-[#656d76] mt-0.5">Every level has a semantic role — never pick randomly</p>
                  </div>
                  <div className="divide-y divide-[#d0d7de]">
                    {grayScale.map((c) => (
                      <div key={c.hex} className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#f6f8fa] transition-colors duration-100">
                        <div
                          className="w-8 h-8 rounded-md border border-[#d0d7de] shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-[#1f2328]">{c.name}</p>
                          <p className="text-xs text-[#656d76] truncate">{c.role}</p>
                        </div>
                        <code className="text-xs font-mono text-[#656d76] shrink-0">{c.hex}</code>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealBlock>

              <div className="space-y-4">
                {/* Semantic colors */}
                <RevealBlock delay={0.1}>
                  <div className="border border-[#d0d7de] rounded-md overflow-hidden bg-white">
                    <div className="px-4 py-3 bg-[#f6f8fa] border-b border-[#d0d7de]">
                      <h3 className="text-sm font-semibold text-[#1f2328]">Semantic Colors</h3>
                      <p className="text-xs text-[#656d76] mt-0.5">Functional color roles — no decoration</p>
                    </div>
                    <div className="divide-y divide-[#d0d7de]">
                      {semanticColors.map((c) => (
                        <div key={c.hex} className="flex items-center gap-3 px-4 py-3 hover:bg-[#f6f8fa] transition-colors duration-100">
                          <div className="flex items-center gap-2 shrink-0">
                            <div className="w-6 h-6 rounded-md" style={{ backgroundColor: c.hex }} />
                            <div className="w-6 h-6 rounded-md" style={{ backgroundColor: c.bg }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#1f2328]">{c.name}</p>
                            <p className="text-xs text-[#656d76]">{c.role}</p>
                          </div>
                          <code className="text-xs font-mono text-[#656d76] shrink-0">{c.hex}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                </RevealBlock>

                {/* Toggle settings demo */}
                <RevealBlock delay={0.14}>
                  <div className="border border-[#d0d7de] rounded-md overflow-hidden bg-white">
                    <div className="px-4 py-3 bg-[#f6f8fa] border-b border-[#d0d7de]">
                      <h3 className="text-sm font-semibold text-[#1f2328]">Repository Settings</h3>
                      <p className="text-xs text-[#656d76] mt-0.5">Toggle uses blue as the only interactive color</p>
                    </div>
                    <div className="divide-y divide-[#d0d7de]">
                      {[
                        { label: "Branch protection", desc: "Require PR reviews before merging" },
                        { label: "Auto-merge", desc: "Merge when all requirements are met" },
                        { label: "Delete head branch", desc: "Auto-delete after merge" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between px-4 py-3 hover:bg-[#f6f8fa] transition-colors duration-100">
                          <div>
                            <p className="text-sm font-semibold text-[#1f2328]">{item.label}</p>
                            <p className="text-xs text-[#656d76] mt-0.5">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => {
                              const next = [...toggleStates];
                              next[i] = !next[i];
                              setToggleStates(next);
                            }}
                            className={`relative w-10 h-5 rounded-full transition-colors duration-150 focus:outline-none focus:ring-4 focus:ring-[#0969da]/20 ${toggleStates[i] ? "bg-[#0969da]" : "bg-[#d0d7de]"}`}
                          >
                            <span
                              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-150 ${toggleStates[i] ? "left-5" : "left-0.5"}`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </RevealBlock>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 8. DESIGN RULES — DO / DON'T                                      */}
        {/* ================================================================ */}
        <section className="py-12 border-t border-[#d0d7de]">
          <div className="max-w-7xl mx-auto px-4">
            <RevealBlock delay={0}>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[#1f2328]">Design Rules</h2>
                <p className="text-sm text-[#656d76] mt-1">GitHub style is defined as much by what it never does</p>
              </div>
            </RevealBlock>

            <div className="grid md:grid-cols-2 gap-6">
              <RevealBlock delay={0.05}>
                <div className="border border-[#d0d7de] rounded-md overflow-hidden bg-white">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-[#d0d7de] bg-[#dafbe1]">
                    <CheckIcon className="w-4 h-4 text-[#1f883d]" />
                    <span className="text-sm font-semibold text-[#1f883d]">Do</span>
                  </div>
                  <div className="divide-y divide-[#d0d7de]">
                    {doRules.map((rule, i) => (
                      <div key={i} className="flex items-start gap-3 px-4 py-2.5 hover:bg-[#f6f8fa] transition-colors duration-100">
                        <CheckIcon className="w-3.5 h-3.5 text-[#1f883d] mt-0.5 shrink-0" />
                        <span className="text-sm text-[#1f2328]">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealBlock>

              <RevealBlock delay={0.1}>
                <div className="border border-[#d0d7de] rounded-md overflow-hidden bg-white">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-[#d0d7de] bg-[#FFEBE9]">
                    <XIcon className="w-4 h-4 text-[#cf222e]" />
                    <span className="text-sm font-semibold text-[#cf222e]">Don&apos;t</span>
                  </div>
                  <div className="divide-y divide-[#d0d7de]">
                    {dontRules.map((rule, i) => (
                      <div key={i} className="flex items-start gap-3 px-4 py-2.5 hover:bg-[#f6f8fa] transition-colors duration-100">
                        <XIcon className="w-3.5 h-3.5 text-[#cf222e] mt-0.5 shrink-0" />
                        <span className="text-sm text-[#1f2328]">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealBlock>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 9. TYPOGRAPHY                                                      */}
        {/* ================================================================ */}
        <section className="py-12 bg-[#f6f8fa] border-t border-[#d0d7de]">
          <div className="max-w-7xl mx-auto px-4">
            <RevealBlock delay={0}>
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-[#1f2328]">Typography</h2>
                <p className="text-sm text-[#656d76] mt-1">System font stack — no web font overhead, consistent across all OS</p>
              </div>
            </RevealBlock>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Type scale */}
              <RevealBlock delay={0.05}>
                <div className="border border-[#d0d7de] rounded-md p-5 bg-white space-y-5">
                  {typographySamples.map((t) => (
                    <div key={t.label} className="pb-5 border-b border-[#d0d7de] last:pb-0 last:border-0">
                      <p className="text-xs text-[#656d76] mb-2 font-mono">
                        {t.label} &mdash; {t.meta}
                      </p>
                      <p
                        className={`${t.size} ${t.weight} ${t.muted ? "text-[#656d76]" : "text-[#1f2328]"} leading-relaxed`}
                      >
                        {t.sample}
                      </p>
                    </div>
                  ))}
                </div>
              </RevealBlock>

              {/* Mono stack */}
              <RevealBlock delay={0.1}>
                <div className="border border-[#d0d7de] rounded-md overflow-hidden bg-white">
                  <div className="px-4 py-3 bg-[#f6f8fa] border-b border-[#d0d7de]">
                    <h3 className="text-sm font-semibold text-[#1f2328]">Monospace Stack</h3>
                    <p className="text-xs text-[#656d76] mt-0.5">Code blocks, commit hashes, token values</p>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="p-3 bg-[#f6f8fa] rounded-md border border-[#d0d7de]">
                      <p className="text-xs text-[#656d76] mb-2">Inline code</p>
                      <p className="text-sm text-[#1f2328]">
                        Use{" "}
                        <code className="px-1.5 py-0.5 bg-white rounded border border-[#d0d7de] text-xs font-mono">
                          rounded-md
                        </code>{" "}
                        for all corners.
                      </p>
                    </div>
                    <div className="p-3 bg-[#f6f8fa] rounded-md border border-[#d0d7de]">
                      <p className="text-xs text-[#656d76] mb-2">Code block</p>
                      <pre className="text-xs text-[#1f2328] leading-relaxed overflow-x-auto font-mono">{`const color = {
  primary: "#0969da",
  border:  "#d0d7de",
};`}</pre>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-[#f6f8fa] rounded-md border border-[#d0d7de]">
                      <p className="text-xs text-[#656d76]">Commit hash:</p>
                      <code className="text-xs text-[#0969da] hover:underline cursor-pointer font-mono">a3f8d21</code>
                    </div>
                    <div className="p-3 bg-[#f6f8fa] rounded-md border border-[#d0d7de]">
                      <p className="text-xs text-[#656d76] mb-2">Font stack</p>
                      <p className="text-xs font-mono text-[#1f2328] leading-relaxed break-all">
                        -apple-system, BlinkMacSystemFont,
                        &quot;Segoe UI&quot;, &quot;Noto Sans&quot;,
                        Helvetica, Arial, sans-serif
                      </p>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            </div>
          </div>
        </section>

        {/* ================================================================ */}
        {/* FOOTER                                                             */}
        {/* ================================================================ */}
        <footer className="py-8 border-t border-[#d0d7de] bg-[#f6f8fa]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Brand */}
              <div className="flex items-center gap-3">
                <OctocatIcon size={20} fill="#656d76" />
                <span className="text-sm text-[#656d76]">
                  GitHub Style &middot; Part of{" "}
                  <Link href="/" className="text-[#0969da] hover:underline transition-colors duration-100">
                    StyleKit
                  </Link>
                </span>
              </div>

              {/* Token summary */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#656d76]">
                <span>
                  Primary:{" "}
                  <code className="font-mono text-[#0969da]">#0969da</code>
                </span>
                <span>
                  Text:{" "}
                  <code className="font-mono text-[#1f2328]">#1f2328</code>
                </span>
                <span>
                  Border:{" "}
                  <code className="font-mono">#d0d7de</code>
                </span>
                <span>
                  Nav:{" "}
                  <code className="font-mono">#24292f</code>
                </span>
              </div>

              {/* Nav links */}
              <div className="flex items-center gap-4 text-xs text-[#656d76]">
                <Link href="/styles/github-style" className="hover:text-[#0969da] hover:underline transition-colors duration-100">
                  Docs
                </Link>
                <Link href="/styles/github-style/showcase" className="hover:text-[#0969da] hover:underline transition-colors duration-100">
                  Showcase
                </Link>
                <Link href="/styles" className="hover:text-[#0969da] hover:underline transition-colors duration-100">
                  All Styles
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#656d76] border border-[#d0d7de] rounded-md bg-white hover:border-[#8c959f] hover:text-[#1f2328] transition-all duration-150"
                >
                  StyleKit &rarr;
                </Link>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
