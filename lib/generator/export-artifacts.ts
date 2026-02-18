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
  ];
}
