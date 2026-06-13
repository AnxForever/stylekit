import { retiredEndpoint } from "@/lib/api/retired";

export async function GET() {
  return retiredEndpoint({
    feature: "Community feed",
    replacement: "/styles",
  });
}
