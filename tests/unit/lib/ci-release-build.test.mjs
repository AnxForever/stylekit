import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  decodePublicBuildEnvironment,
  isPackagedNextFile,
  nextBuildFiles,
  parsePublicEnvironmentFile,
  publicBuildEnvironment,
  validateBuildInputs,
} from "../../../tools/scripts/release/ci-build-contract.mjs";

const directories = [];
const encode = (value) => Buffer.from(publicBuildEnvironment(value).canonical).toString("base64");
const values = { GOOGLE_SITE_VERIFICATION: "public-verification", NEXT_PUBLIC_BASE_URL: "https://example.test" };
afterEach(() => {
  const temporaryRoot = fs.realpathSync(os.tmpdir());
  for (const directory of directories.splice(0)) {
    const resolved = fs.realpathSync(directory);
    if (!resolved.startsWith(temporaryRoot + path.sep)) throw new Error("Test directory escaped the temporary root");
    fs.rmSync(resolved, { recursive: true });
  }
});

describe("manual Linux release artifact contract", () => {
  it("accepts only canonical JSON of public and verification keys", () => {
    const parsed = decodePublicBuildEnvironment(encode(values));
    expect(parsed.values).toEqual(values);
    expect(parsed.keys).toEqual(Object.keys(values));
    expect(parsed.sha256).toMatch(/^[a-f0-9]{64}$/);
    expect(parsed.sha256).toBe(publicBuildEnvironment({ NEXT_PUBLIC_BASE_URL: values.NEXT_PUBLIC_BASE_URL, GOOGLE_SITE_VERIFICATION: values.GOOGLE_SITE_VERIFICATION }).sha256);
  });

  it("rejects server variables, nonstrings, multiline values, and expansion syntax without printing values", () => {
    for (const value of [
      { SUPABASE_SERVICE_ROLE_KEY: "private-test-value" },
      { ADMIN_API_TOKEN: "private-test-value" },
      { NODE_OPTIONS: "--require=anything" },
      { NEXT_PUBLIC_X: 2 },
      { NEXT_PUBLIC_X: "line\nADMIN_API_TOKEN=x" },
      { NEXT_PUBLIC_X: "$GITHUB_TOKEN" },
      { NEXT_PUBLIC_X: "escaped\\value" },
    ]) {
      expect(() => publicBuildEnvironment(value)).toThrow();
      try { publicBuildEnvironment(value); } catch (error) {
        expect(error.message).not.toContain("private-test-value");
      }
    }
  });

  it("rejects malformed base64, duplicate JSON keys, arrays, and padded JSON", () => {
    for (const raw of ["not base64", Buffer.from('{"NEXT_PUBLIC_X":"a","NEXT_PUBLIC_X":"b"}').toString("base64"), Buffer.from("[]").toString("base64"), Buffer.from(' {"NEXT_PUBLIC_X":"a"}').toString("base64")]) {
      expect(() => decodePublicBuildEnvironment(raw)).toThrow();
    }
  });

  it("converts the restricted local environment export without evaluating it", () => {
    expect(parsePublicEnvironmentFile('NEXT_PUBLIC_BASE_URL="https://example.test"\nGOOGLE_SITE_VERIFICATION=public-verification\n').values).toEqual(values);
    expect(() => parsePublicEnvironmentFile("NEXT_PUBLIC_X=a\nNEXT_PUBLIC_X=b")).toThrow("duplicate");
    expect(() => parsePublicEnvironmentFile("NEXT_PUBLIC_X=a # unclear")).toThrow("ambiguous");
    expect(() => parsePublicEnvironmentFile("NEXT_PUBLIC_X=${ADMIN_API_TOKEN}")).toThrow();
  });

  it("binds manual upstream runs to the exact requested commit", () => {
    const sha = "a".repeat(40);
    const event = { inputs: { expected_sha: sha, public_build_env_b64: encode(values) } };
    const context = { eventName: "workflow_dispatch", repository: "AnxForever/stylekit", sha };
    expect(validateBuildInputs(event, context).values).toEqual(values);
    for (const override of [{ eventName: "pull_request" }, { repository: "fork/stylekit" }, { sha: "b".repeat(40) }]) {
      expect(() => validateBuildInputs(event, { ...context, ...override })).toThrow();
    }
  });

  it("excludes cache, dev, traces, environment files, and unsafe archive paths", () => {
    expect(isPackagedNextFile(".next/server/app/page.js")).toBe(true);
    for (const name of [".next/cache/a", ".next/dev/a", ".next/trace", ".next/trace-build", ".next/.env.production", ".next/server/.env.local", ".next/../secret", "/.next/BUILD_ID", ".next\\BUILD_ID"]) {
      expect(isPackagedNextFile(name)).toBe(false);
    }
  });

  it("inventories only regular build bytes and rejects links before packaging", () => {
    const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), "stylekit-ci-release-test-")));
    directories.push(root);
    fs.mkdirSync(path.join(root, ".next/cache"), { recursive: true });
    fs.writeFileSync(path.join(root, ".next/BUILD_ID"), "candidate-build");
    fs.writeFileSync(path.join(root, ".next/cache/secret"), "excluded");
    fs.writeFileSync(path.join(root, ".next/.env.production"), "excluded");
    expect(nextBuildFiles(root).map((file) => file.path)).toEqual([".next/BUILD_ID"]);
    fs.symlinkSync(path.join(root, ".next/cache"), path.join(root, ".next/linked-cache"), "junction");
    expect(() => nextBuildFiles(root)).toThrow("links");
  });
});
