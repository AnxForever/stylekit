// Generate llms-full.txt with complete style documentation
// This provides AI assistants with all style details in a single file

import { styles } from "@/lib/styles";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { getStyleRecipes } from "@/lib/recipes";
import { getAllArchetypes } from "@/lib/archetypes";

export function generateLlmsFullText(): string {
  const sections: string[] = [];

  // Header
  sections.push(`# StyleKit - Complete AI Documentation

> Last Updated: ${new Date().toISOString().split('T')[0]}

This file contains complete documentation for all design styles, tokens, recipes, and archetypes in StyleKit.

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

StyleKit provides ${styles.length} design styles with machine-readable constraints:

- **Design Tokens**: Precise Tailwind class mappings for borders, shadows, colors, typography
- **Component Recipes**: Parameterized templates with variants (button, card, input, etc.)
- **Layout Archetypes**: Pre-defined page structures (landing, dashboard, blog)
- **AI Rules**: Do's, don'ts, and forbidden patterns for each style
- **Code Examples**: React + Tailwind CSS implementations

---

`);

  // All Styles Summary
  sections.push(`## 2. All Styles Summary

`);

  styles.forEach((style) => {
    const tokens = getStyleTokens(style.slug);
    const recipes = getStyleRecipes(style.slug);
    sections.push(`### ${style.name} (${style.nameEn})
- **Slug**: \`${style.slug}\`
- **Type**: ${style.styleType}
- **Description**: ${style.description}
- **Keywords**: ${style.keywords.join(", ")}
- **Has Tokens**: ${tokens ? "Yes" : "No"}
- **Has Recipes**: ${recipes ? "Yes" : "No"}
- **API**: \`/api/styles/${style.slug}\`

`);
  });

  sections.push(`---

`);

  // Detailed Style Documentation
  sections.push(`## 3. Detailed Style Documentation

`);

  styles.forEach((style) => {
    sections.push(`### ${style.name} (${style.nameEn})

**Slug**: \`${style.slug}\`

#### Description
${style.description}

#### Design Philosophy
${style.philosophy}

#### Do's (必须做)
${style.doList.map((item, i) => `${i + 1}. ${item}`).join("\n")}

#### Don'ts (禁止做)
${style.dontList.map((item, i) => `${i + 1}. ${item}`).join("\n")}

#### AI Rules
\`\`\`
${style.aiRules}
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

  const allRecipes = new Map<string, any>();
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
${recipe.parameters.map((p: any) => `- \`${p.name}\` (${p.type}): ${p.description || "No description"}`).join("\n")}

**Variants**: ${Object.keys(recipe.variants).join(", ")}

**Slots**: ${recipe.slots.map((s: any) => `\`${s.name}\``).join(", ")}

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

### Step-by-Step Generation Process

1. **Select Style**: Choose from available styles based on project requirements
2. **Fetch Tokens**: Get design tokens via \`/api/styles/[slug]/tokens\`
3. **Choose Archetype**: Select layout pattern from \`/api/archetypes\`
4. **Create UI Plan**: Generate structured JSON plan following schema
5. **Validate Plan**: POST to \`/api/ui-plan/validate\`
6. **Generate Components**: Use recipes and tokens to create components
7. **Follow Rules**: Respect do's, don'ts, and forbidden patterns

### Critical Rules

1. **Always use exact token classes** - Don't approximate or substitute
2. **Never use forbidden classes** - Check forbidden lists before generating
3. **Follow component recipes** - Use parameterized templates, not ad-hoc code
4. **Respect archetype structure** - Maintain section order and layout types
5. **Validate before generating** - Create UI Plan first, then code

### API Endpoints Reference

- \`GET /api/styles\` - List all styles
- \`GET /api/styles/[slug]\` - Get complete style pack
- \`GET /api/styles/[slug]/tokens\` - Get tokens only
- \`GET /api/styles/[slug]/recipes\` - Get recipes only
- \`GET /api/archetypes\` - List all archetypes
- \`GET /api/archetypes/[id]\` - Get archetype details
- \`POST /api/ui-plan/validate\` - Validate UI Plan JSON

### Example Workflow

\`\`\`
# Generate a Neo-Brutalist landing page

1. GET /api/styles/neo-brutalist
   → Receive tokens, rules, examples

2. GET /api/archetypes/landing-hero-centered
   → Receive section structure

3. Create UI Plan JSON:
   {
     "meta": {
       "style": "neo-brutalist",
       "archetype": "landing-hero-centered",
       "pageType": "landing"
     },
     "sections": [
       {
         "id": "hero",
         "components": [
           {
             "recipe": "button",
             "variant": "primary",
             "params": { "size": "lg" }
           }
         ]
       }
     ]
   }

4. POST /api/ui-plan/validate
   → Verify plan is valid

5. Generate code using tokens and recipes
   → Use exact classes from required arrays
   → Follow component structure from recipes
   → Respect forbidden patterns
\`\`\`

---

## End of Documentation

For the latest updates and interactive documentation, visit:
- Base documentation: /llms.txt
- Web interface: https://stylekit.example.com

This file follows the llms.txt specification: https://llmstxt.org/
`);

  return sections.join("\n");
}
