import type { Metadata } from "next";
import offerSnapshot from "@/docs/examples/corporate-clean-saas-offer-v2.json";
import { CorporateCleanValidation } from "./_content";

export const metadata: Metadata = {
  title: "Corporate Clean SaaS 价格研究 - StyleKit",
  description: "StyleKit Corporate Clean SaaS Pack 的隔离价格研究入口。",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
};

export default function CorporateCleanValidationPage() {
  return <CorporateCleanValidation offer={offerSnapshot} />;
}
