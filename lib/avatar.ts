const EXACT_ALLOWED_AVATAR_HOSTS = new Set([
  "avatars.githubusercontent.com",
  "gravatar.com",
  "www.gravatar.com",
  "secure.gravatar.com",
  "linux.do",
  "connect.linux.do",
]);

const ALLOWED_AVATAR_HOST_SUFFIXES = [".linux.do", ".gravatar.com"];
const PROXIED_AVATAR_HOSTS = new Set([
  "avatars.githubusercontent.com",
  "gravatar.com",
  "www.gravatar.com",
  "secure.gravatar.com",
]);
const PROXIED_AVATAR_HOST_SUFFIXES = [".gravatar.com"];

export function isAllowedAvatarHostname(hostname: string): boolean {
  const normalized = hostname.trim().toLowerCase();
  return (
    EXACT_ALLOWED_AVATAR_HOSTS.has(normalized) ||
    ALLOWED_AVATAR_HOST_SUFFIXES.some((suffix) => normalized.endsWith(suffix))
  );
}

export function shouldProxyAvatarHostname(hostname: string): boolean {
  const normalized = hostname.trim().toLowerCase();
  return (
    PROXIED_AVATAR_HOSTS.has(normalized) ||
    PROXIED_AVATAR_HOST_SUFFIXES.some((suffix) => normalized.endsWith(suffix))
  );
}

export function getAvatarImageSrc(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:")
  ) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "https:" || !shouldProxyAvatarHostname(parsed.hostname)) {
      return trimmed;
    }

    return `/api/avatar?url=${encodeURIComponent(parsed.toString())}`;
  } catch {
    return trimmed;
  }
}
