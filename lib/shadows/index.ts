// Shadow Library — curated box-shadow presets for design systems

export interface Shadow {
  id: string;
  name: string;
  nameZh: string;
  value: string;
  css: string;
  tailwind: string;
  category: ShadowCategory;
  tags: string[];
}

export type ShadowCategory =
  | "soft"
  | "medium"
  | "hard"
  | "colored"
  | "glow"
  | "inner"
  | "layered"
  | "elevation";

export const shadows: Shadow[] = [
  // === Soft ===
  {
    id: "soft-sm",
    name: "Soft Small",
    nameZh: "柔和小",
    value: "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)",
    css: "box-shadow: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06);",
    tailwind: "shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.06)]",
    category: "soft",
    tags: ["subtle", "card", "minimal"],
  },
  {
    id: "soft-md",
    name: "Soft Medium",
    nameZh: "柔和中",
    value: "0 4px 12px rgba(0,0,0,0.08)",
    css: "box-shadow: 0 4px 12px rgba(0,0,0,0.08);",
    tailwind: "shadow-[0_4px_12px_rgba(0,0,0,0.08)]",
    category: "soft",
    tags: ["card", "panel", "clean"],
  },
  {
    id: "soft-lg",
    name: "Soft Large",
    nameZh: "柔和大",
    value: "0 8px 30px rgba(0,0,0,0.08)",
    css: "box-shadow: 0 8px 30px rgba(0,0,0,0.08);",
    tailwind: "shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
    category: "soft",
    tags: ["modal", "dropdown", "floating"],
  },
  {
    id: "soft-xl",
    name: "Soft Extra Large",
    nameZh: "柔和超大",
    value: "0 20px 60px rgba(0,0,0,0.1)",
    css: "box-shadow: 0 20px 60px rgba(0,0,0,0.1);",
    tailwind: "shadow-[0_20px_60px_rgba(0,0,0,0.1)]",
    category: "soft",
    tags: ["hero", "showcase", "dramatic"],
  },

  // === Medium ===
  {
    id: "medium-sm",
    name: "Medium Small",
    nameZh: "中等小",
    value: "0 2px 8px rgba(0,0,0,0.15)",
    css: "box-shadow: 0 2px 8px rgba(0,0,0,0.15);",
    tailwind: "shadow-[0_2px_8px_rgba(0,0,0,0.15)]",
    category: "medium",
    tags: ["button", "badge", "chip"],
  },
  {
    id: "medium-md",
    name: "Medium",
    nameZh: "中等",
    value: "0 4px 16px rgba(0,0,0,0.15)",
    css: "box-shadow: 0 4px 16px rgba(0,0,0,0.15);",
    tailwind: "shadow-[0_4px_16px_rgba(0,0,0,0.15)]",
    category: "medium",
    tags: ["card", "panel", "general"],
  },
  {
    id: "medium-lg",
    name: "Medium Large",
    nameZh: "中等大",
    value: "0 10px 40px rgba(0,0,0,0.15)",
    css: "box-shadow: 0 10px 40px rgba(0,0,0,0.15);",
    tailwind: "shadow-[0_10px_40px_rgba(0,0,0,0.15)]",
    category: "medium",
    tags: ["modal", "popover", "overlay"],
  },

  // === Hard ===
  {
    id: "hard-sm",
    name: "Hard Small",
    nameZh: "硬朗小",
    value: "2px 2px 0 rgba(0,0,0,1)",
    css: "box-shadow: 2px 2px 0 rgba(0,0,0,1);",
    tailwind: "shadow-[2px_2px_0_rgba(0,0,0,1)]",
    category: "hard",
    tags: ["brutalist", "retro", "bold"],
  },
  {
    id: "hard-md",
    name: "Hard Medium",
    nameZh: "硬朗中",
    value: "4px 4px 0 rgba(0,0,0,1)",
    css: "box-shadow: 4px 4px 0 rgba(0,0,0,1);",
    tailwind: "shadow-[4px_4px_0_rgba(0,0,0,1)]",
    category: "hard",
    tags: ["brutalist", "neo-brutalist", "graphic"],
  },
  {
    id: "hard-lg",
    name: "Hard Large",
    nameZh: "硬朗大",
    value: "8px 8px 0 rgba(0,0,0,1)",
    css: "box-shadow: 8px 8px 0 rgba(0,0,0,1);",
    tailwind: "shadow-[8px_8px_0_rgba(0,0,0,1)]",
    category: "hard",
    tags: ["brutalist", "poster", "statement"],
  },
  {
    id: "hard-colored",
    name: "Hard Colored",
    nameZh: "硬朗彩色",
    value: "4px 4px 0 #5e6ad2",
    css: "box-shadow: 4px 4px 0 #5e6ad2;",
    tailwind: "shadow-[4px_4px_0_#5e6ad2]",
    category: "hard",
    tags: ["brutalist", "playful", "accent"],
  },

  // === Colored ===
  {
    id: "colored-pink",
    name: "Pink Glow",
    nameZh: "粉色光晕",
    value: "0 8px 30px rgba(255,0,110,0.35)",
    css: "box-shadow: 0 8px 30px rgba(255,0,110,0.35);",
    tailwind: "shadow-[0_8px_30px_rgba(255,0,110,0.35)]",
    category: "colored",
    tags: ["dopamine", "vibrant", "cta"],
  },
  {
    id: "colored-purple",
    name: "Purple Glow",
    nameZh: "紫色光晕",
    value: "0 8px 30px rgba(131,56,236,0.35)",
    css: "box-shadow: 0 8px 30px rgba(131,56,236,0.35);",
    tailwind: "shadow-[0_8px_30px_rgba(131,56,236,0.35)]",
    category: "colored",
    tags: ["creative", "premium", "cta"],
  },
  {
    id: "colored-blue",
    name: "Blue Glow",
    nameZh: "蓝色光晕",
    value: "0 8px 30px rgba(58,134,255,0.35)",
    css: "box-shadow: 0 8px 30px rgba(58,134,255,0.35);",
    tailwind: "shadow-[0_8px_30px_rgba(58,134,255,0.35)]",
    category: "colored",
    tags: ["tech", "trust", "professional"],
  },
  {
    id: "colored-green",
    name: "Green Glow",
    nameZh: "绿色光晕",
    value: "0 8px 30px rgba(6,214,160,0.35)",
    css: "box-shadow: 0 8px 30px rgba(6,214,160,0.35);",
    tailwind: "shadow-[0_8px_30px_rgba(6,214,160,0.35)]",
    category: "colored",
    tags: ["success", "nature", "fresh"],
  },
  {
    id: "colored-orange",
    name: "Orange Glow",
    nameZh: "橙色光晕",
    value: "0 8px 30px rgba(251,86,7,0.35)",
    css: "box-shadow: 0 8px 30px rgba(251,86,7,0.35);",
    tailwind: "shadow-[0_8px_30px_rgba(251,86,7,0.35)]",
    category: "colored",
    tags: ["warm", "energetic", "attention"],
  },

  // === Glow ===
  {
    id: "glow-cyan",
    name: "Neon Cyan",
    nameZh: "霓虹青",
    value: "0 0 15px rgba(0,255,255,0.4), 0 0 30px rgba(0,255,255,0.2)",
    css: "box-shadow: 0 0 15px rgba(0,255,255,0.4), 0 0 30px rgba(0,255,255,0.2);",
    tailwind: "shadow-[0_0_15px_rgba(0,255,255,0.4),0_0_30px_rgba(0,255,255,0.2)]",
    category: "glow",
    tags: ["cyberpunk", "neon", "dark-mode"],
  },
  {
    id: "glow-magenta",
    name: "Neon Magenta",
    nameZh: "霓虹品红",
    value: "0 0 15px rgba(255,0,255,0.4), 0 0 30px rgba(255,0,255,0.2)",
    css: "box-shadow: 0 0 15px rgba(255,0,255,0.4), 0 0 30px rgba(255,0,255,0.2);",
    tailwind: "shadow-[0_0_15px_rgba(255,0,255,0.4),0_0_30px_rgba(255,0,255,0.2)]",
    category: "glow",
    tags: ["cyberpunk", "neon", "synthwave"],
  },
  {
    id: "glow-white",
    name: "White Glow",
    nameZh: "白色辉光",
    value: "0 0 20px rgba(255,255,255,0.25), 0 0 40px rgba(255,255,255,0.1)",
    css: "box-shadow: 0 0 20px rgba(255,255,255,0.25), 0 0 40px rgba(255,255,255,0.1);",
    tailwind: "shadow-[0_0_20px_rgba(255,255,255,0.25),0_0_40px_rgba(255,255,255,0.1)]",
    category: "glow",
    tags: ["ethereal", "glass", "dark-mode"],
  },
  {
    id: "glow-gold",
    name: "Gold Glow",
    nameZh: "金色辉光",
    value: "0 0 20px rgba(255,215,0,0.3), 0 0 40px rgba(255,215,0,0.15)",
    css: "box-shadow: 0 0 20px rgba(255,215,0,0.3), 0 0 40px rgba(255,215,0,0.15);",
    tailwind: "shadow-[0_0_20px_rgba(255,215,0,0.3),0_0_40px_rgba(255,215,0,0.15)]",
    category: "glow",
    tags: ["luxury", "premium", "art-deco"],
  },

  // === Inner ===
  {
    id: "inner-sm",
    name: "Inner Small",
    nameZh: "内阴影小",
    value: "inset 0 2px 4px rgba(0,0,0,0.1)",
    css: "box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);",
    tailwind: "shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]",
    category: "inner",
    tags: ["input", "pressed", "recessed"],
  },
  {
    id: "inner-md",
    name: "Inner Medium",
    nameZh: "内阴影中",
    value: "inset 0 4px 8px rgba(0,0,0,0.15)",
    css: "box-shadow: inset 0 4px 8px rgba(0,0,0,0.15);",
    tailwind: "shadow-[inset_0_4px_8px_rgba(0,0,0,0.15)]",
    category: "inner",
    tags: ["well", "container", "depth"],
  },
  {
    id: "inner-neumorphism",
    name: "Neumorphism Inner",
    nameZh: "新拟态内凹",
    value: "inset 5px 5px 10px rgba(0,0,0,0.08), inset -5px -5px 10px rgba(255,255,255,0.8)",
    css: "box-shadow: inset 5px 5px 10px rgba(0,0,0,0.08), inset -5px -5px 10px rgba(255,255,255,0.8);",
    tailwind: "shadow-[inset_5px_5px_10px_rgba(0,0,0,0.08),inset_-5px_-5px_10px_rgba(255,255,255,0.8)]",
    category: "inner",
    tags: ["neumorphism", "soft-ui", "pressed"],
  },

  // === Layered ===
  {
    id: "layered-realistic",
    name: "Realistic Layered",
    nameZh: "真实分层",
    value: "0 1px 1px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.06), 0 4px 4px rgba(0,0,0,0.04), 0 8px 8px rgba(0,0,0,0.02)",
    css: "box-shadow: 0 1px 1px rgba(0,0,0,0.08), 0 2px 2px rgba(0,0,0,0.06), 0 4px 4px rgba(0,0,0,0.04), 0 8px 8px rgba(0,0,0,0.02);",
    tailwind: "shadow-[0_1px_1px_rgba(0,0,0,0.08),0_2px_2px_rgba(0,0,0,0.06),0_4px_4px_rgba(0,0,0,0.04),0_8px_8px_rgba(0,0,0,0.02)]",
    category: "layered",
    tags: ["realistic", "material", "depth"],
  },
  {
    id: "layered-elevation",
    name: "Material Elevation",
    nameZh: "Material 抬升",
    value: "0 3px 5px rgba(0,0,0,0.1), 0 6px 20px rgba(0,0,0,0.08)",
    css: "box-shadow: 0 3px 5px rgba(0,0,0,0.1), 0 6px 20px rgba(0,0,0,0.08);",
    tailwind: "shadow-[0_3px_5px_rgba(0,0,0,0.1),0_6px_20px_rgba(0,0,0,0.08)]",
    category: "layered",
    tags: ["material", "elevation", "card"],
  },
  {
    id: "layered-dreamy",
    name: "Dreamy Float",
    nameZh: "梦幻悬浮",
    value: "0 2px 4px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.06), 0 24px 48px rgba(0,0,0,0.08)",
    css: "box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.06), 0 24px 48px rgba(0,0,0,0.08);",
    tailwind: "shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.06),0_24px_48px_rgba(0,0,0,0.08)]",
    category: "layered",
    tags: ["dreamy", "floating", "premium"],
  },
  {
    id: "layered-neumorphism",
    name: "Neumorphism",
    nameZh: "新拟态凸起",
    value: "8px 8px 16px rgba(0,0,0,0.08), -8px -8px 16px rgba(255,255,255,0.8)",
    css: "box-shadow: 8px 8px 16px rgba(0,0,0,0.08), -8px -8px 16px rgba(255,255,255,0.8);",
    tailwind: "shadow-[8px_8px_16px_rgba(0,0,0,0.08),-8px_-8px_16px_rgba(255,255,255,0.8)]",
    category: "layered",
    tags: ["neumorphism", "soft-ui", "raised"],
  },

  // === Smooth Layered (Josh Comeau style — many stacked layers, tinted not pure black) ===
  {
    id: "smooth-low",
    name: "Smooth Low",
    nameZh: "平滑·低",
    value: "0 1px 1.5px rgba(28,25,60,0.07), 0 2.7px 4px rgba(28,25,60,0.05), 0 6.5px 10px rgba(28,25,60,0.04), 0 12px 18px rgba(28,25,60,0.03)",
    css: "box-shadow: 0 1px 1.5px rgba(28,25,60,0.07), 0 2.7px 4px rgba(28,25,60,0.05), 0 6.5px 10px rgba(28,25,60,0.04), 0 12px 18px rgba(28,25,60,0.03);",
    tailwind: "shadow-[0_1px_1.5px_rgba(28,25,60,0.07),0_2.7px_4px_rgba(28,25,60,0.05),0_6.5px_10px_rgba(28,25,60,0.04),0_12px_18px_rgba(28,25,60,0.03)]",
    category: "layered",
    tags: ["smooth", "natural", "card"],
  },
  {
    id: "smooth-medium",
    name: "Smooth Medium",
    nameZh: "平滑·中",
    value: "0 1px 1.5px rgba(28,25,60,0.06), 0 3px 4px rgba(28,25,60,0.05), 0 7px 10px rgba(28,25,60,0.04), 0 14px 20px rgba(28,25,60,0.035), 0 24px 36px rgba(28,25,60,0.03)",
    css: "box-shadow: 0 1px 1.5px rgba(28,25,60,0.06), 0 3px 4px rgba(28,25,60,0.05), 0 7px 10px rgba(28,25,60,0.04), 0 14px 20px rgba(28,25,60,0.035), 0 24px 36px rgba(28,25,60,0.03);",
    tailwind: "shadow-[0_1px_1.5px_rgba(28,25,60,0.06),0_3px_4px_rgba(28,25,60,0.05),0_7px_10px_rgba(28,25,60,0.04),0_14px_20px_rgba(28,25,60,0.035),0_24px_36px_rgba(28,25,60,0.03)]",
    category: "layered",
    tags: ["smooth", "floating", "modal"],
  },
  {
    id: "smooth-high",
    name: "Smooth High",
    nameZh: "平滑·高",
    value: "0 1.4px 2px rgba(28,25,60,0.06), 0 3.5px 5px rgba(28,25,60,0.05), 0 8px 11px rgba(28,25,60,0.045), 0 15px 22px rgba(28,25,60,0.04), 0 28px 40px rgba(28,25,60,0.035), 0 50px 70px rgba(28,25,60,0.03)",
    css: "box-shadow: 0 1.4px 2px rgba(28,25,60,0.06), 0 3.5px 5px rgba(28,25,60,0.05), 0 8px 11px rgba(28,25,60,0.045), 0 15px 22px rgba(28,25,60,0.04), 0 28px 40px rgba(28,25,60,0.035), 0 50px 70px rgba(28,25,60,0.03);",
    tailwind: "shadow-[0_1.4px_2px_rgba(28,25,60,0.06),0_3.5px_5px_rgba(28,25,60,0.05),0_8px_11px_rgba(28,25,60,0.045),0_15px_22px_rgba(28,25,60,0.04),0_28px_40px_rgba(28,25,60,0.035),0_50px_70px_rgba(28,25,60,0.03)]",
    category: "layered",
    tags: ["smooth", "dramatic", "hero"],
  },

  // === Material Elevation (umbra + penumbra + ambient, dp 1-5) ===
  {
    id: "elevation-1",
    name: "Elevation 1",
    nameZh: "层级 1",
    value: "0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.12)",
    css: "box-shadow: 0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.12);",
    tailwind: "shadow-[0_2px_1px_-1px_rgba(0,0,0,0.2),0_1px_1px_0_rgba(0,0,0,0.14),0_1px_3px_0_rgba(0,0,0,0.12)]",
    category: "elevation",
    tags: ["material", "card", "resting"],
  },
  {
    id: "elevation-2",
    name: "Elevation 2",
    nameZh: "层级 2",
    value: "0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12)",
    css: "box-shadow: 0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12);",
    tailwind: "shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),0_2px_2px_0_rgba(0,0,0,0.14),0_1px_5px_0_rgba(0,0,0,0.12)]",
    category: "elevation",
    tags: ["material", "button", "raised"],
  },
  {
    id: "elevation-3",
    name: "Elevation 3",
    nameZh: "层级 3",
    value: "0 3px 3px -2px rgba(0,0,0,0.2), 0 3px 4px 0 rgba(0,0,0,0.14), 0 1px 8px 0 rgba(0,0,0,0.12)",
    css: "box-shadow: 0 3px 3px -2px rgba(0,0,0,0.2), 0 3px 4px 0 rgba(0,0,0,0.14), 0 1px 8px 0 rgba(0,0,0,0.12);",
    tailwind: "shadow-[0_3px_3px_-2px_rgba(0,0,0,0.2),0_3px_4px_0_rgba(0,0,0,0.14),0_1px_8px_0_rgba(0,0,0,0.12)]",
    category: "elevation",
    tags: ["material", "card", "active"],
  },
  {
    id: "elevation-4",
    name: "Elevation 4",
    nameZh: "层级 4",
    value: "0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12)",
    css: "box-shadow: 0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12);",
    tailwind: "shadow-[0_2px_4px_-1px_rgba(0,0,0,0.2),0_4px_5px_0_rgba(0,0,0,0.14),0_1px_10px_0_rgba(0,0,0,0.12)]",
    category: "elevation",
    tags: ["material", "appbar", "snackbar"],
  },
  {
    id: "elevation-5",
    name: "Elevation 5",
    nameZh: "层级 5",
    value: "0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12)",
    css: "box-shadow: 0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12);",
    tailwind: "shadow-[0_3px_5px_-1px_rgba(0,0,0,0.2),0_6px_10px_0_rgba(0,0,0,0.14),0_1px_18px_0_rgba(0,0,0,0.12)]",
    category: "elevation",
    tags: ["material", "fab", "dialog"],
  },

  // === Colored Smooth (tinted multi-layer brand glows) ===
  {
    id: "colored-smooth-blue",
    name: "Smooth Blue",
    nameZh: "平滑·蓝",
    value: "0 2px 4px rgba(37,99,235,0.1), 0 6px 12px rgba(37,99,235,0.12), 0 12px 24px rgba(37,99,235,0.14)",
    css: "box-shadow: 0 2px 4px rgba(37,99,235,0.1), 0 6px 12px rgba(37,99,235,0.12), 0 12px 24px rgba(37,99,235,0.14);",
    tailwind: "shadow-[0_2px_4px_rgba(37,99,235,0.1),0_6px_12px_rgba(37,99,235,0.12),0_12px_24px_rgba(37,99,235,0.14)]",
    category: "colored",
    tags: ["brand", "smooth", "primary"],
  },
  {
    id: "colored-smooth-purple",
    name: "Smooth Purple",
    nameZh: "平滑·紫",
    value: "0 2px 4px rgba(139,92,246,0.1), 0 6px 12px rgba(139,92,246,0.12), 0 12px 24px rgba(139,92,246,0.14)",
    css: "box-shadow: 0 2px 4px rgba(139,92,246,0.1), 0 6px 12px rgba(139,92,246,0.12), 0 12px 24px rgba(139,92,246,0.14);",
    tailwind: "shadow-[0_2px_4px_rgba(139,92,246,0.1),0_6px_12px_rgba(139,92,246,0.12),0_12px_24px_rgba(139,92,246,0.14)]",
    category: "colored",
    tags: ["brand", "smooth", "accent"],
  },

  // === Batch 2: smooth layered shadows (Josh Comeau method: stacked layers
  // at growing offset/blur for realistic, soft depth). Low/medium/high
  // elevation pairs at two light intensities. ===
  {
    id: "smooth-low",
    name: "Smooth Low",
    nameZh: "平滑低",
    value:
      "0 0.5px 0.6px rgba(0,0,0,0.07), 0 1.3px 1.6px -0.6px rgba(0,0,0,0.07), 0 2.9px 3.6px -1.2px rgba(0,0,0,0.07)",
    css: "box-shadow: 0 0.5px 0.6px rgba(0,0,0,0.07), 0 1.3px 1.6px -0.6px rgba(0,0,0,0.07), 0 2.9px 3.6px -1.2px rgba(0,0,0,0.07);",
    tailwind:
      "shadow-[0_0.5px_0.6px_rgba(0,0,0,0.07),0_1.3px_1.6px_-0.6px_rgba(0,0,0,0.07),0_2.9px_3.6px_-1.2px_rgba(0,0,0,0.07)]",
    category: "layered",
    tags: ["smooth", "card", "realistic"],
  },
  {
    id: "smooth-medium",
    name: "Smooth Medium",
    nameZh: "平滑中",
    value:
      "0 0.6px 0.7px rgba(0,0,0,0.07), 0 2px 2.5px -0.4px rgba(0,0,0,0.07), 0 3.8px 4.7px -0.8px rgba(0,0,0,0.07), 0 6.7px 8.4px -1.2px rgba(0,0,0,0.07), 0 11.5px 14.4px -1.7px rgba(0,0,0,0.07)",
    css: "box-shadow: 0 0.6px 0.7px rgba(0,0,0,0.07), 0 2px 2.5px -0.4px rgba(0,0,0,0.07), 0 3.8px 4.7px -0.8px rgba(0,0,0,0.07), 0 6.7px 8.4px -1.2px rgba(0,0,0,0.07), 0 11.5px 14.4px -1.7px rgba(0,0,0,0.07);",
    tailwind:
      "shadow-[0_0.6px_0.7px_rgba(0,0,0,0.07),0_2px_2.5px_-0.4px_rgba(0,0,0,0.07),0_3.8px_4.7px_-0.8px_rgba(0,0,0,0.07),0_6.7px_8.4px_-1.2px_rgba(0,0,0,0.07),0_11.5px_14.4px_-1.7px_rgba(0,0,0,0.07)]",
    category: "layered",
    tags: ["smooth", "panel", "realistic"],
  },
  {
    id: "smooth-high",
    name: "Smooth High",
    nameZh: "平滑高",
    value:
      "0 0.7px 0.8px rgba(0,0,0,0.06), 0 2.4px 3px -0.3px rgba(0,0,0,0.06), 0 4.5px 5.6px -0.6px rgba(0,0,0,0.06), 0 7.5px 9.4px -0.9px rgba(0,0,0,0.06), 0 12.3px 15.4px -1.2px rgba(0,0,0,0.06), 0 19.5px 24.4px -1.5px rgba(0,0,0,0.06), 0 30px 37.5px -1.8px rgba(0,0,0,0.06)",
    css: "box-shadow: 0 0.7px 0.8px rgba(0,0,0,0.06), 0 2.4px 3px -0.3px rgba(0,0,0,0.06), 0 4.5px 5.6px -0.6px rgba(0,0,0,0.06), 0 7.5px 9.4px -0.9px rgba(0,0,0,0.06), 0 12.3px 15.4px -1.2px rgba(0,0,0,0.06), 0 19.5px 24.4px -1.5px rgba(0,0,0,0.06), 0 30px 37.5px -1.8px rgba(0,0,0,0.06);",
    tailwind:
      "shadow-[0_0.7px_0.8px_rgba(0,0,0,0.06),0_2.4px_3px_-0.3px_rgba(0,0,0,0.06),0_4.5px_5.6px_-0.6px_rgba(0,0,0,0.06),0_7.5px_9.4px_-0.9px_rgba(0,0,0,0.06),0_12.3px_15.4px_-1.2px_rgba(0,0,0,0.06),0_19.5px_24.4px_-1.5px_rgba(0,0,0,0.06),0_30px_37.5px_-1.8px_rgba(0,0,0,0.06)]",
    category: "layered",
    tags: ["smooth", "modal", "floating"],
  },
  {
    id: "smooth-crisp",
    name: "Smooth Crisp",
    nameZh: "平滑清晰",
    value:
      "0 1px 1.1px rgba(0,0,0,0.11), 0 2.5px 2.8px -0.8px rgba(0,0,0,0.11), 0 6.1px 6.9px -1.7px rgba(0,0,0,0.11), 0 14.8px 16.7px -2.5px rgba(0,0,0,0.11)",
    css: "box-shadow: 0 1px 1.1px rgba(0,0,0,0.11), 0 2.5px 2.8px -0.8px rgba(0,0,0,0.11), 0 6.1px 6.9px -1.7px rgba(0,0,0,0.11), 0 14.8px 16.7px -2.5px rgba(0,0,0,0.11);",
    tailwind:
      "shadow-[0_1px_1.1px_rgba(0,0,0,0.11),0_2.5px_2.8px_-0.8px_rgba(0,0,0,0.11),0_6.1px_6.9px_-1.7px_rgba(0,0,0,0.11),0_14.8px_16.7px_-2.5px_rgba(0,0,0,0.11)]",
    category: "layered",
    tags: ["smooth", "crisp", "product"],
  },
  {
    id: "elevation-6",
    name: "Elevation 6",
    nameZh: "层级 6",
    value:
      "0 11px 15px -7px rgba(0,0,0,0.2), 0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12)",
    css: "box-shadow: 0 11px 15px -7px rgba(0,0,0,0.2), 0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12);",
    tailwind:
      "shadow-[0_11px_15px_-7px_rgba(0,0,0,0.2),0_24px_38px_3px_rgba(0,0,0,0.14),0_9px_46px_8px_rgba(0,0,0,0.12)]",
    category: "elevation",
    tags: ["material", "modal", "overlay"],
  },
];

const categoryLabels: Record<ShadowCategory, { en: string; zh: string }> = {
  soft: { en: "Soft", zh: "柔和" },
  medium: { en: "Medium", zh: "中等" },
  hard: { en: "Hard", zh: "硬朗" },
  colored: { en: "Colored", zh: "彩色" },
  glow: { en: "Glow", zh: "辉光" },
  inner: { en: "Inner", zh: "内阴影" },
  layered: { en: "Layered", zh: "分层" },
  elevation: { en: "Elevation", zh: "层级" },
};

export function getShadowsByCategory(category: ShadowCategory): Shadow[] {
  return shadows.filter((s) => s.category === category);
}

export function getShadowById(id: string): Shadow | undefined {
  return shadows.find((s) => s.id === id);
}

export function getShadowCategories() {
  const categories = [...new Set(shadows.map((s) => s.category))];
  return categories.map((cat) => ({
    category: cat,
    count: shadows.filter((s) => s.category === cat).length,
    labelEn: categoryLabels[cat].en,
    labelZh: categoryLabels[cat].zh,
  }));
}
