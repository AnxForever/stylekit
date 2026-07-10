// Generate llms-full.txt with complete style documentation
// This provides AI assistants with all style details in a single file

import { styles } from "@/lib/styles";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { getStyleRecipes } from "@/lib/recipes";
import type { ComponentRecipe, RecipeParameter, RecipeSlot } from "@/lib/recipes/types";
import { getAllArchetypes } from "@/lib/archetypes";
import { localizedList, localizedString } from "@/lib/styles/locale-content";
import { getSiteBaseUrl } from "@/lib/site-url";

const BASE_URL = getSiteBaseUrl();

export function generateLlmsFullText(): string {
  const sections: string[] = [];

  // Header
  sections.push(`# StyleKit - Generated Catalog Reference

This file is generated from the current StyleKit catalog. It summarizes all styles and includes selected token fields, implementation rules, component examples, recipe summaries, and layout archetypes. For a smaller index, use ${BASE_URL}/llms.txt. For one style at a time, use ${BASE_URL}/api/styles/{slug}/md.

---

`);

  // Table of Contents
  sections.push(`## Table of Contents

1. Overview
2. All Styles Summary
3. Detailed Style Documentation
4. Component Recipes Registry
5. Layout Archetypes Registry
6. Usage Guidelines

---

`);

  // Overview
  sections.push(`## 1. Overview

StyleKit provides ${styles.length} curated design styles with machine-readable constraints:

- **Design Tokens**: Precise Tailwind class mappings for borders, shadows, colors, typography
- **Component Recipes**: Parameterized templates with variants (button, card, input, etc.)
- **Layout Archetypes**: Pre-defined page structures (landing, dashboard, blog)
- **AI Rules**: Do's, don'ts, and forbidden patterns for each style
- **Code Examples**: React + Tailwind CSS button and card examples in this export

---

`);

  // All Styles Summary
  sections.push(`## 2. All Styles Summary

`);

  styles.forEach((style) => {
    const tokens = getStyleTokens(style.slug);
    const recipes = getStyleRecipes(style.slug);
    const description = localizedString("en", style.description, style.descriptionEn);
    sections.push(`### ${style.name} (${style.nameEn})
- **Slug**: \`${style.slug}\`
- **Type**: ${style.styleType}
- **Description**: ${description}
- **Keywords**: ${localizedList("en", style.keywords, style.keywordsEn).join(", ")}
- **Has Tokens**: ${tokens ? "Yes" : "No"}
- **Has Recipes**: ${recipes ? "Yes" : "No"}
- **Style Page**: ${BASE_URL}/en/styles/${style.slug}
- **Markdown**: ${BASE_URL}/api/styles/${style.slug}/md

`);
  });

  sections.push(`---

`);

  // Detailed Style Documentation
  sections.push(`## 3. Detailed Style Documentation

`);

  styles.forEach((style) => {
    const description = localizedString("en", style.description, style.descriptionEn);
    const philosophy = localizedString("en", style.philosophy, style.philosophyEn);
    const doList = localizedList("en", style.doList, style.doListEn);
    const dontList = localizedList("en", style.dontList, style.dontListEn);
    const aiRules = localizedString("en", style.aiRules, style.aiRulesEn);
    sections.push(`### ${style.name} (${style.nameEn})

**Slug**: \`${style.slug}\`

#### Description
${description}

#### Design Philosophy
${philosophy}

#### Do's (必须做)
${doList.map((item, i) => `${i + 1}. ${item}`).join("\n")}

#### Don'ts (禁止做)
${dontList.map((item, i) => `${i + 1}. ${item}`).join("\n")}

#### AI Rules
\`\`\`
${aiRules}
\`\`\`

`);

    // Add tokens if available
    const tokens = getStyleTokens(style.slug);
    if (tokens) {
      sections.push(`#### Design Tokens

**Border**
- Width: \`${tokens.border.width}\`
- Color: \`${tokens.border.color}\`
- Radius: \`${tokens.border.radius}\`

**Shadow**
- Small: \`${tokens.shadow.sm}\`
- Medium: \`${tokens.shadow.md}\`
- Large: \`${tokens.shadow.lg}\`
- Hover: \`${tokens.shadow.hover}\`

**Interaction**
- Hover Translate: \`${tokens.interaction.hoverTranslate || "none"}\`
- Transition: \`${tokens.interaction.transition}\`

**Typography**
- Heading: \`${tokens.typography.heading}\`
- Body: \`${tokens.typography.body}\`

**Required Classes**

Button:
\`\`\`
${tokens.required.button.join("\n")}
\`\`\`

Card:
\`\`\`
${tokens.required.card.join("\n")}
\`\`\`

Input:
\`\`\`
${tokens.required.input.join("\n")}
\`\`\`

**Forbidden**

Classes: ${tokens.forbidden.classes.slice(0, 10).map(c => `\`${c}\``).join(", ")}

Patterns: ${tokens.forbidden.patterns.map(p => `\`${p}\``).join(", ")}

`);
    }

    // Add recipes if available
    const recipes = getStyleRecipes(style.slug);
    if (recipes) {
      sections.push(`#### Component Recipes

Available recipes: ${Object.keys(recipes.recipes).map(id => `\`${id}\``).join(", ")}

`);
    }

    // Add component examples
    sections.push(`#### Component Examples

**Button**
\`\`\`html
${style.components.button?.code || "No example available"}
\`\`\`

**Card**
\`\`\`html
${style.components.card?.code || "No example available"}
\`\`\`

`);

    sections.push(`---

`);
  });

  // Component Recipes Registry
  sections.push(`## 4. Component Recipes Registry

Component recipes provide parameterized templates for generating consistent components.

`);

  const allRecipes = new Map<string, ComponentRecipe>();
  styles.forEach((style) => {
    const recipes = getStyleRecipes(style.slug);
    if (recipes) {
      Object.entries(recipes.recipes).forEach(([id, recipe]) => {
        if (!allRecipes.has(id)) {
          allRecipes.set(id, recipe);
        }
      });
    }
  });

  allRecipes.forEach((recipe, id) => {
    sections.push(`### ${recipe.name} (\`${id}\`)

**Description**: ${recipe.description}

**Parameters**:
${recipe.parameters.map((p: RecipeParameter) => `- \`${p.id}\` (${p.type}): ${p.label}`).join("\n")}

**Variants**: ${Object.keys(recipe.variants).join(", ")}

**Slots**: ${recipe.slots.map((s: RecipeSlot) => `\`${s.id}\``).join(", ")}

`);
  });

  sections.push(`---

`);

  // Layout Archetypes Registry
  sections.push(`## 5. Layout Archetypes Registry

Layout archetypes define pre-structured page patterns.

`);

  const archetypes = getAllArchetypes();
  const categories = ["landing", "dashboard", "blog", "form", "list"];

  categories.forEach((category) => {
    const categoryArchetypes = archetypes.filter((a) => a.category === category);
    if (categoryArchetypes.length > 0) {
      sections.push(`### ${category.charAt(0).toUpperCase() + category.slice(1)} Pages

`);
      categoryArchetypes.forEach((archetype) => {
        sections.push(`#### ${archetype.name} (\`${archetype.id}\`)

${archetype.description}

**Sections**:
${archetype.sections.map((s) => `- \`${s.id}\`: ${s.name} (${s.layout.type})`).join("\n")}

**Responsive Behavior**:
- Mobile: ${archetype.responsive.mobile}
- Tablet: ${archetype.responsive.tablet}
- Desktop: ${archetype.responsive.desktop}

**Recommended Styles**: ${archetype.recommendedStyles?.join(", ") || "Any"}

`);
      });
    }
  });

  sections.push(`---

`);

  // Usage Guidelines
  sections.push(`## 6. Usage Guidelines

### Core Product Flows

#### Path A: Style -> Rules -> Code

1. **Select Style**: Browse preset styles via ${BASE_URL}/en/styles
2. **Copy Rules**: Use the selected style's tokens, component recipes, and AI rules
3. **Generate Elsewhere**: Apply those constraints inside your own editor or AI coding workflow

#### Path B: Template -> Prompt -> Build

1. **Choose Structure**: Start from a page template in ${BASE_URL}/en/templates
2. **Choose Prompt**: Copy a prompt from ${BASE_URL}/en/ui-prompts or a focused prompt page
3. **Build**: Combine the template structure with the selected style rules

### Critical Rules

1. **Always use exact token classes** - Don't approximate or substitute
2. **Never use forbidden classes** - Check forbidden lists before generating
3. **Follow component recipes** - Use parameterized templates, not ad-hoc code
4. **Preserve style evidence** - Keep palette, spacing rhythm, and motion cues from the selected StyleKit page
5. **Review before shipping** - Check the generated UI against the selected style rules

### Example Workflow (Path A)

\`\`\`
# Use a StyleKit style as generation constraints

1. Open ${BASE_URL}/en/styles and choose a target style

2. Copy style tokens, component recipes, and AI rules

3. Open ${BASE_URL}/en/templates or ${BASE_URL}/en/ui-prompts
   -> choose structure and prompt scaffolding
   -> generate code inside your own coding workflow
\`\`\`

---

## End of Generated Reference

For the latest updates and interactive documentation, visit:
- Concise index: ${BASE_URL}/llms.txt
- Web interface: ${BASE_URL}

This file follows the llms.txt specification: https://llmstxt.org/
`);
  return sections.join("\n");
}
