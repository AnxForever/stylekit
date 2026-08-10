import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const STYLE_SLUG = process.env.STYLEKIT_REGISTRY_STYLE ?? "synthwave";
const REGISTRY_URL =
  process.env.STYLEKIT_REGISTRY_URL ??
  `https://www.stylekit.top/r/${STYLE_SLUG}.json`;
const SHADCN_VERSION = process.env.SHADCN_VERSION ?? "4.16.2";

const projectRoot = await mkdtemp(path.join(os.tmpdir(), "stylekit-registry-install-"));
let prepared = true;

try {
  await mkdir(path.join(projectRoot, "app"), { recursive: true });
  await writeFile(
    path.join(projectRoot, "package.json"),
    JSON.stringify({ private: true, name: "stylekit-registry-consumer" }, null, 2),
  );
  await writeFile(
    path.join(projectRoot, "tsconfig.json"),
    JSON.stringify(
      {
        compilerOptions: {
          target: "ES2022",
          module: "ESNext",
          moduleResolution: "Bundler",
          strict: true,
          baseUrl: ".",
          paths: { "@/*": ["./*"] },
        },
      },
      null,
      2,
    ),
  );
  await writeFile(
    path.join(projectRoot, "components.json"),
    JSON.stringify(
      {
        $schema: "https://ui.shadcn.com/schema.json",
        style: "new-york",
        rsc: true,
        tsx: true,
        tailwind: {
          config: "",
          css: "app/globals.css",
          baseColor: "neutral",
          cssVariables: true,
          prefix: "",
        },
        aliases: {
          components: "@/components",
          utils: "@/lib/utils",
          ui: "@/components/ui",
          lib: "@/lib",
          hooks: "@/hooks",
        },
      },
      null,
      2,
    ),
  );
  await writeFile(
    path.join(projectRoot, "app", "globals.css"),
    '@import "tailwindcss";\n\n:root {}\n.dark {}\n',
  );
} catch (error) {
  prepared = false;
  console.error(`[style-registry-install] FAIL - could not prepare consumer: ${error?.message || String(error)}`);
}

if (!prepared) {
  await rm(projectRoot, { recursive: true, force: true });
  process.exit(1);
}

try {
  await execFileAsync(
    "npx",
    ["--yes", `shadcn@${SHADCN_VERSION}`, "add", REGISTRY_URL, "--yes"],
    {
      cwd: projectRoot,
      env: { ...process.env, CI: "1" },
      maxBuffer: 2 * 1024 * 1024,
    },
  );

  const css = await readFile(path.join(projectRoot, "app", "globals.css"), "utf8");
  const required = ["--background", "--foreground", "--primary", "--radius"];
  const rootBlock = css.match(/:root\s*\{([\s\S]*?)\}/)?.[1] ?? "";
  const darkBlock = css.match(/\.dark\s*\{([\s\S]*?)\}/)?.[1] ?? "";
  const missing = required.flatMap((token) => [
    ...(rootBlock.includes(token) ? [] : [`:root ${token}`]),
    ...(darkBlock.includes(token) ? [] : [`.dark ${token}`]),
  ]);
  if (missing.length > 0) {
    throw new Error(`Registry install completed but globals.css is missing: ${missing.join(", ")}`);
  }

  console.log(
    `[style-registry-install] PASS - ${STYLE_SLUG} installed into a temporary shadcn consumer using shadcn@${SHADCN_VERSION}.`,
  );
} catch (error) {
  const details = [error?.stdout, error?.stderr, error?.message || String(error)]
    .filter(Boolean)
    .join("\n");
  console.error(`[style-registry-install] FAIL - ${details}`);
  process.exitCode = 1;
} finally {
  await rm(projectRoot, { recursive: true, force: true });
}
