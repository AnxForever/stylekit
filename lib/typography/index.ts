// Typography / Font Pairing Library
// Curated font pairings for design systems using Google Fonts

export type TypographyCategory =
  | "classic"
  | "modern"
  | "playful"
  | "editorial"
  | "technical"
  | "elegant";

export interface FontSpec {
  family: string;
  weight: number;
  googleFontsUrl: string;
}

export interface FontPairing {
  id: string;
  name: string;
  nameZh: string;
  heading: FontSpec;
  body: FontSpec;
  category: TypographyCategory;
  css: string;
  tailwind: string;
  tags: string[];
  mood: string[];
}

export const fontPairings: FontPairing[] = [
  // === Classic ===
  {
    id: "editorial-serif",
    name: "Editorial Serif",
    nameZh: "经典社论",
    heading: {
      family: "Playfair Display",
      weight: 700,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap",
    },
    body: {
      family: "Source Sans 3",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400&display=swap",
    },
    category: "classic",
    css: "font-family: 'Playfair Display', serif; /* heading */\nfont-family: 'Source Sans 3', sans-serif; /* body */",
    tailwind: "font-['Playfair_Display'] font-bold /* heading */\nfont-['Source_Sans_3'] font-normal /* body */",
    tags: ["serif", "editorial", "magazine"],
    mood: ["elegant", "professional", "timeless"],
  },
  {
    id: "classic-times",
    name: "Classic Times",
    nameZh: "经典时代",
    heading: {
      family: "Merriweather",
      weight: 700,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Merriweather:wght@700&display=swap",
    },
    body: {
      family: "Open Sans",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap",
    },
    category: "classic",
    css: "font-family: 'Merriweather', serif; /* heading */\nfont-family: 'Open Sans', sans-serif; /* body */",
    tailwind: "font-['Merriweather'] font-bold /* heading */\nfont-['Open_Sans'] font-normal /* body */",
    tags: ["serif", "readable", "traditional"],
    mood: ["trustworthy", "classic", "readable"],
  },
  {
    id: "elegant-lora",
    name: "Elegant Lora",
    nameZh: "优雅洛拉",
    heading: {
      family: "Lora",
      weight: 600,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Lora:wght@600&display=swap",
    },
    body: {
      family: "Lato",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap",
    },
    category: "elegant",
    css: "font-family: 'Lora', serif; /* heading */\nfont-family: 'Lato', sans-serif; /* body */",
    tailwind: "font-['Lora'] font-semibold /* heading */\nfont-['Lato'] font-normal /* body */",
    tags: ["serif", "elegant", "refined"],
    mood: ["sophisticated", "elegant", "refined"],
  },

  // === Modern ===
  {
    id: "modern-sans",
    name: "Modern Sans",
    nameZh: "现代无衬线",
    heading: {
      family: "Inter",
      weight: 700,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap",
    },
    body: {
      family: "Inter",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap",
    },
    category: "modern",
    css: "font-family: 'Inter', sans-serif; /* heading */\nfont-family: 'Inter', sans-serif; /* body */",
    tailwind: "font-['Inter'] font-bold /* heading */\nfont-['Inter'] font-normal /* body */",
    tags: ["sans-serif", "clean", "modern"],
    mood: ["clean", "modern", "minimal"],
  },
  {
    id: "tech-stack",
    name: "Tech Stack",
    nameZh: "科技栈",
    heading: {
      family: "Space Grotesk",
      weight: 700,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap",
    },
    body: {
      family: "DM Sans",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400&display=swap",
    },
    category: "modern",
    css: "font-family: 'Space Grotesk', sans-serif; /* heading */\nfont-family: 'DM Sans', sans-serif; /* body */",
    tailwind: "font-['Space_Grotesk'] font-bold /* heading */\nfont-['DM_Sans'] font-normal /* body */",
    tags: ["sans-serif", "tech", "geometric"],
    mood: ["tech", "modern", "innovative"],
  },
  {
    id: "geometric-bold",
    name: "Geometric Bold",
    nameZh: "几何粗体",
    heading: {
      family: "Montserrat",
      weight: 800,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap",
    },
    body: {
      family: "Nunito",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Nunito:wght@400&display=swap",
    },
    category: "modern",
    css: "font-family: 'Montserrat', sans-serif; /* heading */\nfont-family: 'Nunito', sans-serif; /* body */",
    tailwind: "font-['Montserrat'] font-extrabold /* heading */\nfont-['Nunito'] font-normal /* body */",
    tags: ["sans-serif", "geometric", "bold"],
    mood: ["bold", "confident", "strong"],
  },
  {
    id: "swiss-style",
    name: "Swiss Style",
    nameZh: "瑞士风格",
    heading: {
      family: "Work Sans",
      weight: 600,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Work+Sans:wght@600&display=swap",
    },
    body: {
      family: "Work Sans",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Work+Sans:wght@400&display=swap",
    },
    category: "modern",
    css: "font-family: 'Work Sans', sans-serif; /* heading */\nfont-family: 'Work Sans', sans-serif; /* body */",
    tailwind: "font-['Work_Sans'] font-semibold /* heading */\nfont-['Work_Sans'] font-normal /* body */",
    tags: ["sans-serif", "swiss", "minimal"],
    mood: ["minimal", "clean", "functional"],
  },

  // === Playful ===
  {
    id: "playful-rounded",
    name: "Playful Rounded",
    nameZh: "俏皮圆润",
    heading: {
      family: "Fredoka",
      weight: 700,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Fredoka:wght@700&display=swap",
    },
    body: {
      family: "Quicksand",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Quicksand:wght@400&display=swap",
    },
    category: "playful",
    css: "font-family: 'Fredoka', sans-serif; /* heading */\nfont-family: 'Quicksand', sans-serif; /* body */",
    tailwind: "font-['Fredoka'] font-bold /* heading */\nfont-['Quicksand'] font-normal /* body */",
    tags: ["rounded", "friendly", "fun"],
    mood: ["playful", "friendly", "approachable"],
  },
  {
    id: "comic-fun",
    name: "Comic Fun",
    nameZh: "漫画趣味",
    heading: {
      family: "Baloo 2",
      weight: 800,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Baloo+2:wght@800&display=swap",
    },
    body: {
      family: "Nunito",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Nunito:wght@400&display=swap",
    },
    category: "playful",
    css: "font-family: 'Baloo 2', cursive; /* heading */\nfont-family: 'Nunito', sans-serif; /* body */",
    tailwind: "font-['Baloo_2'] font-extrabold /* heading */\nfont-['Nunito'] font-normal /* body */",
    tags: ["rounded", "comic", "casual"],
    mood: ["fun", "casual", "youthful"],
  },
  {
    id: "bubbly-joy",
    name: "Bubbly Joy",
    nameZh: "泡泡欢乐",
    heading: {
      family: "Comfortaa",
      weight: 700,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap",
    },
    body: {
      family: "Poppins",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Poppins:wght@400&display=swap",
    },
    category: "playful",
    css: "font-family: 'Comfortaa', cursive; /* heading */\nfont-family: 'Poppins', sans-serif; /* body */",
    tailwind: "font-['Comfortaa'] font-bold /* heading */\nfont-['Poppins'] font-normal /* body */",
    tags: ["rounded", "bubbly", "cheerful"],
    mood: ["cheerful", "bubbly", "optimistic"],
  },

  // === Editorial ===
  {
    id: "magazine-pro",
    name: "Magazine Pro",
    nameZh: "杂志专业",
    heading: {
      family: "Libre Baskerville",
      weight: 700,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&display=swap",
    },
    body: {
      family: "Libre Franklin",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400&display=swap",
    },
    category: "editorial",
    css: "font-family: 'Libre Baskerville', serif; /* heading */\nfont-family: 'Libre Franklin', sans-serif; /* body */",
    tailwind: "font-['Libre_Baskerville'] font-bold /* heading */\nfont-['Libre_Franklin'] font-normal /* body */",
    tags: ["serif", "editorial", "professional"],
    mood: ["professional", "editorial", "authoritative"],
  },
  {
    id: "literary-classic",
    name: "Literary Classic",
    nameZh: "文学经典",
    heading: {
      family: "Crimson Text",
      weight: 700,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Crimson+Text:wght@700&display=swap",
    },
    body: {
      family: "Crimson Text",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400&display=swap",
    },
    category: "editorial",
    css: "font-family: 'Crimson Text', serif; /* heading */\nfont-family: 'Crimson Text', serif; /* body */",
    tailwind: "font-['Crimson_Text'] font-bold /* heading */\nfont-['Crimson_Text'] font-normal /* body */",
    tags: ["serif", "literary", "classic"],
    mood: ["literary", "classic", "refined"],
  },
  {
    id: "news-editorial",
    name: "News Editorial",
    nameZh: "新闻社论",
    heading: {
      family: "PT Serif",
      weight: 700,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=PT+Serif:wght@700&display=swap",
    },
    body: {
      family: "PT Sans",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=PT+Sans:wght@400&display=swap",
    },
    category: "editorial",
    css: "font-family: 'PT Serif', serif; /* heading */\nfont-family: 'PT Sans', sans-serif; /* body */",
    tailwind: "font-['PT_Serif'] font-bold /* heading */\nfont-['PT_Sans'] font-normal /* body */",
    tags: ["serif", "news", "readable"],
    mood: ["trustworthy", "news", "readable"],
  },

  // === Technical ===
  {
    id: "code-mono",
    name: "Code Mono",
    nameZh: "代码等宽",
    heading: {
      family: "JetBrains Mono",
      weight: 700,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&display=swap",
    },
    body: {
      family: "Inter",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap",
    },
    category: "technical",
    css: "font-family: 'JetBrains Mono', monospace; /* heading */\nfont-family: 'Inter', sans-serif; /* body */",
    tailwind: "font-['JetBrains_Mono'] font-bold /* heading */\nfont-['Inter'] font-normal /* body */",
    tags: ["monospace", "code", "tech"],
    mood: ["technical", "precise", "developer"],
  },
  {
    id: "dev-docs",
    name: "Dev Docs",
    nameZh: "开发文档",
    heading: {
      family: "Fira Code",
      weight: 600,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Fira+Code:wght@600&display=swap",
    },
    body: {
      family: "Roboto",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap",
    },
    category: "technical",
    css: "font-family: 'Fira Code', monospace; /* heading */\nfont-family: 'Roboto', sans-serif; /* body */",
    tailwind: "font-['Fira_Code'] font-semibold /* heading */\nfont-['Roboto'] font-normal /* body */",
    tags: ["monospace", "documentation", "tech"],
    mood: ["technical", "clear", "functional"],
  },
  {
    id: "terminal-style",
    name: "Terminal Style",
    nameZh: "终端风格",
    heading: {
      family: "IBM Plex Mono",
      weight: 700,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@700&display=swap",
    },
    body: {
      family: "IBM Plex Sans",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400&display=swap",
    },
    category: "technical",
    css: "font-family: 'IBM Plex Mono', monospace; /* heading */\nfont-family: 'IBM Plex Sans', sans-serif; /* body */",
    tailwind: "font-['IBM_Plex_Mono'] font-bold /* heading */\nfont-['IBM_Plex_Sans'] font-normal /* body */",
    tags: ["monospace", "terminal", "tech"],
    mood: ["technical", "retro", "precise"],
  },

  // === Elegant ===
  {
    id: "luxury-serif",
    name: "Luxury Serif",
    nameZh: "奢华衬线",
    heading: {
      family: "Cormorant Garamond",
      weight: 700,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&display=swap",
    },
    body: {
      family: "Raleway",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Raleway:wght@400&display=swap",
    },
    category: "elegant",
    css: "font-family: 'Cormorant Garamond', serif; /* heading */\nfont-family: 'Raleway', sans-serif; /* body */",
    tailwind: "font-['Cormorant_Garamond'] font-bold /* heading */\nfont-['Raleway'] font-normal /* body */",
    tags: ["serif", "luxury", "elegant"],
    mood: ["luxurious", "elegant", "premium"],
  },
  {
    id: "fashion-forward",
    name: "Fashion Forward",
    nameZh: "时尚前卫",
    heading: {
      family: "Bodoni Moda",
      weight: 700,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@700&display=swap",
    },
    body: {
      family: "Josefin Sans",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400&display=swap",
    },
    category: "elegant",
    css: "font-family: 'Bodoni Moda', serif; /* heading */\nfont-family: 'Josefin Sans', sans-serif; /* body */",
    tailwind: "font-['Bodoni_Moda'] font-bold /* heading */\nfont-['Josefin_Sans'] font-normal /* body */",
    tags: ["serif", "fashion", "high-end"],
    mood: ["fashionable", "sophisticated", "high-end"],
  },
  {
    id: "refined-grace",
    name: "Refined Grace",
    nameZh: "优雅精致",
    heading: {
      family: "EB Garamond",
      weight: 700,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@700&display=swap",
    },
    body: {
      family: "Karla",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Karla:wght@400&display=swap",
    },
    category: "elegant",
    css: "font-family: 'EB Garamond', serif; /* heading */\nfont-family: 'Karla', sans-serif; /* body */",
    tailwind: "font-['EB_Garamond'] font-bold /* heading */\nfont-['Karla'] font-normal /* body */",
    tags: ["serif", "refined", "graceful"],
    mood: ["refined", "graceful", "elegant"],
  },
  {
    id: "minimalist-chic",
    name: "Minimalist Chic",
    nameZh: "极简时尚",
    heading: {
      family: "Jost",
      weight: 600,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Jost:wght@600&display=swap",
    },
    body: {
      family: "Jost",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Jost:wght@400&display=swap",
    },
    category: "elegant",
    css: "font-family: 'Jost', sans-serif; /* heading */\nfont-family: 'Jost', sans-serif; /* body */",
    tailwind: "font-['Jost'] font-semibold /* heading */\nfont-['Jost'] font-normal /* body */",
    tags: ["sans-serif", "minimalist", "chic"],
    mood: ["minimalist", "chic", "sophisticated"],
  },
];

// Get font pairings by category
export function getFontPairingsByCategory(category: TypographyCategory): FontPairing[] {
  return fontPairings.filter((p) => p.category === category);
}

// Get font pairing by ID
export function getFontPairingById(id: string): FontPairing | undefined {
  return fontPairings.find((p) => p.id === id);
}

// Get font pairings by mood
export function getFontPairingsByMood(mood: string): FontPairing[] {
  return fontPairings.filter((p) =>
    p.mood.some((m) => m.toLowerCase().includes(mood.toLowerCase()))
  );
}

// Get all typography categories with counts
export function getTypographyCategories(): {
  category: TypographyCategory;
  count: number;
  labelZh: string;
  labelEn: string;
}[] {
  const categoryLabelsZh: Record<TypographyCategory, string> = {
    classic: "经典",
    modern: "现代",
    playful: "俏皮",
    editorial: "社论",
    technical: "技术",
    elegant: "优雅",
  };

  const categoryLabelsEn: Record<TypographyCategory, string> = {
    classic: "Classic",
    modern: "Modern",
    playful: "Playful",
    editorial: "Editorial",
    technical: "Technical",
    elegant: "Elegant",
  };

  const categories = [...new Set(fontPairings.map((p) => p.category))];
  return categories.map((category) => ({
    category,
    count: fontPairings.filter((p) => p.category === category).length,
    labelZh: categoryLabelsZh[category],
    labelEn: categoryLabelsEn[category],
  }));
}

// Generate Google Fonts link for a pairing
// Google Fonts mirror — the official fonts.googleapis.com is unreachable from CN, so we route through a mirror that also proxies the font files (gstatic). Swap here to change provider.
const FONT_CDN = "https://fonts.loli.net";

export function generateGoogleFontsLink(pairing: FontPairing): string {
  const headingFamily = pairing.heading.family.replace(/ /g, "+");
  const bodyFamily = pairing.body.family.replace(/ /g, "+");

  if (pairing.heading.family === pairing.body.family) {
    return `${FONT_CDN}/css2?family=${headingFamily}:wght@${pairing.body.weight};${pairing.heading.weight}&display=swap`;
  }

  return `${FONT_CDN}/css2?family=${headingFamily}:wght@${pairing.heading.weight}&family=${bodyFamily}:wght@${pairing.body.weight}&display=swap`;
}

