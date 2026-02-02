"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Rocket,
  Users,
  Check,
  Star,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Timeline color palette
const colors: ColorItem[] = [
  { name: "Slate", hex: "#1e293b", bg: "bg-slate-800" },
  { name: "Light", hex: "#f8fafc", bg: "bg-slate-50", border: true },
  { name: "Blue", hex: "#3b82f6", bg: "bg-blue-500" },
  { name: "Emerald", hex: "#10b981", bg: "bg-emerald-500" },
  { name: "Amber", hex: "#f59e0b", bg: "bg-amber-500" },
];

// Design rules
const designRules = [
  { title: "Central Line", desc: "Use pseudo-element or div for connecting line" },
  { title: "Node Alignment", desc: "Dots must align perfectly with the line" },
  { title: "Alternate Layout", desc: "Desktop can alternate left/right sides" },
  { title: "Mobile Stack", desc: "Single-side layout on mobile devices" },
  { title: "Scroll Animation", desc: "Fade-in items as they enter viewport" },
  { title: "Consistent Dates", desc: "Uniform date/time format across nodes" },
];

// Timeline data
const companyTimeline = [
  {
    year: "2024",
    title: "Series B Funding",
    description: "Raised $50M to expand globally and hire 200+ team members.",
    color: "bg-blue-500",
    textColor: "text-blue-500",
    icon: Rocket,
  },
  {
    year: "2023",
    title: "1 Million Users",
    description: "Reached our first million active users milestone.",
    color: "bg-emerald-500",
    textColor: "text-emerald-500",
    icon: Users,
  },
  {
    year: "2022",
    title: "Product Launch",
    description: "Launched our flagship product to overwhelming response.",
    color: "bg-amber-500",
    textColor: "text-amber-500",
    icon: Star,
  },
  {
    year: "2021",
    title: "Company Founded",
    description: "Started with a team of 3 in a small garage office.",
    color: "bg-slate-400",
    textColor: "text-slate-500",
    icon: Briefcase,
  },
];

const careerTimeline = [
  {
    period: "2022 - Present",
    role: "Senior Product Designer",
    company: "TechCorp Inc.",
    description: "Leading design systems and mentoring junior designers.",
    skills: ["Figma", "React", "Design Systems"],
  },
  {
    period: "2020 - 2022",
    role: "Product Designer",
    company: "StartupXYZ",
    description: "Designed mobile apps and web platforms for fintech.",
    skills: ["Mobile Design", "User Research"],
  },
  {
    period: "2018 - 2020",
    role: "UI Designer",
    company: "DesignAgency",
    description: "Created visual designs for various client projects.",
    skills: ["UI Design", "Branding"],
  },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/timeline-vertical"
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Back to Docs</span>
          </Link>
          <span className="font-bold text-xl text-slate-900">Vertical Timeline</span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-slate-900 text-white rounded-full text-sm hover:bg-slate-800 transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6 text-center bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-8">
            <Calendar className="w-4 h-4" />
            <span>Chronological Storytelling</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Vertical Timeline
          </h1>
          <p className="text-xl text-slate-600">
            Connect events, milestones, and stories with a visual thread that guides the reader through time.
          </p>
        </div>
      </section>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color System"
        subtitle="Professional colors with status-based accents"
        className="py-16 px-6 bg-white"
        titleClassName="text-3xl font-bold text-slate-900 mb-4 text-center"
        subtitleClassName="text-slate-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="rounded-lg overflow-hidden shadow-sm"
            labelClassName="font-semibold text-sm text-slate-900"
            hexClassName="text-xs text-slate-500 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Company Timeline Demo */}
      <ShowcaseSection
        title="Company Journey"
        subtitle="Key milestones in our story"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-slate-900 mb-4 text-center"
        subtitleClassName="text-slate-600 mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto">
          {/* Year navigation */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {["2024", "2023", "2022", "2021"].map((year, i) => (
              <button
                key={year}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  i === 0
                    ? "bg-blue-500 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                {year}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Central line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200" />

            {/* Timeline items */}
            <div className="space-y-8">
              {companyTimeline.map((item, i) => (
                <div key={i} className="relative pl-20">
                  {/* Node */}
                  <div className={`absolute left-5 top-2 w-6 h-6 ${item.color} rounded-full border-4 border-white shadow-md flex items-center justify-center`}>
                    <item.icon className="w-3 h-3 text-white" />
                  </div>

                  {/* Card */}
                  <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <time className={`text-sm font-semibold ${item.textColor} mb-2 block`}>
                      {item.year}
                    </time>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Career Timeline Demo */}
      <ShowcaseSection
        title="Career Path"
        subtitle="Professional experience timeline"
        className="py-16 px-6 bg-white"
        titleClassName="text-3xl font-bold text-slate-900 mb-4 text-center"
        subtitleClassName="text-slate-600 mb-10 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Central line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200" />

            {/* Timeline items */}
            <div className="space-y-6">
              {careerTimeline.map((item, i) => (
                <div key={i} className="relative pl-20">
                  {/* Node */}
                  <div className={`absolute left-5 top-6 w-6 h-6 rounded-full border-4 border-white shadow-md flex items-center justify-center ${
                    i === 0 ? "bg-blue-500" : "bg-slate-300"
                  }`}>
                    <Briefcase className="w-3 h-3 text-white" />
                  </div>

                  {/* Card */}
                  <div className={`p-6 rounded-xl border transition-all ${
                    i === 0
                      ? "bg-blue-50 border-blue-200"
                      : "bg-slate-50 border-slate-200"
                  }`}>
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{item.role}</h3>
                        <p className="text-slate-600">{item.company}</p>
                      </div>
                      <span className="text-sm text-slate-500 font-medium">{item.period}</span>
                    </div>
                    <p className="text-slate-600 text-sm mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, j) => (
                        <span key={j} className="px-3 py-1 bg-white text-slate-600 text-xs font-medium rounded-full border border-slate-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Design Rules */}
      <ShowcaseSection
        title="Design Rules"
        subtitle="Key principles for Timeline layouts"
        className="py-16 px-6"
        titleClassName="text-3xl font-bold text-slate-900 mb-4 text-center"
        subtitleClassName="text-slate-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {designRules.map((rule, i) => (
              <div key={i} className="p-5 bg-white rounded-xl shadow-sm">
                <h4 className="font-semibold text-slate-900 mb-2">{rule.title}</h4>
                <p className="text-sm text-slate-600">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Use Cases */}
      <ShowcaseSection
        title="Use Cases"
        subtitle="When to use Timeline layout"
        className="py-16 px-6 bg-white"
        titleClassName="text-3xl font-bold text-slate-900 mb-4 text-center"
        subtitleClassName="text-slate-600 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            { icon: Briefcase, title: "Company History", desc: "Showcase milestones and growth journey" },
            { icon: GraduationCap, title: "Resume/CV", desc: "Display career progression and education" },
            { icon: MapPin, title: "Project Progress", desc: "Track phases and deliverables" },
            { icon: Award, title: "Achievements", desc: "Highlight awards and accomplishments" },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-5 bg-slate-50 rounded-xl">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm">
                <item.icon className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-sm">
            Vertical Timeline Showcase{" "}
            <Link href="/" className="text-slate-900 hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
