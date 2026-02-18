import { describe, expect, it } from "vitest";
import { getTemplateByType } from "@/lib/generator";
import { generateReactFiles } from "@/lib/generator/renderers/react-renderer";
import { styles } from "@/lib/styles";
import type { GeneratorConfig, SectionConfig, TemplateType } from "@/lib/generator/types";

function buildSections(templateType: TemplateType): SectionConfig[] {
  const template = getTemplateByType(templateType);
  if (!template) {
    throw new Error(`Template not found: ${templateType}`);
  }

  return template.sections.map((section) => ({
    id: section.id,
    name: section.name,
    nameEn: section.nameEn,
    description: section.description,
    enabled: section.defaultEnabled,
    content: Object.fromEntries(section.fields.map((field) => [field.id, field.defaultValue])),
  }));
}

function updateSectionContent(
  sections: SectionConfig[],
  sectionId: string,
  patch: Record<string, string>
): SectionConfig[] {
  return sections.map((section) =>
    section.id === sectionId
      ? {
        ...section,
        content: {
          ...section.content,
          ...patch,
        },
      }
      : section
  );
}

function requireFile(files: ReturnType<typeof generateReactFiles>, name: string) {
  const match = files.find((file) => file.name === name);
  expect(match, `missing file: ${name}`).toBeTruthy();
  if (!match) {
    throw new Error(`Missing generated file: ${name}`);
  }
  return match;
}

describe("generateReactFiles", () => {
  it("injects richer dashboard content into generated components", () => {
    const style = styles.find((item) => item.styleType === "visual");
    expect(style).toBeTruthy();
    if (!style) {
      return;
    }

    let sections = buildSections("dashboard");
    sections = updateSectionContent(sections, "kpi", {
      sectionTitle: "Revenue Signals",
      kpi1Change: "+12.4%",
      kpi2Change: "+4.8%",
      kpi3Change: "-1.9%",
      kpi4Change: "+2.5%",
    });
    sections = updateSectionContent(sections, "charts", {
      chartTitle: "ARR Mix by Segment",
      chartType: "pie",
      chartSummary: "Segment mix and target attainment across growth motions.",
      chartLabels: "Enterprise, Mid-market, SMB, Self-serve",
      primarySeriesLabel: "Current ARR",
      primarySeriesValues: "52, 28, 14, 6",
      secondarySeriesLabel: "Target ARR",
      secondarySeriesValues: "48, 30, 16, 6",
    });
    sections = updateSectionContent(sections, "table", {
      tableTitle: "Accounts in weekly review",
      columns: "Account, CSM, Health Score, ARR, Renewal Date",
      rowCount: "7",
    });

    const config: GeneratorConfig = {
      styleSlug: style.slug,
      templateType: "dashboard",
      outputFormat: "react",
      sections,
      globalContent: {
        siteName: "Revenue Console",
        siteDescription: "Single source of truth for renewals and expansion.",
      },
    };

    const files = generateReactFiles(config, { type: "builtin", style });

    const appFile = requireFile(files, "src/App.tsx");
    const kpiFile = requireFile(files, "src/components/KpiCards.tsx");
    const chartFile = requireFile(files, "src/components/Charts.tsx");
    const tableFile = requireFile(files, "src/components/DataTable.tsx");
    const cssFile = requireFile(files, "src/index.css");

    expect(appFile.content).toContain("Revenue Console");
    expect(appFile.content).toContain("Single source of truth for renewals and expansion.");

    expect(kpiFile.content).toContain("Revenue Signals");
    expect(kpiFile.content).toContain("Up 12.4%");
    expect(kpiFile.content).toContain("Down 1.9%");

    expect(chartFile.content).toContain("ARR Mix by Segment");
    expect(chartFile.content).toContain("Segment mix and target attainment across growth motions.");
    expect(chartFile.content).toContain("Segment share");
    expect(chartFile.content).toContain("Current ARR");
    expect(chartFile.content).toContain("Enterprise");
    expect(chartFile.content).toContain("conic-gradient(var(--style-primary)");

    expect(tableFile.content).toContain("Accounts in weekly review");
    expect(tableFile.content).toContain("7 rows shown - sorted by latest update");

    expect(cssFile.content).toContain("--style-primary:");
  });

  it("uses blog authorBio and featured post treatment", () => {
    const style = styles.find((item) => item.styleType === "visual");
    expect(style).toBeTruthy();
    if (!style) {
      return;
    }

    let sections = buildSections("blog");
    sections = updateSectionContent(sections, "hero", {
      authorName: "Jamie Rivera",
      authorBio: "Staff engineer writing about scale.",
    });
    sections = updateSectionContent(sections, "posts", {
      sectionTitle: "Latest Analysis",
      post1Title: "How we stabilized deploy confidence",
    });

    const config: GeneratorConfig = {
      styleSlug: style.slug,
      templateType: "blog",
      outputFormat: "react",
      sections,
      globalContent: {
        siteName: "Engineering Notes",
        siteDescription: "Architecture and leadership essays.",
      },
    };

    const files = generateReactFiles(config, { type: "builtin", style });

    const heroFile = requireFile(files, "src/components/BlogHero.tsx");
    const postsFile = requireFile(files, "src/components/BlogPosts.tsx");

    expect(heroFile.content).toContain("Staff engineer writing about scale.");
    expect(postsFile.content).toContain("Latest Analysis");
    expect(postsFile.content).toContain("Featured");
  });
});
