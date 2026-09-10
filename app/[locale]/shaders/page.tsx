import type { Metadata } from "next";
import Page, { metadata as baseMetadata } from "@/app/shaders/page";
import { isLocale } from "@/lib/i18n/routing";
import { localizeMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return baseMetadata;
  const localized = locale === "zh"
    ? {
        ...baseMetadata,
        title: "Shader Lab 着色器实验室 — 零依赖 WebGL2 背景,实时调参",
        description:
          "来自 Paper 开源库的零依赖 WebGL2 背景着色器:渐变、流体、噪声、图案与光学。每个参数实时可调,复制 React 代码片段即用。",
        keywords: ["WebGL 背景", "着色器", "Shader", "WebGL2", "React 背景动画", "渐变背景"],
      }
    : baseMetadata;
  return localizeMetadata(localized, locale, "/shaders");
}

export default Page;
