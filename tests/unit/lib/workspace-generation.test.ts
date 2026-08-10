import { describe, expect, it } from "vitest";
import { generateWorkspaceProject, WorkspaceGenerationError } from "@/lib/workspace";

const brief = {
  audience: "B2B SaaS 运营人员",
  primaryGoal: "查看收入和账户风险",
  requiredPages: ["概览"],
  requiredStates: ["loading", "empty", "error", "success"] as const,
  brandPersonality: ["专业", "可信"],
  antiReferences: ["不要紫色渐变"],
  notes: "",
};

describe("workspace generation workflow", () => {
  it("generates deterministic sorted Next.js files for an explicitly supported combination", () => {
    const input = { name: "Revenue Console", description: "收入工作台", projectType: "dashboard" as const, stack: ["nextjs" as const, "typescript" as const], brief: { ...brief, requiredStates: [...brief.requiredStates] }, selectedStyleSlug: "neo-brutalist", target: "nextjs" as const, generatedAt: "2026-07-11T00:00:00.000Z" };
    const first = generateWorkspaceProject(input);
    const second = generateWorkspaceProject(input);
    expect(first.files.map((file) => file.name)).toEqual(
      [...first.files.map((file) => file.name)].sort((left, right) => left.localeCompare(right)),
    );
    expect(first.files).toEqual(second.files);
    expect(first.files.some((file) => file.name === "app/page.tsx")).toBe(true);
    expect(first.quality.errors).toEqual([]);
    expect(first.knowledge).toEqual({ schemaVersion: "knowledge-generation-context-v1", references: [] });
  });

  it("records only the generator-approved knowledge references supplied by the server", () => {
    const generation = generateWorkspaceProject({
      name: "Knowledge-aware Dashboard",
      description: "A dashboard grounded by an approved component source.",
      projectType: "dashboard",
      stack: ["nextjs", "typescript"],
      brief: { ...brief, requiredStates: [...brief.requiredStates] },
      selectedStyleSlug: "neo-brutalist",
      target: "nextjs",
      generatedAt: "2026-07-11T00:00:00.000Z",
      knowledgeReferences: [{
        id: "approved-source",
        name: "Approved Source",
        summary: "Reviewed context.",
        tags: ["components"],
        sourceUrl: "https://example.com/source",
        usagePolicy: "generator-approved",
      }],
    });

    expect(generation.knowledge.references.map((reference) => reference.id)).toEqual(["approved-source"]);
  });

  it("pins the verified toolchain instead of resolving a different install over time", () => {
    const generation = generateWorkspaceProject({
      name: "Pinned Dashboard",
      description: "依赖复现检查",
      projectType: "dashboard",
      stack: ["nextjs", "typescript", "tailwind"],
      brief: { ...brief, requiredStates: [...brief.requiredStates] },
      selectedStyleSlug: "editorial",
      target: "nextjs",
      generatedAt: "2026-07-11T00:00:00.000Z",
    });
    const packageFile = generation.files.find((file) => file.name === "package.json");
    expect(packageFile).toBeDefined();
    const manifest = JSON.parse(packageFile?.content ?? "{}") as {
      type?: string;
      packageManager?: string;
      scripts?: Record<string, string>;
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    const declaredVersions = Object.values({
      ...manifest.dependencies,
      ...manifest.devDependencies,
    });

    expect(manifest.type).toBe("module");
    expect(manifest.packageManager).toBe("pnpm@11.5.3");
    expect(manifest.scripts?.typecheck).toBe("tsc --noEmit");
    expect(Object.values(manifest.scripts ?? {})).not.toContain("next lint");
    expect(declaredVersions.length).toBeGreaterThan(0);
    expect(declaredVersions.every((version) => /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version))).toBe(true);
  });

  it("emits the Next.js 16 TypeScript contract without first-build rewrites", () => {
    const generation = generateWorkspaceProject({
      name: "Compiler Contract",
      description: "编译配置检查",
      projectType: "dashboard",
      stack: ["nextjs", "typescript", "tailwind"],
      brief: { ...brief, requiredStates: [...brief.requiredStates] },
      selectedStyleSlug: "glassmorphism",
      target: "nextjs",
      generatedAt: "2026-07-11T00:00:00.000Z",
    });
    const tsconfigFile = generation.files.find((file) => file.name === "tsconfig.json");
    const nextEnvFile = generation.files.find((file) => file.name === "next-env.d.ts");
    expect(tsconfigFile).toBeDefined();
    expect(nextEnvFile).toBeDefined();
    const tsconfig = JSON.parse(tsconfigFile?.content ?? "{}") as {
      compilerOptions?: { jsx?: string };
      include?: string[];
    };

    expect(tsconfig.compilerOptions?.jsx).toBe("react-jsx");
    expect(tsconfig.include).toContain(".next/types/**/*.ts");
    expect(tsconfig.include).toContain(".next/dev/types/**/*.ts");
    expect(nextEnvFile?.content).toContain('import "./.next/types/routes.d.ts";');
    expect(nextEnvFile?.content).toContain("https://nextjs.org/docs/app/api-reference/config/typescript");
  });

  it("documents the verified package manager and real StyleKit domain", () => {
    const generation = generateWorkspaceProject({
      name: "Documented Dashboard",
      description: "交付文档检查",
      projectType: "dashboard",
      stack: ["nextjs", "typescript", "tailwind"],
      brief: { ...brief, requiredStates: [...brief.requiredStates] },
      selectedStyleSlug: "neumorphism",
      target: "nextjs",
      generatedAt: "2026-07-11T00:00:00.000Z",
    });
    const readme = generation.files.find((file) => file.name === "README.md")?.content ?? "";

    expect(readme).toContain("https://stylekit.top");
    expect(readme).not.toContain("https://stylekit.dev");
    expect(readme).toContain("pnpm install");
    expect(readme).toContain("pnpm typecheck");
    expect(readme).toContain("pnpm build");
    expect(readme).toContain("pnpm start");
  });

  it("refuses unsupported styles instead of silently falling back", () => {
    expect(() => generateWorkspaceProject({ name: "X", description: "", projectType: "landing", stack: ["nextjs"], brief: { ...brief, requiredStates: [...brief.requiredStates] }, selectedStyleSlug: "cyberpunk-neon", target: "nextjs", generatedAt: "2026-07-11T00:00:00.000Z" })).toThrow(WorkspaceGenerationError);
  });

  it("refuses unsupported product types", () => {
    expect(() => generateWorkspaceProject({ name: "X", description: "", projectType: "app", stack: ["react"], brief: { ...brief, requiredStates: [...brief.requiredStates] }, selectedStyleSlug: "editorial", target: "react", generatedAt: "2026-07-11T00:00:00.000Z" })).toThrow(/尚未通过真实工程生成验证/);
  });

  it("refuses unverified output targets", () => {
    expect(() => generateWorkspaceProject({ name: "X", description: "", projectType: "dashboard", stack: ["react"], brief: { ...brief, requiredStates: [...brief.requiredStates] }, selectedStyleSlug: "editorial", target: "react", generatedAt: "2026-07-11T00:00:00.000Z" })).toThrow(/只开放已完成干净安装/);
  });
});
