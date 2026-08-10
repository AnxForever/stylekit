import { TemplateChrome } from "../_components/template-chrome";

export default function ArchivePrivacyPage() {
  return (
    <TemplateChrome active="legal">
      <article className="mx-auto max-w-[880px] px-5 pb-28 pt-20 sm:px-8 lg:px-12 lg:pb-36 lg:pt-28">
        <p className="font-mono text-[10px] tracking-[0.2em] text-[#24231f]/50">PRIVACY / 2026</p>
        <h1 className="mt-6 font-serif text-[clamp(4rem,8vw,7rem)] leading-[0.8] tracking-[-0.07em]">A quiet<br /><em className="text-[#5149cf]">promise.</em></h1>
        <div className="mt-16 max-w-2xl space-y-10 border-t border-[#24231f]/15 pt-8 text-sm leading-8 text-[#24231f]/70">
          <p>This starter page explains what information this personal archive may receive. Replace the placeholder language with your actual policy before publishing.</p>
          <section><h2 className="font-serif text-3xl text-[#24231f]">What is collected</h2><p className="mt-4">Only information you choose to send through the contact form or direct email is intended to be collected. Analytics and third-party services should be listed here if you add them.</p></section>
          <section><h2 className="font-serif text-3xl text-[#24231f]">Questions</h2><p className="mt-4">For questions about this page, write to hello@example.com.</p></section>
        </div>
      </article>
    </TemplateChrome>
  );
}
