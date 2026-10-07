export type MobileLocale = "zh" | "en";
export type MobileScenario = "reading" | "commerce" | "workspace";
export type MobilePlatform = "web" | "react" | "vue" | "react-native" | "swiftui" | "flutter";

export interface LocalizedText {
  zh: string;
  en: string;
}

export interface MobileLibrary {
  id: string;
  name: string;
  platforms: MobilePlatform[];
  category: "library" | "primitive" | "design-system";
  summary: LocalizedText;
  bestFor: LocalizedText;
  caution: LocalizedText;
  components: LocalizedText[];
  license: string;
  repository: string;
  docs: string;
  checkedAt: string;
  source: "starred" | "requested" | "research";
  scenarios: MobileScenario[];
}

export interface MobilePattern {
  id: MobileScenario;
  name: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  structure: LocalizedText[];
  checks: LocalizedText[];
  styleSlug: string;
  styleName: LocalizedText;
}
