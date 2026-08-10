export const ARCHIVE_SITE = {
  name: "Your Name",
  monogram: "SK",
  role: "Designer, collector, and quiet observer.",
  description: "An editorial personal archive for designers, makers, researchers, and people whose work deserves more room than a grid of thumbnails.",
  email: "hello@example.com",
  location: "Shanghai / Remote",
  availability: "Available for selected collaborations.",
  socials: {
    github: "https://github.com/yourname",
    profile: "https://yourname.com",
  },
  stats: [
    ["24", "SAVED STYLES"],
    ["08", "PROJECTS"],
    ["03", "CURRENT NOTES"],
  ],
} as const;

export type ArchiveCategory = "Identity" | "Editorial" | "Digital";

export interface ArchiveProject {
  slug: string;
  number: string;
  title: string;
  category: ArchiveCategory;
  year: string;
  summary: string;
  description: string;
  colors: readonly [string, string, string];
  role: string;
  tools: string[];
  outcome: string;
  sections: Array<{ heading: string; body: string }>;
}

export const ARCHIVE_PROJECTS: ArchiveProject[] = [
  {
    slug: "quiet-system",
    number: "01",
    title: "A quiet system for loud ideas",
    category: "Identity",
    year: "2026",
    summary: "A flexible visual language for a small studio working between research, culture, and technology.",
    description: "The studio needed an identity that could hold serious research and unfinished thinking at the same time. The resulting system uses a restrained typographic frame, a small set of high-signal accents, and generous space for the work to breathe.",
    colors: ["#202124", "#ef6b7a", "#d9f23a"],
    role: "Art direction / identity",
    tools: ["Figma", "Type design", "Motion studies"],
    outcome: "A working identity system that moved from pitch deck to website without losing its voice.",
    sections: [
      { heading: "Make room for the unfinished", body: "The archive keeps process visible. Notes, references, and final work share the same visual grammar so the page feels collected rather than decorated." },
      { heading: "One accent is enough", body: "A warm red signal sits against ink and acid green. It marks movement, availability, and the occasional decision that needs to be remembered." },
    ],
  },
  {
    slug: "soft-edge-notes",
    number: "02",
    title: "Notes from the soft edge",
    category: "Editorial",
    year: "2025",
    summary: "An ongoing collection of images, references, and fragments gathered during a year of making.",
    description: "A small editorial publication built around fragments: a sentence found on a train, a color from a faded poster, a layout that stayed in memory. The interface treats each note as a specimen rather than a feed item.",
    colors: ["#8bc8c0", "#f1eadc", "#3c477a"],
    role: "Editorial design / web",
    tools: ["Next.js", "Prose", "Image studies"],
    outcome: "A calm reading surface for ideas that are not ready to become articles yet.",
    sections: [
      { heading: "A slower kind of publishing", body: "Notes are grouped by season and atmosphere instead of engagement. The reader can wander, return, and leave without losing their place." },
      { heading: "The archive is the interface", body: "Dates, labels, and small visual plates make the collection legible without flattening it into a conventional CMS grid." },
    ],
  },
  {
    slug: "interface-as-room",
    number: "03",
    title: "The interface as a room",
    category: "Digital",
    year: "2025",
    summary: "A compact digital archive that turns product decisions into a readable, lived-in space.",
    description: "This study asks what happens when a product page behaves more like a room than a brochure. Content is arranged into zones: a working table, an index wall, and an open channel for conversation.",
    colors: ["#dca56a", "#f8d8d1", "#312b4b"],
    role: "Concept / interaction design",
    tools: ["React", "WebGL", "Interface writing"],
    outcome: "A reusable pattern for personal sites that need to show both finished work and a point of view.",
    sections: [
      { heading: "The first read is a threshold", body: "A profile frame establishes identity before the visitor reaches the work. It is a small room inside the larger page, not a decorative card." },
      { heading: "Every page needs an exit", body: "Project details, notes, and contact each return to the archive so the site feels like a connected place rather than a stack of isolated screens." },
    ],
  },
];

export interface ArchiveNote {
  slug: string;
  number: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  body: string;
}

export const ARCHIVE_NOTES: ArchiveNote[] = [
  { slug: "keep-a-small-library", number: "N / 01", date: "06.18.26", category: "METHOD", title: "Keep a small library", excerpt: "A useful archive is selective before it is large.", body: "The best references are not the ones that make a page look finished. They are the ones that help you decide what the page should refuse. Keep a small library, revisit it often, and let the gaps stay visible." },
  { slug: "the-value-of-a-frame", number: "N / 02", date: "05.29.26", category: "INTERFACE", title: "The value of a frame", excerpt: "A border can be a threshold, not just a boundary.", body: "When a frame is doing its job, it tells the visitor how to enter a piece of content. The corners, marks, and small signals create a reading pace before any paragraph begins." },
  { slug: "slow-light", number: "N / 03", date: "04.12.26", category: "MOTION", title: "Slow light is still motion", excerpt: "Subtle movement gives a surface a pulse without making it perform.", body: "The most useful ambient effects are almost easy to miss. A low-frequency glow, a soft change at the edge, or a field that follows the pointer by a fraction can make a static archive feel inhabited." },
  { slug: "make-the-contact-page-human", number: "N / 04", date: "03.02.26", category: "WRITING", title: "Make the contact page human", excerpt: "A working email is not a personality.", body: "The contact page should answer a simple question: what kind of conversation belongs here? A sentence of invitation often does more than a long list of social links." },
];

export function getArchiveProject(slug: string) {
  return ARCHIVE_PROJECTS.find((project) => project.slug === slug);
}

export function getArchiveNote(slug: string) {
  return ARCHIVE_NOTES.find((note) => note.slug === slug);
}
