import { retiredEndpoint } from "@/lib/api/retired";

export async function GET() {
  return retiredEndpoint({
    feature: "Style pipeline",
    replacement: "/styles",
  });
}
