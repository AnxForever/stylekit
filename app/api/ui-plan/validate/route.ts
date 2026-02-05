import { validateUIPlan } from "@/lib/schema/validator";
import { NextResponse } from "next/server";
import type { UIPlan } from "@/lib/schema/ui-plan";

export async function POST(request: Request) {
  try {
    const plan: UIPlan = await request.json();
    const validation = validateUIPlan(plan);

    return NextResponse.json({
      valid: validation.valid,
      errors: validation.errors,
      warnings: validation.warnings,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON format" },
      { status: 400 }
    );
  }
}
