"use client";

import { CodeBlock } from "@/components/style-preview/code-block";
import type {
  DesignMdBlock,
  DesignMdDocument,
  DesignMdFrontmatter,
  DesignMdSection,
} from "./schema";

/**
 * DesignMdRenderer — render a parsed DESIGN.md document as accessible HTML.
 * Relies on the `@tailwindcss/typography` plugin (already enabled in
 * app/globals.css) for base prose styling. The callsite decides whether to
 * show frontmatter badges and the table of contents.
 */

export interface DesignMdRendererProps {
  document: DesignMdDocument;
  showFrontmatter?: boolean;
  showToc?: boolean;
  className?: string;
}

export function DesignMdRenderer({
  document,
  showFrontmatter = false,
  showToc = false,
  className = "",
}: DesignMdRendererProps) {
  const hasSections = document.sections.length > 0;
  const rootClass = `design-md-renderer prose prose-neutral max-w-none ${className}`.trim();

  return (
    <article className={rootClass}>
      {document.title ? <h1>{document.title}</h1> : null}
      {showFrontmatter && document.frontmatter ? (
        <FrontmatterBadges frontmatter={document.frontmatter} />
      ) : null}
      {showToc && hasSections ? <TableOfContents sections={document.sections} /> : null}
      {document.sections.map((section, idx) => (
        <SectionView key={sectionKey(section, idx)} section={section} />
      ))}
    </article>
  );
}

function sectionKey(section: DesignMdSection, idx: number): string {
  const numberPart = section.number !== null ? String(section.number) : "n";
  return `${numberPart}-${idx}-${section.title}`;
}

function sectionSlug(section: DesignMdSection): string {
  const numberPart = section.number !== null ? `${section.number}-` : "";
  const titleSlug = section.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `section-${numberPart}${titleSlug}`;
}

function FrontmatterBadges({
  frontmatter,
}: {
  frontmatter: DesignMdFrontmatter;
}) {
  const badges: string[] = [frontmatter.slug];
  if (frontmatter.category) badges.push(frontmatter.category);
  if (frontmatter.style_type) badges.push(frontmatter.style_type);
  badges.push(...frontmatter.tags);

  return (
    <div className="not-prose mb-6 flex flex-wrap gap-2 text-xs">
      {badges.map((badge) => (
        <span
          key={badge}
          className="rounded-full border border-border px-3 py-1 font-mono text-foreground/70"
        >
          {badge}
        </span>
      ))}
      {frontmatter.author ? (
        <span className="rounded-full border border-border px-3 py-1 font-mono text-foreground/70">
          by {frontmatter.author}
        </span>
      ) : null}
    </div>
  );
}

function TableOfContents({ sections }: { sections: DesignMdSection[] }) {
  return (
    <nav
      aria-label="Table of contents"
      className="not-prose mb-8 rounded-md border border-border p-4 text-sm"
    >
      <p className="mb-2 font-mono text-xs uppercase tracking-wider text-foreground/50">
        Contents
      </p>
      <ol className="space-y-1">
        {sections.map((section, idx) => (
          <li key={sectionKey(section, idx)}>
            <a
              href={`#${sectionSlug(section)}`}
              className="text-foreground/80 hover:text-foreground"
            >
              {section.number !== null ? `${section.number}. ` : ""}
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function SectionView({ section }: { section: DesignMdSection }) {
  return (
    <section id={sectionSlug(section)}>
      <h2>
        {section.number !== null ? `${section.number}. ` : ""}
        {section.title}
      </h2>
      {section.blocks.map((block, idx) => (
        <BlockView key={`block-${idx}`} block={block} />
      ))}
    </section>
  );
}

function BlockView({ block }: { block: DesignMdBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>;

    case "bullet-list":
      return (
        <ul>
          {block.items.map((item, idx) => (
            <li key={`li-${idx}`}>{item}</li>
          ))}
        </ul>
      );

    case "code":
      return (
        <div className="not-prose my-4">
          <CodeBlock code={block.code} language={block.language || "text"} />
        </div>
      );

    case "sub-heading": {
      const Tag = `h${block.level}` as "h3" | "h4" | "h5" | "h6";
      return <Tag>{block.text}</Tag>;
    }

    case "table":
      return (
        <table>
          <thead>
            <tr>
              {block.headers.map((header, idx) => (
                <th key={`th-${idx}`}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, rIdx) => (
              <tr key={`tr-${rIdx}`}>
                {row.map((cell, cIdx) => (
                  <td key={`td-${rIdx}-${cIdx}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
  }
}
