const DEFAULT_BASE_URL = "https://www.stylekit.top";

export function getSiteBaseUrl(): string {
  const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_BASE_URL;

  try {
    const url = new URL(rawBaseUrl);

    if (url.hostname === "stylekit.top") {
      url.hostname = "www.stylekit.top";
    }

    return url.origin;
  } catch {
    return DEFAULT_BASE_URL;
  }
}
