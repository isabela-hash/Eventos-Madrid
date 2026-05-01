import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => ({}));

  // Placeholder for private Xceed webhook support. Hosted/widget checkout can
  // still be used before Xceed exposes account-specific webhook credentials.
  console.info("xceed-webhook", JSON.stringify(payload));

  return NextResponse.json({ received: true });
}
