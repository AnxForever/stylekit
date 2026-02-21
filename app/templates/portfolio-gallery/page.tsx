"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Grid3X3,
  LayoutList,
  X,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Category = "Design" | "Development" | "Branding" | "Motion";
type ViewMode = "grid" | "list";
type FilterCategory = "All" | Category;

interface Project {
  id: string;
  title: string;
  category: Category;
  year: string;
  tags: string[];
  description: string;
  techStack: string[];
  color: string;
  role: string;
  client: string;
}

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Luminary Brand System",
    category: "Branding",
    year: "2026",
    tags: ["Identity", "Visual System"],
    description:
      "A comprehensive brand overhaul for a luxury wellness startup entering international markets. The system spans logo, typography, color palette, and an extensive 80-page brand guidelines document. Every touchpoint was designed to communicate calm authority and premium positioning.",
    techStack: ["Figma", "Illustrator", "After Effects"],
    color: "bg-gradient-to-br from-violet-500 to-indigo-700",
    role: "Lead Designer",
    client: "Luminary Wellness",
  },
  {
    id: "02",
    title: "Apex Finance Dashboard",
    category: "Development",
    year: "2026",
    tags: ["SaaS", "Data Viz"],
    description:
      "A full-stack financial analytics platform built for institutional investors managing multi-asset portfolios. Real-time market data, interactive charting, and a powerful filtering engine allow analysts to surface insights in seconds. Handles over 2M rows of time-series data with sub-200ms query performance.",
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Recharts"],
    color: "bg-gradient-to-br from-sky-500 to-cyan-600",
    role: "Full Stack Dev",
    client: "Apex Capital Partners",
  },
  {
    id: "03",
    title: "Neon Pulse Campaign",
    category: "Motion",
    year: "2025",
    tags: ["3D", "Motion Graphics"],
    description:
      "A kinetic brand campaign for a consumer electronics launch featuring 60-second hero films, social cut-downs, and animated display ads. The visual language leans into high-contrast neon against deep black, creating an unmistakably electric aesthetic. Delivered across 12 formats for global rollout.",
    techStack: ["Cinema 4D", "After Effects", "DaVinci Resolve"],
    color: "bg-gradient-to-br from-pink-500 to-rose-600",
    role: "Motion Director",
    client: "Neon Electronics",
  },
  {
    id: "04",
    title: "Verdant E-Commerce",
    category: "Development",
    year: "2025",
    tags: ["E-Commerce", "Headless"],
    description:
      "A headless commerce experience for an organic food brand, built on a custom storefront with edge-deployed product pages. The cart, checkout, and loyalty flows were rebuilt from scratch to reduce friction and improve conversion. Average page load time dropped from 4.2s to 0.9s after launch.",
    techStack: ["Next.js", "Shopify Storefront API", "Tailwind CSS", "Stripe"],
    color: "bg-gradient-to-br from-emerald-500 to-teal-600",
    role: "Lead Engineer",
    client: "Verdant Foods Co.",
  },
  {
    id: "05",
    title: "Solstice Editorial Design",
    category: "Design",
    year: "2025",
    tags: ["Print", "Editorial"],
    description:
      "A limited-edition annual report and companion digital experience for a global sustainability foundation. The print edition runs 128 pages with bespoke illustration and data visualization. The digital counterpart extends the narrative with interactive timelines and embedded video essays.",
    techStack: ["InDesign", "Figma", "Webflow"],
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    role: "Art Director",
    client: "Solstice Foundation",
  },
  {
    id: "06",
    title: "Phantom OS Concept",
    category: "Design",
    year: "2025",
    tags: ["UX", "Speculative Design"],
    description:
      "A speculative operating system UI concept exploring spatial computing paradigms for augmented reality headsets. The project maps out 40+ screen flows, gesture vocabularies, and context-aware layout states. Published as an open case study, it has been featured in three design publications.",
    techStack: ["Figma", "ProtoPie", "Spline"],
    color: "bg-gradient-to-br from-slate-500 to-gray-700",
    role: "UX Researcher & Designer",
    client: "Self-Initiated",
  },
  {
    id: "07",
    title: "Drift Agency Identity",
    category: "Branding",
    year: "2024",
    tags: ["Wordmark", "Motion Brand"],
    description:
      "A full identity system for an independent creative agency with studios in Berlin and Seoul. The core mark is an animated wordmark that morphs between language scripts, representing the agency's cross-cultural DNA. Delivered as a Lottie animation library alongside static brand assets.",
    techStack: ["Illustrator", "After Effects", "Bodymovin"],
    color: "bg-gradient-to-br from-fuchsia-500 to-purple-700",
    role: "Brand Strategist & Designer",
    client: "Drift Creative Agency",
  },
  {
    id: "08",
    title: "Obsidian Dev Platform",
    category: "Development",
    year: "2024",
    tags: ["Developer Tools", "API"],
    description:
      "An internal developer portal and API management platform for a fintech infrastructure company serving 300+ engineering teams. Includes API key management, usage analytics, sandboxed testing environments, and a component-driven documentation system. Reduced developer onboarding time by 65%.",
    techStack: ["React", "Node.js", "OpenAPI", "Redis"],
    color: "bg-gradient-to-br from-zinc-600 to-neutral-800",
    role: "Frontend Lead",
    client: "Obsidian Fintech",
  },
  {
    id: "09",
    title: "Aurelius Type Specimen",
    category: "Design",
    year: "2024",
    tags: ["Typography", "Micro-site"],
    description:
      "An interactive type specimen microsite for a new variable font release from an independent foundry. The site demonstrates the font's full axis range through live sliders, editorial layouts, and a custom text sandbox. Designed to feel like a magazine shoot — not a spec sheet.",
    techStack: ["Next.js", "Framer Motion", "CSS Variable Fonts"],
    color: "bg-gradient-to-br from-yellow-500 to-amber-600",
    role: "Design & Dev",
    client: "Aurelius Type Foundry",
  },
  {
    id: "10",
    title: "Vortex Product Launch Film",
    category: "Motion",
    year: "2024",
    tags: ["CGI", "Brand Film"],
    description:
      "A 90-second CGI product launch film for a next-generation smartwatch. Hyper-realistic material simulation, dramatic camera choreography, and a custom sound design were created to match the brand's premium positioning. The film premiered at a global press event and streamed to 4M viewers.",
    techStack: ["Blender", "Houdini", "After Effects", "Pro Tools"],
    color: "bg-gradient-to-br from-blue-600 to-violet-700",
    role: "Creative Director",
    client: "Vortex Technology",
  },
  {
    id: "11",
    title: "Meridian Restaurant Brand",
    category: "Branding",
    year: "2023",
    tags: ["F&B", "Packaging"],
    description:
      "Brand identity, signage system, and packaging design for a high-end tasting-menu restaurant in Manhattan. The visual language draws from modernist grid theory and mid-century Scandinavian design, rendered in a palette of deep forest green and warm off-white. Menus, packaging, and environmental graphics all designed.",
    techStack: ["Figma", "Illustrator", "Photoshop"],
    role: "Lead Designer",
    color: "bg-gradient-to-br from-green-700 to-emerald-900",
    client: "Meridian Restaurant Group",
  },
  {
    id: "12",
    title: "Cascade Motion Reel",
    category: "Motion",
    year: "2023",
    tags: ["Showreel", "Experimental"],
    description:
      "An experimental motion reel exploring the intersection of generative code, physical simulation, and hand-drawn frame animation. Each sequence uses a different production methodology to push the limits of the medium. The reel has been screened at Motionographer's MoGraph Mondays and Eyeo Festival.",
    techStack: ["TouchDesigner", "p5.js", "After Effects", "Procreate"],
    color: "bg-gradient-to-br from-red-500 to-orange-600",
    role: "Motion Artist",
    client: "Self-Initiated",
  },
];

const FILTER_CATEGORIES: FilterCategory[] = [
  "All",
  "Design",
  "Development",
  "Branding",
  "Motion",
];

// ─────────────────────────────────────────────
// Category badge color mapping
// ─────────────────────────────────────────────

const CATEGORY_COLORS: Record<Category, string> = {
  Design: "bg-violet-500/20 text-violet-300 border border-violet-500/30",
  Development: "bg-sky-500/20 text-sky-300 border border-sky-500/30",
  Branding: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  Motion: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
};

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-xs rounded-md font-medium ${CATEGORY_COLORS[category]}`}
    >
      {category}
    </span>
  );
}

function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-2xl"
    >
      {/* Color block */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
        <div
          className={`absolute inset-0 ${project.color} transition-transform duration-500 group-hover:scale-105`}
        />
        {/* Large initial */}
        <span className="absolute inset-0 flex items-center justify-center text-[7rem] font-black text-white/10 select-none leading-none">
          {project.title[0]}
        </span>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex items-center gap-2 text-white font-semibold text-sm bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            View Project
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        {/* Project number */}
        <span className="absolute top-4 left-4 text-xs font-mono text-white/40">
          {project.id}
        </span>
        {/* Year chip */}
        <span className="absolute top-4 right-4 text-xs font-mono bg-black/30 backdrop-blur-sm text-white/60 px-2 py-0.5 rounded-full border border-white/10">
          {project.year}
        </span>
      </div>

      {/* Card footer */}
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors leading-snug">
            {project.title}
          </h3>
          <div className="mt-1.5">
            <CategoryBadge category={project.category} />
          </div>
        </div>
        <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors mt-0.5 shrink-0" />
      </div>
    </button>
  );
}

function ProjectRow({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group w-full flex items-center gap-4 md:gap-6 px-4 md:px-6 py-4 rounded-xl hover:bg-white/5 transition-colors text-left border border-transparent hover:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
    >
      {/* Color swatch */}
      <div
        className={`w-10 h-10 md:w-12 md:h-12 rounded-lg shrink-0 ${project.color}`}
      />

      {/* Number */}
      <span className="hidden md:block font-mono text-xs text-white/30 w-6 shrink-0">
        {project.id}
      </span>

      {/* Title */}
      <span className="flex-1 text-sm md:text-base font-medium text-white/80 group-hover:text-white transition-colors truncate">
        {project.title}
      </span>

      {/* Category */}
      <div className="hidden sm:block shrink-0">
        <CategoryBadge category={project.category} />
      </div>

      {/* Year */}
      <span className="text-xs font-mono text-white/30 shrink-0 hidden md:block">
        {project.year}
      </span>

      {/* Arrow */}
      <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-all group-hover:translate-x-1 duration-200 shrink-0" />
    </button>
  );
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#111111] border border-white/10 shadow-2xl">
        {/* Header color block */}
        <div className={`relative aspect-video w-full ${project.color} rounded-t-2xl overflow-hidden`}>
          <span className="absolute inset-0 flex items-center justify-center text-[10rem] font-black text-white/10 select-none leading-none">
            {project.title[0]}
          </span>
          {/* Project number */}
          <span className="absolute bottom-4 left-6 font-mono text-white/40 text-sm">
            Project {project.id}
          </span>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white/70 hover:text-white hover:bg-black/70 transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Title + badge */}
          <div className="flex flex-wrap items-start gap-3 mb-5">
            <h2
              id="modal-title"
              className="text-2xl md:text-3xl font-bold text-white leading-tight"
            >
              {project.title}
            </h2>
            <CategoryBadge category={project.category} />
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-white/10">
            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-1">
                Year
              </p>
              <p className="text-sm font-medium text-white">{project.year}</p>
            </div>
            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-1">
                Client
              </p>
              <p className="text-sm font-medium text-white">{project.client}</p>
            </div>
            <div>
              <p className="text-xs text-white/30 uppercase tracking-widest mb-1">
                Role
              </p>
              <p className="text-sm font-medium text-white">{project.role}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-6">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-3">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white/70 font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <p className="text-xs text-white/30 uppercase tracking-widest mb-3">
              Keywords
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main page component
// ─────────────────────────────────────────────

export default function PortfolioGalleryTemplate() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* ───── Navigation ───── */}
      <nav className="sticky top-0 z-30 border-b border-white/10 bg-[#0d0d0d]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/templates/portfolio-gallery"
            className="text-lg font-bold tracking-wider hover:text-white/80 transition-colors"
          >
            STUDIO<span className="text-violet-400">.</span>
          </Link>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a
              href="#work"
              className="text-white/50 hover:text-white transition-colors"
            >
              Work
            </a>
            <a
              href="#"
              className="text-white/50 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-white/50 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Availability indicator */}
          <div className="flex items-center gap-2 text-xs text-white/50 border border-white/10 rounded-full px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            Available for work
          </div>
        </div>
      </nav>

      {/* ───── Hero ───── */}
      <section id="work" className="py-20 md:py-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="text-xs text-white/30 uppercase tracking-[0.25em] mb-5">
                Portfolio — Creative Direction
              </p>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none">
                Selected
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                  Works
                </span>
              </h1>
            </div>
            <div className="md:text-right max-w-sm md:pb-2">
              {/* Project count badge */}
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white/60 mb-4">
                <span className="text-violet-400 font-bold">{PROJECTS.length}</span>
                Projects
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                A curated body of work spanning brand identity, digital product
                design, full-stack engineering, and motion direction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Filter bar ───── */}
      <section className="px-4 md:px-8 pb-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm rounded-full font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-white text-black"
                    : "bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span
                    className={`ml-1.5 text-xs ${
                      activeCategory === cat ? "text-black/50" : "text-white/30"
                    }`}
                  >
                    {PROJECTS.filter((p) => p.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex gap-1 bg-white/5 rounded-lg p-1 border border-white/10 self-start sm:self-auto">
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              aria-label="List view"
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="max-w-7xl mx-auto mt-4">
          <p className="text-xs text-white/25 font-mono">
            Showing {filteredProjects.length} of {PROJECTS.length} projects
          </p>
        </div>
      </section>

      {/* ───── Project Grid / List ───── */}
      <section className="px-4 md:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          {viewMode === "grid" ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {/* List header */}
              <div className="hidden md:flex items-center gap-6 px-6 py-2 text-xs uppercase tracking-widest text-white/20 font-medium mb-2">
                <div className="w-10 md:w-12 shrink-0" />
                <span className="w-6 shrink-0">#</span>
                <span className="flex-1">Project</span>
                <span className="shrink-0 w-28 text-center">Category</span>
                <span className="w-12 text-right shrink-0">Year</span>
                <span className="w-4 shrink-0" />
              </div>
              <div className="border-t border-white/5 mb-2" />
              {filteredProjects.map((project) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          )}

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-24">
              <p className="text-white/20 text-lg">
                No projects in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ───── Project Detail Modal ───── */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* ───── Footer ───── */}
      <footer className="border-t border-white/10 py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: logo + copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm font-bold tracking-wider mb-1">
              STUDIO<span className="text-violet-400">.</span>
            </p>
            <p className="text-xs text-white/25">
              Copyright 2026. Part of{" "}
              <Link
                href="/templates"
                className="text-white/40 hover:text-violet-400 transition-colors"
              >
                StyleKit Templates
              </Link>
            </p>
          </div>

          {/* Right: social links */}
          <div className="flex gap-6">
            {(
              [
                { label: "Dribbble", href: "#" },
                { label: "Behance", href: "#" },
                { label: "Instagram", href: "#" },
              ] as const
            ).map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-sm text-white/30 hover:text-white transition-colors flex items-center gap-1 group"
              >
                {label}
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200" />
              </a>
            ))}
          </div>
        </div>
      </footer>

      <TemplateBackButton variant="dark" />
    </div>
  );
}
