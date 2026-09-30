// Black-box CLI test: spawn the built bin and assert stdout/stderr/exit code.
import { execFileSync } from "node:child_process";
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
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

r = run(["list", "--category", "retro", "--limit", "3"]);
const listRows = r.stdout.split("\n").filter((l) => l.startsWith("  "));
check(r.code === 0 && listRows.length === 3, "list --category --limit honors both");

r = run(["search", "glass"]);
check(r.code === 0 && /glassmorphism/.test(r.stdout), "search glass finds glassmorphism");

r = run(["add", "synthwave"]);
check(
  r.code === 0 && /www\.stylekit\.top\/r\/synthwave\.json/.test(r.stdout),
  "add synthwave uses canonical www host",
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

const fixtureRoot = mkdtempSync(path.join(tmpdir(), "stylekit-cli-test-"));
try {
  mkdirSync(path.join(fixtureRoot, "src"));
  writeFileSync(path.join(fixtureRoot, "src", "good.tsx"), '<div className="p-4 rounded-none"/>');
  writeFileSync(path.join(fixtureRoot, "src", "bad.tsx"), '<div className="hover:rounded-xl!"/>');
  mkdirSync(path.join(fixtureRoot, "src", "node_modules"));
  writeFileSync(path.join(fixtureRoot, "src", "node_modules", "ignored.tsx"), '<div className="rounded-xl"/>');
  r = run(["brief", "neo-brutalist"]);
  const brief = JSON.parse(r.stdout);
  check(r.code === 0 && brief.schemaVersion === "stylekit-brief-v1" && brief.recipes.button && brief.lintRules.sources.includes("curated"), "brief exports complete implementation contract");
  r = run(["lint", "neo-brutalist", path.join(fixtureRoot, "src", "good.tsx"), "--json"]);
  check(r.code === 0 && JSON.parse(r.stdout).status === "pass", "lint valid file passes");
  r = run(["lint", "--style", "neo-brutalist", "--files", path.join(fixtureRoot, "src", "**", "*.tsx"), "--format", "json"]);
  check(r.code === 1 && JSON.parse(r.stdout).files.length === 2, "lint glob finds root files and excludes dependencies");
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
