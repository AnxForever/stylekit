import type { DesignSpec, LocalizedText, SpecLocale } from "../types";
import { renderCssVariables } from "./css-vars";

export interface DesignMdOptions {
  /** `extended` carries token columns, the prompt guide and the variable sheet. */
  density?: "compact" | "extended";
  locale?: SpecLocale;
}

/**
 * Markdown table. Pipes inside a cell are escaped so a role sentence containing
 * "a | b" cannot break the column count.
 */
function table(headers: readonly string[], rows: readonly (readonly string[])[]): string {
  const escape = (cell: string) => cell.replace(/\|/g, "\\|").replace(/\s*\n\s*/g, " ");
  const head = `| ${headers.map(escape).join(" | ")} |`;
  const divider = `|${headers.map(() => "---").join("|")}|`;
  const body = rows.map((row) => `| ${row.map(escape).join(" | ")} |`);
  return [head, divider, ...body].join("\n");
}

function bulletList(items: readonly string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

/**
 * Renders one spec into the document an agent reads before building a page.
 *
 * Section order is fixed on purpose: colors, type, spacing, components, rules,
 * then the material that only the extended density carries. A reader who stops
 * after the rules section still has everything needed to build something that
 * looks like the reference.
 */
export function renderDesignMd(spec: DesignSpec, options: DesignMdOptions = {}): string {
  const density = options.density ?? "extended";
  const locale: SpecLocale = options.locale ?? "en";
  const extended = density === "extended";
  const t = (text: LocalizedText): string => text[locale] || text.en || text.zh;

  const blocks: string[] = [];

  // Section headings stay in English in both locales: they are the vocabulary an
  // agent is told to look for. Only the style name and the prose are localized.
  blocks.push(locale === "zh" ? `# ${spec.name} — 风格参考` : `# ${spec.nameEn} — Style Reference`);
  blocks.push(`> ${t(spec.northStar)}`);
  blocks.push(`**Theme:** ${spec.theme}`);
  blocks.push(t(spec.summary));

  const colorHeaders = extended
    ? ["Name", "Value", "Token", "Role"]
    : ["Name", "Value", "Role"];
  blocks.push("## Colors");
  blocks.push(
    table(
      colorHeaders,
      spec.colors.map((color) => {
        const cells = [color.nameEn, `\`${color.value}\``];
        if (extended) cells.push(`\`${color.token}\``);
        cells.push(t(color.role));
        return cells;
      }),
    ),
  );

  if (spec.completeness !== "stub") {
    blocks.push("## Typography");
    for (const font of spec.fonts) {
      blocks.push(`### ${font.family} — ${t(font.role)}`);
      const facts = [
        `- **Substitute:** ${font.substitute}`,
        `- **Weights:** ${font.weights.join(", ")}`,
        `- **Sizes:** ${font.sizes.join(", ")}`,
        `- **Line height:** ${font.lineHeight.display} (display), ${font.lineHeight.heading} (headings), ${font.lineHeight.body} (body)`,
        `- **Letter spacing:** ${font.tracking.display} on display, ${font.tracking.label} on uppercase labels`,
      ];
      if (font.features && font.features.length > 0) {
        facts.push(`- **OpenType features:** ${font.features.map((f) => `\`"${f}" on\``).join(", ")}`);
      }
      blocks.push(facts.join("\n"));
    }

    if (spec.typeScale.length > 0) {
      const scaleHeaders = extended
        ? ["Role", "Family", "Weight", "Size", "Line Height", "Letter Spacing", "Token"]
        : ["Role", "Family", "Weight", "Size", "Line Height", "Letter Spacing"];
      blocks.push("### Type Scale");
      blocks.push(
        table(
          scaleHeaders,
          spec.typeScale.map((step) => {
            const cells = [
              step.role,
              step.font ?? "—",
              step.weight ? String(step.weight) : "—",
              `${step.size}px`,
              String(step.lineHeight),
              step.tracking ?? "—",
            ];
            if (extended) cells.push(`\`${step.token}\``);
            return cells;
          }),
        ),
      );
    }

    blocks.push("## Spacing & Layout");
    blocks.push(
      [
        `**Base unit:** ${spec.spacing.base}px`,
        `**Density:** ${spec.spacing.density}`,
      ].join("\n"),
    );
    if (spec.spacing.scale.length > 0) {
      blocks.push("### Spacing Scale");
      blocks.push(
        table(
          extended ? ["Name", "Value", "Token"] : ["Name", "Value"],
          spec.spacing.scale.map((step) =>
            extended ? [String(step), `${step}px`, `\`--spacing-${step}\``] : [String(step), `${step}px`],
          ),
        ),
      );
    }
    if (spec.radii.length > 0) {
      blocks.push("### Border Radius");
      blocks.push(table(["Element", "Value"], spec.radii.map((r) => [r.element, r.value])));
    }
    blocks.push(
      [
        `- **Page max-width:** ${spec.spacing.maxWidth}px`,
        `- **Section gap:** ${spec.spacing.sectionGap}px`,
        `- **Card padding:** ${spec.spacing.cardPadding}px`,
        `- **Element gap:** ${spec.spacing.elementGap}px`,
      ].join("\n"),
    );

    if (spec.components.length > 0) {
      blocks.push("## Components");
      for (const component of spec.components) {
        blocks.push(`### ${component.name}`);
        blocks.push(`**Role:** ${t(component.role)}`);
        blocks.push(t(component.construction));
        const meta: string[] = [];
        if (component.sizes) meta.push(`- **Sizes:** ${component.sizes}`);
        if (component.states) meta.push(`- **States:** ${component.states}`);
        if (meta.length > 0) blocks.push(meta.join("\n"));
        if (extended && component.html) {
          blocks.push("```html");
          blocks.push(component.html.trim());
          blocks.push("```");
        }
      }
    }
  }

  blocks.push("## Do's and Don'ts");
  blocks.push("### Do");
  blocks.push(bulletList(spec.dos.map(t)));
  blocks.push("### Don't");
  blocks.push(bulletList(spec.donts.map(t)));

  if (spec.completeness !== "stub") {
    if (spec.surfaces.length > 0) {
      blocks.push("## Surfaces");
      blocks.push(
        table(
          ["Level", "Name", "Value", "Purpose"],
          spec.surfaces.map((s) => [String(s.level), s.name, `\`${s.value}\``, s.purpose]),
        ),
      );
    }

    if (spec.elevation.length > 0) {
      blocks.push("## Elevation");
      blocks.push(spec.elevation.map((e) => `- **${e.name}:** \`${e.value}\``).join("\n"));
    }

    blocks.push("## Imagery");
    blocks.push(t(spec.imagery));
    blocks.push("## Layout");
    blocks.push(t(spec.layout));
  }

  if (extended && spec.completeness === "full" && spec.promptGuide.prompts.length > 0) {
    blocks.push("## Agent Prompt Guide");
    const quick = Object.entries(spec.promptGuide.quickColors);
    if (quick.length > 0) {
      blocks.push("QUICK COLOR REFERENCE:");
      blocks.push(bulletList(quick.map(([slot, value]) => `${slot}: \`${value}\``)));
    }
    blocks.push("EXAMPLE COMPONENT PROMPTS:");
    blocks.push(
      spec.promptGuide.prompts
        .map((prompt, index) => `${index + 1}. ${t(prompt)}`)
        .join("\n"),
    );
  }

  if (spec.similar.length > 0) {
    blocks.push("## Similar Brands");
    blocks.push(
      bulletList(
        spec.similar.map((entry) =>
          entry.slug ? `**${entry.name}** (\`${entry.slug}\`) — ${t(entry.why)}` : `**${entry.name}** — ${t(entry.why)}`,
        ),
      ),
    );
  }

  for (const section of spec.customSections ?? []) {
    blocks.push(`## ${t(section.title)}`);
    blocks.push(t(section.body));
  }

  if (extended && spec.completeness === "full") {
    blocks.push("## Quick Start");
    blocks.push("```css");
    blocks.push(renderCssVariables(spec).trim());
    blocks.push("```");
  }

  return `${blocks.join("\n\n")}\n`;
}
