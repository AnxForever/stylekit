import { LocalizedLink } from "@/components/i18n/localized-link";
import {
  neoBrutalistProjectLinkExample,
  neoBrutalistTailwindTokens,
  neoBrutalistTailwindV4Theme,
} from "@/lib/seo/neo-brutalist-guide";

export function NeoBrutalistTailwindGuide() {
  return (
    <section
      aria-labelledby="neo-brutalist-tailwind-heading"
      className="border-b border-border"
    >
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:px-12 md:py-16">
        <p className="mb-4 text-xs tracking-widest uppercase text-muted">
          Tailwind CSS v4 tutorial
        </p>
        <h2
          id="neo-brutalist-tailwind-heading"
          className="mb-5 text-3xl font-bold text-balance"
        >
          Put the rules into a responsive component
        </h2>
        <p className="mb-8 text-base leading-7 text-muted">
          Neo-Brutalist web design uses a small set of visible rules: black borders,
          sharp corners, hard shadows, bold type, and high-contrast accents. Start
          with the registered StyleKit tokens below, then apply them consistently
          to a page instead of adding unrelated effects to each component.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-semibold">Start with the actual style tokens</h3>
            <dl className="divide-y divide-border border-y border-border">
              {neoBrutalistTailwindTokens.map((token) => (
                <div
                  key={token.label}
                  className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr]"
                >
                  <dt className="text-sm font-medium">{token.label}</dt>
                  <dd className="break-words font-mono text-xs leading-6 text-muted">
                    {token.value}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm leading-7 text-muted">
              The border, corner, shadow, type, spacing, and color values come
              from StyleKit&apos;s Neo-Brutalist token registry. The responsive
              shadow is 4px on small screens and 8px from the medium breakpoint.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Define reusable colors in Tailwind v4
            </h3>
            <p className="mb-4 text-sm leading-7 text-muted">
              Tailwind v4 uses CSS-first theme variables. Add the accent colors
              to your main stylesheet; the names below create the
              <code className="mx-1 font-mono text-xs">bg-neo-lime</code> and
              <code className="mx-1 font-mono text-xs">bg-neo-pink</code> utilities.
            </p>
            <pre className="overflow-x-auto whitespace-pre-wrap break-words border border-border bg-muted/5 p-4 font-mono text-xs leading-6">
              <code>{neoBrutalistTailwindV4Theme}</code>
            </pre>
            <a
              href="https://tailwindcss.com/docs/functions-and-directives"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-11 items-center text-sm underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Read Tailwind&apos;s @theme documentation
            </a>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="mb-3 text-xl font-semibold">
            Build one responsive, keyboard-ready project link
          </h3>
          <p className="mb-5 text-sm leading-7 text-muted">
            This link keeps the registered 2px/4px borders and 4px/8px shadows.
            The active displacement matches the shadow at each breakpoint, so
            pressing the link flattens it. The hover color changes immediately;
            only the transform and shadow transition.
          </p>
          <pre className="overflow-x-auto whitespace-pre-wrap break-words border border-border bg-muted/5 p-4 font-mono text-xs leading-6">
            <code>{neoBrutalistProjectLinkExample}</code>
          </pre>
          <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-7 text-muted">
            <li>
              Keep real navigation as an anchor; use a button for an action.
              Replace <code className="font-mono text-xs">/projects</code> with
              a destination in your app.
            </li>
            <li>
              Preserve the visible focus outline and test text contrast with the
              actual content and colors you ship.
            </li>
            <li>
              The reduced-motion variant removes movement while leaving the
              control usable by keyboard and pointer.
            </li>
          </ul>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <h3 className="mb-4 text-xl font-semibold">Continue from the example</h3>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <LocalizedLink
              href="/styles/neo-brutalist#style-exports"
              className="min-h-11 inline-flex items-center underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Copy the Neo-Brutalist rules and export its style assets
            </LocalizedLink>
            <LocalizedLink
              href="/tailwind-ui-prompts"
              className="min-h-11 inline-flex items-center underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Browse Tailwind UI prompts
            </LocalizedLink>
            <LocalizedLink
              href="/blog/glassmorphism-vs-neo-brutalist"
              className="min-h-11 inline-flex items-center underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Compare Neo-Brutalist and Glassmorphism
            </LocalizedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
