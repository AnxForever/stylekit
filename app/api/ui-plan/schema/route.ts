import schema from "@/lib/schema/json-schema.json";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(schema);
}
