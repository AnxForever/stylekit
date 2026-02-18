import type {
  FieldDefinition,
  GeneratorConfig,
  GeneratedFile,
  TemplateDefinition,
} from "./types";

const MAX_SITE_NAME_LENGTH = 80;
const MAX_SITE_DESCRIPTION_LENGTH = 220;
const MAX_TEXT_FIELD_LENGTH = 180;
const MAX_TEXTAREA_FIELD_LENGTH = 2400;
const MAX_OUTPUT_BYTES_WARNING = 1_500_000;

const DANGEROUS_CONTENT_PATTERN = /<\s*script|javascript:|on[a-z]+\s*=/i;
const PLACEHOLDER_PATTERNS: Array<{ pattern: RegExp; label: string }> = [
  { pattern: /\bTODO\b/i, label: "TODO marker" },
  { pattern: /\bLorem ipsum\b/i, label: "lorem ipsum placeholder" },
  { pattern: /Your Company/i, label: "generic company placeholder" },
  { pattern: /example\.com/i, label: "example domain placeholder" },
];
const BLOCKING_PLACEHOLDER_PATTERNS: Array<{ pattern: RegExp; label: string }> = [
  { pattern: /\{\{\s*[\w.-]+\s*\}\}/, label: "unresolved template token" },
  { pattern: /\[insert\s+[^\]]+\]/i, label: "insert placeholder" },
  { pattern: /\bTBD\b/i, label: "TBD marker" },
  {
    pattern: /\u5f85\u8865\u5145|\u5f85\u586b\u5199|\u8bf7\u586b\u5199|\u5728\u6b64\u8f93\u5165|\u66ff\u6362\u4e3a\u4f60\u7684/u,
    label: "unfinished placeholder copy",
  },
];
const IMAGE_WITHOUT_ALT_PATTERN = /<img\b(?![^>]*\balt=)[^>]*>/i;
const VIEWPORT_META_PATTERN = /<meta[^>]+name=["']viewport["'][^>]*>/i;
const HTML_LANG_PATTERN = /<html[^>]+lang=["'][^"']+["'][^>]*>/i;
const HEADING_H1_PATTERN = /<h1[\s>]/i;
const RESPONSIVE_MARKER_PATTERN = /(?:\b(?:sm|md|lg|xl|2xl):)|@media\s*\(/i;
const MARKUP_FILE_PATTERN = /\.(?:html?|tsx|jsx)$/i;
const RESPONSIVE_RELEVANT_FILE_PATTERN = /\.(?:html?|css|tsx|jsx)$/i;

export interface GeneratorValidationIssue {
  code: string;
  message: string;
  path?: string;
}

export interface GeneratorValidationResult {
  errors: GeneratorValidationIssue[];
  warnings: GeneratorValidationIssue[];
}

export interface GeneratorOutputQualityReport {
  errors: string[];
  warnings: string[];
}

export function sanitizeGeneratorConfig(
  config: GeneratorConfig,
  templateDef?: TemplateDefinition
): GeneratorConfig {
  const fieldTypes = buildFieldTypeMap(templateDef);

  return {
    ...config,
    globalContent: {
      ...config.globalContent,
      siteName: sanitizePlainText(config.globalContent.siteName, MAX_SITE_NAME_LENGTH),
      siteDescription: sanitizePlainText(
        config.globalContent.siteDescription,
        MAX_SITE_DESCRIPTION_LENGTH,
        true
      ),
    },
    sections: config.sections.map((section) => ({
      ...section,
      content: Object.fromEntries(
        Object.entries(section.content).map(([fieldId, value]) => {
          const fieldType = fieldTypes.get(section.id)?.get(fieldId) ?? "text";
          const maxLength = fieldType === "textarea"
            ? MAX_TEXTAREA_FIELD_LENGTH
            : MAX_TEXT_FIELD_LENGTH;
          return [fieldId, sanitizePlainText(value, maxLength, fieldType === "textarea")];
        })
      ),
    })),
  };
}

export function validateGeneratorConfig(
  config: GeneratorConfig,
  templateDef?: TemplateDefinition
): GeneratorValidationResult {
  const errors: GeneratorValidationIssue[] = [];
  const warnings: GeneratorValidationIssue[] = [];

  const siteName = config.globalContent.siteName.trim();
  const siteDescription = config.globalContent.siteDescription.trim();

  if (!siteName) {
    errors.push({
      code: "SITE_NAME_REQUIRED",
      message: "Site name is required before export.",
      path: "globalContent.siteName",
    });
  } else if (siteName.length > MAX_SITE_NAME_LENGTH) {
    errors.push({
      code: "SITE_NAME_TOO_LONG",
      message: `Site name must be ${MAX_SITE_NAME_LENGTH} characters or fewer.`,
      path: "globalContent.siteName",
    });
  }

  if (siteDescription.length > MAX_SITE_DESCRIPTION_LENGTH) {
    warnings.push({
      code: "SITE_DESCRIPTION_TRUNCATED",
      message: `Site description over ${MAX_SITE_DESCRIPTION_LENGTH} characters will be trimmed.`,
      path: "globalContent.siteDescription",
    });
  }

  if (DANGEROUS_CONTENT_PATTERN.test(siteName) || DANGEROUS_CONTENT_PATTERN.test(siteDescription)) {
    errors.push({
      code: "GLOBAL_CONTENT_UNSAFE",
      message: "Global content contains unsafe script-like fragments.",
      path: "globalContent",
    });
  }

  const enabledSections = config.sections.filter((section) => section.enabled);
  if (enabledSections.length === 0) {
    errors.push({
      code: "NO_SECTION_ENABLED",
      message: "Enable at least one section before export.",
      path: "sections",
    });
  }

  const fieldTypes = buildFieldTypeMap(templateDef);
  for (const section of enabledSections) {
    if (templateDef && !fieldTypes.has(section.id)) {
      warnings.push({
        code: "UNKNOWN_SECTION",
        message: `Section "${section.id}" is not part of template "${templateDef.type}".`,
        path: `sections.${section.id}`,
      });
      continue;
    }

    let nonEmptyFieldCount = 0;
    for (const [fieldId, rawValue] of Object.entries(section.content)) {
      const value = rawValue.trim();
      const path = `sections.${section.id}.${fieldId}`;
      if (value.length > 0) {
        nonEmptyFieldCount += 1;
      }

      if (DANGEROUS_CONTENT_PATTERN.test(value)) {
        errors.push({
          code: "UNSAFE_FIELD_CONTENT",
          message: `Field "${fieldId}" contains unsafe script-like fragments.`,
          path,
        });
      }

      if (value.includes("`") || value.includes("${")) {
        warnings.push({
          code: "UNSAFE_TEMPLATE_TOKENS",
          message: `Field "${fieldId}" contains template control characters that will be sanitized.`,
          path,
        });
      }

      const fieldType = fieldTypes.get(section.id)?.get(fieldId) ?? "text";
      const maxLength = fieldType === "textarea"
        ? MAX_TEXTAREA_FIELD_LENGTH
        : MAX_TEXT_FIELD_LENGTH;
      if (value.length > maxLength) {
        warnings.push({
          code: "FIELD_TOO_LONG",
          message: `Field "${fieldId}" exceeds ${maxLength} characters and will be trimmed.`,
          path,
        });
      }
    }

    if (nonEmptyFieldCount === 0) {
      errors.push({
        code: "SECTION_EMPTY",
        message: `Section "${section.id}" has no content.`,
        path: `sections.${section.id}`,
      });
    }
  }

  return { errors, warnings };
}

export function evaluateGeneratedFiles(
  config: GeneratorConfig,
  files: GeneratedFile[]
): GeneratorOutputQualityReport {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (files.length === 0) {
    errors.push("Generator produced no files.");
    return { errors, warnings };
  }

  const requiredFiles = config.outputFormat === "react"
    ? [
      "package.json",
      "src/App.tsx",
      "README.md",
      "stylekit.config.json",
      "CONTENT_MAP.md",
      "GENERATOR_BRIEF.md",
    ]
    : config.outputFormat === "nextjs"
      ? [
        "package.json",
        "app/layout.tsx",
        "app/page.tsx",
        "README.md",
        "stylekit.config.json",
        "CONTENT_MAP.md",
        "GENERATOR_BRIEF.md",
      ]
      : [
        "index.html",
        "README.md",
        "stylekit.config.json",
        "CONTENT_MAP.md",
        "GENERATOR_BRIEF.md",
      ];

  for (const requiredFile of requiredFiles) {
    if (!files.some((file) => file.name === requiredFile)) {
      errors.push(`Missing required output file: ${requiredFile}`);
    }
  }

  const seen = new Set<string>();
  for (const file of files) {
    if (seen.has(file.name)) {
      errors.push(`Duplicate output file detected: ${file.name}`);
      continue;
    }
    seen.add(file.name);

    if (!file.content.trim()) {
      errors.push(`Output file is empty: ${file.name}`);
      continue;
    }

    for (const placeholder of PLACEHOLDER_PATTERNS) {
      if (placeholder.pattern.test(file.content)) {
        warnings.push(`${file.name} still contains ${placeholder.label}.`);
      }
    }

    for (const placeholder of BLOCKING_PLACEHOLDER_PATTERNS) {
      if (placeholder.pattern.test(file.content)) {
        errors.push(`${file.name} contains blocking placeholder: ${placeholder.label}.`);
      }
    }

    if (isMarkupFile(file) && IMAGE_WITHOUT_ALT_PATTERN.test(file.content)) {
      warnings.push(`${file.name} includes <img> tags without alt text.`);
    }
  }

  const htmlEntry = getFileByName(files, "index.html");
  if ((config.outputFormat === "html" || config.outputFormat === "react") && htmlEntry) {
    if (!VIEWPORT_META_PATTERN.test(htmlEntry.content)) {
      errors.push("index.html is missing a viewport meta tag for mobile rendering.");
    }
    if (!HTML_LANG_PATTERN.test(htmlEntry.content)) {
      warnings.push("index.html is missing an explicit html lang attribute.");
    }
  }

  const nextLayout = getFileByName(files, "app/layout.tsx");
  if (config.outputFormat === "nextjs" && nextLayout && !HTML_LANG_PATTERN.test(nextLayout.content)) {
    warnings.push("app/layout.tsx is missing an explicit html lang attribute.");
  }

  const allMarkupContent = collectMarkupContent(files);
  if (allMarkupContent && !HEADING_H1_PATTERN.test(allMarkupContent)) {
    warnings.push("Generated output does not include an <h1> heading.");
  }

  const hasResponsiveSignals = files
    .filter((file) => RESPONSIVE_RELEVANT_FILE_PATTERN.test(file.name))
    .some((file) => RESPONSIVE_MARKER_PATTERN.test(file.content));
  if (!hasResponsiveSignals) {
    warnings.push("No responsive breakpoints detected in output. Add mobile/tablet adaptations.");
  }

  const totalBytes = files.reduce(
    (sum, file) => sum + new TextEncoder().encode(file.content).length,
    0
  );
  if (totalBytes > MAX_OUTPUT_BYTES_WARNING) {
    warnings.push(
      `Large output bundle (${Math.round(totalBytes / 1024)} KB). Consider simplifying content.`
    );
  }

  return { errors, warnings };
}

function getFileByName(files: GeneratedFile[], fileName: string): GeneratedFile | undefined {
  return files.find((file) => file.name === fileName);
}

function isMarkupFile(file: GeneratedFile): boolean {
  return MARKUP_FILE_PATTERN.test(file.name);
}

function collectMarkupContent(files: GeneratedFile[]): string {
  return files
    .filter((file) => isMarkupFile(file))
    .map((file) => file.content)
    .join("\n");
}

function sanitizePlainText(
  input: string,
  maxLength: number,
  allowMultiline = false
): string {
  let value = input.replace(/\r\n?/g, "\n");
  value = value.replace(/\u0000/g, "");
  value = value.replace(/<\s*\/?\s*script[^>]*>/gi, "");
  value = value.replace(/javascript:/gi, "");
  value = value.replace(/\$\{/g, "$ (");
  value = value.replaceAll("{", "(");
  value = value.replaceAll("}", ")");
  value = value.replaceAll("`", "'");
  value = value.replaceAll("<", "[");
  value = value.replaceAll(">", "]");

  if (!allowMultiline) {
    value = value.replace(/\s+/g, " ");
  }

  value = value.trim();
  if (value.length > maxLength) {
    value = value.slice(0, maxLength).trimEnd();
  }

  return value;
}

function buildFieldTypeMap(
  templateDef?: TemplateDefinition
): Map<string, Map<string, FieldDefinition["type"]>> {
  const fieldTypes = new Map<string, Map<string, FieldDefinition["type"]>>();
  if (!templateDef) {
    return fieldTypes;
  }

  for (const section of templateDef.sections) {
    fieldTypes.set(
      section.id,
      new Map(section.fields.map((field) => [field.id, field.type]))
    );
  }
  return fieldTypes;
}
