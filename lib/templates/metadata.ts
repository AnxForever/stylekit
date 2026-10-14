import { BRAND_ASSETS } from "@/lib/brand/assets";
import type { Metadata } from "next";

export const baseTemplateMetadata: Metadata = {
  title: "Website Templates & Open-source Projects",
  description:
    "Explore complete portfolio, blog, and business website projects alongside downloadable Next.js interface examples. Preview real sites and get their full source repositories.",
  openGraph: {
    title: "Website Templates & Open-source Projects | StyleKit",
    description:
      "Complete website projects with live previews and upstream source, plus downloadable Next.js page examples for your own data and services.",
    siteName: "StyleKit",
    images: [{ url: BRAND_ASSETS.socialPreview, width: 1200, height: 630 }],
    type: "website",
  },
};
