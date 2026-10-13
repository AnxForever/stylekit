import type { ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { FIELD_NOTES } from "../../_data";
import styles from "../../_components/field-manual.module.css";

export function generateStaticParams() {
  return FIELD_NOTES.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}, parent: ResolvingMetadata) {
  const { slug } = await params;
  const note = FIELD_NOTES.find((entry) => entry.slug === slug);
  const inherited = await parent;
  return note
    ? {
        title: `${note.title} — Field Manual`,
        description: note.excerpt,
        robots: { index: false, follow: true },
        openGraph: { ...inherited.openGraph, title: `${note.title} — Field Manual`, description: note.excerpt },
        twitter: { ...inherited.twitter, title: `${note.title} — Field Manual`, description: note.excerpt },
      }
    : { title: "Note not found — Field Manual" };
}

export default async function FieldNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const noteIndex = FIELD_NOTES.findIndex((entry) => entry.slug === slug);
  const note = FIELD_NOTES[noteIndex];
  if (!note) notFound();

  const previous = noteIndex > 0 ? FIELD_NOTES[noteIndex - 1] : undefined;
  const next = noteIndex < FIELD_NOTES.length - 1
    ? FIELD_NOTES[noteIndex + 1]
    : undefined;

  return (
    <main className={`${styles.rail} ${styles.articlePage}`}>
      <Link className={styles.backLink} href="/templates/technical-profile#notes">
        <ArrowLeft aria-hidden="true" size={14} /> Back to field notes
      </Link>
      <article>
        <header className={`${styles.articleHeader} ${styles.ruleTop}`}>
          <div className={styles.articleMeta}>
            <span>{note.category}</span>
            <span>{note.date}</span>
            <span>{note.readingTime} read</span>
          </div>
          <h1 className={styles.articleTitle}>{note.title}</h1>
          <p className={styles.articleExcerpt}>{note.excerpt}</p>
        </header>
        <div className={styles.articleBody}>
          <aside className={styles.articleAside}>
            <span>Field Manual</span>
            <span>Note {String(noteIndex + 1).padStart(2, "0")}</span>
          </aside>
          <div className={styles.articleText}>
            {note.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <blockquote>{note.takeaway}</blockquote>
          </div>
        </div>
      </article>
      <nav className={styles.articleNavigation} aria-label="Other field notes">
        {previous ? (
          <Link href={`/templates/technical-profile/notes/${previous.slug}`}>
            <span><ArrowLeft aria-hidden="true" size={14} /> Previous note</span>
            <strong>{previous.title}</strong>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/templates/technical-profile/notes/${next.slug}`}>
            <span>Next note <ArrowUpRight aria-hidden="true" size={14} /></span>
            <strong>{next.title}</strong>
          </Link>
        ) : <span />}
      </nav>
    </main>
  );
}
