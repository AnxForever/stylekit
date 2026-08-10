import { TemplateButton } from "../_components/template-button";
import { TemplateChrome } from "../_components/template-chrome";

const EXPERIENCE = [
  ["2024 — NOW", "Independent practice", "Identity, digital products, and editorial systems for people building something with a point of view."],
  ["2021 — 2024", "Design studio / Senior designer", "Led visual systems from first conversation to launch, with a focus on clear narrative and durable components."],
  ["2018 — 2021", "Small teams / Designer", "Worked across brand, interface, and writing while learning how much a good constraint can hold."],
] as const;

export default function ArchiveResumePage() {
  return (
    <TemplateChrome active="about">
      <section className="mx-auto max-w-[1240px] px-5 pb-28 pt-20 sm:px-8 lg:px-12 lg:pb-36 lg:pt-28">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-end lg:gap-20">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#24231f]/50">05 / THE SHORT VERSION</p>
            <h1 className="mt-6 font-serif text-[clamp(4.5rem,9vw,8.5rem)] leading-[0.78] tracking-[-0.075em]">A working<br /><em className="text-[#5149cf]">history.</em></h1>
          </div>
          <div className="max-w-md">
            <p className="text-base leading-8 text-[#24231f]/62">A compact record of the places, practices, and questions that shape the work. Replace this page with your real CV or export it as a PDF.</p>
            <div className="mt-7"><TemplateButton href="/templates/editorial-profile-archive/contact">TALK ABOUT A PROJECT</TemplateButton></div>
          </div>
        </div>

        <div className="mt-20 border-t border-[#24231f]/15">
          {EXPERIENCE.map(([period, title, body]) => (
            <div key={period} className="grid gap-5 border-b border-[#24231f]/15 py-8 md:grid-cols-[9rem_0.35fr_0.65fr] md:gap-8">
              <span className="font-mono text-[10px] tracking-[0.16em] text-[#24231f]/45">{period}</span>
              <h2 className="font-serif text-3xl leading-none tracking-[-0.04em]">{title}</h2>
              <p className="max-w-lg text-sm leading-7 text-[#24231f]/62">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[["PRACTICE", "Art direction / Identity / Digital"], ["TOOLS", "Figma / Next.js / WebGL / Words"], ["BASE", "Available for selected collaborations"]].map(([label, value]) => (
            <div key={label} className="border-t border-[#24231f]/15 pt-5"><p className="font-mono text-[10px] tracking-[0.18em] text-[#24231f]/45">{label}</p><p className="mt-3 text-sm leading-7 text-[#24231f]/70">{value}</p></div>
          ))}
        </div>
      </section>
    </TemplateChrome>
  );
}
