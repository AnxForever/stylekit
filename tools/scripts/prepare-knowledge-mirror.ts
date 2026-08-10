#!/usr/bin/env tsx

import { mkdtemp, mkdir, rm, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

import {
  hashKnowledgeMirror,
  loadKnowledgeCatalog,
  scanKnowledgeMirror,
  validateKnowledgeMirrorRequest,
} from "../../lib/knowledge";

function arg(name: string): string | undefined {
  return process.argv.find((value) => value.startsWith(`--${name}=`))?.slice(name.length + 3);
}

const id = arg("id");
const commitSha = arg("commit");
const destination = arg("destination");
const licensePath = arg("license-path") ?? "LICENSE";

if (!id || !commitSha || !destination) {
  console.error("Usage: npm run mirror:knowledge -- --id=shadcn-ui --commit=<sha> --destination=/tmp/stylekit-mirrors --license-path=LICENSE.md");
  process.exit(1);
}

const resource = (await loadKnowledgeCatalog({ includeUnpublished: true })).find((item) => item.id === id);
if (!resource?.repositoryUrl) throw new Error(`Manifest ${id} has no repositoryUrl.`);
const request = validateKnowledgeMirrorRequest({ id, repositoryUrl: resource.repositoryUrl, commitSha, destinationRoot: destination, licensePath });
const mirrorRoot = path.join(request.destinationRoot, request.id);
const tempRoot = await mkdtemp(path.join(os.tmpdir(), "stylekit-knowledge-git-"));

try {
  await mkdir(request.destinationRoot, { recursive: true });
  await run("git", ["clone", "--filter=blob:none", "--no-checkout", request.repositoryUrl, tempRoot]);
  await run("git", ["-C", tempRoot, "fetch", "--depth=1", "origin", request.commitSha]);
  await mkdir(mirrorRoot);
  await pipeArchive(tempRoot, request.commitSha, mirrorRoot);

  await stat(path.join(mirrorRoot, request.licensePath));
  const scan = await scanKnowledgeMirror(mirrorRoot);
  const snapshotHash = await hashKnowledgeMirror(mirrorRoot);
  const result = { id: request.id, repositoryUrl: request.repositoryUrl, commitSha: request.commitSha, mirrorRoot, licensePath: request.licensePath, snapshotHash, scan };
  console.log(JSON.stringify(result, null, 2));
  if (!scan.passed) process.exitCode = 1;
} finally {
  await rm(tempRoot, { recursive: true, force: true });
}

function run(command: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.once("error", reject);
    child.once("exit", (code) => code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`)));
  });
}

function pipeArchive(gitRoot: string, commit: string, destinationRoot: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const archive = spawn("git", ["-C", gitRoot, "archive", "--format=tar", commit], { stdio: ["ignore", "pipe", "pipe"] });
    const extract = spawn("tar", ["-xf", "-", "-C", destinationRoot], { stdio: ["pipe", "inherit", "inherit"] });
    archive.stdout.pipe(extract.stdin);
    let archiveCode: number | null = null;
    let extractCode: number | null = null;
    let settled = false;
    const fail = (error: Error) => {
      if (settled) return;
      settled = true;
      extract.kill();
      reject(error);
    };
    const finish = () => {
      if (settled || archiveCode === null || extractCode === null) return;
      if (archiveCode !== 0) return fail(new Error(`git archive exited with ${archiveCode}`));
      if (extractCode !== 0) return fail(new Error(`tar exited with ${extractCode}`));
      settled = true;
      resolve();
    };
    archive.once("error", fail);
    extract.once("error", fail);
    archive.once("close", (code) => { archiveCode = code; finish(); });
    extract.once("close", (code) => { extractCode = code; finish(); });
  });
}
