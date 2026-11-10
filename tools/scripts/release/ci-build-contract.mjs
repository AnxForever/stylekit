import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

export const RELEASE_RUNTIME = {
  node: "23.11.1",
  mcpSdk: "1.30.0",
  mcpZod: "3.25.76",
};

const verificationKeys = new Set([
  "GOOGLE_SITE_VERIFICATION",
  "BING_SITE_VERIFICATION",
  "BAIDU_SITE_VERIFICATION",
]);

export const sha256 = (value) => crypto.createHash("sha256").update(value).digest("hex");
export const canonicalJson = (value) => JSON.stringify(value, (_key, item) =>
  item && typeof item === "object" && !Array.isArray(item)
    ? Object.fromEntries(Object.entries(item).sort(([a], [b]) => a.localeCompare(b, "en")))
    : item);

export function isPublicBuildKey(key) {
  return /^NEXT_PUBLIC_[A-Z][A-Z0-9_]*$/.test(key) || verificationKeys.has(key);
}

export function publicBuildEnvironment(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Public build environment must be a JSON object");
  }
  const keys = Object.keys(value).sort();
  if (!keys.length || keys.length > 100) throw new Error("Unexpected public build environment size");
  for (const key of keys) {
    if (!isPublicBuildKey(key)) throw new Error("Build environment contains a non-public variable");
    if (typeof value[key] !== "string" || /[\x00-\x1f\x7f$\\]/.test(value[key])) {
      throw new Error("Build environment values must be single-line strings");
    }
  }
  const values = Object.fromEntries(keys.map((key) => [key, value[key]]));
  const canonical = JSON.stringify(values);
  if (Buffer.byteLength(canonical) > 40000) throw new Error("Public build environment is too large");
  return { values, keys, canonical, sha256: sha256(canonical) };
}

export function decodePublicBuildEnvironment(encoded) {
  if (typeof encoded !== "string" || !/^[A-Za-z0-9+/]+={0,2}$/.test(encoded) || encoded.length > 56000) {
    throw new Error("Public build environment must be canonical base64 JSON");
  }
  const bytes = Buffer.from(encoded, "base64");
  if (bytes.toString("base64") !== encoded) throw new Error("Invalid base64 build environment");
  const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  let value;
  try { value = JSON.parse(decoded); } catch { throw new Error("Build environment JSON is invalid"); }
  const result = publicBuildEnvironment(value);
  if (decoded !== result.canonical) throw new Error("Build environment JSON must use sorted unique keys without extra whitespace");
  return result;
}

// Converts the existing restricted local export into the JSON transport.
// Values are never evaluated as shell code or expanded through another env.
export function parsePublicEnvironmentFile(text) {
  const values = {};
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const match = /^([A-Z][A-Z0-9_]*)=(.*)$/.exec(line);
    if (!match || !isPublicBuildKey(match[1]) || Object.hasOwn(values, match[1])) {
      throw new Error("Invalid, duplicate, or non-public environment assignment");
    }
    let value = match[2].trim();
    if (value.startsWith('"') || value.startsWith("'")) {
      const quote = value[0];
      if (value.length < 2 || !value.endsWith(quote)) throw new Error("Unterminated environment value");
      value = value.slice(1, -1);
    } else if (value.includes("#")) {
      throw new Error("Unquoted environment comments are ambiguous");
    }
    if (/[\\$"']/.test(value)) throw new Error("Environment expansion, escaping, and embedded quotes are not supported");
    values[match[1]] = value;
  }
  return publicBuildEnvironment(values);
}

export function isPackagedNextFile(relative) {
  if (typeof relative !== "string" || relative.includes("\\") || !relative.startsWith(".next/")) return false;
  const parts = relative.split("/");
  if (parts.some((part) => !part || part === "." || part === ".." || /^\.env(?:\.|$)/.test(part))) return false;
  if (["cache", "dev"].includes(parts[1])) return false;
  return ![".next/trace", ".next/trace-build"].includes(relative);
}

export function nextBuildFiles(root) {
  const build = path.join(root, ".next");
  if (!fs.lstatSync(build).isDirectory() || fs.realpathSync(build) !== build) throw new Error("Unexpected build directory");
  const files = [];
  function walk(directory) {
    for (const name of fs.readdirSync(directory).sort()) {
      const absolute = path.join(directory, name);
      const relative = path.relative(root, absolute).split(path.sep).join("/");
      if (!isPackagedNextFile(relative)) continue;
      const stat = fs.lstatSync(absolute);
      if (stat.isSymbolicLink() || (!stat.isDirectory() && !stat.isFile())) throw new Error("Build archive cannot contain links or special files");
      if (stat.isDirectory()) walk(absolute);
      else files.push({ path: relative, bytes: stat.size, mode: stat.mode & 0o777, sha256: sha256(fs.readFileSync(absolute)) });
    }
  }
  walk(build);
  if (!files.some((file) => file.path === ".next/BUILD_ID")) throw new Error("Next build ID is missing");
  return files.sort((a, b) => a.path.localeCompare(b.path, "en"));
}

export function validateBuildInputs(event, context) {
  if (context.eventName !== "workflow_dispatch" || context.repository !== "AnxForever/stylekit") {
    throw new Error("Release artifacts require a manual run in the upstream repository");
  }
  if (!/^[a-f0-9]{40}$/.test(event.inputs?.expected_sha || "") || event.inputs.expected_sha !== context.sha) {
    throw new Error("Requested release commit differs from the workflow checkout");
  }
  return decodePublicBuildEnvironment(event.inputs.public_build_env_b64);
}
