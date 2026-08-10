import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = path.resolve(__dirname, "../../..");
const SCRIPT_URL = "https://vibeloft.ai/telemetry/v1.js";
const EVENT_ORIGIN = "https://api.vibeloft.ai";
const EVENT_ENDPOINT = `${EVENT_ORIGIN}/api/v1/telemetry/events`;
const PRODUCT_ID = "89414aab-7920-4854-8720-5ef041561792";

async function read(relativePath: string) {
  return readFile(path.join(ROOT, relativePath), "utf8");
}

async function collectSourceFiles(directory: string): Promise<string[]> {
  const absoluteDirectory = path.join(ROOT, directory);
  const entries = await readdir(absoluteDirectory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const relativePath = path.join(directory, entry.name);
      if (entry.isDirectory()) return collectSourceFiles(relativePath);
      return /\.(?:js|jsx|mjs|cjs|ts|tsx)$/.test(entry.name)
        ? [relativePath]
        : [];
    })
  );
  return files.flat();
}

describe("VibeLoft telemetry integration", () => {
  it("initializes the official runtime exactly once from the global root layout", async () => {
    const sourceFiles = (
      await Promise.all(
        ["app", "components", "lib"].map((directory) =>
          collectSourceFiles(directory)
        )
      )
    ).flat();
    const sources = await Promise.all(sourceFiles.map(read));
    const combinedSource = sources.join("\n");
    const layout = await read("app/layout.tsx");

    expect(combinedSource.split(SCRIPT_URL)).toHaveLength(2);
    expect(layout).toMatch(
      /strategy="lazyOnload"[\s\S]*src="https:\/\/vibeloft\.ai\/telemetry\/v1\.js"/,
    );
    expect(layout).toContain(`data-vl-product-id="${PRODUCT_ID}"`);
    expect(layout.match(/data-vl-auth-key="vl_web\.[A-Za-z0-9_-]{43}"/g)).toHaveLength(1);
    expect(layout).not.toContain("data-vl-endpoint");
  });

  it("keeps VibeLoft on the two approved CSP origins without weakening other directives", async () => {
    const config = await read("next.config.ts");

    expect(config).toContain(
      `"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vibeloft.ai"`
    );
    expect(config).toContain(
      `"connect-src 'self' https://*.supabase.co https://connect.linux.do wss://*.supabase.co https://api.github.com ${EVENT_ORIGIN}"`
    );
    expect(config).toContain(`"default-src 'self'"`);
    expect(config).toContain(`"frame-ancestors 'self'"`);
    expect(config).toContain(`"base-uri 'self'"`);
    expect(config).toContain(`"form-action 'self'"`);
  });

  it("does not add a package, alternate collector, manual event sender, or Supabase telemetry path", async () => {
    const packageJson = await read("package.json");
    const lockfile = await read("pnpm-lock.yaml");
    const layout = await read("app/layout.tsx");

    expect(packageJson.toLowerCase()).not.toContain("vibeloft");
    expect(lockfile.toLowerCase()).not.toContain("vibeloft");
    expect(layout).not.toContain(EVENT_ENDPOINT);
    expect(layout.toLowerCase()).not.toContain("supabase");
    expect(layout).not.toContain("fetch(");
    expect(layout).not.toContain("sendBeacon(");
  });
});

const liveRuntimeTest =
  process.env.VIBELOFT_RUNTIME_CONTRACT_LIVE === "1" ? it : it.skip;

describe("official VibeLoft runtime contract", () => {
  liveRuntimeTest(
    "owns SPA navigation, privacy signals, credential omission, retry, and failure isolation",
    async () => {
      const response = await fetch(SCRIPT_URL, {
        redirect: "error",
        signal: AbortSignal.timeout(15_000),
      });
      expect(response.ok).toBe(true);
      const runtime = await response.text();

      expect(runtime).toContain(EVENT_ENDPOINT);
      expect(runtime).toMatch(/credentials:\s*["']omit["']/);
      expect(runtime).toContain("globalPrivacyControl");
      expect(runtime).toContain("doNotTrack");
      expect(runtime).toContain("msDoNotTrack");
      expect(runtime).toContain("pushState");
      expect(runtime).toContain("replaceState");
      expect(runtime).toContain("popstate");
      expect(runtime).toContain("retryBaseMs");
      expect(runtime).toContain("retryMaxMs");
      expect(runtime.toLowerCase()).not.toContain("supabase");
      expect(runtime).not.toContain("document.cookie");
      expect(runtime).not.toContain("canvas");
      expect(runtime).not.toContain("AudioContext");
    },
    20_000
  );
});
