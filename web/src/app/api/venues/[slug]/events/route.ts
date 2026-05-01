import { NextResponse } from "next/server";
import { getEventsForVenueMonth, getVenueBySlug } from "@/lib/airtable";

interface RouteContext {
  params: {
    slug: string;
  };
}

export async function GET(request: Request, { params }: RouteContext) {
  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month") ?? new Date().toISOString().slice(0, 7);

  if (!/^\d{4}-\d{2}$/.test(month)) {
    return NextResponse.json({ error: "Missing or invalid month. Use YYYY-MM." }, { status: 400 });
  }

  const [venue, events] = await Promise.all([
    getVenueBySlug(params.slug),
    getEventsForVenueMonth(params.slug, month),
  ]);

  if (!venue) return NextResponse.json({ error: "Venue not found" }, { status: 404 });

  return NextResponse.json({ venue, month, events });
}
