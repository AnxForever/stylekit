import type { Metadata } from "next";

import { UiSdkProbe } from "./_content";

export const metadata: Metadata = {
  title: "ui-sdk 接入验证",
  description:
    "用 @ui-sdk/react 的 headless 组件替换原生 select 的最小验证页。",
  robots: { index: false, follow: false },
};

export default function UiSdkProbePage() {
  return <UiSdkProbe />;
}
