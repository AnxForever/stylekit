export type {
  ColorGroup,
  ColorToken,
  ComponentSpec,
  CustomSection,
  DesignSpec,
  ElevationToken,
  FontToken,
  LocalizedText,
  PromptGuide,
  RadiusToken,
  SimilarStyle,
  SpecCompleteness,
  SpecLocale,
  SpacingSpec,
  SurfaceToken,
  TypeScaleStep,
} from "./types";

export { renderDesignMd, type DesignMdOptions } from "./render/design-md";
export { renderTailwindTheme } from "./render/tailwind";
export { renderCssVariables } from "./render/css-vars";
export { renderDtcg } from "./render/dtcg";
export { collectVariables, slugify } from "./render/shared";
