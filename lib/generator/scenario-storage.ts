import type { GeneratorConfig, SectionConfig, TemplateType } from "./types";
import type { GeneratorScenarioPack } from "./scenario-packs";

const STORAGE_KEY = "stylekit-generator-custom-scenarios-v1";
const MAX_CUSTOM_SCENARIOS = 30;
const MAX_NAME_LENGTH = 80;
const MAX_DESCRIPTION_LENGTH = 220;

type CustomScenarioPack = GeneratorScenarioPack & {
  source: "custom";
  createdAt: string;
  updatedAt: string;
};

export type StoredScenarioPack = CustomScenarioPack;

interface ImportedScenarioPayload {
  templateType?: unknown;
  name?: unknown;
  description?: unknown;
  globalContent?: unknown;
  sections?: unknown;
}

interface ScenarioExportPayload {
  version: 1;
  exportedAt: string;
  scenarios: StoredScenarioPack[];
}

function normalizeText(value: string, maxLength: number): string {
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function generateCustomScenarioId(): string {
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function isTemplateType(value: unknown): value is TemplateType {
  return (
    value === "landing" ||
    value === "portfolio" ||
    value === "blog" ||
    value === "dashboard"
  );
}

function normalizeScenarioCandidate(
  candidate: ImportedScenarioPayload,
  fallbackTemplateType?: TemplateType
): StoredScenarioPack | null {
  const templateType = isTemplateType(candidate.templateType)
    ? candidate.templateType
    : fallbackTemplateType;
  if (!templateType) return null;

  const name = typeof candidate.name === "string"
    ? normalizeText(candidate.name, MAX_NAME_LENGTH)
    : "";
  if (!name) return null;

  const description = typeof candidate.description === "string"
    ? normalizeText(candidate.description, MAX_DESCRIPTION_LENGTH)
    : `Custom preset for ${templateType}`;

  const globalContent = candidate.globalContent as {
    siteName?: unknown;
    siteDescription?: unknown;
  } | undefined;
  const siteName = typeof globalContent?.siteName === "string"
    ? globalContent.siteName
    : "";
  const siteDescription = typeof globalContent?.siteDescription === "string"
    ? globalContent.siteDescription
    : "";

  const sectionsCandidate = candidate.sections as Record<string, unknown> | undefined;
  if (!sectionsCandidate || typeof sectionsCandidate !== "object") {
    return null;
  }

  const sections: StoredScenarioPack["sections"] = {};
  for (const [sectionId, patch] of Object.entries(sectionsCandidate)) {
    if (!patch || typeof patch !== "object") continue;
    const typedPatch = patch as {
      enabled?: unknown;
      content?: unknown;
    };

    const contentCandidate = typedPatch.content as Record<string, unknown> | undefined;
    const content: Record<string, string> = {};
    if (contentCandidate && typeof contentCandidate === "object") {
      for (const [fieldId, value] of Object.entries(contentCandidate)) {
        if (typeof value === "string") {
          content[fieldId] = value;
        }
      }
    }

    sections[sectionId] = {
      enabled: typeof typedPatch.enabled === "boolean" ? typedPatch.enabled : undefined,
      content,
    };
  }

  if (Object.keys(sections).length === 0) {
    return null;
  }

  const now = new Date().toISOString();
  return {
    id: generateCustomScenarioId(),
    source: "custom",
    templateType,
    name,
    description,
    globalContent: {
      siteName,
      siteDescription,
    },
    sections,
    createdAt: now,
    updatedAt: now,
  };
}

function readStorage(): CustomScenarioPack[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item): item is CustomScenarioPack => {
        if (!item || typeof item !== "object") return false;
        const candidate = item as Partial<CustomScenarioPack>;
        return (
          candidate.source === "custom" &&
          typeof candidate.id === "string" &&
          typeof candidate.templateType === "string" &&
          typeof candidate.name === "string" &&
          typeof candidate.description === "string" &&
          !!candidate.globalContent &&
          typeof candidate.globalContent.siteName === "string" &&
          typeof candidate.globalContent.siteDescription === "string" &&
          !!candidate.sections &&
          typeof candidate.sections === "object"
        );
      })
      .slice(0, MAX_CUSTOM_SCENARIOS);
  } catch {
    return [];
  }
}

function writeStorage(packs: CustomScenarioPack[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(packs.slice(0, MAX_CUSTOM_SCENARIOS)));
}

function buildSectionPatchMap(sections: SectionConfig[]): GeneratorScenarioPack["sections"] {
  return Object.fromEntries(
    sections.map((section) => [
      section.id,
      {
        enabled: section.enabled,
        content: { ...section.content },
      },
    ])
  );
}

export function getStoredScenarioPacks(templateType?: TemplateType): CustomScenarioPack[] {
  const packs = readStorage();
  if (!templateType) return packs;
  return packs.filter((pack) => pack.templateType === templateType);
}

export function saveScenarioPackFromConfig(params: {
  templateType: TemplateType;
  name: string;
  description?: string;
  globalContent: GeneratorConfig["globalContent"];
  sections: SectionConfig[];
}): CustomScenarioPack {
  const now = new Date().toISOString();
  const name = normalizeText(params.name, MAX_NAME_LENGTH) || "Untitled Scenario";
  const description = normalizeText(
    params.description || `Custom preset for ${params.templateType}`,
    MAX_DESCRIPTION_LENGTH
  );

  const scenarioPack: CustomScenarioPack = {
    id: generateCustomScenarioId(),
    source: "custom",
    templateType: params.templateType,
    name,
    description,
    globalContent: {
      siteName: params.globalContent.siteName,
      siteDescription: params.globalContent.siteDescription,
    },
    sections: buildSectionPatchMap(params.sections),
    createdAt: now,
    updatedAt: now,
  };

  const existing = readStorage();
  const next = [scenarioPack, ...existing].slice(0, MAX_CUSTOM_SCENARIOS);
  writeStorage(next);
  return scenarioPack;
}

export function deleteStoredScenarioPack(id: string): void {
  const existing = readStorage();
  const next = existing.filter((pack) => pack.id !== id);
  writeStorage(next);
}

export function updateStoredScenarioPack(
  id: string,
  updates: { name?: string; description?: string }
): StoredScenarioPack | null {
  const existing = readStorage();
  const index = existing.findIndex((pack) => pack.id === id);
  if (index === -1) return null;

  const current = existing[index];
  const next: StoredScenarioPack = {
    ...current,
    name: updates.name
      ? normalizeText(updates.name, MAX_NAME_LENGTH) || current.name
      : current.name,
    description: updates.description !== undefined
      ? normalizeText(updates.description, MAX_DESCRIPTION_LENGTH) || current.description
      : current.description,
    updatedAt: new Date().toISOString(),
  };

  existing[index] = next;
  writeStorage(existing);
  return next;
}

export function exportStoredScenarioPacks(templateType?: TemplateType): string {
  const scenarios = getStoredScenarioPacks(templateType);
  const payload: ScenarioExportPayload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    scenarios,
  };
  return JSON.stringify(payload, null, 2);
}

export function importStoredScenarioPacks(
  raw: string,
  fallbackTemplateType?: TemplateType
): {
  imported: number;
  skipped: number;
  packs: StoredScenarioPack[];
} {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    return {
      imported: 0,
      skipped: 0,
      packs: getStoredScenarioPacks(),
    };
  }

  const candidates: ImportedScenarioPayload[] = [];
  if (Array.isArray(parsed)) {
    candidates.push(...(parsed as ImportedScenarioPayload[]));
  } else if (
    parsed &&
    typeof parsed === "object" &&
    Array.isArray((parsed as { scenarios?: unknown }).scenarios)
  ) {
    candidates.push(...((parsed as { scenarios: ImportedScenarioPayload[] }).scenarios));
  } else {
    return {
      imported: 0,
      skipped: 0,
      packs: getStoredScenarioPacks(),
    };
  }

  const existing = readStorage();
  const normalized = candidates
    .map((candidate) => normalizeScenarioCandidate(candidate, fallbackTemplateType))
    .filter((pack): pack is StoredScenarioPack => !!pack);

  const imported = normalized.length;
  const skipped = candidates.length - imported;
  const next = [...normalized, ...existing].slice(0, MAX_CUSTOM_SCENARIOS);
  writeStorage(next);

  return {
    imported,
    skipped,
    packs: next,
  };
}
