import { retiredEndpoint } from "@/lib/api/retired";

export async function GET() {
  return retiredEndpoint({
    feature: "Design system generation",
    replacement: "/styles",
  });
}

export async function POST() {
  return retiredEndpoint({
    feature: "Design system generation",
    replacement: "/styles",
  });
}
