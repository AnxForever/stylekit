import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { getLegalPageCopy, type LegalDocument } from "@/lib/legal/content";
import type { Locale } from "@/lib/i18n/translations";

export function LegalPage({
  document,
  locale,
}: {
  document: LegalDocument;
  locale: Locale;
}) {
  const copy = getLegalPageCopy(document, locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-4xl px-6 py-16 md:px-12 md:py-24">
            <p className="mb-4 text-xs uppercase tracking-widest text-muted">
              {copy.eyebrow}
            </p>
            <h1 className="mb-6 text-4xl leading-tight md:text-5xl">
              {copy.title}
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted">
              {copy.intro}
            </p>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto grid max-w-4xl gap-8 px-6 py-12 md:px-12 md:py-16">
            {copy.sections.map((section) => (
              <article key={section.title}>
                <h2 className="mb-3 text-2xl">{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mb-3 leading-relaxed text-muted last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
            <article>
              <h2 className="mb-3 text-2xl">{copy.contactTitle}</h2>
              <p className="leading-relaxed text-muted">
                {copy.contactText}{" "}
                <LocalizedLink
                  href="/contact"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  {copy.contactLink}
                </LocalizedLink>
                {document === "terms" ? "." : ""}
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
