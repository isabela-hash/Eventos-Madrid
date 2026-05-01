import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, MapPin, Train } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { TicketPurchase } from "@/components/ticketing/ticket-purchase";
import { getEventsForVenueMonth, getVenueBySlug, getVenues } from "@/lib/airtable";
import { formatPrice } from "@/lib/utils";

interface VenuePageProps {
  params: {
    slug: string;
  };
  searchParams?: {
    date?: string;
    month?: string;
  };
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const venues = await getVenues();
  return venues.map((venue) => ({ slug: venue.slug }));
}

function monthFromSearch(searchParams?: VenuePageProps["searchParams"]) {
  if (searchParams?.month && /^\d{4}-\d{2}$/.test(searchParams.month)) return searchParams.month;
  if (searchParams?.date && /^\d{4}-\d{2}-\d{2}$/.test(searchParams.date)) return searchParams.date.slice(0, 7);
  return new Date().toISOString().slice(0, 7);
}

function formatMonth(month: string) {
  return new Intl.DateTimeFormat("es-ES", { month: "long", year: "numeric" }).format(new Date(`${month}-01T12:00:00`));
}

export default async function VenuePage({ params, searchParams }: VenuePageProps) {
  const month = monthFromSearch(searchParams);
  const [venue, events] = await Promise.all([
    getVenueBySlug(params.slug),
    getEventsForVenueMonth(params.slug, month),
  ]);

  if (!venue) notFound();

  const heroImage = venue.photo_urls?.[0];
  const heroVideo = venue.hero_video_url;

  return (
    <>
      <Navbar />

      <section className="relative min-h-[62vh] overflow-hidden pt-16 grain">
        {heroVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroImage}
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        ) : heroImage ? (
          <img src={heroImage} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        ) : (
          <div className="absolute inset-0 bg-[var(--color-elevated)]" />
        )}
        <div className="absolute inset-0 bg-[var(--color-base)]/68" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-base)] via-[var(--color-base)]/38 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(62vh-4rem)] max-w-7xl items-end px-4 pb-14 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-[var(--color-gold)]/25 bg-[var(--color-gold)]/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-[var(--color-champagne)]">
              {venue.provider === "fourvenues" ? "Fourvenues" : venue.provider === "xceed" ? "Xceed" : venue.type}
            </span>
            <h1 className="mt-5 font-display text-5xl font-black leading-none tracking-display text-[var(--color-champagne)] sm:text-6xl">
              {venue.hero_title ?? venue.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
              {venue.hero_subtitle ?? venue.description}
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-gold)]">
              Eventos de {formatMonth(month)}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-display text-[var(--color-champagne)]">
              Elige fecha y entrada
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-[var(--color-text-secondary)]">
              {venue.landing_copy ?? venue.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {events.map((event) => (
                <article
                  key={event.id}
                  className="overflow-hidden rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)]"
                >
                  <div className="relative aspect-[16/9] bg-[var(--color-elevated)]">
                    {event.poster_url && (
                      <img src={event.poster_url} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-base)]/82 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-[4px] bg-[var(--color-base)]/76 px-2 py-1 font-mono text-xs text-[var(--color-champagne)]">
                      {event.date_start} · {event.time_start}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-semibold tracking-display text-[var(--color-text-primary)]">
                      {event.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                      {event.short_description ?? event.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4">
                      <span className="font-mono text-sm text-[var(--color-champagne)]">
                        {formatPrice(event.price_from, event.price_to, event.currency)}
                      </span>
                      <TicketPurchase
                        event={event}
                        triggerClassName="inline-flex items-center justify-center rounded-[8px] bg-[var(--color-gold)] px-4 py-2.5 text-sm font-semibold text-[var(--color-text-inverse)] transition-colors hover:bg-[var(--color-champagne)]"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {events.length === 0 && (
              <div className="mt-8 rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-sm text-[var(--color-text-secondary)]">
                No hay eventos sincronizados para este venue en {formatMonth(month)}.
              </div>
            )}
          </div>

          <aside className="h-fit rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <h2 className="font-display text-2xl font-bold tracking-display text-[var(--color-champagne)]">
              Detalles
            </h2>
            <div className="mt-6 space-y-5 text-sm leading-6 text-[var(--color-text-secondary)]">
              <div className="flex gap-3">
                <MapPin size={18} className="mt-1 shrink-0 text-[var(--color-gold)]" />
                <div>
                  <p className="font-semibold text-[var(--color-champagne)]">Dirección</p>
                  <p>{venue.address}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{venue.neighborhood}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Train size={18} className="mt-1 shrink-0 text-[var(--color-gold)]" />
                <div>
                  <p className="font-semibold text-[var(--color-champagne)]">Metro</p>
                  <p>{venue.metro_station ?? "Centro"}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock size={18} className="mt-1 shrink-0 text-[var(--color-gold)]" />
                <div>
                  <p className="font-semibold text-[var(--color-champagne)]">Disponibilidad</p>
                  <p>Sincronizada por proveedor</p>
                </div>
              </div>
            </div>

            <Link
              href="/reservations"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[8px] border border-[var(--color-border)] px-5 py-3 text-sm font-semibold text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-text-primary)]"
            >
              <CalendarDays size={15} />
              Concierge para grupos
            </Link>
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}
