import { NextResponse } from "next/server";
import { getEventsByDate, getVenues } from "@/lib/airtable";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Missing or invalid date. Use YYYY-MM-DD." }, { status: 400 });
  }

  const [events, venues] = await Promise.all([getEventsByDate(date), getVenues()]);
  const venueMap = new Map(venues.map((venue) => [venue.id, venue]));

  return NextResponse.json({
    date,
    events,
    venues: events
      .map((event) => venueMap.get(event.venue_id) ?? venues.find((venue) => venue.name === event.venue_name))
      .filter(Boolean),
  });
}
