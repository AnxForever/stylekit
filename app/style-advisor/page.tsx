import type { Metadata } from "next";
import { StyleAdvisorStandalone } from "@/components/bailian/style-advisor-standalone";

export const metadata: Metadata = {
  title: "AI Style Advisor | StyleKit",
  description: "用自然语言匹配 StyleKit 的已验证设计风格。",
};

export default function StyleAdvisorPage() {
  return <StyleAdvisorStandalone />;
}
