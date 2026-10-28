import { neoBrutalistTokens } from "@/lib/styles/neo-brutalist-tokens";

function hexFromTokenClass(className: string): string {
  const match = /\[#([\da-f]{3,8})\]/i.exec(className);
  if (!match) {
    throw new Error(`Expected a hex color token, received: ${className}`);
  }
  return `#${match[1]}`;
}

const neoPink = hexFromTokenClass(neoBrutalistTokens.colors.background.accent[0]);
const neoLime = hexFromTokenClass(neoBrutalistTokens.colors.background.accent[1]);

export const NEO_BRUTALIST_GUIDE_SEO = {
  title: "Neo-Brutalist Web Design with Tailwind CSS",
  description:
    "Build a Neo-Brutalist website with Tailwind CSS v4 using responsive border and shadow tokens, an accessible component example, and StyleKit's copyable style rules.",
  keywords: [
    "Neo-Brutalist web design",
    "Neo-Brutalism Tailwind CSS",
    "Tailwind CSS design tokens",
    "Brutalist website design",
  ],
};

export const neoBrutalistTailwindV4Theme = `@import "tailwindcss";

@theme {
  --color-neo-lime: ${neoLime};
  --color-neo-pink: ${neoPink};
}`;

const projectLinkClasses = [
  "inline-flex min-h-11 items-center justify-center px-5 py-3",
  neoBrutalistTokens.border.width,
  neoBrutalistTokens.border.color,
  neoBrutalistTokens.border.radius,
  "bg-neo-lime",
  neoBrutalistTokens.colors.text.primary,
  neoBrutalistTokens.typography.heading,
  neoBrutalistTokens.shadow.md,
  "transition-[transform,box-shadow] duration-150 ease-out",
  "hover:bg-neo-pink",
  "hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]",
  "hover:-translate-x-0.5 hover:-translate-y-0.5 md:hover:-translate-x-1 md:hover:-translate-y-1",
  "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
  "md:active:translate-x-[8px] md:active:translate-y-[8px]",
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black",
  "motion-reduce:transition-none motion-reduce:translate-none!",
].join(" ");

export const neoBrutalistProjectLinkExample = `export function ProjectLink() {
  return (
    <a
      href="/projects"
      className="${projectLinkClasses}"
    >
      View projects
    </a>
  );
}`;

export const neoBrutalistTailwindTokens = [
  {
    label: "Borders and corners",
    value: `${neoBrutalistTokens.border.width} ${neoBrutalistTokens.border.color} ${neoBrutalistTokens.border.radius}`,
  },
  {
    label: "Responsive hard shadow",
    value: neoBrutalistTokens.shadow.md,
  },
  {
    label: "Typography",
    value: `${neoBrutalistTokens.typography.heading} / ${neoBrutalistTokens.typography.body}`,
  },
  {
    label: "Accent palette",
    value: neoBrutalistTokens.colors.background.accent.join(" "),
  },
] as const;
