"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";

import { ProjectVisual } from "../_components/project-visual";
import { TemplateChrome } from "../_components/template-chrome";
import { ARCHIVE_PROJECTS, type ArchiveCategory } from "../_data";

const FILTERS: Array<"All" | ArchiveCategory> = ["All", "Identity", "Editorial", "Digital"];

export default function ArchiveWorkPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const projects = useMemo(
    () => filter === "All" ? ARCHIVE_PROJECTS : ARCHIVE_PROJECTS.filter((project) => project.category === filter),
    [filter],
  );

  return (
    <TemplateChrome active="work">
      <section className="mx-auto max-w-[1240px] px-5 pb-28 pt-20 sm:px-8 lg:px-12 lg:pb-36 lg:pt-28">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#24231f]/50">01 / SELECTED WORK</p>
            <h1 className="mt-6 max-w-xl font-serif text-[clamp(4.5rem,9vw,8.5rem)] leading-[0.78] tracking-[-0.075em]">The things<br /><em className="text-[#5149cf]">I kept.</em></h1>
          </div>
          <p className="max-w-md text-base leading-8 text-[#24231f]/62">A small, opinionated index of identity systems, editorial experiments, and digital spaces. Each entry has a beginning, a working question, and a place to go next.</p>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-y border-[#24231f]/15 py-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
            {FILTERS.map((item) => (
              <button key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item} className={`px-3 py-2 font-mono text-[10px] tracking-[0.12em] transition-colors ${filter === item ? "bg-[#24231f] text-[#f5f2ec]" : "text-[#24231f]/55 hover:text-[#24231f]"}`}>
                {item.toUpperCase()}
              </button>
            ))}
          </div>
          <span className="font-mono text-[10px] tracking-[0.14em] text-[#24231f]/45">{projects.length.toString().padStart(2, "0")} ENTRIES</span>
        </div>

        <div className="mt-8">
          {projects.map((project) => (
            <article key={project.slug} className="group grid gap-6 border-b border-[#24231f]/15 py-8 md:grid-cols-[4rem_minmax(0,1fr)_18rem] md:items-start">
              <span className="font-mono text-[11px] tracking-[0.18em] text-[#24231f]/45">{project.number}</span>
              <div>
                <p className="mb-2 font-mono text-[10px] tracking-[0.18em] text-[#24231f]/45">{project.category.toUpperCase()} / {project.year}</p>
                <h2 className="max-w-2xl font-serif text-4xl leading-none tracking-[-0.04em] md:text-5xl">{project.title}</h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#24231f]/60">{project.summary}</p>
                <Link href={`/templates/editorial-profile-archive/work/${project.slug}`} className="mt-6 inline-flex items-center gap-2 text-xs underline decoration-[#24231f]/20 underline-offset-4 transition-colors hover:decoration-[#ef6b7a]">Open project <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
              </div>
              <Link href={`/templates/editorial-profile-archive/work/${project.slug}`} aria-label={`Open ${project.title}`} className="block transition-transform duration-500 group-hover:-translate-y-1"><ProjectVisual project={project} /></Link>
            </article>
          ))}
        </div>
      </section>
    </TemplateChrome>
  );
}
