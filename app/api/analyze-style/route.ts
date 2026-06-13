import { retiredEndpoint } from "@/lib/api/retired";

export async function POST() {
  return retiredEndpoint({
    feature: "Project style analysis",
    replacement: "/api/match-style",
  });
}
