"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline useInView – threshold 0.15                                  */
/* ------------------------------------------------------------------ */
function useInView(threshold = 0.15) {
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
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/*  Inline RevealBlock                                                 */
/* ------------------------------------------------------------------ */
function RevealBlock({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
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
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const timelineEvents = [
  {
    year: "2024",
    month: "November",
    title: "Series C Funding",
    description:
      "Secured $120M in Series C funding to accelerate global expansion and invest in next-generation AI infrastructure.",
    color: "#3b82f6",
    icon: "rocket",
  },
  {
    year: "2024",
    month: "June",
    title: "10 Million Users",
    description:
      "Crossed the ten million active user milestone, cementing our position as the market leader in the design tool space.",
    color: "#10b981",
    icon: "users",
  },
  {
    year: "2023",
    month: "September",
    title: "Enterprise Launch",
    description:
      "Released the Enterprise tier with SSO, audit logs, advanced permissions, and dedicated support for teams of 500+.",
    color: "#f59e0b",
    icon: "building",
  },
  {
    year: "2023",
    month: "March",
    title: "API Platform",
    description:
      "Opened the developer API, enabling third-party integrations and a thriving ecosystem of plugins and extensions.",
    color: "#3b82f6",
    icon: "code",
  },
  {
    year: "2022",
    month: "August",
    title: "1 Million Users",
    description:
      "Reached one million active users within 14 months of launch, driven by organic growth and community referrals.",
    color: "#10b981",
    icon: "chart",
  },
  {
    year: "2022",
    month: "January",
    title: "Series B Funding",
    description:
      "Raised $50M Series B to expand the team and build out the collaboration and real-time editing features.",
    color: "#f59e0b",
    icon: "money",
  },
  {
    year: "2021",
    month: "June",
    title: "Product Launch",
    description:
      "Launched the flagship product after 18 months of development. The initial release included 40 design templates.",
    color: "#ef4444",
    icon: "launch",
  },
  {
    year: "2021",
    month: "January",
    title: "Company Founded",
    description:
      "Three engineers left their day jobs and founded the company in a small apartment with a single shared desk.",
    color: "#3b82f6",
    icon: "flag",
  },
];

const componentTabs = [
  { key: "buttons", label: "Buttons" },
  { key: "cards", label: "Cards" },
  { key: "inputs", label: "Inputs" },
  { key: "navigation", label: "Navigation" },
];

const colorPalette = [
  { name: "Primary", hex: "#1e293b", text: "text-white" },
  { name: "Background", hex: "#f8fafc", text: "text-slate-900" },
  { name: "Surface", hex: "#ffffff", text: "text-slate-900" },
  { name: "Border", hex: "#e2e8f0", text: "text-slate-900" },
  { name: "Muted", hex: "#94a3b8", text: "text-white" },
  { name: "Blue", hex: "#3b82f6", text: "text-white" },
  { name: "Emerald", hex: "#10b981", text: "text-white" },
  { name: "Amber", hex: "#f59e0b", text: "text-white" },
  { name: "Red", hex: "#ef4444", text: "text-white" },
  { name: "Slate 700", hex: "#334155", text: "text-white" },
];

const doRules = [
  "Use a continuous vertical line as the visual backbone",
  "Align node dots precisely with the center line",
  "Left-right alternating layout on desktop for rhythm",
  "Single-side layout on mobile (all right of line)",
  "Consistent spacing between every timeline node",
  "Clear date/time labels on each node",
  "Scroll-triggered reveal animations staggered by index",
  "Node highlights synchronize with card hover state",
];

const dontRules = [
  "Never break the connecting line between nodes",
  "No inconsistent node sizes within the same timeline",
  "No alternating layout on mobile viewports",
  "No timeline items missing date labels",
  "No excessively long content per single node",
  "No disconnected hover (card and node must respond together)",
  "No sluggish animation -- keep duration-200 ease-out",
  "No horizontal scroll caused by timeline overflow",
];

/* ------------------------------------------------------------------ */
/*  Sub-components (all inline)                                        */
/* ------------------------------------------------------------------ */

/** Timeline node dot */
function NodeDot({
  color,
  active = false,
}: {
  color: string;
  active?: boolean;
}) {
  return (
    <div
      className={`w-4 h-4 rounded-full border-4 border-white shadow-sm z-10 transition-all duration-200 ease-out ${
        active
          ? "scale-125 shadow-[0_0_10px_rgba(59,130,246,0.4)]"
          : "group-hover:scale-125"
      }`}
      style={{
        backgroundColor: active ? color : "#e2e8f0",
        boxShadow: active ? `0 0 10px ${color}40` : undefined,
      }}
    />
  );
}

/** Timeline event card */
function TimelineCard({
  year,
  month,
  title,
  description,
  color,
  side = "left",
}: {
  year: string;
  month: string;
  title: string;
  description: string;
  color: string;
  side?: "left" | "right";
}) {
  return (
    <div
      className={`group relative pl-12 md:pl-0 ${
        side === "left"
          ? "md:pr-16 md:text-right"
          : "md:pl-16 md:text-left"
      }`}
    >
      {/* Node on mobile (always left) */}
      <div
        className="absolute top-6 left-0 md:hidden w-4 h-4 rounded-full border-4 border-white shadow-sm z-10 group-hover:scale-125 transition-all duration-200 ease-out"
        style={{ backgroundColor: color }}
      />
      {/* Node on desktop (centered) */}
      <div
        className={`hidden md:block absolute top-6 w-4 h-4 rounded-full border-4 border-white shadow-sm z-10 group-hover:scale-125 transition-all duration-200 ease-out ${
          side === "left"
            ? "right-0 md:-right-[9px]"
            : "left-0 md:-left-[9px]"
        }`}
        style={{ backgroundColor: color }}
      />

      <div
        className={`p-6 bg-white rounded-xl shadow-sm border border-zinc-100 group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-200 ease-out`}
        style={{
          borderColor: undefined,
        }}
      >
        <div className="group-hover:border-blue-200" />
        <time
          className="text-sm font-bold tracking-wide mb-2 block uppercase group-hover:tracking-widest transition-all duration-200"
          style={{ color }}
        >
          {month} {year}
        </time>
        <h3 className="text-xl font-semibold text-zinc-900 mb-2">{title}</h3>
        <p className="text-zinc-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/** Year pill for the navigation */
function YearPill({
  year,
  active,
  onClick,
}: {
  year: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
        active
          ? "bg-blue-500 text-white"
          : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
      }`}
    >
      {year}
    </button>
  );
}

/* ================================================================== */
/*  Main Showcase                                                      */
/* ================================================================== */
export default function TimelineVerticalShowcase() {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeTab, setActiveTab] = useState("buttons");
  const [activeYear, setActiveYear] = useState("all");

  useEffect(() => {
    const t = setTimeout(() => setHeroRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const filteredEvents =
    activeYear === "all"
      ? timelineEvents
      : timelineEvents.filter((e) => e.year === activeYear);

  const years = ["all", ...Array.from(new Set(timelineEvents.map((e) => e.year)))];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1e293b]">
      {/* ============================================================ */}
      {/*  1. NAVIGATION                                               */}
      {/* ============================================================ */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/styles"
            className="text-zinc-500 text-sm hover:text-zinc-900 transition-colors"
          >
            &larr; All Styles
          </Link>
          <span className="text-zinc-900 font-semibold text-lg">
            Vertical Timeline
          </span>
          <div className="flex items-center gap-6">
            <a
              href="#components"
              className="text-zinc-500 text-sm hover:text-zinc-900 transition-colors hidden md:inline"
            >
              Components
            </a>
            <a
              href="#palette"
              className="text-zinc-500 text-sm hover:text-zinc-900 transition-colors hidden md:inline"
            >
              Palette
            </a>
            <a
              href="#rules"
              className="text-zinc-500 text-sm hover:text-zinc-900 transition-colors hidden md:inline"
            >
              Rules
            </a>
          </div>
        </div>
      </nav>

      {/* ============================================================ */}
      {/*  2. HERO                                                     */}
      {/* ============================================================ */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        {/* Decorative vertical line in background */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200 -translate-x-1/2 hidden md:block" />
        {/* Decorative dots */}
        <div className="absolute left-1/2 top-16 w-3 h-3 rounded-full bg-[#3b82f6] -translate-x-1/2 hidden md:block" />
        <div className="absolute left-1/2 bottom-16 w-3 h-3 rounded-full bg-[#10b981] -translate-x-1/2 hidden md:block" />

        <div
          className="relative z-10 max-w-3xl mx-auto text-center"
          style={{
            opacity: heroRevealed ? 1 : 0,
            transform: heroRevealed ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s",
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Layout Style
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-6 leading-tight">
            Vertical{" "}
            <span className="text-[#3b82f6]">Timeline</span>
          </h1>
          <p className="text-lg text-zinc-600 max-w-xl mx-auto mb-10 leading-relaxed">
            A layout that connects moments in time through a continuous visual
            thread. Perfect for company histories, project milestones, career
            journeys, and process flows.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button className="px-6 py-3 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
              View Timeline
            </button>
            <button className="px-6 py-3 bg-white text-zinc-700 rounded-lg font-medium border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  3. LIVE TIMELINE DEMO                                       */}
      {/* ============================================================ */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-8">
              <p className="text-sm text-blue-600 font-medium uppercase tracking-wider mb-2">
                Interactive Demo
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
                Our Journey
              </h2>
              <p className="text-zinc-600">
                Key milestones in our company history
              </p>
            </div>
          </RevealBlock>

          {/* Year filter pills */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
              {years.map((year) => (
                <YearPill
                  key={year}
                  year={year === "all" ? "All" : year}
                  active={activeYear === year}
                  onClick={() => setActiveYear(year)}
                />
              ))}
            </div>
          </RevealBlock>

          {/* Timeline */}
          <div className="relative">
            {/* Central line - mobile left, desktop center */}
            <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-200 md:-translate-x-1/2" />

            <div className="space-y-8 md:space-y-12">
              {filteredEvents.map((event, i) => (
                <RevealBlock key={`${event.year}-${event.title}`} delay={i * 0.08}>
                  <div className="md:w-1/2 md:even:ml-auto">
                    <TimelineCard
                      {...event}
                      side={i % 2 === 0 ? "left" : "right"}
                    />
                  </div>
                </RevealBlock>
              ))}
            </div>

            {/* End cap */}
            <div className="absolute left-2 md:left-1/2 bottom-0 w-3 h-3 rounded-full bg-zinc-300 -translate-x-[5px] md:-translate-x-1/2 translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  4. COMPONENT DEMOS (tab-switched)                           */}
      {/* ============================================================ */}
      <section id="components" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-4">
              <p className="text-sm text-blue-600 font-medium uppercase tracking-wider mb-2">
                Building Blocks
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
                Component Gallery
              </h2>
              <p className="text-zinc-600 mb-8">
                Reusable elements that compose the timeline system
              </p>
            </div>
          </RevealBlock>

          {/* Tab bar */}
          <RevealBlock delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 mb-16">
              {componentTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? "bg-[#1e293b] text-white"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Buttons tab */}
          {activeTab === "buttons" && (
            <RevealBlock>
              <div className="space-y-12">
                <div>
                  <p className="text-zinc-500 text-sm font-medium mb-6">
                    Primary Actions
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-3 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
                      View Details
                    </button>
                    <button className="px-6 py-3 bg-[#10b981] text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors">
                      Complete
                    </button>
                    <button className="px-6 py-3 bg-[#f59e0b] text-white rounded-lg font-medium hover:bg-amber-600 transition-colors">
                      In Progress
                    </button>
                    <button className="px-6 py-3 bg-[#ef4444] text-white rounded-lg font-medium hover:bg-red-600 transition-colors">
                      Urgent
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm font-medium mb-6">
                    Secondary / Outline
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-3 bg-white text-zinc-700 rounded-lg font-medium border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-colors">
                      Cancel
                    </button>
                    <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium border border-blue-200 hover:bg-blue-50 transition-colors">
                      Add Event
                    </button>
                    <button className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                      <span>View Details</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm font-medium mb-6">
                    Pill Buttons (Year Navigation)
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium">
                      2024
                    </span>
                    <span className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors cursor-pointer">
                      2023
                    </span>
                    <span className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors cursor-pointer">
                      2022
                    </span>
                    <span className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors cursor-pointer">
                      2021
                    </span>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Cards tab */}
          {activeTab === "cards" && (
            <RevealBlock>
              <div className="space-y-12">
                <div>
                  <p className="text-zinc-500 text-sm font-medium mb-6">
                    Standard Timeline Card
                  </p>
                  <div className="max-w-md">
                    <div className="group p-6 bg-white rounded-xl shadow-sm border border-zinc-100 hover:shadow-md hover:border-blue-200 hover:-translate-y-1 transition-all duration-200 ease-out">
                      <time className="text-sm text-blue-600 font-bold tracking-wide mb-2 block uppercase group-hover:tracking-widest transition-all duration-200">
                        January 2024
                      </time>
                      <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                        Milestone Reached
                      </h3>
                      <p className="text-zinc-600 text-sm leading-relaxed">
                        The chronological event comes to life when interacted
                        with, illuminating its specific point in history.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm font-medium mb-6">
                    Status Cards
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 bg-white rounded-xl border-l-4 border-[#10b981] shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                        <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">
                          Completed
                        </span>
                      </div>
                      <h4 className="font-semibold text-zinc-900 mb-1">
                        Phase 1
                      </h4>
                      <p className="text-zinc-600 text-sm">
                        Research and discovery completed successfully.
                      </p>
                    </div>
                    <div className="p-5 bg-white rounded-xl border-l-4 border-[#3b82f6] shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-[#3b82f6] animate-pulse" />
                        <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                          Current
                        </span>
                      </div>
                      <h4 className="font-semibold text-zinc-900 mb-1">
                        Phase 2
                      </h4>
                      <p className="text-zinc-600 text-sm">
                        Design and prototyping in active development.
                      </p>
                    </div>
                    <div className="p-5 bg-white rounded-xl border-l-4 border-zinc-300 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-zinc-300" />
                        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                          Upcoming
                        </span>
                      </div>
                      <h4 className="font-semibold text-zinc-900 mb-1">
                        Phase 3
                      </h4>
                      <p className="text-zinc-600 text-sm">
                        Implementation and launch planned for Q2.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm font-medium mb-6">
                    Compact Event Card
                  </p>
                  <div className="space-y-3 max-w-lg">
                    {[
                      { date: "Dec 2024", event: "Year-end review", color: "#3b82f6" },
                      { date: "Oct 2024", event: "Team offsite in Berlin", color: "#10b981" },
                      { date: "Sep 2024", event: "Feature launch: Collaboration v2", color: "#f59e0b" },
                    ].map((item) => (
                      <div
                        key={item.date}
                        className="group flex items-center gap-4 p-4 bg-white rounded-lg border border-zinc-100 hover:shadow-sm hover:border-zinc-200 transition-all duration-200 ease-out"
                      >
                        <div
                          className="w-3 h-3 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-200 ease-out"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-zinc-500 font-medium min-w-[80px]">
                          {item.date}
                        </span>
                        <span className="text-sm text-zinc-900">
                          {item.event}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Inputs tab */}
          {activeTab === "inputs" && (
            <RevealBlock>
              <div className="space-y-12 max-w-lg mx-auto">
                <div>
                  <p className="text-zinc-500 text-sm font-medium mb-6">
                    Date Range Filter
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="text-sm text-zinc-500 mb-1 block">
                        From
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm text-zinc-500 mb-1 block">
                        To
                      </label>
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm font-medium mb-6">
                    Add Event Form
                  </p>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-zinc-500 mb-1 block">
                        Event Title
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                        placeholder="What happened?"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-500 mb-1 block">
                        Date
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-500 mb-1 block">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-2.5 border border-zinc-200 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors resize-none"
                        placeholder="Add details about this event..."
                      />
                    </div>
                    <div>
                      <label className="text-sm text-zinc-500 mb-2 block">
                        Category
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { label: "Milestone", color: "bg-blue-50 text-blue-600 border-blue-200" },
                          { label: "Growth", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
                          { label: "Funding", color: "bg-amber-50 text-amber-600 border-amber-200" },
                          { label: "Launch", color: "bg-red-50 text-red-600 border-red-200" },
                        ].map((cat) => (
                          <button
                            key={cat.label}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium border ${cat.color} transition-colors hover:opacity-80`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button className="w-full px-6 py-3 bg-[#3b82f6] text-white rounded-lg font-medium hover:bg-blue-600 transition-colors mt-2">
                      Add to Timeline
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm font-medium mb-6">
                    Search Events
                  </p>
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-2.5 border border-zinc-200 rounded-lg text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                      placeholder="Search timeline events..."
                    />
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Navigation tab */}
          {activeTab === "navigation" && (
            <RevealBlock>
              <div className="space-y-12">
                <div>
                  <p className="text-zinc-500 text-sm font-medium mb-6">
                    Year Navigation Bar
                  </p>
                  <nav className="flex items-center gap-2 overflow-x-auto pb-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium whitespace-nowrap">
                      2024
                    </button>
                    <button className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors whitespace-nowrap">
                      2023
                    </button>
                    <button className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors whitespace-nowrap">
                      2022
                    </button>
                    <button className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors whitespace-nowrap">
                      2021
                    </button>
                    <button className="px-4 py-2 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium hover:bg-zinc-200 transition-colors whitespace-nowrap">
                      2020
                    </button>
                  </nav>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm font-medium mb-6">
                    Breadcrumb Trail
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      Timeline
                    </span>
                    <svg
                      className="w-4 h-4 text-zinc-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      2024
                    </span>
                    <svg
                      className="w-4 h-4 text-zinc-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <span className="text-zinc-900 font-medium">
                      Series C Funding
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm font-medium mb-6">
                    Vertical Mini-Timeline Nav
                  </p>
                  <div className="relative pl-6 space-y-4 max-w-xs">
                    <div className="absolute left-2 top-1 bottom-1 w-0.5 bg-zinc-200" />
                    {["Series C", "10M Users", "Enterprise", "API Launch"].map(
                      (item, i) => (
                        <div key={item} className="relative flex items-center gap-3">
                          <div
                            className={`absolute left-[-17px] w-2.5 h-2.5 rounded-full border-2 border-white ${
                              i === 0
                                ? "bg-[#3b82f6]"
                                : "bg-zinc-300"
                            }`}
                          />
                          <span
                            className={`text-sm ${
                              i === 0
                                ? "text-zinc-900 font-medium"
                                : "text-zinc-500"
                            }`}
                          >
                            {item}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-zinc-500 text-sm font-medium mb-6">
                    Progress Indicator
                  </p>
                  <div className="max-w-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-zinc-700 font-medium">
                        Project Progress
                      </span>
                      <span className="text-sm text-blue-600 font-bold">
                        75%
                      </span>
                    </div>
                    <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#3b82f6] to-[#10b981] rounded-full transition-all duration-500"
                        style={{ width: "75%" }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-zinc-400">
                      <span>Q1 2024</span>
                      <span>Q4 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/*  5. COLOR PALETTE                                            */}
      {/* ============================================================ */}
      <section id="palette" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-16">
              <p className="text-sm text-blue-600 font-medium uppercase tracking-wider mb-2">
                Color System
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
                Timeline Palette
              </h2>
              <p className="text-zinc-600">
                Clean, professional colors anchored by slate and accented with
                semantic meaning
              </p>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {colorPalette.map((color) => (
                <div key={color.hex} className="group">
                  <div
                    className="aspect-square rounded-xl border border-zinc-200 group-hover:border-zinc-300 transition-colors flex items-end p-3"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span
                      className={`text-xs font-mono ${color.text} opacity-0 group-hover:opacity-100 transition-opacity`}
                    >
                      {color.hex}
                    </span>
                  </div>
                  <p className="text-zinc-500 text-xs mt-2 font-medium">
                    {color.name}
                  </p>
                </div>
              ))}
            </div>
          </RevealBlock>

          <RevealBlock delay={0.2}>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "Blue -- Milestones", hex: "#3b82f6", desc: "Key achievements and growth markers" },
                { label: "Emerald -- Growth", hex: "#10b981", desc: "User growth, revenue, expansion" },
                { label: "Amber -- Progress", hex: "#f59e0b", desc: "Ongoing work, in-progress states" },
                { label: "Red -- Critical", hex: "#ef4444", desc: "Launches, urgent, important dates" },
              ].map((item) => (
                <div
                  key={item.hex}
                  className="p-4 bg-white rounded-xl border border-zinc-100 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.hex }}
                    />
                    <span className="text-sm font-medium text-zinc-900">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-zinc-500 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. DESIGN RULES                                             */}
      {/* ============================================================ */}
      <section id="rules" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-16">
              <p className="text-sm text-blue-600 font-medium uppercase tracking-wider mb-2">
                Guidelines
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
                Design Rules
              </h2>
              <p className="text-zinc-600">
                Principles that keep the timeline layout consistent and readable
              </p>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <RevealBlock delay={0.1}>
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    Do
                  </h3>
                </div>
                <ul className="space-y-3">
                  {doRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#10b981] flex-shrink-0" />
                      <span className="text-zinc-600 text-sm leading-relaxed">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.2}>
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900">
                    Don&apos;t
                  </h3>
                </div>
                <ul className="space-y-3">
                  {dontRules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#ef4444] flex-shrink-0" />
                      <span className="text-zinc-600 text-sm leading-relaxed">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  7. FOOTER                                                   */}
      {/* ============================================================ */}
      <footer className="py-16 px-6 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto text-center">
          <RevealBlock>
            <p className="text-sm text-zinc-500 uppercase tracking-wider mb-3">
              Vertical Timeline Layout
            </p>
            <p className="text-zinc-400 text-sm max-w-md mx-auto">
              A linear narrative layout that threads events through time with
              clarity, rhythm, and visual connection.
            </p>
            <div className="flex justify-center gap-3 mt-6">
              {["#3b82f6", "#10b981", "#f59e0b", "#ef4444"].map((c) => (
                <div
                  key={c}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </RevealBlock>
        </div>
      </footer>
    </div>
  );
}
