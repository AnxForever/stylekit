const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function asString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function asPositiveInt(value: unknown): number | null {
  if (typeof value === "number" && Number.isInteger(value) && value > 0) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    if (Number.isInteger(parsed) && parsed > 0) {
      return parsed;
    }
  }

  return null;
}

export function buildDisplaySeqIdMap(rows: unknown[] | null | undefined): Map<string, number> {
  const map = new Map<string, number>();
  if (!Array.isArray(rows)) {
    return map;
  }

  const sortedRows: Array<{ userId: string; seqId: number }> = [];

  for (const row of rows) {
    if (!row || typeof row !== "object" || Array.isArray(row)) {
      continue;
    }

    const record = row as Record<string, unknown>;
    const userId = asString(record.user_id);
    const seqId = asPositiveInt(record.seq_id);

    if (!userId || !UUID_RE.test(userId) || seqId == null) {
      continue;
    }

    sortedRows.push({ userId, seqId });
  }

  sortedRows.sort((a, b) => {
    if (a.seqId !== b.seqId) {
      return a.seqId - b.seqId;
    }

    return a.userId.localeCompare(b.userId);
  });

  sortedRows.forEach((row, index) => {
    map.set(row.userId, index + 1);
  });

  return map;
}

export function resolveDisplaySeqId(
  userId: string | null | undefined,
  rawSeqId: number | null,
  displaySeqIdMap: Map<string, number>
): number | null {
  if (userId) {
    const mapped = displaySeqIdMap.get(userId);
    if (mapped != null) {
      return mapped;
    }
  }

  return asPositiveInt(rawSeqId);
}
