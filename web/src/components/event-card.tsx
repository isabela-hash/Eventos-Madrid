import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { cn, formatPrice, formatDate } from "@/lib/utils";
import type { Event } from "@/types";

interface EventCardProps {
  event: Event;
  className?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  "After Work": "bg-[var(--color-teal)]/20 text-[var(--color-teal-soft)]",
  Clubs: "bg-[var(--color-garnet)]/20 text-[var(--color-garnet-soft)]",
  Tardeos: "bg-[var(--color-gold-dim)]/20 text-[var(--color-champagne)]",
  "Dinner Parties": "bg-[var(--color-gold-dim)]/20 text-[var(--color-champagne)]",
  "Casual Drinks": "bg-[var(--color-teal)]/20 text-[var(--color-teal-soft)]",
};

export function EventCard({ event, className }: EventCardProps) {
  const isSoldOut = event.status === "sold_out";
  const isHot = event.is_featured;

  return (
    <Link
      href={`/eventos/${event.slug}`}
      className={cn(
        "group block rounded-[8px] overflow-hidden bg-[var(--color-surface)] border border-transparent",
        "hover:border-[var(--color-gold)] transition-colors duration-300",
        "shadow-card hover:shadow-card-hover",
        className
      )}
    >
      {/* Poster */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-elevated)]">
        {event.poster_url ? (
          <img
            src={event.poster_url}
            alt={event.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[var(--color-elevated)] to-[var(--color-surface)]" />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-base)]/80 to-transparent" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm",
              CATEGORY_COLORS[event.category] ?? "bg-[var(--color-elevated)]/80 text-[var(--color-text-secondary)]"
            )}
          >
            {event.category}
          </span>
          {isSoldOut && (
            <span className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-[var(--color-garnet)] text-[var(--color-champagne)]">
              Agotado
            </span>
          )}
          {isHot && !isSoldOut && (
            <span className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-[var(--color-garnet)] text-[var(--color-champagne)]">
              Hot
            </span>
          )}
        </div>

        {/* Date badge */}
        <div className="absolute bottom-3 right-3">
          <span className="font-mono text-xs text-[var(--color-text-secondary)] bg-[var(--color-base)]/70 backdrop-blur-sm rounded px-2 py-1">
            {formatDate(event.date_start)}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display font-semibold text-[var(--color-text-primary)] text-base leading-snug mb-1.5 line-clamp-2 group-hover:text-[var(--color-champagne)] transition-colors duration-200">
          {event.name}
        </h3>

        {(event.venue_name || event.neighborhood) && (
          <div className="flex items-center gap-1.5 mb-2">
            <MapPin size={12} className="text-[var(--color-text-muted)] flex-shrink-0" />
            <span className="text-xs text-[var(--color-text-muted)]">
              {event.venue_name}
              {event.neighborhood && ` · ${event.neighborhood}`}
            </span>
          </div>
        )}

        {event.stars_rating && (
          <div className="flex items-center gap-1 mb-2">
            <Star size={11} className="text-[var(--color-gold)] fill-[var(--color-gold)]" />
            <span className="font-mono text-xs text-[var(--color-text-muted)]">
              {event.stars_rating.toFixed(1)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--color-border)]">
          <span className="font-mono text-sm font-medium text-[var(--color-champagne)]">
            {formatPrice(event.price_from, event.price_to, event.currency)}
          </span>
          <span className="font-mono text-xs text-[var(--color-text-muted)]">
            {event.time_start}
          </span>
        </div>
      </div>
    </Link>
  );
}
