import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { generateWorkspaceProject, WORKSPACE_SUPPORTED_STYLES } from "@/lib/workspace";

async function run(command: string, args: string[], cwd: string): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: "inherit", env: { ...process.env, CI: "1" } });
    child.on("error", reject);
    child.on("exit", (code) => code === 0 ? resolve() : reject(new Error(`${command} ${args.join(" ")} exited ${code}`)));
  });
}

async function reservePort(): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        server.close();
        reject(new Error("Could not reserve a local runtime verification port"));
        return;
      }
      server.close((error) => error ? reject(error) : resolve(address.port));
    });
  });
}

async function verifyRuntime(cwd: string, expectedProjectName: string): Promise<void> {
  const port = await reservePort();
  const output: string[] = [];
  const child = spawn(
    "pnpm",
    ["exec", "next", "start", "-H", "127.0.0.1", "-p", String(port)],
    {
      cwd,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, CI: "1", NEXT_TELEMETRY_DISABLED: "1" },
    },
  );
  child.stdout.on("data", (chunk) => output.push(String(chunk)));
  child.stderr.on("data", (chunk) => output.push(String(chunk)));

  try {
    let lastError: unknown;
    for (let attempt = 0; attempt < 60; attempt += 1) {
      if (child.exitCode !== null) {
        throw new Error(`Generated app exited before verification (${child.exitCode}):\n${output.join("")}`);
      }
      try {
        const response = await fetch(`http://127.0.0.1:${port}/`, {
          headers: { Accept: "text/html" },
          signal: AbortSignal.timeout(1_000),
        });
        const html = await response.text();
        if (
          response.ok &&
          response.headers.get("content-type")?.includes("text/html") &&
          html.includes(expectedProjectName)
        ) {
          return;
        }
        lastError = new Error(
          `Unexpected runtime response ${response.status}; project title present: ${html.includes(expectedProjectName)}`,
        );
      } catch (error) {
        lastError = error;
      }
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
    throw new Error(
      `Generated app did not become ready on port ${port}: ${lastError instanceof Error ? lastError.message : String(lastError)}\n${output.join("")}`,
    );
  } finally {
    if (child.exitCode === null) child.kill("SIGTERM");
    await new Promise<void>((resolve) => {
      if (child.exitCode !== null) {
        resolve();
        return;
      }
      const timeout = setTimeout(() => {
        if (child.exitCode === null) child.kill("SIGKILL");
        resolve();
      }, 3_000);
      child.once("exit", () => {
        clearTimeout(timeout);
        resolve();
      });
    });
  }
}

async function writeGeneratedProject(root: string, files: ReturnType<typeof generateWorkspaceProject>["files"]) {
  for (const file of files) {
    const target = path.resolve(root, file.name);
    if (!target.startsWith(`${path.resolve(root)}${path.sep}`)) throw new Error(`Unsafe generated path: ${file.name}`);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, file.content, "utf8");
  }
}

async function assertGeneratedSourcesUnchanged(
  root: string,
  files: ReturnType<typeof generateWorkspaceProject>["files"],
): Promise<void> {
  for (const file of files) {
    const actual = await readFile(path.join(root, file.name), "utf8");
    if (actual !== file.content) {
      throw new Error(`Install or build mutated generated source: ${file.name}`);
    }
  }
}

async function main() {
  for (const styleSlug of WORKSPACE_SUPPORTED_STYLES) {
    const root = await mkdtemp(path.join(os.tmpdir(), `stylekit-workspace-${styleSlug}-`));
    try {
      const generation = generateWorkspaceProject({
        name: `${styleSlug} Dashboard`,
        description: "Clean-install verification project",
        projectType: "dashboard",
        stack: ["nextjs", "typescript", "tailwind"],
        selectedStyleSlug: styleSlug,
        brief: {
          audience: "B2B SaaS operators",
          primaryGoal: "Review revenue and account risk",
          requiredPages: ["Overview"],
          requiredStates: ["loading", "empty", "error", "success"],
          brandPersonality: ["clear", "reliable"],
          antiReferences: [],
          notes: "",
        },
        target: "nextjs",
        generatedAt: "2026-07-11T00:00:00.000Z",
      });
      await writeGeneratedProject(root, generation.files);
      await run("pnpm", ["install", "--ignore-scripts"], root);
      await run("pnpm", ["typecheck"], root);
      await run("pnpm", ["build"], root);
      await verifyRuntime(root, `${styleSlug} Dashboard`);
      await assertGeneratedSourcesUnchanged(root, generation.files);
      console.log(`[verify-workspace-generation] PASS ${styleSlug} (${generation.files.length} files, build + runtime)`);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  }
}

main().catch((error) => {
  console.error(`[verify-workspace-generation] FAIL ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
