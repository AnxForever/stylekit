/**
 * Post-login redirect target validation.
 *
 * A `startsWith("/")` check is not enough: `//evil.com` and `/\evil.com` both
 * start with a slash, but browsers resolve them as protocol-relative URLs, so
 * `window.location.href = next` navigates off-site. Every consumer of a `next`
 * query param must go through this helper.
 */

export const DEFAULT_NEXT_PATH = "/styles";

/**
 * Control characters and whitespace can smuggle a scheme past naive checks,
 * because browsers strip them while parsing the URL.
 */
function hasUnsafeChar(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code <= 0x20 || code === 0x7f) {
      return true;
    }
  }
  return false;
}

export function sanitizeNextPath(
  value: string | null | undefined,
  fallback: string = DEFAULT_NEXT_PATH
): string {
  return isSafeNextPath(value) ? value : fallback;
}

export function isSafeNextPath(value: string | null | undefined): value is string {
  if (!value || !value.startsWith("/")) {
    return false;
  }

  // Reject protocol-relative forms (`//host`, `/\host`, and mixed variants).
  // Browsers normalize backslashes to forward slashes while parsing, so both
  // separators have to be treated the same way.
  const second = value[1];
  if (second === "/" || second === "\\") {
    return false;
  }

  return !hasUnsafeChar(value);
}
