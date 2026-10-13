export type FieldNoteCategory = "Practice" | "Systems" | "Field notes";

export type FieldNote = {
  slug: string;
  title: string;
  category: FieldNoteCategory;
  date: string;
  readingTime: string;
  excerpt: string;
  paragraphs: string[];
  takeaway: string;
};

export const FIELD_NOTE_CATEGORIES = [
  "All notes",
  "Practice",
  "Systems",
  "Field notes",
] as const;

export const FIELD_NOTES: FieldNote[] = [
  {
    slug: "design-the-pause",
    title: "Design the pause, not the spinner",
    category: "Practice",
    date: "October 08, 2026",
    readingTime: "4 min",
    excerpt:
      "Waiting is part of a product's behavior. A useful pause tells people what is happening, what is safe, and what they can do next.",
    paragraphs: [
      "A loading state is often treated as a small piece of decoration added after the real interface is finished. People experience it as part of the interface itself. They use it to decide whether to wait, retry, leave, or trust the result.",
      "Start with the question a person is asking. If a save is in progress, say that the work is being saved and keep the draft visible. If a search takes time, preserve the query and explain what is being searched. A spinner can show motion, but it cannot answer either question.",
      "The most useful pause is honest about uncertainty. Show progress only when the system can measure it. If the duration is unknown, use a steady status message and keep the surrounding controls predictable. Do not promise that a task is almost done when the system cannot know that.",
    ],
    takeaway:
      "A waiting state earns trust when it names the work and protects the user's next move.",
  },
  {
    slug: "tokens-are-a-promise",
    title: "Tokens are a promise to future you",
    category: "Systems",
    date: "September 29, 2026",
    readingTime: "5 min",
    excerpt:
      "A design token is more than a reusable value. It is a small agreement about how a system should change without losing its shape.",
    paragraphs: [
      "It is easy to call every repeated value a token. The harder question is whether the name captures a decision someone will need to make again. A color called `blue-500` describes a sample. A color called `action` describes a job.",
      "Good names leave room for the system to evolve. When the brand changes, an action color can move from blue to another hue without changing the component's meaning. When a spacing value changes, a layout token can be adjusted once instead of searched for in a hundred files.",
      "That promise has limits. Tokens should not hide meaningful differences just to reduce the number of values. If two surfaces behave differently, give them names that preserve the distinction. A small vocabulary is useful only when people can still tell what each choice means.",
    ],
    takeaway:
      "Name a token for the decision it represents, then keep the contract small enough to understand.",
  },
  {
    slug: "small-type-clear-decisions",
    title: "Small type, clear decisions",
    category: "Field notes",
    date: "September 11, 2026",
    readingTime: "3 min",
    excerpt:
      "Labels carry operational detail. Their size should follow the importance of the decision they help someone make.",
    paragraphs: [
      "Dense interfaces often shrink their labels first. That makes the screen feel quieter, but it can also make the most useful details harder to find. A timestamp, unit, or status can change what a number means. It is not supporting decoration.",
      "Instead of reducing every label by the same amount, decide which details people compare and which ones they only need occasionally. Keep the comparison visible. Move background detail into a disclosure or a nearby note, where it remains available without competing with the main task.",
      "Then check the page at its real viewing size. A label that looks crisp in a zoomed design file can become tiring on a laptop or phone. Reading comfort is part of the information hierarchy, not a finishing pass.",
    ],
    takeaway:
      "Use small type sparingly, and keep the details that change a decision easy to read.",
  },
];

export type Project = {
  number: string;
  title: string;
  field: string;
  year: string;
  summary: string;
  challenge: string;
  approach: string;
  result: string;
  tools: string[];
};

export const PROJECTS: Project[] = [
  {
    number: "01",
    title: "Northline dispatch",
    field: "Operations software",
    year: "2026",
    summary:
      "A route planning workspace for a regional delivery team that needed to spot exceptions before the morning handoff.",
    challenge:
      "The old board gave every route the same visual weight. Dispatchers had to open several panels to find late stops and missing assignments.",
    approach:
      "The new layout groups work by urgency, keeps the next action beside each exception, and gives operators a compact route history they can scan in sequence.",
    result:
      "In the demo review, the team resolved the three sample exceptions without leaving the route overview. The design keeps the handoff visible when live data is unavailable.",
    tools: ["Product design", "Interaction states", "Prototype"],
  },
  {
    number: "02",
    title: "Common Ground tokens",
    field: "Design system",
    year: "2025",
    summary:
      "A compact token and component set for a small product team moving from one interface to three.",
    challenge:
      "The team had repeated styles, but no shared language for deciding which values could change together across products.",
    approach:
      "Color, spacing, and type were named by role. A short component guide shows the intended states and where a component should not be used.",
    result:
      "The system makes theme changes easier to review and gives new contributors a clearer route from a design decision to its implementation.",
    tools: ["Design tokens", "Component rules", "Documentation"],
  },
];
