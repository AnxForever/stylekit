import { getFrontendReadiness } from "@/lib/styles";
import type { FrontendReadinessProfile } from "@/lib/styles";
import type { GeneratedFile, GeneratorConfig, StyleInput } from "./types";

interface GeneratorManifest {
  generatedAt: string;
  generator: {
    templateType: GeneratorConfig["templateType"];
    outputFormat: GeneratorConfig["outputFormat"];
  };
  style: {
    type: StyleInput["type"];
    id: string;
    name: string;
  };
  readiness: {
    source: FrontendReadinessProfile["source"];
    coverage: FrontendReadinessProfile["coverage"];
    themeModes: FrontendReadinessProfile["themeModes"];
    darkModeSupport: FrontendReadinessProfile["darkMode"]["support"];
    promptAddons: string[];
  } | null;
  globalContent: GeneratorConfig["globalContent"];
  sections: Array<{
    id: string;
    enabled: boolean;
    fieldCount: number;
    filledFieldCount: number;
  }>;
}

interface BriefTodo {
  sectionId: string;
  fieldId: string;
}

function buildStyleMeta(styleInput: StyleInput): GeneratorManifest["style"] {
  if (styleInput.type === "builtin") {
    return {
      type: "builtin",
      id: styleInput.style.slug,
      name: styleInput.style.nameEn,
    };
  }

  return {
    type: "custom",
    id: styleInput.style.id,
    name: styleInput.style.nameEn,
  };
}

function buildReadiness(styleInput: StyleInput): FrontendReadinessProfile | null {
  if (styleInput.type === "custom") {
    return null;
  }
  return getFrontendReadiness(styleInput.style);
}

function countFilledFields(content: Record<string, string>): number {
  return Object.values(content).filter((value) => value.trim().length > 0).length;
}

function countWords(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function collectMissingFields(config: GeneratorConfig): BriefTodo[] {
  const todos: BriefTodo[] = [];
  for (const section of config.sections) {
    if (!section.enabled) continue;

    for (const [fieldId, value] of Object.entries(section.content)) {
      if (!value.trim()) {
        todos.push({ sectionId: section.id, fieldId });
      }
    }
  }
  return todos;
}

function buildGeneratorBriefMarkdown(
  config: GeneratorConfig,
  styleInput: StyleInput
): string {
  const lines: string[] = [];
  const enabledSections = config.sections.filter((section) => section.enabled);
  const totalEnabledFields = enabledSections.reduce(
    (sum, section) => sum + Object.keys(section.content).length,
    0
  );
  const filledEnabledFields = enabledSections.reduce(
    (sum, section) => sum + countFilledFields(section.content),
    0
  );
  const completeness = totalEnabledFields === 0
    ? 0
    : Math.round((filledEnabledFields / totalEnabledFields) * 100);
  const siteNameWords = countWords(config.globalContent.siteName);
  const siteDescriptionWords = countWords(config.globalContent.siteDescription);
  const missingFields = collectMissingFields(config);
  const styleName = styleInput.type === "builtin"
    ? styleInput.style.nameEn
    : styleInput.style.nameEn;

  lines.push("# Generator Brief");
  lines.push("");
  lines.push("## Snapshot");
  lines.push(`- Template: \`${config.templateType}\``);
  lines.push(`- Output: \`${config.outputFormat}\``);
  lines.push(`- Style: ${styleName}`);
  lines.push(`- Enabled sections: ${enabledSections.length}/${config.sections.length}`);
  lines.push(`- Filled fields: ${filledEnabledFields}/${totalEnabledFields} (${completeness}%)`);
  lines.push("");
  lines.push("## Content Signals");
  lines.push(`- Site name words: ${siteNameWords}`);
  lines.push(`- Site description words: ${siteDescriptionWords}`);
  lines.push(`- Missing fields: ${missingFields.length}`);
  lines.push("");

  if (missingFields.length > 0) {
    lines.push("## Recommended TODOs");
    for (const todo of missingFields.slice(0, 20)) {
      lines.push(`- [ ] \`${todo.sectionId}.${todo.fieldId}\``);
    }
    if (missingFields.length > 20) {
      lines.push(`- [ ] ...and ${missingFields.length - 20} more fields`);
    }
    lines.push("");
  }

  lines.push("## Section Focus");
  for (const section of config.sections) {
    const entries = Object.entries(section.content);
    const preview = entries
      .filter(([, value]) => value.trim().length > 0)
      .slice(0, 3)
      .map(([fieldId, value]) => `- \`${fieldId}\`: ${value.trim()}`)
      .join("\n");

    lines.push(`### ${section.id}`);
    lines.push(`- Enabled: ${section.enabled ? "yes" : "no"}`);
    lines.push(`- Filled: ${countFilledFields(section.content)}/${entries.length}`);
    if (preview) {
      lines.push(preview);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function buildManifest(
  config: GeneratorConfig,
  styleInput: StyleInput,
  readiness: FrontendReadinessProfile | null
): GeneratorManifest {
  return {
    generatedAt: new Date().toISOString(),
    generator: {
      templateType: config.templateType,
      outputFormat: config.outputFormat,
    },
    style: buildStyleMeta(styleInput),
    readiness: readiness
      ? {
          source: readiness.source,
          coverage: readiness.coverage,
          themeModes: readiness.themeModes,
          darkModeSupport: readiness.darkMode.support,
          promptAddons: readiness.promptAddons,
        }
      : null,
    globalContent: config.globalContent,
    sections: config.sections.map((section) => ({
      id: section.id,
      enabled: section.enabled,
      fieldCount: Object.keys(section.content).length,
      filledFieldCount: countFilledFields(section.content),
    })),
  };
}

function buildContentMapMarkdown(config: GeneratorConfig): string {
  const lines: string[] = [];

  lines.push("# Content Map");
  lines.push("");
  lines.push(`- Template: \`${config.templateType}\``);
  lines.push(`- Output: \`${config.outputFormat}\``);
  lines.push(`- Site Name: ${config.globalContent.siteName || "(empty)"}`);
  lines.push(`- Site Description: ${config.globalContent.siteDescription || "(empty)"}`);
  lines.push("");

  for (const section of config.sections) {
    lines.push(`## ${section.id}`);
    lines.push(`- Enabled: ${section.enabled ? "yes" : "no"}`);

    const entries = Object.entries(section.content);
    if (entries.length === 0) {
      lines.push("- Fields: (none)");
      lines.push("");
      continue;
    }

    lines.push("- Fields:");
    for (const [fieldId, value] of entries) {
      const displayValue = value.trim() ? value : "(empty)";
      lines.push(`  - \`${fieldId}\`: ${displayValue}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function buildFrontendReadinessMarkdown(
  styleInput: StyleInput,
  readiness: FrontendReadinessProfile | null
): string {
  const styleName = styleInput.type === "builtin"
    ? styleInput.style.nameEn
    : styleInput.style.nameEn;
  const lines: string[] = [];

  lines.push("# Frontend Readiness");
  lines.push("");
  lines.push(`- Style: ${styleName}`);

  if (!readiness) {
    lines.push("- Source: custom style");
    lines.push("");
    lines.push("This custom style does not have a curated StyleKit readiness contract yet.");
    lines.push("Before production use, define dark mode tokens, interactive states, loading states, empty states, error states, focus-visible behavior, and reduced-motion behavior.");
    lines.push("");
    return lines.join("\n");
  }

  lines.push(`- Source: ${readiness.source}`);
  lines.push(`- Overall coverage: ${readiness.coverage.overall}%`);
  lines.push(`- Theme modes: ${readiness.themeModes.join(", ")}`);
  lines.push("");

  lines.push("## Coverage");
  lines.push("");
  lines.push(`- Dark mode: ${readiness.coverage.darkMode}% (${readiness.darkMode.support})`);
  lines.push(`- UI states: ${readiness.coverage.states}%`);
  lines.push(`- Motion: ${readiness.coverage.motion}% (${readiness.motion.support})`);
  lines.push(`- Accessibility: ${readiness.coverage.accessibility}% (${readiness.accessibility.support})`);
  lines.push(`- Performance: ${readiness.coverage.performance}% (${readiness.performance.support})`);
  lines.push("");

  lines.push("## Required States");
  lines.push("");
  for (const [state, check] of Object.entries(readiness.states)) {
    lines.push(`- ${state}: ${check.support}`);
  }
  lines.push("");

  lines.push("## Dark Mode");
  lines.push("");
  lines.push(`- Strategy: ${readiness.darkMode.strategy}`);
  for (const item of readiness.darkMode.guidance) {
    lines.push(`- ${item}`);
  }
  lines.push("");

  lines.push("## Accessibility");
  lines.push("");
  lines.push(`- Focus: ${readiness.accessibility.focus}`);
  lines.push(`- Target size: ${readiness.accessibility.targetSize}`);
  lines.push(`- ARIA: ${readiness.accessibility.aria}`);
  for (const item of readiness.accessibility.guidance) {
    lines.push(`- ${item}`);
  }
  lines.push("");

  lines.push("## Motion");
  lines.push("");
  lines.push(`- Duration: ${readiness.motion.duration}`);
  lines.push(`- Easing: ${readiness.motion.easing}`);
  lines.push(`- Reduced motion: ${readiness.motion.reducedMotion}`);
  for (const item of readiness.motion.guidance) {
    lines.push(`- ${item}`);
  }
  lines.push("");

  lines.push("## Performance");
  lines.push("");
  for (const cost of readiness.performance.costs) {
    lines.push(`- Cost: ${cost}`);
  }
  for (const item of readiness.performance.guidance) {
    lines.push(`- ${item}`);
  }
  lines.push("");

  lines.push("## Prompt Add-ons");
  lines.push("");
  for (const item of readiness.promptAddons) {
    lines.push(`- ${item}`);
  }
  lines.push("");

  return lines.join("\n");
}

export function generateGeneratorSupportFiles(
  config: GeneratorConfig,
  styleInput: StyleInput
): GeneratedFile[] {
  const readiness = buildReadiness(styleInput);
  const manifest = buildManifest(config, styleInput, readiness);

  return [
    {
      name: "stylekit.config.json",
      type: "json",
      content: JSON.stringify(manifest, null, 2),
    },
    {
      name: "CONTENT_MAP.md",
      type: "md",
      content: buildContentMapMarkdown(config),
    },
    {
      name: "GENERATOR_BRIEF.md",
      type: "md",
      content: buildGeneratorBriefMarkdown(config, styleInput),
    },
    {
      name: "FRONTEND_READINESS.md",
      type: "md",
      content: buildFrontendReadinessMarkdown(styleInput, readiness),
    },
  ];
}
