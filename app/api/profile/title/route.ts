import { retiredEndpoint } from "@/lib/api/retired";

export async function GET() {
  return retiredEndpoint({
    feature: "Profile title",
    replacement: "/styles",
  });
}
