/**
 * Submission adapter for the style publication module.
 *
 * Submission records are an application concern; planning, projection, and
 * rollback live behind the small `lib/style-publication` interface.
 */

import type { SubmissionRecord } from "./reviewer";
import {
  publishStyle,
  type StylePublicationOptions,
  type StylePublicationResult,
} from "@/lib/style-publication";
import type { StyleScaffoldInput } from "@/lib/scaffold/style-scaffold";
import type { StyleCategory, StyleTag, StyleType } from "@/lib/styles/meta";

export type AutoRegisterResult = StylePublicationResult;

export async function autoRegisterStyle(
  submission: SubmissionRecord,
): Promise<AutoRegisterResult> {
  return publishStyleToCodebase(submission, process.cwd());
}

export async function publishStyleToCodebase(
  submission: SubmissionRecord,
  rootDir: string,
  options: StylePublicationOptions = {},
): Promise<AutoRegisterResult> {
  return publishStyle(buildScaffoldInput(submission), rootDir, options);
}

function buildScaffoldInput(submission: SubmissionRecord): StyleScaffoldInput {
  const fd = submission.formData ?? {};

  const slug = submission.slug || String(fd.slug ?? "unknown-style");
  const name = String(fd.name ?? fd.nameEn ?? slug);
  const nameEn = String(fd.nameEn ?? fd.name ?? slug);
  const description = String(fd.description ?? "");
  const category = String(fd.category ?? "modern") as StyleCategory;
  const styleType = String(fd.styleType ?? "visual") as StyleType;
  const tags = Array.isArray(fd.tags) ? (fd.tags.map(String) as StyleTag[]) : [];
  const primaryColor = String(fd.primaryColor ?? "#000000");
  const secondaryColor = String(fd.secondaryColor ?? "#ffffff");
  const accentColors = Array.isArray(fd.accentColors) ? fd.accentColors.map(String) : [];
  const keywords = Array.isArray(fd.keywords) ? fd.keywords.map(String) : [];
  const philosophy = String(fd.philosophy ?? "");
  const doList = Array.isArray(fd.doList) ? fd.doList.map(String) : [];
  const dontList = Array.isArray(fd.dontList) ? fd.dontList.map(String) : [];
  const buttonCode = String(fd.buttonCode ?? "");
  const cardCode = String(fd.cardCode ?? "");
  const inputCode = String(fd.inputCode ?? "");
  const previewModule = typeof fd.previewModule === "string" ? fd.previewModule : undefined;

  return {
    name,
    nameEn,
    slug,
    description,
    category,
    styleType,
    tags,
    primaryColor,
    secondaryColor,
    accentColors,
    keywords,
    philosophy,
    doList,
    dontList,
    buttonCode,
    cardCode,
    inputCode,
    previewModule,
  };
}
