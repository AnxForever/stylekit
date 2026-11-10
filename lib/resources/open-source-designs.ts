export interface OpenSourceDesignSite {
  slug: string;
  name: string;
  description: { zh: string; en: string };
  demoUrl: string;
  repositoryUrl: string;
  /** Screenshot captured from and reviewed against the linked demo. */
  previewImage: string;
  /** Upstream provenance for maintainers; not displayed on discovery cards. */
  license: string;
  licenseUrl: string;
}

/** Selected public projects from the maintainer's GitHub Stars. */
export const openSourceDesignSites = [
  {
    slug: "chanh-dai",
    name: "Chanh Dai",
    description: {
      zh: "细线网格与等距插画构成的个人主页，细节克制而鲜明。",
      en: "A personal site shaped by fine grids, isometric sketches, and precise typography.",
    },
    demoUrl: "https://chanhdai.com",
    repositoryUrl: "https://github.com/ncdai/chanhdai.com",
    previewImage: "/open-source/chanh-dai.webp",
    license: "MIT",
    licenseUrl: "https://github.com/ncdai/chanhdai.com/blob/e5c502ded09d0c3baca1ad275ce8abef7e5bbd01/LICENSE",
  },
  {
    slug: "shadcn-admin",
    name: "Shadcn Admin",
    description: {
      zh: "清爽的侧栏、数据卡片与表格，组成一套完整后台界面。",
      en: "A clean dashboard with polished navigation, data cards, and tables.",
    },
    demoUrl: "https://shadcn-admin.netlify.app/",
    repositoryUrl: "https://github.com/satnaing/shadcn-admin",
    previewImage: "/open-source/shadcn-admin.webp",
    license: "MIT",
    licenseUrl: "https://github.com/satnaing/shadcn-admin/blob/e16c87f213a5ba5e45964e9b67c792105ec74d26/LICENSE",
  },
  {
    slug: "cult-ui",
    name: "Cult UI",
    description: {
      zh: "玻璃材质、动态卡片和细腻交互，让基础界面更有表现力。",
      en: "Expressive components built around glass textures, dynamic cards, and subtle motion.",
    },
    demoUrl: "https://www.cult-ui.com/docs/components/fluted-glass",
    repositoryUrl: "https://github.com/nolly-studio/cult-ui",
    previewImage: "/open-source/cult-ui.webp",
    license: "MIT",
    licenseUrl: "https://github.com/nolly-studio/cult-ui/blob/7f031dc812f7bda10213bab62752dd6d080297ff/LICENSE.md",
  },
  {
    slug: "animal-island-ui",
    name: "Animal Island UI",
    description: {
      zh: "柔和配色、圆润造型与纸片层次，呈现轻松的童趣界面。",
      en: "Soft colors, rounded shapes, and paper-like depth for playful interfaces.",
    },
    demoUrl: "https://guokaigdg.github.io/animal-island-ui/#/",
    repositoryUrl: "https://github.com/guokaigdg/animal-island-ui",
    previewImage: "/open-source/animal-island-ui.webp",
    license: "MIT",
    licenseUrl: "https://github.com/guokaigdg/animal-island-ui/blob/2d855fc6c1cb56cc4152290f50c43439d4a4920f/LICENSE",
  },
  {
    slug: "sticker-forge",
    name: "Sticker Forge",
    description: {
      zh: "可拖动、可撕起的立体贴纸，让材质和交互成为画面主角。",
      en: "Drag and peel tactile stickers in an interactive design playground.",
    },
    demoUrl: "https://sticker.oooo.so",
    repositoryUrl: "https://github.com/CatsJuice/sticker-forge",
    previewImage: "/open-source/sticker-forge.webp",
    license: "MIT",
    licenseUrl: "https://github.com/CatsJuice/sticker-forge/blob/068caa49eef69745564a5debbc01bab3fcd31042/LICENSE",
  },
  {
    slug: "tegaki",
    name: "Tegaki",
    description: {
      zh: "让文字沿笔画逐步写出，适合标题、签名与手写感页面。",
      en: "Stroke-by-stroke handwriting for expressive titles and signatures.",
    },
    demoUrl: "https://tegaki.ink/studio/",
    repositoryUrl: "https://github.com/gkurt/tegaki",
    previewImage: "/open-source/tegaki.webp",
    license: "MIT",
    licenseUrl: "https://github.com/gkurt/tegaki/blob/32654a4cfb0fa6a2873264cf693316acd59d1627/LICENSE",
  },
] as const satisfies readonly OpenSourceDesignSite[];
