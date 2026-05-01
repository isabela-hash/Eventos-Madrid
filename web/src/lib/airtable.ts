import type { Event, ProviderStatus, TicketOffer, TicketProvider, Venue } from "@/types";
import { mockEvents, mockFeaturedEvents, mockTonightEvents, mockVenues } from "./mock-data";

const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_API_URL = "https://api.airtable.com/v0";

function isConfigured(): boolean {
  return Boolean(API_KEY && BASE_ID);
}

function text(value: unknown, fallback = ""): string {
  if (Array.isArray(value)) return value.map((item) => String(item)).join(", ");
  return value === undefined || value === null ? fallback : String(value);
}

function number(value: unknown): number | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function bool(value: unknown): boolean {
  return value === true || value === 1 || value === "1" || value === "true";
}

function list(value: unknown): string[] | undefined {
  if (Array.isArray(value)) return value.map((item) => String(item));
  if (typeof value === "string" && value.trim()) return value.split(",").map((item) => item.trim());
  return undefined;
}

function provider(value: unknown): TicketProvider {
  const parsed = text(value).toLowerCase();
  if (parsed === "fourvenues" || parsed === "xceed" || parsed === "manual") return parsed;
  return "manual";
}

function providerStatus(value: unknown): ProviderStatus {
  const parsed = text(value, "active").toLowerCase();
  if (parsed === "sold_out" || parsed === "cancelled" || parsed === "unmatched" || parsed === "hidden") {
    return parsed;
  }
  return "active";
}

function publicStatus(value: unknown): Event["status"] {
  const parsed = text(value, "active").toLowerCase();
  if (parsed === "sold_out" || parsed === "cancelled") return parsed;
  return "active";
}

function recordFields(record: unknown): { id: string; fields: Record<string, unknown> } {
  const r = record as { id: string; fields?: Record<string, unknown> };
  return { id: r.id, fields: r.fields ?? {} };
}

async function fetchRecords(table: string, params: URLSearchParams = new URLSearchParams()): Promise<unknown[]> {
  if (!isConfigured()) return [];

  const records: unknown[] = [];
  let offset: string | undefined;

  do {
    const pageParams = new URLSearchParams(params);
    if (offset) pageParams.set("offset", offset);

    const res = await fetch(`${AIRTABLE_API_URL}/${BASE_ID}/${encodeURIComponent(table)}?${pageParams.toString()}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
      next: { revalidate: 300 },
    });

    if (!res.ok) throw new Error(`Airtable ${table} error: ${res.status}`);
    const data = (await res.json()) as { records?: unknown[]; offset?: string };
    records.push(...(data.records ?? []));
    offset = data.offset;
  } while (offset);

  return records;
}

function mapTicketOffer(record: unknown): TicketOffer {
  const r = recordFields(record);
  const f = r.fields;
  const eventId = text(f.event_id ?? f.Event ?? f.event);
  const parsedProvider = provider(f.provider);
  return {
    id: r.id,
    event_id: eventId,
    provider: parsedProvider,
    provider_offer_id: text(f.provider_offer_id ?? f.provider_rate_id) || undefined,
    provider_price_id: text(f.provider_price_id) || undefined,
    name: text(f.name, "Entrada"),
    description: text(f.description) || undefined,
    price: number(f.price) ?? 0,
    currency: text(f.currency, "€"),
    available: f.available === undefined ? true : bool(f.available),
    available_quantity: number(f.available_quantity),
    min_quantity: number(f.min_quantity) ?? 1,
    max_quantity: number(f.max_quantity) ?? 10,
    includes: text(f.includes) || undefined,
    checkout_url: text(f.checkout_url) || undefined,
    status: text(f.status, "active") === "sold_out" ? "sold_out" : text(f.status, "active") === "hidden" ? "hidden" : "active",
    raw_provider_payload: f.raw_provider_payload,
  };
}

function mapEvent(record: unknown): Event {
  const r = recordFields(record);
  const f = r.fields;
  const parsedProvider = provider(f.provider);
  const dateStart = text(f.date_start);
  const status = publicStatus(f.status);
  const parsedProviderStatus = providerStatus(f.provider_status ?? f.status);

  return {
    id: r.id,
    name: text(f.name),
    slug: text(f.slug, r.id),
    category: text(f.category, "Clubs"),
    subcategory: text(f.subcategory) || undefined,
    venue_id: text(f.venue_id ?? f.venue) || "",
    venue_name: text(f.venue_name) || undefined,
    neighborhood: text(f.neighborhood) || undefined,
    date_start: dateStart,
    time_start: text(f.time_start),
    price_from: number(f.price_from),
    price_to: number(f.price_to),
    currency: text(f.currency, "€"),
    description: text(f.description) || undefined,
    short_description: text(f.short_description) || undefined,
    poster_url: text(f.poster_url) || undefined,
    ticket_url: text(f.ticket_url) || undefined,
    affiliate_link: text(f.affiliate_link) || undefined,
    provider: parsedProvider,
    provider_event_id: text(f.provider_event_id) || undefined,
    provider_venue_id: text(f.provider_venue_id ?? f.provider_location_id) || undefined,
    provider_organization_id: text(f.provider_organization_id) || undefined,
    provider_status: parsedProviderStatus,
    checkout_url: text(f.checkout_url) || undefined,
    month: text(f.month) || dateStart.slice(0, 7),
    raw_provider_payload: f.raw_provider_payload,
    last_synced_at: text(f.last_synced_at) || undefined,
    is_featured: bool(f.is_featured),
    is_tonight: bool(f.is_tonight),
    tags: list(f.tags),
    status,
    stars_rating: number(f.stars_rating),
    review_snippet: text(f.review_snippet) || undefined,
  };
}

function mapVenue(record: unknown): Venue {
  const r = recordFields(record);
  const f = r.fields;
  const parsedProvider = provider(f.provider);
  return {
    id: r.id,
    name: text(f.name),
    slug: text(f.slug, r.id),
    type: text(f.type, "Nightlife"),
    address: text(f.address, "Madrid"),
    neighborhood: text(f.neighborhood, "Madrid"),
    google_maps_url: text(f.google_maps_url) || undefined,
    capacity: number(f.capacity),
    description: text(f.description) || undefined,
    landing_copy: text(f.landing_copy) || text(f.description) || undefined,
    photo_urls: list(f.photo_urls),
    website_url: text(f.website_url) || undefined,
    instagram_url: text(f.instagram_url) || undefined,
    phone: text(f.phone) || undefined,
    metro_station: text(f.metro_station) || undefined,
    affiliated: bool(f.affiliated),
    active: f.active === undefined ? true : bool(f.active),
    provider: parsedProvider,
    provider_organization_id: text(f.provider_organization_id) || undefined,
    provider_location_id: text(f.provider_location_id) || undefined,
    provider_venue_id: text(f.provider_venue_id) || text(f.provider_location_id) || undefined,
    hero_video_url: text(f.hero_video_url) || undefined,
    hero_title: text(f.hero_title) || undefined,
    hero_subtitle: text(f.hero_subtitle) || undefined,
  };
}

function visibleEvent(event: Event): boolean {
  return (
    event.status === "active" &&
    Boolean(event.name) &&
    /^\d{4}-\d{2}-\d{2}$/.test(event.date_start) &&
    !["hidden", "unmatched", "cancelled"].includes(event.provider_status ?? "active")
  );
}

function attachOffers(events: Event[], offers: TicketOffer[]): Event[] {
  return events.map((event) => {
    const eventOffers = offers.filter((offer) => {
      return offer.event_id === event.id || offer.event_id === event.provider_event_id || offer.event_id === event.slug;
    });
    return { ...event, ticket_offers: eventOffers.length ? eventOffers : event.ticket_offers };
  });
}

async function getAirtableEvents(): Promise<Event[]> {
  const params = new URLSearchParams();
  params.set("sort[0][field]", "date_start");
  params.set("sort[0][direction]", "asc");
  const [eventRecords, offerRecords] = await Promise.all([
    fetchRecords("Events", params),
    fetchRecords("Ticket Offers").catch(() => []),
  ]);
  const offers = offerRecords.map(mapTicketOffer).filter((offer) => offer.status !== "hidden");
  return attachOffers(eventRecords.map(mapEvent).filter(visibleEvent), offers);
}

export async function getEvents(): Promise<Event[]> {
  if (!isConfigured()) return mockEvents;
  try {
    const events = await getAirtableEvents();
    return events.length ? events : mockEvents;
  } catch {
    return mockEvents;
  }
}

export async function getFeaturedEvents(): Promise<Event[]> {
  const events = await getEvents();
  const featured = events.filter((event) => event.is_featured);
  return featured.length ? featured : mockFeaturedEvents;
}

export async function getTonightEvents(): Promise<Event[]> {
  const events = await getEvents();
  const tonight = events.filter((event) => event.is_tonight);
  return tonight.length ? tonight : mockTonightEvents;
}

export async function getVenues(): Promise<Venue[]> {
  if (!isConfigured()) return mockVenues;
  try {
    const records = await fetchRecords("Venues");
    const venues = records.map(mapVenue).filter((venue) => venue.active !== false);
    return venues.length ? venues : mockVenues;
  } catch {
    return mockVenues;
  }
}

export async function getVenueBySlug(slug: string): Promise<Venue | undefined> {
  const venues = await getVenues();
  return venues.find((venue) => venue.slug === slug);
}

export async function getEventBySlug(slug: string): Promise<Event | undefined> {
  const events = await getEvents();
  return events.find((event) => event.slug === slug);
}

export async function getEventsByDate(date: string): Promise<Event[]> {
  const events = await getEvents();
  return events.filter((event) => event.date_start === date);
}

export async function getEventsForVenueMonth(venueSlug: string, month: string): Promise<Event[]> {
  const [events, venues] = await Promise.all([getEvents(), getVenues()]);
  const venue = venues.find((item) => item.slug === venueSlug);
  if (!venue) return [];

  return events.filter((event) => {
    const sameVenue = event.venue_id === venue.id || event.venue_name === venue.name || event.provider_venue_id === venue.provider_venue_id;
    return sameVenue && event.date_start.startsWith(month);
  });
}
