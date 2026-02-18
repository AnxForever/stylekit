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

function buildManifest(config: GeneratorConfig, styleInput: StyleInput): GeneratorManifest {
  return {
    generatedAt: new Date().toISOString(),
    generator: {
      templateType: config.templateType,
      outputFormat: config.outputFormat,
    },
    style: buildStyleMeta(styleInput),
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

export function generateGeneratorSupportFiles(
  config: GeneratorConfig,
  styleInput: StyleInput
): GeneratedFile[] {
  const manifest = buildManifest(config, styleInput);

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
  ];
}
