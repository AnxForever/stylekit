// Black-box CLI test: spawn the built bin and assert stdout/stderr/exit code.
import { execFileSync } from "node:child_process";
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const packageVersion = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
).version;

let failures = 0;
function check(cond, label) {
  console.log(`${cond ? "PASS" : "FAIL"}: ${label}`);
  if (!cond) failures++;
}

function run(args, input) {
  try {
    const stdout = execFileSync("node", ["dist/index.js", ...args], {
      encoding: "utf8",
      input,
      stdio: ["pipe", "pipe", "pipe"],
    });
    return { code: 0, stdout, stderr: "" };
  } catch (e) {
    return { code: e.status ?? 1, stdout: e.stdout ?? "", stderr: e.stderr ?? "" };
  }
}

// --- happy paths (stdout, exit 0) ---
let r = run(["--version"]);
check(
  r.code === 0 && r.stdout.trim() === packageVersion,
  `--version -> ${packageVersion}`,
);
r = run(["--help"]);
check(
  r.code === 0 && /components\.json/.test(r.stdout) &&
    /tailwind\.css/.test(r.stdout) && /tsconfig\.json/.test(r.stdout) &&
    /Tailwind CSS v4/.test(r.stdout) && /Tailwind v3/.test(r.stdout) &&
    /Style Pack/.test(r.stdout) && /HSL/.test(r.stdout) && /preset/.test(r.stdout),
  "CLI help states shadcn prerequisites and the Tailwind v4 registry limit",
);

r = run(["list", "--category", "retro", "--limit", "3"]);
const listRows = r.stdout.split("\n").filter((l) => l.startsWith("  "));
check(r.code === 0 && listRows.length === 3, "list --category --limit honors both");

r = run(["search", "glass"]);
check(r.code === 0 && /glassmorphism/.test(r.stdout), "search glass finds glassmorphism");

r = run(["add", "synthwave"]);
check(
  r.code === 0 && /www\.stylekit\.top\/r\/synthwave\.json/.test(r.stdout) &&
    /components\.json/.test(r.stdout) && /tailwind\.css/.test(r.stdout) &&
    /CSS variables/.test(r.stdout) && /tsconfig\.json/.test(r.stdout) &&
    /Tailwind v4/.test(r.stdout) && /Tailwind v3/.test(r.stdout) &&
    /Style Pack/.test(r.stdout) && /HSL/.test(r.stdout) && /preset/.test(r.stdout),
  "add synthwave prints prerequisites and the supported Tailwind versions",
);
r = run(["add", "synthwave", "--json"]);
const addGuidance = JSON.parse(r.stdout);
check(
  r.code === 0 && /components\.json/.test(addGuidance.prerequisite) &&
    /tailwind\.css/.test(addGuidance.prerequisite) &&
    /CSS variables/.test(addGuidance.prerequisite) &&
    /tsconfig\.json/.test(addGuidance.prerequisite) &&
    /Tailwind CSS v4 only/.test(addGuidance.prerequisite) &&
    /Tailwind v3/.test(addGuidance.prerequisite) &&
    /Style Pack/.test(addGuidance.prerequisite) &&
    /HSL/.test(addGuidance.prerequisite) && /preset/.test(addGuidance.prerequisite),
  "default add JSON documents prerequisites and the Tailwind v4 registry limit",
);

r = run([
  "recipe", "broadcast-glitch", "button", "--variant", "cyan",
  "--params", JSON.stringify({ size: "lg", fullWidth: true }),
  "--slots", JSON.stringify({ label: "Transmit now" }), "--json",
]);
let configuredRecipe = null;
try {
  configuredRecipe = JSON.parse(r.stdout);
} catch {
  /* ignore */
}
check(
  r.code === 0 &&
    configuredRecipe?.renderOptions?.variant === "cyan" &&
    configuredRecipe?.className?.includes("bg-[#00E5D8]") &&
    configuredRecipe?.className?.includes("px-9 py-4 text-base") &&
    configuredRecipe?.className?.includes("w-full") &&
    configuredRecipe?.code?.includes("Transmit now"),
  "recipe --variant/--params/--slots renders a custom combination as JSON",
);
r = run([
  "recipe", "broadcast-glitch", "button", "--params", JSON.stringify({ unknownOption: "ignored" }), "--json",
]);
let invalidRecipeJson = null;
try {
  invalidRecipeJson = JSON.parse(r.stderr);
} catch {
  /* ignore */
}
check(
  r.code === 1 && invalidRecipeJson?.code === "INVALID_RECIPE_OPTIONS" &&
    invalidRecipeJson?.optionCode === "unknown_parameter",
  "recipe unknown parameter is a structured input error",
);

r = run(["show", "neo-brutalist", "--json"]);
let okJson = null;
try {
  okJson = JSON.parse(r.stdout);
} catch {
  /* ignore */
}
check(
  r.code === 0 && okJson?.slug === "neo-brutalist" && Array.isArray(okJson?.keywords),
  "show --json emits valid JSON with keywords",
);

// --- error contracts (stderr, exit 1) ---
r = run(["add", "nope-xyz"]);
check(
  r.code === 1 && r.stderr.includes("Unknown style"),
  "add unknown -> exit 1 + stderr",
);

r = run(["show", "nope-xyz", "--json"]);
let errJson = null;
try {
  errJson = JSON.parse(r.stderr);
} catch {
  /* ignore */
}
check(
  r.code === 1 && typeof errJson?.error === "string",
  "show bad --json -> JSON error on stderr + exit 1",
);

r = run(["list", "--limit", "abc"]);
check(
  r.code === 1 && r.stderr.includes("Invalid --limit"),
  "--limit abc -> exit 1",
);

r = run(["list", "--limit", "abc", "--json"]);
let invalidLimitJson = null;
try {
  invalidLimitJson = JSON.parse(r.stderr);
} catch {
  /* ignore */
}
check(
  r.code === 1 && invalidLimitJson?.code === "INVALID_LIMIT",
  "--limit abc --json -> structured JSON error",
);

r = run(["list", "--limit", "0"]);
check(r.code === 1, "--limit 0 -> exit 1");

r = run(["list", "--category", "bogus"]);
check(
  r.code === 1 && r.stderr.includes("Invalid --category"),
  "--category bogus -> exit 1",
);

r = run(["search"]);
check(
  r.code === 1 && r.stderr.includes("Usage"),
  "search with no query -> usage on stderr + exit 1",
);

r = run(["list", "--limit", "2", "--json"]);
let listJson = null;
try {
  listJson = JSON.parse(r.stdout);
} catch {
  /* ignore */
}
check(
  r.code === 0 && listJson?.count === 2 && listJson?.total >= 2,
  "list --json -> total/count/results envelope",
);

r = run(["assets", "--json", "--limit", "1"]);
let assetPageJson = null;
try {
  assetPageJson = JSON.parse(r.stdout);
} catch {
  /* ignore */
}
const assetPage = assetPageJson?.data;
check(
  r.code === 0 &&
    ["live", "bundled"].includes(assetPageJson?.origin) &&
    assetPage?.schemaVersion === "1" &&
    Array.isArray(assetPage?.assets) &&
    Number.isInteger(assetPage?.total) &&
    assetPage?.offset === 0 &&
    Number.isInteger(assetPage?.limit) &&
    typeof assetPage?.hasMore === "boolean" &&
    assetPageJson?.data?.kindCounts &&
    typeof assetPageJson.data.kindCounts === "object",
  "assets --json -> complete source and pagination envelope",
);

r = run(["assets", "--json", "--limit", "1", "--offset", String((assetPage?.total ?? 0) + 1000)]);
let emptyAssetsJson = null;
try {
  emptyAssetsJson = JSON.parse(r.stdout);
} catch {
  /* ignore */
}
check(
  r.code === 0 &&
    ["live", "bundled"].includes(emptyAssetsJson?.origin) &&
    Array.isArray(emptyAssetsJson?.data?.assets) &&
    emptyAssetsJson.data.assets.length === 0 &&
    emptyAssetsJson.data.hasMore === false,
  "assets empty offset page is successful structured output",
);

if (assetPage?.assets?.[0]?.kind && assetPage.assets[0]?.id) {
  const meta = assetPage.assets[0];
  r = run(["asset", meta.kind, meta.id, "--json"]);
  let detailJson = null;
  try {
    detailJson = JSON.parse(r.code === 0 ? r.stdout : r.stderr);
  } catch {
    /* ignore */
  }
  if (r.code === 0) {
    check(
      ["live", "bundled"].includes(detailJson?.origin) &&
        detailJson?.data?.metadata?.kind === meta.kind &&
        detailJson?.data?.metadata?.id === meta.id &&
        detailJson?.data?.metadata?.availability === meta.availability,
      "asset --json -> namespaced detail preserves availability metadata",
    );
  } else {
    check(
      detailJson?.code === "ASSET_SOURCE_UNAVAILABLE" &&
        detailJson?.failureKind === "unavailable" &&
        (detailJson?.asset?.metadata?.kind ?? detailJson?.asset?.kind) === meta.kind &&
        (!detailJson?.asset?.data ||
          detailJson.asset.data.sourceFilesIncluded === false) &&
        !Object.hasOwn(detailJson?.asset?.data ?? {}, "files"),
      "unavailable remote asset fails without claiming source content",
    );
  }
}

r = run(["assets", "--offset=-1", "--json"]);
let invalidOffsetJson = null;
try {
  invalidOffsetJson = JSON.parse(r.stderr);
} catch {
  /* ignore */
}
check(
  r.code === 1 && invalidOffsetJson?.code === "INVALID_OFFSET",
  "assets invalid --offset -> structured validation error",
);

r = run(["assets", "--kind", "not-a-public-kind", "--json"]);
let invalidAssetKindJson = null;
try {
  invalidAssetKindJson = JSON.parse(r.stderr);
} catch {
  /* ignore */
}
check(
  r.code === 1 && invalidAssetKindJson?.code === "INVALID_ASSET_KIND",
  "assets invalid --kind -> structured validation error",
);

r = run(["asset", "experience-pack", "corporate-clean-saas", "--json"]);
let restrictedDetailJson = null;
try {
  restrictedDetailJson = JSON.parse(r.code === 0 ? r.stdout : r.stderr);
} catch {
  /* ignore */
}
check(
  r.code === 0 &&
    ["live", "bundled"].includes(restrictedDetailJson?.origin) &&
    restrictedDetailJson?.data?.metadata?.kind === "experience-pack" &&
    restrictedDetailJson?.data?.metadata?.id === "corporate-clean-saas" &&
    restrictedDetailJson?.data?.metadata?.availability === "restricted" &&
    Array.isArray(restrictedDetailJson?.data?.sourceUrls) &&
    restrictedDetailJson.data.sourceUrls.length > 0 &&
    Object.keys(restrictedDetailJson?.data?.data ?? {}).length === 0,
  "restricted asset preserves metadata and links without exposing source files",
);

const fixtureRoot = mkdtempSync(path.join(tmpdir(), "stylekit-cli-test-"));
try {
  mkdirSync(path.join(fixtureRoot, "src"));
  mkdirSync(path.join(fixtureRoot, "src", "app"));
  writeFileSync(path.join(fixtureRoot, "package.json"), JSON.stringify({
    name: "stylekit-cli-project-fixture",
    packageManager: "pnpm@11.5.3",
    devDependencies: { tailwindcss: "^4.0.0" },
  }, null, 2));
  writeFileSync(path.join(fixtureRoot, "tsconfig.json"), JSON.stringify({ compilerOptions: {} }, null, 2));
  writeFileSync(path.join(fixtureRoot, "components.json"), JSON.stringify({
    $schema: "https://ui.shadcn.com/schema.json",
    style: "new-york",
    tailwind: { css: "src/app/globals.css", cssVariables: true },
    aliases: { components: "@/components", utils: "@/lib/utils" },
  }, null, 2));
  const fixtureCss = path.join(fixtureRoot, "src", "app", "globals.css");
  writeFileSync(fixtureCss, '@import "tailwindcss";\n:root { --background: #fff; }\n');
  writeFileSync(path.join(fixtureRoot, "src", "good.tsx"), '<div className="p-4 rounded-none"/>');
  writeFileSync(path.join(fixtureRoot, "src", "bad.tsx"), '<div className="hover:rounded-xl!"/>');
  mkdirSync(path.join(fixtureRoot, "src", "node_modules"));
  writeFileSync(path.join(fixtureRoot, "src", "node_modules", "ignored.tsx"), '<div className="rounded-xl"/>');
  r = run(["doctor", "--cwd", fixtureRoot, "--json"]);
  const doctor = JSON.parse(r.stdout);
  check(
    r.code === 0 && doctor.schemaVersion === "stylekit-cli-project-v1" &&
      doctor.readyForAdd === true && doctor.packageManager.name === "pnpm" &&
      doctor.cssEntry.path === fixtureCss,
    "doctor --cwd inspects the selected project and reports readiness",
  );
  const cssBeforePlan = readFileSync(fixtureCss, "utf8");
  r = run(["add", "synthwave", "--cwd", fixtureRoot, "--dry-run", "--json"]);
  const addPlan = JSON.parse(r.stdout);
  check(
    r.code === 0 && addPlan.schemaVersion === "stylekit-cli-add-output-v1" &&
      addPlan.mode === "dry-run" && addPlan.plan.readyForApply === true &&
      addPlan.plan.command.executable === "pnpm" &&
      addPlan.plan.target.cssFile === fixtureCss,
    "add --dry-run returns the explicit pnpm plan without applying it",
  );
  check(
    readFileSync(fixtureCss, "utf8") === cssBeforePlan,
    "add --dry-run leaves the target CSS entry unchanged",
  );
  r = run(["add", "synthwave", "--cwd", fixtureRoot, "--apply", "--dry-run", "--json"]);
  check(
    r.code === 1 && JSON.parse(r.stderr).code === "INVALID_ARGUMENTS",
    "add rejects conflicting --apply and --dry-run flags",
  );
  const blockedRoot = path.join(fixtureRoot, "blocked-project");
  mkdirSync(blockedRoot);
  r = run(["doctor", "--cwd", blockedRoot, "--json"]);
  const blockedDoctor = JSON.parse(r.stderr);
  check(
    r.code === 1 && blockedDoctor.code === "PROJECT_NOT_READY" &&
      blockedDoctor.inspection?.readyForAdd === false,
    "doctor reports blockers with a nonzero exit and preserves inspection JSON",
  );
  r = run(["add", "synthwave", "--cwd", blockedRoot, "--dry-run", "--json"]);
  const blockedPlan = JSON.parse(r.stderr);
  check(
    r.code === 1 && blockedPlan.code === "ADD_BLOCKED" &&
      blockedPlan.mode === "dry-run" && blockedPlan.plan?.readyForApply === false &&
      blockedPlan.plan?.blockers?.length > 0 &&
      !existsSync(path.join(blockedRoot, "components.json")),
    "blocked add --dry-run exits nonzero with its plan and leaves the project unchanged",
  );
  r = run(["brief", "neo-brutalist"]);
  const brief = JSON.parse(r.stdout);
  check(r.code === 0 && brief.schemaVersion === "stylekit-brief-v1" && brief.recipes.button && brief.lintRules.sources.includes("curated") && brief.projection.complete === true, "brief exports complete implementation contract with a full projection marker");
  check(["live", "bundled"].includes(brief.origin) && ["bundled", "static", "community"].includes(brief.provenance.source) && (brief.origin === "live" || typeof brief.fallbackReason === "string"), "brief separates transport origin and content provenance and explains fallback");
  r = run(["brief", "neo-brutalist", "--sections", "identity,recipes", "--components", "button", "--json"]);
  let projectedBrief = null;
  try {
    projectedBrief = JSON.parse(r.stdout);
  } catch {
    /* ignore */
  }
  check(
    r.code === 0 && projectedBrief?.projection?.complete === false &&
      projectedBrief?.projection?.componentFilter?.[0] === "button" &&
      projectedBrief?.recipes?.button && projectedBrief?.components === undefined &&
      typeof projectedBrief?.provenance?.contentHash === "string",
    "brief --sections/--components returns an explicitly partial projection",
  );
  r = run(["brief", "neo-brutalist", "--sections", "identity", "--components", "button", "--json"]);
  let invalidProjection = null;
  try {
    invalidProjection = JSON.parse(r.stderr);
  } catch {
    /* ignore */
  }
  check(
    r.code === 1 && invalidProjection?.code === "INVALID_BRIEF_PROJECTION" &&
      invalidProjection?.projectionCode === "component_ids_require_components",
    "brief rejects component filters when neither components nor recipes are selected",
  );
  r = run(["lint", "neo-brutalist", path.join(fixtureRoot, "src", "good.tsx"), "--json"]);
  const goodLint = JSON.parse(r.stdout);
  check(r.code === 0 && goodLint.status === "pass", "lint valid file passes");
  check(["live", "bundled"].includes(goodLint.origin) && goodLint.contentSource === brief.provenance.source && (goodLint.origin === "live" || typeof goodLint.fallbackReason === "string"), "lint uses the implementation brief and reports the rule origin separately from content provenance");
  r = run(["lint", "--style", "neo-brutalist", "--files", path.join(fixtureRoot, "src", "**", "*.tsx"), "--format", "json"]);
  check(r.code === 1 && JSON.parse(r.stdout).files.length === 2 && JSON.parse(r.stdout).origin, "lint glob finds root files, excludes dependencies, and keeps source metadata");
  r = run(["lint", "neo-brutalist", "--stdin", "--json"], '<div className={runtimeClasses}/>');
  check(r.code === 3 && JSON.parse(r.stdout).status === "inconclusive", "lint stdin runtime classes cannot pass");
  r = run(["lint", "neo-brutalist", "--stdin", "--component", "button", "--strict", "--json"], '<button className="p-4"/>');
  check(r.code === 1 && JSON.parse(r.stdout).files[0].report.missingRequired.length > 0, "lint strict checks required classes");
  r = run(["lint", "neo-brutalist", "--stdin", "--format", "github"], '<div className="rounded-xl"/>');
  check(r.code === 1 && r.stdout.includes("::error file=<stdin>,line=1::"), "lint emits GitHub error annotations");
  r = run(["lint", "neo-brutalist", "--files", path.join(fixtureRoot, "missing", "*.tsx"), "--json"]);
  check(r.code === 1 && JSON.parse(r.stderr).code === "UNEXPECTED_ERROR", "missing glob roots fail instead of passing zero files");
} finally {
  rmSync(fixtureRoot, { recursive: true, force: true });
}

console.log(
  failures === 0 ? "\nALL CLI SMOKE TESTS PASSED" : `\n${failures} FAILURE(S)`,
);
process.exit(failures === 0 ? 0 : 1);
