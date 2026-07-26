import {
  fontStack,
  generateGoogleFontsUrl,
  getFontPairingById,
  type FontPairing,
  type FontSpec,
} from "@/lib/typography";

export interface ShowcaseTypographyProfile {
  id: string;
  pairing: FontPairing;
  mono: FontSpec;
  stylesheetUrl: string;
  displayStack: string;
  bodyStack: string;
  monoStack: string;
}

const fragmentMono: FontSpec = { family: "Fragment Mono", weight: 400 };
const azeretMono: FontSpec = { family: "Azeret Mono", weight: 600 };
const LEGACY_TYPOGRAPHY_SLUGS = new Set(["neo-brutalist"]);

const PROFILE_PAIRINGS = {
  atelier: "atelier-bricolage",
  catalog: "gallery-gloock",
  literary: "literary-alegreya",
  museum: "museum-kalnia",
  playful: "anime-dela",
  poster: "swiss-archivo",
  retro: "retro-yeseva",
  signal: "future-unbounded",
} as const;

type ProfileId = keyof typeof PROFILE_PAIRINGS;

const PROFILE_SLUGS: Record<ProfileId, readonly string[]> = {
  atelier: [
    "apple-style",
    "launch-keynote",
    "shader-gradient",
    "bento-grid",
    "corporate-clean",
    "fluent-design",
    "github-style",
    "korean-minimal",
    "linear-style",
    "liquid-glass",
    "macos-vibrancy",
    "material-design",
    "minimalist-flat",
    "modern-gradient",
    "notion-style",
    "scandinavian",
    "shopify-clean",
    "soft-ui",
    "stripe-style",
  ],
  catalog: [
    "art-deco",
    "luxe-lookbook",
    "editorial",
    "gallery-dark",
    "glassmorphism",
    "luxury-retail",
    "magazine-grid",
    "marble-luxury",
    "monochrome",
    "oversized-typography",
    "parallax-editorial",
    "victorian-botanical",
  ],
  literary: [
    "cottagecore",
    "dark-academia",
    "distill-style",
    "ink-wash",
    "japanese-fresh",
    "latex-paper",
    "medieval-manuscript",
    "sketch-style",
    "wabi-sabi",
    "witchcore",
  ],
  museum: [
    "african-textile",
    "art-nouveau",
    "collage-art",
    "cubism",
    "generative-art",
    "impressionist-oil",
    "indian-festive",
    "islamic-geometric",
    "natural-organic",
    "paper-craft",
    "risograph",
    "surrealism",
    "warm-organic",
    "watercolor-art",
    "watercolor-style",
    "zen-garden",
  ],
  playful: [
    "cel-shading",
    "comic-style",
    "cyber-anime",
    "ghibli-style",
    "jrpg",
    "kawaii-minimal",
    "pixel-anime",
    "pixel-art",
    "shoujo-manga",
    "tropical-paradise",
    "visual-novel",
  ],
  poster: [
    "acid-graphics",
    "anti-design",
    "bauhaus",
    "brutalist-web",
    "constructivism",
    "dopamine-design",
    "geometric-bold",
    "graffiti-street",
    "kinetic-typography",
    "neo-brutalist",
    "neo-brutalist-playful",
    "neo-brutalist-soft",
    "pop-art",
    "studio-bold",
    "swiss-poster",
    "swiss-style",
  ],
  retro: [
    "arcade-crt",
    "film-noir",
    "frutiger-aero",
    "gothic",
    "gothic-lolita",
    "maximalism",
    "mid-century-modern",
    "outrun",
    "retro-vintage",
    "steampunk",
    "vhs-aesthetic",
    "y2k",
  ],
  signal: [
    "blueprint",
    "cyber-chinese",
    "cyber-wafuu",
    "cyberpunk-neon",
    "dark-mode",
    "data-dense",
    "developer-terminal",
    "glitch-art",
    "holographic",
    "mecha",
    "neon-gradient",
    "neon-samurai",
    "neon-tokyo",
    "particle",
    "sci-fi-hud",
    "synthwave",
    "vaporwave",
  ],
};

const profileBySlug = new Map(
  Object.entries(PROFILE_SLUGS).flatMap(([profile, slugs]) =>
    slugs.map((slug) => [slug, profile as ProfileId] as const)
  )
);

// Static stand-in for the former style-meta category fallback
// (minimal -> catalog, retro -> retro, expressive -> poster, modern or
// unknown -> atelier). Importing the full meta registry here pulled the
// whole bilingual catalog into the shared layout client bundle, so the
// mapping is inlined for the slugs missing from PROFILE_SLUGS. When a new
// style ships without a PROFILE_SLUGS entry and its category is not
// "modern", add it here to keep the same profile it would have resolved to.
const FALLBACK_PROFILE_BY_SLUG: Record<string, ProfileId> = {
  "card-stack": "poster",
  "cinematic-video-hero": "poster",
  "full-page-scroll": "poster",
  "hand-drawn-doodle": "poster",
  "hero-fullscreen": "poster",
  "horizontal-gallery": "catalog",
  "immersive-photo": "poster",
  "magic-circle": "poster",
  "memphis": "retro",
  "op-art": "poster",
  "pastel-goth": "poster",
  "scrollytelling": "poster",
  "skeuomorphism": "retro",
  "terracotta": "catalog",
  "timeline-vertical": "catalog",
  "ukiyo-e-digital": "retro",
};

function resolveProfileId(slug: string): ProfileId {
  const explicit = profileBySlug.get(slug);
  if (explicit) return explicit;

  return FALLBACK_PROFILE_BY_SLUG[slug] ?? "atelier";
}

function getProfileMono(profileId: ProfileId): FontSpec {
  return profileId === "signal" ? azeretMono : fragmentMono;
}

export function getShowcaseTypographyProfile(
  pathname: string
): ShowcaseTypographyProfile | null {
  const match = pathname.match(
    /^\/(?:en\/|zh\/)?styles\/([^/]+)\/showcase(?:\/|$)/
  );
  if (!match) return null;

  const slug = match[1];
  if (LEGACY_TYPOGRAPHY_SLUGS.has(slug)) return null;

  const profileId = resolveProfileId(slug);
  const pairing = getFontPairingById(PROFILE_PAIRINGS[profileId]);
  if (!pairing) return null;

  const mono = getProfileMono(profileId);
  return {
    id: profileId,
    pairing,
    mono,
    stylesheetUrl: generateGoogleFontsUrl([
      pairing.heading,
      pairing.body,
      mono,
    ]),
    displayStack: fontStack(pairing.heading),
    bodyStack: fontStack(pairing.body),
    monoStack: fontStack(mono),
  };
}
