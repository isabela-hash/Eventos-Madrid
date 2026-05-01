import type { Event, TicketOffer, TicketProvider, Venue } from "@/types";

const heroVideo = "/videos/madrid-hero.mp4";

function venue(
  name: string,
  slug: string,
  provider: TicketProvider,
  image: string,
  description: string,
  type = "Nightlife"
): Venue {
  return {
    id: `v-${slug}`,
    name,
    slug,
    type,
    address: "Madrid",
    neighborhood: "Madrid",
    metro_station: "Centro",
    description,
    landing_copy: description,
    hero_title: name,
    hero_subtitle: "Eventos, entradas y mesas disponibles este mes.",
    hero_video_url: heroVideo,
    photo_urls: [image],
    affiliated: true,
    active: true,
    provider,
    provider_location_id: `${provider}-${slug}`,
    provider_venue_id: `${provider}-${slug}`,
  };
}

export const mockVenues: Venue[] = [
  venue(
    "Sala de Despecho",
    "sala-de-despecho",
    "fourvenues",
    "/venues/sala-de-despecho.png",
    "Copas, pizzas, tacos y canciones que se cantan con sentimiento.",
    "Copas & Fiesta"
  ),
  venue("Casa Pepa", "casa-pepa", "fourvenues", "/venues/casa-pepa.png", "Fiesta grande, luces y baile."),
  venue("Perreo Lab", "perreolab", "fourvenues", "/venues/perreolab.png", "Reggaeton, baile y energia alta."),
  venue("Club Magno", "teatro-magno", "fourvenues", "/venues/teatro-magno.png", "Teatro, club y noche de gran formato."),
  venue("Babylon", "babylon", "fourvenues", "/venues/babylon.png", "Ambiente rojo, mesas y noche social."),
  venue("Houdinni", "houdinni", "fourvenues", "/venues/houdinni.png", "From the streets to the beats."),
  venue("Todos Santos", "todos-santos", "fourvenues", "/venues/todos-santos.png", "Urbano, desenfadado y social."),
  venue("Gunilla", "gunilla", "fourvenues", "/venues/gunilla.png", "Club elegante con puesta roja."),
  venue("Calle 365", "calle-365", "fourvenues", "/venues/calle-365.png", "Botilleria del mundo, copas y plan facil."),
  venue("Salvaje", "salvaje", "fourvenues", "/venues/salvaje.png", "Dinner party con ambiente premium."),
  venue("Panthera", "panthera", "xceed", "/venues/panthera.png", "Cena, cocktails y noche elegante."),
  venue("Istar", "istar", "xceed", "/venues/istar.png", "Ambiente calido, late dinner y copas."),
  venue("Victoria", "victoria", "xceed", "/venues/victoria.png", "Club elegante con luz dorada."),
  venue("Los Amantes", "los-amantes", "xceed", "/venues/los-amantes.png", "Flores, cocktails y noche intima."),
  venue("Tardeo Madrid", "tardeo-madrid", "manual", "/venues/tardeo-madrid.png", "Tardeo, musica y pista llena.", "Tardeo"),
  venue("Rubicon", "rubicon", "manual", "/venues/rubicon.png", "Club rojo, noche intensa y electronica."),
  venue("Fenomeno", "fenomeno", "manual", "/venues/fenomeno.png", "Cena, musica y ambiente retro.", "Dinner Party"),
];

function offer(
  eventId: string,
  provider: TicketProvider,
  name: string,
  price: number,
  overrides: Partial<TicketOffer> = {}
): TicketOffer {
  return {
    id: `${eventId}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    event_id: eventId,
    provider,
    provider_offer_id: `${provider}-rate-${eventId}-${name}`,
    provider_price_id: `${provider}-price-${eventId}-${name}`,
    name,
    price,
    currency: "€",
    available: true,
    available_quantity: 80,
    min_quantity: 1,
    max_quantity: 10,
    status: "active",
    ...overrides,
  };
}

function event(
  slug: string,
  venueSlug: string,
  date: string,
  time: string,
  title: string,
  category: Event["category"],
  price: number,
  overrides: Partial<Event> = {}
): Event {
  const foundVenue = mockVenues.find((item) => item.slug === venueSlug);
  const provider = foundVenue?.provider ?? "manual";
  const id = `e-${slug}`;
  return {
    id,
    name: title,
    slug,
    category,
    subcategory: foundVenue?.type,
    venue_id: foundVenue?.id ?? `v-${venueSlug}`,
    venue_name: foundVenue?.name,
    neighborhood: foundVenue?.neighborhood,
    date_start: date,
    time_start: time,
    price_from: price,
    currency: "€",
    short_description: foundVenue?.description,
    description: `${title} en ${foundVenue?.name ?? "Madrid"}. Elige tu entrada o mesa sin salir de Eventos Madrid.`,
    poster_url: foundVenue?.photo_urls?.[0],
    status: "active",
    provider,
    provider_event_id: `${provider}-event-${slug}`,
    provider_venue_id: foundVenue?.provider_venue_id,
    provider_status: "active",
    month: date.slice(0, 7),
    ticket_offers: [
      offer(id, provider, "Entrada General", price, { includes: "Acceso al evento" }),
      offer(id, provider, "Entrada + Copa", price + 8, { includes: "Acceso + 1 copa" }),
    ],
    is_featured: ["sala-de-despecho-2026-05-04", "panthera-2026-05-07", "casa-pepa-2026-05-08"].includes(slug),
    is_tonight: false,
    tags: [provider, foundVenue?.type ?? "nightlife"],
    ...overrides,
  };
}

export const mockEvents: Event[] = [
  event("sala-de-despecho-2026-05-04", "sala-de-despecho", "2026-05-04", "19:00", "Sala de Despecho by Madrid No Descansa", "Casual Drinks", 12),
  event("sala-de-despecho-2026-05-11", "sala-de-despecho", "2026-05-11", "19:00", "Sala de Despecho by Madrid No Descansa", "Casual Drinks", 12),
  event("sala-de-despecho-2026-05-18", "sala-de-despecho", "2026-05-18", "19:00", "Sala de Despecho by Madrid No Descansa", "Casual Drinks", 12),
  event("sala-de-despecho-2026-05-25", "sala-de-despecho", "2026-05-25", "19:00", "Sala de Despecho by Madrid No Descansa", "Casual Drinks", 12),
  event("panthera-2026-05-07", "panthera", "2026-05-07", "22:00", "Panthera Dinner Club", "Dinner Parties", 25, {
    checkout_url: "https://xceed.me/en/madrid/club/panthera",
  }),
  event("istar-2026-05-09", "istar", "2026-05-09", "22:30", "Istar Friday Night", "Dinner Parties", 20, {
    checkout_url: "https://xceed.me/en/madrid/club/istar",
  }),
  event("victoria-2026-05-14", "victoria", "2026-05-14", "23:00", "Victoria Club Night", "Clubs", 18, {
    checkout_url: "https://xceed.me/en/madrid/club/victoria",
  }),
  event("los-amantes-2026-05-15", "los-amantes", "2026-05-15", "22:00", "Los Amantes", "Dinner Parties", 18, {
    checkout_url: "https://xceed.me/en/madrid/club/los-amantes",
  }),
  event("casa-pepa-2026-05-08", "casa-pepa", "2026-05-08", "23:00", "Casa Pepa Viernes", "Clubs", 15),
  event("perreolab-2026-05-09", "perreolab", "2026-05-09", "23:30", "Perreo Lab Sabado", "Clubs", 15),
  event("club-magno-2026-05-09", "teatro-magno", "2026-05-09", "23:00", "Club Magno Sabado", "Clubs", 20),
  event("babylon-2026-05-08", "babylon", "2026-05-08", "23:30", "Babylon Friday", "Clubs", 18),
  event("houdinni-2026-05-05", "houdinni", "2026-05-05", "23:00", "Houdinni Tuesday", "Clubs", 15),
  event("todos-santos-2026-05-07", "todos-santos", "2026-05-07", "22:30", "Todos Santos Jueves", "Clubs", 15),
  event("gunilla-2026-05-06", "gunilla", "2026-05-06", "23:00", "Gunilla Wednesday", "Clubs", 18),
  event("calle-365-2026-05-10", "calle-365", "2026-05-10", "20:00", "Calle 365 Domingo", "Casual Drinks", 10),
  event("salvaje-2026-05-05", "salvaje", "2026-05-05", "21:30", "Salvaje Dinner Party", "Dinner Parties", 35),
  event("tardeo-madrid-2026-05-09", "tardeo-madrid", "2026-05-09", "17:00", "Tardeo Madrid", "Tardeos", 12),
];

export const mockFeaturedEvents = mockEvents.filter((e) => e.is_featured);
export const mockTonightEvents = mockEvents.filter((e) => e.is_tonight);
