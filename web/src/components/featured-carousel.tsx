import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { formatPrice, formatDate } from "@/lib/utils";
import type { Event } from "@/types";

interface FeaturedCarouselProps {
  events: Event[];
}

export function FeaturedCarousel({ events }: FeaturedCarouselProps) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-2xl font-semibold text-[var(--color-text-primary)] tracking-display">
            Destacados esta semana
          </h2>
          <Link
            href="/eventos"
            className="flex items-center gap-1 text-sm text-[var(--color-gold)] hover:text-[var(--color-champagne)] transition-colors duration-200"
          >
            Ver todos <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div className="pl-4 sm:pl-6 lg:pl-8 overflow-x-auto scroll-hide">
        <div className="flex gap-4 pb-4" style={{ width: "max-content" }}>
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/eventos/${event.slug}`}
              className="group flex-shrink-0 w-72 sm:w-80 rounded-[8px] overflow-hidden bg-[var(--color-surface)] border border-transparent hover:border-[var(--color-gold)] transition-colors duration-300 shadow-card hover:shadow-card-hover"
            >
              {/* Large poster */}
              <div className="relative h-48 sm:h-56 overflow-hidden bg-[var(--color-elevated)]">
                {event.poster_url ? (
                  <img
                    src={event.poster_url}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[var(--color-elevated)] to-[var(--color-surface)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-base)]/90 via-transparent to-transparent" />

                {/* Category */}
                <div className="absolute top-3 left-3">
                  <span className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-[var(--color-gold)]/20 text-[var(--color-gold)] backdrop-blur-sm">
                    {event.category}
                  </span>
                </div>

                {/* Date overlay bottom */}
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="font-display text-base font-semibold text-[var(--color-champagne)] leading-snug line-clamp-2">
                    {event.name}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  {event.venue_name && (
                    <div className="flex items-center gap-1 mb-0.5">
                      <MapPin size={11} className="text-[var(--color-text-muted)]" />
                      <span className="text-xs text-[var(--color-text-muted)]">{event.venue_name}</span>
                    </div>
                  )}
                  <span className="font-mono text-xs text-[var(--color-text-secondary)]">
                    {formatDate(event.date_start)} · {event.time_start}
                  </span>
                </div>
                <span className="font-mono text-sm font-medium text-[var(--color-gold)]">
                  {formatPrice(event.price_from, event.price_to, event.currency)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
