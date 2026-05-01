import type { Event, TicketOffer } from "@/types";

const DEFAULT_BASE_URL = "https://channels-service.fourvenues.com";

function baseUrl() {
  return process.env.FOURVENUES_BASE_URL ?? DEFAULT_BASE_URL;
}

function apiKey() {
  return process.env.FOURVENUES_API_KEY;
}

async function fourvenuesFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const key = apiKey();
  if (!key) throw new Error("FOURVENUES_API_KEY is not configured");

  const res = await fetch(`${baseUrl()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": key,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Fourvenues ${path} failed: ${res.status} ${body}`);
  }

  return (await res.json()) as T;
}

export interface FourvenuesEventParams {
  startDate: string;
  endDate: string;
  locationId?: string;
  organizationId?: string;
}

export async function fetchFourvenuesEvents(params: FourvenuesEventParams): Promise<unknown[]> {
  const search = new URLSearchParams({
    start_date: params.startDate,
    end_date: params.endDate,
  });
  if (params.locationId) search.set("location_id", params.locationId);
  if (params.organizationId) search.set("organization_id", params.organizationId);

  const data = await fourvenuesFetch<{ data?: unknown[]; success?: boolean }>(`/events?${search.toString()}`);
  return data.data ?? [];
}

export interface FourvenuesCheckoutInput {
  event: Event;
  offer: TicketOffer;
  quantity: number;
  buyer: {
    full_name: string;
    email: string;
  };
}

export async function createFourvenuesCheckout(input: FourvenuesCheckoutInput) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const tickets = Array.from({ length: input.quantity }, () => ({
    full_name: input.buyer.full_name,
    email: input.buyer.email,
    price_id: input.offer.provider_price_id,
  }));

  return fourvenuesFetch<{
    data?: {
      payment_id?: string;
      payment_url?: string;
      conditions_changed?: boolean;
      tickets?: unknown[];
    };
    success?: boolean;
  }>("/tickets/checkout", {
    method: "POST",
    body: JSON.stringify({
      redirect_url: `${siteUrl}/eventos/${input.event.slug}?checkout=success`,
      error_url: `${siteUrl}/eventos/${input.event.slug}?checkout=error`,
      send_resources: true,
      metadata: {
        event_id: input.event.id,
        event_slug: input.event.slug,
        offer_id: input.offer.id,
        source: "eventos-madrid",
      },
      ticket_rate_id: input.offer.provider_offer_id,
      tickets,
    }),
  });
}
