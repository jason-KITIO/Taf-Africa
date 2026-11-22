import { NextResponse } from "next/server";
import { renewSubscriptions } from "@/lib/demo-store";

export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }
  const renewed = renewSubscriptions();
  return NextResponse.json({ renewed });
}
