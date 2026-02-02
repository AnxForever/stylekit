// Knowledge Base - Typography / Font Pairings
// Data converted from typography.csv

import type { FontPairing } from "./types";
import { BM25 } from "./search";

export const fontPairings: FontPairing[] = [
  {
    name: "Classic Elegant",
    category: "Serif + Sans",
    headingFont: "Playfair Display",
    bodyFont: "Inter",
    mood: ["elegant", "luxury", "sophisticated", "timeless", "premium", "editorial"],
    bestFor: ["Luxury brands", "fashion", "spa", "beauty", "editorial", "magazines"],
    googleFontsUrl: "https://fonts.google.com/share?selection.family=Inter:wght@300;400;500;600;700|Playfair+Display:wght@400;500;600;700",
    cssImport: "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');",
    tailwindConfig: "fontFamily: { serif: ['Playfair Display', 'serif'], sans: ['Inter', 'sans-serif'] }",
    notes: "High contrast between elegant heading and clean body. Perfect for luxury/premium.",
  },
  {
    name: "Modern Professional",
    category: "Sans + Sans",
    headingFont: "Inter",
    bodyFont: "Inter",
    mood: ["modern", "professional", "clean", "corporate", "trustworthy"],
    bestFor: ["SaaS", "B2B", "corporate", "enterprise", "professional services"],
    googleFontsUrl: "https://fonts.google.com/share?selection.family=Inter:wght@300;400;500;600;700;800",
    cssImport: "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');",
    tailwindConfig: "fontFamily: { sans: ['Inter', 'sans-serif'] }",
    notes: "Single font family, weight variations for hierarchy. Clean and versatile.",
  },
  {
    name: "Tech Startup",
    category: "Sans + Sans",
    headingFont: "Space Grotesk",
    bodyFont: "Inter",
    mood: ["tech", "innovative", "modern", "startup", "cutting-edge"],
    bestFor: ["Tech startups", "AI/ML", "developer tools", "fintech"],
    googleFontsUrl: "https://fonts.google.com/share?selection.family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700",
    cssImport: "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap');",
    tailwindConfig: "fontFamily: { heading: ['Space Grotesk', 'sans-serif'], sans: ['Inter', 'sans-serif'] }",
    notes: "Geometric heading with readable body. Great for tech products.",
  },
  {
    name: "Editorial Classic",
    category: "Serif + Serif",
    headingFont: "Lora",
    bodyFont: "Lora",
    mood: ["editorial", "literary", "classic", "readable", "traditional"],
    bestFor: ["Blogs", "news", "magazines", "publishing", "content-heavy"],
    googleFontsUrl: "https://fonts.google.com/share?selection.family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400",
    cssImport: "@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');",
    tailwindConfig: "fontFamily: { serif: ['Lora', 'serif'] }",
    notes: "Classic serif for long-form reading. Excellent for editorial content.",
  },
  {
    name: "Minimal Swiss",
    category: "Sans + Sans",
    headingFont: "Helvetica Neue",
    bodyFont: "Helvetica Neue",
    mood: ["minimal", "swiss", "clean", "timeless", "neutral"],
    bestFor: ["Minimalist brands", "portfolios", "galleries", "design studios"],
    googleFontsUrl: "https://fonts.google.com/share?selection.family=Inter:wght@300;400;500;600;700",
    cssImport: "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');",
    tailwindConfig: "fontFamily: { sans: ['Helvetica Neue', 'Inter', 'sans-serif'] }",
    notes: "Use system Helvetica with Inter fallback. Swiss design aesthetic.",
  },
  {
    name: "Playful Creative",
    category: "Display + Sans",
    headingFont: "Poppins",
    bodyFont: "Nunito",
    mood: ["playful", "creative", "friendly", "approachable", "fun"],
    bestFor: ["EdTech", "kids apps", "creative agencies", "lifestyle brands"],
    googleFontsUrl: "https://fonts.google.com/share?selection.family=Nunito:wght@400;500;600;700&family=Poppins:wght@500;600;700;800",
    cssImport: "@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap');",
    tailwindConfig: "fontFamily: { heading: ['Poppins', 'sans-serif'], sans: ['Nunito', 'sans-serif'] }",
    notes: "Rounded, friendly fonts. Great for approachable brands.",
  },
  {
    name: "Bold Statement",
    category: "Display + Sans",
    headingFont: "Bebas Neue",
    bodyFont: "Open Sans",
    mood: ["bold", "impactful", "statement", "loud", "attention-grabbing"],
    bestFor: ["Marketing", "events", "sports", "entertainment", "landing pages"],
    googleFontsUrl: "https://fonts.google.com/share?selection.family=Bebas+Neue&family=Open+Sans:wght@400;500;600",
    cssImport: "@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans:wght@400;500;600&display=swap');",
    tailwindConfig: "fontFamily: { heading: ['Bebas Neue', 'sans-serif'], sans: ['Open Sans', 'sans-serif'] }",
    notes: "All-caps heading impact with readable body. High contrast.",
  },
  {
    name: "Wellness Calm",
    category: "Serif + Sans",
    headingFont: "Cormorant Garamond",
    bodyFont: "Lato",
    mood: ["calm", "wellness", "spa", "natural", "peaceful", "zen"],
    bestFor: ["Wellness", "spa", "yoga", "meditation", "healthcare", "organic"],
    googleFontsUrl: "https://fonts.google.com/share?selection.family=Cormorant+Garamond:wght@400;500;600&family=Lato:wght@300;400;700",
    cssImport: "@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Lato:wght@300;400;700&display=swap');",
    tailwindConfig: "fontFamily: { serif: ['Cormorant Garamond', 'serif'], sans: ['Lato', 'sans-serif'] }",
    notes: "Elegant serif heading with light body. Peaceful and calming.",
  },
  {
    name: "Developer Mono",
    category: "Mono + Sans",
    headingFont: "JetBrains Mono",
    bodyFont: "Inter",
    mood: ["technical", "developer", "code", "terminal", "hacker"],
    bestFor: ["Developer tools", "documentation", "technical blogs", "coding platforms"],
    googleFontsUrl: "https://fonts.google.com/share?selection.family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600;700",
    cssImport: "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600;700&display=swap');",
    tailwindConfig: "fontFamily: { mono: ['JetBrains Mono', 'monospace'], sans: ['Inter', 'sans-serif'] }",
    notes: "Monospace heading with clean body. Perfect for dev-focused products.",
  },
  {
    name: "Retro Vintage",
    category: "Display + Serif",
    headingFont: "Abril Fatface",
    bodyFont: "Merriweather",
    mood: ["retro", "vintage", "nostalgic", "classic", "old-school"],
    bestFor: ["Vintage brands", "cafes", "restaurants", "artisan", "craft"],
    googleFontsUrl: "https://fonts.google.com/share?selection.family=Abril+Fatface&family=Merriweather:wght@300;400;700",
    cssImport: "@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Merriweather:wght@300;400;700&display=swap');",
    tailwindConfig: "fontFamily: { display: ['Abril Fatface', 'serif'], serif: ['Merriweather', 'serif'] }",
    notes: "Bold display heading with classic body. Vintage aesthetic.",
  },
  {
    name: "Geometric Modern",
    category: "Sans + Sans",
    headingFont: "Outfit",
    bodyFont: "DM Sans",
    mood: ["geometric", "modern", "clean", "contemporary", "fresh"],
    bestFor: ["Modern brands", "apps", "startups", "e-commerce"],
    googleFontsUrl: "https://fonts.google.com/share?selection.family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@500;600;700;800",
    cssImport: "@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap');",
    tailwindConfig: "fontFamily: { heading: ['Outfit', 'sans-serif'], sans: ['DM Sans', 'sans-serif'] }",
    notes: "Geometric heading with optical body. Fresh and contemporary.",
  },
  {
    name: "News Editorial",
    category: "Serif + Sans",
    headingFont: "Fraunces",
    bodyFont: "Source Sans 3",
    mood: ["news", "editorial", "journalism", "serious", "informative"],
    bestFor: ["News sites", "journalism", "media", "reports", "publications"],
    googleFontsUrl: "https://fonts.google.com/share?selection.family=Fraunces:wght@600;700;800&family=Source+Sans+3:wght@400;500;600",
    cssImport: "@import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@600;700;800&family=Source+Sans+3:wght@400;500;600&display=swap');",
    tailwindConfig: "fontFamily: { heading: ['Fraunces', 'serif'], sans: ['Source Sans 3', 'sans-serif'] }",
    notes: "Strong serif heading with highly readable body. News aesthetic.",
  },
  {
    name: "E-commerce Clean",
    category: "Sans + Sans",
    headingFont: "Plus Jakarta Sans",
    bodyFont: "Plus Jakarta Sans",
    mood: ["commerce", "clean", "shopping", "retail", "modern"],
    bestFor: ["E-commerce", "retail", "marketplaces", "product pages"],
    googleFontsUrl: "https://fonts.google.com/share?selection.family=Plus+Jakarta+Sans:wght@400;500;600;700;800",
    cssImport: "@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');",
    tailwindConfig: "fontFamily: { sans: ['Plus Jakarta Sans', 'sans-serif'] }",
    notes: "Clean, modern font for commerce. Good readability at all sizes.",
  },
  {
    name: "Brutalist Bold",
    category: "Display + Mono",
    headingFont: "Anton",
    bodyFont: "Space Mono",
    mood: ["brutalist", "bold", "raw", "industrial", "unconventional"],
    bestFor: ["Art galleries", "fashion", "creative agencies", "experimental"],
    googleFontsUrl: "https://fonts.google.com/share?selection.family=Anton&family=Space+Mono:wght@400;700",
    cssImport: "@import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:wght@400;700&display=swap');",
    tailwindConfig: "fontFamily: { display: ['Anton', 'sans-serif'], mono: ['Space Mono', 'monospace'] }",
    notes: "Ultra-bold heading with mono body. Raw brutalist aesthetic.",
  },
  {
    name: "Dashboard Data",
    category: "Sans + Sans",
    headingFont: "Geist",
    bodyFont: "Geist",
    mood: ["dashboard", "data", "analytics", "clean", "professional"],
    bestFor: ["Dashboards", "analytics", "admin panels", "data visualization"],
    googleFontsUrl: "https://fonts.google.com/share?selection.family=Inter:wght@400;500;600;700",
    cssImport: "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');",
    tailwindConfig: "fontFamily: { sans: ['Geist', 'Inter', 'sans-serif'] }",
    notes: "Vercel's Geist font (or Inter fallback). Optimized for data UI.",
  },
  {
    name: "SaaS Friendly",
    category: "Sans + Sans",
    headingFont: "Manrope",
    bodyFont: "Manrope",
    mood: ["friendly", "saas", "approachable", "modern", "warm"],
    bestFor: ["SaaS products", "B2B", "productivity tools", "platforms"],
    googleFontsUrl: "https://fonts.google.com/share?selection.family=Manrope:wght@400;500;600;700;800",
    cssImport: "@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');",
    tailwindConfig: "fontFamily: { sans: ['Manrope', 'sans-serif'] }",
    notes: "Friendly yet professional. Great for SaaS products.",
  },
  {
    name: "Crypto Futuristic",
    category: "Sans + Sans",
    headingFont: "Orbitron",
    bodyFont: "Exo 2",
    mood: ["futuristic", "crypto", "tech", "sci-fi", "digital"],
    bestFor: ["Crypto", "blockchain", "Web3", "gaming", "sci-fi"],
    googleFontsUrl: "https://fonts.google.com/share?selection.family=Exo+2:wght@400;500;600&family=Orbitron:wght@500;600;700;800",
    cssImport: "@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600&family=Orbitron:wght@500;600;700;800&display=swap');",
    tailwindConfig: "fontFamily: { heading: ['Orbitron', 'sans-serif'], sans: ['Exo 2', 'sans-serif'] }",
    notes: "Futuristic geometric heading with clean body. Web3 aesthetic.",
  },
  {
    name: "Legal Professional",
    category: "Serif + Serif",
    headingFont: "Libre Baskerville",
    bodyFont: "Libre Baskerville",
    mood: ["professional", "legal", "traditional", "trustworthy", "formal"],
    bestFor: ["Law firms", "legal services", "consulting", "finance"],
    googleFontsUrl: "https://fonts.google.com/share?selection.family=Libre+Baskerville:ital,wght@0,400;0,700;1,400",
    cssImport: "@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');",
    tailwindConfig: "fontFamily: { serif: ['Libre Baskerville', 'serif'] }",
    notes: "Traditional serif. Establishes trust and professionalism.",
  },
  {
    name: "Healthcare Clean",
    category: "Sans + Sans",
    headingFont: "Rubik",
    bodyFont: "Rubik",
    mood: ["healthcare", "clean", "friendly", "accessible", "clear"],
    bestFor: ["Healthcare", "medical", "patient portals", "wellness apps"],
    googleFontsUrl: "https://fonts.google.com/share?selection.family=Rubik:wght@400;500;600;700",
    cssImport: "@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&display=swap');",
    tailwindConfig: "fontFamily: { sans: ['Rubik', 'sans-serif'] }",
    notes: "Friendly rounded sans. Accessible and non-threatening.",
  },
  {
    name: "Luxury Minimal",
    category: "Sans + Serif",
    headingFont: "Didot",
    bodyFont: "Montserrat",
    mood: ["luxury", "minimal", "high-end", "fashion", "elegant"],
    bestFor: ["Luxury fashion", "high-end retail", "premium brands"],
    googleFontsUrl: "https://fonts.google.com/share?selection.family=Montserrat:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600",
    cssImport: "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&family=Playfair+Display:wght@400;500;600&display=swap');",
    tailwindConfig: "fontFamily: { display: ['Didot', 'Playfair Display', 'serif'], sans: ['Montserrat', 'sans-serif'] }",
    notes: "High-contrast serif heading (use Playfair as web alternative to Didot).",
  },
];

// Pre-built BM25 index for typography search
let typographySearchIndex: BM25<FontPairing> | null = null;

function getTypographySearchIndex(): BM25<FontPairing> {
  if (!typographySearchIndex) {
    typographySearchIndex = new BM25(
      fontPairings,
      (f) =>
        `${f.name} ${f.category} ${f.headingFont} ${f.bodyFont} ${f.mood.join(" ")} ${f.bestFor.join(" ")}`
    );
  }
  return typographySearchIndex;
}

/**
 * Search font pairings by query
 */
export function searchTypography(query: string, maxResults = 5): FontPairing[] {
  return getTypographySearchIndex().search(query, maxResults);
}

/**
 * Get font pairing by name
 */
export function getFontPairingByName(name: string): FontPairing | undefined {
  const nameLower = name.toLowerCase();
  return fontPairings.find((f) => f.name.toLowerCase() === nameLower);
}

/**
 * Get font pairings by mood keyword
 */
export function getFontPairingsByMood(mood: string): FontPairing[] {
  const moodLower = mood.toLowerCase();
  return fontPairings.filter((f) =>
    f.mood.some((m) => m.toLowerCase().includes(moodLower))
  );
}

/**
 * Get all font pairings
 */
export function getAllFontPairings(): FontPairing[] {
  return fontPairings;
}
