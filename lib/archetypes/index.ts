// Archetype Registry - Central registration for all layout archetypes

import type { LayoutArchetype, ArchetypeCategory, ArchetypeCollection } from "./types";
import { landingArchetypes } from "./landing";
import { dashboardArchetypes } from "./dashboard";
import { blogArchetypes } from "./blog";

// All archetypes by category
const archetypeCollections: ArchetypeCollection[] = [
  { category: "landing", archetypes: landingArchetypes },
  { category: "dashboard", archetypes: dashboardArchetypes },
  { category: "blog", archetypes: blogArchetypes },
];

// Flat registry for quick lookup
const archetypeRegistry: Record<string, LayoutArchetype> = {};

// Populate registry
for (const collection of archetypeCollections) {
  for (const archetype of collection.archetypes) {
    archetypeRegistry[archetype.id] = archetype;
  }
}

/**
 * Get all archetypes
 */
export function getAllArchetypes(): LayoutArchetype[] {
  return Object.values(archetypeRegistry);
}

/**
 * Get archetype by ID
 */
export function getArchetype(id: string): LayoutArchetype | undefined {
  return archetypeRegistry[id];
}

/**
 * Get archetypes by category
 */
export function getArchetypesByCategory(category: ArchetypeCategory): LayoutArchetype[] {
  const collection = archetypeCollections.find((c) => c.category === category);
  return collection?.archetypes || [];
}

/**
 * Get all categories that have archetypes
 */
export function getArchetypeCategories(): ArchetypeCategory[] {
  return archetypeCollections.map((c) => c.category);
}

/**
 * Get archetypes by tag
 */
export function getArchetypesByTag(tag: string): LayoutArchetype[] {
  return getAllArchetypes().filter((a) => a.tags?.includes(tag));
}

/**
 * Get archetypes recommended for a style
 */
export function getArchetypesForStyle(styleSlug: string): LayoutArchetype[] {
  return getAllArchetypes().filter(
    (a) => !a.recommendedStyles || a.recommendedStyles.includes(styleSlug)
  );
}

/**
 * Search archetypes by name or description
 */
export function searchArchetypes(query: string): LayoutArchetype[] {
  const lowerQuery = query.toLowerCase();
  return getAllArchetypes().filter(
    (a) =>
      a.name.toLowerCase().includes(lowerQuery) ||
      a.nameZh.includes(query) ||
      a.description.toLowerCase().includes(lowerQuery)
  );
}

// Re-export types
export * from "./types";
