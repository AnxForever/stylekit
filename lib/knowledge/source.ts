import { createHash } from "node:crypto";
import { lstat, readdir, readFile } from "node:fs/promises";
import path from "node:path";

export interface KnowledgeMirrorRequest {
  id: string;
  repositoryUrl: string;
  commitSha: string;
  destinationRoot: string;
  licensePath: string;
}

export function validateKnowledgeMirrorRequest(input: KnowledgeMirrorRequest): KnowledgeMirrorRequest {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.id)) throw new Error("Resource id must be lowercase kebab-case.");
  if (!/^[0-9a-f]{7,64}$/i.test(input.commitSha)) throw new Error("Mirror source must use a git commit SHA.");
  const url = new URL(input.repositoryUrl);
  if (url.protocol !== "https:" || !["github.com", "gitlab.com"].includes(url.hostname.toLowerCase()) || url.username || url.password) {
    throw new Error("Mirror source must be an https GitHub or GitLab repository without credentials.");
  }
  const destinationRoot = path.resolve(input.destinationRoot);
  const licensePath = input.licensePath.replaceAll("\\", "/");
  if (!licensePath || licensePath.startsWith("/") || licensePath.split("/").includes("..")) throw new Error("License path must stay inside the mirror.");
  return { ...input, destinationRoot, licensePath };
}

export async function hashKnowledgeMirror(root: string): Promise<string> {
  const resolvedRoot = path.resolve(root);
  const hash = createHash("sha256");
  const files: string[] = [];

  async function collect(directory: string): Promise<void> {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      if ([".git", ".next", "node_modules", "dist", "build", "coverage", ".cache", ".turbo"].includes(entry.name)) continue;
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) await collect(absolute);
      else if (entry.isFile()) files.push(absolute);
    }
  }

  await collect(resolvedRoot);
  for (const file of files.sort()) {
    const relative = path.relative(resolvedRoot, file).replaceAll(path.sep, "/");
    const stats = await lstat(file);
    hash.update(relative);
    hash.update(String(stats.size));
    hash.update(await readFile(file));
  }
  return `sha256:${hash.digest("hex")}`;
}
