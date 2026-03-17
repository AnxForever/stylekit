"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Inline hooks & primitives                                          */
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
      { threshold: 0.15, ...options },
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
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const palette = [
  { name: "Zinc 900", hex: "#18181b", label: "Dark Background" },
  { name: "Zinc 50", hex: "#fafafa", label: "Light Background" },
  { name: "Blue 500", hex: "#3b82f6", label: "Primary Accent" },
  { name: "Purple 500", hex: "#8b5cf6", label: "Secondary Accent" },
  { name: "Pink 500", hex: "#ec4899", label: "Highlight" },
  { name: "Orange 500", hex: "#f97316", label: "Warning / Energy" },
];

type LayoutKey = "personal" | "portfolio" | "dashboard";

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function BentoGridShowcase() {
  const [activeLayout, setActiveLayout] = useState<LayoutKey>("personal");

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans">
      {/* ============================================================ */}
      {/* NAV                                                          */}
      {/* ============================================================ */}
      <nav className="sticky top-0 z-50 bg-white border-b border-zinc-100 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Back link */}
          <Link
            href="/styles/bento-grid"
            className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors duration-200 group"
          >
            <svg
              className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium">Back to Docs</span>
          </Link>

          {/* Pill nav links */}
          <div className="hidden md:flex items-center gap-1">
            {["Components", "Grid Guide", "Palette", "Showcase"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="px-4 py-2 rounded-full text-sm text-zinc-600 font-medium hover:bg-zinc-100 hover:text-zinc-900 transition-all duration-200"
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-zinc-500 hover:text-zinc-800 transition-colors duration-200 font-medium"
            >
              StyleKit &rarr;
            </Link>
            <button className="px-5 py-2 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.18)] transition-all duration-200">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ============================================================ */}
      {/* HERO                                                         */}
      {/* ============================================================ */}
      <section className="bg-[#fafafa] pt-24 pb-20 px-6 text-center">
        <RevealBlock>
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold tracking-widest uppercase mb-6">
            Layout System
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 leading-none tracking-tight mb-6">
            The Art of the Grid
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-zinc-500 leading-relaxed mb-4">
            Inspired by the Japanese bento box — every element has its perfect place.
            Varying card sizes create rhythm, hierarchy, and visual delight in a single glance.
          </p>
          <p className="max-w-xl mx-auto text-base text-zinc-400 leading-relaxed mb-16">
            Mix{" "}
            <code className="bg-zinc-100 px-2 py-0.5 rounded text-zinc-700 text-sm font-mono">
              col-span
            </code>{" "}
            and{" "}
            <code className="bg-zinc-100 px-2 py-0.5 rounded text-zinc-700 text-sm font-mono">
              row-span
            </code>{" "}
            to compose layouts that feel alive, not rigid.
          </p>
        </RevealBlock>

        {/* Hero live bento demo */}
        <RevealBlock delay={0.15}>
          <div className="grid grid-cols-4 gap-4 max-w-5xl mx-auto mt-4">
            {/* Large featured card */}
            <div className="col-span-2 row-span-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 flex flex-col justify-between text-white min-h-[280px] hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(59,130,246,0.30)] transition-all duration-300 ease-out cursor-pointer">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold leading-tight mb-2">Design System</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  A complete UI component library built for modern product teams.
                </p>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                <span>Explore components</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Wide card */}
            <div className="col-span-2 bg-zinc-100 rounded-3xl p-6 flex items-center gap-6 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-orange-400 flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1">Response Time</p>
                <p className="text-3xl font-bold text-zinc-900">48ms</p>
                <p className="text-sm text-zinc-500 mt-0.5">avg. global latency</p>
              </div>
            </div>

            {/* Small orange card */}
            <div className="col-span-1 bg-orange-50 border border-orange-100 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(249,115,22,0.12)] transition-all duration-300 ease-out cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-zinc-900">99.9%</p>
                <p className="text-xs text-zinc-500">uptime</p>
              </div>
            </div>

            {/* Small green card */}
            <div className="col-span-1 bg-emerald-50 border border-emerald-100 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)] transition-all duration-300 ease-out cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-zinc-900">12K+</p>
                <p className="text-xs text-zinc-500">users</p>
              </div>
            </div>
          </div>
        </RevealBlock>
      </section>

      {/* ============================================================ */}
      {/* COMPONENTS DEMO — Layout Switcher                            */}
      {/* ============================================================ */}
      <section id="components" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 text-xs font-semibold tracking-widest uppercase mb-4">
                Layout Switcher
              </span>
              <h2 className="text-4xl font-bold text-zinc-900 mb-4">One grid, infinite arrangements</h2>
              <p className="text-zinc-500 text-lg max-w-xl mx-auto">
                The same grid system adapts to any context — personal profile, portfolio, or product dashboard.
              </p>
            </div>
          </RevealBlock>

          {/* Tab switcher */}
          <RevealBlock delay={0.1}>
            <div className="flex items-center justify-center gap-2 mb-10">
              {(["personal", "portfolio", "dashboard"] as LayoutKey[]).map((layout) => (
                <button
                  key={layout}
                  onClick={() => setActiveLayout(layout)}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold capitalize transition-all duration-200 ${
                    activeLayout === layout
                      ? "bg-zinc-900 text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                  }`}
                >
                  {layout}
                </button>
              ))}
            </div>
          </RevealBlock>

          {/* Personal layout */}
          {activeLayout === "personal" && (
            <RevealBlock delay={0.05}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Photo / hero card */}
                <div className="lg:col-span-2 lg:row-span-2 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-8 flex flex-col justify-between min-h-[260px] hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(139,92,246,0.28)] transition-all duration-300 ease-out cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                  </div>
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-1">Alex Tanaka</h3>
                    <p className="text-white/70 text-sm mb-4">Product Designer & Developer</p>
                    <div className="flex gap-2 flex-wrap">
                      {["UI/UX", "React", "Figma"].map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Social: Twitter */}
                <div className="group bg-zinc-900 rounded-3xl p-6 flex items-center gap-4 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out cursor-pointer">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-800 group-hover:bg-blue-500 flex items-center justify-center transition-all duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">@alex_tanaka</p>
                    <p className="text-zinc-400 text-xs">12.4K followers</p>
                  </div>
                </div>

                {/* Social: GitHub */}
                <div className="group bg-zinc-800 rounded-3xl p-6 flex items-center gap-4 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition-all duration-300 ease-out cursor-pointer">
                  <div className="w-10 h-10 rounded-2xl bg-zinc-700 group-hover:bg-purple-500 flex items-center justify-center transition-all duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">alex-tanaka</p>
                    <p className="text-zinc-400 text-xs">420 repos</p>
                  </div>
                </div>

                {/* Skills card — wide */}
                <div className="lg:col-span-2 bg-zinc-50 border border-zinc-200 rounded-3xl p-6 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out cursor-pointer">
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Skills</p>
                  <div className="space-y-3">
                    {[
                      { name: "UI Design", pct: 92, color: "bg-blue-500" },
                      { name: "React / Next.js", pct: 88, color: "bg-purple-500" },
                      { name: "Motion Design", pct: 76, color: "bg-pink-500" },
                    ].map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="font-medium text-zinc-700">{skill.name}</span>
                          <span className="text-zinc-400">{skill.pct}%</span>
                        </div>
                        <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${skill.color} rounded-full`}
                            style={{ width: `${skill.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}

          {/* Portfolio layout */}
          {activeLayout === "portfolio" && (
            <RevealBlock delay={0.05}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Featured work — large */}
                <div className="lg:col-span-2 bg-gradient-to-br from-zinc-900 to-zinc-700 rounded-3xl p-8 flex flex-col justify-between min-h-[260px] hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.22)] transition-all duration-300 ease-out cursor-pointer">
                  <div className="w-full h-28 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl border border-white/10 mb-4 flex items-center justify-center">
                    <span className="text-white/40 text-sm">Project Preview</span>
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400 uppercase tracking-widest">Featured Work</span>
                    <h3 className="text-xl font-bold text-white mt-1">Lunar Dashboard</h3>
                    <p className="text-zinc-400 text-sm mt-1">Analytics platform for SaaS teams</p>
                  </div>
                </div>

                {/* Side card */}
                <div className="bg-blue-50 rounded-3xl p-6 flex flex-col justify-between min-h-[260px] hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(59,130,246,0.14)] transition-all duration-300 ease-out cursor-pointer">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-blue-400 uppercase tracking-widest mb-1">Mobile App</p>
                    <h3 className="text-lg font-bold text-zinc-900">Kira Finance</h3>
                    <p className="text-zinc-500 text-sm">Personal budgeting with ML insights</p>
                  </div>
                </div>

                {/* Three equal cards */}
                {[
                  { title: "Brand System", color: "from-pink-400 to-orange-400", tag: "Branding" },
                  { title: "E-commerce UI", color: "from-emerald-400 to-teal-500", tag: "Web Design" },
                  { title: "Motion Pack", color: "from-violet-500 to-purple-600", tag: "Animation" },
                ].map((item) => (
                  <div
                    key={item.title}
                    className={`bg-gradient-to-br ${item.color} rounded-3xl p-6 flex flex-col justify-between min-h-[140px] hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.14)] transition-all duration-300 ease-out cursor-pointer`}
                  >
                    <span className="text-xs text-white/70 uppercase tracking-widest">{item.tag}</span>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  </div>
                ))}
              </div>
            </RevealBlock>
          )}

          {/* Dashboard layout */}
          {activeLayout === "dashboard" && (
            <RevealBlock delay={0.05}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Stat cards */}
                {[
                  { label: "Revenue", value: "$84.2K", change: "+14%", up: true, color: "bg-blue-50 border-blue-100", text: "text-blue-600" },
                  { label: "Users", value: "4,821", change: "+9%", up: true, color: "bg-purple-50 border-purple-100", text: "text-purple-600" },
                  { label: "Orders", value: "1,340", change: "-3%", up: false, color: "bg-pink-50 border-pink-100", text: "text-pink-600" },
                  { label: "Churn", value: "2.4%", change: "-0.8%", up: false, color: "bg-orange-50 border-orange-100", text: "text-orange-600" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={`${stat.color} border rounded-3xl p-5 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out cursor-pointer`}
                  >
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-zinc-900 mb-1">{stat.value}</p>
                    <p className={`text-sm font-medium ${stat.up ? "text-emerald-600" : "text-rose-500"}`}>{stat.change} this month</p>
                  </div>
                ))}

                {/* Chart area */}
                <div className="lg:col-span-3 bg-zinc-900 rounded-3xl p-6 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.20)] transition-all duration-300 ease-out cursor-pointer">
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Revenue Overview</p>
                  <div className="flex items-end gap-2 h-28">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400 opacity-80 hover:opacity-100 transition-opacity duration-200"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-zinc-500">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>

                {/* Recent activity list */}
                <div className="bg-white border border-zinc-100 rounded-3xl p-6 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out cursor-pointer">
                  <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">Activity</p>
                  <div className="space-y-3">
                    {[
                      { label: "New signup", time: "2m ago", dot: "bg-blue-400" },
                      { label: "Order #4821", time: "14m ago", dot: "bg-emerald-400" },
                      { label: "Refund req.", time: "1h ago", dot: "bg-orange-400" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${item.dot} flex-shrink-0`} />
                        <span className="text-sm text-zinc-700 flex-1">{item.label}</span>
                        <span className="text-xs text-zinc-400">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* WIDGET INTERACTIONS DEMO                                     */}
      {/* ============================================================ */}
      <section className="py-24 px-6 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-pink-50 text-pink-600 text-xs font-semibold tracking-widest uppercase mb-4">
                Widget Behaviors
              </span>
              <h2 className="text-4xl font-bold text-zinc-900 mb-4">Every card has personality</h2>
              <p className="text-zinc-500 text-lg max-w-xl mx-auto">
                Hover each widget to see its unique micro-interaction. Small details make the difference.
              </p>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Icon color flip on hover */}
            <RevealBlock delay={0.05}>
              <div className="group bg-white border border-zinc-100 rounded-3xl p-8 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out cursor-pointer">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-100 group-hover:bg-blue-500 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-600 group-hover:text-white transition-colors duration-300">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1">Pro Feature</p>
                    <h3 className="text-xl font-bold text-zinc-900 mb-2">Icon Color Flip</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                      The icon container transitions from neutral to brand blue on hover using{" "}
                      <code className="bg-zinc-100 px-1.5 py-0.5 rounded text-xs font-mono">group-hover:bg-blue-500</code>.
                    </p>
                  </div>
                </div>
                <div className="mt-6 pt-5 border-t border-zinc-100 flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-400">group</span>
                  <span className="text-zinc-200">+</span>
                  <span className="text-xs font-mono text-blue-500">group-hover:bg-blue-500</span>
                  <span className="text-zinc-200">+</span>
                  <span className="text-xs font-mono text-blue-400">group-hover:text-white</span>
                </div>
              </div>
            </RevealBlock>

            {/* Card 2: Number counter scale */}
            <RevealBlock delay={0.1}>
              <div className="group bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl p-8 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.22)] transition-all duration-300 ease-out cursor-pointer">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Scale on Hover</p>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-6xl font-black text-white group-hover:scale-110 inline-block transition-transform duration-300 origin-left">
                    2.4M
                  </span>
                  <span className="text-emerald-400 text-lg font-semibold mb-2">+18%</span>
                </div>
                <p className="text-zinc-400 text-sm">Total API calls this month</p>
                <div className="mt-6 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                </div>
              </div>
            </RevealBlock>

            {/* Card 3: Progress bar animation */}
            <RevealBlock delay={0.15}>
              <div className="group bg-orange-50 border border-orange-100 rounded-3xl p-8 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(249,115,22,0.14)] transition-all duration-300 ease-out cursor-pointer">
                <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-5">Progress Bars</p>
                <div className="space-y-4">
                  {[
                    { label: "Storage", pct: 78, barColor: "bg-orange-400" },
                    { label: "Bandwidth", pct: 54, barColor: "bg-orange-300" },
                    { label: "Compute", pct: 91, barColor: "bg-orange-500" },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-zinc-700">{bar.label}</span>
                        <span className="text-orange-500 font-semibold">{bar.pct}%</span>
                      </div>
                      <div className="h-2.5 bg-orange-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${bar.barColor} rounded-full transition-all duration-700 ease-out`}
                          style={{ width: `${bar.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* Card 4: Tag cloud with color shifts */}
            <RevealBlock delay={0.2}>
              <div className="group bg-purple-50 border border-purple-100 rounded-3xl p-8 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(139,92,246,0.14)] transition-all duration-300 ease-out cursor-pointer">
                <p className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-5">Tag Cloud</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { tag: "React", color: "bg-blue-100 text-blue-700 group-hover:bg-blue-500 group-hover:text-white" },
                    { tag: "TypeScript", color: "bg-purple-100 text-purple-700 group-hover:bg-purple-500 group-hover:text-white" },
                    { tag: "Tailwind", color: "bg-cyan-100 text-cyan-700 group-hover:bg-cyan-500 group-hover:text-white" },
                    { tag: "Next.js", color: "bg-zinc-200 text-zinc-700 group-hover:bg-zinc-900 group-hover:text-white" },
                    { tag: "Figma", color: "bg-pink-100 text-pink-700 group-hover:bg-pink-500 group-hover:text-white" },
                    { tag: "Framer", color: "bg-indigo-100 text-indigo-700 group-hover:bg-indigo-500 group-hover:text-white" },
                    { tag: "Vercel", color: "bg-orange-100 text-orange-700 group-hover:bg-orange-500 group-hover:text-white" },
                    { tag: "Prisma", color: "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-500 group-hover:text-white" },
                  ].map((item) => (
                    <span
                      key={item.tag}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium ${item.color} transition-all duration-300`}
                    >
                      {item.tag}
                    </span>
                  ))}
                </div>
                <p className="text-zinc-400 text-xs mt-5">Hover the card to see all tags shift color</p>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* GRID SIZE GUIDE                                              */}
      {/* ============================================================ */}
      <section id="grid-guide" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold tracking-widest uppercase mb-4">
                Grid Size Guide
              </span>
              <h2 className="text-4xl font-bold text-zinc-900 mb-4">Mix and match spans</h2>
              <p className="text-zinc-500 text-lg max-w-xl mx-auto">
                These are the building blocks. Combine them to create any rhythm you imagine.
              </p>
            </div>
          </RevealBlock>

          <RevealBlock delay={0.1}>
            <div className="grid grid-cols-4 gap-4">
              {/* 1x1 */}
              <div className="col-span-1 bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 flex flex-col justify-between min-h-[120px] hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(59,130,246,0.14)] transition-all duration-300 ease-out">
                <span className="text-xs font-mono text-blue-400 font-semibold">1x1</span>
                <div>
                  <p className="text-xs font-mono text-blue-600 font-semibold">col-span-1</p>
                  <p className="text-xs text-blue-400">row-span-1</p>
                </div>
              </div>

              {/* 2x1 */}
              <div className="col-span-2 bg-purple-50 border-2 border-purple-200 rounded-2xl p-5 flex flex-col justify-between min-h-[120px] hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(139,92,246,0.14)] transition-all duration-300 ease-out">
                <span className="text-xs font-mono text-purple-400 font-semibold">2x1</span>
                <div>
                  <p className="text-xs font-mono text-purple-600 font-semibold">col-span-2</p>
                  <p className="text-xs text-purple-400">row-span-1</p>
                </div>
              </div>

              {/* 1x1 */}
              <div className="col-span-1 bg-pink-50 border-2 border-pink-200 rounded-2xl p-5 flex flex-col justify-between min-h-[120px] hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(236,72,153,0.14)] transition-all duration-300 ease-out">
                <span className="text-xs font-mono text-pink-400 font-semibold">1x1</span>
                <div>
                  <p className="text-xs font-mono text-pink-600 font-semibold">col-span-1</p>
                  <p className="text-xs text-pink-400">row-span-1</p>
                </div>
              </div>

              {/* 1x2 */}
              <div className="col-span-1 row-span-2 bg-orange-50 border-2 border-orange-200 rounded-2xl p-5 flex flex-col justify-between min-h-[260px] hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(249,115,22,0.14)] transition-all duration-300 ease-out">
                <span className="text-xs font-mono text-orange-400 font-semibold">1x2</span>
                <div>
                  <p className="text-xs font-mono text-orange-600 font-semibold">col-span-1</p>
                  <p className="text-xs text-orange-400">row-span-2</p>
                </div>
              </div>

              {/* 3x1 */}
              <div className="col-span-3 bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 flex flex-col justify-between min-h-[120px] hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(16,185,129,0.14)] transition-all duration-300 ease-out">
                <span className="text-xs font-mono text-emerald-400 font-semibold">3x1</span>
                <div>
                  <p className="text-xs font-mono text-emerald-600 font-semibold">col-span-3</p>
                  <p className="text-xs text-emerald-400">row-span-1</p>
                </div>
              </div>

              {/* 2x2 */}
              <div className="col-span-2 row-span-2 bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-transparent rounded-2xl p-5 flex flex-col justify-between min-h-[260px] hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(139,92,246,0.28)] transition-all duration-300 ease-out">
                <span className="text-xs font-mono text-white/60 font-semibold">2x2</span>
                <div>
                  <p className="text-xs font-mono text-white font-bold text-lg">col-span-2</p>
                  <p className="text-xs text-white/60">row-span-2</p>
                  <p className="text-white/50 text-xs mt-2">The hero card. Always the anchor of your layout.</p>
                </div>
              </div>

              {/* 1x1 */}
              <div className="col-span-1 bg-zinc-100 border-2 border-zinc-200 rounded-2xl p-5 flex flex-col justify-between min-h-[120px] hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out">
                <span className="text-xs font-mono text-zinc-400 font-semibold">1x1</span>
                <div>
                  <p className="text-xs font-mono text-zinc-600 font-semibold">col-span-1</p>
                  <p className="text-xs text-zinc-400">row-span-1</p>
                </div>
              </div>

              {/* 1x1 */}
              <div className="col-span-1 bg-violet-50 border-2 border-violet-200 rounded-2xl p-5 flex flex-col justify-between min-h-[120px] hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)] transition-all duration-300 ease-out">
                <span className="text-xs font-mono text-violet-400 font-semibold">1x1</span>
                <div>
                  <p className="text-xs font-mono text-violet-600 font-semibold">col-span-1</p>
                  <p className="text-xs text-violet-400">row-span-1</p>
                </div>
              </div>

              {/* 4x1 */}
              <div className="col-span-4 bg-zinc-900 border-2 border-transparent rounded-2xl p-5 flex flex-col justify-between min-h-[100px] hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.20)] transition-all duration-300 ease-out">
                <span className="text-xs font-mono text-zinc-500 font-semibold">4x1</span>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-mono text-white font-semibold">col-span-4</p>
                  <p className="text-xs text-zinc-400">Full-width — great for stats, banners, or CTAs</p>
                </div>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      {/* ============================================================ */}
      {/* COLOR SYSTEM                                                 */}
      {/* ============================================================ */}
      <section id="palette" className="py-24 px-6 bg-[#fafafa]">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-orange-600 text-xs font-semibold tracking-widest uppercase mb-4">
                Color System
              </span>
              <h2 className="text-4xl font-bold text-zinc-900 mb-4">Purposeful palette</h2>
              <p className="text-zinc-500 text-lg max-w-xl mx-auto">
                Each color carries meaning. Use them consistently to build visual hierarchy across your grid.
              </p>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {palette.map((color, i) => (
              <RevealBlock key={color.hex} delay={i * 0.06}>
                <div
                  className="rounded-3xl p-6 flex flex-col gap-4 hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-out cursor-pointer"
                  style={{
                    background: color.hex,
                    boxShadow: `0 8px 30px ${color.hex}40`,
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="w-10 h-10 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.35)" }}
                    />
                    <span
                      className="text-xs font-mono px-2 py-1 rounded-lg font-semibold"
                      style={{
                        background: "rgba(255,255,255,0.20)",
                        color: color.hex === "#fafafa" ? "#18181b" : "white",
                      }}
                    >
                      {color.hex}
                    </span>
                  </div>
                  <div>
                    <p
                      className="font-bold text-base"
                      style={{ color: color.hex === "#fafafa" ? "#18181b" : "white" }}
                    >
                      {color.name}
                    </p>
                    <p
                      className="text-xs mt-0.5"
                      style={{ color: color.hex === "#fafafa" ? "#71717a" : "rgba(255,255,255,0.65)" }}
                    >
                      {color.label}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* DO / DON'T SECTION                                           */}
      {/* ============================================================ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-zinc-100 text-zinc-600 text-xs font-semibold tracking-widest uppercase mb-4">
                Best Practices
              </span>
              <h2 className="text-4xl font-bold text-zinc-900 mb-4">Do this. Not that.</h2>
              <p className="text-zinc-500 text-lg max-w-xl mx-auto">
                The difference between a bento grid that feels polished and one that falls flat.
              </p>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* DO column */}
            <RevealBlock delay={0.08}>
              <div className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-emerald-900">Do</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Vary card sizes", desc: "Use col-span-2, col-span-3, and row-span-2 to create natural hierarchy." },
                    { title: "Consistent gap", desc: "Use gap-4 or gap-6 uniformly — never mix gap sizes in the same grid." },
                    { title: "rounded-2xl or larger", desc: "Soft corners signal approachability and fit the iOS-inspired aesthetic." },
                    { title: "Hover lift effect", desc: "translate-y-1 + scale-[1.01] on every card gives a tactile, widget feel." },
                    { title: "Soft shadows", desc: "rgba(0,0,0,0.08) style — never hard drop-shadows that feel harsh." },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-zinc-800 text-sm">{item.title}</p>
                        <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>

            {/* DON'T column */}
            <RevealBlock delay={0.12}>
              <div className="rounded-3xl border-2 border-rose-200 bg-rose-50 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-rose-900">Don't</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "All same-size cards", desc: "A grid of identical tiles is a table, not a bento. Break the monotony." },
                    { title: "Inconsistent gap", desc: "Mixing gap-2 and gap-8 in one layout destroys visual coherence." },
                    { title: "Sharp corners (rounded-none)", desc: "Hard corners feel cold and dated. Always use at least rounded-xl." },
                    { title: "No hover state", desc: "Static cards feel dead. Every widget should respond to user intent." },
                    { title: "Hard box shadows", desc: "box-shadow: 0 4px 6px black looks heavy. Keep shadows light and warm." },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-zinc-800 text-sm">{item.title}</p>
                        <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* REAL-WORLD SHOWCASE — Fictional product: "Lumio"            */}
      {/* ============================================================ */}
      <section id="showcase" className="py-24 px-6 bg-[#18181b]">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="text-center mb-14">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-zinc-300 text-xs font-semibold tracking-widest uppercase mb-4">
                Real-World Example
              </span>
              <h2 className="text-4xl font-bold text-white mb-4">Meet Lumio</h2>
              <p className="text-zinc-400 text-lg max-w-xl mx-auto">
                A fictional SaaS product landing page, built entirely with bento grid principles.
                Eight cards. One unified layout. Zero compromise.
              </p>
            </div>
          </RevealBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Hero brand card — 2x2 */}
            <RevealBlock delay={0.04} className="lg:col-span-2 lg:row-span-2">
              <div className="h-full bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 rounded-3xl p-10 flex flex-col justify-between min-h-[320px] hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_40px_rgba(59,130,246,0.35)] transition-all duration-300 ease-out cursor-pointer">
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                      </svg>
                    </div>
                    <span className="text-white font-bold text-xl tracking-tight">Lumio</span>
                  </div>
                  <h2 className="text-3xl font-black text-white leading-tight mb-4">
                    Illuminate your workflow. Ship faster.
                  </h2>
                  <p className="text-white/65 text-sm leading-relaxed max-w-xs">
                    Lumio brings together your team, tools, and insights in one beautiful, intelligent workspace.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-6 py-2.5 rounded-full bg-white text-blue-600 text-sm font-bold hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(255,255,255,0.25)] transition-all duration-200">
                    Start free
                  </button>
                  <button className="px-6 py-2.5 rounded-full bg-white/15 text-white text-sm font-medium hover:bg-white/25 transition-all duration-200">
                    Watch demo
                  </button>
                </div>
              </div>
            </RevealBlock>

            {/* Card 2: Stat — users */}
            <RevealBlock delay={0.08}>
              <div className="bg-zinc-800 rounded-3xl p-6 flex flex-col justify-between min-h-[150px] hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.30)] transition-all duration-300 ease-out cursor-pointer">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Active users</p>
                <div>
                  <p className="text-4xl font-black text-white">48K</p>
                  <p className="text-emerald-400 text-sm font-medium mt-1">+22% this month</p>
                </div>
              </div>
            </RevealBlock>

            {/* Card 3: Stat — NPS */}
            <RevealBlock delay={0.1}>
              <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-6 flex flex-col justify-between min-h-[150px] hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(236,72,153,0.30)] transition-all duration-300 ease-out cursor-pointer">
                <p className="text-xs font-semibold text-white/60 uppercase tracking-widest">NPS Score</p>
                <div>
                  <p className="text-4xl font-black text-white">72</p>
                  <p className="text-white/65 text-sm mt-1">World-class product love</p>
                </div>
              </div>
            </RevealBlock>

            {/* Card 4: Integrations wide */}
            <RevealBlock delay={0.12} className="lg:col-span-2">
              <div className="group bg-zinc-800/60 border border-zinc-700 rounded-3xl p-6 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out cursor-pointer">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4">Integrations</p>
                <div className="flex items-center gap-3 flex-wrap">
                  {[
                    { name: "Slack", color: "bg-purple-500" },
                    { name: "GitHub", color: "bg-zinc-600" },
                    { name: "Linear", color: "bg-blue-600" },
                    { name: "Notion", color: "bg-zinc-700" },
                    { name: "Figma", color: "bg-pink-500" },
                    { name: "+80 more", color: "bg-zinc-600/50" },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className={`px-3 py-1.5 rounded-full ${item.color} text-white text-xs font-semibold group-hover:-translate-y-0.5 transition-transform duration-300`}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
                <p className="text-zinc-500 text-sm mt-4 leading-relaxed">
                  Connect every tool your team already uses. No re-learning required.
                </p>
              </div>
            </RevealBlock>

            {/* Card 5: Feature — AI */}
            <RevealBlock delay={0.14}>
              <div className="group bg-gradient-to-br from-violet-600 to-purple-700 rounded-3xl p-6 min-h-[200px] flex flex-col justify-between hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(139,92,246,0.32)] transition-all duration-300 ease-out cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-white/20 group-hover:bg-white/30 flex items-center justify-center transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M12 2a10 10 0 110 20A10 10 0 0112 2z" />
                    <path d="M12 8v4l3 3" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">AI Summaries</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Every meeting, document, and thread — summarized automatically.
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Card 6: Feature — Security */}
            <RevealBlock delay={0.16}>
              <div className="group bg-zinc-800 border border-zinc-700 rounded-3xl p-6 min-h-[200px] flex flex-col justify-between hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-emerald-900/40 group-hover:bg-emerald-500 flex items-center justify-center transition-all duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400 group-hover:text-white transition-colors duration-300">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">SOC 2 Ready</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Enterprise-grade security, compliance built-in from day one.
                  </p>
                </div>
              </div>
            </RevealBlock>

            {/* Card 7: Feature — Speed — wide */}
            <RevealBlock delay={0.18} className="lg:col-span-2">
              <div className="group bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-7 flex items-center gap-6 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(249,115,22,0.32)] transition-all duration-300 ease-out cursor-pointer">
                <div className="w-16 h-16 rounded-2xl bg-white/20 group-hover:bg-white/30 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl mb-1">Blazing Fast</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Sub-100ms global response times. Edge-cached across 32 regions worldwide. Your team never waits.
                  </p>
                </div>
                <div className="ml-auto text-right flex-shrink-0">
                  <p className="text-white font-black text-3xl">32</p>
                  <p className="text-white/60 text-xs">edge regions</p>
                </div>
              </div>
            </RevealBlock>

            {/* Card 8: Social proof — full width */}
            <RevealBlock delay={0.20} className="lg:col-span-4">
              <div className="bg-zinc-800/40 border border-zinc-700/60 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.20)] transition-all duration-300 ease-out cursor-pointer">
                <div className="flex items-center gap-1 flex-shrink-0">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="#f97316" stroke="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-zinc-200 text-base leading-relaxed flex-1 italic">
                  "Lumio transformed how our team collaborates. We shipped 3x faster in the first month.
                  The bento-style dashboard gives everyone exactly what they need, nothing more."
                </blockquote>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    MK
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Maya Kim</p>
                    <p className="text-zinc-400 text-xs">CTO, Veritas Labs</p>
                  </div>
                </div>
              </div>
            </RevealBlock>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER                                                       */}
      {/* ============================================================ */}
      <footer className="bg-white border-t border-zinc-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealBlock>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white" opacity="0.9" />
                      <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity="0.6" />
                      <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity="0.6" />
                      <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white" opacity="0.9" />
                    </svg>
                  </div>
                  <span className="font-bold text-zinc-900 text-lg tracking-tight">Bento Grid</span>
                </div>
                <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">
                  A layout system inspired by the Japanese art of the bento box.
                  Every element in its perfect place.
                </p>
              </div>

              {/* Links */}
              <div className="flex gap-12">
                <div>
                  <p className="text-zinc-900 font-semibold text-sm mb-3">System</p>
                  <div className="space-y-2">
                    {["Grid Guide", "Components", "Palette", "Showcase"].map((link) => (
                      <a
                        key={link}
                        href={`#${link.toLowerCase().replace(" ", "-")}`}
                        className="block text-zinc-500 text-sm hover:text-zinc-900 transition-colors duration-200"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-zinc-900 font-semibold text-sm mb-3">StyleKit</p>
                  <div className="space-y-2">
                    {["All Styles", "Documentation", "Contributing", "GitHub"].map((link) => (
                      <a
                        key={link}
                        href="#"
                        className="block text-zinc-500 text-sm hover:text-zinc-900 transition-colors duration-200"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3">
                <button className="px-7 py-3 rounded-full bg-zinc-900 text-white text-sm font-semibold hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.18)] transition-all duration-200">
                  Start building
                </button>
                <Link
                  href="/"
                  className="text-center text-sm text-zinc-400 hover:text-zinc-700 transition-colors duration-200"
                >
                  Back to StyleKit
                </Link>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-zinc-400 text-sm">
                &copy; 2024 StyleKit. Built with love and lots of{" "}
                <code className="font-mono text-zinc-500 text-xs bg-zinc-100 px-1.5 py-0.5 rounded">gap-4</code>.
              </p>
              <div className="flex items-center gap-1 text-zinc-400 text-xs">
                <span>Made with</span>
                <span className="text-pink-400 font-bold mx-0.5">Bento Grid</span>
                <span>+ Tailwind CSS</span>
              </div>
            </div>
          </RevealBlock>
        </div>
      </footer>
    </div>
  );
}
