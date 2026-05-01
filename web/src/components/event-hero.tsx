import { MapPin, Calendar, Clock } from "lucide-react";
import { TicketCTA } from "./ticket-cta";
import { formatDate } from "@/lib/utils";
import type { Event } from "@/types";

interface EventHeroProps {
  event: Event;
}

export function EventHero({ event }: EventHeroProps) {
  return (
    <div className="relative min-h-[70vh] flex items-end grain">
      {/* Background poster */}
      {event.poster_url ? (
        <img
          src={event.poster_url}
          alt={event.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-elevated)] to-[var(--color-surface)]" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-base)] via-[var(--color-base)]/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 w-full">
        {/* Category */}
        <span className="inline-block mb-4 rounded-full px-3 py-1 text-xs font-medium bg-[var(--color-gold)]/20 text-[var(--color-gold)]">
          {event.category}
        </span>

        {/* Title */}
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--color-champagne)] tracking-display leading-tight mb-6 max-w-3xl">
          {event.name}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-5 mb-8">
          <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
            <Calendar size={14} className="text-[var(--color-text-muted)]" />
            <span className="font-mono">{formatDate(event.date_start)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
            <Clock size={14} className="text-[var(--color-text-muted)]" />
            <span className="font-mono">{event.time_start}</span>
          </div>
          {event.venue_name && (
            <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
              <MapPin size={14} className="text-[var(--color-text-muted)]" />
              <span>{event.venue_name}</span>
            </div>
          )}
        </div>

        {/* CTA */}
        {(event.ticket_url || event.affiliate_link) && (
          <TicketCTA href={event.affiliate_link ?? event.ticket_url!} />
        )}
      </div>
    </div>
  );
}
