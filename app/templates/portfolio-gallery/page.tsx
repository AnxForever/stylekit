"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Grid3X3, LayoutList, X } from "lucide-react";
import { TemplateBackButton } from "@/components/templates/template-back-button";

const categories = ["All", "Branding", "Web Design", "Mobile", "Illustration", "3D"];

const projects = [
  { title: "Aurora Brand System", category: "Branding", color: "bg-gradient-to-br from-purple-400 to-pink-500", year: "2025" },
  { title: "Fintech Dashboard", category: "Web Design", color: "bg-gradient-to-br from-blue-400 to-cyan-500", year: "2025" },
  { title: "Travel App UI", category: "Mobile", color: "bg-gradient-to-br from-emerald-400 to-teal-500", year: "2025" },
  { title: "Geometric Series", category: "Illustration", color: "bg-gradient-to-br from-orange-400 to-red-500", year: "2024" },
  { title: "Product Renders", category: "3D", color: "bg-gradient-to-br from-violet-400 to-indigo-500", year: "2024" },
  { title: "Eco Platform", category: "Web Design", color: "bg-gradient-to-br from-green-400 to-emerald-500", year: "2024" },
  { title: "Music App", category: "Mobile", color: "bg-gradient-to-br from-rose-400 to-pink-500", year: "2024" },
  { title: "Studio Identity", category: "Branding", color: "bg-gradient-to-br from-amber-400 to-orange-500", year: "2023" },
  { title: "Abstract Shapes", category: "Illustration", color: "bg-gradient-to-br from-sky-400 to-blue-500", year: "2023" },
];

export default function PortfolioGalleryTemplate() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [gridView, setGridView] = useState(true);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const filtered = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  const selected = projects.find((p) => p.title === selectedProject);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex items-center justify-between">
          <Link href="/templates/portfolio-gallery" className="text-lg font-bold tracking-wider">
            STUDIO<span className="text-violet-400">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#" className="text-white/60 hover:text-white transition-colors">Work</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">About</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-white/40 uppercase tracking-widest mb-4">Portfolio</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Selected <span className="text-violet-400">Works</span>
          </h1>
          <p className="text-lg text-white/50 max-w-xl">
            A curated collection of design projects spanning branding, digital products, and creative explorations.
          </p>
        </div>
      </section>

      {/* Filter + View Toggle */}
      <section className="px-4 md:px-8 pb-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  activeCategory === cat
                    ? "bg-white text-black"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setGridView(true)}
              className={`p-2 rounded-lg transition-colors ${gridView ? "bg-white/10" : "hover:bg-white/5"}`}
              aria-label="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridView(false)}
              className={`p-2 rounded-lg transition-colors ${!gridView ? "bg-white/10" : "hover:bg-white/5"}`}
              aria-label="List view"
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {gridView ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((project) => (
                <button
                  key={project.title}
                  onClick={() => setSelectedProject(project.title)}
                  className="group text-left"
                >
                  <div className={`aspect-[4/3] ${project.color} rounded-xl flex items-center justify-center group-hover:scale-[1.02] transition-transform`}>
                    <span className="text-white/20 text-5xl font-black">{project.title[0]}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">{project.title}</h3>
                      <p className="text-xs text-white/40">{project.category}</p>
                    </div>
                    <span className="text-xs text-white/30">{project.year}</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((project) => (
                <button
                  key={project.title}
                  onClick={() => setSelectedProject(project.title)}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${project.color} rounded-lg shrink-0`} />
                    <div className="text-left">
                      <h3 className="font-medium">{project.title}</h3>
                      <p className="text-sm text-white/40">{project.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-white/30">{project.year}</span>
                    <ExternalLink className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6">
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-3xl w-full">
            <div className={`aspect-video ${selected.color} rounded-2xl flex items-center justify-center mb-6`}>
              <span className="text-white/20 text-8xl font-black">{selected.title[0]}</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">{selected.title}</h2>
            <div className="flex items-center gap-4 text-sm text-white/50">
              <span>{selected.category}</span>
              <span>{selected.year}</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            Copyright 2025 STUDIO. Part of{" "}
            <Link href="/templates" className="text-white/50 hover:text-violet-400 transition-colors">
              StyleKit Templates
            </Link>
          </p>
          <div className="flex gap-6 text-sm text-white/30">
            <a href="#" className="hover:text-white/60">Dribbble</a>
            <a href="#" className="hover:text-white/60">Behance</a>
            <a href="#" className="hover:text-white/60">Instagram</a>
          </div>
        </div>
      </footer>
      <TemplateBackButton />
    </div>
  );
}
