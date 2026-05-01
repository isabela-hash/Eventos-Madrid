import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));

  // V1 stores the payload for observability via platform logs. When Fourvenues
  // webhook credentials are issued, this route should verify signatures and
  // update Airtable order/payment status.
  console.info("fourvenues-webhook", JSON.stringify(payload));

  return NextResponse.json({ received: true });
}
