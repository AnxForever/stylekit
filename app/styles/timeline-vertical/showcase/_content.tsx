"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  BookOpen,
  Feather,
  Quote,
} from "lucide-react";
import {
  ShowcaseSection,
  ColorPaletteGrid,
  type ColorItem,
} from "@/components/showcase";

// Editorial color palette
const colors: ColorItem[] = [
  { name: "Ink", hex: "#0a0a0a", bg: "bg-[#0a0a0a]" },
  { name: "Paper", hex: "#fafafa", bg: "bg-[#fafafa]", border: true },
  { name: "Accent Red", hex: "#e63946", bg: "bg-[#e63946]" },
  { name: "Warm Gray", hex: "#6b7280", bg: "bg-gray-500" },
  { name: "Cream", hex: "#f5f5dc", bg: "bg-[#f5f5dc]", border: true },
];

// Design rules
const designRules = [
  { title: "Central Line", desc: "Use pseudo-element or div for connecting line" },
  { title: "Serif Headings", desc: "font-serif for elegant, editorial typography" },
  { title: "Alternate Layout", desc: "Desktop can alternate left/right sides" },
  { title: "Mobile Stack", desc: "Single-side layout on mobile devices" },
  { title: "Red Accents", desc: "Use accent color sparingly for emphasis" },
  { title: "Generous Spacing", desc: "Ample whitespace for readability" },
];

// Publication timeline data
const publicationTimeline = [
  {
    year: "2024",
    title: "The Digital Renaissance",
    publication: "The Atlantic",
    excerpt: "How technology is reshaping creative expression in the modern age, from AI-assisted art to virtual galleries.",
    category: "Technology",
  },
  {
    year: "2023",
    title: "Voices of a Generation",
    publication: "The New Yorker",
    excerpt: "A deep dive into the cultural movements defining contemporary society and their lasting impact.",
    category: "Culture",
  },
  {
    year: "2022",
    title: "The Architecture of Memory",
    publication: "Harper's Magazine",
    excerpt: "Exploring how spaces shape our recollections and the psychology of place attachment.",
    category: "Essay",
  },
  {
    year: "2021",
    title: "Letters from Abroad",
    publication: "The Paris Review",
    excerpt: "A collection of correspondence documenting a year of wandering through European literary capitals.",
    category: "Travel",
  },
];

// Career milestones
const careerMilestones = [
  {
    period: "2022 - Present",
    role: "Senior Editor",
    organization: "The Atlantic",
    description: "Leading the culture desk, commissioning long-form pieces on art, literature, and society.",
  },
  {
    period: "2019 - 2022",
    role: "Staff Writer",
    organization: "The New Yorker",
    description: "Covering contemporary fiction and the intersection of technology and creativity.",
  },
  {
    period: "2016 - 2019",
    role: "Contributing Editor",
    organization: "Harper's Magazine",
    description: "Writing essays on architecture, urban planning, and the built environment.",
  },
];

export default function ShowcaseContent() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 px-6 py-4 bg-[#fafafa]/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/styles/timeline-vertical"
            className="flex items-center gap-2 text-gray-600 hover:text-[#0a0a0a] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Docs</span>
          </Link>
          <span className="font-serif text-xl font-semibold text-[#0a0a0a] italic">The Chronicle</span>
          <Link
            href="/styles"
            className="px-4 py-2 bg-[#0a0a0a] text-white text-sm hover:bg-gray-800 transition-colors"
          >
            All Styles
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 px-6 text-center border-b border-gray-200">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 text-sm font-medium mb-8">
            <Feather className="w-4 h-4" />
            <span className="uppercase tracking-widest text-xs">Editorial Style</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#0a0a0a] mb-6 leading-tight italic">
            Vertical Timeline
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-xl mx-auto font-serif">
            Connect events, milestones, and stories with a visual thread that guides the reader through time.
          </p>
          <div className="mt-12 w-px h-16 bg-[#e63946] mx-auto" />
        </div>
      </section>

      {/* Color Palette */}
      <ShowcaseSection
        title="Color Palette"
        subtitle="Classic editorial colors with a bold accent"
        className="py-20 px-6 bg-white border-b border-gray-200"
        titleClassName="font-serif text-3xl font-bold text-[#0a0a0a] mb-4 text-center italic"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <ColorPaletteGrid
            colors={colors}
            cardClassName="overflow-hidden"
            labelClassName="font-serif font-semibold text-sm text-[#0a0a0a]"
            hexClassName="text-xs text-gray-400 font-mono"
          />
        </div>
      </ShowcaseSection>

      {/* Publication Timeline */}
      <ShowcaseSection
        title="Selected Works"
        subtitle="A chronology of published essays and features"
        className="py-20 px-6"
        titleClassName="font-serif text-3xl font-bold text-[#0a0a0a] mb-4 text-center italic"
        subtitleClassName="text-gray-500 mb-16 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Central line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-300 md:-translate-x-1/2" />

            {/* Timeline items */}
            <div className="space-y-16">
              {publicationTimeline.map((item, i) => (
                <div key={i} className={`relative grid md:grid-cols-2 gap-8 ${i % 2 === 0 ? "" : "md:direction-rtl"}`}>
                  {/* Node */}
                  <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 bg-[#e63946] rounded-full md:-translate-x-1/2 border-4 border-[#fafafa]" />

                  {/* Content - alternating sides on desktop */}
                  <div className={`pl-8 md:pl-0 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12 md:text-left"}`}>
                    <div className={`inline-block px-3 py-1 bg-[#0a0a0a] text-white text-xs font-medium uppercase tracking-wider mb-3`}>
                      {item.category}
                    </div>
                    <time className="block text-[#e63946] font-semibold mb-2">{item.year}</time>
                    <h3 className="font-serif text-2xl font-bold text-[#0a0a0a] mb-2 italic">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 uppercase tracking-wider">{item.publication}</p>
                    <p className="text-gray-600 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className={`hidden md:block ${i % 2 === 0 ? "md:col-start-2" : "md:col-start-1 md:row-start-1"}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Quote Section */}
      <section className="py-20 px-6 bg-[#0a0a0a] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <Quote className="w-12 h-12 mx-auto mb-8 text-[#e63946]" />
          <blockquote className="font-serif text-2xl md:text-3xl italic leading-relaxed mb-8">
            &ldquo;The timeline is not merely a chronological device; it is a narrative architecture that gives shape to the formless passage of time.&rdquo;
          </blockquote>
          <cite className="text-gray-400 not-italic uppercase tracking-widest text-sm">
            - On Editorial Design
          </cite>
        </div>
      </section>

      {/* Career Timeline */}
      <ShowcaseSection
        title="Professional Journey"
        subtitle="A career in letters and editorial craft"
        className="py-20 px-6 bg-white"
        titleClassName="font-serif text-3xl font-bold text-[#0a0a0a] mb-4 text-center italic"
        subtitleClassName="text-gray-500 mb-16 text-center"
      >
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Central line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />

            {/* Timeline items */}
            <div className="space-y-8">
              {careerMilestones.map((item, i) => (
                <div key={i} className="relative pl-12">
                  {/* Node */}
                  <div className={`absolute left-2 top-2 w-5 h-5 rounded-full border-2 ${
                    i === 0 ? "bg-[#e63946] border-[#e63946]" : "bg-white border-gray-300"
                  }`} />

                  {/* Card */}
                  <div className={`p-6 border ${i === 0 ? "border-[#e63946]/30 bg-[#e63946]/5" : "border-gray-200 bg-[#fafafa]"}`}>
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-[#0a0a0a] italic">{item.role}</h3>
                        <p className="text-gray-500">{item.organization}</p>
                      </div>
                      <span className="text-sm text-gray-400 font-medium">{item.period}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ShowcaseSection>

      {/* Design Rules */}
      <ShowcaseSection
        title="Design Principles"
        subtitle="Key patterns for editorial timeline layouts"
        className="py-20 px-6 border-t border-gray-200"
        titleClassName="font-serif text-3xl font-bold text-[#0a0a0a] mb-4 text-center italic"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {designRules.map((rule, i) => (
              <div key={i} className="p-6 bg-white border border-gray-200">
                <h4 className="font-serif font-bold text-[#0a0a0a] mb-2 italic">{rule.title}</h4>
                <p className="text-sm text-gray-500">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ShowcaseSection>

      {/* Use Cases */}
      <ShowcaseSection
        title="Applications"
        subtitle="When to use Timeline layout"
        className="py-20 px-6 bg-white border-t border-gray-200"
        titleClassName="font-serif text-3xl font-bold text-[#0a0a0a] mb-4 text-center italic"
        subtitleClassName="text-gray-500 mb-10 text-center"
      >
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {[
            { icon: Briefcase, title: "Company History", desc: "Showcase milestones and growth journey" },
            { icon: GraduationCap, title: "Resume / CV", desc: "Display career progression and education" },
            { icon: MapPin, title: "Project Progress", desc: "Track phases and deliverables" },
            { icon: Award, title: "Achievements", desc: "Highlight awards and accomplishments" },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-6 border border-gray-200">
              <div className="w-12 h-12 bg-[#0a0a0a] flex items-center justify-center shrink-0">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-[#0a0a0a] mb-1 italic">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-px h-8 bg-[#e63946] mx-auto mb-6" />
          <p className="text-gray-400 text-sm">
            Vertical Timeline Showcase{" "}
            <Link href="/" className="text-[#0a0a0a] hover:underline">
              StyleKit
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
