// Extract Tailwind CSS classes from various code formats

export interface ExtractedClass {
  class: string;
  line: number;
  column: number;
  context: string; // The line of code where this class was found
}

/**
 * Extract Tailwind classes from JSX/TSX code
 * Handles className="...", className={`...`}, cn(...), clsx(...)
 */
export function extractClassesFromCode(code: string): ExtractedClass[] {
  const results: ExtractedClass[] = [];
  const lines = code.split("\n");

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];

    // Match className="..." or class="..."
    const staticClassRegex = /(?:className|class)\s*=\s*"([^"]+)"/g;
    let match: RegExpExecArray | null;
    while ((match = staticClassRegex.exec(line)) !== null) {
      const classes = match[1].split(/\s+/).filter(Boolean);
      for (const cls of classes) {
        results.push({
          class: cls,
          line: lineIdx + 1,
          column: match.index,
          context: line.trim(),
        });
      }
    }

    // Match className={`...`} (template literals)
    const templateRegex = /(?:className|class)\s*=\s*\{`([^`]+)`\}/g;
    while ((match = templateRegex.exec(line)) !== null) {
      // Extract static parts of template literal (ignore ${...} expressions)
      const templateContent = match[1].replace(/\$\{[^}]+\}/g, " ");
      const classes = templateContent.split(/\s+/).filter(Boolean);
      for (const cls of classes) {
        results.push({
          class: cls,
          line: lineIdx + 1,
          column: match.index,
          context: line.trim(),
        });
      }
    }

    // Match cn(...), clsx(...), twMerge(...) string arguments
    const utilRegex = /(?:cn|clsx|twMerge|cva)\s*\(\s*"([^"]+)"/g;
    while ((match = utilRegex.exec(line)) !== null) {
      const classes = match[1].split(/\s+/).filter(Boolean);
      for (const cls of classes) {
        results.push({
          class: cls,
          line: lineIdx + 1,
          column: match.index,
          context: line.trim(),
        });
      }
    }
  }

  return results;
}

/**
 * Extract Tailwind classes from a plain class string
 * e.g., "bg-white rounded-lg p-4 shadow-md"
 */
export function extractClassesFromString(classString: string): ExtractedClass[] {
  return classString
    .split(/\s+/)
    .filter(Boolean)
    .map((cls, idx) => ({
      class: cls,
      line: 1,
      column: idx,
      context: classString.trim(),
    }));
}

/**
 * Auto-detect input type and extract classes accordingly
 */
export function extractClasses(input: string): ExtractedClass[] {
  // If it looks like code (has JSX tags, className, etc.)
  if (
    input.includes("className") ||
    input.includes("class=") ||
    input.includes("<") ||
    input.includes("cn(") ||
    input.includes("clsx(")
  ) {
    return extractClassesFromCode(input);
  }

  // Otherwise treat as plain class string
  return extractClassesFromString(input);
}
