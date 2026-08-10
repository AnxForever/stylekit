/**
 * Typed JSON fetcher for SWR
 */
export type ApiFetcherError = Error & {
  status: number;
  code?: string;
  migration?: string;
};

export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    let code: string | undefined;
    let migration: string | undefined;
    try {
      const payload = (await res.json()) as {
        error?: string;
        message?: string;
        code?: string;
        migration?: string;
      };
      if (typeof payload?.error === "string" && payload.error.trim().length > 0) {
        message = payload.error;
      } else if (
        typeof payload?.message === "string" &&
        payload.message.trim().length > 0
      ) {
        message = payload.message;
      }
      code = typeof payload?.code === "string" ? payload.code : undefined;
      migration =
        typeof payload?.migration === "string" ? payload.migration : undefined;
    } catch {
      // Ignore non-JSON error bodies.
    }

    const error = new Error(message) as ApiFetcherError;
    error.status = res.status;
    if (code) error.code = code;
    if (migration) error.migration = migration;
    throw error;
  }
  return res.json() as Promise<T>;
}
