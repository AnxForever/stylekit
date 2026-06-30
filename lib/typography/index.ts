// Typography / Font Pairing Library
// Curated font pairings for design systems using Google Fonts

export type TypographyCategory =
  | "classic"
  | "modern"
  | "playful"
  | "editorial"
  | "technical"
  | "elegant"
  | "display"
  | "handwritten";

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
  /** @deprecated Hand-written, lacks the system fallback chain. Use generateFontCSS(pairing). */
  css: string;
  /** @deprecated Hand-written, needs config. Use generateTailwindTheme(pairing) for valid Tailwind v4. */
  tailwind: string;
  tags: string[];
  mood: string[];
  /**
   * Oversized hero word shown in the specimen for display / handwritten faces,
   * where the typeface itself is the subject. Optional; text pairings fall back
   * to the category preview copy.
   */
  previewWord?: string;
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

  // === Display ===
  {
    id: "impact-anton",
    name: "Impact Anton",
    nameZh: "力量安东",
    heading: {
      family: "Anton",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Anton&display=swap",
    },
    body: {
      family: "Inter",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap",
    },
    category: "display",
    css: "font-family: 'Anton', sans-serif; /* heading */\nfont-family: 'Inter', sans-serif; /* body */",
    tailwind: "font-['Anton'] /* heading */\nfont-['Inter'] font-normal /* body */",
    tags: ["display", "condensed", "poster"],
    mood: ["bold", "powerful", "loud"],
    previewWord: "IMPACT",
  },
  {
    id: "fatface-abril",
    name: "Abril Editorial",
    nameZh: "阿布里尔社论",
    heading: {
      family: "Abril Fatface",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap",
    },
    body: {
      family: "Lato",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Lato:wght@400&display=swap",
    },
    category: "display",
    css: "font-family: 'Abril Fatface', serif; /* heading */\nfont-family: 'Lato', sans-serif; /* body */",
    tailwind: "font-['Abril_Fatface'] /* heading */\nfont-['Lato'] font-normal /* body */",
    tags: ["display", "high-contrast", "magazine"],
    mood: ["dramatic", "editorial", "bold"],
    previewWord: "Vogue",
  },

  // === Handwritten ===
  {
    id: "script-dancing",
    name: "Dancing Elegance",
    nameZh: "曼舞优雅",
    heading: {
      family: "Dancing Script",
      weight: 700,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap",
    },
    body: {
      family: "Lora",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Lora:wght@400&display=swap",
    },
    category: "handwritten",
    css: "font-family: 'Dancing Script', cursive; /* heading */\nfont-family: 'Lora', serif; /* body */",
    tailwind: "font-['Dancing_Script'] font-bold /* heading */\nfont-['Lora'] font-normal /* body */",
    tags: ["script", "handwritten", "elegant"],
    mood: ["personal", "elegant", "warm"],
    previewWord: "Bonjour",
  },
  {
    id: "poster-bebas",
    name: "Poster Bebas",
    nameZh: "海报贝巴斯",
    heading: {
      family: "Bebas Neue",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap",
    },
    body: {
      family: "Work Sans",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Work+Sans:wght@400&display=swap",
    },
    category: "display",
    css: "font-family: 'Bebas Neue', sans-serif; /* heading */\nfont-family: 'Work Sans', sans-serif; /* body */",
    tailwind: "font-['Bebas_Neue'] /* heading */\nfont-['Work_Sans'] font-normal /* body */",
    tags: ["display", "condensed", "uppercase"],
    mood: ["industrial", "bold", "urban"],
    previewWord: "FUTURE",
  },
  {
    id: "gothic-oswald",
    name: "Gothic Oswald",
    nameZh: "哥特奥斯瓦",
    heading: {
      family: "Oswald",
      weight: 600,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Oswald:wght@600&display=swap",
    },
    body: {
      family: "Merriweather",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Merriweather:wght@400&display=swap",
    },
    category: "display",
    css: "font-family: 'Oswald', sans-serif; /* heading */\nfont-family: 'Merriweather', serif; /* body */",
    tailwind: "font-['Oswald'] font-semibold /* heading */\nfont-['Merriweather'] font-normal /* body */",
    tags: ["display", "condensed", "gothic"],
    mood: ["strong", "editorial", "vintage"],
    previewWord: "Headlines",
  },
  {
    id: "fashion-dmserif",
    name: "Fashion DM Serif",
    nameZh: "时尚 DM 衬线",
    heading: {
      family: "DM Serif Display",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap",
    },
    body: {
      family: "DM Sans",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400&display=swap",
    },
    category: "display",
    css: "font-family: 'DM Serif Display', serif; /* heading */\nfont-family: 'DM Sans', sans-serif; /* body */",
    tailwind: "font-['DM_Serif_Display'] /* heading */\nfont-['DM_Sans'] font-normal /* body */",
    tags: ["display", "elegant", "high-contrast"],
    mood: ["elegant", "fashion", "refined"],
    previewWord: "Élégance",
  },
  {
    id: "casual-pacifico",
    name: "Casual Pacifico",
    nameZh: "休闲帕西菲科",
    heading: {
      family: "Pacifico",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Pacifico&display=swap",
    },
    body: {
      family: "Nunito",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Nunito:wght@400&display=swap",
    },
    category: "handwritten",
    css: "font-family: 'Pacifico', cursive; /* heading */\nfont-family: 'Nunito', sans-serif; /* body */",
    tailwind: "font-['Pacifico'] /* heading */\nfont-['Nunito'] font-normal /* body */",
    tags: ["script", "casual", "fun"],
    mood: ["friendly", "casual", "warm"],
    previewWord: "Aloha",
  },
  {
    id: "notes-caveat",
    name: "Notebook Caveat",
    nameZh: "笔记卡维特",
    heading: {
      family: "Caveat",
      weight: 700,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap",
    },
    body: {
      family: "Open Sans",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400&display=swap",
    },
    category: "handwritten",
    css: "font-family: 'Caveat', cursive; /* heading */\nfont-family: 'Open Sans', sans-serif; /* body */",
    tailwind: "font-['Caveat'] font-bold /* heading */\nfont-['Open_Sans'] font-normal /* body */",
    tags: ["script", "handwritten", "casual"],
    mood: ["personal", "casual", "authentic"],
    previewWord: "Notes",
  },
  {
    id: "romance-sacramento",
    name: "Romance Sacramento",
    nameZh: "浪漫萨克拉门托",
    heading: {
      family: "Sacramento",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Sacramento&display=swap",
    },
    body: {
      family: "Josefin Sans",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400&display=swap",
    },
    category: "handwritten",
    css: "font-family: 'Sacramento', cursive; /* heading */\nfont-family: 'Josefin Sans', sans-serif; /* body */",
    tailwind: "font-['Sacramento'] /* heading */\nfont-['Josefin_Sans'] font-normal /* body */",
    tags: ["script", "monoline", "elegant"],
    mood: ["romantic", "delicate", "elegant"],
    previewWord: "Je t'aime",
  },
  {
    id: "editorial-instrument",
    name: "Modern Editorial",
    nameZh: "现代社论",
    heading: {
      family: "Instrument Serif",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap",
    },
    body: {
      family: "Inter",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap",
    },
    category: "editorial",
    css: "font-family: 'Instrument Serif', serif; /* heading */\nfont-family: 'Inter', sans-serif; /* body */",
    tailwind: "font-['Instrument_Serif'] /* heading */\nfont-['Inter'] font-normal /* body */",
    tags: ["serif", "editorial", "refined"],
    mood: ["sophisticated", "editorial", "modern"],
  },
  {
    id: "expressive-bricolage",
    name: "Expressive Bricolage",
    nameZh: "表现力布里科",
    heading: {
      family: "Bricolage Grotesque",
      weight: 700,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700&display=swap",
    },
    body: {
      family: "Inter",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap",
    },
    category: "modern",
    css: "font-family: 'Bricolage Grotesque', sans-serif; /* heading */\nfont-family: 'Inter', sans-serif; /* body */",
    tailwind: "font-['Bricolage_Grotesque'] font-bold /* heading */\nfont-['Inter'] font-normal /* body */",
    tags: ["sans-serif", "expressive", "contemporary"],
    mood: ["expressive", "modern", "distinctive"],
  },
  {
    id: "geometric-outfit",
    name: "Geometric Outfit",
    nameZh: "几何 Outfit",
    heading: {
      family: "Outfit",
      weight: 600,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Outfit:wght@600&display=swap",
    },
    body: {
      family: "Lora",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Lora:wght@400&display=swap",
    },
    category: "elegant",
    css: "font-family: 'Outfit', sans-serif; /* heading */\nfont-family: 'Lora', serif; /* body */",
    tailwind: "font-['Outfit'] font-semibold /* heading */\nfont-['Lora'] font-normal /* body */",
    tags: ["sans-serif", "geometric", "modern"],
    mood: ["clean", "elegant", "contemporary"],
  },
  {
    id: "humanist-jakarta",
    name: "Humanist Jakarta",
    nameZh: "人文雅加达",
    heading: {
      family: "Plus Jakarta Sans",
      weight: 700,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700&display=swap",
    },
    body: {
      family: "Lora",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Lora:wght@400&display=swap",
    },
    category: "modern",
    css: "font-family: 'Plus Jakarta Sans', sans-serif; /* heading */\nfont-family: 'Lora', serif; /* body */",
    tailwind: "font-['Plus_Jakarta_Sans'] font-bold /* heading */\nfont-['Lora'] font-normal /* body */",
    tags: ["sans-serif", "humanist", "modern"],
    mood: ["friendly", "modern", "professional"],
  },
  {
    id: "news-newsreader",
    name: "Reader's Digest",
    nameZh: "悦读",
    heading: {
      family: "Newsreader",
      weight: 600,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Newsreader:wght@600&display=swap",
    },
    body: {
      family: "Inter",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap",
    },
    category: "editorial",
    css: "font-family: 'Newsreader', serif; /* heading */\nfont-family: 'Inter', sans-serif; /* body */",
    tailwind: "font-['Newsreader'] font-semibold /* heading */\nfont-['Inter'] font-normal /* body */",
    tags: ["serif", "editorial", "reading"],
    mood: ["literary", "warm", "readable"],
  },
  {
    id: "expressive-fraunces",
    name: "Expressive Fraunces",
    nameZh: "灵动弗朗西斯",
    heading: {
      family: "Fraunces",
      weight: 600,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Fraunces:wght@600&display=swap",
    },
    body: {
      family: "Inter",
      weight: 400,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap",
    },
    category: "elegant",
    css: "font-family: 'Fraunces', serif; /* heading */\nfont-family: 'Inter', sans-serif; /* body */",
    tailwind: "font-['Fraunces'] font-semibold /* heading */\nfont-['Inter'] font-normal /* body */",
    tags: ["serif", "expressive", "display"],
    mood: ["characterful", "elegant", "modern"],
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
    display: "展示",
    handwritten: "手写",
  };

  const categoryLabelsEn: Record<TypographyCategory, string> = {
    classic: "Classic",
    modern: "Modern",
    playful: "Playful",
    editorial: "Editorial",
    technical: "Technical",
    elegant: "Elegant",
    display: "Display",
    handwritten: "Handwritten",
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

// ---------------------------------------------------------------------------
// Font fallback stacks & code generation
//
// CSS/Tailwind output is generated (not hand-written) so the system-font
// fallback chain is always present and correct. Without it, a Google Fonts CDN
// outage drops the page to the browser default font — a real production risk.
// Stacks mirror app/globals.css (--font-serif / --font-sans).
// ---------------------------------------------------------------------------

type GenericFamily = "serif" | "sans" | "mono";

const SYSTEM_FONT_STACKS: Record<GenericFamily, string> = {
  serif: "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
  sans: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
};

// Each Google Font used in fontPairings mapped to its generic family. Display /
// rounded fonts (Fredoka, Baloo 2, Comfortaa) fall back to sans rather than
// cursive — the system cursive default (Comic Sans) is worse than a clean sans.
const FONT_GENERIC: Record<string, GenericFamily> = {
  "Playfair Display": "serif",
  "Merriweather": "serif",
  "Lora": "serif",
  "PT Serif": "serif",
  "Libre Baskerville": "serif",
  "EB Garamond": "serif",
  "Cormorant Garamond": "serif",
  "Bodoni Moda": "serif",
  "Crimson Text": "serif",
  "JetBrains Mono": "mono",
  "IBM Plex Mono": "mono",
  "Fira Code": "mono",
  "Source Sans 3": "sans",
  "Open Sans": "sans",
  "Lato": "sans",
  "Inter": "sans",
  "Space Grotesk": "sans",
  "DM Sans": "sans",
  "Montserrat": "sans",
  "Nunito": "sans",
  "Work Sans": "sans",
  "Quicksand": "sans",
  "Poppins": "sans",
  "Raleway": "sans",
  "Roboto": "sans",
  "PT Sans": "sans",
  "Libre Franklin": "sans",
  "Karla": "sans",
  "Josefin Sans": "sans",
  "IBM Plex Sans": "sans",
  "Jost": "sans",
  "Comfortaa": "sans",
  "Fredoka": "sans",
  "Baloo 2": "sans",
  // Display
  "Anton": "sans",
  "Abril Fatface": "serif",
  "Bebas Neue": "sans",
  "Oswald": "sans",
  "DM Serif Display": "serif",
  // Newer grotesques / sans
  "Instrument Serif": "serif",
  "Newsreader": "serif",
  "Fraunces": "serif",
  "Bricolage Grotesque": "sans",
  "Outfit": "sans",
  "Plus Jakarta Sans": "sans",
  // Handwritten / script — fall back to sans (system cursive default is worse).
  "Dancing Script": "sans",
  "Pacifico": "sans",
  "Caveat": "sans",
  "Sacramento": "sans",
};

function genericOf(family: string): GenericFamily {
  return FONT_GENERIC[family] ?? "sans";
}

const GENERIC_LABEL: Record<GenericFamily, string> = {
  serif: "Serif",
  sans: "Sans",
  mono: "Mono",
};

/**
 * Human-readable "contrast with harmony" label for a pairing, derived from the
 * generic family of each face — e.g. "Serif × Sans". When heading and body share
 * a family, the contrast lives in weight instead, so we say "Sans · one family".
 * Surfaces the relationship that defines whether a pairing works.
 */
export function pairingContrast(pairing: FontPairing): string {
  const h = GENERIC_LABEL[genericOf(pairing.heading.family)];
  const b = GENERIC_LABEL[genericOf(pairing.body.family)];
  if (pairing.heading.family === pairing.body.family) {
    return `${h} · one family`;
  }
  return `${h} × ${b}`;
}

/** Full `font-family` value with the system fallback chain appended. */
export function fontStack(spec: FontSpec): string {
  return `'${spec.family}', ${SYSTEM_FONT_STACKS[genericOf(spec.family)]}`;
}

const WEIGHT_TW_CLASS: Record<number, string> = {
  300: "font-light",
  400: "font-normal",
  500: "font-medium",
  600: "font-semibold",
  700: "font-bold",
  800: "font-extrabold",
  900: "font-black",
};

function weightClass(weight: number): string {
  return WEIGHT_TW_CLASS[weight] ?? "font-normal";
}

/** Plain CSS with correct fallback chains — safe to paste into any stylesheet. */
export function generateFontCSS(pairing: FontPairing): string {
  return [
    `/* Heading — ${pairing.heading.family} */`,
    `font-family: ${fontStack(pairing.heading)};`,
    `font-weight: ${pairing.heading.weight};`,
    ``,
    `/* Body — ${pairing.body.family} */`,
    `font-family: ${fontStack(pairing.body)};`,
    `font-weight: ${pairing.body.weight};`,
  ].join("\n");
}

/**
 * Tailwind v4 snippet. This project uses CSS-based config (no tailwind.config.js),
 * so fonts are registered in an `@theme` block and consumed via utility classes.
 */
export function generateTailwindTheme(pairing: FontPairing): string {
  return [
    `/* 1. Register in your global CSS (Tailwind v4) */`,
    `@theme {`,
    `  --font-heading: ${fontStack(pairing.heading)};`,
    `  --font-body: ${fontStack(pairing.body)};`,
    `}`,
    ``,
    `/* 2. Use the generated utilities */`,
    `<h1 class="font-heading ${weightClass(pairing.heading.weight)}">Heading</h1>`,
    `<p class="font-body ${weightClass(pairing.body.weight)}">Body text</p>`,
  ].join("\n");
}

