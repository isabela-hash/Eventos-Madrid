import { NextResponse } from "next/server";
import type { Event, TicketOffer, Venue } from "@/types";
import { getVenues } from "@/lib/airtable";
import { fetchFourvenuesEvents } from "@/lib/providers/fourvenues";

const AIRTABLE_API_URL = "https://api.airtable.com/v0";

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function normalizeFourvenuesEvent(raw: unknown, venue: Venue): Event {
  const item = asRecord(raw);
  const id = String(item._id ?? item.id ?? `${venue.slug}-${item.slug ?? Date.now()}`);
  const start = String(item.start_date ?? item.display_date ?? "");
  const startDate = start ? start.slice(0, 10) : "";
  const time = start.includes("T") ? start.slice(11, 16) : "";
  const name = String(item.name ?? venue.name);
  const ticketRates = Array.isArray(item.ticket_rates) ? item.ticket_rates : [];

  const offers = ticketRates.map((rate) => normalizeFourvenuesTicketOffer(rate, id));
  const activeOffers = offers.filter((offer) => offer.available && offer.status === "active");
  const priceFrom = activeOffers.length ? Math.min(...activeOffers.map((offer) => offer.price)) : undefined;

  return {
    id: `fv-${id}`,
    name,
    slug: slugify(`${venue.slug}-${name}-${startDate}`),
    category: "Clubs",
    subcategory: venue.type,
    venue_id: venue.id,
    venue_name: venue.name,
    neighborhood: venue.neighborhood,
    date_start: startDate,
    time_start: time,
    price_from: priceFrom,
    currency: "€",
    description: String(item.description ?? venue.description ?? ""),
    short_description: venue.description,
    poster_url: String(item.image_url ?? venue.photo_urls?.[0] ?? ""),
    status: activeOffers.length ? "active" : "sold_out",
    provider: "fourvenues",
    provider_event_id: id,
    provider_venue_id: venue.provider_location_id,
    provider_organization_id: venue.provider_organization_id,
    provider_status: activeOffers.length ? "active" : "sold_out",
    month: startDate.slice(0, 7),
    ticket_offers: offers,
    raw_provider_payload: raw,
    last_synced_at: new Date().toISOString(),
  };
}

function normalizeFourvenuesTicketOffer(raw: unknown, eventId: string): TicketOffer {
  const rate = asRecord(raw);
  const currentPrice = asRecord(rate.current_price);
  const availability = asRecord(rate.availability);
  const rateId = String(rate._id ?? rate.id ?? "");
  const price = Number(currentPrice.price ?? 0);
  const available = Boolean(rate.available ?? Number(availability.available ?? 0) > 0);

  return {
    id: `fv-offer-${rateId}`,
    event_id: eventId,
    provider: "fourvenues",
    provider_offer_id: rateId,
    provider_price_id: String(currentPrice._id ?? currentPrice.id ?? ""),
    name: String(rate.name ?? "Entrada"),
    description: String(currentPrice.additional_info ?? ""),
    price,
    currency: "€",
    available,
    available_quantity: Number(availability.available ?? 0) || undefined,
    min_quantity: Number(rate.min ?? 1),
    max_quantity: Number(rate.max ?? 10),
    includes: String(currentPrice.includes ?? ""),
    status: available ? "active" : "sold_out",
    raw_provider_payload: raw,
  };
}

async function airtableFind(table: string, formula: string): Promise<string | undefined> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (!apiKey || !baseId) return undefined;

  const params = new URLSearchParams({ filterByFormula: formula, maxRecords: "1" });
  const res = await fetch(`${AIRTABLE_API_URL}/${baseId}/${encodeURIComponent(table)}?${params.toString()}`, {
    headers: { Authorization: `Bearer ${apiKey}` },
    cache: "no-store",
  });
  if (!res.ok) return undefined;
  const data = (await res.json()) as { records?: { id: string }[] };
  return data.records?.[0]?.id;
}

async function airtableUpsert(table: string, lookupFormula: string, fields: Record<string, unknown>) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  if (!apiKey || !baseId) return { skipped: true };

  const existingId = await airtableFind(table, lookupFormula);
  const url = `${AIRTABLE_API_URL}/${baseId}/${encodeURIComponent(table)}${existingId ? `/${existingId}` : ""}`;
  const res = await fetch(url, {
    method: existingId ? "PATCH" : "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Airtable upsert ${table} failed: ${res.status} ${body}`);
  }
  return res.json();
}

function eventFields(event: Event) {
  return {
    name: event.name,
    slug: event.slug,
    category: event.category,
    subcategory: event.subcategory,
    venue_id: event.venue_id,
    venue_name: event.venue_name,
    neighborhood: event.neighborhood,
    date_start: event.date_start,
    time_start: event.time_start,
    price_from: event.price_from,
    currency: event.currency,
    description: event.description,
    short_description: event.short_description,
    poster_url: event.poster_url,
    provider: event.provider,
    provider_event_id: event.provider_event_id,
    provider_venue_id: event.provider_venue_id,
    provider_organization_id: event.provider_organization_id,
    provider_status: event.provider_status,
    month: event.month,
    status: event.status,
    raw_provider_payload: JSON.stringify(event.raw_provider_payload ?? {}),
    last_synced_at: event.last_synced_at,
  };
}

function offerFields(offer: TicketOffer, event: Event) {
  return {
    event_id: event.provider_event_id,
    provider: offer.provider,
    provider_offer_id: offer.provider_offer_id,
    provider_price_id: offer.provider_price_id,
    name: offer.name,
    description: offer.description,
    price: offer.price,
    currency: offer.currency,
    available: offer.available,
    available_quantity: offer.available_quantity,
    min_quantity: offer.min_quantity,
    max_quantity: offer.max_quantity,
    includes: offer.includes,
    status: offer.status,
    raw_provider_payload: JSON.stringify(offer.raw_provider_payload ?? {}),
  };
}

async function runSync(request: Request) {
  const { searchParams } = new URL(request.url);
  const auth = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const secret = searchParams.get("secret") ?? request.headers.get("x-sync-secret") ?? auth;

  const expectedSecret = process.env.SYNC_SECRET ?? process.env.CRON_SECRET;
  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized sync request." }, { status: 401 });
  }

  const startDate = isoDate(new Date());
  const endDate = isoDate(addDays(new Date(), 60));
  const venues = (await getVenues()).filter((venue) => venue.provider === "fourvenues" && venue.provider_location_id);
  const synced: Event[] = [];
  const errors: string[] = [];

  for (const venue of venues) {
    try {
      const rawEvents = await fetchFourvenuesEvents({
        startDate,
        endDate,
        locationId: venue.provider_location_id,
        organizationId: venue.provider_organization_id,
      });

      for (const rawEvent of rawEvents) {
        const event = normalizeFourvenuesEvent(rawEvent, venue);
        synced.push(event);
        await airtableUpsert("Events", `{provider_event_id}='${event.provider_event_id}'`, eventFields(event));

        for (const offer of event.ticket_offers ?? []) {
          await airtableUpsert("Ticket Offers", `{provider_offer_id}='${offer.provider_offer_id}'`, offerFields(offer, event));
        }
      }
    } catch (error) {
      errors.push(`${venue.name}: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  return NextResponse.json({
    startDate,
    endDate,
    venues_checked: venues.length,
    events_synced: synced.length,
    errors,
  });
}

export async function POST(request: Request) {
  return runSync(request);
}

export async function GET(request: Request) {
  return runSync(request);
}
