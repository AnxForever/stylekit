import type { DesignStyle } from "./types";

export type ReadinessSource = "curated" | "fallback";
export type ReadinessSupport = "complete" | "partial" | "fallback" | "missing";
export type ThemeMode = "light" | "dark";

export type ComponentState =
  | "default"
  | "hover"
  | "focus-visible"
  | "active"
  | "disabled"
  | "loading"
  | "skeleton"
  | "empty"
  | "error"
  | "success";

export type ReadinessComponent =
  | "button"
  | "input"
  | "card"
  | "form"
  | "table"
  | "modal"
  | "toast"
  | "empty-state";

export interface ReadinessCheck {
  support: ReadinessSupport;
  guidance: string[];
}

export interface ComponentReadiness {
  states: ComponentState[];
  guidance: string[];
}

export interface ReadinessCoverage {
  darkMode: number;
  states: number;
  motion: number;
  accessibility: number;
  performance: number;
  overall: number;
}

export interface FrontendReadinessProfile {
  styleSlug: string;
  source: ReadinessSource;
  themeModes: ThemeMode[];
  darkMode: ReadinessCheck & {
    strategy: "explicit-tokens" | "semantic-inversion" | "fallback";
  };
  states: Record<ComponentState, ReadinessCheck>;
  components: Partial<Record<ReadinessComponent, ComponentReadiness>>;
  motion: ReadinessCheck & {
    duration: string;
    easing: string;
    reducedMotion: string;
  };
  accessibility: ReadinessCheck & {
    focus: string;
    targetSize: string;
    aria: string;
  };
  performance: ReadinessCheck & {
    costs: string[];
  };
  promptAddons: string[];
  coverage: ReadinessCoverage;
}

type FrontendReadinessDefinition = Omit<FrontendReadinessProfile, "coverage">;

const allStates: ComponentState[] = [
  "default",
  "hover",
  "focus-visible",
  "active",
  "disabled",
  "loading",
  "skeleton",
  "empty",
  "error",
  "success",
];

const coreInteractiveStates: ComponentState[] = [
  "default",
  "hover",
  "focus-visible",
  "active",
  "disabled",
];

const asyncStates: ComponentState[] = ["loading", "skeleton", "empty", "error", "success"];

function check(support: ReadinessSupport, guidance: string[]): ReadinessCheck {
  return { support, guidance };
}

function complete(guidance: string[]): ReadinessCheck {
  return check("complete", guidance);
}

function partial(guidance: string[]): ReadinessCheck {
  return check("partial", guidance);
}

function fallback(guidance: string[]): ReadinessCheck {
  return check("fallback", guidance);
}

function buildStates(
  completeStates: ComponentState[],
  partialStates: ComponentState[] = asyncStates
): Record<ComponentState, ReadinessCheck> {
  const completeSet = new Set(completeStates);
  const partialSet = new Set(partialStates);

  return Object.fromEntries(
    allStates.map((state) => {
      if (completeSet.has(state)) {
        return [
          state,
          complete([
            `Define a visible ${state} state with semantic tokens, not one-off colors.`,
          ]),
        ];
      }

      if (partialSet.has(state)) {
        return [
          state,
          partial([
            `Provide a ${state} state before production use; keep sizing stable across state changes.`,
          ]),
        ];
      }

      return [
        state,
        fallback([
          `No curated ${state} rule yet; use the base interactive contract and verify manually.`,
        ]),
      ];
    })
  ) as Record<ComponentState, ReadinessCheck>;
}

function standardComponents(): Partial<Record<ReadinessComponent, ComponentReadiness>> {
  return {
    button: {
      states: ["default", "hover", "focus-visible", "active", "disabled", "loading"],
      guidance: [
        "Keep icon and label positions stable between default and loading states.",
        "Disabled buttons need lower contrast but must remain readable.",
      ],
    },
    input: {
      states: ["default", "hover", "focus-visible", "disabled", "error", "success"],
      guidance: [
        "Reserve vertical space for helper or error text to avoid layout shift.",
        "Use focus-visible rings that remain legible against the style background.",
      ],
    },
    card: {
      states: ["default", "hover", "focus-visible", "loading", "skeleton", "empty"],
      guidance: [
        "Card hover should clarify interactivity; static content cards do not need hover lift.",
        "Skeletons should match the final card rhythm and aspect ratio.",
      ],
    },
    form: {
      states: ["default", "focus-visible", "disabled", "loading", "error", "success"],
      guidance: [
        "Show validation close to the field and include a page-level submit failure message.",
        "Do not replace form content with a spinner unless the user can still see context.",
      ],
    },
    table: {
      states: ["default", "hover", "focus-visible", "loading", "empty", "error"],
      guidance: [
        "Keep header, density, and horizontal scrolling predictable on mobile.",
        "Empty and error rows should preserve table structure.",
      ],
    },
    modal: {
      states: ["default", "focus-visible", "loading", "error", "success"],
      guidance: [
        "Trap focus, restore focus on close, and provide Escape plus explicit close controls.",
        "Avoid long animated entrances; clarity matters more than spectacle.",
      ],
    },
    toast: {
      states: ["default", "error", "success"],
      guidance: [
        "Use polite live-region behavior for non-critical updates.",
        "Do not rely on color alone for success or error meaning.",
      ],
    },
    "empty-state": {
      states: ["empty", "loading", "error"],
      guidance: [
        "Give the user a specific next action, not generic explanatory copy.",
        "Keep illustrations secondary to the task recovery path.",
      ],
    },
  };
}

function makeProfile(
  styleSlug: string,
  overrides: Partial<FrontendReadinessDefinition>
): FrontendReadinessDefinition {
  return {
    styleSlug,
    source: "curated",
    themeModes: ["light", "dark"],
    darkMode: {
      support: "partial",
      strategy: "semantic-inversion",
      guidance: [
        "Use semantic CSS variables for background, foreground, border, muted, and accent roles.",
        "Do not invert brand accents blindly; retune saturation and contrast per theme.",
      ],
    },
    states: buildStates(coreInteractiveStates),
    components: standardComponents(),
    motion: {
      support: "partial",
      duration: "120-220ms",
      easing: "cubic-bezier(0.2, 0, 0, 1)",
      reducedMotion: "Disable transform-based entrances and preserve opacity-only feedback.",
      guidance: [
        "Use motion for feedback and hierarchy, not decoration.",
        "Respect prefers-reduced-motion for all non-essential transitions.",
      ],
    },
    accessibility: {
      support: "partial",
      focus: "Use a 2px visible focus-visible ring with offset from the component edge.",
      targetSize: "Interactive controls should be at least 44px tall on touch surfaces.",
      aria: "Use native controls first; add ARIA only for composite widgets.",
      guidance: [
        "Check contrast in both light and dark modes.",
        "Keyboard navigation must cover menus, dialogs, forms, and generated tables.",
      ],
    },
    performance: {
      support: "partial",
      costs: [],
      guidance: [
        "Keep generated pages image-aware: explicit dimensions, lazy loading below the fold, and no layout shift.",
        "Avoid animating layout properties; prefer transform and opacity.",
      ],
    },
    promptAddons: [
      "Include dark mode and all interaction states in the generated UI.",
      "Use semantic tokens instead of hard-coded one-off colors.",
      "Add loading, empty, error, disabled, and success states for production workflows.",
    ],
    ...overrides,
  };
}

const curatedReadiness: Record<string, FrontendReadinessDefinition> = {
  "neo-brutalist": makeProfile("neo-brutalist", {
    darkMode: {
      support: "partial",
      strategy: "explicit-tokens",
      guidance: [
        "Keep the heavy black border language in dark mode, but move surfaces to near-black and use off-white text.",
        "Retain one loud accent per screen; avoid turning every panel into a high-chroma block.",
      ],
    },
    motion: {
      support: "partial",
      duration: "80-140ms",
      easing: "steps(2, end) or cubic-bezier(0.2, 0, 0, 1)",
      reducedMotion: "Remove impact shifts and keep hard color/border changes.",
      guidance: [
        "Use short press offsets and shadow snaps for buttons.",
        "Avoid springy or soft easing; the style should feel deliberate and mechanical.",
      ],
    },
    performance: {
      support: "complete",
      costs: ["Large borders and hard shadows are cheap; repeated oversized SVG textures are not."],
      guidance: [
        "Prefer CSS borders and box-shadow over image-heavy sticker effects.",
        "Keep large display text responsive with explicit max-widths.",
      ],
    },
  }),
  glassmorphism: makeProfile("glassmorphism", {
    darkMode: {
      support: "partial",
      strategy: "explicit-tokens",
      guidance: [
        "Dark glass needs higher surface opacity than light glass to keep text readable.",
        "Pair translucent panels with solid fallback backgrounds for low-support browsers.",
      ],
    },
    performance: {
      support: "partial",
      costs: [
        "backdrop-filter and large blur radii can hurt scrolling performance on mobile.",
        "Layered translucent cards increase paint work.",
      ],
      guidance: [
        "Limit backdrop blur to 12-20px and avoid nested glass panels.",
        "Use transform/opacity animations; do not animate blur values.",
      ],
    },
    promptAddons: [
      "Use translucent glass surfaces sparingly and include a solid fallback background.",
      "Keep contrast high enough on every frosted panel in light and dark modes.",
      "Do not nest multiple backdrop-blur containers.",
    ],
  }),
  "apple-style": makeProfile("apple-style", {
    darkMode: {
      support: "partial",
      strategy: "explicit-tokens",
      guidance: [
        "Use neutral near-black backgrounds, layered grays, and restrained accent color.",
        "Keep generous spacing and typography hierarchy identical between themes.",
      ],
    },
    motion: {
      support: "partial",
      duration: "180-260ms",
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      reducedMotion: "Replace spatial movement with opacity and subtle color changes.",
      guidance: [
        "Prefer subtle scale, opacity, and blur-free transitions.",
        "Do not add playful bounce or excessive parallax.",
      ],
    },
  }),
  "linear-style": makeProfile("linear-style", {
    darkMode: {
      support: "partial",
      strategy: "explicit-tokens",
      guidance: [
        "Use crisp dark surfaces with low-contrast borders and a single cool accent.",
        "Preserve dense but readable spacing; do not enlarge everything for dark mode.",
      ],
    },
    components: {
      ...standardComponents(),
      table: {
        states: ["default", "hover", "focus-visible", "loading", "empty", "error", "success"],
        guidance: [
          "Rows need clear hover, selected, empty, loading, and error treatments.",
          "Keep density compact while preserving 44px touch targets on mobile.",
        ],
      },
    },
  }),
  "corporate-clean": makeProfile("corporate-clean", {
    darkMode: {
      support: "partial",
      strategy: "semantic-inversion",
      guidance: [
        "Use muted navy or charcoal surfaces rather than pure black.",
        "Keep brand color reserved for primary actions, links, and key status indicators.",
      ],
    },
    accessibility: {
      support: "complete",
      focus: "Use clear blue or brand-accent focus rings with 2px width and 2px offset.",
      targetSize: "44px minimum touch height; dense desktop tables can use 36px with keyboard focus visible.",
      aria: "Prefer native form controls and table semantics.",
      guidance: [
        "Corporate pages need predictable keyboard order and readable status language.",
        "Avoid low-contrast gray-on-gray labels in forms and dashboards.",
      ],
    },
  }),
  "soft-ui": makeProfile("soft-ui", {
    darkMode: {
      support: "partial",
      strategy: "explicit-tokens",
      guidance: [
        "Dark soft UI needs subtle inner and outer shadows; avoid muddy low-contrast controls.",
        "Use stronger borders or rings for focus because depth cues weaken in dark mode.",
      ],
    },
    performance: {
      support: "partial",
      costs: ["Multiple layered shadows can increase paint cost on long scrolling lists."],
      guidance: [
        "Limit shadow-heavy components in tables or repeated cards.",
        "Use borders and background contrast for dense lists instead of stacked shadows.",
      ],
    },
  }),
  "material-design": makeProfile("material-design", {
    darkMode: {
      support: "partial",
      strategy: "explicit-tokens",
      guidance: [
        "Use tonal surfaces and state layers; do not simply invert light theme elevations.",
        "Keep primary, secondary, error, and surface roles separate.",
      ],
    },
    states: buildStates([...coreInteractiveStates, ...asyncStates]),
    promptAddons: [
      "Generate Material-style state layers for hover, focus, pressed, disabled, error, loading, and success.",
      "Use semantic elevation and tonal surfaces in both light and dark modes.",
    ],
  }),
  "dashboard-layout": makeProfile("dashboard-layout", {
    darkMode: {
      support: "partial",
      strategy: "semantic-inversion",
      guidance: [
        "Dark dashboards need clear surface separation for nav, filters, cards, tables, and charts.",
        "Chart colors must remain distinguishable under both themes.",
      ],
    },
    states: buildStates([...coreInteractiveStates, ...asyncStates]),
    performance: {
      support: "partial",
      costs: [
        "Large tables, charts, sticky columns, and live updates can harm INP if rendered eagerly.",
      ],
      guidance: [
        "Paginate or virtualize large tables.",
        "Keep loading and empty states per widget, not only at page level.",
      ],
    },
  }),
  "bento-grid": makeProfile("bento-grid", {
    darkMode: {
      support: "partial",
      strategy: "semantic-inversion",
      guidance: [
        "Give each tile a stable surface role in dark mode; avoid random dark tints.",
        "Maintain tile hierarchy through size, contrast, and content density.",
      ],
    },
    performance: {
      support: "partial",
      costs: ["Masonry-like responsive tiles can cause layout shift if media dimensions are not fixed."],
      guidance: [
        "Use explicit aspect ratios for every tile and media block.",
        "Keep hover effects from resizing cards or changing grid tracks.",
      ],
    },
  }),
};

function supportScore(support: ReadinessSupport): number {
  switch (support) {
    case "complete":
      return 100;
    case "partial":
      return 70;
    case "fallback":
      return 35;
    case "missing":
      return 0;
  }
}

function average(values: number[]): number {
  if (values.length === 0) return 0;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

export function calculateReadinessCoverage(
  profile: FrontendReadinessDefinition
): ReadinessCoverage {
  const darkMode = supportScore(profile.darkMode.support);
  const states = average(Object.values(profile.states).map((state) => supportScore(state.support)));
  const motion = supportScore(profile.motion.support);
  const accessibility = supportScore(profile.accessibility.support);
  const performance = supportScore(profile.performance.support);
  const overall = average([darkMode, states, motion, accessibility, performance]);

  return { darkMode, states, motion, accessibility, performance, overall };
}

function hasDarkSignals(style: Pick<DesignStyle, "globalCss" | "aiRules" | "components">): boolean {
  const corpus = [
    style.globalCss,
    style.aiRules,
    ...Object.values(style.components).map((component) => component?.code ?? ""),
  ].join("\n");
  return /\bdark:|prefers-color-scheme|dark mode|dark-mode|data-theme=["']dark/i.test(corpus);
}

function buildFallbackProfile(style: Pick<DesignStyle, "slug" | "globalCss" | "aiRules" | "components">): FrontendReadinessDefinition {
  const hasDarkMode = hasDarkSignals(style);

  return makeProfile(style.slug, {
    source: "fallback",
    themeModes: hasDarkMode ? ["light", "dark"] : ["light"],
    darkMode: {
      support: hasDarkMode ? "fallback" : "missing",
      strategy: "fallback",
      guidance: hasDarkMode
        ? [
            "This style contains dark-mode signals, but no curated dark token contract has been reviewed.",
            "Verify contrast, border visibility, and accent saturation before production use.",
          ]
        : [
            "No curated dark-mode contract exists yet.",
            "Create semantic dark tokens before shipping this style in a dark theme.",
          ],
    },
    states: buildStates(["default", "hover", "focus-visible"], [
      "active",
      "disabled",
      "loading",
      "skeleton",
      "empty",
      "error",
      "success",
    ]),
    performance: {
      support: "fallback",
      costs: ["No style-specific performance cost profile has been curated yet."],
      guidance: [
        "Check heavy shadows, blur, large media, and scroll-linked effects manually.",
        "Use explicit media dimensions and avoid layout-shifting hover states.",
      ],
    },
    promptAddons: [
      "Before production, add dark mode, loading, empty, error, disabled, success, hover, and focus-visible states.",
      "Verify contrast, keyboard navigation, target size, and reduced-motion behavior manually.",
    ],
  });
}

export function getFrontendReadiness(
  style: Pick<DesignStyle, "slug" | "globalCss" | "aiRules" | "components">
): FrontendReadinessProfile {
  const definition = curatedReadiness[style.slug] ?? buildFallbackProfile(style);
  return {
    ...definition,
    coverage: calculateReadinessCoverage(definition),
  };
}

export function hasCuratedFrontendReadiness(slug: string): boolean {
  return slug in curatedReadiness;
}

export function getCuratedReadinessSlugs(): string[] {
  return Object.keys(curatedReadiness);
}
