import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { getStyleRecipes } from "@/lib/recipes";
import { resolveStyleBySlug } from "@/lib/styles/community-runtime";
import { localizedList, localizedString } from "@/lib/styles/locale-content";

/**
 * /api/styles/[slug]/md - Markdown variant for LLM consumption
 *
 * Per the llms.txt specification, .md variants improve LLM parsing.
 * Returns a human-readable Markdown document with all style details.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const locale = new URL(request.url).searchParams.get("locale") === "zh" ? "zh" : "en";
  const resolved = await resolveStyleBySlug(slug);
  const style = resolved?.style;

  if (!style) {
    return new Response("# Error\n\nStyle not found", {
      status: 404,
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
  }

  const tokens = resolved.tokens ?? getStyleTokens(slug);
  const recipes =
    resolved.source === "static" ? getStyleRecipes(slug) : null;
  const name = locale === "zh" ? style.name : style.nameEn || style.name;
  const secondaryName = locale === "zh" ? style.nameEn : style.name;
  const description = localizedString(locale, style.description, style.descriptionEn);
  const philosophy = localizedString(locale, style.philosophy, style.philosophyEn);
  const keywords = localizedList(locale, style.keywords, style.keywordsEn);
  const doList = localizedList(locale, style.doList, style.doListEn);
  const dontList = localizedList(locale, style.dontList, style.dontListEn);
  const aiRules = localizedString(locale, style.aiRules, style.aiRulesEn);

  const sections: string[] = [];

  // Header
  sections.push(`# ${name}${secondaryName && secondaryName !== name ? ` (${secondaryName})` : ""}

> ${description}

**Slug**: \`${style.slug}\`
**Type**: ${style.styleType}
**Keywords**: ${keywords.join(", ")}

---

## Design Philosophy

${philosophy}

---

## Do's

${doList.map((item) => `- ${item}`).join("\n")}

## Don'ts

${dontList.map((item) => `- ${item}`).join("\n")}

---

## AI Rules

\`\`\`
${aiRules}
\`\`\`

---

## Colors

- **Primary**: \`${style.colors.primary}\`
- **Secondary**: \`${style.colors.secondary}\`
- **Accent**: ${style.colors.accent.map((c) => `\`${c}\``).join(", ")}

---
`);

  // Tokens section
  if (tokens) {
    sections.push(`## Design Tokens

### Border
- Width: \`${tokens.border.width}\`
- Color: \`${tokens.border.color}\`
- Radius: \`${tokens.border.radius}\`

### Shadow
- Small: \`${tokens.shadow.sm}\`
- Medium: \`${tokens.shadow.md}\`
- Large: \`${tokens.shadow.lg}\`
- Hover: \`${tokens.shadow.hover}\`

### Interaction
- Transition: \`${tokens.interaction.transition}\`
${tokens.interaction.hoverTranslate ? `- Hover Translate: \`${tokens.interaction.hoverTranslate}\`` : ""}
${tokens.interaction.hoverScale ? `- Hover Scale: \`${tokens.interaction.hoverScale}\`` : ""}

### Typography
- Heading: \`${tokens.typography.heading}\`
- Body: \`${tokens.typography.body}\`

### Forbidden Classes
${tokens.forbidden.classes.map((c) => `- \`${c}\``).join("\n")}

---
`);
  }

  // Components section
  sections.push(`## Components

### Button

${style.components.button.description}

\`\`\`tsx
${style.components.button.code}
\`\`\`

### Card

${style.components.card.description}

\`\`\`tsx
${style.components.card.code}
\`\`\`

### Input

${style.components.input.description}

\`\`\`tsx
${style.components.input.code}
\`\`\`
`);

  // Recipes section
  if (recipes) {
    sections.push(`---

## Component Recipes

`);
    for (const recipe of Object.values(recipes.recipes)) {
      sections.push(`### ${recipe.name}

${recipe.description}

**Parameters**:
${recipe.parameters.map((p) => `- \`${p.id}\` (${p.type}): ${p.label}${p.default ? ` [default: ${p.default}]` : ""}`).join("\n")}

**Variants**: ${Object.keys(recipe.variants).join(", ")}
`);
    }
  }

  // Example Prompts
  if (style.examplePrompts && style.examplePrompts.length > 0) {
    sections.push(`---

## Example Prompts

`);
    for (const prompt of style.examplePrompts) {
      sections.push(`### ${prompt.titleEn}

${prompt.descriptionEn}

\`\`\`
${prompt.prompt}
\`\`\`
`);
    }
  }

  // Global CSS
  if (style.globalCss) {
    sections.push(`---

## Global CSS

\`\`\`css
${style.globalCss}
\`\`\`
`);
  }

  // Compatible styles
  if (style.compatibleWith && style.compatibleWith.length > 0) {
    sections.push(`---

## Compatible With

This style works well with:
${style.compatibleWith.map((s) => `- \`${s}\``).join("\n")}
`);
  }

  const content = sections.join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Language": locale === "zh" ? "zh-CN" : "en",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
