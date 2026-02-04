/**
 * Template Generator - Main Entry Point
 */

export * from "./types";
export * from "./zip-builder";
export * from "./style-injector";
export { landingTemplate } from "./templates/landing";
export { portfolioTemplate } from "./templates/portfolio";
export { generateHtmlFiles, generatePreviewHtml } from "./renderers/html-renderer";
export { generateReactFiles } from "./renderers/react-renderer";

import type { TemplateDefinition, TemplateType } from "./types";
import { landingTemplate } from "./templates/landing";
import { portfolioTemplate } from "./templates/portfolio";

/**
 * Get all available templates
 */
export function getTemplates(): TemplateDefinition[] {
  return [landingTemplate, portfolioTemplate];
}

/**
 * Get template by type
 */
export function getTemplateByType(type: TemplateType): TemplateDefinition | undefined {
  const templates = getTemplates();
  return templates.find((t) => t.type === type);
}
