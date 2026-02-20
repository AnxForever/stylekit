import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/submit/reviewer", () => ({
  listSubmissions: vi.fn(),
  getLatestApprovedSubmissionBySlug: vi.fn(),
}));

vi.mock("@/lib/submit/reviewer-supabase", () => ({
  isSupabaseConfigured: vi.fn(),
  listSubmissionsSupabase: vi.fn(),
  getLatestApprovedSubmissionBySlugSupabase: vi.fn(),
}));

import {
  listCatalogStylesMeta,
  resolveStyleBySlug,
} from "@/lib/styles/community-runtime";
import {
  getLatestApprovedSubmissionBySlug,
  listSubmissions,
  type SubmissionRecord,
} from "@/lib/submit/reviewer";
import {
  getLatestApprovedSubmissionBySlugSupabase,
  isSupabaseConfigured,
  listSubmissionsSupabase,
} from "@/lib/submit/reviewer-supabase";

const mockedListSubmissions = vi.mocked(listSubmissions);
const mockedGetLatestApprovedSubmissionBySlug = vi.mocked(
  getLatestApprovedSubmissionBySlug
);
const mockedIsSupabaseConfigured = vi.mocked(isSupabaseConfigured);
const mockedListSubmissionsSupabase = vi.mocked(listSubmissionsSupabase);
const mockedGetLatestApprovedSubmissionBySlugSupabase = vi.mocked(
  getLatestApprovedSubmissionBySlugSupabase
);

const communitySubmission: SubmissionRecord = {
  id: "sub-community-1",
  slug: "aurora-community",
  submittedAt: "2026-02-19T00:00:00.000Z",
  status: "approved",
  formData: {
    name: "极光社区风",
    nameEn: "Aurora Community",
    description: "Community-submitted aurora style.",
    category: "expressive",
    styleType: "visual",
    tags: ["expressive", "modern"],
    primaryColor: "#2f3cff",
    secondaryColor: "#f6f8ff",
    accentColors: ["#22d3ee", "#a855f7"],
    keywords: ["aurora", "glow"],
    philosophy: "Blend soft glow with high readability.",
    doList: ["Keep glow effects subtle."],
    dontList: ["Avoid muddy gradients."],
    buttonCode: "<button className=\"px-4 py-2 rounded\">Aurora</button>",
    cardCode: "<div className=\"p-4 rounded-xl\">Card</div>",
    inputCode: "<input className=\"px-3 py-2 rounded\" />",
    aiRules: ["Prefer layered gradients."],
  },
  tokens: {
    border: {
      width: "border",
      color: "border-[#2f3cff]",
      radius: "rounded-lg",
      style: "border-solid",
    },
    shadow: {
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      none: "shadow-none",
      hover: "hover:shadow-lg",
      focus: "focus:shadow-md",
    },
    interaction: {
      hoverScale: "hover:scale-105",
      transition: "transition-all duration-200",
      active: "active:scale-95",
    },
    typography: {
      heading: "font-sans",
      body: "font-sans",
      sizes: {
        hero: "text-4xl",
        h1: "text-3xl",
        h2: "text-2xl",
        h3: "text-xl",
        body: "text-base",
        small: "text-sm",
      },
    },
    spacing: {
      section: "py-16",
      container: "px-6",
      card: "p-4",
      gap: {
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-6",
      },
    },
    colors: {
      background: {
        primary: "bg-[#f6f8ff]",
        secondary: "bg-[#eef2ff]",
        accent: ["bg-[#22d3ee]"],
      },
      text: {
        primary: "text-[#1e293b]",
        secondary: "text-[#475569]",
        muted: "text-[#64748b]",
      },
      button: {
        primary: "bg-[#2f3cff] text-[#f6f8ff]",
        secondary: "bg-[#f6f8ff] text-[#1e293b]",
      },
    },
    forbidden: {
      classes: [],
      patterns: [],
      reasons: {},
    },
    required: {
      button: ["bg-[#2f3cff]"],
      card: ["p-4"],
      input: ["border"],
    },
  },
  designStyle: {
    slug: "aurora-community",
    name: "极光社区风",
    nameEn: "Aurora Community",
    description: "Community-submitted aurora style.",
    cover: "/styles/aurora-community/opengraph-image",
    styleType: "visual",
    tags: ["expressive", "modern"],
    category: "expressive",
    colors: {
      primary: "#2f3cff",
      secondary: "#f6f8ff",
      accent: ["#22d3ee", "#a855f7"],
    },
    keywords: ["aurora", "glow"],
    philosophy: "Blend soft glow with high readability.",
    doList: ["Keep glow effects subtle."],
    dontList: ["Avoid muddy gradients."],
    components: {
      button: {
        name: "Button",
        description: "Primary action",
        code: "<button className=\"px-4 py-2 rounded\">Aurora</button>",
      },
      card: {
        name: "Card",
        description: "Content card",
        code: "<div className=\"p-4 rounded-xl\">Card</div>",
      },
      input: {
        name: "Input",
        description: "Text input",
        code: "<input className=\"px-3 py-2 rounded\" />",
      },
    },
    globalCss: "",
    aiRules: "Prefer layered gradients.",
  },
};

afterEach(() => {
  vi.clearAllMocks();
});

describe("community runtime styles", () => {
  it("resolves built-in style from static registry", async () => {
    mockedIsSupabaseConfigured.mockReturnValue(false);

    const result = await resolveStyleBySlug("neo-brutalist");

    expect(result?.source).toBe("static");
    expect(result?.style.slug).toBe("neo-brutalist");
    expect(mockedGetLatestApprovedSubmissionBySlug).not.toHaveBeenCalled();
    expect(mockedGetLatestApprovedSubmissionBySlugSupabase).not.toHaveBeenCalled();
  });

  it("resolves approved community style in file-backed mode", async () => {
    mockedIsSupabaseConfigured.mockReturnValue(false);
    mockedGetLatestApprovedSubmissionBySlug.mockResolvedValue(communitySubmission);

    const result = await resolveStyleBySlug("aurora-community");

    expect(result?.source).toBe("community");
    expect(result?.submissionId).toBe("sub-community-1");
    expect(result?.style.nameEn).toBe("Aurora Community");
    expect(result?.tokens).toBeTruthy();
    expect(mockedGetLatestApprovedSubmissionBySlug).toHaveBeenCalledWith(
      "aurora-community"
    );
  });

  it("merges approved community meta and skips static slug collisions", async () => {
    mockedIsSupabaseConfigured.mockReturnValue(false);
    mockedListSubmissions.mockResolvedValue([
      communitySubmission,
      {
        ...communitySubmission,
        id: "sub-community-2",
        slug: "neo-brutalist",
      },
    ] as never);

    const result = await listCatalogStylesMeta();

    expect(result.some((item) => item.slug === "aurora-community")).toBe(true);
    expect(result.filter((item) => item.slug === "neo-brutalist")).toHaveLength(1);
    expect(mockedListSubmissions).toHaveBeenCalledWith("approved");
    expect(mockedListSubmissionsSupabase).not.toHaveBeenCalled();
  });
});
