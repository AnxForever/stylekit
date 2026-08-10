import { TemplateChrome } from "../_components/template-chrome";

export default function ArchiveTermsPage() {
  return (
    <TemplateChrome active="legal">
      <article className="mx-auto max-w-[880px] px-5 pb-28 pt-20 sm:px-8 lg:px-12 lg:pb-36 lg:pt-28">
        <p className="font-mono text-[10px] tracking-[0.2em] text-[#24231f]/50">TERMS / 2026</p>
        <h1 className="mt-6 font-serif text-[clamp(4rem,8vw,7rem)] leading-[0.8] tracking-[-0.07em]">The small<br /><em className="text-[#5149cf]">print.</em></h1>
        <div className="mt-16 max-w-2xl space-y-10 border-t border-[#24231f]/15 pt-8 text-sm leading-8 text-[#24231f]/70">
          <p>This starter page is a place for usage terms, licensing notes, and a plain-language explanation of how the site works. Replace it with your final terms before launch.</p>
          <section><h2 className="font-serif text-3xl text-[#24231f]">Content and reuse</h2><p className="mt-4">State which work is yours, which work is shared under a license, and how visitors may reference or reuse the material published here.</p></section>
          <section><h2 className="font-serif text-3xl text-[#24231f]">Contact</h2><p className="mt-4">Questions about usage can be sent to hello@example.com.</p></section>
        </div>
      </article>
    </TemplateChrome>
  );
}
