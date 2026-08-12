export const DEFAULT_NEXT_PATH = "/styles";

function hasUnsafeCharacter(value: string): boolean {
  return [...value].some((character) => {
    const code = character.charCodeAt(0);
    return code <= 0x20 || code === 0x7f;
  });
}

/** Accept only same-origin application paths for post-login redirects. */
export function sanitizeNextPath(
  value: string | null | undefined,
  fallback = DEFAULT_NEXT_PATH,
): string {
  if (!value || !value.startsWith("/") || hasUnsafeCharacter(value)) {
    return fallback;
  }

  // Browsers normalize backslashes while resolving URLs, so reject both
  // protocol-relative forms: //host and /\\host.
  if (value[1] === "/" || value[1] === "\\") {
    return fallback;
  }

  return value;
}

export function isSafeNextPath(value: string | null | undefined): value is string {
  return Boolean(value) && sanitizeNextPath(value, "") === value;
}
