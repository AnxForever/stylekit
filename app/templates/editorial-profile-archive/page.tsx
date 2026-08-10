import { IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import Link from "next/link";
import { ArrowUpRight, Github, Mail, Sparkles } from "lucide-react";

import { TemplateAuraFrame as EditorialAuraFrame } from "./_components/template-aura-frame";
import { TemplateButton } from "./_components/template-button";
import { TemplateChrome } from "./_components/template-chrome";
import { ARCHIVE_SITE } from "./_data";

const serif = Instrument_Serif({ weight: "400", subsets: ["latin"], style: ["normal", "italic"] });
const mono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"] });

const PROJECTS = [
  {
    number: "01",
    title: "A quiet system for loud ideas",
    type: "IDENTITY / 2026",
    description: "A flexible visual language for a small studio working between research, culture, and technology.",
    colors: ["#202124", "#ef6b7a", "#d9f23a"],
  },
  {
    number: "02",
    title: "Notes from the soft edge",
    type: "EDITORIAL / 2025",
    description: "An ongoing collection of images, references, and fragments gathered during a year of making.",
    colors: ["#8bc8c0", "#f1eadc", "#3c477a"],
  },
  {
    number: "03",
    title: "The interface as a room",
    type: "DIGITAL / 2025",
    description: "A compact digital archive that turns product decisions into a readable, lived-in space.",
    colors: ["#dca56a", "#f8d8d1", "#312b4b"],
  },
] as const;

const PROJECT_HREFS = {
  "01": "quiet-system",
  "02": "soft-edge-notes",
  "03": "interface-as-room",
} as const;

const ACTIVITY = [
  ["06.18", "Added a new study to the archive", "EDITORIAL"],
  ["05.29", "Saved three references from the style library", "RESEARCH"],
  ["04.12", "Published the first version of the visual system", "SYSTEM"],
] as const;

const SERVICES = [
  ["01", "IDENTITY", "Visual systems with enough restraint to stay useful as the work grows."],
  ["02", "DIGITAL", "Websites and interfaces that make a point of view easy to feel and follow."],
  ["03", "EDITORIAL", "A clear voice for notes, references, launches, and the work around the work."],
] as const;

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <article className="group grid gap-5 border-t border-[#24231f]/15 py-6 md:grid-cols-[4rem_minmax(0,1fr)_13rem] md:items-start">
      <span className={`${mono.className} text-[11px] tracking-[0.18em] text-[#24231f]/45`}>{project.number}</span>
      <div>
        <p className={`${mono.className} mb-2 text-[10px] tracking-[0.18em] text-[#24231f]/45`}>{project.type}</p>
        <h3 className={`${serif.className} max-w-xl text-3xl leading-none tracking-[-0.03em] md:text-4xl`}>{project.title}</h3>
        <p className="mt-4 max-w-lg text-sm leading-7 text-[#24231f]/60">{project.description}</p>
        <Link href={`/templates/editorial-profile-archive/work/${PROJECT_HREFS[project.number]}`} className="mt-5 inline-flex items-center gap-2 text-xs text-[#24231f] underline decoration-[#24231f]/20 underline-offset-4 transition-colors hover:decoration-[#ef6b7a]">
          Read the entry <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>
      <div className="relative h-32 overflow-hidden border border-[#24231f]/15 transition-transform duration-500 group-hover:-translate-y-1 md:h-40">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${project.colors[0]} 0 38%, ${project.colors[1]} 38% 71%, ${project.colors[2]} 71%)` }} />
        <div className="absolute left-[18%] top-[19%] h-16 w-16 rounded-full border border-white/60 md:h-20 md:w-20" />
        <div className="absolute bottom-[17%] right-[17%] h-10 w-10 border border-white/70 md:h-14 md:w-14" />
        <span className={`${mono.className} absolute bottom-3 left-3 text-[9px] tracking-[0.14em] text-white/80`}>PLATE / {project.number}</span>
      </div>
    </article>
  );
}

export default function EditorialProfileArchiveTemplate() {
  return (
    <TemplateChrome active="home">
      <section className="mx-auto grid max-w-[1240px] gap-12 px-5 pb-28 pt-16 sm:px-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(420px,1.18fr)] lg:items-center lg:gap-20 lg:px-12 lg:pb-36 lg:pt-28">
        <div>
          <p className={`${mono.className} text-[10px] tracking-[0.2em] text-[#24231f]/50`}>EDITORIAL PROFILE / CREATOR TEMPLATE</p>
          <h1 className={`${serif.className} mt-7 max-w-2xl text-[clamp(4.5rem,10vw,9rem)] leading-[0.78] tracking-[-0.075em]`}>
            Make a
            <br />
            <em className="text-[#5149cf]">record</em>
            <br />
            of your work.
          </h1>
          <p className="mt-9 max-w-md text-base leading-8 text-[#24231f]/62">
            {ARCHIVE_SITE.description}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <TemplateButton href="/templates/editorial-profile-archive/work">VIEW SELECTED WORK</TemplateButton>
            <TemplateButton href="/templates/editorial-profile-archive/about" variant="outline">ABOUT THE MAKER</TemplateButton>
          </div>
          <div className={`${mono.className} mt-10 flex flex-wrap gap-x-6 gap-y-3 text-[10px] tracking-[0.16em] text-[#24231f]/48`}>
            <span>PROFILE</span>
            <span>PORTFOLIO</span>
            <span>ARCHIVE</span>
          </div>
        </div>

        <EditorialAuraFrame
          className="bg-[#fbfaf7] shadow-[0_30px_80px_-46px_rgba(36,35,31,0.5)]"
          label="Editorial personal archive profile card"
          accent={["#5149cf", "#ef6b7a", "#65b9aa"]}
          intensity="subtle"
        >
          <div className="flex min-h-[480px] flex-col justify-between p-7 sm:p-10">
            <div className={`${mono.className} flex justify-between text-[10px] tracking-[0.16em] text-[#24231f]/45`}>
              <span>STYLEKIT / PROFILE</span>
              <span>NO. 01 / 2026</span>
            </div>
            <div className="my-16 flex items-center gap-6">
              <div className="grid h-20 w-20 shrink-0 place-items-center bg-[#24231f] text-[#f5f2ec] shadow-[6px_6px_0_#ef6b7a]">
                <span className={`${serif.className} text-2xl`}>SK</span>
              </div>
              <div>
                <p className={`${mono.className} mb-2 text-[10px] tracking-[0.16em] text-[#24231f]/45`}>CREATIVE SYSTEMS / 001</p>
                <h2 className={`${serif.className} text-5xl leading-none tracking-[-0.04em]`}>{ARCHIVE_SITE.name}</h2>
                <p className="mt-3 text-sm text-[#24231f]/55">{ARCHIVE_SITE.role}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 border-y border-[#24231f]/15">
              {ARCHIVE_SITE.stats.map(([value, label]) => (
                <div key={label} className="px-3 py-4 first:pl-0 [&+div]:border-l [&+div]:border-[#24231f]/15">
                  <strong className={`${serif.className} block text-3xl font-normal`}>{value}</strong>
                  <span className={`${mono.className} mt-2 block text-[9px] tracking-[0.12em] text-[#24231f]/48`}>{label}</span>
                </div>
              ))}
            </div>
            <div className={`${mono.className} mt-5 flex items-center justify-between text-[9px] tracking-[0.14em] text-[#24231f]/48`}>
              <span>QUIET DETAILS / SLOW LIGHT</span>
              <span><i className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#ef6b7a]" />AVAILABLE</span>
            </div>
          </div>
        </EditorialAuraFrame>
      </section>

      <section className="border-y border-[#24231f]/15 bg-[#24231f] text-[#f5f2ec]">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.32fr_0.68fr] lg:px-12 lg:py-20">
          <div>
            <p className={`${mono.className} text-[10px] tracking-[0.18em] text-[#f5f2ec]/45`}>04 / WHAT I MAKE</p>
            <h2 className={`${serif.className} mt-5 max-w-xs text-5xl leading-[0.88] tracking-[-0.05em]`}>Useful beauty, with a reason to exist.</h2>
          </div>
          <div className="grid gap-0 md:grid-cols-3">
            {SERVICES.map(([number, title, body]) => (
              <div key={number} className="border-t border-[#f5f2ec]/20 py-5 md:border-l md:border-t-0 md:px-6 md:first:border-l-0 md:first:pl-0">
                <span className={`${mono.className} text-[10px] tracking-[0.18em] text-[#ef6b7a]`}>{number}</span>
                <h3 className={`${serif.className} mt-12 text-3xl leading-none tracking-[-0.04em]`}>{title}</h3>
                <p className="mt-4 max-w-xs text-sm leading-7 text-[#f5f2ec]/60">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#24231f]/15 bg-[#ebe7dc]">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.32fr_0.68fr] lg:px-12 lg:py-28">
          <div>
            <p className={`${mono.className} text-[10px] tracking-[0.18em] text-[#24231f]/45`}>01 / SELECTED WORK</p>
            <h2 className={`${serif.className} mt-5 max-w-xs text-5xl leading-[0.9] tracking-[-0.05em]`}>A few things worth keeping.</h2>
          </div>
          <div>{PROJECTS.map((project) => <ProjectCard key={project.number} project={project} />)}</div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1240px] gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[0.62fr_0.38fr] lg:px-12 lg:py-28">
        <div>
          <div className="flex items-center justify-between border-b border-[#24231f]/15 pb-5">
            <p className={`${mono.className} text-[10px] tracking-[0.18em] text-[#24231f]/45`}>02 / RECENT ACTIVITY</p>
            <Sparkles className="h-4 w-4 text-[#5149cf]" aria-hidden="true" />
          </div>
          <div>{ACTIVITY.map(([date, text, type]) => (
            <div key={date} className="grid grid-cols-[4.5rem_minmax(0,1fr)_auto] gap-4 border-b border-[#24231f]/15 py-5 text-sm">
              <span className={`${mono.className} text-[10px] tracking-[0.12em] text-[#24231f]/45`}>{date}</span>
              <span>{text}</span>
              <span className={`${mono.className} text-[9px] tracking-[0.12em] text-[#24231f]/42`}>{type}</span>
            </div>
          ))}</div>
        </div>
        <aside id="contact" className="border border-[#24231f]/15 bg-[#fbfaf7] p-7 sm:p-9">
          <p className={`${mono.className} text-[10px] tracking-[0.18em] text-[#24231f]/45`}>03 / OPEN CHANNEL</p>
          <h2 className={`${serif.className} mt-5 text-5xl leading-[0.88] tracking-[-0.05em]`}>Leave a note.</h2>
          <p className="mt-6 text-sm leading-7 text-[#24231f]/60">Use this space for a short invitation, a working email, or the next place people can find you.</p>
          <a href={`mailto:${ARCHIVE_SITE.email}`} className="mt-8 inline-flex items-center gap-2 border-b border-[#24231f] pb-2 text-sm text-[#24231f] no-underline">
            <Mail className="h-4 w-4" aria-hidden="true" /> {ARCHIVE_SITE.email}
          </a>
          <div className="mt-12 flex gap-4 border-t border-[#24231f]/15 pt-5">
            <a href={ARCHIVE_SITE.socials.github} aria-label="GitHub" className="text-[#24231f]/60 transition-colors hover:text-[#24231f]"><Github className="h-4 w-4" /></a>
            <a href={ARCHIVE_SITE.socials.profile} aria-label="External profile" className="text-[#24231f]/60 transition-colors hover:text-[#24231f]"><ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </aside>
      </section>

    </TemplateChrome>
  );
}
