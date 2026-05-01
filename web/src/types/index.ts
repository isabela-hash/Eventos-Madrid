export type TicketProvider = "fourvenues" | "xceed" | "manual";

export type ProviderStatus = "active" | "sold_out" | "cancelled" | "unmatched" | "hidden";

export interface TicketOffer {
  id: string;
  event_id: string;
  provider: TicketProvider;
  provider_offer_id?: string;
  provider_price_id?: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  available: boolean;
  available_quantity?: number;
  min_quantity: number;
  max_quantity: number;
  includes?: string;
  checkout_url?: string;
  status: "active" | "sold_out" | "hidden";
  raw_provider_payload?: unknown;
}

export interface Event {
  id: string;
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  venue_id: string;
  venue_name?: string;
  neighborhood?: string;
  date_start: string;
  time_start: string;
  price_from?: number;
  price_to?: number;
  currency: string;
  description?: string;
  short_description?: string;
  poster_url?: string;
  ticket_url?: string;
  affiliate_link?: string;
  provider?: TicketProvider;
  provider_event_id?: string;
  provider_venue_id?: string;
  provider_organization_id?: string;
  provider_status?: ProviderStatus;
  checkout_url?: string;
  month?: string;
  ticket_offers?: TicketOffer[];
  raw_provider_payload?: unknown;
  last_synced_at?: string;
  is_featured?: boolean;
  is_tonight?: boolean;
  tags?: string[];
  status: "active" | "sold_out" | "cancelled";
  stars_rating?: number;
  review_snippet?: string;
}

export interface Venue {
  id: string;
  name: string;
  slug: string;
  type: string;
  address: string;
  neighborhood: string;
  google_maps_url?: string;
  capacity?: number;
  description?: string;
  photo_urls?: string[];
  website_url?: string;
  instagram_url?: string;
  phone?: string;
  metro_station?: string;
  affiliated?: boolean;
  provider?: TicketProvider;
  provider_organization_id?: string;
  provider_location_id?: string;
  provider_venue_id?: string;
  hero_video_url?: string;
  hero_title?: string;
  hero_subtitle?: string;
  landing_copy?: string;
  active?: boolean;
}

export type EventCategory =
  | "After Work"
  | "Clubs"
  | "Tardeos"
  | "Dinner Parties"
  | "Casual Drinks";
