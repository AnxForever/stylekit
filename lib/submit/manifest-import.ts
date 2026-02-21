export interface ManifestImportParseSuccess {
  ok: true;
  data: unknown;
  repaired: boolean;
  normalizedText: string;
}

export interface ManifestImportParseFailure {
  ok: false;
  error: string;
}

export type ManifestImportParseResult =
  | ManifestImportParseSuccess
  | ManifestImportParseFailure;

function stripBom(value: string): string {
  return value.replace(/^\uFEFF/, "");
}

function normalizeSmartQuotes(value: string): string {
  return value
    .replace(/[“”]/g, "\"")
    .replace(/[‘’]/g, "'");
}

function extractFencedJson(value: string): string | null {
  const match = value.match(/```(?:json|JSON)?\s*([\s\S]*?)```/);
  if (!match?.[1]) {
    return null;
  }
  const extracted = match[1].trim();
  return extracted.length > 0 ? extracted : null;
}

function extractFirstJsonObject(value: string): string | null {
  const start = value.indexOf("{");
  if (start < 0) {
    return null;
  }

  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = start; index < value.length; index += 1) {
    const char = value[index];

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === "\"") {
        inString = false;
      }
      continue;
    }

    if (char === "\"") {
      inString = true;
      continue;
    }

    if (char === "{") {
      depth += 1;
      continue;
    }

    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return value.slice(start, index + 1);
      }
    }
  }

  return null;
}

function shouldJoinWithoutSpace(previousChar: string, nextChar: string): boolean {
  if (!previousChar || !nextChar) {
    return true;
  }

  const previousJoinChars = "-/#<>=:_([{";
  const nextJoinChars = "-/#<>=:_)]}>.;,";
  return previousJoinChars.includes(previousChar) || nextJoinChars.includes(nextChar);
}

function repairBrokenWhitespaceInsideStrings(value: string): string {
  let output = "";
  let inString = false;
  let escaped = false;

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];

    if (inString) {
      if (escaped) {
        output += char;
        escaped = false;
        continue;
      }

      if (char === "\\") {
        output += char;
        escaped = true;
        continue;
      }

      if (char === "\"") {
        output += char;
        inString = false;
        continue;
      }

      if (char === "\n" || char === "\r" || char === "\t") {
        let nextIndex = index + 1;
        while (nextIndex < value.length) {
          const nextChar = value[nextIndex];
          if (nextChar !== " " && nextChar !== "\t" && nextChar !== "\r" && nextChar !== "\n") {
            break;
          }
          nextIndex += 1;
        }

        const previousChar = output[output.length - 1] ?? "";
        const nextChar = value[nextIndex] ?? "";
        if (!shouldJoinWithoutSpace(previousChar, nextChar) && output[output.length - 1] !== " ") {
          output += " ";
        }
        index = nextIndex - 1;
        continue;
      }

      output += char;
      continue;
    }

    if (char === "\"") {
      output += char;
      inString = true;
      continue;
    }

    output += char;
  }

  return output;
}

function removeTrailingCommas(value: string): string {
  let output = "";
  let inString = false;
  let escaped = false;

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index];

    if (inString) {
      if (escaped) {
        output += char;
        escaped = false;
        continue;
      }

      if (char === "\\") {
        output += char;
        escaped = true;
        continue;
      }

      if (char === "\"") {
        output += char;
        inString = false;
        continue;
      }

      output += char;
      continue;
    }

    if (char === "\"") {
      output += char;
      inString = true;
      continue;
    }

    if (char === ",") {
      let nextIndex = index + 1;
      while (nextIndex < value.length && /\s/.test(value[nextIndex])) {
        nextIndex += 1;
      }
      const nextChar = value[nextIndex];
      if (nextChar === "}" || nextChar === "]") {
        continue;
      }
    }

    output += char;
  }

  return output;
}

function buildCandidateList(rawValue: string): string[] {
  const deduped = new Map<string, true>();
  const normalizedRaw = stripBom(rawValue).trim();
  if (!normalizedRaw) {
    return [];
  }

  deduped.set(normalizedRaw, true);

  const fenced = extractFencedJson(normalizedRaw);
  if (fenced) {
    deduped.set(fenced, true);
  }

  const objectOnly = extractFirstJsonObject(normalizedRaw);
  if (objectOnly) {
    deduped.set(objectOnly, true);
  }

  return [...deduped.keys()];
}

function parseJson(value: string): unknown | null {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function repairCandidate(candidate: string): string {
  return removeTrailingCommas(
    repairBrokenWhitespaceInsideStrings(
      normalizeSmartQuotes(candidate)
    )
  );
}

export function parseManifestImportText(rawValue: string): ManifestImportParseResult {
  const candidates = buildCandidateList(rawValue);
  if (candidates.length === 0) {
    return {
      ok: false,
      error: "Empty input",
    };
  }

  for (const candidate of candidates) {
    const parsed = parseJson(candidate);
    if (parsed !== null) {
      return {
        ok: true,
        data: parsed,
        repaired: false,
        normalizedText: candidate,
      };
    }
  }

  for (const candidate of candidates) {
    const repairedCandidate = repairCandidate(candidate);
    const parsed = parseJson(repairedCandidate);
    if (parsed !== null) {
      return {
        ok: true,
        data: parsed,
        repaired: true,
        normalizedText: repairedCandidate,
      };
    }
  }

  return {
    ok: false,
    error: "Failed to parse JSON payload",
  };
}
