import { retiredEndpoint } from "@/lib/api/retired";

export async function GET() {
  return retiredEndpoint({
    feature: "AI style generation",
    replacement: "/styles",
  });
}

export async function POST() {
  return retiredEndpoint({
    feature: "AI style generation",
    replacement: "/styles",
  });
}
