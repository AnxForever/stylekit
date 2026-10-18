export type DownloadKind = "3d";

export type DownloadStyle = "low-poly" | "clay" | "voxel" | "futuristic" | "cartoon" | "toy";

export type DownloadTheme = "props" | "creatures" | "architecture" | "scenes" | "furniture";

export type LocalizedText = { zh: string; en: string };

export type DownloadFile = {
  id: string;
  name: string;
  format: string;
  bytes: number;
  sha256: string;
  role: "bundle" | "source" | "model" | "guide";
};

export type DownloadPreview = {
  src: string;
  alt: LocalizedText;
  kind: "image";
};

export type DownloadPack = {
  slug: string;
  kind: DownloadKind;
  style: DownloadStyle;
  theme: DownloadTheme;
  name: LocalizedText;
  description: LocalizedText;
  version: string;
  itemCount: number;
  geometry?: {
    triangles?: number;
    dimensions?: [number, number, number];
  };
  tags: string[];
  styleSlugs: string[];
  publication: "draft" | "published";
  license: {
    status: "pending" | "confirmed";
    name?: string;
    text?: LocalizedText;
  };
  cover: DownloadPreview;
  previews: DownloadPreview[];
  files: DownloadFile[];
  notes: LocalizedText[];
};
