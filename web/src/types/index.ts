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
}

export type EventCategory =
  | "After Work"
  | "Clubs"
  | "Tardeos"
  | "Dinner Parties"
  | "Casual Drinks";
