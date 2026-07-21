import { parseStyleExperiencePack } from "@/lib/experience-packs/schema";

const ownedPackAssetRights = {
  licenseId: "stylekit-owned-asset-v1",
  licenseName: "StyleKit Owned Asset Terms v1",
  licensor: "StyleKit",
  commercialUse: true,
  stylekitRedistribution: "allowed" as const,
  customerProjectUse: true,
  customerAssetRedistribution: "prohibited" as const,
  termsUrl: "https://www.stylekit.top/packs/corporate-clean-saas/license",
};

const ownedEvidenceRights = {
  ...ownedPackAssetRights,
  notes:
    "Deterministic screenshot of the installable Corporate Clean SaaS source. Marketing evidence only; not copied into the customer install package.",
};

export const corporateCleanSaasPack = parseStyleExperiencePack({
  slug: "corporate-clean-saas",
  styleSlug: "corporate-clean",
  version: "0.1.0",
  tier: "pro",
  status: "preview",
  preview: {
    mode: "curated",
    archetype: "app",
    generatedApprovedForPublic: false,
  },
  presentation: {
    title: "Corporate Clean SaaS Workspace",
    summary:
      "A self-contained B2B SaaS analytics workspace with responsive navigation, business states, scoped styles, documentation, and an owned product illustration.",
    categories: ["saas", "dashboard", "corporate-clean"],
  },
  assets: [
    {
      id: "product-shell-illustration",
      kind: "svg",
      role: "illustration",
      src: "/experience-packs/corporate-clean-saas/assets/product-shell.svg",
      distributable: true,
      decorative: false,
      alt: "Corporate Clean SaaS dashboard product overview",
      width: 1600,
      height: 900,
      contentHash: "sha256:1c81e885eb93a2220183a3f4749ecf0ff64335734765610c2363ea0365aee7c1",
      performance: {
        budgetBytes: 64 * 1024,
        loading: "lazy",
        responsive: true,
        animated: false,
      },
      creator: "StyleKit",
      sourceUrl:
        "https://www.stylekit.top/experience-packs/corporate-clean-saas/assets/product-shell.svg",
      upstreamRights: {
        ...ownedPackAssetRights,
        notes: "Original geometric SVG created inside the StyleKit repository.",
      },
      provenance: {
        originType: "owned",
        provider: "StyleKit",
        acquiredAt: "2026-07-11T00:00:00.000Z",
        auditStatus: "approved",
        auditedBy: "StyleKit internal product audit",
        auditedAt: "2026-07-11T00:00:00.000Z",
        sourceSnapshot:
          "/experience-packs/corporate-clean-saas/provenance/product-shell.json",
      },
      modified: false,
    },
    {
      id: "workspace-desktop-light-overview",
      kind: "image",
      role: "hero",
      src: "/experience-packs/corporate-clean-saas/evidence/workspace-desktop-light-overview.webp",
      distributable: false,
      decorative: false,
      alt: "Corporate Clean SaaS workspace on desktop in the light overview state",
      width: 1280,
      height: 1201,
      contentHash:
        "sha256:0bc3efadf5f1820630282cdd6394c7f64d8c738c85b328c1dff9b6ec526e70d8",
      performance: {
        budgetBytes: 160 * 1024,
        loading: "eager",
        responsive: true,
        animated: false,
      },
      creator: "StyleKit",
      sourceUrl:
        "https://www.stylekit.top/experience-packs/corporate-clean-saas/evidence/workspace-desktop-light-overview.webp",
      upstreamRights: ownedEvidenceRights,
      provenance: {
        originType: "owned",
        provider: "StyleKit deterministic browser capture",
        acquiredAt: "2026-07-11T01:19:02.895Z",
        auditStatus: "approved",
        auditedBy: "StyleKit internal product audit",
        auditedAt: "2026-07-11T12:00:00.000Z",
        sourceSnapshot:
          "/experience-packs/corporate-clean-saas/provenance/workspace-desktop-light-overview.json",
      },
      modified: false,
    },
    {
      id: "workspace-mobile-dark-success",
      kind: "image",
      role: "demo",
      src: "/experience-packs/corporate-clean-saas/evidence/workspace-mobile-dark-success.webp",
      distributable: false,
      decorative: false,
      alt: "Corporate Clean SaaS workspace on mobile in the dark success state",
      width: 398,
      height: 1876,
      contentHash:
        "sha256:605420915afdcfd07d4409aa39ad6bb11116f6f5862fe88b64ca51c0a093341b",
      performance: {
        budgetBytes: 96 * 1024,
        loading: "lazy",
        responsive: true,
        animated: false,
      },
      creator: "StyleKit",
      sourceUrl:
        "https://www.stylekit.top/experience-packs/corporate-clean-saas/evidence/workspace-mobile-dark-success.webp",
      upstreamRights: ownedEvidenceRights,
      provenance: {
        originType: "owned",
        provider: "StyleKit deterministic browser capture",
        acquiredAt: "2026-07-11T01:19:06.951Z",
        auditStatus: "approved",
        auditedBy: "StyleKit internal product audit",
        auditedAt: "2026-07-11T12:00:00.000Z",
        sourceSnapshot:
          "/experience-packs/corporate-clean-saas/provenance/workspace-mobile-dark-success.json",
      },
      modified: false,
    },
  ],
  motion: [
    {
      id: "revenue-line-reveal",
      trigger: "load",
      targets: ["revenue trend line"],
      durationMs: 620,
      delayMs: 120,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      intensity: "low",
      repeat: 0,
      dependencies: [],
      reducedMotion: {
        strategy: "static",
        description:
          "Render the revenue line immediately in its final state without drawing motion.",
      },
      performance: {
        preferredProperties: ["transform", "opacity"],
        layoutAnimation: false,
        continuous: false,
        pausesWhenOffscreen: true,
        pausesWhenPageHidden: true,
        notes: "One chart-line reveal only; no continuous dashboard animation.",
      },
      controls: {
        userCanPause: false,
        userCanReplay: false,
      },
    },
  ],
  interactions: [
    {
      id: "workspace-state-control",
      semantic: "functional",
      states: ["idle", "focus", "selected", "disabled"],
      inputs: ["pointer", "touch", "keyboard", "assistive-technology"],
      behavior:
        "Switch among overview, loading, empty, error, and success demonstrations without losing navigation state.",
      keyboardContract:
        "Tab reaches every state button; Enter or Space activates the focused state.",
      touchContract:
        "State and navigation controls provide at least a 40 CSS pixel height and do not require hover.",
      accessibilityNotes: [
        "Expose the selected state with aria-pressed.",
        "Keep loading, error, and success announcements in the semantic DOM.",
        "Do not communicate account health using color alone.",
      ],
    },
    {
      id: "responsive-sidebar",
      semantic: "functional",
      states: ["closed", "open", "focus"],
      inputs: ["pointer", "touch", "keyboard", "assistive-technology"],
      behavior:
        "Use a persistent sidebar on wide screens and an explicit open or close flow on small screens.",
      keyboardContract:
        "Tab reaches the menu button and every navigation item; Enter or Space opens, closes, and selects.",
      touchContract:
        "The menu button, backdrop, and navigation rows use explicit tap targets.",
      accessibilityNotes: [
        "Expose menu expansion with aria-expanded.",
        "Provide a labeled backdrop control to close the mobile navigation.",
      ],
    },
    {
      id: "theme-preview-control",
      semantic: "functional",
      states: ["light", "dark", "focus", "selected"],
      inputs: ["pointer", "touch", "keyboard", "assistive-technology"],
      behavior:
        "Switch the same installed dashboard between its light and dark production themes without changing the current business state.",
      keyboardContract:
        "Tab reaches both theme choices; Enter or Space activates the focused theme and aria-pressed exposes the selection.",
      touchContract:
        "Both theme choices remain visible and provide at least a 40 CSS pixel target on small screens.",
      accessibilityNotes: [
        "Theme names remain visible text and do not rely on sun or moon icons alone.",
        "Both themes preserve focus visibility, semantic status text, and chart meaning.",
      ],
    },
  ],
  evidence: [
    {
      id: "desktop-light-overview",
      assetRef: "workspace-desktop-light-overview",
      kind: "overview",
      device: "desktop",
      theme: "light",
      state: "overview",
      caption:
        "Desktop light-theme overview rendered from the same installable workspace source.",
    },
    {
      id: "mobile-dark-success",
      assetRef: "workspace-mobile-dark-success",
      kind: "state",
      device: "mobile",
      theme: "dark",
      state: "success",
      caption:
        "Mobile dark-theme success state with touch navigation and responsive data layout.",
    },
    {
      id: "owned-installable-illustration",
      assetRef: "product-shell-illustration",
      kind: "deliverable",
      device: "any",
      theme: "any",
      state: "installed",
      caption:
        "Owned SVG product illustration included in the customer installation package.",
    },
  ],
  claims: [
    {
      id: "real-runnable-workspace",
      statement:
        "The preview is rendered from the same self-contained source delivered to the customer.",
      evidenceRefs: ["desktop-light-overview"],
      installableRefs: ["corporate-clean-workspace", "corporate-dashboard-app"],
      motionRefs: [],
      interactionRefs: [],
    },
    {
      id: "responsive-theme-state-coverage",
      statement:
        "The workspace includes mobile navigation, light and dark themes, and explicit business states.",
      evidenceRefs: ["mobile-dark-success"],
      installableRefs: ["corporate-dashboard-app"],
      motionRefs: [],
      interactionRefs: [
        "workspace-state-control",
        "responsive-sidebar",
        "theme-preview-control",
      ],
    },
    {
      id: "owned-installable-asset",
      statement:
        "The customer package includes an owned, hash-verified SVG product asset with provenance evidence.",
      evidenceRefs: ["owned-installable-illustration"],
      installableRefs: ["corporate-dashboard-app"],
      motionRefs: [],
      interactionRefs: [],
    },
  ],
  blocks: [
    {
      id: "corporate-dashboard-app",
      title: "Corporate Clean Dashboard Application",
      kind: "section",
      files: [
        "components/corporate-clean/corporate-clean-saas.tsx",
        "components/corporate-clean/corporate-clean.module.css",
        "lib/corporate-clean/data.ts",
      ],
      dependencies: [],
      registryDependencies: [],
      assetRefs: ["product-shell-illustration"],
      motionRefs: ["revenue-line-reveal"],
      interactionRefs: [
        "workspace-state-control",
        "responsive-sidebar",
        "theme-preview-control",
      ],
    },
  ],
  templates: [
    {
      id: "corporate-clean-workspace",
      title: "Corporate Clean SaaS Workspace",
      kind: "page",
      route: "/corporate-clean",
      files: [
        "app/corporate-clean/page.tsx",
        "app/corporate-clean/loading.tsx",
        "app/corporate-clean/error.tsx",
        "README.md",
        "LICENSE.md",
        "THIRD_PARTY_NOTICES.md",
      ],
      dependencies: [],
      registryDependencies: ["corporate-dashboard-app"],
      assetRefs: [],
      motionRefs: [],
      interactionRefs: [],
    },
  ],
  compatibility: {
    next: "16.1.6",
    react: "19.2.3",
    tailwind: "4.1.x optional; scoped CSS Modules are self-contained",
    shadcn: "4.13.0 registry client; no shadcn component dependency",
    conflictPolicy: "fail",
    migrationPolicy:
      "Every breaking release includes explicit file-by-file migration instructions.",
    deprecationPolicy: "The previous minor release remains supported for 90 days.",
  },
  primaryDelivery: "registry",
  delivery: ["registry"],
  license: {
    id: "stylekit-pro-v1",
    name: "StyleKit Pro License v1",
    commercialUse: true,
    customerProjectUse: true,
    sourceRedistribution: "prohibited",
    assetRedistribution: "prohibited",
    termsUrl: "https://www.stylekit.top/packs/corporate-clean-saas/license",
    notes:
      "One purchaser or legal entity, up to five contributors, 12 months of pack updates, and 30 days of installation support. Validation terms require final commercial review before public sale.",
  },
});
