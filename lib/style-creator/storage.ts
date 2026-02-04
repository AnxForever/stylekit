"use client";

/**
 * Style Creator Storage - localStorage persistence
 */

import type { StoredCustomStyle, CustomStyleDefinition } from "./types";

const STORAGE_KEY = "stylekit-custom-styles";

/**
 * Get all stored custom styles
 */
export function getStoredStyles(): StoredCustomStyle[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error("Failed to load custom styles:", error);
    return [];
  }
}

/**
 * Get a single stored style by ID
 */
export function getStoredStyleById(id: string): StoredCustomStyle | undefined {
  const styles = getStoredStyles();
  return styles.find((s) => s.id === id);
}

/**
 * Save a new custom style
 */
export function saveStyle(
  name: string,
  nameEn: string,
  definition: CustomStyleDefinition
): StoredCustomStyle {
  const styles = getStoredStyles();

  const newStyle: StoredCustomStyle = {
    id: generateId(),
    name,
    nameEn,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    definition,
  };

  styles.push(newStyle);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(styles));

  return newStyle;
}

/**
 * Update an existing custom style
 */
export function updateStyle(
  id: string,
  updates: Partial<Omit<StoredCustomStyle, "id" | "createdAt">>
): StoredCustomStyle | null {
  const styles = getStoredStyles();
  const index = styles.findIndex((s) => s.id === id);

  if (index === -1) return null;

  styles[index] = {
    ...styles[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(styles));

  return styles[index];
}

/**
 * Delete a custom style
 */
export function deleteStyle(id: string): boolean {
  const styles = getStoredStyles();
  const filtered = styles.filter((s) => s.id !== id);

  if (filtered.length === styles.length) return false;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

/**
 * Generate a unique ID
 */
function generateId(): string {
  return `custom-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Export style as JSON
 */
export function exportStyleAsJson(style: StoredCustomStyle): string {
  return JSON.stringify(style, null, 2);
}

/**
 * Import style from JSON
 */
export function importStyleFromJson(json: string): StoredCustomStyle | null {
  try {
    const parsed = JSON.parse(json);
    if (!parsed.definition || !parsed.name) {
      throw new Error("Invalid style format");
    }

    // Save with new ID
    return saveStyle(
      parsed.name,
      parsed.nameEn || parsed.name,
      parsed.definition
    );
  } catch (error) {
    console.error("Failed to import style:", error);
    return null;
  }
}
