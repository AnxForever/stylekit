import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { TemplateChrome } from "../_components/template-chrome";
import { ARCHIVE_NOTES } from "../_data";

export default function ArchiveNotesPage() {
  return (
    <TemplateChrome active="notes">
      <section className="mx-auto max-w-[1240px] px-5 pb-28 pt-20 sm:px-8 lg:px-12 lg:pb-36 lg:pt-28">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#24231f]/50">02 / FIELD NOTES</p>
            <h1 className="mt-6 font-serif text-[clamp(4.5rem,9vw,8.5rem)] leading-[0.78] tracking-[-0.075em]">Things I<br /><em className="text-[#5149cf]">noticed.</em></h1>
          </div>
          <p className="max-w-md text-base leading-8 text-[#24231f]/62">Short observations about design, tools, motion, and the small decisions that make a digital space feel inhabited.</p>
        </div>

        <div className="mt-20 grid gap-x-12 gap-y-0 border-t border-[#24231f]/15 lg:grid-cols-2">
          {ARCHIVE_NOTES.map((note) => (
            <Link key={note.slug} href={`/templates/editorial-profile-archive/notes/${note.slug}`} className="group grid grid-cols-[4.5rem_minmax(0,1fr)] gap-5 border-b border-[#24231f]/15 py-8 no-underline transition-colors hover:bg-[#ebe7dc] lg:px-4">
              <span className="font-mono text-[10px] tracking-[0.12em] text-[#24231f]/45">{note.number}</span>
              <div>
                <div className="flex items-center justify-between gap-4 font-mono text-[9px] tracking-[0.14em] text-[#24231f]/45"><span>{note.date}</span><span>{note.category}</span></div>
                <h2 className="mt-5 font-serif text-4xl leading-[0.9] tracking-[-0.05em] text-[#24231f] group-hover:text-[#5149cf]">{note.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[#24231f]/60">{note.excerpt}</p>
                <span className="mt-7 inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.14em] text-[#24231f]/55">READ NOTE <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </TemplateChrome>
  );
}
