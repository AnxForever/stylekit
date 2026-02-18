import { afterEach, describe, expect, it } from "vitest";
import {
  deleteStoredScenarioPack,
  exportStoredScenarioPacks,
  getStoredScenarioPacks,
  importStoredScenarioPacks,
  saveScenarioPackFromConfig,
  updateStoredScenarioPack,
} from "@/lib/generator/scenario-storage";
import { getTemplateByType } from "@/lib/generator";
import type { SectionConfig } from "@/lib/generator/types";

const STORAGE_KEY = "stylekit-generator-custom-scenarios-v1";

function installWindowStorageMock() {
  const data = new Map<string, string>();
  const localStorageMock = {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => {
      data.set(key, value);
    },
    removeItem: (key: string) => {
      data.delete(key);
    },
  };

  Object.defineProperty(globalThis, "window", {
    value: { localStorage: localStorageMock },
    configurable: true,
  });
}

function buildSections(): SectionConfig[] {
  const template = getTemplateByType("landing");
  if (!template) throw new Error("landing template missing");

  return template.sections.map((section) => ({
    id: section.id,
    name: section.name,
    nameEn: section.nameEn,
    description: section.description,
    enabled: section.defaultEnabled,
    content: Object.fromEntries(section.fields.map((field) => [field.id, field.defaultValue])),
  }));
}

describe("scenario storage", () => {
  afterEach(() => {
    delete (globalThis as { window?: unknown }).window;
  });

  it("saves and updates a custom scenario preset", () => {
    installWindowStorageMock();

    const saved = saveScenarioPackFromConfig({
      templateType: "landing",
      name: "Ops Landing",
      description: "First draft",
      globalContent: {
        siteName: "Ops Site",
        siteDescription: "Ops description",
      },
      sections: buildSections(),
    });

    expect(saved.id).toContain("custom-");
    const updated = updateStoredScenarioPack(saved.id, {
      name: "Ops Landing Updated",
      description: "Updated description",
    });

    expect(updated?.name).toBe("Ops Landing Updated");
    expect(updated?.description).toBe("Updated description");
  });

  it("exports and imports presets json", () => {
    installWindowStorageMock();

    saveScenarioPackFromConfig({
      templateType: "landing",
      name: "Export Candidate",
      description: "Ready for export",
      globalContent: {
        siteName: "Site A",
        siteDescription: "Desc A",
      },
      sections: buildSections(),
    });

    const exported = exportStoredScenarioPacks("landing");
    expect(exported).toContain("\"version\": 1");

    delete (globalThis as { window?: unknown }).window;
    installWindowStorageMock();

    const imported = importStoredScenarioPacks(exported, "landing");
    expect(imported.imported).toBeGreaterThan(0);
    expect(imported.packs.length).toBeGreaterThan(0);

    const stored = getStoredScenarioPacks("landing");
    expect(stored.length).toBeGreaterThan(0);

    for (const pack of stored) {
      deleteStoredScenarioPack(pack.id);
    }
    expect(getStoredScenarioPacks("landing")).toHaveLength(0);

    const raw = (globalThis as { window: { localStorage: { getItem: (key: string) => string | null } } }).window
      .localStorage
      .getItem(STORAGE_KEY);
    expect(raw).not.toBeNull();
  });
});
