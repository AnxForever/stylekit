import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

import { TemplateAuraFrame as EditorialAuraFrame } from "../../_components/template-aura-frame";
import { ProjectVisual } from "../../_components/project-visual";
import { TemplateChrome } from "../../_components/template-chrome";
import { ARCHIVE_PROJECTS, getArchiveProject } from "../../_data";

export function generateStaticParams() {
  return ARCHIVE_PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getArchiveProject(slug);
  return project ? { title: `${project.title} — Editorial Profile Archive`, description: project.summary } : { title: "Project not found — Editorial Profile Archive" };
}

export default async function ArchiveProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getArchiveProject(slug);
  if (!project) notFound();
  const projectIndex = ARCHIVE_PROJECTS.findIndex((entry) => entry.slug === project.slug);
  const previousProject = projectIndex > 0 ? ARCHIVE_PROJECTS[projectIndex - 1] : undefined;
  const nextProject = projectIndex < ARCHIVE_PROJECTS.length - 1 ? ARCHIVE_PROJECTS[projectIndex + 1] : undefined;

  return (
    <TemplateChrome active="work">
      <article>
        <section className="mx-auto max-w-[1240px] px-5 pb-20 pt-20 sm:px-8 lg:px-12 lg:pb-28 lg:pt-28">
          <Link href="/templates/editorial-profile-archive/work" className="font-mono text-[10px] tracking-[0.16em] text-[#24231f]/50 no-underline">← BACK TO WORK</Link>
          <div className="mt-14 grid gap-12 lg:grid-cols-[0.45fr_0.55fr] lg:items-end lg:gap-20">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#24231f]/50">{project.number} / {project.category.toUpperCase()} / {project.year}</p>
              <h1 className="mt-6 font-serif text-[clamp(4rem,8vw,8rem)] leading-[0.8] tracking-[-0.07em]">{project.title}</h1>
            </div>
            <p className="max-w-lg text-base leading-8 text-[#24231f]/62">{project.description}</p>
          </div>
          <div className="mt-16"><ProjectVisual project={project} large /></div>
        </section>

        <section className="border-y border-[#24231f]/15 bg-[#ebe7dc]">
          <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-12 sm:px-8 md:grid-cols-3 lg:px-12">
            {[["ROLE", project.role], ["TOOLS", project.tools.join(" / ")], ["OUTCOME", project.outcome]].map(([label, value]) => (
              <div key={label} className="border-t border-[#24231f]/20 pt-4"><p className="font-mono text-[10px] tracking-[0.18em] text-[#24231f]/45">{label}</p><p className="mt-3 text-sm leading-7 text-[#24231f]/70">{value}</p></div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-[1000px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
          {project.sections.map((section, index) => (
            <div key={section.heading} className="border-t border-[#24231f]/15 pt-5">
              <p className="font-mono text-[10px] tracking-[0.18em] text-[#24231f]/45">0{index + 1} / OBSERVATION</p>
              <h2 className="mt-5 font-serif text-4xl leading-[0.9] tracking-[-0.05em]">{section.heading}</h2>
              <p className="mt-5 text-sm leading-8 text-[#24231f]/62">{section.body}</p>
            </div>
          ))}
        </section>

        <section className="mx-auto max-w-[760px] px-5 pb-28 sm:px-8">
          <EditorialAuraFrame accent={project.colors} label={`${project.title} closing note`}>
            <div className="bg-[#fbfaf7]/80 p-8 sm:p-12">
              <p className="font-mono text-[10px] tracking-[0.18em] text-[#24231f]/45">A NOTE FROM THE ARCHIVE</p>
              <p className="mt-6 font-serif text-4xl leading-[0.95] tracking-[-0.04em]">The work stays open when the system gives it somewhere to go.</p>
            </div>
          </EditorialAuraFrame>
        </section>

        <nav aria-label="Project navigation" className="mx-auto grid max-w-[1240px] gap-4 border-t border-[#24231f]/15 px-5 py-8 sm:grid-cols-2 sm:px-8 lg:px-12">
          {previousProject ? <Link href={`/templates/editorial-profile-archive/work/${previousProject.slug}`} className="border border-[#24231f]/15 p-5 no-underline transition-colors hover:bg-[#ebe7dc]"><span className="font-mono text-[10px] tracking-[0.16em] text-[#24231f]/45">← PREVIOUS</span><span className="mt-5 block font-serif text-2xl leading-none text-[#24231f]">{previousProject.title}</span></Link> : <span />}
          {nextProject ? <Link href={`/templates/editorial-profile-archive/work/${nextProject.slug}`} className="border border-[#24231f]/15 p-5 text-right no-underline transition-colors hover:bg-[#ebe7dc]"><span className="font-mono text-[10px] tracking-[0.16em] text-[#24231f]/45">NEXT →</span><span className="mt-5 block font-serif text-2xl leading-none text-[#24231f]">{nextProject.title}</span></Link> : <span />}
        </nav>
      </article>
    </TemplateChrome>
  );
}
