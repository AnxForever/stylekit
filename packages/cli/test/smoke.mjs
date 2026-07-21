// Black-box CLI test: spawn the built bin and assert stdout/stderr/exit code.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const packageVersion = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
).version;

let failures = 0;
function check(cond, label) {
  console.log(`${cond ? "PASS" : "FAIL"}: ${label}`);
  if (!cond) failures++;
}

function run(args) {
  try {
    const stdout = execFileSync("node", ["dist/index.js", ...args], {
      encoding: "utf8",
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

console.log(
  failures === 0 ? "\nALL CLI SMOKE TESTS PASSED" : `\n${failures} FAILURE(S)`,
);
process.exit(failures === 0 ? 0 : 1);
