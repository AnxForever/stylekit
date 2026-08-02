// Merge logic for cloud kit sync. Pure + unit-tested so the API route and
// the client can trust the same rules. Kits are matched by id; when both
// sides have the same kit, the more recently updated one wins. Kits unique
// to either side are kept. This makes sign-in on a new device additive
// rather than destructive.

import type { Kit } from "./types";
import { normalizeKits } from "./storage";

function updatedMs(kit: Kit): number {
  const t = Date.parse(kit.updatedAt);
  return Number.isNaN(t) ? 0 : t;
}

export function mergeKitCollections(local: Kit[], remote: Kit[]): Kit[] {
  const byId = new Map<string, Kit>();

  for (const kit of remote) byId.set(kit.id, kit);
  for (const kit of local) {
    const existing = byId.get(kit.id);
    if (!existing || updatedMs(kit) >= updatedMs(existing)) {
      byId.set(kit.id, kit);
    }
  }

  // Deterministic order: most recently updated first, so the freshest work
  // surfaces as the natural active kit after a merge.
  const merged = Array.from(byId.values()).sort((a, b) => updatedMs(b) - updatedMs(a));
  return normalizeKits(merged);
}
