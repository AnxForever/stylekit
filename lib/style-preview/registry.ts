import type { StylePreviewComponents } from "./types";
// Style preview imports
import preview000 from "./styles/neo-brutalist";
import preview001 from "./styles/neo-brutalist-soft";
import preview002 from "./styles/neo-brutalist-playful";
import preview003 from "./styles/editorial";
import preview004 from "./styles/neumorphism";
import preview005 from "./styles/glassmorphism";
import preview006 from "./styles/bento-grid";
import preview007 from "./styles/corporate-clean";
import preview008 from "./styles/minimalist-flat";
import preview009 from "./styles/soft-ui";
import preview010 from "./styles/cyberpunk-neon";
import preview011 from "./styles/natural-organic";
import preview012 from "./styles/modern-gradient";
import preview013 from "./styles/retro-vintage";
import preview014 from "./styles/dark-mode";
import preview015 from "./styles/macos-vibrancy";
import preview016 from "./styles/geometric-bold";
import preview017 from "./styles/masonry-flow";
import preview018 from "./styles/split-screen";
import preview019 from "./styles/full-page-scroll";
import preview020 from "./styles/timeline-vertical";
import preview021 from "./styles/card-stack";
import preview022 from "./styles/sidebar-fixed";
import preview023 from "./styles/magazine-grid";
import preview024 from "./styles/hero-fullscreen";
import preview025 from "./styles/claymorphism";
import preview026 from "./styles/notion-style";
import preview027 from "./styles/stripe-style";
import preview028 from "./styles/apple-style";
import preview029 from "./styles/pixel-art";
import preview030 from "./styles/vaporwave";
import preview031 from "./styles/y2k";
import preview032 from "./styles/memphis";
import preview033 from "./styles/art-deco";
import preview034 from "./styles/bauhaus";
import preview035 from "./styles/synthwave";
import preview036 from "./styles/skeuomorphism";
import preview037 from "./styles/swiss-style";
import preview038 from "./styles/ghibli-style";
import preview039 from "./styles/material-design";
import preview040 from "./styles/fluent-design";
import preview041 from "./styles/comic-style";
import preview042 from "./styles/sketch-style";
import preview043 from "./styles/watercolor-style";
import preview044 from "./styles/f-pattern-layout";
import preview045 from "./styles/z-pattern-layout";
import preview046 from "./styles/holy-grail-layout";
import preview047 from "./styles/dashboard-layout";
import preview048 from "./styles/art-nouveau";
import preview049 from "./styles/surrealism";
import preview050 from "./styles/ukiyo-e-digital";
import preview051 from "./styles/gothic";
import preview052 from "./styles/outrun";
import preview053 from "./styles/dark-academia";
import preview054 from "./styles/cottagecore";
import preview055 from "./styles/risograph";
import preview056 from "./styles/mecha";
import preview057 from "./styles/gothic-lolita";
import preview058 from "./styles/cyber-chinese";
import preview059 from "./styles/acid-graphics";
import preview060 from "./styles/hand-drawn-doodle";
import preview061 from "./styles/swiss-poster";
import preview062 from "./styles/watercolor-art";
import preview063 from "./styles/immersive-photo";
import preview064 from "./styles/impressionist-oil";
import preview065 from "./styles/collage-art";
import preview066 from "./styles/glitch-art";
import preview067 from "./styles/visual-novel";
import preview068 from "./styles/shoujo-manga";
import preview069 from "./styles/cyber-anime";
import preview070 from "./styles/pixel-anime";
import preview071 from "./styles/japanese-fresh";
import preview072 from "./styles/neon-samurai";
import preview073 from "./styles/magic-circle";
import preview074 from "./styles/cyber-wafuu";
import preview075 from "./styles/steampunk";
import preview076 from "./styles/pop-art";
import preview077 from "./styles/solarpunk";
import preview078 from "./styles/jrpg";
import preview079 from "./styles/asymmetric-grid";
import preview080 from "./styles/parallax-sections";
import preview081 from "./styles/warm-dashboard";
import preview082 from "./styles/neon-gradient";
import preview083 from "./styles/liquid-glass";
import preview084 from "./styles/scandinavian";
import preview085 from "./styles/cinematic-video-hero";
import preview140 from "./styles/launch-keynote";
import preview141 from "./styles/luxe-lookbook";
import preview142 from "./styles/shader-gradient";
import preview086 from "./styles/cel-shading";
import preview087 from "./styles/wabi-sabi";
import preview088 from "./styles/scrollytelling";
import preview089 from "./styles/sci-fi-hud";
import preview090 from "./styles/kawaii-minimal";
import preview091 from "./styles/film-noir";
import preview092 from "./styles/arcade-crt";
import preview093 from "./styles/frutiger-aero";
import preview094 from "./styles/anti-design";
import preview095 from "./styles/holographic";
import preview096 from "./styles/generative-art";
import preview097 from "./styles/particle";
import preview098 from "./styles/vhs-aesthetic";
import preview099 from "./styles/terracotta";
import preview100 from "./styles/brutalist-web";
import preview101 from "./styles/mid-century-modern";
import preview102 from "./styles/constructivism";
import preview103 from "./styles/op-art";
import preview104 from "./styles/islamic-geometric";
import preview105 from "./styles/indian-festive";
import preview106 from "./styles/african-textile";
import preview107 from "./styles/kinetic-typography";
import preview108 from "./styles/korean-minimal";
import preview109 from "./styles/parallax-editorial";
import preview110 from "./styles/pastel-goth";
import preview111 from "./styles/maximalism";
import preview112 from "./styles/medieval-manuscript";
import preview113 from "./styles/graffiti-street";
import preview114 from "./styles/marble-luxury";
import preview115 from "./styles/victorian-botanical";
import preview116 from "./styles/cubism";
import preview117 from "./styles/tropical-paradise";
import preview118 from "./styles/github-style";
import preview119 from "./styles/witchcore";
import preview120 from "./styles/neon-tokyo";
import preview121 from "./styles/paper-craft";
import preview122 from "./styles/blueprint";
import preview123 from "./styles/zen-garden";
import preview124 from "./styles/ink-wash";
import preview125 from "./styles/monochrome";
import preview126 from "./styles/dopamine-design";
import preview127 from "./styles/linear-style";
import preview128 from "./styles/shopify-clean";
import preview129 from "./styles/luxury-retail";
import preview130 from "./styles/fresh-market";
import preview131 from "./styles/data-dense";
import preview132 from "./styles/oversized-typography";
import preview133 from "./styles/developer-terminal";
import preview134 from "./styles/horizontal-gallery";
import preview135 from "./styles/latex-paper";
import preview136 from "./styles/distill-style";
import preview137 from "./styles/gallery-dark";
import preview138 from "./styles/studio-bold";
import preview139 from "./styles/warm-organic";
// End style preview imports

export const styleComponents: Record<string, StylePreviewComponents> = {
  // Style preview entries
  "neo-brutalist": preview000,
  "neo-brutalist-soft": preview001,
  "neo-brutalist-playful": preview002,
  "editorial": preview003,
  "neumorphism": preview004,
  "glassmorphism": preview005,
  "bento-grid": preview006,
  "corporate-clean": preview007,
  "minimalist-flat": preview008,
  "soft-ui": preview009,
  "cyberpunk-neon": preview010,
  "natural-organic": preview011,
  "modern-gradient": preview012,
  "retro-vintage": preview013,
  "dark-mode": preview014,
  "macos-vibrancy": preview015,
  "geometric-bold": preview016,
  "masonry-flow": preview017,
  "split-screen": preview018,
  "full-page-scroll": preview019,
  "timeline-vertical": preview020,
  "card-stack": preview021,
  "sidebar-fixed": preview022,
  "magazine-grid": preview023,
  "hero-fullscreen": preview024,
  "claymorphism": preview025,
  "notion-style": preview026,
  "stripe-style": preview027,
  "apple-style": preview028,
  "pixel-art": preview029,
  "vaporwave": preview030,
  "y2k": preview031,
  "memphis": preview032,
  "art-deco": preview033,
  "bauhaus": preview034,
  "synthwave": preview035,
  "skeuomorphism": preview036,
  "swiss-style": preview037,
  "ghibli-style": preview038,
  "material-design": preview039,
  "fluent-design": preview040,
  "comic-style": preview041,
  "sketch-style": preview042,
  "watercolor-style": preview043,
  "f-pattern-layout": preview044,
  "z-pattern-layout": preview045,
  "holy-grail-layout": preview046,
  "dashboard-layout": preview047,
  "art-nouveau": preview048,
  "surrealism": preview049,
  "ukiyo-e-digital": preview050,
  "gothic": preview051,
  "outrun": preview052,
  "dark-academia": preview053,
  "cottagecore": preview054,
  "risograph": preview055,
  "mecha": preview056,
  "gothic-lolita": preview057,
  "cyber-chinese": preview058,
  "acid-graphics": preview059,
  "hand-drawn-doodle": preview060,
  "swiss-poster": preview061,
  "watercolor-art": preview062,
  "immersive-photo": preview063,
  "impressionist-oil": preview064,
  "collage-art": preview065,
  "glitch-art": preview066,
  "visual-novel": preview067,
  "shoujo-manga": preview068,
  "cyber-anime": preview069,
  "pixel-anime": preview070,
  "japanese-fresh": preview071,
  "neon-samurai": preview072,
  "magic-circle": preview073,
  "cyber-wafuu": preview074,
  "steampunk": preview075,
  "pop-art": preview076,
  "solarpunk": preview077,
  "jrpg": preview078,
  "asymmetric-grid": preview079,
  "parallax-sections": preview080,
  "warm-dashboard": preview081,
  "neon-gradient": preview082,
  "liquid-glass": preview083,
  "scandinavian": preview084,
  "cinematic-video-hero": preview085,
  "cel-shading": preview086,
  "wabi-sabi": preview087,
  "scrollytelling": preview088,
  "sci-fi-hud": preview089,
  "kawaii-minimal": preview090,
  "film-noir": preview091,
  "arcade-crt": preview092,
  "frutiger-aero": preview093,
  "anti-design": preview094,
  "holographic": preview095,
  "generative-art": preview096,
  "particle": preview097,
  "vhs-aesthetic": preview098,
  "terracotta": preview099,
  "brutalist-web": preview100,
  "mid-century-modern": preview101,
  "constructivism": preview102,
  "op-art": preview103,
  "islamic-geometric": preview104,
  "indian-festive": preview105,
  "african-textile": preview106,
  "kinetic-typography": preview107,
  "korean-minimal": preview108,
  "parallax-editorial": preview109,
  "pastel-goth": preview110,
  "maximalism": preview111,
  "medieval-manuscript": preview112,
  "graffiti-street": preview113,
  "marble-luxury": preview114,
  "victorian-botanical": preview115,
  "cubism": preview116,
  "tropical-paradise": preview117,
  "github-style": preview118,
  "witchcore": preview119,
  "neon-tokyo": preview120,
  "paper-craft": preview121,
  "blueprint": preview122,
  "zen-garden": preview123,
  "ink-wash": preview124,
  "monochrome": preview125,
  "dopamine-design": preview126,
  "linear-style": preview127,
  "shopify-clean": preview128,
  "luxury-retail": preview129,
  "fresh-market": preview130,
  "data-dense": preview131,
  "oversized-typography": preview132,
  "developer-terminal": preview133,
  "horizontal-gallery": preview134,
  "latex-paper": preview135,
  "distill-style": preview136,
  "gallery-dark": preview137,
  "studio-bold": preview138,
  "warm-organic": preview139,
  "launch-keynote": preview140,
  "luxe-lookbook": preview141,
  "shader-gradient": preview142,
  // End style preview entries
};
