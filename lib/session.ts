/**
 * Get or create an anonymous session ID for the current browser.
 * Used for ratings, comments, and favorites without requiring auth.
 */
export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  const key = "stylekit-session-id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}
