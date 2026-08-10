import { TemplateAuraFrame as EditorialAuraFrame } from "../_components/template-aura-frame";
import { TemplateButton } from "../_components/template-button";
import { TemplateChrome } from "../_components/template-chrome";
import { ARCHIVE_SITE } from "../_data";

const PRINCIPLES = [
  ["01", "Make the archive readable", "The site should show what matters, how it came to be, and where the visitor can continue."],
  ["02", "Let one signal lead", "A limited accent palette gives decisions more weight than a surface covered in decoration."],
  ["03", "Keep the door open", "A personal site is not a closed case study. Leave room for a note, a question, or the next version."],
] as const;

export default function ArchiveAboutPage() {
  return (
    <TemplateChrome active="about">
      <section className="mx-auto max-w-[1240px] px-5 pb-28 pt-20 sm:px-8 lg:px-12 lg:pb-36 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-[0.58fr_0.42fr] lg:items-end lg:gap-20">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#24231f]/50">03 / ABOUT THE MAKER</p>
            <h1 className="mt-6 max-w-3xl font-serif text-[clamp(4.5rem,9vw,8.5rem)] leading-[0.78] tracking-[-0.075em]">A place for<br /><em className="text-[#5149cf]">working ideas.</em></h1>
          </div>
          <p className="max-w-md text-base leading-8 text-[#24231f]/62">I work across identity, interface, and editorial systems. This archive holds finished work, open questions, and the references that help me move between them.</p>
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          <EditorialAuraFrame accent={["#5149cf", "#ef6b7a", "#65b9aa"]} label="About the maker portrait frame">
            <div className="flex min-h-[340px] flex-col justify-between bg-[#fbfaf7]/80 p-8 sm:p-10"><span className="font-mono text-[10px] tracking-[0.18em] text-[#24231f]/45">PORTRAIT / 001</span><div><div className="grid h-24 w-24 place-items-center bg-[#24231f] text-[#f5f2ec] shadow-[8px_8px_0_#ef6b7a]"><span className="font-serif text-3xl">{ARCHIVE_SITE.monogram}</span></div><p className="mt-8 font-serif text-4xl leading-none">{ARCHIVE_SITE.name}</p></div><span className="font-mono text-[10px] tracking-[0.14em] text-[#24231f]/45">DESIGN / RESEARCH / WRITING</span></div>
          </EditorialAuraFrame>
          <div className="space-y-10">
            {PRINCIPLES.map(([number, title, body]) => <div key={number} className="grid gap-5 border-t border-[#24231f]/15 pt-5 md:grid-cols-[4rem_minmax(0,1fr)]"><span className="font-mono text-[10px] tracking-[0.18em] text-[#24231f]/45">{number}</span><div><h2 className="font-serif text-4xl leading-[0.9] tracking-[-0.05em]">{title}</h2><p className="mt-5 max-w-lg text-sm leading-8 text-[#24231f]/62">{body}</p></div></div>)}
          </div>
        </div>
      </section>
      <section className="border-y border-[#24231f]/15 bg-[#ebe7dc]"><div className="mx-auto grid max-w-[1240px] gap-8 px-5 py-14 sm:px-8 md:grid-cols-3 lg:px-12"><div><p className="font-mono text-[10px] tracking-[0.18em] text-[#24231f]/45">BASE / 2026</p><p className="mt-3 text-sm text-[#24231f]/70">Available for selected collaborations.</p></div><div><p className="font-mono text-[10px] tracking-[0.18em] text-[#24231f]/45">TOOLS</p><p className="mt-3 text-sm text-[#24231f]/70">Figma / Next.js / WebGL / Words</p></div><div className="flex flex-wrap gap-3"><TemplateButton href="/templates/editorial-profile-archive/resume" variant="outline">VIEW RESUME</TemplateButton><TemplateButton href="/templates/editorial-profile-archive/contact" variant="text">START A CONVERSATION</TemplateButton></div></div></section>
    </TemplateChrome>
  );
}
