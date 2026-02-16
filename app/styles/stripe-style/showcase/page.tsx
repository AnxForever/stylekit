import dynamic from "next/dynamic";

export const metadata = {
  title: "Stripe Style Showcase - StyleKit",
  description: "Live demonstration of Stripe-inspired design style with professional fintech aesthetics.",
};

const ShowcaseContent = dynamic(() => import("./_content"), {
  loading: () => <div className="min-h-screen" />,
});

export default function StripeStyleShowcasePage() {
  return <ShowcaseContent />;
}
