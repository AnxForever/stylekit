/** Text-only view of the same project delivered by the template ZIP endpoint. */
export interface TemplateSourceProject {
  slug: string;
  filename: string;
  source: string;
  entryPath: string;
  files: Record<string, string>;
  /** Included in the ZIP; their base64 payloads are not sent to the viewer. */
  binaryFiles: string[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isProjectPath(value: string): boolean {
  return value.length > 0 && !/[\\\u0000-\u001f:]/.test(value) &&
    value.split("/").every((part) => part !== "" && part !== "." && part !== ".." &&
      part !== "__proto__" && part !== "constructor" && part !== "prototype");
}

/** Reject an incomplete or malformed response before showing/copying its code. */
export function parseTemplateSourceProject(value: unknown): TemplateSourceProject | null {
  if (!isRecord(value) || typeof value.slug !== "string" ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.slug) ||
      typeof value.filename !== "string" || typeof value.entryPath !== "string" ||
      value.filename !== `${value.slug}.tsx` ||
      value.entryPath !== `app/templates/${value.slug}/page.tsx` ||
      typeof value.source !== "string" || !isRecord(value.files) ||
      !Array.isArray(value.binaryFiles)) return null;

  const entries = Object.entries(value.files);
  if (entries.length === 0 || entries.some(([name, text]) =>
    !isProjectPath(name) || typeof text !== "string"
  )) return null;

  const binaryFiles: string[] = [];
  for (const name of value.binaryFiles) {
    if (typeof name !== "string" || !isProjectPath(name) ||
        Object.hasOwn(value.files, name) || binaryFiles.includes(name)) return null;
    binaryFiles.push(name);
  }
  if (!Object.hasOwn(value.files, value.entryPath) ||
      value.files[value.entryPath] !== value.source) return null;

  return {
    slug: value.slug,
    filename: value.filename,
    source: value.source,
    entryPath: value.entryPath,
    files: Object.fromEntries(entries) as Record<string, string>,
    binaryFiles,
  };
}
