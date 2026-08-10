import { Github, Mail } from "lucide-react";

import { ContactForm } from "../_components/contact-form";
import { TemplateChrome } from "../_components/template-chrome";
import { ARCHIVE_SITE } from "../_data";

export default function ArchiveContactPage() {
  return (
    <TemplateChrome active="contact">
      <section className="mx-auto max-w-[1240px] px-5 pb-28 pt-20 sm:px-8 lg:px-12 lg:pb-36 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-end lg:gap-20">
          <div><p className="font-mono text-[10px] tracking-[0.2em] text-[#24231f]/50">04 / OPEN CHANNEL</p><h1 className="mt-6 font-serif text-[clamp(4.5rem,9vw,8.5rem)] leading-[0.78] tracking-[-0.075em]">Leave<br /><em className="text-[#5149cf]">a note.</em></h1></div>
          <p className="max-w-md text-base leading-8 text-[#24231f]/62">A contact page should feel like an invitation, not a checkout flow. Tell me what you are making, what is unclear, or what you want to explore next.</p>
        </div>
        <div className="mt-20 grid gap-12 lg:grid-cols-[0.62fr_0.38fr] lg:items-start"><ContactForm /><aside className="border-t border-[#24231f]/15 pt-5"><p className="font-mono text-[10px] tracking-[0.18em] text-[#24231f]/45">DIRECT / IF YOU PREFER</p><a href={`mailto:${ARCHIVE_SITE.email}`} className="mt-6 flex items-center gap-3 text-sm text-[#24231f] no-underline"><Mail className="h-4 w-4" /> {ARCHIVE_SITE.email}</a><a href={ARCHIVE_SITE.socials.github} className="mt-4 flex items-center gap-3 text-sm text-[#24231f] no-underline"><Github className="h-4 w-4" /> github.com/yourname</a><p className="mt-12 max-w-xs text-sm leading-7 text-[#24231f]/55">Replace these placeholder links and connect the form submit handler to your preferred provider.</p></aside></div>
      </section>
    </TemplateChrome>
  );
}
