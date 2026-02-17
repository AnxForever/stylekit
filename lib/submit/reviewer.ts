/**
 * Submission Review Module
 *
 * Server-side functions for listing, approving, and rejecting
 * community-submitted styles stored in data/submissions/.
 */

import { readdir, readFile, writeFile, rename, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const SUBMISSIONS_DIR = path.join(process.cwd(), "data", "submissions");
const APPROVED_DIR = path.join(process.cwd(), "data", "submissions", "approved");
const REJECTED_DIR = path.join(process.cwd(), "data", "submissions", "rejected");

export interface SubmissionRecord {
  id: string;
  slug: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  reviewedAt?: string;
  reviewNote?: string;
  formData: Record<string, unknown>;
  tokens: Record<string, unknown>;
  designStyle: Record<string, unknown>;
}

export async function listSubmissions(
  filter?: "pending" | "approved" | "rejected"
): Promise<SubmissionRecord[]> {
  if (!existsSync(SUBMISSIONS_DIR)) {
    return [];
  }

  const files = await readdir(SUBMISSIONS_DIR);
  const jsonFiles = files.filter((f) => f.endsWith(".json"));

  const submissions: SubmissionRecord[] = [];
  for (const file of jsonFiles) {
    const filePath = path.join(SUBMISSIONS_DIR, file);
    const content = await readFile(filePath, "utf-8");
    const record = JSON.parse(content) as SubmissionRecord;
    if (!filter || record.status === filter) {
      submissions.push(record);
    }
  }

  return submissions.sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
}

export async function getSubmission(id: string): Promise<SubmissionRecord | null> {
  const filePath = path.join(SUBMISSIONS_DIR, `${id}.json`);
  if (!existsSync(filePath)) {
    return null;
  }
  const content = await readFile(filePath, "utf-8");
  return JSON.parse(content) as SubmissionRecord;
}

export async function approveSubmission(
  id: string,
  note?: string
): Promise<SubmissionRecord | null> {
  const submission = await getSubmission(id);
  if (!submission) return null;

  submission.status = "approved";
  submission.reviewedAt = new Date().toISOString();
  if (note) submission.reviewNote = note;

  // Write updated status back to original location
  const filePath = path.join(SUBMISSIONS_DIR, `${id}.json`);
  await writeFile(filePath, JSON.stringify(submission, null, 2), "utf-8");

  // Also copy to approved directory for easy access
  if (!existsSync(APPROVED_DIR)) {
    await mkdir(APPROVED_DIR, { recursive: true });
  }
  const approvedPath = path.join(APPROVED_DIR, `${id}.json`);
  await writeFile(approvedPath, JSON.stringify(submission, null, 2), "utf-8");

  return submission;
}

export async function rejectSubmission(
  id: string,
  note?: string
): Promise<SubmissionRecord | null> {
  const submission = await getSubmission(id);
  if (!submission) return null;

  submission.status = "rejected";
  submission.reviewedAt = new Date().toISOString();
  if (note) submission.reviewNote = note;

  const filePath = path.join(SUBMISSIONS_DIR, `${id}.json`);
  await writeFile(filePath, JSON.stringify(submission, null, 2), "utf-8");

  // Also copy to rejected directory
  if (!existsSync(REJECTED_DIR)) {
    await mkdir(REJECTED_DIR, { recursive: true });
  }
  const rejectedPath = path.join(REJECTED_DIR, `${id}.json`);
  await writeFile(rejectedPath, JSON.stringify(submission, null, 2), "utf-8");

  return submission;
}
