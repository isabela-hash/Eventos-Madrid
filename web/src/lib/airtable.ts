import type { Event, Venue } from "@/types";
import {
  mockEvents,
  mockVenues,
  mockFeaturedEvents,
  mockTonightEvents,
} from "./mock-data";

const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

function isConfigured(): boolean {
  return Boolean(API_KEY && BASE_ID);
}

async function fetchRecords(table: string, params = ""): Promise<unknown[]> {
  const url = `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(table)}${params}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${API_KEY}` },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error(`Airtable error: ${res.status}`);
  const data = await res.json();
  return (data as { records: unknown[] }).records;
}

function mapEvent(record: unknown): Event {
  const r = record as { id: string; fields: Record<string, unknown> };
  const f = r.fields;
  return {
    id: r.id,
    name: String(f.name ?? ""),
    slug: String(f.slug ?? r.id),
    category: String(f.category ?? ""),
    subcategory: f.subcategory ? String(f.subcategory) : undefined,
    venue_id: String(f.venue_id ?? ""),
    venue_name: f.venue_name ? String(f.venue_name) : undefined,
    neighborhood: f.neighborhood ? String(f.neighborhood) : undefined,
    date_start: String(f.date_start ?? ""),
    time_start: String(f.time_start ?? ""),
    price_from: f.price_from ? Number(f.price_from) : undefined,
    price_to: f.price_to ? Number(f.price_to) : undefined,
    currency: String(f.currency ?? "€"),
    description: f.description ? String(f.description) : undefined,
    short_description: f.short_description ? String(f.short_description) : undefined,
    poster_url: f.poster_url ? String(f.poster_url) : undefined,
    ticket_url: f.ticket_url ? String(f.ticket_url) : undefined,
    affiliate_link: f.affiliate_link ? String(f.affiliate_link) : undefined,
    is_featured: Boolean(f.is_featured),
    is_tonight: Boolean(f.is_tonight),
    tags: Array.isArray(f.tags) ? (f.tags as string[]) : undefined,
    status: (f.status as Event["status"]) ?? "active",
    stars_rating: f.stars_rating ? Number(f.stars_rating) : undefined,
    review_snippet: f.review_snippet ? String(f.review_snippet) : undefined,
  };
}

function mapVenue(record: unknown): Venue {
  const r = record as { id: string; fields: Record<string, unknown> };
  const f = r.fields;
  return {
    id: r.id,
    name: String(f.name ?? ""),
    slug: String(f.slug ?? r.id),
    type: String(f.type ?? ""),
    address: String(f.address ?? ""),
    neighborhood: String(f.neighborhood ?? ""),
    google_maps_url: f.google_maps_url ? String(f.google_maps_url) : undefined,
    capacity: f.capacity ? Number(f.capacity) : undefined,
    description: f.description ? String(f.description) : undefined,
    photo_urls: Array.isArray(f.photo_urls) ? (f.photo_urls as string[]) : undefined,
    website_url: f.website_url ? String(f.website_url) : undefined,
    instagram_url: f.instagram_url ? String(f.instagram_url) : undefined,
    phone: f.phone ? String(f.phone) : undefined,
    metro_station: f.metro_station ? String(f.metro_station) : undefined,
    affiliated: Boolean(f.affiliated),
  };
}

export async function getEvents(): Promise<Event[]> {
  if (!isConfigured()) return mockEvents;
  try {
    const records = await fetchRecords("Events", "?filterByFormula={status}='active'&sort[0][field]=date_start");
    return records.map(mapEvent);
  } catch {
    return mockEvents;
  }
}

export async function getFeaturedEvents(): Promise<Event[]> {
  if (!isConfigured()) return mockFeaturedEvents;
  try {
    const records = await fetchRecords("Events", "?filterByFormula=AND({is_featured}=1,{status}='active')");
    return records.map(mapEvent);
  } catch {
    return mockFeaturedEvents;
  }
}

export async function getTonightEvents(): Promise<Event[]> {
  if (!isConfigured()) return mockTonightEvents;
  try {
    const records = await fetchRecords("Events", "?filterByFormula=AND({is_tonight}=1,{status}='active')");
    return records.map(mapEvent);
  } catch {
    return mockTonightEvents;
  }
}

export async function getVenues(): Promise<Venue[]> {
  if (!isConfigured()) return mockVenues;
  try {
    const records = await fetchRecords("Venues");
    return records.map(mapVenue);
  } catch {
    return mockVenues;
  }
}
