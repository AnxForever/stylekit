/**
 * Template Generator - Main Entry Point
 */

export * from "./types";
export * from "./zip-builder";
export * from "./style-injector";
export { landingTemplate } from "./templates/landing";
export { portfolioTemplate } from "./templates/portfolio";
export { blogTemplate } from "./templates/blog";
export { dashboardTemplate } from "./templates/dashboard";
export { generateHtmlFiles, generatePreviewHtml } from "./renderers/html-renderer";
export { generateReactFiles } from "./renderers/react-renderer";

import type { TemplateDefinition, TemplateType } from "./types";
import { landingTemplate } from "./templates/landing";
import { portfolioTemplate } from "./templates/portfolio";
import { blogTemplate } from "./templates/blog";
import { dashboardTemplate } from "./templates/dashboard";

/**
 * Get all available templates
 */
export function getTemplates(): TemplateDefinition[] {
  return [landingTemplate, portfolioTemplate, blogTemplate, dashboardTemplate];
}

/**
 * Get template by type
 */
export function getTemplateByType(type: TemplateType): TemplateDefinition | undefined {
  const templates = getTemplates();
  return templates.find((t) => t.type === type);
}
