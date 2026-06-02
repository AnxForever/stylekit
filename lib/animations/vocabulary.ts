// Animation vocabulary — taxonomy of motion design terms
// used when communicating with designers, engineers, and AI tools.
//
// Each term maps to one or more StyleKit animation patterns so the
// definition sits next to a working demo (the catalog already
// includes 49 copy-ready CSS implementations).
//
// Definitions are written from first principles (not transcribed from
// any external source). Categories are inspired by industry motion
// vocabulary but the order and grouping reflect what is actually
// useful inside StyleKit's library of patterns.

import type { TranslationKey } from "@/lib/i18n/translations";

/**
 * A single vocabulary term. `id` is stable (used for URL anchors and
 * cross-references); display strings come from i18n via the
 * `nameKey` / `definitionKey` so the page is bilingual.
 */
export interface VocabularyTerm {
  id: string;
  nameKey: TranslationKey;
  definitionKey: TranslationKey;
  /**
   * StyleKit animation slugs that demonstrate this term. Order
   * matters: the first slug is the canonical example and is rendered
   * larger; the rest are listed as "also see".
   */
  examplePatterns: string[];
  /** Related term ids rendered as inline links in the definition. */
  relatedTerms?: string[];
}

export interface VocabularyCategory {
  id: string;
  nameKey: TranslationKey;
  /**
   * One-sentence category blurb shown under the heading. Sits next to
   * the term grid so a reader knows what unifies these terms.
   */
  blurbKey: TranslationKey;
  terms: VocabularyTerm[];
}

export const vocabulary: VocabularyCategory[] = [
  {
    id: "entrances-exits",
    nameKey: "vocab.catEntrancesExits",
    blurbKey: "vocab.catEntrancesExitsBlurb",
    terms: [
      {
        id: "fade-in",
        nameKey: "vocab.fadeIn",
        definitionKey: "vocab.fadeInDef",
        examplePatterns: ["fade-in-up", "fade-in-down", "blur-in"],
        relatedTerms: ["slide-in", "scale-in", "pop-in"],
      },
      {
        id: "slide-in",
        nameKey: "vocab.slideIn",
        definitionKey: "vocab.slideInDef",
        examplePatterns: ["slide-in-left", "slide-in-right", "slide-out-right"],
        relatedTerms: ["fade-in", "translate"],
      },
      {
        id: "scale-in",
        nameKey: "vocab.scaleIn",
        definitionKey: "vocab.scaleInDef",
        examplePatterns: ["scale-in", "scale-out", "zoom-in"],
        relatedTerms: ["pop-in", "transform-origin"],
      },
      {
        id: "pop-in",
        nameKey: "vocab.popIn",
        definitionKey: "vocab.popInDef",
        examplePatterns: ["bounce-in", "elastic-snap", "elastic-scale"],
        relatedTerms: ["scale-in", "bounce", "spring"],
      },
      {
        id: "reveal",
        nameKey: "vocab.reveal",
        definitionKey: "vocab.revealDef",
        examplePatterns: ["text-reveal", "scroll-reveal"],
        relatedTerms: ["clip-path"],
      },
      {
        id: "fade-out",
        nameKey: "vocab.fadeOut",
        definitionKey: "vocab.fadeOutDef",
        examplePatterns: ["fade-out-down"],
        relatedTerms: ["fade-in"],
      },
    ],
  },
  {
    id: "sequencing-timing",
    nameKey: "vocab.catSequencingTiming",
    blurbKey: "vocab.catSequencingTimingBlurb",
    terms: [
      {
        id: "keyframes",
        nameKey: "vocab.keyframes",
        definitionKey: "vocab.keyframesDef",
        examplePatterns: ["fade-in-up", "pulse", "underline-draw"],
      },
      {
        id: "stagger",
        nameKey: "vocab.stagger",
        definitionKey: "vocab.staggerDef",
        examplePatterns: ["stagger-children"],
      },
      {
        id: "delay",
        nameKey: "vocab.delay",
        definitionKey: "vocab.delayDef",
        examplePatterns: ["stagger-children", "fade-in-down"],
        relatedTerms: ["stagger", "duration"],
      },
      {
        id: "duration",
        nameKey: "vocab.duration",
        definitionKey: "vocab.durationDef",
        examplePatterns: ["pulse", "shimmer"],
        relatedTerms: ["easing", "delay"],
      },
    ],
  },
  {
    id: "movement-transforms",
    nameKey: "vocab.catMovementTransforms",
    blurbKey: "vocab.catMovementTransformsBlurb",
    terms: [
      {
        id: "translate",
        nameKey: "vocab.translate",
        definitionKey: "vocab.translateDef",
        examplePatterns: ["slide-in-left", "slide-in-right", "parallax-float"],
      },
      {
        id: "scale",
        nameKey: "vocab.scale",
        definitionKey: "vocab.scaleDef",
        examplePatterns: ["scale-in", "scale-out", "zoom-in", "elastic-scale"],
      },
      {
        id: "rotate",
        nameKey: "vocab.rotate",
        definitionKey: "vocab.rotateInDef",
        examplePatterns: ["rotate-in", "flip-card"],
      },
      {
        id: "tilt-3d",
        nameKey: "vocab.tilt3d",
        definitionKey: "vocab.tilt3dDef",
        examplePatterns: ["tilt-3d", "flip-card"],
      },
    ],
  },
  {
    id: "transitions",
    nameKey: "vocab.catTransitions",
    blurbKey: "vocab.catTransitionsBlurb",
    terms: [
      {
        id: "crossfade",
        nameKey: "vocab.crossfade",
        definitionKey: "vocab.crossfadeDef",
        examplePatterns: ["crossfade", "text-gradient-flow"],
      },
      {
        id: "morph",
        nameKey: "vocab.morph",
        definitionKey: "vocab.morphDef",
        examplePatterns: ["morph-shape", "morph-transition"],
      },
      {
        id: "layout",
        nameKey: "vocab.layout",
        definitionKey: "vocab.layoutDef",
        examplePatterns: ["collapse", "slide-swap"],
      },
      {
        id: "accordion",
        nameKey: "vocab.accordion",
        definitionKey: "vocab.accordionDef",
        examplePatterns: ["collapse"],
      },
    ],
  },
  {
    id: "scroll",
    nameKey: "vocab.catScroll",
    blurbKey: "vocab.catScrollBlurb",
    terms: [
      {
        id: "scroll-reveal",
        nameKey: "vocab.scrollReveal",
        definitionKey: "vocab.scrollRevealDef",
        examplePatterns: ["scroll-reveal", "text-reveal"],
      },
      {
        id: "scroll-driven",
        nameKey: "vocab.scrollDriven",
        definitionKey: "vocab.scrollDrivenDef",
        examplePatterns: ["scroll-page-turn", "scroll-peel-away", "parallax-float"],
      },
      {
        id: "parallax",
        nameKey: "vocab.parallax",
        definitionKey: "vocab.parallaxDef",
        examplePatterns: ["parallax-float", "marquee-scroll"],
      },
      {
        id: "marquee",
        nameKey: "vocab.marquee",
        definitionKey: "vocab.marqueeDef",
        examplePatterns: ["marquee-scroll"],
        relatedTerms: ["loop", "parallax"],
      },
    ],
  },
  {
    id: "feedback-interaction",
    nameKey: "vocab.catFeedbackInteraction",
    blurbKey: "vocab.catFeedbackInteractionBlurb",
    terms: [
      {
        id: "hover",
        nameKey: "vocab.hover",
        definitionKey: "vocab.hoverDef",
        examplePatterns: ["hover-lift", "hover-glow", "magnetic-hover", "spotlight-card"],
      },
      {
        id: "press",
        nameKey: "vocab.press",
        definitionKey: "vocab.pressDef",
        examplePatterns: ["ripple-click"],
      },
      {
        id: "shake",
        nameKey: "vocab.shake",
        definitionKey: "vocab.shakeDef",
        examplePatterns: ["shake"],
      },
      {
        id: "ripple",
        nameKey: "vocab.ripple",
        definitionKey: "vocab.rippleDef",
        examplePatterns: ["ripple-click"],
        relatedTerms: ["press"],
      },
    ],
  },
  {
    id: "easing",
    nameKey: "vocab.catEasing",
    blurbKey: "vocab.catEasingBlurb",
    terms: [
      {
        id: "ease-out",
        nameKey: "vocab.easeOut",
        definitionKey: "vocab.easeOutDef",
        examplePatterns: ["fade-in-up", "scale-in"],
      },
      {
        id: "ease-in",
        nameKey: "vocab.easeIn",
        definitionKey: "vocab.easeInDef",
        examplePatterns: ["fade-out-down", "scale-out"],
      },
      {
        id: "ease-in-out",
        nameKey: "vocab.easeInOut",
        definitionKey: "vocab.easeInOutDef",
        examplePatterns: ["morph-transition", "crossfade"],
      },
      {
        id: "cubic-bezier",
        nameKey: "vocab.cubicBezier",
        definitionKey: "vocab.cubicBezierDef",
        examplePatterns: ["bounce-in", "elastic-snap"],
        relatedTerms: ["bounce", "spring"],
      },
    ],
  },
  {
    id: "spring",
    nameKey: "vocab.catSpring",
    blurbKey: "vocab.catSpringBlurb",
    terms: [
      {
        id: "spring",
        nameKey: "vocab.spring",
        definitionKey: "vocab.springDef",
        examplePatterns: ["elastic-snap", "elastic-scale", "bounce-in"],
        relatedTerms: ["stiffness", "damping"],
      },
      {
        id: "stiffness",
        nameKey: "vocab.stiffness",
        definitionKey: "vocab.stiffnessDef",
        examplePatterns: ["elastic-snap", "bounce-in"],
        relatedTerms: ["spring", "damping"],
      },
      {
        id: "damping",
        nameKey: "vocab.damping",
        definitionKey: "vocab.dampingDef",
        examplePatterns: ["pulse", "skeleton-pulse", "elastic-scale"],
        relatedTerms: ["spring", "stiffness"],
      },
      {
        id: "bounce",
        nameKey: "vocab.bounce",
        definitionKey: "vocab.bounceDef",
        examplePatterns: ["bounce-in", "elastic-snap"],
        relatedTerms: ["spring"],
      },
    ],
  },
  {
    id: "looping-ambient",
    nameKey: "vocab.catLoopingAmbient",
    blurbKey: "vocab.catLoopingAmbientBlurb",
    terms: [
      {
        id: "loop",
        nameKey: "vocab.loop",
        definitionKey: "vocab.loopDef",
        examplePatterns: ["pulse", "spinner-dots", "marquee-scroll"],
      },
      {
        id: "pulse",
        nameKey: "vocab.pulse",
        definitionKey: "vocab.pulseDef",
        examplePatterns: ["pulse", "pulse-ring", "skeleton-pulse"],
        relatedTerms: ["loop"],
      },
      {
        id: "shimmer",
        nameKey: "vocab.shimmer",
        definitionKey: "vocab.shimmerDef",
        examplePatterns: ["shimmer", "skeleton-pulse"],
        relatedTerms: ["loop"],
      },
      {
        id: "float",
        nameKey: "vocab.float",
        definitionKey: "vocab.floatDef",
        examplePatterns: ["parallax-float"],
        relatedTerms: ["loop"],
      },
    ],
  },
  {
    id: "polish-effects",
    nameKey: "vocab.catPolishEffects",
    blurbKey: "vocab.catPolishEffectsBlurb",
    terms: [
      {
        id: "blur",
        nameKey: "vocab.blur",
        definitionKey: "vocab.blurDef",
        examplePatterns: ["blur-in"],
      },
      {
        id: "clip-path",
        nameKey: "vocab.clipPath",
        definitionKey: "vocab.clipPathDef",
        examplePatterns: ["text-reveal", "scroll-reveal"],
      },
      {
        id: "line-drawing",
        nameKey: "vocab.lineDrawing",
        definitionKey: "vocab.lineDrawingDef",
        examplePatterns: ["underline-draw", "border-trace"],
      },
      {
        id: "typewriter",
        nameKey: "vocab.typewriter",
        definitionKey: "vocab.typewriterDef",
        examplePatterns: ["typewriter", "text-scramble"],
      },
    ],
  },
  {
    id: "performance",
    nameKey: "vocab.catPerformance",
    blurbKey: "vocab.catPerformanceBlurb",
    terms: [
      {
        id: "frame-rate",
        nameKey: "vocab.frameRate",
        definitionKey: "vocab.frameRateDef",
        examplePatterns: ["pulse", "scroll-reveal", "parallax-float"],
      },
      {
        id: "compositor",
        nameKey: "vocab.compositor",
        definitionKey: "vocab.compositorDef",
        examplePatterns: ["hover-lift", "scale-in", "parallax-float"],
      },
      {
        id: "gpu-accelerated",
        nameKey: "vocab.gpuAccelerated",
        definitionKey: "vocab.gpuAcceleratedDef",
        examplePatterns: ["hover-lift", "scale-in", "parallax-float", "tilt-3d"],
        relatedTerms: ["compositor"],
      },
    ],
  },
  {
    id: "principles",
    nameKey: "vocab.catPrinciples",
    blurbKey: "vocab.catPrinciplesBlurb",
    terms: [
      {
        id: "purposeful",
        nameKey: "vocab.purposeful",
        definitionKey: "vocab.purposefulDef",
        examplePatterns: ["hover-lift", "ripple-click"],
      },
      {
        id: "anticipation",
        nameKey: "vocab.anticipation",
        definitionKey: "vocab.anticipationDef",
        examplePatterns: ["bounce-in", "elastic-snap"],
      },
      {
        id: "perceived-performance",
        nameKey: "vocab.perceivedPerformance",
        definitionKey: "vocab.perceivedPerformanceDef",
        examplePatterns: ["skeleton-pulse", "shimmer", "progress-bar"],
      },
    ],
  },
];

// Flat lookups (built once, exposed for fast queries from the UI layer).
const _termIndex: Map<string, VocabularyTerm> = new Map();
const _categoryIndex: Map<string, VocabularyCategory> = new Map();
for (const cat of vocabulary) {
  _categoryIndex.set(cat.id, cat);
  for (const term of cat.terms) {
    _termIndex.set(term.id, term);
  }
}

export function getVocabularyTermById(id: string): VocabularyTerm | undefined {
  return _termIndex.get(id);
}

export function getVocabularyCategoryById(id: string): VocabularyCategory | undefined {
  return _categoryIndex.get(id);
}

/**
 * Reverse map: which vocabulary terms reference a given animation slug.
 * Used to render the "Vocabulary" column on each animation page so
 * terms and patterns stay bidirectionally linked.
 */
export function getTermsForPattern(slug: string): VocabularyTerm[] {
  const matches: VocabularyTerm[] = [];
  for (const term of _termIndex.values()) {
    if (term.examplePatterns.includes(slug)) {
      matches.push(term);
    }
  }
  return matches;
}
