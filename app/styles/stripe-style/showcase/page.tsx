import dynamicImport from "next/dynamic";

export const dynamic = "force-static";

export const metadata = {
  title: "Stripe Style Showcase - StyleKit",
  description: "Live demonstration of Stripe-inspired design style with professional fintech aesthetics.",
};

const ShowcaseContent = dynamicImport(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function StripeStyleShowcasePage() {
  return <ShowcaseContent />;
}
