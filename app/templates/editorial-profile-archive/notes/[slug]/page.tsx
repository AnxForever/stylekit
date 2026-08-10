import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { TemplateChrome } from "../../_components/template-chrome";
import { ARCHIVE_NOTES, getArchiveNote } from "../../_data";

export function generateStaticParams() {
  return ARCHIVE_NOTES.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = getArchiveNote(slug);
  return note ? { title: `${note.title} — Notes`, description: note.excerpt } : { title: "Note not found — Editorial Profile Archive" };
}

export default async function ArchiveNotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getArchiveNote(slug);
  if (!note) notFound();
  const noteIndex = ARCHIVE_NOTES.findIndex((entry) => entry.slug === note.slug);
  const previousNote = noteIndex > 0 ? ARCHIVE_NOTES[noteIndex - 1] : undefined;
  const nextNote = noteIndex < ARCHIVE_NOTES.length - 1 ? ARCHIVE_NOTES[noteIndex + 1] : undefined;

  return (
    <TemplateChrome active="notes">
      <article className="mx-auto max-w-[900px] px-5 pb-32 pt-20 sm:px-8 lg:pt-28">
        <Link href="/templates/editorial-profile-archive/notes" className="font-mono text-[10px] tracking-[0.16em] text-[#24231f]/50 no-underline">← BACK TO NOTES</Link>
        <header className="mt-16 border-b border-[#24231f]/15 pb-12">
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] tracking-[0.16em] text-[#24231f]/45"><span>{note.number}</span><span>{note.date}</span><span>{note.category}</span></div>
          <h1 className="mt-8 max-w-3xl font-serif text-[clamp(4rem,9vw,8rem)] leading-[0.78] tracking-[-0.075em]">{note.title}</h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-[#24231f]/62">{note.excerpt}</p>
        </header>
        <div className="grid gap-12 pt-14 md:grid-cols-[8rem_minmax(0,1fr)]">
          <span className="font-mono text-[10px] tracking-[0.16em] text-[#24231f]/45">READING<br />/ 04 MIN</span>
          <div className="max-w-2xl text-base leading-9 text-[#24231f]/75"><p>{note.body}</p><p className="mt-8">The archive is allowed to stay unfinished. It is a place to return to, not a final answer. Each note is a small marker for the next decision.</p></div>
        </div>
        <nav aria-label="Note navigation" className="mt-20 grid gap-4 border-t border-[#24231f]/15 pt-8 sm:grid-cols-2">
          {previousNote ? <Link href={`/templates/editorial-profile-archive/notes/${previousNote.slug}`} className="border border-[#24231f]/15 p-5 no-underline transition-colors hover:bg-[#ebe7dc]"><span className="font-mono text-[10px] tracking-[0.16em] text-[#24231f]/45">← PREVIOUS NOTE</span><span className="mt-5 block font-serif text-2xl leading-none text-[#24231f]">{previousNote.title}</span></Link> : <span />}
          {nextNote ? <Link href={`/templates/editorial-profile-archive/notes/${nextNote.slug}`} className="border border-[#24231f]/15 p-5 text-right no-underline transition-colors hover:bg-[#ebe7dc]"><span className="font-mono text-[10px] tracking-[0.16em] text-[#24231f]/45">NEXT NOTE →</span><span className="mt-5 block font-serif text-2xl leading-none text-[#24231f]">{nextNote.title}</span></Link> : <span />}
        </nav>
      </article>
    </TemplateChrome>
  );
}
