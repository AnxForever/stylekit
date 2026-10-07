import type { MobileLibrary, MobileLocale, MobilePattern, MobilePlatform } from "./types";

export const mobilePlatforms: { id: MobilePlatform | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "swiftui", label: "SwiftUI / iOS" },
  { id: "react", label: "React Web" },
  { id: "vue", label: "Vue Web" },
  { id: "web", label: "Web / H5" },
  { id: "react-native", label: "React Native" },
  { id: "flutter", label: "Flutter" },
];

function supportsPlatform(library: MobileLibrary, platform: MobilePlatform | "all"): boolean {
  if (platform === "all") return true;
  if (platform === "web") {
    return library.platforms.some((entry) => entry === "web" || entry === "react" || entry === "vue");
  }
  return library.platforms.includes(platform);
}

export function filterMobileLibraries(
  libraries: readonly MobileLibrary[],
  platform: MobilePlatform | "all",
  query: string,
): MobileLibrary[] {
  const terms = query.normalize("NFKC").toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return libraries.filter((library) => {
    if (!supportsPlatform(library, platform)) return false;
    const text = [
      library.name,
      ...library.platforms,
      ...library.platforms.map((platformId) => mobilePlatforms.find((entry) => entry.id === platformId)?.label ?? ""),
      ...(library.platforms.includes("react-native") ? ["rn", "expo", "ios", "android", "原生"] : []),
      ...(library.platforms.includes("swiftui") ? ["swift", "ios", "原生"] : []),
      library.license,
      library.summary.zh, library.summary.en,
      library.bestFor.zh, library.bestFor.en,
      ...library.components.flatMap((component) => [component.zh, component.en]),
    ].join(" ").normalize("NFKC").toLocaleLowerCase();
    return terms.every((term) => text.includes(term));
  });
}

export function buildMobileBrief(
  pattern: MobilePattern,
  locale: MobileLocale,
  platform: MobilePlatform | "all",
  libraries: readonly MobileLibrary[],
): string {
  const zh = locale === "zh";
  const platformLabel = mobilePlatforms.find((entry) => entry.id === platform)?.label;
  const selected = libraries.filter((library) =>
    library.scenarios.includes(pattern.id)
    && supportsPlatform(library, platform),
  );
  return [
    `# ${zh ? "移动端设计要求" : "Mobile design brief"} — ${pattern.name[locale]}`,
    "",
    `${zh ? "目标平台" : "Target platform"}: ${platform === "all" ? (zh ? "先确认 Web 或原生 App，再选择组件库。" : "Confirm web or native before choosing a library.") : platformLabel}`,
    pattern.description[locale],
    "",
    `## ${zh ? "页面结构" : "Structure"}`,
    ...pattern.structure.map((item) => `- ${item[locale]}`),
    "",
    `## ${zh ? "验收要求" : "Acceptance checks"}`,
    ...pattern.checks.map((item) => `- ${item[locale]}`),
    zh ? "- 验证 360px、390px 和 430px 窄屏，无横向溢出。" : "- Check 360px, 390px, and 430px viewports without horizontal overflow.",
    zh ? "- 检查安全区、软键盘、键盘焦点、深色模式与减少动态效果偏好。" : "- Check safe areas, software keyboards, keyboard focus, dark mode, and reduced motion.",
    zh ? "- 接入业务时补齐加载、空、成功和失败状态；不要把本地示例数据当作已接入服务。" : "- Add loading, empty, success, and error states for real data; local demo state is not a connected service.",
    "",
    `## ${zh ? "候选组件库（择一组合，先核对兼容性）" : "Library candidates (choose a compatible combination)"}`,
    ...(selected.length ? selected.map((library) =>
      `- ${library.name} (${library.platforms.join(", ")}; ${library.license}): ${library.docs}\n  ${library.caution[locale]}`,
    ) : [zh ? "- 当前技术栈暂无已核验候选，先完成选型。" : "- No verified candidate for this stack yet; complete library selection first."]),
    "",
    `${zh ? "视觉参考" : "Visual reference"}: https://www.stylekit.top/${locale}/styles/${pattern.styleSlug}`,
    zh ? "SwiftUI / React Native 组件不直接运行于 Next.js；网页示意不能代替原生设备验收。" : "SwiftUI / React Native components do not run directly in Next.js; web previews do not replace native-device verification.",
  ].join("\n");
}
