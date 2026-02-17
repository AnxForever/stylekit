/**
 * Typed JSON fetcher for SWR
 */
export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const payload = (await res.json()) as { error?: string; message?: string };
      if (typeof payload?.error === "string" && payload.error.trim().length > 0) {
        message = payload.error;
      } else if (
        typeof payload?.message === "string" &&
        payload.message.trim().length > 0
      ) {
        message = payload.message;
      }
    } catch {
      // Ignore non-JSON error bodies.
    }

    const error = new Error(message) as Error & { status: number };
    error.status = res.status;
    throw error;
  }
  return res.json() as Promise<T>;
}
